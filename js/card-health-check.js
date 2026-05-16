/**
 * QatarSpec Pro — Card Health Monitor & Auto-Fix v1.0
 * يفحص كل الكروت ويصلح المعطلة تلقائياً
 * لا يحذف شيء — فقط يضيف أو يعدّل
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  window.QS.cardHealth = {
    broken: [],
    fixed: [],

    // فحص كل الكروت
    scan: function() {
      this.broken = [];
      this.fixed = [];
      var cards = document.querySelectorAll('.cat-card:not([data-deprecated="true"])');
      var self = this;

      cards.forEach(function(card) {
        var param = card.getAttribute('data-param');
        var type = card.getAttribute('data-type');
        var action = card.getAttribute('data-action');

        var issues = [];

        // فحص 1: هل عنده param؟
        if (!param) issues.push('missing data-param');

        // فحص 2: هل عنده action؟
        if (!action) issues.push('missing data-action');

        // فحص 3: هل المحتوى موجود؟
        if (action === 'openDetail' && param) {
          var hasContent = false;
          if (window.QS_CONTENT && window.QS_CONTENT[param]) hasContent = true;
          if (window.QS_CONTENT_EXTRA && window.QS_CONTENT_EXTRA[param]) hasContent = true;
          if (window.QS_CONTENT_PHASE4 && window.QS_CONTENT_PHASE4[param]) hasContent = true;
          if (window.QS_CONTENT_ROADS && window.QS_CONTENT_ROADS[param]) hasContent = true;
          if (window.QS_CONTENT_STRUCTURAL && window.QS_CONTENT_STRUCTURAL[param]) hasContent = true;
          if (window.QS_CONTENT_UTILITIES && window.QS_CONTENT_UTILITIES[param]) hasContent = true;
          if (window.QS_CONTENT_GEOTECH && window.QS_CONTENT_GEOTECH[param]) hasContent = true;
          if (window.QS_CONTENT_TOOLS && window.QS_CONTENT_TOOLS[param]) hasContent = true;

          if (!hasContent && type === 'static') {
            issues.push('no content for param: ' + param);
          }
        }

        if (issues.length > 0) {
          self.broken.push({ element: card, param: param, issues: issues });
        }
      });

      console.log('[QS-Health] Scanned ' + cards.length + ' cards — ' + this.broken.length + ' broken');
      return this.broken;
    },

    // إصلاح تلقائي
    autoFix: function() {
      this.scan();
      var self = this;

      this.broken.forEach(function(item) {
        var card = item.element;

        // إصلاح: إذا ما عنده action، أضف openDetail
        if (!card.getAttribute('data-action') && card.getAttribute('data-param')) {
          card.setAttribute('data-action', 'openDetail');
          self.fixed.push(item.param + ': added data-action');
        }

        // إصلاح: إذا المحتوى مفقود، أضف badge "قريباً"
        item.issues.forEach(function(issue) {
          if (issue.indexOf('no content for param') === 0) {
            var badge = card.querySelector('.cat-badge');
            if (badge && badge.textContent.indexOf('قريباً') === -1 && badge.textContent.indexOf('Soon') === -1) {
              var lang = document.documentElement.lang || 'ar';
              badge.textContent = lang === 'ar' ? '🔜 قريباً' : '🔜 Soon';
              badge.style.background = 'rgba(133,79,11,0.15)';
              badge.style.color = '#B8860B';
            }
            self.fixed.push(item.param + ': marked as coming soon');
          }
        });
      });

      console.log('[QS-Health] Auto-fixed ' + this.fixed.length + ' issues');
      return this.fixed;
    },

    // تقرير للـ Console
    report: function() {
      this.scan();
      var total = document.querySelectorAll('.cat-card').length;
      var deprecated = document.querySelectorAll('.cat-card[data-deprecated="true"]').length;
      console.log('%c[QS Card Health Report]', 'color:#7A1515;font-weight:bold;font-size:14px');
      console.log('Total cards:', total);
      console.log('Active cards:', total - deprecated);
      console.log('Deprecated:', deprecated);
      console.log('Broken:', this.broken.length);
      if (this.broken.length > 0) {
        this.broken.forEach(function(b) {
          console.log('  ❌', b.param || 'unknown', '—', b.issues.join(', '));
        });
      } else {
        console.log('  ✅ All cards healthy');
      }
    }
  };

  // تشغيل تلقائي بعد 3 ثوان من تحميل الصفحة
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      window.QS.cardHealth.autoFix();
    }, 3000);
  });

  console.log('[QS-CardHealth] System initialized');
})();
