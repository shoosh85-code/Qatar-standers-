// /api/verify-pro.js — QatarSpec Pro
// Issues signed JWT on valid promo code. Verifies JWT on demand.
export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

const BUILT_IN_CODES = ['QATAR2026PRO', 'QATARSPEC-PRO', 'QS-ENGINEER-2026', 'PRO-BETA-QCS'];
const TOKEN_TTL_DAYS = 30;

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return json({ error: 'Server misconfigured — contact support' }, 503);
  }

  // POST /api/verify-pro — issue token from promo code
  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

    // ── Mode 1: activate code ──
    if (body.code) {
      const clean = (body.code || '').trim().toUpperCase();
      if (!clean) return json({ error: 'أدخل الكود أولاً' }, 400);

      const envCodes = (process.env.PROMO_CODES || '')
        .split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
      const allCodes = [...new Set([...BUILT_IN_CODES, ...envCodes])];

      if (!allCodes.includes(clean)) {
        return json({ error: 'الكود غير صحيح — تحقق وأعد المحاولة' }, 401);
      }

      const now = Math.floor(Date.now() / 1000);
      const exp = now + TOKEN_TTL_DAYS * 86400;
      const payload = { pro: true, ref: clean.slice(0, 4) + '****', iat: now, exp };
      const token = await signJWT(payload, secret);

      return json({ token, expiresAt: new Date(exp * 1000).toISOString(),
        message: `🎉 تم تفعيل Pro! صالح ${TOKEN_TTL_DAYS} يوماً.` });
    }

    // ── Mode 2: verify existing token ──
    if (body.token) {
      const result = await verifyJWT(body.token, secret);
      if (result.valid) {
        return json({ valid: true, exp: result.payload.exp });
      } else {
        return json({ valid: false, reason: result.reason }, 401);
      }
    }

    return json({ error: 'Provide code or token' }, 400);
  }

  return json({ error: 'Method not allowed' }, 405);
}

// ── Helpers ──
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

async function getKey(secret) {
  return crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  );
}

function b64url(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function decodeB64url(str) {
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

async function signJWT(payload, secret) {
  const encode = obj => btoa(JSON.stringify(obj))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const header = encode({ alg: 'HS256', typ: 'JWT' });
  const body   = encode(payload);
  const msg    = `${header}.${body}`;
  const key    = await getKey(secret);
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  return `${msg}.${b64url(sigBuf)}`;
}

async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, reason: 'malformed' };
    const msg = `${parts[0]}.${parts[1]}`;
    const key = await getKey(secret);
    const sigBytes = Uint8Array.from(decodeB64url(parts[2]), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(msg));
    if (!ok) return { valid: false, reason: 'invalid_signature' };
    const payload = JSON.parse(decodeB64url(parts[1]));
    if (payload.exp < Math.floor(Date.now() / 1000)) return { valid: false, reason: 'expired' };
    return { valid: true, payload };
  } catch { return { valid: false, reason: 'parse_error' }; }
}
