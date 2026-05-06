// /api/health.js — QatarSpec Pro health check
// مستقل تماماً — بدون import من rate-limit.js


import { withSecurity } from './lib/security.js';
const _handler = async function handler(req, res) {
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

export default withSecurity(_handler);
