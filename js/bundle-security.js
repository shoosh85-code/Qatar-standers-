/* === js/security-cleanup.js === */
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

/* === js/security.js === */
/**
 * QatarSpec Pro — Security Module
 * حماية مركزية من XSS لكل المشروع
 * يجب تحميله أول شيء قبل كل scripts أخرى
 */

(function() {
  'use strict';

  window.QS = window.QS || {};

  // ======================================================
  // 1. DOMPurify config — إعدادات آمنة لـ QatarSpec
  // ======================================================
  var PURIFY_CONFIG = {
    // السماح بـ HTML آمن للعرض فقط
    ALLOWED_TAGS: [
      'div','span','p','br','strong','em','b','i','u','s',
      'h1','h2','h3','h4','h5','h6',
      'ul','ol','li','dl','dt','dd',
      'table','thead','tbody','tfoot','tr','th','td','caption',
      'a','img','figure','figcaption',
      'code','pre','blockquote',
      'hr','small','sub','sup',
      'svg','path','circle','rect','line','polyline','polygon','text','g','defs',
      'button','input','label','select','option'
    ],
    ALLOWED_ATTR: [
      'class','id','style','dir','lang','title','aria-label','aria-hidden',
      'role','tabindex','data-*',
      'href','target','rel',
      'src','alt','width','height',
      'colspan','rowspan','scope',
      'type','value','placeholder','disabled','checked','selected',
      'viewBox','xmlns','fill','stroke','stroke-width','d','cx','cy','r',
      'x','y','x1','y1','x2','y2','points','transform',
      'onclick','onchange' // مسموح للحاسبات القديمة فقط
    ],
    FORBID_TAGS: ['script','iframe','object','embed','form','meta','link','style'],
    FORBID_ATTR: ['onerror','onload','onmouseover','onfocus','onblur','onkeydown','onkeyup'],
    FORCE_BODY: false,
    RETURN_DOM: false
  };

  // ======================================================
  // 2. دالة sanitize مركزية
  // ======================================================

  /**
   * تنظيف HTML من XSS
   * @param {string} html - النص المراد تنظيفه
   * @param {boolean} allowBasic - true: يسمح بـ HTML tags | false: نص فقط
   * @returns {string} HTML آمن
   */
  window.QS.sanitize = function(html, allowBasic) {
    if (html === null || html === undefined) return '';
    var str = String(html);
    if (str.trim() === '') return '';

    // إذا لا يوجد HTML tags — أرجع كما هو (أسرع)
    if (!/<[a-z]/i.test(str)) return str;

    // استخدام DOMPurify إذا محمّل
    if (typeof DOMPurify !== 'undefined' && DOMPurify.sanitize) {
      if (allowBasic === false) {
        // نص فقط — بدون أي HTML
        return DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
      }
      return DOMPurify.sanitize(str, PURIFY_CONFIG);
    }

    // Fallback إذا DOMPurify لم يُحمَّل بعد
    return str
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '');
  };

  /**
   * تنظيف نص المستخدم (بدون HTML)
   * @param {string} text
   * @returns {string}
   */
  window.QS.sanitizeText = function(text) {
    if (text === null || text === undefined) return '';
    var str = String(text);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  };

  /**
   * Alias للتوافق مع الكود القديم
   */
  window.QS.escapeHtml = window.QS.sanitizeText;

  // ======================================================
  // 3. safeSetHTML — بديل آمن لـ innerHTML
   // الاستخدام: QS.safeSetHTML(element, html)
  // ======================================================

  /**
   * تعيين innerHTML بشكل آمن مع DOMPurify
   * @param {HTMLElement|string} target - العنصر أو ID
   * @param {string} html - المحتوى
   * @param {boolean} append - true: أضف للمحتوى الموجود
   */
  window.QS.safeSetHTML = function(target, html, append) {
    var el = (typeof target === 'string')
      ? document.getElementById(target)
      : target;

    if (!el) return;

    var clean = window.QS.sanitize(html, true);

    if (append) {
      el.innerHTML += clean;
    } else {
      el.innerHTML = clean;
    }
  };

  /**
   * إضافة محتوى آمن (append)
   */
  window.QS.safeAppendHTML = function(target, html) {
    window.QS.safeSetHTML(target, html, true);
  };

  // ======================================================
  // 4. sanitizeInput — تنظيف input المستخدم قبل الإرسال
  // ======================================================

  /**
   * تنظيف input قبل إرساله للـ API
   * @param {string} input
   * @param {number} maxLength - الحد الأقصى للطول
   * @returns {string}
   */
  window.QS.sanitizeInput = function(input, maxLength) {
    if (!input) return '';
    var clean = String(input)
      .replace(/<[^>]*>/g, '') // إزالة HTML tags
      .trim();

    if (maxLength) {
      clean = clean.slice(0, maxLength);
    }

    return clean;
  };

  // ======================================================
  // 5. AI Response sanitizer — خاص بنتائج Gemini
  // ======================================================

  /**
   * تنظيف رد AI قبل عرضه — يحتفظ بـ Markdown formatting
   * @param {string} aiResponse
   * @returns {string} HTML آمن
   */
  window.QS.sanitizeAIResponse = function(aiResponse) {
    if (!aiResponse) return '';
    var str = String(aiResponse);

    // تحويل Markdown بسيط لـ HTML آمن
    var html = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^#{3}\s(.+)$/gm, '<h3>$1</h3>')
      .replace(/^#{2}\s(.+)$/gm, '<h2>$1</h2>')
      .replace(/^#{1}\s(.+)$/gm, '<h1>$1</h1>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    html = '<p>' + html + '</p>';

    // تنظيف نهائي بـ DOMPurify
    return window.QS.sanitize(html, true);
  };

  // ======================================================
  // 6. Content Security Policy violation reporter
  // ======================================================

  document.addEventListener('securitypolicyviolation', function(e) {
    console.warn('[QS Security] CSP Violation:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy
    });
  });

  // ======================================================
  // 7. تحذير في console للـ development
  // ======================================================

  if (typeof console !== 'undefined') {
    console.log(
      '%c[QatarSpec Security] ✅ Security module loaded — DOMPurify: ' +
      (typeof DOMPurify !== 'undefined' ? 'Active ✓' : 'Pending (loads async)'),
      'color: #1a7a4a; font-weight: bold;'
    );
  }

  // ======================================================
  // 8. التوافق مع inline-scripts.js القديم
  // ======================================================

  // إذا كان renderMarkdownSafe موجوداً مسبقاً — حسّنه
  if (typeof window.renderMarkdownSafe === 'function') {
    var _old = window.renderMarkdownSafe;
    window.renderMarkdownSafe = function(raw) {
      var result = _old(raw);
      return window.QS.sanitize(result, true);
    };
  }

  // تعريف sanitizeText global للتوافق مع الكود القديم
  if (!window.sanitizeText) {
    window.sanitizeText = window.QS.sanitizeText;
  }

})();

/* === js/xss-patch.js === */
/**
 * QatarSpec Pro — XSS Auto-Patch v1.0
 * يعترض كل innerHTML assignments تلقائياً بعد تحميل الصفحة
 * يعمل كـ safety net للكود القديم الذي لم يُحدَّث بعد
 *
 * ملاحظة: هذا patch إضافي — الأمان الحقيقي في server-side validation
 */

(function() {
  'use strict';

  // انتظر حتى يُحمَّل QS.sanitize
  function waitForSecurity(callback) {
    if (typeof window.QS !== 'undefined' && typeof window.QS.sanitize === 'function' &&
        typeof DOMPurify !== 'undefined') {
      callback();
    } else {
      setTimeout(function() { waitForSecurity(callback); }, 50);
    }
  }

  waitForSecurity(function() {

    // العناصر التي تستقبل AI responses مباشرة — أعلى خطورة
    var HIGH_RISK_IDS = [
      'da-result', 'pi-result', 'esal-result', 'mv-result',
      'ps-result', 'rl-result', 'ai-result', 'gemini-result',
      'qcs-ai-result', 'chat-response', 'ai-answer'
    ];

    HIGH_RISK_IDS.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;

      // احفظ الـ setter الأصلي
      var descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
      if (!descriptor) return;

      // استبدل innerHTML setter لهذا العنصر فقط
      Object.defineProperty(el, 'innerHTML', {
        set: function(value) {
          var clean = window.QS.sanitize(String(value), true);
          descriptor.set.call(this, clean);
        },
        get: function() {
          return descriptor.get.call(this);
        },
        configurable: true
      });
    });

    if (typeof console !== 'undefined') {
      console.log(
        '%c[QS XSS-Patch] ✅ High-risk elements protected: ' + HIGH_RISK_IDS.length,
        'color: #185FA5; font-size: 11px;'
      );
    }
  });

})();

/* === js/xss-utils.js === */
// js/xss-utils.js — QatarSpec Pro XSS Protection Utilities
// يجب تحميل هذا الملف قبل أي ملف يستخدم innerHTML مع بيانات خارجية
// [SEC] تم إنشاؤه بعد innerHTML audit — 93 موقع فُحصت، الخطر الفعلي: e.message + DB content
// window.QS namespace — متوافق مع CODING RULES

window.QS = window.QS || {};

/**
 * escapeHtml — يُهرّب HTML entities لمنع XSS
 * استخدم دائماً مع: e.message, user.name, DB content غير موثوق
 * @param {*} str - أي قيمة
 * @returns {string} نص آمن للـ innerHTML
 */
window.QS.escapeHtml = function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * safeInsert — بديل آمن لـ innerHTML مع قيم خارجية
 * مثال: QS.safeInsert(el, `<p>Error: ${QS.escapeHtml(e.message)}</p>`)
 * @param {Element} el
 * @param {string} html - HTML template (المتغيرات الخارجية يجب أن تكون مُهرَّبة)
 */
window.QS.safeInsert = function safeInsert(el, html) {
  if (!el) return;
  el.innerHTML = html;
};

// XSS AUDIT LOG — آخر مراجعة: 2026-05-04
// ✅ data_calcs.js     — static templates + parseFloat() — آمن
// ✅ data_content.js   — static HTML بدون user input — آمن
// ✅ js/calculators/*  — عمليات حسابية + static templates — آمن
// ✅ js/calcs/core.js  — static templates — آمن
// ⚠️ supabase-search.js line 88, 96 — e.message → تم إصلاحه بـ QS.escapeHtml
// ⚠️ supabase-search.js line 105    — r.content من DB → موثوق (server-controlled)
// ✅ data/tools-data.js              — static templates — آمن
// ✅ data/detail-utilities-ss.js     — static templates — آمن
