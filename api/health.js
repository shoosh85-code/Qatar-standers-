// /api/health.js — QatarSpec Pro health check
// استخدم applyRateLimit المُصدّرة مباشرة بـ export function
import { applyRateLimit } from './rate-limit.js';

export default async function handler(req, res) {
  // ── Rate Limiting (Protocol 6) ────────────────────────────────────────────
  const rl = await applyRateLimit(req, res, '/api/health');
  if (!rl.allowed) return; // applyRateLimit أرسلت 429 بالفعل
  // ──────────────────────────────────────────────────────────────────────────

  const checks = {
    gemini:     !!process.env.GEMINI_KEY,
    supabase:   !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
    jwt:        !!process.env.JWT_SECRET,
    promoCodes: !!(process.env.PROMO_CODES || process.env.PRO_CODES),
  };

  const allOk = Object.values(checks).every(Boolean);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL || 'https://qatar-standers.vercel.app');
  return res.status(200).json({
    status:    allOk ? 'ok' : 'partial',
    timestamp: new Date().toISOString(),
    version:   '2.10.0',
    checks,
  });
}
