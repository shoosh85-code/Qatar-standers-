// api/rate-limit.js — QatarSpec Pro v2.0
// يستخدم @upstash/ratelimit بدلاً من @vercel/kv المهجور

import { Ratelimit } from '@upstash/ratelimit';
import { Redis }     from '@upstash/redis';

// ── حدود كل tier ─────────────────────────────────────────
export const TIER_LIMITS = {
  free:       { requests: 5,   window: '1 m' },
  pro:        { requests: 60,  window: '1 m' },
  enterprise: { requests: 300, window: '1 m' },
};

// ── حدود كل endpoint ──────────────────────────────────────
export const ENDPOINT_LIMITS = {
  'ai-proxy':       { free: 5,  pro: 60,  global: 100 },
  'vision-proxy':   { free: 3,  pro: 30,  global: 50  },
  'verify-pro':     { free: 3,  pro: 10,  global: 30  },
  'qcs-search':     { free: 10, pro: 100, global: 200 },
  'mos-generator':  { free: 5,  pro: 60,  global: 100 },
  default:          { free: 5,  pro: 60,  global: 100 },
};

// ── FNV-1a hash للـ IP (بدون crypto) ──────────────────────
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h.toString(16);
}

// ── استخراج IP ────────────────────────────────────────────
export function getClientIP(req) {
  const raw =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  return fnv1a(raw);
}
export const getIp = getClientIP;

// ── تحديد الـ tier من الـ Authorization header ────────────
export function getUserTier(req) {
  const auth = req.headers['authorization'] || '';
  if (auth.startsWith('Enterprise ')) return 'enterprise';
  if (auth.startsWith('Pro '))        return 'pro';
  return 'free';
}

// ── Redis client (singleton) ──────────────────────────────
let _redis = null;
function getRedis() {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    _redis = new Redis({ url, token });
  }
  return _redis;
}

// ── Ratelimit instances cache ─────────────────────────────
const _limiters = {};
function getLimiter(tier, endpoint) {
  const key = `${tier}:${endpoint}`;
  if (_limiters[key]) return _limiters[key];
  const redis = getRedis();
  if (!redis) return null;
  const limits  = ENDPOINT_LIMITS[endpoint] || ENDPOINT_LIMITS.default;
  const max     = limits[tier] || limits.free;
  const window  = TIER_LIMITS[tier]?.window || '1 m';
  _limiters[key] = new Ratelimit({
    redis,
    limiter:        Ratelimit.slidingWindow(max, window),
    analytics:      true,
    prefix:         `qs:rl:${endpoint}`,
    ephemeralCache: new Map(),
  });
  return _limiters[key];
}

// ── In-memory fallback ────────────────────────────────────
const _mem = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of _mem) {
    if (now > v.resetAt + 60000) _mem.delete(k);
  }
}, 60000);

function memCheck(id, max) {
  const now  = Date.now();
  const data = _mem.get(id) || { count: 0, resetAt: now + 60000 };
  if (now > data.resetAt) { data.count = 0; data.resetAt = now + 60000; }
  data.count++;
  _mem.set(id, data);
  return {
    success:   data.count <= max,
    limit:     max,
    remaining: Math.max(0, max - data.count),
    reset:     data.resetAt,
  };
}

// ── Core check ────────────────────────────────────────────
export async function checkRateLimit(id, tier, endpoint) {
  const limiter = getLimiter(tier, endpoint);
  if (!limiter) {
    const max = (ENDPOINT_LIMITS[endpoint] || ENDPOINT_LIMITS.default)[tier] || 5;
    return memCheck(id, max);
  }
  try {
    const r = await limiter.limit(id);
    return { success: r.success, limit: r.limit, remaining: r.remaining, reset: r.reset };
  } catch {
    return { success: true, limit: 999, remaining: 999, reset: Date.now() + 60000 };
  }
}

// ── Headers helper ─────────────────────────────────────────
export function applyRateLimitHeaders(res, r) {
  res.setHeader('X-RateLimit-Limit',     r.limit);
  res.setHeader('X-RateLimit-Remaining', r.remaining);
  res.setHeader('X-RateLimit-Reset',     Math.ceil(r.reset / 1000));
  if (!r.success) {
    res.setHeader('Retry-After', Math.max(1, Math.ceil((r.reset - Date.now()) / 1000)));
  }
}

// ── Main wrapper ──────────────────────────────────────────
export async function withRateLimit(req, res, endpoint = 'default') {
  if (req.method === 'OPTIONS') return true;
  const ip   = getClientIP(req);
  const tier = getUserTier(req);
  const r    = await checkRateLimit(ip, tier, endpoint);
  applyRateLimitHeaders(res, r);
  if (!r.success) {
    res.status(429).json({
      error:      'Too Many Requests',
      message:    `تجاوزت الحد — ${tier}: ${r.limit} طلب/دقيقة`,
      retryAfter: parseInt(res.getHeader('Retry-After'), 10),
    });
    return false;
  }
  return true;
}

export const applyRateLimit = withRateLimit;

export async function rateLimit(req, tier, endpoint = 'default') {
  return checkRateLimit(getClientIP(req), tier, endpoint);
}
