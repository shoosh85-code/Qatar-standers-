// api/rate-limit.js — QatarSpec Pro
// PROTOCOL 6: Rate Limiting — Vercel KV + in-memory fallback
// Free: 5/min | Pro: 60/min | Global: 100/min/IP

// ===== In-Memory Fallback Store =====
const memoryStore = new Map();

// تنظيف السجلات المنتهية كل 5 دقائق
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of memoryStore.entries()) {
    if (now > val.resetAt) memoryStore.delete(key);
  }
}, 5 * 60 * 1000);

// ===== حدود كل Endpoint =====
const ENDPOINT_LIMITS = {
  '/api/ai-proxy':          { free: 5,  pro: 60,  global: 100 },
  '/api/verify-pro':        { free: 3,  pro: 10,  global: 30  },
  '/api/qcs-search':        { free: 10, pro: 100, global: 200 },
  '/api/vision-proxy':      { free: 3,  pro: 30,  global: 50  },
  '/api/scan-upload':       { free: 2,  pro: 20,  global: 50  },
  '/api/scan-status':       { free: 20, pro: 200, global: 500 },
  '/api/chatbot':           { free: 10, pro: 60,  global: 120 },
  '/api/generate-document': { free: 3,  pro: 30,  global: 60  },
  '/api/execution-ai':      { free: 5,  pro: 50,  global: 100 },
  '/api/export-pdf':        { free: 3,  pro: 20,  global: 40  },
};

const WINDOW_MS = 60 * 1000; // نافذة دقيقة واحدة

// ===== KV Operations مع Fallback =====
async function kvIncrement(key) {
  // محاولة Vercel KV أولاً
  try {
    const { kv } = await import('@vercel/kv');
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, 60); // تنتهي بعد 60 ثانية
    }
    return { count, source: 'kv' };
  } catch {
    // Fallback: In-Memory Map
    const now = Date.now();
    const windowKey = Math.floor(now / WINDOW_MS) * WINDOW_MS;
    const fullKey = `${key}:${windowKey}`;

    const entry = memoryStore.get(fullKey);
    if (!entry || now > entry.resetAt) {
      memoryStore.set(fullKey, { count: 1, resetAt: windowKey + WINDOW_MS });
      return { count: 1, source: 'memory' };
    }
    entry.count++;
    return { count: entry.count, source: 'memory' };
  }
}

// ===== الدالة الرئيسية =====
export async function rateLimit(req, endpoint, userTier = 'free') {
  // استخراج IP
  const ip =
    req.headers.get?.('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers.get?.('x-real-ip') ||
    req.headers['x-real-ip'] ||
    'unknown';

  const now = Date.now();
  const windowSlot = Math.floor(now / WINDOW_MS);
  const resetAt = (windowSlot + 1) * WINDOW_MS;
  const retryAfter = Math.ceil((resetAt - now) / 1000);

  const limits = ENDPOINT_LIMITS[endpoint] || { free: 5, pro: 60, global: 100 };

  // === فحص 1: Global IP limit ===
  const globalKey = `rl:g:${endpoint}:${ip}:${windowSlot}`;
  const { count: globalCount } = await kvIncrement(globalKey);

  if (globalCount > limits.global) {
    return buildResponse(true, 429, {
      error: 'Too Many Requests',
      message: 'تجاوز الحد العالمي — انتظر دقيقة',
      retryAfter,
      limit: limits.global,
      remaining: 0,
      resetAt,
      upgradeAvailable: false,
    });
  }

  // === فحص 2: User Tier limit ===
  const tierLimit = userTier === 'pro' ? limits.pro : limits.free;
  const tierKey = `rl:${userTier}:${endpoint}:${ip}:${windowSlot}`;
  const { count: tierCount } = await kvIncrement(tierKey);

  if (tierCount > tierLimit) {
    return buildResponse(true, 429, {
      error: 'Too Many Requests',
      message:
        userTier === 'free'
          ? `وصلت للحد المجاني (${limits.free}/دقيقة) — ترقّ للـ Pro للحصول على ${limits.pro} طلب/دقيقة`
          : `تجاوزت حد الـ Pro (${limits.pro}/دقيقة)`,
      retryAfter,
      limit: tierLimit,
      remaining: 0,
      resetAt,
      upgradeAvailable: userTier === 'free',
    });
  }

  // === OK: ضمن الحدود ===
  return buildResponse(false, 200, {
    limit: tierLimit,
    remaining: tierLimit - tierCount,
    resetAt,
  });
}

// ===== بناء الـ Response Object =====
function buildResponse(limited, status, data) {
  const headers = {
    'X-RateLimit-Limit': String(data.limit || 0),
    'X-RateLimit-Remaining': String(data.remaining ?? 0),
    'X-RateLimit-Reset': String(Math.floor((data.resetAt || Date.now()) / 1000)),
  };
  if (limited) headers['Retry-After'] = String(data.retryAfter || 60);

  return { limited, allowed: !limited, status, headers, body: limited ? data : null };
}

// ===== Middleware Wrapper لـ Vercel API Routes =====
export function withRateLimit(handler, endpoint) {
  return async function (req, res) {
    // استخراج tier من JWT أو header (server-side فقط)
    const userTier = req.headers['x-user-tier'] || 'free';

    const result = await rateLimit(req, endpoint, userTier);

    // إضافة headers دائماً
    Object.entries(result.headers).forEach(([k, v]) => res.setHeader(k, v));

    if (result.limited) {
      return res.status(429).json(result.body);
    }

    // تابع للـ handler الأصلي
    return handler(req, res);
  };
}

// ===== Backward-compatible exports (used by project-hub, checklists, ncr-log, etc.) =====
export function getIp(req) {
  return (
    req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers?.['x-real-ip'] ||
    'unknown'
  );
}

// checkRateLimit(ip|req, tier|endpoint, endpoint|isPro)
// Supports two call patterns:
//   checkRateLimit(ip, endpoint, isPro)    — project-hub style
//   checkRateLimit(req, tier, endpoint)    — tap.js style
export async function checkRateLimit(ipOrReq, tierOrEndpoint, endpointOrIsPro) {
  let ip, endpoint, tier;

  if (ipOrReq && typeof ipOrReq === 'object') {
    // tap.js style: checkRateLimit(req, tier, endpoint)
    ip = getIp(ipOrReq);
    tier = tierOrEndpoint || 'free';
    endpoint = String(endpointOrIsPro || '').replace(/^\/api\//, '');
  } else {
    // project-hub style: checkRateLimit(ip, endpoint, isPro)
    ip = ipOrReq || 'unknown';
    endpoint = String(tierOrEndpoint || '').replace(/^\/api\//, '');
    tier = endpointOrIsPro ? 'pro' : 'free';
  }

  const limits = ENDPOINT_LIMITS[`/api/${endpoint}`] || { free: 30, pro: 120, global: 200 };
  const limit = limits[tier] || 30;
  const key = `rl:${endpoint}:${ip}`;

  const now = Date.now();
  const windowSlot = Math.floor(now / WINDOW_MS);
  const fullKey = `${key}:${windowSlot}`;
  const resetAt = (windowSlot + 1) * WINDOW_MS;

  let count = 1;
  const entry = memoryStore.get(fullKey);
  if (entry && now <= entry.resetAt) {
    entry.count++;
    count = entry.count;
  } else {
    memoryStore.set(fullKey, { count: 1, resetAt });
  }

  const limited = count > limit;
  const retryAfter = limited ? Math.ceil((resetAt - now) / 1000) : 0;
  return {
    limited,
    allowed: !limited,
    remaining: Math.max(0, limit - count),
    resetAt,
    retryAfter,
    // headers for direct use
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(Math.max(0, limit - count)),
    'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
  };
}

// rateLimitHeaders(rl) — returns headers object for tap.js
export function rateLimitHeaders(rl) {
  return {
    'X-RateLimit-Limit': rl['X-RateLimit-Limit'] || '30',
    'X-RateLimit-Remaining': rl['X-RateLimit-Remaining'] || '0',
    'X-RateLimit-Reset': rl['X-RateLimit-Reset'] || '0',
    ...(rl.limited ? { 'Retry-After': String(rl.retryAfter || 60) } : {}),
  };
}

// applyRateLimitHeaders(res, rl) — for export-pdf.js
export function applyRateLimitHeaders(res, rl) {
  if (!res || !rl) return;
  const headers = rateLimitHeaders(rl);
  if (typeof res.set === 'function') {
    Object.entries(headers).forEach(([k, v]) => res.set(k, v));
  } else if (typeof res.setHeader === 'function') {
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  }
}

// ===== مثال استخدام =====
/*
// في api/ai-proxy.js:
import { withRateLimit } from './rate-limit.js';

async function handler(req, res) {
  // ... كود الـ endpoint
}

export default withRateLimit(handler, '/api/ai-proxy');
*/
