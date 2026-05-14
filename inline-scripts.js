// QatarSpec Analytics — Plausible (no cookies, no personal data)
function qsTrack(event, props) {
  try {
    if (typeof window.plausible !== 'function') return;
    var safe = {};
    if (props && props.tier)      safe.tier      = String(props.tier).slice(0,20);
    if (props && props.calc_name) safe.calc_name = String(props.calc_name).slice(0,50);
    if (props && props.type)      safe.type      = String(props.type).slice(0,20);
    if (props && props.section)   safe.section   = String(props.section).slice(0,50);
    window.plausible(String(event).slice(0,100), { props: safe });
  } catch(e) { /* silent fail */ }
}

// js/inline-scripts.js — QatarSpec Pro
// نُقل من index.html لإزالة unsafe-inline من CSP
// المحتوى الأصلي محفوظ — لا حذف

// ═══════════════════════════════════════════════════
// SECTION 1: Google Analytics Config
// ═══════════════════════════════════════════════════
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QSPEC2026QA', { anonymize_ip: true });


// ═══════════════════════════════════════════════════
// SECTION 2: Main Init — window.onload + Key Management
// ═══════════════════════════════════════════════════
// ===== STATE =====
// [SEC v4.0] anthropicKey أُزيل من global scope — API calls عبر /api/ai-proxy فقط
let uploadedFiles = [];

// ===== INIT =====
window.onload = () => {
  // ── Security: cleanupSecurity() runs before this (at top of page) ──
  // ── Monetization Init ──
  renderProStatus();
  // Silently revalidate JWT on load (catches expired tokens)
  (function revalidateProToken(){
// Pro status via httpOnly cookie (secure v3.0)
  // [SEC v4.1] يستخدم verifyProWithServer() — window._qs_pro_confirmed محمية الآن
  (typeof window.verifyProWithServer === 'function' ? window.verifyProWithServer(true) :
    fetch('/api/verify-pro?action=status', { credentials: 'include' })
      .then(r => r.json())
      .then(d => { window._qsSetProFromServer(d.pro === true); renderProStatus(); })
      .catch(() => { window._qsSetProFromServer(false); renderProStatus(); })
  );
  })();
  // Check pro expiry
  const expiry = getProExpiry();
  if (expiry && new Date(expiry) < new Date()) {
    setProActive(false, null);
    renderProStatus();
  }

  // في وضع Proxy: المفتاح دائماً مُفعَّل على السيرفر
  updateKeyStatus(true);
  // نافذة API Key تظهر فقط عند الضغط على بحث ذكي — لا تظهر تلقائياً
};

// openKeyModal + closeKeyModal + saveKey + updateKeyStatus → نُقلت إلى js/core/key-modal.js (A2 Refactor)

// ===== FILE UPLOAD =====
function handleFiles(e) { processFiles(Array.from(e.target.files)); }
function handleDragOver(e) { e.preventDefault(); document.getElementById('uploadZone').classList.add('drag-over'); }
function handleDragLeave(e) { document.getElementById('uploadZone').classList.remove('drag-over'); }
function handleDrop(e) { e.preventDefault(); document.getElementById('uploadZone').classList.remove('drag-over'); processFiles(Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf')); }
function processFiles(files) {
  files.forEach(file => {
    if (file.type !== 'application/pdf') return;
    const id = Date.now() + Math.random();
    uploadedFiles.push({ id, file, name: file.name, size: file.size });
    renderFileItem(id, file.name, file.size, 'loading');
    // ربط زر العرض بالملف الفعلي
    const item = document.querySelector(`[data-file-id="${id}"] .pdf-view-btn`);
    if (item) item.addEventListener('click', function() {
      if (typeof QS !== 'undefined' && QS.openPDFViewer) QS.openPDFViewer(file);
    });
    setTimeout(() => {
      document.querySelector(`[data-file-id="${id}"] .file-status`).textContent = 'جاهز ✓';
      document.querySelector(`[data-file-id="${id}"] .file-status`).className = 'file-status ready';
      showToast(`✅ تم رفع: ${file.name}`);
    }
, 2000);
  });
}
function renderFileItem(id, name, size, status) {
  const list = document.getElementById('filesList');
  const div = document.createElement('div');
  div.className = 'file-item';
  div.setAttribute('data-file-id', id);
  const safeName = name.length > 30 ? name.slice(0,30)+'...' : name;
  div.innerHTML = `<span class="file-icon">📄</span><div class="file-info"><div class="file-name"></div><div class="file-size">${(size/1024/1024).toFixed(1)} MB</div></div><span class="file-status ${status}">${status === 'loading' ? 'جاري الرفع...' : 'جاهز ✓'}</span><button class="pdf-view-btn" aria-label="عرض PDF" style="background:var(--dark4,#2a2a3e);border:1px solid var(--gold,#c9a84c);border-radius:6px;padding:3px 10px;color:var(--gold,#c9a84c);font-size:11px;cursor:pointer;margin-right:6px;">👁️ عرض</button>`;
  div.querySelector('.file-name').textContent = safeName;
  // ربط زر العرض بالملف الفعلي — يُضاف لاحقاً في processFiles
  list.appendChild(div);
}

// ===== SMART SEARCH + CARD FILTER → moved to js/core/search-system.js =====
// ===== DETAIL MODALS =====
// Safe lazy reference — يقرأ QS_CONTENT عند كل وصول
// Key aliases: card key → content key (when names differ)
window._CONTENT_ALIASES = {
  // All previous aliases removed — data_content_extra.js and data_content_phase4.js
  // now provide dedicated content for every key. Aliases were shadowing newer content.
};

const detailData = new Proxy({}, {
  get: function(_, key) {
    var realKey = (window._CONTENT_ALIASES && window._CONTENT_ALIASES[key]) || key;
    return (window.QS_CONTENT || {})[realKey];
  },
  has: function(_, key) {
    var realKey = (window._CONTENT_ALIASES && window._CONTENT_ALIASES[key]) || key;
    return realKey in (window.QS_CONTENT || {});
  }
});


// ===== LOCAL VIDEO LOADER =====
// VIDEO PERSISTENCE SYSTEM → نُقل إلى js/core/video-system.js (A2 Refactor)

// ===== DOCUMENT ANALYZER =====
const docUploaded = { specs: [], drawings: [], boq: [], gi: [] };

function handleDocUpload(input, type) {
  const files = Array.from(input.files);
  docUploaded[type] = docUploaded[type].concat(files);
  
  const listId = 'doc-files-list';
  let listEl = document.getElementById(listId);
  if (!listEl) listEl = document.getElementById('doc-files-list-en');
  
  const allFiles = [];
  Object.keys(docUploaded).forEach(function(t) {
    docUploaded[t].forEach(function(f) {
      allFiles.push({ name: f.name, type: t, size: (f.size/1024).toFixed(0) });
    });
  });
  
  let html = allFiles.map(function(f) {
    const icons = { specs:'📋', drawings:'📐', boq:'📊', gi:'🔬' };
    return '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(255,255,255,0.05);border-radius:6px;margin:4px 0;font-size:12px;">' +
      '<span>' + (icons[f.type]||'📄') + '</span>' +
      '<span style="flex:1;color:var(--text1);">' + sanitizeText(f.name) + '</span>' +
      '<span style="color:var(--text3);">' + f.size + ' KB</span>' +
      '</div>';
  }).join('');
  
  if (listEl) listEl.innerHTML = html;
  
  // Show analysis panel if files uploaded
  let panel = document.getElementById('doc-analysis-panel');
  if (panel && allFiles.length > 0) panel.style.display = 'block';
}

function runDocAnalysis() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('doc_analyzer','🤖','محلل المستندات الذكي — Pro فقط','تحليل المواصفات والعقود وملفات PDF باستخدام الذكاء الاصطناعي متاح للمشتركين في Pro فقط.');
    return;
  }
  const resultEl = document.getElementById('doc-ai-result') || document.getElementById('doc-ai-result-en');
  if (!resultEl) return;
  
  const totalFiles = Object.values(docUploaded).reduce(function(s,a){ return s + a.length; }, 0);
  if (totalFiles === 0) {
    resultEl.innerHTML = '<div style="color:#e74c3c;padding:10px;font-size:13px;">⚠️ Please upload at least one document first</div>';
    return;
  }
  
  const projType = document.getElementById('doc-project-type') ? 
    document.getElementById('doc-project-type').value :
    document.getElementById('doc-project-type-en').value;
  
  const doITP = (document.getElementById('da-itp') || document.getElementById('da-itp-en')).checked;
  const doTests = (document.getElementById('da-tests') || document.getElementById('da-tests-en')).checked;
  const doQty = (document.getElementById('da-qty') || document.getElementById('da-qty-en')).checked;
  
  resultEl.innerHTML = '<div style="padding:12px;text-align:center;"><div style="font-size:24px;margin-bottom:8px;">⚡</div><div style="color:var(--gold);font-size:13px;">Analyzing ' + totalFiles + ' document(s)...</div></div>';
  
  // Build analysis prompt
  const fileNames = Object.entries(docUploaded).map(function(e) {
    return e[1].map(function(f){ return e[0] + ': ' + f.name; });
  }).flat().join(', ');
  
  const prompt = 'You are QatarSpec Pro AI assistant. A user has uploaded the following project documents: ' + fileNames + 
    '. Project type: ' + projType + '. Based on QCS 2024 and standard Qatar construction practice, provide: ' +
    (doITP ? '1. Key ITP hold points and witness points for this project type. ' : '') +
    (doTests ? '2. Critical testing requirements and frequencies. ' : '') +
    (doQty ? '3. Key quantity thresholds that trigger additional testing. ' : '') +
    'Be specific, practical, and reference QCS 2024 sections. Keep response concise and structured.';
  
  fetchGeminiAPI({
    model: 'gemini-2.0-flash',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  }).then(function(r){ return r.json(); })
  .then(function(data) {
    let text = data.content && data.content[0] ? data.content[0].text : 'Analysis complete. Upload documents to get specific guidance.';
    resultEl.innerHTML = '<div style="background:var(--dark4);border-radius:10px;padding:14px;">' +
      '<div style="color:var(--gold);font-weight:700;margin-bottom:8px;font-size:13px;">🤖 AI Analysis Results</div>' +
      '<div style="font-size:12px;color:var(--text1);line-height:1.7;white-space:pre-wrap;">' + renderMarkdownSafe(text) + '</div>' +
      '</div>';
  }).catch(function() {
    // Fallback analysis based on project type
    let analysis = getProjectAnalysis(projType, doITP, doTests);
    resultEl.innerHTML = '<div style="background:var(--dark4);border-radius:10px;padding:14px;">' +
      '<div style="color:var(--gold);font-weight:700;margin-bottom:8px;font-size:13px;">📋 Project Analysis — ' + sanitizeText(projType.toUpperCase()) + '</div>' +
      '<div style="font-size:12px;color:var(--text1);line-height:1.7;">' + renderMarkdownSafe(analysis) + '</div>' +
      '</div>';
  });
}

function getProjectAnalysis(type, doITP, doTests) {
  const analyses = {
    roads: '<strong>Road Project — Key Hold Points:</strong><br>1. Subgrade CBR approved before Subbase<br>2. Subbase compaction 98% MDD before Base Course<br>3. Base Course CBR 80% + level ±8mm before Prime Coat<br>4. JMF approval before asphalt production<br>5. Trial section approved before full production<br>6. IRI ≤0.9 m/km for PMB WC before handover',
    utilities: '<strong>Utilities Project — Key Hold Points:</strong><br>1. Material Approval (MAR) before pipe delivery<br>2. Joint inspection before backfill<br>3. Pressure test 1.5×PN for water pipes<br>4. Air test 100mm WG for sewer<br>5. CCTV 100% Grade ≤2<br>6. Water quality: Coliform=0, Turbidity ≤1 NTU',
    building: '<strong>Building Project — Key Hold Points:</strong><br>1. Founding level geotechnical approval<br>2. Rebar inspection before every pour<br>3. 28-day cube ≥fcu before striking formwork<br>4. Cover check after striking<br>5. Waterproofing inspection before backfill',
    mixed: '<strong>Mixed Project — All Key Hold Points:</strong><br>Roads: CBR levels → JMF → Trial Section → IRI<br>Utilities: MAR → Joint check → Pressure test → CCTV<br>Structural: Founding → Rebar → Cube results'
  };
  return analyses[type] || analyses.mixed;
}


// ===== COMPLETE BILINGUAL SYSTEM =====
let currentLang = localStorage.getItem('qsp_lang') || 'ar';

const TR = {
  ar: {
    dir: 'rtl', lang: 'ar', align: 'right',
    appName: 'دليل المواصفات القطرية',
    appSub: 'Qatar Engineering Standards',
    keyBtn: 'إعداد AI',
    heroEyebrow: '⚡ بحث ذكي في QCS 2024 الرسمي',
    heroH1: 'كل المواصفات<br>القطرية في<br><span>مكان واحد</span>',
    heroDesc: 'ارفع ملفات PDF وابحث بذكاء في الكود القطري والمواصفات الإنشائية — إجابات فورية دقيقة',
    stat1: 'صفحة مواصفات', stat2: 'ملف QCS 2024', stat3: 'سنة خبرة',
    upTitle: 'ارفع المواصفات هنا',
    upDesc: 'اسحب ملفات PDF الكود القطري<br>أو اضغط لاختيار الملفات',
    upBtn: '📤 اختر ملفات PDF',
    upFmt: 'يدعم: PDF • حجم أقصى 50MB',
    searchLabel: '🔍 البحث الذكي في QCS 2024',
    searchPH: 'اسأل أي سؤال... مثال: ما هي متطلبات سماكة الخرسانة وفق QCS؟',
    searchBtn: '⚡ بحث ذكي',
    tag1:'🏛️ الخرسانة المسلحة', tag2:'⚓ الأساسات', tag3:'🔥 متطلبات الحريق',
    tag4:'🛣️ الطرق', tag5:'🌡️ العزل', tag6:'🔬 اختبارات التربة', tag7:'⚒️ مراحل التنفيذ',
    tq1:'متطلبات الخرسانة المسلحة', tq2:'مواصفات الأساسات والخوازيق',
    tq3:'اشتراطات الحريق للمباني', tq4:'مواصفات الطرق والأرصفة',
    tq5:'العزل الحراري والرطوبي', tq6:'اختبارات التربة', tq7:'مراحل تنفيذ المشاريع',
    secTitle: 'آخر <span>المواصفات</span>',
    secSub: 'كل أقسام الكود القطري — اضغط لفتح',
    c1n:'أعمال الطرق', c1d:'Subgrade، Subbase، إسفلت، اختبارات، تسليم', c1c:'8 مراحل + ITPs',
    c2n:'شبكات المرافق', c2d:'مياه الشرب، الصرف الصحي، السطحي، المعالجة', c2c:'4 شبكات + ITPs',
    c3n:'الكود الإنشائي', c3d:'خرسانة، حديد، أساسات، خوازيق، شدات', c3c:'4 أقسام + ITPs',
    c4n:'الجسات والتربة', c4d:'SPT، Boreholes، مختبر، مياه جوفية، تقرير', c4c:'6 أقسام + ITP',
    c5n:'الحريق والسلامة', c5d:'QCDD، Sprinkler، مخارج الطوارئ، Hose Reel', c5c:'متطلبات QCDD',
    c6n:'حاسبة المواصفات', c6d:'أدخل أي اختبار → Pass أو Fail فوراً', c6c:'50+ اختبار',
    catArr: '←',
    itpProj:'اسم المشروع', itpEng:'اسم المهندس', itpNum:'رقم ITP',
    exportBtn:'📄 تصدير PDF',
    updateMsg:'🔔 يوجد تحديث جديد — ', updateLink:'تحديث الآن',
    tab1:'🛣️ طرق', tab2:'🔧 مرافق', tab3:'🏗️ إنشاء', tab4:'🔬 جسات',
    calcBtn:'احسب', classBtn:'صنّف',
    backBtn:'→ رجوع',
    f1:'المواصفات', f2:'الأقسام', f3:'الأدوات',
    fcopy:'© 2025 دليل المواصفات القطرية — QatarSpec Pro',
    aiCopy:'📋 نسخ الإجابة',
    searching:'جاري البحث في المواصفات...',
    // Key Modal
    keyModalTitle:'🔑 إعداد AI',
    keyModalDesc:'التطبيق يعمل عبر server proxy آمن — لا حاجة لمفتاح شخصي. للاستخدام المحلي فقط أدخل Gemini API Key.',
    keyModalNote:'✅ <strong>الإنتاج:</strong> يعمل تلقائياً عبر /api/ai-proxy و /api/vision-proxy — لا حاجة لأي مفتاح. المفتاح هنا للتطوير المحلي فقط.',
    keyModalPH:'AIza... (Gemini — للتطوير المحلي فقط)',
    keyModalSave:'✅ حفظ وتفعيل',
    keyModalCancel:'إلغاء',
    // Pro Modal
    proModalSub:'الأداة الاحترافية الأولى للمواصفات القطرية — اختر الخطة المناسبة',
    planFreeName:'🆓 المجاني',
    planFreePeriod:'للأبد — بدون بطاقة',
    planFreeF1:'5 بحث ذكي يومياً',
    planFreeF2:'كل المحتوى الثابت (100+ قسم)',
    planFreeF3:'الحاسبات الأساسية',
    planFreeF4:'تصدير PDF / Word',
    planFreeF5:'محلل المستندات الذكي',
    planFreeF6:'محلل المخططات',
    planFreeF7:'المفتش الذكي بالصور',
    planFreeF8:'بحث غير محدود',
    planFreeCta:'الخطة الحالية',
    planProBadge:'🔥 الأكثر شيوعاً',
    planProPeriod:'شهرياً',
    planProSave:'سنوياً — وفر 33%',
    planProF1:'بحث ذكي غير محدود',
    planProF2:'كل المحتوى الثابت (100+ قسم)',
    planProF3:'جميع الحاسبات',
    planProF4:'تصدير PDF + Word احترافي',
    planProF5:'محلل المستندات بالذكاء الاصطناعي',
    planProF6:'محلل المخططات (Structural/Road)',
    planProF7:'المفتش الذكي بالصور',
    planProF8:'دعم فني أولوية',
    planProMonthly:'🚀 اشترك شهرياً — 99 QAR',
    planProYearly:'💎 اشترك سنوياً — 799 QAR <span style="font-size:10px;opacity:0.9;">(وفر 33%)</span>',
    promoTitle:'🎁 لديك كود خصم أو ترقية؟',
    promoDesc:'أدخل الكود لتفعيل النسخة Pro فوراً',
    promoActivate:'✅ تفعيل',
    payContactTitle:'📱 للاشتراك — تواصل معنا مباشرةً',
    waReply:'رد خلال ساعة — دفع آمن',
    emailLabel:'البريد الإلكتروني',
    payMethods:'💳 نقبل: بطاقات ائتمان · تحويل بنكي · Ooredoo Pay · QNB',
    proGuarantee:'✅ ضمان استرداد 7 أيام &nbsp;|&nbsp; 🔒 دفع آمن &nbsp;|&nbsp; 🇶🇦 مصمم لمهندسي قطر',
    // Upgrade Overlay
    upgradeDefault:'ميزة Pro',
    upgradeDefaultDesc:'هذه الميزة متاحة للمشتركين في النسخة Pro فقط.',
    upgradeCta:'🚀 ارقَ إلى Pro الآن',
    upgradeDismiss:'ليس الآن',
    // Offline
    offlineMsg:'📡 أنت غير متصل — بعض الميزات غير متاحة',
    // AI Disclaimer
    aiDisc:'🔍 <strong>بحث RAG:</strong> يتم جلب نصوص QCS 2024 الفعلية من قاعدة البيانات أولاً، ثم بناء الإجابة عليها. القرارات الهندسية الرسمية تتطلب مراجعة الوثيقة الأصلية.',
    // Signature
    sigLabel:'التوقيع الرقمي — QC Engineer',
    sigClear:'مسح',
    sigSave:'✅ حفظ التوقيع',
    sigSaved:'✅ تم الحفظ',
    forExport:'للتصدير الرسمي',
    sigBtn:'✍️ توقيع',
    // Legal Disclaimer
    legalTitle:'⚖️ إخلاء المسؤولية القانونية',
    legalP1:'<strong>QatarSpec Pro</strong> هو مرجع معرفي عام (General Knowledge Reference) للمهندسين والمقاولين في دولة قطر.',
    legalP2:'🔹 جميع المعلومات مبنية على <strong>QCS 2024</strong> و <strong>Ashghal Standards</strong> و <strong>KAHRAMAA Regulations</strong> المتاحة للعامة.',
    legalP3:'🔹 هذا التطبيق <strong>لا يُعتمد</strong> كمرجع تصميمي رسمي — يجب مراجعة الوثائق الأصلية المعتمدة من الجهات المختصة قبل أي قرار هندسي.',
    legalP4:'🔹 لا تتحمل QatarSpec Pro مسؤولية أي أخطاء في التطبيق أو سوء استخدام المعلومات.',
    legalP5:'🔹 للاستخدام المهني التعليمي فقط — <strong>Not for Construction Design Purposes</strong>.',
    legalContact:'📧 للاستفسارات: info@qatarspec.com | 🇶🇦 صُمم لمهندسي قطر',
    // Toast
    toastDone:'✅ تم!',
    // Footer legal links
    termsLink:'الشروط والأحكام',
    privacyLink:'سياسة الخصوصية',
  },
  en: {
    dir: 'ltr', lang: 'en', align: 'left',
    appName: 'Qatar Spec Guide',
    appSub: 'QCS 2024 Engineering Reference',
    keyBtn: 'AI Setup',
    heroEyebrow: '⚡ Smart Search in Official QCS 2024',
    heroH1: 'All Qatar<br>Specifications<br><span>in One Place</span>',
    heroDesc: 'Upload PDF specs and search intelligently across Qatar Construction Code — instant precise answers',
    stat1: 'Pages of Specs', stat2: 'QCS 2024 Files', stat3: 'Years Experience',
    upTitle: 'Upload Specifications Here',
    upDesc: 'Drag Qatar Code PDF files<br>or click to select files',
    upBtn: '📤 Choose PDF Files',
    upFmt: 'Supports: PDF • Max 50MB per file',
    searchLabel: '🔍 Smart Search in QCS 2024',
    searchPH: 'Ask any question... e.g. Concrete thickness requirements for foundations per QCS?',
    searchBtn: '⚡ Smart Search',
    tag1:'🏛️ Reinforced Concrete', tag2:'⚓ Foundations', tag3:'🔥 Fire Requirements',
    tag4:'🛣️ Roads', tag5:'🌡️ Insulation', tag6:'🔬 Soil Testing', tag7:'⚒️ Execution Phases',
    tq1:'reinforced concrete requirements', tq2:'foundations and piles specifications',
    tq3:'fire safety requirements', tq4:'roads asphalt specifications',
    tq5:'thermal moisture insulation', tq6:'soil testing SPT', tq7:'project execution phases',
    secTitle: 'Latest <span>Specifications</span>',
    secSub: 'All Qatar Code sections — click to open',
    c1n:'Road Works', c1d:'Subgrade, Subbase, Asphalt, Tests, Handover', c1c:'8 Phases + ITPs',
    c2n:'Utility Networks', c2d:'Water Supply, Foul Sewer, Storm, Treated Water', c2c:'4 Networks + ITPs',
    c3n:'Structural Code', c3d:'Concrete, Rebar, Foundations, Piles, Formwork', c3c:'4 Sections + ITPs',
    c4n:'Geotechnical', c4d:'SPT, Boreholes, Lab, Groundwater, Reports', c4c:'6 Sections + ITP',
    c5n:'Fire & Safety', c5d:'QCDD, Sprinkler, Emergency Exits, Hose Reel', c5c:'QCDD Requirements',
    c6n:'Spec Calculator', c6d:'Enter any test → Instant Pass or Fail', c6c:'50+ Tests',
    catArr: '→',
    itpProj:'Project Name', itpEng:'Engineer Name', itpNum:'ITP Number',
    exportBtn:'📄 Export PDF',
    updateMsg:'🔔 New update available — ', updateLink:'Update Now',
    tab1:'🛣️ Roads', tab2:'🔧 Utilities', tab3:'🏗️ Structural', tab4:'🔬 Geotech',
    calcBtn:'Calculate', classBtn:'Classify',
    backBtn:'← Back',
    f1:'Specifications', f2:'Sections', f3:'Tools',
    fcopy:'© 2025 Qatar Spec Guide — QatarSpec Pro',
    aiCopy:'📋 Copy Answer',
    searching:'Searching specifications...',
    // Key Modal
    keyModalTitle:'🔑 AI Setup',
    keyModalDesc:'The app works via secure server proxy — no personal key needed. For local development only, enter your Gemini API Key.',
    keyModalNote:'✅ <strong>Production:</strong> Works automatically via /api/ai-proxy &amp; /api/vision-proxy — no key needed. Key here is for local development only.',
    keyModalPH:'AIza... (Gemini — local development only)',
    keyModalSave:'✅ Save & Activate',
    keyModalCancel:'Cancel',
    // Pro Modal
    proModalSub:"Qatar's #1 Professional Specifications Tool — Choose Your Plan",
    planFreeName:'🆓 Free',
    planFreePeriod:'Forever — No card needed',
    planFreeF1:'5 AI searches per day',
    planFreeF2:'All static content (100+ sections)',
    planFreeF3:'Basic calculators',
    planFreeF4:'Export PDF / Word',
    planFreeF5:'Smart Document Analyzer',
    planFreeF6:'Drawing Analyzer',
    planFreeF7:'AI Photo Inspector',
    planFreeF8:'Unlimited search',
    planFreeCta:'Current Plan',
    planProBadge:'🔥 Most Popular',
    planProPeriod:'Monthly',
    planProSave:'Yearly — Save 33%',
    planProF1:'Unlimited AI search',
    planProF2:'All static content (100+ sections)',
    planProF3:'All calculators',
    planProF4:'Professional PDF + Word export',
    planProF5:'AI Document Analyzer',
    planProF6:'Drawing Analyzer (Structural/Road)',
    planProF7:'AI Photo Inspector',
    planProF8:'Priority technical support',
    planProMonthly:'🚀 Subscribe Monthly — 99 QAR',
    planProYearly:'💎 Subscribe Yearly — 799 QAR <span style="font-size:10px;opacity:0.9;">(Save 33%)</span>',
    promoTitle:'🎁 Have a promo or upgrade code?',
    promoDesc:'Enter code to activate Pro instantly',
    promoActivate:'✅ Activate',
    payContactTitle:'📱 To Subscribe — Contact Us Directly',
    waReply:'Reply within 1 hour — Secure payment',
    emailLabel:'Email',
    payMethods:'💳 Accepted: Credit Cards · Bank Transfer · Ooredoo Pay · QNB',
    proGuarantee:'✅ 7-Day Money Back &nbsp;|&nbsp; 🔒 Secure Payment &nbsp;|&nbsp; 🇶🇦 Built for Qatar Engineers',
    // Upgrade Overlay
    upgradeDefault:'Pro Feature',
    upgradeDefaultDesc:'This feature is available for Pro subscribers only.',
    upgradeCta:'🚀 Upgrade to Pro Now',
    upgradeDismiss:'Not Now',
    // Offline
    offlineMsg:'📡 You are offline — some features unavailable',
    // AI Disclaimer
    aiDisc:'🔍 <strong>RAG Search:</strong> Actual QCS 2024 text is retrieved from the database first, then the answer is built from it. Official engineering decisions require reviewing the original approved document.',
    // Signature
    sigLabel:'Digital Signature — QC Engineer',
    sigClear:'Clear',
    sigSave:'✅ Save Signature',
    sigSaved:'✅ Saved',
    forExport:'For Official Export',
    sigBtn:'✍️ Signature',
    // Legal Disclaimer
    legalTitle:'⚖️ Legal Disclaimer',
    legalP1:'<strong>QatarSpec Pro</strong> is a General Knowledge Reference for engineers and contractors in Qatar.',
    legalP2:'🔹 All information is based on publicly available <strong>QCS 2024</strong>, <strong>Ashghal Standards</strong>, and <strong>KAHRAMAA Regulations</strong>.',
    legalP3:'🔹 This app is <strong>not approved</strong> as an official design reference — original documents approved by relevant authorities must be reviewed before any engineering decision.',
    legalP4:'🔹 QatarSpec Pro bears no responsibility for any errors in the app or misuse of information.',
    legalP5:'🔹 For professional educational use only — <strong>Not for Construction Design Purposes</strong>.',
    legalContact:'📧 Enquiries: info@qatarspec.com | 🇶🇦 Built for Qatar Engineers',
    // Toast
    toastDone:'✅ Done!',
    // Footer legal links
    termsLink:'Terms & Conditions',
    privacyLink:'Privacy Policy',
  }
};

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

// Auto-apply on load
window.addEventListener('DOMContentLoaded', function(){ setLang(currentLang); });


// ===== VERSION CHECK =====
const APP_VERSION = '2.10.0';
async function checkForUpdates() {
  try {
    const res = await fetch('/version.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      if (data.version && data.version !== APP_VERSION) {
        document.getElementById('update-banner').style.display = 'block';
      }
    }
  } catch(e) {}
}

// ── Core runtime functions (sync — must be available before data_calcs.js loads) ──
// ─── Central timer registry — prevents setTimeout stacking ───
// safeTimeout is defined inline in index.html (needed before data_calcs.js loads)
// Re-using the same stub — data_calcs.js internal calls go through window.safeTimeout
function safeTimeout(key, fn, delay) {
  if (window._timers_stub && window._timers_stub[key]) clearTimeout(window._timers_stub[key]);
  if (!window._timers_stub) window._timers_stub = {};
  window._timers_stub[key] = setTimeout(function() { window._timers_stub[key] = null; fn(); }, delay);
}

let navStack = [];

/**
 * يزيل محتوى اللغة الخاطئة من HTML قبل حقنه في الـ DOM
 * يمنع ظهور كروت مكررة (عربي + إنجليزي) داخل أقسام التفاصيل
 * @param {string} contentHTML - محتوى الـ HTML الخام من QS_CONTENT
 * @param {string} lang - اللغة الحالية ('ar' أو 'en')
 * @returns {string} - HTML نظيف بلغة واحدة فقط
 */
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

/**
 * يفتح الـ modal لعرض محتوى مفتاح معيّن من detailData
 * @param {string} key - مفتاح القسم (مثال: 'structural', 'roads', 'ws_laying')
 * يدير navStack للتنقل للخلف، ويستعيد الفيديوهات المحلية بعد rebuild
 */
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
  document.getElementById('dmContent').innerHTML = dedupeSectionContent(d.content, window.currentLang || 'ar');
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
  document.getElementById('dmContent').innerHTML = dedupeSectionContent(d.content, window.currentLang || 'ar');
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

// showToast → نُقلت إلى js/core/ui-utils.js (A1 Refactor)

// ESCAPE_MAP + sanitizeText → نُقلتا إلى js/core/ui-utils.js (A1 Refactor)

// renderMarkdownSafe → نُقلت إلى js/core/ui-utils.js (A1 Refactor)

// safeRender → نُقلت إلى js/core/ui-utils.js (A1 Refactor)


// ─── API Helper: server-side proxy (Vercel Edge Function) ───
/**
 * fetchGeminiAPI — يتصل بـ server-side proxy (آمن للإنتاج)
 * المفتاح على السيرفر فقط — لا يُكشف في المتصفح
 */
async function fetchGeminiAPI(body) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('/api/ai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    qsTrack('AI Proxy Used', { tier: typeof getProToken === 'function' && getProToken() ? 'pro' : 'free' });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('انتهت مهلة الاتصال (20 ثانية) — حاول مرة أخرى');
    }
    if (!navigator.onLine) {
      throw new Error('لا يوجد اتصال بالإنترنت');
    }
    throw err;
  }
}




function printCurrentDetail() {
  let title = document.getElementById('dmTitle').textContent;
  const printArea = document.getElementById('print-area');
  const originalContent = printArea.innerHTML;
  let today = new Date().toLocaleDateString('ar-QA');
  
  const header = '<div class="print-header"><div style="display:flex;justify-content:space-between;">' +
    '<div><div style="font-size:20px;font-weight:700;color:#7a1515;">QatarSpec Pro</div>' +
    '<div style="font-size:12px;color:#666;">المرجع: QCS 2024</div></div>' +
    '<div style="text-align:left;"><div style="font-size:12px;color:#666;">' + today + '</div>' +
    '<div style="font-size:10px;color:#999;">qatar-standers.vercel.app</div></div></div>' +
    '<div style="font-size:16px;font-weight:700;margin-top:8px;">' + title + '</div></div>';
  
  const footer = '<div class="print-footer"><div style="display:flex;justify-content:space-between;">' +
    '<span>QatarSpec Pro</span><span>QCS 2024 | qatar-standers.vercel.app</span></div></div>';
  
  printArea.innerHTML = header + originalContent + footer;
  window.print();
  setTimeout(function() { printArea.innerHTML = originalContent; }, 1000);
}


// ===== GEOTECH CALCULATOR =====
safeTimeout('checkUpdates', checkForUpdates, 3000);

// ═══════════════════════════════════════════════════════════════
// PHASE 6 — FORMS HELPERS
// ═══════════════════════════════════════════════════════════════
function switchForm(tab) {
  const forms = ['rfi','ncr','dpr','ms'];
  let colors = { rfi:'rgba(201,168,76,.15)', ncr:'rgba(231,76,60,.15)', dpr:'rgba(52,152,219,.15)', ms:'rgba(155,89,182,.15)' };
  const borders = { rfi:'rgba(201,168,76,.4)', ncr:'rgba(231,76,60,.4)', dpr:'rgba(52,152,219,.4)', ms:'rgba(155,89,182,.4)' };
  const texts = { rfi:'var(--gold2)', ncr:'#e74c3c', dpr:'#3498db', ms:'#9b59b6' };
  forms.forEach(function(f) {
    let el = document.getElementById('form-' + f);
    let btn = document.getElementById('ftab-' + f);
    if (el) el.style.display = f === tab ? 'block' : 'none';
    if (btn) {
      if (f === tab) {
        btn.style.background = colors[f]; btn.style.borderColor = borders[f]; btn.style.color = texts[f]; btn.style.fontWeight = '700';
      } else {
        btn.style.background = 'var(--dark4)'; btn.style.borderColor = 'var(--border)'; btn.style.color = 'var(--text2)'; btn.style.fontWeight = '400';
      }
    }
  });
}

function autoFillRFI() {
  let today = new Date();
  let yr = today.getFullYear();
  let seq = (Math.floor(Math.random() * 900) + 100);
  let el = document.getElementById('rfi-num');
  if (el && (!el.value || el.value === 'RFI-2024-001')) {
    el.value = 'RFI-' + yr + '-' + String(seq).padStart(3,'0');
  }
  let d = document.getElementById('rfi-date');
  if (d && !d.value) d.value = today.toISOString().split('T')[0];
  const rb = document.getElementById('rfi-reqby');
  if (rb && !rb.value) {
    const req = new Date(today); req.setDate(req.getDate() + 3);
    rb.value = req.toISOString().split('T')[0];
  }
  showToast('✅ تم توليد رقم RFI-' + yr + '-' + seq + ' والتواريخ');
}

function autoFillNCR() {
  let today = new Date();
  const yr = today.getFullYear();
  let proj = (document.getElementById('ncr-proj') && document.getElementById('ncr-proj').value) ? document.getElementById('ncr-proj').value.replace(/\s+/g,'').substring(0,6).toUpperCase() : 'PROJ';
  const seq = (Math.floor(Math.random() * 900) + 100);
  let el = document.getElementById('ncr-num');
  if (el) el.value = 'NCR-' + proj + '-' + yr + '-' + String(seq).padStart(3,'0');
  let d = document.getElementById('ncr-date');
  if (d && !d.value) d.value = today.toISOString().split('T')[0];
  let t = document.getElementById('ncr-target');
  if (t && !t.value) {
    const tgt = new Date(today); tgt.setDate(tgt.getDate() + 7);
    t.value = tgt.toISOString().split('T')[0];
  }
  showToast('✅ تم توليد رقم NCR-' + proj + '-' + yr + '-' + seq);
}

// ═══════════════════════════════════════════════════════════════
// PHASE 5 — MISSING CALC FUNCTIONS (sulphate already existed)
// ═══════════════════════════════════════════════════════════════



// ===== ITP PROJECT BAR =====
function toggleITPBar(show) {
  const bar = document.getElementById('itp-project-bar');
  if (bar) bar.style.display = show ? 'block' : 'none';
}

// ===== PDF EXPORT =====
// ═══════════════════════════════════════════════════════════════
// PHASE 7 — PROFESSIONAL EXPORT ENGINE
// ═══════════════════════════════════════════════════════════════

// --- Library loaders ---
function loadJsPDF() {
  if (window.jspdf) return Promise.resolve(window.jspdf);
  return new Promise(function(res, rej) {
    let s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = function() { res(window.jspdf); };
    s.onerror = function() { rej(new Error('jsPDF load failed')); };
    document.head.appendChild(s);
  });
}
function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise(function(res, rej) {
    let s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = function() { res(window.html2canvas); };
    s.onerror = function() { rej(new Error('html2canvas load failed')); };
    document.head.appendChild(s);
  });
}

// --- PDF Export (jsPDF + html2canvas) ---
async function exportToPDF() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('pdf','📄','تصدير PDF — ميزة Pro','تصدير التقارير والـ ITP إلى PDF احترافي متاح للمشتركين في Pro فقط.');
    return;
  }
  let title = document.getElementById('dmTitle').textContent.trim();
  let today = new Date().toLocaleDateString('ar-QA');
  let projEl = document.getElementById('itp-project-name');
  let proj = projEl ? (projEl.value || '') : '';

  showToast('⏳ جاري إعداد PDF...');
  try {
    const jsPDFLib = await loadJsPDF();
    const h2c = await loadHtml2Canvas();
  } catch(e) {
    // Fallback to print window if CDN unreachable
    return _printFallback(title, proj, today);
  }

  let contentEl = document.getElementById('dmContent');
  if (!contentEl) return;

  // Render the content area to canvas
  const canvas = await h2c(contentEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#181818',
    logging: false,
    removeContainer: true
  });

  const { jsPDF } = jsPDFLib;;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 12;

  // ── Header band ──
  pdf.setFillColor(122, 21, 21);
  pdf.rect(0, 0, pageW, 18, 'F');
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(201, 168, 76);
  pdf.text('QatarSpec Pro', margin, 11);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(255, 255, 255);
  pdf.text('QCS 2024 Reference', margin, 16);
  pdf.text(today, pageW - margin, 11, { align: 'right' });
  if (proj) pdf.text(proj, pageW - margin, 16, { align: 'right' });

  // ── Title bar ──
  pdf.setFillColor(42, 42, 42);
  pdf.rect(0, 18, pageW, 10, 'F');
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(201, 168, 76);
  const safeTitle = title.replace(/[^\x00-\x7F]/g, ' ').substring(0, 80);
  pdf.text(safeTitle, margin, 25);

  // ── Watermark ──
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.setGState(new pdf.GState({ opacity: 0.04 }));
  pdf.text('QatarSpec Pro — QCS 2024', pageW / 2, pageH / 2, { align: 'center', angle: 45 });
  pdf.setGState(new pdf.GState({ opacity: 1 }));

  // ── Content image ──
  const imgData = canvas.toDataURL('image/jpeg', 0.85);
  const imgW = pageW - margin * 2;
  const imgH = (canvas.height * imgW) / canvas.width;
  let contentY = 32;
  const available = pageH - contentY - 16; // leave footer room

  if (imgH <= available) {
    pdf.addImage(imgData, 'JPEG', margin, contentY, imgW, imgH);
  } else {
    // Multi-page split
    const ratio = canvas.width / imgW;
    const sliceH_px = Math.floor(available * ratio);
    let offsetY = 0;
    let page = 0;
    while (offsetY < canvas.height) {
      if (page > 0) {
        pdf.addPage();
        _pdfPageHeader(pdf, pageW, today);
        contentY = 14;
      }
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width  = canvas.width;
      sliceCanvas.height = Math.min(sliceH_px, canvas.height - offsetY);
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, offsetY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
      const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.85);
      const sliceImgH = (sliceCanvas.height / ratio);
      pdf.addImage(sliceData, 'JPEG', margin, contentY, imgW, sliceImgH);
      offsetY += sliceH_px;
      page++;
    }
  }

  // ── Footer ──
  const totalPages = pdf.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFillColor(42, 42, 42);
    pdf.rect(0, pageH - 10, pageW, 10, 'F');
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(150, 150, 150);
    pdf.text('QatarSpec Pro — للاستخدام المهني | QCS 2024', margin, pageH - 4);
    pdf.text(p + ' / ' + totalPages, pageW - margin, pageH - 4, { align: 'right' });
  }

  let fileName = 'QatarSpec-' + safeTitle.trim().replace(/\s+/g, '-').substring(0, 30) + '.pdf';
  pdf.save(fileName);
  showToast('✅ تم تصدير PDF — ' + fileName);
}

function _pdfPageHeader(pdf, pageW, today) {
  pdf.setFillColor(42, 42, 42);
  pdf.rect(0, 0, pageW, 12, 'F');
  pdf.setFontSize(7); pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(150, 150, 150);
  pdf.text('QatarSpec Pro — QCS 2024', 12, 8);
  pdf.text(today, pageW - 12, 8, { align: 'right' });
}

function _printFallback(title, proj, today) {
  let contentEl = document.getElementById('dmContent');
  const contentHTML = contentEl ? contentEl.innerHTML : '';
  let w = window.open('', '_blank', 'width=900,height=700');
  if (!w) { showToast('❌ فعّل النوافذ المنبثقة في المتصفح'); return; }
  w.document.write('<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Tajawal:wght@400;700&display=swap" rel="stylesheet">' +
    '<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Cairo,Tajawal,Arial,sans-serif;direction:rtl;background:#fff;color:#1a1a1a;font-size:13px;line-height:1.6}.hdr{background:#7a1515;color:#c9a84c;padding:14px 20px;display:flex;justify-content:space-between}.wrap{padding:16px 20px}table{width:100%;border-collapse:collapse;font-size:11px}th{background:#7a1515;color:#fff;padding:7px 8px;border:1px solid #6a1010}td{padding:6px 8px;border:1px solid #ddd}tr:nth-child(even)td{background:#fafafa}.ftr{padding:10px 20px;border-top:1px solid #ddd;display:flex;justify-content:space-between;font-size:10px;color:#888}@media print{body{-webkit-print-color-adjust:exact}}</style>' +
    '</head><body><div class="hdr"><div style="font-size:18px;font-weight:700">QatarSpec Pro</div><div style="font-size:10px;color:#fff;text-align:left">' + today + (proj ? '<br>' + proj : '') + '</div></div>' +
    '<div class="wrap"><h2 style="color:#7a1515;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #c9a84c;font-size:16px">' + title + '</h2>' + contentHTML + '</div>' +
    '<div class="ftr"><span>QatarSpec Pro — QCS 2024</span><span>qatar-standers.vercel.app</span></div><script src="supabase-search.js"><\/script>\n</body></html>');
  w.document.close(); w.focus();
  safeTimeout('printDialog', function() { w.print(); }, 1800);
  showToast('✅ جاري الطباعة');
}

// --- Word Export (HTML-in-docx via Blob) ---
async function exportToWord() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('word','📝','تصدير Word — ميزة Pro','تصدير المواصفات والنماذج إلى ملف Word متاح للمشتركين في Pro فقط.');
    return;
  }
  let title = document.getElementById('dmTitle').textContent.trim();
  let today = new Date().toLocaleDateString('ar-QA');
  const projEl = document.getElementById('itp-project-name');
  const proj = projEl ? (projEl.value || '') : '';
  const contentEl = document.getElementById('dmContent');
  if (!contentEl) return;

  showToast('⏳ جاري إعداد Word...');

  // Extract tables and text cleanly
  const clone = contentEl.cloneNode(true);
  // Remove buttons and interactive elements
  clone.querySelectorAll('button, input, select, textarea, .calc-result').forEach(function(el) { el.remove(); });

  const bodyHTML = clone.innerHTML
    .replace(/style="[^"]*color:\s*var\([^)]+\)[^"]*"/g, '')
    .replace(/background:[^;";]+;?/g, '')
    .replace(/rgba\([^)]+\)/g, '#333');

  const wordHTML = '<!DOCTYPE html>' +
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="UTF-8">' +
    '<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom>' +
    '<w:DoNotOptimizeForBrowser/></w:WordDocument></xml>' +
    '<style>' +
    '@page Section1 { size: 21cm 29.7cm; margin: 2cm 2.5cm 2cm 2.5cm; mso-header-margin: 1cm; mso-footer-margin: 1cm; }' +
    'div.Section1 { page: Section1; }' +
    'body { font-family: "Times New Roman", Arial, sans-serif; direction: rtl; color: #1a1a1a; font-size: 12pt; line-height: 1.6; }' +
    'h1 { font-size: 16pt; font-weight: bold; color: #7a1515; border-bottom: 2pt solid #c9a84c; padding-bottom: 6pt; margin-bottom: 12pt; }' +
    'h2, h3 { font-size: 13pt; font-weight: bold; color: #7a1515; margin: 12pt 0 6pt; }' +
    'p { margin: 6pt 0; font-size: 11pt; }' +
    'table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 10pt; }' +
    'th { background: #7a1515; color: white; padding: 6pt 8pt; text-align: center; border: 1pt solid #6a1010; font-weight: bold; }' +
    'td { padding: 5pt 8pt; border: 1pt solid #cccccc; vertical-align: top; }' +
    'tr:nth-child(even) td { background: #f9f5ee; }' +
    '.header-band { background: #7a1515; color: #c9a84c; padding: 12pt 16pt; margin-bottom: 12pt; display: block; }' +
    '.footer-band { border-top: 1pt solid #cccccc; margin-top: 16pt; padding-top: 6pt; font-size: 9pt; color: #888; }' +
    'strong { color: #7a1515; }';

  const blob   = new Blob(['\ufeff', wordHTML], { type: 'application/msword' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  const safeName = title.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-').substring(0, 40);
  a.href       = url;
  a.download   = 'QatarSpec-' + safeName + '.doc';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
  showToast('✅ تم تصدير Word — ' + a.download);
}


// ITP bar handled in openDetail directly

// ===== FULL BILINGUAL SYSTEM — QATARSPEC PRO =====
// One block handles ALL UI text translation AR <-> EN

const TRANSLATIONS = {
  ar: {
    // Header
    appSubtitle: 'مرجع المواصفات القطرية — QCS 2024',
    searchPlaceholder: 'اسأل أي سؤال... مثال: ما هي متطلبات سماكة الConcrete في الأساسات وفق الكود القطري؟',
    searchBtn: '⚡ بحث ذكي',
    aiSetup: '🔑 إعداد AI',
    keyStatus: '✅ مفعّل',
    keyStatusOff: '⚠️ غير مفعّل',
    // Hero
    heroEyebrow: '⚡ بحث ذكي في QCS 2024 الرسمي',
    heroTitle: 'كل المواصفات<br>القطرية في<br><span>مكان واحد</span>',
    heroDesc: 'ابحث بذكاء في الكود القطري والمواصفات الإنشائية — إجابات فورية دقيقة من خبرتك وتقنية الذكاء الاصطناعي',
    statPages: 'صفحة مواصفات',
    statFiles: 'ملف QCS 2024',
    statYears: 'سنة خبرة',
    // Quick tags
    qt1: '🏛️ الConcrete المسلحة',
    qt2: '⚓ الأساسات',
    qt3: '🔥 متطلبات الحريق',
    qt4: '🛣️ الطرق',
    qt5: '🌡️ العزل',
    // Cat cards
    cat_roads_name: 'أعمال الطرق',
    cat_roads_desc: 'Subgrade، Subbase، إسفلت، اختبارات، تسليم',
    cat_roads_count: '8 مراحل + ITPs',
    cat_utilities_name: 'شبكات المرافق',
    cat_utilities_desc: 'مياه الشرب، Foul Sewer، السطحي، المعالجة',
    cat_utilities_count: '4 شبكات + ITPs',
    cat_structural_name: 'الكود الإنشائي',
    cat_structural_desc: 'Concrete، Rebar، أساسات، خوازيق، شدات',
    cat_structural_count: '4 أقسام + ITPs',
    cat_geotech_name: 'الجسات والتربة',
    cat_geotech_desc: 'SPT، Boreholes، مختبر، مياه جوفية، تقرير',
    cat_geotech_count: '6 أقسام + ITP',
    cat_fire_name: 'الحريق والسلامة',
    cat_fire_desc: 'QCDD، Sprinkler، مخارج الطوارئ، Hose Reel',
    cat_fire_count: 'متطلبات QCDD',
    cat_calc_name: 'حاسبة المواصفات',
    cat_calc_desc: 'أدخل أي اختبار → Pass أو Fail فوراً',
    cat_calc_count: '50+ اختبار',
    // Search results
    searchRef: 'المرجع:',
    searchModel: 'النموذج:',
    searchCopy: '📋 نسخ الإجابة',
    searchLoading: 'جاري البحث...',
    searchError: '❌ خطأ:',
    // ITP bar
    itpProject: 'اسم المشروع',
    itpNumber: 'رقم ITP',
    itpEngineer: 'المهندس',
    itpExport: 'للتصدير الرسمي',
    // PDF / Print buttons
    btnPDF: 'PDF',
    btnPrint: '🖨️',
    // Footer
    footerTitle: 'QatarSpec Pro',
    footerSubtitle: 'مرجع المواصفات القطرية — QCS 2024',
    footerNote: 'جميع المعلومات مستندة إلى QCS 2024 | للاستخدام المهني فقط',
    // Section labels
    secRoads: '🛣️ الطرق',
    secUtils: '🔧 المرافق',
    secStruct: '🏗️ الإنشاء',
    secGeo: '🔬 الجسات',
    secCalc: '🧮 الحاسبة',
    // Update banner
    updateMsg: '🔔 يوجد تحديث جديد للتطبيق —',
    updateBtn: 'تحديث الآن',
    // Calculator main tabs
    calcRoads: '🛣️ طرق',
    calcUtils: '🔧 مرافق',
    calcStruct: '🏗️ إنشاء',
    calcGeo: '🔬 جسات',
    calcBtn: 'Calculate',
    calcClassify: 'صنّف',
  },
  en: {
    // Header
    appSubtitle: 'Qatar Specifications Reference — QCS 2024',
    searchPlaceholder: 'Ask any question... e.g. What are the concrete foundation thickness requirements per Qatar code?',
    searchBtn: '⚡ Smart Search',
    aiSetup: '🔑 AI Setup',
    keyStatus: '✅ Active',
    keyStatusOff: '⚠️ Not Active',
    // Hero
    heroEyebrow: '⚡ Smart Search in Official QCS 2024',
    heroTitle: 'All Qatar<br>Specifications in<br><span>One Place</span>',
    heroDesc: 'Search intelligently through Qatar Code and construction specifications — instant accurate answers powered by AI and engineering expertise',
    statPages: 'Specification Pages',
    statFiles: 'QCS 2024 Files',
    statYears: 'Years Experience',
    // Quick tags
    qt1: '🏛️ Reinforced Concrete',
    qt2: '⚓ Foundations',
    qt3: '🔥 Fire Requirements',
    qt4: '🛣️ Roads',
    qt5: '🌡️ Insulation',
    // Cat cards
    cat_roads_name: 'Road Works',
    cat_roads_desc: 'Subgrade, Subbase, Asphalt, Testing, Handover',
    cat_roads_count: '8 Stages + ITPs',
    cat_utilities_name: 'Utility Networks',
    cat_utilities_desc: 'Water Supply, Foul Sewer, Storm Water, Treated Water',
    cat_utilities_count: '4 Networks + ITPs',
    cat_structural_name: 'Structural Code',
    cat_structural_desc: 'Concrete, Rebar, Foundations, Piles, Formwork',
    cat_structural_count: '4 Sections + ITPs',
    cat_geotech_name: 'Geotechnical Investigation',
    cat_geotech_desc: 'SPT, Boreholes, Laboratory, Groundwater, Report',
    cat_geotech_count: '6 Sections + ITP',
    cat_fire_name: 'Fire & Safety',
    cat_fire_desc: 'QCDD, Sprinkler, Emergency Exits, Hose Reel',
    cat_fire_count: 'QCDD Requirements',
    cat_calc_name: 'Specifications Calculator',
    cat_calc_desc: 'Enter any test result → Pass or Fail instantly',
    cat_calc_count: '50+ Tests',
    // Search results
    searchRef: 'Reference:',
    searchModel: 'Model:',
    searchCopy: '📋 Copy Answer',
    searchLoading: 'Searching...',
    searchError: '❌ Error:',
    // ITP bar
    itpProject: 'Project Name',
    itpNumber: 'ITP No.',
    itpEngineer: 'Engineer',
    itpExport: 'For Official Export',
    // PDF / Print
    btnPDF: 'PDF',
    btnPrint: '🖨️',
    // Footer
    footerTitle: 'QatarSpec Pro',
    footerSubtitle: 'Qatar Specifications Reference — QCS 2024',
    footerNote: 'All information based on QCS 2024 | For Professional Use Only',
    // Section labels
    secRoads: '🛣️ Roads',
    secUtils: '🔧 Utilities',
    secStruct: '🏗️ Structural',
    secGeo: '🔬 Geotech',
    secCalc: '🧮 Calculator',
    // Update banner
    updateMsg: '🔔 A new app update is available —',
    updateBtn: 'Update Now',
    // Calculator main tabs
    calcRoads: '🛣️ Roads',
    calcUtils: '🔧 Utilities',
    calcStruct: '🏗️ Structural',
    calcGeo: '🔬 Geotech',
    calcBtn: 'Calculate',
    calcClassify: 'Classify',
  }
};

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




// ===== XLSX LOADER =====
async function loadXLSX(){if(window.XLSX)return window.XLSX;return new Promise(function(r,j){let s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=function(){r(window.XLSX)};s.onerror=function(){j(new Error('XLSX load failed'))};document.head.appendChild(s)})}

// ===== RFI EXCEL EXPORT =====
async function exportRFIExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
let today = new Date().toLocaleDateString('ar-QA');
let ws = X.utils.aoa_to_sheet([
['\uFEFFQatarSpec Pro — Request for Inspection (RFI)','','',''],
['المرجع: QCS 2024 | Ashghal QA/QC','','تاريخ الطباعة: '+today,''],
['','','',''],
['رقم RFI:',gv('rfi-num'),'رقم المشروع:',gv('rfi-proj')],
['رقم العقد:',gv('rfi-contract'),'المقاول:',gv('rfi-contractor')],
['Submitted By:',gv('rfi-from'),'Directed To:',gv('rfi-to')],
['تاريخ الإرسال:',gv('rfi-date'),'Required By Date:',gv('rfi-reqby')],
['','','',''],
['★ بيانات الموقع','','',''],
['الموقع:',gv('rfi-loc'),'Grid QNG:',gv('rfi-grid')],
['Chainage:',gv('rfi-ch'),'Layer No.:',gv('rfi-layer')],
['QCS Clause:',gv('rfi-clause'),'Drawing No.:',gv('rfi-dwg')],
['','','',''],
['النشاط:',gv('rfi-activity'),'نوع النقطة:',gv('rfi-point')],
['','','',''],
['موضوع RFI:',gv('rfi-subject'),'',''],
['','','',''],
['نتائج الاختبارات:',gv('rfi-results'),'',''],
['','','',''],
['المرفقات:',gv('rfi-attach'),'',''],
['','','',''],
['رد SC / Response:',gv('rfi-response'),'Status:',gv('rfi-status')],
['','','',''],
['توقيع مقدّم الطلب:','___________________','التاريخ:','___________'],
['توقيع SC / Consultant:','___________________','التاريخ:','___________'],
['قرار SC:','مقبول ☐    مرفوض ☐    Hold ☐','','']
]);
ws['!cols']=[{wch:22},{wch:42},{wch:20},{wch:32}];
ws['!merges']=[{s:{r:0,c:0},e:{r:0,c:3}},{s:{r:1,c:0},e:{r:1,c:1}},{s:{r:8,c:0},e:{r:8,c:3}},{s:{r:15,c:1},e:{r:15,c:3}},{s:{r:17,c:1},e:{r:17,c:3}},{s:{r:19,c:1},e:{r:19,c:3}},{s:{r:21,c:1},e:{r:21,c:3}}];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'RFI');
X.writeFile(wb,'RFI-'+gv('rfi-num','001')+'-'+Date.now()+'.xlsx');
showToast('✅ تم تصدير RFI Excel بكامل الحقول');
}

// ===== NCR EXCEL EXPORT =====
async function exportNCRExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
let today = new Date().toLocaleDateString('ar-QA');
const classMap = {'major':'🔴 Major','minor':'🟡 Minor','obs':'🔵 Observation'};
const statusMap = {'open':'🔴 Open','inprog':'🟡 In Progress','accepted':'🟢 Closed — Accepted','rejected':'🔴 Closed — Rejected','pending':'⏳ Pending'};
const ncrClass = classMap[gv('ncr-class')]||gv('ncr-class');
const ncrStatus = statusMap[gv('ncr-status')]||gv('ncr-status');
let ws = X.utils.aoa_to_sheet([
['\uFEFFQatarSpec Pro — Non-Conformance Report (NCR)','','','',''],
['ISO 9001 Cl.10.2 + Ashghal QA/QC | تاريخ الطباعة: '+today,'','','',''],
['','','','',''],
['رقم NCR:',gv('ncr-num'),'المشروع:',gv('ncr-proj'),''],
['رقم العقد:',gv('ncr-contract'),'المقاول:',gv('ncr-contractor'),''],
['تصنيف NCR:',ncrClass,'مصدر الاكتشاف:',gv('ncr-source'),''],
['تاريخ الاكتشاف:',gv('ncr-date'),'تاريخ الإغلاق المطلوب:',gv('ncr-target'),''],
['تاريخ الإغلاق الفعلي:',gv('ncr-closed-date'),'الحالة:',ncrStatus,''],
['','','','',''],
['الموقع + Chainage:',gv('ncr-loc'),'Drawing No.:',gv('ncr-dwg'),''],
['QCS Clause المُنتهك:',gv('ncr-clause'),'','',''],
['','','','',''],
['وصف عدم المطابقة:','','','',''],
[gv('ncr-desc'),'','','',''],
['','','','',''],
['Root Cause Analysis:','','','',''],
[gv('ncr-root'),'','','',''],
['','','','',''],
['الإجراء التصحيحي (Corrective):','','','',''],
[gv('ncr-corrective'),'','','',''],
['الإجراء الوقائي (Preventive):','','','',''],
[gv('ncr-preventive'),'','','',''],
['','','','',''],
['نتيجة إعادة الاختبار:',gv('ncr-retest'),'','',''],
['','','','',''],
['QC Engineer:',gv('ncr-qc-eng'),'SC / Consultant:',gv('ncr-sc'),'Client:'],
[gv('ncr-client'),'','','',''],
['','','','',''],
['التوقيع:','___________________','___________________','___________________','']
]);
ws['!cols']=[{wch:26},{wch:38},{wch:22},{wch:28},{wch:18}];
ws['!merges']=[
{s:{r:0,c:0},e:{r:0,c:4}},{s:{r:1,c:0},e:{r:1,c:4}},
{s:{r:10,c:1},e:{r:10,c:4}},
{s:{r:12,c:0},e:{r:12,c:4}},{s:{r:13,c:0},e:{r:13,c:4}},
{s:{r:15,c:0},e:{r:15,c:4}},{s:{r:16,c:0},e:{r:16,c:4}},
{s:{r:18,c:0},e:{r:18,c:4}},{s:{r:19,c:0},e:{r:19,c:4}},
{s:{r:20,c:0},e:{r:20,c:4}},{s:{r:21,c:0},e:{r:21,c:4}}
];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'NCR');
// Summary sheet
let ws2 = X.utils.aoa_to_sheet([
['NCR Register — Quick View','','','',''],
['NCR No.','Classification','Location','Status','Target Close'],
[gv('ncr-num'),ncrClass,gv('ncr-loc'),ncrStatus,gv('ncr-target')]
]);
ws2['!cols']=[{wch:18},{wch:16},{wch:36},{wch:20},{wch:14}];
X.utils.book_append_sheet(wb,ws2,'NCR Register');
X.writeFile(wb,'NCR-'+gv('ncr-num','001')+'-'+Date.now()+'.xlsx');
showToast('✅ تم تصدير NCR Excel بكامل الحقول');
}

// ===== ITP EXCEL EXPORT (MULTI-SHEET STRUCTURED) =====
async function exportITPExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
const today = new Date().toLocaleDateString('ar-QA');
const projectName = (document.getElementById('itp-project-name')||{}).value || '';
const itpNum = (document.getElementById('itp-number')||{}).value || '';
const engineer = (document.getElementById('itp-engineer')||{}).value || '';
const itpDate = (document.getElementById('itp-date')||{}).value || today;
let title = (document.getElementById('dmTitle')||{}).textContent || 'ITP';

// ── Collect ITP rows from table ──
let rows = [];
const hp_rows = [];
const wp_rows = [];
document.querySelectorAll('#print-area .dm-table tbody tr').forEach(function(tr){
  const cells = tr.querySelectorAll('td');
  if(cells.length >= 4){
    const row = Array.from(cells).map(function(c){ return c.textContent.trim(); });
    rows.push(row);
    const pointType = (row[7] || row[5] || '').toUpperCase();
    if(pointType.includes('H')) hp_rows.push(row);
    else if(pointType.includes('W')) wp_rows.push(row);
  }
});
if(!rows.length){ showToast('⚠️ لا بيانات ITP'); return; }

// ── Sheet 1: ITP Main ──
const headerRows = [
  ['\uFEFFQatarSpec Pro — Inspection & Test Plan (ITP)', '', '', '', '', '', '', '', '', ''],
  ['المشروع:', projectName, '', '', 'رقم ITP:', itpNum, '', '', '', ''],
  ['التاريخ:', itpDate, '', '', 'المهندس:', engineer, '', '', '', ''],
  ['المرجع:', 'QCS 2024', '', '', 'تاريخ الطباعة:', today, '', '', '', ''],
  [], // blank
  ['م', 'النشاط / Activity', 'مرجع QCS', 'معيار القبول', 'التكرار', 'طريقة الاختبار', 'Lab', 'QC', 'SC', 'النقطة']
];
const ws1 = X.utils.aoa_to_sheet(headerRows.concat(rows));
ws1['!cols'] = [
  {wch:5},  // م
  {wch:42}, // Activity
  {wch:18}, // QCS Ref
  {wch:38}, // Acceptance
  {wch:18}, // Frequency
  {wch:18}, // Method
  {wch:6},  // Lab
  {wch:6},  // QC
  {wch:6},  // SC
  {wch:12}  // Point
];
ws1['!merges'] = [
  {s:{r:0,c:0}, e:{r:0,c:9}}, // Title
  {s:{r:1,c:0}, e:{r:1,c:3}},
  {s:{r:1,c:4}, e:{r:1,c:9}},
  {s:{r:2,c:0}, e:{r:2,c:3}},
  {s:{r:2,c:4}, e:{r:2,c:9}},
];

// ── Sheet 2: Hold Points ──
const ws2 = X.utils.aoa_to_sheet([
  ['\uFEFFHold Points Summary — نقاط الإيقاق الإلزامية', '', '', ''],
  ['المشروع:', projectName, 'ITP No:', itpNum],
  [],
  ['م', 'النشاط', 'معيار القبول', 'النوع']
].concat(hp_rows.map(function(r){ return [r[0]||'', r[1]||'', r[3]||'', 'H']; })));
ws2['!cols'] = [{wch:6},{wch:45},{wch:40},{wch:8}];
ws2['!merges'] = [{s:{r:0,c:0},e:{r:0,c:3}}];

// ── Sheet 3: Witness Points ──
const ws3 = X.utils.aoa_to_sheet([
  ['\uFEFFWitness Points Summary — نقاط الشهود', '', '', ''],
  ['المشروع:', projectName, 'ITP No:', itpNum],
  [],
  ['م', 'النشاط', 'معيار القبول', 'النوع']
].concat(wp_rows.map(function(r){ return [r[0]||'', r[1]||'', r[3]||'', 'W']; })));
ws3['!cols'] = [{wch:6},{wch:45},{wch:40},{wch:8}];
ws3['!merges'] = [{s:{r:0,c:0},e:{r:0,c:3}}];

// ── Sheet 4: Summary Stats ──
const ws4 = X.utils.aoa_to_sheet([
  ['\uFEFFITP Statistics — إحصائيات خطة الفحص', ''],
  [],
  ['البيان', 'القيمة'],
  ['إجمالي بنود ITP',       rows.length],
  ['Hold Points (H)',       hp_rows.length],
  ['Witness Points (W)',    wp_rows.length],
  ['Review Points (R)',     rows.length - hp_rows.length - wp_rows.length],
  [],
  ['المشروع', projectName],
  ['رقم ITP',  itpNum],
  ['المهندس',  engineer],
  ['تاريخ ITP', itpDate],
  ['تاريخ التصدير', today],
  ['المرجع',   'QCS 2024 — QatarSpec Pro']
]);
ws4['!cols'] = [{wch:28},{wch:36}];
ws4['!merges'] = [{s:{r:0,c:0},e:{r:0,c:1}}];

let wb = X.utils.book_new();
X.utils.book_append_sheet(wb, ws1, 'ITP Main');
X.utils.book_append_sheet(wb, ws2, 'Hold Points');
X.utils.book_append_sheet(wb, ws3, 'Witness Points');
X.utils.book_append_sheet(wb, ws4, 'Summary');
X.writeFile(wb, 'ITP-' + (itpNum||'Export') + '-' + Date.now() + '.xlsx');
showToast('✅ تم تصدير ITP Excel — 4 أوراق');
}

// gv → نُقلت إلى js/core/ui-utils.js (A1 Refactor)

// ===== PHOTO HANDLER =====
function handleSitePhoto(input){
let file = input.files[0];if(!file)return;
let url = URL.createObjectURL(file);
let img = document.getElementById('photo-img');
const box = document.getElementById('photo-preview-box');
const btns = document.getElementById('defect-buttons');
if(img)img.src=url;
if(box)box.style.display='block';
if(btns)btns.style.display='block';
showToast('✅ تم رفع الصورة — اختر نوع العيب');
}

function photoNCR(type){
let map = {
crack:{d:'تشققات في السطح — Cracking',c:'QCS P8 S6.2',r:'Insufficient compaction or thermal stress',a:'Mill + re-lay'},
honeycomb:{d:'تعشيش — Honeycombing',c:'QCS P14 S5.4.1',r:'Poor vibration or congested rebar',a:'Remove + re-cast or grout'},
bleeding:{d:'نزيف إسفلتي — Bleeding',c:'QCS P8 S6.3',r:'Excess bitumen content',a:'Review JMF AC%'},
rutting:{d:'تخدد — Rutting',c:'QCS P8 S5.7',r:'Insufficient compaction',a:'Core check + IRI + remediation'},
spalling:{d:'تقشّر خرساني — Spalling',c:'QCS P14 S5.4',r:'Inadequate cover or carbonation',a:'Repair + anti-carbonation'},
settlement:{d:'هبوط — Settlement',c:'QCS P7 S3.3',r:'Poor compaction or Sabkha',a:'Geotech investigation'}
};
const dd=map[type]||{d:'عيب ميداني',c:'',r:'',a:''};
const res = document.getElementById('photo-ncr-result');
if(res){
res.style.display='block';
res.innerHTML='<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:14px;margin-top:10px">'
+'<div style="color:#e74c3c;font-weight:700;margin-bottom:8px">⚠️ '+dd.d+'</div>'
+'<div style="font-size:12px;color:var(--text2);line-height:1.8">QCS: <strong style="color:var(--gold)">'+dd.c+'</strong><br>Root Cause: '+dd.r+'<br>Action: '+dd.a+'</div>'
+'<button onclick="prefillNCR(\''+type+'\')" style="margin-top:10px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,.3);border-radius:8px;padding:8px 16px;color:var(--gold2);font-family:Tajawal;font-weight:700;cursor:pointer">📝 فتح NCR تلقائي</button></div>';
}
}

function prefillNCR(type){
let map = {crack:{d:'تشققات مرئية في السطح',c:'QCS P8 S6.2'},honeycomb:{d:'تعشيش في الخرسانة',c:'QCS P14 S5.4.1'},bleeding:{d:'نزيف إسفلتي',c:'QCS P8 S6.3'},rutting:{d:'تخدد',c:'QCS P8 S5.7'},spalling:{d:'تقشّر خرساني',c:'QCS P14 S5.4'},settlement:{d:'هبوط أرضي',c:'QCS P7 S3.3'}};
const dd = map[type]||{};
openDetail('ashghal_forms');
if(window._ncrPrefillTimer)clearTimeout(window._ncrPrefillTimer);
window._ncrPrefillTimer=setTimeout(function(){
window._ncrPrefillTimer=null;
switchForm('ncr');
let d = document.getElementById('ncr-desc');if(d)d.value=dd.d||'';
let c = document.getElementById('ncr-clause');if(c)c.value=dd.c||'';
autoFillNCR();
showToast('✅ NCR مملوء تلقائياً');
},350);
}

// ===== COPY ITP TO CLIPBOARD =====
function copyITPtoClipboard(){
let pa = document.getElementById('print-area');if(!pa){showToast('❌ لا محتوى');return}
let title = document.getElementById('dmTitle').textContent;
let text = title+'\n'+'='.repeat(60)+'\n\n';
pa.querySelectorAll('table').forEach(function(t){
t.querySelectorAll('tr').forEach(function(r){
text+=Array.from(r.querySelectorAll('td,th')).map(function(c){return c.textContent.trim()}).join(' | ')+'\n';
});text+='\n';
});
text+='\nQCS 2024 — QatarSpec Pro';
navigator.clipboard.writeText(text).then(function(){showToast('✅ تم النسخ — الصق في Word')});
}


// ===== DPR EXCEL EXPORT =====
async function exportDPRExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
const parseRows = function(id){const el=document.getElementById(id);if(!el||!el.value)return[];return el.value.split('\n').filter(function(l){return l.trim()}).map(function(l){return l.split('|').map(function(c){return c.trim()})})};
let rows = [
['\uFEFFQatarSpec Pro — Daily Construction Report','','','',''],
['المشروع:',gv('dpr-proj'),'التاريخ:',gv('dpr-date'),'الطقس:'+gv('dpr-weather','')],
['المقاول:',gv('dpr-contractor','—'),'الموقع:',gv('dpr-loc','—'),'مراقب الموقع:'+gv('dpr-sc','')],
['','','','',''],
['=== العمالة ===','','','',''],
['الوصف','العدد','الساعات','الإجمالي','']
];
parseRows('dpr-manpower').forEach(function(r){rows.push([r[0]||'',r[1]||'',r[2]||'',(parseInt(r[1])||0)*(parseInt(r[2])||8),''])});
rows.push(['','','','',''],['=== المعدات ===','','','',''],['المعدة','العدد','ساعات التشغيل','','']);
parseRows('dpr-equipment').forEach(function(r){rows.push([r[0]||'',r[1]||'',r[2]||'','',''])});
rows.push(['','','','',''],['=== تقدم الإنجاز ===','','','',''],['النشاط','الكمية','الوحدة','النسبة','']);
parseRows('dpr-progress').forEach(function(r){rows.push([r[0]||'',r[1]||'',r[2]||'',r[3]||'',''])});
rows.push(['','','','',''],['ملاحظات:',gv('dpr-issues'),'','','']);
let ws = X.utils.aoa_to_sheet(rows);
ws['!cols']=[{wch:30},{wch:14},{wch:14},{wch:14},{wch:24}];
ws['!merges']=[{s:{r:0,c:0},e:{r:0,c:4}}];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'Daily Report');
X.writeFile(wb,'DPR-'+gv('dpr-date',Date.now())+'.xlsx');
showToast('✅ تم تصدير التقرير اليومي');
}

// ===== COPY TEXT FUNCTIONS =====
function copyRFIText(){
  var lines=[
    '📋 Request for Inspection — RFI',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'رقم RFI: '+gv('rfi-num')+'  |  المشروع: '+gv('rfi-proj'),
    'المقاول: '+gv('rfi-contractor')+'  |  العقد: '+gv('rfi-contract'),
    'Submitted By: '+gv('rfi-from')+'  →  To: '+gv('rfi-to'),
    'تاريخ الإرسال: '+gv('rfi-date')+'  |  Required By: '+gv('rfi-reqby'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📍 الموقع: '+gv('rfi-loc')+'  |  Chainage: '+gv('rfi-ch'),
    'Grid QNG: '+gv('rfi-grid')+'  |  Layer: '+gv('rfi-layer'),
    'QCS Clause: '+gv('rfi-clause')+'  |  Drawing: '+gv('rfi-dwg'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'النشاط: '+gv('rfi-activity')+'  |  نوع النقطة: '+gv('rfi-point'),
    'الموضوع: '+gv('rfi-subject'),
    'نتائج الاختبارات: '+gv('rfi-results'),
    'المرفقات: '+gv('rfi-attach'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'رد SC: '+gv('rfi-response')+'  |  Status: '+gv('rfi-status'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'QatarSpec Pro | qatar-standers.vercel.app'
  ];
  var txt=lines.join('\n');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){showToast('✅ تم نسخ RFI — الصقه في واتساب أو بريد إلكتروني');});
  } else {
    var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ تم النسخ');
  }
}

function copyNCRText(){
  var lines=[
    '⚠️ Non-Conformance Report — NCR',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'رقم NCR: '+gv('ncr-num')+'  |  المشروع: '+gv('ncr-proj'),
    'المقاول: '+gv('ncr-contractor')+'  |  العقد: '+gv('ncr-contract'),
    'تاريخ الاكتشاف: '+gv('ncr-date')+'  |  تاريخ الإغلاق: '+gv('ncr-target'),
    'التصنيف: '+gv('ncr-class')+'  |  المصدر: '+gv('ncr-source'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'الموقع: '+gv('ncr-loc')+'  |  QCS Clause: '+gv('ncr-clause'),
    'Drawing: '+gv('ncr-dwg'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'وصف عدم المطابقة:\n'+gv('ncr-desc'),
    'السبب الجذري:\n'+gv('ncr-root'),
    'الإجراء التصحيحي:\n'+gv('ncr-corrective'),
    'الإجراء الوقائي:\n'+gv('ncr-preventive'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'نتيجة إعادة الاختبار: '+gv('ncr-retest'),
    'حالة الإغلاق: '+gv('ncr-status'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'QatarSpec Pro | qatar-standers.vercel.app'
  ];
  var txt=lines.join('\n');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){showToast('✅ تم نسخ NCR — الصقه في واتساب أو بريد إلكتروني');});
  } else {
    var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ تم النسخ');
  }
}

function copyDPRText(){
  var lines=[
    '📊 Daily Progress Report — DPR',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'المشروع: '+gv('dpr-proj')+'  |  التاريخ: '+gv('dpr-date'),
    'المقاول: '+gv('dpr-contractor','—')+'  |  الموقع: '+gv('dpr-loc','—'),
    'مراقب الموقع: '+gv('dpr-sc','—')+'  |  الطقس: '+gv('dpr-weather',''),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '👷 العمالة:\n'+gv('dpr-manpower'),
    '━━━━━━━━━━━\n🚜 المعدات:\n'+gv('dpr-equipment'),
    '━━━━━━━━━━━\n📈 الإنجاز:\n'+gv('dpr-progress'),
    '━━━━━━━━━━━\n⚠️ مشاكل:\n'+gv('dpr-issues'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'QatarSpec Pro | qatar-standers.vercel.app'
  ];
  var txt=lines.join('\n');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){showToast('✅ تم نسخ DPR — الصقه في واتساب أو بريد إلكتروني');});
  } else {
    var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ تم النسخ');
  }
}


// ================================================================
// المرحلة ٩ — Drawing Analyzer Functions
// ================================================================

// متغير عام لبيانات الصورة المرفوعة
let _daImageData = null;
let _daDrawingType = 'structural';

// تحديد نوع المخطط المختار
function selectDaType(type, el) {
  _daDrawingType = type;
  // إزالة التحديد من كل الأزرار
  document.querySelectorAll('.da-type-btn').forEach(function(btn) {
    btn.style.border = '2px dashed rgba(201,168,76,.2)';
    btn.style.background = 'rgba(201,168,76,.03)';
  });
  // تحديد الزر المضغوط
  let colors = {
    structural: 'rgba(201,168,76',
    road:       'rgba(52,152,219',
    itp:        'rgba(46,204,113',
    shop:       'rgba(155,89,182'
  };
  let c = colors[type] || colors.structural;
  el.style.border = '2px solid ' + c + ',.6)';
  el.style.background = c + ',.12)';
}

// معالجة رفع الصورة
function handleDaUpload(input) {
  let file = input.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) { showToast('❌ الملف كبير جداً — الحد 10MB'); return; }

  let reader = new FileReader();
  reader.onload = function(e) {
    // للـ PDF نحفظ كـ data URL ونعرض أيقونة بديلاً
    _daImageData = e.target.result;
    let isPdf = file.type === 'application/pdf';
    const previewWrap = document.getElementById('da-preview-wrap');
    const previewImg = document.getElementById('da-preview-img');
    const fileName = document.getElementById('da-file-name');
    if (previewWrap) previewWrap.style.display = 'block';
    if (fileName) fileName.textContent = '📎 ' + file.name + ' (' + (file.size/1024).toFixed(0) + ' KB)';
    if (previewImg) {
      if (isPdf) {
        previewImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" rx="10" fill="%23222"/><text x="100" y="55" text-anchor="middle" fill="%23C9A84C" font-size="32">📄</text></svg>';
      } else {
        previewImg.src = _daImageData;
      }
    }
    // تحديث zone
    const zone = document.getElementById('da-upload-zone');
    if (zone) zone.style.borderColor = 'rgba(201,168,76,.6)';
    showToast('✅ تم رفع المخطط — اضغط تحليل');
  };
  reader.readAsDataURL(file);
}

// Bridge functions — ربط الأسماء في HTML مع الدوال الفعلية
window.daLoadFile = handleDaUpload;
window.daHandleDrop = function(e) {
  e.preventDefault();
  var zone = document.getElementById('da-upload-area');
  if (zone) zone.style.borderColor = 'rgba(52,152,219,0.4)';
  var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) { var dt = new DataTransfer(); dt.items.add(file); var inp = document.getElementById('da-file'); if(inp){inp.files = dt.files; handleDaUpload(inp);} }
};

// بناء System Prompt حسب نوع المخطط
function getDaSystemPrompt(type, notes) {
  const base = 'أنت مهندس متخصص في قراءة وتحليل المخططات الإنشائية في دولة قطر، خبير في QCS 2024.\n'
    + (notes ? 'ملاحظات المهندس: ' + notes + '\n' : '')
    + '\nافحص المخطط المرفق وقدم تقريراً مهنياً دقيقاً يشمل:\n\n';

  const prompts = {
    structural:
      base
      + '١. **نوع المخطط:** تحديد دقيق (قاعدة، عمود، جسر، بلاطة، جدار...)\n'
      + '٢. **المعلومات المقروءة:** Grade الخرسانة، أقطار الحديد، التباعد، أبعاد العناصر\n'
      + '٣. **فحص Cover:**\n'
      + '   - هل الغطاء المعروض مطابق لـ QCS 2024 Part 5, Section 3?\n'
      + '   - Cover مطلوب: أساسات 75mm، خارجي 40mm، داخلي 25mm\n'
      + '٤. **فحص تباعد التسليح:**\n'
      + '   - هل Spacing يتوافق مع QCS 2024 S5 P3 Cl.3.3?\n'
      + '   - Max spacing ≤3×h أو 400mm أيهما أصغر\n'
      + '٥. **فحص Lap Zones:**\n'
      + '   - هل Lap Length صحيح؟ Tension: 40d Compression: 35d\n'
      + '   - هل الـ Laps مُفصَّلة بعيداً عن نقاط الإجهاد الأقصى؟\n'
      + '٦. **تعارضات أو ملاحظات تقنية**\n'
      + '٧. **قائمة checkpoints للمفتش في الموقع** (5 نقاط عملية)\n'
      + '\nاذكر دائماً: المرجع = QCS 2024, Part X, Clause X.X\nالرد بالعربية.',

    road:
      base
      + '١. **نوع المقطع:** تصنيف الطريق (Primary · Secondary · Local) وعدد الحارات\n'
      + '٢. **أسماك الطبقات المقروءة:** Subgrade · Subbase · Base · Binder · Wearing\n'
      + '٣. **فحص أسماك الطبقات مقابل QCS 2024 S6 P3 Table 3:1:**\n'
      + '   - هل Wearing Course = 50mm؟\n'
      + '   - هل Binder Course مناسب لتصنيف الطريق؟\n'
      + '   - هل Subbase ≥ 150mm؟\n'
      + '٤. **فحص Crossfall والانحدار:**\n'
      + '   - Carriageway: 2.5% ± 0.5%\n'
      + '   - Superelevation per MMUP Road Design Manual\n'
      + '٥. **فحص عروض الحارات والأرصفة** مقابل MMUP\n'
      + '٦. **ملاحظات المسافات الجانبية** (Clearances)\n'
      + '٧. **قائمة checkpoints للمفتش** (5 نقاط)\n'
      + '\nالمرجع = QCS 2024 S6 + MMUP Road Design Manual. الرد بالعربية.',

    itp:
      base
      + '١. **نشاط الـ ITP:** تحديد العمل (طرق · مرافق · خرسانة · غيره)\n'
      + '٢. **استخراج Hold Points (HP) تلقائياً:**\n'
      + '   - اذكر كل Hold Point بالرقم والوصف والـ clause\n'
      + '٣. **استخراج Witness Points (W):**\n'
      + '   - اذكر كل Witness Point بالوصف\n'
      + '٤. **الاختبارات المطلوبة:** مع معيار القبول والتكرار\n'
      + '٥. **المستندات المطلوبة للغلق:** Certificates · Test Reports · RFI\n'
      + '٦. **هل الـ ITP مكتمل؟** أي بنود ناقصة؟\n'
      + '٧. **تسلسل الأنشطة:** هل منطقي ومتسلسل؟\n'
      + '\nالمرجع = QCS 2024 + Ashghal ITP Requirements. الرد بالعربية.',

    shop:
      base
      + '١. **نوع الـ Shop Drawing:** (Structural · MEP · Architectural · Civil)\n'
      + '٢. **المعلومات الأساسية:** Project · Drawing No · Revision · Scale\n'
      + '٣. **مقارنة مع QCS 2024:**\n'
      + '   - هل المواد المحددة مطابقة لـ QCS؟\n'
      + '   - هل الأبعاد والمقاسات ضمن الحدود المسموحة؟\n'
      + '   - هل أنواع الوصلات والتفاصيل مقبولة؟\n'
      + '٤. **تعارضات مع المواصفات أو مخططات أخرى**\n'
      + '٥. **بنود تحتاج Engineer Approval**\n'
      + '٦. **توصية:** مقبول / مقبول مع تعليقات / مرفوض + الأسباب\n'
      + '٧. **قائمة checkpoints للمفتش** (5 نقاط)\n'
      + '\nالمرجع = QCS 2024 + relevant British Standards. الرد بالعربية.'
  };
  return prompts[type] || prompts.structural;
}

// تنسيق نتيجة التحليل في HTML جميل
function formatDaResult(text, type) {
  const colors = {
    structural: { main: 'var(--gold)', bg: 'rgba(201,168,76,.08)', border: 'rgba(201,168,76,.25)' },
    road:       { main: '#3498db',     bg: 'rgba(52,152,219,.08)', border: 'rgba(52,152,219,.25)' },
    itp:        { main: '#2ecc71',     bg: 'rgba(46,204,113,.08)', border: 'rgba(46,204,113,.25)' },
    shop:       { main: '#9b59b6',     bg: 'rgba(155,89,182,.08)', border: 'rgba(155,89,182,.25)' }
  };
  let col = colors[type] || colors.structural;
  const typeNames = { structural:'مخطط إنشائي', road:'مقطع طريق', itp:'نموذج ITP', shop:'Shop Drawing' };

  // تحويل النص إلى HTML: Bold، Hold Points بالأحمر
  // [SEC] XSS Fix — escape raw AI text before any HTML transformation
  const _escHtml = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const safeText = _escHtml(text);
  // الآن نطبق transformations على النص المُعقَّم فقط
  const html = safeText
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:' + col.main + '">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:var(--text2)">$1</em>')
    .replace(/(Hold Point|HP-|🔴)/g, '<span style="color:#e74c3c;font-weight:700">$1</span>')
    .replace(/(✅)/g, '<span style="color:#2ecc71">$1</span>')
    .replace(/(❌)/g, '<span style="color:#e74c3c">$1</span>')
    .replace(/(⚠️)/g, '<span style="color:#f39c12">$1</span>')
    .replace(/QCS 2024[^<\n]*/g, '<span style="color:' + col.main + ';font-size:11px;font-weight:700">$&</span>')
    .replace(/\n/g, '<br>');

  return '<div style="background:' + col.bg + ';border:1px solid ' + col.border + ';border-radius:14px;padding:16px;margin-bottom:10px">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid ' + col.border + '">'
    + '<div style="display:flex;align-items:center;gap:8px">'
    + '<div style="background:' + col.main + ';color:#000;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:800;letter-spacing:1px">DRAWING ANALYSIS</div>'
    + '<span style="font-size:12px;color:' + col.main + ';font-weight:700">' + (typeNames[type]||type) + '</span>'
    + '</div>'
    + '<button onclick="copyDaResult()" style="background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:5px 12px;font-size:11px;color:var(--text2);cursor:pointer">نسخ</button>'
    + '</div>'
    + '<div style="font-size:13px;line-height:2;color:var(--text)">' + html + '</div>'
    + '<div style="margin-top:12px;padding-top:10px;border-top:1px solid ' + col.border + ';font-size:11px;color:var(--text3)">'
    + '📖 المرجع: QCS 2024 | هذا التحليل مساعد — راجع المهندس المختص للقرار النهائي</div>'
    + '</div>';
}

function copyDaResult() {
  let el = document.getElementById('da-result');
  if (el) navigator.clipboard.writeText(el.innerText).then(function(){ showToast('✅ تم نسخ التقرير'); });
}

// دالة تحليل المخطط الرئيسية
async function runDrawingAnalysis() {
  // ── Free users: 3 analyses/day ──
  if (!isProUser()) {
    var daKey = 'qs_da_count_' + new Date().toISOString().slice(0,10);
    var daCount = parseInt(sessionStorage.getItem(daKey) || '0');
    if (daCount >= 3) {
      showUpgradePrompt('drawing_analyzer','📐','وصلت الحد اليومي — 3 تحليلات/يوم','اشترك في Pro لتحليلات غير محدودة للمخططات.');
      return;
    }
    sessionStorage.setItem(daKey, String(daCount + 1));
  }
  if (!_daImageData) { showToast('❌ ارفع مخططاً أولاً'); return; }

  const notes = (document.getElementById('da-notes') || {}).value || '';
  let loading = document.getElementById('da-loading');
  let result = document.getElementById('da-result');
  let btn = document.getElementById('da-analyze-btn');

  loading.style.display = 'block';
  result.innerHTML = '';
  if (btn) { btn.style.opacity = '0.5'; btn.disabled = true; }

  let systemPrompt = getDaSystemPrompt(_daDrawingType, notes);

  try {
    const isPdf = _daImageData.startsWith('data:application/pdf');
    let messages;

    // استخراج البيانات حسب النوع (PDF أو صورة)
    let daBase64, daMimeType;
    if (isPdf) {
      daBase64 = _daImageData.split(',')[1];
      daMimeType = 'application/pdf';
    } else {
      daBase64 = _daImageData.split(',')[1];
      daMimeType = _daImageData.split(';')[0].split(':')[1];
    }

    // استخدام vision-proxy مباشرة (Gemini Vision API)
    let response = await fetch('/api/vision-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'analyzer',
          image: daBase64,
          mimeType: daMimeType || 'image/jpeg',
          userMessage: systemPrompt
        })
    });

    let data = await response.json();

    if (data.result) {
      result.innerHTML = formatDaResult(data.result, _daDrawingType);
      qsTrack('Vision Analysis', { tier: typeof getProToken === 'function' && getProToken() ? 'pro' : 'free' });
    } else if (data.error) {
      result.innerHTML = generateDaFallback(_daDrawingType);
      showToast('⚠️ تم استخدام التحليل المحلي');
    } else {
      result.innerHTML = generateDaFallback(_daDrawingType);
    }
  } catch(e) {
    // Fallback محلي إذا لم يعمل الـ API
    result.innerHTML = generateDaFallback(_daDrawingType);
    showToast('⚠️ تحليل محلي — تحقق من الاتصال للتحليل الكامل');
  }

  loading.style.display = 'none';
  if (btn) { btn.style.opacity = '1'; btn.disabled = false; }
}

// Fallback محلي حسب نوع المخطط
function generateDaFallback(type) {
  let checklists = {
    structural: {
      title: 'مخطط إنشائي — Checklist الفحص الميداني',
      items: [
        '✅ Cover Bottom: ≥75mm (أساسات) / ≥40mm (خارجي) / ≥25mm (داخلي) — QCS S5 P3',
        '✅ Rebar Spacing: ≤3×h أو ≤400mm أيهما أصغر — QCS S5 P3 Cl.3.3',
        '✅ Lap Length: 40d (Tension) / 35d (Compression) بعيداً عن نقاط الإجهاد',
        '✅ Bar Diameter: مطابق لجدول الحديد المعتمد (Mill Certificate موجود)',
        '✅ Stirrups/Links: 135° hooks — ليس 90° — QCS S5 P3',
        '🔴 HP: RFI مفتوح وموقّع قبل أي صب — QCS S5 P4 Cl.4.1'
      ]
    },
    road: {
      title: 'مقطع طريق — Checklist الفحص الميداني',
      items: [
        '✅ Wearing Course: 50mm (T1-T3) / 50mm+BC للحركة الثقيلة — QCS S6 P3',
        '✅ Binder Course: 60-160mm حسب Traffic Designation — QCS S6 P3 Table 3:1',
        '✅ Base Course: 150-250mm — CBR ≥80% — QCS S6 P3',
        '✅ Subbase: 150-350mm — CBR ≥25% — QCS S6 P3',
        '✅ Crossfall: 2.5% ± 0.3% (QCS 2024 S6) — NCR عند انحراف > ±0.5% — قياس 3m Straightedge',
        '🔴 HP: Level Survey ±10mm before next layer — Ashghal ITP'
      ]
    },
    itp: {
      title: 'نموذج ITP — Hold Points المستخرجة',
      items: [
        '🔴 HP-01: Pre-activity — Material Approval + Method Statement',
        '🔴 HP-02: During — Critical inspection point (per activity)',
        '🔴 HP-03: Testing — Test results reviewed before proceeding',
        '⚠️ W-01: Witness — Engineer present during inspection',
        '⚠️ W-02: Witness — Sampling & testing witnessed',
        '📋 Review: Record Books + Test Reports + Photos — before closure'
      ]
    },
    shop: {
      title: 'Shop Drawing — نقاط الفحص',
      items: [
        '✅ Drawing Number + Revision + Scale — مكتملة وصحيحة',
        '✅ Materials: مطابقة لـ QCS 2024 + Approved Materials List',
        '✅ Dimensions: ضمن Tolerance المسموحة (per element type)',
        '✅ Details: تفاصيل الوصلات والـ Embedments موضحة',
        '⚠️ Clash Check: لا تعارض مع MEP / Structural drawings',
        '🔴 Action: Stamp + Engineer Approval قبل التنفيذ'
      ]
    }
  };

  let cl = checklists[type] || checklists.structural;
  const col = { structural:'rgba(201,168,76', road:'rgba(52,152,219', itp:'rgba(46,204,113', shop:'rgba(155,89,182' };
  const c = (col[type] || col.structural);

  return '<div style="background:' + c + ',.08);border:1px solid ' + c + ',.25);border-radius:14px;padding:16px">'
    + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">'
    + '<span style="font-size:18px">⚠️</span>'
    + '<span style="color:var(--gold);font-weight:700;font-size:13px">تحليل محلي (Offline Mode)</span>'
    + '</div>'
    + '<div style="font-weight:700;color:var(--text);margin-bottom:10px">' + cl.title + '</div>'
    + cl.items.map(function(i){ return '<div style="font-size:12px;color:var(--text2);padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">' + i + '</div>'; }).join('')
    + '<div style="margin-top:12px;font-size:11px;color:var(--text3)">⚡ للتحليل الكامل بالذكاء الاصطناعي — تأكد من الاتصال بالإنترنت</div>'
    + '</div>';
}

// ===== آلية التنفيذ — Stepper Function =====
function showExecStep(prefix, step) {
  for(let i=1;i<=4;i++){
    const el = document.getElementById(prefix+'-step-'+i);
    if(el) el.style.display=(i===step)?'block':'none';
  }
}

// ================================================================
// BREADCRUMB + SECTION NAVIGATION SYSTEM
// ================================================================
const SECTION_MAP = {
  // === ROADS ===
  roads:{parent:'home',group:'🛣️ الطرق',next:'subgrade',prev:null,equipment:'roads_equipment',itp:'road_itps'},
  subgrade:{parent:'roads',group:'🛣️ الطرق',next:'subbase',prev:'roads',equipment:'roads_equipment',itp:'itp_subgrade'},
  subbase:{parent:'roads',group:'🛣️ الطرق',next:'base',prev:'subgrade',equipment:'roads_equipment',itp:'itp_subbase'},
  base:{parent:'roads',group:'🛣️ الطرق',next:'prime',prev:'subbase',equipment:'roads_equipment',itp:'itp_base'},
  prime:{parent:'roads',group:'🛣️ الطرق',next:'binder',prev:'base',equipment:'roads_equipment',itp:'itp_primecoat'},
  binder:{parent:'roads',group:'🛣️ الطرق',next:'wearing',prev:'prime',equipment:'roads_equipment',itp:'itp_asphalt'},
  wearing:{parent:'roads',group:'🛣️ الطرق',next:'finishing',prev:'binder',equipment:'roads_equipment',itp:'itp_wearing'},
  finishing:{parent:'roads',group:'🛣️ الطرق',next:'handover',prev:'wearing',equipment:'roads_equipment',itp:null},
  handover:{parent:'roads',group:'🛣️ الطرق',next:null,prev:'finishing',equipment:'roads_equipment',itp:null},
  road_itps:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:'roads_equipment',itp:null},
  roads_materials:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:'roads_equipment',itp:null},
  roads_design:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:null,itp:null},
  road_design_criteria:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:null,itp:null},
  marshall_mix:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:'roads_equipment',itp:null},
  asphalt_quick_ref:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:'roads_equipment',itp:null},
  ms_asphalt:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:'roads_equipment',itp:null},
  exec_asphalt_paving:{parent:'roads',group:'🛣️ الطرق',next:null,prev:null,equipment:'roads_equipment',itp:'itp_wearing'},
  // === UTILITIES ===
  utilities:{parent:'home',group:'🔧 المرافق',next:'water_supply_stages',prev:null,equipment:'utilities_equipment',itp:null},
  water_supply_stages:{parent:'utilities',group:'💧 مياه الشرب',next:'sewer_stages',prev:'utilities',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_survey:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_materials',prev:null,equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_materials:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_excavation',prev:'ws_survey',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_excavation:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_laying',prev:'ws_materials',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_laying:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_testing',prev:'ws_excavation',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_testing:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_disinfection',prev:'ws_laying',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_disinfection:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_backfill',prev:'ws_testing',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_backfill:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:'ws_handover',prev:'ws_disinfection',equipment:'utilities_equipment',itp:'itp_water_supply'},
  ws_handover:{parent:'water_supply_stages',group:'💧 مياه الشرب',next:null,prev:'ws_backfill',equipment:'utilities_equipment',itp:'itp_water_supply'},
  sewer_stages:{parent:'utilities',group:'🚽 صرف صحي',next:'storm_stages',prev:'water_supply_stages',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_survey:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_materials',prev:null,equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_materials:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_excavation',prev:'ss_survey',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_excavation:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_laying',prev:'ss_materials',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_laying:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_manholes',prev:'ss_excavation',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_manholes:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_testing',prev:'ss_laying',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_testing:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_backfill',prev:'ss_manholes',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_backfill:{parent:'sewer_stages',group:'🚽 صرف صحي',next:'ss_handover',prev:'ss_testing',equipment:'utilities_equipment',itp:'itp_sewer'},
  ss_handover:{parent:'sewer_stages',group:'🚽 صرف صحي',next:null,prev:'ss_backfill',equipment:'utilities_equipment',itp:'itp_sewer'},
  storm_stages:{parent:'utilities',group:'🌧️ صرف سطحي',next:'treated_stages',prev:'sewer_stages',equipment:'utilities_equipment',itp:'itp_storm'},
  treated_stages:{parent:'utilities',group:'♻️ مياه معالجة',next:null,prev:'storm_stages',equipment:'utilities_equipment',itp:'itp_treated'},
  cctv_itp:{parent:'utilities',group:'🔧 المرافق',next:null,prev:null,equipment:'utilities_equipment',itp:null},
  shoring_itp:{parent:'utilities',group:'🔧 المرافق',next:null,prev:null,equipment:'utilities_equipment',itp:null},
  exec_water_pipe:{parent:'utilities',group:'💧 مياه الشرب',next:null,prev:null,equipment:'utilities_equipment',itp:'itp_water_supply'},
  exec_pressure_test:{parent:'utilities',group:'💧 مياه الشرب',next:null,prev:null,equipment:'utilities_equipment',itp:'itp_water_supply'},
  pipe_quick_ref:{parent:'utilities',group:'🔧 المرافق',next:null,prev:null,equipment:null,itp:null},
  ms_utilities:{parent:'utilities',group:'🔧 المرافق',next:null,prev:null,equipment:'utilities_equipment',itp:null},
  // === STRUCTURAL ===
  structural:{parent:'home',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:'itp_structural'},
  concrete_full:{parent:'structural',group:'🏗️ الإنشاء',next:'rebar_full',prev:null,equipment:'structural_equipment',itp:'itp_concrete'},
  rebar_full:{parent:'structural',group:'🏗️ الإنشاء',next:'foundations_full',prev:'concrete_full',equipment:'structural_equipment',itp:'itp_rebar'},
  foundations_full:{parent:'structural',group:'🏗️ الإنشاء',next:'piles_full',prev:'rebar_full',equipment:'structural_equipment',itp:'itp_foundations'},
  piles_full:{parent:'structural',group:'🏗️ الإنشاء',next:'formwork_full',prev:'foundations_full',equipment:'structural_equipment',itp:'itp_piles'},
  formwork_full:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:'piles_full',equipment:'structural_equipment',itp:null},
  concrete_quick_ref:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:null},
  exec_concrete_pour:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:'itp_concrete'},
  exec_foundation_excavation:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:'itp_concrete'},
  exec_bridge_rebar:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:'itp_rebar'},
  ms_concrete:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:null},
  hot_weather_detailed:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:null},
  pile_load_testing:{parent:'structural',group:'🏗️ الإنشاء',next:null,prev:null,equipment:'structural_equipment',itp:'itp_piles'},
  // === GEOTECH ===
  geotech:{parent:'home',group:'🔬 الجيوتقنية',next:null,prev:null,equipment:'geotech_equipment',itp:'itp_geotech'},
  geo_planning:{parent:'geotech',group:'🔬 الجيوتقنية',next:'geo_borehole',prev:null,equipment:'geotech_equipment',itp:'itp_geotech'},
  geo_borehole:{parent:'geotech',group:'🔬 الجيوتقنية',next:'geo_spt',prev:'geo_planning',equipment:'geotech_equipment',itp:'itp_geotech'},
  geo_spt:{parent:'geotech',group:'🔬 الجيوتقنية',next:'geo_lab',prev:'geo_borehole',equipment:'geotech_equipment',itp:'itp_geotech'},
  geo_lab:{parent:'geotech',group:'🔬 الجيوتقنية',next:'geo_water',prev:'geo_spt',equipment:'geotech_equipment',itp:'itp_geotech'},
  sabkha_treatment:{parent:'geotech',group:'🔬 الجيوتقنية',next:null,prev:null,equipment:'geotech_equipment',itp:null},
  sabkha_classification:{parent:'geotech',group:'🔬 الجيوتقنية',next:null,prev:null,equipment:'geotech_equipment',itp:null},
  // === TOOLS + DRAWING ANALYZER ===
  drawing_analyzer:{parent:'home',group:'📋 الأدوات الذكية',next:null,prev:null,equipment:null,itp:null},
  doc_analyzer:{parent:'home',group:'📋 الأدوات الذكية',next:null,prev:null,equipment:null,itp:null},
  photo_analyzer:{parent:'home',group:'📋 الأدوات الذكية',next:null,prev:null,equipment:null,itp:null},
  ncr_quick_logger:{parent:'home',group:'📋 الأدوات الذكية',next:null,prev:null,equipment:null,itp:null},
  ashghal_forms:{parent:'home',group:'📋 الأدوات الذكية',next:null,prev:null,equipment:null,itp:null}
};

// Inject breadcrumb into detail modal when opened



// ================================================================
// المفتش الذكي — AI Site Inspector Engine
// ================================================================
let _inspectorImageData = null;

function inspectorLoadImage(input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    _inspectorImageData = e.target.result;
    const img = document.getElementById('inspector-img');
    const preview = document.getElementById('inspector-preview');
    const form = document.getElementById('inspector-form');
    if (img) img.src = _inspectorImageData;
    if (preview) preview.style.display = 'block';
    if (form) form.style.display = 'block';
    document.getElementById('inspector-result').style.display = 'none';
    showToast('✅ تم تحميل الصورة — اختر نوع الفحص');
  };
  reader.readAsDataURL(file);
}

async function runInspector() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('inspector','🔍','المفتش الذكي بالصور — Pro فقط','فحص الأعمال الميدانية بالصور ومطابقتها مع QCS 2024 متاح للمشتركين في Pro فقط.');
    return;
  }
  let workType = document.getElementById('insp-work-type').value;
  const phase = document.getElementById('insp-phase').value;
  let specific = document.getElementById('insp-specific').value;
  
  if (!_inspectorImageData) { showToast('❌ ارفع صورة أولاً'); return; }
  if (!workType) { showToast('❌ اختر نوع العمل'); return; }
  
  const loading = document.getElementById('inspector-loading');
  const btn = document.getElementById('insp-analyze-btn');
  loading.style.display = 'block';
  btn.style.opacity = '0.5';
  btn.disabled = true;
  
  let phaseNames = {before:'قبل التنفيذ',during:'أثناء التنفيذ',after:'بعد التنفيذ',defect:'عيب مكتشف'};
  const workNames = {
    roads_subgrade:'Subgrade',roads_subbase:'Subbase',roads_base:'Base Course',
    roads_prime:'Prime Coat',roads_asphalt:'Asphalt',
    struct_rebar:'تسليح',struct_formwork:'شدة',struct_concrete:'صب خرسانة',struct_curing:'معالجة',
    util_excavation:'حفريات',util_pipe:'مواسير',util_backfill:'ردم',util_manhole:'غرف تفتيش',
    geo_borehole:'جسات',geo_sabkha:'سبخة'
  };
  
  const systemPrompt = 'أنت مهندس مدني متخصص في مراقبة الجودة بدولة قطر، خبير في QCS 2024.\n'
    + 'نوع العمل: ' + (workNames[workType]||workType) + '\n'
    + 'المرحلة: ' + (phaseNames[phase]||phase) + '\n'
    + (specific ? 'الفحص المطلوب: ' + specific + '\n' : '')
    + '\nافحص الصورة وقدم:\n'
    + '١. تحديد ما تراه بدقة\n'
    + '٢. تقييم المطابقة: Pass ✅ أو Fail ❌ أو Warning ⚠️ مع بند QCS\n'
    + '٣. المشاكل + الإجراء التصحيحي + المرجع QCS 2024 Part/Clause\n'
    + '٤. نقاط تحقق مرئي + ما يحتاج فحص إضافي\n'
    + '٥. توصية نهائية: هل يمكن المتابعة؟\n'
    + 'الرد بالعربية. كن دقيقاً — لا تخمن.';
  
  try {
    // استخدام vision-proxy مباشرة (Gemini Vision API)
    const base64 = _inspectorImageData.split(',')[1];
    const mimeType = _inspectorImageData.split(';')[0].split(':')[1];
    
    const response = await fetch('/api/vision-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'inspector',
          image: base64,
          mimeType: mimeType || 'image/jpeg',
          userMessage: systemPrompt
        })
    });
    
    if (response.ok) {
      const data = await response.json();
      const answer = data.result || 'لم يتمكن من التحليل';
      showInspectorResult(answer);
    } else {
      // Fallback: local analysis based on work type
      showInspectorResult(generateLocalAnalysis(workType, phase, specific));
    }
  } catch(e) {
    // Offline fallback
    showInspectorResult(generateLocalAnalysis(workType, phase, specific));
  }
  
  loading.style.display = 'none';
  btn.style.opacity = '1';
  btn.disabled = false;
}

function generateLocalAnalysis(workType, phase, specific) {
  const checklists = {
    roads_subgrade: {
      items: ['مستوى السطح ±10mm','دمك ≥95% MDD','CBR ≥8%','MC = OMC±2%','لا مواد عضوية أو Sabkha'],
      qcs: 'QCS 2024 S6 P3 Table 6.3',
      equipment: 'Nuclear Gauge + DCP + Survey'
    },
    roads_asphalt: {
      items: ['Delivery temp — DBM ≥140°C / WC ≥145°C (QCS 2024 S8)','Tack Coat 0.15-0.35 L/m² broken','Layer thickness ±6mm','Core Density ≥97% TMD','IRI ≤2.5 (Conv) / ≤0.9 (PMB)','Marshall ≥8.0 kN (Conv) / ≥10.0 kN (PMB)'],
      qcs: 'QCS 2024 S6 P5',
      equipment: 'Thermometer + 3m Straightedge + NDG'
    },
    struct_rebar: {
      items: ['Cover: 75mm (foundation) / 40mm (external) / 25mm (internal)','Spacing per drawing','Lap Length: 40d (tension) / 50d (seismic)','Spacers كل 1m','Embedded items in place','Cleanliness — no rust/oil/mud'],
      qcs: 'QCS 2024 S5 P4 / BS 4449',
      equipment: 'Cover Meter + Tape + Drawing'
    },
    struct_concrete: {
      items: ['Temp ≤32°C at placement','Slump within ±25mm of target','Delivery time ≤90min (60 summer)','6 cubes per 50m³','Free fall ≤1.5m','Vibration every 450mm'],
      qcs: 'QCS 2024 S5 P4',
      equipment: 'Slump Cone + Thermometer + Cube Moulds'
    },
    util_pipe: {
      items: ['Bedding 150mm ≥90% MDD','Pipe per design level ±10mm','Joints checked 100%','Thrust blocks at bends >11.25°','Marker Tape correct color 300mm above pipe'],
      qcs: 'QCS 2024 S8 + KAHRAMAA',
      equipment: 'Level + Tape + Fusion Machine'
    },
    util_excavation: {
      items: ['Width DN+600mm min','Shoring >1.2m depth','Dewatering if GWT high','Barricade ≥1.5m from edge','PPE 100%'],
      qcs: 'QCS 2024 P1 S8.4',
      equipment: 'Excavator + Shoring + Dewatering'
    }
  };
  
  const cl = checklists[workType] || checklists['roads_asphalt'];
  const phaseNames = {before:'قبل التنفيذ',during:'أثناء التنفيذ',after:'بعد التنفيذ',defect:'عيب مكتشف'};
  
  let report = '<div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:8px;padding:10px;margin-bottom:12px">';
  report += '<strong style="color:var(--gold)">⚠️ تحليل محلي (Offline)</strong> — للتحليل الكامل بالذكاء الاصطناعي يحتاج اتصال بالإنترنت';
  report += '</div>';
  
  report += '<h4 style="color:var(--gold2)">📋 قائمة الفحص — ' + (phaseNames[phase]||phase) + '</h4>';
  report += '<div style="font-size:12px;line-height:2">';
  cl.items.forEach(function(item) {
    report += '<div onclick="this.innerHTML=this.innerHTML.startsWith(\'☐\')?this.innerHTML.replace(\'☐\',\'✅\'):this.innerHTML.replace(\'✅\',\'☐\')" style="cursor:pointer;padding:6px 10px;background:var(--dark3);border:1px solid var(--border);border-radius:6px;margin:3px 0">☐ ' + item + '</div>';
  });
  report += '</div>';
  
  report += '<div style="margin-top:12px;padding:10px;background:var(--dark3);border:1px solid var(--border);border-radius:8px">';
  report += '<div style="font-size:11px;color:var(--text3)">📖 المرجع: <strong style="color:var(--gold)">' + cl.qcs + '</strong></div>';
  report += '<div style="font-size:11px;color:var(--text3);margin-top:4px">🔧 المعدات: ' + cl.equipment + '</div>';
  report += '</div>';
  
  if (specific) {
    report += '<div style="margin-top:10px;padding:8px;background:rgba(52,152,219,.06);border:1px solid rgba(52,152,219,.15);border-radius:8px;font-size:11px;color:#3498db">';
    report += '🔍 فحص محدد: ' + specific;
    report += '</div>';
  }
  
  return report;
}

function showInspectorResult(content) {
  const result = document.getElementById('inspector-result');
  let report = document.getElementById('inspector-report');
  if (result) result.style.display = 'block';
  // [XSS Fix S5] AI output يمر عبر renderMarkdownSafe قبل innerHTML
  if (report) report.innerHTML = renderMarkdownSafe(content);
}

function shareInspectorReport() {
  const report = document.getElementById('inspector-report');
  if (!report) return;
  let text = 'تقرير المفتش الذكي — QatarSpec Pro\n' + report.textContent.substring(0, 500);
  const url = 'https://wa.me/?text=' + encodeURIComponent(text);
  window.open(url, '_blank');
}

function inspectorToNCR() {
  const workType = document.getElementById('insp-work-type');
  const specific = document.getElementById('insp-specific');
  const location = document.getElementById('insp-location');

  openDetail('ashghal_forms');
  if(window._inspNcrTimer)clearTimeout(window._inspNcrTimer);
  window._inspNcrTimer=setTimeout(function() {
    window._inspNcrTimer=null;
    switchForm('ncr');
    const desc = document.getElementById('ncr-desc');
    const loc = document.getElementById('ncr-loc');
    if (desc && specific) desc.value = (specific.value || '') + ' — مكتشف بالمفتش الذكي';
    if (loc  && location) loc.value  = location.value || '';
    autoFillNCR();
    showToast('✅ تم نقل البيانات لنموذج NCR');
  }, 450);
}

function resetInspector() {
  _inspectorImageData = null;
  document.getElementById('inspector-preview').style.display = 'none';
  document.getElementById('inspector-form').style.display = 'none';
  document.getElementById('inspector-result').style.display = 'none';
  document.getElementById('inspector-img').src = '';
  document.getElementById('insp-work-type').value = '';
  document.getElementById('insp-specific').value = '';
  document.getElementById('insp-location').value = '';
  showToast('🔄 جاهز لفحص جديد');
}


// ================================================================
// CLEAN BREADCRUMB + SECTION NAV — Overrides openDetail once
// ================================================================
(function() {
  const _baseOpenDetail = openDetail;
  
  openDetail = function(key) {
    _baseOpenDetail(key);
    
    // === BREADCRUMB ===
    const map = typeof SECTION_MAP !== 'undefined' ? SECTION_MAP[key] : null;
    if (!map) return;
    
    const d = detailData[key];
    const title = d ? d.title.replace(/[^\w\s\u0600-\u06FF—|]/g, '').trim().substring(0, 40) : key;
    
    let bc = '<div class="breadcrumb">';
    bc += '<span class="bc-link" onclick="document.getElementById(\'detailModal\').classList.remove(\'open\')">\u{1F3E0} الرئيسية</span>';
    bc += '<span class="bc-sep">\u2190</span>';
    
    if (map.parent && map.parent !== 'home' && detailData[map.parent]) {
      bc += '<span class="bc-link" onclick="QS.openDetail(\'' + map.parent + '\')">' + map.group + '</span>';
      bc += '<span class="bc-sep">\u2190</span>';
    }
    bc += '<span class="bc-current">' + title + '</span></div>';
    
    // Navigation buttons
    let nav = '';
    if (map.prev || map.next) {
      nav += '<div class="section-nav">';
      nav += map.prev && detailData[map.prev] ? '<button onclick="QS.openDetail(\'' + map.prev + '\')">\u2192 السابق</button>' : '<div></div>';
      nav += map.next && detailData[map.next] ? '<button onclick="QS.openDetail(\'' + map.next + '\')">\u2190 التالي</button>' : '';
      nav += '</div>';
    }
    
    // Related links
    let links = '<div class="related-links">';
    if (map.equipment && detailData[map.equipment]) links += '<a onclick="QS.openDetail(\'' + map.equipment + '\')">\u{1F527} المعدات</a>';
    if (map.itp && detailData[map.itp]) links += '<a onclick="QS.openDetail(\'' + map.itp + '\')">\u{1F4CB} ITP</a>';
    if (map.parent && map.parent !== 'home' && detailData[map.parent]) links += '<a onclick="QS.openDetail(\'' + map.parent + '\')">\u{1F4C2} القسم</a>';
    // [v4.2] زر الدليل التنفيذي المفصّل — يظهر فقط لـ 4 بطاقات stages
    var _stagesDetailMap = {
      'water_supply_stages': 'water_supply_stages_detail',
      'sewer_stages':        'sewer_stages_detail',
      'storm_stages':        'storm_stages_detail',
      'treated_stages':      'treated_stages_detail'
    };
    if (_stagesDetailMap[key] && window.QS_CONTENT_MAP && window.QS_CONTENT_MAP[_stagesDetailMap[key]]) {
      links += '<a class="detail-guide-btn" style="background:var(--accent,#0077cc);color:#fff;font-weight:700;border-radius:8px;padding:6px 14px;" onclick="QS.openDetail(\'' + _stagesDetailMap[key] + '\')">\u{1F4D6} \u062F\u0644\u064A\u0644 \u062A\u0646\u0641\u064A\u0630\u064A \u0645\u0641\u0635\u0651\u0644</a>';
    }
    links += '</div>';
    
    const pa = document.getElementById('print-area');
    if (pa) {
      let old = pa.querySelector('.breadcrumb');
      if (old) old.remove();
      old = pa.querySelector('.section-nav');
      if (old) old.remove();
      old = pa.querySelector('.related-links');
      if (old) old.remove();
      pa.insertAdjacentHTML('afterbegin', bc);
      pa.insertAdjacentHTML('beforeend', links + nav);
    }
    
    // === NCR QUICK LOGGER RENDER ===
    if (key === 'ncr_quick_logger' && typeof renderQuickNCRs === 'function') {
      safeTimeout('renderNCRs', renderQuickNCRs, 200);
    }
  };
})();

// ═══════════════════════════════════════════════════════════════════════════════
// PWA SYSTEM — v2.2.0 — Inline Manifest + Service Worker via Blob URL
// ═══════════════════════════════════════════════════════════════════════════════

(function initPWA() {
  // ── 1. Inline Manifest via Blob ──
  var manifestData = {
    name: 'QatarSpec Pro — المواصفات القطرية',
    short_name: 'QatarSpec',
    description: 'دليل المواصفات الهندسية القطرية — QCS 2024 + Ashghal + KAHRAMAA',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0A0A0A',
    theme_color: '#7A1515',
    lang: 'ar',
    dir: 'rtl',
    categories: ['productivity', 'utilities', 'engineering'],
    icons: [
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='80' fill='%237A1515'/%3E%3Ctext y='380' font-size='340' x='50%25' text-anchor='middle'%3E🏗️%3C/text%3E%3C/svg%3E",
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      },
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect width='192' height='192' rx='30' fill='%237A1515'/%3E%3Ctext y='145' font-size='130' x='50%25' text-anchor='middle'%3E🏗️%3C/text%3E%3C/svg%3E",
        sizes: '192x192',
        type: 'image/svg+xml'
      }
    ],
    shortcuts: [
      { name: 'البحث الذكي', short_name: 'بحث', url: '/?search=1', description: 'ابحث في QCS 2024' },
      { name: 'الحاسبات', short_name: 'حاسبة', url: '/?calc=1', description: 'حاسبات Pass/Fail' }
    ]
  };
  try {
    var mBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
    var mURL = URL.createObjectURL(mBlob);
    var mLink = document.getElementById('pwaManifestLink');
    if (mLink) mLink.href = mURL;
  } catch(e) { console.warn('[PWA] Manifest blob failed:', e); }

  // ── 2. PWA Install Prompt ──
  // تسجيل SW يتم في سطر 155 عبر /sw.js الحقيقي
  window.addEventListener('beforeinstallprompt', function(ev) {
    ev.preventDefault();
    window._pwaInstallPrompt = ev;
    var btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.style.display = 'flex';
  });
})();

// ─── End PWA System ───


// ═══════════════════════════════════════════════════════
// QS Namespace — prevents global window pollution

// ─── Card Deduplication — prevents repeated cards (roads_materials × 7, etc.) ───
// Issue #4 from QatarSpec evaluation: 25+ duplicate card instances
// [v3.0] dedupeCards() أُزيلت — الكروت المكررة تُدار بـ data-deprecated في HTML مباشرة

// ── Accessibility: Add ARIA to cat-cards ──
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.cat-card').forEach(function(card) {
    var name = (card.querySelector('.cat-name') || {}).textContent || '';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', name + ' — اضغط للفتح');
    card.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});

// ── Debounce for card filter (already fast, but good practice) ──
var _cardFilterDebounce;
document.addEventListener('DOMContentLoaded', function() {
  var inp = document.getElementById('cardFilterInput');
  if (inp) {
    inp.removeAttribute('oninput');
    inp.addEventListener('input', function() {
      clearTimeout(_cardFilterDebounce);
      _cardFilterDebounce = setTimeout(function() {
        filterCards(inp.value);
      }, 200);
    });
  }
});
// ─── End card utils ───

// ═══════════════════════════════════════════════════════════════════════════════
// Virtual Scroll — IntersectionObserver لتحسين أداء 200+ كرت
// ═══════════════════════════════════════════════════════════════════════════════
(function initVirtualScroll() {
  if (!('IntersectionObserver' in window)) return;
  const MARGIN = '200px';
  const cards  = [];

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        var card = entry.target;
        if (entry.isIntersecting) {
          card.style.contentVisibility = 'visible';
          card.style.containIntrinsicSize = '';
        } else {
          var h = card.offsetHeight;
          if (h > 0) card.style.containIntrinsicSize = h + 'px';
          card.style.contentVisibility = 'auto';
        }
      });
    },
    { rootMargin: MARGIN, threshold: 0 }
  );

  function attachObserver() {
    document.querySelectorAll('.cat-card').forEach(function(card) {
      if (card.style.display === 'none') return;
      observer.observe(card);
      cards.push(card);
    });
    if (cards.length) console.log('[QatarSpec] VirtualScroll: مُراقبة', cards.length, 'كرت');
  }

  // إذا كان DOMContentLoaded قد انتهى بالفعل (script في نهاية الملف) نُشغّل مباشرة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { requestAnimationFrame(attachObserver); });
  } else {
    requestAnimationFrame(attachObserver);
  }

  var filterInput = document.getElementById('cardFilterInput');
  if (filterInput) {
    var filterDebounce;
    filterInput.addEventListener('input', function() {
      clearTimeout(filterDebounce);
      filterDebounce = setTimeout(function() {
        cards.forEach(function(c) { observer.unobserve(c); });
        cards.length = 0;
        document.querySelectorAll('.cat-card').forEach(function(card) {
          if (card.style.display === 'none') {
            card.style.contentVisibility = 'visible';
            return;
          }
          observer.observe(card);
          cards.push(card);
        });
      }, 150);
    });
  }
})();
// ─── End Virtual Scroll ───

// ═══════════════════════════════════════════════════════════════════════════════
// MISSING CALCULATORS — calcGP / calcBlockwork / calcRoadLayers
// مُعرَّفة كـ window.X = function() لضمان window[name] في كل البيئات
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * calcGP — Grading & Plasticity Index Check (QCS 2024 S6 P3/P4/P5)
 */
window.calcGP = function calcGP() {
  var layer = (document.getElementById('gp-layer')  || {}).value || 'subbase';
  var pi    = parseFloat((document.getElementById('gp-pi')   || {}).value);
  var ll    = parseFloat((document.getElementById('gp-ll')   || {}).value);
  var p200  = parseFloat((document.getElementById('gp-p200') || {}).value);
  var p4    = parseFloat((document.getElementById('gp-p4')   || {}).value);
  var p075  = parseFloat((document.getElementById('gp-p075') || {}).value);

  if (isNaN(pi) && isNaN(ll) && isNaN(p200)) {
    showToast('❌ أدخل قيمة واحدة على الأقل');
    return;
  }

  var limits = {
    subgrade: { pi: 10, ll: 35, p200: 35, ref: 'QCS 2024 S6 P3 Table 3:1' },
    subbase:  { pi:  6, ll: 25, p200: 12, ref: 'QCS 2024 S6 P4 Table 4:1' },
    base:     { pi:  4, ll: 20, p200:  8, ref: 'QCS 2024 S6 P5 Table 5:1' },
  };
  var L = limits[layer] || limits.subbase;
  var lines = [], allPass = true;

  if (!isNaN(pi))   { var ok = pi   <= L.pi;   if (!ok) allPass=false; lines.push('PI: '   + pi   + ' | الحد: ≤' + L.pi   + ' ' + (ok?'✅':'❌')); }
  if (!isNaN(ll))   { var ok = ll   <= L.ll;   if (!ok) allPass=false; lines.push('LL: '   + ll   + '% | الحد: ≤' + L.ll  + '% ' + (ok?'✅':'❌')); }
  if (!isNaN(p200)) { var ok = p200 <= L.p200; if (!ok) allPass=false; lines.push('% Passing #200: ' + p200 + '% | الحد: ≤' + L.p200 + '% ' + (ok?'✅':'❌')); }
  if (!isNaN(p4))   lines.push('% Passing #4 (4.75mm): ' + p4 + '%');
  if (!isNaN(p075)) lines.push('% Passing #200 (0.075mm): ' + p075 + '%');
  lines.push('المرجع: ' + L.ref);

  showResult('gp-result', allPass, null, null, lines.join('<br>'));
};

/**
 * calcBlockwork — حاسبة كميات البلوك والمونة (QCS 2024 S5)
 */
window.calcBlockwork = function calcBlockwork() {
  var wallArea  = parseFloat((document.getElementById('bw-area')     || {}).value);
  var blockType = (document.getElementById('bw-type')    || {}).value || '200';
  var openings  = parseFloat((document.getElementById('bw-openings') || {}).value) || 0;

  if (!wallArea || isNaN(wallArea)) { showToast('❌ أدخل مساحة الجدار (m²)'); return; }

  var netArea = Math.max(0, wallArea - openings);
  var sizes   = { '100':{t:100}, '150':{t:150}, '200':{t:200}, '250':{t:250} };
  var bs      = sizes[blockType] || sizes['200'];

  // Standard block face 390×190mm + 10mm joint
  var faceArea   = (0.400) * (0.200);          // m²
  var blockCount = Math.ceil(netArea / faceArea * 1.05);
  var mortarVol  = +(netArea * (bs.t / 1000) * 0.33).toFixed(2);
  var mortarBags = Math.ceil(mortarVol * 350 / 50);
  var sandVol    = +(mortarVol * 1.1).toFixed(2);

  showResult('bw-result', true, null, null, [
    'مساحة الجدار الصافية: ' + netArea.toFixed(1) + ' m²',
    'عدد البلوك ' + blockType + 'mm: <strong>' + blockCount.toLocaleString() + ' قطعة</strong>',
    'مونة: ' + mortarVol + ' m³ | أسمنت: ' + mortarBags + ' كيس | رمل: ' + sandVol + ' m³',
    'المرجع: QCS 2024 S5 — Masonry Works',
  ].join('<br>'));
};

/**
 * calcRoadLayers — حاسبة حجم وكميات طبقات الطريق (QCS 2024 S6/S8)
 */
window.calcRoadLayers = function calcRoadLayers() {
  var length  = parseFloat((document.getElementById('rl-length')   || {}).value);
  var width   = parseFloat((document.getElementById('rl-width')    || {}).value);
  var tSubg   = parseFloat((document.getElementById('rl-subgrade') || {}).value) || 0;
  var tSubb   = parseFloat((document.getElementById('rl-subbase')  || {}).value) || 0;
  var tBase   = parseFloat((document.getElementById('rl-base')     || {}).value) || 0;
  var tBinder = parseFloat((document.getElementById('rl-binder')   || {}).value) || 0;
  var tWear   = parseFloat((document.getElementById('rl-wearing')  || {}).value) || 0;

  if (!length || !width) { showToast('❌ أدخل الطول والعرض'); return; }

  var area   = length * width;
  var layers = [
    { name:'Subgrade',      t:tSubg,   d:2.00, ref:'QCS S6 P3' },
    { name:'Sub-base',      t:tSubb,   d:2.20, ref:'QCS S6 P4' },
    { name:'Base Course',   t:tBase,   d:2.30, ref:'QCS S6 P5' },
    { name:'Binder Course', t:tBinder, d:2.35, ref:'QCS S8 P5' },
    { name:'Wearing Course',t:tWear,   d:2.40, ref:'QCS S8 P5' },
  ].filter(function(l){ return l.t > 0; });

  if (!layers.length) { showToast('❌ أدخل سماكة طبقة واحدة على الأقل (mm)'); return; }

  var lines = ['المساحة: ' + area.toLocaleString() + ' m² (' + length + ' × ' + width + 'm)', ''];
  var totVol = 0, totTon = 0;
  layers.forEach(function(l) {
    var vol = area * l.t / 1000;
    var ton = vol * l.d;
    totVol += vol; totTon += ton;
    lines.push('<strong>' + l.name + '</strong> (' + l.ref + '): ' + l.t + 'mm → ' + vol.toFixed(0) + ' m³ / ' + ton.toFixed(0) + ' t');
  });
  lines.push('', '══ الإجمالي: <strong>' + totVol.toFixed(0) + ' m³ | ' + (totTon/1000).toFixed(1) + ' kt</strong>');

  showResult('rl-result', true, null, null, lines.join('<br>'));
};

// ─── End Missing Calculators ───

// ===== MONETIZATION SYSTEM → moved to js/core/pro-system.js =====

// publicFns Integrity Checker — يكتشف الدوال المُعلَنة في QS لكنها غير موجودة
// ═══════════════════════════════════════════════════════════════════════════════
// ── console.group polyfill ── بعض البيئات (WebView / iOS WKWebView / Node)
//    لا تدعم console.group — نُعرّفها بأمان إذا لم تكن موجودة
(function _patchConsoleGroup() {
  if (typeof console.group   !== 'function') console.group   = console.log;
  if (typeof console.groupEnd !== 'function') console.groupEnd = function() {};
  if (typeof console.groupCollapsed !== 'function') console.groupCollapsed = console.log;
})();

(function checkPublicFns() {
  var publicFnsCheck = [
    'openDetail','closeDetailModal','goBack','shareDetail',
    'showToast','doSearch','quickSearch','filterCards','clearCardFilter',
    'openKeyModal','closeKeyModal','saveKey',
    'handleFiles','handleDocUpload','handleDaUpload',
    'loadLocalVideo','inspectorLoadImage','resetInspector',
    'runInspector','inspectorToNCR','shareInspectorReport',
    'runDocAnalysis','runDrawingAnalysis','selectDaType','copyDaResult',
    'setLang','switchCalc','switchCalcMode','switchForm','switchMainCat',
    'showExecStep','prefillNCR','addQuickNCR','clearQuickNCRs','exportQuickNCRs',
    'autoFillRFI','autoFillNCR','exportRFIExcel','exportNCRExcel','exportDPRExcel',
    'exportToPDF','exportToWord','printCurrentDetail','copyAnswer','copyITPtoClipboard',
    'calcMaterials','calcTestSchedule','calcTestScheduleEn',
    'calcFreq','calcESAL','calcPipeSize','validateMixDesign',
    'calcSPT','calcConcrete','calcRebar','calcCover','calcLapLength',
    'calcGP','calcBlockwork','calcRoadLayers',
  ];

  document.addEventListener('DOMContentLoaded', function() {
    var missing  = [];
    var existing = [];
    publicFnsCheck.forEach(function(name) {
      if (typeof window[name] === 'function') existing.push(name);
      else missing.push(name);
    });

    if (missing.length === 0) {
      console.log(
        '%c[QatarSpec] \u2705 publicFns Integrity: \u062c\u0645\u064a\u0639 \u0627\u0644\u062f\u0648\u0627\u0644 \u0645\u0648\u062c\u0648\u062f\u0629 (' + existing.length + '/' + publicFnsCheck.length + ')',
        'color:#4CAF50;font-weight:bold'
      );
    } else {
      console.group('%c[QatarSpec] \u26a0\ufe0f publicFns Integrity: ' + missing.length + ' \u062f\u0627\u0644\u0629 \u0645\u0641\u0642\u0648\u062f\u0629', 'color:#ff9800;font-weight:bold');
      missing.forEach(function(name) {
        console.warn('  \u2717 window.' + name + '() \u2014 \u063a\u064a\u0631 \u0645\u0639\u0631\u0651\u0641\u0629 \u0643\u0640 window function');
      });
      console.groupEnd();
    }
  });
})();
// ─── End publicFns Checker ───

// ── QS namespace ──
// All public functions registered here — namespace is BUILT in data_calcs.js
// after ALL functions (including those in data_calcs.js) are defined.
window._QS_PUBLIC_FNS = [
  'openDetail','closeDetailModal','goBack',
  'showToast','doSearch','quickSearch','filterCards','clearCardFilter',
  'openKeyModal','closeKeyModal','saveKey',
  'handleFiles','handleDocUpload','handleDaUpload',
  'loadLocalVideo','inspectorLoadImage','resetInspector',
  'runInspector','inspectorToNCR','shareInspectorReport',
  'runDocAnalysis','runDrawingAnalysis','selectDaType','copyDaResult',
  'setLang','switchCalc','switchCalcMode','switchForm','switchMainCat',
  'showExecStep','prefillNCR','addQuickNCR','clearQuickNCRs','exportQuickNCRs',
  'autoFillRFI','autoFillNCR','exportRFIExcel','exportNCRExcel','exportDPRExcel',
  'exportToPDF','exportToWord','printCurrentDetail','copyAnswer','copyITPtoClipboard',
  'calcMaterials','calcTestSchedule','calcTestScheduleEn',
  'calcFreq','calcESAL','calcPipeSize','validateMixDesign',
  'calcSPT','calcConcrete','calcRebar','calcCover','calcLapLength',
  'calcGP','calcBlockwork','calcRoadLayers',
];
// Temporary stub so any code that references QS before data_calcs.js loads
// doesn't throw. Will be replaced by the real QS at end of data_calcs.js.
window.QS = window.QS || {};
// ── QS stub: expose all public functions before data_calcs.js loads ──
// Each wrapper checks if the real function exists before calling
(function _buildQSStub() {
  var fns = [
    'openDetail','closeDetailModal','goBack','shareDetail',
    'doSearch','quickSearch','copyAnswer',
    'openKeyModal','closeKeyModal','saveKey',
    'filterCards','clearCardFilter',
    'exportToPDF','exportToWord','printCurrentDetail',
    'setLang','switchForm','switchCalc','switchMainCat',
    'initCalcPanels',
  ];
  fns.forEach(function(name) {
    if (!window.QS[name]) {
      window.QS[name] = function() {
        var fn = window[name];
        if (typeof fn === 'function') return fn.apply(window, arguments);
        console.warn('[QS stub] ' + name + ' not ready yet — retrying in 300ms');
        setTimeout(function() {
          var fn2 = window[name];
          if (typeof fn2 === 'function') fn2.apply(window, arguments);
        }, 300);
      };
    }
  });
})();


// ═══════════════════════════════════════════════════
// SECTION 3: QS_CONTENT Chunk Loader
// ═══════════════════════════════════════════════════
// QS_CONTENT — manifest + on-demand chunk loader
(function(){
  var _loaded = {};
  var _loading = {};

  function loadManifest(){
    if(window.QS_CONTENT_MAP) return;
    var s=document.createElement('script');
    s.src='data_content_manifest.js?v=7';
    s.async=true;
    document.head.appendChild(s);
  }

  window._loadContentChunk = function(key, cb) {
    // Resolve alias first
    var realKey = (window._CONTENT_ALIASES && window._CONTENT_ALIASES[key]) || key;
    var map = window.QS_CONTENT_MAP || {};
    var chunk = map[realKey] || map[key];
    if(!chunk){
      console.warn('[QS] key not found in manifest:', realKey);
      if(cb) cb();
      return;
    }
    if(_loaded[chunk]){ if(cb) cb(); return; }
    if(_loading[chunk]){ if(cb) _loading[chunk].push(cb); return; }
    _loading[chunk] = cb ? [cb] : [];
    var s=document.createElement('script');
    s.src=chunk+'?v=9';
    s.onload=function(){
      _loaded[chunk]=true;
      (_loading[chunk]||[]).forEach(function(f){ try{f();}catch(e){} });
      delete _loading[chunk];
    };
    s.onerror=function(){
      console.warn('[QS] chunk load failed:',chunk);
      delete _loading[chunk];
    };
    document.head.appendChild(s);
  };

  // Load manifest immediately (small file)
  if('requestIdleCallback'in window){
    requestIdleCallback(loadManifest,{timeout:800});
  }else{
    setTimeout(loadManifest,400);
  }
})();

// ═══════════════════════════════════════════════════
// SECTION 4: Offline Indicator + Keyboard Shortcuts
// ═══════════════════════════════════════════════════

// ── Offline / Online Indicator ─────────────────────────────────
(function initOfflineIndicator() {
  const bar = document.getElementById('offlineBar');
  if (!bar) return;

  function updateStatus() {
    if (navigator.onLine) {
      bar.classList.remove('show');
    } else {
      bar.classList.add('show');
    }
  }

  window.addEventListener('online', () => {
    bar.classList.remove('show');
    showToast('✅ عاد الاتصال — تتم مزامنة البيانات', 'success');
    // Trigger background sync if supported
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(sw => {
        sw.sync.register('sync-ncr').catch(() => {});
        sw.sync.register('sync-rfi').catch(() => {});
      });
    }
  });

  window.addEventListener('offline', () => {
    bar.classList.add('show');
    showToast('📡 انقطع الاتصال — يعمل التطبيق بشكل محدود', 'warning');
  });

  updateStatus();
})();

// ── Keyboard Shortcuts (Section 2 UX Upgrade) ─────────────────
(function initKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    const tag = document.activeElement?.tagName?.toLowerCase();
    const inInput = tag === 'input' || tag === 'textarea' || tag === 'select';

    // Ctrl+K or Cmd+K — focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const si = document.getElementById('searchInput');
      if (si) { si.focus(); si.select(); showToast('🔍 ابحث...'); }
      return;
    }

    // / — focus search (when not in input)
    if (e.key === '/' && !inInput) {
      e.preventDefault();
      const si = document.getElementById('searchInput');
      if (si) { si.focus(); si.select(); }
      return;
    }

    // Escape — close modal or clear search
    if (e.key === 'Escape') {
      const modal = document.getElementById('detailModal');
      if (modal?.classList.contains('open')) {
        closeDetailModal();
        return;
      }
      const si = document.getElementById('searchInput');
      if (si && si.value) { si.value = ''; si.blur(); }
      return;
    }

    // Alt+D — toggle dark/light mode
    if (e.altKey && e.key === 'd') {
      e.preventDefault();
      toggleTheme();
      return;
    }
  });

  // Show shortcuts hint on first visit
  const shown = localStorage.getItem('qs_shortcuts_shown');
  if (!shown) {
    setTimeout(() => {
      showToast('💡 Ctrl+K للبحث | Esc للإغلاق | Alt+D للوضع الليلي');
      localStorage.setItem('qs_shortcuts_shown', '1');
    }, 3000);
  }
})();

// showSearchSkeleton → نُقلت إلى js/core/ui-utils.js (A1 Refactor)

// toggleTheme + applyTheme + initTheme + matchMedia → نُقلت إلى js/core/theme.js (A2 Refactor)


// displayAIResponse → نُقلت إلى js/core/ui-utils.js (A1 Refactor)

// ═══════════════════════════════════════════════════
// SECTION 5: Pro Activation + Back To Top + Dark Mode
// ═══════════════════════════════════════════════════
// ── activateProNow — الدالة الوحيدة لتفعيل Pro (لا مودال، لا overflow) ──
window.activateProNow = function(codeArg) {
  if (window._qs_pro_confirmed) {
    alert('✅ أنت بالفعل مشترك في Pro!');
    return;
  }
  var code = codeArg || (document.getElementById('promoCodeInput') || {}).value || '';
  code = code.trim();
  if (!code) { code = prompt('أدخل كود الترقية (مثال: QATAR2026PRO):'); }
  if (!code || !code.trim()) return;
  code = code.trim().toUpperCase();

  var btn = document.querySelector('.promo-btn');
  var proBtn = document.getElementById('proBtn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳...'; }
  if (proBtn) { proBtn.disabled = true; }

  var ctrl = new AbortController();
  var tid = setTimeout(function() { ctrl.abort(); }, 10000);

  fetch('/api/verify-pro', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code }),
    signal: ctrl.signal
  })
  .then(function(r) { clearTimeout(tid); return r.json(); })
  .then(function(data) {
    if (data.ok || data.success || data.valid) {
      window._qsSetProFromServer(true);
      if (typeof renderProStatus === 'function') renderProStatus();
      alert('✅ تم تفعيل Pro بنجاح! سيتم تحديث الصفحة.');
      setTimeout(function() { location.reload(); }, 500);
    } else {
      alert('❌ كود غير صحيح: ' + (data.error || 'تحقق من الكود وأعد المحاولة'));
    }
  })
  .catch(function(err) {
    clearTimeout(tid);
    alert(err.name === 'AbortError'
      ? '⏱️ انتهت مهلة الاتصال — حاول مجدداً'
      : '❌ خطأ: ' + (err.message || 'تحقق من الإنترنت'));
  })
  .finally(function() {
    if (btn) { btn.disabled = false; btn.textContent = '✅ تفعيل'; }
    if (proBtn) { proBtn.disabled = false; }
  });
};

// ── activateProSimple alias للتوافق ──
window.activateProSimple = window.activateProNow;
// ── Back to Top Button ──
(function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
})();

// ── Dark Mode Button Icon Sync ──
(function syncDarkModeIcon() {
  function updateIcon() {
    const btn = document.getElementById('darkModeBtn');
    if (!btn) return;
    const theme = localStorage.getItem('qs_theme') || 'dark';
    btn.textContent = theme === 'light' ? '☀️' : theme === 'system' ? '🖥️' : '🌙';
    btn.title = theme === 'light' ? 'وضع نهاري — اضغط للتبديل' : theme === 'system' ? 'وضع النظام — اضغط للتبديل' : 'وضع ليلي — اضغط للتبديل';
  }
  document.addEventListener('DOMContentLoaded', updateIcon);
  // Patch toggleTheme to also update icon
  const _origToggle = window.toggleTheme;
  window.toggleTheme = function() { _origToggle && _origToggle(); updateIcon(); };
})();

// ═══════════════════════════════════════════════════
// SECTION 6: Error Boundary + Analytics Events + Card Animation
// ═══════════════════════════════════════════════════
// ── Error Boundary: يمنع crash الصفحة ويُظهر toast للمستخدم ──
window.onerror = function(msg, url, line, col, err) {
  const ignore = ['ResizeObserver', 'Script error', 'Non-Error promise'];
  if (ignore.some(function(i){ return String(msg).includes(i); })) return true;
  console.warn('[QatarSpec] Error:', msg, 'at', url, 'line', line);
  if (typeof showToast === 'function') {
    showToast('⚠️ حدث خطأ — يرجى تحديث الصفحة', 'error', 5000);
  }
  return true; // منع ظهور رسالة المتصفح الافتراضية
};

// ── Unhandled Promise Rejections ──
window.addEventListener('unhandledrejection', function(e) {
  console.warn('[QatarSpec] Unhandled Promise:', e.reason);
  if (e.reason && e.reason.name !== 'AbortError') {
    if (typeof showToast === 'function') {
      showToast('⚠️ خطأ في الاتصال — تحقق من الإنترنت', 'warning', 4000);
    }
  }
});

// ── Analytics Events Helper — تتبع الأحداث الرئيسية ──
(function() {
  function track(eventName, params) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', eventName, params || {});
      }
    } catch(e) { /* لا crash إذا GA غير محمّل */ }
  }

  // تتبع البحث
  document.addEventListener('QS:search', function(e) {
    track('search', { search_term: e.detail && e.detail.term });
  });

  // تتبع استخدام الحاسبات
  document.addEventListener('QS:calculator', function(e) {
    track('calculator_use', { calc_type: e.detail && e.detail.type });
  });

  // تتبع التصدير
  document.addEventListener('QS:export', function(e) {
    track('export', { format: e.detail && e.detail.format });
  });

  // تتبع فتح الكروت
  document.addEventListener('click', function(e) {
    const card = e.target.closest && e.target.closest('.cat-card');
    if (card) {
      const title = card.querySelector('.cat-title, h3, [class*="title"]');
      track('card_open', { card_name: title ? title.textContent.trim().slice(0,50) : 'unknown' });
    }
  }, true);

  // تتبع ترقية Pro
  document.addEventListener('QS:pro_upgrade', function() {
    track('pro_upgrade_attempt', {});
  });

  // حفظ track في namespace
  if (window.QS) window.QS.track = track;
  else window._qsTrack = track;
})();

// ── Card Entrance Animation — يُفعَّل تلقائياً عند ظهور الكروت ──
(function() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  function observeCards() {
    document.querySelectorAll('.cat-card:not(.animate-in)').forEach(function(card) {
      obs.observe(card);
    });
  }

  // تشغيل عند التحميل + عند فلترة الكروت
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeCards);
  } else {
    observeCards();
  }
  // إعادة التشغيل بعد فلترة البحث
  document.addEventListener('QS:filter', function() {
    setTimeout(observeCards, 100);
  });
})();

// ── Empty State Helper — يُظهر رسالة "لا نتائج" عند الفلترة ──
(function() {
  function checkEmptyGroups() {
    document.querySelectorAll('.section-group, [class*="cat-group"], [class*="section"]').forEach(function(group) {
      const cards = group.querySelectorAll('.cat-card');
      const visibleCards = [...cards].filter(function(c) {
        return c.style.display !== 'none' && !c.hidden;
      });
      let emptyEl = group.querySelector('.empty-state');
      if (visibleCards.length === 0 && cards.length > 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.className = 'empty-state';
          emptyEl.innerHTML =
            '<span class="empty-state-icon">🔍</span>' +
            '<div class="empty-state-text">لا توجد نتائج في هذا القسم</div>' +
            '<div class="empty-state-sub">جرّب بحثاً مختلفاً أو أعِد ضبط الفلتر</div>';
          group.appendChild(emptyEl);
        }
      } else if (emptyEl) {
        emptyEl.remove();
      }
    });
  }
  // تشغيل على البحث
  document.addEventListener('input', function(e) {
    if (e.target && (e.target.id === 'searchBox' || e.target.id === 'mainSearch')) {
      setTimeout(checkEmptyGroups, 200);
    }
  });
})();

// ═══════════════════════════════════════════════════
// SECTION 7: Performance Monitoring — Core Web Vitals
// ═══════════════════════════════════════════════════
(function() {
  // Core Web Vitals
  new PerformanceObserver(function(list) {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('[QatarSpec] LCP:', entry.startTime);
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', { event_category: 'LCP', value: Math.round(entry.startTime) });
        }
      }
      if (entry.entryType === 'first-input') {
        var fid = entry.processingStart - entry.startTime;
        console.log('[QatarSpec] FID:', fid);
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', { event_category: 'FID', value: Math.round(fid) });
        }
      }
      if (entry.entryType === 'layout-shift') {
        console.log('[QatarSpec] CLS:', entry.value);
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', { event_category: 'CLS', value: Math.round(entry.value * 1000) / 1000 });
        }
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

  // Custom metrics
  window.addEventListener('load', function() {
    setTimeout(function() {
      var ttfb = performance.timing.responseStart - performance.timing.requestStart;
      console.log('[QatarSpec] TTFB:', ttfb);
      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', { event_category: 'TTFB', value: ttfb });
      }
    }, 0);
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// [SEC v4.1] TAP PAYMENT — معالج redirect بعد الدفع
// يقرأ JWT من URL fragment ويرسله لـ /api/verify-pro لإصدار httpOnly cookie
// السبب: tap-callback.js يعيد redirect إلى /?payment=success#pro_token=JWT
// الـ fragment (#) لا يُرسل للسيرفر — آمن — لكن يحتاج client يقرأه ويعالجه
// ═══════════════════════════════════════════════════════════════════════════════
(function handleTapPaymentRedirect() {
  'use strict';

  // تشغيل فقط عند وجود payment=success في الـ URL
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('payment') !== 'success') return;

  // قراءة الـ JWT من URL fragment
  var hash = window.location.hash || '';
  var tokenMatch = hash.match(/pro_token=([^&]+)/);
  if (!tokenMatch || !tokenMatch[1]) {
    console.warn('[Payment] payment=success لكن لا يوجد pro_token في الـ hash');
    showToast('⚠️ مشكلة في معالجة الدفع — تواصل مع الدعم');
    return;
  }

  var jwtToken = decodeURIComponent(tokenMatch[1]);

  // أظهر رسالة جاري المعالجة
  showToast('⏳ جاري تفعيل الاشتراك...');

  // أرسل الـ JWT لـ /api/verify-pro لإصدار httpOnly cookie
  fetch('/api/verify-pro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // مهم: يستقبل httpOnly cookie
    body: JSON.stringify({ action: 'activate', token: jwtToken }),
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data && data.ok) {
      // نجاح — السيرفر أصدر httpOnly cookie
      // نحدّث الـ localStorage كـ UI cache فقط (ليس للتحقق الأمني)
      var expiry = new Date();
      expiry.setDate(expiry.getDate() + 30); // افتراضي شهر — السيرفر هو المرجع
      if (typeof setProActive === 'function') {
        setProActive(true, expiry.toISOString());
      }
      if (typeof renderProStatus === 'function') renderProStatus();

      // امسح الـ fragment من الـ URL (أمان — لا تخزن JWT في الـ URL)
      history.replaceState(null, '', window.location.pathname + window.location.search);

      showToast('🎉 تم تفعيل QatarSpec Pro بنجاح! مرحباً بك.');

      // إعادة تحميل بعد ثانيتين لتطبيق الـ Pro features
      setTimeout(function() { location.reload(); }, 2000);
    } else {
      console.error('[Payment] activate failed:', data);
      showToast('❌ فشل تفعيل الاشتراك — ' + (data.error || 'تواصل مع الدعم'));
      history.replaceState(null, '', window.location.pathname);
    }
  })
  .catch(function(err) {
    console.error('[Payment] network error:', err);
    showToast('❌ خطأ في الاتصال — تواصل مع الدعم');
  });
}());
