/**
 * QatarSpec Pro — data_structures_detailed.js
 * قسم الأبراج والمباني — Buildings & Towers
 * QCS 2024 Section 5 Reference
 *
 * هيكل: window.QS_CONTENT.structures_buildings
 * القاعدة: sanitizeText() على كل innerHTML
 * الـ namespace: window.QS
 *
 * المرحلة 1: الحفر والردم (Excavation & Earthworks) — QCS S3 P2 + S5 P2
 * المراحل 2–8: ستُضاف تسلسلياً بعد موافقة
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // أداة التعقيم — XSS Protection (مشتركة مع باقي الوحدات)
  // ═══════════════════════════════════════════════════════════
  function sanitizeText(str) {
    if (typeof str !== 'string') return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return str.replace(/[&<>"']/g, function (m) { return map[m]; });
  }

  // ═══════════════════════════════════════════════════════════
  // منطق الحاسبات — Phase 1 Calculators Logic
  // ═══════════════════════════════════════════════════════════

  /**
   * حساب نسبة الرص (Compaction %)
   * QCS S3 P2 Cl.3.1.3 — الحد الأدنى 95% من MDD (Proctor المعدّل)
   */
  function calcCompaction(fieldDensity, maxDryDensity) {
    if (!fieldDensity || !maxDryDensity || maxDryDensity <= 0) return null;
    const pct = (parseFloat(fieldDensity) / parseFloat(maxDryDensity)) * 100;
    const pass = pct >= 95;
    return {
      value: pct.toFixed(1),
      pass: pass,
      label: pass ? 'مقبول ✅ Pass' : 'مرفوض ❌ Fail',
      ref: 'QCS 2024 S3 P2 Cl.3.1.3',
      note: pass ? '' : 'يجب إعادة الرص حتى تصل النسبة إلى ≥ 95% MDD'
    };
  }

  /**
   * حساب محتوى الرطوبة (Moisture Content %)
   * QCS S3 P2 — الرطوبة = (W_wet - W_dry) / W_dry × 100
   */
  function calcMoisture(wetWeight, dryWeight) {
    if (!wetWeight || !dryWeight || dryWeight <= 0) return null;
    const mc = ((parseFloat(wetWeight) - parseFloat(dryWeight)) / parseFloat(dryWeight)) * 100;
    // حد القبول: OMC ± 2% (يُحدَّد من اختبار Proctor)
    return {
      value: mc.toFixed(2),
      label: 'محتوى الرطوبة',
      note: 'قارن بالقيمة المثلى (OMC) من اختبار Proctor المعدّل — القبول: OMC ± 2%',
      ref: 'QCS 2024 S3 P2 Cl.3.1.2'
    };
  }

  /**
   * تقييم CBR (California Bearing Ratio)
   * QCS S3 P2 Cl.3.2.1 — الحد الأدنى للطبقة الأساسية: 10%
   * (يُراجع مع المهندس حسب نوع الطبقة)
   */
  function calcCBR(cbrValue, layerType) {
    if (!cbrValue) return null;
    const cbr = parseFloat(cbrValue);
    let minCBR;
    let layerAr;
    switch (layerType) {
      case 'subgrade':  minCBR = 3;  layerAr = 'طبقة الأساس الترابي (Subgrade)'; break;
      case 'subbase':   minCBR = 25; layerAr = 'طبقة الأساس الحصوي (Sub-base)'; break;
      case 'base':      minCBR = 80; layerAr = 'طبقة الأساس (Base Course)'; break;
      default:          minCBR = 10; layerAr = 'طبقة غير محددة';
    }
    const pass = cbr >= minCBR;
    return {
      value: cbr.toFixed(1),
      minCBR: minCBR,
      layerAr: layerAr,
      pass: pass,
      label: pass ? 'مقبول ✅ Pass' : 'مرفوض ❌ Fail',
      ref: 'QCS 2024 S3 P2 Cl.3.2.1',
      note: pass
        ? `القيمة (${cbr}%) تتجاوز الحد الأدنى (${minCBR}%) لـ ${layerAr}`
        : `القيمة (${cbr}%) أقل من الحد الأدنى (${minCBR}%) لـ ${layerAr} — مرفوض`
    };
  }

  /**
   * تقييم سوية التأسيس (Founding Level)
   * المقارنة بين المستوى الفعلي والمستوى المطلوب من المخطط
   * QCS S5 P2 Cl.2.1 — التسامح: ±25mm
   */
  function calcFoundingLevel(actualRL, designRL) {
    if (actualRL === '' || designRL === '') return null;
    const diff = (parseFloat(actualRL) - parseFloat(designRL)) * 1000; // تحويل إلى mm
    const tolerance = 25; // mm
    const pass = Math.abs(diff) <= tolerance;
    const warn = !pass && Math.abs(diff) <= 50;
    return {
      diff: diff.toFixed(1),
      pass: pass,
      warn: warn,
      label: pass
        ? 'ضمن التسامح ✅ Pass'
        : (warn ? 'تحذير ⚠️ Warning — تحقق مع المهندس' : 'مرفوض ❌ Fail'),
      ref: 'QCS 2024 S5 P2 Cl.2.1',
      note: `الفرق = ${diff.toFixed(1)} mm — التسامح المسموح: ±${tolerance} mm`
    };
  }

  // ═══════════════════════════════════════════════════════════
  // HTML مولّد للمرحلة 1
  // ═══════════════════════════════════════════════════════════
  function renderPhase1() {
    return /* html */`
<!-- ╔══════════════════════════════════════════════════════════╗ -->
<!-- ║  المرحلة 1: الحفر والردم — Excavation & Earthworks     ║ -->
<!-- ║  QCS 2024 S3 P2 + S5 P2                                ║ -->
<!-- ╚══════════════════════════════════════════════════════════╝ -->
<div class="qs-phase" id="phase-1-excavation">

  <!-- ──────────────── رأس المرحلة ──────────────── -->
  <div class="qs-phase-header">
    <div class="qs-phase-number">01</div>
    <div class="qs-phase-title-block">
      <h2 class="qs-phase-title">الحفر والردم</h2>
      <h3 class="qs-phase-subtitle">Excavation &amp; Earthworks</h3>
      <span class="qs-qcs-badge">QCS 2024 · S3 P2 · S5 P2</span>
    </div>
    <div class="qs-phase-status" id="ph1-status">
      <span class="qs-status-dot pending"></span>
      <span class="qs-status-text">قيد التنفيذ</span>
    </div>
  </div>

  <!-- ──────────────── الوصف الهندسي ──────────────── -->
  <div class="qs-section qs-description">
    <h4 class="qs-section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      الوصف الهندسي — Engineering Description
    </h4>
    <div class="qs-description-body">
      <p class="qs-ar">
        تُعدّ مرحلة الحفر والردم من أكثر المراحل حساسيةً في تنفيذ المباني والأبراج، إذ تُحدّد صحة التربة الحاملة ومدى ملاءمتها لاستيعاب الأحمال الإنشائية المرتقبة. وفق <strong>QCS 2024 S3 P2</strong>، يجب أن تبدأ العملية بمراجعة تقرير التحقيق الجيوتقني (GeoTechnical Report) والتحقق من مستوى المياه الجوفية وأنواع التربة قبل بدء أي أعمال حفر.
      </p>
      <p class="qs-ar">
        يشمل الحفر: الحفر الابتدائي للوصول إلى سوية التأسيس المطلوبة، والحفر الإضافي لتركيب الخوازيق أو الشبكات، وحفر الخنادق للمرافق تحت الأرض. يجب توفير نظام دعم جانبي مناسب (Shoring &amp; Bracing) عند الحفر بعمق يزيد عن 1.5 متر، مع تطبيق اشتراطات السلامة وفق <strong>QCDD</strong> ومعايير OSHA المعتمدة في قطر.
      </p>
      <p class="qs-ar">
        أما عمليات الردم، فتنفَّذ بطبقات لا تتجاوز سماكة كل طبقة <strong>200 ملم</strong> (مدموكة) مع ضمان تحقيق نسبة رص لا تقل عن <strong>95% من الكثافة الجافة القصوى</strong> (MDD) المُحددة من اختبار Proctor المعدّل (<strong>ASTM D1557</strong>). يُفضَّل استخدام المواد المعتمدة من QCS S3 P2 Cl.2.2، مع استبعاد الطين العضوي والطفلة الانتفاخية (Expansive Clay).
      </p>
      <p class="qs-en" style="border-top:1px solid #e5e7eb;margin-top:12px;padding-top:12px;font-style:italic;color:#6b7280;">
        <strong>English Summary:</strong> Excavation &amp; Earthworks is the foundation of structural integrity. Per QCS 2024 S3 P2, all cut-to-founding-level operations require geo-technical verification, controlled dewatering, and certified compaction testing at every 300mm compacted layer. Fill material must achieve ≥95% MDD (Modified Proctor, ASTM D1557) with moisture content within OMC ±2%. Shoring is mandatory beyond 1.5m depth. Founding level tolerance is ±25mm from design RL per QCS S5 P2 Cl.2.1.
      </p>
      <div class="qs-common-errors">
        <h5>⚠️ الأخطاء الشائعة — Common Errors</h5>
        <ul>
          <li>الحفر الزائد عن السوية (Over-excavation) دون معالجة فورية بالخرسانة المكافئة (Blinding Concrete)</li>
          <li>إهمال اختبار رص الطبقات أثناء الردم — يُفضي إلى هبوط تفاضلي (Differential Settlement)</li>
          <li>الردم بمواد غير مطابقة (مخلفات بناء، طين، رمل غير مصنّف)</li>
          <li>عدم الاحتفاظ بسجل حفر يومي (Daily Excavation Log) موقّع من المهندس المشرف</li>
          <li>تجاهل خطر المياه الجوفية وعدم تنفيذ نظام تخفيض منسوب المياه (Dewatering) قبل التأسيس</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ──────────────── جدول ITP ──────────────── -->
  <div class="qs-section qs-itp">
    <h4 class="qs-section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
      جدول ITP — Inspection &amp; Test Plan
      <span class="qs-qcs-badge-sm">QCS S3 P2 + S5 P2</span>
    </h4>
    <div class="qs-table-wrapper">
      <table class="qs-itp-table" dir="rtl">
        <thead>
          <tr>
            <th>#</th>
            <th>النشاط / Activity</th>
            <th>معيار القبول / Acceptance Criteria</th>
            <th>التكرار / Frequency</th>
            <th>طريقة الاختبار / Test Method</th>
            <th>النوع</th>
            <th>المرجع</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>مراجعة تقرير الجيوتقنيك<br/><em>Geotech Report Review</em></td>
            <td>موافقة المهندس الاستشاري على التربة الحاملة</td>
            <td>مرة واحدة قبل البدء</td>
            <td>مراجعة وثائق + Site Visit</td>
            <td><span class="qs-point qs-H">H</span></td>
            <td>QCS S5 P2 Cl.1.1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>فحص سوية التأسيس<br/><em>Founding Level Inspection</em></td>
            <td>RL فعلي ≤ ±25mm من RL التصميم</td>
            <td>كل منطقة قبل الصب</td>
            <td>Survey — Total Station</td>
            <td><span class="qs-point qs-H">H</span></td>
            <td>QCS S5 P2 Cl.2.1</td>
          </tr>
          <tr>
            <td>3</td>
            <td>اختبار Proctor المعدّل<br/><em>Modified Proctor</em></td>
            <td>تحديد MDD و OMC لكل مصدر تربة</td>
            <td>كل 500م³ أو عند تغيّر المصدر</td>
            <td>ASTM D1557</td>
            <td><span class="qs-point qs-R">R</span></td>
            <td>QCS S3 P2 Cl.3.1.2</td>
          </tr>
          <tr>
            <td>4</td>
            <td>اختبار الرص الميداني<br/><em>In-situ Density (Sand Cone)</em></td>
            <td>≥ 95% MDD — كل طبقة مدموكة</td>
            <td>اختبار لكل 500م² أو 3 طبقات</td>
            <td>ASTM D1556 / D2922</td>
            <td><span class="qs-point qs-W">W</span></td>
            <td>QCS S3 P2 Cl.3.1.3</td>
          </tr>
          <tr>
            <td>5</td>
            <td>اختبار محتوى الرطوبة<br/><em>Moisture Content</em></td>
            <td>OMC ± 2%</td>
            <td>مع كل اختبار رص</td>
            <td>ASTM D2216</td>
            <td><span class="qs-point qs-W">W</span></td>
            <td>QCS S3 P2 Cl.3.1.2</td>
          </tr>
          <tr>
            <td>6</td>
            <td>اختبار CBR<br/><em>California Bearing Ratio</em></td>
            <td>Subgrade ≥ 3% | Sub-base ≥ 25% | Base ≥ 80%</td>
            <td>كل 1000م² أو عند اشتباه</td>
            <td>ASTM D1883 / BS 1377</td>
            <td><span class="qs-point qs-R">R</span></td>
            <td>QCS S3 P2 Cl.3.2.1</td>
          </tr>
          <tr>
            <td>7</td>
            <td>فحص نظام الدعم الجانبي<br/><em>Shoring Inspection</em></td>
            <td>تصميم معتمد + تنفيذ وفق المخططات</td>
            <td>قبل البدء + بعد كل حفر</td>
            <td>فحص بصري + مراجعة حسابات</td>
            <td><span class="qs-point qs-H">H</span></td>
            <td>QCS S3 P2 Cl.1.4</td>
          </tr>
          <tr>
            <td>8</td>
            <td>فحص خلوص الحفر من الأتربة والمياه<br/><em>Excavation Cleanliness</em></td>
            <td>لا مياه راكدة + قاع نظيف + لا مواد عضوية</td>
            <td>قبل الصب مباشرة</td>
            <td>فحص بصري + قياس</td>
            <td><span class="qs-point qs-H">H</span></td>
            <td>QCS S5 P2 Cl.2.2</td>
          </tr>
          <tr>
            <td>9</td>
            <td>فحص مادة الردم<br/><em>Fill Material Approval</em></td>
            <td>متوافق مع QCS S3 P2 Cl.2.2 — لا مواد عضوية</td>
            <td>كل مصدر مواد جديد</td>
            <td>PSD + Atterberg + Proctor</td>
            <td><span class="qs-point qs-R">R</span></td>
            <td>QCS S3 P2 Cl.2.2</td>
          </tr>
          <tr>
            <td>10</td>
            <td>سماكة طبقة الردم<br/><em>Compacted Layer Thickness</em></td>
            <td>≤ 200mm لكل طبقة مدموكة</td>
            <td>كل طبقة</td>
            <td>قياس ميداني + نتيجة رص</td>
            <td><span class="qs-point qs-W">W</span></td>
            <td>QCS S3 P2 Cl.3.1.1</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="qs-legend">
      <span><strong>H</strong> = Hold Point (إيقاف إلزامي — لا يُكمَل دون موافقة)</span>
      <span><strong>W</strong> = Witness Point (حضور + توثيق)</span>
      <span><strong>R</strong> = Review Point (مراجعة وثائق)</span>
    </div>
  </div>

  <!-- ──────────────── الحاسبات ──────────────── -->
  <div class="qs-section qs-calculators">
    <h4 class="qs-section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>
      حاسبات Pass/Fail — Phase 1 Calculators
    </h4>

    <div class="qs-calc-grid">

      <!-- ══ حاسبة 1: نسبة الرص ══ -->
      <div class="qs-calc-card" id="calc-compaction">
        <div class="qs-calc-header">
          <span class="qs-calc-icon">⚖️</span>
          <div>
            <div class="qs-calc-title">نسبة الرص — Compaction %</div>
            <div class="qs-calc-ref">QCS S3 P2 Cl.3.1.3 · الحد الأدنى: 95% MDD</div>
          </div>
        </div>
        <div class="qs-calc-body">
          <div class="qs-input-row">
            <label>الكثافة الجافة الميدانية (γd field) <em>g/cm³</em></label>
            <input type="number" id="comp-field" placeholder="مثال: 1.82" step="0.01" min="0.5" max="2.5"
              oninput="window.QS_CALC.runCompaction()"/>
          </div>
          <div class="qs-input-row">
            <label>أقصى كثافة جافة (MDD من Proctor) <em>g/cm³</em></label>
            <input type="number" id="comp-mdd" placeholder="مثال: 1.92" step="0.01" min="0.5" max="2.5"
              oninput="window.QS_CALC.runCompaction()"/>
          </div>
          <div class="qs-calc-result" id="comp-result">أدخل القيم للحصول على النتيجة</div>
        </div>
      </div>

      <!-- ══ حاسبة 2: محتوى الرطوبة ══ -->
      <div class="qs-calc-card" id="calc-moisture">
        <div class="qs-calc-header">
          <span class="qs-calc-icon">💧</span>
          <div>
            <div class="qs-calc-title">محتوى الرطوبة — Moisture Content</div>
            <div class="qs-calc-ref">QCS S3 P2 Cl.3.1.2 · ASTM D2216</div>
          </div>
        </div>
        <div class="qs-calc-body">
          <div class="qs-input-row">
            <label>وزن العيّنة الرطبة (W_wet) <em>g</em></label>
            <input type="number" id="mc-wet" placeholder="مثال: 350" step="0.1" min="0"
              oninput="window.QS_CALC.runMoisture()"/>
          </div>
          <div class="qs-input-row">
            <label>وزن العيّنة الجافة (W_dry) <em>g</em></label>
            <input type="number" id="mc-dry" placeholder="مثال: 318" step="0.1" min="0"
              oninput="window.QS_CALC.runMoisture()"/>
          </div>
          <div class="qs-input-row">
            <label>القيمة المثلى (OMC) من Proctor <em>%</em></label>
            <input type="number" id="mc-omc" placeholder="مثال: 10" step="0.1" min="0" max="50"
              oninput="window.QS_CALC.runMoisture()"/>
          </div>
          <div class="qs-calc-result" id="mc-result">أدخل القيم للحصول على النتيجة</div>
        </div>
      </div>

      <!-- ══ حاسبة 3: CBR ══ -->
      <div class="qs-calc-card" id="calc-cbr">
        <div class="qs-calc-header">
          <span class="qs-calc-icon">🏔️</span>
          <div>
            <div class="qs-calc-title">تقييم CBR — California Bearing Ratio</div>
            <div class="qs-calc-ref">QCS S3 P2 Cl.3.2.1 · ASTM D1883</div>
          </div>
        </div>
        <div class="qs-calc-body">
          <div class="qs-input-row">
            <label>قيمة CBR المقاسة <em>%</em></label>
            <input type="number" id="cbr-value" placeholder="مثال: 28" step="0.5" min="0"
              oninput="window.QS_CALC.runCBR()"/>
          </div>
          <div class="qs-input-row">
            <label>نوع الطبقة — Layer Type</label>
            <select id="cbr-layer" onchange="window.QS_CALC.runCBR()">
              <option value="">اختر...</option>
              <option value="subgrade">طبقة الأساس الترابي (Subgrade) — حد: 3%</option>
              <option value="subbase">طبقة الأساس الحصوي (Sub-base) — حد: 25%</option>
              <option value="base">طبقة الأساس (Base Course) — حد: 80%</option>
            </select>
          </div>
          <div class="qs-calc-result" id="cbr-result">أدخل القيم للحصول على النتيجة</div>
        </div>
      </div>

      <!-- ══ حاسبة 4: سوية التأسيس ══ -->
      <div class="qs-calc-card" id="calc-rl">
        <div class="qs-calc-header">
          <span class="qs-calc-icon">📐</span>
          <div>
            <div class="qs-calc-title">سوية التأسيس — Founding Level RL</div>
            <div class="qs-calc-ref">QCS S5 P2 Cl.2.1 · التسامح: ±25mm</div>
          </div>
        </div>
        <div class="qs-calc-body">
          <div class="qs-input-row">
            <label>السوية المطلوبة من المخطط (Design RL) <em>متر</em></label>
            <input type="number" id="rl-design" placeholder="مثال: -3.500" step="0.001"
              oninput="window.QS_CALC.runRL()"/>
          </div>
          <div class="qs-input-row">
            <label>السوية الفعلية من المساحة (Actual RL) <em>متر</em></label>
            <input type="number" id="rl-actual" placeholder="مثال: -3.510" step="0.001"
              oninput="window.QS_CALC.runRL()"/>
          </div>
          <div class="qs-calc-result" id="rl-result">أدخل القيم للحصول على النتيجة</div>
        </div>
      </div>

    </div><!-- /calc-grid -->
  </div><!-- /calculators -->

  <!-- ──────────────── Checklist التفاعلي ──────────────── -->
  <div class="qs-section qs-checklist">
    <h4 class="qs-section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      Checklist الفحص الميداني — Site Inspection Checklist
    </h4>
    <div class="qs-checklist-meta">
      <span id="ph1-progress-text">0 / 10 بنود مكتملة</span>
      <div class="qs-progress-bar-wrap">
        <div class="qs-progress-bar" id="ph1-progress-bar" style="width:0%"></div>
      </div>
    </div>
    <div class="qs-checklist-body" id="ph1-checklist">
      <!-- تُنشأ بـ JS -->
    </div>
    <div class="qs-checklist-actions">
      <button class="qs-btn qs-btn-excel" onclick="window.QS_CALC.exportChecklistExcel(1)">
        📊 تصدير Excel
      </button>
      <button class="qs-btn qs-btn-pdf" onclick="window.QS_CALC.exportChecklistPDF(1)">
        📄 تصدير PDF
      </button>
      <button class="qs-btn qs-btn-reset" onclick="window.QS_CALC.resetChecklist(1)">
        🔄 إعادة تعيين
      </button>
    </div>
  </div><!-- /checklist -->

</div><!-- /phase-1-excavation -->
`;
  }

  // ═══════════════════════════════════════════════════════════
  // بيانات الـ Checklist — Phase 1
  // ═══════════════════════════════════════════════════════════
  const CHECKLIST_PH1 = [
    {
      id: 'ch1-01',
      ar: 'مراجعة تقرير الجيوتقنيك والموافقة على التربة الحاملة',
      en: 'Geotechnical report reviewed & bearing layer approved by Engineer',
      ref: 'QCS S5 P2 Cl.1.1',
      critical: true
    },
    {
      id: 'ch1-02',
      ar: 'تركيب وفحص نظام الدعم الجانبي (Shoring) للحفريات > 1.5م',
      en: 'Shoring system installed & inspected for excavations > 1.5m depth',
      ref: 'QCS S3 P2 Cl.1.4',
      critical: true
    },
    {
      id: 'ch1-03',
      ar: 'تشغيل نظام تخفيض منسوب المياه (Dewatering) وإزالة المياه الجوفية',
      en: 'Dewatering system operational — no standing water at formation level',
      ref: 'QCS S3 P2 Cl.1.5',
      critical: true
    },
    {
      id: 'ch1-04',
      ar: 'التحقق من سوية التأسيس (Founding RL) بالمساحة — تسامح ±25mm',
      en: 'Founding level surveyed & within ±25mm of design RL',
      ref: 'QCS S5 P2 Cl.2.1',
      critical: true
    },
    {
      id: 'ch1-05',
      ar: 'فحص نظافة قاع الحفر — خالٍ من الأتربة والمواد العضوية',
      en: 'Excavation bottom clean — free of debris, organics & loose material',
      ref: 'QCS S5 P2 Cl.2.2',
      critical: false
    },
    {
      id: 'ch1-06',
      ar: 'اعتماد مواد الردم من المختبر — مطابقة QCS S3 P2 Cl.2.2',
      en: 'Fill material tested & approved by lab — compliant with QCS S3 P2 Cl.2.2',
      ref: 'QCS S3 P2 Cl.2.2',
      critical: false
    },
    {
      id: 'ch1-07',
      ar: 'الردم بطبقات لا تتجاوز 200mm مع اختبار رص لكل طبقة',
      en: 'Fill placed in ≤200mm compacted layers with density testing per layer',
      ref: 'QCS S3 P2 Cl.3.1.1',
      critical: true
    },
    {
      id: 'ch1-08',
      ar: 'نتائج اختبارات الرص ≥ 95% MDD — موثّقة ومعتمدة',
      en: 'Compaction test results ≥95% MDD — documented & approved',
      ref: 'QCS S3 P2 Cl.3.1.3',
      critical: true
    },
    {
      id: 'ch1-09',
      ar: 'سجل الحفر اليومي (Daily Excavation Log) موقّع من المهندس المشرف',
      en: 'Daily excavation log maintained & signed by resident engineer',
      ref: 'QCS S5 P2 Cl.1.3',
      critical: false
    },
    {
      id: 'ch1-10',
      ar: 'الحصول على Hold Point Release قبل صب الخرسانة المكافئة (Blinding)',
      en: 'Hold Point formally released by Engineer before blinding concrete pour',
      ref: 'QCS S5 P2 ITP-01',
      critical: true
    }
  ];

  // ═══════════════════════════════════════════════════════════
  // وظائف الـ namespace العامة — QS_CALC
  // ═══════════════════════════════════════════════════════════
  window.QS_CALC = window.QS_CALC || {};

  // — تشغيل حاسبة الرص
  window.QS_CALC.runCompaction = function () {
    const fd = document.getElementById('comp-field');
    const md = document.getElementById('comp-mdd');
    const res = document.getElementById('comp-result');
    if (!res) return;
    const r = calcCompaction(fd ? fd.value : '', md ? md.value : '');
    if (!r) { res.textContent = 'أدخل قيمتَي الكثافة الجافة'; res.className = 'qs-calc-result'; return; }
    res.innerHTML =
      '<strong>' + sanitizeText(r.value) + '%</strong> من MDD &nbsp;—&nbsp; ' +
      sanitizeText(r.label) +
      '<br/><small>' + sanitizeText(r.ref) + '</small>' +
      (r.note ? '<br/><em>' + sanitizeText(r.note) + '</em>' : '');
    res.className = 'qs-calc-result ' + (r.pass ? 'pass' : 'fail');
  };

  // — تشغيل حاسبة الرطوبة
  window.QS_CALC.runMoisture = function () {
    const wt = document.getElementById('mc-wet');
    const dr = document.getElementById('mc-dry');
    const om = document.getElementById('mc-omc');
    const res = document.getElementById('mc-result');
    if (!res) return;
    const r = calcMoisture(wt ? wt.value : '', dr ? dr.value : '');
    if (!r) { res.textContent = 'أدخل أوزان العيّنة'; res.className = 'qs-calc-result'; return; }
    const mc = parseFloat(r.value);
    const omc = om && om.value ? parseFloat(om.value) : null;
    let passClass = '';
    let passLabel = '';
    if (omc !== null && !isNaN(omc)) {
      const diff = Math.abs(mc - omc);
      if (diff <= 2) { passClass = 'pass'; passLabel = '✅ ضمن النطاق — Pass (OMC ±2%)'; }
      else if (diff <= 3) { passClass = 'warn'; passLabel = '⚠️ تحذير — قريب من الحد (OMC ±2%)'; }
      else { passClass = 'fail'; passLabel = '❌ خارج النطاق — Fail'; }
    }
    res.innerHTML =
      'محتوى الرطوبة: <strong>' + sanitizeText(r.value) + '%</strong>' +
      (omc !== null ? ' &nbsp;|&nbsp; OMC: <strong>' + sanitizeText(String(omc)) + '%</strong> &nbsp;— ' + sanitizeText(passLabel) : '') +
      '<br/><small>' + sanitizeText(r.ref) + ' &nbsp;|&nbsp; ' + sanitizeText(r.note) + '</small>';
    res.className = 'qs-calc-result ' + passClass;
  };

  // — تشغيل حاسبة CBR
  window.QS_CALC.runCBR = function () {
    const cv = document.getElementById('cbr-value');
    const cl = document.getElementById('cbr-layer');
    const res = document.getElementById('cbr-result');
    if (!res) return;
    const r = calcCBR(cv ? cv.value : '', cl ? cl.value : '');
    if (!r) { res.textContent = 'أدخل قيمة CBR ونوع الطبقة'; res.className = 'qs-calc-result'; return; }
    res.innerHTML =
      'CBR: <strong>' + sanitizeText(r.value) + '%</strong> &nbsp;— الحد الأدنى: <strong>' + r.minCBR + '%</strong>' +
      '<br/>' + sanitizeText(r.label) +
      '<br/><small>' + sanitizeText(r.ref) + '</small>' +
      '<br/><em>' + sanitizeText(r.note) + '</em>';
    res.className = 'qs-calc-result ' + (r.pass ? 'pass' : 'fail');
  };

  // — تشغيل حاسبة سوية التأسيس
  window.QS_CALC.runRL = function () {
    const ds = document.getElementById('rl-design');
    const ac = document.getElementById('rl-actual');
    const res = document.getElementById('rl-result');
    if (!res) return;
    const dv = ds && ds.value !== '' ? ds.value : null;
    const av = ac && ac.value !== '' ? ac.value : null;
    if (dv === null || av === null) {
      res.textContent = 'أدخل كلا السويتين'; res.className = 'qs-calc-result'; return;
    }
    const r = calcFoundingLevel(av, dv);
    if (!r) { res.textContent = 'خطأ في القيم'; res.className = 'qs-calc-result'; return; }
    res.innerHTML =
      'الفرق: <strong>' + sanitizeText(r.diff) + ' mm</strong>' +
      '<br/>' + sanitizeText(r.label) +
      '<br/><small>' + sanitizeText(r.ref) + '</small>' +
      '<br/><em>' + sanitizeText(r.note) + '</em>';
    res.className = 'qs-calc-result ' + (r.pass ? 'pass' : (r.warn ? 'warn' : 'fail'));
  };

  // — بناء الـ Checklist
  window.QS_CALC.buildChecklist = function (phaseNum, data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const stateKey = 'qs_cl_ph' + phaseNum;
    let state = {};
    try {
      const raw = sessionStorage.getItem(stateKey);
      if (raw) state = JSON.parse(raw);
    } catch (_) {}

    let html = '';
    data.forEach(function (item, idx) {
      const checked = state[item.id] ? 'checked' : '';
      html += '<div class="qs-cl-item' + (item.critical ? ' critical' : '') + '" id="cli-' + sanitizeText(item.id) + '">' +
        '<label class="qs-cl-label">' +
        '<input type="checkbox" id="' + sanitizeText(item.id) + '" ' + checked +
        ' onchange="window.QS_CALC.updateChecklist(' + phaseNum + ', \'' + sanitizeText(item.id) + '\')">' +
        '<span class="qs-cl-num">' + (idx + 1) + '</span>' +
        '<span class="qs-cl-text">' +
        '<span class="qs-cl-ar">' + sanitizeText(item.ar) + '</span>' +
        '<span class="qs-cl-en">' + sanitizeText(item.en) + '</span>' +
        '</span>' +
        (item.critical ? '<span class="qs-cl-critical-badge">إلزامي</span>' : '') +
        '<span class="qs-cl-ref">' + sanitizeText(item.ref) + '</span>' +
        '</label>' +
        '</div>';
    });
    container.innerHTML = html;
    window.QS_CALC.syncProgress(phaseNum, data, stateKey);
  };

  // — تحديث الـ Checklist
  window.QS_CALC.updateChecklist = function (phaseNum, itemId) {
    const stateKey = 'qs_cl_ph' + phaseNum;
    let state = {};
    try { const raw = sessionStorage.getItem(stateKey); if (raw) state = JSON.parse(raw); } catch (_) {}
    const el = document.getElementById(itemId);
    if (el) state[itemId] = el.checked;
    sessionStorage.setItem(stateKey, JSON.stringify(state));
    const data = phaseNum === 1 ? CHECKLIST_PH1 : [];
    window.QS_CALC.syncProgress(phaseNum, data, stateKey);
  };

  // — مزامنة شريط التقدم
  window.QS_CALC.syncProgress = function (phaseNum, data, stateKey) {
    let state = {};
    try { const raw = sessionStorage.getItem(stateKey); if (raw) state = JSON.parse(raw); } catch (_) {}
    const total = data.length;
    const done = data.filter(function (item) { return state[item.id]; }).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const bar = document.getElementById('ph' + phaseNum + '-progress-bar');
    const txt = document.getElementById('ph' + phaseNum + '-progress-text');
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.textContent = done + ' / ' + total + ' بنود مكتملة (' + pct + '%)';
    // تلوين الشريط
    if (bar) {
      bar.style.background = pct === 100 ? '#16a34a' : pct >= 60 ? '#d97706' : '#dc2626';
    }
  };

  // — إعادة تعيين الـ Checklist
  window.QS_CALC.resetChecklist = function (phaseNum) {
    if (!confirm('هل تريد إعادة تعيين جميع بنود الـ Checklist؟')) return;
    sessionStorage.removeItem('qs_cl_ph' + phaseNum);
    const data = phaseNum === 1 ? CHECKLIST_PH1 : [];
    window.QS_CALC.buildChecklist(phaseNum, data, 'ph' + phaseNum + '-checklist');
  };

  // — تصدير Excel (نص منسّق للنسخ)
  window.QS_CALC.exportChecklistExcel = function (phaseNum) {
    const data = phaseNum === 1 ? CHECKLIST_PH1 : [];
    const stateKey = 'qs_cl_ph' + phaseNum;
    let state = {};
    try { const raw = sessionStorage.getItem(stateKey); if (raw) state = JSON.parse(raw); } catch (_) {}

    let rows = [
      ['#', 'البند / Activity (AR)', 'البند / Activity (EN)', 'المرجع', 'إلزامي؟', 'الحالة']
    ];
    data.forEach(function (item, idx) {
      rows.push([
        idx + 1,
        item.ar,
        item.en,
        item.ref,
        item.critical ? 'نعم' : 'لا',
        state[item.id] ? '✅ مكتمل' : '❌ لم ينفّذ'
      ]);
    });

    // تحويل إلى TSV (Tab-Separated) — يُلصق مباشرة في Excel
    const tsv = rows.map(function (r) { return r.join('\t'); }).join('\n');
    const blob = new Blob(['\uFEFF' + tsv], { type: 'text/tab-separated-values;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QatarSpec_Ph1_Checklist_Ashghal.tsv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // — تصدير PDF (طباعة)
  window.QS_CALC.exportChecklistPDF = function (phaseNum) {
    const data = phaseNum === 1 ? CHECKLIST_PH1 : [];
    const stateKey = 'qs_cl_ph' + phaseNum;
    let state = {};
    try { const raw = sessionStorage.getItem(stateKey); if (raw) state = JSON.parse(raw); } catch (_) {}
    const now = new Date().toLocaleDateString('ar-QA');

    let rows = data.map(function (item, idx) {
      const done = state[item.id];
      return '<tr>' +
        '<td>' + (idx + 1) + '</td>' +
        '<td dir="rtl">' + sanitizeText(item.ar) + '</td>' +
        '<td>' + sanitizeText(item.en) + '</td>' +
        '<td>' + sanitizeText(item.ref) + '</td>' +
        '<td>' + (item.critical ? '🔴 نعم' : 'لا') + '</td>' +
        '<td style="color:' + (done ? '#16a34a' : '#dc2626') + '">' + (done ? '✅ مكتمل' : '❌ لم ينفّذ') + '</td>' +
        '</tr>';
    }).join('');

    const html = '<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"/>' +
      '<title>QatarSpec Pro — Checklist Phase 1</title>' +
      '<style>body{font-family:Arial,sans-serif;margin:24px;direction:rtl}' +
      'h1{color:#1e3a5f;font-size:18px}' +
      'table{border-collapse:collapse;width:100%;font-size:11px}' +
      'th{background:#1e3a5f;color:#fff;padding:6px;border:1px solid #ccc}' +
      'td{padding:5px;border:1px solid #ccc}' +
      'tr:nth-child(even){background:#f8f9fa}' +
      '.watermark{position:fixed;top:40%;left:50%;transform:translateX(-50%) rotate(-30deg);' +
      'font-size:48px;opacity:0.07;color:#1e3a5f;pointer-events:none}' +
      '</style></head><body>' +
      '<div class="watermark">QatarSpec Pro</div>' +
      '<h1>QatarSpec Pro — Checklist الفحص الميداني</h1>' +
      '<p><strong>المرحلة 1: الحفر والردم — Excavation &amp; Earthworks</strong></p>' +
      '<p>التاريخ: ' + sanitizeText(now) + ' &nbsp;|&nbsp; المرجع: QCS 2024 S3 P2 + S5 P2</p>' +
      '<table><thead><tr><th>#</th><th>البند (عربي)</th><th>Activity (EN)</th>' +
      '<th>المرجع</th><th>إلزامي؟</th><th>الحالة</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table>' +
      '<p style="margin-top:24px;font-size:10px;color:#6b7280">' +
      'أُنشئ بواسطة QatarSpec Pro &nbsp;|&nbsp; qatar-standers.vercel.app &nbsp;|&nbsp; ' +
      'جميع الأرقام مرجعها QCS 2024</p>' +
      '</body></html>';

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      setTimeout(function () { win.print(); }, 500);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // CSS الخاص بقسم structures_buildings
  // ═══════════════════════════════════════════════════════════
  function injectStyles() {
    if (document.getElementById('qs-structures-styles')) return;
    const style = document.createElement('style');
    style.id = 'qs-structures-styles';
    style.textContent = `
      /* ── QatarSpec Pro — Structures Styles ── */
      .qs-phase { font-family: 'Segoe UI', 'Tahoma', Arial, sans-serif; direction: rtl; }
      .qs-phase-header {
        display: flex; align-items: center; gap: 16px;
        background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%);
        color: #fff; border-radius: 12px; padding: 20px 24px;
        margin-bottom: 24px; flex-wrap: wrap;
      }
      .qs-phase-number {
        font-size: 48px; font-weight: 900; opacity: 0.3; line-height: 1;
        min-width: 60px;
      }
      .qs-phase-title { margin: 0; font-size: 22px; font-weight: 700; }
      .qs-phase-subtitle { margin: 4px 0 0; font-size: 14px; opacity: 0.8; font-weight: 400; }
      .qs-qcs-badge {
        display: inline-block; background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 20px; padding: 3px 12px; font-size: 12px; margin-top: 6px;
      }
      .qs-qcs-badge-sm {
        background: #e8f0fe; color: #1e3a5f; border-radius: 4px;
        padding: 2px 8px; font-size: 11px; font-weight: 600;
        display: inline-block; margin-right: 8px;
      }
      .qs-phase-status { margin-right: auto; text-align: center; }
      .qs-status-dot {
        display: inline-block; width: 10px; height: 10px;
        border-radius: 50%; margin-left: 6px;
      }
      .qs-status-dot.pending { background: #fbbf24; }
      .qs-status-dot.done { background: #34d399; }
      .qs-status-dot.fail { background: #f87171; }

      .qs-section {
        background: #fff; border: 1px solid #e5e7eb;
        border-radius: 10px; padding: 20px 24px; margin-bottom: 20px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      }
      .qs-section-title {
        font-size: 15px; font-weight: 700; color: #1e3a5f;
        margin: 0 0 16px; display: flex; align-items: center; gap: 8px;
        padding-bottom: 10px; border-bottom: 2px solid #e8f0fe;
      }
      .qs-description-body p.qs-ar {
        font-size: 14px; line-height: 1.9; color: #374151; margin: 0 0 12px;
      }
      .qs-common-errors {
        background: #fff7ed; border: 1px solid #fed7aa;
        border-radius: 8px; padding: 14px 18px; margin-top: 14px;
      }
      .qs-common-errors h5 { margin: 0 0 8px; color: #9a3412; font-size: 13px; }
      .qs-common-errors ul { margin: 0; padding-right: 20px; }
      .qs-common-errors li { font-size: 13px; color: #7c2d12; margin-bottom: 4px; line-height: 1.6; }

      /* ITP Table */
      .qs-table-wrapper { overflow-x: auto; }
      .qs-itp-table {
        width: 100%; border-collapse: collapse; font-size: 12px;
        min-width: 700px;
      }
      .qs-itp-table th {
        background: #1e3a5f; color: #fff; padding: 8px 10px;
        text-align: center; font-weight: 600; white-space: nowrap;
      }
      .qs-itp-table td {
        padding: 8px 10px; border: 1px solid #e5e7eb;
        vertical-align: top; line-height: 1.5;
      }
      .qs-itp-table tr:nth-child(even) td { background: #f9fafb; }
      .qs-itp-table tr:hover td { background: #eff6ff; }
      .qs-itp-table td:first-child { text-align: center; font-weight: 700; color: #1e3a5f; }
      .qs-itp-table em { font-size: 11px; color: #6b7280; display: block; }
      .qs-point {
        display: inline-block; width: 24px; height: 24px; border-radius: 50%;
        font-size: 11px; font-weight: 700; line-height: 24px; text-align: center;
        color: #fff;
      }
      .qs-H { background: #dc2626; }
      .qs-W { background: #d97706; }
      .qs-R { background: #2563eb; }
      .qs-legend {
        display: flex; gap: 16px; flex-wrap: wrap;
        margin-top: 10px; font-size: 12px; color: #6b7280;
      }

      /* Calculators */
      .qs-calc-grid {
        display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
      .qs-calc-card {
        border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;
        transition: box-shadow 0.2s;
      }
      .qs-calc-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .qs-calc-header {
        background: #f8fafc; border-bottom: 1px solid #e5e7eb;
        padding: 12px 14px; display: flex; align-items: center; gap: 10px;
      }
      .qs-calc-icon { font-size: 22px; }
      .qs-calc-title { font-weight: 700; font-size: 13px; color: #1e3a5f; }
      .qs-calc-ref { font-size: 11px; color: #6b7280; margin-top: 2px; }
      .qs-calc-body { padding: 14px; }
      .qs-input-row { margin-bottom: 10px; }
      .qs-input-row label {
        display: block; font-size: 12px; color: #374151;
        margin-bottom: 4px; font-weight: 600;
      }
      .qs-input-row label em { font-weight: 400; color: #9ca3af; font-size: 11px; }
      .qs-input-row input, .qs-input-row select {
        width: 100%; padding: 7px 10px; border: 1px solid #d1d5db;
        border-radius: 6px; font-size: 13px; box-sizing: border-box;
        transition: border-color 0.2s;
      }
      .qs-input-row input:focus, .qs-input-row select:focus {
        outline: none; border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
      }
      .qs-calc-result {
        margin-top: 10px; padding: 10px 12px; border-radius: 8px;
        font-size: 13px; line-height: 1.6; color: #374151;
        background: #f9fafb; border: 1px solid #e5e7eb;
        transition: all 0.3s;
      }
      .qs-calc-result.pass { background: #dcfce7; border-color: #86efac; color: #14532d; }
      .qs-calc-result.fail { background: #fee2e2; border-color: #fca5a5; color: #7f1d1d; }
      .qs-calc-result.warn { background: #fef9c3; border-color: #fde047; color: #713f12; }

      /* Checklist */
      .qs-checklist-meta {
        display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
        font-size: 13px; color: #4b5563; flex-wrap: wrap;
      }
      .qs-progress-bar-wrap {
        flex: 1; min-width: 150px; height: 8px; background: #e5e7eb;
        border-radius: 4px; overflow: hidden;
      }
      .qs-progress-bar {
        height: 100%; background: #dc2626; border-radius: 4px;
        transition: width 0.4s, background 0.4s;
      }
      .qs-cl-item {
        border: 1px solid #e5e7eb; border-radius: 8px;
        padding: 10px 14px; margin-bottom: 8px;
        transition: background 0.2s;
      }
      .qs-cl-item:hover { background: #f8fafc; }
      .qs-cl-item.critical { border-right: 3px solid #dc2626; }
      .qs-cl-label {
        display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
        flex-wrap: wrap;
      }
      .qs-cl-label input[type=checkbox] {
        margin-top: 3px; width: 16px; height: 16px; cursor: pointer; flex-shrink: 0;
      }
      .qs-cl-num {
        background: #1e3a5f; color: #fff; border-radius: 50%;
        width: 22px; height: 22px; font-size: 11px; font-weight: 700;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .qs-cl-text { flex: 1; }
      .qs-cl-ar { display: block; font-size: 13px; font-weight: 600; color: #1f2937; }
      .qs-cl-en { display: block; font-size: 11px; color: #6b7280; margin-top: 2px; }
      .qs-cl-critical-badge {
        background: #fee2e2; color: #991b1b; font-size: 10px;
        font-weight: 700; padding: 2px 7px; border-radius: 10px;
        align-self: flex-start; flex-shrink: 0;
      }
      .qs-cl-ref {
        font-size: 10px; color: #9ca3af; align-self: center; flex-shrink: 0;
        font-style: italic;
      }
      .qs-cl-item input:checked ~ .qs-cl-text .qs-cl-ar { text-decoration: line-through; color: #9ca3af; }

      /* Buttons */
      .qs-checklist-actions { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
      .qs-btn {
        padding: 8px 16px; border: none; border-radius: 6px;
        font-size: 13px; font-weight: 600; cursor: pointer;
        transition: opacity 0.2s, transform 0.1s;
      }
      .qs-btn:hover { opacity: 0.85; transform: translateY(-1px); }
      .qs-btn:active { transform: translateY(0); }
      .qs-btn-excel { background: #16a34a; color: #fff; }
      .qs-btn-pdf { background: #dc2626; color: #fff; }
      .qs-btn-reset { background: #6b7280; color: #fff; }

      /* Responsive */
      @media (max-width: 640px) {
        .qs-phase-header { padding: 14px; }
        .qs-phase-number { font-size: 32px; }
        .qs-phase-title { font-size: 18px; }
        .qs-calc-grid { grid-template-columns: 1fr; }
        .qs-section { padding: 14px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════
  // تسجيل المحتوى في QS_CONTENT
  // ═══════════════════════════════════════════════════════════
  window.QS_CONTENT = window.QS_CONTENT || {};

  window.QS_CONTENT.structures_buildings = {
    title: 'الأبراج والمباني — Buildings & Towers | QCS 2024 S5',
    content: renderPhase1(),
    onLoad: function () {
      injectStyles();
      window.QS_CALC.buildChecklist(1, CHECKLIST_PH1, 'ph1-checklist');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // ربط مع QS.openDetail إذا كان موجوداً
  // ═══════════════════════════════════════════════════════════
  (function tryHook() {
    if (window.QS && typeof window.QS.openDetail === 'function') {
      const original = window.QS.openDetail;
      window.QS.openDetail = function (sectionId) {
        original.call(window.QS, sectionId);
        if (sectionId === 'structures_buildings') {
          const content = window.QS_CONTENT.structures_buildings;
          if (content && typeof content.onLoad === 'function') {
            setTimeout(content.onLoad, 50);
          }
        }
      };
    }
  })();

  console.log('[QatarSpec Pro] data_structures_detailed.js — المرحلة 1 (الحفر والردم) محمّلة ✅');

})();
