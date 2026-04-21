// QatarSpec Pro — /api/verify-pro.js
// Server-side JWT issuer — promo codes NEVER sent to client
export const config = { runtime: 'edge' };

// Codes stored server-side only — never in client JS
const BUILT_IN_CODES = ['QATAR2026PRO', 'QATARSPEC-PRO', 'QS-ENGINEER-2026', 'PRO-BETA-QCS'];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: CORS_HEADERS,
    });
  }

  try {
    const { code } = await request.json();
    const clean = (code || '').trim().toUpperCase();

    if (!clean) {
      return new Response(JSON.stringify({ error: 'أدخل الكود أولاً' }), {
        status: 400, headers: CORS_HEADERS,
      });
    }

    // Merge built-in + env-var codes (e.g. PROMO_CODES="CODE1,CODE2")
    const envCodes = (process.env.PROMO_CODES || '')
      .split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
    const allCodes = [...BUILT_IN_CODES, ...envCodes];

    if (!allCodes.includes(clean)) {
      return new Response(JSON.stringify({ error: 'الكود غير صحيح — تحقق وأعد المحاولة' }), {
        status: 401, headers: CORS_HEADERS,
      });
    }

    const secret = process.env.JWT_SECRET || 'qatarspec-fallback-secret-change-me';
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 60 * 60 * 24 * 30; // 30 days

    const payload = {
      pro: true,
      // Mask code — don't leak full value in token
      ref: clean.substring(0, 4) + '****',
      iat: now,
      exp,
    };

    const token = await signJWT(payload, secret);

    return new Response(JSON.stringify({
      token,
      expiresAt: new Date(exp * 1000).toISOString(),
      message: '🎉 تم تفعيل Pro بنجاح! صالح 30 يوماً.',
    }), { headers: CORS_HEADERS });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'خطأ في الخادم — أعد المحاولة' }), {
      status: 500, headers: CORS_HEADERS,
    });
  }
}

// ── Web Crypto JWT sign (HS256, no external deps) ──
async function signJWT(payload, secret) {
  const encode = obj =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const header = encode({ alg: 'HS256', typ: 'JWT' });
  const body   = encode(payload);
  const msg    = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${msg}.${sig}`;
}
