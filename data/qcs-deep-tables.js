/**
 * qcs-deep-tables.js — QatarSpec Pro
 * Phase 3: جداول المعايير الهندسية العميقة
 * مصدر: QCS 2024 + Ashghal RDM 2023 + KAHRAMAA 2024
 * ⚠️ للمرجعية فقط — راجع الوثائق الأصلية قبل التطبيق
 */
(function () {
  'use strict';

  // ─── CSS مشترك للجداول ───
  const TABLE_STYLE = `
    <style>
      .dq-wrap { margin: 16px 0; border: 1px solid rgba(201,168,76,0.22); border-radius: 10px; overflow: hidden; }
      .dq-head { background: rgba(201,168,76,0.1); padding: 9px 14px; display:flex; align-items:center; justify-content:space-between; }
      .dq-title { color: var(--gold); font-weight: 700; font-size: 13px; }
      .dq-ref   { font-size: 10px; color: var(--text3); }
      .dq-table { width: 100%; border-collapse: collapse; font-size: 12px; }
      .dq-table th { background: rgba(201,168,76,0.06); padding: 8px 10px; text-align: right; color: var(--text2); font-weight: 700; border-bottom: 1px solid rgba(201,168,76,0.15); white-space: nowrap; }
      .dq-table td { padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,0.04); color: var(--text); direction: rtl; line-height: 1.5; }
      .dq-table tr:last-child td { border-bottom: none; }
      .dq-table tr:hover td { background: rgba(201,168,76,0.04); }
      .dq-pass  { color: #2ecc71; font-weight: 700; }
      .dq-fail  { color: #e74c3c; font-weight: 700; }
      .dq-warn  { color: #e67e22; font-weight: 700; }
      .dq-disc  { padding: 7px 14px; font-size: 10px; color: var(--text3); border-top: 1px solid rgba(201,168,76,0.1); background: rgba(0,0,0,0.15); }
      .dq-ncr-wrap { margin: 12px 0; }
      .dq-ncr-item { background: rgba(231,76,60,0.06); border: 1px solid rgba(231,76,60,0.2); border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; font-size: 12px; }
      .dq-ncr-title { color: #e74c3c; font-weight: 700; margin-bottom: 4px; }
      .dq-ncr-body  { color: var(--text2); line-height: 1.6; }
      .dq-hold-wrap { margin: 12px 0; }
      .dq-hold-item { background: rgba(231,174,0,0.06); border: 1px solid rgba(231,174,0,0.25); border-radius: 8px; padding: 9px 12px; margin-bottom: 6px; font-size: 12px; color: var(--text2); }
      .dq-hold-item::before { content: "⛔ HP: "; color: #e6ac00; font-weight: 700; }
    </style>
  `;

  // ─── helper: بناء جدول HTML ───
  function buildTable(title, ref, headers, rows, disclaimer) {
    const ths = headers.map(h => `<th>${h}</th>`).join('');
    const trs = rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    return `
      ${TABLE_STYLE}
      <div class="dq-wrap">
        <div class="dq-head">
          <span class="dq-title">📊 ${title}</span>
          <span class="dq-ref">${ref}</span>
        </div>
        <div style="overflow-x:auto">
          <table class="dq-table">
            <thead><tr>${ths}</tr></thead>
            <tbody>${trs}</tbody>
          </table>
        </div>
        ${disclaimer ? `<div class="dq-disc">⚠️ ${disclaimer}</div>` : ''}
      </div>`;
  }

  function buildNCR(items) {
    return `<div class="dq-ncr-wrap">` +
      items.map(i => `<div class="dq-ncr-item"><div class="dq-ncr-title">🔴 ${i.t}</div><div class="dq-ncr-body">${i.b}</div></div>`).join('') +
      `</div>`;
  }

  function buildHoldPoints(items) {
    return `<div class="dq-hold-wrap">` +
      items.map(i => `<div class="dq-hold-item">${i}</div>`).join('') +
      `</div>`;
  }

  // ════════════════════════════════════════════════════
  // SECTION 1: SUBGRADE — QCS 2024 §S6 Part 3
  // ════════════════════════════════════════════════════
  const SUBGRADE_TABLES = `
    <div style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px 14px;margin:14px 0;">
      <div style="color:var(--gold);font-weight:700;font-size:13px;margin-bottom:8px;">📋 جداول المعايير الكاملة — QCS 2024 §S6-Part3</div>
    </div>

    ${buildTable(
      'معايير قبول Subgrade — QCS 2024 §S6-P3-Cl.3.4',
      'ASTM D1557 / BS 1377-Part4',
      ['المعيار', 'الحد الأدنى', 'طريقة الاختبار', 'تردد الاختبار', 'الحكم'],
      [
        ['CBR (Soaked 4 days)', '≥ 8%', 'BS 1377-P4 / ASTM D1883', 'كل 500m² أو تغيّر التربة', '<span class="dq-fail">FAIL إذا &lt; 8%</span>'],
        ['Compaction (MDD)', '≥ 95% Modified Proctor', 'BS 1377-P4 / ASTM D1557', 'كل 500m² أو يومياً', '<span class="dq-fail">FAIL إذا &lt; 95%</span>'],
        ['Moisture Content', 'OMC ± 2%', 'BS 1377-P2', 'مع كل اختبار كثافة', '<span class="dq-warn">تحذير إذا خارج النطاق</span>'],
        ['Plasticity Index (PI)', '≤ 10%', 'BS 1377-P2 / ASTM D4318', 'لكل مصدر تربة', '<span class="dq-fail">FAIL إذا &gt; 10%</span>'],
        ['Linear Shrinkage (LS)', '≤ 3%', 'BS 1377-P2', 'لكل مصدر تربة', '<span class="dq-fail">FAIL إذا &gt; 3%</span>'],
        ['Organic Content', '≤ 2%', 'BS 1377-P3', 'لكل مصدر تربة', '<span class="dq-fail">FAIL إذا &gt; 2%</span>'],
        ['Sulphate Content (SO₃)', '≤ 0.5%', 'BS 1377-P3', 'لكل مصدر تربة', '<span class="dq-warn">يحتاج موافقة مهندس إذا &gt; 0.5%</span>'],
        ['Chloride Content', '≤ 0.6%', 'BS 1377-P3', 'لكل مصدر تربة', '<span class="dq-warn">يحتاج موافقة مهندس إذا &gt; 0.6%</span>'],
        ['سماكة الطبقة', '≤ 200mm لكل طبقة', 'قياس مباشر', 'كل طبقة قبل الدمك', '<span class="dq-fail">FAIL إذا &gt; 200mm</span>'],
      ],
      'للمرجعية فقط — راجع QCS 2024 §S6 الأصلي والمواصفة الخاصة بالمشروع قبل التطبيق'
    )}

    ${buildTable(
      'معايير الاختبارات الحقلية — NDG vs Sand Cone',
      'ASTM D2950 / ASTM D1556',
      ['طريقة الاختبار', 'المعيار', 'المميزات', 'العيوب', 'الاستخدام المناسب'],
      [
        ['NDG (Nuclear Density Gauge)', 'ASTM D2950', 'سريع (5 دقائق) · غير مدمر', 'يحتاج معايرة يومية · تصاريح radioactive', 'الاستخدام اليومي الروتيني'],
        ['Sand Cone', 'ASTM D1556', 'دقيق · مقبول للتحكيم', 'بطيء (30-45 دقيقة)', 'عند الخلاف أو التحقق'],
        ['Rubber Balloon', 'ASTM D2167', 'بديل Sand Cone', 'لا يصلح للتربة الحبيبية الخشنة', 'التربة الناعمة'],
        ['DCP (Dynamic Cone)', 'ASTM D6951', 'سريع · رخيص · تقريبي', 'CBR تقديري فقط', 'فحص أولي سريع'],
      ],
      'NDG يحتاج Standard Count يومياً + شهادة معايرة كل 6 أشهر + رخصة radiation safety'
    )}

    <div style="margin:12px 0;"><div style="color:var(--gold);font-weight:700;font-size:12px;margin-bottom:8px;">⛔ Hold Points إلزامية — Subgrade</div>
    ${buildHoldPoints([
      'موافقة المهندس على نتائج CBR قبل البدء في أي طبقة فوقية',
      'فحص Formation Level بالـ Level قبل فرد الـ Subbase',
      'اعتماد نتيجة كثافة ≥ 95% MDD قبل الاستمرار',
    ])}</div>

    <div style="margin:12px 0;"><div style="color:#e74c3c;font-weight:700;font-size:12px;margin-bottom:8px;">🔴 أشيع NCR في Subgrade</div>
    ${buildNCR([
      { t: 'CBR < 8% بعد الدمك', b: 'السبب: رطوبة خارج OMC±2% أو تربة ضعيفة. الحل: تهوية/إضافة ماء ثم إعادة الدمك واختبار CBR مجدداً.' },
      { t: 'كثافة < 95% MDD', b: 'السبب: سماكة طبقة > 200mm أو عدد مرات الدمك غير كافٍ. الحل: إعادة الدمك بسماكة أقل أو زيادة التعديات.' },
      { t: 'Rutting بعد أسبوع من الفرد', b: 'السبب: CBR كافٍ لكن ارتفاع منسوب المياه الجوفية أو مياه سطحية. الحل: dewatering + إعادة التقييم.' },
    ])}</div>
  `;

  // ════════════════════════════════════════════════════
  // SECTION 2: SUBBASE — QCS 2024 §S6 Part 3
  // ════════════════════════════════════════════════════
  const SUBBASE_TABLES = `
    <div style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px 14px;margin:14px 0;">
      <div style="color:var(--gold);font-weight:700;font-size:13px;margin-bottom:8px;">📋 جداول المعايير الكاملة — QCS 2024 §S6-Part3-Cl.3.5</div>
    </div>

    ${buildTable(
      'معايير قبول Subbase — QCS 2024 §S6-P3-Cl.3.5',
      'BS 1377 / ASTM D1557 / ASTM D1883',
      ['المعيار', 'الحد المطلوب', 'طريقة الاختبار', 'تردد الاختبار', 'الحكم'],
      [
        ['CBR (Soaked 4 days)', '≥ 30%', 'BS 1377-P4 / ASTM D1883', 'كل 500m²', '<span class="dq-fail">FAIL إذا &lt; 30%</span>'],
        ['Compaction (MDD)', '≥ 95% Modified Proctor', 'ASTM D1557', 'كل 500m²', '<span class="dq-fail">FAIL إذا &lt; 95%</span>'],
        ['Moisture Content', 'OMC ± 2%', 'BS 1377-P2', 'مع الكثافة', '<span class="dq-warn">تحقق إذا فشل الدمك</span>'],
        ['Max Particle Size', '≤ 75mm', 'BS 1377-P2 (Sieve)', 'لكل مصدر', '<span class="dq-fail">FAIL إذا &gt; 75mm</span>'],
        ['Plasticity Index (PI)', '≤ 6%', 'ASTM D4318', 'لكل مصدر', '<span class="dq-fail">FAIL إذا &gt; 6%</span>'],
        ['Los Angeles Abrasion', '≤ 45%', 'ASTM C131', 'لكل مصدر', '<span class="dq-fail">FAIL إذا &gt; 45%</span>'],
        ['Sulphate Content (SO₃)', '≤ 0.5%', 'BS 1377-P3', 'لكل مصدر', '<span class="dq-fail">FAIL إذا &gt; 0.5%</span>'],
        ['Flakiness Index', '≤ 35%', 'BS 812-P105', 'لكل مصدر', '<span class="dq-warn">تحذير إذا &gt; 30%</span>'],
        ['سماكة الطبقة المدموكة', '150–300mm (حسب التصميم)', 'قياس مباشر', 'كل 25m على المحور', '<span class="dq-fail">FAIL إذا خارج ±10mm</span>'],
        ['Tolerance Level', '±10mm من المنسوب التصميمي', 'Levelling survey', 'كل 25m', '<span class="dq-fail">FAIL إذا &gt; ±10mm</span>'],
      ],
      'راجع QCS 2024 §S6-Part3 الأصلي — الجداول 4:1 و 4:2 للتدرج الحبيبي الكامل'
    )}

    <div style="margin:12px 0;"><div style="color:var(--gold);font-weight:700;font-size:12px;margin-bottom:8px;">⛔ Hold Points — Subbase</div>
    ${buildHoldPoints([
      'اعتماد نتائج CBR ≥ 30% من المختبر قبل الفرد',
      'موافقة المهندس على Formation Level المنسّب بعد Subgrade',
      'فحص سماكة الطبقة بالـ Core Cutter قبل قبول Prime Coat',
    ])}</div>

    <div style="margin:12px 0;"><div style="color:#e74c3c;font-weight:700;font-size:12px;margin-bottom:8px;">🔴 أشيع NCR في Subbase</div>
    ${buildNCR([
      { t: 'CBR Subbase < 30%', b: 'السبب: مصدر مواد غير مطابق أو خلط مع تربة ناعمة. الحل: استبدال المواد من مصدر معتمد وإعادة الاختبار.' },
      { t: 'Tolerance Level خارج ±10mm', b: 'السبب: ضعف الـ Grading أو تراكم ماء على السطح. الحل: إعادة تسوية بالـ Grader + re-compact.' },
      { t: 'PI > 6% في مواد الـ Subbase', b: 'السبب: تلوث من التربة أسفل أو مصدر غير مطابق. الحل: رفع الطبقة واستبدال المواد.' },
    ])}</div>
  `;

  // ════════════════════════════════════════════════════
  // SECTION 3: CONCRETE — QCS 2024 §S5 Part 4
  // ════════════════════════════════════════════════════
  const CONCRETE_TABLES = `
    <div style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px 14px;margin:14px 0;">
      <div style="color:var(--gold);font-weight:700;font-size:13px;margin-bottom:8px;">📋 جداول المعايير الكاملة — QCS 2024 §S5-Part4</div>
    </div>

    ${buildTable(
      'درجات الخرسانة حسب الاستخدام — QCS 2024 §S5-P4-Cl.4.2',
      'BS EN 206-1 / BS 8500',
      ['درجة الخرسانة', 'fcu (28 يوم)', 'fcyl (28 يوم)', 'الاستخدام الرئيسي', 'ملاحظات'],
      [
        ['C15 / GEN2', '15 MPa', '12 MPa', 'Blinding / Mass Concrete غير إنشائي', 'لا يُستخدم للعناصر الإنشائية'],
        ['C25 / RC30', '25 MPa', '20 MPa', 'Foundations / Ground Slabs', 'الحد الأدنى للبيئة الداخلية'],
        ['C32 / RC40', '32 MPa', '26 MPa', 'Columns / Beams / Walls', 'الأكثر استخداماً في المباني'],
        ['C40 / RC50', '40 MPa', '32 MPa', 'Bridges / Marine Exposure / Prestressed', 'إلزامي للبيئة البحرية XS1-XS3'],
        ['C45 / RC55', '45 MPa', '36 MPa', 'Precast / Post-tensioned', 'يحتاج mix design معتمد'],
        ['C50+', '50+ MPa', '40+ MPa', 'High-Rise / Special Structures', 'يحتاج موافقة مهندس إنشائي + QA'],
      ],
      'fcu = مقاومة الضغط للمكعب 150mm | fcyl = مقاومة الضغط للأسطوانة 150×300mm'
    )}

    ${buildTable(
      'الغطاء الخرساني حسب درجة التعرض — QCS 2024 §S5-P4-Cl.4.7',
      'BS EN 1992-1-1 + QCS 2024 Qatar Amendments',
      ['درجة التعرض', 'الوصف', 'الغطاء الأدنى (nom)', 'درجة الخرسانة الدنيا', 'أمثلة'],
      [
        ['X0 / XC1', 'جاف داخلي — لا رطوبة', '20mm', 'C20', 'أرضيات داخلية — لا تسليح'],
        ['XC2', 'مبلل أحياناً', '25mm', 'C25', 'Foundations مع ضد رطوبة'],
        ['XC3 / XC4', 'تعرض معتدل / دوري للماء', '30mm', 'C30', 'Beams/Columns خارجية'],
        ['XS1', 'قريب من البحر (هواء مالح)', '40mm', 'C35', '&lt; 1km من البحر'],
        ['XS2 / XS3', 'غمر في ماء البحر / منطقة تقلبات', '50mm', 'C40', 'Piles بحرية — Jetty — Seawall'],
        ['XA1 / XA2', 'تربة أو مياه جوفية كيميائية', '40-50mm', 'C35-C40', 'Foundations في تربة كبريتاتية'],
      ],
      'الغطاء الاسمي = الغطاء الأدنى + 10mm (هامش التصنيع) — راجع QCS 2024 §S5-P4-Cl.4.7 للجدول الكامل'
    )}

    ${buildTable(
      'متطلبات الـ Slump Test — QCS 2024 §S5-P4-Cl.4.4',
      'BS EN 12350-2 / ASTM C143',
      ['نوع الاستخدام', 'Slump المطلوب', 'وقت التوصيل الأقصى', 'درجة الحرارة', 'الحكم'],
      [
        ['خرسانة عادية (Conventional)', '75–125mm', '90 دقيقة (صيف: 60 دقيقة)', '≤ 32°C', '<span class="dq-fail">REJECT إذا &gt; 150mm</span>'],
        ['خرسانة مضخة (Pumped)', '100–150mm', '90 دقيقة', '≤ 32°C', '<span class="dq-fail">REJECT إذا تجاوز أو نقص كثيراً</span>'],
        ['خرسانة ذاتية الدمك (SCC)', 'Flow 550–750mm', '90 دقيقة', '≤ 32°C', 'يُستخدم Slump Flow بدلاً من Slump'],
        ['خرسانة الطقس الحار', '50–100mm (أقل)', '60 دقيقة', '≤ 32°C — استخدم ice', '<span class="dq-fail">REJECT إذا &gt; 32°C عند الصب</span>'],
      ],
      'يُحظر إضافة ماء في الموقع — REJECT فوري — أعد الخلطة من المصنع'
    )}

    ${buildTable(
      'اختبار المكعبات — معدل وشروط القبول — QCS 2024 §S5-P4-Cl.4.5',
      'BS EN 12390-3 / BS EN 12350-1',
      ['الحجم', 'عدد العينات', 'عمر الاختبار', 'معيار القبول', 'إجراء الرفض'],
      [
        ['≤ 50m³', '3 مكعبات (150mm)', '7 أيام + 28 يوم', 'fcu ≥ الدرجة المحددة', 'Core Test أو هدم إذا فشل 28d'],
        ['50–100m³', '3 مكعبات لكل 50m³', '7 أيام + 28 يوم', 'fcu ≥ الدرجة المحددة', 'Core Test أو هدم إذا فشل 28d'],
        ['&gt; 100m³', 'كل يوم صب على الأقل', '7 أيام + 28 يوم', 'fcu ≥ الدرجة المحددة', 'Core Test أو هدم إذا فشل 28d'],
        ['نتيجة 7 أيام', '— تشير فقط —', '7 أيام', '≥ 70% من القوة المحددة', 'تحذير — انتظر 28 يوم'],
      ],
      'Core Test (BS EN 12504-1): إذا فشل المكعب → 3 cores من المنشأ الفعلي → الحكم النهائي'
    )}

    <div style="margin:12px 0;"><div style="color:var(--gold);font-weight:700;font-size:12px;margin-bottom:8px;">⛔ Hold Points — الخرسانة</div>
    ${buildHoldPoints([
      'موافقة المهندس على Mix Design قبل أول صبة في الموقع',
      'موافقة المهندس على التسليح + الـ Cover قبل الصب (Pre-pour inspection)',
      'فحص Slump في الموقع عند وصول كل Truck — REJECT إذا خارج النطاق',
      'انتظار نتيجة 28 يوم قبل تحميل أي عنصر إنشائي',
    ])}</div>

    <div style="margin:12px 0;"><div style="color:#e74c3c;font-weight:700;font-size:12px;margin-bottom:8px;">🔴 أشيع NCR في الخرسانة</div>
    ${buildNCR([
      { t: 'Slump خارج النطاق عند الوصول', b: 'السبب: تأخر التوصيل أو ارتفاع حرارة الشاحنة. الحل: REJECT فوري — لا إضافة ماء — إعادة الخلطة.' },
      { t: 'غطاء خرساني أقل من المطلوب', b: 'السبب: تحرك الكانات أو عدم استخدام spacers. الحل: تركيب spacers معتمدة + فحص cover meter قبل الصب.' },
      { t: 'فشل اختبار 28 يوم', b: 'السبب: نسبة ماء/إسمنت عالية أو مشكلة في المصنع. الحل: Core Test من المنشأ + تقرير للمهندس.' },
      { t: 'تشقق Plastic Shrinkage', b: 'السبب: تبخر سريع في الطقس الحار. الحل: تغطية فورية بعد الصب + رش ماء بعد 2-4 ساعات.' },
    ])}</div>
  `;

  // ════════════════════════════════════════════════════
  // SECTION 4: UTILITIES — QCS 2024 §S20
  // ════════════════════════════════════════════════════
  const UTILITIES_TABLES = `
    <div style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px 14px;margin:14px 0;">
      <div style="color:var(--gold);font-weight:700;font-size:13px;margin-bottom:8px;">📋 جداول المعايير الكاملة — QCS 2024 §S20 + KAHRAMAA 2024</div>
    </div>

    ${buildTable(
      'مواصفات مواسير المياه الصالحة — KAHRAMAA 2024 §W3',
      'ISO 4427 / EN 12201 / KAHRAMAA 2024',
      ['نوع الماسورة', 'المعيار', 'درجة الضغط', 'الاستخدام', 'ملاحظات'],
      [
        ['HDPE (High Density PE)', 'EN 12201-2 / ISO 4427', 'PN10 / PN16', 'المياه الصالحة الرئيسية', 'SDR17 للـ PN10 | SDR11 للـ PN16'],
        ['DI (Ductile Iron)', 'EN 545 / ISO 2531', 'Class K9 / K12', 'مواسير كبيرة > DN300', 'Cement Mortar Lining داخلي'],
        ['uPVC (Unplasticized PVC)', 'EN 1452 / ISO 1452', 'Class C (12 bar)', 'التوزيع DN50–DN200', 'لا للمياه الحارة > 45°C'],
        ['GRP (Glass Reinforced)', 'EN 1796 / AWWA C950', 'PN6 – PN25', 'المواسير الكبيرة جداً', 'يحتاج موافقة خاصة'],
      ],
      'كل مواسير المياه الصالحة يجب أن تحمل علامة NSF/ANSI 61 أو WRAS Approved — راجع KAHRAMAA 2024 §W3'
    )}

    ${buildTable(
      'اختبارات الضغط الهيدروليكي — KAHRAMAA 2024 §W5',
      'BS EN 805 / AWWA C600 / KAHRAMAA 2024',
      ['نوع الشبكة', 'ضغط الاختبار', 'مدة الاختبار', 'معيار القبول', 'الحكم'],
      [
        ['مياه صالحة (Potable Water)', '1.5 × الضغط التشغيلي الاسمي (PN)', '2 ساعة', 'هبوط ضغط ≤ 0.1 bar', '<span class="dq-fail">FAIL إذا &gt; 0.1 bar هبوط</span>'],
        ['مياه معالجة TSE', '1.5 × PN', '2 ساعة', 'هبوط ضغط ≤ 0.1 bar', '<span class="dq-fail">FAIL إذا &gt; 0.1 bar</span>'],
        ['مياه الإطفاء (Fire Main)', '1.5 × PN أو 14 bar (أيهما أكبر)', '2 ساعة', 'لا هبوط مرئي', '<span class="dq-fail">FAIL إذا أي هبوط</span>'],
        ['خط الضخ (Rising Main)', '1.5 × أقصى ضغط تشغيل + 10%', '4 ساعات', 'هبوط ≤ 0.2 bar', '<span class="dq-fail">FAIL إذا &gt; 0.2 bar</span>'],
      ],
      'يجب تعقيم شبكات المياه الصالحة بـ Chlorine ≥ 50 ppm لمدة 24 ساعة ثم flush قبل التشغيل — KAHRAMAA 2024 §W6'
    )}

    ${buildTable(
      'مواصفات مواسير الصرف الصحي — QCS 2024 §S20-P3',
      'EN 476 / EN 1401 / BS EN 13476',
      ['نوع الماسورة', 'درجة الصلابة', 'الاستخدام', 'الاختبار الإلزامي', 'ملاحظات'],
      [
        ['uPVC Solid Wall', 'SN8 (كلاس 51)', 'صرف صحي تحت الطريق', 'CCTV + Leakage Test', 'الأكثر استخداماً في قطر'],
        ['HDPE Corrugated', 'SN8', 'تصريف أمطار وصرف', 'CCTV + Deflection Test', 'مرن — للمناطق ذات الهبوط'],
        ['GRP (Glass Reinforced)', 'SN2500 – SN10000', 'Collectors > DN600', 'Hydrostatic + CCTV', 'للأقطار الكبيرة'],
        ['RCP (Reinforced Concrete)', 'Class III / IV', 'Storm Water فقط', 'Load Test + CCTV', 'لا للصرف الصحي'],
        ['Vitrified Clay (VC)', 'Extra Strong', 'صرف صحي خاص', 'CCTV + Joint Test', 'نادر في قطر'],
      ],
      'CCTV Survey إلزامي لكل خطوط الصرف بعد التركيب وقبل الردم النهائي — QCS 2024 §S20-P3-Cl.3.8'
    )}

    <div style="margin:12px 0;"><div style="color:var(--gold);font-weight:700;font-size:12px;margin-bottom:8px;">⛔ Hold Points — المرافق</div>
    ${buildHoldPoints([
      'موافقة المهندس على نوع الماسورة والمصدر قبل التوريد (MAR)',
      'فحص Pipe Bedding قبل الفرد — صورة من الجانبين مطلوبة',
      'اختبار الضغط الهيدروليكي بحضور المهندس قبل الردم',
      'CCTV Survey معتمد قبل الردم النهائي',
    ])}</div>

    <div style="margin:12px 0;"><div style="color:#e74c3c;font-weight:700;font-size:12px;margin-bottom:8px;">🔴 أشيع NCR في المرافق</div>
    ${buildNCR([
      { t: 'فشل اختبار الضغط الهيدروليكي', b: 'السبب: وصلة غير محكمة أو Fitting مكسور. الحل: تحديد موقع التسرب بالـ Acoustic Detector أو بالضغط التدريجي.' },
      { t: 'ميل الماسورة خارج التصميم', b: 'السبب: خطأ في ضبط المنسوب. الحل: CCTV يُظهر تجمع مياه — رفع الخط وإعادة فرده بالمنسوب الصحيح.' },
      { t: 'فراش الماسورة (Bedding) غير مطابق', b: 'السبب: استخدام تربة خشنة بدلاً من Sand. الحل: رفع الماسورة — فرد 150mm Sand Selected + إعادة الفرد.' },
    ])}</div>
  `;

  // ════════════════════════════════════════════════════
  // SECTION 5: PILES — QCS 2024 §S5-Part8
  // ════════════════════════════════════════════════════
  const PILES_TABLES = `
    <div style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px 14px;margin:14px 0;">
      <div style="color:var(--gold);font-weight:700;font-size:13px;margin-bottom:8px;">📋 جداول المعايير الكاملة — QCS 2024 §S5-Part8 + BS EN 1536</div>
    </div>

    ${buildTable(
      'معدلات الاختبار الإلزامية للخوازيق — QCS 2024 §S5-P8-Cl.8.3',
      'BS EN 1536 / ASTM D4945 / ASTM D5882',
      ['نوع الاختبار', 'المعيار', 'المعدل الأدنى', 'الحمل / المعلمة', 'ملاحظات'],
      [
        ['Static Load Test (SLT)', 'BS EN 1537 / ASTM D1143', '≥ 1% من العدد الكلي', '1.5× حمل التصميم', 'Hold 72 ساعة عند الحمل الأقصى — مرجعي'],
        ['Dynamic Load Test (PDA)', 'ASTM D4945', '≥ 5% من العدد الكلي', 'طاقة الدق + Bearing', 'CASE Method + CAPWAP — أسرع من SLT'],
        ['Pile Integrity Test (PIT)', 'ASTM D5882', '100% للخوازيق المشبوهة + 20% routine', 'Low Strain Wave', 'كشف Defects + Necking + Voids'],
        ['Cross-hole Sonic Logging (CSL)', 'ASTM D6760', '20-50% للخوازيق الكبيرة', 'Ultrasonic Wave', 'للخوازيق > 600mm diameter'],
      ],
      'يجب انتهاء 28 يوم من صب الخازوق قبل اختبار SLT — و14 يوم على الأقل قبل PDA'
    )}

    ${buildTable(
      'Tolerances موضع وميل الخازوق — QCS 2024 §S5-P8-Cl.8.2',
      'BS EN 1536 / QCS 2024',
      ['المعيار', 'الخازوق المفرد', 'خازوق في مجموعة', 'طريقة القياس', 'الحكم'],
      [
        ['انحراف أفقي (Plan Position)', '± 75mm', '± 100mm', 'Total Station بعد Trimming', '<span class="dq-fail">FAIL إذا تجاوز</span>'],
        ['انحراف رأسي (Verticality)', '≤ 1:75 (1.3%)', '≤ 1:75', 'Inclinometer أو String Line', '<span class="dq-fail">FAIL إذا &gt; 1:75</span>'],
        ['منسوب رأس الخازوق (Cutoff Level)', '± 25mm', '± 25mm', 'Digital Level', '<span class="dq-warn">تحذير إذا &gt; 15mm</span>'],
        ['قطر الخازوق (Diameter)', '≥ 97% من القطر التصميمي', 'نفسه', 'Calliper / Caliper Log', '<span class="dq-fail">FAIL إذا &lt; 97%</span>'],
      ],
      'يُقاس الانحراف بعد Trimming وقبل صب Cap — يُوثَّق في As-Built Survey'
    )}

    <div style="margin:12px 0;"><div style="color:var(--gold);font-weight:700;font-size:12px;margin-bottom:8px;">⛔ Hold Points — الخوازيق</div>
    ${buildHoldPoints([
      'موافقة المهندس على Trial Pile Report قبل بدء الإنتاج',
      'فحص موضع الخازوق بـ Total Station قبل بدء الحفر',
      'موافقة المهندس على Concrete Level في الحفرة قبل سحب الـ Casing',
      'PIT على 20% من الخوازيق قبل صب Pile Caps',
    ])}</div>

    <div style="margin:12px 0;"><div style="color:#e74c3c;font-weight:700;font-size:12px;margin-bottom:8px;">🔴 أشيع NCR في الخوازيق</div>
    ${buildNCR([
      { t: 'انحراف موضع الخازوق > 75mm', b: 'السبب: خطأ Setting Out أو تحرك Casing. الحل: تقرير إنشائي للتحقق من قبول الحمولة — قد يحتاج خازوق إضافي.' },
      { t: 'فشل PIT (Defect / Necking)', b: 'السبب: انهيار جدار الحفرة أو ضغط Bentonite غير كافٍ. الحل: CSL للتأكيد — قد يحتاج Load Test إضافي.' },
      { t: 'Concrete Level منخفض عند Trimming', b: 'السبب: خلط الخرسانة مع Bentonite عند أعلى الخازوق. الحل: Trim إضافي — يجب أن يصل للعمق الذي fcu ≥ المطلوب.' },
    ])}</div>
  `;

  // ════════════════════════════════════════════════════
  // INJECT: ربط الجداول بالـ detail content الموجود
  // ════════════════════════════════════════════════════
  window.QS_DEEP_TABLES = {
    subgrade:           SUBGRADE_TABLES,
    subbase:            SUBBASE_TABLES,
    structural:         CONCRETE_TABLES,
    concrete_quick_ref: CONCRETE_TABLES,
    utilities:          UTILITIES_TABLES,
    utilities_s20:      UTILITIES_TABLES,
    pile_load_testing:  PILES_TABLES,
    foundations_full:   PILES_TABLES,
  };

  // ── Hook: حقن الجداول عند فتح أي detail modal ──
  function injectDeepTable(param) {
    if (!window.QS_DEEP_TABLES) return;
    const tables = window.QS_DEEP_TABLES[param];
    if (!tables) return;

    // انتظر حتى يظهر المحتوى
    const maxTries = 20;
    let tries = 0;
    const interval = setInterval(function () {
      tries++;
      const dmContent = document.getElementById('dmContent');
      const printArea = document.getElementById('print-area');
      const target = printArea || dmContent;
      if (!target || !target.innerHTML || target.innerHTML.length < 100) {
        if (tries >= maxTries) clearInterval(interval);
        return;
      }
      clearInterval(interval);

      // تحقق إذا الجدول موجود مسبقاً (تجنب التكرار)
      if (target.querySelector('.dq-wrap')) return;

      // أضف الجداول في أعلى المحتوى بعد أي header
      const insertPoint = target.querySelector('h3, .modal-title, [style*="background"]');
      const tableDiv = document.createElement('div');
      tableDiv.innerHTML = tables;
      tableDiv.setAttribute('data-deep-table', param);

      if (insertPoint) {
        insertPoint.parentNode.insertBefore(tableDiv, insertPoint.nextSibling);
      } else {
        target.appendChild(tableDiv);
      }
    }, 150);
  }

  // Override openDetail لحقن الجداول تلقائياً
  const _origOpenDetail = window.openDetail;
  window.openDetail = function (param) {
    if (_origOpenDetail) _origOpenDetail(param);
    setTimeout(function () { injectDeepTable(param); }, 300);
  };

  // دعم data-action="openDetail" أيضاً
  document.addEventListener('click', function (e) {
    const card = e.target.closest('[data-action="openDetail"]');
    if (card) {
      const param = card.getAttribute('data-param');
      if (param) setTimeout(function () { injectDeepTable(param); }, 300);
    }
  });

  console.log('[QS Deep Tables] Loaded — 5 sections ready:', Object.keys(window.QS_DEEP_TABLES).join(', '));
})();
