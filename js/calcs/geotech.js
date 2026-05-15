// QatarSpec Pro — Geotechnical Calculators
// حاسبات الجيوتقنية والتربة — QCS 2024 Section 6


// ── calcSPT ──
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

// ── calcSulphateClass ──
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

// ── calcBearingCap ──
function calcBearingCap() {
  let n = parseFloat(document.getElementById('bc-n').value);
  const b = parseFloat(document.getElementById('bc-b').value);
  if (!n || !b) return showToast('أدخل كل البيانات');
  // Terzaghi approximation for sand: qa = N/4 * (1 + B/30) * 10 kPa (simplified)
  const qa = Math.round((n / 4) * (1 + b / 30) * 10);
  let pass = qa >= 100;
  showResult('bc-result', pass, qa, 100, 'تحمل مبدئي ≈ ' + qa + ' kPa | N60 = ' + n + ' | B = ' + b + 'm | ⚠️ هذا تقدير أولي فقط — يحتاج تحليل جيوتقني كامل');
}

// ── calcPIClass ──
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

// ── calcCBRGeo ──
function calcCBRGeo() {
  let use = document.getElementById('cbr-g-use').value;
  let val = parseFloat(document.getElementById('cbr-g-val').value);
  if (isNaN(val)) return showToast('أدخل CBR');
  let req = use === 'foundation' ? 15 : 8;
  showResult('cbr-g-result', val >= req, val, req, 'CBR: ' + val + '% | المطلوب: ≥' + req + '% Soaked 4 days', 'Lime Stabilization أو استبدال التربة');
}

// ── calcPileCapacity — قدرة تحمل الخازوق ──────────────────────────────────
// QCS 2024 Part 5, Section 5.5
// الوحدات: D(mm), L(m), SPT_N(-), soil_type, fc(MPa)
function calcPileCapacity() {
  'use strict';
  const D         = parseFloat(document.getElementById('pile-D').value);
  const L         = parseFloat(document.getElementById('pile-L').value);
  const soilType  = document.getElementById('pile-soil').value;
  const N         = parseFloat(document.getElementById('pile-N').value);
  const fc        = parseFloat(document.getElementById('pile-fc').value) || 30;
  const pileType  = document.getElementById('pile-type').value; // 'bored' / 'driven'

  if (!D || !L || !N) return showToast('❌ أدخل جميع البيانات', 'error');
  if (D < 150 || D > 2000) return showToast('❌ قطر الخازوق 150–2000 mm', 'error');
  if (L < 3 || L > 80)    return showToast('❌ طول الخازوق 3–80 م', 'error');
  if (N < 1 || N > 100)   return showToast('❌ SPT N يجب 1–100', 'error');

  const Ab = Math.PI * (D/1000) * (D/1000) / 4; // m²
  const As = Math.PI * (D/1000) * L;             // m² (circumference × length)

  let Qb, Qs, note;

  if (soilType === 'sand') {
    // رمل — Meyerhof SPT Method
    // End bearing: Qb = 40*N*(L/D)*Ab ≤ 400*N*Ab (kN) — Meyerhof
    const Nq   = Math.min(40 * N * (L / (D/1000)), 400 * N);
    Qb = Nq * Ab;
    // Skin friction: Qs = 2*N*As (kN) — Meyerhof for driven; 1*N*As for bored
    const qs_factor = pileType === 'driven' ? 2.0 : 1.0;
    Qs = qs_factor * N * As;
    note = `Meyerhof-SPT: Nq factor = ${Nq.toFixed(1)} | qs = ${qs_factor}N/m²`;
  } else {
    // طين / Clay — α-method (Tomlinson)
    // cu تقريبي من SPT N للطين: cu ≈ N/8 * 100 kPa (تقريبي)
    const cu   = (N / 8) * 100; // kPa تقريبي
    const Nc   = 9;              // للطين المشبع
    Qb = cu * Nc * Ab * 1000;   // kN
    const α    = cu > 75 ? 0.5 : cu > 25 ? 0.75 : 1.0; // Tomlinson α
    Qs = α * cu * As * 1000;    // kN
    note = `α-method: cu ≈ ${cu.toFixed(0)} kPa (من SPT) | α = ${α}`;
  }

  const Qu = Qb + Qs; // kN
  const FS = 2.5;     // QCS 2024: FS = 2.5 للحمل الاستاتيكي
  const Qa = Qu / FS; // kN

  // القدرة الإنشائية للخازوق الخرساني
  const Ag_pile  = Ab * 1e6; // mm²
  const Ast_pile = 0.01 * Ag_pile; // 1% حد أدنى
  const φPn_pile = 0.65 * 0.80 * (0.85 * fc * (Ag_pile - Ast_pile) + 500 * Ast_pile) / 1000; // kN

  const Qa_governing = Math.min(Qa, φPn_pile);

  const detail = `D = ${D}mm | L = ${L}m | SPT N = ${N} (${soilType === 'sand' ? 'رمل' : 'طين'})
End Bearing Qb = ${Qb.toFixed(1)} kN
Skin Friction Qs = ${Qs.toFixed(1)} kN
Qu = Qb + Qs = ${Qu.toFixed(1)} kN | FS = ${FS} → Qa = ${Qa.toFixed(1)} kN
القدرة الإنشائية φPn = ${φPn_pile.toFixed(1)} kN
الحاكمة = ${Qa_governing.toFixed(1)} kN
${note}
المرجع: QCS 2024 Part 5 § 5.5 + Meyerhof SPT Method`;

  showResult('pile-result', true, Qa_governing, 0, detail);
}
window.calcPileCapacity = calcPileCapacity;
