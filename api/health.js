// /api/health.js — QatarSpec Pro health check v2.11.0
// مستقل تماماً — بدون import من rate-limit.js

import { withSecurity }  from '../lib/security.js';
import { secureHandler } from '../lib/security-headers.js';
import { captureWarning } from '../lib/sentry.js';

const _handler = async function handler(req, res) {
  const services = {
    gemini:     !!process.env.GEMINI_API_KEY,
    supabase:   !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
    jwt:        !!process.env.JWT_SECRET,
    promoCodes: !!(process.env.PROMO_CODES || process.env.PRO_CODES),
    redis:      !!process.env.UPSTASH_REDIS_REST_URL,
    sentry:     !!process.env.SENTRY_DSN,
  };

  // الفحوصات الأربعة الأساسية — PROTOCOL 6 format
  const checks = {
    gemini:   services.gemini,
    jwt:      services.jwt,
    redis:    services.redis,
    supabase: services.supabase,
  };

  const allOk = Object.values(services).every(Boolean);
  const status = allOk ? 'ok' : (services.gemini && services.jwt ? 'degraded' : 'error');

  if (status !== 'ok') await captureWarning('Health check degraded', services);

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    status,
    checks,
    services,                        // backward compat — يبقى كما هو
    timestamp: new Date().toISOString(),
    version:   '2.11.0',
  });
};

export default secureHandler(_handler);
