// js/calcs/materials.js — QatarSpec Pro
// حاسبات كميات مواد البناء — QCS 2024 Part 6 (Masonry) + Part 14 (Concrete)
// معادلات: IS 2212 + Ashghal standard brick specifications

(function() {
'use strict';

// ══════════════════════════════════════════════════════════
// 1. حاسبة الطابوق (Block / Brick)
// QCS 2024 Part 6 + Ashghal Block Spec
// بلوك قطري: 390×190×190 mm (أسمنتي)
// ══════════════════════════════════════════════════════════
window.calcBrickQty = function() {
  var length  = parseFloat(document.getElementById('brk-length').value);
  var height  = parseFloat(document.getElementById('brk-height').value);
  var openings = parseFloat(document.getElementById('brk-open').value) || 0;
  var type    = document.getElementById('brk-type').value;
  var el      = document.getElementById('brk-result');
  if (!el) return;
  el.style.display = 'block';

  if (isNaN(length) || isNaN(height) || length <= 0 || height <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ أدخل طول الجدار وارتفاعه</p>';
    return;
  }

  var specs = {
    '200': { w:390, h:190, t:200, label:'بلوك 200mm', perM2: 12.5 },
    '150': { w:390, h:190, t:150, label:'بلوك 150mm', perM2: 12.5 },
    '100': { w:390, h:190, t:100, label:'بلوك 100mm', perM2: 12.5 }
  };
  var sp = specs[type] || specs['200'];

  var wallArea = (length * height) - openings;
  if (wallArea <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ مساحة الجدار أصغر من الفتحات</p>';
    return;
  }

  var rawBricks  = wallArea * sp.perM2;
  var waste      = rawBricks * 0.05;
  var totalBricks= Math.ceil(rawBricks + waste);
  var mortarM3   = (wallArea * 0.03).toFixed(3);
  var cementBags = Math.ceil(wallArea * 0.03 / 7 * 1 * 1440 / 50);
  var sandM3     = (wallArea * 0.03 / 7 * 6).toFixed(2);

  el.innerHTML =
    '<div style="background:#eafaf1;border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:#27ae60;font-size:15px;margin-bottom:12px;">✅ حاسبة الطابوق — ' + sp.label + '</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">' +
    '<tr style="background:#d5f5e3;"><td style="padding:6px 8px;font-weight:700;">البند</td><td style="padding:6px 8px;font-weight:700;">الكمية</td><td style="padding:6px 8px;font-weight:700;">الوحدة</td></tr>' +
    '<tr><td style="padding:5px 8px;">مساحة الجدار الصافية</td><td style="padding:5px 8px;font-weight:700;">' + wallArea.toFixed(2) + '</td><td style="padding:5px 8px;">m²</td></tr>' +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">بلوك صافي</td><td style="padding:5px 8px;font-weight:700;">' + Math.ceil(rawBricks) + '</td><td style="padding:5px 8px;">حبة</td></tr>' +
    '<tr><td style="padding:5px 8px;">هدر 5% (QCS)</td><td style="padding:5px 8px;font-weight:700;">' + Math.ceil(waste) + '</td><td style="padding:5px 8px;">حبة</td></tr>' +
    '<tr style="background:#d5f5e3;"><td style="padding:6px 8px;font-weight:700;">إجمالي البلوك</td><td style="padding:6px 8px;font-weight:700;font-size:15px;color:#27ae60;">' + totalBricks + '</td><td style="padding:6px 8px;font-weight:700;">حبة</td></tr>' +
    '<tr><td style="padding:5px 8px;">ملاط (1:6)</td><td style="padding:5px 8px;font-weight:700;">' + mortarM3 + '</td><td style="padding:5px 8px;">m³</td></tr>' +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">إسمنت</td><td style="padding:5px 8px;font-weight:700;">' + cementBags + '</td><td style="padding:5px 8px;">كيس 50kg</td></tr>' +
    '<tr><td style="padding:5px 8px;">رمل</td><td style="padding:5px 8px;font-weight:700;">' + sandM3 + '</td><td style="padding:5px 8px;">m³</td></tr>' +
    '</table>' +
    '<div style="font-size:11px;color:#888;margin-top:8px;">📋 QCS 2024 Part 6 Section 3 | نسبة ملاط 1:6 | هدر 5% | بلوك 390×190mm</div></div>';
};

// ══════════════════════════════════════════════════════════
// 2. حاسبة الخرسانة (Concrete Mix Quantities)
// QCS 2024 Part 14 + ACI 211
// ══════════════════════════════════════════════════════════
window.calcConcreteQty = function() {
  var volume = parseFloat(document.getElementById('con-vol').value);
  var grade  = document.getElementById('con-grade').value;
  var el     = document.getElementById('con-result');
  if (!el) return;
  el.style.display = 'block';

  if (isNaN(volume) || volume <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ أدخل الحجم بالـ m³</p>';
    return;
  }

  var mixes = {
    C20: { cement:320, sand:700, agg:1100, water:180, wc:'0.56', minCem:300,  label:'C20 (مساعد)' },
    C25: { cement:350, sand:670, agg:1100, water:175, wc:'0.50', minCem:350,  label:'C25 — الأكثر شيوعاً' },
    C30: { cement:380, sand:650, agg:1090, water:170, wc:'0.45', minCem:380,  label:'C30 — هياكل مكشوفة' },
    C35: { cement:410, sand:630, agg:1080, water:165, wc:'0.40', minCem:400,  label:'C35 — بيئة كبريتية DS2' },
    C40: { cement:450, sand:600, agg:1060, water:160, wc:'0.36', minCem:450,  label:'C40 — هياكل خاصة DS3' }
  };
  var mx = mixes[grade] || mixes.C25;

  var waste    = 1.03;
  var totVol   = volume * waste;
  var cement   = Math.ceil(mx.cement * totVol);
  var sand     = (mx.sand * totVol / 1000).toFixed(2);
  var agg      = (mx.agg  * totVol / 1000).toFixed(2);
  var water    = Math.ceil(mx.water * totVol);
  var cBags    = Math.ceil(cement / 50);

  el.innerHTML =
    '<div style="background:#eaf4fb;border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:#2980b9;font-size:15px;margin-bottom:12px;">🏗️ خلطة ' + mx.label + ' — ' + volume + ' m³</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">' +
    '<tr style="background:#d6eaf8;"><td style="padding:6px 8px;font-weight:700;">المادة</td><td style="padding:6px 8px;font-weight:700;">الكمية</td><td style="padding:6px 8px;font-weight:700;">الوحدة</td></tr>' +
    '<tr><td style="padding:5px 8px;">إسمنت</td><td style="padding:5px 8px;font-weight:700;">' + cement + '</td><td style="padding:5px 8px;">kg</td></tr>' +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">أكياس إسمنت (50kg)</td><td style="padding:5px 8px;font-weight:700;color:#2980b9;">' + cBags + '</td><td style="padding:5px 8px;">كيس</td></tr>' +
    '<tr><td style="padding:5px 8px;">رمل</td><td style="padding:5px 8px;font-weight:700;">' + sand + '</td><td style="padding:5px 8px;">طن</td></tr>' +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">حصى (Aggregate)</td><td style="padding:5px 8px;font-weight:700;">' + agg + '</td><td style="padding:5px 8px;">طن</td></tr>' +
    '<tr><td style="padding:5px 8px;">ماء</td><td style="padding:5px 8px;font-weight:700;">' + water + '</td><td style="padding:5px 8px;">لتر</td></tr>' +
    '<tr style="background:#d6eaf8;"><td style="padding:6px 8px;font-weight:700;">نسبة ماء/إسمنت (w/c)</td><td style="padding:6px 8px;font-weight:700;color:#2980b9;">' + mx.wc + '</td><td style="padding:6px 8px;">—</td></tr>' +
    '</table>' +
    '<div style="font-size:11px;color:#888;margin-top:8px;">📋 QCS 2024 Part 14 | ACI 211 | هدر 3% | حد أدنى إسمنت: ' + mx.minCem + ' kg/m³</div></div>';
};

// ══════════════════════════════════════════════════════════
// 3. حاسبة كميات الطرق (Road Material Quantities)
// QCS 2024 Section 17 + Ashghal RDM 2023
// ══════════════════════════════════════════════════════════
window.calcRoadMaterials = function() {
  var length  = parseFloat(document.getElementById('rd-length').value);
  var width   = parseFloat(document.getElementById('rd-width').value);
  var wcThk   = parseFloat(document.getElementById('rd-wc').value) || 0;
  var bcThk   = parseFloat(document.getElementById('rd-bc').value) || 0;
  var baseThk = parseFloat(document.getElementById('rd-base').value) || 0;
  var sbThk   = parseFloat(document.getElementById('rd-sb').value) || 0;
  var el      = document.getElementById('rd-result');
  if (!el) return;
  el.style.display = 'block';

  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ أدخل الطول والعرض</p>';
    return;
  }

  var area = length * width;
  var D_ASPHALT = 2.35, D_BASE = 2.20, D_SUBBASE = 2.00, WASTE = 1.05, TRUCK = 20;

  var volWC = area * (wcThk/1000), volBC = area * (bcThk/1000);
  var volBase = area * (baseThk/1000), volSB = area * (sbThk/1000);

  var tonWC = (volWC * D_ASPHALT * WASTE).toFixed(1);
  var tonBC = (volBC * D_ASPHALT * WASTE).toFixed(1);
  var tonBase = (volBase * D_BASE * WASTE).toFixed(1);
  var tonSB = (volSB * D_SUBBASE * WASTE).toFixed(1);

  var rows = '';
  if (wcThk > 0)   rows += '<tr><td style="padding:5px 8px;">Wearing Course (' + wcThk + 'mm)</td><td style="padding:5px 8px;font-weight:700;">' + tonWC + '</td><td style="padding:5px 8px;">' + Math.ceil(tonWC/TRUCK) + ' شاحنة</td></tr>';
  if (bcThk > 0)   rows += '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">Binder Course (' + bcThk + 'mm)</td><td style="padding:5px 8px;font-weight:700;">' + tonBC + '</td><td style="padding:5px 8px;">' + Math.ceil(tonBC/TRUCK) + ' شاحنة</td></tr>';
  if (baseThk > 0) rows += '<tr><td style="padding:5px 8px;">Base Course (' + baseThk + 'mm)</td><td style="padding:5px 8px;font-weight:700;">' + tonBase + '</td><td style="padding:5px 8px;">' + Math.ceil(tonBase/TRUCK) + ' شاحنة</td></tr>';
  if (sbThk > 0)   rows += '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">Subbase (' + sbThk + 'mm) CBR≥30%</td><td style="padding:5px 8px;font-weight:700;">' + tonSB + '</td><td style="padding:5px 8px;">' + Math.ceil(tonSB/TRUCK) + ' شاحنة</td></tr>';

  el.innerHTML =
    '<div style="background:#fef9e7;border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:#d4a017;font-size:15px;margin-bottom:12px;">🛣️ كميات الطريق — ' + area.toFixed(0) + ' m² (' + length + 'م × ' + width + 'م)</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">' +
    '<tr style="background:#fdebd0;"><td style="padding:6px 8px;font-weight:700;">الطبقة</td><td style="padding:6px 8px;font-weight:700;">الكمية (طن)</td><td style="padding:6px 8px;font-weight:700;">النقل</td></tr>' +
    rows +
    '</table>' +
    '<div style="font-size:11px;color:#888;margin-top:8px;">📋 QCS 2024 S17 + Ashghal RDM 2023 | هدر 5% | شاحنة 20 طن | كثافة إسفلت 2.35 t/m³</div></div>';
};

// ══════════════════════════════════════════════════════════
// 4. حاسبة الملاط (Mortar)
// QCS 2024 Part 6 Section 3
// ══════════════════════════════════════════════════════════
window.calcMortarQty = function() {
  var vol   = parseFloat(document.getElementById('mort-vol').value);
  var ratio = document.getElementById('mort-ratio').value;
  var el    = document.getElementById('mort-result');
  if (!el) return;
  el.style.display = 'block';

  if (isNaN(vol) || vol <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ أدخل الحجم</p>';
    return;
  }

  var ratios = {
    '1:3': { c:490, s:1.41, label:'1:3 — بلاط وتشطيب داخلي', use:'Floor tiling' },
    '1:4': { c:370, s:1.54, label:'1:4 — بناء عام', use:'General masonry' },
    '1:6': { c:252, s:1.68, label:'1:6 — بناء بلوك', use:'Block masonry (QCS Part 6)' }
  };
  var rx = ratios[ratio] || ratios['1:6'];

  var WASTE   = 1.30;
  var cement  = Math.ceil(rx.c * vol * WASTE);
  var sand    = (rx.s * vol * WASTE).toFixed(2);
  var cBags   = Math.ceil(cement / 50);

  el.innerHTML =
    '<div style="background:#f5eef8;border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:#8e44ad;font-size:15px;margin-bottom:12px;">🧱 ملاط ' + rx.label + ' — ' + vol + ' m³</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">' +
    '<tr style="background:#e8daef;"><td style="padding:6px 8px;font-weight:700;">المادة</td><td style="padding:6px 8px;font-weight:700;">الكمية</td></tr>' +
    '<tr><td style="padding:5px 8px;">إسمنت</td><td style="padding:5px 8px;font-weight:700;">' + cement + ' kg</td></tr>' +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">أكياس (50kg)</td><td style="padding:5px 8px;font-weight:700;color:#8e44ad;">' + cBags + ' كيس</td></tr>' +
    '<tr><td style="padding:5px 8px;">رمل</td><td style="padding:5px 8px;font-weight:700;">' + sand + ' m³</td></tr>' +
    '</table>' +
    '<div style="font-size:11px;color:#888;margin-top:8px;">📋 QCS 2024 Part 6 Section 3 | هدر 30% | الاستخدام: ' + rx.use + '</div></div>';
};

// ══════════════════════════════════════════════════════════
// 5. حاسبة حديد التسليح (Rebar)
// QCS 2024 Section 5 Part 4 + BS 4449 Grade B500B
// ══════════════════════════════════════════════════════════
window.calcRebarQty = function() {
  var dia   = parseInt(document.getElementById('reb-dia').value);
  var count = parseInt(document.getElementById('reb-count').value);
  var len   = parseFloat(document.getElementById('reb-len').value);
  var laps  = parseInt(document.getElementById('reb-lap').value) || 0;
  var el    = document.getElementById('reb-result');
  if (!el) return;
  el.style.display = 'block';

  if (isNaN(dia) || isNaN(count) || isNaN(len) || count <= 0 || len <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ أدخل القطر والعدد والطول</p>';
    return;
  }

  // وزن المتر الطولي لكل قطر (kg/m) — BS 4449
  var weights = {6:0.222, 8:0.395, 10:0.617, 12:0.888, 16:1.578, 20:2.466, 25:3.853, 32:6.313, 40:9.864};
  var wpm = weights[dia] || 0;
  if (wpm === 0) { el.innerHTML = '<p style="color:#e74c3c;">❌ قطر غير معروف</p>'; return; }

  // طول الوصلة Lap Length — QCS S5 P4: 40×Ø (تربة عادية) أو 50×Ø (زلزالي)
  var lapLen = (dia * 40 / 1000); // m
  var totalLapLen = laps * lapLen;

  var barLen   = len + totalLapLen;
  var totalLen = barLen * count;
  var totalKg  = totalLen * wpm;
  var waste    = totalKg * 0.03; // هدر 3%
  var grandKg  = totalKg + waste;
  var tons     = (grandKg / 1000).toFixed(3);

  // عدد الأسياخ من مصنع (12m standard)
  var barsFrom12m = Math.ceil(count * barLen / 12);

  el.innerHTML =
    '<div style="background:#fce4ec;border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:#c62828;font-size:15px;margin-bottom:12px;">🔩 حديد Ø' + dia + 'mm — ' + count + ' سيخ</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">' +
    '<tr style="background:#ffcdd2;"><td style="padding:6px 8px;font-weight:700;">البند</td><td style="padding:6px 8px;font-weight:700;">الكمية</td><td style="padding:6px 8px;font-weight:700;">الوحدة</td></tr>' +
    '<tr><td style="padding:5px 8px;">وزن المتر</td><td style="padding:5px 8px;font-weight:700;">' + wpm + '</td><td style="padding:5px 8px;">kg/m</td></tr>' +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">طول السيخ + وصلات</td><td style="padding:5px 8px;font-weight:700;">' + barLen.toFixed(2) + '</td><td style="padding:5px 8px;">م</td></tr>' +
    (laps > 0 ? '<tr><td style="padding:5px 8px;">Lap Length (40Ø)</td><td style="padding:5px 8px;font-weight:700;">' + (lapLen*1000).toFixed(0) + 'mm × ' + laps + '</td><td style="padding:5px 8px;">' + totalLapLen.toFixed(2) + ' م</td></tr>' : '') +
    '<tr style="background:#f9f9f9;"><td style="padding:5px 8px;">إجمالي الطول</td><td style="padding:5px 8px;font-weight:700;">' + totalLen.toFixed(1) + '</td><td style="padding:5px 8px;">م.ط</td></tr>' +
    '<tr><td style="padding:5px 8px;">الوزن الصافي</td><td style="padding:5px 8px;font-weight:700;">' + totalKg.toFixed(1) + '</td><td style="padding:5px 8px;">kg</td></tr>' +
    '<tr style="background:#ffcdd2;"><td style="padding:6px 8px;font-weight:700;">الوزن + هدر 3%</td><td style="padding:6px 8px;font-weight:700;font-size:15px;color:#c62828;">' + grandKg.toFixed(1) + ' kg (' + tons + ' طن)</td><td style="padding:6px 8px;"></td></tr>' +
    '<tr><td style="padding:5px 8px;">أسياخ 12م من المصنع</td><td style="padding:5px 8px;font-weight:700;">' + barsFrom12m + '</td><td style="padding:5px 8px;">حبة</td></tr>' +
    '</table>' +
    '<div style="font-size:11px;color:#888;margin-top:8px;">📋 QCS S5 P4 | BS 4449 B500B | Lap=40Ø | هدر 3%</div></div>';
};

// ══════════════════════════════════════════════════════════
// 6. حاسبة الاختبارات المطلوبة حسب الكمية
// QCS 2024 + Ashghal ITP frequency tables
// ══════════════════════════════════════════════════════════
window.calcTestFreq = function() {
  var material = document.getElementById('tst-material').value;
  var qty      = parseFloat(document.getElementById('tst-qty').value);
  var el       = document.getElementById('tst-result');
  if (!el) return;
  el.style.display = 'block';

  if (isNaN(qty) || qty <= 0) {
    el.innerHTML = '<p style="color:#e74c3c;">❌ أدخل الكمية</p>';
    return;
  }

  // جداول تكرار الاختبارات — QCS 2024 + Ashghal ITPs
  var tests = {
    concrete: {
      label: '🏗️ خرسانة (' + qty + ' m³)',
      unit: 'm³',
      items: [
        { name:'Cube Test (7+28 day)', freq: 50, unit:'m³', method:'BS EN 12390-3', note:'3 cubes لكل عينة' },
        { name:'Slump Test', freq: 1, unit:'حمولة', method:'BS EN 12350-2', note:'كل حمولة خلاط' },
        { name:'Temperature Check', freq: 1, unit:'حمولة', method:'—', note:'≤32°C عند الصب' },
        { name:'W/C Ratio Check', freq: 50, unit:'m³', method:'BS EN 12350-6', note:'max حسب Exposure Class' },
        { name:'Core Test (إذا فشل)', freq: 0, unit:'—', method:'BS EN 12504-1', note:'3 cores من العنصر المشكوك' },
      ]
    },
    asphalt: {
      label: '🛣️ إسفلت (' + qty + ' طن)',
      unit: 'طن',
      items: [
        { name:'Marshall Test (Plant)', freq: 250, unit:'طن', method:'ASTM D6927', note:'Stability + Flow + Va' },
        { name:'Core Sample (Field)', freq: 1000, unit:'m²', method:'BS EN 12697-6', note:'كثافة + سماكة' },
        { name:'Extraction / Gradation', freq: 500, unit:'طن', method:'ASTM D2172', note:'نسبة البيتومين + التدرج' },
        { name:'Temperature (Delivery)', freq: 1, unit:'حمولة', method:'—', note:'≥140°C عند الوصول' },
        { name:'Straightedge 3m', freq: 100, unit:'م.ط', method:'—', note:'≤5mm WC / ≤10mm BC' },
      ]
    },
    subbase: {
      label: '🪨 Subbase/Base (' + qty + ' m³)',
      unit: 'm³',
      items: [
        { name:'CBR (Soaked 4 days)', freq: 2000, unit:'m²', method:'ASTM D1883', note:'≥30% Sub / ≥80% Base' },
        { name:'Compaction (Sand Cone)', freq: 500, unit:'m²', method:'ASTM D1556', note:'≥98% MDD' },
        { name:'Gradation', freq: 1000, unit:'m³', method:'ASTM C136', note:'مطابقة للمغلف' },
        { name:'Atterberg Limits', freq: 0, unit:'مصدر', method:'ASTM D4318', note:'PI ≤6 Sub / ≤4 Base' },
        { name:'LA Abrasion', freq: 0, unit:'مصدر', method:'ASTM C131', note:'≤40% Sub / ≤25% Base' },
        { name:'Level Survey', freq: 25, unit:'م', method:'—', note:'±10mm' },
      ]
    },
    backfill: {
      label: '🏗️ ردم Backfill (' + qty + ' m³)',
      unit: 'm³',
      items: [
        { name:'Sand Cone Density', freq: 500, unit:'m²', method:'ASTM D1556', note:'≥95% MDD' },
        { name:'Proctor Test', freq: 0, unit:'مصدر', method:'ASTM D1557', note:'MDD + OMC تحديد' },
        { name:'CBR (Subgrade)', freq: 2000, unit:'m²', method:'ASTM D1883', note:'≥8%' },
        { name:'Level Check', freq: 50, unit:'م', method:'—', note:'±10mm' },
      ]
    },
    blocks: {
      label: '🧱 بلوك (' + qty + ' حبة)',
      unit: 'حبة',
      items: [
        { name:'Compressive Strength', freq: 10000, unit:'حبة', method:'BS EN 772-1', note:'3 عينات — ≥7 N/mm²' },
        { name:'Water Absorption', freq: 10000, unit:'حبة', method:'BS EN 772-11', note:'≤10%' },
        { name:'Dimensional Check', freq: 5000, unit:'حبة', method:'BS EN 772-16', note:'±2mm' },
        { name:'Visual Inspection', freq: 1, unit:'شحنة', method:'—', note:'لا تشققات / كسور' },
      ]
    }
  };

  var spec = tests[material];
  if (!spec) { el.innerHTML = '<p style="color:#e74c3c;">❌ اختر المادة</p>'; return; }

  var rows = '';
  spec.items.forEach(function(t) {
    var needed;
    if (t.freq === 0) needed = '1 (لكل مصدر)';
    else if (t.freq === 1) needed = qty + '+';
    else needed = Math.max(1, Math.ceil(qty / t.freq));

    rows += '<tr><td style="padding:5px 8px;">' + t.name + '</td>' +
      '<td style="padding:5px 8px;text-align:center;">كل ' + (t.freq === 0 ? 'مصدر' : t.freq === 1 ? 'حمولة' : t.freq + ' ' + t.unit) + '</td>' +
      '<td style="padding:5px 8px;font-weight:700;text-align:center;color:#2980b9;">' + needed + '</td>' +
      '<td style="padding:5px 8px;font-size:11px;color:#888;">' + t.method + '</td>' +
      '<td style="padding:5px 8px;font-size:11px;">' + t.note + '</td></tr>';
  });

  el.innerHTML =
    '<div style="background:#e8f8f5;border-radius:10px;padding:14px;margin-top:10px;">' +
    '<div style="font-weight:700;color:#16a085;font-size:15px;margin-bottom:12px;">🧪 ' + spec.label + '</div>' +
    '<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:12px;">' +
    '<tr style="background:#a3e4d7;"><td style="padding:6px 8px;font-weight:700;">الاختبار</td><td style="padding:6px 8px;font-weight:700;text-align:center;">التكرار</td><td style="padding:6px 8px;font-weight:700;text-align:center;">العدد المطلوب</td><td style="padding:6px 8px;font-weight:700;">الطريقة</td><td style="padding:6px 8px;font-weight:700;">ملاحظة</td></tr>' +
    rows +
    '</table></div>' +
    '<div style="font-size:11px;color:#888;margin-top:8px;">📋 QCS 2024 + Ashghal ITP Frequency Tables | الأعداد تقريبية — راجع ITP المشروع</div></div>';
};

})();
