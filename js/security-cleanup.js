// ═══ SECURITY CLEANUP v3.2 — مسح أي بيانات حساسة من localStorage ══════════
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
    }
  });
  // إزالة أي مفتاح يشبه API Key (sk- أو AIza...)
  Object.keys(localStorage).forEach(function(k) {
    const v = localStorage.getItem(k) || '';
    if (v.startsWith('sk-ant-') || v.startsWith('AIzaSy') || (v.startsWith('sk-') && v.length > 20)) {
      localStorage.removeItem(k);
      console.warn('[QatarSpec Security] Removed API key from localStorage:', k);
    }
  });
})();

// ═══ Service Worker v3.3.0 — Registration واحد فقط هنا ══════════════════════
// [S4] توحيد SW — لا يوجد registration في inline-scripts.js أو assets/app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(function(reg) {
        // تحقق من تحديثات وأعلم المستخدم
        reg.addEventListener('updatefound', function() {
          var newSW = reg.installing;
          if (!newSW) return;
          newSW.addEventListener('statechange', function() {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              // عرض banner التحديث إذا وُجد
              var banner = document.getElementById('update-banner');
              if (banner) banner.style.display = 'block';
            }
            if (newSW.state === 'activated') {
            }
          });
        });
      })
      .catch(function(err) {
        console.warn('[SW] Registration failed:', err);
      });
  });
}
