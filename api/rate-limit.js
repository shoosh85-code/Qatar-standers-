/**
 * QatarSpec Pro — Rate Limiting Middleware
 * PROTOCOL 6: كل API endpoint يجب أن يحتوي على rate limit
 *
 * الأولوية:
 * 1. Vercel KV (إذا متاح) — موزع عبر كل instances
 * 2. In-Memory Map (fallback) — يعمل على instance واحد فقط
 *
 * الحدود:
 * - Free tier:   5  req/min
 * - Pro tier:    60 req/min
 * - Global/IP:   100 req/min per IP
 */

// ─────────────────────────────────────────────
// IN-MEMORY FALLBACK STORE
// يُستخدم عندما Vercel KV غير متاح
// ─────────────────────────────────────────────
const memoryStore = new Map();

// تنظيف تلقائي كل دقيقة — يمنع تراكم الذاكرة
const CLEANUP_INTERVAL_MS = 60 * 1000;
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      if (now > record.resetAt) {
        memoryStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);
}

// ─────────────────────────────────────────────
// حدود كل tier
// ─────────────────────────────────────────────
const TIER_LIMITS = {
  free:       { requests: 5,   windowMs: 60 * 1000 },
  pro:        { requests: 60,  windowMs: 60 * 1000 },
  enterprise: { requests: 300, windowMs: 60 * 1000 },
  global_ip:  { requests: 100, windowMs: 60 * 1000 },
};

// حدود مخصصة لكل endpoint
const ENDPOINT_LIMITS = {
  '/api/ai-proxy':     { free: 5,  pro: 60,  global: 100 },
  '/api/verify-pro':   { free: 3,  pro: 10,  global: 30  },
  '/api/qcs-search':   { free: 10, pro: 100, global: 200 },
  '/api/vision-proxy': { free: 3,  pro: 30,  global: 50  },
};

// ─────────────────────────────────────────────
// استخراج IP من الطلب
// ─────────────────────────────────────────────
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // خذ أول IP في السلسلة (المستخدم الأصلي)
    return forwarded.split(',')[0].trim();
  }
  return (
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// ─────────────────────────────────────────────
// تحديد tier المستخدم
// يمكن تطوير هذه الدالة لاحقاً لتتحقق من Supabase
// ─────────────────────────────────────────────
function getUserTier(req) {
  // Authorization header: "Bearer pro_<token>" أو "Bearer ent_<token>"
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();

  if (!token) return 'free';
  if (token.startsWith('ent_')) return 'enterprise';
  if (token.startsWith('pro_')) return 'pro';

  // x-user-tier header كبديل (للـ internal calls)
  const tierHeader = req.headers['x-user-tier'] || '';
  if (['pro', 'enterprise'].includes(tierHeader)) return tierHeader;

  return 'free';
}

// ─────────────────────────────────────────────
// VERCEL KV: قراءة وكتابة
// ─────────────────────────────────────────────
let kv = null;

async function getKV() {
  if (kv) return kv;
  try {
    // @vercel/kv متاح في بيئة Vercel فقط
    const module = await import('@vercel/kv');
    kv = module.kv;
    return kv;
  } catch {
    // KV غير متاح — نستخدم in-memory
    return null;
  }
}

async function kvGet(key) {
  const store = await getKV();
  if (!store) return null;
  try {
    return await store.get(key);
  } catch {
    return null;
  }
}

async function kvSet(key, value, ttlSeconds) {
  const store = await getKV();
  if (!store) return false;
  try {
    await store.set(key, value, { ex: ttlSeconds });
    return true;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────
// دالة فحص الـ rate limit
// تُعيد: { allowed, remaining, resetAt, retryAfter }
// ─────────────────────────────────────────────
async function checkRateLimit(key, maxRequests, windowMs) {
  const now = Date.now();
  const windowSeconds = Math.floor(windowMs / 1000);

  // ────── محاولة Vercel KV أولاً ──────
  const store = await getKV();
  if (store) {
    try {
      const kvKey = `rl:${key}`;
      let record = await kvGet(kvKey);

      if (!record || now > record.resetAt) {
        // نافذة جديدة
        record = { count: 1, resetAt: now + windowMs };
        await kvSet(kvKey, record, windowSeconds);
        return {
          allowed: true,
          remaining: maxRequests - 1,
          resetAt: record.resetAt,
          retryAfter: 0,
          store: 'kv',
        };
      }

      if (record.count >= maxRequests) {
        const retryAfter = Math.ceil((record.resetAt - now) / 1000);
        return {
          allowed: false,
          remaining: 0,
          resetAt: record.resetAt,
          retryAfter,
          store: 'kv',
        };
      }

      record.count++;
      await kvSet(kvKey, record, Math.ceil((record.resetAt - now) / 1000));
      return {
        allowed: true,
        remaining: maxRequests - record.count,
        resetAt: record.resetAt,
        retryAfter: 0,
        store: 'kv',
      };
    } catch {
      // KV فشل — نكمل بـ in-memory
    }
  }

  // ────── In-Memory Fallback ──────
  const memKey = `rl:${key}`;
  let record = memoryStore.get(memKey);

  if (!record || now > record.resetAt) {
    record = { count: 1, resetAt: now + windowMs };
    memoryStore.set(memKey, record);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: record.resetAt,
      retryAfter: 0,
      store: 'memory',
    };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
      retryAfter,
      store: 'memory',
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetAt,
    retryAfter: 0,
    store: 'memory',
  };
}

// ─────────────────────────────────────────────
// الدالة الرئيسية: withRateLimit
// تُغلف أي Vercel API handler
//
// الاستخدام:
//   import { withRateLimit } from './rate-limit.js';
//   export default withRateLimit(handler, { endpoint: '/api/ai-proxy' });
// ─────────────────────────────────────────────
export function withRateLimit(handler, options = {}) {
  const { endpoint = '/api/unknown' } = options;

  return async function rateLimitedHandler(req, res) {
    const rawIp = getClientIP(req);
    const ip = await hashIP(rawIp); // SHA-256 — لا PII في الـ cache
    const tier = getUserTier(req);
    const endpointConfig = ENDPOINT_LIMITS[endpoint] || { free: 5, pro: 60, global: 100 };

    // الحد بناءً على tier المستخدم
    const tierLimit = endpointConfig[tier] || endpointConfig.free;

    // مفتاح per-user (IP + tier)
    const userKey = `${endpoint}:${ip}:${tier}`;
    // مفتاح global per-IP
    const globalKey = `${endpoint}:ip:${ip}`;

    // فحص الـ rate limit على مستويين
    const [userResult, globalResult] = await Promise.all([
      checkRateLimit(userKey, tierLimit, TIER_LIMITS[tier]?.windowMs || 60000),
      checkRateLimit(globalKey, endpointConfig.global, TIER_LIMITS.global_ip.windowMs),
    ]);

    // أضف headers للـ rate limit في كل الحالات
    const resetAtSeconds = Math.ceil(
      Math.min(userResult.resetAt, globalResult.resetAt) / 1000
    );
    res.setHeader('X-RateLimit-Limit', tierLimit);
    res.setHeader('X-RateLimit-Remaining', Math.min(userResult.remaining, globalResult.remaining));
    res.setHeader('X-RateLimit-Reset', resetAtSeconds);
    res.setHeader('X-RateLimit-Tier', tier);

    // إذا تجاوز أي من الحدين
    if (!userResult.allowed || !globalResult.allowed) {
      const retryAfter = Math.max(userResult.retryAfter, globalResult.retryAfter);
      res.setHeader('Retry-After', retryAfter);

      return res.status(429).json({
        error: 'Too Many Requests',
        message: tier === 'free'
          ? 'وصلت للحد المجاني. ارقَ لـ Pro للحصول على 60 طلب/دقيقة.'
          : 'تجاوزت الحد المسموح. حاول بعد ' + retryAfter + ' ثانية.',
        retryAfter,
        tier,
        upgrade: tier === 'free' ? 'https://qatar-standers.vercel.app/#pro' : null,
      });
    }

    // الطلب مسموح — استدعِ الـ handler الأصلي
    return handler(req, res);
  };
}

// ─────────────────────────────────────────────
// دالة مساعدة: applyRateLimit (بدون wrapper)
// للاستخدام المباشر داخل handler موجود
//
// الاستخدام:
//   const { allowed, retryAfter } = await applyRateLimit(req, res, '/api/ai-proxy');
//   if (!allowed) return; // res.status(429) أُرسلت تلقائياً
// ─────────────────────────────────────────────
export async function applyRateLimit(req, res, endpoint = '/api/unknown') {
  const rawIp = getClientIP(req);
  const ip = await hashIP(rawIp); // SHA-256 — لا PII في الـ cache
  const tier = getUserTier(req);
  const endpointConfig = ENDPOINT_LIMITS[endpoint] || { free: 5, pro: 60, global: 100 };
  const tierLimit = endpointConfig[tier] || endpointConfig.free;

  const userKey = `${endpoint}:${ip}:${tier}`;
  const globalKey = `${endpoint}:ip:${ip}`;

  const [userResult, globalResult] = await Promise.all([
    checkRateLimit(userKey, tierLimit, TIER_LIMITS[tier]?.windowMs || 60000),
    checkRateLimit(globalKey, endpointConfig.global, TIER_LIMITS.global_ip.windowMs),
  ]);

  const resetAtSeconds = Math.ceil(
    Math.min(userResult.resetAt, globalResult.resetAt) / 1000
  );
  res.setHeader('X-RateLimit-Limit', tierLimit);
  res.setHeader('X-RateLimit-Remaining', Math.min(userResult.remaining, globalResult.remaining));
  res.setHeader('X-RateLimit-Reset', resetAtSeconds);
  res.setHeader('X-RateLimit-Tier', tier);

  if (!userResult.allowed || !globalResult.allowed) {
    const retryAfter = Math.max(userResult.retryAfter, globalResult.retryAfter);
    res.setHeader('Retry-After', retryAfter);
    res.status(429).json({
      error: 'Too Many Requests',
      message: tier === 'free'
        ? 'وصلت للحد المجاني. ارقَ لـ Pro للحصول على 60 طلب/دقيقة.'
        : 'تجاوزت الحد المسموح. حاول بعد ' + retryAfter + ' ثانية.',
      retryAfter,
      tier,
      upgrade: tier === 'free' ? 'https://qatar-standers.vercel.app/#pro' : null,
    });
    return { allowed: false, retryAfter };
  }

  return { allowed: true, retryAfter: 0 };
}

// ─────────────────────────────────────────────
// تشفير IP بـ SHA-256 لحماية الخصوصية — لا PII في الـ logs أو KV
// ─────────────────────────────────────────────
async function hashIP(ip) {
  if (!ip || ip === 'unknown') return 'unknown';
  try {
    const { createHash } = await import('crypto');
    return createHash('sha256').update(ip).digest('hex').slice(0, 16);
  } catch {
    // fallback بسيط إذا crypto غير متاح
    let h = 0;
    for (let i = 0; i < ip.length; i++) h = ((h << 5) - h + ip.charCodeAt(i)) | 0;
    return 'ip_' + Math.abs(h).toString(36);
  }
}

// ─────────────────────────────────────────────
// تصدير الثوابت + Aliases للتوافق مع كل ملفات API
// ─────────────────────────────────────────────
const getIp = getClientIP;

// rateLimit(req, tier, endpointName) — wrapper مُبسّط للاستخدام في API files
async function rateLimit(req, tier, endpointName) {
  const rawIp = getClientIP(req);
  const ip = await hashIP(rawIp);
  const endpointKey = '/api/' + endpointName;
  const endpointConfig = ENDPOINT_LIMITS[endpointKey] || { free: 5, pro: 60, global: 100 };
  const tierLimit = endpointConfig[tier] || endpointConfig.free;
  const windowMs = TIER_LIMITS[tier]?.windowMs || 60000;
  const userKey = `${endpointKey}:${ip}:${tier}`;
  const result = await checkRateLimit(userKey, tierLimit, windowMs);
  return { ...result, limit: tierLimit, tier };
}

// applyRateLimitHeaders(res, rlResult) — يضع rate limit headers
function applyRateLimitHeaders(res, rl) {
  if (!res || !rl) return;
  res.setHeader('X-RateLimit-Limit', rl.limit || 5);
  res.setHeader('X-RateLimit-Remaining', rl.remaining || 0);
  if (rl.resetAt) res.setHeader('X-RateLimit-Reset', Math.ceil(rl.resetAt / 1000));
  if (rl.tier) res.setHeader('X-RateLimit-Tier', rl.tier);
  if (!rl.allowed && rl.retryAfter) res.setHeader('Retry-After', rl.retryAfter);
}

// checkRateLimitCompat(ip, endpointName, isPro) — alias لملفات auth-proxy و supabase-proxy
async function checkRateLimitCompat(ip, endpointName, isPro) {
  const hashedIp = await hashIP(ip);
  const endpointKey = '/api/' + endpointName;
  const tier = isPro ? 'pro' : 'free';
  const endpointConfig = ENDPOINT_LIMITS[endpointKey] || { free: 5, pro: 60, global: 100 };
  const tierLimit = endpointConfig[tier] || endpointConfig.free;
  const windowMs = TIER_LIMITS[tier]?.windowMs || 60000;
  const userKey = `${endpointKey}:${hashedIp}:${tier}`;
  const result = await checkRateLimit(userKey, tierLimit, windowMs);
  return { ...result, limit: tierLimit, tier };
}

export {
  TIER_LIMITS, ENDPOINT_LIMITS,
  getClientIP, getIp, getUserTier, hashIP,
  rateLimit, applyRateLimitHeaders,
  checkRateLimitCompat as checkRateLimit
};
