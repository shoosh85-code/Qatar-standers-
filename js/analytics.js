// Plausible queue stub — must run before plausible.js loads
(function(){window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}})();
// js/analytics.js — QatarSpec Pro v1.0
// Unified Analytics: Plausible (primary) + GA4 (fallback)
// ✅ بدون cookies — GDPR compliant — قانون قطر للبيانات
// ✅ لا تتبع شخصي — فقط أحداث مجهولة
// ✅ يعمل حتى لو حُظر أحدهما بـ ad-blocker

(function () {
  'use strict';

  // ─── هل Plausible محمّل؟ ──────────────────────────────────────────────
  function plausibleReady() {
    return typeof window.plausible === 'function';
  }

  // ─── هل GA4 محمّل؟ ───────────────────────────────────────────────────
  function ga4Ready() {
    return typeof window.gtag === 'function';
  }

  // ─── track: الدالة الموحّدة ───────────────────────────────────────────
  // الاستخدام: window.QS.track('CalculatorUsed', { tool: 'concrete-mix' })
  //
  function track(eventName, props = {}) {
    // لا تتبع في development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[analytics] dev mode — تخطي:', eventName, props);
      return;
    }

    // Plausible (primary — بدون cookies)
    if (plausibleReady()) {
      try {
        window.plausible(eventName, { props });
      } catch (e) {
        console.warn('[analytics] Plausible error:', e.message);
      }
    }

    // GA4 (fallback — للإحصاءات الإضافية)
    if (ga4Ready()) {
      try {
        window.gtag('event', eventName, {
          ...props,
          send_to: 'G-QSPEC2026QA',
        });
      } catch (e) {
        console.warn('[analytics] GA4 error:', e.message);
      }
    }
  }

  // ─── أحداث QatarSpec القياسية ─────────────────────────────────────────

  // تتبع استخدام الحاسبات
  function trackCalculator(calcName, result = {}) {
    track('CalculatorUsed', {
      calculator: calcName,
      result: result.pass ? 'pass' : result.fail ? 'fail' : 'calculated',
      tier: getUserTier(),
    });
  }

  // تتبع بحث QCS
  function trackSearch(query, resultsCount) {
    track('QCSSearch', {
      has_results: resultsCount > 0,
      tier: getUserTier(),
    });
  }

  // تتبع التصدير (PDF/Excel/Word)
  function trackExport(format) {
    track('ExportCreated', {
      format,
      tier: getUserTier(),
    });
  }

  // تتبع ضغط ترقية Pro
  function trackUpgradeClick(source) {
    track('UpgradeClicked', { source, tier: 'free' });
  }

  // تتبع سؤال AI
  function trackAIQuery(isPro) {
    track('AIQuerySent', { tier: isPro ? 'pro' : 'free' });
  }

  // تتبع pageview يدوي (للـ SPA)
  function trackPageview(path) {
    if (plausibleReady()) {
      window.plausible('pageview', { u: window.location.origin + (path || window.location.pathname) });
    }
  }

  // ─── مساعد: تحديد tier المستخدم ──────────────────────────────────────
  function getUserTier() {
    // لا نقرأ localStorage — نقرأ من cookie فقط
    const hasCookie = document.cookie.includes('qs_pro=');
    return hasCookie ? 'pro' : 'free';
  }

  // ─── تسجيل في namespace window.QS ────────────────────────────────────
  window.QS = window.QS || {};
  window.QS.analytics = {
    track,
    trackCalculator,
    trackSearch,
    trackExport,
    trackUpgradeClick,
    trackAIQuery,
    trackPageview,
  };

  // Alias مختصر
  window.QS.track = track;

  console.log('[analytics] ✅ Plausible + GA4 جاهزان');
})();
