// QatarSpec Pro — structural data chunk
// Lazy-loaded on first section access
window.QSP = window.QSP || {};
window.QSP.chunks = window.QSP.chunks || {};
Object.assign(window.QSP.chunks, {
structural: { title: '🏛️ الكود الإنشائي القطري', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">أعمال الخرسانة المسلحة — الصب والمعالجة</span>
</div>
<button onclick="document.getElementById('vid-structural').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-structural" accept="video/*" style="display:none" data-player="vid-player-structural" data-ph="vid-placeholder-structural" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-placeholder-structural" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">تحضير الخرسانة، الصب، المعالجة في الطقس الحار</div>
<div style="font-size:11px;color:var(--text3);">اضغط "رفع فيديو" لتحميل ملف MP4</div>
</div>
<div id="vid-player-structural" class="qs-vid-ph" data-maxh="280px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 5 | Structural Works
</div>
<h3>🏗️ اختر القسم</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('concrete_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🏗️</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الConcrete" data-en="Concrete">الConcrete</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Mix Design + صب + Curing</div></div>
<div onclick="QS.openDetail('rebar_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Rebar التسليح</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Grade 500B + Cover + Lap</div></div>
<div onclick="QS.openDetail('foundations_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🏛️</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الأساسات" data-en="Foundations">الأساسات</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Strip + Raft + Piles</div></div>
<div onclick="QS.openDetail('formwork_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🪵</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الشدات" data-en="Formwork">الشدات</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Formwork + Striking Times</div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
<div onclick="QS.openDetail('structural_materials')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:13px;">مواد الإنشاء</div></div>
<div onclick="QS.openDetail('structural_qcp')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📊</div><div style="color:var(--gold);font-weight:700;font-size:13px;">خطة الجودة QCP</div></div>
<div onclick="QS.openDetail('ms_concrete')" style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📝</div><div style="color:#3498db;font-weight:700;font-size:13px;">Method Statement</div><div style="color:var(--text3);font-size:11px;">Concrete Works</div></div>
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📋</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP الConcrete</div></div>
<div onclick="QS.openDetail('itp_rebar')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📋</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP الRebar</div></div>
</div>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,70,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">Reinforced Concrete — Pouring & Curing</span>
</div>
<button onclick="document.getElementById('vid-structural-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-structural-en" accept="video/*" style="display:none" data-player="vid-player-structural-en" data-ph="vid-placeholder-structural-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-placeholder-structural-en" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">Concrete preparation, pouring, hot weather curing</div>
<div style="font-size:11px;">Click "Upload Video" to load MP4 file</div>
</div>
<div id="vid-player-structural-en" class="qs-vid-ph" data-maxh="280px"></div>
</div>

<h3>📐 Structural Works — QCS 2024 Section 5</h3>
<p>Select a structural section to view full specifications, ITPs, and quality control requirements.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
<div onclick="QS.openDetail('concrete_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div>🏗️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Concrete Works</div></div>
<div onclick="QS.openDetail('rebar_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div>🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Reinforcement</div></div>
<div onclick="QS.openDetail('foundations_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div>🏛️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Foundations</div></div>
<div onclick="QS.openDetail('formwork_overview')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div>🪵</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Formwork</div></div>
</div>
</div>
` },
execution: { title: '⚒️ مراحل تنفيذ المشاريع', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">تنفيذ الأساسات والهياكل الخرسانية</span>
</div>
<button onclick="document.getElementById('vid-execution').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-execution" accept="video/*" style="display:none" data-player="vid-player-execution" data-ph="vid-placeholder-execution" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-placeholder-execution" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">حفر، أساسات، عزل مائي، خرسانة مسلحة</div>
<div style="font-size:11px;color:var(--text3);">اضغط "رفع فيديو" لتحميل ملف MP4</div>
</div>
<div id="vid-player-execution" class="qs-vid-ph" data-maxh="280px"></div>
</div>

<h3>الخطوات الأساسية</h3><table class="dm-table"><tr><th>المرحلة</th><th>الأعمال</th><th>المتطلبات</th></tr><tr><td>1 - الجسات</td><td>اختبارات التربة</td><td>تقرير جيوتكني</td></tr><tr><td>2 - الحفر</td><td>حفر وتدعيم</td><td>موافقة المهندس</td></tr><tr><td>3 - الأساسات</td><td>صب الأساسات</td><td>اختبار العينات</td></tr><tr><td>4 - الهيكل</td><td>الأعمدة والأسقف</td><td>فحص الRebar</td></tr><tr><td>5 - المرافق</td><td>الكهرباء والسباكة</td><td>رسومات معتمدة</td></tr><tr><td>6 - التشطيب</td><td>جميع التشطيبات</td><td>شهادات المواد</td></tr></table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,70,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">Foundation & Structural Concrete Execution</span>
</div>
<button onclick="document.getElementById('vid-execution-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-execution-en" accept="video/*" style="display:none" data-player="vid-player-execution-en" data-ph="vid-placeholder-execution-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-placeholder-execution-en" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">Excavation, foundations, waterproofing, reinforced concrete</div>
<div style="font-size:11px;">Click "Upload Video" to load MP4 file</div>
</div>
<div id="vid-player-execution-en" class="qs-vid-ph" data-maxh="280px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ⚒️ مراحل تنفيذ المشاريع
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
materials: { title: '🧱 مواد البناء والمنتجات', content: `
<div class="lang-content-ar">
<h3>المواصفات الأساسية</h3><table class="dm-table"><tr><th>المادة</th><th>المعيار</th><th>الملاحظة</th></tr><tr><td>الأسمنت</td><td>BS EN 197-1</td><td>مقاوم للكبريتات</td></tr><tr><td>الRebar</td><td>BS 4449</td><td>درجة 500B</td></tr><tr><td>الConcrete</td><td>QCS-2024</td><td>نسبة ماء/أسمنت ≤ 0.45</td></tr><tr><td>الطوب</td><td>BS EN 771</td><td>مقاومة ≥ 7 N/mm²</td></tr></table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🧱 مواد البناء والمنتجات
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>مواد البناء الرئيسية — QCS 2024</h3>
<table class="dm-table"><thead><tr><th>المادة</th><th>المعيار</th><th>الاشتراطات الرئيسية</th><th>اعتماد المصدر</th></tr></thead><tbody>
<tr><td><strong>الإسمنت OPC</strong></td><td>BS EN 197-1 / ASTM C150</td><td>C3A ≤8% للبيئة العدوانية<br>Fineness ≥275 m²/kg</td><td>QAQC approved list</td></tr>
<tr><td><strong>SRPC</strong></td><td>BS 4027 / ASTM C150 Type V</td><td>C3A ≤3.5% | SO₃ >0.5% في التربة</td><td>إلزامي في Sabkha</td></tr>
<tr><td><strong>GGBS</strong></td><td>BS EN 15167</td><td>≥50% replacement للسلفات</td><td>مع OPC أو SRPC</td></tr>
<tr><td><strong>Aggregate (Gabbro)</strong></td><td>BS EN 12620 / ASTM C33</td><td>LA ≤35% (Subbase) ≤30% (Base) ≤25% (WC) // QCS-2024 Verified: P6<br>Flakiness ≤25%</td><td>Approved quarry</td></tr>
<tr><td><strong>Bitumen 60/70</strong></td><td>ASTM D946</td><td>Penetration 60-70 @25°C<br>Softening Point ≥49°C</td><td>Per consignment</td></tr>
<tr><td><strong>PMB 45/80-65</strong></td><td>EN 14023</td><td>Elastic Recovery ≥70%<br>Softening Point ≥65°C</td><td>Per consignment</td></tr>
<tr><td><strong>HDPE Pipe</strong></td><td>ISO 4427 / BS EN 12201</td><td>PE100 SDR11/17<br>MRS 10 MPa</td><td>KAHRAMAA approved</td></tr>
<tr><td><strong>uPVC Pipe</strong></td><td>BS EN 1401 / ASTM D3034</td><td>SN4/SN8 ring stiffness</td><td>Ashghal approved</td></tr>
<tr><td><strong>DI Pipe</strong></td><td>BS EN 545</td><td>Cement mortar lined<br>Zinc + PE external</td><td>KAHRAMAA approved</td></tr>
<tr><td><strong>Steel Rebar B500B</strong></td><td>BS 4449</td><td>fy ≥500 | fu ≥600 | fu/fy 1.15-1.35<br>Elongation ≥14%</td><td>Mill certificate + site test</td></tr>
</tbody></table>
` },
testing: { title: '🔬 الاختبارات والفحص', content: `
<div class="lang-content-ar">
<h3>اختبارات إلزامية</h3><p>• <strong>SPT:</strong> Standard Penetration Test للتربة</p><p>• <strong>قوة الConcrete:</strong> مكعبات 150×150 عند 7 و 28 يوم</p><p>• <strong>الRebar:</strong> شد وانحناء لكل دفعة</p><p>• <strong>الكبريتات والكلوريدات:</strong> في التربة والمياه</p><h3>عدد الجسات</h3><p>• جسة واحدة لكل 500 م² كحد أدنى</p><p>• عمق يتجاوز مستوى التأثير بـ 5 متر</p>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🔬 الاختبارات والفحص
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>قاعدة بيانات الاختبارات الشاملة — QCS 2024</h3>
<table class="dm-table"><thead><tr><th>الاختبار</th><th>المعيار</th><th>التطبيق</th><th>التكرار</th><th>HP/W</th></tr></thead><tbody>
<tr><td>Standard Proctor</td><td>ASTM D698</td><td>Subgrade/Fill</td><td>Per source change</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Modified Proctor</td><td>ASTM D1557</td><td>Base/Subbase</td><td>Per source change</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Field Density (Sand Cone)</td><td>ASTM D1556</td><td>كل الطبقات</td><td>1/500m² per layer</td><td style="color:#f39c12">W</td></tr>
<tr><td>CBR (Soaked 4 days)</td><td>ASTM D1883</td><td>Subgrade/Subbase/Base</td><td>1/2000m²</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Atterberg Limits</td><td>ASTM D4318</td><td>Soil classification</td><td>1/500m³</td><td style="color:#f39c12">W</td></tr>
<tr><td>LA Abrasion</td><td>ASTM C131</td><td>Aggregate quality</td><td>Per source</td><td style="color:#f39c12">W</td></tr>
<tr><td>Marshall Stability</td><td>ASTM D6927</td><td>Asphalt mix</td><td>1/200 tonne</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Bitumen Extraction</td><td>ASTM D2172</td><td>AC% verification</td><td>1/200 tonne</td><td style="color:#f39c12">W</td></tr>
<tr><td>Core Density</td><td>ASTM D2041</td><td>Compacted asphalt</td><td>1/1000m²</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Cube Test (7d + 28d)</td><td>BS EN 12390</td><td>Concrete strength</td><td>6 cubes/50m³</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Slump Test</td><td>BS EN 12350</td><td>Concrete workability</td><td>Every truck</td><td style="color:#f39c12">W</td></tr>
<tr><td>Rebar Tensile Test</td><td>BS 4449</td><td>Steel quality</td><td>Per consignment</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Pressure Test (Water)</td><td>KAHRAMAA</td><td>Water supply pipe</td><td>Per section ≤500m</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Air Test (Sewer)</td><td>BS EN 1610</td><td>Foul sewer pipe</td><td>Per section ≤500m</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>CCTV Survey</td><td>BS EN 13508</td><td>Sewer inspection</td><td>100% pipes</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Chlorination</td><td>KAHRAMAA</td><td>Water disinfection</td><td>Per section</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>SPT</td><td>ASTM D1586</td><td>Soil strength</td><td>Every 1.5m depth</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Sulphate SO₃</td><td>BS 1377</td><td>Soil/water chemistry</td><td>1/500m³</td><td style="color:#f39c12">W</td></tr>
</tbody></table>
` },
fire: { title: '🔥 الحريق والسلامة — QCDD', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 17 | Fire & Safety + QCDD Requirements</div>
<h3>📋 الجهة المختصة في قطر</h3>
<p>كل متطلبات الحريق في قطر تخضع لموافقة <strong>QCDD (Qatar Civil Defence Department)</strong>. لا يُسمح بتشغيل أي مبنى بدون موافقة QCDD.</p>
<h3>📐 أنظمة الإطفاء — Fire Suppression</h3>
<table class="dm-table"><tr><th>النظام</th><th>الاستخدام</th><th>المواصفة</th></tr>
<tr><td>Sprinkler System</td><td>جميع المباني التجارية والسكنية > 15m</td><td>NFPA 13</td></tr>
<tr><td>FM200 / Novec</td><td>غرف الخوادم والأرشيف</td><td>NFPA 2001</td></tr>
<tr><td>Foam System</td><td>محطات الوقود والمستودعات</td><td>NFPA 11</td></tr>
<tr><td>Dry Powder</td><td>المواد الكيميائية والمطابخ</td><td>QCDD Std</td></tr>
</table>
<h3>📐 كشف الحريق — Fire Detection</h3>
<table class="dm-table"><tr><th>النوع</th><th>الاستخدام</th></tr>
<tr><td>Smoke Detector (Optical)</td><td>المكاتب والغرف والممرات</td></tr>
<tr><td>Heat Detector</td><td>المطابخ والمستودعات</td></tr>
<tr><td>Beam Detector</td><td>المساحات المفتوحة الكبيرة</td></tr>
<tr><td>Manual Call Point</td><td>عند كل مخرج — كل 30m</td></tr>
<tr><td>Fire Alarm Panel</td><td>مركزي + مكرر عند مدخل المبنى</td></tr>
</table>
<h3>🚪 مخارج الطوارئ — Emergency Exits</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>أقصى مسافة للمخرج</td><td>45m (مبنى عادي) / 30m (خطر عالي)</td></tr>
<tr><td>عرض الباب الأدنى</td><td>900mm</td></tr>
<tr><td>عرض الممر</td><td>1200mm أدنى</td></tr>
<tr><td>لافتات Exit</td><td>مضاءة + بطارية احتياطية</td></tr>
<tr><td>إضاءة الطوارئ</td><td>3 ساعات احتياطي</td></tr>
<tr><td>درج الطوارئ</td><td>مقاوم للحريق — 2 hour</td></tr>
</table>
<h3>🧯 طفايات الحريق</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>التوزيع</td><td>كل 200m² أو كل 30m</td></tr>
<tr><td>الارتفاع</td><td>≤ 1500mm من الأرض</td></tr>
<tr><td>النوع</td><td>ABC Dry Powder للاستخدام العام</td></tr>
<tr><td>الصيانة</td><td>فحص سنوي + شحن كل 5 سنوات</td></tr>
</table>
<h3>💧 نظام الإطفاء اليدوي — Hose Reel & Hydrant</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>Hose Reel</td><td>كل 30m — طول 30m</td></tr>
<tr><td>Fire Hydrant خارجي</td><td>كل 60m على الطريق</td></tr>
<tr><td>Siamese Connection</td><td>عند مدخل كل مبنى</td></tr>
<tr><td>ضغط التشغيل</td><td>≥ 2.5 bar عند أعلى نقطة</td></tr>
<tr><td>خزان الاحتياطي</td><td>حسب QCDD — عادة 20-50m³</td></tr>
</table>
<h3>🔴 متطلبات QCDD القطرية</h3>
<p>• موافقة QCDD على المخططات قبل التنفيذ<br>• فحص QCDD أثناء التنفيذ (Hold Point)<br>• اختبار شامل للأنظمة قبل الاستلام<br>• شهادة QCDD للإشغال إلزامية<br>• تجديد الترخيص سنوياً</p>
<h3>🧪 الاختبارات قبل التسليم</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th></tr>
<tr><td>Sprinkler Pressure Test</td><td>1.5x ضغط التشغيل / 2 hour</td></tr>
<tr><td>Fire Alarm Full Test</td><td>100% الأجهزة تعمل</td></tr>
<tr><td>Emergency Lighting</td><td>3 ساعات تشغيل مستمر</td></tr>
<tr><td>Exit Signs</td><td>مرئية من 30m</td></tr>
<tr><td>Smoke Evacuation</td><td>6 تبادل هواء/hour</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🔥 Fire & Safety — QCDD Requirements</h3>
<table class="dm-table">
<tr><th>System</th><th>Standard</th><th>Requirement</th></tr>
<tr><td>Sprinkler</td><td>NFPA 13</td><td>All commercial buildings > 15m</td></tr>
<tr><td>Fire Alarm</td><td>QCDD Std</td><td>100% coverage + backup power 3hr</td></tr>
<tr><td>Emergency Exits</td><td>QCDD</td><td>Max 45m travel distance, 900mm door</td></tr>
<tr><td>Fire Extinguishers</td><td>QCDD</td><td>Per 200m² or every 30m</td></tr>
<tr><td>Hose Reel</td><td>QCDD</td><td>Every 30m, 30m length</td></tr>
<tr><td>Hydrant</td><td>QCDD</td><td>Every 60m on road</td></tr>
<tr><td>QCDD Approval</td><td>Mandatory</td><td>Drawings + During + Pre-handover</td></tr>
</table>
</div>
` },
structural_full: { title: '🏗️ الكود الإنشائي — QCS 2024', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Structural Works</div>
<h3>📌 اختر القسم للتفاصيل الكاملة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('concrete_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:28px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الConcrete" data-en="Concrete">الConcrete</div><div style="color:var(--text3);font-size:11px;margin-top:4px;">Concrete Works</div></div>
<div onclick="QS.openDetail('rebar_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:28px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Rebar التسليح</div><div style="color:var(--text3);font-size:11px;margin-top:4px;">Reinforcement</div></div>
<div onclick="QS.openDetail('foundations_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:28px">⚓</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الأساسات" data-en="Foundations">الأساسات</div><div style="color:var(--text3);font-size:11px;margin-top:4px;">Foundations</div></div>
<div onclick="QS.openDetail('piles_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:28px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الخوازيق" data-en="Piling">الخوازيق</div><div style="color:var(--text3);font-size:11px;margin-top:4px;">Bored Piles</div></div>
<div onclick="QS.openDetail('formwork_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:28px">🪵</div><div style="color:var(--gold);font-weight:700;font-size:14px;" data-ar="الشدات" data-en="Formwork">الشدات</div><div style="color:var(--text3);font-size:11px;margin-top:4px;">Formwork</div></div>
<div onclick="QS.openDetail('itp_structural')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:28px">📋</div><div style="color:var(--gold);font-weight:700;font-size:14px;">ITPs الإنشاء</div><div style="color:var(--text3);font-size:11px;margin-top:4px;">Inspection & Test Plans</div></div>
</div>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🏗️ الكود الإنشائي — QCS 2024
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
concrete_full: { title: '🧱 الConcrete — Concrete Works', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Concrete</div>
<h3>📋 نظرة عامة</h3>
<p>الConcrete في قطر تواجه تحديات خاصة — حرارة شديدة، كبريتات عالية في التربة، ومياه جوفية مالحة. SRPC (Sulphate Resisting Portland Cement) إلزامي في معظم المشاريع.</p>
<h3>📐 درجات الConcrete — QCS 2024</h3>
<table class="dm-table"><tr><th>الدرجة</th><th>fcu (N/mm²)</th><th>w/c Max</th><th>الاستخدام</th></tr>
<tr><td>C15</td><td>15</td><td>0.65</td><td>بياض (Blinding) فقط</td></tr>
<tr><td>C25</td><td>25</td><td>0.55</td><td>أساسات بسيطة — تربة عادية</td></tr>
<tr><td>C30</td><td>30</td><td>0.50</td><td>أعمدة وبلاطات — بيئة عادية</td></tr>
<tr><td>C35</td><td>35</td><td>0.45</td><td>بيئة كبريتات — Manholes — Piles</td></tr>
<tr><td>C40</td><td>40</td><td>0.40</td><td>مناطق بحرية — تعرض شديد</td></tr></table>
<h3>📐 المواصفات العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>الأسمنت</td><td>SRPC إلزامي في قطر (معظم المشاريع)</td><td>BS EN 197-1</td></tr>
<tr><td>نسبة الماء/الأسمنت</td><td>≤ 0.45 (بيئة قطر)</td><td>QCS S5 P3</td></tr>
<tr><td>Slump — صب عادي</td><td>75-100mm</td><td>QCS S5 P3</td></tr>
<tr><td>Slump — بمضخة</td><td>100-150mm</td><td>QCS S5 P3</td></tr>
<tr><td>الكلوريد في الركام</td><td>≤ 0.04%</td><td>QCS S5 P3</td></tr>
<tr><td>Sulphate في الركام</td><td>≤ 4% SO3</td><td>QCS S5 P3</td></tr>
<tr><td>درجة حرارة التوريد</td><td>≤ 32°C (عند وصول العربة)</td><td>QCS S5 P3</td></tr>
<tr style="background:rgba(46,204,113,0.08)"><td><strong>🆕 درجة حرارة الصب</strong></td><td><strong style="color:#2ecc71">≤ 35°C عند نقطة الصب</strong></td><td>QCS S5 P4</td></tr>
<tr><td>الCompaction</td><td>Vibrator — كل 500mm طبقة</td><td>QCS S5 P3</td></tr></table>
<h3>🔧 طريقة التنفيذ</h3>
<p><strong>1. قبل الصب:</strong><br>
• فحص الشدة والRebar — اعتماد المهندس (HP)<br>
• تنظيف القالب من الغبار والمياه الراكدة<br>
• رش Release Agent على الشدة<br>
• فحص أماكن الـ Spacers والـ Cover<br>
• اختبار Slump من أول حمولة</p>
<p><strong>2. أثناء الصب:</strong><br>
• Slump Test من كل مجموعة حمولات<br>
• أخذ مكعبات (3 مكعبات / 50m³ كحد أدنى)<br>
• Compaction بـ Vibrator كل 500mm — عدم الإفراط<br>
• في الصيف: صب بعد الغروب أو بالليل<br>
• تبريد الركام والماء في الصيف</p>
<p><strong>3. المعالجة (Curing) — حرجة جداً في قطر:</strong><br>
• OPC: ≥ 7 أيام رطوبة مستمرة<br>
• SRPC: ≥ 10 أيام<br>
• بيئة عدوانية: ≥ 14 يوم<br>
• Curing Compound بديل الرطوبة في المناطق الصعبة</p>
<h3>🧪 الاختبارات المطلوبة</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th><th>التوقيت</th></tr>
<tr><td>Slump Test</td><td>حسب نوع الصب</td><td>كل حمولة أولى + كل 50m³</td><td>أثناء الصب</td></tr>
<tr><td>Cube Test — 7 يوم</td><td>≥ 70% fcu</td><td>3 مكعبات / 50m³</td><td>7 أيام بعد الصب</td></tr>
<tr><td>Cube Test — 28 يوم</td><td>≥ 100% fcu</td><td>نفس المجموعة</td><td>28 يوم بعد الصب</td></tr>
<tr><td>درجة حرارة الConcrete</td><td>≤ 32°C</td><td>كل حمولة (صيف)</td><td>أثناء الصب</td></tr>
<tr><td>Mix Design Approval</td><td>قبل الإنتاج</td><td>مرة لكل Mix</td><td>قبل الصب</td></tr></table>
<h3>📐 Cover الإلزامي</h3>
<table class="dm-table"><tr><th>العنصر</th><th>Cover</th><th>الملاحظة</th></tr>
<tr><td>أساسات</td><td>75mm</td><td>مباشر على التربة</td></tr>
<tr><td>أعمدة خارجية</td><td>40mm</td><td>تعرض للجو</td></tr>
<tr><td>أعمدة داخلية</td><td>25mm</td><td>محمية</td></tr>
<tr><td>بلاطات خارجية</td><td>40mm</td><td>تعرض للجو</td></tr>
<tr><td>بلاطات داخلية</td><td>20mm</td><td>محمية</td></tr>
<tr><td>خوازيق</td><td>75mm</td><td>تربة مباشرة</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد Mix Design قبل الإنتاج<br>
• <strong>HP-02:</strong> فحص الشدة والRebar والـ Cover قبل الصب<br>
• <strong>HP-03:</strong> نتائج مكعبات 28 يوم قبل فك الشدة أو تحميل العنصر</p>
<h3>⚠️ تنبيهات خاصة بقطر</h3>
<p>• <strong>SRPC إلزامي</strong> في معظم مناطق قطر (كبريتات عالية)<br>
• <strong>Hot Weather Concreting:</strong> درجة حرارة الConcrete ≤ 32°C — اصعب حاجة في قطر<br>
• <strong>Curing:</strong> الإهمال في قطر يسبب تشقق سريع بسبب التبخر<br>
• <strong>Admixtures:</strong> Water Reducer + Retarder إلزامي في الصيف</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🧱 الConcrete — Concrete Works
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
rebar_full: { title: '🔩 Rebar التسليح — Reinforcement', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 2 | Reinforcement</div>
<h3>📐 المواصفات الفنية — Grade 500B</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>الدرجة</td><td>Grade 500B</td><td>BS 4449</td></tr>
<tr><td>Yield Strength (fy)</td><td>≥ 500 N/mm²</td><td>BS 4449</td></tr>
<tr><td>Ultimate Strength (fu)</td><td>≥ 600 N/mm²</td><td>BS 4449</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.15</td><td>BS 4449</td></tr>
<tr><td>Elongation</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend Test</td><td>180° بدون تشقق</td><td>BS 4449</td></tr></table>
<h3>📐 أطوال الوصلات — Lap Lengths</h3>
<table class="dm-table"><tr><th>نوع الوصلة</th><th>الطول</th><th>الملاحظة</th></tr>
<tr><td>Tension — عادي</td><td>40d</td><td>d = قطر الRebar</td></tr>
<tr><td>Tension — بيئة عدوانية</td><td>50d</td><td>قطر + تربة كبريتات</td></tr>
<tr><td>Compression</td><td>30d</td><td>أعمدة ضغط</td></tr></table>
<h3>📐 نصف قطر الانحناء — Bend Radius</h3>
<table class="dm-table"><tr><th>القطر</th><th>نصف قطر الانحناء</th></tr>
<tr><td>≤ 16mm</td><td>≥ 3.5d</td></tr>
<tr><td>&gt; 16mm</td><td>≥ 4d</td></tr></table>
<h3>🔧 طريقة التنفيذ</h3>
<p><strong>1. الاستلام:</strong><br>
• فحص شهادة المصنع (Mill Certificate)<br>
• التأكد من Grade 500B مكتوبة على القضبان<br>
• Tensile Test لكل 50 طن / كل قطر</p>
<p><strong>2. التخزين:</strong><br>
• رفع عن الأرض ≥ 100mm (لمنع الصدأ)<br>
• تغطية في الجو الرطب<br>
• فصل الأقطار المختلفة</p>
<p><strong>3. التنفيذ:</strong><br>
• Spacers بالأحجام الصح لضمان الـ Cover<br>
• Tie Wire لربط التقاطعات<br>
• فحص المسافات والـ Cover قبل الصب<br>
• عدم ثني الRebar المدفون في الConcrete</p>
<h3>🧪 الاختبارات</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Tensile Test</td><td>fy≥500 | fu≥600 | fu/fy≥1.15</td><td>كل 50 طن / قطر</td></tr>
<tr><td>Bend Test</td><td>180° بدون تشقق</td><td>كل 50 طن / قطر</td></tr>
<tr><td>Elongation</td><td>≥ 14%</td><td>من نفس عينة Tensile</td></tr>
<tr><td>Mill Certificate</td><td>مطابقة BS 4449</td><td>كل دفعة</td></tr>
<tr><td>Cover Check</td><td>حسب نوع العنصر</td><td>قبل كل صب</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد Mill Certificate قبل استخدام الRebar<br>
• <strong>HP-02:</strong> فحص الRebar والـ Cover والـ Spacers قبل الصب</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🔩 Rebar التسليح — Reinforcement
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
foundations_full: { title: '⚓ الأساسات — Foundations', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundations</div>
<h3>📋 نظرة عامة</h3>
<p>الأساسات في قطر تواجه تحدي الكبريتات العالية في التربة والمياه الجوفية. SRPC إلزامي وCover 75mm حد أدنى.</p>
<h3>📐 أنواع الأساسات</h3>
<table class="dm-table"><tr><th>النوع</th><th>الاستخدام</th><th>درجة الConcrete</th></tr>
<tr><td>Pad Foundation</td><td>أعمدة منفردة — أحمال خفيفة</td><td>C30-C35</td></tr>
<tr><td>Strip Foundation</td><td>جدران حاملة</td><td>C30-C35</td></tr>
<tr><td>Raft Foundation</td><td>أحمال كبيرة — تربة ضعيفة</td><td>C35-C40</td></tr>
<tr><td>Pile Cap</td><td>فوق الخوازيق</td><td>C35</td></tr></table>
<h3>📐 المواصفات العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>Blinding Concrete</td><td>C15 — 75mm سماكة قبل الRebar</td></tr>
<tr><td>Cover</td><td>75mm (مباشر على التربة)</td></tr>
<tr><td>درجة الConcrete</td><td>C35 كحد أدنى في قطر (كبريتات)</td></tr>
<tr><td>Dewatering</td><td>إلزامي قبل صب الأساسات</td></tr>
<tr><td>Waterproofing</td><td>إلزامي للأساسات تحت Level المياه</td></tr>
<tr><td>Sulphate Attack</td><td>SRPC + w/c ≤ 0.45</td></tr></table>
<h3>🔧 طريقة التنفيذ</h3>
<p><strong>1. الحفر:</strong><br>
• الحفر للعمق المطلوب + 75mm للـ Blinding<br>
• Dewatering قبل أي صب<br>
• فحص التربة بصرياً — لا تربة ضعيفة أو Sabkha<br>
• موافقة المهندس الاستشاري على مستوى الحفر</p>
<p><strong>2. Blinding:</strong><br>
• صب C15 سماكة 75mm<br>
• انتظار ≥ 24 hour<br>
• نظيف ومستوٍ قبل وضع الRebar</p>
<p><strong>3. الRebar والشدة:</strong><br>
• Spacers 75mm لضمان الـ Cover<br>
• فحص وتوثيق قبل الصب (HP)</p>
<p><strong>4. الصب:</strong><br>
• C35 SRPC كحد أدنى<br>
• Slump Test من أول حمولة<br>
• Cube Samples — 3 مكعبات / 50m³<br>
• Curing ≥ 7 أيام رطوبة مستمرة</p>
<h3>🧪 الاختبارات</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Soil Bearing Capacity</td><td>حسب التصميم</td><td>قبل الصب</td></tr>
<tr><td>Slump Test</td><td>حسب نوع الصب</td><td>كل حمولة أولى</td></tr>
<tr><td>Cube Test 7 يوم</td><td>≥ 70% fcu</td><td>3/50m³</td></tr>
<tr><td>Cube Test 28 يوم</td><td>≥ 100% fcu</td><td>3/50m³</td></tr>
<tr><td>Cover Check</td><td>75mm</td><td>قبل كل صب</td></tr>
<tr><td>Sulphate Test</td><td>≤ 0.5% في التربة</td><td>قبل الصب</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> موافقة المهندس على مستوى الحفر<br>
• <strong>HP-02:</strong> اعتماد الRebar والـ Cover قبل الصب<br>
• <strong>HP-03:</strong> نتائج مكعبات 28 يوم</p>
<h3>⚠️ تنبيهات قطر</h3>
<p>• Sabkha تحت الأساس = كارثة — فحص إلزامي<br>
• المياه الجوفية المالحة تتطلب Waterproofing إضافي<br>
• لا تصب على تربة جافة جداً — رش مياه أولاً</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ⚓ الأساسات — Foundations
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
piles_full: { title: '🔧 الخوازيق — Bored Piles', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Bored Piles</div>
<h3>📐 المواصفات الفنية</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>درجة الConcrete</td><td>C35 SRPC كحد أدنى</td><td>QCS S5</td></tr>
<tr><td>w/c</td><td>≤ 0.45</td><td>QCS S5</td></tr>
<tr><td>Slump</td><td>160-220mm (Self Compacting)</td><td>QCS S5</td></tr>
<tr><td>Cover</td><td>75mm</td><td>QCS S5</td></tr>
<tr><td>Verticality</td><td>≤ 1:75 انحراف</td><td>QCS S5</td></tr>
<tr><td>Position Tolerance</td><td>≤ 75mm من المحور</td><td>QCS S5</td></tr>
<tr><td>Cut-off Level</td><td>حسب التصميم ± 25mm</td><td>QCS S5</td></tr></table>
<h3>🔧 طريقة التنفيذ</h3>
<p><strong>1. الحفر:</strong><br>
• استخدام Temporary Casing في التربة الرخوة<br>
• Bentonite Slurry لدعم جدران الحفر<br>
• فحص عمق الحفر والتربة في القاع<br>
• Base Cleaning قبل وضع الRebar</p>
<p><strong>2. الRebar:</strong><br>
• Rebar Cage مجهز مسبقاً<br>
• Spacers دائرية كل 2m لضمان Cover<br>
• إنزال الـ Cage بعناية بدون تحريك الجدران</p>
<p><strong>3. الصب:</strong><br>
• Tremie Pipe من القاع للأعلى<br>
• الصب المستمر بدون توقف<br>
• مستوى الConcrete يعلو فوق Cut-off Level بـ 500mm<br>
• كسر الرأس الزائد بعد التصلد</p>
<h3>🧪 الاختبارات</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>PIT (Pile Integrity Test)</td><td>100% كل الخوازيق</td><td>بعد التصلد</td></tr>
<tr><td>Static Load Test</td><td>2x الحمل التصميمي</td><td>1-2% من العدد الكلي</td></tr>
<tr><td>Verticality Check</td><td>≤ 1:75</td><td>أثناء الحفر</td></tr>
<tr><td>Slump Test</td><td>160-220mm</td><td>كل حمولة</td></tr>
<tr><td>Cube Test 28 يوم</td><td>≥ 35 N/mm²</td><td>3/50m³</td></tr>
<tr><td>Base Cleaning</td><td>بصري + فحص التربة</td><td>كل خازوق</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد عمق الحفر والتربة في القاع<br>
• <strong>HP-02:</strong> فحص Rebar Cage والـ Cover قبل الصب<br>
• <strong>HP-03:</strong> اعتماد PIT قبل صب Pile Cap<br>
• <strong>HP-04:</strong> اعتماد Static Load Test</p>
<h3>⚠️ تنبيهات قطر</h3>
<p>• Sabkha تغير خصائصها مع العمق — جسات كافية إلزامية<br>
• المياه الجوفية المالحة تؤثر على Bentonite — مراقبة مستمرة<br>
• في الصيف: صب ليلاً لتجنب تسريع الشك</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🔧 الخوازيق — Bored Piles
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
formwork_full: { title: '🪵 الشدات — Formwork', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Formwork</div>
<h3>📐 المواصفات</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>مقاومة الشدة</td><td>تتحمل ضغط الConcrete + الأحمال الحية</td></tr>
<tr><td>الإحكام</td><td>بدون تسريب مياه أو عجينة</td></tr>
<tr><td>الاستقامة</td><td>Straightedge 3m ≤ 6mm</td></tr>
<tr><td>Release Agent</td><td>إلزامي قبل الصب</td></tr>
<tr><td>تنظيف الداخل</td><td>خالي من الغبار والخشب والمياه</td></tr></table>
<h3>⏱️ أوقات فك الشدة — Stripping Times</h3>
<table class="dm-table"><tr><th>العنصر</th><th>OPC</th><th>SRPC</th><th>الشرط</th></tr>
<tr><td>جانبية الأعمدة والجدران</td><td>24 hour</td><td>36 hour</td><td>fcu ≥ 5 N/mm²</td></tr>
<tr><td>جانبية الأسقف (Soffit)</td><td>4 أيام</td><td>6 أيام</td><td>fcu ≥ 10 N/mm²</td></tr>
<tr><td>Props تحت الأسقف</td><td>10 أيام</td><td>14 يوم</td><td>fcu ≥ 70% fcu التصميمي</td></tr>
<tr><td>Props تحت الكمرات</td><td>14 يوم</td><td>21 يوم</td><td>fcu ≥ 70% fcu التصميمي</td></tr></table>
<h3>⚠️ تنبيهات مهمة</h3>
<p>• <strong>لا فك شدة قبل نتائج مكعبات 7 أيام</strong><br>
• في قطر: SRPC أبطأ في الشك — أوقات أطول<br>
• Props لا تُزال إلا بموافقة المهندس الاستشاري<br>
• Back Propping إلزامي للطوابق المتعددة</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> فحص الشدة قبل الصب<br>
• <strong>HP-02:</strong> موافقة المهندس قبل فك الـ Props</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🪵 الشدات — Formwork
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
itp_structural: { title: '📋 ITPs الإنشاء — Structural ITPs', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Structural ITPs</div>
<h3>📌 اختر الـ ITP</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP الConcrete</div></div>
<div onclick="QS.openDetail('itp_rebar')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP الRebar</div></div>
<div onclick="QS.openDetail('itp_foundations')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⚓</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP الأساسات</div></div>
<div onclick="QS.openDetail('itp_piles')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP الخوازيق</div></div>
</div>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📋 ITPs الإنشاء — Structural ITPs
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
itp_concrete: { title: '📋 ITP — الConcrete | Concrete Works', content: `<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">أعمال الخرسانة — صب ومعالجة</span>
</div>
<div style="position:relative;width:100%;padding-bottom:56.25%;height:0;">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
  src="https://www.youtube.com/embed/xNqGOJBhE84?rel=0&modestbranding=1" 
  title="أعمال الخرسانة — صب ومعالجة" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen loading="lazy"></iframe>
</div>
<div style="padding:8px 12px;font-size:11px;color:var(--text3);">📌 تحضير الخرسانة، اختبارات Slump والمكعبات، المعالجة في قطر</div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Concrete</div>
<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Mix Design Approval</td><td>QCS S5 P3</td><td>معتمد قبل الإنتاج</td><td>كل Mix</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Mix Design</td></tr>
<tr><td>1.2</td><td>Material Approval — Cement</td><td>BS EN 197-1</td><td>SRPC Certificate</td><td>كل دفعة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Certificate</td></tr>
<tr><td>1.3</td><td>Aggregate Tests</td><td>QCS S5 P3</td><td>Chloride≤0.04% | SO3≤4%</td><td>كل مصدر</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Test Report</td></tr>
</table>
<h3>2.0 — قبل الصب</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Formwork Inspection</td><td>QCS S5</td><td>نظيف + محكم + Release Agent</td><td>كل صب</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>2.2</td><td>Rebar & Cover Check</td><td>QCS S5</td><td>Cover صح + Spacers موجودة</td><td>كل صب</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>2.3</td><td>Pour Card Approval</td><td>QCS S5</td><td>موقعة قبل الصب</td><td>كل صب</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Pour Card</td></tr>
</table>
<h3>3.0 — أثناء الصب</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Slump Test</td><td>QCS S5 P3</td><td>حسب نوع الصب</td><td>كل حمولة أولى + كل 50m³</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Slump Record</td></tr>
<tr><td>3.2</td><td>Cube Sampling</td><td>QCS S5 P3</td><td>3 مكعبات / 50m³</td><td>كل 50m³</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Cube Register</td></tr>
<tr><td>3.3</td><td>Temperature Check</td><td>QCS S5 P3</td><td>≤ 32°C (صيف قطر)</td><td>كل حمولة (صيف)</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Temp Log</td></tr>
<tr><td>3.4</td><td>Vibration Check</td><td>QCS S5 P3</td><td>كل 500mm طبقة</td><td>مستمر</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Pour Record</td></tr>
</table>
<h3>4.0 — بعد الصب</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>Cube Test — 7 يوم</td><td>QCS S5 P3</td><td>≥ 70% fcu</td><td>كل مجموعة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Test Report</td></tr>
<tr><td>4.2</td><td>Cube Test — 28 يوم</td><td>QCS S5 P3</td><td>≥ 100% fcu</td><td>كل مجموعة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Test Report</td></tr>
<tr><td>4.3</td><td>Curing Verification</td><td>QCS S5 P3</td><td>≥ 7 أيام رطوبة (SRPC: 10)</td><td>كل صب</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Curing Log</td></tr>
<tr><td>4.4</td><td>Stripping Approval</td><td>QCS S5</td><td>نتائج 7 أيام OK</td><td>قبل الفك</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">Concrete Works — Pouring & Curing</span>
</div>
<div style="position:relative;width:100%;padding-bottom:56.25%;height:0;">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
  src="https://www.youtube.com/embed/xNqGOJBhE84?rel=0&modestbranding=1" 
  title="Concrete Works — Pouring & Curing" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen loading="lazy"></iframe>
</div>
<div style="padding:8px 12px;font-size:11px;color:var(--text3);">📌 Concrete preparation, Slump and cube tests, Curing in Qatar hot weather</div>
</div>

<h3>ITP — Concrete Works</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Mix Design (JMF)</td><td>Trial Mix 7+28 day approval</td><td>Per grade</td><td>QCS S5</td><td>HP</td></tr>
<tr><td>Formwork Inspection</td><td>Level + alignment + stability</td><td>100%</td><td>IFC</td><td>HP</td></tr>
<tr><td>Rebar Inspection</td><td>Size + spacing + cover + laps</td><td>100%</td><td>IFC</td><td>HP</td></tr>
<tr><td>Slump Test</td><td>75-150mm per pour type</td><td>Every 50m³</td><td>BS EN 12350</td><td>W</td></tr>
<tr><td>Temperature Check</td><td>Concrete ≤ 32°C at pour</td><td>Every load</td><td>QCS S5</td><td>W</td></tr>
<tr><td>7-Day Cube</td><td>≥ 70% fcu</td><td>Per 50m³</td><td>BS EN 12390</td><td>HP</td></tr>
<tr><td>28-Day Cube</td><td>≥ fcu (C25/C30/C35)</td><td>Per 50m³</td><td>BS EN 12390</td><td>HP</td></tr></table>
</div>
` },
itp_rebar: { title: '📋 ITP — Rebar التسليح | Reinforcement', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 5 Part 2 | Reinforcement</div>
<h3>1.0 — استلام المواد</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Mill Certificate</td><td>BS 4449</td><td>Grade 500B مطابق</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Certificate</td></tr>
<tr><td>1.2</td><td>Tensile Test</td><td>BS 4449</td><td>fy≥500 | fu≥600 | fu/fy≥1.15</td><td>كل 50t / قطر</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Test Report</td></tr>
<tr><td>1.3</td><td>Bend Test</td><td>BS 4449</td><td>180° بدون تشقق</td><td>كل 50t / قطر</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Test Report</td></tr>
<tr><td>1.4</td><td>Elongation</td><td>BS 4449</td><td>≥ 14%</td><td>كل 50t / قطر</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Test Report</td></tr>
</table>
<h3>2.0 — قبل الصب</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Rebar Diameter & Spacing</td><td>Shop Drawings</td><td>مطابق للمخططات</td><td>كل صب</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>2.2</td><td>Cover Check</td><td>QCS S5</td><td>حسب نوع العنصر</td><td>كل صب</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>2.3</td><td>Lap Lengths</td><td>QCS S5</td><td>40d tension / 30d compression</td><td>كل صب</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>2.4</td><td>Spacers</td><td>QCS S5</td><td>موجودة بالكثافة الصح</td><td>كل صب</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Reinforcement Steel</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Mill Certificate</td><td>Tensile + Yield + Elongation</td><td>Each heat</td><td>BS 4449</td><td>HP</td></tr>
<tr><td>Third Party Test</td><td>fy ≥ 500MPa | fu ≥ 600MPa | fu/fy ≥ 1.15</td><td>Per 25t</td><td>BS 4449</td><td>HP</td></tr>
<tr><td>Bend Test</td><td>180° cold bend — no cracking</td><td>Per 25t</td><td>BS 4449</td><td>W</td></tr>
<tr><td>Lap Lengths</td><td>Per IFC drawing (min 40d)</td><td>100%</td><td>IFC</td><td>W</td></tr>
<tr><td>Cover Check</td><td>Correct spacers type and spacing</td><td>100%</td><td>QCS S5</td><td>W</td></tr>
<tr><td>Pre-pour Inspection</td><td>Alignment + stability + cleanliness</td><td>Before pour</td><td>IFC</td><td>HP</td></tr></table>
</div>
` },
itp_foundations: { title: '📋 ITP — الأساسات | Foundations', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundations</div>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Excavation Level</td><td>Design Drawing</td><td>موافقة المهندس على التربة</td><td>كل أساس</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>1.2</td><td>Dewatering</td><td>QCS S5</td><td>جاف قبل الصب</td><td>كل أساس</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>1.3</td><td>Blinding Concrete C15</td><td>QCS S5</td><td>75mm سماكة — مستوٍ</td><td>كل أساس</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Pour Record</td></tr>
<tr><td>1.4</td><td>Rebar & Cover 75mm</td><td>QCS S5</td><td>Cover 75mm + Spacers</td><td>كل أساس</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>1.5</td><td>Waterproofing</td><td>QCS S5</td><td>حسب التصميم — قبل الردم</td><td>كل أساس</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>1.6</td><td>Cube Test 28 يوم</td><td>QCS S5 P3</td><td>≥ 100% fcu</td><td>3/50m³</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Test Report</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Foundation Works</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Founding Level</td><td>Geotechnical approval of bearing stratum</td><td>100%</td><td>GI Report</td><td>HP</td></tr>
<tr><td>Blinding Concrete</td><td>C15 min 75mm thick</td><td>100%</td><td>QCS S5</td><td>W</td></tr>
<tr><td>Waterproofing</td><td>Type/thickness per spec</td><td>100%</td><td>QCS S5</td><td>W</td></tr>
<tr><td>Concrete Grade</td><td>C30 min for foundations</td><td>Every 50m³</td><td>QCS S5</td><td>HP</td></tr>
<tr><td>Backfill Compaction</td><td>≥ 95% MDD per 300mm lift</td><td>Per 500m²</td><td>ASTM D698</td><td>W</td></tr></table>
</div>
` },
itp_piles: { title: '📋 ITP — الخوازيق | Bored Piles', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 5 | Bored Piles</div>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Pile Position</td><td>Design Drawing</td><td>≤ 75mm من المحور</td><td>كل خازوق</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Survey Record</td></tr>
<tr><td>1.2</td><td>Pile Depth</td><td>Design Drawing</td><td>حسب التصميم + موافقة المهندس</td><td>كل خازوق</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Bore Log</td></tr>
<tr><td>1.3</td><td>Base Cleaning</td><td>QCS S5</td><td>نظيف بدون فضلات</td><td>كل خازوق</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>1.4</td><td>Rebar Cage & Cover</td><td>QCS S5</td><td>Cover 75mm + Spacers دائرية</td><td>كل خازوق</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>1.5</td><td>Slump Test</td><td>QCS S5</td><td>160-220mm</td><td>كل حمولة</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Slump Record</td></tr>
<tr><td>1.6</td><td>Cube Test 28 يوم</td><td>QCS S5</td><td>≥ 35 N/mm²</td><td>3/50m³</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Test Report</td></tr>
<tr><td>1.7</td><td>PIT Test</td><td>QCS S5</td><td>100% — No Defects هيكلية</td><td>100% خوازيق</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>PIT Report</td></tr>
<tr><td>1.8</td><td>Static Load Test</td><td>QCS S5</td><td>2x الحمل التصميمي</td><td>1-2% من الكلي</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Load Test Report</td></tr>
<tr><td>1.9</td><td>Verticality</td><td>QCS S5</td><td>≤ 1:75</td><td>أثناء الحفر</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Survey Record</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📋 ITP — الخوازيق | Bored Piles
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
concrete_overview: { title: '🏗️ الConcrete — نظرة عامة', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Concrete Works</div>
<h3>📋 نظرة عامة</h3>
<p>الConcrete هي المادة الأساسية في كل مشاريع البنية التحتية والإنشاء في قطر. جودة الConcrete تحدد عمر المنشأ. بيئة قطر الساحلية (كبريتات + كلوريدات + حرارة) تتطلب Concrete عالية المقاومة ومضافات خاصة.</p>
<h3>📌 اختر المرحلة للتفاصيل الكاملة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('concrete_mix')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Mix Design</div><div style="color:var(--text3);font-size:11px;">تصميم الخلطة</div></div>
<div onclick="QS.openDetail('concrete_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="المواد" data-en="Materials">المواد</div><div style="color:var(--text3);font-size:11px;">Cement + Aggregate</div></div>
<div onclick="QS.openDetail('concrete_placing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🏗️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الصب والCompaction</div><div style="color:var(--text3);font-size:11px;">Placing & Compaction</div></div>
<div onclick="QS.openDetail('concrete_curing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">💧</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="المعالجة" data-en="Treatment">المعالجة</div><div style="color:var(--text3);font-size:11px;">Curing</div></div>
<div onclick="QS.openDetail('concrete_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="الاختبارات" data-en="Testing">الاختبارات</div><div style="color:var(--text3);font-size:11px;">Cube + Slump</div></div>
<div onclick="QS.openDetail('concrete_joints')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">✂️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الفواصل</div><div style="color:var(--text3);font-size:11px;">Construction Joints</div></div>
</div>
<div style="margin-top:12px;"><div onclick="QS.openDetail('itp_concrete')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP الConcrete الكامل</div></div></div>
<h3>📐 المواصفات العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>درجة الConcrete الأدنى — Foundations</td><td>C30</td><td>QCS S5 P4</td></tr>
<tr><td>درجة الConcrete — Columns/Walls</td><td>C35-C50</td><td>QCS S5 P4</td></tr>
<tr><td>درجة الConcrete — Blinding</td><td>C15-C20</td><td>QCS S5 P4</td></tr>
<tr><td>w/c Ratio الأقصى</td><td>0.45 (بيئة عدوانية)</td><td>QCS S5 P4</td></tr>
<tr><td>Cement Content الأدنى</td><td>350 kg/m³</td><td>QCS S5 P4</td></tr>
<tr><td>Slump — صب عادي</td><td>75-100mm</td><td>QCS S5 P4</td></tr>
<tr><td>Slump — بمضخة</td><td>100-150mm</td><td>QCS S5 P4</td></tr>
<tr><td>Cover — Foundation</td><td>75mm</td><td>QCS S5 P4</td></tr>
<tr><td>Cover — Columns خارجي</td><td>40mm</td><td>QCS S5 P4</td></tr>
<tr><td>Cover — Slabs داخلي</td><td>20mm</td><td>QCS S5 P4</td></tr>
<tr><td>Max Aggregate Size</td><td>20mm (عادي) / 10mm (كثيف)</td><td>QCS S5 P4</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;"><h3>🏗️ Concrete Works Overview</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
<div onclick="QS.openDetail('concrete_mix')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Mix Design</div></div>
<div onclick="QS.openDetail('concrete_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Materials</div></div>
<div onclick="QS.openDetail('concrete_placing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🏗️</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Placing & Compaction</div></div>
<div onclick="QS.openDetail('concrete_curing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">💧</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Curing</div></div>
<div onclick="QS.openDetail('concrete_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Testing</div></div>
<div onclick="QS.openDetail('concrete_joints')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">✂️</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Joints</div></div>
</div>
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;margin-top:8px;"><div style="font-size:22px">📋</div><div style="color:var(--gold);font-weight:700;font-size:14px;">ITP — Concrete Works</div></div>
<h3>Key Specifications — QCS 2024 Section 5</h3>
<table class="dm-table">
<tr><th>Item</th><th>Standard</th><th>Reference</th></tr>
<tr><td>Min Concrete Grade (Foundation)</td><td>C30</td><td>QCS S5 P4</td></tr>
<tr><td>Min Concrete Grade (Columns/Walls)</td><td>C35-C50</td><td>QCS S5 P4</td></tr>
<tr><td>Max w/c Ratio (Aggressive)</td><td>0.45</td><td>QCS S5 P4</td></tr>
<tr><td>Min Cement Content</td><td>350 kg/m³</td><td>QCS S5 P4</td></tr>
<tr><td>Slump — Direct Pour</td><td>75-100mm</td><td>QCS S5 P4</td></tr>
<tr><td>Slump — Pump</td><td>100-150mm</td><td>QCS S5 P4</td></tr>
<tr><td>Cover — Foundation (on soil)</td><td>75mm</td><td>QCS S5 P4</td></tr>
<tr><td>Cover — External Columns</td><td>40mm</td><td>QCS S5 P4</td></tr>
</table></div>
` },
concrete_mix: { title: '🧪 الConcrete — Mix Design', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Mix Design</div>
<h3>📐 متطلبات التصميم</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>Target Mean Strength</td><td>fcu + 1.64 × SD (SD ≥ 4 N/mm²)</td></tr>
<tr><td>w/c Ratio</td><td>≤ 0.45 للبيئة العدوانية</td></tr>
<tr><td>Cement Content</td><td>≥ 350 kg/m³</td></tr>
<tr><td>GGBS أو PFA</td><td>مسموح حتى 50% GGBS / 30% PFA</td></tr>
<tr><td>Silica Fume</td><td>5-10% للConcrete العالية المقاومة</td></tr>
<tr><td>Admixtures</td><td>معتمدة + لا تتجاوز جرعة المصنع</td></tr>
</table>
<h3>🔧 Trial Mix — الخلطة التجريبية</h3>
<p>• 3 خلطات تجريبية بنسب w/c مختلفة<br>• اختبار Slump + Air Content + Cube لكل خلطة<br>• اعتماد الـ JMF (Job Mix Formula) قبل الإنتاج<br>• التحقق عند 7 و 28 يوم</p>
<h3>⚠️ بيئة قطر — متطلبات خاصة</h3>
<table class="dm-table"><tr><th>نوع التعرض</th><th>درجة الConcrete</th><th>w/c الأقصى</th></tr>
<tr><td>داخلي محمي</td><td>C25</td><td>0.55</td></tr>
<tr><td>خارجي عادي</td><td>C30</td><td>0.50</td></tr>
<tr><td>تعرض كيميائي (تربة / مياه جوفية)</td><td>C35</td><td>0.45</td></tr>
<tr><td>بحري / Splash Zone</td><td>C40</td><td>0.40</td></tr>
<tr><td>Submerged في مياه بحرية</td><td>C45</td><td>0.38</td></tr>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد JMF قبل أي إنتاج<br>• <strong>HP-02:</strong> اعتماد نتائج Trial Mix (7+28 يوم)</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Mix Design Requirements — QCS S5 P4</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Target Mean Strength</td><td>fcu + 1.64 × SD (SD ≥ 4 N/mm²)</td></tr>
<tr><td>Max w/c Ratio (aggressive)</td><td>0.45</td></tr>
<tr><td>Min Cement Content</td><td>350 kg/m³</td></tr>
<tr><td>GGBS Replacement</td><td>Up to 50%</td></tr>
<tr><td>PFA Replacement</td><td>Up to 30%</td></tr>
</table>
<h3>Qatar Environment — Exposure Classes</h3>
<table class="dm-table">
<tr><th>Exposure</th><th>Min Grade</th><th>Max w/c</th></tr>
<tr><td>Internal protected</td><td>C25</td><td>0.55</td></tr>
<tr><td>External normal</td><td>C30</td><td>0.50</td></tr>
<tr><td>Chemical (soil/GW)</td><td>C35</td><td>0.45</td></tr>
<tr><td>Marine / Splash</td><td>C40</td><td>0.40</td></tr>
<tr><td>Submerged marine</td><td>C45</td><td>0.38</td></tr>
</table></div>
` },
concrete_materials: { title: '🔩 الConcrete — المواد', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Materials</div>
<h3>📐 الأسمنت (Cement)</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>النوع المفضل في قطر</td><td>SRPC (Sulphate Resisting) أو OPC + GGBS</td></tr>
<tr><td>المواصفة</td><td>BS EN 197-1</td></tr>
<tr><td>C3A Content</td><td>≤ 3.5% للـ SRPC</td></tr>
<tr><td>Sulphate Content في الأسمنت</td><td>≤ 3.5%</td></tr>
</table>
<h3>📐 الركام (Aggregate)</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>Sulphate Content</td><td>≤ 0.4%</td></tr>
<tr><td>Chloride Content</td><td>≤ 0.04%</td></tr>
<tr><td>LA Abrasion (Coarse)</td><td>≤ 30%</td></tr>
<tr><td>Flakiness Index</td><td>≤ 35%</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td></tr>
<tr><td>Alkali Silica Reaction</td><td>فحص AAR إلزامي</td></tr>
</table>
<h3>📐 مياه الخلط (Mixing Water)</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>Chloride</td><td>≤ 500 mg/L</td></tr>
<tr><td>Sulphate</td><td>≤ 2000 mg/L</td></tr>
<tr><td>المياه المعالجة</td><td>مسموح بعد اعتماد KAHRAMAA</td></tr>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-03:</strong> اعتماد كل المواد قبل التوريد<br>• <strong>HP-04:</strong> Sulphate + Chloride Test لكل دفعة ركام</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Cement</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Preferred Type (Qatar)</td><td>SRPC or OPC+GGBS</td></tr>
<tr><td>Standard</td><td>BS EN 197-1</td></tr>
<tr><td>Max C3A (SRPC)</td><td>≤ 3.5%</td></tr>
</table>
<h3>Aggregate</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.4%</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td></tr>
<tr><td>LA Abrasion</td><td>≤ 30%</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td></tr>
</table>
<h3>Mixing Water</h3>
<table class="dm-table">
<tr><th>Item</th><th>Limit</th></tr>
<tr><td>Chloride</td><td>≤ 500 mg/L</td></tr>
<tr><td>Sulphate SO4</td><td>≤ 2000 mg/L</td></tr>
<tr><td>pH</td><td>5-9</td></tr>
</table></div>
` },
concrete_placing: { title: '🏗️ الConcrete — الصب والCompaction', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Placing & Compaction</div>
<h3>📐 متطلبات قبل الصب</h3>
<p>• اعتماد الشدات والRebar (Hold Point)<br>• تنظيف القاع وإزالة المياه والمخلفات<br>• رش المياه على القاع (منع امتصاص المياه)<br>• تركيب Spacers للـ Cover<br>• اعتماد طلب الصب (Concrete Pour Card)</p>
<h3>🔧 أثناء الصب</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>وقت النقل</td><td>≤ 90 دقيقة من الخلط</td></tr>
<tr><td>ارتفاع الصب</td><td>≤ 500mm لكل طبقة</td></tr>
<tr><td>أقصى وقت بين الطبقات</td><td>≤ Initial Set Time (عادة 2-3 hr)</td></tr>
<tr><td>درجة حرارة الConcrete</td><td>≤ 32°C عند الصب</td></tr>
<tr><td>Hot Weather Concreting</td><td>&gt; 35°C = تبريد المواد + Ice</td></tr>
</table>
<h3>🔧 الCompaction (Compaction)</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>نوع Vibrator</td><td>Internal (Poker) — قطر 50-75mm</td></tr>
<tr><td>مسافة الإدخال</td><td>كل 450mm أفقياً</td></tr>
<tr><td>عمق الإدخال</td><td>طول الطبقة + 150mm في الطبقة السابقة</td></tr>
<tr><td>مدة الاهتزاز</td><td>5-15 ثانية</td></tr>
<tr><td>سحب الـ Vibrator</td><td>ببطء — لا يترك فراغ</td></tr>
</table>
<h3>⚠️ تنبيهات خاصة بقطر</h3>
<p>• <strong>الصيف:</strong> تبريد الركام + الأسمنت + مياه الخلط بالثلج<br>• <strong>الصب الليلي:</strong> مفضل في الصيف (درجة حرارة أقل)<br>• <strong>Direct Sunlight:</strong> تغطية فورية بعد الصب<br>• <strong>Evaporation:</strong> استخدام Evaporation Retarder</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-05:</strong> اعتماد Rebar + Formwork + Cover قبل الصب<br>• <strong>HP-06:</strong> Pour Card موقع من الاستشاري قبل الصب</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Placing Requirements — QCS S5 P4</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Max Transport Time</td><td>≤ 90 minutes from mixing</td></tr>
<tr><td>Max Layer Height</td><td>≤ 500mm per layer</td></tr>
<tr><td>Max Concrete Temp at Placement</td><td>≤ 32°C</td></tr>
<tr><td>Hot Weather (above 35°C)</td><td>Cool aggregates + Ice water</td></tr>
<tr><td>Vibrator Spacing</td><td>Every 450mm horizontally</td></tr>
<tr><td>Vibration Duration</td><td>5-15 seconds per insertion</td></tr>
</table>
<h3>Hot Weather Concreting — Qatar</h3>
<p>• Cool aggregate with water spray + shade<br>• Add ice to mixing water — target ≤ 32°C at placement<br>• Night pouring preferred for large pours in summer<br>• Apply retarder admixture above 35°C ambient<br>• Cover immediately after placing to prevent evaporation</p></div>
` },
concrete_curing: { title: '💧 الConcrete — المعالجة (Curing)', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Curing</div>
<h3>📐 متطلبات المعالجة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>بداية المعالجة</td><td>فور انتهاء الصب وبدء التصلب</td></tr>
<tr><td>مدة المعالجة — OPC</td><td>≥ 7 أيام</td></tr>
<tr><td>مدة المعالجة — SRPC/GGBS</td><td>≥ 10 أيام</td></tr>
<tr><td>مدة المعالجة — بيئة عدوانية</td><td>≥ 14 يوم</td></tr>
<tr><td>درجة حرارة السطح</td><td>≥ 10°C طول فترة المعالجة</td></tr>
</table>
<h3>🔧 طرق المعالجة المقبولة</h3>
<p>• <strong>Wet Hessian:</strong> خيش مبلل مستمر — الأفضل<br>• <strong>Curing Compound:</strong> رش بعد الصب مباشرة — معتمد من المهندس<br>• <strong>Polythene Sheet:</strong> تغطية كاملة بدون فراغات<br>• <strong>Ponding:</strong> للأسطح الأفقية الكبيرة</p>
<h3>⚠️ في قطر — الصيف خطر</h3>
<p>• تبخر سريع جداً = Plastic Cracking<br>• Curing Compound إلزامي في الصيف<br>• تبريد السطح بالرش قبل وضع الـ Hessian<br>• مراقبة كل 4 ساعات في درجات الحرارة العالية</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-07:</strong> تأكيد بدء المعالجة خلال hour من الصب<br>• <strong>HP-08:</strong> تسجيل يومي لإجراءات المعالجة</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Curing Requirements — QCS S5 P4</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Start Curing</td><td>Within 1 hour of placing</td></tr>
<tr><td>OPC Duration</td><td>≥ 7 days</td></tr>
<tr><td>SRPC/GGBS Duration</td><td>≥ 10 days</td></tr>
<tr><td>Aggressive Environment</td><td>≥ 14 days</td></tr>
<tr><td>Min Surface Temperature</td><td>≥ 10°C throughout</td></tr>
</table>
<h3>Curing Methods</h3>
<p>• Wet Hessian (continuous wet) — Best practice<br>• Curing Compound — spray immediately after placing, approved type<br>• Polythene Sheet — full coverage, no gaps<br>• Ponding — for large flat surfaces</p>
<h3>Qatar Summer — Critical</h3>
<p>• Rapid evaporation = Plastic Cracking risk<br>• Curing Compound mandatory in summer<br>• Monitor every 4 hours in extreme heat<br>• Use Evaporation Retarder in windy conditions</p></div>
` },
concrete_testing: { title: '🧪 الConcrete — الاختبارات', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Testing</div>
<h3>1. Slump Test — في الموقع</h3>
<table class="dm-table"><tr><th>نوع الصب</th><th>المعيار</th></tr>
<tr><td>صب عادي</td><td>75-100mm</td></tr>
<tr><td>صب بمضخة</td><td>100-150mm</td></tr>
<tr><td>Bored Piles</td><td>160-220mm</td></tr>
<tr><td>Self Compacting</td><td>650-750mm (Flow)</td></tr>
</table>
<h3>2. Cube Sampling</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>التكرار</td><td>كل 50m³ أو كل صبة — أيهما أكثر</td></tr>
<tr><td>عدد المكعبات لكل عينة</td><td>6 مكعبات (3 لـ 7 يوم + 3 لـ 28 يوم)</td></tr>
<tr><td>حجم المكعب</td><td>150×150×150mm</td></tr>
<tr><td>معيار القبول 7 يوم</td><td>≥ 70% fcu</td></tr>
<tr><td>معيار القبول 28 يوم</td><td>≥ 100% fcu</td></tr>
</table>
<h3>3. اختبارات إضافية</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Air Content</td><td>≤ 3%</td><td>كل عينة</td></tr>
<tr><td>درجة الحرارة</td><td>≤ 32°C</td><td>كل حمولة</td></tr>
<tr><td>Chloride (Hardened)</td><td>≤ 0.4% cement</td><td>كل 500m³</td></tr>
<tr><td>Carbonation Depth</td><td>فحص دوري</td><td>بعد 28 يوم</td></tr>
<tr><td>Core Test</td><td>≥ 0.85 fcu</td><td>عند الشك فقط</td></tr>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-09:</strong> نتائج 7 أيام ترسل للاستشاري فوراً<br>• <strong>HP-10:</strong> فشل 28 يوم = وقف العمل + تحقيق</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Slump Test</h3>
<table class="dm-table">
<tr><th>Pour Type</th><th>Target Slump</th></tr>
<tr><td>Normal pour</td><td>75-100mm</td></tr>
<tr><td>Pump pour</td><td>100-150mm</td></tr>
<tr><td>Bored Piles</td><td>160-220mm</td></tr>
</table>
<h3>Cube Sampling</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Frequency</td><td>6 cubes per 50m³</td></tr>
<tr><td>7-day acceptance</td><td>≥ 70% fcu</td></tr>
<tr><td>28-day acceptance</td><td>≥ 100% fcu</td></tr>
<tr><td>Temperature at placement</td><td>≤ 32°C — check every load</td></tr>
</table></div>
` },
concrete_joints: { title: '✂️ الConcrete — الفواصل', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Construction Joints</div>
<h3>📐 أنواع الفواصل</h3>
<table class="dm-table"><tr><th>النوع</th><th>الوصف</th><th>المتطلب</th></tr>
<tr><td>Construction Joint</td><td>فاصل تنفيذي بين صبتين</td><td>تنظيف + شيطان + Bonding Agent</td></tr>
<tr><td>Expansion Joint</td><td>فاصل تمدد حراري</td><td>حسب التصميم — عادة كل 30-40m</td></tr>
<tr><td>Contraction Joint</td><td>فاصل انكماش في الأسطح</td><td>قطع ≥ D/3 خلال 24hr</td></tr>
<tr><td>Isolation Joint</td><td>فصل كامل بين عناصر</td><td>Compressible Filler</td></tr>
</table>
<h3>🔧 معالجة Construction Joint</h3>
<p>1. إيقاف الصب عند خط أفقي أو رأسي محدد<br>2. بعد Initial Set: تنظيف السطح بـ Water Jetting أو Wire Brush<br>3. إزالة الطبقة السطحية الضعيفة (Laitance)<br>4. رش Bonding Agent (SBR أو Epoxy)<br>5. صب الطبقة التالية قبل جفاف الـ Bonding Agent</p>
<h3>⚠️ تنبيهات مهمة</h3>
<p>• موضع الفاصل يحدده المهندس الإنشائي — لا يُغير دون إذن<br>• Waterstop إلزامي في الجدران المائية<br>• في قطر: الفواصل مناطق ضعف أمام الكلوريدات — معالجة خاصة</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-11:</strong> اعتماد موضع الفاصل من المهندس الإنشائي<br>• <strong>HP-12:</strong> فحص تنظيف الفاصل قبل الصب التالي</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Joint Types</h3>
<table class="dm-table">
<tr><th>Type</th><th>Description</th><th>Treatment</th></tr>
<tr><td>Construction Joint</td><td>Between successive pours</td><td>Clean + Bonding Agent</td></tr>
<tr><td>Expansion Joint</td><td>Thermal movement — every 30-40m</td><td>Compressible Filler</td></tr>
<tr><td>Contraction Joint</td><td>Shrinkage control</td><td>Cut ≥ D/3 within 24hr</td></tr>
</table>
<h3>Construction Joint Treatment</h3>
<p>1. Stop pour at designated level<br>2. After initial set: Water jet or wire brush to remove laitance<br>3. Apply SBR or Epoxy Bonding Agent<br>4. Pour next layer before Bonding Agent dries<br>5. Waterstop mandatory in water-retaining walls</p></div>
` },
rebar_overview: { title: '🔩 Rebar التسليح — نظرة عامة', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Reinforcement</div>
<h3>📋 نظرة عامة</h3>
<p>Rebar التسليح في قطر يجب أن يكون Grade 500B وفق BS 4449. بيئة قطر العدوانية تتطلب Cover كافٍ ومراقبة صارمة للـ Chloride.</p>
<h3>📌 اختر المرحلة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('rebar_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">المواصفات</div></div>
<div onclick="QS.openDetail('rebar_fixing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الربط والتوزيع</div></div>
<div onclick="QS.openDetail('rebar_cover')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📏</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Cover & Spacers</div></div>
<div onclick="QS.openDetail('rebar_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="الاختبارات" data-en="Testing">الاختبارات</div></div>
</div>
<div style="margin-top:12px;"><div onclick="QS.openDetail('itp_rebar')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP Rebar التسليح</div></div></div>
<h3>📐 المواصفات العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>الدرجة</td><td>Grade 500B</td><td>BS 4449:2005</td></tr>
<tr><td>Yield Strength fy</td><td>≥ 500 N/mm²</td><td>BS 4449</td></tr>
<tr><td>Ultimate Strength fu</td><td>≥ 600 N/mm²</td><td>BS 4449</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.15</td><td>BS 4449</td></tr>
<tr><td>Elongation</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend Test</td><td>بدون تشقق</td><td>BS 4449</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;"><h3>Reinforcement Overview — QCS 2024 Section 5 Part 3</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
<div onclick="QS.openDetail('rebar_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Specifications</div></div>
<div onclick="QS.openDetail('rebar_fixing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Fixing & Lapping</div></div>
<div onclick="QS.openDetail('rebar_cover')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">📏</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Cover & Spacers</div></div>
<div onclick="QS.openDetail('rebar_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Testing</div></div>
</div>
<h3>Key Specifications — Grade 500B</h3>
<table class="dm-table">
<tr><th>Property</th><th>Standard</th><th>Reference</th></tr>
<tr><td>Grade</td><td>500B — High Yield Deformed</td><td>BS 4449:2005</td></tr>
<tr><td>Yield Strength fy</td><td>≥ 500 N/mm²</td><td>BS 4449</td></tr>
<tr><td>Ultimate Strength fu</td><td>≥ 600 N/mm²</td><td>BS 4449</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.15 and ≤ 1.35</td><td>BS 4449</td></tr>
<tr><td>Total Elongation</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend Test 180°</td><td>No cracking</td><td>BS 4449</td></tr>
</table></div>
` },
rebar_materials: { title: '🔩 Rebar التسليح — المواصفات', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Rebar Materials</div>
<h3>📐 المواصفات الفنية</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>Grade</td><td>500B — High Yield Deformed Bars</td></tr>
<tr><td>fy</td><td>≥ 500 N/mm²</td></tr>
<tr><td>fu</td><td>≥ 600 N/mm²</td></tr>
<tr><td>fu/fy</td><td>≥ 1.15 و ≤ 1.35</td></tr>
<tr><td>Elongation at Max Force</td><td>≥ 7.5% (Agt)</td></tr>
<tr><td>Total Elongation</td><td>≥ 14%</td></tr>
<tr><td>Bend Test (180°)</td><td>بدون تشقق</td></tr>
<tr><td>Re-bend Test</td><td>بدون تشقق</td></tr>
<tr><td>Mass Tolerance</td><td>± 4.5% للأقطار الصغيرة</td></tr>
</table>
<h3>🧪 اختبارات الاستلام</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>Tensile Test (fy + fu + Elong)</td><td>3 عينات كل 25 طن</td></tr>
<tr><td>Bend + Re-bend Test</td><td>3 عينات كل 25 طن</td></tr>
<tr><td>Mass per Metre</td><td>3 عينات كل 25 طن</td></tr>
<tr><td>Chemical Analysis</td><td>Mill Certificate كل دفعة</td></tr>
</table>
<h3>⚠️ تنبيهات</h3>
<p>• Mill Certificate إلزامي لكل دفعة<br>• تخزين بعيد عن الماء والتربة (على Timber Sleepers)<br>• Rebar صدئ بشكل مفرط = رفض<br>• لا يُستخدم Rebar مجهول المصدر</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد Mill Certificates قبل التوريد<br>• <strong>HP-02:</strong> اعتماد نتائج Tensile Test قبل الاستخدام</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Rebar Specifications — Grade 500B</h3>
<table class="dm-table">
<tr><th>Property</th><th>Requirement</th></tr>
<tr><td>Grade</td><td>500B — High Yield Deformed Bars</td></tr>
<tr><td>Yield Strength fy</td><td>≥ 500 N/mm²</td></tr>
<tr><td>Ultimate Strength fu</td><td>≥ 600 N/mm²</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.15 and ≤ 1.35</td></tr>
<tr><td>Elongation at Max Force (Agt)</td><td>≥ 7.5%</td></tr>
<tr><td>Total Elongation</td><td>≥ 14%</td></tr>
<tr><td>Bend Test (180°)</td><td>No cracking</td></tr>
<tr><td>Re-bend Test</td><td>No cracking</td></tr>
<tr><td>Mass Tolerance</td><td>± 4.5%</td></tr>
</table>
<h3>Acceptance Tests</h3>
<table class="dm-table">
<tr><th>Test</th><th>Frequency</th></tr>
<tr><td>Tensile Test (fy + fu + Elongation)</td><td>3 samples per 25 tonnes</td></tr>
<tr><td>Bend + Re-bend Test</td><td>3 samples per 25 tonnes</td></tr>
<tr><td>Mass per Metre</td><td>3 samples per 25 tonnes</td></tr>
<tr><td>Mill Certificate</td><td>Every delivery</td></tr>
</table></div>
` },
rebar_fixing: { title: '🔧 Rebar التسليح — الربط والتوزيع', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Fixing</div>
<h3>📐 Lap Lengths — أطوال الوصلات</h3>
<table class="dm-table"><tr><th>نوع الوصلة</th><th>الطول</th></tr>
<tr><td>Tension — عادي</td><td>40d</td></tr>
<tr><td>Tension — بيئة عدوانية</td><td>50d</td></tr>
<tr><td>Compression</td><td>30d</td></tr>
<tr><td>Top Bars (أفقي)</td><td>40d × 1.4 = 56d</td></tr>
</table>
<h3>📐 Anchorage Lengths</h3>
<table class="dm-table"><tr><th>الحالة</th><th>الطول</th></tr>
<tr><td>Straight Bar — Tension</td><td>40d</td></tr>
<tr><td>Standard Hook 90°</td><td>8d (الحد الأدنى)</td></tr>
<tr><td>Standard Hook 180°</td><td>4d (الحد الأدنى)</td></tr>
</table>
<h3>🔧 متطلبات التركيب</h3>
<p>• ربط كل التقاطعات بالسلك<br>• Staggering للوصلات — لا يُسمح بوصلات في نفس المقطع أكثر من 50%<br>• توزيع الأقطار حسب المخططات بدون تعديل<br>• عدم ثني الRebar في الموقع بالحرارة</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-03:</strong> فحص الRebar (قطر + مسافات + lap) قبل الصب</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Lap Lengths</h3>
<table class="dm-table">
<tr><th>Joint Type</th><th>Length</th></tr>
<tr><td>Tension — Normal</td><td>40d</td></tr>
<tr><td>Tension — Aggressive Environment</td><td>50d</td></tr>
<tr><td>Compression</td><td>30d</td></tr>
<tr><td>Top Bars (horizontal)</td><td>40d × 1.4 = 56d</td></tr>
</table>
<h3>Anchorage Lengths</h3>
<table class="dm-table">
<tr><th>Case</th><th>Length</th></tr>
<tr><td>Straight bar — Tension</td><td>40d</td></tr>
<tr><td>Standard Hook 90°</td><td>8d minimum</td></tr>
<tr><td>Standard Hook 180°</td><td>4d minimum</td></tr>
</table>
<h3>Fixing Requirements</h3>
<p>• Tie all intersections with wire<br>• Stagger laps — max 50% of bars at same section<br>• No field bending with heat<br>• Mill Certificate required for every delivery</p></div>

<h3>جدول أطوال التراكب — Lap Length (QCS 2024)</h3>
<table class="dm-table"><thead><tr><th>القطر d</th><th>Tension Lap (40d)</th><th>Tension عدواني (50d)</th><th>Compression (30d)</th></tr></thead><tbody>
<tr><td>10mm</td><td>400mm</td><td>500mm</td><td>300mm</td></tr>
<tr><td>12mm</td><td>480mm</td><td>600mm</td><td>360mm</td></tr>
<tr><td>16mm</td><td>640mm</td><td>800mm</td><td>480mm</td></tr>
<tr><td>20mm</td><td>800mm</td><td>1000mm</td><td>600mm</td></tr>
<tr><td>25mm</td><td>1000mm</td><td>1250mm</td><td>750mm</td></tr>
<tr><td>32mm</td><td>1280mm</td><td>1600mm</td><td>960mm</td></tr>
</tbody></table>
<h3>اشتراطات التوزيع</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Max spacing (Slabs)</td><td>3h أو 400mm أيهما أقل</td><td>QCS S5</td></tr>
<tr><td>Max spacing (Walls)</td><td>3h أو 400mm</td><td>QCS S5</td></tr>
<tr><td>Min spacing</td><td>≥ (bar diameter) أو 25mm أو (max agg +5mm)</td><td>QCS S5</td></tr>
<tr><td>Staggering laps</td><td>≤50% من الحديد في مقطع واحد</td><td>QCS S5</td></tr>
<tr><td>Bend radius</td><td>≤16mm → 4d | >16mm → 7d</td><td>BS 8666</td></tr>
</tbody></table>
` },
rebar_cover: { title: '📏 Rebar التسليح — Cover & Spacers', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Cover</div>
<h3>📐 الغطاء الخرساني المطلوب</h3>
<table class="dm-table"><tr><th>العنصر</th><th>Cover</th><th>الملاحظة</th></tr>
<tr><td>Foundation — يلاصق التربة</td><td>75mm</td><td>بعد Blinding</td></tr>
<tr><td>Columns — خارجي</td><td>40mm</td><td>بيئة عدوانية</td></tr>
<tr><td>Columns — داخلي</td><td>25mm</td><td>محمي</td></tr>
<tr><td>Beams — خارجي</td><td>40mm</td><td>—</td></tr>
<tr><td>Slabs — خارجي</td><td>40mm</td><td>—</td></tr>
<tr><td>Slabs — داخلي</td><td>20mm</td><td>—</td></tr>
<tr><td>Retaining Walls — تربة</td><td>50mm</td><td>—</td></tr>
<tr><td>Bored Piles</td><td>75mm</td><td>—</td></tr>
</table>
<h3>🔧 Spacers المطلوبة</h3>
<table class="dm-table"><tr><th>الموضع</th><th>المتطلب</th></tr>
<tr><td>قاع البلاطات</td><td>Concrete/Plastic Chairs كل 800mm</td></tr>
<tr><td>جانب الأعمدة</td><td>Plastic Circular كل 500mm</td></tr>
<tr><td>الجدران</td><td>كل 600mm أفقياً وعمودياً</td></tr>
<tr><td>Cover Block — في التربة</td><td>Concrete مسبوكة فقط — لا plastic</td></tr>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-04:</strong> فحص Cover بـ Cover Meter بعد الصب وقبل القبول النهائي</p>
</div>
<div class="lang-content-en" style="display:none;"><h3>Concrete Cover Requirements — QCS S5 P3</h3>
<table class="dm-table">
<tr><th>Element</th><th>Required Cover</th><th>Note</th></tr>
<tr><td>Foundation — against soil</td><td>75mm</td><td>After blinding</td></tr>
<tr><td>External columns</td><td>40mm</td><td>Aggressive environment</td></tr>
<tr><td>Internal columns</td><td>25mm</td><td>Protected</td></tr>
<tr><td>External beams</td><td>40mm</td><td>—</td></tr>
<tr><td>External slabs</td><td>40mm</td><td>—</td></tr>
<tr><td>Internal slabs</td><td>20mm</td><td>—</td></tr>
<tr><td>Retaining walls (soil face)</td><td>50mm</td><td>—</td></tr>
<tr><td>Bored Piles</td><td>75mm</td><td>—</td></tr>
</table>
<h3>Spacers</h3>
<table class="dm-table">
<tr><th>Location</th><th>Requirement</th></tr>
<tr><td>Slab soffit</td><td>Concrete/Plastic chairs every 800mm</td></tr>
<tr><td>Column sides</td><td>Plastic circular every 500mm</td></tr>
<tr><td>Walls</td><td>Every 600mm horizontal and vertical</td></tr>
<tr><td>In soil contact</td><td>Cast concrete blocks ONLY — no plastic</td></tr>
</table></div>
` },
rebar_testing: { title: '🧪 Rebar التسليح — الاختبارات', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Testing</div>
<h3>📐 الاختبارات المطلوبة</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Tensile Test</td><td>fy≥500 | fu≥600 | fu/fy≥1.15</td><td>3 عينات / 25 طن</td></tr>
<tr><td>Elongation</td><td>≥ 14%</td><td>مع Tensile</td></tr>
<tr><td>Bend Test 180°</td><td>بدون تشقق</td><td>3 عينات / 25 طن</td></tr>
<tr><td>Re-bend Test</td><td>بدون تشقق</td><td>3 عينات / 25 طن</td></tr>
<tr><td>Mass per Metre</td><td>± 4.5%</td><td>3 عينات / 25 طن</td></tr>
<tr><td>Cover Meter</td><td>± 5mm من المطلوب</td><td>عينة عشوائية بعد الصب</td></tr>
</table>
<h3>📊 معايير القبول والرفض</h3>
<table class="dm-table"><tr><th>الحالة</th><th>القرار</th><th>الإجراء</th></tr>
<tr><td>fy &lt; 500 N/mm²</td><td style="color:#e74c3c;font-weight:700;">رفض</td><td>إرجاع الدفعة كاملة</td></tr>
<tr><td>Bend Test يتشقق</td><td style="color:#e74c3c;font-weight:700;">رفض</td><td>إرجاع الدفعة كاملة</td></tr>
<tr><td>Cover ناقص &gt; 5mm</td><td style="color:#f39c12;font-weight:700;">تحقيق</td><td>تقييم هندسي</td></tr>
<tr><td>كل النتائج OK</td><td style="color:#2ecc71;font-weight:700;">قبول ✓</td><td>استخدام في المشروع</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;"><h3>Required Tests</h3>
<table class="dm-table">
<tr><th>Test</th><th>Standard</th><th>Frequency</th></tr>
<tr><td>Tensile Test</td><td>fy≥500 | fu≥600 | fu/fy≥1.15</td><td>3 samples / 25t</td></tr>
<tr><td>Elongation</td><td>≥ 14%</td><td>With tensile</td></tr>
<tr><td>Bend Test 180°</td><td>No cracking</td><td>3 samples / 25t</td></tr>
<tr><td>Re-bend Test</td><td>No cracking</td><td>3 samples / 25t</td></tr>
<tr><td>Mass per Metre</td><td>± 4.5%</td><td>3 samples / 25t</td></tr>
<tr><td>Cover Meter</td><td>± 5mm of required</td><td>Random after pour</td></tr>
</table>
<h3>Acceptance Criteria</h3>
<table class="dm-table">
<tr><th>Condition</th><th>Decision</th></tr>
<tr><td>fy &lt; 500 N/mm²</td><td style="color:#e74c3c;">REJECT entire batch</td></tr>
<tr><td>Bend test cracks</td><td style="color:#e74c3c;">REJECT entire batch</td></tr>
<tr><td>Cover deficient &gt; 5mm</td><td style="color:#f39c12;">Investigation + Engineering assessment</td></tr>
<tr><td>All results pass</td><td style="color:#2ecc71;">ACCEPT ✓</td></tr>
</table></div>
` },
foundations_overview: { title: '🏛️ الأساسات — نظرة عامة', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundations</div>
<h3>📋 نظرة عامة</h3>
<p>الأساسات في قطر تواجه تحديات خاصة: تربة Sabkha، مياه جوفية عالية الكبريتات، وخطر التآكل. اختيار نوع الأساس يعتمد على تقرير الجسات.</p>
<h3>📌 اختر النوع</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('found_strip')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🏗️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Strip / Pad</div></div>
<div onclick="QS.openDetail('found_raft')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⬛</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Raft Foundation</div></div>
<div onclick="QS.openDetail('found_piles')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🕳️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Bored Piles</div></div>
<div onclick="QS.openDetail('found_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">اختبارات الأساسات</div></div>
</div>
<div style="margin-top:12px;"><div onclick="QS.openDetail('itp_foundations')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP الأساسات الكامل</div></div></div>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🏛️ الأساسات — نظرة عامة
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
found_strip: { title: '🏗️ Strip / Pad Foundations', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Strip & Pad Foundations</div>
<h3>📐 المواصفات</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>درجة الConcrete</td><td>C30 كحد أدنى</td></tr>
<tr><td>Blinding</td><td>C15 — سماكة 75mm</td></tr>
<tr><td>Cover</td><td>75mm (يلاصق تربة) / 50mm (فوق Blinding)</td></tr>
<tr><td>Waterproofing</td><td>إلزامي في قطر — Bituminous Sheet أو Crystalline</td></tr>
<tr><td>Protection Board</td><td>50mm فوق Waterproofing</td></tr>
<tr><td>عمق الحفر</td><td>حسب مستوى التربة الصالحة من تقرير الجسات</td></tr>
</table>
<h3>🔧 خطوات التنفيذ</h3>
<p>1. حفر للعمق المحدد في الجسات<br>2. التأكد من التربة الصالحة — موافقة المهندس الجيوتقني<br>3. Dewatering إذا لزم<br>4. فرش Blinding C15 سماكة 75mm<br>5. Waterproofing + Protection Board<br>6. رسم محاور الأساس<br>7. تركيب Rebar التسليح + Spacers<br>8. فحص Cover + Rebar (Hold Point)<br>9. الصب + الCompaction<br>10. المعالجة ≥ 7 أيام</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> موافقة Geotechnical Engineer على مستوى التأسيس<br>• <strong>HP-02:</strong> فحص Rebar + Cover قبل الصب<br>• <strong>HP-03:</strong> اعتماد Cube Results قبل الحفر فوقه</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🏗️ Strip / Pad Foundations
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
found_raft: { title: '⬛ Raft Foundation', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Raft Foundation</div>
<h3>📐 المواصفات</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>درجة الConcrete</td><td>C35-C40 (بيئة عدوانية)</td></tr>
<tr><td>Blinding</td><td>C15 — 100mm</td></tr>
<tr><td>Cover قاع</td><td>75mm</td></tr>
<tr><td>Cover جانب</td><td>50mm</td></tr>
<tr><td>Waterproofing</td><td>Tanking System كامل</td></tr>
<tr><td>Construction Joints</td><td>Waterstop إلزامي</td></tr>
<tr><td>Max Pour Size</td><td>حسب Thermal Analysis</td></tr>
</table>
<h3>⚠️ Massive Concrete — قطر خاصة</h3>
<p>• سماكات كبيرة = Thermal Cracking<br>• Thermal Analysis إلزامي قبل الصب<br>• درجة حرارة داخل الConcrete ≤ 70°C<br>• فرق الحرارة بين الداخل والسطح ≤ 20°C<br>• استخدام GGBS يقلل الحرارة المنبعثة<br>• مراقبة بـ Thermocouples أثناء الصب</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد Thermal Analysis قبل الصب<br>• <strong>HP-02:</strong> موافقة على Waterstop قبل الصب<br>• <strong>HP-03:</strong> مراقبة درجات الحرارة كل 4hr</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ⬛ Raft Foundation
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
found_piles: { title: '🕳️ Bored Piles', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Bored Piles</div>
<h3>📐 المواصفات</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>درجة الConcrete</td><td>C35-C40</td></tr>
<tr><td>Slump</td><td>160-220mm (Self Leveling)</td></tr>
<tr style="background:rgba(46,204,113,0.08);"><td><strong>🆕 SCC Bored Piles — Slump Flow</strong></td><td><strong style="color:#2ecc71">600-750mm / Flow Time SF2 class</strong> — QCS 2024 S5</td></tr>
<tr><td>Cover</td><td>75mm</td></tr>
<tr><td>Casing</td><td>إلزامي في المناطق الرخوة</td></tr>
<tr><td>Bentonite Slurry</td><td>في التربة غير المستقرة</td></tr>
<tr><td>طريقة الصب</td><td>Tremie Pipe — من القاع لفوق</td></tr>
<tr><td>Concrete Overcast</td><td>500mm فوق مستوى الـ Cut Off</td></tr>
</table>
<h3>🔧 خطوات التنفيذ</h3>
<p>1. مسح المواقع وتحديد المحاور<br>2. Temporary Casing للعمق الأول<br>3. Boring بالحجم المطلوب<br>4. فحص القاع (Base Cleanliness Check)<br>5. تنزيل قفص الRebar<br>6. تنزيل Tremie Pipe<br>7. الصب من القاع باستمرار<br>8. سحب Casing أثناء الصب</p>
<h3>🧪 اختبارات الخوازيق</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>النسبة</th><th>المعيار</th></tr>
<tr><td>PIT (Pile Integrity Test)</td><td>100%</td><td>بدون عيوب</td></tr>
<tr><td>Static Load Test</td><td>1-2% من العدد</td><td>Settlement ≤ حسب التصميم</td></tr>
<tr><td>Cube Test</td><td>كل خازوق</td><td>≥ fcu المصمم</td></tr>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> فحص قاع الخازوق قبل تنزيل الRebar<br>• <strong>HP-02:</strong> اعتماد PIT قبل صب Pile Cap<br>• <strong>HP-03:</strong> اعتماد Static Load Test</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🕳️ Bored Piles
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
found_testing: { title: '🧪 اختبارات الأساسات', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundation Testing</div>
<h3>📐 اختبارات ما قبل الأساسات</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التوقيت</th></tr>
<tr><td>Soil CBR</td><td>حسب التصميم</td><td>قبل الحفر</td></tr>
<tr><td>Sulphate Test</td><td>≤ 0.5%</td><td>قبل الحفر</td></tr>
<tr><td>Chloride Test</td><td>≤ 0.6%</td><td>قبل الحفر</td></tr>
<tr><td>Groundwater Level</td><td>توثيق المستوى</td><td>قبل الحفر</td></tr>
<tr><td>Founding Level Approval</td><td>موافقة Geotechnical</td><td>عند الوصول للعمق</td></tr>
</table>
<h3>📐 اختبارات الConcrete</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Slump</td><td>حسب نوع الصب</td><td>كل حمولة</td></tr>
<tr><td>Cube 7 يوم</td><td>≥ 70% fcu</td><td>كل 50m³</td></tr>
<tr><td>Cube 28 يوم</td><td>≥ 100% fcu</td><td>كل 50m³</td></tr>
<tr><td>Thermal Monitoring</td><td>≤ 70°C داخل / ≤ 20°C فرق</td><td>Raft فقط</td></tr>
<tr><td>PIT Test (Piles)</td><td>100%</td><td>كل خازوق</td></tr>
<tr><td>Static Load Test</td><td>حسب التصميم</td><td>1-2% من الخوازيق</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🧪 اختبارات الأساسات
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
formwork_overview: { title: '🪵 الشدات — Formwork', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Formwork</div>
<h3>📐 المواصفات</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>التحميل التصميمي</td><td>وزن الConcrete + أحمال العمال + Vibration</td></tr>
<tr><td>انحراف الشدة</td><td>≤ L/500 أو 5mm أيهما أقل</td></tr>
<tr><td>Release Agent</td><td>إلزامي + موافقة — لا يلوث الRebar</td></tr>
<tr><td>فحص قبل الصب</td><td>إلزامي من الاستشاري</td></tr>
</table>
<h3>📐 أوقات فك الشدات — Striking Times</h3>
<table class="dm-table"><tr><th>العنصر</th><th>OPC</th><th>SRPC/GGBS</th></tr>
<tr><td>جوانب الأعمدة والجدران</td><td>12-24 hour</td><td>24-48 hour</td></tr>
<tr><td>قيعان الكمرات (دعائم باقية)</td><td>4 أيام</td><td>6 أيام</td></tr>
<tr><td>قيعان البلاطات (دعائم باقية)</td><td>3 أيام</td><td>4 أيام</td></tr>
<tr><td>دعائم الكمرات (span &lt; 6m)</td><td>14 يوم</td><td>21 يوم</td></tr>
<tr><td>دعائم الكمرات (span &gt; 6m)</td><td>21 يوم</td><td>28 يوم</td></tr>
</table>
<h3>⚠️ تنبيهات مهمة</h3>
<p>• فك الشدة بعد اعتماد نتائج Cube 7 يوم<br>• عدم الفك في الجو البارد قبل الوقت المحدد<br>• في قطر الصيف — درجات الحرارة تسرع التصلب لكن لا تعجل الفك<br>• Reshoring إلزامي في البناء المتعدد الطوابق</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> فحص الشدة من الاستشاري قبل الصب<br>• <strong>HP-02:</strong> اعتماد Cube 7 يوم قبل فك الشدة</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🪵 الشدات — Formwork
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
structural_materials: { title: '🧱 مواد الإنشاء — المواصفات والاختبارات', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Structural Materials</div>

<h3>1️⃣ الأسمنت (Cement)</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>OPC (CEM I)</td><td>BS EN 197-1</td><td>Fineness + Setting + Strength</td><td>كل دفعة</td></tr>
<tr><td>SRPC (Sulphate Resisting)</td><td>BS 4027</td><td>C3A ≤ 3.5%</td><td>كل دفعة</td></tr>
<tr><td>GGBS</td><td>BS EN 15167</td><td>حتى 50% من Binder</td><td>كل دفعة</td></tr>
<tr><td>PFA (Fly Ash)</td><td>BS EN 450</td><td>حتى 30% من Binder</td><td>كل دفعة</td></tr>
<tr><td>Sulphate في الأسمنت</td><td>≤ 3.5%</td><td>Chemical Analysis</td><td>كل دفعة</td></tr>
</table>

<h3>2️⃣ الركام (Aggregate)</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المواصفة</th><th>المرجع</th><th>التكرار</th></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.4%</td><td>BS 1377</td><td>كل 500m³</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td><td>BS 1377</td><td>كل 500m³</td></tr>
<tr><td>LA Abrasion (Coarse)</td><td>≤ 30%</td><td>ASTM C131</td><td>كل 1000m³</td></tr>
<tr><td>Flakiness Index</td><td>≤ 35%</td><td>BS 812</td><td>كل 500m³</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td><td>ASTM C127</td><td>كل 1000m³</td></tr>
<tr><td>Alkali Silica Reaction</td><td>Non-reactive</td><td>ASTM C1260</td><td>كل مصدر</td></tr>
<tr><td>Grading Analysis</td><td>حسب BS EN 12620</td><td>ASTM C136</td><td>كل 500m³</td></tr>
<tr><td>Max Aggregate Size</td><td>20mm عادي / 10mm كثيف</td><td>QCS S5 P4</td><td>—</td></tr>
</table>

<h3>3️⃣ مياه الخلط (Mixing Water)</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>Chloride</td><td>≤ 500 mg/L</td><td>BS EN 1008</td></tr>
<tr><td>Sulphate SO4</td><td>≤ 2000 mg/L</td><td>BS EN 1008</td></tr>
<tr><td>Total Dissolved Solids</td><td>≤ 2000 mg/L</td><td>BS EN 1008</td></tr>
<tr><td>pH</td><td>5 - 9</td><td>BS EN 1008</td></tr>
</table>

<h3>4️⃣ المضافات (Admixtures)</h3>
<table class="dm-table">
<tr><th>النوع</th><th>الاستخدام</th><th>المواصفة</th></tr>
<tr><td>Superplasticizer</td><td>زيادة workability بدون ماء</td><td>BS EN 934-2</td></tr>
<tr><td>Retarder</td><td>تأخير التصلب — صيف قطر</td><td>BS EN 934-2</td></tr>
<tr><td>Accelerator</td><td>تسريع التصلب — شتاء</td><td>BS EN 934-2</td></tr>
<tr><td>Air Entraining</td><td>مقاومة التجمد</td><td>BS EN 934-2</td></tr>
<tr><td>Crystalline Waterproofing</td><td>الConcrete المائية</td><td>ASTM C1202</td></tr>
</table>

<h3>5️⃣ Rebar التسليح (Reinforcement)</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>المرجع</th><th>التكرار</th></tr>
<tr><td>Yield Strength fy</td><td>≥ 500 N/mm²</td><td>BS 4449:2005</td><td>3 عينات/25t</td></tr>
<tr><td>Ultimate Strength fu</td><td>≥ 600 N/mm²</td><td>BS 4449</td><td>3 عينات/25t</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.15 و ≤ 1.35</td><td>BS 4449</td><td>3 عينات/25t</td></tr>
<tr><td>Total Elongation</td><td>≥ 14%</td><td>BS 4449</td><td>3 عينات/25t</td></tr>
<tr><td>Bend Test 180°</td><td>بدون تشقق</td><td>BS 4449</td><td>3 عينات/25t</td></tr>
<tr><td>Re-bend Test</td><td>بدون تشقق</td><td>BS 4449</td><td>3 عينات/25t</td></tr>
<tr><td>Mass per Metre</td><td>± 4.5%</td><td>BS 4449</td><td>3 عينات/25t</td></tr>
<tr><td>Mill Certificate</td><td>Grade 500B</td><td>—</td><td>كل دفعة</td></tr>
</table>

<h3>6️⃣ مواد العزل والحماية</h3>
<table class="dm-table">
<tr><th>المادة</th><th>الاستخدام</th><th>المواصفة</th></tr>
<tr><td>Bituminous Sheet</td><td>عزل الأساسات</td><td>سماكة ≥ 3mm</td></tr>
<tr><td>Crystalline Coating</td><td>Basement / Raft</td><td>ASTM C1202</td></tr>
<tr><td>Epoxy Coating</td><td>حماية الRebar</td><td>ASTM A775</td></tr>
<tr><td>Protection Board 50mm</td><td>فوق Waterproofing</td><td>—</td></tr>
<tr><td>Waterstop (PVC)</td><td>Construction Joints</td><td>BS 3053</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🧱 Structural Materials — QCS 2024 Section 5</h3>
<table class="dm-table">
<tr><th>Material</th><th>Key Specification</th><th>Test</th></tr>
<tr><td>Cement (SRPC)</td><td>BS 4027 | C3A ≤ 3.5%</td><td>Every delivery</td></tr>
<tr><td>GGBS</td><td>BS EN 15167 | Up to 50%</td><td>Every delivery</td></tr>
<tr><td>Aggregate SO3</td><td>≤ 0.4%</td><td>Per 500m³</td></tr>
<tr><td>Aggregate Chloride</td><td>≤ 0.04%</td><td>Per 500m³</td></tr>
<tr><td>Mixing Water Chloride</td><td>≤ 500 mg/L</td><td>Initial + changes</td></tr>
<tr><td>Rebar Grade</td><td>500B | fy ≥ 500 N/mm²</td><td>Per 25t</td></tr>
<tr><td>w/c Ratio</td><td>≤ 0.45 aggressive / ≤ 0.40 marine</td><td>Design</td></tr>
</table>
</div>
` },
structural_qcp: { title: '📊 خطة ضبط الجودة — الإنشاء (QCP)', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Quality Control Plan — Structural</div>

<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>الوثيقة</th><th>المحتوى</th><th>الجهة</th></tr>
<tr><td>Concrete Mix Design</td><td>JMF + Trial Mix نتائج 7 و 28 يوم</td><td>Lab + Consultant</td></tr>
<tr><td>Material Submittals</td><td>Cement + Aggregate + Water + Admixtures + Rebar</td><td>Consultant</td></tr>
<tr><td>Formwork Drawings</td><td>تفاصيل الشدات والدعائم</td><td>Consultant</td></tr>
<tr><td>Rebar Shop Drawings</td><td>Bar Bending Schedule</td><td>Consultant</td></tr>
<tr><td>Concrete Pour Plan</td><td>طريقة الصب + التسلسل</td><td>Consultant</td></tr>
<tr><td>Thermal Analysis (Raft)</td><td>للسماكات &gt; 600mm</td><td>Consultant</td></tr>
<tr><td>GI Report</td><td>توصيات التأسيس + تصنيف الكبريتات</td><td>Geotechnical Engineer</td></tr>
</table>

<h3>2.0 — Hold Points الإلزامية</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>HP-01</td><td>Founding Level — موافقة Geotechnical</td><td>Geotechnical + Consultant</td></tr>
<tr><td>HP-02</td><td>Blinding + Waterproofing قبل الRebar</td><td>Consultant</td></tr>
<tr><td>HP-03</td><td>Rebar + Cover + Spacers قبل الصب</td><td>Consultant</td></tr>
<tr><td>HP-04</td><td>Formwork قبل الصب</td><td>Consultant</td></tr>
<tr><td>HP-05</td><td>Pour Card موقع قبل الصب</td><td>Consultant</td></tr>
<tr><td>HP-06</td><td>Cube Result 7 يوم → للاستشاري</td><td>Lab + Consultant</td></tr>
<tr><td>HP-07</td><td>Cube Result 28 يوم → للقبول</td><td>Lab + Consultant</td></tr>
<tr><td>HP-08</td><td>Formwork Striking — بعد Cube 7 يوم</td><td>Consultant</td></tr>
<tr><td>HP-09 (Piles)</td><td>Base Cleanliness قبل Rebar</td><td>Consultant</td></tr>
<tr><td>HP-10 (Piles)</td><td>PIT Test 100% قبل Pile Cap</td><td>Consultant + Client</td></tr>
</table>

<h3>3.0 — الاختبارات الإلزامية</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th><th>التوقيت</th></tr>
<tr><td>Slump Test</td><td>حسب نوع الصب</td><td>كل حمولة</td><td>عند الوصول</td></tr>
<tr><td>Temperature Check</td><td>≤ 32°C</td><td>كل حمولة</td><td>عند الوصول</td></tr>
<tr><td>Cube Sampling</td><td>6 مكعبات / 50m³</td><td>كل 50m³</td><td>أثناء الصب</td></tr>
<tr><td>Cube Result 7 day</td><td>≥ 70% fcu</td><td>كل عينة</td><td>بعد 7 أيام</td></tr>
<tr><td>Cube Result 28 day</td><td>≥ 100% fcu</td><td>كل عينة</td><td>بعد 28 يوم</td></tr>
<tr><td>Rebar Tensile</td><td>fy≥500 | fu≥600</td><td>3 عينات/25t</td><td>عند الاستلام</td></tr>
<tr><td>Cover Meter</td><td>± 5mm من المطلوب</td><td>عشوائي بعد الصب</td><td>بعد الصب</td></tr>
<tr><td>Thermal Monitor (Raft)</td><td>≤70°C | ΔT≤20°C</td><td>كل 4 ساعات</td><td>أثناء الصب</td></tr>
<tr><td>PIT Test (Piles)</td><td>100% بدون عيوب</td><td>كل خازوق</td><td>بعد 7 أيام</td></tr>
</table>

<h3>4.0 — بيئة قطر — متطلبات إضافية</h3>
<table class="dm-table">
<tr><th>الحالة</th><th>المتطلب الإضافي</th></tr>
<tr><td>Sulphate Class 2+</td><td>SRPC إلزامي أو OPC+GGBS</td></tr>
<tr><td>Sulphate Class 3+</td><td>SRPC + Protective Coating</td></tr>
<tr><td>درجة حرارة &gt; 35°C</td><td>Hot Weather Concreting Plan + Ice + تبريد ركام</td></tr>
<tr><td>Coastal/Marine</td><td>C40 + w/c≤0.40 + Cover≥50mm</td></tr>
<tr><td>Bored Piles</td><td>SRPC C35 + Cover 75mm + PIT 100%</td></tr>
<tr><td>Mass Concrete (Raft)</td><td>Thermal Analysis + GGBS + Thermocouples</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>📊 Structural Quality Control Plan (QCP)</h3>
<table class="dm-table">
<tr><th>HP</th><th>Stage</th><th>Condition</th></tr>
<tr><td>HP-01</td><td>Mix Design</td><td>JMF + Trial Mix 7+28 day</td></tr>
<tr><td>HP-02</td><td>Founding Level</td><td>Geotechnical Approval</td></tr>
<tr><td>HP-03</td><td>Rebar + Cover</td><td>As drawings ±5mm</td></tr>
<tr><td>HP-04</td><td>Formwork</td><td>Structural check</td></tr>
<tr><td>HP-05</td><td>Pour Card</td><td>Consultant signed</td></tr>
<tr><td>HP-06</td><td>7-day Cube</td><td>≥ 70% fcu</td></tr>
<tr><td>HP-07</td><td>28-day Cube</td><td>≥ 100% fcu</td></tr>
<tr><td>HP-08</td><td>Formwork Strike</td><td>After cube 7-day approval</td></tr>
</table>
</div>
` },
ms_concrete: { title: '📋 Method Statement — Concrete Works', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 5 | Hot Weather Concreting — Qatar
</div>
<div class="lang-content-ar">
<h3>1.0 النطاق والمواد</h3>
<p>يغطي هذا الـ Method Statement أعمال الConcrete في قطر مع التركيز على Hot Weather Concreting والبيئة العدوانية (كبريتات + كلوريدات).</p>
<h3>2.0 المعدات</h3>
<table class="dm-table"><tr><th>المعدة</th><th>الملاحظة</th></tr>
<tr><td>Concrete Mixer Truck (Agitator)</td><td>≤ 90 دقيقة من الخلط</td></tr>
<tr><td>Concrete Pump</td><td>Slump 100-150mm للضخ</td></tr>
<tr><td>Internal Vibrator (Poker 50-75mm)</td><td>كل 450mm أفقياً</td></tr>
<tr><td>Thermometer</td><td>قياس حرارة الConcrete كل حمولة</td></tr>
<tr><td>Thermocouple System</td><td>للـ Raft / Mass Concrete إلزامي</td></tr>
</table>
<h3>3.0 التسلسل التنفيذي</h3>
<p><strong>قبل الصب:</strong><br>
• اعتماد JMF + نتائج Trial Mix (7+28 يوم)<br>
• Pour Card موقع من الاستشاري<br>
• فحص Formwork + Rebar + Cover (Hold Point)<br>
• تبريد الشدات والRebar بالماء في الصيف<br>
• التحقق من جاهزية معدات الCompaction والمعالجة</p>
<p><strong>أثناء الصب:</strong><br>
• قياس Slump كل حمولة<br>
• قياس درجة الحرارة كل حمولة — رفض أي حمولة > 32°C<br>
• أخذ Cube Samples: 6 مكعبات كل 50m³<br>
• ردم بطبقات ≤ 500mm + Compaction فوري<br>
• لا تتوقف الصبة — استمرارية إلزامية</p>
<p><strong>بعد الصب — المعالجة:</strong><br>
• بدء المعالجة خلال hour من الصب<br>
• Curing Compound فوري في الصيف<br>
• Wet Hessian فوق الـ Compound<br>
• ≥ 7 أيام OPC / ≥ 10 أيام SRPC/GGBS<br>
• مراقبة كل 4 ساعات في درجات الحرارة العالية</p>
<h3>4.0 Hot Weather Concreting — قطر</h3>
<table class="dm-table"><tr><th>الإجراء</th><th>المتطلب</th></tr>
<tr><td>تبريد مياه الخلط</td><td>إضافة ثلج — هدف ≤ 32°C عند الصب</td></tr>
<tr><td>تبريد الركام</td><td>رش ماء + ظل</td></tr>
<tr><td>وقت النقل</td><td>≤ 60 دقيقة في الصيف</td></tr>
<tr><td>وقت الصب الليلي</td><td>مفضل للعناصر الكبيرة في الصيف</td></tr>
<tr><td>Retarder Admixture</td><td>إلزامي في درجات > 35°C</td></tr>
<tr><td>GGBS Replacement</td><td>30-50% لتقليل الحرارة في الـ Raft</td></tr>
</table>
<h3>5.0 Hold Points الإلزامية</h3>
<table class="dm-table"><tr><th>HP</th><th>الشرط</th></tr>
<tr><td>HP-01</td><td>JMF + Trial Mix Approval</td></tr>
<tr><td>HP-02</td><td>Founding Level (Geotechnical Approval)</td></tr>
<tr><td>HP-03</td><td>Rebar + Formwork + Cover Inspection</td></tr>
<tr><td>HP-04</td><td>Pour Card Signed by Consultant</td></tr>
<tr><td>HP-05</td><td>Cube Result 7 Day → to Consultant</td></tr>
<tr><td>HP-06</td><td>Cube Result 28 Day → Final Acceptance</td></tr>
<tr><td>HP-07</td><td>Formwork Striking After Cube 7 Day</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Scope</h3>
<p>This Method Statement covers concrete works in Qatar with emphasis on Hot Weather Concreting and aggressive environment (sulphates + chlorides).</p>
<h3>Execution Sequence</h3>
<p><strong>Before Pour:</strong> JMF + Trial Mix approval (7+28 day) → Pour Card signed by Consultant → Formwork + Rebar + Cover inspection (Hold Point) → Pre-cool formwork and rebar in summer → Confirm vibrator and curing equipment readiness</p>
<p><strong>During Pour:</strong> Slump test every load → Temperature check every load — reject any load > 32°C → Cube samples 6 cubes per 50m³ → Place in layers ≤ 500mm + immediate compaction → Maintain continuity</p>
<p><strong>After Pour — Curing:</strong> Start curing within 1 hour → Curing compound immediately in summer → Wet hessian over compound → ≥ 7 days OPC / ≥ 10 days SRPC/GGBS → Monitor every 4 hours in extreme heat</p>
<h3>Hot Weather Concreting — Qatar</h3>
<table class="dm-table"><tr><th>Measure</th><th>Requirement</th></tr>
<tr><td>Chilled mixing water</td><td>Add ice — target ≤ 32°C at point of placement</td></tr>
<tr><td>Aggregate cooling</td><td>Water spray + shade</td></tr>
<tr><td>Transport time</td><td>≤ 60 minutes in summer</td></tr>
<tr><td>Night pouring</td><td>Preferred for large elements in summer</td></tr>
<tr><td>Retarder admixture</td><td>Mandatory above 35°C ambient</td></tr>
<tr><td>GGBS replacement</td><td>30-50% to reduce heat in Raft</td></tr>
</table>
</div>
` },
pile_load_testing: {
title: '🏗️ اختبار الأحمال على الخوازيق — QCS 2024 S5',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 5 + BS 8004 + ASTM D1143</div>
<h3>أنواع الاختبارات</h3>
<table class="dm-table"><thead><tr><th>الاختبار</th><th>الحمل</th><th>المدة</th><th>معيار القبول</th><th>التكرار</th></tr></thead><tbody>
<tr><td><strong>Static Load Test</strong></td><td>2.0 × Working Load</td><td>24 ساعة عند كل مرحلة</td><td>Settlement ≤25mm تحت WL<br>Recovery ≥75% بعد 24hr</td><td>2% من الخوازيق أو 1 per 50</td></tr>
<tr><td><strong>Maintained Load Test</strong></td><td>1.5 × WL (6 مراحل)</td><td>24hr عند max load</td><td>Rate <0.25mm/hr في آخر مرحلة</td><td>حسب Geotech recommendation</td></tr>
<tr><td><strong>Integrity Test (PIT)</strong></td><td>Low strain impact</td><td>دقائق</td><td>Signal reflection confirms continuity</td><td>100% من الخوازيق</td></tr>
</tbody></table>
<h3>إجراء Static Load Test</h3>
<table class="dm-table"><thead><tr><th>المرحلة</th><th>الحمل</th><th>مدة التحميل</th><th>القراءات</th></tr></thead><tbody>
<tr><td>1</td><td>25% WL</td><td>1 ساعة</td><td>كل 15 دقيقة</td></tr>
<tr><td>2</td><td>50% WL</td><td>1 ساعة</td><td>كل 15 دقيقة</td></tr>
<tr><td>3</td><td>75% WL</td><td>1 ساعة</td><td>كل 15 دقيقة</td></tr>
<tr><td>4</td><td>100% WL</td><td>6 ساعات</td><td>كل 30 دقيقة</td></tr>
<tr><td>5</td><td>150% WL</td><td>6 ساعات</td><td>كل 30 دقيقة</td></tr>
<tr><td>6</td><td><strong>200% WL</strong></td><td><strong>24 ساعة</strong></td><td>كل ساعة</td></tr>
<tr><td>Unload</td><td>0%</td><td>24 ساعة</td><td>قراءة Recovery</td></tr>
</tbody></table>
<div style="background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.2);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;color:var(--gold)">
💡 <strong>Kentledge أو Reaction Piles:</strong> الحمل يُطبَّق عن طريق Kentledge (كتل خرسانية) أو Reaction Piles (خوازيق ارتكاز). اختيار الطريقة حسب Working Load والموقع.
</div>
`},
mix_design_validator: {
title: '🧪 Concrete Mix Design Validator — QCS 2024',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 5 + BS EN 206 + BS 8500</div>
<h3>أدخل بيانات الخلطة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div><label style="font-size:11px;color:var(--text3)">درجة الخرسانة fcu (N/mm²)</label><select class="calc-select" id="mix-grade"><option value="25">C25</option><option value="30">C30</option><option value="35" selected>C35</option><option value="40">C40</option><option value="45">C45</option><option value="50">C50</option></select></div>
<div><label style="font-size:11px;color:var(--text3)">SO₃ في التربة (%)</label><select class="calc-select" id="mix-so3"><option value="0.1">< 0.2% — Class 1</option><option value="0.3">0.2-0.5% — Class 2</option><option value="0.7" selected>0.5-1.0% — Class 3</option><option value="1.5">> 1.0% — Class 4+</option></select></div>
<div><label style="font-size:11px;color:var(--text3)">نوع الإسمنت</label><select class="calc-select" id="mix-cement"><option value="opc">OPC (BS EN 197-1)</option><option value="srpc" selected>SRPC (BS 4027)</option><option value="ggbs">OPC + GGBS ≥50%</option></select></div>
<div><label style="font-size:11px;color:var(--text3)">w/c ratio</label><input class="calc-input" id="mix-wc" type="number" step="0.01" style="width:100%" value="0.45" placeholder="0.45"></div>
<div><label style="font-size:11px;color:var(--text3)">محتوى الإسمنت (kg/m³)</label><input class="calc-input" id="mix-cc" type="number" style="width:100%" value="350" placeholder="350"></div>
<div><label style="font-size:11px;color:var(--text3)">التطبيق</label><select class="calc-select" id="mix-use"><option value="foundation">أساسات على تربة</option><option value="column_ext">أعمدة خارجية</option><option value="slab_int">بلاطات داخلية</option><option value="pile">خوازيق</option><option value="retaining">جدران استنادية</option></select></div>
</div>
<button class="calc-btn" onclick="validateMixDesign()">🔍 تحقق من الخلطة</button>
<div class="calc-result" id="mix-result"></div>
<h3>جدول متطلبات Durability — قطر</h3>
<table class="dm-table"><thead><tr><th>SO₃ في التربة</th><th>الإسمنت المطلوب</th><th>Max w/c</th><th>Min Cement</th><th>Min fcu</th></tr></thead><tbody>
<tr><td>< 0.2%</td><td>OPC مقبول</td><td>0.55</td><td>300 kg/m³</td><td>C25</td></tr>
<tr><td>0.2–0.5%</td><td>SRPC أو OPC+GGBS≥50%</td><td>0.50</td><td>320 kg/m³</td><td>C30</td></tr>
<tr><td style="color:#e74c3c;font-weight:700">0.5–1.0%</td><td style="color:#e74c3c">SRPC إلزامي</td><td>0.45</td><td>350 kg/m³</td><td>C35</td></tr>
<tr><td style="color:#e74c3c;font-weight:700">> 1.0%</td><td style="color:#e74c3c">SRPC + Coating + دراسة</td><td>0.40</td><td>380 kg/m³</td><td>C40</td></tr>
</tbody></table>
`},
concrete_quick_ref: {
title: '🧱 مرجع سريع — درجات الخرسانة في قطر',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 5 + BS EN 206 + BS 8500</div>
<table class="dm-table"><thead><tr><th>العنصر</th><th>Exposure</th><th>Min Grade</th><th>الإسمنت</th><th>Max w/c</th><th>Min Cover</th><th>Curing</th></tr></thead><tbody>
<tr><td>Blinding</td><td>XC1</td><td><strong>C15</strong></td><td>OPC</td><td>0.65</td><td>—</td><td>3 أيام</td></tr>
<tr><td>أساسات (Blinding فوق)</td><td>XC2/XA2</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>50mm</td><td>14 يوم</td></tr>
<tr><td>أساسات (على تربة مباشرة)</td><td>XC2/XA3</td><td><strong>C40</strong></td><td>SRPC</td><td>0.40</td><td>75mm</td><td>14 يوم</td></tr>
<tr><td>جدران استنادية</td><td>XC3/XA2</td><td><strong>C35</strong></td><td>SRPC/GGBS</td><td>0.45</td><td>50mm</td><td>14 يوم</td></tr>
<tr><td>أعمدة خارجية</td><td>XC3/XD1</td><td><strong>C40</strong></td><td>SRPC</td><td>0.45</td><td>40mm</td><td>14 يوم</td></tr>
<tr><td>أعمدة داخلية</td><td>XC1</td><td><strong>C30</strong></td><td>OPC</td><td>0.55</td><td>25mm</td><td>7 أيام</td></tr>
<tr><td>بلاطات داخلية</td><td>XC1</td><td><strong>C30</strong></td><td>OPC</td><td>0.55</td><td>25mm</td><td>7 أيام</td></tr>
<tr><td>بلاطات خارجية</td><td>XC3/XD1</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>40mm</td><td>14 يوم</td></tr>
<tr><td>خوازيق Bored</td><td>XC2/XA3</td><td><strong>C40</strong></td><td>SRPC</td><td>0.40</td><td>75mm</td><td>—</td></tr>
<tr><td>خوازيق Driven</td><td>XC2/XA2</td><td><strong>C40</strong></td><td>SRPC</td><td>0.40</td><td>75mm</td><td>—</td></tr>
<tr><td>Pile Caps</td><td>XC2/XA2</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>75mm</td><td>14 يوم</td></tr>
<tr><td>Manhole Base</td><td>XA3</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>50mm</td><td>14 يوم</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:8px;margin-top:10px;font-size:11px;color:#e74c3c">
⚠️ <strong>قاعدة قطر:</strong> أي عنصر ملامس للتربة في قطر = SRPC إلزامي (SO₃ عادةً > 0.5%). لا تستخدم OPC تحت الأرض أبداً.
</div>
`},
hot_weather_detailed: {
title: '☀️ Hot Weather Concreting — خطة تفصيلية لقطر',
content: `
<div class="qcs-ref-badge">QCS 2024 S5 P4 + ACI 305R + خبرة ميدانية قطر</div>
<div style="background:rgba(46,204,113,.08);border:1px solid rgba(46,204,113,.3);border-radius:10px;padding:12px;margin-bottom:10px;font-size:12px;color:#2ecc71;line-height:1.7">🆕 <strong>QCS 2024 S5 P4 — الاشتراط الأساسي:</strong> درجة حرارة الخرسانة عند الصب ≤ 35°C — يُقاس مباشرة من عربة الخلط</div>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;color:#e74c3c;line-height:1.7">⚠️ قطر: 6 أشهر من السنة حرارة > 35°C — Hot Weather Protocol ليس اختيارياً بل إلزامي من مايو لأكتوبر</div>
<h3>جدول الإجراءات حسب درجة الحرارة</h3>
<table class="dm-table"><thead><tr><th>Ambient °C</th><th>الإجراء</th><th>Max Concrete Temp</th><th>Ice</th><th>Max Transport</th><th>Curing</th><th>صب ليلي</th></tr></thead><tbody>
<tr style="background:rgba(46,204,113,.06)"><td><strong>≤30°C</strong></td><td>عادي — لا إجراء خاص</td><td>32°C</td><td>غير مطلوب</td><td>90 دقيقة</td><td>7 أيام</td><td>اختياري</td></tr>
<tr style="background:rgba(243,156,18,.06)"><td><strong>30-35°C</strong></td><td>⚠️ احتياطات أولية</td><td>32°C</td><td>~30 kg/m³</td><td>75 دقيقة</td><td>10 أيام</td><td>يُفضَّل</td></tr>
<tr style="background:rgba(231,76,60,.06)"><td><strong>35-40°C</strong></td><td>🔴 Hot Weather Protocol كامل</td><td>32°C</td><td>~60 kg/m³</td><td>60 دقيقة</td><td>14 يوم</td><td>مُوصى بشدة</td></tr>
<tr style="background:rgba(231,76,60,.12)"><td><strong>>40°C</strong></td><td>⛔ إيقاف صب نهاري</td><td>32°C</td><td>~80 kg/m³</td><td>45 دقيقة</td><td>14 يوم</td><td>إلزامي</td></tr>
</tbody></table>
<h3>حساب كمية الثلج — Ice Calculation</h3>
<table class="dm-table"><thead><tr><th>Ambient</th><th>لكل 1m³ خرسانة</th><th>% من وزن الماء</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td>30-33°C</td><td>20-30 kg ice</td><td>15-20%</td><td>Crushed ice أو Flaked</td></tr>
<tr><td>33-37°C</td><td>40-60 kg ice</td><td>25-35%</td><td>Max 50% من وزن الماء</td></tr>
<tr><td>37-42°C</td><td>60-80 kg ice</td><td>35-50%</td><td>+ Chilled water + chilled aggregate</td></tr>
<tr><td>>42°C</td><td>80+ kg ice</td><td>50% max</td><td>صب ليلي فقط — ice + nitrogen cooling</td></tr>
</tbody></table>
<h3>إجراءات إضافية — قطر</h3>
<table class="dm-table"><thead><tr><th>الإجراء</th><th>التفصيل</th></tr></thead><tbody>
<tr><td>White tankers</td><td>شاحنات الخلط بيضاء لعكس الشمس — لا شاحنات داكنة</td></tr>
<tr><td>Shade aggregates</td><td>تظليل أكوام الركام بمظلات — رش ماء بارد</td></tr>
<tr><td>Retarder</td><td>Admixture set retarder مسموح بموافقة المصمم — يزيد Setting time 2-4 ساعات</td></tr>
<tr><td>Curing compound</td><td>يُرش فور الانتهاء — خلال 30 دقيقة max — ثم Hessian مبلل</td></tr>
<tr><td>Windbreak</td><td>حاجز رياح إذا سرعة الرياح > 25 km/h لمنع التبخر السريع</td></tr>
<tr><td>Fog spraying</td><td>رش ضبابي فوق سطح الخرسانة أثناء الصب في الحر الشديد</td></tr>
</tbody></table>
`},
exec_concrete_pour: {
title: '🏗️ آلية تنفيذ — صب الخرسانة | Concrete Pouring',
content: `
<div class="qcs-ref-badge">QCS 2024 — Part 5, Section 4 + ACI 318 + BS EN 206</div>

<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
<button onclick="showExecStep('cp',1)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">① التحضير</button>
<button onclick="showExecStep('cp',2)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">② التنفيذ</button>
<button onclick="showExecStep('cp',3)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">③ مراقبة الجودة</button>
<button onclick="showExecStep('cp',4)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">④ الأخطاء الشائعة</button>
</div>

<div id="cp-step-1">
<h3 style="color:var(--gold2)">الخطوة ① التحضير والمتطلبات</h3>
<div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:10px;padding:12px;margin-bottom:10px">
<div style="font-weight:700;color:var(--gold);margin-bottom:6px">📋 متطلبات مسبقة</div>
<div style="font-size:12px;color:var(--text2);line-height:1.8">
• RFI معتمد من SC لفحص الحديد والشدة — <span style="color:#e74c3c">Hold Point</span><br>
• Mix Design Certificate معتمد — Grade + w/c + Cement type<br>
• ITP مُوقَّع — كل بنود ما قبل الصب مُغلقة<br>
• Formwork checked: alignment + levels + cleanliness + oiling<br>
• Rebar checked: cover + spacing + lap length + continuity<br>
• Embedded items in place: sleeves + inserts + MEP boxes<br>
• <span style="color:var(--gold)">QCS 2024 S5 P4 Cl.4.1</span>
</div></div>
<div style="background:rgba(52,152,219,.06);border:1px solid rgba(52,152,219,.15);border-radius:10px;padding:12px;margin-bottom:10px">
<div style="font-weight:700;color:#3498db;margin-bottom:6px">🧱 المواد المطلوبة + مواصفاتها</div>
<div style="font-size:12px;color:var(--text2);line-height:1.8">
• الإسمنت: SRPC (SO₃ >0.5% في التربة) أو OPC (داخلي فقط) — <span style="color:var(--gold)">QCS S5 P2</span><br>
• الركام: Gabbro — LA ≤30% — Flakiness ≤25% — Absorption ≤2%<br>
• الماء: شرب أو معتمد — Chloride <500ppm — Sulphate <1000ppm<br>
• الثلج: Crushed/Flaked — max 50% من وزن الماء (صيف فقط)<br>
• Admixtures: Superplasticizer + Retarder (صيف) — مُعتمدة<br>
• Curing Compound: ASTM C309 Type 1 Class B
</div></div>
<div style="background:rgba(231,76,60,.06);border:1px solid rgba(231,76,60,.15);border-radius:10px;padding:12px">
<div style="font-weight:700;color:#e74c3c;margin-bottom:6px">⛑️ السلامة — PPE إلزامي</div>
<div style="font-size:12px;color:var(--text2);line-height:1.8">
• خوذة + نظارة + سترة عاكسة + حذاء أمان + قفازات مقاومة للقلوية<br>
• حبل أمان إذا العمل على ارتفاع >2m<br>
• إضاءة ≥50 Lux (صب ليلي)<br>
• ماء شرب + استراحة كل ساعة (صيف >35°C)
</div></div>
</div>

<div id="cp-step-2" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ② تسلسل التنفيذ</h3>
<div style="margin-bottom:12px">
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">1</div><div style="font-size:12px"><strong style="color:var(--gold2)">فحص الشدة والحديد</strong><br>SC يفحص: Formwork alignment ±3mm | Cover spacers كل 1m | Rebar per drawing<br><span style="color:#e74c3c;font-weight:700">🔴 HOLD POINT — لا صب بدون اعتماد — QCS S5 P4 Cl.4.2</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">2</div><div style="font-size:12px"><strong style="color:var(--gold2)">استلام الشاحنة + فحوصات</strong><br>Delivery Ticket: Grade + Slump + w/c + Admixtures + Time of batching<br>Temp check: ≤32°C — أي شاحنة >32°C تُرفض فوراً<br>زمن: ≤90 دقيقة (≤60 صيفاً) من الخلط — <span style="color:var(--gold)">QCS S5 P4 Cl.4.3</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">3</div><div style="font-size:12px"><strong style="color:var(--gold2)">Slump Test + Cube Sampling</strong><br>Slump: 75-100mm (عادي) أو 100-150mm (ضخ) — خارج = رفض<br>6 مكعبات/50m³ (3 لـ 7 يوم + 3 لـ 28 يوم) — <span style="color:var(--gold)">BS EN 12350</span><br><span style="color:#e74c3c;font-weight:700">🔴 HOLD POINT — QCS S5 P4 Cl.4.5</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">4</div><div style="font-size:12px"><strong style="color:var(--gold2)">الصب والهز</strong><br>Free fall ≤1.5m | Layer ≤500mm | Poker 50-75mm كل 450mm أفقياً<br>مدة الهز 10-15 ثانية — لا over-vibration (segregation)<br>Cold Joint: لا يتجاوز 30 دقيقة بين الطبقات — <span style="color:var(--gold)">QCS S5 P4 Cl.4.6</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">5</div><div style="font-size:12px"><strong style="color:var(--gold2)">التسوية والإنهاء</strong><br>Bull float → Power trowel (بعد اختفاء ماء النزيف)<br>Curing compound فوري خلال 30 دقيقة — ثم Hessian مبلل<br><span style="color:var(--gold)">QCS S5 P4 Cl.4.7</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">6</div><div style="font-size:12px"><strong style="color:var(--gold2)">المعالجة Curing</strong><br>OPC: 7 أيام min | SRPC: 14 يوم إلزامي في قطر<br>Hessian + water رش كل 4 ساعات | أو Curing compound ASTM C309<br>Stripping: أعمدة بعد 24hr | بلاطات بعد 14 يوم — <span style="color:var(--gold)">QCS S5 P4 Cl.4.8</span></div></div>
</div>
</div>

<div id="cp-step-3" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ③ مراقبة الجودة</h3>
<table class="dm-table"><thead><tr><th>الاختبار</th><th>المعيار</th><th>معيار القبول</th><th>التكرار</th><th>HP/W</th></tr></thead><tbody>
<tr><td>Slump Test</td><td>BS EN 12350-2</td><td>±25mm من Target</td><td>كل شاحنة</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Concrete Temperature</td><td>QCS S5</td><td>≤32°C</td><td>كل شاحنة</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Cube Sampling</td><td>BS EN 12390-2</td><td>—</td><td>6 cubes/50m³</td><td style="color:#f39c12">W</td></tr>
<tr><td>7-day Cube</td><td>BS EN 12390-3</td><td>≥70% fcu</td><td>3 cubes</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>28-day Cube</td><td>BS EN 12390-3</td><td>≥100% fcu (avg 3)</td><td>3 cubes</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Air Content</td><td>BS EN 12350-7</td><td>Per mix design</td><td>1/day</td><td style="color:#f39c12">W</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.06);border:1px solid rgba(231,76,60,.15);border-radius:8px;padding:10px;margin-top:10px;font-size:11px;color:#e74c3c">
⚠️ <strong>إذا 7-day < 70% fcu:</strong> إيقاف فوري + تحقيق + انتظار 28 يوم → إذا <100% → Core Test + NCR
</div>
</div>

<div id="cp-step-4" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ④ أكثر 5 أخطاء شيوعاً</h3>
<table class="dm-table"><thead><tr><th>#</th><th>الخطأ</th><th>كيفية التجنب</th><th>الإجراء التصحيحي</th></tr></thead><tbody>
<tr><td>1</td><td style="color:#e74c3c"><strong>إضافة ماء في الموقع</strong></td><td>ممنوع نهائياً — Slump يُعدَّل بـ Admixture فقط</td><td>رفض الشاحنة + NCR</td></tr>
<tr><td>2</td><td style="color:#e74c3c"><strong>Concrete temp >32°C</strong></td><td>Ice + Chilled water + صب ليلي</td><td>رفض الشاحنة</td></tr>
<tr><td>3</td><td style="color:#e74c3c"><strong>Cold Joint (>30 دقيقة)</strong></td><td>خطة صب مستمرة + شاحنة احتياطية</td><td>Chipping + bonding agent + NCR</td></tr>
<tr><td>4</td><td style="color:#f39c12"><strong>Honeycomb تعشيش</strong></td><td>هز كافي + free fall ≤1.5m + spacing rebar</td><td>Structural repair + grout</td></tr>
<tr><td>5</td><td style="color:#f39c12"><strong>Curing ناقص</strong></td><td>Hessian فوري + رش كل 4hr + 14 يوم SRPC</td><td>Surface crazing → sealant + NCR</td></tr>
</tbody></table>
</div>
`},
exec_foundation_excavation: {
title: '⛏️ آلية تنفيذ — حفر الأساسات | Foundation Excavation',
content: `
<div class="qcs-ref-badge">QCS 2024 S5 P2 + BS EN 1997-1 (EC7) + Ashghal PWA</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
<button onclick="showExecStep('fe',1)" style="background:linear-gradient(135deg,rgba(155,89,182,.3),rgba(155,89,182,.1));border:1px solid rgba(155,89,182,.5);border-radius:20px;padding:6px 14px;font-size:11px;color:#9b59b6;cursor:pointer;font-family:Tajawal;font-weight:700">① التحضير</button>
<button onclick="showExecStep('fe',2)" style="background:var(--dark4);border:1px solid rgba(155,89,182,.3);border-radius:20px;padding:6px 14px;font-size:11px;color:#9b59b6;cursor:pointer;font-family:Tajawal;font-weight:700">② التنفيذ</button>
<button onclick="showExecStep('fe',3)" style="background:var(--dark4);border:1px solid rgba(155,89,182,.3);border-radius:20px;padding:6px 14px;font-size:11px;color:#9b59b6;cursor:pointer;font-family:Tajawal;font-weight:700">③ مراقبة الجودة</button>
<button onclick="showExecStep('fe',4)" style="background:var(--dark4);border:1px solid rgba(155,89,182,.3);border-radius:20px;padding:6px 14px;font-size:11px;color:#9b59b6;cursor:pointer;font-family:Tajawal;font-weight:700">④ الأخطاء الشائعة</button>
</div>

<div id="fe-step-1">
<h3 style="color:var(--gold2)">الخطوة ① التحضير والمتطلبات</h3>
<div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:10px;padding:12px;margin-bottom:10px">
<div style="font-weight:700;color:var(--gold);margin-bottom:6px">📋 متطلبات مسبقة — Pre-requisites</div>
<div style="font-size:12px;color:var(--text2);line-height:1.9">
• تقرير الجسات (GIR) معتمد — نوع التربة + GWT Level + Bearing Capacity<br>
• مخططات الأساسات معتمدة من المهندس المشرف<br>
• Excavation Permit + Method Statement معتمد<br>
• <span style="color:#e74c3c;font-weight:700">HOLD POINT: Survey check — levels + setting out </span> — <span style="color:var(--gold)">QCS S5 P2 Cl.2.1</span><br>
• تحديد كل الخدمات القائمة (Gas · Water · Electric · Telecom) قبل الحفر<br>
• خطة Dewatering إذا GWT &lt; 2m من مستوى الحفر<br>
• Risk Assessment + TBT للطاقم
</div></div>
<div style="background:rgba(52,152,219,.06);border:1px solid rgba(52,152,219,.15);border-radius:10px;padding:12px;margin-bottom:10px">
<div style="font-weight:700;color:#3498db;margin-bottom:6px">🚜 المعدات المطلوبة</div>
<div style="font-size:12px;color:var(--text2);line-height:1.9">
• Excavator (CAT 320 أو مكافئ) — Bucket width مناسب<br>
• Shoring System: Sheet Piles أو Soldier Piles + Lagging (عمق >1.5m)<br>
• Dewatering Pump: Submersible ≥50m³/hr إذا GWT مرتفع<br>
• Level + Total Station للرقابة المستمرة<br>
• DCP لفحص Subgrade بعد الوصول للمستوى<br>
• Spoil Trucks + Skip Boxes
</div></div>
<div style="background:rgba(231,76,60,.06);border:1px solid rgba(231,76,60,.15);border-radius:10px;padding:12px">
<div style="font-weight:700;color:#e74c3c;margin-bottom:6px">⛑️ سلامة الحفريات — إلزامي</div>
<div style="font-size:12px;color:var(--text2);line-height:1.9">
• Shoring إلزامي لأي حفر >1.2m (QCS S1 P3)<br>
• Barricade + Warning Tape مسافة ≥1.5m من حافة الحفرة<br>
• Ladder/Ramp إخلاء — كل 15m طولي<br>
• مراقب سلامة دائم أثناء الحفر<br>
• لا مركبات ثقيلة <3m من حافة الحفرة<br>
• إضاءة ليلية ≥50 Lux إذا عمل ليلي
</div></div>
</div>

<div id="fe-step-2" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ② تسلسل التنفيذ</h3>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(155,89,182,.2);border:1px solid rgba(155,89,182,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9b59b6">1</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">Setting Out + Levels</strong><br>Survey team يحدد حدود الحفر + المستويات (Founding Level per drawing)<br>Pins + Chalk lines كل زاوية<br><span style="color:#e74c3c;font-weight:700">🔴 HOLD POINT — QCS S5 P2 Cl.2.2</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(155,89,182,.2);border:1px solid rgba(155,89,182,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9b59b6">2</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">Shoring تركيب الدعامات</strong><br>تركيب Sheet Piles أو Shoring Boxes قبل الحفر للأعماق >1.5m<br>Waling beams + Struts حسب Method Statement<br><span style="color:var(--gold)">QCS S1 P3 Cl.8.4</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(155,89,182,.2);border:1px solid rgba(155,89,182,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9b59b6">3</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">الحفر المتدرج — Staged Excavation</strong><br>حفر بمراحل: 1.5m - 1.5m - حتى Founding Level<br>مراقبة جدران الحفرة بعد كل مرحلة<br>تصريف المياه Dewatering مستمر<br><span style="color:var(--gold)">QCS S5 P2 Cl.2.3</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.3);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(231,76,60,.3);border:1px solid rgba(231,76,60,.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#e74c3c">4</div>
<div style="font-size:12px"><strong style="color:#e74c3c">🔴 HOLD POINT — فحص مستوى التأسيس</strong><br>Geotechnical Engineer يوافق على Founding Level — Bearing Capacity مقبولة<br>DCP Reading + Visual inspection — No Sabkha + No Soft Spots<br><span style="color:#e74c3c;font-weight:700">لا يُسمح بالمتابعة قبل الاعتماد — QCS S5 P2 Cl.2.4 + EC7</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(155,89,182,.2);border:1px solid rgba(155,89,182,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9b59b6">5</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">Blinding Concrete</strong><br>صب Lean Concrete C15 سُمك 75mm فوراً بعد الموافقة على مستوى التأسيس<br>يحمي التربة من الجفاف والتلوث<br><span style="color:var(--gold)">QCS S5 P2 Cl.2.5</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(155,89,182,.2);border:1px solid rgba(155,89,182,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9b59b6">6</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">التسوية النهائية + Drainage</strong><br>تسوية قاع الحفرة ±10mm | Sump Pit للصرف المستمر<br>RFI مفتوح لفحص التسليح — القدم التالية<br><span style="color:var(--gold)">QCS S5 P2</span></div></div>
</div>

<div id="fe-step-3" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ③ مراقبة الجودة</h3>
<table class="dm-table"><thead><tr><th>الفحص</th><th>المعيار</th><th>التكرار</th><th>HP/W</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Setting Out</td><td>±10mm level | ±25mm plan</td><td>قبل الحفر</td><td style="color:#e74c3c">HP</td><td>QCS S5 P2</td></tr>
<tr><td>Founding Level</td><td>per drawing ±25mm</td><td>100% عند الوصول</td><td style="color:#e74c3c">HP</td><td>EC7 + QCS</td></tr>
<tr><td>DCP at Founding</td><td>CBR ≥ design requirement</td><td>كل 5m²</td><td style="color:#e74c3c">HP</td><td>ASTM D6951</td></tr>
<tr><td>Shoring Inspection</td><td>per Method Statement</td><td>يومي</td><td style="color:#f39c12">W</td><td>QCS S1 P3</td></tr>
<tr><td>GWT Level</td><td>≥500mm below founding</td><td>يومي</td><td style="color:#f39c12">W</td><td>EC7</td></tr>
<tr><td>Side Slopes</td><td>per soil type (1:1 to 1:2)</td><td>بعد كل مرحلة</td><td style="color:#f39c12">W</td><td>QCS S5</td></tr>
<tr><td>Blinding Thickness</td><td>75mm min (C15)</td><td>100%</td><td style="color:#e74c3c">HP</td><td>QCS S5 P2</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.06);border:1px solid rgba(231,76,60,.15);border-radius:8px;padding:10px;margin-top:10px">
<div style="font-weight:700;color:#e74c3c;font-size:12px;margin-bottom:6px">📋 Hold Points الإلزامية — لا متابعة بدون اعتماد</div>
<div style="font-size:11px;color:var(--text2);line-height:1.8">
1️⃣ <strong>HP-FE-01:</strong> Setting Out — Survey approval قبل الحفر<br>
2️⃣ <strong>HP-FE-02:</strong> Founding Level — Geotechnical Engineer + SC signature<br>
3️⃣ <strong>HP-FE-03:</strong> Blinding acceptance — قبل تسليح القاعدة
</div></div>
</div>

<div id="fe-step-4" style="display:none">
<h3 style="color:var(--gold2)">④ أخطاء شائعة في حفر الأساسات</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>الخطورة</th><th>التجنب</th><th>الإجراء التصحيحي</th></tr></thead><tbody>
<tr><td style="color:#e74c3c">الحفر أعمق من Founding Level</td><td>🔴 عالي</td><td>Survey spot checks مستمر</td><td>Lean Concrete C15 لملء الفائض + موافقة جيوتقنية</td></tr>
<tr><td style="color:#e74c3c">Soft Spot في القاع</td><td>🔴 عالي</td><td>DCP كل 5m²</td><td>Over-excavation + Granular Fill + Compaction 95% + Geotechnical approval</td></tr>
<tr><td style="color:#e74c3c">انهيار جدار الحفرة</td><td>🔴 خطر نفسي</td><td>Shoring صحيح + لا أحمال قريبة</td><td>إيقاف فوري + Rescue plan + تعزيز الشoring</td></tr>
<tr><td style="color:#f39c12">التأخر في Blinding</td><td>🟠 متوسط</td><td>صب خلال 4 ساعات</td><td>رش ماء لمنع الجفاف + صب فوري</td></tr>
<tr><td style="color:#f39c12">Sabkha غير مُشخَّصة</td><td>🟠 متوسط</td><td>GIR تفصيلي + Chemical tests</td><td>استشاري جيوتقني + معالجة per IAN-006</td></tr>
<tr><td style="color:#f39c12">ارتفاع GWT مفاجئ</td><td>🟠 متوسط</td><td>Dewatering plan مسبق</td><td>تشغيل مضخات إضافية + Sump pits</td></tr>
</tbody></table>
</div>
`},
exec_bridge_rebar: {
title: '🌉 آلية تنفيذ — تسليح الجسور | Bridge Reinforcement',
content: `
<div class="qcs-ref-badge">QCS 2024 S5 P3 + BS EN 1992-2 (Eurocode 2 Bridges) + Ashghal Bridge Manual</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
<button onclick="showExecStep('br',1)" style="background:linear-gradient(135deg,rgba(231,76,60,.3),rgba(231,76,60,.1));border:1px solid rgba(231,76,60,.5);border-radius:20px;padding:6px 14px;font-size:11px;color:#e74c3c;cursor:pointer;font-family:Tajawal;font-weight:700">① التحضير</button>
<button onclick="showExecStep('br',2)" style="background:var(--dark4);border:1px solid rgba(231,76,60,.3);border-radius:20px;padding:6px 14px;font-size:11px;color:#e74c3c;cursor:pointer;font-family:Tajawal;font-weight:700">② التنفيذ</button>
<button onclick="showExecStep('br',3)" style="background:var(--dark4);border:1px solid rgba(231,76,60,.3);border-radius:20px;padding:6px 14px;font-size:11px;color:#e74c3c;cursor:pointer;font-family:Tajawal;font-weight:700">③ مراقبة الجودة</button>
<button onclick="showExecStep('br',4)" style="background:var(--dark4);border:1px solid rgba(231,76,60,.3);border-radius:20px;padding:6px 14px;font-size:11px;color:#e74c3c;cursor:pointer;font-family:Tajawal;font-weight:700">④ الأخطاء الشائعة</button>
</div>

<div id="br-step-1">
<h3 style="color:var(--gold2)">الخطوة ① التحضير والمتطلبات</h3>
<div style="background:rgba(231,76,60,.06);border:1px solid rgba(231,76,60,.15);border-radius:10px;padding:12px;margin-bottom:10px">
<div style="font-weight:700;color:#e74c3c;margin-bottom:6px">🌉 متطلبات خاصة بالجسور</div>
<div style="font-size:12px;color:var(--text2);line-height:1.9">
• Shop Drawings معتمدة — bar schedule + bending schedule مطابق للـ BS 8666<br>
• Mill Certificates للحديد: BS 4449 Grade B500B أو B500C (Ductility Class للجسور)<br>
• Cover for Bridge Deck: <strong style="color:#e74c3c">75mm min</strong> (Saline Qatar environment) — <span style="color:var(--gold)">QCS S5 P3 Table 5:4</span><br>
• Cover for Piers/Abutments: <strong style="color:#e74c3c">75mm min</strong> — Splash Zone يحتاج 85mm<br>
• Coupler system معتمد إذا Bar >40mm diameter<br>
• <span style="color:#e74c3c;font-weight:700">HOLD POINT: Rebar acceptance inspection قبل أي صب</span>
</div></div>
<div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:10px;padding:12px;margin-bottom:10px">
<div style="font-weight:700;color:var(--gold);margin-bottom:6px">📏 Cover Requirements — جسور قطر</div>
<table class="dm-table" style="margin-top:6px"><thead><tr><th>العنصر</th><th>Minimum Cover</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Bridge Deck (Top)</td><td style="color:#e74c3c;font-weight:700">75mm</td><td>QCS S5 P3</td></tr>
<tr><td>Bridge Deck (Soffit)</td><td style="color:#e74c3c;font-weight:700">75mm</td><td>QCS S5 P3</td></tr>
<tr><td>Piers / Columns</td><td style="color:#e74c3c;font-weight:700">75mm</td><td>QCS S5 P3</td></tr>
<tr><td>Abutments</td><td style="color:#e74c3c;font-weight:700">75mm</td><td>QCS S5 P3</td></tr>
<tr><td>Pile Caps</td><td style="color:#f39c12;font-weight:700">75mm (blinding 75mm extra)</td><td>QCS S5 P2</td></tr>
<tr><td>Splash Zone (tidal)</td><td style="color:#e74c3c;font-weight:700">85mm</td><td>BS EN 1992-2</td></tr>
</tbody></table>
</div>
<div style="background:rgba(52,152,219,.06);border:1px solid rgba(52,152,219,.15);border-radius:10px;padding:12px">
<div style="font-weight:700;color:#3498db;margin-bottom:6px">🔗 Lap Lengths للجسور</div>
<div style="font-size:12px;color:var(--text2);line-height:1.9">
• Tension Lap: <strong>50d</strong> min للجسور (vs 40d للأبنية) — بيئة قاسية<br>
• Compression Lap: <strong>40d</strong><br>
• No laps في Zones of Maximum Stress (Mid-span + Pier tops)<br>
• Stagger laps: 50% stagger minimum — لا laps في نفس القطاع<br>
• <span style="color:var(--gold)">QCS S5 P3 Cl.3.6 + EC2-2</span>
</div></div>
</div>

<div id="br-step-2" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ② تسلسل التنفيذ</h3>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(231,76,60,.2);border:1px solid rgba(231,76,60,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#e74c3c">1</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">Blinding + Setting Out التسليح</strong><br>قياس Blinding thickness: 75mm min | Centerline marking + Cover chairs layout<br>Cover chairs: Concrete (لا plastic) — كل 1m شبكي<br><span style="color:var(--gold)">QCS S5 P3</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(231,76,60,.2);border:1px solid rgba(231,76,60,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#e74c3c">2</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">تركيب الطبقة السفلية</strong><br>Bottom mat: طبقة أفقية + Transverse bars<br>فحص spacing: per drawing ±10mm | Bar sizes per schedule<br>Chairs/Spacers: plastic-capped wire ty أو precast concrete blocks<br><span style="color:var(--gold)">QCS S5 P3 Cl.3.3</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(231,76,60,.2);border:1px solid rgba(231,76,60,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#e74c3c">3</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">Shear Links + Stirrups</strong><br>كل حلقات قص per drawing — 135° hook ends إلزامي للجسور<br>Link spacing: Tension Zone أضيق — per drawing<br><span style="color:var(--gold)">EC2-2 Cl.9.2.2</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.3);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(231,76,60,.3);border:1px solid rgba(231,76,60,.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#e74c3c">4</div>
<div style="font-size:12px"><strong style="color:#e74c3c">🔴 HOLD POINT — فحص التسليح الكامل</strong><br>SC + Resident Engineer يفحص: Cover ≥75mm كل 2m² | Spacing per drawing | Lap Zones | Links<br>Cover Meter scan + Photography documentation<br><span style="color:#e74c3c;font-weight:700">لا صب قبل الاعتماد الخطي — QCS S5 P3 Cl.3.8</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px">
<div style="min-width:28px;height:28px;background:rgba(231,76,60,.2);border:1px solid rgba(231,76,60,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#e74c3c">5</div>
<div style="font-size:12px"><strong style="color:var(--gold2)">Continuity Steel + Deck Reinforcement</strong><br>Continuity bars across joints | Top mat deck: Cover 75mm from top<br>Expansion joint rebar details per design<br>Pre-stressing ducts (if PT) — duct location per drawing ±5mm<br><span style="color:var(--gold)">Ashghal Bridge Manual + EC2-2</span></div></div>
</div>

<div id="br-step-3" style="display:none">
<h3 style="color:var(--gold2)">الخطوة ③ مراقبة الجودة</h3>
<table class="dm-table"><thead><tr><th>الفحص</th><th>معيار القبول</th><th>التكرار</th><th>HP/W</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Cover (Bottom)</td><td>75mm ± 5mm</td><td>كل 2m²</td><td style="color:#e74c3c">HP</td><td>QCS S5 P3</td></tr>
<tr><td>Cover (Top Deck)</td><td>75mm ± 5mm</td><td>كل 2m²</td><td style="color:#e74c3c">HP</td><td>QCS S5 P3</td></tr>
<tr><td>Bar Diameter</td><td>per drawing ±2%</td><td>10% sample</td><td style="color:#f39c12">W</td><td>BS 4449</td></tr>
<tr><td>Bar Spacing</td><td>per drawing ±10mm</td><td>كل 5m</td><td style="color:#f39c12">W</td><td>QCS S5 P3</td></tr>
<tr><td>Lap Length</td><td>≥50d (Tension) / ≥40d (Comp)</td><td>كل Lap</td><td style="color:#e74c3c">HP</td><td>EC2-2</td></tr>
<tr><td>Link hooks</td><td>135° min</td><td>100%</td><td style="color:#e74c3c">HP</td><td>EC2-2 Cl.8.5</td></tr>
<tr><td>Mill Certificate</td><td>BS 4449 B500B/C</td><td>كل batch</td><td style="color:#e74c3c">HP</td><td>BS 4449</td></tr>
<tr><td>Coupler (if used)</td><td>Tensile test ≥ bar capacity</td><td>5% sample</td><td style="color:#e74c3c">HP</td><td>BS EN ISO 15630</td></tr>
</tbody></table>
</div>

<div id="br-step-4" style="display:none">
<h3 style="color:var(--gold2)">④ أخطاء شائعة في تسليح الجسور</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>الأثر</th><th>التجنب</th><th>التصحيح</th></tr></thead><tbody>
<tr><td style="color:#e74c3c">Cover &lt;75mm</td><td>Corrosion خلال 10-15 سنة</td><td>Concrete chairs — لا wire فقط</td><td>إعادة فك التسليح + Chairs صحيحة</td></tr>
<tr><td style="color:#e74c3c">Laps في Sagging Zone</td><td>Failure عند أقصى عزم</td><td>Lap schedule واضح + تحقق</td><td>إزالة + Couplers بديلاً</td></tr>
<tr><td style="color:#e74c3c">90° Hook بدل 135°</td><td>Anchorage failure under dynamic load</td><td>Bar schedule يحدد الـ hook</td><td>فك + إعادة ثني أو استبدال</td></tr>
<tr><td style="color:#f39c12">عدم Staggering الـ Laps</td><td>Crack concentration</td><td>50% stagger minimum</td><td>إعادة تحديد positions</td></tr>
<tr><td style="color:#f39c12">Duct Clash مع Rebar (PT)</td><td>تعذر التوتر اللاحق</td><td>Clash detection رقمي قبل التنفيذ</td><td>إعادة رسم + Structural Engineer</td></tr>
</tbody></table>
</div>
`},
structural_equipment: { title: '🏗️ معدات أعمال الإنشاء — Structural Equipment', content: `
<div style="background:rgba(122,21,21,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;color:var(--gold);">
📌 QCS 2024 Section 5 — Concrete, Rebar, Formwork, Piling
</div>
<div style="display:flex;flex-direction:column;gap:10px;">

${[
{emoji:'🚛',name:'Transit Mixer',ar:'ميكسر الخرسانة (Transit Mixer)',ref:'QCS S5 P4.4 + BS EN 206',desc:'نقل وخلط الخرسانة الجاهزة من المصنع إلى الموقع',cap:'6-10 m³/truck',sets:{'Rotation Speed (Transport)':'1-2 rpm','Rotation Speed (Discharge)':'6-18 rpm','Max Delivery Time':'≤90 min (Summer Qatar: ≤45 min)','Max Drum Turns':'≤300 after water added'},qc:['فحص Slump عند الوصول','قياس درجة الحرارة ≤32°C','رقم Batch + وقت الخروج من المصنع','رفض أي ميكسر تجاوز 90 دقيقة'],acc:'Slump: per design | Temp ≤32°C | Delivery ≤90min',safe:'ممنوع الوقوف تحت Chute أثناء التفريغ'},
{emoji:'🏗️',name:'Concrete Pump',ar:'مضخة الخرسانة',ref:'QCS S5 P4.5',desc:'ضخ الخرسانة للمواضع البعيدة أو الارتفاعات',cap:'60-150 m³/hr | Up to 100m vertical',sets:{'Line Diameter':'Min 125mm','Max Stone Size':'20mm (smaller than pipe × 1/3)','Prime':'Cement mortar + water first','Pressure':'Monitor per chart'},qc:['Prime the line بـ Cement mortar','Slump عند المضخة ≥100mm (100-150mm)','فحص Pipe connections قبل الضخ','عدم رج الخرسانة بالماء أثناء الضخ'],acc:'No segregation | Slump 100-150mm | Continuous pour (no cold joints)',safe:'PPE كامل | Pressure line مُؤمَّن | Boom locked when stationary'},
{emoji:'📳',name:'Internal Vibrator (Poker)',ar:'المرتجّ الداخلي (Poker Vibrator)',ref:'QCS S5 P4.7 + BS 8500',desc:'دمك الخرسانة وإزالة فراغات الهواء',cap:'Dia: 50-75mm | Freq: 150-200Hz',sets:{'Insertion Spacing':'≤450mm (1.5× radius of action)','Depth':'Penetrate 150mm into previous layer','Duration':'5-15 sec per insertion','Withdrawal':'Slow — 100mm/sec'},qc:['الإدخال العمودي قدر الإمكان','لا يلامس الـ Formwork أو الحديد','مراقبة الفقاعات على السطح','Radius of action: 300mm'],acc:'No visible voids | No honeycombing on striking | Uniform surface',safe:'ممنوع استخدام الـ Vibrator لنقل الخرسانة أفقياً'},
{emoji:'🔩',name:'Bar Bending Machine',ar:'آلة ثني الحديد',ref:'QCS S5 P3.3 + BS 4449',desc:'ثني حديد التسليح بالزوايا والأقطار الصحيحة',cap:'Up to dia. 40mm',sets:{'Bend Radius':'Min 4d (d=bar diameter)','Bend Angle':'Accurate ±2°','Temperature':'No bending <5°C (embrittlement)','Cage Support':'Every 1.5m'},qc:['قياس Bend radius بالـ Template','لا ثني على اللحام أو في نقطة العيب','فحص قطر الحديد vs الرسم','Mill Certificate مرافق لكل شحنة'],acc:'Dimensions: ±10mm | Cover blocks: per drawing | Spacing: ±10mm',safe:'قفازات + أحذية فولاذية | Bar ends protected with caps'},
{emoji:'✂️',name:'Bar Cutting Machine',ar:'آلة قطع الحديد',ref:'QCS S5 P3.3',desc:'قطع حديد التسليح بالأطوال المحددة',cap:'Up to dia. 40mm',sets:{'Cut Face':'Perpendicular — no angle','Blade Condition':'Inspect daily','Work Area':'Clear 2m radius'},qc:['قياس الطول بعد القطع ±25mm','لا قطع حراري (Flame Cutting)','Laps وفق الرسم — تجنب Lap في منطقة الشد'],acc:'Length: ±25mm | No flame cutting | End face perpendicular',safe:'Guard في مكانه | خوذة + واقي وجه | لا أحد في Zone القطع'},
{emoji:'🧪',name:'Slump Cone + Cube Moulds',ar:'مخروط Slump + قوالب Cube',ref:'BS EN 12350 + BS EN 12390',desc:'اختبار قوام وقوة الخرسانة في الموقع',cap:'Cone: 300mm H | Cube: 150×150×150mm',sets:{'Sampling':'Random from middle of truck discharge','Filling':'3 layers × 25 rods each','Leveling':'Strike off flush','Curing':'Damp cloth + plastic 24hr'},qc:['أخذ عينة Slump + 6 Cubes كل 50m³','ترقيم + تاريخ + موقع + Batch number','نقل الـ Cubes للمختبر خلال 24hr','قراءة 7يوم + 28يوم'],acc:'7-day: ≥70% fcu | 28-day: ≥100% fcu | Slump: per mix design',safe:'لا حوادث خاصة — التخلص من الكيماويات بشكل صحيح'},
{emoji:'🏛️',name:'Formwork System',ar:'الشدة الخشبية/المعدنية (Formwork)',ref:'QCS S5 P4.2 + BS 5975',desc:'قالب لحصر الخرسانة بالشكل المطلوب حتى التصلب',cap:'حسب التصميم الإنشائي',sets:{'Lateral Pressure':'ρ × g × h (kN/m²)','Strike Time':'Columns: 16hr | Slabs: 21 days | Beams: 14 days','Plywood':'Min 18mm Marine Grade','Props':'Adjustable every 1.5m'},qc:['Formwork Design معتمد من مهندس إنشائي','فحص Plumb + Level + Alignment قبل الصب','التأكد من Chamfer strips عند الزوايا','لا ثقوب — توصيلات محكمة'],acc:'Deviation: ±6mm (Plumb) | ±10mm (Level) | No grout loss',safe:'لا إزالة مبكرة — Prop loading حسب الجدول'},
].map(function(e){return `
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
  <div style="background:rgba(122,21,21,0.08);padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)">
    <span style="font-size:24px">${e.emoji}</span>
    <div><div style="font-size:14px;font-weight:700;color:var(--text)">${e.ar}</div><div style="font-size:10px;color:var(--gold)">${e.ref}</div></div>
  </div>
  <div style="padding:12px 14px">
    <p style="font-size:12px;color:var(--text2);margin-bottom:10px">${e.desc} — <strong style="color:var(--text3)">الطاقة: ${e.cap}</strong></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:var(--gold);font-weight:700;margin-bottom:6px">⚙️ الإعدادات</div>
        ${Object.entries(e.sets).map(([k,v])=>`<div style="font-size:11px;color:var(--text2);display:flex;justify-content:space-between;gap:4px"><span>${k}:</span><span style="color:var(--text);font-weight:600">${v}</span></div>`).join('')}
      </div>
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:var(--gold);font-weight:700;margin-bottom:6px">✅ فحوصات QC</div>
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
structures_buildings: { title: '🏗️ الإنشاءات — الأبراج والمباني السكنية', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;color:#3498db;">
📌 QCS 2024 — Section 5 | BS EN 1992 | بناء الأبراج والمباني السكنية والتجارية
</div>
<h3>📐 اختر المرحلة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('struct_survey')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">📐</div><div style="color:#3498db;font-weight:700;font-size:12px;">الدراسة والتصميم</div>
<div style="color:var(--text3);font-size:10px;">Survey + Design + NOC</div></div>
<div onclick="QS.openDetail('struct_foundation')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🏛️</div><div style="color:#3498db;font-weight:700;font-size:12px;">الأساسات</div>
<div style="color:var(--text3);font-size:10px;">Strip + Raft + Piles + Tests</div></div>
<div onclick="QS.openDetail('struct_concrete')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🏗️</div><div style="color:#3498db;font-weight:700;font-size:12px;">الخرسانة المسلحة</div>
<div style="color:var(--text3);font-size:10px;">Mix Design + صب + Curing</div></div>
<div onclick="QS.openDetail('struct_rebar')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🔩</div><div style="color:#3498db;font-weight:700;font-size:12px;">حديد التسليح</div>
<div style="color:var(--text3);font-size:10px;">Grade 500B + Cover + Lap</div></div>
<div onclick="QS.openDetail('struct_masonry')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🧱</div><div style="color:#3498db;font-weight:700;font-size:12px;">البناء والطابوق</div>
<div style="color:var(--text3);font-size:10px;">Block + Mortar + Tests</div></div>
<div onclick="QS.openDetail('struct_waterproofing')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">💧</div><div style="color:#3498db;font-weight:700;font-size:12px;">العزل المائي</div>
<div style="color:var(--text3);font-size:10px;">Basement + Roof + Tests</div></div>
<div onclick="QS.openDetail('struct_finishing')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🪟</div><div style="color:#3498db;font-weight:700;font-size:12px;">التشطيبات</div>
<div style="color:var(--text3);font-size:10px;">Plaster + Tiles + Paint</div></div>
<div onclick="QS.openDetail('struct_handover')" style="background:rgba(44,62,80,0.3);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">✅</div><div style="color:#3498db;font-weight:700;font-size:12px;">التسليم</div>
<div style="color:var(--text3);font-size:10px;">Inspection + As-Built + DLP</div></div>
</div>
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:12px;padding:14px;cursor:pointer;text-align:center;margin-top:6px;" onclick="QS.openDetail('materials_calculator_buildings')">
<div style="font-size:28px;">🧮</div>
<div style="color:#3498db;font-weight:700;font-size:15px;">حاسبة كميات المواد</div>
<div style="color:var(--text3);font-size:12px;margin-top:4px;">خرسانة + حديد + طابوق + اسمنت + رمل</div>
</div>
</div>
` },
struct_survey: { title: '📐 الإنشاءات — الدراسة والتصميم', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 | MME Building Regulations | Pre-Construction</div>

<h3>📐 1. متطلبات ما قبل التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>الجهة</th><th>التوقيت</th></tr>
<tr><td>رخصة البناء</td><td>معتمدة من MME / Ashghal حسب الموقع</td><td>MME / Ashghal</td><td>قبل أي تنفيذ</td></tr>
<tr><td>المخططات الإنشائية</td><td>معتمدة من مهندس إنشائي مرخص + MME</td><td>Consultant + MME</td><td>قبل التنفيذ</td></tr>
<tr><td>Soil Investigation Report</td><td>Boreholes + SPT + Lab Tests — حسب QCS S4</td><td>Geotech Lab</td><td>قبل التصميم</td></tr>
<tr><td>Method Statement</td><td>يشمل: Excavation + Concrete + Rebar + Safety</td><td>Consultant</td><td>قبل الحفر</td></tr>
<tr><td>Material Submittals</td><td>خرسانة + حديد + بلوك + مضافات — Mill Certs</td><td>QC + Consultant</td><td>قبل التوريد</td></tr>
<tr><td>Utility Detection (GPR)</td><td>كشف المرافق المدفونة قبل الحفر</td><td>Ashghal NOC</td><td>قبل الحفر</td></tr>
<tr><td>Traffic Management Plan</td><td>خطة معتمدة إذا المشروع على طريق</td><td>MME / MOI</td><td>قبل الحفر</td></tr>
<tr><td>Environmental Permit</td><td>ضوضاء + غبار + ساعات العمل</td><td>MME</td><td>قبل التنفيذ</td></tr>
</table></div>

<h3>📐 2. الدراسة الجيوتقنية — الحد الأدنى المطلوب</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع المبنى</th><th>عدد الجسات الدنيا</th><th>العمق الأدنى</th><th>الاختبارات المطلوبة</th></tr>
<tr><td>فيلا / منزل (G+1)</td><td>1 Borehole + 2 Trial Pits</td><td>1.5× عمق الأساس + 5m</td><td>SPT + Atterberg + Grading + Sulphate</td></tr>
<tr><td>عمارة (G+4)</td><td>3 Boreholes</td><td>20m أو حتى الصخر</td><td>SPT + Shear + Consolidation</td></tr>
<tr><td>برج (>G+10)</td><td>5+ Boreholes</td><td>30m+ أو حتى Bedrock</td><td>SPT + CPT + Pressuremeter + Pile Tests</td></tr>
<tr><td>Sabkha Zone (أي مبنى)</td><td>+50% من المطلوب</td><td>+5m إضافية</td><td>+ SO₃ + TDS + Chloride تفصيلي</td></tr>
</table></div>

<h3>📐 3. مسافات الفصل والمتطلبات المعمارية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>Setback من حد الملكية</td><td>حسب MME Zoning Regulations — يختلف بالمنطقة</td><td>MME</td></tr>
<tr><td>ارتفاع المبنى</td><td>يتطلب موافقة MME + Civil Aviation إذا قرب مطار</td><td>MME / QCAA</td></tr>
<tr><td>الفصل عن الجيران</td><td>Min 3.0m بين مبانٍ مستقلة</td><td>MME Building Code</td></tr>
<tr><td>مواقف السيارات</td><td>حسب الاستخدام — 1 موقف/وحدة سكنية minimum</td><td>MME</td></tr>
</table></div>

<h3>🔴 4. Hold Points — ما قبل التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01A</td><td>رخصة البناء + موافقة MME</td><td>MME</td><td>Building Permit</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01B</td><td>Soil Investigation Report معتمد</td><td>Geotech + Consultant</td><td>GI Report</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01C</td><td>المخططات الإنشائية معتمدة + Material Submittals</td><td>Consultant + QC</td><td>Approved Drawings + Submittals</td></tr>
</table></div>
</div>
` },
struct_foundation: { title: '🏛️ الإنشاءات — الأساسات', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 Part 2 | BS EN 1997 | Foundation Works</div>

<h3>📐 1. أنواع الأساسات وشروط الاستخدام</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>الاستخدام</th><th>قدرة التحمل الدنيا</th><th>شرط التربة</th><th>المرجع</th></tr>
<tr><td>Strip Foundation</td><td>جدران حاملة — فيلات — G+2 max</td><td>≥ 75 kN/m²</td><td>تربة متجانسة غير Sabkha</td><td>QCS S5 P2 + BS 8004</td></tr>
<tr><td>Pad Foundation (Isolated)</td><td>أعمدة معزولة — مباني منخفضة</td><td>≥ 100 kN/m²</td><td>تربة صلبة متجانسة</td><td>QCS S5 + BS EN 1997</td></tr>
<tr><td>Raft Foundation</td><td>تربة ضعيفة — حمولات موزعة — Sabkha</td><td>≥ 50 kN/m² (distributed)</td><td>أي تربة — يُعادل الاختلاف</td><td>QCS S5 P2</td></tr>
<tr><td>Bored Piles</td><td>أبراج — تربة ضعيفة عميقة — >G+5</td><td>حسب Pile Load Test</td><td>أي تربة</td><td>QCS S5 P5 + BS 8004</td></tr>
<tr><td>Driven Piles</td><td>تربة رملية — مواقع ساحلية</td><td>حسب Dynamic Formula</td><td>رمل + حصى</td><td>QCS S5 + BS EN 12699</td></tr>
</table></div>

<h3>📐 2. مواصفات مواد الأساسات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>Grade الخرسانة</th><th>الحد الأدنى للغطاء</th><th>نوع الاسمنت</th><th>المرجع</th></tr>
<tr><td>Blinding Concrete</td><td>C15 — 50mm سماكة</td><td>لا يُسلَّح</td><td>SRPC (Sulphate Resistant)</td><td>QCS S5 P2.3</td></tr>
<tr><td>Strip / Pad Foundation</td><td>C30 minimum</td><td>50mm (تلامس تربة) | 40mm (مع Blinding)</td><td>SRPC Class 3</td><td>QCS S5 + BS EN 206</td></tr>
<tr><td>Raft Foundation</td><td>C35 minimum</td><td>50mm تحت | 40mm جانبي</td><td>SRPC Class 3 + FA/GGBS</td><td>QCS S5 P2.3</td></tr>
<tr><td>Pile Cap</td><td>C35</td><td>75mm (تلامس تربة)</td><td>SRPC</td><td>QCS S5 P5</td></tr>
<tr><td>Bored Pile</td><td>C35 — C40 Self-Compacting</td><td>75mm</td><td>SRPC + Admixtures</td><td>QCS S5 P5.4</td></tr>
</table></div>

<h3>📐 3. جدول اختبارات الأساسات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>التكرار</th><th>التوقيت</th><th>المرجع</th></tr>
<tr><td>Bearing Capacity Test (Plate Load)</td><td>≥ Safe Bearing Capacity المصمَّم</td><td>1 test لكل 500m² raft</td><td>بعد الحفر قبل الصب</td><td>BS 1377 Part 9</td></tr>
<tr><td>Concrete Cube — Foundation</td><td>≥ fcu @ 28days | 7-day ≥ 70%fcu</td><td>6 cubes لكل 50m³</td><td>وقت الصب</td><td>BS EN 12390</td></tr>
<tr><td>Reinforcement Inspection</td><td>Size + Spacing + Cover — per drawing</td><td>100% قبل كل صبة</td><td>قبل الصب</td><td>QCS S5 + ITP</td></tr>
<tr><td>GWT Level Check</td><td>GWT ≥ 0.5m أسفل قاع الحفر</td><td>يومي خلال الحفر</td><td>خلال الحفر</td><td>QCS S5 P2</td></tr>
<tr><td>Pile Integrity Test (PIT)</td><td>No major defects — Full continuity</td><td>10% من الخوازيق minimum</td><td>بعد 7 أيام من الصب</td><td>ASTM D5882</td></tr>
<tr><td>Static Pile Load Test</td><td>≥ 2.0× Working Load</td><td>1% من الخوازيق أو 3 min</td><td>بعد 28 يوم</td><td>QCS S5 P5 + BS 8004</td></tr>
<tr><td>Sulphate Content (تربة)</td><td>SO₃ < 0.5% → C30 | 0.5-1.5% → SRPC</td><td>كل Borehole</td><td>قبل التصميم</td><td>QCS S4 + BS 8004</td></tr>
</table></div>

<h3>🔴 4. Hold Points — الأساسات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02A</td><td>Bearing Capacity Confirmed + GWT Check قبل الصب</td><td>QC + Consultant</td><td>Plate Load Test + GWT Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02B</td><td>Rebar 100% Inspection — Size + Cover + Laps</td><td>QC + Structural Eng.</td><td>ITR-02B Rebar</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02C</td><td>Pile Integrity Test (100% للخوازيق الرئيسية)</td><td>QC + Consultant</td><td>PIT Report</td></tr>
</table></div>

<h3>⛔ 5. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ صب الأساسات مع وجود ماء في الحفر<br>
• ❌ Blinding بدون SRPC في مناطق Sulphate<br>
• ❌ Cover أقل من 50mm في ملامسة التربة<br>
• ❌ Pile بدون PIT أو Load Test<br>
• ❌ تربة Sabkha دون معالجة تحت الأساس
</div>
</div>
` },
struct_concrete: { title: '🏗️ الإنشاءات — الخرسانة المسلحة', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 Part 4 | BS EN 206 | BS EN 13670 | Hot Weather Concreting</div>

<h3>📐 1. جدول درجات الخرسانة — العناصر الإنشائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>Grade الخرسانة</th><th>Cement Type</th><th>w/c Max</th><th>Cover (mm)</th><th>المرجع</th></tr>
<tr><td>Blinding</td><td>C15</td><td>OPC أو SRPC</td><td>0.65</td><td>لا يُسلَّح</td><td>QCS S5 P4</td></tr>
<tr><td>Foundations / Raft</td><td>C30–C35</td><td>SRPC Class 3</td><td>0.45</td><td>50 (soil) / 40 (blinding)</td><td>QCS S5 P4</td></tr>
<tr><td>Ground Floor Slab</td><td>C30</td><td>SRPC</td><td>0.45</td><td>40</td><td>QCS S5</td></tr>
<tr><td>Columns</td><td>C35–C45</td><td>SRPC + FA/GGBS</td><td>0.40</td><td>35</td><td>QCS S5 + BS EN 1992</td></tr>
<tr><td>Beams</td><td>C35–C40</td><td>SRPC</td><td>0.40</td><td>35</td><td>QCS S5</td></tr>
<tr><td>Floor Slabs</td><td>C35</td><td>SRPC</td><td>0.40</td><td>25 (internal) / 35 (external)</td><td>QCS S5</td></tr>
<tr><td>Shear Walls</td><td>C40</td><td>SRPC + GGBS</td><td>0.38</td><td>35</td><td>QCS S5</td></tr>
<tr><td>Retaining Walls</td><td>C35</td><td>SRPC</td><td>0.40</td><td>50 (soil side)</td><td>QCS S5 P4</td></tr>
<tr><td>Roof Slab</td><td>C35</td><td>SRPC</td><td>0.40</td><td>40</td><td>QCS S5</td></tr>
</table></div>

<h3>📐 2. إجراءات الطقس الحار — Qatar (Critical)</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>درجة الحرارة</th><th>الإجراء الإلزامي</th><th>المرجع</th></tr>
<tr><td>≤ 25°C</td><td>إجراءات عادية</td><td>QCS S5 P4.10</td></tr>
<tr><td>25–35°C</td><td>Pre-wetting القوالب + تبريد الركام + تقليل وقت النقل</td><td>QCS S5 P4.10</td></tr>
<tr><td>35–40°C</td><td>ثلج في ماء الخلط + صب في الليل + Curing فوري</td><td>QCS S5 P4.10</td></tr>
<tr><td>> 40°C</td><td>إيقاف الصب خلال النهار (10am–4pm) | ثلج إلزامي</td><td>QCS S5 P4.10</td></tr>
<tr><td>الحد الأقصى لحرارة الخرسانة</td><td>≤ 32°C عند الاستلام في الموقع</td><td>QCS S5 P4.10</td></tr>
<tr><td>أقصى وقت نقل وصب</td><td>≤ 45 min (صيف) | ≤ 90 min (شتاء)</td><td>QCS S5 P4.10</td></tr>
</table></div>

<h3>📐 3. جدول اختبارات الخرسانة</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Slump Test</td><td>Design ± 25mm (50–175mm عادةً)</td><td>كل مركبة أو كل 50m³</td><td>BS EN 12350-2</td></tr>
<tr><td>Temperature (Concrete)</td><td>≤ 32°C عند الاستلام</td><td>كل مركبة</td><td>QCS S5 P4.10</td></tr>
<tr><td>Cube Test (7 Day)</td><td>≥ 70% fcu</td><td>6 cubes لكل 50m³ أو لكل صبة</td><td>BS EN 12390-3</td></tr>
<tr><td>Cube Test (28 Day)</td><td>≥ 100% fcu | Mean ≥ fck + 4 MPa</td><td>نفس مجموعة الـ 6</td><td>BS EN 12390-3</td></tr>
<tr><td>Water Permeability</td><td>≤ 30mm depth (BS EN 12390-8)</td><td>كل Mix Design + عند الشك</td><td>BS EN 12390-8</td></tr>
<tr><td>Chloride Content</td><td>≤ 0.4% by weight of cement (RC)</td><td>كل Mix Design</td><td>BS 1881 Part 124</td></tr>
<tr><td>Cover Measurement</td><td>Design cover ±5mm</td><td>بعد كل صبة — Cover Meter</td><td>QCS S5 + BS 1881</td></tr>
<tr><td>Rebound Hammer (Schmidt)</td><td>مقارنة مع Cube results</td><td>Grid 200mm عند الشك</td><td>BS EN 12504-2</td></tr>
</table></div>

<h3>📐 4. مواصفات المعالجة — Curing</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>طريقة Curing</th><th>المدة الدنيا</th><th>الشرط</th></tr>
<tr><td>Slabs (عام)</td><td>Burlap + Water أو Curing Compound</td><td>7 أيام</td><td>الحفاظ على الرطوبة باستمرار</td></tr>
<tr><td>Columns / Walls</td><td>Curing Compound بعد نزع القوالب</td><td>7 أيام</td><td>تطبيق خلال 30 min من النزع</td></tr>
<tr><td>Foundation Slab</td><td>Polythene Sheet + Water</td><td>10 أيام</td><td>لا تعريض للشمس المباشرة</td></tr>
<tr><td>Roof Slab (Qatar)</td><td>Pond Curing (ماء راكد) أو Burlap كثيف</td><td>10–14 أيام</td><td>درجة الحرارة > 35°C</td></tr>
</table></div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03A</td><td>Formwork + Rebar Inspection قبل كل صبة</td><td>QC + Consultant</td><td>Pre-pour ITR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03B</td><td>Slump + Temperature ≤ 32°C عند الاستلام</td><td>QC</td><td>Delivery Note + Test Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03C</td><td>Cube 7-day ≥ 70% fcu قبل نزع قوالب الجوانب</td><td>Lab + QC</td><td>Cube Test Certificate</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ إضافة ماء في الموقع للخرسانة الجاهزة<br>
• ❌ صب بدون Cube Tests<br>
• ❌ حرارة الخرسانة > 32°C عند الاستلام<br>
• ❌ Honeycomb > 25mm عمق بدون إصلاح معتمد<br>
• ❌ Cover أقل من المصمَّم (Cover meter بعد الصب)<br>
• ❌ نزع القوالب قبل الوقت المحدد
</div>
</div>
` },
struct_rebar: { title: '🔩 الإنشاءات — حديد التسليح', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 Part 3 | BS 4449 | BS EN 1992 | Reinforcement Steel</div>

<h3>📐 1. جدول مواصفات الحديد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>Grade المعتمد في قطر</td><td>Grade B500B — Fy = 500 N/mm²</td><td>BS 4449:2005 + QCS S5</td></tr>
<tr><td>Deformed Bars</td><td>High Yield Deformed (HYD) — ضروري</td><td>BS 4449</td></tr>
<tr><td>Plain Bars (Mild Steel)</td><td>Grade 250 — للاستخدامات البسيطة فقط</td><td>BS 4449</td></tr>
<tr><td>Mesh Reinforcement</td><td>Type A / B / C — BS 4483</td><td>BS 4483</td></tr>
<tr><td>Stainless Steel Rebar</td><td>Grade 316L — المناطق الساحلية والمواقع الخاصة</td><td>BS EN 10088</td></tr>
<tr><td>Weldability</td><td>CE (Carbon Equivalent) ≤ 0.5%</td><td>BS 4449</td></tr>
</table></div>

<h3>📐 2. جدول Lap Lengths و Anchorage</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>القطر (dia)</th><th>Lap Length (tension)</th><th>Anchorage Length</th><th>Bend Radius Min</th><th>ملاحظة</th></tr>
<tr><td>T10</td><td>500mm (50d)</td><td>400mm (40d)</td><td>40mm (4d)</td><td>—</td></tr>
<tr><td>T12</td><td>600mm (50d)</td><td>480mm (40d)</td><td>48mm (4d)</td><td>—</td></tr>
<tr><td>T16</td><td>800mm (50d)</td><td>640mm (40d)</td><td>64mm (4d)</td><td>—</td></tr>
<tr><td>T20</td><td>1000mm (50d)</td><td>800mm (40d)</td><td>80mm (4d)</td><td>—</td></tr>
<tr><td>T25</td><td>1250mm (50d)</td><td>1000mm (40d)</td><td>100mm (4d)</td><td>—</td></tr>
<tr><td>T32</td><td>1600mm (50d)</td><td>1280mm (40d)</td><td>128mm (4d)</td><td>—</td></tr>
<tr><td>عند Hooks</td><td colspan="3">Hook = 4d straight + 12d extension</td><td>BS EN 1992</td></tr>
</table></div>

<h3>📐 3. Cover المطلوب حسب الموقع</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>موقع العنصر</th><th>Cover الأدنى (mm)</th><th>المرجع</th></tr>
<tr><td>داخلي — جاف</td><td>25mm</td><td>QCS S5 + BS EN 1992</td></tr>
<tr><td>خارجي — تعرض للجو</td><td>35mm</td><td>QCS S5</td></tr>
<tr><td>ملامس تربة (مع Blinding)</td><td>40mm</td><td>QCS S5 P4</td></tr>
<tr><td>ملامس تربة (بدون Blinding)</td><td>75mm</td><td>QCS S5 P4</td></tr>
<tr><td>ملامس مياه / بحر</td><td>50mm minimum</td><td>QCS S5 + BS EN 1992</td></tr>
<tr><td>Sabkha / Sulphate zone</td><td>50mm + SRPC cement</td><td>QCS S4 + QCS S5</td></tr>
</table></div>

<h3>📐 4. اختبارات الحديد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Tensile Test (Yield + UTS)</td><td>Fy ≥ 500 N/mm² | Fu/Fy ≥ 1.08</td><td>3 samples / 20 tonnes</td><td>BS EN ISO 6892</td></tr>
<tr><td>Bend Test</td><td>لا تشقق بعد 180° Bend على 3d mandrel</td><td>نفس عينة Tensile</td><td>BS EN ISO 7438</td></tr>
<tr><td>Re-bend Test</td><td>لا كسر بعد الفرد ثم الثني</td><td>كل شحنة</td><td>BS 4449</td></tr>
<tr><td>Mass per metre</td><td>±4.5% من القياسي</td><td>كل قطر في كل شحنة</td><td>BS 4449</td></tr>
<tr><td>Chemical Analysis (CE)</td><td>CE ≤ 0.50% | C ≤ 0.22%</td><td>Mill Certificate لكل Batch</td><td>BS 4449</td></tr>
</table></div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04A</td><td>Mill Certificate + Tensile Test معتمد قبل التوريد</td><td>QC</td><td>Mill Cert + Lab Report</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04B</td><td>Rebar Inspection 100% — Cover + Laps + Spacing + HP تفتيش الاستشاري</td><td>QC + Structural Eng.</td><td>Rebar ITR</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ حديد صدئ بصدأ قشاري (Flaky Rust) — يُرفض<br>
• ❌ Lap في منطقة Maximum Moment بدون موافقة مهندس<br>
• ❌ قطع بالهاوي أو Flame Cutting<br>
• ❌ بدون Mill Certificate أو الشهادة غير مطابقة<br>
• ❌ Cover Spacers من الخشب أو المواد غير المعتمدة
</div>
</div>
` },
struct_masonry: { title: '🧱 الإنشاءات — البناء والطابوق', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 Part 6 | BS EN 771 | BS EN 998 | Masonry Works</div>

<h3>📐 1. أنواع البلوك وشروط الاستخدام — قطر</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>الأبعاد القياسية (mm)</th><th>قوة الضغط الدنيا</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>Hollow Concrete Block (HCB)</td><td>400×200×200</td><td>≥ 7 N/mm²</td><td>جدران داخلية وخارجية</td><td>BS EN 771-3</td></tr>
<tr><td>Solid Concrete Block</td><td>400×200×200</td><td>≥ 12 N/mm²</td><td>جدران حاملة</td><td>BS EN 771-3</td></tr>
<tr><td>Lightweight Block (AAC)</td><td>600×200×100/150/200</td><td>≥ 3.5 N/mm²</td><td>جدران حاجزة داخلية</td><td>BS EN 771-4</td></tr>
<tr><td>Fired Clay Brick</td><td>215×102.5×65</td><td>≥ 20 N/mm²</td><td>تشطيب خارجي — تراث</td><td>BS EN 771-1</td></tr>
<tr><td>Face Brick (قطر)</td><td>230×115×76</td><td>≥ 30 N/mm²</td><td>واجهات خارجية معرضة</td><td>BS EN 771-1</td></tr>
</table></div>

<h3>📐 2. مواصفات الملاط — Mortar Mixes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>التصنيف</th><th>النسبة Cement:Sand</th><th>قوة الضغط</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>M12 (قوي)</td><td>1:3</td><td>≥ 12 N/mm²</td><td>جدران حاملة — قواعد</td><td>BS EN 998-2</td></tr>
<tr><td>M6</td><td>1:4 to 1:4.5</td><td>≥ 6 N/mm²</td><td>جدران خارجية عامة</td><td>BS EN 998-2</td></tr>
<tr><td>M4</td><td>1:5 to 1:6</td><td>≥ 4 N/mm²</td><td>جدران حاجزة داخلية</td><td>BS EN 998-2</td></tr>
<tr><td>مضاف Sulphate Resistant</td><td>SRPC 1:3 أو 1:4</td><td>≥ 6 N/mm²</td><td>أسفل DPC / تربة / تعرض</td><td>QCS S5 P6</td></tr>
</table></div>

<h3>📐 3. جدول الاختبارات — البناء</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Compressive Strength (Block)</td><td>≥ Grade المحدد | Mean ≥ declared value</td><td>6 blocks لكل 5000 units</td><td>BS EN 772-1</td></tr>
<tr><td>Water Absorption (Block)</td><td>≤ 10% (Outer) | ≤ 20% (Inner)</td><td>كل شحنة</td><td>BS EN 772-11</td></tr>
<tr><td>Mortar Cube (28 day)</td><td>≥ Grade المحدد (M4/M6/M12)</td><td>3 cubes لكل 50m² بناء</td><td>BS EN 1015-11</td></tr>
<tr><td>Bond Wrench Test</td><td>≥ 0.3 N/mm² (Flexural Bond)</td><td>كل طابق أو كل 250m²</td><td>BS EN 1052-5</td></tr>
<tr><td>Plumb Check</td><td>≤ 10mm deviation per 3m height</td><td>كل ارتفاع 3m</td><td>QCS S5 P6</td></tr>
<tr><td>Level Check (Courses)</td><td>± 5mm لكل 10 صفوف</td><td>كل 10 صفوف</td><td>QCS S5</td></tr>
<tr><td>Joint Thickness</td><td>8–12mm (Standard)</td><td>بصري + قياس</td><td>BS EN 1996</td></tr>
</table></div>

<h3>📐 4. متطلبات التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>DPC (Damp Proof Course)</td><td>بدون انقطاع 150mm فوق مستوى الأرض</td><td>QCS S5 P6</td></tr>
<tr><td>Lintel فوق الفتحات</td><td>Precast RC أو Steel — يتجاوز الفتحة 150mm كل جانب</td><td>QCS S5 + BS 5977</td></tr>
<tr><td>Stitching / Ties</td><td>Wall Ties كل 600mm أفقي × 450mm عمودي</td><td>BS EN 845</td></tr>
<tr><td>Chasing (تمرير خدمات)</td><td>عمق الشق ≤ ⅓ سماكة الجدار | لا شقوق في Leaves حاملة</td><td>QCS S5 P6</td></tr>
<tr><td>Movement Joints</td><td>كل 6m للملاط بدون Admixtures</td><td>BS EN 1996</td></tr>
<tr><td>Height per day</td><td>≤ 1.2m في يوم واحد (حماية من السقوط)</td><td>QCS S5 P6</td></tr>
</table></div>

<h3>🔴 5. Hold Points</h3>
<p style="font-size:12px;">
• <strong>HP-05A:</strong> Block Compressive Strength Certificate قبل التوريد<br>
• <strong>HP-05B:</strong> Mortar Cube 28-day ≥ Grade المطلوب — يؤخذ قبل التشطيب
</p>

<h3>⛔ 6. Unacceptable</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ بناء بدون DPC في المناطق المعرضة للرطوبة<br>
• ❌ ملاط جاف (Dry Mix) يُعاد تمييعه بالماء بعد التصلب<br>
• ❌ بلوك مكسور أو ذو Water Absorption > 20%<br>
• ❌ Chasing عمودي في الجدران الحاملة بعمق > ⅓ السماكة<br>
• ❌ بناء في الحر الشديد بدون تغطية وري
</div>
</div>
` },
struct_waterproofing: { title: '💧 الإنشاءات — العزل المائي', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 Part 7 | BS 8102 | Basement + Roof Waterproofing</div>

<h3>📐 1. أنواع العزل حسب الموقع</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الموقع</th><th>النوع المناسب</th><th>السماكة</th><th>المرجع</th></tr>
<tr><td>Basement (تحت الأرض)</td><td>Torch-Applied SBS Membrane (Type III)</td><td>4mm + 4mm (طبقتان)</td><td>BS 8102 Grade 3</td></tr>
<tr><td>Raft Foundation</td><td>SBS Sheet + Blinding Protection</td><td>4mm</td><td>QCS S5 P7</td></tr>
<tr><td>Roof Slab (Flat)</td><td>APP/SBS Torch-On أو Liquid Membrane</td><td>3mm + 3mm</td><td>BS 6229</td></tr>
<tr><td>Wet Areas (حمامات + مطابخ)</td><td>Cementitious 2-Component</td><td>2mm (طبقتان)</td><td>QCS S5 P7</td></tr>
<tr><td>Retaining Wall (خارجي)</td><td>Bituminous Tanking + Drainage Board</td><td>3mm + 8mm Board</td><td>BS 8102</td></tr>
<tr><td>Swimming Pool</td><td>Crystalline + Cementitious Coat</td><td>حسب المورد</td><td>QCS S5</td></tr>
</table></div>

<h3>📐 2. اختبارات العزل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>الإجراء</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Flood Test (Roof)</td><td>ملء الحوض بمياه 50mm لمدة 24hr</td><td>صفر تسرب مرئي + قياس بمستوى</td><td>100% قبل الزمن</td><td>NRCA + QCS S5</td></tr>
<tr><td>Water Test (Basement)</td><td>رصد رطوبة الجدران 48hr بعد GWT</td><td>No damp patch > 10cm²</td><td>100%</td><td>BS 8102</td></tr>
<tr><td>Adhesion Test (Pull-off)</td><td>Dolly Test — ASTM D4541</td><td>≥ 0.3 N/mm² (Membrane)</td><td>1 test/50m²</td><td>ASTM D4541</td></tr>
<tr><td>Thickness Measurement</td><td>DFT Gauge أو Calibrated Comb</td><td>± 10% من المحدد</td><td>كل 25m²</td><td>BS 8102</td></tr>
<tr><td>Wet Area 24hr Flood Test</td><td>ملء حوض مؤقت 25mm لمدة 24hr</td><td>صفر تسرب في الطابق الأسفل</td><td>كل غرفة رطبة</td><td>QCS S5 P7</td></tr>
</table></div>

<h3>🔴 3. Hold Points</h3>
<p style="font-size:12px;">
• <strong>HP-06A:</strong> Substrate Inspection قبل تطبيق العزل (جاف + نظيف + خالٍ من الفجوات)<br>
• <strong>HP-06B:</strong> Flood Test Pass قبل إضافة Screed أو Protection Layer<br>
• <strong>HP-06C:</strong> Adhesion Test ≥ 0.3 N/mm²
</p>

<h3>⛔ 4. Unacceptable</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Membrane على سطح رطب أو غير نظيف<br>
• ❌ طبقة واحدة فقط في Basement<br>
• ❌ بدون Flood Test للأسطح المستوية<br>
• ❌ تداخل الوصلات Overlaps < 150mm<br>
• ❌ عزل بدون Protection Board في المناطق المعرضة للحركة
</div>
</div>
` },
struct_finishing: { title: '🪟 الإنشاءات — التشطيبات', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 Part 8 | Building Finishing Works</div>

<h3>📐 1. جدول أعمال التشطيب بالمواصفات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العمل</th><th>المادة</th><th>السماكة</th><th>معيار القبول</th><th>المرجع</th></tr>
<tr><td>Render (بياض خارجي)</td><td>Cement:Sand 1:4 + Bonding Agent</td><td>15–20mm (2 طبقات)</td><td>Plumb ≤ 5mm / 3m | No cracks</td><td>QCS S5 P8 + BS 5262</td></tr>
<tr><td>Internal Plaster</td><td>Gypsum أو Cement:Sand 1:4</td><td>10–15mm</td><td>Flatness ≤ 4mm / 2m rule</td><td>BS 5492</td></tr>
<tr><td>Floor Screed</td><td>Cement:Sand 1:3.5 — semi-dry</td><td>50mm min (bonded) | 75mm (unbonded)</td><td>SR2 (≤ 3mm / 2m) | No hollow</td><td>BS 8204</td></tr>
<tr><td>Ceramic / Porcelain Tiles</td><td>Adhesive Type S1 or S2 — BS EN 12004</td><td>Bed: 5–8mm</td><td>Lippage ≤ 1mm | Hollow ≤ 5%</td><td>BS 5385 + BS EN 13006</td></tr>
<tr><td>Paint (External)</td><td>Elastomeric Masonry Paint or Silicone</td><td>2 coats DFT ≥ 80μm</td><td>No Peeling | No Crazing</td><td>QCS S5 P8</td></tr>
<tr><td>Paint (Internal)</td><td>Emulsion — Low VOC</td><td>2 coats DFT ≥ 50μm</td><td>Even finish | No Runs</td><td>BS 6150</td></tr>
<tr><td>Suspended Ceiling (T-Grid)</td><td>Metal T-Bar + Mineral Fiber Tiles</td><td>Hanger كل 1.2m × 1.2m</td><td>Level ≤ 3mm / 3m | Seismic bracing</td><td>QCS S5</td></tr>
</table></div>

<h3>📐 2. اختبارات التشطيب</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Floor Levelness (SR)</td><td>SR2: ≤ 3mm / 2m | SR1: ≤ 2mm / 2m</td><td>كل غرفة بـ 3m Straightedge</td><td>BS 8204</td></tr>
<tr><td>Tile Hollow Test</td><td>≤ 5% hollow tiles بالطرق بالعصا</td><td>100% بصري + طرق</td><td>BS 5385</td></tr>
<tr><td>Paint DFT</td><td>≥ DFT المحدد في الرسومات</td><td>DFT Meter كل 25m²</td><td>BS 6150</td></tr>
<tr><td>Plumb Check (Render)</td><td>≤ 5mm انحراف / 3m ارتفاع</td><td>كل 10m² بـ Spirit Level</td><td>QCS S5 P8</td></tr>
<tr><td>Adhesion Test (Tiles)</td><td>≥ 0.5 N/mm² Pull-off</td><td>1 test/100m²</td><td>BS EN 1348</td></tr>
</table></div>

<h3>🔴 3. Hold Points</h3>
<p style="font-size:12px;">
• <strong>HP-07A:</strong> Substrate preparation approved قبل Plaster / Render<br>
• <strong>HP-07B:</strong> Floor Screed SR Test Pass قبل التبليط<br>
• <strong>HP-07C:</strong> Tile Hollow Test < 5% قبل التسليم
</p>
</div>
` },
struct_handover: { title: '✅ الإنشاءات — التسليم', content: `
<div class="lang-content-ar">
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">📌 QCS 2024 — Section 5 | MME Building Regulations | Handover Requirements</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>إنشائي + معماري + خدمات — بالأبعاد الفعلية</td><td>3 ورقي + رقمي</td><td>MME + Owner</td></tr>
<tr><td>Concrete Cube Results</td><td>كل نتائج 7 + 28 يوم — جدول كامل</td><td>أصلي + نسختان</td><td>Owner + Consultant</td></tr>
<tr><td>Rebar Test Certificates</td><td>Mill Certs + Tensile + Bend لكل Grade</td><td>أصلي</td><td>Owner</td></tr>
<tr><td>Waterproofing Test Reports</td><td>Flood Tests + Adhesion — كل الأسطح</td><td>أصلي</td><td>Consultant</td></tr>
<tr><td>Material Approval Registers</td><td>كل المواد المعتمدة + شهادات المصنع</td><td>ورقي + رقمي</td><td>QC + Owner</td></tr>
<tr><td>ITP Register (Closed)</td><td>كل ITPs موقّعة — صفر NCR مفتوح</td><td>أصلي</td><td>QC + Consultant</td></tr>
<tr><td>Occupancy Certificate</td><td>شهادة السكن / الإشغال من MME</td><td>أصلي</td><td>MME</td></tr>
<tr><td>O&M Manuals</td><td>MEP + Lifts + Fire Systems + Structural</td><td>نسختان</td><td>Facilities Team</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>Concrete Strength</td><td>28-day ≥ 100% fcu — كل العناصر</td><td>Lab + QC</td></tr>
<tr><td>Waterproofing</td><td>Flood Tests Pass — كل المساطح والأقبية</td><td>QC + Consultant</td></tr>
<tr><td>Structural Inspection</td><td>فحص بصري كامل — لا Honeycomb كبير | لا تشقق هيكلي</td><td>Structural Eng.</td></tr>
<tr><td>Fire Safety</td><td>QCDD Inspection Certificate</td><td>QCDD</td></tr>
<tr><td>MEP Commissioning</td><td>كهرباء + سباكة + HVAC مفعّلة ومختبرة</td><td>MEP Eng.</td></tr>
<tr><td>Finishing Snag List</td><td>صفر Snagging بنود Level 1 (Safety)</td><td>QC + Architect</td></tr>
<tr><td>Zero Open NCRs</td><td>كل NCRs مغلقة بإجراءات تصحيحية</td><td>QC</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المدة / المتطلب</th></tr>
<tr><td>DLP (مدة الضمان)</td><td>12 شهر من TOC (قد يمتد لـ 24 شهر)</td></tr>
<tr><td>Structural Warranty</td><td>10 سنوات — المقاول مسؤول عن العيوب الخفية</td></tr>
<tr><td>Waterproofing Warranty</td><td>10 سنوات من المورد</td></tr>
<tr><td>Periodic Inspection</td><td>كل 3 أشهر خلال DLP</td></tr>
<tr><td>Crack Monitoring</td><td>أي تشقق > 0.3mm → تحقيق فوري</td></tr>
<tr><td>Defect Response Time</td><td>Safety defects: 24hr | Others: 7 days</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08A</td><td>Occupancy Certificate من MME</td><td>MME</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08B</td><td>QCDD Fire Safety Certificate</td><td>QCDD</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08C</td><td>Structural Engineer Sign-off + As-Built Approved</td><td>Structural Eng. + Consultant</td></tr>
</table></div>
</div>
` },
materials_calculator_buildings: { title: '🧮 حاسبة كميات المواد — الإنشاءات', content: `
<div style="background:rgba(44,62,80,0.4);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;color:#3498db;">
🧮 أدخل أبعاد المشروع → احصل على كميات المواد الكاملة
</div>

<!-- PROJECT INPUTS -->
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:12px;">
<div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:12px;">📐 بيانات المشروع</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
<div>
<label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">المساحة الكلية للطابق (m²):</label>
<input type="number" id="mc-floor-area" placeholder="e.g. 200" min="1" oninput="calcMaterials()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text);font-size:13px;font-family:Tajawal,sans-serif;">
</div>
<div>
<label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">عدد الطوابق:</label>
<input type="number" id="mc-floors" placeholder="e.g. 3" min="1" max="80" oninput="calcMaterials()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text);font-size:13px;font-family:Tajawal,sans-serif;">
</div>
<div>
<label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">ارتفاع الطابق (m):</label>
<input type="number" id="mc-floor-h" placeholder="e.g. 3.2" min="2" max="6" step="0.1" oninput="calcMaterials()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text);font-size:13px;font-family:Tajawal,sans-serif;">
</div>
<div>
<label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">نوع المبنى:</label>
<select id="mc-btype" onchange="calcMaterials()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text);font-size:12px;font-family:Tajawal,sans-serif;">
<option value="residential">سكني (Residential)</option>
<option value="commercial">تجاري (Commercial)</option>
<option value="industrial">صناعي (Industrial)</option>
</select>
</div>
<div>
<label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">Grade الخرسانة:</label>
<select id="mc-grade" onchange="calcMaterials()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text);font-size:12px;font-family:Tajawal,sans-serif;">
<option value="25">C25</option>
<option value="30" selected>C30</option>
<option value="35">C35</option>
<option value="40">C40</option>
</select>
</div>
<div>
<label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">نظام البناء:</label>
<select id="mc-system" onchange="calcMaterials()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text);font-size:12px;font-family:Tajawal,sans-serif;">
<option value="frame">هيكل خرساني + بلوك</option>
<option value="loadbearing">جدران حاملة</option>
<option value="hybrid">هجين</option>
</select>
</div>
</div>
</div>

<div id="mc-results" style="display:none;">
<!-- Results injected by JS -->
</div>

<div id="mc-notes" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;margin-top:10px;font-size:11px;color:var(--text3);">
ℹ️ الكميات تقديرية وفق معدلات QCS 2024 وقواعد الإبهام للمشاريع القطرية. يجب التحقق مع المهندس الإنشائي.
</div>
`
},
});