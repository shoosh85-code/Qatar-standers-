/**
 * js/partials-loader.js — QatarSpec Pro v3.0
 * Phase 3: Shell + Loader + Modals
 * يحمّل جميع الـ partials ديناميكياً عبر fetch()
 * الترتيب مهم: head → search-hub → groups → modals
 */

(function () {
  'use strict';

  /* ── قائمة الـ partials بالترتيب ───────────────────────── */
  const PARTIALS = [
    { id: 'partial-head',             src: '/partials/head.html' },
    { id: 'partial-search-hub',       src: '/partials/search-hub.html' },
    { id: 'partial-group-infra',      src: '/partials/group-infra.html' },
    { id: 'partial-group-structural', src: '/partials/group-structural.html' },
    { id: 'partial-group-calc',       src: '/partials/group-calc.html' },
    { id: 'partial-group-tools',      src: '/partials/group-tools.html' },
    { id: 'partial-modals',           src: '/partials/modals.html' },
  ];

  /* ── تحميل partial واحد ─────────────────────────────────── */
  async function loadPartial({ id, src }) {
    const container = document.getElementById(id);
    if (!container) {
      console.warn('[partials-loader] placeholder not found:', id);
      return;
    }
    try {
      const res = await fetch(src, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${src}`);
      const html = await res.text();
      container.innerHTML = html;
      container.removeAttribute('data-partial-pending');
      container.setAttribute('data-partial-loaded', 'true');
    } catch (err) {
      console.error('[partials-loader] فشل تحميل:', src, err);
      container.setAttribute('data-partial-error', err.message);
    }
  }

  /* ── تحميل الكل بالتوازي ────────────────────────────────── */
  async function loadAllPartials() {
    // تحميل head أولاً (يؤثر على الـ nav)، الباقي بالتوازي
    const [headPartial, ...rest] = PARTIALS;
    await loadPartial(headPartial);
    await Promise.all(rest.map(loadPartial));

    // إطلاق حدث عند اكتمال التحميل
    document.dispatchEvent(new CustomEvent('partials:loaded', { bubbles: true }));
    console.info('[partials-loader] ✅ كل الـ partials محمّلة');
  }

  /* ── تشغيل عند جاهزية DOM ───────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllPartials);
  } else {
    loadAllPartials();
  }

})();
