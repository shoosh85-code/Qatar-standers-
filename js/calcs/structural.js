// QatarSpec Pro — Structural Calculators
// حاسبات الإنشاء والخرسانة — QCS 2024 Section 5


// ── calcMaterials ──
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

// ── calcCubeStrength ──
function calcCubeStrength() {
  let grade = parseFloat(document.getElementById('cube-grade').value);
  let age = document.getElementById('cube-age').value;
  let res = parseFloat(document.getElementById('cube-res').value);
  if (isNaN(res)) return showToast('أدخل نتيجة Cube');
  let req = age === '7' ? grade * 0.7 : grade;
  let pass = res >= req;
  showResult('cube-result', pass, res, req, (age==='7'?'7':'28') + ' يوم | fcu=' + grade + ' N/mm² | المطلوب: ≥' + req + ' | الفعلي: ' + res + ' N/mm²', 'Core drilling من الهيكل + تقييم هندسي + قرار هدم/قبول');
}

// ── calcSlump ──
function calcSlump() {
  const method = document.getElementById('slump-method').value;
  let val = parseFloat(document.getElementById('slump-val').value);
  if (isNaN(val)) return showToast('أدخل قيمة Slump');
  const ranges = { direct:[75,100], pump:[100,150], special:[150,180] };
  let r = ranges[method] || [75,100];
  let pass = val >= r[0] && val <= r[1];
  showResult('slump-result', pass, val, r[0]+'-'+r[1], 'Slump المقاس: ' + val + 'mm | النطاق المطلوب: ' + r[0] + '-' + r[1] + 'mm', val < r[0] ? 'إضافة ماء/ملدّن بعناية ثم إعادة' : 'رفض الحمولة — Slump مرتفع جداً');
}

// ── calcRebarCover ──
function calcRebarCover() {
  const elem = document.getElementById('cover-elem').value;
  const act = parseFloat(document.getElementById('cover-act').value);
  if (isNaN(act)) return showToast('أدخل الغطاء المقاس');
  const reqs = { foundation:75, ext_col:40, int_col:25, ext_slab:40, int_slab:20, wall:40 };
  let req = reqs[elem] || 25;
  showResult('cover-result', act >= req, act, req, 'الغطاء المطلوب: ' + req + 'mm | المقاس: ' + act + 'mm', 'إعادة تركيب الحديد بعد تصحيح الـ spacers');
}

// ── calcWCRatio ──
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

// ── calcConcrete ──
function calcConcrete() {
  const grade = parseFloat(document.getElementById('con-grade').value);
  const age = parseInt(document.getElementById('con-age').value);
  const result = parseFloat(document.getElementById('con-result-val').value);
  if (!result) return showToast('❌ أدخل نتيجة المكعب');
  const req = age === 7 ? grade * 0.7 : grade;
  showResult('con-result', result >= req, result, req, `Cube Result: ${result} N/mm² | المطلوب عند ${age} يوم: ≥ ${req.toFixed(1)} N/mm² (C${grade})`);
}

// ── calcRebar ──
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

// ── calcCover ──
function calcCover() {
  const req = parseFloat(document.getElementById('cover-type').value);
  const val = parseFloat(document.getElementById('cover-val').value);
  if (isNaN(val)) return showToast('❌ أدخل القياس');
  showResult('cover-result', val >= req, val, req, `Cover الفعلي: ${val}mm | المطلوب: ≥ ${req}mm`);
}

// ── calcLapLength ──
function calcLapLength() {
  const mult = parseFloat(document.getElementById('lap-type').value);
  const dia = parseFloat(document.getElementById('lap-dia').value);
  const actual = parseFloat(document.getElementById('lap-actual').value);
  if (!dia || !actual) return showToast('❌ أدخل كل البيانات');
  const req = mult * dia;
  showResult('lap-result', actual >= req, actual, req, `الطول الفعلي: ${actual}mm | المطلوب: ${mult}d = ${req}mm (d=${dia}mm)`);
}

// ── calcBeamDeflection — انحراف العارضة ─────────────────────────────────
// QCS 2024 Part 5, Section 5.3 + ACI 318-19 Ch.24
// الوحدات: span(m), load(kN/m أو kN), b(mm), h(mm), fc(MPa)
function calcBeamDeflection() {
  'use strict';
  const span     = parseFloat(document.getElementById('bdef-span').value);
  const loadType = document.getElementById('bdef-load-type').value;
  const loadVal  = parseFloat(document.getElementById('bdef-load').value);
  const b        = parseFloat(document.getElementById('bdef-b').value);
  const h        = parseFloat(document.getElementById('bdef-h').value);
  const fc       = parseFloat(document.getElementById('bdef-fc').value);

  if (!span || !loadVal || !b || !h || !fc) {
    return showToast('❌ أدخل جميع البيانات', 'error');
  }
  if (span <= 0 || span > 50) return showToast('❌ البحر يجب أن يكون 0–50m', 'error');
  if (fc < 20 || fc > 80)     return showToast('❌ fc يجب أن يكون 20–80 MPa', 'error');
  if (b <= 0 || h <= 0)       return showToast('❌ أبعاد المقطع غير صحيحة', 'error');

  // عزم القصور الذاتي — Moment of Inertia (mm⁴)
  const I = (b * Math.pow(h, 3)) / 12;

  // معامل مرونة الخرسانة — ACI 318-19 Eq. 19.2.2.1b
  const Ec = 4700 * Math.sqrt(fc); // MPa

  // تحويل الوحدات
  const L_mm = span * 1000; // m → mm
  const L_m  = span;

  let delta_mm, steps;

  if (loadType === 'uniform') {
    // w kN/m → N/mm
    const w = (loadVal * 1000) / 1000; // N/mm
    delta_mm = (5 * w * Math.pow(L_mm, 4)) / (384 * Ec * I);
    steps = `
      w = ${loadVal} kN/m = ${w.toFixed(4)} N/mm
      I = b×h³/12 = ${b}×${h}³/12 = ${(I/1e6).toFixed(2)} ×10⁶ mm⁴
      Ec = 4700×√fc = 4700×√${fc} = ${Ec.toFixed(0)} MPa
      δ = 5wL⁴ / (384 EcI) = ${delta_mm.toFixed(2)} mm`;
  } else {
    // P kN → N
    const P = loadVal * 1000; // N
    delta_mm = (P * Math.pow(L_mm, 3)) / (48 * Ec * I);
    steps = `
      P = ${loadVal} kN = ${P} N
      I = ${(I/1e6).toFixed(2)} ×10⁶ mm⁴
      Ec = ${Ec.toFixed(0)} MPa
      δ = PL³ / (48 EcI) = ${delta_mm.toFixed(2)} mm`;
  }

  // حد الانحراف — QCS 2024 Part 5 Section 5.3: L/250
  const delta_max = (L_m * 1000) / 250; // mm
  const ratio     = delta_mm / delta_max;
  const pass      = delta_mm <= delta_max;

  const detail = `δ الحسابي = ${delta_mm.toFixed(2)} mm | الحد الأقصى = L/250 = ${delta_max.toFixed(1)} mm | نسبة الاستغلال = ${(ratio*100).toFixed(1)}%
المرجع: QCS 2024 Part 5 § 5.3 + ACI 318-19 Ch.24
${steps}`;

  showResult('bdef-result', pass, delta_mm, delta_max, detail);
}
window.calcBeamDeflection = calcBeamDeflection;

// ── calcIsolatedFooting — قاعدة منفردة ───────────────────────────────────
// QCS 2024 Part 5 + ACI 318-19 Ch.13
// الوحدات: P(kN), Mx/My(kN.m), qa(kPa), fc/fy(MPa), cover(mm), col_b/col_d(mm)
function calcIsolatedFooting() {
  'use strict';
  const P      = parseFloat(document.getElementById('ftp-P').value);
  const Mx     = parseFloat(document.getElementById('ftp-Mx').value) || 0;
  const My     = parseFloat(document.getElementById('ftp-My').value) || 0;
  const qa     = parseFloat(document.getElementById('ftp-qa').value);
  const fc     = parseFloat(document.getElementById('ftp-fc').value);
  const fy     = parseFloat(document.getElementById('ftp-fy').value);
  const cover  = parseFloat(document.getElementById('ftp-cover').value) || 75;
  const col_b  = parseFloat(document.getElementById('ftp-colb').value) || 400;
  const col_d  = parseFloat(document.getElementById('ftp-cold').value) || 400;

  if (!P || !qa || !fc || !fy) return showToast('❌ أدخل جميع البيانات المطلوبة', 'error');
  if (P <= 0)   return showToast('❌ الحمل P يجب أن يكون > 0', 'error');
  if (qa <= 50) return showToast('❌ qa يبدو منخفضاً جداً — هل الوحدة kPa؟', 'warning');

  // مساحة القاعدة المطلوبة (m²)
  const A_req = P / qa;
  const B     = Math.ceil(Math.sqrt(A_req) * 10) / 10; // أقرب 0.1m للأعلى
  const L     = B;

  // التحقق من الإجهاد تحت القاعدة
  const q_avg  = P / (B * L);
  const q_max  = q_avg + (6 * Mx / (B * L * L)) + (6 * My / (B * B * L));
  const q_min  = q_avg - (6 * Mx / (B * L * L)) - (6 * My / (B * B * L));
  const bearCheck = q_max <= qa;

  // سماكة القاعدة (Two-way punching shear — ACI 318-19 § 22.6)
  // φVc = φ × 0.33 × √fc × bo × d  حيث bo = 4×(col+d)
  // تحسب بالتكرار
  let d_est = Math.max(200, B * 1000 / 10); // تخمين أولي mm
  for (let i = 0; i < 10; i++) {
    const bo   = 4 * (col_b + d_est); // mm
    const Vu   = (P * 1000) * (1 - Math.pow((col_b + d_est) / (B * 1000), 2)); // N
    d_est      = Vu / (0.85 * 0.33 * Math.sqrt(fc) * bo);
    if (d_est < 150) { d_est = 150; break; }
  }
  const h_footing = Math.ceil((d_est + cover) / 50) * 50; // mm — أقرب 50mm للأعلى
  const d_actual  = h_footing - cover;

  // تسليح (Simple beam analogy — ACI 318-19 § 13.3.8.5)
  const Mu  = (q_max * 1000) * B * Math.pow(((B - col_b / 1000) / 2), 2) / 2; // N.mm/m width
  const a   = (fy * 1) / (0.85 * fc * 1000); // تقريبي — نسبة التسليح صغيرة
  const As  = Mu / (0.9 * fy * (d_actual - a / 2)); // mm²/m
  const As_min = Math.max(0.0018 * 1000 * h_footing, 300); // ACI 318 min
  const As_design = Math.max(As, As_min);

  const pass = bearCheck && q_min >= 0;
  const detail = `الأبعاد: ${B.toFixed(1)} × ${L.toFixed(1)} م | السماكة: ${h_footing}mm | d: ${d_actual}mm
q_max = ${q_max.toFixed(1)} kPa | qa = ${qa} kPa | ${bearCheck ? '✅ آمن' : '❌ تجاوز القدرة التحملية'}
q_min = ${q_min.toFixed(1)} kPa ${q_min >= 0 ? '✅' : '❌ رفع — يجب تكبير القاعدة'}
As = ${As_design.toFixed(0)} mm²/m في الاتجاهين
المرجع: QCS 2024 Part 5 + ACI 318-19 Ch.13`;

  showResult('ftp-result', pass, q_max, qa, detail);
}
window.calcIsolatedFooting = calcIsolatedFooting;

// ── calcRetainingWall — جدار استنادي ─────────────────────────────────────
// QCS 2024 Part 5 § 5.5 + QCS Part 4
// الوحدات: H(m), bw(m), toe(m), heel(m), γs(kN/m³), φ(°), γc(kN/m³), q(kPa)
function calcRetainingWall() {
  'use strict';
  const H    = parseFloat(document.getElementById('rw-H').value);
  const bw   = parseFloat(document.getElementById('rw-bw').value);
  const toe  = parseFloat(document.getElementById('rw-toe').value);
  const heel = parseFloat(document.getElementById('rw-heel').value);
  const γs   = parseFloat(document.getElementById('rw-gs').value) || 18;
  const φ_deg= parseFloat(document.getElementById('rw-phi').value) || 30;
  const γc   = parseFloat(document.getElementById('rw-gc').value) || 24;
  const qa   = parseFloat(document.getElementById('rw-qa').value) || 150;
  const q    = parseFloat(document.getElementById('rw-surcharge').value) || 0;
  const μ    = parseFloat(document.getElementById('rw-mu').value) || 0.45; // معامل احتكاك أساس/تربة

  if (!H || !bw || !toe || !heel) return showToast('❌ أدخل جميع الأبعاد', 'error');
  if (Math.abs(bw - (toe + heel)) > 0.01) {
    return showToast(`❌ عرض القاعدة (${bw}m) ≠ toe(${toe}) + heel(${heel}) m`, 'error');
  }

  const φ    = φ_deg * Math.PI / 180;
  const Ka   = Math.pow(Math.tan(Math.PI/4 - φ/2), 2); // Rankine

  // قوة ضغط التربة النشطة (Rankine)
  const Pa   = 0.5 * Ka * γs * H * H + Ka * q * H; // kN/m عرض
  const Pa1  = 0.5 * Ka * γs * H * H; // من التربة
  const Pa2  = Ka * q * H;             // من الحمل السطحي
  const ya   = (Pa1 * H/3 + Pa2 * H/2) / Pa; // نقطة تطبيق Pa من القاعدة

  // الأوزان (per meter)
  // الجدار نفسه — مُبسَّط كمستطيل (stem width ≈ H/12 + 0.2)
  const tw   = Math.max(H / 12 + 0.2, 0.3); // سماكة stem (m)
  const W_stem = γc * tw * H;
  const x_stem = toe + tw / 2;

  // لبشة الأساس
  const t_base = Math.max(H / 12 + 0.15, 0.4); // سماكة Base (m)
  const W_base = γc * bw * t_base;
  const x_base = bw / 2;

  // التربة فوق heel
  const W_soil = γs * heel * H;
  const x_soil = bw - heel / 2;

  // الحمل السطحي فوق heel
  const W_surcharge = q * heel;
  const x_surcharge = bw - heel / 2;

  const ΣV  = W_stem + W_base + W_soil + W_surcharge;
  const ΣH  = Pa;

  // عزوم مقاومة للإنقلاب حول الطرف الأمامي (toe)
  const ΣMr = W_stem * x_stem + W_base * x_base + W_soil * x_soil + W_surcharge * x_surcharge;
  const ΣMo = Pa * ya; // عزم انقلاب

  // عوامل الأمان
  const FS_OT = ΣMr / ΣMo;
  const FS_SL = (μ * ΣV) / ΣH;

  // ضغط القاعدة
  const ΣM_net = ΣMr - ΣMo;
  const x_R    = ΣM_net / ΣV; // بُعد محصلة الأحمال عن toe
  const e      = bw / 2 - x_R; // الانحراف
  const q_max_base = (ΣV / bw) * (1 + 6 * Math.abs(e) / bw);
  const q_min_base = (ΣV / bw) * (1 - 6 * Math.abs(e) / bw);
  const bearCheck  = q_max_base <= qa;

  const passOT = FS_OT >= 2.0;
  const passSL = FS_SL >= 1.5;
  const pass   = passOT && passSL && bearCheck;

  const detail = `Ka = tan²(45-φ/2) = ${Ka.toFixed(3)} | Pa = ${Pa.toFixed(2)} kN/m
FS انقلاب = ${FS_OT.toFixed(2)} (مطلوب ≥ 2.0) ${passOT ? '✅' : '❌ غير كافٍ'}
FS انزلاق = ${FS_SL.toFixed(2)} (مطلوب ≥ 1.5) ${passSL ? '✅' : '❌ غير كافٍ'}
q_max = ${q_max_base.toFixed(1)} kPa | qa = ${qa} kPa ${bearCheck ? '✅' : '❌ تجاوز'}
e = ${e.toFixed(3)} m | bw/6 = ${(bw/6).toFixed(3)} m ${Math.abs(e) <= bw/6 ? '✅ داخل Core' : '⚠️ خارج Core'}
المرجع: QCS 2024 Part 5 § 5.5 + QCS Part 4`;

  showResult('rw-result', pass, FS_OT, 2.0, detail);
}
window.calcRetainingWall = calcRetainingWall;

// ── calcColumnDesign — تصميم عمود خرساني ─────────────────────────────────
// QCS 2024 Part 5 + ACI 318-19 Ch.22
// الوحدات: Pu(kN), Mu(kN.m), b(mm), h(mm), fc(MPa), fy(MPa), cover(mm)
function calcColumnDesign() {
  'use strict';
  const Pu    = parseFloat(document.getElementById('col-Pu').value);
  const Mu    = parseFloat(document.getElementById('col-Mu').value) || 0;
  const b     = parseFloat(document.getElementById('col-b').value);
  const h     = parseFloat(document.getElementById('col-h').value);
  const fc    = parseFloat(document.getElementById('col-fc').value);
  const fy    = parseFloat(document.getElementById('col-fy').value);
  const cover = parseFloat(document.getElementById('col-cover').value) || 40;
  const kLu   = parseFloat(document.getElementById('col-klu').value) || 0;

  if (!Pu || !b || !h || !fc || !fy) return showToast('❌ أدخل جميع البيانات', 'error');
  if (Pu <= 0)            return showToast('❌ الحمل Pu يجب أن يكون > 0', 'error');
  if (fc < 20 || fc > 80) return showToast('❌ fc يجب 20–80 MPa', 'error');
  if (fy < 400 || fy > 600) return showToast('❌ fy يجب 400–600 MPa', 'error');

  const Ag   = b * h; // mm²
  const Pu_N = Pu * 1000; // N

  // نسبة التسليح المطلوبة (تقريباً للضغط المركزي)
  // φPn = φ * [0.80 * (0.85*fc*(Ag-Ast) + fy*Ast)] — tied column
  // φPn ≥ Pu → نحل لـ Ast
  // 0.65 * 0.80 * (0.85*fc*Ag + Ast*(fy - 0.85*fc)) ≥ Pu
  const φ    = 0.65;
  const coef = φ * 0.80;
  const term1 = coef * 0.85 * fc * Ag; // N
  const Ast_req = (Pu_N - term1) / (coef * (fy - 0.85 * fc));
  const Ast_min = 0.01 * Ag;
  const Ast_max = 0.08 * Ag;
  const Ast_design = Math.max(Ast_req, Ast_min);

  // قدرة المقطع
  const Ast_actual = Ast_design;
  const φPn = coef * (0.85 * fc * (Ag - Ast_actual) + fy * Ast_actual) / 1000; // kN

  // نسبة التسليح
  const ρ    = Ast_design / Ag;
  const ρOK  = ρ >= 0.01 && ρ <= 0.08;

  // فحص العزم (Mu) — تقريبي بمعامل تفاعل بسيط
  let muCheck = true;
  let muNote  = '';
  if (Mu > 0) {
    const e     = (Mu * 1e6) / Pu_N; // eccentricity mm
    const e_min = 0.1 * h; // ACI 318: e_min = 0.1h for tied columns
    const ratio = e / (h / 2);
    muCheck = ratio <= 0.8; // تقريبي — للتصميم الدقيق يحتاج interaction diagram
    muNote  = ` | e = ${e.toFixed(1)}mm | e/h = ${(e/h).toFixed(3)} ${muCheck ? '✅' : '⚠️ يحتاج interaction diagram'}`;
  }

  // فحص الرشاقة Slenderness
  let slenderness = '';
  if (kLu > 0) {
    const r     = 0.3 * Math.min(b, h); // نصف قطر الدوران للمقطع المستطيل
    const kLu_r = kLu * 1000 / r;
    slenderness = ` | kLu/r = ${kLu_r.toFixed(1)} ${kLu_r <= 22 ? '✅ Short' : kLu_r <= 100 ? '⚠️ Slender — يحتاج δ correction' : '❌ Long — غير مقبول'}`;
  }

  const pass = φPn >= Pu && ρOK && muCheck;
  const detail = `Ag = ${Ag} mm² | Ast = ${Ast_design.toFixed(0)} mm² | ρ = ${(ρ*100).toFixed(2)}%
φPn = ${φPn.toFixed(1)} kN | Pu = ${Pu} kN ${φPn >= Pu ? '✅' : '❌ يجب تكبير المقطع أو زيادة التسليح'}
نسبة التسليح (1–8%): ${ρOK ? '✅ مقبول' : '❌ خارج الحدود'}${muNote}${slenderness}
المرجع: QCS 2024 Part 5 + ACI 318-19 § 22.4`;

  showResult('col-result', pass, φPn, Pu, detail);
}
window.calcColumnDesign = calcColumnDesign;

// ── calcSteelConnection — وصلة فولاذية بسيطة ─────────────────────────────
// QCS 2024 Part 6 + AISC 360-22
// الوحدات: d(mm), n(-), t_plate(mm), Fu_plate(MPa)
function calcSteelConnection() {
  'use strict';
  const grade    = document.getElementById('sc-grade').value; // '4.6' / '8.8' / '10.9'
  const d        = parseFloat(document.getElementById('sc-d').value);
  const n        = parseInt(document.getElementById('sc-n').value);
  const t        = parseFloat(document.getElementById('sc-t').value);
  const Fu_plate = parseFloat(document.getElementById('sc-Fu').value);
  const loadType = document.getElementById('sc-load-type').value; // 'shear'/'tension'
  const Vu       = parseFloat(document.getElementById('sc-Vu').value);

  if (!d || !n || !t || !Fu_plate || !Vu) return showToast('❌ أدخل جميع البيانات', 'error');
  if (d < 12 || d > 36) return showToast('❌ قطر البولت 12–36 mm', 'error');
  if (n < 1 || n > 20)  return showToast('❌ عدد البولتات 1–20', 'error');

  // خصائص البولت حسب الدرجة — AISC 360 Table J3.2
  const boltProps = {
    '4.6': { Fnt: 310, Fnv: 190 },  // MPa
    '8.8': { Fnt: 620, Fnv: 372 },
    '10.9':{ Fnt: 830, Fnv: 498 },
  };
  const { Fnt, Fnv } = boltProps[grade] || boltProps['8.8'];
  const Ab = Math.PI * d * d / 4; // mm² مساحة البولت

  const φ = 0.75; // AISC LRFD

  let results = [], governing = Infinity;

  if (loadType === 'shear' || loadType === 'combined') {
    // فحص قص البولتات — AISC 360 Eq. J3-1
    const φRn_bolt_shear = φ * Fnv * Ab * n / 1000; // kN
    results.push(`Bolt Shear: φRn = ${φRn_bolt_shear.toFixed(1)} kN ${Vu <= φRn_bolt_shear ? '✅' : '❌'}`);
    governing = Math.min(governing, φRn_bolt_shear);

    // فحص Bearing على اللوح — AISC 360 Eq. J3-6b
    const φRn_bearing = φ * 2.4 * d * t * Fu_plate * n / 1000; // kN
    results.push(`Bolt Bearing: φRn = ${φRn_bearing.toFixed(1)} kN ${Vu <= φRn_bearing ? '✅' : '❌'}`);
    governing = Math.min(governing, φRn_bearing);

    // فحص Shear Tear-out (Plate net section shear) — تقريبي
    const Anv = (4 * d + 2 * d) * t * 0.85; // mm² تقريبي
    const φRn_tearout = φ * 0.6 * Fu_plate * Anv / 1000; // kN
    results.push(`Plate Tear-out: φRn = ${φRn_tearout.toFixed(1)} kN ${Vu <= φRn_tearout ? '✅' : '❌'}`);
    governing = Math.min(governing, φRn_tearout);
  }

  if (loadType === 'tension') {
    // فحص شد البولتات — AISC 360 Eq. J3-1
    const φRn_bolt_tension = φ * Fnt * Ab * n / 1000; // kN
    results.push(`Bolt Tension: φRn = ${φRn_bolt_tension.toFixed(1)} kN ${Vu <= φRn_bolt_tension ? '✅' : '❌'}`);
    governing = Math.min(governing, φRn_bolt_tension);
  }

  const pass = Vu <= governing;
  const detail = `Grade ${grade} | d=${d}mm | n=${n} بولت | t_plate=${t}mm
${results.join('\n')}
القدرة الحاكمة: φRn = ${governing.toFixed(1)} kN | الحمل = ${Vu} kN
المرجع: QCS 2024 Part 6 + AISC 360-22 § J3`;

  showResult('sc-result', pass, governing, Vu, detail);
}
window.calcSteelConnection = calcSteelConnection;
