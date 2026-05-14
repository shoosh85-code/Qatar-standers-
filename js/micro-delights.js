/**
 * QatarSpec Pro — Micro-Delights System
 * PROMPT #8: Confetti + Animations + Loading States
 * ملف: js/micro-delights.js
 * القاعدة: احترم prefers-reduced-motion دائماً
 */

'use strict';

// ═══════════════════════════════════════════════════════════════════
// 1. CSS Animations — Inject into <head>
// ═══════════════════════════════════════════════════════════════════
(function injectMicroDelightStyles() {
  if (document.getElementById('qs-micro-delights-css')) return;

  const style = document.createElement('style');
  style.id = 'qs-micro-delights-css';
  style.textContent = `
    /* ═══ Bounce Keyframe ═══ */
    @keyframes qs-bounce {
      0%   { transform: scale(0); opacity: 0; }
      50%  { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }

    /* ═══ Dot Spinner ═══ */
    @keyframes qs-dot {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-12px); }
    }

    /* ═══ Fade In ═══ */
    @keyframes qs-fade-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ═══ Pass Pulse ═══ */
    @keyframes qs-pass-pulse {
      0%   { box-shadow: 0 0 0 0 rgba(15, 110, 86, 0.6); }
      70%  { box-shadow: 0 0 0 14px rgba(15, 110, 86, 0); }
      100% { box-shadow: 0 0 0 0 rgba(15, 110, 86, 0); }
    }

    /* ═══ Fail Shake ═══ */
    @keyframes qs-fail-shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-5px); }
      80%       { transform: translateX(5px); }
    }

    /* ═══ Spinner Container ═══ */
    .qs-loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      width: 100%;
    }
    .qs-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
    }
    .qs-spinner div {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #7A1515;
      animation: qs-dot 0.6s ease-in-out infinite;
    }
    .qs-spinner div:nth-child(2) { animation-delay: 0.15s; }
    .qs-spinner div:nth-child(3) { animation-delay: 0.30s; }

    /* ═══ Success Check ═══ */
    .qs-success-check {
      font-size: 48px;
      text-align: center;
      animation: qs-bounce 0.5s ease both;
      display: block;
    }

    /* ═══ Pass Result Badge ═══ */
    .qs-result-pass {
      animation: qs-pass-pulse 0.8s ease-out;
      border-radius: 6px;
    }

    /* ═══ Fail Result Badge ═══ */
    .qs-result-fail {
      animation: qs-fail-shake 0.4s ease-out;
    }

    /* ═══ Empty State ═══ */
    .qs-empty-state {
      animation: qs-fade-in 0.3s ease both;
    }

    /* ═══ Reduced Motion Overrides ═══ */
    @media (prefers-reduced-motion: reduce) {
      .qs-spinner div               { animation: none; opacity: 0.5; }
      .qs-success-check             { animation: none; }
      .qs-result-pass               { animation: none; }
      .qs-result-fail               { animation: none; }
      .qs-empty-state               { animation: none; }
      @keyframes qs-bounce          {}
      @keyframes qs-dot             {}
      @keyframes qs-pass-pulse      {}
      @keyframes qs-fail-shake      {}
      @keyframes qs-fade-in         {}
    }
  `;
  document.head.appendChild(style);
})();


// ═══════════════════════════════════════════════════════════════════
// 2. QS.celebrate — Confetti لنتائج Pass و Pro Upgrade
// ═══════════════════════════════════════════════════════════════════
window.QS = window.QS || {};

window.QS.celebrate = {
  /**
   * يُطلق confetti عند نتيجة PASS في أي حاسبة
   */
  pass: function () {
    // احترام prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // تأكد إن confetti محمّل
    if (typeof confetti !== 'function') {
      console.warn('[QS] confetti غير محمّل — تأكد من وجود /lib/vendor/confetti.browser.min.js');
      return;
    }
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0F6E56', '#1D9E75', '#5DCAA5', '#FFD700'],
      disableForReducedMotion: true
    });
  },

  /**
   * يُطلق confetti من الجانبين عند ترقية Pro
   */
  proUpgrade: function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof confetti !== 'function') {
      console.warn('[QS] confetti غير محمّل — تأكد من وجود /lib/vendor/confetti.browser.min.js');
      return;
    }
    // من اليسار
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#7A1515', '#FFD700', '#E8593C'],
      disableForReducedMotion: true
    });
    // من اليمين
    setTimeout(function () {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7A1515', '#FFD700', '#E8593C'],
        disableForReducedMotion: true
      });
    }, 150);
  }
};


// ═══════════════════════════════════════════════════════════════════
// 3. QS.animations — Loading / Success / Empty State
// ═══════════════════════════════════════════════════════════════════
window.QS.animations = {
  /**
   * يُضيف loading spinner داخل container
   * @param {HTMLElement} container
   * @returns {HTMLElement} el — احتفظ به لتمريره لـ hideLoading
   */
  showLoading: function (container) {
    if (!container) return null;
    const el = document.createElement('div');
    el.className = 'qs-loading-spinner';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', 'جاري التحميل...');
    el.innerHTML = '<div class="qs-spinner"><div></div><div></div><div></div></div>';
    container.appendChild(el);
    return el;
  },

  /**
   * يُزيل loading spinner
   * @param {HTMLElement} el — العنصر الذي أرجعه showLoading
   */
  hideLoading: function (el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },

  /**
   * يُظهر ✅ checkmark لمدة 2 ثانية ثم يختفي
   * @param {HTMLElement} container
   */
  showSuccess: function (container) {
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'qs-success-check';
    el.setAttribute('aria-label', 'تم بنجاح');
    el.textContent = '✅';
    container.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2000);
  },

  /**
   * يُظهر empty state
   * @param {HTMLElement} container
   * @param {string} [message] — رسالة مخصصة (اختياري)
   * @returns {HTMLElement} el
   */
  showEmpty: function (container, message) {
    if (!container) return null;
    const el = document.createElement('div');
    el.className = 'qs-empty-state';
    el.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--color-text-secondary,#888)">
        <div style="font-size:48px;margin-bottom:12px" aria-hidden="true">📭</div>
        <p style="margin:0;font-size:14px">${message || 'لا توجد نتائج'}</p>
      </div>`;
    container.appendChild(el);
    return el;
  },

  /**
   * يُضيف CSS class للنتيجة (Pass/Fail) مع أنيميشن
   * @param {HTMLElement} el — عنصر يحتوي على النتيجة
   * @param {'pass'|'fail'} result
   */
  highlightResult: function (el, result) {
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cls = result === 'pass' ? 'qs-result-pass' : 'qs-result-fail';
    el.classList.remove('qs-result-pass', 'qs-result-fail');
    // force reflow لإعادة تشغيل الأنيميشن
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(function () { el.classList.remove(cls); }, 1000);
  }
};


// ═══════════════════════════════════════════════════════════════════
// 4. Auto-Hook — ربط تلقائي بنتائج Pass/Fail الموجودة
// ═══════════════════════════════════════════════════════════════════
(function autoHookPassFail() {
  /**
   * يراقب تغييرات الـ DOM ويربط confetti + highlight بأي نتيجة Pass
   * يبحث عن:
   *   - عناصر تحتوي نص PASS (بعد حساب الحاسبات)
   *   - data-qs-result="pass" أو data-qs-result="fail"
   */

  function handleResultElement(el) {
    const text = (el.textContent || '').trim().toUpperCase();
    const attr = (el.getAttribute('data-qs-result') || '').toLowerCase();

    if (attr === 'pass' || text === 'PASS' || text.includes('✅ PASS') || text.includes('مقبول')) {
      window.QS.animate && window.QS.animations.highlightResult(el, 'pass');
      window.QS.celebrate.pass();
    } else if (attr === 'fail' || text === 'FAIL' || text.includes('❌ FAIL') || text.includes('مرفوض')) {
      window.QS.animations.highlightResult(el, 'fail');
    }
  }

  // MutationObserver — يراقب الـ DOM
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return; // ليس element

          // فحص العنصر نفسه
          const nodeText = (node.textContent || '').trim();
          const hasPass = /\bPASS\b/i.test(nodeText) || /مقبول/.test(nodeText);
          const hasFail = /\bFAIL\b/i.test(nodeText) || /مرفوض/.test(nodeText);

          if (hasPass || hasFail) {
            // تأخير صغير للتأكد من اكتمال الـ render
            setTimeout(function () {
              handleResultElement(node);
            }, 100);
          }

          // فحص العناصر الداخلية بـ data-qs-result
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-qs-result]').forEach(function (child) {
              setTimeout(function () { handleResultElement(child); }, 100);
            });
          }
        });
      });
    });

    // ابدأ المراقبة بعد تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function () {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // ربط يدوي: استمع لـ custom event من الحاسبات
  // يمكن لأي حاسبة إطلاق: document.dispatchEvent(new CustomEvent('qs:result', { detail: { result: 'pass' } }))
  document.addEventListener('qs:result', function (e) {
    if (!e.detail) return;
    if (e.detail.result === 'pass') {
      window.QS.celebrate.pass();
    }
  });

  // ربط يدوي: Pro upgrade event
  // document.dispatchEvent(new CustomEvent('qs:pro-upgrade'))
  document.addEventListener('qs:pro-upgrade', function () {
    window.QS.celebrate.proUpgrade();
    if (window.QS.notify && window.QS.notify.pro) {
      window.QS.notify.pro('🎉 مرحباً بك في QatarSpec Pro!');
    }
  });
})();


// ═══════════════════════════════════════════════════════════════════
// 5. تشغيل confetti للـ Pro upgrade عبر دالة قابلة للاستدعاء
// ═══════════════════════════════════════════════════════════════════
window.QS.triggerProUpgrade = function () {
  document.dispatchEvent(new CustomEvent('qs:pro-upgrade'));
};

// ═══════════════════════════════════════════════════════════════════
// DEBUG — في بيئة التطوير فقط
// ═══════════════════════════════════════════════════════════════════
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('[QS Micro-Delights] ✅ محمّل — QS.celebrate.pass() / QS.celebrate.proUpgrade() / QS.animations.*');
}
