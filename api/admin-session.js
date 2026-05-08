// Secure admin endpoint - issues a session token for testing
// Access: POST /api/admin-session with { secret: process.env.ADMIN_SECRET }
// Returns: { token } stored in client sessionStorage (not URL)
// [SEC] Rate limiting: 3 محاولات/دقيقة لمنع brute-force على الـ admin

import { withSecurity } from '../lib/security.js';
import { checkRateLimit } from '../lib/rate-limit.js';

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
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Issue a short-lived session token (24h)
  const token = Buffer.from(`admin:${Date.now()}:${Math.random()}`).toString('base64');
  
  res.status(200).json({ 
    token,
    expires: Date.now() + 86400000,
    message: 'Store this token in sessionStorage key: qs_admin_token'
  });
}

export default withSecurity(_handler);
