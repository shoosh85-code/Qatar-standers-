// QatarSpec Pro — Buildings & Towers Content v1.0
// QCS 2024 §S5 | QCDD | KAHRAMAA | BS EN 1992/1997 | NFPA
(function(){
  var c=window.QS_CONTENT=window.QS_CONTENT||{};

  c["buildings_towers"] = { title: '🏢 الأبراج والمباني السكنية — QCS 2024 §S5', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 §S5 + QCDD | الأبراج والمباني السكنية | من التصميم إلى التسليم
</div>
<h3>🏗️ مراحل التنفيذ — 8 أقسام شاملة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('bld_design')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">1️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">الدراسة والتصميم</div><div style="color:var(--text3);font-size:11px;">Geotech · Wind · BIM · ETABS</div></div>
<div onclick="QS.openDetail('bld_foundations')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">2️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">الأساسات</div><div style="color:var(--text3);font-size:11px;">Pad · Raft · Piles · Shoring</div></div>
<div onclick="QS.openDetail('bld_concrete')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">3️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">أعمال الخرسانة</div><div style="color:var(--text3);font-size:11px;">Grades · Pumping · Cover · Curing</div></div>
<div onclick="QS.openDetail('bld_masonry')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">4️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">الطابوق والبناء</div><div style="color:var(--text3);font-size:11px;">Block · Brick · Mortar · Partition</div></div>
<div onclick="QS.openDetail('bld_mep')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">5️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">الكهروميكانيك (MEP)</div><div style="color:var(--text3);font-size:11px;">LV · HVAC · Fire · Elevators</div></div>
<div onclick="QS.openDetail('bld_finishes')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">6️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">التشطيبات</div><div style="color:var(--text3);font-size:11px;">Tiles · Paint · Gypsum · Cladding</div></div>
<div onclick="QS.openDetail('bld_handover')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">7️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">التسليم والاختبارات</div><div style="color:var(--text3);font-size:11px;">Commissioning · Snag · As-Built</div></div>
<div onclick="QS.openDetail('bld_materials')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">8️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">مواد البناء</div><div style="color:var(--text3);font-size:11px;">Cement · Rebar · Glass · Aluminium</div></div>
</div>
<div onclick="QS.openDetail('bld_calculator')" style="background:linear-gradient(135deg,rgba(201,168,76,0.15),rgba(90,15,15,0.1));border:2px solid rgba(201,168,76,0.5);border-radius:10px;padding:14px;cursor:pointer;text-align:center;margin-top:8px;">
  <div style="font-size:24px;">🧮</div>
  <div style="color:#C9A84C;font-weight:700;font-size:14px;">حاسبة المباني الشاملة</div>
  <div style="color:var(--text3);font-size:11px;margin-top:4px;">خرسانة · حديد · طابوق · تشطيبات · عزل — QCS 2024 §S5</div>
</div>
<h3>📚 المراجع الرئيسية</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>المرجع</th><th>النطاق</th></tr>
<tr><td>QCS 2024 §S5</td><td>أعمال المباني الإنشائية</td></tr>
<tr><td>QCS 2024 §S21</td><td>الأعمال الكهروميكانيكية</td></tr>
<tr><td>QCDD</td><td>السلامة من الحريق والدفاع المدني</td></tr>
<tr><td>KAHRAMAA 2024</td><td>الكهرباء والمياه</td></tr>
<tr><td>BS EN 1992 / 1997</td><td>التصميم الإنشائي والجيوتقني</td></tr>
<tr><td>NFPA 13/72</td><td>الرشاشات وأنظمة الإنذار</td></tr>
<tr><td>FIDIC Cl.11</td><td>فترة العيوب والتسليم</td></tr></table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 §S5 + QCDD | Buildings and Towers | Design to Handover
</div>
<h3>🏗️ Execution Phases — 8 Comprehensive Sections</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('bld_design')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">1️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Design and Studies</div><div style="color:var(--text3);font-size:11px;">Geotech · Wind · BIM · ETABS</div></div>
<div onclick="QS.openDetail('bld_foundations')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">2️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Foundations</div><div style="color:var(--text3);font-size:11px;">Pad · Raft · Piles · Shoring</div></div>
<div onclick="QS.openDetail('bld_concrete')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">3️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Concrete Works</div><div style="color:var(--text3);font-size:11px;">Grades · Pumping · Cover · Curing</div></div>
<div onclick="QS.openDetail('bld_masonry')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">4️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Masonry and Blockwork</div><div style="color:var(--text3);font-size:11px;">Block · Brick · Mortar · Partition</div></div>
<div onclick="QS.openDetail('bld_mep')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">5️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">MEP Systems</div><div style="color:var(--text3);font-size:11px;">LV · HVAC · Fire · Elevators</div></div>
<div onclick="QS.openDetail('bld_finishes')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">6️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Finishes</div><div style="color:var(--text3);font-size:11px;">Tiles · Paint · Gypsum · Cladding</div></div>
<div onclick="QS.openDetail('bld_handover')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">7️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Handover and Testing</div><div style="color:var(--text3);font-size:11px;">Commissioning · Snag · As-Built</div></div>
<div onclick="QS.openDetail('bld_materials')" style="background:rgba(90,15,15,0.06);border:1px solid rgba(90,15,15,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:18px;">8️⃣</div><div style="color:#5A0F0F;font-weight:700;font-size:13px;">Building Materials</div><div style="color:var(--text3);font-size:11px;">Cement · Rebar · Glass · Aluminium</div></div>
</div>
<div onclick="QS.openDetail('bld_calculator')" style="background:linear-gradient(135deg,rgba(201,168,76,0.15),rgba(90,15,15,0.1));border:2px solid rgba(201,168,76,0.5);border-radius:10px;padding:14px;cursor:pointer;text-align:center;margin-top:8px;">
  <div style="font-size:24px;">🧮</div>
  <div style="color:#C9A84C;font-weight:700;font-size:14px;">Building Calculator</div>
  <div style="color:var(--text3);font-size:11px;margin-top:4px;">Concrete · Rebar · Masonry · Finishes · Waterproofing — QCS 2024 §S5</div>
</div>
` };

  c["bld_design"] = { title: '📐 الدراسة والتصميم — QCS 2024 §S5 + QCDD', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S3/S5 | BS EN 1992/1997 | QCDD | Ashghal BIM Standard 2023</div>
<h3>🔬 الدراسة الجيوتقنية</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">قبل أي تصميم إنشائي، تُعدّ دراسة التربة الركيزة الأساسية لأي مشروع. حسب QCS 2024 §S3، يجب إجراء حفر استكشافية (Boreholes) بعمق لا يقل عن 1.5× عرض الأساس أو حتى الطبقة الصخرية. في قطر، التربة تحتوي في الغالب على نسب عالية من الجبس والملح (Sabkha) مما يستوجب اختبارات كيميائية للكبريتات والكلوريدات. نتائج SPT تُستخدم لتحديد نوع الأساس المناسب وقدرة التحمل.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>تقرير التربة</td><td>إلزامي قبل التصميم</td><td>QCS 2024 §S3</td></tr>
<tr><td>اختبار SPT</td><td>كل 1.5م عمق</td><td>BS EN 1997</td></tr>
<tr><td>عينات Shelby Tube</td><td>للتربة اللينة غير المقلقلة</td><td>ASTM D1587</td></tr>
<tr><td>CBR</td><td>مختبر + حقل</td><td>QCS 2024 §S3</td></tr>
<tr><td>كيمياء التربة</td><td>كبريتات + كلوريدات</td><td>BS 1377</td></tr></table>
<h3>🌬️ تحليل أحمال الرياح</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">قطر تقع في منطقة ريح متوسطة بسرعة قياسية 42 م/ث. حسب QCS 2024 §S5-P1، يجب تحليل الأحمال الريحية لكل مبنى فوق 3 طوابق. الأبراج الشاهقة (فوق 100م) تتطلب اختبار نفق الرياح (Wind Tunnel Test) لأن التوزيع الفعلي للضغط يختلف عن الصيغ النظرية — خاصة في المناطق الحضرية المكتظة مثل West Bay. النتائج تؤثر مباشرة على أبعاد العناصر الإنشائية وتصميم الواجهات.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>القيمة</th><th>المرجع</th></tr>
<tr><td>السرعة الأساسية للريح</td><td>42 م/ث (جست 3 ثوانٍ)</td><td>QCS 2024 §S5-P1</td></tr>
<tr><td>اختبار نفق الرياح</td><td>إلزامي فوق 100م ارتفاع</td><td>QCDD</td></tr>
<tr><td>معامل الضغط Kz</td><td>حسب الارتفاع والفئة</td><td>QCS 2024 §S5-P1</td></tr>
<tr><td>فئة التعرض</td><td>Exposure B (منطقة حضرية)</td><td>QCS 2024 §S5-P1</td></tr></table>
<h3>🏗️ التصميم الإنشائي</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>النظام الإنشائي فوق 20 طابق</td><td>Core + Outrigger</td><td>QCS 2024 §S5-P6</td></tr>
<tr><td>برنامج التحليل</td><td>ETABS / SAP2000</td><td>BS EN 1992</td></tr>
<tr><td>منطقة الزلازل في قطر</td><td>Zone 2A</td><td>QCS 2024 §S5-P6</td></tr>
<tr><td>حد الانحراف الجانبي</td><td>H/500</td><td>QCS 2024 §S5-P6</td></tr>
<tr><td>مقاومة الخرسانة</td><td>C30 – C60 حسب العنصر</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>غطاء التسليح (بيئة ساحلية XS2)</td><td>50 مم</td><td>BS EN 1992</td></tr></table>
<h3>📐 متطلبات BIM</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">نظام معلومات المباني (BIM) غيّر صناعة البناء في قطر. حسب Ashghal BIM Standard 2023، البيانات الرقمية تُدار طوال دورة حياة المشروع. Clash Detection قبل التنفيذ يوفر 5-15% من تكلفة المشروع بتجنب التعارضات بين الأنظمة. تسليم BIM بصيغة IFC معيار مفتوح — لا ارتباط ببرنامج محدد. البيانات تُستخدم لاحقاً في إدارة المرافق (FM) طوال عمر المبنى.</p>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">نظام المعلومات للمباني (BIM) أصبح إلزامياً في مشاريع قطر الكبرى. حسب Ashghal BIM Standard 2023، المشاريع فوق 10,000 م² تتطلب BIM بمستوى تفصيل LOD 300 للتنفيذ. الفائدة الرئيسية هي كشف التعارضات (Clash Detection) بين الهيكل الإنشائي والأنظمة الميكانيكية والكهربائية قبل البدء بالتنفيذ — مما يوفر وقتاً وتكاليف هائلة. تسليم BIM بصيغة IFC 2x3 إلزامي مع نهاية المشروع.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th></tr>
<tr><td>إلزامية BIM</td><td>مشاريع أكبر من 10,000 م²</td></tr>
<tr><td>مستوى التفصيل LOD</td><td>300 للتنفيذ — 500 كرسومات As-Built</td></tr>
<tr><td>كشف التعارضات</td><td>Revit + Navisworks</td></tr>
<tr><td>صيغة تسليم الملفات</td><td>IFC 2x3 + RVT</td></tr>
<tr><td>المرجع</td><td>Ashghal BIM Standard 2023</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🔬 Geotechnical Investigation</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Soil Report</td><td>Mandatory before design</td><td>QCS 2024 §S3</td></tr>
<tr><td>SPT Test</td><td>Every 1.5m depth</td><td>BS EN 1997</td></tr>
<tr><td>Shelby Tube Samples</td><td>Undisturbed for soft soil</td><td>ASTM D1587</td></tr>
<tr><td>CBR</td><td>Lab + Field test</td><td>QCS 2024 §S3</td></tr>
<tr><td>Soil Chemistry</td><td>Sulphates + Chlorides</td><td>BS 1377</td></tr></table>
<h3>🌬️ Wind Load Analysis</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Value</th><th>Reference</th></tr>
<tr><td>Basic Wind Speed</td><td>42 m/s (3-sec gust)</td><td>QCS 2024 §S5-P1</td></tr>
<tr><td>Wind Tunnel Test</td><td>Mandatory above 100m height</td><td>QCDD</td></tr>
<tr><td>Pressure Coefficient Kz</td><td>Per height and category</td><td>QCS 2024 §S5-P1</td></tr>
<tr><td>Exposure Category</td><td>Exposure B (Urban)</td><td>QCS 2024 §S5-P1</td></tr></table>
<h3>🏗️ Structural Design</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Structural System above 20 floors</td><td>Core + Outrigger</td><td>QCS 2024 §S5-P6</td></tr>
<tr><td>Analysis Software</td><td>ETABS / SAP2000</td><td>BS EN 1992</td></tr>
<tr><td>Qatar Seismic Zone</td><td>Zone 2A</td><td>QCS 2024 §S5-P6</td></tr>
<tr><td>Lateral Drift Limit</td><td>H/500</td><td>QCS 2024 §S5-P6</td></tr>
<tr><td>Concrete Strength</td><td>C30 to C60 per element type</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Rebar Cover (XS2 coastal)</td><td>50mm</td><td>BS EN 1992</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">Back to Main</button></div>
</div>
` };

  c["bld_foundations"] = { title: '🏗️ الأساسات — QCS 2024 §S5-P7', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S5-P7/P8 | BS 8004 | BS EN 1536/1537 | ASTM D1143</div>
<h3>🔩 أنواع الأساسات حسب التربة</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">اختيار نوع الأساس في قطر يعتمد على نتائج الدراسة الجيوتقنية وحجم الأحمال. التربة القطرية في الغالب طبقات حجر جيري سطحية (Limestone) فوق طبقات رملية أو كلسية أو Sabkha. البلوك الخرساني (Pad) يُستخدم عند قدرة تحمل التربة ≥150 kPa. الأبراج فوق 30 طابق تحتاج حتماً لركائز (Piles) تصل أحياناً لعمق 40-60م لتحقيق قدرة التحمل المطلوبة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>نوع الأساس</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>أساس لبشة (Raft)</td><td>مباني أكثر من 5 طوابق أو تربة ضعيفة</td><td>QCS 2024 §S5-P7</td></tr>
<tr><td>أساس مفرد (Pad)</td><td>مباني منخفضة على تربة جيدة</td><td>QCS 2024 §S5-P7</td></tr>
<tr><td>ركائز محفورة (Bored Piles)</td><td>أبراج عالية أو تربة سيئة</td><td>BS EN 1536</td></tr>
<tr><td>ركائز مدقوقة</td><td>تربة رملية — حمولة متوسطة</td><td>BS EN 12699</td></tr>
<tr><td>Raft + Piles (مركّب)</td><td>أبراج أكثر من 30 طابق</td><td>BS EN 1997</td></tr></table>
<h3>🔧 متطلبات الحفر والتدعيم</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">الحفر العميق في قطر يواجه تحديات خاصة: ارتفاع منسوب المياه الجوفية المالحة (في المناطق الساحلية قد يكون على عمق 1-2م فقط)، والتربة السائبة. حسب QCS 2024 §S5-P2، كل حفر يتجاوز 1.5م عمقاً يجب دعمه. Sheet Pile تُستخدم في المناطق الساحلية لأنها تمنع تدفق المياه. رصد الهبوط (Settlement Monitoring) للمباني المجاورة إلزامي خلال مرحلة الحفر.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>دعم جدران الحفر (Shoring)</td><td>لكل حفر عمقه أكثر من 1.5م</td><td>QCS 2024 §S5-P2</td></tr>
<tr><td>جدار Berlin Wall</td><td>H-Piles + ألواح خشبية</td><td>QCS 2024 §S5</td></tr>
<tr><td>جدار Sheet Pile</td><td>مناطق ارتفاع منسوب المياه الجوفية</td><td>BS EN 12063</td></tr>
<tr><td>Contiguous Pile Wall</td><td>ضغوط عالية أو قرب مبانٍ مجاورة</td><td>BS EN 1536</td></tr>
<tr><td>رصد الهبوط</td><td>إلزامي قرب المباني المجاورة</td><td>QCS 2024 §S5-P2</td></tr></table>
<h3>🏛️ اختبارات قبول الركائز</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">ركائز الأبراج العالية تتحمل أحمالاً هائلة لذلك اختبارات القبول حاسمة. اختبار الحمل الساكن (Static Load Test) هو الأدق لكنه مكلف وبطيء لذا يُطبَّق على 2% فقط. اختبار PIT سريع وغير مكلف ويكتشف التكسر والتجاويف داخل الركيزة. التسجيل الصوتي (CSL) يُعطي صورة ثلاثية الأبعاد لجودة الخرسانة داخل الركيزة — إلزامي للركائز ذات القطر الكبير حيث يصعب ضمان التعبئة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>الاختبار</th><th>النسبة</th><th>المرجع</th></tr>
<tr><td>اختبار الحمل الساكن</td><td>2% من إجمالي الركائز</td><td>ASTM D1143</td></tr>
<tr><td>اختبار نزاهة الركيزة (PIT)</td><td>100% من جميع الركائز</td><td>ASTM D5882</td></tr>
<tr><td>التسجيل الصوتي المتقاطع (CSL)</td><td>ركائز قطرها أكثر من 600مم</td><td>ASTM D6760</td></tr>
<tr><td>اختبار ديناميكي (CAPWAP)</td><td>5% من الركائز</td><td>ASTM D4945</td></tr></table>
<h3>⚗️ الخرسانة في الأساسات</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">خرسانة الأساسات في قطر تواجه أعدى بيئة: كبريتات عالية + كلوريدات + حرارة + رطوبة. حسب QCS 2024 §S12، استخدام GGBS أو Silica Fume ليس خياراً بل ضرورة للتعمير الطويل. الغطاء الخرساني 75mm للأجزاء المدفونة في التربة مباشرة. العزل المائي تحت اللبشة يحمي التسليح من المياه الجوفية المالحة — الغشاء البيتوميني 4mm هو الحد الأدنى.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th></tr>
<tr><td>درجة الخرسانة</td><td>C35 – C45 | نسبة ماء/إسمنت ≤ 0.45</td></tr>
<tr><td>غطاء التسليح</td><td>75مم (في التربة) | 50مم (مع عزل)</td></tr>
<tr><td>الحرارة القصوى للمزيج</td><td>32°C أو أقل عند الصب</td></tr>
<tr><td>العزل المائي</td><td>إلزامي للأقبية والأساسات</td></tr>
<tr><td>إضافات مضادة للكبريتات</td><td>GGBS أو Silica Fume</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🔩 Foundation Types by Soil Condition</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Foundation Type</th><th>Application</th><th>Reference</th></tr>
<tr><td>Raft Foundation</td><td>Buildings above 5 floors or weak soil</td><td>QCS 2024 §S5-P7</td></tr>
<tr><td>Pad Foundation</td><td>Low-rise buildings on good soil</td><td>QCS 2024 §S5-P7</td></tr>
<tr><td>Bored Piles</td><td>High-rise or poor soil conditions</td><td>BS EN 1536</td></tr>
<tr><td>Driven Piles</td><td>Sandy soil, medium load</td><td>BS EN 12699</td></tr>
<tr><td>Raft + Piles Combined</td><td>Towers above 30 floors</td><td>BS EN 1997</td></tr></table>
<h3>🏛️ Pile Acceptance Tests</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Test</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Static Load Test</td><td>2% of total piles</td><td>ASTM D1143</td></tr>
<tr><td>Pile Integrity Test (PIT)</td><td>100% of all piles</td><td>ASTM D5882</td></tr>
<tr><td>Cross-hole Sonic Logging (CSL)</td><td>Piles above 600mm diameter</td><td>ASTM D6760</td></tr>
<tr><td>Dynamic Test (CAPWAP)</td><td>5% of piles</td><td>ASTM D4945</td></tr></table>
</div>
` };

  c["bld_concrete"] = { title: '⚗️ أعمال الخرسانة — QCS 2024 §S5-P5', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S5-P5 | BS EN 206 | ASTM C31/C39 | QCS 2024 §S12</div>
<h3>📊 درجات الخرسانة المعتمدة</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">تصنيف الخرسانة في قطر يتبع BS EN 206 ويُعبَّر عنه بـ C(fck)/fcu حيث fck هي مقاومة الأسطوانة وfcu مقاومة المكعب. حسب QCS 2024 §S5-P5، الحد الأدنى C25/30 للعناصر الإنشائية العادية. في البيئة البحرية والساحلية القطرية (XS2)، لا يُسمح بأقل من C32/40 مع GGBS 50%. درجة W/C لا تتجاوز 0.40 في البيئات العدوانية لأن الماء هو ناقل الكبريتات والكلوريدات.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>العنصر</th><th>الدرجة</th><th>نسبة ماء/إسمنت</th><th>المرجع</th></tr>
<tr><td>الأساسات والأقبية</td><td>C35</td><td>0.45 أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>الأعمدة وجدران القص</td><td>C40–C50</td><td>0.40 أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>البلاطات والكمرات</td><td>C35–C40</td><td>0.45 أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>الخرسانة مسبقة الصنع</td><td>C50–C60</td><td>0.38 أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>خرسانة مضادة للكبريتات</td><td>C35 + GGBS</td><td>0.40 أو أقل</td><td>QCS 2024 §S12</td></tr></table>
<h3>🌡️ الصب في الجو الحار (قطر)</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">قطر تُعدّ من أقسى بيئات الصب الخرساني عالمياً. درجات الحرارة صيفاً تتخطى 45°C مما يُسرّع إماهة الأسمنت ويقلل وقت التشغيل لأقل من 30 دقيقة. حسب QCS 2024 §S5-P5 وACI 305R، عند الضرورة يُستخدم النيتروجين السائل في الخلاط (LN2 injection) لتخفيض حرارة الخلطة فوراً. الصب الليلي في الصيف بين 11 مساءً و5 صباحاً هو الممارسة المثلى. المعالجة (Curing) تبدأ خلال دقائق من الصب.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>درجة حرارة الخلطة عند الصب</td><td>32°C أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>درجة حرارة الإسمنت عند الوصول</td><td>70°C أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>وقت النقل من المصنع</td><td>90 دقيقة أو أقل</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>تبريد ماء الخلط</td><td>إضافة ثلج أو تبريد المياه</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>الصب ليلاً</td><td>يُوصى به في فصل الصيف</td><td>QCS 2024 §S5-P5</td></tr></table>
<h3>🔍 خطة الفحص والاختبار</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">برنامج الاختبار الخرساني يجب أن يكون جزءاً من ITP المعتمد قبل بدء الصب. حسب QCS 2024 §S5-P5، كل نتيجة اختبار تُوثَّق فوراً في نظام إلكتروني. إذا فشلت مكعبات الـ 28 يوم، تُؤخذ Cores من الخرسانة المصبوبة — إذا أظهرت 85% أو أكثر من fck تُعتبر مقبولة. فشل الـ Cores يعني هدم محتمل أو تعزيز بتركيب FRP (Carbon Fibre).</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>الاختبار</th><th>التكرار</th><th>معيار القبول</th></tr>
<tr><td>هبوط الخرسانة (Slump)</td><td>كل شاحنة</td><td>100–150مم (للضخ)</td></tr>
<tr><td>درجة الحرارة</td><td>كل شاحنة</td><td>32°C أو أقل</td></tr>
<tr><td>مكعبات الاختبار</td><td>كل 50م³ أو لكل صبة</td><td>3 مكعبات لكل صبة</td></tr>
<tr><td>مقاومة الضغط 7 أيام</td><td>كل 50م³</td><td>65% أو أكثر من القيمة التصميمية</td></tr>
<tr><td>مقاومة الضغط 28 يوم</td><td>كل 50م³</td><td>تساوي أو تفوق fck المطلوبة</td></tr></table>
<h3>🛡️ غطاء التسليح حسب البيئة</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">الغطاء الخرساني هو خط الدفاع الأول لحماية التسليح من الصدأ. في قطر، معظم المشاريع تقع في فئة XS1-XS2 (بيئة بحرية) حيث الكلوريدات في الهواء والتربة عالية جداً. غطاء 50mm في XS2 يعني أن الكلوريدات تستغرق أكثر من 100 سنة للوصول للحديد (تصميم للعمر الافتراضي). Check Cover Meter بالمغناطيس إلزامي على 100% من المساحة قبل الصب.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>فئة التعرض</th><th>البيئة</th><th>الغطاء الأدنى</th></tr>
<tr><td>XC1</td><td>جافة أو داخلية</td><td>20مم</td></tr>
<tr><td>XC2</td><td>رطبة</td><td>30مم</td></tr>
<tr><td>XD1</td><td>ملوحة معتدلة</td><td>35مم</td></tr>
<tr><td>XS1</td><td>قرب البحر</td><td>40مم</td></tr>
<tr><td>XS2</td><td>بيئة ساحلية (قطر)</td><td>50مم</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>📊 Approved Concrete Grades</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Element</th><th>Grade</th><th>w/c Ratio</th><th>Reference</th></tr>
<tr><td>Foundations and Basements</td><td>C35</td><td>max 0.45</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Columns and Shear Walls</td><td>C40 to C50</td><td>max 0.40</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Slabs and Beams</td><td>C35 to C40</td><td>max 0.45</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Precast Concrete</td><td>C50 to C60</td><td>max 0.38</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Sulphate Resistant Concrete</td><td>C35 + GGBS</td><td>max 0.40</td><td>QCS 2024 §S12</td></tr></table>
<h3>🌡️ Hot Weather Concreting (Qatar)</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Mix Temperature at Discharge</td><td>32 deg C maximum</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Cement Temperature on Arrival</td><td>70 deg C maximum</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Transport Time from Batching Plant</td><td>90 minutes maximum</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Mixing Water Cooling</td><td>Ice addition or chilled water</td><td>QCS 2024 §S5-P5</td></tr>
<tr><td>Night Casting</td><td>Recommended during summer months</td><td>QCS 2024 §S5-P5</td></tr></table>
</div>
` };

  c["bld_masonry"] = { title: '🧱 الطابوق والبناء — QCS 2024 §S5-P9', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S5-P9 | BS EN 771/772 | ASTM C90</div>
<h3>🧱 أنواع الطابوق المعتمدة</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">حسب QCS 2024 §S5-P9-Cl.9.2، جميع أنواع البلوك الخرساني تخضع لاعتماد مسبق من المختبر. البلوك الكثيف (Solid) بكثافة ≥1800 kg/m³ يُستخدم للجدران الخارجية الحاملة. بلوك AAC (Autoclaved Aerated Concrete) يتميز بوزنه الخفيف (600-700 kg/m³) وعزله الحراري الممتاز مما يقلل أحمال الهيكل ويخفّض تكاليف التكييف. كل شحنة تستلزم Mill Certificate وشهادة اختبار معتمدة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>النوع</th><th>الاستخدام</th><th>مقاومة الضغط</th></tr>
<tr><td>بلوك خرساني صلب (Solid)</td><td>جدران خارجية تحمّل أحمالاً</td><td>7 MPa أو أكثر</td></tr>
<tr><td>بلوك خرساني أجوف (Hollow)</td><td>جدران داخلية غير تحمّل</td><td>4 MPa أو أكثر</td></tr>
<tr><td>بلوك عازل (AAC/Ytong)</td><td>جدران داخلية + عزل حراري</td><td>2.5 MPa أو أكثر</td></tr>
<tr><td>طوب أحمر حراري</td><td>مناطق المداخن والأفران</td><td>10 MPa أو أكثر</td></tr></table>
<h3>🔧 متطلبات ملاط البناء</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">جودة الملاط تحدد مقاومة الجدار للتشققات والمياه. حسب QCS 2024 §S5-P9-Cl.9.4، الملاط M10 (نسبة 1 إسمنت : 3 رمل) مقاوم ومناسب للجدران الخارجية والمناطق الرطبة. خلط الملاط يدوياً في الموقع ممنوع للمشاريع الكبيرة — يجب استخدام خلاط ميكانيكي لضمان التجانس. وقت الاستخدام 1.5 ساعة عند 30°C وأقل في الجو الحار، لذا يُخلط على دفعات صغيرة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>تصنيف الملاط</td><td>M5 (جدران داخلية) | M10 (جدران خارجية)</td><td>QCS 2024 §S5-P9</td></tr>
<tr><td>نسبة الماء/الإسمنت</td><td>0.60 أو أقل</td><td>QCS 2024 §S5-P9</td></tr>
<tr><td>سُمك الوصلات الأفقية</td><td>10مم ± 3مم</td><td>BS EN 1996</td></tr>
<tr><td>ملء الوصلات الرأسية</td><td>100% بدون فراغات</td><td>QCS 2024 §S5-P9</td></tr>
<tr><td>تربيط الصفوف (Bond)</td><td>انحراف لا يقل عن ربع الوحدة</td><td>BS EN 1996</td></tr></table>
<h3>📏 تفاصيل التنفيذ</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">حسب QCS 2024 §S5-P9-Cl.9.5، جودة البناء تُقاس بتفاصيله الدقيقة. الحديد الأفقي (bed joint reinforcement) كل 400mm يمنع التشققات الحرارية الشائعة في قطر. ارتفاع 1.2م يومياً الحد الأقصى لمنع انهيار الجدار قبل تصلّب الملاط. أسياخ الربط L-bars تضمن التماسك بين الجدار والعناصر الخرسانية — هذا الربط يمنع انهيار الجدار كلياً عند الاهتزازات.</p>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">جودة تنفيذ البناء تتحدد بالتفاصيل الدقيقة. حسب QCS 2024 §S5-P9-Cl.9.5، وصلات الملاط يجب أن تكون مملوءة بالكامل — الفراغات تُضعف الجدار حتى 40% وتُشكّل مسارات للرطوبة. ارتفاع 1.2م يومياً هو الحد الأقصى لمنع الانهيار قبل تصلّب الملاط. أسياخ الربط مع الأعمدة والكمرات تمنع الانهيار الكلي للجدار عند الزلازل أو الاهتزازات.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>الارتفاع اليومي للبناء</td><td>1.2م أو أقل يومياً</td></tr>
<tr><td>ترطيب البلوك</td><td>قبل البناء بساعتين</td></tr>
<tr><td>الربط بالإطار الخرساني</td><td>أسياخ ربط كل 400مم</td></tr>
<tr><td>فتحات النوافذ والأبواب</td><td>عتب خرساني مسلح بعمق 200مم فوق الفتحة</td></tr>
<tr><td>فواصل الحركة الحرارية</td><td>كل 6م أفقياً أو حسب التصميم</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🧱 Approved Masonry Block Types</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Type</th><th>Application</th><th>Compressive Strength</th></tr>
<tr><td>Solid Concrete Block</td><td>External load-bearing walls</td><td>min 7 MPa</td></tr>
<tr><td>Hollow Concrete Block</td><td>Internal non-load-bearing</td><td>min 4 MPa</td></tr>
<tr><td>AAC/Ytong Block</td><td>Internal partitions with thermal insulation</td><td>min 2.5 MPa</td></tr>
<tr><td>Fire Brick</td><td>Chimney and furnace areas</td><td>min 10 MPa</td></tr></table>
<h3>🔧 Mortar Specification</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Mortar Classification</td><td>M5 (internal) and M10 (external)</td><td>QCS 2024 §S5-P9</td></tr>
<tr><td>Water to Cement Ratio</td><td>max 0.60</td><td>QCS 2024 §S5-P9</td></tr>
<tr><td>Bed Joint Thickness</td><td>10mm plus or minus 3mm</td><td>BS EN 1996</td></tr>
<tr><td>Perpend Joint Fill</td><td>100 percent, no voids permitted</td><td>QCS 2024 §S5-P9</td></tr>
<tr><td>Bond Pattern</td><td>Overlap minimum quarter block length</td><td>BS EN 1996</td></tr></table>
</div>
` };

  c["bld_mep"] = { title: '⚡ الكهروميكانيك (MEP) — QCS 2024 §S21 + KAHRAMAA', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S21 | KAHRAMAA 2024 | QCDD | NFPA 13/72 | ASHRAE 90.1</div>
<h3>⚡ أنظمة الكهرباء</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">منظومة الكهرباء في المباني القطرية تخضع لـ KAHRAMAA 2024 الذي يُحدد معايير التصميم والتنفيذ. الجهد القياسي 415/240V ثلاثي الأطوار 50Hz. المبنى السكني فوق 5 طوابق يجب أن يملك غرفة محولات (Substation) مستقلة داخله. كل طابق يحتاج تغذية منفصلة مؤمَّنة بـ MCB وRCD. كابلات مسار الهروب من الحرائق يجب أن تكون مقاومة للحريق (FP/SWA) بتصنيف E90 لمدة 90 دقيقة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>النظام</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>توزيع الكهرباء</td><td>11kV / 415V / 230V</td><td>KAHRAMAA 2024</td></tr>
<tr><td>المولد الاحتياطي</td><td>100% للأحمال الحيوية</td><td>KAHRAMAA 2024</td></tr>
<tr><td>نظام UPS</td><td>بطارية لمدة 30 دقيقة أو أكثر</td><td>QCS 2024 §S21</td></tr>
<tr><td>نظام الإضاءة</td><td>LED | معامل إعادة اللون CRI 80 أو أعلى</td><td>QCS 2024 §S21</td></tr>
<tr><td>كثافة استهلاك الطاقة</td><td>12 W/م² أو أقل (مكاتب)</td><td>ASHRAE 90.1</td></tr></table>
<h3>❄️ أنظمة التكييف والتهوية HVAC</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">التكييف في قطر يمثل 60-70% من استهلاك الطاقة في المباني، لذلك اختيار النظام الصح يؤثر على عمر المشروع الاقتصادي. حسب QCS 2024 §S21-P4، كفاءة الشيلر (COP ≥ 5.5) أكثر كفاءة من الوحدات المنفردة. في مناطق Lusail وThe Pearl وMsheireb، التبريد المركزي (District Cooling) من KAHRAMAA إلزامي — يتعامل معه المهندس كمصدر تغذية خارجية تصمم معه نظام التوزيع الداخلي. حسابات الحمل الحراري تبدأ بالتحليل في كل اتجاه للمبنى.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>الحرارة الخارجية التصميمية (صيف)</td><td>DBT = 46°C | WBT = 28°C</td><td>QCS 2024 §S21</td></tr>
<tr><td>الرطوبة النسبية الداخلية</td><td>50 – 60%</td><td>ASHRAE 55</td></tr>
<tr><td>درجة الحرارة الداخلية</td><td>22 – 24°C (مكاتب)</td><td>ASHRAE 55</td></tr>
<tr><td>معدل تجديد الهواء النقي</td><td>10 لتر/ث لكل شخص أو أكثر</td><td>ASHRAE 62.1</td></tr>
<tr><td>نظام التكييف المركزي</td><td>Chiller + AHU + FCU</td><td>QCS 2024 §S21</td></tr>
<tr><td>كفاءة الشيلر (COP)</td><td>5.5 أو أعلى</td><td>ASHRAE 90.1</td></tr></table>
<h3>🔥 أنظمة الحماية من الحريق</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">منظومة مكافحة الحريق في قطر تخضع لرقابة QCDD (الدفاع المدني) بدرجة صارمة جداً. الرشاشات (Sprinklers) حسب NFPA 13 تُغطي كل بقعة في المبنى بتباعد ≤4.6م. ضغط تشغيل الرشاش 0.5-1.2 bar عند أعلى رشاش. مضخة الحريق تكون مزدوجة (ديزل + كهرباء) لضمان الاستمرارية عند انقطاع التيار. اختبار QCDD الإلزامي قبل التسليم يشمل تشغيل الإنذار + فتح الرشاشات + قياس الضغط.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>النظام</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>رشاشات الحريق</td><td>NFPA 13 — في جميع الطوابق</td><td>QCDD 2024</td></tr>
<tr><td>كاشفات الدخان</td><td>NFPA 72 — في كل غرفة</td><td>QCDD 2024</td></tr>
<tr><td>نظام الإنذار</td><td>بصري + صوتي + يدوي</td><td>QCDD 2024</td></tr>
<tr><td>خزان مياه الإطفاء</td><td>60 دقيقة تشغيل أو أكثر</td><td>QCDD 2024</td></tr>
<tr><td>سلالم الطوارئ</td><td>مضغوطة ومقاومة للدخان</td><td>QCDD 2024</td></tr>
<tr><td>وقت الإخلاء</td><td>2.5 دقيقة لكل طابق أو أقل</td><td>QCDD 2024</td></tr></table>
<h3>🛗 المصاعد والرافعات</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">تصميم المصاعد في الأبراج يعتمد على Traffic Analysis — دراسة حركة الأشخاص في ساعات الذروة. الهدف: زمن انتظار ≤30 ثانية في المكاتب و≤60 ثانية في السكني. مصعد الإطفاء (Firefighter Lift) حسب QCDD إلزامي في كل مبنى فوق 10 طوابق — يتميز بأن يعمل بشكل مستقل عند اشتعال الحريق ويصل مباشرة لكل طابق. عمق البئر (Pit Depth) ≥1.5م للمصاعد السريعة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th></tr>
<tr><td>متوسط وقت الانتظار</td><td>30 ثانية أو أقل (مكاتب) | 60 ثانية أو أقل (سكني)</td></tr>
<tr><td>سرعة المصعد فوق 15 طابق</td><td>2.5 م/ث أو أكثر</td></tr>
<tr><td>مصعد الإطفاء</td><td>إلزامي في جميع المباني</td></tr>
<tr><td>مصعد ذوي الاحتياجات الخاصة</td><td>إلزامي حسب QCS 2024 §S5</td></tr>
<tr><td>المرجع</td><td>BS EN 81 | QCDD</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>⚡ Electrical Systems</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>System</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Power Distribution</td><td>11kV, 415V, 230V</td><td>KAHRAMAA 2024</td></tr>
<tr><td>Standby Generator</td><td>100% critical load coverage</td><td>KAHRAMAA 2024</td></tr>
<tr><td>UPS System</td><td>Battery backup minimum 30 minutes</td><td>QCS 2024 §S21</td></tr>
<tr><td>Lighting System</td><td>LED, CRI minimum 80</td><td>QCS 2024 §S21</td></tr>
<tr><td>Lighting Power Density</td><td>max 12 W per sqm (offices)</td><td>ASHRAE 90.1</td></tr></table>
<h3>🔥 Fire Protection Systems</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>System</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Fire Sprinklers</td><td>NFPA 13, all floors</td><td>QCDD 2024</td></tr>
<tr><td>Smoke Detectors</td><td>NFPA 72, every room</td><td>QCDD 2024</td></tr>
<tr><td>Fire Alarm</td><td>Visual, audible and manual call points</td><td>QCDD 2024</td></tr>
<tr><td>Fire Water Tank</td><td>Minimum 60 minutes operation</td><td>QCDD 2024</td></tr>
<tr><td>Emergency Stairs</td><td>Pressurised, smoke-free</td><td>QCDD 2024</td></tr></table>
</div>
` };

  c["bld_finishes"] = { title: '🎨 التشطيبات — QCS 2024 §S5-P10/P11', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S5-P10/P11 | BS 8204 | ASTM C1028 | QCDD</div>
<h3>🪟 الواجهات والكسوة الخارجية</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">الواجهة الخارجية في قطر تتعرض لأقسى الظروف: أشعة UV شديدة + حرارة + رياح محملة برمال + رطوبة ملحية ساحلية. حسب QCS 2024 §S5-P10، الزجاج المزدوج Low-E الحد الأدنى لكل المباني. معامل SHGC ≤ 0.40 يقلل الطاقة الشمسية الداخلة بنسبة 60%. ألواح ACM (Aluminium Composite) تُستخدم كثيراً لكن لا بد أن تكون من فئة A2 (مقاومة للحريق) — حريق Grenfell في لندن سببه ألواح ACM بفئة C (قابلة للاشتعال).</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>الزجاج المزدوج (DGU)</td><td>قيمة U أقل من أو تساوي 2.0 W/م²K</td><td>QCS 2024 §S5</td></tr>
<tr><td>الزجاج العاكس للشمس</td><td>SHGC لا يتجاوز 0.40</td><td>QCS 2024 §S5</td></tr>
<tr><td>نظام الواجهة المعلقة (Curtain Wall)</td><td>اختبار ضغط الهواء والماء</td><td>ASTM E1233</td></tr>
<tr><td>ألواح الألمنيوم الكمبوزيت (ACM)</td><td>مقاوم للحريق — الفئة A2</td><td>QCDD 2024</td></tr>
<tr><td>ألواح الخرسانة مسبقة الصنع</td><td>C40 + تشطيب الدرجة A</td><td>QCS 2024 §S5</td></tr></table>
<h3>🪨 أعمال البلاط والأرضيات</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">اختيار البلاط يبدأ بتحديد الاستخدام. R-value للانزلاق الرطب حاسم للسلامة: R9 للأماكن العامة الجافة، R11 للمطبخ/الحمام، R13 للأماكن الخارجية. اللاصق يجب Class C2 حسب BS EN 12004 للأرضيات — C2TE للجدران الكبيرة لمنع الانزلاق. فحص قرع البلاط بعد اللصق ضروري للكشف عن الفراغات (Hollow Spots) — نسبة الفراغات تتجاوز 20% تعني إعادة التركيب.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>بلاط السيراميك</td><td>مقاومة الانزلاق R9 إلى R12</td><td>DIN 51130</td></tr>
<tr><td>الرخام والجرانيت</td><td>امتصاص ماء 0.5% أو أقل</td><td>ASTM C97</td></tr>
<tr><td>بلاط البورسلان</td><td>مقاومة 35 MPa أو أكثر</td><td>ASTM C648</td></tr>
<tr><td>أرضيات الإيبوكسي</td><td>سماكة 3مم أو أكثر</td><td>QCS 2024 §S5</td></tr>
<tr><td>فجوات الوصلات</td><td>3مم أو أقل (عام) | 1.5مم أو أقل (حمام)</td><td>QCS 2024 §S5</td></tr>
<tr><td>استواء الأرضية</td><td>± 3مم لكل 3م مسطرة</td><td>BS 8204</td></tr></table>
<h3>🖌️ أعمال الطلاء والجبس</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">الطلاء الخارجي في قطر يواجه تحدي الأشعة فوق البنفسجية التي تُحطم الدهان العادي خلال سنة. Elastomeric Paint بسُمك 200-300 μm DFT يتحمل 10 سنوات+. الأسطح يجب نظيفة وجافة قبل الطلاء — أي رطوبة تسبب تقشراً. في الداخل، Gypsum Board (الجبسون) أسرع تركيباً وأدق استواءً من الجبس التقليدي الرطب — لكن يحتاج معالجة خاصة في الحمامات (Water Resistant Type).</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th></tr>
<tr><td>طلاء خارجي</td><td>Elastomeric — مقاوم للأشعة فوق البنفسجية — ضمان 10 سنوات</td></tr>
<tr><td>طلاء داخلي</td><td>قابل للغسل (Washable) — 3 طبقات</td></tr>
<tr><td>جبس داخلي</td><td>سماكة 12مم أو أكثر — استواء ± 3مم</td></tr>
<tr><td>ألواح الجبس (Drywall)</td><td>12.5مم — مقاوم للرطوبة في المطابخ والحمامات</td></tr>
<tr><td>عزل حراري للأسقف</td><td>R-Value لا يقل عن 5.5 (قطر)</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🪟 Facades and External Cladding</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Double Glazing DGU</td><td>U-Value max 2.0 W per sqmK</td><td>QCS 2024 §S5</td></tr>
<tr><td>Solar Control Glass</td><td>SHGC max 0.40</td><td>QCS 2024 §S5</td></tr>
<tr><td>Curtain Wall System</td><td>Air and water pressure test required</td><td>ASTM E1233</td></tr>
<tr><td>Aluminium Composite Panels</td><td>Class A2 fire rated</td><td>QCDD 2024</td></tr>
<tr><td>Precast Concrete Panels</td><td>C40 with Grade A surface finish</td><td>QCS 2024 §S5</td></tr></table>
<h3>🪨 Floor Tiling and Finishes</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Ceramic Tiles</td><td>Slip resistance R9 to R12</td><td>DIN 51130</td></tr>
<tr><td>Marble and Granite</td><td>Water absorption max 0.5%</td><td>ASTM C97</td></tr>
<tr><td>Porcelain Tiles</td><td>Strength min 35 MPa</td><td>ASTM C648</td></tr>
<tr><td>Floor Levelness</td><td>plus or minus 3mm per 3m straight edge</td><td>BS 8204</td></tr></table>
</div>
` };

  c["bld_handover"] = { title: '✅ التسليم والاختبارات — QCS 2024 + FIDIC Cl.11', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S5 | FIDIC Cl.9/11 | BS 8210 | QCDD</div>
<h3>🔬 اختبارات الإتمام والتشغيل</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">مرحلة الكوميسيونينج (Commissioning) هي اختبار المبنى ككل. كل نظام يُختبر أولاً بشكل مستقل (Individual Testing)، ثم تجتمع الأنظمة معاً في Integrated Testing. TAB (Test-Adjust-Balance) لأنظمة HVAC يضمن وصول الكمية الصحيحة من الهواء لكل غرفة — الفرق الموثّق ±10% مقبول. نتائج الاختبارات تُوثَّق في تقارير مُوقَّعة من المهندس المعتمد وممثل العميل والاستشاري.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>النظام</th><th>الاختبار</th><th>المرجع</th></tr>
<tr><td>أنظمة التكييف والتهوية</td><td>ضبط وموازنة الهواء والماء (TAB)</td><td>ASHRAE 90.1</td></tr>
<tr><td>الكهرباء (جهد منخفض)</td><td>اختبار الاستمرارية + التأريض + RCD</td><td>BS 7671</td></tr>
<tr><td>أنظمة الحريق</td><td>اختبار قبول النظام الكامل</td><td>NFPA 72 / QCDD</td></tr>
<tr><td>المصاعد</td><td>اختبار الحمل + السرعة + الأجهزة الأمنية</td><td>BS EN 81 / QCDD</td></tr>
<tr><td>شبكة المياه الداخلية</td><td>ضغط اختبار = 1.5 × الضغط التصميمي</td><td>KAHRAMAA 2024</td></tr>
<tr><td>أنظمة BMS</td><td>اختبار نقطة إلى نقطة</td><td>QCS 2024 §S21</td></tr></table>
<h3>📋 قائمة الفحص النهائي</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">قائمة العيوب النهائية تُعدّ بعد جولة تفتيشية شاملة بحضور العميل والاستشاري والمقاول. العيوب الحرجة (Critical) مثل تسريب مياه أو كهرباء مكشوفة تمنع التسليم حتى إصلاحها كلياً. العيوب الطفيفة (Minor) مثل خدش في دهان تُوثَّق وتُحدَّد مدة إصلاح. الهدف وصول الـ Punch List للصفر قبل إصدار شهادة الإتمام.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>القسم</th><th>بنود الفحص الرئيسية</th></tr>
<tr><td>الهيكل الإنشائي</td><td>شقوق — هبوط — تشوه — تصدع</td></tr>
<tr><td>التشطيبات الداخلية</td><td>استواء — تلون — تشقق — فجوات</td></tr>
<tr><td>الأبواب والنوافذ</td><td>إحكام — عدم تسرب هواء — سلاسة الحركة</td></tr>
<tr><td>الكهرباء</td><td>مقابس — إضاءة — لوحة توزيع — تأريض</td></tr>
<tr><td>السباكة</td><td>عدم تسرب — ضغط — تصريف سليم</td></tr>
<tr><td>الحريق</td><td>رشاشات — إنذار — لافتات طوارئ — مخارج</td></tr></table>
<h3>📄 مستندات التسليم الإلزامية</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">مستندات التسليم هي الذاكرة الدائمة للمشروع. As-Built Drawings يجب أن تعكس كل التغييرات الميدانية بدقة — المهندس المشرف يعتمدها. O&M Manual (دليل التشغيل والصيانة) يجب أن يتضمن تفاصيل كل جهاز وجدول صيانة دورية وقائمة قطع غيار. بدون شهادة QCDD لا يُسمح قانونياً بإسكان المبنى — وبدون شهادة KAHRAMAA لا يُوصَّل الكهرباء أو الماء.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>المستند</th><th>الملاحظة</th></tr>
<tr><td>رسومات التنفيذ الفعلي (As-Built)</td><td>جميع الأنظمة — إلزامية قبل التسليم</td></tr>
<tr><td>شهادات مواد البناء</td><td>إسمنت + حديد + تصاميم الخلطات</td></tr>
<tr><td>تقارير الاختبارات الكاملة</td><td>مختبر معتمد فقط</td></tr>
<tr><td>دليل التشغيل والصيانة</td><td>جميع الأنظمة الميكانيكية والكهربائية</td></tr>
<tr><td>ضمانات الشركات المصنّعة</td><td>HVAC + مصاعد + واجهات + عزل مائي</td></tr>
<tr><td>شهادة QCDD</td><td>إلزامية للسكن والاستخدام</td></tr>
<tr><td>شهادة KAHRAMAA</td><td>إلزامية قبل وصل الكهرباء والمياه</td></tr></table>
<h3>⏱️ فترة الضمان (FIDIC Cl.11)</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">فترة العيوب (DNP = Defects Notification Period) هي 12 شهراً كحد أدنى حسب FIDIC Sub-Clause 11.1. خلال هذه الفترة، أي عيب يظهر يُبلَّغ عنه كتابياً وعلى المقاول إصلاحه على نفقته. احتجاز 50% من خطاب الضمان (Performance Security) حتى إصدار Performance Certificate النهائي. في قطر، بعض العقود الحكومية تمدد DNP إلى 24 شهراً للأعمال الإنشائية المعقدة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المدة</th></tr>
<tr><td>فترة الإخطار عن العيوب (DNP)</td><td>12 شهراً من تاريخ الإتمام</td></tr>
<tr><td>ضمان الهيكل الإنشائي</td><td>10 سنوات</td></tr>
<tr><td>ضمان التشطيبات الخارجية</td><td>5 سنوات</td></tr>
<tr><td>ضمان المعدات الميكانيكية</td><td>سنتان من تاريخ التشغيل</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🔬 Commissioning Tests</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>System</th><th>Test</th><th>Reference</th></tr>
<tr><td>HVAC Systems</td><td>Test, Adjust and Balance TAB</td><td>ASHRAE 90.1</td></tr>
<tr><td>Electrical LV</td><td>Continuity, Earth and RCD test</td><td>BS 7671</td></tr>
<tr><td>Fire Systems</td><td>Full System Acceptance Test</td><td>NFPA 72 / QCDD</td></tr>
<tr><td>Lifts and Elevators</td><td>Load test, speed check and safety devices</td><td>BS EN 81 / QCDD</td></tr>
<tr><td>Internal Water Network</td><td>Pressure test at 1.5 times design pressure</td><td>KAHRAMAA 2024</td></tr>
<tr><td>BMS Systems</td><td>Point-to-Point Testing</td><td>QCS 2024 §S21</td></tr></table>
<h3>📄 Mandatory Handover Documents</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Document</th><th>Note</th></tr>
<tr><td>As-Built Drawings</td><td>All systems, mandatory before handover</td></tr>
<tr><td>Material Certificates</td><td>Cement, steel, concrete mix designs</td></tr>
<tr><td>Full Test Reports</td><td>From accredited laboratory only</td></tr>
<tr><td>Operation and Maintenance Manual</td><td>All mechanical and electrical systems</td></tr>
<tr><td>Manufacturer Warranties</td><td>HVAC, lifts, curtain wall, waterproofing</td></tr>
<tr><td>QCDD Certificate</td><td>Mandatory for occupation</td></tr>
<tr><td>KAHRAMAA Certificate</td><td>Mandatory before power and water connection</td></tr></table>
</div>
` };

  c["bld_materials"] = { title: '🧪 مواد البناء — QCS 2024 §S5 + §S12', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.08);border:1px solid rgba(90,15,15,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 §S5/S12 | BS EN 197/10080 | ASTM A615 | KAHRAMAA 2024</div>
<h3>🏭 أنواع الإسمنت المعتمدة</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">اختيار نوع الإسمنت في قطر يُعدّ قراراً هندسياً حاسماً بسبب البيئة العدوانية. OPC (CEM I) للاستخدام العام في البيئات العادية. SRPC (Sulphate Resistant) إلزامي عند وجود كبريتات عالية في التربة (SO3 > 0.5%) — وهذا شائع في مناطق واسعة من قطر. GGBS بنسبة 50-70% يقلل الحرارة الكلية للإماهة لمنع التشققات الحرارية في الصب الضخم (كأساسات الأبراج). تخزين الأسمنت: ≤90 يوم، مرفوع عن الأرض، بعيد عن الرطوبة.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>النوع</th><th>الاستخدام في قطر</th><th>المرجع</th></tr>
<tr><td>إسمنت عادي (OPC / CEM I)</td><td>هياكل عامة في المناطق الجافة</td><td>BS EN 197-1</td></tr>
<tr><td>إسمنت مقاوم للكبريتات (SRPC)</td><td>الأساسات في التربة الكبريتية</td><td>BS EN 197-1</td></tr>
<tr><td>GGBS (50 – 70%)</td><td>البيئة الساحلية — خرسانة كثيفة</td><td>BS 6699</td></tr>
<tr><td>Silica Fume (5 – 10%)</td><td>الخرسانة عالية المقاومة</td><td>ASTM C1240</td></tr>
<tr><td>PFA / Fly Ash (25 – 35%)</td><td>الصب الضخم — تقليل الحرارة</td><td>BS EN 450</td></tr></table>
<h3>🔩 حديد التسليح</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">حديد التسليح B500B هو المعيار القطري حسب QCS 2024 §S12. الـ "B" تعني Ductile (لديّن) مما يسمح للحديد بالاستطالة قبل الكسر — خاصية أساسية للسلامة الزلزالية. Mill Certificate يأتي مع كل شحنة ويوثّق التركيب الكيميائي والخواص الميكانيكية. تخزين الحديد: مصنَّف بالقطر، مُعلَّم بوضوح، مرفوع عن الأرض لمنع الصدأ. الحديد المصدأ بنسبة > 5% مرفوض.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>درجة الفولاذ</td><td>B500B | حد الخضوع fy 500 MPa أو أعلى</td><td>BS 4449</td></tr>
<tr><td>الاستطالة عند الكسر</td><td>12% أو أكثر</td><td>BS EN 10080</td></tr>
<tr><td>قابلية اللحام</td><td>Carbon Equivalent CE لا يتجاوز 0.52%</td><td>BS EN 10080</td></tr>
<tr><td>شهادة المصنع (Mill Certificate)</td><td>إلزامية لكل شحنة</td><td>QCS 2024 §S12</td></tr>
<tr><td>تكرار اختبار الشد</td><td>كل 25 طن أو أقل</td><td>QCS 2024 §S12</td></tr></table>
<h3>💧 أنظمة العزل المائي</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">العزل المائي في قطر حاسم لأن المياه الجوفية مالحة وعدوانية. الغشاء البيتوميني المُعدَّل (SBS) يتميز بمرونة عالية في درجات الحرارة المتطرفة. العزل البلوري (Crystalline) يعمل بطريقة مختلفة: يتفاعل مع الماء لينمو ويسد المسامات — مناسب للخزانات والأقبية لأنه لا يُزال. PVC Membrane للأسطح المستوية يجب أن يكون 1.5mm سُمك كحد أدنى مع لحام حراري للوصلات. أي خلل في العزل = تلف هيكلي مكلف.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>النوع</th><th>الاستخدام</th><th>فترة الضمان</th></tr>
<tr><td>غشاء بيتوميني (Bituminous Membrane)</td><td>الأسطح وأسفل الأساسات</td><td>10 سنوات</td></tr>
<tr><td>عزل بلوري (Crystalline)</td><td>يُطبَّق داخل الخرسانة</td><td>مدى الحياة</td></tr>
<tr><td>غشاء PVC / TPO</td><td>الأسطح المستوية</td><td>15 سنة</td></tr>
<tr><td>عزل سائل (Liquid Applied)</td><td>التفاصيل المعقدة والزوايا</td><td>10 سنوات</td></tr></table>
<h3>🔥 مواد العزل الحراري</h3>
<p style="font-size:12px;line-height:1.7;color:var(--text2);margin:8px 0;padding:8px 10px;background:rgba(90,15,15,0.03);border-right:3px solid rgba(90,15,15,0.2);border-radius:4px;">العزل الحراري في قطر ليس ترفاً بل ضرورة اقتصادية. المبنى بدون عزل يستهلك ضعف طاقة التكييف. XPS Board (Extruded Polystyrene) هو الأفضل للأسطح المضغوطة (تحت البلاط/الأساسات) بكثافة ≥35 kg/m³. Rockwool للجدران الخارجية والمضلات لأنه A1 (غير قابل للاحتراق) وصوتي ممتاز. PIR Foam أعلى عزلاً لكنه أغلى — يُستخدم حيث المساحة محدودة (حواف الأسقف). متطلبات GSAS: U-value ≤ 0.25 W/m²K للأسطح.</p>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>المادة</th><th>الاستخدام</th><th>قيمة U المستهدفة</th></tr>
<tr><td>الصوف الصخري (Rock Wool)</td><td>الجدران والأسقف</td><td>0.40 W/م²K أو أقل</td></tr>
<tr><td>رغوة PIR / PUR</td><td>الأسطح المستوية</td><td>0.25 W/م²K أو أقل</td></tr>
<tr><td>EPS (بوليستيرين)</td><td>عزل تحت البلاطة</td><td>0.35 W/م²K أو أقل</td></tr>
<tr><td>ألواح XPS</td><td>الأسطح المعرضة للشمس وتحت الأساسات</td><td>0.30 W/م²K أو أقل</td></tr></table>
<div style="margin-top:12px;text-align:center;"><button onclick="QS.openDetail('buildings_towers')" style="background:rgba(90,15,15,0.1);border:1px solid rgba(90,15,15,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;color:#5A0F0F;font-weight:700;">↩️ العودة للرئيسية</button></div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🏭 Cement Types Used in Qatar</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Type</th><th>Application</th><th>Reference</th></tr>
<tr><td>OPC CEM I</td><td>General structures in dry zones</td><td>BS EN 197-1</td></tr>
<tr><td>SRPC Sulphate Resistant</td><td>Foundations in sulphatic soil</td><td>BS EN 197-1</td></tr>
<tr><td>GGBS 50 to 70 percent</td><td>Coastal environment, dense concrete</td><td>BS 6699</td></tr>
<tr><td>Silica Fume 5 to 10 percent</td><td>High-strength concrete</td><td>ASTM C1240</td></tr>
<tr><td>PFA Fly Ash 25 to 35 percent</td><td>Mass pours, heat reduction</td><td>BS EN 450</td></tr></table>
<h3>🔩 Reinforcement Steel</h3>
<table class="dm-table"><tr style="background:rgba(90,15,15,0.08);"><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Steel Grade</td><td>B500B, yield strength min 500 MPa</td><td>BS 4449</td></tr>
<tr><td>Elongation at Fracture</td><td>minimum 12 percent</td><td>BS EN 10080</td></tr>
<tr><td>Weldability Carbon Equivalent</td><td>CE max 0.52 percent</td><td>BS EN 10080</td></tr>
<tr><td>Mill Certificate</td><td>Mandatory for every shipment</td><td>QCS 2024 §S12</td></tr>
<tr><td>Tensile Test Frequency</td><td>Every 25 tonnes or less</td><td>QCS 2024 §S12</td></tr></table>
</div>
` };


  c["bld_calculator"] = { title: '🧮 حاسبة المباني الشاملة — QCS 2024', content: `
<div class="lang-content-ar">
<div style="background:rgba(90,15,15,0.10);border:1px solid rgba(90,15,15,0.30);border-radius:10px;padding:10px;margin-bottom:12px;font-size:11px;">
📌 QCS 2024 §S5 | BS EN 206 | BS 4449 | ASTM C90 | احسب كميات: خرسانة · حديد · طابوق · بلاستر · بلاط · عزل
</div>

<div id="bldc-wrap" style="font-size:12px;">

<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">

  <div style="background:rgba(0,0,0,0.15);border:1px solid rgba(90,15,15,0.25);border-radius:8px;padding:10px;">
    <div style="color:#C9A84C;font-weight:700;margin-bottom:8px;">🏗️ بيانات المشروع</div>
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">نوع المبنى</label>
    <select id="bldc-type" onchange="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:11px;margin-bottom:6px;">
      <option value="res">🏠 سكني (Residential)</option>
      <option value="com">🏢 تجاري (Commercial)</option>
      <option value="mix">🏙️ مختلط (Mixed Use)</option>
    </select>
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">مساحة الطابق الواحد (م²)</label>
    <input id="bldc-area" type="number" value="500" min="50" max="10000" oninput="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:12px;margin-bottom:6px;">
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">عدد الطوابق (فوق الأرض)</label>
    <input id="bldc-floors" type="number" value="10" min="1" max="80" oninput="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:12px;margin-bottom:6px;">
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">ارتفاع الطابق (م)</label>
    <select id="bldc-fh" onchange="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:11px;">
      <option value="2.8">2.8 م (سكني منخفض)</option>
      <option value="3.0" selected>3.0 م (سكني قياسي)</option>
      <option value="3.2">3.2 م (مختلط)</option>
      <option value="3.5">3.5 م (تجاري)</option>
      <option value="4.0">4.0 م (تجاري ضخم)</option>
    </select>
  </div>

  <div style="background:rgba(0,0,0,0.15);border:1px solid rgba(90,15,15,0.25);border-radius:8px;padding:10px;">
    <div style="color:#C9A84C;font-weight:700;margin-bottom:8px;">⚙️ النظام الإنشائي</div>
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">نوع الأساس</label>
    <select id="bldc-found" onchange="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:11px;margin-bottom:6px;">
      <option value="raft">لبشة (Raft Foundation)</option>
      <option value="pad">مفرد (Pad Foundation)</option>
      <option value="piles">خوازيق (Bored Piles)</option>
      <option value="combined">مركّب (Raft + Piles)</option>
    </select>
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">النظام الإنشائي</label>
    <select id="bldc-sys" onchange="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:11px;margin-bottom:6px;">
      <option value="beam">أعمدة + كمرات (Columns &amp; Beams)</option>
      <option value="flat">بلاطة مسطحة (Flat Slab)</option>
      <option value="shear">جدار قص (Shear Wall)</option>
    </select>
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">سُمك البلاطة (مم)</label>
    <select id="bldc-slab" onchange="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:11px;margin-bottom:6px;">
      <option value="150">150 مم (خفيف)</option>
      <option value="200" selected>200 مم (قياسي)</option>
      <option value="250">250 مم (ثقيل)</option>
      <option value="300">300 مم (أبراج)</option>
    </select>
    <label style="display:block;color:var(--text3);font-size:11px;margin-bottom:2px;">عدد الأدوار المتكررة</label>
    <input id="bldc-typ" type="number" value="8" min="1" max="70" oninput="bldCalc()" style="width:100%;background:#111;border:1px solid #333;color:#eee;padding:5px;border-radius:4px;font-size:12px;">
  </div>
</div>

<div id="bldc-summary" style="background:linear-gradient(135deg,rgba(90,15,15,0.3),rgba(50,10,10,0.4));border:1px solid rgba(90,15,15,0.4);border-radius:8px;padding:10px;margin-bottom:10px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center;">
  <div><div style="color:#C9A84C;font-size:15px;font-weight:700;" id="s-gfa">5,000</div><div style="color:var(--text3);font-size:10px;">GFA م²</div></div>
  <div><div style="color:#C9A84C;font-size:15px;font-weight:700;" id="s-h">30.0</div><div style="color:var(--text3);font-size:10px;">الارتفاع الكلي م</div></div>
  <div><div style="color:#2ecc71;font-size:15px;font-weight:700;" id="s-conc">0</div><div style="color:var(--text3);font-size:10px;">خرسانة م³</div></div>
  <div><div style="color:#3498db;font-size:15px;font-weight:700;" id="s-steel">0</div><div style="color:var(--text3);font-size:10px;">حديد طن</div></div>
</div>

<div style="display:flex;gap:4px;margin-bottom:8px;flex-wrap:wrap;">
  <button onclick="bldTab('conc')" id="tab-conc" style="background:rgba(90,15,15,0.6);border:1px solid rgba(90,15,15,0.8);color:#fff;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:11px;font-weight:700;">⚗️ الخرسانة</button>
  <button onclick="bldTab('steel')" id="tab-steel" style="background:rgba(0,0,0,0.2);border:1px solid #333;color:#aaa;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:11px;">🔩 الحديد</button>
  <button onclick="bldTab('mason')" id="tab-mason" style="background:rgba(0,0,0,0.2);border:1px solid #333;color:#aaa;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:11px;">🧱 طابوق</button>
  <button onclick="bldTab('finish')" id="tab-finish" style="background:rgba(0,0,0,0.2);border:1px solid #333;color:#aaa;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:11px;">🎨 التشطيبات</button>
  <button onclick="bldTab('izol')" id="tab-izol" style="background:rgba(0,0,0,0.2);border:1px solid #333;color:#aaa;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:11px;">💧 العزل</button>
</div>

<div id="bldc-results" style="background:rgba(0,0,0,0.2);border:1px solid #222;border-radius:8px;padding:10px;min-height:160px;"></div>

<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
  <button onclick="bldPrint()" style="flex:1;background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.4);color:#2ecc71;padding:7px 12px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:700;">🖨️ طباعة / PDF</button>
  <button onclick="bldCopy()" style="flex:1;background:rgba(52,152,219,0.15);border:1px solid rgba(52,152,219,0.4);color:#3498db;padding:7px 12px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:700;">📋 نسخ النتائج</button>
  <button onclick="bldReset()" style="flex:1;background:rgba(231,76,60,0.10);border:1px solid rgba(231,76,60,0.3);color:#e74c3c;padding:7px 12px;border-radius:6px;cursor:pointer;font-size:11px;">↺ إعادة تعيين</button>
</div>

<div style="margin-top:8px;font-size:10px;color:var(--text3);border-top:1px solid #222;padding-top:6px;">
  ⚠️ كميات تقديرية مبنية على نسب QCS 2024 — لا تُستخدم للتوريد النهائي بدون دراسة هندسية معتمدة.
  الخرسانة: QCS 2024 §S5-P4 | الحديد: BS 4449 | الطابوق: QCS 2024 §S5-P9
</div>
</div>

<script>
(function(){
var _tab='conc';

window.bldTab=function(t){
  _tab=t;
  ['conc','steel','mason','finish','izol'].forEach(function(id){
    var el=document.getElementById('tab-'+id);
    if(!el)return;
    if(id===t){el.style.background='rgba(90,15,15,0.6)';el.style.borderColor='rgba(90,15,15,0.8)';el.style.color='#fff';}
    else{el.style.background='rgba(0,0,0,0.2)';el.style.borderColor='#333';el.style.color='#aaa';}
  });
  bldCalc();
};

window.bldCalc=function(){
  var type  =(document.getElementById('bldc-type')||{value:'res'}).value;
  var area  =parseFloat((document.getElementById('bldc-area')||{value:500}).value)||500;
  var floors=parseInt((document.getElementById('bldc-floors')||{value:10}).value)||10;
  var fh    =parseFloat((document.getElementById('bldc-fh')||{value:3}).value)||3.0;
  var found =(document.getElementById('bldc-found')||{value:'raft'}).value;
  var sys   =(document.getElementById('bldc-sys')||{value:'beam'}).value;
  var slabmm=parseInt((document.getElementById('bldc-slab')||{value:200}).value)||200;

  var tMult  ={res:1.0,com:1.15,mix:1.08}[type]||1.0;
  var openRat={res:0.28,com:0.40,mix:0.33}[type]||0.28;
  var partRat={res:0.45,com:0.25,mix:0.35}[type]||0.45;

  var GFA   =area*floors;
  var totalH=floors*fh;
  var W=Math.sqrt(area/1.5);var L=1.5*W;
  var perim=2*(W+L);

  // ── CONCRETE ─────────────────────────────────────────────
  var foundRat={raft:0.45,pad:0.28,piles:0.22,combined:0.38}[found]||0.45;
  var V_found=area*foundRat;
  var colRat=0.050*tMult;
  var beamRat=(sys==='beam')?0.090:(sys==='flat')?0.000:0.050;
  var slabRat=slabmm/1000;
  var wallRat=(sys==='shear'||floors>10)?0.045*tMult:0.0;
  var V_col  =area*colRat*floors;
  var V_beam =area*beamRat*floors;
  var V_slab =area*slabRat*floors;
  var V_wall =area*wallRat*floors;
  var V_stair=area*0.015*floors;
  var V_roof =area*slabRat;
  var V_super=V_col+V_beam+V_slab+V_wall+V_stair+V_roof;
  var V_total=V_found+V_super;
  var foundGrade='C35';
  var superGrade=(floors>20)?'C45/C50':'C35/C40';
  var cubes=Math.ceil(V_total/50)*3;

  // ── STEEL ─────────────────────────────────────────────────
  var sfR={raft:135,pad:120,piles:140,combined:138}[found]||130;
  var scR=(floors>20)?320:280;
  var kg_found=V_found*sfR;
  var kg_col  =V_col*scR;
  var kg_beam =V_beam*210;
  var kg_slab =(V_slab+V_roof)*((sys==='flat')?120:105);
  var kg_wall =V_wall*155;
  var kg_stair=V_stair*145;
  var kg_total=kg_found+kg_col+kg_beam+kg_slab+kg_wall+kg_stair;
  var ton_total=kg_total/1000;
  var kgPerM2=kg_total/GFA;
  var T12_kg=(kg_slab+kg_beam)*0.30;
  var T16_kg=(kg_slab+kg_beam)*0.40+kg_stair;
  var T20_kg=kg_col*0.50+kg_wall*0.40;
  var T25_kg=kg_col*0.35+kg_found*0.50+kg_wall*0.40;
  var T32_kg=kg_found*0.40+kg_col*0.15;

  // ── MASONRY ───────────────────────────────────────────────
  var extWall_total=perim*fh*(1-openRat)*floors;
  var intPart_total=area*floors*partRat;
  var extBlk200=Math.ceil(extWall_total*12.5*1.10);
  var intBlk100=Math.ceil(intPart_total*12.5*1.10);
  var mortar_total=extWall_total*0.025+intPart_total*0.018;

  // ── FINISHES ──────────────────────────────────────────────
  var int_plaster=(intPart_total*2+GFA)*1.05;
  var ext_render =extWall_total*1.05;
  var floor_tiles=GFA*1.05;
  var wall_tiles =GFA*({res:0.12,com:0.06,mix:0.09}[type]||0.10)*2.5*1.10;
  var gyp_ceil   =GFA*1.05;

  // ── WATERPROOFING ─────────────────────────────────────────
  var wp_found=area*1.15;
  var wp_roof =area*1.15;
  var wp_wet  =area*floors*({res:0.12,com:0.06,mix:0.09}[type]||0.10)*1.20;
  var ins_wall=extWall_total;
  var ins_roof=area*1.10;
  var ins_slab=area*0.20;

  // ── UPDATE SUMMARY ────────────────────────────────────────
  function fmt(n,d){return n.toLocaleString('en-SA',{maximumFractionDigits:d||0});}
  var el;
  if((el=document.getElementById('s-gfa')))  el.textContent=fmt(GFA);
  if((el=document.getElementById('s-h')))    el.textContent=totalH.toFixed(1);
  if((el=document.getElementById('s-conc'))) el.textContent=fmt(V_total);
  if((el=document.getElementById('s-steel')))el.textContent=fmt(ton_total,1)+' t';

  // ── RENDER ────────────────────────────────────────────────
  var R=document.getElementById('bldc-results');
  if(!R)return;

  function tbl(rows,headers){
    var h='<tr style="background:rgba(90,15,15,0.15);">'+headers.map(function(x){return '<th style="padding:5px 7px;text-align:right;font-size:11px;color:#C9A84C;">'+x+'</th>';}).join('')+'</tr>';
    var r=rows.map(function(row){return '<tr>'+row.map(function(x,i){return '<td style="padding:5px 7px;font-size:11px;border-top:1px solid rgba(255,255,255,0.04);'+(i===0?'color:#ddd;':'color:#C9A84C;font-weight:700;')+'">'+x+'</td>';}).join('')+'</tr>';}).join('');
    return '<table style="width:100%;border-collapse:collapse;">'+h+r+'</table>';
  }

  var html='';

  if(_tab==='conc'){
    html+='<div style="color:#2ecc71;font-weight:700;margin-bottom:8px;font-size:12px;">⚗️ كميات الخرسانة التفصيلية</div>';
    html+=tbl([
      ['الأساسات ('+foundGrade+')',fmt(V_found)+' م³',Math.round(V_found/V_total*100)+'%'],
      ['الأعمدة ('+superGrade+')',fmt(V_col)+' م³',Math.round(V_col/V_total*100)+'%'],
      ['الكمرات',fmt(V_beam)+' م³',Math.round(V_beam/V_total*100)+'%'],
      ['البلاطات ('+slabmm+' مم)',fmt(V_slab)+' م³',Math.round(V_slab/V_total*100)+'%'],
      ['جدران القص / الشافت',fmt(V_wall)+' م³',Math.round(V_wall/V_total*100)+'%'],
      ['السلالم',fmt(V_stair)+' م³',Math.round(V_stair/V_total*100)+'%'],
      ['سقف الدور الأخير',fmt(V_roof)+' م³',Math.round(V_roof/V_total*100)+'%'],
    ],['العنصر','الحجم','%']);
    html+='<div style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:6px;padding:8px;margin-top:8px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;text-align:center;">';
    html+='<div><div style="color:#2ecc71;font-size:14px;font-weight:700;">'+fmt(V_total)+' م³</div><div style="color:var(--text3);font-size:10px;">إجمالي الخرسانة</div></div>';
    html+='<div><div style="color:#f39c12;font-size:14px;font-weight:700;">'+fmt(cubes)+' مكعب</div><div style="color:var(--text3);font-size:10px;">عينات اختبار مطلوبة</div></div>';
    html+='<div><div style="color:#3498db;font-size:14px;font-weight:700;">'+fmt(Math.round(V_total/GFA*100)/100)+' م³/م²</div><div style="color:var(--text3);font-size:10px;">المعدل لكل م²</div></div>';
    html+='</div>';
    html+='<div style="margin-top:8px;font-size:10px;color:#888;">درجة الخرسانة: أساسات '+foundGrade+' (w/c ≤ 0.45) | أعمدة/كمرات '+superGrade+' (w/c ≤ 0.40) | QCS 2024 §S5-P5</div>';
  }
  else if(_tab==='steel'){
    html+='<div style="color:#3498db;font-weight:700;margin-bottom:8px;font-size:12px;">🔩 كميات حديد التسليح</div>';
    html+=tbl([
      ['الأساسات',fmt(kg_found,0)+' كغ',fmt(kg_found/1000,2)+' طن'],
      ['الأعمدة',fmt(kg_col,0)+' كغ',fmt(kg_col/1000,2)+' طن'],
      ['الكمرات',fmt(kg_beam,0)+' كغ',fmt(kg_beam/1000,2)+' طن'],
      ['البلاطات',fmt(kg_slab,0)+' كغ',fmt(kg_slab/1000,2)+' طن'],
      ['جدران القص',fmt(kg_wall,0)+' كغ',fmt(kg_wall/1000,2)+' طن'],
      ['السلالم',fmt(kg_stair,0)+' كغ',fmt(kg_stair/1000,2)+' طن'],
    ],['العنصر','كغ','طن']);
    html+='<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:6px;padding:8px;margin-top:8px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;text-align:center;">';
    html+='<div><div style="color:#3498db;font-size:14px;font-weight:700;">'+fmt(ton_total,1)+' طن</div><div style="color:var(--text3);font-size:10px;">إجمالي الحديد</div></div>';
    html+='<div><div style="color:#f39c12;font-size:14px;font-weight:700;">'+fmt(Math.round(kgPerM2))+' كغ/م²</div><div style="color:var(--text3);font-size:10px;">لكل م² مساحة</div></div>';
    html+='<div><div style="color:#2ecc71;font-size:14px;font-weight:700;">B500B</div><div style="color:var(--text3);font-size:10px;">درجة الحديد QCS 2024</div></div>';
    html+='</div>';
    html+='<div style="margin-top:8px;font-size:11px;color:#C9A84C;font-weight:700;margin-bottom:4px;">توزيع الأقطار التقديري:</div>';
    html+=tbl([
      ['T12 (φ12)',fmt(T12_kg/1000,2)+' طن',Math.round(T12_kg/kg_total*100)+'%'],
      ['T16 (φ16)',fmt(T16_kg/1000,2)+' طن',Math.round(T16_kg/kg_total*100)+'%'],
      ['T20 (φ20)',fmt(T20_kg/1000,2)+' طن',Math.round(T20_kg/kg_total*100)+'%'],
      ['T25 (φ25)',fmt(T25_kg/1000,2)+' طن',Math.round(T25_kg/kg_total*100)+'%'],
      ['T32 (φ32)',fmt(T32_kg/1000,2)+' طن',Math.round(T32_kg/kg_total*100)+'%'],
    ],['القطر','الكمية','%']);
    html+='<div style="margin-top:6px;font-size:10px;color:#888;">BS 4449 | B500B | fy ≥ 500 MPa | فحص شد كل 25 طن | شهادة مصنع لكل شحنة</div>';
  }
  else if(_tab==='mason'){
    html+='<div style="color:#e67e22;font-weight:700;margin-bottom:8px;font-size:12px;">🧱 أعمال الطابوق والبلوك</div>';
    html+=tbl([
      ['جدران خارجية (200 مم)',fmt(extWall_total,0)+' م²',fmt(extBlk200,0)+' بلوكة','C20 / 7 MPa'],
      ['فواصل داخلية (100 مم)',fmt(intPart_total,0)+' م²',fmt(intBlk100,0)+' بلوكة','C15 / 4 MPa'],
    ],['النوع','المساحة','العدد','الدرجة']);
    html+='<div style="background:rgba(230,126,34,0.08);border:1px solid rgba(230,126,34,0.25);border-radius:6px;padding:8px;margin-top:8px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;text-align:center;">';
    html+='<div><div style="color:#e67e22;font-size:14px;font-weight:700;">'+fmt(extBlk200+intBlk100,0)+'</div><div style="color:var(--text3);font-size:10px;">إجمالي البلوكات</div></div>';
    html+='<div><div style="color:#f39c12;font-size:14px;font-weight:700;">'+fmt(mortar_total,1)+' م³</div><div style="color:var(--text3);font-size:10px;">مونة (Mortar)</div></div>';
    html+='<div><div style="color:#2ecc71;font-size:14px;font-weight:700;">'+fmt(extWall_total+intPart_total,0)+' م²</div><div style="color:var(--text3);font-size:10px;">إجمالي الجدران</div></div>';
    html+='</div>';
    html+=tbl([
      ['خارجي (M10)','1 إسمنت : 3 رمل','QCS 2024 §S5-P9'],
      ['داخلي (M5)','1 إسمنت : 5 رمل','QCS 2024 §S5-P9'],
      ['سُمك الوصلات','10 مم ± 3 مم','BS EN 1996'],
    ],['نوع الملاط','النسبة','المرجع']);
  }
  else if(_tab==='finish'){
    html+='<div style="color:#9b59b6;font-weight:700;margin-bottom:8px;font-size:12px;">🎨 التشطيبات والأعمال الإنهائية</div>';
    html+=tbl([
      ['بياض داخلي (جبس رطب)',fmt(int_plaster,0)+' م²','12-15 مم','QCS 2024 §S5-P10'],
      ['رندرة خارجية',fmt(ext_render,0)+' م²','20-25 مم','QCS 2024 §S5-P10'],
      ['دهان داخلي (3 طبقات)',fmt(int_plaster,0)+' م²','Washable Emulsion','QCS 2024 §S5'],
      ['دهان خارجي (Elastomeric)',fmt(ext_render,0)+' م²','UV مقاوم | 200μm','QCS 2024 §S5'],
      ['بلاط أرضيات',fmt(floor_tiles,0)+' م²','+5% هدر','ASTM C648'],
      ['بلاط جدران (حمامات)',fmt(wall_tiles,0)+' م²','R11 مقاومة انزلاق','DIN 51130'],
      ['ألواح جبس (سقف معلق)',fmt(gyp_ceil,0)+' م²','Gypsum Board','QCS 2024 §S5'],
    ],['البند','الكمية','المواصفة','المرجع']);
    html+='<div style="margin-top:8px;font-size:10px;color:#888;">بلاط الأرضيات: لاصق Class C2 | بلاط الجدران: C2TE | استواء ±3مم/3م | BS 8204</div>';
  }
  else if(_tab==='izol'){
    html+='<div style="color:#1abc9c;font-weight:700;margin-bottom:8px;font-size:12px;">💧 أنظمة العزل المائي والحراري</div>';
    html+='<div style="color:#C9A84C;font-size:11px;font-weight:700;margin-bottom:4px;">💧 العزل المائي:</div>';
    html+=tbl([
      ['عزل الأساسات',fmt(wp_found,0)+' م²','Bituminous SBS 4مم','QCS 2024 §S5'],
      ['عزل السطح',fmt(wp_roof,0)+' م²','PVC/TPO 1.5مم','QCS 2024 §S5'],
      ['مناطق رطبة (حمامات)',fmt(wp_wet,0)+' م²','Liquid Membrane 1.5مم','QCS 2024 §S5'],
    ],['البند','الكمية','النوع','المرجع']);
    html+='<div style="color:#C9A84C;font-size:11px;font-weight:700;margin-top:8px;margin-bottom:4px;">🔥 العزل الحراري:</div>';
    html+=tbl([
      ['جدران خارجية',fmt(ins_wall,0)+' م²','XPS/Rockwool 50-75مم','GSAS | U≤0.35'],
      ['السطح',fmt(ins_roof,0)+' م²','PIR/XPS 75-100مم','GSAS | U≤0.25'],
      ['تحت البلاطة الأرضية',fmt(ins_slab,0)+' م²','XPS 30-50مم','QCS 2024 §S5'],
    ],['البند','الكمية','النوع','المعيار']);
    html+='<div style="margin-top:8px;font-size:10px;color:#888;">GSAS: جدران U≤0.35 W/m²K | سقف U≤0.25 W/m²K | نوافذ U≤2.0 W/m²K</div>';
  }

  R.innerHTML=html;
};

setTimeout(function(){window.bldCalc();},100);

window.bldPrint=function(){
  var area  =(document.getElementById('bldc-area')||{value:500}).value;
  var floors=(document.getElementById('bldc-floors')||{value:10}).value;
  var type  =(document.getElementById('bldc-type')||{value:'res'}).value;
  var typeLabel={'res':'سكني','com':'تجاري','mix':'مختلط'}[type]||type;
  var gfa   =document.getElementById('s-gfa')||{textContent:'—'};
  var conc  =document.getElementById('s-conc')||{textContent:'—'};
  var steel =document.getElementById('s-steel')||{textContent:'—'};
  var res   =document.getElementById('bldc-results')||{innerHTML:''};
  var w=window.open('','_blank','width=800,height=600');
  w.document.write('<html dir="rtl"><head><meta charset="utf-8"><title>QatarSpec Pro — حاسبة المباني</title>'+
    '<style>body{font-family:Tajawal,Arial;direction:rtl;padding:20px;color:#111;}'+
    'table{width:100%;border-collapse:collapse;margin:10px 0;}'+
    'th{background:#5A0F0F;color:#fff;padding:6px 8px;font-size:12px;}'+
    'td{padding:5px 8px;border:1px solid #ddd;font-size:11px;}'+
    'h2{color:#5A0F0F;border-bottom:2px solid #C9A84C;padding-bottom:6px;}'+
    'h3{color:#333;font-size:13px;margin-top:12px;}'+
    '.header{background:#5A0F0F;color:#fff;padding:12px 16px;border-radius:6px;margin-bottom:16px;}'+
    '.header h1{margin:0;font-size:16px;color:#C9A84C;}'+
    '.header p{margin:4px 0 0;font-size:11px;opacity:0.8;}'+
    '.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0;}'+
    '.sum-box{background:#f5f5f5;border:1px solid #ddd;border-radius:4px;padding:8px;text-align:center;}'+
    '.sum-val{font-size:16px;font-weight:700;color:#5A0F0F;}'+
    '.sum-lbl{font-size:10px;color:#666;}'+
    '.footer{margin-top:20px;font-size:10px;color:#888;border-top:1px solid #ddd;padding-top:8px;}'+
    '@media print{button{display:none!important;}}'+
    '</style></head><body>'+
    '<div class="header"><h1>🧮 QatarSpec Pro — حاسبة المباني الشاملة</h1>'+
    '<p>المشروع: '+typeLabel+' | مساحة الطابق: '+area+' م² | عدد الطوابق: '+floors+'</p></div>'+
    '<div class="summary">'+
    '<div class="sum-box"><div class="sum-val">'+gfa.textContent+'</div><div class="sum-lbl">GFA م²</div></div>'+
    '<div class="sum-box"><div class="sum-val">'+conc.textContent+'</div><div class="sum-lbl">خرسانة م³</div></div>'+
    '<div class="sum-box"><div class="sum-val">'+steel.textContent+'</div><div class="sum-lbl">حديد</div></div>'+
    '<div class="sum-box"><div class="sum-val">QCS 2024</div><div class="sum-lbl">المرجع</div></div>'+
    '</div>'+res.innerHTML+
    '<div class="footer">⚠️ كميات تقديرية — QCS 2024 §S5 | BS 4449 | ASTM C90 | تاريخ الطباعة: '+new Date().toLocaleDateString('ar-QA')+'</div>'+
    '<br><button onclick="window.print()" style="background:#5A0F0F;color:#fff;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:13px;">🖨️ اطبع</button>'+
    '</body></html>');
  w.document.close();
};

window.bldCopy=function(){
  var gfa  =(document.getElementById('s-gfa')||{textContent:'—'}).textContent;
  var conc =(document.getElementById('s-conc')||{textContent:'—'}).textContent;
  var steel=(document.getElementById('s-steel')||{textContent:'—'}).textContent;
  var area =(document.getElementById('bldc-area')||{value:500}).value;
  var floors=(document.getElementById('bldc-floors')||{value:10}).value;
  var txt='QatarSpec Pro — حاسبة المباني\\n'+'='.repeat(35)+'\\n'+
    'مساحة الطابق: '+area+' م²\\n'+
    'عدد الطوابق: '+floors+'\\n'+
    'GFA الإجمالي: '+gfa+' م²\\n'+
    'إجمالي الخرسانة: '+conc+' م³\\n'+
    'إجمالي الحديد: '+steel+'\\n'+
    'المرجع: QCS 2024 §S5 | BS 4449\\n'+
    'تاريخ: '+new Date().toLocaleDateString('ar-QA');
  if(navigator.clipboard){
    navigator.clipboard.writeText(txt).then(function(){
      var btn=event.target; btn.textContent='✅ تم النسخ!'; setTimeout(function(){btn.textContent='📋 نسخ النتائج';},2000);
    });
  }
};

window.bldReset=function(){
  var defs={'bldc-area':500,'bldc-floors':10,'bldc-typ':8};
  Object.keys(defs).forEach(function(id){
    var el=document.getElementById(id); if(el) el.value=defs[id];
  });
  var sels={'bldc-type':'res','bldc-fh':'3.0','bldc-found':'raft','bldc-sys':'beam','bldc-slab':'200'};
  Object.keys(sels).forEach(function(id){
    var el=document.getElementById(id); if(el) el.value=sels[id];
  });
  bldCalc();
};

})();
<\/script>
</div>
<div class="lang-content-en" style="display:none;">
<p style="padding:20px;text-align:center;color:var(--text3);">Switch to Arabic mode for the full interactive building calculator.</p>
</div>
` };

})();
