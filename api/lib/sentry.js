// api/lib/sentry.js — QatarSpec Pro
// Lightweight stub — no external dependency
// @sentry/node v8 removed: breaks Vercel deployment (bundle size + configureScope removed)
// Full Sentry can be re-added via SENTRY_DSN when needed — API surface identical

// ─── withSentry: wrapper لكل API endpoint ────────────────────────────────
export function withSentry(handler) {
  return async function sentryHandler(req, res) {
    try {
      await handler(req, res);
    } catch (error) {
      captureException(error, {
        extra: { url: req.url, method: req.method, query: req.query },
      });
      if (!res.headersSent) {
        res.status(500).json({
          error: 'خطأ داخلي في الخادم',
          code: 'INTERNAL_SERVER_ERROR',
          eventId: null,
        });
      }
      throw error;
    }
  };
}

// ─── captureException ────────────────────────────────────────────────────
export function captureException(error, context = {}) {
  console.error('[QatarSpec Error]', error?.message || error, context?.extra || '');
  return null;
}

// ─── captureMessage ──────────────────────────────────────────────────────
export function captureMessage(message, level = 'info', context = {}) {
  console.log(`[QatarSpec ${level}] ${message}`, context?.extra || '');
  return null;
}

// ─── setUserContext ──────────────────────────────────────────────────────
export function setUserContext({ id, tier }) {
  // no-op stub
}

// ─── init ────────────────────────────────────────────────────────────────
export function init() {
  // no-op stub
}

export default { withSentry, captureException, captureMessage, setUserContext, init };
