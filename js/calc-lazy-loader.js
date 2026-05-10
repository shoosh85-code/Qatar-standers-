// js/calc-lazy-loader.js — QatarSpec Pro v4
// نُقل من inline script في index.html لإزالة unsafe-inline من CSP
// ═══════════════════════════════════════════════════════════════════
// BLOCK 1: Lazy-load calculator scripts عند رؤية #group-calc
// BLOCK 2: loadCategoryData — تحميل chunk الفئة كاملاً عند الطلب
// BLOCK 3: Manifest race-condition fix + prefetch on openDetail
// ═══════════════════════════════════════════════════════════════════

/* ─── BLOCK 1: Calculator Scripts (IntersectionObserver) ─── */
(function () {
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
    _calcSrcs.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      document.head.appendChild(s);
    });
  }

  // IntersectionObserver: يُحمِّل عند رؤية #group-calc
  if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function () {
      var target = document.getElementById('group-calc');
      if (!target) { loadCalcScripts(); return; }
      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { loadCalcScripts(); obs.disconnect(); }
      }, { rootMargin: '200px' }); // preload 200px قبل الوصول
      obs.observe(target);
    });
  } else {
    // Fallback للمتصفحات القديمة
    window.addEventListener('load', loadCalcScripts);
  }
})();

/* ─── BLOCK 2: Category Data Lazy Loader ─── */
(function () {
  // سجل الملفات المحمّلة — يمنع التحميل المزدوج
  const _loaded = new Set();

  // تحميل script واحد بوعد (Promise)
  function loadScript(src) {
    if (_loaded.has(src)) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload = function () { _loaded.add(src); resolve(); };
      s.onerror = function () { reject(new Error('Failed: ' + src)); };
      document.head.appendChild(s);
    });
  }

  // خريطة الفئات → chunk الفعلي المستخدم في النظام الحالي
  // هذه هي الملفات التي يحمّلها _loadContentChunk فعلاً
  const CATEGORY_DATA = {
    'roads':      ['data_content_roads.js?v=8'],
    'utilities':  ['data_content_utilities.js?v=8'],
    'structural': ['data_content_structural.js?v=8'],
    'geotech':    ['data_content_geotech.js?v=8'],
    'tools':      ['data_content_tools.js?v=8'],
    'extra':      ['data_content_extra.js?v=9'],
    'phase4':     ['data_content_phase4.js?v=8']
  };

  // خريطة عكسية: مفتاح → فئة (مبنية من manifest)
  // تُستخدم في BLOCK 3 لمعرفة فئة أي مفتاح
  const KEY_TO_CATEGORY = {
    // Roads
    roads: 'roads', roads_design: 'roads', roads_mat_card: 'roads',
    roads_qcp: 'roads', subgrade: 'roads', subbase: 'roads',
    base: 'roads', wearing: 'roads', prime: 'roads',
    prime_tack_summary: 'roads', air_voids_tolerances: 'roads',
    marshall_mix: 'roads', superpave_mix: 'roads', bitumen_tests: 'roads',
    pavement_production: 'roads', paving_joints: 'roads',
    ms_asphalt: 'roads', itp_subgrade: 'roads', itp_base: 'roads',
    itp_primecoat: 'roads', itp_wearing: 'roads',
    traffic_management_plan: 'roads', handover: 'roads',
    gabbro_specs: 'roads', testing: 'roads', testing_schedule: 'roads',
    execution: 'roads',
    // Utilities
    utilities: 'utilities', ms_utilities: 'utilities',
    ws_laying: 'utilities', ws_excavation: 'utilities',
    ws_backfill: 'utilities', ws_survey: 'utilities',
    ws_disinfection: 'utilities', ws_handover: 'utilities',
    water_supply_stages: 'utilities', itp_water_supply: 'utilities',
    itp_treated: 'utilities', ss_laying: 'utilities',
    ss_excavation: 'utilities', ss_backfill: 'utilities',
    ss_survey: 'utilities', ss_manholes: 'utilities',
    ss_materials: 'utilities', ss_testing: 'utilities',
    sewer_stages: 'utilities', sw_laying: 'utilities', sw_gullies: 'utilities',
    // Structural
    structural: 'structural', concrete_full: 'structural',
    foundations_full: 'structural', rebar_cover_calc: 'structural',
    // Geotech
    geotech: 'geotech', geo_planning: 'geotech',
    geo_borehole: 'geotech', geo_spt: 'geotech', geo_lab: 'geotech',
    // Tools
    calculator: 'tools',
    // Extra
    ashghal_forms: 'extra', ncr_quick_logger: 'extra',
    doc_analyzer: 'extra', drawing_analyzer: 'extra',
    // Phase4
    pile_load_testing: 'phase4', exec_concrete_pour: 'phase4'
  };

  // تحميل chunk فئة كاملة — يُستدعى تلقائياً من BLOCK 3
  window.loadCategoryData = async function (category) {
    const files = CATEGORY_DATA[category];
    if (!files) return;
    // إذا QS_CONTENT_MAP جاهز، _loadContentChunk أسرع — لا تتدخل
    if (window.QS_CONTENT_MAP) return;
    try {
      await Promise.all(files.map(function (f) { return loadScript(f); }));
    } catch (e) {
      console.error('[lazy-loader] فشل تحميل:', category, e.message);
    }
  };

  // نصدّر الخريطة العكسية ليستخدمها BLOCK 3
  window._QS_KEY_TO_CATEGORY = KEY_TO_CATEGORY;

})();

/* ─── BLOCK 3: Manifest Race-Condition Fix + Auto-Prefetch ─── */
(function () {
  const MANIFEST_SRC = 'data_content_manifest.js?v=7';
  const _earlyQueue = []; // ضغطات قبل جهوزية الـ manifest
  let _manifestReady = false;

  // تحميل manifest فوري عند DOMContentLoaded
  // الملف 8KB ومخزّن في cache من <link rel="preload"> → ~0ms
  function forceLoadManifest() {
    if (window.QS_CONTENT_MAP) { _manifestReady = true; _flushQueue(); return; }
    const s = document.createElement('script');
    s.src = MANIFEST_SRC;
    s.async = true;
    s.onload = function () { _manifestReady = true; _flushQueue(); };
    document.head.appendChild(s);
  }

  // تفريغ الضغطات المؤجّلة بعد جهوزية المانيفست
  function _flushQueue() {
    while (_earlyQueue.length) {
      const key = _earlyQueue.shift();
      if (typeof window.openDetail === 'function') window.openDetail(key);
      else if (window.QS && typeof window.QS.openDetail === 'function') window.QS.openDetail(key);
    }
  }

  // تغليف QS.openDetail:
  // 1. إذا manifest غير جاهز → queue + loading indicator
  // 2. إذا جاهز → prefetch فئة المفتاح كاملاً (للأداء)، ثم openDetail
  function _wrapOpenDetail() {
    const _qs = window.QS;
    if (!_qs || !_qs.openDetail) return;

    const _orig = _qs.openDetail;
    _qs.openDetail = function (key) {
      // manifest غير جاهز → queue + loading indicator
      if (!_manifestReady && !(window.QS_CONTENT && window.QS_CONTENT[key])) {
        _earlyQueue.push(key);
        const modal   = document.getElementById('detailModal');
        const title   = document.getElementById('dmTitle');
        const content = document.getElementById('dmContent');
        if (modal && title && content) {
          title.textContent = '...';
          content.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text3,#888);font-size:14px;">⏳ جاري التحميل...</div>';
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
        return;
      }

      // prefetch فئة المفتاح كاملاً في الخلفية (لا ينتظر)
      // إذا فتح المستخدم 'subgrade' → يُحمَّل data_content_roads.js كاملاً
      // فأي مفتاح roads تالٍ يفتح فوراً من cache
      const cat = window._QS_KEY_TO_CATEGORY && window._QS_KEY_TO_CATEGORY[key];
      if (cat && typeof window.loadCategoryData === 'function') {
        window.loadCategoryData(cat); // لا await — في الخلفية
      }

      return _orig.call(_qs, key);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      forceLoadManifest();
      setTimeout(_wrapOpenDetail, 150); // بعد تسجيل QS من inline-scripts.js
    });
  } else {
    forceLoadManifest();
    setTimeout(_wrapOpenDetail, 150);
  }

})();
