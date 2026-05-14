/**
 * QatarSpec Pro — Key Modal Management v1.0
 * الملف: js/core/key-modal.js
 *
 * الدوال: openKeyModal, closeKeyModal, saveKey, updateKeyStatus
 * المصدر: مُستخرج من inline-scripts.js (الأسطر 63-100)
 *
 * ملاحظة أمنية: في الإنتاج لا يوجد API key في المتصفح
 * الاتصال يتم عبر /api/ai-proxy (server-side)
 */

(function () {
  'use strict';

  window.openKeyModal = function openKeyModal() {
    // [SEC v4.0] لا يوجد API key في المتصفح — الاتصال عبر /api/ai-proxy
    var isProxy = window.location.hostname !== 'localhost' &&
                  window.location.hostname !== '127.0.0.1';
    if (isProxy) {
      if (typeof window.showToast === 'function') {
        window.showToast('✅ المفتاح مُفعَّل على السيرفر — لا حاجة للإدخال اليدوي');
      }
      window.updateKeyStatus(true);
      return;
    }
    // Local dev only
    document.getElementById('keyModal').classList.add('open');
  };

  window.closeKeyModal = function closeKeyModal() {
    document.getElementById('keyModal').classList.remove('open');
  };

  window.saveKey = function saveKey() {
    // [SEC v4.0] في الإنتاج: لا مفتاح في المتصفح
    var isProxy = window.location.hostname !== 'localhost' &&
                  window.location.hostname !== '127.0.0.1';
    if (isProxy) {
      if (typeof window.showToast === 'function') {
        window.showToast('⚠️ في الإنتاج: لا حاجة لمفتاح — الاتصال عبر السيرفر');
      }
      window.closeKeyModal();
      return;
    }
    // Local dev only: مؤقت في الذاكرة فقط — لا localStorage
    var k = document.getElementById('keyInput').value.trim();
    if (!k || k.length < 20) {
      if (typeof window.showToast === 'function') window.showToast('❌ المفتاح غير صحيح');
      return;
    }
    window.updateKeyStatus(true);
    window.closeKeyModal();
    if (typeof window.showToast === 'function') {
      window.showToast('✅ تم تفعيل AI (جلسة مؤقتة — للتطوير فقط)');
    }
  };

  window.updateKeyStatus = function updateKeyStatus(active) {
    var dot = document.getElementById('keyDot');
    var txt = document.getElementById('keyStatusText');
    if (dot) dot.className = 'key-dot' + (active ? ' active' : '');
    if (txt) txt.textContent = active ? 'AI مفعّل ✓' : 'إعداد AI';
  };

})();
