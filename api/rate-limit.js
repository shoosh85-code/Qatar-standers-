// api/rate-limit.js — QatarSpec Pro Rate Limiting
// Vercel KV (primary) + in-memory Map (fallback)
// PROTOCOL 6: كل endpoint يجب أن يمر من هنا

const LIMITS = {
  free:   { requests: 5,   window: 60 },
  pro:    { requests: 60,  window: 60 },
  global: { requests: 100, window: 60 },
};

const ENDPOINT_LIMITS = {
  '/api/ai-proxy':      { free: 5,  pro: 60,  global: 100 },
  '/api/verify-pro':    { free: 3,  pro: 10,  global: 30  },
  '/api/qcs-search':    { free: 10, pro: 100, global: 200 },
  '/api/vision-proxy':  { free: 3,  pro: 30,  global: 50  },
  '/api/execution-hub': { free: 5,  pro: 60,  global: 100 },
};

// In-Memory Fallback
const memoryStore = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of memoryStore.entries()) {
    if (now > data.resetAt) memoryStore.delete(key);
  }
}, 60_000);

// Vercel KV Helper
let kv = null;
async function getKV() {
  if (kv) return kv;
  try {
    const { kv: vercelKV } = await import('@vercel/kv');
    kv = vercelKV;
    return kv;
  } catch {
    return null;
  }
}

async function checkRateLimitKV(key, maxRequests, windowSeconds) {
  const store = await getKV();
  if (!store) return null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const windowKey = `rl:${key}:${Math.floor(now / windowSeconds)}`;
    const count = await store.incr(windowKey);
    if (count === 1) await store.expire(windowKey, windowSeconds);
    const remaining = Math.max(0, maxRequests - count);
    const resetAt = (Math.floor(now / windowSeconds) + 1) * windowSeconds;
    return { allowed: count <= maxRequests, count, remaining, resetAt, limit: maxRequests, source: 'kv' };
  } catch (err) {
    console.error('[RateLimit] KV error:', err.message);
    return null;
  }
}

function checkRateLimitMemory(key, maxRequests, windowSeconds) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const windowKey = `${key}:${Math.floor(now / windowMs)}`;
  const existing = memoryStore.get(windowKey);
  if (!existing) {
    memoryStore.set(windowKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, count: 1, remaining: maxRequests - 1, resetAt: Math.floor((now + windowMs) / 1000), limit: maxRequests, source: 'memory' };
  }
  existing.count++;
  return { allowed: existing.count <= maxRequests, count: existing.count, remaining: Math.max(0, maxRequests - existing.count), resetAt: Math.floor(existing.resetAt / 1000), limit: maxRequests, source: 'memory' };
}

export async function checkRateLimit(req, tier = 'free', endpointPath = null) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || req.connection?.remoteAddress || 'unknown';
  const endpointConfig = endpointPath && ENDPOINT_LIMITS[endpointPath];
  const maxRequests = endpointConfig ? (endpointConfig[tier] ?? LIMITS[tier].requests) : LIMITS[tier].requests;
  const windowSeconds = LIMITS[tier]?.window ?? 60;
  const tierKey = `${tier}:${ip}:${endpointPath || 'default'}`;
  const globalKey = `global:${ip}:${endpointPath || 'default'}`;

  const tierResult = await checkRateLimitKV(tierKey, maxRequests, windowSeconds) || checkRateLimitMemory(tierKey, maxRequests, windowSeconds);
  const globalMax = endpointConfig?.global ?? LIMITS.global.requests;
  const globalResult = await checkRateLimitKV(globalKey, globalMax, windowSeconds) || checkRateLimitMemory(globalKey, globalMax, windowSeconds);

  const allowed = tierResult.allowed && globalResult.allowed;
  const remaining = Math.min(tierResult.remaining, globalResult.remaining);
  const resetAt = Math.max(tierResult.resetAt, globalResult.resetAt);

  return { allowed, tier, ip, limit: maxRequests, remaining, resetAt, retryAfter: allowed ? null : resetAt - Math.floor(Date.now() / 1000), source: tierResult.source };
}

export function rateLimitHeaders(result) {
  const h = {
    'X-RateLimit-Limit':     String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset':     String(result.resetAt),
    'X-RateLimit-Tier':      result.tier,
  };
  if (!result.allowed) h['Retry-After'] = String(result.retryAfter || 60);
  return h;
}

export async function withRateLimit(req, res, tier = 'free') {
  const endpoint = req.url?.split('?')[0] || null;
  const result = await checkRateLimit(req, tier, endpoint);
  Object.entries(rateLimitHeaders(result)).forEach(([k, v]) => res.setHeader(k, v));
  if (!result.allowed) {
    res.status(429).json({
      error: 'Too Many Requests',
      message: tier === 'free'
        ? 'تجاوزت الحد المسموح للمستخدمين المجانيين. قم بالترقية إلى Pro للحصول على 60 طلب/دقيقة.'
        : 'تجاوزت الحد المسموح. حاول مرة أخرى بعد قليل.',
      retryAfter: result.retryAfter,
      tier,
      upgrade: tier === 'free' ? 'https://qatar-standers.vercel.app/pro' : null,
    });
    return false;
  }
  return true;
}

// مثال الاستخدام:
// import { withRateLimit } from './rate-limit.js';
// const tier = req.headers['x-user-tier'] || 'free';
// const allowed = await withRateLimit(req, res, tier);
// if (!allowed) return;

// ── Backward-compatible exports ─────────────────────────────────────────────
// بعض الملفات تستخدم هذه الأسماء القديمة — نحافظ على التوافق

/**
 * استخراج IP من الطلب
 * @param {object} req - Node.js request object
 * @returns {string} IP address
 */
export function getIp(req) {
  return (
    req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers?.['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

/**
 * تطبيق Rate Limit headers على الـ response
 * @param {object} res - Node.js response object
 * @param {object} result - نتيجة checkRateLimit
 */
export function applyRateLimitHeaders(res, result) {
  const headers = rateLimitHeaders(result);
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}

/**
 * Alias لـ checkRateLimit — للتوافق مع الملفات التي تستخدم rateLimit
 * استخدام: const rl = await rateLimit(ip, endpoint, isPro);
 */
export async function rateLimit(ip, endpoint = 'default', isPro = false) {
  const endpointConfig = ENDPOINT_LIMITS[endpoint];
  const tier = isPro ? 'pro' : 'free';
  const maxRequests = endpointConfig ? (endpointConfig[tier] ?? LIMITS[tier].requests) : LIMITS[tier].requests;
  const windowSeconds = LIMITS[tier]?.window ?? 60;
  const tierKey = `${tier}:${ip}:${endpoint}`;
  const globalKey = `global:${ip}:${endpoint}`;

  const tierResult = await checkRateLimitKV(tierKey, maxRequests, windowSeconds)
                     || checkRateLimitMemory(tierKey, maxRequests, windowSeconds);
  const globalMax = endpointConfig?.global ?? LIMITS.global.requests;
  const globalResult = await checkRateLimitKV(globalKey, globalMax, windowSeconds)
                       || checkRateLimitMemory(globalKey, globalMax, windowSeconds);

  const allowed = tierResult.allowed && globalResult.allowed;
  const remaining = Math.min(tierResult.remaining, globalResult.remaining);
  const resetAt = Math.max(tierResult.resetAt, globalResult.resetAt);

  return {
    allowed,
    tier,
    ip,
    limit: maxRequests,
    remaining,
    resetAt,
    retryAfter: allowed ? null : resetAt - Math.floor(Date.now() / 1000),
    source: tierResult.source
  };
}
