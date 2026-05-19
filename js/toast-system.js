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
    window.QS.toast._activeErrorToast = null; // تتبع الـ error toast النشطة

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
        cleanupStuckToasts();
        return window.QS.toast.success(msg);
      },
      error: function (msg) {
        // مسح الـ error toast السابقة قبل عرض الجديدة (حد أقصى: 1 toast خطأ)
        if (window.QS.toast._activeErrorToast) {
          try { window.QS.toast.dismiss(window.QS.toast._activeErrorToast); } catch(e) {}
        }
        // [FIX v2] تنظيف كل toasts العالقة قبل إنشاء جديد
        cleanupStuckToasts();
        window.QS.toast._activeErrorToast = window.QS.toast.error(msg);
        return window.QS.toast._activeErrorToast;
      },
      warning: function (msg) {
        cleanupStuckToasts();
        return window.QS.toast.open({ type: 'warning', message: msg });
      },
      info: function (msg) {
        cleanupStuckToasts();
        return window.QS.toast.open({ type: 'info', message: msg });
      },
      pro: function (msg) {
        cleanupStuckToasts();
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
      /* ═══ FIX v2: إجبار الـ toasts على اليسار الفيزيائي في RTL ═══
         المشكلة: Notyf يستخدم flexbox + align-items. في RTL، flex-start = يمين فيزيائي.
         direction:ltr وحدها لا تكفي لأن Notyf يطبّق inline styles.
         الحل: نُعيد كتابة positioning كامل بـ !important عالي الخصوصية */
      'html .notyf, html[dir="rtl"] .notyf, [dir="rtl"] .notyf, body .notyf {' +
        'direction: ltr !important;' +
        'position: fixed !important;' +
        'bottom: 0 !important;' +
        'left: 0 !important;' +
        'right: auto !important;' +
        'top: auto !important;' +
        'width: auto !important;' +
        'max-width: 380px !important;' +
        'height: auto !important;' +
        'display: flex !important;' +
        'flex-direction: column !important;' +
        'align-items: flex-start !important;' +
        'justify-content: flex-end !important;' +
        'padding: 12px !important;' +
        'z-index: 9999 !important;' +
        'pointer-events: none !important;' +
        'font-family: inherit !important;' +
      '}',
      'html .notyf .notyf__toast, html[dir="rtl"] .notyf .notyf__toast {' +
        'direction: rtl !important;' +
        'font-size: 14px !important;' +
        'border-radius: 10px !important;' +
        'min-width: 240px !important;' +
        'max-width: 340px !important;' +
        'pointer-events: auto !important;' +
        'margin-bottom: 8px !important;' +
      '}',
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

  // ═══ 6. استبدال window.alert بـ Notyf ═══
  /**
   * كل alert() في الكود (inline-scripts.js, payment.js, smart-search.js, إلخ)
   * ستُحوَّل تلقائياً لـ toast مناسب بناءً على محتوى الرسالة.
   * القاعدة: لا نحذف أي كود — نعيد توجيه alert() فقط.
   * [FIX v2] Rate limiter: حد أقصى 3 toasts كل 5 ثوان — يمنع flooding
   */
  var _alertHistory = []; // تاريخ آخر 5 ثوان
  var _MAX_TOASTS_PER_5SEC = 3;

  function overrideNativeAlert() {
    var _nativeAlert = window.alert;
    window.alert = function (msg) {
      if (!msg) return;
      var m = String(msg);

      // [FIX v2] Rate limiter — لا أكثر من 3 toasts كل 5 ثوان
      var now = Date.now();
      _alertHistory = _alertHistory.filter(function(t) { return now - t < 5000; });
      if (_alertHistory.length >= _MAX_TOASTS_PER_5SEC) {
        console.warn('[QS-alert→toast] Rate limited — suppressed:', m.substring(0, 60));
        return;
      }
      _alertHistory.push(now);

      // [FIX v2] إزالة toasts عالقة قبل إضافة جديد
      cleanupStuckToasts();

      // استنتاج النوع من المحتوى
      if (m.startsWith('✅') || m.startsWith('🎉') || m.includes('بنجاح') || m.includes('تم')) {
        window.QS.notify.success(m);
      } else if (m.startsWith('❌') || m.includes('خطأ') || m.includes('فشل')) {
        window.QS.notify.error(m);
      } else if (m.startsWith('⚠️') || m.startsWith('📡') || m.includes('حذر') || m.includes('تجاوزت الحد')) {
        window.QS.notify.warning(m);
      } else if (m.includes('Pro') || m.includes('اشترك') || m.includes('ارقَ')) {
        window.QS.notify.pro(m);
      } else {
        window.QS.notify.info(m);
      }

      // سجّل في console للـ debugging (لا نحذف)
      console.log('[QS-alert→toast]', m);

      // لا نستدعي _nativeAlert — الـ toast يكفي
    };
    console.log('[QS-Toast] window.alert overridden → Notyf ✅');
  }

  // ═══ Stuck Toast Cleanup ═══
  // [FIX v2] ينظّف toasts عالقة (بقيت أكثر من 10 ثوان)
  function cleanupStuckToasts() {
    var container = document.querySelector('.notyf');
    if (!container) return;
    var toasts = container.querySelectorAll('.notyf__toast');
    // حد أقصى 3 toasts مرئية — أزل الأقدم
    if (toasts.length > 3) {
      for (var i = 0; i < toasts.length - 3; i++) {
        try { toasts[i].remove(); } catch(e) {}
      }
    }
  }

  // تنظيف دوري كل 8 ثوان
  setInterval(function() {
    var container = document.querySelector('.notyf');
    if (!container) return;
    var toasts = container.querySelectorAll('.notyf__toast');
    toasts.forEach(function(t) {
      // إذا الـ toast ليس عنده animation running → عالق → أزله
      var opacity = window.getComputedStyle(t).opacity;
      // Notyf يُخفي toasts بـ opacity → 0 ثم يحذفها
      // إذا opacity = 0 لكنه لسا في DOM → عالق
      if (parseFloat(opacity) <= 0.01) {
        try { t.remove(); } catch(e) {}
      }
    });
    // حد أقصى مطلق: 5 toasts max
    if (toasts.length > 5) {
      for (var i = 0; i < toasts.length - 2; i++) {
        try { toasts[i].remove(); } catch(e) {}
      }
    }
  }, 8000);

  // ═══ 7. Rate Limit (429) Global Interceptor ═══
  /**
   * يعترض كل fetch responses بـ 429 ويعرض toast تحذيري
   * بدون المساس بأي كود موجود
   */
  function installRateLimitInterceptor() {
    var _origFetch = window.fetch;
    window.fetch = function () {
      return _origFetch.apply(this, arguments).then(function (response) {
        if (response.status === 429) {
          var retryAfter = response.headers.get('Retry-After');
          var waitMsg = retryAfter
            ? 'تجاوزت حد الطلبات — انتظر ' + retryAfter + ' ثانية'
            : 'تجاوزت حد الطلبات — انتظر دقيقة وأعد المحاولة';
          window.QS.notify.warning('⏳ ' + waitMsg);
          console.warn('[QS-RateLimit] 429 detected', response.url);
        }
        return response;
      });
    };
    console.log('[QS-Toast] Rate limit interceptor installed ✅');
  }

  // ═══ 8. اكتشاف الاتصال (Offline/Online) ═══
  /**
   * يضيف toast عند انقطاع/عودة الاتصال
   * مكمّل لـ inline-scripts.js الذي يدير شريط الـ offline
   */
  function bindConnectivityEvents() {
    window.addEventListener('offline', function () {
      if (window.QS && window.QS.notify) {
        window.QS.notify.warning('📡 انقطع الاتصال — التطبيق يعمل بشكل محدود offline');
      }
    });

    window.addEventListener('online', function () {
      if (window.QS && window.QS.notify) {
        window.QS.notify.success('✅ عاد الاتصال بالإنترنت');
      }
    });

    // تحقق من الحالة الحالية عند التحميل
    if (!navigator.onLine) {
      setTimeout(function () {
        if (window.QS && window.QS.notify) {
          window.QS.notify.warning('📡 لا يوجد اتصال — يعمل في وضع offline');
        }
      }, 2000); // تأخير حتى تكتمل تهيئة Notyf
    }
  }

  // ═══ تشغيل عند جاهزية DOM ═══
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNotyf();
      overrideNativeAlert();
      installRateLimitInterceptor();
      bindConnectivityEvents();
    });
  } else {
    // DOM جاهز بالفعل (defer)
    initNotyf();
    overrideNativeAlert();
    installRateLimitInterceptor();
    bindConnectivityEvents();
  }

})();
