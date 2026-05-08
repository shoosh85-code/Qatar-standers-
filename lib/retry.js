// api/lib/retry.js — QatarSpec Pro v1.0
// Exponential Backoff Retry — Edge Runtime Compatible
// لا يعتمد على Node.js — يعمل في Edge + Serverless
//
// الاستخدام:
//   import { withRetry, retryGemini } from './lib/retry.js';
//   const result = await withRetry(() => callGemini(messages), { retries: 3 });

// ─── ثوابت ────────────────────────────────────────────────────────────────
const DEFAULTS = {
  retries:     3,       // عدد المحاولات بعد الأولى
  baseDelay:   1000,    // ms — تأخير البداية
  maxDelay:    15000,   // ms — أقصى تأخير
  factor:      2,       // مضاعف التأخير (exponential)
  jitter:      true,    // إضافة عشوائية لمنع thundering herd
  timeout:     28000,   // ms — timeout للمحاولة الواحدة
};

// أكواد HTTP التي تستحق إعادة المحاولة
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

// رسائل خطأ تستحق إعادة المحاولة
const RETRYABLE_MESSAGES = ['quota', 'rate limit', 'timeout', 'abort', 'network', 'overloaded', 'unavailable'];

// ─── هل هذا الخطأ يستحق إعادة المحاولة؟ ────────────────────────────────
function isRetryable(error) {
  if (!error) return false;

  // خطأ HTTP بكود قابل للإعادة
  if (error.status && RETRYABLE_STATUS.has(error.status)) return true;

  // خطأ نصي يحتوي على كلمة مفتاحية
  const msg = (error.message || '').toLowerCase();
  return RETRYABLE_MESSAGES.some(kw => msg.includes(kw));
}

// ─── حساب وقت الانتظار مع jitter ────────────────────────────────────────
function calcDelay(attempt, opts) {
  // exponential: baseDelay * factor^attempt
  const exp = opts.baseDelay * Math.pow(opts.factor, attempt);
  const capped = Math.min(exp, opts.maxDelay);

  if (!opts.jitter) return capped;

  // Full jitter: random بين 0 و capped (يمنع thundering herd)
  return Math.floor(Math.random() * capped);
}

// ─── withRetry: الدالة الرئيسية ──────────────────────────────────────────
// fn: دالة async تُعيد Promise
// opts: خيارات اختيارية (تتجاوز DEFAULTS)
// onRetry: callback اختياري عند كل إعادة محاولة
//
export async function withRetry(fn, opts = {}, onRetry = null) {
  const cfg = { ...DEFAULTS, ...opts };
  let lastError;

  for (let attempt = 0; attempt <= cfg.retries; attempt++) {
    try {
      // timeout wrapper — Edge-compatible (AbortSignal.timeout غير متاح في كل بيئة)
      const result = await Promise.race([
        fn(attempt),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`timeout after ${cfg.timeout}ms`)), cfg.timeout)
        ),
      ]);
      return result; // نجاح ✅

    } catch (error) {
      lastError = error;

      // آخر محاولة — ارمِ الخطأ
      if (attempt === cfg.retries) break;

      // هل يستحق إعادة المحاولة؟
      if (!isRetryable(error)) {
        throw error; // خطأ نهائي — لا تُعد المحاولة
      }

      const delay = calcDelay(attempt, cfg);

      // Retry-After header إذا كان 429
      const retryAfter = error.retryAfter ? error.retryAfter * 1000 : null;
      const waitMs = retryAfter ? Math.max(delay, retryAfter) : delay;

      // سجّل المحاولة
      console.warn(
        `[retry] المحاولة ${attempt + 1}/${cfg.retries} فشلت: ${error.message?.slice(0, 80)}`,
        `— انتظر ${waitMs}ms`
      );

      // callback اختياري
      if (onRetry) {
        try { onRetry({ attempt, error, waitMs }); } catch (_) {}
      }

      // انتظر قبل المحاولة التالية
      await new Promise(r => setTimeout(r, waitMs));
    }
  }

  throw lastError;
}

// ─── retryGemini: إعدادات مخصصة لـ Gemini API ───────────────────────────
// يتعامل مع:
//   - 429 (quota) — انتظار أطول
//   - 503 (overloaded) — انتظار متوسط
//   - Fallback تلقائي لـ gemini-2.5-flash عند فشل gemini-2.5-pro
//
export async function retryGemini(primaryFn, fallbackFn = null, opts = {}) {
  const geminiOpts = {
    retries:   2,
    baseDelay: 2000,
    maxDelay:  20000,
    factor:    2.5,
    jitter:    true,
    timeout:   28000,
    ...opts,
  };

  // quota/429: انتقل فوراً للـ fallback بدون انتظار
  const isQuotaError = (err) =>
    err?.message?.includes('quota') ||
    err?.message?.includes('429') ||
    err?.status === 429;

  const tryFallback = async (primaryError) => {
    if (!fallbackFn) throw primaryError;
    console.warn('[retryGemini] Primary فشل → fallback فوري');
    try {
      return await withRetry(fallbackFn, {
        retries: 1, baseDelay: 1000, maxDelay: 5000,
        factor: 2, jitter: false, timeout: 25000,
      });
    } catch (fbErr) {
      console.error('[retryGemini] Fallback فشل:', fbErr.message);
      throw primaryError;
    }
  };

  // محاولة أولى
  try {
    return await primaryFn(0);
  } catch (firstError) {
    if (isQuotaError(firstError)) {
      console.warn('[retryGemini] Quota/429 → fallback فوري');
      return await tryFallback(firstError);
    }
  }

  // خطأ آخر → أعد المحاولة بـ backoff
  try {
    return await withRetry(primaryFn, geminiOpts, ({ attempt, error }) => {
      console.warn(`[retryGemini] محاولة ${attempt}: ${error.message?.slice(0, 60)}`);
    });
  } catch (primaryError) {
    return await tryFallback(primaryError);
  }
}

// ─── retryFetch: fetch مع retry تلقائي ───────────────────────────────────
// بديل لـ fetch العادي مع exponential backoff
//
export async function retryFetch(url, fetchOpts = {}, retryOpts = {}) {
  return withRetry(async () => {
    const res = await fetch(url, fetchOpts);

    if (!res.ok && RETRYABLE_STATUS.has(res.status)) {
      const retryAfter = parseInt(res.headers.get('retry-after') || '0');
      const err = new Error(`HTTP ${res.status}: ${res.statusText}`);
      err.status = res.status;
      err.retryAfter = retryAfter;
      throw err;
    }

    return res;
  }, retryOpts);
}

// ─── Default export ───────────────────────────────────────────────────────
export default { withRetry, retryGemini, retryFetch };
