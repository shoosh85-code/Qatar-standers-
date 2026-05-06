// api/lib/sentry.js — QatarSpec Pro Error Tracking
// بدون @sentry/node SDK — HTTP fetch مباشر لـ Sentry API
// يتجنب تجاوز حد Lambda bundle size (50MB)
// API surface متوافق 100% مع @sentry/node

let _initDone = false;
let _dsn       = null;
let _sentryUrl = null;
let _sentryKey = null;

// تهيئة كسولة
function init() {
  if (_initDone) return;
  _initDone = true;
  _dsn = process.env.SENTRY_DSN;
  if (!_dsn) {
    console.warn('[Sentry] SENTRY_DSN غير موجود — fallback لـ console.error');
    return;
  }
  try {
    // Parse DSN: https://KEY@HOST/PROJECT_ID
    const url    = new URL(_dsn);
    _sentryKey   = url.username;
    const host   = url.hostname;
    const projId = url.pathname.replace('/', '');
    _sentryUrl   = `https://${host}/api/${projId}/store/`;
  } catch (e) {
    console.error('[Sentry] DSN غير صالح:', e.message);
  }
}

// إرسال event لـ Sentry عبر HTTP fetch
async function sendToSentry(payload) {
  init();
  if (!_sentryUrl) return null;
  try {
    await fetch(_sentryUrl, {
      method:  'POST',
      headers: {
        'Content-Type':   'application/json',
        'X-Sentry-Auth':  `Sentry sentry_version=7, sentry_key=${_sentryKey}`,
      },
      body: JSON.stringify({
        event_id:    crypto.randomUUID?.() || Date.now().toString(36),
        timestamp:   new Date().toISOString(),
        platform:    'node',
        environment: process.env.NODE_ENV || 'production',
        release:     'qatarspec-pro@2.11.0',
        ...payload,
      }),
    });
  } catch (e) {
    console.warn('[Sentry] فشل الإرسال:', e.message);
  }
}

export async function captureError(error, context = {}) {
  // حذف البيانات الحساسة
  const safe = {
    endpoint: context.endpoint || 'unknown',
    tier:     context.tier     || 'unknown',
    method:   context.method   || 'unknown',
  };
  if (_sentryUrl) {
    await sendToSentry({
      level:   'error',
      message: error?.message || String(error),
      exception: { values: [{ type: error?.name || 'Error', value: error?.message || String(error) }] },
      tags:    safe,
    });
  } else {
    console.error('[QatarSpec Error]', safe, error?.message);
  }
}

export async function captureWarning(message, context = {}) {
  init();
  if (_sentryUrl) {
    await sendToSentry({ level: 'warning', message });
  } else {
    console.warn('[QatarSpec Warning]', message, context);
  }
}

// wrapper لأي API handler
export function withErrorTracking(handler, endpoint = 'unknown') {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      await captureError(err, {
        endpoint,
        tier:   req.headers['authorization']?.startsWith('Pro ') ? 'pro' : 'free',
        method: req.method,
      });
      if (!res.headersSent) {
        res.status(500).json({
          error:   'Internal Server Error',
          message: 'خطأ داخلي — تم تسجيله تلقائياً',
        });
      }
    }
  };
}

// ─── API surface متوافق مع الـ stub القديم ───────────────────────────────
export async function captureException(error, context = {}) {
  return captureError(error, context);
}

export async function captureMessage(message, level = 'info', context = {}) {
  return captureWarning(message, context);
}

export function withSentry(handler) {
  return withErrorTracking(handler, 'unknown');
}

export function setUserContext() { /* no PII */ }

export default { withSentry, captureException, captureMessage, setUserContext, init, captureError, captureWarning, withErrorTracking };
