/**
 * QatarSpec Pro — Red Rectangle Killer v1.0
 * يكتشف ويزيل أي عناصر حمراء عالقة على اليمين
 * ويعرض تقرير في console عن طبيعتها
 */
(function() {
  'use strict';

  // ═══ Diagnostic: اكتشف كل العناصر الحمراء الثابتة ═══
  function killRedRects() {
    var killed = 0;
    var report = [];

    // 1. امسح كل عناصر Notyf العالقة
    document.querySelectorAll('.notyf, .notyf__toast, .notyf-announcer').forEach(function(el) {
      report.push('[Notyf] ' + el.className + ' | ' + (el.textContent || '').substring(0, 50));
      el.remove();
      killed++;
    });

    // 2. ابحث عن أي عنصر position:fixed مع خلفية حمراء
    var allEls = document.querySelectorAll('*');
    for (var i = 0; i < allEls.length; i++) {
      var el = allEls[i];
      var style = window.getComputedStyle(el);
      if (style.position === 'fixed' || style.position === 'absolute') {
        var bg = style.backgroundColor;
        // تحقق من الألوان الحمراء
        if (bg && (
          bg.indexOf('rgb(220') > -1 ||  // #dc3545
          bg.indexOf('rgb(231') > -1 ||  // #e74c3c
          bg.indexOf('rgb(163') > -1 ||  // #A32D2D
          bg.indexOf('rgb(192') > -1 ||  // #c0392b
          bg.indexOf('rgb(255, 0') > -1 || // red
          bg.indexOf('rgb(255, 107') > -1 || // #ff6b7a
          bg.indexOf('rgb(122, 21') > -1    // #7A1515
        )) {
          // لا تحذف العناصر المعروفة (offlineBar, hero, nav)
          var id = el.id || '';
          var cls = el.className || '';
          if (id === 'offlineBar' || id === 'update-banner') continue;
          if (typeof cls === 'string' && (cls.indexOf('cat-badge') > -1 || cls.indexOf('hero') > -1 || cls.indexOf('nav') > -1)) continue;

          // هل العنصر مرئي ويمين الشاشة؟
          var rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.right > window.innerWidth * 0.6) {
            report.push('[RED-FIXED] id=' + id + ' class=' + cls +
              ' tag=' + el.tagName + ' bg=' + bg +
              ' pos=' + Math.round(rect.left) + ',' + Math.round(rect.top) +
              ' size=' + Math.round(rect.width) + 'x' + Math.round(rect.height) +
              ' text=' + (el.textContent || '').substring(0, 80));
            el.style.display = 'none';
            killed++;
          }
        }
      }
    }

    // 3. Notyf container — أعد إنشاءه نظيف
    var notyfContainer = document.querySelector('.notyf');
    if (notyfContainer) {
      notyfContainer.innerHTML = '';
    }

    if (killed > 0 || report.length > 0) {
      console.warn('[QS-RedRectKiller] حذف ' + killed + ' عنصر:');
      report.forEach(function(r) { console.warn('  → ' + r); });
    }

    return { killed: killed, report: report };
  }

  // ═══ تشغيل عند كل فتح بطاقة ═══
  // مراقبة detailModal
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        var modal = document.getElementById('detailModal');
        if (modal && modal.classList.contains('open')) {
          // انتظر 200ms بعد فتح البطاقة ثم نظّف
          setTimeout(killRedRects, 200);
          setTimeout(killRedRects, 1000);
          setTimeout(killRedRects, 3000);
        }
      }
    });
  });

  function startObserver() {
    var modal = document.getElementById('detailModal');
    if (modal) {
      observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
  }

  // ═══ تشغيل دوري كل 5 ثوان ═══
  setInterval(killRedRects, 5000);

  // ═══ تشغيل فوري ═══
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      killRedRects();
      startObserver();
    });
  } else {
    killRedRects();
    startObserver();
  }

  // ═══ API للتشغيل اليدوي ═══
  window.QS = window.QS || {};
  window.QS.killRedRects = killRedRects;

  console.log('[QS-RedRectKiller] مُفعَّل — يراقب ويحذف المستطيلات الحمراء');
})();
