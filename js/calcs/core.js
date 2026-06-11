// QatarSpec Pro — Core Calculator Engine
// الدوال المشتركة: UI helpers + switch + testing scheduler
// @see QCS 2024


// ── _calcField ──
function _calcField(id, label, placeholder, unit) {
  return '<div class="calc-row"><span class="calc-label">' + label + '</span>' +
    '<input class="calc-input" id="' + id + '" type="number" placeholder="' + placeholder + '" step="any">' +
    (unit ? '<span class="calc-unit">' + unit + '</span>' : '') + '</div>';
}

// ── _calcSelect ──
function _calcSelect(id, label, opts) {
  return '<div class="calc-row"><span class="calc-label">' + label + '</span>' +
    '<select class="calc-select" id="' + id + '">' +
    opts.map(function(o){ return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('') +
    '</select></div>';
}

// ── _calcBtn ──
function _calcBtn(fn, label) {
  return '<button class="calc-btn" onclick="' + fn + '">' + label + '</button>';
}

// ── _calcResult ──
function _calcResult(id) {
  return '<div class="calc-result" id="' + id + '"></div>';
}

// ── _section ──
function _section(id, title, inner) {
  return '<div class="calc-section" id="calc-' + id + '"><div class="calc-title">' + title + '</div>' + inner + '</div>';
}

// ── _tabs ──
function _tabs(catId, tabs) {
  return '<div class="calc-tabs">' + tabs.map(function(t,i){
    return '<div class="calc-tab' + (i===0?' active':'') + '" onclick="switchCalc(\'' + t[0] + '\',this)">' + t[1] + '</div>';
  }).join('') + '</div>';
}

// ── initCalcPanels ──
function initCalcPanels() {
  // ── ROADS ──────────────────────────────────────────────────
  const roadsEl = document.getElementById('cat-roads');
  if (roadsEl && !roadsEl.dataset.built) {
    roadsEl.dataset.built = '1';
    roadsEl.innerHTML =
      _tabs('roads',[['comp-r','🔵 Compaction'],['cbr-r','🟤 CBR'],['att-r','📊 Atterberg'],['la-r','💪 LA Abrasion'],['fli-r','🔷 Flakiness'],['se-r','🟡 Sand Eq.'],['asp-r','🛣️ Asphalt']]) +
      _section('comp-r','🔵 Compaction — ضغط الطبقة',
        _calcSelect('comp-layer','الطبقة / Layer',[['95','Subgrade (≥95% MDD)'],['98','Subbase (≥98% MDD)'],['98','Base Course (≥98% MDD)']]) +
        _calcField('comp-actual','الكثافة الحقلية (g/cm³)','e.g. 1.92','g/cm³') +
        _calcField('comp-mdd','MDD من Proctor','e.g. 2.01','g/cm³') +
        _calcBtn('calcCompaction()','احسب النتيجة ✅') + _calcResult('comp-result')) +
      _section('cbr-r','🟤 CBR',
        _calcSelect('cbr-layer','الطبقة',[['8','Subgrade (≥8%)'],['70','Subbase (≥70%)'],['80','Base Course (≥80%)']]) +
        _calcField('cbr-val','CBR Soaked (4 أيام)','e.g. 75','%') +
        _calcBtn('calcCBR()','احسب CBR') + _calcResult('cbr-result')) +
      _section('att-r','📊 Atterberg Limits',
        _calcSelect('att-layer','الطبقة',[['subgrade','Subgrade (PI≤10%, LL≤35%)'],['subbase','Subbase (PI≤6%)'],['base','Base Course (PI≤4%)']]) +
        _calcField('att-ll','Liquid Limit (LL)','e.g. 28','%') +
        _calcField('att-pl','Plastic Limit (PL)','e.g. 18','%') +
        _calcBtn('calcAtterberg()','احسب PI') + _calcResult('att-result')) +
      _section('la-r','💪 LA Abrasion',
        _calcSelect('la-layer','الطبقة',[['30','Subbase (≤30%)'],['25','Base Course (≤25%)']]) +
        _calcField('la-val','نتيجة LA Abrasion','e.g. 22','%') +
        _calcBtn('calcLA()','احسب') + _calcResult('la-result')) +
      _section('fli-r','🔷 Flakiness Index',
        _calcSelect('fli-layer','الطبقة',[['35','Subbase (≤35%)'],['25','Base Course (≤25%)']]) +
        _calcField('fli-val','Flakiness Index','e.g. 20','%') +
        _calcBtn('calcFlakiness()','احسب') + _calcResult('fli-result')) +
      _section('se-r','🟡 Sand Equivalent',
        _calcSelect('se-layer','الطبقة',[['30','Subbase (≥30%)'],['45','Base Course (≥45%)']]) +
        _calcField('se-val','Sand Equivalent','e.g. 40','%') +
        _calcBtn('calcSandEq()','احسب') + _calcResult('se-result')) +
      _section('asp-r','🛣️ Asphalt — Marshall + Core',
        _calcSelect('asp-type-r','نوع الطبقة',[['bc','Binder Course'],['wc','Wearing Course']]) +
        _calcField('asp-stab','Marshall Stability','e.g. 9.2','kN') +
        _calcField('asp-flow','Flow','e.g. 3.5','mm') +
        _calcField('asp-va','Air Voids Va','e.g. 4.1','%') +
        _calcField('asp-core','Core Density','e.g. 97.8','% TMD') +
        _calcField('asp-temp','Temp عند التسليم','e.g. 145','°C') +
        _calcBtn('calcAsphaltFull()','فحص كامل للإسفلت') + _calcResult('asp-result'));
    // hide non-first sections
    roadsEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }

  // ── UTILITIES ──────────────────────────────────────────────
  const utilEl = document.getElementById('cat-utilities');
  if (utilEl && !utilEl.dataset.built) {
    utilEl.dataset.built = '1';
    utilEl.innerHTML =
      _tabs('utilities',[['pres-u','💧 Pressure Test'],['air-u','💨 Air Test'],['cov-u','📏 Cover Depth'],['trench-u','⛏️ Trench Compact.']]) +
      _section('pres-u','💧 Hydrostatic Pressure Test — مواسير المياه',
        _calcField('pres-pn','Pipe PN (Nominal Pressure)','e.g. 16','bar') +
        _calcField('pres-act','الضغط الفعلي المُطبَّق','e.g. 24','bar') +
        _calcField('pres-drop','انخفاض الضغط خلال 2hr','e.g. 0.3','bar') +
        _calcField('pres-dur','مدة الاختبار الفعلية','e.g. 120','دقيقة') +
        _calcBtn('calcPressureTest()','تحقق من الاختبار') + _calcResult('pres-result')) +
      _section('air-u','💨 Air Test — مواسير الصرف الصحي',
        _calcField('air-pres','الضغط الأولي','e.g. 100','mmWG') +
        _calcField('air-drop','الانخفاض خلال 5 دقائق','e.g. 8','mmWG') +
        _calcField('air-dia','قطر الماسورة DN','e.g. 300','mm') +
        _calcBtn('calcAirTest()','تحقق من Air Test') + _calcResult('air-result')) +
      _section('cov-u','📏 Cover Depth — عمق التغطية',
        _calcSelect('cov-net','نوع الشبكة',[['water','مياه شرب (≥1.0m)'],['sewer','صرف صحي (≥1.2m)'],['storm','تصريف سطحي (≥0.9m)'],['elec','كهرباء KAHRAMAA (≥0.8m)']]) +
        _calcField('cov-act','عمق الغطاء الفعلي','e.g. 1.1','متر') +
        _calcBtn('calcCoverDepth()','تحقق من العمق') + _calcResult('cov-result')) +
      _section('trench-u','⛏️ Trench Backfill Compaction',
        _calcSelect('trench-zone','المنطقة',[['haunching','Haunching Zone (≥95% MDD)'],['initial','Initial Backfill (≥95% MDD)'],['final','Final Backfill (≥98% MDD)']]) +
        _calcField('trench-act','الكثافة الحقلية','e.g. 1.88','g/cm³') +
        _calcField('trench-mdd','MDD (Proctor)','e.g. 1.95','g/cm³') +
        _calcBtn('calcTrenchCompact()','تحقق من الضغط') + _calcResult('trench-result'));
    utilEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }

  // ── STRUCTURAL ─────────────────────────────────────────────
  const strEl = document.getElementById('cat-structural');
  if (strEl && !strEl.dataset.built) {
    strEl.dataset.built = '1';
    strEl.innerHTML =
      _tabs('structural',[['cube-s','🧱 Cube Strength'],['slump-s','💧 Slump'],['cover-s','📏 Cover Rebar'],['wc-s','⚗️ w/c Ratio'],['sul-s','🧪 Sulphate']]) +
      _section('cube-s','🧱 Concrete Cube Strength',
        _calcSelect('cube-grade','درجة الخرسانة',[['20','C20 (fcu=20 N/mm²)'],['25','C25 (fcu=25)'],['30','C30 (fcu=30)'],['35','C35 (fcu=35)'],['40','C40 (fcu=40)'],['45','C45 (fcu=45)'],['50','C50 (fcu=50)']]) +
        _calcSelect('cube-age','عمر العينة',[['7','7 يوم (≥70% fcu)'],['28','28 يوم (≥100% fcu)']]) +
        _calcField('cube-res','نتيجة Cube','e.g. 32','N/mm²') +
        _calcBtn('calcCubeStrength()','تحقق من المقاومة') + _calcResult('cube-result')) +
      _section('slump-s','💧 Slump Test',
        _calcSelect('slump-method','طريقة الصب',[['direct','صب مباشر (75-100mm)'],['pump','بمضخة (100-150mm)'],['special','Special Element (150-180mm) | QCS 2024 S5 Table 5.2.3']]) +
        _calcField('slump-val','قيمة Slump المقاسة','e.g. 120','mm') +
        _calcBtn('calcSlump()','تحقق من Slump') + _calcResult('slump-result')) +
      _section('cover-s','📏 Rebar Cover — غطاء الحديد',
        _calcSelect('cover-elem','نوع العنصر',[['foundation','Foundation on soil (75mm)'],['ext_col','External Column (40mm)'],['int_col','Internal Column (25mm)'],['ext_slab','External Slab (40mm)'],['int_slab','Internal Slab (20mm)'],['wall','Wall External (40mm)']]) +
        _calcField('cover-act','الغطاء المقاس','e.g. 38','mm') +
        _calcBtn('calcRebarCover()','تحقق من الغطاء') + _calcResult('cover-result')) +
      _section('wc-s','⚗️ w/c Ratio Check',
        _calcSelect('wc-env','بيئة التعرض',[['mild','Mild Internal (w/c≤0.55)'],['moderate','Moderate External (w/c≤0.50)'],['severe','Severe Chemical (w/c≤0.45)'],['marine','Marine/Splash (w/c≤0.40)'],['submerged','Submerged Marine (w/c≤0.38)']]) +
        _calcField('wc-water','كمية الماء','e.g. 155','kg/m³') +
        _calcField('wc-cement','كمية الأسمنت','e.g. 380','kg/m³') +
        _calcBtn('calcWCRatio()','احسب w/c') + _calcResult('wc-result')) +
      _section('sul-s','🧪 Sulphate Content',
        _calcSelect('sul-type-s','نوع العينة',[['soil','تربة — SO3 (≤0.5%)'],['water','مياه — SO4 (≤500 mg/L)'],['aggregate','ركام — SO3 (≤0.4%)']]) +
        _calcField('sul-val-s','نتيجة الاختبار','e.g. 0.3','') +
        _calcBtn('calcSulphate()','تحقق من الكبريتات') + _calcResult('sul-result'));
    strEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }

  // ── GEOTECH ────────────────────────────────────────────────
  const geoEl = document.getElementById('cat-geotech_calc');
  if (geoEl && !geoEl.dataset.built) {
    geoEl.dataset.built = '1';
    geoEl.innerHTML =
      _tabs('geotech_calc',[['spt-g','🔩 SPT N-Value'],['cbr-g','🟤 CBR Soil'],['pi-g','📊 PI Class'],['sul-g','🧪 Sulphate Class'],['bc-g','🏛️ Bearing Cap.']]) +
      _section('spt-g','🔩 SPT N-Value Classification',
        _calcSelect('spt-type','نوع التربة',[['sand','رمل / Sand'],['clay','طين / Clay']]) +
        _calcField('spt-val','N-Value من الحقل','e.g. 18','blows/300mm') +
        _calcField('spt-depth','العمق (م)','e.g. 5','م') +
        _calcBtn('calcSPT()','صنّف التربة') + _calcResult('spt-result') +
        '<div id="spt-profile" style="margin-top:12px;min-height:0;"></div>') +
      _section('cbr-g','🟤 CBR للتربة',
        _calcSelect('cbr-g-use','الاستخدام',[['subgrade','Subgrade Acceptance (≥8%)'],['foundation','Foundation Subgrade (≥15%)']]) +
        _calcField('cbr-g-val','CBR Soaked','e.g. 12','%') +
        _calcBtn('calcCBRGeo()','تحقق') + _calcResult('cbr-g-result')) +
      _section('pi-g','📊 Plasticity Index — تصنيف التربة',
        _calcField('pi-ll','Liquid Limit LL','e.g. 42','%') +
        _calcField('pi-pl','Plastic Limit PL','e.g. 24','%') +
        _calcBtn('calcPIClass()','صنّف PI') + _calcResult('pi-result')) +
      _section('sul-g','🧪 Sulphate Classification — بيئة قطر',
        _calcSelect('sul-g-type','نوع العينة',[['soil_pct','تربة SO3 %'],['water_mgl','مياه جوفية SO4 mg/L']]) +
        _calcField('sul-g-val','نتيجة الاختبار','e.g. 0.8','') +
        _calcBtn('calcSulphateClass()','صنّف + حدد الأسمنت') + _calcResult('sul-class-result')) +
      _section('bc-g','🏛️ Bearing Capacity (Meyerhof-SPT)',
        _calcField('bc-n','N60 (SPT corrected)','e.g. 20','blow') +
        _calcField('bc-b','عرض الأساس B','e.g. 1.5','m') +
        _calcBtn('calcBearingCap()','احسب القدرة التحملية') + _calcResult('bc-result'));
    geoEl.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
  }
}

// ── switchMainCat ──
function switchMainCat(cat, btn) {
  ['roads','utilities','structural','geotech_calc'].forEach(c => {
    const el = document.getElementById('cat-' + c);
    const tab = document.getElementById('main-tab-' + c);
    if (el) el.style.display = c === cat ? 'block' : 'none';
    if (tab) {
      if (c === cat) {
        tab.style.background = 'rgba(201,168,76,0.15)';
        tab.style.borderColor = 'rgba(201,168,76,0.3)';
        tab.style.color = 'var(--gold2)';
        tab.style.fontWeight = '700';
      } else {
        tab.style.background = 'var(--dark4)';
        tab.style.borderColor = 'var(--border)';
        tab.style.color = 'var(--text2)';
        tab.style.fontWeight = '400';
      }
    }
  });
  // Reset tabs in the activated category
  const catEl = document.getElementById('cat-' + cat);
  if (catEl) {
    catEl.querySelectorAll('.calc-section').forEach((s,i) => s.style.display = i===0 ? 'block' : 'none');
    catEl.querySelectorAll('.calc-tab').forEach((t,i) => { t.classList.toggle('active', i===0); });
  }
}

// ── switchCalc ──
function switchCalc(id, tab) {
  const parent = tab.closest('[id^="cat-"]');
  if (parent) {
    parent.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    parent.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  }
  const el = document.getElementById('calc-' + id);
  if (el) el.style.display = 'block';
  tab.classList.add('active');
}

// ── showResult ──
function showResult(elId, pass, value, required, detail, action) {
  let el = document.getElementById(elId);
  if (!el) return;
  // Determine state: pass / warning / fail
  let state = pass ? 'pass' : 'fail';
  // Compute warning zone: value within 5% of limit
  if (!pass && value !== null && required !== null) {
    let margin = Math.abs(value - required);
    let pct = required !== 0 ? (margin / Math.abs(required)) * 100 : 0;
    if (pct <= 5) state = 'warning';
  }
  const icon = state === 'pass' ? '✅' : state === 'warning' ? '⚠️' : '❌';
  const label = state === 'pass' ? 'PASS — مطابق للمواصفة' : state === 'warning' ? 'WARNING — قريب من الحد' : 'FAIL — لا يطابق المواصفة';
  // [SEC] XSS Fix — DOM construction آمن بدل innerHTML
  const _esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  el.style.display = 'block';
  el.className = 'calc-result ' + state;
  el.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'calc-result-header';
  const iconSpan = document.createElement('span');
  iconSpan.className = 'calc-result-icon';
  iconSpan.textContent = icon;
  const labelSpan = document.createElement('span');
  labelSpan.className = 'calc-result-text';
  labelSpan.textContent = label;
  header.appendChild(iconSpan);
  header.appendChild(labelSpan);
  el.appendChild(header);
  if (value !== null && required !== null) {
    const r1 = document.createElement('div'); r1.className = 'calc-result-row';
    const l1 = document.createElement('span'); l1.className = 'calc-result-label'; l1.textContent = 'القيمة الفعلية';
    const v1 = document.createElement('span'); v1.className = 'calc-result-val'; v1.textContent = _esc(value);
    r1.appendChild(l1); r1.appendChild(v1); el.appendChild(r1);
    const r2 = document.createElement('div'); r2.className = 'calc-result-row';
    const l2 = document.createElement('span'); l2.className = 'calc-result-label'; l2.textContent = 'الحد المطلوب';
    const v2 = document.createElement('span'); v2.className = 'calc-result-val'; v2.textContent = _esc(required);
    r2.appendChild(l2); r2.appendChild(v2); el.appendChild(r2);
  }
  const detailDiv = document.createElement('div');
  detailDiv.className = 'calc-result-detail';
  detailDiv.textContent = detail;
  el.appendChild(detailDiv);
  if (state !== 'pass' && action) {
    const actionDiv = document.createElement('div');
    actionDiv.className = 'calc-result-action';
    actionDiv.textContent = '🔧 الإجراء التصحيحي: ' + action;
    el.appendChild(actionDiv);
  }
  // ── رسم بياني — Chart.js addon (Pro) أو رسالة ترقية (Free) ──
  if (value !== null && required !== null && typeof window.QS !== 'undefined' && typeof window.QS.showCalcChart === 'function') {
    const numVal = parseFloat(String(value));
    const numReq = parseFloat(String(required));
    if (!isNaN(numVal) && !isNaN(numReq)) {
      // setTimeout لضمان أن DOM جاهز بعد التعديل
      setTimeout(function() { window.QS.showCalcChart(elId, numVal, numReq, detail || 'المقارنة', null, pass); }, 0);
    }
  }
}

// ── switchCalcMode ──
function switchCalcMode(mode, btn) {
  const freqPanel = document.getElementById('calc-freq-panel');
  const passPanel = document.getElementById('calc-pass-panel');
  const tabFreq = document.getElementById('calc-tab-freq');
  const tabPass = document.getElementById('calc-tab-pass');
  
  if (mode === 'freq') {
    if (freqPanel) freqPanel.style.display = 'block';
    if (passPanel) passPanel.style.display = 'none';
    if (tabFreq) { tabFreq.style.background = 'rgba(201,168,76,0.2)'; tabFreq.style.color = 'var(--gold)'; tabFreq.style.fontWeight = '700'; }
    if (tabPass) { tabPass.style.background = 'var(--dark4)'; tabPass.style.color = 'var(--text2)'; tabPass.style.fontWeight = '400'; }
  } else {
    if (freqPanel) freqPanel.style.display = 'none';
    if (passPanel) passPanel.style.display = 'block';
    if (tabPass) { tabPass.style.background = 'rgba(201,168,76,0.2)'; tabPass.style.color = 'var(--gold)'; tabPass.style.fontWeight = '700'; }
    if (tabFreq) { tabFreq.style.background = 'var(--dark4)'; tabFreq.style.color = 'var(--text2)'; tabFreq.style.fontWeight = '400'; }
  }
}

// ── calcFreq ──
function calcFreq() {
  calcTestScheduleCore('ts-mat','ts-qty','ts-unit','ts-result-box', false);
}

// ── calcTestSchedule ──
function calcTestSchedule() {
  calcTestScheduleCore('ts-material','ts-qty','ts-unit','ts-result', false);
}

// ── calcTestScheduleEn ──
function calcTestScheduleEn() {
  calcTestScheduleCore('ts-material-en','ts-qty-en','ts-unit-en','ts-result-en', true);
}

// ── TS_DATA — جداول تكرار الاختبارات QCS 2024 + Ashghal ITP ──
var TS_DATA = {
  subgrade: {
    name: 'Subgrade Soil', unit: 'm²',
    tests: [
      { test: 'Proctor Compaction (MDD + OMC)', freq_qty: 0, freq_unit: 'Per material source change', standard: 'ASTM D698', type: 'HP' },
      { test: 'Atterberg Limits (LL + PI)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D4318', type: 'W' },
      { test: 'Sulphate (SO3) + Chloride', freq_qty: 500, freq_unit: 'm³', standard: 'BS 1377', type: 'W' },
      { test: 'Field Density / Sand Cone (≥95% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D1556', type: 'W' },
      { test: 'CBR Soaked 4 days (≥8%)', freq_qty: 2000, freq_unit: 'm²', standard: 'ASTM D1883', type: 'HP' },
      { test: 'Level Survey (±10mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'HP' }
    ]
  },
  subbase: {
    name: 'Subbase Course', unit: 'm³',
    tests: [
      { test: 'Grading Analysis', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM C136', type: 'W' },
      { test: 'LA Abrasion (≤30%)', freq_qty: 1000, freq_unit: 'm³', standard: 'ASTM C131', type: 'W' },
      { test: 'Sand Equivalent (≥30%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D2419', type: 'W' },
      { test: 'Plasticity Index (≤6%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D4318', type: 'W' },
      { test: 'Field Density (≥98% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D1556', type: 'W' },
      { test: 'CBR Soaked 4 days (≥70%)', freq_qty: 2000, freq_unit: 'm²', standard: 'ASTM D1883', type: 'HP' }
    ]
  },
  base: {
    name: 'Road Base Course', unit: 'm³',
    tests: [
      { test: 'Grading Analysis (Table 4:1)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM C136', type: 'W' },
      { test: 'LA Abrasion (≤25%)', freq_qty: 1000, freq_unit: 'm³', standard: 'ASTM C131', type: 'W' },
      { test: 'Fractured Faces 1+ (≥95%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D5821', type: 'W' },
      { test: 'Sand Equivalent (≥45%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D2419', type: 'W' },
      { test: 'Plasticity Index (≤4%)', freq_qty: 500, freq_unit: 'm³', standard: 'ASTM D4318', type: 'W' },
      { test: 'Field Density (≥98% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D1556', type: 'W' },
      { test: 'CBR Soaked 4 days (≥80%)', freq_qty: 2000, freq_unit: 'm²', standard: 'ASTM D1883', type: 'HP' },
      { test: 'Level Survey (±8mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'HP' }
    ]
  },
  asphalt_bc: {
    name: 'Asphalt Binder Course', unit: 'طن',
    tests: [
      { test: 'Delivery Temperature (≥140°C)', freq_qty: 1, freq_unit: 'Every load', standard: 'QCS 2024 S8 P5', type: 'W' },
      { test: 'Bitumen Extraction (JMF ±0.3%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D2172', type: 'W' },
      { test: 'Gradation Analysis', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM C136', type: 'W' },
      { test: 'Marshall Stability (≥8kN) + Flow', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D1559', type: 'HP' },
      { test: 'Air Voids Va (3-5%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D3203', type: 'W' },
      { test: 'Core Density (≥97% TMD)', freq_qty: 1000, freq_unit: 'm²', standard: 'ASTM D6927', type: 'HP' },
      { test: 'Level Survey (±8mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'W' }
    ]
  },
  asphalt_wc: {
    name: 'Asphalt Wearing Course', unit: 'طن',
    tests: [
      { test: 'Delivery Temperature (≥130°C / ≥145°C PMB)', freq_qty: 1, freq_unit: 'Every load', standard: 'QCS S6 P5', type: 'W' },
      { test: 'Bitumen Extraction (JMF ±0.3%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D2172', type: 'W' },
      { test: 'Marshall Stability (≥9kN) + Flow', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D1559', type: 'HP' },
      { test: 'Air Voids Va (3-5%)', freq_qty: 200, freq_unit: 'tonne', standard: 'ASTM D3203', type: 'W' },
      { test: 'Core Density (≥97% TMD)', freq_qty: 1000, freq_unit: 'm²', standard: 'ASTM D6927', type: 'HP' },
      { test: 'Straightedge 3m (≤3mm PMB / ≤5mm)', freq_qty: 100, freq_unit: 'm LM', standard: 'QCS S6 P5', type: 'W' },
      { test: 'IRI Measurement', freq_qty: 400, freq_unit: 'm LM', standard: 'PWA IAN 013', type: 'HP' },
      { test: 'Level Survey (±6mm)', freq_qty: 25, freq_unit: 'm LM', standard: 'Total Station', type: 'HP' }
    ]
  },
  concrete: {
    name: 'Concrete', unit: 'm³',
    tests: [
      { test: 'Slump Test', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12350', type: 'W' },
      { test: 'Temperature Check (≤32°C)', freq_qty: 1, freq_unit: 'Every load', standard: 'QCS S5', type: 'W' },
      { test: 'Cube Samples (6 cubes)', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12390', type: 'W' },
      { test: '7-Day Cube Result (≥70% fcu)', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12390', type: 'HP' },
      { test: '28-Day Cube Result (≥fcu)', freq_qty: 50, freq_unit: 'm³', standard: 'BS EN 12390', type: 'HP' },
      { test: 'Rebar Cover Check', freq_qty: 0, freq_unit: 'Per element after strike', standard: 'QCS S5', type: 'W' }
    ]
  },
  water_pipe: {
    name: 'Water Supply Pipe', unit: 'm LM',
    tests: [
      { test: 'Bedding Compaction (≥90% MDD)', freq_qty: 50, freq_unit: 'm LM', standard: 'ASTM D1556', type: 'W' },
      { test: 'Backfill Compaction (≥95% MDD)', freq_qty: 500, freq_unit: 'm²', standard: 'ASTM D698', type: 'W' },
      { test: 'Hydrostatic Pressure Test (1.5×PN / 2hr)', freq_qty: 0, freq_unit: 'Per section (500m max)', standard: 'KAHRAMAA', type: 'HP' },
      { test: 'Chlorination (≥50ppm / ≥24hr)', freq_qty: 0, freq_unit: 'Per section', standard: 'KAHRAMAA', type: 'HP' },
      { test: 'Water Quality (Coliform=0 / Turbidity≤1NTU)', freq_qty: 0, freq_unit: 'Per section', standard: 'KAHRAMAA', type: 'HP' }
    ]
  },
  sewer_pipe: {
    name: 'Foul Sewer Pipe', unit: 'm LM',
    tests: [
      { test: 'Bedding Compaction (≥90% MDD)', freq_qty: 50, freq_unit: 'm LM', standard: 'ASTM D1556', type: 'W' },
      { test: 'Air Test (100mm WG / 5min / ≤25mm drop)', freq_qty: 0, freq_unit: 'Per section (500m max)', standard: 'BS EN 1610', type: 'HP' },
      { test: 'CCTV Survey (Grade ≤ 2)', freq_qty: 0, freq_unit: '100% of pipes', standard: 'WRc', type: 'HP' },
      { test: 'Manhole Level (±5mm)', freq_qty: 0, freq_unit: '100% of manholes', standard: 'Survey', type: 'W' }
    ]
  },
  rebar: {
    name: 'Reinforcement Steel', unit: 'طن',
    tests: [
      { test: 'Mill Certificate Review (fy, fu, Elongation)', freq_qty: 0, freq_unit: 'Each heat number', standard: 'BS 4449', type: 'HP' },
      { test: 'Third Party Tensile Test', freq_qty: 25, freq_unit: 'tonne', standard: 'BS 4449', type: 'HP' },
      { test: 'Bend Test (180° cold)', freq_qty: 25, freq_unit: 'tonne', standard: 'BS 4449', type: 'W' }
    ]
  }
};

// ── calcTestScheduleCore ──
function calcTestScheduleCore(matId, qtyId, unitId, resultId, isEn) {
  const mat = document.getElementById(matId);
  const qty = parseFloat(document.getElementById(qtyId).value);
  const resultDiv = document.getElementById(resultId);
  
  if (!mat || !mat.value || !qty || qty <= 0) {
    if (resultDiv) resultDiv.style.display = 'none';
    return;
  }
  
  const material = mat.value;
  let data = TS_DATA[material];
  if (!data) return;
  
  let rows = '';
  let totalTests = 0;
  
  data.tests.forEach(function(t) {
    let num = '-';
    if (t.freq_qty > 0) {
      num = Math.ceil(qty / t.freq_qty);
      totalTests += num;
    } else {
      num = t.freq_unit;
    }
    const typeColor = t.type === 'HP' ? '#e74c3c' : '#f39c12';
    const typeLabel = t.type === 'HP' ? '🔴 Hold Point' : '🟡 Witness';
    rows += '<tr><td>' + t.test + '</td>' +
      '<td>' + t.freq_unit + '</td>' +
      '<td style="text-align:center;font-weight:700;color:var(--gold);">' + (typeof num === 'number' ? num + 'x' : num) + '</td>' +
      '<td>' + t.standard + '</td>' +
      '<td style="color:' + typeColor + ';font-weight:700;">' + typeLabel + '</td></tr>';
  });
  
  let title = isEn ? 
    'Required Tests for ' + qty + ' ' + document.getElementById(unitId).value + ' of ' + data.name :
    'الاختبارات المطلوبة لـ ' + qty + ' ' + document.getElementById(unitId).value + ' من ' + data.name;
  
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = 
    '<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:10px;margin-bottom:10px;">' +
    '<div style="color:var(--gold);font-weight:700;font-size:13px;">📋 ' + title + '</div>' +
    (typeof totalTests === 'number' && totalTests > 0 ? '<div style="color:var(--text3);font-size:11px;margin-top:4px;">إجمالي الاختبارات العددية: ' + totalTests + ' اختبار</div>' : '') +
    '</div>' +
    '<div style="overflow-x:auto;">' +
    '<table class="dm-table">' +
    '<tr><th>' + (isEn ? 'Test' : 'الاختبار') + '</th><th>' + (isEn ? 'Frequency' : 'التكرار') + '</th>' +
    '<th>' + (isEn ? 'Qty Required' : 'العدد المطلوب') + '</th><th>' + (isEn ? 'Standard' : 'المعيار') + '</th>' +
    '<th>Type</th></tr>' + rows + '</table></div>';
}

// ── switchCalcTab ──
function switchCalcTab(tab, btn) {
  ['passfail','batch','history','freq','materials'].forEach(t => {
    const el = document.getElementById('calc-tab-'+t);
    const b = document.getElementById('ctab-'+t);
    if (el) el.style.display = t === tab ? '' : 'none';
    if (b) {
      b.style.background = t === tab ? 'rgba(201,168,76,0.25)' : 'var(--dark4)';
      b.style.color = t === tab ? 'var(--gold)' : 'var(--text2)';
      b.style.fontWeight = t === tab ? '700' : '400';
    }
  });
  if (tab === 'history') renderCalcHistory();
  if (tab === 'freq') { calcFreq(); calcTestScheduleEn && calcTestScheduleEn(); }
  if (tab === 'materials') initMaterialsCalc();
}

// ── initMaterialsCalc — حاسبات كميات المواد (QCS 2024) ──
function initMaterialsCalc() {
  var el = document.getElementById('cat-materials_calc');
  if (!el || el.dataset.built) return;
  el.dataset.built = '1';
  el.innerHTML =
    '<div style="font-weight:700;color:var(--gold);font-size:15px;margin-bottom:12px;">🧮 حاسبات كميات المواد — QCS 2024</div>' +
    _tabs('mat',[['mat-brick','🧱 طابوق'],['mat-concrete','🏗️ خرسانة'],['mat-rebar','🔩 حديد'],['mat-mortar','🪣 ملاط'],['mat-road','🛣️ طريق'],['mat-tests','🧪 اختبارات']]) +
    _section('mat-brick','🧱 حاسبة الطابوق — QCS 2024 Part 6',
      _calcSelect('brk-type','نوع البلوك',[['200','بلوك 200mm'],['150','بلوك 150mm'],['100','بلوك 100mm']]) +
      _calcField('brk-length','طول الجدار','مثال: 10','م') +
      _calcField('brk-height','ارتفاع الجدار','مثال: 3','م') +
      _calcField('brk-open','مساحة الفتحات (نوافذ+أبواب)','مثال: 4','m²') +
      _calcBtn('calcBrickQty()','احسب الكمية 🧱') + _calcResult('brk-result')) +
    _section('mat-concrete','🏗️ حاسبة الخرسانة — QCS 2024 Part 14 + ACI 211',
      _calcSelect('con-grade','Grade الخرسانة',[['C20','C20 — مساعد'],['C25','C25 — الأكثر شيوعاً'],['C30','C30 — هياكل مكشوفة'],['C35','C35 — بيئة كبريتية DS2'],['C40','C40 — هياكل خاصة DS3']]) +
      _calcField('con-vol','الحجم المطلوب','مثال: 10','m³') +
      _calcBtn('calcConcreteQty()','احسب الخرسانة 🏗️') + _calcResult('con-result')) +
    _section('mat-rebar','🔩 حاسبة حديد التسليح — QCS S5 P4 + BS 4449',
      _calcSelect('reb-dia','قطر السيخ',[['8','Ø8mm — 0.395 kg/m'],['10','Ø10mm — 0.617 kg/m'],['12','Ø12mm — 0.888 kg/m'],['16','Ø16mm — 1.578 kg/m'],['20','Ø20mm — 2.466 kg/m'],['25','Ø25mm — 3.853 kg/m'],['32','Ø32mm — 6.313 kg/m']]) +
      _calcField('reb-count','عدد الأسياخ','مثال: 50','حبة') +
      _calcField('reb-len','طول السيخ','مثال: 12','م') +
      _calcField('reb-lap','عدد وصلات Lap','مثال: 1','') +
      _calcBtn('calcRebarQty()','احسب الحديد 🔩') + _calcResult('reb-result')) +
    _section('mat-mortar','🪣 حاسبة الملاط — QCS Part 6 Section 3',
      _calcSelect('mort-ratio','نسبة الملاط',[['1:3','1:3 — بلاط وتشطيب'],['1:4','1:4 — بناء عام'],['1:6','1:6 — بناء بلوك']]) +
      _calcField('mort-vol','الحجم','مثال: 2','m³') +
      _calcBtn('calcMortarQty()','احسب الملاط 🪣') + _calcResult('mort-result')) +
    _section('mat-road','🛣️ كميات الطريق — QCS S17 + Ashghal RDM 2023',
      _calcField('rd-length','طول الطريق','مثال: 500','م') +
      _calcField('rd-width','عرض الطريق','مثال: 7','م') +
      _calcField('rd-wc','سماكة Wearing Course','مثال: 50','mm') +
      _calcField('rd-bc','سماكة Binder Course','مثال: 60','mm') +
      _calcField('rd-base','سماكة Base Course','مثال: 150','mm') +
      _calcField('rd-sb','سماكة Subbase','مثال: 200','mm') +
      _calcBtn('calcRoadMaterials()','احسب الكميات 🛣️') + _calcResult('rd-result')) +
    _section('mat-tests','🧪 الاختبارات المطلوبة حسب الكمية — QCS + Ashghal ITP',
      _calcSelect('tst-material','المادة',[['concrete','خرسانة'],['asphalt','إسفلت'],['subbase','Subbase/Base Course'],['backfill','ردم Backfill'],['blocks','بلوك/طابوق']]) +
      _calcField('tst-qty','الكمية الموردة','مثال: 500','m³ أو طن') +
      _calcBtn('calcTestFreq()','احسب الاختبارات المطلوبة 🧪') + _calcResult('tst-result'));
  el.querySelectorAll('.calc-section').forEach(function(s,i){ s.style.display = i===0?'block':'none'; });
}

// ── filterCalcCat ──
function filterCalcCat(cat) {
  document.querySelectorAll('.calc-cat-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('[data-cat="'+cat+'"]');
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.calc-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

// ── showCalcResult ──
function showCalcResult(id, pass, msg, warn) {
  const el = document.getElementById('res-' + id);
  if (!el) return;
  el.className = 'calc-result ' + (warn ? 'warning' : pass ? 'pass' : 'fail');
  // [SEC] XSS Fix — textContent آمن
  el.textContent = (pass ? '✅ PASS' : warn ? '⚠️ WARNING' : '❌ FAIL') + ' — ' + msg;
  // Save to history
  saveCalcHistory(id, pass, msg);
}

// ── saveCalcHistory ──
function saveCalcHistory(testId, pass, msg) {
  try {
    const h = JSON.parse(localStorage.getItem('qs_calc_history') || '[]');
    h.unshift({ id: testId, pass, msg, ts: Date.now() });
    localStorage.setItem('qs_calc_history', JSON.stringify(h.slice(0, 100)));
  } catch(e) {}
}

// ── renderCalcHistory ──
function renderCalcHistory() {
  const el = document.getElementById('calc-history-list');
  if (!el) return;
  try {
    const h = JSON.parse(localStorage.getItem('qs_calc_history') || '[]');
    if (!h.length) { el.innerHTML = '<div style="text-align:center;color:var(--text3);padding:20px;font-size:13px;">لا يوجد سجل بعد</div>'; return; }
    // [SEC] XSS Fix — DOM construction آمن
    el.innerHTML = '';
    const frag = document.createDocumentFragment();
    h.slice(0,50).forEach(item => {
      const _esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const d = new Date(item.ts);
      const time = d.toLocaleTimeString('ar-QA') + ' ' + d.toLocaleDateString('ar-QA');
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--dark3);border-radius:8px;margin-bottom:6px;border:1px solid ' + (item.pass ? 'rgba(46,204,113,0.2)' : 'rgba(231,76,60,0.2)');
      const iconEl = document.createElement('span');
      iconEl.style.fontSize = '14px';
      iconEl.textContent = item.pass ? '✅' : '❌';
      const textCol = document.createElement('div');
      textCol.style.cssText = 'flex:1;min-width:0;';
      const idEl = document.createElement('div');
      idEl.style.cssText = 'font-size:11px;font-weight:700;color:' + (item.pass ? '#2ecc71' : '#e74c3c');
      idEl.textContent = item.id;
      const msgEl = document.createElement('div');
      msgEl.style.cssText = 'font-size:10px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      msgEl.textContent = item.msg;
      textCol.appendChild(idEl);
      textCol.appendChild(msgEl);
      const timeEl = document.createElement('div');
      timeEl.style.cssText = 'font-size:9px;color:var(--text3);white-space:nowrap;';
      timeEl.textContent = time;
      wrapper.appendChild(iconEl);
      wrapper.appendChild(textCol);
      wrapper.appendChild(timeEl);
      frag.appendChild(wrapper);
    });
    el.appendChild(frag);
  } catch(e) { el.innerHTML = '<div style="color:var(--text3);">خطأ في تحميل السجل</div>'; }
}

// ── clearCalcHistory ──
function clearCalcHistory() {
  localStorage.removeItem('qs_calc_history');
  renderCalcHistory();
  showToast('🗑️ تم مسح سجل الاختبارات');
}

// ── runCalcTest ──
function runCalcTest(testId) {
  switch(testId) {
    case 'compaction': {
      const field = parseFloat(document.getElementById('comp-field').value);
      const mdd = parseFloat(document.getElementById('comp-mdd').value);
      const req = parseFloat(document.getElementById('comp-layer').value);
      if (!field || !mdd) { showToast('❌ أدخل الكثافة الميدانية و MDD'); return; }
      const pct = (field / mdd * 100);
      const pass = pct >= req;
      const warn = pct >= req * 0.98 && !pass;
      showCalcResult(testId, pass, `${pct.toFixed(1)}% ${pass?'✅':'❌'} (المطلوب ≥${req}%) | Field: ${field} | MDD: ${mdd}`, warn);
      break;
    }
    case 'cbr': {
      const val = parseFloat(document.getElementById('cbr-val').value);
      const req = parseFloat(document.getElementById('cbr-type').value);
      if (!val) { showToast('❌ أدخل نتيجة CBR'); return; }
      const pass = val >= req;
      showCalcResult(testId, pass, `CBR = ${val}% ${pass?'✅':'❌'} (المطلوب ≥${req}%) | QCS 2024 S6`);
      break;
    }
    case 'marshall': {
      const stab = parseFloat(document.getElementById('mar-stab').value);
      const flow = parseFloat(document.getElementById('mar-flow').value);
      const va = parseFloat(document.getElementById('mar-va').value);
      if (!stab || !flow || !va) { showToast('❌ أدخل جميع قيم Marshall'); return; }
      const stabPass = stab >= 8.0;
      const flowPass = flow >= 2 && flow <= 4;
      const vaPass = va >= 3 && va <= 5;
      const pass = stabPass && flowPass && vaPass;
      showCalcResult(testId, pass, 
        `Stability: ${stab}kN ${stabPass?'✅':'❌'} (≥8.0) | Flow: ${flow}mm ${flowPass?'✅':'❌'} (2-4) | Va: ${va}% ${vaPass?'✅':'❌'} (3-5%) | QCS S8`);
      break;
    }
    case 'core_density': {
      const bulk = parseFloat(document.getElementById('core-bulk').value);
      const tmd = parseFloat(document.getElementById('core-tmd').value);
      const req = parseFloat(document.getElementById('core-layer').value);
      if (!bulk || !tmd) { showToast('❌ أدخل Bulk Density و TMD'); return; }
      const pct = bulk / tmd * 100;
      const pass = pct >= req;
      showCalcResult(testId, pass, `${pct.toFixed(1)}% TMD ${pass?'✅':'❌'} (≥${req}%) | QCS S8 P6`);
      break;
    }
    case 'iri': {
      const val = parseFloat(document.getElementById('iri-val').value);
      const req = parseFloat(document.getElementById('iri-type').value);
      if (!val) { showToast('❌ أدخل قيمة IRI'); return; }
      const pass = val <= req;
      showCalcResult(testId, pass, `IRI = ${val} m/km ${pass?'✅':'❌'} (≤${req} m/km) | QCS S8 P7`);
      break;
    }
    case 'asphalt_temp': {
      const val = parseFloat(document.getElementById('temp-val').value);
      const req = parseFloat(document.getElementById('temp-type').value);
      if (!val) { showToast('❌ أدخل درجة الحرارة'); return; }
      const pass = val >= req;
      const warn = val >= req - 5 && !pass;
      showCalcResult(testId, pass, `${val}°C ${pass?'✅':'❌'} (≥${req}°C) | QCS 2024 S8 P5`, warn);
      break;
    }
    case 'crossfall': {
      const val = parseFloat(document.getElementById('cf-val').value);
      const type = document.getElementById('cf-type').value;
      if (!val) { showToast('❌ أدخل نسبة الميل'); return; }
      let pass, msg;
      if (type === '2.5') {
        const target = 2.5, tol = 0.5;
        pass = Math.abs(val - target) <= tol;
        const warn2 = Math.abs(val - target) <= 0.8 && !pass;
        msg = `${val}% ${pass?'✅':'❌'} (الهدف 2.5% ±0.5%) | QCS S6`;
        showCalcResult(testId, pass, msg, warn2);
      } else {
        pass = val <= 3.0;
        msg = `${val}% ${pass?'✅':'❌'} (≤3.0%) | QCS S6`;
        showCalcResult(testId, pass, msg);
      }
      break;
    }
    case 'straightedge': {
      const val = parseFloat(document.getElementById('str-val').value);
      const req = parseFloat(document.getElementById('str-layer').value);
      if (val === undefined || isNaN(val)) { showToast('❌ أدخل الفجوة'); return; }
      const pass = val <= req;
      showCalcResult(testId, pass, `${val}mm ${pass?'✅':'❌'} (≤${req}mm تحت مسطرة 3m) | QCS S8`);
      break;
    }
    case 'pressure_test': {
      const pn = parseFloat(document.getElementById('pres-pn').value);
      const test = parseFloat(document.getElementById('pres-test').value);
      const drop = parseFloat(document.getElementById('pres-drop').value);
      if (!pn || !test) { showToast('❌ أدخل PN وضغط الاختبار'); return; }
      const reqTest = pn * 1.5;
      const testPass = test >= reqTest;
      const dropPass = isNaN(drop) || drop <= 0;
      const pass = testPass && dropPass;
      showCalcResult(testId, pass, 
        `ضغط: ${test} bar ${testPass?'✅':'❌'} (≥${reqTest.toFixed(1)}) | انخفاض: ${drop||0} bar ${dropPass?'✅':'❌'} | QCS 2024`);
      break;
    }
    case 'air_test': {
      const init = parseFloat(document.getElementById('air-init').value);
      const fin = parseFloat(document.getElementById('air-final').value);
      const time = parseFloat(document.getElementById('air-time').value);
      if (!init || !fin || !time) { showToast('❌ أدخل جميع قيم الاختبار'); return; }
      const drop = init - fin;
      const pass = init >= 100 && drop <= 25 && time >= 5;
      showCalcResult(testId, pass, 
        `Init: ${init}mmHg | Final: ${fin}mmHg | Drop: ${drop.toFixed(0)}mmHg ${drop<=25?'✅':'❌'} (≤25mm) | Ashghal`);
      break;
    }
    case 'chlorination': {
      const conc = parseFloat(document.getElementById('chl-conc').value);
      const time = parseFloat(document.getElementById('chl-time').value);
      const resid = parseFloat(document.getElementById('chl-resid').value);
      if (!conc || !time) { showToast('❌ أدخل التركيز والمدة'); return; }
      const concPass = conc >= 50;
      const timePass = time >= 24;
      const residPass = isNaN(resid) || resid >= 0.2;
      const pass = concPass && timePass && residPass;
      showCalcResult(testId, pass,
        `Cl: ${conc}ppm ${concPass?'✅':'❌'} (≥50) | مدة: ${time}h ${timePass?'✅':'❌'} (≥24h) | Residual: ${resid||'?'}ppm ${residPass?'✅':'❌'} | QCS`);
      break;
    }
    case 'pipe_sep': {
      const h = parseFloat(document.getElementById('sep-horiz').value);
      const v = parseFloat(document.getElementById('sep-vert').value);
      if (!h) { showToast('❌ أدخل الفصل الأفقي'); return; }
      const hPass = h >= 1.0;
      const vPass = isNaN(v) || v >= 0.3;
      const pass = hPass && vPass;
      showCalcResult(testId, pass,
        `أفقي: ${h}m ${hPass?'✅':'❌'} (≥1.0m) | رأسي: ${v||'?'}m ${vPass?'✅':'❌'} (≥0.3m) | QCS/Ashghal`);
      break;
    }
    case 'sewer_grad': {
      const dn = parseFloat(document.getElementById('sg-dn').value);
      const grad = parseFloat(document.getElementById('sg-grad').value);
      if (!dn || !grad) { showToast('❌ أدخل القطر والانحدار'); return; }
      // Min gradient: 1/DN*15 approximately
      const minGrad = Math.max(150, dn * 15);
      const pass = grad <= minGrad; // 1:X — smaller X = steeper = better
      const vel = (Math.pow(dn/1000, 2/3) * Math.sqrt(1/grad)) * 60; // approximate
      showCalcResult(testId, pass,
        `1:${grad} ${pass?'✅':'❌'} (1:${minGrad} للـ DN${dn}) | سرعة تقريبية: ${vel.toFixed(2)} m/s | Ashghal`);
      break;
    }
    case 'cube_strength': {
      const f = parseFloat(document.getElementById('cube-f').value);
      const fcu = parseFloat(document.getElementById('cube-fcu').value);
      const d7 = parseFloat(document.getElementById('cube-7d').value);
      if (!f || !fcu) { showToast('❌ أدخل المقاومة المقاسة وfcu'); return; }
      const pass = f >= fcu;
      let msg = `${f} MPa ${pass?'✅':'❌'} (≥${fcu} MPa) | QCS 2024 S5`;
      if (!isNaN(d7)) {
        const d7pct = d7/fcu*100;
        msg += ` | 7-day: ${d7}MPa = ${d7pct.toFixed(0)}% (مراقبة فقط)`;
      }
      showCalcResult(testId, pass, msg);
      break;
    }
    case 'slump': {
      const val = parseFloat(document.getElementById('slump-val').value);
      const range = document.getElementById('slump-type').value.split(',');
      const min = parseFloat(range[0]), max = parseFloat(range[1]);
      if (isNaN(val)) { showToast('❌ أدخل قيمة Slump'); return; }
      const pass = val >= min && val <= max;
      showCalcResult(testId, pass, `Slump = ${val}mm ${pass?'✅':'❌'} (${min}-${max}mm) | QCS 2024 S5`);
      break;
    }
    case 'cover_depth': {
      const measured = parseFloat(document.getElementById('cov-measured').value);
      const req = parseFloat(document.getElementById('cov-element').value);
      if (isNaN(measured)) { showToast('❌ أدخل Cover المقاس'); return; }
      const pass = measured >= req;
      const warn = measured >= req * 0.9 && !pass;
      showCalcResult(testId, pass, `${measured}mm ${pass?'✅':'❌'} (≥${req}mm) | QCS 2024 S5`, warn);
      break;
    }
    case 'wc_ratio': {
      const val = parseFloat(document.getElementById('wc-val').value);
      const req = parseFloat(document.getElementById('wc-expo').value);
      if (isNaN(val)) { showToast('❌ أدخل W/C Ratio'); return; }
      const pass = val <= req;
      showCalcResult(testId, pass, `W/C = ${val} ${pass?'✅':'❌'} (≤${req}) | QCS S5 Durability`);
      break;
    }
    case 'rebar_cover': {
      const nom = parseFloat(document.getElementById('rc-nom').value);
      const bar = parseFloat(document.getElementById('rc-bar').value);
      const agg = parseFloat(document.getElementById('rc-agg').value);
      if (!nom || !bar) { showToast('❌ أدخل Cover و Bar Diameter'); return; }
      const minCover = Math.max(bar, agg ? agg * 1.25 : bar, 25);
      const pass = nom >= minCover;
      showCalcResult(testId, pass, `Nom Cover: ${nom}mm ${pass?'✅':'❌'} (≥${minCover}mm) | Bar: ⌀${bar} | BS 8666 + QCS S5`);
      break;
    }
    case 'spt_bearing': {
      const n = parseFloat(document.getElementById('spt-n').value);
      const b = parseFloat(document.getElementById('spt-b').value);
      if (!n) { showToast('❌ أدخل N-value'); return; }
      const qa = n * (b||1) * 12; // Meyerhof approximate kPa
      const consistency = n < 4 ? 'Very Loose/Soft' : n < 10 ? 'Loose' : n < 30 ? 'Medium Dense' : n < 50 ? 'Dense' : 'Very Dense';
      showCalcResult(testId, true, `N=${n} → ${consistency} | qa ≈ ${qa}kPa (تقديري — راجع تقرير التربة) | ⚠️ Meyerhof approx`);
      break;
    }
    case 'atterberg': {
      const ll = parseFloat(document.getElementById('att-ll').value);
      const pl = parseFloat(document.getElementById('att-pl').value);
      const use = document.getElementById('att-use').value;
      if (!ll || !pl) { showToast('❌ أدخل LL و PL'); return; }
      const pi = ll - pl;
      const limits = {subgrade: 12, subbase: 6, fill: 20};
      const req = limits[use] || 12;
      const pass = pi <= req;
      showCalcResult(testId, pass, `PI = ${pi.toFixed(1)}% ${pass?'✅':'❌'} (≤${req}%) | LL=${ll}% | PL=${pl}% | QCS S6`);
      break;
    }
    case 'sulphate': {
      const so3 = parseFloat(document.getElementById('sul-so3').value);
      const cl = parseFloat(document.getElementById('sul-cl').value);
      const use = document.getElementById('sul-use').value;
      if (isNaN(so3)) { showToast('❌ أدخل نسبة SO3'); return; }
      const req = use === 'subgrade' || use === 'backfill' ? 0.3 : 0.5;
      const so3Pass = so3 <= req;
      const clPass = isNaN(cl) || cl <= 0.1;
      const pass = so3Pass && clPass;
      showCalcResult(testId, pass, `SO3: ${so3}% ${so3Pass?'✅':'❌'} (≤${req}%)${!isNaN(cl) ? ` | Cl: ${cl}% ${clPass?'✅':'❌'} (≤0.1%)` : ''} | BS 1377`);
      break;
    }
    case 'sewer_grad': {
      break; // handled above
    }
  }
}

// ── runBatchTest ──
function runBatchTest() {
  const input = document.getElementById('batch-input').value.trim();
  if (!input) { showToast('❌ أدخل البيانات أولاً'); return; }
  
  const lines = input.split('\n').filter(l => l.trim());
  let passCount = 0, failCount = 0;
  const results = [];
  
  lines.forEach((line, i) => {
    const parts = line.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      const field = parseFloat(parts[0]);
      const mdd = parseFloat(parts[1]);
      const layer = parts[2] || 'subgrade';
      const req = layer.includes('asphalt') ? 97 : layer.includes('subbase') || layer.includes('base') ? 100 : 95;
      const pct = field / mdd * 100;
      const pass = pct >= req;
      if (pass) passCount++; else failCount++;
      results.push({ i: i+1, field, mdd, pct: pct.toFixed(1), req, pass, layer });
    }
  });
  
  const passRate = (passCount / results.length * 100).toFixed(0);
  
  document.getElementById('batch-results').innerHTML = `
    <div style="display:flex;gap:10px;margin-bottom:10px;">
      <div style="flex:1;background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;text-align:center;">
        <div style="font-size:20px;font-weight:800;color:#2ecc71;">${passCount}</div>
        <div style="font-size:10px;color:var(--text3);">PASS</div>
      </div>
      <div style="flex:1;background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;text-align:center;">
        <div style="font-size:20px;font-weight:800;color:#e74c3c;">${failCount}</div>
        <div style="font-size:10px;color:var(--text3);">FAIL</div>
      </div>
      <div style="flex:1;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;text-align:center;">
        <div style="font-size:20px;font-weight:800;color:var(--gold);">${passRate}%</div>
        <div style="font-size:10px;color:var(--text3);">نسبة النجاح</div>
      </div>
    </div>
    <table class="dm-table">
      <tr><th>#</th><th>Field</th><th>MDD</th><th>%</th><th>Req</th><th>نتيجة</th></tr>
      ${results.map(r => `<tr style="background:${r.pass?'rgba(46,204,113,0.05)':'rgba(231,76,60,0.05)'};">
        <td>${r.i}</td><td>${r.field}</td><td>${r.mdd}</td><td>${r.pct}%</td><td>≥${r.req}%</td>
        <td style="color:${r.pass?'#2ecc71':'#e74c3c'};font-weight:700;">${r.pass?'✅ PASS':'❌ FAIL'}</td>
      </tr>`).join('')}
    </table>`;
  
  // Save batch to history
  saveCalcHistory('batch_compaction', failCount === 0, `${passCount}P/${failCount}F — ${passRate}% pass rate`);
}

// ── exportBatchNCR ──
function exportBatchNCR() {
  const results = document.getElementById('batch-results').innerText;
  if (!results) { showToast('❌ شغّل الاختبار أولاً'); return; }
  
  const ncr = `NCR — فشل اختبار الدمك
التاريخ: ${new Date().toLocaleDateString('ar-QA')}
المشروع: _______________
الموقع: _______________

وصف عدم المطابقة:
فشل اختبار الدمك الميداني في تحقيق النسبة المطلوبة وفق QCS 2024 Section 6.

المرجع: QCS 2024 S6 P5 — Compaction Requirements

الإجراء التصحيحي المطلوب:
1. إعادة الدمك للمنطقة المرفوضة
2. إجراء اختبار كثافة إضافي بعد إعادة الدمك
3. الحصول على موافقة المهندس قبل الاستمرار

توقيع QC Engineer: _______________`;

  const blob = new Blob([ncr], {type: 'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'NCR_Compaction_' + new Date().toISOString().slice(0,10) + '.txt';
  a.click();
  showToast('✅ تم تصدير NCR');
}
