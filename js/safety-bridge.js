// ── QS Safety Bridge v3.2.1 — بعد data_calcs مباشرة ──
(function(){
  window.QS = window.QS || {};
  if (typeof window.QS.openDetail !== 'function') {
    window.QS.openDetail = function(k) {
      if (typeof window.openDetail === 'function') { window.openDetail(k); return; }
      setTimeout(function(){ if (typeof window.openDetail === 'function') window.openDetail(k); }, 200);
    };
  }
  ['goBack','doSearch','filterCards','setLang','openKeyModal','closeKeyModal',
   'exportToPDF','exportToWord','printCurrentDetail','shareDetail'].forEach(function(fn){
    if (typeof window.QS[fn] !== 'function' && typeof window[fn] === 'function') {
      window.QS[fn] = window[fn].bind(window);
    }
  });
  console.log('[App] QS Safety Bridge active — v3.2.1');
})();
