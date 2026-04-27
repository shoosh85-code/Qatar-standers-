// /api/auth/set-cookie.js — QatarSpec Pro
// Sets httpOnly Secure cookie after JWT validation
// Called by client after successful /api/verify-pro
export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Vary': 'Origin',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), {
      status: 405, headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  let body;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  const { token } = body || {};
  if (!token || typeof token !== 'string' || token.length > 2048) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 400, headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  // Verify the JWT before setting cookie
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 503, headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  const verified = await verifyJWT(token, secret);
  if (!verified.valid) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token', reason: verified.reason }), {
      status: 401, headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  // Calculate cookie max-age from token expiry
  const now = Math.floor(Date.now() / 1000);
  const maxAge = Math.max(0, verified.payload.exp - now);

  // Set httpOnly Secure SameSite=Strict cookie
  const cookieValue = [
    `qs_pro_token=${token}`,
    `Max-Age=${maxAge}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
  ].join('; ');

  return new Response(
    JSON.stringify({ ok: true, expiresAt: new Date(verified.payload.exp * 1000).toISOString() }),
    {
      status: 200,
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'Set-Cookie': cookieValue,
      },
    }
  );
}

async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, reason: 'malformed' };
    const msg = `${parts[0]}.${parts[1]}`;
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const decodeB64 = s => Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify('HMAC', key, decodeB64(parts[2]), new TextEncoder().encode(msg));
    if (!ok) return { valid: false, reason: 'invalid_signature' };
    const payload = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
    if (payload.exp < Math.floor(Date.now() / 1000)) return { valid: false, reason: 'expired' };
    if (payload.pro !== true) return { valid: false, reason: 'not_pro' };
    return { valid: true, payload };
  } catch { return { valid: false, reason: 'parse_error' }; }
}
