/**
 * QatarSpec Pro — YouTube Video System v1.0
 * js/core/video-youtube.js
 *
 * يستبدل placeholders الفيديو المحلي بـ YouTube embeds تلقائياً
 * بناءً على window.QS_YOUTUBE_MAP
 *
 * القواعد:
 * - إذا YouTube ID موجود → يعرض embed مباشرة (الكل يشوفه)
 * - إذا فارغ → يعرض "قريباً" بدل "ارفع فيديو"
 * - ?admin=1 في الرابط → يبقي زر الرفع المحلي للمطور
 *
 * لا يعدّل أي ملف محتوى — يعمل بعد DOM load
 */
(function() {
  'use strict';

  // هل المطور؟
  var isAdmin = window.location.search.indexOf('admin=1') !== -1;

  // انتظر حتى DOM + المحتوى يكون جاهز
  // نستخدم MutationObserver لأن المحتوى يُحقن ديناميكياً
  var _processed = new Set();

  function getYouTubeMap() {
    return window.QS_YOUTUBE_MAP || {};
  }

  /**
   * يبني YouTube iframe embed
   */
  function createYouTubeEmbed(ytId, maxH) {
    maxH = maxH || '250px';
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;width:100%;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;background:#000;';
    // نحسب maxH كحد أقصى
    wrapper.style.maxHeight = maxH;

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytId + '?rel=0&modestbranding=1';
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:8px;';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.title = 'QatarSpec Pro Video';

    wrapper.appendChild(iframe);
    return wrapper;
  }

  /**
   * يعرض "قريباً" placeholder
   */
  function createComingSoon(title) {
    var div = document.createElement('div');
    div.style.cssText = 'padding:20px;text-align:center;color:var(--text3,#888);font-size:13px;background:rgba(0,0,0,0.15);border-radius:8px;margin:4px 0;';
    div.innerHTML = '<div style="font-size:28px;margin-bottom:6px;">🎬</div>' +
      '<div style="color:var(--gold,#C8922A);font-weight:700;margin-bottom:4px;">الفيديو قريباً</div>' +
      '<div style="font-size:11px;color:var(--text3,#777);">Video Coming Soon</div>';
    return div;
  }

  /**
   * يعالج video input واحد
   */
  function processVideoInput(input) {
    var inputId = input.id;
    if (!inputId || _processed.has(inputId)) return;

    var ytMap = getYouTubeMap();
    // إذا هذا الـ input مش في الخريطة أصلاً، لا تلمسه
    if (!(inputId in ytMap)) return;

    var ytId = ytMap[inputId];
    var playerId = input.getAttribute('data-player');
    var phId = input.getAttribute('data-ph');

    // إذا admin mode، لا تستبدل (خلّي الرفع المحلي)
    if (isAdmin) return;

    _processed.add(inputId);

    var playerEl = playerId ? document.getElementById(playerId) : null;
    var phEl = phId ? document.getElementById(phId) : null;

    // أخفِ الـ input وزر الرفع
    input.style.display = 'none';

    // ابحث عن زر "رفع فيديو" في الحاوية الأم
    var container = input.parentElement;
    if (container) {
      var uploadBtn = container.querySelector('button[onclick*="click"]');
      if (uploadBtn) uploadBtn.style.display = 'none';
    }

    if (ytId && ytId.length > 5) {
      // ── YouTube ID موجود → embed ──
      var maxH = playerEl && playerEl.dataset ? (playerEl.dataset.maxh || '250px') : '250px';
      var embed = createYouTubeEmbed(ytId, maxH);

      if (playerEl) {
        playerEl.innerHTML = '';
        playerEl.appendChild(embed);
        playerEl.style.display = 'block';
      } else if (phEl) {
        phEl.innerHTML = '';
        phEl.appendChild(embed);
      }
      if (phEl && playerEl) phEl.style.display = 'none';

    } else {
      // ── فارغ → "قريباً" ──
      var comingSoon = createComingSoon();
      if (phEl) {
        phEl.innerHTML = '';
        phEl.appendChild(comingSoon);
      }
      if (playerEl) playerEl.style.display = 'none';
    }
  }

  /**
   * يفحص كل video inputs الموجودة حالياً في DOM
   */
  function scanAndReplace() {
    var inputs = document.querySelectorAll('input[type="file"][accept*="video"]');
    inputs.forEach(processVideoInput);
  }

  // ── أول فحص بعد DOM load ──
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(scanAndReplace, 500);
  });

  // ── MutationObserver: يراقب إضافة محتوى ديناميكي (openDetail) ──
  var observer = new MutationObserver(function(mutations) {
    var hasNewVideo = false;
    mutations.forEach(function(m) {
      if (m.addedNodes.length > 0) {
        m.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            if (node.querySelector && node.querySelector('input[accept*="video"]')) {
              hasNewVideo = true;
            }
          }
        });
      }
    });
    if (hasNewVideo) {
      // أعد الفحص بعد تأخير بسيط ليكتمل DOM injection
      setTimeout(scanAndReplace, 200);
    }
  });

  // راقب التغييرات في body
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // ── Hook في openDetail: بعد فتح أي card، أعد فحص الفيديوهات ──
  var _origOpenDetail = window.openDetail;
  window.openDetail = function() {
    // نفّذ الأصلي أولاً
    if (typeof _origOpenDetail === 'function') {
      _origOpenDetail.apply(this, arguments);
    }
    // ثم امسح processed cache وأعد الفحص (لأن DOM تغيّر)
    _processed.clear();
    setTimeout(scanAndReplace, 300);
  };

  // ── نفس الشيء مع goBack ──
  var _origGoBack = window.goBack;
  window.goBack = function() {
    if (typeof _origGoBack === 'function') {
      _origGoBack.apply(this, arguments);
    }
    _processed.clear();
    setTimeout(scanAndReplace, 300);
  };

  // ── تصدير للاختبار ──
  window.QS_YT = {
    scan: scanAndReplace,
    reset: function() { _processed.clear(); scanAndReplace(); }
  };

})();
