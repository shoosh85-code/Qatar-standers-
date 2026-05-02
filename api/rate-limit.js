// api/rate-limit.js
// QatarSpec Pro — Rate Limiting Module v1.0
// يستخدم Vercel KV مع fallback إلى in-memory Map

let kv;
try {
  kv = require('@vercel/kv').kv;
} catch {
  kv = null; // سيتم استخدام in-memory fallback
}

// In-memory fallback store
const memoryStore = new Map();
const MEMORY_CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 دقائق

// تنظيف التسجيلات القديمة كل 5 دقائق
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (now - value.timestamp > MEMORY_CLEANUP_INTERVAL) {
      memoryStore.delete(key);
    }
  }
}, MEMORY_CLEANUP_INTERVAL);

// حدود الطلبات لكل tier وكل endpoint
const LIMITS = {
  free: {
    'ai-proxy':    5,
    'verify-pro':  3,
    'qcs-search':  10,
    'vision-proxy': 3
  },
  pro: {
    'ai-proxy':    60,
    'verify-pro':  10,
    'qcs-search':  100,
    'vision-proxy': 30
  },
  global: {
    perIp: 100 // الحد الإجمالي لكل IP بغض النظر عن الـ tier
  }
};

const WINDOW_MS = 60 * 1000; // نافذة زمنية: 1 دقيقة

/**
 * استخراج IP من الطلب
 */
function getIp(request) {
  return (
    request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    request.headers['x-real-ip'] ||
    request.connection?.remoteAddress ||
    request.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

/**
 * Rate limiting باستخدام Vercel KV
 */
async function checkWithKv(key, limit) {
  const now = Date.now();
  const current = await kv.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= limit) {
    const ttl = await kv.pttl(key);
    return {
      allowed: false,
      retryAfter: Math.ceil((ttl > 0 ? ttl : WINDOW_MS) / 1000),
      remaining: 0
    };
  }

  await kv.set(key, count + 1, { px: WINDOW_MS });
  return { allowed: true, remaining: limit - count - 1 };
}

/**
 * Rate limiting باستخدام in-memory Map (fallback)
 */
function checkWithMemory(key, limit) {
  const now = Date.now();
  const entry = memoryStore.get(key);

  // نافذة جديدة أو أول طلب
  if (!entry || now - entry.timestamp > WINDOW_MS) {
    memoryStore.set(key, { count: 1, timestamp: now });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.timestamp)) / 1000);
    return { allowed: false, retryAfter, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

/**
 * الدالة الرئيسية للـ Rate Limiting
 * @param {object} request - كائن الطلب
 * @param {string} tier    - 'free' | 'pro'
 * @param {string} endpoint - اسم الـ endpoint (بدون /api/)
 * @returns {object} { allowed, remaining?, retryAfter? }
 */
async function rateLimit(request, tier = 'free', endpoint = 'ai-proxy') {
  const ip = getIp(request);
  const tierLimit = LIMITS[tier]?.[endpoint] ?? LIMITS.free[endpoint] ?? 5;
  const globalLimit = LIMITS.global.perIp;

  const tierKey   = `rate:${tier}:${endpoint}:${ip}`;
  const globalKey = `rate:global:${ip}`;

  try {
    if (kv) {
      // التحقق من الـ global limit أولاً
      const globalCheck = await checkWithKv(globalKey, globalLimit);
      if (!globalCheck.allowed) {
        return { allowed: false, retryAfter: globalCheck.retryAfter, reason: 'global' };
      }

      // التحقق من الـ tier limit
      return await checkWithKv(tierKey, tierLimit);
    } else {
      throw new Error('KV not available');
    }
  } catch {
    // Fallback: in-memory
    const globalCheck = checkWithMemory(globalKey, globalLimit);
    if (!globalCheck.allowed) {
      return { allowed: false, retryAfter: globalCheck.retryAfter, reason: 'global' };
    }

    return checkWithMemory(tierKey, tierLimit);
  }
}

/**
 * Middleware Helper — يضيف headers للـ response
 * @param {object} res    - كائن الـ response
 * @param {object} result - ناتج rateLimit()
 */
function applyRateLimitHeaders(res, result) {
  if (!result.allowed) {
    res.setHeader('Retry-After', result.retryAfter ?? 60);
    res.setHeader('X-RateLimit-Remaining', 0);
  } else {
    res.setHeader('X-RateLimit-Remaining', result.remaining ?? 0);
  }
}

module.exports = { rateLimit, applyRateLimitHeaders, LIMITS };
