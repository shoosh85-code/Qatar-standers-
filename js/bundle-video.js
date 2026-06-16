/* === js/video-uploader-bridge.js === */
/**
 * QatarSpec Pro — Video Uploader Bridge v2.0
 * الفيديوهات تشرح المحتوى الهندسي في كل قسم — ليس استخدام التطبيق
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  // وصف الفيديوهات لكل قسم — شرح المحتوى الهندسي
  var sectionVideoContext = {
    roads: {
      ar: 'فيديوهات شرح طبقات الطرق: Subgrade، Subbase، Base Course، Prime Coat، DBM، Wearing Course',
      en: 'Videos explaining road layers: Subgrade, Subbase, Base Course, Prime Coat, DBM, Wearing Course'
    },
    utilities: {
      ar: 'فيديوهات شرح شبكات المرافق: تركيب HDPE، اختبار الضغط، CCTV، المنهولات',
      en: 'Videos explaining utility networks: HDPE installation, pressure testing, CCTV, manholes'
    },
    structural: {
      ar: 'فيديوهات شرح الخرسانة المسلحة: الصب، المعالجة، اختبارات المكعبات، وصلات التسليح',
      en: 'Videos explaining reinforced concrete: pouring, curing, cube tests, rebar splices'
    },
    geotechnical: {
      ar: 'فيديوهات شرح الجسات: حفر الجسات، اختبار SPT، أخذ عينات التربة',
      en: 'Videos explaining geotechnical works: borehole drilling, SPT testing, soil sampling'
    },
    buildings: {
      ar: 'فيديوهات شرح المباني: الهيكل الإنشائي، المصاعد، الواجهات، الحماية من الحريق',
      en: 'Videos explaining buildings: structural system, elevators, facades, fire protection'
    },
    equipment: {
      ar: 'فيديوهات شرح المعدات: الجريدر، الرولر، فارش الإسفلت، مضخة الخرسانة',
      en: 'Videos explaining equipment: grader, roller, asphalt paver, concrete pump'
    },
    mep: {
      ar: 'فيديوهات شرح MEP: التوصيلات الكهربائية، السباكة، الإطفاء، الصرف',
      en: 'Videos explaining MEP: electrical wiring, plumbing, fire fighting, drainage'
    },
    calculators: {
      ar: 'فيديوهات شرح الحاسبات: ESAL، Marshall، Pass/Fail',
      en: 'Videos explaining calculators: ESAL, Marshall, Pass/Fail'
    }
  };

  var _counter = 0;

  window.QS.video = {

    // ═══ وصف الفيديوهات لكل قسم — المحتوى الهندسي وليس شرح التطبيق ═══
    sectionVideos: {
      'roads': {
        ar: 'فيديوهات شرح طبقات الطرق: Subgrade, Subbase, Base Course, Prime Coat, Tack Coat, DBM, Wearing Course',
        en: 'Videos explaining road layers: Subgrade, Subbase, Base Course, Prime Coat, Tack Coat, DBM, Wearing Course'
      },
      'utilities': {
        ar: 'فيديوهات شرح شبكات المرافق: تركيب HDPE, اختبار الضغط, CCTV, المنهولات',
        en: 'Videos explaining utility networks: HDPE installation, pressure testing, CCTV, manholes'
      },
      'structural': {
        ar: 'فيديوهات شرح الخرسانة المسلحة: الصب, المعالجة, اختبارات المكعبات, وصلات التسليح',
        en: 'Videos explaining reinforced concrete: pouring, curing, cube tests, rebar splices'
      },
      'geotechnical': {
        ar: 'فيديوهات شرح الجسات: حفر الجسات, اختبار SPT, عينات التربة',
        en: 'Videos explaining geotechnical works: borehole drilling, SPT testing, soil sampling'
      },
      'buildings': {
        ar: 'فيديوهات شرح المباني: الهيكل الإنشائي, المصاعد, الواجهات, الحماية من الحريق',
        en: 'Videos explaining buildings: structural system, elevators, facades, fire protection'
      },
      'equipment': {
        ar: 'فيديوهات شرح المعدات: الجريدر, الرولر, فارش الإسفلت, مضخة الخرسانة',
        en: 'Videos explaining equipment: grader, roller, asphalt paver, concrete pump'
      },
      'mep': {
        ar: 'فيديوهات شرح MEP: التوصيلات الكهربائية, السباكة, الإطفاء, الصرف',
        en: 'Videos explaining MEP: electrical wiring, plumbing, fire fighting, drainage'
      },
      'calculators': {
        ar: 'فيديوهات شرح الحاسبات: كيفية استخدام حاسبة ESAL, Marshall, Pass/Fail',
        en: 'Videos explaining calculators: how to use ESAL, Marshall, Pass/Fail calculators'
      }
    },
    /**
     * يفتح dialog لاختيار ملف فيديو أو لصق رابط YouTube
     * يُستدعى من onclick في .qs-video-upload-zone
     */
    openUploader: function(zoneEl, sectionId) {
      var lang = document.documentElement.lang || 'ar';
      var isAr = lang === 'ar';

      var ctx = sectionVideoContext[sectionId] || {};
      var contextDesc = ctx[lang] || (isAr ? 'فيديو يشرح المحتوى الهندسي لهذا القسم' : 'Video explaining the engineering content of this section');

      // إنشاء modal
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;';

      var modal = document.createElement('div');
      modal.style.cssText = 'background:var(--bg2,#1a1a2e);border:1px solid var(--gold,#c9a84c);border-radius:16px;padding:28px;max-width:420px;width:90%;text-align:center;direction:' + (isAr ? 'rtl' : 'ltr') + ';';

      var title = document.createElement('h3');
      title.style.cssText = 'color:var(--gold,#c9a84c);margin:0 0 16px;font-family:Tajawal,sans-serif;';
      title.textContent = isAr ? '🎬 إضافة فيديو هندسي توضيحي' : '🎬 Add Engineering Explanation Video';

      var ctxEl = document.createElement('div');
      ctxEl.style.cssText = 'font-size:12px;color:var(--text2,#aaa);margin-bottom:16px;padding:8px;background:rgba(201,168,76,0.08);border-radius:8px;font-family:Tajawal,sans-serif;';
      ctxEl.textContent = contextDesc;

      // زر اختيار ملف
      var fileBtn = document.createElement('button');
      fileBtn.style.cssText = 'display:block;width:100%;padding:14px;margin:8px 0;background:rgba(201,168,76,0.15);border:1px solid var(--gold,#c9a84c);border-radius:10px;color:var(--text1,#fff);font-size:15px;cursor:pointer;font-family:Tajawal,sans-serif;';
      fileBtn.textContent = isAr ? '📁 اختر ملف فيديو (MP4)' : '📁 Choose Video File (MP4)';

      // حقل YouTube
      var ytLabel = document.createElement('div');
      ytLabel.style.cssText = 'color:var(--text2,#aaa);margin:12px 0 6px;font-size:13px;font-family:Tajawal,sans-serif;';
      ytLabel.textContent = isAr ? 'أو الصق رابط YouTube:' : 'Or paste YouTube link:';

      var ytInput = document.createElement('input');
      ytInput.type = 'url';
      ytInput.placeholder = 'https://www.youtube.com/watch?v=...';
      ytInput.style.cssText = 'width:100%;padding:10px;border:1px solid rgba(201,168,76,0.3);border-radius:8px;background:rgba(0,0,0,0.3);color:var(--text1,#fff);font-size:14px;direction:ltr;box-sizing:border-box;';

      var ytBtn = document.createElement('button');
      ytBtn.style.cssText = 'display:block;width:100%;padding:12px;margin:10px 0 0;background:rgba(220,53,69,0.15);border:1px solid rgba(220,53,69,0.4);border-radius:10px;color:#ff6b6b;font-size:14px;cursor:pointer;font-family:Tajawal,sans-serif;';
      ytBtn.textContent = isAr ? '▶️ تضمين فيديو YouTube' : '▶️ Embed YouTube Video';

      // زر إلغاء
      var cancelBtn = document.createElement('button');
      cancelBtn.style.cssText = 'display:block;width:100%;padding:10px;margin:12px 0 0;background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:10px;color:var(--text3,#777);font-size:13px;cursor:pointer;font-family:Tajawal,sans-serif;';
      cancelBtn.textContent = isAr ? 'إلغاء' : 'Cancel';

      modal.appendChild(title);
      modal.appendChild(ctxEl);
      modal.appendChild(fileBtn);
      modal.appendChild(ytLabel);
      modal.appendChild(ytInput);
      modal.appendChild(ytBtn);
      modal.appendChild(cancelBtn);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      // إغلاق
      var closeModal = function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      };
      cancelBtn.onclick = closeModal;
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
      });

      // اختيار ملف محلي
      fileBtn.onclick = function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/mp4,video/webm,video/ogg';
        input.id = 'qs-vid-upload-' + (++_counter);
        input.style.display = 'none';
        document.body.appendChild(input);

        input.onchange = function() {
          var file = input.files[0];
          if (!file) return;

          var playerId = 'qs-vid-player-' + _counter;
          var phId = 'qs-vid-ph-' + _counter;

          // استبدال zone بـ player
          zoneEl.innerHTML = '';
          zoneEl.style.border = 'none';
          zoneEl.style.padding = '0';

          var playerDiv = document.createElement('div');
          playerDiv.id = playerId;
          playerDiv.setAttribute('data-maxh', '320px');
          zoneEl.appendChild(playerDiv);

          var phDiv = document.createElement('div');
          phDiv.id = phId;
          zoneEl.appendChild(phDiv);

          // استخدام النظام الموجود
          input.setAttribute('data-player', playerId);
          input.setAttribute('data-ph', phId);
          if (typeof window.loadLocalVideo === 'function') {
            window.loadLocalVideo(input, playerId, phId);
          }

          closeModal();
        };

        input.click();
      };

      // YouTube embed
      ytBtn.onclick = function() {
        var url = ytInput.value.trim();
        if (!url) return;

        var videoId = null;
        var match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        if (match) videoId = match[1];

        if (!videoId) {
          ytInput.style.borderColor = '#dc3545';
          ytInput.placeholder = isAr ? 'رابط غير صالح — جرب مرة أخرى' : 'Invalid link — try again';
          return;
        }

        zoneEl.innerHTML = '';
        zoneEl.style.border = 'none';
        zoneEl.style.padding = '0';

        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId;
        iframe.style.cssText = 'width:100%;aspect-ratio:16/9;border:none;border-radius:12px;max-height:320px;';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.loading = 'lazy';
        zoneEl.appendChild(iframe);

        closeModal();
      };
    },

    /**
     * إنشاء واجهة رفع الفيديو لقسم معيّن مع وصف هندسي
     * @param {string} sectionId — مفتاح القسم (roads, utilities, etc.)
     * @param {string} containerSelector — CSS selector للحاوية
     */
    createUploadUI: function(sectionId, containerSelector) {
      var container = document.querySelector(containerSelector);
      if (!container) return;

      var lang = document.documentElement.lang || 'ar';
      var isAr = lang === 'ar';
      var context = this.sectionVideos[sectionId];
      var description = context ? context[lang] : (isAr ? 'فيديوهات توضيحية للمحتوى الهندسي' : 'Engineering explanation videos');

      var section = document.createElement('div');
      section.className = 'qs-video-section';
      section.style.cssText = 'margin:20px 0;padding:16px;background:var(--dark3);border:1px solid var(--border);border-radius:16px;';

      var header = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">' +
        '<span style="font-size:24px">🎥</span>' +
        '<div>' +
        '<div style="font-family:Cairo;font-weight:700;color:var(--gold);">' + (isAr ? 'فيديوهات توضيحية' : 'Explanation Videos') + '</div>' +
        '<div style="font-size:12px;color:var(--text3);margin-top:4px;">' + description + '</div>' +
        '</div></div>';

      var zone = '<div class="qs-video-upload-zone" style="border:2px dashed var(--border2,rgba(201,168,76,0.3));border-radius:12px;padding:20px;text-align:center;cursor:pointer;" ' +
        'onclick="QS.video.openUploader(this,\'' + sectionId + '\')">' +
        '<div style="font-size:28px;margin-bottom:8px;">📤</div>' +
        '<div style="font-family:Tajawal;font-weight:600;color:var(--text1);margin-bottom:4px;">' + (isAr ? 'رفع فيديو توضيحي للمحتوى الهندسي' : 'Upload engineering explanation video') + '</div>' +
        '<div style="font-size:11px;color:var(--text3);">MP4, WebM, YouTube — max 50MB</div>' +
        '</div>';

      section.innerHTML = header + zone;
      container.appendChild(section);
    }
  };

  console.log('[QS-Video-Uploader] Bridge initialized');

  // ─── Auto-inject upload zone into detail content ───────────────
  // بعد openDetail يعرض المحتوى، إذا ما فيه فيديو، أضف زر إضافة
  var _dmContent = null;
  var _injectObserver = new MutationObserver(function() {
    if (!_dmContent) _dmContent = document.getElementById('dmContent');
    if (!_dmContent) return;

    // لا تضف إذا فيه zone أو video أو iframe(youtube)
    if (_dmContent.querySelector('.qs-video-upload-zone')) return;
    if (_dmContent.querySelector('video')) return;
    if (_dmContent.querySelector('iframe[src*="youtube"]')) return;

    // تأخير بسيط للتأكد إن المحتوى اكتمل
    setTimeout(function() {
      if (!_dmContent.querySelector('.qs-video-upload-zone') &&
          !_dmContent.querySelector('video') &&
          !_dmContent.querySelector('iframe[src*="youtube"]')) {
        var lang = document.documentElement.lang || 'ar';
        var isAr = lang === 'ar';
        // استخراج معرّف القسم من data-section أو class
        var sectionId = (_dmContent.getAttribute('data-section') ||
          (_dmContent.closest('[data-section]') || {}).getAttribute('data-section') || 'general');
        var zone = document.createElement('div');
        zone.className = 'qs-video-upload-zone';
        zone.setAttribute('data-section', sectionId);
        zone.onclick = (function(s){ return function() { window.QS.video.openUploader(zone, s); }; })(sectionId);
        zone.style.cssText = 'border:2px dashed rgba(201,168,76,0.3);border-radius:12px;padding:40px;text-align:center;cursor:pointer;margin:20px 0;';
        zone.innerHTML = '<div style="font-size:40px;">🎬</div>' +
          '<p style="color:var(--text2);font-family:Tajawal,sans-serif;">' + (isAr ? 'أضف فيديو هندسي توضيحي' : 'Add engineering explanation video') + '</p>' +
          '<p style="color:var(--text3);font-size:12px;">MP4, YouTube link</p>';
        _dmContent.appendChild(zone);
      }
    }, 500);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('detailModal');
    if (modal) {
      _injectObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
  });
})();

/* === js/video-youtube-config.js === */
/**
 * QatarSpec Pro — YouTube Video Config v1.0
 * خريطة ربط كل فيديو بـ YouTube ID
 * 
 * الاستخدام: أضف YouTube video ID لكل فيديو
 * مثال: 'vid-sg-ar': 'dQw4w9WgXcQ'
 * 
 * إذا القيمة فارغة '' = يظهر "قريباً"
 * إذا القيمة موجودة = يظهر YouTube embed تلقائياً
 */
window.QS_YOUTUBE_MAP = {

  // ═══ أعمال الطرق — Road Works ═══
  'vid-sg-ar':           '',  // شرح Subgrade — عربي
  'vid-sg-en':           '',  // Subgrade Explanation — English
  'vid-base-new':        '',  // شرح Base Course — عربي
  'vid-base':            '',  // شرح Base Course (قديم) — عربي
  'vid-wc-new':          '',  // شرح Wearing Course — عربي
  'vid-prime-new':       '',  // شرح Prime Coat — عربي
  'vid-handover-new':    '',  // شرح التسليم — عربي
  'vid-execution':       '',  // شرح التنفيذ العام — عربي
  'vid-execution-en':    '',  // General Execution — English

  // ═══ الجيوتقني — Geotechnical ═══
  'vid-geotech':         '',  // شرح الجسات — عربي
  'vid-geotech-en':      '',  // Geotechnical — English

  // ═══ شبكة المياه — Water Supply ═══
  'vid-ws-laying':       '',  // تركيب مواسير المياه
  'vid-ws-excavation':   '',  // حفر خطوط المياه
  'vid-ws-backfill':     '',  // ردم خطوط المياه — عربي
  'vid-ws-backfill-en':  '',  // Water Backfill — English
  'vid-ws-disinfection': '',  // تعقيم الشبكة
  'vid-ws-handover':     '',  // تسليم شبكة المياه — عربي
  'vid-ws-handover-en':  '',  // Water Handover — English
  'vid-water-supply-stages':    '',  // مراحل شبكة المياه — عربي
  'vid-water-supply-stages-en': '',  // Water Supply Stages — English

  // ═══ شبكة الصرف الصحي — Sewer Network ═══
  'vid-ss-laying':       '',  // تركيب مواسير الصرف
  'vid-ss-excavation':   '',  // حفر خطوط الصرف
  'vid-ss-backfill':     '',  // ردم خطوط الصرف
  'vid-ss-materials':    '',  // مواد الصرف الصحي
  'vid-ss-testing':      '',  // اختبارات الصرف — عربي
  'vid-ss-testing-en':   '',  // Sewer Testing — English
  'vid-sewer-stages':    '',  // مراحل الصرف — عربي
  'vid-sewer-stages-en': '',  // Sewer Stages — English

  // ═══ شبكة الأمطار — Stormwater ═══
  'vid-sw-laying':       '',  // تركيب الأمطار — عربي
  'vid-sw-laying-en':    '',  // Stormwater Laying — English
  'vid-sw-gullies':      '',  // بالوعات الأمطار — عربي
  'vid-sw-gullies-en':   '',  // Stormwater Gullies — English
  'vid-sw-materials':    '',  // مواد الأمطار
  'vid-sw-handover':     '',  // تسليم شبكة الأمطار
  'vid-storm-stages':    '',  // مراحل الأمطار — عربي
  'vid-storm-stages-en': '',  // Storm Stages — English

  // ═══ المياه المعالجة — Treated Water ═══
  'vid-tw-materials':    '',  // مواد المياه المعالجة
};

/* === js/core/video-youtube.js === */
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
