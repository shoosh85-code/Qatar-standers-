// QatarSpec Pro — Content: structural
(function(){
  var c=window.QS_CONTENT=window.QS_CONTENT||{};
  
  c["structural"] = {
    title: '🏛️ الكود الإنشائي القطري — QCS 2024',
    titleEn: '🏛️ Qatar Structural Code — QCS 2024',
    content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 5 | الأعمال الإنشائية | Ashghal Standards | MMUP Building Regulations
</div>
<h3>🏗️ مراحل التنفيذ — الترتيب الإلزامي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0">
<div onclick="QS.openDetail('foundations_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">1️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">الأساسات</div>
<div style="color:var(--text3);font-size:10px">GI ← تحقق ← GWT ← خوازيق/رافت</div></div>
<div onclick="QS.openDetail('concrete_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">2️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">الخرسانة</div>
<div style="color:var(--text3);font-size:10px">Mix Design ← صب ← Curing</div></div>
<div onclick="QS.openDetail('rebar_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">3️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">حديد التسليح</div>
<div style="color:var(--text3);font-size:10px">Cover ← Spacing ← Lap Length</div></div>
<div onclick="QS.openDetail('formwork_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">4️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">الشدة والقوالب</div>
<div style="color:var(--text3);font-size:10px">Formwork ← Pressure ← Stripping</div></div>
<div onclick="QS.openDetail('concrete_phases')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">5️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">مراحل الصب</div>
<div style="color:var(--text3);font-size:10px">Sequence ← Hold Points ← Testing</div></div>
<div onclick="QS.openDetail('hot_weather_concreting')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">6️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">الطقس الحار</div>
<div style="color:var(--text3);font-size:10px">Max 35°C ← Ice ← Curing</div></div>
</div>

<h3>📋 المواد والمواصفات</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0">
<div onclick="QS.openDetail('structural_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#3498db;font-weight:700;font-size:11px">مواد الإنشاء</div></div>
<div onclick="QS.openDetail('rebar_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#3498db;font-weight:700;font-size:11px">مواد حديد التسليح</div></div>
<div onclick="QS.openDetail('concrete_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#3498db;font-weight:700;font-size:11px">مواد الخرسانة</div></div>
</div>

<h3>📋 الاختبارات وضبط الجودة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0">
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#e74c3c;font-weight:700;font-size:11px">ITP — الخرسانة</div></div>
<div onclick="QS.openDetail('itp_foundations')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#e74c3c;font-weight:700;font-size:11px">ITP — الأساسات</div></div>
<div onclick="QS.openDetail('rebar_itp')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#e74c3c;font-weight:700;font-size:11px">ITP — الحديد</div></div>
</div>

<h3>📊 ملخص متطلبات QCS 2024 — Section 5</h3>
<table class="dm-table">
<tr><th>الطبقة / العنصر</th><th>المتطلب الرئيسي</th><th>اختبار</th><th>QCS</th></tr>
<tr><td><strong>Blinding Concrete</strong></td><td>C15 | 75mm min | نظيف وجاف</td><td>Visual</td><td>S5 P4</td></tr>
<tr><td><strong>Raft / Foundation</strong></td><td>C35 min | w/c ≤ 0.40 | SRPC سبخة</td><td>Cube 7+28 day</td><td>S5 P4/P7</td></tr>
<tr><td><strong>Columns / Walls</strong></td><td>C35-C50 | Cover 40mm external</td><td>Cube + Slump</td><td>S5 P3/P4</td></tr>
<tr><td><strong>Beams / Slabs</strong></td><td>C30-C40 | Cover 25mm internal / 40mm external</td><td>Cube + Slump</td><td>S5 P3/P4</td></tr>
<tr><td><strong>Rebar B460B</strong></td><td>Lap 40φ tension | Cover per exposure | Spacers</td><td>Pull-out test</td><td>S5 P3</td></tr>
<tr><td><strong>Formwork</strong></td><td>Max lateral pressure 60 kN/m² | Plumb ±3mm</td><td>Survey</td><td>S5 P4</td></tr>
<tr><td><strong>Curing</strong></td><td>7 days min water | 3 days compound | No direct sun</td><td>Visual daily</td><td>S5 P4</td></tr>
</table>

<h3>🔴 Hold Points الرئيسية — QCS S5 + Ashghal ITP</h3>
<table class="dm-table">
<tr><th>HP</th><th>المرحلة</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP1</td><td>الأساسات</td><td>فحص قاع الحفر + GI تحقق + Dewatering</td><td>Survey + GI report</td></tr>
<tr><td>HP2</td><td>حديد الأساسات</td><td>Cover ✓ Spacing ✓ Laps ✓ Spacers ✓</td><td>Rebar inspection sheet</td></tr>
<tr><td>HP3</td><td>صب الأساسات</td><td>Blinding جاهز + Mix Design معتمد</td><td>Concrete delivery note</td></tr>
<tr><td>HP4</td><td>حديد الأعمدة</td><td>Cover ✓ Stirrups ✓ Laps ✓</td><td>Rebar inspection</td></tr>
<tr><td>HP5</td><td>قبل كل صبة</td><td>Mix Design ✓ Slump ✓ Temp ✓ Formwork ✓</td><td>Pre-pour checklist</td></tr>
<tr><td>HP6</td><td>Post-pour</td><td>Cubes collected ✓ Curing started ✓</td><td>Cube test report</td></tr>
<tr><td>HP7</td><td>Formwork stripping</td><td>Min strength achieved (70% fcu)</td><td>Cube results</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none">
<h3>Buildings & Towers — Execution Phases (QCS S5)</h3>
<p>Select a phase for detailed content:</p>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:12px 0">
<div onclick="QS.openDetail('foundations_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:var(--gold);font-size:11px;font-weight:700">Foundations</div></div>
<div onclick="QS.openDetail('concrete_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:var(--gold);font-size:11px;font-weight:700">Concrete</div></div>
<div onclick="QS.openDetail('rebar_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:var(--gold);font-size:11px;font-weight:700">Rebar</div></div>
<div onclick="QS.openDetail('formwork_overview')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:var(--gold);font-size:11px;font-weight:700">Formwork</div></div>
<div onclick="QS.openDetail('concrete_phases')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">5️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">Pouring Phases</div>
<div style="color:var(--text3);font-size:10px">Sequence ← Hold Points ← Testing</div></div>
<div onclick="QS.openDetail('hot_weather_concreting')" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center">
<div style="font-size:18px">6️⃣</div><div style="color:var(--gold);font-weight:700;font-size:12px">Hot Weather</div>
<div style="color:var(--text3);font-size:10px">Max 35°C ← Ice ← Curing</div></div>
</div>
<h3>📋 Materials & Specifications</h3>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0">
<div onclick="QS.openDetail('structural_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#3498db;font-weight:700;font-size:11px">Structural Materials</div></div>
<div onclick="QS.openDetail('rebar_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#3498db;font-weight:700;font-size:11px">Rebar Materials</div></div>
<div onclick="QS.openDetail('concrete_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center">
<div style="color:#3498db;font-weight:700;font-size:11px">Concrete Materials</div></div>
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:#e74c3c;font-size:11px;font-weight:700">ITP Concrete</div></div>
<div onclick="QS.openDetail('itp_foundations')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:#e74c3c;font-size:11px;font-weight:700">ITP Foundations</div></div>
<div onclick="QS.openDetail('rebar_itp')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;cursor:pointer;text-align:center"><div style="color:#e74c3c;font-size:11px;font-weight:700">ITP Rebar</div></div>
</div>
<table class="dm-table">
<tr><th>Element</th><th>Key Requirement</th><th>QCS</th></tr>
<tr><td>Raft Foundation</td><td>C35 min | w/c ≤ 0.40 | SRPC for sabkha</td><td>S5 P4/P7</td></tr>
<tr><td>Columns</td><td>C35-C50 | Cover 40mm external | Stirrups @ 200mm max</td><td>S5 P3/P4</td></tr>
<tr><td>Slabs/Beams</td><td>C30-C40 | Cover 25mm int / 40mm ext</td><td>S5 P3/P4</td></tr>
<tr><td>Rebar B460B</td><td>Lap 40-bar-dia tension | Spacers mandatory</td><td>S5 P3</td></tr>
<tr><td>Curing</td><td>7 days min water / 3 days compound</td><td>S5 P4</td></tr>
</table>
</div>`
  };
  
  c["structural_materials"] = { title: '🧱 مواد الإنشاء — المواصفات والاختبارات',
    titleEn: '🧱 Structural Materials', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 5, 14 | Structural Works — Materials Specifications
</div>
<h3>🏛️ Structural Materials — Full QCS 2024 Requirements</h3>
<table class="dm-table">
<tr><th>Material</th><th>Specification</th><th>Standard</th><th>Min Grade</th></tr>
<tr><td>Concrete — Residential</td><td>Normal weight, OPC or GGBS</td><td>QCS S5 / BS 8500</td><td>C25 (fcu=25 MPa)</td></tr>
<tr><td>Concrete — Commercial</td><td>OPC or blended cement</td><td>QCS S5</td><td>C30 (fcu=30 MPa)</td></tr>
<tr><td>Concrete — Exposed Marine</td><td>GGBS or SRPC + silica fume</td><td>QCS S5 Durability</td><td>C35 + W/C≤0.40</td></tr>
<tr><td>Cement Type</td><td>OPC (CEM I) / GGBS blend / SRPC (sulphate)</td><td>BS EN 197-1</td><td>Class 42.5N</td></tr>
<tr><td>Reinforcement</td><td>Ribbed high yield bar</td><td>BS 4449 / QCS S5</td><td>B500B: fy=500 MPa</td></tr>
<tr><td>Structural Steel</td><td>Hot rolled sections + plates</td><td>BS EN 10025</td><td>S275 or S355</td></tr>
<tr><td>Welding Consumables</td><td>Matching yield to parent steel</td><td>BS EN ISO 2560</td><td>—</td></tr>
<tr><td>Bolts</td><td>High-strength structural bolts</td><td>BS EN 14399</td><td>Grade 8.8 / 10.9</td></tr>
<tr><td>Waterproofing</td><td>Tanking (below ground) / Sheet (foundation)</td><td>BS 8102</td><td>Type A or C</td></tr>
<tr><td>Admixtures</td><td>Plasticizer + retarder (hot weather)</td><td>BS EN 934-2</td><td>KAHRAMAA approved</td></tr>
<tr><td>Formwork</td><td>Plywood / steel / plastic — reusable</td><td>QCS S5</td><td>±5mm alignment</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
⚠️ Qatar Specific: High sulphate soils require SRPC or GGBS cement. All structural materials require prior approval (MAR) before delivery. No substitutions without Engineer written consent.
</div>
</div>
` };
  c["structural_qcp"] = { title: '📊 خطة ضبط الجودة — الإنشاء (QCP)',
    titleEn: '📋 Quality Control Plan', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Structural Works — Quality Control Plan
</div>
<h3>🏛️ Structural QCP — Full Testing Requirements</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test/Check</th><th>Frequency</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Concrete Mix Design</td><td>Trial mixes + 3 × 28d cube sets</td><td>Each new mix / source change</td><td>fcu + workability</td><td>H</td></tr>
<tr><td>Cement Delivery</td><td>Mill certificate</td><td>Each delivery batch</td><td>BS EN 197-1</td><td>W</td></tr>
<tr><td>Aggregate Delivery</td><td>Gradation + SO3 + Cl</td><td>Per 500m³ / source change</td><td>QCS S5 Tables</td><td>W</td></tr>
<tr><td>Rebar Delivery</td><td>Mill cert + bend test</td><td>Each 10t delivery</td><td>B500B fy≥500</td><td>W</td></tr>
<tr><td>Formwork Inspection</td><td>Level + alignment + seal</td><td>Before every pour</td><td>±5mm</td><td>H</td></tr>
<tr><td>Rebar Inspection</td><td>Size + spacing + cover + ties</td><td>Before every pour</td><td>Per drawing</td><td>H</td></tr>
<tr><td>Pre-Pour Sign-off</td><td>Full checklist</td><td>Every pour</td><td>Engineer + QC signature</td><td>H</td></tr>
<tr><td>Slump Test</td><td>Fresh concrete</td><td>Every truck</td><td>Design ±25mm</td><td>W</td></tr>
<tr><td>Concrete Temperature</td><td>Probe in truck</td><td>Every truck (hot weather)</td><td>≤35°C</td><td>W</td></tr>
<tr><td>Cube Sampling</td><td>1 set/50m³ (min 1/day)</td><td>Continuous</td><td>3 cubes/set</td><td>W</td></tr>
<tr><td>7-day Cube</td><td>Lab crush</td><td>Each set</td><td>≥70% fcu</td><td>W</td></tr>
<tr><td>28-day Cube</td><td>Lab crush</td><td>Each set</td><td>≥fcu specified</td><td>H</td></tr>
<tr><td>Cover Measurement</td><td>Covermeter survey</td><td>Each element</td><td>Nominal ±10mm</td><td>W</td></tr>
<tr><td>Dimensional Survey</td><td>Tape + level</td><td>Each element</td><td>±10mm plan / ±5mm level</td><td>W</td></tr>
<tr><td>Structural Steel (if any)</td><td>Torque test on bolts</td><td>10% random</td><td>Spec torque value</td><td>W</td></tr>
<tr><td>Weld NDT (if required)</td><td>UT or RT</td><td>Per weld procedure</td><td>BS EN ISO 5817 Level B</td><td>H</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:8px;">H = Hold Point | W = Witness Point | QCS 2024 Section 5</div>
</div>
` };
  c["concrete_overview"] = { title: '🏗️ الConcrete — نظرة عامة',
    titleEn: '🔵 Concrete — Overview', content: `<div class="lang-content-ar">
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
` };
  c["concrete_full"] = { title: '🧱 الConcrete — Concrete Works',
    titleEn: '🔵 Concrete — Full Detail', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 3 | Concrete</div>
<h3>📋 Overview</h3>
<p>Concrete in Qatar faces unique challenges — extreme heat, high sulphate content in soil and groundwater. SRPC (Sulphate Resisting Portland Cement) is mandatory on most projects.</p>
<h3>📐 Concrete Grades — QCS 2024</h3>
<table class="dm-table"><tr><th>Grade</th><th>fcu (N/mm²)</th><th>w/c Max</th><th>Application</th></tr>
<tr><td>C15</td><td>15</td><td>0.65</td><td>Blinding only</td></tr>
<tr><td>C25</td><td>25</td><td>0.55</td><td>Simple foundations — normal soil</td></tr>
<tr><td>C30</td><td>30</td><td>0.50</td><td>Columns and slabs — normal environment</td></tr>
<tr><td>C35</td><td>35</td><td>0.45</td><td>Sulphate environment — Manholes — Piles</td></tr>
<tr><td>C40</td><td>40</td><td>0.40</td><td>Marine zones — severe exposure</td></tr></table>
<h3>📐 General Specifications</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Cement</td><td>SRPC mandatory in Qatar (most projects)</td><td>BS EN 197-1</td></tr>
<tr><td>Water/Cement Ratio</td><td>≤ 0.45 (Qatar environment)</td><td>QCS S5 P3</td></tr>
<tr><td>Slump — Normal pour</td><td>75–100mm</td><td>QCS S5 P3</td></tr>
<tr><td>Slump — Pumped</td><td>100–150mm</td><td>QCS S5 P3</td></tr>
<tr><td>Chloride in aggregate</td><td>≤ 0.04%</td><td>QCS S5 P3</td></tr>
<tr><td>Sulphate in aggregate</td><td>≤ 4% SO₃</td><td>QCS S5 P3</td></tr>
<tr><td>Delivery temperature</td><td>≤ 32°C (at truck arrival)</td><td>QCS S5 P3</td></tr>
<tr style="background:rgba(46,204,113,0.08)"><td><strong>🆕 Placing temperature</strong></td><td><strong style="color:#2ecc71">≤ 35°C at point of pour</strong></td><td>QCS S5 P4</td></tr>
<tr><td>Cube testing</td><td>6 cubes per 50m³ or per pour</td><td>QCS S5 P3</td></tr>
<tr><td>Curing period</td><td>7 days minimum — 10 days in hot weather</td><td>QCS S5 P3</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Rebar and formwork inspection before pour<br>
• <strong>HP-02:</strong> Acceptance of concrete truck (Slump + Temp)<br>
• <strong>HP-03:</strong> 7-day cube results before formwork striking</p>
</div>
` };
  c["concrete_materials"] = { title: '🔩 الConcrete — المواد',
    titleEn: '⚗️ Concrete Materials', content: `<div class="lang-content-ar">
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
` };
  c["concrete_mix"] = { title: '🧪 الConcrete — Mix Design',
    titleEn: '🔬 Concrete Mix Design', content: `<div class="lang-content-ar">
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
` };
  c["concrete_placing"] = { title: '🏗️ الConcrete — الصب والCompaction',
    titleEn: '🏗️ Concrete Placing & Pouring', content: `<div class="lang-content-ar">
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
` };
  c["concrete_testing"] = { title: '🧪 الConcrete — الاختبارات',
    titleEn: '🧪 Concrete Testing', content: `<div class="lang-content-ar">
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
` };
  c["concrete_curing"] = { title: '💧 الConcrete — المعالجة (Curing)',
    titleEn: '💧 Concrete Curing', content: `<div class="lang-content-ar">
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
` };
  c["concrete_joints"] = { title: '✂️ الConcrete — الفواصل',
    titleEn: '🔗 Structural Joints', content: `<div class="lang-content-ar">
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
` };
  c["concrete_pavement"] = { title: '🏗️ Concrete Road Pavement — QCS Section 6 Part 6 Full Summary',
    titleEn: '🛣️ Concrete Pavement', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 P9 | Concrete Pavement (Rigid Pavement)
</div>
<h3>🛣️ Concrete Pavement — Complete QCS 2024 Requirements</h3>
<p style="font-size:12px;color:var(--text2);margin-bottom:12px;">Rigid concrete pavements are used for high-load areas (container ports, airports, industrial roads). In Qatar, they are specified where flexible asphalt cannot withstand point loads or extreme temperatures.</p>
<table class="dm-table">
<tr><th>Property</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Concrete Grade</td><td>Min C40 (fcu = 40 MPa at 28 days)</td><td>QCS S8 P9</td></tr>
<tr><td>Flexural Strength</td><td>≥4.5 MPa (beam bending test)</td><td>QCS S8 P9</td></tr>
<tr><td>W/C Ratio</td><td>≤0.40 (durability requirement)</td><td>QCS S8 P9</td></tr>
<tr><td>Min Cement Content</td><td>350 kg/m³</td><td>QCS S8 P9</td></tr>
<tr><td>Slab Thickness</td><td>Design ±5mm (measured by coring)</td><td>QCS S8 P9</td></tr>
<tr><td>Surface Texture (brushed)</td><td>3–5 mm groove depth / transverse</td><td>QCS S8 P9</td></tr>
<tr><td>Joint Type — Transverse</td><td>Contraction joints — sawn within 24hr</td><td>QCS S8 P9</td></tr>
<tr><td>Joint Spacing — Transverse</td><td>≤5.0m (unreinforced) / ≤7.5m (reinforced)</td><td>QCS S8 P9</td></tr>
<tr><td>Joint Spacing — Longitudinal</td><td>≤4.0m (carriageway lane width)</td><td>QCS S8 P9</td></tr>
<tr><td>Joint Sealant</td><td>Hot-applied bituminous / polyurethane</td><td>BS 2499 / QCS S8</td></tr>
<tr><td>Curing</td><td>Polythene membrane + curing compound Min 7 days</td><td>QCS S8 P9</td></tr>
<tr><td>Skid Resistance (SRT)</td><td>≥55 SRT value (pendulum test)</td><td>QCS S8 P9</td></tr>
<tr><td>Level Tolerance</td><td>±3mm under 3m straightedge</td><td>QCS S8 P9</td></tr>
<tr><td>Crossfall</td><td>2.5% ±0.3%</td><td>QCS S8 P9</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
🔴 HP: Pre-pour inspection required. Flexural strength beams cured alongside slab. Opening to traffic only after 28-day strength confirmed.
</div>
<div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
⚠️ Qatar Hot Weather: Concrete pavement must be poured at night when ambient temperature <35°C. Use chilled water + ice to control mix temperature.
</div>
</div>
` };
  c["ms_concrete"] = { title: '📋 Method Statement — Concrete Works',
    titleEn: '📄 Concrete Method Statement', content: `
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
` };
  c["rebar_overview"] = { title: '🔩 Rebar التسليح — نظرة عامة',
    titleEn: '🔩 Reinforcement — Overview', content: `<div class="lang-content-ar">
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
<div onclick="QS.openDetail('itp_rebar')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:10px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px">📋</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">ITP Rebar</div></div>
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
` };
  c["rebar_full"] = { title: '🔩 Rebar التسليح — Reinforcement',
    titleEn: '🔩 Reinforcement — Full Detail', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 2 | Reinforcement</div>
<h3>📐 Technical Specifications — Grade 500B</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Grade</td><td>Grade 500B</td><td>BS 4449</td></tr>
<tr><td>Yield Strength (fy)</td><td>≥ 500 N/mm²</td><td>BS 4449</td></tr>
<tr><td>Ultimate Strength (fu)</td><td>≥ 600 N/mm²</td><td>BS 4449</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.15</td><td>BS 4449</td></tr>
<tr><td>Elongation</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend Test</td><td>180° without cracking</td><td>BS 4449</td></tr></table>
<h3>📐 Lap Lengths</h3>
<table class="dm-table"><tr><th>Joint Type</th><th>Length</th><th>Note</th></tr>
<tr><td>Tension — Standard</td><td>40d</td><td>d = bar diameter</td></tr>
<tr><td>Tension — Aggressive environment</td><td>50d</td><td>Qatar + sulphate soil</td></tr>
<tr><td>Compression</td><td>30d</td><td>Compression columns</td></tr></table>
<h3>📐 Bend Radius</h3>
<table class="dm-table"><tr><th>Diameter</th><th>Min Bend Radius</th></tr>
<tr><td>≤ 16mm</td><td>≥ 3.5d</td></tr>
<tr><td>&gt; 16mm</td><td>≥ 4d</td></tr></table>
<h3>🔧 Execution Method</h3>
<p><strong>1. Acceptance:</strong><br>
• Check Mill Certificate from manufacturer<br>
• Confirm Grade 500B marked on bars<br>
• Tensile Test every 50 tonnes or per diameter</p>
<p><strong>2. Storage:</strong><br>
• Elevate ≥ 100mm off ground (prevent corrosion)<br>
• Cover in humid conditions<br>
• Segregate different diameters</p>
<p><strong>3. Fixing:</strong><br>
• Use correct size Spacers to ensure Cover<br>
• Tie Wire at intersections<br>
• Check spacing and Cover before pouring<br>
• Do not bend rebar embedded in hardened concrete</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Mill Certificate accepted before use<br>
• <strong>HP-02:</strong> Rebar placement and cover inspection before pour</p>
</div>
` };
  c["rebar_materials"] = { title: '🔩 Rebar التسليح — المواصفات',
    titleEn: '⚙️ Rebar Materials', content: `<div class="lang-content-ar">
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
` };
  c["rebar_fixing"] = { title: '🔧 Rebar التسليح — الربط والتوزيع',
    titleEn: '🔧 Rebar Fixing & Tying', content: `<div class="lang-content-ar">
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
` };
  c["rebar_cover"] = { title: '📏 Rebar التسليح — Cover & Spacers',
    titleEn: '📏 Concrete Cover', content: `<div class="lang-content-ar">
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
` };
  c["rebar_testing"] = { title: '🧪 Rebar التسليح — الاختبارات',
    titleEn: '🧪 Rebar Testing', content: `<div class="lang-content-ar">
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
` };
  c["formwork_overview"] = { title: '🪵 الشدات — Formwork',
    titleEn: '🏗️ Formwork & Falsework', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 Part 4 | Formwork</div>
<h3>📐 Specifications</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Design load</td><td>Self weight of concrete + live loads + vibration</td></tr>
<tr><td>Formwork deflection</td><td>≤ L/500 or 5mm whichever is less</td></tr>
<tr><td>Release Agent</td><td>Mandatory + approved — must not contaminate rebar</td></tr>
<tr><td>Pre-pour inspection</td><td>Mandatory sign-off by Supervising Consultant</td></tr>
</table>
<h3>📐 Striking Times</h3>
<table class="dm-table"><tr><th>Element</th><th>OPC</th><th>SRPC/GGBS</th></tr>
<tr><td>Column and wall sides</td><td>12–24 hours</td><td>24–48 hours</td></tr>
<tr><td>Beam soffits (props remaining)</td><td>4 days</td><td>6 days</td></tr>
<tr><td>Slab soffits (props remaining)</td><td>3 days</td><td>4 days</td></tr>
<tr><td>Beam props (span &lt; 6m)</td><td>14 days</td><td>21 days</td></tr>
<tr><td>Beam props (span &gt; 6m)</td><td>21 days</td><td>28 days</td></tr>
</table>
<h3>⚠️ Important Notes</h3>
<p>• Strike formwork only after 7-day cube results are accepted<br>
• Do not strike early in cold weather<br>
• In Qatar summer — high temps accelerate strength gain but do not reduce minimum strike times<br>
• Reshoring is mandatory in multi-storey construction</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Formwork inspection by SC before pour<br>
• <strong>HP-02:</strong> 7-day cube approval before striking</p>
</div>
` };
  c["formwork_full"] = { title: '🪵 الشدات — Formwork',
    titleEn: '🏗️ Formwork — Full Detail', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Formwork</div>
<h3>📐 Specifications</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Strength</td><td>Must resist concrete pressure + live loads</td></tr>
<tr><td>Tightness</td><td>No leakage of water or grout</td></tr>
<tr><td>Straightness</td><td>3m straightedge ≤ 6mm</td></tr>
<tr><td>Release Agent</td><td>Mandatory before every pour</td></tr>
<tr><td>Internal cleaning</td><td>Free of dust, timber offcuts and water</td></tr></table>
<h3>⏱️ Stripping Times</h3>
<table class="dm-table"><tr><th>Element</th><th>OPC</th><th>SRPC</th><th>Condition</th></tr>
<tr><td>Column and wall sides</td><td>24 hours</td><td>36 hours</td><td>fcu ≥ 5 N/mm²</td></tr>
<tr><td>Slab soffits</td><td>4 days</td><td>6 days</td><td>fcu ≥ 10 N/mm²</td></tr>
<tr><td>Slab props</td><td>10 days</td><td>14 days</td><td>fcu ≥ 70% design fcu</td></tr>
<tr><td>Beam props</td><td>14 days</td><td>21 days</td><td>fcu ≥ 70% design fcu</td></tr></table>
<h3>⚠️ Important Notes</h3>
<p>• <strong>Do not strike before 7-day cube results are received</strong><br>
• In Qatar: SRPC cures slower — longer striking times apply<br>
• Props must not be removed without Supervising Consultant approval<br>
• Back Propping mandatory for multi-storey structures</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Formwork inspection before pour<br>
• <strong>HP-02:</strong> Engineer approval before removing props</p>
</div>
` };
  c["foundations_overview"] = { title: '🏛️ الأساسات — نظرة عامة',
    titleEn: '🏛️ Foundations — Overview', content: `
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
📌 QCS 2024 Reference | 🏗️ Strip / Pad Foundations
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundations</div>
<h3>📋 Overview</h3>
<p>Foundations in Qatar face specific challenges: Sabkha soil, groundwater with high sulphate content, and corrosion risk. Foundation type selection depends on the Ground Investigation (GI) report.</p>
<h3>📌 Select Foundation Type</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('found_strip')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🏗️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Strip / Pad</div></div>
<div onclick="QS.openDetail('found_raft')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⬛</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Raft Foundation</div></div>
<div onclick="QS.openDetail('found_piles')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🕳️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Bored Piles</div></div>
<div onclick="QS.openDetail('found_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Foundation Testing</div></div>
<div onclick="QS.openDetail('itp_foundations')" style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📋</div><div style="color:#e74c3c;font-weight:700;font-size:13px;">ITP Foundations</div></div>
</div>
<div style="margin-top:12px;">
<h3>📐 Key Requirements — Qatar</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Blinding concrete</td><td>C15 — 75mm thick before rebar</td><td>QCS S5</td></tr>
<tr><td>Min concrete grade</td><td>C35 (sulphate environment Qatar)</td><td>QCS S5</td></tr>
<tr><td>Cement type</td><td>SRPC mandatory</td><td>BS EN 197-1</td></tr>
<tr><td>Concrete cover</td><td>75mm minimum on soil / 50mm on blinding</td><td>QCS S5 P3</td></tr>
<tr><td>Dewatering</td><td>Mandatory before any pour</td><td>QCS S5</td></tr>
<tr><td>Waterproofing</td><td>Required below groundwater table</td><td>QCS S5</td></tr>
<tr><td>Founding level approval</td><td>HP — must be signed off by SC before blinding</td><td>QCS S5 P7</td></tr>
</table></div>
</div>
` };
  c["foundations_full"] = { title: '⚓ الأساسات — Foundations',
    titleEn: '🏛️ Foundations — Full Detail', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundations</div>
<h3>📋 Overview</h3>
<p>Foundations in Qatar face challenges from high sulphate levels in soil and groundwater. SRPC is mandatory and minimum cover is 75mm.</p>
<h3>📐 Foundation Types</h3>
<table class="dm-table"><tr><th>Type</th><th>Application</th><th>Concrete Grade</th></tr>
<tr><td>Pad Foundation</td><td>Isolated columns — light loads</td><td>C30–C35</td></tr>
<tr><td>Strip Foundation</td><td>Load-bearing walls</td><td>C30–C35</td></tr>
<tr><td>Raft Foundation</td><td>Heavy loads — weak soil</td><td>C35–C40</td></tr>
<tr><td>Pile Cap</td><td>Above piles</td><td>C35</td></tr></table>
<h3>📐 General Specifications</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Blinding Concrete</td><td>C15 — 75mm thick before rebar placement</td></tr>
<tr><td>Cover</td><td>75mm (direct on soil)</td></tr>
<tr><td>Concrete Grade</td><td>C35 minimum in Qatar (sulphates)</td></tr>
<tr><td>Dewatering</td><td>Mandatory before pouring foundations</td></tr>
<tr><td>Waterproofing</td><td>Mandatory for foundations below GWT</td></tr>
<tr><td>Sulphate Attack Prevention</td><td>SRPC + w/c ≤ 0.45</td></tr></table>
<h3>🔧 Execution Method</h3>
<p><strong>1. Excavation:</strong><br>
• Excavate to required depth + 75mm for Blinding<br>
• Dewatering before any pour<br>
• Visual inspection of soil — no weak soil or Sabkha<br>
• Supervising Consultant approval of founding level</p>
<p><strong>2. Blinding:</strong><br>
• Pour C15 at 75mm thickness<br>
• Wait ≥ 24 hours<br>
• Clean and level before rebar placement</p>
<p><strong>3. Rebar and Formwork:</strong><br>
• 75mm spacers to ensure Cover<br>
• Inspect and document before pour (HP)</p>
<p><strong>4. Pour:</strong><br>
• C35 SRPC minimum<br>
• Slump Test from every truck<br>
• Vibration every 300–450mm</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Founding Level approval by SC<br>
• <strong>HP-02:</strong> Rebar and cover inspection<br>
• <strong>HP-03:</strong> Waterproofing inspection before backfill</p>
</div>
` };
  c["found_raft"] = { title: '⬛ Raft Foundation',
    titleEn: '🏛️ Raft Foundations', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Raft Foundation</div>
<h3>📐 Specifications</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Concrete Grade</td><td>C35–C40 (aggressive environment)</td></tr>
<tr><td>Blinding</td><td>C15 — 100mm thick</td></tr>
<tr><td>Bottom Cover</td><td>75mm</td></tr>
<tr><td>Side Cover</td><td>50mm</td></tr>
<tr><td>Waterproofing</td><td>Full Tanking System</td></tr>
<tr><td>Construction Joints</td><td>Waterstop mandatory</td></tr>
<tr><td>Max Pour Size</td><td>Per Thermal Analysis</td></tr>
</table>
<h3>⚠️ Massive Concrete — Qatar Specific</h3>
<p>• Large thickness = risk of Thermal Cracking<br>
• Thermal Analysis mandatory before pour<br>
• Internal concrete temperature ≤ 70°C<br>
• Temperature differential between core and surface ≤ 20°C<br>
• Use of GGBS reduces heat of hydration<br>
• Monitor with Thermocouples during pour</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Thermal Analysis approved before pour<br>
• <strong>HP-02:</strong> Waterstop approval before pour<br>
• <strong>HP-03:</strong> Temperature monitoring every 4 hours</p>
</div>
` };
  c["found_piles"] = { title: '🕳️ Bored Piles',
    titleEn: '🔩 Piled Foundations', content: `
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
<h3>🔩 Piled Foundations — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Concrete Grade</td><td>Min C30 / Self-compacting preferred</td><td>QCS S5</td></tr>
<tr><td>Slump (Tremie)</td><td>150–200 mm</td><td>QCS S5</td></tr>
<tr><td>Verticality Tolerance</td><td>Max 1:75 deviation</td><td>BS EN 1536</td></tr>
<tr><td>Plan Position</td><td>±75mm from design</td><td>BS EN 1536</td></tr>
<tr><td>Cover (sides)</td><td>Min 50mm to cage</td><td>QCS S5</td></tr>
<tr><td>Cover (top)</td><td>Min 75mm</td><td>QCS S5</td></tr>
<tr><td>Cutoff Level</td><td>Min 600mm above design cutoff</td><td>BS EN 1536</td></tr>
<tr><td>Integrity Test</td><td>100% sonic logging</td><td>BS EN 1536</td></tr>
<tr><td>Static Load Test</td><td>1% piles min 2 per project</td><td>QCS + Geotech</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: Load test results must be approved before pile cap construction. Integrity test failures require investigation + remedial works.
</div>
</div>
` };
  c["piles_full"] = { title: '🔧 الخوازيق — Bored Piles',
    titleEn: '🔩 Piles — Full Detail', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Bored Piles</div>
<h3>📐 Technical Specifications</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Concrete Grade</td><td>C35 SRPC minimum</td><td>QCS S5</td></tr>
<tr><td>w/c</td><td>≤ 0.45</td><td>QCS S5</td></tr>
<tr><td>Slump</td><td>160–220mm (Self Compacting)</td><td>QCS S5</td></tr>
<tr><td>Cover</td><td>75mm</td><td>QCS S5</td></tr>
<tr><td>Verticality</td><td>≤ 1:75 deviation</td><td>QCS S5</td></tr>
<tr><td>Position Tolerance</td><td>≤ 75mm from centreline</td><td>QCS S5</td></tr>
<tr><td>Cut-off Level</td><td>Per design ± 25mm</td><td>QCS S5</td></tr></table>
<h3>🔧 Execution Method</h3>
<p><strong>1. Boring:</strong><br>
• Temporary Casing in soft ground<br>
• Bentonite Slurry to support borehole walls<br>
• Verify depth and base soil type<br>
• Base Cleaning before rebar cage</p>
<p><strong>2. Rebar:</strong><br>
• Pre-assembled Rebar Cage<br>
• Circular Spacers every 2m to ensure Cover<br>
• Lower Cage carefully without disturbing walls</p>
<p><strong>3. Pour:</strong><br>
• Tremie Pipe from base upward<br>
• Continuous pour without interruption<br>
• Concrete level to rise 500mm above Cut-off Level<br>
• Break away excess head after hardening</p>
<h3>🧪 Testing</h3>
<table class="dm-table"><tr><th>Test</th><th>Requirement</th><th>Frequency</th></tr>
<tr><td>PIT (Pile Integrity Test)</td><td>Class A — no defects</td><td>100% of piles</td></tr>
<tr><td>Static Load Test (SLT)</td><td>Settlement ≤ design limit</td><td>1–2% of piles</td></tr>
<tr><td>Cube Test</td><td>fcu ≥ C35</td><td>6 cubes per pile</td></tr>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Base cleanliness check before lowering cage<br>
• <strong>HP-02:</strong> Rebar cage inspection<br>
• <strong>HP-03:</strong> PIT Class A acceptance before Cap Beam</p>
</div>
` };
  c["itp_structural"] = { title: '📋 ITPs الإنشاء — Structural ITPs',
    titleEn: '📋 ITP Structural', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 5 | Structural ITPs</div>
<h3>📌 Select ITP</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('itp_concrete')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Concrete ITP</div></div>
<div onclick="QS.openDetail('itp_rebar')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Rebar ITP</div></div>
<div onclick="QS.openDetail('itp_foundations')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⚓</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Foundations ITP</div></div>
<div onclick="QS.openDetail('itp_piles')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Piles ITP</div></div>
</div>
<div style="margin-top:12px;">
<h3>📐 ITP Legend</h3>
<table class="dm-table"><tr><th>Symbol</th><th>Meaning</th><th>Action Required</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">H</td><td>Hold Point</td><td>Work STOPS — Signed RFI required from SC</td></tr>
<tr><td style="color:#f39c12;font-weight:700;">W</td><td>Witness Point</td><td>SC notified — work continues after reasonable wait</td></tr>
<tr><td style="color:#3498db;font-weight:700;">R</td><td>Review</td><td>Document submitted for SC review</td></tr>
<tr><td>IR</td><td>Inspection Record</td><td>Form filled and filed</td></tr>
</table>
</div>
</div>
` };
  c["itp_foundations"] = { title: '📋 ITP — الأساسات | Foundations',
    titleEn: '📋 ITP Foundations', content: `<div class="lang-content-ar">
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
<h3>🏔️ Foundations — Full ITP</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Check/Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Setting Out</td><td>Survey position vs drawing</td><td>±10mm</td><td>W</td></tr>
<tr><td>Excavation Level</td><td>Survey to formation</td><td>Design depth ±10mm</td><td>H</td></tr>
<tr><td>Ground Conditions</td><td>Visual + geotech confirmation</td><td>Matches design assumptions</td><td>H</td></tr>
<tr><td>Dewatering</td><td>Visual — dry conditions</td><td>No standing water</td><td>W</td></tr>
<tr><td>Anti-Sulphate Measures</td><td>Cement type check</td><td>SRPC if SO3>0.3%</td><td>W</td></tr>
<tr><td>Blinding Concrete</td><td>Thickness + level</td><td>75mm min C10</td><td>W</td></tr>
<tr><td>Waterproofing</td><td>Application + laps</td><td>Continuous, min 150mm laps</td><td>W</td></tr>
<tr><td>Rebar Installation</td><td>Size + spacing + cover</td><td>75mm cover at least</td><td>H</td></tr>
<tr><td>Pre-Pour Inspection</td><td>All elements verified</td><td>Engineer + QC sign-off</td><td>H</td></tr>
<tr><td>Concrete Pour</td><td>Slump + cube samples</td><td>Per mix design</td><td>W</td></tr>
<tr><td>28-day Cubes</td><td>Lab results</td><td>≥fcu specified</td><td>H</td></tr>
</table>
</div>

</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 5 | Foundations</div>
<table class="dm-table"><tr><th>SN</th><th>Activity</th><th>Reference</th><th>Acceptance Criterion</th><th>Frequency</th><th>LAB</th><th>QC</th><th>SC</th><th>Record</th></tr>
<tr><td>1.1</td><td>Excavation Level</td><td>Design Drawing</td><td>Engineer approval of soil condition</td><td>Each foundation</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>1.2</td><td>Dewatering</td><td>QCS S5</td><td>Dry before any pour</td><td>Each foundation</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>1.3</td><td>Blinding Concrete C15</td><td>QCS S5</td><td>75mm thick — level surface</td><td>Each foundation</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Pour Record</td></tr>
<tr><td>1.4</td><td>Rebar &amp; Cover 75mm</td><td>QCS S5</td><td>Cover 75mm + Spacers</td><td>Each foundation</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR</td></tr>
<tr><td>1.5</td><td>Waterproofing</td><td>QCS S5</td><td>Per design — before backfill</td><td>Each foundation</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR</td></tr>
<tr><td>1.6</td><td>Concrete Pour</td><td>QCS S5 P4</td><td>Slump ✓ Temp ≤ 35°C ✓ Cubes ✓</td><td>Each pour</td><td>✓</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Pour Record</td></tr>
<tr><td>1.7</td><td>Curing</td><td>QCS S5 P4</td><td>7 days minimum — wet hessian or compound</td><td>Continuous</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td>—</td><td>Daily Log</td></tr>
<tr><td>1.8</td><td>28-Day Cube Results</td><td>QCS S5 P4</td><td>fcu ≥ design grade</td><td>Per set</td><td>✓</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Lab Report</td></tr>
</table>
</div>
` };
  c["itp_concrete"] = { title: '📋 ITP — الConcrete | Concrete Works',
    titleEn: '📋 ITP Concrete', content: `<div class="lang-content-ar">
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 5 | Concrete Works — Inspection & Test Plan
</div>
<h3>🏗️ Concrete ITP — Full Hold & Witness Points</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test/Inspection</th><th>Acceptance Criteria</th><th>Type</th><th>Ref</th></tr>
<tr><td>Cement</td><td>Mill certificate + fineness</td><td>BS EN 197-1 CEM I/II/III</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Aggregate (Coarse)</td><td>LA Abrasion + Gradation + SO3 + Cl</td><td>LA≤30% / SO3≤0.5%</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Aggregate (Fine)</td><td>Sand equivalent + Gradation</td><td>SE≥60% / QCS S5 Table</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Admixtures</td><td>Technical data sheet + compatibility</td><td>KAHRAMAA/QCS approved</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Mix Design (Trial)</td><td>Trial mixes — 3 batches</td><td>fcu + workability achieved</td><td>H</td><td>QCS S5</td></tr>
<tr><td>Batching Plant</td><td>Calibration certificates</td><td>Valid certification</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Formwork Inspection</td><td>Alignment + level + seal + support</td><td>±5mm alignment</td><td>H</td><td>QCS S5</td></tr>
<tr><td>Rebar Inspection</td><td>Size + spacing + cover + laps</td><td>Per drawing ±10mm cover</td><td>H</td><td>QCS S5</td></tr>
<tr><td>Pre-Pour Checklist</td><td>All items verified</td><td>Engineer + QC written sign-off</td><td>H</td><td>QCS S5</td></tr>
<tr><td>Slump Test</td><td>Each delivery truck</td><td>Design range ±25mm</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Fresh Concrete Temp</td><td>Each delivery (hot weather)</td><td>≤35°C</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Cube Sampling</td><td>1 set (3 cubes) per 50m³ min 1/day</td><td>—</td><td>W</td><td>QCS S5</td></tr>
<tr><td>7-day Cube</td><td>Lab crush test</td><td>≥70% of fcu (monitoring)</td><td>W</td><td>QCS S5</td></tr>
<tr><td>28-day Cube</td><td>Lab crush test</td><td>≥fcu as designed</td><td>H</td><td>QCS S5</td></tr>
<tr><td>Curing Method</td><td>Visual inspection</td><td>Minimum 7 days moist</td><td>W</td><td>QCS S5</td></tr>
<tr><td>Formwork Striking</td><td>Cube results + age verification</td><td>Engineer written approval</td><td>H</td><td>QCS S5</td></tr>
<tr><td>Surface Finish</td><td>Visual + dimension check</td><td>No honeycombing / ±5mm</td><td>W</td><td>QCS S5</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:8px;">H = Hold Point (no work proceeds without approval) | W = Witness Point (engineer notified) | QCS 2024 Section 5</div>
</div>
` };
  c["fire"] = { title: '🔥 الحريق والسلامة — QCDD',
    titleEn: '🔥 Fire Resistance', content: `
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
<h3>🔥 Fire Safety — QCS 2024 & QCDD Requirements</h3>
<table class="dm-table">
<tr><th>Element</th><th>Requirement</th><th>Authority</th></tr>
<tr><td>Fire Rating — External Walls</td><td>Min 1-hr (residential) / 2-hr (commercial)</td><td>QCS S18 / QCDD</td></tr>
<tr><td>Escape Route Width</td><td>Min 1.0m (≤50p) / 1.4m (>50p)</td><td>QCS S18</td></tr>
<tr><td>Travel Distance</td><td>≤18m to exit (no sprinkler)</td><td>QCS S18</td></tr>
<tr><td>Emergency Lighting</td><td>Min 1 lux at floor / 3hr battery</td><td>QCDD</td></tr>
<tr><td>Fire Alarm (L1 System)</td><td>All occupied buildings</td><td>QCDD</td></tr>
<tr><td>Sprinklers Required</td><td>>4 floors or height >14m</td><td>QCDD</td></tr>
<tr><td>Fire Hose Reel</td><td>Max 30m reach / 25mm hose</td><td>QCS S18</td></tr>
<tr><td>Fire Hydrant</td><td>Max 60m from building / 100mm dia</td><td>QCDD</td></tr>
<tr><td>Escape Doors</td><td>Open in direction of travel / 30-min FR</td><td>QCS S18</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
⚠️ All fire designs need QCDD approval before construction. Completion certificate requires QCDD final inspection.
</div>
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
` };
  c["materials"] = { title: '🧱 مواد البناء والمنتجات',
    titleEn: '🧱 Structural Materials', content: `
<div class="lang-content-ar">
<h3>المواصفات الأساسية</h3><table class="dm-table"><tr><th>المادة</th><th>المعيار</th><th>الملاحظة</th></tr><tr><td>الأسمنت</td><td>BS EN 197-1</td><td>مقاوم للكبريتات</td></tr><tr><td>الRebar</td><td>BS 4449</td><td>درجة 500B</td></tr><tr><td>الConcrete</td><td>QCS-2024</td><td>نسبة ماء/أسمنت ≤ 0.45</td></tr><tr><td>الطوب</td><td>BS EN 771</td><td>مقاومة ≥ 7 N/mm²</td></tr></table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🧱 مواد البناء والمنتجات
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<h3>Basic Specifications</h3>
<table class="dm-table"><tr><th>Material</th><th>Standard</th><th>Note</th></tr>
<tr><td>Cement</td><td>BS EN 197-1</td><td>Sulphate Resisting (SRPC) mandatory</td></tr>
<tr><td>Rebar</td><td>BS 4449</td><td>Grade 500B</td></tr>
<tr><td>Concrete</td><td>QCS-2024</td><td>Water/Cement Ratio ≤ 0.45</td></tr>
<tr><td>Blockwork</td><td>BS EN 771</td><td>Compressive Strength ≥ 7 N/mm²</td></tr></table>
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
` };

  // ─── Phase 4 additions ───────────────────────────────────────────────────

  c["concrete_phases"] = { title: '📅 مراحل الصب — Concrete Pouring Phases',
    titleEn: '📊 Concrete Pouring Phases', content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;">
📌 QCS 2024 Section 5 | مراحل الصب وإجراءات الضبط
</div>

<h3>📋 مراحل الصب — Hold & Witness Points</h3>
<table class="dm-table">
<thead><tr><th>#</th><th>المرحلة</th><th>الإجراء</th><th>النوع</th><th>المسؤول</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>1</td><td>فحص الحديد قبل الصب</td><td>Cover، Spacing، Ties، Laps — كاملة</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>QC Inspector</td><td>S5 P3</td></tr>
<tr><td>2</td><td>فحص الشدة والقوالب</td><td>تنظيف، تشحيم، إحكام الوصلات</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Engineer</td><td>S5 P5</td></tr>
<tr><td>3</td><td>فحص النظافة قبل الصب</td><td>إزالة المياه المتجمعة والمخلفات</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>Engineer</td><td>S5 P4</td></tr>
<tr><td>4</td><td>استلام شاحنة الخرسانة</td><td>Delivery Note، Slump، Temp قبل الصب</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>QC Inspector</td><td>S5 P4</td></tr>
<tr><td>5</td><td>الصب والدمك</td><td>Vibrator كل 300-450mm، عدم التأخير</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Inspector</td><td>S5 P4</td></tr>
<tr><td>6</td><td>أخذ العينات (Cubes)</td><td>1 Set / 50m³ — 3 مكعبات / Set</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Lab Tech</td><td>S5 P4</td></tr>
<tr><td>7</td><td>بدء المعالجة (Curing)</td><td>فور الانتهاء — مياه أو compound</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>Contractor</td><td>S5 P4</td></tr>
<tr><td>8</td><td>نتائج 7 أيام</td><td>≥ 70% fcu — Report للاستشاري</td><td><span style="color:#3498db;font-weight:700;">RP</span></td><td>Lab / QC</td><td>S5 P4</td></tr>
<tr><td>9</td><td>نتائج 28 يوم</td><td>≥ 100% fcu — Release Certificate</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>Engineer</td><td>S5 P4</td></tr>
<tr><td>10</td><td>فك الشدة</td><td>حسب الجدول الزمني — بعد اعتماد Cubes</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>Engineer</td><td>S5 P5</td></tr>
</tbody>
</table>

<h3>⏱️ جدول الحد الأدنى لفك الشدة — Striking Times</h3>
<table class="dm-table">
<thead><tr><th>العنصر</th><th>OPC عادي</th><th>درجة حرارة > 30°C</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>Sides of Beams / Columns</td><td>24-48 ساعة</td><td>16-24 ساعة</td><td>S5 P5</td></tr>
<tr><td>Soffit of Slabs (Span ≤ 4.5m)</td><td>10 أيام</td><td>7 أيام</td><td>S5 P5</td></tr>
<tr><td>Soffit of Slabs (Span > 4.5m)</td><td>14 أيام</td><td>10 أيام</td><td>S5 P5</td></tr>
<tr><td>Soffit of Beams (Span ≤ 6m)</td><td>14 أيام</td><td>10 أيام</td><td>S5 P5</td></tr>
<tr><td>Soffit of Beams (Span > 6m)</td><td>21 أيام</td><td>14 أيام</td><td>S5 P5</td></tr>
<tr><td>Props under Slabs</td><td>حسب الحمل — لا يُفك قبل 7 أيام Cube</td><td>—</td><td>S5 P5</td></tr>
</tbody>
</table>

<h3>🧪 حدود قبول الخرسانة — Acceptance Criteria</h3>
<table class="dm-table">
<thead><tr><th>الاختبار</th><th>الحد المقبول</th><th>الرفض</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>Slump Test</td><td>المستهدف ± 25mm</td><td>خارج ± 25mm → رفض الشاحنة</td><td>S5 P4</td></tr>
<tr><td>Temperature عند الاستلام</td><td>≤ 35°C (Qatar)</td><td>> 35°C → رفض فوري</td><td>S5 P4</td></tr>
<tr><td>وقت النقل</td><td>≤ 90 دقيقة</td><td>> 90 دقيقة → رفض</td><td>S5 P4</td></tr>
<tr><td>7-Day Cube</td><td>≥ 70% fcu</td><td>< 70% → تحقيق فوري + Core Test</td><td>S5 P4</td></tr>
<tr><td>28-Day Cube</td><td>≥ fcu المصمم</td><td>< fcu → Core Test → قد يستلزم هدم</td><td>S5 P4</td></tr>
<tr><td>Core Test (إذا فشل Cube)</td><td>≥ 0.85 × fcu</td><td>< 0.85 → تقرير هندسي خاص</td><td>S5 P4</td></tr>
</tbody>
</table>

<div class="dm-note">📌 HP = Hold Point (لا يمكن المتابعة بدون توقيع المفتش) | WP = Witness Point | RP = Review Point</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📅 Concrete Pouring Phases
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;">
📌 QCS 2024 Section 5 | Concrete Pour Phases and Control Procedures
</div>
<h3>📋 Pour Phases — Hold &amp; Witness Points</h3>
<table class="dm-table">
<thead><tr><th>#</th><th>Phase</th><th>Action</th><th>Type</th><th>Responsible</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>1</td><td>Rebar inspection before pour</td><td>Cover, Spacing, Ties, Laps — complete check</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>QC Inspector</td><td>S5 P3</td></tr>
<tr><td>2</td><td>Formwork and shutter inspection</td><td>Clean, oiled, joints tight</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Engineer</td><td>S5 P5</td></tr>
<tr><td>3</td><td>Cleanliness check before pour</td><td>Remove standing water and debris</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>Engineer</td><td>S5 P4</td></tr>
<tr><td>4</td><td>Concrete truck acceptance</td><td>Delivery Note, Slump, Temp before unloading</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>QC Inspector</td><td>S5 P4</td></tr>
<tr><td>5</td><td>Placing and vibration</td><td>Vibrator every 300–450mm, no delay between layers</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Inspector</td><td>S5 P4</td></tr>
<tr><td>6</td><td>Cube sampling</td><td>1 Set / 50m³ — 3 cubes per Set</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Lab Tech</td><td>S5 P4</td></tr>
<tr><td>7</td><td>Curing start</td><td>Within 30 min of pour — wet hessian or curing compound</td><td><span style="color:#f39c12;font-weight:700;">WP</span></td><td>Inspector</td><td>S5 P4</td></tr>
<tr><td>8</td><td>7-Day cube results</td><td>Monitor only — not for acceptance</td><td><span style="color:#3498db;font-weight:700;">R</span></td><td>QC</td><td>S5 P4</td></tr>
<tr><td>9</td><td>28-Day cube results</td><td>fcu ≥ design grade — formal acceptance</td><td><span style="color:#e74c3c;font-weight:700;">HP</span></td><td>QC + SC</td><td>S5 P4</td></tr>
</tbody>
</table>
<h3>🌡️ Hot Weather Protocol (Qatar)</h3>
<table class="dm-table">
<tr><th>Condition</th><th>Mandatory Action</th><th>QCS</th></tr>
<tr><td>Ambient &gt; 35°C</td><td>Night pour only — start after sunset</td><td>S5 P4 Cl.4.8</td></tr>
<tr><td>Concrete temp &gt; 35°C</td><td>Reject truck — no exceptions</td><td>S5 P4</td></tr>
<tr><td>Any hot weather pour</td><td>Ice instead of mixing water (up to 50%)</td><td>S5 P4</td></tr>
<tr><td>Mass concrete</td><td>Thermal Analysis + Thermocouple monitoring</td><td>S5 P4</td></tr>
</table>
<h3>Concrete Pour — Key Hold Points</h3>
<table class="dm-table">
<thead><tr><th>Stage</th><th>Activity</th><th>Point Type</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>Pre-Pour</td><td>Rebar inspection (cover, spacing, laps)</td><td><strong style="color:#e74c3c;">HP</strong></td><td>S5 P3</td></tr>
<tr><td>Pre-Pour</td><td>Formwork inspection (clean, sealed, oiled)</td><td><strong style="color:#f39c12;">WP</strong></td><td>S5 P5</td></tr>
<tr><td>On Delivery</td><td>Slump, temp ≤ 35°C, transit time ≤ 90 min</td><td><strong style="color:#e74c3c;">HP</strong></td><td>S5 P4</td></tr>
<tr><td>During Pour</td><td>Vibration, layer thickness 300-450mm</td><td><strong style="color:#f39c12;">WP</strong></td><td>S5 P4</td></tr>
<tr><td>Post-Pour</td><td>Immediate curing start</td><td><strong style="color:#e74c3c;">HP</strong></td><td>S5 P4</td></tr>
<tr><td>28 days</td><td>Cube results ≥ fcu → Release</td><td><strong style="color:#e74c3c;">HP</strong></td><td>S5 P4</td></tr>
</tbody>
</table>
</div>
` };

  c["rebar_itp"] = { title: '🔩 ITP الحديد — Rebar Inspection',
    titleEn: '📋 ITP Reinforcement', content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;">
📌 QCS 2024 Section 5 Part 3 | BS 8110 | فحص حديد التسليح
</div>

<h3>📋 قائمة فحص الحديد — Rebar Checklist</h3>
<table class="dm-table">
<thead><tr><th>البند</th><th>المتطلب</th><th>الطريقة</th><th>القرار</th><th>QCS</th></tr></thead>
<tbody>
<tr><td><strong>نوع الحديد</strong></td><td>B460B / B500B — High Yield Deformed</td><td>Mill Certificate</td><td>قبول / رفض</td><td>S5 P3</td></tr>
<tr><td><strong>قطر الأسياخ</strong></td><td>حسب الرسومات ± 2mm</td><td>Vernier Caliper</td><td>قبول / رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Cover — داخلي</strong></td><td>25mm minimum</td><td>Cover Meter</td><td>< 20mm → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Cover — خارجي عادي</strong></td><td>40mm minimum</td><td>Cover Meter</td><td>< 35mm → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Cover — بيئة عدوانية</strong></td><td>50mm minimum</td><td>Cover Meter</td><td>< 45mm → رفض</td><td>S5 P3 Qatar</td></tr>
<tr><td><strong>Cover — Sabkha</strong></td><td>60mm minimum</td><td>Cover Meter</td><td>< 55mm → رفض</td><td>IAN-006</td></tr>
<tr><td><strong>Spacing — Main Bars</strong></td><td>حسب الرسومات ± 10mm</td><td>Tape Measure</td><td>قبول / رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Lap Length — Tension</strong></td><td>40φ minimum</td><td>Tape Measure</td><td>< 38φ → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Lap Length — Compression</strong></td><td>32φ minimum</td><td>Tape Measure</td><td>< 30φ → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Ties / Stirrups</strong></td><td>135° Hooks — مشدودة</td><td>Visual</td><td>90° → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Spacers / Chairs</strong></td><td>Plastic — مناسبة للCover</td><td>Visual</td><td>خشب أو حجر → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>حالة الحديد</strong></td><td>بدون طين أو شحوم أو صدأ ثقيل</td><td>Visual</td><td>طين/شحوم → رفض</td><td>S5 P3</td></tr>
<tr><td><strong>Continuity</strong></td><td>لا انقطاعات غير مسموحة</td><td>Visual + Drawings</td><td>قبول / رفض</td><td>S5 P3</td></tr>
</tbody>
</table>

<h3>📏 Lap Length — جدول مرجعي</h3>
<table class="dm-table">
<thead><tr><th>قطر الحديد (φ)</th><th>Lap Tension (40φ)</th><th>Lap Compression (32φ)</th><th>الملاحظة</th></tr></thead>
<tbody>
<tr><td>T10 (10mm)</td><td>400mm</td><td>320mm</td><td>—</td></tr>
<tr><td>T12 (12mm)</td><td>480mm</td><td>384mm</td><td>—</td></tr>
<tr><td>T16 (16mm)</td><td>640mm</td><td>512mm</td><td>—</td></tr>
<tr><td>T20 (20mm)</td><td>800mm</td><td>640mm</td><td>شائع في الأعمدة</td></tr>
<tr><td>T25 (25mm)</td><td>1000mm</td><td>800mm</td><td>أعمدة رئيسية</td></tr>
<tr><td>T32 (32mm)</td><td>1280mm</td><td>1024mm</td><td>Heavy sections</td></tr>
</tbody>
</table>

<h3>🔴 Hold Points — فحص الحديد</h3>
<table class="dm-table">
<thead><tr><th>HP</th><th>الوصف</th><th>الشرط</th></tr></thead>
<tbody>
<tr><td><strong>HP-R01</strong></td><td>فحص شهادات المصنع (Mill Certs)</td><td>قبل التخزين في الموقع</td></tr>
<tr><td><strong>HP-R02</strong></td><td>فحص التسليح قبل الصب (Rebar Inspection)</td><td>Cover + Spacing + Laps + Ties كاملة</td></tr>
<tr><td><strong>HP-R03</strong></td><td>اختبار الشد (Tensile Test)</td><td>لكل 50 طن أو دفعة مصنع جديدة</td></tr>
</tbody>
</table>

<div class="dm-note">📌 Cover Meter فحص غير مدمر يستخدم بعد الصب للتحقق من الغطاء الفعلي — يُوصى به في المشاريع الكبيرة</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;">
📌 QCS 2024 Section 5 Part 3 | BS 8110 | Rebar Inspection ITP
</div>
<h3>📋 Rebar Inspection Checklist — ITP</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th><th>Method</th><th>Decision</th><th>QCS</th></tr></thead>
<tbody>
<tr><td><strong>Rebar Grade</strong></td><td>B460B / B500B — High Yield Deformed</td><td>Mill Certificate</td><td>Accept / Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Bar Diameter</strong></td><td>As drawings ± 2mm</td><td>Vernier Caliper</td><td>Accept / Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Cover — Internal</strong></td><td>25mm minimum</td><td>Cover Meter</td><td>&lt; 20mm → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Cover — External (normal)</strong></td><td>40mm minimum</td><td>Cover Meter</td><td>&lt; 35mm → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Cover — Aggressive Env.</strong></td><td>50mm minimum</td><td>Cover Meter</td><td>&lt; 45mm → Reject</td><td>S5 P3 Qatar</td></tr>
<tr><td><strong>Cover — Sabkha Soil</strong></td><td>60mm minimum</td><td>Cover Meter</td><td>&lt; 55mm → Reject</td><td>IAN-006</td></tr>
<tr><td><strong>Spacing — Main Bars</strong></td><td>As drawings ± 10mm</td><td>Tape Measure</td><td>Accept / Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Lap Length — Tension</strong></td><td>40φ minimum</td><td>Tape Measure</td><td>&lt; 38φ → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Lap Length — Compression</strong></td><td>32φ minimum</td><td>Tape Measure</td><td>&lt; 30φ → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Ties / Stirrups</strong></td><td>135° Hooks — fully tied</td><td>Visual</td><td>90° hooks → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Spacers / Chairs</strong></td><td>Plastic — correct size for cover</td><td>Visual</td><td>Timber/stone → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Bar Condition</strong></td><td>No mud, grease, or heavy rust</td><td>Visual</td><td>Mud/grease → Reject</td><td>S5 P3</td></tr>
<tr><td><strong>Continuity</strong></td><td>No unauthorized breaks</td><td>Visual + Drawings</td><td>Accept / Reject</td><td>S5 P3</td></tr>
</tbody>
</table>
<h3>📏 Lap Length Reference Table</h3>
<table class="dm-table">
<thead><tr><th>Bar Dia. (φ)</th><th>Lap Tension (40φ)</th><th>Lap Compression (32φ)</th><th>Note</th></tr></thead>
<tbody>
<tr><td>T10 (10mm)</td><td>400mm</td><td>320mm</td><td>—</td></tr>
<tr><td>T12 (12mm)</td><td>480mm</td><td>384mm</td><td>—</td></tr>
<tr><td>T16 (16mm)</td><td>640mm</td><td>512mm</td><td>—</td></tr>
<tr><td>T20 (20mm)</td><td>800mm</td><td>640mm</td><td>Common in columns</td></tr>
<tr><td>T25 (25mm)</td><td>1000mm</td><td>800mm</td><td>Main columns</td></tr>
<tr><td>T32 (32mm)</td><td>1280mm</td><td>1024mm</td><td>Heavy sections</td></tr>
</tbody>
</table>
<h3>🔴 Hold Points — Rebar Inspection</h3>
<table class="dm-table">
<thead><tr><th>HP</th><th>Description</th><th>Condition</th></tr></thead>
<tbody>
<tr><td><strong>HP-R01</strong></td><td>Review Mill Certificates</td><td>Before site storage</td></tr>
<tr><td><strong>HP-R02</strong></td><td>Pre-pour Rebar Inspection</td><td>Cover + Spacing + Laps + Ties all complete</td></tr>
<tr><td><strong>HP-R03</strong></td><td>Tensile Test</td><td>Every 50 tonnes or new batch</td></tr>
</tbody>
</table>
<div class="dm-note">📌 Cover Meter (non-destructive test) used post-pour to verify actual cover — recommended for major projects</div>
</div>

` };

  c["hot_weather_concreting"] = { title: '🌡️ الصب في الجو الحار — Hot Weather Concreting',
    titleEn: '🌡️ Hot Weather Concreting', content: `
<div class="lang-content-ar">
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;">
⚠️ QCS 2024 Section 5 Part 4 | Ashghal Practice | الصب في الجو الحار — قطر
</div>

<h3>🌡️ حدود درجات الحرارة — Temperature Limits</h3>
<table class="dm-table">
<thead><tr><th>المعيار</th><th>الحد</th><th>الإجراء عند التجاوز</th><th>QCS</th></tr></thead>
<tbody>
<tr><td><strong>Max temp الخرسانة عند الصب</strong></td><td>35°C</td><td>رفض الشاحنة — لا استثناء</td><td>S5 P4</td></tr>
<tr><td><strong>Max temp بعد الخلط (بالمصنع)</strong></td><td>30°C</td><td>ثلج أو ماء بارد</td><td>S5 P4</td></tr>
<tr><td><strong>Min temp للصب</strong></td><td>10°C</td><td>حماية حرارية + سخانات</td><td>S5 P4</td></tr>
<tr><td><strong>Differential Temp (Mass Concrete)</strong></td><td>≤ 20°C</td><td>Thermal plan إلزامي</td><td>S5 P4</td></tr>
<tr><td><strong>Max Ambient Temp للعمل</strong></td><td>40°C (Qatar)</td><td>تأجيل الصب</td><td>Ashghal</td></tr>
</tbody>
</table>

<h3>🧊 إجراءات التبريد — Cooling Procedures</h3>
<table class="dm-table">
<thead><tr><th>الإجراء</th><th>التفاصيل</th><th>الهدف</th><th>الفعالية</th></tr></thead>
<tbody>
<tr><td><strong>ثلج بدلاً من الماء</strong></td><td>استبدال 50-100% من ماء الخلط بثلج</td><td>تخفيض 10-15°C</td><td>⭐⭐⭐⭐⭐</td></tr>
<tr><td><strong>تبريد الركام</strong></td><td>تغطية وبل الركام بالماء قبل الخلط</td><td>تخفيض 3-5°C</td><td>⭐⭐⭐</td></tr>
<tr><td><strong>تبريد الإسمنت</strong></td><td>تخزين في ظل + تهوية الصوامع</td><td>تخفيض 2-3°C</td><td>⭐⭐</td></tr>
<tr><td><strong>نيتروجين سائل (LN₂)</strong></td><td>حقن في الخلاط — للمشاريع الكبرى</td><td>تخفيض 15-20°C</td><td>⭐⭐⭐⭐⭐</td></tr>
<tr><td><strong>Retarder</strong></td><td>ASTM C494 Type B/D — يحتاج اعتماد</td><td>تأخير الشك 2-4 ساعات</td><td>⭐⭐⭐⭐</td></tr>
<tr><td><strong>Anti-Evaporation Spray</strong></td><td>رش فوري بعد الصب — قبل الرياح</td><td>منع التشقق الناتج عن التبخر</td><td>⭐⭐⭐⭐</td></tr>
</tbody>
</table>

<h3>⏰ توقيت الصب — Pouring Schedule (قطر)</h3>
<table class="dm-table">
<thead><tr><th>الفصل</th><th>الأشهر</th><th>وقت الصب الموصى به</th><th>الملاحظة</th></tr></thead>
<tbody>
<tr><td>الشتاء</td><td>نوفمبر — مارس</td><td>أي وقت مناسب</td><td>درجات مناسبة</td></tr>
<tr><td>الربيع</td><td>أبريل — مايو</td><td>قبل 10 صباحاً أو بعد 4 عصراً</td><td>مراقبة درجة الحرارة</td></tr>
<tr><td>الصيف (الذروة)</td><td>يونيو — سبتمبر</td><td>بعد 8 مساءً أو قبل 6 صباحاً</td><td>⚠️ صب ليلي شبه إلزامي</td></tr>
<tr><td>الخريف</td><td>أكتوبر</td><td>قبل 10 صباحاً أو بعد 5 عصراً</td><td>رطوبة عالية — انتبه</td></tr>
</tbody>
</table>

<h3>💧 المعالجة في الجو الحار — Hot Weather Curing</h3>
<table class="dm-table">
<thead><tr><th>الطريقة</th><th>المدة</th><th>ملاحظات قطر</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>Wet Burlap + Polythene</td><td>7 أيام min</td><td>الأفضل في درجات عالية</td><td>S5 P4</td></tr>
<tr><td>Curing Compound</td><td>تطبيق فوري — طبقة واحدة</td><td>لا في الرياح الشديدة</td><td>S5 P4</td></tr>
<tr><td>Water Spray / Ponding</td><td>7 أيام — 2-3 مرات/يوم</td><td>مياه عذبة فقط</td><td>S5 P4</td></tr>
<tr><td>Steam Curing</td><td>Precast فقط — حسب الجدول</td><td>لا يُستخدم في الموقع</td><td>S5 P4</td></tr>
</tbody>
</table>

<h3>📋 Thermal Control Plan — Mass Concrete</h3>
<table class="dm-table">
<thead><tr><th>البند</th><th>المتطلب</th><th>QCS</th></tr></thead>
<tbody>
<tr><td>تعريف Mass Concrete</td><td>سُمك ≥ 600mm أو كميات كبيرة تُولد حرارة إماهة عالية</td><td>S5 P4</td></tr>
<tr><td>Max Core Temp</td><td>≤ 70°C (داخل العنصر)</td><td>S5 P4</td></tr>
<tr><td>Max Differential Temp</td><td>≤ 20°C (Core vs Surface)</td><td>S5 P4</td></tr>
<tr><td>Thermocouples</td><td>مدفونة في المركز والأطراف</td><td>S5 P4</td></tr>
<tr><td>GGBS Replacement</td><td>50-70% لتقليل حرارة الإماهة</td><td>S5 P4</td></tr>
</tbody>
</table>

<div class="dm-note">⚠️ في قطر: درجة الحرارة الصيفية تتجاوز 45°C — الصب الليلي مع الثلج وRetarder معتمد هو الممارسة الأساسية للمشاريع الكبرى</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🌡️ Hot Weather Concreting — Qatar
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below.</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;">
⚠️ QCS 2024 Section 5 Part 4 | Ashghal Practice | Hot Weather Concreting — Qatar
</div>
<h3>🌡️ Temperature Limits</h3>
<table class="dm-table">
<thead><tr><th>Parameter</th><th>Limit</th><th>Action if Exceeded</th><th>QCS</th></tr></thead>
<tbody>
<tr><td><strong>Max concrete temp at pour point</strong></td><td>35°C</td><td>Reject truck — no exceptions</td><td>S5 P4</td></tr>
<tr><td><strong>Max temp after mixing (at plant)</strong></td><td>30°C</td><td>Add ice or chilled water</td><td>S5 P4</td></tr>
<tr><td><strong>Min temp for concreting</strong></td><td>10°C</td><td>Thermal protection + heaters</td><td>S5 P4</td></tr>
<tr><td><strong>Differential Temp (Mass Concrete)</strong></td><td>≤ 20°C</td><td>Thermal plan mandatory</td><td>S5 P4</td></tr>
<tr><td><strong>Max Ambient Temp for work</strong></td><td>40°C (Qatar)</td><td>Delay pour</td><td>Ashghal</td></tr>
</tbody>
</table>
<h3>🧊 Cooling Procedures</h3>
<table class="dm-table">
<thead><tr><th>Procedure</th><th>Details</th><th>Temp Reduction</th><th>Effectiveness</th></tr></thead>
<tbody>
<tr><td><strong>Ice instead of water</strong></td><td>Replace 50–100% of mixing water with ice</td><td>10–15°C reduction</td><td>⭐⭐⭐⭐⭐</td></tr>
<tr><td><strong>Aggregate cooling</strong></td><td>Cover and wet aggregate before mixing</td><td>3–5°C reduction</td><td>⭐⭐⭐</td></tr>
<tr><td><strong>Cement cooling</strong></td><td>Store in shaded silos — avoid direct sunlight</td><td>2–3°C reduction</td><td>⭐⭐</td></tr>
<tr><td><strong>Truck washing</strong></td><td>Wet truck drum before loading</td><td>1–2°C reduction</td><td>⭐⭐</td></tr>
<tr><td><strong>Night pour</strong></td><td>Start after sunset — most effective in Qatar</td><td>5–10°C ambient</td><td>⭐⭐⭐⭐⭐</td></tr>
</tbody>
</table>
<h3>⏱️ Timing and Planning</h3>
<table class="dm-table">
<tr><th>Item</th><th>Qatar Requirement</th></tr>
<tr><td>Summer hours (June–Aug)</td><td>Night pours only — stop by 08:00</td></tr>
<tr><td>Max haul time</td><td>45 min summer / 60 min other months</td></tr>
<tr><td>Curing start</td><td>Within 20 min of finishing (hot weather)</td></tr>
<tr><td>Minimum curing duration</td><td>10 days (T &gt; 30°C) / 14 days (T &gt; 40°C)</td></tr>
<tr><td>Standby ice supply</td><td>Mandatory at site during summer pours</td></tr>
</table>
<h3>🌡️ Hot Weather Limits — Qatar (QCS 2024)</h3>
<table class="dm-table">
<thead><tr><th>Parameter</th><th>Limit</th><th>Action if Exceeded</th></tr></thead>
<tbody>
<tr><td>Max concrete temp at point of delivery</td><td>35°C</td><td>Reject load — no exceptions</td></tr>
<tr><td>Max ambient temp for pouring</td><td>40°C</td><td>Defer pour — night works</td></tr>
<tr><td>Differential temp (Mass Concrete)</td><td>≤ 20°C core vs surface</td><td>Thermal control plan required</td></tr>
<tr><td>Recommended pour window (Summer)</td><td>8 PM – 6 AM</td><td>Ice + approved retarder mandatory</td></tr>
</tbody>
</table>
</div>
` };

// ── Missing ITP stubs (used in SECTION_MAP breadcrumb/nav) ──
c["itp_rebar"] = { title: '📋 ITP — تسليح الخرسانة',
    titleEn: '📋 ITP Rebar', content: c["rebar_itp"] ? c["rebar_itp"].content : c["itp_structural"].content };
c["itp_piles"] = { title: '📋 ITP — الخوازيق',
    titleEn: '📋 ITP Piles', content: c["itp_foundations"] ? c["itp_foundations"].content : c["itp_structural"].content };

})();

