// api/auth-proxy.js
// QatarSpec Pro — Server-side token validation
// يتحقق من التوكن مع Supabase من server-side فقط — لا credentials في client
// PROTOCOL 6: rate limiting مفعّل

import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';
import { getSupabaseUrl, getSupabaseAnonKey } from '../lib/supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── Rate Limiting ─────────────────────────────────────────────────────────
  const ip = getIp(req);
  const rl = await rateLimit(ip, 'verify-pro', false); // نفس حدود verify-pro
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: `حاول مرة أخرى بعد ${rl.retryAfter} ثانية`,
    });
  }

  // ── Environment Variables ─────────────────────────────────────────────────
  const SUPABASE_URL = getSupabaseUrl();
  const SUPABASE_KEY = getSupabaseAnonKey();

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('auth-proxy: SUPABASE_URL أو SUPABASE_KEY غير موجودة');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Request Body ─────────────────────────────────────────────────────────
  const { token } = req.body || {};

  if (!token || typeof token !== 'string' || token.length < 8) {
    return res.status(400).json({ error: 'رمز التفعيل غير صالح', valid: false });
  }

  // تنظيف التوكن — منع injection
  const safeToken = token.trim().replace(/['";<>\\]/g, '').slice(0, 200);

  // ── Query Supabase ────────────────────────────────────────────────────────
  try {
    const supaUrl =
      `${SUPABASE_URL}/rest/v1/users` +
      `?token=eq.${encodeURIComponent(safeToken)}` +
      `&select=id,email,is_pro,is_active,plan,expires_at` +
      `&limit=1`;

    const supaRes = await fetch(supaUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!supaRes.ok) {
      console.error('auth-proxy Supabase error:', supaRes.status);
      return res.status(502).json({ error: 'Database error', valid: false });
    }

    const rows = await supaRes.json();
    const user = rows?.[0];

    // التوكن غير موجود
    if (!user) {
      return res.status(200).json({ valid: false, reason: 'not_found' });
    }

    // الحساب غير نشط
    if (!user.is_active) {
      return res.status(200).json({ valid: false, reason: 'inactive' });
    }

    // انتهت الصلاحية
    if (user.expires_at && new Date(user.expires_at) < new Date()) {
      return res.status(200).json({ valid: false, reason: 'expired' });
    }

    // ✅ توكن صحيح — إرجاع بيانات المستخدم (بدون token نفسه)
    return res.status(200).json({
      valid: true,
      user: {
        id:         user.id,
        email:      user.email,
        is_pro:     user.is_pro,
        is_active:  user.is_active,
        plan:       user.plan,
        expires_at: user.expires_at,
      },
    });

  } catch (err) {
    console.error('auth-proxy error:', err.message);
    return res.status(500).json({ error: 'Internal server error', valid: false });
  }
}
