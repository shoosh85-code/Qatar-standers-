// api/rate-limit.js
// QatarSpec Pro — Rate Limiting Module v3.0
// يستخدم Vercel KV مع fallback إلى in-memory Map
// ESM format — متوافق مع "type": "module" في package.json
// SYNC-WITH: حدود LIMITS يجب أن تتطابق مع الـ inline rate limiters في:
//   - api/ai-proxy.js     (Edge — FREE_LIMIT, PRO_LIMIT, GLOBAL_LIMIT)
//   - api/vision-proxy.js (Edge — inline checkRateLimit)
//   - api/qcs-search.js   (Edge — inline checkRateLimit)
//   - api/verify-pro.js   (Edge — inline checkRateLimit)
// السبب: Edge functions لا تدعم import من Node.js modules

// ── Vercel KV (اختياري — يُفعَّل فقط إذا توفر KV_REST_API_URL) ──────────────
// لتفعيل KV: أضف KV Storage في Vercel Dashboard → Storage → Create KV
let kv = null;
if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  try {
    const kvMod = await import('@vercel/kv');
    kv = kvMod.kv ?? null;
    console.log('[rate-limit] ✅ Vercel KV connected — distributed rate limiting active');
  } catch (err) {
    console.warn('[rate-limit] ⚠️ @vercel/kv import failed — using in-memory fallback:', err.message);
    kv = null;
  }
} else {
  console.log('[rate-limit] ℹ️ KV_REST_API_URL not set — using in-memory fallback (per-instance)');
}

// ── In-memory fallback ────────────────────────────────────────────────────────
const memoryStore = new Map();
const WINDOW_MS = 60 * 1000; // نافذة 1 دقيقة

// تنظيف الإدخالات المنتهية كل دقيقتين (بعد انتهاء نافذتها × 2)
setInterval(() => {
  const now    = Date.now();
  const maxAge = WINDOW_MS * 2;
  for (const [key, entry] of memoryStore.entries()) {
    if (now - entry.timestamp > maxAge) memoryStore.delete(key);
  }
}, WINDOW_MS * 2);

// ── حدود الطلبات (Protocol 6) ────────────────────────────────────────────────
export const LIMITS = {
  free: {
    'ai-proxy':            5,
    'verify-pro':          3,
    'qcs-search':         10,
    'vision-proxy':        3,
    'enhance-en':          5,
    'export-pdf':          3,
    'supabase-proxy':     10,  // نفس qcs-search — بحث QCS
    'tap-checkout':        3,  // حماية من spam المدفوعات
    'tap-callback':        5,  // معالجة نتيجة الدفع
    'setup-vectors':       2,  // admin only — عملية ثقيلة
    'generate-embeddings': 2,  // admin only — عملية ثقيلة
    'health':             30,  // فحص الصحة — سخي للمراقبة
    'auth-proxy':          5,  // تحقق التوكن — نفس verify-pro
  },
  pro: {
    'ai-proxy':            60,
    'verify-pro':          10,
    'qcs-search':         100,
    'vision-proxy':        30,
    'enhance-en':          60,
    'export-pdf':          30,
    'supabase-proxy':     100,  // نفس qcs-search
    'tap-checkout':        10,  // Pro يملك طلبات دفع أكثر
    'tap-callback':        20,  // Pro — معالجة دفع أكثر
    'setup-vectors':        2,  // admin only — نفس الحد
    'generate-embeddings': 20,  // Pro — batch embeddings
    'health':              30,  // نفس الحد — health لا يتغير
    'auth-proxy':          10,  // Pro يتحقق أكثر
  },
  global: { perIp: 100 },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

async function checkWithKv(key, limit) {
  const count = parseInt(await kv.get(key) || '0', 10);
  if (count >= limit) {
    const ttl = await kv.pttl(key);
    return {
      allowed: false,
      retryAfter: Math.ceil((ttl > 0 ? ttl : WINDOW_MS) / 1000),
      remaining: 0,
      limit,
    };
  }
  await kv.set(key, count + 1, { px: WINDOW_MS });
  return { allowed: true, remaining: limit - count - 1, limit };
}

function checkWithMemory(key, limit) {
  const now   = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || now - entry.timestamp > WINDOW_MS) {
    memoryStore.set(key, { count: 1, timestamp: now });
    return { allowed: true, remaining: limit - 1, limit };
  }
  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((WINDOW_MS - (now - entry.timestamp)) / 1000),
      remaining: 0,
      limit,
    };
  }
  entry.count++;
  return { allowed: true, remaining: limit - entry.count, limit };
}

// ── الدوال المُصدَّرة ─────────────────────────────────────────────────────────

/**
 * rateLimit — async، يستخدم KV أو in-memory
 * @param {object} req       - كائن الطلب (Node.js IncomingMessage)
 * @param {string} tier      - 'free' | 'pro'
 * @param {string} endpoint  - اسم الـ endpoint بدون /api/
 */
export async function rateLimit(req, tier = 'free', endpoint = 'ai-proxy') {
  const ip          = getIp(req);
  const tierLimit   = LIMITS[tier]?.[endpoint] ?? LIMITS.free[endpoint] ?? 5;
  const globalLimit = LIMITS.global.perIp;
  const tierKey     = `rate:${tier}:${endpoint}:${ip}`;
  const globalKey   = `rate:global:${ip}`;

  try {
    if (kv) {
      const g = await checkWithKv(globalKey, globalLimit);
      if (!g.allowed) return { allowed: false, retryAfter: g.retryAfter, remaining: 0, reason: 'global' };
      return await checkWithKv(tierKey, tierLimit);
    }
    throw new Error('no kv');
  } catch {
    const g = checkWithMemory(globalKey, globalLimit);
    if (!g.allowed) return { allowed: false, retryAfter: g.retryAfter, remaining: 0, reason: 'global' };
    return checkWithMemory(tierKey, tierLimit);
  }
}

/**
 * checkRateLimit — sync (in-memory فقط)
 * للتوافق مع Node.js functions: supabase-proxy, auth-proxy
 * ملاحظة: Edge functions (ai-proxy, vision-proxy, qcs-search, verify-pro)
 *         لها inline rate limiter خاص — انظر SYNC-WITH أعلاه
 * @param {string}  ip
 * @param {string}  endpoint
 * @param {boolean} isPro
 */
export function checkRateLimit(ip, endpoint = 'ai-proxy', isPro = false) {
  const tier      = isPro ? 'pro' : 'free';
  const tierLimit = LIMITS[tier]?.[endpoint] ?? (isPro ? 60 : 5);
  const result    = checkWithMemory(`rate:${tier}:${endpoint}:${ip}`, tierLimit);
  return {
    allowed:    result.allowed,
    limit:      tierLimit,
    count:      tierLimit - (result.remaining ?? 0),
    retryAfter: result.retryAfter ?? 0,
  };
}

/**
 * applyRateLimitHeaders — يضيف headers معيارية للـ response
 * X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After
 */
export function applyRateLimitHeaders(res, result) {
  if (result.limit != null) res.setHeader('X-RateLimit-Limit', result.limit);
  res.setHeader('X-RateLimit-Remaining', result.remaining ?? 0);
  if (!result.allowed) {
    res.setHeader('Retry-After',          result.retryAfter ?? 60);
    res.setHeader('X-RateLimit-Remaining', 0);
  }
}
