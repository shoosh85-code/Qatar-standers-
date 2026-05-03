// Secure admin endpoint - issues a session token for testing
// Access: POST /api/admin-session with { secret: process.env.ADMIN_SECRET }
// Returns: { token } stored in client sessionStorage (not URL)
// [SEC] Rate limiting: 3 محاولات/دقيقة لمنع brute-force على الـ admin

// ── Rate Limiting (in-memory) — Node runtime ────────────────────────────────
const _rl = new Map();
function checkRateLimit(ip) {
  const now      = Date.now();
  const windowMs = 60 * 1000;
  const limit    = 3; // صارم للـ admin
  const entry    = _rl.get(ip);
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // ── Rate Limit Check ──────────────────────────────────────────────────────
  const ip = (req.headers['x-forwarded-for']?.split(',')[0]?.trim()) ||
             req.socket?.remoteAddress || '0.0.0.0';
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    res.setHeader('X-RateLimit-Limit', '3');
    res.setHeader('X-RateLimit-Remaining', '0');
    return res.status(429).json({
      error: `تجاوزت الحد (3 محاولات/دقيقة للـ Admin). حاول بعد ${rl.retryAfter} ثانية.`,
    });
  }

  const { secret } = req.body || {};
  const ADMIN_SECRET = process.env.ADMIN_SECRET;

  if (!ADMIN_SECRET) return res.status(503).json({ error: 'Not configured' });
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Issue a short-lived session token (24h)
  const token = Buffer.from(`admin:${Date.now()}:${Math.random()}`).toString('base64');
  
  res.status(200).json({ 
    token,
    expires: Date.now() + 86400000,
    message: 'Store this token in sessionStorage key: qs_admin_token'
  });
}
