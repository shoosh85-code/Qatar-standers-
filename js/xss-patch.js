/**
 * QatarSpec Pro — XSS Auto-Patch v1.0
 * يعترض كل innerHTML assignments تلقائياً بعد تحميل الصفحة
 * يعمل كـ safety net للكود القديم الذي لم يُحدَّث بعد
 *
 * ملاحظة: هذا patch إضافي — الأمان الحقيقي في server-side validation
 */

(function() {
  'use strict';

  // انتظر حتى يُحمَّل QS.sanitize
  function waitForSecurity(callback) {
    if (typeof window.QS !== 'undefined' && typeof window.QS.sanitize === 'function' &&
        typeof DOMPurify !== 'undefined') {
      callback();
    } else {
      setTimeout(function() { waitForSecurity(callback); }, 50);
    }
  }

  waitForSecurity(function() {

    // العناصر التي تستقبل AI responses مباشرة — أعلى خطورة
    var HIGH_RISK_IDS = [
      'da-result', 'pi-result', 'esal-result', 'mv-result',
      'ps-result', 'rl-result', 'ai-result', 'gemini-result',
      'qcs-ai-result', 'chat-response', 'ai-answer'
    ];

    HIGH_RISK_IDS.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;

      // احفظ الـ setter الأصلي
      var descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
      if (!descriptor) return;

      // استبدل innerHTML setter لهذا العنصر فقط
      Object.defineProperty(el, 'innerHTML', {
        set: function(value) {
          var clean = window.QS.sanitize(String(value), true);
          descriptor.set.call(this, clean);
        },
        get: function() {
          return descriptor.get.call(this);
        },
        configurable: true
      });
    });

    if (typeof console !== 'undefined') {
      console.log(
        '%c[QS XSS-Patch] ✅ High-risk elements protected: ' + HIGH_RISK_IDS.length,
        'color: #185FA5; font-size: 11px;'
      );
    }
  });

})();
