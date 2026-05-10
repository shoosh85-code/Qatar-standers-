// js/vision-features.js — QatarSpec Pro v3.0
// المفتش الذكي (photo_analyzer) + محلل المخططات (drawing_analyzer) + محلل الوثائق (doc_analyzer)
// [لا تحذف — فقط أضف أو عدّل]

// ══════════════════════════════════════════════════════════════
// SHARED UTILITIES
// ══════════════════════════════════════════════════════════════

function _escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function _vfToast(msg, type) {
  if (typeof window.showToast === 'function') window.showToast(msg, type);
  else console.log('[vision]', msg);
}

function _renderMd(text) {
  // [SEC] text is already escaped before calling this
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold)">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:var(--text2)">$1</em>')
    .replace(/^### (.+)$/gm, '<h4 style="color:var(--gold);margin:10px 0 4px;font-size:13px">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="color:var(--gold);border-bottom:1px solid rgba(201,168,76,.3);padding-bottom:4px;margin:12px 0 6px;font-size:14px">$1</h3>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-right:4px">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul style="padding-right:16px;margin:6px 0">$&</ul>')
    .replace(/(✅)/g, '<span style="color:#2ecc71">✅</span>')
    .replace(/(❌)/g, '<span style="color:#e74c3c">❌</span>')
    .replace(/(⚠️)/g, '<span style="color:#f39c12">⚠️</span>')
    .replace(/(🔴)/g, '<span style="color:#e74c3c">🔴</span>')
    .replace(/(PASS)/g, '<span style="background:#1a6b3c;color:#2ecc71;border-radius:4px;padding:1px 6px;font-weight:700;font-size:11px">PASS</span>')
    .replace(/(FAIL)/g, '<span style="background:#6b1a1a;color:#e74c3c;border-radius:4px;padding:1px 6px;font-weight:700;font-size:11px">FAIL</span>')
    .replace(/QCS 2024[^\n<]*/g, '<span style="color:var(--gold);font-size:11px;font-weight:700">$&</span>')
    .replace(/\n\n/g, '</p><p style="margin:6px 0">')
    .replace(/\n/g, '<br>');
}

// ══════════════════════════════════════════════════════════════
// PHOTO INSPECTOR — runPhotoInspection()
// ══════════════════════════════════════════════════════════════

var _piPhotoData = null;
var _piPhotoMime = '';
var _piFocusType = 'concrete';

// خريطة أنواع الفحص → System Prompt تخصصي
var PI_PROMPTS = {
  concrete: `أنت مهندس جودة خبير (QC Engineer) متخصص في أعمال الخرسانة في قطر.
اعمل وفق QCS 2024 Part 5 (Concrete Works) + KAHRAMAA Standards.

افحص الصورة المرفقة بدقة تامة وأعطِ تقرير فحص ميداني احترافياً يشمل:

## 🏗️ وصف العمل المُفتَّش
[حدد نوع العمل بدقة: صب، قاعدة، عمود، جدار، بلاطة، سقف...]

## 📋 نتائج الفحص — Inspection Findings
[لكل نقطة: القيمة المرئية vs المعيار المطلوب]
- Slump Test: هل يظهر في الصورة؟ الحد: 50-150mm (QCS S5 P4 Cl.4.3)
- Cover: هل الغطاء مرئي ومناسب؟ Foundation ≥75mm، External ≥40mm، Internal ≥25mm
- Surface Finish: هل السطح متجانس بدون Honeycombing أو Cold Joints؟
- Curing: هل يظهر Curing Compound أو تبليل؟ 7 أيام minimum (QCS S5 P7)
- Formwork: هل الشدات محكمة؟ Any Bulging or Leakage؟

## ✅ / ❌ الحكم النهائي
[PASS / FAIL / REQUIRES ATTENTION]

## ⚠️ المخالفات والإجراءات الفورية
[قائمة مرقمة بكل مخالفة + الإجراء المطلوب + QCS Reference]

## 🔧 توصيات للمهندس
[إجراءات عملية ومحددة]

## 📌 مراجع QCS 2024 المستخدمة`,

  rebar: `أنت مهندس فحص تسليح متخصص (Rebar Inspector) في مشاريع قطر.
اعمل وفق QCS 2024 Part 5 Section 3 (Reinforcement) + BS 8666.

## 🔩 نوع التسليح المُفتَّش
[حدد: أساس، عمود، كمرة، بلاطة، جدار قص...]

## 📋 نتائج فحص التسليح
- Bar Diameter: الأقطار المرئية vs المطلوبة في المخطط
- Spacing: التباعد الفعلي vs المطلوب (Max: 3×h أو 400mm أيهما أصغر — QCS S5 P3 Cl.3.3)
- Cover Spacers: هل الـ Spacers موجودة وبالارتفاع الصحيح؟
- Lap Zones: هل Laps بعيدة عن نقاط الإجهاد? Tension=40d، Compression=35d
- Hooks: هل الخطافات بزاوية 135° وليس 90°؟ (QCS S5 P3 Cl.3.6)
- Contamination: هل الحديد نظيف؟ لا صدأ سائل أو شحوم أو كلوريدات

## ✅ / ❌ الحكم — PASS / FAIL / HOLD POINT
## ⚠️ المخالفات + الإجراءات الفورية
## 📌 مراجع QCS 2024`,

  road: `أنت مهندس طرق وإسفلت متخصص (Road QC Engineer) في Ashghal Qatar.
اعمل وفق QCS 2024 Section 6 + Ashghal RDM 2023.

## 🛣️ نوع العمل المُفتَّش
[حدد: Subgrade، Subbase، Base Course، Binder، Wearing Course، تعديل Crossfall...]

## 📋 نتائج فحص الطريق
- Layer Thickness: السماكة المرئية vs المطلوبة (QCS S6 P3 Table 3:1)
- Compaction: هل يظهر آثار الهرسة؟ أي Rutting أو Cracking مبكر؟
- Surface Texture: Smooth/Rough — هل يناسب نوع الطبقة؟
- Crossfall: هل الانحدار العرضي مرئي ومناسب؟ 2.5% ± 0.5%
- Joints: Longitudinal Joints — هل محكمة ومتماسكة؟
- Drainage: هل الصرف السطحي واضح وفعال؟
- Edge Details: Haunching أو Kerbs — هل مكتملة؟

## ✅ / ❌ الحكم
## ⚠️ المخالفات + الإجراءات
## 📌 QCS 2024 S6 + Ashghal ITP References`,

  utilities: `أنت مهندس شبكات مرافق (Utilities Inspector) في قطر.
اعمل وفق QCS 2024 Section 8 (Water) + Section 9 (Drainage) + Ashghal Standards.

## 🔧 نوع الشبكة المُفتَّشة
[حدد: مياه شرب، صرف صحي، صرف سطحي، كيبل كهرباء، اتصالات...]

## 📋 نتائج الفحص
- Pipe Material/Size: النوع والقطر المرئي vs المعتمد
- Bedding: هل Sand Bedding مناسب؟ الحد: 150mm under pipe (QCS S8 P3)
- Joint Quality: هل الوصلات محكمة ومتجانسة؟
- Cover Depth: عمق التغطية — Water ≥900mm، Sewer ≥1200mm (QCS)
- Gradient: هل الانحدار مرئي ومناسب? Gravity: min 1:100
- Compaction Around Pipe: تمت بالطريقة الصحيحة؟
- Protection: HDPE Warning Tape، Concrete Surround إن وجد

## ✅ / ❌ الحكم
## ⚠️ المخالفات + الإجراءات
## 📌 QCS 2024 + Ashghal References`,

  earthwork: `أنت مهندس حفر وردم متخصص (Earthworks Inspector) في قطر.
اعمل وفق QCS 2024 Section 3 (Earthworks) + Ashghal RDM.

## ⛏️ نوع العمل المُفتَّش
[حدد: Excavation، Subgrade Preparation، Fill & Compaction، Rock Breaking...]

## 📋 نتائج فحص أعمال الحفر والردم
- Excavation Level: هل تم الوصول للمستوى المطلوب؟ Tolerance: ±25mm
- Subgrade Condition: هل التربة نظيفة ومستوية؟ أي Soft Spots أو Pumping؟
- Fill Material: هل المادة خالية من debris وorganic material؟ (QCS S3 P4)
- Compaction Layers: سماكة طبقة الردم ≤200mm (QCS S3 P4 Cl.4.4)
- Moisture Content: هل التربة قريبة من OMC؟ ±2% من OMC
- Slopes: انحدار جوانب الحفر — مناسب لنوع التربة؟

## ✅ / ❌ الحكم
## ⚠️ المخالفات + الإجراءات
## 📌 QCS 2024 Section 3 References`,

  formwork: `أنت مهندس متخصص في فحص الشدات (Formwork Inspector) في قطر.
اعمل وفق QCS 2024 Part 5 Section 8 (Formwork) + BS 5975.

## 🪵 نوع الشدة المُفتَّشة
[حدد: شدة أعمدة، كمرات، بلاطات، جدران، أساسات...]

## 📋 نتائج فحص الشدات
- Alignment: هل الشدة مستقيمة ورأسية؟ Tolerance: ±6mm per 3m (QCS S5 P8)
- Stability: هل الدعامات (Props/Soldiers) كافية ومتباعدة بشكل صحيح؟
- Joints/Sealing: هل الوصلات محكمة لمنع تسرب الخرسانة؟
- Release Agent: هل تم رش Oil/Release Agent؟
- Cleaning: هل الشدة نظيفة من قش وأوساخ قبل الصب؟
- Camber: للكمرات الطويلة — هل يوجد Pre-camber مناسب؟
- Loads: هل الشدة مصممة للحمل الفعلي؟ 25 kN/m³ للخرسانة

## ✅ / ❌ الحكم
## ⚠️ المخالفات + الإجراءات
## 📌 QCS 2024 + BS 5975 References`
};

window.piSelectFocus = function(type, btn) {
  _piFocusType = type;
  // إزالة active من الكل
  document.querySelectorAll('.pi-focus-opt').forEach(function(b) {
    b.style.border = b.style.border.replace('solid', 'dashed');
    b.style.opacity = '0.7';
  });
  // تفعيل المحدد
  btn.style.border = btn.style.border.replace('dashed', 'solid');
  btn.style.opacity = '1';
};

window.piLoadPhoto = function(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 10 * 1024 * 1024) { _vfToast('❌ الصورة أكبر من 10MB', 'error'); return; }
  if (!file.type.startsWith('image/')) { _vfToast('❌ ملف غير مدعوم — صور فقط', 'error'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    _piPhotoData = e.target.result.split(',')[1];
    _piPhotoMime = file.type;
    var img = document.getElementById('pi-preview-img');
    var wrap = document.getElementById('pi-preview-wrap');
    var lbl = document.getElementById('pi-file-label');
    var zone = document.getElementById('pi-drop-zone');
    var btn = document.getElementById('pi-inspect-btn');
    if (img) img.src = e.target.result;
    if (wrap) wrap.style.display = 'block';
    if (zone) zone.style.display = 'none';
    if (lbl) lbl.textContent = '📎 ' + file.name + ' (' + (file.size / 1024).toFixed(0) + ' KB)';
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
    _vfToast('✅ تم رفع الصورة — اضغط فحص');
  };
  reader.readAsDataURL(file);
};

window.piHandleDropZone = function(e) {
  e.preventDefault();
  var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) { var dt = new DataTransfer(); dt.items.add(file); var inp = document.getElementById('pi-img-input'); if(inp){inp.files=dt.files; window.piLoadPhoto(inp);} }
};

window.piResetPhoto = function() {
  _piPhotoData = null;
  _piPhotoMime = '';
  var inp = document.getElementById('pi-img-input');
  var wrap = document.getElementById('pi-preview-wrap');
  var zone = document.getElementById('pi-drop-zone');
  var res = document.getElementById('pi-result');
  var btn = document.getElementById('pi-inspect-btn');
  if (inp) inp.value = '';
  if (wrap) wrap.style.display = 'none';
  if (zone) zone.style.display = 'block';
  if (res) res.innerHTML = '';
  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
};

window.runPhotoInspection = async function() {
  if (!_piPhotoData) { _vfToast('❌ ارفع صورة أولاً', 'error'); return; }

  var btn = document.getElementById('pi-inspect-btn');
  var loading = document.getElementById('pi-loading');
  var result = document.getElementById('pi-result');
  var notes = (document.getElementById('pi-notes') || {}).value || '';

  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
  if (loading) loading.style.display = 'block';
  if (result) result.innerHTML = '';

  var focusNames = { concrete:'خرسانة', rebar:'تسليح', road:'طرق وإسفلت', utilities:'شبكات مرافق', earthwork:'حفر وردم', formwork:'شدات' };
  var systemPrompt = PI_PROMPTS[_piFocusType] || PI_PROMPTS.concrete;
  var userMsg = 'افحص هذه الصورة من الموقع — نوع الفحص: ' + (focusNames[_piFocusType] || _piFocusType);
  if (notes) userMsg += '\nملاحظة المهندس: ' + notes;
  userMsg += '\n\nأعطِ تقرير فحص شامل ومفصّل وفق QCS 2024.';

  try {
    var res = await fetch('/api/vision-proxy', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'inspector',
        image: _piPhotoData,
        mimeType: _piPhotoMime || 'image/jpeg',
        userMessage: systemPrompt + '\n\n' + userMsg
      })
    });

    var data = await res.json();
    if (loading) loading.style.display = 'none';

    if (!res.ok || data.error) {
      if (result) result.innerHTML = '<div style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:14px;color:#e74c3c">' +
        '❌ ' + _escHtml(data.error || 'خطأ في الاتصال — تحقق من الاتصال وحاول مجدداً') +
        (data.code === 'PRO_REQUIRED' ? '<br><br><button onclick="showUpgradePrompt(\'photo_analyzer\',\'📸\',\'المفتش الذكي — Pro فقط\',\'ارقَ للـ Pro للحصول على فحص ذكي غير محدود\')" style="background:var(--gold);color:#000;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-weight:700;margin-top:8px">🚀 ارقَ لـ Pro</button>' : '') +
        '</div>';
      return;
    }

    // عرض النتيجة
    var raw = _escHtml(data.result || '');
    var html = _renderMd(raw);
    var focusColor = { concrete:'#3498db', rebar:'var(--gold)', road:'#2ecc71', utilities:'#9b59b6', earthwork:'#e67e22', formwork:'#e74c3c' };
    var col = focusColor[_piFocusType] || '#2ecc71';
    var isPass = data.result.includes('PASS') && !data.result.includes('FAIL');
    var verdict = data.result.includes('FAIL') ? '❌ FAIL' : data.result.includes('PASS') ? '✅ PASS' : '⚠️ يحتاج مراجعة';

    if (result) result.innerHTML =
      '<div style="background:rgba(46,204,113,.06);border:1px solid rgba(46,204,113,.25);border-radius:14px;padding:16px">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid rgba(46,204,113,.2)">' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            '<span style="background:' + col + ';color:#000;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:800">SITE INSPECTION</span>' +
            '<span style="font-size:12px;color:' + col + ';font-weight:700">' + (focusNames[_piFocusType] || '') + '</span>' +
          '</div>' +
          '<div style="font-size:13px;font-weight:800">' + verdict + '</div>' +
        '</div>' +
        '<div style="font-size:13px;line-height:2;color:var(--text)">' + html + '</div>' +
        '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
          '<button onclick="piCopyResult()" style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:7px 14px;font-size:12px;color:var(--text2);cursor:pointer">📋 نسخ التقرير</button>' +
          '<button onclick="piPrintResult()" style="background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);border-radius:8px;padding:7px 14px;font-size:12px;color:#2ecc71;cursor:pointer">🖨️ طباعة / PDF</button>' +
          '<button onclick="piResetPhoto()" style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:7px 14px;font-size:12px;color:#e74c3c;cursor:pointer">📸 صورة جديدة</button>' +
        '</div>' +
        '<div style="margin-top:10px;font-size:11px;color:var(--text3)">📖 QCS 2024 | هذا التقرير مساعد — القرار النهائي للمهندس المختص</div>' +
      '</div>';

  } catch (err) {
    if (loading) loading.style.display = 'none';
    if (result) result.innerHTML = '<div style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:12px;color:#e74c3c">❌ خطأ في الاتصال: ' + _escHtml(err.message) + '</div>';
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
};

window.piCopyResult = function() {
  var el = document.getElementById('pi-result');
  if (el) navigator.clipboard.writeText(el.innerText).then(function(){ _vfToast('✅ تم نسخ التقرير'); });
};

window.piPrintResult = function() {
  var res = document.getElementById('pi-result');
  if (!res) return;
  var w = window.open('', '_blank');
  w.document.write('<html><head><meta charset="UTF-8"><title>تقرير فحص ميداني — QatarSpec</title><style>');
  w.document.write('body{font-family:Arial,sans-serif;direction:rtl;padding:24px;max-width:800px;margin:0 auto;color:#222}');
  w.document.write('h3{color:#1a5276;border-bottom:2px solid #c9a84c;padding-bottom:6px} h4{color:#7a1515}');
  w.document.write('.header{background:#7a1515;color:#fff;padding:16px;border-radius:8px;margin-bottom:20px}');
  w.document.write('</style></head><body>');
  w.document.write('<div class="header"><h1 style="margin:0;font-size:18px">🇶🇦 QatarSpec Pro — تقرير فحص ميداني</h1>');
  w.document.write('<p style="margin:6px 0 0;font-size:12px">التاريخ: ' + new Date().toLocaleDateString('ar-QA') + ' | المرجع: QCS 2024</p></div>');
  w.document.write(res.innerHTML);
  w.document.write('</body></html>');
  w.document.close();
  setTimeout(function(){ w.print(); }, 800);
};


// ══════════════════════════════════════════════════════════════
// DOC ANALYZER — runDocAnalysis() [إعادة كتابة كاملة]
// ══════════════════════════════════════════════════════════════

// تخزين الملف المرفوع للتحليل
var _docAnalysisFile = null;

// مراقبة رفع الملفات لتحديد ملف التحليل الرئيسي
(function patchDocUpload() {
  var _orig = window.handleDocUpload;
  window.handleDocUpload = function(input, category) {
    if (_orig) _orig(input, category);
    // حفظ أول ملف كملف رئيسي للتحليل البصري
    if (input.files && input.files[0] && !_docAnalysisFile) {
      var file = input.files[0];
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        var reader = new FileReader();
        reader.onload = function(e) {
          _docAnalysisFile = { data: e.target.result.split(',')[1], type: file.type, name: file.name };
        };
        reader.readAsDataURL(file);
      }
    }
  };
})();

// إعادة كتابة runDocAnalysis لاستخدام vision-proxy إذا وُجد ملف بصري
// وإلا ai-proxy بسياق نصي
(function patchRunDocAnalysis() {
  window.runDocAnalysis = async function() {
    // Pro check
    if (typeof window.isProUser === 'function' && !window.isProUser()) {
      if (typeof window.showUpgradePrompt === 'function')
        window.showUpgradePrompt('doc_analyzer','🤖','محلل المستندات الذكي — Pro فقط','تحليل المواصفات والعقود والرسومات باستخدام AI متاح للمشتركين Pro فقط.');
      return;
    }

    var resultEl = document.getElementById('doc-ai-result') || document.getElementById('doc-ai-result-en');
    if (!resultEl) return;

    // جمع بيانات النموذج
    var projTypeEl = document.getElementById('doc-project-type') || document.getElementById('doc-project-type-en');
    var projType = projTypeEl ? projTypeEl.value : 'mixed';
    var doITP   = !!(document.getElementById('da-itp')   || document.getElementById('da-itp-en')  )?.checked;
    var doTests = !!(document.getElementById('da-tests') || document.getElementById('da-tests-en'))?.checked;
    var doNCR   = !!(document.getElementById('da-ncr')   || document.getElementById('da-ncr-en')  )?.checked;
    var doQty   = !!(document.getElementById('da-qty')   || document.getElementById('da-qty-en')  )?.checked;

    // الملفات المرفوعة
    var fileNames = [];
    if (typeof window.docUploaded === 'object') {
      Object.entries(window.docUploaded).forEach(function(e) {
        (e[1] || []).forEach(function(f){ fileNames.push(e[0] + ': ' + f.name); });
      });
    }
    if (fileNames.length === 0 && !_docAnalysisFile) {
      resultEl.innerHTML = '<div style="color:#e74c3c;padding:10px;font-size:13px">⚠️ ارفع وثيقة أولاً</div>';
      return;
    }

    // عرض loading
    resultEl.innerHTML = '<div style="padding:16px;text-align:center"><div style="font-size:28px;margin-bottom:8px">⚡</div>' +
      '<div style="color:var(--gold);font-size:13px">جاري التحليل الذكي...</div>' +
      '<div class="spinner" style="width:24px;height:24px;border:3px solid rgba(201,168,76,.2);border-top:3px solid var(--gold);border-radius:50%;animation:spin .8s linear infinite;margin:12px auto 0"></div></div>';

    var projNames = { roads:'أعمال الطرق والبنية التحتية', building:'مباني وإنشاءات', utilities:'شبكات المرافق', mixed:'مشروع متكامل' };

    try {
      var data;

      if (_docAnalysisFile) {
        // ── تحليل بصري فعلي للملف ──────────────────────────────
        var docPrompt = 'أنت مهندس استشاري خبير في تحليل وثائق المشاريع في قطر وفق QCS 2024.\n' +
          'نوع المشروع: ' + (projNames[projType] || projType) + '\n\n' +
          'حلّل هذه الوثيقة/الرسم وأعطِ تقريراً شاملاً يتضمن:\n\n' +
          (doITP ? '## 📋 Hold Points & Witness Points\n[استخرج كل Hold Point و Witness Point مع الـ QCS Clause]\n\n' : '') +
          (doTests ? '## 🔬 متطلبات الاختبارات\n[الاختبار + التكرار + معيار القبول + QCS Reference]\n\n' : '') +
          (doNCR ? '## ⚠️ نقاط عدم المطابقة المحتملة (NCR Risk)\n[كل بند قد يُشكّل NCR مع السبب والمرجع]\n\n' : '') +
          (doQty ? '## 📊 تحليل الكميات\n[الكميات الرئيسية وعتبات الاختبار الإضافية]\n\n' : '') +
          '## 📌 ملاحظات ومخالفات\n[أي تعارض مع QCS 2024 أو Ashghal Standards]\n\n' +
          '## ✅ الملاحظات الإيجابية\n[نقاط القوة في الوثيقة]\n\n' +
          'أذكر دائماً: Part / Section / Clause من QCS 2024. الرد بالعربية مع المصطلحات الإنجليزية.';

        var res = await fetch('/api/vision-proxy', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'analyzer',
            image: _docAnalysisFile.data,
            mimeType: _docAnalysisFile.type,
            userMessage: docPrompt
          })
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'خطأ في الاتصال');
        data = { result: data.result };

      } else {
        // ── تحليل نصي بأسماء الملفات فقط ──────────────────────
        var textPrompt = 'أنت مهندس استشاري خبير في مشاريع قطر وفق QCS 2024.\n' +
          'المشروع: ' + (projNames[projType] || projType) + '\n' +
          'الوثائق المرفوعة: ' + fileNames.join(', ') + '\n\n' +
          'بناءً على هذه الوثائق ونوع المشروع، أعطِ:\n' +
          (doITP ? '## 📋 Hold Points & Witness Points الرئيسية\n' : '') +
          (doTests ? '## 🔬 الاختبارات المطلوبة والتكرار\n' : '') +
          (doNCR ? '## ⚠️ نقاط عدم المطابقة الشائعة لهذا النوع\n' : '') +
          (doQty ? '## 📊 عتبات الكميات المحفّزة للاختبار\n' : '') +
          '\nاذكر QCS Part/Section/Clause لكل بند. الرد بالعربية.';

        var aiRes = await fetch('/api/ai-proxy', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userMessage: textPrompt,
            systemPrompt: 'أنت مهندس QCS 2024 متخصص. أجب بدقة وبالمراجع الصحيحة.',
            isPro: true
          })
        });
        var aiData = await aiRes.json();
        if (!aiRes.ok) throw new Error(aiData.error || 'خطأ في الاتصال');
        data = { result: aiData.result || aiData.response || aiData.text || JSON.stringify(aiData) };
      }

      // عرض النتيجة
      var raw = _escHtml(data.result || '');
      var html = _renderMd(raw);

      resultEl.innerHTML =
        '<div style="background:rgba(52,152,219,.06);border:1px solid rgba(52,152,219,.25);border-radius:14px;padding:16px;margin-top:10px">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid rgba(52,152,219,.2)">' +
            '<div style="display:flex;align-items:center;gap:8px">' +
              '<span style="background:#3498db;color:#fff;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:800">AI ANALYSIS</span>' +
              '<span style="font-size:12px;color:#3498db;font-weight:700">' + (projNames[projType] || projType) + '</span>' +
            '</div>' +
            '<button onclick="(function(){var e=document.getElementById(\'doc-ai-result\')||document.getElementById(\'doc-ai-result-en\');if(e)navigator.clipboard.writeText(e.innerText).then(function(){if(window.showToast)showToast(\'✅ تم النسخ\');})})()" style="background:var(--dark4);border:1px solid var(--border);border-radius:6px;padding:5px 12px;font-size:11px;color:var(--text2);cursor:pointer">📋 نسخ</button>' +
          '</div>' +
          '<div style="font-size:13px;line-height:2;color:var(--text)">' + html + '</div>' +
          '<div style="margin-top:10px;font-size:11px;color:var(--text3)">📖 QCS 2024 | التحليل مساعد — القرار النهائي للمهندس المختص</div>' +
        '</div>';

    } catch (err) {
      resultEl.innerHTML = '<div style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:12px;color:#e74c3c;font-size:13px">' +
        '❌ ' + _escHtml(err.message || 'خطأ في الاتصال') + '</div>';
    }
  };
})();
