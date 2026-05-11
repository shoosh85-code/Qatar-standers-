/**
 * QatarSpec Pro — Bilingual Translation Patch v1.0
 * الهدف: إصلاح data-en لكل العناصر التي تحتوي على data-ar
 * المنهج: Map كامل للترجمات + تطبيق تلقائي على كل العناصر
 * QCS 2024 / Ashghal RDM / KAHRAMAA 2024 terminology
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. خريطة الترجمات الكاملة
  // ═══════════════════════════════════════════════════════════════

  const TRANSLATIONS = {

    // ── Group Headers ──────────────────────────────────────────
    'البنية التحتية والطرق والمرافق': 'Infrastructure, Roads & Utilities',
    'الإنشاء والجيوتقنية': 'Structural & Geotechnical',
    'مركز التصميم والحاسبات': 'Design & Calculation Hub',
    'مركز المعدات والآليات': 'Equipment & Machinery Hub',
    'الأدوات الذكية والمستندات': 'AI Tools & Documentation',

    // ── Group Header Counts ────────────────────────────────────
    '5 أقسام': '5 Sections',
    '4 حاسبات': '4 Calculators',
    '8 أدوات': '8 Tools',
    '0 — مدمجة': '0 — Integrated',

    // ── Hero / UI ─────────────────────────────────────────────
    'الأقسام الرئيسية': 'Main Sections',
    'كل المواصفات القطرية في مكان واحد': 'All Qatar Standards in One Place',
    'دليل المواصفات القطرية': 'Qatar Engineering Standards Guide',
    'ابحث بذكاء في QCS 2024 الرسمي': 'Search intelligently in the official QCS 2024',
    'البحث الذكي في QCS 2024': 'Smart Search in QCS 2024',
    'عربي': 'Arabic',

    // ══════════════════════════════════════════════════════════
    // GROUP 1 — البنية التحتية والطرق والمرافق
    // ══════════════════════════════════════════════════════════

    // Card 1: أعمال الطرق
    'أعمال الطرق — QCS 2024 §S8': 'Road Works — QCS 2024 §S8',
    '📌 <strong>Subgrade:</strong> الطبقة الطبيعية أو المعبأة أسفل هيكل الرصيف · CBR ≥ 8% · دمك ≥ 95% Modified Proctor · QCS 2024 §S8-P2-Cl.2.3':
      '📌 <strong>Subgrade:</strong> Natural or compacted layer beneath pavement structure · CBR ≥ 8% · Compaction ≥ 95% Modified Proctor · QCS 2024 §S8-P2-Cl.2.3',
    '📌 <strong>Subbase:</strong> طبقة حبيبية غير مربوطة لتوزيع الأحمال وتصريف المياه · CBR ≥ 30% · دمك ≥ 95% Modified Proctor · QCS 2024 §S8-P3-Cl.3.2':
      '📌 <strong>Subbase:</strong> Unbound granular layer for load distribution and drainage · CBR ≥ 30% · Compaction ≥ 95% Modified Proctor · QCS 2024 §S8-P3-Cl.3.2',
    '📌 <strong>Road Base:</strong> طبقة حبيبية عالية الجودة تُشكّل أساس الرصيف الإسفلتي · CBR ≥ 80% · دمك ≥ 98% Modified Proctor · QCS 2024 §S8-P3-Cl.3.3':
      '📌 <strong>Road Base:</strong> High-quality granular layer forming the asphalt pavement foundation · CBR ≥ 80% · Compaction ≥ 98% Modified Proctor · QCS 2024 §S8-P3-Cl.3.3',
    '📌 <strong>DBM (Binder):</strong> خلطة إسفلتية كثيفة الحبيبات طبقة الربط · درجة فرد ≥ 140°C · دمك ≥ 96% Gmm · QCS 2024 §S8-P4-Cl.4.5':
      '📌 <strong>DBM (Binder):</strong> Dense bitumen macadam binder course · Laying temp ≥ 140°C · Compaction ≥ 96% Gmm · QCS 2024 §S8-P4-Cl.4.5',
    '📌 <strong>Wearing Course:</strong> الطبقة النهائية للرصيف تتحمل الاحتكاك المباشر · درجة فرد ≥ 145°C · دمك ≥ 98% Gmm · QCS 2024 §S8-P4-Cl.4.6':
      '📌 <strong>Wearing Course:</strong> Final pavement layer resisting direct friction · Laying temp ≥ 145°C · Compaction ≥ 98% Gmm · QCS 2024 §S8-P4-Cl.4.6',
    'QCS 2024 §S8 | Parts 2–4 | 5 ITPs ←': 'QCS 2024 §S8 | Parts 2–4 | 5 ITPs ←',

    // Card 2: شبكات المرافق
    'شبكات المرافق — QCS 2024 §S20': 'Utility Networks — QCS 2024 §S20',
    '📌 <strong>Water (Potable):</strong> خطوط المياه الصالحة للشرب · HDPE PN16 أو DI Class K9 · اختبار 1.5×PN لمدة 2hr · تعقيم ≥50 ppm · KAHRAMAA 2024 §W3':
      '📌 <strong>Water (Potable):</strong> Drinking water pipelines · HDPE PN16 or DI Class K9 · Pressure test 1.5×PN for 2hr · Sterilisation ≥50 ppm · KAHRAMAA 2024 §W3',
    '📌 <strong>Foul Sewer:</strong> شبكة الصرف الصحي · uPVC SN8 أو GRP · CCTV بعد التركيب · اختبار تسرب Air/Water · QCS 2024 §S20-P3-Cl.3.4':
      '📌 <strong>Foul Sewer:</strong> Sanitary sewer network · uPVC SN8 or GRP · CCTV after installation · Air/Water leakage test · QCS 2024 §S20-P3-Cl.3.4',
    '📌 <strong>Storm Drainage:</strong> شبكة تصريف مياه الأمطار · RCP Class III أو HDPE · ميل ≥ 0.5% · Ashghal RDM 2023 §SD-2':
      '📌 <strong>Storm Drainage:</strong> Stormwater drainage network · RCP Class III or HDPE · Gradient ≥ 0.5% · Ashghal RDM 2023 §SD-2',
    '📌 <strong>TSE (Treated Sewage):</strong> خطوط المياه المعالجة · HDPE PN10 لون بنفسجي · منفصلة عن المياه الصالحة · QCS 2024 §S20-P4-Cl.4.1':
      '📌 <strong>TSE (Treated Sewage):</strong> Treated effluent pipelines · HDPE PN10 purple colour · Separate from potable water · QCS 2024 §S20-P4-Cl.4.1',
    'QCS 2024 §S20 | KAHRAMAA 2024 | Ashghal RDM ←': 'QCS 2024 §S20 | KAHRAMAA 2024 | Ashghal RDM ←',

    // Card 3: معايير تصميم الطرق
    'معايير تصميم الطرق — QHDM 2019': 'Road Design Standards — QHDM 2019',
    '📌 <strong>عرض الحارة (Lane Width):</strong> عرض الحارة الواحدة حسب تصنيف الطريق · Expressway 3.75m · Primary Arterial 3.5m · Collector/Local 3.0–3.25m · QHDM 4th Ed. 2019 §4-1':
      '📌 <strong>Lane Width:</strong> Single lane width per road classification · Expressway 3.75m · Primary Arterial 3.5m · Collector/Local 3.0–3.25m · QHDM 4th Ed. 2019 §4-1',
    '📌 <strong>SSD (Stopping Sight Distance):</strong> مسافة الرؤية للتوقف الآمن · V=80km/h → SSD=160m · V=120km/h → SSD=285m · تُقاس من ارتفاع عين 1.05m إلى عائق 0.2m · QHDM 2019 §3-3':
      '📌 <strong>SSD (Stopping Sight Distance):</strong> Safe stopping sight distance · V=80km/h → SSD=160m · V=120km/h → SSD=285m · Measured from eye height 1.05m to 0.2m object · QHDM 2019 §3-3',
    '📌 <strong>Crossfall (ميل عرضي):</strong> ميل السطح العرضي لتصريف مياه الأمطار · Asphalt: 2.5% ± 0.3% · Superelevation max: 6% · QCS 2024 §S8-P4-Cl.4.8 | QHDM 2019 §5-2':
      '📌 <strong>Crossfall:</strong> Transverse surface slope for stormwater drainage · Asphalt: 2.5% ± 0.3% · Superelevation max: 6% · QCS 2024 §S8-P4-Cl.4.8 | QHDM 2019 §5-2',
    '📌 <strong>Superelevation:</strong> الرفع الفائق في المنحنيات الأفقية · حد أقصى 6% في قطر · معدل الانتقال ≤ 0.5% لكل 1m عرض حارة · QHDM 4th Ed. 2019 §5-3':
      '📌 <strong>Superelevation:</strong> Raised banking on horizontal curves · Maximum 6% in Qatar · Transition rate ≤ 0.5% per 1m lane width · QHDM 4th Ed. 2019 §5-3',
    'QHDM 4th Ed. 2019 | QCS 2024 §S8-P4 | Ashghal Standards ←': 'QHDM 4th Ed. 2019 | QCS 2024 §S8-P4 | Ashghal Standards ←',

    // Card 4: اشتراطات MMUP
    'اشتراطات MMUP — 2024': 'MMUP Requirements — 2024',
    '📌 <strong>Setback (إطار البناء):</strong> المسافة الإلزامية بين المبنى وحدود القطعة · أمامي ≥ 6m على الشوارع الرئيسية · جانبي ≥ 1.5–3m · خلفي ≥ 3m · MMUP 2024 §Zoning-3':
      '📌 <strong>Setback:</strong> Mandatory distance between building and plot boundary · Front ≥ 6m on main streets · Side ≥ 1.5–3m · Rear ≥ 3m · MMUP 2024 §Zoning-3',
    '📌 <strong>Coverage (نسبة البناء):</strong> نسبة المسقط الأفقي للمبنى إلى مساحة القطعة · سكني ≤ 60% · تجاري ≤ 70% · صناعي ≤ 65% · MMUP 2024 §BU-2':
      '📌 <strong>Coverage:</strong> Ratio of building footprint to plot area · Residential ≤ 60% · Commercial ≤ 70% · Industrial ≤ 65% · MMUP 2024 §BU-2',
    '📌 <strong>FAR (معامل استغلال المساحة):</strong> نسبة إجمالي مساحة الطوابق إلى مساحة القطعة · سكني 1.5–3.0 · تجاري 3.0–6.0 · يتحدد حسب التصنيف · MMUP 2024 §BU-3':
      '📌 <strong>FAR (Floor Area Ratio):</strong> Ratio of total floor area to plot area · Residential 1.5–3.0 · Commercial 3.0–6.0 · Determined by zone classification · MMUP 2024 §BU-3',
    '📌 <strong>Parking Ratios:</strong> عدد مواقف السيارات الإلزامي لكل استخدام · سكني: 1 موقف/وحدة + 10% للزوار · مكتبي: 1/50m² · تجاري: 1/30m² · MMUP 2024 §Traffic-4':
      '📌 <strong>Parking Ratios:</strong> Mandatory parking spaces per land use · Residential: 1 space/unit + 10% visitors · Office: 1/50m² · Commercial: 1/30m² · MMUP 2024 §Traffic-4',
    'MMUP 2024 | Zoning Regulations | Traffic Standards ←': 'MMUP 2024 | Zoning Regulations | Traffic Standards ←',

    // Card 5: Ashghal RDM
    'Ashghal RDM — QHDM 4th Ed. 2019': 'Ashghal RDM — QHDM 4th Ed. 2019',
    '📌 <strong>ROW (حق الطريق):</strong> العرض المحجوز لهيكل الطريق والمرافق · Expressway 80-120m · Primary 40-60m · Secondary 20-30m · QHDM 2019 §2-3':
      '📌 <strong>ROW (Right of Way):</strong> Reserved width for road structure and utilities · Expressway 80-120m · Primary 40-60m · Secondary 20-30m · QHDM 2019 §2-3',
    '📌 <strong>Design Speed:</strong> السرعة التصميمية التي تُحدد عناصر الهندسة الأفقية والرأسية · Expressway 120 km/h · Primary 80 km/h · Local 40-50 km/h · QHDM 2019 §3-2':
      '📌 <strong>Design Speed:</strong> Design speed determining horizontal and vertical geometry elements · Expressway 120 km/h · Primary 80 km/h · Local 40-50 km/h · QHDM 2019 §3-2',
    '📌 <strong>Lane Width:</strong> عرض الحارة المرورية الواحدة حسب تصنيف الطريق · Expressway 3.75m · Primary 3.5m · Local 3.0-3.25m · QHDM 2019 §4-1':
      '📌 <strong>Lane Width:</strong> Single traffic lane width per road classification · Expressway 3.75m · Primary 3.5m · Local 3.0-3.25m · QHDM 2019 §4-1',
    '📌 <strong>Utility Corridor:</strong> الممرات المخصصة لخطوط المرافق داخل ROW · Water/Sewer: جانب N أو E · كهرباء: الجانب المقابل · QHDM 2019 §8-2':
      '📌 <strong>Utility Corridor:</strong> Dedicated utility corridors within ROW · Water/Sewer: N or E side · Power: Opposite side · QHDM 2019 §8-2',
    'QHDM 4th Ed. 2019 | Ashghal Standards ←': 'QHDM 4th Ed. 2019 | Ashghal Standards ←',

    // Card 6: معدات المشاريع
    'معدات المشاريع — 66 معدة': 'Project Equipment — 66 Units',
    '• طرق: Grader, Roller, Paver, NDG (17) • مرافق: Excavator, Fusion, CCTV (16) • إنشاء: Pump, Mixer, Vibrator (14) • جسات: Rig, SPT, Shelby (19)':
      '• Roads: Grader, Roller, Paver, NDG (17) • Utilities: Excavator, Fusion Machine, CCTV (16) • Structural: Pump, Mixer, Vibrator (14) • Geotechnical: Rig, SPT, Shelby (19)',
    '[66 معدة + مواصفات] ←': '[66 Equipment + Specs] ←',

    // ══════════════════════════════════════════════════════════
    // GROUP 2 — الإنشاء والجيوتقنية
    // ══════════════════════════════════════════════════════════

    // Card 1: الكود الإنشائي
    'الكود الإنشائي — QCS 2024 §S5': 'Structural Code — QCS 2024 §S5',
    '📌 <strong>درجات الخرسانة:</strong> فئات المقاومة المحددة لكل عنصر إنشائي · C25 (عادي) · C32 (أعمدة) · C40 (جسور) · C50+ (مسبق الإجهاد) · QCS 2024 §S5-P4-Cl.4.2':
      '📌 <strong>Concrete Grades:</strong> Compressive strength classes per structural element · C25 (general) · C32 (columns) · C40 (beams/bridges) · C50+ (prestressed) · QCS 2024 §S5-P4-Cl.4.2',
    '📌 <strong>Concrete Cover:</strong> سُمك الغطاء الخرساني لحماية التسليح من الصدأ · Slab 25mm · Beam/Column 30mm · Foundation 50mm · Exposure XS 50mm · QCS 2024 §S5-P4-Cl.4.7':
      '📌 <strong>Concrete Cover:</strong> Reinforcement cover thickness against corrosion · Slab 25mm · Beam/Column 30mm · Foundation 50mm · Exposure XS 50mm · QCS 2024 §S5-P4-Cl.4.7',
    '📌 <strong>المعالجة (Curing):</strong> صيانة الخرسانة بعد الصب للحفاظ على الرطوبة · 7 أيام دنيا · Wet burlap + polythene · الطقس الحار: مياه باردة + ice ≤10% · QCS 2024 §S5-P4-Cl.4.12':
      '📌 <strong>Curing:</strong> Post-casting concrete maintenance to retain moisture · Minimum 7 days · Wet burlap + polythene · Hot weather: cold water + ice ≤10% · QCS 2024 §S5-P4-Cl.4.12',
    '📌 <strong>Lap Splice:</strong> طول الوصل بين قضبان التسليح · ≥ max(40φ, 300mm) للشدّ · ≥ max(30φ, 200mm) للضغط · QCS 2024 §S5-P5-Cl.5.4':
      '📌 <strong>Lap Splice:</strong> Reinforcement bar splice length · ≥ max(40φ, 300mm) in tension · ≥ max(30φ, 200mm) in compression · QCS 2024 §S5-P5-Cl.5.4',
    'QCS 2024 §S5 | Parts 4–5 | BS EN 1992 ←': 'QCS 2024 §S5 | Parts 4–5 | BS EN 1992 ←',

    // Card 2: الأساسات
    'الأساسات — QCS 2024 §S5': 'Foundations — QCS 2024 §S5',
    '📌 <strong>Pad/Strip Footing:</strong> أساسات سطحية تُستخدم على تربة ذات قدرة تحمّل كافية · قدرة تحمّل مسموح بها ≥ 150 kPa · غطاء خرساني ≥ 50mm · QCS 2024 §S5-P7-Cl.7.2':
      '📌 <strong>Pad/Strip Footing:</strong> Shallow foundations used on adequate bearing capacity soil · Allowable bearing capacity ≥ 150 kPa · Concrete cover ≥ 50mm · QCS 2024 §S5-P7-Cl.7.2',
    '📌 <strong>Raft Foundation:</strong> لبشة خرسانية تغطي المسقط الكامل للمبنى لتوزيع الأحمال · تُستخدم عند تباين التربة أو الأحمال العالية · سُمك ≥ 500mm للمباني متعددة الطوابق · QCS 2024 §S5-P7-Cl.7.4':
      '📌 <strong>Raft Foundation:</strong> Concrete slab covering the full building footprint for load distribution · Used on variable soils or high loads · Thickness ≥ 500mm for multi-storey buildings · QCS 2024 §S5-P7-Cl.7.4',
    '📌 <strong>Shoring (دعم الحفر):</strong> حماية جوانب الحفر من الانهيار · Sheet Pile أو Soldier Pile · دعم متدرج إذا عمق > 1.2m · BS 8004 + موافقة المهندس قبل الاستمرار · QCS 2024 §S5-P7-Cl.7.1':
      '📌 <strong>Shoring:</strong> Protection of excavation sides from collapse · Sheet Pile or Soldier Pile · Staged support if depth > 1.2m · BS 8004 + Engineer approval before proceeding · QCS 2024 §S5-P7-Cl.7.1',
    '📌 <strong>Dewatering:</strong> خفض منسوب المياه الجوفية أسفل مستوى الحفر · منسوب الضخ ≥ 500mm أسفل Formation Level · Well Point أو Deep Wells · QCS 2024 §S5-P7-Cl.7.1 | BS EN 1997':
      '📌 <strong>Dewatering:</strong> Lowering groundwater level below excavation · Pumping level ≥ 500mm below Formation Level · Well Point or Deep Wells · QCS 2024 §S5-P7-Cl.7.1 | BS EN 1997',
    'QCS 2024 §S5 | Part 7 | BS 8004 | BS EN 1997 ←': 'QCS 2024 §S5 | Part 7 | BS 8004 | BS EN 1997 ←',

    // Card 3: اختبار الخوازيق
    'اختبار الخوازيق — QCS 2024 §S5': 'Pile Testing — QCS 2024 §S5',
    '📌 <strong>Static Load Test (SLT):</strong> اختبار الحمل الساكن لقياس قدرة تحمّل الخازوق فعلياً · حِمل اختبار = 1.5× الحمل التصميمي · استمرار 72hr عند الحمل الأقصى · QCS 2024 §S5-P8-Cl.8.4 | BS EN 1537':
      '📌 <strong>Static Load Test (SLT):</strong> Static load test to measure actual pile bearing capacity · Test load = 1.5× design load · Sustained 72hr at maximum load · QCS 2024 §S5-P8-Cl.8.4 | BS EN 1537',
    '📌 <strong>PDA (Dynamic Load Test):</strong> اختبار ديناميكي بالمطرقة لتحليل طاقة الدق وقدرة التحمّل · CASE Method + CAPWAP Analysis · يُنفَّذ على ≥ 5% من الخوازيق · ASTM D4945 | QCS 2024 §S5-P8-Cl.8.5':
      '📌 <strong>PDA (Dynamic Load Test):</strong> Dynamic hammer test to analyse driving energy and bearing capacity · CASE Method + CAPWAP Analysis · Performed on ≥ 5% of piles · ASTM D4945 | QCS 2024 §S5-P8-Cl.8.5',
    '📌 <strong>PIT (Pile Integrity Test):</strong> اختبار نزاهة الخازوق للكشف عن عيوب الصب · Low Strain Impact Method · يُنفَّذ على 100% من الخوازيق المشبوهة · ASTM D5882 | QCS 2024 §S5-P8-Cl.8.6':
      '📌 <strong>PIT (Pile Integrity Test):</strong> Pile integrity test to detect casting defects · Low Strain Impact Method · Performed on 100% of suspected piles · ASTM D5882 | QCS 2024 §S5-P8-Cl.8.6',
    '📌 <strong>معدل الاختبار:</strong> نسب الاختبارات الإلزامية لضمان الجودة · SLT: ≥ 1% من عدد الخوازيق · PDA: ≥ 5% · PIT: 100% عند الشك · QCS 2024 §S5-P8-Cl.8.3 | BS EN 1536':
      '📌 <strong>Testing Rates:</strong> Mandatory testing ratios for quality assurance · SLT: ≥ 1% of pile count · PDA: ≥ 5% · PIT: 100% when suspected · QCS 2024 §S5-P8-Cl.8.3 | BS EN 1536',
    'QCS 2024 §S5-P8 | BS EN 1536 | ASTM D4945 | ASTM D5882 ←': 'QCS 2024 §S5-P8 | BS EN 1536 | ASTM D4945 | ASTM D5882 ←',

    // Card 4: مرجع الخرسانة السريع
    'مرجع الخرسانة السريع — QCS 2024 §S5': 'Quick Concrete Reference — QCS 2024 §S5',
    '📌 <strong>درجات الخرسانة (Mix Grades):</strong> مقاومة الضغط عند 28 يوم · Blinding C15 · Foundation/Slab C25 · Columns/Beams C32 · Bridges/Prestressed C40–C50 · QCS 2024 §S5-P4-Cl.4.2':
      '📌 <strong>Mix Grades:</strong> Compressive strength at 28 days · Blinding C15 · Foundation/Slab C25 · Columns/Beams C32 · Bridges/Prestressed C40–C50 · QCS 2024 §S5-P4-Cl.4.2',
    '📌 <strong>Slump Test:</strong> قياس قوام الخرسانة الطازجة في الموقع · عادي 75–125mm · مضخة 100–150mm · يُرفض إذا تجاوز الحد أو استخدم ماء إضافي · QCS 2024 §S5-P4-Cl.4.4 | BS EN 12350-2':
      '📌 <strong>Slump Test:</strong> Fresh concrete workability measurement on site · Normal 75–125mm · Pumped 100–150mm · Rejected if limit exceeded or water added · QCS 2024 §S5-P4-Cl.4.4 | BS EN 12350-2',
    '📌 <strong>Cube Testing:</strong> اختبار مكعبات الخرسانة لتحقق المقاومة · عينة كل 50m³ أو يومياً أيهما أقل · 3 مكعبات للاختبار (7d / 28d) · قبول عند fcu ≥ الدرجة المطلوبة · QCS 2024 §S5-P4-Cl.4.5 | BS EN 12390-3':
      '📌 <strong>Cube Testing:</strong> Concrete cube testing to verify compressive strength · Sample per 50m³ or daily, whichever is less · 3 cubes per sample (7d / 28d) · Accept when fcu ≥ specified grade · QCS 2024 §S5-P4-Cl.4.5 | BS EN 12390-3',
    '📌 <strong>فترة المعالجة (Curing):</strong> الحفاظ على الرطوبة والحرارة لاكتمال الإماهة · ≥ 7 أيام للخرسانة العادية · ≥ 10 أيام عند استخدام GGBS/PFA · Wet burlap + polythene في الطقس الحار · QCS 2024 §S5-P4-Cl.4.12':
      '📌 <strong>Curing Period:</strong> Maintaining moisture and temperature for full hydration · ≥ 7 days for normal concrete · ≥ 10 days with GGBS/PFA · Wet burlap + polythene in hot weather · QCS 2024 §S5-P4-Cl.4.12',
    'QCS 2024 §S5-P4 | BS EN 12350 | BS EN 12390 | BS 8500 ←': 'QCS 2024 §S5-P4 | BS EN 12350 | BS EN 12390 | BS 8500 ←',

    // Card 5: المساحة وضبط المحاور
    'المساحة وضبط المحاور — QCS 2024 §S1': 'Survey & Axis Control — QCS 2024 §S1',
    '📌 <strong>Centerline Setting Out:</strong> ضبط محور الطريق أو المنشأ · دقة أفقية ± 10mm · يُستخدم Total Station من نقاط ثابتة معتمدة · QCS 2024 §S1-P2-Cl.2.3 | FIDIC Cl.4.7':
      '📌 <strong>Centerline Setting Out:</strong> Road or structure centreline control · Horizontal accuracy ± 10mm · Total Station from approved control points · QCS 2024 §S1-P2-Cl.2.3 | FIDIC Cl.4.7',
    '📌 <strong>Level Control:</strong> ضبط المناسيب الرأسية للطبقات · تفاوت مسموح ± 6mm/10m · يُستخدم Digital Level Class II · BS 5606 | QCS 2024 §S1-P2-Cl.2.4':
      '📌 <strong>Level Control:</strong> Vertical level control for layers · Allowable tolerance ± 6mm/10m · Digital Level Class II · BS 5606 | QCS 2024 §S1-P2-Cl.2.4',
    '📌 <strong>Pile Position Tolerance:</strong> انحراف موضع الخازوق عن التصميم · أفقي ± 75mm · رأسي ± 25mm · يُقاس قبل الصب ويوثَّق في As-Built · QCS 2024 §S5-P8-Cl.8.2 | BS EN 1536':
      '📌 <strong>Pile Position Tolerance:</strong> Pile deviation from design position · Horizontal ± 75mm · Vertical ± 25mm · Measured before casting and documented in As-Built · QCS 2024 §S5-P8-Cl.8.2 | BS EN 1536',
    '📌 <strong>موافقة المهندس (FIDIC Cl.4.7):</strong> كل نقاط الضبط تُعتمد من المهندس قبل البدء · أي انحراف يُبلَّغ فوراً · As-Built Survey عند اكتمال كل مرحلة · FIDIC Cl.4.7 | QCS 2024 §S1-P1':
      '📌 <strong>Engineer Approval (FIDIC Cl.4.7):</strong> All control points approved by Engineer before commencing · Any deviation reported immediately · As-Built Survey upon completion of each phase · FIDIC Cl.4.7 | QCS 2024 §S1-P1',
    'QCS 2024 §S1 | BS 5606 | FIDIC Cl.4.7 | BS EN 1536 ←': 'QCS 2024 §S1 | BS 5606 | FIDIC Cl.4.7 | BS EN 1536 ←',

    // ══════════════════════════════════════════════════════════
    // GROUP 3 — مركز التصميم والحاسبات
    // ══════════════════════════════════════════════════════════

    'حاسبة المواصفات': 'Specifications Calculator',
    '• أدخل نتيجة أي اختبار • Pass أو Fail فوراً • مرجع QCS تلقائي': '• Enter any test result • Instant Pass or Fail • Automatic QCS reference',
    '[50+ اختبار] ←': '[50+ Tests] ←',

    'حاسبة ESAL': 'ESAL Calculator',
    'حاسبة أقطار المواسير': 'Pipe Diameter Calculator',
    '• Flow rate Q input • Velocity check m/s • Head loss calculation • Material selection': '• Flow rate Q input • Velocity check m/s • Head loss calculation • Material selection',
    '[Manning + Hazen] ←': '[Manning + Hazen] ←',

    'حاسبة الحديد والتسليح': 'Reinforcement Calculator',
    '• Input: exposure class • Output: cover depth mm • Lap length calculator • QCS S5 + BS 8666 ref': '• Input: exposure class • Output: cover depth mm • Lap length calculator • QCS S5 + BS 8666 ref',
    '[QCS S5 + BS 8666] ←': '[QCS S5 + BS 8666] ←',

    // ══════════════════════════════════════════════════════════
    // GROUP 4 — مركز المعدات والآليات
    // ══════════════════════════════════════════════════════════

    'معدات أعمال الطرق — QCS §S8': 'Road Works Equipment — QCS §S8',
    '📌 <strong>Motor Grader:</strong> تسوية Subgrade/Subbase · Blade 3.7-4.3m · مستوى ±10mm · QCS 2024 §S8-P2':
      '📌 <strong>Motor Grader:</strong> Subgrade/Subbase levelling · Blade 3.7-4.3m · Level ±10mm · QCS 2024 §S8-P2',
    '📌 <strong>Vibratory Roller:</strong> دمك الطبقات الحبيبية · 10-12 طن · ≥95% MDD Subgrade / ≥98% Base · QCS 2024 §S8-P3':
      '📌 <strong>Vibratory Roller:</strong> Granular layer compaction · 10-12 tonnes · ≥95% MDD Subgrade / ≥98% Base · QCS 2024 §S8-P3',
    '📌 <strong>Asphalt Paver:</strong> فرد الإسفلت بسُمك محدد · سرعة 3-5 m/min · سُمك design ±6mm · QCS 2024 §S8-P4':
      '📌 <strong>Asphalt Paver:</strong> Asphalt laying at specified thickness · Speed 3-5 m/min · Thickness tolerance ±6mm · QCS 2024 §S8-P4',
    '📌 <strong>Nuclear Density Gauge:</strong> قياس الكثافة ميدانياً · معاير 6 أشهر · Standard Count يومي · ASTM D2950':
      '📌 <strong>Nuclear Density Gauge:</strong> Field density measurement · Calibrated every 6 months · Standard Count daily · ASTM D2950',
    'QCS 2024 §S8 | 8 معدات رئيسية ←': 'QCS 2024 §S8 | 8 Main Equipment ←',

    'معدات أعمال المرافق — QCS §S20': 'Utility Works Equipment — QCS §S20',
    '📌 <strong>Pipe Fusion Machine:</strong> لحام Electrofusion + Butt Fusion · Temperature per ISO 12176 · Bead inspection 100% · QCS 2024 §S20':
      '📌 <strong>Pipe Fusion Machine:</strong> Electrofusion + Butt Fusion welding · Temperature per ISO 12176 · Bead inspection 100% · QCS 2024 §S20',
    '📌 <strong>Pressure Test Unit:</strong> اختبار ضغط خطوط المياه · 1.5×PN لمدة ساعتين · Drop ≤0.1 bar · KAHRAMAA 2024':
      '📌 <strong>Pressure Test Unit:</strong> Water pipeline pressure test · 1.5×PN for 2 hours · Drop ≤0.1 bar · KAHRAMAA 2024',
    '📌 <strong>CCTV Camera:</strong> فحص داخلي خطوط الصرف · Speed ≤0.1 m/s · Grade ≤2 مقبول · BS EN 13508':
      '📌 <strong>CCTV Camera:</strong> Internal inspection of drainage pipes · Speed ≤0.1 m/s · Grade ≤2 acceptable · BS EN 13508',
    '📌 <strong>Compaction Plate:</strong> دمك الردم في الخنادق · طبقات ≤200mm · ≥95% MDD حذر حول الماسورة · QCS 2024 §S8-P2':
      '📌 <strong>Compaction Plate:</strong> Trench backfill compaction · Layers ≤200mm · ≥95% MDD with care around pipes · QCS 2024 §S8-P2',
    'QCS 2024 §S20 | KAHRAMAA | BS EN 13508 ←': 'QCS 2024 §S20 | KAHRAMAA | BS EN 13508 ←',

    'معدات الأعمال الإنشائية — QCS §S5': 'Structural Works Equipment — QCS §S5',
    '📌 <strong>Transit Mixer:</strong> نقل الخرسانة · Temp ≤32°C · زمن ≤90 دقيقة (60 صيف) · QCS 2024 §S5-P4':
      '📌 <strong>Transit Mixer:</strong> Concrete transport · Temp ≤32°C · Time ≤90 min (60 summer) · QCS 2024 §S5-P4',
    '📌 <strong>Concrete Pump:</strong> ضخ الخرسانة · Boom 36-52m · Slump 100-150mm للضخ · QCS 2024 §S5-P4':
      '📌 <strong>Concrete Pump:</strong> Concrete pumping · Boom 36-52m · Slump 100-150mm for pumping · QCS 2024 §S5-P4',
    '📌 <strong>Internal Vibrator:</strong> دمك الخرسانة · Ø50-75mm · تردد ≥12,000 VPM · 10-15 ثانية/نقطة · QCS 2024 §S5':
      '📌 <strong>Internal Vibrator:</strong> Concrete compaction · Ø50-75mm · Frequency ≥12,000 VPM · 10-15 seconds/point · QCS 2024 §S5',
    '📌 <strong>Cover Meter:</strong> قياس concrete cover · Electromagnetic · Scan كل 2m² قبل الصب · BS EN 12504':
      '📌 <strong>Cover Meter:</strong> Concrete cover measurement · Electromagnetic · Scan every 2m² before casting · BS EN 12504',
    'QCS 2024 §S5 | BS EN 12350/12390 ←': 'QCS 2024 §S5 | BS EN 12350/12390 ←',

    'معدات الجسات والتربة — QCS §S3': 'Geotechnical Investigation Equipment — QCS §S3',
    '📌 <strong>Rotary Drill Rig:</strong> حفر الجسات ≥50m · Core recovery ≥85% · RQD log إلزامي · BS EN ISO 22476':
      '📌 <strong>Rotary Drill Rig:</strong> Borehole drilling ≥50m · Core recovery ≥85% · RQD log mandatory · BS EN ISO 22476',
    '📌 <strong>SPT Hammer:</strong> قياس N-value · 63.5 kg / 760mm drop · Auto-trip مُفضَّل · كل 1.5m · ASTM D1586':
      '📌 <strong>SPT Hammer:</strong> N-value measurement · 63.5 kg / 760mm drop · Auto-trip preferred · Every 1.5m · ASTM D1586',
    '📌 <strong>Shelby Tube:</strong> عينات undisturbed · Ø75mm thin-wall · Sealed + waxed فوراً · Lab خلال 48hr · ASTM D1587':
      '📌 <strong>Shelby Tube:</strong> Undisturbed samples · Ø75mm thin-wall · Sealed + waxed immediately · Lab within 48hr · ASTM D1587',
    '📌 <strong>DCP:</strong> تقدير CBR ميداني · CBR = 292/DCP^1.12 · كل 500m² · مقارنة مع Lab CBR · ASTM D6951':
      '📌 <strong>DCP:</strong> Field CBR estimation · CBR = 292/DCP^1.12 · Every 500m² · Compare with Lab CBR · ASTM D6951',
    'QCS 2024 §S3 | ASTM D1586/D1587 | BS EN ISO 22476 ←': 'QCS 2024 §S3 | ASTM D1586/D1587 | BS EN ISO 22476 ←',

    // ══════════════════════════════════════════════════════════
    // GROUP 5 — الأدوات الذكية والمستندات
    // ══════════════════════════════════════════════════════════

    'مولّد طريقة التنفيذ': 'Method Statement Generator',
    '• 12 نوع نشاط (خرسانة/أسفلت/حفر...) • Scope · Equipment · QC · Safety • مرجع QCS 2024 في كل بند • طباعة بتنسيق Ashghal فوراً':
      '• 12 activity types (concrete/asphalt/excavation...) • Scope · Equipment · QC · Safety • QCS 2024 reference in every clause • Instant print in Ashghal format',
    '[AI Generator] ←': '[AI Generator] ←',

    'لوحة التنفيذ الميداني': 'Field Execution Board',
    '• بطاقة صب الخرسانة — Pour Card • موافقة مادة MAR + NCR مخالفة • متابعة الاختبارات Pass/Fail • سجل يومي DWR + مساعد AI':
      '• Concrete Pour Card • Material Approval MAR + NCR non-conformance • Test tracking Pass/Fail • Daily Work Record DWR + AI assistant',
    '[Execution Hub] ←': '[Execution Hub] ←',

    'مولّد MOS / ITP': 'MOS / ITP Generator',
    '• توليد طريقة العمل تلقائياً • جداول ITP بنقاط H/W/R/M • 9 مراحل تنفيذ QCS 2024 • تصدير Ashghal رسمي':
      '• Automatic method statement generation • ITP schedules with H/W/R/M points • 9 QCS 2024 execution phases • Official Ashghal export',

    'نماذج Ashghal': 'Ashghal Forms',
    '• RFI — طلب معلومات • NCR — عدم مطابقة • DPR — تقرير يومي • ITP — خطة فحص':
      '• RFI — Request for Information • NCR — Non-Conformance Report • DPR — Daily Progress Report • ITP — Inspection & Test Plan',
    '[Forms Hub] ←': '[Forms Hub] ←',

    'محلل الوثائق الذكي': 'AI Document Analyser',
    '• تحليل عقود ومواصفات • استخراج بنود QCS • مقارنة مع المعايير':
      '• Contract and specification analysis • QCS clause extraction • Comparison with standards',
    '[AI Analyzer] ←': '[AI Analyzer] ←',

    'المفتش الذكي': 'AI Inspector',
    '• التقط صورة من الموقع • فحص مطابقة QCS • تقرير فوري بالعربي':
      '• Capture site photo • QCS compliance check • Instant report in Arabic',
    '[AI Inspector] ←': '[AI Inspector] ←',

    'QCS 2014 vs 2024 — أبرز التغييرات': 'QCS 2014 vs 2024 — Key Changes',
    '📌 <strong>§S5 الخرسانة:</strong> رُفع الحد الأدنى لدرجة الخرسانة في البيئة البحرية من C30 إلى C40 · زيادة الغطاء في XS من 40mm إلى 50mm · إضافة اشتراطات SCM (GGBS/PFA) · QCS 2024 §S5-P4 vs QCS 2014 §S5':
      '📌 <strong>§S5 Concrete:</strong> Minimum concrete grade in marine exposure raised from C30 to C40 · Cover in XS increased from 40mm to 50mm · SCM requirements added (GGBS/PFA) · QCS 2024 §S5-P4 vs QCS 2014 §S5',
    '📌 <strong>§S8 الطرق:</strong> تعديل نسب دمك Wearing Course من 97% إلى 98% Gmm · إضافة اشتراطات Superpave بديلاً لـ Marshall · تحديث جداول ESAL لمشاريع قطر · QCS 2024 §S8-P4 vs QCS 2014 §S8':
      '📌 <strong>§S8 Roads:</strong> Wearing Course compaction revised from 97% to 98% Gmm · Superpave requirements added replacing Marshall · ESAL tables updated for Qatar projects · QCS 2024 §S8-P4 vs QCS 2014 §S8',
    '📌 <strong>§S20 المرافق:</strong> إضافة قسم TSE (Treated Sewage Effluent) كشبكة مستقلة · تحديث اشتراطات HDPE من PN10 إلى PN16 · إلزامية CCTV بعد التركيب · QCS 2024 §S20 vs QCS 2014 §S20':
      '📌 <strong>§S20 Utilities:</strong> TSE (Treated Sewage Effluent) added as independent network · HDPE requirements updated from PN10 to PN16 · CCTV mandatory after installation · QCS 2024 §S20 vs QCS 2014 §S20',
    '📌 <strong>§S21 MEP:</strong> قسم جديد كامل للأنظمة الميكانيكية والكهربائية · توافق مع KAHRAMAA 2024 و QCDD · اشتراطات BMS للمباني فوق 5 طوابق · QCS 2024 §S21 (جديد كلياً)':
      '📌 <strong>§S21 MEP:</strong> Completely new section for mechanical and electrical systems · Compliance with KAHRAMAA 2024 and QCDD · BMS requirements for buildings over 5 floors · QCS 2024 §S21 (entirely new)',
    'QCS 2024 vs QCS 2014 | §S5 | §S8 | §S20 | §S21 ←': 'QCS 2024 vs QCS 2014 | §S5 | §S8 | §S20 | §S21 ←',

    'أكثر 20 NCR شيوعاً — ميدانياً': 'Top 20 Most Common NCRs — Field',
    '📌 <strong>Curing Failure:</strong> عدم معالجة الخرسانة المدة الكافية · ≥7 أيام رطوبة مستمرة · NCR فوري إذا جفّ السطح قبل 24hr · QCS 2024 §S5-P4-Cl.4.12':
      '📌 <strong>Curing Failure:</strong> Insufficient concrete curing period · ≥7 days continuous moisture · Immediate NCR if surface dries before 24hr · QCS 2024 §S5-P4-Cl.4.12',
    '📌 <strong>Insufficient Cover:</strong> غطاء خرساني أقل من المطلوب · Cover Meter قبل الصب · Foundation min 50mm · QCS 2024 §S5-P4-Cl.4.7':
      '📌 <strong>Insufficient Cover:</strong> Concrete cover below required minimum · Cover Meter before casting · Foundation min 50mm · QCS 2024 §S5-P4-Cl.4.7',
    '📌 <strong>Compaction Deficiency:</strong> دمك غير كافٍ للطبقات الحبيبية · Sand Cone أو NDG كل 500m² · ≥95% MDD Subgrade · QCS 2024 §S8-P2-Cl.2.5':
      '📌 <strong>Compaction Deficiency:</strong> Insufficient compaction of granular layers · Sand Cone or NDG every 500m² · ≥95% MDD Subgrade · QCS 2024 §S8-P2-Cl.2.5',
    '📌 <strong>Crossfall Deviation:</strong> انحراف ميل السطح عن المطلوب · WC: 2.5% ± 0.3% · 3m Straightedge كل 25m · QCS 2024 §S8-P4-Cl.4.8':
      '📌 <strong>Crossfall Deviation:</strong> Surface crossfall deviation from specified · WC: 2.5% ± 0.3% · 3m Straightedge every 25m · QCS 2024 §S8-P4-Cl.4.8',
    'QCS 2024 §S5 + §S8 | خبرة ميدانية ←': 'QCS 2024 §S5 + §S8 | Field Experience ←',

    'محلل المخططات الذكي': 'AI Drawing Analyser',
    'معايير MEP — قطر 2024': 'MEP Standards — Qatar 2024',
    '📌 <strong>كهرباء LV:</strong> معايير التوصيل والحماية الكهربائية · 415/240V 50Hz · IP44 داخلي / IP55 خارجي · Earth fault protection RCD ≤30mA · KAHRAMAA 2024 §E-4':
      '📌 <strong>LV Electrical:</strong> LV wiring and protection standards · 415/240V 50Hz · IP44 internal / IP55 external · Earth fault protection RCD ≤30mA · KAHRAMAA 2024 §E-4',
    '📌 <strong>مياه داخلية (Plumbing):</strong> شبكة المياه داخل المباني · HDPE PN16 أو PPR PN20 · WRAS approved · ضغط تشغيل ≤10 bar · QCS 2024 §S21-P2':
      '📌 <strong>Internal Plumbing:</strong> Internal building water network · HDPE PN16 or PPR PN20 · WRAS approved · Operating pressure ≤10 bar · QCS 2024 §S21-P2',
    '📌 <strong>Fire Fighting:</strong> منظومة الإطفاء والإنذار · Sprinkler: NFPA 13 · Fire Alarm: NFPA 72 · تصميم يُعتمد من QCDD · QCS 2024 §S21-P5':
      '📌 <strong>Fire Fighting:</strong> Fire suppression and detection system · Sprinkler: NFPA 13 · Fire Alarm: NFPA 72 · Design approved by QCDD · QCS 2024 §S21-P5',
    '📌 <strong>Drainage داخلي:</strong> شبكة الصرف الداخلية للمباني · uPVC أو Cast Iron · ميل ≥ 1:40 · Rodding Access كل 12m · QCS 2024 §S21-P3 | BS EN 752':
      '📌 <strong>Internal Drainage:</strong> Internal building drainage network · uPVC or Cast Iron · Gradient ≥ 1:40 · Rodding Access every 12m · QCS 2024 §S21-P3 | BS EN 752',
    'KAHRAMAA 2024 | QCS 2024 §S21 | NFPA | QCDD ←': 'KAHRAMAA 2024 | QCS 2024 §S21 | NFPA | QCDD ←',

  };

  // ═══════════════════════════════════════════════════════════════
  // 2. دالة تطبيق الترجمات
  // ═══════════════════════════════════════════════════════════════

  function applyTranslations() {
    let fixed = 0;
    let replaced = 0;
    let skipped = 0;

    // اختيار كل العناصر التي تحتوي على data-ar
    const elements = document.querySelectorAll('[data-ar]');

    elements.forEach(el => {
      const arText = el.getAttribute('data-ar');
      const existingEn = el.getAttribute('data-en');
      const translation = TRANSLATIONS[arText];

      if (!translation) {
        skipped++;
        return;
      }

      // إذا لم يكن data-en موجوداً، أضفه
      if (!existingEn) {
        el.setAttribute('data-en', translation);
        fixed++;
        return;
      }

      // إذا كان data-en يحتوي على عربي (وهمي)، استبدله
      if (/[\u0600-\u06FF]/.test(existingEn)) {
        el.setAttribute('data-en', translation);
        replaced++;
        return;
      }

      // data-en موجود وصحيح — لا تغيير
    });

    console.log(`[QatarSpec Translations] ✅ Fixed: ${fixed} | Replaced: ${replaced} | Skipped (no map): ${skipped}`);
    return { fixed, replaced, skipped };
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. تطبيق الترجمات على group-header-count
  // ═══════════════════════════════════════════════════════════════

  function fixGroupHeaderCounts() {
    const countMap = {
      '5 أقسام': '5 Sections',
      '4 حاسبات': '4 Calculators',
      '8 أدوات': '8 Tools',
      '0 — مدمجة': '0 — Integrated',
    };

    document.querySelectorAll('.group-header-count, [data-type="count"]').forEach(el => {
      const ar = el.getAttribute('data-ar');
      if (ar && countMap[ar] && !el.getAttribute('data-en')) {
        el.setAttribute('data-en', countMap[ar]);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. التحقق النهائي (PROTOCOL 4: Zero Hallucination)
  // ═══════════════════════════════════════════════════════════════

  function verify() {
    const results = {
      totalCards: 0,
      missingEn: [],
      arabicInEn: [],
      emptyEn: [],
    };

    document.querySelectorAll('.cat-card').forEach((card, i) => {
      results.totalCards++;
      const enEls = card.querySelectorAll('[data-en]');
      const noEnEls = card.querySelectorAll('[data-ar]:not([data-en])');

      noEnEls.forEach(el => {
        results.missingEn.push({ card: i + 1, text: el.getAttribute('data-ar').substring(0, 40) });
      });

      enEls.forEach(el => {
        const en = el.getAttribute('data-en');
        if (!en || en.trim() === '') {
          results.emptyEn.push({ card: i + 1, ar: el.getAttribute('data-ar').substring(0, 40) });
        } else if (/[\u0600-\u06FF]/.test(en)) {
          results.arabicInEn.push({ card: i + 1, en: en.substring(0, 40) });
        }
      });
    });

    console.log('=== [QatarSpec] Verification Report ===');
    console.log(`Total cat-cards: ${results.totalCards}`);
    console.log(`Missing data-en: ${results.missingEn.length}`, results.missingEn);
    console.log(`Arabic in data-en (fake): ${results.arabicInEn.length}`, results.arabicInEn);
    console.log(`Empty data-en: ${results.emptyEn.length}`, results.emptyEn);

    const passed = results.missingEn.length === 0 &&
                   results.arabicInEn.length === 0 &&
                   results.emptyEn.length === 0;

    console.log(passed ? '✅ ALL CHECKS PASSED' : '❌ ISSUES FOUND — see above');
    return results;
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. تشغيل
  // ═══════════════════════════════════════════════════════════════

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyTranslations();
      fixGroupHeaderCounts();
      verify();
    });
  } else {
    applyTranslations();
    fixGroupHeaderCounts();
    verify();
  }

  // تعريض للـ window للتشخيص اليدوي
  window.QS = window.QS || {};
  window.QS.translations = TRANSLATIONS;
  window.QS.applyTranslations = applyTranslations;
  window.QS.verifyTranslations = verify;

})();
