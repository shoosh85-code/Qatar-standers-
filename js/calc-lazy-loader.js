// js/calc-lazy-loader.js — QatarSpec Pro
// نُقل من inline script في index.html لإزالة unsafe-inline من CSP
// Lazy-loads calculator scripts when #group-calc becomes visible via IntersectionObserver
// v2: أُضيف loadCategoryData — تحميل كسول لملفات البيانات الضخمة حسب القسم فقط

(function() {
  var _calcLoaded = false;
  var _calcSrcs = [
    'js/calculators/roads.js?v=600',
    'js/calculators/structural.js?v=600',
    'js/calculators/utilities.js?v=600',
    'js/calculators/geotech.js?v=600',
    'js/calculators/general.js?v=600'
  ];

  function loadCalcScripts() {
    if (_calcLoaded) return;
    _calcLoaded = true;
    _calcSrcs.forEach(function(src) {
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      document.head.appendChild(s);
    });
  }

  // IntersectionObserver: يُحمِّل عند رؤية #group-calc
  if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function() {
      var target = document.getElementById('group-calc');
      if (!target) { loadCalcScripts(); return; }
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          loadCalcScripts();
          obs.disconnect();
        }
      }, { rootMargin: '200px' }); // preload 200px قبل الوصول
      obs.observe(target);
    });
  } else {
    // Fallback للمتصفحات القديمة
    window.addEventListener('load', loadCalcScripts);
  }
})();

/* ═══════════════════════════════════════════════════════════════════
   LAZY DATA LOADER — يحمّل بيانات القسم فقط عند الطلب
   يُوفّر >1.5MB من التحميل المبكر غير الضروري
   ═══════════════════════════════════════════════════════════════════ */

(function() {
  // سجل الملفات المحمّلة — يمنع التحميل المزدوج
  const _loaded = new Set();

  // تحميل script واحد بوعد (Promise)
  function loadScript(src) {
    if (_loaded.has(src)) return Promise.resolve();
    return new Promise(function(resolve, reject) {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload  = function() { _loaded.add(src); resolve(); };
      s.onerror = function() { reject(new Error('Failed to load: ' + src)); };
      document.head.appendChild(s);
    });
  }

  // خريطة الفئات: category → ملفات البيانات المطلوبة
  const CATEGORY_DATA = {
    'roads': [
      'data/roads-data.js',
      'data/detail-roads.js',
      'data_content_roads.js'
    ],
    'utilities': [
      'data/utilities-data.js',
      'data/detail-utilities-ss.js',
      'data/detail-utilities-sw-tw.js',
      'data/detail-utilities-ws.js',
      'data/detail-utilities-shared.js',
      'data_content_utilities.js'
    ],
    'structural': [
      'data/structural-data.js',
      'data/detail-structural.js',
      'data_content_structural.js'
    ],
    'geotech': [
      'data/detail-geotech.js',
      'data_content_geotech.js'
    ],
    'tools': [
      'data/tools-data.js',
      'data_content_tools.js'
    ]
  };

  // تحميل جميع ملفات فئة محددة — يُستدعى عند اختيار المستخدم للقسم
  window.loadCategoryData = async function(category) {
    const files = CATEGORY_DATA[category];
    // إذا الفئة غير معروفة — لا شيء يحدث (graceful fallback)
    if (!files) return;
    try {
      await Promise.all(files.map(function(f) {
        return loadScript(f + '?v=3');
      }));
    } catch (e) {
      console.error('[lazy-loader] فشل تحميل بيانات:', category, e.message);
    }
  };

  // تحميل أدوات البيانات الأساسية فقط عند البداية (< 100KB)
  // باقي الفئات: تُحمَّل عند الطلب فقط
  window.loadCategoryData('tools');

})();

/* ═══════════════════════════════════════════════════════════════════
   MANIFEST RACE-CONDITION FIX — v3
   المشكلة: requestIdleCallback(loadManifest, {timeout:800})
            إذا ضغط المستخدم openDetail قبل 800ms → map={} → حلقة صامتة
   الحل:    نحمّل manifest فوراً عند DOMContentLoaded (هو في cache بالفعل)
            + نحفظ الضغطات المبكرة في queue ونُفرّغها بعد الجهوزية
   ═══════════════════════════════════════════════════════════════════ */

(function() {
  const MANIFEST_SRC = 'data_content_manifest.js?v=7';
  // queue للضغطات التي حدثت قبل جهوزية الـ manifest
  const _earlyQueue = [];
  let _manifestReady = false;

  // تحميل manifest فوري (لا ينتظر idle) — الملف 8KB ومخزّن في cache
  function forceLoadManifest() {
    if (window.QS_CONTENT_MAP) { _manifestReady = true; _flushQueue(); return; }
    const s = document.createElement('script');
    s.src = MANIFEST_SRC;
    s.async = true;
    s.onload = function() {
      _manifestReady = true;
      _flushQueue();
    };
    document.head.appendChild(s);
  }

  // تفريغ الضغطات المؤجّلة بعد جهوزية المانيفست
  function _flushQueue() {
    while (_earlyQueue.length) {
      const key = _earlyQueue.shift();
      // نستدعي openDetail بعد تأكد جهوزية _loadContentChunk
      if (typeof window.openDetail === 'function') {
        window.openDetail(key);
      } else if (typeof window.QS === 'object' && typeof window.QS.openDetail === 'function') {
        window.QS.openDetail(key);
      }
    }
  }

  // تغليف QS.openDetail لحفظ الضغطات المبكرة
  function _wrapOpenDetail() {
    const _qs = window.QS;
    if (!_qs) return;

    const _orig = _qs.openDetail;
    _qs.openDetail = function(key) {
      // إذا المانيفست جاهز أو المحتوى محمّل → شغّل مباشرةً
      if (_manifestReady || (window.QS_CONTENT && window.QS_CONTENT[key])) {
        return _orig.call(_qs, key);
      }
      // المانيفست لم يُحمَّل بعد → أضف للـ queue
      _earlyQueue.push(key);
      // أظهر loading hint للمستخدم
      const modal = document.getElementById('detailModal');
      const title = document.getElementById('dmTitle');
      const content = document.getElementById('dmContent');
      if (modal && title && content) {
        title.textContent = '...';
        content.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text3,#888);font-size:14px;">⏳ جاري التحميل...</div>';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };
  }

  // تشغيل بعد DOMContentLoaded مباشرةً
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      forceLoadManifest();
      // انتظر حتى تُسجَّل QS وopenDetail من inline-scripts.js
      setTimeout(_wrapOpenDetail, 100);
    });
  } else {
    // الصفحة محمّلة بالفعل
    forceLoadManifest();
    setTimeout(_wrapOpenDetail, 100);
  }

})();
