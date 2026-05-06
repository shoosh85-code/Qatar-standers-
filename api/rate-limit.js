/**
 * QatarSpec Pro — Rate Limiting Middleware
 * PROTOCOL 6: كل API endpoint يجب أن يحتوي على rate limit
 *
 * Stack:
 *   Primary:  @upstash/ratelimit + @vercel/kv → Sliding Window, Multi-instance safe
 *   Fallback: in-memory Map → Single instance (dev / KV not configured)
 *
 * الاستخدام:
 *   import { withRateLimit } from './rate-limit.js';
 *   export default withRateLimit(handler, { endpoint: '/api/ai-proxy' });
 */

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

export const TIER_LIMITS = {
  free:       { requests: 5,   windowSec: 60 },
  pro:        { requests: 60,  windowSec: 60 },
  enterprise: { requests: 300, windowSec: 60 },
  global_ip:  { requests: 100, windowSec: 60 },
};

// حدود مخصصة لكل endpoint (PROTOCOL 6 Table)
export const ENDPOINT_LIMITS = {
  '/api/ai-proxy':     { free: 5,  pro: 60,  global: 100 },
  '/api/verify-pro':   { free: 3,  pro: 10,  global: 30  },
  '/api/qcs-search':   { free: 10, pro: 100, global: 200 },
  '/api/vision-proxy': { free: 3,  pro: 30,  global: 50  },
};

// ─────────────────────────────────────────────────────────────────
// UPSTASH RATELIMIT — Sliding Window (Primary)
// ─────────────────────────────────────────────────────────────────

// كاش instances — تُنشأ مرة واحدة per process per limit value
const _upstashCache = new Map();

async function getUpstashLimiter(maxRequests) {
  if (_upstashCache.has(maxRequests)) return _upstashCache.get(maxRequests);

  try {
    const [{ Ratelimit }, { kv }] = await Promise.all([
      import('@upstash/ratelimit'),
      import('@vercel/kv'),
    ]);

    // KV يحتاج إحدى هذه المتغيرات لكي يعمل
    if (!process.env.KV_REST_API_URL && !process.env.KV_URL) return null;

    const limiter = new Ratelimit({
      redis: kv,
      // Sliding Window: أدق من Fixed Window — يمنع burst على حدود النافذة
      limiter: Ratelimit.slidingWindow(maxRequests, '1 m'),
      prefix: 'qs:rl',
      analytics: false,
    });

    _upstashCache.set(maxRequests, limiter);
    return limiter;
  } catch {
    // @upstash/ratelimit غير مثبت أو KV غير متاح → fallback
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────
// IN-MEMORY FALLBACK (Fixed Window)
// ─────────────────────────────────────────────────────────────────

const _memStore = new Map();

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, rec] of _memStore.entries()) {
      if (now > rec.resetAt) _memStore.delete(key);
    }
  }, 60_000);
}

function _memCheck(key, maxRequests, windowMs = 60_000) {
  const now = Date.now();
  let rec = _memStore.get(key);

  if (!rec || now > rec.resetAt) {
    rec = { count: 1, resetAt: now + windowMs };
    _memStore.set(key, rec);
    return { allowed: true, remaining: maxRequests - 1, resetAt: rec.resetAt, retryAfter: 0, store: 'memory' };
  }

  if (rec.count >= maxRequests) {
    const retryAfter = Math.ceil((rec.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetAt: rec.resetAt, retryAfter, store: 'memory' };
  }

  rec.count++;
  return { allowed: true, remaining: maxRequests - rec.count, resetAt: rec.resetAt, retryAfter: 0, store: 'memory' };
}

// ─────────────────────────────────────────────────────────────────
// CORE CHECK
// ─────────────────────────────────────────────────────────────────

async function _check(key, limit) {
  try {
    const limiter = await getUpstashLimiter(limit);
    if (limiter) {
      const r = await limiter.limit(key);
      return {
        allowed:    r.success,
        remaining:  r.remaining,
        resetAt:    r.reset,
        retryAfter: r.success ? 0 : Math.ceil((r.reset - Date.now()) / 1000),
        store:      'upstash',
      };
    }
  } catch { /* Upstash فشل → in-memory */ }

  return _memCheck(key, limit);
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

export function getClientIP(req) {
  const fwd =
    req.headers?.get?.('x-forwarded-for') ||
    req.headers?.['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return (
    req.headers?.get?.('x-real-ip')   ||
    req.headers?.['x-real-ip']        ||
    req.connection?.remoteAddress     ||
    req.socket?.remoteAddress         ||
    '0.0.0.0'
  );
}

export function getUserTier(req) {
  const authVal =
    req.headers?.get?.('authorization') ||
    req.headers?.['authorization'] || '';
  const token = authVal.replace('Bearer ', '').trim();

  if (!token) {
    const th =
      req.headers?.get?.('x-user-tier') ||
      req.headers?.['x-user-tier'] || '';
    return ['pro', 'enterprise'].includes(th) ? th : 'free';
  }
  if (token.startsWith('ent_')) return 'enterprise';
  if (token.startsWith('pro_')) return 'pro';
  return 'free';
}

// FNV-1a hash — لا PII في KV keys
export function hashIP(ip) {
  if (!ip || ip === '0.0.0.0' || ip === 'unknown') return 'unknown';
  let h1 = 0x811c9dc5, h2 = 0xcbf29ce4;
  for (let i = 0; i < ip.length; i++) {
    h1 ^= ip.charCodeAt(i); h1 = Math.imul(h1, 0x01000193);
    h2 ^= ip.charCodeAt(i); h2 = Math.imul(h2, 0x01000193);
  }
  return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
}

export function applyRateLimitHeaders(res, rl) {
  if (!res || !rl) return;
  res.setHeader?.('X-RateLimit-Limit',     rl.limit     ?? 5);
  res.setHeader?.('X-RateLimit-Remaining', rl.remaining ?? 0);
  if (rl.resetAt)                 res.setHeader?.('X-RateLimit-Reset',  Math.ceil(rl.resetAt / 1000));
  if (rl.tier)                    res.setHeader?.('X-RateLimit-Tier',   rl.tier);
  if (!rl.allowed && rl.retryAfter) res.setHeader?.('Retry-After', rl.retryAfter);
}

function _429msg(tier, retryAfter) {
  return tier === 'free'
    ? 'وصلت للحد المجاني. ارقَ لـ Pro للحصول على 60 طلب/دقيقة.'
    : `تجاوزت الحد المسموح. حاول بعد ${retryAfter} ثانية.`;
}

// ─────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────

/**
 * withRateLimit — يُغلّف handler بـ rate limiting تلقائي
 * @example export default withRateLimit(handler, { endpoint: '/api/ai-proxy' });
 */
export function withRateLimit(handler, options = {}) {
  const { endpoint = '/api/unknown' } = options;

  return async function rateLimitedHandler(req, res) {
    const ip    = hashIP(getClientIP(req));
    const tier  = getUserTier(req);
    const cfg   = ENDPOINT_LIMITS[endpoint] ?? { free: 5, pro: 60, global: 100 };
    const limit = cfg[tier] ?? cfg.free;

    const [userRes, globalRes] = await Promise.all([
      _check(`${endpoint}:${ip}:${tier}`,  limit),
      _check(`${endpoint}:ip:${ip}`,       cfg.global ?? 100),
    ]);

    const remaining  = Math.min(userRes.remaining, globalRes.remaining);
    const minResetAt = Math.min(userRes.resetAt,   globalRes.resetAt);

    res.setHeader('X-RateLimit-Limit',     limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset',     Math.ceil(minResetAt / 1000));
    res.setHeader('X-RateLimit-Tier',      tier);

    if (!userRes.allowed || !globalRes.allowed) {
      const retryAfter = Math.max(userRes.retryAfter, globalRes.retryAfter);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        error:      'Too Many Requests',
        message:    _429msg(tier, retryAfter),
        retryAfter,
        tier,
        upgrade:    tier === 'free' ? 'https://qatar-standers.vercel.app/#pro' : null,
      });
    }

    return handler(req, res);
  };
}

/**
 * applyRateLimit — للاستخدام المباشر داخل handler
 * @example
 *   const { allowed } = await applyRateLimit(req, res, '/api/ai-proxy');
 *   if (!allowed) return;
 */
export async function applyRateLimit(req, res, endpoint = '/api/unknown') {
  const ip    = hashIP(getClientIP(req));
  const tier  = getUserTier(req);
  const cfg   = ENDPOINT_LIMITS[endpoint] ?? { free: 5, pro: 60, global: 100 };
  const limit = cfg[tier] ?? cfg.free;

  const [userRes, globalRes] = await Promise.all([
    _check(`${endpoint}:${ip}:${tier}`,  limit),
    _check(`${endpoint}:ip:${ip}`,       cfg.global ?? 100),
  ]);

  const remaining  = Math.min(userRes.remaining, globalRes.remaining);
  const minResetAt = Math.min(userRes.resetAt,   globalRes.resetAt);

  res.setHeader('X-RateLimit-Limit',     limit);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset',     Math.ceil(minResetAt / 1000));
  res.setHeader('X-RateLimit-Tier',      tier);

  if (!userRes.allowed || !globalRes.allowed) {
    const retryAfter = Math.max(userRes.retryAfter, globalRes.retryAfter);
    res.setHeader('Retry-After', retryAfter);
    res.status(429).json({
      error:      'Too Many Requests',
      message:    _429msg(tier, retryAfter),
      retryAfter,
      tier,
      upgrade:    tier === 'free' ? 'https://qatar-standers.vercel.app/#pro' : null,
    });
    return { allowed: false, retryAfter };
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * rateLimit — wrapper مُبسّط
 * @example const rl = await rateLimit(req, tier, 'ai-proxy');
 */
export async function rateLimit(req, tier, endpointName) {
  const ip    = hashIP(getClientIP(req));
  const epKey = '/api/' + endpointName;
  const cfg   = ENDPOINT_LIMITS[epKey] ?? { free: 5, pro: 60, global: 100 };
  const limit = cfg[tier] ?? cfg.free;
  const result = await _check(`${epKey}:${ip}:${tier}`, limit);
  return { ...result, limit, tier };
}

/**
 * checkRateLimit — alias للـ auth-proxy و supabase-proxy
 * @example const { allowed } = await checkRateLimit(ip, 'supabase-proxy', false);
 */
export async function checkRateLimit(ip, endpointName, isPro) {
  const hashedIp = hashIP(ip);
  const epKey    = '/api/' + endpointName;
  const tier     = isPro ? 'pro' : 'free';
  const cfg      = ENDPOINT_LIMITS[epKey] ?? { free: 5, pro: 60, global: 100 };
  const limit    = cfg[tier] ?? cfg.free;
  const result   = await _check(`${epKey}:${hashedIp}:${tier}`, limit);
  return { ...result, limit, tier };
}

// Aliases
export const getIp = getClientIP;
