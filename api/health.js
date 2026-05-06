// /api/health.js — QatarSpec Pro health check v2.11.0
// مستقل تماماً — بدون import من rate-limit.js

import { withSecurity }  from '../lib/security.js';
import { secureHandler } from '../lib/security-headers.js';
import { captureWarning } from '../lib/sentry.js';

const _handler = async function handler(req, res) {
  const services = {
    gemini:     !!process.env.GEMINI_KEY,
    supabase:   !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
    jwt:        !!process.env.JWT_SECRET,
    promoCodes: !!(process.env.PROMO_CODES || process.env.PRO_CODES),
    redis:      !!process.env.UPSTASH_REDIS_REST_URL,
    sentry:     !!process.env.SENTRY_DSN,
  };

  const allOk = Object.values(services).every(Boolean);

  if (!allOk) await captureWarning('Health check degraded', services);

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    status:    allOk ? 'ok' : 'degraded',
    services,
    timestamp: new Date().toISOString(),
    version:   '2.11.0',
  });
};

export default secureHandler(_handler);
