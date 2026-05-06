// QatarSpec Pro — Roads & Pavement Calculators
// حاسبات الطرق والرصف — QCS 2024 Section 17


// ── calcCBRRoad ──
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

// ── calcAsphaltFull ──
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

// ── calcCompaction ──
function calcCompaction() {
  const actual = parseFloat(document.getElementById('comp-actual').value);
  const mdd = parseFloat(document.getElementById('comp-mdd').value);
  const req = parseFloat(document.getElementById('comp-layer').value);
  if (!actual || !mdd) return showToast('❌ أدخل كل البيانات');
  const pct = (actual / mdd * 100).toFixed(1);
  showResult('comp-result', parseFloat(pct) >= req, pct, req, `Compaction %: ${pct}% | المطلوب: ≥ ${req}% MDD | الفرق: ${(pct - req).toFixed(1)}%`);
}

// ── calcCBR ──
function calcCBR() {
  const val = parseFloat(document.getElementById('cbr-val').value);
  const req = parseFloat(document.getElementById('cbr-layer').value);
  if (!val) return showToast('❌ أدخل نتيجة CBR');
  showResult('cbr-result', val >= req, val, req, `CBR الفعلي: ${val}% | المطلوب: ≥ ${req}% (Soaked 4 days)`);
}

// ── calcAtterberg ──
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

// ── calcLA ──
function calcLA() {
  const val = parseFloat(document.getElementById('la-val').value);
  const req = parseFloat(document.getElementById('la-layer').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('la-result', val <= req, val, req, `LA Abrasion: ${val}% | المطلوب: ≤ ${req}%`);
}

// ── calcFlakiness ──
function calcFlakiness() {
  const val = parseFloat(document.getElementById('fli-val').value);
  const req = parseFloat(document.getElementById('fli-layer').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('fli-result', val <= req, val, req, `Flakiness Index: ${val}% | المطلوب: ≤ ${req}%`);
}

// ── calcSandEq ──
function calcSandEq() {
  const val = parseFloat(document.getElementById('se-val').value);
  const req = parseFloat(document.getElementById('se-layer').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('se-result', val >= req, val, req, `Sand Equivalent: ${val}% | المطلوب: ≥ ${req}%`);
}

// ── calcSulphate ──
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

// ── calcMarshall ──
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

// ── calcCoreDensity ──
function calcCoreDensity() {
  const bulk = parseFloat(document.getElementById('core-bulk').value);
  const tmd = parseFloat(document.getElementById('core-tmd').value);
  if (!bulk || !tmd) return showToast('❌ أدخل كل البيانات');
  const pct = (bulk / tmd * 100).toFixed(1);
  showResult('core-result', parseFloat(pct) >= 98, pct, 98, `Compaction %: ${pct}% TMD | المطلوب: ≥ 98% TMD`);
}

// ── calcBitumen ──
function calcBitumen() {
  const jmf = parseFloat(document.getElementById('bit-jmf').value);
  const actual = parseFloat(document.getElementById('bit-actual').value);
  if (!jmf || !actual) return showToast('❌ أدخل كل البيانات');
  const diff = Math.abs(actual - jmf).toFixed(2);
  const pass = parseFloat(diff) <= 0.3;
  showResult('bit-result', pass, diff, 0.3, `JMF: ${jmf}% | الفعلي: ${actual}% | الفرق: ${diff}% | المسموح: ± 0.3%`);
}

// ── calcTemperature ──
function calcTemperature() {
  const val = parseFloat(document.getElementById('temp-val').value);
  const stage = document.getElementById('temp-stage').value;
  if (!val) return showToast('❌ أدخل درجة الحرارة');
  const limits = {delivery:[140,999],laying:[140,999],initial:[130,145],intermediate:[100,125],final:[80,100]};
  const [min,max] = limits[stage];
  const pass = val >= min && val <= max;
  showResult('temp-result', pass, val, null, `درجة الحرارة: ${val}°C | المطلوب: ${min}${max<999?'-'+max:'+'} °C`);
}

// ── calcStraightedge ──
function calcStraightedge() {
  const val = parseFloat(document.getElementById('str-val').value);
  if (isNaN(val)) return showToast('❌ أدخل النتيجة');
  showResult('str-result', val <= 5, val, 5, `الفجوة Actual: ${val}mm | المطلوب: ≤ 5mm`);
}

// ── calcCrossfall ──
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

// ── calcSkid ──
function calcSkid() {
  const val = parseFloat(document.getElementById('skid-val').value);
  if (!val) return showToast('❌ أدخل النتيجة');
  showResult('skid-result', val >= 55, val, 55, `PSV الفعلي: ${val} | المطلوب: ≥ 55 PSV`);
}

// ── calcLevel ──
function calcLevel() {
  const design = parseFloat(document.getElementById('lev-design').value);
  const actual = parseFloat(document.getElementById('lev-actual').value);
  const tol = parseFloat(document.getElementById('lev-layer').value);
  if (isNaN(design) || isNaN(actual)) return showToast('❌ أدخل كل البيانات');
  const diff = Math.abs(actual - design) * 1000;
  showResult('lev-result', diff <= tol, diff, tol, `الفرق الفعلي: ${diff.toFixed(1)}mm | المسموح: ±${tol}mm | ${actual>design?'مرتفع':'منخفض'} بـ ${diff.toFixed(1)}mm`);
}

// ── calcPlateLoad ──
function calcPlateLoad() {
  const val = parseFloat(document.getElementById('plt-val').value);
  const req = parseFloat(document.getElementById('plt-req').value);
  if (!val || !req) return showToast('❌ أدخل كل البيانات');
  showResult('plt-result', val >= req, val, req, `K الفعلي: ${val} MN/m³ | المطلوب: ≥ ${req} MN/m³`);
}

// ── calcPrimeRate ──
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

// ── calcSubbaseCheck — فحص Subbase الكامل ──────────────────────────
// QCS 2024 Section 17 Part 4 Table 4.1 + Ashghal RDM 2023 Table 3.2
window.calcSubbaseCheck = function() {
  var cbr  = parseFloat(document.getElementById('sb-cbr').value);
  var comp = parseFloat(document.getElementById('sb-comp').value);
  var pi   = parseFloat(document.getElementById('sb-pi').value);
  var el   = document.getElementById('sb-result');
  if (!el) return;

  var REQ = { cbr: 30, comp: 100, pi: 6 };
  var issues = [], pass = true;

  if (!isNaN(cbr)) {
    if (cbr < REQ.cbr) { issues.push('❌ CBR ' + cbr + '% < 30% — Subbase غير مقبول'); pass = false; }
    else { issues.push('✅ CBR ' + cbr + '% ≥ 30% — مقبول'); }
  }
  if (!isNaN(comp)) {
    if (comp < REQ.comp) { issues.push('❌ Compaction ' + comp + '% < 100% BS Heavy — رفض'); pass = false; }
    else { issues.push('✅ Compaction ' + comp + '% ≥ 100% BS Heavy — مقبول'); }
  }
  if (!isNaN(pi)) {
    if (pi > REQ.pi) { issues.push('❌ PI ' + pi + ' > 6 — مادة غير مناسبة'); pass = false; }
    else { issues.push('✅ PI ' + pi + ' ≤ 6 — مقبول'); }
  }

  var action = pass
    ? 'Subbase مطابق لـ QCS 2024 Section 17 Part 4 ✅'
    : 'رفض — تغيير المصدر أو إعادة الدمك';

  el.innerHTML =
    '<div style="background:' + (pass ? '#eafaf1' : '#fdf2f2') + ';border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:' + (pass ? '#27ae60' : '#e74c3c') + ';font-size:15px;margin-bottom:8px;">' +
    (pass ? '✅ PASS — Subbase مطابق' : '❌ FAIL — Subbase مرفوض') + '</div>' +
    '<ul style="list-style:none;padding:0;margin:0 0 8px;">' +
    issues.map(function(i){ return '<li style="padding:3px 0;font-size:13px;">' + i + '</li>'; }).join('') +
    '</ul>' +
    '<div style="font-size:12px;color:#666;border-top:1px solid #ddd;padding-top:8px;">' +
    '📋 ' + action + '<br>' +
    '<span style="color:#999;">QCS 2024 S17 P4 Table 4.1 | Ashghal RDM 2023 Table 3.2</span></div></div>';
};
