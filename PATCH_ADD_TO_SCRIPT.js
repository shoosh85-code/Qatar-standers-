// ============================================================
// QATARSPEC PRO — PATCH v2.0
// أضف هذا الكود في آخر الـ <script> الموجود في index.html
// مباشرة قبل </script> الأخير
// ============================================================

// ============================================================
// FIX 1: VIDEO PERSISTENCE — IndexedDB (يبقى حتى بعد التنقل)
// ============================================================
const _VDB = {
  db: null,
  async init() {
    if (this.db) return;
    return new Promise(r => {
      const req = indexedDB.open('QSPVideos', 1);
      req.onupgradeneeded = e => e.target.result.createObjectStore('v', { keyPath: 'id' });
      req.onsuccess = e => { this.db = e.target.result; r(); };
      req.onerror = () => r();
    });
  },
  async save(id, file) {
    await this.init();
    const buf = await file.arrayBuffer();
    const blob = new Blob([buf], { type: file.type });
    return new Promise(r => {
      const tx = this.db.transaction('v', 'readwrite');
      tx.objectStore('v').put({ id, blob, name: file.name, size: file.size });
      tx.oncomplete = () => r(URL.createObjectURL(blob));
      tx.onerror = () => r(URL.createObjectURL(blob));
    });
  },
  async get(id) {
    await this.init();
    return new Promise(r => {
      const tx = this.db.transaction('v', 'readonly');
      const req = tx.objectStore('v').get(id);
      req.onsuccess = e => {
        const rec = e.target.result;
        r(rec ? { url: URL.createObjectURL(rec.blob), name: rec.name, size: rec.size } : null);
      };
      req.onerror = () => r(null);
    });
  }
};
_VDB.init();

// Override loadLocalVideo — يحفظ في IndexedDB
window.loadLocalVideo = async function(input, playerId, phId) {
  const file = input.files[0];
  if (!file) return;
  const id = input.id;
  try {
    const url = await _VDB.save(id, file);
    _setVideo(id, playerId, phId, url, file.name, file.size);
    if (typeof showToast === 'function') showToast('✅ تم حفظ الفيديو بشكل دائم');
  } catch(e) {
    const url = URL.createObjectURL(file);
    _setVideo(id, playerId, phId, url, file.name, file.size);
  }
};

function _setVideo(id, playerId, phId, url, name, size) {
  const p = document.getElementById(playerId);
  const ph = document.getElementById(phId);
  if (p) { p.src = url; p.style.display = 'block'; p.load(); }
  if (ph) ph.style.display = 'none';
  const inp = document.getElementById(id);
  if (inp) inp.setAttribute('data-saved', '1');
}

// Override _restoreVideosAfterDOMRebuild — يستعيد من IndexedDB
window._restoreVideosAfterDOMRebuild = async function() {
  const inputs = document.querySelectorAll('input[type="file"][accept*="video"]');
  for (const inp of inputs) {
    const id = inp.id;
    if (!id) continue;
    const stored = await _VDB.get(id);
    if (!stored) continue;
    const playerId = inp.getAttribute('data-player') || id.replace(/^vid-/, 'vid-player-');
    const phId = inp.getAttribute('data-ph') || id.replace(/^vid-/, 'vid-ph-');
    _setVideo(id, playerId, phId, stored.url, stored.name, stored.size);
    inp.onchange = function() { window.loadLocalVideo(this, playerId, phId); };
  }
};

// ============================================================
// FIX 2: CALCULATOR — Expanded material selector + full data
// ============================================================
const _EXT_TS = {
  subgrade: {
    n: 'Subgrade (QCS S6 P3 T3:1)',
    tests: [
      ['Standard Proctor MDD+OMC','عند تغيير نوع التربة','ASTM D698','HP','QCS S6 P3 T3:1','يُحدد MDD و OMC'],
      ['Grading Analysis (PSD)',2000,'م³','ASTM C136','W','QCS S6 P3 T3:1 P8','جدول 3:1 envelope'],
      ['Liquid Limit (LL)',2000,'م³','ASTM D4318','W','QCS S6 P3 T3:1','≤ 35%'],
      ['Plasticity Index (PI)',2000,'م³','ASTM D4318','W','QCS S6 P3 T3:1','≤ 10%'],
      ['Linear Shrinkage (LS)',2000,'م³','BS 1377-2','W','QCS S6 P3 T3:1','≤ 3%'],
      ['Organic Content',2000,'م³','BS 1377-3','W','QCS S6 P3 T3:1','≤ 2%'],
      ['Sulphate SO₃',2000,'م³','BS 1377-3','W','QCS S6 P3 T3:1','≤ 0.5%'],
      ['Chloride',2000,'م³','BS 1377-3','W','QCS S6 P3 T3:1','≤ 0.6%'],
      ['Field Density (Sand Cone)',500,'م²','ASTM D1556','W','QCS S6 P3 T3:1','≥ 95% MDD (Std Proctor)'],
      ['Moisture Content w%',500,'م²','ASTM D2216','W','QCS S6 P3 T3:1','OMC ± 2%'],
      ['CBR Soaked 4 days',2000,'م²','ASTM D1883','HP','QCS S6 P3 T3:1 P8','≥ 15% (عادي) / ≥ 8% (Sabkha)'],
      ['Level Survey',25,'م ط','Total Station','HP','QCS S6 P3','± 10mm من التصميم'],
      ['Crossfall Check',25,'م ط','Template/Level','W','QCS S6 P3','2.5% ± 0.5%'],
    ]
  },
  subbase: {
    n: 'Subbase (QCS S6 P4 T4:1-4:3)',
    tests: [
      ['Grading Analysis T4:1',500,'م³','ASTM C136','W','QCS S6 P4 T4:1 P5','envelope جدول 4:1'],
      ['LA Abrasion',1000,'م³','ASTM C131','W','QCS S6 P4 T4:2 P6','≤ 40%'],
      ['Flakiness Index',500,'م³','BS 812 P105','W','QCS S6 P4 T4:2 P6','≤ 40%'],
      ['Elongation Index',500,'م³','BS 812 P105','W','QCS S6 P4 T4:2 P6','≤ 40%'],
      ['Fractured Faces 1+',500,'م³','ASTM D5821','W','QCS S6 P4 T4:2 P6','≥ 25%'],
      ['Water Absorption',500,'م³','ASTM C127','W','QCS S6 P4 T4:2 P6','≤ 3%'],
      ['Soundness MgSO₄',1000,'م³','ASTM C88','W','QCS S6 P4 T4:2 P6','≤ 18%'],
      ['Sulphate SO₃',1000,'م³','BS 1377-3','W','QCS S6 P4 T4:2 P6','≤ 0.5%'],
      ['Chloride',1000,'م³','BS 1377-3','W','QCS S6 P4 T4:2 P6','≤ 0.6%'],
      ['Plasticity Index PI',500,'م³','ASTM D4318','W','QCS S6 P4 T4:3 P7','≤ 6%'],
      ['Liquid Limit LL',500,'م³','ASTM D4318','W','QCS S6 P4 T4:3 P7','≤ 25%'],
      ['Sand Equivalent SE',500,'م³','ASTM D2419','W','QCS S6 P4 T4:3 P7','≥ 25%'],
      ['CBR Soaked 4d',2000,'م²','ASTM D1883','HP','QCS S6 P4 T4:3 P7','≥ 70% @ 98% MDD'],
      ['Field Density Sand Cone',500,'م²','ASTM D1556','W','QCS S6 P4 T4:3 P7','≥ 98% MDD'],
      ['Layer Thickness','100% كل طبقة','','Physical','W','QCS S6 P4 T4:3 P7','150–300mm مدكوك'],
      ['Level Survey',25,'م ط','Total Station','HP','QCS S6 P4','± 10mm'],
    ]
  },
  base: {
    n: 'Road Base (QCS S6 P4 T4:1-4:3)',
    tests: [
      ['Grading Analysis T4:1',500,'م³','ASTM C136','W','QCS S6 P4 T4:1 P5','Road Base envelope'],
      ['LA Abrasion',1000,'م³','ASTM C131','W','QCS S6 P4 T4:2 P6','≤ 30%'],
      ['Flakiness Index',500,'م³','BS 812 P105','W','QCS S6 P4 T4:2 P6','≤ 30%'],
      ['Elongation Index',500,'م³','BS 812 P105','W','QCS S6 P4 T4:2 P6','≤ 30%'],
      ['Fractured Faces 1+',500,'م³','ASTM D5821','W','QCS S6 P4 T4:2 P6','≥ 75%'],
      ['Fractured Faces 2+',500,'م³','ASTM D5821','W','QCS S6 P4 T4:2 P6','≥ 50%'],
      ['Water Absorption',500,'م³','ASTM C127','W','QCS S6 P4 T4:2 P6','≤ 2%'],
      ['Soundness MgSO₄',1000,'م³','ASTM C88','W','QCS S6 P4 T4:2 P6','≤ 12%'],
      ['Specific Gravity SSD','عند تغيير المصدر','','ASTM C127','W','QCS S6 P4 T4:2 P6','≥ 2.5'],
      ['Sulphate SO₃',1000,'م³','BS 1377-3','W','QCS S6 P4 T4:2 P6','≤ 0.5%'],
      ['Chloride',1000,'م³','BS 1377-3','W','QCS S6 P4 T4:2 P6','≤ 0.6%'],
      ['Plasticity Index PI',500,'م³','ASTM D4318','W','QCS S6 P4 T4:3 P7','≤ 4%'],
      ['Sand Equivalent SE',500,'م³','ASTM D2419','W','QCS S6 P4 T4:3 P7','≥ 35%'],
      ['CBR Soaked 4d',2000,'م²','ASTM D1883','HP','QCS S6 P4 T4:3 P7','≥ 80% @ 98% MDD'],
      ['Field Density Sand Cone',500,'م²','ASTM D1556','W','QCS S6 P4 T4:3 P7','≥ 98% MDD'],
      ['Layer Thickness','100% كل طبقة','','Physical','W','QCS S6 P4 T4:3 P7','150–250mm مدكوك'],
      ['Level Survey',25,'م ط','Total Station','HP','QCS S6 P4','± 8mm'],
    ]
  },
  asphalt_bc: {
    n: 'Asphalt Binder Course (QCS S6 P5)',
    tests: [
      ['JMF Approval','مرة لكل Mix','','QCS S6 P5','HP','QCS S6 P5','معتمد قبل الإنتاج'],
      ['Plant Calibration','قبل الإنتاج','','QCS S6 P5 P34','HP','QCS S6 P5','Calibration Report'],
      ['Delivery Temperature','كل حمولة','','QCS S6 P5 P28','W','QCS S6 P5 P28','≥ 135°C (Non-PMB) / ≥ 145°C (PMB)'],
      ['Bitumen Extraction',200,'طن','ASTM D2172','W','QCS S6 P5 T5:10 P17','JMF ± 0.3%'],
      ['Gradation Analysis',200,'طن','ASTM C136','W','QCS S6 P5 T5:10 P17','JMF ± Tolerance T5:10'],
      ['Marshall Stability',200,'طن','ASTM D1559','HP','QCS S6 P5 T5:6 P15','≥ 8.0 kN (BC-B) / ≥ 9.0 kN (BC-A)'],
      ['Marshall Flow',200,'طن','ASTM D1559','W','QCS S6 P5 T5:6 P15','2–4 mm'],
      ['Air Voids Va',200,'طن','ASTM D3203','W','QCS S6 P5 T5:6 P15','3–5%'],
      ['VMA',200,'طن','Calculation','W','QCS S6 P5 T5:6 P15','≥ 14%'],
      ['TSR Moisture Sensitivity','مرة عند JMF','','AASHTO T283','HP','QCS S6 P5 T5:6 P15','≥ 75% (BC-B) / ≥ 80% (BC-A)'],
      ['Core Density',1000,'م²','ASTM D6927','HP','QCS S6 P5 T5:11 P18','≥ 96% TMD (كل كور) / ≥ 97% TMD (متوسط)'],
      ['Straightedge 3m',100,'م ط','QCS S6 P5','W','QCS S6 P5','≤ 5mm'],
      ['Level Survey',25,'م ط','Total Station','W','QCS S6 P5','± 8mm'],
    ]
  },
  asphalt_wc: {
    n: 'Asphalt Wearing Course (QCS S6 P5)',
    tests: [
      ['JMF Approval','مرة لكل Mix','','QCS S6 P5','HP','QCS S6 P5','معتمد قبل الإنتاج'],
      ['Trial Section ≥50m','قبل الإنتاج الكامل','','QCS S6 P5 Cl.5.7.3','HP','QCS S6 P5','معتمد من المهندس'],
      ['PSV — Polished Stone Value','عند JMF / تغيير المصدر','','BS 812 P114','HP','QCS S6 P5 T5:2 P10','≥ 55 (WC فقط)'],
      ['Delivery Temperature','كل حمولة','','QCS S6 P5 P28','W','QCS S6 P5 P28','≥ 135°C (Non-PMB) / ≥ 145°C (PMB)'],
      ['Bitumen Extraction',200,'طن','ASTM D2172','W','QCS S6 P5 T5:10 P17','JMF ± 0.3%'],
      ['Marshall Stability',200,'طن','ASTM D1559','HP','QCS S6 P5 T5:6 P15','≥ 9.0 kN'],
      ['Marshall Flow',200,'طن','ASTM D1559','W','QCS S6 P5 T5:6 P15','2–4 mm'],
      ['Air Voids Va',200,'طن','ASTM D3203','W','QCS S6 P5 T5:9 P16','3–5% | Design Target: 4.0%'],
      ['VMA',200,'طن','Calculation','W','QCS S6 P5 T5:6 P15','≥ 15%'],
      ['TSR Moisture Sensitivity','مرة عند JMF','','AASHTO T283','HP','QCS S6 P5 T5:6 P15','≥ 80%'],
      ['Core Density',1000,'م²','ASTM D6927','HP','QCS S6 P5 T5:11 P18','≥ 96% TMD كل كور / ≥ 97% متوسط'],
      ['Straightedge 3m',100,'م ط','QCS S6 P5','W','QCS S6 P5 P29','≤ 3mm (PMB) / ≤ 5mm (Non-PMB)'],
      ['IRI International Roughness Index',400,'م ط','PWA IAN 013','HP','QCS S6 P5','≤ 0.9 m/km (PMB) / ≤ 1.5 m/km (Non-PMB)'],
      ['Level Survey',25,'م ط','Total Station','HP','QCS S6 P5','± 6mm'],
    ]
  },
  concrete: {
    n: 'Concrete (QCS S5 P4)',
    tests: [
      ['Mix Design JMF Approval','مرة لكل Mix','','QCS S5 P4','HP','QCS S5 P4','معتمد قبل الإنتاج'],
      ['Aggregate Sulphate SO₃',500,'م³','BS 1377-3','W','QCS S5 P4','≤ 0.4%'],
      ['Aggregate Chloride',500,'م³','BS 1377-3','W','QCS S5 P4','≤ 0.04%'],
      ['Slump Test',50,'م³','BS EN 12350-2','W','QCS S5 P4','عادي: 75-100mm | مضخة: 100-150mm'],
      ['Temperature Check','كل حمولة','','QCS S5 P4','W','QCS S5 P4','≤ 32°C عند الصب'],
      ['Cube Sampling 6 مكعبات',50,'م³','BS EN 12390','W','QCS S5 P4','3 لـ 7 يوم + 3 لـ 28 يوم'],
      ['Cube 7-Day Strength',50,'م³','BS EN 12390-3','HP','QCS S5 P4','≥ 70% fcu التصميمي'],
      ['Cube 28-Day Strength',50,'م³','BS EN 12390-3','HP','QCS S5 P4','≥ 100% fcu التصميمي'],
    ]
  },
  water_pipe: {
    n: 'Water Supply — مياه الشرب (KAHRAMAA)',
    tests: [
      ['Material Approval MAR','قبل كل توريد','','KAHRAMAA / ISO 4427','HP','KAHRAMAA','اعتماد قبل التوريد'],
      ['Yellow Marker Tape','100% قبل الردم','','KAHRAMAA Std','W','KAHRAMAA','أصفر — 300mm فوق الماسورة'],
      ['Pipe Separation from Sewer','100% مسح','','KAHRAMAA','HP','KAHRAMAA','≥ 1.0m أفقياً | مياه الشرب فوق'],
      ['Bedding Compaction',50,'م ط','ASTM D1556','W','QCS S8','≥ 90% MDD جانبي الماسورة'],
      ['Hydrostatic Pressure Test','كل Section ≤ 500m','','KAHRAMAA / BS EN 805','HP','KAHRAMAA','1.5 × PN / 2 hours / صفر انخفاض'],
      ['Chlorination','كل Section','','KAHRAMAA','HP','KAHRAMAA','≥ 50 mg/L / ≥ 24 hours'],
      ['Total Coliform','كل Section','','WHO / KAHRAMAA','HP','KAHRAMAA','0 CFU / 100 mL'],
      ['Turbidity','كل Section','','WHO / KAHRAMAA','HP','KAHRAMAA','≤ 1 NTU'],
      ['Residual Chlorine','كل Section بعد Flushing','','KAHRAMAA','HP','KAHRAMAA','0.2–0.5 mg/L'],
      ['Backfill Compaction',500,'م²','ASTM D1556','W','QCS S8','≥ 95% MDD'],
    ]
  },
  sewer_pipe: {
    n: 'Foul Sewer — صرف صحي (BS EN 1610)',
    tests: [
      ['Material Approval MAR','قبل كل توريد','','ISO 4435 / BS EN 295','HP','Ashghal','اعتماد قبل التوريد'],
      ['Pipe Gradient (Laser)',25,'م ط','Laser Level','HP','QCS S8 P2','حسب التصميم ± 3mm'],
      ['Green Marker Tape','100%','','Ashghal Std','W','QCS S8','أخضر — 300mm فوق الماسورة'],
      ['Bedding Compaction',50,'م ط','ASTM D1556','W','QCS S8 P2','≥ 90% MDD يدوي Pipe Zone'],
      ['Manhole Water Tightness','100% غرف','','QCS S8 P2','HP','QCS S8 P2','صفر تسريب / 24 hr'],
      ['Air Test','كل Section ≤ 500m','','BS EN 1610','HP','BS EN 1610','100mm WG / 5min / ≤ 25mm WG'],
      ['CCTV Inspection 100%','100% كل المواسير','','WRc / Ashghal','HP','Ashghal','Grade ≤ 2 مقبول'],
      ['Manhole Level Check','100% الغرف','','Survey','W','QCS S8','± 5mm من مستوى الطريق'],
      ['Backfill Compaction',500,'م²','ASTM D698','W','QCS S8','≥ 95% MDD'],
    ]
  },
  storm_water: {
    n: 'Storm Water — صرف سطحي (QCS S8 P3)',
    tests: [
      ['Material Approval MAR','قبل كل توريد','','BS 5911 / EN 13476','HP','Ashghal','اعتماد قبل التوريد'],
      ['Pipe Gradient (Laser)',25,'م ط','Laser Level','HP','QCS S8 P3','حسب التصميم ± 5mm'],
      ['Grey Marker Tape','100%','','Ashghal Std','W','QCS S8','رمادي — 300mm فوق الماسورة'],
      ['Bedding Compaction',50,'م ط','ASTM D1556','W','QCS S8 P3','≥ 90% MDD'],
      ['Gully Level Check','100% بالوعات','','Survey','W','Ashghal','± 5mm من مستوى الطريق'],
      ['Silt Trap Installation','قبل كل Outfall','','QCS S8 P3','HP','QCS S8 P3','Silt Trap موجود قبل كل مخرج'],
      ['CCTV Inspection 100%','100% قبل التسليم','','WRc / Ashghal','HP','Ashghal','Grade ≤ 2 مقبول'],
      ['Hydraulic Test','كل Section','','QCS S8 P3','HP','QCS S8 P3','صفر تسريب / 30 دقيقة'],
      ['Backfill Compaction',500,'م²','ASTM D1556','W','QCS S8','≥ 95% MDD'],
    ]
  },
  treated_water: {
    n: 'Treated Water — مياه معالجة (MME)',
    tests: [
      ['Material Approval — Purple بنفسجي','كل دفعة','','MME Std / ISO 4427','HP','MME','بنفسجي RAL 4001 إلزامي 100%'],
      ['Cross Connection Study Approval','مرة قبل التنفيذ','','MME Std','HP','MME','معتمد قبل التنفيذ'],
      ['Separation from Potable Water','100% كل Section','','MME / QCS S8','HP','MME','≥ 1.0m أفقياً | مياه الشرب فوق دائماً'],
      ['Purple Marker Tape','100%','','MME Std','HP','MME','بنفسجي RECLAIMED WATER — 300mm'],
      ['Double Check Valve','كل نقطة اتصال','','MME Std','HP','MME','موجود عند كل نقطة اتصال'],
      ['Warning Signs','100% نقاط الاستخدام','','MME Std','HP','MME','لافتة عند كل نقطة استخدام'],
      ['Hydrostatic Pressure Test','كل Section ≤ 500m','','QCS S8','HP','QCS S8','1.5 × PN / 2 hours / صفر انخفاض'],
      ['Cross Connection Test','كل Section — CRITICAL','','MME Std','HP','MME','صفر تلوث في مياه الشرب'],
      ['Water Quality BOD TSS EColi','كل Section','','MME Std','HP','MME','حسب MME Irrigation Standards'],
      ['Backfill Compaction',500,'م²','ASTM D1556','W','QCS S8','≥ 95% MDD'],
    ]
  },
  rebar: {
    n: 'Reinforcement Steel — Rebar (BS 4449)',
    tests: [
      ['Mill Certificate Review','كل دفعة / Heat Number','','BS 4449:2005','HP','BS 4449','Grade 500B مطابق'],
      ['Tensile Test fy + fu',25,'طن/قطر','BS 4449 / ISO 6892','HP','BS 4449','fy ≥ 500 N/mm² | fu ≥ 600 N/mm² | fu/fy ≥ 1.15'],
      ['Elongation Agt',25,'طن/قطر','BS 4449','HP','BS 4449','Agt ≥ 7.5% | Total Elongation ≥ 14%'],
      ['Bend Test 180°',25,'طن/قطر','BS 4449','W','BS 4449','بدون تشقق'],
      ['Re-bend Test',25,'طن/قطر','BS 4449','W','BS 4449','بدون تشقق'],
      ['Mass per Metre',25,'طن/قطر','BS 4449','W','BS 4449','± 4.5% من القيمة النظرية'],
    ]
  }
};

// Patch calcFreq to use extended data
window.calcFreq = function() {
  const matEl = document.getElementById('ts-mat');
  const qtyEl = document.getElementById('ts-qty');
  const unitEl = document.getElementById('ts-unit');
  const resultEl = document.getElementById('ts-result-box');
  if (!matEl || !matEl.value || !qtyEl || !qtyEl.value || !resultEl) return;

  const material = matEl.value;
  const qty = parseFloat(qtyEl.value);
  const unit = unitEl ? unitEl.value : 'm2';
  const data = _EXT_TS[material];
  if (!data || isNaN(qty) || qty <= 0) { resultEl.style.display = 'none'; return; }

  let rows = '', total = 0;
  data.tests.forEach(t => {
    const [name, freq, freqUnit, std, type, ref, limit] = t;
    let numStr = '';
    if (typeof freq === 'number') { const n = Math.ceil(qty / freq); total += n; numStr = n + '×'; }
    else numStr = freq;
    const color = type === 'HP' ? '#e74c3c' : '#f1c40f';
    rows += `<tr>
      <td>${name}</td>
      <td style="text-align:center;color:var(--gold);font-weight:700;">${numStr}</td>
      <td style="font-size:10px;color:var(--text3);">${freqUnit || ''}</td>
      <td style="font-size:10px;">${limit}</td>
      <td style="font-size:10px;color:var(--text3);">${std}</td>
      <td style="font-size:10px;color:var(--text3);">${ref}</td>
      <td style="color:${color};font-weight:700;font-size:10px;text-align:center;">${type === 'HP' ? '🔴 H' : '🟡 W'}</td>
    </tr>`;
  });

  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:10px;margin-bottom:10px;">
      <div style="color:var(--gold);font-weight:700;font-size:13px;">📋 الاختبارات المطلوبة لـ ${qty} ${unit} من ${data.n}</div>
      ${total > 0 ? `<div style="color:var(--text3);font-size:11px;margin-top:4px;">إجمالي الاختبارات: <strong style="color:var(--gold2);">${total}</strong></div>` : ''}
    </div>
    <div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
      <tr style="background:rgba(122,21,21,0.7);">
        <th>الاختبار</th><th>العدد</th><th>التكرار</th><th>حد القبول</th><th>المعيار</th><th>المرجع</th><th>Type</th>
      </tr>${rows}
    </table></div>`;
};

// Update material selector with all materials
(function updateSel() {
  const s = document.getElementById('ts-mat');
  if (!s) return;
  const opts = Object.entries(_EXT_TS).map(([k,v]) => `<option value="${k}">${v.n}</option>`).join('');
  s.innerHTML = '<option value="">-- اختر المادة --</option>' + opts;
})();

// ============================================================
// FIX 3: TMP ITP — add to detailData
// ============================================================
if (typeof detailData !== 'undefined') {
  detailData['tmp_itp'] = {
    title: '📋 ITP — Traffic Management Plan',
    content: `
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 Ashghal TMP Guidelines | MMUP Standards | Qatar
</div>
<h3>📋 ITP — خطة إدارة حركة المرور</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>TMP Submission</td><td>Ashghal TMP</td><td>تقديم ≥ 14 يوم قبل البدء</td><td>Per Phase</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>TMP Document</td></tr>
<tr><td>1.2</td><td>Ashghal Written Approval</td><td>Ashghal</td><td>موافقة خطية قبل البدء</td><td>Per Phase</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approval Letter</td></tr>
<tr><td>1.3</td><td>Traffic Engineer Named</td><td>Ashghal TMP</td><td>مهندس مرور معتمد + TMP Officer</td><td>مرة</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Personnel List</td></tr>
<tr><td>2.1</td><td>Signs Installation</td><td>MMUP Signs Manual</td><td>كاملة + صحيحة + مضاءة</td><td>Daily</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Daily Inspection</td></tr>
<tr><td>2.2</td><td>Barriers Stability</td><td>BS EN 1317</td><td>ثابتة — لا تهجير</td><td>Daily</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Daily Report</td></tr>
<tr><td>2.3</td><td>Lane Width Check</td><td>Ashghal TMP</td><td>≥ 3.0m للمركبات / ≥ 3.5m شاحنات</td><td>Before opening</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Survey Record</td></tr>
<tr><td>2.4</td><td>Work Zone Speed</td><td>Ashghal TMP</td><td>خفض 20-40 كم/ساعة من السرعة الأصلية</td><td>Before opening</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Signs Check</td></tr>
<tr><td>2.5</td><td>Night Lighting Check</td><td>MMUP</td><td>≥ 50 lux في منطقة العمل</td><td>Per night shift</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Lux Measurement</td></tr>
<tr><td>2.6</td><td>Cones Spacing</td><td>Ashghal TMP</td><td>كل 5m في منطقة التحويل</td><td>Before opening</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Inspection Record</td></tr>
<tr><td>2.7</td><td>Arrow Board</td><td>Ashghal TMP</td><td>Solar powered عند كل تحويل رئيسي</td><td>Before opening</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>3.1</td><td>Incident Recording</td><td>Ashghal</td><td>تسجيل فوري + تقرير Ashghal</td><td>Per incident</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Incident Report</td></tr>
<tr><td>3.2</td><td>Weekly TMP Review</td><td>Ashghal TMP</td><td>مراجعة + تحديث + توثيق</td><td>Weekly</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Meeting Minutes</td></tr>
<tr><td>4.1</td><td>Night Work Permit</td><td>Ashghal</td><td>إذن خاص للأعمال الليلية</td><td>Per night</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Night Permit</td></tr>
<tr><td>4.2</td><td>TMP Closure Inspection</td><td>Ashghal</td><td>إزالة كل علامات TMP + تنظيف</td><td>End of works</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Closure Certificate</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness Point | <strong style="color:#2ecc71;">R</strong> = Review
</div>`
  };

  // Link TMP ITP from traffic_management_plan card
  if (detailData['traffic_management_plan'] && !detailData['traffic_management_plan'].content.includes('tmp_itp')) {
    detailData['traffic_management_plan'].content +=
      `<div style="margin-top:12px;"><div onclick="openDetail('tmp_itp')" style="background:rgba(231,76,60,0.12);border:1px solid rgba(231,76,60,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:#e74c3c;font-weight:700;font-size:15px;">ITP Traffic Management Plan</div></div></div>`;
  }
}

// ============================================================
// FIX 4: openDetail override — always restore videos + language
// ============================================================
(function() {
  const _orig = window.openDetail;
  window.openDetail = function(key) {
    if (_orig) _orig(key);
    setTimeout(async function() {
      await window._restoreVideosAfterDOMRebuild();
      if (typeof setLang === 'function') setLang(window.currentLang || 'ar');
    }, 80);
  };
  const _origBack = window.goBack;
  window.goBack = function() {
    if (_origBack) _origBack();
    setTimeout(async function() {
      await window._restoreVideosAfterDOMRebuild();
      if (typeof setLang === 'function') setLang(window.currentLang || 'ar');
    }, 80);
  };
})();

console.log('✅ QatarSpec Pro PATCH v2.0 — All fixes applied');
