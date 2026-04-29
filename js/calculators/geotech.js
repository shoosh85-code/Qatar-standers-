// ═══════════════════════════════════════════════════════════════════════
// QatarSpec Pro — Geotechnical Calculators (6)
// المرجع: QCS 2024 Section 6 + BS 1377 + ASTM D
// ═══════════════════════════════════════════════════════════════════════
(function() {
'use strict';

// ── 1. Proctor Test Validation ──────────────────────────────────────
// التحقق من اختبار بروكتور — BS 1377 Part 4
window.calcProctorValid = function() {
  var mdd = parseFloat(document.getElementById('proc-mdd').value);
  var omc = parseFloat(document.getElementById('proc-omc').value);
  var gs = parseFloat(document.getElementById('proc-gs').value) || 2.65;
  var method = document.getElementById('proc-method').value;
  if (isNaN(mdd) || isNaN(omc)) return showToast('❌ أدخل MDD و OMC');

  // التحقق من المعقولية
  var issues = [], pass = true;

  // حدود معقولة لـ MDD
  if (method === 'standard') {
    if (mdd < 1.40 || mdd > 2.30) { issues.push('MDD ' + mdd + ' g/cm³ خارج النطاق المعتاد (1.40-2.30) ⚠️'); }
  } else {
    if (mdd < 1.60 || mdd > 2.50) { issues.push('MDD ' + mdd + ' g/cm³ خارج النطاق المعتاد (1.60-2.50) ⚠️'); }
  }
  // OMC المعقول
  if (omc < 3 || omc > 30) issues.push('OMC ' + omc + '% — غير اعتيادي ⚠️');

  // Zero Air Voids line check
  var zav = (gs * 1000) / (1000 + gs * omc / 100 * 1000);
  // ← تبسيط: ZAV = Gs / (1 + Gs × w × ρw)
  // الأصح: γd_zav = Gs × γw / (1 + w × Gs)
  var zavDensity = (gs * 1.0) / (1 + (omc / 100) * gs);
  if (mdd > zavDensity) {
    issues.push('MDD ' + mdd + ' > ZAV Line ' + zavDensity.toFixed(3) + ' ❌ — خطأ في الاختبار!');
    pass = false;
  }

  // Degree of saturation at MDD
  var e = (gs / mdd) - 1; // void ratio
  var sr = (omc / 100) * gs / e * 100; // degree of saturation %
  if (sr > 100) { issues.push('Sr = ' + sr.toFixed(0) + '% > 100% — خطأ! ❌'); pass = false; }

  if (!issues.length) issues.push('النتائج معقولة ✅');

  var detail = 'MDD: ' + mdd + ' g/cm³ | OMC: ' + omc + '% | Gs: ' + gs +
    '\nMethod: ' + (method === 'standard' ? 'Standard (BS 1377:4)' : 'Modified (BS 1377:4)') +
    '\nZAV Density at OMC: ' + zavDensity.toFixed(3) + ' g/cm³ | Sr at OMC: ' + sr.toFixed(0) + '%' +
    '\ne (void ratio): ' + e.toFixed(3) +
    '\n' + issues.join(' | ') +
    '\n📖 BS 1377 Part 4 + QCS 2024 S6';
  showResult('proc-result', pass, mdd, null, detail, 'إعادة الاختبار — تحقق من calibration الأدوات');
  _addCopyBtn('proc-result', 'Proctor: MDD=' + mdd + ', OMC=' + omc + '%');
};

// ── 2. Sieve Analysis Compliance ────────────────────────────────────
// التحقق من التدرج الحبيبي — QCS 2024 S6
window.calcSieveAnalysis = function() {
  var material = document.getElementById('sieve-mat').value;
  var p75 = parseFloat(document.getElementById('sieve-75').value);
  var p475 = parseFloat(document.getElementById('sieve-475').value);
  var p0075 = parseFloat(document.getElementById('sieve-0075').value);
  if (isNaN(p75) && isNaN(p475) && isNaN(p0075)) return showToast('❌ أدخل قيمة واحدة على الأقل');

  // حدود QCS لكل مادة
  var specs = {
    subbase: {
      p75: [100, 100], p475: [25, 80], p0075: [0, 12],
      name: 'Subbase — QCS S6 Table 6.3'
    },
    base: {
      p75: [100, 100], p475: [25, 55], p0075: [0, 8],
      name: 'Base Course — QCS S6 Table 6.4'
    },
    fill: {
      p75: [100, 100], p475: [20, 100], p0075: [0, 15],
      name: 'General Fill — QCS S6'
    },
    sand_bed: {
      p75: [100, 100], p475: [80, 100], p0075: [0, 5],
      name: 'Pipe Bedding Sand — QCS S10'
    }
  };
  var s = specs[material] || specs.subbase;
  var issues = [], pass = true;

  if (!isNaN(p75)) {
    if (p75 < s.p75[0] || p75 > s.p75[1]) { issues.push('75mm: ' + p75 + '% خارج ' + s.p75[0] + '-' + s.p75[1] + '% ❌'); pass = false; }
    else issues.push('75mm: ' + p75 + '% ✅');
  }
  if (!isNaN(p475)) {
    if (p475 < s.p475[0] || p475 > s.p475[1]) { issues.push('4.75mm: ' + p475 + '% خارج ' + s.p475[0] + '-' + s.p475[1] + '% ❌'); pass = false; }
    else issues.push('4.75mm: ' + p475 + '% ✅');
  }
  if (!isNaN(p0075)) {
    if (p0075 < s.p0075[0] || p0075 > s.p0075[1]) { issues.push('0.075mm: ' + p0075 + '% خارج ' + s.p0075[0] + '-' + s.p0075[1] + '% ❌'); pass = false; }
    else issues.push('0.075mm: ' + p0075 + '% ✅');
  }

  var detail = 'المادة: ' + s.name +
    '\n' + issues.join(' | ') +
    '\n📖 QCS 2024 S6 — Grading Requirements';
  showResult('sieve-result', pass, null, null, detail, 'خلط مع مادة مكملة أو تغيير المصدر');
  _addCopyBtn('sieve-result', 'Sieve (' + s.name + '): ' + issues.join(', '));
};

// ── 3. USCS Soil Classification ─────────────────────────────────────
// تصنيف التربة — ASTM D2487
window.calcUSCS = function() {
  var p200 = parseFloat(document.getElementById('uscs-p200').value);
  var ll = parseFloat(document.getElementById('uscs-ll').value);
  var pl = parseFloat(document.getElementById('uscs-pl').value);
  var p4 = parseFloat(document.getElementById('uscs-p4').value) || 100;
  if (isNaN(p200)) return showToast('❌ أدخل نسبة المار من #200');

  var pi = (!isNaN(ll) && !isNaN(pl)) ? ll - pl : null;
  var classification = '', desc = '';

  if (p200 < 50) {
    // خشنة
    var coarseOnNo4 = 100 - p4;
    if (coarseOnNo4 > 50) {
      // حصى
      if (p200 < 5) {
        classification = pi && pi > 4 ? 'GP' : 'GW';
        desc = classification === 'GW' ? 'حصى متدرج جيداً' : 'حصى ضعيف التدرج';
      } else {
        classification = pi && pi > 7 ? 'GC' : 'GM';
        desc = classification === 'GC' ? 'حصى طيني' : 'حصى سلتي';
      }
    } else {
      // رمل
      if (p200 < 5) {
        classification = pi && pi > 4 ? 'SP' : 'SW';
        desc = classification === 'SW' ? 'رمل متدرج جيداً' : 'رمل ضعيف التدرج';
      } else {
        classification = pi && pi > 7 ? 'SC' : 'SM';
        desc = classification === 'SC' ? 'رمل طيني' : 'رمل سلتي';
      }
    }
  } else {
    // ناعمة
    if (!isNaN(ll)) {
      if (ll < 50) {
        classification = pi && pi > (0.73 * (ll - 20)) ? 'CL' : 'ML';
        desc = classification === 'CL' ? 'طين منخفض اللدونة' : 'سلت منخفض اللدونة';
      } else {
        classification = pi && pi > (0.73 * (ll - 20)) ? 'CH' : 'MH';
        desc = classification === 'CH' ? 'طين عالي اللدونة' : 'سلت عالي اللدونة';
      }
    } else {
      classification = 'Fine-grained (أدخل LL/PL)';
      desc = 'تحتاج حدود أتربرج للتصنيف';
    }
  }

  // تقييم للاستخدام في قطر
  var suitability = '';
  if (['SW','GW','GP','SP'].indexOf(classification) >= 0) suitability = '✅ مناسبة كطبقات فوقية + ردم';
  else if (['SM','GM','SC','GC'].indexOf(classification) >= 0) suitability = '⚠️ تحتاج اختبارات إضافية (PI, CBR)';
  else suitability = '❌ غير مناسبة كطبقات فوقية — استبدال أو معالجة';

  var detail = 'USCS: ' + classification + ' — ' + desc +
    '\nPassing #200: ' + p200 + '%' + (pi !== null ? ' | PI: ' + pi + '%' : '') + (!isNaN(ll) ? ' | LL: ' + ll + '%' : '') +
    '\nللاستخدام في قطر: ' + suitability +
    '\n📖 ASTM D2487 + QCS 2024 S6';
  showResult('uscs-result', true, null, null, detail, '');
  _addCopyBtn('uscs-result', 'USCS: ' + classification + ' — ' + desc);
};

// ── 4. Consolidation Settlement Estimate ────────────────────────────
// تقدير الهبوط — Terzaghi
window.calcSettlement = function() {
  var h = parseFloat(document.getElementById('settl-h').value);
  var cc = parseFloat(document.getElementById('settl-cc').value);
  var e0 = parseFloat(document.getElementById('settl-e0').value);
  var p0 = parseFloat(document.getElementById('settl-p0').value);
  var dp = parseFloat(document.getElementById('settl-dp').value);
  if (isNaN(h) || isNaN(cc) || isNaN(e0) || isNaN(p0) || isNaN(dp)) return showToast('❌ أدخل جميع القيم');
  if (p0 <= 0 || (1 + e0) === 0) return showToast('❌ قيم غير صحيحة');

  // S = (Cc × H) / (1 + e0) × log10((p0 + Δp) / p0)
  var settlement = (cc * h * 1000) / (1 + e0) * Math.log10((p0 + dp) / p0);
  settlement = Math.abs(settlement);

  var rating = settlement < 25 ? 'مقبول (< 25mm)' : settlement < 50 ? 'معتدل — يحتاج مراقبة' : 'مرتفع — معالجة مطلوبة';
  var pass = settlement < 50;

  var detail = 'الهبوط التقديري: ' + settlement.toFixed(1) + ' mm' +
    '\nH = ' + h + 'm | Cc = ' + cc + ' | e₀ = ' + e0 +
    '\nσ₀ = ' + p0 + ' kPa | Δσ = ' + dp + ' kPa' +
    '\nالتقييم: ' + rating +
    '\n📖 Terzaghi 1D Consolidation | ⚠️ تقديري — راجع تقرير التربة';
  showResult('settl-result', pass, settlement.toFixed(1), 50, detail, 'Surcharge preloading / Wick drains / Deep foundations');
  _addCopyBtn('settl-result', 'Settlement≈' + settlement.toFixed(1) + 'mm');
};

// ── 5. Permeability Check ───────────────────────────────────────────
// التحقق من النفاذية — QCS 2024
window.calcPermeability = function() {
  var k = parseFloat(document.getElementById('perm-k').value);
  var use = document.getElementById('perm-use').value;
  if (isNaN(k)) return showToast('❌ أدخل معامل النفاذية');

  var reqs = {
    landfill_liner: { max: 1e-9, name: 'Landfill Liner (≤1×10⁻⁹ m/s)' },
    pond_liner: { max: 1e-8, name: 'Retention Pond Liner (≤1×10⁻⁸ m/s)' },
    drainage: { min: 1e-4, name: 'Drainage Layer (≥1×10⁻⁴ m/s)' },
    general_fill: { max: 1e-5, name: 'General Fill (≤1×10⁻⁵ m/s)' }
  };
  var r = reqs[use] || reqs.general_fill;
  var pass;
  if (r.min) {
    pass = k >= r.min;
  } else {
    pass = k <= r.max;
  }

  var kStr = k.toExponential(1);
  var detail = 'k = ' + kStr + ' m/s | المتطلب: ' + r.name +
    '\n' + (pass ? 'النفاذية مطابقة ✅' : 'النفاذية غير مطابقة ❌') +
    '\n📖 QCS 2024 S6 + BS 1377 Part 5';
  showResult('perm-result', pass, kStr, null, detail, 'تغيير المادة أو إضافة bentonite للتقليل / حصى للزيادة');
  _addCopyBtn('perm-result', 'Permeability k=' + kStr + ' m/s (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 6. Plate Load Test (Modulus of Subgrade Reaction) ───────────────
// اختبار الحمل بالصفيحة — QCS 2024 S6
window.calcPlateLoadGeo = function() {
  var load = parseFloat(document.getElementById('plt-load').value);
  var defl = parseFloat(document.getElementById('plt-defl').value);
  var plateDia = parseFloat(document.getElementById('plt-dia').value) || 300;
  var layer = document.getElementById('plt-layer').value;
  if (isNaN(load) || isNaN(defl) || defl === 0) return showToast('❌ أدخل الحمل والانحراف');

  // k = q / δ حيث q = P / A
  var plateArea = Math.PI * Math.pow(plateDia / 2, 2) / 1e6; // m²
  var q = load / plateArea; // kPa
  var k_value = q / (defl / 1000); // kN/m³
  var k_mpa = k_value / 1000; // MN/m³

  // متطلبات QCS
  var reqs = {
    subgrade: { min: 30, name: 'Subgrade (≥30 MN/m³)' },
    subbase: { min: 80, name: 'Subbase (≥80 MN/m³)' },
    base: { min: 120, name: 'Base Course (≥120 MN/m³)' }
  };
  var r = reqs[layer] || reqs.subgrade;
  var pass = k_mpa >= r.min;

  // تصنيف Ev2/Ev1
  var detail = 'q = ' + q.toFixed(0) + ' kPa | δ = ' + defl + ' mm | k = ' + k_mpa.toFixed(1) + ' MN/m³' +
    '\nPlate ⌀' + plateDia + 'mm | المطلوب: ' + r.name +
    '\n📖 QCS 2024 S6 + DIN 18134 — Plate Bearing Test';
  showResult('plt-result', pass, k_mpa.toFixed(1), r.min, detail, 'إعادة الدمك + إضافة طبقة تثبيت + retest');
  _addCopyBtn('plt-result', 'Plate Load: k=' + k_mpa.toFixed(1) + ' MN/m³ (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── Helper: زر نسخ ──────────────────────────────────────────────────
function _addCopyBtn(elId, text) {
  var el = document.getElementById(elId);
  if (!el || el.querySelector('.calc-btn')) return;
  var btn = document.createElement('button');
  btn.className = 'calc-btn';
  btn.style.cssText = 'margin-top:8px;font-size:11px;padding:6px 14px;background:rgba(52,152,219,0.15);border:1px solid rgba(52,152,219,0.3);color:#3498db;';
  btn.textContent = '📋 نسخ النتيجة';
  btn.onclick = function() {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(function() { showToast('✅ تم النسخ'); });
  };
  el.appendChild(btn);
}

// ── تسجيل الحاسبات في UI ───────────────────────────────────────────
window._extGeotechCalcs = function() {
  var el = document.getElementById('cat-geotech_calc');
  if (!el || el.dataset.extBuilt) return;
  el.dataset.extBuilt = '1';

  var existingTabs = el.querySelector('.calc-tabs');
  if (existingTabs) {
    var newTabs = [
      ['proc-g','📊 Proctor'],['sieve-g','🔬 Sieve'],['uscs-g','🏷️ USCS'],
      ['settl-g','📉 Settlement'],['perm-g','💧 Permeability'],['plt-g','🔩 Plate Load']
    ];
    newTabs.forEach(function(t) {
      var tab = document.createElement('div');
      tab.className = 'calc-tab';
      tab.onclick = function() { switchCalc(t[0], this); };
      tab.textContent = t[1];
      existingTabs.appendChild(tab);
    });
  }

  var sections = '';

  sections += _section('proc-g', '📊 Proctor Test Validation — BS 1377 Part 4',
    _calcSelect('proc-method', 'طريقة الاختبار', [['standard','Standard Proctor (2.5kg)'],['modified','Modified Proctor (4.5kg)']]) +
    _calcField('proc-mdd', 'MDD', 'e.g. 1.95', 'g/cm³') +
    _calcField('proc-omc', 'OMC', 'e.g. 12', '%') +
    _calcField('proc-gs', 'Gs (اختياري)', 'e.g. 2.65', '') +
    _calcBtn('calcProctorValid()', 'تحقق من النتائج') + _calcResult('proc-result'));

  sections += _section('sieve-g', '🔬 Sieve Analysis — QCS S6',
    _calcSelect('sieve-mat', 'نوع المادة', [['subbase','Subbase'],['base','Base Course'],['fill','General Fill'],['sand_bed','Pipe Bedding Sand']]) +
    _calcField('sieve-75', 'Passing 75mm', 'e.g. 100', '%') +
    _calcField('sieve-475', 'Passing 4.75mm', 'e.g. 45', '%') +
    _calcField('sieve-0075', 'Passing 0.075mm', 'e.g. 8', '%') +
    _calcBtn('calcSieveAnalysis()', 'تحقق من التدرج') + _calcResult('sieve-result'));

  sections += _section('uscs-g', '🏷️ USCS Classification — ASTM D2487',
    _calcField('uscs-p200', 'Passing #200 (0.075mm)', 'e.g. 25', '%') +
    _calcField('uscs-p4', 'Passing #4 (4.75mm)', 'e.g. 65', '%') +
    _calcField('uscs-ll', 'Liquid Limit LL', 'e.g. 35', '%') +
    _calcField('uscs-pl', 'Plastic Limit PL', 'e.g. 22', '%') +
    _calcBtn('calcUSCS()', 'صنّف التربة') + _calcResult('uscs-result'));

  sections += _section('settl-g', '📉 Settlement Estimate — Terzaghi',
    _calcField('settl-h', 'سماكة الطبقة القابلة للضغط H', 'e.g. 5', 'm') +
    _calcField('settl-cc', 'Compression Index Cc', 'e.g. 0.3', '') +
    _calcField('settl-e0', 'Initial Void Ratio e₀', 'e.g. 0.8', '') +
    _calcField('settl-p0', 'Effective Overburden σ₀', 'e.g. 80', 'kPa') +
    _calcField('settl-dp', 'Applied Stress Δσ', 'e.g. 50', 'kPa') +
    _calcBtn('calcSettlement()', 'احسب الهبوط') + _calcResult('settl-result'));

  sections += _section('perm-g', '💧 Permeability Check — BS 1377 Part 5',
    _calcSelect('perm-use', 'الاستخدام', [['general_fill','General Fill (≤1×10⁻⁵)'],['drainage','Drainage (≥1×10⁻⁴)'],['pond_liner','Pond Liner (≤1×10⁻⁸)'],['landfill_liner','Landfill Liner (≤1×10⁻⁹)']]) +
    _calcField('perm-k', 'k (m/s) — أدخل رقم عشري', 'e.g. 0.00001', 'm/s') +
    _calcBtn('calcPermeability()', 'تحقق') + _calcResult('perm-result'));

  sections += _section('plt-g', '🔩 Plate Load Test — DIN 18134 + QCS S6',
    _calcSelect('plt-layer', 'الطبقة', [['subgrade','Subgrade (≥30 MN/m³)'],['subbase','Subbase (≥80 MN/m³)'],['base','Base Course (≥120 MN/m³)']]) +
    _calcField('plt-load', 'الحمل المطبق', 'e.g. 200', 'kN') +
    _calcField('plt-defl', 'الانحراف δ', 'e.g. 1.5', 'mm') +
    _calcField('plt-dia', 'قطر الصفيحة', 'e.g. 300', 'mm') +
    _calcBtn('calcPlateLoadGeo()', 'احسب k-value') + _calcResult('plt-result'));

  var temp = document.createElement('div');
  temp.innerHTML = sections;
  temp.querySelectorAll('.calc-section').forEach(function(s) {
    s.style.display = 'none';
    el.appendChild(s);
  });
};

})();
