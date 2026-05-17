// QatarSpec Pro — Content: geotech
(function(){
  var c=window.QS_CONTENT=window.QS_CONTENT||{};
  c["geotech"] = { title: '🔬 الجسات والتربة', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">أعمال الجسات والفحوصات الجيوتقنية</span>
</div>
<button onclick="document.getElementById('vid-geotech').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input accept="video/*" data-ph="vid-placeholder-geotech" data-player="vid-player-geotech" id="vid-geotech" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))" style="display:none" type="file"/>
<div id="vid-placeholder-geotech" style="padding:24px;text-align:center;color:var(--text3);">
<div style="font-size:32px;margin-bottom:8px;">📹</div>
<div style="font-size:13px;margin-bottom:4px;">حفر آبار الجسات، اختبار الاختراق القياسي (SPT)، أخذ العينات، التقرير الجيوتقني</div>
<div style="font-size:11px;color:var(--text3);">اضغط "رفع فيديو" لتحميل ملف MP4</div>
</div>
<div class="qs-vid-ph" data-maxh="280px" id="vid-player-geotech"></div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | التحقيق الجيوتقني</div>
<h3>📋 نظرة عامة</h3>
<p>الجسات في قطر ضرورة قبل أي مشروع. التربة القطرية متنوعة — Sabkha، رمل، صخر جيري، ومياه جوفية عالية الكبريتات. تقرير الجسات يحدد نوع الأساس ومتطلبات الConcrete.</p>
<h3>📌 اختر القسم</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('geo_planning')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التخطيط</div><div style="color:var(--text3);font-size:11px;">النطاق &amp; Grid</div></div>
<div onclick="QS.openDetail('geo_borehole')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🕳️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Boreholes</div><div style="color:var(--text3);font-size:11px;">الحفر والتسجيل</div></div>
<div onclick="QS.openDetail('geo_spt')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔨</div><div style="color:var(--gold);font-weight:700;font-size:13px;">اختبار الاختراق القياسي (SPT) الاختبار</div><div style="color:var(--text3);font-size:11px;">المعيار الاختراق</div></div>
<div onclick="QS.openDetail('geo_lab')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">اختبارات المختبر</div><div style="color:var(--text3);font-size:11px;">المختبر Tests</div></div>
<div onclick="QS.openDetail('geo_water')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">💧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">المياه الجوفية</div><div style="color:var(--text3);font-size:11px;">Groundwater</div></div>
<div onclick="QS.openDetail('geo_report')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📋</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التقرير النهائي</div><div style="color:var(--text3);font-size:11px;">GI Report</div></div>
</div>
<div style="margin-top:12px;"><div onclick="QS.openDetail('itp_geotech')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">خطة الفحص والاختبار (ITP) الجسات الكامل</div></div></div>
<h3>📐 متطلبات قطر العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr>
<tr><td>عدد Boreholes</td><td>BH كل 25m للمباني / كل 50m للطرق</td><td>QCS S2</td></tr>
<tr><td>عمق BH — مباني</td><td>عمق الأساس + 1.5 × عرض الأساس أو 10m</td><td>QCS S2</td></tr>
<tr><td>عمق BH — طرق</td><td>3-5m من مستوى الأساس</td><td>QCS S2</td></tr>
<tr><td>اختبار الاختراق القياسي (SPT) كل</td><td>1.5m أو عند تغيير الطبقة</td><td>BS EN ISO 22476-3</td></tr>
<tr><td>عينات Undisturbed</td><td>كل 2m في الطبقات الطينية</td><td>QCS S2</td></tr>
<tr><td>اختبارات كيميائية</td><td>Sulphate + Chloride + pH</td><td>QCS S2</td></tr>
<tr><td>مياه جوفية</td><td>قياس المستوى في كل BH</td><td>QCS S2</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;">
<span style="font-size:16px;">🎥</span>
<span style="color:var(--gold);font-weight:700;font-size:13px;">Geotechnical Investigations & Field Testing</span>
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
` };
  c["geo_planning"] = { title: '📐 الجسات — التخطيط والنطاق', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | التخطيط</div>
<h3>📐 شبكة Boreholes</h3>
<table class="dm-table"><tr><th>نوع المشروع</th><th>المسافة بين BH</th><th>الحد الأدنى</th></tr>
<tr><td>مبنى سكني صغير</td><td>15-25m</td><td>3 BH</td></tr>
<tr><td>مبنى تجاري / برج</td><td>15-20m</td><td>4 BH في الزوايا + 1 وسط</td></tr>
<tr><td>طريق</td><td>كل 50-100m</td><td>BH كل 50m للطرق الرئيسية</td></tr>
<tr><td>خطوط مرافق</td><td>كل 100m</td><td>BH + حفرة اختبار</td></tr>
<tr><td>جسر / منشأة بحرية</td><td>حسب العدد وأحواض الدعم</td><td>BH عند كل Pier</td></tr>
</table>
<h3>📐 الأعماق المطلوبة</h3>
<table class="dm-table"><tr><th>النوع</th><th>العمق</th></tr>
<tr><td>Pad / الأساس الشريطي</td><td>عمق الأساس + 5B أو 10m</td></tr>
<tr><td>الأساس اللبشة</td><td>عمق الأساس + 2B أو 15m</td></tr>
<tr><td>ركيزة محفورةs</td><td>طول الخازوق + 5D أو 3m</td></tr>
<tr><td>طرق ومرافق</td><td>3-5m من مستوى الطريق</td></tr>
</table>
<h3>🔧 متطلبات الموقع</h3>
<p>• NOC من كل الجهات قبل الحفر<br/>• تحديد مواضع الخدمات المدفونة<br/>• مراقب جيوتقني أثناء الحفر<br/>• توثيق كل شيء بالصور</p>
<h3>🔴 نقاط توقف</h3>
<p>• <strong>HP-01:</strong> اعتماد خطة الجسات من المهندس الجيوتقني قبل البدء</p>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Planning & Scope</div>
<h3>📐 Borehole Grid</h3>
<table class="dm-table"><tr><th>Project Type</th><th>BH Spacing</th><th>Minimum</th></tr>
<tr><td>Small Residential Building</td><td>15-25m</td><td>3 BH</td></tr>
<tr><td>Commercial Building / Tower</td><td>15-20m</td><td>4 BH at corners + 1 centre</td></tr>
<tr><td>Road</td><td>Every 50-100m</td><td>BH every 50m for main roads</td></tr>
<tr><td>Utilities</td><td>Every 100m</td><td>BH + Trial Pit</td></tr>
<tr><td>Bridge / Marine Structure</td><td>Per support configuration</td><td>BH at each Pier</td></tr>
</table>
<h3>📐 Required Depths</h3>
<table class="dm-table"><tr><th>Foundation Type</th><th>Depth</th></tr>
<tr><td>Pad / Strip Foundation</td><td>Foundation depth + 5B or 10m</td></tr>
<tr><td>Raft Foundation</td><td>Foundation depth + 2B or 15m</td></tr>
<tr><td>Bored Piles</td><td>Pile length + 5D or 3m</td></tr>
<tr><td>Roads & Utilities</td><td>3-5m below road level</td></tr>
</table>
<h3>🔧 Site Requirements</h3>
<p>• NOC from all authorities before drilling<br>• Locate all buried services before drilling<br>• Geotechnical supervisor on site during drilling<br>• Document everything with photos</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Investigation plan approved by Geotechnical Engineer before commencement</p>
</div>
` };
  c["geo_borehole"] = { title: '🕳️ الجسات — Boreholes', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | بئر المسح (Borehole) Drilling</div>
<h3>📐 طرق الحفر</h3>
<table class="dm-table"><tr><th>الطريقة</th><th>الاستخدام</th><th>المميزات</th></tr>
<tr><td>Rotary Drilling</td><td>الصخر والمواد الصلبة</td><td>عينات جيدة + أعماق كبيرة</td></tr>
<tr><td>Cable Percussion</td><td>التربة والرمل</td><td>اختبار الاختراق القياسي (SPT) ممتاز</td></tr>
<tr><td>Auger Drilling</td><td>الطبقات الطينية الرخوة</td><td>سريع وغير مكلف</td></tr>
<tr><td>حفرة اختبارs</td><td>أعماق ≤ 3m</td><td>فحص بصري ممتاز</td></tr>
</table>
<h3>📐 تسجيل بئر المسح (Borehole) Log</h3>
<p>• وصف كل طبقة (نوع + لون + كثافة + رطوبة)<br/>• مستوى المياه الجوفية عند ظهورها<br/>• عمق كل اختبار الاختراق القياسي (SPT) والنتيجة<br/>• نوع وعمق كل عينة<br/>• أي ظروف غير اعتيادية (Sabkha، Cavities، Gas)</p>
<h3>⚠️ تنبيهات خاصة بقطر</h3>
<p>• <strong>Sabkha:</strong> طبقة بيضاء/رمادية مالحة — سجّل عمقها وسماكتها<br/>• <strong>Cavernous الحجر الجيري:</strong> فراغات في الصخر الجيري — خطر على الأساسات<br/>• <strong>Fill المادة:</strong> ردميات قديمة شائعة في المناطق الساحلية<br/>• <strong>Gas:</strong> في بعض المناطق — احتياطات السلامة إلزامية</p>
<h3>📐 الحد الأدنى لمتطلبات الحفر — الحد الأدنى BH المتطلبات</h3>
<table class="dm-table">
<thead><tr><th>نوع المشروع</th><th>الحد الأدنى للجسات</th><th>الحد الأدنى للعمق</th><th>QCS / Ashghal</th></tr></thead>
<tbody>
<tr><td>مباني ≤ 3 طوابق</td><td>بجسة عند كل ركيزة / 500m²</td><td>6m أو 1.5× عرض الأساس</td><td>QCS 2024 S2</td></tr>
<tr><td>مباني 4-10 طوابق</td><td>بجسة / 250m²</td><td>15m أو حتى الصخر</td><td>QCS 2024 S2</td></tr>
<tr><td>مباني &gt; 10 طوابق / برج</td><td>بجسة / 200m² + BH عميقة</td><td>30m+ أو حسب المستشار</td><td>QCS 2024 S2</td></tr>
<tr><td>خوازيق (الركائز)</td><td>BH لكل موقع خازوق رئيسي</td><td>عمق الخازوق + 3× قطره</td><td>S5 P7</td></tr>
<tr><td>أعمال طرق / بنية تحتية</td><td>بجسة كل 50-100m على المحور</td><td>3m تحت مستوى الحفر</td><td>Ashghal IAN</td></tr>
<tr><td>مناطق Sabkha مشتبه بها</td><td>بجسة كل 25-50m</td><td>اختراق طبقة Sabkha كاملاً</td><td>IAN-006</td></tr>
</tbody>
</table>
<h3>📏 مواصفات BH Log الإلزامية — مطلوب Log Data</h3>
<table class="dm-table">
<thead><tr><th>البند</th><th>المتطلب</th><th>الملاحظة</th></tr></thead>
<tbody>
<tr><td>توصيف كل طبقة</td><td>النوع + اللون + الكثافة + الرطوبة</td><td>وصف موحد حسب BS 5930</td></tr>
<tr><td>مستوى المياه الجوفية</td><td>عمق الظهور + المستوى بعد 24h</td><td>تحديد Artesian إن وجد</td></tr>
<tr><td>نتائج اختبار الاختراق القياسي (SPT)</td><td>كل 1.5m أو عند تغيير الطبقة</td><td>N-القيمة + ضربات 3×150mm</td></tr>
<tr><td>عمق أخذ العينات</td><td>نوع العينة (D/U) + حالتها</td><td>Disturbed / Undisturbed</td></tr>
<tr><td>ظروف الحفر</td><td>خسارة مياه الحفر، تدفق، انهيار</td><td>مؤشرات Cavities أو Karst</td></tr>
<tr><td>ملاحظات Sabkha</td><td>عمق + سماكة + درجة التمعدن</td><td>تصوير فوتوغرافي إلزامي</td></tr>
</tbody>
</table>
<h3>🔴 نقاط توقف</h3>
<p>• <strong>HP-02:</strong> مراقب جيوتقني في الموقع طوال فترة الحفر<br/>
• <strong>HP-BH01:</strong> فحص وتوثيق مستوى التأسيس المقترح قبل إنهاء التقرير<br/>
• <strong>HP-BH02:</strong> اعتماد عدد وأعماق الجسات من الاستشاري قبل بدء الحفر</p>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Borehole Drilling</div>
<h3>📐 Drilling Methods</h3>
<table class="dm-table"><tr><th>Method</th><th>Application</th><th>Advantages</th></tr>
<tr><td>Rotary Drilling</td><td>Rock and hard materials</td><td>Good samples + large depths</td></tr>
<tr><td>Cable Percussion</td><td>Soil and sand</td><td>Excellent for SPT</td></tr>
<tr><td>Auger Drilling</td><td>Soft clay layers</td><td>Fast and cost-effective</td></tr>
<tr><td>Trial Pits</td><td>Depths ≤ 3m</td><td>Excellent visual inspection</td></tr>
</table>
<h3>📐 Borehole Log Records</h3>
<p>• Describe each layer (type + colour + density + moisture)<br>• Groundwater level at first occurrence<br>• SPT depth and result for each test<br>• Type and depth of each sample<br>• Any abnormal conditions (Sabkha, Cavities, Gas)</p>
<h3>⚠️ Qatar-Specific Alerts</h3>
<p>• <strong>Sabkha:</strong> White/grey saline layer — record depth and thickness<br>• <strong>Cavernous Limestone:</strong> Voids in limestone — hazard to foundations<br>• <strong>Fill Material:</strong> Old fill common in coastal areas<br>• <strong>Gas:</strong> Present in some areas — mandatory safety precautions</p>
<h3>📐 Minimum BH Requirements</h3>
<table class="dm-table">
<thead><tr><th>Project Type</th><th>Min. Boreholes</th><th>Min. Depth</th><th>Reference</th></tr></thead>
<tbody>
<tr><td>Buildings ≤ 3 Storeys</td><td>1 BH per footing / 500m²</td><td>6m or 1.5× foundation width</td><td>QCS 2024 S2</td></tr>
<tr><td>Buildings 4-10 Storeys</td><td>1 BH / 250m²</td><td>15m or to rock</td><td>QCS 2024 S2</td></tr>
<tr><td>Buildings > 10 Storeys / Tower</td><td>1 BH / 200m² + deep BH</td><td>30m+ or as directed</td><td>QCS 2024 S2</td></tr>
<tr><td>Piles</td><td>BH at each main pile location</td><td>Pile length + 3× diameter</td><td>S5 P7</td></tr>
<tr><td>Roads / Infrastructure</td><td>1 BH every 50-100m on alignment</td><td>3m below excavation level</td><td>Ashghal IAN</td></tr>
<tr><td>Suspected Sabkha Areas</td><td>1 BH every 25-50m</td><td>Full penetration of Sabkha layer</td><td>IAN-006</td></tr>
</tbody>
</table>
<h3>📏 Mandatory BH Log Data</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th><th>Note</th></tr></thead>
<tbody>
<tr><td>Layer Description</td><td>Type + Colour + Density + Moisture</td><td>Unified description per BS 5930</td></tr>
<tr><td>Groundwater Level</td><td>Depth at occurrence + level after 24h</td><td>Identify Artesian if present</td></tr>
<tr><td>SPT Results</td><td>Every 1.5m or at stratum change</td><td>N-Value + blows 3×150mm</td></tr>
<tr><td>Sample Depth</td><td>Sample type (D/U) + condition</td><td>Disturbed / Undisturbed</td></tr>
<tr><td>Drilling Conditions</td><td>Drilling fluid loss, flow, collapse</td><td>Indicators of Cavities or Karst</td></tr>
<tr><td>Sabkha Notes</td><td>Depth + thickness + mineralisation</td><td>Photographic record mandatory</td></tr>
</tbody>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-02:</strong> Geotechnical supervisor on site throughout drilling period<br>
• <strong>HP-BH01:</strong> Inspect and record proposed founding level before finalising report<br>
• <strong>HP-BH02:</strong> Number and depth of boreholes approved by consultant before drilling commences</p>
</div>
` };
  c["geo_spt"] = { title: '🔨 الجسات — SPT Test', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 BS EN ISO 22476-3 | اختبار الاختراق القياسي (اختبار الاختراق القياسي (SPT))</div>
<h3>📐 إجراء اختبار الاختراق القياسي (SPT)</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr>
<tr><td>وزن المطرقة</td><td>63.5 kg</td></tr>
<tr><td>ارتفاع السقوط</td><td>760mm</td></tr>
<tr><td>الإدخال الأولي</td><td>150mm (Seating Drive — غير محسوب)</td></tr>
<tr><td>الاختبار الفعلي</td><td>300mm = مجموع ضربات N</td></tr>
<tr><td>الرفض</td><td>&gt; 50 ضربة لـ 300mm أو 100 ضربة لـ 150mm</td></tr>
<tr><td>التكرار</td><td>كل 1.5m أو عند تغيير الطبقة</td></tr>
</table>
<h3>📊 تفسير نتائج اختبار الاختراق القياسي (SPT) (N-القيمة)</h3>
<table class="dm-table"><tr><th>N-القيمة</th><th>الرمل</th><th>الطين</th></tr>
<tr><td>0-4</td><td>رخو جداً (Very Loose)</td><td>طري جداً (Very Soft)</td></tr>
<tr><td>4-10</td><td>رخو (Loose)</td><td>طري (Soft)</td></tr>
<tr><td>10-30</td><td>متوسط (Medium Dense)</td><td>متوسط (Medium Stiff)</td></tr>
<tr><td>30-50</td><td>كثيف (Dense)</td><td>صلب (Stiff)</td></tr>
<tr><td>&gt; 50</td><td>كثيف جداً (Very Dense)</td><td>صلب جداً (Very Stiff)</td></tr>
</table>
<h3>⚙️ تصحيحات N-القيمة</h3>
<p>• <strong>N60:</strong> تصحيح لكفاءة الطاقة (عادة × 0.6-1.0)<br/>• <strong>N1,60:</strong> تصحيح لضغط التربة (Overburden)<br/>• <strong>في قطر:</strong> Gravel Content يعطي N مرتفع مضلل — انتبه</p>
<h3>🔴 نقاط توقف</h3>
<p>• <strong>HP-03:</strong> معايرة المطرقة والمعدات قبل البدء</p>
<h3>📊 جدول تفسير قيم N-اختبار الاختراق القياسي (SPT) المفصّل — Qatar Context</h3>
<table class="dm-table">
<thead><tr><th>N-القيمة</th><th>الرمل / Gravel</th><th>الطين</th><th>φ° (Rمl)</th><th>qu (kPa)</th><th>توصية الأساسات</th></tr></thead>
<tbody>
<tr><td><strong>0-4</strong></td><td>Very Loose — رخو جداً</td><td>Very Soft — طري جداً</td><td>&lt; 28°</td><td>&lt; 25</td><td>غير مناسب للتأسيس المباشر</td></tr>
<tr><td><strong>4-10</strong></td><td>Loose — رخو</td><td>Soft — طري</td><td>28-30°</td><td>25-50</td><td>Raft أو الركائز في الغالب</td></tr>
<tr><td><strong>10-20</strong></td><td>Medium Dense — متوسط</td><td>Medium Stiff — متوسط</td><td>30-35°</td><td>50-100</td><td>Pad / Strip بتحقق إضافي</td></tr>
<tr><td><strong>20-30</strong></td><td>Medium Dense (Upper) — متوسط عالي</td><td>Stiff — صلب</td><td>35-38°</td><td>100-200</td><td>Pad / Strip — جيد</td></tr>
<tr><td><strong>30-50</strong></td><td>Dense — كثيف</td><td>Very Stiff — صلب جداً</td><td>38-42°</td><td>200-400</td><td>ممتاز لأغلب أنواع الأساسات</td></tr>
<tr><td><strong>&gt; 50</strong></td><td>Very Dense / الصخر — كثيف جداً/صخر</td><td>Hard — صلب صخري</td><td>&gt; 42°</td><td>&gt; 400</td><td>ممتاز — الركائز end bearing</td></tr>
</tbody>
</table>
<h3>⚠️ تنبيهات قطر — N-اختبار الاختراق القياسي (SPT) في البيئة القطرية</h3>
<table class="dm-table">
<thead><tr><th>الحالة</th><th>المشكلة</th><th>الحل</th></tr></thead>
<tbody>
<tr><td>Cemented Sand / Calcarenite</td><td>N مرتفع مضلل بسبب Cementation وليس الكثافة</td><td>الأسطوانة المحفورة (Core) أخذ العينات + قيم qu من مختبر</td></tr>
<tr><td>Gravel Content عالي</td><td>N مرتفع كاذب بسبب الحصى</td><td>DCPT + Plate الحمل الاختبار للتحقق</td></tr>
<tr><td>Sabkha (تربة مملحة)</td><td>N منخفض مضلل — تتحسن بالجفاف</td><td>تحليل كيميائي + UCS test</td></tr>
<tr><td>Cavernous الحجر الجيري</td><td>N فجائي 0 عند الفراغ</td><td>Rotary Coring + اختبارات جيوفيزيائية</td></tr>
<tr><td>High GWL</td><td>تقليل N في الرمل الناعم تحت الماء</td><td>تصحيح N60 + تصحيح Overburden</td></tr>
</tbody>
</table>
<h3>🔧 تصحيحات N-القيمة — Corrections</h3>
<table class="dm-table">
<thead><tr><th>التصحيح</th><th>الرمز</th><th>المعادلة / القيمة</th><th>الاستخدام</th></tr></thead>
<tbody>
<tr><td>Energy Correction</td><td>N₆₀</td><td>N × (ER/60)</td><td>معايرة كفاءة الطاقة (60% معيار)</td></tr>
<tr><td>Overburden Correction</td><td>(N₁)₆₀</td><td>N₆₀ × Cn — حيث Cn = (100/σ'v)^0.5</td><td>تطبيع عند σ'v = 100 kPa</td></tr>
<tr><td>Rod الطول (&lt; 3m)</td><td>Cr</td><td>0.75 (رود &lt; 3m)</td><td>الجسات الضحلة</td></tr>
<tr><td>Sampler (liner absent)</td><td>Cs</td><td>1.1-1.3</td><td>عند غياب liner داخل Sampler</td></tr>
</tbody>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 BS EN ISO 22476-3 | Standard Penetration Test</div>
<h3>📐 SPT Procedure</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Hammer Weight</td><td>63.5 kg</td></tr>
<tr><td>Drop Height</td><td>760mm</td></tr>
<tr><td>Seating Drive</td><td>150mm (not counted)</td></tr>
<tr><td>Test Drive</td><td>300mm = total N blows</td></tr>
<tr><td>Refusal</td><td>&gt; 50 blows for 300mm or 100 blows for 150mm</td></tr>
<tr><td>Frequency</td><td>Every 1.5m or at stratum change</td></tr>
</table>
<h3>📊 SPT N-Value Interpretation</h3>
<table class="dm-table"><tr><th>N-Value</th><th>Sand</th><th>Clay</th></tr>
<tr><td>0-4</td><td>Very Loose</td><td>Very Soft</td></tr>
<tr><td>4-10</td><td>Loose</td><td>Soft</td></tr>
<tr><td>10-30</td><td>Medium Dense</td><td>Medium Stiff</td></tr>
<tr><td>30-50</td><td>Dense</td><td>Stiff</td></tr>
<tr><td>&gt; 50</td><td>Very Dense</td><td>Very Stiff</td></tr>
</table>
<h3>⚙️ N-Value Corrections</h3>
<p>• <strong>N60:</strong> Energy efficiency correction (typically × 0.6-1.0)<br>• <strong>N1,60:</strong> Overburden pressure correction<br>• <strong>Qatar Note:</strong> High Gravel Content gives misleadingly high N — exercise caution</p>
<h3>📊 Detailed N-SPT Interpretation — Qatar Context</h3>
<table class="dm-table">
<thead><tr><th>N-Value</th><th>Sand / Gravel</th><th>Clay</th><th>φ°</th><th>qu (kPa)</th><th>Foundation Recommendation</th></tr></thead>
<tbody>
<tr><td><strong>0-4</strong></td><td>Very Loose</td><td>Very Soft</td><td>&lt; 28°</td><td>&lt; 25</td><td>Not suitable for direct founding</td></tr>
<tr><td><strong>4-10</strong></td><td>Loose</td><td>Soft</td><td>28-30°</td><td>25-50</td><td>Raft or Piles generally required</td></tr>
<tr><td><strong>10-20</strong></td><td>Medium Dense</td><td>Medium Stiff</td><td>30-35°</td><td>50-100</td><td>Pad / Strip with additional verification</td></tr>
<tr><td><strong>20-30</strong></td><td>Medium Dense (Upper)</td><td>Stiff</td><td>35-38°</td><td>100-200</td><td>Pad / Strip — acceptable</td></tr>
<tr><td><strong>30-50</strong></td><td>Dense</td><td>Very Stiff</td><td>38-42°</td><td>200-400</td><td>Excellent for most foundation types</td></tr>
<tr><td><strong>&gt; 50</strong></td><td>Very Dense / Rock</td><td>Hard</td><td>&gt; 42°</td><td>&gt; 400</td><td>Excellent — Piles end bearing</td></tr>
</tbody>
</table>
<h3>⚠️ Qatar N-SPT Alerts</h3>
<table class="dm-table">
<thead><tr><th>Condition</th><th>Problem</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>Cemented Sand / Calcarenite</td><td>Misleadingly high N due to cementation, not density</td><td>Core Sampling + qu from lab tests</td></tr>
<tr><td>High Gravel Content</td><td>Falsely high N due to gravel</td><td>DCPT + Plate Load Test to verify</td></tr>
<tr><td>Sabkha (saline soil)</td><td>Misleadingly low N — improves on drying</td><td>Chemical analysis + UCS test</td></tr>
<tr><td>Cavernous Limestone</td><td>Sudden N = 0 at void location</td><td>Rotary Coring + geophysical testing</td></tr>
<tr><td>High GWL</td><td>Reduces N in fine sand below water table</td><td>Apply N60 + Overburden corrections</td></tr>
</tbody>
</table>
<h3>🔧 N-Value Corrections Table</h3>
<table class="dm-table">
<thead><tr><th>Correction</th><th>Symbol</th><th>Formula / Value</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Energy Correction</td><td>N₆₀</td><td>N × (ER/60)</td><td>Normalise to 60% energy efficiency</td></tr>
<tr><td>Overburden Correction</td><td>(N₁)₆₀</td><td>N₆₀ × Cn where Cn = (100/σ'v)^0.5</td><td>Normalise to σ'v = 100 kPa</td></tr>
<tr><td>Rod Length (&lt; 3m)</td><td>Cr</td><td>0.75 (rod &lt; 3m)</td><td>Shallow investigations</td></tr>
<tr><td>Sampler (liner absent)</td><td>Cs</td><td>1.1-1.3</td><td>When liner is absent in sampler</td></tr>
</tbody>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-03:</strong> Hammer and equipment calibration verified before commencement</p>
</div>
` };
  c["geo_lab"] = { title: '🧪 الجسات — اختبارات المختبر', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | المختبر الاختبار</div>
<h3>📐 الاختبارات الإلزامية في قطر</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th><th>الأهمية</th></tr>
<tr><td>Sulphate Content (SO3)</td><td>%</td><td>كل BH + طبقة</td><td>⭐⭐⭐ قطر عالية الكبريتات</td></tr>
<tr><td>Chloride Content</td><td>%</td><td>كل BH + طبقة</td><td>⭐⭐⭐ مناطق ساحلية</td></tr>
<tr><td>pH</td><td>4-11</td><td>كل BH</td><td>⭐⭐ تأثير على الConcrete</td></tr>
<tr><td>Atterberg Limits (LL + PL)</td><td>%</td><td>كل طبقة طينية</td><td>⭐⭐⭐ تحديد طبيعة التربة</td></tr>
<tr><td>التدرج Analysis</td><td>%</td><td>كل طبقة</td><td>⭐⭐⭐ تصنيف التربة</td></tr>
<tr><td>Natural الرطوبة Content</td><td>%</td><td>كل عينة</td><td>⭐⭐ حالة التربة</td></tr>
<tr><td>الوزن النوعي</td><td>Gs</td><td>كل نوع تربة</td><td>⭐⭐ حسابات الضغط</td></tr>
<tr><td>نسبة تحمل كاليفورنيا (CBR) (مشبع بالماء)</td><td>%</td><td>كل طبقة للطرق</td><td>⭐⭐⭐ تصميم الطريق</td></tr>
<tr><td>Proctor الدمك</td><td>الكثافة الجافة القصوى (MDD) + محتوى الرطوبة المثلى (OMC)</td><td>كل تغيير مادة</td><td>⭐⭐⭐ متطلبات الCompaction</td></tr>
<tr><td>الانضغاط التوطيدي</td><td>Cc + Cv</td><td>الطين الرخو</td><td>⭐⭐ حساب الهبوط</td></tr>
<tr><td>مقاومة القص (UU)</td><td>c + φ</td><td>عند الحاجة</td><td>⭐⭐ تصميم الأساسات</td></tr>
</table>
<h3>⚠️ قطر — الكبريتات الأهم</h3>
<table class="dm-table"><tr><th>نتيجة SO3</th><th>التصنيف</th><th>المطلوب</th></tr>
<tr><td>&lt; 0.2%</td><td>الصف / الفئة 1 — منخفض</td><td>OPC عادي</td></tr>
<tr><td>0.2-0.5%</td><td>الصف / الفئة 2</td><td>SRPC أو OPC+GGBS</td></tr>
<tr><td>0.5-1.0%</td><td>الصف / الفئة 3</td><td>SRPC إلزامي</td></tr>
<tr><td>1.0-2.0%</td><td>الصف / الفئة 4</td><td>SRPC + Protective Coating</td></tr>
<tr><td>&gt; 2.0%</td><td>الصف / الفئة 5 — خطر</td><td>دراسة خاصة</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🔬 Geotechnical Laboratory Tests — QCS 2024</h3>
<table class="dm-table">
<tr><th>Test</th><th>Standard</th><th>Purpose</th></tr>
<tr><td>Atterberg Limits (LL + PL)</td><td>ASTM D4318</td><td>Classify cohesive soils</td></tr>
<tr><td>Particle Size Distribution</td><td>ASTM D422</td><td>Soil classification</td></tr>
<tr><td>Proctor Compaction</td><td>ASTM D698 (Standard) / D1557 (Modified)</td><td>MDD + OMC</td></tr>
<tr><td>CBR (soaked 4 days)</td><td>ASTM D1883</td><td>Subgrade strength</td></tr>
<tr><td>Unconfined Compression</td><td>ASTM D2166</td><td>Cohesive soil strength</td></tr>
<tr><td>Sulphate (SO3)</td><td>BS 1377 Part 3</td><td>Concrete attack risk</td></tr>
<tr><td>Chloride Content</td><td>BS 1377 Part 3</td><td>Rebar corrosion risk</td></tr>
<tr><td>Consolidation</td><td>ASTM D2435</td><td>Settlement prediction</td></tr>
<tr><td>Organic Content</td><td>BS 1377</td><td>Unsuitable fill check</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Qatar Specific: SO3 and Cl tests mandatory in ALL geotechnical investigations. Sabkha, gypseous soils, and high GWL are common.
</div>
</div>
` };
  c["geo_report"] = { title: '📋 الجسات — التقرير النهائي (GI Report)', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | GI Report</div>
<h3>📋 محتوى التقرير الإلزامي</h3>
<table class="dm-table"><tr><th>القسم</th><th>المحتوى</th></tr>
<tr><td>1. مقدمة</td><td>الموقع + الغرض + نطاق الدراسة</td></tr>
<tr><td>2. الجيولوجيا الإقليمية</td><td>التكوينات الجيولوجية في المنطقة</td></tr>
<tr><td>3. نتائج الحفر</td><td>بئر المسح (Borehole) Logs + صور + توصيف الطبقات</td></tr>
<tr><td>4. نتائج الاختبارات الميدانية</td><td>اختبار الاختراق القياسي (SPT) + النفاذية + أي اختبارات أخرى</td></tr>
<tr><td>5. نتائج المختبر</td><td>كل الاختبارات الكيميائية والفيزيائية</td></tr>
<tr><td>6. المياه الجوفية</td><td>المستويات + جودة المياه + التوصيات</td></tr>
<tr><td>7. التوصيات</td><td>نوع الأساس + أعماق التأسيس + تصنيف الكبريتات</td></tr>
<tr><td>8. المقاطع الجيولوجية</td><td>Cross Sections تربط كل BH</td></tr>
</table>
<h3>⭐ التوصيات الإلزامية في قطر</h3>
<p>• <strong>Sulphate Classification:</strong> الصف / الفئة 1-5 للتربة والمياه الجوفية<br/>• <strong>نوع الأسمنت:</strong> OPC أم SRPC أم SRPC+GGBS<br/>• <strong>الغطاء الخرساني الConcrete:</strong> حسب Exposure الصف / الفئة<br/>• <strong>العزل المائي:</strong> نوع ومواصفات الحماية المطلوبة<br/>• <strong>Dewatering:</strong> الطريقة والعمق المتوقع<br/>• <strong>Sabkha:</strong> التوصية بالمعالجة أو الاستبدال</p>
<h3>🔴 نقاط توقف</h3>
<p>• <strong>HP-06:</strong> اعتماد GI Report من جيوتقني المهندس قبل التصميم</p>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | GI Report</div>
<h3>📋 Mandatory Report Contents</h3>
<table class="dm-table"><tr><th>Section</th><th>Content</th></tr>
<tr><td>1. Introduction</td><td>Site location + purpose + scope of investigation</td></tr>
<tr><td>2. Regional Geology</td><td>Geological formations in the area</td></tr>
<tr><td>3. Drilling Results</td><td>Borehole Logs + photos + layer descriptions</td></tr>
<tr><td>4. Field Test Results</td><td>SPT + Permeability + any other field tests</td></tr>
<tr><td>5. Laboratory Results</td><td>All chemical and physical test data</td></tr>
<tr><td>6. Groundwater</td><td>Levels + water quality + recommendations</td></tr>
<tr><td>7. Recommendations</td><td>Foundation type + founding depths + sulphate classification</td></tr>
<tr><td>8. Geological Sections</td><td>Cross Sections linking all boreholes</td></tr>
</table>
<h3>⭐ Mandatory Qatar Recommendations</h3>
<p>• <strong>Sulphate Classification:</strong> Class 1-5 for soil and groundwater<br>• <strong>Cement Type:</strong> OPC / SRPC / SRPC+GGBS as applicable<br>• <strong>Concrete Cover:</strong> Per Exposure Class<br>• <strong>Waterproofing:</strong> Type and specification of protection required<br>• <strong>Dewatering:</strong> Method and expected depth<br>• <strong>Sabkha:</strong> Recommendation for treatment or replacement</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-06:</strong> GI Report approved by Geotechnical Engineer before design commences</p>
</div>
` };
  c["itp_geotech"] = { title: '📋 ITP — الجسات | Geotechnical Investigation', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 QCS 2024 — Section 2 | BS EN ISO 22476</div>
<h3>1.0 — التخطيط والتحضير</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>GEO</th><th>ضبط الجودة</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Investigation Plan</td><td>اعتماد الخطة</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>معتمد Plan</td></tr>
<tr><td>1.2</td><td>المعدات Calibration</td><td>اختبار الاختراق القياسي (SPT) Hammer + Rod</td><td>قبل البدء</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Calibration Cert</td></tr>
<tr><td>1.3</td><td>NOC Services</td><td>كل الجهات</td><td>قبل البدء</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>NOC Documents</td></tr>
</table>
<h3>2.0 — الحفر والسجلات</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>GEO</th><th>ضبط الجودة</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>بئر المسح (Borehole) Log</td><td>توصيف كل طبقة</td><td>كل BH</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>BH Log</td></tr>
<tr><td>2.2</td><td>اختبار الاختراق القياسي (SPT) الاختبار</td><td>كل 1.5m — N-القيمة</td><td>كل 1.5m</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>اختبار الاختراق القياسي (SPT) Record</td></tr>
<tr><td>2.3</td><td>العينة Collection</td><td>Undisturbed كل 2m</td><td>كل 2m</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>العينة Log</td></tr>
<tr><td>2.4</td><td>Water Level Record</td><td>فور الظهور + 24hr</td><td>كل BH</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>WL Record</td></tr>
</table>
<h3>3.0 — اختبارات المختبر</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>LAB</th><th>GEO</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Sulphate Content</td><td>%</td><td>كل BH + طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>المختبر Report</td></tr>
<tr><td>3.2</td><td>Chloride Content</td><td>%</td><td>كل BH + طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>المختبر Report</td></tr>
<tr><td>3.3</td><td>Atterberg Limits</td><td>LL + PI</td><td>كل طبقة طينية</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>المختبر Report</td></tr>
<tr><td>3.4</td><td>التدرج Analysis</td><td>USCS Classification</td><td>كل طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>المختبر Report</td></tr>
<tr><td>3.5</td><td>نسبة تحمل كاليفورنيا (CBR) (للطرق)</td><td>مشبع بالماء 4 days</td><td>كل طبقة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>المختبر Report</td></tr>
<tr><td>3.6</td><td>Water Quality</td><td>SO4 + Cl + pH</td><td>كل BH</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>المختبر Report</td></tr>
</table>
<h3>4.0 — التقرير النهائي</h3>
<table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>المعيار</th><th>التكرار</th><th>GEO</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>GI Report</td><td>محتوى كامل حسب QCS S2</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>GI Report</td></tr>
<tr><td>4.2</td><td>Sulphate Classification</td><td>الصف / الفئة 1-5</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>GI Report</td></tr>
<tr><td>4.3</td><td>الأساس Recommendations</td><td>نوع + عمق + تحمّل</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>GI Report</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = نقطة توقف  |  <strong style="color:#f1c40f;">W</strong> = نقطة مراقبة  |  <strong style="color:#2ecc71;">R</strong> = مراجعة  |  <strong style="color:#3498db;">GEO</strong> = جيوتقني المهندس</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>🔬 Geotechnical Investigation — Full ITP</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Borehole Position</td><td>Survey vs planned location</td><td>±1.0m</td><td>W</td></tr>
<tr><td>Borehole Diameter</td><td>Check casing</td><td>Min 100mm (SPT) / 150mm (sampling)</td><td>W</td></tr>
<tr><td>SPT Test</td><td>N-value per 1.5m</td><td>Logged per BS 1377 Part 9</td><td>W</td></tr>
<tr><td>Undisturbed Sample</td><td>Shelby tube 100mm</td><td>Min 1 per 3m cohesive</td><td>W</td></tr>
<tr><td>GWL Observation</td><td>Standpipe 24hr min</td><td>Recorded after stabilization</td><td>W</td></tr>
<tr><td>Bulk Sample</td><td>Min 50kg per layer change</td><td>For lab testing</td><td>W</td></tr>
<tr><td>SO3 Lab Test</td><td>All layers</td><td>Per BS 1377 Part 3</td><td>W</td></tr>
<tr><td>Cl Lab Test</td><td>All layers</td><td>Per BS 1377 Part 3</td><td>W</td></tr>
<tr><td>CBR Field Test</td><td>DCP at subgrade level</td><td>≥8% for road design</td><td>H</td></tr>
<tr><td>Final Report</td><td>PE/geologist review</td><td>Signed + stamped engineer</td><td>H</td></tr>
</table>
</div>

<div class="lang-content-ar">
<h3>📐 جدول 5:1 — الناعم الركام للـ Marshall الخلطة — QCS S6 P5 Page 9</h3>
<p style="font-size:11px;color:var(--text3);">الناعم الركام = المواد المارة من منخل 2.36mm (Marshall) أو 4.75mm (Superpave)</p>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة (Marshall)</th><th>الاختبار</th></tr>
<tr><td>معادل الرمل (SE)</td><td>≥ 35%</td><td>ASTM D2419</td></tr>
<tr><td>الناعم الركام Angularity (FAA)</td><td>≥ 45% Uncompacted Voids</td><td>ASTM C1252</td></tr>
<tr><td>Clay Content (SE alt.)</td><td>≤ 1%</td><td>ASTM D4318</td></tr>
<tr><td>مؤشر اللدونة (PI)</td><td>Non-Plastic (NP)</td><td>ASTM D4318</td></tr>
<tr><td>Soundness (MgSO4)</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>الوزن النوعي (Bulk SSD)</td><td>≥ 2.50 Mg/m³</td><td>ASTM C128</td></tr>
<tr><td>امتصاص الماء</td><td>≤ 2%</td><td>ASTM C128</td></tr>
<tr><td>Organic Impurities</td><td>Colour ≤ No. 3</td><td>ASTM C40</td></tr>
<tr><td>Sulphate (SO3)</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td><td>BS 1377</td></tr>
</table>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:8px 0;font-size:12px;">
<strong>Superpave فرق:</strong> الناعم الركام يُعرَّف كـ مادة مارة من 4.75mm (بدل 2.36mm في Marshall). FAA ≥ 45% يبقى نفسه.
</div>
<h3>📐 جدول 5:2 — الخشن الركام للإسفلت — QCS S6 P5 Page 10</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>طبقة السطح (Wearing Course)</th><th>طبقة الربط (Binder Course)</th><th>الاختبار</th></tr>
<tr><td>LA Abrasion Loss</td><td>≤ 25%</td><td>≤ 30%</td><td>ASTM C131</td></tr>
<tr><td>مؤشر الرقائقية (FI)</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>مؤشر الاستطالة (EI)</td><td>≤ 20%</td><td>≤ 25%</td><td>BS 812 P105</td></tr>
<tr><td>قيمة الحجر المصقول (PSV) (PSV)</td><td>≥ 55</td><td>لا يُشترط</td><td>BS 812 P114</td></tr>
<tr><td>Fractured Faces (1 face+)</td><td>≥ 95%</td><td>≥ 90%</td><td>ASTM D5821</td></tr>
<tr><td>Fractured Faces (2 faces+)</td><td>≥ 90%</td><td>≥ 85%</td><td>ASTM D5821</td></tr>
<tr><td>Soundness (MgSO4)</td><td>≤ 12%</td><td>≤ 12%</td><td>ASTM C88</td></tr>
<tr><td>امتصاص الماء</td><td>≤ 2%</td><td>≤ 2%</td><td>ASTM C127</td></tr>
<tr><td>الوزن النوعي (Bulk SSD)</td><td>≥ 2.50</td><td>≥ 2.50</td><td>ASTM C127</td></tr>
<tr><td>Sulphate (SO3)</td><td>≤ 0.4%</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Chloride</td><td>≤ 0.04%</td><td>≤ 0.04%</td><td>BS 1377</td></tr>
<tr><td>Alkali Silica Reactivity</td><td>Non-reactive</td><td>Non-reactive</td><td>ASTM C1260</td></tr>
</table>
<h3>📐 جدول 5:3 — Mineral Filler — QCS S6 P5 Page 10</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة</th><th>الاختبار</th></tr>
<tr><td>المصدر</td><td>Stone Dust أو Portland الإسمنت أو Hydrated Lime</td><td>—</td></tr>
<tr><td>% Passing 0.600 mm</td><td>100%</td><td>ASTM C136</td></tr>
<tr><td>% Passing 0.300 mm</td><td>95 - 100%</td><td>ASTM C136</td></tr>
<tr><td>% Passing 0.075 mm</td><td>70 - 100%</td><td>ASTM C136</td></tr>
<tr><td>مؤشر اللدونة (PI)</td><td>Non-Plastic (NP)</td><td>ASTM D4318</td></tr>
<tr><td>Voids in Dry مدموك Filler</td><td>28 - 45%</td><td>EN 1097-4</td></tr>
<tr><td>Sulphate SO3</td><td>≤ 0.4%</td><td>BS 1377</td></tr>
<tr><td>Water Sensitivity (TSR)</td><td>≥ 75% (مع Filler فقط)</td><td>AASHTO T283</td></tr>
</table>
<h3>📐 جدول 5:4 — الإسفلت Binder 60/70 — QCS S6 P5 Page 11</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة</th><th>الاختبار</th></tr>
<tr><td>الاختراق @ 25°C</td><td>60 - 70 × 0.1mm</td><td>ASTM D5 / BS EN 1426</td></tr>
<tr><td>نقطة اللدونة R&amp;B</td><td>49 - 56°C</td><td>ASTM D36 / BS EN 1427</td></tr>
<tr><td>اللدونة @ 25°C</td><td>≥ 100 cm</td><td>ASTM D113</td></tr>
<tr><td>Flash Point (COC)</td><td>≥ 232°C</td><td>ASTM D92</td></tr>
<tr><td>Solubility in TCE</td><td>≥ 99%</td><td>ASTM D2042</td></tr>
<tr><td>الوزن النوعي @ 25°C</td><td>1.01 - 1.05</td><td>ASTM D70</td></tr>
<tr><td>Wax Content</td><td>≤ 2.2%</td><td>IP 336</td></tr>
<tr><td>Loss on Heating (RTFOT)</td><td>≤ 0.8%</td><td>ASTM D1754</td></tr>
<tr><td>الاختراق النسبة after RTFOT</td><td>≥ 50%</td><td>ASTM D5</td></tr>
<tr><td>اللدونة after RTFOT @ 25°C</td><td>≥ 50 cm</td><td>ASTM D113</td></tr>
<tr><td>نقطة اللدونة after RTFOT</td><td>Increase ≤ 8°C</td><td>ASTM D36</td></tr>
</table>
<h3>📐 جدول 5:5 — PMB Polymer Modified البيتومين — QCS S6 P5 Page 11</h3>
<p style="font-size:11px;color:var(--text3);">PG = درجة الأداء (PG) | PG76-10 = يتحمل +76°C صيفاً و -10°C شتاءً</p>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الخاصية</th><th>المواصفة (PG76-10)</th><th>الاختبار</th></tr>
<tr><td>الاختراق @ 25°C</td><td>40 - 80 × 0.1mm</td><td>ASTM D5</td></tr>
<tr><td>نقطة اللدونة R&amp;B</td><td>≥ 65°C</td><td>ASTM D36</td></tr>
<tr><td>Flash Point</td><td>≥ 235°C</td><td>ASTM D92</td></tr>
<tr><td>Elastic Recovery @ 25°C</td><td>≥ 70%</td><td>ASTM D6084</td></tr>
<tr><td>Force اللدونة @ 4°C</td><td>≥ 2 N (at 5cm/min)</td><td>EN 13589</td></tr>
<tr><td>Toughness &amp; Tenacity</td><td>T ≥ 15 J / t ≥ 5 J</td><td>ASTM D5801</td></tr>
<tr><td>G*/sinδ (DSR Unaged) @ 76°C</td><td>≥ 2.2 kPa</td><td>AASHTO T315</td></tr>
<tr><td>G*/sinδ (DSR after RTFOT) @ 76°C</td><td>≥ 4.4 kPa</td><td>AASHTO T315</td></tr>
<tr><td>المرحلة Angle δ (DSR) @ 76°C</td><td>≤ 75°</td><td>AASHTO T315</td></tr>
<tr><td>Creep Stiffness S (BBR) @ -10°C</td><td>≤ 300 MPa</td><td>AASHTO T313</td></tr>
<tr><td>m-value (BBR) @ -10°C</td><td>≥ 0.300</td><td>AASHTO T313</td></tr>
<tr><td>Storage Stability (ΔSoftening Pt)</td><td>≤ 5°C (after 48hr @ 163°C)</td><td>EN 13399</td></tr>
<tr><td>Solubility</td><td>≥ 99%</td><td>ASTM D2042</td></tr>
<tr><td>Polymer النوع</td><td>SBS أو SBR (معتمد من المهندس)</td><td>FTIR</td></tr>
</table>
<h3>📐 الطلاء التمهيدي (Prime Coat) — QCS S6 P5 Page 13</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>نوع المادة</td><td>Cutback البيتومين MC-30 أو MC-70</td><td>ASTM D2028</td></tr>
<tr><td>معدل الرش</td><td>0.8 - 1.2 L/m²</td><td>QCS S6 P5 P13</td></tr>
<tr><td>درجة الحرارة عند الرش</td><td>50 - 80°C (حسب grade)</td><td>QCS S6 P5</td></tr>
<tr><td>وقت المعالجة قبل الإسفلت</td><td>24 hour كحد أدنى (حسب النفاذ)</td><td>QCS S6 P5</td></tr>
<tr><td>عمق النفاذ</td><td>10 - 15mm في الطبقة</td><td>QCS S6 P5</td></tr>
<tr><td>السطح</td><td>جاف + نظيف + مكنوس بـ Power Broom</td><td>MS</td></tr>
<tr><td>الطقس</td><td>لا يُطبَّق عند مطر أو غبار أو &lt; 10°C</td><td>QCS S6 P5</td></tr>
</table>
<h3>📐 طبقة الالتصاق (Tack Coat) — QCS S6 P5 Page 13</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>البند</th><th>طبقة الربط (Binder Course)</th><th>طبقة السطح (Wearing Course)</th><th>المرجع</th></tr>
<tr><td>نوع المادة</td><td>Emulsified البيتومين SS-1 أو CSS-1</td><td>Emulsified البيتومين SS-1 أو CSS-1</td><td>ASTM D977</td></tr>
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
` };
})();
