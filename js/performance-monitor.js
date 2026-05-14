/**
 * QatarSpec Pro — Performance Monitor v1.0
 * PROMPT #10: قياس أداء التحميل + Resource Analysis
 * ملف: js/performance-monitor.js
 */

'use strict';

(function () {
  // انتظر حتى اكتمال التحميل
  window.addEventListener('load', function () {
    if (!window.performance) return;

    // تأخير قصير لضمان اكتمال loadEventEnd
    setTimeout(function () {
      var timing = null;
      try {
        var entries = performance.getEntriesByType('navigation');
        if (entries && entries.length > 0) timing = entries[0];
      } catch (e) { /* unsupported */ }

      if (!timing) return;

      var domInteractive = Math.round(timing.domInteractive);
      var domComplete = Math.round(timing.domComplete);
      var loadEvent = Math.round(timing.loadEventEnd);
      var ttfb = Math.round(timing.responseStart - timing.requestStart);
      var domParsing = Math.round(timing.domInteractive - timing.responseEnd);

      console.log('%c[QS-PERF] Navigation Timing', 'color:#7A1515;font-weight:bold');
      console.log('[QS-PERF] TTFB:', ttfb, 'ms');
      console.log('[QS-PERF] DOM Parsing:', domParsing, 'ms');
      console.log('[QS-PERF] DOM Interactive:', domInteractive, 'ms');
      console.log('[QS-PERF] DOM Complete:', domComplete, 'ms');
      console.log('[QS-PERF] Load Event:', loadEvent, 'ms');

      // Resource size analysis
      var resources = [];
      try {
        resources = performance.getEntriesByType('resource');
      } catch (e) { /* unsupported */ }

      if (resources.length > 0) {
        var jsResources = resources.filter(function (r) { return r.name.endsWith('.js'); });
        var cssResources = resources.filter(function (r) { return r.name.endsWith('.css'); });
        var totalJS = jsResources.reduce(function (sum, r) { return sum + (r.transferSize || 0); }, 0);
        var totalCSS = cssResources.reduce(function (sum, r) { return sum + (r.transferSize || 0); }, 0);
        var totalAll = resources.reduce(function (sum, r) { return sum + (r.transferSize || 0); }, 0);

        console.log('%c[QS-PERF] Resource Summary', 'color:#7A1515;font-weight:bold');
        console.log('[QS-PERF] JS files:', jsResources.length, '→', Math.round(totalJS / 1024), 'KB');
        console.log('[QS-PERF] CSS files:', cssResources.length, '→', Math.round(totalCSS / 1024), 'KB');
        console.log('[QS-PERF] Total resources:', resources.length, '→', Math.round(totalAll / 1024), 'KB');

        // أبطأ 5 موارد
        var slowest = resources
          .filter(function (r) { return r.duration > 0; })
          .sort(function (a, b) { return b.duration - a.duration; })
          .slice(0, 5);

        if (slowest.length > 0) {
          console.log('%c[QS-PERF] Slowest Resources', 'color:#854F0B;font-weight:bold');
          slowest.forEach(function (r) {
            var name = r.name.split('/').pop().split('?')[0];
            console.log('[QS-PERF]  ', name, '→', Math.round(r.duration), 'ms',
              r.transferSize ? '(' + Math.round(r.transferSize / 1024) + ' KB)' : '');
          });
        }
      }

      // Report to QS analytics if available
      if (window.QS && window.QS.track && typeof window.QS.track.performance === 'function') {
        window.QS.track.performance({
          ttfb: ttfb,
          dom_interactive: domInteractive,
          dom_complete: domComplete,
          load_event: loadEvent,
          js_count: jsResources ? jsResources.length : 0,
          js_kb: jsResources ? Math.round(totalJS / 1024) : 0
        });
      }

    }, 100); // تأخير 100ms لضمان دقة القياسات
  });

  // ═══ Core Web Vitals (LCP, FID, CLS) ═══
  // LCP — Largest Contentful Paint
  try {
    if (typeof PerformanceObserver !== 'undefined') {
      var lcpObserver = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        var lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          console.log('[QS-PERF] LCP:', Math.round(lastEntry.startTime), 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // CLS — Cumulative Layout Shift
      var clsValue = 0;
      var clsObserver = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // طباعة CLS بعد 5 ثوان (عندما يستقر الصفحة)
      setTimeout(function () {
        console.log('[QS-PERF] CLS:', clsValue.toFixed(4));
        clsObserver.disconnect();
      }, 5000);

      // FID — First Input Delay
      var fidObserver = new PerformanceObserver(function (list) {
        var entry = list.getEntries()[0];
        if (entry) {
          console.log('[QS-PERF] FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
          fidObserver.disconnect();
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    }
  } catch (e) {
    // PerformanceObserver غير مدعوم
  }

  console.log('[QS Performance Monitor] ✅ محمّل — تابع النتائج في Console');
})();
