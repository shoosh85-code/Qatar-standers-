/**
 * QatarSpec Pro — Red Rectangle Nuclear Killer v2.0
 * يراقب DOM بالكامل ويقتل أي عنصر مشبوه لحظة ظهوره
 */
(function() {
  'use strict';

  var KILL_LOG = [];

  function isReddish(bg) {
    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return false;
    var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return false;
    var r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]);
    // أي لون أحمر: R عالي، G و B منخفضين نسبياً
    return (r > 150 && g < 100 && b < 100);
  }

  function isYellowish(bg) {
    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return false;
    var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return false;
    var r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]);
    return (r > 150 && g > 80 && g < 200 && b < 80);
  }

  // عناصر مسموح بها — لا تحذفها
  var SAFE_IDS = ['offlineBar','update-banner','toast','qs-toast-v2','proModal','upgradeOverlay'];
  var SAFE_CLASSES = ['cat-badge','hero','nav','dm-table','search-dot','swal2'];

  function isSafe(el) {
    if (!el || !el.getAttribute) return true;
    var id = el.id || '';
    var cls = (typeof el.className === 'string') ? el.className : '';
    for (var i = 0; i < SAFE_IDS.length; i++) { if (id === SAFE_IDS[i]) return true; }
    for (var j = 0; j < SAFE_CLASSES.length; j++) { if (cls.indexOf(SAFE_CLASSES[j]) > -1) return true; }
    // لا تحذف عناصر داخل dmContent (محتوى البطاقات)
    if (el.closest && el.closest('#dmContent')) return true;
    // لا تحذف عناصر صغيرة جداً (badges etc)
    var rect = el.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 20) return true;
    return false;
  }

  function killSuspicious(el) {
    if (!el || !el.getBoundingClientRect) return;
    try {
      var style = window.getComputedStyle(el);
      var pos = style.position;
      if (pos !== 'fixed' && pos !== 'absolute') return;

      var bg = style.backgroundColor;
      if (!isReddish(bg) && !isYellowish(bg)) return;

      if (isSafe(el)) return;

      var rect = el.getBoundingClientRect();
      // فقط العناصر على يمين الشاشة (>50% من العرض)
      if (rect.left < window.innerWidth * 0.5) return;
      // فقط العناصر المرئية
      if (rect.width <= 0 || rect.height <= 0) return;

      var info = {
        tag: el.tagName,
        id: el.id,
        class: (typeof el.className === 'string') ? el.className.substring(0, 80) : '',
        text: (el.textContent || '').substring(0, 100),
        bg: bg,
        pos: Math.round(rect.left) + ',' + Math.round(rect.top),
        size: Math.round(rect.width) + 'x' + Math.round(rect.height)
      };
      KILL_LOG.push(info);
      console.warn('[QS-KILLER] 🔪 حذف:', JSON.stringify(info));

      // اقتل!
      el.setAttribute('style', (el.getAttribute('style')||'') + 
        ';display:none!important;visibility:hidden!important;opacity:0!important;' +
        'width:0!important;height:0!important;overflow:hidden!important;pointer-events:none!important;');
      // حاول الحذف من DOM
      try { el.remove(); } catch(e) {}
    } catch(e) {}
  }

  // ═══ Scan كل العناصر ═══
  function fullScan() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      killSuspicious(all[i]);
    }
    // أيضاً: امسح أي notyf بقايا
    document.querySelectorAll('.notyf, [class*="notyf"]').forEach(function(el) { 
      try { el.remove(); } catch(e) {} 
    });
  }

  // ═══ MutationObserver — يراقب كل عنصر جديد ═══
  var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      if (!added) continue;
      for (var j = 0; j < added.length; j++) {
        var node = added[j];
        if (node.nodeType !== 1) continue; // فقط عناصر HTML
        // تحقق من العنصر نفسه
        killSuspicious(node);
        // تحقق من أطفاله
        if (node.querySelectorAll) {
          var children = node.querySelectorAll('*');
          for (var k = 0; k < children.length; k++) {
            killSuspicious(children[k]);
          }
        }
      }
    }
  });

  // ═══ تشغيل ═══
  function start() {
    observer.observe(document.body, { childList: true, subtree: true });
    fullScan();
    // scans متكررة كل 2 ثانية
    setInterval(fullScan, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // ═══ API ═══
  window.QS = window.QS || {};
  window.QS.killRedRects = fullScan;
  window.QS.killLog = function() { return KILL_LOG; };

  console.log('[QS-KILLER v2] 🔪 MutationObserver مُفعَّل — يقتل أي مستطيل أحمر/أصفر لحظة ظهوره');
})();
