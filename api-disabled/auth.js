// api/auth.js — QatarSpec Pro
// Vercel Serverless: تسجيل + دخول عبر Supabase Auth
// PROTOCOL 6: Rate limiting — 10/min free, 30/min/IP global
// v1.0 — المرحلة 1 من خطة Project Hub

import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}
function getSupabaseKey() {
  return process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  // ── Rate Limiting ─────────────────────────────────────────────────────────
  const ip = getIp(req);
  const rl = await rateLimit(ip, 'auth', false);
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: `محاولات كثيرة — حاول بعد ${rl.retryAfter} ثانية`,
    });
  }

  // ── Validate env ──────────────────────────────────────────────────────────
  const SUPABASE_URL = getSupabaseUrl();
  const SUPABASE_KEY = getSupabaseKey();
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  const { action, email, password } = req.body || {};

  if (!action || !email || !password) {
    return res.status(400).json({ error: 'action + email + password مطلوبة' });
  }
  if (!['login', 'signup'].includes(action)) {
    return res.status(400).json({ error: 'action يجب أن يكون login أو signup' });
  }

  // ── Sanitize ──────────────────────────────────────────────────────────────
  const cleanEmail = String(email).trim().toLowerCase().slice(0, 254);
  const cleanPass  = String(password).slice(0, 128);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: 'البريد الإلكتروني غير صالح' });
  }
  if (cleanPass.length < 8) {
    return res.status(400).json({ error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' });
  }

  // ── Call Supabase Auth REST API ───────────────────────────────────────────
  try {
    const endpoint = action === 'signup'
      ? `${SUPABASE_URL}/auth/v1/signup`
      : `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

    const supabaseRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
      },
      body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
    });

    const data = await supabaseRes.json();

    if (!supabaseRes.ok) {
      return res.status(supabaseRes.status).json({
        error: data.error_description || data.msg || data.error || 'فشل المصادقة',
      });
    }

    // إرجاع البيانات الضرورية فقط — لا نُعيد الـ refresh_token
    return res.status(200).json({
      access_token: data.access_token,
      expires_in:   data.expires_in,
      user: {
        id:    data.user?.id,
        email: data.user?.email,
      },
      message: action === 'signup'
        ? 'تم إنشاء الحساب — تحقق من بريدك الإلكتروني'
        : 'تم الدخول بنجاح',
    });

  } catch (err) {
    console.error('api/auth.js error:', err);
    return res.status(500).json({ error: 'خطأ في الخادم — حاول مجدداً' });
  }
}
