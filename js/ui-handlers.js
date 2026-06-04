// js/ui-handlers.js — QatarSpec Pro
// CSP fix: يحذف الحاجة لـ 'unsafe-inline' في script-src
// كل الـ onclick handlers أُزيلت من index.html وتُعالَج هنا
// لا تحذف محتوى — مضاف فقط

(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ── 1. عناصر بـ ID محدد ─────────────────────────────────── */
    function on(id, evt, fn) {
      var el = document.getElementById(id);
      if (el) el.addEventListener(evt, fn);
    }

    // Dark mode
    on('darkModeBtn', 'click', function () { if (typeof toggleTheme === 'function') toggleTheme(); });

    // Language buttons
    on('btn-ar', 'click', function () { if (window.QS) QS.setLang('ar'); });
    on('btn-en', 'click', function () { if (window.QS) QS.setLang('en'); });

    // Pro status badge → openProModal
    on('proStatusBadge', 'click', function () { if (typeof openProModal === 'function') openProModal(); });

    // PWA install
    on('pwaInstallBtn', 'click', function () { if (typeof installPWA === 'function') installPWA(); });

    // Back to top
    on('backToTopBtn', 'click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Card filter clear
    on('cardFilterClear', 'click', function () { if (window.QS) QS.clearCardFilter(); });

    // Detail modal close (background click)
    on('detailModal', 'click', function (e) { if (window.QS) QS.closeDetailModal(e); });

    // Back button in detail modal
    on('dmBackBtn', 'click', function () { if (window.QS) QS.goBack(); });

    // Pro modal close button
    on('proModalClose', 'click', function () { if (typeof closeProModal === 'function') closeProModal(); });

    // Upload zone
    on('uploadZone', 'click', function () {
      var fi = document.getElementById('fileInput');
      if (fi) fi.click();
    });

    /* ── 2. Key modal buttons ─────────────────────────────────── */
    on('keyModalSave',   'click', function () { if (window.QS) QS.saveKey(); });
    on('keyModalCancel', 'click', function () { if (window.QS) QS.closeKeyModal(); });

    /* ── 3. Event Delegation — document.body ─────────────────── */
    document.body.addEventListener('click', function (e) {
      var el = e.target;

      /* ── 3a. cat-card → openDetail ── */
      var card = el.closest('.cat-card[data-detail]');
      if (card) {
        if (window.QS) QS.openDetail(card.dataset.detail);
        return;
      }

      /* ── 3b. cat-card → navigate ── */
      var navCard = el.closest('.cat-card[data-href]');
      if (navCard) {
        window.location.href = navCard.dataset.href;
        return;
      }

      /* ── 3c. quick-tag ── */
      var tag = el.closest('.quick-tag[data-search]');
      if (tag) {
        if (window.QS) QS.quickSearch(tag.dataset.search);
        return;
      }

      /* ── 3d. data-action dispatcher ── */
      var btn = el.closest('[data-action]');
      if (!btn) return;

      var action = btn.dataset.action;
      var param  = btn.dataset.param || '';

      switch (action) {
        case 'openDetail':        if (window.QS) QS.openDetail(param); break;
        case 'navigate':          window.location.href = param; break;
        case 'quickSearch':       if (window.QS) QS.quickSearch(param); break;
        case 'openProModal':      if (typeof openProModal === 'function') openProModal(); break;
        case 'closeProModal':     if (typeof closeProModal === 'function') closeProModal(); break;
        case 'openKeyModal':      if (window.QS) QS.openKeyModal(); break;
        case 'closeKeyModal':     if (window.QS) QS.closeKeyModal(); break;
        case 'doSearch':          if (window.QS) QS.doSearch(); break;
        case 'copyAnswer':        if (window.QS) QS.copyAnswer(); break;
        case 'shareDetail':       if (window.QS) QS.shareDetail(); break;
        case 'exportPDF':         if (window.QS) QS.exportToServer('pdf'); break;
        case 'exportWord':        if (window.QS) QS.exportToWord(); break;
        case 'printDetail':       if (window.QS) QS.printCurrentDetail(); break;
        case 'closeDetail':
          var dm = document.getElementById('detailModal');
          var af = document.getElementById('appFooter');
          if (dm) dm.classList.remove('open');
          if (af) af.style.display = '';
          document.body.style.overflow = '';
          if (typeof window.navStack !== 'undefined') window.navStack = [];
          break;
        case 'toggleSigSection':
          var sig = document.getElementById('itpSigSection');
          if (sig) sig.style.display = sig.style.display === 'none' ? 'flex' : 'none';
          break;
        case 'clearSignature':    if (typeof clearSignature === 'function') clearSignature(); break;
        case 'saveSignature':     if (typeof saveSignature === 'function') saveSignature(); break;
        case 'tapMonthly':        if (window.startTapCheckout) window.startTapCheckout('monthly'); break;
        case 'tapYearly':         if (window.startTapCheckout) window.startTapCheckout('yearly'); break;
        case 'activatePromo':
          var inp = document.getElementById('promoCodeInput');
          if (inp && window.activateProNow) window.activateProNow(inp.value);
          break;
        case 'closeUpgradeOpenPro':
          if (typeof closeUpgradeOverlay === 'function') closeUpgradeOverlay();
          if (typeof openProModal       === 'function') openProModal();
          break;
        case 'closeUpgrade':      if (typeof closeUpgradeOverlay === 'function') closeUpgradeOverlay(); break;
        case 'focusSearch':
          var si = document.getElementById('searchInput');
          if (si) { si.focus(); si.scrollIntoView({ behavior: 'smooth' }); }
          break;
        case 'reloadPage':        location.reload(true); break;
        case 'uploadFile':
          e.stopPropagation();
          var fi2 = document.getElementById('fileInput');
          if (fi2) fi2.click();
          break;
        case 'navigate':          window.location.href = param; break;
        case 'openDocGenerator':  if (window.QS && typeof QS.openDocGenerator === 'function') QS.openDocGenerator(); break;
        case 'setLang':           if (window.QS) QS.setLang(param); break;
        case 'toggleTheme':       if (typeof toggleTheme === 'function') toggleTheme(); break;
        default: break;
      }
    });

    /* ── 4. key-status div (no ID in current HTML) ──────────── */
    var keyStatus = document.querySelector('.key-status');
    if (keyStatus) keyStatus.addEventListener('click', function () { if (window.QS) QS.openKeyModal(); });

    /* ── 5. PWA update reload link ───────────────────────────── */
    var reloadLink = document.querySelector('#updateBanner a[data-action="reloadPage"], #updateBanner a.reload-link');
    if (reloadLink) reloadLink.addEventListener('click', function (e) { e.preventDefault(); location.reload(true); });

    /* ── 6. Keyboard: Enter → doSearch ──────────────────────── */
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && window.QS && typeof QS.doSearch === 'function') QS.doSearch();
      });
    }

    /* ── 7. Keyboard: Enter → activatePromo ─────────────────── */
    var promoInput = document.querySelector('[data-enter-action="activatePromo"]');
    if (promoInput) {
      promoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && window.activateProNow) window.activateProNow(this.value);
      });
    }

    /* ── 8. Skip link onfocus/onblur ─────────────────────────── */
    var skipLink = document.querySelector('[data-skip-link="1"]');
    if (skipLink) {
      skipLink.addEventListener('focus', function () { this.style.top = '0'; });
      skipLink.addEventListener('blur',  function () { this.style.top = '-40px'; });
    }

    /* ── 9. Drag & Drop على uploadZone ──────────────────────── */
    var dropZone = document.querySelector('[data-dropzone="1"]');
    if (dropZone) {
      dropZone.addEventListener('dragover',   function (e) { if (typeof handleDragOver  === 'function') handleDragOver(e); });
      dropZone.addEventListener('dragleave',  function (e) { if (typeof handleDragLeave === 'function') handleDragLeave(e); });
      dropZone.addEventListener('drop',       function (e) { if (typeof handleDrop      === 'function') handleDrop(e); });
    }

    /* ── 10. File input onchange ─────────────────────────────── */
    var fileInput = document.querySelector('[data-fileinput="1"]');
    if (fileInput) {
      fileInput.addEventListener('change', function (e) { if (typeof handleFiles === 'function') handleFiles(e); });
    }

    /* ── 11. Card search filter (oninput + gold border) ──────── */
    var cardSearch = document.querySelector('[data-cardsearch="1"]');
    if (cardSearch) {
      cardSearch.addEventListener('input', function () { if (typeof filterCards === 'function') filterCards(this.value); });
    }
    var goldBorder = document.querySelector('[data-goldborder="1"]');
    if (goldBorder) {
      goldBorder.addEventListener('focus', function () { this.style.borderColor = 'var(--gold)'; });
      goldBorder.addEventListener('blur',  function () { this.style.borderColor = 'var(--border2)'; });
    }

  }); // ready
})();
