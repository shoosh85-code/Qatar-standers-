// QatarSpec Pro — Smart Script Loader v2.0
// data_calcs.js: loaded immediately (contains QS namespace + all calculators)
// data_content.js: deferred to idle time (heavy data, only needed on card open)
(function () {
  'use strict';

  function loadScript(src, async) {
    var s = document.createElement('script');
    s.src = src;
    s.async = !!async;
    document.head.appendChild(s);
    return s;
  }

  // ── 1. Load data_calcs.js immediately (sync-like, non-blocking) ──
  // Runs as soon as downloaded — builds QS namespace + all calc functions
  var calcsScript = loadScript('data_calcs.js', true);

  // ── 2. Load data_content.js at idle time ──
  // Only needed when user opens a detail card — safe to defer
  function loadContent() {
    loadScript('data_content.js', true);
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadContent, { timeout: 2000 });
  } else {
    setTimeout(loadContent, 800);
  }

  // ── 3. Safety net: if user opens card before data_content.js loads ──
  // The detailData Proxy already handles empty QS_CONTENT gracefully,
  // but we also listen for the calcs script to finish and pre-warm QS.
  calcsScript.onload = function () {
    // QS is now fully built — expose on window for any deferred onclick
    if (window.QS && typeof window.QS.openDetail !== 'function') {
      // QS builder may not have run yet — trigger manually
      if (typeof window._QS_PUBLIC_FNS !== 'undefined') {
        var api = window.QS || {};
        window._QS_PUBLIC_FNS.forEach(function (name) {
          if (typeof window[name] === 'function') {
            api[name] = window[name].bind(window);
          }
        });
        window.QS = api;
      }
    }
  };
})();
