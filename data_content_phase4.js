// QatarSpec Pro — Content Phase 4: Missing Keys
// pile_load_testing | exec_concrete_pour | exec_bridge_rebar | exec_foundation_excavation
// exec_asphalt_paving | exec_water_pipe | concrete_quick_ref | asphalt_quick_ref | pipe_quick_ref
(function(){
  var c = window.QS_CONTENT = window.QS_CONTENT || {};

// ═══════════════════════════════════════════════════════════════
// 1. pile_load_testing — اختبار الخوازيق
// ═══════════════════════════════════════════════════════════════
c["pile_load_testing"] = { title: '🏗️ اختبار الخوازيق — Pile Load Testing', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 7 + BS 8004 + ASTM D1143
</div>

<h3>📊 أنواع اختبارات الخوازيق</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الهدف</th><th>عدد الخوازيق</th><th>التوقيت</th></tr>
<tr><td><strong>Static Load Test (SLT)</strong></td><td>تحقق من الحمولة الفعلية</td><td>1% من الإجمالي (min 1)</td><td>بعد 14 يوم من الصب</td></tr>
<tr><td><strong>Pile Integrity Test (PIT)</strong></td><td>كشف العيوب الداخلية</td><td>100% من الخوازيق</td><td>بعد 7 أيام</td></tr>
<tr><td><strong>Dynamic Load Test (DLT/PDA)</strong></td><td>تحقق سريع من الحمولة</td><td>5% أو كما تحدده الاستشارة</td><td>بعد Set-up period</td></tr>
<tr><td><strong>Cross-Hole Sonic Logging</strong></td><td>فحص تجانس الخرسانة</td><td>خوازيق Ø≥600mm</td><td>بعد 7 أيام</td></tr>
</table>

<h3>🔴 Static Load Test — Hold Points</h3>
<table class="dm-table">
<tr><th>المرحلة</th><th>الاشتراط</th><th>QCS Ref</th></tr>
<tr><td>Kentledge/Reaction System</td><td>تحمل ≥ 2.5× تحميل الاختبار</td><td>QCS S5 P7 Cl.7.8</td></tr>
<tr><td>تحميل أولي</td><td>Proof Load = 1.5× القدرة التصميمية</td><td>QCS S5 P7</td></tr>
<tr><td>الهبوط المسموح</td><td>Settlement ≤ 25mm عند Proof Load</td><td>BS 8004 Cl.7.4</td></tr>
<tr><td>الانتعاش (Rebound)</td><td>≥ 50% من إجمالي الهبوط</td><td>QCS S5 P7</td></tr>
<tr><td>خوازيق الاختبار</td><td>لا تُستخدم في الإنشاء الدائم</td><td>QCS S5 P7 Cl.7.9</td></tr>
</table>

<h3>⚠️ PIT — Pile Integrity Test</h3>
<table class="dm-table">
<tr><th>التقييم</th><th>التفسير</th><th>الإجراء</th></tr>
<tr><td style="color:#2ecc71;">Class A</td><td>خازوق سليم — لا عيوب</td><td>قبول ✅</td></tr>
<tr><td style="color:#f39c12;">Class B</td><td>عيب محتمل — تحقيق إضافي</td><td>CSL أو DLT ⚠️</td></tr>
<tr><td style="color:#e74c3c;">Class C</td><td>عيب واضح — تقليص الحمولة</td><td>إجراء تصحيحي 🔴</td></tr>
<tr><td style="color:#e74c3c;">Class D</td><td>خازوق معيب — استبدال</td><td>NCR + استبدال ❌</td></tr>
</table>

<h3>📋 ITP Checklist — اختبار الخوازيق</h3>
<table class="dm-table">
<tr><th>البند</th><th>المعيار</th><th>النقطة</th></tr>
<tr><td>Cage Inspection قبل الصب</td><td>Diameter + Cover + Length ✓</td><td>HP</td></tr>
<tr><td>Concrete Slump (مياه تحت)</td><td>160-220mm (Tremie)</td><td>W</td></tr>
<tr><td>Cube Tests</td><td>6 مكعبات كل 25m³ (min/pile)</td><td>W</td></tr>
<tr><td>PIT بعد 7 أيام</td><td>Class A لكل الخوازيق</td><td>HP</td></tr>
<tr><td>Cut-off Level</td><td>±25mm من الرسمة</td><td>W</td></tr>
<tr><td>As-built Survey</td><td>Deviation ≤ 75mm من الموقع المحدد</td><td>HP</td></tr>
</table>

<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
🔴 <strong>تنبيه:</strong> لا يُسمح بصب Cap Beam قبل استلام نتائج PIT لجميع خوازيق المجموعة — QCS S5 P7 Cl.7.10
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 2. exec_concrete_pour — آلية صب الخرسانة (Stepper)
// ═══════════════════════════════════════════════════════════════
c["exec_concrete_pour"] = { title: '🏗️ آلية صب الخرسانة — 6 خطوات', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 4 | Concrete Placement
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('cp',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ قبل الصب</div>
  <div class="calc-tab" onclick="showExecStep('cp',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ الاستلام</div>
  <div class="calc-tab" onclick="showExecStep('cp',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ الصب</div>
  <div class="calc-tab" onclick="showExecStep('cp',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ الدمك</div>
  <div class="calc-tab" onclick="showExecStep('cp',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">5️⃣ المعالجة</div>
  <div class="calc-tab" onclick="showExecStep('cp',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">6️⃣ الفك</div>
</div>

<div id="cp-step-1">
<h3>1️⃣ قبل الصب — Pre-pour Checklist</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>QCS</th></tr>
<tr><td>🔴 RFI مفتوح</td><td>توقيع SC قبل أي صب</td><td>FIDIC Cl.7.4</td></tr>
<tr><td>تسليح + Cover Spacers</td><td>تحقق Cover + Lap + Spacing</td><td>S5 P3</td></tr>
<tr><td>نظافة القالب</td><td>خالٍ من النشارة، ماء، زيت</td><td>S5 P8</td></tr>
<tr><td>إغلاق الفتحات</td><td>laitance laps + penetrations sealed</td><td>S5 P8</td></tr>
<tr><td>Release Agent</td><td>طبقة رفيعة منتظمة — بدون تقطر</td><td>S5 P8</td></tr>
<tr><td>مضخة + Vibrators</td><td>Standby Vibrator متوفر دائماً</td><td>S5 P4</td></tr>
<tr><td>Cube Moulds</td><td>6 مكعبات كل 50m³ أو كل Truck</td><td>S5 P4</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⛔ في الجو الحار (>35°C): ابدأ الصب بعد الغروب — أضف ثلج — QCS S5 P4 Cl.4.8
</div>
</div>

<div id="cp-step-2" style="display:none">
<h3>2️⃣ استلام الخرسانة — Acceptance at Site</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الحد المسموح</th><th>الإجراء عند الرفض</th></tr>
<tr><td>Delivery Note</td><td>Mix ID + W/C + Time ✓</td><td>رفض التسليم</td></tr>
<tr><td>الوقت من الخلط</td><td>≤ 90 دقيقة (60 صيفاً)</td><td>رفض — NCR</td></tr>
<tr><td>درجة حرارة الخرسانة</td><td>≤ 32°C عند الصب</td><td>إضافة ثلج أو رفض</td></tr>
<tr><td>Slump</td><td>Target ± 25mm (Max 180mm)</td><td>رفض إذا >Max</td></tr>
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
<tr><td>وقت بين الطبقات</td><td>≤ Initial Set Time (≈ 2hr)</td><td>S5 P4 Cl.4.4</td></tr>
<tr><td>Cold Joints</td><td>ممنوع — استمر بالصب</td><td>S5 P4 Cl.4.5</td></tr>
<tr><td>تحريك الخرسانة أفقياً</td><td>ممنوع بالـ Vibrator</td><td>S5 P4 Cl.4.3</td></tr>
<tr><td>مسافة من الشدة للصب</td><td>لا تضرب الـ Rebar مباشرة</td><td>S5 P4</td></tr>
</table>
</div>

<div id="cp-step-4" style="display:none">
<h3>4️⃣ الدمك — Vibration</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>نوع Vibrator</td><td>Internal (Poker) Ø ≥ 25mm</td></tr>
<tr><td>Insertion Spacing</td><td>≤ 450mm (1.5× radius of action)</td></tr>
<tr><td>مدة الدمك</td><td>5-15 ثانية حتى توقف الفقاعات</td></tr>
<tr><td>سحب الـ Vibrator</td><td>ببطء — 75-150mm/sec</td></tr>
<tr><td>Revibration</td><td>مسموح خلال Initial Set فقط</td></tr>
<tr><td>Standby Vibrator</td><td>إلزامي في كل عملية صب</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⚠️ Over-vibration = Segregation = عيب خطير — QCS S5 P4
</div>
</div>

<div id="cp-step-5" style="display:none">
<h3>5️⃣ المعالجة — Curing</h3>
<table class="dm-table">
<tr><th>الحالة</th><th>مدة Curing</th><th>الطريقة</th></tr>
<tr><td>عادي (< 30°C)</td><td>7 أيام minimum</td><td>Hessian + ماء / Curing Compound</td></tr>
<tr><td>حار (30-40°C)</td><td>10 أيام</td><td>Hessian مبلل باستمرار</td></tr>
<tr><td>شديد الحرارة (>40°C)</td><td>14 يوم</td><td>Polythene Sheet + مياه</td></tr>
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
<tr><td>جوانب الجدران والأعمدة</td><td>24 ساعة</td><td>Cube ≥ 5 MPa</td></tr>
<tr><td>Slabs (Span ≤ 5m)</td><td>7 أيام</td><td>Cube ≥ 70% fcu</td></tr>
<tr><td>Slabs (Span > 5m)</td><td>14 يوم</td><td>Cube ≥ 70% fcu</td></tr>
<tr><td>Beams / Cantilevers</td><td>21 يوم</td><td>Cube ≥ 75% fcu</td></tr>
<tr><td>Soffit Props</td><td>حسب الحسابات الإنشائية</td><td>لا تُزال قبل ≥ 28-day acceptance</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
⚠️ القبول الرسمي = 28-day فقط — 7-day للمراقبة فقط وليس للقبول — QCS S5 P4
</div>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 3. exec_bridge_rebar — آلية تسليح الجسور
// ═══════════════════════════════════════════════════════════════
c["exec_bridge_rebar"] = { title: '🌉 آلية تسليح الجسور — 4 خطوات', content: `
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 3 + BS 4449 + BS 8666
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('br',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ المواد</div>
  <div class="calc-tab" onclick="showExecStep('br',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ الغطاء</div>
  <div class="calc-tab" onclick="showExecStep('br',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ الوصلات</div>
  <div class="calc-tab" onclick="showExecStep('br',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Durability</div>
</div>

<div id="br-step-1">
<h3>1️⃣ فحص المواد — Material Acceptance</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>QCS Ref</th></tr>
<tr><td>Yield Strength fy</td><td>≥ 500 MPa (Grade B500B)</td><td>S5 P3 + BS 4449</td></tr>
<tr><td>Tensile Strength fu</td><td>≥ 550 MPa</td><td>BS 4449</td></tr>
<tr><td>fu/fy Ratio</td><td>≥ 1.08</td><td>BS 4449 Cl.5.4</td></tr>
<tr><td>Elongation (A5)</td><td>≥ 14%</td><td>BS 4449</td></tr>
<tr><td>Bend Test</td><td>180° — لا تشقق — 3d mandrel</td><td>BS 4449</td></tr>
<tr><td>Mill Certificate</td><td>Heat Number مطابق للـ Bar</td><td>QCS S5 P3</td></tr>
<tr><td>Test Frequency</td><td>كل 50 طن أو تغيير الـ Heat</td><td>QCS S5 P3</td></tr>
</table>
</div>

<div id="br-step-2" style="display:none">
<h3>2️⃣ الغطاء الخرساني — Concrete Cover</h3>
<table class="dm-table">
<tr><th>العنصر / الموقع</th><th>Cover min (mm)</th><th>QCS Ref</th></tr>
<tr><td>أساسات (مباشرة على التربة)</td><td><strong>75</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>أساسات (مع Blinding)</td><td><strong>50</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>أعمدة خارجية</td><td><strong>40</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>جدران خارجية</td><td><strong>40</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>بلاطات خارجية</td><td><strong>30</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>داخلي (Protected)</td><td><strong>20-25</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>خوازيق</td><td><strong>75</strong></td><td>S5 P3 Table 3:1</td></tr>
<tr><td>جسور بيئة بحرية</td><td><strong>60-75</strong></td><td>BS 6349</td></tr>
</table>
<div style="font-size:11px;color:var(--text3);margin-top:8px;">⚠️ Tolerance مسموحة: -0/+10mm — Spacers كل 1.0m في الأساسات و0.75m في الجدران</div>
</div>

<div id="br-step-3" style="display:none">
<h3>3️⃣ أطوال الوصلات — Lap Lengths</h3>
<table class="dm-table">
<tr><th>الحالة</th><th>Lap Length</th><th>QCS Ref</th></tr>
<tr><td>Tension (Standard)</td><td>40d</td><td>S5 P3 Cl.3.7</td></tr>
<tr><td>Compression</td><td>35d</td><td>S5 P3 Cl.3.7</td></tr>
<tr><td>High Seismic Zone</td><td>50d (Tension)</td><td>S5 P3</td></tr>
<tr><td>Curtailment</td><td>d + Anchorage من نقطة التوقف</td><td>S5 P3 Cl.3.6</td></tr>
<tr><td>Hooks (Standard)</td><td>12d straight + 4d bent</td><td>BS 8666</td></tr>
<tr><td>Links / Stirrups Hooks</td><td>135° — ليس 90°</td><td>S5 P3 Cl.3.5</td></tr>
</table>
<div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;font-size:11px;margin-top:8px;">
🔴 Laps يجب ألا تكون في نقاط الإجهاد الأقصى — مثلاً منتصف البحر للـ Positive Moment — QCS S5 P3
</div>
</div>

<div id="br-step-4" style="display:none">
<h3>4️⃣ متطلبات المتانة — Durability</h3>
<table class="dm-table">
<tr><th>البيئة</th><th>Grade min</th><th>w/c max</th><th>Cement min</th></tr>
<tr><td>داخلي (جاف)</td><td>C25</td><td>0.55</td><td>300 kg/m³</td></tr>
<tr><td>خارجي (قطر)</td><td>C35</td><td>0.45</td><td>350 kg/m³</td></tr>
<tr><td>SO₃ > 0.5% (تربة)</td><td>C40</td><td>0.40</td><td>380 kg/m³ SRPC</td></tr>
<tr><td>بحري / Splash Zone</td><td>C40</td><td>0.40</td><td>400 kg/m³</td></tr>
<tr><td>خوازيق (قطر)</td><td>C40</td><td>0.40</td><td>400 kg/m³ + GGBS</td></tr>
</table>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 4. exec_foundation_excavation — آلية حفر الأساسات
// ═══════════════════════════════════════════════════════════════
c["exec_foundation_excavation"] = { title: '⛏️ آلية حفر الأساسات — 6 خطوات', content: `
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 5 Part 6 + Section 1 Safety
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('fe',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ التخطيط</div>
  <div class="calc-tab" onclick="showExecStep('fe',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ الحفر</div>
  <div class="calc-tab" onclick="showExecStep('fe',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ التدعيم</div>
  <div class="calc-tab" onclick="showExecStep('fe',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ Dewatering</div>
  <div class="calc-tab" onclick="showExecStep('fe',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">5️⃣ Founding Level</div>
  <div class="calc-tab" onclick="showExecStep('fe',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">6️⃣ الردم</div>
</div>

<div id="fe-step-1">
<h3>1️⃣ التخطيط والتحضير</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>مواقع المرافق</td><td>فحص QNBN / Ashghal Utility Map + Trial Pits</td></tr>
<tr><td>Geotechnical Report</td><td>مراجعة Soil Profile + GWT + Bearing Capacity</td></tr>
<tr><td>Method Statement</td><td>معتمد من SC قبل البدء</td></tr>
<tr><td>Permit to Work</td><td>خنادق > 1.2m تحتاج Confined Space Permit</td></tr>
<tr><td>Setting Out</td><td>Survey Check: Grid Lines + Levels ± 10mm</td></tr>
</table>
</div>

<div id="fe-step-2" style="display:none">
<h3>2️⃣ الحفر — Excavation</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>QCS</th></tr>
<tr><td>Working Space</td><td>600mm على الأقل حول الأساس</td><td>S5 P6</td></tr>
<tr><td>Side Slope</td><td>1:1 (ميل آمن) إذا بدون Shoring</td><td>QCS S1 Safety</td></tr>
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
<tr><td>< 1.2m</td><td>لا يلزم (تربة جيدة)</td><td>مراقبة مستمرة</td></tr>
<tr><td>1.2m – 3.0m</td><td>Timber Shoring أو Sheet Piles</td><td>Engineer Approval</td></tr>
<tr><td>3.0m – 6.0m</td><td>Steel Sheet Piles + Struts</td><td>Structural Calc مطلوب</td></tr>
<tr><td>> 6.0m</td><td>Contiguous Piles أو Diaphragm Wall</td><td>Specialist Design</td></tr>
<tr><td>بجانب مبانٍ قائمة</td><td>Underpinning أو Sheet Piles دائماً</td><td>محلل خاص</td></tr>
</table>
</div>

<div id="fe-step-4" style="display:none">
<h3>4️⃣ خفض المياه الجوفية — Dewatering</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>Dewatering Method</td><td>Well Points أو Deep Wells حسب Permeability</td></tr>
<tr><td>Level of Drawdown</td><td>0.5m أسفل Founding Level دائماً</td></tr>
<tr><td>Disposal</td><td>إلى Storm Drain أو Settling Tank (بعيداً عن العمل)</td></tr>
<tr><td>GWT Monitoring</td><td>Observation Wells أسبوعياً أثناء الحفر</td></tr>
<tr><td>Settlement Monitoring</td><td>للمباني المجاورة كل أسبوع</td></tr>
<tr><td>Sabkha</td><td>بروتوكول IAN-006 + معالجة قبل الأساس</td></tr>
</table>
</div>

<div id="fe-step-5" style="display:none">
<h3>5️⃣ 🔴 HP — Founding Level Approval</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>النقطة</th></tr>
<tr><td>Survey Level</td><td>± 25mm من Founding Level المصمم</td><td>🔴 HP</td></tr>
<tr><td>Bearing Capacity (Plate Load أو DCP)</td><td>≥ Safe Bearing Capacity المصمم</td><td>🔴 HP</td></tr>
<tr><td>Visual Inspection (Geotechnical)</td><td>نوع التربة مطابق للجسات</td><td>🔴 HP</td></tr>
<tr><td>Blinding Concrete (50mm C15)</td><td>بعد HP مباشرة — قبل تلوث التربة</td><td>W</td></tr>
<tr><td>Waterproofing (إن وجد)</td><td>قبل وضع الحديد</td><td>W</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;font-size:12px;margin-top:8px;">
🔴 <strong>Hold Point:</strong> لا يُسمح بوضع أي حديد أو صب قبل حصول HP sign-off من SC — QCS S5 P6
</div>
</div>

<div id="fe-step-6" style="display:none">
<h3>6️⃣ الردم — Backfilling</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>Cube Results ≥ 70% fcu</td><td>قبل الردم حول الأساس</td></tr>
<tr><td>Waterproofing Inspection</td><td>HP قبل الردم</td></tr>
<tr><td>Layer Thickness</td><td>≤ 200mm (آلي) / ≤ 150mm (يدوي)</td></tr>
<tr><td>Compaction</td><td>≥ 95% MDD — Nuclear Gauge أو Sand Replacement</td></tr>
<tr><td>1m حول الأساس</td><td>حصرياً Granular Fill — No Clay</td></tr>
<tr><td>Drainage Layer</td><td>500mm Granular بجانب الأساس (بيئة Aggressive)</td></tr>
</table>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 5. exec_asphalt_paving — آلية فرد الإسفلت
// ═══════════════════════════════════════════════════════════════
c["exec_asphalt_paving"] = { title: '🛣️ آلية فرد الإسفلت — 4 خطوات', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 Part 5 + Section 8 Part 5 | Asphalt Paving
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('ap',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ قبل الفرد</div>
  <div class="calc-tab" onclick="showExecStep('ap',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ أثناء الفرد</div>
  <div class="calc-tab" onclick="showExecStep('ap',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ الدمك</div>
  <div class="calc-tab" onclick="showExecStep('ap',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ القبول</div>
</div>

<div id="ap-step-1">
<h3>1️⃣ قبل الفرد — Pre-Paving Checklist</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>QCS</th></tr>
<tr><td>🔴 JMF Approval</td><td>موافقة SC قبل أي إنتاج</td><td>S8 P5 Cl.5.3</td></tr>
<tr><td>Trial Section</td><td>إلزامي قبل الإنتاج الكامل</td><td>S8 P5 Cl.5.4</td></tr>
<tr><td>طبقة Tack Coat</td><td>0.15-0.35 L/m² Cationic Emulsion — مكسورة</td><td>S8 P5</td></tr>
<tr><td>نظافة السطح</td><td>خالٍ من الغبار، الماء، الوحل</td><td>S8 P5</td></tr>
<tr><td>درجة حرارة الجو</td><td>≥ 10°C — لا فرد في المطر</td><td>S8 P5</td></tr>
<tr><td>Plant Calibration</td><td>Batch Plant Calibration Certificate حديث</td><td>S8 P5</td></tr>
<tr><td>Thermometers</td><td>شاشة على الـ Paver + Trucks</td><td>S8 P5</td></tr>
</table>
</div>

<div id="ap-step-2" style="display:none">
<h3>2️⃣ أثناء الفرد — During Paving</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>الإجراء عند الخروج</th></tr>
<tr><td>درجة حرارة التسليم (DBM)</td><td>≥ 140°C — QCS 2024 S8</td><td>رفض الـ Truck</td></tr>
<tr><td>درجة حرارة التسليم (WC)</td><td>≥ 145°C — QCS 2024 S8</td><td>رفض الـ Truck</td></tr>
<tr><td>درجة حرارة عند الفرد</td><td>≥ 125°C (Conventional) / ≥ 140°C (PMB)</td><td>إيقاف الفرد</td></tr>
<tr><td>سماكة الفرد</td><td>Target ± 6mm (كل 100m²)</td><td>تعديل فوري</td></tr>
<tr><td>وقت النقل</td><td>≤ 60 دقيقة من المصنع</td><td>رفض الـ Truck</td></tr>
<tr><td>Screed Temperature</td><td>مسخّنة قبل الفرد</td><td>إلزامي</td></tr>
<tr><td>Delivery Note</td><td>JMF Ref + Temp + Time ✓</td><td>رفض بدون DN</td></tr>
</table>
</div>

<div id="ap-step-3" style="display:none">
<h3>3️⃣ الدمك — Compaction</h3>
<table class="dm-table">
<tr><th>المرحلة</th><th>الـ Roller</th><th>درجة الحرارة</th><th>عدد المرور</th></tr>
<tr><td>Initial (Breakdown)</td><td>Steel Drum 8-12 ton</td><td>130-145°C</td><td>2-3 مرات</td></tr>
<tr><td>Intermediate</td><td>Pneumatic 16-20 ton</td><td>100-130°C</td><td>6-10 مرات</td></tr>
<tr><td>Final (Finishing)</td><td>Steel Drum بدون Vibration</td><td>60-80°C</td><td>2 مرات</td></tr>
</table>
<table class="dm-table" style="margin-top:10px">
<tr><th>معيار القبول</th><th>الحد</th><th>QCS</th></tr>
<tr><td>Core Density</td><td>≥ 97% TMD (BC) / ≥ 97% (WC)</td><td>S8 P5</td></tr>
<tr><td>Air Voids (Cores)</td><td>2-6% (BC) / 2-5% (WC)</td><td>S8 P5</td></tr>
<tr><td>Field Density (NDG)</td><td>≥ 97% TMD</td><td>S8 P5</td></tr>
</table>
</div>

<div id="ap-step-4" style="display:none">
<h3>4️⃣ اختبارات القبول — Final Acceptance</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>IRI — International Roughness Index</td><td>≤ 2.5 m/km (Conventional) / ≤ 0.9 m/km (PMB)</td><td>100% Lane km</td></tr>
<tr><td>Skid Resistance (SFC)</td><td>≥ 55 (WC) بعد 6 أشهر</td><td>Spot Check</td></tr>
<tr><td>Crossfall</td><td>2.5% ± 0.3% — QCS 2024 S6</td><td>كل 25m</td></tr>
<tr><td>3m Straightedge</td><td>≤ 4mm تحت الـ Edge</td><td>كل 50m</td></tr>
<tr><td>Thickness (Cores)</td><td>Mean ≥ Target-3mm | No Core < Target-6mm</td><td>كل 1000m²</td></tr>
<tr><td>Marshall Stability</td><td>≥ 8.0 kN (Conventional) / ≥ 10.0 kN (PMB)</td><td>من كل Truck</td></tr>
</table>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 6. exec_water_pipe — آلية مد المواسير
// ═══════════════════════════════════════════════════════════════
c["exec_water_pipe"] = { title: '💧 آلية مد مواسير المياه — 7 خطوات', content: `
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 20 + KAHRAMAA WR Standards
</div>

<div class="calc-tabs">
  <div class="calc-tab active" onclick="showExecStep('wp',1);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">1️⃣ الحفر</div>
  <div class="calc-tab" onclick="showExecStep('wp',2);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">2️⃣ الفراش</div>
  <div class="calc-tab" onclick="showExecStep('wp',3);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">3️⃣ المد</div>
  <div class="calc-tab" onclick="showExecStep('wp',4);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">4️⃣ الوصلات</div>
  <div class="calc-tab" onclick="showExecStep('wp',5);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">5️⃣ 🔴 HP قبل الردم</div>
  <div class="calc-tab" onclick="showExecStep('wp',6);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">6️⃣ Pressure Test</div>
  <div class="calc-tab" onclick="showExecStep('wp',7);this.closest('.dm-content').querySelectorAll('.calc-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">7️⃣ Chlorination</div>
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
<h3>2️⃣ فراش الماسورة — Bedding</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th><th>KAHRAMAA</th></tr>
<tr><td>مادة الفراش</td><td>Granular ≤ 10mm (Sand/Fine Gravel)</td><td>✓</td></tr>
<tr><td>سماكة الفراش</td><td>150mm أسفل الماسورة</td><td>✓</td></tr>
<tr><td>Compaction</td><td>≥ 90% MDD بجانب الماسورة</td><td>✓</td></tr>
<tr><td>حول الماسورة</td><td>Granular حتى 300mm فوق أعلى الماسورة</td><td>✓</td></tr>
<tr><td>فوق 300mm</td><td>Approved Fill بطبقات 150mm</td><td>✓</td></tr>
</table>
</div>

<div id="wp-step-3" style="display:none">
<h3>3️⃣ مد المواسير — Pipe Laying</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>الاتجاه</td><td>من المنبع للمصب (في الانحدار)</td></tr>
<tr><td>Level Tolerance</td><td>± 10mm من مستوى التصميم</td></tr>
<tr><td>Alignment</td><td>± 25mm من الخط المحدد</td></tr>
<tr><td>Bell End</td><td>يتجه لاتجاه المد دائماً</td></tr>
<tr><td>نظافة الماسورة</td><td>فحص الداخل قبل الوصل — خالٍ من التراب</td></tr>
<tr><td>HDPE Material</td><td>PE100 PN16 كحد أدنى (KAHRAMAA)</td></tr>
</table>
</div>

<div id="wp-step-4" style="display:none">
<h3>4️⃣ الوصلات — Jointing</h3>
<table class="dm-table">
<tr><th>النوع</th><th>الطريقة</th><th>الاشتراط</th></tr>
<tr><td>HDPE Butt Fusion</td><td>درجة حرارة 220-230°C</td><td>Bead ثنائي ومتماثل</td></tr>
<tr><td>HDPE Electrofusion</td><td>يحدده الـ Controller تلقائياً</td><td>Certificate مطبوع</td></tr>
<tr><td>DI Mechanical Joint</td><td>Rubber Ring + Bolts بعزم موحد</td><td>Deflection ≤ 3°</td></tr>
<tr><td>Fusion Log</td><td>بيانات كل وصلة محفوظة</td><td>إلزامي KAHRAMAA</td></tr>
<tr><td>Thrust Blocks</td><td>عند كل منحنى > 11.25° + Tees + End Caps</td><td>حساب حجم الـ Block</td></tr>
</table>
</div>

<div id="wp-step-5" style="display:none">
<h3>5️⃣ 🔴 Hold Point — قبل الردم</h3>
<table class="dm-table">
<tr><th>الفحص</th><th>المعيار</th><th>النقطة</th></tr>
<tr><td>Joint Inspection 100%</td><td>Bead / Fusion Log / Rubber Ring ✓</td><td>🔴 HP</td></tr>
<tr><td>Level Survey</td><td>كل وصلة ± 10mm</td><td>🔴 HP</td></tr>
<tr><td>Alignment Check</td><td>± 25mm من Centre Line</td><td>🔴 HP</td></tr>
<tr><td>Marker Tape</td><td>300mm فوق الماسورة — اللون الصحيح</td><td>🔴 HP</td></tr>
<tr><td>Thrust Blocks Cured</td><td>48 ساعة على الأقل (C15)</td><td>W</td></tr>
</table>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;font-size:12px;margin-top:8px;">
🔴 <strong>لا ردم قبل توقيع RFI!</strong> — أي ردم قبل HP = NCR فوري — KAHRAMAA Standard
</div>
</div>

<div id="wp-step-6" style="display:none">
<h3>6️⃣ اختبار الضغط — Pressure Test</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>ضغط الاختبار</td><td>1.5 × PN التصميمي</td></tr>
<tr><td>مدة الاختبار</td><td>2 ساعة على الأقل</td></tr>
<tr><td>الهبوط المسموح</td><td>≤ 0.02 bar / ساعة (مياه شرب)</td></tr>
<tr><td>فحص الوصلات</td><td>بصرياً أثناء الضغط — لا تسريب</td></tr>
<tr><td>Pass Criteria</td><td>≥ 1.5×PN لمدة 2hr بدون هبوط > 0.02 bar</td></tr>
<tr><td>توقيت الاختبار</td><td>قبل التعقيم وبعد Thrust Blocks ≥ 48hr</td></tr>
</table>
</div>

<div id="wp-step-7" style="display:none">
<h3>7️⃣ التعقيم — Chlorination</h3>
<table class="dm-table">
<tr><th>البند</th><th>الاشتراط</th></tr>
<tr><td>تركيز الكلور</td><td>20-50 mg/L (20 ppm) لمدة 24 ساعة</td></tr>
<tr><td>Flush قبل التعقيم</td><td>سرعة ≥ 0.75 m/s حتى يصفو الماء</td></tr>
<tr><td>Dwell Time</td><td>24 ساعة — تركيز Residual ≥ 0.2 ppm</td></tr>
<tr><td>Flush بعد التعقيم</td><td>حتى Cl₂ ≤ 0.5 mg/L</td></tr>
<tr><td>عينة بكتيرية</td><td>Coliform = 0/100ml | Turbidity ≤ 1 NTU</td></tr>
<tr><td>نتيجة المختبر</td><td>معتمد KAHRAMAA — 3 أيام</td></tr>
</table>
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 7. concrete_quick_ref — مرجع سريع للخرسانة
// ═══════════════════════════════════════════════════════════════
c["concrete_quick_ref"] = { title: '🧱 مرجع درجات الخرسانة السريع — QCS 2024', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">

<div class="ref-header" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;padding:10px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;">
  <span class="ref-badge" style="background:rgba(201,168,76,0.2);color:var(--gold);border:1px solid rgba(201,168,76,0.4);border-radius:6px;padding:3px 10px;font-size:11px;font-weight:700;">QCS 2024 §S5-P4</span>
  <span class="ref-section" style="color:var(--text2);font-size:12px;">BS EN 12350 | BS EN 12390 | BS 8500 | ACI 318</span>
  <span class="ref-updated" style="margin-left:auto;color:var(--text3);font-size:11px;">آخر تحديث: 2024</span>
</div>

📌 QCS 2024 — Section 5 Part 4 Table 4:1 + Table 4:2
</div>

<h3>📊 جدول الدرجات والاستخدامات — Grade Selection Table</h3>
<table class="dm-table">
<tr><th>العنصر</th><th>Grade min</th><th>Cover min</th><th>الإسمنت</th><th>w/c max</th></tr>
<tr><td>Blinding</td><td>C15</td><td>—</td><td>OPC</td><td>0.70</td></tr>
<tr><td>ردم Concrete</td><td>C20</td><td>—</td><td>OPC</td><td>0.65</td></tr>
<tr><td>أساسات (تربة عادية)</td><td>C35</td><td>75mm</td><td>OPC/SRPC</td><td>0.45</td></tr>
<tr><td>أساسات (SO₃ > 0.5%)</td><td>C40</td><td>75mm</td><td>SRPC+GGBS</td><td>0.40</td></tr>
<tr><td>أعمدة خارجية</td><td>C35</td><td>40mm</td><td>OPC/SRPC</td><td>0.45</td></tr>
<tr><td>بلاطات خارجية</td><td>C35</td><td>30mm</td><td>OPC</td><td>0.50</td></tr>
<tr><td>بلاطات داخلية</td><td>C25</td><td>20mm</td><td>OPC</td><td>0.55</td></tr>
<tr><td>جدران استنادية</td><td>C35</td><td>40mm</td><td>SRPC</td><td>0.45</td></tr>
<tr><td>خوازيق (قطر)</td><td>C40</td><td>75mm</td><td>SRPC+GGBS</td><td>0.40</td></tr>
<tr><td>Precast Elements</td><td>C40</td><td>30-40mm</td><td>OPC/SRC</td><td>0.40</td></tr>
</table>

<h3>🌡️ إجراءات الجو الحار — Hot Weather Protocol</h3>
<table class="dm-table">
<tr><th>الجو °C</th><th>الإجراء الإلزامي</th><th>Concrete Temp Max</th></tr>
<tr><td>30-35°C</td><td>تبريد الركام + مياه باردة</td><td>≤ 32°C</td></tr>
<tr><td>35-40°C</td><td>+ ثلج (30 kg/m³) + تبريد الـ Mixer</td><td>≤ 32°C</td></tr>
<tr><td>> 40°C</td><td>صب ليلي فقط أو وقف الصب</td><td>≤ 32°C</td></tr>
</table>

<h3>🧪 جدول الاختبارات</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>التكرار</th><th>معيار القبول</th><th>QCS</th></tr>
<tr><td>Slump Test</td><td>كل Truck</td><td>Target ± 25mm</td><td>S5 P4</td></tr>
<tr><td>Temperature</td><td>كل Truck</td><td>≤ 32°C عند الصب</td><td>S5 P4</td></tr>
<tr><td>Cubes (7-day)</td><td>6 مكعبات / 50m³</td><td>للمراقبة فقط — ليس للقبول</td><td>S5 P4</td></tr>
<tr><td>Cubes (28-day)</td><td>6 مكعبات / 50m³</td><td>≥ fcu (القبول الرسمي)</td><td>S5 P4</td></tr>
<tr><td>Core Test</td><td>عند الشك</td><td>≥ 0.85×fcu</td><td>S5 P4</td></tr>
</table>

<h3>💡 قواعد القبول الرسمية</h3>
<div style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:12px;font-size:12px;line-height:1.9;">
✅ <strong>قبول:</strong> الوسط التراكمي (Mean) ≥ fcu + 3 MPa لكل 40 نتيجة<br>
✅ <strong>قبول فردي:</strong> لا نتيجة < fcu - 3 MPa (C≤25) أو < fcu - 4 MPa (C≥30)<br>
🔴 <strong>رفض:</strong> 3 نتائج متتالية < fcu → NCR + Core Testing فوري<br>
⚠️ <strong>7-day:</strong> للمراقبة فقط — القبول الرسمي 28-day حصراً — QCS S5 P4
</div>
`};

// ═══════════════════════════════════════════════════════════════
// 8. asphalt_quick_ref — مرجع سريع للإسفلت
// ═══════════════════════════════════════════════════════════════
c["asphalt_quick_ref"] = { title: '🛣️ مرجع طبقات الإسفلت السريع — QCS 2024', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 6 P3 Table 3:1 + Section 8 Part 5
</div>

<h3>📊 سماكات الطبقات حسب تصنيف الطريق</h3>
<table class="dm-table">
<tr><th>Traffic Class</th><th>ESAL (مليون)</th><th>WC</th><th>BC</th><th>Base</th><th>Subbase</th></tr>
<tr><td>T1 (خفيف جداً)</td><td>< 0.3</td><td>50mm</td><td>—</td><td>150mm</td><td>150mm</td></tr>
<tr><td>T2 (خفيف)</td><td>0.3 – 1</td><td>50mm</td><td>60mm</td><td>150mm</td><td>200mm</td></tr>
<tr><td>T3 (متوسط)</td><td>1 – 3</td><td>50mm</td><td>70mm</td><td>200mm</td><td>200mm</td></tr>
<tr><td>T4 (ثقيل)</td><td>3 – 10</td><td>50mm</td><td>80mm</td><td>200mm</td><td>250mm</td></tr>
<tr><td>T5 (ثقيل جداً)</td><td>10 – 30</td><td>50mm</td><td>2×70mm</td><td>200mm</td><td>300mm</td></tr>
<tr><td>T6 (شديد الثقل)</td><td>> 30</td><td>50mm</td><td>2×80mm</td><td>250mm</td><td>350mm</td></tr>
</table>

<h3>🌡️ درجات الحرارة المعيارية</h3>
<table class="dm-table">
<tr><th>المرحلة</th><th>Conventional 60/70</th><th>PMB</th><th>QCS Ref</th></tr>
<tr><td>Mixing Temp (Plant)</td><td>155-165°C</td><td>165-175°C</td><td>S8 P5 Cl.5.5</td></tr>
<tr><td>Delivery to Site (DBM)</td><td>≥ 140°C</td><td>≥ 150°C</td><td>QCS 2024 S8</td></tr>
<tr><td>Delivery to Site (WC)</td><td>≥ 145°C</td><td>≥ 155°C</td><td>QCS 2024 S8</td></tr>
<tr><td>Laying Temp</td><td>≥ 125°C</td><td>≥ 140°C</td><td>S8 P5</td></tr>
<tr><td>Roller Start (Breakdown)</td><td>≥ 130°C</td><td>≥ 145°C</td><td>S8 P5</td></tr>
<tr><td>Roller Stop (Final)</td><td>60-80°C</td><td>70-90°C</td><td>S8 P5</td></tr>
</table>

<h3>🧪 معايير القبول — Pass/Fail</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>BC (Binder)</th><th>WC (Wearing)</th><th>QCS</th></tr>
<tr><td>Marshall Stability</td><td>≥ 8.0 kN (Conv) / ≥ 10.0 kN (PMB)</td><td>= BC</td><td>S8 P5</td></tr>
<tr><td>Marshall Flow</td><td>2-4 mm</td><td>2-4 mm</td><td>S8 P5</td></tr>
<tr><td>Air Voids (Mix)</td><td>3-5%</td><td>3-5%</td><td>S8 P5</td></tr>
<tr><td>VMA</td><td>≥ 14%</td><td>≥ 15%</td><td>S8 P5</td></tr>
<tr><td>Core Density</td><td>≥ 97% TMD</td><td>≥ 97% TMD</td><td>S8 P5</td></tr>
<tr><td>IRI (بعد الانتهاء)</td><td>—</td><td>≤ 2.5 m/km (Conv) / ≤ 0.9 (PMB)</td><td>S8 P5</td></tr>
<tr><td>Crossfall</td><td>—</td><td>2.5% ± 0.3%</td><td>QCS 2024 S6</td></tr>
</table>

<h3>🎯 نسب الـ Tack Coat</h3>
<table class="dm-table">
<tr><th>السطح</th><th>النسبة (L/m²)</th><th>نوع المستحلب</th></tr>
<tr><td>Granular Base → Asphalt</td><td>0.8 – 1.2 (Prime Coat)</td><td>MC-30 أو MC-70</td></tr>
<tr><td>Asphalt → Asphalt</td><td>0.15 – 0.35 (Tack Coat)</td><td>Cationic SS-1 أو K1-60</td></tr>
<tr><td>Milled Surface</td><td>0.25 – 0.45</td><td>Cationic</td></tr>
</table>
`};

// ═══════════════════════════════════════════════════════════════
// 9. pipe_quick_ref — مرجع اختيار المواسير
// ═══════════════════════════════════════════════════════════════
c["pipe_quick_ref"] = { title: '🔧 مرجع اختيار المواسير السريع — QCS 2024 + KAHRAMAA', content: `
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 — Section 20 + KAHRAMAA + Ashghal Material Standards
</div>

<h3>📊 جدول اختيار المواسير حسب الشبكة</h3>
<table class="dm-table">
<tr><th>الشبكة</th><th>المادة المعتمدة</th><th>PN/SN</th><th>Range DN</th><th>Standard</th></tr>
<tr><td>مياه الشرب (< 160mm)</td><td>HDPE PE100</td><td>PN16</td><td>50–160mm</td><td>ISO 4427</td></tr>
<tr><td>مياه الشرب (> 160mm)</td><td>DI (Ductile Iron)</td><td>K9</td><td>100–1200mm</td><td>ISO 2531</td></tr>
<tr><td>مياه الشرب (ضغط عالٍ)</td><td>DI أو Steel DWC</td><td>K9/K12</td><td>300mm+</td><td>AWWA C151</td></tr>
<tr><td>Foul Sewer (Gravity)</td><td>uPVC SN8</td><td>SN8</td><td>100–600mm</td><td>EN 1401</td></tr>
<tr><td>Foul Sewer (> 600mm)</td><td>GRP جرافيتي</td><td>SN5000</td><td>600–2400mm</td><td>ASTM D3262</td></tr>
<tr><td>Storm Water (Gravity)</td><td>RC (Concrete)</td><td>Class 2/3</td><td>300–1800mm</td><td>BS 5911</td></tr>
<tr><td>Storm Water (صغير)</td><td>uPVC أو HDPE</td><td>SN8</td><td>100–315mm</td><td>EN 1401</td></tr>
<tr><td>مياه معالجة (Irrigation)</td><td>HDPE PE80 أو PE100</td><td>PN10</td><td>50–400mm</td><td>ISO 4427</td></tr>
<tr><td>Reclaimed Water</td><td>HDPE بنفسجي</td><td>PN10</td><td>50–400mm</td><td>KAHRAMAA + MMUP</td></tr>
</table>

<h3>🎨 ألوان شريط التحذير الرسمي — KAHRAMAA</h3>
<table class="dm-table">
<tr><th>الشبكة</th><th>لون الشريط</th><th>اللون بالعربي</th><th>العمق</th></tr>
<tr><td>مياه الشرب</td><td style="background:#3498db;color:#fff;text-align:center;">BLUE</td><td>أزرق</td><td>300mm فوق الماسورة</td></tr>
<tr><td>Foul Sewer</td><td style="background:#27ae60;color:#fff;text-align:center;">GREEN</td><td>أخضر</td><td>300mm فوق الماسورة</td></tr>
<tr><td>Storm Drain</td><td style="background:#7f8c8d;color:#fff;text-align:center;">GREY</td><td>رمادي</td><td>300mm فوق الماسورة</td></tr>
<tr><td>مياه معالجة</td><td style="background:#8e44ad;color:#fff;text-align:center;">PURPLE</td><td>بنفسجي</td><td>300mm فوق الماسورة</td></tr>
<tr><td>كهرباء (كابلات)</td><td style="background:#e74c3c;color:#fff;text-align:center;">RED</td><td>أحمر</td><td>150mm فوق الكابل</td></tr>
<tr><td>غاز طبيعي</td><td style="background:#f39c12;color:#fff;text-align:center;">YELLOW</td><td>أصفر</td><td>300mm فوق الماسورة</td></tr>
<tr><td>اتصالات / فايبر</td><td style="background:#2c3e50;color:#fff;text-align:center;">BLACK</td><td>أسود</td><td>150mm فوق الكابل</td></tr>
</table>

<h3>📏 عمق الدفن — Minimum Cover</h3>
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
<tr><td>مياه شرب</td><td>Pressure Test</td><td>1.5×PN لمدة 2hr — هبوط ≤ 0.02 bar</td></tr>
<tr><td>Foul Sewer</td><td>Air Test</td><td>100mm WG لمدة 5 دقائق — هبوط ≤ 25mm WG</td></tr>
<tr><td>Storm</td><td>Water Test</td><td>لا تسريب لمدة 30 دقيقة</td></tr>
<tr><td>مياه شرب</td><td>Chlorination + Bacterio</td><td>Coliform = 0/100ml | Turbidity ≤ 1 NTU</td></tr>
<tr><td>جميع الشبكات</td><td>CCTV</td><td>Grade ≤ 2 — 100% المسافة</td></tr>
</table>
`};

})(); // end IIFE
