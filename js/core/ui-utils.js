/**
 * QatarSpec Pro — Core UI Utilities v1.0
 * الملف: js/core/ui-utils.js
 *
 * الوظيفة: الدوال المشتركة الأكثر استخداماً في التطبيق
 * المصدر: مُستخرج من inline-scripts.js (الأسطر 1324-1420, 2293, 4439, 4480)
 *
 * القواعد:
 * - هذا الملف مستقل 100% — لا يعتمد على أي ملف آخر
 * - يجب تحميله قبل inline-scripts.js في index.html
 * - كل الدوال على window scope لأن HTML يستدعيها بالاسم
 * - لا يحذف الدوال من inline-scripts.js في هذه المرحلة
 *
 * الإحصائيات:
 * - showToast: 96 مرجع في المشروع
 * - gv: 70 مرجع في المشروع
 */

'use strict';

// ─── ESCAPE_MAP: خريطة تهريب HTML ─────────────────────────────
/**
 * خريطة المحارف الخطرة التي يجب تهريبها في innerHTML
 * مستخرجة من inline-scripts.js سطر 1351
 */
const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

// ─── showToast: إشعارات Toast ─────────────────────────────────
/**
 * showToast — يعرض إشعار toast للمستخدم
 * مستخرج من inline-scripts.js سطر 1324
 * @param {string} msg - نص الإشعار
 * @param {string} [type] - نوع الإشعار: success/error/warning/info
 * @param {number} [duration] - مدة الظهور بالمللي ثانية
 */
window.showToast = function showToast(msg, type, duration) {
  const t = document.getElementById('toast');
  if (!t) return;
  // تحديد النوع تلقائياً من بادئة الرسالة إذا لم يُحدد
  if (!type) {
    if (msg.startsWith('✅') || msg.startsWith('🎉')) type = 'success';
    else if (msg.startsWith('❌')) type = 'error';
    else if (msg.startsWith('⚠️')) type = 'warning';
    else type = 'info';
  }
  t.textContent = msg;
  t.className = 'toast-base show toast-' + type;
  if (t._toastTimer) clearTimeout(t._toastTimer);
  t._toastTimer = setTimeout(() => {
    t.className = 'toast-base';
    t._toastTimer = null;
  }, duration || (type === 'error' ? 4000 : 3000));
};

// ─── gv: اختصار getElementById + value ────────────────────────
/**
 * gv — يجلب قيمة عنصر بـ ID (اختصار للـ getElementById)
 * مستخرج من inline-scripts.js سطر 2293
 * الأكثر استخداماً في حاسبات QCS
 * @param {string} id - ID العنصر
 * @param {string} [def] - القيمة الافتراضية إذا لم يوجد العنصر
 * @returns {string} - قيمة العنصر أو القيمة الافتراضية
 */
window.gv = function gv(id, def) {
  const el = document.getElementById(id);
  return el ? (el.value || def || '') : (def || '');
};

// ─── sanitizeText: تهريب HTML ─────────────────────────────────
/**
 * sanitizeText — يحوّل نص المستخدم إلى نص آمن للإدراج في innerHTML
 * يستخدم regex-based escape (أسرع من textContent trick)
 * مستخرج من inline-scripts.js سطر 1365
 * @param {string} str - النص الخام من المستخدم أو API
 * @returns {string} - HTML-escaped string آمن
 * مثال: sanitizeText('<'+'script>') → '&lt;script&gt;'
 */
window.sanitizeText = function sanitizeText(str) {
  return String(str).replace(/[&<>"']/g, c => ESCAPE_MAP[c]);
};

// ─── renderMarkdownSafe: عرض Markdown آمن ─────────────────────
/**
 * renderMarkdownSafe — يُحوّل نص Markdown إلى HTML آمن تماماً
 * الخطوات بالترتيب:
 *   1. sanitizeText() — يُهرّب & < > " ' كلها
 *   2. \n → <br>   — يحافظ على فواصل الأسطر
 *   3. **bold** → <strong> — بعد الـ escaping لضمان عدم XSS
 *   4. ### heading → <strong class="qs-heading">
 * مستخرج من inline-scripts.js سطر 1380
 * @param {string} raw - نص خام من API أو مستخدم
 * @returns {string} - HTML آمن للإدراج في innerHTML
 */
window.renderMarkdownSafe = function renderMarkdownSafe(raw) {
  // الخطوة 1: تهريب كامل لكل محارف HTML الخطرة
  const escaped = window.sanitizeText(String(raw));
  // الخطوة 2-4: تحويل Markdown إلى HTML (بعد escaping — آمن)
  const html = escaped
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold2)">$1</strong>')
    .replace(/^#{1,3}\s(.+)/gm, '<strong style="color:var(--gold2);font-size:15px">$1</strong>');
  // الخطوة 5: DOMPurify — طبقة حماية نهائية إذا متاح
  return (typeof DOMPurify !== 'undefined') ? DOMPurify.sanitize(html) : html;
};

// ─── safeRender: عرض آمن لـ markdown داخل عنصر DOM ───────────
/**
 * safeRender — يعرض نص markdown بشكل آمن داخل container
 * يستخدم DOM construction حقيقي — لا innerHTML، لا XSS ممكن
 * مستخرج من inline-scripts.js سطر 1402
 * @param {Element} container - عنصر DOM للعرض فيه
 * @param {string} markdown - نص خام من API أو مستخدم
 */
window.safeRender = function safeRender(container, markdown) {
  if (!container) return;
  // DOM construction حقيقي — لا innerHTML، لا XSS ممكن
  container.innerHTML = '';
  const lines = String(markdown).split('\n');
  lines.forEach(line => {
    const p = document.createElement('p');
    const parts = line.split(/(\*\*.*?\*\*)/g);
    parts.forEach(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const strong = document.createElement('strong');
        strong.textContent = part.slice(2, -2);
        p.appendChild(strong);
      } else {
        p.appendChild(document.createTextNode(part));
      }
    });
    container.appendChild(p);
  });
};

// ─── showSearchSkeleton: تحميل هيكل البحث ────────────────────
/**
 * showSearchSkeleton — يعرض skeleton loading لنتائج البحث
 * مستخرج من inline-scripts.js سطر 4439
 */
window.showSearchSkeleton = function showSearchSkeleton() {
  const out = document.getElementById('aiOutput');
  if (!out) return;
  out.style.display = 'block';
  out.innerHTML = '<div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text short"></div><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text short" style="margin-top:16px"></div>';
};

// ─── displayAIResponse: عرض إجابة AI مع badges ────────────────
/**
 * displayAIResponse — يعرض استجابة AI مع citation badges لـ QCS/KAHRAMAA/Ashghal
 * يدعم marked.js + DOMPurify إذا متاحين — fallback للكود القديم
 * مستخرج من inline-scripts.js سطر 4480
 * @param {string} text - نص استجابة AI
 * @param {Element} [container] - عنصر DOM (افتراضي: #aiOutput)
 */
window.displayAIResponse = function displayAIResponse(text, container) {
  if (!container) {
    container = document.getElementById('aiOutput');
  }
  if (!container) return;

  var rendered;

  // Enhanced: marked.js + DOMPurify إذا متاحين — fallback للكود القديم
  if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
    marked.setOptions({ breaks: true, gfm: true });
    rendered = DOMPurify.sanitize(marked.parse(String(text)));
  } else {
    // Fallback — الكود القديم يعمل إذا CDN فشل
    rendered = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^#{1,3} (.+)/gm, '<h4 style="color:var(--gold);margin:10px 0 4px;font-size:13px">$1</h4>')
      .replace(/^[-•] (.+)/gm, '<li style="margin:3px 0">$1</li>')
      .replace(/\n\n/g, '</p><p style="margin:5px 0">')
      .replace(/\n/g, '<br>');
  }

  // QCS/KAHRAMAA/Ashghal citation badges — تعمل مع أي renderer
  rendered = rendered
    .replace(/\[QCS ([^\]]+)\]/g, '<span style="background:rgba(201,168,76,0.15);color:var(--gold);padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;margin:1px">📌 QCS $1</span>')
    .replace(/\[KAHRAMAA ([^\]]+)\]/g, '<span style="background:rgba(52,152,219,0.15);color:#3498db;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;margin:1px">⚡ KAHRAMAA $1</span>')
    .replace(/\[Ashghal ([^\]]+)\]/g, '<span style="background:rgba(231,76,60,0.15);color:#e74c3c;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;margin:1px">🏗️ Ashghal $1</span>');

  container.innerHTML = '<p style="margin:0;line-height:1.7">' + rendered + '</p>';
  container.style.display = 'block';
};
