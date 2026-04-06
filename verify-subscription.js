// api/verify-subscription.js — Check if user has active Pro subscription
// Requires: STRIPE_SECRET_KEY, KV_REST_API_URL, KV_REST_API_TOKEN

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, jwt } = req.body || {};
  if (!email && !jwt) return res.status(400).json({ isPro: false });

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;
  if (!KV_URL) return res.status(200).json({ isPro: false, reason: 'KV not configured' });

  try {
    // Check Vercel KV for subscription status
    const kvResponse = await fetch(KV_URL + '/get/sub:' + (email || jwt), {
      headers: { Authorization: 'Bearer ' + KV_TOKEN }
    });
    const kvData = await kvResponse.json();
    const isPro = kvData.result === 'active';

    return res.status(200).json({
      isPro,
      expiresAt: kvData.expires || null,
    });
  } catch (err) {
    return res.status(200).json({ isPro: false });
  }
}
