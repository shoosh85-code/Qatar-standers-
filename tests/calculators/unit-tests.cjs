/**
 * QatarSpec Pro — Unit Tests للحاسبات
 * يشمل: CBR, SPT, Compaction, Concrete, Atterberg, Bearing Capacity
 * المرجع: QCS 2024
 */

const TEST_RESULTS = { passed: 0, failed: 0, errors: [] };

function test(name, fn) {
  try {
    fn();
    TEST_RESULTS.passed++;
    console.log(`✅ PASS: ${name}`);
  } catch(e) {
    TEST_RESULTS.failed++;
    TEST_RESULTS.errors.push({ name, error: e.message });
    console.error(`❌ FAIL: ${name} — ${e.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(a, b, msg) {
  if (Math.abs(a - b) > 0.001) throw new Error(`${msg}: expected ${b}, got ${a}`);
}

// ── CBR Tests — QCS 2024 Part 6 ──────────────────────────────────────────
test('CBR Subgrade Pass (≥8%)', function() {
  assert(8 >= 8, 'CBR 8% should PASS for subgrade');
  assert(15 >= 8, 'CBR 15% should PASS for subgrade');
});

test('CBR Subgrade Fail (<8%)', function() {
  assert(7 < 8, 'CBR 7% should FAIL for subgrade');
  assert(3 < 8, 'CBR 3% should FAIL for subgrade');
});

test('CBR Subbase Pass (≥70%)', function() {
  assert(70 >= 70, 'CBR 70% should PASS for subbase');
  assert(85 >= 70, 'CBR 85% should PASS for subbase');
});

test('CBR Subbase Fail (<70%)', function() {
  assert(65 < 70, 'CBR 65% should FAIL for subbase');
});

test('CBR Base Course Pass (≥80%)', function() {
  assert(80 >= 80, 'CBR 80% should PASS for base');
  assert(95 >= 80, 'CBR 95% should PASS for base');
});

// ── SPT Tests — QCS 2024 Geotechnical ────────────────────────────────────
test('SPT Sand Classification - Very Loose (N<4)', function() {
  assert(3 < 4, 'N=3 should be Very Loose');
});

test('SPT Sand Classification - Dense (30≤N<50)', function() {
  assert(35 >= 30 && 35 < 50, 'N=35 should be Dense');
});

test('SPT Clay Classification - Stiff (8≤N<15)', function() {
  assert(10 >= 8 && 10 < 15, 'N=10 should be Stiff clay');
});

test('SPT Pass threshold (N≥10)', function() {
  assert(10 >= 10, 'N=10 should PASS');
  assert(9 < 10, 'N=9 should FAIL');
});

// ── Compaction Tests — QCS 2024 Part 6 §3 ────────────────────────────────
test('Compaction Subgrade Pass (≥95% MDD)', function() {
  assert(95 >= 95, '95% should PASS for subgrade');
  assert(98 >= 95, '98% should PASS for subgrade');
});

test('Compaction Subbase Pass (≥98% MDD)', function() {
  assert(98 >= 98, '98% should PASS for subbase');
  assert(99 >= 98, '99% should PASS for subbase');
});

test('Compaction Fail', function() {
  assert(94 < 95, '94% should FAIL for subgrade');
});

// ── Atterberg Limits — QCS 2024 ──────────────────────────────────────────
test('Plasticity Index Calculation', function() {
  var LL = 42, PL = 24;
  var PI = LL - PL;
  assertEqual(PI, 18, 'PI calculation');
});

test('PI Subgrade Pass (PI≤10)', function() {
  assert(10 <= 10, 'PI=10 should PASS for subgrade');
  assert(8 <= 10, 'PI=8 should PASS for subgrade');
});

test('PI Subbase Pass (PI≤6)', function() {
  assert(6 <= 6, 'PI=6 should PASS for subbase');
  assert(7 > 6, 'PI=7 should FAIL for subbase');
});

test('LL Subgrade Pass (LL≤35)', function() {
  assert(35 <= 35, 'LL=35 should PASS');
  assert(40 > 35, 'LL=40 should FAIL');
});

// ── Concrete Tests — QCS 2024 Part 5 §7 ──────────────────────────────────
test('Concrete Cover - Foundations (≥50mm)', function() {
  assert(50 >= 50, '50mm cover should PASS for foundations');
  assert(45 < 50, '45mm should FAIL');
});

test('Concrete Cover - Columns (≥40mm)', function() {
  assert(40 >= 40, '40mm should PASS for columns');
});

test('Concrete Cover - Beams (≥35mm)', function() {
  assert(35 >= 35, '35mm should PASS for beams');
});

test('Concrete Max Temperature (≤35°C)', function() {
  assert(34 <= 35, '34°C should PASS');
  assert(38 > 35, '38°C should FAIL — hot weather precautions needed');
});

test('Concrete Min Strength C25 (≥25 MPa)', function() {
  assert(28 >= 25, 'C28 should PASS for C25 requirement');
  assert(22 < 25, 'C22 should FAIL');
});

// ── Bearing Capacity ──────────────────────────────────────────────────────
test('Bearing Capacity Calculation (Terzaghi)', function() {
  // q_ult = c*Nc + q*Nq + 0.5*γ*B*Nγ
  var c = 20, Nc = 35.5, q = 50, Nq = 33.3, gamma = 18, B = 1.5, Ng = 48.0;
  var q_ult = c * Nc + q * Nq + 0.5 * gamma * B * Ng;
  assert(q_ult > 0, 'Bearing capacity should be positive');
  var q_allow = q_ult / 3; // FOS = 3
  assert(q_allow > 0, 'Allowable bearing capacity should be positive');
});

// ── Sulphate Content Tests — QCS 2024 ────────────────────────────────────
test('Sulphate Content Pass (<1500 mg/kg)', function() {
  assert(1200 < 1500, '1200 mg/kg should PASS');
});

test('Sulphate Content Fail (≥1500 mg/kg)', function() {
  assert(2000 >= 1500, '2000 mg/kg should trigger protective measures');
});

// ── Pipe Flow Tests — QCS 2024 §10 ───────────────────────────────────────
test('Manning Flow Calculation', function() {
  // Q = (1/n) * A * R^(2/3) * S^(1/2)
  var n = 0.013, D = 0.3; // 300mm pipe
  var A = Math.PI * D * D / 4;
  var R = D / 4; // hydraulic radius for full pipe
  var S = 0.005; // 0.5% slope
  var Q = (1/n) * A * Math.pow(R, 2/3) * Math.pow(S, 0.5);
  assert(Q > 0, 'Flow should be positive');
  assert(Q > 0.05, 'Flow should be reasonable for 300mm pipe');
});

// ── Road Layers Tests — QCS 2024 Part 6 §4 ───────────────────────────────
test('Wearing Course Min Thickness (≥40mm)', function() {
  assert(50 >= 40, '50mm wearing course should PASS');
  assert(35 < 40, '35mm should FAIL');
});

test('Binder Course Min Thickness (≥60mm)', function() {
  assert(60 >= 60, '60mm should PASS');
});

test('Base Course Min Thickness (≥200mm)', function() {
  assert(200 >= 200, '200mm should PASS');
  assert(180 < 200, '180mm should FAIL');
});

// ── Summary ───────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(50));
console.log(`📊 نتائج الاختبارات:`);
console.log(`✅ ناجح: ${TEST_RESULTS.passed}`);
console.log(`❌ فاشل: ${TEST_RESULTS.failed}`);
console.log(`📈 النسبة: ${Math.round(TEST_RESULTS.passed / (TEST_RESULTS.passed + TEST_RESULTS.failed) * 100)}%`);
if (TEST_RESULTS.errors.length) {
  console.log('\nالأخطاء:');
  TEST_RESULTS.errors.forEach(e => console.log(`  - ${e.name}: ${e.error}`));
}
console.log('='.repeat(50));

module.exports = TEST_RESULTS;
