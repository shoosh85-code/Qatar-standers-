// api/create-checkout.js — QatarSpec Pro v3.2.0
// Stripe Checkout Session Creator
// Env vars required: STRIPE_SECRET_KEY, STRIPE_PRICE_MONTHLY, STRIPE_PRICE_ANNUAL

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_KEY) {
    // Stripe not configured — return contact info fallback
    return res.status(200).json({
      fallback: true,
      message: 'للاشتراك تواصل معنا مباشرة',
      whatsapp: 'https://wa.me/97455550000?text=أريد الاشتراك في QatarSpec Pro',
      email: 'pro@qatarspec.app'
    });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { email, plan = 'monthly' } = body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!['monthly', 'annual'].includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan. Use: monthly or annual' });
  }

  const PRICES = {
    monthly: process.env.STRIPE_PRICE_MONTHLY,
    annual:  process.env.STRIPE_PRICE_ANNUAL
  };

  const priceId = PRICES[plan];
  if (!priceId) {
    return res.status(500).json({ error: `Price ID for "${plan}" plan not configured` });
  }

  const BASE_URL = 'https://qatar-standers.vercel.app';

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2024-04-10'
      },
      body: new URLSearchParams({
        'customer_email': email,
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'mode': 'subscription',
        'success_url': `${BASE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${BASE_URL}/subscribe.html?cancelled=1`,
        'metadata[plan]': plan,
        'metadata[source]': 'qatarspec_web',
        'allow_promotion_codes': 'true',
        'billing_address_collection': 'auto',
        'subscription_data[trial_period_days]': '7',
        'payment_method_types[0]': 'card'
      })
    });

    const session = await response.json();

    if (session.error) {
      console.error('[create-checkout] Stripe error:', session.error);
      return res.status(400).json({ error: session.error.message });
    }

    return res.status(200).json({ url: session.url, sessionId: session.id });

  } catch (err) {
    console.error('[create-checkout] Fetch error:', err);
    return res.status(500).json({ error: 'Payment service unavailable. Please try again.' });
  }
}
