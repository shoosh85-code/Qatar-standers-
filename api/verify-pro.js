// /api/verify-pro.js — QatarSpec Pro v4.0
// JWT in httpOnly cookie (security upgrade from localStorage)
// Supports: promo codes + TAP payment callbacks
// [SEC v4.0] Rate limiting added per PROTOCOL 6

export const config = { runtime: 'edge' };

import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';
// ملاحظة: checkRateLimit مُستوردة من lib/rate-limit.js — signature: (ip, endpoint, isPro)
// الدالة المحلية القديمة حُذفت لأنها كانت تُسبب SyntaxError في Edge runtime (تعريف مكرر)

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
};

// Support both PRO_CODES and PROMO_CODES env var names for compatibility
// Fallback to hardcoded codes if env vars are not set
const PRO_CODES_RAW = process.env.PROMO_CODES || process.env.PRO_CODES || 'QATAR2026PRO,EARLYBIRD2026';
const VALID_CODES = new Set(
  PRO_CODES_RAW.split(',').map(c => c.trim().toUpperCase()).filter(Boolean)
);

// ── JWT helpers ────────────────────────────────────────────────
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

// ── Cookie builder ─────────────────────────────────────────────
function buildCookie(token, maxAge = 365 * 24 * 3600) {
  return `qs_pro=${token}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`;
}

function clearCookie() {
  return `qs_pro=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`;
}

// ── Extract JWT from cookie string ───────────────────────────
function extractCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : null;
}

// ── Main handler ──────────────────────────────────────────────
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  // ── Rate Limit Check (PROTOCOL 6 — Upstash Redis) ──────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  // كشف Pro مبكر (من cookie) لتطبيق الحد الصحيح
  const _cookieHdr = req.headers.get('cookie') || '';
  const _existingToken = extractCookie(_cookieHdr, 'qs_pro');
  let _isPro = false;
  if (_existingToken && process.env.JWT_SECRET) {
    const _p = await verifyJWT(_existingToken, process.env.JWT_SECRET);
    _isPro = _p?.pro === true;
  }
  const rl = await checkRateLimit(ip, '/api/verify-pro', _isPro);
  if (!rl.allowed) return rateLimitResponse(rl, CORS);

  const secret = process.env.JWT_SECRET;
  if (!secret) return json({ error: 'Server config missing' }, 500);

  const url = new URL(req.url);
  const action = url.searchParams.get('action') || 'activate';

  // ── GET /api/verify-pro?action=status — check current session ──
  if (req.method === 'GET' && action === 'status') {
    const cookieHeader = req.headers.get('cookie');
    const token = extractCookie(cookieHeader, 'qs_pro');
    const payload = await verifyJWT(token, secret);
    return json({
      pro: payload?.pro === true,
      exp: payload?.exp,
      source: payload?.source || null,
    }, 200, {});
  }

  // ── POST /api/verify-pro — activate via promo code ────────────
  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

    const { action: bodyAction, code, token: bodyToken } = body;

    // Deactivate / logout
    if (bodyAction === 'deactivate') {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json', 'Set-Cookie': clearCookie() },
      });
    }

    // Verify existing token (called on page load to validate cookie)
    if (bodyAction === 'verify') {
      const cookieHeader = req.headers.get('cookie');
      const token = extractCookie(cookieHeader, 'qs_pro');
      const payload = await verifyJWT(token, secret);
      return json({ pro: payload?.pro === true, exp: payload?.exp }, 200, {});
    }

    // Activate via promo code
    if (code) {
      const upper = code.trim().toUpperCase();
      if (!VALID_CODES.has(upper)) {
        return json({ valid: false, error: 'كود غير صحيح أو منتهي الصلاحية' }, 200);
      }
      const days = 365;
      const exp = Math.floor(Date.now() / 1000) + days * 24 * 3600;
      const token = await signJWT({ pro: true, exp, source: 'code', code: upper }, secret);
      return new Response(JSON.stringify({ valid: true, success: true, ok: true, token, days, exp }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json', 'Set-Cookie': buildCookie(token) },
      });
    }

    // Activate via external token (Tap payment callback)
    if (bodyToken) {
      const payload = await verifyJWT(bodyToken, secret);
      if (!payload?.pro) return json({ error: 'Invalid token' }, 400);
      const newToken = await signJWT({ ...payload, iat: Date.now() }, secret);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json', 'Set-Cookie': buildCookie(newToken) },
      });
    }

    // ── Merged from api/auth/login.js (v4.1) ─────────────────────────────
    // إرسال OTP عبر Resend إلى البريد الإلكتروني
    // [لا تحذف محتوى — فقط إضافة — v4.1]
    if (bodyAction === 'login') {
      const { email: loginEmail } = body;
      if (!loginEmail || !loginEmail.includes('@')) {
        return json({ error: 'Valid email required' }, 400);
      }

      const RESEND_KEY = process.env.RESEND_API_KEY;
      const KV_URL     = process.env.KV_REST_API_URL;
      const KV_TOKEN   = process.env.KV_REST_API_TOKEN;
      const APP_URL    = process.env.APP_URL || 'https://qatar-standers.vercel.app';

      if (!RESEND_KEY) return json({ error: 'Email service not configured' }, 503);

      // توليد رمز 6 أرقام
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      try {
        // حفظ الرمز في KV (ينتهي بعد 15 دقيقة)
        if (KV_URL) {
          await fetch(KV_URL + '/set/otp:' + loginEmail, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + KV_TOKEN, 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: otp, ex: 900 })
          });
        }

        // إرسال البريد عبر Resend
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + RESEND_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from:    'QatarSpec Pro <noreply@qatarspec.com>',
            to:      loginEmail,
            subject: 'رمز تسجيل الدخول — QatarSpec Pro',
            html: `
              <div dir="rtl" style="font-family:Arial;max-width:400px;margin:0 auto;padding:24px;">
                <h2 style="color:#7a1515;">QatarSpec Pro 🏗️</h2>
                <p>رمز تسجيل الدخول الخاص بك:</p>
                <div style="background:#f5f5f5;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
                  <span style="font-size:36px;font-weight:900;letter-spacing:8px;color:#7a1515;">${otp}</span>
                </div>
                <p style="color:#666;font-size:13px;">صالح لمدة 15 دقيقة فقط.</p>
              </div>`
          })
        });

        return json({ sent: true, message: 'تم إرسال الرمز على بريدك الإلكتروني' }, 200);
      } catch (err) {
        console.error('[verify-pro/login] error:', err.message);
        return json({ error: 'فشل إرسال البريد' }, 500);
      }
    }

    // ── Merged from api/auth/verify.js (v4.1) ────────────────────────────
    // التحقق من OTP وإصدار JWT
    // [لا تحذف محتوى — فقط إضافة — v4.1]
    if (bodyAction === 'verify-otp') {
      const { email: otpEmail, otp: otpCode } = body;
      if (!otpEmail || !otpCode) return json({ error: 'Email and otp required' }, 400);

      const KV_URL   = process.env.KV_REST_API_URL;
      const KV_TOKEN = process.env.KV_REST_API_TOKEN;

      try {
        // التحقق من OTP المحفوظ في KV
        const kvRes  = await fetch(KV_URL + '/get/otp:' + otpEmail, {
          headers: { Authorization: 'Bearer ' + KV_TOKEN }
        });
        const kvData = await kvRes.json();

        if (kvData.result !== otpCode) {
          return json({ error: 'الرمز غير صحيح أو منتهي الصلاحية' }, 401);
        }

        // حذف الـ OTP بعد الاستخدام
        await fetch(KV_URL + '/del/otp:' + otpEmail, {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + KV_TOKEN }
        });

        // فحص هل المستخدم Pro
        const subRes  = await fetch(KV_URL + '/get/sub:' + otpEmail, {
          headers: { Authorization: 'Bearer ' + KV_TOKEN }
        });
        const subData = await subRes.json();
        const isPro   = subData.result === 'active';

        // إصدار JWT موقّع بـ HMAC-SHA256
        const exp     = Math.floor(Date.now() / 1000) + 30 * 24 * 3600;
        const jwt     = await signJWT({ email: otpEmail, pro: isPro, exp, source: 'otp' }, secret);

        return new Response(JSON.stringify({ jwt, email: otpEmail, isPro }), {
          status: 200,
          headers: { ...CORS, 'Content-Type': 'application/json', 'Set-Cookie': isPro ? buildCookie(jwt) : '' },
        });
      } catch (err) {
        console.error('[verify-pro/verify-otp] error:', err.message);
        return json({ error: 'Internal error' }, 500);
      }
    }
    // ── End merged auth actions ───────────────────────────────────────────

    return json({ error: 'Missing code or token' }, 400);

  }

  return json({ error: 'Method not allowed' }, 405);
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json', ...extraHeaders },
  });
}
