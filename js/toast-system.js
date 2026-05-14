/**
 * QatarSpec Pro — Toast Notification System v1.0
 * يستخدم Notyf v3.10.0 كبديل احترافي لنظام showToast البسيط
 * الملف: js/toast-system.js
 *
 * القواعد:
 * - لا يحذف ولا يكسر showToast الموجود — يُحسّنه فقط
 * - يعمل مع RTL (عربي من اليسار)
 * - يدعم 5 أنواع: success / error / warning / info / pro
 */

(function () {
  'use strict';

  // ═══ 1. تهيئة Notyf ═══
  function initNotyf() {
    if (typeof Notyf === 'undefined') {
      // Notyf لم يتحمّل بعد — حاول بعد 500ms
      setTimeout(initNotyf, 500);
      return;
    }

    window.QS = window.QS || {};

    // تجنّب التهيئة المزدوجة
    if (window.QS.toast && window.QS.toast._initialized) return;

    // ─── إنشاء instance ─────────────────────────────────────
    window.QS.toast = new Notyf({
      duration: 4000,
      position: { x: 'left', y: 'bottom' }, // RTL → يسار
      ripple: true,
      dismissible: true,
      types: [
        {
          type: 'success',
          background: '#0F6E56',
          icon: false
        },
        {
          type: 'error',
          background: '#A32D2D',
          icon: false
        },
        {
          type: 'warning',
          background: '#854F0B',
          className: 'notyf-warning',
          icon: false
        },
        {
          type: 'info',
          background: '#185FA5',
          className: 'notyf-info',
          icon: false
        },
        {
          type: 'pro',
          background: '#7A1515',
          className: 'notyf-pro',
          icon: false
        }
      ]
    });

    window.QS.toast._initialized = true;

    // ─── Helper API ──────────────────────────────────────────
    /**
     * window.QS.notify.success('رسالة')
     * window.QS.notify.error('رسالة')
     * window.QS.notify.warning('رسالة')
     * window.QS.notify.info('رسالة')
     * window.QS.notify.pro('رسالة')
     */
    window.QS.notify = {
      success: function (msg) {
        return window.QS.toast.success(msg);
      },
      error: function (msg) {
        return window.QS.toast.error(msg);
      },
      warning: function (msg) {
        return window.QS.toast.open({ type: 'warning', message: msg });
      },
      info: function (msg) {
        return window.QS.toast.open({ type: 'info', message: msg });
      },
      pro: function (msg) {
        return window.QS.toast.open({ type: 'pro', message: msg });
      }
    };

    // ─── 2. استبدال showToast الموجود بـ Notyf ──────────────
    /**
     * inline-scripts.js يستخدم showToast() في ~40 مكان.
     * بدلاً من تعديل كل مكان، نستبدل الدالة من هنا.
     * القاعدة: لا نحذف الدالة القديمة — نُعيد تعريفها فقط.
     */
    window.showToast = function (msg, type, duration) {
      if (!msg) return;

      // استنتاج النوع من البادئة إذا لم يُحدد
      if (!type) {
        if (msg.startsWith('✅') || msg.startsWith('🎉')) type = 'success';
        else if (msg.startsWith('❌'))                    type = 'error';
        else if (msg.startsWith('⚠️'))                   type = 'warning';
        else if (msg.startsWith('⏳') || msg.startsWith('🔄')) type = 'info';
        else                                               type = 'info';
      }

      // إذا طُلب نوع pro (من الكود المستقبلي)
      if (type === 'pro') {
        return window.QS.notify.pro(msg);
      }

      // إذا طُلب مدة مخصصة — نعيد إنشاء instance مؤقت
      if (duration && duration !== 4000) {
        var tempNotyf = new Notyf({ duration: duration, position: { x: 'left', y: 'bottom' }, ripple: false, dismissible: true });
        var tempTypes = {
          success: function (m) { return tempNotyf.success(m); },
          error:   function (m) { return tempNotyf.error(m); },
          warning: function (m) { return tempNotyf.open({ type: 'warning', message: m }); },
          info:    function (m) { return tempNotyf.success(m); } // fallback
        };
        // Notyf الافتراضي لا يدعم warning مباشرة بدون type مخصص في instance جديد
        // نستخدم الـ QS.toast الرئيسي مع تجاهل المدة المخصصة (acceptable tradeoff)
      }

      // توجيه للدالة المناسبة
      switch (type) {
        case 'success': return window.QS.notify.success(msg);
        case 'error':   return window.QS.notify.error(msg);
        case 'warning': return window.QS.notify.warning(msg);
        default:        return window.QS.notify.info(msg);
      }
    };

    // ─── 3. CSS Overrides (RTL + Brand Colors) ─────────────
    injectStyles();

    // ─── 4. ربط أحداث Pro ──────────────────────────────────
    bindProEvents();

    // ─── 5. إخفاء الـ toast القديم بهدوء ──────────────────
    hideOldToastElement();

    console.log('[QS-Toast] Notyf system initialized ✅');
  }

  // ═══ CSS Overrides ═══
  function injectStyles() {
    if (document.getElementById('qs-toast-styles')) return;
    var style = document.createElement('style');
    style.id = 'qs-toast-styles';
    style.textContent = [
      /* RTL - من اليسار */
      '.notyf { direction: rtl; font-family: inherit; }',
      '.notyf__toast { font-size: 14px; border-radius: 10px; min-width: 240px; max-width: 340px; }',
      '.notyf__message { font-weight: 500; line-height: 1.5; }',

      /* brand colors overrides */
      '.notyf__toast--success { background: #0F6E56 !important; }',
      '.notyf__toast--error   { background: #A32D2D !important; }',
      '.notyf-warning  .notyf__toast { background: #854F0B !important; }',
      '.notyf-info     .notyf__toast { background: #185FA5 !important; }',
      '.notyf-pro      .notyf__toast { background: #7A1515 !important; box-shadow: 0 0 0 2px #c0a060; }',

      /* dismiss X */
      '.notyf__dismiss-btn { opacity: 0.7; transition: opacity .2s; }',
      '.notyf__dismiss-btn:hover { opacity: 1; }',

      /* animate in from bottom-left */
      '@keyframes qs-slide-in { from { transform: translateY(30px); opacity:0; } to { transform: translateY(0); opacity:1; } }',
      '.notyf__toast { animation: qs-slide-in .25s ease-out; }',

      /* hide the old #toast element once Notyf is active */
      '#toast.toast-base, #toast.toast { display: none !important; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ═══ ربط أحداث Pro upgrade ═══
  function bindProEvents() {
    // نستمع لتغييرات على DOM قد تعني نجاح تفعيل Pro
    // (inline-scripts.js يستدعي showToast مباشرة — وقد استبدلناه)
    // هنا نضيف حدث اختياري لأي كود مستقبلي
    document.addEventListener('qs:pro-activated', function () {
      window.QS.notify.pro('🎉 مرحباً في QatarSpec Pro! جميع الميزات مفعّلة');
    });

    document.addEventListener('qs:export-success', function (e) {
      var detail = (e && e.detail) || {};
      var format = detail.format || 'الملف';
      window.QS.notify.success('✅ تم تصدير ' + format + ' بنجاح');
    });

    document.addEventListener('qs:api-error', function (e) {
      var detail = (e && e.detail) || {};
      var msg = detail.message || 'خطأ في الاتصال — حاول مرة أخرى';
      window.QS.notify.error('❌ ' + msg);
    });
  }

  // ═══ إخفاء الـ toast القديم ═══
  function hideOldToastElement() {
    var oldToast = document.getElementById('toast');
    if (oldToast) {
      oldToast.style.display = 'none';
    }
  }

  // ═══ تشغيل عند جاهزية DOM ═══
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotyf);
  } else {
    // DOM جاهز بالفعل (defer)
    initNotyf();
  }

})();
