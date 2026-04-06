// api/auth/verify.js — Verify OTP and issue JWT
// Requires: JWT_SECRET, KV_REST_API_URL, KV_REST_API_TOKEN

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ error: 'Email and code required' });

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    // Verify OTP from KV
    const kvResponse = await fetch(KV_URL + '/get/otp:' + email, {
      headers: { Authorization: 'Bearer ' + KV_TOKEN }
    });
    const kvData = await kvResponse.json();

    if (kvData.result !== code) {
      return res.status(401).json({ error: 'الرمز غير صحيح أو منتهي الصلاحية' });
    }

    // Delete used OTP
    await fetch(KV_URL + '/del/otp:' + email, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + KV_TOKEN }
    });

    // Check if Pro subscriber
    const subResponse = await fetch(KV_URL + '/get/sub:' + email, {
      headers: { Authorization: 'Bearer ' + KV_TOKEN }
    });
    const subData = await subResponse.json();
    const isPro = subData.result === 'active';

    // Create simple JWT (base64 encoded payload — add proper signing in production)
    const payload = { email, isPro, iat: Date.now(), exp: Date.now() + 30 * 24 * 60 * 60 * 1000 };
    const jwt = btoa(JSON.stringify(payload));

    return res.status(200).json({ jwt, email, isPro });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
