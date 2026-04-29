// ═══════════════════════════════════════════════════════════════════════
// QatarSpec Pro — General Calculators (4) + Master Init Hook
// حاسبات عامة + ربط جميع الحاسبات الجديدة مع النظام
// ═══════════════════════════════════════════════════════════════════════
(function() {
'use strict';

// ── 1. Unit Converter (Engineering Units — Qatar) ───────────────────
// محوّل الوحدات الهندسية
window.calcUnitConvert = function() {
  var val = parseFloat(document.getElementById('uc-val').value);
  var fromUnit = document.getElementById('uc-from').value;
  var toUnit = document.getElementById('uc-to').value;
  if (isNaN(val)) return showToast('❌ أدخل القيمة');

  // قاعدة التحويل: كل شيء إلى وحدة أساسية ثم إلى الهدف
  var toBase = {
    // Length
    mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.34,
    // Area
    m2: 1, ft2: 0.0929, acre: 4046.86, hectare: 10000, km2: 1e6,
    // Volume
    m3: 1, L: 0.001, gallon_us: 0.003785, gallon_uk: 0.004546, ft3: 0.02832, barrel: 0.1590,
    // Mass
    kg: 1, g: 0.001, ton: 1000, lb: 0.4536, ton_us: 907.185,
    // Pressure
    MPa: 1, kPa: 0.001, psi: 0.006895, bar: 0.1, kgcm2: 0.09807, atm: 0.10133,
    // Temperature — خاص
    C: 'temp', F: 'temp', K: 'temp'
  };

  var result;
  // تحويل الحرارة — حالة خاصة
  if (fromUnit === 'C' || fromUnit === 'F' || fromUnit === 'K') {
    var celsius;
    if (fromUnit === 'C') celsius = val;
    else if (fromUnit === 'F') celsius = (val - 32) * 5 / 9;
    else celsius = val - 273.15;

    if (toUnit === 'C') result = celsius;
    else if (toUnit === 'F') result = celsius * 9 / 5 + 32;
    else if (toUnit === 'K') result = celsius + 273.15;
    else return showToast('❌ تحويل غير متوافق');
  } else {
    var baseFrom = toBase[fromUnit];
    var baseTo = toBase[toUnit];
    if (!baseFrom || !baseTo || baseFrom === 'temp' || baseTo === 'temp') return showToast('❌ تحويل غير متوافق');
    result = val * baseFrom / baseTo;
  }

  var detail = val + ' ' + fromUnit + ' = ' + result.toPrecision(6) + ' ' + toUnit;
  var el = document.getElementById('uc-result');
  if (el) {
    el.style.display = 'block';
    el.className = 'calc-result pass';
    el.innerHTML = '<div style="font-size:16px;font-weight:800;color:#2ecc71;text-align:center;padding:10px;">' +
      val + ' <span style="color:var(--gold)">' + fromUnit + '</span> = ' +
      '<span style="font-size:20px;">' + result.toPrecision(6) + '</span> <span style="color:var(--gold)">' + toUnit + '</span></div>';
    _addCopyBtn('uc-result', val + ' ' + fromUnit + ' = ' + result.toPrecision(6) + ' ' + toUnit);
  }
};

// ── 2. Temperature Correction for Testing ───────────────────────────
// تصحيح الحرارة للاختبارات الحقلية — مهم في قطر
window.calcTempCorrection = function() {
  var testType = document.getElementById('tc-type').value;
  var measured = parseFloat(document.getElementById('tc-measured').value);
  var fieldTemp = parseFloat(document.getElementById('tc-fieldtemp').value);
  var refTemp = parseFloat(document.getElementById('tc-reftemp').value) || 25;
  if (isNaN(measured) || isNaN(fieldTemp)) return showToast('❌ أدخل القيمة ودرجة الحرارة');

  var corrected, detail;
  switch (testType) {
    case 'bitumen_pen':
      // Penetration correction: ~2% per °C from 25°C
      var factor = 1 + 0.02 * (refTemp - fieldTemp);
      corrected = (measured * factor).toFixed(1);
      detail = 'Pen@' + fieldTemp + '°C: ' + measured + ' | مصحح @' + refTemp + '°C: ' + corrected +
        '\nFactor: ' + factor.toFixed(3) + ' (≈2%/°C)';
      break;
    case 'marshall_stab':
      // Marshall stability correction to 60°C specimen temp
      var tempDiff = fieldTemp - 60;
      var stabFactor = 1 + 0.01 * tempDiff;
      corrected = (measured * stabFactor).toFixed(2);
      detail = 'Stability@' + fieldTemp + '°C: ' + measured + 'kN | مصحح @60°C: ' + corrected + 'kN';
      break;
    case 'concrete_temp':
      // لا تصحيح — فقط تقييم
      corrected = measured;
      var maxAllowed = 35;
      detail = 'حرارة الخرسانة: ' + measured + '°C | الحد: ≤' + maxAllowed + '°C' +
        '\nالمحيط: ' + fieldTemp + '°C' +
        (fieldTemp > 40 ? '\n⚠️ حرارة محيط عالية — استخدم ثلج وصب ليلاً' : '');
      break;
    case 'density':
      // Nuclear density gauge temp correction (minor)
      var densFactor = 1 + 0.0001 * (refTemp - fieldTemp);
      corrected = (measured * densFactor).toFixed(4);
      detail = 'Density@' + fieldTemp + '°C: ' + measured + ' | مصحح @' + refTemp + '°C: ' + corrected + ' g/cm³';
      break;
    default:
      corrected = measured;
      detail = 'لا يوجد تصحيح محدد لهذا الاختبار';
  }

  detail += '\n📖 QCS 2024 + ASTM Standards — Temperature Corrections';

  showResult('tc-result', true, corrected, null, detail, '');
  _addCopyBtn('tc-result', 'Corrected: ' + corrected + ' (from ' + measured + ' @' + fieldTemp + '°C)');
};

// ── 3. Material Waste Calculator ────────────────────────────────────
// حاسبة هدر المواد — تقدير عملي لمشاريع قطر
window.calcWasteCalc = function() {
  var material = document.getElementById('waste-mat').value;
  var qty = parseFloat(document.getElementById('waste-qty').value);
  if (isNaN(qty) || qty <= 0) return showToast('❌ أدخل الكمية');

  var wasteFactors = {
    concrete: { pct: 5, unit: 'm³', name: 'خرسانة', ref: 'QCS 2024 S5' },
    rebar: { pct: 3, unit: 'ton', name: 'حديد تسليح', ref: 'QCS 2024 S5' },
    asphalt: { pct: 5, unit: 'ton', name: 'إسفلت', ref: 'QCS 2024 S8' },
    blocks: { pct: 8, unit: 'block', name: 'بلوك', ref: 'QCS 2024 S5' },
    tiles: { pct: 10, unit: 'm²', name: 'بلاط', ref: 'QCS 2024' },
    pipes: { pct: 3, unit: 'LM', name: 'مواسير', ref: 'QCS 2024 S9/S10' },
    sand: { pct: 7, unit: 'm³', name: 'رمل', ref: 'QCS 2024 S6' },
    aggregate: { pct: 5, unit: 'm³', name: 'ركام', ref: 'QCS 2024 S6' },
    paint: { pct: 10, unit: 'L', name: 'دهان', ref: 'QCS 2024' },
    formwork: { pct: 15, unit: 'm²', name: 'قوالب خشبية', ref: 'QCS 2024 S5' }
  };

  var w = wasteFactors[material] || { pct: 5, unit: '', name: material, ref: '' };
  var waste = (qty * w.pct / 100);
  var total = qty + waste;

  var detail = 'المادة: ' + w.name + ' | الكمية الصافية: ' + qty + ' ' + w.unit +
    '\nnسبة الهدر: ' + w.pct + '% | كمية الهدر: ' + waste.toFixed(2) + ' ' + w.unit +
    '\nالكمية الإجمالية للطلب: ' + total.toFixed(2) + ' ' + w.unit +
    '\n💡 النسب مبنية على متوسطات مشاريع قطر' +
    '\n📖 ' + w.ref;

  var el = document.getElementById('waste-result');
  if (el) {
    el.style.display = 'block';
    el.className = 'calc-result pass';
    el.innerHTML = '<div class="calc-result-header"><span class="calc-result-icon">📦</span><span class="calc-result-text">حساب الكميات مع الهدر</span></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0;">' +
      '<div style="text-align:center;background:var(--dark4);border-radius:8px;padding:8px;">' +
      '<div style="font-size:10px;color:var(--text3);">صافي</div>' +
      '<div style="font-size:16px;font-weight:700;color:var(--text);">' + qty + '</div>' +
      '<div style="font-size:10px;color:var(--text3);">' + w.unit + '</div></div>' +
      '<div style="text-align:center;background:rgba(231,76,60,0.08);border-radius:8px;padding:8px;">' +
      '<div style="font-size:10px;color:var(--text3);">هدر (' + w.pct + '%)</div>' +
      '<div style="font-size:16px;font-weight:700;color:#e74c3c;">+' + waste.toFixed(1) + '</div>' +
      '<div style="font-size:10px;color:var(--text3);">' + w.unit + '</div></div>' +
      '<div style="text-align:center;background:rgba(46,204,113,0.08);border-radius:8px;padding:8px;">' +
      '<div style="font-size:10px;color:var(--text3);">إجمالي الطلب</div>' +
      '<div style="font-size:16px;font-weight:700;color:#2ecc71;">' + total.toFixed(1) + '</div>' +
      '<div style="font-size:10px;color:var(--text3);">' + w.unit + '</div></div></div>' +
      '<div class="calc-result-detail">' + detail + '</div>';
    _addCopyBtn('waste-result', w.name + ': صافي ' + qty + ' + هدر ' + waste.toFixed(1) + ' = ' + total.toFixed(1) + ' ' + w.unit);
  }
};

// ── 4. Concrete Volume Calculator ───────────────────────────────────
// حاسبة حجم الخرسانة — عناصر شائعة
window.calcConcreteVolume = function() {
  var element = document.getElementById('cv-element').value;
  var dim1 = parseFloat(document.getElementById('cv-dim1').value);
  var dim2 = parseFloat(document.getElementById('cv-dim2').value);
  var dim3 = parseFloat(document.getElementById('cv-dim3').value);
  var qty = parseInt(document.getElementById('cv-qty').value) || 1;

  if (isNaN(dim1) || isNaN(dim2)) return showToast('❌ أدخل الأبعاد');

  var volume, label;
  switch (element) {
    case 'slab':
      volume = dim1 * dim2 * (dim3 || 0.2); // L × W × thickness
      label = 'بلاطة ' + dim1 + '×' + dim2 + '×' + (dim3 || 0.2) + 'm';
      break;
    case 'beam':
      volume = dim1 * dim2 * (dim3 || 0.5); // W × H × L
      label = 'كمرة ' + dim1 + '×' + dim2 + '×' + (dim3 || 0.5) + 'm';
      break;
    case 'column':
      volume = dim1 * dim2 * (dim3 || 3.0); // W × D × H
      label = 'عمود ' + dim1 + '×' + dim2 + '×' + (dim3 || 3.0) + 'm';
      break;
    case 'footing':
      volume = dim1 * dim2 * (dim3 || 0.5);
      label = 'أساس ' + dim1 + '×' + dim2 + '×' + (dim3 || 0.5) + 'm';
      break;
    case 'wall':
      volume = dim1 * (dim3 || 3.0) * dim2; // L × H × thickness
      label = 'جدار ' + dim1 + '×' + (dim3 || 3.0) + '×' + dim2 + 'm';
      break;
    case 'circular':
      // dim1 = diameter, dim2 = height
      volume = Math.PI * Math.pow(dim1 / 2, 2) * dim2;
      label = 'عنصر دائري ⌀' + dim1 + '×' + dim2 + 'm';
      break;
    default:
      volume = dim1 * dim2 * (dim3 || 1);
      label = dim1 + '×' + dim2 + '×' + (dim3 || 1) + 'm';
  }

  var singleVol = volume;
  var totalVol = volume * qty;
  var totalWithWaste = totalVol * 1.05; // 5% waste

  var detail = 'العنصر: ' + label + (qty > 1 ? ' × ' + qty + ' = ' + totalVol.toFixed(2) + ' m³' : '') +
    '\nالحجم (صافي): ' + totalVol.toFixed(2) + ' m³' +
    '\nالحجم (+ 5% هدر): ' + totalWithWaste.toFixed(2) + ' m³' +
    '\nعدد الشاحنات (9m³): ~' + Math.ceil(totalWithWaste / 9) +
    '\n📖 QCS 2024 S5';

  var el = document.getElementById('cv-result');
  if (el) {
    el.style.display = 'block';
    el.className = 'calc-result pass';
    el.innerHTML = '<div class="calc-result-header"><span class="calc-result-icon">🧱</span><span class="calc-result-text">حجم الخرسانة</span></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">' +
      '<div style="text-align:center;background:var(--dark4);border-radius:8px;padding:10px;">' +
      '<div style="font-size:10px;color:var(--text3);">الحجم الصافي</div>' +
      '<div style="font-size:20px;font-weight:800;color:var(--gold);">' + totalVol.toFixed(2) + '</div>' +
      '<div style="font-size:10px;color:var(--text3);">m³</div></div>' +
      '<div style="text-align:center;background:rgba(46,204,113,0.08);border-radius:8px;padding:10px;">' +
      '<div style="font-size:10px;color:var(--text3);">مع الهدر (5%)</div>' +
      '<div style="font-size:20px;font-weight:800;color:#2ecc71;">' + totalWithWaste.toFixed(2) + '</div>' +
      '<div style="font-size:10px;color:var(--text3);">m³ | ~' + Math.ceil(totalWithWaste / 9) + ' شاحنة</div></div></div>' +
      '<div class="calc-result-detail">' + detail + '</div>';
    _addCopyBtn('cv-result', label + ': ' + totalWithWaste.toFixed(2) + ' m³ (incl. 5% waste)');
  }
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

// ── تسجيل الحاسبات العامة (تُضاف كتبويب خامس) ─────────────────────
window._extGeneralCalcs = function() {
  // إضافة تبويب "General" إلى الأزرار الرئيسية إن لم يوجد
  var mainTabsContainer = document.querySelector('#calc-pass-panel > div:first-child') ||
    (function() {
      var btns = document.querySelectorAll('[onclick*="switchMainCat"]');
      return btns.length ? btns[0].parentElement : null;
    })();

  if (mainTabsContainer && !document.getElementById('main-tab-general')) {
    var genBtn = document.createElement('button');
    genBtn.id = 'main-tab-general';
    genBtn.onclick = function() { switchMainCat('general', this); };
    genBtn.style.cssText = 'flex:none;padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--dark4);color:var(--text2);font-family:Tajawal,sans-serif;font-size:12px;cursor:pointer;white-space:nowrap;';
    genBtn.textContent = '🔧 General';
    mainTabsContainer.appendChild(genBtn);
  }

  // إنشاء حاوية General إن لم توجد
  if (!document.getElementById('cat-general')) {
    var passPanel = document.getElementById('calc-pass-panel');
    if (passPanel) {
      var genDiv = document.createElement('div');
      genDiv.id = 'cat-general';
      genDiv.style.display = 'none';
      passPanel.appendChild(genDiv);
    }
  }

  // تحديث switchMainCat لدعم general
  var _origSwitch = window.switchMainCat;
  window.switchMainCat = function(cat, btn) {
    // تشغيل الأصلي أولاً
    _origSwitch && _origSwitch(cat, btn);
    // التعامل مع general
    var genEl = document.getElementById('cat-general');
    var genTab = document.getElementById('main-tab-general');
    if (genEl) genEl.style.display = cat === 'general' ? 'block' : 'none';
    if (genTab) {
      if (cat === 'general') {
        genTab.style.background = 'rgba(201,168,76,0.15)';
        genTab.style.borderColor = 'rgba(201,168,76,0.3)';
        genTab.style.color = 'var(--gold2)';
        genTab.style.fontWeight = '700';
      } else {
        genTab.style.background = 'var(--dark4)';
        genTab.style.borderColor = 'var(--border)';
        genTab.style.color = 'var(--text2)';
        genTab.style.fontWeight = '400';
      }
    }
  };

  var el = document.getElementById('cat-general');
  if (!el || el.dataset.built) return;
  el.dataset.built = '1';

  // بناء الحاسبات العامة
  var selectOpts = function(arr) { return arr; };

  el.innerHTML =
    _tabs('general', [['uc-gen','🔄 Unit Convert'],['tc-gen','🌡️ Temp Correct'],['waste-gen','📦 Waste Calc'],['cv-gen','🧱 Concrete Vol']]) +

    _section('uc-gen', '🔄 Unit Converter — محوّل الوحدات',
      '<div class="calc-row"><span class="calc-label">الفئة</span>' +
      '<select class="calc-select" id="uc-cat" onchange="window._updateUnitOpts()">' +
      '<option value="length">الطول</option><option value="area">المساحة</option>' +
      '<option value="volume">الحجم</option><option value="mass">الكتلة</option>' +
      '<option value="pressure">الضغط</option><option value="temp">الحرارة</option></select></div>' +
      _calcField('uc-val', 'القيمة', 'e.g. 100', '') +
      '<div class="calc-row"><span class="calc-label">من</span><select class="calc-select" id="uc-from"></select></div>' +
      '<div class="calc-row"><span class="calc-label">إلى</span><select class="calc-select" id="uc-to"></select></div>' +
      _calcBtn('calcUnitConvert()', 'حوّل 🔄') + _calcResult('uc-result')) +

    _section('tc-gen', '🌡️ Temperature Correction — تصحيح الحرارة',
      _calcSelect('tc-type', 'نوع الاختبار', [['bitumen_pen','Bitumen Penetration'],['marshall_stab','Marshall Stability'],['concrete_temp','Concrete Temperature'],['density','Nuclear Density']]) +
      _calcField('tc-measured', 'القيمة المقاسة', 'e.g. 65', '') +
      _calcField('tc-fieldtemp', 'درجة حرارة الحقل', 'e.g. 42', '°C') +
      _calcField('tc-reftemp', 'درجة الحرارة المرجعية', 'e.g. 25', '°C') +
      _calcBtn('calcTempCorrection()', 'صحّح القيمة') + _calcResult('tc-result')) +

    _section('waste-gen', '📦 Material Waste — حاسبة الهدر',
      _calcSelect('waste-mat', 'نوع المادة', [['concrete','خرسانة (5%)'],['rebar','حديد (3%)'],['asphalt','إسفلت (5%)'],['blocks','بلوك (8%)'],['tiles','بلاط (10%)'],['pipes','مواسير (3%)'],['sand','رمل (7%)'],['aggregate','ركام (5%)'],['paint','دهان (10%)'],['formwork','قوالب (15%)']]) +
      _calcField('waste-qty', 'الكمية الصافية', 'e.g. 500', '') +
      _calcBtn('calcWasteCalc()', 'احسب مع الهدر 📦') + _calcResult('waste-result')) +

    _section('cv-gen', '🧱 Concrete Volume — حجم الخرسانة',
      _calcSelect('cv-element', 'نوع العنصر', [['slab','بلاطة (L×W×t)'],['beam','كمرة (W×H×L)'],['column','عمود (W×D×H)'],['footing','أساس (L×W×t)'],['wall','جدار (L×t×H)'],['circular','دائري (⌀×H)']]) +
      _calcField('cv-dim1', 'البعد 1', 'e.g. 6', 'm') +
      _calcField('cv-dim2', 'البعد 2', 'e.g. 4', 'm') +
      _calcField('cv-dim3', 'البعد 3 (اختياري)', 'e.g. 0.2', 'm') +
      _calcField('cv-qty', 'العدد', 'e.g. 10', '') +
      _calcBtn('calcConcreteVolume()', 'احسب الحجم 🧱') + _calcResult('cv-result'));

  // إخفاء الأقسام ما عدا الأول
  el.querySelectorAll('.calc-section').forEach(function(s, i) {
    s.style.display = i === 0 ? 'block' : 'none';
  });

  // تعبئة خيارات محوّل الوحدات
  window._updateUnitOpts();
};

// خيارات الوحدات حسب الفئة
window._updateUnitOpts = function() {
  var cat = document.getElementById('uc-cat');
  if (!cat) return;
  var fromSel = document.getElementById('uc-from');
  var toSel = document.getElementById('uc-to');
  if (!fromSel || !toSel) return;

  var opts = {
    length: [['mm','mm'],['cm','cm'],['m','m'],['km','km'],['inch','inch'],['ft','ft'],['yard','yard']],
    area: [['m2','m²'],['ft2','ft²'],['acre','acre'],['hectare','hectare']],
    volume: [['m3','m³'],['L','L'],['gallon_us','US Gal'],['gallon_uk','UK Gal'],['ft3','ft³'],['barrel','barrel']],
    mass: [['kg','kg'],['g','g'],['ton','ton (metric)'],['lb','lb'],['ton_us','US ton']],
    pressure: [['MPa','MPa'],['kPa','kPa'],['psi','psi'],['bar','bar'],['kgcm2','kg/cm²'],['atm','atm']],
    temp: [['C','°C'],['F','°F'],['K','K']]
  };

  var selected = opts[cat.value] || opts.length;
  fromSel.innerHTML = selected.map(function(o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('');
  toSel.innerHTML = selected.map(function(o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('');
  if (toSel.options.length > 1) toSel.selectedIndex = 1;
};

// ═══════════════════════════════════════════════════════════════════════
// MASTER INIT — ربط جميع الحاسبات الجديدة مع initCalcPanels
// ═══════════════════════════════════════════════════════════════════════
var _origInitCalcPanels = window.initCalcPanels;
window.initCalcPanels = function() {
  // تشغيل الأصلي أولاً
  if (_origInitCalcPanels) _origInitCalcPanels();

  // تمديد كل فئة بالحاسبات الجديدة
  if (window._extRoadsCalcs) window._extRoadsCalcs();
  if (window._extStructuralCalcs) window._extStructuralCalcs();
  if (window._extUtilitiesCalcs) window._extUtilitiesCalcs();
  if (window._extGeotechCalcs) window._extGeotechCalcs();
  if (window._extGeneralCalcs) window._extGeneralCalcs();
};

// تسجيل الدوال الجديدة في QS namespace
var _addToQS = function() {
  var newFns = [
    'calcPavementThickness','calcMarshallV2','calcCoreDensityV2','calcIRIV2',
    'calcCrossfallV2','calcStraightedgeV2','calcSkidV2','calcBitumenV2',
    'calcPrimeCoatV2','calcTackCoatV2','calcSandPatchV2','calcDeflectionV2',
    'calcLapLengthV2','calcDevLengthV2','calcCementContentV2','calcChlorideCheckV2',
    'calcReboundHammerV2','calcUPVV2','calcCuringCheckV2','calcFormworkStrikeV2',
    'calcConcreteTempV2','calcCarbonationV2','calcPullOutV2',
    'calcChlorinationV2','calcWaterQualityV2','calcCCTVGradeV2','calcManholeWTV2','calcSewerGradientV2',
    'calcProctorValid','calcSieveAnalysis','calcUSCS','calcSettlement','calcPermeability','calcPlateLoadGeo',
    'calcUnitConvert','calcTempCorrection','calcWasteCalc','calcConcreteVolume'
  ];
  if (window.QS) {
    newFns.forEach(function(name) {
      if (typeof window[name] === 'function') {
        window.QS[name] = window[name];
      }
    });
  }
};

// تشغيل عند جاهزية الصفحة
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  _addToQS();
} else {
  document.addEventListener('DOMContentLoaded', _addToQS);
}

})();
