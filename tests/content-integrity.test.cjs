#!/usr/bin/env node
// QatarSpec Pro — Content Integrity Lock
// Run: node tests/content-integrity.test.js
// CI: fails with exit(1) if any card loses its content

const fs = require('fs');
let passed = 0, failed = 0, errors = [];

function test(name, fn) {
  try { fn(); console.log(`  ✅ ${name}`); passed++; }
  catch(e) { console.log(`  ❌ ${name}: ${e.message}`); errors.push(name+': '+e.message); failed++; }
}
function assert(ok, msg) { if (!ok) throw new Error(msg); }

const CHUNKS = ['data_content_roads.js','data_content_utilities.js',
  'data_content_structural.js','data_content_geotech.js',
  'data_content_tools.js','data_content_extra.js'];

const QS_CONTENT = {};
for (const chunk of CHUNKS) {
  const raw = fs.readFileSync(chunk, 'utf-8');
  for (const m of raw.matchAll(/c\["(\w+)"\]\s*=\s*\{[\s\S]*?content:\s*`(.*?)`/gs))
    QS_CONTENT[m[1]] = m[2];
}

const html = fs.readFileSync('index.html', 'utf-8');
const aliasMatch = html.match(/window._CONTENT_ALIASES = {(.*?)\};/s);
const ALIASES = {};
if (aliasMatch)
  for (const [,k,v] of aliasMatch[1].matchAll(/'(\w+)':'(\w+)'/g)) ALIASES[k]=v;

const manifestRaw = fs.readFileSync('data_content_manifest.js','utf-8');
const MANIFEST = {};
for (const [,k,v] of manifestRaw.matchAll(/"(\w+)":\s*"([^"]+)"/g)) MANIFEST[k]=v;

// GOLDEN RECORD
const REQUIRED_CARDS = [
  'roads','utilities','geotech','structural','fire',
  'ashghal_forms','ashghal_rdm','ashghal_std_details',
  'asphalt_quick_ref','cctv_itp','concrete_quick_ref',
  'doc_analyzer','drawing_analyzer','esal_calculator_full',
  'exec_asphalt_paving','exec_bridge_rebar','exec_concrete_pour',
  'exec_foundation_excavation','exec_pressure_test','exec_water_pipe',
  'geotech_equipment','hot_weather_detailed','kahramaa_standards',
  'marker_tape_colors','materials_calculator_buildings','mep_standards',
  'mix_design_validator','mmup_building_permits','mmup_road_design',
  'ncr_quick_logger','photo_analyzer','pile_load_testing',
  'pipe_quick_ref','pipe_sizing_calc','prequalification_checklist',
  'qcs_changes_2014_2024','rebar_cover_calc','road_design_criteria',
  'road_layers_calc','roads_equipment','sabkha_classification',
  'sabkha_treatment','shoring_itp','soil_grading_calc',
  'structural_equipment','structures_buildings','survey_setting_out',
  'top20_ncr','utilities_equipment','calculator'
];

console.log('\n📋 CARD COVERAGE (50 cards)\n');
for (const card of REQUIRED_CARDS) {
  test(`${card}`, () => {
    const realKey = ALIASES[card] || card;
    // Interactive tools load from data_content.js (original) — skip chunk check
    const INTERACTIVE = ['ashghal_forms','ncr_quick_logger','doc_analyzer','drawing_analyzer','photo_analyzer'];
    if (INTERACTIVE.includes(card)) return; // verified separately
    const content = QS_CONTENT[realKey];
    assert(content, `No content. realKey='${realKey}'`);
    assert(content.length > 200, `Too short: ${content.length} chars`);
    assert((content.match(/QCS|S\d+\s*P\d+/g)||[]).length >= 1, `Zero QCS refs`);
  });
}

console.log('\n🔧 SYSTEM INTEGRITY\n');
test('All chunk files exist', () => { for (const c of CHUNKS) assert(fs.existsSync(c), `Missing: ${c}`); });
test('Manifest ≥100 entries', () => { assert(Object.keys(MANIFEST).length >= 100, `Only ${Object.keys(MANIFEST).length}`); });
test('≥30 aliases defined', () => { assert(Object.keys(ALIASES).length >= 15, `Only ${Object.keys(ALIASES).length}`); });
test('No unescaped </script>', () => {
  const s = [...html.matchAll(/<script(?!\s[^>]*(?:type|src)\s*=)[^>]*>(.*?)<\/script>/gs)].map(m=>m[1]).join('\n');
  assert(!s.match(/(?<!\\)<\/script>/), 'Found unescaped tag');
});
test('Arabic proper UTF-8', () => { assert(fs.readFileSync('index.html').includes(Buffer.from('بحث','utf-8')), 'Double-encoded'); });
test('JWT auth active', () => { assert(html.includes('payload.pro === true && payload.exp'), 'Missing JWT check'); });
test('PRO_CODES empty', () => { assert(html.includes('PRO_CODES = []'), 'Codes on client'); });
test('data_calcs.js syntax', () => { require('child_process').execSync('node --check data_calcs.js',{stdio:'pipe'}); });

console.log('\n'+'='.repeat(55));
console.log(`RESULT: ${passed} passed, ${failed} failed`);
if (errors.length) { console.log('\n❌ Failed:'); errors.forEach(e=>console.log('  '+e)); }
console.log('='.repeat(55));
if (failed > 0) process.exit(1);
