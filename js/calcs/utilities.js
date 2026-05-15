// QatarSpec Pro — Utilities Calculators
// حاسبات المرافق والمياه والصرف — QCS 2024 Section 8


// ── calcPressureTest ──
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

// ── calcAirTest ──
function calcAirTest() {
  let drop = parseFloat(document.getElementById('air-drop').value);
  let dia = parseFloat(document.getElementById('air-dia').value);
  if (isNaN(drop)) return showToast('أدخل الانخفاض');
  let req = dia <= 150 ? 10 : dia <= 300 ? 15 : 20;
  let pass = drop <= req;
  showResult('air-result', pass, drop, req, 'الانخفاض المسموح ≤' + req + ' mmWG للـ DN' + (dia||'?') + ' | الفعلي: ' + drop + ' mmWG', 'كشف موضع التسرب + إصلاح + إعادة Air Test');
}

// ── calcCoverDepth ──
function calcCoverDepth() {
  const net = document.getElementById('cov-net').value;
  let act = parseFloat(document.getElementById('cov-act').value);
  let reqs = { water: 1.0, sewer: 1.2, storm: 0.9, elec: 0.8 };
  let req = reqs[net] || 1.0;
  if (isNaN(act)) return showToast('أدخل عمق الغطاء');
  showResult('cov-result', act >= req, act, req, 'العمق المطلوب: ≥' + req + 'm | الفعلي: ' + act + 'm', 'تعميق الخندق للوصول للحد الأدنى المطلوب');
}

// ── calcTrenchCompact ──
function calcTrenchCompact() {
  let zone = document.getElementById('trench-zone').value;
  let act = parseFloat(document.getElementById('trench-act').value);
  let mdd = parseFloat(document.getElementById('trench-mdd').value);
  if (isNaN(act) || isNaN(mdd)) return showToast('أدخل الكثافة و MDD');
  let req = zone === 'final' ? 98 : 95;
  let pct = (act / mdd * 100).toFixed(1);
  showResult('trench-result', parseFloat(pct) >= req, pct, req, 'Compaction: ' + pct + '% | المطلوب: ≥' + req + '% MDD', 'إعادة الدمك بطبقات + زيادة عدد المرورات');
}

// ── calcPressure ──
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

// ── calcChlorination ──
function calcChlorination() {
  const conc = parseFloat(document.getElementById('chl-conc').value);
  const time = parseFloat(document.getElementById('chl-time').value);
  if (!conc || !time) return showToast('❌ أدخل كل البيانات');
  const concPass = conc >= 50;
  const timePass = time >= 24;
  showResult('chl-result', concPass && timePass, null, null, `التركيز: ${conc} ppm ${concPass?'✅':'❌'} (≥50 ppm إلزامي — QCS 2024) | المدة: ${time}hr ${timePass?'✅':'❌'} (≥24hr)`);
}

// ── calcResidualCl ──
function calcResidualCl() {
  const val = parseFloat(document.getElementById('rcl-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  const pass = val >= 0.2 && val <= 0.5;
  showResult('rcl-result', pass, val, null, `Residual Cl: ${val} ppm | المطلوب: 0.2-0.5 ppm`);
}

// ── calcTurbidity ──
function calcTurbidity() {
  const val = parseFloat(document.getElementById('turb-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  showResult('turb-result', val <= 1, val, 1, `Turbidity: ${val} NTU | المطلوب: ≤ 1 NTU`);
}

// ── calcPH ──
function calcPH() {
  const val = parseFloat(document.getElementById('ph-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  const pass = val >= 6.5 && val <= 8.5;
  showResult('ph-result', pass, val, null, `pH: ${val} | المطلوب: 6.5-8.5`);
}

// ── calcPipeSep ──
function calcPipeSep() {
  const val = parseFloat(document.getElementById('psep-val').value);
  const req = parseFloat(document.getElementById('psep-type').value);
  if (isNaN(val)) return showToast('❌ أدخل المسافة');
  showResult('psep-result', val >= req, val, req, `المسافة Actual: ${val}m | المطلوب: ≥ ${req}m`);
}

// ── calcSewerGrad ──
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

// ── calcManholeWT ──
function calcManholeWT() {
  const start = parseFloat(document.getElementById('mh-start').value);
  const end = parseFloat(document.getElementById('mh-end').value);
  if (!start || !end) return showToast('❌ أدخل كل البيانات');
  const drop = start - end;
  showResult('mh-result', drop === 0, drop, 0, `انخفاض المياه: ${drop}mm خلال 24hr | المطلوب: صفر تسريب`);
}

// ── calcCCTV ──
function calcCCTV() {
  const grade = parseInt(document.getElementById('cctv-grade').value);
  const pass = grade <= 2;
  const desc = {1:'No Defects',2:'Minor Defects مقبولة',3:'Moderate Defects — يُعاد',4:'Severe Defects — يُعاد',5:'Collapse — يُعاد'};
  showResult('cctv-result', pass, grade, 2, `Grade ${grade}: ${desc[grade]} | المقبول: Grade 1 أو 2 فقط`);
}

// ── calcGullyLevel ──
function calcGullyLevel() {
  const road = parseFloat(document.getElementById('gul-road').value);
  const gully = parseFloat(document.getElementById('gul-gully').value);
  if (isNaN(road) || isNaN(gully)) return showToast('❌ أدخل كل البيانات');
  const diff = Math.abs(road - gully) * 1000;
  showResult('gul-result', diff <= 5, diff, 5, `الفرق: ${diff.toFixed(1)}mm | المسموح: ±5mm من مستوى الطريق`);
}

// ── calcManningFlow — تدفق مواسير المجاري (Manning) ─────────────────────
// QCS 2024 Part 9 + KAHRAMAA Sewerage Standards
// الوحدات: D(mm), slope(%), n(-), depth_ratio(0-1)
function calcManningFlow() {
  'use strict';
  const D           = parseFloat(document.getElementById('mann-D').value);
  const slope_pct   = parseFloat(document.getElementById('mann-slope').value);
  const n           = parseFloat(document.getElementById('mann-n').value);
  const depth_ratio = parseFloat(document.getElementById('mann-depth').value);

  if (!D || !slope_pct || !n || isNaN(depth_ratio)) {
    return showToast('❌ أدخل جميع البيانات', 'error');
  }
  if (D < 75 || D > 3000)          return showToast('❌ القطر يجب 75–3000 mm', 'error');
  if (slope_pct <= 0 || slope_pct > 50) return showToast('❌ الميل يجب 0–50%', 'error');
  if (n <= 0 || n > 0.05)          return showToast('❌ n يجب 0.005–0.05', 'error');
  if (depth_ratio < 0.1 || depth_ratio > 1) return showToast('❌ نسبة العمق يجب 0.1–1.0', 'error');

  const r     = D / 2;            // نصف القطر mm
  const S     = slope_pct / 100; // ميل النسبة المئوية → عشري

  // القطاع المائي للدائرة (Circular section)
  const θ     = 2 * Math.acos(1 - 2 * depth_ratio); // زاوية مركزية (rad)
  const A     = ((θ - Math.sin(θ)) * r * r) / 2;    // mm²
  const P     = θ * r;                               // المحيط المبلل mm
  const R     = A / P;                               // النصف قطر الهيدروليكي mm

  // تحويل R من mm → m للمعادلة
  const R_m   = R / 1000;
  const A_m2  = A / 1e6;          // mm² → m²

  // معادلة Manning
  const V     = (1 / n) * Math.pow(R_m, 2/3) * Math.pow(S, 0.5); // m/s
  const Q_m3s = V * A_m2;        // m³/s
  const Q_Ls  = Q_m3s * 1000;   // L/s

  // تدفق القسم الكامل (للمقارنة)
  const A_full = Math.PI * r * r / 1e6;             // m²
  const P_full = Math.PI * D / 1000;                // m
  const R_full = (D / 1000) / 4;                   // m
  const V_full = (1 / n) * Math.pow(R_full, 2/3) * Math.pow(S, 0.5);
  const Q_full = V_full * A_full * 1000;            // L/s

  // فحص السرعة الذاتية للتنظيف — QCS 2024 Part 9: V_min ≥ 0.6 m/s
  const selfClean  = V >= 0.6;
  // فحص السرعة القصوى (لمنع التآكل) — V_max ≤ 3.0 m/s
  const maxVelOK   = V <= 3.0;
  const pass       = selfClean && maxVelOK;

  const detail = `θ = ${(θ*180/Math.PI).toFixed(1)}° | A = ${(A/1e6*1000).toFixed(1)} dm² | R = ${R_m.toFixed(4)} m
السرعة V = ${V.toFixed(3)} m/s | التدفق Q = ${Q_Ls.toFixed(1)} L/s
نسبة الملء = ${(depth_ratio*100).toFixed(0)}% | Q_full = ${Q_full.toFixed(1)} L/s
فحص التنظيف الذاتي (V ≥ 0.6 m/s): ${selfClean ? '✅ يعمل' : '❌ سرعة منخفضة — احتمال ترسيب'}
فحص السرعة القصوى (V ≤ 3.0 m/s): ${maxVelOK ? '✅ آمن' : '❌ سرعة عالية — خطر تآكل'}
المرجع: QCS 2024 Part 9 + KAHRAMAA Sewerage Standards`;

  showResult('mann-result', pass, V, 0.6, detail);
}
window.calcManningFlow = calcManningFlow;
