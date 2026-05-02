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
