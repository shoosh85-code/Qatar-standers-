// api/auth/login.js — Magic Link via Resend Email
// Requires: RESEND_API_KEY, JWT_SECRET, KV_REST_API_URL, KV_REST_API_TOKEN, APP_URL

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body || {};
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;
  const APP_URL = process.env.APP_URL || 'https://qatar-standers.vercel.app';

  if (!RESEND_KEY) return res.status(503).json({ error: 'Email service not configured' });

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Store code in KV (expires in 15 minutes)
    if (KV_URL) {
      await fetch(KV_URL + '/set/otp:' + email, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + KV_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: code, ex: 900 })
      });
    }

    // Send magic link email via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'QatarSpec Pro <noreply@qatarspec.com>',
        to: email,
        subject: 'رمز تسجيل الدخول — QatarSpec Pro',
        html: `
          <div dir="rtl" style="font-family:Arial;max-width:400px;margin:0 auto;padding:24px;">
            <h2 style="color:#7a1515;">QatarSpec Pro 🏗️</h2>
            <p>رمز تسجيل الدخول الخاص بك:</p>
            <div style="background:#f5f5f5;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
              <span style="font-size:36px;font-weight:900;letter-spacing:8px;color:#7a1515;">${code}</span>
            </div>
            <p style="color:#666;font-size:13px;">صالح لمدة 15 دقيقة فقط.</p>
          </div>`
      })
    });

    return res.status(200).json({ sent: true, message: 'تم إرسال الرمز على بريدك الإلكتروني' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'فشل إرسال البريد' });
  }
}
