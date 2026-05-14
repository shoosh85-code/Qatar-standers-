/**
 * QatarSpec Pro — Tooltip System (Tippy.js v6.3.7)
 * المكتبة: tippy-bundle.umd.min.js من cdnjs (محمّلة في index.html)
 * النمط: qatarspec — ثنائي اللغة — RTL
 * المبدأ: تثقيف المستخدم على كل عنصر + ربط ديناميكي عبر MutationObserver
 */

(function () {
  'use strict';

  // ─── CSS Theme Injection ─────────────────────────────────────────────────
  const THEME_CSS = `
    .tippy-box[data-theme~='qatarspec'] {
      background-color: #2C2C2A;
      color: #F1EFE8;
      font-family: 'Tajawal', sans-serif;
      font-size: 13px;
      direction: rtl;
      border-radius: 8px;
      padding: 4px 2px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.35);
      line-height: 1.5;
    }
    .tippy-box[data-theme~='qatarspec'] .tippy-arrow {
      color: #2C2C2A;
    }
    .tippy-box[data-theme~='qatarspec'] .tippy-content {
      padding: 6px 10px;
    }
    .tippy-box[data-theme~='qatarspec'] .qs-tip-title {
      font-weight: 700;
      color: #C9A84C;
      display: block;
      margin-bottom: 2px;
    }
    .tippy-box[data-theme~='qatarspec'] .qs-tip-ref {
      font-size: 11px;
      color: #7DCEAF;
      display: block;
      margin-top: 3px;
      direction: ltr;
    }
    .tippy-box[data-theme~='qatarspec'][data-placement^='top'] .tippy-arrow::before {
      border-top-color: #2C2C2A;
    }
    .tippy-box[data-theme~='qatarspec'][data-placement^='bottom'] .tippy-arrow::before {
      border-bottom-color: #2C2C2A;
    }
  `;

  function injectCSS() {
    if (document.getElementById('qs-tippy-theme')) return;
    const style = document.createElement('style');
    style.id = 'qs-tippy-theme';
    style.textContent = THEME_CSS;
    document.head.appendChild(style);
  }

  // ─── Language Helper ──────────────────────────────────────────────────────
  function isArabic() {
    // تحقق من حالة اللغة في التطبيق
    try {
      if (window.QS && window.QS.lang) return window.QS.lang === 'ar';
      if (window.currentLang) return window.currentLang === 'ar';
    } catch (e) { /* تجاهل */ }
    return document.documentElement.lang !== 'en';
  }

  function t(ar, en) {
    return isArabic() ? ar : en;
  }

  // ─── HTML Tooltip Builder ─────────────────────────────────────────────────
  function tip(title, body, ref) {
    let html = `<span class="qs-tip-title">${title}</span>${body}`;
    if (ref) html += `<span class="qs-tip-ref">${ref}</span>`;
    return html;
  }

  // ─── Default Props ────────────────────────────────────────────────────────
  function initDefaults() {
    if (typeof tippy === 'undefined') return;
    tippy.setDefaultProps({
      theme: 'qatarspec',
      placement: 'top',
      animation: 'fade',
      duration: [200, 150],
      delay: [300, 0],
      maxWidth: 280,
      allowHTML: true,
      arrow: true,
    });
  }

  // ─── Static Tooltips (عناصر ثابتة في index.html) ─────────────────────────
  function applyStaticTooltips() {
    if (typeof tippy === 'undefined') return;

    const definitions = [
      // شريط البحث
      {
        selector: '#searchInput',
        content: tip(
          t('البحث الذكي 🔍', 'Smart Search 🔍'),
          t(
            'اكتب سؤالك بالعربي أو الإنجليزي — الذكاء الاصطناعي يبحث في QCS 2024 ويعطيك إجابة دقيقة مع رقم البند',
            'Type in Arabic or English — AI searches QCS 2024 and returns exact clause references'
          ),
          'QCS 2024 · Gemini AI'
        ),
        options: { placement: 'bottom' }
      },

      // زر البحث
      {
        selector: '[data-action="doSearch"]',
        content: tip(
          t('بحث ذكي ⚡', 'Smart Search ⚡'),
          t('اضغط أو اكتب Enter للبحث الفوري', 'Click or press Enter for instant search'),
          'AI-Powered · QCS 2024'
        ),
        options: {}
      },

      // زر الوضع الليلي
      {
        selector: '#darkModeBtn',
        content: tip(
          t('الوضع الليلي 🌙', 'Dark Mode 🌙'),
          t('تبديل بين الوضع الليلي والنهاري', 'Toggle between dark and light mode'),
          null
        ),
        options: { placement: 'bottom' }
      },

      // شارة Pro / الترقية
      {
        selector: '#proStatusBadge',
        content: tip(
          t('QatarSpec Pro ⭐', 'QatarSpec Pro ⭐'),
          t(
            'بحث غير محدود + تصدير PDF/Excel + AI متقدم + كل الميزات — 99 ر.ق/شهر',
            'Unlimited search + PDF/Excel export + Advanced AI + All features — 99 QAR/month'
          ),
          t('انقر للترقية', 'Click to upgrade')
        ),
        options: { placement: 'bottom' }
      },

      // أزرار اللغة
      {
        selector: '#btn-ar',
        content: tip(
          'العربية 🇶🇦',
          t('تبديل واجهة التطبيق للعربية', 'Switch interface to Arabic'),
          null
        ),
        options: { placement: 'bottom' }
      },
      {
        selector: '#btn-en',
        content: tip(
          'English 🌐',
          t('Switch interface to English', 'Switch interface to English'),
          null
        ),
        options: { placement: 'bottom' }
      },

      // تصدير PDF
      {
        selector: '[data-action="exportPDF"]',
        content: tip(
          t('تصدير PDF 📄', 'Export PDF 📄'),
          t(
            'تصدير النتائج بتنسيق PDF احترافي — متوافق مع متطلبات Ashghal',
            'Export results as professional PDF — Ashghal-compliant format'
          ),
          t('تنسيق رسمي + ترويسة QatarSpec Pro', 'Official format + QatarSpec Pro header')
        ),
        options: {}
      },

      // تصدير Word
      {
        selector: '[data-action="exportWord"]',
        content: tip(
          t('تصدير Word 📝', 'Export Word 📝'),
          t(
            'تصدير كـ Word قابل للتعديل — مع حقول المشروع والمهندس وتاريخ الإصدار',
            'Export as editable Word file — with project, engineer & date fields'
          ),
          t('قابل للتعديل + مرجع QCS', 'Editable + QCS clause reference')
        ),
        options: {}
      },

      // منطقة رفع الملفات
      {
        selector: '#uploadZone',
        content: tip(
          t('رفع مستندات PDF 📤', 'Upload PDF Documents 📤'),
          t(
            'ارفع ملفات PDF لتحليلها بالذكاء الاصطناعي — اسحب وأفلت أو انقر لاختيار الملف',
            'Upload PDFs for AI analysis — drag & drop or click to select'
          ),
          t('يدعم: ITP, MOS, شروط العقد', 'Supports: ITP, MOS, Contract Specs')
        ),
        options: { placement: 'top' }
      },
    ];

    definitions.forEach(({ selector, content, options }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      // منع التكرار
      if (el._tippyInstance) return;
      const instance = tippy(el, {
        content,
        ...options,
      });
      el._tippyInstance = instance;
    });
  }

  // ─── Calculator Cards Tooltip ─────────────────────────────────────────────
  function applyCalcTooltips() {
    if (typeof tippy === 'undefined') return;
    const calcCards = document.querySelectorAll('.cat-card[data-type="calc"]');
    calcCards.forEach(card => {
      if (card._tippyInstance) return;
      const titleEl = card.querySelector('[data-ar]') || card.querySelector('.cat-title') || card;
      const cardName = titleEl.getAttribute('data-ar') || titleEl.textContent.trim().slice(0, 40);
      const instance = tippy(card, {
        content: tip(
          t('حاسبة QCS ✅', 'QCS Calculator ✅'),
          t(
            `${cardName} — أدخل القيم واحصل على نتيجة Pass/Fail فورية مع رقم بند QCS`,
            `${cardName} — Enter values and get instant Pass/Fail with QCS clause reference`
          ),
          'QCS 2024 · Pass/Fail'
        ),
        placement: 'top',
        delay: [500, 0],
      });
      card._tippyInstance = instance;
    });
  }

  // ─── Pro Lock Cards Tooltip ───────────────────────────────────────────────
  function applyProLockTooltips() {
    if (typeof tippy === 'undefined') return;
    const proCards = document.querySelectorAll('.cat-card[data-type="pro"]');
    proCards.forEach(card => {
      if (card._tippyInstance) return;
      const instance = tippy(card, {
        content: tip(
          t('ميزة Pro ⭐', 'Pro Feature ⭐'),
          t(
            'هذه الميزة متاحة لمشتركي Pro فقط — ارقَ الآن بـ 99 ر.ق/شهر',
            'This feature is for Pro subscribers only — Upgrade for 99 QAR/month'
          ),
          t('انقر لعرض تفاصيل الخطط', 'Click to view plan details')
        ),
        placement: 'top',
        delay: [400, 0],
      });
      card._tippyInstance = instance;
    });
  }

  // ─── QCS Reference Tooltips (data-qcs attribute) ─────────────────────────
  function applyQCSRefTooltips() {
    if (typeof tippy === 'undefined') return;
    const qcsEls = document.querySelectorAll('[data-qcs]');
    qcsEls.forEach(el => {
      if (el._tippyInstance) return;
      const ref = el.getAttribute('data-qcs');
      const instance = tippy(el, {
        content: tip(
          t('مرجع QCS 📋', 'QCS Reference 📋'),
          t(
            'هذا البند مستند إلى المواصفات القطرية 2024',
            'This clause is referenced from Qatar Construction Specifications 2024'
          ),
          ref
        ),
        placement: 'top',
        delay: [300, 0],
      });
      el._tippyInstance = instance;
    });
  }

  // ─── Dynamic Binding (MutationObserver للعناصر الديناميكية) ──────────────
  function initMutationObserver() {
    if (typeof tippy === 'undefined') return;
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(function (mutations) {
      let shouldReapply = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) { // Element node
              // تحقق إذا العنصر الجديد يحتاج tooltip
              if (
                node.matches('[data-qcs]') ||
                node.matches('.cat-card[data-type="calc"]') ||
                node.matches('.cat-card[data-type="pro"]') ||
                node.querySelector('[data-qcs]') ||
                node.querySelector('.cat-card')
              ) {
                shouldReapply = true;
              }
            }
          });
        }
      });
      if (shouldReapply) {
        applyQCSRefTooltips();
        applyCalcTooltips();
        applyProLockTooltips();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // ─── Modal Open Hook (ربط tooltips داخل modals عند فتحها) ────────────────
  function hookModalTooltips() {
    // استمع لفتح الـ detail modal
    document.addEventListener('qs:modal:open', function () {
      // أعد تطبيق على العناصر الجديدة
      setTimeout(function () {
        applyQCSRefTooltips();
      }, 300);
    });

    // fallback: استمع لأي تغيير في display style
    const detailModal = document.getElementById('detailModal') ||
                         document.querySelector('.detail-modal, .modal-overlay, [id*="modal"]');
    if (detailModal) {
      const modalObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.type === 'attributes' &&
              m.attributeName === 'style' &&
              detailModal.style.display !== 'none') {
            setTimeout(applyQCSRefTooltips, 300);
          }
          if (m.type === 'attributes' &&
              m.attributeName === 'class') {
            setTimeout(applyQCSRefTooltips, 300);
          }
        });
      });
      modalObserver.observe(detailModal, { attributes: true });
    }
  }

  // ─── Public API ───────────────────────────────────────────────────────────
  window.QS = window.QS || {};
  window.QS.tooltips = {
    /**
     * تطبيق tooltip على عنصر معين يدوياً
     * @param {Element|string} target - العنصر أو الـ selector
     * @param {string} content - محتوى الـ tooltip (HTML)
     * @param {object} [options] - خيارات Tippy إضافية
     */
    add: function (target, content, options) {
      if (typeof tippy === 'undefined') return null;
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return null;
      if (el._tippyInstance) {
        el._tippyInstance.setContent(content);
        return el._tippyInstance;
      }
      const instance = tippy(el, { content, ...options });
      el._tippyInstance = instance;
      return instance;
    },

    /**
     * إزالة tooltip من عنصر
     * @param {Element|string} target
     */
    remove: function (target) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el || !el._tippyInstance) return;
      el._tippyInstance.destroy();
      delete el._tippyInstance;
    },

    /**
     * إعادة تطبيق كل الـ tooltips (مفيد بعد تغيير اللغة)
     */
    refresh: function () {
      // أزل القديمة أولاً
      document.querySelectorAll('[data-tippy-content]').forEach(el => {
        if (el._tippyInstance) {
          el._tippyInstance.destroy();
          delete el._tippyInstance;
        }
      });
      // أعد التطبيق
      applyStaticTooltips();
      applyCalcTooltips();
      applyProLockTooltips();
      applyQCSRefTooltips();
    },

    /** بناء HTML لـ tooltip بعنوان ومرجع */
    build: tip,
  };

  // ─── تنفيذ عند تحميل الصفحة ───────────────────────────────────────────────
  function init() {
    if (typeof tippy === 'undefined') {
      // Tippy لم تُحمّل بعد — انتظر أكثر
      setTimeout(init, 500);
      return;
    }
    injectCSS();
    initDefaults();
    applyStaticTooltips();
    applyCalcTooltips();
    applyProLockTooltips();
    applyQCSRefTooltips();
    initMutationObserver();
    hookModalTooltips();

    // إعادة تطبيق عند تغيير اللغة
    document.addEventListener('qs:lang:change', window.QS.tooltips.refresh);
    document.addEventListener('languageChanged', window.QS.tooltips.refresh);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
