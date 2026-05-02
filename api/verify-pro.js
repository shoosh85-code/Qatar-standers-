// /api/verify-pro.js — QatarSpec Pro v4.0
// JWT in httpOnly cookie (security upgrade from localStorage)
// Supports: promo codes + TAP payment callbacks
// [SEC v4.0] Rate limiting added per PROTOCOL 6

export const config = { runtime: 'edge' };

// ── Rate Limiting (Edge-compatible in-memory) ──────────────────
// حدود: 3 طلب/دقيقة لكل IP (PROTOCOL 6)
const _rl = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = 3;
  const entry = _rl.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    _rl.set(ip, { count: 1, ts: now });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - entry.ts)) / 1000);
    return { allowed: false, retryAfter };
  }
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

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

  // ── Rate Limit Check ──────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return new Response(JSON.stringify({ error: 'Too Many Requests' }), {
      status: 429,
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'Retry-After': String(rl.retryAfter),
        'X-RateLimit-Limit': '3',
        'X-RateLimit-Remaining': '0',
      },
    });
  }

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
