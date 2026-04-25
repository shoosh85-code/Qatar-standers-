// QatarSpec Pro — Content: extra sections
(function(){
  var c = window.QS_CONTENT = window.QS_CONTENT || {};

c["ashghal_forms"] = {
  title: '📝 نماذج Ashghal الرسمية',
  content: `
<div class="lang-content-ar">
<h3>نماذج المشاريع الرسمية — Ashghal</h3>
<table class="dm-table"><tr><th>النموذج</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td><strong>RFI — طلب معلومات</strong></td><td>استفسار رسمي عن المخططات أو المواصفات</td><td>FIDIC Cl.1.5</td></tr>
<tr><td><strong>NCR — تقرير عدم مطابقة</strong></td><td>توثيق أي عمل لا يطابق المواصفات</td><td>ISO 9001</td></tr>
<tr><td><strong>Daily Report</strong></td><td>تقرير يومي للأعمال المنجزة والمعدات والعمالة</td><td>Ashghal QMS</td></tr>
<tr><td><strong>Material Submittal</strong></td><td>تقديم مواد للاعتماد قبل الاستخدام</td><td>Ashghal Spec</td></tr>
<tr><td><strong>ITP — خطة الفحص والاختبار</strong></td><td>جدول Hold/Witness/Review لكل مرحلة</td><td>QCS 2024</td></tr>
</table>
<div class="dm-note">📌 استخدم أدوات التصدير أدناه لإنشاء النماذج بصيغة Excel أو PDF</div>
</div>
<div class="lang-content-en" style="display:none">
<h3>Ashghal Official Forms</h3>
<table class="dm-table"><tr><th>Form</th><th>Purpose</th><th>Reference</th></tr>
<tr><td><strong>RFI</strong></td><td>Request clarification on drawings or specs</td><td>FIDIC Cl.1.5</td></tr>
<tr><td><strong>NCR</strong></td><td>Document non-conforming work</td><td>ISO 9001</td></tr>
<tr><td><strong>Daily Report</strong></td><td>Daily progress, equipment, and manpower</td><td>Ashghal QMS</td></tr>
<tr><td><strong>Material Submittal</strong></td><td>Submit materials for approval before use</td><td>Ashghal Spec</td></tr>
<tr><td><strong>ITP</strong></td><td>Inspection & Test Plan with Hold/Witness points</td><td>QCS 2024</td></tr>
</table>
</div>`
};

c["ncr_quick_logger"] = {
  title: '🔴 سجّل NCR سريع',
  content: `
<div class="lang-content-ar">
<h3>NCR — Non-Conformance Report</h3>
<p>يُستخدم NCR لتوثيق أي عمل أو مادة لا تطابق متطلبات QCS 2024 أو المواصفات الخاصة بالمشروع.</p>
<h4>🔴 أكثر 10 NCR شيوعاً في قطر</h4>
<table class="dm-table"><tr><th>#</th><th>النوع</th><th>السبب الشائع</th><th>QCS Ref</th></tr>
<tr><td>1</td><td>فشل اختبار الدمك</td><td>عدم كفاية التمرير أو المحتوى المائي</td><td>S6 P5</td></tr>
<tr><td>2</td><td>Slump خارج الحد</td><td>إضافة ماء في الموقع</td><td>S5 P4</td></tr>
<tr><td>3</td><td>تغطية حديد التسليح</td><td>عدم استخدام spacers</td><td>S5 P3</td></tr>
<tr><td>4</td><td>سماكة الإسفلت</td><td>خطأ في ضبط الـ paver</td><td>S8 P6</td></tr>
<tr><td>5</td><td>فشل اختبار الضغط</td><td>وصلات غير محكمة</td><td>S8 P12</td></tr>
<tr><td>6</td><td>صب خرسانة بدون اعتماد</td><td>عدم الحصول على Hold Point</td><td>S5 P4</td></tr>
<tr><td>7</td><td>مواد غير معتمدة</td><td>استخدام material قبل الـ submittal</td><td>QCS S1</td></tr>
<tr><td>8</td><td>Air Voids خارج الحد</td><td>درجة حرارة فرد منخفضة</td><td>S8 P6</td></tr>
<tr><td>9</td><td>تشقق الخرسانة</td><td>عدم المعالجة الكافية</td><td>S5 P4</td></tr>
<tr><td>10</td><td>بعد الخوازيق</td><td>خطأ في setting out</td><td>S5 P7</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none">
<h3>NCR Quick Logger</h3>
<p>Use NCR to document any work or material not conforming to QCS 2024 or project specifications.</p>
<h4>🔴 Top 10 Common NCRs in Qatar</h4>
<table class="dm-table"><tr><th>#</th><th>Type</th><th>Common Cause</th><th>QCS Ref</th></tr>
<tr><td>1</td><td>Compaction failure</td><td>Insufficient passes or moisture</td><td>S6 P5</td></tr>
<tr><td>2</td><td>Slump out of range</td><td>Water added on site</td><td>S5 P4</td></tr>
<tr><td>3</td><td>Rebar cover</td><td>Missing spacers</td><td>S5 P3</td></tr>
<tr><td>4</td><td>Asphalt thickness</td><td>Paver setting error</td><td>S8 P6</td></tr>
<tr><td>5</td><td>Pressure test failure</td><td>Leaking joints</td><td>S8 P12</td></tr>
</table>
</div>`
};

c["doc_analyzer"] = {
  title: '📁 محلل الوثائق الذكي — Pro',
  content: `
<div class="lang-content-ar">
<h3>محلل الوثائق بالذكاء الاصطناعي</h3>
<div class="dm-note" style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:12px;margin:12px 0">
⭐ <strong>ميزة Pro حصرية</strong> — ارفع أي PDF (QCS، Ashghal، KAHRAMAA، MMUP) وسيحلله الذكاء الاصطناعي فوراً
</div>
<h4>ما يمكن تحليله:</h4>
<table class="dm-table"><tr><th>النوع</th><th>المخرجات</th></tr>
<tr><td>QCS 2024 / مواصفات</td><td>ملخص، متطلبات رئيسية، جداول مرجعية</td></tr>
<tr><td>ITP / Checklist</td><td>Hold Points، متطلبات الاختبار، تواريخ</td></tr>
<tr><td>جداول الكميات (BOQ)</td><td>تلخيص البنود، حساب الكميات</td></tr>
<tr><td>تقارير الجسات</td><td>تفسير SPT، توصيات التصميم</td></tr>
</table>
<p style="color:var(--text3);font-size:12px;margin-top:12px">ارفع الملف من قسم "ارفع المواصفات هنا" في الصفحة الرئيسية</p>
</div>
<div class="lang-content-en" style="display:none">
<h3>AI Document Analyzer — Pro Feature</h3>
<div class="dm-note">⭐ Upload any PDF (QCS, Ashghal, KAHRAMAA, MMUP) for instant AI analysis</div>
</div>`
};

c["drawing_analyzer"] = {
  title: '📐 محلل المخططات الذكي — Pro',
  content: `
<div class="lang-content-ar">
<h3>محلل المخططات الهندسية بالذكاء الاصطناعي</h3>
<div class="dm-note" style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:12px;margin:12px 0">
⭐ <strong>ميزة Pro حصرية</strong> — ارفع صورة المخطط وسيتحقق الذكاء الاصطناعي من مطابقته لـ QCS 2024
</div>
<h4>أنواع المخططات المدعومة:</h4>
<table class="dm-table"><tr><th>النوع</th><th>ما يُفحص</th></tr>
<tr><td>مخططات إنشائية</td><td>تغطية الحديد، قياسات الكمرات، الأعمدة</td></tr>
<tr><td>مقاطع طرق</td><td>سماكات الطبقات، عروض الحارات</td></tr>
<tr><td>مخططات مرافق</td><td>مسافات الدفن، أقطار المواسير</td></tr>
<tr><td>Shop Drawings</td><td>التحقق من التفاصيل مقابل المواصفات</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none">
<h3>AI Drawing Analyzer — Pro Feature</h3>
<div class="dm-note">⭐ Upload a drawing image for QCS 2024 compliance check</div>
</div>`
};

c["photo_analyzer"] = {
  title: '🔍 المفتش الذكي بالصور — Pro',
  content: `
<div class="lang-content-ar">
<h3>المفتش الميداني الذكي</h3>
<div class="dm-note" style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:12px;margin:12px 0">
⭐ <strong>ميزة Pro حصرية</strong> — التقط صورة من الموقع وسيتحقق الذكاء الاصطناعي من مطابقة العمل للمواصفات
</div>
<h4>ما يمكن فحصه بالصور:</h4>
<table class="dm-table"><tr><th>العمل</th><th>ما يُفحص</th><th>المرجع</th></tr>
<tr><td>حديد التسليح</td><td>التغطية، الفاصل، الربط</td><td>QCS S5 P3</td></tr>
<tr><td>فرد الإسفلت</td><td>السطح، الحواف، التوصيلات</td><td>QCS S8 P6</td></tr>
<tr><td>مد المواسير</td><td>الدعم، الميول، الوصلات</td><td>QCS S8 P12</td></tr>
<tr><td>الخرسانة</td><td>التشطيب، الشقوق، المعالجة</td><td>QCS S5 P4</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none">
<h3>Smart Field Inspector — Pro Feature</h3>
<div class="dm-note">⭐ Take a site photo for instant QCS 2024 compliance check</div>
</div>`
};

c["qcs_changes_2014_2024"] = {
  title: '📊 QCS 2014 vs QCS 2024 — أهم التغييرات',
  content: `
<div class="lang-content-ar">
<h3>أبرز التغييرات بين QCS 2014 و QCS 2024</h3>
<table class="dm-table"><tr><th>القسم</th><th>QCS 2014</th><th>QCS 2024</th><th>التأثير</th></tr>
<tr><td><strong>S5 — الخرسانة</strong></td><td>w/c ≤ 0.45 للبيئة العدوانية</td><td>w/c ≤ 0.40 (أكثر صرامة)</td><td>🔴 تغيير في Mix Design</td></tr>
<tr><td><strong>S5 — السبخة</strong></td><td>بدون تصنيف موحد</td><td>4 أصناف + إجراءات معالجة محددة (IAN-006)</td><td>🔴 إلزامي التحقق</td></tr>
<tr><td><strong>S6 — الطرق</strong></td><td>Crossfall 2-3%</td><td>2.5% ± 0.3% تفاوت</td><td>🟡 تحديث مواصفات الفحص</td></tr>
<tr><td><strong>S8 — الإسفلت</strong></td><td>Air Voids 3-5%</td><td>3-5% مع Tolerance ±0.5%</td><td>🟡 دقة أكبر في الاختبار</td></tr>
<tr><td><strong>S8 — المواسير</strong></td><td>Cover min 600mm</td><td>Cover min 750mm للطرق الرئيسية</td><td>🔴 تغيير في التصميم</td></tr>
<tr><td><strong>S1 — السلامة</strong></td><td>متطلبات عامة</td><td>HSE Plan إلزامي + Emergency Response</td><td>🟡 وثائق إضافية</td></tr>
<tr><td><strong>Test Freq</strong></td><td>1 اختبار / 500m</td><td>1 اختبار / 250m للطرق الرئيسية</td><td>🔴 ضعف تكلفة الاختبار</td></tr>
<tr><td><strong>Chloride</strong></td><td>Cl ≤ 0.15%</td><td>Cl ≤ 0.10% (أكثر صرامة)</td><td>🔴 مراجعة مصادر الرمل</td></tr>
</table>
<div class="dm-note">⚠️ هذا ملخص — دائماً ارجع للنص الرسمي QCS 2024 للمتطلبات الكاملة</div>
</div>
<div class="lang-content-en" style="display:none">
<h3>QCS 2014 vs QCS 2024 — Key Changes</h3>
<table class="dm-table"><tr><th>Section</th><th>QCS 2014</th><th>QCS 2024</th><th>Impact</th></tr>
<tr><td>S5 Concrete</td><td>w/c ≤ 0.45 aggressive env.</td><td>w/c ≤ 0.40 (stricter)</td><td>🔴 Mix Design revision</td></tr>
<tr><td>S5 Sabkha</td><td>No unified classification</td><td>4 classes + IAN-006 treatment</td><td>🔴 Mandatory check</td></tr>
<tr><td>S6 Roads</td><td>Crossfall 2-3%</td><td>2.5% ± 0.3% tolerance</td><td>🟡 Updated testing spec</td></tr>
<tr><td>S8 Pipes</td><td>Cover min 600mm</td><td>Cover min 750mm main roads</td><td>🔴 Design change</td></tr>
</table>
</div>`
};

c["top20_ncr"] = {
  title: '🔴 أكثر 20 NCR شيوعاً في قطر',
  content: `
<div class="lang-content-ar">
<h3>أكثر 20 NCR شيوعاً — مبني على خبرة ميدانية في مشاريع Ashghal</h3>
<table class="dm-table">
<tr><th>#</th><th>NCR</th><th>السبب الجذري</th><th>الإجراء التصحيحي</th><th>QCS</th></tr>
<tr><td>1</td><td>فشل دمك الـ Subgrade</td><td>محتوى مائي خارج الـ OMC ±2%</td><td>تعديل رطوبة + إعادة دمك</td><td>S6 P5</td></tr>
<tr><td>2</td><td>Slump خارج الحد</td><td>إضافة ماء غير معتمد</td><td>رفض الخلطة + NCR للمورد</td><td>S5 P4</td></tr>
<tr><td>3</td><td>Cover حديد تسليح ناقص</td><td>غياب Spacers أو حركتها</td><td>إضافة Spacers + إعادة الفحص</td><td>S5 P3</td></tr>
<tr><td>4</td><td>سماكة إسفلت ناقصة</td><td>خطأ في ضبط Paver Screed</td><td>إعادة الفرد للمنطقة</td><td>S8 P6</td></tr>
<tr><td>5</td><td>Air Voids خارج 3-5%</td><td>درجة حرارة منخفضة عند الفرد</td><td>Core tests + تقرير تصحيحي</td><td>S8 P6</td></tr>
<tr><td>6</td><td>فشل اختبار ضغط مياه</td><td>وصلات مفكوكة أو مواد رديئة</td><td>فحص كل وصلة + إعادة الاختبار</td><td>S8 P12</td></tr>
<tr><td>7</td><td>صب خرسانة قبل Hold Point</td><td>ضغط الجدول الزمني</td><td>إزالة الخرسانة + Stop Work</td><td>S5 P4</td></tr>
<tr><td>8</td><td>مواد بدون اعتماد</td><td>شراء بدون Material Submittal</td><td>وقف الاستخدام + تقديم submittal</td><td>S1</td></tr>
<tr><td>9</td><td>تشقق خرسانة مبكر</td><td>تعرض للشمس بدون curing</td><td>تطبيق Curing Compound فوراً</td><td>S5 P4</td></tr>
<tr><td>10</td><td>Marshall Stability ضعيف</td><td>تغيير مصدر الركام</td><td>مراجعة Mix Design + اعتماد جديد</td><td>S8 P5</td></tr>
<tr><td>11</td><td>خاصية انحدار Subbase غلط</td><td>خطأ في الرفع المساحي</td><td>تعديل طبقة الـ Subbase</td><td>S6 P4</td></tr>
<tr><td>12</td><td>Chloride content مرتفع</td><td>رمل مصدره الشاطئ</td><td>تغيير مصدر الرمل</td><td>S5 P2</td></tr>
<tr><td>13</td><td>اختبار سماكة Subbase فاشل</td><td>طبقات سميكة جداً دون تدرج</td><td>إعادة الدمك بطبقات لا تتجاوز 200mm</td><td>S6 P4</td></tr>
<tr><td>14</td><td>Lap Length حديد قصير</td><td>قطع الحديد بدون حساب</td><td>إضافة حديد تكميلي معتمد</td><td>S5 P3</td></tr>
<tr><td>15</td><td>بعد الخوازيق خاطئ</td><td>خطأ في Setting Out</td><td>مسح مستقل + تقرير هندسي</td><td>S5 P7</td></tr>
<tr><td>16</td><td>مياه جوفية أثناء الصب</td><td>Dewatering غير كافٍ</td><td>وقف الصب + تحسين الـ dewatering</td><td>S5 P4</td></tr>
<tr><td>17</td><td>Tack Coat رديء التطبيق</td><td>كمية غير منتظمة</td><td>إعادة التطبيق + فحص المعدل</td><td>S8 P5</td></tr>
<tr><td>18</td><td>Pipe Bedding ناقص</td><td>توفير في الرمل</td><td>حفر وإعادة تنفيذ الـ bedding</td><td>S8 P12</td></tr>
<tr><td>19</td><td>Manhole Level خاطئ</td><td>تجاهل Final Survey</td><td>رفع/خفض الـ manhole + إعادة الرصف</td><td>S8 P15</td></tr>
<tr><td>20</td><td>CCTV Grade C أو أعلى</td><td>عيوب في الـ sewer بعد الإنشاء</td><td>تقرير + إصلاح حسب WRc Code</td><td>S8 + BS EN 13508</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none">
<h3>Top 20 NCRs in Qatar — Field Experience</h3>
<p>Based on Ashghal project experience. See Arabic version for full details.</p>
</div>`
};

c["prequalification_checklist"] = {
  title: '✅ Checklist قبل كل مرحلة',
  content: `
<div class="lang-content-ar">
<h3>Checklist الجاهزية قبل بدء كل مرحلة</h3>
<h4>🛣️ قبل فرد الإسفلت</h4>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>✅ اعتماد Mix Design</td><td>Marshall + Superpave معتمدان</td><td>QCS S8 P5</td></tr>
<tr><td>✅ فحص Tack Coat</td><td>0.3-0.5 L/m² معتمد</td><td>QCS S8 P5</td></tr>
<tr><td>✅ درجة حرارة الخليط</td><td>150-165°C عند الإنزال</td><td>QCS S8 P6</td></tr>
<tr><td>✅ ITP موقّع</td><td>Hold Point المشرف موجود</td><td>Ashghal ITP</td></tr>
<tr><td>✅ معايرة المعدات</td><td>Paver + Roller calibrated</td><td>QCS S8</td></tr>
</table>
<h4>💧 قبل مد المواسير</h4>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>✅ اعتماد المواسير</td><td>Material Submittal موافق عليه</td><td>QCS S8 P12</td></tr>
<tr><td>✅ فحص القاع (Bedding)</td><td>رمل نظيف، سماكة 150mm min</td><td>QCS S8 P12</td></tr>
<tr><td>✅ Setting Out</td><td>مستوى + خط + ميل محدد</td><td>QCS S1</td></tr>
<tr><td>✅ Dewatering</td><td>منسوب المياه أسفل القاع</td><td>QCS S5</td></tr>
</table>
<h4>🏗️ قبل صب الخرسانة</h4>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>✅ فحص الحديد</td><td>Cover، Lap، Spacing صحيحة</td><td>QCS S5 P3</td></tr>
<tr><td>✅ الشدات</td><td>قوية، مستوية، مدهونة</td><td>QCS S5 P4</td></tr>
<tr><td>✅ Mix Design</td><td>معتمد + Cube samples جاهزة</td><td>QCS S5 P4</td></tr>
<tr><td>✅ Hold Point</td><td>موافقة المهندس قبل الصب</td><td>Ashghal ITP</td></tr>
<tr><td>✅ Curing plan</td><td>مياه أو compound جاهز</td><td>QCS S5 P4</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none">
<h3>Pre-Activity Checklist</h3>
<h4>Before Asphalt Paving</h4>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th><th>Ref</th></tr>
<tr><td>✅ Mix Design approved</td><td>Marshall + Superpave approved</td><td>QCS S8 P5</td></tr>
<tr><td>✅ Tack Coat applied</td><td>0.3-0.5 L/m²</td><td>QCS S8 P5</td></tr>
<tr><td>✅ Mix temp at delivery</td><td>150-165°C</td><td>QCS S8 P6</td></tr>
<tr><td>✅ ITP signed</td><td>Supervisor Hold Point present</td><td>Ashghal ITP</td></tr>
</table>
</div>`
};

})();
