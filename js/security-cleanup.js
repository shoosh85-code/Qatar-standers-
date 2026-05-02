// ═══ SECURITY CLEANUP v3.1 — مسح أي بيانات حساسة من localStorage ══════════
// يعمل قبل كل شيء — يحمي المستخدمين القادمين من إصدارات قديمة
(function cleanupSecurity() {
  const LEGACY_KEYS = [
    'apiKey', 'GEMINI_KEY', 'ANTHROPIC_KEY', 'sk-ant',
    'qatarspecKey', 'jwt_token', 'qs_pro_token',
    'qs_pro_active', 'qs_pro_expiry',
  ];
  LEGACY_KEYS.forEach(function(k) {
    if (localStorage.getItem(k)) {
      localStorage.removeItem(k);
      console.log('[QatarSpec Security] Removed legacy key:', k);
    }
  });
  // إزالة أي مفتاح يشبه API Key (sk- أو AIza...)
  Object.keys(localStorage).forEach(function(k) {
    const v = localStorage.getItem(k) || '';
    if (v.startsWith('sk-ant-') || v.startsWith('AIzaSy') || v.startsWith('sk-') && v.length > 20) {
      localStorage.removeItem(k);
      console.warn('[QatarSpec Security] Removed API key from localStorage:', k);
    }
  });
})();
// Register Service Worker v8 — Cache-First + Offline support
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').then(function(reg){
    console.log('[QatarSpec] SW registered, scope:', reg.scope);
    // Auto-update check
    reg.addEventListener('updatefound', function(){
      var newSW = reg.installing;
      if(newSW) newSW.addEventListener('statechange', function(){
        if(newSW.state === 'activated') console.log('[QatarSpec] SW updated');
      });
    });
  }).catch(function(err){
    console.warn('[QatarSpec] SW registration failed:', err);
  });
}
