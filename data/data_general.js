// QatarSpec Data File — Auto-generated
// Do not edit manually — extracted from index.html

(function() {
  if (!window.detailData) window.detailData = {};
  Object.assign(window.detailData, {
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

// ════════════════════════════════════════════════════════════════
// المرحلة ٩ — محلل المخططات الذكي (Drawing Analyzer)
// ════════════════════════════════════════════════════════════════
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



  });
})();
