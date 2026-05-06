// /api/validate-code.js — QatarSpec Pro
// Server-side promo code validation
// PRO_CODES stored ONLY here — never in client HTML
// [SEC] Rate limiting: 5 محاولات/دقيقة لمنع brute-force على الأكواد


import { withSecurity } from '../lib/security.js';
export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── Rate Limiting (Edge-compatible in-memory) ──────────────────────────────
// حد 5 محاولات/دقيقة لكل IP — يمنع brute-force على أكواد Pro
const _rl = new Map();
function checkRateLimit(ip) {
  const now       = Date.now();
  const windowMs  = 60 * 1000;
  const limit     = 5;
  const entry     = _rl.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    _rl.set(ip, { count: 1, ts: now });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - entry.ts)) / 1000);
    return { allowed: false, retryAfter, remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

const _handler = async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ── Rate Limit Check ──────────────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        valid: false,
        error: `تجاوزت الحد (5 محاولات/دقيقة). حاول بعد ${rl.retryAfter} ثانية.`,
      }),
      {
        status: 429,
        headers: {
          ...CORS,
          'Content-Type':          'application/json',
          'Retry-After':           String(rl.retryAfter),
          'X-RateLimit-Limit':     '5',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ valid: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  const code = (body.code || '').trim().toUpperCase();

  if (!code) {
    return new Response(JSON.stringify({ valid: false, error: 'No code provided' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ✅ Codes stored ONLY in env vars — never hardcoded in source
  const VALID_CODES = (process.env.PROMO_CODES || '')
    .split(',')
    .map(c => c.trim().toUpperCase())
    .filter(Boolean);

  // إذا لم تُضبط PROMO_CODES في env → أعد خطأ واضح
  if (!VALID_CODES.length) {
    return new Response(
      JSON.stringify({ error: 'Promo codes not configured — contact support' }),
      { status: 503, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  const isValid = VALID_CODES.includes(code);

  if (isValid) {
    // Expiry: 1 year from now
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);

    return new Response(
      JSON.stringify({
        valid: true,
        tier: 'pro',
        expiry: expiry.toISOString(),
        message: '🎉 تم تفعيل Pro بنجاح! صالح لسنة كاملة.',
      }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  } else {
    return new Response(
      JSON.stringify({
        valid: false,
        error: 'الكود غير صحيح — تحقق من الكود وأعد المحاولة',
      }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}

export default withSecurity(_handler);
