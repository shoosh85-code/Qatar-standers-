/**
 * QatarSpec Pro — Theme Management v1.0
 * الملف: js/core/theme.js
 *
 * الدوال: toggleTheme, applyTheme, initTheme
 * المصدر: مُستخرج من inline-scripts.js (الأسطر 4345-4375)
 *
 * ميزة إضافية: تُحمَّل قبل inline-scripts.js فتُطبَّق الثيم مبكراً
 * وتمنع "وميض" اللون الافتراضي عند تحميل الصفحة
 */

(function () {
  'use strict';

  window.applyTheme = function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else if (theme === 'system') {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
  };

  window.toggleTheme = function toggleTheme() {
    var current = localStorage.getItem('qs_theme') || 'dark';
    var next = current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark';
    localStorage.setItem('qs_theme', next);
    window.applyTheme(next);
    var labels = { dark: '🌙 وضع ليلي', light: '☀️ وضع نهاري', system: '🖥️ وضع النظام' };
    // showToast قد لا تكون محمّلة بعد إذا استُدعيت مبكراً — نتحقق أولاً
    if (typeof window.showToast === 'function') {
      window.showToast(labels[next] || 'تم تغيير المظهر');
    }
  };

  // تطبيق الثيم فوراً عند تحميل الملف (قبل DOMContentLoaded)
  // يمنع "وميض" اللون الافتراضي
  (function initTheme() {
    var saved = localStorage.getItem('qs_theme') || 'dark';
    window.applyTheme(saved);
  })();

  // مزامنة مع إعدادات النظام عند تغييرها
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (localStorage.getItem('qs_theme') === 'system') {
      window.applyTheme('system');
    }
  });

})();
