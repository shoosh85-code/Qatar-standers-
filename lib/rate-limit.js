// lib/rate-limit.js — Edge-compatible, Upstash Redis
// PROTOCOL 6: shared rate limiting across all Edge instances
import { Redis } from '@upstash/redis';

const ENDPOINT_LIMITS = {
  '/api/ai-proxy':      { free: 5,  pro: 60,  global: 100 },
  '/api/verify-pro':    { free: 3,  pro: 10,  global: 30  },
  '/api/qcs-search':    { free: 10, pro: 100, global: 200 },
  '/api/vision-proxy':  { free: 3,  pro: 30,  global: 50  },
};
const DEFAULT_LIMITS = { free: 5, pro: 60, global: 100 };
const WINDOW = 60; // ثانية

function getRedis() {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// in-memory fallback (per-instance, per-minute — acceptable degradation)
const _mem = new Map();
function memCheck(key, limit) {
  const now = Date.now();
  const win = Math.floor(now / 60000);
  const k = `${key}:${win}`;
  const c = (_mem.get(k) || 0) + 1;
  _mem.set(k, c);
  // تنظيف قديم
  if (_mem.size > 2000) {
    const old = win - 2;
    for (const mk of _mem.keys()) if (mk.endsWith(`:${old}`)) _mem.delete(mk);
  }
  const retryAfter = 60 - (now % 60000) / 1000 | 0;
  return { allowed: c <= limit, count: c, limit, retryAfter };
}

export async function checkRateLimit(ip, endpoint, isPro) {
  const lim = ENDPOINT_LIMITS[endpoint] || DEFAULT_LIMITS;
  const tier   = isPro ? lim.pro    : lim.free;
  const global = lim.global;
  const win    = Math.floor(Date.now() / 1000 / WINDOW);
  const tKey   = `rl:${win}:${isPro?'pro':'free'}:${ip}:${endpoint}`;
  const gKey   = `rl:${win}:global:${ip}:${endpoint}`;

  const redis = getRedis();
  if (redis) {
    try {
      const [tc, gc] = await Promise.all([
        redis.incr(tKey),
        redis.incr(gKey),
      ]);
      // TTL فقط على الأول (atomic enough)
      if (tc === 1) await redis.expire(tKey, WINDOW * 2);
      if (gc === 1) await redis.expire(gKey, WINDOW * 2);
      const retryAfter = WINDOW - (Date.now() / 1000 % WINDOW) | 0;
      if (gc > global) return { allowed: false, count: gc, limit: global, retryAfter, source: 'redis' };
      if (tc > tier)   return { allowed: false, count: tc, limit: tier,   retryAfter, source: 'redis' };
      return { allowed: true,  count: tc, limit: tier, retryAfter: 0, source: 'redis' };
    } catch (e) {
      console.error('[rate-limit] Redis error:', e.message);
    }
  }
  // fallback
  const gRes = memCheck(`global:${ip}:${endpoint}`, global);
  if (!gRes.allowed) return { ...gRes, source: 'memory' };
  return { ...memCheck(`${isPro?'pro':'free'}:${ip}:${endpoint}`, tier), source: 'memory' };
}

export function rateLimitResponse(result, cors = {}) {
  return new Response(
    JSON.stringify({
      error: `تجاوزت الحد المسموح (${result.limit} طلب/دقيقة). انتظر ${result.retryAfter} ثانية.`,
      code: 'RATE_LIMIT',
      retryAfter: result.retryAfter,
      limit: result.limit,
    }),
    {
      status: 429,
      headers: {
        ...cors,
        'Content-Type': 'application/json',
        'Retry-After': String(result.retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Source': result.source,
      },
    }
  );
}
