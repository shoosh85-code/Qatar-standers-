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
