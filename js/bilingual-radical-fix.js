/**
 * QatarSpec Pro — Bilingual Radical Fix v1.0
 * =============================================
 * يحل مشكلة النسخة الإنجليزية بشكل جذري:
 * - يكتشف كل قسم يحتوي lang-content-ar بدون lang-content-en
 * - ينشئ lang-content-en تلقائياً بترجمة احترافية
 * - يعمل على كل الأقسام الحالية والمستقبلية
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // قاموس الترجمة الشامل — Arabic → English
  // ═══════════════════════════════════════════════════════════════
  var TR = {
    // ── رؤوس الجداول ─────────────────────────────────────────
    'المرجع': 'Reference',
    'البند': 'Item',
    'المتطلب': 'Requirement',
    'المعيار': 'Standard',
    'الاختبار': 'Test',
    'التكرار': 'Frequency',
    'المواصفة': 'Specification',
    'الاستخدام': 'Usage',
    'الشرط': 'Condition',
    'الجهة': 'Party',
    'المادة': 'Material',
    'القيمة': 'Value',
    'التوثيق': 'Documentation',
    'معيار القبول': 'Acceptance Criterion',
    'النوع': 'Type',
    'النشاط': 'Activity',
    'المرحلة': 'Phase',
    'السجل': 'Record',
    'الإجراء': 'Procedure',
    'العنصر': 'Element',
    'المعدة': 'Equipment',
    'الحالة': 'Status',
    'الوصف': 'Description',
    'الملاحظة': 'Remark',
    'الطبقة': 'Layer',
    'الوثيقة': 'Document',
    'طريقة الاختبار': 'Test Method',
    'التوقيت': 'Timing',
    'التردد': 'Frequency',
    'تعريف المرحلة': 'Phase Definition',
    'الخاصية': 'Property',
    'التفصيل': 'Detail',
    'الطريقة': 'Method',
    'الدرجة': 'Grade',
    'المسؤول': 'Responsible',
    'الهدف': 'Objective',
    'التصنيف': 'Classification',
    'درجة الحرارة': 'Temperature',
    'السرعة': 'Speed',
    'القطر': 'Diameter',
    'اللون': 'Colour',
    'الطول': 'Length',
    'الموقع': 'Location',
    'الشرح': 'Explanation',
    'التعريف': 'Definition',
    'الاختبارات': 'Tests',
    'الجهاز': 'Device',
    'المعيار QCS': 'QCS Standard',
    'نوع الطريق': 'Road Type',
    'نوع المادة': 'Material Type',
    'تصنيف الطريق': 'Road Classification',
    'سماكة الطبقة': 'Layer Thickness',
    'ضغط الاختبار': 'Test Pressure',
    'مدة الاختبار': 'Test Duration',
    'درجة الدمك': 'Compaction Degree',
    'درجة الConcrete': 'Concrete Grade',
    'نموذج Ashghal:': 'Ashghal Form:',

    // ── عناوين الأقسام ────────────────────────────────────────
    'مراحل التنفيذ — الترتيب الإلزامي': 'Execution Phases — Mandatory Sequence',
    'مراحل التنفيذ': 'Execution Phases',
    'المواد — Materials': 'Materials',
    'تصميم الخلطة — Mix Design': 'Mix Design',
    'التنفيذ والوصلات': 'Execution & Joints',
    'ضبط الجودة والاختبارات': 'Quality Control & Testing',
    'المواد غير المقبولة': 'Unacceptable Materials',
    'نقاط Fail فورية': 'Immediate Fail Points',
    'نقاط Hold الإلزامية': 'Mandatory Hold Points',
    'نقاط Witness': 'Witness Points',
    'المرحلة 1: التحضير والحفر': 'Phase 1: Preparation & Excavation',
    'المرحلة 2: التركيب': 'Phase 2: Installation',
    'المرحلة 3: اختبار الضغط الهيدروستاتيكي': 'Phase 3: Hydrostatic Pressure Test',
    'المرحلة 4: التعقيم والتطهير': 'Phase 4: Disinfection & Sterilisation',
    'المرحلة 5: التسليم': 'Phase 5: Handover',
    'المرحلة 1': 'Phase 1',
    'المرحلة 2': 'Phase 2',
    'المرحلة 3': 'Phase 3',
    'المرحلة 4': 'Phase 4',
    'المرحلة 5': 'Phase 5',
    'المرحلة 6': 'Phase 6',
    'المرحلة 7': 'Phase 7',
    'نظرة عامة': 'Overview',
    'التشطيبات': 'Finishing Works',
    'التسليم': 'Handover',
    'الإنتاج والفرش': 'Production & Laying',
    'الجوانت والدمك': 'Joints & Compaction',

    // ── مصطلحات أعمال الطرق ───────────────────────────────────
    'طبقة التربة الطبيعية': 'Natural Subgrade Layer',
    'التربة الطبيعية أو المحسّنة': 'Natural or Improved Soil',
    'المواد الحبيبية': 'Granular Materials',
    'الدمك': 'Compaction',
    'مواد الردم': 'Backfill Materials',
    'رمل نظيف': 'Clean Sand',
    'طبقة التحضير': 'Subgrade Preparation',
    'طبقة الأساس': 'Road Base Layer',
    'الطبقة الحبيبية': 'Granular Layer',
    'طبقة الربط': 'Binder Course',
    'الطبقة النهائية': 'Wearing Course',
    'طبقة التسوية': 'Levelling Course',
    'الإسفلت': 'Asphalt',
    'البيتومين': 'Bitumen',
    'الخلطة الإسفلتية': 'Asphalt Mix',
    'درجة الفرد': 'Laying Temperature',
    'فرد الإسفلت': 'Asphalt Laying',
    'درجة الحرارة عند الفرد': 'Laying Temperature',
    'الانبساط الحراري': 'Thermal Expansion',
    'المحور الأفقي': 'Horizontal Axis',
    'ميل عرضي': 'Crossfall',
    'الرفع الفائق': 'Superelevation',

    // ── مصطلحات شبكات المرافق ────────────────────────────────
    'شبكة مياه الشرب': 'Potable Water Network',
    'مياه الشرب': 'Potable Water',
    'شبكة الصرف الصحي': 'Foul Sewer Network',
    'الصرف الصحي': 'Foul Sewer',
    'شبكة الصرف السطحي': 'Storm Drainage Network',
    'الصرف السطحي': 'Storm Drainage',
    'مياه الأمطار': 'Stormwater',
    'شبكة المياه المعالجة': 'Treated Sewage Effluent (TSE) Network',
    'المياه المعالجة': 'Treated Sewage Effluent (TSE)',
    'الخندق': 'Trench',
    'عرض الخندق': 'Trench Width',
    'عمق الخندق': 'Trench Depth',
    'طبقة الفراش': 'Bedding Layer',
    'الردم': 'Backfill',
    'ردم الخندق': 'Trench Backfill',
    'الشريط التحذيري': 'Warning Tape',
    'اختبار الضغط': 'Pressure Test',
    'اختبار التسرب': 'Leakage Test',
    'اختبار الهواء': 'Air Test',
    'تعقيم الشبكة': 'Network Disinfection',
    'التعقيم': 'Disinfection / Sterilisation',
    'نسبة الكلور': 'Chlorine Concentration',
    'التطهير': 'Sterilisation',
    'كاميرا CCTV': 'CCTV Camera Inspection',
    'فحص CCTV': 'CCTV Inspection',
    'وصلة التمدد': 'Expansion Joint',
    'وصلة الأنبوب': 'Pipe Joint',
    'الوصلة': 'Joint',
    'لحام البولي إيثيلين': 'PE Welding / Fusion',
    'لحام الإندماج': 'Fusion Welding',
    'وحدة الدمج الحراري': 'Butt Fusion Machine',
    'التوصيل الكهربائي': 'Electrofusion',
    'سرعة التدفق': 'Flow Velocity',
    'التدفق': 'Flow',
    'الإنحدار': 'Gradient / Slope',
    'الميل': 'Gradient',
    'صندوق التفتيش': 'Inspection Chamber / Manhole',
    'فتحة التفتيش': 'Manhole',
    'بلاعة': 'Gully',
    'غرفة الصمام': 'Valve Chamber',

    // ── مصطلحات الخرسانة والإنشاء ───────────────────────────
    'الخرسانة': 'Concrete',
    'خرسانة مسلحة': 'Reinforced Concrete',
    'خرسانة عادية': 'Plain Concrete',
    'خرسانة التسوية': 'Blinding Concrete',
    'الغطاء الخرساني': 'Concrete Cover',
    'الغطاء': 'Cover',
    'التسليح': 'Reinforcement',
    'حديد التسليح': 'Reinforcement Steel',
    'قضبان التسليح': 'Reinforcement Bars / Rebar',
    'الكانات': 'Stirrups / Links',
    'طول الوصل': 'Lap Splice Length',
    'المعالجة': 'Curing',
    'الصب': 'Casting / Pouring',
    'الدمك الاهتزازي': 'Vibration Compaction',
    'المهماز': 'Internal Vibrator',
    'قالب الصب': 'Formwork',
    'الشدة الخشبية': 'Timber Formwork',
    'مكعبات الخرسانة': 'Concrete Cubes',
    'اختبار المكعبات': 'Cube Crushing Test',
    'اختبار الهبوط': 'Slump Test',
    'درجة الخرسانة': 'Concrete Grade',
    'الخوازيق': 'Piles',
    'الخازوق': 'Pile',
    'حفر الأساسات': 'Foundation Excavation',
    'الحفر': 'Excavation',
    'دعم الحفر': 'Excavation Support / Shoring',
    'سحب المياه الجوفية': 'Dewatering',
    'منسوب المياه الجوفية': 'Groundwater Level',
    'الأساسات السطحية': 'Shallow Foundations',
    'اللبشة': 'Raft Foundation',
    'القدم': 'Pad Footing',
    'الشريط الأساسي': 'Strip Footing',
    'الحمل الميت': 'Dead Load',
    'الحمل الحي': 'Live Load',
    'قدرة التحمل': 'Bearing Capacity',
    'قدرة التحمل المسموح بها': 'Allowable Bearing Capacity',

    // ── مصطلحات الاختبارات ───────────────────────────────────
    'كل دفعة': 'Per Batch',
    'كل 50m': 'Every 50m',
    'كل Section': 'Per Section',
    'كل 500m³': 'Per 500m³',
    'كل 500m²': 'Per 500m²',
    'كل 1000m²': 'Per 1000m²',
    'كل 2000m²': 'Per 2000m²',
    'كل 50m³': 'Per 50m³',
    'كل 1000m³': 'Per 1000m³',
    'كل 500م²': 'Per 500m²',
    'كل 25m': 'Every 25m',
    'كل وصلة': 'Per Joint',
    'كل أساس': 'Per Foundation',
    'كل Gully': 'Per Gully',
    'كل Pipe Run': 'Per Pipe Run',
    'كل حمولة': 'Per Load',
    'كل 25 طن': 'Per 25 tonnes',
    '100% بصري': '100% Visual',
    '100% كل الخوازيق': '100% All Piles',
    '100% كل ماسورة': '100% All Pipes',
    'مستمر': 'Continuous',
    'قياس مباشر': 'Direct Measurement',
    'بصري': 'Visual',
    '1 Set / 50m³': '1 Set / 50m³',
    '3 عينات/25t': '3 samples/25t',
    'اختبار إلزامي': 'Mandatory Test',
    'قبول مشروط': 'Conditional Acceptance',
    'رفض فوري': 'Immediate Rejection',
    'إيقاف فوري': 'Immediate Stop',

    // ── مصطلحات عامة ─────────────────────────────────────────
    'قبل الحفر': 'Before Excavation',
    'بعد التركيب': 'After Installation',
    'قبل الصب': 'Before Casting',
    'بعد الصب': 'After Casting',
    'قبل التسليم': 'Before Handover',
    'بعد الدمك': 'After Compaction',
    'عند التسليم': 'At Handover',
    'حسب التصميم': 'As Per Design',
    'مطابق': 'Compliant',
    'غير مطابق': 'Non-Compliant',
    'مقبول': 'Acceptable',
    'مرفوض': 'Rejected',
    'إلزامي': 'Mandatory',
    'اختياري': 'Optional',
    'مستمر': 'Continuous',
    'يومياً': 'Daily',
    'أسبوعياً': 'Weekly',
    'شهرياً': 'Monthly',
    'موافقة المهندس': 'Engineer\'s Approval',
    'موافقة إلزامية': 'Mandatory Approval',
    'وثيقة مطلوبة': 'Required Document',
    'التوثيق المطلوب': 'Required Documentation',
    'المسؤول الميداني': 'Field Engineer',
    'مهندس الموقع': 'Site Engineer',
    'مراقب الجودة': 'QC Inspector',
    'المقاول': 'Contractor',
    'المشاور': 'Consultant',
    'المالك': 'Client / Owner',
    'المهندس': 'Engineer',
    'اضغط للحساب': 'Click to Calculate',
    'احسب': 'Calculate',
    'النتيجة': 'Result',
    'إدخال البيانات': 'Data Input',
    'البيانات': 'Data',
    'الموقع': 'Site / Location',
    'التاريخ': 'Date',
    'رقم العقد': 'Contract No.',
    'اسم المشروع': 'Project Name',
    'مياه الشرب فوق دائماً': 'Potable water always above',
    'طباعة': 'Print',
    'تصدير': 'Export',
    'حفظ': 'Save',
    'إرسال': 'Submit',
    'تنزيل': 'Download',
    'رفع فيديو': 'Upload Video',
    'رفع ملف': 'Upload File',
    'ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة': 'Upload MP4/MOV video — saved for the session',
    'اضغط \"رفع فيديو\" لتحميل MP4 / MOV': 'Click "Upload Video" to load MP4 / MOV',

    // ── عبارات تحذيرية ───────────────────────────────────────
    'تنبيه:': 'Note:',
    'تحذير:': 'Warning:',
    'ملاحظة:': 'Note:',
    'هام:': 'Important:',
    'إلزامي:': 'Mandatory:',
    'ممنوع:': 'Prohibited:',
    'هذا الدليل مرجعي فقط': 'This guide is for reference only',
    'تحقق دائماً من المخططات الرسمية ووثائق العقد': 'Always verify against official drawings and contract documents',
    'المرجع الأساسي:': 'Primary Reference:',
    'يُحظر استخدام الآتي': 'The following are prohibited',
    'فشل فوري إذا': 'Immediate Fail if',
    'موقف وقف إلزامي': 'Mandatory Hold Point',
    'نقطة مشاهدة': 'Witness Point',
    'بدون موافقة مهندس': 'Without Engineer\'s Approval',
    'بدون استثناء': 'Without Exception',
    'أصلي': 'Original',

    // ── مصطلحات المستندات والنماذج ──────────────────────────
    'طلب المعلومات': 'Request for Information (RFI)',
    'تقرير عدم المطابقة': 'Non-Conformance Report (NCR)',
    'طريقة التنفيذ': 'Method Statement (MOS)',
    'خطة الفحص والاختبار': 'Inspection & Test Plan (ITP)',
    'التقرير اليومي': 'Daily Progress Report (DPR)',
    'سجل الجودة': 'Quality Record',
    'خطة الجودة': 'Quality Plan',
    'موافقة المادة': 'Material Approval Request (MAR)',
    'نموذج': 'Form',
    'النماذج': 'Forms',
    'سجل سريع': 'Quick Log',

    // ── مصطلحات الحاسبات والأدوات ───────────────────────────
    'حاسبة': 'Calculator',
    'حاسبة المواصفات': 'Specifications Calculator',
    'أدخل قيمة الاختبار': 'Enter Test Value',
    'اختر الاختبار': 'Select Test',
    'اختر المادة': 'Select Material',
    'نتيجة الاختبار': 'Test Result',
    'مطابق QCS': 'Compliant with QCS',
    'لا يطابق QCS': 'Non-Compliant with QCS',
    'مرجع QCS:': 'QCS Reference:',
    'حد القبول:': 'Acceptance Limit:',
    'القيمة المُدخلة:': 'Input Value:',
    'الناتج:': 'Result:',

    // ── وحدات القياس ─────────────────────────────────────────
    'ساعة': 'hour',
    'ساعتين': '2 hours',
    'دقيقة': 'minute',
    'أيام': 'days',
    'يوم': 'day',
    'أسبوع': 'week',
    'شهر': 'month',
    'سنة': 'year',
    'متر': 'metre',
    'سنتيمتر': 'centimetre',
    'ملليمتر': 'millimetre',
    'كيلومتر': 'kilometre',
    'طن': 'tonne',
    'كيلوجرام': 'kilogram',
    'لتر': 'litre',
    'متر مكعب': 'cubic metre',
    'متر مربع': 'square metre',
    'درجة مئوية': '°C',
    'بار': 'bar',
    'نيوتن': 'Newton',
    'كيلوباسكال': 'kPa',
    'ميجاباسكال': 'MPa',

    // ── جمل كاملة شائعة ──────────────────────────────────────
    'كل نقطة عالية + نهاية الخطوط': 'At each high point + end of lines',
    'كل Valve + كل تقاطع + كل 100m': 'At each Valve + each intersection + every 100m',
    '24 ساعة مملوء (لتشبع المفاصل)': '24 hours filled (for joint absorption)',
    'رفع الضغط تدريجياً': 'Increase pressure gradually',
    'أو تربة عضوية': 'or Organic Soil',
    '5 دقيقة': '5 minutes',
    '30 دقيقة': '30 minutes',
    '1 اختبار': '1 test',
    '3 عينات': '3 samples',
    'كل 2000m²': 'per 2,000m²',
    'حسب نوع الصب': 'Per casting type',
    'أو عند تغيير المصدر': 'or when source changes',
    '100% من الخوازيق': '100% of Piles',
    'كل 500m² أو 50m³': 'Per 500m² or 50m³',
    '≥ 4.5 MPa @ 28 يوم': '≥ 4.5 MPa @ 28 days',
    'مياه الشرب فوق دائماً': 'Potable water always above',
    'آخر تحديث: 2024': 'Last Updated: 2024',
    'طباعة': 'Print',
    '📋 نظرة عامة': '📋 Overview',
    '📐 المواصفات العامة': '📐 General Specifications',
    '1.0 — وثائق ما قبل التنفيذ': '1.0 — Pre-Execution Documents',
    '1.0 النطاق والمواد': '1.0 Scope & Materials',
    '1.0 المعدات': '1.0 Equipment',
    '1.3 المعدات والآليات': '1.3 Equipment & Machinery',
    '1.4 المواد': '1.4 Materials',
    '1 - الجسات': '1 - Geotechnical Investigation',
    '1 / اتجاه': '1 / direction',
    '1-2 / اتجاه': '1-2 / direction',
    'بدون تشقق': 'Without cracking',
    '✅ إلزامي': '✅ Mandatory',
    '(مراقبة — ليس قبول)': '(Monitoring — not acceptance)',
    '(القبول الرسمي QCS S5)': '(Official Acceptance per QCS S5)',
    '(منسوب الرصف)': '(Pavement Level)',
    '(جانت طولي)': '(Longitudinal Joint)',
    '(جانت عرضي)': '(Transverse Joint)',
    '(بار)': '(bar)',
    '% بالوزن الجاف للتربة': '% by dry weight of soil',
    '% بالوزن الجاف — LOI Method': '% by dry weight — LOI Method',
    '% المركبات الثقيلة': '% Heavy Vehicles',
    '0.5% (تربة)': '0.5% (soil)',
    '0.5% في التربة': '0.5% in soil',
    '0.5m أسفل Founding Level دائماً': '0.5m below Founding Level always',
    '0–300mm فوق الماسورة': '0–300mm above pipe',
    '1.2m (قد يختلف حسب التربة)': '1.2m (may vary by soil type)',
    '1.2m head فوق أعلى نقطة، 30 دقيقة': '1.2m head above highest point, 30 minutes',
    '1.2m إلزامي)': '1.2m mandatory)',
    '1.2m تحتاج Confined Space Permit': '1.2m requires Confined Space Permit',
    '1.2m يوقف العمل بدون Shoring Design': '1.2m stops work without Shoring Design',
    '1.2m — Dewatering إذا وُجدت مياه جوفية': '1.2m — Dewatering if groundwater present',
    '1.2m — Timber أو Sheet Pile': '1.2m — Timber or Sheet Pile',
    '1.5 × MWP (بار)': '1.5 × MWP (bar)',
    '1.5 × PN التصميمي': '1.5 × Design PN',
    '1.5 × PN لمدة ساعتين': '1.5 × PN for 2 hours',
    '1.5×PN لمدة 2hr — هبوط ≤ 0.02 bar': '1.5×PN for 2hr — drop ≤ 0.02 bar',
    'ساعتان': '2 hours',
    'دقيقتان': '2 minutes',
    'حسب قوة التدفق': 'Per flow capacity',
    'عدد الطوابق': 'Number of floors',
    'صالح ≤ 12 شهر': 'Valid ≤ 12 months',
    'مطلوب — صالح ≤ 12 شهر': 'Required — Valid ≤ 12 months',
    'كل 30 دقيقة (Pressure Chart)': 'Every 30 minutes (Pressure Chart)',
    'طول القسم المختبَر': 'Tested Section Length',
    'Gauge Calibration Certificate': 'Gauge Calibration Certificate',
    'Pre-soak قبل الاختبار': 'Pre-soak before test',
    'ملء الخط ببطء من أدنى نقطة': 'Fill line slowly from lowest point',
    'تهوية الهواء من كل ARV': 'Purge air from each ARV',
    'Pre-soak 24 ساعة': 'Pre-soak 24 hours',
    'رفع الضغط تدريجياً (≤ 0.5 بار/دقيقة)': 'Raise pressure gradually (≤ 0.5 bar/min)',
    'حتى ضغط الاختبار': 'up to test pressure',
    'تسجيل القراءات كل 30 دقيقة': 'Record readings every 30 minutes',
    'إذا هبط الضغط': 'If pressure drops',
    'البحث عن مصدر التسرب': 'Locate leakage source',
    'أُوقف فوراً': 'Stop immediately',
    'ملاحظات هامة:': 'Important Notes:',
  };

  // ═══════════════════════════════════════════════════════════════
  // دالة الترجمة الذكية — تترجم نص مع الحفاظ على الكودات التقنية
  // ═══════════════════════════════════════════════════════════════
  function translateText(text) {
    if (!text || !text.trim()) return text;

    // إذا لا يحتوي على عربي → لا تغيير
    if (!/[\u0600-\u06FF]/.test(text)) return text;

    var result = text;

    // الترجمة بالعبارات الكاملة أولاً (الأطول أولاً)
    var sortedKeys = Object.keys(TR).sort(function(a, b) { return b.length - a.length; });
    sortedKeys.forEach(function(ar) {
      if (result.indexOf(ar) !== -1) {
        result = result.split(ar).join(TR[ar]);
      }
    });

    return result;
  }

  // ═══════════════════════════════════════════════════════════════
  // ترجمة كل Text Nodes في عنصر HTML
  // ═══════════════════════════════════════════════════════════════
  function translateDOMNode(node) {
    if (node.nodeType === 3) { // Text node
      var original = node.textContent;
      var translated = translateText(original);
      if (translated !== original) {
        node.textContent = translated;
      }
    } else if (node.nodeType === 1) {
      // Skip script/style
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

      // ترجمة الـ attributes
      ['placeholder', 'title', 'alt', 'aria-label'].forEach(function(attr) {
        if (node.hasAttribute(attr)) {
          node.setAttribute(attr, translateText(node.getAttribute(attr)));
        }
      });

      // ترجمة الأبناء
      node.childNodes.forEach(function(child) {
        translateDOMNode(child);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // إنشاء lang-content-en من lang-content-ar
  // ═══════════════════════════════════════════════════════════════
  function createEnFromAr(arDiv) {
    // استنساخ كامل للـ AR div
    var enDiv = arDiv.cloneNode(true);
    enDiv.className = 'lang-content-en';

    // تحديث IDs لتجنب التكرار
    enDiv.querySelectorAll('[id]').forEach(function(el) {
      el.id = el.id + '-en';
    });

    // تحديث data-player و data-ph
    enDiv.querySelectorAll('[data-player]').forEach(function(el) {
      el.setAttribute('data-player', el.getAttribute('data-player') + '-en');
    });
    enDiv.querySelectorAll('[data-ph]').forEach(function(el) {
      el.setAttribute('data-ph', el.getAttribute('data-ph') + '-en');
    });

    // ترجمة كل النصوص
    translateDOMNode(enDiv);

    return enDiv;
  }

  // ═══════════════════════════════════════════════════════════════
  // الدالة الجذرية — تُضاف بعد كل openDetail / dmContent تحديث
  // ═══════════════════════════════════════════════════════════════
  function patchMissingEnContent(container) {
    if (!container) return;

    var arDivs = container.querySelectorAll('.lang-content-ar');
    if (!arDivs.length) return;

    arDivs.forEach(function(arDiv) {
      // هل يوجد lang-content-en في نفس الـ parent؟
      var parent = arDiv.parentNode;
      var hasEn = parent.querySelector('.lang-content-en');
      if (!hasEn) {
        // إنشاء lang-content-en وإدراجه بعد lang-content-ar
        var enDiv = createEnFromAr(arDiv);
        parent.insertBefore(enDiv, arDiv.nextSibling);
      }
    });

    // أيضاً: للأقسام بدون أي wrapper — لف المحتوى
    wrapUnlabelledContent(container);

    // تطبيق اللغة الحالية
    var lang = window.currentLang || localStorage.getItem('qsp_lang') || 'ar';
    applyLang(container, lang);
  }

  // ═══════════════════════════════════════════════════════════════
  // لف المحتوى غير المُصنَّف في lang wrappers
  // ═══════════════════════════════════════════════════════════════
  function wrapUnlabelledContent(container) {
    // إذا كان المحتوى لا يحتوي على lang-content-ar أصلاً
    var arDivs = container.querySelectorAll('.lang-content-ar');
    var enDivs = container.querySelectorAll('.lang-content-en');
    if (arDivs.length === 0 && enDivs.length === 0) {
      // المحتوى كله بلا تصنيف — يعمل في كلا اللغتين (لا نغير)
      // لكن نضمن ظهوره دائماً
      container.style.display = 'block';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // تطبيق اللغة على المحتوى
  // ═══════════════════════════════════════════════════════════════
  function applyLang(container, lang) {
    var isEn = (lang === 'en');
    container.querySelectorAll('.lang-content-ar').forEach(function(el) {
      el.style.display = isEn ? 'none' : 'block';
    });
    container.querySelectorAll('.lang-content-en').forEach(function(el) {
      el.style.display = isEn ? 'block' : 'none';
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // Hook على openDetail — بعد تحميل المحتوى
  // ═══════════════════════════════════════════════════════════════
  function hookOpenDetail() {
    var originalOpenDetail = window.QS && window.QS.openDetail;
    if (!originalOpenDetail) return false;

    window.QS.openDetail = function(key, opts) {
      // استدعاء الأصلي
      originalOpenDetail.call(this, key, opts);

      // بعد تأخير قصير لضمان اكتمال التحميل
      setTimeout(function() {
        var dmContent = document.getElementById('dmContent');
        if (dmContent) {
          patchMissingEnContent(dmContent);
        }
        // أيضاً: تحديث الـ panels
        document.querySelectorAll('.dm-panel-content, .panel-content, [data-panel-content]').forEach(function(panel) {
          patchMissingEnContent(panel);
        });
      }, 50);
    };
    return true;
  }

  // ═══════════════════════════════════════════════════════════════
  // Hook على setLang — لتطبيق التحديثات الجديدة
  // ═══════════════════════════════════════════════════════════════
  function hookSetLang() {
    var originalSetLang = window.setLang;
    if (!originalSetLang) return false;

    window.setLang = function(lang) {
      // أولاً: أضف EN المفقود في كل المحتوى المفتوح
      var dmContent = document.getElementById('dmContent');
      if (dmContent) patchMissingEnContent(dmContent);

      // ثم: استدعاء الأصلي
      originalSetLang.call(this, lang);
    };
    return true;
  }

  // ═══════════════════════════════════════════════════════════════
  // مراقب DOM — يلتقط أي محتوى جديد يُضاف
  // ═══════════════════════════════════════════════════════════════
  function startObserver() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              // إذا أُضيف محتوى يحتوي lang-content-ar
              if (node.querySelector && node.querySelector('.lang-content-ar')) {
                setTimeout(function() {
                  patchMissingEnContent(node);
                }, 30);
              }
              // إذا كان هو نفسه lang-content-ar
              if (node.classList && node.classList.contains('lang-content-ar')) {
                setTimeout(function() {
                  patchMissingEnContent(node.parentNode);
                }, 30);
              }
            }
          });
        }
      });
    });

    var dmContent = document.getElementById('dmContent');
    if (dmContent) {
      observer.observe(dmContent, { childList: true, subtree: true });
    }

    // مراقبة الـ body كذلك
    observer.observe(document.body, { childList: true, subtree: false });

    return observer;
  }

  // ═══════════════════════════════════════════════════════════════
  // تشغيل كل شيء
  // ═══════════════════════════════════════════════════════════════
  function init() {
    var hooked1 = hookOpenDetail();
    var hooked2 = hookSetLang();
    startObserver();

    // تطبيق فوري على أي محتوى موجود
    var dmContent = document.getElementById('dmContent');
    if (dmContent) patchMissingEnContent(dmContent);

    // تصدير للاستخدام اليدوي
    window.QS = window.QS || {};
    window.QS.bilingualPatch = {
      patchContainer: patchMissingEnContent,
      translateText: translateText,
      applyLang: applyLang,
      dictionary: TR,
    };

    console.log('[QatarSpec] Bilingual Radical Fix loaded ✅ | Hooks: openDetail=' + hooked1 + ' setLang=' + hooked2);
  }

  // انتظر حتى يُحمَّل كل شيء
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 200); // بعد تحميل inline-scripts.js
    });
  } else {
    setTimeout(init, 200);
  }

})();
