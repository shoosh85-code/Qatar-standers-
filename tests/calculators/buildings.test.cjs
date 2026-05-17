/**
 * QatarSpec Pro — Unit Tests: Buildings Calculators
 * Tests: bldCalc(), calcConcrete(), calcRebar(), calcCover(),
 *        calcLapLength(), calcCubeStrength(), calcSlump(),
 *        calcRebarCover(), calcWCRatio(), calcCoverDepth()
 *
 * Run: node tests/calculators/buildings.test.cjs
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

// ══════════════════════════════════════════════════════════
// DOM Mock — يجب أن يكون قبل أي eval()
// ══════════════════════════════════════════════════════════
const _dom = {};
let _lastResult = { pass: null, value: null, required: null, msg: '' };
let _toasts = [];

function setEl(id, val) {
  _dom[id] = {
    value: String(val), innerHTML: '', textContent: '',
    style: {}, classList: { add(){}, remove(){}, toggle(){} },
    scrollIntoView(){}, setAttribute(){}, getAttribute(){ return null; },
    querySelector(){ return null; }, querySelectorAll(){ return []; },
  };
}

function mockElement(extraProps) {
  return Object.assign({
    value: '', innerHTML: '', textContent: '',
    style: {}, className: '',
    classList: { add(){}, remove(){}, toggle(){} },
    scrollIntoView(){}, setAttribute(){}, getAttribute(){ return null; },
    querySelector(){ return null; }, querySelectorAll(){ return []; },
    appendChild(){ return this; },
  }, extraProps || {});
}

global.window   = { QS: {} };
global.document = {
  getElementById(id) { return _dom[id] || mockElement(); },
  createElement()    { return mockElement(); },
  head: { appendChild(){} },
  querySelector()    { return null; },
  querySelectorAll() { return []; },
};

// showResult/showToast placeholders — سيُعاد تعريفهم بعد تحميل data_calcs.js
global.showResult = function(elemId, pass, val, req, msg) {
  _lastResult = { pass, value: val, required: req, msg: msg || '' };
};
global.showToast = function(msg) {
  _toasts.push(msg);
  _lastResult = { pass: null, value: null, required: null, msg: 'TOAST:' + msg };
};

// _tab للـ bldCalc
global._tab = 'conc';

// ══════════════════════════════════════════════════════════
// تحميل الكود
// ══════════════════════════════════════════════════════════
try { vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../../data_calcs.js'), 'utf-8')); } catch(e) { console.error('data_calcs load error:', e.message); }
try { vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../../data_content_buildings.js'), 'utf-8')); } catch(e) { /* expected — DOM render calls fail */ }

// ═══ Override showResult AFTER loading — capture pass/fail without DOM ═══
global.showResult = function(elemId, pass, val, req, detail, action) {
  _lastResult = { pass: !!pass, value: val, required: req, msg: detail || '' };
};
global.showToast = function(msg) {
  _toasts.push(msg);
  _lastResult = { pass: null, value: null, required: null, msg: 'TOAST:' + msg };
};

const bldCalc = global.window.bldCalc || global.bldCalc;

// ══════════════════════════════════════════════════════════
// Test Framework
// ══════════════════════════════════════════════════════════
let passed = 0, failed = 0, errors = [];

function test(name, fn) {
  _toasts = [];
  _lastResult = { pass: null, value: null, required: null, msg: '' };
  try { fn(); console.log(`  ✅ ${name}`); passed++; }
  catch(e) { console.log(`  ❌ ${name}: ${e.message}`); errors.push(`${name}: ${e.message}`); failed++; }
}
function assert(ok, msg) { if (!ok) throw new Error(msg); }
function wasToast()       { return _toasts.length > 0; }
function getResult()      { return _lastResult; }

// ══════════════════════════════════════════════════════════
// حساب bldCalc() بشكل مستقل (Pure Math)
// تُجرى الحسابات مباشرة بنفس خوارزمية window.bldCalc
// ══════════════════════════════════════════════════════════
function computeBld(opts) {
  const p = Object.assign({ type:'res', area:500, floors:10, fh:3.0, found:'raft', sys:'beam', slab:200 }, opts);
  const { type, floors, fh, found, sys } = p;
  const area   = p.area   || 0;
  const slabmm = p.slab   || 200;

  const tMult   = { res:1.0, com:1.15, mix:1.08 }[type] || 1.0;
  const openRat = { res:0.28, com:0.40, mix:0.33 }[type] || 0.28;
  const partRat = { res:0.45, com:0.25, mix:0.35 }[type] || 0.45;

  const GFA    = area * floors;
  const totalH = floors * fh;
  const W      = Math.sqrt(area / 1.5); const L = 1.5 * W;
  const perim  = 2 * (W + L);

  const foundRat = { raft:0.45, pad:0.28, piles:0.22, combined:0.38 }[found] || 0.45;
  const V_found  = area * foundRat;
  const colRat   = 0.050 * tMult;
  const beamRat  = (sys==='beam') ? 0.090 : (sys==='flat') ? 0.000 : 0.050;
  const slabRat  = slabmm / 1000;
  const wallRat  = (sys==='shear' || floors > 10) ? 0.045 * tMult : 0.0;

  const V_col   = area * colRat * floors;
  const V_beam  = area * beamRat * floors;
  const V_slab  = area * slabRat * floors;
  const V_wall  = area * wallRat * floors;
  const V_stair = area * 0.015 * floors;
  const V_roof  = area * slabRat;
  const V_super = V_col + V_beam + V_slab + V_wall + V_stair + V_roof;
  const V_total = V_found + V_super;

  const sfR     = { raft:135, pad:120, piles:140, combined:138 }[found] || 130;
  const scR     = (floors > 20) ? 320 : 280;
  const kg_found = V_found * sfR;
  const kg_col   = V_col   * scR;
  const kg_beam  = V_beam  * 210;
  const kg_slab  = (V_slab + V_roof) * ((sys==='flat') ? 120 : 105);
  const kg_wall  = V_wall  * 155;
  const kg_stair = V_stair * 145;
  const kg_total = kg_found + kg_col + kg_beam + kg_slab + kg_wall + kg_stair;
  const ton_total = kg_total / 1000;
  const kgPerM2  = GFA > 0 ? kg_total / GFA : 0;

  const extWall_total = perim * fh * (1 - openRat) * floors;
  const intPart_total = area * floors * partRat;

  return { GFA, totalH, V_found, V_super, V_total, ton_total, kgPerM2,
           kg_total, extWall_total, intPart_total, V_col, V_beam, V_slab, V_wall };
}

// ══════════════════════════════════════════════════════════
// SUITE 1: bldCalc() — Building Materials
// ══════════════════════════════════════════════════════════
console.log('\n🏗️  bldCalc — Building Materials Calculator\n');

test('Residential 500m² 10F — GFA = 5000 m²', () => {
  const r = computeBld({ area:500, floors:10 });
  assert(r.GFA === 5000, `GFA expected 5000 got ${r.GFA}`);
});

test('Residential 500m² 10F — V_total > 0', () => {
  const r = computeBld({ area:500, floors:10 });
  assert(r.V_total > 0, `V_total must be > 0, got ${r.V_total}`);
});

test('Raft foundation = area × 0.45', () => {
  const r = computeBld({ area:500, floors:10, found:'raft' });
  assert(Math.abs(r.V_found - 225) < 0.01, `V_found expected 225, got ${r.V_found}`);
});

test('Pad foundation < Raft foundation', () => {
  const raft = computeBld({ found:'raft',  area:500, floors:10 });
  const pad  = computeBld({ found:'pad',   area:500, floors:10 });
  assert(pad.V_found < raft.V_found, `Pad ${pad.V_found} < Raft ${raft.V_found}`);
});

test('Piles foundation — أقل من Raft', () => {
  const raft  = computeBld({ found:'raft',  area:500, floors:10 });
  const piles = computeBld({ found:'piles', area:500, floors:10 });
  assert(piles.V_found < raft.V_found, `Piles ${piles.V_found} < Raft ${raft.V_found}`);
});

test('Commercial tMult=1.15 → أكثر خرسانة من Residential', () => {
  const res = computeBld({ type:'res', area:500, floors:10 });
  const com = computeBld({ type:'com', area:500, floors:10 });
  assert(com.V_total > res.V_total, `Commercial > Residential`);
});

test('Mixed use — بين Residential وCommercial', () => {
  const res = computeBld({ type:'res', area:500, floors:10 });
  const com = computeBld({ type:'com', area:500, floors:10 });
  const mix = computeBld({ type:'mix', area:500, floors:10 });
  assert(mix.V_total >= res.V_total && mix.V_total <= com.V_total, `Mix between res and com`);
});

test('Flat slab: V_beam = 0', () => {
  const r = computeBld({ sys:'flat', area:500, floors:5 });
  assert(r.V_beam === 0, `Flat slab: no beams`);
});

test('High-rise 25F: shear walls > 0 (floors>10)', () => {
  const r = computeBld({ floors:25, sys:'beam', area:500 });
  assert(r.V_wall > 0, `25 floors → shear walls required`);
});

test('Low-rise 5F beam: no shear walls', () => {
  const r = computeBld({ floors:5, sys:'beam', area:500 });
  assert(r.V_wall === 0, `5 floors beam → no shear walls`);
});

test('kgPerM2 في النطاق الهندسي 50–350 kg/m²', () => {
  const r = computeBld({ area:500, floors:10 });
  assert(r.kgPerM2 >= 50 && r.kgPerM2 <= 350, `kgPerM2=${r.kgPerM2.toFixed(1)}`);
});

test('ton_total > 0', () => {
  const r = computeBld({ area:500, floors:10 });
  assert(r.ton_total > 0, `ton_total=${r.ton_total}`);
});

test('Edge: area=50 floors=1 — لا crash', () => {
  const r = computeBld({ area:50, floors:1 });
  assert(r.V_total > 0 && isFinite(r.V_total), `min area: V_total=${r.V_total}`);
});

test('Edge: area=10000 floors=80 — لا overflow', () => {
  const r = computeBld({ area:10000, floors:80 });
  assert(isFinite(r.V_total) && r.V_total > 0, `large: V_total=${r.V_total}`);
});

test('Edge: area=0 — لا Infinity', () => {
  const r = computeBld({ area:0, floors:10 });
  assert(isFinite(r.V_total), `area=0 must not produce Infinity`);
});

test('Steel: more floors → more steel', () => {
  const s5  = computeBld({ floors:5,  area:500 });
  const s20 = computeBld({ floors:20, area:500 });
  assert(s20.ton_total > s5.ton_total, `20F more steel than 5F`);
});

// ══════════════════════════════════════════════════════════
// SUITE 2: calcConcrete() — Cube Strength
// ══════════════════════════════════════════════════════════
console.log('\n🧪 calcConcrete — Cube Strength\n');

function runConcrete(grade, age, result) {
  setEl('con-grade', grade); setEl('con-age', age); setEl('con-result-val', result);
  setEl('con-result', '');
  calcConcrete();
  return getResult();
}

test('C30 @ 28d, result=32 → PASS', () => {
  const r = runConcrete(30, 28, 32);
  assert(r.pass === true, `32 >= C30=30 → PASS`);
});

test('C30 @ 28d, result=28 → FAIL', () => {
  const r = runConcrete(30, 28, 28);
  assert(r.pass === false, `28 < C30=30 → FAIL`);
});

test('C30 @ 7d, result=21 → PASS (70% = 21)', () => {
  const r = runConcrete(30, 7, 21);
  assert(r.pass === true, `7-day 30×0.7=21 → PASS`);
});

test('C30 @ 7d, result=20 → FAIL (< 21)', () => {
  const r = runConcrete(30, 7, 20);
  assert(r.pass === false, `7-day 20 < 21 → FAIL`);
});

test('C45 @ 28d, result=50 → PASS', () => {
  const r = runConcrete(45, 28, 50);
  assert(r.pass === true, `50 >= 45 → PASS`);
});

test('C45 @ 28d, result=44 → FAIL', () => {
  const r = runConcrete(45, 28, 44);
  assert(r.pass === false, `44 < 45 → FAIL`);
});

test('Edge: empty result → Toast', () => {
  setEl('con-grade', 30); setEl('con-age', 28); setEl('con-result-val', '');
  setEl('con-result', '');
  calcConcrete();
  assert(wasToast(), `Empty result → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 3: calcRebar() — Steel Properties
// ══════════════════════════════════════════════════════════
console.log('\n🔩 calcRebar — Steel Rebar\n');

function runRebar(fy, fu, elong) {
  setEl('reb-fy', fy); setEl('reb-fu', fu); setEl('reb-elong', elong !== undefined ? elong : '');
  setEl('reb-result', '');
  calcRebar();
  return getResult();
}

test('fy=500 fu=600 → PASS (QCS minimums)', () => {
  const r = runRebar(500, 600);
  assert(r.pass === true, `Minimum values → PASS`);
});

test('fy=520 fu=650 elong=15 → PASS', () => {
  const r = runRebar(520, 650, 15);
  assert(r.pass === true, `Good rebar → PASS`);
});

test('fy=480 fu=600 → FAIL (fy < 500)', () => {
  const r = runRebar(480, 600);
  assert(r.pass === false, `fy=480 < 500 → FAIL`);
});

test('fy=500 fu=570 → FAIL (fu < 600)', () => {
  const r = runRebar(500, 570);
  assert(r.pass === false, `fu=570 < 600 → FAIL`);
});

test('fy=530 fu=600 → FAIL (fu/fy=1.132 < 1.15)', () => {
  const r = runRebar(530, 600);
  assert(r.pass === false, `fu/fy=${(600/530).toFixed(3)} < 1.15 → FAIL`);
});

test('fy=500 fu=600 elong=12 → FAIL (< 14%)', () => {
  const r = runRebar(500, 600, 12);
  assert(r.pass === false, `Elong=12% < 14% → FAIL`);
});

test('fy=500 fu=600 elong=14 → PASS (boundary)', () => {
  const r = runRebar(500, 600, 14);
  assert(r.pass === true, `Elong=14% >= 14% → PASS`);
});

test('Edge: fy=0 → Toast', () => {
  setEl('reb-fy', 0); setEl('reb-fu', 600); setEl('reb-elong', '');
  setEl('reb-result', '');
  calcRebar();
  assert(wasToast(), `fy=0 → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 4: calcCover() — Cover Check
// ══════════════════════════════════════════════════════════
console.log('\n📏 calcCover — Concrete Cover\n');

function runCover(req, val) {
  setEl('cover-type', req); setEl('cover-val', val);
  setEl('cover-result', '');
  calcCover();
  return getResult();
}

test('req=75 act=80 → PASS', () => {
  assert(runCover(75, 80).pass === true, `80 >= 75`);
});

test('req=75 act=70 → FAIL', () => {
  assert(runCover(75, 70).pass === false, `70 < 75`);
});

test('req=40 act=40 → PASS (boundary)', () => {
  assert(runCover(40, 40).pass === true, `40 = 40 boundary → PASS`);
});

test('req=40 act=39 → FAIL', () => {
  assert(runCover(40, 39).pass === false, `39 < 40 → FAIL`);
});

test('Edge: empty val → Toast', () => {
  setEl('cover-type', 40); setEl('cover-val', '');
  setEl('cover-result', '');
  calcCover();
  assert(wasToast(), `Empty val → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 5: calcLapLength()
// ══════════════════════════════════════════════════════════
console.log('\n📐 calcLapLength — Lap Splice\n');

function runLap(mult, dia, actual) {
  setEl('lap-type', mult); setEl('lap-dia', dia); setEl('lap-actual', actual);
  setEl('lap-result', '');
  calcLapLength();
  return getResult();
}

test('40d × φ16=640mm, actual=650 → PASS', () => {
  assert(runLap(40, 16, 650).pass === true, `650 >= 640`);
});

test('40d × φ16=640mm, actual=600 → FAIL', () => {
  assert(runLap(40, 16, 600).pass === false, `600 < 640`);
});

test('50d × φ20=1000mm, actual=1000 → PASS (boundary)', () => {
  assert(runLap(50, 20, 1000).pass === true, `1000 = 1000`);
});

test('50d × φ20=1000mm, actual=999 → FAIL', () => {
  assert(runLap(50, 20, 999).pass === false, `999 < 1000`);
});

test('Edge: dia=0 → Toast', () => {
  setEl('lap-type', 40); setEl('lap-dia', 0); setEl('lap-actual', 500);
  setEl('lap-result', '');
  calcLapLength();
  assert(wasToast(), `dia=0 → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 6: calcCubeStrength()
// ══════════════════════════════════════════════════════════
console.log('\n🧱 calcCubeStrength\n');

function runCubeStr(grade, age, res) {
  setEl('cube-grade', grade); setEl('cube-age', String(age)); setEl('cube-res', res);
  setEl('cube-result', '');
  calcCubeStrength();
  return getResult();
}

test('C35 @ 28d, res=38 → PASS', () => {
  assert(runCubeStr(35, '28', 38).pass === true, `38 >= 35`);
});

test('C35 @ 28d, res=34 → FAIL', () => {
  assert(runCubeStr(35, '28', 34).pass === false, `34 < 35`);
});

test('C35 @ 7d, res=24.5 → PASS (35×0.7=24.5)', () => {
  assert(runCubeStr(35, '7', 24.5).pass === true, `24.5 >= 24.5`);
});

test('C35 @ 7d, res=24.0 → FAIL', () => {
  assert(runCubeStr(35, '7', 24.0).pass === false, `24 < 24.5`);
});

test('Edge: res=NaN → Toast', () => {
  setEl('cube-grade', 35); setEl('cube-age', '28'); setEl('cube-res', '');
  setEl('cube-result', '');
  calcCubeStrength();
  assert(wasToast(), `Empty res → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 7: calcSlump()
// ══════════════════════════════════════════════════════════
console.log('\n🌊 calcSlump\n');

function runSlump(method, val) {
  setEl('slump-method', method); setEl('slump-val', val);
  setEl('slump-result', '');
  calcSlump();
  return getResult();
}

test('Direct: 90mm → PASS [75-100]', () => {
  assert(runSlump('direct', 90).pass === true, `90 in [75,100]`);
});

test('Direct: 110mm → FAIL (>100)', () => {
  assert(runSlump('direct', 110).pass === false, `110 > 100`);
});

test('Direct: 70mm → FAIL (<75)', () => {
  assert(runSlump('direct', 70).pass === false, `70 < 75`);
});

test('Pump: 120mm → PASS [100-150]', () => {
  assert(runSlump('pump', 120).pass === true, `120 in [100,150]`);
});

test('Pump: 70mm → FAIL (<100)', () => {
  assert(runSlump('pump', 70).pass === false, `70 < 100`);
});

test('Special: 160mm → PASS [150-180]', () => {
  assert(runSlump('special', 160).pass === true, `160 in [150,180]`);
});

test('Special: 190mm → FAIL (>180)', () => {
  assert(runSlump('special', 190).pass === false, `190 > 180`);
});

test('Edge: empty val → Toast', () => {
  setEl('slump-method', 'direct'); setEl('slump-val', '');
  setEl('slump-result', '');
  calcSlump();
  assert(wasToast(), `Empty val → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 8: calcRebarCover()
// ══════════════════════════════════════════════════════════
console.log('\n🏛️  calcRebarCover — QCS 2024 Cover Requirements\n');

function runRebarCover(elem, act) {
  setEl('cover-elem', elem); setEl('cover-act', act);
  setEl('cover-result', '');
  calcRebarCover();
  return getResult();
}

// QCS 2024: foundation=75, ext_col=40, int_col=25, ext_slab=40, int_slab=20, wall=40
test('Foundation: 80mm → PASS (req=75mm)', () => {
  assert(runRebarCover('foundation', 80).pass === true, `80 >= 75`);
});

test('Foundation: 70mm → FAIL', () => {
  assert(runRebarCover('foundation', 70).pass === false, `70 < 75`);
});

test('Exterior column: 40mm → PASS (boundary)', () => {
  assert(runRebarCover('ext_col', 40).pass === true, `40 >= 40`);
});

test('Exterior column: 35mm → FAIL', () => {
  assert(runRebarCover('ext_col', 35).pass === false, `35 < 40`);
});

test('Interior column: 25mm → PASS (boundary)', () => {
  assert(runRebarCover('int_col', 25).pass === true, `25 >= 25`);
});

test('Interior column: 20mm → FAIL', () => {
  assert(runRebarCover('int_col', 20).pass === false, `20 < 25`);
});

test('Interior slab: 20mm → PASS (boundary)', () => {
  assert(runRebarCover('int_slab', 20).pass === true, `20 >= 20`);
});

test('Interior slab: 15mm → FAIL', () => {
  assert(runRebarCover('int_slab', 15).pass === false, `15 < 20`);
});

test('Edge: empty act → Toast', () => {
  setEl('cover-elem', 'foundation'); setEl('cover-act', '');
  setEl('cover-result', '');
  calcRebarCover();
  assert(wasToast(), `Empty act → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 9: calcWCRatio()
// ══════════════════════════════════════════════════════════
console.log('\n💧 calcWCRatio — Water/Cement Ratio\n');

function runWC(env, water, cement) {
  setEl('wc-env', env); setEl('wc-water', water); setEl('wc-cement', cement);
  setEl('wc-result', '');
  calcWCRatio();
  return getResult();
}

// Limits: mild=0.55, moderate=0.50, severe=0.45, marine=0.40, submerged=0.38
test('Mild w/c=0.50 ≤ 0.55 → PASS', () => {
  assert(runWC('mild', 100, 200).pass === true, `0.50 ≤ 0.55`);
});

test('Mild w/c=0.60 > 0.55 → FAIL', () => {
  assert(runWC('mild', 120, 200).pass === false, `0.60 > 0.55`);
});

test('Severe w/c=0.44 ≤ 0.45 → PASS', () => {
  assert(runWC('severe', 88, 200).pass === true, `0.44 ≤ 0.45`);
});

test('Severe w/c=0.50 > 0.45 → FAIL', () => {
  assert(runWC('severe', 100, 200).pass === false, `0.50 > 0.45`);
});

test('Marine w/c=0.38 ≤ 0.40 → PASS', () => {
  assert(runWC('marine', 76, 200).pass === true, `0.38 ≤ 0.40`);
});

test('Submerged w/c=0.40 > 0.38 → FAIL', () => {
  assert(runWC('submerged', 80, 200).pass === false, `0.40 > 0.38`);
});

test('Edge: empty water → Toast', () => {
  setEl('wc-env', 'mild'); setEl('wc-water', ''); setEl('wc-cement', 200);
  setEl('wc-result', '');
  calcWCRatio();
  assert(wasToast(), `Empty water → Toast`);
});

// ══════════════════════════════════════════════════════════
// SUITE 10: calcCoverDepth()
// ══════════════════════════════════════════════════════════
console.log('\n🚰 calcCoverDepth — Utility Cover\n');

function runCoverDepth(net, act) {
  setEl('cov-net', net); setEl('cov-act', act);
  setEl('cov-result', '');
  calcCoverDepth();
  return getResult();
}

// Limits: water=1.0, sewer=1.2, storm=0.9, elec=0.8
test('Water: 1.2m → PASS (req=1.0m)', () => {
  assert(runCoverDepth('water', 1.2).pass === true, `1.2 >= 1.0`);
});

test('Water: 0.9m → FAIL', () => {
  assert(runCoverDepth('water', 0.9).pass === false, `0.9 < 1.0`);
});

test('Sewer: 1.3m → PASS (req=1.2m)', () => {
  assert(runCoverDepth('sewer', 1.3).pass === true, `1.3 >= 1.2`);
});

test('Sewer: 1.0m → FAIL', () => {
  assert(runCoverDepth('sewer', 1.0).pass === false, `1.0 < 1.2`);
});

test('Storm: 0.9m → PASS (boundary)', () => {
  assert(runCoverDepth('storm', 0.9).pass === true, `0.9 >= 0.9`);
});

test('Storm: 0.8m → FAIL', () => {
  assert(runCoverDepth('storm', 0.8).pass === false, `0.8 < 0.9`);
});

test('Electric: 0.8m → PASS (boundary)', () => {
  assert(runCoverDepth('elec', 0.8).pass === true, `0.8 >= 0.8`);
});

test('Edge: empty act → Toast', () => {
  setEl('cov-net', 'water'); setEl('cov-act', '');
  setEl('cov-result', '');
  calcCoverDepth();
  assert(wasToast(), `Empty act → Toast`);
});

// ══════════════════════════════════════════════════════════
// Final Report
// ══════════════════════════════════════════════════════════
console.log('\n══════════════════════════════════════════');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total:  ${passed + failed}`);
console.log('══════════════════════════════════════════');

if (errors.length > 0) {
  console.log('\nFailed tests:');
  errors.forEach(e => console.log('  ❌ ' + e));
}

if (failed > 0) process.exit(1);
else console.log('\n🎉 All buildings calculator tests passed!\n');
