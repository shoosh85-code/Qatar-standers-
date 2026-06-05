/**
 * QatarSpec Pro — Guided Tour System
 * PROMPT #1: Driver.js Welcome Tour للمستخدم الجديد
 * ملف: js/guided-tour.js
 * المكتبة: Driver.js v1.3.1 (self-hosted في /lib/vendor/)
 */

'use strict';

(function () {
  // ═══════════════════════════════════════════════════════════════
  // 1. CSS Overrides — ألوان البراند
  // ═══════════════════════════════════════════════════════════════
  (function injectTourStyles() {
    if (document.getElementById('qs-guided-tour-css')) return;
    var style = document.createElement('style');
    style.id = 'qs-guided-tour-css';
    style.textContent = [
      '/* Driver.js QatarSpec Brand Overrides */',
      '.driver-popover { background: #1a1a2e !important; border: 1px solid rgba(201,168,76,0.4) !important; border-radius: 16px !important; box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important; font-family: "Tajawal", "Cairo", sans-serif !important; max-width: 340px !important; }',
      '.driver-popover-title { color: #C9A84C !important; font-size: 16px !important; font-weight: 700 !important; margin-bottom: 6px !important; }',
      '.driver-popover-description { color: #e0e0e0 !important; font-size: 14px !important; line-height: 1.7 !important; }',
      '.driver-popover-progress-text { color: #888 !important; font-size: 12px !important; }',
      '.driver-popover-navigation-btns { gap: 8px !important; }',
      '.driver-popover-next-btn { background: linear-gradient(135deg, #7A1515, #9B2C2C) !important; color: #fff !important; border: none !important; border-radius: 8px !important; padding: 8px 20px !important; font-family: "Tajawal", sans-serif !important; font-weight: 700 !important; font-size: 13px !important; cursor: pointer !important; text-shadow: none !important; }',
      '.driver-popover-prev-btn { background: transparent !important; color: #C9A84C !important; border: 1px solid rgba(201,168,76,0.3) !important; border-radius: 8px !important; padding: 8px 16px !important; font-family: "Tajawal", sans-serif !important; font-weight: 600 !important; font-size: 13px !important; cursor: pointer !important; text-shadow: none !important; }',
      '.driver-popover-close-btn { color: #888 !important; }',
      '.driver-popover-close-btn:hover { color: #e74c3c !important; }',
      '.driver-popover-arrow-side-left .driver-popover-arrow, .driver-popover-arrow-side-right .driver-popover-arrow, .driver-popover-arrow-side-top .driver-popover-arrow, .driver-popover-arrow-side-bottom .driver-popover-arrow { border-color: #1a1a2e !important; }',
      '/* RTL Support */',
      '[dir="rtl"] .driver-popover { direction: rtl !important; text-align: right !important; }',
      '[dir="rtl"] .driver-popover-navigation-btns { flex-direction: row-reverse !important; }',
      '/* Tour restart button in settings */',
      '.qs-tour-restart-btn { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); border-radius: 10px; cursor: pointer; font-family: "Tajawal", sans-serif; font-size: 13px; font-weight: 600; color: var(--text2, #ccc); transition: all 0.2s; }',
      '.qs-tour-restart-btn:hover { background: rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.4); color: #C9A84C; }'
    ].join('\n');
    document.head.appendChild(style);
  })();

  // ═══════════════════════════════════════════════════════════════
  // 2. بيانات الجولة — ثنائي اللغة
  // ═══════════════════════════════════════════════════════════════
  var TOUR_STEPS = {
    ar: [
      {
        element: '.search-section',
        popover: {
          title: '🔍 البحث الذكي بالذكاء الاصطناعي',
          description: 'اكتب أي سؤال هندسي باللغة العربية أو الإنجليزية — يبحث في QCS 2024 الرسمي ويعطيك الإجابة فوراً مع رقم القسم والبند.',
          position: 'bottom'
        }
      },
      {
        element: '#group-infra',
        popover: {
          title: '📚 111+ قسم ومرجع هندسي',
          description: 'كل المواصفات القطرية مرتبة: طرق، مرافق، إنشائي، جيوتقني، KAHRAMAA، وأكثر. انقر على أي بطاقة لاستكشاف المحتوى الكامل.',
          position: 'top'
        }
      },
      {
        element: '#group-calc',
        popover: {
          title: '🧮 50+ حاسبة Pass/Fail',
          description: 'أدخل نتيجة أي اختبار ميداني — تحصل فوراً على PASS أو FAIL مع المرجع الدقيق من QCS 2024. وحدات قطرية ومعايير Ashghal.',
          position: 'top'
        }
      },
      {
        element: '#uploadZone',
        popover: {
          title: '📤 رفع وتحليل المستندات',
          description: 'ارفع ملفات PDF للمواصفات أو المخططات — يحللها الذكاء الاصطناعي ويربطها بمتطلبات QCS 2024. يدعم تصدير PDF و Word و Excel بتنسيق Ashghal الرسمي.',
          position: 'bottom'
        }
      },
      {
        element: '#proStatusBadge',
        popover: {
          title: '⭐ ارقَ لـ QatarSpec Pro',
          description: 'بحث غير محدود، تحليل مستندات، ITP احترافي، تصدير بتنسيق Ashghal الرسمي — كل ما يحتاجه المهندس المحترف في قطر.',
          position: 'bottom-left'
        }
      }
    ],
    en: [
      {
        element: '.search-section',
        popover: {
          title: '🔍 AI-Powered Smart Search',
          description: 'Ask any engineering question in Arabic or English — searches official QCS 2024 and gives you instant answers with exact section and clause references.',
          position: 'bottom'
        }
      },
      {
        element: '#group-infra',
        popover: {
          title: '📚 111+ Engineering Sections',
          description: 'All Qatar specifications organized: Roads, Utilities, Structural, Geotechnical, KAHRAMAA, and more. Click any card to explore the full content.',
          position: 'top'
        }
      },
      {
        element: '#group-calc',
        popover: {
          title: '🧮 50+ Pass/Fail Calculators',
          description: 'Enter any field test result — get instant PASS or FAIL with exact QCS 2024 reference. Qatari units and Ashghal standards built in.',
          position: 'top'
        }
      },
      {
        element: '#uploadZone',
        popover: {
          title: '📤 Upload & Analyze Documents',
          description: 'Upload specification PDFs or drawings — AI analyzes them against QCS 2024 requirements. Export to PDF, Word, or Excel in official Ashghal format.',
          position: 'bottom'
        }
      },
      {
        element: '#proStatusBadge',
        popover: {
          title: '⭐ Upgrade to QatarSpec Pro',
          description: 'Unlimited search, document analysis, professional ITP, official Ashghal export formats — everything a professional engineer in Qatar needs.',
          position: 'bottom-left'
        }
      }
    ]
  };

  // ═══════════════════════════════════════════════════════════════
  // 3. محرك الجولة
  // ═══════════════════════════════════════════════════════════════
  var STORAGE_KEY = 'qs_tour_completed';

  function getLang() {
    return (localStorage.getItem('qsp_lang') || document.documentElement.lang || 'ar') === 'en' ? 'en' : 'ar';
  }

  function getSteps() {
    var lang = getLang();
    var steps = TOUR_STEPS[lang] || TOUR_STEPS.ar;
    // تصفية الخطوات — فقط العناصر الموجودة في DOM
    return steps.filter(function (step) {
      return document.querySelector(step.element);
    });
  }

  function startTour(force) {
    // تحقق من وجود Driver.js
    if (typeof window.driver === 'undefined' && typeof window.Driver === 'undefined') {
      console.warn('[QS Tour] Driver.js غير محمّل — تأكد من /lib/vendor/driver.js.iife.js');
      return;
    }

    var steps = getSteps();
    if (steps.length === 0) {
      console.warn('[QS Tour] لا توجد عناصر مطابقة للجولة في DOM');
      return;
    }

    var lang = getLang();
    var isRTL = lang === 'ar';

    // استخدم الـ API الصحيح حسب إصدار Driver.js
    var DriverClass = window.driver && window.driver.js ? window.driver.js.driver : (window.Driver || null);

    if (!DriverClass) {
      // محاولة أخيرة — Driver.js v1.x IIFE يضع driver على window
      if (typeof window.driver === 'function') {
        DriverClass = window.driver;
      } else {
        console.warn('[QS Tour] لم يتم العثور على Driver constructor');
        return;
      }
    }

    var driverInstance = DriverClass({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      stagePadding: 8,
      stageRadius: 12,
      popoverOffset: 12,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: isRTL ? 'التالي ←' : 'Next →',
      prevBtnText: isRTL ? '→ السابق' : '← Previous',
      doneBtnText: isRTL ? '✅ إنهاء' : '✅ Done',
      progressText: isRTL ? '{{current}} من {{total}}' : '{{current}} of {{total}}',
      onDestroyStarted: function () {
        // حفظ إن المستخدم أنهى أو تخطى الجولة
        try { localStorage.setItem(STORAGE_KEY, 'true'); } catch (e) { /* private mode */ }
        if (driverInstance && driverInstance.destroy) driverInstance.destroy();
      },
      steps: steps
    });

    driverInstance.drive();
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. تشغيل تلقائي أول مرة
  // ═══════════════════════════════════════════════════════════════
  function autoStart() {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return; // شافها قبل كذا
    } catch (e) { return; /* private mode */ }

    // تأخير لحين اكتمال تحميل الصفحة + الأنيميشن + onboarding modal
    setTimeout(function () {
      // انتظر إغلاق الـ onboarding modal أولاً
      var obModal = document.getElementById('onboarding-modal');
      if (obModal && obModal.style.display !== 'none' && obModal.classList.contains('visible')) {
        // الـ onboarding شغال — ابدأ بعد إغلاقه
        var observer = new MutationObserver(function() {
          if (!obModal.classList.contains('visible')) {
            observer.disconnect();
            setTimeout(function(){ startTour(false); }, 800);
          }
        });
        observer.observe(obModal, { attributes: true, attributeFilter: ['class', 'style'] });
      } else {
        startTour(false);
      }
    }, 3500);
  }

  // شغّل بعد DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoStart);
  } else {
    autoStart();
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. API عامة — إعادة تشغيل الجولة
  // ═══════════════════════════════════════════════════════════════
  window.QS = window.QS || {};
  window.QS.restartTour = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* */ }
    startTour(true);
  };

  // ═══════════════════════════════════════════════════════════════
  // 6. إضافة زر "جولة تعريفية" في الـ header
  // ═══════════════════════════════════════════════════════════════
  function injectTourButton() {
    var headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;

    // تحقق إنه مش موجود بالفعل
    if (document.getElementById('qs-tour-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'qs-tour-btn';
    btn.className = 'qs-tour-restart-btn';
    btn.setAttribute('title', 'جولة تعريفية');
    btn.setAttribute('aria-label', 'إعادة تشغيل الجولة التعريفية');
    btn.innerHTML = '🎯';
    btn.style.cssText = 'background:none;border:none;font-size:18px;cursor:pointer;padding:4px 8px;border-radius:8px;transition:transform 0.2s;';
    btn.addEventListener('click', function () {
      window.QS.restartTour();
    });
    btn.addEventListener('mouseenter', function () { btn.style.transform = 'scale(1.15)'; });
    btn.addEventListener('mouseleave', function () { btn.style.transform = 'scale(1)'; });

    // أضف قبل الزر الأول في header-actions
    headerActions.insertBefore(btn, headerActions.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTourButton);
  } else {
    injectTourButton();
  }

  console.log('[QS Guided Tour] ✅ محمّل — QS.restartTour() لإعادة التشغيل');
})();
