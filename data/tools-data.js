// QatarSpec Pro — tools data chunk v1.7.7
window._qspMerge = window._qspMerge || function(obj) {
  if (typeof detailData !== 'undefined') {
    Object.assign(detailData, obj);
  } else {
    // detailData not ready yet - queue it
    window._qspQueue = window._qspQueue || [];
    window._qspQueue.push(obj);
  }
};
_qspMerge({
doc_analyzer: { title: '📁 Document Analyzer — Upload Specs, Drawings & BOQ', content: `
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 Upload your project documents → AI analyzes and assists with QC, compliance and quantities
</div>

<div class="lang-content-ar">
<h3>📁 رفع وتحليل وثائق المشروع</h3>
<p style="font-size:12px;color:var(--text3);">ارفع مواصفاتك ورسوماتك وجداول كمياتك — التطبيق يحللها ويساعدك في متطلبات الجودة والمطابقة</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
<div onclick="document.getElementById('doc-upload-specs').click()" style="background:rgba(201,168,76,0.06);border:2px dashed rgba(201,168,76,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">📋</div>
<div style="color:var(--gold);font-weight:700;font-size:13px;">المواصفات الخاصة</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Project Specifications PDF</div>
<input type="file" id="doc-upload-specs" style="display:none" accept=".pdf,.docx" multiple onchange="handleDocUpload(this,'specs')">
</div>
<div onclick="document.getElementById('doc-upload-dwg').click()" style="background:rgba(52,152,219,0.06);border:2px dashed rgba(52,152,219,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">📐</div>
<div style="color:#3498db;font-weight:700;font-size:13px;">الرسومات</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">IFC / Shop Drawings PDF</div>
<input type="file" id="doc-upload-dwg" style="display:none" accept=".pdf" multiple onchange="handleDocUpload(this,'drawings')">
</div>
<div onclick="document.getElementById('doc-upload-boq').click()" style="background:rgba(46,204,113,0.06);border:2px dashed rgba(46,204,113,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">📊</div>
<div style="color:#2ecc71;font-weight:700;font-size:13px;">جدول الكميات</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">BOQ / Bill of Quantities</div>
<input type="file" id="doc-upload-boq" style="display:none" accept=".pdf,.xlsx,.xls,.csv" onchange="handleDocUpload(this,'boq')">
</div>
<div onclick="document.getElementById('doc-upload-gi').click()" style="background:rgba(155,89,182,0.06);border:2px dashed rgba(155,89,182,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">🔬</div>
<div style="color:#9b59b6;font-weight:700;font-size:13px;">تقرير الجسات</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Geotechnical Investigation Report</div>
<input type="file" id="doc-upload-gi" style="display:none" accept=".pdf" onchange="handleDocUpload(this,'gi')">
</div>
</div>

<div id="doc-files-list" style="margin:10px 0;"></div>

<div id="doc-analysis-panel" style="display:none;background:var(--dark4);border-radius:12px;padding:14px;margin-top:10px;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
<div style="color:var(--gold);font-weight:700;font-size:14px;">🤖 تحليل الوثائق</div>
<button onclick="runDocAnalysis()" style="background:linear-gradient(135deg,#7a1515,#c9a84c);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-family:Tajawal,sans-serif;cursor:pointer;font-size:12px;">⚡ تحليل الآن</button>
</div>
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">نوع المشروع:</label>
<select id="doc-project-type" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
<option value="roads">أعمال الطرق والبنية التحتية</option>
<option value="building">مباني وإنشاءات</option>
<option value="utilities">شبكات المرافق</option>
<option value="mixed">مشروع متكامل (طرق + مرافق + إنشاء)</option>
</select>
</div>
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">ما الذي تريد تحليله؟</label>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-itp" checked> إنشاء ITP</label>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-tests"> متطلبات الاختبارات</label>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-ncr"> نقاط عدم المطابقة</label>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-qty"> تحليل الكميات</label>
</div>
</div>
</div>

<div id="doc-ai-result" style="margin-top:10px;"></div>
</div>

<div class="lang-content-en" style="display:none;">
<h3>📁 Project Document Upload & Analysis</h3>
<p style="font-size:12px;color:var(--text3);">Upload your specifications, drawings and BOQ — the app analyzes them and assists with QC, compliance and quantity checks</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
<div onclick="document.getElementById('doc-upload-specs-en').click()" style="background:rgba(201,168,76,0.06);border:2px dashed rgba(201,168,76,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">📋</div>
<div style="color:var(--gold);font-weight:700;font-size:13px;">Project Specifications</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">PDF / DOCX</div>
<input type="file" id="doc-upload-specs-en" style="display:none" accept=".pdf,.docx" multiple onchange="handleDocUpload(this,'specs')">
</div>
<div onclick="document.getElementById('doc-upload-dwg-en').click()" style="background:rgba(52,152,219,0.06);border:2px dashed rgba(52,152,219,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">📐</div>
<div style="color:#3498db;font-weight:700;font-size:13px;">Drawings (IFC/Shop)</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">PDF</div>
<input type="file" id="doc-upload-dwg-en" style="display:none" accept=".pdf" multiple onchange="handleDocUpload(this,'drawings')">
</div>
<div onclick="document.getElementById('doc-upload-boq-en').click()" style="background:rgba(46,204,113,0.06);border:2px dashed rgba(46,204,113,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">📊</div>
<div style="color:#2ecc71;font-weight:700;font-size:13px;">Bill of Quantities (BOQ)</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">PDF / Excel / CSV</div>
<input type="file" id="doc-upload-boq-en" style="display:none" accept=".pdf,.xlsx,.xls,.csv" onchange="handleDocUpload(this,'boq')">
</div>
<div onclick="document.getElementById('doc-upload-gi-en').click()" style="background:rgba(155,89,182,0.06);border:2px dashed rgba(155,89,182,0.4);border-radius:12px;padding:16px;cursor:pointer;text-align:center;">
<div style="font-size:28px;margin-bottom:6px;">🔬</div>
<div style="color:#9b59b6;font-weight:700;font-size:13px;">GI Report</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Geotechnical Report PDF</div>
<input type="file" id="doc-upload-gi-en" style="display:none" accept=".pdf" onchange="handleDocUpload(this,'gi')">
</div>
</div>

<div id="doc-files-list-en" style="margin:10px 0;"></div>

<div style="background:var(--dark4);border-radius:12px;padding:14px;margin-top:10px;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
<div style="color:var(--gold);font-weight:700;font-size:14px;">🤖 AI Document Analysis</div>
<button onclick="runDocAnalysis()" style="background:linear-gradient(135deg,#7a1515,#c9a84c);color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:12px;">⚡ Analyze Now</button>
</div>
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">Project Type:</label>
<select id="doc-project-type-en" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
<option value="roads">Road & Infrastructure Works</option>
<option value="building">Buildings & Structures</option>
<option value="utilities">Utility Networks</option>
<option value="mixed">Mixed Project (Roads + Utilities + Structures)</option>
</select>
</div>
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">What to Analyze?</label>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-itp-en" checked> Generate ITP</label>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-tests-en"> Test Requirements</label>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-ncr-en"> NCR Risk Points</label>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;"><input type="checkbox" id="da-qty-en"> Quantity Analysis</label>
</div>
</div>
</div>
<div id="doc-ai-result-en" style="margin-top:10px;"></div>
</div>
` },
drawing_analyzer: {
title: '📐 محلل المخططات الذكي — Drawing Analyzer',
content: `
<div class="qcs-ref-badge">QCS 2024 — تحليل ذكي متخصص في المخططات الإنشائية</div>

<!-- نوع المخطط -->
<div style="margin-bottom:14px">
<div style="font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:700;letter-spacing:1px">① اختر نوع المخطط</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<div class="da-type-btn active-type" onclick="selectDaType('structural',this)" style="background:rgba(201,168,76,.1);border:2px solid rgba(201,168,76,.4);border-radius:10px;padding:12px;cursor:pointer;text-align:center;transition:.2s">
<div style="font-size:22px">🏗️</div>
<div style="color:var(--gold);font-weight:700;font-size:12px;margin-top:4px">مخطط إنشائي</div>
<div style="color:var(--text3);font-size:10px">Cover · Rebar · Lap Zones</div>
</div>
<div class="da-type-btn" onclick="selectDaType('road',this)" style="background:rgba(52,152,219,.06);border:2px dashed rgba(52,152,219,.3);border-radius:10px;padding:12px;cursor:pointer;text-align:center;transition:.2s">
<div style="font-size:22px">🛣️</div>
<div style="color:#3498db;font-weight:700;font-size:12px;margin-top:4px">مقطع طريق</div>
<div style="color:var(--text3);font-size:10px">Layer · Slope · Width</div>
</div>
<div class="da-type-btn" onclick="selectDaType('itp',this)" style="background:rgba(46,204,113,.06);border:2px dashed rgba(46,204,113,.3);border-radius:10px;padding:12px;cursor:pointer;text-align:center;transition:.2s">
<div style="font-size:22px">📋</div>
<div style="color:#2ecc71;font-weight:700;font-size:12px;margin-top:4px">نموذج ITP</div>
<div style="color:var(--text3);font-size:10px">Hold Points · Witness Points</div>
</div>
<div class="da-type-btn" onclick="selectDaType('shop',this)" style="background:rgba(155,89,182,.06);border:2px dashed rgba(155,89,182,.3);border-radius:10px;padding:12px;cursor:pointer;text-align:center;transition:.2s">
<div style="font-size:22px">🔧</div>
<div style="color:#9b59b6;font-weight:700;font-size:12px;margin-top:4px">Shop Drawing</div>
<div style="color:var(--text3);font-size:10px">QCS Requirements Check</div>
</div>
</div>
</div>

<!-- رفع المخطط -->
<div style="margin-bottom:14px">
<div style="font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:700;letter-spacing:1px">② ارفع المخطط</div>
<div onclick="document.getElementById('da-img-input').click()" id="da-upload-zone" style="background:rgba(201,168,76,.04);border:2px dashed rgba(201,168,76,.3);border-radius:12px;padding:20px;text-align:center;cursor:pointer;transition:.3s">
<div style="font-size:36px;margin-bottom:8px">📐</div>
<div style="color:var(--gold);font-weight:700;font-size:13px">اسحب المخطط هنا أو اضغط للرفع</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px">PNG · JPG · PDF (صورة أو screenshot) — حتى 10MB</div>
<input type="file" id="da-img-input" accept="image/*,.pdf" style="display:none" onchange="handleDaUpload(this)">
</div>
<div id="da-preview-wrap" style="display:none;margin-top:10px;text-align:center">
<img id="da-preview-img" style="max-width:100%;max-height:220px;border-radius:10px;border:1px solid var(--border2)">
<div style="font-size:11px;color:var(--text3);margin-top:4px" id="da-file-name"></div>
</div>
</div>

<!-- ملاحظات إضافية -->
<div style="margin-bottom:14px">
<div style="font-size:12px;color:var(--text3);margin-bottom:6px;font-weight:700;letter-spacing:1px">③ ملاحظات إضافية (اختياري)</div>
<textarea id="da-notes" placeholder="مثال: هذا مخطط قاعدة معزولة Grade C40, Cover 75mm, رقم المبنى B-03..." style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:10px;padding:10px;font-family:Tajawal,sans-serif;font-size:13px;color:var(--text);resize:vertical;min-height:64px;outline:none"></textarea>
</div>

<!-- زر التحليل -->
<button onclick="runDrawingAnalysis()" id="da-analyze-btn" style="width:100%;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,.4);border-radius:12px;padding:14px;color:var(--gold2);font-family:Cairo,sans-serif;font-weight:800;font-size:15px;cursor:pointer;margin-bottom:14px;letter-spacing:.5px">
🔍 تحليل المخطط — Analyze Drawing
</button>

<!-- منطقة التحميل والنتيجة -->
<div id="da-loading" style="display:none;text-align:center;padding:20px">
<div style="font-size:32px;margin-bottom:10px">⚡</div>
<div class="spinner" style="width:24px;height:24px;border:3px solid rgba(201,168,76,.2);border-top:3px solid var(--gold);border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 10px"></div>
<div style="color:var(--gold);font-size:13px">جاري تحليل المخطط بالذكاء الاصطناعي...</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px">فحص مقارنة QCS 2024</div>
</div>
<div id="da-result" style="margin-top:4px"></div>
`},
calculator: { title: '🧮 حاسبة المواصفات — Pass / Fail', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 | Dual Calculator — جدول الاختبارات + التحقق من النتائج
</div>

<!-- TAB SWITCHER -->
<div style="display:flex;gap:0;margin-bottom:14px;border-radius:10px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);">
<button id="calc-tab-freq" onclick="switchCalcMode('freq',this)" style="flex:1;padding:10px;border:none;background:rgba(201,168,76,0.2);color:var(--gold);font-weight:700;font-size:12px;cursor:pointer;font-family:Tajawal,sans-serif;">
🗓️ جدول الاختبارات<br><span style="font-size:10px;font-weight:400;">Tests by Quantity</span></button>
<button id="calc-tab-pass" onclick="switchCalcMode('pass',this)" style="flex:1;padding:10px;border:none;background:var(--dark4);color:var(--text2);font-size:12px;cursor:pointer;font-family:Tajawal,sans-serif;">
✅ نتيجة الاختبار<br><span style="font-size:10px;">Pass / Fail Check</span></button>
</div>

<!-- MODE 1: Testing Frequency -->
<div id="calc-freq-panel">
<p style="font-size:11px;color:var(--text3);margin-bottom:10px;">أدخل الكمية المورّدة → الحاسبة تحدد الاختبارات المطلوبة والتكرار الإلزامي حسب QCS 2024</p>
<div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">نوع المادة / Layer Type:</label>
<select id="ts-mat" onchange="calcFreq()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;font-size:12px;">
<option value="">-- اختر --</option>
<option value="subgrade">Subgrade Soil</option>
<option value="subbase">Subbase Course</option>
<option value="base">Road Base Course</option>
<option value="asphalt_bc">Asphalt — Binder Course (BC)</option>
<option value="asphalt_wc">Asphalt — Wearing Course (WC)</option>
<option value="concrete">Concrete (خرسانة)</option>
<option value="water_pipe">Water Supply Pipe</option>
<option value="sewer_pipe">Foul Sewer Pipe</option>
<option value="rebar">Reinforcement Steel</option>
</select>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
<div>
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الكمية / Quantity:</label>
<input type="number" id="ts-qty" placeholder="e.g. 300" oninput="calcFreq()" min="1" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
</div>
<div>
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الوحدة / Unit:</label>
<select id="ts-unit" onchange="calcFreq()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
<option value="m3">m³</option><option value="m2">m²</option>
<option value="ton">tonne</option><option value="lm">LM</option>
</select>
</div>
</div>
</div>
<div id="ts-result-box" style="display:none;"></div>
</div>

<!-- MODE 2: Pass/Fail Check -->
<div id="calc-pass-panel" style="display:none;">
<p style="font-size:11px;color:var(--text3);margin-bottom:10px;">أدخل نتيجة الاختبار → Pass ✅ أو Fail ❌ فوراً حسب QCS 2024</p>

<!-- Main tabs: Roads / Utilities / Structural / Geotech -->
<div style="display:flex;gap:4px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px;">
<button onclick="switchMainCat('roads',this)" id="main-tab-roads" style="flex:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(201,168,76,0.3);background:rgba(201,168,76,0.15);color:var(--gold2);font-family:Tajawal,sans-serif;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">🛣️ Roads</button>
<button onclick="switchMainCat('utilities',this)" id="main-tab-utilities" style="flex:none;padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text2);font-family:Tajawal,sans-serif;font-size:12px;cursor:pointer;white-space:nowrap;">🔧 Utilities</button>
<button onclick="switchMainCat('structural',this)" id="main-tab-structural" style="flex:none;padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text2);font-family:Tajawal,sans-serif;font-size:12px;cursor:pointer;white-space:nowrap;">🏗️ Structural</button>
<button onclick="switchMainCat('geotech_calc',this)" id="main-tab-geotech_calc" style="flex:none;padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text2);font-family:Tajawal,sans-serif;font-size:12px;cursor:pointer;white-space:nowrap;">🔬 Geotech</button>
</div>

<div id="cat-roads" style="display:block;"></div>
<div id="cat-utilities" style="display:none;"></div>
<div id="cat-structural" style="display:none;"></div>
<div id="cat-geotech_calc" style="display:none;"></div>
</div>
` },
geotech: { title: '🔬 الجسات والتربة', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">أعمال الجسات والفحوصات الجيوتقنية</span>
</div>
<button onclick="document.getElementById('vid-geotech').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-geotech" accept="video/*" style="display:none" data-player="vid-player-geotech" data-ph="vid-placeholder-geotech" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-placeholder-geotech" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">حفر آبار الجسات، SPT، أخذ العينات، التقرير الجيوتقني</div>
<div style="font-size:11px;color:var(--text3);">اضغط "رفع فيديو" لتحميل ملف MP4</div>
</div>
<div id="vid-player-geotech" class="qs-vid-ph" data-maxh="280px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Geotechnical Investigation</div>
<h3>📋 نظرة عامة</h3>
<p>الجسات في قطر ضرورة قبل أي مشروع. التربة القطرية متنوعة — Sabkha، رمل، صخر جيري، ومياه جوفية عالية الكبريتات. تقرير الجسات يحدد نوع الأساس ومتطلبات الConcrete.</p>
<h3>📌 اختر القسم</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('geo_planning')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التخطيط</div><div style="color:var(--text3);font-size:11px;">Scope & Grid</div></div>
<div onclick="QS.openDetail('geo_borehole')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🕳️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Boreholes</div><div style="color:var(--text3);font-size:11px;">الحفر والتسجيل</div></div>
<div onclick="QS.openDetail('geo_spt')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔨</div><div style="color:var(--gold);font-weight:700;font-size:13px;">SPT Test</div><div style="color:var(--text3);font-size:11px;">Standard Penetration</div></div>
<div onclick="QS.openDetail('geo_lab')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">اختبارات المختبر</div><div style="color:var(--text3);font-size:11px;">Lab Tests</div></div>
<div onclick="QS.openDetail('geo_water')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">💧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">المياه الجوفية</div><div style="color:var(--text3);font-size:11px;">Groundwater</div></div>
<div onclick="QS.openDetail('geo_report')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📋</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التقرير النهائي</div><div style="color:var(--text3);font-size:11px;">GI Report</div></div>
</div>
<div style="margin-top:12px;"><div onclick="QS.openDetail('itp_geotech')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP الجسات الكامل</div></div></div>
<h3>📐 متطلبات قطر العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>عدد Boreholes</td><td>BH كل 25m للمباني / كل 50m للطرق</td><td>QCS S2</td></tr>
<tr><td>عمق BH — مباني</td><td>عمق الأساس + 1.5 × عرض الأساس أو 10m</td><td>QCS S2</td></tr>
<tr><td>عمق BH — طرق</td><td>3-5m من مستوى الأساس</td><td>QCS S2</td></tr>
<tr><td>SPT كل</td><td>1.5m أو عند تغيير الطبقة</td><td>BS EN ISO 22476-3</td></tr>
<tr><td>عينات Undisturbed</td><td>كل 2m في الطبقات الطينية</td><td>QCS S2</td></tr>
<tr><td>اختبارات كيميائية</td><td>Sulphate + Chloride + pH</td><td>QCS S2</td></tr>
<tr><td>مياه جوفية</td><td>قياس المستوى في كل BH</td><td>QCS S2</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,70,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">Geotechnical Investigation & Boreholes</span>
</div>
<button onclick="document.getElementById('vid-geotech-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-geotech-en" accept="video/*" style="display:none" data-player="vid-player-geotech-en" data-ph="vid-placeholder-geotech-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-placeholder-geotech-en" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">Borehole drilling, SPT, sampling, GI report</div>
<div style="font-size:11px;">Click "Upload Video" to load MP4 file</div>
</div>
<div id="vid-player-geotech-en" class="qs-vid-ph" data-maxh="280px"></div>
</div>

<h3>🔬 Geotechnical Investigation — QCS 2024 Section 2</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Borehole Spacing</td><td>15-25m buildings / 50-100m roads</td></tr>
<tr><td>SPT Frequency</td><td>Every 1.5m or at stratum change</td></tr>
<tr><td>Sulphate SO3</td><td>Critical in Qatar — Class 1-5</td></tr>
<tr><td>Chloride</td><td>Coastal areas may reach seawater levels</td></tr>
<tr><td>GWT Measurement</td><td>At encounter + 24hr after completion</td></tr>
<tr><td>GI Report</td><td>Must include cement type recommendation</td></tr>
</table>
</div>
` },
geo_planning: { title: '📐 الجسات — التخطيط والنطاق', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Planning</div>
<h3>📐 شبكة Boreholes</h3>
<table class="dm-table"><tr><th>نوع المشروع</th><th>المسافة بين BH</th><th>الحد الأدنى</th></tr>
<tr><td>مبنى سكني صغير</td><td>15-25m</td><td>3 BH</td></tr>
<tr><td>مبنى تجاري / برج</td><td>15-20m</td><td>4 BH في الزوايا + 1 وسط</td></tr>
<tr><td>طريق</td><td>كل 50-100m</td><td>BH كل 50m للطرق الرئيسية</td></tr>
<tr><td>خطوط مرافق</td><td>كل 100m</td><td>BH + Trial Pit</td></tr>
<tr><td>جسر / منشأة بحرية</td><td>حسب العدد وأحواض الدعم</td><td>BH عند كل Pier</td></tr>
</table>
<h3>📐 الأعماق المطلوبة</h3>
<table class="dm-table"><tr><th>النوع</th><th>العمق</th></tr>
<tr><td>Pad / Strip Foundation</td><td>عمق الأساس + 5B أو 10m</td></tr>
<tr><td>Raft Foundation</td><td>عمق الأساس + 2B أو 15m</td></tr>
<tr><td>Bored Piles</td><td>طول الخازوق + 5D أو 3m</td></tr>
<tr><td>طرق ومرافق</td><td>3-5m من مستوى الطريق</td></tr>
</table>
<h3>🔧 متطلبات الموقع</h3>
<p>• NOC من كل الجهات قبل الحفر<br>• تحديد مواضع الخدمات المدفونة<br>• مراقب جيوتقني أثناء الحفر<br>• توثيق كل شيء بالصور</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد خطة الجسات من المهندس الجيوتقني قبل البدء</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📐 الجسات — التخطيط والنطاق
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
geo_borehole: { title: '🕳️ الجسات — Boreholes', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Borehole Drilling</div>
<h3>📐 طرق الحفر</h3>
<table class="dm-table"><tr><th>الطريقة</th><th>الاستخدام</th><th>المميزات</th></tr>
<tr><td>Rotary Drilling</td><td>الصخر والمواد الصلبة</td><td>عينات جيدة + أعماق كبيرة</td></tr>
<tr><td>Cable Percussion</td><td>التربة والرمل</td><td>SPT ممتاز</td></tr>
<tr><td>Auger Drilling</td><td>الطبقات الطينية الرخوة</td><td>سريع وغير مكلف</td></tr>
<tr><td>Trial Pits</td><td>أعماق ≤ 3m</td><td>فحص بصري ممتاز</td></tr>
</table>
<h3>📐 تسجيل Borehole Log</h3>
<p>• وصف كل طبقة (نوع + لون + كثافة + رطوبة)<br>• مستوى المياه الجوفية عند ظهورها<br>• عمق كل SPT والنتيجة<br>• نوع وعمق كل عينة<br>• أي ظروف غير اعتيادية (Sabkha، Cavities، Gas)</p>
<h3>⚠️ تنبيهات خاصة بقطر</h3>
<p>• <strong>Sabkha:</strong> طبقة بيضاء/رمادية مالحة — سجّل عمقها وسماكتها<br>• <strong>Cavernous Limestone:</strong> فراغات في الصخر الجيري — خطر على الأساسات<br>• <strong>Fill Material:</strong> ردميات قديمة شائعة في المناطق الساحلية<br>• <strong>Gas:</strong> في بعض المناطق — احتياطات السلامة إلزامية</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-02:</strong> مراقب جيوتقني في الموقع طوال فترة الحفر</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🕳️ الجسات — Boreholes
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
geo_spt: { title: '🔨 الجسات — SPT Test', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 BS EN ISO 22476-3 | Standard Penetration Test</div>
<h3>📐 إجراء SPT</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>وزن المطرقة</td><td>63.5 kg</td></tr>
<tr><td>ارتفاع السقوط</td><td>760mm</td></tr>
<tr><td>الإدخال الأولي</td><td>150mm (Seating Drive — غير محسوب)</td></tr>
<tr><td>الاختبار الفعلي</td><td>300mm = مجموع ضربات N</td></tr>
<tr><td>الرفض</td><td>&gt; 50 ضربة لـ 300mm أو 100 ضربة لـ 150mm</td></tr>
<tr><td>التكرار</td><td>كل 1.5m أو عند تغيير الطبقة</td></tr>
</table>
<h3>📊 تفسير نتائج SPT (N-Value)</h3>
<table class="dm-table"><tr><th>N-Value</th><th>الرمل</th><th>الطين</th></tr>
<tr><td>0-4</td><td>رخو جداً (Very Loose)</td><td>طري جداً (Very Soft)</td></tr>
<tr><td>4-10</td><td>رخو (Loose)</td><td>طري (Soft)</td></tr>
<tr><td>10-30</td><td>متوسط (Medium Dense)</td><td>متوسط (Medium Stiff)</td></tr>
<tr><td>30-50</td><td>كثيف (Dense)</td><td>صلب (Stiff)</td></tr>
<tr><td>&gt; 50</td><td>كثيف جداً (Very Dense)</td><td>صلب جداً (Very Stiff)</td></tr>
</table>
<h3>⚙️ تصحيحات N-Value</h3>
<p>• <strong>N60:</strong> تصحيح لكفاءة الطاقة (عادة × 0.6-1.0)<br>• <strong>N1,60:</strong> تصحيح لضغط التربة (Overburden)<br>• <strong>في قطر:</strong> Gravel Content يعطي N مرتفع مضلل — انتبه</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-03:</strong> معايرة المطرقة والمعدات قبل البدء</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🔨 الجسات — SPT Test
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
geo_lab: { title: '🧪 الجسات — اختبارات المختبر', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Laboratory Testing</div>
<h3>📐 الاختبارات الإلزامية في قطر</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th><th>الأهمية</th></tr>
<tr><td>Sulphate Content (SO3)</td><td>%</td><td>كل BH + طبقة</td><td>⭐⭐⭐ قطر عالية الكبريتات</td></tr>
<tr><td>Chloride Content</td><td>%</td><td>كل BH + طبقة</td><td>⭐⭐⭐ مناطق ساحلية</td></tr>
<tr><td>pH</td><td>4-11</td><td>كل BH</td><td>⭐⭐ تأثير على الConcrete</td></tr>
<tr><td>Atterberg Limits (LL + PL)</td><td>%</td><td>كل طبقة طينية</td><td>⭐⭐⭐ تحديد طبيعة التربة</td></tr>
<tr><td>Grading Analysis</td><td>%</td><td>كل طبقة</td><td>⭐⭐⭐ تصنيف التربة</td></tr>
<tr><td>Natural Moisture Content</td><td>%</td><td>كل عينة</td><td>⭐⭐ حالة التربة</td></tr>
<tr><td>Specific Gravity</td><td>Gs</td><td>كل نوع تربة</td><td>⭐⭐ حسابات الضغط</td></tr>
<tr><td>CBR (Soaked)</td><td>%</td><td>كل طبقة للطرق</td><td>⭐⭐⭐ تصميم الطريق</td></tr>
<tr><td>Proctor Compaction</td><td>MDD + OMC</td><td>كل تغيير مادة</td><td>⭐⭐⭐ متطلبات الCompaction</td></tr>
<tr><td>Consolidation</td><td>Cc + Cv</td><td>الطين الرخو</td><td>⭐⭐ حساب الهبوط</td></tr>
<tr><td>Shear Strength (UU)</td><td>c + φ</td><td>عند الحاجة</td><td>⭐⭐ تصميم الأساسات</td></tr>
</table>
<h3>⚠️ قطر — الكبريتات الأهم</h3>
<table class="dm-table"><tr><th>نتيجة SO3</th><th>التصنيف</th><th>المطلوب</th></tr>
<tr><td>&lt; 0.2%</td><td>Class 1 — منخفض</td><td>OPC عادي</td></tr>
<tr><td>0.2-0.5%</td><td>Class 2</td><td>SRPC أو OPC+GGBS</td></tr>
<tr><td>0.5-1.0%</td><td>Class 3</td><td>SRPC إلزامي</td></tr>
<tr><td>1.0-2.0%</td><td>Class 4</td><td>SRPC + Protective Coating</td></tr>
<tr><td>&gt; 2.0%</td><td>Class 5 — خطر</td><td>دراسة خاصة</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🧪 الجسات — اختبارات المختبر
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
geo_water: { title: '💧 الجسات — المياه الجوفية', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Groundwater</div>
<h3>📐 قياس المياه الجوفية</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr>
<tr><td>وقت القياس</td><td>فور ظهور المياه + بعد 24hr من الانتهاء</td></tr>
<tr><td>Standpipe Piezometer</td><td>للمراقبة المستمرة</td></tr>
<tr><td>التقلبات الموسمية</td><td>قياس في موسمين مختلفين</td></tr>
<tr><td>Artesian Pressure</td><td>توثيق إذا وُجد</td></tr>
</table>
<h3>🧪 اختبارات جودة المياه الجوفية</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>الأهمية</th></tr>
<tr><td>Sulphate (SO4)</td><td>mg/L</td><td>⭐⭐⭐ تآكل الConcrete</td></tr>
<tr><td>Chloride</td><td>mg/L</td><td>⭐⭐⭐ تآكل الRebar</td></tr>
<tr><td>pH</td><td>—</td><td>⭐⭐ عدوانية المياه</td></tr>
<tr><td>TDS</td><td>mg/L</td><td>⭐⭐ ملوحة المياه</td></tr>
</table>
<h3>⚠️ في قطر — مياه جوفية عدوانية جداً</h3>
<p>• معظم المناطق: SO4 &gt; 2000 mg/L<br>• Chloride قد يصل لـ 30,000 mg/L (مماثل لمياه البحر)<br>• Dewatering إلزامي عند الحفر<br>• Concrete SRPC + Waterproofing إلزامية</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-05:</strong> اختبارات المياه الجوفية قبل اختيار نوع الأسمنت</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 💧 الجسات — المياه الجوفية
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
geo_report: { title: '📋 الجسات — التقرير النهائي (GI Report)', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | GI Report</div>
<h3>📋 محتوى التقرير الإلزامي</h3>
<table class="dm-table"><tr><th>القسم</th><th>المحتوى</th></tr>
<tr><td>1. مقدمة</td><td>الموقع + الغرض + نطاق الدراسة</td></tr>
<tr><td>2. الجيولوجيا الإقليمية</td><td>التكوينات الجيولوجية في المنطقة</td></tr>
<tr><td>3. نتائج الحفر</td><td>Borehole Logs + صور + توصيف الطبقات</td></tr>
<tr><td>4. نتائج الاختبارات الميدانية</td><td>SPT + Permeability + أي اختبارات أخرى</td></tr>
<tr><td>5. نتائج المختبر</td><td>كل الاختبارات الكيميائية والفيزيائية</td></tr>
<tr><td>6. المياه الجوفية</td><td>المستويات + جودة المياه + التوصيات</td></tr>
<tr><td>7. التوصيات</td><td>نوع الأساس + أعماق التأسيس + تصنيف الكبريتات</td></tr>
<tr><td>8. المقاطع الجيولوجية</td><td>Cross Sections تربط كل BH</td></tr>
</table>
<h3>⭐ التوصيات الإلزامية في قطر</h3>
<p>• <strong>Sulphate Classification:</strong> Class 1-5 للتربة والمياه الجوفية<br>• <strong>نوع الأسمنت:</strong> OPC أم SRPC أم SRPC+GGBS<br>• <strong>Cover الConcrete:</strong> حسب Exposure Class<br>• <strong>Waterproofing:</strong> نوع ومواصفات الحماية المطلوبة<br>• <strong>Dewatering:</strong> الطريقة والعمق المتوقع<br>• <strong>Sabkha:</strong> التوصية بالمعالجة أو الاستبدال</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-06:</strong> اعتماد GI Report من Geotechnical Engineer قبل التصميم</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📋 الجسات — التقرير النهائي (GI Report)
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
itp_geotech: { title: '📋 ITP — الجسات | Geotechnical Investigation', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 2 | BS EN ISO 22476</div>
<h3>1.0 — التخطيط والتحضير</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>GEO</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Investigation Plan</td><td>اعتماد الخطة</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Plan</td></tr>
<tr><td>1.2</td><td>Equipment Calibration</td><td>SPT Hammer + Rod</td><td>قبل البدء</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Calibration Cert</td></tr>
<tr><td>1.3</td><td>NOC Services</td><td>كل الجهات</td><td>قبل البدء</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>NOC Documents</td></tr>
</table>
<h3>2.0 — الحفر والسجلات</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>GEO</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Borehole Log</td><td>توصيف كل طبقة</td><td>كل BH</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>BH Log</td></tr>
<tr><td>2.2</td><td>SPT Test</td><td>كل 1.5m — N-Value</td><td>كل 1.5m</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>SPT Record</td></tr>
<tr><td>2.3</td><td>Sample Collection</td><td>Undisturbed كل 2m</td><td>كل 2m</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Sample Log</td></tr>
<tr><td>2.4</td><td>Water Level Record</td><td>فور الظهور + 24hr</td><td>كل BH</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>WL Record</td></tr>
</table>
<h3>3.0 — اختبارات المختبر</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>LAB</th><th>GEO</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Sulphate Content</td><td>%</td><td>كل BH + طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Lab Report</td></tr>
<tr><td>3.2</td><td>Chloride Content</td><td>%</td><td>كل BH + طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Lab Report</td></tr>
<tr><td>3.3</td><td>Atterberg Limits</td><td>LL + PI</td><td>كل طبقة طينية</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Lab Report</td></tr>
<tr><td>3.4</td><td>Grading Analysis</td><td>USCS Classification</td><td>كل طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Lab Report</td></tr>
<tr><td>3.5</td><td>CBR (للطرق)</td><td>Soaked 4 days</td><td>كل طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Lab Report</td></tr>
<tr><td>3.6</td><td>Water Quality</td><td>SO4 + Cl + pH</td><td>كل BH</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Lab Report</td></tr>
</table>
<h3>4.0 — التقرير النهائي</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>GEO</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>GI Report</td><td>محتوى كامل حسب QCS S2</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>GI Report</td></tr>
<tr><td>4.2</td><td>Sulphate Classification</td><td>Class 1-5</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>GI Report</td></tr>
<tr><td>4.3</td><td>Foundation Recommendations</td><td>نوع + عمق + تحمّل</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>GI Report</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point &nbsp;|&nbsp; <strong style="color:#f1c40f;">W</strong> = Witness Point &nbsp;|&nbsp; <strong style="color:#2ecc71;">R</strong> = Review &nbsp;|&nbsp; <strong style="color:#3498db;">GEO</strong> = Geotechnical Engineer</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Geotechnical Investigation</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Borehole Location Survey</td><td>Survey to IFC locations</td><td>100%</td><td>GI Scope</td><td>HP</td></tr>
<tr><td>SPT Test</td><td>N-value every 1.5m</td><td>Per borehole</td><td>ASTM D1586</td><td>W</td></tr>
<tr><td>Disturbed Samples</td><td>Atterberg + Grading + Chemistry</td><td>Every 1.5m</td><td>BS 1377</td><td>W</td></tr>
<tr><td>Groundwater Level</td><td>Standpipe reading</td><td>Per borehole</td><td>GI Scope</td><td>W</td></tr>
<tr><td>Sulphate Class</td><td>SO3% + TDS + pH</td><td>Per stratum</td><td>BS 1377</td><td>HP</td></tr>
<tr><td>GI Report</td><td>Factual + interpretive report</td><td>Once</td><td>BS 5930</td><td>HP</td></tr></table>
</div>
` },
qcs_changes_2014_2024: {
title: '📊 أهم التغييرات — QCS 2014 vs QCS 2024',
content: `
<div class="qcs-ref-badge">مقارنة QCS 2014 → QCS 2024</div>
<table class="dm-table"><thead><tr><th>البند</th><th>QCS 2014</th><th>QCS 2024</th><th>التأثير</th></tr></thead><tbody>
<tr><td>CBR Subgrade</td><td>10%</td><td style="color:#2ecc71;font-weight:700">15%</td><td>أعلى — مواد أغلى</td></tr>
<tr><td>Marshall WC (PMB)</td><td>8.0 kN</td><td style="color:#2ecc71;font-weight:700">10.0 kN</td><td>أعلى — خلطة أقوى</td></tr>
<tr><td>IRI Conventional</td><td>≤2.0 m/km</td><td style="color:#2ecc71;font-weight:700">≤2.5 m/km</td><td>أقل صرامة</td></tr>
<tr><td>IRI PMB</td><td>≤1.5 m/km</td><td style="color:#e74c3c;font-weight:700">≤0.9 m/km</td><td>أصرم بكثير</td></tr>
<tr><td>Concrete Max Temp</td><td>35°C</td><td style="color:#e74c3c;font-weight:700">32°C</td><td>أصرم — ice مطلوب أكثر</td></tr>
<tr><td>Max Ambient للصب</td><td>45°C</td><td style="color:#e74c3c;font-weight:700">40°C</td><td>أصرم — صب ليلي أكثر</td></tr>
<tr><td>SRPC Required</td><td>SO₃ >1.0%</td><td style="color:#e74c3c;font-weight:700">SO₃ >0.5%</td><td>نطاق أوسع</td></tr>
<tr><td>Curing Period</td><td>7 أيام</td><td style="color:#2ecc71;font-weight:700">7 أيام OPC | 14 يوم SRPC (إلزامي في قطر)</td><td>تمديد للبيئة العدوانية</td></tr>
<tr><td>CCTV Requirement</td><td>Sample basis</td><td style="color:#e74c3c;font-weight:700">100% إلزامي</td><td>تكلفة أعلى + وقت</td></tr>
<tr><td>Shoring >1.2m</td><td>توصية</td><td style="color:#e74c3c;font-weight:700">إلزامي — إيقاف عمل</td><td>سلامة صارمة</td></tr>
</tbody></table>
`},
ashghal_forms: {
title: '📝 نماذج Ashghal الرسمية — RFI / NCR / DPR / Method Statement',
content: `
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;">
<button onclick="switchForm('rfi')" id="ftab-rfi" style="flex:1;min-width:80px;padding:9px 6px;border:1px solid rgba(201,168,76,.4);border-radius:10px;background:rgba(201,168,76,.15);color:var(--gold2);font-family:Cairo,Tajawal;font-size:12px;font-weight:700;cursor:pointer">📋 RFI</button>
<button onclick="switchForm('ncr')" id="ftab-ncr" style="flex:1;min-width:80px;padding:9px 6px;border:1px solid var(--border);border-radius:10px;background:var(--dark4);color:var(--text2);font-family:Tajawal;font-size:12px;cursor:pointer">⚠️ NCR</button>
<button onclick="switchForm('dpr')" id="ftab-dpr" style="flex:1;min-width:80px;padding:9px 6px;border:1px solid var(--border);border-radius:10px;background:var(--dark4);color:var(--text2);font-family:Tajawal;font-size:12px;cursor:pointer">📊 DPR</button>
<button onclick="switchForm('ms')"  id="ftab-ms"  style="flex:1;min-width:80px;padding:9px 6px;border:1px solid var(--border);border-radius:10px;background:var(--dark4);color:var(--text2);font-family:Tajawal;font-size:12px;cursor:pointer">📄 Method<br>Statement</button>
</div>

<!-- ══════════ RFI ══════════ -->
<div id="form-rfi" style="background:var(--dark4);border:1px solid rgba(201,168,76,.2);border-radius:14px;padding:20px;margin-bottom:16px;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border)">
  <h3 style="color:var(--gold2);font-family:Cairo;margin:0">📋 Request for Inspection — RFI</h3>
  <button onclick="autoFillRFI()" style="background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);border-radius:7px;padding:5px 12px;color:var(--gold);font-size:11px;font-family:Tajawal;cursor:pointer">⚡ ترقيم تلقائي</button>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">رقم RFI <span style="color:#e74c3c">*</span></label><input id="rfi-num" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="RFI-2024-001"></div>
  <div><label style="font-size:10px;color:var(--text3)">رقم المشروع <span style="color:#e74c3c">*</span></label><input id="rfi-proj" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="PWA-2024-XXX"></div>
  <div><label style="font-size:10px;color:var(--text3)">رقم العقد</label><input id="rfi-contract" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="ASHGHAL-C-XXX"></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">Submitted By <span style="color:#e74c3c">*</span></label><input id="rfi-from" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="QC Engineer / مقدّم الطلب"></div>
  <div><label style="font-size:10px;color:var(--text3)">Directed To <span style="color:#e74c3c">*</span></label><input id="rfi-to" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Site Consultant / SC"></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">تاريخ الإرسال <span style="color:#e74c3c">*</span></label><input id="rfi-date" type="date" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"></div>
  <div><label style="font-size:10px;color:var(--text3)">Required By Date <span style="color:#e74c3c">*</span></label><input id="rfi-reqby" type="date" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"></div>
  <div><label style="font-size:10px;color:var(--text3)">المقاول</label><input id="rfi-contractor" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="اسم المقاول"></div>
</div>
<div style="background:rgba(122,21,21,.06);border:1px solid rgba(201,168,76,.2);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:11px;color:var(--gold);font-weight:700;margin-bottom:8px">★ بيانات الموقع — Ashghal Mandatory</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
    <div><label style="font-size:10px;color:var(--text3)">الموقع <span style="color:#e74c3c">*</span></label><input id="rfi-loc" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Zone 3, Road A"></div>
    <div><label style="font-size:10px;color:var(--text3)">Chainage <span style="color:#e74c3c">*</span></label><input id="rfi-ch" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="CH 0+340 to 0+580"></div>
    <div><label style="font-size:10px;color:var(--text3)">Grid QNG <span style="color:#e74c3c">*</span></label><input id="rfi-grid" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="E:517840 N:2671200"></div>
    <div><label style="font-size:10px;color:var(--text3)">Layer No.</label><input id="rfi-layer" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Layer 3 of 4"></div>
    <div><label style="font-size:10px;color:var(--text3)">QCS Clause <span style="color:#e74c3c">*</span></label><input id="rfi-clause" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="QCS 2024 P8 S5.3"></div>
    <div><label style="font-size:10px;color:var(--text3)">Drawing No.</label><input id="rfi-dwg" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="DWG-RD-001 Rev.C"></div>
  </div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">النشاط المطلوب فحصه <span style="color:#e74c3c">*</span></label><select id="rfi-activity" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><optgroup label="🛣️ الطرق"><option>Subgrade Compaction</option><option>Subbase Compaction</option><option>Base Course Compaction</option><option>Prime Coat</option><option>Tack Coat</option><option>Binder Course Laying</option><option>Wearing Course Laying</option></optgroup><optgroup label="💧 المرافق"><option>Water Pipe Laying</option><option>Sewer Pipe Laying</option><option>Pressure Test</option><option>Air Test</option><option>CCTV Survey</option><option>Chlorination</option></optgroup><optgroup label="🏗️ إنشائي"><option>Rebar Installation</option><option>Formwork Check</option><option>Concrete Pour</option><option>Blinding Concrete</option></optgroup></select></div>
  <div><label style="font-size:10px;color:var(--text3)">نوع النقطة <span style="color:#e74c3c">*</span></label><select id="rfi-point" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><option value="HP">🔴 Hold Point — يُوقف العمل</option><option value="WP">🟠 Witness Point — بحضور SC</option><option value="RP">🔵 Review Point — مراجعة وثائق</option></select></div>
</div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">موضوع RFI + وصف النشاط <span style="color:#e74c3c">*</span></label><textarea id="rfi-subject" style="width:100%;min-height:55px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="طلب فحص طبقة الـ Binder Course المفرودة على Road A، الكمية 1,200 m²، Layer 2 of 3"></textarea></div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">نتائج الاختبارات المُنجزة <span style="color:#e74c3c">*</span></label><textarea id="rfi-results" style="width:100%;min-height:55px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Core Density = 97.8% TMD ✓ | Temp = 145°C ✓ | Level = ±5mm ✓ | Lab Report No. LR-2024-0412"></textarea></div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">المرفقات / Attachments</label><input id="rfi-attach" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Lab Report, Survey Drawing, ITP Sheet, Photos"></div>
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:11px;color:var(--text2);font-weight:700;margin-bottom:8px">📬 رد SC — SC Response</div>
  <div style="display:grid;grid-template-columns:1fr auto;gap:8px;margin-bottom:8px">
    <textarea id="rfi-response" style="width:100%;min-height:50px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Inspection carried out on … Approved to proceed / Rejected — see comments …"></textarea>
    <div style="display:flex;flex-direction:column;gap:6px">
      <select id="rfi-status" style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px">
        <option value="open">🔵 Open</option><option value="responded">🟠 Responded</option><option value="closed">🟢 Closed</option>
      </select>
    </div>
  </div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;padding:12px;background:var(--dark3);border:1px solid var(--border);border-radius:10px">
  <div><label style="font-size:10px;color:var(--text3)">توقيع مقدّم الطلب</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><div style="font-size:9px;color:var(--text3);margin-top:2px">QC Engineer / Date</div></div>
  <div><label style="font-size:10px;color:var(--text3)">توقيع SC</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><div style="font-size:9px;color:var(--text3);margin-top:2px">Consultant / Date</div></div>
  <div><label style="font-size:10px;color:var(--text3)">قرار SC</label><div style="padding-top:8px;font-size:11px">مقبول ☐ &nbsp; مرفوض ☐ &nbsp; Hold ☐</div></div>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <button onclick="exportRFIExcel()" style="background:linear-gradient(135deg,#2ecc71,#27ae60);border:none;border-radius:8px;padding:8px 16px;color:#fff;font-family:Tajawal;font-weight:700;cursor:pointer;font-size:12px">📥 تصدير Excel</button>
  <button onclick="printCurrentDetail()" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text2);font-family:Tajawal;cursor:pointer;font-size:12px">🖨️ طباعة</button>
</div>
</div>

<!-- ══════════ NCR ══════════ -->
<div id="form-ncr" style="display:none;background:var(--dark4);border:1px solid rgba(231,76,60,.2);border-radius:14px;padding:20px;margin-bottom:16px;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(231,76,60,.2)">
  <h3 style="color:#e74c3c;font-family:Cairo;margin:0">⚠️ Non-Conformance Report — NCR</h3>
  <button onclick="autoFillNCR()" style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:7px;padding:5px 12px;color:#e74c3c;font-size:11px;font-family:Tajawal;cursor:pointer">⚡ ترقيم تلقائي</button>
</div>
<div style="background:rgba(231,76,60,.06);border:1px solid rgba(231,76,60,.15);border-radius:8px;padding:8px;margin-bottom:12px;font-size:11px;color:#e74c3c">📌 ISO 9001 Cl.10.2 + Ashghal QA/QC — Root Cause + CAPA</div>

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">رقم NCR (Auto) <span style="color:#e74c3c">*</span></label><input id="ncr-num" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="NCR-PROJ-2024-001"></div>
  <div><label style="font-size:10px;color:var(--text3)">المشروع <span style="color:#e74c3c">*</span></label><input id="ncr-proj" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="اسم المشروع"></div>
  <div><label style="font-size:10px;color:var(--text3)">رقم العقد</label><input id="ncr-contract" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Contract No."></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">المقاول <span style="color:#e74c3c">*</span></label><input id="ncr-contractor" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Contractor Name"></div>
  <div><label style="font-size:10px;color:var(--text3)">مصدر الاكتشاف</label><select id="ncr-source" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><option>SC Inspection</option><option>QC Internal Audit</option><option>Lab Test Result</option><option>CCTV Survey</option><option>Client Audit</option><option>Third Party Audit</option></select></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">تاريخ الاكتشاف <span style="color:#e74c3c">*</span></label><input id="ncr-date" type="date" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"></div>
  <div><label style="font-size:10px;color:var(--text3)">تاريخ الإغلاق المطلوب</label><input id="ncr-target" type="date" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"></div>
  <div><label style="font-size:10px;color:var(--text3)">تاريخ الإغلاق الفعلي</label><input id="ncr-closed-date" type="date" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">تصنيف NCR <span style="color:#e74c3c">*</span></label><select id="ncr-class" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><option value="major">🔴 Major — تصحيح فوري</option><option value="minor">🟡 Minor — تصحيح مُجدوَل</option><option value="obs">🔵 Observation — ملاحظة</option></select></div>
  <div><label style="font-size:10px;color:var(--text3)">QCS Clause المُنتهك <span style="color:#e74c3c">*</span></label><input id="ncr-clause" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="QCS 2024 P8 S5.3.1"></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">الموقع + Chainage + Grid <span style="color:#e74c3c">*</span></label><input id="ncr-loc" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Zone C, Road 4, CH 2+350"></div>
  <div><label style="font-size:10px;color:var(--text3)">Drawing No.</label><input id="ncr-dwg" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="DWG-RD-001 Rev.C"></div>
</div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">وصف عدم المطابقة <span style="color:#e74c3c">*</span></label><textarea id="ncr-desc" style="width:100%;min-height:70px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Core Density = 94.8% TMD — أقل من الحد الأدنى 97% TMD&#10;الموقع: الحارة اليمنى CH 2+350 to 2+400&#10;عدد الكورات المرفوضة: 3 من 5"></textarea></div>
<div style="background:rgba(243,156,18,.06);border:1px solid rgba(243,156,18,.2);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:11px;color:#f39c12;font-weight:700;margin-bottom:6px">🔍 Root Cause Analysis — تحليل السبب الجذري</div>
  <textarea id="ncr-root" style="width:100%;min-height:55px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="1. Roller passes insufficient (4 بدلاً من 8)&#10;2. درجة حرارة الفرش < 130°C&#10;3. مدة التسليم > 90 دقيقة"></textarea>
</div>
<div style="background:rgba(46,204,113,.06);border:1px solid rgba(46,204,113,.2);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:11px;color:#2ecc71;font-weight:700;margin-bottom:6px">🔧 CAPA — Corrective & Preventive Actions</div>
  <div style="margin-bottom:8px"><label style="font-size:10px;color:var(--text3)">الإجراء التصحيحي المقترح <span style="color:#e74c3c">*</span></label><textarea id="ncr-corrective" style="width:100%;min-height:50px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Mill and re-lay 50m مقطع مرفوض&#10;إعادة اختبار Core ≥97% TMD&#10;إعادة فتح RFI بعد التصحيح"></textarea></div>
  <div><label style="font-size:10px;color:var(--text3)">الإجراء الوقائي</label><textarea id="ncr-preventive" style="width:100%;min-height:45px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="قياس درجة الحرارة عند كل شاحنة — رفض <130°C&#10;الحد الأدنى 8 مرورات للرولر"></textarea></div>
</div>
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:11px;color:var(--text2);font-weight:700;margin-bottom:8px">✅ التحقق من الإغلاق — Closure Verification</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
    <div><label style="font-size:10px;color:var(--text3)">نتيجة إعادة الاختبار</label><input id="ncr-retest" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Re-test: Core = 97.6% TMD ✓"></div>
    <div><label style="font-size:10px;color:var(--text3)">حالة الإغلاق <span style="color:#e74c3c">*</span></label><select id="ncr-status" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><option value="open">🔴 Open</option><option value="inprog">🟡 In Progress</option><option value="accepted">🟢 Closed — Accepted</option><option value="rejected">🔴 Closed — Rejected</option><option value="pending">⏳ Pending Verification</option></select></div>
  </div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;padding:12px;background:var(--dark3);border:1px solid var(--border);border-radius:10px">
  <div><label style="font-size:10px;color:var(--text3)">QC Engineer</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><input id="ncr-qc-eng" style="width:100%;background:transparent;border:none;color:var(--text3);font-family:Tajawal;font-size:10px;margin-top:2px" placeholder="الاسم + التاريخ"></div>
  <div><label style="font-size:10px;color:var(--text3)">Consultant / SC</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><input id="ncr-sc" style="width:100%;background:transparent;border:none;color:var(--text3);font-family:Tajawal;font-size:10px;margin-top:2px" placeholder="الاسم + التاريخ"></div>
  <div><label style="font-size:10px;color:var(--text3)">Client / Ashghal Rep</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><input id="ncr-client" style="width:100%;background:transparent;border:none;color:var(--text3);font-family:Tajawal;font-size:10px;margin-top:2px" placeholder="الاسم + التاريخ"></div>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <button onclick="exportNCRExcel()" style="background:linear-gradient(135deg,#e74c3c,#c0392b);border:none;border-radius:8px;padding:8px 16px;color:#fff;font-family:Tajawal;font-weight:700;cursor:pointer;font-size:12px">📥 تصدير NCR Excel</button>
  <button onclick="printCurrentDetail()" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text2);font-family:Tajawal;cursor:pointer;font-size:12px">🖨️ طباعة</button>
</div>
</div>

<!-- ══════════ DPR ══════════ -->
<div id="form-dpr" style="display:none;background:var(--dark4);border:1px solid rgba(52,152,219,.2);border-radius:14px;padding:20px;margin-bottom:16px;">
<h3 style="color:#3498db;font-family:Cairo;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(52,152,219,.2)">📊 Daily Progress Report — DPR</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">المشروع</label><input id="dpr-proj" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Project Name"></div>
  <div><label style="font-size:10px;color:var(--text3)">التاريخ</label><input id="dpr-date" type="date" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"></div>
  <div><label style="font-size:10px;color:var(--text3)">الطقس</label><select id="dpr-weather" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><option>☀️ صافي</option><option>🌤️ غائم جزئياً</option><option>☁️ غائم</option><option>🌧️ ممطر</option><option>🌪️ عاصفة رملية</option></select></div>
</div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">👷 العمالة (وصف | عدد | ساعات — سطر لكل فئة)</label><textarea id="dpr-manpower" style="width:100%;min-height:70px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="عمال فرش إسفلت | 12 | 8&#10;مشغلي معدات | 4 | 10&#10;مساحين | 2 | 8"></textarea></div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">🚜 المعدات (المعدة | العدد | ساعات)</label><textarea id="dpr-equipment" style="width:100%;min-height:70px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Roller 12T | 2 | 8&#10;Paver VOGELE | 1 | 6&#10;Backhoe CAT 420 | 1 | 10"></textarea></div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">📈 تقدم الإنجاز (النشاط | الكمية | الوحدة | %)</label><textarea id="dpr-progress" style="width:100%;min-height:70px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="WC Laying | 1200 | m² | 85%&#10;Subbase Compaction | 800 | m² | 60%"></textarea></div>
<div style="margin-bottom:12px"><label style="font-size:10px;color:var(--text3)">⚠️ مشاكل وملاحظات</label><textarea id="dpr-issues" style="width:100%;min-height:50px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Roller breakdown 2hrs | Rain delay 1hr | Material shortage"></textarea></div>
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <button onclick="exportDPRExcel()" style="background:linear-gradient(135deg,#3498db,#2980b9);border:none;border-radius:8px;padding:8px 16px;color:#fff;font-family:Tajawal;font-weight:700;cursor:pointer;font-size:12px">📥 تصدير DPR Excel</button>
  <button onclick="printCurrentDetail()" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text2);font-family:Tajawal;cursor:pointer;font-size:12px">🖨️ طباعة</button>
</div>
</div>

<!-- ══════════ METHOD STATEMENT ══════════ -->
<div id="form-ms" style="display:none;background:var(--dark4);border:1px solid rgba(155,89,182,.25);border-radius:14px;padding:20px;margin-bottom:16px;">
<h3 style="color:#9b59b6;font-family:Cairo;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(155,89,182,.2)">📄 Method Statement — بيان أسلوب العمل</h3>
<div style="background:rgba(155,89,182,.06);border:1px solid rgba(155,89,182,.15);border-radius:8px;padding:8px;margin-bottom:14px;font-size:11px;color:#9b59b6">📌 وفق متطلبات QCS 2024 + Ashghal — 8 أقسام إلزامية</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
  <div><label style="font-size:10px;color:var(--text3)">عنوان Method Statement <span style="color:#e74c3c">*</span></label><input id="ms-title" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="آلية فرد الإسفلت — Wearing Course"></div>
  <div><label style="font-size:10px;color:var(--text3)">رقم الوثيقة / Rev.</label><input id="ms-doc" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="MS-RD-WC-001 Rev.A"></div>
</div>

<!-- Section 1 -->
<div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px">1️⃣ هدف العمل والنطاق</div>
  <textarea id="ms-scope" style="width:100%;min-height:55px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="يهدف هذا البيان إلى تحديد آلية فرد ودمك طبقة الـ Wearing Course على Road A، الكمية الإجمالية 4,500 m²، بالتوافق مع QCS 2024 Section 6."></textarea>
</div>

<!-- Section 2 -->
<div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px">2️⃣ المراجع — QCS 2024 Parts المعنية</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
    <input id="ms-ref1" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px;width:100%" placeholder="QCS 2024 Section 6 — Roads">
    <input id="ms-ref2" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px;width:100%" placeholder="ASTM D1559 — Marshall Test">
    <input id="ms-ref3" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px;width:100%" placeholder="PWA IAN-013 — Roughness">
    <input id="ms-ref4" style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px;width:100%" placeholder="Ashghal Standard Detail SD-RD-01">
  </div>
</div>

<!-- Section 3 -->
<div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px">3️⃣ المواد والمواصفات</div>
  <textarea id="ms-materials" style="width:100%;min-height:65px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="• Asphalt Mix — PMB 60/70 + JMF معتمد رقم JMF-2024-012&#10;• Tack Coat — SS-1H بمعدل 0.3 L/m²&#10;• مصدر المادة — Al-Wakra Quarry / AMS معتمد رقم AMS-441&#10;• درجة حرارة الفرش: ≥145°C لـ PMB | ≥130°C للعادي"></textarea>
</div>

<!-- Section 4 -->
<div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px">4️⃣ المعدات المطلوبة + مواصفاتها</div>
  <textarea id="ms-equipment" style="width:100%;min-height:65px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="• Asphalt Paver VOGELE S1800 — عرض 4.0m&#10;• Tandem Roller 10T (×2) — Vibratory + Static&#10;• Pneumatic Tyre Roller 20T — للإنهاء&#10;• Road Broom + Blower — تنظيف السطح&#10;• Infrared Thermometer — قياس درجة الحرارة&#10;• 3m Straightedge — فحص الاستواء"></textarea>
</div>

<!-- Section 5 -->
<div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px">5️⃣ الخطوات التنفيذية (مرقمة)</div>
  <textarea id="ms-steps" style="width:100%;min-height:100px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="1. التحقق من قبول طبقة Binder (ITP مُغلق + RFI مقبول)&#10;2. تنظيف السطح بالسويبر + blower — صفر غبار وأتربة&#10;3. تطبيق Tack Coat SS-1H بمعدل 0.3 L/m² — انتظار الكسر 2hr&#10;4. فحص درجة الحرارة عند الوصول ≥145°C — رفض <130°C&#10;5. الفرد بالـ Paver — سرعة ≤5 m/min — سماكة غير مدموكة: الهدف × 1.25&#10;6. الدمك الأولي — Tandem Vibr. 3 مرورات عند ≥140°C&#10;7. الدمك الثانوي — Pneumatic 5 مرورات&#10;8. الدمك النهائي — Tandem Static 2 مرورات ≥100°C&#10;9. قياس الاستواء 3m Straightedge ≤3mm عند الانتهاء&#10;10. أخذ Cores بعد 24hr — تقرير المعمل"></textarea>
</div>

<!-- Section 6 -->
<div style="border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:12px;margin-bottom:10px;background:rgba(231,76,60,.03)">
  <div style="font-size:12px;font-weight:700;color:#e74c3c;margin-bottom:8px">6️⃣ نقاط السلامة — PPE + Safety Measures</div>
  <textarea id="ms-safety" style="width:100%;min-height:65px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="PPE إلزامي: خوذة + حذاء سلامة + سترة عاكسة + قفازات حرارية&#10;• TMP (Traffic Management Plan) مفعّل + لافتات + حواجز&#10;• منطقة العمل مغلقة بـ water-filled barriers&#10;• Spotter مخصص لكل معدة كبيرة&#10;• Toolbox Talk قبل البدء يومياً&#10;• بيان MSDS للمواد الكيميائية (Bitumen/Solvent) متاح&#10;• خطة طوارئ + مستشفى قريب: [اسم المستشفى]"></textarea>
</div>

<!-- Section 7 -->
<div style="border:1px solid rgba(201,168,76,.2);border-radius:10px;padding:12px;margin-bottom:10px;background:rgba(201,168,76,.03)">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px">7️⃣ نقاط ITP — Hold / Witness / Review</div>
  <table style="width:100%;border-collapse:collapse;font-size:11px">
    <tr style="background:rgba(201,168,76,.1)"><th style="padding:6px;border:1px solid var(--border);color:var(--gold);text-align:right">النشاط</th><th style="padding:6px;border:1px solid var(--border);color:var(--gold)">النوع</th><th style="padding:6px;border:1px solid var(--border);color:var(--gold)">المسؤول</th></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">قبول طبقة Binder + Tack Coat</td><td style="padding:6px;border:1px solid var(--border);text-align:center">🔴 HP</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">QC + SC</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">درجة حرارة الفرش (كل شاحنة)</td><td style="padding:6px;border:1px solid var(--border);text-align:center">🟠 WP</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">QC</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">Core Density ≥97% TMD</td><td style="padding:6px;border:1px solid var(--border);text-align:center">🔴 HP</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">QC + SC</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">Straightedge + Level Survey</td><td style="padding:6px;border:1px solid var(--border);text-align:center">🟠 WP</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">QC + Survey</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">تقرير المعمل النهائي</td><td style="padding:6px;border:1px solid var(--border);text-align:center">🔵 RP</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">SC Review</td></tr>
  </table>
  <input id="ms-itp-extra" style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:7px;color:var(--text);font-family:Tajawal;font-size:12px;margin-top:8px" placeholder="إضافة نقاط ITP خاصة بالمشروع...">
</div>

<!-- Section 8 -->
<div style="border:1px solid rgba(52,152,219,.2);border-radius:10px;padding:12px;margin-bottom:14px;background:rgba(52,152,219,.03)">
  <div style="font-size:12px;font-weight:700;color:#3498db;margin-bottom:8px">8️⃣ مصفوفة المخاطر — Risk Register</div>
  <table style="width:100%;border-collapse:collapse;font-size:11px">
    <tr style="background:rgba(52,152,219,.1)"><th style="padding:6px;border:1px solid var(--border);color:#3498db;text-align:right">الخطر</th><th style="padding:6px;border:1px solid var(--border);color:#3498db">الاحتمال</th><th style="padding:6px;border:1px solid var(--border);color:#3498db">الإجراء</th></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">انخفاض درجة حرارة الإسفلت</td><td style="padding:6px;border:1px solid var(--border);text-align:center;color:#e74c3c">عالي</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">رفض الشاحنة + إعادة من المصنع</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">عطل في الـ Paver</td><td style="padding:6px;border:1px solid var(--border);text-align:center;color:#f39c12">متوسط</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">Paver احتياطي جاهز + Maintenance Stand-by</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">إصابة عامل بالإسفلت الساخن</td><td style="padding:6px;border:1px solid var(--border);text-align:center;color:#e74c3c">عالي</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">PPE إلزامي + First Aid جاهز</td></tr>
    <tr><td style="padding:6px;border:1px solid var(--border);color:var(--text2)">عدم تحقيق Core Density</td><td style="padding:6px;border:1px solid var(--border);text-align:center;color:#f39c12">متوسط</td><td style="padding:6px;border:1px solid var(--border);color:var(--text3)">Trial Section قبل الإنتاج + الدمك المضبوط</td></tr>
  </table>
  <textarea id="ms-risks" style="width:100%;min-height:45px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical;margin-top:8px" placeholder="مخاطر إضافية خاصة بالمشروع..."></textarea>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;padding:12px;background:var(--dark3);border:1px solid var(--border);border-radius:10px">
  <div><label style="font-size:10px;color:var(--text3)">معدّ الوثيقة</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><input id="ms-prepared" style="width:100%;background:transparent;border:none;color:var(--text3);font-family:Tajawal;font-size:10px;margin-top:2px" placeholder="Site Engineer / Date"></div>
  <div><label style="font-size:10px;color:var(--text3)">مراجع / QC Manager</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><input id="ms-reviewed" style="width:100%;background:transparent;border:none;color:var(--text3);font-family:Tajawal;font-size:10px;margin-top:2px" placeholder="QC Manager / Date"></div>
  <div><label style="font-size:10px;color:var(--text3)">اعتماد SC</label><div style="border-bottom:1px solid var(--text3);height:28px;margin-top:4px"></div><input id="ms-approved" style="width:100%;background:transparent;border:none;color:var(--text3);font-family:Tajawal;font-size:10px;margin-top:2px" placeholder="Consultant / Date"></div>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <button onclick="printCurrentDetail()" style="background:linear-gradient(135deg,#9b59b6,#8e44ad);border:none;border-radius:8px;padding:8px 16px;color:#fff;font-family:Tajawal;font-weight:700;cursor:pointer;font-size:12px">🖨️ طباعة Method Statement</button>
</div>
</div>
`},
photo_analyzer: {
title: '🤖 المفتش الذكي — AI Site Inspector',
content: `
<div style="text-align:center;margin-bottom:16px">
<div style="font-size:40px;margin-bottom:6px">🤖</div>
<div style="font-size:18px;font-weight:800;color:var(--gold2);font-family:Cairo">المفتش الذكي — AI Site Inspector</div>
<div style="font-size:12px;color:var(--text3)">التقط صورة من الموقع → اختر نوع الفحص → تقرير فوري مع مراجع QCS 2024</div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
<div onclick="document.getElementById('inspector-camera').click()" style="background:linear-gradient(135deg,rgba(201,168,76,.1),rgba(201,168,76,.03));border:2px dashed rgba(201,168,76,.3);border-radius:14px;padding:24px;text-align:center;cursor:pointer">
<div style="font-size:32px;margin-bottom:8px">📷</div>
<div style="font-size:13px;font-weight:700;color:var(--gold2)">التقاط من الكاميرا</div>
<div style="font-size:10px;color:var(--text3)">مباشرة من كاميرا الهاتف</div>
<input type="file" accept="image/*" capture="environment" id="inspector-camera" style="display:none" onchange="inspectorLoadImage(this)">
</div>
<div onclick="document.getElementById('inspector-upload').click()" style="background:linear-gradient(135deg,rgba(52,152,219,.08),rgba(52,152,219,.02));border:2px dashed rgba(52,152,219,.25);border-radius:14px;padding:24px;text-align:center;cursor:pointer">
<div style="font-size:32px;margin-bottom:8px">📁</div>
<div style="font-size:13px;font-weight:700;color:#3498db">رفع من الجهاز</div>
<div style="font-size:10px;color:var(--text3)">صورة أو PDF</div>
<input type="file" accept="image/*,application/pdf" id="inspector-upload" style="display:none" onchange="inspectorLoadImage(this)">
</div>
</div>

<div id="inspector-preview" style="display:none;margin-bottom:14px;border-radius:12px;overflow:hidden;border:1px solid var(--border)">
<img id="inspector-img" style="width:100%;max-height:300px;object-fit:contain;background:var(--dark3)">
</div>

<div id="inspector-form" style="display:none">
<div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:12px;padding:14px;margin-bottom:14px">
<div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:10px">📋 قائمة الفحص — حدد قبل التحليل</div>

<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">① نوع العمل <span style="color:#e74c3c">*</span></label>
<select id="insp-work-type" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px">
<option value="">— اختر —</option>
<optgroup label="🛣️ الطرق">
<option value="roads_subgrade">Subgrade — طبقة التأسيس</option>
<option value="roads_subbase">Subbase — الطبقة السفلية</option>
<option value="roads_base">Base Course — طبقة الأساس</option>
<option value="roads_prime">Prime Coat — طبقة الربط</option>
<option value="roads_asphalt">Asphalt (Binder/Wearing) — الإسفلت</option>
</optgroup>
<optgroup label="🏗️ الإنشاء">
<option value="struct_rebar">تسليح — Rebar Installation</option>
<option value="struct_formwork">شدة — Formwork</option>
<option value="struct_concrete">صب خرسانة — Concrete Pour</option>
<option value="struct_curing">معالجة — Curing</option>
</optgroup>
<optgroup label="💧 المرافق">
<option value="util_excavation">حفريات — Excavation</option>
<option value="util_pipe">وضع مواسير — Pipe Laying</option>
<option value="util_backfill">ردم — Backfill</option>
<option value="util_manhole">غرف تفتيش — Manholes</option>
</optgroup>
<optgroup label="🔬 جيوتقنية">
<option value="geo_borehole">جسات — Boreholes</option>
<option value="geo_sabkha">سبخة — Sabkha</option>
</optgroup>
</select></div>

<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">② مرحلة العمل <span style="color:#e74c3c">*</span></label>
<select id="insp-phase" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px">
<option value="before">قبل التنفيذ — Pre-execution</option>
<option value="during" selected>أثناء التنفيذ — During execution</option>
<option value="after">بعد التنفيذ — Post-execution</option>
<option value="defect">عيب مكتشف — Defect found</option>
</select></div>

<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">③ ما الذي تريد فحصه تحديداً؟</label>
<input id="insp-specific" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="مثال: فحص cover التسليح قبل الصب / تشققات في السطح / gradient الماسورة"></div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
<div><label style="font-size:10px;color:var(--text3)">الموقع</label><input id="insp-location" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="CH 2+350, Zone C"></div>
<div><label style="font-size:10px;color:var(--text3)">المشروع</label><input id="insp-project" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="PWA-2024-XXX"></div>
</div>
</div>

<button onclick="runInspector()" id="insp-analyze-btn" style="width:100%;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,.4);border-radius:10px;padding:12px;color:var(--gold2);font-family:Cairo;font-weight:800;font-size:14px;cursor:pointer;margin-bottom:14px">🔍 ابدأ التحليل — Analyze</button>

<div id="inspector-loading" style="display:none;text-align:center;padding:20px;color:var(--gold)">
<div style="font-size:24px;animation:spin 1s linear infinite">⚙️</div>
<div style="margin-top:8px;font-size:13px">جاري التحليل بالذكاء الاصطناعي...</div>
</div>
</div>

<div id="inspector-result" style="display:none">
<div style="background:var(--dark4);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:14px">
<div style="font-size:14px;font-weight:700;color:var(--gold2);margin-bottom:10px;font-family:Cairo">📊 تقرير المفتش الذكي</div>
<div id="inspector-report" style="font-size:12px;color:var(--text2);line-height:1.9"></div>
</div>

<div style="display:flex;gap:8px;flex-wrap:wrap">
<button onclick="printCurrentDetail()" style="background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.3);border-radius:8px;padding:8px 14px;color:#2ecc71;font-family:Tajawal;cursor:pointer;font-size:11px;font-weight:700">📄 حفظ التقرير PDF</button>
<button onclick="shareInspectorReport()" style="background:rgba(52,152,219,.12);border:1px solid rgba(52,152,219,.3);border-radius:8px;padding:8px 14px;color:#3498db;font-family:Tajawal;cursor:pointer;font-size:11px;font-weight:700">📤 شارك WhatsApp</button>
<button onclick="inspectorToNCR()" style="background:rgba(231,76,60,.12);border:1px solid rgba(231,76,60,.3);border-radius:8px;padding:8px 14px;color:#e74c3c;font-family:Tajawal;cursor:pointer;font-size:11px;font-weight:700">⚠️ أضف لـ NCR</button>
<button onclick="resetInspector()" style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px 14px;color:var(--text3);font-family:Tajawal;cursor:pointer;font-size:11px">🔄 فحص جديد</button>
</div>
</div>
`},
top20_ncr: {
title: '🔴 أكثر 20 NCR شيوعاً في مشاريع قطر',
content: `
<div class="qcs-ref-badge">من الخبرة الميدانية في مشاريع Ashghal</div>
<table class="dm-table"><thead><tr><th>#</th><th>الخطأ الشائع</th><th>السبب الجذري</th><th>الحل</th><th>QCS Clause</th></tr></thead><tbody>
<tr><td>1</td><td style="color:#e74c3c"><strong>Core Density < 97% TMD</strong></td><td>Roller passes ناقصة أو حرارة الفرش منخفضة</td><td>Mill + re-lay + min 8 passes</td><td>S6 P5 S5.3</td></tr>
<tr><td>2</td><td style="color:#e74c3c"><strong>Concrete temp > 32°C</strong></td><td>نقل طويل بدون ice أو صب نهاري صيفاً</td><td>Ice في الخلطة + صب ليلي</td><td>S5 P4</td></tr>
<tr><td>3</td><td style="color:#e74c3c"><strong>Compaction < 95% MDD</strong></td><td>MC بعيد عن OMC أو طبقة سميكة</td><td>إعادة دمك + MC = OMC±2%</td><td>S6 P3 S3.3</td></tr>
<tr><td>4</td><td style="color:#e74c3c"><strong>Rebar cover ناقص</strong></td><td>Spacers غير كافية أو تحركت</td><td>إعادة ربط + spacer كل 1m</td><td>S5 P4 S4.3</td></tr>
<tr><td>5</td><td style="color:#e74c3c"><strong>Air Test fail (>25mm drop)</strong></td><td>وصلة مكسورة أو pipe damage</td><td>إصلاح + إعادة الاختبار</td><td>BS EN 1610</td></tr>
<tr><td>6</td><td style="color:#f39c12"><strong>Level tolerance exceeded</strong></td><td>عدم استخدام Total Station أثناء الفرش</td><td>Sonic Beam Paver + Grid 25m</td><td>S6 P5 S5.5</td></tr>
<tr><td>7</td><td style="color:#f39c12"><strong>Marshall Stability < 8.0 kN</strong></td><td>JMF غير مُحسَّن أو aggregate مبلل</td><td>مراجعة JMF + تجفيف الركام</td><td>S6 P5 S3.5</td></tr>
<tr><td>8</td><td style="color:#f39c12"><strong>Bitumen content خارج JMF±0.3%</strong></td><td>معايرة Plant غير دقيقة</td><td>إعادة معايرة Plant</td><td>S6 P5 S3.5</td></tr>
<tr><td>9</td><td style="color:#f39c12"><strong>Slump خارج النطاق</strong></td><td>إضافة ماء في الموقع (ممنوع)</td><td>رفض الشاحنة فوراً</td><td>S5 P4</td></tr>
<tr><td>10</td><td style="color:#f39c12"><strong>CCTV Grade 3+</strong></td><td>Bedding رديء أو pipe damage أثناء الردم</td><td>Point repair + re-CCTV</td><td>BS EN 13508</td></tr>
<tr><td>11</td><td style="color:#f39c12"><strong>Cube result < fcu @28d</strong></td><td>w/c ratio عالي أو curing ناقص</td><td>Core test + تحقيق</td><td>S5 P4</td></tr>
<tr><td>12</td><td style="color:#f39c12"><strong>CBR < 8% Subgrade</strong></td><td>تربة Sabkha أو MC عالي</td><td>استبدال + معالجة</td><td>S6 P3 S3.4</td></tr>
<tr><td>13</td><td style="color:#f39c12"><strong>Pipe gradient عكسي</strong></td><td>خطأ في Survey أو هبوط</td><td>إعادة وضع + survey</td><td>S8 P2</td></tr>
<tr><td>14</td><td><strong>No Shoring > 1.2m</strong></td><td>تجاهل السلامة</td><td>إيقاف عمل فوري + Shoring</td><td>P1 S8.4</td></tr>
<tr><td>15</td><td><strong>Marker Tape لون خاطئ</strong></td><td>عدم معرفة ألوان KAHRAMAA</td><td>إعادة الردم + اللون الصحيح</td><td>S8</td></tr>
<tr><td>16</td><td><strong>Tack Coat مفقود/زائد</strong></td><td>عدم حساب المعدل</td><td>0.15-0.35 L/m² residual</td><td>S6 P5</td></tr>
<tr><td>17</td><td><strong>Chlorination < 50 ppm</strong></td><td>تخفيف زائد</td><td>إعادة التعقيم + 50 ppm</td><td>KAHRAMAA</td></tr>
<tr><td>18</td><td><strong>Formwork bulging</strong></td><td>Props ضعيفة أو spacing كبير</td><td>إعادة + تقوية</td><td>S5 P4</td></tr>
<tr><td>19</td><td><strong>Geotextile overlap < 300mm</strong></td><td>عدم رقابة أثناء الفرش</td><td>إعادة + overlap ≥300mm</td><td>IAN-006</td></tr>
<tr><td>20</td><td><strong>Delivery temp < 130°C</strong></td><td>مسافة نقل طويلة</td><td>رفض الحمل + Plant أقرب</td><td>S6 P5 S4.4</td></tr>
</tbody></table>
`},
prequalification_checklist: {
title: '✅ Pre-Qualification Checklist — قبل كل مرحلة',
content: `
<div class="qcs-ref-badge">Ashghal QA/QC Requirements</div>
<p style="font-size:12px;color:var(--text2);margin-bottom:14px">قبل بدء أي مرحلة — تأكد من إكمال كل البنود. اضغط ☐ لتحويلها ✅</p>
<h3>🛣️ قبل أعمال الطرق</h3>
<div style="font-size:13px;line-height:2.2;color:var(--text2)" id="cl-roads">
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Material Approval (MAR) — ركام + بيتومين + إسفلت معتمد</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Method Statement معتمد من SC</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ ITP معتمد ومُوقَّع</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ JMF معتمد (للإسفلت)</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Trial Section مكتمل ومقبول</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Lab Equipment معاير (كل 6 أشهر)</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Survey Benchmarks ثابتة كل 200m</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ الطبقة السابقة مُعتمدة (ITP مُغلق)</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ TMP (Traffic Management Plan) مفعّل</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ صفر NCR مفتوح من المرحلة السابقة</div>
</div>
<h3>💧 قبل أعمال المرافق</h3>
<div style="font-size:13px;line-height:2.2;color:var(--text2)">
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ NOC من Ashghal للحفر</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ GPR Scan للمرافق القائمة</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Shoring Design (>1.2m) معتمد</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Dewatering Plan (إذا GWT عالي)</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Pipe + Fittings Material Approval</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ KAHRAMAA Approval (لمياه الشرب)</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Marker Tape بالألوان الصحيحة جاهز</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ CCTV contractor مُتعاقَد (Sewer)</div>
</div>
<h3>🏗️ قبل أعمال الخرسانة</h3>
<div style="font-size:13px;line-height:2.2;color:var(--text2)">
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Concrete Mix Design معتمد</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Rebar Mill Certificate + Site Test</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Formwork Design مُعتمد</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Cube Moulds معايرة</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Curing Compound/Hessian جاهز</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Hot Weather Protocol (صيف >35°C)</div>
<div onclick="this.innerHTML=this.innerHTML.startsWith('☐')?'✅'+this.innerHTML.slice(1):'☐'+this.innerHTML.slice(1)" style="cursor:pointer;padding:4px 8px;border-radius:6px;background:var(--dark4);margin:3px 0">☐ Sulphate Test للتربة (اختيار الإسمنت)</div>
</div>
`},
ashghal_std_details: {
title: '📏 Ashghal Standard Details — التفاصيل الإنشائية',
content: `
<div class="qcs-ref-badge">Ashghal Infrastructure Affairs — Standard Details</div>
<h3>Manhole Standard Sizes — أحجام الغرف</h3>
<table class="dm-table"><thead><tr><th>العمق</th><th>Internal Size</th><th>Wall Thickness</th><th>Cover Type</th><th>التطبيق</th></tr></thead><tbody>
<tr><td>≤1.5m</td><td>1200×750mm (precast)</td><td>150mm</td><td>D400 (HS20)</td><td>Shallow sewer</td></tr>
<tr><td>1.5-3.0m</td><td>1200×1200mm</td><td>200mm</td><td>D400</td><td>Standard depth</td></tr>
<tr><td>3.0-5.0m</td><td>1500×1200mm</td><td>200mm</td><td>D400</td><td>Deep sewer</td></tr>
<tr><td>>5.0m</td><td>1800×1200mm min</td><td>250mm</td><td>D400</td><td>Very deep — design req.</td></tr>
<tr><td>Drop Manhole</td><td>1500×1500mm min</td><td>250mm</td><td>D400</td><td>Drop >500mm</td></tr>
</tbody></table>
<h3>Thrust Block Sizes — كتل الارتكاز</h3>
<table class="dm-table"><thead><tr><th>DN</th><th>PN</th><th>11.25° Bend</th><th>22.5° Bend</th><th>45° Bend</th><th>90° Bend / Tee</th></tr></thead><tbody>
<tr><td>100</td><td>16</td><td>0.15m³</td><td>0.25m³</td><td>0.45m³</td><td>0.6m³</td></tr>
<tr><td>150</td><td>16</td><td>0.25m³</td><td>0.4m³</td><td>0.7m³</td><td>1.0m³</td></tr>
<tr><td>200</td><td>16</td><td>0.4m³</td><td>0.6m³</td><td>1.0m³</td><td>1.5m³</td></tr>
<tr><td>300</td><td>16</td><td>0.6m³</td><td>1.0m³</td><td>1.8m³</td><td>2.5m³</td></tr>
</tbody></table>
<p style="font-size:11px;color:var(--text3)">خرسانة Thrust Block: C20 min | Bearing على تربة غير مُقلقلة | Curing 7 أيام قبل الضغط</p>
<h3>Trench Cross Sections — مقاطع الخنادق</h3>
<table class="dm-table"><thead><tr><th>DN Pipe</th><th>Trench Width</th><th>Bedding</th><th>Initial BF</th><th>Main BF</th></tr></thead><tbody>
<tr><td>≤200mm</td><td>DN + 400mm</td><td>100mm sand</td><td>200mm above crown</td><td>Layers ≤200mm</td></tr>
<tr><td>200-600mm</td><td>DN + 600mm</td><td>150mm granular</td><td>250mm above crown</td><td>Layers ≤200mm</td></tr>
<tr><td>600-1200mm</td><td>DN + 800mm</td><td>150mm Type 1</td><td>300mm above crown</td><td>Layers ≤250mm</td></tr>
<tr><td>>1200mm</td><td>DN + 1000mm</td><td>200mm Type 1</td><td>300mm above crown</td><td>Per design</td></tr>
</tbody></table>
`},
ncr_quick_logger: {
title: '🔴 NCR Quick Logger — سجل سريع',
content: `
<div class="qcs-ref-badge">سجل NCR ميداني سريع — يُحفظ في المتصفح</div>
<p style="font-size:12px;color:var(--text2);margin-bottom:12px">سجّل أي NCR بـ 5 حقول — يُحفظ تلقائياً ويمكن تصديره دفعة واحدة</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
<div><label style="font-size:10px;color:var(--text3)">الموقع</label><input id="ql-loc" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="CH 2+350, Grid D5"></div>
<div><label style="font-size:10px;color:var(--text3)">QCS Clause</label><input id="ql-clause" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="S6 P5 S5.3"></div>
</div>
<div style="margin-bottom:10px"><label style="font-size:10px;color:var(--text3)">الوصف</label><input id="ql-desc" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Core Density 94.8% < 97%"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
<div><label style="font-size:10px;color:var(--text3)">الخطورة</label><select id="ql-sev" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px"><option>🔴 Critical</option><option selected>🟠 Major</option><option>🟡 Minor</option></select></div>
<div><label style="font-size:10px;color:var(--text3)">الطبقة/العنصر</label><input id="ql-layer" style="width:100%;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px" placeholder="Wearing Course"></div>
</div>
<button onclick="addQuickNCR()" style="background:linear-gradient(135deg,#e74c3c,#c0392b);border:none;border-radius:8px;padding:10px 20px;color:#fff;font-family:Tajawal;font-weight:700;cursor:pointer;width:100%;font-size:13px;margin-bottom:14px">🔴 إضافة NCR</button>
<div id="ql-list" style="font-size:12px;color:var(--text2)"></div>
<div style="display:flex;gap:8px;margin-top:10px">
<button onclick="exportQuickNCRs()" style="background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.3);border-radius:8px;padding:8px 16px;color:#2ecc71;font-family:Tajawal;cursor:pointer;font-size:12px">📥 تصدير الكل Excel</button>
<button onclick="clearQuickNCRs()" style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:8px;padding:8px 16px;color:#e74c3c;font-family:Tajawal;cursor:pointer;font-size:12px">🗑️ مسح</button>
</div>
`},
geotech_equipment: { title: '🔬 معدات الجيوتقنية — Geotechnical Equipment', content: `
<div style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;color:#2ecc71;">
📌 QCS 2024 Section 4 + BS EN 1997 — Site Investigation & Testing
</div>
<div style="display:flex;flex-direction:column;gap:10px;">

${[
{emoji:'🔩',name:'Rotary Boring Rig',ar:'حفارة الجسات الدوّارة',ref:'QCS S4 + BS EN ISO 22475',desc:'حفر آبار الجسات (Boreholes) للتربة والصخور',cap:'Depth: up to 100m',sets:{'Diameter':'Min 100mm (NQ/HQ core)','Flushing':'Water/Mud flush','Core Recovery':'CORE BARREL with liner','Speed':'60-120 rpm (soil) | 30-60 rpm (rock)'},qc:['RQD + Core Recovery لكل Run','SCR + TCR قياسات','تصوير Core Box مباشرة','مستوى ماء جوفي (GWT) تسجيل'],acc:'Core Recovery ≥95% (soil) | RQD classified per Deere 1963',safe:'Casing installation للعمق >3m | Hard hat Zone'},
{emoji:'🔨',name:'SPT Equipment',ar:'SPT — اختبار الاختراق القياسي',ref:'ASTM D1586 + BS EN ISO 22476-3',desc:'قياس مقاومة التربة عند أعماق مختلفة',cap:'Hammer: 63.5kg | Drop: 760mm',sets:{'Split Spoon':'35mm ID × 50mm OD','Blow Count':'Record N per 300mm','Energy Efficiency':'60% (N60)','Test Interval':'Min every 1.5m'},qc:['تسجيل Blows per 150mm (3 readings)','Reject first 150mm (seating)','Hammer free fall — no friction','Energy Ratio Correction: CE×CB×CS×CR'],acc:'N-value used for soil classification + bearing capacity estimation',safe:'صيانة الحبل والبكرة يومياً | لا يقف أحد تحت الـ Hammer'},
{emoji:'🧪',name:'Laboratory Testing Equipment',ar:'معدات المختبر الجيوتقني',ref:'BS 1377 Parts 1-9',desc:'اختبارات خصائص التربة في المختبر',cap:'حسب الاختبار',sets:{'Atterberg':' BS 1377-2 | Casagrande','Proctor':'Standard or Modified ASTM D698/D1557','Grading':'Sieve + Hydrometer BS 1377-2','Consolidation':'Oedometer — BS 1377-5'},qc:['معايرة الأجهزة (Annual)','عينات مُغلقة ومُرقّمة','تقرير معتمد من مختبر ثالث','حفظ عينة مرجعية 30 يوم'],acc:'Per test standard limits — compare with site design assumptions',safe:'SDS لكل كيماوي | تهوية المختبر'},
].map(function(e){return `
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
  <div style="background:rgba(46,204,113,0.06);padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)">
    <span style="font-size:24px">${e.emoji}</span>
    <div><div style="font-size:14px;font-weight:700;color:var(--text)">${e.ar}</div><div style="font-size:10px;color:#2ecc71">${e.ref}</div></div>
  </div>
  <div style="padding:12px 14px">
    <p style="font-size:12px;color:var(--text2);margin-bottom:10px">${e.desc} — <strong style="color:var(--text3)">${e.cap}</strong></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#2ecc71;font-weight:700;margin-bottom:6px">⚙️ المعاملات</div>
        ${Object.entries(e.sets).map(([k,v])=>`<div style="font-size:11px;color:var(--text2);display:flex;justify-content:space-between;gap:4px"><span>${k}:</span><span style="color:var(--text);font-weight:600">${v}</span></div>`).join('')}
      </div>
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#2ecc71;font-weight:700;margin-bottom:6px">✅ فحوصات QC</div>
        ${e.qc.map(c=>`<div style="font-size:11px;color:var(--text2);margin-bottom:3px">• ${c}</div>`).join('')}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <div style="background:rgba(76,175,80,0.08);border:1px solid rgba(76,175,80,0.2);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#4CAF50;font-weight:700;margin-bottom:4px">📐 معيار القبول</div>
        <div style="font-size:11px;color:var(--text2)">${e.acc}</div>
      </div>
      <div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#e74c3c;font-weight:700;margin-bottom:4px">⚠️ السلامة</div>
        <div style="font-size:11px;color:var(--text2)">${e.safe}</div>
      </div>
    </div>
  </div>
</div>`}).join('')}
</div>
`},
});
