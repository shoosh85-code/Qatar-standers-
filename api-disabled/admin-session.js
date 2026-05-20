// Secure admin endpoint - issues HMAC-signed session token
// Access: POST /api/admin-session with { secret: process.env.ADMIN_SECRET }
// Returns: { token } — HMAC-SHA256 signed, stored in sessionStorage (not URL)
// [SEC] Rate limiting: 3 محاولات/دقيقة لمنع brute-force على الـ admin
// [SEC] Token: payload.signature format — validated server-side via HMAC

import crypto from 'crypto';
import { withSecurity } from '../lib/security.js';
import { checkRateLimit } from '../lib/rate-limit.js';

// ── HMAC Token Generation ─────────────────────────────────────────────────────
function generateAdminToken(secret) {
  const payload = JSON.stringify({
    role: 'admin',
    ts: Date.now(),
    exp: Date.now() + 86400000, // 24h
    jti: crypto.randomBytes(16).toString('hex') // unique token ID
  });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

// ── HMAC Token Verification (exported for use in ai-proxy.js etc.) ────────────
export function verifyAdminToken(token, secret) {
  if (!token || !secret) return { valid: false, reason: 'missing' };
  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false, reason: 'malformed' };

  const [payloadB64, signature] = parts;

  // التحقق من التوقيع — constant-time comparison لمنع timing attacks
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return { valid: false, reason: 'invalid_signature' };
  }

  // التحقق من انتهاء الصلاحية
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    if (payload.role !== 'admin') return { valid: false, reason: 'wrong_role' };
    if (Date.now() > payload.exp) return { valid: false, reason: 'expired' };
    return { valid: true, payload };
  } catch (e) {
    return { valid: false, reason: 'parse_error' };
  }
}

const _handler = async function handler(req, res) {
  const ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // ── Rate Limit Check (PROTOCOL 6 — Upstash Redis) ──────────────────────────
  const ip = (req.headers['x-forwarded-for']?.split(',')[0]?.trim()) ||
             req.socket?.remoteAddress || '0.0.0.0';
  const rl = await checkRateLimit(ip, '/api/verify-pro', false); // admin = strict free limits
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    res.setHeader('X-RateLimit-Limit', String(rl.limit));
    res.setHeader('X-RateLimit-Remaining', '0');
    return res.status(429).json({
      error: `تجاوزت الحد (${rl.limit} محاولات/دقيقة للـ Admin). حاول بعد ${rl.retryAfter} ثانية.`,
    });
  }

  const { secret } = req.body || {};
  const ADMIN_SECRET = process.env.ADMIN_SECRET;

  if (!ADMIN_SECRET) return res.status(503).json({ error: 'Not configured' });

  // Constant-time comparison لمنع timing attacks على الـ secret
  if (!secret || !crypto.timingSafeEqual(
    Buffer.from(String(secret)),
    Buffer.from(ADMIN_SECRET)
  )) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Issue HMAC-signed session token (24h)
  const token = generateAdminToken(ADMIN_SECRET);
  const payload = JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString());

  res.status(200).json({
    token,
    expires: payload.exp,
    message: 'Store this token in sessionStorage key: qs_admin_token'
  });
}

export default withSecurity(_handler);
