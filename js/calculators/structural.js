// ═══════════════════════════════════════════════════════════════════════
// QatarSpec Pro — Structural Calculators (11)
// المرجع: QCS 2024 Section 5 (Concrete & Reinforcement)
// ═══════════════════════════════════════════════════════════════════════
(function() {
'use strict';

// ── 1. Lap Length Calculator ────────────────────────────────────────
// حاسبة طول الوصلة — QCS 2024 S5 + BS 8666
window.calcLapLengthV2 = function() {
  var dia = parseFloat(document.getElementById('lap2-dia').value);
  var grade = document.getElementById('lap2-grade').value;
  var tension = document.getElementById('lap2-tension').value === 'yes';
  var fcu = parseFloat(document.getElementById('lap2-fcu').value) || 30;
  if (isNaN(dia) || dia <= 0) return showToast('❌ أدخل قطر السيخ');

  // حساب طول الوصلة
  var fy = grade === 'B500B' ? 500 : 460;
  // lb = (fy × dia) / (4 × fbu) حيث fbu ≈ 0.5 × √fcu × β
  var beta = tension ? 0.50 : 0.63; // فاكتور التوتر
  var fbu = beta * Math.sqrt(fcu);
  var lb = Math.ceil((fy * dia) / (4 * fbu));
  // طول الوصلة = 1.4 × lb (للوصلات القريبة)
  var lapLength = Math.ceil(lb * 1.4);
  // الحد الأدنى = 15φ أو 300mm أيهما أكبر
  var minLap = Math.max(15 * dia, 300);
  lapLength = Math.max(lapLength, minLap);

  var detail = 'قطر السيخ: ⌀' + dia + 'mm | فولاذ: ' + grade + ' (fy=' + fy + ' MPa) | fcu=' + fcu + ' MPa' +
    '\nطول الربط (lb): ' + lb + 'mm | طول الوصلة: ' + lapLength + 'mm' +
    '\nنوع الإجهاد: ' + (tension ? 'Tension' : 'Compression') + ' | Min: ' + minLap + 'mm' +
    '\n📖 QCS 2024 S5 + BS 8666 + EC2';
  showResult('lap2-result', true, lapLength, null, detail, '');
  _addCopyBtn('lap2-result', 'Lap ⌀' + dia + '=' + lapLength + 'mm (' + grade + ', fcu=' + fcu + ')');
};

// ── 2. Development Length ───────────────────────────────────────────
// طول التثبيت — QCS 2024 S5
window.calcDevLengthV2 = function() {
  var dia = parseFloat(document.getElementById('dev2-dia').value);
  var fcu = parseFloat(document.getElementById('dev2-fcu').value) || 30;
  var hook = document.getElementById('dev2-hook').value === 'yes';
  if (isNaN(dia) || dia <= 0) return showToast('❌ أدخل قطر السيخ');

  var fy = 500; // B500B
  var fbu = 0.50 * Math.sqrt(fcu);
  var ld = Math.ceil((fy * dia) / (4 * fbu));
  if (hook) ld = Math.ceil(ld * 0.7); // تخفيض 30% مع hook
  var minLd = Math.max(12 * dia, 250);
  ld = Math.max(ld, minLd);

  var detail = 'قطر السيخ: ⌀' + dia + 'mm | fcu=' + fcu + ' MPa | Hook: ' + (hook ? 'نعم (-30%)' : 'لا') +
    '\nطول التثبيت (ld): ' + ld + 'mm | Min: ' + minLd + 'mm' +
    '\n📖 QCS 2024 S5 — Anchorage Length';
  showResult('dev2-result', true, ld, null, detail, '');
  _addCopyBtn('dev2-result', 'Development ⌀' + dia + '=' + ld + 'mm');
};

// ── 3. Minimum Cement Content ───────────────────────────────────────
// الحد الأدنى لمحتوى الأسمنت — QCS 2024 S5
window.calcCementContentV2 = function() {
  var cement = parseFloat(document.getElementById('cc2-cement').value);
  var env = document.getElementById('cc2-env').value;
  if (isNaN(cement)) return showToast('❌ أدخل كمية الأسمنت');

  var reqs = {
    mild: { min: 300, name: 'Mild (داخلي)' },
    moderate: { min: 320, name: 'Moderate (خارجي)' },
    severe: { min: 360, name: 'Severe (كيميائي)' },
    marine: { min: 380, name: 'Marine (بحري)' },
    extreme: { min: 400, name: 'Extreme (قطر — sabkha)' }
  };
  var r = reqs[env] || reqs.moderate;
  var pass = cement >= r.min;
  var detail = 'محتوى الأسمنت: ' + cement + ' kg/m³ | المطلوب: ≥' + r.min + ' kg/m³ (' + r.name + ')' +
    '\n⚠️ الحد الأقصى: 450 kg/m³ (لمنع الانكماش الحراري)' +
    '\n📖 QCS 2024 S5 Table 5.2.1 — Durability Requirements';
  var tooHigh = cement > 450;
  if (tooHigh) {
    detail += '\n❌ تجاوز الحد الأقصى 450 kg/m³!';
    pass = false;
  }
  showResult('cc2-result', pass, cement, r.min, detail, tooHigh ? 'تقليل الأسمنت + استخدام إضافات معدنية (PFA/GGBS)' : 'زيادة محتوى الأسمنت لتحقيق الحد الأدنى');
  _addCopyBtn('cc2-result', 'Cement=' + cement + 'kg/m³ (Req≥' + r.min + ')');
};

// ── 4. Chloride Content in Concrete ─────────────────────────────────
// محتوى الكلورايد — QCS 2024 S5
window.calcChlorideCheckV2 = function() {
  var cl = parseFloat(document.getElementById('chl2-val').value);
  var type = document.getElementById('chl2-type').value;
  if (isNaN(cl)) return showToast('❌ أدخل نسبة الكلورايد');

  var reqs = {
    reinforced: { max: 0.20, name: 'Reinforced Concrete' },
    prestressed: { max: 0.10, name: 'Prestressed Concrete' },
    plain: { max: 0.40, name: 'Plain Concrete' }
  };
  var r = reqs[type] || reqs.reinforced;
  var pass = cl <= r.max;
  var detail = 'Cl⁻ Content: ' + cl + '% by weight of cement | الحد: ≤' + r.max + '% (' + r.name + ')' +
    '\n📖 QCS 2024 S5 Table 5.2.2 — Chloride Limits';
  showResult('chl2-result', pass, cl, r.max, detail, 'تغيير مصدر الركام + اختبار الكلورايد قبل الاستخدام');
  _addCopyBtn('chl2-result', 'Chloride=' + cl + '% (Max ' + r.max + '%)');
};

// ── 5. Rebound Hammer (Schmidt) ─────────────────────────────────────
// مطرقة الارتداد — QCS 2024 S5
window.calcReboundHammerV2 = function() {
  var rn = parseFloat(document.getElementById('rh2-val').value);
  var angle = document.getElementById('rh2-angle').value;
  if (isNaN(rn)) return showToast('❌ أدخل قراءة الارتداد');

  // تصحيح الزاوية
  var correction = { horizontal: 0, up45: -2.5, up90: -3.2, down45: 2.5, down90: 3.2 };
  var corrected = rn + (correction[angle] || 0);

  // تقدير المقاومة (تقريبي — يحتاج calibration curve)
  // العلاقة التقريبية: fcu ≈ (R × 1.2) - 11
  var estimatedFcu = Math.round(corrected * 1.2 - 11);
  if (estimatedFcu < 5) estimatedFcu = 5;

  var rating = corrected >= 40 ? 'جيد جداً' : corrected >= 30 ? 'جيد' : corrected >= 20 ? 'متوسط — تحقق بالـ Core' : 'ضعيف — Core Test إلزامي';
  var pass = corrected >= 25;
  var detail = 'قراءة الارتداد: ' + rn + ' | بعد التصحيح (' + angle + '): ' + corrected.toFixed(1) +
    '\nتقدير fcu: ≈' + estimatedFcu + ' MPa (⚠️ تقريبي — يحتاج calibration)' +
    '\nالتقييم: ' + rating +
    '\n📖 QCS 2024 S5 — Non-destructive Testing (BS EN 12504-2)';
  showResult('rh2-result', pass, corrected.toFixed(1), 25, detail, 'إجراء Core Test للتأكد — الارتداد ليس كافياً وحده');
  _addCopyBtn('rh2-result', 'Rebound=' + corrected.toFixed(1) + ' → fcu≈' + estimatedFcu + 'MPa');
};

// ── 6. UPV (Ultrasonic Pulse Velocity) ──────────────────────────────
// سرعة النبض فوق الصوتية — QCS 2024 S5
window.calcUPVV2 = function() {
  var velocity = parseFloat(document.getElementById('upv2-vel').value);
  if (isNaN(velocity)) return showToast('❌ أدخل سرعة النبض');

  var rating, pass;
  if (velocity >= 4.5) { rating = 'ممتاز — Excellent'; pass = true; }
  else if (velocity >= 3.5) { rating = 'جيد — Good'; pass = true; }
  else if (velocity >= 3.0) { rating = 'مشكوك — Doubtful (تحقق بالـ Core)'; pass = false; }
  else { rating = 'ضعيف جداً — Poor (Core + Investigation)'; pass = false; }

  var detail = 'UPV: ' + velocity + ' km/s | التقييم: ' + rating +
    '\n>4.5 = ممتاز | 3.5-4.5 = جيد | 3.0-3.5 = مشكوك | <3.0 = ضعيف' +
    '\n📖 QCS 2024 S5 — UPV (BS EN 12504-4)';
  showResult('upv2-result', pass, velocity, 3.5, detail, 'Core drilling + تقييم هيكلي');
  _addCopyBtn('upv2-result', 'UPV=' + velocity + 'km/s (' + rating + ')');
};

// ── 7. Curing Period Check ──────────────────────────────────────────
// فترة المعالجة — QCS 2024 S5
window.calcCuringCheckV2 = function() {
  var days = parseFloat(document.getElementById('cur2-days').value);
  var env = document.getElementById('cur2-env').value;
  var temp = parseFloat(document.getElementById('cur2-temp').value);
  if (isNaN(days)) return showToast('❌ أدخل عدد أيام المعالجة');

  // متطلبات المعالجة حسب QCS
  var reqs = {
    opc: { min: 7, name: 'OPC / CEM I' },
    blended: { min: 10, name: 'Blended Cement (PFA/GGBS)' },
    marine: { min: 14, name: 'Marine / Severe Exposure' }
  };
  var r = reqs[env] || reqs.opc;

  // تحذير الحرارة — قطر ممكن تتجاوز 40°C
  var tempWarn = '';
  if (!isNaN(temp) && temp > 35) {
    r.min = Math.ceil(r.min * 1.3); // زيادة 30%
    tempWarn = '\n⚠️ درجة الحرارة ' + temp + '°C > 35°C — المعالجة تُمدد 30%';
  }

  var pass = days >= r.min;
  var detail = 'أيام المعالجة: ' + days + ' | المطلوب: ≥' + r.min + ' يوم (' + r.name + ')' + tempWarn +
    '\n📖 QCS 2024 S5 P4 — Curing Requirements';
  showResult('cur2-result', pass, days, r.min, detail, 'استمرار المعالجة بالماء أو الأغطية حتى اكتمال المدة');
  _addCopyBtn('cur2-result', 'Curing=' + days + 'd (Req≥' + r.min + 'd)');
};

// ── 8. Formwork Striking Time ───────────────────────────────────────
// وقت فك القوالب — QCS 2024 S5
window.calcFormworkStrikeV2 = function() {
  var element = document.getElementById('fw2-element').value;
  var fcu = parseFloat(document.getElementById('fw2-fcu').value) || 30;
  var temp = parseFloat(document.getElementById('fw2-temp').value);
  if (!element) return showToast('❌ اختر نوع العنصر');

  // الحد الأدنى لفك القوالب (أيام) — QCS Table 5.4
  var minDays = {
    sides_beam: 1, sides_column: 1, sides_wall: 1,
    soffit_slab: 10, soffit_beam: 14,
    props_slab: 14, props_beam: 21
  };
  var names = {
    sides_beam: 'جوانب الكمرة', sides_column: 'جوانب العمود', sides_wall: 'جوانب الجدار',
    soffit_slab: 'بطن البلاطة', soffit_beam: 'بطن الكمرة',
    props_slab: 'دعائم البلاطة', props_beam: 'دعائم الكمرة'
  };

  var days = minDays[element] || 7;
  // تعديل للحرارة
  if (!isNaN(temp) && temp < 15) days = Math.ceil(days * 1.5);

  var detail = 'العنصر: ' + (names[element] || element) + ' | الحد الأدنى للفك: ' + days + ' يوم' +
    '\nfcu التصميمي: ' + fcu + ' MPa' +
    (!isNaN(temp) && temp < 15 ? '\n⚠️ حرارة ' + temp + '°C < 15°C — المدة تُمدد 50%' : '') +
    '\n📖 QCS 2024 S5 Table 5.4 — Formwork Removal';
  showResult('fw2-result', true, days, null, detail, '');
  _addCopyBtn('fw2-result', names[element] + ': فك بعد ' + days + ' يوم');
};

// ── 9. Fresh Concrete Temperature ───────────────────────────────────
// حرارة الخرسانة الطازجة — QCS 2024 S5 (حاسم في قطر)
window.calcConcreteTempV2 = function() {
  var temp = parseFloat(document.getElementById('ct2-temp').value);
  var type = document.getElementById('ct2-type').value;
  if (isNaN(temp)) return showToast('❌ أدخل درجة الحرارة');

  var maxTemp = type === 'mass' ? 30 : 35; // Mass concrete أكثر صرامة
  var pass = temp <= maxTemp && temp >= 5;
  var issues = [];
  if (temp > maxTemp) issues.push('الحرارة ' + temp + '°C تتجاوز الحد ' + maxTemp + '°C');
  if (temp < 5) issues.push('الحرارة أقل من 5°C — خطر التجمد');
  if (temp > 30 && temp <= maxTemp) issues.push('⚠️ قريبة من الحد — استخدم ثلج في الخلط');

  var detail = 'حرارة الخرسانة: ' + temp + '°C | الحد: ≤' + maxTemp + '°C (' + (type === 'mass' ? 'Mass Concrete' : 'Normal') + ')' +
    (issues.length ? '\n' + issues.join(' | ') : ' ✅ مقبول') +
    '\n💡 قطر: استخدم ثلج + chilled water + تغطية الركام' +
    '\n📖 QCS 2024 S5 P3 — Hot Weather Concreting';
  showResult('ct2-result', pass, temp, maxTemp, detail, 'إضافة ثلج (≤75% من الماء) + تبريد الركام + الصب ليلاً');
  _addCopyBtn('ct2-result', 'Concrete Temp=' + temp + '°C (Max ' + maxTemp + '°C)');
};

// ── 10. Carbonation Depth ───────────────────────────────────────────
// عمق الكربنة — تقييم المتانة
window.calcCarbonationV2 = function() {
  var depth = parseFloat(document.getElementById('carb2-depth').value);
  var cover = parseFloat(document.getElementById('carb2-cover').value);
  var age = parseFloat(document.getElementById('carb2-age').value) || 1;
  if (isNaN(depth) || isNaN(cover)) return showToast('❌ أدخل عمق الكربنة والغطاء');

  // معامل الكربنة k = d / √t
  var k = depth / Math.sqrt(age);
  // تقدير الوقت للوصول إلى الحديد
  var yearsToRebar = cover > 0 ? Math.pow(cover / k, 2) : 999;
  var remaining = yearsToRebar - age;

  var pass = depth < cover;
  var risk = remaining > 20 ? 'خطر منخفض' : remaining > 10 ? 'خطر متوسط' : 'خطر عالي — صيانة عاجلة';
  var detail = 'عمق الكربنة: ' + depth + 'mm | غطاء الحديد: ' + cover + 'mm | عمر الهيكل: ' + age + ' سنة' +
    '\nمعامل k: ' + k.toFixed(2) + ' mm/√yr | الوقت المتبقي: ~' + Math.max(0, remaining).toFixed(0) + ' سنة' +
    '\nتقييم الخطر: ' + risk +
    '\n📖 BS EN 14630 — Carbonation Depth';
  showResult('carb2-result', pass, depth, cover, detail, 'Anti-carbonation coating + تقوية الغطاء + cathodic protection');
  _addCopyBtn('carb2-result', 'Carbonation=' + depth + 'mm, Cover=' + cover + 'mm, Risk=' + risk);
};

// ── 11. Pull-out Bond Strength ──────────────────────────────────────
// قوة الربط (Pull-out) — QCS 2024 S5
window.calcPullOutV2 = function() {
  var force = parseFloat(document.getElementById('po2-force').value);
  var dia = parseFloat(document.getElementById('po2-dia').value);
  var depth = parseFloat(document.getElementById('po2-depth').value);
  if (isNaN(force) || isNaN(dia) || isNaN(depth)) return showToast('❌ أدخل القوة والقطر والعمق');

  // Bond stress = F / (π × d × L)
  var bondStress = force * 1000 / (Math.PI * dia * depth); // MPa
  var reqBond = 2.5; // الحد الأدنى التقريبي MPa
  var pass = bondStress >= reqBond;

  var detail = 'قوة السحب: ' + force + ' kN | ⌀' + dia + 'mm | عمق التثبيت: ' + depth + 'mm' +
    '\nBond Stress: ' + bondStress.toFixed(2) + ' MPa | المطلوب: ≥' + reqBond + ' MPa' +
    '\n📖 QCS 2024 S5 — Pull-out Test (BS EN 12504-3)';
  showResult('po2-result', pass, bondStress.toFixed(2), reqBond, detail, 'إعادة التثبيت باستخدام epoxy grout + retest');
  _addCopyBtn('po2-result', 'Bond=' + bondStress.toFixed(2) + 'MPa (' + (pass ? 'PASS' : 'FAIL') + ')');
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
window._extStructuralCalcs = function() {
  var el = document.getElementById('cat-structural');
  if (!el || el.dataset.extBuilt) return;
  el.dataset.extBuilt = '1';

  var existingTabs = el.querySelector('.calc-tabs');
  if (existingTabs) {
    var newTabs = [
      ['lap2-s','📏 Lap Length'],['dev2-s','🔗 Dev. Length'],['cc2-s','🏭 Cement Content'],
      ['chl2-s','🧂 Chloride'],['rh2-s','🔨 Rebound'],['upv2-s','🔊 UPV'],
      ['cur2-s','💧 Curing'],['fw2-s','🏗️ Formwork'],['ct2-s','🌡️ Temp'],
      ['carb2-s','💨 Carbonation'],['po2-s','⛓️ Pull-out']
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

  sections += _section('lap2-s', '📏 Lap Length — طول الوصلة — QCS S5',
    _calcField('lap2-dia', 'قطر السيخ ⌀', 'e.g. 16', 'mm') +
    _calcSelect('lap2-grade', 'درجة الحديد', [['B500B','B500B (fy=500)'],['B460','B460 (fy=460)']]) +
    _calcSelect('lap2-tension', 'نوع الإجهاد', [['yes','Tension (شد)'],['no','Compression (ضغط)']]) +
    _calcField('lap2-fcu', 'مقاومة الخرسانة fcu', 'e.g. 30', 'MPa') +
    _calcBtn('calcLapLengthV2()', 'احسب طول الوصلة') + _calcResult('lap2-result'));

  sections += _section('dev2-s', '🔗 Development Length — طول التثبيت',
    _calcField('dev2-dia', 'قطر السيخ ⌀', 'e.g. 20', 'mm') +
    _calcField('dev2-fcu', 'fcu', 'e.g. 30', 'MPa') +
    _calcSelect('dev2-hook', 'Hook / خطاف؟', [['no','بدون Hook'],['yes','مع Hook (-30%)']]) +
    _calcBtn('calcDevLengthV2()', 'احسب طول التثبيت') + _calcResult('dev2-result'));

  sections += _section('cc2-s', '🏭 Min Cement Content — QCS S5',
    _calcSelect('cc2-env', 'بيئة التعرض', [['mild','Mild — داخلي (≥300)'],['moderate','Moderate — خارجي (≥320)'],['severe','Severe — كيميائي (≥360)'],['marine','Marine — بحري (≥380)'],['extreme','Extreme — Sabkha (≥400)']]) +
    _calcField('cc2-cement', 'محتوى الأسمنت', 'e.g. 350', 'kg/m³') +
    _calcBtn('calcCementContentV2()', 'تحقق') + _calcResult('cc2-result'));

  sections += _section('chl2-s', '🧂 Chloride Content — QCS S5',
    _calcSelect('chl2-type', 'نوع الخرسانة', [['reinforced','Reinforced (≤0.20%)'],['prestressed','Prestressed (≤0.10%)'],['plain','Plain (≤0.40%)']]) +
    _calcField('chl2-val', 'Cl⁻ % by cement weight', 'e.g. 0.15', '%') +
    _calcBtn('calcChlorideCheckV2()', 'تحقق') + _calcResult('chl2-result'));

  sections += _section('rh2-s', '🔨 Rebound Hammer — Schmidt — BS EN 12504-2',
    _calcSelect('rh2-angle', 'زاوية الاختبار', [['horizontal','أفقي (0°)'],['up45','45° لأعلى'],['up90','90° لأعلى (سقف)'],['down45','45° لأسفل'],['down90','90° لأسفل (أرضية)']]) +
    _calcField('rh2-val', 'قراءة الارتداد R', 'e.g. 35', '') +
    _calcBtn('calcReboundHammerV2()', 'تقييم') + _calcResult('rh2-result'));

  sections += _section('upv2-s', '🔊 UPV — Ultrasonic Pulse — BS EN 12504-4',
    _calcField('upv2-vel', 'سرعة النبض', 'e.g. 4.2', 'km/s') +
    _calcBtn('calcUPVV2()', 'تقييم الجودة') + _calcResult('upv2-result'));

  sections += _section('cur2-s', '💧 Curing Period — فترة المعالجة — QCS S5',
    _calcSelect('cur2-env', 'نوع الأسمنت', [['opc','OPC / CEM I (≥7 أيام)'],['blended','Blended PFA/GGBS (≥10)'],['marine','Marine Exposure (≥14)']]) +
    _calcField('cur2-days', 'أيام المعالجة الفعلية', 'e.g. 5', 'يوم') +
    _calcField('cur2-temp', 'درجة الحرارة المحيطة', 'e.g. 38', '°C') +
    _calcBtn('calcCuringCheckV2()', 'تحقق') + _calcResult('cur2-result'));

  sections += _section('fw2-s', '🏗️ Formwork Striking — فك القوالب — QCS S5',
    _calcSelect('fw2-element', 'العنصر', [['sides_beam','جوانب الكمرة (1d)'],['sides_column','جوانب العمود (1d)'],['sides_wall','جوانب الجدار (1d)'],['soffit_slab','بطن البلاطة (10d)'],['soffit_beam','بطن الكمرة (14d)'],['props_slab','دعائم البلاطة (14d)'],['props_beam','دعائم الكمرة (21d)']]) +
    _calcField('fw2-fcu', 'fcu التصميمي', 'e.g. 30', 'MPa') +
    _calcField('fw2-temp', 'أقل حرارة محيطة', 'e.g. 20', '°C') +
    _calcBtn('calcFormworkStrikeV2()', 'احسب المدة') + _calcResult('fw2-result'));

  sections += _section('ct2-s', '🌡️ Fresh Concrete Temp — حرارة الخرسانة — QCS S5',
    _calcSelect('ct2-type', 'نوع الخرسانة', [['normal','Normal (≤35°C)'],['mass','Mass Concrete (≤30°C)']]) +
    _calcField('ct2-temp', 'حرارة الخرسانة الطازجة', 'e.g. 32', '°C') +
    _calcBtn('calcConcreteTempV2()', 'تحقق') + _calcResult('ct2-result'));

  sections += _section('carb2-s', '💨 Carbonation Depth — عمق الكربنة',
    _calcField('carb2-depth', 'عمق الكربنة المقاس', 'e.g. 8', 'mm') +
    _calcField('carb2-cover', 'غطاء الحديد', 'e.g. 40', 'mm') +
    _calcField('carb2-age', 'عمر الهيكل', 'e.g. 10', 'سنة') +
    _calcBtn('calcCarbonationV2()', 'تقييم الخطر') + _calcResult('carb2-result'));

  sections += _section('po2-s', '⛓️ Pull-out Test — قوة الربط — BS EN 12504-3',
    _calcField('po2-force', 'قوة السحب', 'e.g. 45', 'kN') +
    _calcField('po2-dia', 'قطر السيخ ⌀', 'e.g. 16', 'mm') +
    _calcField('po2-depth', 'عمق التثبيت', 'e.g. 160', 'mm') +
    _calcBtn('calcPullOutV2()', 'احسب Bond Stress') + _calcResult('po2-result'));

  var temp = document.createElement('div');
  temp.innerHTML = sections;
  temp.querySelectorAll('.calc-section').forEach(function(s) {
    s.style.display = 'none';
    el.appendChild(s);
  });
};

})();
