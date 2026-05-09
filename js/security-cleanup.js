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

// ═══ SERVICE KEY GUARD v1.0 — مسح Supabase service_role key ═══════════════
// service_role key يعطي وصولاً كاملاً للـ database — أخطر من أي API key
(function checkForLeakedServiceKey() {
  'use strict';
  const DANGEROUS_PATTERNS = [
    'service_role', 'supabase_service', 'SUPABASE_SERVICE',
    'serviceRoleKey', 'service-role',
  ];
  const STORAGES = [
    { name: 'localStorage',   store: window.localStorage   },
    { name: 'sessionStorage', store: window.sessionStorage },
  ];
  for (const { name, store } of STORAGES) {
    try {
      const keys = Object.keys(store);
      for (const key of keys) {
        const keyLower = key.toLowerCase();
        const val      = store.getItem(key) || '';
        const isDangerous =
          DANGEROUS_PATTERNS.some(p => keyLower.includes(p.toLowerCase())) ||
          (val.length > 30 && val.startsWith('eyJ') && keyLower.includes('supabase'));
        if (isDangerous) {
          console.error(`[QatarSpec SECURITY] مفتاح خطير في ${name}:`, key);
          store.removeItem(key);
        }
      }
    } catch (_e) {
      // Storage محجوب (private mode أو iframe)
    }
  }
})();
