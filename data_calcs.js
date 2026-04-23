// QatarSpec Pro — Calculators & Validators
// المرحلة 2: كل دوال الحاسبات والمدققات
// Generated from index.html — do not edit manually

// ── calcMaterials ──
/**
 * حاسبة الكميات — تحسب الكميات التقديرية للمواد الإنشائية
 * المعادلات مستخرجة من QCS 2024 ومعدلات الإبهام للمشاريع القطرية
 * المدخلات: مساحة الطابق (m²) + عدد الطوابق + ارتفاع الطابق + درجة الخرسانة + نوع البناء
 * المخرجات: خرسانة (m³) + حديد (ton) + قوالب (m²) + تقدير تكلفة (QR)
 * @see QCS 2024 Section 5 — Concrete and Reinforcement
 */
function calcMaterials() {
  const area = parseFloat(document.getElementById('mc-floor-area').value) || 0;
  const floors = parseInt(document.getElementById('mc-floors').value) || 0;
  const floorH = parseFloat(document.getElementById('mc-floor-h').value) || 3.0;
  const grade = parseInt(document.getElementById('mc-grade').value) || 30;
  const btype = document.getElementById('mc-btype').value;
  const system = document.getElementById('mc-system').value;

  if (!area || !floors) {
    document.getElementById('mc-results').style.display = 'none';
    return;
  }

  const totalArea = area * floors;
  const perimeterEst = Math.sqrt(area) * 4;

  // ── Concrete volumes ─────────────────────────────────────
  const slabThk = (btype === 'industrial') ? 0.25 : 0.20;
  const concreteSlabs = totalArea * slabThk;
  const concreteColumns = totalArea * floors * 0.012; // ~1.2% of floor area per floor
  const concreteBeams   = totalArea * 0.06;
  const concreteFoundation = area * 0.35;
  const concreteTotalRaw = concreteSlabs + concreteColumns + concreteBeams + concreteFoundation;
  const concreteTotal = concreteTotalRaw * 1.05; // +5% waste

  // ── Mix Design (per m³) ──────────────────────────────────
  let cementBags, sand_m3, agg_m3, water_L;
  if (grade <= 25) { cementBags = 7.0; sand_m3 = 0.44; agg_m3 = 0.88; }
  else if (grade <= 30) { cementBags = 8.0; sand_m3 = 0.40; agg_m3 = 0.80; }
  else if (grade <= 35) { cementBags = 9.5; sand_m3 = 0.36; agg_m3 = 0.72; }
  else { cementBags = 11.0; sand_m3 = 0.32; agg_m3 = 0.64; }
  water_L = cementBags * 50 * 0.45; // w/c = 0.45

  const totalCementBags = Math.ceil(concreteTotal * cementBags);
  const totalSand = (concreteTotal * sand_m3).toFixed(1);
  const totalAgg  = (concreteTotal * agg_m3).toFixed(1);
  const totalWater = Math.ceil(concreteTotal * water_L);

  // ── Rebar ────────────────────────────────────────────────
  const rebarKgPerM3Slab = 80;
  const rebarKgPerM3Col  = 130;
  const rebarKgPerM3Beam = 110;
  const rebarKgFoundation = 70;
  const rebarTotal = (
    concreteSlabs * rebarKgPerM3Slab +
    concreteColumns * rebarKgPerM3Col +
    concreteBeams * rebarKgPerM3Beam +
    concreteFoundation * rebarKgFoundation
  ) * 1.05;
  const rebarTons = (rebarTotal / 1000).toFixed(1);

  // ── Masonry / Block ──────────────────────────────────────
  const wallAreaPerFloor = perimeterEst * floorH * 0.7; // 70% solid
  const innerWalls = area * 0.3 * floorH * 0.7; // 30% of floor as inner walls
  const totalWallArea = (wallAreaPerFloor + innerWalls) * floors;
  const blockFaceArea = 0.4 * 0.2; // 400×200 standard block face
  const blockCount = Math.ceil(totalWallArea / blockFaceArea * 1.08); // +8% waste
  const mortarVol = (totalWallArea * 0.03).toFixed(1); // 30mm joints avg

  // ── Mortar ingredients ───────────────────────────────────
  const mortarCementBags = Math.ceil(parseFloat(mortarVol) * 300 / 50); // 300 kg/m³ cement
  const mortarSand = (parseFloat(mortarVol) * 1.2).toFixed(1);
  const mortarWater = Math.ceil(parseFloat(mortarVol) * 180); // L per m³ mortar

  // ── Formwork ─────────────────────────────────────────────
  const formworkM2 = Math.ceil(totalArea * 1.3); // 1.3× floor area

  // ── Results HTML ─────────────────────────────────────────
  const gr = function(label, val, unit, note) {
    return '<tr><td style="color:var(--text2)">' + label + '</td><td style="color:var(--text);font-weight:700;">' + val + '</td><td style="color:#3498db">' + unit + '</td><td style="color:var(--text3);font-size:10px;">' + (note||'') + '</td></tr>';
  };

  let html = '<div style="display:flex;flex-direction:column;gap:10px;">';

  // Summary card
  html += '<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:10px;padding:12px;">';
  html += '<div style="font-size:12px;font-weight:700;color:#3498db;margin-bottom:8px;">📋 ملخص المشروع</div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:11px;">';
  html += '<div style="text-align:center;background:var(--dark4);border-radius:6px;padding:6px;"><div style="color:var(--text3)">مساحة كلية</div><div style="color:var(--text);font-weight:700;">' + totalArea.toFixed(0) + ' m²</div></div>';
  html += '<div style="text-align:center;background:var(--dark4);border-radius:6px;padding:6px;"><div style="color:var(--text3)">خرسانة إجمالية</div><div style="color:var(--gold);font-weight:700;">' + concreteTotal.toFixed(0) + ' m³</div></div>';
  html += '<div style="text-align:center;background:var(--dark4);border-radius:6px;padding:6px;"><div style="color:var(--text3)">حديد إجمالي</div><div style="color:#e74c3c;font-weight:700;">' + rebarTons + ' طن</div></div>';
  html += '</div></div>';

  // Concrete section
  html += '<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;overflow:hidden;">';
  html += '<div style="background:rgba(201,168,76,0.1);padding:8px 12px;font-size:12px;font-weight:700;color:var(--gold);">🏗️ كميات الخرسانة (C' + grade + ')</div>';
  html += '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.7)"><th>العنصر</th><th>الكمية</th><th>الوحدة</th><th>ملاحظة</th></tr>';
  html += gr('أسقف (Slabs)', concreteSlabs.toFixed(1), 'm³', 'سماكة ' + (slabThk*1000) + 'mm');
  html += gr('أعمدة (Columns)', concreteColumns.toFixed(1), 'm³', '~1.2% من مساحة الطابق');
  html += gr('جسور (Beams)', concreteBeams.toFixed(1), 'm³', '~6% من المساحة الكلية');
  html += gr('أساسات (Foundation)', concreteFoundation.toFixed(1), 'm³', '350mm Raft avg');
  html += gr('الإجمالي + 5% هدر', concreteTotal.toFixed(0), 'm³', 'الكمية للطلب');
  html += '</table></div></div>';

  // Mix materials
  html += '<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;overflow:hidden;">';
  html += '<div style="background:rgba(52,152,219,0.1);padding:8px 12px;font-size:12px;font-weight:700;color:#3498db;">🧪 مكونات الخلطة الخرسانية C' + grade + '</div>';
  html += '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.7)"><th>المادة</th><th>الكمية</th><th>الوحدة</th><th>ملاحظة</th></tr>';
  html += gr('اسمنت (50kg/كيس)', totalCementBags, 'كيس', cementBags + ' كيس/m³ | SRPC C' + grade);
  html += gr('رمل ناعم', totalSand, 'm³', sand_m3 + ' m³/m³ خرسانة');
  html += gr('حجر مكسر (10-20mm)', totalAgg, 'm³', agg_m3 + ' m³/m³ خرسانة');
  html += gr('ماء الخلط', totalWater, 'لتر', 'w/c = 0.45');
  html += '</table></div></div>';

  // Rebar
  html += '<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;overflow:hidden;">';
  html += '<div style="background:rgba(231,76,60,0.1);padding:8px 12px;font-size:12px;font-weight:700;color:#e74c3c;">🔩 حديد التسليح (Grade B500B)</div>';
  html += '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.7)"><th>العنصر</th><th>الكمية</th><th>الوحدة</th><th>المعدل</th></tr>';
  html += gr('أسقف', (concreteSlabs * rebarKgPerM3Slab / 1000).toFixed(1), 'طن', rebarKgPerM3Slab + ' kg/m³');
  html += gr('أعمدة', (concreteColumns * rebarKgPerM3Col / 1000).toFixed(1), 'طن', rebarKgPerM3Col + ' kg/m³');
  html += gr('جسور', (concreteBeams * rebarKgPerM3Beam / 1000).toFixed(1), 'طن', rebarKgPerM3Beam + ' kg/m³');
  html += gr('أساسات', (concreteFoundation * rebarKgFoundation / 1000).toFixed(1), 'طن', rebarKgFoundation + ' kg/m³');
  html += gr('الإجمالي + 5% هدر', rebarTons, 'طن', 'للطلب');
  html += '</table></div></div>';

  // Masonry
  html += '<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;overflow:hidden;">';
  html += '<div style="background:rgba(46,204,113,0.08);padding:8px 12px;font-size:12px;font-weight:700;color:#2ecc71;">🧱 أعمال البناء والطابوق</div>';
  html += '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.7)"><th>المادة</th><th>الكمية</th><th>الوحدة</th><th>ملاحظة</th></tr>';
  html += gr('مساحة الجدران الكلية', totalWallArea.toFixed(0), 'm²', 'خارجي + داخلي');
  html += gr('بلوك (400×200×200)', blockCount, 'حبة', '+8% هدر');
  html += gr('ملاط البناء', mortarVol, 'm³', '30mm joints avg');
  html += gr('اسمنت الملاط', mortarCementBags, 'كيس', '1:4 Cement:Sand');
  html += gr('رمل الملاط', mortarSand, 'm³', 'رمل ناعم');
  html += gr('ماء الملاط', mortarWater, 'لتر', 'تقريبي');
  html += '</table></div></div>';

  // Formwork
  html += '<div style="background:var(--dark3);border:1px solid var(--border);border-radius:10px;overflow:hidden;">';
  html += '<div style="background:rgba(155,89,182,0.08);padding:8px 12px;font-size:12px;font-weight:700;color:#9b59b6;">🪵 الشدات (Formwork)</div>';
  html += '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.7)"><th>العنصر</th><th>الكمية</th><th>الوحدة</th><th>ملاحظة</th></tr>';
  html += gr('مساحة الشدات المطلوبة', formworkM2, 'm²', '1.3× مساحة الطابق');
  html += gr('خشب / متال Form', formworkM2, 'm²', 'حسب نوع النظام المختار');
  html += '</table></div></div>';

  html += '</div>';

  document.getElementById('mc-results').innerHTML = html;
  document.getElementById('mc-results').style.display = 'block';
}



function calcSPT() {
  let val = parseFloat(document.getElementById('spt-val').value);
  let type = document.getElementById('spt-type').value;
  if (isNaN(val)) return showToast('أدخل N-Value');
  let classes, desc;
  if (type === 'sand') {
    if (val < 4) desc = 'رخو جداً (Very Loose) — خطر الCollapse';
    else if (val < 10) desc = 'رخو (Loose) — تحمل ضعيف';
    else if (val < 30) desc = 'متوسط (Medium Dense) — مقبول للطرق';
    else if (val < 50) desc = 'كثيف (Dense) — جيد للأساسات';
    else desc = 'كثيف جداً (Very Dense) — ممتاز';
  } else {
    if (val < 2) desc = 'طري جداً (Very Soft) — غير صالح';
    else if (val < 4) desc = 'طري (Soft) — ضعيف';
    else if (val < 8) desc = 'متوسط (Medium Stiff)';
    else if (val < 15) desc = 'صلب (Stiff) — جيد';
    else if (val < 30) desc = 'صلب جداً (Very Stiff)';
    else desc = 'قاسي (Hard) — ممتاز';
  }
  let pass = val >= 10;
  showResult('spt-result', pass, val, 10, 'N = ' + val + ' | ' + desc);
}

function calcSulphateClass() {
  let val = parseFloat(document.getElementById('sul-class-val').value);
  const sample = document.getElementById('sul-sample').value;
  if (isNaN(val)) return showToast('أدخل النتيجة');
  let cls, cement, pass;
  if (sample === 'soil') {
    if (val < 0.2) { cls = 'Class 1'; cement = 'OPC عادي مقبول'; pass = true; }
    else if (val < 0.5) { cls = 'Class 2'; cement = 'SRPC أو OPC+GGBS'; pass = true; }
    else if (val < 1.0) { cls = 'Class 3'; cement = 'SRPC إلزامي'; pass = false; }
    else if (val < 2.0) { cls = 'Class 4'; cement = 'SRPC + Protective Coating'; pass = false; }
    else { cls = 'Class 5 — خطر شديد'; cement = 'دراسة خاصة إلزامية'; pass = false; }
    showResult('sul-class-result', pass, val, 0.5, cls + ' | SO3 = ' + val + '% | الأسمنت المطلوب: ' + cement);
  } else {
    if (val < 400) { cls = 'Class 1'; cement = 'OPC عادي'; pass = true; }
    else if (val < 1500) { cls = 'Class 2'; cement = 'SRPC أو OPC+GGBS'; pass = true; }
    else if (val < 3000) { cls = 'Class 3'; cement = 'SRPC إلزامي'; pass = false; }
    else if (val < 6000) { cls = 'Class 4'; cement = 'SRPC + Coating'; pass = false; }
    else { cls = 'Class 5'; cement = 'دراسة خاصة'; pass = false; }
    showResult('sul-class-result', pass, val, 1500, cls + ' | SO4 = ' + val + ' mg/L | ' + cement);
  }
}

function calcCBRRoad() {
  let val = parseFloat(document.getElementById('cbr-road-val').value);
  if (isNaN(val)) return showToast('أدخل CBR');
  let desc, layer;
  if (val < 3) { desc = 'ضعيف جداً — استبدال كامل'; layer = 'غير صالح'; }
  else if (val < 5) { desc = 'ضعيف — معالجة أو استبدال'; layer = 'غير صالح للـ Subgrade'; }
  else if (val < 8) { desc = 'مقبول للـ Subgrade فقط'; layer = 'Subgrade (≥8%)'; }
  else if (val < 30) { desc = 'صالح Subgrade — غير كافي Subbase'; layer = 'Subgrade ✅ | Subbase ❌'; }
  else if (val < 80) { desc = 'صالح Subbase — غير كافي Base'; layer = 'Subbase ✅ | Base ❌'; }
  else { desc = 'صالح لجميع الطبقات'; layer = 'Subgrade ✅ | Subbase ✅ | Base ✅'; }
  let pass = val >= 8;
  showResult('cbr-road-result', pass, val, 8, 'CBR = ' + val + '% | ' + layer + ' | ' + desc);
}

function calcBearingCap() {
  let n = parseFloat(document.getElementById('bc-n').value);
  const b = parseFloat(document.getElementById('bc-b').value);
  if (!n || !b) return showToast('أدخل كل البيانات');
  // Terzaghi approximation for sand: qa = N/4 * (1 + B/30) * 10 kPa (simplified)
  const qa = Math.round((n / 4) * (1 + b / 30) * 10);
  let pass = qa >= 100;
  showResult('bc-result', pass, qa, 100, 'تحمل مبدئي ≈ ' + qa + ' kPa | N60 = ' + n + ' | B = ' + b + 'm | ⚠️ هذا تقدير أولي فقط — يحتاج تحليل جيوتقني كامل');
}

function calcPIClass() {
  let ll = parseFloat(document.getElementById('pi-ll').value);
  let pl = parseFloat(document.getElementById('pi-pl').value);
  if (!ll || !pl) return showToast('أدخل LL و PL');
  let pi = ll - pl;
  let swell, desc, pass;
  if (pi < 5) { desc = 'Non-plastic أو PI منخفض'; swell = 'لا انتفاخ'; pass = true; }
  else if (pi < 10) { desc = 'Slightly Plastic'; swell = 'انتفاخ منخفض'; pass = true; }
  else if (pi < 20) { desc = 'Plastic Medium'; swell = 'انتفاخ متوسط'; pass = false; }
  else if (pi < 35) { desc = 'Highly Plastic'; swell = 'انتفاخ عالٍ — خطر'; pass = false; }
  else { desc = 'Very Highly Plastic'; swell = 'انتفاخ شديد جداً — معالجة إلزامية'; pass = false; }
  showResult('pi-result', pass, pi, 20, 'PI = ' + pi + '% | ' + desc + ' | ' + swell + (pi > 10 ? ' | ⚠️ معالجة بـ Lime مطلوبة' : ''));
}

// ===== CALCULATOR =====
// ═══════════════════════════════════════════════════════════════
// PHASE 5 — CALCULATOR PANELS (injected after modal opens)
// ═══════════════════════════════════════════════════════════════
function _calcField(id, label, placeholder, unit) {
  return '<div class="calc-row"><span class="calc-label">' + label + '</span>' +
    '<input class="calc-input" id="' + id + '" type="number" placeholder="' + placeholder + '" step="any">' +
    (unit ? '<span class="calc-unit">' + unit + '</span>' : '') + '</div>';
}
function _calcSelect(id, label, opts) {
  return '<div class="calc-row"><span class="calc-label">' + label + '</span>' +
    '<select class="calc-select" id="' + id + '">' +
    opts.map(function(o){ return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('') +
    '</select></div>';
}
function _calcBtn(fn, label) {
  return '<button class="calc-btn" onclick="' + fn + '">' + label + '</button>';
}
function _calcResult(id) {
  return '<div class="calc-result" id="' + id + '"></div>';
}
function _section(id, title, inner) {
  return '<div class="calc-section" id="calc-' + id + '"><div class="calc-title">' + title + '</div>' + inner + '</div>';
}
function _tabs(catId, tabs) {
  return '<div class="calc-tabs">' + tabs.map(function(t,i){
    return '<div class="calc-tab' + (i===0?' active':'') + '" onclick="switchCalc(\'' + t[0] + '\',this)">' + t[1] + '</div>';
  }).join('') + '</div>';
}

function initCalcPanels() {
  // ── ROADS ──────────────────────────────────────────────────
  const roadsEl = document.getElementById('cat-roads');
  if (roadsEl && !roadsEl.dataset.built) {
    roadsEl.dataset.built = '1';
    roadsEl.innerHTML =
      _tabs('roads',[['comp-r','🔵 Compaction'],['cbr-r','🟤 CBR'],['att-r','📊 Atterberg'],['la-r','💪 LA Abrasion'],['fli-r','🔷 Flakiness'],['se-r','🟡 Sand Eq.'],['asp-r','🛣️ Asphalt']]) +
      _section('comp-r','🔵 Compaction — ضغط الطبقة',
        _calcSelect('comp-layer','الطبقة / Layer',[['95','Subgrade (≥95% MDD)'],['98','Subbase (≥98% MDD)'],['98','Base Course (≥98% MDD)']]) +
        _calcField('comp-actual','الكثافة الحقلية (g/cm³)','e.g. 1.92','g/cm³') +
        _calcField('comp-mdd','MDD من Proctor','e.g. 2.01','g/cm³') +
        _calcBtn('calcCompaction()','احسب النتيجة ✅') + _calcResult('comp-result')) +
      _section('cbr-r','🟤 CBR',
        _calcSelect('cbr-layer','الطبقة',[['8','Subgrade (≥8%)'],['70','Subbase (≥70%)'],['80','Base Course (≥80%)']]) +
        _calcField('cbr-val','CBR Soaked (4 أيام)','e.g. 75','%') +
        _calcBtn('calcCBR()','احسب CBR') + _calcResult('cbr-result')) +
      _section('att-r','📊 Atterberg Limits',
        _calcSelect('att-layer','الطبقة',[['subgrade','Subgrade (PI≤10%, LL≤35%)'],['subbase','Subbase (PI≤6%)'],['base','Base Course (PI≤4%)']]) +
        _calcField('att-ll','Liquid Limit (LL)','e.g. 28','%') +
        _calcField('att-pl','Plastic Limit (PL)','e.g. 18','%') +
        _calcBtn('calcAtterberg()','احسب PI') + _calcResult('att-result')) +
      _section('la-r','💪 LA Abrasion',
        _calcSelect('la-layer','الطبقة',[['30','Subbase (≤30%)'],['25','Base Course (≤25%)']]) +
        _calcField('la-val','نتيجة LA Abrasion','e.g. 22','%') +
        _calcBtn('calcLA()','احسب') + _calcResult('la-result')) +
      _section('fli-r','🔷 Flakiness Index',
        _calcSelect('fli-layer','الطبقة',[['35','Subbase (≤35%)'],['25','Base Course (≤25%)']]) +
        _calcField('fli-val','Flakiness Index','e.g. 20','%') +
        _calcBtn('calcFlakiness()','احسب') + _calcResult('fli-result')) +
      _section('se-r','🟡 Sand Equivalent',
        _calcSelect('se-layer','الطبقة',[['30','Subbase (≥30%)'],['45','Base Course (≥45%)']]) +
        _calcField('se-val','Sand Equivalent','e.g. 40','%') +
        _calcBtn('calcSandEq()','احسب') + _calcResult('se-result')) +
      _section('asp-r','🛣️ Asphalt — Marshall + Core',
        _calcSelect('asp-type-r','نوع الطبقة',[['bc','Binder Course'],['wc','Wearing Course']]) +
        _calcField('asp-stab','Marshall Stability','e.g. 9.2','kN') +
        _calcField('asp-flow','Flow','e.g. 3.5','mm') +
        _calcField('asp-va','Air Voids Va','e.g. 4.1','%') +
        _calcField('asp-core','Core Density','e.g. 97.8','% TMD') +
        _calcField('asp-temp','Temp عند التسليم','e.g. 145','°C') +
        _calcBtn('calcAsphaltFull()','فحص كامل للإسفلت') + _calcResult('asp-result'));
    // hide non-first sections
    roadsEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }

  // ── UTILITIES ──────────────────────────────────────────────
  const utilEl = document.getElementById('cat-utilities');
  if (utilEl && !utilEl.dataset.built) {
    utilEl.dataset.built = '1';
    utilEl.innerHTML =
      _tabs('utilities',[['pres-u','💧 Pressure Test'],['air-u','💨 Air Test'],['cov-u','📏 Cover Depth'],['trench-u','⛏️ Trench Compact.']]) +
      _section('pres-u','💧 Hydrostatic Pressure Test — مواسير المياه',
        _calcField('pres-pn','Pipe PN (Nominal Pressure)','e.g. 16','bar') +
        _calcField('pres-act','الضغط الفعلي المُطبَّق','e.g. 24','bar') +
        _calcField('pres-drop','انخفاض الضغط خلال 2hr','e.g. 0.3','bar') +
        _calcField('pres-dur','مدة الاختبار الفعلية','e.g. 120','دقيقة') +
        _calcBtn('calcPressureTest()','تحقق من الاختبار') + _calcResult('pres-result')) +
      _section('air-u','💨 Air Test — مواسير الصرف الصحي',
        _calcField('air-pres','الضغط الأولي','e.g. 100','mmWG') +
        _calcField('air-drop','الانخفاض خلال 5 دقائق','e.g. 8','mmWG') +
        _calcField('air-dia','قطر الماسورة DN','e.g. 300','mm') +
        _calcBtn('calcAirTest()','تحقق من Air Test') + _calcResult('air-result')) +
      _section('cov-u','📏 Cover Depth — عمق التغطية',
        _calcSelect('cov-net','نوع الشبكة',[['water','مياه شرب (≥1.0m)'],['sewer','صرف صحي (≥1.2m)'],['storm','تصريف سطحي (≥0.9m)'],['elec','كهرباء KAHRAMAA (≥0.8m)']]) +
        _calcField('cov-act','عمق الغطاء الفعلي','e.g. 1.1','متر') +
        _calcBtn('calcCoverDepth()','تحقق من العمق') + _calcResult('cov-result')) +
      _section('trench-u','⛏️ Trench Backfill Compaction',
        _calcSelect('trench-zone','المنطقة',[['haunching','Haunching Zone (≥95% MDD)'],['initial','Initial Backfill (≥95% MDD)'],['final','Final Backfill (≥98% MDD)']]) +
        _calcField('trench-act','الكثافة الحقلية','e.g. 1.88','g/cm³') +
        _calcField('trench-mdd','MDD (Proctor)','e.g. 1.95','g/cm³') +
        _calcBtn('calcTrenchCompact()','تحقق من الضغط') + _calcResult('trench-result'));
    utilEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }

  // ── STRUCTURAL ─────────────────────────────────────────────
  const strEl = document.getElementById('cat-structural');
  if (strEl && !strEl.dataset.built) {
    strEl.dataset.built = '1';
    strEl.innerHTML =
      _tabs('structural',[['cube-s','🧱 Cube Strength'],['slump-s','💧 Slump'],['cover-s','📏 Cover Rebar'],['wc-s','⚗️ w/c Ratio'],['sul-s','🧪 Sulphate']]) +
      _section('cube-s','🧱 Concrete Cube Strength',
        _calcSelect('cube-grade','درجة الخرسانة',[['20','C20 (fcu=20 N/mm²)'],['25','C25 (fcu=25)'],['30','C30 (fcu=30)'],['35','C35 (fcu=35)'],['40','C40 (fcu=40)'],['45','C45 (fcu=45)'],['50','C50 (fcu=50)']]) +
        _calcSelect('cube-age','عمر العينة',[['7','7 يوم (≥70% fcu)'],['28','28 يوم (≥100% fcu)']]) +
        _calcField('cube-res','نتيجة Cube','e.g. 32','N/mm²') +
        _calcBtn('calcCubeStrength()','تحقق من المقاومة') + _calcResult('cube-result')) +
      _section('slump-s','💧 Slump Test',
        _calcSelect('slump-method','طريقة الصب',[['direct','صب مباشر (75-100mm)'],['pump','بمضخة (100-150mm)'],['special','Special Element (150-180mm)']]) +
        _calcField('slump-val','قيمة Slump المقاسة','e.g. 120','mm') +
        _calcBtn('calcSlump()','تحقق من Slump') + _calcResult('slump-result')) +
      _section('cover-s','📏 Rebar Cover — غطاء الحديد',
        _calcSelect('cover-elem','نوع العنصر',[['foundation','Foundation on soil (75mm)'],['ext_col','External Column (40mm)'],['int_col','Internal Column (25mm)'],['ext_slab','External Slab (40mm)'],['int_slab','Internal Slab (20mm)'],['wall','Wall External (40mm)']]) +
        _calcField('cover-act','الغطاء المقاس','e.g. 38','mm') +
        _calcBtn('calcRebarCover()','تحقق من الغطاء') + _calcResult('cover-result')) +
      _section('wc-s','⚗️ w/c Ratio Check',
        _calcSelect('wc-env','بيئة التعرض',[['mild','Mild Internal (w/c≤0.55)'],['moderate','Moderate External (w/c≤0.50)'],['severe','Severe Chemical (w/c≤0.45)'],['marine','Marine/Splash (w/c≤0.40)'],['submerged','Submerged Marine (w/c≤0.38)']]) +
        _calcField('wc-water','كمية الماء','e.g. 155','kg/m³') +
        _calcField('wc-cement','كمية الأسمنت','e.g. 380','kg/m³') +
        _calcBtn('calcWCRatio()','احسب w/c') + _calcResult('wc-result')) +
      _section('sul-s','🧪 Sulphate Content',
        _calcSelect('sul-type-s','نوع العينة',[['soil','تربة — SO3 (≤0.5%)'],['water','مياه — SO4 (≤500 mg/L)'],['aggregate','ركام — SO3 (≤0.4%)']]) +
        _calcField('sul-val-s','نتيجة الاختبار','e.g. 0.3','') +
        _calcBtn('calcSulphate()','تحقق من الكبريتات') + _calcResult('sul-result'));
    strEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }

  // ── GEOTECH ────────────────────────────────────────────────
  const geoEl = document.getElementById('cat-geotech_calc');
  if (geoEl && !geoEl.dataset.built) {
    geoEl.dataset.built = '1';
    geoEl.innerHTML =
      _tabs('geotech_calc',[['spt-g','🔩 SPT N-Value'],['cbr-g','🟤 CBR Soil'],['pi-g','📊 PI Class'],['sul-g','🧪 Sulphate Class'],['bc-g','🏛️ Bearing Cap.']]) +
      _section('spt-g','🔩 SPT N-Value Classification',
        _calcSelect('spt-type','نوع التربة',[['sand','رمل / Sand'],['clay','طين / Clay']]) +
        _calcField('spt-val','N-Value من الحقل','e.g. 18','blows/300mm') +
        _calcBtn('calcSPT()','صنّف التربة') + _calcResult('spt-result')) +
      _section('cbr-g','🟤 CBR للتربة',
        _calcSelect('cbr-g-use','الاستخدام',[['subgrade','Subgrade Acceptance (≥8%)'],['foundation','Foundation Subgrade (≥15%)']]) +
        _calcField('cbr-g-val','CBR Soaked','e.g. 12','%') +
        _calcBtn('calcCBRGeo()','تحقق') + _calcResult('cbr-g-result')) +
      _section('pi-g','📊 Plasticity Index — تصنيف التربة',
        _calcField('pi-ll','Liquid Limit LL','e.g. 42','%') +
        _calcField('pi-pl','Plastic Limit PL','e.g. 24','%') +
        _calcBtn('calcPIClass()','صنّف PI') + _calcResult('pi-result')) +
      _section('sul-g','🧪 Sulphate Classification — بيئة قطر',
        _calcSelect('sul-g-type','نوع العينة',[['soil_pct','تربة SO3 %'],['water_mgl','مياه جوفية SO4 mg/L']]) +
        _calcField('sul-g-val','نتيجة الاختبار','e.g. 0.8','') +
        _calcBtn('calcSulphateClass()','صنّف + حدد الأسمنت') + _calcResult('sul-class-result')) +
      _section('bc-g','🏛️ Bearing Capacity (Meyerhof-SPT)',
        _calcField('bc-n','N60 (SPT corrected)','e.g. 20','blow') +
        _calcField('bc-b','عرض الأساس B','e.g. 1.5','m') +
        _calcBtn('calcBearingCap()','احسب القدرة التحملية') + _calcResult('bc-result'));
    geoEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }
}

// ── NEW CALC FUNCTIONS (Phase 5) ──────────────────────────────
function calcAsphaltFull() {
  let type = document.getElementById('asp-type-r').value;
  let stab = parseFloat(document.getElementById('asp-stab').value);
  let flow = parseFloat(document.getElementById('asp-flow').value);
  let va = parseFloat(document.getElementById('asp-va').value);
  const core = parseFloat(document.getElementById('asp-core').value);
  let temp = parseFloat(document.getElementById('asp-temp').value);
  let el = document.getElementById('asp-result');
  if (!el) return;
  const minStab = type === 'wc' ? 9 : 8;
  const minTemp = type === 'wc' ? 145 : 140;
  let issues = [], pass = true;
  if (!isNaN(stab)  && stab  < minStab) { issues.push('Stability ' + stab + 'kN < ' + minStab + 'kN'); pass = false; }
  if (!isNaN(flow)  && (flow < 2 || flow > 4)) { issues.push('Flow ' + flow + 'mm خارج 2-4mm'); pass = false; }
  if (!isNaN(va)    && (va < 3 || va > 5))    { issues.push('Va ' + va + '% خارج 3-5%'); pass = false; }
  if (!isNaN(core)  && core  < 97)            { issues.push('Core Density ' + core + '% < 97% TMD'); pass = false; }
  if (!isNaN(temp)  && temp  < minTemp)        { issues.push('Temp ' + temp + '°C < ' + minTemp + '°C → رفض الشاحنة'); pass = false; }
  let detail = issues.length ? issues.join(' | ') : 'جميع معاملات الإسفلت مطابقة ✅';
  const action = pass ? '' : 'Mill and re-lay — إعادة الدمك أو رفع الطبقة وإعادتها';
  showResult('asp-result', pass, null, null, detail, action);
}

function calcPressureTest() {
  let pn = parseFloat(document.getElementById('pres-pn').value);
  let act = parseFloat(document.getElementById('pres-act').value);
  let drop = parseFloat(document.getElementById('pres-drop').value);
  const dur = parseFloat(document.getElementById('pres-dur').value);
  if (isNaN(pn) || isNaN(act)) return showToast('أدخل PN والضغط الفعلي');
  const reqPres = pn * 1.5;
  const presOK = act >= reqPres;
  const dropOK = !isNaN(drop) ? drop <= 0.2 : true;
  const durOK = !isNaN(dur)  ? dur >= 120  : true;
  let pass = presOK && dropOK && durOK;
  let detail = 'الضغط المطلوب: ' + reqPres + ' bar (1.5×PN) | الفعلي: ' + act + ' bar | انخفاض: ' + (isNaN(drop)?'—':drop+' bar') + ' | مدة: ' + (isNaN(dur)?'—':dur+' min');
  showResult('pres-result', pass, act, reqPres, detail, 'تحديد موقع التسرب + إصلاح + إعادة الاختبار');
}

function calcAirTest() {
  let drop = parseFloat(document.getElementById('air-drop').value);
  let dia = parseFloat(document.getElementById('air-dia').value);
  if (isNaN(drop)) return showToast('أدخل الانخفاض');
  let req = dia <= 150 ? 10 : dia <= 300 ? 15 : 20;
  let pass = drop <= req;
  showResult('air-result', pass, drop, req, 'الانخفاض المسموح ≤' + req + ' mmWG للـ DN' + (dia||'?') + ' | الفعلي: ' + drop + ' mmWG', 'كشف موضع التسرب + إصلاح + إعادة Air Test');
}

function calcCoverDepth() {
  const net = document.getElementById('cov-net').value;
  let act = parseFloat(document.getElementById('cov-act').value);
  let reqs = { water: 1.0, sewer: 1.2, storm: 0.9, elec: 0.8 };
  let req = reqs[net] || 1.0;
  if (isNaN(act)) return showToast('أدخل عمق الغطاء');
  showResult('cov-result', act >= req, act, req, 'العمق المطلوب: ≥' + req + 'm | الفعلي: ' + act + 'm', 'تعميق الخندق للوصول للحد الأدنى المطلوب');
}

function calcTrenchCompact() {
  let zone = document.getElementById('trench-zone').value;
  let act = parseFloat(document.getElementById('trench-act').value);
  let mdd = parseFloat(document.getElementById('trench-mdd').value);
  if (isNaN(act) || isNaN(mdd)) return showToast('أدخل الكثافة و MDD');
  let req = zone === 'final' ? 98 : 95;
  let pct = (act / mdd * 100).toFixed(1);
  showResult('trench-result', parseFloat(pct) >= req, pct, req, 'Compaction: ' + pct + '% | المطلوب: ≥' + req + '% MDD', 'إعادة الدمك بطبقات + زيادة عدد المرورات');
}

function calcCubeStrength() {
  let grade = parseFloat(document.getElementById('cube-grade').value);
  let age = document.getElementById('cube-age').value;
  let res = parseFloat(document.getElementById('cube-res').value);
  if (isNaN(res)) return showToast('أدخل نتيجة Cube');
  let req = age === '7' ? grade * 0.7 : grade;
  let pass = res >= req;
  showResult('cube-result', pass, res, req, (age==='7'?'7':'28') + ' يوم | fcu=' + grade + ' N/mm² | المطلوب: ≥' + req + ' | الفعلي: ' + res + ' N/mm²', 'Core drilling من الهيكل + تقييم هندسي + قرار هدم/قبول');
}

function calcSlump() {
  const method = document.getElementById('slump-method').value;
  let val = parseFloat(document.getElementById('slump-val').value);
  if (isNaN(val)) return showToast('أدخل قيمة Slump');
  const ranges = { direct:[75,100], pump:[100,150], special:[150,180] };
  let r = ranges[method] || [75,100];
  let pass = val >= r[0] && val <= r[1];
  showResult('slump-result', pass, val, r[0]+'-'+r[1], 'Slump المقاس: ' + val + 'mm | النطاق المطلوب: ' + r[0] + '-' + r[1] + 'mm', val < r[0] ? 'إضافة ماء/ملدّن بعناية ثم إعادة' : 'رفض الحمولة — Slump مرتفع جداً');
}

function calcRebarCover() {
  const elem = document.getElementById('cover-elem').value;
  const act = parseFloat(document.getElementById('cover-act').value);
  if (isNaN(act)) return showToast('أدخل الغطاء المقاس');
  const reqs = { foundation:75, ext_col:40, int_col:25, ext_slab:40, int_slab:20, wall:40 };
  let req = reqs[elem] || 25;
  showResult('cover-result', act >= req, act, req, 'الغطاء المطلوب: ' + req + 'mm | المقاس: ' + act + 'mm', 'إعادة تركيب الحديد بعد تصحيح الـ spacers');
}

function calcWCRatio() {
  const env = document.getElementById('wc-env').value;
  const water = parseFloat(document.getElementById('wc-water').value);
  let cement = parseFloat(document.getElementById('wc-cement').value);
  if (isNaN(water) || isNaN(cement)) return showToast('أدخل الماء والأسمنت');
  let limits = { mild:0.55, moderate:0.50, severe:0.45, marine:0.40, submerged:0.38 };
  let req = limits[env] || 0.45;
  let wc = (water / cement).toFixed(3);
  showResult('wc-result', parseFloat(wc) <= req, wc, req, 'w/c الفعلي: ' + wc + ' | الحد الأقصى: ' + req, 'تقليل الماء أو زيادة الأسمنت + إعادة Trial Mix');
}

function calcCBRGeo() {
  let use = document.getElementById('cbr-g-use').value;
  let val = parseFloat(document.getElementById('cbr-g-val').value);
  if (isNaN(val)) return showToast('أدخل CBR');
  let req = use === 'foundation' ? 15 : 8;
  showResult('cbr-g-result', val >= req, val, req, 'CBR: ' + val + '% | المطلوب: ≥' + req + '% Soaked 4 days', 'Lime Stabilization أو استبدال التربة');
}

function switchMainCat(cat, btn) {
  ['roads','utilities','structural','geotech_calc'].forEach(c => {
    const el = document.getElementById('cat-' + c);
    const tab = document.getElementById('main-tab-' + c);
    if (el) el.style.display = c === cat ? 'block' : 'none';
    if (tab) {
      if (c === cat) {
        tab.style.background = 'rgba(201,168,76,0.15)';
        tab.style.borderColor = 'rgba(201,168,76,0.3)';
        tab.style.color = 'var(--gold2)';
        tab.style.fontWeight = '700';
      } else {
        tab.style.background = 'var(--dark4)';
        tab.style.borderColor = 'var(--border)';
        tab.style.color = 'var(--text2)';
        tab.style.fontWeight = '400';
      }
    }
  });
  // Reset tabs in the activated category
  const catEl = document.getElementById('cat-' + cat);
  if (catEl) {
    catEl.querySelectorAll('.calc-section').forEach((s,i) => s.style.display = i===0 ? 'block' : 'none');
    catEl.querySelectorAll('.calc-tab').forEach((t,i) => { t.classList.toggle('active', i===0); });
  }
}

function switchCalc(id, tab) {
  const parent = tab.closest('[id^="cat-"]');
  if (parent) {
    parent.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    parent.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  }
  const el = document.getElementById('calc-' + id);
  if (el) el.style.display = 'block';
  tab.classList.add('active');
}

function showResult(elId, pass, value, required, detail, action) {
  let el = document.getElementById(elId);
  if (!el) return;
  // Determine state: pass / warning / fail
  let state = pass ? 'pass' : 'fail';
  // Compute warning zone: value within 5% of limit
  if (!pass && value !== null && required !== null) {
    let margin = Math.abs(value - required);
    let pct = required !== 0 ? (margin / Math.abs(required)) * 100 : 0;
    if (pct <= 5) state = 'warning';
  }
  const icon = state === 'pass' ? '✅' : state === 'warning' ? '⚠️' : '❌';
  const label = state === 'pass' ? 'PASS — مطابق للمواصفة' : state === 'warning' ? 'WARNING — قريب من الحد' : 'FAIL — لا يطابق المواصفة';
  let rowsHTML = '';
  if (value !== null && required !== null) {
    rowsHTML += '<div class="calc-result-row"><span class="calc-result-label">القيمة الفعلية</span><span class="calc-result-val">' + value + '</span></div>';
    rowsHTML += '<div class="calc-result-row"><span class="calc-result-label">الحد المطلوب</span><span class="calc-result-val">' + required + '</span></div>';
  }
  const actionHTML = (state !== 'pass' && action) ? '<div class="calc-result-action">🔧 الإجراء التصحيحي: ' + action + '</div>' : '';
  el.style.display = 'block';
  el.className = 'calc-result ' + state;
  el.innerHTML = '<div class="calc-result-header"><span class="calc-result-icon">' + icon + '</span><span class="calc-result-text">' + label + '</span></div>' + rowsHTML + '<div class="calc-result-detail">' + detail + '</div>' + actionHTML;
}

// ROADS
function calcCompaction() {
  const actual = parseFloat(document.getElementById('comp-actual').value);
  const mdd = parseFloat(document.getElementById('comp-mdd').value);
  const req = parseFloat(document.getElementById('comp-layer').value);
  if (!actual || !mdd) return showToast('❌ أدخل كل البيانات');
  const pct = (actual / mdd * 100).toFixed(1);
  showResult('comp-result', parseFloat(pct) >= req, pct, req, `Compaction %: ${pct}% | المطلوب: ≥ ${req}% MDD | الفرق: ${(pct - req).toFixed(1)}%`);
}

function calcCBR() {
  const val = parseFloat(document.getElementById('cbr-val').value);
  const req = parseFloat(document.getElementById('cbr-layer').value);
  if (!val) return showToast('❌ أدخل نتيجة CBR');
  showResult('cbr-result', val >= req, val, req, `CBR الفعلي: ${val}% | المطلوب: ≥ ${req}% (Soaked 4 days)`);
}

function calcAtterberg() {
  const ll = parseFloat(document.getElementById('att-ll').value);
  const pl = parseFloat(document.getElementById('att-pl').value);
  const layer = document.getElementById('att-layer').value;
  if (!ll || !pl) return showToast('❌ أدخل LL و PL');
  const pi = ll - pl;
  let llReq = 35, piReq = 10;
  if (layer === 'subbase') { llReq = 999; piReq = 6; }
  if (layer === 'base') { llReq = 999; piReq = 4; }
  const llPass = ll <= llReq;
  const piPass = pi <= piReq;
  const allPass = llPass && piPass;
  showResult('att-result', allPass, null, null, `PI = ${pi.toFixed(1)}% ${piPass ? '✅' : '❌'} (≤${piReq}%) | LL = ${ll}% ${llPass && llReq < 100 ? (ll <= llReq ? '✅' : '❌') : '✅'} ${llReq < 100 ? '(≤'+llReq+'%)' : ''}`);
}

function calcLA() {
  const val = parseFloat(document.getElementById('la-val').value);
  const req = parseFloat(document.getElementById('la-layer').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('la-result', val <= req, val, req, `LA Abrasion: ${val}% | المطلوب: ≤ ${req}%`);
}

function calcFlakiness() {
  const val = parseFloat(document.getElementById('fli-val').value);
  const req = parseFloat(document.getElementById('fli-layer').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('fli-result', val <= req, val, req, `Flakiness Index: ${val}% | المطلوب: ≤ ${req}%`);
}

function calcSandEq() {
  const val = parseFloat(document.getElementById('se-val').value);
  const req = parseFloat(document.getElementById('se-layer').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('se-result', val >= req, val, req, `Sand Equivalent: ${val}% | المطلوب: ≥ ${req}%`);
}

function calcSulphate() {
  const sul = parseFloat(document.getElementById('sul-val').value);
  const chl = parseFloat(document.getElementById('chl-val').value);
  const type = document.getElementById('sul-type').value;
  if (!sul) return showToast('❌ أدخل نتيجة Sulphate');
  const sulReq = type === 'soil' ? 0.5 : 0.4;
  const chlReq = type === 'soil' ? 0.6 : 0.04;
  const sulPass = sul <= sulReq;
  const chlPass = !chl || chl <= chlReq;
  showResult('sul-result', sulPass && chlPass, null, null, `SO3: ${sul}% ${sulPass ? '✅' : '❌'} (≤${sulReq}%)${chl ? ` | Cl: ${chl}% ${chlPass ? '✅' : '❌'} (≤${chlReq}%)` : ''}`);
}

function calcMarshall() {
  const stab = parseFloat(document.getElementById('mar-stab').value);
  const flow = parseFloat(document.getElementById('mar-flow').value);
  const va = parseFloat(document.getElementById('mar-va').value);
  const bit = parseFloat(document.getElementById('mar-bit').value);
  const layer = document.getElementById('mar-layer').value;
  if (!stab || !flow || !va) return showToast('❌ أدخل كل البيانات');
  const bitMin = layer === 'binder' ? 4.5 : 5.0;
  const bitMax = layer === 'binder' ? 6.0 : 6.5;
  const stabPass = stab >= 8;
  const flowPass = flow >= 2 && flow <= 4;
  const vaPass = va >= 3 && va <= 5;
  const bitPass = !bit || (bit >= bitMin && bit <= bitMax);
  const allPass = stabPass && flowPass && vaPass && bitPass;
  showResult('mar-result', allPass, null, null, `Stability: ${stab}kN ${stabPass?'✅':'❌'} | Flow: ${flow}mm ${flowPass?'✅':'❌'} | Va: ${va}% ${vaPass?'✅':'❌'}${bit ? ` | Bitumen: ${bit}% ${bitPass?'✅':'❌'} (${bitMin}-${bitMax}%)` : ''}`);
}

function calcCoreDensity() {
  const bulk = parseFloat(document.getElementById('core-bulk').value);
  const tmd = parseFloat(document.getElementById('core-tmd').value);
  if (!bulk || !tmd) return showToast('❌ أدخل كل البيانات');
  const pct = (bulk / tmd * 100).toFixed(1);
  showResult('core-result', parseFloat(pct) >= 98, pct, 98, `Compaction %: ${pct}% TMD | المطلوب: ≥ 98% TMD`);
}

function calcBitumen() {
  const jmf = parseFloat(document.getElementById('bit-jmf').value);
  const actual = parseFloat(document.getElementById('bit-actual').value);
  if (!jmf || !actual) return showToast('❌ أدخل كل البيانات');
  const diff = Math.abs(actual - jmf).toFixed(2);
  const pass = parseFloat(diff) <= 0.3;
  showResult('bit-result', pass, diff, 0.3, `JMF: ${jmf}% | الفعلي: ${actual}% | الفرق: ${diff}% | المسموح: ± 0.3%`);
}

function calcTemperature() {
  const val = parseFloat(document.getElementById('temp-val').value);
  const stage = document.getElementById('temp-stage').value;
  if (!val) return showToast('❌ أدخل درجة الحرارة');
  const limits = {delivery:[140,999],laying:[140,999],initial:[130,145],intermediate:[100,125],final:[80,100]};
  const [min,max] = limits[stage];
  const pass = val >= min && val <= max;
  showResult('temp-result', pass, val, null, `درجة الحرارة: ${val}°C | المطلوب: ${min}${max<999?'-'+max:'+'} °C`);
}

function calcStraightedge() {
  const val = parseFloat(document.getElementById('str-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  showResult('str-result', val <= 5, val, 5, `الفجوة Actual: ${val}mm | المطلوب: ≤ 5mm`);
}

function calcCrossfall() {
  const val = parseFloat(document.getElementById('crf-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  const target = 2.5;
  const tolerance = 0.3;
  const ncrLimit = 0.5;
  const deviation = Math.abs(val - target);
  const pass = deviation <= tolerance;
  const ncrFlag = deviation > ncrLimit;
  const statusMsg = ncrFlag
    ? `⚠️ تجاوز حد NCR (±${ncrLimit}%) — إجراء تصحيحي فوري مطلوب`
    : pass ? `✅ مطابق` : `⚠️ تجاوز التفاوت المسموح ±${tolerance}% — مراقبة وإعادة قياس`;
  showResult('crf-result', pass, val, null,
    `Crossfall: ${val}% | الهدف: ${target}% ± ${tolerance}% (QCS 2024 S6) | الانحراف: ${deviation.toFixed(2)}% | ${statusMsg}`);
}

function calcSkid() {
  const val = parseFloat(document.getElementById('skid-val').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('skid-result', val >= 55, val, 55, `PSV الفعلي: ${val} | المطلوب: ≥ 55 PSV`);
}

function calcLevel() {
  const design = parseFloat(document.getElementById('lev-design').value);
  const actual = parseFloat(document.getElementById('lev-actual').value);
  const tol = parseFloat(document.getElementById('lev-layer').value);
  if (isNaN(design) || isNaN(actual)) return showToast('❌ أدخل كل البيانات');
  const diff = Math.abs(actual - design) * 1000;
  showResult('lev-result', diff <= tol, diff, tol, `الفرق الفعلي: ${diff.toFixed(1)}mm | المسموح: ±${tol}mm | ${actual>design?'مرتفع':'منخفض'} بـ ${diff.toFixed(1)}mm`);
}

function calcPlateLoad() {
  const val = parseFloat(document.getElementById('plt-val').value);
  const req = parseFloat(document.getElementById('plt-req').value);
  if (!val || !req) return showToast('❌ أدخل كل البيانات');
  showResult('plt-result', val >= req, val, req, `K الفعلي: ${val} MN/m³ | المطلوب: ≥ ${req} MN/m³`);
}

function calcPrimeRate() {
  const qty = parseFloat(document.getElementById('prate-qty').value);
  const area = parseFloat(document.getElementById('prate-area').value);
  const type = document.getElementById('prate-type').value;
  if (!qty || !area) return showToast('❌ أدخل كل البيانات');
  const rate = qty / area;
  const limits = {prime:[0.8,1.2],'tack-binder':[0.3,0.5],'tack-wearing':[0.2,0.4]};
  const [min,max] = limits[type];
  const pass = rate >= min && rate <= max;
  showResult('prate-result', pass, rate.toFixed(3), null, `معدل الرش الفعلي: ${rate.toFixed(3)} L/m² | المطلوب: ${min}-${max} L/m²`);
}

// UTILITIES
function calcPressure() {
  const design = parseFloat(document.getElementById('pres-design').value);
  const test = parseFloat(document.getElementById('pres-test').value);
  const start = parseFloat(document.getElementById('pres-start').value);
  const end = parseFloat(document.getElementById('pres-end').value);
  if (!design || !test || !start || !end) return showToast('❌ أدخل كل البيانات');
  const reqTest = design * 1.5;
  const drop = start - end;
  const testPass = test >= reqTest;
  const dropPass = drop <= 0.01;
  showResult('pres-result', testPass && dropPass, null, null, `ضغط الاختبار: ${test} bar ${testPass?'✅':'❌'} (≥${reqTest}) | الانخفاض: ${drop.toFixed(3)} bar ${dropPass?'✅':'❌'} (يجب = صفر)`);
}


function calcChlorination() {
  const conc = parseFloat(document.getElementById('chl-conc').value);
  const time = parseFloat(document.getElementById('chl-time').value);
  if (!conc || !time) return showToast('❌ أدخل كل البيانات');
  const concPass = conc >= 50;
  const timePass = time >= 24;
  showResult('chl-result', concPass && timePass, null, null, `التركيز: ${conc} ppm ${concPass?'✅':'❌'} (≥50 ppm إلزامي — QCS 2024) | المدة: ${time}hr ${timePass?'✅':'❌'} (≥24hr)`);
}

function calcResidualCl() {
  const val = parseFloat(document.getElementById('rcl-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  const pass = val >= 0.2 && val <= 0.5;
  showResult('rcl-result', pass, val, null, `Residual Cl: ${val} ppm | المطلوب: 0.2-0.5 ppm`);
}

function calcTurbidity() {
  const val = parseFloat(document.getElementById('turb-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  showResult('turb-result', val <= 1, val, 1, `Turbidity: ${val} NTU | المطلوب: ≤ 1 NTU`);
}

function calcPH() {
  const val = parseFloat(document.getElementById('ph-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  const pass = val >= 6.5 && val <= 8.5;
  showResult('ph-result', pass, val, null, `pH: ${val} | المطلوب: 6.5-8.5`);
}

function calcPipeSep() {
  const val = parseFloat(document.getElementById('psep-val').value);
  const req = parseFloat(document.getElementById('psep-type').value);
  if (isNaN(val)) return showToast('❌ أدخل المسافة');
  showResult('psep-result', val >= req, val, req, `المسافة Actual: ${val}m | المطلوب: ≥ ${req}m`);
}

function calcSewerGrad() {
  const diff = parseFloat(document.getElementById('grad-diff').value);
  const len = parseFloat(document.getElementById('grad-len').value);
  const minRatio = parseFloat(document.getElementById('grad-dn').value);
  if (!diff || !len) return showToast('❌ أدخل كل البيانات');
  const ratio = len / diff;
  const pass = ratio <= minRatio;
  const pct = (diff / len * 100).toFixed(3);
  showResult('grad-result', pass, ratio.toFixed(0), minRatio, `الانحدار: 1:${ratio.toFixed(0)} (${pct}%) | المطلوب: 1:${minRatio} أو أشد`);
}

function calcManholeWT() {
  const start = parseFloat(document.getElementById('mh-start').value);
  const end = parseFloat(document.getElementById('mh-end').value);
  if (!start || !end) return showToast('❌ أدخل كل البيانات');
  const drop = start - end;
  showResult('mh-result', drop === 0, drop, 0, `انخفاض المياه: ${drop}mm خلال 24hr | المطلوب: صفر تسريب`);
}

function calcCCTV() {
  const grade = parseInt(document.getElementById('cctv-grade').value);
  const pass = grade <= 2;
  const desc = {1:'No Defects',2:'Minor Defects مقبولة',3:'Moderate Defects — يُعاد',4:'Severe Defects — يُعاد',5:'Collapse — يُعاد'};
  showResult('cctv-result', pass, grade, 2, `Grade ${grade}: ${desc[grade]} | المقبول: Grade 1 أو 2 فقط`);
}

function calcGullyLevel() {
  const road = parseFloat(document.getElementById('gul-road').value);
  const gully = parseFloat(document.getElementById('gul-gully').value);
  if (isNaN(road) || isNaN(gully)) return showToast('❌ أدخل كل البيانات');
  const diff = Math.abs(road - gully) * 1000;
  showResult('gul-result', diff <= 5, diff, 5, `الفرق: ${diff.toFixed(1)}mm | المسموح: ±5mm من مستوى الطريق`);
}

// STRUCTURAL
function calcConcrete() {
  const grade = parseFloat(document.getElementById('con-grade').value);
  const age = parseInt(document.getElementById('con-age').value);
  const result = parseFloat(document.getElementById('con-result-val').value);
  if (!result) return showToast('❌ أدخل نتيجة المكعب');
  const req = age === 7 ? grade * 0.7 : grade;
  showResult('con-result', result >= req, result, req, `Cube Result: ${result} N/mm² | المطلوب عند ${age} يوم: ≥ ${req.toFixed(1)} N/mm² (C${grade})`);
}

function calcRebar() {
  const fy = parseFloat(document.getElementById('reb-fy').value);
  const fu = parseFloat(document.getElementById('reb-fu').value);
  const elong = parseFloat(document.getElementById('reb-elong').value);
  if (!fy || !fu) return showToast('❌ أدخل كل البيانات');
  const fyPass = fy >= 500;
  const fuPass = fu >= 600;
  const ratioPass = fu/fy >= 1.15;
  const elongPass = !elong || elong >= 14;
  showResult('reb-result', fyPass&&fuPass&&ratioPass&&elongPass, null, null, `fy: ${fy} ${fyPass?'✅':'❌'} | fu: ${fu} ${fuPass?'✅':'❌'} | fu/fy: ${(fu/fy).toFixed(2)} ${ratioPass?'✅':'❌'}${elong ? ` | Elong: ${elong}% ${elongPass?'✅':'❌'}` : ''}`);
}


function calcCover() {
  const req = parseFloat(document.getElementById('cover-type').value);
  const val = parseFloat(document.getElementById('cover-val').value);
  if (isNaN(val)) return showToast('❌ أدخل القياس');
  showResult('cover-result', val >= req, val, req, `Cover الفعلي: ${val}mm | المطلوب: ≥ ${req}mm`);
}

function calcLapLength() {
  const mult = parseFloat(document.getElementById('lap-type').value);
  const dia = parseFloat(document.getElementById('lap-dia').value);
  const actual = parseFloat(document.getElementById('lap-actual').value);
  if (!dia || !actual) return showToast('❌ أدخل كل البيانات');
  const req = mult * dia;
  showResult('lap-result', actual >= req, actual, req, `الطول الفعلي: ${actual}mm | المطلوب: ${mult}d = ${req}mm (d=${dia}mm)`);
}



// ===== DUAL CALCULATOR MODE =====
function switchCalcMode(mode, btn) {
  const freqPanel = document.getElementById('calc-freq-panel');
  const passPanel = document.getElementById('calc-pass-panel');
  const tabFreq = document.getElementById('calc-tab-freq');
  const tabPass = document.getElementById('calc-tab-pass');
  
  if (mode === 'freq') {
    if (freqPanel) freqPanel.style.display = 'block';
    if (passPanel) passPanel.style.display = 'none';
    if (tabFreq) { tabFreq.style.background = 'rgba(201,168,76,0.2)'; tabFreq.style.color = 'var(--gold)'; tabFreq.style.fontWeight = '700'; }
    if (tabPass) { tabPass.style.background = 'var(--dark4)'; tabPass.style.color = 'var(--text2)'; tabPass.style.fontWeight = '400'; }
  } else {
    if (freqPanel) freqPanel.style.display = 'none';
    if (passPanel) passPanel.style.display = 'block';
    if (tabPass) { tabPass.style.background = 'rgba(201,168,76,0.2)'; tabPass.style.color = 'var(--gold)'; tabPass.style.fontWeight = '700'; }
    if (tabFreq) { tabFreq.style.background = 'var(--dark4)'; tabFreq.style.color = 'var(--text2)'; tabFreq.style.fontWeight = '400'; }
  }
}

// Alias for frequency calculator
function calcFreq() {
  calcTestScheduleCore('ts-mat','ts-qty','ts-unit','ts-result-box', false);
}

// ===== TESTING SCHEDULE CALCULATOR =====
const TS_DATA = {
  subgrade: {
    name: 'Subgrade Soil',
    unit: 'm2',
    tests: [
      { test: 'Proctor Compaction (MDD + OMC)', freq_qty: 0, freq_unit: 'Per material source change', standard: 'ASTM D698', type: 'HP' },
      { test: 'Atterberg Limits (LL + PI)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D4318', type: 'W' },
      { test: 'Sulphate (SO3) + Chloride', freq_qty: 500, freq_unit: 'm³', standard: 'BS 1377', type: 'W' },
      { test: 'Field Density (Sand Cone)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D1556', type: 'W' },
      { test: 'CBR Soaked 4 days', freq_qty: 2000, freq_unit: 'm²', standard: 'ASTM D1883', type: 'HP' },
      { test: 'Level Survey (±10mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'HP' },
    ]
  },
  subbase: {
    name: 'Subbase Course',
    unit: 'm3',
    tests: [
      { test: 'Grading Analysis', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM C136', type: 'W' },
      { test: 'LA Abrasion (≤30%)', freq_qty: 1000, freq_unit: 'm³', standard: 'ASTM C131', type: 'W' },
      { test: 'Sand Equivalent (≥30%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D2419', type: 'W' },
      { test: 'Plasticity Index (≤6%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D4318', type: 'W' },
      { test: 'Field Density (≥98% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D1556', type: 'W' },
      { test: 'CBR Soaked 4 days (≥70%)', freq_qty: 2000, freq_unit: 'm²', standard: 'ASTM D1883', type: 'HP' },
    ]
  },
  base: {
    name: 'Road Base Course',
    unit: 'm3',
    tests: [
      { test: 'Grading Analysis (Table 4:1)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM C136', type: 'W' },
      { test: 'LA Abrasion (≤25%)', freq_qty: 1000, freq_unit: 'm³', standard: 'ASTM C131', type: 'W' },
      { test: 'Fractured Faces 1+ (≥95%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D5821', type: 'W' },
      { test: 'Sand Equivalent (≥45%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D2419', type: 'W' },
      { test: 'Plasticity Index (≤4%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D4318', type: 'W' },
      { test: 'Field Density (≥98% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D1556', type: 'W' },
      { test: 'CBR Soaked 4 days (≥80%)', freq_qty: 2000, freq_unit: 'm²', standard: 'ASTM D1883', type: 'HP' },
      { test: 'Level Survey (±8mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'HP' },
    ]
  },
  asphalt_bc: {
    name: 'Asphalt Binder Course',
    unit: 'ton',
    tests: [
      { test: 'Delivery Temperature (≥140°C)', freq_qty: 1, freq_unit: 'Every load', standard: 'QCS 2024 S8 P5', type: 'W' },
      { test: 'Bitumen Extraction (JMF ±0.3%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D2172', type: 'W' },
      { test: 'Gradation Analysis', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM C136', type: 'W' },
      { test: 'Marshall Stability (≥8kN) + Flow', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D1559', type: 'HP' },
      { test: 'Air Voids Va (3-5%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D3203', type: 'W' },
      { test: 'Core Density (≥97% TMD)', freq_qty: 1000, freq_unit: 'm²', standard: 'ASTM D6927', type: 'HP' },
      { test: 'Level Survey (±8mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'W' },
    ]
  },
  asphalt_wc: {
    name: 'Asphalt Wearing Course',
    unit: 'ton',
    tests: [
      { test: 'Delivery Temperature (≥130°C Non-PMB / ≥145°C PMB)', freq_qty: 1, freq_unit: 'Every load', standard: 'QCS S6 P5', type: 'W' },
      { test: 'Bitumen Extraction (JMF ±0.3%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D2172', type: 'W' },
      { test: 'Marshall Stability (≥9kN) + Flow', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D1559', type: 'HP' },
      { test: 'Air Voids Va (3-5%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D3203', type: 'W' },
      { test: 'Core Density (≥97% TMD)', freq_qty: 1000, freq_unit: 'm²', standard: 'ASTM D6927', type: 'HP' },
      { test: 'Straightedge 3m (≤3mm PMB / ≤5mm)', freq_qty: 100, freq_unit: 'm LM', standard: 'QCS S6 P5', type: 'W' },
      { test: 'IRI Measurement', freq_qty: 400, freq_unit: 'm LM', standard: 'PWA IAN 013', type: 'HP' },
      { test: 'Level Survey (±6mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'HP' },
    ]
  },
  concrete: {
    name: 'Concrete',
    unit: 'm3',
    tests: [
      { test: 'Slump Test', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12350', type: 'W' },
      { test: 'Temperature Check (≤32°C)', freq_qty: 1, freq_unit: 'Every load', standard: 'QCS S5', type: 'W' },
      { test: 'Cube Samples (6 cubes)', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12390', type: 'W' },
      { test: '7-Day Cube Result (≥70% fcu)', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12390', type: 'HP' },
      { test: '28-Day Cube Result (≥fcu)', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12390', type: 'HP' },
      { test: 'Rebar Cover Check', freq_qty: 0, freq_unit: 'Per element after strike', standard: 'QCS S5', type: 'W' },
    ]
  },
  water_pipe: {
    name: 'Water Supply Pipe',
    unit: 'lm',
    tests: [
      { test: 'Bedding Compaction (≥90% MDD)', freq_qty: 50, freq_unit: 'm LM', standard: 'ASTM D1556', type: 'W' },
      { test: 'Backfill Compaction (≥95% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D698', type: 'W' },
      { test: 'Hydrostatic Pressure Test (1.5×PN/2hr)', freq_qty: 0, freq_unit: 'Per section (500m max)', standard: 'KAHRAMAA', type: 'HP' },
      { test: 'Chlorination (≥50ppm / ≥24hr)', freq_qty: 0, freq_unit: 'Per section', standard: 'KAHRAMAA', type: 'HP' },
      { test: 'Water Quality (Coliform=0 / Turbidity≤1NTU)', freq_qty: 0, freq_unit: 'Per section', standard: 'KAHRAMAA', type: 'HP' },
    ]
  },
  sewer_pipe: {
    name: 'Foul Sewer Pipe',
    unit: 'lm',
    tests: [
      { test: 'Bedding Compaction (≥90% MDD)', freq_qty: 50, freq_unit: 'm LM', standard: 'ASTM D1556', type: 'W' },
      { test: 'Air Test (100mm WG / 5min / ≤25mm drop)', freq_qty: 0, freq_unit: 'Per section (500m max)', standard: 'BS EN 1610', type: 'HP' },
      { test: 'CCTV Survey (Grade ≤ 2)', freq_qty: 0, freq_unit: '100% of pipes', standard: 'WRc', type: 'HP' },
      { test: 'Manhole Level (±5mm)', freq_qty: 0, freq_unit: '100% of manholes', standard: 'Survey', type: 'W' },
    ]
  },
  rebar: {
    name: 'Reinforcement Steel',
    unit: 'ton',
    tests: [
      { test: 'Mill Certificate Review (fy, fu, Elongation)', freq_qty: 0, freq_unit: 'Each heat number', standard: 'BS 4449', type: 'HP' },
      { test: 'Third Party Tensile Test', freq_qty: 25, freq_unit: 'tonne', standard: 'BS 4449', type: 'HP' },
      { test: 'Bend Test (180° cold)', freq_qty: 25, freq_unit: 'tonne', standard: 'BS 4449', type: 'W' },
    ]
  }
};

function calcTestSchedule() {
  calcTestScheduleCore('ts-material','ts-qty','ts-unit','ts-result', false);
}
function calcTestScheduleEn() {
  calcTestScheduleCore('ts-material-en','ts-qty-en','ts-unit-en','ts-result-en', true);
}

function calcTestScheduleCore(matId, qtyId, unitId, resultId, isEn) {
  const mat = document.getElementById(matId);
  const qty = parseFloat(document.getElementById(qtyId).value);
  const resultDiv = document.getElementById(resultId);
  
  if (!mat || !mat.value || !qty || qty <= 0) {
    if (resultDiv) resultDiv.style.display = 'none';
    return;
  }
  
  const material = mat.value;
  let data = TS_DATA[material];
  if (!data) return;
  
  let rows = '';
  let totalTests = 0;
  
  data.tests.forEach(function(t) {
    let num = '-';
    if (t.freq_qty > 0) {
      num = Math.ceil(qty / t.freq_qty);
      totalTests += num;
    } else {
      num = t.freq_unit;
    }
    const typeColor = t.type === 'HP' ? '#e74c3c' : '#f39c12';
    const typeLabel = t.type === 'HP' ? '🔴 Hold Point' : '🟡 Witness';
    rows += '<tr><td>' + t.test + '</td>' +
      '<td>' + t.freq_unit + '</td>' +
      '<td style="text-align:center;font-weight:700;color:var(--gold);">' + (typeof num === 'number' ? num + 'x' : num) + '</td>' +
      '<td>' + t.standard + '</td>' +
      '<td style="color:' + typeColor + ';font-weight:700;">' + typeLabel + '</td></tr>';
  });
  
  let title = isEn ? 
    'Required Tests for ' + qty + ' ' + document.getElementById(unitId).value + ' of ' + data.name :
    'الاختبارات المطلوبة لـ ' + qty + ' ' + document.getElementById(unitId).value + ' من ' + data.name;
  
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = 
    '<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:10px;margin-bottom:10px;">' +
    '<div style="color:var(--gold);font-weight:700;font-size:13px;">📋 ' + title + '</div>' +
    (typeof totalTests === 'number' && totalTests > 0 ? '<div style="color:var(--text3);font-size:11px;margin-top:4px;">إجمالي الاختبارات العددية: ' + totalTests + ' اختبار</div>' : '') +
    '</div>' +
    '<div style="overflow-x:auto;">' +
    '<table class="dm-table">' +
    '<tr><th>' + (isEn ? 'Test' : 'الاختبار') + '</th><th>' + (isEn ? 'Frequency' : 'التكرار') + '</th>' +
    '<th>' + (isEn ? 'Qty Required' : 'العدد المطلوب') + '</th><th>' + (isEn ? 'Standard' : 'المعيار') + '</th>' +
    '<th>Type</th></tr>' + rows + '</table></div>';
}



// ═══════════════════════════════════════════════════════════════════════
// QS NAMESPACE — Built HERE after ALL functions (inline + data_calcs.js) are defined
// This runs after index.html inline script AND after all data_calcs.js functions
// ═══════════════════════════════════════════════════════════════════════
(function() {
  'use strict';
  var fns = window._QS_PUBLIC_FNS || [];
  var api = {};
  fns.forEach(function(name) {
    if (typeof window[name] === 'function') {
      api[name] = window[name].bind(window);
    }
  });
  // Merge with any existing QS properties
  var realQS = Object.assign({}, api);
  window.QS = realQS;
  // Flush any queued calls from before data_calcs.js loaded
  if (typeof window._flushQSQueue === 'function') {
    window._flushQSQueue(realQS);
  }
})();
