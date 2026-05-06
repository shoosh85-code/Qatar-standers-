// api/lib/sentry.js
// QatarSpec Pro — Sentry Error Tracking (Server-side)
// المرحلة C: تتبع الأخطاء على Vercel Serverless
// يعمل بدون SENTRY_DSN — graceful degradation

import * as Sentry from '@sentry/node';

// ─── تهيئة Sentry مرة واحدة فقط (singleton) ──────────────────────────────
let initialized = false;

function init() {
  if (initialized) return;
  initialized = true;

  const dsn = process.env.SENTRY_DSN;

  // إذا لم يكن SENTRY_DSN موجوداً — الكود يعمل بدون Sentry
  if (!dsn) {
    console.warn('[Sentry] SENTRY_DSN غير موجود — تم تجاهل Sentry');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV || 'development',
    release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',

    // تتبع الأداء — 10% في production لتوفير الكوتا
    tracesSampleRate: process.env.VERCEL_ENV === 'production' ? 0.1 : 1.0,

    // لا نرسل بيانات حساسة
    beforeSend(event) {
      // حذف IP من الأحداث (GDPR + قانون قطر)
      if (event.user) {
        delete event.user.ip_address;
      }
      return event;
    },

    // تجاهل أخطاء شائعة غير مهمة
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      /^AbortError/,
    ],
  });

  console.log(`[Sentry] ✅ مهيأ — env: ${process.env.VERCEL_ENV || 'development'}`);
}

// ─── withSentry: wrapper لكل API endpoint ────────────────────────────────
// الاستخدام:
//   export default withSentry(async function handler(req, res) { ... });
//
export function withSentry(handler) {
  return async function sentryHandler(req, res) {
    init();

    // إضافة context مفيد للأخطاء
    Sentry.configureScope((scope) => {
      scope.setTag('vercel.region', process.env.VERCEL_REGION || 'unknown');
      scope.setTag('endpoint', req.url || 'unknown');
      scope.setTag('method', req.method || 'unknown');
      // لا نسجل IP — فقط المسار
    });

    try {
      await handler(req, res);
    } catch (error) {
      // أرسل الخطأ لـ Sentry
      captureException(error, {
        extra: {
          url: req.url,
          method: req.method,
          query: req.query,
        },
      });

      // لا تكشف تفاصيل الخطأ للمستخدم
      if (!res.headersSent) {
        res.status(500).json({
          error: 'خطأ داخلي في الخادم',
          code: 'INTERNAL_SERVER_ERROR',
          // يُرجع Sentry event ID لمساعدة في debugging
          eventId: Sentry.lastEventId() || null,
        });
      }

      // أعد رمي الخطأ لـ Vercel logs
      throw error;
    } finally {
      // flush الأحداث قبل انتهاء الـ serverless function
      await Sentry.flush(2000);
    }
  };
}

// ─── captureException: يعمل بدون SENTRY_DSN ─────────────────────────────
// الاستخدام: captureException(error, { extra: { ... } })
//
export function captureException(error, context = {}) {
  init();

  if (!process.env.SENTRY_DSN) {
    // fallback: سجّل الخطأ في console فقط
    console.error('[Sentry fallback] خطأ غير معالج:', error?.message || error, context);
    return null;
  }

  return Sentry.withScope((scope) => {
    if (context.extra) {
      scope.setExtras(context.extra);
    }
    if (context.tags) {
      scope.setTags(context.tags);
    }
    if (context.user) {
      // لا نسجل IP أبداً
      scope.setUser({ id: context.user.id, tier: context.user.tier });
    }
    return Sentry.captureException(error);
  });
}

// ─── captureMessage: لتسجيل أحداث غير استثنائية ─────────────────────────
// الاستخدام: captureMessage('تحذير: rate limit قرب الامتلاء', 'warning')
//
export function captureMessage(message, level = 'info', context = {}) {
  init();

  if (!process.env.SENTRY_DSN) {
    console.log(`[Sentry fallback] [${level}] ${message}`, context);
    return null;
  }

  return Sentry.withScope((scope) => {
    scope.setLevel(level);
    if (context.extra) scope.setExtras(context.extra);
    if (context.tags) scope.setTags(context.tags);
    return Sentry.captureMessage(message);
  });
}

// ─── setUserContext: يُستدعى بعد التحقق من المستخدم ─────────────────────
// الاستخدام: setUserContext({ id: userId, tier: 'pro' })
//
export function setUserContext({ id, tier }) {
  init();
  if (!process.env.SENTRY_DSN) return;

  Sentry.setUser({
    id,
    tier,
    // لا ip_address أبداً
  });
}

// ─── Default export للاستخدام المباشر ────────────────────────────────────
export default {
  withSentry,
  captureException,
  captureMessage,
  setUserContext,
  init,
};
