// api/log-error.js — QatarSpec Pro
// Phase 7: Client-side error logging endpoint
import { rateLimit } from './rate-limit.js';

const CORS_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://qatar-standers.vercel.app';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // Rate limit — مستوى free فقط (endpoint داخلي)
  const rl = await rateLimit(req, '/api/log-error', 'free');
  if (!rl.allowed) return res.status(429).json({ error: 'Rate limit exceeded' });

  const { message, source, lineno, colno, stack, url, timestamp } = req.body || {};

  // تحقق أساسي
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // تنظيف — لا تُسجَّل بيانات حساسة أو طويلة
  const safeMsg   = String(message).slice(0, 500);
  const safeSrc   = String(source  || '').slice(0, 200);
  const safeStack = String(stack   || '').slice(0, 1000);
  const safeUrl   = String(url     || '').slice(0, 200);
  const ip        = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';

  // Log إلى console — يظهر في Vercel Function Logs
  console.error(JSON.stringify({
    type:    'CLIENT_ERROR',
    message: safeMsg,
    source:  safeSrc,
    line:    lineno  || null,
    col:     colno   || null,
    stack:   safeStack,
    url:     safeUrl,
    ip,
    ts:      timestamp || new Date().toISOString()
  }));

  return res.status(200).json({ logged: true });
}
