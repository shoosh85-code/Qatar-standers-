// ============================================================
// QatarSpec Loader — Dynamic data loading for file:// protocol
// ============================================================
// Loads detailData in 4 async chunks instead of one 900KB block.
// Compatible with file://, http://, and https:// protocols.
// ============================================================

(function() {
  'use strict';

  // ── Config ──────────────────────────────────────────────
  var DATA_FILES = [
    'data_structural.js',   // الإنشاء والخرسانة والجسات  (~181KB)
    'data_roads.js',        // الطرق والإسفلت              (~254KB)
    'data_utilities.js',    // المرافق والمياه والصرف      (~551KB)
    'data_general.js',      // الأدوات والعام               (~21KB)
  ];

  // ── State ────────────────────────────────────────────────
  var loadedCount = 0;
  var totalFiles = DATA_FILES.length;
  var loadErrors = [];

  // ── Progress UI ──────────────────────────────────────────
  function showLoader() {
    var overlay = document.createElement('div');
    overlay.id = 'qs-loader';
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:9999',
      'background:var(--bg,#0d1117)',
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px',
      'font-family:var(--font-sans,system-ui,sans-serif)',
    ].join(';');

    overlay.innerHTML = [
      '<div style="font-size:28px">🇶🇦</div>',
      '<div style="font-size:14px;color:var(--gold,#c9a84c);font-weight:600">Qatar Construction Specifications</div>',
      '<div id="qs-loader-msg" style="font-size:12px;color:var(--text3,#888);direction:rtl">جاري تحميل البيانات...</div>',
      '<div style="width:200px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden">',
      '  <div id="qs-loader-bar" style="height:100%;width:0%;background:var(--gold,#c9a84c);border-radius:2px;transition:width 0.3s ease"></div>',
      '</div>',
      '<div id="qs-loader-pct" style="font-size:11px;color:var(--text3,#888)">0%</div>',
    ].join('');

    document.body.appendChild(overlay);
  }

  function updateProgress(pct, msg) {
    var bar = document.getElementById('qs-loader-bar');
    var pctEl = document.getElementById('qs-loader-pct');
    var msgEl = document.getElementById('qs-loader-msg');
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (msgEl && msg) msgEl.textContent = msg;
  }

  function hideLoader() {
    var overlay = document.getElementById('qs-loader');
    if (overlay) {
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(function() { overlay.remove(); }, 400);
    }
  }

  function showError(msg) {
    var msgEl = document.getElementById('qs-loader-msg');
    if (msgEl) {
      msgEl.style.color = '#e74c3c';
      msgEl.textContent = msg;
    }
  }

  // ── Script Loader ────────────────────────────────────────
  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = function() { callback(null); };
    script.onerror = function() { callback(new Error('Failed to load: ' + src)); };
    document.head.appendChild(script);
  }

  // Load files sequentially to avoid memory spikes
  function loadNext(index) {
    if (index >= totalFiles) {
      // All done
      updateProgress(100, 'اكتمل التحميل ✓');
      setTimeout(hideLoader, 500);
      // Dispatch event so app code can react if needed
      document.dispatchEvent(new Event('qatarspec:ready'));
      return;
    }

    var file = DATA_FILES[index];
    var pct = (index / totalFiles) * 90; // 0-90%, last 10% on completion

    var labels = ['تحميل الإنشاء...', 'تحميل الطرق...', 'تحميل المرافق...', 'تحميل الأدوات...'];
    updateProgress(pct, labels[index] || 'جاري التحميل...');

    loadScript(file, function(err) {
      if (err) {
        loadErrors.push(file);
        console.error('[QatarSpec Loader]', err.message);
        // Continue anyway — partial data is better than nothing
      }
      loadedCount++;
      loadNext(index + 1);
    });
  }

  // ── Bootstrap ────────────────────────────────────────────
  function init() {
    // Ensure detailData container exists before any file loads
    window.detailData = window.detailData || {};

    showLoader();
    updateProgress(5, 'جاري التحميل...');
    loadNext(0);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
