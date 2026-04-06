// api/create-checkout.js — Stripe Checkout
// Requires: STRIPE_SECRET_KEY in Vercel Environment Variables

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_KEY) return res.status(503).json({ error: 'Stripe not configured' });

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + STRIPE_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price_data][currency]': 'qar',
        'line_items[0][price_data][product_data][name]': 'QatarSpec Pro',
        'line_items[0][price_data][unit_amount]': '9900', // 99 QAR in halalas
        'line_items[0][price_data][recurring][interval]': 'month',
        'line_items[0][quantity]': '1',
        'mode': 'subscription',
        'customer_email': email,
        'success_url': process.env.APP_URL + '/success?session={CHECKOUT_SESSION_ID}',
        'cancel_url': process.env.APP_URL + '/',
        'metadata[product]': 'qatarspec_pro',
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(502).json({ error: err.error?.message || 'Stripe error' });
    }

    const session = await response.json();
    return res.status(200).json({ url: session.url, sessionId: session.id });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
