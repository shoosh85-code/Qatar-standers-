// QatarSpec Pro — Content Data
// جميع بيانات البطاقات التفصيلية
window.QS_CONTENT = {
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
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Fire Safety | QCDD Requirements | Qatar Civil Defence Department
</div>
<h3>🔥 Fire Safety — Key QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Element</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Fire Rating — External Walls</td><td>Min 1-hour FR (residential) / 2-hour (commercial)</td><td>QCS 2024 S18</td></tr>
<tr><td>Escape Routes Width</td><td>Min 1.0m (≤50 persons) / 1.4m (>50 persons)</td><td>QCS S18</td></tr>
<tr><td>Travel Distance</td><td>≤18m to nearest exit (non-sprinklered)</td><td>QCS S18</td></tr>
<tr><td>Emergency Lighting</td><td>Min 1 lux at floor level / 3h duration</td><td>QCDD</td></tr>
<tr><td>Fire Alarm</td><td>L1 system in all occupied buildings</td><td>QCDD</td></tr>
<tr><td>Sprinklers</td><td>Required >4 floors or >14m height</td><td>QCDD</td></tr>
<tr><td>Fire Hose Reel</td><td>Max 30m reach / 25mm hose</td><td>QCS S18</td></tr>
<tr><td>Fire Hydrant</td><td>Max 60m from building / 100mm dia</td><td>QCDD</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
⚠️ All fire safety designs must be approved by QCDD before construction. Completion certificate requires QCDD sign-off.
</div>
</div>
` },

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

  roads_mat_card: { title: '🧱 Materials — Bitumen + Aggregates + Geotextile', content: `
<div class="lang-content-ar">

<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 Section 6 Part 4 & 5 — Materials Specifications
</div>

<h3>🛢️ البيتومين والمواد الرابطة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🛢️</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">بيتومين 60/70</div>
<div style="color:var(--text3);font-size:10px;">Table 5:4 | Pen + Soft + Ductility</div></div>
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔴</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">PMB (Polymer Modified)</div>
<div style="color:var(--text3);font-size:10px;">Table 5:5 | PG76-10 | SBS/SBR</div></div>
<div onclick="QS.openDetail('prime_tack_summary')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Prime Coat</div>
<div style="color:var(--text3);font-size:10px;">MC-30/70 | 0.8-1.2 L/m²</div></div>
<div onclick="QS.openDetail('prime_tack_summary')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Tack Coat</div>
<div style="color:var(--text3);font-size:10px;">SS-1h | 0.20-0.50 L/m²</div></div>
</div>

<h3>🧪 اختبارات البيتومين الكاملة</h3>
<div onclick="QS.openDetail('bitumen_tests')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🧪</div>
<div style="color:#e74c3c;font-weight:700;font-size:13px;">PAV + DSR + BBR + DTT + RV + PMB Tests</div>
<div style="color:var(--text3);font-size:11px;">RTFOT · PAV · Dynamic Shear · Creep Stiffness · Direct Tension · Rotational Viscosity</div>
</div>

<h3>🪨 الركام — Aggregates</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('gabbro_specs')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪨</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">Gabbro Specs</div>
<div style="color:var(--text3);font-size:10px;">Table 4:2 | All layers</div></div>
<div onclick="QS.openDetail('subbase')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📊</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">Subbase/Base Specs</div>
<div style="color:var(--text3);font-size:10px;">Tables 4:1, 4:2, 4:3</div></div>
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏔️</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">Asphalt Aggregate</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:1, 5:2, 5:3</div></div>
</div>

<h3>🕸️ Geotextile</h3>
<div onclick="QS.openDetail('geotextile_specs')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px;">🕸️</div>
<div style="color:#2ecc71;font-weight:700;font-size:13px;">Geotextile Specifications</div>
<div style="color:var(--text3);font-size:11px;">Woven · Non-Woven · Geogrid | ISO 10319, 12236, 12956</div>
</div>

</div>

<div class="lang-content-en" style="display:none;">

<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 Section 6 Part 4 & 5 — Materials Specifications
</div>
<h3>🛢️ Bitumen & Binder Materials</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🛢️</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Bitumen 60/70</div>
<div style="color:var(--text3);font-size:10px;">Table 5:4 | Pen + SP + Ductility</div></div>
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔴</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">PMB (Polymer Modified)</div>
<div style="color:var(--text3);font-size:10px;">Table 5:5 | PG76-10 | SBS</div></div>
<div onclick="QS.openDetail('prime_tack_summary')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Prime Coat</div>
<div style="color:var(--text3);font-size:10px;">MC-30/70 | 0.8-1.2 L/m²</div></div>
<div onclick="QS.openDetail('prime_tack_summary')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Tack Coat</div>
<div style="color:var(--text3);font-size:10px;">SS-1h | 0.20-0.50 L/m²</div></div>
</div>
<div onclick="QS.openDetail('bitumen_tests')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:12px;cursor:pointer;text-align:center;margin-bottom:10px;">
<div style="font-size:22px;">🧪</div>
<div style="color:#e74c3c;font-weight:700;font-size:13px;">PAV + DSR + BBR + DTT + RV + PMB Tests</div>
<div style="color:var(--text3);font-size:11px;">Full bitumen testing programme per QCS 2024</div>
</div>
<h3>🪨 Aggregates</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('gabbro_specs')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪨</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">Gabbro Specs</div>
<div style="color:var(--text3);font-size:10px;">Table 4:2 | All layers</div></div>
<div onclick="QS.openDetail('subbase')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📊</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">Subbase/Base Agg</div>
<div style="color:var(--text3);font-size:10px;">Tables 4:1, 4:2, 4:3</div></div>
<div onclick="QS.openDetail('geotextile_specs')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🕸️</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Geotextile</div>
<div style="color:var(--text3);font-size:10px;">ISO 10319, 12236</div></div>
</div>

</div>
` },

  gabbro_specs: { title: '🪨 Gabbro — مواصفات وخصائص مادة الجابرو', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 4 & 5 | Gabbro — الركام الأساسي في قطر
</div>
<div class="lang-content-ar">
<h3>🪨 ما هو الجابرو؟</h3>
<p>الجابرو (Gabbro) هو صخر ناري مُتبلور يُستخرج أساساً من المحاجر الإماراتية والفجيرة. هو الركام الأساسي المستخدم في قطر لجميع طبقات الطريق والخرسانة بسبب صلابته ومقاومته العالية.</p>

<h3>📐 مواصفات الجابرو — Coarse Aggregate</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>طبقة Subbase</th><th>طبقة Base Course</th><th>إسفلت WC</th><th>إسفلت BC</th><th>الاختبار</th></tr>
<tr><td>LA Abrasion</td><td>≤ 40%</td><td>≤ 30%</td><td>≤ 25%</td><td>≤ 30%</td><td>ASTM C131</td></tr>
<tr><td>Flakiness Index</td><td>≤ 40%</td><td>≤ 30%</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>Elongation Index</td><td>≤ 40%</td><td>≤ 30%</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>Fractured Faces (1+)</td><td>≥ 25%</td><td>≥ 75%</td><td>≥ 95%</td><td>≥ 90%</td><td>ASTM D5821</td></tr>
<tr><td>Fractured Faces (2+)</td><td>—</td><td>≥ 50%</td><td>≥ 90%</td><td>≥ 85%</td><td>ASTM D5821</td></tr>
<tr><td>PSV (Polished Stone Value)</td><td>—</td><td>—</td><td>≥ 55</td><td>—</td><td>BS 812 P114</td></tr>
<tr><td>Water Absorption</td><td>≤ 3%</td><td>≤ 2%</td><td>≤ 2%</td><td>≤ 2%</td><td>ASTM C127</td></tr>
<tr><td>Soundness (MgSO4)</td><td>≤ 18%</td><td>≤ 12%</td><td>≤ 12%</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>Specific Gravity SSD</td><td>≥ 2.4</td><td>≥ 2.5</td><td>≥ 2.5</td><td>≥ 2.5</td><td>ASTM C127</td></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.5%</td><td>≤ 0.5%</td><td>≤ 0.4%</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Chloride</td><td>≤ 0.6%</td><td>≤ 0.6%</td><td>≤ 0.04%</td><td>≤ 0.04%</td><td>BS 1377</td></tr>
<tr><td>Alkali-Silica Reactivity</td><td>Non-reactive</td><td>Non-reactive</td><td>Non-reactive</td><td>Non-reactive</td><td>ASTM C1260</td></tr>
</table>

<h3>📐 المصادر الشائعة في قطر</h3>
<table class="dm-table">
<tr><th>المحجر</th><th>الموقع</th><th>الملاحظة</th></tr>
<tr><td>QPMC (Qatar Primary Materials Company)</td><td>الدوحة — مستودعات</td><td>موزع رئيسي في قطر</td></tr>
<tr><td>Al Hodaifi / Al Jaber</td><td>الفجيرة — الإمارات</td><td>Gabbro Class A</td></tr>
<tr><td>Fujairah Rocks & Aggregates</td><td>الفجيرة</td><td>مصدر رئيسي لقطر</td></tr>
<tr><td>Doha Quarry</td><td>الدوحة</td><td>للاستخدام المحلي</td></tr>
</table>

<h3>📐 Conformity Certificate (شهادة المطابقة)</h3>
<p>كل شحنة Gabbro يجب أن ترفق معها:<br>
• <strong>Conformity Certificate</strong> من QGOS (Qatar General Organization for Standardization)<br>
• تحليل مختبري يثبت: LA Abrasion + Flakiness + Fractured Faces + Water Absorption + Sulphate<br>
• صلاحية الشهادة ≤ 12 شهر من تاريخ الإصدار<br>
• MAR (Material Approval Request) معتمد من المهندس قبل الاستخدام</p>

<h3>🔧 فحص الجابرو عند الموقع</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>التكرار</th><th>المعيار</th></tr>
<tr><td>Visual Inspection (اللون والنظافة)</td><td>كل تسليم</td><td>نظيف، بدون تلوث</td></tr>
<tr><td>Grading Analysis</td><td>كل 500m³</td><td>ASTM C136</td></tr>
<tr><td>LA Abrasion</td><td>كل 1000m³</td><td>ASTM C131</td></tr>
<tr><td>Flakiness Index</td><td>كل 500m³</td><td>BS 812</td></tr>
<tr><td>Water Absorption</td><td>كل 500m³</td><td>ASTM C127</td></tr>
<tr><td>Sulphate + Chloride</td><td>كل 1000m³</td><td>BS 1377</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🪨 Gabbro Aggregate — QCS 2024 Specifications</h3>
<table class="dm-table">
<tr><th>Test</th><th>Acceptance</th><th>Standard</th></tr>
<tr><td>LA Abrasion</td><td>≤30% (wearing course) / ≤35% (base)</td><td>ASTM C131</td></tr>
<tr><td>Flakiness Index</td><td>≤25% (coarse) / ≤35% (combined)</td><td>BS 812</td></tr>
<tr><td>Elongation Index</td><td>≤25%</td><td>BS 812</td></tr>
<tr><td>Sand Equivalent</td><td>≥50% (fine agg)</td><td>ASTM D2419</td></tr>
<tr><td>Water Absorption</td><td>≤2.0%</td><td>BS 812</td></tr>
<tr><td>Sodium Sulphate Soundness</td><td>≤12% loss</td><td>ASTM C88</td></tr>
<tr><td>Polished Stone Value (PSV)</td><td>≥55 (wearing course)</td><td>BS 812-114</td></tr>
<tr><td>Aggregate Crushing Value</td><td>≤30%</td><td>BS 812</td></tr>
</table>
<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ Gabbro is the primary road aggregate in Qatar. Imported from Oman. All material requires pre-approval and source testing.
</div>
</div>
` },

  geotextile_specs: { title: '🕸️ Geotextile — المواصفات والاختبارات', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Geotextile — Material for Separation, Filtration & Reinforcement
</div>
<div class="lang-content-ar">
<h3>🕸️ ما هو Geotextile؟</h3>
<p>مواد نسيجية هندسية مصنوعة من بوليمر (PP أو PET) تُستخدم في أعمال الطرق والتصريف والتعزيز. وظيفتها الأساسية: الفصل بين طبقات التربة والركام، التصفية، التسليح.</p>

<h3>📐 أنواع Geotextile</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>النوع</th><th>التصنيع</th><th>الوظيفة الأساسية</th><th>الاستخدام في قطر</th></tr>
<tr><td><strong>Woven (منسوج)</strong></td><td>خيوط بوليمر منسوجة</td><td>Separation + Reinforcement</td><td>تحت الـ Subbase فوق التربة الضعيفة</td></tr>
<tr><td><strong>Non-Woven (غير منسوج)</strong></td><td>ألياف مرتبطة حرارياً</td><td>Filtration + Separation</td><td>تصريف + حماية طبقة Drainage</td></tr>
<tr><td><strong>Geonet</strong></td><td>شبكة بلاستيكية</td><td>Drainage (تصريف)</td><td>تحت الـ Kerb + حوائل تصريف</td></tr>
<tr><td><strong>Geogrid</strong></td><td>شبكة فتحات كبيرة</td><td>Reinforcement (تسليح)</td><td>تحت الـ Road Base لزيادة التحمل</td></tr>
</table>

<h3>📐 مواصفات Geotextile — QCS S6 P3</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>الحد الأدنى (Separation)</th><th>الحد الأدنى (Filtration)</th><th>الاختبار</th></tr>
<tr><td>Mass Per Unit Area</td><td>≥ 150 g/m²</td><td>≥ 200 g/m²</td><td>ISO 9864</td></tr>
<tr><td>Tensile Strength (MD)</td><td>≥ 20 kN/m</td><td>≥ 12 kN/m</td><td>ISO 10319</td></tr>
<tr><td>Tensile Strength (CMD)</td><td>≥ 20 kN/m</td><td>≥ 12 kN/m</td><td>ISO 10319</td></tr>
<tr><td>Elongation at Break</td><td>≤ 50%</td><td>≥ 30%</td><td>ISO 10319</td></tr>
<tr><td>CBR Puncture Resistance</td><td>≥ 2500 N</td><td>≥ 1500 N</td><td>ISO 12236</td></tr>
<tr><td>Apparent Opening Size (O90)</td><td>≤ 0.20mm</td><td>0.075-0.30mm</td><td>ISO 12956</td></tr>
<tr><td>Permeability (Kn)</td><td>N/A</td><td>≥ 10×Ksoil</td><td>ISO 11058</td></tr>
<tr><td>UV Resistance</td><td>≥ 50% retention after 500hr UV</td><td>≥ 50% after 500hr</td><td>ASTM D4355</td></tr>
<tr><td>Chemical Resistance</td><td>pH 2-13 stable</td><td>pH 2-13 stable</td><td>ISO 14030</td></tr>
</table>

<h3>📐 متطلبات التركيب</h3>
<table class="dm-table">
<tr><th>البند</th><th>المتطلب</th></tr>
<tr><td>الفردة (Overlap)</td><td>≥ 500mm في الاتجاهين</td></tr>
<tr><td>التثبيت</td><td>U-pins أو رمل فوقه مباشرة</td></tr>
<tr><td>الحماية من الأشعة</td><td>تغطية خلال 48hr من الفردة</td></tr>
<tr><td>الفردة على منحدرات</td><td>من الأعلى للأسفل</td></tr>
<tr><td>الوصل</td><td>Sewing أو Overlap ≥ 1m</td></tr>
<tr><td>حماية من المعدات</td><td>لا تسير المعدات الثقيلة مباشرة</td></tr>
</table>

<h3>🔧 اختبارات الاستقبال</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>التكرار</th><th>المعيار</th><th>HP/W</th></tr>
<tr><td>Mass Per Unit Area (وزن المتر)</td><td>Per roll batch</td><td>ISO 9864</td><td>W</td></tr>
<tr><td>Tensile Strength</td><td>Per roll batch</td><td>ISO 10319</td><td>HP</td></tr>
<tr><td>CBR Puncture</td><td>Per roll batch</td><td>ISO 12236</td><td>W</td></tr>
<tr><td>Apparent Opening Size</td><td>Per roll batch</td><td>ISO 12956</td><td>W</td></tr>
<tr><td>Visual Inspection</td><td>100% of rolls</td><td>No holes/tears</td><td>W</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>What is Geotextile?</h3>
<p>Geotextiles are polymer (PP or PET) fabric materials used in road construction, drainage and reinforcement. Primary functions: separation between soil/aggregate layers, filtration, reinforcement.</p>
<h3>Geotextile Types</h3>
<table class="dm-table">
<tr><th>Type</th><th>Manufacture</th><th>Primary Function</th><th>Qatar Use</th></tr>
<tr><td>Woven</td><td>Woven polymer threads</td><td>Separation + Reinforcement</td><td>Under Subbase on weak subgrade</td></tr>
<tr><td>Non-Woven</td><td>Thermally bonded fibres</td><td>Filtration + Separation</td><td>Drainage + protection layers</td></tr>
<tr><td>Geogrid</td><td>Large aperture grid</td><td>Reinforcement</td><td>Under Road Base to increase bearing</td></tr>
</table>
<h3>Geotextile Specifications</h3>
<table class="dm-table">
<tr><th>Property</th><th>Min (Separation)</th><th>Min (Filtration)</th><th>Test</th></tr>
<tr><td>Mass Per Unit Area</td><td>≥ 150 g/m²</td><td>≥ 200 g/m²</td><td>ISO 9864</td></tr>
<tr><td>Tensile Strength (MD)</td><td>≥ 20 kN/m</td><td>≥ 12 kN/m</td><td>ISO 10319</td></tr>
<tr><td>CBR Puncture Resistance</td><td>≥ 2500 N</td><td>≥ 1500 N</td><td>ISO 12236</td></tr>
<tr><td>Apparent Opening Size O90</td><td>≤ 0.20mm</td><td>0.075-0.30mm</td><td>ISO 12956</td></tr>
<tr><td>UV Resistance</td><td>≥ 50% retention after 500hr</td><td>≥ 50%</td><td>ASTM D4355</td></tr>
</table>
<h3>Installation Requirements</h3>
<p>Overlap: ≥ 500mm both directions | Cover within 48hr of laying | Seams: sewing or ≥ 1m overlap | No heavy equipment directly on geotextile without cover</p>
</div>
` },

  pipe_bedding: { title: '📐 Pipe Bedding Types — أنواع فرش المواسير', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Pipe Bedding — فرش المواسير وأنواعها
</div>
<div class="lang-content-ar">
<h3>📐 ما هو فرش المواسير؟</h3>
<p>طبقة المادة الموضوعة تحت وحول الماسورة داخل الخندق. وظيفتها توزيع الأحمال بشكل منتظم، منع نقاط الضغط الموضعية، وحماية الماسورة من الاهتزازات والحركة.</p>

<h3>📐 الفئات الأساسية — Bedding Classes</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الفئة</th><th>المادة</th><th>الوصف</th><th>معامل الدعم (Bf)</th><th>الاستخدام</th></tr>
<tr><td><strong>Class S (Special)</strong></td><td>Concrete Cradle/Surround</td><td>خرسانة تحيط الماسورة بالكامل</td><td>3.4</td><td>أحمال جداً عالية + عبور طرق</td></tr>
<tr><td><strong>Class A</strong></td><td>Concrete Bed 100mm + Granular Surround</td><td>سرير خرساني + محيط حبيبي</td><td>2.6</td><td>طرق رئيسية + ESAL عالي</td></tr>
<tr><td><strong>Class B</strong></td><td>Granular Bed 150mm + Granular Surround</td><td>رمل أو حجر مكسر ناعم</td><td>1.9</td><td>الاستخدام الأكثر شيوعاً في قطر</td></tr>
<tr><td><strong>Class D</strong></td><td>Flat Bottom + Granular Surround</td><td>قاع الخندق مع معالجة</td><td>1.1</td><td>تربة صلبة جيدة</td></tr>
</table>

<h3>📐 تفاصيل Class B — الأكثر استخداماً</h3>
<table class="dm-table">
<tr><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>مادة الفرش</td><td>Single-size Crushed Gabbro 5-20mm أو رمل نظيف</td><td>QCS S8</td></tr>
<tr><td>سماكة الفرش تحت الماسورة</td><td>150mm (أو OD/4 الأكبر)</td><td>BS EN 1610</td></tr>
<tr><td>ارتفاع الغطاء فوق قمة الماسورة</td><td>300mm (Pipe Zone)</td><td>QCS S8</td></tr>
<tr><td>دمك Pipe Zone</td><td>يدوي — لا dمك آلي أثناء Pipe Zone</td><td>QCS S8</td></tr>
<tr><td>الدمك بعد 300mm فوق الماسورة</td><td>≥ 90% MDD بمعدات مناسبة</td><td>ASTM D698</td></tr>
<tr><td>Marker Tape</td><td>300mm فوق قمة الماسورة بلون محدد</td><td>KAHRAMAA</td></tr>
</table>

<h3>📐 Concrete Encasement (Class S) — عبور الطرق</h3>
<table class="dm-table">
<tr><th>البند</th><th>المواصفة</th></tr>
<tr><td>درجة الخرسانة</td><td>C20 minimum</td></tr>
<tr><td>الغطاء الجانبي (Cover)</td><td>≥ 150mm على جانبي الماسورة</td></tr>
<tr><td>الغطاء فوق الماسورة</td><td>≥ 150mm</td></tr>
<tr><td>الغطاء تحت الماسورة</td><td>≥ 100mm Concrete Bed</td></tr>
<tr><td>حماية من الانكماش</td><td>Joints كل 5m في الـ Encasement</td></tr>
<tr><td>المعالجة</td><td>≥ 3 أيام قبل الردم</td></tr>
</table>

<h3>📐 أنواع المواد المستخدمة في الفرش</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>المادة</th><th>المواصفة</th><th>الاستخدام</th></tr>
<tr><td>Single-Size Gabbro 5-10mm</td><td>سرير مواسير مرنة (HDPE)</td><td>Class B مياه وصرف</td></tr>
<tr><td>Single-Size Gabbro 5-20mm</td><td>سرير ومحيط مواسير كبيرة</td><td>Class B مواسير ≥ DN400</td></tr>
<tr><td>Washed Sand</td><td>لا SO3 + لا Cl زائد</td><td>Class B مواسير صغيرة ≤ DN200</td></tr>
<tr><td>CLSM (Controlled Low Strength Material)</td><td>0.3-2.5 N/mm² @ 28 day</td><td>خنادق ضيقة / تحت طرق رئيسية</td></tr>
<tr><td>Concrete C15</td><td>Granular Haunch بديل</td><td>Class A + عبور طرق</td></tr>
</table>

<h3>🔧 اختبارات القبول</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>التكرار</th><th>المعيار</th><th>HP/W</th></tr>
<tr><td>Visual Inspection (بصري)</td><td>كل 50m</td><td>سماكة صحيحة + مادة نظيفة</td><td>W</td></tr>
<tr><td>Bedding Compaction (Sand Cone)</td><td>كل 50m</td><td>≥ 90% MDD</td><td>W</td></tr>
<tr><td>Grading of Bedding Material</td><td>Per source</td><td>ASTM C136</td><td>W</td></tr>
<tr><td>Pipe Zone Inspection</td><td>قبل الردم</td><td>Visual — No voids, correct height</td><td>HP</td></tr>
<tr><td>Marker Tape Inspection</td><td>100%</td><td>300mm above pipe, correct color</td><td>W</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>What is Pipe Bedding?</h3>
<p>The material layer placed under and around pipes in the trench. Functions: distribute loads uniformly, prevent stress concentrations, protect pipes from vibration and movement.</p>
<h3>Bedding Classes</h3>
<table class="dm-table">
<tr><th>Class</th><th>Material</th><th>Support Factor (Bf)</th><th>Use</th></tr>
<tr><td>Class S (Special)</td><td>Concrete Cradle/Surround</td><td>3.4</td><td>Very high loads + road crossings</td></tr>
<tr><td>Class A</td><td>Concrete Bed + Granular Surround</td><td>2.6</td><td>Major roads + high ESAL</td></tr>
<tr><td>Class B</td><td>Granular Bed 150mm + Granular Surround</td><td>1.9</td><td>Most common in Qatar</td></tr>
<tr><td>Class D</td><td>Flat Bottom + Granular Surround</td><td>1.1</td><td>Good firm soil only</td></tr>
</table>
<h3>Class B Details — Most Common</h3>
<table class="dm-table">
<tr><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Bedding Material</td><td>5-20mm Single-size Crushed Gabbro or Clean Sand</td><td>QCS S8</td></tr>
<tr><td>Bedding Thickness</td><td>150mm (or OD/4 whichever greater)</td><td>BS EN 1610</td></tr>
<tr><td>Pipe Zone Cover</td><td>300mm above pipe crown</td><td>QCS S8</td></tr>
<tr><td>Pipe Zone Compaction</td><td>Hand tamping only — no mechanical compaction in pipe zone</td><td>QCS S8</td></tr>
<tr><td>Above Pipe Zone</td><td>≥ 90% MDD after 300mm cover</td><td>ASTM D698</td></tr>
<tr><td>Marker Tape</td><td>300mm above pipe crown — correct color</td><td>KAHRAMAA</td></tr>
</table>
<h3>Concrete Encasement (Class S) — Road Crossings</h3>
<table class="dm-table">
<tr><th>Item</th><th>Specification</th></tr>
<tr><td>Concrete Grade</td><td>C20 minimum</td></tr>
<tr><td>Side Cover</td><td>≥ 150mm each side</td></tr>
<tr><td>Top Cover</td><td>≥ 150mm above pipe</td></tr>
<tr><td>Bottom Bed</td><td>≥ 100mm concrete bed</td></tr>
<tr><td>Curing before backfill</td><td>≥ 3 days</td></tr>
</table>
</div>
` },

  bitumen_tests: { title: '🧪 Bitumen Tests — كل اختبارات البيتومين 60/70 وPMB', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 S6 P5 | AASHTO | ASTM | EN | Full Bitumen Testing Programme
</div>
<div class="lang-content-ar">

<h3>🧪 1. الاختبارات الأساسية — Bitumen 60/70 (Standard Tests)</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار QCS</th><th>الاختبار</th></tr>
<tr><td><strong>Penetration @ 25°C</strong></td><td>قياس عمق غرز إبرة قياسية في البيتومين = مؤشر صلابة</td><td>60-70 × 0.1mm</td><td>ASTM D5 / EN 1426</td></tr>
<tr><td><strong>Softening Point R&B</strong></td><td>درجة حرارة تبدأ فيها عينة البيتومين بالتليين (Ring & Ball)</td><td>49 - 56°C</td><td>ASTM D36 / EN 1427</td></tr>
<tr><td><strong>Ductility @ 25°C</strong></td><td>قياس قابلية التمدد قبل القطع — مؤشر المرونة</td><td>≥ 100 cm</td><td>ASTM D113</td></tr>
<tr><td><strong>Flash Point (COC)</strong></td><td>أدنى درجة حرارة يشتعل فيها البيتومين — للسلامة</td><td>≥ 232°C</td><td>ASTM D92</td></tr>
<tr><td><strong>Specific Gravity @ 25°C</strong></td><td>الكثافة النسبية للبيتومين</td><td>1.01 - 1.05</td><td>ASTM D70</td></tr>
<tr><td><strong>Solubility in TCE</strong></td><td>ذوبان في Trichloroethylene — مؤشر نقاء البيتومين</td><td>≥ 99%</td><td>ASTM D2042</td></tr>
<tr><td><strong>Wax Content</strong></td><td>نسبة الشمع — الشمع الزائد يضر بالأداء الحراري</td><td>≤ 2.2%</td><td>IP 336</td></tr>
</table>

<h3>🧪 2. اختبارات التقادم — RTFOT + TFOT</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار QCS</th><th>الاختبار</th></tr>
<tr><td><strong>RTFOT (Rolling Thin Film Oven Test)</strong></td><td>يحاكي تقادم البيتومين أثناء الخلط بالحرارة (163°C / 75 دقيقة). يقيس فقدان الكتلة وتغير الخصائص</td><td>Loss ≤ 0.8%</td><td>ASTM D2872 / EN 12607-1</td></tr>
<tr><td><strong>TFOT (Thin Film Oven Test)</strong></td><td>بديل أقدم للـ RTFOT — نفس الهدف لكن أقل دقة</td><td>Loss ≤ 0.8%</td><td>ASTM D1754</td></tr>
<tr><td><strong>Penetration after RTFOT</strong></td><td>قياس Penetration على العينة المُشاخة = مقارنة بالأصلي</td><td>≥ 50% of original</td><td>ASTM D5</td></tr>
<tr><td><strong>Ductility after RTFOT @ 25°C</strong></td><td>قابلية التمدد بعد التقادم</td><td>≥ 50 cm</td><td>ASTM D113</td></tr>
<tr><td><strong>Softening Point after RTFOT</strong></td><td>ارتفاع Softening Point بعد RTFOT — مؤشر تصلب</td><td>Increase ≤ 8°C</td><td>ASTM D36</td></tr>
</table>

<h3>🧪 3. PAV — Pressure Aging Vessel Residue</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار</th></tr>
<tr><td><strong>PAV (Pressure Aging Vessel)</strong></td><td>يحاكي تقادم البيتومين طويل الأمد أثناء خدمة الطريق (20+ سنة). العينة تُعالج في وعاء ضغط عند 100°C / 2.1 MPa لمدة 20 ساعة بعد RTFOT</td><td>AASHTO R28 / EN 14769</td></tr>
<tr><td><strong>المدخل</strong></td><td>RTFOT Residue مُسخَّن أولاً</td><td>—</td></tr>
<tr><td><strong>الشروط</strong></td><td>100°C أو 110°C (حسب المناخ) / 2.1 MPa / 20 hr</td><td>AASHTO R28</td></tr>
<tr><td><strong>المخرجات</strong></td><td>PAV Residue يُستخدم في DSR Creep + DTT</td><td>—</td></tr>
</table>

<h3>🧪 4. DSR — Dynamic Shear Rheometer</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار QCS (PMB)</th><th>المرجع</th></tr>
<tr><td><strong>G*/sinδ (Unaged)</strong></td><td>قياس قساوة البيتومين عند درجات حرارة عالية (Summer Rutting). G* = Stiffness Module، δ = Phase Angle. كلما كان G*/sinδ أكبر = مقاومة Rutting أفضل</td><td>≥ 2.2 kPa @ 76°C (PMB)</td><td>AASHTO T315</td></tr>
<tr><td><strong>G*/sinδ (RTFOT Residue)</strong></td><td>نفس الاختبار بعد RTFOT — مقاومة التشقق الحراري</td><td>≥ 4.4 kPa @ 76°C (PMB)</td><td>AASHTO T315</td></tr>
<tr><td><strong>Phase Angle δ (PAV Residue)</strong></td><td>زاوية التأخر — مؤشر المرونة. δ صغير = أكثر مرونة</td><td>≤ 75° @ 25°C</td><td>AASHTO T315</td></tr>
<tr><td><strong>G*×sinδ (PAV Residue)</strong></td><td>مقاومة التعب والتشقق عند درجات حرارة متوسطة</td><td>≤ 5000 kPa @ 25°C</td><td>AASHTO T315</td></tr>
</table>

<h3>🧪 5. BBR — Bending Beam Rheometer (Creep Stiffness)</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار QCS</th><th>المرجع</th></tr>
<tr><td><strong>Creep Stiffness S</strong></td><td>قياس صلابة البيتومين عند درجات الحرارة المنخفضة (شتاء / ليل). عينة تُثنى عند -10°C لمدة 60 ثانية. S عالي = بيتومين صلب = تشقق حراري</td><td>S ≤ 300 MPa @ -10°C / 60s</td><td>AASHTO T313 / EN 14771</td></tr>
<tr><td><strong>m-value (Rate of Relaxation)</strong></td><td>معدل تخفيف الإجهاد الحراري. m كبير = تخفيف أسرع = أقل تشققاً</td><td>m ≥ 0.300 @ -10°C</td><td>AASHTO T313</td></tr>
</table>

<h3>🧪 6. Direct Tension Test (DTT)</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار</th></tr>
<tr><td><strong>Failure Strain</strong></td><td>قياس انزياع العينة عند الكسر بدرجات برودة. يكمل BBR لتقييم التشقق الحراري. يُستخدم عند m-value يكون قريباً من الحد (0.300)</td><td>AASHTO T314</td></tr>
<tr><td><strong>شرط الاستخدام</strong></td><td>إذا كانت BBR Stiffness بين 300-600 MPa → يُجرى DTT</td><td>AASHTO MP1</td></tr>
<tr><td><strong>معيار القبول</strong></td><td>Failure Strain ≥ 1.0%</td><td>AASHTO MP1</td></tr>
</table>

<h3>🧪 7. Rotational Viscosity (RV)</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار</th></tr>
<tr><td><strong>Rotational Viscosity @ 135°C</strong></td><td>قياس لزوجة البيتومين عند درجة حرارة الضخ والإنتاج. اللزوجة العالية = صعوبة في الضخ والخلط</td><td>AASHTO T316 / ASTM D4402</td></tr>
<tr><td><strong>معيار القبول (للضخ)</strong></td><td>≤ 3 Pa·s @ 135°C</td><td>AASHTO MP1</td></tr>
<tr><td><strong>معيار القبول (للخلط)</strong></td><td>0.17 ± 0.02 Pa·s → يحدد Mixing Temperature</td><td>AASHTO T316</td></tr>
<tr><td><strong>درجات الحرارة القياسية</strong></td><td>135°C و 165°C (لتحديد Equiviscous Temp)</td><td>AASHTO T316</td></tr>
</table>

<h3>🧪 8. اختبارات PMB الإضافية (Polymer Modified Bitumen)</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>الشرح</th><th>المعيار QCS</th><th>المرجع</th></tr>
<tr><td><strong>Elastic Recovery @ 25°C</strong></td><td>قياس استرداد الشكل بعد الشد = مؤشر البوليمر. PMB الجيد يسترد شكله &gt; 70%</td><td>≥ 70%</td><td>ASTM D6084 / EN 13398</td></tr>
<tr><td><strong>Force Ductility @ 4°C</strong></td><td>مقاومة التشقق البارد عند تمديد العينة بسرعة 5cm/min</td><td>≥ 2 N (at 200mm)</td><td>EN 13589</td></tr>
<tr><td><strong>Toughness & Tenacity</strong></td><td>قياس الطاقة الكلية عند الكسر — Toughness ≥15J / Tenacity ≥5J</td><td>T ≥ 15J, t ≥ 5J</td><td>ASTM D5801</td></tr>
<tr><td><strong>Storage Stability (ΔSoftening Point)</strong></td><td>الفرق في Softening Point بين أعلى وأسفل الـ Tube بعد 48hr @ 163°C. يكشف انفصال البوليمر عن البيتومين</td><td>ΔSP ≤ 5°C</td><td>EN 13399</td></tr>
<tr><td><strong>FTIR (Polymer Identification)</strong></td><td>تحديد نوع البوليمر (SBS أو SBR) وتأكيد عدم التزوير</td><td>SBS أو SBR مؤكد</td><td>FTIR Spectroscopy</td></tr>
<tr><td><strong>Separation Test @ 163°C</strong></td><td>اختبار الاستقرار الحراري — PMB يجب أن يبقى متجانساً</td><td>ΔSP ≤ 5°C</td><td>EN 13399</td></tr>
</table>

<h3>📐 جدول PG Grade وترتيب الاختبارات</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>المرحلة</th><th>العينة</th><th>الاختبارات</th><th>الهدف</th></tr>
<tr><td>1 — أصلي (Unaged)</td><td>بيتومين خام</td><td>Penetration, Softening, Flash, Viscosity, DSR G*/sinδ</td><td>خصائص التصنيع</td></tr>
<tr><td>2 — بعد RTFOT</td><td>Short-term Aged</td><td>Penetration Ratio, Ductility, DSR G*/sinδ (RTFOT)</td><td>تقادم الخلط</td></tr>
<tr><td>3 — بعد PAV</td><td>Long-term Aged</td><td>DSR Phase Angle، G*×sinδ، BBR S + m-value، DTT</td><td>تقادم الخدمة</td></tr>
</table>
</div>

<div class="lang-content-en" style="display:none;">
<h3>1. Standard Tests — Bitumen 60/70</h3>
<table class="dm-table">
<tr><th>Test</th><th>Description</th><th>QCS Requirement</th><th>Method</th></tr>
<tr><td>Penetration @ 25°C</td><td>Depth of standard needle — hardness indicator</td><td>60-70 × 0.1mm</td><td>ASTM D5 / EN 1426</td></tr>
<tr><td>Softening Point R&B</td><td>Temperature at which bitumen starts to soften (Ring & Ball)</td><td>49-56°C</td><td>ASTM D36 / EN 1427</td></tr>
<tr><td>Ductility @ 25°C</td><td>Extension before breaking — flexibility indicator</td><td>≥ 100 cm</td><td>ASTM D113</td></tr>
<tr><td>Flash Point (COC)</td><td>Minimum ignition temperature — safety</td><td>≥ 232°C</td><td>ASTM D92</td></tr>
<tr><td>Specific Gravity</td><td>Relative density of bitumen</td><td>1.01-1.05</td><td>ASTM D70</td></tr>
<tr><td>Solubility in TCE</td><td>Bitumen purity indicator</td><td>≥ 99%</td><td>ASTM D2042</td></tr>
<tr><td>Wax Content</td><td>Excess wax degrades thermal performance</td><td>≤ 2.2%</td><td>IP 336</td></tr>
</table>
<h3>2. RTFOT — Short-Term Aging</h3>
<table class="dm-table">
<tr><th>Test</th><th>Description</th><th>QCS Requirement</th><th>Method</th></tr>
<tr><td>Mass Loss (RTFOT)</td><td>Simulates mixing aging at 163°C for 75 min</td><td>≤ 0.8%</td><td>ASTM D2872</td></tr>
<tr><td>Penetration Ratio after RTFOT</td><td>Hardening ratio vs original</td><td>≥ 50%</td><td>ASTM D5</td></tr>
<tr><td>Ductility after RTFOT</td><td>Flexibility after aging</td><td>≥ 50 cm</td><td>ASTM D113</td></tr>
</table>
<h3>3. PAV — Long-Term Aging (Pressure Aging Vessel)</h3>
<p>Simulates 20+ years of in-service aging. RTFOT residue is aged in pressure vessel at 100°C / 2.1 MPa / 20 hours. Output residue used for DSR creep and DTT testing. Method: AASHTO R28 / EN 14769.</p>
<h3>4. DSR — Dynamic Shear Rheometer</h3>
<table class="dm-table">
<tr><th>Test</th><th>Description</th><th>PMB Requirement</th><th>Method</th></tr>
<tr><td>G*/sinδ (Unaged)</td><td>Rutting resistance at high temp — higher = better</td><td>≥ 2.2 kPa @ 76°C</td><td>AASHTO T315</td></tr>
<tr><td>G*/sinδ (RTFOT Residue)</td><td>Stiffness after short-term aging</td><td>≥ 4.4 kPa @ 76°C</td><td>AASHTO T315</td></tr>
<tr><td>Phase Angle δ (PAV)</td><td>Elasticity indicator — lower = more elastic</td><td>≤ 75° @ 25°C</td><td>AASHTO T315</td></tr>
<tr><td>G*×sinδ (PAV)</td><td>Fatigue cracking resistance</td><td>≤ 5000 kPa @ 25°C</td><td>AASHTO T315</td></tr>
</table>
<h3>5. BBR — Bending Beam Rheometer</h3>
<table class="dm-table">
<tr><th>Test</th><th>Description</th><th>QCS Requirement</th><th>Method</th></tr>
<tr><td>Creep Stiffness S</td><td>Stiffness at low temperature — high S = thermal cracking risk</td><td>S ≤ 300 MPa @ -10°C / 60s</td><td>AASHTO T313</td></tr>
<tr><td>m-value</td><td>Stress relaxation rate — higher = less cracking</td><td>m ≥ 0.300</td><td>AASHTO T313</td></tr>
</table>
<h3>6. Direct Tension Test (DTT)</h3>
<p>Measures failure strain of PAV residue at low temperature. Used when BBR Stiffness is between 300-600 MPa. Acceptance: Failure Strain ≥ 1.0%. Method: AASHTO T314.</p>
<h3>7. Rotational Viscosity (RV)</h3>
<p>Measures bitumen viscosity at pumping/mixing temperatures. Max ≤ 3 Pa·s @ 135°C for pumpability. Used to determine mixing and compaction temperature equiviscous range. Method: AASHTO T316 / ASTM D4402.</p>
<h3>8. PMB Additional Tests</h3>
<table class="dm-table">
<tr><th>Test</th><th>Description</th><th>QCS Requirement</th><th>Method</th></tr>
<tr><td>Elastic Recovery @ 25°C</td><td>Shape recovery after stretching — polymer quality indicator</td><td>≥ 70%</td><td>ASTM D6084</td></tr>
<tr><td>Force Ductility @ 4°C</td><td>Cold cracking resistance at 5cm/min extension</td><td>≥ 2 N</td><td>EN 13589</td></tr>
<tr><td>Toughness & Tenacity</td><td>Energy at failure — Toughness ≥15J, Tenacity ≥5J</td><td>T≥15J, t≥5J</td><td>ASTM D5801</td></tr>
<tr><td>Storage Stability ΔSP</td><td>Polymer separation test after 48hr @ 163°C</td><td>ΔSP ≤ 5°C</td><td>EN 13399</td></tr>
<tr><td>FTIR</td><td>Polymer type identification (SBS vs SBR)</td><td>SBS or SBR confirmed</td><td>FTIR Spectroscopy</td></tr>
</table>
</div>
` },

  traffic_management_plan: { title: '🚦 Traffic Management Plan — TMP', content: `
<div class="lang-content-ar">

<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 Ashghal / MMUP Standards | Qatar Highway Design Manual | Traffic Management
</div>

<h3>📋 ما هي خطة إدارة حركة المرور (TMP)؟</h3>
<p style="font-size:12px;">خطة إلزامية تُقدَّم وتعتمد قبل أي أعمال على الطريق. تحدد كيفية الحفاظ على سلامة مستخدمي الطريق وضمان استمرارية حركة المرور أثناء التنفيذ.</p>

<h3>📐 متطلبات Ashghal للـ TMP</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr><tr><td>تقديم الخطة</td><td>قبل بدء أعمال الطريق بـ 14 يوم على الأقل</td><td>Ashghal TMP Guidelines</td></tr><tr><td>اعتماد الخطة</td><td>موافقة Ashghal Traffic Management Department</td><td>Ashghal</td></tr><tr><td>القائم بالإعداد</td><td>Traffic Engineer معتمد + Contractor TMP Officer</td><td>Ashghal</td></tr><tr><td>التحديث</td><td>عند أي تغيير في نطاق العمل أو جدول التنفيذ</td><td>Ashghal</td></tr><tr><td>مراجعة دورية</td><td>أسبوعياً على الأقل + بعد أي حادث</td><td>Ashghal</td></tr></table></div>
<h3>📐 عناصر الـ TMP الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المتطلب</th><th>المعيار</th></tr><tr><td>Traffic Signs</td><td>تحذيرية + إرشادية + سرعة مؤقتة</td><td>MMUP Traffic Signs Manual</td></tr><tr><td>Lane Closure Plan</td><td>تفاصيل إغلاق المسارات + توقيت</td><td>Ashghal TMP</td></tr><tr><td>Detour Routes</td><td>مسارات تحويل بديلة مؤشرة بالخرائط</td><td>Ashghal TMP</td></tr><tr><td>Work Zone Lighting</td><td>إضاءة كافية ليلاً — LED Portable</td><td>MMUP</td></tr><tr><td>Temporary Barriers</td><td>Water-filled barriers أو Jersey Concrete</td><td>BS EN 1317</td></tr><tr><td>Traffic Cones</td><td>كل 5m في منطقة التحويل</td><td>Ashghal</td></tr><tr><td>Arrow Boards</td><td>عند كل تحويل رئيسي — Solar Powered</td><td>Ashghal TMP</td></tr><tr><td>Flagmen/Traffic Controllers</td><td>عند التقاطعات النشطة</td><td>Ashghal TMP</td></tr><tr><td>Emergency Response Plan</td><td>خطة طوارئ مع أرقام Ashghal + MoI</td><td>Ashghal</td></tr><tr><td>TMP Coordinator</td><td>مسؤول TMP في الموقع 24/7 أثناء الأعمال</td><td>Ashghal</td></tr></table></div>
<h3>📐 متطلبات السلامة في منطقة العمل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr><tr><td>مسافة التحذير المسبق</td><td>≥ 150m قبل منطقة العمل على الطرق السريعة / ≥ 50m على الشوارع</td></tr><tr><td>Lane Width الحد الأدنى</td><td>≥ 3.0m للمركبات / ≥ 3.5m للشاحنات الثقيلة</td></tr><tr><td>Shoulder للطوارئ</td><td>≥ 1.5m إذا أمكن</td></tr><tr><td>سرعة العمل (Work Zone Speed)</td><td>تخفيض بـ 20-40 كم/ساعة من السرعة الأصلية</td></tr><tr><td>حواجز العزل</td><td>Jersey Concrete أو Water-filled ≥ 100m من منطقة العمل</td></tr><tr><td>الإضاءة الليلية</td><td>Lux Level ≥ 50 lux في منطقة العمل</td></tr><tr><td>Safety Officer</td><td>موجود بدوام كامل أثناء العمل</td></tr><tr><td>First Aid Kit</td><td>في الموقع — معتمد من Qatar Red Crescent</td></tr><tr><td>Retroreflective Gear</td><td>PPE عاكس للضوء — Class 3 EN 20471</td></tr></table></div>
<h3>📐 متطلبات خاصة بأعمال القطر</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>الحالة</th><th>المتطلبات</th></tr><tr><td>Night Work (أعمال ليلية)</td><td>إذن خاص من Ashghal + TMP خاص ليلي + إضاءة إضافية</td></tr><tr><td>Highway Closure (إغلاق طريق سريع)</td><td>خطة TMP خاصة + تنسيق مسبق مع MOI + Ashghal</td></tr><tr><td>Ramadan Period</td><td>يُقلَّل إغلاق الطريق قدر الإمكان + لا أعمال بعد Iftar بساعتين</td></tr><tr><td>National Events</td><td>توقف أعمال الطريق — إشعار Ashghal مسبق</td></tr><tr><td>Utility Crossings</td><td>TMP يشمل كل Utility مع NGC/KAHRAMAA</td></tr><tr><td>School Zones</td><td>لا أعمال 7-9am & 2-4pm في أيام الدراسة</td></tr></table></div>
<h3>📐 الـ ITP الخاص بـ TMP</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>النشاط</th><th>الاختبار</th><th>التكرار</th><th>HP/W</th></tr><tr><td>TMP Submission</td><td>TMP مقدَّم ≥ 14 يوم قبل البدء</td><td>قبل كل مرحلة</td><td>HP</td></tr><tr><td>TMP Approval</td><td>موافقة Ashghal مكتوبة</td><td>Per Submission</td><td>HP</td></tr><tr><td>Signs Installation</td><td>Visual Inspection — الصواب والاكتمال</td><td>يومياً</td><td>W</td></tr><tr><td>Barriers Check</td><td>Visual — ثبات وعدم تهجير</td><td>يومياً</td><td>W</td></tr><tr><td>Night Inspection</td><td>Lighting Level + Visibility Check</td><td>كل ليلة عمل</td><td>W</td></tr><tr><td>Incident Recording</td><td>تسجيل أي حادث + تقرير Ashghal</td><td>فوري</td><td>HP</td></tr><tr><td>TMP Update</td><td>تحديث عند أي تغيير</td><td>عند الحاجة</td><td>HP</td></tr></table></div>
</div>

<div class="lang-content-en" style="display:none;">

<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 Ashghal / MMUP Standards | Qatar Highway Design Manual | Traffic Management
</div>
<h3>What is a Traffic Management Plan (TMP)?</h3>
<p style="font-size:12px;">A mandatory plan submitted and approved before any road works. Defines how to maintain road user safety and ensure traffic continuity during construction.</p>
<h3>Ashghal TMP Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Reference</th></tr><tr><td>Plan Submission</td><td>At least 14 days before road works start</td><td>Ashghal TMP Guidelines</td></tr><tr><td>Plan Approval</td><td>Written approval from Ashghal Traffic Dept</td><td>Ashghal</td></tr><tr><td>Prepared By</td><td>Certified Traffic Engineer + TMP Officer</td><td>Ashghal</td></tr><tr><td>Updates</td><td>When scope or schedule changes</td><td>Ashghal</td></tr><tr><td>Review Frequency</td><td>Weekly + after any incident</td><td>Ashghal</td></tr></table></div><h3>Mandatory TMP Elements</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Element</th><th>Requirement</th><th>Standard</th></tr><tr><td>Traffic Signs</td><td>Warning + Guidance + Temp Speed signs</td><td>MMUP Traffic Signs Manual</td></tr><tr><td>Lane Closure Plan</td><td>Closure details + timing</td><td>Ashghal TMP</td></tr><tr><td>Detour Routes</td><td>Mapped alternative routes</td><td>Ashghal TMP</td></tr><tr><td>Work Zone Lighting</td><td>LED portable ≥ 50 lux</td><td>MMUP</td></tr><tr><td>Temporary Barriers</td><td>Water-filled or Jersey Concrete</td><td>BS EN 1317</td></tr><tr><td>Traffic Cones</td><td>Every 5m in transition zone</td><td>Ashghal</td></tr><tr><td>Arrow Boards</td><td>At each major diversion — Solar</td><td>Ashghal TMP</td></tr><tr><td>Traffic Controllers</td><td>At active intersections</td><td>Ashghal TMP</td></tr><tr><td>Emergency Response Plan</td><td>Ashghal + MoI contact numbers</td><td>Ashghal</td></tr></table></div><h3>Qatar-Specific Requirements</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Condition</th><th>Requirements</th></tr><tr><td>Night Work</td><td>Special permit + Night TMP + Extra lighting</td></tr><tr><td>Highway Closure</td><td>Special TMP + MOI coordination in advance</td></tr><tr><td>Ramadan Period</td><td>Minimize closures + no works 2hr after Iftar</td></tr><tr><td>National Events</td><td>Stop road works + advance Ashghal notice</td></tr><tr><td>School Zones</td><td>No works 7-9am & 2-4pm on school days</td></tr></table></div>
</div>
` },

  roads: { title: '🛣️ أعمال الطرق — QCS 2024', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 | أعمال الطرق | Ashghal Standards
</div>

<h3>🗺️ مراحل التنفيذ — الترتيب الإلزامي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('subgrade')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">1️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Subgrade</div>
<div style="color:var(--text3);font-size:11px;">CBR≥8% | Comp≥95% MDD</div></div>
<div onclick="QS.openDetail('subbase')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">2️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Subbase</div>
<div style="color:var(--text3);font-size:11px;">CBR≥70% | Comp≥98% MDD</div></div>
<div onclick="QS.openDetail('base')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">3️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Road Base</div>
<div style="color:var(--text3);font-size:11px;">CBR≥80% | Comp≥98% MDD</div></div>
<div onclick="QS.openDetail('prime')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">4️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Prime Coat</div>
<div style="color:var(--text3);font-size:11px;">MC-30/70 | 0.8-1.2 L/m²</div></div>
<div onclick="QS.openDetail('binder')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">5️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Binder Course</div>
<div style="color:var(--text3);font-size:11px;">BC-A/B | Stab≥8kN | 97%TMD</div></div>
<div onclick="QS.openDetail('wearing')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">6️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Wearing Course</div>
<div style="color:var(--text3);font-size:11px;">WC | PSV≥55 | IRI | 97%TMD</div></div>
<div onclick="QS.openDetail('finishing')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">7️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التشطيبات</div>
<div style="color:var(--text3);font-size:11px;">Kerbs + Markings + Signs</div></div>
<div onclick="QS.openDetail('handover')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">8️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التسليم</div>
<div style="color:var(--text3);font-size:11px;">Final IRI + As-Built + Punch List</div></div>
</div>

<h3>🧱 المواد — Materials</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🛢️</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">بيتومين 60/70 + PMB</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:4 & 5:5</div></div>
<div onclick="QS.openDetail('gabbro_specs')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪨</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">مواصفات الجابرو</div>
<div style="color:var(--text3);font-size:10px;">Tables 4:1, 4:2, 5:1, 5:2</div></div>
<div onclick="QS.openDetail('geotextile_specs')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🕸️</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Geotextile</div>
<div style="color:var(--text3);font-size:10px;">ISO 10319, 12236</div></div>
</div>

<h3>🔬 تصميم الخلطة — Mix Design</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('marshall_mix')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔬</div><div style="color:#3498db;font-weight:700;font-size:12px;">Marshall Mix Design</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:6, 5:7, 5:8</div></div>
<div onclick="QS.openDetail('superpave_mix')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">⚙️</div><div style="color:#3498db;font-weight:700;font-size:12px;">Superpave + SGC</div>
<div style="color:var(--text3);font-size:10px;">Table 5:17 | PG Grade</div></div>
<div onclick="QS.openDetail('air_voids_tolerances')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📐</div><div style="color:#3498db;font-weight:700;font-size:12px;">Air Voids & Tolerances</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:9, 5:10, 5:11</div></div>
<div onclick="QS.openDetail('pavement_production')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏭</div><div style="color:#3498db;font-weight:700;font-size:12px;">الإنتاج والفرش</div>
<div style="color:var(--text3);font-size:10px;">Temp + Elevation + Production</div></div>
</div>

<h3>🔗 التنفيذ والوصلات</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('paving_joints')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔗</div><div style="color:var(--gold);font-weight:700;font-size:12px;">الجوانت والدمك</div>
<div style="color:var(--text3);font-size:10px;">Joints + Rolling Pattern</div></div>
<div onclick="QS.openDetail('prime_tack_summary')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🛢️</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Prime & Tack Coat</div>
<div style="color:var(--text3);font-size:10px;">Rates + Temps + Curing</div></div>
</div>

<h3>📋 ضبط الجودة والاختبارات</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('road_itps')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📋</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">ITPs الطرق</div>
<div style="color:var(--text3);font-size:10px;">Hold Points + Witness Points</div></div>
<div onclick="QS.openDetail('testing_schedule')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🗓️</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">جدول الاختبارات</div>
<div style="color:var(--text3);font-size:10px;">Tests by Quantity</div></div>
<div onclick="QS.openDetail('bitumen_tests')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🧪</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">اختبارات البيتومين</div>
<div style="color:var(--text3);font-size:10px;">PAV, DSR, BBR, DTT, RV, PMB</div></div>
<div onclick="QS.openDetail('roads_qcp')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">✅</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">QCP الطرق</div>
<div style="color:var(--text3);font-size:10px;">Quality Control Plan</div></div>
</div>

<h3>📄 Method Statements & Design</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ms_asphalt')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📄</div><div style="color:#3498db;font-weight:700;font-size:12px;">Method Statement الإسفلت</div>
<div style="color:var(--text3);font-size:10px;">Sequence + Resources + QC</div></div>
<div onclick="QS.openDetail('traffic_axle')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🚛</div><div style="color:#3498db;font-weight:700;font-size:12px;">تصميم الرصيف</div>
<div style="color:var(--text3);font-size:10px;">ESAL + Traffic T1-T6</div></div>
<div onclick="QS.openDetail('concrete_pavement')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏗️</div><div style="color:#3498db;font-weight:700;font-size:12px;">رصف الخرسانة</div>
<div style="color:var(--text3);font-size:10px;">JPCP + CRCP + Joints</div></div>
<div onclick="QS.openDetail('doc_analyzer')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📁</div><div style="color:#3498db;font-weight:700;font-size:12px;">محلل الوثائق</div>
<div style="color:var(--text3);font-size:10px;">Specs + Drawings + BOQ</div></div>
</div>


<h3>🚦 Traffic Management + وثائق</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('traffic_management_plan')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🚦</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Traffic Management Plan</div>
<div style="color:var(--text3);font-size:10px;">TMP + Ashghal Requirements</div></div>
<div onclick="QS.openDetail('doc_analyzer')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📁</div><div style="color:#3498db;font-weight:700;font-size:12px;">محلل الوثائق</div>
<div style="color:var(--text3);font-size:10px;">Specs + Drawings + BOQ + AI</div></div>
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 & 8 | Road Works — QC Inspection Plan
</div>
<h3>🛣️ Select Road Works Phase</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('subgrade')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:24px">🏔️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Subgrade</div>
<div style="color:var(--text3);font-size:11px;">CBR≥8% | 95% MDD</div></div>
<div onclick="QS.openDetail('subbase')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:24px">🪨</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Subbase (Type B)</div>
<div style="color:var(--text3);font-size:11px;">CBR≥30% | 100% BS Heavy</div></div>
<div onclick="QS.openDetail('binder')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:24px">🛢️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Binder Course</div>
<div style="color:var(--text3);font-size:11px;">AC20 | ≥140°C | 97% TMD</div></div>
<div onclick="QS.openDetail('wearing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:24px">🛣️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Wearing Course</div>
<div style="color:var(--text3);font-size:11px;">AC14 | ≥145°C | IRI≤2.5</div></div>
</div>
<table class="dm-table">
<tr><th>Phase</th><th>Key Test</th><th>Acceptance</th><th>Freq</th></tr>
<tr><td>Subgrade</td><td>Density (Sand Cone)</td><td>≥95% MDD</td><td>1/500m²</td></tr>
<tr><td>Subgrade</td><td>CBR Soaked 4d</td><td>≥8%</td><td>1/500m³</td></tr>
<tr><td>Subbase</td><td>Density</td><td>≥100% BS Heavy</td><td>1/500m²</td></tr>
<tr><td>Subbase</td><td>CBR</td><td>≥30%</td><td>1/source change</td></tr>
<tr><td>Binder/Wearing</td><td>Core Density</td><td>≥97% TMD</td><td>1/250m²</td></tr>
<tr><td>Wearing</td><td>IRI Smoothness</td><td>≤2.5 m/km</td><td>100%</td></tr>
<tr><td>Wearing</td><td>Marshall Stability</td><td>≥8.0 kN</td><td>Per mix design</td></tr>
</table>
</div>

<h3>🗺️ Execution Phases — Mandatory Sequence</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('subgrade')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">1️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Subgrade</div>
<div style="color:var(--text3);font-size:11px;">CBR≥8% | Comp≥95% MDD</div></div>
<div onclick="QS.openDetail('subbase')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">2️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Subbase</div>
<div style="color:var(--text3);font-size:11px;">CBR≥70% | Comp≥98% MDD</div></div>
<div onclick="QS.openDetail('base')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">3️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Road Base</div>
<div style="color:var(--text3);font-size:11px;">CBR≥80% | Comp≥98% MDD</div></div>
<div onclick="QS.openDetail('prime')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">4️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Prime Coat</div>
<div style="color:var(--text3);font-size:11px;">MC-30/70 | 0.8-1.2 L/m²</div></div>
<div onclick="QS.openDetail('binder')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">5️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Binder Course</div>
<div style="color:var(--text3);font-size:11px;">BC-A/B | Stab≥8kN | 97%TMD</div></div>
<div onclick="QS.openDetail('wearing')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">6️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Wearing Course</div>
<div style="color:var(--text3);font-size:11px;">WC | PSV≥55 | IRI | 97%TMD</div></div>
<div onclick="QS.openDetail('finishing')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">7️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Finishing</div>
<div style="color:var(--text3);font-size:11px;">Kerbs + Markings + Signs</div></div>
<div onclick="QS.openDetail('handover')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">8️⃣</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Handover</div>
<div style="color:var(--text3);font-size:11px;">Final IRI + As-Built + Punch List</div></div>
</div>

<h3>🧱 Materials</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('roads_materials')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🛢️</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Bitumen 60/70 + PMB</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:4 & 5:5</div></div>
<div onclick="QS.openDetail('gabbro_specs')" style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🪨</div><div style="color:#9b59b6;font-weight:700;font-size:12px;">Gabbro Specs</div>
<div style="color:var(--text3);font-size:10px;">Tables 4:1, 4:2, 5:1, 5:2</div></div>
<div onclick="QS.openDetail('geotextile_specs')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🕸️</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Geotextile</div>
<div style="color:var(--text3);font-size:10px;">ISO 10319, 12236</div></div>
</div>

<h3>🔬 Mix Design</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('marshall_mix')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔬</div><div style="color:#3498db;font-weight:700;font-size:12px;">Marshall Mix Design</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:6, 5:7, 5:8</div></div>
<div onclick="QS.openDetail('superpave_mix')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">⚙️</div><div style="color:#3498db;font-weight:700;font-size:12px;">Superpave + SGC</div>
<div style="color:var(--text3);font-size:10px;">Table 5:17 | PG Grade</div></div>
<div onclick="QS.openDetail('air_voids_tolerances')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📐</div><div style="color:#3498db;font-weight:700;font-size:12px;">Air Voids & Tolerances</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:9, 5:10, 5:11</div></div>
<div onclick="QS.openDetail('pavement_production')" style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏭</div><div style="color:#3498db;font-weight:700;font-size:12px;">Production & Paving</div>
<div style="color:var(--text3);font-size:10px;">Temp + Elevation + Production</div></div>
</div>

<h3>📋 QC & Testing</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('road_itps')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📋</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Road ITPs</div>
<div style="color:var(--text3);font-size:10px;">Hold Points + Witness</div></div>
<div onclick="QS.openDetail('testing_schedule')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🗓️</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Testing Schedule</div>
<div style="color:var(--text3);font-size:10px;">Tests by Quantity</div></div>
<div onclick="QS.openDetail('bitumen_tests')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🧪</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Bitumen Tests</div>
<div style="color:var(--text3);font-size:10px;">PAV, DSR, BBR, DTT, RV</div></div>
<div onclick="QS.openDetail('roads_qcp')" style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">✅</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">QCP Roads</div>
<div style="color:var(--text3);font-size:10px;">Quality Control Plan</div></div>
</div>

</div>
` },
  subgrade: { title: '🏔️ Subgrade — طبقة التربة الطبيعية', content: `
<div class="lang-content-ar">

<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span>🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">فيديو شرح طبقة Subgrade</span></div>
<button onclick="document.getElementById('vid-sg-ar').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sg-ar" accept="video/*" style="display:none" data-player="vid-sg-ar-p" data-ph="vid-sg-ar-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-sg-ar-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV لشرح طبقة الـ Subgrade</div>
<div id="vid-sg-ar-p" class="qs-vid-ph" data-maxh="250px"></div>
</div>

<h3>📐 تعريف Subgrade — QCS S6 P3 Cl. 3.1</h3>
<p>Subgrade هي الطبقة الطبيعية أو المحسّنة من التربة التي تُشكّل قاعدة الرصيف مباشرة. تُمثّل الطبقة الأساسية لكل طبقات الرصيف فوقها وجودتها تحدد سماكة التصميم وتكلفة المشروع بالكامل.</p>

<h3>⚠️ المواد غير المقبولة — QCS S6 P3 Cl. 3.3</h3>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
<strong>يُحظر استخدام الآتي في طبقة الـ Subgrade:</strong><br>
• Peat أو التربة العضوية — Organic Content &gt; 2%<br>
• Expansive Clays — PI &gt; 10% أو LS &gt; 3%<br>
• Frozen Materials — مواد متجمدة<br>
• مواد ملوثة أو ضارة (Deleterious Materials)<br>
• مواد تحتوي SO₃ &gt; 0.5% بدون موافقة مهندس ومعالجة<br>
• مواد تحتوي Chloride &gt; 0.6% بدون موافقة<br>
• تربة CBR &lt; 8% (عادية) أو &lt; 8% (Sabkha) بدون معالجة معتمدة<br>
• أي مادة بحجم يتجاوز 75mm
</div>

<h3>📐 جدول 3:1 — مواصفات مادة الـ Fill Subgrade — QCS 2024 / Section 6 / Part 3 / Page 8</h3>
<p style="font-size:11px;color:var(--text3);">المصدر: QCS 2024 — Section 6 Part 3 Table 3:1 — Page 8 — كما هو في المواصفات القطرية بالضبط</p>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);">
<th style="min-width:180px;">Parameter — البند</th>
<th style="min-width:220px;">Specification Limit — حد المواصفة</th>
<th style="min-width:180px;">Test Method — طريقة الاختبار</th>
<th style="min-width:200px;">Minimum Test Frequency — أدنى تكرار</th>
</tr>
<tr>
<td><strong>Particle Size Distribution</strong><br><span style="font-size:10px;color:var(--text3);">التدرج الحبيبي</span></td>
<td>
Max size: <strong>75mm</strong><br>
Passing 75.0mm: <strong>100%</strong><br>
Passing 37.5mm: <strong>80 – 100%</strong><br>
Passing 19.0mm: <strong>60 – 90%</strong><br>
Passing 9.5mm: <strong>45 – 75%</strong><br>
Passing 4.75mm: <strong>30 – 60%</strong><br>
Passing 0.425mm: <strong>15 – 35%</strong><br>
Passing 0.075mm: <strong>5 – 20%</strong>
</td>
<td>ASTM C136<br>BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Liquid Limit (LL)</strong><br><span style="font-size:10px;color:var(--text3);">حد السيولة</span></td>
<td style="color:#2ecc71;font-weight:700;">≤ 35%</td>
<td>ASTM D4318<br>BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Plasticity Index (PI)</strong><br><span style="font-size:10px;color:var(--text3);">مؤشر اللدونة</span></td>
<td style="color:#2ecc71;font-weight:700;">≤ 10%</td>
<td>ASTM D4318<br>BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Linear Shrinkage (LS)</strong><br><span style="font-size:10px;color:var(--text3);">الانكماش الخطي</span></td>
<td style="color:#2ecc71;font-weight:700;">≤ 3%</td>
<td>BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Organic Content</strong><br><span style="font-size:10px;color:var(--text3);">المحتوى العضوي</span></td>
<td style="color:#2ecc71;font-weight:700;">≤ 2%<br><span style="font-size:10px;font-weight:400;">% بالوزن الجاف — LOI Method</span></td>
<td>BS 1377-3<br>ASTM D2974</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Water Soluble Sulphate (SO₃)</strong><br><span style="font-size:10px;color:var(--text3);">الكبريتات الذائبة</span></td>
<td style="color:#2ecc71;font-weight:700;">≤ 0.5%<br><span style="font-size:10px;font-weight:400;">% بالوزن الجاف للتربة</span></td>
<td>BS 1377-3<br>AASHTO T290</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Total Chloride Content</strong><br><span style="font-size:10px;color:var(--text3);">إجمالي الكلوريدات</span></td>
<td style="color:#2ecc71;font-weight:700;">≤ 0.6%<br><span style="font-size:10px;font-weight:400;">% بالوزن الجاف للتربة</span></td>
<td>BS 1377-3</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr style="background:rgba(201,168,76,0.06);">
<td><strong>Maximum Dry Density (MDD)</strong><br><span style="font-size:10px;color:var(--text3);">أقصى كثافة جافة</span></td>
<td>يُحدد من اختبار Standard Proctor<br><span style="font-size:10px;">يُعتمد كمرجع للدمك الميداني</span></td>
<td>ASTM D698<br>BS 1377-4</td>
<td>1 test per <strong>soil type change</strong><br>min 1 per 2,000 m³</td>
</tr>
<tr style="background:rgba(201,168,76,0.06);">
<td><strong>Moisture Content (w%)</strong><br><span style="font-size:10px;color:var(--text3);">محتوى الرطوبة أثناء الدمك</span></td>
<td style="color:#2ecc71;font-weight:700;">OMC ± 2%<br><span style="font-size:10px;font-weight:400;">Optimum Moisture Content من اختبار Proctor</span></td>
<td>ASTM D2216<br>BS 1377-2</td>
<td>Daily during compaction<br>min 1 per <strong>500 m²</strong></td>
</tr>
<tr style="background:rgba(46,204,113,0.08);">
<td><strong>Field Density (Compaction)</strong><br><span style="font-size:10px;color:var(--text3);">الكثافة الحقلية</span></td>
<td style="color:#2ecc71;font-weight:700;">≥ 95% MDD (Standard Proctor)<br><span style="font-size:10px;font-weight:400;">لكل طبقة مدموكة ≤ 200mm</span></td>
<td>ASTM D1556 (Sand Cone)<br>ASTM D6938 (Nuclear Gauge)</td>
<td>1 test per <strong>500 m²</strong><br>per compacted layer</td>
</tr>
<tr style="background:rgba(46,204,113,0.12);">
<td><strong>CBR (Soaked 4 days)</strong><br><span style="font-size:10px;color:#2ecc71;">General Fill — تربة عادية</span></td>
<td style="color:#2ecc71;font-weight:700;">≥ 15%<br><span style="font-size:10px;font-weight:400;">عند دمك ≥ 95% MDD — Std. Proctor</span></td>
<td>ASTM D1883<br>BS 1377-4</td>
<td>1 test per <strong>2,000 m²</strong><br>or when source changes</td>
</tr>
<tr style="background:rgba(231,76,60,0.06);">
<td><strong>CBR (Soaked 4 days)</strong><br><span style="font-size:10px;color:#e74c3c;">Sabkha — تربة ملحية</span></td>
<td style="color:#f39c12;font-weight:700;">≥ 8%<br><span style="font-size:10px;font-weight:400;">بموافقة المهندس — عند 95% MDD</span></td>
<td>ASTM D1883<br>BS 1377-4</td>
<td>1 test per <strong>2,000 m²</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Layer Thickness</strong><br><span style="font-size:10px;color:var(--text3);">سماكة الطبقة</span></td>
<td>≤ <strong>200mm</strong> مدموك (General)<br>≤ <strong>150mm</strong> مدموك (Sabkha)</td>
<td>Physical Measurement</td>
<td>Every compacted layer — <strong>100%</strong></td>
</tr>
<tr style="background:rgba(201,168,76,0.06);">
<td><strong>Surface Level Tolerance</strong><br><span style="font-size:10px;color:var(--text3);">دقة المنسوب</span></td>
<td style="font-weight:700;">± 10mm<br><span style="font-size:10px;font-weight:400;">من المنسوب التصميمي</span></td>
<td>Total Station / Level</td>
<td>Every <strong>25m</strong> chainage × full width</td>
</tr>
<tr>
<td><strong>Crossfall</strong><br><span style="font-size:10px;color:var(--text3);">الانحدار العرضي</span></td>
<td style="font-weight:700;">2.5% ± 0.5%<br><span style="font-size:10px;font-weight:400;">لضمان التصريف السطحي الصحيح</span></td>
<td>Template / Level Board</td>
<td>Every <strong>25m</strong> chainage</td>
</tr>
</table>
</div>

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin:12px 0;font-size:12px;">
<strong>🔵 ملاحظات QCS S6 P3 Cl. 3.3.2 الجوهرية:</strong><br>
• اختبار Proctor يُجرى لكل نوع تربة قبل البدء — يُحدد MDD و OMC<br>
• Nuclear Gauge مسموح للمراقبة اليومية فقط — Sand Cone هو المرجع الرسمي للقبول<br>
• أي نتيجة كثافة &lt; 95% MDD → إعادة دمك فورية + إعادة اختبار<br>
• Subgrade لا يُقبَّل ولا تُبدأ الـ Subbase قبل HP رسمي من الاستشاري
</div>

<h3>🔴 Hold Points الإلزامية</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق المطلوب</th></tr>
<tr><td>HP-01</td><td>اعتماد تقرير الجسات + تصنيف التربة قبل أي حفر</td><td>GI Report + Ashghal/Engineer Approval</td></tr>
<tr><td>HP-02</td><td>إزالة المواد غير المقبولة وتأكيد الاستبدال</td><td>Disposal Records + Replacement Lab Tests</td></tr>
<tr><td>HP-03</td><td>Proctor MDD + OMC معتمد قبل بدء الدمك</td><td>Lab Compaction Report — per material change</td></tr>
<tr><td>HP-04</td><td>Field Density ≥ 95% MDD + CBR ≥ 8%/8% مكتملان ومعتمدان</td><td>Sand Cone Reports + CBR Reports</td></tr>
<tr><td>HP-05</td><td>Level Survey ± 10mm معتمد من الاستشاري</td><td>As-Built Survey Report</td></tr>
</table>

</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 | Subgrade Formation
</div>
<h3>🏔️ Subgrade — QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Standard</th><th>Frequency</th></tr>
<tr><td>Compaction (MDD)</td><td>≥95% BS Heavy</td><td>QCS S6 P5</td><td>1 test/500m²/layer</td></tr>
<tr><td>CBR (4-day soaked)</td><td>≥8% (Urban) / ≥5% (Rural)</td><td>QCS S6 P3</td><td>1 test/500m³</td></tr>
<tr><td>Level Tolerance</td><td>±20mm from design</td><td>QCS S6 P5</td><td>Every 25m</td></tr>
<tr><td>Plasticity Index</td><td>≤12 (cohesive) / NP (granular)</td><td>QCS S6 P3</td><td>Per source change</td></tr>
<tr><td>Sulphate (SO3)</td><td>≤0.3%</td><td>BS 1377</td><td>Per source change</td></tr>
<tr><td>Moisture Content</td><td>OMC ±2%</td><td>ASTM D698</td><td>Daily</td></tr>
<tr><td>Layer Thickness</td><td>≤200mm per layer</td><td>QCS S6 P5</td><td>Continuous</td></tr>
</table>
<h4 style="margin-top:14px;color:var(--gold);">🔴 Hold Points</h4>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;font-size:12px;">
<strong>HP1:</strong> Engineer approval of subgrade formation before subbase<br>
<strong>HP2:</strong> Proof rolling — any rutting >12mm = re-compact<br>
<strong>HP3:</strong> All density + CBR results accepted before proceeding
</div>
<div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
⚠️ Subgrade in Qatar: Watch for sabkha, gypseous soils, and high groundwater. Verify sulphate content before any placement.
</div>
</div>
<button onclick="document.getElementById('vid-sg-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sg-en" accept="video/*" style="display:none" data-player="vid-sg-en-p" data-ph="vid-sg-en-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-sg-en-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV explaining Subgrade preparation</div>
<div id="vid-sg-en-p" class="qs-vid-ph" data-maxh="250px"></div>
</div>

<h3>Subgrade Definition — QCS S6 P3 Cl. 3.1</h3>
<p>The subgrade is the natural or improved soil layer forming the direct foundation of the pavement. Its quality dictates the pavement design thickness and overall project cost.</p>

<h3>Unacceptable Materials — QCS S6 P3 Cl. 3.3</h3>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
The following SHALL NOT be used in the Subgrade layer:<br>
• Peat or Organic Soils — Organic Content &gt; 2%<br>
• Expansive Clays — PI &gt; 10% or LS &gt; 3%<br>
• Frozen Materials<br>
• Deleterious or contaminated materials<br>
• SO₃ &gt; 0.5% without Engineer approval + treatment<br>
• Chloride &gt; 0.6% without Engineer approval<br>
• Soil with CBR &lt; 8% (general) or &lt; 8% (Sabkha) without approved treatment<br>
• Material with any particle exceeding 75mm
</div>

<h3>Table 3:1 — Fill Subgrade Material Specification — QCS 2024 / Section 6 / Part 3 / Page 8</h3>
<p style="font-size:11px;color:var(--text3);">Source: QCS 2024 — Section 6 Part 3 Table 3:1 — Page 8 — values as per Qatar Construction Specifications</p>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);">
<th style="min-width:180px;">Parameter</th>
<th style="min-width:220px;">Specification Limit</th>
<th style="min-width:180px;">Test Method</th>
<th style="min-width:200px;">Minimum Test Frequency</th>
</tr>
<tr>
<td><strong>Particle Size Distribution</strong></td>
<td>
Max size: <strong>75mm</strong><br>
Passing 75.0mm: <strong>100%</strong><br>
Passing 37.5mm: <strong>80 – 100%</strong><br>
Passing 19.0mm: <strong>60 – 90%</strong><br>
Passing 9.5mm: <strong>45 – 75%</strong><br>
Passing 4.75mm: <strong>30 – 60%</strong><br>
Passing 0.425mm: <strong>15 – 35%</strong><br>
Passing 0.075mm: <strong>5 – 20%</strong>
</td>
<td>ASTM C136<br>BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Liquid Limit (LL)</strong></td>
<td style="color:#2ecc71;font-weight:700;">≤ 35%</td>
<td>ASTM D4318 / BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Plasticity Index (PI)</strong></td>
<td style="color:#2ecc71;font-weight:700;">≤ 10%</td>
<td>ASTM D4318 / BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Linear Shrinkage (LS)</strong></td>
<td style="color:#2ecc71;font-weight:700;">≤ 3%</td>
<td>BS 1377-2</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Organic Content</strong></td>
<td style="color:#2ecc71;font-weight:700;">≤ 2%<br><span style="font-size:10px;font-weight:400;">by dry weight — LOI Method</span></td>
<td>BS 1377-3 / ASTM D2974</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Water Soluble Sulphate (SO₃)</strong></td>
<td style="color:#2ecc71;font-weight:700;">≤ 0.5%<br><span style="font-size:10px;font-weight:400;">by weight of dry soil</span></td>
<td>BS 1377-3 / AASHTO T290</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Total Chloride Content</strong></td>
<td style="color:#2ecc71;font-weight:700;">≤ 0.6%<br><span style="font-size:10px;font-weight:400;">by weight of dry soil</span></td>
<td>BS 1377-3</td>
<td>1 test per <strong>2,000 m³</strong><br>or when source changes</td>
</tr>
<tr style="background:rgba(201,168,76,0.06);">
<td><strong>Maximum Dry Density (MDD)</strong></td>
<td>Determined by Standard Proctor<br><span style="font-size:10px;">Reference for field compaction acceptance</span></td>
<td>ASTM D698 / BS 1377-4</td>
<td>1 test per <strong>soil type change</strong><br>min 1 per 2,000 m³</td>
</tr>
<tr style="background:rgba(201,168,76,0.06);">
<td><strong>Moisture Content (w%)</strong></td>
<td style="color:#2ecc71;font-weight:700;">OMC ± 2%</td>
<td>ASTM D2216 / BS 1377-2</td>
<td>Daily during compaction<br>min 1 per <strong>500 m²</strong></td>
</tr>
<tr style="background:rgba(46,204,113,0.08);">
<td><strong>Field Density (Compaction)</strong></td>
<td style="color:#2ecc71;font-weight:700;">≥ 95% MDD (Std. Proctor)<br><span style="font-size:10px;font-weight:400;">each compacted layer ≤ 200mm</span></td>
<td>ASTM D1556 (Sand Cone)<br>ASTM D6938 (Nuclear)</td>
<td>1 test per <strong>500 m²</strong><br>per compacted layer</td>
</tr>
<tr style="background:rgba(46,204,113,0.12);">
<td><strong>CBR (Soaked 4 days) — General Fill</strong></td>
<td style="color:#2ecc71;font-weight:700;">≥ 15%<br><span style="font-size:10px;font-weight:400;">at 95% MDD — Std. Proctor</span></td>
<td>ASTM D1883 / BS 1377-4</td>
<td>1 test per <strong>2,000 m²</strong><br>or when source changes</td>
</tr>
<tr style="background:rgba(231,76,60,0.06);">
<td><strong>CBR (Soaked 4 days) — Sabkha</strong></td>
<td style="color:#f39c12;font-weight:700;">≥ 8%<br><span style="font-size:10px;font-weight:400;">subject to Engineer approval, at 95% MDD</span></td>
<td>ASTM D1883 / BS 1377-4</td>
<td>1 test per <strong>2,000 m²</strong><br>or when source changes</td>
</tr>
<tr>
<td><strong>Layer Thickness</strong></td>
<td>≤ <strong>200mm</strong> compacted (General)<br>≤ <strong>150mm</strong> compacted (Sabkha)</td>
<td>Physical Measurement</td>
<td>Every compacted layer — <strong>100%</strong></td>
</tr>
<tr style="background:rgba(201,168,76,0.06);">
<td><strong>Surface Level Tolerance</strong></td>
<td style="font-weight:700;">± 10mm from design level</td>
<td>Total Station / Level</td>
<td>Every <strong>25m</strong> chainage × full width</td>
</tr>
<tr>
<td><strong>Crossfall</strong></td>
<td style="font-weight:700;">2.5% ± 0.5%</td>
<td>Template / Level Board</td>
<td>Every <strong>25m</strong> chainage</td>
</tr>
</table>
</div>

<h3>Hold Points — Mandatory</h3>
<table class="dm-table">
<tr><th>HP</th><th>Condition</th><th>Documentation Required</th></tr>
<tr><td>HP-01</td><td>GI Report + soil classification approved before any excavation</td><td>GI Report + Engineer Approval</td></tr>
<tr><td>HP-02</td><td>Unsuitable material removed and replacement confirmed</td><td>Disposal Records + Lab Tests</td></tr>
<tr><td>HP-03</td><td>Proctor MDD + OMC approved before compaction starts</td><td>Lab Compaction Report — per material change</td></tr>
<tr><td>HP-04</td><td>Field Density ≥ 95% MDD + CBR ≥ 8%/8% complete and approved</td><td>Sand Cone Reports + CBR Reports</td></tr>
<tr><td>HP-05</td><td>Level Survey ± 10mm approved by Consultant</td><td>As-Built Survey Report</td></tr>
</table>

</div>
` },
  subbase: { title: '🪨 Subbase — الطبقة الأساسية السفلية', content: `

<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 طبقة Road Base — التنفيذ والاختبارات</span>
<button onclick="document.getElementById('vid-base-new').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-base-new" accept="video/*" style="display:none" data-player="vid-base-new-p" data-ph="vid-base-new-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-base-new-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-base-new-p" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<h3>📐 تعريف Road Base — QCS S6 P4 Cl. 4.1</h3>
<p>Road Base هي الطبقة الإنشائية الرئيسية في الرصيف، تقع مباشرة تحت طبقات الإسفلت وفوق الـ Subbase. وظيفتها تحمّل الأحمال المرورية وتوزيعها. تُنفَّذ من الجابرو المكسّر عالي الجودة بمتطلبات أكثر صرامة من الـ Subbase. الفرق الجوهري: LA Abrasion ≤ 30% (بدل 40%) و Fines ≤ 12% (بدل 15%). السماكة التصميمية 200mm–300mm.</p>

<h3>⚠️ المواد غير المقبولة — QCS S6 P4</h3>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
<strong>يُحظر استخدامه في Road Base:</strong><br>
• مواد LA Abrasion &gt; 30%<br>
• Flakiness أو Elongation &gt; 30%<br>
• Soundness (MgSO₄) &gt; 12%<br>
• Water Absorption &gt; 1.5%<br>
• Fines (0.075mm) &gt; 12%<br>
• SO₃ &gt; 0.5% أو Chloride &gt; 0.04%<br>
• مواد غير مكسّرة أو ملوثة<br>
• حجم أكبر من 37.5mm
</div>

<h3>📐 جدول 4:1 — التدرج الحبيبي Road Base — QCS S6 P4</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Sieve Size</th><th>% Passing — Road Base</th><th>Test Method</th><th>Frequency</th></tr>
<tr><td>37.5 mm</td><td><strong>100</strong></td><td rowspan="7">ASTM C136</td><td rowspan="7">1 per <strong>2,000 m³</strong></td></tr>
<tr><td>19.0 mm</td><td><strong>65 – 85</strong></td></tr>
<tr><td>9.5 mm</td><td><strong>50 – 75</strong></td></tr>
<tr><td>4.75 mm</td><td><strong>30 – 60</strong></td></tr>
<tr><td>2.36 mm</td><td><strong>20 – 45</strong></td></tr>
<tr><td>0.425 mm</td><td><strong>10 – 25</strong></td></tr>
<tr><td>0.075 mm</td><td style="color:#e74c3c;font-weight:700;">5 – 12</td></tr>
</table></div>

<h3>📐 جدول 4:2 — خصائص الركام Road Base — QCS S6 P4</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th style="min-width:180px;">Parameter</th><th>Limit</th><th>Test Method</th><th>Frequency</th></tr>
<tr><td><strong>LA Abrasion</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 30%</td><td>ASTM C131</td><td>1 per source</td></tr>
<tr><td><strong>Flakiness Index</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 30%</td><td>BS 812-105</td><td>1 per source</td></tr>
<tr><td><strong>Elongation Index</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 30%</td><td>BS 812-105</td><td>1 per source</td></tr>
<tr><td><strong>Soundness (MgSO₄)</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 12%</td><td>ASTM C88</td><td>1 per source</td></tr>
<tr><td><strong>Water Absorption</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 1.5%</td><td>BS 812-2</td><td>1 per source</td></tr>
<tr><td><strong>10% Fines Value (TFV)</strong></td><td style="color:#2ecc71;font-weight:700;">≥ 110 kN (dry)<br>Wet/Dry ratio ≥ 75%</td><td>BS 812-111</td><td>1 per source</td></tr>
<tr><td><strong>CBR (Soaked 4 days)</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 80%</td><td>ASTM D1883</td><td>1 per 2,000 m²</td></tr>
<tr><td><strong>SO₃</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 0.5%</td><td>BS 1377-3</td><td>1 per 2,000 m³</td></tr>
<tr><td><strong>Chloride</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 0.04%</td><td>BS 1377-3</td><td>1 per 2,000 m³</td></tr>
</table></div>

<h3>📐 الدمك والقبول الميداني</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>Test Method</th><th>Frequency</th></tr>
<tr style="background:rgba(201,168,76,0.06);"><td><strong>MDD (Modified Proctor)</strong></td><td>ASTM D1557 — المرجع</td><td>ASTM D1557</td><td>1 per material</td></tr>
<tr style="background:rgba(201,168,76,0.06);"><td><strong>Moisture</strong></td><td style="color:#2ecc71;font-weight:700;">OMC ± 1.5%<br><span style="font-size:10px;font-weight:400;">أضيق من Subbase (± 2%)</span></td><td>ASTM D2216</td><td>1 per 500 m²</td></tr>
<tr style="background:rgba(46,204,113,0.1);"><td><strong>Field Density</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 98% MDD<br><span style="font-size:10px;font-weight:400;">Modified Proctor</span></td><td>ASTM D1556</td><td>1 per <strong>500 m²</strong></td></tr>
<tr><td><strong>Layer Thickness</strong></td><td>≤ <strong>200mm</strong> compacted</td><td>Measurement</td><td>100%</td></tr>
<tr><td><strong>Surface Level</strong></td><td>± <strong>10mm</strong></td><td>Total Station</td><td>Every 25m</td></tr>
<tr><td><strong>Surface Regularity</strong></td><td>≤ <strong>10mm</strong> under 3m straightedge<br><span style="font-size:10px;">أكثر صرامة من Subbase (15mm)</span></td><td>3m Straightedge</td><td>Random per 100m</td></tr>
<tr><td><strong>Crossfall</strong></td><td><strong>2.5% ± 0.3%</strong></td><td>Template</td><td>Every 25m</td></tr>
</table></div>

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin:12px 0;font-size:12px;">
<strong>🔵 ملاحظات جوهرية — Road Base vs Subbase:</strong><br>
• متطلبات الركام <strong>أكثر صرامة</strong>: LA ≤ 30% (بدل 40%)، Soundness ≤ 12% (بدل 18%)<br>
• Moisture tolerance أضيق: <strong>OMC ± 1.5%</strong> بدل ± 2%<br>
• Surface regularity أدق: <strong>≤ 10mm</strong> بدل 15mm<br>
• 10% Fines Value (TFV) مطلوب — غير مطلوب في Subbase<br>
• يُمنع الفرش قبل اعتماد Subbase (HP إلزامي)
</div>

<h3>🔴 Hold Points</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>مصدر جابرو معتمد + TFV + LA + Grading</td><td>Source Approval + Full Lab Report</td></tr>
<tr><td>HP-02</td><td>Modified Proctor معتمد</td><td>Lab Compaction Report</td></tr>
<tr><td>HP-03</td><td>Subbase معتمد قبل الفرش</td><td>Subbase Approval Certificate</td></tr>
<tr><td>HP-04</td><td>Density ≥ 98% MDD + CBR ≥ 80%</td><td>Sand Cone + CBR Reports</td></tr>
<tr><td>HP-05</td><td>Level ± 10mm + Regularity ≤ 10mm</td><td>Survey + Straightedge Reports</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🪨 Subbase (Type B) — QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Material</td><td>Crushed aggregate Type B — gabbro or approved</td><td>QCS S6 P3</td></tr>
<tr><td>Max Particle Size</td><td>37.5 mm</td><td>QCS S6 T3.1</td></tr>
<tr><td>CBR (4-day soaked)</td><td>≥30% (urban) / ≥25% (rural)</td><td>QCS S6 P3</td></tr>
<tr><td>Plasticity Index</td><td>≤6</td><td>QCS S6</td></tr>
<tr><td>Sand Equivalent</td><td>≥30</td><td>QCS S6</td></tr>
<tr><td>Compaction MDD</td><td>≥100% BS Heavy</td><td>QCS S6 P5</td></tr>
<tr><td>Layer Thickness</td><td>150–250mm per layer</td><td>QCS S6 P5</td></tr>
<tr><td>Level Tolerance</td><td>±15mm</td><td>QCS S6 P5</td></tr>
<tr><td>Test Frequency</td><td>1 density test/500m² per layer</td><td>QCS S6 P5</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: Engineer approval required before placing roadbase. All density + CBR tests must pass.
</div>
</div>
` },
  base: { title: '🧱 Base Course — طبقة الأساس', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Road Base Course — التنفيذ والاختبارات</span>
<button onclick="document.getElementById('vid-base').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-base" accept="video/*" style="display:none" data-player="vid-player-base" data-ph="vid-ph-base" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-base" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-base" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 — Section 6 Part 4 — Tables 4:2, 4:3 (Road Base values only)
</div>
<h3>📐 جدول 4:2 — Coarse Aggregate — Road Base فقط — QCS S6 P4 Page 6</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Property — الخاصية</th><th>Road Base Spec Limit</th><th>Test Method</th><th>Min Frequency</th></tr>
<tr><td>LA Abrasion Loss</td><td>≤ <strong>30%</strong></td><td>ASTM C131</td><td>1 per 1,000 m³</td></tr>
<tr><td>Flakiness Index</td><td>≤ <strong>30%</strong></td><td>BS 812 P105</td><td>1 per 500 m³</td></tr>
<tr><td>Elongation Index</td><td>≤ <strong>30%</strong></td><td>BS 812 P105</td><td>1 per 500 m³</td></tr>
<tr><td>Fractured Faces (1 face+)</td><td>≥ <strong>75%</strong></td><td>ASTM D5821</td><td>1 per 500 m³</td></tr>
<tr><td>Fractured Faces (2 faces+)</td><td>≥ <strong>50%</strong></td><td>ASTM D5821</td><td>1 per 500 m³</td></tr>
<tr><td>Water Absorption</td><td>≤ <strong>2%</strong></td><td>ASTM C127</td><td>1 per 500 m³</td></tr>
<tr><td>Soundness (MgSO₄)</td><td>≤ <strong>12%</strong></td><td>ASTM C88</td><td>1 per 1,000 m³</td></tr>
<tr><td>Specific Gravity (SSD)</td><td>≥ <strong>2.5</strong></td><td>ASTM C127</td><td>1 per source change</td></tr>
<tr><td>Water-Soluble Sulphate SO₃</td><td>≤ <strong>0.5%</strong></td><td>BS 1377-3</td><td>1 per 1,000 m³</td></tr>
<tr><td>Total Chloride</td><td>≤ <strong>0.6%</strong></td><td>BS 1377-3</td><td>1 per 1,000 m³</td></tr>
</table></div>
<h3>📐 جدول 4:3 — Combined Aggregate — Road Base — QCS S6 P4 Page 7</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Property — الخاصية</th><th>Road Base Spec Limit</th><th>Test Method</th><th>Min Frequency</th></tr>
<tr><td>CBR (Soaked 4 days @ 98% MDD)</td><td>≥ <strong style="color:#2ecc71;">80%</strong></td><td>ASTM D1883</td><td>1 per 2,000 m²</td></tr>
<tr><td>Plasticity Index (PI)</td><td>≤ <strong>4%</strong></td><td>ASTM D4318</td><td>1 per 500 m³</td></tr>
<tr><td>Liquid Limit (LL)</td><td>≤ <strong>25%</strong></td><td>ASTM D4318</td><td>1 per 500 m³</td></tr>
<tr><td>Sand Equivalent (SE)</td><td>≥ <strong>35%</strong></td><td>ASTM D2419</td><td>1 per 500 m³</td></tr>
<tr><td>Organic Content</td><td>≤ <strong>1%</strong></td><td>ASTM D2974</td><td>per source change</td></tr>
<tr><td>Max Particle Size</td><td>50 mm (≤ ½ layer thickness)</td><td>Sieve</td><td>per source change</td></tr>
<tr><td>Compaction (Field Density)</td><td>≥ <strong>98% MDD</strong> (Std Proctor)</td><td>ASTM D1556 (Sand Cone)</td><td>1 per 500 m²</td></tr>
<tr><td>Layer Thickness (compacted)</td><td>150 – 250 mm</td><td>Physical Measurement</td><td>100% each layer</td></tr>
<tr><td>Level Tolerance</td><td>± <strong>8 mm</strong> from design</td><td>Total Station / Level</td><td>Every 25 m chainage</td></tr>
</table></div>
<h3>📐 Grading Envelope — Road Base (Table 4:1) — QCS S6 P4 Page 5</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Sieve Size</th><th>% Passing — Road Base</th></tr>
<tr><td>75.0 mm</td><td>100</td></tr>
<tr><td>37.5 mm</td><td>95 – 100</td></tr>
<tr><td>9.5 mm</td><td>50 – 75</td></tr>
<tr><td>4.75 mm</td><td>30 – 60</td></tr>
<tr><td>2.36 mm</td><td>20 – 45</td></tr>
<tr><td>0.425 mm</td><td>10 – 25</td></tr>
<tr><td>0.075 mm</td><td><strong>5 – 12</strong></td></tr>
</table></div>
<h3>🔴 Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>Material Approval (MAR): Table 4:2 + 4:3 كاملة معتمدة</td><td>Lab Reports + MAR Form</td></tr>
<tr><td>HP-02</td><td>Subbase HP-04 معتمد</td><td>Subbase Completion Certificate</td></tr>
<tr><td>HP-03</td><td>Compaction ≥ 98% MDD + CBR ≥ 80% معتمدان</td><td>Sand Cone + CBR Lab Reports</td></tr>
<tr><td>HP-04</td><td>Level Survey ± 8mm معتمد قبل Prime Coat</td><td>As-Built Survey Report</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Road Base Course — Execution & Testing</span>
<button onclick="document.getElementById('vid-base-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-base-en" accept="video/*" style="display:none" data-player="vid-player-base-en" data-ph="vid-ph-base-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-base-en" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — Video saved for entire session</div>
<div id="vid-player-base-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<h3>Table 4:2 — Coarse Aggregate — Road Base — QCS S6 P4 Page 6</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Property</th><th>Road Base Limit</th><th>Test</th><th>Frequency</th></tr>
<tr><td>LA Abrasion</td><td>≤ 30%</td><td>ASTM C131</td><td>1/1000m³</td></tr>
<tr><td>Flakiness Index</td><td>≤ 30%</td><td>BS 812 P105</td><td>1/500m³</td></tr>
<tr><td>Fractured Faces (1+)</td><td>≥ 75%</td><td>ASTM D5821</td><td>1/500m³</td></tr>
<tr><td>Fractured Faces (2+)</td><td>≥ 50%</td><td>ASTM D5821</td><td>1/500m³</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td><td>ASTM C127</td><td>1/500m³</td></tr>
<tr><td>Soundness MgSO₄</td><td>≤ 12%</td><td>ASTM C88</td><td>1/1000m³</td></tr>
<tr><td>Specific Gravity SSD</td><td>≥ 2.5</td><td>ASTM C127</td><td>per source</td></tr>
<tr><td>SO₃</td><td>≤ 0.5%</td><td>BS 1377-3</td><td>1/1000m³</td></tr>
<tr><td>Chloride</td><td>≤ 0.6%</td><td>BS 1377-3</td><td>1/1000m³</td></tr>
</table></div><h3>Table 4:3 — Combined Road Base — QCS S6 P4 Page 7</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Property</th><th>Road Base Limit</th><th>Test</th><th>Frequency</th></tr>
<tr><td>CBR (Soaked 4d)</td><td>≥ <strong>80%</strong></td><td>ASTM D1883</td><td>1/2000m²</td></tr>
<tr><td>Plasticity Index</td><td>≤ 4%</td><td>ASTM D4318</td><td>1/500m³</td></tr>
<tr><td>Sand Equivalent</td><td>≥ 35%</td><td>ASTM D2419</td><td>1/500m³</td></tr>
<tr><td>Compaction MDD</td><td>≥ 98%</td><td>ASTM D1556</td><td>1/500m²</td></tr>
<tr><td>Layer Thickness</td><td>150–250mm</td><td>Physical</td><td>100%</td></tr>
<tr><td>Level Tolerance</td><td>± 8mm</td><td>Total Station</td><td>Every 25m</td></tr>
</table></div>
</div>
` },
  prime: { title: '🛢️ Prime Coat', content: `

<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Prime Coat — التنفيذ والاختبارات</span>
<button onclick="document.getElementById('vid-prime-new').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-prime-new" accept="video/*" style="display:none" data-player="vid-prime-new-p" data-ph="vid-prime-new-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-prime-new-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-prime-new-p" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<h3>📐 تعريف Prime Coat — QCS S6 P5 Cl. 5.3</h3>
<p>Prime Coat هو رش البيتومين المخفف على سطح الـ Road Base المدموك قبل فرش طبقة الإسفلت الأولى. وظيفته: ربط حبيبات سطح الـ Base Course، منع الغبار، وتوفير التصاق بين الطبقة الحبيبية وطبقة الإسفلت. يُنفَّذ بمادة MC-30 أو MC-70 (Medium Curing Cutback Bitumen). يُمنع فرش الإسفلت بدون Prime Coat معتمد.</p>

<h3>⚠️ شروط عدم القبول — QCS S6 P5</h3>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
<strong>يُرفض Prime Coat في الحالات التالية:</strong><br>
• الرش على سطح Base مبلل أو به مياه راكدة<br>
• الرش على سطح Base غير معتمد (لم يُقبل HP)<br>
• درجة حرارة السطح &lt; 10°C أو أثناء المطر<br>
• معدل الرش أقل من 0.8 L/m² أو أكثر من 1.2 L/m²<br>
• عدم اختراق البيتومين للسطح بعمق ≥ 5mm<br>
• عدم السماح بفترة Curing كافية (24–48 ساعة)<br>
• وجود بقع برك (Pooling) أو مناطق جافة (Bare Spots)<br>
• استخدام مواد منتهية الصلاحية أو غير مطابقة
</div>

<h3>📐 مواصفات المادة — MC-30 / MC-70</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th style="min-width:180px;">Property</th><th>MC-30</th><th>MC-70</th><th>Test Method</th></tr>
<tr><td><strong>Kinematic Viscosity @ 60°C</strong></td><td>30–60 cSt</td><td>70–140 cSt</td><td>ASTM D2170</td></tr>
<tr><td><strong>Flash Point (Tag Open Cup)</strong></td><td>≥ 27°C</td><td>≥ 38°C</td><td>ASTM D3143</td></tr>
<tr><td><strong>Distillation — to 360°C</strong></td><td>≥ 50%</td><td>≥ 55%</td><td>ASTM D402</td></tr>
<tr><td><strong>Residue from Distillation</strong></td><td>≥ 50%</td><td>≥ 55%</td><td>ASTM D402</td></tr>
<tr><td><strong>Penetration of Residue @ 25°C</strong></td><td>120–300</td><td>120–300</td><td>ASTM D5</td></tr>
<tr><td><strong>Water Content</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 0.2%</td><td style="color:#2ecc71;font-weight:700;">≤ 0.2%</td><td>ASTM D95</td></tr>
</table></div>

<h3>📐 معدلات الرش والتطبيق — QCS S6 P5</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>ملاحظة</th></tr>
<tr><td><strong>Application Rate</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">0.8 – 1.2 L/m²</td><td>يُحدد من Trial Section</td></tr>
<tr><td><strong>Spray Temperature</strong></td><td><strong>MC-30:</strong> 35–60°C<br><strong>MC-70:</strong> 50–80°C</td><td>حسب Viscosity-Temperature Chart</td></tr>
<tr><td><strong>Penetration Depth</strong></td><td style="color:#2ecc71;font-weight:700;">≥ 5mm into Base surface</td><td>Visual + Core check</td></tr>
<tr><td><strong>Curing Time</strong></td><td><strong>24 – 48 hours minimum</strong></td><td>حتى يجف السطح ولا يلتصق</td></tr>
<tr><td><strong>Surface Condition</strong></td><td>جاف + نظيف + خالي من الغبار</td><td>كنس + نفخ بالهواء قبل الرش</td></tr>
<tr><td><strong>Weather</strong></td><td>لا مطر + سطح &gt; 10°C + رياح &lt; 30 km/h</td><td>توقف في حالة المطر فوراً</td></tr>
</table></div>

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin:12px 0;font-size:12px;">
<strong>🔵 ملاحظات جوهرية:</strong><br>
• <strong>Trial Section</strong> إلزامي لتحديد معدل الرش المناسب قبل العمل الفعلي<br>
• يُمنع حركة المعدات على Prime Coat قبل الجفاف التام<br>
• أي مناطق pooling تُزال بالرمل ويُعاد الرش<br>
• Bare spots يُعاد رشها يدوياً بنفس المعدل<br>
• الأمطار خلال 24 ساعة من الرش = إعادة العمل
</div>

<h3>🔴 Hold Points</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>Road Base معتمد ومقبول</td><td>Base Approval Certificate</td></tr>
<tr><td>HP-02</td><td>اعتماد مادة Prime Coat (MC-30/70)</td><td>Material Certificate + Lab Test</td></tr>
<tr><td>HP-03</td><td>Trial Section معتمد (rate + penetration)</td><td>Trial Section Report</td></tr>
<tr><td>HP-04</td><td>Curing مكتمل (24-48 hr) + سطح جاف</td><td>Visual Inspection + Photo Record</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🛢️ Prime Coat & Tack Coat — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Prime Coat</th><th>Tack Coat</th></tr>
<tr><td>Material</td><td>MC-30 or CSS-1 Emulsion</td><td>CSS-1h or K1-70</td></tr>
<tr><td>Application Rate</td><td>0.5–1.5 L/m²</td><td>0.2–0.4 L/m²</td></tr>
<tr><td>Curing Time</td><td>Min 24hr before asphalt</td><td>Apply before paving</td></tr>
<tr><td>Surface Condition</td><td>Dry, clean, graded</td><td>Existing asphalt</td></tr>
<tr><td>Reference</td><td>QCS S8 P3</td><td>QCS S8 P3</td></tr>
</table>
<div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Prime coat fully absorbed before paving = no shiny surface. Rejected if puddles or uncured areas visible. Engineer to approve before paving.
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Binder Course (AC20 Dense Graded)
</div>
<h3>🛣️ Binder Course — Key Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Material</td><td>AC20 Dense Graded Bituminous Mix</td><td>QCS S8 P4</td></tr>
<tr><td>Delivery Temp</td><td>≥ 140°C (min at plant)</td><td>QCS S8 P5</td></tr>
<tr><td>Laying Temp</td><td>≥ 125°C min at paver</td><td>QCS S8 P5</td></tr>
<tr><td>Core Density</td><td>≥ 97% TMD</td><td>QCS S8 P6</td></tr>
<tr><td>Marshall Stability</td><td>≥ 8.0 kN</td><td>QCS S8 P4</td></tr>
<tr><td>Air Voids</td><td>3–7%</td><td>QCS S8 P4</td></tr>
<tr><td>Thickness Tolerance</td><td>±5mm from design</td><td>QCS S8 P6</td></tr>
<tr><td>Tack Coat Required</td><td>Before laying (0.2–0.4 L/m²)</td><td>QCS S8 P3</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
🔴 HP: Binder course cores must be approved before wearing course laying.
</div>

</div>
` },
  wearing: { title: '🛣️ Wearing Course', content: `

<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Wearing Course — طبقة السطح النهائية</span>
<button onclick="document.getElementById('vid-wc-new').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-wc-new" accept="video/*" style="display:none" data-player="vid-wc-new-p" data-ph="vid-wc-new-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-wc-new-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV</div>
<div id="vid-wc-new-p" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<h3>📐 تعريف Wearing Course — QCS S6 P5</h3>
<p>Wearing Course هي الطبقة السطحية النهائية من الرصيف الإسفلتي — الطبقة التي تتعامل مباشرة مع الإطارات والأحمال المرورية والعوامل الجوية. تتطلب أعلى جودة ركام (PSV ≥ 55) ومقاومة تآكل عالية. تُستخدم خلطة HMA بتدرج WC-A أو WC-B. السماكة المعتادة 40mm–50mm. البيتومين PMB (Polymer Modified) إلزامي في الطرق الرئيسية.</p>

<h3>⚠️ المواد غير المقبولة</h3>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
<strong>يُرفض في Wearing Course:</strong><br>
• ركام PSV &lt; 55 — يسبب انزلاق الإطارات (Safety Critical)<br>
• ركام LA Abrasion &gt; 25%<br>
• Soundness (MgSO₄) &gt; 12%<br>
• Flakiness &gt; 20%<br>
• Water Absorption &gt; 1.5%<br>
• Chloride في الركام &gt; 0.04%<br>
• بيتومين 60/70 بدون PMB في طرق T4+ (Expressways)<br>
• Marshall Stability &lt; 10 kN (PMB) أو &lt; 8 kN (Non-PMB)<br>
• حمولة وصلت بدرجة &lt; 145°C (PMB) أو &lt; 135°C (Non-PMB)<br>
• IRI &gt; 2.0 m/km بعد الفرش
</div>

<h3>📐 تدرج Wearing Course — QCS S6 P5 Table 5:8</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Sieve</th><th>WC-A (19mm)</th><th>WC-B (12.5mm)</th></tr>
<tr><td>19.0 mm</td><td>100</td><td>—</td></tr>
<tr><td>12.5 mm</td><td>80 – 100</td><td>100</td></tr>
<tr><td>9.5 mm</td><td>60 – 82</td><td>90 – 100</td></tr>
<tr><td>4.75 mm</td><td>40 – 62</td><td>44 – 74</td></tr>
<tr><td>2.36 mm</td><td>25 – 45</td><td>28 – 58</td></tr>
<tr><td>0.3 mm</td><td>7 – 20</td><td>5 – 21</td></tr>
<tr><td>0.075 mm</td><td style="color:#e74c3c;font-weight:700;">3 – 8</td><td style="color:#e74c3c;font-weight:700;">2 – 10</td></tr>
</table></div>

<h3>📐 ركام Wearing Course — متطلبات خاصة</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Wearing Course</th><th>Test</th></tr>
<tr><td><strong>PSV (Polished Stone Value)</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 55</td><td>BS 812-114</td></tr>
<tr><td><strong>AAV (Aggregate Abrasion)</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 12</td><td>BS 812-113</td></tr>
<tr><td><strong>LA Abrasion</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 25%</td><td>ASTM C131</td></tr>
<tr><td><strong>Flakiness</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 20%</td><td>BS 812-105</td></tr>
<tr><td><strong>Soundness (MgSO₄)</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 12%</td><td>ASTM C88</td></tr>
<tr><td><strong>Water Absorption</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 1.5%</td><td>BS 812-2</td></tr>
<tr><td><strong>Chloride</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 0.04%</td><td>BS 1377-3</td></tr>
</table></div>

<h3>📐 Marshall Properties — Wearing Course</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>60/70 Pen</th><th>PMB</th><th>Test</th></tr>
<tr><td><strong>Stability</strong></td><td style="color:#2ecc71;font-weight:700;">≥ 8 kN</td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 10 kN</td><td>ASTM D6927</td></tr>
<tr><td><strong>Flow</strong></td><td>2 – 4 mm</td><td>2 – 4.5 mm</td><td>ASTM D6927</td></tr>
<tr><td><strong>Air Voids</strong></td><td style="color:#2ecc71;font-weight:700;">3 – 5%</td><td style="color:#2ecc71;font-weight:700;">3 – 5%</td><td>ASTM D3203</td></tr>
<tr><td><strong>VMA</strong></td><td>≥ 14% (WC-A)<br>≥ 15% (WC-B)</td><td>≥ 14%</td><td>Calc</td></tr>
<tr><td><strong>VFB</strong></td><td>65 – 75%</td><td>65 – 78%</td><td>Calc</td></tr>
<tr><td><strong>Retained Stability</strong></td><td style="color:#2ecc71;font-weight:700;">≥ 80%</td><td style="color:#2ecc71;font-weight:700;">≥ 85%</td><td>AASHTO T283</td></tr>
</table></div>

<h3>📐 Smoothness — IRI & Straightedge</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Expressway</th><th>Urban Road</th><th>Reference</th></tr>
<tr><td><strong>IRI (International Roughness Index)</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 0.9 m/km</td><td style="color:#2ecc71;font-weight:700;">≤ 1.5 m/km</td><td>PWA IAN 013</td></tr>
<tr style="background:rgba(46,204,113,0.08);"><td><strong>🆕 IRI New Road — QCS 2024 S6</strong></td><td colspan="2" style="color:#2ecc71;font-weight:700;">≤ 2.0 m/km — شرط الاستلام النهائي</td><td>QCS 2024 S6</td></tr>
<tr><td><strong>3m Straightedge</strong></td><td>≤ 3mm</td><td>≤ 5mm</td><td>QCS S6 P5</td></tr>
</table></div>

<h3>📐 الدمك الميداني</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>Test</th><th>Frequency</th></tr>
<tr style="background:rgba(46,204,113,0.1);"><td><strong>Field Compaction</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 97% TMD</td><td>Core — ASTM D2726</td><td>1 core per 500m lane</td></tr>
<tr><td><strong>Thickness</strong></td><td>Design ± 5mm (40–50mm)</td><td>Core</td><td>1 per 500m lane</td></tr>
<tr><td><strong>Delivery Temp</strong></td><td>≥ 135°C / ≥ 145°C (PMB)</td><td>IR Thermo</td><td>Every truck</td></tr>
<tr><td><strong>Permeability</strong></td><td style="font-weight:700;">No ponding after 24hr rain</td><td>Visual</td><td>Post-rain check</td></tr>
</table></div>

<h3>🔴 Hold Points</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>Mix Design (Marshall/Superpave) + PSV ≥ 55 معتمد</td><td>Lab Report + PSV Certificate</td></tr>
<tr><td>HP-02</td><td>Trial Section ≥ 200m معتمد</td><td>Trial Report + Cores + IRI</td></tr>
<tr><td>HP-03</td><td>Tack Coat SS-1h معتمد (0.20–0.50 L/m²)</td><td>Tack Coat Approval</td></tr>
<tr><td>HP-04</td><td>Cores ≥ 97% TMD + Thickness</td><td>Core Reports</td></tr>
<tr><td>HP-05</td><td>IRI Final ≤ 0.9/1.5/2.0 m/km</td><td>IRI Survey Report</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Wearing Course (AC14) — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Conventional</th><th>PMB</th><th>Ref</th></tr>
<tr><td>Mix Type</td><td>AC14 Dense</td><td>AC14 PMB</td><td>QCS S8 P4</td></tr>
<tr><td>Delivery Temp</td><td>≥145°C</td><td>≥155°C</td><td>QCS S8 P5</td></tr>
<tr><td>Lay Temp</td><td>≥135°C</td><td>≥145°C</td><td>QCS S8 P5</td></tr>
<tr><td>Core Density</td><td>≥97% TMD</td><td>≥98% TMD</td><td>QCS S8 P6</td></tr>
<tr><td>Marshall Stability</td><td>≥8.0 kN</td><td>≥10.0 kN</td><td>QCS S8 P4</td></tr>
<tr><td>Air Voids</td><td>3–5%</td><td>3–4%</td><td>QCS S8 P4</td></tr>
<tr><td>IRI Smoothness</td><td>≤2.5 m/km</td><td>≤0.9 m/km</td><td>QCS S8 P7</td></tr>
<tr><td>Thickness Tolerance</td><td>±5mm</td><td>±5mm</td><td>QCS S8 P6</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP1: Trial section approval required. HP2: Core density results within 48hr. HP3: IRI survey before opening to traffic.
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Road Finishing & Reinstatement
</div>
<h3>🏁 Road Finishing — Key Requirements</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Road Markings</td><td>Thermoplastic ≥ 3mm | Retroreflectivity ≥ 100 mcd/m²/lux</td><td>QCS S6 P8</td></tr>
<tr><td>Kerb Setting</td><td>Level ±3mm | Alignment ±5mm per 3m</td><td>QCS S6 P7</td></tr>
<tr><td>Drainage Gullies</td><td>Level within ±5mm of carriageway</td><td>QCS S6 P7</td></tr>
<tr><td>Manhole Covers</td><td>Level ±5mm | D400 load rating</td><td>QCS S8 P9</td></tr>
<tr><td>IRI Final</td><td>≤ 2.5 m/km conventional / ≤ 0.9 PMB</td><td>QCS S8 P7</td></tr>
<tr><td>Cleanliness</td><td>All debris removed before handover</td><td>QCS S6</td></tr>
</table>
<div style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
✅ Final inspection checklist must be completed and signed by QC Engineer before opening to traffic.
</div>

</div>
` },
  handover: { title: '✅ التسليم النهائي', content: `

<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 التسليم — Final Handover</span>
<button onclick="document.getElementById('vid-handover-new').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-handover-new" accept="video/*" style="display:none" data-player="vid-handover-new-p" data-ph="vid-handover-new-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-handover-new-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV</div>
<div id="vid-handover-new-p" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<h3>📐 تعريف مرحلة التسليم — Ashghal Requirements</h3>
<p>مرحلة التسليم النهائي هي آخر مرحلة في مشروع الطريق — يتم فيها تجميع كل الوثائق، إجراء الفحوصات النهائية، وتسليم الطريق رسمياً لـ Ashghal. تشمل: Final IRI Survey, As-Built Drawings, O&M Manuals, Defects Liability Period (DLP), و Punch List Resolution. فترة ضمان العيوب عادة 12 شهراً.</p>

<h3>📐 متطلبات التسليم — Checklist</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th style="min-width:50px;">SN</th><th>المتطلب</th><th>التفصيل</th><th>الحالة</th></tr>
<tr><td>1</td><td><strong>Final IRI Survey</strong></td><td>IRI ≤ 2.0 m/km (new roads) — full road length</td><td>Mandatory</td></tr>
<tr><td>2</td><td><strong>As-Built Drawings</strong></td><td>AutoCAD + PDF — all layers, manholes, utilities</td><td>Mandatory</td></tr>
<tr><td>3</td><td><strong>Material Test Records</strong></td><td>All lab reports: Subgrade → WC — organized by chainage</td><td>Mandatory</td></tr>
<tr><td>4</td><td><strong>ITP Sign-off Sheets</strong></td><td>All Hold Points signed by Contractor + SC + Engineer</td><td>Mandatory</td></tr>
<tr><td>5</td><td><strong>NCR Closeout</strong></td><td>All NCRs closed with evidence — zero open NCRs</td><td>Mandatory</td></tr>
<tr><td>6</td><td><strong>Punch List Resolution</strong></td><td>All snag items resolved + re-inspected</td><td>Mandatory</td></tr>
<tr><td>7</td><td><strong>O&M Manual</strong></td><td>Operation & Maintenance manual — lighting, drainage, signs</td><td>Mandatory</td></tr>
<tr><td>8</td><td><strong>Health & Safety File</strong></td><td>CDM file + accident records + safety certificates</td><td>Mandatory</td></tr>
<tr><td>9</td><td><strong>Utility Clearances</strong></td><td>KAHRAMAA, Ooredoo, Vodafone — NOC letters</td><td>Mandatory</td></tr>
<tr><td>10</td><td><strong>Survey Benchmarks</strong></td><td>Permanent benchmarks installed + coordinates recorded</td><td>Mandatory</td></tr>
<tr><td>11</td><td><strong>DLP Certificate</strong></td><td>Defects Liability Period start date + duration (12 months)</td><td>Mandatory</td></tr>
<tr><td>12</td><td><strong>Final Completion Certificate</strong></td><td>Signed by Engineer + Ashghal — triggers DLP</td><td>Mandatory</td></tr>
</table></div>

<h3>📐 فحوصات التسليم النهائي</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Test</th><th>Acceptance</th><th>Method</th></tr>
<tr><td><strong>IRI Final Survey</strong></td><td style="color:#2ecc71;font-weight:700;">≤ 2.0 m/km (QCS 2024)</td><td>Laser Profiler</td></tr>
<tr><td><strong>Deflection (FWD)</strong></td><td>Per design structural capacity</td><td>Falling Weight Deflectometer</td></tr>
<tr><td><strong>Marking Retroreflectivity</strong></td><td>≥ 100 mcd/m²/lux</td><td>ASTM E1710</td></tr>
<tr><td><strong>Drainage Test</strong></td><td>No ponding &gt; 10mm after 1hr rain</td><td>Visual / CCTV</td></tr>
<tr><td><strong>Lighting Levels</strong></td><td>Per MMUP road classification</td><td>Lux Meter Survey</td></tr>
<tr><td><strong>Sign Visibility</strong></td><td>Readable at design distance — night + day</td><td>Drive-through test</td></tr>
</table></div>

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin:12px 0;font-size:12px;">
<strong>🔵 ملاحظات جوهرية:</strong><br>
• <strong>DLP (Defects Liability Period)</strong> عادة 12 شهر — أي عيوب خلالها على المقاول<br>
• لا يُصدر Final Completion Certificate إلا بعد إغلاق 100% من الـ Punch List<br>
• As-Built Drawings لازم تعكس الواقع الفعلي — مش التصميم<br>
• Ashghal تطلب نسخة رقمية + نسخة ورقية من كل الوثائق
</div>

<h3>🔴 Hold Points</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>Final IRI ≤ 2.0 m/km مكتمل</td><td>IRI Survey Report</td></tr>
<tr><td>HP-02</td><td>Punch List 100% resolved</td><td>Punch List Closeout Sheet</td></tr>
<tr><td>HP-03</td><td>All NCRs closed</td><td>NCR Register — all closed</td></tr>
<tr><td>HP-04</td><td>As-Built approved by Engineer</td><td>Signed As-Built Drawings</td></tr>
<tr><td>HP-05</td><td>Final Completion Certificate issued</td><td>Signed Certificate</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>📋 Project Handover — QCS 2024</h3>
<table class="dm-table">
<tr><th>Document</th><th>Required By</th><th>Responsibility</th></tr>
<tr><td>As-Built Drawings</td><td>All disciplines</td><td>Contractor</td></tr>
<tr><td>Test Certificates</td><td>All materials + tests</td><td>QC Team</td></tr>
<tr><td>ITP Closeout</td><td>All ITPs signed off</td><td>QC + Engineer</td></tr>
<tr><td>NCR Closeout</td><td>All NCRs resolved</td><td>Contractor</td></tr>
<tr><td>CCTV Reports</td><td>All drainage lines</td><td>QC Team</td></tr>
<tr><td>Pressure Test Reports</td><td>All pressure pipelines</td><td>QC Team</td></tr>
<tr><td>O&M Manuals</td><td>All installed equipment</td><td>Contractor</td></tr>
<tr><td>Warranties</td><td>Materials + workmanship</td><td>Contractor</td></tr>
<tr><td>Snag List Closure</td><td>All defects rectified</td><td>Contractor</td></tr>
</table>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ DLP (Defects Liability Period): 12 months from PCC. Employer must inspect at month 10 and issue defects list.
</div>
</div></div></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>📋 Road ITPs — Inspection & Test Plans</h3>
<p>Select a specific road layer ITP:</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
<div onclick="QS.openDetail('itp_subgrade')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="color:var(--gold);font-weight:700;">Subgrade ITP</div></div>
<div onclick="QS.openDetail('itp_subbase')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="color:var(--gold);font-weight:700;">Subbase ITP</div></div>
<div onclick="QS.openDetail('itp_base')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="color:var(--gold);font-weight:700;">Base Course ITP</div></div>
<div onclick="QS.openDetail('itp_wearing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="color:var(--gold);font-weight:700;">Asphalt ITP</div></div>
</div>
</div>
` },
  utilities: { title: '🔧 المرافق — شبكات المياه والصرف', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Utilities Networks
</div>
<h3>🔧 اختر الشبكة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('water_supply_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">💧</div><div style="color:var(--gold);font-weight:700;font-size:14px;">مياه الشرب</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Pressure 1.5x | Chlorination 50ppm</div></div>
<div onclick="QS.openDetail('sewer_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🚽</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Foul Sewer</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Air Test | CCTV 100%</div></div>
<div onclick="QS.openDetail('storm_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🌊</div><div style="color:var(--gold);font-weight:700;font-size:14px;">الصرف السطحي</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Gullies | Silt Trap</div></div>
<div onclick="QS.openDetail('treated_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">♻️</div><div style="color:var(--gold);font-weight:700;font-size:14px;">المياه المعالجة</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">بنفسجي | Cross Connection</div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px;">
<div onclick="QS.openDetail('utilities_materials')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:13px;">مواد المرافق</div></div>
<div onclick="QS.openDetail('utilities_qcp')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📊</div><div style="color:var(--gold);font-weight:700;font-size:13px;">خطة الجودة QCP</div></div>
<div onclick="QS.openDetail('pipe_bedding')" style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📐</div><div style="color:#2ecc71;font-weight:700;font-size:13px;">أنواع فرش المواسير</div><div style="color:var(--text3);font-size:11px;">Class S, A, B, D — Bedding Types</div></div>
<div onclick="QS.openDetail('ms_utilities')" style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📝</div><div style="color:#3498db;font-weight:700;font-size:13px;">Method Statement</div><div style="color:var(--text3);font-size:11px;">Utilities Works</div></div>
</div>
<h3>⚠️ قواعد الفصل الإلزامية</h3>
<table class="dm-table">
<tr><th>الشبكتان</th><th>الفصل الأفقي</th><th>الوضع الرأسي</th></tr>
<tr><td>مياه الشرب / صرف صحي</td><td>≥ 1.0m</td><td>مياه الشرب فوق دائماً</td></tr>
<tr><td>Water Supply / Treated</td><td>≥ 1.0m</td><td>مياه الشرب فوق دائماً</td></tr>
<tr><td>صرف صحي / سطحي</td><td>≥ 0.5m</td><td>لا اتصال بينهما أبداً</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Utilities Networks
</div>
<h3>🔧 Select Network</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('water_supply_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">💧</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Water Supply</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Pressure 1.5× | Chlorination 50ppm</div></div>
<div onclick="QS.openDetail('sewer_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Foul Sewer</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Air Test 100mm | CCTV 100%</div></div>
<div onclick="QS.openDetail('storm_drainage_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🌧️</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Storm Drainage</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Hydraulic Test | CCTV Survey</div></div>
<div onclick="QS.openDetail('treated_water_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">♻️</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Treated Water</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Pressure + Cross-connection</div></div>
</div>
<table class="dm-table" style="margin-top:16px;">
<tr><th>Network</th><th>Key Test</th><th>Standard</th><th>Acceptance</th></tr>
<tr><td>💧 Water Supply</td><td>Pressure 1.5×PN / 2hr</td><td>KAHRAMAA</td><td>Zero drop</td></tr>
<tr><td>🔩 Foul Sewer</td><td>Air Test 100mm Hg / 5min</td><td>Ashghal</td><td>Drop ≤ 25mm</td></tr>
<tr><td>🌧️ Storm Water</td><td>Hydraulic / CCTV 100%</td><td>Ashghal</td><td>Grade ≤ B2</td></tr>
<tr><td>♻️ Treated Water</td><td>Pressure + Cross-connection</td><td>MME</td><td>Zero leakage</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
⚠️ <strong>Mandatory Separation:</strong> Water ≥ 1.0m horizontal from foul sewer. Water ALWAYS above sewer (min 300mm vertical).
</div>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
🎨 <strong>Marker Tape Colours:</strong> 🟡 Yellow = Water | 🟢 Green = Foul Sewer | 🔵 Blue = Storm | 🟣 Purple = Treated
</div>
</div>
` },
  water_supply_stages: { title: '💧 شبكة مياه الشرب', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 شبكة مياه الشرب — نظرة عامة</span>
<button onclick="document.getElementById('vid-water-supply-stages').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-water-supply-stages" accept="video/*" style="display:none" data-player="vid-player-water-supply-stages" data-ph="vid-ph-water-supply-stages" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-water-supply-stages" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-water-supply-stages" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | KAHRAMAA Standards | Water Supply Network
</div>
<h3>🗺️ مراحل تنفيذ شبكة مياه الشرب — الترتيب الإلزامي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ws_survey')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">الدراسة والمسح</div><div style="color:var(--text3);font-size:10px;">As-Built + GIS + Route Survey</div></div><div onclick="QS.openDetail('ws_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">المواد والمواسير</div><div style="color:var(--text3);font-size:10px;">HDPE PE100 / DI / GRP — KAHRAMAA</div></div><div onclick="QS.openDetail('ws_excavation')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">الحفر والبيدنج</div><div style="color:var(--text3);font-size:10px;">Trench + Bedding Class B</div></div><div onclick="QS.openDetail('ws_laying')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">وضع المواسير</div><div style="color:var(--text3);font-size:10px;">Pipe Laying + Jointing</div></div><div onclick="QS.openDetail('ws_testing')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">اختبار الضغط</div><div style="color:var(--text3);font-size:10px;">Hydrostatic 1.5×PN / 2hr</div></div><div onclick="QS.openDetail('ws_disinfection')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">التعقيم والتطهير</div><div style="color:var(--text3);font-size:10px;">Chlorination ≥50ppm / 24hr</div></div><div onclick="QS.openDetail('ws_backfill')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">الردم والدمك</div><div style="color:var(--text3);font-size:10px;">Backfill ≥95% MDD</div></div><div onclick="QS.openDetail('ws_handover')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">التسليم</div><div style="color:var(--text3);font-size:10px;">As-Built + Commissioning</div></div></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Water Supply Network — Overview</span>
<button onclick="document.getElementById('vid-water-supply-stages-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-water-supply-stages-en" accept="video/*" style="display:none" data-player="vid-player-water-supply-stages-en" data-ph="vid-ph-water-supply-stages-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-water-supply-stages-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-water-supply-stages-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | KAHRAMAA Standards | Water Supply Network
</div>
<h3>Water Supply Execution Phases — Mandatory Sequence</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ws_survey')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Survey & Design</div><div style="color:var(--text3);font-size:10px;">As-Built + GIS + Route Survey</div></div><div onclick="QS.openDetail('ws_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Materials</div><div style="color:var(--text3);font-size:10px;">HDPE PE100 / DI / GRP — KAHRAMAA</div></div><div onclick="QS.openDetail('ws_excavation')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Excavation & Bedding</div><div style="color:var(--text3);font-size:10px;">Trench + Bedding Class B</div></div><div onclick="QS.openDetail('ws_laying')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Pipe Laying</div><div style="color:var(--text3);font-size:10px;">Pipe Laying + Jointing</div></div><div onclick="QS.openDetail('ws_testing')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Pressure Testing</div><div style="color:var(--text3);font-size:10px;">Hydrostatic 1.5×PN / 2hr</div></div><div onclick="QS.openDetail('ws_disinfection')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Chlorination</div><div style="color:var(--text3);font-size:10px;">≥50ppm / 24hr</div></div><div onclick="QS.openDetail('ws_backfill')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Backfill & Compaction</div><div style="color:var(--text3);font-size:10px;">≥95% MDD</div></div><div onclick="QS.openDetail('ws_handover')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Handover</div><div style="color:var(--text3);font-size:10px;">As-Built + Commissioning</div></div></div>
</div>
` },
  sewer_stages: { title: '🚽 شبكة Foul Sewer', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 شبكة Foul Sewer — نظرة عامة</span>
<button onclick="document.getElementById('vid-sewer-stages').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sewer-stages" accept="video/*" style="display:none" data-player="vid-player-sewer-stages" data-ph="vid-ph-sewer-stages" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sewer-stages" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-sewer-stages" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | Ashghal Standards | Foul Sewer Network
</div>
<h3>🗺️ مراحل تنفيذ شبكة الصرف الصحي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ss_survey')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الدراسة والمسح</div><div style="color:var(--text3);font-size:10px;">Survey + Route + Profile</div></div><div onclick="QS.openDetail('ss_materials')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">المواد والمواسير</div><div style="color:var(--text3);font-size:10px;">uPVC / GRP / Concrete</div></div><div onclick="QS.openDetail('ss_excavation')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الحفر والبيدنج</div><div style="color:var(--text3);font-size:10px;">Trench + Dewatering + Bedding</div></div><div onclick="QS.openDetail('ss_laying')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">وضع المواسير</div><div style="color:var(--text3);font-size:10px;">Pipe Laying + Gradient Control</div></div><div onclick="QS.openDetail('ss_manholes')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Manholes</div><div style="color:var(--text3);font-size:10px;">Manhole Construction + Benching</div></div><div onclick="QS.openDetail('ss_testing')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الاختبارات</div><div style="color:var(--text3);font-size:10px;">Air Test + CCTV Survey</div></div><div onclick="QS.openDetail('ss_backfill')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الردم</div><div style="color:var(--text3);font-size:10px;">Backfill ≥95% MDD</div></div><div onclick="QS.openDetail('ss_handover')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">التسليم</div><div style="color:var(--text3);font-size:10px;">CCTV Final + As-Built</div></div></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Foul Sewer Network — Overview</span>
<button onclick="document.getElementById('vid-sewer-stages-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sewer-stages-en" accept="video/*" style="display:none" data-player="vid-player-sewer-stages-en" data-ph="vid-ph-sewer-stages-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sewer-stages-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-sewer-stages-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Foul Sewer Execution Phases</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ss_survey')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Survey & Design</div><div style="color:var(--text3);font-size:10px;">Route + Profile + GIS</div></div><div onclick="QS.openDetail('ss_materials')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Materials</div><div style="color:var(--text3);font-size:10px;">uPVC / GRP / Concrete pipes</div></div><div onclick="QS.openDetail('ss_excavation')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Excavation & Bedding</div><div style="color:var(--text3);font-size:10px;">Trench + Dewatering + Bedding</div></div><div onclick="QS.openDetail('ss_laying')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Pipe Laying</div><div style="color:var(--text3);font-size:10px;">Pipe + Gradient + Joints</div></div><div onclick="QS.openDetail('ss_manholes')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Manholes</div><div style="color:var(--text3);font-size:10px;">Construction + Benching + Cover</div></div><div onclick="QS.openDetail('ss_testing')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Testing</div><div style="color:var(--text3);font-size:10px;">Air Test + CCTV</div></div><div onclick="QS.openDetail('ss_backfill')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Backfill</div><div style="color:var(--text3);font-size:10px;">≥95% MDD compaction</div></div><div onclick="QS.openDetail('ss_handover')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Handover</div><div style="color:var(--text3);font-size:10px;">CCTV + As-Built</div></div></div>
</div>
` },
  storm_stages: { title: '🌧️ شبكة الصرف السطحي', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 شبكة الصرف السطحي — نظرة عامة</span>
<button onclick="document.getElementById('vid-storm-stages').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-storm-stages" accept="video/*" style="display:none" data-player="vid-player-storm-stages" data-ph="vid-ph-storm-stages" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-storm-stages" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-storm-stages" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | Ashghal | Storm Water Drainage Network
</div>
<h3>🗺️ مراحل تنفيذ شبكة الصرف السطحي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('sw_survey')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الدراسة والتصميم</div><div style="color:var(--text3);font-size:10px;">Catchment Area + IDF Curve</div></div><div onclick="QS.openDetail('sw_materials')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">المواد</div><div style="color:var(--text3);font-size:10px;">RC Pipes / Culverts / Channels</div></div><div onclick="QS.openDetail('sw_excavation')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الحفر والتحضير</div><div style="color:var(--text3);font-size:10px;">Trench + Grading</div></div><div onclick="QS.openDetail('sw_laying')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">وضع المواسير والكيوفيرتات</div><div style="color:var(--text3);font-size:10px;">Pipes + Box Culverts</div></div><div onclick="QS.openDetail('sw_gullies')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Gullies والمداخل</div><div style="color:var(--text3);font-size:10px;">Gully + Inlet Installation</div></div><div onclick="QS.openDetail('sw_testing')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الاختبارات</div><div style="color:var(--text3);font-size:10px;">CCTV + Hydraulic Test</div></div><div onclick="QS.openDetail('sw_backfill')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الردم</div><div style="color:var(--text3);font-size:10px;">Backfill + Compaction</div></div><div onclick="QS.openDetail('sw_handover')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">التسليم</div><div style="color:var(--text3);font-size:10px;">Level Survey + As-Built</div></div></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Storm Water Drainage — Overview</span>
<button onclick="document.getElementById('vid-storm-stages-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-storm-stages-en" accept="video/*" style="display:none" data-player="vid-player-storm-stages-en" data-ph="vid-ph-storm-stages-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-storm-stages-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-storm-stages-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Storm Water Execution Phases</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('sw_survey')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Survey & Design</div><div style="color:var(--text3);font-size:10px;">Catchment + IDF Curve</div></div><div onclick="QS.openDetail('sw_materials')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Materials</div><div style="color:var(--text3);font-size:10px;">RC Pipes / Box Culverts</div></div><div onclick="QS.openDetail('sw_excavation')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Excavation</div><div style="color:var(--text3);font-size:10px;">Trench + Grading</div></div><div onclick="QS.openDetail('sw_laying')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Pipe & Culvert Laying</div><div style="color:var(--text3);font-size:10px;">Pipes + Box Culverts</div></div><div onclick="QS.openDetail('sw_gullies')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Gullies & Inlets</div><div style="color:var(--text3);font-size:10px;">Gully + Inlet Installation</div></div><div onclick="QS.openDetail('sw_testing')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Testing</div><div style="color:var(--text3);font-size:10px;">CCTV + Hydraulic Test</div></div><div onclick="QS.openDetail('sw_backfill')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Backfill</div><div style="color:var(--text3);font-size:10px;">Compaction ≥95% MDD</div></div><div onclick="QS.openDetail('sw_handover')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Handover</div><div style="color:var(--text3);font-size:10px;">Level Survey + As-Built</div></div></div>
</div>
` },
  treated_stages: { title: '♻️ شبكة المياه المعالجة', content: `
<div class="lang-content-ar">
<div style="margin-top:16px;"><div onclick="QS.openDetail('itp_treated')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP المياه المعالجة الكامل</div></div></div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Treated / Reclaimed Water Network</div>
<h3>⛔ تحذير خطير — اقرأ أولاً</h3>
<p>المياه المعالجة <strong>غير صالحة للشرب</strong>. Cross Connection مع مياه الشرب = <strong>كارثة صحية</strong>. اللون البنفسجي إلزامي بدون استثناء على كل مواسير ومعدات الشبكة.</p>
<h3>📌 اختر المرحلة للتفاصيل الكاملة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('tw_survey')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الدراسة والتصميم</div></div>
<div onclick="QS.openDetail('tw_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">المواسير البنفسجية</div></div>
<div onclick="QS.openDetail('tw_excavation')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⛏️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الحفر والفصل</div></div>
<div onclick="QS.openDetail('tw_laying')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">وضع المواسير</div></div>
<div onclick="QS.openDetail('tw_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="الاختبارات" data-en="Testing">الاختبارات</div></div>
<div onclick="QS.openDetail('tw_handover')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">✅</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="التسليم" data-en="Handover">التسليم</div></div>
</div>
<h3>📐 المواصفات العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr><tr><td>نوع المواسير</td><td>HDPE بنفسجي / uPVC بنفسجي</td><td>ISO 4427</td></tr><tr><td>اللون</td><td>بنفسجي — RAL 4001 إلزامي</td><td>MME Std</td></tr><tr><td>الضغط التصميمي</td><td>6 – 10 bar</td><td>QCS S8</td></tr><tr><td>عمق الدفن</td><td>≥ 0.9m</td><td>QCS S8</td></tr><tr><td>الفصل عن مياه الشرب</td><td>≥ 1.0m أفقياً — إلزامي</td><td>QCS S8</td></tr><tr><td>Marker Tape</td><td>بنفسجي — RECLAIMED WATER</td><td>MME</td></tr><tr><td>Double Check Valve</td><td>عند كل نقطة اتصال</td><td>MME</td></tr><tr><td>Pressure Test</td><td>1.5x / ساعتان / صفر</td><td>QCS S8</td></tr><tr><td>Cross Connection Test</td><td>صفر تلوث في مياه الشرب</td><td>MME</td></tr></table>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Treated/Recycled Water Network — Construction Phases
</div>
<h3>♻️ Treated Water — Select Phase</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('tw_survey')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Survey</div></div>
<div onclick="QS.openDetail('tw_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Materials</div></div>
<div onclick="QS.openDetail('tw_laying')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">⛏️</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Laying</div></div>
<div onclick="QS.openDetail('tw_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">✅</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Testing</div></div>
</div>
<table class="dm-table">
<tr><th>Test</th><th>Acceptance</th><th>Standard</th></tr>
<tr><td>Pressure Test</td><td>1.5×PN / 2hr zero drop</td><td>QCS 2024</td></tr>
<tr><td>Bacteriological</td><td>Zero E. coli / coliforms</td><td>WHO / MME</td></tr>
<tr><td>Purple tape above pipe</td><td>Mandatory — 300mm above crown</td><td>MME</td></tr>
<tr><td>Cross-connection check</td><td>Zero — prohibited by law</td><td>MME</td></tr>
</table>
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },

  ws_survey: { title: '📐 مياه الشرب — الدراسة والتصميم', content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 1 | KAHRAMAA W.S.S. Standards | Pre-Construction</div>

<h3>📐 1. متطلبات ما قبل التنفيذ — Water Supply</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>الجهة المعتمِدة</th><th>التوقيت</th></tr>
<tr><td>مخططات التصميم</td><td>معتمدة من KAHRAMAA — Plan + Profile + Details</td><td>KAHRAMAA</td><td>قبل أي تنفيذ</td></tr>
<tr><td>Hydraulic Analysis</td><td>تحليل الضغط والتدفق — Epanet أو WaterGEMS<br>Min pressure ≥ 15m (1.5 bar) في أي نقطة</td><td>Consultant + KAHRAMAA</td><td>قبل التصميم النهائي</td></tr>
<tr><td>Material Submittal</td><td>اعتماد كل المواسير + Fittings + Valves<br>شهادات المصنع + KAHRAMAA Approved List</td><td>KAHRAMAA</td><td>قبل التوريد</td></tr>
<tr><td>Method Statement</td><td>يشمل: Fusion procedure + Disinfection plan<br>+ Traffic Management + Emergency Shutdown plan</td><td>Consultant + KAHRAMAA</td><td>قبل الحفر</td></tr>
<tr><td>Soil Investigation</td><td>Trial pits كل 100m — تحديد GWT + Sabkha zones</td><td>Consultant</td><td>قبل التصميم</td></tr>
<tr><td>Traffic Management Plan</td><td>معتمدة من MME + MOI + Ashghal</td><td>MME / MOI / Ashghal</td><td>قبل الحفر</td></tr>
<tr><td>Utility Detection (GPR)</td><td>Ground Penetrating Radar Scan — 100% قبل الحفر</td><td>Ashghal NOC</td><td>قبل الحفر</td></tr>
<tr><td>Emergency Isolation Plan</td><td>خطة قطع الطوارئ + مواضع الـ Isolation Valves</td><td>KAHRAMAA</td><td>قبل الحفر</td></tr>
</table></div>

<h3>📐 2. NOC إلزامي قبل الحفر — جدول كامل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الجهة</th><th>سبب NOC</th><th>مدة الحصول المتوقعة</th><th>ملاحظة</th></tr>
<tr><td>KAHRAMAA</td><td>شبكة مياه الشرب + الكهرباء الموجودة</td><td>5–10 أيام عمل</td><td>إلزامي — الأول</td></tr>
<tr><td>Ashghal</td><td>الطرق + الصرف الصحي + البنية التحتية</td><td>5–7 أيام عمل</td><td>إلزامي</td></tr>
<tr><td>Ooredoo / Vodafone</td><td>كابلات الاتصالات</td><td>3–5 أيام عمل</td><td>إلزامي</td></tr>
<tr><td>Qatar Rail (لو قرب مترو)</td><td>حماية الأنفاق والمسافات الآمنة</td><td>10–15 يوم عمل</td><td>شرط خاص إضافي</td></tr>
<tr><td>QP / Woqod (لو قرب غاز)</td><td>خطوط الغاز والنفط المدفونة</td><td>10–15 يوم عمل</td><td>شرط خاص إضافي</td></tr>
<tr><td>MME / MOI</td><td>المرور وإغلاق الطرق</td><td>3–5 أيام عمل</td><td>مع Traffic Plan</td></tr>
</table></div>

<h3>📐 3. متطلبات التصميم الهيدروليكي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المعيار</th><th>القيمة</th><th>المرجع</th></tr>
<tr><td>الضغط الأدنى في الشبكة</td><td>≥ 15m head (1.5 bar) — خلال ساعة الذروة</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>الضغط الأقصى</td><td>≤ 80m head (8.0 bar) — حماية المواسير</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>سرعة التدفق الدنيا</td><td>≥ 0.3 m/s — لمنع تراكم الترسبات</td><td>QCS S8 P1</td></tr>
<tr><td>سرعة التدفق القصوى</td><td>≤ 3.0 m/s — حماية من Water Hammer</td><td>QCS S8 P1</td></tr>
<tr><td>Water Hammer Analysis</td><td>إلزامي لخطوط > DN300 أو سرعة > 1.5 m/s</td><td>KAHRAMAA</td></tr>
<tr><td>Minimum Pipe Diameter</td><td>DN50 للتوصيلات المنزلية | DN100 للشوارع</td><td>KAHRAMAA Std.</td></tr>
<tr><td>عمق الدفن في الطرق</td><td>≥ 900mm من سطح الطريق</td><td>KAHRAMAA / Ashghal</td></tr>
<tr><td>عمق الدفن خارج الطرق</td><td>≥ 600mm (حدائق + مناطق رعي)</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>📐 4. مسافات الفصل الإلزامية — Water Supply</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الشبكة المجاورة</th><th>الفصل الأفقي الأدنى</th><th>الفصل الرأسي</th><th>المرجع</th></tr>
<tr><td>Foul Sewer</td><td>≥ 1000mm</td><td>Water Supply دائماً فوق</td><td>KAHRAMAA / QCS S8</td></tr>
<tr><td>Treated Water</td><td>≥ 1000mm</td><td>Water Supply دائماً فوق</td><td>KAHRAMAA / MME</td></tr>
<tr><td>Storm Water</td><td>≥ 500mm</td><td>Water Supply فوق مفضّل</td><td>QCS S8 P1</td></tr>
<tr><td>Gas (QP / Woqod)</td><td>≥ 1000mm</td><td>أي وضع — حسب تقييم QP</td><td>QP Standards</td></tr>
<tr><td>Electricity Cables</td><td>≥ 500mm</td><td>Water Supply فوق</td><td>KAHRAMAA Electrical</td></tr>
<tr><td>Telecom Cables</td><td>≥ 300mm</td><td>أي وضع</td><td>Ooredoo</td></tr>
</table></div>

<h3>🔴 5. Hold Points — ما قبل التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01A</td><td>كل NOCs مكتملة قبل الحفر</td><td>KAHRAMAA + Ashghal + MME</td><td>NOC Letters File</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01B</td><td>Material Approval من KAHRAMAA قبل التوريد</td><td>KAHRAMAA</td><td>Approved Submittal</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01C</td><td>Hydraulic Analysis معتمد + Method Statement</td><td>Consultant + KAHRAMAA</td><td>Approved MS + Hydraulic Report</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | KAHRAMAA Standards | Water Supply Pre-Construction</div>
<h3>Pre-Construction Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Authority</th></tr>
<tr><td>Design Drawings</td><td>KAHRAMAA approved — Plan + Profile + Details</td><td>KAHRAMAA</td></tr>
<tr><td>Hydraulic Analysis</td><td>Epanet/WaterGEMS — Min pressure ≥ 15m (1.5 bar)</td><td>KAHRAMAA</td></tr>
<tr><td>Material Submittal</td><td>All pipes + fittings + valves — KAHRAMAA Approved List</td><td>KAHRAMAA</td></tr>
<tr><td>Method Statement</td><td>Fusion procedure + disinfection plan + emergency shutdown</td><td>KAHRAMAA + Consultant</td></tr>
<tr><td>GPR Survey</td><td>100% before excavation</td><td>Ashghal NOC</td></tr>
</table></div>
<h3>Hydraulic Design Standards</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Value</th><th>Reference</th></tr>
<tr><td>Min pressure</td><td>≥ 15m head (1.5 bar) at peak demand</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>Max pressure</td><td>≤ 80m head (8.0 bar)</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>Min velocity</td><td>≥ 0.3 m/s</td><td>QCS S8 P1</td></tr>
<tr><td>Max velocity</td><td>≤ 3.0 m/s</td><td>QCS S8 P1</td></tr>
<tr><td>Cover depth (roads)</td><td>≥ 900mm</td><td>KAHRAMAA / Ashghal</td></tr>
</table></div>
<h3>Mandatory Separation Distances</h3>
<p>• Foul Sewer: ≥1000mm horizontal — Water Supply always above<br>
• Treated Water: ≥1000mm horizontal — Water Supply always above<br>
• Gas: ≥1000mm horizontal — per QP assessment<br>
• Electricity: ≥500mm — Water Supply above</p>
<p><strong>HP-01A:</strong> All NOCs complete before excavation<br>
<strong>HP-01B:</strong> KAHRAMAA Material Approval before supply<br>
<strong>HP-01C:</strong> Hydraulic Analysis + Method Statement approved</p>
</div>
` },

  ws_materials: { title: '🔩 مياه الشرب — المواد والمواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مواد شبكة مياه الشرب</span>
<button onclick="document.getElementById('vid-ws-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-materials" accept="video/*" style="display:none" data-player="vid-player-ws-materials" data-ph="vid-ph-ws-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-materials" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-materials" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 KAHRAMAA Standards | QCS 2024 Section 8 Part 1 | Material Specifications</div>

<h3>📐 1. أنواع المواسير المعتمدة — KAHRAMAA</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>المعيار</th><th>Pressure Class</th><th>القطر</th><th>الاستخدام</th><th>اختبار المصنع</th></tr>
<tr><td>HDPE PE100</td><td>ISO 4427 / KAHRAMAA</td><td>PN10 – PN16</td><td>DN50 – DN1200</td><td>التوزيع + الرئيسي</td><td>Hydrostatic 2×PN / 1hr</td></tr>
<tr><td>Ductile Iron K9</td><td>ISO 2531 / BS EN 545</td><td>K9</td><td>DN80 – DN1600</td><td>الخطوط الرئيسية + العبور</td><td>Hydrostatic + Hoop Stress</td></tr>
<tr><td>GRP / FRP</td><td>ISO 10467 / AWWA C950</td><td>PN6 – PN25</td><td>DN300 – DN3000</td><td>الخطوط الكبيرة</td><td>Hydrostatic + Stiffness</td></tr>
<tr><td>uPVC PN10/PN16</td><td>ISO 1452 / BS EN 1452</td><td>PN10 – PN16</td><td>DN50 – DN400</td><td>التوزيع الثانوي</td><td>Hydrostatic 2×PN</td></tr>
</table></div>

<h3>📐 2. مواصفات الجودة الإلزامية — جدول الاختبارات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>مواصفة القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Pressure Rating</td><td>≥ PN10 (PN16 للمناطق العالية)</td><td>Factory Hydrostatic Test</td><td>كل batch</td><td>ISO 4427 / KAHRAMAA</td></tr>
<tr><td>SDR HDPE</td><td>SDR 11 لـ PE100</td><td>Wall Thickness Measurement</td><td>كل delivery</td><td>ISO 4427</td></tr>
<tr><td>لون الماسورة</td><td>أزرق أو أصفر (داخلي) — KAHRAMAA</td><td>Visual + Color Chart</td><td>100% per delivery</td><td>KAHRAMAA Std.</td></tr>
<tr><td>Marking on Pipe</td><td>اسم المصنع + Material + PN + DN + Lot No</td><td>Visual Check</td><td>100%</td><td>ISO 4427</td></tr>
<tr><td>Conformity Certificate</td><td>QGOS أو معادل معتمد من KAHRAMAA</td><td>Document Check</td><td>كل Submittal</td><td>KAHRAMAA</td></tr>
<tr><td>Tensile Strength HDPE</td><td>≥ 25 N/mm²</td><td>ISO 527-2</td><td>كل batch</td><td>ISO 4427</td></tr>
<tr><td>Ring Stiffness uPVC</td><td>≥ SN4 (min)</td><td>ISO 9969</td><td>كل batch</td><td>ISO 1452</td></tr>
<tr><td>Impact Strength</td><td>لا كسور في 10 قطع</td><td>ISO 3127 Drop Test</td><td>كل batch</td><td>ISO 4427</td></tr>
</table></div>

<h3>📐 3. مواد Fittings والوصلات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المادة</th><th>النوع</th><th>المواصفة</th><th>الملاحظة</th></tr>
<tr><td>HDPE Fittings</td><td>Butt Fusion / Electrofusion</td><td>ISO 8085-3</td><td>SDR نفس الماسورة إلزامياً</td></tr>
<tr><td>Ductile Iron Fittings</td><td>Mechanical Joint / Push-on</td><td>ISO 2531</td><td>Epoxy lined داخلياً</td></tr>
<tr><td>Gaskets</td><td>EPDM Rubber</td><td>BS EN 681-1</td><td>Grade لمياه الشرب فقط</td></tr>
<tr><td>Bolts / Nuts</td><td>SS316 أو Hot-dipped Galv.</td><td>ASTM A307</td><td>لا Mild Steel بدون حماية</td></tr>
<tr><td>Thrust Blocks</td><td>Concrete in-situ</td><td>C20 minimum</td><td>عند كل تغيير اتجاه ≥ 11.25°</td></tr>
<tr><td>Air Valves</td><td>Double Air Release</td><td>BS EN 1074-4</td><td>عند كل نقطة عالية</td></tr>
<tr><td>Isolation Valves</td><td>Gate / Butterfly Valve</td><td>BS EN 1074-2</td><td>Epoxy lined / SS internals</td></tr>
</table></div>

<h3>⛔ 4. المواد المرفوضة فوراً في الموقع</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;">
<p>• مواسير بدون علامات المصنع (UN-MARKED PIPES) — رفض فوري<br>
• مواسير HDPE بدون شهادة PE100 — رفض<br>
• Gaskets بدون تصنيف مياه شرب — رفض<br>
• DI Pipes بدون Epoxy Lining — رفض<br>
• مواسير بها خدوش عميقة > 10% من سماكة الجدار — رفض<br>
• أي مواسير مخزنة في الشمس المباشرة > 3 أشهر بدون حماية — رفض HDPE<br>
• Fittings بدون SDR مطابق لماسورة الربط — رفض</p>
</div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>اعتماد Material Submittal قبل التوريد</td><td>Consultant + KAHRAMAA</td><td>Approved MAR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>استلام المواد + فحص التسليم</td><td>QC Engineer</td><td>Delivery Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 KAHRAMAA Standards | QCS 2024 Section 8 Part 1
</div>
<h3>Pipe Types — KAHRAMAA Approved</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Pipe Type</th><th>Standard</th><th>Pressure Class</th><th>Diameter</th><th>Use</th></tr>
<tr><td>HDPE PE100</td><td>ISO 4427</td><td>PN10 – PN16</td><td>DN50–DN1200</td><td>Distribution + Transmission</td></tr>
<tr><td>Ductile Iron K9</td><td>ISO 2531 / BS EN 545</td><td>K9</td><td>DN80–DN1600</td><td>Major mains + crossings</td></tr>
<tr><td>GRP / FRP</td><td>ISO 10467</td><td>PN6 – PN25</td><td>DN300–DN3000</td><td>Large diameter mains</td></tr>
<tr><td>uPVC</td><td>ISO 1452</td><td>PN10 – PN16</td><td>DN50–DN400</td><td>Secondary distribution</td></tr>
</table></div>
<h3>Quality Tests — Minimum Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Acceptance</th><th>Test Method</th><th>Min Frequency</th><th>Reference</th></tr>
<tr><td>Pressure Rating</td><td>≥ PN10 minimum</td><td>Factory Hydrostatic</td><td>Per batch</td><td>ISO 4427</td></tr>
<tr><td>SDR (HDPE PE100)</td><td>SDR 11</td><td>Wall thickness measurement</td><td>Per delivery</td><td>ISO 4427</td></tr>
<tr><td>Pipe colour</td><td>Blue or Yellow (internal) — KAHRAMAA</td><td>Visual + colour chart</td><td>100% per delivery</td><td>KAHRAMAA</td></tr>
<tr><td>Marking</td><td>Manufacturer + Material + PN + DN + Lot</td><td>Visual</td><td>100%</td><td>ISO 4427</td></tr>
<tr><td>Conformity Certificate</td><td>QGOS or KAHRAMAA-approved equivalent</td><td>Document check</td><td>Per submittal</td><td>KAHRAMAA</td></tr>
<tr><td>Tensile Strength</td><td>≥ 25 N/mm²</td><td>ISO 527-2</td><td>Per batch</td><td>ISO 4427</td></tr>
<tr><td>Impact Strength</td><td>No fracture in 10 specimens</td><td>ISO 3127 Drop Test</td><td>Per batch</td><td>ISO 4427</td></tr>
</table></div>
<h3>Rejected Materials — Immediate Site Rejection</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• Unmarked pipes (no manufacturer markings) — REJECT<br>
• HDPE without PE100 certificate — REJECT<br>
• Gaskets without potable water grade — REJECT<br>
• DI Pipes without epoxy lining — REJECT<br>
• Pipes with scratches > 10% wall thickness — REJECT<br>
• HDPE stored in direct sun > 3 months unprotected — REJECT
</div>
</div>
` },


  ws_excavation: { title: '⛏️ مياه الشرب — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 حفر وتحضير الخندق — مياه الشرب</span>
<button onclick="document.getElementById('vid-ws-excavation').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-excavation" accept="video/*" style="display:none" data-player="vid-player-ws-excavation" data-ph="vid-ph-ws-excavation" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-excavation" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-excavation" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | KAHRAMAA | Trench Excavation & Bedding</div>

<h3>📐 1. مواصفات الخندق — Trench Geometry</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة القياس</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>عمق الدفن (cover)</td><td>≥ 1.0m من سطح الأرض لأعلى الماسورة</td><td>قياس مباشر</td><td>كل 50m</td><td>KAHRAMAA</td></tr>
<tr><td>عرض الخندق</td><td>OD + 600mm (300mm كل جانب)</td><td>شريط قياس</td><td>كل 50m</td><td>QCS S8</td></tr>
<tr><td>انحراف الخندق</td><td>± 25mm أفقياً، ± 10mm رأسياً</td><td>Total Station</td><td>كل 50m</td><td>KAHRAMAA</td></tr>
<tr><td>سماكة Bedding</td><td>150mm أسفل الماسورة — Class B</td><td>قياس مباشر</td><td>كل Pipe Length</td><td>KAHRAMAA</td></tr>
<tr><td>Haunch Bedding</td><td>رمل نظيف حتى المحور + 300mm</td><td>قياس مباشر</td><td>كل Pipe Length</td><td>QCS S8</td></tr>
<tr><td>Dewatering</td><td>مستوى الماء ≤ 300mm أسفل قاع الحفر</td><td>بصري + قياس</td><td>مستمر</td><td>QCS S8</td></tr>
<tr><td>Shoring</td><td>إلزامي لأعماق > 1.5m</td><td>Design Check</td><td>قبل الحفر</td><td>QCS S1</td></tr>
</table></div>

<h3>📐 2. مواصفات مواد الـ Bedding</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>المواصفة</th><th>اختبار</th><th>تكرار</th></tr>
<tr><td>Bedding (أسفل الماسورة)</td><td>Sand — clean, free draining</td><td>≤ 5mm max size، PI=0</td><td>Grading + PI</td><td>كل 500m³</td></tr>
<tr><td>Haunch (جانبي للمحور)</td><td>Sand — hand compacted</td><td>نفس Bedding</td><td>بصري</td><td>100%</td></tr>
<tr><td>Initial Backfill (فوق +300mm)</td><td>Selected Fill ≤ 75mm</td><td>CBR ≥ 5% | PI ≤ 10</td><td>CBR + Grading</td><td>كل 500m³</td></tr>
<tr><td>Marker Tape</td><td>أصفر WATER MAIN</td><td>300mm أعلى الماسورة</td><td>100% بصري</td><td>كل Pipe Run</td></tr>
</table></div>

<h3>⛔ 3. المواد المرفوضة للـ Bedding</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• رمل فيه طين أو Silt (PI > 6) — رفض<br>
• حجر > 5mm في منطقة الـ Bedding — رفض<br>
• تربة طبيعية من الحفر كـ Bedding — رفض<br>
• سبخة أو تربة منتفخة — رفض فوري + تقرير فوري للمهندس
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03</td><td>فحص الخندق: العمق + العرض + Bedding قبل وضع المواسير</td><td>QC + Consultant</td><td>Trench Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Water Supply — Excavation Phase
</div>
<h3>💧 Water Main Excavation — Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Trench Width</td><td>Pipe OD + 300mm each side</td><td>KAHRAMAA</td></tr>
<tr><td>Depth (Cover)</td><td>Min 900mm to top of pipe</td><td>KAHRAMAA</td></tr>
<tr><td>Formation Level</td><td>±10mm of design invert</td><td>KAHRAMAA</td></tr>
<tr><td>Dewatering</td><td>Trench dry before laying — continuous pump</td><td>KAHRAMAA</td></tr>
<tr><td>Separation from Sewer</td><td>Min 1.0m horizontal / water always above sewer</td><td>QCS 2024</td></tr>
<tr><td>Rock Excavation</td><td>100mm cushion below pipe (sand)</td><td>KAHRAMAA</td></tr>
</table>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ KAHRAMAA permit and approved drawings required before any excavation on water mains.
</div>
</div>
<h3>Trench Geometry Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Measurement</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Cover Depth</td><td>≥ 1.0m from surface to top of pipe</td><td>Direct measurement</td><td>Every 50m</td><td>KAHRAMAA</td></tr>
<tr><td>Trench Width</td><td>OD + 600mm (300mm each side)</td><td>Tape measure</td><td>Every 50m</td><td>QCS S8</td></tr>
<tr><td>Bedding Thickness</td><td>150mm below pipe — Class B</td><td>Direct measurement</td><td>Per pipe length</td><td>KAHRAMAA</td></tr>
<tr><td>Haunch Fill</td><td>Clean sand to centreline + 300mm</td><td>Direct measurement</td><td>Per pipe length</td><td>QCS S8</td></tr>
<tr><td>Dewatering</td><td>GWT ≤ 300mm below trench bottom</td><td>Visual + measurement</td><td>Continuous</td><td>QCS S8</td></tr>
<tr><td>Shoring</td><td>Mandatory for depths > 1.5m</td><td>Design check</td><td>Before excavation</td><td>QCS S1</td></tr>
</table></div>
<h3>Hold Point</h3>
<p><strong>HP-03:</strong> Trench inspection — depth + width + bedding BEFORE pipe laying | QC Engineer + Consultant</p>
</div>
` },


  ws_laying: { title: '🔧 مياه الشرب — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مد مواسير مياه الشرب</span>
<button onclick="document.getElementById('vid-ws-laying').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-laying" accept="video/*" style="display:none" data-player="vid-player-ws-laying" data-ph="vid-ph-ws-laying" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-laying" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-laying" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 KAHRAMAA Standards | QCS 2024 Section 8 Part 1 | Pipe Laying</div>

<h3>📐 1. متطلبات وضع المواسير — Pipe Laying Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة التحقق</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>اتجاه وضع المواسير</td><td>من المصب للمنبع (downhill to uphill)</td><td>بصري</td><td>مستمر</td><td>KAHRAMAA</td></tr>
<tr><td>محاذاة الماسورة</td><td>± 25mm أفقياً من خط التصميم</td><td>Total Station</td><td>كل 50m</td><td>KAHRAMAA</td></tr>
<tr><td>فراغ الوصلة</td><td>حسب مواصفة المصنع (عادة 10-15mm)</td><td>قياس مباشر</td><td>كل وصلة</td><td>ISO 4427</td></tr>
<tr><td>فحص الوصلات HDPE</td><td>Butt Fusion: bead width + bead height = uniform</td><td>بصري + قياس Bead</td><td>كل وصلة</td><td>KAHRAMAA</td></tr>
<tr><td>Electrofusion Records</td><td>تسجيل Barcode + Time + Temp + Operator ID</td><td>Datalogger Print</td><td>كل وصلة</td><td>KAHRAMAA</td></tr>
<tr><td>حماية نهايات المواسير</td><td>End Caps عند نهاية العمل اليومي</td><td>بصري</td><td>يومياً</td><td>QCS S8</td></tr>
<tr><td>Thrust Blocks</td><td>C20 عند كل Bend + Tee + Reducer</td><td>بصري + أبعاد</td><td>كل موقع</td><td>KAHRAMAA</td></tr>
<tr><td>Air Valve تركيب</td><td>عند كل قمة في Profile</td><td>مقارنة بالمخططات</td><td>كل موقع</td><td>KAHRAMAA</td></tr>
<tr><td>Scour Valve تركيب</td><td>عند كل أخفض نقطة في Profile</td><td>مقارنة بالمخططات</td><td>كل موقع</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>📐 2. متطلبات الفصل الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الشبكتان</th><th>الفصل الأفقي</th><th>الوضع الرأسي</th><th>المرجع</th></tr>
<tr><td>مياه الشرب / Foul Sewer</td><td>≥ 1.0m أفقياً</td><td>مياه الشرب فوق دائماً</td><td>KAHRAMAA</td></tr>
<tr><td>مياه الشرب / Treated Water</td><td>≥ 1.0m أفقياً</td><td>مياه الشرب فوق دائماً</td><td>KAHRAMAA</td></tr>
<tr><td>مياه الشرب / Storm Water</td><td>≥ 0.5m أفقياً</td><td>مياه الشرب يُفضَّل فوق</td><td>QCS S8</td></tr>
<tr><td>مياه الشرب / كهرباء HV</td><td>≥ 0.5m أفقياً</td><td>حسب KAHRAMAA</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>⛔ 3. ممارسات محظورة</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• لا توصيل مباشر بين مياه الشرب والمياه المعالجة بأي شكل<br>
• لا Backfill قبل اعتماد فحص الوصلات (HP-04)<br>
• لا Butt Fusion بدون اعتماد Fusion Parameters من المصنع<br>
• لا إنزال مواسير بمعدات ثقيلة مباشرة — استخدام Slings فقط<br>
• لا تخزين مواسير HDPE في الشمس > أسبوع بدون تغطية
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04</td><td>فحص الوصلات والمواسير + مسافات الفصل قبل الردم</td><td>QC + Consultant</td><td>Joint Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 KAHRAMAA | QCS 2024 Section 8 Part 1 | Pipe Laying
</div>
<h3>Pipe Laying Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Verification</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Laying Direction</td><td>Downhill to uphill (downgrade to upgrade)</td><td>Visual</td><td>Continuous</td><td>KAHRAMAA</td></tr>
<tr><td>Horizontal Alignment</td><td>± 25mm from design centreline</td><td>Total Station</td><td>Every 50m</td><td>KAHRAMAA</td></tr>
<tr><td>HDPE Butt Fusion</td><td>Uniform bead width + height around full circumference</td><td>Visual + bead measurement</td><td>Every joint</td><td>KAHRAMAA</td></tr>
<tr><td>Electrofusion Records</td><td>Barcode + Time + Temperature + Operator ID</td><td>Datalogger printout</td><td>Every joint</td><td>KAHRAMAA</td></tr>
<tr><td>Thrust Blocks</td><td>C20 concrete at every bend, tee, reducer</td><td>Visual + dimensions</td><td>Every location</td><td>KAHRAMAA</td></tr>
<tr><td>Air Valves</td><td>At every high point in profile</td><td>Compare to drawings</td><td>Every location</td><td>KAHRAMAA</td></tr>
</table></div>
<h3>Mandatory Separation Distances</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Networks</th><th>Horizontal Separation</th><th>Vertical Position</th><th>Reference</th></tr>
<tr><td>Water Supply / Foul Sewer</td><td>≥ 1.0m</td><td>Water always ABOVE sewer</td><td>KAHRAMAA</td></tr>
<tr><td>Water Supply / Treated Water</td><td>≥ 1.0m</td><td>Water always ABOVE treated</td><td>KAHRAMAA</td></tr>
<tr><td>Water Supply / Storm Water</td><td>≥ 0.5m</td><td>Water preferred above storm</td><td>QCS S8</td></tr>
</table></div>
<p><strong>HP-04:</strong> Joint inspection + separation distances check BEFORE backfill</p>
</div>
` },


  ws_testing: { title: '🧪 مياه الشرب — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبار الضغط — شبكة المياه</span>
<button onclick="document.getElementById('vid-ws-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-testing" accept="video/*" style="display:none" data-player="vid-player-ws-testing" data-ph="vid-ph-ws-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 KAHRAMAA Standards | QCS 2024 Section 8 — Hydrostatic Pressure Test
</div>
<h3>📐 Hydrostatic Pressure Test — KAHRAMAA / QCS S8</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th><th>Min Frequency</th></tr><tr><td>ضغط الاختبار</td><td>1.5 × PN (Nominal Pressure) — الضغط التصميمي</td><td>KAHRAMAA / BS EN 805</td><td>كل section ≤ 500m</td></tr><tr><td>مدة الاختبار</td><td>2 ساعة كاملة</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>المعيار</td><td>Zero pressure drop طوال 2 ساعة</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>طريقة الاختبار</td><td>Slow Fill + Bleeding Air + Pressurize + Monitor</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>أقصى طول Section</td><td>500m لكل test section</td><td>KAHRAMAA</td><td>—</td></tr><tr><td>وقت Stabilization</td><td>30 دقيقة قبل بدء القياس الرسمي</td><td>BS EN 805</td><td>Per section</td></tr><tr><td>تسجيل البيانات</td><td>ضغط البداية + الضغط كل 30 min + النهاية</td><td>KAHRAMAA</td><td>Per section</td></tr></table></div>
<h3>📐 اختبارات جودة المياه — KAHRAMAA</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>المعيار</th><th>المرجع</th><th>التكرار</th></tr><tr><td>Coliform Bacteria</td><td>0 / 100mL</td><td>WHO / KAHRAMAA</td><td>Per section after chlorination</td></tr><tr><td>Turbidity</td><td>≤ 1 NTU</td><td>WHO / KAHRAMAA</td><td>Per section</td></tr><tr><td>pH</td><td>6.5 – 8.5</td><td>WHO / KAHRAMAA</td><td>Per section</td></tr><tr><td>Residual Chlorine</td><td>0.2 – 0.5 mg/L</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Chlorination Dosage</td><td>≥ 50 mg/L (ppm)</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Contact Time</td><td>≥ 24 hours</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Flushing before sampling</td><td>Clear water — turbidity check</td><td>KAHRAMAA</td><td>Before each sample</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>التوثيق</th></tr><tr><td>HP-01</td><td>تحقق من Backfill ≥ 300mm فوق الماسورة قبل الضغط</td><td>Pre-test Inspection Record</td></tr><tr><td>HP-02</td><td>Hydrostatic Test = Zero drop / 2hr</td><td>Pressure Test Certificate</td></tr><tr><td>HP-03</td><td>Chlorination ≥ 50ppm / ≥ 24hr مكتمل</td><td>Chlorination Log</td></tr><tr><td>HP-04</td><td>Water Quality: Coliform=0 + Turbidity≤1NTU</td><td>Lab Water Quality Certificate</td></tr></table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Pressure Testing — Water Supply</span>
<button onclick="document.getElementById('vid-ws-testing-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-testing-en" accept="video/*" style="display:none" data-player="vid-player-ws-testing-en" data-ph="vid-ph-ws-testing-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-testing-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-ws-testing-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Hydrostatic Pressure Test — KAHRAMAA</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Specification</th><th>Reference</th><th>Frequency</th></tr><tr><td>Test Pressure</td><td>1.5 × PN (Nominal Pressure)</td><td>KAHRAMAA / BS EN 805</td><td>Per section ≤500m</td></tr><tr><td>Test Duration</td><td>2 hours minimum</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Pass Criterion</td><td>Zero pressure drop in 2 hours</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Max Section Length</td><td>500m per test section</td><td>KAHRAMAA</td><td>—</td></tr><tr><td>Stabilization Time</td><td>30 min before formal recording</td><td>BS EN 805</td><td>Per section</td></tr></table></div><h3>Water Quality Tests</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Standard</th><th>Reference</th><th>Frequency</th></tr><tr><td>Coliform Bacteria</td><td>0/100mL</td><td>WHO/KAHRAMAA</td><td>Per section</td></tr><tr><td>Turbidity</td><td>≤ 1 NTU</td><td>WHO/KAHRAMAA</td><td>Per section</td></tr><tr><td>pH</td><td>6.5–8.5</td><td>WHO/KAHRAMAA</td><td>Per section</td></tr><tr><td>Residual Chlorine</td><td>0.2–0.5 mg/L</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Chlorination Dose</td><td>≥ 50 mg/L</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Contact Time</td><td>≥ 24 hours</td><td>KAHRAMAA</td><td>Per section</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>Condition</th><th>Documentation</th></tr><tr><td>HP-01</td><td>Backfill ≥ 300mm above pipe confirmed</td><td>Pre-test Inspection Record</td></tr><tr><td>HP-02</td><td>Hydrostatic Test: Zero pressure drop / 2hr</td><td>Pressure Test Certificate</td></tr><tr><td>HP-03</td><td>Chlorination ≥ 50ppm / ≥ 24hr complete</td><td>Chlorination Log</td></tr><tr><td>HP-04</td><td>Water Quality: Coliform=0 + Turbidity≤1NTU</td><td>Lab Water Quality Certificate</td></tr></table></div>
</div>
` },

  ws_disinfection: { title: '💊 مياه الشرب — التعقيم والتشغيل', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تعقيم وتطهير شبكة المياه</span></div>
<button onclick="document.getElementById('vid-ws-disinfection').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-disinfection" accept="video/*" style="display:none" data-player="vid-player-ws-disinfection" data-ph="vid-ph-ws-disinfection" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-disinfection" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Chlorination ≥50ppm / ≥24hr، جودة المياه</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ws-disinfection" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 1 | Disinfection</div>
<h3>📐 إجراءات التعقيم</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>مادة التعقيم</td><td>Sodium Hypochlorite أو Chlorine Gas</td></tr><tr><td>تركيز الكلور</td><td>50 mg/L (ppm) كحد أدنى</td></tr><tr><td>مدة التلامس</td><td>24 hour كحد أدنى</td></tr><tr><td>Flushing بعد التعقيم</td><td>حتى Residual Chlorine ≤ 0.5 ppm</td></tr></table>
<h3>🧪 اختبارات جودة المياه — KAHRAMAA</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>الجهة</th></tr><tr><td>Total Coliform</td><td>صفر / 100ml</td><td>KAHRAMAA Lab</td></tr><tr><td>E. Coli</td><td>صفر / 100ml</td><td>KAHRAMAA Lab</td></tr><tr><td>Residual Chlorine</td><td>0.2 – 0.5 ppm</td><td>موقعياً</td></tr><tr><td>Turbidity</td><td>≤ 1 NTU</td><td>KAHRAMAA Lab</td></tr><tr><td>pH</td><td>6.5 – 8.5</td><td>موقعياً</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-06:</strong> اعتماد نتائج Water Quality من KAHRAMAA قبل التشغيل</p>
<h3>⚠️ تنبيه مهم</h3>
<p>لا تشغيل الشبكة قبل الحصول على موافقة KAHRAMAA الخطية!</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Water Network Chlorination</span></div>
<button onclick="document.getElementById('vid-ws-disinfection-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-disinfection-en" accept="video/*" style="display:none" data-player="vid-player-ws-disinfection-en" data-ph="vid-ph-ws-disinfection-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-disinfection-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Chlorination ≥50ppm / ≥24hr, water quality</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ws-disinfection-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 💊 مياه الشرب — التعقيم والتشغيل
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },

  ws_backfill: { title: '🏗️ مياه الشرب — الردم والتشطيب', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">الردم والدمك — مياه الشرب</span></div>
<button onclick="document.getElementById('vid-ws-backfill').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-backfill" accept="video/*" style="display:none" data-player="vid-player-ws-backfill" data-ph="vid-ph-ws-backfill" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-backfill" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Compaction ≥95% MDD طبقة 300mm</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ws-backfill" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 1 | Ashghal Reinstatement | KAHRAMAA Backfill Specs</div>

<h3>📐 1. جدول طبقات الردم الكامل — Water Supply</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>السماكة القصوى/طبقة</th><th>درجة الدمك</th><th>طريقة الاختبار</th><th>تكرار الاختبار</th><th>المرجع</th></tr>
<tr><td>0–300mm فوق الماسورة</td><td>رمل نظيف — يدوي فقط — لا آلات</td><td>—</td><td>≥ 90% MDD</td><td>Sand Cone ASTM D1556</td><td>كل 50m</td><td>KAHRAMAA / QCS S8</td></tr>
<tr><td>300–600mm</td><td>Selected Fill (PI ≤ 10 | ≤ 75mm) لا Sabkha</td><td>300mm / طبقة</td><td>≥ 93% MDD</td><td>Sand Cone / DCP</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>600mm – 1.5m من السطح</td><td>Selected Fill أو QCS S6 Material</td><td>200mm / طبقة</td><td>≥ 95% MDD</td><td>Sand Cone</td><td>كل 500m²</td><td>Ashghal / QCS S6</td></tr>
<tr><td>آخر 1.5m (تحت الطريق)</td><td>Subbase Class A + Base Course حسب الطريق</td><td>150mm / طبقة</td><td>≥ 98% MDD</td><td>Sand Cone</td><td>كل 250m²</td><td>Ashghal Reinst.</td></tr>
<tr><td>Marker Tape</td><td>أصفر — "WATER" — Polythene 300mm فوق الماسورة</td><td>—</td><td>—</td><td>100% بصري</td><td>كل Pipe Run</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>📐 2. جدول اختبارات الدمك</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Proctor (MDD + OMC)</td><td>قاعدة مرجعية لكل مصدر مادة</td><td>BS 1377 Part 4 / ASTM D698</td><td>كل مصدر + كل تغيير مادة</td><td>QCS S6</td></tr>
<tr><td>In-situ Density (Sand Replacement)</td><td>≥ 90–98% MDD حسب طبقة الردم</td><td>ASTM D1556 / BS 1377 Part 9</td><td>كل 50m للخندق / كل 500m² للمساحات</td><td>Ashghal</td></tr>
<tr><td>DCP (Dynamic Cone)</td><td>CBR ≥ 30% لـ Subbase | CBR ≥ 80% لـ Base</td><td>ASTM D6951</td><td>عند الشك أو بالقرب من Structures</td><td>Ashghal</td></tr>
<tr><td>Settlement Monitoring</td><td>لا هبوط مرئي بعد 7 أيام من الرصف</td><td>Level Survey</td><td>100% — كل القطاعات</td><td>Ashghal</td></tr>
<tr><td>Plate Bearing Test (CBR in-situ)</td><td>≥ مواصفة الطريق الأصلي</td><td>BS 1377 Part 9</td><td>طرق رئيسية + Ashghal طلب</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 3. إعادة تأهيل الطريق — Road Reinstatement</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الطبقة</th><th>المادة</th><th>السماكة</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>Saw Cut</td><td>قطع Diamond Saw — خط مستقيم نظيف</td><td>—</td><td>300mm خارج حافة الخندق كل جانب</td><td>Ashghal Reinst.</td></tr>
<tr><td>Subgrade Preparation</td><td>تسوية + دمك ≥ 95% MDD</td><td>حتى عمق الـ Subbase</td><td>—</td><td>Ashghal</td></tr>
<tr><td>Subbase (GSB)</td><td>Granular Sub-Base Class A — QCS S6</td><td>بنفس الطريق الأصلي — min 150mm</td><td>CBR ≥ 30% | ≥ 98% MDD</td><td>Ashghal S6</td></tr>
<tr><td>Base Course (DBM)</td><td>Dense Bitumen Macadam — QCS S7</td><td>بنفس الطريق الأصلي — min 50mm</td><td>Marshall Stability ≥ 8 kN</td><td>QCS S7</td></tr>
<tr><td>Wearing Course</td><td>Asphaltic Concrete QCS S7</td><td>بنفس الطريق الأصلي — min 40mm</td><td>IRI ≤ 2.5 m/km</td><td>Ashghal S7</td></tr>
<tr><td>Tack Coat</td><td>Bitumen Emulsion بين الطبقات</td><td>0.3–0.5 L/m²</td><td>—</td><td>QCS S7</td></tr>
<tr><td>Joint Sealing</td><td>Bituminous Sealant عند الـ Saw Cut</td><td>بعرض ≥ 10mm</td><td>مانع للتسرب</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 4. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ ردم بتربة Sabkha (SO₃ > 0.5%) أو تربة عضوية<br>
• ❌ ردم بحجارة > 75mm في منطقة الماسورة<br>
• ❌ استخدام آلات ثقيلة مباشرة فوق الماسورة (< 1.0m تغطية)<br>
• ❌ Marker Tape غير أصفر أو بدون كتابة "WATER"<br>
• ❌ إعادة رصف بدون Saw Cut نظيف — يُسبب تشقق الحواف<br>
• ❌ طبقة Wearing Course بدون Tack Coat<br>
• ❌ Compaction Test ناقص — ردم بدون نتائج مختبر
</div>

<h3>🔴 5. Hold Points — الردم والتشطيب</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07A</td><td>Compaction Test Pass (≥93% MDD) للطبقات 300–600mm</td><td>QC + Lab</td><td>Compaction Test Report</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07B</td><td>Subbase + Base Course Compaction ≥ 98% MDD</td><td>QC + Ashghal</td><td>Lab Results + ITR-07B</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07C</td><td>Saw Cut نظيف + Asphalt مطابق مواصفة الطريق الأصلي</td><td>Ashghal Inspector</td><td>Reinstatement ITR</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Backfill & Compaction — Water</span></div>
<button onclick="document.getElementById('vid-ws-backfill-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-backfill-en" accept="video/*" style="display:none" data-player="vid-player-ws-backfill-en" data-ph="vid-ph-ws-backfill-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-backfill-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Compaction ≥95% MDD per 300mm layer</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ws-backfill-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | Ashghal Reinstatement | Water Supply Backfill</div>
<h3>Backfill Layers</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Zone</th><th>Material</th><th>Max Layer</th><th>Compaction</th><th>Test Frequency</th></tr>
<tr><td>0–300mm above pipe</td><td>Clean sand — manual only</td><td>—</td><td>≥ 90% MDD</td><td>Every 50m</td></tr>
<tr><td>300–600mm</td><td>Selected fill (PI ≤10 | ≤75mm) — no Sabkha</td><td>300mm</td><td>≥ 93% MDD</td><td>Every 50m</td></tr>
<tr><td>600mm to 1.5m depth</td><td>Selected fill / QCS S6 material</td><td>200mm</td><td>≥ 95% MDD</td><td>Every 500m²</td></tr>
<tr><td>Top 1.5m (below road)</td><td>Subbase Class A + Base Course</td><td>150mm</td><td>≥ 98% MDD</td><td>Every 250m²</td></tr>
<tr><td>Marker Tape</td><td>Yellow — "WATER" — 300mm above pipe</td><td>—</td><td>100% visual</td><td>Every pipe run</td></tr>
</table></div>
<h3>Road Reinstatement</h3>
<p>• Saw Cut: Diamond saw — straight line — 300mm outside trench edge each side<br>
• Subbase GSB Class A: same depth as original — min 150mm — CBR ≥ 30% — ≥98% MDD<br>
• Base DBM: same as original — min 50mm — Marshall Stability ≥ 8kN<br>
• Wearing Course AC: same as original — min 40mm<br>
• Tack Coat between layers: 0.3–0.5 L/m²<br>
• Joint Seal at saw cut: bituminous sealant ≥ 10mm</p>
<p><strong>HP-07A:</strong> Compaction ≥93% MDD — 300–600mm zone<br>
<strong>HP-07B:</strong> Subbase + base ≥98% MDD confirmed<br>
<strong>HP-07C:</strong> Saw cut clean + asphalt matching original road spec</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Sabkha soil (SO₃ >0.5%) | Rocks >75mm near pipe | Heavy machinery on <1.0m cover | Non-yellow marker tape | Asphalt without tack coat | Missing compaction test results
</div>
</div>
` },

  ws_handover: { title: '✅ مياه الشرب — التسليم', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تسليم شبكة مياه الشرب</span></div>
<button onclick="document.getElementById('vid-ws-handover').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-handover" accept="video/*" style="display:none" data-player="vid-player-ws-handover" data-ph="vid-ph-ws-handover" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-handover" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-Built، اختبارات نهائية، تشغيل</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ws-handover" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 1 | KAHRAMAA W.S.S. | Water Supply Handover</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى المطلوب</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + Profile مع مناسيب فعلية<br>GPS Coordinates لكل Valve + Fitting + Chamber<br>نقاط التوصيل + مواضع Tie-ins</td><td>3 ورقي + 1 رقمي DWG/PDF</td><td>KAHRAMAA</td></tr>
<tr><td>Pressure Test Certificates</td><td>كل sections — 1.5×PN / 2hr / Zero drop<br>تاريخ + اسم القائم بالاختبار + توقيع KAHRAMAA</td><td>أصلي + نسختان</td><td>KAHRAMAA</td></tr>
<tr><td>Chlorination & Flushing Records</td><td>≥ 50ppm لمدة ≥ 24hr<br>نتائج Residual Chlorine + Flush Volume</td><td>أصلي + نسخة</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Bacteriological Water Quality</td><td>Coliform = 0 / 100mL<br>E. Coli = 0 / 100mL — KAHRAMAA Lab معتمد</td><td>أصلي</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Chemical Water Quality</td><td>pH: 6.5–8.5 | Turbidity ≤ 1 NTU<br>Chlorine Residual: 0.2–0.5 mg/L عند أبعد نقطة</td><td>أصلي</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Material Certificates</td><td>Mill Certs للمواسير + Fittings + Valves<br>KAHRAMAA Approved List Confirmation</td><td>أصلي</td><td>Manufacturer</td></tr>
<tr><td>Valve Schedule</td><td>كل Valves: Type / Size / Location / GPS<br>Operating Turn Direction + Key Type</td><td>ورقي + رقمي</td><td>KAHRAMAA</td></tr>
<tr><td>Fusion Welding Records</td><td>كل HDPE Butt Fusion + Electrofusion<br>Barcode / Temperature / Time لكل وصلة</td><td>رقمي + ورقي</td><td>QC</td></tr>
<tr><td>ITP Signed Register</td><td>كل ITPs مغلقة — صفر NCR مفتوح</td><td>أصلي موقّع</td><td>QC + Consultant</td></tr>
<tr><td>O&M Manual</td><td>Operating procedures + Valve Key Schedule<br>Emergency Isolation Plan + Contact Numbers</td><td>نسختان</td><td>KAHRAMAA</td></tr>
<tr><td>GIS Data File</td><td>Shapefile أو DWG مع Attributes لكل Asset</td><td>رقمي</td><td>KAHRAMAA GIS</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم النهائي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>Pressure Test</td><td>100% Pass — كل Sections</td><td>QC + KAHRAMAA</td></tr>
<tr><td>Chlorination</td><td>≥ 50ppm / ≥ 24hr — كل الشبكة</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Bacteriological Test</td><td>Coliform = 0 | E.Coli = 0 / 100mL</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Chemical Quality</td><td>pH + Turbidity + Residual Cl₂ ضمن الحدود</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Valve Operation</td><td>كل الـ Valves تُفتح وتُغلق — تعمل بسلاسة</td><td>QC + KAHRAMAA</td></tr>
<tr><td>Air Valve Function</td><td>كل ARVs تعمل — تُخرج الهواء عند التشغيل</td><td>QC</td></tr>
<tr><td>Marker Tape</td><td>أصفر — "WATER" — موجود 100%</td><td>QC</td></tr>
<tr><td>No Leaks (Visual)</td><td>فحص بصري شامل لكل الشبكة أثناء التشغيل</td><td>KAHRAMAA Inspector</td></tr>
<tr><td>Compaction Pass</td><td>100% نتائج ≥ 95% MDD</td><td>Lab + QC</td></tr>
<tr><td>Road Reinstated</td><td>Asphalt مكتمل — مستوي — مطابق الطريق الأصلي</td><td>Ashghal</td></tr>
<tr><td>GIS Data Submitted</td><td>Shapefile مُسلَّم ومعتمد</td><td>KAHRAMAA GIS</td></tr>
<tr><td>Zero Open NCRs</td><td>كل NCRs مغلقة بإجراءات تصحيحية موثقة</td><td>QC</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP — Defects Liability Period</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>مدة DLP</td><td>12 شهر من تاريخ التسليم الرسمي (TOC)</td></tr>
<tr><td>Bacteriological Monitoring</td><td>كل 3 أشهر — نتائج لـ KAHRAMAA</td></tr>
<tr><td>Pressure Monitoring</td><td>شهري — لوغر ضغط على نقاط حرجة</td></tr>
<tr><td>Valve Exercise</td><td>تشغيل كل الـ Valves كل 6 أشهر + توثيق</td></tr>
<tr><td>Leak Response</td><td>خلال 24hr من الإبلاغ — إصلاح + إشعار KAHRAMAA</td></tr>
<tr><td>Marker Tape Check</td><td>عند أي حفر قريب — تأكيد وجود الـ Tape</td></tr>
<tr><td>Road Settlement Check</td><td>كل 3 أشهر — إبلاغ Ashghal عند أي هبوط</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08A</td><td>Bacteriological Water Quality = Zero Coliform — KAHRAMAA Lab</td><td>KAHRAMAA Lab</td><td>Water Quality Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08B</td><td>As-Built + GIS Data مُسلَّمة ومعتمدة</td><td>KAHRAMAA GIS</td><td>Approved As-Built Set</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08C</td><td>موافقة KAHRAMAA الرسمية — TOC Certificate</td><td>KAHRAMAA</td><td>Taking Over Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Water Network Handover</span></div>
<button onclick="document.getElementById('vid-ws-handover-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-handover-en" accept="video/*" style="display:none" data-player="vid-player-ws-handover-en" data-ph="vid-ph-ws-handover-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-built, final tests, commissioning</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ws-handover-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | KAHRAMAA W.S.S. | Water Supply Handover</div>
<h3>Handover Documents Required</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Document</th><th>Content</th><th>Copies</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + profile — actual levels — GPS per valve/fitting</td><td>3 hard + 1 digital</td></tr>
<tr><td>Pressure Test Certs</td><td>All sections — 1.5×PN / 2hr / zero drop — KAHRAMAA signed</td><td>Original + 2</td></tr>
<tr><td>Chlorination Records</td><td>≥50ppm / ≥24hr + residual chlorine results</td><td>Original + 1</td></tr>
<tr><td>Bacteriological Quality</td><td>Coliform = 0 | E.Coli = 0 / 100mL — KAHRAMAA Lab</td><td>Original</td></tr>
<tr><td>Chemical Quality</td><td>pH 6.5–8.5 | Turbidity ≤1 NTU | Cl₂ 0.2–0.5 mg/L</td><td>Original</td></tr>
<tr><td>Material Certs</td><td>Mill certs — pipes + fittings + valves — KAHRAMAA list</td><td>Original</td></tr>
<tr><td>Valve Schedule</td><td>All valves: type/size/GPS/operating turns/key type</td><td>Hard + digital</td></tr>
<tr><td>Fusion Welding Records</td><td>All HDPE joints — barcode / temp / time</td><td>Digital + hard</td></tr>
<tr><td>GIS Data File</td><td>Shapefile/DWG with full asset attributes</td><td>Digital</td></tr>
<tr><td>O&M Manual</td><td>Operating procedures + emergency isolation plan</td><td>2 copies</td></tr>
</table></div>
<h3>DLP — 12 Months from TOC</h3>
<p>• Bacteriological test every 3 months → KAHRAMAA<br>
• Monthly pressure monitoring at critical points<br>
• Valve exercise every 6 months (all valves)<br>
• Leak repair within 24hr of report<br>
• Road settlement check every 3 months</p>
<p><strong>HP-08A:</strong> Bacteriological certificate (Zero Coliform) from KAHRAMAA Lab<br>
<strong>HP-08B:</strong> As-Built + GIS Data submitted and approved<br>
<strong>HP-08C:</strong> KAHRAMAA TOC Certificate — formal acceptance</p>
</div>
` },

  ss_survey: { title: '📐 Foul Sewer — الدراسة والتصميم', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 2 | Pre-Construction</div>
<h3>📋 متطلبات ما قبل التنفيذ</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr><tr><td>مخططات التصميم</td><td>معتمدة من Ashghal / MME</td></tr><tr><td>Hydraulic Design</td><td>تحليل التدفق والانحدارات</td></tr><tr><td>Invert Levels</td><td>مناسيب قيعان الغرف محددة</td></tr><tr><td>Existing Services</td><td>As-Built + NOC من كل الجهات</td></tr><tr><td>Method Statement</td><td>معتمد قبل البدء</td></tr></table>
<h3>⚠️ قواعد الفصل الإلزامية</h3>
<p>• Foul Sewer دائماً <strong>أسفل</strong> مياه الشرب رأسياً<br>• فصل ≥ 1.0m أفقياً عن مياه الشرب<br>• NOC إلزامي قبل أي حفر</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد المخططات والمناسيب قبل الحفر</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📐 Foul Sewer — الدراسة والتصميم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>متطلبات التصميم — Foul Sewer</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>المعايير التصميمية</td><td>Self-cleansing velocity ≥0.6 m/s<br>Max velocity ≤3.0 m/s<br>Min gradient: DN150→1:100, DN200→1:150<br>Manhole spacing ≤120m</td><td>QCS 2024 S8 / Ashghal</td></tr>
<tr><td>الدراسة الطبوغرافية</td><td>Total Station survey — Grid 25m<br>Benchmarks كل 200m</td><td>Ashghal Survey Manual</td></tr>
<tr><td>Utility Detection</td><td>GPR scan قبل الحفر — كشف المرافق القائمة</td><td>Ashghal NOC</td></tr>
<tr><td>Soil Investigation</td><td>Trial pits كل 100m أو BH حسب الأهمية<br>GWT level confirmation</td><td>QCS P3</td></tr>
<tr><td>Drawings</td><td>Plan + Long Section + Cross Section + Details<br>1:500 plan, 1:100 H / 1:10 V for sections</td><td>Ashghal CAD Standards</td></tr>
</tbody></table>
` },

  ss_materials: { title: '🔩 Foul Sewer — المواد والمواسير', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">مواد الصرف الصحي</span></div>
<button onclick="document.getElementById('vid-ss-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-materials" accept="video/*" style="display:none" data-player="vid-player-ss-materials" data-ph="vid-ph-ss-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-materials" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">uPVC، GRP، Manholes، مواصفات QCS</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ss-materials" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 2 | Materials</div>
<h3>📐 مواصفات المواسير</h3>
<table class="dm-table"><tr><th>النوع</th><th>المواصفة</th><th>الاستخدام</th></tr><tr><td>uPVC</td><td>ISO 4435 | SN8</td><td>DN150-DN600</td></tr><tr><td>GRP</td><td>ISO 10467 | SN5000</td><td>DN600+</td></tr><tr><td>HDPE</td><td>ISO 4427 | SN8</td><td>خطوط الضخ فقط</td></tr></table>
<h3>📐 مواصفات Manholes</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>Concrete الغرفة</td><td>≥ C35 — مقاومة للكيماويات</td></tr><tr><td>Precast Rings</td><td>BS 5911 Part 200</td></tr><tr><td>Benching</td><td>ملاط 1:2 — ميل 1:12 نحو القناة</td></tr><tr><td>Cover للطرق D400</td><td>400 kN — BS EN 124</td></tr><tr><td>Cover للمشاة B125</td><td>125 kN — BS EN 124</td></tr><tr><td>Step Irons</td><td>HDPE Coated — كل 300mm</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-02:</strong> اعتماد كل المواد قبل التوريد</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Sewer Materials</span></div>
<button onclick="document.getElementById('vid-ss-materials-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-materials-en" accept="video/*" style="display:none" data-player="vid-player-ss-materials-en" data-ph="vid-ph-ss-materials-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-materials-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">uPVC, GRP pipes, manholes, QCS specs</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ss-materials-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🔩 Foul Sewer — المواد والمواسير
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },

  ss_excavation: { title: '⛏️ Foul Sewer — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 حفر الصرف الصحي</span>
<button onclick="document.getElementById('vid-ss-excavation').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-excavation" accept="video/*" style="display:none" data-player="vid-player-ss-excavation" data-ph="vid-ph-ss-excavation" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-excavation" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-excavation" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Sewer Trench Excavation</div>

<h3>📐 1. مواصفات الخندق — Trench Geometry</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة القياس</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>عمق الدفن</td><td>≥ 1.2m من السطح لأعلى الماسورة</td><td>قياس مباشر</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>عرض الخندق</td><td>OD + 600mm (300mm كل جانب)</td><td>شريط قياس</td><td>كل 50m</td><td>QCS S8</td></tr>
<tr><td>الانحدار (Gradient)</td><td>DN150: 1:100 min | DN225: 1:150 min | DN300+: 1:200 min</td><td>Laser Level</td><td>كل 3 مواسير</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>إلزامي لأعماق > 1.5m</td><td>Design Check</td><td>قبل الحفر</td><td>QCS S1</td></tr>
<tr><td>Dewatering</td><td>GWT ≤ 300mm أسفل الحفر</td><td>بصري + قياس</td><td>مستمر</td><td>QCS S8</td></tr>
<tr><td>Formation Level</td><td>± 10mm من المنسوب التصميمي</td><td>Laser + Staff</td><td>كل 10m</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. مواصفات Bedding — Sewer Pipes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>Bedding Class</th><th>المادة</th><th>السماكة</th><th>المواصفة</th></tr>
<tr><td>uPVC DN150–DN600</td><td>Class B</td><td>رمل نظيف ≤ 5mm</td><td>150mm أسفل + Haunch</td><td>BS EN 1610 / Ashghal</td></tr>
<tr><td>GRP DN600+</td><td>Class B أو S</td><td>Single-size aggregate 6-20mm</td><td>150mm + Haunch حتى المحور</td><td>ISO 10467</td></tr>
<tr><td>Concrete Pipes RCP</td><td>Class B</td><td>حجر مكسر 10-20mm</td><td>150mm أسفل + Haunch</td><td>BS 5911</td></tr>
</table></div>

<h3>⛔ 3. المواد المرفوضة للـ Bedding</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• تربة طبيعية من الحفر كـ Bedding — رفض<br>
• سبخة أو تربة منتفخة (Expansive soil) — رفض + تقرير فوري<br>
• حجر > 20mm في منطقة الـ Bedding — رفض<br>
• رمل طيني (PI > 6) — رفض<br>
• ردم بالمعدات الثقيلة على مسافة < 1.5m من الماسورة — ممنوع
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03</td><td>فحص الخندق: العمق + الانحدار + Bedding قبل وضع المواسير</td><td>QC + Consultant</td><td>Trench Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Foul Sewer — Excavation Phase
</div>
<h3>🔩 Sewer Trench Excavation — Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Trench Width</td><td>Pipe OD + 300mm each side (min)</td><td>Ashghal Spec</td></tr>
<tr><td>Side Slopes</td><td>1:1 (unsupported) or shored</td><td>Ashghal</td></tr>
<tr><td>Excavation Level</td><td>Formation to ±10mm of design</td><td>Ashghal</td></tr>
<tr><td>Over-excavation</td><td>Fill with C10 lean concrete / approved granular</td><td>Ashghal</td></tr>
<tr><td>Dewatering</td><td>Keep trench dry during laying</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>Required >1.2m depth in granular soil</td><td>Health & Safety</td></tr>
<tr><td>Separation from Water</td><td>Min 1.0m horizontal / Water always above sewer</td><td>QCS 2024</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ All excavations in Qatar road network require valid Kahramaa/Ashghal permit. No excavation before utility mark-out (Red Line Survey).
</div>
</div>
<h3>Trench Geometry — Foul Sewer</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Measurement</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Cover Depth</td><td>≥ 1.2m to top of pipe</td><td>Direct measurement</td><td>Every 50m</td><td>Ashghal</td></tr>
<tr><td>Trench Width</td><td>OD + 600mm</td><td>Tape</td><td>Every 50m</td><td>QCS S8</td></tr>
<tr><td>Gradient</td><td>DN150: 1:100 | DN225: 1:150 | DN300+: 1:200</td><td>Laser Level</td><td>Every 3 pipes</td><td>Ashghal</td></tr>
<tr><td>Formation Level</td><td>± 10mm design level</td><td>Laser + staff</td><td>Every 10m</td><td>Ashghal</td></tr>
</table></div>
<p><strong>HP-03:</strong> Trench inspection — depth + gradient + bedding BEFORE pipe laying</p>
</div>
` },


  ss_laying: { title: '🔧 Foul Sewer — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مد مواسير الصرف الصحي</span>
<button onclick="document.getElementById('vid-ss-laying').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-laying" accept="video/*" style="display:none" data-player="vid-player-ss-laying" data-ph="vid-ph-ss-laying" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-laying" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-laying" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Pipe Laying & Jointing</div>

<h3>📐 1. متطلبات وضع المواسير</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة التحقق</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>اتجاه الوضع</td><td>من المصب للمنبع — Spigot يواجه اتجاه التدفق</td><td>بصري</td><td>كل ماسورة</td><td>BS EN 1610</td></tr>
<tr><td>الانحدار أثناء الوضع</td><td>فحص كل 3 مواسير بـ Laser Level</td><td>Laser Level</td><td>كل 3 مواسير</td><td>Ashghal</td></tr>
<tr><td>Rubber Ring Lubricant</td><td>فقط المواد المعتمدة من المصنع — لا زيوت محلية</td><td>بصري</td><td>كل وصلة</td><td>ISO 4435</td></tr>
<tr><td>Gap عند الوصلة</td><td>10mm minimum — يسمح للـ Thermal Movement</td><td>قياس</td><td>عينة</td><td>Ashghal</td></tr>
<tr><td>فحص بصري للوصلة</td><td>Rubber Ring في مكانه + Gap صحيح + لا انقلاب</td><td>بصري</td><td>كل وصلة</td><td>BS EN 1610</td></tr>
<tr><td>Marker Tape أخضر</td><td>300mm فوق الماسورة — "FOUL SEWER"</td><td>بصري</td><td>كل Pipe Run</td><td>Ashghal</td></tr>
<tr><td>انحناء uPVC</td><td>لا deflection > 3° per joint (السماح بالانحناء الطولي)</td><td>Laser Level</td><td>عند الانحناءات</td><td>ISO 4435</td></tr>
</table></div>

<h3>📐 2. متطلبات توصيل الخدمات (Lateral Connections)</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>زاوية التوصيل</td><td>45° في اتجاه التدفق — لا توصيل ضد التيار</td><td>Ashghal</td></tr>
<tr><td>نوع التوصيل</td><td>Factory-made Y-Junction أو T-Junction</td><td>BS EN 476</td></tr>
<tr><td>القطر الأدنى للـ Lateral</td><td>DN100 للمباني السكنية</td><td>Ashghal</td></tr>
<tr><td>Inspection Chamber</td><td>عند كل تغيير اتجاه أو نقطة توصيل</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 3. ممارسات محظورة — Sewer Laying</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• لا توصيل Storm Water بشبكة Foul Sewer — مخالفة قانونية<br>
• لا Backfill قبل فحص الوصلات (HP-04)<br>
• لا ردم بمعدات ثقيلة على < 1.5m من الماسورة<br>
• لا استخدام زيت محرك أو شحم عادي كـ Lubricant للـ Rubber Ring<br>
• لا قطع Rubber Ring لتسهيل التركيب — الاستبدال إلزامي
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04</td><td>فحص المواسير والوصلات والانحدار قبل الردم الجانبي</td><td>QC + Consultant</td><td>Pipe Laying Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Foul Sewer — Pipe Laying Phase
</div>
<h3>🔩 Sewer Pipe Laying — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Bedding (Zone 1)</td><td>Granular Type S, 100mm under pipe</td><td>Ashghal</td></tr>
<tr><td>Gradient (DN150)</td><td>Min 1:150 (self-cleansing 0.75 m/s)</td><td>Ashghal</td></tr>
<tr><td>Gradient (DN225)</td><td>Min 1:225</td><td>Ashghal</td></tr>
<tr><td>Level Tolerance</td><td>±10mm invert level</td><td>Ashghal</td></tr>
<tr><td>Joint Gap</td><td>≤5mm for UPVC push-fit</td><td>BS EN 1401</td></tr>
<tr><td>Max Unsupported Length</td><td>3×pipe length before backfill</td><td>Ashghal</td></tr>
<tr><td>Marker Tape</td><td>Green — "FOUL SEWER" / 300mm above crown</td><td>Ashghal</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: Engineer must approve invert levels and gradient before backfilling.
</div>
</div>
<h3>Pipe Laying Requirements — Foul Sewer</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Verification</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Laying Direction</td><td>Downstream to upstream — spigot faces flow direction</td><td>Visual</td><td>Each pipe</td><td>BS EN 1610</td></tr>
<tr><td>Gradient Check</td><td>Every 3 pipes with laser level</td><td>Laser Level</td><td>Every 3 pipes</td><td>Ashghal</td></tr>
<tr><td>Rubber Ring Lubricant</td><td>Manufacturer-approved only — no engine oil</td><td>Visual</td><td>Every joint</td><td>ISO 4435</td></tr>
<tr><td>Joint Gap</td><td>10mm minimum for thermal movement</td><td>Measurement</td><td>Sample</td><td>Ashghal</td></tr>
<tr><td>Joint Visual Check</td><td>Ring seated + gap correct + no rollback</td><td>Visual</td><td>Every joint</td><td>BS EN 1610</td></tr>
<tr><td>Marker Tape</td><td>Green, 300mm above pipe — "FOUL SEWER"</td><td>Visual</td><td>Per pipe run</td><td>Ashghal</td></tr>
</table></div>
<p><strong>PROHIBITED:</strong> Connection of storm water to foul sewer — ILLEGAL. No backfill before HP-04 joint inspection.</p>
<p><strong>HP-04:</strong> Pipe + joint + gradient inspection BEFORE lateral backfill</p>
</div>
` },


  ss_manholes: { title: '🕳️ Foul Sewer — بناء Manholes', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">بناء Manholes</span></div>
<button onclick="document.getElementById('vid-ss-manholes').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-manholes" accept="video/*" style="display:none" data-player="vid-player-ss-manholes" data-ph="vid-ph-ss-manholes" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-manholes" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">بناء الـ MH، Benching، تغطية الغطاء</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ss-manholes" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 2 | BS EN 1917 | Ashghal Standard Manholes</div>

<h3>📐 1. أنواع وأحجام Manholes — QCS 2024</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>القطر الداخلي</th><th>الاستخدام</th><th>أقصى عمق</th><th>المرجع</th></tr>
<tr><td>Type 1 — Standard</td><td>900mm ID</td><td>خطوط ≤DN300 | عمق ≤3m</td><td>3.0m</td><td>BS EN 1917</td></tr>
<tr><td>Type 2 — Standard</td><td>1200mm ID</td><td>خطوط DN300–600 | عمق ≤5m</td><td>5.0m</td><td>BS EN 1917</td></tr>
<tr><td>Type 3 — Large</td><td>1500mm ID</td><td>خطوط >DN600 | تقاطعات</td><td>6.0m</td><td>BS EN 1917 / QCS</td></tr>
<tr><td>Type 4 — Drop MH</td><td>≥1200mm ID</td><td>فرق منسوب >0.6m</td><td>حسب التصميم</td><td>Ashghal</td></tr>
<tr><td>Inspection Chamber</td><td>600mm ID</td><td>تفتيش فقط — ≤DN150</td><td>1.0m</td><td>BS EN 1917</td></tr>
</table></div>

<h3>📐 2. جدول مواصفات المواد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المادة / المواصفة</th><th>المعيار</th><th>الاختبار</th></tr>
<tr><td>Base Slab</td><td>بيتون C35 — سماكة 200mm — T16@200 مزدوج</td><td>QCS S8 P2</td><td>Cube Test كل صبة</td></tr>
<tr><td>Precast Rings</td><td>Precast Concrete BS EN 1917 — Grade C35</td><td>BS EN 1917</td><td>شهادة المصنع + Visual</td></tr>
<tr><td>Mortar Joints بين Rings</td><td>ملاط 1:2 (Cement:Sand) — سماكة 12mm</td><td>QCS S8</td><td>بصري — لا فجوات</td></tr>
<tr><td>Benching</td><td>ملاط 1:2 — أملس Steel Float Finish</td><td>QCS S8 P2</td><td>بصري — لا تشقق</td></tr>
<tr><td>Channel (قاع MH)</td><td>نفس قطر الماسورة — ملاط أملس — ميل 1:12</td><td>BS EN 1917</td><td>بصري + Level</td></tr>
<tr><td>Adjustment Rings</td><td>Precast ≤ 3 Rings — إجمالي ≤ 300mm</td><td>Ashghal</td><td>بصري</td></tr>
<tr><td>Cover Slab</td><td>C35 — 150mm — أو Precast Cone</td><td>QCS S8</td><td>بصري</td></tr>
<tr><td>Step Irons</td><td>HDPE-coated steel BS EN 13101 — كل 300mm</td><td>BS EN 13101</td><td>Load Test + بصري</td></tr>
<tr><td>External Waterproofing</td><td>Bitumen Paint 2 طبقات + Visqueen Membrane</td><td>QCS S8</td><td>بصري + سماكة 3mm min</td></tr>
<tr><td>Haunching</td><td>C20 Concrete حول أساس الـ Manhole</td><td>QCS S8</td><td>بصري</td></tr>
</table></div>

<h3>📐 3. Cover & Frame — فئات الأحمال</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Class</th><th>الحمل الأقصى</th><th>الموقع</th><th>المرجع</th></tr>
<tr><td>B125</td><td>125 kN</td><td>أرصفة + مشاة فقط</td><td>BS EN 124</td></tr>
<tr><td>C250</td><td>250 kN</td><td>مواقف السيارات</td><td>BS EN 124</td></tr>
<tr><td>D400</td><td>400 kN</td><td>طرق المرور العام — الأكثر شيوعاً في قطر</td><td>BS EN 124 / Ashghal</td></tr>
<tr><td>E600</td><td>600 kN</td><td>مناطق صناعية — طرق ثقيلة</td><td>BS EN 124</td></tr>
<tr><td>F900</td><td>900 kN</td><td>مطارات + موانئ + مناطق استثنائية</td><td>BS EN 124</td></tr>
</table></div>
<p style="font-size:11px;color:var(--text2);margin-top:4px;">⚡ الافتراضي في طرق الدوحة = D400 ما لم يُحدد غيره في الرسومات.</p>

<h3>📐 4. جدول الاختبارات — Manhole Testing</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>الإجراء</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Water Tightness Test</td><td>ملء بالمياه حتى top of highest pipe — 24 hour انتظار</td><td>انخفاض ≤ 1/10 قطر الـ MH (بالمتر)</td><td>كل Manhole</td><td>BS EN 1917 / QCS S8</td></tr>
<tr><td>Benching Smoothness</td><td>فحص بصري + Steel Rule</td><td>لا نقرات — سطح أملس متصل</td><td>كل Manhole</td><td>QCS S8</td></tr>
<tr><td>Cover Level Survey</td><td>Total Station أو Digital Level</td><td>± 5mm من مستوى الطريق</td><td>كل Manhole</td><td>Ashghal</td></tr>
<tr><td>Verticality</td><td>Plumb Bob أو Spirit Level</td><td>± 10mm من الرأسي</td><td>كل Manhole</td><td>QCS S8</td></tr>
<tr><td>Step Iron Load Test</td><td>Apply 1.5 kN load على كل Step</td><td>لا انفصال — لا حركة</td><td>عينة 10% min</td><td>BS EN 13101</td></tr>
<tr><td>Channel Gradient</td><td>Level Check</td><td>Invert يطابق مناسيب المواسير ± 5mm</td><td>كل Manhole</td><td>QCS S8</td></tr>
<tr><td>Joint Integrity (Rings)</td><td>بصري + Feeler Gauge</td><td>لا فجوات — لا تشقق — ملاط متصل</td><td>كل Manhole</td><td>BS EN 1917</td></tr>
<tr><td>Concrete Cube Test</td><td>3 cubes لكل صبة Base Slab</td><td>≥ 35 N/mm² @ 28 days</td><td>كل صبة</td><td>BS EN 12390</td></tr>
</table></div>

<h3>🔴 5. Hold Points — Manholes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05A</td><td>اعتماد Base Slab (Concrete Cube + Level) قبل الرفع</td><td>QC + Consultant</td><td>ITR-05A + Cube Results</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05B</td><td>Water Tightness Test Pass قبل الردم الجانبي</td><td>QC + Consultant</td><td>Water Tightness Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05C</td><td>Cover Level ± 5mm + Class صح قبل الأسفلت</td><td>QC + Surveyor</td><td>Level Survey Certificate</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable — مرفوض فوراً في الموقع</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Precast Rings بدون شهادة مصنع BS EN 1917<br>
• ❌ Benching بدون ميل أو أسطح خشنة تسبب ركود الصرف<br>
• ❌ Adjustment Rings أكثر من 3 Rings أو إجمالي > 300mm<br>
• ❌ Cover Class أقل من D400 في طرق المرور العام<br>
• ❌ Step Irons بالحديد العادي بدون HDPE Coating<br>
• ❌ تغطية Manhole بدون Bitumen Waterproofing<br>
• ❌ Cover Level أعلى من مستوى الطريق — خطر الدهس<br>
• ❌ Channel مقطوع أو غير متصل بمجرى التدفق الطبيعي
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Manhole Construction</span></div>
<button onclick="document.getElementById('vid-ss-manholes-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-manholes-en" accept="video/*" style="display:none" data-player="vid-player-ss-manholes-en" data-ph="vid-ph-ss-manholes-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-manholes-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Manhole building, benching, cover installation</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ss-manholes-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | BS EN 1917 | Manhole Construction</div>
<h3>Manhole Sizes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Type</th><th>Internal Dia.</th><th>Application</th><th>Max Depth</th></tr>
<tr><td>Type 1</td><td>900mm</td><td>Pipes ≤DN300 | depth ≤3m</td><td>3.0m</td></tr>
<tr><td>Type 2</td><td>1200mm</td><td>Pipes DN300–600 | depth ≤5m</td><td>5.0m</td></tr>
<tr><td>Type 3</td><td>1500mm</td><td>Pipes >DN600 | junctions</td><td>6.0m</td></tr>
<tr><td>Drop MH</td><td>≥1200mm</td><td>Level difference >0.6m</td><td>Design</td></tr>
</table></div>
<h3>Cover Classes — BS EN 124</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Class</th><th>Load</th><th>Location</th></tr>
<tr><td>B125</td><td>125 kN</td><td>Footpaths only</td></tr>
<tr><td>D400</td><td>400 kN</td><td>Public roads — default Qatar</td></tr>
<tr><td>E600</td><td>600 kN</td><td>Industrial / heavy roads</td></tr>
<tr><td>F900</td><td>900 kN</td><td>Airport / port zones</td></tr>
</table></div>
<h3>Testing Schedule</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Method</th><th>Pass Criterion</th><th>Frequency</th></tr>
<tr><td>Water Tightness</td><td>Fill to top pipe + 24hr wait</td><td>Drop ≤ 1/10 MH diameter (m)</td><td>Every MH</td></tr>
<tr><td>Cover Level</td><td>Total Station survey</td><td>± 5mm of road level</td><td>Every MH</td></tr>
<tr><td>Verticality</td><td>Plumb bob</td><td>± 10mm from vertical</td><td>Every MH</td></tr>
<tr><td>Cube Test (base slab)</td><td>3 cubes per pour</td><td>≥35 N/mm² @ 28 days</td><td>Every pour</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>HP-05A:</strong> Base Slab approval before ring erection<br>
<strong>HP-05B:</strong> Water Tightness Test pass before backfilling<br>
<strong>HP-05C:</strong> Cover level ± 5mm before final surfacing<br><br>
<strong>REJECT on site:</strong> Rings without BS EN 1917 cert | Cover class below D400 in roads | Bare steel step irons | Adjustment rings >3 or >300mm total
</div>
</div>
` },

  ss_testing: { title: '🧪 Foul Sewer — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبارات الصرف الصحي — Air Test + CCTV</span>
<button onclick="document.getElementById('vid-ss-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-testing" accept="video/*" style="display:none" data-player="vid-player-ss-testing" data-ph="vid-ph-ss-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | BS EN 1610 | Air Test + CCTV Survey
</div>
<h3>📐 Air Test — الاختبار الهوائي — BS EN 1610</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th><th>Min Frequency</th></tr><tr><td>ضغط الاختبار</td><td>100 mm WG (Water Gauge)</td><td>BS EN 1610</td><td>كل section ≤ 500m</td></tr><tr><td>مدة الاختبار</td><td>5 دقائق</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>معيار القبول</td><td>انخفاض ≤ 25 mm WG في 5 دقائق</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>الانخفاض المسموح</td><td>25 mm WG</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>طريقة الاختبار</td><td>Inflate + Stabilize 5min + Record for 5min</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>أقصى طول section</td><td>500m لكل اختبار</td><td>Ashghal</td><td>—</td></tr><tr><td>تطبيق على Manholes</td><td>يُضاف اختبار تسرب مائي مستقل (Flood Test)</td><td>QCS S8</td><td>Per manhole</td></tr></table></div>
<h3>📐 CCTV Survey — المسح التلفزيوني</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th><th>التكرار</th></tr><tr><td>نسبة التغطية</td><td>100% من إجمالي الشبكة</td><td>Ashghal</td><td>After backfill + before handover</td></tr><tr><td>Grade المقبول</td><td>Grade 1 أو Grade 2 فقط</td><td>WRc Sewer Defect Codes</td><td>Per pipe</td></tr><tr><td>Grade 3</td><td>ملاحظات — يُقرر المهندس</td><td>WRc</td><td>Per finding</td></tr><tr><td>Grade 4 أو 5</td><td>رفض + إعادة تنفيذ إلزامية</td><td>WRc</td><td>Per finding</td></tr><tr><td>تقرير CCTV</td><td>Video Recording + Written Report + Grade Per Defect</td><td>Ashghal</td><td>Per section</td></tr><tr><td>التوقيت</td><td>بعد Backfill وقبل التسليم</td><td>Ashghal</td><td>100%</td></tr><tr><td>وضع الكاميرا</td><td>Self-propelled CCTV Robot من Manhole لـ Manhole</td><td>Ashghal</td><td>Per pipe run</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>التوثيق</th></tr><tr><td>HP-01</td><td>Air Test Pass: ≤25mm WG drop / 5min</td><td>Air Test Certificate per section</td></tr><tr><td>HP-02</td><td>CCTV 100% Grade ≤ 2 مكتمل</td><td>CCTV Report + Video Evidence</td></tr><tr><td>HP-03</td><td>Manhole Levels ± 5mm من مستوى الطريق</td><td>Survey Certificate</td></tr><tr><td>HP-04</td><td>As-Built GIS معتمد</td><td>As-Built Drawings + GIS Data</td></tr></table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Sewer Testing — Air Test + CCTV</span>
<button onclick="document.getElementById('vid-ss-testing-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-testing-en" accept="video/*" style="display:none" data-player="vid-player-ss-testing-en" data-ph="vid-ph-ss-testing-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-testing-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-ss-testing-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Air Test — BS EN 1610</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Specification</th><th>Reference</th><th>Frequency</th></tr><tr><td>Test Pressure</td><td>100 mm WG (Water Gauge)</td><td>BS EN 1610</td><td>Per section ≤500m</td></tr><tr><td>Test Duration</td><td>5 minutes</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>Pass Criterion</td><td>Pressure drop ≤ 25mm WG in 5 minutes</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>Max Section Length</td><td>500m per test</td><td>Ashghal</td><td>—</td></tr></table></div><h3>CCTV Survey</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Specification</th><th>Reference</th><th>Frequency</th></tr><tr><td>Coverage</td><td>100% of all pipes</td><td>Ashghal</td><td>After backfill</td></tr><tr><td>Acceptable Grade</td><td>Grade 1 or Grade 2 only</td><td>WRc</td><td>Per pipe</td></tr><tr><td>Grade 4 or 5</td><td>Reject + mandatory redo</td><td>WRc</td><td>Per finding</td></tr><tr><td>Report</td><td>Video + Written Report + Defect Code</td><td>Ashghal</td><td>Per section</td></tr><tr><td>Timing</td><td>After backfill, before handover</td><td>Ashghal</td><td>100%</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>Condition</th><th>Documentation</th></tr><tr><td>HP-01</td><td>Air Test: ≤25mm WG drop / 5min</td><td>Air Test Certificate</td></tr><tr><td>HP-02</td><td>CCTV 100% Grade ≤ 2 complete</td><td>CCTV Report + Video</td></tr><tr><td>HP-03</td><td>Manhole Levels ±5mm</td><td>Survey Certificate</td></tr></table></div>
</div>
` },

  ss_backfill: { title: '🏗️ Foul Sewer — الردم', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 الردم — Foul Sewer</span>
<button onclick="document.getElementById('vid-ss-backfill').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-backfill" accept="video/*" style="display:none" data-player="vid-player-ss-backfill" data-ph="vid-ph-ss-backfill" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-backfill" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-backfill" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Trench Backfill</div>

<h3>📐 1. مواصفات الردم — جدول الطبقات الكامل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>درجة الدمك</th><th>سماكة الطبقة</th><th>طريقة الاختبار</th><th>تكرار</th><th>المرجع</th></tr>
<tr><td>0–300mm فوق الماسورة</td><td>رمل نظيف — يدوي فقط</td><td>≥ 90% MDD</td><td>—</td><td>Sand Cone / DCP</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>300–600mm</td><td>Selected Fill ≤ 75mm | PI ≤ 10</td><td>≥ 93% MDD</td><td>300mm max/layer</td><td>Sand Cone / DCP</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>600mm للسطح (تحت رصيف/طريق)</td><td>Selected Fill + QCS S6 Subbase</td><td>≥ 95–98% MDD</td><td>200mm max/layer</td><td>Sand Cone</td><td>كل 500m²</td><td>QCS S6</td></tr>
<tr><td>Marker Tape (أخضر)</td><td>Polythene — "FOUL SEWER" — أخضر</td><td>—</td><td>300mm فوق الماسورة</td><td>100% بصري</td><td>كل Pipe Run</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. جدول الاختبارات — Compaction Testing</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Moisture Density Relation (Proctor)</td><td>MDD + OMC من المختبر</td><td>BS 1377 Part 4</td><td>كل مصدر مادة</td><td>QCS S6</td></tr>
<tr><td>In-situ Density (Sand Cone)</td><td>≥ 90-98% MDD حسب الطبقة</td><td>ASTM D1556 / BS 1377</td><td>كل 500m² / 50m للخندق</td><td>Ashghal</td></tr>
<tr><td>DCP (Dynamic Cone)</td><td>CBR ≥ 8% للطبقة الأخيرة</td><td>ASTM D6951</td><td>عند الشك / قرب Structures</td><td>Ashghal</td></tr>
<tr><td>Surface Settlement Check</td><td>لا هبوط مرئي بعد 48hr</td><td>بصري + مستوى</td><td>100%</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 3. ممارسات محظورة</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ردم بمعدات ثقيلة مباشرة على الماسورة (< 1.5m) — ممنوع<br>
• استخدام تربة الحفر المرفوضة كـ Selected Fill — ممنوع<br>
• ردم بدون Marker Tape أخضر — NCR فوري<br>
• تجاوز السماكة المحددة للطبقة دون اختبار — ممنوع<br>
• ردم قبل إتمام Air Test و CCTV — لا يسمح
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07</td><td>Air Test Pass + CCTV مكتمل قبل الردم النهائي</td><td>QC + Consultant + Ashghal</td><td>Test Certificates</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08</td><td>Compaction Test ≥ 95% MDD قبل إعادة الطريق</td><td>QC + Consultant</td><td>Compaction Test Report</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Foul Sewer — Backfill Phase
</div>
<h3>🔩 Sewer Trench Backfill — Requirements</h3>
<table class="dm-table">
<tr><th>Zone</th><th>Material</th><th>Compaction</th></tr>
<tr><td>Zone 1 (Pipe surround)</td><td>Granular Type S — hand compact only</td><td>No mechanical compaction</td></tr>
<tr><td>Zone 2 (300mm above pipe)</td><td>Selected fill — SO3 ≤0.5%</td><td>Light plate compactor</td></tr>
<tr><td>Zone 3 (Upper fill)</td><td>Approved excavated material</td><td>≥95% MDD / 300mm layers</td></tr>
<tr><td>Under carriageway</td><td>Granular Type B</td><td>100% BS Heavy</td></tr>
</table>
<div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Density test required: 1 per 50m trench length per layer. Reject and re-compact if <95% MDD.
</div>
</div>
<h3>Backfill Layers — Foul Sewer</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Zone</th><th>Material</th><th>Compaction</th><th>Layer Thickness</th><th>Test</th><th>Frequency</th></tr>
<tr><td>0–300mm above pipe</td><td>Clean sand — manual compaction only</td><td>≥ 90% MDD</td><td>—</td><td>Sand Cone</td><td>Every 50m</td></tr>
<tr><td>300–600mm</td><td>Selected Fill ≤ 75mm | PI ≤ 10</td><td>≥ 93% MDD</td><td>300mm max/layer</td><td>Sand Cone</td><td>Every 50m</td></tr>
<tr><td>600mm to surface</td><td>Selected Fill + road subbase</td><td>≥ 95–98% MDD</td><td>200mm max/layer</td><td>Sand Cone</td><td>Every 500m²</td></tr>
<tr><td>Marker Tape</td><td>Green — "FOUL SEWER"</td><td>—</td><td>300mm above pipe</td><td>Visual 100%</td><td>Per pipe run</td></tr>
</table></div>
<p><strong>HP-07:</strong> Air test pass + CCTV complete BEFORE final backfill<br>
<strong>HP-08:</strong> Compaction ≥ 95% MDD BEFORE road reinstatement</p>
</div>
` },


  ss_handover: { title: '✅ Foul Sewer — التسليم', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تسليم شبكة الصرف الصحي</span></div>
<button onclick="document.getElementById('vid-ss-handover').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-handover" accept="video/*" style="display:none" data-player="vid-player-ss-handover" data-ph="vid-ph-ss-handover" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-handover" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">CCTV Final، As-Built، تشغيل</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ss-handover" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 2 | Ashghal | Foul Sewer Handover Requirements</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى المطلوب</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + Long Section مع المناسيب الفعلية<br>GPS Coordinates لكل Manhole + Pipe<br>نقاط التوصيل مع الشبكة القائمة</td><td>3 ورقي + 1 رقمي DWG/PDF</td><td>Ashghal / MME</td></tr>
<tr><td>CCTV Final Report</td><td>100% تغطية — Video + Written Report<br>WRc Defect Codes + Grade per defect<br>Grade ≤ 2 لكل المواسير</td><td>Digital (USB) + Hard Copy</td><td>Ashghal</td></tr>
<tr><td>Air Test Certificates</td><td>كل sections — 100mm WG / 5min / ≤25mm drop<br>تاريخ + الرقم التسلسلي للـ Section</td><td>أصلي + نسختان</td><td>QC / Ashghal</td></tr>
<tr><td>Manhole Schedule</td><td>جدول كل Manholes: Ref / Invert Level / Cover Level<br>Type / Depth / Cover Class / GPS</td><td>ورقي + رقمي</td><td>Ashghal</td></tr>
<tr><td>Material Certificates</td><td>Mill Certs للمواسير + Rings + Covers<br>BS EN 1917 للـ Rings | BS EN 124 للـ Covers</td><td>أصلي</td><td>Manufacturer</td></tr>
<tr><td>ITP Signed Register</td><td>كل ITPs مغلقة — صفر NCR مفتوح</td><td>أصلي موقّع</td><td>QC + Consultant</td></tr>
<tr><td>Compaction Test Results</td><td>كل نتائج الردم — يُظهر ≥95% MDD</td><td>أصلي + نسخة</td><td>Lab + QC</td></tr>
<tr><td>NCR Log (Closed)</td><td>كل NCRs موثقة ومغلقة بالإجراء التصحيحي</td><td>أصلي</td><td>QC</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم النهائي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>Air Test</td><td>100% Pass — كل Sections</td><td>QC</td></tr>
<tr><td>CCTV Final</td><td>100% Grade ≤ 2 — بعد آخر ردم</td><td>Ashghal Inspector</td></tr>
<tr><td>Manhole Cover Levels</td><td>± 5mm من مستوى الطريق</td><td>QC + Surveyor</td></tr>
<tr><td>All Manholes Accessible</td><td>كل الغطاءات تُفتح — Locking OK</td><td>QC</td></tr>
<tr><td>Marker Tape</td><td>أخضر — "FOUL SEWER" — موجود في كل الخندق</td><td>QC</td></tr>
<tr><td>Compaction Test</td><td>100% Pass ≥ 95% MDD للطبقات النهائية</td><td>Lab + QC</td></tr>
<tr><td>No Cross Connection</td><td>تأكيد بصري وـ CCTV — لا اتصال بـ Storm Water</td><td>QC + Ashghal</td></tr>
<tr><td>Road Reinstatement</td><td>Subbase + Base + Asphalt — بنفس مواصفة الطريق الأصلي</td><td>QC</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP — Defects Liability Period</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>مدة DLP</td><td>12 شهر من تاريخ التسليم الرسمي (TOC)</td></tr>
<tr><td>CCTV Re-inspection</td><td>عند نهاية الـ DLP — 100% — قبل الإغلاق النهائي</td></tr>
<tr><td>Settlement Check</td><td>كل 3 أشهر — فحص ميداني لهبوط الطريق</td></tr>
<tr><td>Blockage Response</td><td>خلال 24hr من الإبلاغ — High-pressure Jetting</td></tr>
<tr><td>Leak Repair</td><td>خلال 48hr من الاكتشاف</td></tr>
<tr><td>Manhole Cover Check</td><td>كل 6 أشهر — يُبلَّغ عن الأغطية المكسورة فوراً</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09A</td><td>CCTV Final Report 100% Grade ≤ 2 معتمد</td><td>Ashghal Inspector</td><td>CCTV Report + Video Evidence</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09B</td><td>As-Built Drawings مُسلَّمة ومعتمدة</td><td>Consultant + Ashghal</td><td>Approved As-Built Set</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09C</td><td>موافقة Ashghal / MME الرسمية — TOC Certificate</td><td>Ashghal / MME</td><td>Taking Over Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Sewer Network Handover</span></div>
<button onclick="document.getElementById('vid-ss-handover-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-handover-en" accept="video/*" style="display:none" data-player="vid-player-ss-handover-en" data-ph="vid-ph-ss-handover-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Final CCTV, as-built, commissioning</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ss-handover-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Foul Sewer Handover</div>
<h3>Handover Documents</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Document</th><th>Content</th><th>Copies</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + long section, actual levels, GPS per MH</td><td>3 hard + 1 digital</td></tr>
<tr><td>CCTV Final Report</td><td>100% coverage + WRc grades — Grade ≤ 2 all pipes</td><td>Digital + hard</td></tr>
<tr><td>Air Test Certs</td><td>All sections — 100mmWG / 5min / ≤25mm drop</td><td>Original + 2</td></tr>
<tr><td>Manhole Schedule</td><td>All MH: Ref / invert / cover / depth / class / GPS</td><td>Hard + digital</td></tr>
<tr><td>Material Certs</td><td>Pipes + rings (BS EN 1917) + covers (BS EN 124)</td><td>Original</td></tr>
<tr><td>Compaction Results</td><td>All backfill ≥ 95% MDD confirmed</td><td>Original</td></tr>
<tr><td>Closed NCR Log</td><td>Zero open NCRs with corrective actions</td><td>Original</td></tr>
</table></div>
<h3>DLP — 12 Months from TOC</h3>
<p>• CCTV re-inspection at DLP end (100%)<br>
• Settlement check every 3 months<br>
• Blockage response within 24hr<br>
• Leak repair within 48hr<br>
• Manhole cover check every 6 months</p>
<p><strong>HP-09A:</strong> CCTV Final 100% Grade ≤ 2 approved by Ashghal<br>
<strong>HP-09B:</strong> As-Built submitted and approved<br>
<strong>HP-09C:</strong> Formal Ashghal/MME TOC Certificate</p>
</div>
` },


  sw_survey: { title: '📐 الصرف السطحي — الدراسة والتصميم', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Pre-Construction</div>
<h3>📋 متطلبات ما قبل التنفيذ</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr><tr><td>مخططات التصميم</td><td>معتمدة من Ashghal / MME</td></tr><tr><td>Catchment Analysis</td><td>تحليل مساحة التصريف والتدفق</td></tr><tr><td>Outfall Location</td><td>موقع مخرج الشبكة معتمد</td></tr><tr><td>Gully Spacing</td><td>كل 25-40m حسب الانحدار</td></tr><tr><td>Existing Services</td><td>NOC من كل الجهات</td></tr></table>
<h3>⚠️ قواعد أساسية</h3>
<p>• عدم توصيل Foul Sewer بشبكة السطحي — <strong>مخالفة قانونية</strong><br>• Silt Trap إلزامي قبل مخرج الشبكة<br>• Outfall Protection من التآكل</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد المخططات والـ Outfall قبل الحفر</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📐 الصرف السطحي — الدراسة والتصميم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>متطلبات التصميم — Storm Water</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>المعايير التصميمية</td><td>Design Return Period: 5-year for local, 25-year for trunk<br>Time of Concentration calculation<br>Rational Method: Q = CIA/360<br>Min pipe DN300</td><td>QCS 2024 S8 / Ashghal</td></tr>
<tr><td>الدراسة الطبوغرافية</td><td>Total Station survey — Grid 25m<br>Benchmarks كل 200m</td><td>Ashghal Survey Manual</td></tr>
<tr><td>Utility Detection</td><td>GPR scan قبل الحفر — كشف المرافق القائمة</td><td>Ashghal NOC</td></tr>
<tr><td>Soil Investigation</td><td>Trial pits كل 100m أو BH حسب الأهمية<br>GWT level confirmation</td><td>QCS P3</td></tr>
<tr><td>Drawings</td><td>Plan + Long Section + Cross Section + Details<br>1:500 plan, 1:100 H / 1:10 V for sections</td><td>Ashghal CAD Standards</td></tr>
</tbody></table>
` },

  sw_materials: { title: '🔩 الصرف السطحي — المواد والمواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مواد الصرف السطحي</span>
<button onclick="document.getElementById('vid-sw-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-materials" accept="video/*" style="display:none" data-player="vid-player-sw-materials" data-ph="vid-ph-sw-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-materials" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-sw-materials" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Materials</div>

<h3>📐 1. أنواع مواسير الصرف السطحي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>المعيار</th><th>Stiffness Class</th><th>القطر</th><th>الاستخدام</th><th>اختبار المصنع</th></tr>
<tr><td>RCP — Reinforced Concrete Pipe</td><td>BS 5911 Part 100</td><td>120D / 150D</td><td>DN300 – DN1800</td><td>الخطوط الرئيسية</td><td>Crushing Load Test</td></tr>
<tr><td>HDPE Corrugated (SN8)</td><td>EN 13476 / ISO 21138</td><td>SN8 minimum</td><td>DN200 – DN1200</td><td>التوزيع + Cross-roads</td><td>Ring Stiffness Test</td></tr>
<tr><td>uPVC SN8</td><td>EN 13476 / ISO 21138</td><td>SN8</td><td>DN150 – DN600</td><td>التوزيع الثانوي</td><td>Ring Stiffness + Impact</td></tr>
<tr><td>GRP (Glass Reinforced Plastic)</td><td>ISO 10467</td><td>SN5000 min</td><td>DN600+</td><td>الخطوط الكبيرة</td><td>Stiffness + Hydrostatic</td></tr>
<tr><td>Box Culvert RC</td><td>BS 5911 Part 200</td><td>حسب التحميل</td><td>Bespoke</td><td>عبور الطرق</td><td>Crushing + Permeability</td></tr>
</table></div>

<h3>📐 2. مواد Gullies والمداخل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المادة</th><th>المواصفة</th><th>Load Class</th><th>الاختبار</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Gully Grating — طرق</td><td>Cast Iron / Ductile Iron</td><td>D400 (400 kN)</td><td>Load Test</td><td>كل دفعة</td><td>BS EN 124</td></tr>
<tr><td>Gully Grating — مشاة / رصيف</td><td>Cast Iron</td><td>B125 (125 kN)</td><td>Load Test</td><td>كل دفعة</td><td>BS EN 124</td></tr>
<tr><td>Gully Frame</td><td>Ductile Iron</td><td>D400</td><td>Visual + Dimensions</td><td>كل دفعة</td><td>BS EN 124</td></tr>
<tr><td>Silt Bucket</td><td>HDPE — مقاوم للكيماويات</td><td>—</td><td>Visual + Dimensions</td><td>كل unit</td><td>Ashghal Std.</td></tr>
<tr><td>Gully Body</td><td>Precast Concrete C30 أو uPVC</td><td>—</td><td>Strength Test</td><td>كل batch</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 3. مواصفات Manholes — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>الاختبار</th><th>المرجع</th></tr>
<tr><td>Manhole Rings</td><td>Precast RC — BS 5911 Part 200</td><td>Crushing Load</td><td>BS 5911</td></tr>
<tr><td>Concrete Grade</td><td>≥ C35 — Sulphate-resistant</td><td>Cube Test @ 28 days</td><td>QCS S12</td></tr>
<tr><td>Manhole Cover — طرق رئيسية</td><td>D400 (400 kN) — Ductile Iron</td><td>Load Test</td><td>BS EN 124</td></tr>
<tr><td>Manhole Cover — طرق فرعية</td><td>C250 (250 kN)</td><td>Load Test</td><td>BS EN 124</td></tr>
<tr><td>Step Irons</td><td>HDPE Coated Steel كل 300mm</td><td>Visual + Dimensions</td><td>Ashghal</td></tr>
<tr><td>Joint Sealant</td><td>Hydrophilic Rubber Strip أو Bituminous</td><td>Visual 100%</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 4. المواد المرفوضة فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• RCP بدون شهادة Crushing Load Test — رفض<br>
• HDPE أو uPVC بـ Ring Stiffness < SN8 — رفض<br>
• Gully Grating بدون D400 في الطرق — رفض فوري + NCR<br>
• Manhole Cover بدون Load Class صحيح — رفض<br>
• Silt Bucket مكسور أو مشوه — رفض<br>
• مواسير بدون علامات المصنع أو Class — رفض
</div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>اعتماد Material Submittal — كل مواد الصرف السطحي</td><td>Consultant + Ashghal</td><td>Approved MAR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>استلام + فحص المواد في الموقع</td><td>QC Engineer</td><td>Delivery Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Storm Water Drainage — Materials
</div>
<h3>🌧️ Storm Drainage Materials — QCS 2024</h3>
<table class="dm-table">
<tr><th>Material</th><th>Specification</th><th>Standard</th></tr>
<tr><td>Pipe (Main)</td><td>RC Pipe Class 120 / HDPE SDR 17</td><td>BS 5911 / EN 13476</td></tr>
<tr><td>Pipe (Catchment)</td><td>UPVC SN8 Class 400</td><td>BS EN 1401</td></tr>
<tr><td>Manholes</td><td>RC Grade C40 / Precast preferred</td><td>BS 5911-3</td></tr>
<tr><td>Gully Covers</td><td>ductile iron D400 (carriageway)</td><td>BS EN 124</td></tr>
<tr><td>Bedding (Zone 1)</td><td>Granular Type B (under pipe)</td><td>Ashghal</td></tr>
<tr><td>Marker Tape</td><td>Blue — "STORM WATER DRAIN"</td><td>Ashghal</td></tr>
<tr><td>Joint Sealing</td><td>EPDM rubber ring / push-fit</td><td>BS EN 681</td></tr>
</table>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ All materials require Ashghal material approval prior to delivery. Submit MAR with mill certificates.
</div>
</div>
<h3>Pipe Types — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Pipe Type</th><th>Standard</th><th>Class</th><th>Diameter</th><th>Use</th></tr>
<tr><td>RCP — Reinforced Concrete</td><td>BS 5911 Part 100</td><td>120D / 150D</td><td>DN300–DN1800</td><td>Main lines</td></tr>
<tr><td>HDPE Corrugated</td><td>EN 13476</td><td>SN8 minimum</td><td>DN200–DN1200</td><td>Distribution + crossings</td></tr>
<tr><td>uPVC</td><td>EN 13476</td><td>SN8</td><td>DN150–DN600</td><td>Secondary distribution</td></tr>
<tr><td>GRP</td><td>ISO 10467</td><td>SN5000+</td><td>DN600+</td><td>Large diameter mains</td></tr>
</table></div>
<h3>Gully Gratings — Load Class</h3>
<p>• Roads (vehicles): <strong>D400 (400 kN)</strong> — BS EN 124<br>
• Footpaths/kerbs: <strong>B125 (125 kN)</strong> — BS EN 124<br>
• Silt Bucket: HDPE, corrosion-resistant — Ashghal standard</p>
<p><strong>HP-01:</strong> Material submittal approval BEFORE supply<br><strong>HP-02:</strong> Delivery inspection + material check</p>
</div>
` },


  sw_excavation: { title: '⛏️ الصرف السطحي — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">حفر الصرف السطحي</span></div>
<button onclick="document.getElementById('vid-sw-excavation').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-excavation" accept="video/*" style="display:none" data-player="vid-player-sw-excavation" data-ph="vid-ph-sw-excavation" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-excavation" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">حفر الخنادق وتحضير السطح</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-excavation" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Excavation</div>
<h3>📐 مواصفات الحفر</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>عمق الحفر</td><td>≥ 0.9m من السطح لأعلى الماسورة</td></tr><tr><td>الانحدار الأدنى</td><td>≥ 1:200 حسب التصميم</td></tr><tr><td>Dewatering</td><td>إزالة المياه قبل الـ Bedding</td></tr></table>
<h3>📐 مواصفات الـ Bedding</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>RCP Bedding</td><td>رمل أو حجر مكسر 150mm — Class B</td></tr><tr><td>HDPE Bedding</td><td>رمل نظيف 150mm مدكوك</td></tr><tr><td>الانحدار الدقيق</td><td>Laser Level ± 5mm</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-03:</strong> فحص Bedding والانحدار قبل وضع المواسير</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Storm Drain Excavation</span></div>
<button onclick="document.getElementById('vid-sw-excavation-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-excavation-en" accept="video/*" style="display:none" data-player="vid-player-sw-excavation-en" data-ph="vid-ph-sw-excavation-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-excavation-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Trench excavation and surface preparation</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-excavation-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ⛏️ الصرف السطحي — الحفر والبيدنج
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },

  sw_laying: { title: '🔧 الصرف السطحي — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تمديد مواسير الصرف السطحي</span></div>
<button onclick="document.getElementById('vid-sw-laying').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-laying" accept="video/*" style="display:none" data-player="vid-player-sw-laying" data-ph="vid-ph-sw-laying" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-laying" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Box Culverts، مواسير صرف، انحدار صحيح</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-laying" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 3 | BS EN 1610 | Ashghal Storm Water</div>

<h3>📐 1. جدول الانحدارات الدنيا — Storm Water Pipes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>قطر الماسورة DN</th><th>أدنى انحدار (Self-Cleansing)</th><th>سرعة التدفق Min</th><th>المرجع</th></tr>
<tr><td>DN300</td><td>1:200 (0.5%)</td><td>0.75 m/s</td><td>Ashghal / CIRIA</td></tr>
<tr><td>DN450</td><td>1:300 (0.33%)</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>DN600</td><td>1:400 (0.25%)</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>DN900</td><td>1:600 (0.17%)</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>DN1200+</td><td>1:1000 (0.1%) — hydraulic design</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>أقصى سرعة (تآكل)</td><td colspan="2">≤ 3.0 m/s لجميع الأقطار</td><td>QCS S8 P3</td></tr>
</table></div>

<h3>📐 2. مواصفات Bedding Classes — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Class</th><th>المادة</th><th>السماكة تحت الماسورة</th><th>الحماية الجانبية</th><th>الاستخدام</th></tr>
<tr><td>Class B</td><td>رمل نظيف ناعم + حصى 10mm</td><td>150mm</td><td>حتى نصف القطر</td><td>RCP في تربة عادية</td></tr>
<tr><td>Class A</td><td>Granular + Concrete Cradle C15</td><td>100mm granular + 100mm concrete</td><td>كامل حتى Crown</td><td>تربة ضعيفة أو RCP كبير</td></tr>
<tr><td>Special</td><td>All-round Granular</td><td>150mm</td><td>150mm فوق Crown</td><td>HDPE / GRP</td></tr>
</table></div>

<h3>📐 3. متطلبات وضع مواسير RCP</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>اتجاه التمديد</td><td>من المصب (Outfall) للمنبع — Socket يواجه المنبع</td><td>QCS S8 P3</td></tr>
<tr><td>Rubber Ring Joint</td><td>Lubricate بالمواد المعتمدة فقط — Flush Joint</td><td>BS 5911</td></tr>
<tr><td>Joint Gap</td><td>≤ 10mm بين المواسير</td><td>BS 5911</td></tr>
<tr><td>Spigot Insertion</td><td>Full insertion حتى الـ Marking Line</td><td>BS 5911</td></tr>
<tr><td>Gradient Check</td><td>Laser Level بعد كل 3 مواسير</td><td>Ashghal</td></tr>
<tr><td>Max Section بين MH</td><td>120m للمواسير المستقيمة</td><td>Ashghal</td></tr>
<tr><td>Alignment Tolerance</td><td>± 25mm أفقي | ± 10mm رأسي</td><td>QCS S8 P3</td></tr>
</table></div>

<h3>📐 4. Box Culverts — متطلبات خاصة</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>Concrete Grade</td><td>C40 Precast / C35 In-Situ</td><td>QCS S8 / BS 5328</td></tr>
<tr><td>Bedding</td><td>Compacted granular 150mm — Level ± 5mm</td><td>QCS S8 P3</td></tr>
<tr><td>Joint Type</td><td>Cast-in Rubber Water-stop + Sealant</td><td>Ashghal</td></tr>
<tr><td>Max Joint Gap</td><td>20mm — مملوء بـ Sealant</td><td>Ashghal</td></tr>
<tr><td>Haunching</td><td>C15 Concrete جانبي إلى نصف الارتفاع</td><td>QCS S8</td></tr>
<tr><td>Wing Walls</td><td>C25 Concrete — حسب الرسومات</td><td>Design Drawings</td></tr>
<tr><td>Headwall Apron</td><td>C25 Concrete + Rip-Rap 300mm</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 5. حماية Outfalls — Anti-Scour</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الحماية</th><th>المواصفة</th><th>الحالة</th></tr>
<tr><td>Rip-Rap</td><td>حجارة ≥ 300mm — طبقة 600mm</td><td>مصارف في تربة / رمال</td></tr>
<tr><td>Concrete Apron</td><td>C25 — سماكة 200mm — بعرض 1.5× قطر الخط</td><td>مصارف كبيرة</td></tr>
<tr><td>Silt Trap</td><td>إلزامي قبل كل Outfall — حجم 0.5m³ minimum</td><td>جميع الـ Outfalls</td></tr>
<tr><td>Marker Sign</td><td>لافتة خضراء "STORM WATER" عند كل فتحة خروج</td><td>إلزامي</td></tr>
</table></div>

<h3>🔴 6. Hold Points — Pipe Laying</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04A</td><td>Gradient Survey Pass بعد تمديد كل Section</td><td>QC + Surveyor</td><td>Level Survey Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04B</td><td>Rubber Ring Joints مكتملة — فحص بصري 100%</td><td>QC</td><td>Joint Inspection Sheet</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04C</td><td>Outfall Apron / Rip-Rap اكتمل قبل التسليم</td><td>QC + Consultant</td><td>ITR-04C</td></tr>
</table></div>

<h3>⛔ 7. مرفوض فوراً في الموقع</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ وضع المواسير من المنبع للمصب (الاتجاه الخاطئ)<br>
• ❌ Rubber Ring غائبة أو خارجة عن وضعها<br>
• ❌ Gradient أقل من الحد الأدنى بدون موافقة Ashghal<br>
• ❌ Box Culvert بدون Rubber Water-stop في الوصلات<br>
• ❌ Outfall بدون Silt Trap أو Rip-Rap / Apron<br>
• ❌ Cross Connection مع شبكة Foul Sewer — إيقاف فوري + NCR
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Storm Drain Pipe Laying</span></div>
<button onclick="document.getElementById('vid-sw-laying-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-laying-en" accept="video/*" style="display:none" data-player="vid-player-sw-laying-en" data-ph="vid-ph-sw-laying-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-laying-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Box culverts, storm pipes, correct gradient</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-laying-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | Ashghal Storm Water Pipe Laying</div>
<h3>Minimum Gradients</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Pipe Size</th><th>Min Gradient</th><th>Min Velocity</th></tr>
<tr><td>DN300</td><td>1:200 (0.5%)</td><td>0.75 m/s</td></tr>
<tr><td>DN450</td><td>1:300 (0.33%)</td><td>0.75 m/s</td></tr>
<tr><td>DN600</td><td>1:400 (0.25%)</td><td>0.75 m/s</td></tr>
<tr><td>DN900</td><td>1:600 (0.17%)</td><td>0.75 m/s</td></tr>
<tr><td>Max velocity</td><td colspan="2">≤ 3.0 m/s (all sizes)</td></tr>
</table></div>
<h3>RCP Installation Key Requirements</h3>
<p>• Lay upstream to downstream — Socket facing upstream<br>• Rubber Ring: lubricate with approved compound, full insertion to marking line<br>• Joint gap ≤ 10mm | Alignment: ±25mm H / ±10mm V<br>• Check gradient with laser level every 3 pipes<br>• Max section between manholes: 120m</p>
<h3>Outfall Protection</h3>
<p>• Rip-Rap: stones ≥300mm / 600mm thick layer for earthen channels<br>• Concrete Apron: C25 / 200mm thick / width = 1.5× pipe diameter<br>• Silt Trap: mandatory before every outfall (min 0.5m³ capacity)</p>
<p><strong>HP-04A:</strong> Gradient survey pass after each section<br>
<strong>HP-04B:</strong> 100% visual rubber ring inspection before side backfill<br>
<strong>HP-04C:</strong> Outfall protection complete before handover</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Pipe laid in wrong direction | Missing rubber ring | Gradient below minimum without Ashghal approval | Outfall without silt trap | Any cross-connection to foul sewer
</div>
</div>
` },

  sw_gullies: { title: '🕳️ الصرف السطحي — Gullies & Manholes', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تركيب Gullies وInlets</span></div>
<button onclick="document.getElementById('vid-sw-gullies').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-gullies" accept="video/*" style="display:none" data-player="vid-player-sw-gullies" data-ph="vid-ph-sw-gullies" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-gullies" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">تركيب الـ Gully، المنسوب الصحيح</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-gullies" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 3 | BS EN 124 | Ashghal Drainage Standards</div>

<h3>📐 1. أنواع Gullies — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>الوصف</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>Road Gully (Trapped)</td><td>مزود بـ Water Seal + Silt Bucket</td><td>طرق المرور — الأكثر شيوعاً</td><td>BS EN 124 / Ashghal</td></tr>
<tr><td>Road Gully (Untrapped)</td><td>بدون Water Seal</td><td>محظور في قطر للطرق العامة</td><td>Ashghal Policy</td></tr>
<tr><td>Kerb Inlet / Side Entry</td><td>مدخل جانبي في الرصيف</td><td>طرق سريعة + مناطق مرتفعة السرعة</td><td>Ashghal</td></tr>
<tr><td>Combined Gully</td><td>مدخل أمامي + جانبي</td><td>منخفضات التصريف</td><td>Ashghal</td></tr>
<tr><td>Sump (Low Point)</td><td>بئر جمع بدون تصريف ثقلي</td><td>نقاط منخفضة مع Pump</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. مواصفات Gully Pot — المواد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المادة</th><th>المعيار</th></tr>
<tr><td>Gully Body</td><td>Precast Concrete C35 أو HDPE Class SN8</td><td>BS 5834 / BS EN 124</td></tr>
<tr><td>Silt Bucket</td><td>Galvanized Steel أو HDPE — سعة ≥ 20 litre</td><td>Ashghal</td></tr>
<tr><td>Outlet Connection</td><td>DN150 أو DN225 — Flexible Joint</td><td>QCS S8 P3</td></tr>
<tr><td>Frame</td><td>Cast Iron BS EN 124 Grade EN-GJL-250</td><td>BS EN 124</td></tr>
<tr><td>Grating</td><td>Ductile Iron Class D400 (طرق) / C250 (أرصفة)</td><td>BS EN 124</td></tr>
<tr><td>Locking Bar</td><td>إلزامي لمنع السرقة — Stainless Steel</td><td>Ashghal Std.</td></tr>
<tr><td>Concrete Surround</td><td>C20 Haunching — 150mm كل جانب</td><td>QCS S8</td></tr>
</table></div>

<h3>📐 3. تباعد Gullies — Spacing Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الطريق / الموقع</th><th>الحد الأقصى للتباعد</th><th>ملاحظة</th></tr>
<tr><td>طريق عادي — نزول 0.5%</td><td>50m</td><td>قياسي Ashghal</td></tr>
<tr><td>طريق سريع — نزول >1%</td><td>70m</td><td>حسب التصريف المحسوب</td></tr>
<tr><td>نقطة منخفضة (Sag)</td><td>إلزامي Gully × 2 متقابلين</td><td>لمنع الفيضان</td></tr>
<tr><td>عند Kerb Return (منعطف)</td><td>Gully إلزامي عند كل منعطف</td><td>Ashghal</td></tr>
<tr><td>Crossfall < 2%</td><td>يُقلل المسافة بنسبة 20%</td><td>حسب Catchment Area</td></tr>
</table></div>

<h3>📐 4. جدول الاختبارات — Gullies & Manholes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>الإجراء</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Gully Level</td><td>Level Staff من Grating لمستوى الطريق</td><td>5–15mm أسفل مستوى الرصف (لا طوفان)</td><td>كل Gully</td><td>Ashghal</td></tr>
<tr><td>Grating Seating</td><td>بصري — تحرك الـ Grating</td><td>بدون حركة — مستوي — محكم الإغلاق</td><td>كل Gully</td><td>BS EN 124</td></tr>
<tr><td>Outlet Connection</td><td>بصري + CCTV</td><td>اتصال كامل — لا انكسار في الوصلة</td><td>كل Gully</td><td>QCS S8</td></tr>
<tr><td>Silt Bucket</td><td>بصري</td><td>في مكانه — نظيف — قبل التسليم</td><td>كل Gully</td><td>Ashghal</td></tr>
<tr><td>Manhole Water Tightness</td><td>ملء بالمياه 24hr</td><td>انخفاض ≤ 1/10 قطر الـ MH (م)</td><td>كل Manhole</td><td>BS EN 1917</td></tr>
<tr><td>Manhole Cover Level</td><td>Total Station / Level</td><td>± 5mm من تصميم المنسوب</td><td>كل Manhole</td><td>Ashghal</td></tr>
<tr><td>Locking Bar Test</td><td>محاولة رفع الـ Grating بدون مفتاح</td><td>لا يُفتح بدون أداة خاصة</td><td>عينة 10%</td><td>Ashghal</td></tr>
</table></div>

<h3>🔴 5. Hold Points — Gullies</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05A</td><td>Gully Level (5–15mm أسفل الرصف) مُوثّق قبل الصب النهائي</td><td>QC + Surveyor</td><td>Level Survey Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05B</td><td>Outlet Connection CCTV Pass قبل الردم</td><td>QC</td><td>CCTV Record</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Gully Untrapped في الطرق العامة<br>
• ❌ Grating Class أقل من D400 في طرق المرور<br>
• ❌ Gully أعلى من مستوى الطريق — يسبب تمزق الإطارات<br>
• ❌ Gully بدون Silt Bucket<br>
• ❌ Outlet Connection مكسور أو غير متصل<br>
• ❌ بدون Locking Bar في الطرق العامة<br>
• ❌ Manhole بدون Water Tightness Test
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Gully & Inlet Installation</span></div>
<button onclick="document.getElementById('vid-sw-gullies-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-gullies-en" accept="video/*" style="display:none" data-player="vid-player-sw-gullies-en" data-ph="vid-ph-sw-gullies-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-gullies-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Gully installation, correct level setting</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-gullies-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | BS EN 124 | Gullies & Manholes</div>
<h3>Gully Types & Spacing</h3>
<p>• Trapped Road Gully (with water seal + silt bucket): standard Qatar roads<br>• Untrapped Gully: PROHIBITED on public roads in Qatar<br>• Kerb Inlet: used on high-speed roads<br>• Max spacing: 50m (standard), 70m (gradient >1%), mandatory at every sag point × 2</p>
<h3>Testing Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Method</th><th>Pass Criterion</th><th>Frequency</th></tr>
<tr><td>Gully Level</td><td>Level staff</td><td>5–15mm below road surface</td><td>Every gully</td></tr>
<tr><td>Grating Seating</td><td>Visual</td><td>No movement, flush, locked</td><td>Every gully</td></tr>
<tr><td>Outlet Connection</td><td>CCTV visual</td><td>Full connection, no fracture</td><td>Every gully</td></tr>
<tr><td>MH Water Tightness</td><td>Fill + 24hr</td><td>Drop ≤ 1/10 MH diameter (m)</td><td>Every MH</td></tr>
<tr><td>MH Cover Level</td><td>Total Station</td><td>± 5mm design level</td><td>Every MH</td></tr>
</table></div>
<p><strong>HP-05A:</strong> Gully level (5–15mm below surface) before final pour<br>
<strong>HP-05B:</strong> Outlet CCTV pass before backfill</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Untrapped gully on public roads | Grating below D400 | Gully above road level | No silt bucket | Broken outlet connection | No locking bar
</div>
</div>
` },

  sw_testing: { title: '🧪 الصرف السطحي — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبارات الصرف السطحي</span>
<button onclick="document.getElementById('vid-sw-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-testing" accept="video/*" style="display:none" data-player="vid-player-sw-testing" data-ph="vid-ph-sw-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-sw-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Testing</div>

<h3>📐 1. جدول الاختبارات الكامل — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>CCTV Survey</td><td>100% Grade ≤ 2 | لا انهيارات</td><td>Self-propelled CCTV Robot</td><td>100% كل المواسير</td><td>BS EN 13508 / Ashghal</td></tr>
<tr><td>Hydraulic Test (Flooding)</td><td>تصريف كامل — لا مياه راكدة > 24hr</td><td>Flood Test + Visual Survey</td><td>عند كل Section</td><td>Ashghal</td></tr>
<tr><td>Manhole Level Survey</td><td>± 5mm من مستوى التصميم</td><td>Digital Level / Total Station</td><td>كل Manhole / Gully</td><td>Ashghal</td></tr>
<tr><td>Gully Level</td><td>5–15mm أسفل الرصيف (لا طوفان)</td><td>Level Staff</td><td>كل Gully</td><td>Ashghal</td></tr>
<tr><td>Gradient Check (final)</td><td>≥ 1:200 (لمواسير الصرف السطحي)</td><td>Laser Level / As-Built Survey</td><td>كل Section</td><td>Ashghal</td></tr>
<tr><td>Outfall Inspection</td><td>Rip-Rap أو Apron سليم | لا تآكل</td><td>بصري</td><td>كل Outfall</td><td>Ashghal</td></tr>
<tr><td>Silt Trap Check</td><td>نظيف + في مكانه</td><td>بصري</td><td>كل Silt Trap</td><td>Ashghal</td></tr>
<tr><td>RCP Joint Integrity</td><td>لا تسرب مرئي — فحص داخلي بـ CCTV</td><td>CCTV + Visual</td><td>100%</td><td>BS EN 13508</td></tr>
</table></div>

<h3>📐 2. CCTV Survey — Storm Water تفاصيل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>التوقيت</td><td>بعد Backfill وقبل Handover — 100%</td><td>Ashghal</td></tr>
<tr><td>Grade المقبول</td><td>Grade 1 أو 2 فقط</td><td>WRc / BS EN 13508</td></tr>
<tr><td>Grade 4–5</td><td>رفض + إعادة تنفيذ + CCTV مجدداً</td><td>WRc</td></tr>
<tr><td>التقرير</td><td>Video + Written Report + Defect Code + Grade per defect</td><td>Ashghal</td></tr>
<tr><td>تنظيف قبل CCTV</td><td>High-pressure jetting إلزامي قبل CCTV</td><td>Ashghal</td></tr>
</table></div>

<h3>⚠️ 3. تحذير خطير</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
<strong style="color:#e74c3c;">لا يسمح بأي توصيل بين Foul Sewer وStorm Water تحت أي ظرف.</strong><br>
الفحص يشمل التحقق بصرياً من عدم وجود Cross Connections خلال CCTV Survey.<br>
أي Cross Connection = NCR فوري + إشعار Ashghal + إزالة إلزامية.
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-06</td><td>CCTV 100% Grade ≤ 2 قبل الردم النهائي</td><td>QC + Ashghal</td><td>CCTV Report + Video</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07</td><td>Manhole + Gully Levels ± 5mm مكتملة</td><td>QC + Surveyor</td><td>Level Survey Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Testing
</div>
<h3>Testing Schedule — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Acceptance Standard</th><th>Method</th><th>Min Frequency</th><th>Reference</th></tr>
<tr><td>CCTV Survey</td><td>100% Grade ≤ 2 | no collapses</td><td>Self-propelled CCTV Robot</td><td>100% all pipes</td><td>BS EN 13508</td></tr>
<tr><td>Hydraulic Test</td><td>Full drainage — no standing water > 24hr</td><td>Flood test + visual</td><td>Per section</td><td>Ashghal</td></tr>
<tr><td>Manhole Level Survey</td><td>± 5mm design level</td><td>Digital level</td><td>Every manhole/gully</td><td>Ashghal</td></tr>
<tr><td>Gully Level</td><td>5–15mm below kerb (no ponding)</td><td>Level staff</td><td>Every gully</td><td>Ashghal</td></tr>
<tr><td>Gradient (final)</td><td>≥ 1:200 confirmed</td><td>Laser / as-built survey</td><td>Per section</td><td>Ashghal</td></tr>
<tr><td>Silt Trap Check</td><td>Clean + in place</td><td>Visual</td><td>Every silt trap</td><td>Ashghal</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">CRITICAL:</strong> NO cross-connection between foul sewer and storm water under any circumstances. Any cross connection = immediate NCR + Ashghal notification.
</div>
<p style="margin-top:10px;"><strong>HP-06:</strong> CCTV 100% Grade ≤ 2 BEFORE final backfill<br>
<strong>HP-07:</strong> Manhole + gully levels ± 5mm confirmed</p>
</div>
` },


  sw_backfill: { title: '🏗️ الصرف السطحي — الردم', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Backfill</div>
<h3>📐 مواصفات الردم</h3>
<table class="dm-table"><tr><th>المنطقة</th><th>المادة</th><th>الCompaction</th></tr><tr><td>0-300mm فوق الماسورة</td><td>رمل نظيف</td><td>يدوي ≥ 90% MDD</td></tr><tr><td>300mm للسطح</td><td>حسب نوع الطريق</td><td>≥ 95-98% MDD</td></tr></table>
<h3>⚠️ تنبيهات</h3>
<p>• Compaction Test قبل إعادة الطريق<br>• Gully Gratings بالLevel الصح مع الأسفلت<br>• Saw Cut نظيف عند حواف الحفر</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-08:</strong> اعتماد Compaction قبل إعادة الطريق</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🏗️ الصرف السطحي — الردم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>مواصفات الردم — QCS 2024</h3>
<table class="dm-table"><thead><tr><th>المرحلة</th><th>المادة</th><th>السماكة</th><th>الدمك</th><th>HP/W</th></tr></thead><tbody>
<tr><td>Initial Backfill</td><td>Selected granular (no Sabkha)</td><td>150mm above pipe crown</td><td>≥85% MDD — حذر حول الماسورة</td><td style="color:#f39c12">W</td></tr>
<tr><td>Main Backfill</td><td>Selected or site material</td><td>طبقات ≤200mm</td><td>≥90% MDD</td><td style="color:#f39c12">W</td></tr>
<tr><td>Final Backfill</td><td>As main or road layers</td><td>آخر 300mm</td><td>≥95% MDD</td><td style="color:#e74c3c">HP</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;color:#e74c3c">
⚠️ <strong>ممنوعات الردم:</strong> مواد Sabkha (SO₃ >0.5%) | مواد عضوية | حجارة >75mm | تربة طينية رطبة | مخلفات بناء
</div>
` },

  sw_handover: { title: '✅ الصرف السطحي — التسليم', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تسليم الصرف السطحي</span></div>
<button onclick="document.getElementById('vid-sw-handover').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-handover" accept="video/*" style="display:none" data-player="vid-player-sw-handover" data-ph="vid-ph-sw-handover" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-handover" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-Built، فحص مناهل، CCTV Final</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-handover" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Handover</div>
<h3>📋 وثائق التسليم</h3>
<table class="dm-table"><tr><th>الوثيقة</th><th>المحتوى</th></tr><tr><td>As-Built Drawings</td><td>مخططات منفذة بالمناسيب الفعلية</td></tr><tr><td>Hydraulic Test Records</td><td>كل نتائج الاختبار</td></tr><tr><td>CCTV Report</td><td>Video + تقرير كامل</td></tr><tr><td>Gully Schedule</td><td>جدول كل Gullies بالمواضع والمناسيب</td></tr><tr><td>ITR Register</td><td>كل طلبات التفتيش</td></tr></table>
<h3>🛡️ فترة الضمان DLP</h3>
<p>• المدة: <strong>12 شهر</strong><br>• تنظيف Silt Buckets كل 3 أشهر<br>• CCTV Re-inspection عند نهاية DLP</p>
<h3>🔴 Hold Points النهائية</h3>
<p>• <strong>HP-09:</strong> موافقة Ashghal على التسليم النهائي</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Storm Water Handover</span></div>
<button onclick="document.getElementById('vid-sw-handover-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-handover-en" accept="video/*" style="display:none" data-player="vid-player-sw-handover-en" data-ph="vid-ph-sw-handover-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-built, manhole check, final CCTV</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-handover-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ✅ الصرف السطحي — التسليم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },

  tw_survey: { title: '📐 المياه المعالجة — الدراسة والتصميم', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | MME Standards | Treated Water Pre-Construction</div>

<h3>📐 1. متطلبات ما قبل التنفيذ — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>الجهة المعتمِدة</th><th>التوقيت</th></tr>
<tr><td>مخططات التصميم</td><td>معتمدة من Ashghal + MME</td><td>Ashghal / MME</td><td>قبل أي تنفيذ</td></tr>
<tr><td>Cross Connection Study</td><td>دراسة كاملة للفصل عن مياه الشرب — إلزامي</td><td>Consultant + MME</td><td>قبل التنفيذ</td></tr>
<tr><td>Hydraulic Analysis</td><td>تحليل الضغط والتدفق — الحد الأدنى PN10</td><td>Consultant</td><td>قبل التصميم النهائي</td></tr>
<tr><td>Separation Study</td><td>تحديد مسافات الفصل عن كل الشبكات</td><td>Consultant</td><td>قبل التنفيذ</td></tr>
<tr><td>Material Submittal</td><td>مواسير بنفسجية + Fittings — شهادات المصنع</td><td>KAHRAMAA / MME</td><td>قبل التوريد</td></tr>
<tr><td>Method Statement</td><td>يشمل إجراءات منع Cross Connection</td><td>Consultant</td><td>قبل الحفر</td></tr>
<tr><td>Identification Plan</td><td>خطة تمييز شبكة المياه المعالجة (اللون، اللافتات)</td><td>MME</td><td>قبل التنفيذ</td></tr>
</table></div>

<h3>📐 2. NOC إلزامي من الجهات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الجهة</th><th>سبب NOC</th><th>التوقيت</th></tr>
<tr><td>KAHRAMAA</td><td>التحقق من عدم تأثير على شبكة مياه الشرب</td><td>قبل الحفر</td></tr>
<tr><td>MME (Ministry of Municipality)</td><td>اعتماد مصدر المياه المعالجة وجودتها</td><td>قبل التشغيل</td></tr>
<tr><td>Ashghal</td><td>الطرق والشبكات الموجودة</td><td>قبل الحفر</td></tr>
<tr><td>Ooredoo / Infrastructure جهات</td><td>الاتصالات والخدمات المدفونة</td><td>قبل الحفر</td></tr>
</table></div>

<h3>⛔ 3. تحذيرات خاصة — Treated Water</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
<strong style="color:#e74c3c;">⚠️ المياه المعالجة غير صالحة للشرب تحت أي ظرف</strong><br>
• Cross Connection مع مياه الشرب = كارثة صحية + إيقاف المشروع + تحقيق جنائي<br>
• اللون البنفسجي على كل المواسير والـ Fittings والـ Valves إلزامي بدون استثناء<br>
• لافتات "TREATED WATER — NOT FOR DRINKING" عند كل نقطة ري<br>
• فحص Cross Connection قبل التشغيل = Hold Point مطلق (MME Present)
</div>

<h3>📐 4. مسافات الفصل الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الشبكة المجاورة</th><th>الفصل الأفقي الأدنى</th><th>الفصل الرأسي</th><th>ملاحظة</th></tr>
<tr><td>مياه الشرب (Water Supply)</td><td>≥ 1000mm</td><td>مياه الشرب دائماً فوق</td><td>الأهم — مطلق</td></tr>
<tr><td>Foul Sewer</td><td>≥ 500mm</td><td>Treated Water فوق أو جانبي</td><td>QCS S8</td></tr>
<tr><td>Storm Water</td><td>≥ 300mm</td><td>أي وضع مقبول</td><td>QCS S8</td></tr>
<tr><td>كابلات الكهرباء</td><td>≥ 300mm</td><td>—</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>🔴 5. Hold Points — ما قبل التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>Cross Connection Study معتمدة من MME قبل التنفيذ</td><td>MME + Consultant</td><td>Approved Cross Connection Study</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>Material Approval — مواسير بنفسجية 100% من MME</td><td>MME</td><td>Approved Material Submittal</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 | MME Standards | Treated Water Pre-Construction</div>
<h3>Pre-Construction Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Authority</th></tr>
<tr><td>Design Drawings</td><td>Approved by Ashghal + MME</td><td>MME</td></tr>
<tr><td>Cross Connection Study</td><td>Full separation study from potable water — MANDATORY</td><td>MME + Consultant</td></tr>
<tr><td>Material Submittal</td><td>Purple pipes + fittings — manufacturer certificates</td><td>MME</td></tr>
<tr><td>Method Statement</td><td>Must include cross-connection prevention procedures</td><td>Consultant</td></tr>
</table></div>
<h3>Mandatory Separation Distances</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Adjacent Service</th><th>Min Horizontal</th><th>Vertical Rule</th></tr>
<tr><td>Potable Water (KAHRAMAA)</td><td>≥ 1000mm — ABSOLUTE</td><td>Potable water always above</td></tr>
<tr><td>Foul Sewer</td><td>≥ 500mm</td><td>Treated above or lateral</td></tr>
<tr><td>Storm Water</td><td>≥ 300mm</td><td>Any</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">CRITICAL:</strong> Treated water is NOT for drinking. Cross-connection with potable water = public health disaster + project shutdown.<br>
<strong>HP-01:</strong> Cross Connection Study approved by MME before construction<br>
<strong>HP-02:</strong> Material Approval (100% purple pipes) from MME
</div>
</div>
` },

  tw_materials: { title: '🔩 المياه المعالجة — المواسير البنفسجية', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مواد المياه المعالجة</span>
<button onclick="document.getElementById('vid-tw-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-tw-materials" accept="video/*" style="display:none" data-player="vid-player-tw-materials" data-ph="vid-ph-tw-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-tw-materials" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-tw-materials" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | MME Standards | Treated/Reclaimed Water</div>

<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:10px;padding:12px;margin-bottom:16px;">
<strong style="color:#e74c3c;">⛔ تحذير إلزامي:</strong> اللون البنفسجي (RAL 4001) للمواسير والـ Fittings والـ Valves إلزامي بدون استثناء. أي ماسورة بلون مختلف تُرفض فوراً.
</div>

<h3>📐 1. أنواع المواسير المعتمدة — MME</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>المعيار</th><th>Pressure Class</th><th>اللون</th><th>القطر</th><th>اختبار المصنع</th></tr>
<tr><td>HDPE PE100 — بنفسجي</td><td>ISO 4427</td><td>PN6 – PN10</td><td>RAL 4001 بنفسجي</td><td>DN50 – DN630</td><td>Hydrostatic 2×PN / 1hr</td></tr>
<tr><td>uPVC — بنفسجي</td><td>ISO 1452</td><td>PN6 – PN10</td><td>RAL 4001 بنفسجي</td><td>DN50 – DN315</td><td>Hydrostatic + Impact</td></tr>
<tr><td>GRP — بنفسجي stripe</td><td>ISO 10467</td><td>حسب التصميم</td><td>شريط بنفسجي</td><td>DN315+</td><td>Stiffness + Hydrostatic</td></tr>
</table></div>

<h3>📐 2. جدول اختبارات المواد — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>مواصفة القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>لون الماسورة</td><td>RAL 4001 بنفسجي — لا استثناء</td><td>Color Chart Check</td><td>100% per delivery</td><td>MME Standards</td></tr>
<tr><td>Pressure Rating</td><td>≥ PN6 (PN10 للخطوط الرئيسية)</td><td>Factory Hydrostatic</td><td>كل batch</td><td>ISO 4427</td></tr>
<tr><td>Wall Thickness</td><td>حسب SDR المصنع</td><td>Caliper Measurement</td><td>كل delivery</td><td>ISO 4427</td></tr>
<tr><td>Marking</td><td>"RECLAIMED WATER" + لون بنفسجي</td><td>Visual</td><td>100%</td><td>MME</td></tr>
<tr><td>Conformity Certificate</td><td>شهادة معتمدة من MME</td><td>Document Check</td><td>كل Submittal</td><td>MME</td></tr>
<tr><td>Impact Resistance</td><td>لا كسور في 10 قطع</td><td>ISO 3127</td><td>كل batch</td><td>ISO 4427</td></tr>
</table></div>

<h3>📐 3. مواد Fittings والـ Valves — بنفسجي إلزامي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المادة</th><th>المواصفة</th><th>اللون</th><th>الملاحظة</th></tr>
<tr><td>HDPE Fittings</td><td>ISO 8085-3 / Butt + Electrofusion</td><td>بنفسجي RAL 4001</td><td>SDR نفس الماسورة</td></tr>
<tr><td>Isolation Valves</td><td>BS EN 1074-2</td><td>هيكل بنفسجي أو Label بنفسجي</td><td>Epoxy Lined أو SS</td></tr>
<tr><td>Air Release Valves</td><td>BS EN 1074-4</td><td>Label بنفسجي</td><td>عند كل نقطة عالية</td></tr>
<tr><td>Double Check Valves</td><td>BS EN 1717</td><td>بنفسجي أو Label واضح</td><td>إلزامي عند كل نقطة توصيل</td></tr>
<tr><td>Marker Tape</td><td>Polythene — بنفسجي</td><td>RAL 4001 بنفسجي</td><td>"RECLAIMED WATER" على الشريط</td></tr>
</table></div>

<h3>⛔ 4. المواد المرفوضة فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• أي ماسورة بلون غير بنفسجي (RAL 4001) — رفض فوري<br>
• مواسير بدون نص "RECLAIMED WATER" — رفض<br>
• Fittings بلون مختلف عن الماسورة — رفض<br>
• Valves بدون تمييز بنفسجي واضح — رفض<br>
• أي مادة تشبه مواسير مياه الشرب — رفض + تقرير فوري<br>
• تخزين مياه الشرب والمياه المعالجة في نفس الموقع دون فصل واضح — خطر
</div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>اعتماد Material Submittal — التحقق من اللون البنفسجي</td><td>Consultant + MME</td><td>Approved MAR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>استلام + فحص اللون في الموقع</td><td>QC Engineer</td><td>Delivery Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | MME Standards | Treated Water
</div>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-bottom:12px;font-size:12px;">
<strong style="color:#e74c3c;">⛔ MANDATORY:</strong> Colour RAL 4001 purple for ALL pipes, fittings, and valves. No exceptions.
</div>
<h3>Approved Pipe Types — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Type</th><th>Standard</th><th>Class</th><th>Colour</th><th>Diameter</th></tr>
<tr><td>HDPE PE100 — Purple</td><td>ISO 4427</td><td>PN6–PN10</td><td>RAL 4001 Purple</td><td>DN50–DN630</td></tr>
<tr><td>uPVC — Purple</td><td>ISO 1452</td><td>PN6–PN10</td><td>RAL 4001 Purple</td><td>DN50–DN315</td></tr>
<tr><td>GRP — Purple stripe</td><td>ISO 10467</td><td>Design-based</td><td>Purple stripe</td><td>DN315+</td></tr>
</table></div>
<h3>Material Tests — Minimum Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Acceptance</th><th>Test Method</th><th>Frequency</th></tr>
<tr><td>Pipe Colour</td><td>RAL 4001 Purple — no exceptions</td><td>Colour chart check</td><td>100% per delivery</td></tr>
<tr><td>Pressure Rating</td><td>≥ PN6 (PN10 for mains)</td><td>Factory hydrostatic</td><td>Per batch</td></tr>
<tr><td>Marking</td><td>"RECLAIMED WATER" + purple colour</td><td>Visual</td><td>100%</td></tr>
<tr><td>Certificate</td><td>MME-approved conformity certificate</td><td>Document check</td><td>Per submittal</td></tr>
</table></div>
<p><strong>REJECTED IMMEDIATELY:</strong> Any pipe not in RAL 4001 purple | Pipes without "RECLAIMED WATER" marking | Any material that resembles potable water pipes</p>
</div>
` },


  tw_excavation: { title: '⛏️ المياه المعالجة — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | Treated Water Excavation & Bedding</div>

<h3>📐 1. مواصفات الحفر</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr>
<tr><td>عرض الخندق</td><td>DN + 600mm (300mm كل جانب) — حد أدنى</td><td>QCS S8</td></tr>
<tr><td>عمق الغطاء — في الطرق</td><td>≥ 900mm من سطح الطريق</td><td>Ashghal Standard</td></tr>
<tr><td>عمق الغطاء — خارج الطرق</td><td>≥ 600mm (حدائق + مناطق رعي)</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>إلزامي في الحفر > 1.2m عمق</td><td>QCS P1 S8.4</td></tr>
<tr><td>Dewatering</td><td>GWT ≥ 0.5m تحت قاع الحفر — مستمر</td><td>QCS P3 S4</td></tr>
<tr><td>Marker Tape</td><td>بنفسجي (Purple) — 300mm فوق الماسورة</td><td>KAHRAMAA / MME</td></tr>
</table></div>

<h3>📐 2. مواصفات Bedding — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>السماكة</th><th>الدمك</th><th>المرجع</th></tr>
<tr><td>Bedding تحت الماسورة</td><td>رمل نظيف أو Type 1 Granular</td><td>150mm</td><td>≥ 90% MDD — Level ± 10mm</td><td>QCS S8</td></tr>
<tr><td>حماية جانبية</td><td>رمل نظيف — يدوي بحذر</td><td>حتى نصف القطر</td><td>يدوي — لا آلات ثقيلة</td><td>QCS S8</td></tr>
<tr><td>Initial Cover</td><td>رمل نظيف فوق الماسورة</td><td>300mm</td><td>≥ 90% MDD — بعد اعتماد الوصلات</td><td>QCS S8</td></tr>
</table></div>

<h3>📐 3. متطلبات الفصل عند التقاطع مع مياه الشرب</h3>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.4);border-radius:10px;padding:12px;font-size:12px;">
<strong>عند التقاطع مع خط مياه شرب — شروط خاصة:</strong><br>
• مياه الشرب يجب أن تكون <strong>فوق</strong> المياه المعالجة دائماً<br>
• Sleeve Concrete C20 حول الخط السفلي — طول 3.0m من نقطة التقاطع<br>
• Puddle Flange أو Mechanical Joint عند التقاطع<br>
• توثيق بالصور + الـ As-Built قبل الردم — Hold Point إلزامي
</div>

<h3>🔴 4. Hold Points — الحفر والبيدنج</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03A</td><td>فحص Bedding Level + Compaction قبل تمديد المواسير</td><td>QC + Consultant</td><td>Bedding ITR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03B</td><td>فحص الفصل عن مياه الشرب — MME Representative حاضر</td><td>QC + MME</td><td>Separation Check Record</td></tr>
</table></div>

<h3>⛔ 5. Unacceptable</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Bedding من تربة الموقع (Sabkha أو طينية)<br>
• ❌ Dewatering غير كافي — ماء في الحفر أثناء تمديد المواسير<br>
• ❌ المياه المعالجة فوق مياه الشرب عند التقاطع<br>
• ❌ Marker Tape غير بنفسجي<br>
• ❌ ردم Initial Cover بالحجارة أو مواد خشنة
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | Treated Water Excavation & Bedding</div>
<h3>Excavation Specifications</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Trench Width</td><td>DN + 600mm min (300mm each side)</td><td>QCS S8</td></tr>
<tr><td>Cover Depth (roads)</td><td>≥ 900mm from road surface</td><td>Ashghal</td></tr>
<tr><td>Cover Depth (off road)</td><td>≥ 600mm</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>Mandatory for depth > 1.2m</td><td>QCS P1 S8.4</td></tr>
<tr><td>Dewatering</td><td>GWT ≥ 0.5m below excavation floor</td><td>QCS P3 S4</td></tr>
<tr><td>Marker Tape</td><td>PURPLE — 300mm above pipe</td><td>MME / KAHRAMAA</td></tr>
</table></div>
<div style="background:rgba(155,89,182,0.1);border:1px solid rgba(155,89,182,0.4);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>At crossings with potable water:</strong> Potable water MUST be above treated water. C20 Concrete sleeve 3.0m either side of crossing. Document with photos + As-Built before backfill.<br><br>
<strong>HP-03A:</strong> Bedding level + compaction before pipe laying<br>
<strong>HP-03B:</strong> Separation check from potable water — MME representative required
</div>
</div>
` },

  tw_laying: { title: '🔧 المياه المعالجة — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | ISO 4427 | MME Standards | Treated Water Pipe Laying</div>

<h3>📐 1. جدول مواصفات المواسير البنفسجية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>المادة</th><th>اللون</th><th>Pressure Class</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>uPVC Purple</td><td>uPVC (Unplasticised PVC)</td><td>بنفسجي كامل</td><td>PN10 أو PN16</td><td>DN ≤ 300mm</td><td>ISO 4422 / BS EN 1452</td></tr>
<tr><td>HDPE PE100 Purple</td><td>PE100 — SDR17 أو SDR11</td><td>بنفسجي أو Strip بنفسجي</td><td>PN10 / PN16</td><td>جميع الأقطار</td><td>ISO 4427 / BS EN 12201</td></tr>
<tr><td>DI Purple</td><td>Ductile Iron K9</td><td>Purple Epoxy Lining</td><td>PN25</td><td>DN > 300mm ضغط عالي</td><td>ISO 2531 / BS EN 545</td></tr>
<tr><td>GRP Purple</td><td>Glass Reinforced Plastic</td><td>Purple Marking Strip</td><td>PN10–PN16</td><td>DN > 600mm</td><td>BS EN 1636</td></tr>
</table></div>
<p style="font-size:11px;color:#9b59b6;font-weight:700;margin-top:4px;">⚠️ أي ماسورة ليست بنفسجية اللون = رفض فوري في الموقع بدون استثناء.</p>

<h3>📐 2. جدول Fittings والـ Valves البنفسجية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المواصفة</th><th>اللون</th><th>المرجع</th></tr>
<tr><td>Gate Valve / Butterfly Valve</td><td>PN16 — مع مفتاح تشغيل</td><td>بنفسجي أو Purple Label إلزامي</td><td>BS EN 1074</td></tr>
<tr><td>Air Valve (ARV)</td><td>Double Air Valve — PN16</td><td>Purple Body أو Label</td><td>BS EN 1074</td></tr>
<tr><td>Wash-out Valve</td><td>DN80 minimum + NRV</td><td>Purple Label</td><td>Ashghal Standard</td></tr>
<tr><td>Double Check Valve</td><td>إلزامي عند كل نقطة توصيل محتملة</td><td>—</td><td>MME Requirement</td></tr>
<tr><td>Thrust Block</td><td>C20 Concrete — عند كل Bend >11.25°</td><td>—</td><td>QCS S8</td></tr>
<tr><td>Valve Box / Chamber</td><td>بنفسجي اللون أو Purple Lid</td><td>بنفسجي</td><td>MME</td></tr>
</table></div>

<h3>📐 3. متطلبات التوصيل والتمديد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>اتجاه التمديد</td><td>من المصدر (Source) للنقاط البعيدة</td><td>QCS S8</td></tr>
<tr><td>أدنى انحدار</td><td>≥ 1:500 (0.2%) لتفادي ركود المياه</td><td>QCS S8</td></tr>
<tr><td>uPVC Joint</td><td>Solvent Cement Joint أو Rubber Ring (Push Fit)</td><td>ISO 4422</td></tr>
<tr><td>HDPE Joint</td><td>Butt Fusion أو Electrofusion فقط</td><td>ISO 4427</td></tr>
<tr><td>Butt Fusion — درجة الحرارة</td><td>220–230°C — بحسب سماكة الجدار</td><td>DVS 2207</td></tr>
<tr><td>Electrofusion — Traceability</td><td>كل وصلة تُسجل بـ Barcode Reader</td><td>Ashghal</td></tr>
<tr><td>Pressure Testing قبل الردم</td><td>فحص أولي بصري للوصلات قبل Initial Backfill</td><td>QCS S8</td></tr>
<tr><td>Identification Tags</td><td>Tag بنفسجي على كل Valve + Chamber كل 50m على الخط</td><td>MME</td></tr>
</table></div>

<h3>📐 4. متطلبات Thrust Blocks</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الموقع</th><th>حجم الـ Block</th><th>المادة</th></tr>
<tr><td>90° Bend</td><td>حسب Thrust Calculation — QCS Appendix</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>45° Bend</td><td>حسب Thrust Calculation</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>11.25° Bend</td><td>حسب Thrust Calculation</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>Tee Junction</td><td>حسب DN + Pressure Class</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>Dead End</td><td>إلزامي — لا يُرد الخط بدون Block</td><td>C20 Concrete In-Situ</td></tr>
</table></div>

<h3>🔴 5. Hold Points — وضع المواسير</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04A</td><td>فحص 100% ألوان المواسير بنفسجي قبل الدفن</td><td>QC</td><td>Colour Inspection Sheet</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04B</td><td>Fusion Joints Records (Barcode/Photo) مكتملة</td><td>QC + Consultant</td><td>Welding/Fusion Log</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04C</td><td>Thrust Blocks مكتملة — Concrete Cured قبل الاختبار</td><td>QC</td><td>Thrust Block ITR</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ ماسورة أو Fitting غير بنفسجية — رفض فوري بدون نقاش<br>
• ❌ HDPE بدون Fusion Welding (ممنوع استخدام Compression Fittings في الخطوط الرئيسية)<br>
• ❌ أي توصيل مباشر بشبكة مياه الشرب<br>
• ❌ Thrust Block غير محسوب أو غير مكتمل الصب<br>
• ❌ Valve بدون Purple Identification Label<br>
• ❌ تشغيل الشبكة قبل اعتماد Cross Connection Test من MME
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | ISO 4427 | MME Standards | Treated Water Laying</div>
<h3>Purple Pipe Types</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Type</th><th>Material</th><th>Pressure Class</th><th>Application</th><th>Standard</th></tr>
<tr><td>uPVC Purple</td><td>uPVC</td><td>PN10/PN16</td><td>DN ≤ 300mm</td><td>ISO 4422</td></tr>
<tr><td>HDPE PE100 Purple</td><td>PE100 SDR17/11</td><td>PN10/PN16</td><td>All sizes</td><td>ISO 4427</td></tr>
<tr><td>DI Purple Epoxy</td><td>Ductile Iron K9</td><td>PN25</td><td>DN > 300mm, high pressure</td><td>ISO 2531</td></tr>
</table></div>
<h3>Installation Key Requirements</h3>
<p>• HDPE joints: Butt Fusion (220–230°C) or Electrofusion ONLY — every joint logged with barcode reader<br>
• Thrust Blocks: C20 concrete at all bends >11.25°, tees, dead ends — MUST be cured before pressure test<br>
• Min gradient: ≥ 1:500 (0.2%) to prevent stagnation<br>
• Purple ID tags on every valve + chamber, every 50m along pipe route</p>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Non-purple pipe or fitting | Compression fittings on mains | Any connection to potable water | Unfinished thrust blocks | Valve without purple ID | Network operation before MME Cross Connection Test approval<br><br>
<strong>HP-04A:</strong> 100% colour check (purple) before burial<br>
<strong>HP-04B:</strong> Fusion joint records complete<br>
<strong>HP-04C:</strong> Thrust blocks cast and cured before pressure test
</div>
</div>
` },

  tw_testing: { title: '🧪 المياه المعالجة — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبارات المياه المعالجة</span>
<button onclick="document.getElementById('vid-tw-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-tw-testing" accept="video/*" style="display:none" data-player="vid-player-tw-testing" data-ph="vid-ph-tw-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-tw-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-tw-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | MME Standards | Treated Water Testing</div>

<h3>📐 1. جدول الاختبارات الكامل — المياه المعالجة</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Hydrostatic Pressure Test</td><td>1.5× الضغط التصميمي / ساعتان / صفر انخفاض</td><td>Pressure Gauge + Pump</td><td>كل Section ≤ 500m</td><td>QCS S8 / ISO 4427</td></tr>
<tr><td>Cross Connection Test — الأهم</td><td>صفر تلوث في شبكة مياه الشرب</td><td>Tracer Dye Test أو Pressure Differential</td><td>كل نقطة توصيل محتملة</td><td>MME Standards</td></tr>
<tr><td>BOD (Biochemical Oxygen Demand)</td><td>≤ 10 mg/L (للري)</td><td>Standard Methods 5210B</td><td>كل Section قبل التشغيل</td><td>MME</td></tr>
<tr><td>TSS (Total Suspended Solids)</td><td>≤ 10 mg/L</td><td>Standard Methods 2540D</td><td>كل Section قبل التشغيل</td><td>MME</td></tr>
<tr><td>E. Coli</td><td>≤ 1 CFU/100mL (للري غير المباشر)</td><td>Standard Methods 9221</td><td>كل Section</td><td>MME</td></tr>
<tr><td>pH</td><td>6.0 – 9.0</td><td>pH Meter</td><td>كل Section</td><td>MME</td></tr>
<tr><td>Turbidity</td><td>≤ 5 NTU</td><td>Nephelometer</td><td>كل Section</td><td>MME</td></tr>
<tr><td>Colour Visual Check</td><td>100% بنفسجي — لا مواسير مختلطة</td><td>بصري 100%</td><td>قبل الردم + عند التسليم</td><td>MME</td></tr>
</table></div>

<h3>📐 2. Cross Connection Test — الإجراء التفصيلي</h3>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:10px;padding:12px;">
<p><strong>الخطوات:</strong><br>
1. فصل كامل بين شبكة المياه المعالجة وشبكة مياه الشرب<br>
2. حقن Tracer Dye بنفسجي في شبكة المياه المعالجة<br>
3. مراقبة نقاط مياه الشرب القريبة لمدة 24hr<br>
4. صفر ظهور للـ Dye في شبكة مياه الشرب = Pass<br>
5. أي ظهور للـ Dye = رفض فوري + إيقاف التشغيل + تحقيق</p>
<p><strong>بديل:</strong> Pressure Differential — الحفاظ على ضغط مياه الشرب > ضغط المعالجة في جميع الأوقات</p>
</div>

<h3>⛔ 3. حالات إيقاف التشغيل الفوري</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• أي Cross Connection مكتشف — إيقاف فوري + إشعار MME + Ashghal<br>
• E. Coli > 1 CFU/100mL — عدم تشغيل + إعادة معالجة<br>
• فشل Pressure Test — لا تشغيل قبل الإصلاح + إعادة الاختبار<br>
• اكتشاف ماسورة غير بنفسجية في الشبكة — إيقاف + استبدال + CCTV
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05</td><td>Pressure Test Pass (1.5×PN / 2hr / Zero drop)</td><td>QC + Consultant</td><td>Pressure Test Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-06</td><td>Cross Connection Test = صفر تلوث — إلزامي قبل أي تشغيل</td><td>QC + MME Representative</td><td>Cross Connection Test Report</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07</td><td>Water Quality Reports معتمدة من MME</td><td>MME Lab</td><td>Water Quality Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | MME Standards | Treated Water Testing
</div>
<h3>Testing Schedule — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Acceptance Standard</th><th>Method</th><th>Min Frequency</th><th>Reference</th></tr>
<tr><td>Hydrostatic Pressure Test</td><td>1.5× design pressure / 2hr / Zero drop</td><td>Pressure gauge + pump</td><td>Per section ≤ 500m</td><td>QCS S8</td></tr>
<tr><td>Cross Connection Test</td><td>Zero contamination in potable water</td><td>Tracer dye or pressure differential</td><td>Every potential connection point</td><td>MME</td></tr>
<tr><td>BOD</td><td>≤ 10 mg/L (for irrigation)</td><td>Standard Methods 5210B</td><td>Per section before commissioning</td><td>MME</td></tr>
<tr><td>TSS</td><td>≤ 10 mg/L</td><td>Standard Methods 2540D</td><td>Per section</td><td>MME</td></tr>
<tr><td>E. Coli</td><td>≤ 1 CFU/100mL</td><td>Standard Methods 9221</td><td>Per section</td><td>MME</td></tr>
<tr><td>pH</td><td>6.0–9.0</td><td>pH Meter</td><td>Per section</td><td>MME</td></tr>
<tr><td>Turbidity</td><td>≤ 5 NTU</td><td>Nephelometer</td><td>Per section</td><td>MME</td></tr>
<tr><td>Colour Check</td><td>100% purple — no mixed pipes</td><td>Visual 100%</td><td>Before backfill + at handover</td><td>MME</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">IMMEDIATE SHUTDOWN:</strong> Any detected cross-connection → stop commissioning + notify MME + Ashghal immediately.
</div>
<p style="margin-top:10px;"><strong>HP-05:</strong> Pressure test pass BEFORE final backfill<br>
<strong>HP-06:</strong> Cross Connection Test = zero contamination MANDATORY before commissioning<br>
<strong>HP-07:</strong> MME water quality certificate</p>
</div>
` },


  tw_handover: { title: '✅ المياه المعالجة — التسليم', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | MME Standards | Treated Water Handover</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى المطلوب</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + Long Section + GPS Coordinates لكل Fitting + Valve<br>يُظهر اللون البنفسجي بوضوح</td><td>3 ورقي + 1 رقمي</td><td>Ashghal / MME</td></tr>
<tr><td>Pressure Test Certificates</td><td>كل نتائج Hydrostatic Test — 1.5×PN / 2hr / Zero drop</td><td>أصلي + نسختان</td><td>QC / MME</td></tr>
<tr><td>Cross Connection Test Report</td><td>Tracer Dye Test Report — صفر تلوث<br>MME Representative Signature إلزامي</td><td>أصلي</td><td>MME</td></tr>
<tr><td>Water Quality Certificate</td><td>BOD / TSS / E.Coli / pH / Turbidity<br>نتائج MME Lab المعتمدة</td><td>أصلي</td><td>MME Lab</td></tr>
<tr><td>Material Certificates</td><td>Mill Certs للمواسير + Fittings + Valves<br>تأكيد اللون البنفسجي</td><td>أصلي</td><td>Manufacturer</td></tr>
<tr><td>ITP Signed Register</td><td>كل ITPs مغلقة — صفر NCR مفتوح</td><td>أصلي موقّع</td><td>QC + Consultant</td></tr>
<tr><td>Valve Schedule</td><td>جدول كل الـ Valves: Location / Size / Type / Colour<br>GPS Coordinates لكل Valve</td><td>ورقي + رقمي</td><td>Ashghal / MME</td></tr>
<tr><td>Warning Signs Record</td><td>صور توثيقية لكل لافتات "NOT FOR DRINKING"<br>موثقة بالـ GPS</td><td>رقمي</td><td>MME</td></tr>
<tr><td>O&M Manual</td><td>دليل التشغيل والصيانة + Emergency Procedures<br>Contact Numbers للطوارئ</td><td>نسختان</td><td>للمشغّل</td></tr>
<tr><td>CCTV Report (إن وجد)</td><td>للخطوط الرئيسية — Grade ≤ 2 كامل</td><td>رقمي + تقرير</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم النهائي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th><th>الحالة</th></tr>
<tr><td>Pressure Test</td><td>100% Pass — كل Sections</td><td>QC</td><td>✅ قبل التسليم</td></tr>
<tr><td>Cross Connection Test</td><td>MME Certified — صفر تلوث</td><td>MME</td><td>✅ إلزامي</td></tr>
<tr><td>Water Quality</td><td>BOD ≤10 | TSS ≤10 | E.Coli ≤1 CFU</td><td>MME Lab</td><td>✅ إلزامي</td></tr>
<tr><td>Colour Audit</td><td>100% بنفسجي — فحص ميداني نهائي</td><td>MME Inspector</td><td>✅ إلزامي</td></tr>
<tr><td>Valve Operation</td><td>كل الـ Valves تُفتح وتُغلق بسلاسة</td><td>QC</td><td>✅ إلزامي</td></tr>
<tr><td>Warning Signs</td><td>موجودة عند كل نقطة ري ومخرج</td><td>MME Inspector</td><td>✅ إلزامي</td></tr>
<tr><td>NCR Log</td><td>صفر NCRs مفتوحة</td><td>QC</td><td>✅ إلزامي</td></tr>
<tr><td>As-Built Submitted</td><td>مُسلَّمة ومعتمدة</td><td>Consultant</td><td>✅ إلزامي</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP — Defects Liability Period</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>مدة DLP</td><td>12 شهر من تاريخ التسليم الرسمي (TOC)</td></tr>
<tr><td>Water Quality Monitoring</td><td>كل 3 أشهر — نتائج لـ MME</td></tr>
<tr><td>Cross Connection Re-check</td><td>عند نهاية DLP — قبل الإغلاق النهائي</td></tr>
<tr><td>Irrigation Points Inspection</td><td>كل نقطة ري كل 6 أشهر</td></tr>
<tr><td>Valve Operation Test</td><td>كل 6 أشهر — توثيق</td></tr>
<tr><td>Leak Repair Response</td><td>خلال 24 hour من الإبلاغ</td></tr>
<tr><td>Warning Signs Check</td><td>كل 3 أشهر — استبدال المتلفة فوراً</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08</td><td>Cross Connection Certificate من MME — مطلق قبل التسليم</td><td>MME Representative</td><td>MME Signed Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09</td><td>Water Quality Reports معتمدة + Colour Audit Pass</td><td>MME Lab + Inspector</td><td>Lab Reports + Inspection Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-10</td><td>موافقة Ashghal + MME الرسمية على التسليم النهائي</td><td>Ashghal + MME</td><td>TAC Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | MME Standards | Treated Water Handover</div>
<h3>Handover Documents Required</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Document</th><th>Content</th><th>Copies</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + sections + GPS per fitting — purple shown clearly</td><td>3 hard + 1 digital</td></tr>
<tr><td>Pressure Test Certs</td><td>All sections — 1.5×PN / 2hr / zero drop</td><td>Original + 2</td></tr>
<tr><td>Cross Connection Report</td><td>Tracer dye test — zero contamination — MME sig. mandatory</td><td>Original</td></tr>
<tr><td>Water Quality Cert</td><td>BOD / TSS / E.Coli / pH / Turbidity — MME Lab</td><td>Original</td></tr>
<tr><td>Material Certs</td><td>Mill certs — pipes + fittings + valves — purple confirmed</td><td>Original</td></tr>
<tr><td>ITP Register</td><td>All ITPs closed — zero open NCRs</td><td>Original signed</td></tr>
<tr><td>Valve Schedule</td><td>Location / size / type — GPS per valve</td><td>Hard + digital</td></tr>
<tr><td>O&M Manual</td><td>Operating guide + emergency procedures</td><td>2 copies</td></tr>
</table></div>
<h3>DLP — Defects Liability Period</h3>
<p>Duration: 12 months from TOC<br>
• Water quality test every 3 months → MME<br>
• Cross connection re-check at DLP end<br>
• Valve operation test every 6 months<br>
• Leak repair within 24hr of report<br>
• Warning sign inspection every 3 months</p>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>HP-08:</strong> MME Cross Connection Certificate — ABSOLUTE before handover<br>
<strong>HP-09:</strong> Water Quality Reports approved + Colour Audit pass<br>
<strong>HP-10:</strong> Formal Ashghal + MME acceptance (TAC Certificate)
</div>
</div>
` },


  itp_storm: { title: '📋 ITP — شبكة الصرف السطحي | Storm Water', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 المرجع: QCS 2024 — Section 8 Part 3 | Ashghal Standards
</div>
<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Material Approval</td><td>QCS S8 P3</td><td>اعتماد قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Submittal</td></tr>
<tr><td>1.2</td><td>Method Statement</td><td>QCS S1 P7</td><td>معتمد قبل الحفر</td><td>مرة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved MS</td></tr>
<tr><td>1.3</td><td>Shop Drawings</td><td>QCS S1 P7</td><td>معتمدة من Ashghal</td><td>كل submittal</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Drawings</td></tr>
</table>
<h3>2.0 — الحفر والبيدنج</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Trench Depth</td><td>QCS S8 P3</td><td>≥ 0.9m من السطح</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Survey</td></tr>
<tr><td>2.2</td><td>Bedding Gradient</td><td>Design Drawing</td><td>≥ 1:200 ± 5mm</td><td>كل 25m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Laser Record</td></tr>
<tr><td>2.3</td><td>Bedding Compaction</td><td>ASTM D1556</td><td>≥ 90% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Density Report</td></tr>
</table>
<h3>3.0 — Gullies & Manholes</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Gully Level</td><td>Design Drawing</td><td>± 5mm من مستوى الطريق</td><td>كل Gully</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Survey</td></tr>
<tr><td>3.2</td><td>Gully Spacing</td><td>Design Drawing</td><td>حسب التصميم ± 500mm</td><td>كل Section</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Survey Record</td></tr>
<tr><td>3.3</td><td>Manhole Water Tightness</td><td>QCS S8 P3</td><td>صفر تسريب / 24hr</td><td>كل Manhole</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Record</td></tr>
<tr><td>3.4</td><td>Silt Trap Installation</td><td>QCS S8 P3</td><td>موجود قبل كل Outfall</td><td>كل Outfall</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>3.5</td><td>Silt Bucket in Gullies</td><td>QCS S8 P3</td><td>موجود في كل Gully</td><td>100%</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Inspection Record</td></tr>
</table>
<h3>4.0 — الاختبارات</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>Hydraulic Test</td><td>QCS S8 P3</td><td>صفر تسريب / 30 دقيقة</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Test Record</td></tr>
<tr><td>4.2</td><td>CCTV Inspection</td><td>QCS S8 P3</td><td>100% — Grade ≤ 2</td><td>قبل التسليم</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + CCTV Report</td></tr>
<tr><td>4.3</td><td>Pipe Gradient Check</td><td>Design Drawing</td><td>≥ 1:200 ± 5mm</td><td>كل Section</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Survey Record</td></tr>
</table>
<h3>5.0 — الردم</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>5.1</td><td>Backfill Compaction</td><td>QCS S6 P2</td><td>≥ 95% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr>
<tr><td>5.2</td><td>Road Reinstatement</td><td>QCS S6 P5</td><td>بنفس مواصفة الطريق الأصلي</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Record</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">H</strong> = Hold Point &nbsp;|&nbsp; <strong style="color:#f1c40f;">W</strong> = Witness Point &nbsp;|&nbsp; <strong style="color:#2ecc71;">R</strong> = Review
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Storm Water Drainage — ITP
</div>
<h3>🌧️ Storm Drainage — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test/Inspection</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Pipe Material</td><td>Certificate + dimensions check</td><td>QCS approved material</td><td>W</td></tr>
<tr><td>Excavation</td><td>Level + width + side slope</td><td>±50mm level / 1:1 stable</td><td>W</td></tr>
<tr><td>Bedding</td><td>Class B granular / compaction</td><td>95% MDD under pipe</td><td>H</td></tr>
<tr><td>Pipe Laying</td><td>Level + alignment + joints</td><td>1:150 min gradient</td><td>H</td></tr>
<tr><td>Manhole Construction</td><td>Dimensions + cover level</td><td>±5mm cover level</td><td>H</td></tr>
<tr><td>Hydraulic Test</td><td>Fill + hold 1 hour</td><td>Zero leakage</td><td>H</td></tr>
<tr><td>CCTV Survey</td><td>100% of pipelines</td><td>Grade ≤B2</td><td>H</td></tr>
<tr><td>Backfill Compaction</td><td>Density test</td><td>≥95% MDD</td><td>W</td></tr>
<tr><td>Gully Level</td><td>Survey relative to carriageway</td><td>Within ±5mm</td><td>W</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:6px;">H = Hold Point | W = Witness Point | Ashghal Standards Apply</div>
</div>
` },

  itp_treated: { title: '📋 ITP — شبكة المياه المعالجة | Treated Water', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 المرجع: QCS 2024 — Section 8 | MME & Ashghal Standards
</div>
<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Material Approval — Purple Pipes</td><td>QCS S8</td><td>بنفسجي — ISO Certificate</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Submittal</td></tr>
<tr><td>1.2</td><td>Cross Connection Study</td><td>MME Std</td><td>معتمد قبل أي تنفيذ</td><td>مرة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Study</td></tr>
<tr><td>1.3</td><td>Method Statement</td><td>QCS S1 P7</td><td>معتمد قبل الحفر</td><td>مرة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved MS</td></tr>
<tr><td>1.4</td><td>Shop Drawings</td><td>QCS S1 P7</td><td>معتمدة من MME / Ashghal</td><td>كل submittal</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Drawings</td></tr>
</table>
<h3>2.0 — اختبارات المواد</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Pipe Color Verification</td><td>MME Std</td><td>بنفسجي RAL 4001 — 100%</td><td>100% كل ماسورة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Inspection Record</td></tr>
<tr><td>2.2</td><td>Pipe Wall Thickness</td><td>ISO 4427</td><td>حسب المواصفة ± 5%</td><td>عينة عشوائية</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>MRR + Certificate</td></tr>
<tr><td>2.3</td><td>Valve Color — Purple</td><td>MME Std</td><td>بنفسجي إلزامي</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
</table>
<h3>3.0 — الحفر والفصل</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Separation from Potable Water</td><td>QCS S8</td><td>≥ 1.0m أفقياً — مياه الشرب فوق</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Survey</td></tr>
<tr><td>3.2</td><td>Trench Depth</td><td>QCS S8</td><td>≥ 0.9m من السطح</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Survey</td></tr>
<tr><td>3.3</td><td>Bedding Compaction</td><td>ASTM D1556</td><td>≥ 90% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Density Report</td></tr>
</table>
<h3>4.0 — وضع المواسير</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>Pipe Color — Field Check</td><td>MME Std</td><td>بنفسجي 100% — لا استثناء</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Inspection Record</td></tr>
<tr><td>4.2</td><td>Double Check Valve</td><td>MME Std</td><td>موجود عند كل نقطة اتصال</td><td>كل نقطة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Record</td></tr>
<tr><td>4.3</td><td>Warning Signs</td><td>MME Std</td><td>لافتة عند كل نقطة استخدام</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>4.4</td><td>Marker Tape Purple</td><td>MME Std</td><td>بنفسجي — RECLAIMED WATER — 300mm</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
</table>
<h3>5.0 — الاختبارات</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>5.1</td><td>Pressure Test</td><td>QCS S8</td><td>1.5x التصميمي / ساعتان / صفر انخفاض</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Pressure Chart</td></tr>
<tr><td>5.2</td><td>Cross Connection Test</td><td>MME Std</td><td>صفر تلوث في مياه الشرب</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Certificate</td></tr>
<tr><td>5.3</td><td>Water Quality — BOD/TSS</td><td>MME Std</td><td>حسب MME Standard</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>MME Lab Report</td></tr>
<tr><td>5.4</td><td>Leakage Test</td><td>QCS S8</td><td>صفر تسريب مرئي</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Record</td></tr>
</table>
<h3>6.0 — الردم والتشطيب</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>6.1</td><td>Backfill Compaction</td><td>QCS S6 P2</td><td>≥ 95% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr>
<tr><td>6.2</td><td>Purple Marker Tape Verification</td><td>MME Std</td><td>بنفسجي — عمق 300mm صح</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>6.3</td><td>Road Reinstatement</td><td>QCS S6 P5</td><td>بنفس مواصفة الطريق الأصلي</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Record</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">H</strong> = Hold Point &nbsp;|&nbsp; <strong style="color:#f1c40f;">W</strong> = Witness Point &nbsp;|&nbsp; <strong style="color:#2ecc71;">R</strong> = Review
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Treated/Recycled Water — ITP
</div>
<h3>♻️ Treated Water Network — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Pipe Material</td><td>Mill certificate + DI test</td><td>MME approved / BS EN 545</td><td>W</td></tr>
<tr><td>Excavation</td><td>Level + width + clearance</td><td>±50mm / min 150mm from pipe</td><td>W</td></tr>
<tr><td>Bedding</td><td>Granular Type B + compaction</td><td>95% MDD</td><td>H</td></tr>
<tr><td>Pipe Laying</td><td>Level + joint gap + alignment</td><td>±10mm level, 1:500 gradient</td><td>H</td></tr>
<tr><td>Pressure Test</td><td>1.5×PN for 2 hours</td><td>Zero leakage + zero drop</td><td>H</td></tr>
<tr><td>Flushing</td><td>Velocity ≥1.5 m/s</td><td>Clear discharge</td><td>W</td></tr>
<tr><td>Bacteriological Test</td><td>E. coli + Total Coliform</td><td>Zero coliforms</td><td>W</td></tr>
<tr><td>Backfill</td><td>Density test each layer</td><td>≥95% MDD</td><td>W</td></tr>
</table>
<div style="background:rgba(155,89,182,0.1);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🟣 Purple marker tape mandatory. Maintain ≥1.5m separation from potable water. Cross-connection strictly prohibited.
</div>
</div>
<h3>♻️ Treated Water — ITP Key Items</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Pipe Material</td><td>Certificate check + DI test</td><td>BS/EN + MME approved</td><td>W</td></tr>
<tr><td>Trench Excavation</td><td>Level + width survey</td><td>±50mm</td><td>H</td></tr>
<tr><td>Bedding</td><td>Material + compaction</td><td>Type B / 95% MDD</td><td>H</td></tr>
<tr><td>Pipe Laying</td><td>Level + alignment + joint</td><td>±10mm, 1:500 gradient</td><td>H</td></tr>
<tr><td>Pressure Test</td><td>1.5×PN / 2hr</td><td>Zero leakage</td><td>H</td></tr>
<tr><td>Flushing</td><td>Flow velocity ≥ 1.5 m/s</td><td>Clean discharge</td><td>W</td></tr>
<tr><td>Bacteriological</td><td>Coliform count</td><td>Zero coliforms</td><td>W</td></tr>
<tr><td>Backfill</td><td>Compaction density</td><td>≥ 95% MDD</td><td>W</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:8px;">H = Hold Point | W = Witness Point | MME = Ministry of Municipality</div>
<div style="background:rgba(255,165,0,0.1);border:1px solid rgba(255,165,0,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Purple marker tape mandatory above treated water pipes. Must maintain ≥1.5m separation from potable water.
</div>

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
📌 QCS 2024 — Structural Works | Section 5 (Concrete) + Section 14 (Structural Steel)
</div>
<h3>🏛️ Structural Works — Key Requirements</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('concrete_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px">🏗️</div><div style="color:var(--gold);font-weight:700;">Concrete Works</div>
<div style="color:var(--text3);font-size:11px;">Mix Design | Placing | Curing | Testing</div></div>
<div onclick="QS.openDetail('rebar_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px">🔧</div><div style="color:var(--gold);font-weight:700;">Reinforcement</div>
<div style="color:var(--text3);font-size:11px;">Cover | Lap | Fixing | Testing</div></div>
<div onclick="QS.openDetail('foundations_full')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px">🏔️</div><div style="color:var(--gold);font-weight:700;">Foundations</div>
<div style="color:var(--text3);font-size:11px;">Strip | Raft | Piles</div></div>
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:22px">📋</div><div style="color:var(--gold);font-weight:700;">ITP Concrete</div>
<div style="color:var(--text3);font-size:11px;">Hold & Witness Points</div></div>
</div>
<table class="dm-table">
<tr><th>Item</th><th>Key Requirement</th><th>QCS Ref</th></tr>
<tr><td>Concrete Grade</td><td>Min C25 residential / C30 commercial</td><td>QCS S5 T1</td></tr>
<tr><td>Cube Strength 28d</td><td>≥fcu specified</td><td>QCS S5</td></tr>
<tr><td>Cover to Rebar</td><td>75mm (foundations) / 40-50mm (exposed)</td><td>QCS S5</td></tr>
<tr><td>W/C Ratio</td><td>≤0.45 (severe) / ≤0.50 (moderate)</td><td>QCS S5</td></tr>
<tr><td>Curing Period</td><td>Min 7 days moist / 3 days steam</td><td>QCS S5</td></tr>
</table>
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
📌 QCS 2024 — Section 5 | Concrete Works
</div>
<h3>🏗️ Concrete — QCS 2024 Key Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Cube Strength (28-day)</td><td>≥fcu design strength</td><td>QCS S5 P4</td></tr>
<tr><td>Slump (RC Columns)</td><td>25–75 mm</td><td>QCS S5 P3</td></tr>
<tr><td>Slump (Pumped)</td><td>75–150 mm</td><td>QCS S5 P3</td></tr>
<tr><td>W/C Ratio (Severe)</td><td>≤0.45</td><td>QCS S5 Durability</td></tr>
<tr><td>Min Cement Content</td><td>300 kg/m³ (exposed)</td><td>QCS S5</td></tr>
<tr><td>Max Aggregate Size</td><td>20mm (general) / 10mm (thin sections)</td><td>QCS S5</td></tr>
<tr><td>Curing Period</td><td>Min 7 days (OPC) / 10 days (GGBS/PFA)</td><td>QCS S5</td></tr>
<tr><td>Max Pour Temperature</td><td>≤35°C concrete temperature</td><td>QCS S5 Hot Weather</td></tr>
<tr><td>Min Cover (Foundation)</td><td>75 mm</td><td>QCS S5 / BS 8110</td></tr>
<tr><td>Sampling Frequency</td><td>1 set per 50m³ (min 1/day)</td><td>QCS S5</td></tr>
</table>
<h4 style="margin-top:14px;color:var(--gold);">🔴 Hold Points — Concrete</h4>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;font-size:12px;">
HP1: Mix Design approval before first pour<br>
HP2: Formwork + rebar inspection before pour<br>
HP3: 28-day cube results — Engineer approval before loading
</div>
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
📌 QCS 2024 — Section 5 | Reinforcement Steel
</div>
<h3>🔧 Reinforcement — QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Steel Grade</td><td>B500B (Fy=500 MPa, Fu=600 MPa)</td><td>QCS S5 / BS 4449</td></tr>
<tr><td>Min Cover (Foundation)</td><td>75 mm</td><td>QCS S5</td></tr>
<tr><td>Min Cover (Exposed beam)</td><td>50 mm</td><td>QCS S5</td></tr>
<tr><td>Min Cover (Internal slab)</td><td>25 mm</td><td>QCS S5</td></tr>
<tr><td>Lap Length</td><td>40×bar diameter (tension zones)</td><td>QCS S5 / BS 8110</td></tr>
<tr><td>Bar Spacing (max)</td><td>3×slab depth or 400mm (whichever less)</td><td>QCS S5</td></tr>
<tr><td>Bend Radius (≤16mm)</td><td>Min 2.5×dia</td><td>BS 8666</td></tr>
<tr><td>Tie Wire</td><td>1.6mm mild steel — all intersections</td><td>QCS S5</td></tr>
<tr><td>Cleanliness</td><td>Free from mud, oil, loose scale</td><td>QCS S5</td></tr>
</table>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ Mill certificates required for each delivery. Check bar markings match approved grade. Spacers must maintain cover tolerance ±10mm.
</div>
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
📌 QCS 2024 — Foundations | Section 5 + Geotechnical Report
</div>
<h3>🏔️ Foundations — QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Type</th><th>Key Requirement</th><th>Reference</th></tr>
<tr><td>Strip Foundation</td><td>Min width 600mm / Min depth 1.0m below finished level</td><td>QCS S5</td></tr>
<tr><td>Raft Foundation</td><td>Min thickness 300mm / Designed for differential settlement</td><td>QCS S5</td></tr>
<tr><td>Pile Caps</td><td>Min 75mm cover / Pile embedment ≥75mm into cap</td><td>QCS S5</td></tr>
<tr><td>Founding Level</td><td>As per geotech report / Below weak/expansive soil</td><td>Geotech</td></tr>
<tr><td>Lean Concrete</td><td>Min 75mm C10 blinding layer</td><td>QCS S5</td></tr>
<tr><td>Anti-Sulphate</td><td>SRPC or GGBS if SO3>0.3% in soil</td><td>QCS S5</td></tr>
<tr><td>Waterproofing</td><td>Required if GWL within 1.5m of foundation</td><td>QCS S5</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Qatar: High sulphate soils common. Always verify SO3 + Cl content before specifying concrete. Sabkha areas require special treatment.
</div>
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
📌 QCS 2024 — Piled Foundations | Section 5 + BS EN 1536
</div>
<h3>🔩 Piles — QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Bored Pile Concrete</td><td>Min C30 / Slump 150-200mm (self-compacting)</td><td>QCS S5</td></tr>
<tr><td>Pile Verticality</td><td>Max 1:75 deviation</td><td>BS EN 1536</td></tr>
<tr><td>Position Tolerance</td><td>±75mm plan position</td><td>BS EN 1536</td></tr>
<tr><td>Cover to Cage</td><td>Min 75mm (top) / 50mm (sides)</td><td>QCS S5</td></tr>
<tr><td>Cage Length Tolerance</td><td>±100mm</td><td>BS EN 1536</td></tr>
<tr><td>Load Test</td><td>1% of piles or min 2 per project</td><td>QCS + Geotech</td></tr>
<tr><td>Integrity Test</td><td>Sonic logging 100% (bored piles)</td><td>BS EN 1536</td></tr>
<tr><td>Cutoff Level</td><td>Min 600mm above design cutoff</td><td>QCS S5</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: Pile load test results must be approved by Engineer before proceeding with pile cap construction.
</div>
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
<h3>🏗️ Concrete Works — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Material (Cement)</td><td>Certificate + fineness</td><td>BS EN 197-1 Type I/II</td><td>W</td></tr>
<tr><td>Mix Design</td><td>Trial mixes + cube testing</td><td>fcu + workability met</td><td>H</td></tr>
<tr><td>Formwork</td><td>Dimensional check + seal</td><td>±5mm alignment</td><td>H</td></tr>
<tr><td>Rebar</td><td>Size + spacing + cover</td><td>Cover ±10mm</td><td>H</td></tr>
<tr><td>Pre-Pour Inspection</td><td>All elements verified</td><td>Sign-off by Engineer</td><td>H</td></tr>
<tr><td>Slump Test</td><td>Each delivery / each pour</td><td>Per spec range</td><td>W</td></tr>
<tr><td>Cube Sampling</td><td>1 set per 50m³ / min 1/day</td><td>3 cubes — 7 & 28 day</td><td>W</td></tr>
<tr><td>28-day Strength</td><td>Lab result</td><td>≥fcu design</td><td>H</td></tr>
<tr><td>Curing</td><td>Visual + moisture check</td><td>Min 7 days wet</td><td>W</td></tr>
<tr><td>Stripping</td><td>Cube results + age</td><td>Engineer approval</td><td>H</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:6px;">H = Hold Point | W = Witness Point | QCS 2024 Section 5</div>
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
<h3>🔧 Reinforcement — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test/Check</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Mill Certificate</td><td>Strength + elongation</td><td>B500B fy≥500 MPa</td><td>W</td></tr>
<tr><td>Bar Diameter</td><td>Caliper measurement</td><td>±3% of nominal</td><td>W</td></tr>
<tr><td>Bending Shapes</td><td>Check vs approved BBS</td><td>Matches BS 8666</td><td>W</td></tr>
<tr><td>Cover Spacers</td><td>Type + positioning</td><td>Correct cover per element</td><td>W</td></tr>
<tr><td>Fixing/Tying</td><td>All intersections tied</td><td>Stable, no movement</td><td>H</td></tr>
<tr><td>Lap Lengths</td><td>Measure actual laps</td><td>≥40×dia (tension)</td><td>W</td></tr>
<tr><td>Bar Spacing</td><td>Measure between bars</td><td>Per approved drawing</td><td>W</td></tr>
<tr><td>Cleanliness</td><td>Visual</td><td>No mud/oil/loose scale</td><td>W</td></tr>
</table>
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
<h3>🏔️ Foundations — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Check</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Founding Level</td><td>Survey level vs design</td><td>≥design depth / competent soil</td><td>H</td></tr>
<tr><td>Ground Conditions</td><td>Visual + geotech confirmation</td><td>Matches design assumptions</td><td>H</td></tr>
<tr><td>Blinding Concrete</td><td>Thickness + level</td><td>Min 75mm C10</td><td>W</td></tr>
<tr><td>Waterproofing</td><td>Application + joints</td><td>Continuous, no gaps</td><td>W</td></tr>
<tr><td>Rebar Installation</td><td>Size + spacing + cover</td><td>75mm cover (foundations)</td><td>H</td></tr>
<tr><td>Pre-Pour Inspection</td><td>All elements signed off</td><td>Engineer approval</td><td>H</td></tr>
<tr><td>Concrete Pour</td><td>Slump + cube sampling</td><td>Per mix design</td><td>W</td></tr>
<tr><td>28-day Cubes</td><td>Lab result</td><td>≥fcu specified</td><td>H</td></tr>
</table>
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
<h3>🔩 Piled Foundations — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Pile Position</td><td>Survey before boring</td><td>±75mm from drawing</td><td>W</td></tr>
<tr><td>Pile Diameter</td><td>Caliper during boring</td><td>As specified</td><td>W</td></tr>
<tr><td>Founding Level</td><td>Engineer confirmation</td><td>Competent stratum</td><td>H</td></tr>
<tr><td>Cage Assembly</td><td>Dimensions + cover blocks</td><td>50mm cover sides / 75mm top</td><td>W</td></tr>
<tr><td>Cage Installation</td><td>Level + position</td><td>±100mm length tolerance</td><td>H</td></tr>
<tr><td>Concrete (Tremie)</td><td>Slump + cube samples</td><td>Slump 150-200mm</td><td>W</td></tr>
<tr><td>Cut-off Level</td><td>Survey</td><td>Min 600mm above design</td><td>W</td></tr>
<tr><td>Sonic Integrity Test</td><td>100% of piles</td><td>Class A (clean)</td><td>H</td></tr>
<tr><td>Static Load Test</td><td>1% piles (min 2)</td><td>1.5×design load</td><td>H</td></tr>
</table>
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },

  calculator: { title: '🧮 حاسبة المواصفات — Pass / Fail', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 | حاسبة Pass/Fail — 51 اختبار + Batch Mode + NCR تلقائي
</div>

<!-- MAIN TABS -->
<div style="display:flex;gap:0;margin-bottom:16px;border-radius:10px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);">
<button onclick="switchCalcTab('passfail',this)" id="ctab-passfail" style="flex:1;padding:9px;border:none;background:rgba(201,168,76,0.25);color:var(--gold);font-weight:700;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">✅ Pass/Fail</button>
<button onclick="switchCalcTab('batch',this)" id="ctab-batch" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">📊 Batch</button>
<button onclick="switchCalcTab('history',this)" id="ctab-history" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">📋 History</button>
<button onclick="switchCalcTab('freq',this)" id="ctab-freq" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🗓️ Frequency</button>
</div>

<!-- PASS/FAIL TAB -->
<div id="calc-tab-passfail">
<!-- Category Filter -->
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
<button onclick="filterCalcCat('all')" class="calc-cat-btn active" data-cat="all" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(201,168,76,0.3);background:rgba(201,168,76,0.2);color:var(--gold);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">كل الاختبارات</button>
<button onclick="filterCalcCat('roads')" class="calc-cat-btn" data-cat="roads" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(122,21,21,0.4);background:rgba(122,21,21,0.1);color:#e74c3c;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🛣️ طرق</button>
<button onclick="filterCalcCat('utilities')" class="calc-cat-btn" data-cat="utilities" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(52,152,219,0.4);background:rgba(52,152,219,0.1);color:#3498db;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🔧 مرافق</button>
<button onclick="filterCalcCat('concrete')" class="calc-cat-btn" data-cat="concrete" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(46,204,113,0.4);background:rgba(46,204,113,0.1);color:#2ecc71;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🏗️ خرسانة</button>
<button onclick="filterCalcCat('geotech')" class="calc-cat-btn" data-cat="geotech" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(155,89,182,0.4);background:rgba(155,89,182,0.1);color:#9b59b6;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🔬 تربة</button>
</div>

<!-- Tests Grid -->
<div id="calc-tests-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">

<!-- ROADS -->
<div class="calc-card" data-cat="roads" data-test="compaction">
  <div class="calc-card-title">🟠 نسبة الدمك (Compaction)</div>
  <div class="calc-card-inputs">
    <input type="number" id="comp-field" placeholder="كثافة الحقل (kg/m³)" class="calc-input">
    <input type="number" id="comp-mdd" placeholder="MDD (kg/m³)" class="calc-input">
    <select id="comp-layer" class="calc-input" style="font-size:11px;">
      <option value="100">Subgrade (≥95%)</option>
      <option value="100">Subbase/Base (≥100% BS Heavy)</option>
      <option value="97">Asphalt Core (≥97% TMD)</option>
      <option value="95">Trench Backfill (≥95%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('compaction')" class="calc-run-btn">احسب</button>
  <div id="res-compaction" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="cbr">
  <div class="calc-card-title">🟠 CBR (Soaked 4 days)</div>
  <div class="calc-card-inputs">
    <input type="number" id="cbr-val" placeholder="نتيجة CBR (%)" class="calc-input">
    <select id="cbr-type" class="calc-input" style="font-size:11px;">
      <option value="8">Subgrade (≥8%)</option>
      <option value="30">Subbase (≥30%)</option>
      <option value="80">Roadbase (≥80%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('cbr')" class="calc-run-btn">احسب</button>
  <div id="res-cbr" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="marshall">
  <div class="calc-card-title">🟠 Marshall Stability</div>
  <div class="calc-card-inputs">
    <input type="number" id="mar-stab" placeholder="Stability (kN)" class="calc-input">
    <input type="number" id="mar-flow" placeholder="Flow (mm)" class="calc-input">
    <input type="number" id="mar-va" placeholder="Air Voids (%)" class="calc-input">
  </div>
  <button onclick="runCalcTest('marshall')" class="calc-run-btn">احسب</button>
  <div id="res-marshall" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="core_density">
  <div class="calc-card-title">🟠 Core Density</div>
  <div class="calc-card-inputs">
    <input type="number" id="core-bulk" placeholder="Bulk Density (kg/m³)" class="calc-input">
    <input type="number" id="core-tmd" placeholder="TMD (kg/m³)" class="calc-input">
    <select id="core-layer" class="calc-input" style="font-size:11px;">
      <option value="97">Wearing/Binder (≥97%)</option>
      <option value="96">Base Course (≥96%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('core_density')" class="calc-run-btn">احسب</button>
  <div id="res-core_density" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="iri">
  <div class="calc-card-title">🟠 IRI Smoothness</div>
  <div class="calc-card-inputs">
    <input type="number" id="iri-val" placeholder="IRI (m/km)" step="0.1" class="calc-input">
    <select id="iri-type" class="calc-input" style="font-size:11px;">
      <option value="2.5">Conventional (≤2.5 m/km)</option>
      <option value="0.9">PMB (≤0.9 m/km)</option>
    </select>
  </div>
  <button onclick="runCalcTest('iri')" class="calc-run-btn">احسب</button>
  <div id="res-iri" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="asphalt_temp">
  <div class="calc-card-title">🟠 حرارة الإسفلت</div>
  <div class="calc-card-inputs">
    <input type="number" id="temp-val" placeholder="درجة الحرارة (°C)" class="calc-input">
    <select id="temp-type" class="calc-input" style="font-size:11px;">
      <option value="140">Binder Course (≥140°C)</option>
      <option value="145">Wearing Course (≥145°C)</option>
      <option value="155">PMB Wearing (≥155°C)</option>
      <option value="125">Min Lay Temp (≥125°C)</option>
    </select>
  </div>
  <button onclick="runCalcTest('asphalt_temp')" class="calc-run-btn">احسب</button>
  <div id="res-asphalt_temp" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="crossfall">
  <div class="calc-card-title">🟠 Crossfall</div>
  <div class="calc-card-inputs">
    <input type="number" id="cf-val" placeholder="نسبة الميل (%)" step="0.1" class="calc-input">
    <select id="cf-type" class="calc-input" style="font-size:11px;">
      <option value="2.5">Carriageway (2.5% ±0.5%)</option>
      <option value="3.0">Footpath (3.0% max)</option>
    </select>
  </div>
  <button onclick="runCalcTest('crossfall')" class="calc-run-btn">احسب</button>
  <div id="res-crossfall" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="straightedge">
  <div class="calc-card-title">🟠 Straightedge (3m)</div>
  <div class="calc-card-inputs">
    <input type="number" id="str-val" placeholder="فجوة تحت المسطرة (mm)" class="calc-input">
    <select id="str-layer" class="calc-input" style="font-size:11px;">
      <option value="6">Wearing Course (≤6mm)</option>
      <option value="10">Binder/Base (≤10mm)</option>
      <option value="15">Subbase (≤15mm)</option>
    </select>
  </div>
  <button onclick="runCalcTest('straightedge')" class="calc-run-btn">احسب</button>
  <div id="res-straightedge" class="calc-result"></div>
</div>

<!-- UTILITIES -->
<div class="calc-card" data-cat="utilities" data-test="pressure_test">
  <div class="calc-card-title">🔵 اختبار الضغط</div>
  <div class="calc-card-inputs">
    <input type="number" id="pres-pn" placeholder="PN (bar)" class="calc-input">
    <input type="number" id="pres-test" placeholder="ضغط الاختبار (bar)" class="calc-input">
    <input type="number" id="pres-drop" placeholder="انخفاض الضغط (bar)" step="0.001" class="calc-input">
  </div>
  <button onclick="runCalcTest('pressure_test')" class="calc-run-btn">احسب</button>
  <div id="res-pressure_test" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="air_test">
  <div class="calc-card-title">🔵 Air Test (Foul Sewer)</div>
  <div class="calc-card-inputs">
    <input type="number" id="air-init" placeholder="ضغط ابتدائي (mm Hg)" class="calc-input">
    <input type="number" id="air-final" placeholder="ضغط نهائي (mm Hg)" class="calc-input">
    <input type="number" id="air-time" placeholder="مدة الاختبار (دقيقة)" class="calc-input">
  </div>
  <button onclick="runCalcTest('air_test')" class="calc-run-btn">احسب</button>
  <div id="res-air_test" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="chlorination">
  <div class="calc-card-title">🔵 تعقيم المياه</div>
  <div class="calc-card-inputs">
    <input type="number" id="chl-conc" placeholder="تركيز الكلور (ppm)" class="calc-input">
    <input type="number" id="chl-time" placeholder="مدة التعقيم (ساعة)" class="calc-input">
    <input type="number" id="chl-resid" placeholder="Residual Cl بعد 24h (ppm)" class="calc-input">
  </div>
  <button onclick="runCalcTest('chlorination')" class="calc-run-btn">احسب</button>
  <div id="res-chlorination" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="pipe_sep">
  <div class="calc-card-title">🔵 فصل الأنابيب</div>
  <div class="calc-card-inputs">
    <input type="number" id="sep-horiz" placeholder="فصل أفقي (m)" step="0.1" class="calc-input">
    <input type="number" id="sep-vert" placeholder="فصل رأسي (m)" step="0.1" class="calc-input">
    <div style="font-size:10px;color:var(--text3);padding:4px 0;">ماء فوق الصرف دائماً</div>
  </div>
  <button onclick="runCalcTest('pipe_sep')" class="calc-run-btn">احسب</button>
  <div id="res-pipe_sep" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="sewer_grad">
  <div class="calc-card-title">🔵 انحدار الصرف</div>
  <div class="calc-card-inputs">
    <input type="number" id="sg-dn" placeholder="قطر الأنبوب (mm)" class="calc-input">
    <input type="number" id="sg-grad" placeholder="الانحدار (1:X)" class="calc-input">
  </div>
  <button onclick="runCalcTest('sewer_grad')" class="calc-run-btn">احسب</button>
  <div id="res-sewer_grad" class="calc-result"></div>
</div>

<!-- CONCRETE -->
<div class="calc-card" data-cat="concrete" data-test="cube_strength">
  <div class="calc-card-title">🟢 مقاومة المكعب (28-day)</div>
  <div class="calc-card-inputs">
    <input type="number" id="cube-f" placeholder="مقاومة المكعب (MPa)" class="calc-input">
    <input type="number" id="cube-fcu" placeholder="fcu المطلوب (MPa)" class="calc-input">
    <input type="number" id="cube-7d" placeholder="نتيجة 7-day (MPa) — اختياري" class="calc-input">
  </div>
  <button onclick="runCalcTest('cube_strength')" class="calc-run-btn">احسب</button>
  <div id="res-cube_strength" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="slump">
  <div class="calc-card-title">🟢 Slump Test</div>
  <div class="calc-card-inputs">
    <input type="number" id="slump-val" placeholder="Slump المقاس (mm)" class="calc-input">
    <select id="slump-type" class="calc-input" style="font-size:11px;">
      <option value="25,75">RC Columns/Beams (25-75mm)</option>
      <option value="50,100">RC Slabs (50-100mm)</option>
      <option value="75,150">Pumped Concrete (75-150mm)</option>
      <option value="10,40">Foundations (10-40mm)</option>
      <option value="150,180">Special Elements (150-180mm)</option>
    </select>
  </div>
  <button onclick="runCalcTest('slump')" class="calc-run-btn">احسب</button>
  <div id="res-slump" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="cover_depth">
  <div class="calc-card-title">🟢 Cover Depth</div>
  <div class="calc-card-inputs">
    <input type="number" id="cov-measured" placeholder="Cover المقاس (mm)" class="calc-input">
    <select id="cov-element" class="calc-input" style="font-size:11px;">
      <option value="75">Foundations in soil (75mm)</option>
      <option value="50">Beams/Slabs exposed (50mm)</option>
      <option value="40">Internal elements (40mm)</option>
      <option value="60">Retaining walls (60mm)</option>
      <option value="75">Piles — top (75mm)</option>
    </select>
  </div>
  <button onclick="runCalcTest('cover_depth')" class="calc-run-btn">احسب</button>
  <div id="res-cover_depth" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="wc_ratio">
  <div class="calc-card-title">🟢 W/C Ratio</div>
  <div class="calc-card-inputs">
    <input type="number" id="wc-val" placeholder="W/C Ratio" step="0.01" class="calc-input">
    <select id="wc-expo" class="calc-input" style="font-size:11px;">
      <option value="0.45">Severe (≤0.45)</option>
      <option value="0.50">Moderate (≤0.50)</option>
      <option value="0.55">Mild (≤0.55)</option>
    </select>
  </div>
  <button onclick="runCalcTest('wc_ratio')" class="calc-run-btn">احسب</button>
  <div id="res-wc_ratio" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="rebar_cover">
  <div class="calc-card-title">🟢 Rebar Cover (QCS S5)</div>
  <div class="calc-card-inputs">
    <input type="number" id="rc-nom" placeholder="Nominal Cover (mm)" class="calc-input">
    <input type="number" id="rc-bar" placeholder="Bar Diameter (mm)" class="calc-input">
    <input type="number" id="rc-agg" placeholder="Max Agg Size (mm)" class="calc-input">
  </div>
  <button onclick="runCalcTest('rebar_cover')" class="calc-run-btn">احسب</button>
  <div id="res-rebar_cover" class="calc-result"></div>
</div>

<!-- GEOTECH -->
<div class="calc-card" data-cat="geotech" data-test="spt_bearing">
  <div class="calc-card-title">🟣 SPT + Bearing Capacity</div>
  <div class="calc-card-inputs">
    <input type="number" id="spt-n" placeholder="SPT N-value (blows/300mm)" class="calc-input">
    <input type="number" id="spt-b" placeholder="Foundation Width B (m)" class="calc-input">
  </div>
  <button onclick="runCalcTest('spt_bearing')" class="calc-run-btn">احسب</button>
  <div id="res-spt_bearing" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="geotech" data-test="atterberg">
  <div class="calc-card-title">🟣 Atterberg Limits</div>
  <div class="calc-card-inputs">
    <input type="number" id="att-ll" placeholder="Liquid Limit (%)" class="calc-input">
    <input type="number" id="att-pl" placeholder="Plastic Limit (%)" class="calc-input">
    <select id="att-use" class="calc-input" style="font-size:11px;">
      <option value="subgrade">Subgrade (PI≤12)</option>
      <option value="subbase">Subbase (PI≤6)</option>
      <option value="fill">Fill (PI≤20)</option>
    </select>
  </div>
  <button onclick="runCalcTest('atterberg')" class="calc-run-btn">احسب</button>
  <div id="res-atterberg" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="geotech" data-test="sulphate">
  <div class="calc-card-title">🟣 Sulphate Content</div>
  <div class="calc-card-inputs">
    <input type="number" id="sul-so3" placeholder="SO3 content (%)" step="0.01" class="calc-input">
    <input type="number" id="sul-cl" placeholder="Cl content (%) — opt" step="0.01" class="calc-input">
    <select id="sul-use" class="calc-input" style="font-size:11px;">
      <option value="fill">Fill (SO3≤0.5%)</option>
      <option value="subgrade">Subgrade (SO3≤0.3%)</option>
      <option value="backfill">Backfill to structure (SO3≤0.3%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('sulphate')" class="calc-run-btn">احسب</button>
  <div id="res-sulphate" class="calc-result"></div>
</div>

</div><!-- end grid -->
</div><!-- end passfail tab -->

<!-- BATCH TAB -->
<div id="calc-tab-batch" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.2);border-radius:10px;padding:14px;margin-bottom:14px;">
  <div style="font-weight:700;color:#3498db;margin-bottom:10px;">📊 Batch Compaction Testing</div>
  <div style="font-size:11px;color:var(--text3);margin-bottom:10px;">أدخل عدة قراءات — يحلل الكل دفعة واحدة</div>
  <textarea id="batch-input" placeholder="أدخل النتائج — كل سطر: كثافة الحقل,MDD,نوع الطبقة&#10;مثال:&#10;1850,1900,subgrade&#10;1920,1950,subbase&#10;2280,2350,asphalt" style="width:100%;height:120px;background:var(--dark4);border:1px solid var(--border2);color:var(--text);padding:10px;border-radius:8px;font-family:monospace;font-size:12px;resize:vertical;"></textarea>
  <div style="display:flex;gap:8px;margin-top:10px;">
    <button onclick="runBatchTest()" style="flex:1;background:rgba(52,152,219,0.2);border:1px solid rgba(52,152,219,0.4);border-radius:8px;padding:10px;color:#3498db;font-weight:700;cursor:pointer;font-family:Tajawal,sans-serif;">▶️ تحليل الكل</button>
    <button onclick="exportBatchNCR()" style="flex:1;background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;color:#e74c3c;font-weight:700;cursor:pointer;font-family:Tajawal,sans-serif;">📄 تصدير NCR</button>
  </div>
  <div id="batch-results" style="margin-top:12px;"></div>
</div>
</div>

<!-- HISTORY TAB -->
<div id="calc-tab-history" style="display:none;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
  <div style="font-weight:700;color:var(--gold);">📋 سجل الاختبارات</div>
  <button onclick="clearCalcHistory()" style="background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);border-radius:6px;padding:5px 12px;color:#e74c3c;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🗑️ مسح الكل</button>
</div>
<div id="calc-history-list">
  <div style="text-align:center;color:var(--text3);padding:20px;font-size:13px;">لا يوجد سجل بعد<br><span style="font-size:11px;">النتائج تُحفظ تلقائياً عند كل اختبار</span></div>
</div>
</div>

<!-- FREQUENCY TAB -->
<div id="calc-tab-freq" style="display:none;">
<div id="cat-roads-calc" style="display:block;"></div>
<div id="cat-utilities" style="display:none;"></div>
<div id="cat-structural" style="display:none;"></div>
<div id="cat-geotech_calc" style="display:none;"></div>
</div>

<style>
.calc-card{background:var(--dark3);border:1px solid var(--border2);border-radius:10px;padding:12px;transition:.2s;}
.calc-card:hover{border-color:rgba(201,168,76,0.3);}
.calc-card-title{font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px;}
.calc-input{width:100%;padding:7px 10px;background:var(--dark4);border:1px solid var(--border2);border-radius:6px;color:var(--text);font-size:12px;margin-bottom:5px;outline:none;font-family:Tajawal,sans-serif;}
.calc-input:focus{border-color:rgba(201,168,76,0.5);}
.calc-run-btn{width:100%;padding:8px;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);border-radius:7px;color:var(--gold);font-weight:700;cursor:pointer;font-size:12px;margin-top:4px;font-family:Tajawal,sans-serif;transition:.2s;}
.calc-run-btn:hover{background:rgba(201,168,76,0.25);}
.calc-result{margin-top:8px;padding:8px;border-radius:6px;font-size:11px;min-height:32px;display:none;}
.calc-result.pass{background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.3);color:#2ecc71;display:block;}
.calc-result.fail{background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);color:#e74c3c;display:block;}
.calc-result.warning{background:rgba(243,156,18,0.15);border:1px solid rgba(243,156,18,0.3);color:#f39c12;display:block;}
.calc-cat-btn.active{opacity:1;font-weight:700;}
.calc-cat-btn:not(.active){opacity:0.6;}
</style>
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
<div class="lang-content-en" style="display:none;">
<h3>🏗️ Concrete Placing & Compaction — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Max Drop Height</td><td>≤1.5m free fall (prevent segregation)</td><td>QCS S5</td></tr>
<tr><td>Layer Thickness</td><td>≤450mm (vibrated) / ≤150mm (hand)</td><td>QCS S5</td></tr>
<tr><td>Vibrator Spacing</td><td>≤500mm between insertions</td><td>QCS S5</td></tr>
<tr><td>Vibrator Duration</td><td>Until air bubbles stop (5–15 sec)</td><td>QCS S5</td></tr>
<tr><td>Max Concrete Temp</td><td>≤35°C at point of placing</td><td>QCS S5 Hot Weather</td></tr>
<tr><td>Max Ambient Temp</td><td>≤40°C — use ice, chilled water</td><td>QCS S5</td></tr>
<tr><td>Time Limit (placing)</td><td>≤90 min from batching (or initial set)</td><td>QCS S5</td></tr>
<tr><td>Tremie Pipe (underwater)</td><td>Always submerged in fresh concrete</td><td>QCS S5</td></tr>
</table>
<div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Qatar Hot Weather: Night pouring recommended June–September. Ice substitution up to 50% of mix water permitted.
</div>
</div>
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
<div class="lang-content-en" style="display:none;">
<h3>🔬 Concrete Testing — QCS 2024</h3>
<table class="dm-table">
<tr><th>Test</th><th>Frequency</th><th>Acceptance</th><th>Reference</th></tr>
<tr><td>Slump</td><td>Each delivery (min 1/truck)</td><td>Per design range</td><td>BS EN 12350-2</td></tr>
<tr><td>Cube Sampling</td><td>1 set (3 cubes) per 50m³</td><td>—</td><td>BS EN 12390-3</td></tr>
<tr><td>7-day Cube</td><td>Each set</td><td>≥70% of fcu (monitoring)</td><td>QCS S5</td></tr>
<tr><td>28-day Cube</td><td>Each set</td><td>≥fcu specified</td><td>QCS S5</td></tr>
<tr><td>Temperature (fresh)</td><td>Each delivery in hot weather</td><td>≤35°C</td><td>QCS S5</td></tr>
<tr><td>Air Content</td><td>Per design if air-entrained</td><td>3–6%</td><td>BS EN 12350-7</td></tr>
<tr><td>Schmidt Hammer (in-situ)</td><td>When 28d cubes fail</td><td>Correlation chart</td><td>BS EN 12504-2</td></tr>
<tr><td>Core Test</td><td>When cubes marginal</td><td>≥0.85×fcu</td><td>BS EN 12504-1</td></tr>
</table>
</div>
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Geotechnical Investigation — Qatar Specific Requirements
</div>
<h3>🔬 Select Investigation Phase</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('geo_planning')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Planning</div></div>
<div onclick="QS.openDetail('geo_borehole')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Boreholes</div></div>
<div onclick="QS.openDetail('geo_spt')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🔨</div><div style="color:var(--gold);font-weight:700;font-size:12px;">SPT Testing</div></div>
<div onclick="QS.openDetail('geo_lab')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🔬</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Lab Analysis</div></div>
</div>
<table class="dm-table">
<tr><th>Item</th><th>Qatar Requirement</th></tr>
<tr><td>Min Borehole Depth</td><td>5m below foundation / 1.5×pile length</td></tr>
<tr><td>Borehole Spacing</td><td>25–50m grid (general) / per structure</td></tr>
<tr><td>SPT Frequency</td><td>Every 1.5m or change of strata</td></tr>
<tr><td>Sulphate (SO3)</td><td>Test all layers — critical in Qatar</td></tr>
<tr><td>Groundwater</td><td>Monitor 24h minimum</td></tr>
</table>
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
<h3>🔬 Geotechnical Investigation — ITP</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Borehole Location</td><td>Survey position</td><td>±1.0m of planned</td><td>W</td></tr>
<tr><td>SPT Test</td><td>N-value per 1.5m</td><td>Logged correctly per BS 1377</td><td>W</td></tr>
<tr><td>Undisturbed Sample</td><td>100mm Shelby tube</td><td>Min 1 per 3m in cohesive soils</td><td>W</td></tr>
<tr><td>Groundwater Level</td><td>Standpipe observation</td><td>24hr monitoring</td><td>W</td></tr>
<tr><td>Sulphate (SO3)</td><td>Lab analysis per layer</td><td>Per BS 1377</td><td>W</td></tr>
<tr><td>Chloride Content</td><td>Lab per layer</td><td>Report value</td><td>W</td></tr>
<tr><td>CBR (field)</td><td>DCP test at subgrade</td><td>≥8% for road design</td><td>H</td></tr>
<tr><td>Final Report</td><td>Engineer review</td><td>Signed by approved geologist</td><td>H</td></tr>
</table>
</div>
` },


  roads_materials: { title: '🧱 مواد الطرق — المواصفات والاختبارات', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Asphalt Mix Materials | Tables 5:1 — 5:5 Pages 9-13
</div>

<div class="lang-content-ar">

<h3>📐 جدول 5:1 — Fine Aggregate للـ Marshall Mix — QCS S6 P5 Page 9</h3>
<p style="font-size:11px;color:var(--text3);">Fine Aggregate = المواد المارة من منخل 2.36mm (Marshall) أو 4.75mm (Superpave)</p>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة (Marshall)</th><th>الاختبار</th></tr>
<tr><td>Sand Equivalent</td><td>≥ 35%</td><td>ASTM D2419</td></tr>
<tr><td>Fine Aggregate Angularity (FAA)</td><td>≥ 45% Uncompacted Voids</td><td>ASTM C1252</td></tr>
<tr><td>Clay Content (SE alt.)</td><td>≤ 1%</td><td>ASTM D4318</td></tr>
<tr><td>Plasticity Index</td><td>Non-Plastic (NP)</td><td>ASTM D4318</td></tr>
<tr><td>Soundness (MgSO4)</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>Specific Gravity (Bulk SSD)</td><td>≥ 2.50 Mg/m³</td><td>ASTM C128</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td><td>ASTM C128</td></tr>
<tr><td>Organic Impurities</td><td>Colour ≤ No. 3</td><td>ASTM C40</td></tr>
<tr><td>Sulphate (SO3)</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td><td>BS 1377</td></tr>
</table>

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:8px 0;font-size:12px;">
<strong>Superpave فرق:</strong> Fine Aggregate يُعرَّف كـ مادة مارة من 4.75mm (بدل 2.36mm في Marshall). FAA ≥ 45% يبقى نفسه.
</div>

<h3>📐 جدول 5:2 — Coarse Aggregate للإسفلت — QCS S6 P5 Page 10</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>Wearing Course</th><th>Binder Course</th><th>الاختبار</th></tr>
<tr><td>LA Abrasion Loss</td><td>≤ 25%</td><td>≤ 30%</td><td>ASTM C131</td></tr>
<tr><td>Flakiness Index</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>Elongation Index</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>Polished Stone Value (PSV)</td><td>≥ 55</td><td>لا يُشترط</td><td>BS 812 P114</td></tr>
<tr><td>Fractured Faces (1 face+)</td><td>≥ 95%</td><td>≥ 90%</td><td>ASTM D5821</td></tr>
<tr><td>Fractured Faces (2 faces+)</td><td>≥ 90%</td><td>≥ 85%</td><td>ASTM D5821</td></tr>
<tr><td>Soundness (MgSO4)</td><td>≤ 12%</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td><td>≤ 2%</td><td>ASTM C127</td></tr>
<tr><td>Specific Gravity (Bulk SSD)</td><td>≥ 2.50</td><td>≥ 2.50</td><td>ASTM C127</td></tr>
<tr><td>Sulphate (SO3)</td><td>≤ 0.4%</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td><td>≤ 0.04%</td><td>BS 1377</td></tr>
<tr><td>Alkali Silica Reactivity</td><td>Non-reactive</td><td>Non-reactive</td><td>ASTM C1260</td></tr>
</table>

<h3>📐 جدول 5:3 — Mineral Filler — QCS S6 P5 Page 10</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة</th><th>الاختبار</th></tr>
<tr><td>المصدر</td><td>Stone Dust أو Portland Cement أو Hydrated Lime</td><td>—</td></tr>
<tr><td>% Passing 0.600 mm</td><td>100%</td><td>ASTM C136</td></tr>
<tr><td>% Passing 0.300 mm</td><td>95 - 100%</td><td>ASTM C136</td></tr>
<tr><td>% Passing 0.075 mm</td><td>70 - 100%</td><td>ASTM C136</td></tr>
<tr><td>Plasticity Index</td><td>Non-Plastic (NP)</td><td>ASTM D4318</td></tr>
<tr><td>Voids in Dry Compacted Filler</td><td>28 - 45%</td><td>EN 1097-4</td></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Water Sensitivity (TSR)</td><td>≥ 75% (مع Filler فقط)</td><td>AASHTO T283</td></tr>
</table>

<h3>📐 جدول 5:4 — Asphalt Binder 60/70 — QCS S6 P5 Page 11</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة</th><th>الاختبار</th></tr>
<tr><td>Penetration @ 25°C</td><td>60 - 70 × 0.1mm</td><td>ASTM D5 / BS EN 1426</td></tr>
<tr><td>Softening Point R&B</td><td>49 - 56°C</td><td>ASTM D36 / BS EN 1427</td></tr>
<tr><td>Ductility @ 25°C</td><td>≥ 100 cm</td><td>ASTM D113</td></tr>
<tr><td>Flash Point (COC)</td><td>≥ 232°C</td><td>ASTM D92</td></tr>
<tr><td>Solubility in TCE</td><td>≥ 99%</td><td>ASTM D2042</td></tr>
<tr><td>Specific Gravity @ 25°C</td><td>1.01 - 1.05</td><td>ASTM D70</td></tr>
<tr><td>Wax Content</td><td>≤ 2.2%</td><td>IP 336</td></tr>
<tr><td>Loss on Heating (RTFOT)</td><td>≤ 0.8%</td><td>ASTM D1754</td></tr>
<tr><td>Penetration Ratio after RTFOT</td><td>≥ 50%</td><td>ASTM D5</td></tr>
<tr><td>Ductility after RTFOT @ 25°C</td><td>≥ 50 cm</td><td>ASTM D113</td></tr>
<tr><td>Softening Point after RTFOT</td><td>Increase ≤ 8°C</td><td>ASTM D36</td></tr>
</table>

<h3>📐 جدول 5:5 — PMB Polymer Modified Bitumen — QCS S6 P5 Page 11</h3>
<p style="font-size:11px;color:var(--text3);">PG = Performance Grade | PG76-10 = يتحمل +76°C صيفاً و -10°C شتاءً</p>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة (PG76-10)</th><th>الاختبار</th></tr>
<tr><td>Penetration @ 25°C</td><td>40 - 80 × 0.1mm</td><td>ASTM D5</td></tr>
<tr><td>Softening Point R&B</td><td>≥ 65°C</td><td>ASTM D36</td></tr>
<tr><td>Flash Point</td><td>≥ 235°C</td><td>ASTM D92</td></tr>
<tr><td>Elastic Recovery @ 25°C</td><td>≥ 70%</td><td>ASTM D6084</td></tr>
<tr><td>Force Ductility @ 4°C</td><td>≥ 2 N (at 5cm/min)</td><td>EN 13589</td></tr>
<tr><td>Toughness & Tenacity</td><td>T ≥ 15 J / t ≥ 5 J</td><td>ASTM D5801</td></tr>
<tr><td>G*/sinδ (DSR Unaged) @ 76°C</td><td>≥ 2.2 kPa</td><td>AASHTO T315</td></tr>
<tr><td>G*/sinδ (DSR after RTFOT) @ 76°C</td><td>≥ 4.4 kPa</td><td>AASHTO T315</td></tr>
<tr><td>Phase Angle δ (DSR) @ 76°C</td><td>≤ 75°</td><td>AASHTO T315</td></tr>
<tr><td>Creep Stiffness S (BBR) @ -10°C</td><td>≤ 300 MPa</td><td>AASHTO T313</td></tr>
<tr><td>m-value (BBR) @ -10°C</td><td>≥ 0.300</td><td>AASHTO T313</td></tr>
<tr><td>Storage Stability (ΔSoftening Pt)</td><td>≤ 5°C (after 48hr @ 163°C)</td><td>EN 13399</td></tr>
<tr><td>Solubility</td><td>≥ 99%</td><td>ASTM D2042</td></tr>
<tr><td>Polymer Type</td><td>SBS أو SBR (معتمد من المهندس)</td><td>FTIR</td></tr>
</table>

<h3>📐 Prime Coat — QCS S6 P5 Page 13</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>نوع المادة</td><td>Cutback Bitumen MC-30 أو MC-70</td><td>ASTM D2028</td></tr>
<tr><td>معدل الرش</td><td>0.8 - 1.2 L/m²</td><td>QCS S6 P5 P13</td></tr>
<tr><td>درجة الحرارة عند الرش</td><td>50 - 80°C (حسب grade)</td><td>QCS S6 P5</td></tr>
<tr><td>وقت المعالجة قبل Asphalt</td><td>24 hour كحد أدنى (حسب النفاذ)</td><td>QCS S6 P5</td></tr>
<tr><td>عمق النفاذ</td><td>10 - 15mm في الطبقة</td><td>QCS S6 P5</td></tr>
<tr><td>السطح</td><td>جاف + نظيف + مكنوس بـ Power Broom</td><td>MS</td></tr>
<tr><td>الطقس</td><td>لا يُطبَّق عند مطر أو غبار أو &lt; 10°C</td><td>QCS S6 P5</td></tr>
</table>

<h3>📐 Tack Coat — QCS S6 P5 Page 13</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>Binder Course</th><th>Wearing Course</th><th>المرجع</th></tr>
<tr><td>نوع المادة</td><td>Emulsified Bitumen SS-1 أو CSS-1</td><td>Emulsified Bitumen SS-1 أو CSS-1</td><td>ASTM D977</td></tr>
<tr><td>معدل الرش (Residual)</td><td>0.3 - 0.5 L/m²</td><td>0.2 - 0.4 L/m²</td><td>QCS S6 P5 P13</td></tr>
<tr><td>درجة الحرارة</td><td>50 - 70°C</td><td>50 - 70°C</td><td>QCS S6 P5</td></tr>
<tr><td>وقت المعالجة</td><td>حتى يتحول من بني للأسود</td><td>حتى يتحول من بني للأسود</td><td>Visual</td></tr>
<tr><td>السطح</td><td>جاف + نظيف</td><td>جاف + نظيف</td><td>MS</td></tr>
<tr><td>تجنب الإفراط</td><td colspan="2">Tack زائد = Slippage بين الطبقات</td><td>QCS S6 P5</td></tr>
</table>

</div>

<div class="lang-content-en" style="display:none;">
<h3>Table 5:1 — Fine Aggregate for Asphalt Mix (Marshall) — QCS S6 P5 Page 9</h3>
<p style="font-size:11px;color:var(--text3);">Fine Aggregate = passing 2.36mm sieve (Marshall) or 4.75mm sieve (Superpave)</p>
<table class="dm-table">
<tr><th>Property</th><th>Specification</th><th>Test</th></tr>
<tr><td>Sand Equivalent</td><td>≥ 35%</td><td>ASTM D2419</td></tr>
<tr><td>Fine Aggregate Angularity</td><td>≥ 45% Uncompacted Voids</td><td>ASTM C1252</td></tr>
<tr><td>Plasticity Index</td><td>Non-Plastic (NP)</td><td>ASTM D4318</td></tr>
<tr><td>Soundness MgSO4</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td><td>ASTM C128</td></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td><td>BS 1377</td></tr>
</table>

<h3>Table 5:2 — Coarse Aggregate for Asphalt — QCS S6 P5 Page 10</h3>
<table class="dm-table">
<tr><th>Property</th><th>Wearing</th><th>Binder</th><th>Test</th></tr>
<tr><td>LA Abrasion</td><td>≤ 25%</td><td>≤ 30%</td><td>ASTM C131</td></tr>
<tr><td>Flakiness Index</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812</td></tr>
<tr><td>PSV</td><td>≥ 55</td><td>N/A</td><td>BS 812 P114</td></tr>
<tr><td>Fractured Faces (1+)</td><td>≥ 95%</td><td>≥ 90%</td><td>ASTM D5821</td></tr>
<tr><td>Fractured Faces (2+)</td><td>≥ 90%</td><td>≥ 85%</td><td>ASTM D5821</td></tr>
<tr><td>Water Absorption</td><td>≤ 2%</td><td>≤ 2%</td><td>ASTM C127</td></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.4%</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
</table>

<h3>Table 5:3 — Mineral Filler — QCS S6 P5 Page 10</h3>
<table class="dm-table">
<tr><th>Property</th><th>Specification</th><th>Test</th></tr>
<tr><td>Source</td><td>Stone Dust / Portland Cement / Hydrated Lime</td><td>—</td></tr>
<tr><td>% Passing 0.600mm</td><td>100%</td><td>ASTM C136</td></tr>
<tr><td>% Passing 0.075mm</td><td>70-100%</td><td>ASTM C136</td></tr>
<tr><td>Plasticity Index</td><td>Non-Plastic</td><td>ASTM D4318</td></tr>
<tr><td>Voids in Dry Compacted Filler</td><td>28-45%</td><td>EN 1097-4</td></tr>
</table>

<h3>Table 5:4 — Bitumen 60/70 — QCS S6 P5 Page 11</h3>
<table class="dm-table">
<tr><th>Property</th><th>Specification</th><th>Test</th></tr>
<tr><td>Penetration @ 25°C</td><td>60-70 × 0.1mm</td><td>ASTM D5</td></tr>
<tr><td>Softening Point R&B</td><td>49-56°C</td><td>ASTM D36</td></tr>
<tr><td>Ductility @ 25°C</td><td>≥ 100 cm</td><td>ASTM D113</td></tr>
<tr><td>Flash Point</td><td>≥ 232°C</td><td>ASTM D92</td></tr>
<tr><td>Wax Content</td><td>≤ 2.2%</td><td>IP 336</td></tr>
<tr><td>Loss on Heating RTFOT</td><td>≤ 0.8%</td><td>ASTM D1754</td></tr>
<tr><td>Penetration Ratio after RTFOT</td><td>≥ 50%</td><td>ASTM D5</td></tr>
</table>

<h3>Table 5:5 — PMB (PG76-10) — QCS S6 P5 Page 11</h3>
<table class="dm-table">
<tr><th>Property</th><th>Specification</th><th>Test</th></tr>
<tr><td>Penetration @ 25°C</td><td>40-80 × 0.1mm</td><td>ASTM D5</td></tr>
<tr><td>Softening Point</td><td>≥ 65°C</td><td>ASTM D36</td></tr>
<tr><td>Elastic Recovery @ 25°C</td><td>≥ 70%</td><td>ASTM D6084</td></tr>
<tr><td>G*/sinδ (Unaged) @ 76°C</td><td>≥ 2.2 kPa</td><td>AASHTO T315</td></tr>
<tr><td>G*/sinδ (after RTFOT) @ 76°C</td><td>≥ 4.4 kPa</td><td>AASHTO T315</td></tr>
<tr><td>Creep Stiffness @ -10°C</td><td>≤ 300 MPa</td><td>AASHTO T313</td></tr>
<tr><td>Storage Stability ΔSP</td><td>≤ 5°C</td><td>EN 13399</td></tr>
</table>

<h3>Prime Coat — QCS S6 P5 Page 13</h3>
<table class="dm-table">
<tr><th>Item</th><th>Specification</th></tr>
<tr><td>Material</td><td>Cutback Bitumen MC-30 or MC-70</td></tr>
<tr><td>Application Rate</td><td>0.8 - 1.2 L/m²</td></tr>
<tr><td>Temperature at Spray</td><td>50 - 80°C</td></tr>
<tr><td>Curing Time</td><td>Minimum 24 hours before asphalt</td></tr>
</table>

<h3>Tack Coat — QCS S6 P5 Page 13</h3>
<table class="dm-table">
<tr><th>Item</th><th>On Binder</th><th>On Wearing</th></tr>
<tr><td>Material</td><td>SS-1 or CSS-1 Emulsion</td><td>SS-1 or CSS-1 Emulsion</td></tr>
<tr><td>Rate (Residual)</td><td>0.3 - 0.5 L/m²</td><td>0.2 - 0.4 L/m²</td></tr>
<tr><td>Temperature</td><td>50 - 70°C</td><td>50 - 70°C</td></tr>
</table>
</div>
` },

  roads_qcp: { title: '📊 خطة ضبط الجودة — الطرق (QCP)', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 1 | Quality Control Plan — Roads</div>

<h3>📋 هيكل خطة ضبط الجودة</h3>
<p>خطة ضبط الجودة (QCP) وثيقة إلزامية تُقدَّم للاستشاري قبل بدء التنفيذ. تشمل جميع الاختبارات والفحوصات المطلوبة لكل مرحلة.</p>

<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>الوثيقة</th><th>المحتوى</th><th>التوقيت</th><th>الاعتماد</th></tr>
<tr><td>Method Statement</td><td>طريقة تنفيذ كل مرحلة</td><td>قبل البدء بأسبوعين</td><td>Consultant</td></tr>
<tr><td>Material Submittal</td><td>شهادات كل المواد + اختبارات</td><td>قبل التوريد</td><td>Consultant</td></tr>
<tr><td>ITP</td><td>خطة الفحص والاختبار</td><td>قبل البدء</td><td>Consultant + Client</td></tr>
<tr><td>Mix Design / JMF</td><td>تصميم الخلطة Asphaltية</td><td>قبل الإنتاج</td><td>Consultant</td></tr>
<tr><td>Trial Section Report</td><td>نتائج القطعة التجريبية 50m</td><td>قبل الإنتاج الكامل</td><td>Consultant</td></tr>
<tr><td>Plant Calibration</td><td>معايرة محطة Asphalt</td><td>قبل الإنتاج</td><td>Consultant</td></tr>
</table>

<h3>2.0 — Hold Points الإلزامية</h3>
<table class="dm-table">
<tr><th>HP</th><th>المرحلة</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>HP-01</td><td>قبل ردم Subgrade</td><td>Material Approval + Proctor + CBR</td><td>Consultant</td></tr>
<tr><td>HP-02</td><td>اعتماد Subgrade</td><td>Density ≥95% + CBR ≥8% + Level</td><td>Consultant</td></tr>
<tr><td>HP-03</td><td>اعتماد Subbase</td><td>Density ≥98% + CBR ≥70% + Level</td><td>Consultant</td></tr>
<tr><td>HP-04</td><td>اعتماد Base Course</td><td>Density ≥98% + CBR ≥80% + Level</td><td>Consultant</td></tr>
<tr><td>HP-05</td><td>اعتماد Prime Coat</td><td>Rate + Coverage + Curing</td><td>Consultant</td></tr>
<tr><td>HP-06</td><td>قبل إنتاج Asphalt</td><td>JMF + Trial Section معتمدة</td><td>Consultant</td></tr>
<tr><td>HP-07</td><td>اعتماد Binder Course</td><td>Core Density + Thickness + Level</td><td>Consultant</td></tr>
<tr><td>HP-08</td><td>اعتماد Wearing Course</td><td>Core + PSV + Straightedge + Level</td><td>Consultant + Ashghal</td></tr>
<tr><td>HP-09</td><td>التسليم النهائي</td><td>As-Built + All Tests + Road Markings</td><td>Ashghal</td></tr>
</table>

<h3>3.0 — تكرار الاختبارات الميدانية</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الطبقة</th><th>التكرار</th><th>المعيار</th></tr>
<tr><td>Sand Cone Density</td><td>Subgrade/Subbase/Base</td><td>كل 500m²</td><td>≥95-98% MDD</td></tr>
<tr><td>Nuclear Gauge</td><td>كل الطبقات</td><td>كل 200m²</td><td>للمراقبة السريعة</td></tr>
<tr><td>CBR Field</td><td>Subgrade/Subbase/Base</td><td>كل 2000m²</td><td>حسب الطبقة</td></tr>
<tr><td>Level Survey</td><td>كل الطبقات</td><td>كل 25m</td><td>± 6-10mm</td></tr>
<tr><td>Asphalt Temperature</td><td>Binder/Wearing</td><td>كل حمولة</td><td>≥ 140°C</td></tr>
<tr><td>Marshall Test</td><td>Binder/Wearing</td><td>كل 200 طن</td><td>≥ 8 kN</td></tr>
<tr><td>Core Samples</td><td>Binder/Wearing</td><td>كل 1000m²</td><td>≥ 98% TMD</td></tr>
<tr><td>Straightedge 3m</td><td>Wearing</td><td>كل 100m</td><td>≤ 5mm</td></tr>
<tr><td>PSV Test</td><td>Wearing (ركام)</td><td>كل مصدر</td><td>≥ 55</td></tr>
</table>

<h3>4.0 — NCR إجراءات عدم المطابقة</h3>
<table class="dm-table">
<tr><th>الحالة</th><th>الإجراء</th><th>المسؤول</th></tr>
<tr><td>Density &lt; 95% MDD</td><td>وقف + إعادة Compaction + إعادة اختبار</td><td>QC Engineer</td></tr>
<tr><td>CBR أقل من المطلوب</td><td>NCR + استبدال المواد + إعادة</td><td>QC + Consultant</td></tr>
<tr><td>درجة حرارة إسفلت &lt; 140°C</td><td>رفض الحمولة فوراً</td><td>QC Engineer</td></tr>
<tr><td>Marshall Fail</td><td>NCR + مراجعة JMF + وقف الإنتاج</td><td>QC + Consultant</td></tr>
<tr><td>Core Density &lt; 98% TMD</td><td>NCR + تحقيق + Core إضافي</td><td>QC + Consultant</td></tr>
<tr><td>Level خارج التفاوت</td><td>قشط أو ردم + إعادة قياس</td><td>QC Engineer</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Roads — Quality Control Plan Summary</h3>
<table class="dm-table">
<tr><th>Phase</th><th>Test</th><th>Frequency</th><th>Acceptance</th></tr>
<tr><td>Subgrade</td><td>Density (Sand Cone)</td><td>1/500m²</td><td>≥95% MDD</td></tr>
<tr><td>Subgrade</td><td>CBR soaked</td><td>1/500m³</td><td>≥8%</td></tr>
<tr><td>Subbase</td><td>Density</td><td>1/500m²</td><td>≥100% BS Heavy</td></tr>
<tr><td>Subbase</td><td>Gradation</td><td>Per source change</td><td>QCS S6 Table</td></tr>
<tr><td>Binder Course</td><td>Delivery temp</td><td>Each truck</td><td>≥140°C</td></tr>
<tr><td>Binder Course</td><td>Core density</td><td>1/250m²</td><td>≥97% TMD</td></tr>
<tr><td>Wearing Course</td><td>Delivery temp</td><td>Each truck</td><td>≥145°C</td></tr>
<tr><td>Wearing Course</td><td>Core density</td><td>1/250m²</td><td>≥97% TMD</td></tr>
<tr><td>Wearing Course</td><td>IRI</td><td>100% lanes</td><td>≤2.5 m/km</td></tr>
<tr><td>Final Surface</td><td>Straightedge 3m</td><td>Random</td><td>≤6mm gap</td></tr>
</table>
</div>
` },

  utilities_materials: { title: '🧱 مواد المرافق — المواصفات والاختبارات', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Utilities Materials</div>

<h3>1️⃣ مواسير مياه الشرب</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>HDPE PE100</td><td>ISO 4427 | PN10-16</td><td>Wall Thickness + OD</td><td>كل دفعة</td></tr>
<tr><td>Ductile Iron Class K9</td><td>ISO 2531</td><td>Hydraulic Test</td><td>كل دفعة</td></tr>
<tr><td>uPVC PN10-16</td><td>ISO 1452</td><td>Flattening Test</td><td>كل دفعة</td></tr>
<tr><td>Gate Valve PN16</td><td>BS 5163</td><td>Pressure Test</td><td>كل دفعة</td></tr>
<tr><td>Rubber Ring</td><td>BS EN 681</td><td>Hardness + Compression</td><td>كل دفعة</td></tr>
<tr><td>Thrust Block Concrete</td><td>C25</td><td>Cube Test</td><td>كل صبة</td></tr>
<tr><td>Marker Tape — أصفر</td><td>KAHRAMAA Std</td><td>بصري 100%</td><td>100%</td></tr>
</table>

<h3>2️⃣ مواسير Foul Sewer</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>uPVC SN8</td><td>ISO 4435</td><td>Ring Stiffness + Impact</td><td>كل دفعة</td></tr>
<tr><td>GRP SN5000</td><td>ISO 10467</td><td>Stiffness + Bending</td><td>كل دفعة</td></tr>
<tr><td>Precast Manhole Rings</td><td>BS 5911</td><td>Crushing Load</td><td>كل دفعة</td></tr>
<tr><td>Manhole Cover D400</td><td>BS EN 124</td><td>Load Test 400kN</td><td>كل دفعة</td></tr>
<tr><td>Benching Mortar 1:2</td><td>QCS S8 P2</td><td>Compressive Strength</td><td>كل دفعة</td></tr>
<tr><td>Marker Tape — أخضر</td><td>QCS S8</td><td>بصري 100%</td><td>100%</td></tr>
</table>

<h3>3️⃣ مواسير الصرف السطحي</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>RCP Reinforced Concrete</td><td>BS 5911 Part 100</td><td>Crushing Load Test</td><td>كل دفعة</td></tr>
<tr><td>HDPE Corrugated SN8</td><td>EN 13476</td><td>Ring Stiffness</td><td>كل دفعة</td></tr>
<tr><td>Gully Grating D400</td><td>BS EN 124</td><td>Load Test</td><td>كل دفعة</td></tr>
<tr><td>Silt Bucket</td><td>HDPE مقاوم</td><td>بصري</td><td>100%</td></tr>
</table>

<h3>4️⃣ مواسير المياه المعالجة</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>اللون</th><th>الاختبار</th></tr>
<tr><td>HDPE PE100 — بنفسجي</td><td>ISO 4427 | PN10</td><td>RAL 4001 بنفسجي</td><td>Color + Wall Thickness</td></tr>
<tr><td>uPVC — بنفسجي</td><td>ISO 1452 | PN10</td><td>RAL 4001 بنفسجي</td><td>Color + Pressure</td></tr>
<tr><td>Marker Tape — بنفسجي</td><td>MME Std</td><td>بنفسجي</td><td>100% بصري</td></tr>
</table>

<h3>5️⃣ مواد البيدنج والردم</h3>
<table class="dm-table">
<tr><th>المادة</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>Sand Bedding</td><td>نظيف ≤ 20mm</td><td>Grading</td><td>كل 500m³</td></tr>
<tr><td>Selected Fill</td><td>≤ 75mm | CBR≥8%</td><td>CBR + Grading</td><td>كل 500m³</td></tr>
<tr><td>Backfill Compaction</td><td>≥ 90-98% MDD</td><td>Sand Cone</td><td>كل 500m²</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🧱 Utilities Materials — QCS 2024 Section 8</h3>
<table class="dm-table">
<tr><th>Pipe Type</th><th>Network</th><th>Standard</th></tr>
<tr><td>HDPE PE100 PN10-16</td><td>Water Supply</td><td>ISO 4427</td></tr>
<tr><td>Ductile Iron K9</td><td>Water Supply</td><td>ISO 2531</td></tr>
<tr><td>uPVC SN8</td><td>Foul Sewer</td><td>ISO 4435</td></tr>
<tr><td>GRP SN5000</td><td>Foul Sewer</td><td>ISO 10467</td></tr>
<tr><td>RCP Class 2</td><td>Storm Water</td><td>BS 5911</td></tr>
<tr><td>HDPE Purple</td><td>Treated Water</td><td>ISO 4427</td></tr>
<tr><td>Manhole Cover D400</td><td>All</td><td>BS EN 124</td></tr>
</table>
<p><strong>Backfill:</strong> Sand bedding 150mm | Selected Fill compacted ≥90-95% MDD | Document every layer</p>
</div>
` },

  utilities_qcp: { title: '📊 خطة ضبط الجودة — المرافق (QCP)', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Quality Control Plan — Utilities</div>

<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>الوثيقة</th><th>المحتوى</th><th>الجهة</th></tr>
<tr><td>Material Submittal</td><td>شهادات المواسير + Fittings + Valves</td><td>Consultant + KAHRAMAA/Ashghal</td></tr>
<tr><td>Method Statement</td><td>طريقة الحفر + وضع المواسير + الاختبار</td><td>Consultant</td></tr>
<tr><td>Shop Drawings</td><td>مخططات تفصيلية معتمدة</td><td>Consultant + Authority</td></tr>
<tr><td>NOC Documents</td><td>KAHRAMAA + Ashghal + Ooredoo + QP</td><td>كل الجهات</td></tr>
<tr><td>Trench Shoring Design</td><td>للأعماق &gt; 1.5m</td><td>Consultant</td></tr>
</table>

<h3>2.0 — Hold Points مياه الشرب</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>HP-01</td><td>Material Approval قبل التوريد</td><td>Consultant</td></tr>
<tr><td>HP-02</td><td>Bedding + Depth قبل وضع المواسير</td><td>Consultant</td></tr>
<tr><td>HP-03</td><td>Joints + Thrust Blocks قبل الردم</td><td>Consultant</td></tr>
<tr><td>HP-04</td><td>Pressure Test (1.5x / 2hr / صفر)</td><td>Consultant + KAHRAMAA</td></tr>
<tr><td>HP-05</td><td>Chlorination (50ppm / 24hr)</td><td>KAHRAMAA Lab</td></tr>
<tr><td>HP-06</td><td>Water Quality (Coliform=0 / Turbidity≤1)</td><td>KAHRAMAA</td></tr>
</table>

<h3>3.0 — Hold Points Foul Sewer</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>HP-01</td><td>Material Approval</td><td>Consultant</td></tr>
<tr><td>HP-02</td><td>Gradient بـ Laser Level (± 3mm)</td><td>Consultant</td></tr>
<tr><td>HP-03</td><td>Manhole Construction + Benching</td><td>Consultant</td></tr>
<tr><td>HP-04</td><td>Air Test (100mm WG / ≤25mm / 5min)</td><td>Consultant</td></tr>
<tr><td>HP-05</td><td>CCTV Inspection (100% / Grade≤2)</td><td>Consultant + Authority</td></tr>
<tr><td>HP-06</td><td>Backfill Compaction ≥95%</td><td>Consultant</td></tr>
</table>

<h3>4.0 — الاختبارات الإلزامية الموحدة</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الشبكة</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Pressure Test</td><td>مياه الشرب + معالجة</td><td>1.5x / 2hr / صفر</td><td>كل Section</td></tr>
<tr><td>Air Test</td><td>صرف صحي</td><td>100mm WG / ≤25mm / 5min</td><td>كل Section</td></tr>
<tr><td>Hydraulic Test</td><td>صرف سطحي</td><td>لا تسريب / 30min</td><td>كل Section</td></tr>
<tr><td>CCTV Inspection</td><td>صرف صحي + سطحي</td><td>100% / Grade≤2</td><td>قبل التسليم</td></tr>
<tr><td>Water Quality</td><td>مياه الشرب</td><td>Coliform=0 / Turbidity≤1</td><td>كل Section</td></tr>
<tr><td>Cross Connection</td><td>مياه معالجة</td><td>صفر تلوث</td><td>كل Section</td></tr>
<tr><td>Backfill Compaction</td><td>كل الشبكات</td><td>≥90-95% MDD</td><td>كل 500m²</td></tr>
<tr><td>Gully Level</td><td>صرف سطحي</td><td>± 5mm من الطريق</td><td>كل Gully</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🔧 Utilities — Quality Control Plan Summary</h3>
<table class="dm-table">
<tr><th>Network</th><th>Key Test</th><th>Acceptance</th><th>Standard</th></tr>
<tr><td>Water Supply</td><td>Pressure 1.5×PN / 2hr</td><td>Zero drop</td><td>KAHRAMAA</td></tr>
<tr><td>Water Supply</td><td>Chlorination ≥50ppm / 24hr</td><td>Residual ≥0.2ppm</td><td>KAHRAMAA</td></tr>
<tr><td>Water Supply</td><td>Bacteriological</td><td>Zero coliforms</td><td>WHO</td></tr>
<tr><td>Foul Sewer</td><td>Air test 100mm Hg / 5min</td><td>Drop ≤25mmHg</td><td>Ashghal</td></tr>
<tr><td>Foul Sewer</td><td>CCTV survey</td><td>100% / Grade ≤B2</td><td>Ashghal</td></tr>
<tr><td>Storm Drainage</td><td>Hydraulic test</td><td>Zero leakage</td><td>Ashghal</td></tr>
<tr><td>Treated Water</td><td>Pressure + cross-connection</td><td>Zero cross-connection</td><td>MME</td></tr>
<tr><td>All Networks</td><td>Compaction backfill</td><td>≥95% MDD</td><td>Ashghal</td></tr>
</table>
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
<h3>🏛️ Structural Works — Materials Requirements</h3>
<table class="dm-table">
<tr><th>Material</th><th>Specification</th><th>Standard</th></tr>
<tr><td>Concrete (Min Grade)</td><td>C25 (residential) / C30 (commercial)</td><td>QCS S5</td></tr>
<tr><td>Cement Type</td><td>OPC (CEM I) / SRPC if SO3 soil</td><td>BS EN 197-1</td></tr>
<tr><td>Rebar Grade</td><td>B500B — fy=500 MPa</td><td>BS 4449 / QCS S5</td></tr>
<tr><td>Structural Steel</td><td>S275 / S355 (as designed)</td><td>BS EN 10025</td></tr>
<tr><td>Formwork</td><td>Adequate strength / ±5mm alignment</td><td>QCS S5</td></tr>
<tr><td>Waterproofing</td><td>System C (basement) / Type A (tanking)</td><td>BS 8102</td></tr>
<tr><td>Admixtures</td><td>KAHRAMAA/QCS approved only</td><td>BS EN 934</td></tr>
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
<tr><td>Cube Result 7 day</td><td>≥ 70% fcu <strong style="color:#e67e22">(مراقبة — ليس قبول)</strong></td><td>كل عينة</td><td>بعد 7 أيام</td></tr>
<tr><td>Cube Result 28 day</td><td>≥ 100% fcu <strong>(القبول الرسمي QCS S5)</strong></td><td>كل عينة</td><td>بعد 28 يوم</td></tr>
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
<h3>🏛️ Structural Works — QCP Summary</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Acceptance</th></tr>
<tr><td>Concrete Mix Design</td><td>Trial mixes + cubes</td><td>Before first pour</td><td>fcu + workability</td></tr>
<tr><td>Rebar</td><td>Mill cert + dimensions</td><td>Each delivery</td><td>B500B grade</td></tr>
<tr><td>Pre-pour inspection</td><td>Rebar + formwork check</td><td>Every pour</td><td>Engineer H/P</td></tr>
<tr><td>Slump test</td><td>Each delivery</td><td>Every truck</td><td>Per design</td></tr>
<tr><td>Cube sampling</td><td>28-day strength</td><td>1/50m³</td><td>≥fcu</td></tr>
<tr><td>Cover check</td><td>Measured after fixing</td><td>Each element</td><td>Per element type</td></tr>
<tr><td>Torque test (bolts)</td><td>Structural steel</td><td>10% random</td><td>Spec torque</td></tr>
</table>
</div>
` },


  ms_asphalt: { title: '📋 Method Statement — Asphalt Works', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 Based on Parsons Approved MS | EXW-P008-0003-CS-CCC-MT-00040 Rev.CE | QCS 2024 Part 6
</div>
<div class="lang-content-ar">
<h3>📋 نطاق العمل</h3>
<p>يغطي هذا الـ Method Statement أعمال Asphalt (PMB و Non-PMB) وفق QCS 2024 Part 6. يُطبَّق على جميع طبقات Asphalt في مشاريع الطرق القطرية.</p>
<h3>1.3 المعدات والآليات</h3>
<table class="dm-table"><tr><th>المعدة</th><th>الملاحظات</th></tr>
<tr><td>Paver VOGELE 1900-2100</td><td>Self-propelled + Sonic Averaging Beam</td></tr>
<tr><td>Double Drum Roller 10-12t</td><td>Initial + Intermediate Rolling</td></tr>
<tr><td>Pneumatic Tyre Roller (PTR)</td><td>4-5 passes intermediate</td></tr>
<tr><td>Shuttle Buggy</td><td>للـ PMB Asphalt إلزامي</td></tr>
<tr><td>Bitumen Spray Tanker</td><td>Calibration Report مطلوب قبل البدء</td></tr>
<tr><td>Thermometers + 3m Straight Edge</td><td>Calibration Report مطلوب</td></tr>
<tr><td>Truck Mounted Attenuator (TMA)</td><td>TTM Equipment إلزامي</td></tr>
</table>
<h3>1.4 المواد</h3>
<p>• جميع مواد Asphalt تُنتَج وفق JMF معتمد من المهندس<br>
• محطة Asphalt يجب أن تكون مدرجة في Ashghal Approved List<br>
• Prime Coat / Tack Coat: MAR معتمد قبل التطبيق</p>
<h3>2.1 التحضير والتنسيق</h3>
<p>• اعتماد RFIT لإخلاء المرافق وطبقات Subbase/Base قبل Asphalt<br>
• Trial Section (50m) معتمد قبل الإنتاج الكامل — QCS 2024 S6 P5.7.3<br>
• Paving Plan مُعدّ ومعتمد من المهندس قبل كل يوم فرش<br>
• لا يبدأ الفرش بدون ITP Hold Point مكتمل</p>
<h3>2.3 قبل الفرش مباشرة</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr>
<tr><td>تنظيف السطح</td><td>Power Broom + Power Blower</td></tr>
<tr><td>Prime/Tack Coat</td><td>مُطبَّق ومعالج قبل الفرش</td></tr>
<tr><td>حركة الشاحنات</td><td>تقليل إلى أدنى حد على الـ Tack Coat</td></tr>
<tr><td>Drive Lines</td><td>معيّنة ومعتمدة من الفورمان</td></tr>
<tr><td>Joints</td><td>قطع نظيف + طلاء بيتومين</td></tr>
<tr><td>Transverse Joints</td><td>Offset ≥ 2m من الجوينت تحته</td></tr>
</table>
<h3>2.4 الفرش — Non-PMB Asphalt</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>درجة الحرارة عند الوصول</td><td>≥ 135°C (Minimum Absolute)</td></tr>
<tr><td>وقف الإنتاج</td><td>درجة حرارة محيط &lt; 8°C أو مطر أو غبار</td></tr>
<tr><td>سماكة WC المفردة</td><td>45-55mm مضغوط</td></tr>
<tr><td>سماكة BC-B</td><td>60-80mm مضغوط</td></tr>
<tr><td>سماكة BC-A</td><td>80-100mm مضغوط</td></tr>
<tr><td>المسافة بين Paver مجاورين</td><td>≤ 50m بدون rolling</td></tr>
<tr><td>Hot-on-Hot Longitudinal Joint</td><td>قبل انخفاض الحرارة عن 90°C</td></tr>
</table>
<h3>2.4.1 نمط الCompaction — Non-PMB</h3>
<p>1️⃣ Pass Static — 10t Double Drum Roller<br>
2️⃣ Passes Vibration — 10t Double Drum Roller<br>
4️⃣ Passes — Pneumatic Tyre Roller (PTR)<br>
1️⃣ Pass Static — 10t Double Drum Roller (Finishing)</p>
<h3>2.5 الفرش — PMB Asphalt</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>درجة حرارة الفرش (Minimum)</td><td>145°C عند الـ Paver</td></tr>
<tr><td>نطاق درجة الحرارة</td><td>145-160°C</td></tr>
<tr><td>Shuttle Buggy</td><td>إلزامي للـ PMB</td></tr>
<tr><td>IRI للـ Wearing Course PMB</td><td>≤ 0.9 m/km (400m Section) — PWA IAN 013</td></tr>
<tr><td>Straightedge 3m (PMB WC)</td><td>≤ 3mm Transverse (كل 20m)</td></tr>
</table>
<h3>2.5.1 نمط الCompaction — PMB</h3>
<p>1️⃣ Pass Static — 12t Double Drum Roller<br>
2️⃣ Passes Vibration — 12t DDR (BC) / 3 Passes (WC)<br>
4-5 Passes — PTR (2 Rollers)<br>
1️⃣ Pass Static — 10t DDR (Finishing)</p>
<h3>3.0 ضبط الجودة الميداني</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>التكرار</th><th>المعيار</th></tr>
<tr><td>درجة الحرارة</td><td>كل حمولة</td><td>≥ 135°C (Non-PMB) / ≥ 145°C (PMB)</td></tr>
<tr><td>Marshall Test</td><td>كل 200 طن</td><td>≥ 8kN (≥9 للطرق الرئيسية)</td></tr>
<tr><td>Bitumen Extraction</td><td>كل 200 طن</td><td>JMF ± 0.3%</td></tr>
<tr><td>Core Samples</td><td>كل 1000m²</td><td>≥ 98% TMD</td></tr>
<tr><td>Straightedge 3m</td><td>كل 100m</td><td>≤ 5mm (≤3mm للـ PMB WC)</td></tr>
<tr><td>Level Survey</td><td>كل 25m</td><td>± 6mm WC</td></tr>
<tr><td>IRI Measurement (PMB WC)</td><td>كل Section 400m</td><td>≤ 0.9 m/km</td></tr>
</table>
<h3>2.8 معالجة عدم المطابقة</h3>
<p>• قطع وإعادة رصف إذا خرجت عن التفاوتات<br>• Method Statement منفصل للأعمال التصحيحية<br>• أي إسفلت خارج المواصفة يُقشَط ويُعاد بموافقة المهندس</p>
</div>
<div class="lang-content-en" style="display:none;">
<h3>📋 Scope</h3>
<p>This Method Statement covers Asphalt Works (PMB & Non-PMB) in accordance with QCS 2024 Part 6. Applicable to all asphalt layers in Qatar road projects.</p>
<h3>1.3 Plant & Equipment</h3>
<table class="dm-table"><tr><th>Equipment</th><th>Notes</th></tr>
<tr><td>Paver VOGELE 1900-2100</td><td>Self-propelled + Sonic Averaging Beam</td></tr>
<tr><td>Double Drum Roller 10-12t</td><td>Initial + Intermediate Rolling</td></tr>
<tr><td>Pneumatic Tyre Roller (PTR)</td><td>4-5 passes intermediate</td></tr>
<tr><td>Shuttle Buggy</td><td>Mandatory for PMB Asphalt</td></tr>
<tr><td>Bitumen Spray Tanker</td><td>Calibration Report required before start</td></tr>
<tr><td>Thermometers + 3m Straight Edge</td><td>Calibration Report required</td></tr>
<tr><td>Truck Mounted Attenuator (TMA)</td><td>Mandatory TTM Equipment</td></tr>
</table>
<h3>2.1 Preparation & Co-ordination</h3>
<p>• RFIT for Utility clearance and previous layers (Subbase/Base) required before asphalt<br>
• Trial Section (50m) approved before full production — QCS 2024 S6 P5.7.3<br>
• Paving Plan prepared and approved by Engineer before each day's paving<br>
• No paving without completed ITP Hold Points</p>
<h3>2.4 Asphalt Laying (Non-PMB)</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Temperature at delivery</td><td>≥ 135°C (Absolute Minimum)</td></tr>
<tr><td>Suspend production</td><td>Ambient &lt;8°C, rain, fog, dust storms</td></tr>
<tr><td>WC compacted thickness</td><td>45-55mm</td></tr>
<tr><td>BC-B compacted thickness</td><td>60-80mm</td></tr>
<tr><td>Distance between adjacent pavers</td><td>≤ 50m without rolling</td></tr>
<tr><td>Hot-on-Hot Longitudinal Joint</td><td>Before temperature falls below 90°C</td></tr>
</table>
<h3>2.4.1 Rolling Pattern — Non-PMB</h3>
<p>1 Pass Static — 10t Double Drum Roller<br>
2 Passes Vibration — 10t DDR<br>
4 Passes — PTR (Pneumatic Tyre Roller)<br>
1 Pass Static — 10t DDR (Finishing)</p>
<h3>2.5 Asphalt Laying (PMB)</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Minimum laying temperature</td><td>145°C at Paver</td></tr>
<tr><td>Temperature range</td><td>145-160°C</td></tr>
<tr><td>Shuttle Buggy</td><td>Mandatory for PMB</td></tr>
<tr><td>IRI (PMB Wearing Course)</td><td>≤ 0.9 m/km per 400m section — PWA IAN 013</td></tr>
<tr><td>Straightedge 3m (PMB WC)</td><td>≤ 3mm Transverse every 20m</td></tr>
</table>
<h3>Quality Control</h3>
<table class="dm-table"><tr><th>Test</th><th>Frequency</th><th>Standard</th></tr>
<tr><td>Temperature Check</td><td>Every load</td><td>≥130°C (Non-PMB) / ≥145°C (PMB)</td></tr>
<tr><td>Marshall Test</td><td>Every 200t</td><td>≥ 8kN stability</td></tr>
<tr><td>Bitumen Extraction</td><td>Every 200t</td><td>JMF ± 0.3%</td></tr>
<tr><td>Core Samples</td><td>Every 1000m²</td><td>≥ 98% TMD</td></tr>
<tr><td>Straightedge 3m</td><td>Every 100m</td><td>≤ 5mm</td></tr>
<tr><td>IRI (PMB WC only)</td><td>Per 400m section</td><td>≤ 0.9 m/km</td></tr>
</table>
</div>
` },

  ms_utilities: { title: '📋 Method Statement — Utilities Works', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 KAHRAMAA / Ashghal Requirements | QCS 2024 Section 8
</div>
<div class="lang-content-ar">
<h3>📋 نطاق العمل</h3>
<p>يغطي هذا الـ Method Statement أعمال تمديد وتركيب شبكات المرافق (مياه الشرب، Foul Sewer، الصرف السطحي، المياه المعالجة) وفق متطلبات KAHRAMAA و Ashghal و QCS 2024.</p>
<h3>1.0 المعدات</h3>
<table class="dm-table"><tr><th>المعدة</th><th>الاستخدام</th></tr>
<tr><td>Backhoe / Excavator</td><td>الحفر</td></tr>
<tr><td>Trench Box / Shoring</td><td>للأعماق > 1.5m إلزامي</td></tr>
<tr><td>Dewatering Pump</td><td>لتخفيض المياه الجوفية</td></tr>
<tr><td>Laser Level</td><td>ضبط انحدار المواسير</td></tr>
<tr><td>Pipe Fusion Machine</td><td>HDPE Butt Fusion</td></tr>
<tr><td>Pressure Test Equipment</td><td>Hydrostatic Testing</td></tr>
<tr><td>CCTV Camera</td><td>فحص الصرف</td></tr>
</table>
<h3>2.0 التسلسل التنفيذي</h3>
<p><strong>المرحلة 1 — التحضير:</strong><br>
• NOC من جميع الجهات (KAHRAMAA، Ashghal، Ooredoo، QP)<br>
• تحديد المرافق المدفونة قبل الحفر<br>
• اعتماد Method Statement + ITP + Shop Drawings</p>
<p><strong>المرحلة 2 — الحفر:</strong><br>
• بدء الحفر بعد NOC كامل<br>
• Trench Box للأعماق > 1.5m<br>
• Dewatering مستمر عند مستوى المياه الجوفية<br>
• تفريغ مواسير قائمة قبل القطع</p>
<p><strong>المرحلة 3 — وضع المواسير:</strong><br>
• Sand Bedding 150mm قبل الوضع<br>
• ضبط الانحدار بـ Laser Level<br>
• فحص كل وصلة قبل الردم<br>
• Marker Tape بالارتفاع الصحيح</p>
<p><strong>المرحلة 4 — الاختبارات:</strong><br>
• Pressure Test: 1.5x × PN / 2 hour / صفر تسرب (مياه الشرب)<br>
• Air Test: 100mm WG / 5 دقائق / ≤ 25mm (صرف صحي)<br>
• CCTV 100% (صرف صحي + سطحي)<br>
• Water Quality (مياه الشرب)</p>
<p><strong>المرحلة 5 — الردم:</strong><br>
• Selected Fill بعد اعتماد الاختبارات فقط<br>
• Compaction ≥ 90-95% MDD كل 300mm<br>
• الطبقة العلوية (300-600mm) ≥ 93% MDD<br>
• توثيق كل طبقة بـ Sand Cone Test</p>
<h3>3.0 اشتراطات KAHRAMAA</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr>
<tr><td>الفصل الأفقي (مياه / صرف)</td><td>≥ 1.0m</td></tr>
<tr><td>مياه الشرب دائماً</td><td>فوق Foul Sewer</td></tr>
<tr><td>Marker Tape لون مياه الشرب</td><td>أصفر</td></tr>
<tr><td>Marker Tape لون صرف صحي</td><td>أخضر</td></tr>
<tr><td>Marker Tape لون معالجة</td><td>بنفسجي</td></tr>
<tr><td>Chlorination قبل التشغيل</td><td>≥ 50ppm / ≥ 24 hour</td></tr>
<tr><td>Water Quality</td><td>Coliform = 0 / Turbidity ≤ 1 NTU</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Scope</h3>
<p>This Method Statement covers installation of utility networks (Water Supply, Foul Sewer, Storm Water, Treated Water) in accordance with KAHRAMAA, Ashghal and QCS 2024 requirements.</p>
<h3>Execution Sequence</h3>
<p><strong>Phase 1 — Preparation:</strong> NOC from all authorities → Material Approval → ITP Hold Points → Trench design approval</p>
<p><strong>Phase 2 — Excavation:</strong> Trench box for depths > 1.5m → Continuous dewatering → Protect existing utilities</p>
<p><strong>Phase 3 — Pipe Laying:</strong> 150mm sand bedding → Laser level for gradient → Joint inspection before backfill → Marker tape at correct elevation</p>
<p><strong>Phase 4 — Testing:</strong> Pressure Test 1.5x × PN / 2hr / zero drop (water) → Air Test 100mm WG / 5min / ≤25mm drop (sewer) → 100% CCTV (sewer+storm) → Water quality (drinking water)</p>
<p><strong>Phase 5 — Backfill:</strong> Selected fill only after test approval → Compaction ≥ 90-95% MDD per 300mm lift → Document with Sand Cone</p>
<h3>KAHRAMAA Requirements</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Horizontal separation (water/sewer)</td><td>≥ 1.0m</td></tr>
<tr><td>Water supply always</td><td>Above foul sewer</td></tr>
<tr><td>Water supply marker tape</td><td>Yellow</td></tr>
<tr><td>Foul sewer marker tape</td><td>Green</td></tr>
<tr><td>Treated water marker tape</td><td>Purple</td></tr>
<tr><td>Chlorination before commissioning</td><td>≥ 50ppm / ≥ 24 hours</td></tr>
<tr><td>Water quality acceptance</td><td>Coliform = 0 / Turbidity ≤ 1 NTU</td></tr>
</table>
<h3>2.0 تسلسل العمل — Work Sequence</h3>
<div style="margin-bottom:16px">
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">1</div><div><strong style="color:var(--gold2)">Survey & Setting Out</strong><br>تحديد مسار الأنابيب بالـ Total Station — مناسيب الـ Invert Level كل 25m — علامات CH على الأرض<br><small style="color:var(--text3)">Hold Point: SC يعتمد المناسيب قبل الحفر</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">2</div><div><strong style="color:var(--gold2)">Utilities Detection (GPR)</strong><br>كشف المرافق الموجودة بـ Ground Penetrating Radar قبل الحفر — تحديد الكابلات والمواسير القائمة<br><small style="color:var(--text3)">Ashghal NOC مطلوب قبل الحفر</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">3</div><div><strong style="color:var(--gold2)">Excavation + Shoring</strong><br>حفر الخنادق بعرض DN + 600mm حد أدنى — Shoring إلزامي >1.2m — Dewatering إذا وُجدت مياه جوفية<br><small style="color:var(--text3)">Hold Point: عمق >1.2m يوقف العمل بدون Shoring Design</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">4</div><div><strong style="color:var(--gold2)">Bedding Preparation</strong><br>فرش Bedding Material (Type 1 أو رمل نظيف) بسماكة 150mm — دمك ≥90% MDD — Level ±10mm<br><small style="color:var(--text3)">Witness Point: تحقق من المادة والسماكة</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">5</div><div><strong style="color:var(--gold2)">Pipe Laying & Jointing</strong><br>وضع المواسير وفق Invert Levels المعتمدة — فحص الوصلات واحدة واحدة — Deflection Test للأنابيب المرنة<br><small style="color:var(--text3)">Hold Point: Sewer gradient ≥ minimum (DN150→1:100, DN200→1:150)</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">6</div><div><strong style="color:var(--gold2)">Testing</strong><br>Water Supply: Pressure Test 1.5×PN لمدة 2 ساعة — Foul Sewer: Air Test 100mm WG → drop ≤25mm/5min — CCTV Survey 100%<br><small style="color:var(--text3)">Hold Point: لا backfill قبل اعتماد الاختبارات</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">7</div><div><strong style="color:var(--gold2)">Backfill & Compaction</strong><br>ردم بطبقات ≤200mm — دمك ≥95% MDD — لا مواد Sabkha أو عضوية<br><small style="color:var(--text3)">Witness Point: Field Density Test كل 50m طولي</small></div></div>
</div>
<h3>3.0 السلامة — Safety Requirements</h3>
<table class="dm-table"><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr>
<tr><td>PPE</td><td>خوذة + سترة عاكسة + حذاء أمان + قفازات — إلزامي 100%</td><td>Ashghal QHSE</td></tr>
<tr><td>Shoring</td><td>إلزامي لأي حفرية >1.2m — Timber أو Sheet Pile</td><td>QCS 2024 P1 S8.4</td></tr>
<tr><td>Barricading</td><td>سياج ≥1.5m من حافة الحفرية + إضاءة ليلية</td><td>Ashghal TMP</td></tr>
<tr><td>Confined Space</td><td>Manhole entry = Permit to Work + Gas Test + Standby Man</td><td>QCS P1 S8</td></tr>
<tr><td>Hot Work</td><td>Welding permit + Fire extinguisher within 5m</td><td>QCDD</td></tr>
</table>
<h3>4.0 QA Checkpoints</h3>
<table class="dm-table"><tr><th>المرحلة</th><th>النقطة</th><th>القبول</th></tr>
<tr><td>قبل الحفر</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Survey approved + NOC + Shoring design</td></tr>
<tr><td>بعد Bedding</td><td style="color:#f39c12">Witness</td><td>Level ±10mm + Material approved</td></tr>
<tr><td>بعد Laying</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Invert levels + Joint check</td></tr>
<tr><td>اختبار الضغط/الهواء</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Pass criteria met + Lab report</td></tr>
<tr><td>CCTV (Sewer فقط)</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Grade ≤2 + Full video + Report</td></tr>
<tr><td>بعد Backfill</td><td style="color:#f39c12">Witness</td><td>≥95% MDD + لا مواد ملوثة</td></tr>
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


  roads_design: { title: '🏗️ Mix Design + Production + Pavement Design', content: `
<div class="lang-content-ar">

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 Section 6 Part 5 — Mix Design + Production + Pavement Design
</div>

<h3>🔬 Marshall Mix Design — Tables 5:6, 5:7, 5:8</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('marshall_mix')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔬</div><div style="color:#3498db;font-weight:700;font-size:12px;">Marshall Design Criteria</div>
<div style="color:var(--text3);font-size:10px;">Stability / Flow / Va / VMA / VFA</div></div>
<div onclick="QS.openDetail('superpave_mix')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">⚙️</div><div style="color:#3498db;font-weight:700;font-size:12px;">Superpave + SGC</div>
<div style="color:var(--text3);font-size:10px;">Ndesign / PG Grade / Table 5:17</div></div>
<div onclick="QS.openDetail('air_voids_tolerances')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📐</div><div style="color:#3498db;font-weight:700;font-size:12px;">Air Voids & Tolerances</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:9, 5:10, 5:11</div></div>
<div onclick="QS.openDetail('pavement_production')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏭</div><div style="color:#3498db;font-weight:700;font-size:12px;">الإنتاج والفرش</div>
<div style="color:var(--text3);font-size:10px;">Temp + Elevation Technique</div></div>
</div>

<h3>🔗 التنفيذ — Joints & Rolling</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('paving_joints')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔗</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Joints & Rolling Pattern</div>
<div style="color:var(--text3);font-size:10px;">Transverse + Longitudinal</div></div>
<div onclick="QS.openDetail('prime_tack_summary')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🛢️</div><div style="color:var(--gold);font-weight:700;font-size:12px;">Prime & Tack Coat Summary</div>
<div style="color:var(--text3);font-size:10px;">Rates + Temps + HP</div></div>
</div>

<h3>🚛 تصميم الرصيف — Pavement Design</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('traffic_axle')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🚛</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Axle Load & ESAL</div>
<div style="color:var(--text3);font-size:10px;">Traffic T1–T6 + Pavement Tables</div></div>
<div onclick="QS.openDetail('concrete_pavement')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏗️</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Concrete Pavement</div>
<div style="color:var(--text3);font-size:10px;">JPCP + CRCP + Joints + Dowels</div></div>
</div>

</div>

<div class="lang-content-en" style="display:none;">

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 Section 6 Part 5 — Mix Design + Production + Pavement Design
</div>
<h3>🔬 Mix Design</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('marshall_mix')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🔬</div><div style="color:#3498db;font-weight:700;font-size:12px;">Marshall Design</div>
<div style="color:var(--text3);font-size:10px;">Stability / Flow / Va / VMA</div></div>
<div onclick="QS.openDetail('superpave_mix')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">⚙️</div><div style="color:#3498db;font-weight:700;font-size:12px;">Superpave + SGC</div>
<div style="color:var(--text3);font-size:10px;">Ndesign / PG Grade</div></div>
<div onclick="QS.openDetail('air_voids_tolerances')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">📐</div><div style="color:#3498db;font-weight:700;font-size:12px;">Air Voids & Tolerances</div>
<div style="color:var(--text3);font-size:10px;">Tables 5:9, 5:10, 5:11</div></div>
<div onclick="QS.openDetail('pavement_production')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏭</div><div style="color:#3498db;font-weight:700;font-size:12px;">Production & Paving</div>
<div style="color:var(--text3);font-size:10px;">Temp + Elevation</div></div>
</div>
<h3>🚛 Pavement Design</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('traffic_axle')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🚛</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Axle Load & ESAL</div>
<div style="color:var(--text3);font-size:10px;">T1–T6 Traffic Designation</div></div>
<div onclick="QS.openDetail('concrete_pavement')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;">
<div style="font-size:18px;">🏗️</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Concrete Pavement</div>
<div style="color:var(--text3);font-size:10px;">JPCP + CRCP + Joints</div></div>
</div>

</div>
` },

  marshall_mix: { title: '🔬 Marshall Mix Design — Tables 5:6, 5:7, 5:8', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Marshall Mix Design | Pages 15-19
</div>
<div class="lang-content-ar">
<h3>📐 تعريف Marshall Mix Design</h3>
<p>طريقة تصميم الخلطة Asphaltية الأكثر استخداماً في قطر. تعتمد على ضغط العينات بـ 75 ضربة (طرق رئيسية) أو 50 ضربة (طرق ثانوية) ثم قياس الـ Stability والـ Flow عند 60°C.</p>

<h3>📐 تعريف طبقات Asphalt حسب QCS S6 P5</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الطبقة</th><th>التعريف</th><th>NMAS</th></tr>
<tr><td><strong>Base Course Class A (BC-A)</strong></td><td>طبقة بيس كورس سميكة للطرق ذات الأحمال العالية جداً. توضع مباشرة فوق الـ Subbase.</td><td>25mm أو 37.5mm</td></tr>
<tr><td><strong>Base Course Class B (BC-B)</strong></td><td>طبقة بيس كورس للطرق العادية والثانوية. أقل سماكة وحجم ركام من BC-A.</td><td>19mm أو 25mm</td></tr>
<tr><td><strong>Wearing Course (WC)</strong></td><td>الطبقة العلوية المتلامسة مع المرور. تُوفر الإحكام ومقاومة الانزلاق والاستواء. PSV ≥ 55 إلزامي.</td><td>9.5mm أو 12.5mm</td></tr>
</table>

<h3>📐 جدول 5:6 — Marshall Design Criteria — QCS S6 P5 Page 15</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>Wearing Course</th><th>Base Course A</th><th>Base Course B</th></tr>
<tr><td>عدد الضربات (Compaction Blows)</td><td>75 / وجه</td><td>75 / وجه</td><td>75 / وجه</td></tr>
<tr><td>Marshall Stability (kN)</td><td>≥ 9.0</td><td>≥ 9.0</td><td>≥ 8.0</td></tr>
<tr><td>Marshall Flow (mm)</td><td>2 - 4</td><td>2 - 4</td><td>2 - 4</td></tr>
<tr><td>Air Voids Va (%)</td><td>3 - 5</td><td>3 - 5</td><td>3 - 5</td></tr>
<tr><td>VMA — Voids in Mineral Agg (%)</td><td>≥ 15</td><td>≥ 14</td><td>≥ 14</td></tr>
<tr><td>VFA — Voids Filled with Asphalt (%)</td><td>65 - 80</td><td>65 - 75</td><td>65 - 75</td></tr>
<tr><td>Stability Retained (TSR %)</td><td>≥ 80</td><td>≥ 80</td><td>≥ 75</td></tr>
<tr><td>Dust-to-Binder Ratio (P0.075/Pb)</td><td>0.6 - 1.2</td><td>0.6 - 1.2</td><td>0.6 - 1.2</td></tr>
</table>

<h3>📐 جدول 5:7 — Asphalt Mix Composition Limits — QCS S6 P5 Page 15</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>WC</th><th>BC-A</th><th>BC-B</th></tr>
<tr><td>Bitumen Content % (by mix weight)</td><td>5.0 - 6.5</td><td>4.0 - 5.5</td><td>4.5 - 6.0</td></tr>
<tr><td>Max Aggregate Size (NMAS)</td><td>9.5 أو 12.5mm</td><td>25 أو 37.5mm</td><td>19 أو 25mm</td></tr>
<tr><td>Film Thickness (avg microns)</td><td>≥ 8</td><td>≥ 8</td><td>≥ 8</td></tr>
<tr><td>% Passing 0.075mm (Filler)</td><td>2 - 8</td><td>2 - 7</td><td>2 - 7</td></tr>
</table>

<h3>📐 جدول 5:8 — Compacted Layer Thickness — QCS S6 P5 Page 15</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الطبقة</th><th>السماكة المضغوطة</th><th>الحد الأدنى</th><th>الحد الأقصى</th></tr>
<tr><td>Wearing Course (WC)</td><td>40 - 55mm</td><td>40mm</td><td>55mm</td></tr>
<tr><td>Base Course B (BC-B)</td><td>60 - 80mm</td><td>60mm</td><td>80mm</td></tr>
<tr><td>Base Course A (BC-A)</td><td>80 - 100mm</td><td>80mm</td><td>100mm</td></tr>
<tr><td>ملاحظة: إذا تجاوزت السماكة 100mm</td><td colspan="3">يُقسَّم لطبقتين — كل طبقة ≤ 100mm</td></tr>
</table>
<h3>3.0 تسلسل العمل — Concrete Work Sequence</h3>
<div style="margin-bottom:16px">
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">1</div><div><strong style="color:var(--gold2)">Pre-Pour Inspection</strong><br>فحص Formwork: alignment + levels + cleanliness — فحص Rebar: cover + spacing + lap length — Embedded items in place<br><small style="color:var(--text3)">Hold Point: SC يعتمد قبل الصب — لا صب بدون RFI معتمد</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">2</div><div><strong style="color:var(--gold2)">Concrete Delivery & Checks</strong><br>Delivery ticket: Grade + Slump + W/C ratio + Admixtures — Temperature ≤32°C عند الوصول — زمن التسليم ≤90 دقيقة من الخلط<br><small style="color:var(--text3)">Witness Point: كل شاحنة — أي شاحنة >32°C أو >90 دقيقة تُرفض فوراً</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">3</div><div><strong style="color:var(--gold2)">Slump Test + Cube Sampling</strong><br>Slump: 75-100mm (عادي) أو 100-150mm (ضخ) — 6 مكعبات كل 50m³ (3 لـ 7 يوم + 3 لـ 28 يوم)<br><small style="color:var(--text3)">Hold Point: Slump خارج النطاق = رفض الشاحنة</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">4</div><div><strong style="color:var(--gold2)">Placing & Vibration</strong><br>ارتفاع الصب ≤1.5m (free fall) — Vibrator: Poker 50-75mm كل 450mm أفقياً — مدة الهز 10-15 ثانية — لا over-vibration<br><small style="color:var(--text3)">QCS 2024: Layer thickness ≤500mm لكل طبقة صب</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">5</div><div><strong style="color:var(--gold2)">Finishing & Curing</strong><br>بدء Curing خلال 2-4 ساعات من الصب — Curing Compound أو Hessian + Water — المدة: 7 أيام minimum (14 يوم Sulphate Resisting)<br><small style="color:var(--text3)">⚠️ قطر: حرارة >40°C = Ice في الخلطة + Curing مضاعف + صب ليلي</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">6</div><div><strong style="color:var(--gold2)">Cube Results & Stripping</strong><br>7 يوم ≥70% fcu — 28 يوم ≥100% fcu — Stripping بعد 24hr للأعمدة / 14 يوم للبلاطات<br><small style="color:var(--text3)">Hold Point: نتيجة <70% @7d = إيقاف + تحقيق — نتيجة <fcu @28d = NCR + Core Test</small></div></div>
</div>
<h3>4.0 Hot Weather Concreting — خاص بقطر</h3>
<table class="dm-table"><tr><th>البند</th><th>الاشتراط</th><th>QCS Ref.</th></tr>
<tr><td>درجة الحرارة القصوى</td><td>Concrete temp ≤32°C عند الصب — Ambient >40°C = توقف الصب</td><td>QCS 2024 P5 S4.1</td></tr>
<tr><td>التبريد</td><td>Ice في مياه الخلط + Chilled aggregates + White tankers</td><td>QCS 2024 P5 S4.2</td></tr>
<tr><td>زمن التسليم</td><td>≤60 دقيقة (صيف) بدل 90 — Retarder مسموح بموافقة</td><td>QCS 2024 P5 S4.3</td></tr>
<tr><td>Curing مضاعف</td><td>Curing compound فوري + Hessian مبلل + 14 يوم كحد أدنى</td><td>QCS 2024 P5 S4.5</td></tr>
<tr><td>صب ليلي</td><td>يُفضَّل من الساعة 6 مساءً — 6 صباحاً في الصيف</td><td>QCS 2024 P5 S4.1</td></tr>
</table>
<h3>5.0 Sulphate Attack — البيئة العدوانية في قطر</h3>
<table class="dm-table"><tr><th>SO₃ في التربة</th><th>الإسمنت المطلوب</th><th>W/C ratio</th><th>Min. Cement</th></tr>
<tr><td>< 0.2%</td><td>OPC عادي</td><td>≤ 0.55</td><td>300 kg/m³</td></tr>
<tr><td>0.2 – 0.5%</td><td>SRPC أو OPC + GGBS (≥50%)</td><td>≤ 0.50</td><td>320 kg/m³</td></tr>
<tr><td>0.5 – 1.0%</td><td>SRPC إلزامي</td><td>≤ 0.45</td><td>350 kg/m³</td></tr>
<tr><td>> 1.0%</td><td>SRPC + Protective Coating + دراسة خاصة</td><td>≤ 0.40</td><td>380 kg/m³</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Marshall Mix Design — Full Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Wearing AC14</th><th>Binder AC20</th><th>Ref</th></tr>
<tr><td>Marshall Stability</td><td>≥8.0 kN</td><td>≥8.0 kN</td><td>QCS S8 P4</td></tr>
<tr><td>Marshall Flow</td><td>2–4 mm</td><td>2–4 mm</td><td>QCS S8 P4</td></tr>
<tr><td>Air Voids (Va)</td><td>3–5%</td><td>3–7%</td><td>QCS S8 P4</td></tr>
<tr><td>VMA</td><td>≥14%</td><td>≥13%</td><td>QCS S8</td></tr>
<tr><td>VFB</td><td>65–75%</td><td>60–75%</td><td>QCS S8</td></tr>
<tr><td>Bitumen Content</td><td>4.5–6.5%</td><td>4.0–6.0%</td><td>QCS S8</td></tr>
<tr><td>Field Core Density</td><td>≥97% TMD</td><td>≥97% TMD</td><td>QCS S8 P6</td></tr>
<tr><td>ITS at 60°C</td><td>≥0.7 MPa</td><td>≥0.7 MPa</td><td>QCS S8</td></tr>
</table>
<h4 style="margin-top:12px;color:var(--gold);">PMB Mix (Polymer Modified Bitumen)</h4>
<table class="dm-table">
<tr><th>Parameter</th><th>PMB Wearing</th></tr>
<tr><td>Marshall Stability</td><td>≥10.0 kN</td></tr>
<tr><td>Air Voids</td><td>3–4%</td></tr>
<tr><td>IRI Target</td><td>≤0.9 m/km</td></tr>
<tr><td>Delivery Temp</td><td>≥155°C</td></tr>
</table>
</div>
` },

  air_voids_tolerances: { title: '📐 Air Voids, Tolerances & Field Density — Tables 5:9, 5:10, 5:11', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Pages 16-19
</div>
<div class="lang-content-ar">
<h3>📐 جدول 5:9 — Air Voids قبل وبعد الفرش — QCS S6 P5 Page 16</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>المرحلة</th><th>WC</th><th>BC-A</th><th>BC-B</th></tr>
<tr><td>Air Voids في JMF (Lab Design)</td><td>4.0%</td><td>4.0%</td><td>4.0%</td></tr>
<tr><td>Air Voids المقبولة في الموقع (Va)</td><td>3 - 5%</td><td>3 - 5%</td><td>3 - 5%</td></tr>
<tr><td>Max Va في أي نموذج فردي</td><td>7%</td><td>7%</td><td>7%</td></tr>
<tr><td>Minimum Va الموقع</td><td>2%</td><td>2%</td><td>2%</td></tr>
<tr><td>TMD المستهدف (% Max Density)</td><td>≥ 97%</td><td>≥ 97%</td><td>≥ 97%</td></tr>
</table>

<h3>📐 جدول 5:10 — Tolerances الموقع (Mix vs JMF) — QCS S6 P5 Page 17</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>التفاوت المسموح</th></tr>
<tr><td>Bitumen Content (% of mix)</td><td>± 0.3%</td></tr>
<tr><td>% Passing 0.075mm sieve</td><td>± 2.0%</td></tr>
<tr><td>% Passing 2.36mm sieve</td><td>± 5.0%</td></tr>
<tr><td>% Passing 4.75mm sieve</td><td>± 5.0%</td></tr>
<tr><td>% Passing 9.5mm sieve</td><td>± 6.0%</td></tr>
<tr><td>% Passing 12.5mm sieve</td><td>± 6.0%</td></tr>
<tr><td>% Passing 19.0mm sieve</td><td>± 7.0%</td></tr>
<tr><td>% Passing 25.0mm sieve</td><td>± 7.0%</td></tr>
<tr><td>% Passing 37.5mm sieve</td><td>± 8.0%</td></tr>
<tr><td>Mixing Temperature</td><td>± 10°C من JMF</td></tr>
</table>

<h3>📐 جدول 5:11 — Field Density Acceptance — QCS S6 P5 Pages 18-19</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>طريقة القياس</th><th>المتطلب</th><th>التكرار</th></tr>
<tr><td>Core Samples (TMD%)</td><td>≥97% TMD (كل نموذج)</td><td>كل 1000m² كحد أدنى</td></tr>
<tr><td>Mean Core Density (عينة 5 كورات)</td><td>≥97% TMD</td><td>كل Lot (2000-3000m²)</td></tr>
<tr><td>أي كور فردي</td><td>لا يقل عن 93% TMD</td><td>رفض فوري إذا &lt; 93%</td></tr>
<tr><td>Nuclear Gauge (Field Check)</td><td>≥97% TMD</td><td>كل 200m² للمراقبة</td></tr>
<tr><td>Air Voids من الكور</td><td>2 - 8%</td><td>كل كور</td></tr>
</table>

<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
⚠️ <strong>إجراء الفشل:</strong> إذا كان المتوسط &lt; 97% TMD أو كور فردي &lt; 93% → NCR فوري + تحقيق + قرار بالقشط أو القبول بتخفيض.
</div>

<h3>📐 Layer Thickness Tolerance</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الطبقة</th><th>السماكة التصميمية</th><th>التفاوت المسموح</th></tr>
<tr><td>Wearing Course</td><td>40-55mm</td><td>-5mm / +10mm</td></tr>
<tr><td>Base Course B</td><td>60-80mm</td><td>-10mm / +15mm</td></tr>
<tr><td>Base Course A</td><td>80-100mm</td><td>-10mm / +15mm</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Air Voids & Mix Tolerances — QCS 2024</h3>
<table class="dm-table">
<tr><th>Mix Type</th><th>Design Va%</th><th>Field Va% (cores)</th><th>Ref</th></tr>
<tr><td>AC14 Wearing</td><td>3–5%</td><td>2–7%</td><td>QCS S8</td></tr>
<tr><td>AC20 Binder</td><td>3–7%</td><td>2–9%</td><td>QCS S8</td></tr>
<tr><td>SMA (Stone Mastic)</td><td>3–4%</td><td>2–5%</td><td>QCS S8</td></tr>
<tr><td>PMB Wearing</td><td>3–4%</td><td>2–5%</td><td>QCS S8</td></tr>
</table>
<table class="dm-table" style="margin-top:12px;">
<tr><th>Property</th><th>Tolerance</th></tr>
<tr><td>Bitumen Content</td><td>Design ±0.3%</td></tr>
<tr><td>Gradation (passing 4.75mm)</td><td>±5%</td></tr>
<tr><td>Gradation (passing 75μm)</td><td>±2%</td></tr>
<tr><td>Layer Thickness</td><td>±5mm</td></tr>
</table>
</div>
` },

  superpave_mix: { title: '🔬 Superpave Mix Design — Table 5:17 & Sampling', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Superpave Mix Design | Page 23 Table 5:17
</div>
<div class="lang-content-ar">
<h3>📐 تعريف Superpave Mix Design</h3>
<p>نظام تصميم إسفلتي أمريكي (SHRP/AASHTO) يعتمد على أداء Asphalt الفعلي تحت ظروف الطقس والحركة. يستخدم <strong>SGC (Superpave Gyratory Compactor)</strong> بدل المطرقة ويُصنِّف البيتومين بنظام <strong>PG Grade</strong>.</p>

<h3>📐 الفرق بين Marshall و Superpave</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>Marshall</th><th>Superpave</th></tr>
<tr><td>جهاز الضغط</td><td>Marshall Hammer (ضربات)</td><td>SGC Gyratory Compactor (دورات)</td></tr>
<tr><td>عدد Compactions</td><td>50 أو 75 ضربة</td><td>Nini + Ndesign + Nmax حسب ESAL</td></tr>
<tr><td>تصنيف البيتومين</td><td>Penetration Grade (60/70)</td><td>Performance Grade (PG64-xx إلى PG82-xx)</td></tr>
<tr><td>اختبارات البيتومين</td><td>Penetration + Softening</td><td>DSR + BBR + RTFOT + PAV</td></tr>
<tr><td>Fine Aggregate تعريف</td><td>مار من 2.36mm</td><td>مار من 4.75mm</td></tr>
<tr><td>تصميم Air Voids</td><td>3-5% @ 75 blows</td><td>4.0% @ Ndesign</td></tr>
<tr><td>الاستخدام في قطر</td><td>كل الطرق</td><td>PMB Wearing + طرق رئيسية ESAL &gt; 3×10⁶</td></tr>
</table>

<h3>📐 Superpave Gyratory Compaction — عدد الدورات</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>مستوى الحركة (ESAL × 10⁶)</th><th>Nini</th><th>Ndesign</th><th>Nmax</th><th>PG Grade</th></tr>
<tr><td>&lt; 0.3</td><td>6</td><td>50</td><td>75</td><td>PG64-10</td></tr>
<tr><td>0.3 - &lt; 3</td><td>7</td><td>75</td><td>115</td><td>PG70-10</td></tr>
<tr><td>3 - &lt; 10</td><td>8</td><td>100</td><td>160</td><td>PG76-10</td></tr>
<tr><td>10 - &lt; 30</td><td>9</td><td>125</td><td>205</td><td>PG76-10 أو PG76E-10</td></tr>
<tr><td>≥ 30 (طرق سريعة رئيسية)</td><td>9</td><td>125</td><td>205</td><td>PG82-10</td></tr>
</table>

<h3>📐 جدول 5:17 — Sampling Frequency للـ Superpave — QCS S6 P5 Page 23</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>المرحلة</th><th>التكرار</th><th>الاختبار المرجعي</th></tr>
<tr><td>Bitumen PG Testing (DSR, BBR, RTFOT)</td><td>Material Approval</td><td>كل شحنة</td><td>AASHTO T315, T313</td></tr>
<tr><td>Gradation + Bitumen Extraction</td><td>أثناء الإنتاج</td><td>كل 400t أو يومياً</td><td>ASTM D2172</td></tr>
<tr><td>SGC Compaction + Va</td><td>أثناء الإنتاج</td><td>كل 400t</td><td>AASHTO T312</td></tr>
<tr><td>Hamburg Wheel Track (Rutting)</td><td>JMF Approval</td><td>مرة عند التصميم</td><td>AASHTO T324</td></tr>
<tr><td>Cantabro (Raveling — SMA)</td><td>JMF Approval</td><td>مرة عند التصميم</td><td>ASTM D7064</td></tr>
<tr><td>TSR (Moisture Sensitivity)</td><td>JMF Approval</td><td>مرة عند التصميم</td><td>AASHTO T283</td></tr>
<tr><td>Core Density TMD%</td><td>بعد الفرش</td><td>كل 1000m²</td><td>ASTM D6927</td></tr>
<tr><td>IRI (Roughness)</td><td>بعد الفرش</td><td>كل Section 400m</td><td>PWA IAN 013</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Superpave Mix Design — Definition</h3>
<p>American performance-based asphalt design system (SHRP/AASHTO). Uses SGC (Gyratory Compactor) instead of Marshall hammer. Classifies bitumen by PG Grade based on climate performance.</p>
<h3>Marshall vs Superpave Comparison</h3>
<table class="dm-table">
<tr><th>Item</th><th>Marshall</th><th>Superpave</th></tr>
<tr><td>Compaction Device</td><td>Marshall Hammer</td><td>SGC Gyratory Compactor</td></tr>
<tr><td>Compaction Level</td><td>50 or 75 blows</td><td>Nini + Ndesign + Nmax</td></tr>
<tr><td>Binder Classification</td><td>Penetration Grade 60/70</td><td>Performance Grade PG</td></tr>
<tr><td>Fine Aggregate Definition</td><td>Passing 2.36mm</td><td>Passing 4.75mm</td></tr>
<tr><td>Design Air Voids</td><td>3-5% @ 75 blows</td><td>4.0% @ Ndesign</td></tr>
<tr><td>Use in Qatar</td><td>All roads</td><td>PMB Wearing + Major roads ESAL &gt;3M</td></tr>
</table>
<h3>Table 5:17 — Superpave Sampling Frequency — Page 23</h3>
<table class="dm-table">
<tr><th>Test</th><th>Stage</th><th>Frequency</th><th>Method</th></tr>
<tr><td>Bitumen PG (DSR, BBR)</td><td>Approval</td><td>Each delivery</td><td>AASHTO T315/T313</td></tr>
<tr><td>Gradation + Extraction</td><td>Production</td><td>Per 400t or daily</td><td>ASTM D2172</td></tr>
<tr><td>SGC + Air Voids</td><td>Production</td><td>Per 400t</td><td>AASHTO T312</td></tr>
<tr><td>Hamburg Wheel Track</td><td>JMF Approval</td><td>Once at design</td><td>AASHTO T324</td></tr>
<tr><td>TSR Moisture Sensitivity</td><td>JMF Approval</td><td>Once at design</td><td>AASHTO T283</td></tr>
<tr><td>Core Density</td><td>Post-paving</td><td>Per 1000m²</td><td>ASTM D6927</td></tr>
<tr><td>IRI</td><td>Post-paving</td><td>Per 400m section</td><td>PWA IAN 013</td></tr>
</table>
</div>
` },

  paving_joints: { title: '🛣️ Joints, Rolling & Paving Edges — QCS S6 P5 Pages 28-29', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Joints & Rolling | Pages 28-29
</div>
<div class="lang-content-ar">
<h3>📐 Transverse Joints (الجوانت العرضية) — Page 28</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>طريقة الإنهاء</td><td>قطع عمودي نظيف (Saw Cut) للوجه القديم قبل الوصل</td></tr>
<tr><td>طلاء الوجه</td><td>Tack Coat على الوجه العمودي قبل الفرش</td></tr>
<tr><td>الإزاحة بين الطبقات</td><td>≥ 2.0m offset بين Transverse Joint في طبقة والطبقة التحتها</td></tr>
<tr><td>الإزاحة بين المسارات</td><td>≥ 2.0m offset بين جوانت المسارات المتجاورة</td></tr>
<tr><td>موقع WC Transverse Joint</td><td>تحت خط الممر إن أمكن — بعيداً عن الفرامل والتقاطعات</td></tr>
<tr><td>Compaction عند الجوانت</td><td>Compaction مباشر بـ Vibratory Roller عمودياً على الجوينت</td></tr>
</table>

<h3>📐 Longitudinal Joints (الجوانت الطولية) — Page 28</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>الطريقة المفضلة</td><td>Hot-on-Hot: فرش المسار المجاور قبل انخفاض الحرارة عن 90°C</td></tr>
<tr><td>Cold Joint (لا مفر)</td><td>Saw Cut + Tack Coat على الوجه العمودي</td></tr>
<tr><td>الإزاحة بين الطبقات</td><td>≥ 300mm offset بين Longitudinal Joint في WC و BC</td></tr>
<tr><td>موقع WC Longitudinal Joint</td><td>تحت خط الممر (Lane Line) أو بجانبه</td></tr>
<tr><td>الوجه القديم</td><td>مستقيم + عمودي — لا أوجه مائلة</td></tr>
<tr><td>Overlap عند الفرش</td><td>Paver يتداخل 25-50mm مع الحافة القديمة</td></tr>
</table>

<h3>📐 Paving Edges (حواف الرصف) — Page 28</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>الحافة بجانب Kerb</td><td>فرش Paver لحد الـ Kerb مباشرة + Compaction بـ Small Roller</td></tr>
<tr><td>الحافة الحرة (Free Edge)</td><td>Edge Compaction فوري بـ Pneumatic أو Small Drum قبل البرودة</td></tr>
<tr><td>الميل الجانبي (Batter)</td><td>1:3 max (رأسي:أفقي) للحواف الحرة</td></tr>
<tr><td>Compaction الحواف</td><td>Pedestrian Roller أو Plate Compactor للمناطق الضيقة</td></tr>
</table>

<h3>📐 Breakdown Rolling (الCompaction الابتدائي) — Page 28</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>درجة الحرارة للبدء</td><td>≥ 120°C (Non-PMB) / ≥ 125°C (PMB)</td></tr>
<tr><td>نوع الـ Roller</td><td>Vibratory Double Drum Steel 10-12t</td></tr>
<tr><td>البداية</td><td>من الحافة المنخفضة للوسط (Low Side to Centre)</td></tr>
<tr><td>Overlap بين Passes</td><td>300-500mm</td></tr>
<tr><td>الـ Pass الأول</td><td>Static (بدون اهتزاز) لتثبيت المادة</td></tr>
<tr><td>الـ Passes التالية</td><td>Vibratory لتحقيق الCompaction المطلوب</td></tr>
<tr><td>سرعة الـ Roller</td><td>2.5 - 4.5 km/h عند الـ Vibratory</td></tr>
</table>

<h3>📐 Intermediate & Finish Rolling — Page 29</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>Intermediate</th><th>Finish Rolling</th></tr>
<tr><td>نوع الـ Roller</td><td>Pneumatic Tyre Roller (PTR)</td><td>Tandem Steel Drum (Static)</td></tr>
<tr><td>درجة الحرارة</td><td>80-120°C</td><td>≥ 60°C</td></tr>
<tr><td>عدد الـ Passes</td><td>4-5 passes (2 PTR)</td><td>1-2 passes</td></tr>
<tr><td>الهدف</td><td>تحسين Density + إغلاق السطح</td><td>إزالة آثار الـ PTR + تسوية السطح</td></tr>
<tr><td>سرعة الـ PTR</td><td>4-8 km/h</td><td>3-6 km/h</td></tr>
<tr><td>ضغط الإطارات PTR</td><td>400-600 kPa</td><td>—</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Transverse Joints — Page 28</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Face Preparation</td><td>Vertical saw cut of existing face before joining</td></tr>
<tr><td>Face Coating</td><td>Tack Coat on vertical face before paving</td></tr>
<tr><td>Offset between layers</td><td>≥ 2.0m between transverse joints in adjacent layers</td></tr>
<tr><td>Compaction</td><td>Direct Vibratory Roller perpendicular to joint</td></tr>
</table>
<h3>Longitudinal Joints — Page 28</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Preferred Method</td><td>Hot-on-Hot: adjacent lane paved before temperature drops below 90°C</td></tr>
<tr><td>Cold Joint</td><td>Saw Cut + Tack Coat on vertical face</td></tr>
<tr><td>Offset between layers</td><td>≥ 300mm between WC and BC longitudinal joints</td></tr>
<tr><td>WC joint location</td><td>Under lane line or adjacent to it</td></tr>
</table>
<h3>Breakdown Rolling — Page 28</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Start Temperature</td><td>≥ 120°C (Non-PMB) / ≥ 125°C (PMB)</td></tr>
<tr><td>Roller Type</td><td>10-12t Vibratory Double Drum Steel</td></tr>
<tr><td>Direction</td><td>Low side to centre, 300-500mm overlap</td></tr>
<tr><td>Roller Speed</td><td>2.5-4.5 km/h at vibratory</td></tr>
</table>
<h3>Intermediate & Finish Rolling — Page 29</h3>
<table class="dm-table">
<tr><th>Item</th><th>Intermediate</th><th>Finish</th></tr>
<tr><td>Roller Type</td><td>PTR (Pneumatic)</td><td>Tandem Steel (Static)</td></tr>
<tr><td>Temperature</td><td>80-120°C</td><td>≥ 60°C</td></tr>
<tr><td>Passes</td><td>4-5 passes</td><td>1-2 passes</td></tr>
<tr><td>Purpose</td><td>Density + surface sealing</td><td>Remove tyre marks + level</td></tr>
</table>
</div>
` },

  prime_tack_summary: { title: '🛢️ Prime Coat & Tack Coat — QCS S6 P5 Pages 30-31', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Prime Coat & Tack Coat | Pages 30-31
</div>
<div class="lang-content-ar">
<h3>📐 Prime Coat — ملخص Page 30</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>نوع المادة</td><td>Cutback Bitumen MC-30 أو MC-70 (ASTM D2028)</td></tr>
<tr><td>معدل الرش</td><td>0.8 - 1.2 L/m²</td></tr>
<tr><td>درجة الحرارة عند الرش</td><td>50 - 80°C (حسب Grade)</td></tr>
<tr><td>السطح المطلوب</td><td>جاف + نظيف + مكنوس بـ Power Broom + مكنوس بـ Power Blower</td></tr>
<tr><td>وقت المعالجة الأدنى</td><td>24 hour قبل وضع Asphalt</td></tr>
<tr><td>علامة الجهوزية</td><td>اللون يتحول من بني للأسود + لا لزوجة</td></tr>
<tr><td>عمق النفاذ</td><td>10 - 15mm في الـ Base Course</td></tr>
<tr><td>ظروف وقف العمل</td><td>مطر / غبار / درجة حرارة محيط &lt; 10°C</td></tr>
<tr><td>حماية الجوانب</td><td>Kerbs + Manholes تُغطى قبل الرش</td></tr>
<tr><td>اختبار معدل الرش</td><td>تسجيل Spray Tanker Calibration Report + Field Rate من كمية/مساحة</td></tr>
</table>

<h3>📐 Tack Coat — ملخص Page 31</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>على Binder Course</th><th>على Wearing Course</th></tr>
<tr><td>نوع المادة</td><td colspan="2">Emulsified Bitumen SS-1h أو CSS-1h (ASTM D977)</td></tr>
<tr><td>معدل الرش (Residual بعد Breakup)</td><td>0.30 - 0.50 L/m²</td><td>0.20 - 0.40 L/m²</td></tr>
<tr><td>معدل الرش (قبل Breakup — كمادة)</td><td>0.50 - 0.90 L/m²</td><td>0.35 - 0.70 L/m²</td></tr>
<tr><td>درجة الحرارة</td><td colspan="2">50 - 70°C</td></tr>
<tr><td>علامة الجهوزية</td><td colspan="2">Emulsion تتحول من بني للأسود (Breakup كامل)</td></tr>
<tr><td>ظروف وقف العمل</td><td colspan="2">مطر / سطح رطب / درجة حرارة محيط &lt; 10°C</td></tr>
<tr><td>المشاة والمركبات</td><td colspan="2">لا يُسمح بالمرور قبل Breakup الكامل</td></tr>
<tr><td>Tack زائد خطر</td><td colspan="2">Excess Tack = Slippage بين الطبقات + Shoving = NCR</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Prime Coat Summary — Page 30</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Material</td><td>Cutback MC-30 or MC-70 (ASTM D2028)</td></tr>
<tr><td>Application Rate</td><td>0.8-1.2 L/m²</td></tr>
<tr><td>Spray Temperature</td><td>50-80°C</td></tr>
<tr><td>Surface Condition</td><td>Dry + clean + power broom + power blower</td></tr>
<tr><td>Curing Time</td><td>Min 24 hours before asphalt</td></tr>
<tr><td>Penetration Depth</td><td>10-15mm into base course</td></tr>
<tr><td>Stop Work Conditions</td><td>Rain / dust / ambient &lt;10°C</td></tr>
</table>
<h3>Tack Coat Summary — Page 31</h3>
<table class="dm-table">
<tr><th>Item</th><th>On Binder</th><th>On Wearing</th></tr>
<tr><td>Material</td><td colspan="2">SS-1h or CSS-1h Emulsion (ASTM D977)</td></tr>
<tr><td>Residual Rate</td><td>0.15-0.35 L/m²</td><td>0.15-0.35 L/m²</td></tr>
<tr><td>Temperature</td><td colspan="2">50-70°C</td></tr>
<tr><td>Readiness Sign</td><td colspan="2">Emulsion turns black (full breakup)</td></tr>
<tr><td>Excess Tack Risk</td><td colspan="2">Slippage between layers = NCR</td></tr>
</table>
</div>
` },

  pavement_production: { title: '🏭 Pavement Elevation & Production — QCS S6 P5 Page 34', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 | Pavement Elevation & Asphalt Production | Page 34
</div>
<div class="lang-content-ar">
<h3>📐 تقنيات ضبط Level الرصف — Page 34</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>التقنية</th><th>الوصف</th><th>الاستخدام</th></tr>
<tr><td>String Line (خيط الLevel)</td><td>خيط أو سلك مشدود على الحدود المسحية لتوجيه الـ Paver Screed</td><td>الطبقة الأولى BC-A/B</td></tr>
<tr><td>Ski (Averaging Beam)</td><td>عارضة متوسطة 4-10m مثبتة بالـ Paver تتتبع السطح الموجود وتحسب متوسطه</td><td>الطبقات العليا + WC</td></tr>
<tr><td>Sonic Averaging Beam (SAB)</td><td>نسخة إلكترونية من الـ Ski — أجهزة Sonic Sensors ترصد المسافة وتضبط الـ Screed تلقائياً</td><td>WC بمتطلبات IRI عالية + PMB</td></tr>
<tr><td>Slope Control</td><td>ضبط Crossfall تلقائياً عبر مستشعر الميل في الـ Paver</td><td>مع أي من الطرق الأخرى</td></tr>
<tr><td>Total Station Control</td><td>مراقبة الLevel الفعلي بعد الفرش للتأكد من المطابقة</td><td>QC Survey — بعد كل طبقة</td></tr>
</table>

<h3>⚠️ متطلبات IRI حسب الطريقة</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>التقنية</th><th>IRI المتوقع (m/km)</th><th>للطبقة</th></tr>
<tr><td>String Line فقط</td><td>2.0 - 3.0</td><td>BC فقط</td></tr>
<tr><td>Mechanical Ski (3m)</td><td>1.5 - 2.5</td><td>WC Secondary Roads</td></tr>
<tr><td>Sonic Averaging Beam (8-10m)</td><td>0.8 - 1.5</td><td>WC Major Roads</td></tr>
<tr><td>Multi-Ski (SAB 12m+)</td><td>≤ 0.9</td><td>PMB WC Expressways</td></tr>
</table>

<h3>📐 Production of Asphalt Concrete — ملخص Page 34</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>محطة Asphalt</td><td>مدرجة في Ashghal Prequalified Plants List</td></tr>
<tr><td>معايرة المحطة</td><td>Calibration Report كامل قبل الإنتاج + بعد أي صيانة رئيسية</td></tr>
<tr><td>Mixing Temperature (Non-PMB)</td><td>140 - 165°C (حسب Grade البيتومين)</td></tr>
<tr><td>Mixing Temperature (PMB)</td><td>150 - 175°C</td></tr>
<tr><td>Max Storage في Silo</td><td>≤ 18 hour عند الـ Holding Temp (لا يُفضَّل التخزين)</td></tr>
<tr><td>Delivery Temperature (Non-PMB)</td><td>≥ 135°C عند الموقع</td></tr>
<tr><td>Delivery Temperature (PMB)</td><td>≥ 145°C عند الموقع</td></tr>
<tr><td>Rejection Temperature</td><td>&lt; 135°C للـ Non-PMB / &lt; 145°C للـ PMB → رفض فوري</td></tr>
<tr><td>وقت النقل الأقصى</td><td>≤ 90 دقيقة من الخلط (≤ 60 دقيقة صيفاً)</td></tr>
<tr><td>حمولات الشاحنات</td><td>مغطاة بـ Tarpaulin في الصيف</td></tr>
<tr><td>Contamination</td><td>شاحنة ملوثة = رفض الحمولة + تنظيف Truck Body</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Pavement Elevation Techniques — Page 34</h3>
<table class="dm-table">
<tr><th>Technique</th><th>Description</th><th>Use</th></tr>
<tr><td>String Line</td><td>Tensioned wire following survey stakes to guide Paver Screed</td><td>First BC layer</td></tr>
<tr><td>Mechanical Ski (Averaging Beam)</td><td>4-10m beam attached to Paver, averages existing surface</td><td>Upper layers / WC</td></tr>
<tr><td>Sonic Averaging Beam (SAB)</td><td>Electronic version with Sonic Sensors auto-adjusting Screed</td><td>PMB WC / High IRI requirements</td></tr>
<tr><td>Slope Control</td><td>Automatic Crossfall control via Paver slope sensor</td><td>Combined with above</td></tr>
</table>
<h3>Asphalt Production Summary — Page 34</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Plant</td><td>Ashghal Prequalified Plants List</td></tr>
<tr><td>Mixing Temp (Non-PMB)</td><td>140-165°C</td></tr>
<tr><td>Mixing Temp (PMB)</td><td>150-175°C</td></tr>
<tr><td>Delivery Temp (Non-PMB)</td><td>≥ 135°C at site</td></tr>
<tr><td>Delivery Temp (PMB)</td><td>≥ 145°C at site</td></tr>
<tr><td>Max Transport Time</td><td>≤ 90 min (≤ 60 min in summer)</td></tr>
</table>
</div>
` },

  traffic_axle: { title: '🚛 Axle Load, ESAL & Traffic Designation — Tables 1, 2, 3, 5', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 2 | Traffic Analysis & Pavement Design
</div>
<div class="lang-content-ar">
<h3>📐 تعريفات أساسية</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>المصطلح</th><th>التعريف</th><th>الوحدة</th></tr>
<tr><td><strong>Standard Axle Load</strong></td><td>المحور المعياري = 80 kN (8.2 طن) — معيار التصميم العالمي</td><td>80 kN</td></tr>
<tr><td><strong>Axle Load Factor (ALF)</strong></td><td>نسبة تأثير محور معين مقارنة بالمحور المعياري. محور 160kN = ALF 16 (= 16 محور معياري)</td><td>Dimensionless</td></tr>
<tr><td><strong>ESAL</strong></td><td>Equivalent Standard Axle Load — مجموع كل المحاور محولة للمحور المعياري خلال عمر الطريق</td><td>× 10⁶</td></tr>
<tr><td><strong>Traffic Designation</strong></td><td>تصنيف الطريق حسب حجم الحركة الثقيلة (ESAL) لاختيار سماكة الرصيف</td><td>T1-T6</td></tr>
<tr><td><strong>Design Life</strong></td><td>العمر التصميمي للطريق = 20 سنة للطرق الرئيسية في قطر</td><td>Years</td></tr>
</table>

<h3>📐 جدول 1 — Traffic Designation — QCS S6 P2</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>التصنيف</th><th>ESAL (× 10⁶)</th><th>نوع الطريق</th></tr>
<tr><td>T1 — Light</td><td>&lt; 0.5</td><td>طرق محلية سكنية خفيفة</td></tr>
<tr><td>T2 — Medium Light</td><td>0.5 - 1.5</td><td>طرق محلية وصغيرة</td></tr>
<tr><td>T3 — Medium</td><td>1.5 - 5.0</td><td>طرق جامعة وخدمية</td></tr>
<tr><td>T4 — Medium Heavy</td><td>5.0 - 15</td><td>طرق رئيسية شريانية</td></tr>
<tr><td>T5 — Heavy</td><td>15 - 50</td><td>طرق سريعة رئيسية</td></tr>
<tr><td>T6 — Very Heavy</td><td>&gt; 50</td><td>طرق سريعة + مناطق صناعية</td></tr>
</table>

<h3>📐 جدول 2 — Pavement Type حسب Traffic — QCS S6 P2</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>التصنيف</th><th>نوع الرصيف</th><th>طريقة التصميم</th></tr>
<tr><td>T1 - T2</td><td>Flexible — Asphalt بسيط + Granular</td><td>Empirical (CBR Method)</td></tr>
<tr><td>T3 - T4</td><td>Flexible — Asphalt معزز + Treated Base</td><td>Mechanistic-Empirical</td></tr>
<tr><td>T5 - T6</td><td>Flexible PMB أو Semi-Rigid (CTB)</td><td>Mechanistic Full (AASHTO/Shell)</td></tr>
<tr><td>T5+ Heavy Industrial</td><td>Rigid — Concrete Pavement</td><td>PCA / AASHTO Rigid</td></tr>
</table>

<h3>📐 جدول 3 — Typical Pavement Structure حسب Traffic — QCS S6 P2</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>التصنيف</th><th>WC</th><th>BC</th><th>Base</th><th>Subbase</th></tr>
<tr><td>T1 (&lt;0.5M)</td><td>40mm WC</td><td>—</td><td>150mm</td><td>150mm</td></tr>
<tr><td>T2 (0.5-1.5M)</td><td>40mm WC</td><td>50mm BC-B</td><td>150mm</td><td>200mm</td></tr>
<tr><td>T3 (1.5-5M)</td><td>50mm WC</td><td>70mm BC-B</td><td>200mm</td><td>250mm</td></tr>
<tr><td>T4 (5-15M)</td><td>50mm WC</td><td>80mm BC-B</td><td>250mm</td><td>300mm</td></tr>
<tr><td>T5 (15-50M)</td><td>50mm PMB WC</td><td>80mm BC-A</td><td>250mm</td><td>300mm</td></tr>
<tr><td>T6 (&gt;50M)</td><td>50mm PMB WC</td><td>100mm BC-A</td><td>300mm</td><td>350mm</td></tr>
</table>

<h3>📐 جدول 5 — Pavement Design Thickness (Subgrade CBR) — QCS S6 P2</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>Subgrade CBR</th><th>T3 Total Asphalt</th><th>T4 Total Asphalt</th><th>T5 Total Asphalt</th></tr>
<tr><td>CBR ≥ 8% (جيد)</td><td>120mm</td><td>130mm</td><td>140mm</td></tr>
<tr><td>CBR 8-8% (متوسط / Sabkha)</td><td>130mm</td><td>145mm</td><td>160mm</td></tr>
<tr><td>CBR 5-8% (ضعيف)</td><td>145mm</td><td>165mm</td><td>185mm</td></tr>
<tr><td>CBR &lt; 5% (ضعيف جداً)</td><td colspan="3">معالجة إلزامية + استبدال قبل التصميم</td></tr>
</table>
<p style="font-size:11px;color:var(--text3);">ملاحظة: هذه أمثلة نموذجية — التصميم الفعلي يعتمد على تحليل ESAL الكامل + CBR الموقع + عمر التصميم.</p>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Traffic Loading — Axle Load & ESAL</h3>
<table class="dm-table">
<tr><th>Vehicle Type</th><th>Max Legal Axle Load</th><th>ESAL Factor</th></tr>
<tr><td>Car / Light van</td><td>3.5t front / 6.5t rear</td><td>0.0005</td></tr>
<tr><td>2-axle truck</td><td>6t / 10t</td><td>0.5–2.0</td></tr>
<tr><td>3-axle truck</td><td>6t / 10t / 10t</td><td>1.0–3.0</td></tr>
<tr><td>Semi-trailer (5-axle)</td><td>≤40t GVW</td><td>3.0–6.0</td></tr>
<tr><td>Standard Axle</td><td>8.2t = 80kN single axle</td><td>1.0 (reference)</td></tr>
</table>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ Qatar uses AASHTO pavement design. Design ESAL typically 1M–30M for urban Ashghal roads. Traffic survey required for all new roads.
</div>
</div>
` },

  concrete_pavement: { title: '🏗️ Concrete Road Pavement — QCS Section 6 Part 6 Full Summary', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 6 | Concrete Road Pavement | Full Summary
</div>
<div class="lang-content-ar">
<h3>📐 1. أنواع رصف الConcrete</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>النوع</th><th>الوصف</th><th>الاستخدام في قطر</th></tr>
<tr><td><strong>JPCP</strong> (Jointed Plain Concrete)</td><td>ألواح خرسانية بدون Rebar تسليح + Transverse Joints</td><td>المطارات + الموانئ + الصناعي</td></tr>
<tr><td><strong>JRCP</strong> (Jointed Reinforced)</td><td>ألواح خرسانية بRebar تسليح خفيف</td><td>نادر الاستخدام</td></tr>
<tr><td><strong>CRCP</strong> (Continuously Reinforced)</td><td>Rebar تسليح مستمر — بدون Transverse Joints</td><td>الطرق السريعة الثقيلة</td></tr>
<tr><td><strong>Roller Compacted Concrete (RCC)</strong></td><td>Concrete مدموكة بـ Roller — جافة جداً</td><td>مواقف + مستودعات صناعية</td></tr>
</table>

<h3>📐 2. مواصفات الConcrete — QCS S6 P6</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>درجة الConcrete (fcu)</td><td>≥ C35 / fcu ≥ 35 N/mm²</td><td>QCS S6 P6</td></tr>
<tr><td>Flexural Strength (MR)</td><td>≥ 4.5 MPa @ 28 يوم</td><td>QCS S6 P6</td></tr>
<tr><td>w/c Ratio (أقصى)</td><td>≤ 0.40</td><td>QCS S6 P6</td></tr>
<tr><td>Cement Content (أدنى)</td><td>≥ 380 kg/m³</td><td>QCS S6 P6</td></tr>
<tr><td>نوع الأسمنت في قطر</td><td>SRPC أو OPC+GGBS (بيئة عدوانية)</td><td>QCS S6 P6</td></tr>
<tr><td>Air Content</td><td>4.5 ± 1.5% (مناخ قطر)</td><td>QCS S6 P6</td></tr>
<tr><td>Max Aggregate Size</td><td>≤ ⅓ سماكة اللوح أو 37.5mm</td><td>QCS S6 P6</td></tr>
<tr><td>Slump (Slipform Paving)</td><td>20 - 60mm</td><td>QCS S6 P6</td></tr>
</table>

<h3>📐 3. أبعاد الألواح والمفاصل</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المواصفة</th></tr>
<tr><td>سماكة اللوح (Slab Thickness)</td><td>200 - 300mm حسب Traffic Designation</td></tr>
<tr><td>عرض اللوح (Slab Width)</td><td>= عرض مسار المرور (3.65m عادةً)</td></tr>
<tr><td>طول لوح JPCP (Transverse Joint Spacing)</td><td>4.5 - 6.0m</td></tr>
<tr><td>Transverse Joint Width</td><td>6 - 10mm</td></tr>
<tr><td>Transverse Joint Depth</td><td>⅓ سماكة اللوح (قطع بعد 24-72hr)</td></tr>
<tr><td>Longitudinal Joint</td><td>في منتصف اللوح إذا عرض &gt; 4.5m</td></tr>
<tr><td>Expansion Joint</td><td>عند Fixed Objects (Bridges + Buildings)</td></tr>
</table>

<h3>📐 4. Dowel Bars & Tie Bars</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>Dowel Bars (Transverse)</th><th>Tie Bars (Longitudinal)</th></tr>
<tr><td>الوظيفة</td><td>نقل الأحمال بين الألواح — يسمح بالحركة</td><td>ربط الألواح الجانبية — لا يسمح بالفتح</td></tr>
<tr><td>القطر</td><td>32mm أو 38mm</td><td>16mm أو 20mm</td></tr>
<tr><td>الطول</td><td>450mm</td><td>800mm</td></tr>
<tr><td>التباعد</td><td>كل 300mm في وسط اللوح</td><td>كل 750-1000mm</td></tr>
<tr><td>التشحيم</td><td>نصف الطول مشحّم (يسمح بالحركة)</td><td>لا تشحيم</td></tr>
<tr><td>المادة</td><td>Steel Grade 250 أو Epoxy Coated</td><td>Steel Grade 460</td></tr>
</table>

<h3>📐 5. طرق الصب والفرش</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الطريقة</th><th>الوصف</th><th>المزايا</th></tr>
<tr><td>Slipform Paving</td><td>Paver متخصص يصب ويشكّل ويCompaction في حركة واحدة</td><td>سريع + جودة عالية + أقل عمالة</td></tr>
<tr><td>Fixed Form Paving</td><td>قوالب جانبية ثابتة + صب يدوي/بمضخة</td><td>للأشكال المعقدة + Ramps</td></tr>
</table>

<h3>📐 6. المعالجة (Curing) — QCS S6 P6</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>Curing Compound</td><td>رش فوري بعد الانتهاء من التشطيب Surface — Resin-Based Compound</td></tr>
<tr><td>Curing Duration</td><td>≥ 7 أيام OPC / ≥ 10 أيام SRPC</td></tr>
<tr><td>Hot Weather Protection</td><td>Polythene Sheet + Wet Hessian فوق الـ Compound في درجات &gt; 35°C</td></tr>
<tr><td>Solar Radiation Protection</td><td>White Pigmented Compound لعكس الحرارة</td></tr>
<tr><td>درجة الحرارة أثناء الصب</td><td>Concrete ≤ 32°C في الموقع</td></tr>
</table>

<h3>📐 7. Joint Sealant</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>نوع المادة</td><td>Hot-Applied Rubberized Bitumen أو Polyurethane</td></tr>
<tr><td>وقت التطبيق</td><td>بعد 24-72hr من القطع + بعد جفاف الجوانت</td></tr>
<tr><td>عمق Backer Rod</td><td>يُوضع قبل الـ Sealant بعمق = عرض الجوينت</td></tr>
<tr><td>مستوى الـ Sealant</td><td>5-10mm أقل من سطح اللوح</td></tr>
<tr><td>مقاومة الحرارة</td><td>يتحمل ≥ 70°C (ضروري في قطر)</td></tr>
</table>

<h3>📐 8. اختبارات القبول</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Flexural Strength (Beam Test)</td><td>≥ 4.5 MPa @ 28 يوم</td><td>كل 50m³</td></tr>
<tr><td>Cube Compressive Strength</td><td>≥ 35 N/mm² @ 28 يوم</td><td>كل 50m³</td></tr>
<tr><td>Slab Thickness (Core)</td><td>Design ± 10mm</td><td>كل 1000m²</td></tr>
<tr><td>Surface Evenness (3m Straightedge)</td><td>≤ 3mm تحت الـ 3m Straight Edge</td><td>كل 25m</td></tr>
<tr><td>Level Survey</td><td>± 10mm من التصميم</td><td>كل 25m طول</td></tr>
<tr><td>Texture Depth (Sand Patch)</td><td>≥ 0.7mm (Skid Resistance)</td><td>كل 1000m²</td></tr>
<tr><td>IRI</td><td>≤ 2.0 m/km</td><td>كل Section</td></tr>
<tr><td>Dowel Bar Alignment</td><td>± 6mm من المحور</td><td>100% Visual + Sampling</td></tr>
</table>

<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Mix Design Approval + JMF قبل الإنتاج<br>
• <strong>HP-02:</strong> Subbase + Grade inspection قبل الصب<br>
• <strong>HP-03:</strong> Dowel Bars + Tie Bars inspection قبل الصب<br>
• <strong>HP-04:</strong> Pour Card + Slipform Calibration قبل الصب<br>
• <strong>HP-05:</strong> Flexural Strength 7 يوم → للاستشاري<br>
• <strong>HP-06:</strong> Joint Cutting within 24-72hr من الصب<br>
• <strong>HP-07:</strong> Joint Sealing بعد اكتمال المعالجة</p>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Concrete Pavement — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Concrete Grade</td><td>Min C40 / flexural strength ≥4.5 MPa</td><td>QCS S8 P9</td></tr>
<tr><td>W/C Ratio</td><td>≤0.40</td><td>QCS S8</td></tr>
<tr><td>Slab Thickness</td><td>Design ±5mm</td><td>QCS S8</td></tr>
<tr><td>Texture (brushed)</td><td>3–5mm groove depth</td><td>QCS S8</td></tr>
<tr><td>Joint Spacing</td><td>≤5m transverse / ≤7.5m longitudinal</td><td>QCS S8</td></tr>
<tr><td>Joint Sealant</td><td>Hot applied — BS 2499</td><td>QCS S8</td></tr>
<tr><td>Curing</td><td>Curing compound + min 7 days</td><td>QCS S8</td></tr>
<tr><td>Skid Resistance</td><td>≥55 SRT value</td><td>QCS S8</td></tr>
<tr><td>Level Tolerance</td><td>±3mm under 3m straightedge</td><td>QCS S8</td></tr>
</table>
</div>
` },



  testing_schedule: { title: '🗓️ Testing Schedule Calculator — Required Tests by Quantity', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 Enter delivered quantity → Get required tests + frequency per QCS 2024
</div>

<div class="lang-content-ar">
<h3>🗓️ حاسبة الاختبارات المطلوبة حسب الكمية</h3>
<p style="font-size:12px;color:var(--text3);">أدخل نوع المادة والكمية المسلّمة → الحاسبة تحدد الاختبارات المطلوبة والتكرار الإلزامي حسب QCS 2024</p>

<div style="background:var(--dark4);border-radius:10px;padding:14px;margin:10px 0;">
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">نوع المادة:</label>
<select id="ts-material" onchange="calcTestSchedule()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;font-size:13px;">
<option value="">-- اختر المادة --</option>
<option value="subgrade">Subgrade (تربة Subgrade)</option>
<option value="subbase">Subbase Course</option>
<option value="base">Road Base Course</option>
<option value="asphalt_bc">Asphalt Binder Course (BC)</option>
<option value="asphalt_wc">Asphalt Wearing Course (WC)</option>
<option value="concrete">Concrete (خرسانة)</option>
<option value="water_pipe">Water Supply Pipe</option>
<option value="sewer_pipe">Foul Sewer Pipe</option>
<option value="rebar">Reinforcement Steel (حديد)</option>
</select>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
<div>
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الكمية:</label>
<input type="number" id="ts-qty" placeholder="الكمية" oninput="calcTestSchedule()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
</div>
<div>
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الوحدة:</label>
<select id="ts-unit" onchange="calcTestSchedule()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
<option value="m3">م³ (متر مكعب)</option>
<option value="m2">م² (متر مربع)</option>
<option value="ton">طن</option>
<option value="lm">م.ط (متر طولي)</option>
</select>
</div>
</div>
</div>

<div id="ts-result" style="display:none;margin-top:10px;"></div>
</div>

<div class="lang-content-en" style="display:none;">
<h3>🗓️ Required Tests by Delivered Quantity</h3>
<p style="font-size:12px;color:var(--text3);">Enter material type and delivered quantity → Get required tests + mandatory frequency per QCS 2024</p>

<div style="background:var(--dark4);border-radius:10px;padding:14px;margin:10px 0;">
<div style="margin-bottom:10px;">
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">Material Type:</label>
<select id="ts-material-en" onchange="calcTestScheduleEn()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;font-size:13px;">
<option value="">-- Select Material --</option>
<option value="subgrade">Subgrade Soil</option>
<option value="subbase">Subbase Course</option>
<option value="base">Road Base Course</option>
<option value="asphalt_bc">Asphalt Binder Course (BC)</option>
<option value="asphalt_wc">Asphalt Wearing Course (WC)</option>
<option value="concrete">Concrete</option>
<option value="water_pipe">Water Supply Pipe</option>
<option value="sewer_pipe">Foul Sewer Pipe</option>
<option value="rebar">Reinforcement Steel</option>
</select>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
<div>
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">Quantity:</label>
<input type="number" id="ts-qty-en" placeholder="Enter quantity" oninput="calcTestScheduleEn()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
</div>
<div>
<label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">Unit:</label>
<select id="ts-unit-en" onchange="calcTestScheduleEn()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text1);font-family:Tajawal,sans-serif;">
<option value="m3">m³ (cubic metre)</option>
<option value="m2">m² (square metre)</option>
<option value="ton">tonne</option>
<option value="lm">LM (linear metre)</option>
</select>
</div>
</div>
</div>

<div id="ts-result-en" style="display:none;margin-top:10px;"></div>
</div>
` },

  itp_subgrade: { title: '📋 ITP — Subgrade', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 6, Section 2</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr><tr><td>2.1</td><td>Standard Proctor</td><td>ASTM D698</td><td>تحديد MDD و OMC</td><td>كل تغيير مادة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>2.2</td><td>CBR Soaked 4 days</td><td>ASTM D1883</td><td>≥ 8%</td><td>كل 2000m²</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>2.3</td><td>Atterberg Limits</td><td>ASTM D4318</td><td>LL ≤ 35% | PI ≤ 10%</td><td>كل تغيير مادة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>3.1</td><td>Sand Cone Density</td><td>ASTM D1556</td><td>≥ 95% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr><tr><td>3.2</td><td>Level Survey</td><td>Design Drawing</td><td>± 10mm</td><td>كل 25m</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Survey Report</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness Point | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>🏔️ Subgrade — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Stripped Level</td><td>Survey to formation</td><td>±20mm of design</td><td>W</td></tr>
<tr><td>Proctor MDD/OMC</td><td>Lab — per source change</td><td>BS Heavy Compaction</td><td>W</td></tr>
<tr><td>Moisture Content (field)</td><td>Daily</td><td>OMC ±2%</td><td>W</td></tr>
<tr><td>Compaction (field density)</td><td>1 test per 500m²</td><td>≥95% MDD</td><td>H</td></tr>
<tr><td>CBR (soaked 4d)</td><td>Per 500m³</td><td>≥8% (urban roads)</td><td>H</td></tr>
<tr><td>PI + Sulphate</td><td>Per source change</td><td>PI≤12 / SO3≤0.3%</td><td>W</td></tr>
<tr><td>Proof Rolling</td><td>10t roller — visual</td><td>No rutting >12mm</td><td>H</td></tr>
<tr><td>Formation Approval</td><td>All tests passed</td><td>Engineer sign-off</td><td>H</td></tr>
</table>
</div>
` },
  itp_subbase: { title: '📋 ITP — Subbase', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 6 Part 3</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr><tr><td>2.1</td><td>CBR Soaked</td><td>ASTM D1883</td><td>≥ 30%</td><td>كل 2000m²</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>2.2</td><td>Plasticity Index</td><td>ASTM D4318</td><td>≤ 6%</td><td>كل 500m³</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>3.1</td><td>Sand Cone Density</td><td>ASTM D1556</td><td>≥ 98% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Subbase Course</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Material Approval</td><td>Grading + LA + PI + SE</td><td>Per source</td><td>QCS S6 P4</td><td>HP</td></tr>
<tr><td>Grading Analysis</td><td>Within Table 4:1 envelope</td><td>Per 500m³</td><td>ASTM C136</td><td>W</td></tr>
<tr><td>LA Abrasion</td><td>≤ 30%</td><td>Per 1000m³</td><td>ASTM C131</td><td>W</td></tr>
<tr><td>Sand Equivalent</td><td>≥ 30%</td><td>Per 500m³</td><td>ASTM D2419</td><td>W</td></tr>
<tr><td>Field Density</td><td>≥ 98% MDD</td><td>Per 500m²</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>CBR (Soaked 4 days)</td><td>≥ 30%</td><td>Per 2000m²</td><td>ASTM D1883</td><td>HP</td></tr>
<tr><td>Level Survey</td><td>± 10mm from design</td><td>Per 25m</td><td>Total Station</td><td>HP</td></tr></table>
</div>
` },
  itp_base: { title: '📋 ITP — Base Course', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 6 Part 3</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr><tr><td>2.1</td><td>CBR Soaked</td><td>ASTM D1883</td><td>≥ 80%</td><td>كل 2000m²</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>2.2</td><td>LA Abrasion</td><td>ASTM C131</td><td>≤ 25%</td><td>كل 1000m³</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr><tr><td>3.1</td><td>Sand Cone Density</td><td>ASTM D1556</td><td>≥ 98% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr><tr><td>3.2</td><td>Plate Load Test</td><td>BS 1377 Part 9</td><td>حسب التصميم</td><td>كل 2000m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Road Base Course</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Material Approval</td><td>Grading + LA + Fractured Faces + SE</td><td>Per source</td><td>QCS S6 P4</td><td>HP</td></tr>
<tr><td>LA Abrasion</td><td>≤ 25%</td><td>Per 1000m³</td><td>ASTM C131</td><td>W</td></tr>
<tr><td>Fractured Faces (1+)</td><td>≥ 95%</td><td>Per 500m³</td><td>ASTM D5821</td><td>W</td></tr>
<tr><td>Sand Equivalent</td><td>≥ 45%</td><td>Per 500m³</td><td>ASTM D2419</td><td>W</td></tr>
<tr><td>Field Density</td><td>≥ 98% MDD</td><td>Per 500m²</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>CBR (Soaked 4 days)</td><td>≥ 80%</td><td>Per 2000m²</td><td>ASTM D1883</td><td>HP</td></tr>
<tr><td>Level Survey</td><td>± 8mm from design</td><td>Per 25m</td><td>Total Station</td><td>HP</td></tr></table>
</div>
` },
  itp_primecoat: { title: '📋 ITP — Prime Coat & Tack Coat', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 6 Part 5 Cl.5.4</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr><tr><td>2.1</td><td>Prime Coat Material</td><td>S.6 P.5 Cl.5.4</td><td>شهادة المصنع + مطابقة المواصفة</td><td>كل دفعة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Certificate</td></tr><tr><td>3.1</td><td>Prime Coat Application Rate</td><td>S.6 P.5</td><td>0.8 - 1.2 L/m²</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Application Record</td></tr><tr><td>3.2</td><td>Tack Coat Rate</td><td>S.6 P.5</td><td>Binder: 0.3-0.5 | Wearing: 0.2-0.4 L/m²</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Application Record</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Prime Coat & Tack Coat</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Material Approval (Prime)</td><td>MAR MC-30 or MC-70</td><td>Per delivery</td><td>ASTM D2028</td><td>HP</td></tr>
<tr><td>Material Approval (Tack)</td><td>MAR SS-1h or CSS-1h</td><td>Per delivery</td><td>ASTM D977</td><td>HP</td></tr>
<tr><td>Tanker Calibration</td><td>Calibration report submitted</td><td>Before first use</td><td>QCS S6 P5</td><td>HP</td></tr>
<tr><td>Application Rate (Prime)</td><td>0.8 - 1.2 L/m²</td><td>Each day</td><td>QCS S6 P5</td><td>W</td></tr>
<tr><td>Application Rate (Tack)</td><td>0.2 - 0.5 L/m² residual</td><td>Each day</td><td>QCS S6 P5</td><td>W</td></tr>
<tr><td>Curing Inspection</td><td>Black + non-tacky before asphalt</td><td>100%</td><td>Visual</td><td>HP</td></tr></table>
</div>
` },
  itp_wearing: { title: '📋 ITP — Binder & Wearing Course', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 6 Part 5</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr><tr><td>2.1</td><td>Plant Calibration</td><td>S.6 P.5</td><td>معايرة المحطة قبل الإنتاج</td><td>كل موسم</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Calibration Certificate</td></tr><tr><td>3.1</td><td>Delivery Temperature</td><td>S.6 P.5</td><td>≥ 140°C</td><td>كل حمولة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Temperature Log</td></tr><tr><td>4.1</td><td>Core Sample Density</td><td>BS EN 12697-6</td><td>≥ 98% TMD</td><td>كل 1000m²</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Core Report</td></tr><tr><td>4.2</td><td>Straightedge 3m</td><td>S.6 P.5</td><td>≤ 5mm</td><td>كل 100m</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr><tr><td>4.3</td><td>Skid Resistance</td><td>S.6 P.5</td><td>≥ 55 PSV</td><td>كل 500m</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Report</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>🛣️ Wearing Course — Inspection & Test Plan</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Mix Design</td><td>Marshall + lab approval</td><td>All criteria met</td><td>H</td></tr>
<tr><td>Trial Section</td><td>Full QC testing</td><td>Engineer approval</td><td>H</td></tr>
<tr><td>Tack Coat</td><td>Rate check + visual</td><td>0.2-0.4 L/m² CSS-1h</td><td>W</td></tr>
<tr><td>Delivery Temp</td><td>Each delivery — probe</td><td>≥145°C (≥155°C PMB)</td><td>W</td></tr>
<tr><td>Lay Temp</td><td>At paver — probe</td><td>≥135°C</td><td>W</td></tr>
<tr><td>Compaction Temp</td><td>Before final roller pass</td><td>≥125°C / stop at 80°C</td><td>W</td></tr>
<tr><td>Core Density</td><td>1 per 250m²</td><td>≥97% TMD</td><td>H</td></tr>
<tr><td>IRI Smoothness</td><td>100% of lanes</td><td>≤2.5 m/km (≤0.9 PMB)</td><td>H</td></tr>
<tr><td>Thickness</td><td>Core measurement</td><td>Design ±5mm</td><td>W</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:6px;">H = Hold Point | W = Witness Point | QCS 2024 Section 8</div>
</div>
` },
  itp_asphalt: { title: '📋 ITP — Asphalt Testing', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 6 Part 5</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th></tr><tr><td>2.1</td><td>Bitumen Pen 60-70</td><td>Table 5.4</td><td>Penetration 60-70 | SP ≥46°C | Ductility ≥100cm</td><td>كل 75 طن</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td></tr><tr><td>2.2</td><td>Marshall Test</td><td>Table 5.8</td><td>Stability ≥9.5kN | Flow 2-4mm | Va 3-8%</td><td>يومياً + كل 300 طن</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td></tr><tr><td>2.3</td><td>Extraction & Gradation</td><td>Table 5.7</td><td>حسب JMF ± tolerance</td><td>كل 200 طن</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Asphalt Testing (All Layers)</h3>
<table class="dm-table"><tr><th>Test</th><th>Frequency</th><th>WC</th><th>BC</th><th>Standard</th></tr>
<tr><td>Delivery Temp</td><td>Every load</td><td>≥130°C</td><td>≥130°C</td><td>QCS S6 P5</td></tr>
<tr><td>Bitumen Extraction</td><td>Per 200t</td><td>±0.3% JMF</td><td>±0.3% JMF</td><td>ASTM D2172</td></tr>
<tr><td>Marshall Stability</td><td>Per 200t</td><td>≥ 9 kN</td><td>≥ 8 kN</td><td>ASTM D1559</td></tr>
<tr><td>Air Voids Va</td><td>Per 200t</td><td>3-5%</td><td>3-5%</td><td>ASTM D3203</td></tr>
<tr><td>Core Density</td><td>Per 1000m²</td><td>≥97% TMD</td><td>≥97% TMD</td><td>ASTM D6927</td></tr>
<tr><td>IRI</td><td>Per 400m</td><td>≤0.9-1.5</td><td>—</td><td>PWA IAN 013</td></tr></table>
</div>
` },
  itp_water_supply: { title: '📋 ITP — شبكة مياه الشرب', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 8 Part 1 | KAHRAMAA Standards</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th></tr><tr><td>1.1</td><td>Material Approval</td><td>ISO Certificate قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>3.1</td><td>Trench Depth & Width</td><td>≥ 1.0m | OD + 600mm</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td></tr><tr><td>5.1</td><td>Hydrostatic Pressure Test</td><td>1.5x / ساعتان / صفر انخفاض</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>6.2</td><td>Bacteriological Test</td><td>Total Coliform = 0 / 100ml</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Water Supply Network</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Pipe Material</td><td>MAR HDPE PE100/DI/GRP</td><td>Each delivery</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Yellow Marker Tape</td><td>300mm above pipe crown</td><td>100%</td><td>KAHRAMAA</td><td>W</td></tr>
<tr><td>Pipe Separation</td><td>≥ 1.0m from sewer</td><td>100%</td><td>KAHRAMAA</td><td>W</td></tr>
<tr><td>Bedding Compaction</td><td>≥ 90% MDD</td><td>Per 50m</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>Hydrostatic Test</td><td>1.5 × PN / 2hr / zero drop</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Chlorination</td><td>≥ 50ppm / ≥ 24hr</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Water Quality</td><td>Coliform=0 | Turbidity ≤ 1 NTU</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr></table>
</div>
` },
  itp_sewer: { title: '📋 ITP — شبكة Foul Sewer', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 8, Section 2 | Ashghal Standards</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th></tr><tr><td>1.1</td><td>Material Approval</td><td>ISO Certificate قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>2.2</td><td>Bedding Gradient</td><td>حسب التصميم ± 3mm</td><td>كل 25m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>5.1</td><td>Air Test</td><td>100mm WG — انخفاض ≤ 25mm / 5 دقائق</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>5.2</td><td>CCTV Inspection</td><td>100% — Grade ≤ 2</td><td>100% قبل التسليم</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Foul Sewer Network</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Pipe Material</td><td>MAR uPVC/GRP/Concrete</td><td>Each delivery</td><td>BS EN 295</td><td>HP</td></tr>
<tr><td>Green Marker Tape</td><td>300mm above pipe</td><td>100%</td><td>Ashghal</td><td>W</td></tr>
<tr><td>Pipe Gradient</td><td>Laser level vs IFC drawing</td><td>Every joint</td><td>IFC</td><td>W</td></tr>
<tr><td>Bedding Compaction</td><td>≥ 90% MDD</td><td>Per 50m</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>Air Test</td><td>100mm WG / 5min / drop ≤ 25mm</td><td>Per section</td><td>BS EN 1610</td><td>HP</td></tr>
<tr><td>CCTV Survey</td><td>100% — Grade ≤ 2</td><td>100%</td><td>WRc</td><td>HP</td></tr>
<tr><td>Manhole Level</td><td>Cover ± 5mm from road</td><td>100%</td><td>Survey</td><td>W</td></tr></table>
</div>
` },

// ===== NEW SECTION: SHORING ITP =====
shoring_itp: {
title: '⛏️ ITP — التدعيم والحفريات | QCS 2024 P1 S8 + QHSE',
content: `
<div class="qcs-ref-badge">QCS 2024 — Part 1, Section 8 + Ashghal QHSE</div>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;color:#e74c3c;line-height:1.7;">⛔ <strong>إلزامي:</strong> أي حفرية عمقها >1.2m بدون Shoring Design مُعتمد يُوقف العمل فوراً — QCS P1 S8.4</div>
<table class="dm-table"><thead><tr><th>م</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>QC</th><th>SC</th><th>HP</th></tr></thead><tbody>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">التصميم والموافقة</td></tr>
<tr><td>01</td><td><strong>Shoring Design Submission</strong><br><small>مخططات Geotech مُعتمدة</small></td><td>QCS P1 S8.4.1</td><td>Stamped Design<br>Timber/Sheet Pile/Soldier Pile<br>Method approved before excavation</td><td>Per excavation >1.2m</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>02</td><td><strong>Soil Investigation Check</strong></td><td>QCS P3 S3</td><td>Borehole <50m spacing<br>SPT reviewed<br>GWT confirmed</td><td>Pre-design</td><td>W</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">أثناء التنفيذ</td></tr>
<tr><td>03</td><td><strong>Slope Stability</strong></td><td>OSHA 1926.652 / QCS P1 S8.4</td><td>رمل: 1.5H:1V (34°)<br>طين صلب: 1H:1V (45°)<br>طين رخو: 1.5H:1V</td><td>يومياً + بعد المطر</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>04</td><td><strong>Shoring Installation</strong></td><td>QCS P1 S8.4.3</td><td>Waling/Struts at design levels<br>Penetration ≥ Design<br>لا فراغات خلف Sheet Pile</td><td>كل 2m عمق</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>05</td><td><strong>Excavation Monitoring</strong></td><td>QCS P1 S8.5 / CIRIA C580</td><td>Settlement <25mm<br>Deflection <H/500<br>تقرير Inclinometer يومي</td><td>يومياً</td><td>W</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>06</td><td><strong>Safety & Exclusion Zone</strong></td><td>Ashghal QHSE</td><td>Barricade ≥1.5m<br>PPE: Helmet+Harness<br>إضاءة ≥50 Lux<br>Ladder per 15m</td><td>كل وردية</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">Dewatering — نزح المياه</td></tr>
<tr><td>07</td><td><strong>Dewatering System Design</strong></td><td>QCS P3 S4.2 / BS 8004</td><td>GWT lowered ≥0.5m below excavation<br>Standby pump 100%<br>Pump tested</td><td>قبل الحفر</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>08</td><td><strong>GWT Monitoring</strong></td><td>QCS P3 S4.3</td><td>GWT ≥0.5m below formation<br>تقرير Piezometers يومي</td><td>يومياً</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>09</td><td><strong>Discharge Water Quality</strong></td><td>QCS P24 / Ashghal Env.</td><td>Turbidity ≤50 NTU<br>Silt Trap إلزامي</td><td>يومياً</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>10</td><td><strong>Formation Level Inspection</strong></td><td>QCS P1 S8 / P14 S4.1</td><td>جاف + ≥95% MDD<br>Levels ±20mm<br>Geotech approval</td><td>قبل الإنشاء</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
</tbody></table>
<h3>📐 تصنيف الحفريات</h3>
<table class="dm-table"><thead><tr><th>العمق</th><th>الاشتراط</th><th>نوع الدعم</th><th>المرجع</th></tr></thead><tbody>
<tr><td>< 1.2m</td><td>فحص بصري</td><td>قد لا يلزم</td><td>QCS P1 S8.4</td></tr>
<tr><td>1.2–3.0m</td><td>Shoring Design + MS</td><td>Timber / Trench Box</td><td>QCS P1 S8.4.2</td></tr>
<tr><td>3.0–6.0m</td><td>Licensed Eng. Design</td><td>Sheet Pile / Soldier</td><td>QCS P1 S8.4.3</td></tr>
<tr><td>> 6.0m</td><td>Specialist Contractor</td><td>Secant / Diaphragm Wall</td><td>BS 8004</td></tr>
<tr><td>أي Sabkha</td><td>Dewatering إلزامي</td><td>Wellpoints + Sheet</td><td>IAN-006</td></tr>
</tbody></table>
`},

// ===== NEW SECTION: CCTV ITP =====
cctv_itp: {
title: '📹 ITP — CCTV Survey | BS EN 13508 / WRc',
content: `
<div class="qcs-ref-badge">BS EN 13508-2 / WRc Sewer Rehabilitation Manual</div>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;color:#e74c3c;line-height:1.7;">⛔ 100% من خطوط الصرف تحتاج CCTV Survey قبل Handover — بدونها يُرفض Taking-Over Certificate</div>
<table class="dm-table"><thead><tr><th>م</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>QC</th><th>SC</th><th>HP</th></tr></thead><tbody>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">قبل الفحص</td></tr>
<tr><td>01</td><td><strong>Cleaning & Flushing</strong></td><td>WRc Sec.3.1</td><td>High-pressure jet<br>لا رواسب >10% قطر<br>Water <1/5 diameter</td><td>قبل كل CCTV</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>02</td><td><strong>Camera Calibration</strong></td><td>BS EN 13508-1</td><td>Color HD ≥720p<br>Distance ±0.1m/100m<br>360° lighting</td><td>بداية كل يوم</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">أثناء الفحص</td></tr>
<tr><td>03</td><td><strong>CCTV Survey — Main Lines</strong></td><td>BS EN 13508-2 / WRc</td><td>Speed ≤0.1 m/s<br>كل عيب يُشفَّر EN 13508-2<br>Grade ≤2 = مقبول</td><td>100% خطوط</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>04</td><td><strong>Lateral Connections</strong></td><td>WRc Sec.5.2</td><td>كل فرع مُصوَّر<br>لا infiltration</td><td>100%</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>05</td><td><strong>Manhole Inspection</strong></td><td>WRc Sec.6 / QCS P22 S5</td><td>لا تشققات >3mm<br>Cover ±5mm</td><td>100%</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">التقارير</td></tr>
<tr><td>06</td><td><strong>CCTV Report</strong></td><td>BS EN 13508-2</td><td>pipe ID + length + codes<br>Video + photos<br>Defect Map + Grade</td><td>Per session</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>07</td><td><strong>Grade Assessment</strong></td><td>WRc Table 2</td><td>Grade 1: ✅ بلا عيوب<br>Grade 2: ✅ بسيطة<br>Grade 3: ❌ متوسط<br>Grade 4: ❌ شديد<br>Grade 5: ❌ انهيار</td><td>Per pipe</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>08</td><td><strong>Repair Verification</strong></td><td>WRc Sec.7 / BS EN 1610</td><td>Re-run CCTV بعد إصلاح<br>Grade ≤2<br>Air Test يُعاد لـ Grade 3+</td><td>كل إصلاح</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
</tbody></table>
<h3>📊 رموز العيوب — WRc / BS EN 13508-2</h3>
<table class="dm-table"><thead><tr><th>الرمز</th><th>العيب</th><th>Grade</th><th>السبب</th><th>الإجراء</th></tr></thead><tbody>
<tr><td><strong>ABB</strong></td><td>Blockage — انسداد</td><td style="color:#e74c3c">3-5</td><td>رواسب / جذور</td><td>Jetting + Re-CCTV</td></tr>
<tr><td><strong>BAB</strong></td><td>Brick Projection</td><td style="color:#f39c12">2-3</td><td>تشطيب رديء</td><td>Point Repair</td></tr>
<tr><td><strong>DAF</strong></td><td>Deformation</td><td style="color:#e74c3c">3-4</td><td>ردم غير صحيح</td><td>استبدال</td></tr>
<tr><td><strong>FAA</strong></td><td>Fracture — تشقق</td><td style="color:#e74c3c">3-5</td><td>Bedding رديء</td><td>استبدال</td></tr>
<tr><td><strong>IAA</strong></td><td>Infiltration — تسرب</td><td style="color:#f39c12">2-4</td><td>وصلة مكسورة</td><td>Joint Seal</td></tr>
<tr><td><strong>JAA</strong></td><td>Joint Displaced</td><td style="color:#f39c12">2-3</td><td>حركة تربة</td><td>Point Repair</td></tr>
<tr><td><strong>RBB</strong></td><td>Root Intrusion</td><td style="color:#f39c12">2-4</td><td>قرب أشجار</td><td>Cutting + CIPP</td></tr>
</tbody></table>
`},

// ===== NEW SECTION: SABKHA TREATMENT =====
sabkha_treatment: {
title: '🏜️ ITP — معالجة السبخة | QCS P7 S2.5 + IAN-006',
content: `
<div class="qcs-ref-badge">QCS 2024 — Part 7, Section 2.5 + Ashghal IAN-006</div>
<div style="background:rgba(243,156,18,.08);border:1px solid rgba(243,156,18,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;color:#f39c12;line-height:1.7;">⚠️ Sabkha شائعة في ساحل قطر — معالجة خاصة إلزامية قبل أي أعمال طرق أو مرافق</div>
<table class="dm-table"><thead><tr><th>م</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>SC</th><th>HP</th></tr></thead><tbody>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="7">الكشف والتصنيف</td></tr>
<tr><td>01</td><td><strong>Sabkha Identification</strong></td><td>QCS P7 S2.5 / IAN-006</td><td>SO₃ >0.5% → Sabkha Zone<br>Cl >0.6% → High Salinity<br>CBR <5% → Soft Sabkha</td><td>Per 500m²</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="7">المعالجة</td></tr>
<tr><td>02</td><td><strong>Excavation to Firm Ground</strong></td><td>IAN-006 Sec.4</td><td>حتى CBR ≥8% أو N ≥5<br>Geotech confirms<br>Dewatering during excavation</td><td>100%</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>03</td><td><strong>Geotextile</strong></td><td>ASTM D4751</td><td>Non-woven ≥10 kN/m<br>Overlap ≥300mm</td><td>100%</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>04</td><td><strong>Select Fill</strong></td><td>QCS P7 S2.5.3</td><td>SO₃ <0.4% | Cl <0.5%<br>CBR ≥8%<br>Layer ≤200mm</td><td>Per 500m³</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>05</td><td><strong>Compaction</strong></td><td>ASTM D1556</td><td>≥95% MDD per layer<br>K ≥30 MN/m³</td><td>كل 500m²</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>06</td><td><strong>Cement/Lime Stabilization</strong></td><td>IAN-006 Sec.5 / BS EN 14227</td><td>Cement 3-5%<br>UCS ≥0.5 MPa @28d<br>سماكة ≥300mm</td><td>Per zone</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>07</td><td><strong>Final Formation</strong></td><td>QCS P7 S3.4</td><td>CBR ≥8%<br>Levels ±20mm<br>Geotech sign-off</td><td>100%</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
</tbody></table>
`},

// ===== ROAD DESIGN CRITERIA — QCS S6 P2 =====
road_design_criteria: {
title: '🛣️ معايير تصميم الطرق — QCS 2024 S6 P2',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 6, Part 2 — Road Design Criteria</div>
<h3>عروض الطرق — Carriageway Widths</h3>
<table class="dm-table"><thead><tr><th>تصنيف الطريق</th><th>العرض</th><th>عدد الحارات</th><th>عرض الرصيف</th></tr></thead><tbody>
<tr><td>Local Road</td><td><strong>6.5m</strong></td><td>2</td><td>2.0m</td></tr>
<tr><td>Collector Road</td><td><strong>7.5m</strong></td><td>2</td><td>2.5m</td></tr>
<tr><td>Arterial Road</td><td><strong>11.0m</strong></td><td>2+2 (divided)</td><td>3.0m</td></tr>
<tr><td>Expressway</td><td><strong>14.0m+</strong></td><td>3+3</td><td>—</td></tr>
</tbody></table>
<h3>مسافات الرؤية — Sight Distance</h3>
<table class="dm-table"><thead><tr><th>السرعة</th><th>Stopping Distance</th><th>Passing Distance</th><th>Min. Horizontal Curve R</th></tr></thead><tbody>
<tr><td>40 km/h</td><td>45m</td><td>300m</td><td>60m</td></tr>
<tr><td>50 km/h</td><td>55m</td><td>375m</td><td>115m</td></tr>
<tr><td>60 km/h</td><td><strong>70m</strong></td><td><strong>485m</strong></td><td><strong>195m</strong></td></tr>
<tr><td>80 km/h</td><td>110m</td><td>620m</td><td>345m</td></tr>
<tr><td>100 km/h</td><td>160m</td><td>800m</td><td>570m</td></tr>
</tbody></table>
<h3>الانحدار والميل — Grade & Crossfall</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>القيمة</th><th>ملاحظات</th></tr></thead><tbody>
<tr><td>Crossfall</td><td><strong>2.5% ± 0.3%</strong></td><td>في المستقيم</td></tr>
<tr><td>Max Superelevation</td><td><strong>8%</strong></td><td>في المنحنيات</td></tr>
<tr><td>Max Grade — عام</td><td><strong>8%</strong></td><td>طرق محلية وتجميعية</td></tr>
<tr><td>Max Grade — رئيسي</td><td><strong>6%</strong></td><td>طرق شريانية وسريعة</td></tr>
<tr><td>Min Grade</td><td><strong>0.5%</strong></td><td>للصرف السطحي</td></tr>
</tbody></table>
`},

// ===== MARKER TAPE COLORS — KAHRAMAA =====
marker_tape_colors: {
title: '🎨 ألوان شريط التحذير — KAHRAMAA Official Colors',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 8 + KAHRAMAA Standards</div>
<table class="dm-table"><thead><tr><th>الشبكة</th><th>اللون</th><th>Color</th><th>عمق الشريط</th></tr></thead><tbody>
<tr><td>💧 مياه الشرب — Potable Water</td><td style="background:#FFD700;color:#000;font-weight:700;text-align:center">أصفر</td><td>Yellow</td><td rowspan="7" style="text-align:center;font-weight:700">300mm<br>فوق قمة الماسورة</td></tr>
<tr><td>🚽 صرف صحي — Foul Sewer</td><td style="background:#2ecc71;color:#fff;font-weight:700;text-align:center">أخضر</td><td>Green</td></tr>
<tr><td>🌧️ صرف سطحي — Storm Water</td><td style="background:#95a5a6;color:#fff;font-weight:700;text-align:center">رمادي</td><td>Grey</td></tr>
<tr><td>♻️ مياه معالجة — Treated Water</td><td style="background:#8e44ad;color:#fff;font-weight:700;text-align:center">بنفسجي</td><td>Purple</td></tr>
<tr><td>⚡ كهرباء — Electricity</td><td style="background:#e74c3c;color:#fff;font-weight:700;text-align:center">أحمر</td><td>Red</td></tr>
<tr><td>🔥 غاز — Gas</td><td style="background:#e67e22;color:#fff;font-weight:700;text-align:center">أصفر غامق</td><td>Amber</td></tr>
<tr><td>📡 اتصالات — Telecom</td><td style="background:#3498db;color:#fff;font-weight:700;text-align:center">أزرق</td><td>Blue</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;color:#e74c3c">
⚠️ <strong>تحذير ميداني:</strong> استخدام لون خاطئ = حفر خاطئ في المستقبل = إصابات محتملة + NCR. تأكد من اللون الصحيح قبل الردم.
</div>
`},

// ===== PILE LOAD TESTING =====
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

// ===== ESAL CALCULATOR =====
esal_calculator_full: {
title: '🚛 حاسبة ESAL — تصنيف حمل المحاور',
content: `
<div class="qcs-ref-badge">AASHTO 1993 + QCS 2024 Section 6</div>
<h3>حاسبة ESAL</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div><label style="font-size:11px;color:var(--text3)">AADT (حجم المرور اليومي)</label><input class="calc-input" id="esal-aadt" type="number" style="width:100%" placeholder="5000"></div>
<div><label style="font-size:11px;color:var(--text3)">نسبة الشاحنات %</label><input class="calc-input" id="esal-truck" type="number" style="width:100%" placeholder="15"></div>
<div><label style="font-size:11px;color:var(--text3)">معامل النمو السنوي %</label><input class="calc-input" id="esal-growth" type="number" style="width:100%" placeholder="4"></div>
<div><label style="font-size:11px;color:var(--text3)">عمر التصميم (سنة)</label><input class="calc-input" id="esal-life" type="number" style="width:100%" value="20"></div>
</div>
<button class="calc-btn" onclick="calcESAL()">احسب ESAL</button>
<div class="calc-result" id="esal-result"></div>
<h3>جدول Traffic Designation — QCS 2024</h3>
<table class="dm-table"><thead><tr><th>التصنيف</th><th>ESAL (مليون)</th><th>سماكة الإسفلت</th><th>نوع البيتومين</th></tr></thead><tbody>
<tr><td>T1</td><td>< 0.3</td><td>50mm WC only</td><td>60/70 Conv.</td></tr>
<tr><td>T2</td><td>0.3 – 1.0</td><td>50mm WC + 60mm BC</td><td>60/70 Conv.</td></tr>
<tr><td>T3</td><td>1.0 – 3.0</td><td>50mm WC + 70mm BC</td><td>60/70 أو PMB</td></tr>
<tr><td>T4</td><td>3.0 – 10.0</td><td>50mm WC + 80mm BC</td><td>PMB مُوصى</td></tr>
<tr><td>T5</td><td>10.0 – 30.0</td><td>50mm WC + 2×70mm BC</td><td>PMB إلزامي</td></tr>
<tr><td>T6</td><td>> 30.0</td><td>50mm WC + 2×80mm BC</td><td>PMB إلزامي + تصميم خاص</td></tr>
</tbody></table>
`},

// ===== CONCRETE MIX DESIGN VALIDATOR =====
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

// ===== PIPE SIZING CALCULATOR =====
pipe_sizing_calc: {
title: '🔧 حاسبة أقطار المواسير — Pipe Sizing',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA + Ashghal Drainage Design Manual</div>
<h3>حاسبة القطر المثالي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div><label style="font-size:11px;color:var(--text3)">نوع الشبكة</label><select class="calc-select" id="pipe-type"><option value="water">💧 مياه شرب</option><option value="sewer">🚽 صرف صحي (gravity)</option><option value="storm">🌧️ صرف سطحي</option></select></div>
<div><label style="font-size:11px;color:var(--text3)">تدفق التصميم Q (L/s)</label><input class="calc-input" id="pipe-q" type="number" step="0.1" style="width:100%" placeholder="15"></div>
<div><label style="font-size:11px;color:var(--text3)">الانحدار % (gravity فقط)</label><input class="calc-input" id="pipe-slope" type="number" step="0.01" style="width:100%" placeholder="0.5"></div>
<div><label style="font-size:11px;color:var(--text3)">ضغط التشغيل PN (bar) — مياه فقط</label><input class="calc-input" id="pipe-pn" type="number" style="width:100%" placeholder="10"></div>
</div>
<button class="calc-btn" onclick="calcPipeSize()">🔧 احسب القطر</button>
<div class="calc-result" id="pipe-result"></div>
<h3>جدول السرعات المسموحة</h3>
<table class="dm-table"><thead><tr><th>الشبكة</th><th>Min Velocity</th><th>Max Velocity</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td>مياه شرب</td><td>0.3 m/s</td><td>3.0 m/s</td><td>KAHRAMAA</td></tr>
<tr><td>Foul Sewer</td><td>0.6 m/s (self-cleansing)</td><td>3.0 m/s</td><td>BS EN 752</td></tr>
<tr><td>Storm Water</td><td>0.6 m/s</td><td>4.5 m/s</td><td>Ashghal Drainage Manual</td></tr>
</tbody></table>
`},



// ===== PHASE 3: CALCULATOR 1 — Rebar, Cover, Lap Length =====
rebar_cover_calc: {
title: '🔩 حاسبة الحديد والتسليح — Rebar, Cover & Lap',
content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 S5 P4 + BS 8666 | فحص مواصفات التسليح فوراً
</div>

<!-- TAB SWITCHER -->
<div style="display:flex;gap:0;margin-bottom:14px;border-radius:10px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);">
  <button id="reb-tab-steel" onclick="
    document.getElementById('reb-panel-steel').style.display='block';
    document.getElementById('reb-panel-cover').style.display='none';
    document.getElementById('reb-panel-lap').style.display='none';
    this.style.background='rgba(201,168,76,0.2)'; this.style.color='var(--gold)';
    document.getElementById('reb-tab-cover').style.background='var(--dark4)'; document.getElementById('reb-tab-cover').style.color='var(--text2)';
    document.getElementById('reb-tab-lap').style.background='var(--dark4)'; document.getElementById('reb-tab-lap').style.color='var(--text2)';"
    style="flex:1;padding:10px;border:none;background:rgba(201,168,76,0.2);color:var(--gold);font-weight:700;font-size:12px;cursor:pointer;font-family:Tajawal,sans-serif;">
    🔩 فحص الحديد<br><span style="font-size:10px;font-weight:400">fy / fu</span>
  </button>
  <button id="reb-tab-cover" onclick="
    document.getElementById('reb-panel-steel').style.display='none';
    document.getElementById('reb-panel-cover').style.display='block';
    document.getElementById('reb-panel-lap').style.display='none';
    this.style.background='rgba(201,168,76,0.2)'; this.style.color='var(--gold)';
    document.getElementById('reb-tab-steel').style.background='var(--dark4)'; document.getElementById('reb-tab-steel').style.color='var(--text2)';
    document.getElementById('reb-tab-lap').style.background='var(--dark4)'; document.getElementById('reb-tab-lap').style.color='var(--text2)';"
    style="flex:1;padding:10px;border:none;background:var(--dark4);color:var(--text2);font-size:12px;cursor:pointer;font-family:Tajawal,sans-serif;">
    📏 فحص الغطاء<br><span style="font-size:10px">Cover Check</span>
  </button>
  <button id="reb-tab-lap" onclick="
    document.getElementById('reb-panel-steel').style.display='none';
    document.getElementById('reb-panel-cover').style.display='none';
    document.getElementById('reb-panel-lap').style.display='block';
    this.style.background='rgba(201,168,76,0.2)'; this.style.color='var(--gold)';
    document.getElementById('reb-tab-steel').style.background='var(--dark4)'; document.getElementById('reb-tab-steel').style.color='var(--text2)';
    document.getElementById('reb-tab-cover').style.background='var(--dark4)'; document.getElementById('reb-tab-cover').style.color='var(--text2)';"
    style="flex:1;padding:10px;border:none;background:var(--dark4);color:var(--text2);font-size:12px;cursor:pointer;font-family:Tajawal,sans-serif;">
    🔗 طول الوصلة<br><span style="font-size:10px">Lap Length</span>
  </button>
</div>

<!-- PANEL 1: Rebar Steel Check -->
<div id="reb-panel-steel">
  <p style="font-size:11px;color:var(--text3);margin-bottom:10px;">فحص مواصفات الحديد حسب QCS S5 + BS 4449 — ادخل نتائج اختبار الشد</p>
  <div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">fy — Yield Strength (MPa):</label>
        <input type="number" id="reb-fy" placeholder="e.g. 530" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">fu — Ultimate Strength (MPa):</label>
        <input type="number" id="reb-fu" placeholder="e.g. 640" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">Elongation % (اختياري):</label>
        <input type="number" id="reb-elong" placeholder="e.g. 16" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div style="display:flex;align-items:flex-end;">
        <button onclick="calcRebar()" style="width:100%;padding:9px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚡ فحص الآن</button>
      </div>
    </div>
  </div>
  <div class="calc-result" id="reb-result"></div>
  <div style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px;">
    <div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:6px;">📋 المعايير (QCS S5 + BS 4449 B500B)</div>
    <table class="dm-table"><thead><tr><th>الخاصية</th><th>الحد الأدنى</th></tr></thead><tbody>
      <tr><td>fy — Yield Strength</td><td>≥ 500 MPa</td></tr>
      <tr><td>fu — Ultimate Strength</td><td>≥ 600 MPa</td></tr>
      <tr><td>fu/fy Ratio</td><td>≥ 1.15</td></tr>
      <tr><td>Elongation</td><td>≥ 14%</td></tr>
    </tbody></table>
  </div>
</div>

<!-- PANEL 2: Cover Check -->
<div id="reb-panel-cover" style="display:none;">
  <p style="font-size:11px;color:var(--text3);margin-bottom:10px;">فحص غطاء الخرسانة الفعلي مقابل المطلوب حسب QCS S5 P4</p>
  <div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
    <div style="margin-bottom:10px;">
      <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">نوع العنصر / Exposure Class:</label>
      <select id="cover-type" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
        <option value="75">الأساسات المباشرة بالتربة (75mm)</option>
        <option value="50">أعمدة / جدران خارجية — XS2 (50mm)</option>
        <option value="40">أعمدة / جدران داخلية وخارجية (40mm)</option>
        <option value="35">جسور / Beams خارجية (35mm)</option>
        <option value="30">بلاطات Slabs خارجية (30mm)</option>
        <option value="20">عناصر داخلية محمية (20mm)</option>
        <option value="15">Blinding / عزل (15mm)</option>
      </select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الغطاء الفعلي المقاس (mm):</label>
        <input type="number" id="cover-val" placeholder="e.g. 45" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div style="display:flex;align-items:flex-end;">
        <button onclick="calcCover()" style="width:100%;padding:9px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚡ فحص الغطاء</button>
      </div>
    </div>
  </div>
  <div class="calc-result" id="cover-result"></div>
  <div style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;margin-top:8px;font-size:11px;color:var(--text3);">
    ℹ️ في قطر: Cover الأساسات يُزاد بـ 10mm إضافية للبيئة العدوانية (كبريتات + رطوبة)
  </div>
</div>

<!-- PANEL 3: Lap Length -->
<div id="reb-panel-lap" style="display:none;">
  <p style="font-size:11px;color:var(--text3);margin-bottom:10px;">حساب طول الوصلة المطلوب وفحص الطول الفعلي — QCS S5 + BS 8666</p>
  <div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
    <div style="margin-bottom:10px;">
      <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">نوع الوصلة / موقع الحديد:</label>
      <select id="lap-type" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
        <option value="40">حديد ضغط — Compression Zone (40d)</option>
        <option value="50">حديد شد منطقة طبيعية — Tension (50d)</option>
        <option value="60">حديد شد منطقة حرجة (60d)</option>
        <option value="65">بيئة عدوانية — Aggressive (65d)</option>
      </select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">قطر الحديد d (mm):</label>
        <input type="number" id="lap-dia" placeholder="e.g. 16" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الطول الفعلي (mm):</label>
        <input type="number" id="lap-actual" placeholder="e.g. 800" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div style="display:flex;align-items:flex-end;">
        <button onclick="calcLapLength()" style="width:100%;padding:9px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚡ احسب</button>
      </div>
    </div>
  </div>
  <div class="calc-result" id="lap-result"></div>
  <div style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px;">
    <div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:6px;">📋 جدول الوصلات الشائعة (BS 8666 + QCS S5)</div>
    <table class="dm-table"><thead><tr><th>القطر</th><th>40d</th><th>50d</th><th>60d</th></tr></thead><tbody>
      <tr><td>T10</td><td>400mm</td><td>500mm</td><td>600mm</td></tr>
      <tr><td>T12</td><td>480mm</td><td>600mm</td><td>720mm</td></tr>
      <tr><td>T16</td><td>640mm</td><td>800mm</td><td>960mm</td></tr>
      <tr><td>T20</td><td>800mm</td><td>1000mm</td><td>1200mm</td></tr>
      <tr><td>T25</td><td>1000mm</td><td>1250mm</td><td>1500mm</td></tr>
      <tr><td>T32</td><td>1280mm</td><td>1600mm</td><td>1920mm</td></tr>
    </tbody></table>
  </div>
</div>
`},

// ===== PHASE 3: CALCULATOR 2 — Road Layers =====
road_layers_calc: {
title: '🛣️ حاسبة طبقات الطريق — كميات وأحجام',
content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 S6 + S8 | أبعاد الطريق → حجم (m³) وكتلة (طن) لكل طبقة
</div>
<p style="font-size:11px;color:var(--text3);margin-bottom:10px;">أدخل أبعاد الطريق وسماكات الطبقات (mm) → الحاسبة تحسب الكميات الكاملة</p>

<!-- DIMENSIONS -->
<div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px;">📐 أبعاد الطريق</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">الطول L (m):</label>
      <input type="number" id="rl-length" placeholder="e.g. 500" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
    </div>
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">العرض W (m):</label>
      <input type="number" id="rl-width" placeholder="e.g. 7.3" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
    </div>
  </div>
</div>

<!-- LAYER THICKNESSES -->
<div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
  <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:8px;">📏 سماكات الطبقات (mm) — اترك فارغاً إذا لا توجد</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">Subgrade (mm):</label>
      <input type="number" id="rl-subgrade" placeholder="e.g. 200" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
    </div>
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">Sub-base (mm):</label>
      <input type="number" id="rl-subbase" placeholder="e.g. 250" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
    </div>
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">Base Course (mm):</label>
      <input type="number" id="rl-base" placeholder="e.g. 150" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
    </div>
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">Binder Course (mm):</label>
      <input type="number" id="rl-binder" placeholder="e.g. 60" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
    </div>
    <div>
      <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">Wearing Course (mm):</label>
      <input type="number" id="rl-wearing" placeholder="e.g. 40" oninput="calcRoadLayers()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
    </div>
    <div style="display:flex;align-items:flex-end;">
      <button onclick="calcRoadLayers()" style="width:100%;padding:9px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚡ احسب الكميات</button>
    </div>
  </div>
</div>

<div class="calc-result" id="rl-result"></div>

<div style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px;">
  <div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:6px;">📋 السماكات القياسية — Ashghal RDM 2023</div>
  <table class="dm-table"><thead><tr><th>نوع الطريق</th><th>Wearing</th><th>Binder</th><th>Base</th><th>Sub-base</th></tr></thead><tbody>
    <tr><td>محلي (Local)</td><td>40mm</td><td>—</td><td>100mm</td><td>200mm</td></tr>
    <tr><td>جامع (Collector)</td><td>40mm</td><td>60mm</td><td>150mm</td><td>250mm</td></tr>
    <tr><td>شرياني (Arterial)</td><td>45mm</td><td>70mm</td><td>175mm</td><td>300mm</td></tr>
    <tr><td>سريع (Expressway)</td><td>50mm</td><td>80mm</td><td>200mm</td><td>350mm</td></tr>
  </tbody></table>
</div>
`},

// ===== PHASE 3: CALCULATOR 3 — Soil Grading + SPT + Blockwork =====
soil_grading_calc: {
title: '🔬 حاسبة التربة والبلوك — SPT + Grading + Blockwork',
content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 S5 + S6 | 3 حاسبات في مكان واحد
</div>

<!-- TAB SWITCHER -->
<div style="display:flex;gap:0;margin-bottom:14px;border-radius:10px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);">
  <button id="soil-tab-spt" onclick="
    ['soil-panel-spt','soil-panel-gp','soil-panel-bw'].forEach(function(id){document.getElementById(id).style.display='none';});
    document.getElementById('soil-panel-spt').style.display='block';
    ['soil-tab-spt','soil-tab-gp','soil-tab-bw'].forEach(function(id){document.getElementById(id).style.background='var(--dark4)';document.getElementById(id).style.color='var(--text2)';});
    this.style.background='rgba(201,168,76,0.2)'; this.style.color='var(--gold)';"
    style="flex:1;padding:9px;border:none;background:rgba(201,168,76,0.2);color:var(--gold);font-weight:700;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">
    🔬 SPT<br><span style="font-size:10px;font-weight:400">N-Value</span>
  </button>
  <button id="soil-tab-gp" onclick="
    ['soil-panel-spt','soil-panel-gp','soil-panel-bw'].forEach(function(id){document.getElementById(id).style.display='none';});
    document.getElementById('soil-panel-gp').style.display='block';
    ['soil-tab-spt','soil-tab-gp','soil-tab-bw'].forEach(function(id){document.getElementById(id).style.background='var(--dark4)';document.getElementById(id).style.color='var(--text2)';});
    this.style.background='rgba(201,168,76,0.2)'; this.style.color='var(--gold)';"
    style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">
    📊 تصنيف التربة<br><span style="font-size:10px">PI / LL / Grading</span>
  </button>
  <button id="soil-tab-bw" onclick="
    ['soil-panel-spt','soil-panel-gp','soil-panel-bw'].forEach(function(id){document.getElementById(id).style.display='none';});
    document.getElementById('soil-panel-bw').style.display='block';
    ['soil-tab-spt','soil-tab-gp','soil-tab-bw'].forEach(function(id){document.getElementById(id).style.background='var(--dark4)';document.getElementById(id).style.color='var(--text2)';});
    this.style.background='rgba(201,168,76,0.2)'; this.style.color='var(--gold)';"
    style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">
    🧱 كميات البلوك<br><span style="font-size:10px">Blockwork</span>
  </button>
</div>

<!-- PANEL 1: SPT -->
<div id="soil-panel-spt">
  <p style="font-size:11px;color:var(--text3);margin-bottom:10px;">أدخل N-Value من اختبار SPT → الحاسبة تحدد تصنيف التربة وصلاحيتها</p>
  <div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">نوع التربة / Soil Type:</label>
        <select id="spt-type" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
          <option value="sand">رملية / Sandy</option>
          <option value="clay">طينية / Clay</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">N-Value (عدد الضربات):</label>
        <input type="number" id="spt-val" placeholder="e.g. 25" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
    </div>
    <button onclick="calcSPT()" style="width:100%;margin-top:8px;padding:9px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚡ تصنيف التربة</button>
  </div>
  <div class="calc-result" id="spt-result"></div>
  <div style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px;">
    <div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:6px;">📋 تصنيف SPT (BS EN ISO 22476)</div>
    <table class="dm-table"><thead><tr><th>N-Value</th><th>رمل</th><th>طين</th></tr></thead><tbody>
      <tr><td>&lt; 4</td><td>Loose جداً ⛔</td><td>Soft جداً ⛔</td></tr>
      <tr><td>4–10</td><td>Loose ⚠️</td><td>Soft ⚠️</td></tr>
      <tr><td>10–30</td><td>Medium Dense ✅</td><td>Stiff ✅</td></tr>
      <tr><td>30–50</td><td>Dense ✅</td><td>Very Stiff ✅</td></tr>
      <tr><td>&gt; 50</td><td>Very Dense ✅✅</td><td>Hard ✅✅</td></tr>
    </tbody></table>
  </div>
</div>

<!-- PANEL 2: Grading / PI Check -->
<div id="soil-panel-gp" style="display:none;">
  <p style="font-size:11px;color:var(--text3);margin-bottom:10px;">فحص مؤشر اللدونة والتدرج مقابل حدود QCS 2024 لطبقات الطريق</p>
  <div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
    <div style="margin-bottom:10px;">
      <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">الطبقة / Layer:</label>
      <select id="gp-layer" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
        <option value="subgrade">Subgrade</option>
        <option value="subbase">Sub-base (GSB)</option>
        <option value="base">Road Base Course</option>
      </select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
      <div>
        <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">PI (Plasticity Index):</label>
        <input type="number" id="gp-pi" placeholder="e.g. 8" step="0.1" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
      </div>
      <div>
        <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">LL (Liquid Limit %):</label>
        <input type="number" id="gp-ll" placeholder="e.g. 22" step="0.1" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
      </div>
      <div>
        <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">% Passing #200:</label>
        <input type="number" id="gp-p200" placeholder="e.g. 10" step="0.1" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
      </div>
      <div>
        <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">% Passing #4 (اختياري):</label>
        <input type="number" id="gp-p4" placeholder="e.g. 55" step="0.1" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
      </div>
      <div>
        <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px;">% Passing #075 (اختياري):</label>
        <input type="number" id="gp-p075" placeholder="e.g. 8" step="0.1" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
      </div>
      <div style="display:flex;align-items:flex-end;">
        <button onclick="calcGP()" style="width:100%;padding:8px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">⚡ فحص</button>
      </div>
    </div>
  </div>
  <div class="calc-result" id="gp-result"></div>
  <div style="background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px;">
    <div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:6px;">📋 الحدود القصوى (QCS 2024 S6)</div>
    <table class="dm-table"><thead><tr><th>الطبقة</th><th>PI Max</th><th>LL Max</th><th>%200 Max</th></tr></thead><tbody>
      <tr><td>Subgrade</td><td>10</td><td>35%</td><td>35%</td></tr>
      <tr><td>Sub-base</td><td>6</td><td>25%</td><td>12%</td></tr>
      <tr><td>Road Base</td><td>4</td><td>20%</td><td>8%</td></tr>
    </tbody></table>
  </div>
</div>

<!-- PANEL 3: Blockwork -->
<div id="soil-panel-bw" style="display:none;">
  <p style="font-size:11px;color:var(--text3);margin-bottom:10px;">احسب كميات البلوك والمونة والرمل لأي مساحة جدار — QCS S5 Masonry</p>
  <div style="background:var(--dark4);border-radius:10px;padding:12px;margin-bottom:10px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">مساحة الجدار الإجمالية (m²):</label>
        <input type="number" id="bw-area" placeholder="e.g. 50" oninput="calcBlockwork()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">سماكة البلوك:</label>
        <select id="bw-type" onchange="calcBlockwork()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:12px;">
          <option value="100">100mm (Partition)</option>
          <option value="150">150mm (Internal)</option>
          <option value="200" selected>200mm (External)</option>
          <option value="250">250mm (Load Bearing)</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text2);display:block;margin-bottom:4px;">مساحة الفتحات (أبواب + نوافذ) m²:</label>
        <input type="number" id="bw-openings" placeholder="e.g. 5" oninput="calcBlockwork()" style="width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--dark3);color:var(--text);font-family:Tajawal,sans-serif;font-size:13px;">
      </div>
      <div style="display:flex;align-items:flex-end;">
        <button onclick="calcBlockwork()" style="width:100%;padding:9px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚡ احسب الكميات</button>
      </div>
    </div>
  </div>
  <div class="calc-result" id="bw-result"></div>
  <div style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;margin-top:8px;font-size:11px;color:var(--text3);">
    ℹ️ يُضاف 5% هدر للكسر والقص | المونة: نسبة 1:4 (أسمنت:رمل) | البلوك: 390×190×سماكة mm
  </div>
</div>
`},

// ===== QCS 2014 vs 2024 CHANGES =====
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



// ===== NEW SECTION: ASHGHAL FORMS =====
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
  <textarea id="ncr-root" style="width:100%;min-height:55px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="1. Roller passes insufficient (4 بدلاً من 8)&#10;2. درجة حرارة الفرش منخفضة: DBM < 140°C / WC < 145°C (QCS 2024 S8)&#10;3. مدة التسليم > 90 دقيقة"></textarea>
</div>
<div style="background:rgba(46,204,113,.06);border:1px solid rgba(46,204,113,.2);border-radius:10px;padding:12px;margin-bottom:10px">
  <div style="font-size:11px;color:#2ecc71;font-weight:700;margin-bottom:6px">🔧 CAPA — Corrective & Preventive Actions</div>
  <div style="margin-bottom:8px"><label style="font-size:10px;color:var(--text3)">الإجراء التصحيحي المقترح <span style="color:#e74c3c">*</span></label><textarea id="ncr-corrective" style="width:100%;min-height:50px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="Mill and re-lay 50m مقطع مرفوض&#10;إعادة اختبار Core ≥97% TMD&#10;إعادة فتح RFI بعد التصحيح"></textarea></div>
  <div><label style="font-size:10px;color:var(--text3)">الإجراء الوقائي</label><textarea id="ncr-preventive" style="width:100%;min-height:45px;background:var(--dark4);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-family:Tajawal;font-size:12px;resize:vertical" placeholder="قياس درجة الحرارة عند كل شاحنة — رفض DBM <140°C / WC <145°C (QCS 2024 S8)&#10;الحد الأدنى 8 مرورات للرولر"></textarea></div>
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

// ===== TOP 20 NCR IN QATAR =====
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
<tr><td>20</td><td><strong>Delivery temp — DBM &lt;140°C / WC &lt;145°C</strong></td><td>مسافة نقل طويلة</td><td>رفض الحمل + Plant أقرب</td><td>QCS 2024 S8 + S6 P5</td></tr>
</tbody></table>
`},

// ===== CONCRETE GRADE QUICK REFERENCE =====
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
<tr><td>بلاطات داخلية</td><td>XC1</td><td><strong>C30</strong></td><td>OPC</td><td>0.55</td><td>20mm</td><td>7 أيام</td></tr>
<tr><td>بلاطات خارجية</td><td>XC3/XD1</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>35mm</td><td>14 يوم</td></tr>
<tr><td>خوازيق Bored</td><td>XC2/XA3</td><td><strong>C40</strong></td><td>SRPC</td><td>0.40</td><td>75mm</td><td>—</td></tr>
<tr><td>خوازيق Driven</td><td>XC2/XA2</td><td><strong>C40</strong></td><td>SRPC</td><td>0.40</td><td>50mm</td><td>—</td></tr>
<tr><td>Pile Caps</td><td>XC2/XA2</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>75mm</td><td>14 يوم</td></tr>
<tr><td>Manhole Base</td><td>XA3</td><td><strong>C35</strong></td><td>SRPC</td><td>0.45</td><td>50mm</td><td>14 يوم</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:8px;margin-top:10px;font-size:11px;color:#e74c3c">
⚠️ <strong>قاعدة قطر:</strong> أي عنصر ملامس للتربة في قطر = SRPC إلزامي (SO₃ عادةً > 0.5%). لا تستخدم OPC تحت الأرض أبداً.
</div>
`},

// ===== ASPHALT LAYER QUICK REFERENCE =====
asphalt_quick_ref: {
title: '🛣️ مرجع سريع — طبقات الإسفلت حسب نوع الطريق',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 6 Part 3 Table 3:1</div>
<table class="dm-table"><thead><tr><th>الطريق</th><th>Traffic</th><th>WC</th><th>BC</th><th>Base</th><th>Subbase</th><th>Bitumen</th><th>IRI</th></tr></thead><tbody>
<tr><td>محلي — Local</td><td>T1-T2</td><td>50mm</td><td>—/60mm</td><td>150mm</td><td>150-200mm</td><td>60/70</td><td>≤2.5</td></tr>
<tr><td>تجميعي — Collector</td><td>T3</td><td>50mm</td><td>70mm</td><td>200mm</td><td>200mm</td><td>60/70 أو PMB</td><td>≤2.5</td></tr>
<tr><td>شرياني — Arterial</td><td>T4-T5</td><td>50mm</td><td>80-140mm</td><td>200mm</td><td>250-300mm</td><td>PMB إلزامي</td><td>≤0.9 PMB</td></tr>
<tr><td>سريع — Expressway</td><td>T5-T6</td><td>50mm</td><td>140-160mm</td><td>250mm</td><td>300-350mm</td><td>PMB إلزامي</td><td>≤0.9 PMB</td></tr>
</tbody></table>
<h3>متطلبات كل طبقة</h3>
<table class="dm-table"><thead><tr><th>الطبقة</th><th>Compaction</th><th>CBR</th><th>Level Tol.</th><th>Marshall</th><th>Core Density</th></tr></thead><tbody>
<tr><td>Subgrade</td><td>≥95% MDD</td><td>≥8%</td><td>±10mm</td><td>—</td><td>—</td></tr>
<tr><td>Subbase</td><td>≥98% MDD</td><td>≥30%</td><td>±10mm</td><td>—</td><td>—</td></tr>
<tr><td>Road Base</td><td>≥98% MDD</td><td>≥80%</td><td>±8mm</td><td>—</td><td>—</td></tr>
<tr><td>Binder Course</td><td>—</td><td>—</td><td>±8mm</td><td>≥8.0 kN</td><td>≥97% TMD</td></tr>
<tr><td>Wearing Course</td><td>—</td><td>—</td><td>±6mm</td><td>≥8.0 kN</td><td>≥97% TMD</td></tr>
</tbody></table>
`},

// ===== PIPE SELECTION QUICK REFERENCE =====
pipe_quick_ref: {
title: '🔧 مرجع سريع — اختيار المواسير',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA + Ashghal Standards</div>
<table class="dm-table"><thead><tr><th>الشبكة</th><th>المادة</th><th>القطر</th><th>Class/PN</th><th>Velocity</th><th>KAHRAMAA</th></tr></thead><tbody>
<tr style="background:rgba(241,196,15,.06)"><td colspan="6" style="color:var(--gold);font-weight:700">💧 مياه الشرب — Potable Water</td></tr>
<tr><td>توزيع</td><td>HDPE PE100</td><td>63-315mm</td><td>PN16 SDR11</td><td>0.3-3.0 m/s</td><td>✅ معتمد</td></tr>
<tr><td>نقل رئيسي</td><td>DI (Ductile Iron)</td><td>300-2000mm</td><td>K9/K12</td><td>0.5-2.5 m/s</td><td>✅ معتمد</td></tr>
<tr><td>توصيلات</td><td>HDPE PE100</td><td>25-63mm</td><td>PN16 SDR11</td><td>0.3-2.0 m/s</td><td>✅ معتمد</td></tr>
<tr style="background:rgba(46,204,113,.06)"><td colspan="6" style="color:#2ecc71;font-weight:700">🚽 صرف صحي — Foul Sewer</td></tr>
<tr><td>فروع</td><td>uPVC SN8</td><td>160-315mm</td><td>SN8</td><td>0.6-3.0 m/s</td><td>—</td></tr>
<tr><td>رئيسي</td><td>GRP</td><td>300-2400mm</td><td>SN5000+</td><td>0.6-3.0 m/s</td><td>—</td></tr>
<tr><td>عمق كبير</td><td>RC Pipe</td><td>300-3000mm</td><td>Class 120+</td><td>0.6-3.0 m/s</td><td>—</td></tr>
<tr style="background:rgba(149,165,166,.06)"><td colspan="6" style="color:#95a5a6;font-weight:700">🌧️ صرف سطحي — Storm Water</td></tr>
<tr><td>فروع</td><td>uPVC SN8</td><td>200-630mm</td><td>SN8</td><td>0.6-4.5 m/s</td><td>—</td></tr>
<tr><td>رئيسي</td><td>GRP/RC</td><td>600-3000mm</td><td>SN10000/Class 180</td><td>0.6-4.5 m/s</td><td>—</td></tr>
<tr style="background:rgba(142,68,173,.06)"><td colspan="6" style="color:#8e44ad;font-weight:700">♻️ مياه معالجة — TSE/Treated</td></tr>
<tr><td>الكل</td><td>uPVC/HDPE بنفسجي</td><td>63-630mm</td><td>PN10/16</td><td>0.3-3.0 m/s</td><td>—</td></tr>
</tbody></table>
`},

// ===== PRE-QUALIFICATION CHECKLIST =====
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

// ===== MMUP ROAD DESIGN MANUAL =====
mmup_road_design: {
title: '📐 MMUP Road Design Manual — معايير التصميم الرسمية',
content: `
<div class="qcs-ref-badge">MMUP — Ministry of Municipality Road Design Manual</div>
<h3>المقاطع العرضية النموذجية — Typical Cross Sections</h3>
<table class="dm-table"><thead><tr><th>التصنيف</th><th>عرض Carriageway</th><th>الحارات</th><th>Median</th><th>Footpath</th><th>Service Road</th></tr></thead><tbody>
<tr><td>Local Road</td><td>6.5m (2×3.25)</td><td>2</td><td>—</td><td>2.0m</td><td>—</td></tr>
<tr><td>Collector Road</td><td>7.5m (2×3.75)</td><td>2</td><td>—</td><td>2.5m</td><td>—</td></tr>
<tr><td>Minor Arterial</td><td>7.0m × 2 (dual)</td><td>2+2</td><td>4.0m</td><td>3.0m</td><td>Optional</td></tr>
<tr><td>Major Arterial</td><td>10.5m × 2 (dual)</td><td>3+3</td><td>6.0m</td><td>3.0m</td><td>7.0m</td></tr>
<tr><td>Expressway</td><td>11.0m × 2 (dual)</td><td>3+3</td><td>8.0-15.0m</td><td>—</td><td>7.5m</td></tr>
</tbody></table>
<h3>عروض الحارات — Lane Widths</h3>
<table class="dm-table"><thead><tr><th>العنصر</th><th>القياس</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td>Through Lane — عادي</td><td>3.65m</td><td>Standard</td></tr>
<tr><td>Through Lane — expressway</td><td>3.75m</td><td>High speed</td></tr>
<tr><td>Bus Lane</td><td>3.50m</td><td>Minimum</td></tr>
<tr><td>Cycle Track</td><td>2.0m (one-way) / 3.0m (two-way)</td><td>MMUP Active Transport</td></tr>
<tr><td>Footpath — Local</td><td>2.0m</td><td>Min clear width</td></tr>
<tr><td>Footpath — Arterial</td><td>3.0m</td><td>ADA compliant</td></tr>
<tr><td>Shoulder — Expressway</td><td>3.0m (outer) / 1.5m (inner)</td><td>Hard shoulder</td></tr>
</tbody></table>
<h3>Kerb Standards — حواف الأرصفة</h3>
<table class="dm-table"><thead><tr><th>النوع</th><th>الارتفاع</th><th>التطبيق</th></tr></thead><tbody>
<tr><td>Barrier Kerb</td><td>150mm above road</td><td>Median, outer edge arterial</td></tr>
<tr><td>Mountable Kerb</td><td>100mm</td><td>Residential, access points</td></tr>
<tr><td>Flush Kerb</td><td>0mm (level)</td><td>Pedestrian crossings, ADA ramps</td></tr>
<tr><td>Drop Kerb</td><td>25mm max lip</td><td>Every crossing point</td></tr>
</tbody></table>
`},

// ===== ASHGHAL STANDARD DETAILS =====
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

// ===== KAHRAMAA TECHNICAL STANDARDS =====
kahramaa_standards: {
title: '⚡ KAHRAMAA Technical Standards — المعايير الفنية',
content: `
<div class="qcs-ref-badge">KAHRAMAA — Qatar General Electricity & Water Corporation</div>
<h3>المواد المعتمدة — Approved Materials Categories</h3>
<table class="dm-table"><thead><tr><th>الفئة</th><th>المواد</th><th>المعيار</th><th>الاعتماد</th></tr></thead><tbody>
<tr><td>Pipes — Distribution</td><td>HDPE PE100 Blue</td><td>ISO 4427 / BS EN 12201</td><td>KAHRAMAA Approved List</td></tr>
<tr><td>Pipes — Transmission</td><td>DI (Ductile Iron)</td><td>BS EN 545</td><td>KAHRAMAA Approved List</td></tr>
<tr><td>Fittings</td><td>DI / PE Electrofusion</td><td>ISO 8085 / BS EN 12201</td><td>Factory tested + cert</td></tr>
<tr><td>Valves — Gate</td><td>DI Resilient Seated</td><td>BS EN 1074 / BS 5163</td><td>Type Tested</td></tr>
<tr><td>Valves — Butterfly</td><td>DI Body + Disc</td><td>BS EN 593</td><td>Type Tested</td></tr>
<tr><td>Fire Hydrant</td><td>DI BS Pattern</td><td>BS 750</td><td>KAHRAMAA spec</td></tr>
<tr><td>Meters</td><td>Multi-jet / Ultrasonic</td><td>ISO 4064</td><td>KAHRAMAA approved</td></tr>
</tbody></table>
<h3>Connection Standards — معايير التوصيل</h3>
<table class="dm-table"><thead><tr><th>النوع</th><th>القطر</th><th>Meter Size</th><th>Chamber</th></tr></thead><tbody>
<tr><td>Villa — فيلا</td><td>25-32mm PE</td><td>25mm</td><td>Ground level box</td></tr>
<tr><td>Building — مبنى</td><td>50-100mm PE/DI</td><td>50-100mm</td><td>Concrete chamber</td></tr>
<tr><td>Commercial — تجاري</td><td>100-200mm DI</td><td>100-150mm</td><td>Concrete chamber + BFV</td></tr>
<tr><td>Industrial — صناعي</td><td>Per design</td><td>Per design</td><td>Per KAHRAMAA approval</td></tr>
</tbody></table>
<h3>Pressure Zones — مفهوم مناطق الضغط</h3>
<table class="dm-table"><thead><tr><th>Zone</th><th>Ground Level</th><th>Static Pressure</th><th>Min Residual</th></tr></thead><tbody>
<tr><td>Low Zone</td><td>0-15m ASL</td><td>3-6 bar</td><td>1.5 bar</td></tr>
<tr><td>Medium Zone</td><td>15-40m ASL</td><td>4-7 bar</td><td>2.0 bar</td></tr>
<tr><td>High Zone</td><td>>40m ASL</td><td>Boosted 5-8 bar</td><td>2.0 bar</td></tr>
</tbody></table>
`},

// ===== HOT WEATHER CONCRETING DETAILED =====
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

// ===== SABKHA CLASSIFICATION DETAILED =====
sabkha_classification: {
title: '🏜️ تصنيف ومعالجة السبخة — IAN-006 الكامل',
content: `
<div class="qcs-ref-badge">Ashghal IAN-006 + QCS 2024 S6 P3 S2.5</div>
<h3>تصنيف السبخة — Sabkha Classification</h3>
<table class="dm-table"><thead><tr><th>النوع</th><th>SO₃%</th><th>Cl%</th><th>CBR</th><th>الوصف</th><th>الخطورة</th></tr></thead><tbody>
<tr><td><strong>Type 1</strong></td><td>0.5-1.0%</td><td><1.0%</td><td>5-8%</td><td>سبخة خفيفة — ملوحة معتدلة</td><td style="color:#f39c12">متوسطة</td></tr>
<tr><td><strong>Type 2</strong></td><td>1.0-2.0%</td><td>1.0-2.0%</td><td>3-5%</td><td>سبخة متوسطة — ملوحة عالية</td><td style="color:#e74c3c">عالية</td></tr>
<tr><td><strong>Type 3</strong></td><td>2.0-5.0%</td><td>>2.0%</td><td>1-3%</td><td>سبخة شديدة — أرض رخوة</td><td style="color:#e74c3c">عالية جداً</td></tr>
<tr><td><strong>Type 4</strong></td><td>>5.0%</td><td>>3.0%</td><td><1%</td><td>سبخة قاسية — استبدال كامل</td><td style="color:#e74c3c;font-weight:700">حرج</td></tr>
</tbody></table>
<h3>طريقة المعالجة لكل نوع</h3>
<table class="dm-table"><thead><tr><th>النوع</th><th>المعالجة</th><th>العمق</th><th>الاختبارات</th><th>المراقبة</th></tr></thead><tbody>
<tr><td>Type 1</td><td>Lime Stabilization 3-5%<br>+ Compaction ≥95%</td><td>300mm min</td><td>UCS ≥0.5MPa @28d<br>CBR ≥8% بعد المعالجة</td><td>3 أشهر settlement</td></tr>
<tr><td>Type 2</td><td>استبدال جزئي + Geotextile<br>+ Select Fill</td><td>حتى CBR ≥8%</td><td>Field Density + CBR<br>SO₃ في Fill <0.4%</td><td>6 أشهر settlement</td></tr>
<tr><td>Type 3</td><td>استبدال كامل<br>+ Geotextile + Select Fill</td><td>كامل عمق Sabkha</td><td>Plate Load K ≥30<br>CBR ≥8% post-fill</td><td>12 شهر settlement</td></tr>
<tr><td>Type 4</td><td>استبدال كامل + Dewatering<br>+ Surcharge Loading</td><td>كامل + 500mm إضافي</td><td>All above + Piezometers<br>+ Inclinometers</td><td>18 شهر + specialist</td></tr>
</tbody></table>
`},

// ===== NCR QUICK LOGGER =====
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

// ===== آلية تنفيذ: صب الخرسانة =====
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
<tr><td>7-day Cube</td><td>BS EN 12390-3</td><td>≥70% fcu <span style="color:#e67e22;font-size:10px">(مراقبة فقط — QCS S5)</span></td><td>3 cubes</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>28-day Cube</td><td>BS EN 12390-3</td><td>≥100% fcu (avg 3) <span style="font-size:10px">(معيار القبول الرسمي)</span></td><td>3 cubes</td><td style="color:#e74c3c">HP</td></tr>
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

// ===== آلية تنفيذ: مد مواسير المياه =====
exec_water_pipe: {
title: '💧 آلية تنفيذ — مد مواسير المياه | Water Pipe Laying',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA Standards + BS EN 805</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
<button onclick="showExecStep('wp',1)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">① التحضير</button>
<button onclick="showExecStep('wp',2)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">② التنفيذ</button>
<button onclick="showExecStep('wp',3)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">③ مراقبة الجودة</button>
<button onclick="showExecStep('wp',4)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">④ الأخطاء الشائعة</button>
</div>

<div id="wp-step-1">
<h3 style="color:var(--gold2)">① التحضير</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>NOC</td><td>Ashghal حفر permit + KAHRAMAA connection approval</td><td>Ashghal ROW</td></tr>
<tr><td>GPR Scan</td><td>كشف المرافق القائمة — تقرير مُعتمد</td><td>Ashghal Safety</td></tr>
<tr><td>المواسير</td><td>HDPE PE100 Blue SDR11 PN16 — KAHRAMAA approved</td><td>ISO 4427</td></tr>
<tr><td>Fittings</td><td>Electrofusion — certified + calibrated machine</td><td>BS EN 12201</td></tr>
<tr><td>Shoring</td><td>Design مُعتمد إذا عمق >1.2m</td><td>QCS P1 S8.4</td></tr>
<tr><td>PPE</td><td>خوذة + سترة + حذاء + قفازات — 100%</td><td>QHSE</td></tr>
</tbody></table>
</div>

<div id="wp-step-2" style="display:none">
<h3 style="color:var(--gold2)">② تسلسل التنفيذ</h3>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">1</div><div style="font-size:12px"><strong>Survey + Setting Out</strong> — Total Station | Invert levels كل 25m | CH markers<br><span style="color:#e74c3c">HP: SC يعتمد المناسيب</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">2</div><div style="font-size:12px"><strong>الحفر</strong> — عرض DN+600mm | عمق ≥900mm تحت الطريق | Shoring >1.2m<br>Dewatering إذا GWT < 0.5m تحت القاع — <span style="color:var(--gold)">QCS S8</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">3</div><div style="font-size:12px"><strong>Bedding</strong> — 150mm clean sand/Type 1 | دمك ≥90% | Level ±10mm<br><span style="color:#f39c12">WP: تحقق من المادة والسماكة</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">4</div><div style="font-size:12px"><strong>Pipe Laying + Jointing</strong> — Electrofusion per ISO 12176 | Cool time per table<br>Thrust blocks C20 عند تغيير الاتجاه >11.25° — <span style="color:#e74c3c">HP: كل وصلة</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">5</div><div style="font-size:12px"><strong>Pressure Test</strong> — 1.5 × PN لمدة 2 ساعة | Drop ≤ 0.1 bar<br><span style="color:#e74c3c">HP: لا ردم بدون اعتماد — QCS S8 + KAHRAMAA</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">6</div><div style="font-size:12px"><strong>Chlorination + Flushing</strong> — 50 ppm لمدة 24 ساعة → Flushing → Bacteriological test<br><span style="color:#e74c3c">HP: لا تشغيل بدون نتيجة سلبية — KAHRAMAA</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">7</div><div style="font-size:12px"><strong>Backfill</strong> — Initial: 200mm above crown حذر | Main: layers ≤200mm ≥95% MDD<br>Marker Tape أصفر 300mm فوق الماسورة — <span style="color:var(--gold)">QCS S8</span></div></div>
</div>
</div>

<div id="wp-step-3" style="display:none">
<h3 style="color:var(--gold2)">③ مراقبة الجودة</h3>
<table class="dm-table"><thead><tr><th>الاختبار</th><th>المعيار</th><th>القبول</th><th>التكرار</th><th>HP</th></tr></thead><tbody>
<tr><td>Pressure Test</td><td>BS EN 805</td><td>1.5×PN | 2hr | drop ≤0.1bar</td><td>Per section ≤500m</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Chlorination</td><td>KAHRAMAA</td><td>≥50 ppm / 24hr</td><td>Per section</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Bacteriological</td><td>WHO</td><td>0 Coliform/100ml</td><td>Per section</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Backfill Density</td><td>ASTM D1556</td><td>≥95% MDD</td><td>1/50m</td><td style="color:#f39c12">W</td></tr>
<tr><td>Joint Inspection</td><td>ISO 12176</td><td>Visual + bead check</td><td>100%</td><td style="color:#e74c3c">HP</td></tr>
</tbody></table>
</div>

<div id="wp-step-4" style="display:none">
<h3 style="color:var(--gold2)">④ أخطاء شائعة</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>التجنب</th><th>التصحيح</th></tr></thead><tbody>
<tr><td style="color:#e74c3c">Pipe exposed to sun >24hr</td><td>تغطية فورية بعد التوريد</td><td>فحص UV damage + اختبار</td></tr>
<tr><td style="color:#e74c3c">Contaminated interior</td><td>أغطية نهايات إلزامية</td><td>Flushing مكثف + re-chlorination</td></tr>
<tr><td style="color:#e74c3c">Wrong marker tape color</td><td>أصفر فقط لمياه الشرب</td><td>إعادة ردم + اللون الصحيح</td></tr>
<tr><td style="color:#f39c12">Fusion in rain/wind</td><td>Shelter إلزامي أثناء اللحام</td><td>قطع الوصلة + إعادة</td></tr>
<tr><td style="color:#f39c12">No Thrust Block</td><td>كل bend >11.25° يحتاج</td><td>حفر + صب C20 + انتظار 7 أيام</td></tr>
</tbody></table>
</div>
`},

// ===== آلية تنفيذ: فرد الإسفلت =====
exec_asphalt_paving: {
title: '🛣️ آلية تنفيذ — فرد الإسفلت | Asphalt Paving',
content: `
<div class="qcs-ref-badge">QCS 2024 S6 P5 + Ashghal PWA IAN-013</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
<button onclick="showExecStep('ap',1)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">① التحضير</button>
<button onclick="showExecStep('ap',2)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">② التنفيذ</button>
<button onclick="showExecStep('ap',3)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">③ مراقبة الجودة</button>
<button onclick="showExecStep('ap',4)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">④ الأخطاء الشائعة</button>
</div>

<div id="ap-step-1">
<h3 style="color:var(--gold2)">① التحضير</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>JMF</td><td>Marshall Mix Design معتمد — Stability + VMA + VFB</td><td>QCS S6 P5 S3</td></tr>
<tr><td>Trial Section</td><td>200m min — كل المعدات والطاقم الفعلي</td><td>QCS S6 P5 S4.1</td></tr>
<tr><td>الطبقة السابقة</td><td>ITP مُغلق — Level ±10mm — Surface clean + dry</td><td>QCS S6 P5 S4.2</td></tr>
<tr><td>Tack Coat</td><td>0.15-0.35 L/m² residual — broken before paving</td><td>QCS S6 P5 p31</td></tr>
<tr><td>المعدات</td><td>Paver (Sonic Beam) + DD Roller 10-12T + PTR 25T</td><td>QCS S6 P5 S4.3</td></tr>
<tr><td>TMP</td><td>Lane closures + signs + flagman active</td><td>Ashghal TMP</td></tr>
</tbody></table>
</div>

<div id="ap-step-2" style="display:none">
<h3 style="color:var(--gold2)">② تسلسل التنفيذ</h3>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">1</div><div style="font-size:12px"><strong>فحص Tack Coat</strong> — مُطبَّق ومكسور (Broken) — لا فرش على Tack wet<br><span style="color:#f39c12">WP — QCS S6 P5</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">2</div><div style="font-size:12px"><strong>استلام الحمل + Temp Check</strong><br>Non-PMB: Delivery ≥130°C | PMB: ≥145°C — أقل = رفض<br><span style="color:#e74c3c">HP — QCS S6 P5 S4.4</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">3</div><div style="font-size:12px"><strong>Paving</strong> — Paver speed 3-5 m/min | Screed temp ≥100°C | Sonic Beam levelling<br>سماكة مبدئية = Design + 15-20% (compaction allowance)</div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">4</div><div style="font-size:12px"><strong>Rolling</strong><br>Breakdown: DD 10-12T @ ≥120°C (Non-PMB) | ≥125°C (PMB) — min 4 passes<br>Intermediate: PTR 25T — 4 passes<br>Finish: DD static @ ≥60°C — 2 passes — <span style="color:var(--gold)">QCS S6 P5 S5.2</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">5</div><div style="font-size:12px"><strong>Joints</strong><br>Longitudinal: straight edge + sealant | Transverse: hot iron + compacted<br>Joint offset ≥150mm من الطبقة تحت — <span style="color:var(--gold)">QCS S6 P5 S5.4</span></div></div>
</div>
</div>

<div id="ap-step-3" style="display:none">
<h3 style="color:var(--gold2)">③ مراقبة الجودة</h3>
<table class="dm-table"><thead><tr><th>الاختبار</th><th>القبول</th><th>التكرار</th><th>HP</th></tr></thead><tbody>
<tr><td>Delivery Temperature</td><td>≥130°C Conv / ≥145°C PMB</td><td>كل شاحنة</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Marshall Stability</td><td>≥8.0 kN (WC Conv) / ≥10 kN (PMB)</td><td>1/200T</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Core Density</td><td>≥97% TMD</td><td>1/1000m²</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Bitumen Content</td><td>JMF ±0.3%</td><td>1/200T</td><td style="color:#f39c12">W</td></tr>
<tr><td>Level (3m Edge)</td><td>±6mm WC / ±8mm BC</td><td>كل 25m</td><td style="color:#f39c12">W</td></tr>
<tr><td>IRI</td><td>≤2.5 Conv / ≤0.9 PMB</td><td>100% length</td><td style="color:#e74c3c">HP</td></tr>
</tbody></table>
</div>

<div id="ap-step-4" style="display:none">
<h3 style="color:var(--gold2)">④ أخطاء شائعة</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>التجنب</th><th>التصحيح</th></tr></thead><tbody>
<tr><td style="color:#e74c3c">Core Density <97%</td><td>Min 8 roller passes | Temp >120°C</td><td>Mill + re-lay</td></tr>
<tr><td style="color:#e74c3c">Delivery temp — DBM &lt;140°C / WC &lt;145°C</td><td>Plant distance ≤30km | covered trucks</td><td>رفض الحمل</td></tr>
<tr><td style="color:#f39c12">Roller marks visible</td><td>Finish rolling @ >60°C static</td><td>Re-heat + re-roll</td></tr>
<tr><td style="color:#f39c12">Segregation</td><td>Remixer in hopper | no dumping direct</td><td>Remove + re-lay</td></tr>
<tr><td style="color:#f39c12">Joint cracking</td><td>Hot iron + overlap ≥50mm | infrared heater</td><td>Seal + monitor</td></tr>
</tbody></table>
</div>
`},

// ===== آلية تنفيذ: اختبار الضغط =====
exec_pressure_test: {
title: '💪 آلية تنفيذ — اختبار الضغط | Pressure Testing',
content: `
<div class="qcs-ref-badge">KAHRAMAA + BS EN 805 + QCS 2024 S8</div>
<h3>① التحضير</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th></tr></thead><tbody>
<tr><td>Section Length</td><td>≤500m per test — all joints exposed</td></tr>
<tr><td>End Caps</td><td>Welded/flanged — rated for test pressure</td></tr>
<tr><td>Thrust Blocks</td><td>Cured ≥7 أيام قبل الاختبار</td></tr>
<tr><td>Equipment</td><td>Calibrated gauge ±0.1 bar + pump + recorder</td></tr>
<tr><td>Fill + Bleed</td><td>Fill slowly from low point — bleed air from high point</td></tr>
<tr><td>Stabilization</td><td>24hr pre-pressurization soak — let pipe absorb</td></tr>
</tbody></table>
<h3>② إجراء الاختبار</h3>
<table class="dm-table"><thead><tr><th>الخطوة</th><th>الإجراء</th><th>المرجع</th></tr></thead><tbody>
<tr><td>1. Pressurize</td><td>رفع الضغط تدريجياً إلى <strong>1.5 × PN</strong></td><td>BS EN 805 Cl.11</td></tr>
<tr><td>2. Hold</td><td>الحفاظ على الضغط <strong>2 ساعات</strong></td><td>KAHRAMAA Spec</td></tr>
<tr><td>3. Monitor</td><td>تسجيل الضغط كل 15 دقيقة</td><td>QCS S8</td></tr>
<tr><td style="color:#2ecc71;font-weight:700">4. Pass Criteria</td><td>Drop ≤ <strong>0.1 bar</strong> في 2 ساعات</td><td>KAHRAMAA</td></tr>
<tr><td style="color:#e74c3c;font-weight:700">5. Fail</td><td>Drop > 0.1 bar → find leak → repair → re-test</td><td>—</td></tr>
</tbody></table>
<h3>③ أخطاء شائعة</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>النتيجة</th><th>التصحيح</th></tr></thead><tbody>
<tr><td>Trapped air</td><td>False fail — pressure drops</td><td>Re-bleed from high points</td></tr>
<tr><td>Thrust block not cured</td><td>Movement → joint leak</td><td>Wait 7 days + re-test</td></tr>
<tr><td>Gauge not calibrated</td><td>Invalid test</td><td>Calibrated gauge + re-test</td></tr>
<tr><td>Test in hot sun</td><td>Thermal expansion = false readings</td><td>Test early morning or shade pipe</td></tr>
</tbody></table>
`},

// ════════════════════════════════════════════════════════════════
// المرحلة ١٠ — آلية تنفيذ: حفر الأساسات
// ════════════════════════════════════════════════════════════════
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

// ════════════════════════════════════════════════════════════════
// المرحلة ١٠ — آلية تنفيذ: تسليح الجسور
// ════════════════════════════════════════════════════════════════
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

// ===== ROADS EQUIPMENT =====
roads_equipment: {
title: '🚜 معدات أعمال الطرق — Roads Equipment',
content: `
<div class="qcs-ref-badge">QCS 2024 S6 + Ashghal Equipment Standards</div>
<table class="dm-table"><thead><tr><th>المعدة</th><th>الوصف</th><th>الإعدادات / المواصفات</th><th>فحوصات QC</th></tr></thead><tbody>
<tr><td><strong>Motor Grader</strong><br>مُشَط الأرض</td><td>تسوية Subgrade/Subbase قبل الدمك</td><td>Blade width 3.7-4.3m<br>GPS/Laser control مُفضَّل</td><td>مستوى ±10mm كل 25m<br>Crossfall 2.5%±0.3% (QCS 2024 S6)</td></tr>
<tr><td><strong>Vibratory Roller</strong><br>حمّالة هزازة</td><td>دمك الطبقات الحبيبية + إسفلت</td><td>وزن 10-12 طن<br>تردد 25-40 Hz<br>سعة 0.5-1.0mm</td><td>≥95% MDD (Subgrade)<br>≥98% MDD (Base)<br>4-8 تمريرات</td></tr>
<tr><td><strong>Pneumatic Roller (PTR)</strong><br>حمّالة إطارات</td><td>Intermediate rolling للإسفلت</td><td>وزن 20-25 طن<br>9 إطارات<br>ضغط 6-8 bar</td><td>4 تمريرات<br>سرعة 4-6 km/h<br>بعد DD roller</td></tr>
<tr><td><strong>Asphalt Paver (Finisher)</strong><br>ماكينة فرد الإسفلت</td><td>فرد الإسفلت بسُمك وعرض محددين</td><td>Sonic Averaging Beam<br>Screed temp ≥100°C<br>سرعة 3-5 m/min</td><td>سُمك: design ±6mm<br>Level: ±6mm<br>Crossfall بـ 3m straightedge</td></tr>
<tr><td><strong>Bitumen Distributor</strong><br>ناثر البيتومين</td><td>رش Prime Coat + Tack Coat</td><td>معدل رش قابل للتعديل<br>spray bar calibrated</td><td>Prime: 0.8-1.2 L/m²<br>Tack: 0.15-0.35 L/m²<br>تغطية متساوية</td></tr>
<tr><td><strong>Nuclear Density Gauge</strong><br>جهاز الكثافة النووية</td><td>قياس الكثافة والرطوبة ميدانياً</td><td>Troxler 3440/3450<br>معاير كل 6 أشهر<br>رخصة إشعاع</td><td>Standard Count يومي<br>مقارنة مع Sand Cone<br>تقرير فوري</td></tr>
<tr><td><strong>3m Straightedge</strong><br>مسطرة 3 أمتار</td><td>قياس استواء السطح</td><td>ألمنيوم أو فولاذ<br>عتبة ≤3mm مسموح</td><td>WC: ±6mm<br>BC: ±8mm<br>كل 25m طولي</td></tr>
<tr><td><strong>DCP</strong><br>مخترق مخروطي ديناميكي</td><td>تقدير CBR ميداني سريع</td><td>8 kg hammer<br>575mm drop<br>60° cone</td><td>CBR = 292/DCP^1.12<br>فحص Subgrade سريع</td></tr>
</tbody></table>
`},

// ===== UTILITIES EQUIPMENT =====
utilities_equipment: {
title: '🔧 معدات أعمال المرافق — Utilities Equipment',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA + BS EN Standards</div>
<table class="dm-table"><thead><tr><th>المعدة</th><th>الوصف</th><th>المواصفات</th><th>فحوصات QC</th></tr></thead><tbody>
<tr><td><strong>Excavator / Backhoe</strong><br>حفارة</td><td>حفر الخنادق</td><td>CAT 320/420<br>Bucket width per trench<br>GPS optional</td><td>عرض خندق DN+600mm<br>عمق per design<br>لا damage للمواسير القائمة</td></tr>
<tr><td><strong>Pipe Fusion Machine</strong><br>ماكينة لحام HDPE</td><td>لحام Electrofusion + Butt Fusion</td><td>Machine لكل DN range<br>معايرة سنوية<br>Logger مدمج</td><td>Temperature per ISO 12176<br>Cool time per table<br>Bead inspection 100%</td></tr>
<tr><td><strong>Pressure Test Unit</strong><br>وحدة اختبار الضغط</td><td>اختبار ضغط خطوط المياه</td><td>Pump + gauge ±0.1 bar<br>معاير<br>Chart recorder</td><td>1.5×PN لمدة 2hr<br>Drop ≤0.1 bar<br>كل 500m section</td></tr>
<tr><td><strong>CCTV Camera</strong><br>كاميرا فحص المجاري</td><td>فحص داخلي لخطوط الصرف</td><td>Color HD ≥720p<br>360° rotation<br>Distance counter ±0.1m</td><td>Speed ≤0.1 m/s<br>Grade ≤2 = مقبول<br>BS EN 13508 coding</td></tr>
<tr><td><strong>Chlorination Equipment</strong><br>معدات التعقيم</td><td>تعقيم خطوط المياه</td><td>Dosing pump<br>Chlorine solution<br>DPD test kit</td><td>≥50 ppm لمدة 24hr<br>Flushing بعدها<br>Bacteriological test</td></tr>
<tr><td><strong>Compaction Plate</strong><br>حمّالة صغيرة للخنادق</td><td>دمك الردم في الخنادق</td><td>Plate 400-600mm<br>وزن 60-120 kg<br>Vibratory</td><td>طبقات ≤200mm<br>≥95% MDD<br>حذر حول الماسورة</td></tr>
<tr><td><strong>Pipe Layer Crane</strong><br>رافعة مواسير</td><td>إنزال المواسير الكبيرة</td><td>Spreader bar<br>Nylon slings (no chains!)<br>SWL per DN</td><td>لا scratching<br>Bedding ready قبل الإنزال<br>2 slings minimum</td></tr>
</tbody></table>
`},

// ===== STRUCTURAL EQUIPMENT =====
structural_equipment: {
title: '🏗️ معدات الأعمال الإنشائية — Structural Equipment',
content: `
<div class="qcs-ref-badge">QCS 2024 S5 + BS EN 12350/12390</div>
<table class="dm-table"><thead><tr><th>المعدة</th><th>الوصف</th><th>المواصفات</th><th>فحوصات QC</th></tr></thead><tbody>
<tr><td><strong>Transit Mixer</strong><br>شاحنة الخلط</td><td>نقل الخرسانة من المحطة</td><td>سعة 6-9 m³<br>سرعة الدوران 2-6 RPM<br>Agitator mode أثناء النقل</td><td>Delivery ticket<br>Temp ≤32°C<br>زمن ≤90 دقيقة (60 صيف)</td></tr>
<tr><td><strong>Concrete Pump</strong><br>مضخة خرسانة</td><td>ضخ الخرسانة لأماكن بعيدة/عالية</td><td>Boom 36-52m<br>Slump 100-150mm للضخ<br>Pipeline Ø125mm</td><td>لا segregation<br>Pipeline clean<br>Slump check at pump</td></tr>
<tr><td><strong>Internal Vibrator (Poker)</strong><br>هزاز داخلي</td><td>دمك الخرسانة داخل الشدة</td><td>Ø50-75mm<br>تردد ≥12,000 VPM<br>مرن + طويل</td><td>كل 450mm أفقي<br>10-15 ثانية/نقطة<br>لا over-vibration</td></tr>
<tr><td><strong>Slump Cone + Base</strong><br>مخروط الهبوط</td><td>قياس Workability</td><td>BS EN 12350-2<br>معدني + معاير<br>Tamping rod 16mm</td><td>كل شاحنة<br>±25mm من Target<br>خارج = رفض</td></tr>
<tr><td><strong>Cube Moulds 150mm</strong><br>قوالب مكعبات</td><td>أخذ عينات اختبار القوة</td><td>150×150×150mm<br>Steel أو Cast Iron<br>معايرة سنوية</td><td>6 cubes/50m³<br>Curing tank 20±2°C<br>7d + 28d test</td></tr>
<tr><td><strong>Bar Bending + Cutting</strong><br>ثني وقطع الحديد</td><td>تجهيز حديد التسليح</td><td>Bending: 4d (≤16mm) / 7d (>16mm)<br>Cutting: disc cutter (no flame)</td><td>per Schedule<br>لا flame cutting<br>Tolerance ±25mm</td></tr>
<tr><td><strong>Cover Meter</strong><br>جهاز قياس الغطاء</td><td>فحص concrete cover</td><td>Electromagnetic<br>Profoscope/Proceq<br>معاير</td><td>Cover per QCS S5<br>Scan كل 2m²<br>قبل الصب</td></tr>
</tbody></table>
`},

// ===== GEOTECH EQUIPMENT =====
geotech_equipment: {
title: '🔬 معدات الجسات والتربة — Geotech Equipment',
content: `
<div class="qcs-ref-badge">QCS 2024 S3 + BS EN ISO 22476 + ASTM D1586</div>
<table class="dm-table"><thead><tr><th>المعدة</th><th>الوصف</th><th>المواصفات</th><th>فحوصات QC</th></tr></thead><tbody>
<tr><td><strong>Rotary Drill Rig</strong><br>جهاز الحفر الدوراني</td><td>حفر الجسات لأعماق كبيرة</td><td>Depth capacity ≥50m<br>NX/HQ core barrel<br>Drilling fluid (bentonite)</td><td>Core recovery ≥85%<br>RQD log<br>Water loss record</td></tr>
<tr><td><strong>SPT Hammer</strong><br>مطرقة الاختراق القياسي</td><td>قياس مقاومة التربة N-value</td><td>63.5 kg hammer<br>760mm free fall<br>Auto-trip hammer مُفضَّل</td><td>كل 1.5m عمق<br>N count per 300mm<br>Energy ratio 60%</td></tr>
<tr><td><strong>Shelby Tube Sampler</strong><br>أنبوب عينات غير مُقلقلة</td><td>أخذ عينات undisturbed</td><td>Ø75mm thin-wall<br>Stainless steel<br>Sharp cutting edge</td><td>Sealed + waxed فوراً<br>Vertical transport<br>Lab within 48hr</td></tr>
<tr><td><strong>Piezometer</strong><br>جهاز قياس المياه الجوفية</td><td>رصد مستوى GWT</td><td>Standpipe أو Vibrating Wire<br>Data logger<br>Sand filter pack</td><td>قراءة أسبوعية<br>Seasonal variation<br>تقرير GWT</td></tr>
<tr><td><strong>DCP (Dynamic Cone)</strong><br>المخترق المخروطي</td><td>تقدير CBR ميداني</td><td>8 kg hammer<br>575mm drop<br>20mm cone</td><td>CBR = 292/DCP^1.12<br>كل 500m²<br>مقارنة مع Lab CBR</td></tr>
</tbody></table>
`},










// ════════════════════════════════════════════════════════════════
// PHASE 8 — EQUIPMENT SECTIONS
// ════════════════════════════════════════════════════════════════

roads_equipment: { title: '🛣️ معدات أعمال الطرق — Road Works Equipment', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 Section 6 — متطلبات المعدات وإعداداتها القياسية
</div>
<div style="display:flex;flex-direction:column;gap:10px;">

${[
{emoji:'📐',name:'Motor Grader',ar:'مُسوّي الأرض (Motor Grader)',ref:'QCS S6 P3.4',desc:'تسوية وتشكيل الطبقات بالدقة المطلوبة قبل الضغط',cap:'حسب التصميم',sets:{Blade:'3.7-4.3m','Cutting Angle':'30-40°','Grading Speed':'3-5 km/h'},qc:['فحص المستوى بـ 3m Straightedge كل 50m','التحقق من Cross-fall بـ Camber Board','قياس Level Survey كل 25m LM'],acc:'Level: ±10mm (Subgrade) | ±8mm (Base)',safe:'لا أحد خلف الـ blade أثناء التشغيل'},
{emoji:'🔄',name:'Vibratory Roller',ar:'الرولر الهزاز (Vibratory Roller)',ref:'QCS S6 P8.6',desc:'الضغط الأساسي لجميع الطبقات الإنشائية بالاهتزاز',cap:'Min 10 tonnes static weight',sets:{Frequency:'25-35 Hz','Amplitude':'0.4-0.8mm','Speed':'≤5 km/h','Passes':'Min 8 passes'},qc:['عدد المرورات ≥ 8 passes','السرعة ≤ 5 km/h خلال الضغط','فحص Field Density (Sand Cone) كل 500m²'],acc:'Subgrade ≥95% MDD | Subbase ≥98% | Base ≥98%',safe:'مسافة أمان 2m من حافة الحفر'},
{emoji:'⚪',name:'Smooth Drum Roller',ar:'الرولر الأملس (Smooth Drum)',ref:'QCS S6 P5.4',desc:'الضغط الثانوي والنهائي للإسفلت',cap:'8-12 tonnes',sets:{Mode:'Static only (no vibration near joints)','Speed':'≤4 km/h','Temp Range':'Must finish >100°C'},qc:['إنهاء الضغط قبل انخفاض الحرارة لـ 100°C','لا اهتزاز بالقرب من الجسور والمنشآت','Overlap بين ممرات الرولر ≥200mm'],acc:'Core Density ≥97% TMD | Level ±6mm (WC)',safe:'ممنوع التشغيل على منحدرات >10%'},
{emoji:'🟤',name:'Pneumatic Tyre Roller',ar:'الرولر المطاطي (PTR)',ref:'QCS S6 P5.5',desc:'الضغط الوسيط — يُحسّن التشابك بين حبيبات الإسفلت (Kneading)',cap:'15-25 tonnes',sets:{'Tyre Pressure':'500-700 kPa (adjust per mix)','Speed':'≤6 km/h','Passes':'Min 5 passes'},qc:['ضبط ضغط الإطارات لكل خلطة','فحص Air Voids Va بعد الضغط (3-5%)','Wandering pattern لتفادي التخدد'],acc:'Air Voids: 3-5% | Uniform surface texture',safe:'فحص الإطارات يومياً قبل العمل'},
{emoji:'🚜',name:'Asphalt Paver',ar:'ماكينة فرد الإسفلت (Paver)',ref:'QCS S6 P5.3',desc:'فرد خلطة الإسفلت بسُمك وعرض محددين بدقة عالية',cap:'Output ≥200 tonne/hr',sets:{'Screed Temp':'100-120°C قبل البدء','Paving Speed':'3-5 m/min (uniform)','Pre-strike-off':'Design thickness ×1.20-1.25'},qc:['درجة حرارة Screed قبل كل جلسة','قياس سُمك كل 25m بـ thickness gauge','فحص Crossfall بـ Slope board كل 50m','Delivery rate = paving speed × width × thickness × density'],acc:'Thickness: Design ±6mm | Level: ±6mm (BC) ±4mm (WC)',safe:'لا تقف خلف الـ Paver أثناء التشغيل — Pinch Point خطر'},
{emoji:'🌊',name:'Asphalt Distributor',ar:'موزّع البيتومين (Distributor)',ref:'QCS S6 P4.2',desc:'رش Tack Coat و Prime Coat بمعدل منتظم',cap:'4000-8000 L capacity',sets:{'Spray Temp':'120-165°C (حسب نوع البيتومين)','Application Rate':'0.2-0.4 L/m² (Tack) | 0.8-1.2 L/m² (Prime)','Spray Width':'adjustable 2-5m'},qc:['معايرة المضخة قبل كل جلسة (Tray Test)','Breaktime: SS-1H 1-2hr | RS-1 0.5-1hr','اختبار تجانس الرش كل 250m'],acc:'Rate: ±10% من الاشتراطات | Temp during spray ≥120°C',safe:'معدات الوقاية من البيتومين الساخن — PPE كامل'},
{emoji:'☢️',name:'Nuclear Density Gauge',ar:'جهاز الكثافة النووي (NDG)',ref:'QCS S6 P3.2 + ASTM D2922',desc:'قياس الكثافة الحقلية ونسبة الرطوبة بسرعة ودقة',cap:'Direct transmission depth: 50-300mm',sets:{'Mode':'Direct Transmission للدقة الأعلى','Calibration':'Daily Standard Count + Annual Cert.','Count Time':'Min 1 min/reading'},qc:['معايرة الجهاز على Standard Block يومياً','تسجيل Standard Count ±1% قبل كل جلسة','5 قراءات كل 500m² (random locations)'],acc:'Field Density ≥ 95/98% Proctor MDD | MC ±2%',safe:'ترخيص استخدام الجهاز + ALARA principle + Dosimeter'},
{emoji:'📏',name:'3m Straightedge',ar:'المسطرة 3m',ref:'QCS S6 P5.9.4',desc:'فحص استواء سطح الإسفلت',cap:'3000mm ±1mm accuracy',sets:{'Placement':'Parallel + Perpendicular to centerline','Frequency':'Every 25m LM','Reading':'Max gap under edge'},qc:['فحص في الاتجاهين — طولي وعرضي','التحقق من calibration الـ straightedge','تسجيل جميع القراءات في نموذج ITP'],acc:'WC PMB ≤3mm | WC Standard ≤5mm | BC ≤8mm',safe:'لا مخاطر خاصة — استخدام بعد برودة كافية'},
{emoji:'🔩',name:'Dynamic Cone Penetrometer (DCP)',ar:'DCP — مخترق المخروط الديناميكي',ref:'ASTM D6951 + QCS S6',desc:'تقدير CBR ميداني للطبقات المدمكة سريعاً',cap:'Cone angle: 60° | Hammer: 8kg | Drop: 575mm',sets:{'Test Method':'Drop hammer 10 blows, record penetration','Correlation':'CBR = 292/DN^1.12 (DN=mm/blow)','Depth':'Up to 800mm'},qc:['3 اختبارات لكل 500m²','مقارنة النتائج مع Lab CBR','تسجيل DN و حساب CBR'],acc:'Subgrade CBR≥8% | Subbase≥70% | Base≥80% (Correlated)',safe:'حذر عند الضرب — استخدام قفازات ونظارات'},
].map(function(e){return `
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
  <div style="background:rgba(201,168,76,0.08);padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)">
    <span style="font-size:24px">${e.emoji}</span>
    <div><div style="font-size:14px;font-weight:700;color:var(--text)">${e.ar}</div><div style="font-size:10px;color:var(--gold)">${e.ref}</div></div>
  </div>
  <div style="padding:12px 14px">
    <p style="font-size:12px;color:var(--text2);margin-bottom:10px">${e.desc} — <strong style="color:var(--text3)">الطاقة: ${e.cap}</strong></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:var(--gold);font-weight:700;margin-bottom:6px">⚙️ الإعدادات القياسية</div>
        ${Object.entries(e.sets).map(([k,v])=>`<div style="font-size:11px;color:var(--text2);display:flex;justify-content:space-between"><span>${k}:</span><span style="color:var(--text);font-weight:600">${v}</span></div>`).join('')}
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

utilities_equipment: { title: '🔧 معدات أعمال المرافق — Utilities Equipment', content: `
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.2);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;color:#3498db;">
📌 QCS 2024 Sections 7 & 8 — Pipe Laying, Pressure Testing, CCTV
</div>
<div style="display:flex;flex-direction:column;gap:10px;">

${[
{emoji:'⛏️',name:'Excavator / Backhoe',ar:'الحفارة / الباكهو',ref:'QCS S7 P3 + OSHA',desc:'حفر الخنادق والحفريات للشبكات',cap:'0.3-1.0m³ bucket',sets:{Bucket:'0.3-0.5m³ للخنادق الضيقة','Track Width':'Min 500mm للخنادق','Working Radius':'Max 6m reach','Trench Width':'OD + 2×300mm min haunch'},qc:['GPR Scan قبل الحفر — كشف المرافق القائمة','NOC من Ashghal + permit','قياس عمق الخندق كل 20m','شورينج للعمق >1.2m'],acc:'Trench width: OD+600mm min | Bed Level: ±20mm | Slope as design',safe:'Exclusion Zone 2m من حافة الحفر | Spotter إلزامي'},
{emoji:'🏗️',name:'Pipe Layer Crane',ar:'رافعة مد الأنابيب',ref:'QCS S7 P4.2',desc:'رفع ومد الأنابيب الثقيلة وتحديد الموضع',cap:'3-10 tonnes SWL',sets:{Slings:'Nylon slings — no metal on pipes','Lift Angle':'Max 60° from horizontal','Speed':'Slow controlled lowering','Bedding':'Check Grade before lowering'},qc:['شهادة صلاحية الرافعة (3rd party tested)','Rigging Plan معتمد','فحص Grade (Laser Level) قبل الإنزال','Pipe joints aligned before lowering'],acc:'Grade: Design ±5mm | Alignment: ±10mm | Joint gap: per pipe spec',safe:'لا أحد تحت الحمولة المرفوعة — Zone Clear'},
{emoji:'🔥',name:'HDPE Butt Fusion Machine',ar:'ماكينة لحام HDPE (Butt Fusion)',ref:'QCS S8 P2.4 + ISO 21307',desc:'لحام أنابيب HDPE بالحرارة والضغط',cap:'DN63-1200mm (حسب الموديل)',sets:{'Heater Plate Temp':'200-220°C','Heating Pressure':'≤0.15 bar (min)','Fusion Pressure':'per pipe SDR','Cooling Time':'Min 30 min (ambient)'},qc:['Bead Width: 2×3mm (مزدوج)','Bead Shape: Symmetric + Rolled back','التحقق من درجة حرارة الـ Heater كل 30min','Log sheet لكل وصلة (رقم، وقت، ضغط)'],acc:'Bead Width ±20% من القياسي | No cracks | No cold fusion',safe:'قفازات حرارية + درع وجه عند استخدام Heater'},
{emoji:'💧',name:'Hydrostatic Test Pump',ar:'مضخة اختبار الضغط',ref:'QCS S8 P5.2',desc:'اختبار محكمية خطوط المياه',cap:'Up to 25 bar test pressure',sets:{'Pressure Source':'Manual or electric pump','Gauge Accuracy':'±0.1 bar (calibrated)','Fill Speed':'Slow — purge air first','Stabilize':'30 min before test clock'},qc:['معايرة المانومتر (6 أشهر)','تصريف الهواء الكامل قبل الاختبار','تسجيل القراءة كل 30min خلال 2hr','Leakage check بالعين + Soap solution'],acc:'Test Pressure = 1.5×PN | Drop ≤0.2 bar / 2hr | Zero visible leaks',safe:'فصل قطاعات ≤1000m | خوذة + بُعد عند الضغط العالي'},
{emoji:'📹',name:'CCTV Camera (Sewer)',ar:'كاميرا CCTV للصرف الصحي',ref:'QCS S7 P7 + BS EN 13508',desc:'فحص الأنابيب المدفونة من الداخل وتصنيف العيوب',cap:'DN100-2000mm coverage',sets:{Crawlers:'Self-propelled — min 4 wheels','Camera':'360° rotating HD','Lighting':'LED Kaleidoscope','Software':'WinCan / Granite XP'},qc:['تنظيف الماسورة قبل CCTV (Jetting)','Speed ≤ 0.3 m/s خلال التصوير','تصنيف العيوب وفق WRc Grade System','PDF Report + Video file'],acc:'All defects Grade ≥3 → Remediation | Report within 5 days',safe:'Confined Space Entry Permit إذا دخل شخص | مراقبة الغازات'},
{emoji:'🔨',name:'Trench Compaction Rammer',ar:'دكاكة الخنادق (Rammer)',ref:'QCS S7 P5 + S8 P5',desc:'دمك التعبئة الرملية حول وفوق الأنابيب في الخنادق الضيقة',cap:'60-100kg rammer | 25-75mm lifts',sets:{Lift:'Max 200mm loose per lift','Compaction':'Min 3 passes / lift','Haunch':'Hand compact only — no heavy equipment'},qc:['لا دمك مباشر فوق الأنبوب','Sand Cone كل 100m خندق','الارتفاع من Haunch: يدوي → رامر → حتى Finished Level'],acc:'≥95% MDD (Haunching & Initial) | ≥98% MDD (Final Backfill)',safe:'لا تدخل الخندق أثناء التشغيل | حافة +300mm clearance'},
{emoji:'🧪',name:'Chlorination Equipment',ar:'معدات التعقيم بالكلور (Chlorination)',ref:'QCS S8 P6 + KAHRAMAA + WHO',desc:'تعقيم خطوط مياه الشرب بعد الاختبار',cap:'Dosing: 20-50 mg/L Cl₂',sets:{'Chlorine Source':'Sodium Hypochlorite 10% | Chlorine Gas','Contact Time':'Min 24 hours','Residual Target':'≥0.2 mg/L after flushing','Flush Volume':'3× pipe volume'},qc:['قياس Residual Chlorine بعد 24hr','Bacteriological Sample من 3 نقاط','تقرير معتمد من مختبر KAHRAMAA مُعتمد','Flush حتى Residual ≤0.5 mg/L'],acc:'Residual ≥0.2 mg/L | E.coli = 0 | Coliform = 0 | pH 6.5-8.5',safe:'Handling Hypochlorite: قفازات + نظارات + تهوية | No Mixing مع المواد الحمضية'},
].map(function(e){return `
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
  <div style="background:rgba(52,152,219,0.08);padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)">
    <span style="font-size:24px">${e.emoji}</span>
    <div><div style="font-size:14px;font-weight:700;color:var(--text)">${e.ar}</div><div style="font-size:10px;color:#3498db">${e.ref}</div></div>
  </div>
  <div style="padding:12px 14px">
    <p style="font-size:12px;color:var(--text2);margin-bottom:10px">${e.desc} — <strong style="color:var(--text3)">الطاقة: ${e.cap}</strong></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#3498db;font-weight:700;margin-bottom:6px">⚙️ الإعدادات</div>
        ${Object.entries(e.sets).map(([k,v])=>`<div style="font-size:11px;color:var(--text2);display:flex;justify-content:space-between;gap:4px"><span>${k}:</span><span style="color:var(--text);font-weight:600">${v}</span></div>`).join('')}
      </div>
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#3498db;font-weight:700;margin-bottom:6px">✅ فحوصات QC</div>
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

// ═══════════════════════════════════════════════════════════
// STRUCTURES — BUILDINGS (8 STAGES) + MATERIALS CALCULATOR
// ═══════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════
// MATERIALS QUANTITY CALCULATOR — BUILDINGS
// ═══════════════════════════════════════════════════════════

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

// ===== SURVEY & SETTING OUT =====
survey_setting_out: {
title: '📐 Survey & Setting Out — تفاوتات المساحة والضبط',
content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 المرجع: QCS 2024 Section 1 + FIDIC 1999 Clause 4.7 + BS 5606
</div>
<h3>🎯 تفاوتات الضبط المساحي — Setting Out Tolerances</h3>
<table class="dm-table"><thead><tr><th>العنصر</th><th>التفاوت المسموح</th><th>المرجع</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td><strong>محاور الطريق / Centerline</strong></td><td>±10mm كل 25m</td><td>QCS S6 P3</td><td>Total Station أو GPS RTK</td></tr>
<tr><td><strong>المستوى Subgrade</strong></td><td>±5mm</td><td>QCS S6 P3</td><td>Closed Loop Leveling</td></tr>
<tr><td><strong>المستوى Surface</strong></td><td>±3mm</td><td>QCS S6 P5</td><td>Digital Level Class II</td></tr>
<tr><td><strong>أساسات المباني</strong></td><td>±15mm Plan | ±10mm Level</td><td>QCS S5 + BS 5606</td><td>قبل الصب مباشرةً</td></tr>
<tr><td><strong>أعمدة — Verticality</strong></td><td>H/500 max 25mm</td><td>BS EN 13670</td><td>H = ارتفاع العمود</td></tr>
<tr><td><strong>جدران</strong></td><td>±10mm في 3m | ±20mm في 10m</td><td>QCS S5</td><td>Spirit Level + 3m Staff</td></tr>
<tr><td><strong>Pile Position (Single)</strong></td><td>±75mm</td><td>BS EN 1536</td><td>بعد حفر Pile Cap</td></tr>
<tr><td><strong>Pile Position (Group)</strong></td><td>±50mm</td><td>BS EN 1536</td><td>قياس من Grid</td></tr>
<tr><td><strong>Grid Lines ≤30m</strong></td><td>±3mm</td><td>FIDIC Cl.4.7</td><td>Total Station Traverse</td></tr>
<tr><td><strong>Linear Setting Out</strong></td><td>±5mm per 30m</td><td>QCS S1</td><td>Cumulative max ±25mm</td></tr>
</tbody></table>
<h3>📏 تفاوتات Earthworks والطبقات</h3>
<table class="dm-table"><thead><tr><th>الطبقة</th><th>Level Tolerance</th><th>Width Tolerance</th><th>QCS Ref</th></tr></thead><tbody>
<tr><td>Subgrade Formation</td><td>+10mm / -30mm</td><td>±50mm</td><td>S6 P3.3</td></tr>
<tr><td>Subbase (GSB)</td><td>±10mm</td><td>±30mm</td><td>S6 P4.2</td></tr>
<tr><td>Roadbase / DBM</td><td>±6mm</td><td>±20mm</td><td>S6 P5.2</td></tr>
<tr><td>Wearing Course</td><td>±4mm</td><td>±10mm</td><td>S6 P5.4</td></tr>
<tr><td>Kerb Line</td><td>±5mm Plan | ±3mm Level</td><td>—</td><td>S6 P7</td></tr>
<tr><td>Trench Bottom</td><td>+0mm / -25mm</td><td>±50mm</td><td>S8 P2.3</td></tr>
</tbody></table>
<h3>📋 وثائق التوثيق المطلوبة</h3>
<table class="dm-table"><thead><tr><th>المستند</th><th>متى</th><th>من يوقع</th></tr></thead><tbody>
<tr><td>Survey Control Network Report</td><td>قبل البدء</td><td>Licensed Surveyor + Consultant</td></tr>
<tr><td>Setting Out Record Sheet</td><td>كل Phase قبل الصب</td><td>QC + Consultant</td></tr>
<tr><td>As-Built Survey</td><td>بعد كل طبقة</td><td>Licensed Surveyor</td></tr>
<tr><td>Benchmark Transfer Certificate</td><td>بداية المشروع</td><td>Ashghal Survey Control</td></tr>
</tbody></table>
<div class="qcs-ref-badge">QCS 2024 S1 + QCS S5 + QCS S6 + BS 5606 + FIDIC 1999 Cl.4.7</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Setting Out Tolerances</h3>
<table class="dm-table"><thead><tr><th>Element</th><th>Tolerance</th><th>Ref</th></tr></thead><tbody>
<tr><td>Road Centerline</td><td>±10mm per 25m</td><td>QCS S6 P3</td></tr>
<tr><td>Level (Subgrade)</td><td>±5mm</td><td>QCS S6 P3</td></tr>
<tr><td>Level (Surface)</td><td>±3mm</td><td>QCS S6 P5</td></tr>
<tr><td>Column Verticality</td><td>H/500 max 25mm</td><td>BS EN 13670</td></tr>
<tr><td>Pile Position (Single)</td><td>±75mm</td><td>BS EN 1536</td></tr>
<tr><td>Grid Lines ≤30m</td><td>±3mm</td><td>FIDIC Cl.4.7</td></tr>
<tr><td>Linear Setting Out</td><td>±5mm per 30m</td><td>QCS S1</td></tr>
</tbody></table>
</div>
`
},

// ===== MMUP BUILDING PERMITS =====
mmup_building_permits: {
title: '🏢 MMUP — متطلبات رخص البناء قطر',
content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 المرجع: MMUP Building Regulations 2024 + Qatar National Planning Council
</div>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;color:#e74c3c;">
⚠️ هذه المتطلبات عامة وتتغير حسب Zone وطبيعة القطعة. يجب التحقق من MMUP مباشرةً قبل الشروع في التصميم.
</div>
<h3>📏 الارتدادات Setbacks — حسب نوع المبنى</h3>
<table class="dm-table"><thead><tr><th>نوع المبنى</th><th>أمامي (Front)</th><th>جانبي (Side)</th><th>خلفي (Rear)</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td><strong>سكن فردي (Villa)</strong></td><td>5m min</td><td>2m min</td><td>3m min</td><td>يزيد مع الارتفاع</td></tr>
<tr><td><strong>سكن متعدد (Apartment)</strong></td><td>6m min</td><td>3m min</td><td>4m min</td><td>حسب Zone</td></tr>
<tr><td><strong>تجاري (Commercial)</strong></td><td>حسب RDP</td><td>0m (متلاصق)</td><td>3m min</td><td>يختلف بالموقع</td></tr>
<tr><td><strong>مستودع / صناعي</strong></td><td>6m</td><td>3m</td><td>5m</td><td>Industrial Zone فقط</td></tr>
</tbody></table>
<h3>📊 نسب البناء — Plot Coverage and FAR</h3>
<table class="dm-table"><thead><tr><th>Zone</th><th>Plot Coverage</th><th>FAR</th><th>Max Height</th></tr></thead><tbody>
<tr><td>R1 — سكن فردي</td><td>45% max</td><td>0.9</td><td>G+1 (8.5m)</td></tr>
<tr><td>R2 — سكن فردي موسع</td><td>50% max</td><td>1.5</td><td>G+2 (11.5m)</td></tr>
<tr><td>R3 — سكن متعدد</td><td>60% max</td><td>2.4</td><td>G+3 (14.5m)</td></tr>
<tr><td>C1 — تجاري</td><td>70% max</td><td>2.8</td><td>حسب الموافقة</td></tr>
<tr><td>Suburban Zones</td><td>40% max</td><td>0.8</td><td>G+1 max</td></tr>
</tbody></table>
<h3>📋 NOC المطلوبة قبل رخصة البناء</h3>
<table class="dm-table"><thead><tr><th>الجهة</th><th>متى مطلوب</th><th>مدة الحصول</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td><strong>KAHRAMAA</strong></td><td>كل مبنى جديد</td><td>5–15 يوم عمل</td><td>كهرباء + مياه</td></tr>
<tr><td><strong>QCDD (دفاع مدني)</strong></td><td>G+2 وأعلى + تجاري</td><td>10–21 يوم</td><td>سلامة حريق</td></tr>
<tr><td><strong>Ashghal</strong></td><td>على طرق رئيسية</td><td>14–30 يوم</td><td>Driveway Permit</td></tr>
<tr><td><strong>Qatar Rail</strong></td><td>قرب المترو (200m)</td><td>21+ يوم</td><td>Vibration Study مطلوب</td></tr>
<tr><td><strong>CAA</strong></td><td>مناطق المطارات</td><td>30–60 يوم</td><td>Height Clearance</td></tr>
<tr><td><strong>QNBN / ictQATAR</strong></td><td>جميع المباني الجديدة</td><td>5–7 أيام</td><td>FTTH Infrastructure</td></tr>
</tbody></table>
<h3>📁 وثائق طلب رخصة البناء</h3>
<table class="dm-table"><thead><tr><th>#</th><th>الوثيقة</th><th>الشرط</th></tr></thead><tbody>
<tr><td>1</td><td>Title Deed (سند الملكية)</td><td>أصلي أو موثق</td></tr>
<tr><td>2</td><td>رسومات معمارية معتمدة</td><td>بختم MMUP</td></tr>
<tr><td>3</td><td>رسومات إنشائية موقعة</td><td>مهندس معتمد MMUP</td></tr>
<tr><td>4</td><td>NOC من الجهات المختصة</td><td>حسب الجدول أعلاه</td></tr>
<tr><td>5</td><td>Geotechnical Report</td><td>للمباني G+3 وأعلى</td></tr>
<tr><td>6</td><td>Environmental Impact Study</td><td>مشاريع &gt; 5000m²</td></tr>
</tbody></table>
<div class="qcs-ref-badge">MMUP Building Regulations 2024 + Qatar Urban Planning Circular 2/2024</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Setback Requirements</h3>
<table class="dm-table"><thead><tr><th>Building Type</th><th>Front</th><th>Side</th><th>Rear</th></tr></thead><tbody>
<tr><td>Villa (R1)</td><td>5m</td><td>2m</td><td>3m</td></tr>
<tr><td>Apartment (R3)</td><td>6m</td><td>3m</td><td>4m</td></tr>
<tr><td>Commercial</td><td>Per RDP</td><td>0m</td><td>3m</td></tr>
</tbody></table>
<h3>Plot Coverage and FAR</h3>
<table class="dm-table"><thead><tr><th>Zone</th><th>Coverage</th><th>FAR</th><th>Max Height</th></tr></thead><tbody>
<tr><td>R1</td><td>45%</td><td>0.9</td><td>G+1</td></tr>
<tr><td>R2</td><td>50%</td><td>1.5</td><td>G+2</td></tr>
<tr><td>R3</td><td>60%</td><td>2.4</td><td>G+3</td></tr>
<tr><td>C1</td><td>70%</td><td>2.8</td><td>By approval</td></tr>
</tbody></table>
</div>
`
},

// ===== MEP STANDARDS QATAR =====
mep_standards: {
title: '⚙️ MEP Standards Qatar — المعايير متعددة التخصصات',
content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 المرجع: KAHRAMAA Regulations 2024 + QCS S21 + QCDD Fire Code + BS/IEC Standards
</div>
<h3>⚡ KAHRAMAA — الكهرباء الجهد المنخفض LV</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Supply Voltage (3-Phase)</td><td>415V / 50Hz</td><td>KAHRAMAA Elec. Reg.</td></tr>
<tr><td>Single Phase Supply</td><td>240V / 50Hz</td><td>KAHRAMAA</td></tr>
<tr><td>Short Circuit Level (LV)</td><td>25kA RMS min</td><td>KAHRAMAA</td></tr>
<tr><td>Distribution Board IP</td><td>IP54 (Outdoor) | IP31 (Indoor)</td><td>IEC 61439</td></tr>
<tr><td>Main Earthing System</td><td>TN-S | Earth ≤ 1Ω</td><td>KAHRAMAA</td></tr>
<tr><td>Cable Type Underground</td><td>XLPE/SWA/PVC — BS 5467</td><td>KAHRAMAA Approved</td></tr>
<tr><td>Min Conduit Size</td><td>20mm Ø (Wires) | 25mm Ø (Cables)</td><td>IEC 61386</td></tr>
<tr><td>RCD Protection</td><td>30mA — Sockets + Bathrooms</td><td>IEC 60364</td></tr>
</tbody></table>
<h3>💧 KAHRAMAA — مياه الشرب Water Supply</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Supply Pressure (Static)</td><td>2.0–5.0 bar عند نقطة الدخول</td><td>KAHRAMAA Water Reg.</td></tr>
<tr><td>Min Residual Pressure</td><td>1.0 bar عند أبعد نقطة</td><td>KAHRAMAA</td></tr>
<tr><td>Max Velocity (Main Pipe)</td><td>≤ 2.0 m/s</td><td>BS EN 806</td></tr>
<tr><td>Pipe Material Approved</td><td>HDPE PN16 | Copper | CPVC</td><td>KAHRAMAA Approved List</td></tr>
<tr><td>Backflow Prevention</td><td>Double Check Valve على كل توصيلة</td><td>KAHRAMAA</td></tr>
<tr><td>Water Meter Access</td><td>من الخارج — بدون دخول المبنى</td><td>KAHRAMAA</td></tr>
</tbody></table>
<h3>🔥 QCDD — إنذار الحريق Fire Alarm</h3>
<table class="dm-table"><thead><tr><th>العنصر</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Smoke Detector Spacing</td><td>Max 7.5m من حائط | Max 15m بين كاشفات</td><td>NFPA 72 + QCDD</td></tr>
<tr><td>Heat Detector Spacing</td><td>Max 6.1m من حائط | Max 12.2m بين كاشفات</td><td>NFPA 72</td></tr>
<tr><td>Manual Call Point</td><td>كل 30m | ارتفاع 1.4m</td><td>BS 5839 + QCDD</td></tr>
<tr><td>Fire Panel Type</td><td>Addressable لـ &gt; 100 نقطة</td><td>QCDD</td></tr>
<tr><td>Alarm Sounder Level</td><td>75 dB(A) min في المناطق المأهولة</td><td>QCDD</td></tr>
<tr><td>Sprinkler (Light Hazard)</td><td>1 head كل 21m² max</td><td>NFPA 13 + QCDD</td></tr>
</tbody></table>
<h3>🚿 QCS S21 — Sanitary Drainage تصريف صحي</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>Drain Slope (Min)</td><td>1:40 (2.5%) للـ DN100</td><td>QCS S21 + BS EN 12056</td></tr>
<tr><td>Drain Slope (Max)</td><td>1:6 (16.7%) — تجنب Self-siphonage</td><td>QCS S21</td></tr>
<tr><td>Soil Stack Min Size</td><td>DN100</td><td>QCS S21</td></tr>
<tr><td>Vent Stack</td><td>مطلوب &gt; 3 طوابق | DN50 min</td><td>QCS S21</td></tr>
<tr><td>Inspection Access</td><td>عند كل 45° bend + كل 12m مستقيم</td><td>QCS S21 P3</td></tr>
<tr><td>Floor Drain Trap</td><td>Anti-Siphon Trap عند كل Floor Drain</td><td>QCS S21</td></tr>
</tbody></table>
<div class="qcs-ref-badge">KAHRAMAA Regulations 2024 + QCS S21 + QCDD Fire Code + NFPA 72/13 + IEC 60364 + BS EN 806</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>KAHRAMAA LV Electrical</h3>
<table class="dm-table"><thead><tr><th>Item</th><th>Requirement</th><th>Ref</th></tr></thead><tbody>
<tr><td>3-Phase Supply</td><td>415V / 50Hz</td><td>KAHRAMAA</td></tr>
<tr><td>Short Circuit Level</td><td>25kA RMS min</td><td>KAHRAMAA</td></tr>
<tr><td>Main Earthing</td><td>TN-S, Earth ≤ 1Ω</td><td>KAHRAMAA</td></tr>
<tr><td>RCD Protection</td><td>30mA — Sockets/Bathrooms</td><td>IEC 60364</td></tr>
</tbody></table>
<h3>QCDD Fire Alarm</h3>
<table class="dm-table"><thead><tr><th>Device</th><th>Spacing</th><th>Ref</th></tr></thead><tbody>
<tr><td>Smoke Detector</td><td>Max 15m between / 7.5m from wall</td><td>NFPA 72</td></tr>
<tr><td>Manual Call Point</td><td>Every 30m | 1.4m AFF</td><td>QCDD</td></tr>
<tr><td>Sprinkler (Light Hazard)</td><td>1 head / 21m² max</td><td>NFPA 13</td></tr>
</tbody></table>
</div>
`
},

// ===== ASHGHAL ROAD DESIGN MANUAL QUICK REF =====
ashghal_rdm: {
title: '🛣️ Ashghal RDM 2023 — مرجع سريع تصميم الطرق',
content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 المرجع: Ashghal Road Design Manual (RDM) 2023 — هيئة الأشغال العامة قطر
</div>
<h3>🚗 عروض الحارات — Lane Widths by Road Class</h3>
<table class="dm-table"><thead><tr><th>تصنيف الطريق</th><th>السرعة التصميمية</th><th>عرض الحارة</th><th>عدد الحارات</th><th>كتف الطريق</th></tr></thead><tbody>
<tr><td><strong>Freeway (F)</strong></td><td>120 km/h</td><td>3.65m</td><td>3+ كل اتجاه</td><td>3.0m Hard Shoulder</td></tr>
<tr><td><strong>Expressway (E)</strong></td><td>100 km/h</td><td>3.65m</td><td>2–3 كل اتجاه</td><td>2.5m Hard Shoulder</td></tr>
<tr><td><strong>Primary Arterial (A1)</strong></td><td>80 km/h</td><td>3.65m</td><td>2–3 كل اتجاه</td><td>2.0m</td></tr>
<tr><td><strong>Secondary Arterial (A2)</strong></td><td>70 km/h</td><td>3.50m</td><td>2 كل اتجاه</td><td>1.5m</td></tr>
<tr><td><strong>Collector (C)</strong></td><td>60 km/h</td><td>3.25m</td><td>1–2 كل اتجاه</td><td>1.0m</td></tr>
<tr><td><strong>Local (L)</strong></td><td>40–50 km/h</td><td>3.0m</td><td>1 كل اتجاه</td><td>0.5m</td></tr>
</tbody></table>
<h3>👁️ مسافات الرؤية — Sight Distances</h3>
<table class="dm-table"><thead><tr><th>السرعة</th><th>SSD (Stopping)</th><th>PSD (Passing)</th><th>ISD (Intersection)</th></tr></thead><tbody>
<tr><td>40 km/h</td><td>45m</td><td>200m</td><td>70m</td></tr>
<tr><td>50 km/h</td><td>65m</td><td>260m</td><td>95m</td></tr>
<tr><td>60 km/h</td><td>85m</td><td>340m</td><td>130m</td></tr>
<tr><td>70 km/h</td><td>110m</td><td>420m</td><td>165m</td></tr>
<tr><td>80 km/h</td><td>140m</td><td>510m</td><td>200m</td></tr>
<tr><td>100 km/h</td><td>210m</td><td>670m</td><td>270m</td></tr>
<tr><td>120 km/h</td><td>300m</td><td>820m</td><td>340m</td></tr>
</tbody></table>
<h3>📐 الانحدارات والميول — Grades and Crossfalls</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>Min</th><th>Max Normal</th><th>Max Exception</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td>Longitudinal Grade</td><td>0.3%</td><td>4% (Arterial)</td><td>6% (Local)</td><td>Freeway max 3%</td></tr>
<tr><td>Crossfall Normal Section</td><td>2.0%</td><td>2.5%</td><td>3.0%</td><td>±0.3% Tolerance (QCS 2024 S6)</td></tr>
<tr><td>Superelevation (Urban)</td><td>—</td><td>6%</td><td>—</td><td>R min حسب جداول RDM</td></tr>
<tr><td>Superelevation (Rural)</td><td>—</td><td>8%</td><td>—</td><td>R min حسب السرعة</td></tr>
<tr><td>Shoulder Crossfall</td><td>4%</td><td>5%</td><td>6%</td><td>بعيداً عن التقاطعات</td></tr>
</tbody></table>
<h3>🔄 نصف القطر الأدنى — Minimum Horizontal Radius</h3>
<table class="dm-table"><thead><tr><th>السرعة التصميمية</th><th>R min (e=6%)</th><th>R min (e=8%)</th></tr></thead><tbody>
<tr><td>40 km/h</td><td>45m</td><td>40m</td></tr>
<tr><td>60 km/h</td><td>115m</td><td>100m</td></tr>
<tr><td>80 km/h</td><td>230m</td><td>205m</td></tr>
<tr><td>100 km/h</td><td>395m</td><td>350m</td></tr>
<tr><td>120 km/h</td><td>620m</td><td>560m</td></tr>
</tbody></table>
<h3>⚠️ متطلبات خاصة بقطر</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>السبب</th></tr></thead><tbody>
<tr><td>Median Width (Arterial)</td><td>6.0m min</td><td>U-Turn + Emergency Access</td></tr>
<tr><td>Service Road</td><td>إلزامي على Arterials</td><td>حماية حركة المشاة</td></tr>
<tr><td>Bus Bay</td><td>3.0m عرض × 30m طول</td><td>Ashghal Bus Standard</td></tr>
<tr><td>Shared Path (Cycle+Ped)</td><td>3.5m min</td><td>Qatar Active Mobility Plan</td></tr>
<tr><td>Street Lighting</td><td>20 lux avg (Arterial) | 10 lux (Local)</td><td>Ashghal Lighting Standard</td></tr>
</tbody></table>
<div class="qcs-ref-badge">Ashghal RDM 2023 + AASHTO 2018 + Qatar Highway Design Manual</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Lane Widths by Road Class</h3>
<table class="dm-table"><thead><tr><th>Road Class</th><th>Design Speed</th><th>Lane Width</th><th>Shoulder</th></tr></thead><tbody>
<tr><td>Freeway</td><td>120 km/h</td><td>3.65m</td><td>3.0m</td></tr>
<tr><td>Expressway</td><td>100 km/h</td><td>3.65m</td><td>2.5m</td></tr>
<tr><td>Primary Arterial</td><td>80 km/h</td><td>3.65m</td><td>2.0m</td></tr>
<tr><td>Collector</td><td>60 km/h</td><td>3.25m</td><td>1.0m</td></tr>
<tr><td>Local</td><td>40–50 km/h</td><td>3.0m</td><td>0.5m</td></tr>
</tbody></table>
<h3>Stopping Sight Distance</h3>
<table class="dm-table"><thead><tr><th>Speed</th><th>SSD</th><th>PSD</th></tr></thead><tbody>
<tr><td>60 km/h</td><td>85m</td><td>340m</td></tr>
<tr><td>80 km/h</td><td>140m</td><td>510m</td></tr>
<tr><td>100 km/h</td><td>210m</td><td>670m</td></tr>
</tbody></table>
</div>
`
},
};
