/**
 * QatarSpec Pro — Sweet Dialogs System
 * نظام Dialogs احترافي بـ SweetAlert2
 * PROMPT #3 — v1.0.0
 *
 * يعتمد على: SweetAlert2 v11.14.5 (محمّلة من cdnjs في index.html)
 * يُصدّر: window.QS.dialogs
 */

(function () {
  'use strict';

  // ── انتظر حتى يكون Swal جاهزاً ──
  function waitForSwal(cb, tries) {
    tries = tries || 0;
    if (typeof Swal !== 'undefined') { cb(); return; }
    if (tries > 40) { console.warn('[QS Dialogs] SweetAlert2 لم يتحمّل.'); return; }
    setTimeout(function () { waitForSwal(cb, tries + 1); }, 150);
  }

  // ── CSS للـ RTL + Brand Colors ──
  (function injectCSS() {
    var style = document.createElement('style');
    style.id = 'qs-sweet-dialogs-css';
    style.textContent = [
      /* RTL popup */
      '.swal-rtl { direction: rtl; text-align: right; font-family: "Tajawal", "Segoe UI", sans-serif; }',
      '.swal-rtl .swal2-title { font-size: 1.3rem; color: #1a1a2e; }',
      '.swal-rtl .swal2-html-container { font-size: 0.95rem; color: #444; }',
      /* LTR popup */
      '.swal-ltr { direction: ltr; text-align: left; font-family: "Segoe UI", sans-serif; }',
      /* Pro badge في العنوان */
      '.swal2-pro-icon { display:inline-block; background:#7A1515; color:#fff; border-radius:4px; padding:2px 8px; font-size:0.75rem; margin-right:6px; vertical-align:middle; }',
      /* تحريك أزرار الـ Confirm/Cancel */
      '.swal2-confirm, .swal2-cancel { font-family: inherit !important; font-size: 0.9rem !important; border-radius: 6px !important; }',
    ].join('\n');
    document.head.appendChild(style);
  })();

  // ── حدد اتجاه اللغة الحالية ──
  function isArabic() {
    return document.documentElement.lang === 'ar' ||
           document.documentElement.dir === 'rtl' ||
           (typeof window.QS !== 'undefined' && window.QS.lang === 'ar');
  }

  // ── Helper: الـ popupClass حسب اللغة ──
  function popupClass() {
    return isArabic() ? 'swal-rtl' : 'swal-ltr';
  }

  // ════════════════════════════════════════════════════
  //  QS.dialogs — كل الـ Dialogs
  // ════════════════════════════════════════════════════
  var dialogs = {

    /**
     * 1. Pro Upgrade Dialog
     * يظهر عندما يحاول Free user استخدام ميزة Pro
     * @param {string} featureName - اسم الميزة المطلوبة
     * @returns {Promise} Swal result
     */
    proUpgrade: function (featureName) {
      var ar = isArabic();
      return Swal.fire({
        title: ar ? 'ميزة Pro ⭐' : 'Pro Feature ⭐',
        html: ar
          ? '<p style="direction:rtl"><b>' + (featureName || 'هذه الميزة') + '</b> متاحة لمشتركي Pro فقط</p>' +
            '<p style="direction:rtl;color:#666;font-size:0.88rem;margin-top:8px">' +
            '99 ر.ق/شهر — بحث غير محدود + تصدير + AI متقدم</p>'
          : '<p><b>' + (featureName || 'This feature') + '</b> is available for Pro subscribers only.</p>' +
            '<p style="color:#666;font-size:0.88rem;margin-top:8px">QAR 99/month — Unlimited search + Export + Advanced AI</p>',
        icon: 'info',
        confirmButtonText: ar ? 'ارقَ الآن 🚀' : 'Upgrade Now 🚀',
        cancelButtonText: ar ? 'لاحقاً' : 'Later',
        showCancelButton: true,
        confirmButtonColor: '#7A1515',
        cancelButtonColor: '#6c757d',
        customClass: { popup: popupClass() },
        focusConfirm: false,
      }).then(function (result) {
        if (result.isConfirmed) {
          // افتح نافذة Pro الموجودة إذا كانت متاحة
          if (typeof openProModal === 'function') {
            openProModal();
          } else {
            var el = document.getElementById('proModal');
            if (el) el.classList.add('open');
          }
        }
        return result;
      });
    },

    /**
     * 2. تأكيد التصدير
     * @param {string} format - PDF / Excel / Word
     * @returns {Promise}
     */
    confirmExport: function (format) {
      var ar = isArabic();
      return Swal.fire({
        title: ar ? ('تصدير ' + (format || '')) : ('Export ' + (format || '')),
        text: ar ? 'هل تريد تصدير النتائج الآن؟' : 'Do you want to export the results now?',
        icon: 'question',
        confirmButtonText: ar ? 'نعم، صدّر ✅' : 'Yes, Export ✅',
        cancelButtonText: ar ? 'إلغاء' : 'Cancel',
        showCancelButton: true,
        confirmButtonColor: '#0F6E56',
        cancelButtonColor: '#6c757d',
        customClass: { popup: popupClass() },
      });
    },

    /**
     * 3. خطأ API
     * @param {string} message - رسالة الخطأ
     * @returns {Promise}
     */
    apiError: function (message) {
      var ar = isArabic();
      return Swal.fire({
        title: ar ? 'خطأ في الاتصال' : 'Connection Error',
        text: message || (ar ? 'حدث خطأ في الاتصال — حاول مرة أخرى' : 'A connection error occurred — please try again'),
        icon: 'error',
        confirmButtonText: ar ? 'حسناً' : 'OK',
        confirmButtonColor: '#A32D2D',
        customClass: { popup: popupClass() },
      });
    },

    /**
     * 4. نتيجة Pass/Fail
     * @param {string} testName - اسم الاختبار
     * @param {'pass'|'fail'} result - النتيجة
     * @param {string} details - التفاصيل
     * @returns {Promise}
     */
    passResult: function (testName, result, details) {
      var ar = isArabic();
      var isPass = (result === 'pass' || result === 'Pass' || result === true);
      return Swal.fire({
        title: isPass ? '✅ Pass' : '❌ Fail',
        html: '<p style="direction:' + (ar ? 'rtl' : 'ltr') + '"><b>' + (testName || '') + '</b></p>' +
              '<p style="direction:' + (ar ? 'rtl' : 'ltr') + ';font-size:0.9rem;margin-top:8px">' + (details || '') + '</p>',
        icon: isPass ? 'success' : 'error',
        confirmButtonText: ar ? 'حسناً' : 'OK',
        confirmButtonColor: isPass ? '#0F6E56' : '#A32D2D',
        customClass: { popup: popupClass() },
      });
    },

    /**
     * 5. تأكيد الحذف
     * @param {string} itemName - اسم العنصر المراد حذفه
     * @returns {Promise}
     */
    confirmDelete: function (itemName) {
      var ar = isArabic();
      return Swal.fire({
        title: ar ? 'تأكيد الحذف' : 'Confirm Delete',
        text: ar
          ? 'هل أنت متأكد من حذف "' + (itemName || '') + '"؟'
          : 'Are you sure you want to delete "' + (itemName || '') + '"?',
        icon: 'warning',
        confirmButtonText: ar ? 'نعم، احذف' : 'Yes, Delete',
        cancelButtonText: ar ? 'إلغاء' : 'Cancel',
        showCancelButton: true,
        confirmButtonColor: '#A32D2D',
        cancelButtonColor: '#6c757d',
        customClass: { popup: popupClass() },
      });
    },

    /**
     * 6. Input Dialog — مدخل نصي
     * @param {string} title - عنوان النافذة
     * @param {string} placeholder - نص placeholder
     * @returns {Promise}
     */
    getInput: function (title, placeholder) {
      var ar = isArabic();
      return Swal.fire({
        title: title || (ar ? 'أدخل النص' : 'Enter Text'),
        input: 'text',
        inputPlaceholder: placeholder || '',
        confirmButtonText: ar ? 'تأكيد' : 'Confirm',
        cancelButtonText: ar ? 'إلغاء' : 'Cancel',
        showCancelButton: true,
        confirmButtonColor: '#7A1515',
        customClass: { popup: popupClass() },
        inputValidator: function (value) {
          if (!value || !value.trim()) {
            return ar ? 'هذا الحقل مطلوب' : 'This field is required';
          }
        },
      });
    },

    /**
     * 7. Rate Limit Dialog (429)
     * يظهر عند تجاوز حد الطلبات
     * @param {number} retryAfter - ثواني الانتظار
     * @returns {Promise}
     */
    rateLimitReached: function (retryAfter) {
      var ar = isArabic();
      var secs = retryAfter || 60;
      return Swal.fire({
        title: ar ? 'تم تجاوز الحد ⏳' : 'Rate Limit Reached ⏳',
        html: ar
          ? '<p style="direction:rtl">لقد تجاوزت الحد المسموح به من الطلبات.</p>' +
            '<p style="direction:rtl;color:#666;font-size:0.88rem">انتظر <b>' + secs + '</b> ثانية ثم حاول مجدداً.</p>'
          : '<p>You have exceeded the allowed request limit.</p>' +
            '<p style="color:#666;font-size:0.88rem">Please wait <b>' + secs + '</b> seconds before trying again.</p>',
        icon: 'warning',
        confirmButtonText: ar ? 'حسناً' : 'OK',
        confirmButtonColor: '#854F0B',
        customClass: { popup: popupClass() },
        timer: secs * 1000,
        timerProgressBar: true,
      });
    },

    /**
     * 8. Offline Warning
     * يظهر عند فقدان الاتصال
     * @returns {Promise}
     */
    offlineWarning: function () {
      var ar = isArabic();
      return Swal.fire({
        title: ar ? 'غير متصل 📶' : 'No Internet 📶',
        text: ar
          ? 'أنت غير متصل بالإنترنت — بعض الميزات غير متاحة في وضع Offline.'
          : 'You are offline — some features are not available in offline mode.',
        icon: 'warning',
        confirmButtonText: ar ? 'حسناً' : 'OK',
        confirmButtonColor: '#854F0B',
        customClass: { popup: popupClass() },
      });
    },

    /**
     * 9. Success Notification
     * @param {string} title
     * @param {string} text
     * @returns {Promise}
     */
    success: function (title, text) {
      var ar = isArabic();
      return Swal.fire({
        title: title || (ar ? 'تم بنجاح ✅' : 'Success ✅'),
        text: text || '',
        icon: 'success',
        confirmButtonText: ar ? 'حسناً' : 'OK',
        confirmButtonColor: '#0F6E56',
        timer: 2500,
        timerProgressBar: true,
        customClass: { popup: popupClass() },
      });
    },

    /**
     * 10. QCS Reference Disclaimer
     * يظهر مع نتائج AI — يُذكّر المستخدم بمرجع QCS
     * @param {string} clause - رقم البند/القسم
     * @returns {Promise}
     */
    qcsDisclaimer: function (clause) {
      var ar = isArabic();
      return Swal.fire({
        title: ar ? 'تنبيه مرجعي 📋' : 'Reference Notice 📋',
        html: ar
          ? '<p style="direction:rtl">هذه النتيجة مستندة إلى <b>QCS 2024</b>' +
            (clause ? ' — القسم: <b>' + clause + '</b>' : '') + '.</p>' +
            '<p style="direction:rtl;color:#666;font-size:0.85rem">' +
            'تأكد من الرجوع إلى الوثيقة الرسمية قبل التطبيق الميداني.</p>'
          : '<p>This result is based on <b>QCS 2024</b>' +
            (clause ? ' — Section: <b>' + clause + '</b>' : '') + '.</p>' +
            '<p style="color:#666;font-size:0.85rem">' +
            'Always verify against the official document before field application.</p>',
        icon: 'info',
        confirmButtonText: ar ? 'فهمت' : 'Understood',
        confirmButtonColor: '#185FA5',
        customClass: { popup: popupClass() },
      });
    },
  };

  // ════════════════════════════════════════════════════
  //  Hook: استبدال showUpgradePrompt القديمة بـ SweetAlert2
  //  مع الإبقاء على السلوك الأصلي كـ fallback
  // ════════════════════════════════════════════════════
  function hookUpgradePrompt() {
    // [LEGACY] الدالة الأصلية موجودة في inline-scripts.js — نحتفظ بها
    if (typeof window._qs_legacy_showUpgradePrompt === 'undefined' &&
        typeof window.showUpgradePrompt === 'function') {
      window._qs_legacy_showUpgradePrompt = window.showUpgradePrompt;

      // نُعيد تعريفها بنسخة محسّنة بـ SweetAlert2
      window.showUpgradePrompt = function (feature, icon, title, desc, action) {
        // استخدم SweetAlert2 إذا كان Swal جاهزاً
        if (typeof Swal !== 'undefined') {
          var ar = isArabic();
          Swal.fire({
            title: (icon || '⭐') + ' ' + (title || (ar ? 'ميزة Pro حصرية' : 'Pro Feature')),
            html: '<p style="direction:' + (ar ? 'rtl' : 'ltr') + '">' + (desc || '') + '</p>',
            icon: 'info',
            confirmButtonText: ar ? 'ارقَ الآن 🚀' : 'Upgrade Now 🚀',
            cancelButtonText: ar ? 'لاحقاً' : 'Later',
            showCancelButton: true,
            confirmButtonColor: '#7A1515',
            cancelButtonColor: '#6c757d',
            customClass: { popup: popupClass() },
          }).then(function (result) {
            if (result.isConfirmed) {
              // شغّل الـ action المُمرّر (إذا وُجد) أو افتح Pro Modal
              if (typeof action === 'function') {
                action();
              } else if (typeof openProModal === 'function') {
                openProModal();
              } else {
                var m = document.getElementById('proModal');
                if (m) m.classList.add('open');
              }
            }
          });
        } else {
          // Fallback: الدالة الأصلية
          window._qs_legacy_showUpgradePrompt(feature, icon, title, desc, action);
        }
      };

      console.log('[QS Dialogs] showUpgradePrompt → SweetAlert2 ✅');
    }
  }

  // ════════════════════════════════════════════════════
  //  Hook: استبدال requirePro
  // ════════════════════════════════════════════════════
  function hookRequirePro() {
    if (typeof window._qs_legacy_requirePro === 'undefined' &&
        typeof window.requirePro === 'function') {
      window._qs_legacy_requirePro = window.requirePro; // [LEGACY]

      window.requirePro = function (feature, icon, title, desc, proceed) {
        if (typeof isProUser === 'function' && isProUser()) {
          if (typeof proceed === 'function') proceed();
          return true;
        }
        window.showUpgradePrompt(feature, icon, title, desc, proceed);
        return false;
      };

      console.log('[QS Dialogs] requirePro → SweetAlert2 ✅');
    }
  }

  // ════════════════════════════════════════════════════
  //  تصدير إلى window.QS
  // ════════════════════════════════════════════════════
  waitForSwal(function () {
    window.QS = window.QS || {};
    window.QS.dialogs = dialogs;
    hookUpgradePrompt();
    hookRequirePro();
    console.log('[QS Dialogs] ✅ نظام Dialogs جاهز — SweetAlert2 v11');
  });

})();
