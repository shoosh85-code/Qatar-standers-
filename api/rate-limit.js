// api/rate-limit.js — QatarSpec Pro v4.0
// Node.js Serverless Rate Limiting — Upstash Redis (PRIMARY) + in-memory fallback
// يحتفظ بكل exports القديمة (backward compatible)
// [إعادة كتابة: استبدال vercel-kv بـ upstash-redis]

import { Redis } from '@upstash/redis';

// ── Endpoint limits — PROTOCOL 6 ──────────────────────────────────────────
const ENDPOINT_LIMITS = {
  '/api/ai-proxy':            { free: 5,  pro: 60,  global: 100 },
  '/api/verify-pro':          { free: 3,  pro: 10,  global: 30  },
  '/api/qcs-search':          { free: 10, pro: 100, global: 200 },
  '/api/vision-proxy':        { free: 3,  pro: 30,  global: 50  },
  '/api/execution-hub':       { free: 5,  pro: 60,  global: 100 },
  '/api/generate-embeddings': { free: 2,  pro: 20,  global: 30  },
  '/api/setup-vectors':       { free: 1,  pro: 5,   global: 10  },
  '/api/tap':                 { free: 3,  pro: 10,  global: 20  },
  '/api/supabase-proxy':      { free: 10, pro: 100, global: 200 },
  '/api/auth-proxy':          { free: 5,  pro: 20,  global: 50  },
  '/api/export-pdf':          { free: 2,  pro: 30,  global: 50  },
  'verify-pro':               { free: 3,  pro: 10,  global: 30  },
  'qcs-search':               { free: 10, pro: 100, global: 200 },
  'generate-embeddings':      { free: 2,  pro: 20,  global: 30  },
};
const DEFAULT_LIMITS = { free: 5, pro: 60, global: 100 };
const WINDOW = 60;

// ── Upstash Redis singleton ────────────────────────────────────────────────
let _redis = null;
function getRedis() {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try { _redis = new Redis({ url, token }); return _redis; }
  catch (e) { console.error('[rate-limit] Redis init:', e.message); return null; }
}

// ── In-memory fallback ─────────────────────────────────────────────────────
const _mem = new Map();
setInterval(() => {
  const cutoff = Math.floor(Date.now() / 60000) - 2;
  for (const k of _mem.keys()) {
    const win = parseInt(k.split(':').pop(), 10);
    if (!isNaN(win) && win < cutoff) _mem.delete(k);
  }
}, 120_000);

function memCheck(key, limit) {
  const win = Math.floor(Date.now() / 60000);
  const k   = `${key}:${win}`;
  const c   = (_mem.get(k) || 0) + 1;
  _mem.set(k, c);
  const retryAfter = 60 - Math.floor((Date.now() % 60000) / 1000);
  return { allowed: c <= limit, count: c, limit, remaining: Math.max(0, limit - c), retryAfter, source: 'memory' };
}

async function redisCheck(key, limit) {
  const redis = getRedis();
  if (!redis) return null;
  const win = Math.floor(Date.now() / WINDOW);
  const k   = `rl:${win}:${key}`;
  try {
    const c = await redis.incr(k);
    if (c === 1) await redis.expire(k, WINDOW * 2);
    const retryAfter = WINDOW - Math.floor((Date.now() / 1000) % WINDOW);
    return { allowed: c <= limit, count: c, limit, remaining: Math.max(0, limit - c), retryAfter, source: 'redis' };
  } catch (e) { console.error('[rate-limit] Redis error:', e.message); return null; }
}

// ── EXPORT: getIp ──────────────────────────────────────────────────────────
export function getIp(req) {
  return (
    req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers?.['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// ── EXPORT: checkRateLimit — backward compat (new + old calling patterns) ──
export async function checkRateLimit(ipOrReq, tierOrEndpoint = 'free', endpointOrFlag = null) {
  let ip, isPro, endpoint;
  if (typeof ipOrReq === 'string') {
    ip = ipOrReq; endpoint = tierOrEndpoint;
    isPro = endpointOrFlag === true || endpointOrFlag === 'pro';
  } else {
    ip = getIp(ipOrReq); isPro = tierOrEndpoint === 'pro';
    endpoint = endpointOrFlag || ipOrReq.url?.split('?')[0] || 'default';
  }
  const lim = ENDPOINT_LIMITS[endpoint] || DEFAULT_LIMITS;
  const tLimit = isPro ? lim.pro : lim.free;
  const tier   = isPro ? 'pro' : 'free';
  const tRes = (await redisCheck(`${tier}:${ip}:${endpoint}`, tLimit))   || memCheck(`${tier}:${ip}:${endpoint}`, tLimit);
  const gRes = (await redisCheck(`global:${ip}:${endpoint}`, lim.global)) || memCheck(`global:${ip}:${endpoint}`, lim.global);
  const allowed    = tRes.allowed && gRes.allowed;
  const remaining  = Math.min(tRes.remaining, gRes.remaining);
  const retryAfter = Math.max(tRes.retryAfter, gRes.retryAfter);
  return { allowed, tier, ip, limit: tLimit, remaining, retryAfter, resetAt: Math.floor(Date.now() / 1000) + retryAfter, source: tRes.source };
}

// ── EXPORT: rateLimitHeaders ───────────────────────────────────────────────
export function rateLimitHeaders(result) {
  const h = {
    'X-RateLimit-Limit':     String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining ?? 0),
    'X-RateLimit-Reset':     String(result.resetAt   ?? 0),
    'X-RateLimit-Tier':      result.tier   || 'free',
    'X-RateLimit-Source':    result.source || 'memory',
  };
  if (!result.allowed) h['Retry-After'] = String(result.retryAfter || 60);
  return h;
}

// ── EXPORT: applyRateLimitHeaders ──────────────────────────────────────────
export function applyRateLimitHeaders(res, result) {
  Object.entries(rateLimitHeaders(result)).forEach(([k, v]) => res.setHeader(k, v));
}

// ── EXPORT: rateLimit (alias — backward compat) ────────────────────────────
export async function rateLimit(ip, endpoint = 'default', isPro = false) {
  return checkRateLimit(ip, endpoint, isPro);
}

// ── EXPORT: withRateLimit ──────────────────────────────────────────────────
export async function withRateLimit(req, res, tier = 'free') {
  const ip       = getIp(req);
  const isPro    = tier === 'pro';
  const endpoint = req.url?.split('?')[0] || 'default';
  const result   = await checkRateLimit(ip, endpoint, isPro);
  applyRateLimitHeaders(res, result);
  if (!result.allowed) {
    res.status(429).json({
      error: 'Too Many Requests',
      message: isPro
        ? `تجاوزت الحد المسموح (${result.limit} طلب/دقيقة). حاول بعد ${result.retryAfter} ثانية.`
        : `تجاوزت الحد (${result.limit} طلبات/دقيقة للـ Free). قم بالترقية إلى Pro.`,
      retryAfter: result.retryAfter,
      tier,
      upgrade: !isPro ? 'https://qatar-standers.vercel.app/pro' : null,
    });
    return false;
  }
  return true;
}
