/**
 * Lazy Loader — QatarSpec Pro
 * يحمّل الـ scripts غير الحرجة بعد window load + 3 ثوانٍ
 * Phase 1 Performance Fix
 */
(function() {
  'use strict';

  // قائمة الـ scripts غير الحرجة — تُحمَّل بعد التحميل الأساسي
  var NON_CRITICAL = [
    '/js/micro-delights.js',
    '/js/luxury-anim-v2.js',
    '/js/card-waves.js',
    '/js/wave-lines.js',
    '/js/guided-tour.js',
    '/js/posthog-analytics.js',
    // '/js/scroll-animations.js', // DISABLED — was adding data-aos to cat-cards causing AOS to hide them permanently
    '/js/tooltip-system.js'
  ];

  var loaded = new Set();

  function loadScript(src) {
    if (loaded.has(src)) return;
    loaded.add(src);
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onerror = function() { loaded.delete(src); };
    document.body.appendChild(s);
  }

  function loadAllNonCritical() {
    // تأخير 100ms بين كل script لتجنب blocking
    NON_CRITICAL.forEach(function(src, i) {
      setTimeout(function() { loadScript(src); }, i * 100);
    });
  }

  // استراتيجية التحميل:
  // 1. بعد window load + 3 ثوانٍ (مستخدم نشط)
  // 2. عند أول تفاعل (click/scroll/keydown) — إذا لم يتم التحميل بعد
  var triggered = false;

  function trigger() {
    if (triggered) return;
    triggered = true;
    loadAllNonCritical();
  }

  if (document.readyState === 'complete') {
    setTimeout(trigger, 3000);
  } else {
    window.addEventListener('load', function() {
      setTimeout(trigger, 3000);
    });
  }

  // تحميل فوري عند أول تفاعل
  ['click', 'scroll', 'keydown', 'touchstart'].forEach(function(evt) {
    document.addEventListener(evt, function onFirstInteraction() {
      trigger();
      document.removeEventListener(evt, onFirstInteraction);
    }, { once: true, passive: true });
  });

})();
