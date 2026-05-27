// api/auth.js — QatarSpec Pro
// Vercel Serverless Function: تسجيل / دخول / تحقق / خروج
// SECURITY: لا يُعرّض Supabase URL أو keys للـ client
// PROTOCOL 6: Rate limiting مفعّل

import { checkRateLimit, getIp } from './rate-limit.js';
import { checkRateLimit as libCheckRateLimit, rateLimitResponse as libRateLimitResponse } from '../lib/rate-limit.js';

// ══ verify-pro helpers (merged from api/verify-pro.js) ══════════════
const PRO_CODES_RAW = process.env.PROMO_CODES || process.env.PRO_CODES || 'QATAR2026PRO,EARLYBIRD2026';
const VALID_CODES = new Set(
  PRO_CODES_RAW.split(',').map(c => c.trim().toUpperCase()).filter(Boolean)
);

async function signJWT(payload, secret) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  const body = btoa(JSON.stringify(payload))
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  const msg = `${header}.${body}`;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  return `${msg}.${sigB64}`;
}

async function verifyJWT(token, secret) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const msg = `${parts[0]}.${parts[1]}`;
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const d = s => Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify('HMAC', key, d(parts[2]), new TextEncoder().encode(msg));
    if (!ok) return null;
    const p = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
    if (p.exp < Math.floor(Date.now() / 1000)) return null;
    return p;
  } catch { return null; }
}

function buildCookie(token, maxAge = 365 * 24 * 3600) {
  return `qs_pro=${token}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`;
}
function clearCookie() {
  return `qs_pro=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`;
}
function extractCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : null;
}

const VERIFY_PRO_CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
};

function vpJson(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...VERIFY_PRO_CORS, 'Content-Type': 'application/json', ...extraHeaders },
  });
}
// ══ end verify-pro helpers ══════════════════════════════════════════

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}
function getSupabaseKey() {
  return process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

// ── Supabase Auth helper ───────────────────────────────────────────────────
async function sbAuth(endpoint, body) {
  const url  = getSupabaseUrl();
  const key  = getSupabaseKey();
  if (!url || !key) throw new Error('Supabase غير مهيأ');

  const res = await fetch(`${url}/auth/v1/${endpoint}`, {
    method: 'POST',
    headers: { 'apikey': key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

// ── Main Handler ───────────────────────────────────────────────────────────
export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  const ip = getIp(req);

  // Rate limit: 10/min لكل IP
  const rl = await checkRateLimit(ip, '/api/auth', false);
  if (!rl.allowed) {
    return json({
      error: 'Rate limit exceeded',
      retryAfter: rl.retryAfter,
    }, 429);
  }

  const url    = new URL(req.url);
  const action = url.searchParams.get('action') || 'login';

  try {
    // ── POST /api/auth?action=signup ───────────────────────────────────
    if (req.method === 'POST' && action === 'signup') {
      const body  = await req.json().catch(() => ({}));
      const email = body.email?.trim().toLowerCase();
      const pass  = body.password;
      const name  = body.name?.trim() || '';

      if (!email || !pass) return json({ error: 'البريد وكلمة المرور مطلوبان' }, 400);
      if (pass.length < 8)  return json({ error: 'كلمة المرور 8 أحرف على الأقل' }, 400);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'بريد إلكتروني غير صحيح' }, 400);

      const r = await sbAuth('signup', {
        email,
        password: pass,
        data: { full_name: name },
      });

      if (!r.ok) {
        const msg = r.data?.msg || r.data?.error_description || 'فشل إنشاء الحساب';
        return json({ error: msg }, r.status);
      }

      return json({
        message: 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني للتفعيل.',
        user: { email, name },
      }, 201);
    }

    // ── POST /api/auth?action=login ────────────────────────────────────
    if (req.method === 'POST' && action === 'login') {
      const body  = await req.json().catch(() => ({}));
      const email = body.email?.trim().toLowerCase();
      const pass  = body.password;

      if (!email || !pass) return json({ error: 'البريد وكلمة المرور مطلوبان' }, 400);

      const r = await sbAuth('token?grant_type=password', {
        email,
        password: pass,
      });

      if (!r.ok) {
        const msg = r.data?.error_description || r.data?.msg || 'بيانات الدخول غير صحيحة';
        return json({ error: msg }, 401);
      }

      const { access_token, refresh_token, expires_in, user } = r.data;
      const isPro = user?.user_metadata?.pro === true || user?.app_metadata?.pro === true;

      return json({
        access_token,
        refresh_token,
        expires_in,
        user: {
          id:    user.id,
          email: user.email,
          name:  user.user_metadata?.full_name || user.email,
          pro:   isPro,
        },
      }, 200);
    }

    // ── POST /api/auth?action=logout ───────────────────────────────────
    if (req.method === 'POST' && action === 'logout') {
      const authHeader = req.headers.get('Authorization') || '';
      const token = authHeader.replace('Bearer ', '').trim();
      if (!token) return json({ message: 'تم تسجيل الخروج' }, 200);

      const url2 = getSupabaseUrl();
      const key  = getSupabaseKey();
      await fetch(`${url2}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': key, 'Authorization': `Bearer ${token}` },
      }).catch(() => null); // لا نوقف التنفيذ لو فشل

      return json({ message: 'تم تسجيل الخروج بنجاح' }, 200);
    }

    // ── GET /api/auth?action=me ────────────────────────────────────────
    if (req.method === 'GET' && action === 'me') {
      const authHeader = req.headers.get('Authorization') || '';
      const token = authHeader.replace('Bearer ', '').trim();
      if (!token) return json({ error: 'غير مسجل الدخول' }, 401);

      const sbUrl = getSupabaseUrl();
      const key   = getSupabaseKey();
      const res   = await fetch(`${sbUrl}/auth/v1/user`, {
        headers: { 'Authorization': `Bearer ${token}`, 'apikey': key },
      });

      if (!res.ok) return json({ error: 'جلسة منتهية الصلاحية' }, 401);
      const user  = await res.json();
      const isPro = user?.user_metadata?.pro === true || user?.app_metadata?.pro === true;

      return json({
        user: {
          id:    user.id,
          email: user.email,
          name:  user.user_metadata?.full_name || user.email,
          pro:   isPro,
        },
      }, 200);
    }

    // ── POST /api/auth?action=refresh ──────────────────────────────────
    if (req.method === 'POST' && action === 'refresh') {
      const body = await req.json().catch(() => ({}));
      if (!body.refresh_token) return json({ error: 'refresh_token مطلوب' }, 400);

      const r = await sbAuth('token?grant_type=refresh_token', {
        refresh_token: body.refresh_token,
      });

      if (!r.ok) return json({ error: 'فشل تجديد الجلسة' }, 401);

      const { access_token, refresh_token: newRT, expires_in } = r.data;
      return json({ access_token, refresh_token: newRT, expires_in }, 200);
    }

    // ── GET /api/auth?action=config (merged from auth-config.js) ──────
    if (req.method === 'GET' && action === 'config') {
      const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL  || process.env.SUPABASE_URL;
      const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        return json({ error: 'Missing Supabase configuration' }, 500);
      }
      return new Response(JSON.stringify({ url: SUPABASE_URL, key: SUPABASE_ANON_KEY }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300, stale-while-revalidate=60' },
      });
    }

    // ── GET /api/auth?action=verify-pro-status (merged from verify-pro.js) ──
    if (req.method === 'GET' && action === 'verify-pro-status') {
      const vpSecret = process.env.JWT_SECRET;
      if (!vpSecret) return vpJson({ error: 'Server config missing' }, 500);
      const cookieHeader = req.headers.get('cookie');
      const token = extractCookie(cookieHeader, 'qs_pro');
      const payload = await verifyJWT(token, vpSecret);
      return vpJson({ pro: payload?.pro === true, exp: payload?.exp, source: payload?.source || null }, 200);
    }

    // ── POST /api/auth?action=verify-pro (merged from verify-pro.js) ──
    if (req.method === 'POST' && action === 'verify-pro') {
      // Rate limit specific to verify-pro
      const vpIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
      const _cookieHdr = req.headers.get('cookie') || '';
      const _existingToken = extractCookie(_cookieHdr, 'qs_pro');
      let _isPro = false;
      const vpSecret = process.env.JWT_SECRET;
      if (_existingToken && vpSecret) {
        const _p = await verifyJWT(_existingToken, vpSecret);
        _isPro = _p?.pro === true;
      }
      const vpRl = await libCheckRateLimit(vpIp, '/api/verify-pro', _isPro);
      if (!vpRl.allowed) return libRateLimitResponse(vpRl, VERIFY_PRO_CORS);

      if (!vpSecret) return vpJson({ error: 'Server config missing' }, 500);

      let vpBody;
      try { vpBody = await req.json(); } catch { return vpJson({ error: 'Invalid JSON' }, 400); }

      const { action: bodyAction, code, token: bodyToken } = vpBody;

      // Deactivate
      if (bodyAction === 'deactivate') {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { ...VERIFY_PRO_CORS, 'Content-Type': 'application/json', 'Set-Cookie': clearCookie() },
        });
      }

      // Verify existing token
      if (bodyAction === 'verify') {
        const cookieHeader = req.headers.get('cookie');
        const token = extractCookie(cookieHeader, 'qs_pro');
        const payload = await verifyJWT(token, vpSecret);
        return vpJson({ pro: payload?.pro === true, exp: payload?.exp }, 200);
      }

      // Activate via promo code
      if (code) {
        const upper = code.trim().toUpperCase();
        if (!VALID_CODES.has(upper)) {
          return vpJson({ valid: false, error: 'كود غير صحيح أو منتهي الصلاحية' }, 200);
        }
        const days = 365;
        const exp = Math.floor(Date.now() / 1000) + days * 24 * 3600;
        const token = await signJWT({ pro: true, exp, source: 'code', code: upper }, vpSecret);
        return new Response(JSON.stringify({ valid: true, success: true, ok: true, token, days, exp }), {
          status: 200,
          headers: { ...VERIFY_PRO_CORS, 'Content-Type': 'application/json', 'Set-Cookie': buildCookie(token) },
        });
      }

      // Activate via external token
      if (bodyToken) {
        const payload = await verifyJWT(bodyToken, vpSecret);
        if (!payload?.pro) return vpJson({ error: 'Invalid token' }, 400);
        const newToken = await signJWT({ ...payload, iat: Date.now() }, vpSecret);
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { ...VERIFY_PRO_CORS, 'Content-Type': 'application/json', 'Set-Cookie': buildCookie(newToken) },
        });
      }

      // OTP login
      if (bodyAction === 'login') {
        const { email: loginEmail } = vpBody;
        if (!loginEmail || !loginEmail.includes('@')) return vpJson({ error: 'Valid email required' }, 400);
        const RESEND_KEY = process.env.RESEND_API_KEY;
        const KV_URL     = process.env.KV_REST_API_URL;
        const KV_TOKEN   = process.env.KV_REST_API_TOKEN;
        if (!RESEND_KEY) return vpJson({ error: 'Email service not configured' }, 503);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        try {
          if (KV_URL) {
            await fetch(KV_URL + '/set/otp:' + loginEmail, {
              method: 'POST',
              headers: { Authorization: 'Bearer ' + KV_TOKEN, 'Content-Type': 'application/json' },
              body: JSON.stringify({ value: otp, ex: 900 })
            });
          }
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + RESEND_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from: 'QatarSpec Pro <noreply@qatarspec.com>', to: loginEmail,
              subject: 'رمز تسجيل الدخول — QatarSpec Pro',
              html: `<div dir="rtl" style="font-family:Arial;max-width:400px;margin:0 auto;padding:24px;"><h2 style="color:#7a1515;">QatarSpec Pro 🏗️</h2><p>رمز تسجيل الدخول الخاص بك:</p><div style="background:#f5f5f5;border-radius:12px;padding:20px;text-align:center;margin:20px 0;"><span style="font-size:36px;font-weight:900;letter-spacing:8px;color:#7a1515;">${otp}</span></div><p style="color:#666;font-size:13px;">صالح لمدة 15 دقيقة فقط.</p></div>`
            })
          });
          return vpJson({ sent: true, message: 'تم إرسال الرمز على بريدك الإلكتروني' }, 200);
        } catch (err) {
          console.error('[auth/verify-pro/login] error:', err.message);
          return vpJson({ error: 'فشل إرسال البريد' }, 500);
        }
      }

      // OTP verify
      if (bodyAction === 'verify-otp') {
        const { email: otpEmail, otp: otpCode } = vpBody;
        if (!otpEmail || !otpCode) return vpJson({ error: 'Email and otp required' }, 400);
        const KV_URL   = process.env.KV_REST_API_URL;
        const KV_TOKEN = process.env.KV_REST_API_TOKEN;
        try {
          const kvRes  = await fetch(KV_URL + '/get/otp:' + otpEmail, { headers: { Authorization: 'Bearer ' + KV_TOKEN } });
          const kvData = await kvRes.json();
          if (kvData.result !== otpCode) return vpJson({ error: 'الرمز غير صحيح أو منتهي الصلاحية' }, 401);
          await fetch(KV_URL + '/del/otp:' + otpEmail, { method: 'POST', headers: { Authorization: 'Bearer ' + KV_TOKEN } });
          const subRes  = await fetch(KV_URL + '/get/sub:' + otpEmail, { headers: { Authorization: 'Bearer ' + KV_TOKEN } });
          const subData = await subRes.json();
          const isPro   = subData.result === 'active';
          const exp     = Math.floor(Date.now() / 1000) + 30 * 24 * 3600;
          const jwt     = await signJWT({ email: otpEmail, pro: isPro, exp, source: 'otp' }, vpSecret);
          return new Response(JSON.stringify({ jwt, email: otpEmail, isPro }), {
            status: 200,
            headers: { ...VERIFY_PRO_CORS, 'Content-Type': 'application/json', 'Set-Cookie': isPro ? buildCookie(jwt) : '' },
          });
        } catch (err) {
          console.error('[auth/verify-pro/verify-otp] error:', err.message);
          return vpJson({ error: 'Internal error' }, 500);
        }
      }

      return vpJson({ error: 'Missing code or token' }, 400);
    }

    return json({ error: `action غير معروف: ${action}` }, 400);

  } catch (err) {
    console.error('[api/auth]', err.message);
    return json({ error: 'خطأ في الخادم: ' + err.message }, 500);
  }
}

export const config = { runtime: 'edge' };
