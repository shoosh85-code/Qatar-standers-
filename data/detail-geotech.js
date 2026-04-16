// detail-geotech.js — QatarSpec data chunk
// Auto-generated: 8 keys
(function() {
  const chunk = {
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
<div id="vid-player-geotech" class="qs-vid-placeholder" data-maxh="280px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 2 | Geotechnical Investigation</div>
<h3>📋 نظرة عامة</h3>
<p>الجسات في قطر ضرورة قبل أي مشروع. التربة القطرية متنوعة — Sabkha، رمل، صخر جيري، ومياه جوفية عالية الكبريتات. تقرير الجسات يحدد نوع الأساس ومتطلبات الConcrete.</p>
<h3>📌 اختر القسم</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="openDetail('geo_planning')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التخطيط</div><div style="color:var(--text3);font-size:11px;">Scope & Grid</div></div>
<div onclick="openDetail('geo_borehole')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🕳️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Boreholes</div><div style="color:var(--text3);font-size:11px;">الحفر والتسجيل</div></div>
<div onclick="openDetail('geo_spt')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔨</div><div style="color:var(--gold);font-weight:700;font-size:13px;">SPT Test</div><div style="color:var(--text3);font-size:11px;">Standard Penetration</div></div>
<div onclick="openDetail('geo_lab')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">اختبارات المختبر</div><div style="color:var(--text3);font-size:11px;">Lab Tests</div></div>
<div onclick="openDetail('geo_water')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">💧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">المياه الجوفية</div><div style="color:var(--text3);font-size:11px;">Groundwater</div></div>
<div onclick="openDetail('geo_report')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📋</div><div style="color:var(--gold);font-weight:700;font-size:13px;">التقرير النهائي</div><div style="color:var(--text3);font-size:11px;">GI Report</div></div>
</div>
<div style="margin-top:12px;"><div onclick="openDetail('itp_geotech')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP الجسات الكامل</div></div></div>
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
<div id="vid-player-geotech-en" class="qs-vid-placeholder" data-maxh="280px"></div>
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
` }
  };
  Object.assign(window._QS_chunk_geotech, chunk);
})();
