// QatarSpec Pro — Content Phase 4: Missing Keys — FULLY BILINGUAL
// pile_load_testing | exec_concrete_pour | exec_bridge_rebar | exec_foundation_excavation
// exec_asphalt_paving | exec_water_pipe | concrete_quick_ref | asphalt_quick_ref | pipe_quick_ref
(function(){
  var c = window.QS_CONTENT = window.QS_CONTENT || {};

// ═══════════════════════════════════════════════════════════════
// 1. pile_load_testing — اختبار الخوازيق
// ═══════════════════════════════════════════════════════════════
c["pile_load_testing"] = { title: '🏗️ اختبار الخوازيق — Pile Load Testing', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 7 + BS 8004 + ASTM D1143
</div>
<h3>📊 أنواع اختبارات الخوازيق</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الهدف</th><th>عدد الخوازيق</th><th>التوقيت</th></tr>
<tr><td><strong>اختبار الحمل الساكن (SLT)</strong></td><td>تحقق من الحمولة الفعلية</td><td>1% من الإجمالي (min 1)</td><td>بعد 14 يوم من الصب</td></tr>
<tr><td><strong>اختبار سلامة الركيزة (PIT)</strong></td><td>كشف العيوب الداخلية</td><td>100% من الخوازيق</td><td>بعد 7 أيام</td></tr>
<tr><td><strong>اختبار الحمل الديناميكي (DLT/PDA)</strong></td><td>تحقق سريع من الحمولة</td><td>5% أو كما تحدده الاستشارة</td><td>بعد Set-up period</td></tr>
<tr><td><strong>Cross-Hole Sonic Logging</strong></td><td>فحص تجانس الخرسانة</td><td>خوازيق Ø≥600mm</td><td>بعد 7 أيام</td></tr>
</table>
<h3>🔴 اختبار الحمل الساكن — نقاط توقف</h3>
<table class="dm-table">
<tr><th>المرحلة</th><th>الاشتراط</th><th>QCS Ref</th></tr>
<tr><td>Kentledge/Reaction System</td><td>تحمل ≥ 2.5× تحميل الاختبار</td><td>QCS S5 P7 Cl.7.8</td></tr>
<tr><td>تحميل أولي</td><td>Proof الحمل = 1.5× القدرة التصميمية</td><td>QCS S5 P7</td></tr>
<tr><td>الهبوط المسموح</td><td>الهبوط / الانضغاط ≤ 25mm عند Proof الحمل</td><td>BS 8004 Cl.7.4</td></tr>
<tr><td>الانتعاش (Rebound)</td><td>≥ 50% من إجمالي الهبوط</td><td>QCS S5 P7</td></tr>
<tr><td>خوازيق الاختبار</td><td>لا تُستخدم في الإنشاء الدائم</td><td>QCS S5 P7 Cl.7.9</td></tr>
</table>
<h3>⚠️ PIT — اختبار سلامة الركيزة</h3>
<table class="dm-table">
<tr><th>التقييم</th><th>التفسير</th><th>الإجراء</th></tr>
<tr><td style="color:#2ecc71;">الصف / الفئة A</td><td>خازوق سليم — لا عيوب</td><td>قبول ✅</td></tr>
<tr><td style="color:#f39c12;">الصف / الفئة B</td><td>عيب محتمل — تحقيق إضافي</td><td>CSL أو DLT ⚠️</td></tr>
<tr><td style="color:#e74c3c;">الصف / الفئة C</td><td>عيب واضح — تقليص الحمولة</td><td>إجراء تصحيحي 🔴</td></tr>
<tr><td style="color:#e74c3c;">الصف / الفئة D</td><td>خازوق معيب — استبدال</td><td>تقرير عدم المطابقة (NCR) + استبدال ❌</td></tr>
</table>
<h3>📋 خطة الفحص والاختبار (ITP) قائمة المراجعة — اختبار الخوازيق</h3>
<table class="dm-table">
<tr><th>البند</th><th>المعيار</th><th>النقطة</th></tr>
<tr><td>Cage الفحص قبل الصب</td><td>القطر + الغطاء الخرساني + الطول ✓</td><td>HP</td></tr>
<tr><td>الخرسانة الهبوط (Slump) (مياه تحت)</td><td>160-220mm (Tremie)</td><td>W</td></tr>
<tr><td>مكعب اختبار Tests</td><td>6 مكعبات كل 25m³ (min/pile)</td><td>W</td></tr>
<tr><td>PIT بعد 7 أيام</td><td>الصف / الفئة A لكل الخوازيق</td><td>HP</td></tr>
<tr><td>Cut-off Level</td><td>±25mm من الرسمة</td><td>W</td></tr>
<tr><td>As-built المسح والرفع المساحي</td><td>الانحراف ≤ 75mm من الموقع المحدد</td><td>HP</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
🔴 <strong>تنبيه:</strong> لا يُسمح بصب Cap الكمرة / الجسر قبل استلام نتائج PIT لجميع خوازيق المجموعة — QCS S5 P7 Cl.7.10
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 7 + BS 8004 + ASTM D1143
</div>

<h3>📊 Pile Load Test Types</h3>
<table class="dm-table">
<tr><th>Test</th><th>Purpose</th><th>No. of Piles</th><th>Timing</th></tr>
<tr><td><strong>Static Load Test (SLT)</strong></td><td>Verify actual load capacity</td><td>1% of total (min 1)</td><td>After 14 days from casting</td></tr>
<tr><td><strong>Pile Integrity Test (PIT)</strong></td><td>Detect internal defects</td><td>100% of all piles</td><td>After 7 days</td></tr>
<tr><td><strong>Dynamic Load Test (DLT/PDA)</strong></td><td>Rapid load capacity verification</td><td>5% or as directed by Engineer</td><td>After Set-up period</td></tr>
<tr><td><strong>Cross-Hole Sonic Logging (CSL)</strong></td><td>Concrete homogeneity inspection</td><td>Piles Ø≥600mm</td><td>After 7 days</td></tr>
</table>

<h3>🔴 Static Load Test — Hold Points</h3>
<table class="dm-table">
<tr><th>Stage</th><th>Requirement</th><th>QCS Ref</th></tr>
<tr><td>Kentledge/Reaction System</td><td>Capacity ≥ 2.5× test load</td><td>QCS S5 P7 Cl.7.8</td></tr>
<tr><td>Initial Loading</td><td>Proof Load = 1.5× design capacity</td><td>QCS S5 P7</td></tr>
<tr><td>Allowable Settlement</td><td>Settlement ≤ 25mm at Proof Load</td><td>BS 8004 Cl.7.4</td></tr>
<tr><td>Rebound</td><td>≥ 50% of total settlement</td><td>QCS S5 P7</td></tr>
<tr><td>Test Piles</td><td>Shall not be used in permanent structure</td><td>QCS S5 P7 Cl.7.9</td></tr>
</table>

<h3>⚠️ PIT — Pile Integrity Test Classification</h3>
<table class="dm-table">
<tr><th>Classification</th><th>Interpretation</th><th>Action</th></tr>
<tr><td style="color:#2ecc71;">Class A</td><td>Sound pile — no defects detected</td><td>Accept ✅</td></tr>
<tr><td style="color:#f39c12;">Class B</td><td>Possible defect — further investigation required</td><td>CSL or DLT ⚠️</td></tr>
<tr><td style="color:#e74c3c;">Class C</td><td>Confirmed defect — load reduction required</td><td>Corrective action 🔴</td></tr>
<tr><td style="color:#e74c3c;">Class D</td><td>Defective pile — replacement required</td><td>NCR + Replacement ❌</td></tr>
</table>

<h3>📋 ITP Checklist — Pile Load Testing</h3>
<table class="dm-table">
<tr><th>Item</th><th>Acceptance Criterion</th><th>Control Point</th></tr>
<tr><td>Cage Inspection prior to concreting</td><td>Diameter + Cover + Length ✓</td><td>HP</td></tr>
<tr><td>Concrete Slump (underwater)</td><td>160–220mm (Tremie method)</td><td>W</td></tr>
<tr><td>Cube Tests</td><td>6 cubes per 25m³ (min per pile)</td><td>W</td></tr>
<tr><td>PIT after 7 days</td><td>Class A for all piles</td><td>HP</td></tr>
<tr><td>Cut-off Level</td><td>±25mm from drawing</td><td>W</td></tr>
<tr><td>As-built Survey</td><td>Deviation ≤ 75mm from specified position</td><td>HP</td></tr>
</table>

<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
🔴 <strong>Warning:</strong> Cap Beam shall not be poured until PIT results are received and accepted for all piles in the group — QCS S5 P7 Cl.7.10
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 2. exec_concrete_pour — آلية صب الخرسانة (Stepper)
// ═══════════════════════════════════════════════════════════════
c["exec_concrete_pour"] = { title: '🏗️ آلية صب الخرسانة — 6 خطوات', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 4 | الخرسانة Placement
</div>
<div class="calc-tabs">
<div class="calc-tab active" onclick="showExecStep('cp',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">1️⃣ قبل الصب</div>
<div class="calc-tab" onclick="showExecStep('cp',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">2️⃣ الاستلام</div>
<div class="calc-tab" onclick="showExecStep('cp',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">3️⃣ الصب</div>
<div class="calc-tab" onclick="showExecStep('cp',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">4️⃣ الدمك</div>
<div class="calc-tab" onclick="showExecStep('cp',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">5️⃣ المعالجة</div>
<div class="calc-tab" onclick="showExecStep('cp',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">6️⃣ الفك</div>
</div>
<div id="cp-step-1">
<h3>1️⃣ قبل الصب — قبل-pour قائمة المراجعة</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>QCS</th></tr>
<tr><td>🔴 طلب المعلومات (RFI) مفتوح</td><td>توقيع SC قبل أي صب</td><td>FIDIC Cl.7.4</td></tr>
<tr><td>تسليح + الغطاء الخرساني Spacers</td><td>تحقق الغطاء الخرساني + Lap + التباعد</td><td>S5 P3</td></tr>
<tr><td>نظافة القالب</td><td>خالٍ من النشارة، ماء، زيت</td><td>S5 P8</td></tr>
<tr><td>إغلاق الفتحات</td><td>laitance laps + penetrations sealed</td><td>S5 P8</td></tr>
<tr><td>Release Agent</td><td>طبقة رفيعة منتظمة — بدون تقطر</td><td>S5 P8</td></tr>
<tr><td>مضخة + Vibrators</td><td>Standby الهازة متوفر دائماً</td><td>S5 P4</td></tr>
<tr><td>مكعب اختبار Moulds</td><td>6 مكعبات كل 50m³ أو كل Truck</td><td>S5 P4</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⛔ في الجو الحار (&gt;35°C): ابدأ الصب بعد الغروب — أضف ثلج — QCS S5 P4 Cl.4.8
</div>
</div>
<div id="cp-step-2" style="display:none">
<h3>2️⃣ استلام الخرسانة — معيار القبول at Site</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الحد المسموح</th><th>الإجراء عند الرفض</th></tr>
<tr><td>التسليم ملاحظة</td><td>الخلطة ID + W/C + الوقت ✓</td><td>رفض التسليم</td></tr>
<tr><td>الوقت من الخلط</td><td>≤ 90 دقيقة (60 صيفاً)</td><td>رفض — تقرير عدم المطابقة (NCR)</td></tr>
<tr><td>درجة حرارة الخرسانة</td><td>≤ 32°C عند الصب</td><td>إضافة ثلج أو رفض</td></tr>
<tr><td>الهبوط (Slump)</td><td>الهدف ± 25mm (الحد الأقصى 180mm)</td><td>رفض إذا &gt;الحد الأقصى</td></tr>
<tr><td>Air Content (إن طُلب)</td><td>4-6% (air-entrained)</td><td>رفض</td></tr>
<tr><td>أخذ المكعبات</td><td>6 مكعبات / 50m³ — في الموقع</td><td>إلزامي</td></tr>
</table>
</div>
<div id="cp-step-3" style="display:none">
<h3>3️⃣ صب الخرسانة — Placement</h3>
<table class="dm-table">
<tr><th>الاشتراط</th><th>القيمة</th><th>QCS</th></tr>
<tr><td>ارتفاع السقوط الحر</td><td>≤ 1.5m (سطح الخرسانة)</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>سمك الطبقة</td><td>≤ 450mm لكل طبقة</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>وقت بين الطبقات</td><td>≤ ابتدائي Set الوقت (≈ 2hr)</td><td>S5 P4 Cl.4.4</td></tr>
<tr><td>Cold الوصلات</td><td>ممنوع — استمر بالصب</td><td>S5 P4 Cl.4.5</td></tr>
<tr><td>تحريك الخرسانة أفقياً</td><td>ممنوع بالـ الهازة</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>مسافة من الشدة للصب</td><td>لا تضرب الـ قضبان التسليح مباشرة</td><td>S5 P4</td></tr>
</table>
</div>
<div id="cp-step-4" style="display:none">
<h3>4️⃣ الدمك — الهزة / الاهتزاز</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>نوع الهازة</td><td>Internal (Poker) Ø ≥ 25mm</td></tr>
<tr><td>Insertion التباعد</td><td>≤ 450mm (1.5× radius of action)</td></tr>
<tr><td>مدة الدمك</td><td>5-15 ثانية حتى توقف الفقاعات</td></tr>
<tr><td>سحب الـ الهازة</td><td>ببطء — 75-150mm/sec</td></tr>
<tr><td>Revibration</td><td>مسموح خلال ابتدائي Set فقط</td></tr>
<tr><td>Standby الهازة</td><td>إلزامي في كل عملية صب</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⚠️ Over-vibration = Segregation = عيب خطير — QCS S5 P4
</div>
</div>
<div id="cp-step-5" style="display:none">
<h3>5️⃣ المعالجة — المعالجة / التصليد</h3>
<table class="dm-table">
<tr><th>الحالة</th><th>مدة المعالجة / التصليد</th><th>الطريقة</th></tr>
<tr><td>عادي (&lt; 30°C)</td><td>7 أيام minimum</td><td>Hessian + ماء / المعالجة / التصليد Compound</td></tr>
<tr><td>حار (30-40°C)</td><td>10 أيام</td><td>Hessian مبلل باستمرار</td></tr>
<tr><td>شديد الحرارة (&gt;40°C)</td><td>14 يوم</td><td>Polythene Sheet + مياه</td></tr>
<tr><td>SRPC / GGBS</td><td>10-14 يوم</td><td>مبلل مستمر</td></tr>
<tr><td>المعالجة الأولى</td><td>فوراً بعد الصب (≤30 دقيقة)</td><td>Wet Hessian أو رش Compound</td></tr>
</table>
<div style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
✅ درجة حرارة المعالجة: 5-35°C — تجنب الجفاف المبكر — QCS S5 P4 Cl.4.9
</div>
</div>
<div id="cp-step-6" style="display:none">
<h3>6️⃣ فك الشدة — Striking</h3>
<table class="dm-table">
<tr><th>العنصر</th><th>الحد الأدنى</th><th>الشرط</th></tr>
<tr><td>جوانب الجدران والأعمدة</td><td>24 ساعة</td><td>مكعب اختبار ≥ 5 MPa</td></tr>
<tr><td>Slabs (Span ≤ 5m)</td><td>7 أيام</td><td>مكعب اختبار ≥ 70% fcu</td></tr>
<tr><td>Slabs (Span &gt; 5m)</td><td>14 يوم</td><td>مكعب اختبار ≥ 70% fcu</td></tr>
<tr><td>Beams / Cantilevers</td><td>21 يوم</td><td>مكعب اختبار ≥ 75% fcu</td></tr>
<tr><td>Soffit Props</td><td>حسب الحسابات الإنشائية</td><td>لا تُزال قبل ≥ 28-day acceptance</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⚠️ القبول الرسمي = 28-day فقط — 7-day للمراقبة فقط وليس للقبول — QCS S5 P4
</div>
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 4 | Concrete Placement
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('cp',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ Pre-Pour</div>
  <div class="calc-tab" onclick="showExecStep('cp',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ Acceptance</div>
  <div class="calc-tab" onclick="showExecStep('cp',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ Placement</div>
  <div class="calc-tab" onclick="showExecStep('cp',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Vibration</div>
  <div class="calc-tab" onclick="showExecStep('cp',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">5️⃣ Curing</div>
  <div class="calc-tab" onclick="showExecStep('cp',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">6️⃣ Striking</div>
</div>

<div id="cp-step-1">
<h3>1️⃣ Pre-Pour Checklist</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th><th>QCS</th></tr>
<tr><td>🔴 Open RFI</td><td>SC signature required before any pour</td><td>FIDIC Cl.7.4</td></tr>
<tr><td>Reinforcement + Cover Spacers</td><td>Verify Cover + Lap + Spacing</td><td>S5 P3</td></tr>
<tr><td>Formwork Cleanliness</td><td>Free from debris, water, oil</td><td>S5 P8</td></tr>
<tr><td>Seal All Openings</td><td>Laitance laps + penetrations sealed</td><td>S5 P8</td></tr>
<tr><td>Release Agent</td><td>Uniform thin coat — no drips</td><td>S5 P8</td></tr>
<tr><td>Pump + Vibrators</td><td>Standby vibrator available at all times</td><td>S5 P4</td></tr>
<tr><td>Cube Moulds</td><td>6 cubes per 50m³ or per truck</td><td>S5 P4</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⛔ Hot weather (>35°C): commence pour after sunset — add ice — QCS S5 P4 Cl.4.8
</div>
</div>

<div id="cp-step-2" style="display:none">
<h3>2️⃣ Concrete Acceptance at Site</h3>
<table class="dm-table">
<tr><th>Test</th><th>Allowable Limit</th><th>Action on Rejection</th></tr>
<tr><td>Delivery Note</td><td>Mix ID + W/C + Time ✓</td><td>Reject delivery</td></tr>
<tr><td>Time from Batching</td><td>≤ 90 min (60 min in summer)</td><td>Reject — NCR</td></tr>
<tr><td>Concrete Temperature</td><td>≤ 32°C at point of placement</td><td>Add ice or reject</td></tr>
<tr><td>Slump</td><td>Target ± 25mm (Max 180mm)</td><td>Reject if >Max</td></tr>
<tr><td>Air Content (if specified)</td><td>4–6% (air-entrained)</td><td>Reject</td></tr>
<tr><td>Cube Sampling</td><td>6 cubes / 50m³ — on site</td><td>Mandatory</td></tr>
</table>
</div>

<div id="cp-step-3" style="display:none">
<h3>3️⃣ Concrete Placement</h3>
<table class="dm-table">
<tr><th>Requirement</th><th>Value</th><th>QCS</th></tr>
<tr><td>Free-fall height</td><td>≤ 1.5m (from concrete surface)</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>Layer thickness</td><td>≤ 450mm per layer</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>Time between layers</td><td>≤ Initial Set Time (≈ 2hr)</td><td>S5 P4 Cl.4.4</td></tr>
<tr><td>Cold Joints</td><td>Prohibited — maintain continuous pour</td><td>S5 P4 Cl.4.5</td></tr>
<tr><td>Horizontal movement with vibrator</td><td>Strictly prohibited</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>Proximity to formwork</td><td>Do not strike rebar directly</td><td>S5 P4</td></tr>
</table>
</div>

<div id="cp-step-4" style="display:none">
<h3>4️⃣ Compaction — Vibration</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Vibrator type</td><td>Internal (Poker) Ø ≥ 25mm</td></tr>
<tr><td>Insertion Spacing</td><td>≤ 450mm (1.5× radius of action)</td></tr>
<tr><td>Vibration duration</td><td>5–15 seconds until air bubbles cease</td></tr>
<tr><td>Withdrawal speed</td><td>Slowly — 75–150mm/sec</td></tr>
<tr><td>Revibration</td><td>Permitted within Initial Set period only</td></tr>
<tr><td>Standby Vibrator</td><td>Mandatory at every pour</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⚠️ Over-vibration = Segregation = Critical defect — QCS S5 P4
</div>
</div>

<div id="cp-step-5" style="display:none">
<h3>5️⃣ Curing</h3>
<table class="dm-table">
<tr><th>Condition</th><th>Curing Duration</th><th>Method</th></tr>
<tr><td>Normal (< 30°C)</td><td>7 days minimum</td><td>Hessian + water / Curing Compound</td></tr>
<tr><td>Hot (30–40°C)</td><td>10 days</td><td>Continuously wetted hessian</td></tr>
<tr><td>Extreme heat (>40°C)</td><td>14 days</td><td>Polythene sheet + water</td></tr>
<tr><td>SRPC / GGBS</td><td>10–14 days</td><td>Continuous wetting</td></tr>
<tr><td>Initial curing</td><td>Immediately after pour (≤30 min)</td><td>Wet hessian or spray compound</td></tr>
</table>
<div style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
✅ Curing temperature: 5–35°C — prevent premature drying — QCS S5 P4 Cl.4.9
</div>
</div>

<div id="cp-step-6" style="display:none">
<h3>6️⃣ Formwork Striking</h3>
<table class="dm-table">
<tr><th>Element</th><th>Minimum Period</th><th>Condition</th></tr>
<tr><td>Wall and column sides</td><td>24 hours</td><td>Cube ≥ 5 MPa</td></tr>
<tr><td>Slabs (Span ≤ 5m)</td><td>7 days</td><td>Cube ≥ 70% fcu</td></tr>
<tr><td>Slabs (Span > 5m)</td><td>14 days</td><td>Cube ≥ 70% fcu</td></tr>
<tr><td>Beams / Cantilevers</td><td>21 days</td><td>Cube ≥ 75% fcu</td></tr>
<tr><td>Soffit Props</td><td>Per structural calculations</td><td>Do not remove before 28-day acceptance</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⚠️ Formal acceptance = 28-day results only — 7-day results for monitoring purposes only, not for acceptance — QCS S5 P4
</div>
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 3. exec_bridge_rebar — آلية تسليح الجسور
// ═══════════════════════════════════════════════════════════════
c["exec_bridge_rebar"] = { title: '🌉 آلية تسليح الجسور — 4 خطوات', content: `
<div class="lang-content-ar">
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 3 + BS 4449 + BS 8666
</div>
<div class="calc-tabs">
<div class="calc-tab active" onclick="showExecStep('br',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">1️⃣ المواد</div>
<div class="calc-tab" onclick="showExecStep('br',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">2️⃣ الغطاء</div>
<div class="calc-tab" onclick="showExecStep('br',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">3️⃣ الوصلات</div>
<div class="calc-tab" onclick="showExecStep('br',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">4️⃣ Durability</div>
</div>
<div id="br-step-1">
<h3>1️⃣ فحص المواد — المادة معيار القبول</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>QCS Ref</th></tr>
<tr><td>Yield المقاومة fy</td><td>≥ 500 MPa (الدرجة B500B)</td><td>S5 P3 + BS 4449</td></tr>
<tr><td>مقاومة الشد fu</td><td>≥ 550 MPa</td><td>BS 4449</td></tr>
<tr><td>fu/fy النسبة</td><td>≥ 1.08</td><td>BS 4449 Cl.5.4</td></tr>
<tr><td>Elongation (A5)</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend الاختبار</td><td>180° — لا تشقق — 3d mandrel</td><td>BS 4449</td></tr>
<tr><td>Mill الشهادة</td><td>Heat Number مطابق للـ Bar</td><td>QCS S5 P3</td></tr>
<tr><td>الاختبار التكرار / التردد</td><td>كل 50 طن أو تغيير الـ Heat</td><td>QCS S5 P3</td></tr>
</table>
</div>
<div id="br-step-2" style="display:none">
<h3>2️⃣ الغطاء الخرساني — الخرسانة الغطاء الخرساني</h3>
<table class="dm-table">
<tr><th>العنصر / الموقع</th><th>الغطاء الخرساني min (mm)</th><th>QCS Ref</th></tr>
<tr><td>أساسات (مباشرة على التربة)</td><td><strong>75</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>أساسات (مع Blinding)</td><td><strong>50</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>أعمدة خارجية</td><td><strong>40</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>جدران خارجية</td><td><strong>40</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>بلاطات خارجية</td><td><strong>30</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>داخلي (Protected)</td><td><strong>20-25</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>خوازيق</td><td><strong>75</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>جسور بيئة بحرية</td><td><strong>60-75</strong></td><td>BS 6349</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:8px;">⚠️ المسموح به مسموحة: -0/+10mm — Spacers كل 1.0m في الأساسات و0.75m في الجدران</div>
</div>
<div id="br-step-3" style="display:none">
<h3>3️⃣ أطوال الوصلات — Lap Lengths</h3>
<table class="dm-table">
<tr><th>الحالة</th><th>Lap الطول</th><th>QCS Ref</th></tr>
<tr><td>Tension (المعيار)</td><td>40d</td><td>S5 P3 Cl.3.7</td></tr>
<tr><td>Compression</td><td>35d</td><td>S5 P3 Cl.3.7</td></tr>
<tr><td>High Seismic Zone</td><td>50d (Tension)</td><td>S5 P3</td></tr>
<tr><td>Curtailment</td><td>d + Anchorage من نقطة التوقف</td><td>S5 P3 Cl.3.6</td></tr>
<tr><td>Hooks (المعيار)</td><td>12d straight + 4d bent</td><td>BS 8666</td></tr>
<tr><td>كانات الربط / الكانات Hooks</td><td>135° — ليس 90°</td><td>S5 P3 Cl.3.5</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
🔴 Laps يجب ألا تكون في نقاط الإجهاد الأقصى — مثلاً منتصف البحر للـ Positive Moment — QCS S5 P3
</div>
</div>
<div id="br-step-4" style="display:none">
<h3>4️⃣ متطلبات المتانة — Durability</h3>
<table class="dm-table">
<tr><th>البيئة</th><th>الدرجة min</th><th>w/c max</th><th>الإسمنت min</th></tr>
<tr><td>داخلي (جاف)</td><td>C25</td><td>0.55</td><td>300 kg/m³</td></tr>
<tr><td>خارجي (قطر)</td><td>C35</td><td>0.45</td><td>350 kg/m³</td></tr>
<tr><td>SO₃ &gt; 0.5% (تربة)</td><td>C40</td><td>0.40</td><td>380 kg/m³ SRPC</td></tr>
<tr><td>بحري / Splash Zone</td><td>C40</td><td>0.40</td><td>400 kg/m³</td></tr>
<tr><td>خوازيق (قطر)</td><td>C40</td><td>0.40</td><td>400 kg/m³ + GGBS</td></tr>
</table>
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 3 + BS 4449 + BS 8666
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('br',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ Materials</div>
  <div class="calc-tab" onclick="showExecStep('br',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ Cover</div>
  <div class="calc-tab" onclick="showExecStep('br',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ Lap Lengths</div>
  <div class="calc-tab" onclick="showExecStep('br',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Durability</div>
</div>

<div id="br-step-1">
<h3>1️⃣ Material Acceptance Testing</h3>
<table class="dm-table">
<tr><th>Test</th><th>Criterion</th><th>QCS Ref</th></tr>
<tr><td>Yield Strength fy</td><td>≥ 500 MPa (Grade B500B)</td><td>S5 P3 + BS 4449</td></tr>
<tr><td>Tensile Strength fu</td><td>≥ 550 MPa</td><td>BS 4449</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.08</td><td>BS 4449 Cl.5.4</td></tr>
<tr><td>Elongation (A5)</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend Test</td><td>180° — no cracking — 3d mandrel</td><td>BS 4449</td></tr>
<tr><td>Mill Certificate</td><td>Heat Number matches bar marking</td><td>QCS S5 P3</td></tr>
<tr><td>Test Frequency</td><td>Every 50 tonnes or change of heat</td><td>QCS S5 P3</td></tr>
</table>
</div>

<div id="br-step-2" style="display:none">
<h3>2️⃣ Concrete Cover Requirements</h3>
<table class="dm-table">
<tr><th>Element / Location</th><th>Min Cover (mm)</th><th>QCS Ref</th></tr>
<tr><td>Foundations (directly on soil)</td><td><strong>75</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>Foundations (with blinding)</td><td><strong>50</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>External columns</td><td><strong>40</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>External walls</td><td><strong>40</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>External slabs</td><td><strong>30</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>Internal (protected)</td><td><strong>20–25</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>Piles</td><td><strong>75</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>Bridges — marine environment</td><td><strong>60–75</strong></td><td>BS 6349</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:8px;">⚠️ Allowable tolerance: -0/+10mm — Spacers every 1.0m for foundations and 0.75m for walls</div>
</div>

<div id="br-step-3" style="display:none">
<h3>3️⃣ Lap Lengths</h3>
<table class="dm-table">
<tr><th>Condition</th><th>Lap Length</th><th>QCS Ref</th></tr>
<tr><td>Tension (Standard)</td><td>40d</td><td>S5 P3 Cl.3.7</td></tr>
<tr><td>Compression</td><td>35d</td><td>S5 P3 Cl.3.7</td></tr>
<tr><td>High Seismic Zone</td><td>50d (Tension)</td><td>S5 P3</td></tr>
<tr><td>Curtailment</td><td>d + Anchorage from point of theoretical cut-off</td><td>S5 P3 Cl.3.6</td></tr>
<tr><td>Hooks (Standard)</td><td>12d straight + 4d bent</td><td>BS 8666</td></tr>
<tr><td>Links / Stirrup Hooks</td><td>135° — not 90°</td><td>S5 P3 Cl.3.5</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
🔴 Laps shall not be located at points of maximum stress — e.g. mid-span for positive moment zones — QCS S5 P3
</div>
</div>

<div id="br-step-4" style="display:none">
<h3>4️⃣ Durability Requirements</h3>
<table class="dm-table">
<tr><th>Environment</th><th>Min Grade</th><th>Max w/c</th><th>Min Cement</th></tr>
<tr><td>Internal (dry)</td><td>C25</td><td>0.55</td><td>300 kg/m³</td></tr>
<tr><td>External (Qatar)</td><td>C35</td><td>0.45</td><td>350 kg/m³</td></tr>
<tr><td>SO₃ > 0.5% (soil)</td><td>C40</td><td>0.40</td><td>380 kg/m³ SRPC</td></tr>
<tr><td>Marine / Splash Zone</td><td>C40</td><td>0.40</td><td>400 kg/m³</td></tr>
<tr><td>Piles (Qatar)</td><td>C40</td><td>0.40</td><td>400 kg/m³ + GGBS</td></tr>
</table>
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 4. exec_foundation_excavation — آلية حفر الأساسات
// ═══════════════════════════════════════════════════════════════
c["exec_foundation_excavation"] = { title: '⛏️ آلية حفر الأساسات — 6 خطوات', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 6 + Section 1 Safety
</div>
<div class="calc-tabs">
<div class="calc-tab active" onclick="showExecStep('fe',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">1️⃣ التخطيط</div>
<div class="calc-tab" onclick="showExecStep('fe',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">2️⃣ الحفر</div>
<div class="calc-tab" onclick="showExecStep('fe',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">3️⃣ التدعيم</div>
<div class="calc-tab" onclick="showExecStep('fe',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">4️⃣ Dewatering</div>
<div class="calc-tab" onclick="showExecStep('fe',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">5️⃣ Founding Level</div>
<div class="calc-tab" onclick="showExecStep('fe',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">6️⃣ الردم</div>
</div>
<div id="fe-step-1">
<h3>1️⃣ التخطيط والتحضير</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>مواقع المرافق</td><td>فحص QNBN / Ashghal Utility Map + حفرة اختبارs</td></tr>
<tr><td>تقرير الدراسة الجيوتقنية</td><td>مراجعة التربة Profile + GWT + قدرة تحمل التربة</td></tr>
<tr><td>بيان المنهجية</td><td>معتمد من SC قبل البدء</td></tr>
<tr><td>Permit to Work</td><td>خنادق &gt; 1.2m تحتاج Confined Space Permit</td></tr>
<tr><td>Setting Out</td><td>المسح والرفع المساحي Check: Grid Lines + Levels ± 10mm</td></tr>
</table>
</div>
<div id="fe-step-2" style="display:none">
<h3>2️⃣ الحفر — الحفر</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>QCS</th></tr>
<tr><td>Working Space</td><td>600mm على الأقل حول الأساس</td><td>S5 P6</td></tr>
<tr><td>Side الميل</td><td>1:1 (ميل آمن) إذا بدون Shoring</td><td>QCS S1 Safety</td></tr>
<tr><td>Barricade</td><td>1.5m من حافة الحفر</td><td>QCS S1</td></tr>
<tr><td>خروج الطوارئ</td><td>سلم كل 7.5m على الأقل</td><td>OSHA</td></tr>
<tr><td>المعدات بجانب الحفر</td><td>≥ 1.0m من حافة الحفر</td><td>QCS S1</td></tr>
<tr><td>فحص يومي</td><td>Competent Person يفحص قبل الدخول</td><td>QCS S1</td></tr>
</table>
</div>
<div id="fe-step-3" style="display:none">
<h3>3️⃣ التدعيم — Shoring</h3>
<table class="dm-table">
<tr><th>العمق</th><th>النوع المطلوب</th><th>الاشتراط</th></tr>
<tr><td>&lt; 1.2m</td><td>لا يلزم (تربة جيدة)</td><td>مراقبة مستمرة</td></tr>
<tr><td>1.2m – 3.0m</td><td>Timber Shoring أو Sheet الركائز</td><td>المهندس الاعتماد</td></tr>
<tr><td>3.0m – 6.0m</td><td>الفولاذ / الحديد Sheet الركائز + Struts</td><td>Structural Calc مطلوب</td></tr>
<tr><td>&gt; 6.0m</td><td>Contiguous الركائز أو Diaphragm الجدار</td><td>Specialist Design</td></tr>
<tr><td>بجانب مبانٍ قائمة</td><td>Underpinning أو Sheet الركائز دائماً</td><td>محلل خاص</td></tr>
</table>
</div>
<div id="fe-step-4" style="display:none">
<h3>4️⃣ خفض المياه الجوفية — Dewatering</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>Dewatering الطريقة</td><td>Well Points أو Deep Wells حسب النفاذية</td></tr>
<tr><td>Level of Drawdown</td><td>0.5m أسفل Founding Level دائماً</td></tr>
<tr><td>Disposal</td><td>إلى Storm Drain أو Settling Tank (بعيداً عن العمل)</td></tr>
<tr><td>GWT Monitoring</td><td>Observation Wells أسبوعياً أثناء الحفر</td></tr>
<tr><td>الهبوط / الانضغاط Monitoring</td><td>للمباني المجاورة كل أسبوع</td></tr>
<tr><td>Sabkha</td><td>بروتوكول IAN-006 + معالجة قبل الأساس</td></tr>
</table>
</div>
<div id="fe-step-5" style="display:none">
<h3>5️⃣ 🔴 HP — Founding Level الاعتماد</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>النقطة</th></tr>
<tr><td>المسح والرفع المساحي Level</td><td>± 25mm من Founding Level المصمم</td><td>🔴 HP</td></tr>
<tr><td>قدرة تحمل التربة (Plate الحمل أو DCP)</td><td>≥ قدرة التحمل الآمنة المصمم</td><td>🔴 HP</td></tr>
<tr><td>Visual الفحص (جيوتقني)</td><td>نوع التربة مطابق للجسات</td><td>🔴 HP</td></tr>
<tr><td>Blinding الخرسانة (50mm C15)</td><td>بعد HP مباشرة — قبل تلوث التربة</td><td>W</td></tr>
<tr><td>العزل المائي (إن وجد)</td><td>قبل وضع الحديد</td><td>W</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;font-size:12px;margin-top:8px;">
🔴 <strong>نقطة توقف:</strong> لا يُسمح بوضع أي حديد أو صب قبل حصول HP sign-off من SC — QCS S5 P6
</div>
</div>
<div id="fe-step-6" style="display:none">
<h3>6️⃣ الردم — Backfilling</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>مكعب اختبار Results ≥ 70% fcu</td><td>قبل الردم حول الأساس</td></tr>
<tr><td>العزل المائي الفحص</td><td>HP قبل الردم</td></tr>
<tr><td>Layer السماكة</td><td>≤ 200mm (آلي) / ≤ 150mm (يدوي)</td></tr>
<tr><td>الدمك</td><td>≥ 95% الكثافة الجافة القصوى (MDD) — Nuclear Gauge أو Sand Replacement</td></tr>
<tr><td>1m حول الأساس</td><td>حصرياً Granular Fill — No Clay</td></tr>
<tr><td>Drainage Layer</td><td>500mm Granular بجانب الأساس (بيئة Aggressive)</td></tr>
</table>
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 6 + Section 1 Safety
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('fe',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ Planning</div>
  <div class="calc-tab" onclick="showExecStep('fe',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ Excavation</div>
  <div class="calc-tab" onclick="showExecStep('fe',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ Shoring</div>
  <div class="calc-tab" onclick="showExecStep('fe',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Dewatering</div>
  <div class="calc-tab" onclick="showExecStep('fe',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">5️⃣ Founding Level</div>
  <div class="calc-tab" onclick="showExecStep('fe',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">6️⃣ Backfill</div>
</div>

<div id="fe-step-1">
<h3>1️⃣ Planning and Preparation</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Utility locations</td><td>Check QNBN / Ashghal Utility Map + Trial Pits</td></tr>
<tr><td>Geotechnical Report</td><td>Review Soil Profile + GWT + Bearing Capacity</td></tr>
<tr><td>Method Statement</td><td>Approved by SC prior to commencement</td></tr>
<tr><td>Permit to Work</td><td>Trenches > 1.2m require Confined Space Permit</td></tr>
<tr><td>Setting Out</td><td>Survey Check: Grid Lines + Levels ± 10mm</td></tr>
</table>
</div>

<div id="fe-step-2" style="display:none">
<h3>2️⃣ Excavation</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th><th>QCS</th></tr>
<tr><td>Working Space</td><td>Minimum 600mm clear around foundation</td><td>S5 P6</td></tr>
<tr><td>Side Slope</td><td>1:1 (safe slope) if no shoring used</td><td>QCS S1 Safety</td></tr>
<tr><td>Barricade</td><td>1.5m from excavation edge</td><td>QCS S1</td></tr>
<tr><td>Emergency Access</td><td>Ladder every 7.5m minimum</td><td>OSHA</td></tr>
<tr><td>Plant adjacent to excavation</td><td>≥ 1.0m from excavation edge</td><td>QCS S1</td></tr>
<tr><td>Daily inspection</td><td>Competent Person inspection before entry</td><td>QCS S1</td></tr>
</table>
</div>

<div id="fe-step-3" style="display:none">
<h3>3️⃣ Shoring</h3>
<table class="dm-table">
<tr><th>Depth</th><th>Required Type</th><th>Requirement</th></tr>
<tr><td>< 1.2m</td><td>Not required (good soil)</td><td>Continuous monitoring</td></tr>
<tr><td>1.2m – 3.0m</td><td>Timber Shoring or Sheet Piles</td><td>Engineer Approval</td></tr>
<tr><td>3.0m – 6.0m</td><td>Steel Sheet Piles + Struts</td><td>Structural calculations required</td></tr>
<tr><td>> 6.0m</td><td>Contiguous Piles or Diaphragm Wall</td><td>Specialist Design</td></tr>
<tr><td>Adjacent to existing buildings</td><td>Underpinning or Sheet Piles always</td><td>Specialist analysis</td></tr>
</table>
</div>

<div id="fe-step-4" style="display:none">
<h3>4️⃣ Groundwater Dewatering</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Dewatering Method</td><td>Well Points or Deep Wells depending on permeability</td></tr>
<tr><td>Level of Drawdown</td><td>Maintain 0.5m below founding level at all times</td></tr>
<tr><td>Disposal</td><td>To Storm Drain or Settling Tank (away from works)</td></tr>
<tr><td>GWT Monitoring</td><td>Observation Wells weekly during excavation</td></tr>
<tr><td>Settlement Monitoring</td><td>Adjacent buildings — weekly monitoring</td></tr>
<tr><td>Sabkha</td><td>Protocol IAN-006 + treatment prior to foundation</td></tr>
</table>
</div>

<div id="fe-step-5" style="display:none">
<h3>5️⃣ 🔴 HP — Founding Level Approval</h3>
<table class="dm-table">
<tr><th>Test</th><th>Criterion</th><th>Control Point</th></tr>
<tr><td>Survey Level</td><td>± 25mm from design founding level</td><td>🔴 HP</td></tr>
<tr><td>Bearing Capacity (Plate Load or DCP)</td><td>≥ design Safe Bearing Capacity</td><td>🔴 HP</td></tr>
<tr><td>Visual Inspection (Geotechnical)</td><td>Soil type matches borehole records</td><td>🔴 HP</td></tr>
<tr><td>Blinding Concrete (50mm C15)</td><td>Immediately after HP — before soil contamination</td><td>W</td></tr>
<tr><td>Waterproofing (if applicable)</td><td>Before placing reinforcement</td><td>W</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;font-size:12px;margin-top:8px;">
🔴 <strong>Hold Point:</strong> No reinforcement or concrete shall be placed without HP sign-off from SC — QCS S5 P6
</div>
</div>

<div id="fe-step-6" style="display:none">
<h3>6️⃣ Backfilling</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Cube Results ≥ 70% fcu</td><td>Required before backfilling around foundation</td></tr>
<tr><td>Waterproofing Inspection</td><td>HP required before backfilling</td></tr>
<tr><td>Layer Thickness</td><td>≤ 200mm (mechanical) / ≤ 150mm (hand)</td></tr>
<tr><td>Compaction</td><td>≥ 95% MDD — Nuclear Gauge or Sand Replacement</td></tr>
<tr><td>1m zone around foundation</td><td>Granular Fill only — No Clay permitted</td></tr>
<tr><td>Drainage Layer</td><td>500mm Granular adjacent to foundation (aggressive environment)</td></tr>
</table>
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 5. exec_asphalt_paving — آلية فرد الإسفلت
// ═══════════════════════════════════════════════════════════════
c["exec_asphalt_paving"] = { title: '🛣️ آلية فرد الإسفلت — 4 خطوات', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 + Section 8 Part 5 | الإسفلت Paving
</div>
<div class="calc-tabs">
<div class="calc-tab active" onclick="showExecStep('ap',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">1️⃣ قبل الفرد</div>
<div class="calc-tab" onclick="showExecStep('ap',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">2️⃣ أثناء الفرد</div>
<div class="calc-tab" onclick="showExecStep('ap',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">3️⃣ الدمك</div>
<div class="calc-tab" onclick="showExecStep('ap',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">4️⃣ القبول</div>
</div>
<div id="ap-step-1">
<h3>1️⃣ قبل الفرد — قبل-Paving قائمة المراجعة</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>QCS</th></tr>
<tr><td>🔴 اعتماد صيغة الخلطة (صيغة الخلطة (JMF))</td><td>موافقة SC قبل أي إنتاج</td><td>S8 P5 Cl.5.3</td></tr>
<tr><td>Trial Section</td><td>إلزامي قبل الإنتاج الكامل</td><td>S8 P5 Cl.5.4</td></tr>
<tr><td>طبقة طبقة الالتصاق (Tack Coat)</td><td>0.15-0.35 L/m² Cationic Emulsion — مكسورة</td><td>S8 P5</td></tr>
<tr><td>نظافة السطح</td><td>خالٍ من الغبار، الماء، الوحل</td><td>S8 P5</td></tr>
<tr><td>درجة حرارة الجو</td><td>≥ 10°C — لا فرد في المطر</td><td>S8 P5</td></tr>
<tr><td>Plant Calibration</td><td>Batch Plant Calibration الشهادة حديث</td><td>S8 P5</td></tr>
<tr><td>Thermometers</td><td>شاشة على الـ Paver + Trucks</td><td>S8 P5</td></tr>
</table>
</div>
<div id="ap-step-2" style="display:none">
<h3>2️⃣ أثناء الفرد — أثناء Paving</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>الإجراء عند الخروج</th></tr>
<tr><td>درجة حرارة التسليم (DBM)</td><td>≥ 140°C — QCS 2024 S8</td><td>رفض الـ Truck</td></tr>
<tr><td>درجة حرارة التسليم (WC)</td><td>≥ 145°C — QCS 2024 S8</td><td>رفض الـ Truck</td></tr>
<tr><td>درجة حرارة عند الفرد</td><td>≥ 125°C (Conventional) / ≥ 140°C (PMB)</td><td>إيقاف الفرد</td></tr>
<tr><td>سماكة الفرد</td><td>الهدف ± 6mm (كل 100m²)</td><td>تعديل فوري</td></tr>
<tr><td>وقت النقل</td><td>≤ 60 دقيقة من المصنع</td><td>رفض الـ Truck</td></tr>
<tr><td>Screed درجة الحرارة</td><td>مسخّنة قبل الفرد</td><td>إلزامي</td></tr>
<tr><td>التسليم ملاحظة</td><td>صيغة الخلطة (JMF) Ref + Temp + الوقت ✓</td><td>رفض بدون DN</td></tr>
</table>
</div>
<div id="ap-step-3" style="display:none">
<h3>3️⃣ الدمك — الدمك</h3>
<table class="dm-table">
<tr><th>المرحلة</th><th>الـ Roller</th><th>درجة الحرارة</th><th>عدد المرور</th></tr>
<tr><td>ابتدائي (Breakdown)</td><td>الفولاذ / الحديد Drum 8-12 ton</td><td>130-145°C</td><td>2-3 مرات</td></tr>
<tr><td>وسطي</td><td>Pneumatic 16-20 ton</td><td>100-130°C</td><td>6-10 مرات</td></tr>
<tr><td>نهائي (أعمال الإنهاء)</td><td>الفولاذ / الحديد Drum بدون الهزة / الاهتزاز</td><td>60-80°C</td><td>2 مرات</td></tr>
</table>
<table class="dm-table" style="margin-top:10px">
<tr><th>معيار القبول</th><th>الحد</th><th>QCS</th></tr>
<tr><td>كثافة الأسطوانة المحفورة</td><td>≥ 97% الكثافة النظرية القصوى (TMD) (BC) / ≥ 97% (WC)</td><td>S8 P5</td></tr>
<tr><td>الفراغات الهوائية (Cores)</td><td>2-6% (BC) / 2-5% (WC)</td><td>S8 P5</td></tr>
<tr><td>Field الكثافة (NDG)</td><td>≥ 97% الكثافة النظرية القصوى (TMD)</td><td>S8 P5</td></tr>
</table>
</div>
<div id="ap-step-4" style="display:none">
<h3>4️⃣ اختبارات القبول — نهائي معيار القبول</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>مؤشر الخشونة الدولية (IRI) — International Roughness المؤشر</td><td>≤ 2.5 m/km (Conventional) / ≤ 0.9 m/km (PMB)</td><td>100% Lane km</td></tr>
<tr><td>مقاومة الانزلاق (SFC)</td><td>≥ 55 (WC) بعد 6 أشهر</td><td>Spot Check</td></tr>
<tr><td>الميل العرضي</td><td>2.5% ± 0.3% — QCS 2024 S6</td><td>كل 25m</td></tr>
<tr><td>3m Straightedge</td><td>≤ 4mm تحت الـ Edge</td><td>كل 50m</td></tr>
<tr><td>السماكة (Cores)</td><td>Mean ≥ الهدف-3mm | No الأسطوانة المحفورة (Core) &lt; الهدف-6mm</td><td>كل 1000m²</td></tr>
<tr><td>صلابة مارشال</td><td>≥ 8.0 kN (Conventional) / ≥ 10.0 kN (PMB)</td><td>من كل Truck</td></tr>
</table>
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 + Section 8 Part 5 | Asphalt Paving
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('ap',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ Pre-Paving</div>
  <div class="calc-tab" onclick="showExecStep('ap',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ During Paving</div>
  <div class="calc-tab" onclick="showExecStep('ap',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ Compaction</div>
  <div class="calc-tab" onclick="showExecStep('ap',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Acceptance</div>
</div>

<div id="ap-step-1">
<h3>1️⃣ Pre-Paving Checklist</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th><th>QCS</th></tr>
<tr><td>🔴 JMF Approval</td><td>SC approval required before any production</td><td>S8 P5 Cl.5.3</td></tr>
<tr><td>Trial Section</td><td>Mandatory before full-scale production</td><td>S8 P5 Cl.5.4</td></tr>
<tr><td>Tack Coat</td><td>0.15–0.35 L/m² Cationic Emulsion — broken</td><td>S8 P5</td></tr>
<tr><td>Surface Cleanliness</td><td>Free from dust, water, mud</td><td>S8 P5</td></tr>
<tr><td>Ambient Temperature</td><td>≥ 10°C — no paving in rain</td><td>S8 P5</td></tr>
<tr><td>Plant Calibration</td><td>Current Batch Plant Calibration Certificate</td><td>S8 P5</td></tr>
<tr><td>Thermometers</td><td>Fitted on paver + trucks</td><td>S8 P5</td></tr>
</table>
</div>

<div id="ap-step-2" style="display:none">
<h3>2️⃣ During Paving</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th><th>Action on Non-compliance</th></tr>
<tr><td>Delivery Temperature (DBM)</td><td>≥ 140°C — QCS 2024 S8</td><td>Reject truck</td></tr>
<tr><td>Delivery Temperature (WC)</td><td>≥ 145°C — QCS 2024 S8</td><td>Reject truck</td></tr>
<tr><td>Laying Temperature</td><td>≥ 125°C (Conventional) / ≥ 140°C (PMB)</td><td>Stop paving</td></tr>
<tr><td>Laid thickness</td><td>Target ± 6mm (per 100m²)</td><td>Immediate adjustment</td></tr>
<tr><td>Transport time</td><td>≤ 60 minutes from plant</td><td>Reject truck</td></tr>
<tr><td>Screed Temperature</td><td>Pre-heated before paving</td><td>Mandatory</td></tr>
<tr><td>Delivery Note</td><td>JMF Ref + Temp + Time ✓</td><td>Reject without DN</td></tr>
</table>
</div>

<div id="ap-step-3" style="display:none">
<h3>3️⃣ Compaction</h3>
<table class="dm-table">
<tr><th>Stage</th><th>Roller</th><th>Temperature</th><th>Passes</th></tr>
<tr><td>Initial (Breakdown)</td><td>Steel Drum 8–12 tonne</td><td>130–145°C</td><td>2–3 passes</td></tr>
<tr><td>Intermediate</td><td>Pneumatic 16–20 tonne</td><td>100–130°C</td><td>6–10 passes</td></tr>
<tr><td>Final (Finishing)</td><td>Steel Drum — no vibration</td><td>60–80°C</td><td>2 passes</td></tr>
</table>
<table class="dm-table" style="margin-top:10px">
<tr><th>Acceptance Criterion</th><th>Limit</th><th>QCS</th></tr>
<tr><td>Core Density</td><td>≥ 97% TMD (BC) / ≥ 97% (WC)</td><td>S8 P5</td></tr>
<tr><td>Air Voids (Cores)</td><td>2–6% (BC) / 2–5% (WC)</td><td>S8 P5</td></tr>
<tr><td>Field Density (NDG)</td><td>≥ 97% TMD</td><td>S8 P5</td></tr>
</table>
</div>

<div id="ap-step-4" style="display:none">
<h3>4️⃣ Final Acceptance Tests</h3>
<table class="dm-table">
<tr><th>Test</th><th>Criterion</th><th>Frequency</th></tr>
<tr><td>IRI — International Roughness Index</td><td>≤ 2.5 m/km (Conventional) / ≤ 0.9 m/km (PMB)</td><td>100% lane km</td></tr>
<tr><td>Skid Resistance (SFC)</td><td>≥ 55 (WC) after 6 months</td><td>Spot check</td></tr>
<tr><td>Crossfall</td><td>2.5% ± 0.3% — QCS 2024 S6</td><td>Every 25m</td></tr>
<tr><td>3m Straightedge</td><td>≤ 4mm under edge</td><td>Every 50m</td></tr>
<tr><td>Thickness (Cores)</td><td>Mean ≥ Target−3mm | No core < Target−6mm</td><td>Every 1000m²</td></tr>
<tr><td>Marshall Stability</td><td>≥ 8.0 kN (Conventional) / ≥ 10.0 kN (PMB)</td><td>Per truck</td></tr>
</table>
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 6. exec_water_pipe — آلية مد المواسير
// ═══════════════════════════════════════════════════════════════
c["exec_water_pipe"] = { title: '💧 آلية مد مواسير المياه — 7 خطوات', content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 20 + KAHRAMAA WR Standards
</div>
<div class="calc-tabs">
<div class="calc-tab active" onclick="showExecStep('wp',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">1️⃣ الحفر</div>
<div class="calc-tab" onclick="showExecStep('wp',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">2️⃣ الفراش</div>
<div class="calc-tab" onclick="showExecStep('wp',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">3️⃣ المد</div>
<div class="calc-tab" onclick="showExecStep('wp',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">4️⃣ الوصلات</div>
<div class="calc-tab" onclick="showExecStep('wp',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">5️⃣ 🔴 HP قبل الردم</div>
<div class="calc-tab" onclick="showExecStep('wp',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">6️⃣ الضغط الاختبار</div>
<div class="calc-tab" onclick="showExecStep('wp',7);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=&gt;t.classList.remove('active'));this.classList.add('active')">7️⃣ الكلور التعقيمي</div>
</div>
<div id="wp-step-1">
<h3>1️⃣ الحفر والتقطيع</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>عرض الخندق</td><td>DN + 600mm (min. 300mm كل جانب)</td></tr>
<tr><td>عمق الدفن (مياه شرب)</td><td>≥ 1.2m من السطح إلى أعلى الماسورة</td></tr>
<tr><td>الفصل عن Sewer</td><td>≥ 300mm أفقياً / 500mm رأسياً</td></tr>
<tr><td>Dewatering</td><td>الخندق جاف تماماً قبل الفراش</td></tr>
<tr><td>Marker Tape</td><td>أزرق — KAHRAMAA Official — 300mm فوق الماسورة</td></tr>
</table>
</div>
<div id="wp-step-2" style="display:none">
<h3>2️⃣ فراش الماسورة — فرشة الأنبوب</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>KAHRAMAA</th></tr>
<tr><td>مادة الفراش</td><td>Granular ≤ 10mm (Sand/الناعم Gravel)</td><td>✓</td></tr>
<tr><td>سماكة الفراش</td><td>150mm أسفل الماسورة</td><td>✓</td></tr>
<tr><td>الدمك</td><td>≥ 90% الكثافة الجافة القصوى (MDD) بجانب الماسورة</td><td>✓</td></tr>
<tr><td>حول الماسورة</td><td>Granular حتى 300mm فوق أعلى الماسورة</td><td>✓</td></tr>
<tr><td>فوق 300mm</td><td>معتمد Fill بطبقات 150mm</td><td>✓</td></tr>
</table>
</div>
<div id="wp-step-3" style="display:none">
<h3>3️⃣ مد المواسير — الأنبوب التمديد / الفرش</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>الاتجاه</td><td>من المنبع للمصب (في الانحدار)</td></tr>
<tr><td>Level المسموح به</td><td>± 10mm من مستوى التصميم</td></tr>
<tr><td>Alignment</td><td>± 25mm من الخط المحدد</td></tr>
<tr><td>Bell End</td><td>يتجه لاتجاه المد دائماً</td></tr>
<tr><td>نظافة الماسورة</td><td>فحص الداخل قبل الوصل — خالٍ من التراب</td></tr>
<tr><td>HDPE (البولي إيثيلين عالي الكثافة) المادة</td><td>PE100 PN16 كحد أدنى (KAHRAMAA)</td></tr>
</table>
</div>
<div id="wp-step-4" style="display:none">
<h3>4️⃣ الوصلات — Jointing</h3>
<table class="dm-table">
<tr><th>النوع</th><th>الطريقة</th><th>الاشتراط</th></tr>
<tr><td>HDPE (البولي إيثيلين عالي الكثافة) Butt Fusion</td><td>درجة حرارة 220-230°C</td><td>Bead ثنائي ومتماثل</td></tr>
<tr><td>HDPE (البولي إيثيلين عالي الكثافة) اللحام بالكهرباء</td><td>يحدده الـ Controller تلقائياً</td><td>الشهادة مطبوع</td></tr>
<tr><td>الحديد الزهر المطيل (DI) Mechanical الوصلة</td><td>Rubber Ring + Bolts بعزم موحد</td><td>Deflection ≤ 3°</td></tr>
<tr><td>Fusion Log</td><td>بيانات كل وصلة محفوظة</td><td>إلزامي KAHRAMAA</td></tr>
<tr><td>Thrust Blocks</td><td>عند كل منحنى &gt; 11.25° + Tees + End Caps</td><td>حساب حجم الـ Block</td></tr>
</table>
</div>
<div id="wp-step-5" style="display:none">
<h3>5️⃣ 🔴 نقطة توقف — قبل الردم</h3>
<table class="dm-table">
<tr><th>الفحص</th><th>المعيار</th><th>النقطة</th></tr>
<tr><td>الوصلة الفحص 100%</td><td>Bead / Fusion Log / Rubber Ring ✓</td><td>🔴 HP</td></tr>
<tr><td>Level المسح والرفع المساحي</td><td>كل وصلة ± 10mm</td><td>🔴 HP</td></tr>
<tr><td>Alignment Check</td><td>± 25mm من Centre Line</td><td>🔴 HP</td></tr>
<tr><td>Marker Tape</td><td>300mm فوق الماسورة — اللون الصحيح</td><td>🔴 HP</td></tr>
<tr><td>Thrust Blocks Cured</td><td>48 ساعة على الأقل (C15)</td><td>W</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;font-size:12px;margin-top:8px;">
🔴 <strong>لا ردم قبل توقيع طلب المعلومات (RFI)!</strong> — أي ردم قبل HP = تقرير عدم المطابقة (NCR) فوري — KAHRAMAA المعيار
</div>
</div>
<div id="wp-step-6" style="display:none">
<h3>6️⃣ اختبار الضغط — الضغط الاختبار</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>ضغط الاختبار</td><td>1.5 × الضغط الاسمي (PN) التصميمي</td></tr>
<tr><td>مدة الاختبار</td><td>2 ساعة على الأقل</td></tr>
<tr><td>الهبوط المسموح</td><td>≤ 0.02 bar / ساعة (مياه شرب)</td></tr>
<tr><td>فحص الوصلات</td><td>بصرياً أثناء الضغط — لا تسريب</td></tr>
<tr><td>ناجح المعايير</td><td>≥ 1.5×الضغط الاسمي (PN) لمدة 2hr بدون هبوط &gt; 0.02 bar</td></tr>
<tr><td>توقيت الاختبار</td><td>قبل التعقيم وبعد Thrust Blocks ≥ 48hr</td></tr>
</table>
</div>
<div id="wp-step-7" style="display:none">
<h3>7️⃣ التعقيم — الكلور التعقيمي</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>تركيز الكلور</td><td>20-50 mg/L (20 ppm) لمدة 24 ساعة</td></tr>
<tr><td>Flush قبل التعقيم</td><td>سرعة ≥ 0.75 m/s حتى يصفو الماء</td></tr>
<tr><td>Dwell الوقت</td><td>24 ساعة — تركيز Residual ≥ 0.2 ppm</td></tr>
<tr><td>Flush بعد التعقيم</td><td>حتى Cl₂ ≤ 0.5 mg/L</td></tr>
<tr><td>عينة بكتيرية</td><td>Coliform = 0/100ml | Turbidity ≤ 1 NTU</td></tr>
<tr><td>نتيجة المختبر</td><td>معتمد KAHRAMAA — 3 أيام</td></tr>
</table>
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 20 + KAHRAMAA WR Standards
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('wp',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ Excavation</div>
  <div class="calc-tab" onclick="showExecStep('wp',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ Bedding</div>
  <div class="calc-tab" onclick="showExecStep('wp',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ Laying</div>
  <div class="calc-tab" onclick="showExecStep('wp',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Jointing</div>
  <div class="calc-tab" onclick="showExecStep('wp',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">5️⃣ 🔴 HP Pre-Backfill</div>
  <div class="calc-tab" onclick="showExecStep('wp',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">6️⃣ Pressure Test</div>
  <div class="calc-tab" onclick="showExecStep('wp',7);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">7️⃣ Chlorination</div>
</div>

<div id="wp-step-1">
<h3>1️⃣ Trench Excavation</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Trench width</td><td>DN + 600mm (min. 300mm each side)</td></tr>
<tr><td>Burial depth (potable water)</td><td>≥ 1.2m from surface to top of pipe</td></tr>
<tr><td>Separation from sewer</td><td>≥ 300mm horizontal / 500mm vertical</td></tr>
<tr><td>Dewatering</td><td>Trench completely dry before bedding</td></tr>
<tr><td>Marker Tape</td><td>Blue — KAHRAMAA Official — 300mm above pipe</td></tr>
</table>
</div>

<div id="wp-step-2" style="display:none">
<h3>2️⃣ Pipe Bedding</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th><th>KAHRAMAA</th></tr>
<tr><td>Bedding material</td><td>Granular ≤ 10mm (Sand/Fine Gravel)</td><td>✓</td></tr>
<tr><td>Bedding thickness</td><td>150mm below pipe invert</td><td>✓</td></tr>
<tr><td>Compaction</td><td>≥ 90% MDD alongside pipe</td><td>✓</td></tr>
<tr><td>Around pipe</td><td>Granular to 300mm above pipe crown</td><td>✓</td></tr>
<tr><td>Above 300mm</td><td>Approved Fill in 150mm layers</td><td>✓</td></tr>
</table>
</div>

<div id="wp-step-3" style="display:none">
<h3>3️⃣ Pipe Laying</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Direction</td><td>Upstream to downstream (downhill)</td></tr>
<tr><td>Level Tolerance</td><td>± 10mm from design level</td></tr>
<tr><td>Alignment</td><td>± 25mm from centre line</td></tr>
<tr><td>Bell End</td><td>Always face direction of laying</td></tr>
<tr><td>Pipe cleanliness</td><td>Inspect bore before jointing — free of debris</td></tr>
<tr><td>HDPE Material</td><td>PE100 PN16 minimum (KAHRAMAA)</td></tr>
</table>
</div>

<div id="wp-step-4" style="display:none">
<h3>4️⃣ Jointing</h3>
<table class="dm-table">
<tr><th>Type</th><th>Method</th><th>Requirement</th></tr>
<tr><td>HDPE Butt Fusion</td><td>Temperature 220–230°C</td><td>Double symmetric bead</td></tr>
<tr><td>HDPE Electrofusion</td><td>Automatically controlled by controller unit</td><td>Printed certificate required</td></tr>
<tr><td>DI Mechanical Joint</td><td>Rubber Ring + Bolts at uniform torque</td><td>Deflection ≤ 3°</td></tr>
<tr><td>Fusion Log</td><td>Data recorded for every joint</td><td>Mandatory — KAHRAMAA</td></tr>
<tr><td>Thrust Blocks</td><td>At all bends > 11.25° + Tees + End Caps</td><td>Block volume to be calculated</td></tr>
</table>
</div>

<div id="wp-step-5" style="display:none">
<h3>5️⃣ 🔴 Hold Point — Prior to Backfilling</h3>
<table class="dm-table">
<tr><th>Inspection</th><th>Criterion</th><th>Control Point</th></tr>
<tr><td>Joint Inspection 100%</td><td>Bead / Fusion Log / Rubber Ring ✓</td><td>🔴 HP</td></tr>
<tr><td>Level Survey</td><td>Every joint ± 10mm</td><td>🔴 HP</td></tr>
<tr><td>Alignment Check</td><td>± 25mm from Centre Line</td><td>🔴 HP</td></tr>
<tr><td>Marker Tape</td><td>300mm above pipe — correct colour</td><td>🔴 HP</td></tr>
<tr><td>Thrust Blocks Cured</td><td>Minimum 48 hours (C15)</td><td>W</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;font-size:12px;margin-top:8px;">
🔴 <strong>No backfilling before RFI sign-off!</strong> — Any backfill before HP = Immediate NCR — KAHRAMAA Standard
</div>
</div>

<div id="wp-step-6" style="display:none">
<h3>6️⃣ Pressure Testing</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Test Pressure</td><td>1.5 × design PN</td></tr>
<tr><td>Test Duration</td><td>Minimum 2 hours</td></tr>
<tr><td>Allowable pressure drop</td><td>≤ 0.02 bar / hour (potable water)</td></tr>
<tr><td>Joint inspection</td><td>Visual check during test — no leakage</td></tr>
<tr><td>Pass Criteria</td><td>≥ 1.5×PN for 2hr with no drop > 0.02 bar</td></tr>
<tr><td>Test timing</td><td>Before disinfection and after Thrust Blocks ≥ 48hr</td></tr>
</table>
</div>

<div id="wp-step-7" style="display:none">
<h3>7️⃣ Chlorination / Disinfection</h3>
<table class="dm-table">
<tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Chlorine concentration</td><td>20–50 mg/L (20 ppm) for 24 hours</td></tr>
<tr><td>Pre-disinfection flush</td><td>Velocity ≥ 0.75 m/s until water runs clear</td></tr>
<tr><td>Dwell Time</td><td>24 hours — residual concentration ≥ 0.2 ppm</td></tr>
<tr><td>Post-disinfection flush</td><td>Until Cl₂ ≤ 0.5 mg/L</td></tr>
<tr><td>Bacteriological sample</td><td>Coliform = 0/100ml | Turbidity ≤ 1 NTU</td></tr>
<tr><td>Laboratory result</td><td>KAHRAMAA-approved lab — 3 days</td></tr>
</table>
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 7. concrete_quick_ref — مرجع سريع للخرسانة
// ═══════════════════════════════════════════════════════════════
c["concrete_quick_ref"] = { title: '🧱 مرجع درجات الخرسانة السريع — QCS 2024', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
<div class="ref-header" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;padding:10px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;">
<span class="ref-badge" style="background:rgba(201,168,76,0.2);color:var(--gold);border:1px solid rgba(201,168,76,0.4);border-radius:6px;padding:3px 10px;font-size:11px;font-weight:700;">QCS 2024 §S5-P4</span>
<span class="ref-section" style="color:var(--text2);font-size:12px;">BS EN 12350 | BS EN 12390 | BS 8500 | ACI 318</span>
<span class="ref-updated" style="margin-left:auto;color:var(--text3);font-size:11px;">آخر تحديث: 2024</span>
</div>

📌 QCS 2024 — Section 5 Part 4 Table 4:1 + Table 4:2
</div>
<h3>📊 جدول الدرجات والاستخدامات — الدرجة Selection Table</h3>
<table class="dm-table">
<tr><th>العنصر</th><th>الدرجة min</th><th>الغطاء الخرساني min</th><th>الإسمنت</th><th>w/c max</th></tr>
<tr><td>Blinding</td><td>C15</td><td>—</td><td>OPC</td><td>0.70</td></tr>
<tr><td>ردم الخرسانة</td><td>C20</td><td>—</td><td>OPC</td><td>0.65</td></tr>
<tr><td>أساسات (تربة عادية)</td><td>C35</td><td>75mm</td><td>OPC/SRPC</td><td>0.45</td></tr>
<tr><td>أساسات (SO₃ &gt; 0.5%)</td><td>C40</td><td>75mm</td><td>SRPC+GGBS</td><td>0.40</td></tr>
<tr><td>أعمدة خارجية</td><td>C35</td><td>40mm</td><td>OPC/SRPC</td><td>0.45</td></tr>
<tr><td>بلاطات خارجية</td><td>C35</td><td>30mm</td><td>OPC</td><td>0.50</td></tr>
<tr><td>بلاطات داخلية</td><td>C25</td><td>20mm</td><td>OPC</td><td>0.55</td></tr>
<tr><td>جدران استنادية</td><td>C35</td><td>40mm</td><td>SRPC</td><td>0.45</td></tr>
<tr><td>خوازيق (قطر)</td><td>C40</td><td>75mm</td><td>SRPC+GGBS</td><td>0.40</td></tr>
<tr><td>Precast Elements</td><td>C40</td><td>30-40mm</td><td>OPC/SRC</td><td>0.40</td></tr>
</table>
<h3>🌡️ إجراءات الجو الحار — Hot Weather Protocol</h3>
<table class="dm-table">
<tr><th>الجو °C</th><th>الإجراء الإلزامي</th><th>الخرسانة Temp الحد الأقصى</th></tr>
<tr><td>30-35°C</td><td>تبريد الركام + مياه باردة</td><td>≤ 32°C</td></tr>
<tr><td>35-40°C</td><td>+ ثلج (30 kg/m³) + تبريد الـ Mixer</td><td>≤ 32°C</td></tr>
<tr><td>&gt; 40°C</td><td>صب ليلي فقط أو وقف الصب</td><td>≤ 32°C</td></tr>
</table>
<h3>🧪 جدول الاختبارات</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>التكرار</th><th>معيار القبول</th><th>QCS</th></tr>
<tr><td>الهبوط (Slump) الاختبار</td><td>كل Truck</td><td>الهدف ± 25mm</td><td>S5 P4</td></tr>
<tr><td>درجة الحرارة</td><td>كل Truck</td><td>≤ 32°C عند الصب</td><td>S5 P4</td></tr>
<tr><td>Cubes (7-day)</td><td>6 مكعبات / 50m³</td><td>للمراقبة فقط — ليس للقبول</td><td>S5 P4</td></tr>
<tr><td>Cubes (28-day)</td><td>6 مكعبات / 50m³</td><td>≥ fcu (القبول الرسمي)</td><td>S5 P4</td></tr>
<tr><td>الأسطوانة المحفورة (Core) الاختبار</td><td>عند الشك</td><td>≥ 0.85×fcu</td><td>S5 P4</td></tr>
</table>
<h3>💡 قواعد القبول الرسمية</h3>
<div style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:12px;font-size:12px;line-height:1.9;">
✅ <strong>قبول:</strong> الوسط التراكمي (Mean) ≥ fcu + 3 MPa لكل 40 نتيجة<br/>
✅ <strong>قبول فردي:</strong> لا نتيجة &lt; fcu - 3 MPa (C≤25) أو &lt; fcu - 4 MPa (C≥30)<br/>
🔴 <strong>رفض:</strong> 3 نتائج متتالية &lt; fcu → تقرير عدم المطابقة (NCR) + الأسطوانة المحفورة (Core) الاختبار فوري<br/>
⚠️ <strong>7-day:</strong> للمراقبة فقط — القبول الرسمي 28-day حصراً — QCS S5 P4
</div>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
<div class="ref-header" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;padding:10px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;">
  <span class="ref-badge" style="background:rgba(201,168,76,0.2);color:var(--gold);border:1px solid rgba(201,168,76,0.4);border-radius:6px;padding:3px 10px;font-size:11px;font-weight:700;">QCS 2024 §S5-P4</span>
  <span class="ref-section" style="color:var(--text2);font-size:12px;">BS EN 12350 | BS EN 12390 | BS 8500 | ACI 318</span>
  <span class="ref-updated" style="margin-left:auto;color:var(--text3);font-size:11px;">Last updated: 2024</span>
</div>
📌 QCS 2024 — Section 5 Part 4 Table 4:1 + Table 4:2
</div>

<h3>📊 Concrete Grade Selection Table</h3>
<table class="dm-table">
<tr><th>Element</th><th>Min Grade</th><th>Min Cover</th><th>Cement Type</th><th>Max w/c</th></tr>
<tr><td>Blinding</td><td>C15</td><td>—</td><td>OPC</td><td>0.70</td></tr>
<tr><td>Mass Concrete Fill</td><td>C20</td><td>—</td><td>OPC</td><td>0.65</td></tr>
<tr><td>Foundations (normal soil)</td><td>C35</td><td>75mm</td><td>OPC/SRPC</td><td>0.45</td></tr>
<tr><td>Foundations (SO₃ > 0.5%)</td><td>C40</td><td>75mm</td><td>SRPC+GGBS</td><td>0.40</td></tr>
<tr><td>External columns</td><td>C35</td><td>40mm</td><td>OPC/SRPC</td><td>0.45</td></tr>
<tr><td>External slabs</td><td>C35</td><td>30mm</td><td>OPC</td><td>0.50</td></tr>
<tr><td>Internal slabs</td><td>C25</td><td>20mm</td><td>OPC</td><td>0.55</td></tr>
<tr><td>Retaining walls</td><td>C35</td><td>40mm</td><td>SRPC</td><td>0.45</td></tr>
<tr><td>Piles (Qatar)</td><td>C40</td><td>75mm</td><td>SRPC+GGBS</td><td>0.40</td></tr>
<tr><td>Precast Elements</td><td>C40</td><td>30–40mm</td><td>OPC/SRC</td><td>0.40</td></tr>
</table>

<h3>🌡️ Hot Weather Concreting Protocol</h3>
<table class="dm-table">
<tr><th>Ambient Temp °C</th><th>Mandatory Measures</th><th>Max Concrete Temp</th></tr>
<tr><td>30–35°C</td><td>Cool aggregates + chilled water</td><td>≤ 32°C</td></tr>
<tr><td>35–40°C</td><td>+ Ice (30 kg/m³) + chilled mixer</td><td>≤ 32°C</td></tr>
<tr><td>> 40°C</td><td>Night pours only or suspend concreting</td><td>≤ 32°C</td></tr>
</table>

<h3>🧪 Testing Schedule</h3>
<table class="dm-table">
<tr><th>Test</th><th>Frequency</th><th>Acceptance Criterion</th><th>QCS</th></tr>
<tr><td>Slump Test</td><td>Every truck</td><td>Target ± 25mm</td><td>S5 P4</td></tr>
<tr><td>Temperature</td><td>Every truck</td><td>≤ 32°C at point of placement</td><td>S5 P4</td></tr>
<tr><td>Cubes (7-day)</td><td>6 cubes / 50m³</td><td>Monitoring only — not for acceptance</td><td>S5 P4</td></tr>
<tr><td>Cubes (28-day)</td><td>6 cubes / 50m³</td><td>≥ fcu (formal acceptance)</td><td>S5 P4</td></tr>
<tr><td>Core Test</td><td>When in doubt</td><td>≥ 0.85×fcu</td><td>S5 P4</td></tr>
</table>

<h3>💡 Formal Acceptance Rules</h3>
<div style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:12px;font-size:12px;line-height:1.9;">
✅ <strong>Accept:</strong> Cumulative mean ≥ fcu + 3 MPa for every 40 results<br>
✅ <strong>Individual acceptance:</strong> No result < fcu − 3 MPa (C≤25) or < fcu − 4 MPa (C≥30)<br>
🔴 <strong>Reject:</strong> 3 consecutive results < fcu → NCR + immediate Core Testing<br>
⚠️ <strong>7-day results:</strong> Monitoring purposes only — formal acceptance is 28-day exclusively — QCS S5 P4
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 8. asphalt_quick_ref — مرجع سريع للإسفلت
// ═══════════════════════════════════════════════════════════════
c["asphalt_quick_ref"] = { title: '🛣️ مرجع طبقات الإسفلت السريع — QCS 2024', content: `
<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 P3 Table 3:1 + Section 8 Part 5
</div>
<h3>📊 سماكات الطبقات حسب تصنيف الطريق</h3>
<table class="dm-table">
<tr><th>Traffic الصف / الفئة</th><th>ESAL (مليون)</th><th>WC</th><th>BC</th><th>Base</th><th>طبقة الإسفلت الأساسية (Subbase)</th></tr>
<tr><td>T1 (خفيف جداً)</td><td>&lt; 0.3</td><td>50mm</td><td>—</td><td>150mm</td><td>150mm</td></tr>
<tr><td>T2 (خفيف)</td><td>0.3 – 1</td><td>50mm</td><td>60mm</td><td>150mm</td><td>200mm</td></tr>
<tr><td>T3 (متوسط)</td><td>1 – 3</td><td>50mm</td><td>70mm</td><td>200mm</td><td>200mm</td></tr>
<tr><td>T4 (ثقيل)</td><td>3 – 10</td><td>50mm</td><td>80mm</td><td>200mm</td><td>250mm</td></tr>
<tr><td>T5 (ثقيل جداً)</td><td>10 – 30</td><td>50mm</td><td>2×70mm</td><td>200mm</td><td>300mm</td></tr>
<tr><td>T6 (شديد الثقل)</td><td>&gt; 30</td><td>50mm</td><td>2×80mm</td><td>250mm</td><td>350mm</td></tr>
</table>
<h3>🌡️ درجات الحرارة المعيارية</h3>
<table class="dm-table">
<tr><th>المرحلة</th><th>Conventional 60/70</th><th>PMB</th><th>QCS Ref</th></tr>
<tr><td>Mixing Temp (Plant)</td><td>155-165°C</td><td>165-175°C</td><td>S8 P5 Cl.5.5</td></tr>
<tr><td>التسليم to Site (DBM)</td><td>≥ 140°C</td><td>≥ 150°C</td><td>QCS 2024 S8</td></tr>
<tr><td>التسليم to Site (WC)</td><td>≥ 145°C</td><td>≥ 155°C</td><td>QCS 2024 S8</td></tr>
<tr><td>التمديد / الفرش Temp</td><td>≥ 125°C</td><td>≥ 140°C</td><td>S8 P5</td></tr>
<tr><td>Roller Start (Breakdown)</td><td>≥ 130°C</td><td>≥ 145°C</td><td>S8 P5</td></tr>
<tr><td>Roller Stop (نهائي)</td><td>60-80°C</td><td>70-90°C</td><td>S8 P5</td></tr>
</table>
<h3>🧪 معايير القبول — ناجح/فاشل</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>BC (Binder)</th><th>WC (Wearing)</th><th>QCS</th></tr>
<tr><td>صلابة مارشال</td><td>≥ 8.0 kN (Conv) / ≥ 10.0 kN (PMB)</td><td>= BC</td><td>S8 P5</td></tr>
<tr><td>Marshall التدفق</td><td>2-4 mm</td><td>2-4 mm</td><td>S8 P5</td></tr>
<tr><td>الفراغات الهوائية (الخلطة)</td><td>3-5%</td><td>3-5%</td><td>S8 P5</td></tr>
<tr><td>VMA</td><td>≥ 14%</td><td>≥ 15%</td><td>S8 P5</td></tr>
<tr><td>كثافة الأسطوانة المحفورة</td><td>≥ 97% الكثافة النظرية القصوى (TMD)</td><td>≥ 97% الكثافة النظرية القصوى (TMD)</td><td>S8 P5</td></tr>
<tr><td>مؤشر الخشونة الدولية (IRI) (بعد الانتهاء)</td><td>—</td><td>≤ 2.5 m/km (Conv) / ≤ 0.9 (PMB)</td><td>S8 P5</td></tr>
<tr><td>الميل العرضي</td><td>—</td><td>2.5% ± 0.3%</td><td>QCS 2024 S6</td></tr>
</table>
<h3>🎯 نسب الـ طبقة الالتصاق (Tack Coat)</h3>
<table class="dm-table">
<tr><th>السطح</th><th>النسبة (L/m²)</th><th>نوع المستحلب</th></tr>
<tr><td>Granular Base → الإسفلت</td><td>0.8 – 1.2 (الطلاء التمهيدي (Prime Coat))</td><td>MC-30 أو MC-70</td></tr>
<tr><td>الإسفلت → الإسفلت</td><td>0.15 – 0.35 (طبقة الالتصاق (Tack Coat))</td><td>Cationic SS-1 أو K1-60</td></tr>
<tr><td>Milled Surface</td><td>0.25 – 0.45</td><td>Cationic</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 P3 Table 3:1 + Section 8 Part 5
</div>

<h3>📊 Pavement Layer Thicknesses by Road Classification</h3>
<table class="dm-table">
<tr><th>Traffic Class</th><th>ESAL (million)</th><th>WC</th><th>BC</th><th>Base</th><th>Subbase</th></tr>
<tr><td>T1 (Very Light)</td><td>&lt; 0.3</td><td>50mm</td><td>—</td><td>150mm</td><td>150mm</td></tr>
<tr><td>T2 (Light)</td><td>0.3 – 1</td><td>50mm</td><td>60mm</td><td>150mm</td><td>200mm</td></tr>
<tr><td>T3 (Medium)</td><td>1 – 3</td><td>50mm</td><td>70mm</td><td>200mm</td><td>200mm</td></tr>
<tr><td>T4 (Heavy)</td><td>3 – 10</td><td>50mm</td><td>80mm</td><td>200mm</td><td>250mm</td></tr>
<tr><td>T5 (Very Heavy)</td><td>10 – 30</td><td>50mm</td><td>2×70mm</td><td>200mm</td><td>300mm</td></tr>
<tr><td>T6 (Extreme Heavy)</td><td>&gt; 30</td><td>50mm</td><td>2×80mm</td><td>250mm</td><td>350mm</td></tr>
</table>

<h3>🌡️ Standard Temperature Requirements</h3>
<table class="dm-table">
<tr><th>Stage</th><th>Conventional 60/70</th><th>PMB</th><th>QCS Ref</th></tr>
<tr><td>Mixing Temp (Plant)</td><td>155–165°C</td><td>165–175°C</td><td>S8 P5 Cl.5.5</td></tr>
<tr><td>Delivery to Site (DBM)</td><td>≥ 140°C</td><td>≥ 150°C</td><td>QCS 2024 S8</td></tr>
<tr><td>Delivery to Site (WC)</td><td>≥ 145°C</td><td>≥ 155°C</td><td>QCS 2024 S8</td></tr>
<tr><td>Laying Temperature</td><td>≥ 125°C</td><td>≥ 140°C</td><td>S8 P5</td></tr>
<tr><td>Roller Start (Breakdown)</td><td>≥ 130°C</td><td>≥ 145°C</td><td>S8 P5</td></tr>
<tr><td>Roller Stop (Final)</td><td>60–80°C</td><td>70–90°C</td><td>S8 P5</td></tr>
</table>

<h3>🧪 Acceptance Criteria — Pass/Fail</h3>
<table class="dm-table">
<tr><th>Test</th><th>BC (Binder Course)</th><th>WC (Wearing Course)</th><th>QCS</th></tr>
<tr><td>Marshall Stability</td><td>≥ 8.0 kN (Conv) / ≥ 10.0 kN (PMB)</td><td>= BC</td><td>S8 P5</td></tr>
<tr><td>Marshall Flow</td><td>2–4 mm</td><td>2–4 mm</td><td>S8 P5</td></tr>
<tr><td>Air Voids (Mix)</td><td>3–5%</td><td>3–5%</td><td>S8 P5</td></tr>
<tr><td>VMA</td><td>≥ 14%</td><td>≥ 15%</td><td>S8 P5</td></tr>
<tr><td>Core Density</td><td>≥ 97% TMD</td><td>≥ 97% TMD</td><td>S8 P5</td></tr>
<tr><td>IRI (post completion)</td><td>—</td><td>≤ 2.5 m/km (Conv) / ≤ 0.9 (PMB)</td><td>S8 P5</td></tr>
<tr><td>Crossfall</td><td>—</td><td>2.5% ± 0.3%</td><td>QCS 2024 S6</td></tr>
</table>

<h3>🎯 Tack Coat / Prime Coat Application Rates</h3>
<table class="dm-table">
<tr><th>Surface</th><th>Rate (L/m²)</th><th>Emulsion Type</th></tr>
<tr><td>Granular Base → Asphalt</td><td>0.8 – 1.2 (Prime Coat)</td><td>MC-30 or MC-70</td></tr>
<tr><td>Asphalt → Asphalt</td><td>0.15 – 0.35 (Tack Coat)</td><td>Cationic SS-1 or K1-60</td></tr>
<tr><td>Milled Surface</td><td>0.25 – 0.45</td><td>Cationic</td></tr>
</table>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 9. pipe_quick_ref — مرجع اختيار المواسير
// ═══════════════════════════════════════════════════════════════
c["pipe_quick_ref"] = { title: '🔧 مرجع اختيار المواسير السريع — QCS 2024 + KAHRAMAA', content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 20 + KAHRAMAA + Ashghal المادة Standards
</div>
<h3>📊 جدول اختيار المواسير حسب الشبكة</h3>
<table class="dm-table">
<tr><th>الشبكة</th><th>المادة المعتمدة</th><th>الضغط الاسمي (PN)/SN</th><th>Range DN</th><th>المعيار</th></tr>
<tr><td>مياه الشرب (&lt; 160mm)</td><td>HDPE (البولي إيثيلين عالي الكثافة) PE100</td><td>PN16</td><td>50–160mm</td><td>ISO 4427</td></tr>
<tr><td>مياه الشرب (&gt; 160mm)</td><td>الحديد الزهر المطيل (DI) (الحديد الزهر المطيل)</td><td>K9</td><td>100–1200mm</td><td>ISO 2531</td></tr>
<tr><td>مياه الشرب (ضغط عالٍ)</td><td>الحديد الزهر المطيل (DI) أو الفولاذ / الحديد DWC</td><td>K9/K12</td><td>300mm+</td><td>AWWA C151</td></tr>
<tr><td>مجاري الصرف الصحي (Gravity)</td><td>uPVC (البولي فينيل كلوريد غير الملدَّن) SN8</td><td>SN8</td><td>100–600mm</td><td>EN 1401</td></tr>
<tr><td>مجاري الصرف الصحي (&gt; 600mm)</td><td>البوليستر المقوى بالزجاج (GRP) جرافيتي</td><td>SN5000</td><td>600–2400mm</td><td>ASTM D3262</td></tr>
<tr><td>Storm Water (Gravity)</td><td>RC (الخرسانة)</td><td>الصف / الفئة 2/3</td><td>300–1800mm</td><td>BS 5911</td></tr>
<tr><td>Storm Water (صغير)</td><td>uPVC (البولي فينيل كلوريد غير الملدَّن) أو HDPE (البولي إيثيلين عالي الكثافة)</td><td>SN8</td><td>100–315mm</td><td>EN 1401</td></tr>
<tr><td>مياه معالجة (Irrigation)</td><td>HDPE (البولي إيثيلين عالي الكثافة) PE80 أو PE100</td><td>PN10</td><td>50–400mm</td><td>ISO 4427</td></tr>
<tr><td>Reclaimed Water</td><td>HDPE (البولي إيثيلين عالي الكثافة) بنفسجي</td><td>PN10</td><td>50–400mm</td><td>KAHRAMAA + MMUP</td></tr>
</table>
<h3>🎨 ألوان شريط التحذير الرسمي — KAHRAMAA</h3>
<table class="dm-table">
<tr><th>الشبكة</th><th>لون الشريط</th><th>اللون بالعربي</th><th>العمق</th></tr>
<tr><td>مياه الشرب</td><td style="background:#3498db;color:#fff;text-align:center;">BLUE</td><td>أزرق</td><td>300mm فوق الماسورة</td></tr>
<tr><td>مجاري الصرف الصحي</td><td style="background:#27ae60;color:#fff;text-align:center;">GREEN</td><td>أخضر</td><td>300mm فوق الماسورة</td></tr>
<tr><td>Storm Drain</td><td style="background:#7f8c8d;color:#fff;text-align:center;">GREY</td><td>رمادي</td><td>300mm فوق الماسورة</td></tr>
<tr><td>مياه معالجة</td><td style="background:#8e44ad;color:#fff;text-align:center;">PURPLE</td><td>بنفسجي</td><td>300mm فوق الماسورة</td></tr>
<tr><td>كهرباء (كابلات)</td><td style="background:#e74c3c;color:#fff;text-align:center;">RED</td><td>أحمر</td><td>150mm فوق الكابل</td></tr>
<tr><td>غاز طبيعي</td><td style="background:#f39c12;color:#fff;text-align:center;">YELLOW</td><td>أصفر</td><td>300mm فوق الماسورة</td></tr>
<tr><td>اتصالات / فايبر</td><td style="background:#2c3e50;color:#fff;text-align:center;">BLACK</td><td>أسود</td><td>150mm فوق الكابل</td></tr>
</table>
<h3>📏 عمق الدفن — الحد الأدنى الغطاء الخرساني</h3>
<table class="dm-table">
<tr><th>الموقع</th><th>مياه شرب</th><th>Sewer</th><th>Storm</th></tr>
<tr><td>تحت الرصيف / Footway</td><td>1.0m</td><td>0.9m</td><td>0.75m</td></tr>
<tr><td>تحت الطريق</td><td>1.2m</td><td>1.2m</td><td>1.0m</td></tr>
<tr><td>أراضي خضراء</td><td>0.9m</td><td>0.9m</td><td>0.6m</td></tr>
<tr><td>عند التقاطع مع مرافق أخرى</td><td>300mm فصل أفقي | 500mm رأسي</td><td colspan="2">—</td></tr>
</table>
<h3>⚡ اختبارات القبول السريعة</h3>
<table class="dm-table">
<tr><th>الشبكة</th><th>الاختبار</th><th>المعيار</th></tr>
<tr><td>مياه شرب</td><td>الضغط الاختبار</td><td>1.5×الضغط الاسمي (PN) لمدة 2hr — هبوط ≤ 0.02 bar</td></tr>
<tr><td>مجاري الصرف الصحي</td><td>Air الاختبار</td><td>100mm WG لمدة 5 دقائق — هبوط ≤ 25mm WG</td></tr>
<tr><td>Storm</td><td>Water الاختبار</td><td>لا تسريب لمدة 30 دقيقة</td></tr>
<tr><td>مياه شرب</td><td>الكلور التعقيمي + Bacterio</td><td>Coliform = 0/100ml | Turbidity ≤ 1 NTU</td></tr>
<tr><td>جميع الشبكات</td><td>الفحص بالكاميرا (CCTV)</td><td>الدرجة ≤ 2 — 100% المسافة</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 20 + KAHRAMAA + Ashghal Material Standards
</div>

<h3>📊 Pipe Material Selection by Network Type</h3>
<table class="dm-table">
<tr><th>Network</th><th>Approved Material</th><th>PN/SN</th><th>DN Range</th><th>Standard</th></tr>
<tr><td>Potable Water (&lt; 160mm)</td><td>HDPE PE100</td><td>PN16</td><td>50–160mm</td><td>ISO 4427</td></tr>
<tr><td>Potable Water (&gt; 160mm)</td><td>DI (Ductile Iron)</td><td>K9</td><td>100–1200mm</td><td>ISO 2531</td></tr>
<tr><td>Potable Water (High Pressure)</td><td>DI or Steel DWC</td><td>K9/K12</td><td>300mm+</td><td>AWWA C151</td></tr>
<tr><td>Foul Sewer (Gravity)</td><td>uPVC SN8</td><td>SN8</td><td>100–600mm</td><td>EN 1401</td></tr>
<tr><td>Foul Sewer (&gt; 600mm)</td><td>GRP Gravity</td><td>SN5000</td><td>600–2400mm</td><td>ASTM D3262</td></tr>
<tr><td>Storm Water (Gravity)</td><td>RC (Reinforced Concrete)</td><td>Class 2/3</td><td>300–1800mm</td><td>BS 5911</td></tr>
<tr><td>Storm Water (Small)</td><td>uPVC or HDPE</td><td>SN8</td><td>100–315mm</td><td>EN 1401</td></tr>
<tr><td>Treated Water (Irrigation)</td><td>HDPE PE80 or PE100</td><td>PN10</td><td>50–400mm</td><td>ISO 4427</td></tr>
<tr><td>Reclaimed Water</td><td>HDPE Purple</td><td>PN10</td><td>50–400mm</td><td>KAHRAMAA + MMUP</td></tr>
</table>

<h3>🎨 Official Warning Tape Colours — KAHRAMAA</h3>
<table class="dm-table">
<tr><th>Network</th><th>Tape Colour</th><th>Colour Name</th><th>Depth</th></tr>
<tr><td>Potable Water</td><td style="background:#3498db;color:#fff;text-align:center;">BLUE</td><td>Blue</td><td>300mm above pipe</td></tr>
<tr><td>Foul Sewer</td><td style="background:#27ae60;color:#fff;text-align:center;">GREEN</td><td>Green</td><td>300mm above pipe</td></tr>
<tr><td>Storm Drain</td><td style="background:#7f8c8d;color:#fff;text-align:center;">GREY</td><td>Grey</td><td>300mm above pipe</td></tr>
<tr><td>Treated / Reclaimed Water</td><td style="background:#8e44ad;color:#fff;text-align:center;">PURPLE</td><td>Purple</td><td>300mm above pipe</td></tr>
<tr><td>Electricity (cables)</td><td style="background:#e74c3c;color:#fff;text-align:center;">RED</td><td>Red</td><td>150mm above cable</td></tr>
<tr><td>Natural Gas</td><td style="background:#f39c12;color:#fff;text-align:center;">YELLOW</td><td>Yellow</td><td>300mm above pipe</td></tr>
<tr><td>Telecoms / Fibre</td><td style="background:#2c3e50;color:#fff;text-align:center;">BLACK</td><td>Black</td><td>150mm above cable</td></tr>
</table>

<h3>📏 Minimum Burial Depth (Cover)</h3>
<table class="dm-table">
<tr><th>Location</th><th>Potable Water</th><th>Sewer</th><th>Storm</th></tr>
<tr><td>Under footway / pavement</td><td>1.0m</td><td>0.9m</td><td>0.75m</td></tr>
<tr><td>Under carriageway / road</td><td>1.2m</td><td>1.2m</td><td>1.0m</td></tr>
<tr><td>Soft landscaping / green areas</td><td>0.9m</td><td>0.9m</td><td>0.6m</td></tr>
<tr><td>At crossing with other utilities</td><td>300mm horizontal separation | 500mm vertical</td><td colspan="2">—</td></tr>
</table>

<h3>⚡ Quick Acceptance Tests</h3>
<table class="dm-table">
<tr><th>Network</th><th>Test</th><th>Criterion</th></tr>
<tr><td>Potable Water</td><td>Pressure Test</td><td>1.5×PN for 2hr — drop ≤ 0.02 bar</td></tr>
<tr><td>Foul Sewer</td><td>Air Test</td><td>100mm WG for 5 min — drop ≤ 25mm WG</td></tr>
<tr><td>Storm</td><td>Water Test</td><td>No leakage for 30 minutes</td></tr>
<tr><td>Potable Water</td><td>Chlorination + Bacteriological</td><td>Coliform = 0/100ml | Turbidity ≤ 1 NTU</td></tr>
<tr><td>All networks</td><td>CCTV Inspection</td><td>Grade ≤ 2 — 100% of length</td></tr>
</table>
</div>
`};

})(); // end IIFE