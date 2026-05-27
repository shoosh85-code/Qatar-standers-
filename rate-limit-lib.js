// ═══════════════════════════════════════════════════════════════
// الفجوة 8: Rate Limit في api/vision-proxy.js
// استبدل السطور 6-15 الموجودة في أعلى الملف بهذا
// المرجع: PROTOCOL 6 | QatarSpec Pro v3.0
// ═══════════════════════════════════════════════════════════════

// ── استيراد من lib المشترك (يحل محل الـ Map الداخلي القديم) ──
import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';

// ── احذف هذه الأسطار القديمة إن وُجدت: ──────────────────────
// const rateLimitStore = new Map();
// function checkRateLimit(...) { ... }   // أي دالة rate limit داخلية

// ═══════════════════════════════════════════════════════════════
// الصق هذا الكود داخل الـ handler — بعد سطر استخراج الـ IP
// ═══════════════════════════════════════════════════════════════

// مثال على كيفية التعديل داخل handler الموجود:
/*

export default async function handler(req, res) {
  // ── 1. استخرج الـ IP ──────────────────────────────────────
  const ip    = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
              || req.socket?.remoteAddress
              || '127.0.0.1';

  // ── 2. تحقق من Pro token ──────────────────────────────────
  const isPro = !!req.headers['x-pro-token'];  // أو منطق التحقق الموجود

  // ── 3. تطبيق Rate Limit (PROTOCOL 6) ─────────────────────
  const rl = await checkRateLimit(ip, '/api/vision-proxy', isPro);
  if (!rl.allowed) return rateLimitResponse(rl, res);

  // ... باقي الكود الموجود بدون تغيير ...
}

*/

// ═══════════════════════════════════════════════════════════════
// lib/rate-limit.js — (ملف مشترك يُستخدم من كل الـ endpoints)
// أنشئ هذا الملف إذا لم يكن موجوداً
// ═══════════════════════════════════════════════════════════════

// In-memory fallback (يعمل بدون Vercel KV)
const _store = new Map();

/**
 * PROTOCOL 6 — Rate Limits:
 * Free:   5 req/min  | Pro: 60 req/min  | Global: 100 req/min/IP
 *
 * @param {string} ip
 * @param {string} endpoint
 * @param {boolean} isPro
 * @returns {{ allowed: boolean, remaining: number, resetAt: number, limit: number }}
 */
export async function checkRateLimit(ip, endpoint, isPro = false) {
  // حدود بحسب PROTOCOL 6
  const LIMITS = {
    '/api/ai-proxy':      { free: 5,  pro: 60,  global: 100 },
    '/api/verify-pro':    { free: 3,  pro: 10,  global: 30  },
    '/api/qcs-search':    { free: 10, pro: 100, global: 200 },
    '/api/vision-proxy':  { free: 3,  pro: 30,  global: 50  },
  };

  const cfg   = LIMITS[endpoint] || { free: 5, pro: 60, global: 100 };
  const limit = isPro ? cfg.pro : cfg.free;
  const key   = `rl:${endpoint}:${ip}`;
  const now   = Date.now();
  const window = 60_000; // نافذة دقيقة واحدة

  // محاولة Vercel KV أولاً — Fallback لـ in-memory
  let entry;
  try {
    const { kv } = await import('@vercel/kv');
    entry = await kv.get(key);
    if (!entry) {
      entry = { count: 0, resetAt: now + window };
      await kv.set(key, entry, { px: window });
    }
    if (now > entry.resetAt) {
      entry = { count: 0, resetAt: now + window };
      await kv.set(key, entry, { px: window });
    }
    entry.count++;
    await kv.set(key, entry, { px: entry.resetAt - now });
  } catch {
    // Fallback: in-memory Map
    entry = _store.get(key);
    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + window };
    }
    entry.count++;
    _store.set(key, entry);

    // تنظيف الـ Map كل 5 دقائق
    if (Math.random() < 0.01) {
      for (const [k, v] of _store.entries()) {
        if (now > v.resetAt) _store.delete(k);
      }
    }
  }

  // التحقق من الـ Global limit أيضاً
  const globalKey   = `rl:global:${ip}`;
  const globalLimit = cfg.global;
  let   globalEntry;
  try {
    const { kv } = await import('@vercel/kv');
    globalEntry = await kv.get(globalKey) || { count: 0, resetAt: now + window };
    globalEntry.count++;
    await kv.set(globalKey, globalEntry, { px: globalEntry.resetAt - now });
  } catch {
    globalEntry = _store.get(globalKey) || { count: 0, resetAt: now + window };
    globalEntry.count++;
    _store.set(globalKey, globalEntry);
  }

  const perKeyAllowed    = entry.count <= limit;
  const globalAllowed    = globalEntry.count <= globalLimit;
  const allowed          = perKeyAllowed && globalAllowed;
  const activeLimit      = !perKeyAllowed ? limit : globalLimit;
  const activeCount      = !perKeyAllowed ? entry.count : globalEntry.count;

  return {
    allowed,
    remaining: Math.max(0, activeLimit - activeCount),
    resetAt:   entry.resetAt,
    limit:     activeLimit,
  };
}

/**
 * إرسال استجابة 429 مع Retry-After header (PROTOCOL 6)
 */
export function rateLimitResponse(rl, res) {
  const retryAfter = Math.ceil((rl.resetAt - Date.now()) / 1000);
  res.setHeader('Retry-After', retryAfter);
  res.setHeader('X-RateLimit-Limit',     rl.limit);
  res.setHeader('X-RateLimit-Remaining', rl.remaining);
  res.setHeader('X-RateLimit-Reset',     rl.resetAt);
  return res.status(429).json({
    error:   'Too Many Requests',
    message: `تجاوزت الحد المسموح. انتظر ${retryAfter} ثانية وأعد المحاولة.`,
    retryAfter,
    limit:   rl.limit,
  });
}
