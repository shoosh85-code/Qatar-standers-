// QatarSpec Pro — Extra Calculators Module
(function() {
  "use strict";


window.calcGP = function calcGP() {
  var layer = (document.getElementById('gp-layer')  || {}).value || 'subbase';
  var pi    = parseFloat((document.getElementById('gp-pi')   || {}).value);
  var ll    = parseFloat((document.getElementById('gp-ll')   || {}).value);
  var p200  = parseFloat((document.getElementById('gp-p200') || {}).value);
  var p4    = parseFloat((document.getElementById('gp-p4')   || {}).value);
  var p075  = parseFloat((document.getElementById('gp-p075') || {}).value);

  if (isNaN(pi) && isNaN(ll) && isNaN(p200)) {
    showToast('❌ أدخل قيمة واحدة على الأقل');
    return;
  }

  var limits = {
    subgrade: { pi: 10, ll: 35, p200: 35, ref: 'QCS 2024 S6 P3 Table 3:1' },
    subbase:  { pi:  6, ll: 25, p200: 12, ref: 'QCS 2024 S6 P4 Table 4:1' },
    base:     { pi:  4, ll: 20, p200:  8, ref: 'QCS 2024 S6 P5 Table 5:1' },
  };
  var L = limits[layer] || limits.subbase;
  var lines = [], allPass = true;

  if (!isNaN(pi))   { var ok = pi   <= L.pi;   if (!ok) allPass=false; lines.push('PI: '   + pi   + ' | الحد: ≤' + L.pi   + ' ' + (ok?'✅':'❌')); }
  if (!isNaN(ll))   { var ok = ll   <= L.ll;   if (!ok) allPass=false; lines.push('LL: '   + ll   + '% | الحد: ≤' + L.ll  + '% ' + (ok?'✅':'❌')); }
  if (!isNaN(p200)) { var ok = p200 <= L.p200; if (!ok) allPass=false; lines.push('% Passing #200: ' + p200 + '% | الحد: ≤' + L.p200 + '% ' + (ok?'✅':'❌')); }
  if (!isNaN(p4))   lines.push('% Passing #4 (4.75mm): ' + p4 + '%');
  if (!isNaN(p075)) lines.push('% Passing #200 (0.075mm): ' + p075 + '%');
  lines.push('المرجع: ' + L.ref);

  showResult('gp-result', allPass, null, null, lines.join('<br>'));
};


window.calcBlockwork = function calcBlockwork() {
  var wallArea  = parseFloat((document.getElementById('bw-area')     || {}).value);
  var blockType = (document.getElementById('bw-type')    || {}).value || '200';
  var openings  = parseFloat((document.getElementById('bw-openings') || {}).value) || 0;

  if (!wallArea || isNaN(wallArea)) { showToast('❌ أدخل مساحة الجدار (m²)'); return; }

  var netArea = Math.max(0, wallArea - openings);
  var sizes   = { '100':{t:100}, '150':{t:150}, '200':{t:200}, '250':{t:250} };
  var bs      = sizes[blockType] || sizes['200'];

  // Standard block face 390×190mm + 10mm joint
  var faceArea   = (0.400) * (0.200);          // m²
  var blockCount = Math.ceil(netArea / faceArea * 1.05);
  var mortarVol  = +(netArea * (bs.t / 1000) * 0.33).toFixed(2);
  var mortarBags = Math.ceil(mortarVol * 350 / 50);
  var sandVol    = +(mortarVol * 1.1).toFixed(2);

  showResult('bw-result', true, null, null, [
    'مساحة الجدار الصافية: ' + netArea.toFixed(1) + ' m²',
    'عدد البلوك ' + blockType + 'mm: <strong>' + blockCount.toLocaleString() + ' قطعة</strong>',
    'مونة: ' + mortarVol + ' m³ | أسمنت: ' + mortarBags + ' كيس | رمل: ' + sandVol + ' m³',
    'المرجع: QCS 2024 S5 — Masonry Works',
  ].join('<br>'));
};


window.calcRoadLayers = function calcRoadLayers() {
  var length  = parseFloat((document.getElementById('rl-length')   || {}).value);
  var width   = parseFloat((document.getElementById('rl-width')    || {}).value);
  var tSubg   = parseFloat((document.getElementById('rl-subgrade') || {}).value) || 0;
  var tSubb   = parseFloat((document.getElementById('rl-subbase')  || {}).value) || 0;
  var tBase   = parseFloat((document.getElementById('rl-base')     || {}).value) || 0;
  var tBinder = parseFloat((document.getElementById('rl-binder')   || {}).value) || 0;
  var tWear   = parseFloat((document.getElementById('rl-wearing')  || {}).value) || 0;

  if (!length || !width) { showToast('❌ أدخل الطول والعرض'); return; }

  var area   = length * width;
  var layers = [
    { name:'Subgrade',      t:tSubg,   d:2.00, ref:'QCS S6 P3' },
    { name:'Sub-base',      t:tSubb,   d:2.20, ref:'QCS S6 P4' },
    { name:'Base Course',   t:tBase,   d:2.30, ref:'QCS S6 P5' },
    { name:'Binder Course', t:tBinder, d:2.35, ref:'QCS S8 P5' },
    { name:'Wearing Course',t:tWear,   d:2.40, ref:'QCS S8 P5' },
  ].filter(function(l){ return l.t > 0; });

  if (!layers.length) { showToast('❌ أدخل سماكة طبقة واحدة على الأقل (mm)'); return; }

  var lines = ['المساحة: ' + area.toLocaleString() + ' m² (' + length + ' × ' + width + 'm)', ''];
  var totVol = 0, totTon = 0;
  layers.forEach(function(l) {
    var vol = area * l.t / 1000;
    var ton = vol * l.d;
    totVol += vol; totTon += ton;
    lines.push('<strong>' + l.name + '</strong> (' + l.ref + '): ' + l.t + 'mm → ' + vol.toFixed(0) + ' m³ / ' + ton.toFixed(0) + ' t');
  });
  lines.push('', '══ الإجمالي: <strong>' + totVol.toFixed(0) + ' m³ | ' + (totTon/1000).toFixed(1) + ' kt</strong>');

  showResult('rl-result', true, null, null, lines.join('<br>'));
};

})();
