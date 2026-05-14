/**
 * QatarSpec Pro — Core UI Utilities v1.1
 * الملف: js/core/ui-utils.js
 *
 * مهم: مُغلّف بـ IIFE لعزل _ESCAPE_MAP عن inline-scripts.js
 * (كلا الملفين يعرّفان ESCAPE_MAP — الـ IIFE يمنع تعارض const)
 */

(function () {
  'use strict';

  // محلية داخل IIFE — لا تتعارض مع const ESCAPE_MAP في inline-scripts.js
  var _ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  window.showToast = function showToast(msg, type, duration) {
    var t = document.getElementById('toast');
    if (!t) return;
    if (!type) {
      if (msg.startsWith('✅') || msg.startsWith('🎉')) type = 'success';
      else if (msg.startsWith('❌')) type = 'error';
      else if (msg.startsWith('⚠️')) type = 'warning';
      else type = 'info';
    }
    t.textContent = msg;
    t.className = 'toast-base show toast-' + type;
    if (t._toastTimer) clearTimeout(t._toastTimer);
    t._toastTimer = setTimeout(function () {
      t.className = 'toast-base';
      t._toastTimer = null;
    }, duration || (type === 'error' ? 4000 : 3000));
  };

  window.gv = function gv(id, def) {
    var el = document.getElementById(id);
    return el ? (el.value || def || '') : (def || '');
  };

  window.sanitizeText = function sanitizeText(str) {
    return String(str).replace(/[&<>"']/g, function (c) { return _ESCAPE_MAP[c]; });
  };

  window.renderMarkdownSafe = function renderMarkdownSafe(raw) {
    var escaped = window.sanitizeText(String(raw));
    var html = escaped
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold2)">$1</strong>')
      .replace(/^#{1,3}\s(.+)/gm, '<strong style="color:var(--gold2);font-size:15px">$1</strong>');
    return (typeof DOMPurify !== 'undefined') ? DOMPurify.sanitize(html) : html;
  };

  window.safeRender = function safeRender(container, markdown) {
    if (!container) return;
    container.innerHTML = '';
    var lines = String(markdown).split('\n');
    lines.forEach(function (line) {
      var p = document.createElement('p');
      var parts = line.split(/(\*\*.*?\*\*)/g);
      parts.forEach(function (part) {
        if (part.startsWith('**') && part.endsWith('**')) {
          var strong = document.createElement('strong');
          strong.textContent = part.slice(2, -2);
          p.appendChild(strong);
        } else {
          p.appendChild(document.createTextNode(part));
        }
      });
      container.appendChild(p);
    });
  };

  window.showSearchSkeleton = function showSearchSkeleton() {
    var out = document.getElementById('aiOutput');
    if (!out) return;
    out.style.display = 'block';
    out.innerHTML = '<div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text short"></div><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text short" style="margin-top:16px"></div>';
  };

  window.displayAIResponse = function displayAIResponse(text, container) {
    if (!container) container = document.getElementById('aiOutput');
    if (!container) return;
    var rendered;
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
      marked.setOptions({ breaks: true, gfm: true });
      rendered = DOMPurify.sanitize(marked.parse(String(text)));
    } else {
      rendered = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/^#{1,3} (.+)/gm, '<h4 style="color:var(--gold);margin:10px 0 4px;font-size:13px">$1</h4>')
        .replace(/^[-•] (.+)/gm, '<li style="margin:3px 0">$1</li>')
        .replace(/\n\n/g, '</p><p style="margin:5px 0">')
        .replace(/\n/g, '<br>');
    }
    rendered = rendered
      .replace(/\[QCS ([^\]]+)\]/g, '<span style="background:rgba(201,168,76,0.15);color:var(--gold);padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;margin:1px">📌 QCS $1</span>')
      .replace(/\[KAHRAMAA ([^\]]+)\]/g, '<span style="background:rgba(52,152,219,0.15);color:#3498db;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;margin:1px">⚡ KAHRAMAA $1</span>')
      .replace(/\[Ashghal ([^\]]+)\]/g, '<span style="background:rgba(231,76,60,0.15);color:#e74c3c;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;display:inline-block;margin:1px">🏗️ Ashghal $1</span>');
    container.innerHTML = '<p style="margin:0;line-height:1.7">' + rendered + '</p>';
    container.style.display = 'block';
  };

})();
