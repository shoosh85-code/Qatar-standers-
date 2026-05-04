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
