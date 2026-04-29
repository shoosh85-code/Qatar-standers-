// ═══════════════════════════════════════════════════════════════════════
// QatarSpec Pro — Utilities Calculators (5)
// المرجع: QCS 2024 Section 9 (Water) + Section 10 (Sewerage)
// ═══════════════════════════════════════════════════════════════════════
(function() {
'use strict';

// ── 1. Chlorination Test ────────────────────────────────────────────
// اختبار التعقيم — QCS 2024 S9 + KAHRAMAA
window.calcChlorinationV2 = function() {
  var conc = parseFloat(document.getElementById('chlor2-conc').value);
  var duration = parseFloat(document.getElementById('chlor2-dur').value);
  var residual = parseFloat(document.getElementById('chlor2-resid').value);
  var flush = document.getElementById('chlor2-flush').value === 'yes';
  if (isNaN(conc)) return showToast('❌ أدخل تركيز الكلور');

  var issues = [], pass = true;

  // تركيز الكلور: 50 mg/L minimum
  if (conc < 50) { issues.push('تركيز ' + conc + 'mg/L < 50mg/L ❌'); pass = false; }
  else issues.push('تركيز ' + conc + 'mg/L ≥ 50mg/L ✅');

  // مدة الاتصال: 24 ساعة minimum
  if (!isNaN(duration)) {
    if (duration < 24) { issues.push('مدة ' + duration + 'h < 24h ❌'); pass = false; }
    else issues.push('مدة ' + duration + 'h ≥ 24h ✅');
  }

  // الكلور المتبقي: 0.2-0.5 mg/L
  if (!isNaN(residual)) {
    if (residual < 0.2 || residual > 0.5) { issues.push('Residual Cl ' + residual + 'mg/L خارج 0.2-0.5 ❌'); pass = false; }
    else issues.push('Residual Cl ' + residual + 'mg/L ✅');
  }

  // الشطف
  if (!flush) issues.push('⚠️ يجب شطف الأنابيب حتى Cl < 0.5 mg/L قبل التشغيل');

  var detail = issues.join(' | ') +
    '\n📖 QCS 2024 S9 + KAHRAMAA 2024 — Disinfection of Water Mains';
  showResult('chlor2-result', pass, null, null, detail, 'إعادة التعقيم بالتركيز المطلوب + مد فترة الاتصال');
  _addCopyBtn('chlor2-result', 'Chlorination: ' + issues.join(', '));
};

// ── 2. Water Quality (pH + Turbidity + Residual Cl) ─────────────────
// جودة المياه — QCS 2024 S9 + KAHRAMAA
window.calcWaterQualityV2 = function() {
  var ph = parseFloat(document.getElementById('wq2-ph').value);
  var turb = parseFloat(document.getElementById('wq2-turb').value);
  var resCl = parseFloat(document.getElementById('wq2-rescl').value);
  var color = parseFloat(document.getElementById('wq2-color').value);

  if (isNaN(ph) && isNaN(turb) && isNaN(resCl)) return showToast('❌ أدخل قيمة واحدة على الأقل');

  var issues = [], pass = true;

  if (!isNaN(ph)) {
    if (ph < 6.5 || ph > 8.5) { issues.push('pH = ' + ph + ' خارج 6.5-8.5 ❌'); pass = false; }
    else issues.push('pH = ' + ph + ' ✅');
  }
  if (!isNaN(turb)) {
    if (turb > 4) { issues.push('Turbidity = ' + turb + ' NTU > 4 NTU ❌'); pass = false; }
    else issues.push('Turbidity = ' + turb + ' NTU ✅');
  }
  if (!isNaN(resCl)) {
    if (resCl < 0.2 || resCl > 0.5) { issues.push('Residual Cl = ' + resCl + ' mg/L خارج 0.2-0.5 ❌'); pass = false; }
    else issues.push('Residual Cl = ' + resCl + ' mg/L ✅');
  }
  if (!isNaN(color)) {
    if (color > 15) { issues.push('Color = ' + color + ' TCU > 15 TCU ❌'); pass = false; }
    else issues.push('Color = ' + color + ' TCU ✅');
  }

  var detail = issues.join(' | ') +
    '\n📖 QCS 2024 S9 + KAHRAMAA Water Quality Standards 2024';
  showResult('wq2-result', pass, null, null, detail, 'شطف الأنابيب + إعادة أخذ العينات بعد 24 ساعة');
  _addCopyBtn('wq2-result', 'Water Quality: ' + issues.join(', '));
};

// ── 3. CCTV Defect Grading ──────────────────────────────────────────
// تصنيف عيوب CCTV — Ashghal + WRc
window.calcCCTVGradeV2 = function() {
  var crackWidth = parseFloat(document.getElementById('cctv2-crack').value);
  var deformation = parseFloat(document.getElementById('cctv2-deform').value);
  var jointGap = parseFloat(document.getElementById('cctv2-joint').value);
  var infiltration = document.getElementById('cctv2-infil').value;

  var issues = [], maxGrade = 1, pass = true;

  if (!isNaN(crackWidth)) {
    if (crackWidth > 5) { issues.push('شقوق ' + crackWidth + 'mm → Grade 4-5 ❌'); maxGrade = Math.max(maxGrade, 5); pass = false; }
    else if (crackWidth > 2) { issues.push('شقوق ' + crackWidth + 'mm → Grade 3'); maxGrade = Math.max(maxGrade, 3); }
    else if (crackWidth > 0) { issues.push('شقوق ' + crackWidth + 'mm → Grade 1-2'); maxGrade = Math.max(maxGrade, 2); }
  }
  if (!isNaN(deformation)) {
    if (deformation > 10) { issues.push('تشوه ' + deformation + '% → Grade 5 ❌'); maxGrade = 5; pass = false; }
    else if (deformation > 5) { issues.push('تشوه ' + deformation + '% → Grade 3-4'); maxGrade = Math.max(maxGrade, 4); pass = false; }
    else if (deformation > 2) { issues.push('تشوه ' + deformation + '%'); maxGrade = Math.max(maxGrade, 2); }
  }
  if (!isNaN(jointGap)) {
    if (jointGap > 25) { issues.push('فجوة وصلة ' + jointGap + 'mm → Grade 4 ❌'); maxGrade = Math.max(maxGrade, 4); pass = false; }
    else if (jointGap > 10) { issues.push('فجوة وصلة ' + jointGap + 'mm'); maxGrade = Math.max(maxGrade, 2); }
  }
  if (infiltration === 'gushing') { issues.push('تسرب شديد ❌'); maxGrade = 5; pass = false; }
  else if (infiltration === 'dripping') { issues.push('تنقيط ⚠️'); maxGrade = Math.max(maxGrade, 3); }
  else if (infiltration === 'seeping') { issues.push('رشح خفيف'); maxGrade = Math.max(maxGrade, 2); }

  if (!issues.length) { issues.push('لا توجد عيوب ظاهرة ✅'); maxGrade = 1; }

  var gradeText = maxGrade <= 2 ? 'مقبول — لا يحتاج إصلاح' : maxGrade <= 3 ? 'متوسط — مراقبة + جدولة إصلاح' : 'شديد — إصلاح فوري مطلوب';
  var detail = 'CCTV Grade: ' + maxGrade + '/5 | التقييم: ' + gradeText +
    '\n' + issues.join(' | ') +
    '\n📖 Ashghal IDMS + WRc Sewerage Rehabilitation Manual';
  showResult('cctv2-result', pass, maxGrade, 3, detail, 'CIPP Lining / Point Repair / Pipe Replacement حسب خطورة العيب');
  _addCopyBtn('cctv2-result', 'CCTV Grade ' + maxGrade + ': ' + issues.join(', '));
};

// ── 4. Manhole Water Tightness Test ─────────────────────────────────
// اختبار محكمية الغرف — QCS 2024 S10
window.calcManholeWTV2 = function() {
  var depth = parseFloat(document.getElementById('mh2-depth').value);
  var dia = parseFloat(document.getElementById('mh2-dia').value);
  var drop = parseFloat(document.getElementById('mh2-drop').value);
  var duration = parseFloat(document.getElementById('mh2-dur').value) || 30;
  if (isNaN(depth) || isNaN(drop)) return showToast('❌ أدخل العمق والانخفاض');

  // الحد المسموح: ≤25mm drop في 30 دقيقة (QCS S10)
  // معدل مقبول = 25mm / 30min = 0.83 mm/min
  var ratePerMin = drop / duration;
  var maxDrop = 25 * (duration / 30); // نسبياً
  var pass = drop <= maxDrop;

  var surfaceArea = !isNaN(dia) ? (Math.PI * Math.pow(dia / 2000, 2)).toFixed(3) : '?';
  var leakRate = (!isNaN(dia) ? (ratePerMin * parseFloat(surfaceArea) * 60).toFixed(2) : '?');

  var detail = 'عمق الغرفة: ' + depth + 'm | قطر: ' + (dia || '?') + 'mm | انخفاض: ' + drop + 'mm في ' + duration + ' min' +
    '\nالحد المسموح: ≤' + maxDrop.toFixed(0) + 'mm في ' + duration + ' min | معدل التسرب: ~' + leakRate + ' L/hr' +
    '\n📖 QCS 2024 S10 — Manhole Water Tightness Test';
  showResult('mh2-result', pass, drop, maxDrop.toFixed(0), detail, 'سد التسربات باستخدام water-stop + إعادة الاختبار');
  _addCopyBtn('mh2-result', 'Manhole WT: Drop=' + drop + 'mm/' + duration + 'min (' + (pass ? 'PASS' : 'FAIL') + ')');
};

// ── 5. Sewer Gradient Check ─────────────────────────────────────────
// انحدار مواسير الصرف — QCS 2024 S10 + Ashghal
window.calcSewerGradientV2 = function() {
  var dn = parseFloat(document.getElementById('sg2-dn').value);
  var gradient = parseFloat(document.getElementById('sg2-grad').value);
  var type = document.getElementById('sg2-type').value;
  if (isNaN(dn) || isNaN(gradient)) return showToast('❌ أدخل القطر والانحدار');

  // الحد الأدنى للانحدار حسب القطر (1:X)
  // QCS S10: Self-cleansing velocity ≥ 0.6 m/s → gradient depends on DN
  var minGradients = {
    foul: { 150: 100, 200: 150, 225: 170, 300: 200, 375: 250, 450: 300, 600: 400 },
    storm: { 225: 200, 300: 250, 375: 300, 450: 350, 600: 500, 900: 700 }
  };
  var table = minGradients[type] || minGradients.foul;

  // العثور على أقرب قطر
  var closestDN = Object.keys(table).reduce(function(a, b) {
    return Math.abs(b - dn) < Math.abs(a - dn) ? b : a;
  });
  var minGrad = table[closestDN]; // 1:minGrad — maximum value (flatter)

  // في نظام 1:X، أصغر X = أكثر ميلاً = أفضل
  var pass = gradient <= minGrad;

  // تقدير السرعة التقريبية (Manning's)
  var n = 0.013; // PVC
  var r = (dn / 1000) / 4; // Hydraulic radius (full flow)
  var slope = 1 / gradient;
  var v = (1 / n) * Math.pow(r, 2 / 3) * Math.pow(slope, 0.5);
  var selfCleansing = v >= 0.6;

  var detail = 'DN ' + dn + 'mm | الانحدار: 1:' + gradient + ' | الحد: 1:' + minGrad + ' (max)' +
    '\nسرعة تقريبية: ' + v.toFixed(2) + ' m/s | Self-cleansing (≥0.6): ' + (selfCleansing ? '✅' : '❌') +
    '\nنوع الشبكة: ' + (type === 'foul' ? 'Foul Sewer' : 'Storm Water') +
    '\n📖 QCS 2024 S10 + Ashghal Design Guidelines';
  showResult('sg2-result', pass && selfCleansing, v.toFixed(2), 0.6, detail, 'تعديل منسوب Invert Level لتحقيق الانحدار المطلوب');
  _addCopyBtn('sg2-result', 'DN' + dn + ' 1:' + gradient + ' V=' + v.toFixed(2) + 'm/s');
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
window._extUtilitiesCalcs = function() {
  var el = document.getElementById('cat-utilities');
  if (!el || el.dataset.extBuilt) return;
  el.dataset.extBuilt = '1';

  var existingTabs = el.querySelector('.calc-tabs');
  if (existingTabs) {
    var newTabs = [
      ['chlor2-u','🧪 Chlorination'],['wq2-u','💧 Water Quality'],['cctv2-u','📹 CCTV Grade'],
      ['mh2-u','🕳️ Manhole WT'],['sg2-u','📐 Sewer Gradient']
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

  sections += _section('chlor2-u', '🧪 Chlorination Test — تعقيم المياه — QCS S9',
    _calcField('chlor2-conc', 'تركيز الكلور', 'e.g. 50', 'mg/L') +
    _calcField('chlor2-dur', 'مدة الاتصال', 'e.g. 24', 'ساعة') +
    _calcField('chlor2-resid', 'Residual Cl (بعد الشطف)', 'e.g. 0.3', 'mg/L') +
    _calcSelect('chlor2-flush', 'تم الشطف؟', [['yes','نعم'],['no','لا']]) +
    _calcBtn('calcChlorinationV2()', 'تحقق من التعقيم ✅') + _calcResult('chlor2-result'));

  sections += _section('wq2-u', '💧 Water Quality — جودة المياه — KAHRAMAA',
    _calcField('wq2-ph', 'pH', 'e.g. 7.2', '') +
    _calcField('wq2-turb', 'Turbidity (عكارة)', 'e.g. 2', 'NTU') +
    _calcField('wq2-rescl', 'Residual Chlorine', 'e.g. 0.3', 'mg/L') +
    _calcField('wq2-color', 'Color (لون)', 'e.g. 5', 'TCU') +
    _calcBtn('calcWaterQualityV2()', 'فحص الجودة ✅') + _calcResult('wq2-result'));

  sections += _section('cctv2-u', '📹 CCTV Defect Grading — WRc + Ashghal',
    _calcField('cctv2-crack', 'عرض الشقوق', 'e.g. 3', 'mm') +
    _calcField('cctv2-deform', 'نسبة التشوه', 'e.g. 4', '%') +
    _calcField('cctv2-joint', 'فجوة الوصلة', 'e.g. 12', 'mm') +
    _calcSelect('cctv2-infil', 'التسرب', [['none','لا يوجد'],['seeping','رشح خفيف'],['dripping','تنقيط'],['gushing','تسرب شديد']]) +
    _calcBtn('calcCCTVGradeV2()', 'تقييم CCTV ✅') + _calcResult('cctv2-result'));

  sections += _section('mh2-u', '🕳️ Manhole Water Tightness — QCS S10',
    _calcField('mh2-depth', 'عمق الغرفة', 'e.g. 2.5', 'm') +
    _calcField('mh2-dia', 'قطر الغرفة', 'e.g. 1200', 'mm') +
    _calcField('mh2-drop', 'انخفاض مستوى الماء', 'e.g. 15', 'mm') +
    _calcField('mh2-dur', 'مدة الاختبار', 'e.g. 30', 'دقيقة') +
    _calcBtn('calcManholeWTV2()', 'تحقق') + _calcResult('mh2-result'));

  sections += _section('sg2-u', '📐 Sewer Gradient — انحدار الصرف — QCS S10',
    _calcSelect('sg2-type', 'نوع الشبكة', [['foul','Foul Sewer'],['storm','Storm Water']]) +
    _calcField('sg2-dn', 'قطر الماسورة DN', 'e.g. 300', 'mm') +
    _calcField('sg2-grad', 'الانحدار (1:X) → أدخل X', 'e.g. 200', '') +
    _calcBtn('calcSewerGradientV2()', 'تحقق من الانحدار') + _calcResult('sg2-result'));

  var temp = document.createElement('div');
  temp.innerHTML = sections;
  temp.querySelectorAll('.calc-section').forEach(function(s) {
    s.style.display = 'none';
    el.appendChild(s);
  });
};

})();
