// ═══════════════════════════════════════════════════════════════════════
// QatarSpec Pro — Roads Calculators (12)
// المرجع: QCS 2024 Section 6 (Earthworks) + Section 8 (Asphalt)
// ═══════════════════════════════════════════════════════════════════════
(function() {
'use strict';

// ── 1. Pavement Thickness Design (AASHTO 93 Simplified) ──────────────
// حاسبة سماكة الرصف — AASHTO 1993 مبسطة
window.calcPavementThickness = function() {
  var esal = parseFloat(document.getElementById('pvt-esal').value);
  var cbr = parseFloat(document.getElementById('pvt-cbr').value);
  var rel = parseFloat(document.getElementById('pvt-reliability').value) || 90;
  if (isNaN(esal) || isNaN(cbr)) return showToast('❌ أدخل ESAL و CBR');
  if (esal <= 0 || cbr <= 0) return showToast('❌ القيم يجب أن تكون أكبر من صفر');

  // معادلة تقريبية مبنية على AASHTO 93
  var mr = 1500 * cbr; // Resilient Modulus (psi) ≈ 1500 × CBR
  var zr = rel >= 95 ? -1.645 : rel >= 90 ? -1.282 : rel >= 85 ? -1.037 : -0.841;
  var so = 0.45; // Overall standard deviation
  var dpsi = 1.7; // ΔPSI = 4.2 - 2.5

  // حل SN التقريبي بالتكرار
  var logW = Math.log10(esal);
  var sn = 1.0;
  for (var iter = 0; iter < 50; iter++) {
    var logCalc = zr * so + 9.36 * Math.log10(sn + 1) - 0.20 +
      Math.log10(dpsi / (4.2 - 1.5)) / (0.40 + 1094 / Math.pow(sn + 1, 5.19)) +
      2.32 * Math.log10(mr) - 8.07;
    if (Math.abs(logCalc - logW) < 0.01) break;
    sn += (logW > logCalc) ? 0.1 : -0.05;
    if (sn < 0.5) sn = 0.5;
  }

  // تحويل SN إلى سماكات الطبقات
  var a1 = 0.44, a2 = 0.14, a3 = 0.11; // Layer coefficients
  var m2 = 1.0, m3 = 1.0;
  var d1 = Math.max(2, Math.ceil(sn * 0.35 / a1)); // Asphalt (inches)
  var d2 = Math.max(6, Math.ceil((sn - a1 * d1) * 0.4 / (a2 * m2))); // Base
  var d3 = Math.max(6, Math.ceil((sn - a1 * d1 - a2 * m2 * d2) / (a3 * m3))); // Subbase
  if (d3 < 0) d3 = 6;

  // تحويل إلى mm
  var d1mm = Math.ceil(d1 * 25.4 / 5) * 5;
  var d2mm = Math.ceil(d2 * 25.4 / 5) * 5;
  var d3mm = Math.ceil(d3 * 25.4 / 5) * 5;
  var totalMm = d1mm + d2mm + d3mm;

  var detail = 'SN = ' + sn.toFixed(2) + ' | MR = ' + mr.toFixed(0) + ' psi' +
    '\nAsphalt: ' + d1mm + ' mm | Base: ' + d2mm + ' mm | Subbase: ' + d3mm + ' mm' +
    '\nTotal: ' + totalMm + ' mm | Reliability: ' + rel + '%' +
    '\n📖 AASHTO Guide 1993 + QCS 2024 S6/S8';

  showResult('pvt-result', true, totalMm, null, detail, '');
  _addCopyBtn('pvt-result', 'سماكة الرصف: Asphalt=' + d1mm + 'mm, Base=' + d2mm + 'mm, Subbase=' + d3mm + 'mm (SN=' + sn.toFixed(2) + ')');
};

// ── 2. Marshall Stability (تفصيلي) ──────────────────────────────────
// فحص كامل لمعاملات مارشال — QCS 2024 S8 P5
window.calcMarshallV2 = function() {
  var type = document.getElementById('mar2-type').value;
  var stab = parseFloat(document.getElementById('mar2-stab').value);
  var flow = parseFloat(document.getElementById('mar2-flow').value);
  var va = parseFloat(document.getElementById('mar2-va').value);
  var vma = parseFloat(document.getElementById('mar2-vma').value);
  var vfa = parseFloat(document.getElementById('mar2-vfa').value);
  if (isNaN(stab) && isNaN(flow) && isNaN(va)) return showToast('❌ أدخل نتيجة واحدة على الأقل');

  var specs = {
    wc: { stabMin: 9, flowMin: 2, flowMax: 4, vaMin: 3, vaMax: 5, vmaMin: 14, vfaMin: 65, vfaMax: 78 },
    bc: { stabMin: 8, flowMin: 2, flowMax: 4, vaMin: 3, vaMax: 5, vmaMin: 13, vfaMin: 65, vfaMax: 78 }
  };
  var s = specs[type] || specs.wc;
  var issues = [], pass = true;

  if (!isNaN(stab) && stab < s.stabMin) { issues.push('Stability ' + stab + 'kN < ' + s.stabMin + 'kN ❌'); pass = false; }
  else if (!isNaN(stab)) issues.push('Stability ' + stab + 'kN ≥ ' + s.stabMin + 'kN ✅');

  if (!isNaN(flow)) {
    if (flow < s.flowMin || flow > s.flowMax) { issues.push('Flow ' + flow + 'mm خارج ' + s.flowMin + '-' + s.flowMax + 'mm ❌'); pass = false; }
    else issues.push('Flow ' + flow + 'mm ✅');
  }
  if (!isNaN(va)) {
    if (va < s.vaMin || va > s.vaMax) { issues.push('Va ' + va + '% خارج ' + s.vaMin + '-' + s.vaMax + '% ❌'); pass = false; }
    else issues.push('Va ' + va + '% ✅');
  }
  if (!isNaN(vma)) {
    if (vma < s.vmaMin) { issues.push('VMA ' + vma + '% < ' + s.vmaMin + '% ❌'); pass = false; }
    else issues.push('VMA ' + vma + '% ✅');
  }
  if (!isNaN(vfa)) {
    if (vfa < s.vfaMin || vfa > s.vfaMax) { issues.push('VFA ' + vfa + '% خارج ' + s.vfaMin + '-' + s.vfaMax + '% ❌'); pass = false; }
    else issues.push('VFA ' + vfa + '% ✅');
  }

  var detail = issues.join(' | ') + '\n📖 QCS 2024 S8 P5 — Marshall Mix Design';
  var action = pass ? '' : 'إعادة تصميم الخلطة — تعديل نسب الركام والبيتومين + Trial Mix جديد';
  showResult('mar2-result', pass, null, null, detail, action);
  _addCopyBtn('mar2-result', 'Marshall: ' + issues.join(', '));
};

// ── 3. Core Density vs TMD ──────────────────────────────────────────
// كثافة Core vs TMD — QCS 2024 S8 P6
window.calcCoreDensityV2 = function() {
  var bulk = parseFloat(document.getElementById('cd2-bulk').value);
  var tmd = parseFloat(document.getElementById('cd2-tmd').value);
  var layer = document.getElementById('cd2-layer').value;
  if (isNaN(bulk) || isNaN(tmd) || tmd === 0) return showToast('❌ أدخل Bulk Density و TMD');

  var pct = (bulk / tmd * 100).toFixed(1);
  var req = parseFloat(layer);
  var pass = parseFloat(pct) >= req;
  var detail = 'Core Density: ' + pct + '% TMD | المطلوب: ≥' + req + '% | Bulk: ' + bulk + ' g/cm³ | TMD: ' + tmd + ' g/cm³' +
    '\n📖 QCS 2024 S8 P6 — Compacted Density';
  var action = pass ? '' : 'Mill and re-lay — إعادة الفرد والدمك بمعدل دمك أعلى';
  showResult('cd2-result', pass, pct, req, detail, action);
  _addCopyBtn('cd2-result', 'Core Density=' + pct + '% (Req≥' + req + '%)');
};

// ── 4. IRI (International Roughness Index) ──────────────────────────
// مؤشر الخشونة الدولي — QCS 2024 S8 P7
window.calcIRIV2 = function() {
  var val = parseFloat(document.getElementById('iri2-val').value);
  var type = document.getElementById('iri2-type').value;
  if (isNaN(val)) return showToast('❌ أدخل قيمة IRI');

  var reqs = { expressway: 1.5, arterial: 2.0, collector: 2.5, local: 3.0 };
  var names = { expressway: 'Expressway', arterial: 'Arterial Road', collector: 'Collector', local: 'Local Road' };
  var req = reqs[type] || 2.0;
  var pass = val <= req;
  var rating = val <= 1.5 ? 'ممتاز' : val <= 2.5 ? 'جيد' : val <= 3.5 ? 'مقبول' : 'ضعيف — يحتاج صيانة';
  var detail = 'IRI = ' + val + ' m/km | الحد: ≤' + req + ' m/km (' + names[type] + ') | التصنيف: ' + rating +
    '\n📖 QCS 2024 S8 P7 + Ashghal RDM';
  showResult('iri2-result', pass, val, req, detail, 'Overlay أو Mill & Re-pave حسب شدة الخلل');
  _addCopyBtn('iri2-result', 'IRI=' + val + ' m/km (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 5. Crossfall / Superelevation ───────────────────────────────────
// ميل عرضي — QCS 2024 S6
window.calcCrossfallV2 = function() {
  var val = parseFloat(document.getElementById('cf2-val').value);
  var type = document.getElementById('cf2-type').value;
  if (isNaN(val)) return showToast('❌ أدخل نسبة الميل');

  var pass, detail;
  if (type === 'normal') {
    pass = val >= 2.0 && val <= 3.0;
    detail = 'Crossfall: ' + val + '% | المطلوب: 2.0-3.0% | الهدف: 2.5%';
  } else if (type === 'super') {
    pass = val >= 2.0 && val <= 8.0;
    detail = 'Superelevation: ' + val + '% | المطلوب: 2.0-8.0% (max per design speed)';
  } else {
    var tol = 0.5;
    pass = Math.abs(val - 2.5) <= tol;
    detail = 'Crossfall: ' + val + '% | الهدف: 2.5% ±' + tol + '%';
  }
  detail += '\n📖 QCS 2024 S6 + Ashghal RDM 2023';
  showResult('cf2-result', pass, val, null, detail, 'تعديل منسوب السطح لتحقيق الميل المطلوب');
  _addCopyBtn('cf2-result', 'Crossfall=' + val + '% (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 6. Straightedge / Surface Regularity ────────────────────────────
// استقامة السطح — QCS 2024 S8
window.calcStraightedgeV2 = function() {
  var val = parseFloat(document.getElementById('str2-val').value);
  var layer = document.getElementById('str2-layer').value;
  if (isNaN(val)) return showToast('❌ أدخل قيمة الفجوة');

  var reqs = { wc: 3, bc: 5, base: 10, subbase: 15 };
  var names = { wc: 'Wearing Course', bc: 'Binder Course', base: 'Base Course', subbase: 'Subbase' };
  var req = reqs[layer] || 5;
  var pass = val <= req;
  var detail = 'الفجوة: ' + val + 'mm | الحد: ≤' + req + 'mm (3m Straightedge) | الطبقة: ' + names[layer] +
    '\n📖 QCS 2024 S8 — Surface Regularity';
  showResult('str2-result', pass, val, req, detail, 'Mill and re-lay المنطقة المرفوضة');
  _addCopyBtn('str2-result', 'Straightedge=' + val + 'mm (≤' + req + 'mm)');
};

// ── 7. Skid Resistance (BPN) ────────────────────────────────────────
// مقاومة الانزلاق — QCS 2024 S8
window.calcSkidV2 = function() {
  var bpn = parseFloat(document.getElementById('skid2-bpn').value);
  var type = document.getElementById('skid2-type').value;
  if (isNaN(bpn)) return showToast('❌ أدخل قيمة BPN');

  var reqs = { expressway: 55, arterial: 50, local: 45 };
  var req = reqs[type] || 50;
  var pass = bpn >= req;
  var rating = bpn >= 65 ? 'ممتاز' : bpn >= 55 ? 'جيد' : bpn >= 45 ? 'مقبول' : 'خطر';
  var detail = 'BPN = ' + bpn + ' | المطلوب: ≥' + req + ' | التصنيف: ' + rating +
    '\n📖 QCS 2024 S8 P7 — Skid Resistance';
  showResult('skid2-result', pass, bpn, req, detail, 'Surface Treatment أو Re-surfacing بركام عالي المقاومة');
  _addCopyBtn('skid2-result', 'Skid BPN=' + bpn + ' (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 8. Bitumen Content Check ────────────────────────────────────────
// نسبة البيتومين — QCS 2024 S8 P5
window.calcBitumenV2 = function() {
  var actual = parseFloat(document.getElementById('bit2-actual').value);
  var design = parseFloat(document.getElementById('bit2-design').value);
  if (isNaN(actual) || isNaN(design)) return showToast('❌ أدخل النسبة الفعلية والتصميمية');

  var tol = 0.3; // ±0.3% tolerance per QCS
  var diff = Math.abs(actual - design);
  var pass = diff <= tol;
  var detail = 'بيتومين فعلي: ' + actual + '% | تصميمي: ' + design + '% | الفرق: ' + diff.toFixed(2) + '% | السماح: ±' + tol + '%' +
    '\n📖 QCS 2024 S8 P5 — Binder Content Tolerance';
  showResult('bit2-result', pass, diff.toFixed(2), tol, detail, 'تعديل معدل الرش في المحطة + أخذ عينة جديدة');
  _addCopyBtn('bit2-result', 'Bitumen=' + actual + '% (Design ' + design + '%, Diff ' + diff.toFixed(2) + '%)');
};

// ── 9. Prime Coat Application Rate ──────────────────────────────────
// معدل رش البرايم — QCS 2024 S8 P3
window.calcPrimeCoatV2 = function() {
  var rate = parseFloat(document.getElementById('prime2-rate').value);
  if (isNaN(rate)) return showToast('❌ أدخل معدل الرش');

  var minRate = 0.7, maxRate = 1.4; // L/m² MC-30 or MC-70
  var pass = rate >= minRate && rate <= maxRate;
  var detail = 'معدل الرش: ' + rate + ' L/m² | المطلوب: ' + minRate + '-' + maxRate + ' L/m²' +
    '\n📖 QCS 2024 S8 P3 — Prime Coat (MC-30/MC-70)';
  showResult('prime2-result', pass, rate, minRate + '-' + maxRate, detail, 'تعديل ضغط رشاش الرش + إعادة المعايرة');
  _addCopyBtn('prime2-result', 'Prime Rate=' + rate + ' L/m² (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 10. Tack Coat Application Rate ──────────────────────────────────
// معدل رش التاك كوت — QCS 2024 S8 P4
window.calcTackCoatV2 = function() {
  var rate = parseFloat(document.getElementById('tack2-rate').value);
  var surface = document.getElementById('tack2-surface').value;
  if (isNaN(rate)) return showToast('❌ أدخل معدل الرش');

  var ranges = {
    new_asphalt: { min: 0.15, max: 0.35, name: 'New Asphalt' },
    old_asphalt: { min: 0.30, max: 0.50, name: 'Old/Milled Asphalt' },
    concrete: { min: 0.35, max: 0.55, name: 'Concrete Surface' }
  };
  var r = ranges[surface] || ranges.new_asphalt;
  var pass = rate >= r.min && rate <= r.max;
  var detail = 'معدل الرش: ' + rate + ' L/m² (Residual) | المطلوب: ' + r.min + '-' + r.max + ' L/m² (' + r.name + ')' +
    '\n📖 QCS 2024 S8 P4 — Tack Coat (CSS-1 / RS-1)';
  showResult('tack2-result', pass, rate, r.min + '-' + r.max, detail, 'تعديل nozzle pressure + re-calibration');
  _addCopyBtn('tack2-result', 'Tack Rate=' + rate + ' L/m² (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 11. Surface Texture Depth (Sand Patch) ──────────────────────────
// عمق الملمس السطحي — QCS 2024 S8
window.calcSandPatchV2 = function() {
  var depth = parseFloat(document.getElementById('sp2-depth').value);
  var type = document.getElementById('sp2-type').value;
  if (isNaN(depth)) return showToast('❌ أدخل عمق الملمس');

  var reqs = { expressway: 0.7, arterial: 0.6, local: 0.5 };
  var req = reqs[type] || 0.6;
  var pass = depth >= req;
  var detail = 'Texture Depth: ' + depth + ' mm | المطلوب: ≥' + req + ' mm (Sand Patch / EN 13036-1)' +
    '\n📖 QCS 2024 S8 P7 — Surface Texture';
  showResult('sp2-result', pass, depth, req, detail, 'Surface Treatment أو micro-surfacing');
  _addCopyBtn('sp2-result', 'Texture=' + depth + 'mm (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 12. Deflection (Benkelman Beam) ─────────────────────────────────
// اختبار الانحراف — Ashghal RDM
window.calcDeflectionV2 = function() {
  var d0 = parseFloat(document.getElementById('def2-d0').value);
  var type = document.getElementById('def2-type').value;
  if (isNaN(d0)) return showToast('❌ أدخل قيمة الانحراف');

  var reqs = { heavy: 0.50, medium: 0.75, light: 1.00 };
  var names = { heavy: 'Heavy Traffic', medium: 'Medium Traffic', light: 'Light Traffic' };
  var req = reqs[type] || 0.75;
  var pass = d0 <= req;
  var detail = 'D0 = ' + d0 + ' mm | الحد: ≤' + req + ' mm (' + names[type] + ') | Temp-corrected to 20°C' +
    '\n📖 Ashghal RDM 2023 — FWD/Benkelman Beam';
  showResult('def2-result', pass, d0, req, detail, 'Deep patching أو full-depth reconstruction حسب سبب الضعف');
  _addCopyBtn('def2-result', 'Deflection D0=' + d0 + 'mm (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── Helper: زر نسخ النتيجة ──────────────────────────────────────────
function _addCopyBtn(elId, text) {
  var el = document.getElementById(elId);
  if (!el) return;
  var btn = document.createElement('button');
  btn.className = 'calc-btn';
  btn.style.cssText = 'margin-top:8px;font-size:11px;padding:6px 14px;background:rgba(52,152,219,0.15);border:1px solid rgba(52,152,219,0.3);color:#3498db;';
  btn.textContent = '📋 نسخ النتيجة';
  btn.onclick = function() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() { showToast('✅ تم النسخ'); });
    } else {
      showToast('❌ النسخ غير مدعوم');
    }
  };
  // لا تضيف أكثر من زر
  if (!el.querySelector('.calc-btn')) el.appendChild(btn);
}

// ── تسجيل الحاسبات في UI (تمديد initCalcPanels) ──────────────────
window._extRoadsCalcs = function() {
  var el = document.getElementById('cat-roads');
  if (!el || el.dataset.extBuilt) return;
  el.dataset.extBuilt = '1';

  // إضافة تبويبات جديدة
  var existingTabs = el.querySelector('.calc-tabs');
  if (existingTabs) {
    var newTabs = [
      ['mar2-r','🔬 Marshall+'],['cd2-r','📦 Core Density'],['iri2-r','📐 IRI'],
      ['cf2-r','↗️ Crossfall'],['str2-r','📏 Straightedge'],['skid2-r','🚗 Skid'],
      ['bit2-r','🛢️ Bitumen'],['prime2-r','💧 Prime Coat'],['tack2-r','🔗 Tack Coat'],
      ['sp2-r','🏖️ Texture'],['def2-r','📉 Deflection'],['pvt-r','📐 Thickness']
    ];
    newTabs.forEach(function(t) {
      var tab = document.createElement('div');
      tab.className = 'calc-tab';
      tab.onclick = function() { switchCalc(t[0], this); };
      tab.textContent = t[1];
      existingTabs.appendChild(tab);
    });
  }

  // إضافة أقسام الحاسبات الجديدة
  var sections = '';

  sections += _section('mar2-r', '🔬 Marshall Full Check — QCS S8 P5',
    _calcSelect('mar2-type', 'نوع الطبقة', [['wc','Wearing Course'],['bc','Binder Course']]) +
    _calcField('mar2-stab', 'Marshall Stability', 'e.g. 12.5', 'kN') +
    _calcField('mar2-flow', 'Flow', 'e.g. 3.2', 'mm') +
    _calcField('mar2-va', 'Air Voids (Va)', 'e.g. 4.0', '%') +
    _calcField('mar2-vma', 'VMA', 'e.g. 15', '%') +
    _calcField('mar2-vfa', 'VFA', 'e.g. 72', '%') +
    _calcBtn('calcMarshallV2()', 'فحص مارشال كامل ✅') + _calcResult('mar2-result'));

  sections += _section('cd2-r', '📦 Core Density vs TMD — QCS S8 P6',
    _calcSelect('cd2-layer', 'الحد المطلوب', [['97','Wearing/Binder (≥97%)'],['96','Base Course (≥96%)']]) +
    _calcField('cd2-bulk', 'Bulk Density', 'e.g. 2.38', 'g/cm³') +
    _calcField('cd2-tmd', 'TMD (Rice)', 'e.g. 2.45', 'g/cm³') +
    _calcBtn('calcCoreDensityV2()', 'احسب %TMD') + _calcResult('cd2-result'));

  sections += _section('iri2-r', '📐 IRI — مؤشر الخشونة — QCS S8 P7',
    _calcSelect('iri2-type', 'نوع الطريق', [['expressway','Expressway (≤1.5)'],['arterial','Arterial (≤2.0)'],['collector','Collector (≤2.5)'],['local','Local (≤3.0)']]) +
    _calcField('iri2-val', 'IRI المقاس', 'e.g. 1.8', 'm/km') +
    _calcBtn('calcIRIV2()', 'تحقق من IRI') + _calcResult('iri2-result'));

  sections += _section('cf2-r', '↗️ Crossfall / Superelevation',
    _calcSelect('cf2-type', 'النوع', [['normal','Normal Crossfall (2-3%)'],['super','Superelevation (2-8%)'],['check','Check vs 2.5% target']]) +
    _calcField('cf2-val', 'الميل المقاس', 'e.g. 2.5', '%') +
    _calcBtn('calcCrossfallV2()', 'تحقق') + _calcResult('cf2-result'));

  sections += _section('str2-r', '📏 Straightedge 3m — QCS S8',
    _calcSelect('str2-layer', 'الطبقة', [['wc','Wearing Course (≤3mm)'],['bc','Binder Course (≤5mm)'],['base','Base Course (≤10mm)'],['subbase','Subbase (≤15mm)']]) +
    _calcField('str2-val', 'الفجوة القصوى', 'e.g. 4', 'mm') +
    _calcBtn('calcStraightedgeV2()', 'تحقق') + _calcResult('str2-result'));

  sections += _section('skid2-r', '🚗 Skid Resistance BPN — QCS S8 P7',
    _calcSelect('skid2-type', 'نوع الطريق', [['expressway','Expressway (≥55)'],['arterial','Arterial (≥50)'],['local','Local (≥45)']]) +
    _calcField('skid2-bpn', 'BPN Value', 'e.g. 58', '') +
    _calcBtn('calcSkidV2()', 'تحقق') + _calcResult('skid2-result'));

  sections += _section('bit2-r', '🛢️ Bitumen Content — QCS S8 P5',
    _calcField('bit2-actual', 'النسبة الفعلية', 'e.g. 4.8', '%') +
    _calcField('bit2-design', 'النسبة التصميمية', 'e.g. 5.0', '%') +
    _calcBtn('calcBitumenV2()', 'تحقق (±0.3%)') + _calcResult('bit2-result'));

  sections += _section('prime2-r', '💧 Prime Coat Rate — QCS S8 P3',
    _calcField('prime2-rate', 'معدل الرش الفعلي', 'e.g. 1.0', 'L/m²') +
    _calcBtn('calcPrimeCoatV2()', 'تحقق') + _calcResult('prime2-result'));

  sections += _section('tack2-r', '🔗 Tack Coat Rate — QCS S8 P4',
    _calcSelect('tack2-surface', 'نوع السطح', [['new_asphalt','New Asphalt (0.15-0.35)'],['old_asphalt','Old/Milled (0.30-0.50)'],['concrete','Concrete (0.35-0.55)']]) +
    _calcField('tack2-rate', 'معدل الرش (Residual)', 'e.g. 0.25', 'L/m²') +
    _calcBtn('calcTackCoatV2()', 'تحقق') + _calcResult('tack2-result'));

  sections += _section('sp2-r', '🏖️ Surface Texture Depth — Sand Patch',
    _calcSelect('sp2-type', 'نوع الطريق', [['expressway','Expressway (≥0.7mm)'],['arterial','Arterial (≥0.6mm)'],['local','Local (≥0.5mm)']]) +
    _calcField('sp2-depth', 'Texture Depth', 'e.g. 0.8', 'mm') +
    _calcBtn('calcSandPatchV2()', 'تحقق') + _calcResult('sp2-result'));

  sections += _section('def2-r', '📉 Deflection — Benkelman/FWD',
    _calcSelect('def2-type', 'حركة المرور', [['heavy','Heavy Traffic (≤0.50mm)'],['medium','Medium (≤0.75mm)'],['light','Light (≤1.00mm)']]) +
    _calcField('def2-d0', 'D0 (Central Deflection)', 'e.g. 0.45', 'mm') +
    _calcBtn('calcDeflectionV2()', 'تحقق') + _calcResult('def2-result'));

  sections += _section('pvt-r', '📐 Pavement Thickness — AASHTO 93',
    _calcField('pvt-esal', 'ESAL (Equiv. 18-kip)', 'e.g. 5000000', '') +
    _calcField('pvt-cbr', 'Subgrade CBR', 'e.g. 8', '%') +
    _calcSelect('pvt-reliability', 'Reliability', [['95','95% — Expressway'],['90','90% — Arterial'],['85','85% — Collector'],['80','80% — Local']]) +
    _calcBtn('calcPavementThickness()', 'احسب السماكة') + _calcResult('pvt-result'));

  // إخفاء الأقسام الجديدة
  var temp = document.createElement('div');
  temp.innerHTML = sections;
  var newSections = temp.querySelectorAll('.calc-section');
  newSections.forEach(function(s) {
    s.style.display = 'none';
    el.appendChild(s);
  });
};

})();
