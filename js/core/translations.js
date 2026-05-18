// QatarSpec Pro — Language & Translations Module
// Extracted from inline-scripts.js (Phase 5)
(function() {
  "use strict";


function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('qsp_lang', lang);
  let t = TR[lang];
  const isEn = (lang === 'en');

  // Buttons
  const bAr = document.getElementById('btn-ar');
  const bEn = document.getElementById('btn-en');
  if (bAr) bAr.className = 'lang-btn' + (isEn ? '' : ' active');
  if (bEn) bEn.className = 'lang-btn' + (isEn ? ' active' : '');

  // Direction
  document.documentElement.setAttribute('lang', t.lang);
  document.documentElement.setAttribute('dir', t.dir);
  document.body.style.textAlign = t.align;

  // Header
  let el;
  el = document.querySelector('.logo-name'); if(el) el.textContent = t.appName;
  el = document.querySelector('.logo-sub');  if(el) el.textContent = t.appSub;
  el = document.getElementById('keyStatusText'); if(el) el.textContent = t.keyBtn;

  // Hero
  el = document.querySelector('.hero-eyebrow'); if(el) el.textContent = t.heroEyebrow;
  el = document.querySelector('.hero h1');      if(el) el.innerHTML   = t.heroH1;
  el = document.querySelector('.hero-desc');    if(el) el.textContent = t.heroDesc;
  const sl = document.querySelectorAll('.hero-stat-label');
  if(sl[0]) sl[0].textContent = t.stat1;
  if(sl[1]) sl[1].textContent = t.stat2;
  if(sl[2]) sl[2].textContent = t.stat3;

  // Upload zone
  el = document.querySelector('.upload-title');    if(el) el.textContent = t.upTitle;
  el = document.querySelector('.upload-desc');     if(el) el.innerHTML   = t.upDesc;
  el = document.querySelector('.upload-btn-main'); if(el) el.textContent = t.upBtn;
  el = document.querySelector('.upload-formats');  if(el) el.textContent = t.upFmt;

  // Search
  el = document.querySelector('.search-label');     if(el) el.textContent    = t.searchLabel;
  el = document.getElementById('searchInput');      if(el) el.placeholder    = t.searchPH;
  el = document.querySelector('.search-icon-btn');  if(el) el.textContent    = t.searchBtn;

  // Quick tags
  const qts = document.querySelectorAll('.quick-tag');
  let tags = [t.tag1,t.tag2,t.tag3,t.tag4,t.tag5,t.tag6,t.tag7];
  let qs   = [t.tq1, t.tq2, t.tq3, t.tq4, t.tq5, t.tq6, t.tq7];
  qts.forEach(function(tag,i){
    if(tags[i]){ tag.textContent = tags[i]; tag.setAttribute('data-search', qs[i]); }
  });

  // Section heading
  el = document.querySelector('.section-title');    if(el) el.innerHTML   = t.secTitle;
  el = document.querySelector('.section-subtitle'); if(el) el.textContent = t.secSub;

  // Category cards — ONLY update arrow direction (cat-arr)
  // cat-name / card-bullets / cat-count all have data-ar/data-en → handled by generic handler below
  document.querySelectorAll('.cat-card').forEach(function(card){
    var a = card.querySelector('.cat-arr');
    if(a) a.textContent = t.catArr;
  });

  // ITP bar
  el=document.getElementById('itp-project-name'); if(el) el.placeholder=t.itpProj;
  el=document.getElementById('itp-number');       if(el) el.placeholder=t.itpNum;
  el=document.getElementById('itp-engineer');     if(el) el.placeholder=t.itpEng;
  el=document.querySelector('.itp-export-btn');   if(el) el.innerHTML=t.exportBtn;

  // Update banner
  el=document.getElementById('update-banner');
  if(el) el.innerHTML=t.updateMsg+'<a onclick="location.reload(true)" style="color:#fff;font-weight:700;cursor:pointer;text-decoration:underline;">'+t.updateLink+'</a>';

  // Calculator main tabs
  const tids = ['main-tab-roads','main-tab-utilities','main-tab-structural','main-tab-geotech_calc'];
  let tlbls=[t.tab1,t.tab2,t.tab3,t.tab4];
  tids.forEach(function(id,i){ let e=document.getElementById(id); if(e) e.textContent=tlbls[i]; });

  // Calc buttons
  document.querySelectorAll('.calc-btn').forEach(function(b){
    if(b.getAttribute('data-type')==='classify') b.textContent=t.classBtn;
    else b.textContent=t.calcBtn;
  });

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(function(b){ b.textContent=t.backBtn; });

  // AI copy button
  document.querySelectorAll('[onclick*="copyAnswer"]').forEach(function(b){ b.textContent=t.aiCopy; });

  // Searching text
  const si = document.getElementById('searchingText'); if(si) si.textContent=t.searching;

  // Footer
  const fh = document.querySelectorAll('.footer-col h4');
  if(fh[0]) fh[0].textContent=t.f1;
  if(fh[1]) fh[1].textContent=t.f2;
  if(fh[2]) fh[2].textContent=t.f3;
  el=document.querySelector('.footer-copy'); if(el) el.textContent=t.fcopy;

  // data-ar / data-en elements (bilingual nav buttons, card bullets etc.)
  document.querySelectorAll('[data-ar][data-en]').forEach(function(e){
    let v = isEn?e.getAttribute('data-en'):e.getAttribute('data-ar');
    if(!v) return;
    if(e.tagName==='INPUT'||e.tagName==='TEXTAREA') e.placeholder=v;
    else e.innerHTML=v;
  });

  // lang-content-ar / lang-content-en blocks (detail sections)
  document.querySelectorAll('.lang-content-ar').forEach(function(e){ e.style.display=isEn?'none':'block'; });
  document.querySelectorAll('.lang-content-en').forEach(function(e){ e.style.display=isEn?'block':'none'; });

  // [FIX v3.1] استهداف detailModal/dmContent — الـ ID الصحيح للـ modal
  // المشكلة: كان يبحث عن 'detailPanel' غير الموجود — الصحيح 'detailModal'+'dmContent'
  const detailModal = document.getElementById('detailModal');
  const dmContent   = document.getElementById('dmContent');
  if (detailModal && detailModal.classList.contains('open') && dmContent) {
    dmContent.querySelectorAll('.lang-content-ar').forEach(function(e){ e.style.display = isEn ? 'none' : 'block'; });
    dmContent.querySelectorAll('.lang-content-en').forEach(function(e){ e.style.display = isEn ? 'block' : 'none'; });
    dmContent.querySelectorAll('[data-ar][data-en]').forEach(function(e){
      let v = isEn ? e.getAttribute('data-en') : e.getAttribute('data-ar');
      if (v) e.innerHTML = v;
    });
    const pb = dmContent.querySelector('.back-btn'); if(pb) pb.textContent = t.backBtn;
  }
  // Legacy: للتوافق مع detailPanel القديم إن وجد
  const panel = document.getElementById('detailPanel');
  if(panel && panel.style.display!=='none'){
    panel.querySelectorAll('.lang-content-ar').forEach(function(e){ e.style.display=isEn?'none':'block'; });
    panel.querySelectorAll('.lang-content-en').forEach(function(e){ e.style.display=isEn?'block':'none'; });
    panel.querySelectorAll('[data-ar][data-en]').forEach(function(e){
      let v = isEn?e.getAttribute('data-en'):e.getAttribute('data-ar');
      if(v) e.innerHTML=v;
    });
    const pb2 = panel.querySelector('.back-btn'); if(pb2) pb2.textContent=t.backBtn;
  }

  // ═══ v3.3: 86 UNTRANSLATED TEXTS FIX ═══
  let el2;

  // --- Key Modal ---
  el2=document.getElementById('keyModalTitle'); if(el2) el2.textContent=t.keyModalTitle;
  el2=document.querySelector('#keyModal .modal-desc'); if(el2) el2.textContent=t.keyModalDesc;
  el2=document.querySelector('#keyModal .modal-save'); if(el2) el2.textContent=t.keyModalSave;
  el2=document.querySelector('#keyModal .modal-cancel'); if(el2) el2.textContent=t.keyModalCancel;
  el2=document.getElementById('keyInput'); if(el2) el2.placeholder=t.keyModalPH;
  var _keyNote=document.querySelector('#keyModal .modal-box>div[style*="rgba(39"]');
  if(_keyNote) _keyNote.innerHTML=t.keyModalNote;

  // --- Pro Modal ---
  el2=document.querySelector('#proModal .pro-modal-sub'); if(el2) el2.textContent=t.proModalSub;
  var _plans=document.querySelectorAll('#proModal .plan-card');
  if(_plans[0]){
    var _fc=_plans[0];
    var _fn=_fc.querySelector('.plan-name'); if(_fn) _fn.textContent=t.planFreeName;
    var _fp=_fc.querySelector('.plan-period'); if(_fp) _fp.textContent=t.planFreePeriod;
    var _flis=_fc.querySelectorAll('.plan-features li');
    [t.planFreeF1,t.planFreeF2,t.planFreeF3,t.planFreeF4,t.planFreeF5,t.planFreeF6,t.planFreeF7,t.planFreeF8].forEach(function(txt,i){ if(_flis[i]) _flis[i].textContent=txt; });
    var _fb=_fc.querySelector('.plan-btn'); if(_fb) _fb.textContent=t.planFreeCta;
  }
  if(_plans[1]){
    var _pc=_plans[1];
    var _pb=_pc.querySelector('.plan-badge-top'); if(_pb) _pb.textContent=t.planProBadge;
    var _pp=_pc.querySelector('.plan-period'); if(_pp) _pp.textContent=t.planProPeriod;
    var _ps=_pc.querySelector('div[style*="2ecc71"][style*="10px"]'); if(_ps) _ps.textContent=t.planProSave;
    var _plis=_pc.querySelectorAll('.plan-features li');
    [t.planProF1,t.planProF2,t.planProF3,t.planProF4,t.planProF5,t.planProF6,t.planProF7,t.planProF8].forEach(function(txt,i){ if(_plis[i]) _plis[i].textContent=txt; });
    var _pm=_pc.querySelector('[data-action="tapMonthly"]'); if(_pm) _pm.textContent=t.planProMonthly;
    var _py=_pc.querySelector('[data-action="tapYearly"]'); if(_py) _py.innerHTML=t.planProYearly;
  }
  var _promo=document.querySelector('#proModal .promo-section');
  if(_promo){
    var _pt=_promo.querySelector('div:first-child'); if(_pt) _pt.textContent=t.promoTitle;
    var _pd=_promo.querySelector('div:nth-child(2)'); if(_pd) _pd.textContent=t.promoDesc;
    var _pab=_promo.querySelector('.promo-btn'); if(_pab) _pab.textContent=t.promoActivate;
  }
  var _payC=document.getElementById('paymentContact');
  if(_payC){
    var _pct=_payC.querySelector('div:first-child'); if(_pct) _pct.textContent=t.payContactTitle;
    var _waR=_payC.querySelector('a[href*="wa.me"] div div:last-child'); if(_waR) _waR.textContent=t.waReply;
    var _emD=_payC.querySelector('a[href*="mailto"] div div:first-child'); if(_emD) _emD.textContent=t.emailLabel;
    var _payM=_payC.querySelector('div[style*="margin-top:10px"]'); if(_payM) _payM.textContent=t.payMethods;
  }
  // Pro modal footer guarantee line (last child of modal-box, no ID)
  var _proBox=document.querySelector('#proModal .pro-modal-box');
  if(_proBox){ var _proFoot=_proBox.lastElementChild; if(_proFoot&&!_proFoot.id&&!_proFoot.className) _proFoot.innerHTML=t.proGuarantee; }

  // --- Upgrade Overlay ---
  var _ut=document.getElementById('upgradeTitle');
  var _ud=document.getElementById('upgradeDesc');
  if(_ut&&(_ut.textContent==='ميزة Pro'||_ut.textContent==='Pro Feature')) _ut.textContent=t.upgradeDefault;
  if(_ud&&_ud.textContent.length<80) _ud.textContent=t.upgradeDefaultDesc;
  el2=document.querySelector('#upgradeOverlay .upgrade-cta'); if(el2) el2.textContent=t.upgradeCta;
  el2=document.querySelector('#upgradeOverlay .upgrade-dismiss'); if(el2) el2.textContent=t.upgradeDismiss;

  // --- Offline bar ---
  el2=document.getElementById('offlineBar'); if(el2) el2.textContent=t.offlineMsg;

  // --- AI Disclaimer ---
  el2=document.querySelector('.ai-disclaimer'); if(el2) el2.innerHTML=t.aiDisc;

  // --- ITP Signature ---
  el2=document.querySelector('#itpSigSection>span'); if(el2) el2.textContent=t.sigLabel;
  el2=document.querySelector('[data-action="clearSignature"]'); if(el2) el2.textContent=t.sigClear;
  el2=document.querySelector('[data-action="saveSignature"]'); if(el2) el2.textContent=t.sigSave;
  el2=document.getElementById('sigSavedMsg'); if(el2) el2.textContent=t.sigSaved;
  el2=document.querySelector('#itp-project-bar>div>span'); if(el2) el2.textContent=t.forExport;
  el2=document.querySelector('[data-action="toggleSigSection"]'); if(el2) el2.textContent=t.sigBtn;

  // --- Legal Disclaimer ---
  el2=document.querySelector('#legalDisclaimer>div:first-child'); if(el2) el2.textContent=t.legalTitle;
  var _ldBody=document.querySelector('#legalDisclaimer>div:last-child');
  if(_ldBody){
    var _lps=_ldBody.querySelectorAll('p');
    [t.legalP1,t.legalP2,t.legalP3,t.legalP4,t.legalP5,t.legalContact].forEach(function(html,i){ if(_lps[i]) _lps[i].innerHTML=html; });
  }

  // --- Toast (reset label) ---
  el2=document.getElementById('toast'); if(el2&&(el2.textContent==='✅ تم!'||el2.textContent==='✅ Done!')) el2.textContent=t.toastDone;

  // --- Footer legal links ---
  var _fLinks=document.querySelectorAll('#appFooter a[href*="legal"]');
  if(_fLinks[0]) _fLinks[0].textContent=t.termsLink;
  if(_fLinks[1]) _fLinks[1].textContent=t.privacyLink;

  // --- Back to top ---
  el2=document.getElementById('backToTopBtn'); if(el2) el2.title=isEn?'Back to Top':'عودة للأعلى';
  el2=document.getElementById('backToTopBtn'); if(el2) el2.setAttribute('aria-label',isEn?'Back to top':'العودة إلى أعلى الصفحة');
}


function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  const isAR = lang === 'ar';

  // 1. Document direction
  document.documentElement.lang = lang;
  document.documentElement.dir = isAR ? 'rtl' : 'ltr';

  // 2. Hero section
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) eyebrow.textContent = t.heroEyebrow;
  const heroH1 = document.querySelector('.hero-left h1');
  if (heroH1) heroH1.innerHTML = t.heroTitle;
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) heroDesc.textContent = t.heroDesc;
  const statLabels = document.querySelectorAll('.hero-stat-label');
  const labelKeys = ['statPages','statFiles','statYears'];
  statLabels.forEach(function(el,i){ if(labelKeys[i]) el.textContent = t[labelKeys[i]]; });

  // 3. App subtitle
  const subtitles = document.querySelectorAll('.footer-subtitle, [data-i18n="appSubtitle"]');
  subtitles.forEach(function(el){ el.textContent = t.appSubtitle; });

  // 4. Search box
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;
  const searchBtn = document.querySelector('.search-icon-btn');
  if (searchBtn) searchBtn.textContent = t.searchBtn;

  // 5. Quick tags text
  const qtags = document.querySelectorAll('.quick-tag');
  const qtKeys = ['qt1','qt2','qt3','qt4','qt5'];
  qtags.forEach(function(el,i){ if(qtKeys[i] && t[qtKeys[i]]) el.textContent = t[qtKeys[i]]; });

  // 6. Cat cards — update all 6 cards
  const catCards = document.querySelectorAll('.cat-card');
  const catData = [
    { name: 'cat_roads_name', desc: 'cat_roads_desc', count: 'cat_roads_count' },
    { name: 'cat_utilities_name', desc: 'cat_utilities_desc', count: 'cat_utilities_count' },
    { name: 'cat_structural_name', desc: 'cat_structural_desc', count: 'cat_structural_count' },
    { name: 'cat_geotech_name', desc: 'cat_geotech_desc', count: 'cat_geotech_count' },
    { name: 'cat_fire_name', desc: 'cat_fire_desc', count: 'cat_fire_count' },
    { name: 'cat_calc_name', desc: 'cat_calc_desc', count: 'cat_calc_count' },
  ];
  catCards.forEach(function(card, i) {
    if (!catData[i]) return;
    const nameEl = card.querySelector('.cat-name');
    const descEl = card.querySelector('.cat-desc');
    const countEl = card.querySelector('.cat-count');
    if (nameEl && t[catData[i].name]) nameEl.textContent = t[catData[i].name];
    if (descEl && t[catData[i].desc]) descEl.textContent = t[catData[i].desc];
    if (countEl && t[catData[i].count]) countEl.textContent = t[catData[i].count];
    // Arrow direction
    const arr = card.querySelector('.cat-arr');
    if (arr) arr.textContent = isAR ? '←' : '→';
  });

  // 7. ITP bar placeholders
  const itpFields = [
    { id: 'itp-project-name', key: 'itpProject' },
    { id: 'itp-number', key: 'itpNumber' },
    { id: 'itp-engineer', key: 'itpEngineer' },
  ];
  itpFields.forEach(function(f) {
    let el = document.getElementById(f.id);
    if (el) el.placeholder = t[f.key];
  });
  const itpNote = document.querySelector('#itp-project-bar span');
  if (itpNote) itpNote.textContent = t.itpExport;

  // 8. Update banner
  const banner = document.getElementById('update-banner');
  if (banner) {
    banner.childNodes.forEach(function(node) {
      if (node.nodeType === 3) node.textContent = ' ' + t.updateMsg + ' ';
    });
    const bannerBtn = banner.querySelector('a');
    if (bannerBtn) bannerBtn.textContent = t.updateBtn;
  }

  // 9. Footer sections
  const footerSections = document.querySelectorAll('.footer-section span');
  const secKeys = ['secRoads','secUtils','secStruct','secGeo','secCalc'];
  footerSections.forEach(function(el,i){ if(secKeys[i]) el.textContent = t[secKeys[i]]; });

  // 10. Calculator main tabs
  const mainTabs = ['main-tab-roads','main-tab-utilities','main-tab-structural','main-tab-geotech_calc'];
  const tabKeys = ['calcRoads','calcUtils','calcStruct','calcGeo'];
  mainTabs.forEach(function(id,i) {
    let el = document.getElementById(id);
    if (el && t[tabKeys[i]]) el.textContent = t[tabKeys[i]];
  });

  // 11. All calc buttons
  document.querySelectorAll('.calc-btn').forEach(function(btn) {
    if (btn.textContent === 'Calculate' || btn.textContent === 'Calculate') btn.textContent = t.calcBtn;
    if (btn.textContent === 'صنّف' || btn.textContent === 'Classify') btn.textContent = t.calcClassify;
  });

  // 12. lang-content classes — show/hide bilingual sections
  document.querySelectorAll('.lang-content-ar').forEach(function(el) {
    el.style.display = isAR ? 'block' : 'none';
  });
  document.querySelectorAll('.lang-content-en').forEach(function(el) {
    el.style.display = isAR ? 'none' : 'block';
  });

  // 13. AI Setup button in header
  const aiBtn = document.querySelector('[onclick*="keyModal"]');
  if (aiBtn) {
    const txt = aiBtn.querySelector('span') || aiBtn;
    // keep icon, replace text
    const spans = aiBtn.querySelectorAll('span');
    spans.forEach(function(s){
      if (s.textContent.includes('إعداد') || s.textContent.includes('Setup')) {
        s.textContent = isAR ? 'إعداد AI' : 'AI Setup';
      }
    });
  }

  console.log('QatarSpec Pro: Language set to', lang.toUpperCase());

  // إعادة بناء محتوى المودال بلغة واحدة عند تبديل اللغة
  var dm = document.getElementById('detailModal');
  if (dm && dm.classList.contains('open')) {
    var ck = dm.dataset.currentKey;
    if (ck && detailData[ck]) {
      var d2 = detailData[ck];
      document.getElementById('dmContent').innerHTML =
        dedupeSectionContent(d2.content, lang);
      safeTimeout('restoreVideo', _restoreVideosAfterDOMRebuild, 50);
    }
  }
}


  // Expose to window
  window.setLang = setLang;
  window.applyTranslations = applyTranslations;
})();
