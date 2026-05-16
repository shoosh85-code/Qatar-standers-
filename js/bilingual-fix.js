/**
 * QatarSpec Pro — Bilingual Content Enforcement v1.0
 * يفحص كل الكروت ويصلح التضارب اللغوي تلقائياً
 * يعمل على data-ar / data-en attributes في الكروت
 * لا يتعارض مع bilingual-radical-fix.js (الذي يعالج lang-content-ar/en)
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  window.QS.bilingual = {
    // فحص وإصلاح كل الكروت
    enforce: function() {
      var lang = document.documentElement.lang || 'ar';
      var cards = document.querySelectorAll('.cat-card');

      cards.forEach(function(card) {
        // الاسم: يتبع اللغة الحالية
        var nameEl = card.querySelector('.cat-name');
        if (nameEl) {
          var arName = nameEl.getAttribute('data-ar');
          var enName = nameEl.getAttribute('data-en');
          if (lang === 'ar' && arName) nameEl.textContent = arName;
          if (lang === 'en' && enName) nameEl.textContent = enName;
        }

        // البادج: يتبع اللغة الحالية
        var badgeEl = card.querySelector('.cat-badge');
        if (badgeEl) {
          var arBadge = badgeEl.getAttribute('data-ar');
          var enBadge = badgeEl.getAttribute('data-en');
          if (lang === 'ar' && arBadge) badgeEl.textContent = arBadge;
          if (lang === 'en' && enBadge) badgeEl.textContent = enBadge;
        }

        // البوليتات: يتبع اللغة الحالية
        var bullets = card.querySelectorAll('.card-bullets span, .cat-desc span');
        bullets.forEach(function(span) {
          var arText = span.getAttribute('data-ar');
          var enText = span.getAttribute('data-en');
          if (lang === 'ar' && arText) span.innerHTML = arText;
          if (lang === 'en' && enText) span.innerHTML = enText;
        });

        // الـ count / reference في الأسفل
        var countEl = card.querySelector('.cat-count');
        if (countEl) {
          var arCount = countEl.getAttribute('data-ar');
          var enCount = countEl.getAttribute('data-en');
          if (lang === 'ar' && arCount) countEl.textContent = arCount;
          if (lang === 'en' && enCount) countEl.textContent = enCount;
        }
      });

      console.log('[QS-Bilingual] Enforced ' + lang + ' on ' + cards.length + ' cards');
    },

    // يُستدعى عند تبديل اللغة
    onLanguageChange: function(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.enforce();
    }
  };

  // تشغيل تلقائي عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', function() {
    window.QS.bilingual.enforce();
  });

  // مراقبة تغيير اللغة على html element
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'lang') {
        window.QS.bilingual.enforce();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  console.log('[QS-Bilingual] System initialized');
})();
