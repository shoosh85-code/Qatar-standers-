/**
 * QatarSpec Pro — Rate Limiting Utility v1.0
 * SYNC-WITH: PROJECT_INSTRUCTIONS.md → PROTOCOL 6
 *
 * الأولوية: Vercel KV → in-memory Map (fallback)
 * لا يُستخدم localStorage أبداً (RULE 7)
 */

// ─── Vercel KV (إذا كان متاحاً) ─────────────────────────────────────────────
let kv = null;
try {
  // يعمل فقط في بيئة Vercel مع KV مُفعَّل
  // eslint-disable-next-line import/no-unresolved
  const kvModule = await import('@vercel/kv').catch(() => null);
  if (kvModule?.kv) kv = kvModule.kv;
} catch {
  // Fallback to in-memory
}

// ─── In-Memory Fallback ───────────────────────────────────────────────────────
/** @type {Map<string, {count: number, resetAt: number}>} */
const memoryStore = new Map();

// تنظيف دوري كل دقيقة لمنع memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of memoryStore.entries()) {
    if (val.resetAt < now) memoryStore.delete(key);
  }
}, 60_000);

// ─── حدود الطلبات حسب المسار والـ tier ──────────────────────────────────────
/**
 * SYNC-WITH: PROJECT_INSTRUCTIONS.md → PROTOCOL 6 → API Endpoints Limits
 * @type {Record<string, {free: number, pro: number, global: number, window: number}>}
 */
const LIMITS = {
  '/api/ai-proxy':         { free: 5,  pro: 60,  global: 100, window: 60 },
  '/api/verify-pro':       { free: 3,  pro: 10,  global: 30,  window: 60 },
  '/api/qcs-search':       { free: 10, pro: 100, global: 200, window: 60 },
  '/api/vision-proxy':     { free: 3,  pro: 30,  global: 50,  window: 60 },
  // Auth endpoints — أكثر حساسية
  '/api/auth/login':       { free: 5,  pro: 5,   global: 20,  window: 60 },
  '/api/auth/verify':      { free: 10, pro: 10,  global: 30,  window: 60 },
  '/api/validate-code':    { free: 3,  pro: 10,  global: 30,  window: 60 },
  // Payment — الأكثر تقييداً
  '/api/tap-checkout':     { free: 2,  pro: 5,   global: 10,  window: 60 },
  '/api/admin-session':    { free: 3,  pro: 3,   global: 10,  window: 60 },
  // Default
  'default':               { free: 10, pro: 60,  global: 100, window: 60 },
};

// ─── استخراج IP من الـ request ───────────────────────────────────────────────
/**
 * @param {Request} req
 * @returns {string}
 */
function getIP(req) {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

// ─── KV Operations ────────────────────────────────────────────────────────────
async function kvIncrement(key, windowSec) {
  if (!kv) return null;
  try {
    const pipeline = kv.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, windowSec);
    const [count] = await pipeline.exec();
    return count;
  } catch {
    return null; // Fallback to memory
  }
}

async function kvGet(key) {
  if (!kv) return null;
  try {
    return await kv.get(key);
  } catch {
    return null;
  }
}

// ─── Memory Operations ────────────────────────────────────────────────────────
function memIncrement(key, windowMs) {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || entry.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return 1;
  }

  entry.count += 1;
  return entry.count;
}

function memTTL(key) {
  const entry = memoryStore.get(key);
  if (!entry) return 0;
  return Math.max(0, Math.ceil((entry.resetAt - Date.now()) / 1000));
}

// ─── الدالة الرئيسية ──────────────────────────────────────────────────────────
/**
 * تحقق من rate limit وأعد النتيجة.
 *
 * @param {Request} req          - طلب Vercel Edge/Serverless
 * @param {object}  [options]
 * @param {'free'|'pro'|'global'} [options.tier='global']  - نوع الحد
 * @param {string}  [options.endpoint]  - مسار API (يُكشف تلقائياً من req.url)
 * @param {string}  [options.identifier] - معرِّف مخصص (افتراضي: IP)
 *
 * @returns {Promise<{
 *   allowed: boolean,
 *   limit: number,
 *   remaining: number,
 *   retryAfter: number,
 *   headers: Record<string, string>
 * }>}
 */
export async function checkRateLimit(req, options = {}) {
  const {
    tier = 'global',
    endpoint = new URL(req.url).pathname,
    identifier,
  } = options;

  // الحصول على الحدود المناسبة للـ endpoint
  const limits = LIMITS[endpoint] || LIMITS['default'];
  const maxRequests = limits[tier];
  const windowSec = limits.window;
  const windowMs = windowSec * 1000;

  // بناء مفتاح فريد
  const id = identifier || getIP(req);
  const key = `rl:${endpoint.replace(/\//g, '_')}:${tier}:${id}`;

  // محاولة KV أولاً، ثم Memory
  let count;
  let retryAfter = windowSec;

  const kvCount = await kvIncrement(key, windowSec);

  if (kvCount !== null) {
    count = kvCount;
    // حساب TTL من KV
    try {
      const ttl = await kv.ttl(key);
      retryAfter = ttl > 0 ? ttl : windowSec;
    } catch {
      retryAfter = windowSec;
    }
  } else {
    // Fallback: in-memory
    count = memIncrement(key, windowMs);
    retryAfter = memTTL(key);
  }

  const allowed = count <= maxRequests;
  const remaining = Math.max(0, maxRequests - count);

  // Headers استجابة قياسية (RFC 6585)
  const headers = {
    'X-RateLimit-Limit':     String(maxRequests),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset':     String(Math.ceil(Date.now() / 1000) + retryAfter),
    'X-RateLimit-Policy':    `${maxRequests};w=${windowSec};tier=${tier}`,
  };

  if (!allowed) {
    headers['Retry-After'] = String(retryAfter);
  }

  return { allowed, limit: maxRequests, remaining, retryAfter, headers };
}

// ─── دالة مساعدة: إنشاء Response 429 جاهز ───────────────────────────────────
/**
 * @param {number} retryAfter - ثوانٍ قبل المحاولة التالية
 * @param {Record<string, string>} rateLimitHeaders
 * @returns {Response}
 */
export function tooManyRequestsResponse(retryAfter, rateLimitHeaders = {}) {
  return new Response(
    JSON.stringify({
      error: 'Too Many Requests',
      message: 'لقد تجاوزت الحد المسموح به من الطلبات. يرجى الانتظار.',
      retryAfter,
      upgradeUrl: 'https://qatar-standers.vercel.app/#pricing',
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        ...rateLimitHeaders,
      },
    }
  );
}

// ─── Middleware جاهز للاستخدام في أي API endpoint ────────────────────────────
/**
 * استخدام:
 *
 * import { withRateLimit } from '../api/rate-limit.js';
 *
 * export default withRateLimit(async function handler(req) {
 *   // منطق الـ API هنا
 *   return new Response(JSON.stringify({ ok: true }));
 * }, { tier: 'free' });
 *
 * @param {Function} handler
 * @param {object} [options]
 * @returns {Function}
 */
export function withRateLimit(handler, options = {}) {
  return async function rateLimitedHandler(req) {
    // تحديد الـ tier من الـ request (يُحقَّق من JWT على الخادم)
    const tierFromRequest = req.headers.get('x-user-tier') || 'free';
    const tier = options.tier || tierFromRequest;

    const result = await checkRateLimit(req, { ...options, tier });

    if (!result.allowed) {
      return tooManyRequestsResponse(result.retryAfter, result.headers);
    }

    // تمرير نتيجة rate limit للـ handler إذا احتاجها
    req._rateLimit = result;

    const response = await handler(req);

    // إضافة headers للـ response
    const newHeaders = new Headers(response.headers);
    for (const [k, v] of Object.entries(result.headers)) {
      newHeaders.set(k, v);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  };
}

// ─── دالة مساعدة: تحقق سريع لـ CJS (Vercel legacy) ─────────────────────────
/**
 * للـ endpoints التي تستخدم module.exports بدلاً من ES modules
 *
 * مثال:
 *   const { applyRateLimit } = require('../api/rate-limit.cjs');
 *   const blocked = await applyRateLimit(req, res, { tier: 'free' });
 *   if (blocked) return; // الـ response أُرسل بالفعل
 */
export async function applyRateLimit(req, res, options = {}) {
  const tier = options.tier || req.headers['x-user-tier'] || 'free';
  const result = await checkRateLimit(req, { ...options, tier });

  // إضافة headers
  for (const [k, v] of Object.entries(result.headers)) {
    res.setHeader(k, v);
  }

  if (!result.allowed) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Retry-After', String(result.retryAfter));
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'لقد تجاوزت الحد المسموح به من الطلبات. يرجى الانتظار.',
      retryAfter: result.retryAfter,
      upgradeUrl: 'https://qatar-standers.vercel.app/#pricing',
    });
    return true; // محظور
  }

  return false; // مسموح
}
