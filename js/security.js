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
