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

// ===== FILE UPLOAD =====

// ===== LOCAL VIDEO LOADER =====

// ===== DOCUMENT ANALYZER =====
const docUploaded = { specs: [], drawings: [], boq: [], gi: [] };

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

let navStack = [];

/**
 * يزيل محتوى اللغة الخاطئة من HTML قبل حقنه في الـ DOM
 * يمنع ظهور كروت مكررة (عربي + إنجليزي) داخل أقسام التفاصيل
 * @param {string} contentHTML - محتوى الـ HTML الخام من QS_CONTENT
 * @param {string} lang - اللغة الحالية ('ar' أو 'en')
 * @returns {string} - HTML نظيف بلغة واحدة فقط
 */

/**
 * يفتح الـ modal لعرض محتوى مفتاح معيّن من detailData
 * @param {string} key - مفتاح القسم (مثال: 'structural', 'roads', 'ws_laying')
 * يدير navStack للتنقل للخلف، ويستعيد الفيديوهات المحلية بعد rebuild
 */

// ── XSS Sanitization Functions ──────────────────────────────────
// تعريف هنا + في js/core/ui-utils.js (الأخير يُحمَّل أولاً ويُعيّن window.*)
// هذه النسخة fallback إذا لم يُحمَّل ui-utils.js بعد
var _ESC_MAP = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};

function sanitizeText(str) {
  return String(str).replace(/[&<>"']/g, function(c){ return _ESC_MAP[c]; });
}
if (!window.sanitizeText) window.sanitizeText = sanitizeText;

function renderMarkdownSafe(raw) {
  var escaped = sanitizeText(String(raw));
  var html = escaped
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold2)">$1</strong>')
    .replace(/^#{1,3}\s(.+)/gm, '<strong style="color:var(--gold2);font-size:15px">$1</strong>');
  return (typeof DOMPurify !== 'undefined') ? DOMPurify.sanitize(html) : html;
}
if (!window.renderMarkdownSafe) window.renderMarkdownSafe = renderMarkdownSafe;

function safeRender(container, markdown) {
  if (!container) return;
  container.innerHTML = '';
  var lines = String(markdown).split('\n');
  lines.forEach(function(line) {
    var p = document.createElement('p');
    p.textContent = line;
    container.appendChild(p);
  });
}
if (!window.safeRender) window.safeRender = safeRender;

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

// ===== GEOTECH CALCULATOR =====
safeTimeout('checkUpdates', checkForUpdates, 3000);

// ═══════════════════════════════════════════════════════════════
// PHASE 6 — FORMS HELPERS
// ═══════════════════════════════════════════════════════════════
// --- Library loaders ---

// --- PDF Export (jsPDF + html2canvas) ---

// --- Word Export (HTML-in-docx via Blob) ---

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

// ===== XLSX LOADER =====
// ===== RFI EXCEL EXPORT =====

// ===== NCR EXCEL EXPORT =====

// ===== ITP EXCEL EXPORT (MULTI-SHEET STRUCTURED) =====

// ===== PHOTO HANDLER =====
// المرحلة ٩ — Drawing Analyzer Functions
// ================================================================

// متغير عام لبيانات الصورة المرفوعة
let _daImageData = null;
let _daDrawingType = 'structural';

// تحديد نوع المخطط المختار

// معالجة رفع الصورة

// Bridge functions — ربط الأسماء في HTML مع الدوال الفعلية
window.daLoadFile = handleDaUpload;

// بناء System Prompt حسب نوع المخطط

// تنسيق نتيجة التحليل في HTML جميل

// دالة تحليل المخطط الرئيسية

// Fallback محلي حسب نوع المخطط

// ===== آلية التنفيذ — Stepper Function =====

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

/**
 * calcBlockwork — حاسبة كميات البلوك والمونة (QCS 2024 S5)
 */

/**
 * calcRoadLayers — حاسبة حجم وكميات طبقات الطريق (QCS 2024 S6/S8)
 */

// ─── End Missing Calculators ───

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
    'calcBeamDeflection','calcIsolatedFooting','calcRetainingWall','calcManningFlow',
    'calcColumnDesign','calcPileCapacity','calcAASHTOPavement','calcSteelConnection',
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
  'calcBeamDeflection','calcIsolatedFooting','calcRetainingWall','calcManningFlow',
  'calcColumnDesign','calcPileCapacity','calcAASHTOPavement','calcSteelConnection',
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
// ── Error Boundary: يمنع crash الصفحة — بدون toast (كل API لها handler خاص) ──
var _lastErrorToast = 0;
window.onerror = function(msg, url, line, col, error) {
  // فقط console.warn — لا toast هنا لأن أخطاء البطاقات تُطلق هذا الحدث
  // كل API (ai-proxy, qcs-search, إلخ) لها error toast خاص بها
  console.warn('[QatarSpec] Error:', msg, 'at', url, 'line', line);
  if (window.QS && QS.track) {
    QS.track('js_error', { message: msg, line: line, col: col, file: url });
  }
  return true; // منع crash — بدون toast
};

// ── Unhandled Promise Rejections ──
window.addEventListener('unhandledrejection', function(e) {
  e.preventDefault(); // منع console error + window.onerror
  var reason = e.reason;
  if (!reason) return;
  // فقط أخطاء الشبكة الحقيقية تستحق toast
  var isNetworkError = reason.name === 'TypeError' &&
    typeof reason.message === 'string' &&
    (reason.message.includes('fetch') || reason.message.includes('network') || reason.message.includes('Failed to fetch'));
  if (isNetworkError && !navigator.onLine) {
    var now = Date.now();
    if (typeof showToast === 'function' && (now - _lastErrorToast) > 300000) {
      _lastErrorToast = now;
      showToast('📡 لا يوجد اتصال — تحقق من الإنترنت', 'warning', 4000);
    }
  }
  console.warn('[QatarSpec] Promise:', reason && reason.message || reason);
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
