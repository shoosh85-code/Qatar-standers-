// api/lib/security-headers.js — QatarSpec Pro Security Layer
// مستقل تماماً — لا imports خارجية

const ALLOWED_ORIGINS = [
  'https://qatar-standers.vercel.app',
  'https://qatar-standers-git-main-shoosh85-3851s-projects.vercel.app',
  'https://qatar-standers-shoosh85-3851s-projects.vercel.app',
];

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com https://plausible.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
  "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com https://plausible.io",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export function applySecurityHeaders(res) {
  res.setHeader('X-Frame-Options',            'DENY');
  res.setHeader('X-Content-Type-Options',     'nosniff');
  res.setHeader('X-XSS-Protection',           '1; mode=block');
  res.setHeader('Strict-Transport-Security',  'max-age=2592000; includeSubDomains');
  res.setHeader('Referrer-Policy',            'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy',    CSP);
  res.setHeader('Permissions-Policy',         'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('X-Powered-By',               'QatarSpec Pro');
}

export function handleCORS(req, res) {
  const origin  = req.headers.origin || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin',  allowed);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
  res.setHeader('Access-Control-Max-Age',       '86400');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

export function secureHandler(handler) {
  return async (req, res) => {
    if (handleCORS(req, res)) return;
    applySecurityHeaders(res);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    try {
      await handler(req, res);
    } catch (err) {
      console.error('[QatarSpec API Error]', err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error', message: 'خطأ داخلي' });
      }
    }
  };
}
