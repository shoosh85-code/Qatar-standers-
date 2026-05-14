// js/posthog-analytics.js — QatarSpec Pro v1.0
// PostHog Product Analytics — Event Tracking
// ✅ CSP-compliant — مسموح في vercel.json (connect-src + script-src)
// ✅ يعمل بجانب Plausible + GA4 الموجودين — لا تعارض
// ✅ لا تتبع شخصي — person_profiles: 'identified_only'
// ✅ لا تخزين في localStorage لـ API keys
//
// ملاحظة: المستخدم يحتاج:
//   1. يسجّل مجاناً في https://posthog.com
//   2. ينشئ مشروع جديد
//   3. يستبدل 'phc_YOUR_PROJECT_API_KEY' بالمفتاح الفعلي من Project Settings

(function () {
  'use strict';

  // ─── PostHog Snippet (async load) ────────────────────────────────────────
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  // ─── تهيئة PostHog ───────────────────────────────────────────────────────
  // استبدل 'phc_YOUR_PROJECT_API_KEY' بالمفتاح الحقيقي من posthog.com
  if (window.posthog && typeof window.posthog.init === 'function') {
    window.posthog.init('phc_YOUR_PROJECT_API_KEY', {
      api_host: 'https://app.posthog.com',
      person_profiles: 'identified_only', // لا تتبع شخصي
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false, // نتحكم يدوياً — أدق وأخف
    });
  }

  // ─── مساعد: تحديد tier المستخدم ──────────────────────────────────────
  function getUserTier() {
    // نقرأ من cookie فقط — لا localStorage
    return document.cookie.includes('qs_pro=') ? 'pro' : 'free';
  }

  // ─── مساعد: تشغيل PostHog capture بأمان ─────────────────────────────
  function phCapture(event, props) {
    try {
      // لا تتبع في development
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      ) {
        console.log('[PostHog] dev mode — تخطي:', event, props);
        return;
      }
      if (window.posthog && typeof window.posthog.capture === 'function') {
        window.posthog.capture(event, props || {});
      }
    } catch (e) {
      // silent fail — لا نوقف التطبيق بسبب analytics
      console.warn('[PostHog] capture error:', e.message);
    }
  }

  // ─── QS.track — الأحداث القياسية ─────────────────────────────────────
  window.QS = window.QS || {};

  // دمج مع QS.track الموجود (Plausible + GA4 في analytics.js)
  // PostHog يُضاف كطبقة ثالثة بدون حذف أي شيء
  var _existingTrack = window.QS.track || null;

  window.QS.track = {

    // بحث ذكي — يُستدعى بعد نجاح الـ fetch في doSearch()
    aiSearch: function (query, resultCount) {
      phCapture('ai_search', {
        query_length: query ? query.length : 0,
        results: resultCount || 0,
        tier: getUserTier(),
      });
    },

    // فتح قسم/بطاقة
    openSection: function (sectionId, sectionName) {
      phCapture('section_opened', {
        section_id: sectionId || '',
        section_name: sectionName || '',
        tier: getUserTier(),
      });
    },

    // استخدام حاسبة — Pass أو Fail
    useCalculator: function (calcName, result) {
      phCapture('calculator_used', {
        calculator: calcName || '',
        result: result || '',
        tier: getUserTier(),
      });
    },

    // تصدير ملف (PDF / Excel / Word)
    exportFile: function (format) {
      phCapture('file_exported', {
        format: format || '',
        tier: getUserTier(),
      });
    },

    // ظهور Pro prompt لمستخدم مجاني
    proPromptShown: function (feature) {
      phCapture('pro_prompt_shown', {
        feature: feature || '',
      });
    },

    // المستخدم ضغط "ارقَ للـ Pro" داخل الـ prompt
    proPromptClicked: function (feature) {
      phCapture('pro_prompt_clicked', {
        feature: feature || '',
      });
    },

    // تبديل اللغة عربي/إنجليزي
    languageSwitch: function (lang) {
      phCapture('language_switched', {
        language: lang || '',
      });
    },

    // أكمل المستخدم Guided Tour
    tourCompleted: function () {
      phCapture('onboarding_tour_completed', {
        tier: getUserTier(),
      });
    },

    // خطأ وقع في التطبيق
    error: function (type, message) {
      phCapture('error_occurred', {
        error_type: type || '',
        error_message: message ? String(message).slice(0, 200) : '',
      });
    },

    // قياس أداء (يستدعيه performance-monitor.js)
    performance: function (timing) {
      phCapture('page_performance', {
        dom_interactive: timing.dom_interactive || 0,
        dom_complete: timing.dom_complete || 0,
        load_event: timing.load_event || 0,
      });
    },

    // سؤال AI / vision / doc analyzer
    aiQuery: function (type) {
      phCapture('ai_query_sent', {
        query_type: type || 'text',
        tier: getUserTier(),
      });
    },
  };

  // ─── دعم الاستدعاء الوظيفي القديم: QS.track('Event', props) ──────────
  // الـ analytics.js يصدر window.QS.track كـ function — نحافظ على التوافق
  // إذا كان الكود القديم يستدعي: window.QS.track('CalculatorUsed', {...})
  // نحوّله لـ PostHog capture مباشرةً
  var _trackObj = window.QS.track;
  var _trackProxy = function (eventName, props) {
    // استدعاء Plausible/GA4 إذا كان موجوداً
    if (typeof _existingTrack === 'function') {
      try { _existingTrack(eventName, props); } catch (e) {}
    }
    // إضافة PostHog
    phCapture(eventName, props);
  };

  // انسخ كل methods من الـ object للـ proxy function
  Object.keys(_trackObj).forEach(function (key) {
    _trackProxy[key] = _trackObj[key];
  });

  window.QS.track = _trackProxy;

  // ─── ربط showUpgradePrompt الموجودة ──────────────────────────────────
  // نلتقط متى تُظهر الـ upgrade overlay
  var _upgradeObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (
        m.type === 'attributes' &&
        m.attributeName === 'class' &&
        m.target.id === 'upgradeOverlay' &&
        m.target.classList.contains('open')
      ) {
        // اقرأ اسم الميزة من عنوان الـ overlay
        var titleEl = document.getElementById('upgradeTitle');
        var feature = titleEl ? titleEl.textContent.slice(0, 50) : 'unknown';
        window.QS.track.proPromptShown(feature);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('upgradeOverlay');
    if (overlay) {
      _upgradeObserver.observe(overlay, { attributes: true });
    }

    // ربط زر "ارقَ للـ Pro" في الـ overlay
    var upgradeBtn = document.querySelector('#upgradeOverlay .upgrade-cta, #upgradeOverlay [onclick*="payment"], #upgradeOverlay .btn-pro');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', function () {
        var titleEl = document.getElementById('upgradeTitle');
        var feature = titleEl ? titleEl.textContent.slice(0, 50) : 'unknown';
        window.QS.track.proPromptClicked(feature);
      });
    }

    // ربط أزرار تبديل اللغة
    var langBtns = document.querySelectorAll('[onclick*="switchLang"], [onclick*="toggleLanguage"], .lang-btn, #langToggle');
    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var currentLang = document.documentElement.lang || document.body.dataset.lang || 'ar';
        var newLang = currentLang === 'ar' ? 'en' : 'ar';
        window.QS.track.languageSwitch(newLang);
      });
    });
  });

  console.log('[PostHog] ✅ posthog-analytics.js جاهز — استبدل phc_YOUR_PROJECT_API_KEY بمفتاحك من posthog.com');

})();
