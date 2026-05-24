// lib/rate-limit.js — Pure in-memory Rate Limiting (No external dependencies)
// PROTOCOL 6: كل endpoint له rate limit — Zero Tolerance
// استُبدل Upstash Redis بـ in-memory Map — مجاني 100% + لا إعداد مطلوب
// المنطق: window-based counter لكل IP + endpoint في الذاكرة
// Cleanup تلقائي كل دقيقة لتجنب memory leaks

// ══════════════════════════════════════════════════════════════
// ENDPOINT LIMITS — المصدر الوحيد للحدود (Single Source of Truth)
// ══════════════════════════════════════════════════════════════
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
  '/api/generate-document':   { free: 3,  pro: 30,  global: 60  },
  '/api/execution-ai':        { free: 5,  pro: 60,  global: 100 },
  // Aliases بدون /api/ prefix — backward compat
  'verify-pro':               { free: 3,  pro: 10,  global: 30  },
  'qcs-search':               { free: 10, pro: 100, global: 200 },
  'generate-embeddings':      { free: 2,  pro: 20,  global: 30  },
};
const DEFAULT_LIMITS = { free: 5, pro: 60, global: 100 };
const WINDOW_MS = 60 * 1000; // 60 ثانية

// ══════════════════════════════════════════════════════════════
// IN-MEMORY STORE
// ══════════════════════════════════════════════════════════════
// { key → { count: number, resetTime: timestamp } }
const _store = new Map();

// تنظيف تلقائي كل دقيقة — يحذف المدخلات المنتهية فقط
let _cleanupTimer = null;
function scheduleCleanup() {
  if (_cleanupTimer) return; // مرة واحدة فقط
  try {
    _cleanupTimer = setInterval(() => {
      const now = Date.now();
      let deleted = 0;
      for (const [k, v] of _store.entries()) {
        if (now >= v.resetTime) { _store.delete(k); deleted++; }
      }
    }, WINDOW_MS);
    // لا تمنع Node.js من الإغلاق
    if (_cleanupTimer.unref) _cleanupTimer.unref();
  } catch (_) {
    // Edge runtime لا يدعم setInterval — لا مشكلة، cleanup يدوي
  }
}
scheduleCleanup();

// ── Core counter (sync) ───────────────────────────────────────
function _increment(key, maxRequests) {
  const now = Date.now();

  if (!_store.has(key)) {
    _store.set(key, { count: 1, resetTime: now + WINDOW_MS });
    const remaining = maxRequests - 1;
    const retryAfter = Math.ceil(WINDOW_MS / 1000);
    return { allowed: true, count: 1, limit: maxRequests, remaining, retryAfter, source: 'memory' };
  }

  const entry = _store.get(key);

  // Window انتهت — reset
  if (now >= entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + WINDOW_MS;
    return { allowed: true, count: 1, limit: maxRequests, remaining: maxRequests - 1, retryAfter: Math.ceil(WINDOW_MS / 1000), source: 'memory' };
  }

  // فحص قبل الزيادة
  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, count: entry.count, limit: maxRequests, remaining: 0, retryAfter, source: 'memory' };
  }

  entry.count++;
  const remaining = maxRequests - entry.count;
  const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
  return { allowed: true, count: entry.count, limit: maxRequests, remaining, retryAfter, source: 'memory' };
}

// ══════════════════════════════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════════════════════════════

/**
 * checkRateLimit(ip, endpoint, isPro)
 * Returns: { allowed, count, limit, remaining, retryAfter, tier, source }
 */
export async function checkRateLimit(ip, endpoint, isPro = false) {
  const lim   = ENDPOINT_LIMITS[endpoint] || DEFAULT_LIMITS;
  const tier  = isPro ? lim.pro  : lim.free;
  const glob  = lim.global;
  const label = isPro ? 'pro' : 'free';

  // الحد العالمي per-IP (بغض النظر عن tier)
  const gKey  = `g:${ip}:${endpoint}`;
  const gRes  = _increment(gKey, glob);
  if (!gRes.allowed) {
    return { ...gRes, limit: glob, tier: label, source: 'memory' };
  }

  // الحد حسب tier
  const tKey  = `${label}:${ip}:${endpoint}`;
  const tRes  = _increment(tKey, tier);
  return { ...tRes, tier: label, source: 'memory' };
}

/**
 * rateLimitResponse — Edge Response (web standard)
 * يُستخدم في Edge handlers (ai-proxy, vision-proxy...)
 */
export function rateLimitResponse(result, cors = {}) {
  const isPro = result.tier === 'pro';
  const msg = isPro
    ? `تجاوزت الحد المسموح (${result.limit} طلب/دقيقة). انتظر ${result.retryAfter} ثانية.`
    : `وصلت للحد المسموح (${result.limit} طلبات/دقيقة). قم بالترقية إلى Pro للحصول على ${Math.round(result.limit * 10)} طلب/دقيقة.`;

  return new Response(
    JSON.stringify({
      error: 'Too Many Requests',
      code: 'RATE_LIMIT',
      message: msg,
      retryAfter: result.retryAfter,
      limit: result.limit,
      tier: result.tier,
      upgradeUrl: 'https://qatar-standers.vercel.app/#pricing',
    }),
    {
      status: 429,
      headers: {
        ...cors,
        'Content-Type': 'application/json',
        'Retry-After':           String(result.retryAfter),
        'X-RateLimit-Limit':     String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining ?? 0),
        'X-RateLimit-Source':    'memory',
        'X-RateLimit-Tier':      result.tier || 'free',
      },
    }
  );
}

// ══════════════════════════════════════════════════════════════
// DIAGNOSTICS (للاختبار فقط)
// ══════════════════════════════════════════════════════════════
export function _getStoreSize() { return _store.size; }
export function _clearStore()   { _store.clear(); }
