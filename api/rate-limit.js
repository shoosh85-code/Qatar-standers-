// api/rate-limit.js — Node.js Serverless Wrapper
// المنطق الأساسي في lib/rate-limit.js (المصدر الوحيد للـ ENDPOINT_LIMITS)
// هذا الملف يضيف: getIp + Node.js response helpers + smart overloads
// PROTOCOL 6: ZERO TOLERANCE — كل endpoint له rate limit
// ⚠️ لا تكرر ENDPOINT_LIMITS هنا — كل شيء في lib/rate-limit.js

import { checkRateLimit as _coreCheck, rateLimitResponse } from '../lib/rate-limit.js';

// ── IP Extraction ─────────────────────────────────────────────────────────
export function getIp(req) {
  if (typeof req === 'string') return req; // already an IP string
  return (
    req?.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req?.headers?.['x-real-ip'] ||
    req?.socket?.remoteAddress ||
    req?.connection?.remoteAddress ||
    'unknown'
  );
}

// ── checkRateLimit — smart overload (IP string OR Request object) ─────────
// Signatures:
//   checkRateLimit(ip: string, endpoint: string, isPro?: boolean)
//   checkRateLimit(req: Request, tier: 'free'|'pro', endpoint?: string)
export async function checkRateLimit(ipOrReq, tierOrEndpoint = 'free', endpointOrFlag = null) {
  let ip, isPro, endpoint;
  if (typeof ipOrReq === 'string') {
    // checkRateLimit(ip, endpoint, isPro)
    ip       = ipOrReq;
    endpoint = tierOrEndpoint;
    isPro    = endpointOrFlag === true || endpointOrFlag === 'pro';
  } else {
    // checkRateLimit(req, tier, endpoint?)
    ip       = getIp(ipOrReq);
    isPro    = tierOrEndpoint === 'pro' || tierOrEndpoint === true;
    endpoint = endpointOrFlag || ipOrReq?.url?.split('?')[0] || 'default';
  }
  return _coreCheck(ip, endpoint, isPro);
}

// ── rateLimit — alias for checkRateLimit (backward compatible) ────────────
// Supports both:
//   rateLimit(ip: string, endpoint: string, isPro?: boolean)
//   rateLimit(req: Request, tier: 'free'|'pro', endpoint?: string)
export async function rateLimit(ipOrReq, endpointOrTier = 'default', isProOrEndpoint = false) {
  let ip, endpoint, isPro;
  if (typeof ipOrReq === 'string') {
    // rateLimit(ip, endpoint, isPro) — original usage
    ip       = ipOrReq;
    endpoint = endpointOrTier;
    isPro    = isProOrEndpoint === true || isProOrEndpoint === 'pro';
  } else {
    // rateLimit(req, tier, endpoint?) — export-pdf.js usage
    ip       = getIp(ipOrReq);
    isPro    = endpointOrTier === 'pro' || endpointOrTier === true;
    endpoint = typeof isProOrEndpoint === 'string' && isProOrEndpoint
      ? `/api/${isProOrEndpoint}`
      : ipOrReq?.url?.split('?')[0] || 'default';
  }
  return _coreCheck(ip, endpoint, isPro);
}

// ── withRateLimit — middleware helper for Node.js (req, res) ─────────────
// Usage: if (!(await withRateLimit(req, res, 'pro'))) return;
export async function withRateLimit(req, res, tier = 'free') {
  const ip       = getIp(req);
  const isPro    = tier === 'pro';
  const endpoint = req?.url?.split('?')[0] || 'default';
  const result   = await _coreCheck(ip, endpoint, isPro);
  applyRateLimitHeaders(res, result);
  if (!result.allowed) {
    const msg = isPro
      ? `تجاوزت الحد المسموح (${result.limit} طلب/دقيقة). حاول بعد ${result.retryAfter} ثانية.`
      : `تجاوزت الحد (${result.limit} طلبات/دقيقة للـ Free). قم بالترقية إلى Pro للحصول على ${result.limit * 12} طلب/دقيقة.`;
    res.status(429).json({
      error: 'Too Many Requests',
      message: msg,
      code: 'RATE_LIMIT',
      retryAfter: result.retryAfter,
      limit: result.limit,
      tier,
      upgrade: !isPro ? 'https://qatar-standers.vercel.app/#pro' : null,
    });
    return false;
  }
  return true;
}

// ── Response Headers ──────────────────────────────────────────────────────
export function rateLimitHeaders(result) {
  const h = {
    'X-RateLimit-Limit':     String(result.limit    ?? 0),
    'X-RateLimit-Remaining': String(result.remaining ?? Math.max(0, (result.limit ?? 0) - (result.count ?? 0))),
    'X-RateLimit-Reset':     String(result.resetAt  ?? 0),
    'X-RateLimit-Tier':      result.tier   || 'free',
    'X-RateLimit-Source':    result.source || 'memory',
  };
  if (!result.allowed) h['Retry-After'] = String(result.retryAfter || 60);
  return h;
}

// Apply headers to Node.js response object
export function applyRateLimitHeaders(res, result) {
  const headers = rateLimitHeaders(result);
  if (typeof res.setHeader === 'function') {
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  } else if (typeof res.set === 'function') {
    res.set(headers);
  }
}

// ── Re-export core utilities ───────────────────────────────────────────────
export { rateLimitResponse };
