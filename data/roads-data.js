// QatarSpec Pro — roads data chunk v1.7.7
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
<h3>🪨 What is Gabbro?</h3>
<p>Gabbro is a crystalline igneous rock quarried primarily from the UAE (Fujairah area). It is the primary aggregate used in Qatar for all road layers and concrete due to its high hardness and abrasion resistance.</p>
<h3>Gabbro Specifications by Application</h3>
<table class="dm-table">
<tr><th>Property</th><th>Subbase</th><th>Base Course</th><th>Asphalt WC</th><th>Asphalt BC</th><th>Test</th></tr>
<tr><td>LA Abrasion</td><td>≤ 40%</td><td>≤ 30%</td><td>≤ 25%</td><td>≤ 30%</td><td>ASTM C131</td></tr>
<tr><td>Flakiness Index</td><td>≤ 40%</td><td>≤ 30%</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>Fractured Faces (1+)</td><td>≥ 25%</td><td>≥ 75%</td><td>≥ 95%</td><td>≥ 90%</td><td>ASTM D5821</td></tr>
<tr><td>PSV</td><td>—</td><td>—</td><td>≥ 55</td><td>—</td><td>BS 812 P114</td></tr>
<tr><td>Water Absorption</td><td>≤ 3%</td><td>≤ 2%</td><td>≤ 2%</td><td>≤ 2%</td><td>ASTM C127</td></tr>
<tr><td>Soundness MgSO4</td><td>≤ 18%</td><td>≤ 12%</td><td>≤ 12%</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>Specific Gravity SSD</td><td>≥ 2.4</td><td>≥ 2.5</td><td>≥ 2.5</td><td>≥ 2.5</td><td>ASTM C127</td></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.5%</td><td>≤ 0.5%</td><td>≤ 0.4%</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
</table>
<h3>Conformity Certificate Requirements</h3>
<p>Every Gabbro delivery must include: QGOS Conformity Certificate (valid ≤12 months) + Lab analysis (LA + Flakiness + Fractured Faces + Absorption + Sulphate) + Approved MAR before use.</p>
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

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 | Road Works | Ashghal Standards
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

<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span>🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Subgrade Preparation Video</span></div>
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 Reference | 🪨 Road Base — QCS S6 P4</div>
<p style="color:var(--text2);font-size:13px;">Switch to Arabic for full detailed content, tables and ITP checklists. All numerical values and test methods apply universally.</p>
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 Reference | 🛢️ Prime Coat — QCS S6 P5</div>
<p style="color:var(--text2);font-size:13px;">Switch to Arabic for full detailed content, tables and ITP checklists. All numerical values and test methods apply universally.</p>
</div>
` },
binder: { title: '⚫ Binder Course', content: `

<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Binder Course — طبقة الرابطة الإسفلتية</span>
<button onclick="document.getElementById('vid-binder-new').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-binder-new" accept="video/*" style="display:none" data-player="vid-binder-new-p" data-ph="vid-binder-new-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-binder-new-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-binder-new-p" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<h3>📐 تعريف Binder Course — QCS S6 P5</h3>
<p>Binder Course (طبقة الرابطة) هي أول طبقة إسفلتية تُفرش فوق الـ Prime Coat/Tack Coat. وظيفتها توزيع الأحمال المرورية وتوفير سطح مستوٍ لطبقة الـ Wearing Course. تُستخدم خلطة إسفلت ساخنة (HMA) بتدرج Type BC-A أو BC-B حسب تصنيف الطريق. السماكة المعتادة 60mm–80mm مدموكة. البيتومين 60/70 Pen Grade.</p>

<h3>⚠️ المواد غير المقبولة</h3>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:12px;">
<strong>يُرفض الإسفلت في الحالات:</strong><br>
• درجة حرارة الخلطة عند الوصول &lt; 135°C (Non-PMB) أو &lt; 145°C (PMB)<br>
• Marshall Stability &lt; 8 kN<br>
• Marshall Flow &lt; 2mm أو &gt; 4mm<br>
• Air Voids &lt; 3% أو &gt; 5% (في العينات المختبرية)<br>
• VMA أقل من الحد الأدنى حسب Nominal Max Size<br>
• نسبة البيتومين خارج التصميم المعتمد ± 0.3%<br>
• ركام LA Abrasion &gt; 30% أو Soundness &gt; 12%<br>
• Segregation ظاهر أو Temperature below spec
</div>

<h3>📐 جدول التدرج — Binder Course BC-A — QCS S6 P5 Table 5:6</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Sieve Size</th><th>% Passing BC-A<br>(Nominal 25mm)</th><th>% Passing BC-B<br>(Nominal 19mm)</th></tr>
<tr><td>37.5 mm</td><td>100</td><td>—</td></tr>
<tr><td>25.0 mm</td><td>90 – 100</td><td>100</td></tr>
<tr><td>19.0 mm</td><td>72 – 90</td><td>90 – 100</td></tr>
<tr><td>12.5 mm</td><td>56 – 80</td><td>56 – 80</td></tr>
<tr><td>9.5 mm</td><td>46 – 70</td><td>46 – 70</td></tr>
<tr><td>4.75 mm</td><td>29 – 55</td><td>29 – 55</td></tr>
<tr><td>2.36 mm</td><td>18 – 38</td><td>18 – 38</td></tr>
<tr><td>0.3 mm</td><td>5 – 18</td><td>5 – 18</td></tr>
<tr><td>0.075 mm</td><td style="color:#e74c3c;font-weight:700;">2 – 8</td><td style="color:#e74c3c;font-weight:700;">2 – 8</td></tr>
</table></div>

<h3>📐 Marshall Properties — QCS S6 P5 Table 5:7</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th style="min-width:180px;">Parameter</th><th>Binder Course</th><th>Test Method</th><th>Frequency</th></tr>
<tr><td><strong>Marshall Stability</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 8 kN</td><td>ASTM D6927</td><td>1 per 500 tonnes</td></tr>
<tr><td><strong>Marshall Flow</strong></td><td style="color:#2ecc71;font-weight:700;">2 – 4 mm</td><td>ASTM D6927</td><td>1 per 500 tonnes</td></tr>
<tr><td><strong>Air Voids (Va)</strong></td><td style="color:#2ecc71;font-weight:700;">3 – 5%</td><td>ASTM D3203</td><td>1 per 500 tonnes</td></tr>
<tr><td><strong>VMA</strong></td><td style="color:#2ecc71;font-weight:700;">≥ 13% (BC-A 25mm)<br>≥ 14% (BC-B 19mm)</td><td>Calculation</td><td>Per mix design</td></tr>
<tr><td><strong>VFB</strong></td><td style="color:#2ecc71;font-weight:700;">65 – 75%</td><td>Calculation</td><td>Per mix design</td></tr>
<tr><td><strong>Bitumen Content</strong></td><td>Design ± 0.3%<br><span style="font-size:10px;">typically 4.0 – 5.5%</span></td><td>ASTM D6307</td><td>1 per 500 tonnes</td></tr>
<tr><td><strong>Retained Stability</strong></td><td style="color:#2ecc71;font-weight:700;">≥ 75%</td><td>AASHTO T283</td><td>Per mix design</td></tr>
</table></div>

<h3>📐 الدمك الميداني والقبول</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>Test</th><th>Frequency</th></tr>
<tr style="background:rgba(46,204,113,0.1);"><td><strong>Field Compaction</strong></td><td style="color:#2ecc71;font-weight:700;font-size:14px;">≥ 97% TMD<br><span style="font-size:10px;font-weight:400;">Theoretical Maximum Density (Rice)</span></td><td>Core Density<br>ASTM D2726</td><td>1 core per <strong>500m lane</strong></td></tr>
<tr><td><strong>Thickness</strong></td><td>Design ± 5mm<br><span style="font-size:10px;">typically 60–80mm</span></td><td>Core measurement</td><td>1 per 500m lane</td></tr>
<tr><td><strong>Delivery Temperature</strong></td><td style="font-weight:700;">≥ 135°C (Non-PMB)<br>≥ 145°C (PMB)</td><td>IR Thermometer</td><td>Every truck</td></tr>
<tr><td><strong>Compaction Temperature</strong></td><td style="font-weight:700;">≥ 120°C start rolling<br>≥ 80°C finish rolling</td><td>IR Thermometer</td><td>Continuous</td></tr>
<tr><td><strong>Surface Level</strong></td><td>± <strong>6mm</strong></td><td>Total Station</td><td>Every 25m</td></tr>
<tr><td><strong>Surface Regularity</strong></td><td>≤ <strong>6mm</strong> under 3m straightedge</td><td>Straightedge</td><td>Random per 100m</td></tr>
</table></div>

<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin:12px 0;font-size:12px;">
<strong>🔵 ملاحظات جوهرية:</strong><br>
• <strong>Tack Coat</strong> (SS-1h) إلزامي قبل الفرش — معدل 0.20–0.50 L/m²<br>
• Rolling Pattern: <strong>Breakdown → Intermediate → Finish</strong> — 3 مراحل دمك<br>
• يُمنع إيقاف الـ Roller على الإسفلت الساخن — يسبب indentation<br>
• Longitudinal Joints يجب أن تكون staggered بين BC و WC<br>
• أي حمولة تصل بدرجة &lt; 135°C تُرفض فوراً
</div>

<h3>🔴 Hold Points</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>Mix Design معتمد (Marshall / Superpave)</td><td>Lab Mix Design Report</td></tr>
<tr><td>HP-02</td><td>Trial Section ≥ 200m معتمد</td><td>Trial Report + Cores + Temp Log</td></tr>
<tr><td>HP-03</td><td>Prime/Tack Coat مكتمل ومعتمد</td><td>Prime/Tack Approval</td></tr>
<tr><td>HP-04</td><td>Cores ≥ 97% TMD + Thickness OK</td><td>Core Test Reports</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 Reference | 🛣️ Binder Course — QCS S6 P5</div>
<p style="color:var(--text2);font-size:13px;">Switch to Arabic for full detailed content, tables and ITP checklists. All numerical values and test methods apply universally.</p>
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 | Wearing Course — QCS S6 P5</div>
<p style="color:var(--text2);font-size:13px;">Switch to Arabic for full detailed content and tables.</p>
</div>
` },
finishing: { title: '🚧 التشطيبات النهائية', content: `

<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 التشطيبات — Kerbs + Markings + Signs</span>
<button onclick="document.getElementById('vid-finish-new').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-finish-new" accept="video/*" style="display:none" data-player="vid-finish-new-p" data-ph="vid-finish-new-ph" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-finish-new-ph" style="padding:16px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV</div>
<div id="vid-finish-new-p" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<h3>📐 تعريف مرحلة التشطيبات — QCS S6 + Ashghal</h3>
<p>مرحلة التشطيبات تشمل جميع الأعمال التكميلية بعد فرش طبقة الـ Wearing Course: الكيربات (Kerbs & Channels)، العلامات الأرضية (Road Markings)، اللوحات المرورية (Traffic Signs)، حواجز السلامة (Guard Rails)، والتنسيق النهائي. كل عنصر له مواصفات QCS 2024 ومعايير Ashghal/MMUP محددة.</p>

<h3>📐 الكيربات — Kerbs & Channels — QCS S6 P7</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>Test/Reference</th></tr>
<tr><td><strong>Concrete Grade</strong></td><td style="color:#2ecc71;font-weight:700;">C40 (precast) / C30 (in-situ)</td><td>QCS S5</td></tr>
<tr><td><strong>Compressive Strength 28d</strong></td><td>≥ 40 MPa (precast)</td><td>BS EN 1340</td></tr>
<tr><td><strong>Water Absorption</strong></td><td>≤ 6%</td><td>BS EN 1340</td></tr>
<tr><td><strong>Transverse Strength</strong></td><td>≥ 3.5 MPa (Class S)</td><td>BS EN 1340</td></tr>
<tr><td><strong>Dimensional Tolerance</strong></td><td>Length ± 3mm, Width ± 3mm, Height ± 5mm</td><td>BS EN 1340</td></tr>
<tr><td><strong>Bedding</strong></td><td>C15 concrete bed ≥ 100mm + haunching</td><td>Ashghal Std Detail</td></tr>
<tr><td><strong>Alignment</strong></td><td>± 5mm from design line</td><td>String Line / Survey</td></tr>
<tr><td><strong>Joint Width</strong></td><td>3 – 5mm filled with mortar</td><td>Physical</td></tr>
</table></div>

<h3>📐 العلامات الأرضية — Road Markings — QCS S6 P8</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>Reference</th></tr>
<tr><td><strong>Material Type</strong></td><td>Thermoplastic (roads) / Cold Plastic (special)</td><td>BS EN 1871</td></tr>
<tr><td><strong>Thickness</strong></td><td>≥ 2.5mm (flat) / ≥ 6mm (profiled)</td><td>BS EN 1436</td></tr>
<tr><td><strong>Retroreflectivity (new)</strong></td><td>≥ 150 mcd/m²/lux (white)<br>≥ 100 mcd/m²/lux (yellow)</td><td>ASTM E1710</td></tr>
<tr><td><strong>Skid Resistance (SRT)</strong></td><td>≥ 45</td><td>BS EN 1436</td></tr>
<tr><td><strong>Glass Beads</strong></td><td>300–400 g/m² drop-on</td><td>BS EN 1423</td></tr>
<tr><td><strong>Colour</strong></td><td>White (lanes) / Yellow (median) / Red (bus)</td><td>MMUP Traffic Manual</td></tr>
<tr><td><strong>Width — Centre Line</strong></td><td>100mm or 150mm</td><td>MMUP</td></tr>
<tr><td><strong>Width — Edge Line</strong></td><td>150mm</td><td>MMUP</td></tr>
</table></div>

<h3>📐 اللوحات المرورية — Traffic Signs — MMUP</h3>
<div style="overflow-x:auto;">
<table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.9);"><th>Parameter</th><th>Specification</th><th>Reference</th></tr>
<tr><td><strong>Sheeting</strong></td><td>High Intensity Prismatic (HIP) — Type III min</td><td>ASTM D4956</td></tr>
<tr><td><strong>Post Material</strong></td><td>Galvanized Steel / Aluminium</td><td>Ashghal</td></tr>
<tr><td><strong>Height (urban)</strong></td><td>Bottom edge ≥ 2.1m from ground</td><td>MMUP</td></tr>
<tr><td><strong>Height (rural)</strong></td><td>Bottom edge ≥ 1.5m from ground</td><td>MMUP</td></tr>
<tr><td><strong>Offset from edge</strong></td><td>≥ 0.6m from road edge</td><td>MMUP</td></tr>
<tr><td><strong>Foundation</strong></td><td>C25 concrete ≥ 500×500×600mm</td><td>Ashghal Std</td></tr>
<tr><td><strong>Bilingual</strong></td><td>Arabic + English mandatory</td><td>MMUP Traffic Manual</td></tr>
</table></div>

<h3>🔴 Hold Points</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>التوثيق</th></tr>
<tr><td>HP-01</td><td>Wearing Course مقبول + IRI OK</td><td>WC Approval + IRI Report</td></tr>
<tr><td>HP-02</td><td>اعتماد عينات Kerb + Marking material</td><td>Material Certificates</td></tr>
<tr><td>HP-03</td><td>فحص Retroreflectivity بعد التطبيق</td><td>Retroreflectivity Report</td></tr>
<tr><td>HP-04</td><td>Alignment survey للكيربات والعلامات</td><td>As-Built Survey</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 | التشطيبات — Kerbs, Markings, Signs</div>
<p style="color:var(--text2);font-size:13px;">Switch to Arabic for full detailed content and tables.</p>
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 | التسليم — Final Handover</div>
<p style="color:var(--text2);font-size:13px;">Switch to Arabic for full detailed content and tables.</p>
</div>
` },
road_itps: { title: '📋 Road ITPs', content: `
<div class="lang-content-ar">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;"><div onclick="QS.openDetail('itp_subgrade')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🏔️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP Subgrade</div></div><div onclick="QS.openDetail('itp_subbase')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🪨</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP Subbase</div></div><div onclick="QS.openDetail('itp_base')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP Base Course</div></div><div onclick="QS.openDetail('itp_primecoat')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🛢️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP Prime & Tack</div></div><div onclick="QS.openDetail('itp_wearing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⚫</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP Binder & Wearing</div></div><div onclick="QS.openDetail('itp_asphalt')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔬</div><div style="color:var(--gold);font-weight:700;font-size:13px;">ITP Asphalt Testing</div></div></div>
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
<h3>📊 Roads Quality Control Plan (QCP)</h3>
<table class="dm-table">
<tr><th>HP</th><th>Stage</th><th>Condition</th></tr>
<tr><td>HP-01</td><td>Before Subgrade fill</td><td>Material Approval + CBR</td></tr>
<tr><td>HP-02</td><td>Accept Subgrade</td><td>Density ≥95% + CBR ≥8%/8%</td></tr>
<tr><td>HP-03</td><td>Accept Subbase</td><td>Density ≥98% + CBR ≥70%</td></tr>
<tr><td>HP-04</td><td>Accept Base Course</td><td>Density ≥98% + CBR ≥80%</td></tr>
<tr><td>HP-05</td><td>Accept Prime Coat</td><td>Rate + Coverage + Curing 24hr</td></tr>
<tr><td>HP-06</td><td>Before asphalt production</td><td>JMF + Trial Section approved</td></tr>
<tr><td>HP-07</td><td>Accept Binder Course</td><td>Core Density ≥97% TMD</td></tr>
<tr><td>HP-08</td><td>Accept Wearing Course</td><td>Core + PSV + IRI + Level</td></tr>
<tr><td>HP-09</td><td>Final Handover</td><td>As-Built + All Tests + Markings</td></tr>
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
<h3>Marshall Mix Design — Definition</h3>
<p>The most common asphalt mix design method in Qatar. Uses 75-blow (major roads) or 50-blow (secondary) compaction, then measures Stability and Flow at 60°C.</p>
<h3>Layer Class Definitions</h3>
<table class="dm-table">
<tr><th>Layer</th><th>Definition</th><th>NMAS</th></tr>
<tr><td>Base Course Class A</td><td>Heavy-duty base for high-load roads, directly above subbase</td><td>25mm or 37.5mm</td></tr>
<tr><td>Base Course Class B</td><td>Standard base for normal/secondary roads</td><td>19mm or 25mm</td></tr>
<tr><td>Wearing Course</td><td>Top layer in contact with traffic. PSV ≥ 55 mandatory. Provides waterproofing + skid resistance.</td><td>9.5mm or 12.5mm</td></tr>
</table>
<h3>Table 5:6 — Marshall Design Criteria — Page 15</h3>
<table class="dm-table">
<tr><th>Property</th><th>WC</th><th>BC-A</th><th>BC-B</th></tr>
<tr><td>Blows / Face</td><td>75</td><td>75</td><td>75</td></tr>
<tr><td>Stability (kN)</td><td>≥ 9.0</td><td>≥ 9.0</td><td>≥ 8.0</td></tr>
<tr><td>Flow (mm)</td><td>2-4</td><td>2-4</td><td>2-4</td></tr>
<tr><td>Air Voids Va (%)</td><td>3-5</td><td>3-5</td><td>3-5</td></tr>
<tr><td>VMA (%)</td><td>≥ 15</td><td>≥ 14</td><td>≥ 14</td></tr>
<tr><td>VFA (%)</td><td>65-80</td><td>65-75</td><td>65-75</td></tr>
<tr><td>TSR (%)</td><td>≥ 80</td><td>≥ 80</td><td>≥ 75</td></tr>
</table>
<h3>Table 5:8 — Compacted Layer Thickness — Page 15</h3>
<table class="dm-table">
<tr><th>Layer</th><th>Compacted Thickness</th></tr>
<tr><td>Wearing Course</td><td>40-55mm</td></tr>
<tr><td>Base Course B</td><td>60-80mm</td></tr>
<tr><td>Base Course A</td><td>80-100mm</td></tr>
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
<h3>Table 5:9 — Air Voids in Place — Page 16</h3>
<table class="dm-table">
<tr><th>Stage</th><th>WC</th><th>BC-A</th><th>BC-B</th></tr>
<tr><td>JMF Design Va</td><td>4.0%</td><td>4.0%</td><td>4.0%</td></tr>
<tr><td>Acceptable Field Va</td><td>3-5%</td><td>3-5%</td><td>3-5%</td></tr>
<tr><td>Target TMD%</td><td>≥ 97%</td><td>≥ 97%</td><td>≥ 97%</td></tr>
</table>
<h3>Table 5:10 — Mix Tolerances vs JMF — Page 17</h3>
<table class="dm-table">
<tr><th>Item</th><th>Tolerance</th></tr>
<tr><td>Bitumen Content</td><td>± 0.3%</td></tr>
<tr><td>% Passing 0.075mm</td><td>± 2.0%</td></tr>
<tr><td>% Passing 2.36-4.75mm</td><td>± 5.0%</td></tr>
<tr><td>% Passing 9.5-12.5mm</td><td>± 6.0%</td></tr>
<tr><td>% Passing 19-25mm</td><td>± 7.0%</td></tr>
<tr><td>Mixing Temperature</td><td>± 10°C from JMF</td></tr>
</table>
<h3>Table 5:11 — Field Density — Pages 18-19</h3>
<table class="dm-table">
<tr><th>Method</th><th>Requirement</th><th>Frequency</th></tr>
<tr><td>Core TMD%</td><td>≥97% TMD each core</td><td>Per 1000m²</td></tr>
<tr><td>Mean 5-core TMD%</td><td>≥97% TMD</td><td>Per Lot</td></tr>
<tr><td>Any single core min</td><td>≥ 93% TMD</td><td>Reject if &lt;93%</td></tr>
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
<h3>Key Definitions</h3>
<table class="dm-table">
<tr><th>Term</th><th>Definition</th></tr>
<tr><td>Standard Axle Load</td><td>80 kN (8.2 tonnes) — global design benchmark</td></tr>
<tr><td>Axle Load Factor (ALF)</td><td>Damage ratio vs standard axle. 160kN axle = ALF 16</td></tr>
<tr><td>ESAL</td><td>Total of all axles converted to standard axles over design life</td></tr>
<tr><td>Traffic Designation</td><td>Road classification by ESAL for pavement thickness selection</td></tr>
</table>
<h3>Table 1 — Traffic Designation</h3>
<table class="dm-table">
<tr><th>Designation</th><th>ESAL (× 10⁶)</th><th>Road Type</th></tr>
<tr><td>T1 — Light</td><td>&lt; 0.5</td><td>Local residential</td></tr>
<tr><td>T2 — Medium Light</td><td>0.5-1.5</td><td>Local roads</td></tr>
<tr><td>T3 — Medium</td><td>1.5-5.0</td><td>Collector roads</td></tr>
<tr><td>T4 — Medium Heavy</td><td>5.0-15</td><td>Arterial roads</td></tr>
<tr><td>T5 — Heavy</td><td>15-50</td><td>Major expressways</td></tr>
<tr><td>T6 — Very Heavy</td><td>&gt; 50</td><td>Expressways + Industrial</td></tr>
</table>
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
<h3>1. Concrete Pavement Types</h3>
<table class="dm-table">
<tr><th>Type</th><th>Description</th><th>Qatar Use</th></tr>
<tr><td>JPCP</td><td>Jointed Plain Concrete — no reinforcement + transverse joints</td><td>Airports, ports, industrial</td></tr>
<tr><td>CRCP</td><td>Continuously Reinforced — no transverse joints</td><td>Heavy expressways</td></tr>
<tr><td>RCC</td><td>Roller Compacted Concrete — very dry mix</td><td>Parking, warehouses</td></tr>
</table>
<h3>2. Concrete Specifications</h3>
<table class="dm-table">
<tr><th>Item</th><th>Specification</th></tr>
<tr><td>Concrete Grade</td><td>≥ C35 (fcu ≥ 35 N/mm²)</td></tr>
<tr><td>Flexural Strength MR</td><td>≥ 4.5 MPa @ 28 days</td></tr>
<tr><td>w/c Ratio</td><td>≤ 0.40</td></tr>
<tr><td>Cement Content</td><td>≥ 380 kg/m³</td></tr>
<tr><td>Slump (Slipform)</td><td>20-60mm</td></tr>
</table>
<h3>8. Acceptance Tests</h3>
<table class="dm-table">
<tr><th>Test</th><th>Standard</th><th>Frequency</th></tr>
<tr><td>Flexural Strength</td><td>≥ 4.5 MPa @ 28d</td><td>Per 50m³</td></tr>
<tr><td>Slab Thickness (Core)</td><td>Design ± 10mm</td><td>Per 1000m²</td></tr>
<tr><td>3m Straightedge</td><td>≤ 3mm</td><td>Per 25m</td></tr>
<tr><td>IRI</td><td>≤ 2.0 m/km</td><td>Per section</td></tr>
<tr><td>Texture Depth</td><td>≥ 0.7mm</td><td>Per 1000m²</td></tr>
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
<h3>ITP — Subgrade Preparation</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Unsuitable Material</td><td>CBR &lt; 8% — remove</td><td>Per area</td><td>QCS S6 P3</td><td>HP</td></tr>
<tr><td>Proctor Compaction</td><td>MDD + OMC per material</td><td>Per change</td><td>ASTM D698</td><td>HP</td></tr>
<tr><td>Atterberg Limits</td><td>LL ≤ 35% | PI ≤ 10%</td><td>Per 500m³</td><td>ASTM D4318</td><td>W</td></tr>
<tr><td>Sulphate + Chloride</td><td>SO3 ≤ 0.5% | Cl ≤ 0.6%</td><td>Per 500m³</td><td>BS 1377</td><td>W</td></tr>
<tr><td>Field Density</td><td>≥ 95% MDD (Sand Cone)</td><td>Per 500m²</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>CBR (Soaked 4 days)</td><td>≥ 8% Normal / ≥ 8% Sabkha</td><td>Per 2000m²</td><td>ASTM D1883</td><td>HP</td></tr>
<tr><td>Level Survey</td><td>± 10mm from design</td><td>Per 25m</td><td>Total Station</td><td>HP</td></tr></table>
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
<h3>ITP — Wearing Course</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>JMF Approval</td><td>Marshall / Superpave</td><td>Per mix</td><td>QCS S6 P5</td><td>HP</td></tr>
<tr><td>Delivery Temperature</td><td>≥ 135°C Non-PMB / ≥ 145°C PMB</td><td>Every load</td><td>QCS S6 P5</td><td>W</td></tr>
<tr><td>Marshall Stability</td><td>≥ 9 kN | Flow 2-4mm | Va 3-5%</td><td>Per 200t</td><td>ASTM D1559</td><td>HP</td></tr>
<tr><td>Core Density</td><td>≥97% TMD</td><td>Per 1000m²</td><td>ASTM D6927</td><td>HP</td></tr>
<tr><td>Straightedge 3m</td><td>≤ 3mm (PMB) / ≤ 5mm (Non-PMB)</td><td>Per 100m</td><td>QCS S6 P5</td><td>W</td></tr>
<tr><td>IRI</td><td>≤ 0.9 m/km PMB / ≤ 1.5 Non-PMB</td><td>Per 400m</td><td>PWA IAN 013</td><td>HP</td></tr></table>
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
<tr><td>Crossfall</td><td><strong>2.5% ± 0.5%</strong></td><td>في المستقيم</td></tr>
<tr><td>Max Superelevation</td><td><strong>8%</strong></td><td>في المنحنيات</td></tr>
<tr><td>Max Grade — عام</td><td><strong>8%</strong></td><td>طرق محلية وتجميعية</td></tr>
<tr><td>Max Grade — رئيسي</td><td><strong>6%</strong></td><td>طرق شريانية وسريعة</td></tr>
<tr><td>Min Grade</td><td><strong>0.5%</strong></td><td>للصرف السطحي</td></tr>
</tbody></table>
`},
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
<tr><td>Subgrade</td><td>≥95% MDD</td><td>≥8% (طبيعي)<br>≥15% (ردم مستورد)</td><td>±10mm</td><td>—</td><td>—</td></tr>
<tr><td>Subbase</td><td>≥98% MDD</td><td>≥30%</td><td>±10mm</td><td>—</td><td>—</td></tr>
<tr><td>Road Base</td><td>≥98% MDD</td><td>≥80%</td><td>±8mm</td><td>—</td><td>—</td></tr>
<tr><td>Binder Course</td><td>—</td><td>—</td><td>±8mm</td><td>≥8.0 kN</td><td>≥97% TMD</td></tr>
<tr><td>Wearing Course</td><td>—</td><td>—</td><td>±6mm</td><td>≥8.0 kN</td><td>≥97% TMD</td></tr>
</tbody></table>
`},
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
<tr><td style="color:#e74c3c">Delivery temp <130°C</td><td>Plant distance ≤30km | covered trucks</td><td>رفض الحمل</td></tr>
<tr><td style="color:#f39c12">Roller marks visible</td><td>Finish rolling @ >60°C static</td><td>Re-heat + re-roll</td></tr>
<tr><td style="color:#f39c12">Segregation</td><td>Remixer in hopper | no dumping direct</td><td>Remove + re-lay</td></tr>
<tr><td style="color:#f39c12">Joint cracking</td><td>Hot iron + overlap ≥50mm | infrared heater</td><td>Seal + monitor</td></tr>
</tbody></table>
</div>
`},
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
});
