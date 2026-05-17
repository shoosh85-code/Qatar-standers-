#!/usr/bin/env python3
"""
QatarSpec Pro — Direct Arabic Translation Applicator
يُترجم lang-content-en إلى عربي هندسي مباشرة بدون API خارجي
QCS 2024 | Ashghal RDM | KAHRAMAA | MMUP
"""

import re
import sys
from bs4 import BeautifulSoup, NavigableString, Tag

# ═══════════════════════════════════════════════════════════════════
# القاموس الهندسي الشامل — QCS 2024 / Ashghal / KAHRAMAA
# ═══════════════════════════════════════════════════════════════════
ENG_DICT = {
    # ── Table Headers / Labels ────────────────────────────────────
    "Item": "البند",
    "Test": "الاختبار",
    "Stage": "المرحلة",
    "Frequency": "التكرار / التردد",
    "Reference Test": "مرجع الاختبار",
    "Acceptance": "معيار القبول",
    "Freq": "التردد",
    "Phase": "المرحلة",
    "Key Test": "الاختبار الرئيسي",
    "Description": "الوصف",
    "Requirement": "المتطلب",
    "Value": "القيمة",
    "Unit": "الوحدة",
    "Note": "ملاحظة",
    "Notes": "ملاحظات",
    "Action": "الإجراء",
    "Result": "النتيجة",
    "Standard": "المعيار",
    "Reference": "المرجع",
    "Specification": "المواصفة",
    "Category": "الفئة",
    "Parameter": "المعامل",
    "Method": "الطريقة",
    "Limit": "الحد",
    "Min": "الحد الأدنى",
    "Max": "الحد الأقصى",
    "Target": "الهدف",
    "Tolerance": "المسموح به",
    "Type": "النوع",
    "Class": "الصف / الفئة",
    "Grade": "الدرجة",
    "Size": "الحجم / المقاس",
    "Depth": "العمق",
    "Width": "العرض",
    "Thickness": "السماكة",
    "Length": "الطول",
    "Height": "الارتفاع",
    "Diameter": "القطر",
    "Spacing": "التباعد",
    "Cover": "الغطاء الخرساني",
    "Load": "الحمل",
    "Strength": "المقاومة",
    "Capacity": "السعة",
    "Duration": "المدة",
    "Period": "الفترة",
    "Rate": "المعدل",
    "Ratio": "النسبة",
    "Factor": "المعامل",
    "Coefficient": "المعامل",
    "Index": "المؤشر",
    "Temperature": "درجة الحرارة",
    "Pressure": "الضغط",
    "Flow": "التدفق",
    "Speed": "السرعة",
    "Time": "الوقت",
    "Date": "التاريخ",
    "Location": "الموقع",
    "Material": "المادة",
    "Materials": "المواد",
    "Equipment": "المعدات",
    "Source": "المصدر",
    "Quantity": "الكمية",
    "Minimum": "الحد الأدنى",
    "Maximum": "الحد الأقصى",
    "Typical": "نموذجي",
    "Required": "مطلوب",
    "Optional": "اختياري",
    "Mandatory": "إلزامي",
    "Approved": "معتمد",
    "Rejected": "مرفوض",
    "Pass": "ناجح",
    "Fail": "فاشل",
    "Hold Point": "نقطة توقف",
    "Hold Points": "نقاط توقف",
    "Witness Point": "نقطة مراقبة",
    "Witness": "مراقبة",
    "Review": "مراجعة",
    "Inspection": "الفحص",
    "Testing": "الاختبار",
    "Quality Control": "ضبط الجودة",
    "Quality Assurance": "ضمان الجودة",
    "QC": "ضبط الجودة",
    "QA": "ضمان الجودة",

    # ── Road Works ────────────────────────────────────────────────
    "Subgrade": "طبقة الأساس (Subgrade)",
    "Subbase": "طبقة الإسفلت الأساسية (Subbase)",
    "Base Course": "الطبقة الأساسية (Base Course)",
    "Road Base": "القاعدة الطرقية (Road Base)",
    "Wearing Course": "طبقة السطح (Wearing Course)",
    "Binder Course": "طبقة الربط (Binder Course)",
    "Prime Coat": "الطلاء التمهيدي (Prime Coat)",
    "Tack Coat": "طبقة الالتصاق (Tack Coat)",
    "Asphalt": "الإسفلت",
    "Bitumen": "البيتومين",
    "Compaction": "الدمك",
    "Density": "الكثافة",
    "Moisture": "الرطوبة",
    "Gradation": "التدرج الحبيبي",
    "Aggregate": "الركام",
    "Aggregates": "الركام",
    "Fines": "الحبيبات الناعمة",
    "Coarse": "الخشن",
    "Fine": "الناعم",
    "Marshall Stability": "صلابة مارشال",
    "Air Voids": "الفراغات الهوائية",
    "Flow Value": "قيمة الانسياب",
    "Bitumen Content": "نسبة البيتومين",
    "Mix Design": "تصميم الخلطة",
    "Job Mix Formula": "صيغة الخلطة الإنتاجية",
    "JMF": "صيغة الخلطة (JMF)",
    "Superpave": "Superpave",
    "Gyratory Compactor": "مدمك الجيراتوري",
    "Gyrations": "دورات الضغط",
    "Performance Grade": "درجة الأداء (PG)",
    "Penetration": "الاختراق",
    "Softening Point": "نقطة اللدونة",
    "Ductility": "اللدونة",
    "Rutting": "التخديد",
    "Fatigue": "الإجهاد",
    "Raveling": "التفتت",
    "Stripping": "التقشر",
    "Hamburg Wheel Track": "اختبار تتبع عجلة هامبورغ",
    "Dynamic Shear Rheometer": "جهاز القص الديناميكي (DSR)",
    "Bending Beam Rheometer": "جهاز كرة الثني (BBR)",
    "Rolling Thin Film Oven": "فرن الغشاء الرقيق (RTFOT)",
    "Pressure Aging Vessel": "وعاء التقادم بالضغط (PAV)",
    "Extraction": "الاستخلاص",
    "Laying temperature": "درجة الفرد",
    "laying temperature": "درجة الفرد",
    "Laying Temperature": "درجة الفرد",
    "Rolling": "الدرفلة / الحدلة",
    "Compaction Device": "جهاز الدمك",
    "blows": "ضربة",
    "Blows": "ضربة",
    "Traffic Level": "مستوى الحركة المرورية",
    "Major expressways": "الطرق السريعة الرئيسية",
    "IRI": "مؤشر الخشونة الدولية (IRI)",
    "Smoothness": "النعومة / الاستواء",
    "Skid Resistance": "مقاومة الانزلاق",
    "Crossfall": "الميل العرضي",
    "Superelevation": "الرفع الفائق",
    "Camber": "ميل السطح",
    "Kerbs": "الحواف الخرسانية",
    "Road markings": "الخطوط والإشارات المرورية",
    "Road Markings": "الخطوط والإشارات المرورية",
    "Traffic Signs": "اللافتات المرورية",
    "Pavement": "الرصيف / الرصف",
    "Handover": "التسليم النهائي",
    "As-Built": "رسومات التنفيذ الفعلي",
    "Punch List": "قائمة الأعمال المتبقية",
    "Nuclear density gauge": "مقياس الكثافة النووي",
    "Sand Cone": "اختبار المخروط الرملي",
    "Core": "الأسطوانة المحفورة (Core)",
    "Core Density": "كثافة الأسطوانة المحفورة",
    "TMD": "الكثافة النظرية القصوى (TMD)",
    "MDD": "الكثافة الجافة القصوى (MDD)",
    "OMC": "محتوى الرطوبة المثلى (OMC)",
    "Modified Proctor": "بروكتور المحسّن",
    "Standard Proctor": "بروكتور القياسي",
    "CBR": "نسبة تحمل كاليفورنيا (CBR)",
    "Soaked": "مشبع بالماء",
    "Unsoaked": "غير مشبع",

    # ── Concrete & Structural ─────────────────────────────────────
    "Concrete": "الخرسانة",
    "Reinforced Concrete": "الخرسانة المسلحة",
    "Reinforcement": "التسليح",
    "Rebar": "قضبان التسليح",
    "Steel": "الفولاذ / الحديد",
    "Formwork": "القالب / الشدة",
    "Shuttering": "الشدة الخشبية",
    "Curing": "المعالجة / التصليد",
    "Slump": "الهبوط (Slump)",
    "Water-Cement Ratio": "نسبة الماء/الإسمنت",
    "Cement": "الإسمنت",
    "Admixture": "الإضافات",
    "Admixtures": "الإضافات",
    "Aggregate Size": "حجم الركام",
    "Characteristic Strength": "المقاومة المميزة",
    "Compressive Strength": "مقاومة الضغط",
    "Tensile Strength": "مقاومة الشد",
    "Cube Strength": "مقاومة المكعب",
    "Cylinder Strength": "مقاومة الأسطوانة",
    "Cube": "مكعب اختبار",
    "Cylinder": "أسطوانة اختبار",
    "28-day strength": "مقاومة 28 يوم",
    "7-day strength": "مقاومة 7 أيام",
    "Batching": "الخلط والجرعة",
    "Mix": "الخلطة",
    "Pour": "صب الخرسانة",
    "Casting": "الصب",
    "Vibration": "الهزة / الاهتزاز",
    "Vibrator": "الهازة",
    "Raft Foundation": "الأساس اللبشة",
    "Strip Foundation": "الأساس الشريطي",
    "Pad Foundation": "الأساس المفرد",
    "Pile": "الركيزة (Pile)",
    "Piles": "الركائز",
    "Bored Pile": "ركيزة محفورة",
    "Driven Pile": "ركيزة مدقوقة",
    "Pile Cap": "قبعة الركيزة",
    "Beam": "الكمرة / الجسر",
    "Column": "العمود",
    "Slab": "البلاطة",
    "Wall": "الجدار",
    "Foundation": "الأساس",
    "Footing": "القدم / الحصيرة",
    "Retaining Wall": "جدار الاستناد",
    "Excavation": "الحفر",
    "Backfill": "الردم",
    "Compacted": "مدموك",
    "Compacted fill": "ردم مدموك",
    "Structural fill": "ردم إنشائي",

    # ── Utilities / Networks ──────────────────────────────────────
    "Water Supply": "شبكة المياه",
    "Potable Water": "المياه الصالحة للشرب",
    "Foul Sewer": "مجاري الصرف الصحي",
    "Storm Drainage": "تصريف مياه الأمطار",
    "Storm drain": "مصرف مياه الأمطار",
    "Treated Sewage Effluent": "المياه المعالجة (TSE)",
    "TSE": "مياه الصرف المعالجة (TSE)",
    "Pipeline": "خط الأنابيب",
    "Pipe": "الأنبوب",
    "Pipes": "الأنابيب",
    "Fitting": "التوصيلة",
    "Fittings": "التوصيلات",
    "Joint": "الوصلة",
    "Joints": "الوصلات",
    "Valve": "الصمام",
    "Fire Hydrant": "صنبور الحريق",
    "Manhole": "غرفة التفتيش",
    "Chamber": "الغرفة",
    "Bedding": "فرشة الأنبوب",
    "Haunching": "الدعامة الجانبية",
    "Surround": "التكسية",
    "Trench": "الخندق",
    "Excavation depth": "عمق الحفر",
    "Pressure test": "اختبار الضغط",
    "Hydraulic pressure test": "اختبار الضغط الهيدروليكي",
    "Air test": "اختبار الهواء",
    "Leakage test": "اختبار التسرب",
    "Disinfection": "التعقيم",
    "Chlorination": "الكلور التعقيمي",
    "Flushing": "الشطف",
    "Sterilisation": "التعقيم",
    "Sterilization": "التعقيم",
    "Laying": "التمديد / الفرش",
    "Installation": "التركيب",
    "Survey": "المسح والرفع المساحي",
    "CCTV": "الفحص بالكاميرا (CCTV)",
    "Gradient": "الميل",
    "Slope": "الميل",
    "Cover depth": "عمق الغطاء",
    "Separation distance": "مسافة الفصل",

    # ── Geotechnical ──────────────────────────────────────────────
    "Geotechnical": "جيوتقني",
    "Geotechnical Investigation": "التحقيق الجيوتقني",
    "Borehole": "بئر المسح (Borehole)",
    "Trial Pit": "حفرة اختبار",
    "Standard Penetration Test": "اختبار الاختراق القياسي (SPT)",
    "SPT": "اختبار الاختراق القياسي (SPT)",
    "SPT N-value": "قيمة N للاختراق القياسي",
    "Cone Penetration Test": "اختبار الاختراق بالمخروط (CPT)",
    "CPT": "اختبار الاختراق بالمخروط (CPT)",
    "Soil": "التربة",
    "Bearing Capacity": "قدرة تحمل التربة",
    "Safe Bearing Capacity": "قدرة التحمل الآمنة",
    "Ultimate Bearing Capacity": "قدرة التحمل القصوى",
    "Settlement": "الهبوط / الانضغاط",
    "Differential Settlement": "الهبوط التفاضلي",
    "Groundwater Level": "منسوب المياه الجوفية",
    "Water Table": "منسوب المياه الجوفية",
    "Cohesion": "التماسك",
    "Friction Angle": "زاوية الاحتكاك",
    "Plasticity Index": "مؤشر اللدونة (PI)",
    "Liquid Limit": "حد السيولة (LL)",
    "Plastic Limit": "حد اللدونة (PL)",
    "Particle Size Distribution": "توزيع حجم الحبيبات",
    "Grading": "التدرج",
    "Permeability": "النفاذية",
    "Consolidation": "الانضغاط التوطيدي",
    "Shear Strength": "مقاومة القص",
    "Triaxial Test": "اختبار الثلاثي المحاور",
    "Unconfined Compression": "الضغط غير المحصور",
    "Vane Shear Test": "اختبار القص بالريشة",
    "Field Density Test": "اختبار الكثافة الحقلية",
    "Laboratory": "المختبر",
    "Lab": "المختبر",
    "Sampling": "أخذ العينات",
    "Sample": "العينة",
    "Core Sample": "عينة الأسطوانة",
    "Disturbed sample": "عينة مضطربة",
    "Undisturbed sample": "عينة غير مضطربة",
    "Geotechnical Report": "تقرير الدراسة الجيوتقنية",
    "Rock": "الصخر",
    "Rock Quality Designation": "مؤشر جودة الصخر (RQD)",
    "RQD": "مؤشر جودة الصخر (RQD)",

    # ── Process & Execution ───────────────────────────────────────
    "Method Statement": "بيان المنهجية",
    "Execution": "التنفيذ",
    "Sequence": "التسلسل",
    "Resources": "الموارد",
    "Planning": "التخطيط",
    "Mobilisation": "التعبئة والتجهيز",
    "Mobilization": "التعبئة والتجهيز",
    "Pre-construction": "قبل الإنشاء",
    "Construction": "الإنشاء",
    "Post-construction": "بعد الإنشاء",
    "Preparatory works": "أعمال تحضيرية",
    "Preparatory Works": "أعمال تحضيرية",
    "Pre-activity": "قبل النشاط",
    "During activity": "أثناء النشاط",
    "During Activity": "أثناء النشاط",
    "Post-activity": "بعد النشاط",
    "Post Activity": "بعد النشاط",
    "Approval": "الاعتماد",
    "Submission": "التقديم",
    "Submittal": "التقديم",
    "RFI": "طلب المعلومات (RFI)",
    "NCR": "تقرير عدم المطابقة (NCR)",
    "ITP": "خطة الفحص والاختبار (ITP)",
    "QCP": "خطة ضبط الجودة (QCP)",
    "As-built drawing": "رسم التنفيذ الفعلي",
    "As-Built Drawings": "رسومات التنفيذ الفعلي",
    "Shop Drawings": "رسومات التصنيع",
    "Design Drawings": "رسومات التصميم",
    "Certificate": "الشهادة",
    "Certification": "الاعتماد / الشهادة",
    "Manufacturer": "الشركة المصنّعة",
    "Supplier": "المورد",
    "Contractor": "المقاول",
    "Sub-contractor": "المقاول الثانوي",
    "Engineer": "المهندس",
    "Consultant": "الاستشاري",
    "Client": "صاحب العمل",
    "Employer": "صاحب العمل",
    "Supervisor": "المشرف",
    "Inspector": "المفتش",
    "Workers": "العمال",
    "Labour": "العمالة",

    # ── Common UI Phrases ─────────────────────────────────────────
    "Select": "اختر",
    "Open": "فتح",
    "View": "عرض",
    "Details": "التفاصيل",
    "Summary": "ملخص",
    "Overview": "نظرة عامة",
    "Introduction": "مقدمة",
    "Definition": "التعريف",
    "Definitions": "التعريفات",
    "Explanation": "الشرح",
    "Guide": "الدليل",
    "Steps": "الخطوات",
    "Procedure": "الإجراء",
    "Process": "العملية",
    "Checklist": "قائمة المراجعة",
    "Requirements": "المتطلبات",
    "Criteria": "المعايير",
    "Acceptance Criteria": "معايير القبول",
    "Key Points": "النقاط الرئيسية",
    "Important": "مهم",
    "Warning": "تحذير",
    "Note": "ملاحظة",
    "Tip": "نصيحة",
    "Example": "مثال",
    "Application": "التطبيق",
    "Use": "الاستخدام",
    "Purpose": "الهدف / الغرض",
    "Scope": "النطاق",
    "Objective": "الهدف",
    "Benefit": "الفائدة",
    "Advantage": "الميزة",
    "Disadvantage": "العيب",
    "Comparison": "المقارنة",
    "Difference": "الفرق",
    "Similarity": "التشابه",

    # ── Directions / Phase labels ─────────────────────────────────
    "Before": "قبل",
    "During": "أثناء",
    "After": "بعد",
    "Pre": "قبل",
    "Post": "بعد",
    "Daily": "يومي",
    "Weekly": "أسبوعي",
    "Monthly": "شهري",
    "Per": "لكل",
    "Each": "كل",
    "Total": "إجمالي",
    "Average": "متوسط",
    "Minimum 1": "حد أدنى 1",
    "At least": "على الأقل",
    "Not less than": "لا يقل عن",
    "Not more than": "لا يزيد عن",
    "Once": "مرة واحدة",
    "Twice": "مرتان",
    "First": "أول",
    "Second": "ثاني",
    "Third": "ثالث",
    "Final": "نهائي",
    "Initial": "ابتدائي",
    "Intermediate": "وسطي",

    # ── Execution phases ──────────────────────────────────────────
    "Execution Phases": "مراحل التنفيذ",
    "Mandatory Sequence": "التسلسل الإلزامي",
    "Finishing": "أعمال الإنهاء",
    "Delivery": "التسليم",
    "Inspection and Testing Plan": "خطة الفحص والاختبار",
    "Inspection & Testing Plan": "خطة الفحص والاختبار",
    "Hold point": "نقطة توقف",
    "Witness point": "نقطة مراقبة",
    "Review point": "نقطة مراجعة",
    "Mandatory": "إلزامي",
    "Mandatory hold": "توقف إلزامي",

    # ── Common sentences / phrases ────────────────────────────────
    "Natural or compacted layer beneath pavement structure":
        "الطبقة الطبيعية أو المدموكة أسفل هيكل الرصيف",
    "Unbound granular layer for load distribution and drainage":
        "طبقة حبيبية غير مربوطة لتوزيع الأحمال وتصريف المياه",
    "High-quality granular layer forming the asphalt pavement foundation":
        "طبقة حبيبية عالية الجودة تُشكّل أساس الرصيف الإسفلتي",
    "Dense bitumen macadam binder course":
        "خلطة إسفلتية كثيفة الحبيبات — طبقة الربط",
    "Final pavement layer resisting direct friction":
        "الطبقة النهائية للرصيف تتحمل الاحتكاك المباشر",
    "Drinking water pipelines":
        "خطوط المياه الصالحة للشرب",
    "Sanitary sewer network":
        "شبكة الصرف الصحي",
    "Stormwater drainage network":
        "شبكة تصريف مياه الأمطار",
    "Material Approval": "اعتماد المواد",
    "During production": "أثناء الإنتاج",
    "After laying": "بعد الفرد",
    "JMF Approval": "اعتماد صيغة الخلطة (JMF)",
    "Once at design": "مرة واحدة عند التصميم",
    "Each shipment": "كل شحنة",
    "Every 400t or daily": "كل 400 طن أو يومياً",
    "Every 400t": "كل 400 طن",
    "Every 1000m²": "كل 1000 م²",
    "Every 400m Section": "كل قسم 400 م",
    "Every 500m²": "كل 500 م²",
    "Every 500m³": "كل 500 م³",
    "Per mix design": "لكل تصميم خلطة",
    "Per source change": "عند كل تغيير مصدر",
    "100%": "100٪",
    "per shift": "لكل وردية",
    "Per shift": "لكل وردية",
    "Each pour": "كل صبة",
    "Each truck": "كل شاحنة",
    "Each layer": "كل طبقة",
    "Per layer": "لكل طبقة",
    "An American asphalt design system":
        "نظام تصميم إسفلت أمريكي",
    "based on actual asphalt performance under weather and traffic conditions":
        "مبني على الأداء الفعلي للإسفلت تحت ظروف الطقس والحركة المرورية",
    "based on actual Asphalt performance under weather and traffic conditions":
        "مبني على الأداء الفعلي للإسفلت تحت ظروف الطقس والحركة المرورية",
    "instead of hammer": "بدلاً من المطرقة",
    "and classifies bitumen using the": "ويُصنّف البيتومين باستخدام",
    "system": "النظام",
    "Difference between Marshall and Superpave":
        "الفرق بين مارشال وـ Superpave",
    "Number of Gyrations": "عدد دورات الضغط",
    "Number of Compactions": "عدد جلسات الدمك",
    "Compaction Device": "جهاز الدمك",
    "Bitumen Classification": "تصنيف البيتومين",
    "Fine Aggregate Definition": "تعريف الركام الناعم",
    "Fine Aggregate definition": "تعريف الركام الناعم",
    "Air Voids Design": "تصميم الفراغات الهوائية",
    "Use in Qatar": "الاستخدام في قطر",
    "All roads": "جميع الطرق",
    "Sampling Frequency": "تردد أخذ العينات",
    "Moisture Sensitivity": "الحساسية للرطوبة",
    "Rutting resistance": "مقاومة التخديد",
    "Rutting Resistance": "مقاومة التخديد",

    # ── Gabbro / Aggregates ───────────────────────────────────────
    "Los Angeles Abrasion": "اختبار مقاومة التآكل (LAA)",
    "Aggregate Crushing Value": "قيمة سحق الركام (ACV)",
    "Aggregate Impact Value": "قيمة الصدم للركام (AIV)",
    "Polished Stone Value": "قيمة الحجر المصقول (PSV)",
    "Flakiness Index": "مؤشر الرقائقية (FI)",
    "Elongation Index": "مؤشر الاستطالة (EI)",
    "Water Absorption": "امتصاص الماء",
    "Specific Gravity": "الوزن النوعي",
    "Sand Equivalent": "معادل الرمل (SE)",
    "Methylene Blue": "اختبار الميثيلين الأزرق",
    "Gabbro": "الجبرو",
    "Limestone": "الحجر الجيري",
    "Quartzite": "الكوارتزيت",
    "Crushed stone": "حجر مكسور",
    "Natural gravel": "حصى طبيعي",
    "Geotextile": "النسيج الجيوتقني",
    "Geomembrane": "الغشاء الجيوتقني",
    "Geocomposite": "المركب الجيوتقني",
    "Tensile strength": "مقاومة الشد",
    "Puncture resistance": "مقاومة الثقب",
    "CBR puncture": "اختبار CBR للثقب",

    # ── KAHRAMAA / Utilities ──────────────────────────────────────
    "HDPE": "HDPE (البولي إيثيلين عالي الكثافة)",
    "uPVC": "uPVC (البولي فينيل كلوريد غير الملدَّن)",
    "DI": "الحديد الزهر المطيل (DI)",
    "GRP": "البوليستر المقوى بالزجاج (GRP)",
    "RCP": "أنبوب خرسانة مسلحة (RCP)",
    "Ductile Iron": "الحديد الزهر المطيل",
    "Polyethylene": "البولي إيثيلين",
    "Nominal diameter": "القطر الاسمي",
    "Internal diameter": "القطر الداخلي",
    "Outside diameter": "القطر الخارجي",
    "Wall thickness": "سماكة الجدار",
    "Pressure rating": "تصنيف الضغط",
    "PN": "الضغط الاسمي (PN)",
    "Electrofusion": "اللحام بالكهرباء",
    "Butt fusion": "اللحام الطرفي",

    # ── Structural / Phase4 ───────────────────────────────────────
    "Load Testing": "اختبار الحمل",
    "Static Load Test": "اختبار الحمل الساكن",
    "Dynamic Load Test": "اختبار الحمل الديناميكي",
    "Pile Integrity Test": "اختبار سلامة الركيزة",
    "Cross-hole Sonic Logging": "التسجيل الصوتي بين الثقوب",
    "Concrete Pour": "صبة الخرسانة",
    "Pre-pour inspection": "فحص ما قبل الصب",
    "Post-pour": "ما بعد الصب",
    "Bridge": "الجسر",
    "Bridge construction": "إنشاء الجسر",
    "Rebar installation": "تركيب التسليح",
    "Cover check": "فحص الغطاء الخرساني",
    "Splice length": "طول الوصل",
    "Lap length": "طول التراكب",
    "Anchor length": "طول الرسو",
    "Stirrups": "الكانات",
    "Links": "كانات الربط",
    "Starter bars": "قضبان البداية",
    "Foundation excavation": "حفر الأساسات",
    "Formation level": "مستوى التأسيس",
    "Cut off level": "مستوى القطع",
    "Blinding concrete": "خرسانة التسوية",
    "Lean mix concrete": "خرسانة الدك (Lean Mix)",
    "Waterproofing": "العزل المائي",
    "Waterproof membrane": "غشاء العزل المائي",
    "Drainage layer": "طبقة التصريف",
    "Asphalt paving": "رصف الإسفلت",
    "Water pipe laying": "تمديد خط المياه",

    # ── QC Plan Elements ──────────────────────────────────────────
    "Frequency of Testing": "تردد الاختبارات",
    "Test frequency": "تردد الاختبار",
    "Acceptance limit": "حد القبول",
    "Rejection limit": "حد الرفض",
    "Action limit": "حد الإجراء",
    "Warning limit": "حد التحذير",
    "Corrective Action": "الإجراء التصحيحي",
    "Corrective action": "الإجراء التصحيحي",
    "Non-conformance": "عدم المطابقة",
    "Non-Conformance Report": "تقرير عدم المطابقة",
    "Deviation": "الانحراف",
    "Concession": "التنازل",
    "Waiver": "التنازل",
    "Rework": "إعادة العمل",
    "Re-test": "إعادة الاختبار",
    "Remedial work": "الأعمال العلاجية",
    "Defect": "العيب",
    "Defects": "العيوب",
    "Deficiency": "القصور",
    "Snag": "الملاحظة / العيب البسيط",

    # ── General heading translations ──────────────────────────────
    "Overview": "نظرة عامة",
    "Scope of Work": "نطاق العمل",
    "Key Requirements": "المتطلبات الرئيسية",
    "Critical Parameters": "المعاملات الحرجة",
    "Execution Sequence": "تسلسل التنفيذ",
    "Quality Control Plan": "خطة ضبط الجودة",
    "Testing Plan": "خطة الاختبار",
    "Inspection Plan": "خطة الفحص",
    "Materials Required": "المواد المطلوبة",
    "Equipment Required": "المعدات المطلوبة",
    "Labour Required": "العمالة المطلوبة",
    "Safety Requirements": "متطلبات السلامة",
    "Environmental Requirements": "متطلبات البيئة",
    "Documentation Required": "المستندات المطلوبة",
    "References": "المراجع",
    "Applicable Standards": "المعايير المنطبقة",
    "Health and Safety": "الصحة والسلامة",
    "Traffic Management": "إدارة حركة المرور",
    "Traffic Management Plan": "خطة إدارة المرور",
    "Emergency Procedures": "إجراءات الطوارئ",
    "Risk Assessment": "تقييم المخاطر",
    "Method of Measurement": "طريقة القياس",
    "Basis of Payment": "أساس الدفع",

    # ── Road classification ───────────────────────────────────────
    "Expressway": "الطريق السريع",
    "Primary Arterial": "الطريق الرئيسي الأول",
    "Secondary Arterial": "الطريق الرئيسي الثاني",
    "Collector Road": "طريق الجمع",
    "Local Road": "الطريق المحلي",
    "Service Road": "طريق الخدمة",
    "Design Speed": "السرعة التصميمية",
    "Posted Speed": "السرعة المنشورة",
    "Right of Way": "حق الطريق (ROW)",
    "Lane Width": "عرض الحارة",
    "Stopping Sight Distance": "مسافة الرؤية للتوقف (SSD)",
    "Sight Distance": "مسافة الرؤية",
    "Horizontal Alignment": "المحاذاة الأفقية",
    "Vertical Alignment": "المحاذاة الرأسية",
    "Curve Radius": "نصف قطر المنحنى",
    "Gradient": "الميل الطولي",
}

# Ordered list of multi-word phrases to translate first (longest first)
PHRASE_KEYS = sorted(
    [k for k in ENG_DICT if ' ' in k],
    key=lambda x: -len(x)
)
WORD_KEYS = sorted(
    [k for k in ENG_DICT if ' ' not in k],
    key=lambda x: -len(x)
)


def translate_text_node(text: str) -> str:
    """Translate a text node using the dictionary."""
    result = text

    # Apply phrase translations first (longest match first)
    for phrase in PHRASE_KEYS:
        if phrase in result:
            result = result.replace(phrase, ENG_DICT[phrase])

    # Apply word translations
    for word in WORD_KEYS:
        # Match whole word only (not inside other words)
        pattern = r'\b' + re.escape(word) + r'\b'
        replacement = ENG_DICT[word]
        result = re.sub(pattern, replacement, result)

    return result


def translate_html_block(html: str) -> str:
    """
    Translate an HTML block to Arabic.
    Preserves all HTML tags, attributes, technical codes.
    Only translates visible text content.
    """
    soup = BeautifulSoup(html, 'html.parser')

    def process_node(node):
        if isinstance(node, NavigableString):
            text = str(node)
            # Don't translate if it's just whitespace or technical code
            stripped = text.strip()
            if not stripped:
                return
            # Don't translate if it's only numbers/symbols/codes
            if re.match(r'^[\d\s\.\%\+\-\=\≥\≤\×\°\/\(\)\[\],;:]+$', stripped):
                return
            # Don't translate if it starts with technical identifiers
            if re.match(r'^(QCS|ASTM|AASHTO|BS|ISO|KAHRAMAA|Ashghal|MMUP|QHDM|PWA|PG\d|PN\d|SN\d)', stripped):
                return
            # Apply translation
            translated = translate_text_node(text)
            if translated != text:
                node.replace_with(NavigableString(translated))
        elif isinstance(node, Tag):
            # Don't process script, style, code tags
            if node.name in ['script', 'style', 'code', 'pre']:
                return
            # Don't translate onclick attributes (keep JS)
            # Process child nodes
            for child in list(node.children):
                process_node(child)

    for child in list(soup.children):
        process_node(child)

    return str(soup)


def process_file(filepath: str) -> tuple[int, int]:
    """Process one data file. Returns (found, translated)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    count_found = 0
    count_translated = 0

    pattern = re.compile(
        r'(<div class="lang-content-ar">)(.*?)(</div>)(\s*\n\s*<div class="lang-content-en" style="display:none;">)',
        re.DOTALL
    )

    def replacer(m):
        nonlocal count_found, count_translated
        ar_content = m.group(2)
        arabic = len(re.findall(r'[\u0600-\u06FF]', ar_content))
        english = len(re.findall(r'[a-zA-Z]', ar_content))
        total = arabic + english

        if total < 30 or (total > 0 and english / total <= 0.4):
            # Already Arabic — skip
            return m.group(0)

        count_found += 1
        translated = translate_html_block(ar_content)
        count_translated += 1
        return m.group(1) + translated + m.group(3) + m.group(4)

    new_content = pattern.sub(replacer, content)

    if new_content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  💾 Saved: {filepath} ({count_translated}/{count_found} blocks translated)")
    else:
        print(f"  ⚠️ No changes: {filepath}")

    return count_found, count_translated


def main():
    files = [
        'data_content_roads.js',
        'data_content_utilities.js',
        'data_content_structural.js',
        'data_content_geotech.js',
        'data_content_phase4.js',
        'data_content_extra.js',
    ]

    import os
    # Change to repo directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_dir = os.path.dirname(script_dir)
    os.chdir(repo_dir)

    print("🚀 QatarSpec Pro — Arabic Translation Applicator")
    print("=" * 55)

    total_found = total_translated = 0
    for f in files:
        if not os.path.exists(f):
            print(f"  ❌ Not found: {f}")
            continue
        print(f"\n📂 {f}")
        found, translated = process_file(f)
        print(f"  → Found: {found} | Translated: {translated}")
        total_found += found
        total_translated += translated

    print(f"\n{'=' * 55}")
    print(f"✅ DONE: {total_translated}/{total_found} sections translated")

if __name__ == '__main__':
    main()
