// api/webhook.js — Stripe Webhook Handler
// Requires: STRIPE_WEBHOOK_SECRET, KV_REST_API_URL, KV_REST_API_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  // Get raw body for signature verification
  const payload = JSON.stringify(req.body);
  const sig = req.headers['stripe-signature'];

  // Simple event processing (add proper signature verification in production)
  const event = req.body;

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'invoice.paid') {
      const email = event.data?.object?.customer_email ||
                    event.data?.object?.customer_details?.email;
      
      if (email && KV_URL) {
        // Store subscription as active in Vercel KV
        await fetch(KV_URL + '/set/sub:' + email, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + KV_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: 'active', ex: 2678400 }) // 31 days
        });
        console.log('Pro activated for:', email);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const email = event.data?.object?.customer_email;
      if (email && KV_URL) {
        await fetch(KV_URL + '/del/sub:' + email, {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + KV_TOKEN }
        });
        console.log('Pro deactivated for:', email);
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err.message });
  }
}
