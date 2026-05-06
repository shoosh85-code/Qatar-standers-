/**
 * QatarSpec Pro — API Security Middleware
 * مستوحى من helmetjs — مُكيَّف لـ Vercel Serverless (بدون Express)
 *
 * يوحّد:
 *   - Security headers على كل API response
 *   - CORS صارم — يقبل qatar-standers.vercel.app فقط
 *   - OPTIONS preflight تلقائي
 *   - حذف X-Powered-By
 *
 * الاستخدام:
 *   import { withSecurity } from './lib/security.js';
 *   export default withSecurity(handler);
 */

const ALLOWED_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

// ─────────────────────────────────────────────────────────────────
// SECURITY HEADERS — مستوحاة من helmet defaults
// ─────────────────────────────────────────────────────────────────

const SECURITY_HEADERS = {
  // منع MIME sniffing
  'X-Content-Type-Options':            'nosniff',
  // منع Clickjacking
  'X-Frame-Options':                   'DENY',
  // إيقاف DNS prefetch
  'X-DNS-Prefetch-Control':            'off',
  // حماية IE من تشغيل ملفات مباشرة
  'X-Download-Options':                'noopen',
  // منع Adobe Flash cross-domain
  'X-Permitted-Cross-Domain-Policies': 'none',
  // HSTS — 2 سنة مع preload
  'Strict-Transport-Security':         'max-age=63072000; includeSubDomains; preload',
  // Referrer آمن
  'Referrer-Policy':                   'strict-origin-when-cross-origin',
  // عزل النافذة عن popups خارجية
  'Cross-Origin-Opener-Policy':        'same-origin',
  // منع embedding في مواقع أخرى
  'Cross-Origin-Resource-Policy':      'same-origin',
  // عزل process الـ agent
  'Origin-Agent-Cluster':              '?1',
  // إزالة Server fingerprint
  'X-Powered-By':                      null, // null = احذف الـ header
};

// ─────────────────────────────────────────────────────────────────
// CORS HEADERS
// ─────────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':      ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods':     'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':     'Content-Type, Authorization, X-User-Tier',
  'Access-Control-Max-Age':           '86400', // 24 ساعة preflight cache
  'Vary':                             'Origin',
};

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

/** يطبق كل security headers على الـ response */
function applySecurityHeaders(res) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (value === null) {
      res.removeHeader?.(key);
    } else {
      res.setHeader(key, value);
    }
  }
}

/** يطبق CORS headers */
function applyCorsHeaders(res) {
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }
}

/** يتعامل مع OPTIONS preflight */
function handlePreflight(res) {
  applyCorsHeaders(res);
  res.status(204).end();
}

// ─────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────

/**
 * withSecurity — يُغلّف أي handler بـ security headers + CORS
 *
 * @example
 *   import { withSecurity } from './lib/security.js';
 *   export default withSecurity(handler);
 *
 * @example مع rate limiting
 *   import { withRateLimit } from '../rate-limit.js';
 *   import { withSecurity } from './lib/security.js';
 *   export default withSecurity(withRateLimit(handler, { endpoint: '/api/ai-proxy' }));
 */
export function withSecurity(handler) {
  return async function secureHandler(req, res) {
    // طبّق security headers أولاً
    applySecurityHeaders(res);
    applyCorsHeaders(res);

    // OPTIONS preflight — ردّ فوري
    if (req.method === 'OPTIONS') {
      return handlePreflight(res);
    }

    return handler(req, res);
  };
}

/**
 * applySecurity — للاستخدام المباشر داخل handler موجود
 *
 * @example
 *   import { applySecurity } from './lib/security.js';
 *   export default async function handler(req, res) {
 *     applySecurity(req, res);
 *     if (req.method === 'OPTIONS') return;
 *     // ... باقي الكود
 *   }
 */
export function applySecurity(req, res) {
  applySecurityHeaders(res);
  applyCorsHeaders(res);
}
