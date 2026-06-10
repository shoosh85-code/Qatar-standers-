// api/rate-limit.js — Inline fallback (no external deps)
const _store = new Map();
setInterval(() => { const now = Date.now(); for (const [k,v] of _store.entries()) { if (v.resetAt < now) _store.delete(k); } }, 60000);

function _incr(key) {
  const now = Date.now();
  const entry = _store.get(key) || { count: 0, resetAt: now + 60000 };
  entry.count++;
  _store.set(key, entry);
  return entry;
}

export function getIp(req) {
  if (req && req.headers) {
    if (typeof req.headers.get === 'function') return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  }
  return 'unknown';
}

export async function checkRateLimit(ipOrReq, endpoint, isPro) {
  const ip = typeof ipOrReq === 'string' ? ipOrReq : getIp(ipOrReq);
  const limit = isPro ? 60 : 20;
  const key = `rl:${endpoint}:${ip}:${Math.floor(Date.now()/60000)}`;
  const entry = _incr(key);
  const allowed = entry.count <= limit;
  return { allowed, remaining: Math.max(0, limit - entry.count), retryAfter: allowed ? 0 : 60 };
}

export async function rateLimit(req, tier, endpoint) {
  const ip = getIp(req);
  const isPro = tier === 'pro' || tier === 'enterprise';
  return checkRateLimit(ip, endpoint || 'default', isPro);
}

export function applyRateLimitHeaders(res, rl) {
  if (res && res.setHeader) {
    res.setHeader('X-RateLimit-Remaining', rl.remaining || 0);
    if (!rl.allowed) res.setHeader('Retry-After', rl.retryAfter || 60);
  }
}

export function rateLimitHeaders(rl) {
  return { 'X-RateLimit-Remaining': String(rl.remaining || 0) };
}

export function rateLimitResponse(rl, extraHeaders) {
  return new Response(JSON.stringify({ error: 'Rate limit exceeded', retryAfter: rl.retryAfter }), {
    status: 429,
    headers: { 'Content-Type': 'application/json', 'Retry-After': String(rl.retryAfter || 60), ...(extraHeaders || {}) }
  });
}

export function withRateLimit(handler, endpoint) {
  return async function(req, res) {
    const ip = getIp(req);
    const key = `rl:${endpoint}:${ip}:${Math.floor(Date.now()/60000)}`;
    const entry = _incr(key);
    if (entry.count > 20) return res.status(429).json({ error: 'Rate limit exceeded', retryAfter: 60 });
    return handler(req, res);
  };
}
