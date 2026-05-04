// js/calc-lazy-loader.js — QatarSpec Pro
// نُقل من inline script في index.html لإزالة unsafe-inline من CSP
// Lazy-loads calculator scripts when #group-calc becomes visible via IntersectionObserver

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
