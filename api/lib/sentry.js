// api/lib/sentry.js — QatarSpec Pro Error Tracking
// لا top-level await — init عند أول استخدام (lazy)
// ESM dynamic import بدلاً من require (project type: module)

let _sentry   = null;
let _initDone = false;

// تهيئة كسولة — تعمل عند أول استدعاء فقط
async function getSentry() {
  if (_initDone) return _sentry;
  _initDone = true;

  const dsn = process.env.SENTRY_DSN;
  if (!dsn) {
    console.warn('[Sentry] SENTRY_DSN غير موجود — fallback لـ console.error');
    return null;
  }

  try {
    const SentryMod = await import('@sentry/node');
    SentryMod.init({
      dsn,
      environment:      process.env.NODE_ENV || 'production',
      release:          'qatarspec-pro@2.11.0',
      tracesSampleRate: 0.05, // 5% فقط لتوفير حصة الـ free tier
      beforeSend(event) {
        // حذف البيانات الحساسة قبل الإرسال
        if (event.request?.headers) {
          delete event.request.headers['authorization'];
          delete event.request.headers['cookie'];
          delete event.request.headers['x-real-ip'];
        }
        if (event.user) {
          delete event.user.email;
          delete event.user.ip_address;
        }
        return event;
      },
    });
    _sentry = SentryMod;
    console.log('[Sentry] تم التهيئة بنجاح');
  } catch (err) {
    console.error('[Sentry] فشل التهيئة:', err.message);
  }

  return _sentry;
}

export async function captureError(error, context = {}) {
  const sentry = await getSentry();
  const safe   = {
    endpoint: context.endpoint || 'unknown',
    tier:     context.tier     || 'unknown',
    method:   context.method   || 'unknown',
  };

  if (sentry) {
    sentry.withScope(scope => {
      scope.setTag('endpoint', safe.endpoint);
      scope.setTag('tier',     safe.tier);
      scope.setExtra('context', safe);
      sentry.captureException(error);
    });
  } else {
    console.error('[QatarSpec Error]', safe, error.message);
  }
}

export async function captureWarning(message, context = {}) {
  const sentry = await getSentry();
  if (sentry) {
    sentry.captureMessage(message, 'warning');
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
export function init() { /* lazy — يعمل عند أول استخدام */ }

export default { withSentry, captureException, captureMessage, setUserContext, init, captureError, captureWarning, withErrorTracking };
