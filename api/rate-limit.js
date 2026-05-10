// api/rate-limit.js — Node.js Serverless Wrapper
// المنطق الأساسي في lib/rate-limit.js (المصدر الوحيد)
// هذا الملف يضيف فقط: getIp + Node.js response helpers
// ⚠️ لا تكرر ENDPOINT_LIMITS أو Redis logic هنا — كل شيء في lib/

import { checkRateLimit as _coreCheck, rateLimitResponse } from '../lib/rate-limit.js';

// ── Re-export الدالة الأساسية ─────────────────────────────────────────────
export async function checkRateLimit(ipOrReq, tierOrEndpoint = 'free', endpointOrFlag = null) {
  let ip, isPro, endpoint;
  if (typeof ipOrReq === 'string') {
    ip = ipOrReq; endpoint = tierOrEndpoint;
    isPro = endpointOrFlag === true || endpointOrFlag === 'pro';
  } else {
    ip = getIp(ipOrReq); isPro = tierOrEndpoint === 'pro';
    endpoint = endpointOrFlag || ipOrReq.url?.split('?')[0] || 'default';
  }
  return _coreCheck(ip, endpoint, isPro);
}

export function getIp(req) {
  return (
    req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers?.['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export function rateLimitHeaders(result) {
  const h = {
    'X-RateLimit-Limit':     String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining ?? 0),
    'X-RateLimit-Reset':     String(result.resetAt ?? 0),
    'X-RateLimit-Tier':      result.tier || 'free',
    'X-RateLimit-Source':    result.source || 'memory',
  };
  if (!result.allowed) h['Retry-After'] = String(result.retryAfter || 60);
  return h;
}

export function applyRateLimitHeaders(res, result) {
  Object.entries(rateLimitHeaders(result)).forEach(([k, v]) => res.setHeader(k, v));
}

export async function rateLimit(ip, endpoint = 'default', isPro = false) {
  return _coreCheck(ip, endpoint, isPro);
}

export async function withRateLimit(req, res, tier = 'free') {
  const ip       = getIp(req);
  const isPro    = tier === 'pro';
  const endpoint = req.url?.split('?')[0] || 'default';
  const result   = await _coreCheck(ip, endpoint, isPro);
  applyRateLimitHeaders(res, result);
  if (!result.allowed) {
    res.status(429).json({
      error: 'Too Many Requests',
      message: isPro
        ? 'تجاوزت الحد المسموح (' + result.limit + ' طلب/دقيقة). حاول بعد ' + result.retryAfter + ' ثانية.'
        : 'تجاوزت الحد (' + result.limit + ' طلبات/دقيقة للـ Free). قم بالترقية إلى Pro.',
      retryAfter: result.retryAfter,
      tier,
      upgrade: !isPro ? 'https://qatar-standers.vercel.app/pro' : null,
    });
    return false;
  }
  return true;
}

export { rateLimitResponse };
