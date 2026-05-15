/**
 * QatarSpec Pro — Unit Tests for 8 Engineering Calculators
 * Tests: calcBeamDeflection, calcIsolatedFooting, calcRetainingWall,
 *        calcManningFlow, calcColumnDesign, calcPileCapacity,
 *        calcAASHTOPavement, calcSteelConnection
 *
 * Run: node tests/calculators/new-calcs.test.cjs
 */

'use strict';

// ═══════════════════════════════════════════════════════════════
// 1. DOM Mock + Globals
// ═══════════════════════════════════════════════════════════════
const _domStore = {};
const _toastLog = [];
let _resultHTML = '';

global.document = {
  getElementById: function (id) {
    return {
      get value() { return _domStore[id] !== undefined ? String(_domStore[id]) : ''; },
      set value(v) { _domStore[id] = v; },
      get innerHTML() { return _resultHTML; },
      set innerHTML(v) { _resultHTML = v; },
      style: {},
      classList: { add() {}, remove() {}, toggle() {} },
      querySelector: () => null,
      querySelectorAll: () => [],
      scrollIntoView: () => {},
      setAttribute: () => {},
      getAttribute: () => null,
    };
  },
  createElement: () => ({ style: {}, classList: { add() {} }, appendChild() {}, innerHTML: '' }),
  head: { appendChild() {} },
  querySelector: () => null,
  querySelectorAll: () => [],
};
global.window = { QS: {}, getComputedStyle: () => ({}) };
global.showToast = function (msg, type) { _toastLog.push({ msg, type }); };
global.QS = { notify: { success() {}, error() {}, warning() {} }, celebrate: { pass() {}, subtle() {} }, track: { useCalculator() {} } };
global.Chart = class { constructor() {} destroy() {} };
global.showResult = function () { /* mock result display */ };
global.qsTrack = function () { /* mock analytics */ };

function setInputs(map) {
  Object.keys(_domStore).forEach(k => delete _domStore[k]);
  _toastLog.length = 0;
  _resultHTML = '';
  Object.entries(map).forEach(([k, v]) => { _domStore[k] = v; });
}

function lastToast() { return _toastLog[_toastLog.length - 1] || null; }

// ═══════════════════════════════════════════════════════════════
// 2. Load calculator files
// ═══════════════════════════════════════════════════════════════
const fs = require('fs');
const vm = require('vm');

function loadCalcFile(path) {
  const code = fs.readFileSync(path, 'utf8');
  vm.runInThisContext(code, { filename: path });
}

try {
  loadCalcFile('js/calcs/structural.js');
  loadCalcFile('js/calcs/utilities.js');
  loadCalcFile('js/calcs/roads.js');
  loadCalcFile('js/calcs/geotech.js');
} catch (e) {
  console.error('❌ FATAL: Cannot load calculator files:', e.message);
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════
// 3. Test Framework (minimal)
// ═══════════════════════════════════════════════════════════════
let _pass = 0, _fail = 0, _currentSuite = '';

function suite(name) { _currentSuite = name; console.log(`\n🧪 ${name}`); }

function test(name, fn) {
  try {
    fn();
    _pass++;
    console.log(`  ✅ ${name}`);
  } catch (e) {
    _fail++;
    console.log(`  ❌ ${name}`);
    console.log(`     ${e.message}`);
  }
}

function assert(condition, msg) { if (!condition) throw new Error(msg || 'Assertion failed'); }
function assertClose(actual, expected, tolerance, msg) {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    throw new Error(`${msg || 'Value mismatch'}: got ${actual}, expected ${expected} ±${tolerance} (diff=${diff.toFixed(4)})`);
  }
}
function assertToastError() {
  const t = lastToast();
  assert(t && t.type === 'error', 'Expected error toast, got: ' + JSON.stringify(t));
}

// ═══════════════════════════════════════════════════════════════
// 4. TESTS
// ═══════════════════════════════════════════════════════════════

// ──────── calcBeamDeflection ────────
suite('calcBeamDeflection');

test('valid uniform load — 6m span, 20kN/m, 300×500 section, fc=30', function () {
  setInputs({
    'bdef-span': 6, 'bdef-load-type': 'uniform', 'bdef-load': 20,
    'bdef-b': 300, 'bdef-h': 500, 'bdef-fc': 30,
  });
  calcBeamDeflection();
  // I = 300×500³/12 = 3.125e9 mm⁴
  // Ec = 4700×√30 = 25,742 MPa
  // δ = 5×20×6000⁴ / (384×25742×3.125e9)
  //   = 5×20×1.296e15 / (384×25742×3.125e9) ≈ 4.19 mm
  // Limit = 6000/250 = 24 mm → PASS
  assert(!lastToast() || lastToast().type !== 'error', 'Should not produce error');
});

test('invalid — missing span', function () {
  setInputs({ 'bdef-load-type': 'uniform', 'bdef-load': 20, 'bdef-b': 300, 'bdef-h': 500, 'bdef-fc': 30 });
  calcBeamDeflection();
  assertToastError();
});

test('invalid — fc out of range (10 MPa)', function () {
  setInputs({
    'bdef-span': 6, 'bdef-load-type': 'uniform', 'bdef-load': 20,
    'bdef-b': 300, 'bdef-h': 500, 'bdef-fc': 10,
  });
  calcBeamDeflection();
  assertToastError();
});

test('invalid — span > 50m', function () {
  setInputs({
    'bdef-span': 55, 'bdef-load-type': 'uniform', 'bdef-load': 20,
    'bdef-b': 300, 'bdef-h': 500, 'bdef-fc': 30,
  });
  calcBeamDeflection();
  assertToastError();
});

test('point load — 8m span, 100kN, 400×600 section, fc=40', function () {
  setInputs({
    'bdef-span': 8, 'bdef-load-type': 'point', 'bdef-load': 100,
    'bdef-b': 400, 'bdef-h': 600, 'bdef-fc': 40,
  });
  calcBeamDeflection();
  assert(!lastToast() || lastToast().type !== 'error', 'Should not produce error');
});

// ──────── calcIsolatedFooting ────────
suite('calcIsolatedFooting');

test('valid — P=800kN, qa=200kPa, fc=30, fy=420', function () {
  setInputs({
    'ftp-P': 800, 'ftp-Mx': 0, 'ftp-My': 0, 'ftp-qa': 200,
    'ftp-fc': 30, 'ftp-fy': 420, 'ftp-cover': 75,
    'ftp-colb': 400, 'ftp-cold': 400,
  });
  calcIsolatedFooting();
  // A_req = 800/200 = 4.0 m² → B = ceil(√4 * 10)/10 = 2.0m
  assert(!lastToast() || lastToast().type !== 'error', 'Should not produce error');
});

test('valid — with moment Mx=50kN.m', function () {
  setInputs({
    'ftp-P': 1000, 'ftp-Mx': 50, 'ftp-My': 0, 'ftp-qa': 200,
    'ftp-fc': 30, 'ftp-fy': 420, 'ftp-cover': 75,
    'ftp-colb': 500, 'ftp-cold': 500,
  });
  calcIsolatedFooting();
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute with eccentricity');
});

test('invalid — P missing', function () {
  setInputs({ 'ftp-qa': 200, 'ftp-fc': 30, 'ftp-fy': 420 });
  calcIsolatedFooting();
  assertToastError();
});

test('invalid — P negative', function () {
  setInputs({
    'ftp-P': -100, 'ftp-qa': 200, 'ftp-fc': 30, 'ftp-fy': 420,
    'ftp-colb': 400, 'ftp-cold': 400,
  });
  calcIsolatedFooting();
  assertToastError();
});

// ──────── calcRetainingWall ────────
suite('calcRetainingWall');

test('valid — H=4m, base=3m, toe=0.8, heel=2.2', function () {
  setInputs({
    'rw-H': 4, 'rw-bw': 3, 'rw-toe': 0.8, 'rw-heel': 2.2,
    'rw-gs': 18, 'rw-phi': 30, 'rw-gc': 24, 'rw-qa': 150,
    'rw-surcharge': 10, 'rw-mu': 0.45,
  });
  calcRetainingWall();
  // Ka = tan²(45-15) = tan²(30°) = 0.333
  // Pa = 0.5 × 0.333 × 18 × 16 = 48 kN/m
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('invalid — base ≠ toe + heel', function () {
  setInputs({
    'rw-H': 4, 'rw-bw': 3, 'rw-toe': 1.0, 'rw-heel': 1.0,
    'rw-gs': 18, 'rw-phi': 30, 'rw-gc': 24, 'rw-qa': 150,
  });
  calcRetainingWall();
  assertToastError();
});

test('invalid — missing H', function () {
  setInputs({ 'rw-bw': 3, 'rw-toe': 0.8, 'rw-heel': 2.2 });
  calcRetainingWall();
  assertToastError();
});

// ──────── calcColumnDesign ────────
suite('calcColumnDesign');

test('valid — Pu=2000kN, 400×400, fc=40, fy=420', function () {
  setInputs({
    'col-Pu': 2000, 'col-Mu': 0, 'col-b': 400, 'col-h': 400,
    'col-fc': 40, 'col-fy': 420, 'col-cover': 40, 'col-klu': 0,
  });
  calcColumnDesign();
  // Ag = 160,000 mm²
  // Ast_min = 0.01 × 160000 = 1600 mm²
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('valid — with moment Mu=150kN.m', function () {
  setInputs({
    'col-Pu': 1500, 'col-Mu': 150, 'col-b': 400, 'col-h': 500,
    'col-fc': 30, 'col-fy': 420, 'col-cover': 40, 'col-klu': 3.5,
  });
  calcColumnDesign();
  assert(!lastToast() || lastToast().type !== 'error', 'Should handle moment');
});

test('invalid — fc out of range', function () {
  setInputs({
    'col-Pu': 2000, 'col-b': 400, 'col-h': 400,
    'col-fc': 15, 'col-fy': 420,
  });
  calcColumnDesign();
  assertToastError();
});

test('invalid — fy out of range', function () {
  setInputs({
    'col-Pu': 2000, 'col-b': 400, 'col-h': 400,
    'col-fc': 30, 'col-fy': 300,
  });
  calcColumnDesign();
  assertToastError();
});

// ──────── calcManningFlow ────────
suite('calcManningFlow');

test('valid — D=600mm, slope=0.5%, n=0.013, depth=0.8', function () {
  setInputs({
    'mann-D': 600, 'mann-slope': 0.5, 'mann-n': 0.013, 'mann-depth': 0.8,
  });
  calcManningFlow();
  // θ = 2×arccos(1 - 2×0.8) = 2×arccos(-0.6) ≈ 4.43 rad
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('valid — full pipe (depth_ratio=1.0)', function () {
  setInputs({
    'mann-D': 300, 'mann-slope': 1.0, 'mann-n': 0.013, 'mann-depth': 1.0,
  });
  calcManningFlow();
  assert(!lastToast() || lastToast().type !== 'error', 'Full pipe should work');
});

test('invalid — D too small (50mm)', function () {
  setInputs({ 'mann-D': 50, 'mann-slope': 0.5, 'mann-n': 0.013, 'mann-depth': 0.5 });
  calcManningFlow();
  assertToastError();
});

test('invalid — n too large (0.06)', function () {
  setInputs({ 'mann-D': 600, 'mann-slope': 0.5, 'mann-n': 0.06, 'mann-depth': 0.5 });
  calcManningFlow();
  assertToastError();
});

test('invalid — depth_ratio < 0.1', function () {
  setInputs({ 'mann-D': 600, 'mann-slope': 0.5, 'mann-n': 0.013, 'mann-depth': 0.05 });
  calcManningFlow();
  assertToastError();
});

// ──────── calcPileCapacity ────────
suite('calcPileCapacity');

test('valid — bored pile, cohesive, D=600, L=15, N=25', function () {
  setInputs({
    'pile-D': 600, 'pile-L': 15, 'pile-soil': 'cohesive',
    'pile-N': 25, 'pile-fc': 30, 'pile-type': 'bored',
  });
  calcPileCapacity();
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('valid — driven pile, granular, D=400, L=20, N=30', function () {
  setInputs({
    'pile-D': 400, 'pile-L': 20, 'pile-soil': 'granular',
    'pile-N': 30, 'pile-fc': 35, 'pile-type': 'driven',
  });
  calcPileCapacity();
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('invalid — D too large (2500mm)', function () {
  setInputs({
    'pile-D': 2500, 'pile-L': 15, 'pile-soil': 'cohesive',
    'pile-N': 25, 'pile-fc': 30, 'pile-type': 'bored',
  });
  calcPileCapacity();
  assertToastError();
});

test('invalid — L too short (2m)', function () {
  setInputs({
    'pile-D': 600, 'pile-L': 2, 'pile-soil': 'cohesive',
    'pile-N': 25, 'pile-type': 'bored',
  });
  calcPileCapacity();
  assertToastError();
});

// ──────── calcAASHTOPavement ────────
suite('calcAASHTOPavement');

test('valid — ESAL=5e6, Mr=80MPa, R=95%, So=0.45', function () {
  setInputs({
    'aash-esal': 5000000, 'aash-Mr': 80, 'aash-R': 95,
    'aash-So': 0.45, 'aash-DPSI': 1.7,
  });
  calcAASHTOPavement();
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute SN');
});

test('valid — low traffic ESAL=50000, Mr=50', function () {
  setInputs({
    'aash-esal': 50000, 'aash-Mr': 50, 'aash-R': 85,
    'aash-So': 0.45, 'aash-DPSI': 1.7,
  });
  calcAASHTOPavement();
  assert(!lastToast() || lastToast().type !== 'error', 'Low traffic should work');
});

test('invalid — ESAL too small (100)', function () {
  setInputs({ 'aash-esal': 100, 'aash-Mr': 80, 'aash-R': 95 });
  calcAASHTOPavement();
  assertToastError();
});

test('invalid — Mr out of range (5 MPa)', function () {
  setInputs({ 'aash-esal': 5000000, 'aash-Mr': 5, 'aash-R': 95 });
  calcAASHTOPavement();
  assertToastError();
});

test('invalid — Reliability > 99.9%', function () {
  setInputs({ 'aash-esal': 5000000, 'aash-Mr': 80, 'aash-R': 100 });
  calcAASHTOPavement();
  assertToastError();
});

// ──────── calcSteelConnection ────────
suite('calcSteelConnection');

test('valid — 8.8 grade, M20, 4 bolts, shear, t=12mm', function () {
  setInputs({
    'sc-grade': '8.8', 'sc-d': 20, 'sc-n': 4, 'sc-t': 12,
    'sc-Fu': 400, 'sc-load-type': 'shear', 'sc-Vu': 200,
  });
  calcSteelConnection();
  // Ab = π×20²/4 = 314.16 mm²
  // Fnv (8.8) = 372 MPa (AISC)
  // φRn_shear = 0.75 × 372 × 314.16 × 4 = 351 kN → 200 ≤ 351 PASS
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('valid — 10.9 grade, M24, 6 bolts, tension', function () {
  setInputs({
    'sc-grade': '10.9', 'sc-d': 24, 'sc-n': 6, 'sc-t': 16,
    'sc-Fu': 450, 'sc-load-type': 'tension', 'sc-Vu': 500,
  });
  calcSteelConnection();
  assert(!lastToast() || lastToast().type !== 'error', 'Should compute OK');
});

test('invalid — bolt diameter 8mm (too small)', function () {
  setInputs({
    'sc-grade': '8.8', 'sc-d': 8, 'sc-n': 4, 'sc-t': 12,
    'sc-Fu': 400, 'sc-load-type': 'shear', 'sc-Vu': 100,
  });
  calcSteelConnection();
  assertToastError();
});

test('invalid — too many bolts (25)', function () {
  setInputs({
    'sc-grade': '8.8', 'sc-d': 20, 'sc-n': 25, 'sc-t': 12,
    'sc-Fu': 400, 'sc-load-type': 'shear', 'sc-Vu': 100,
  });
  calcSteelConnection();
  assertToastError();
});

// ═══════════════════════════════════════════════════════════════
// 5. Results
// ═══════════════════════════════════════════════════════════════
console.log('\n══════════════════════════════════════');
console.log(`✅ Passed: ${_pass}`);
console.log(`❌ Failed: ${_fail}`);
console.log(`📊 Total:  ${_pass + _fail}`);
console.log('══════════════════════════════════════');

if (_fail > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 All calculator tests passed!');
  process.exit(0);
}
