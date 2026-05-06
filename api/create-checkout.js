// api/create-checkout.js — QatarSpec Pro Payment
// مستقل — rate limiter داخلي بدون imports خارجية

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// in-memory rate limiter (3 محاولات/دقيقة)
const _lim = new Map();
function allowed(ip) {
  const now  = Date.now();
  const d    = _lim.get(ip) || { n: 0, r: now + 60000 };
  if (now > d.r) { d.n = 0; d.r = now + 60000; }
  d.n++;
  _lim.set(ip, d);
  return d.n <= 3;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || 'x';
  if (!allowed(ip)) return res.status(429).json({ error: 'Too Many Requests', retryAfter: 60 });

  const { user_email, user_id } = req.body || {};
  if (!user_email || !user_email.includes('@')) {
    return res.status(400).json({ error: 'user_email صالح مطلوب' });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRO_PRICE_ID) {
    return res.status(500).json({ error: 'Stripe غير مهيأ — راجع env vars' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'subscription',
      currency:             'qar',
      line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID, quantity: 1 }],
      customer_email: user_email,
      metadata:       { user_id: user_id || '', tier: 'pro' },
      success_url: `https://qatar-standers.vercel.app/?payment=success&session={CHECKOUT_SESSION_ID}`,
      cancel_url:  `https://qatar-standers.vercel.app/?payment=cancelled`,
      locale: 'ar',
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Stripe] Checkout error:', err.message);
    return res.status(502).json({ error: 'فشل إنشاء جلسة الدفع — حاول مجدداً' });
  }
}
