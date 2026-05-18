// QatarSpec Pro — Detail Modal Module
(function() {
  "use strict";



function safeTimeout(key, fn, delay) {
  if (window._timers_stub && window._timers_stub[key]) clearTimeout(window._timers_stub[key]);
  if (!window._timers_stub) window._timers_stub = {};
  window._timers_stub[key] = setTimeout(function() { window._timers_stub[key] = null; fn(); }, delay);
}


function dedupeSectionContent(contentHTML, lang) {
  if (!contentHTML) return contentHTML;

  // حفظ <script> قبل DOMParser لأنه يحذفها تلقائياً
  var scripts = [];
  var htmlNoScript = contentHTML.replace(/<script[\s\S]*?<\/script>/gi, function(match) {
    scripts.push(match);
    return '<!--SCRIPT_PLACEHOLDER_' + (scripts.length - 1) + '-->';
  });

  var parser = new DOMParser();
  var doc = parser.parseFromString(htmlNoScript, 'text/html');
  var otherLang = (lang === 'ar') ? 'en' : 'ar';

  // [FIX v3.1] لا تحذف lang-content-* — فقط أخفِ/أظهر
  // السبب: الحذف يمنع setLang من إظهار اللغة الثانية لاحقاً
  var wrongLangs = doc.querySelectorAll('.lang-content-' + otherLang);
  for (var i = 0; i < wrongLangs.length; i++) wrongLangs[i].style.display = 'none';

  // إظهار حاويات اللغة الصحيحة
  var rightLangs = doc.querySelectorAll('.lang-content-' + lang);
  for (var i = 0; i < rightLangs.length; i++) rightLangs[i].style.display = 'block';

  // تحديث data-ar/data-en spans داخل المحتوى المُحمَّل
  var biSpans = doc.querySelectorAll('[data-ar][data-en]');
  for (var i = 0; i < biSpans.length; i++) {
    var sp = biSpans[i];
    var val = (lang === 'en') ? sp.getAttribute('data-en') : sp.getAttribute('data-ar');
    if (val) sp.innerHTML = val;
  }

  // حذف الكروت المكررة حسب نص العنوان (أول 50 حرف)
  var seenCards = {};
  var cards = doc.querySelectorAll('.cat-card, [class*="step"], [class*="phase"]');
  for (var j = 0; j < cards.length; j++) {
    var card = cards[j];
    var titleEl = card.querySelector('.cat-name, h3, h4, strong');
    var title = (titleEl ? titleEl.textContent : card.textContent)
                  .trim().substring(0, 50);
    if (seenCards[title]) card.remove();
    else seenCards[title] = true;
  }

  // إعادة <script> بعد المعالجة
  var result = doc.body.innerHTML;
  for (var k = 0; k < scripts.length; k++) {
    result = result.replace('<!--SCRIPT_PLACEHOLDER_' + k + '-->', scripts[k]);
  }
  return result;
}


function openDetail(key) {
  // Load content chunk on demand if not yet loaded
  var _realKey = (window._CONTENT_ALIASES && window._CONTENT_ALIASES[key]) || key;
  if (typeof window._loadContentChunk === 'function' && !(window.QS_CONTENT && window.QS_CONTENT[_realKey])) {
    window._loadContentChunk(key, function(){ openDetail(key); });
    return;
  }
  const d = detailData[key];
  if (!d) { console.warn('Key not found:', key); return; }
  const modal = document.getElementById('detailModal');
  if (modal.classList.contains('open')) {
    const currentKey = modal.dataset.currentKey;
    if (currentKey && currentKey !== key) navStack.push(currentKey);
  } else { navStack = []; }
  modal.dataset.currentKey = key;
  document.getElementById('appFooter').style.display='none';
  document.body.style.overflow='hidden';
  document.getElementById('dmTitle').textContent = d.title;
  var _dmEl = document.getElementById('dmContent');
  if (_dmEl) {
    _dmEl.innerHTML = dedupeSectionContent(d.content, window.currentLang || 'ar');
    _dmEl.insertAdjacentHTML('beforeend',
      '<div class="qcs-disclaimer" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:6px;padding:8px;margin-top:14px;font-size:10px;color:#999;line-height:1.6;">' +
      '\u26a0\ufe0f \u0647\u0630\u0627 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0645\u0631\u062c\u0639\u064a \u0641\u0642\u0637 \u2014 \u062a\u062d\u0642\u0642 \u062f\u0627\u0626\u0645\u0627\u064b \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629 QCS 2024 \u0642\u0628\u0644 \u0627\u0644\u0627\u0639\u062a\u0645\u0627\u062f.<br>' +
      'All content is for reference only \u2014 always verify against official QCS 2024 specifications.' +
      '</div>'
    );
  }
  const backBtn = document.getElementById('dmBackBtn');
  if (backBtn) backBtn.style.display = navStack.length > 0 ? 'flex' : 'none';
  modal.classList.add('open'); var mc=document.getElementById('dmContent'); if(mc) mc.scrollTop=0;
  // تنفيذ <script> داخل المحتوى المُحمَّل ديناميكياً
  if (mc) { mc.querySelectorAll('script').forEach(function(old){ var s=document.createElement('script'); s.textContent=old.textContent; old.parentNode.replaceChild(s, old); }); }
  // Re-inject stored videos after DOM rebuild
  safeTimeout('restoreVideo', _restoreVideosAfterDOMRebuild, 50);
  // Re-apply current language
  if (typeof setLang === 'function') setLang(currentLang || 'ar');
  // ITP bar
  let bar = document.getElementById('itp-project-bar');
  if (bar) bar.style.display = (key && key.startsWith('itp')) ? 'block' : 'none';
  // Calculator panels
  if (key === 'calculator') safeTimeout('initCalcPanels', initCalcPanels, 30);
  // Forms: show RFI tab by default and auto-set today's date
  if (key === 'ashghal_forms') safeTimeout('switchFormRfi', function() {
    switchForm('rfi');
    let d = document.getElementById('rfi-date');
    if (d && !d.value) d.value = new Date().toISOString().split('T')[0];
  }, 30);
}


function goBack() {
  // إذا كانت navStack فارغة، أغلق المودال بدلاً من لا شيء
  if (navStack.length === 0) {
    document.getElementById('detailModal').classList.remove('open');
    document.getElementById('appFooter').style.display = '';
    document.body.style.overflow = '';
    return;
  }
  const prevKey = navStack.pop();
  const d = detailData[prevKey];
  if (!d) return;
  const modal = document.getElementById('detailModal');
  modal.dataset.currentKey = prevKey;
  document.getElementById('dmTitle').textContent = d.title;
  var _goBackEl = document.getElementById('dmContent');
  if (_goBackEl) {
    _goBackEl.innerHTML = dedupeSectionContent(d.content, window.currentLang || 'ar');
    _goBackEl.insertAdjacentHTML('beforeend',
      '<div class="qcs-disclaimer" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:6px;padding:8px;margin-top:14px;font-size:10px;color:#999;line-height:1.6;">' +
      '⚠️ هذا المحتوى مرجعي فقط — تحقق دائماً من المواصفة الرسمية QCS 2024 قبل الاعتماد.<br>' +
      'All content is for reference only — always verify against official QCS 2024 specifications.' +
      '</div>'
    );
  }
  // تنفيذ <script> داخل المحتوى المُحمَّل
  var mc2=document.getElementById('dmContent'); if(mc2){mc2.querySelectorAll('script').forEach(function(old){var s=document.createElement('script');s.textContent=old.textContent;old.parentNode.replaceChild(s,old);});}
  const backBtn = document.getElementById('dmBackBtn');
  if (backBtn) backBtn.style.display = navStack.length > 0 ? 'flex' : 'none';
  // Re-inject stored videos after DOM rebuild
  safeTimeout('restoreVideo', _restoreVideosAfterDOMRebuild, 50);
  // Re-apply current language  
  if (typeof setLang === 'function') setLang(currentLang || 'ar');
}


function shareDetail() {
  var modal = document.getElementById('detailModal');
  var key = modal.dataset.currentKey || '';
  var title = document.getElementById('dmTitle') ? document.getElementById('dmTitle').textContent : 'QatarSpec Pro';
  var url = window.location.origin + window.location.pathname + (key ? '#' + key : '');
  if (navigator.share) {
    navigator.share({ title: title, url: url }).catch(function(){});
  } else {
    navigator.clipboard.writeText(url)
      .then(function(){ showToast('✅ تم نسخ الرابط'); })
      .catch(function(){ showToast('❌ تعذّر النسخ'); });
  }
}


function closeDetailModal(e) {
  if (e.target === document.getElementById('detailModal')) {
    // Release any active video players from memory
    document.querySelectorAll('.qs-vid-ph').forEach(function(el) {
      if (typeof el._vidCleanup === 'function') el._vidCleanup();
    });
    document.getElementById('detailModal').classList.remove('open');
    document.getElementById('appFooter').style.display='';
    document.body.style.overflow='';
  }
}


  window.safeTimeout = safeTimeout;
  window.dedupeSectionContent = dedupeSectionContent;
  window.openDetail = openDetail;
  window.goBack = goBack;
  window.shareDetail = shareDetail;
  window.closeDetailModal = closeDetailModal;
  window.navStack = navStack;
  window.detailData = detailData;
})();
