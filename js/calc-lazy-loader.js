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
