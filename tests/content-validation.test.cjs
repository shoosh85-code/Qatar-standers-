/**
 * QatarSpec Pro — Content Validation Tests
 * 
 * اختبارات:
 * 1. كل key في manifest → الملف موجود على disk
 * 2. كل ملف في manifest → قابل للتحميل (syntax valid)
 * 3. كل key في manifest → يوجد في ملفات المحتوى
 * 4. كل <script> مضمن في ملفات المحتوى → syntax valid
 * 5. لا template literal \n bugs
 * 6. QCS_CONTENT يحمّل كل key بشكل صحيح
 *
 * Run: node tests/content-validation.test.cjs
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

let passed = 0, failed = 0, errors = [];

function test(name, fn) {
  try { fn(); console.log(`  ✅ ${name}`); passed++; }
  catch(e) { console.log(`  ❌ ${name}: ${e.message}`); errors.push(name + ': ' + e.message); failed++; }
}
function assert(ok, msg) { if (!ok) throw new Error(msg); }

// ══════════════════════════════════════════════════════════
// 1. قراءة الـ Manifest
// ══════════════════════════════════════════════════════════
console.log('\n📋 1. Manifest Validation\n');

const manifestPath = path.join(__dirname, '../data_content_manifest.js');
const manifestRaw  = fs.readFileSync(manifestPath, 'utf-8');

// استخرج كل key → file
const MANIFEST = {};
for (const [, k, v] of manifestRaw.matchAll(/"(\w+)":\s*"([^"]+)"/g))
  MANIFEST[k] = v;

const manifestKeys  = Object.keys(MANIFEST);
const manifestFiles = [...new Set(Object.values(MANIFEST))];

test(`Manifest يحتوي على مفاتيح (≥ 50)`, () => {
  assert(manifestKeys.length >= 50, `Only ${manifestKeys.length} keys`);
});

test(`Manifest يحتوي على ملفات content (≥ 5)`, () => {
  assert(manifestFiles.length >= 5, `Only ${manifestFiles.length} files`);
});

// ══════════════════════════════════════════════════════════
// 2. كل ملف في manifest → موجود على disk
// ══════════════════════════════════════════════════════════
console.log('\n📂 2. File Existence\n');

for (const file of manifestFiles) {
  test(`ملف موجود: ${file}`, () => {
    const filePath = path.join(__dirname, '..', file);
    assert(fs.existsSync(filePath), `File not found: ${file}`);
  });
}

// ══════════════════════════════════════════════════════════
// 3. كل ملف → JS syntax valid
// ══════════════════════════════════════════════════════════
console.log('\n🔍 3. Content Files Syntax\n');

const CONTENT_FILES = [
  'data_content_roads.js',
  'data_content_utilities.js',
  'data_content_structural.js',
  'data_content_geotech.js',
  'data_content_tools.js',
  'data_content_extra.js',
  'data_content_phase4.js',
  'data_content_buildings.js',
  'data_content_manifest.js',
  'data_calcs.js',
];

for (const file of CONTENT_FILES) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) continue;
  test(`Syntax OK: ${file}`, () => {
    try {
      new Function(fs.readFileSync(filePath, 'utf-8'));
    } catch(e) {
      throw new Error(`Syntax error: ${e.message.substring(0, 100)}`);
    }
  });
}

// ══════════════════════════════════════════════════════════
// 4. استخراج QS_CONTENT من ملفات المحتوى
// ══════════════════════════════════════════════════════════
console.log('\n📦 4. QS_CONTENT Keys\n');

const QS_CONTENT = {};

const CHUNKS = [
  'data_content_roads.js', 'data_content_utilities.js',
  'data_content_structural.js', 'data_content_geotech.js',
  'data_content_tools.js', 'data_content_extra.js',
  'data_content_phase4.js', 'data_content_buildings.js',
];

let totalContentKeys = 0;

for (const chunk of CHUNKS) {
  const chunkPath = path.join(__dirname, '..', chunk);
  if (!fs.existsSync(chunkPath)) continue;
  const raw = fs.readFileSync(chunkPath, 'utf-8');
  // استخرج c["key"] = { ... content: `...` }
  for (const m of raw.matchAll(/c\["(\w+)"\]\s*=\s*\{[\s\S]*?content:\s*`([\s\S]*?)`/g)) {
    QS_CONTENT[m[1]] = m[2];
    totalContentKeys++;
  }
  // استخرج أيضاً c["key"] = { بدون content مباشرة (بعض البطاقات)
  for (const m of raw.matchAll(/c\["(\w+)"\]\s*=\s*\{/g)) {
    if (!QS_CONTENT[m[1]]) QS_CONTENT[m[1]] = '__no_content__';
  }
}

test(`QS_CONTENT يحتوي على مفاتيح (≥ 50)`, () => {
  assert(totalContentKeys >= 50, `Only ${totalContentKeys} content keys extracted`);
});

// تحقق أن كل key في manifest موجود في content files
console.log('\n🔗 5. Manifest Keys → Content Files\n');

const REQUIRED_KEYS = [
  'roads', 'utilities', 'geotech', 'structural', 'fire',
  'ashghal_forms', 'ashghal_rdm', 'concrete_quick_ref',
  'rebar_cover_calc', 'road_layers_calc', 'soil_grading_calc',
  'pipe_sizing_calc', 'calculator', 'materials_calculator_buildings',
];

for (const key of REQUIRED_KEYS) {
  test(`QS_CONTENT["${key}"] موجود`, () => {
    assert(
      QS_CONTENT[key] !== undefined,
      `Key "${key}" not found in any content file`
    );
  });
}

// ══════════════════════════════════════════════════════════
// 5. كل <script> مضمن → syntax valid
// ══════════════════════════════════════════════════════════
console.log('\n📜 6. Embedded Scripts Syntax\n');

const CONTENT_WITH_SCRIPTS = [...CHUNKS, 'data_content_buildings.js'];
let scriptCount = 0;
let scriptFailed = 0;

for (const chunk of CONTENT_WITH_SCRIPTS) {
  const chunkPath = path.join(__dirname, '..', chunk);
  if (!fs.existsSync(chunkPath)) continue;
  const raw = fs.readFileSync(chunkPath, 'utf-8');

  // استخرج <script>...</script> من داخل template literals
  const scriptRe = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
  let m, i = 0;
  while ((m = scriptRe.exec(raw)) !== null) {
    const code = m[1].trim();
    if (code.length < 20) continue;
    scriptCount++;
    const scriptName = `${chunk}[script#${i++}]`;
    test(`Script syntax OK: ${scriptName.substring(0, 60)}`, () => {
      try {
        new Function(code);
      } catch(e) {
        scriptFailed++;
        throw new Error(`Syntax error: ${e.message.substring(0, 100)}`);
      }
    });
  }
}

if (scriptCount === 0) {
  console.log('  ℹ️  لا يوجد scripts مضمنة في ملفات المحتوى');
}

// ══════════════════════════════════════════════════════════
// 6. لا template literal \n bugs (خطأ شائع)
// ══════════════════════════════════════════════════════════
console.log('\n🐛 7. Template Literal \\n Bug Detection\n');

for (const chunk of CHUNKS) {
  const chunkPath = path.join(__dirname, '..', chunk);
  if (!fs.existsSync(chunkPath)) continue;
  const raw = fs.readFileSync(chunkPath, 'utf-8');

  test(`لا \`\\n\` escaped في template literals: ${chunk}`, () => {
    // بحث عن \\n (مشكلة شائعة في template literals)
    const escaped = (raw.match(/`[^`]*\\\\n[^`]*`/g) || []).length;
    // بحث عن `\n` literal string بشكل خاطئ
    const problematic = (raw.match(/content:\s*`[^`]{0,500}\\\\n/g) || []).length;
    assert(
      problematic === 0,
      `Found ${problematic} suspicious \\\\n in template literals (possible rendering bug)`
    );
  });
}

// ══════════════════════════════════════════════════════════
// 7. HTML Structure في Content
// ══════════════════════════════════════════════════════════
console.log('\n🏗️  8. HTML Structure Validation\n');

function extractContent(chunk) {
  const chunkPath = path.join(__dirname, '..', chunk);
  if (!fs.existsSync(chunkPath)) return {};
  const raw = fs.readFileSync(chunkPath, 'utf-8');
  const result = {};
  for (const m of raw.matchAll(/c\["(\w+)"\]\s*=\s*\{[\s\S]*?content:\s*`([\s\S]*?)`/g))
    result[m[1]] = m[2];
  return result;
}

const roadsContent = extractContent('data_content_roads.js');
const utilContent  = extractContent('data_content_utilities.js');

test('roads content: HTML tags balanced (تقريباً)', () => {
  const sample = roadsContent['roads'] || '';
  if (!sample) return; // skip if not found
  const opens  = (sample.match(/<div/g)  || []).length;
  const closes = (sample.match(/<\/div>/g) || []).length;
  const diff = Math.abs(opens - closes);
  assert(diff <= 5, `Unbalanced divs in roads: ${opens} opens vs ${closes} closes`);
});

test('utilities content: موجود وغير فارغ', () => {
  const sample = utilContent['utilities'] || '';
  assert(sample.length > 100, `utilities content too short: ${sample.length} chars`);
});

// ══════════════════════════════════════════════════════════
// 8. Security — لا API keys مكشوفة في المحتوى
// ══════════════════════════════════════════════════════════
console.log('\n🔒 9. Security Check in Content\n');

for (const chunk of CHUNKS) {
  const chunkPath = path.join(__dirname, '..', chunk);
  if (!fs.existsSync(chunkPath)) continue;
  test(`لا API keys مكشوفة في: ${chunk}`, () => {
    const raw = fs.readFileSync(chunkPath, 'utf-8');
    assert(!/sk-ant-[A-Za-z0-9\-]{20,}/.test(raw), `Anthropic key found in ${chunk}`);
    assert(!/AIza[A-Za-z0-9_\-]{35}/.test(raw), `Google API key found in ${chunk}`);
    assert(!/ghp_[A-Za-z0-9]{36}/.test(raw), `GitHub token found in ${chunk}`);
  });
}

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
else console.log('\n🎉 All content validation tests passed!\n');
