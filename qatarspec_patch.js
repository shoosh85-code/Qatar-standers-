// ============================================================
// QATARSPEC PRO — COMPLETE PATCH
// Insert this entire block BEFORE </script> in index.html
// ============================================================

// ===== 1. VIDEO PERSISTENCE FIX (File object storage) =====
// Replaces broken ObjectURL system with persistent File storage

var _videoStore = {};  // key: inputId → { file, name, size }

function loadLocalVideo(input, playerId, placeholderId) {
  var file = input.files[0];
  if (!file) return;
  var inputId = input.id;
  // Store file object (survives DOM rebuild — stays in memory)
  _videoStore[inputId] = { file: file, name: file.name, size: file.size };
  _renderVideo(inputId, playerId, placeholderId);
}

function _renderVideo(inputId, playerId, phId) {
  var stored = _videoStore[inputId];
  if (!stored) return;
  var player = document.getElementById(playerId);
  var ph     = document.getElementById(phId);
  if (!player) return;
  // Create fresh ObjectURL from stored File
  var url = URL.createObjectURL(stored.file);
  player.src = url;
  player.style.display = 'block';
  player.load();
  if (ph) ph.style.display = 'none';
  // Badge
  var badgeId = 'vbadge_' + playerId;
  if (!document.getElementById(badgeId)) {
    var badge = document.createElement('div');
    badge.id = badgeId;
    badge.style.cssText = 'font-size:10px;color:#2ecc71;padding:3px 12px;background:rgba(46,204,113,0.1);border-top:1px solid rgba(46,204,113,0.2);';
    badge.textContent = '✅ ' + stored.name + ' (' + (stored.size/1024/1024).toFixed(1) + ' MB)';
    if (player.parentNode) player.parentNode.appendChild(badge);
  }
}

// Called after every openDetail / goBack DOM rebuild
function _restoreVideos() {
  if (!Object.keys(_videoStore).length) return;
  document.querySelectorAll('input[type="file"][accept*="video"]').forEach(function(input) {
    var id = input.id;
    if (!id || !_videoStore[id]) return;
    var playerId = input.getAttribute('data-player') || id.replace(/^vid-/, 'vid-player-');
    var phId     = input.getAttribute('data-ph')     || id.replace(/^vid-/, 'vid-ph-');
    input.onchange = function() { loadLocalVideo(this, playerId, phId); };
    _renderVideo(id, playerId, phId);
  });
}

// Patch openDetail to call _restoreVideos after render
var _origOpenDetail = window.openDetail;
window.openDetail = function(key) {
  _origOpenDetail(key);
  setTimeout(_restoreVideos, 80);
  setTimeout(function() {
    var lang = localStorage.getItem('qsp_lang') || 'ar';
    setLang(lang);
  }, 90);
};

var _origGoBack = window.goBack;
if (typeof _origGoBack === 'function') {
  window.goBack = function() {
    _origGoBack();
    setTimeout(_restoreVideos, 80);
  };
}

// ===== 2. DUAL CALCULATOR SYSTEM =====
// Mode 1: Testing Frequency (by quantity delivered)
// Mode 2: Pass/Fail check (existing calculator)

function switchCalcMode(mode, btn) {
  var fp = document.getElementById('calc-freq-panel');
  var pp = document.getElementById('calc-pass-panel');
  var tf = document.getElementById('calc-tab-freq');
  var tp = document.getElementById('calc-tab-pass');
  if (mode === 'freq') {
    if (fp) fp.style.display = 'block';
    if (pp) pp.style.display = 'none';
    if (tf) { tf.style.background='rgba(201,168,76,0.2)'; tf.style.color='var(--gold)'; tf.style.fontWeight='700'; }
    if (tp) { tp.style.background='var(--dark4)'; tp.style.color='var(--text2)'; tp.style.fontWeight='400'; }
  } else {
    if (fp) fp.style.display = 'none';
    if (pp) pp.style.display = 'block';
    if (tp) { tp.style.background='rgba(201,168,76,0.2)'; tp.style.color='var(--gold)'; tp.style.fontWeight='700'; }
    if (tf) { tf.style.background='var(--dark4)'; tf.style.color='var(--text2)'; tf.style.fontWeight='400'; }
  }
}

// Frequency data per material (QCS 2024)
var FREQ_DB = {
  subgrade: {
    label: 'Subgrade Soil — تربة Subgrade',
    tests: [
      { name: 'Standard Proctor (MDD+OMC)', unit: 'm³', per: 2000, std: 'ASTM D698', type: 'HP' },
      { name: 'CBR Soaked 4 days', unit: 'm²', per: 2000, std: 'ASTM D1883', type: 'HP' },
      { name: 'Atterberg Limits (LL+PI)', unit: 'm³', per: 2000, std: 'ASTM D4318', type: 'W' },
      { name: 'Sulphate SO₃ + Chloride', unit: 'm³', per: 2000, std: 'BS 1377', type: 'W' },
      { name: 'Grading Analysis', unit: 'm³', per: 2000, std: 'ASTM C136', type: 'W' },
      { name: 'Field Density (Sand Cone)', unit: 'm²', per: 500, std: 'ASTM D1556', type: 'W' },
      { name: 'Level Survey ±10mm', unit: 'm (LM)', per: 25, std: 'Total Station', type: 'HP' },
    ]
  },
  subbase: {
    label: 'Subbase Course',
    tests: [
      { name: 'Grading Analysis (Table 4:1)', unit: 'm³', per: 500, std: 'ASTM C136', type: 'W' },
      { name: 'LA Abrasion ≤40%', unit: 'm³', per: 1000, std: 'ASTM C131', type: 'W' },
      { name: 'Flakiness Index ≤40%', unit: 'm³', per: 500, std: 'BS 812 P105', type: 'W' },
      { name: 'Water Absorption ≤3%', unit: 'm³', per: 500, std: 'ASTM C127', type: 'W' },
      { name: 'Plasticity Index ≤6%', unit: 'm³', per: 500, std: 'ASTM D4318', type: 'W' },
      { name: 'Sand Equivalent ≥25%', unit: 'm³', per: 500, std: 'ASTM D2419', type: 'W' },
      { name: 'Sulphate SO₃ + Chloride', unit: 'm³', per: 1000, std: 'BS 1377', type: 'W' },
      { name: 'CBR Soaked 4 days ≥70%', unit: 'm²', per: 2000, std: 'ASTM D1883', type: 'HP' },
      { name: 'Field Density ≥98% MDD', unit: 'm²', per: 500, std: 'ASTM D1556', type: 'W' },
      { name: 'Level Survey ±10mm', unit: 'm (LM)', per: 25, std: 'Total Station', type: 'HP' },
    ]
  },
  base: {
    label: 'Road Base Course',
    tests: [
      { name: 'Grading Analysis (Table 4:1)', unit: 'm³', per: 500, std: 'ASTM C136', type: 'W' },
      { name: 'LA Abrasion ≤30%', unit: 'm³', per: 1000, std: 'ASTM C131', type: 'W' },
      { name: 'Flakiness Index ≤30%', unit: 'm³', per: 500, std: 'BS 812 P105', type: 'W' },
      { name: 'Fractured Faces 1+ ≥75%', unit: 'm³', per: 500, std: 'ASTM D5821', type: 'W' },
      { name: 'Fractured Faces 2+ ≥50%', unit: 'm³', per: 500, std: 'ASTM D5821', type: 'W' },
      { name: 'Water Absorption ≤2%', unit: 'm³', per: 500, std: 'ASTM C127', type: 'W' },
      { name: 'Plasticity Index ≤4%', unit: 'm³', per: 500, std: 'ASTM D4318', type: 'W' },
      { name: 'Sand Equivalent ≥35%', unit: 'm³', per: 500, std: 'ASTM D2419', type: 'W' },
      { name: 'Sulphate SO₃ ≤0.5% + Chloride ≤0.6%', unit: 'm³', per: 1000, std: 'BS 1377', type: 'W' },
      { name: 'CBR Soaked 4 days ≥80%', unit: 'm²', per: 2000, std: 'ASTM D1883', type: 'HP' },
      { name: 'Soundness (MgSO₄) ≤12%', unit: 'm³', per: 1000, std: 'ASTM C88', type: 'W' },
      { name: 'Field Density ≥98% MDD', unit: 'm²', per: 500, std: 'ASTM D1556', type: 'W' },
      { name: 'Level Survey ±8mm', unit: 'm (LM)', per: 25, std: 'Total Station', type: 'HP' },
    ]
  },
  prime_coat: {
    label: 'Prime Coat (MC-30/70)',
    tests: [
      { name: 'Tanker Calibration Report', unit: 'Per tanker', per: 0, std: 'QCS S6 P5', type: 'HP' },
      { name: 'Surface Check (dry+clean)', unit: 'Before each spray', per: 0, std: 'Visual', type: 'W' },
      { name: 'Application Rate (0.8-1.2 L/m²)', unit: 'm²', per: 1000, std: 'QCS S6 P5', type: 'W' },
      { name: 'Spray Temperature (50-80°C)', unit: 'Each tanker', per: 0, std: 'Thermometer', type: 'W' },
      { name: 'Curing Check (24hr before AC)', unit: 'Per section', per: 0, std: 'Visual', type: 'HP' },
    ]
  },
  tack_coat: {
    label: 'Tack Coat (SS-1h/CSS-1h)',
    tests: [
      { name: 'Tanker Calibration', unit: 'Per tanker', per: 0, std: 'QCS S6 P5', type: 'HP' },
      { name: 'Application Rate Binder (0.3-0.5 L/m²)', unit: 'm²', per: 1000, std: 'QCS S6 P5', type: 'W' },
      { name: 'Application Rate WC (0.2-0.4 L/m²)', unit: 'm²', per: 1000, std: 'QCS S6 P5', type: 'W' },
      { name: 'Breakup Check (black color)', unit: 'Before paving', per: 0, std: 'Visual', type: 'HP' },
    ]
  },
  binder_course: {
    label: 'Binder Course (BC-A / BC-B)',
    tests: [
      { name: 'JMF Approval before production', unit: 'Per mix design', per: 0, std: 'QCS S6 P5', type: 'HP' },
      { name: 'Trial Section ≥200m', unit: 'Before production', per: 0, std: 'QCS S6 P5', type: 'HP' },
      { name: 'Delivery Temperature ≥135°C (Non-PMB)', unit: 'Each load', per: 0, std: 'QCS S6 P5', type: 'W' },
      { name: 'Bitumen Extraction (JMF ±0.3%)', unit: 'tonne', per: 200, std: 'ASTM D2172', type: 'W' },
      { name: 'Grading Analysis vs JMF', unit: 'tonne', per: 200, std: 'ASTM C136', type: 'W' },
      { name: 'Marshall Stability ≥8kN (BC-B) / ≥9kN (BC-A)', unit: 'tonne', per: 200, std: 'ASTM D1559', type: 'HP' },
      { name: 'Marshall Flow 2-4mm', unit: 'tonne', per: 200, std: 'ASTM D1559', type: 'W' },
      { name: 'Air Voids Va 3-5%', unit: 'tonne', per: 200, std: 'ASTM D3203', type: 'W' },
      { name: 'VMA ≥14%', unit: 'tonne', per: 200, std: 'Calculation', type: 'W' },
      { name: 'TSR ≥75% (BC-B) / ≥80% (BC-A)', unit: 'Per JMF', per: 0, std: 'AASHTO T283', type: 'HP' },
      { name: 'Core Density ≥96% TMD', unit: 'm²', per: 1000, std: 'ASTM D6927', type: 'HP' },
      { name: 'Thickness (compacted ±10mm)', unit: 'm²', per: 1000, std: 'Core / DCP', type: 'W' },
      { name: 'Level Survey ±8mm', unit: 'm (LM)', per: 25, std: 'Total Station', type: 'HP' },
    ]
  },
  wearing_course: {
    label: 'Wearing Course (WC)',
    tests: [
      { name: 'JMF Approval + Trial Section', unit: 'Before production', per: 0, std: 'QCS S6 P5', type: 'HP' },
      { name: 'Delivery Temp ≥135°C (Non-PMB) / ≥145°C (PMB)', unit: 'Each load', per: 0, std: 'QCS S6 P5', type: 'W' },
      { name: 'Bitumen Extraction ±0.3%', unit: 'tonne', per: 200, std: 'ASTM D2172', type: 'W' },
      { name: 'Marshall Stability ≥9kN', unit: 'tonne', per: 200, std: 'ASTM D1559', type: 'HP' },
      { name: 'Air Voids Va 3-5% (design 4%)', unit: 'tonne', per: 200, std: 'ASTM D3203', type: 'W' },
      { name: 'VMA ≥15%', unit: 'tonne', per: 200, std: 'Calculation', type: 'W' },
      { name: 'VFA 65-80%', unit: 'tonne', per: 200, std: 'Calculation', type: 'W' },
      { name: 'TSR ≥80%', unit: 'Per JMF', per: 0, std: 'AASHTO T283', type: 'HP' },
      { name: 'Core Density ≥96% TMD', unit: 'm²', per: 1000, std: 'ASTM D6927', type: 'HP' },
      { name: 'PSV ≥55 (WC only)', unit: 'Per source', per: 0, std: 'BS 812 P114', type: 'HP' },
      { name: 'Straightedge 3m ≤5mm (≤3mm PMB)', unit: 'm (LM)', per: 100, std: 'QCS S6 P5', type: 'W' },
      { name: 'IRI ≤1.5 m/km (≤0.9 PMB)', unit: 'm (LM)', per: 400, std: 'PWA IAN 013', type: 'HP' },
      { name: 'Level Survey ±6mm', unit: 'm (LM)', per: 25, std: 'Total Station', type: 'HP' },
    ]
  },
  concrete: {
    label: 'Concrete — خرسانة',
    tests: [
      { name: 'Mix Design (JMF) Approval', unit: 'Per mix', per: 0, std: 'QCS S5 P4', type: 'HP' },
      { name: 'Aggregate Sulphate ≤0.4%', unit: 'm³', per: 500, std: 'BS 1377', type: 'W' },
      { name: 'Aggregate Chloride ≤0.04%', unit: 'm³', per: 500, std: 'BS 1377', type: 'W' },
      { name: 'Slump Test', unit: 'm³', per: 50, std: 'BS EN 12350', type: 'W' },
      { name: 'Temperature Check ≤32°C', unit: 'Each load', per: 0, std: 'QCS S5', type: 'W' },
      { name: 'Cube Sampling (6 cubes)', unit: 'm³', per: 50, std: 'BS EN 12390', type: 'W' },
      { name: '7-Day Cube ≥70% fcu', unit: 'Per set', per: 0, std: 'BS EN 12390', type: 'HP' },
      { name: '28-Day Cube ≥100% fcu', unit: 'Per set', per: 0, std: 'BS EN 12390', type: 'HP' },
      { name: 'Cover Check ±5mm', unit: 'Per element', per: 0, std: 'Cover Meter', type: 'W' },
    ]
  },
  rebar: {
    label: 'Reinforcement Steel Grade 500B',
    tests: [
      { name: 'Mill Certificate Review', unit: 'Per heat', per: 0, std: 'BS 4449', type: 'HP' },
      { name: 'Tensile Test (fy≥500 / fu≥600)', unit: 'tonne', per: 25, std: 'BS 4449', type: 'HP' },
      { name: 'Bend Test 180° (no cracking)', unit: 'tonne', per: 25, std: 'BS 4449', type: 'W' },
      { name: 'Elongation ≥14%', unit: 'tonne', per: 25, std: 'BS 4449', type: 'W' },
      { name: 'fu/fy Ratio ≥1.15', unit: 'Per tensile set', per: 0, std: 'BS 4449', type: 'HP' },
    ]
  },
  water_supply: {
    label: 'Water Supply Pipe — مياه الشرب',
    tests: [
      { name: 'Material Approval (MAR)', unit: 'Per delivery', per: 0, std: 'KAHRAMAA', type: 'HP' },
      { name: 'Wall Thickness Check', unit: 'Per batch', per: 0, std: 'ISO 4427', type: 'W' },
      { name: 'Bedding Compaction ≥90% MDD', unit: 'm (LM)', per: 50, std: 'ASTM D1556', type: 'W' },
      { name: 'Backfill Compaction ≥95% MDD', unit: 'm²', per: 500, std: 'ASTM D698', type: 'W' },
      { name: 'Hydrostatic Test 1.5×PN / 2hr', unit: 'Per section ≤500m', per: 0, std: 'KAHRAMAA / BS EN 805', type: 'HP' },
      { name: 'Chlorination ≥50ppm / ≥24hr', unit: 'Per section', per: 0, std: 'KAHRAMAA', type: 'HP' },
      { name: 'Water Quality (Coliform=0, Turbidity≤1NTU)', unit: 'Per section', per: 0, std: 'KAHRAMAA', type: 'HP' },
      { name: 'Yellow Marker Tape 300mm above pipe', unit: 'Per 100m LM', per: 100, std: 'KAHRAMAA', type: 'W' },
    ]
  },
  foul_sewer: {
    label: 'Foul Sewer — صرف صحي',
    tests: [
      { name: 'Material Approval (MAR)', unit: 'Per delivery', per: 0, std: 'BS EN 476', type: 'HP' },
      { name: 'Pipe Gradient (Laser ±3mm)', unit: 'Every 25m', per: 25, std: 'Laser Level', type: 'HP' },
      { name: 'Bedding Compaction ≥90% MDD', unit: 'm (LM)', per: 50, std: 'ASTM D1556', type: 'W' },
      { name: 'Joint Visual Inspection', unit: 'Per joint', per: 0, std: 'Visual', type: 'W' },
      { name: 'Manhole Water Tightness', unit: 'Per manhole', per: 0, std: 'QCS S8', type: 'HP' },
      { name: 'Air Test 100mm WG / 5min / ≤25mm drop', unit: 'Per section ≤500m', per: 0, std: 'BS EN 1610', type: 'HP' },
      { name: 'CCTV Survey 100% Grade ≤2', unit: '100% pipes', per: 0, std: 'WRc / Ashghal', type: 'HP' },
      { name: 'Backfill Compaction ≥95% MDD', unit: 'm²', per: 500, std: 'ASTM D698', type: 'W' },
      { name: 'Green Marker Tape 300mm above pipe', unit: 'Per 100m LM', per: 100, std: 'Ashghal', type: 'W' },
    ]
  },
  storm_water: {
    label: 'Storm Water — صرف سطحي',
    tests: [
      { name: 'Material Approval (MAR)', unit: 'Per delivery', per: 0, std: 'BS 5911', type: 'HP' },
      { name: 'Pipe Gradient ±5mm', unit: 'Every 25m', per: 25, std: 'Laser Level', type: 'HP' },
      { name: 'Bedding Compaction ≥90% MDD', unit: 'm (LM)', per: 50, std: 'ASTM D1556', type: 'W' },
      { name: 'Gully Level ±5mm from road', unit: 'Each gully', per: 0, std: 'Survey', type: 'W' },
      { name: 'CCTV Survey 100% Grade ≤2', unit: '100% pipes', per: 0, std: 'WRc', type: 'HP' },
      { name: 'Hydraulic Flow Test', unit: 'Per section', per: 0, std: 'Ashghal', type: 'W' },
      { name: 'Silt Trap Installation Check', unit: 'Per outfall', per: 0, std: 'QCS S8', type: 'HP' },
      { name: 'Backfill Compaction ≥95% MDD', unit: 'm²', per: 500, std: 'ASTM D698', type: 'W' },
    ]
  },
  treated_water: {
    label: 'Treated Water — مياه معالجة',
    tests: [
      { name: 'Purple Pipe Color Verification', unit: 'Per delivery — 100%', per: 0, std: 'MME Std', type: 'HP' },
      { name: 'Cross Connection Study Approval', unit: 'Before any works', per: 0, std: 'MME', type: 'HP' },
      { name: 'Separation from Potable ≥1.0m', unit: 'Every 25m', per: 25, std: 'KAHRAMAA', type: 'HP' },
      { name: 'Bedding Compaction ≥90% MDD', unit: 'm (LM)', per: 50, std: 'ASTM D1556', type: 'W' },
      { name: 'Pressure Test 1.5×PN / 2hr', unit: 'Per section', per: 0, std: 'QCS S8', type: 'HP' },
      { name: 'Cross Connection Test', unit: 'Per section', per: 0, std: 'MME', type: 'HP' },
      { name: 'Purple Marker Tape 300mm above pipe', unit: 'Per 100m LM', per: 100, std: 'MME', type: 'W' },
      { name: 'Warning Signs at all use points', unit: 'Each point', per: 0, std: 'MME', type: 'HP' },
    ]
  },
  bored_piles: {
    label: 'Bored Piles — خوازيق',
    tests: [
      { name: 'Pile Position Survey ≤75mm', unit: 'Each pile', per: 0, std: 'QCS S5', type: 'HP' },
      { name: 'Pile Depth Approval', unit: 'Each pile', per: 0, std: 'QCS S5', type: 'HP' },
      { name: 'Base Cleanliness Check', unit: 'Each pile', per: 0, std: 'QCS S5', type: 'HP' },
      { name: 'Rebar Cage + Cover 75mm', unit: 'Each pile', per: 0, std: 'QCS S5', type: 'HP' },
      { name: 'Slump 175-225mm', unit: 'Each load', per: 0, std: 'BS EN 12350', type: 'W' },
      { name: 'Cube Test 28-day ≥35 N/mm²', unit: 'm³', per: 50, std: 'BS EN 12390', type: 'HP' },
      { name: 'Verticality ≤1:75', unit: 'Each pile', per: 0, std: 'Survey', type: 'W' },
      { name: 'PIT Test (Pile Integrity) 100%', unit: 'Each pile', per: 0, std: 'QCS S5', type: 'HP' },
      { name: 'Static Load Test', unit: '1-2% of piles', per: 0, std: 'QCS S5', type: 'HP' },
    ]
  },
  geotechnical: {
    label: 'Geotechnical Investigation — جسات',
    tests: [
      { name: 'SPT Test every 1.5m', unit: 'Each BH', per: 0, std: 'BS EN ISO 22476-3', type: 'HP' },
      { name: 'Sulphate SO₃ Classification', unit: 'Per stratum', per: 0, std: 'BS 1377', type: 'HP' },
      { name: 'Chloride Content', unit: 'Per stratum', per: 0, std: 'BS 1377', type: 'HP' },
      { name: 'Atterberg Limits (clay layers)', unit: 'Per stratum', per: 0, std: 'ASTM D4318', type: 'W' },
      { name: 'Grading Analysis', unit: 'Per stratum', per: 0, std: 'ASTM C136', type: 'W' },
      { name: 'Groundwater Level', unit: 'Each BH', per: 0, std: 'GI Scope', type: 'W' },
      { name: 'Groundwater Quality (SO₄+Cl+pH)', unit: 'Each BH', per: 0, std: 'BS 1377', type: 'HP' },
      { name: 'CBR Soaked (for roads)', unit: 'Per stratum', per: 0, std: 'ASTM D1883', type: 'W' },
      { name: 'GI Report with Recommendations', unit: 'Once', per: 0, std: 'BS 5930', type: 'HP' },
    ]
  }
};

function calcFreq() {
  var mat = document.getElementById('ts-mat');
  var qty = parseFloat(document.getElementById('ts-qty').value);
  var unit = document.getElementById('ts-unit').value;
  var box = document.getElementById('ts-result-box');
  if (!box) return;
  if (!mat || !mat.value || !qty || qty <= 0) { box.style.display = 'none'; return; }

  var data = FREQ_DB[mat.value];
  if (!data) { box.style.display = 'none'; return; }

  var rows = '';
  var total = 0;
  data.tests.forEach(function(t) {
    var count = '—';
    var numericCount = 0;
    if (t.per > 0) {
      numericCount = Math.ceil(qty / t.per);
      count = numericCount + 'x';
      total += numericCount;
    } else {
      count = t.unit;
    }
    var typeColor = t.type === 'HP' ? '#e74c3c' : '#f39c12';
    rows += '<tr>' +
      '<td style="text-align:right;">' + t.name + '</td>' +
      '<td>' + t.unit + '</td>' +
      '<td style="text-align:center;font-weight:700;color:var(--gold);">' + count + '</td>' +
      '<td>' + t.std + '</td>' +
      '<td style="color:' + typeColor + ';font-weight:700;text-align:center;">' + t.type + '</td></tr>';
  });

  box.style.display = 'block';
  box.innerHTML =
    '<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:12px;margin-bottom:10px;">' +
    '<div style="color:var(--gold);font-weight:700;font-size:13px;">📋 ' + data.label + '</div>' +
    '<div style="color:var(--text3);font-size:11px;margin-top:4px;">Quantity: ' + qty + ' ' + unit +
    (total > 0 ? ' | Total numeric tests required: <strong style="color:var(--gold2);">' + total + '</strong>' : '') + '</div>' +
    '</div>' +
    '<div style="overflow-x:auto;">' +
    '<table class="dm-table" style="font-size:11px;">' +
    '<tr style="background:rgba(122,21,21,0.85);">' +
    '<th style="text-align:right;">Test / الاختبار</th>' +
    '<th>Unit / الوحدة</th>' +
    '<th>Required / المطلوب</th>' +
    '<th>Standard / المعيار</th>' +
    '<th>HP/W</th></tr>' +
    rows + '</table></div>' +
    '<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px;margin-top:8px;font-size:11px;">' +
    '<strong style="color:#e74c3c;">HP</strong> = Hold Point (stop work, need consultant approval) &nbsp;|&nbsp; ' +
    '<strong style="color:#f39c12;">W</strong> = Witness Point (QC witnesses, Consultant may witness)' +
    '</div>';
}

// ===== 3. FULL ENGLISH CONTENT FOR ALL DETAIL SECTIONS =====
// This patches detailData with complete English content

var EN_PATCHES = {

  subgrade: function(data) {
    // Already has good English content, ensure it's complete
  },

  roads: function() {
    // Roads hub already has EN content
  },

  calculator: function() {
    // Replace calculator detail with improved dual-mode version
    if (window.detailData && window.detailData.calculator) {
      window.detailData.calculator.content = window.detailData.calculator.content;
    }
  }
};

// ===== 4. COMPLETE ENGLISH ITP CONTENT =====

function _addFullEnglishITPs() {
  if (!window.detailData) return;

  // ITP Subgrade — full English
  if (window.detailData.itp_subgrade) {
    var existing = window.detailData.itp_subgrade.content;
    if (existing.indexOf('Switch to Arabic') !== -1 || existing.indexOf('lang-content-en') === -1) {
      window.detailData.itp_subgrade.content = existing.replace(
        /<div class="lang-content-en"[^>]*>[\s\S]*?<\/div>\s*$/,
        '<div class="lang-content-en" style="display:none;">' + _buildITPTable('subgrade') + '</div>'
      );
    }
  }

  // Add English content to all ITP sections that say "Switch to Arabic"
  var keys = Object.keys(window.detailData || {});
  keys.forEach(function(key) {
    var d = window.detailData[key];
    if (!d || !d.content) return;
    if (d.content.indexOf('Switch to Arabic') !== -1) {
      // Replace the placeholder with actual content
      d.content = d.content.replace(
        /<div class="lang-content-en"[^>]*>[\s\S]*?Switch to Arabic[\s\S]*?<\/div>/,
        '<div class="lang-content-en" style="display:none;">' + _buildEnContent(key, d.title) + '</div>'
      );
    }
  });
}

function _buildEnContent(key, title) {
  var freq = FREQ_DB[key] || FREQ_DB[key.replace(/_/g, '_')];
  var baseHtml = '<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:8px;padding:10px;margin-bottom:12px;font-size:12px;">📌 QCS 2024 Reference | ' + title + '</div>';

  if (freq) {
    baseHtml += '<h3>' + freq.label + ' — Testing Requirements</h3>';
    baseHtml += '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">';
    baseHtml += '<tr style="background:rgba(122,21,21,0.85);">' +
      '<th>Test</th><th>Frequency</th><th>Standard</th><th>Type</th></tr>';
    freq.tests.forEach(function(t) {
      var typeColor = t.type === 'HP' ? '#e74c3c' : '#f39c12';
      baseHtml += '<tr><td>' + t.name + '</td><td>' + (t.per > 0 ? 'Per ' + t.per + ' ' + t.unit : t.unit) + '</td>' +
        '<td>' + t.std + '</td>' +
        '<td style="color:' + typeColor + ';font-weight:700;text-align:center;">' + t.type + '</td></tr>';
    });
    baseHtml += '</table></div>';
    baseHtml += '<div style="font-size:11px;color:var(--text3);margin-top:8px;padding:8px;background:rgba(255,255,255,0.03);border-radius:6px;">' +
      '<strong style="color:#e74c3c;">HP</strong> = Hold Point — stop and get Consultant/Client approval before proceeding<br>' +
      '<strong style="color:#f39c12;">W</strong> = Witness Point — QC Engineer witnesses; Consultant may attend' +
      '</div>';
  } else {
    baseHtml += '<p style="color:var(--text2);font-size:13px;">Full specifications per QCS 2024. All numerical values, standards and frequencies as per Qatar Construction Specifications.</p>';
    baseHtml += '<p style="color:var(--text3);font-size:12px;">Use the calculator section for testing frequency calculations. All QCS 2024 requirements apply for this section.</p>';
  }

  return baseHtml;
}

function _buildITPTable(section) {
  var freq = FREQ_DB[section];
  if (!freq) return '<p>See QCS 2024 for requirements.</p>';
  var html = '<h3>' + freq.label + ' — ITP</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">';
  html += '<tr style="background:rgba(122,21,21,0.85);"><th>Activity</th><th>Reference</th><th>Acceptance Criterion</th><th>Frequency</th><th>QC</th><th>SC</th></tr>';
  freq.tests.forEach(function(t) {
    html += '<tr><td>' + t.name + '</td><td>' + t.std + '</td>' +
      '<td>Per QCS 2024</td>' +
      '<td>' + (t.per > 0 ? 'Per ' + t.per + ' ' + t.unit : t.unit) + '</td>' +
      '<td style="color:' + (t.type==='HP'?'#e74c3c':'#f39c12') + ';font-weight:700;text-align:center;">' + t.type + '</td>' +
      '<td style="color:#f39c12;font-weight:700;text-align:center;">W</td></tr>';
  });
  html += '</table></div>';
  return html;
}

// ===== 5. CALCULATOR INITIALIZATION FOR DETAIL MODAL =====

function _initCalcInModal() {
  // When calculator detail opens, initialize the dual-mode UI
  var cat = document.getElementById('cat-roads');
  if (cat && cat.innerHTML.trim() === '') {
    _buildCalcCategory('roads', cat);
  }
  var cu = document.getElementById('cat-utilities');
  if (cu && cu.innerHTML.trim() === '') {
    _buildCalcCategory('utilities', cu);
  }
  var cs = document.getElementById('cat-structural');
  if (cs && cs.innerHTML.trim() === '') {
    _buildCalcCategory('structural', cs);
  }
  var cg = document.getElementById('cat-geotech_calc');
  if (cg && cg.innerHTML.trim() === '') {
    _buildCalcCategory('geotech', cg);
  }
}

function _buildCalcCategory(cat, container) {
  var map = {
    roads: ['subgrade','subbase','base','prime_coat','tack_coat','binder_course','wearing_course'],
    utilities: ['water_supply','foul_sewer','storm_water','treated_water'],
    structural: ['concrete','rebar','bored_piles'],
    geotech: ['geotechnical']
  };
  var keys = map[cat] || [];
  var html = '';
  keys.forEach(function(k) {
    var d = FREQ_DB[k];
    if (!d) return;
    html += '<div style="margin-bottom:14px;">' +
      '<div style="color:var(--gold2);font-size:13px;font-weight:700;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border);">' + d.label + '</div>' +
      '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">' +
      '<tr style="background:rgba(122,21,21,0.85);">' +
      '<th style="text-align:right;">Test</th><th>Unit</th><th>Standard</th><th>Type</th></tr>';
    d.tests.forEach(function(t) {
      html += '<tr><td style="text-align:right;">' + t.name + '</td>' +
        '<td>' + (t.per > 0 ? 'Per ' + t.per + ' ' + t.unit : t.unit) + '</td>' +
        '<td>' + t.std + '</td>' +
        '<td style="color:' + (t.type==='HP'?'#e74c3c':'#f39c12') + ';font-weight:700;text-align:center;">' + t.type + '</td></tr>';
    });
    html += '</table></div></div>';
  });
  if (container) container.innerHTML = html;
}

// ===== 6. PATCH: INITIALIZE ON CALCULATOR DETAIL OPEN =====

var _origOpenDetailOuter = window.openDetail;
window.openDetail = function(key) {
  _origOpenDetailOuter(key);
  if (key === 'calculator') {
    setTimeout(_initCalcInModal, 120);
    setTimeout(function() { switchCalcMode('freq', null); }, 150);
  }
};

// ===== 7. TRAFFIC MANAGEMENT PLAN — Add to detailData =====

(function() {
  if (!window.detailData) return;
  if (window.detailData.traffic_management_plan) return; // already exists

  window.detailData.traffic_management_plan = {
    title: '🚦 Traffic Management Plan — TMP',
    content: '<div class="lang-content-ar"><!-- existing Arabic content --></div>' +
    '<div class="lang-content-en" style="display:none;">' +
    '<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">📌 Ashghal / MMUP Standards | Qatar Highway Design Manual</div>' +
    '<h3>What is a Traffic Management Plan (TMP)?</h3>' +
    '<p style="font-size:12px;color:var(--text2);">A mandatory plan submitted and approved before any road works. Defines how to maintain road user safety and ensure traffic continuity during construction.</p>' +
    '<h3>Ashghal TMP Requirements</h3>' +
    '<table class="dm-table"><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr>' +
    '<tr><td>Plan Submission</td><td>At least 14 days before works start</td><td>Ashghal TMP Guidelines</td></tr>' +
    '<tr><td>Plan Approval</td><td>Written approval from Ashghal Traffic Dept</td><td>Ashghal</td></tr>' +
    '<tr><td>Prepared By</td><td>Certified Traffic Engineer + TMP Officer</td><td>Ashghal</td></tr>' +
    '<tr><td>Updates Required</td><td>When scope or schedule changes</td><td>Ashghal</td></tr>' +
    '<tr><td>Review Frequency</td><td>Weekly + after any incident</td><td>Ashghal</td></tr></table>' +
    '<h3>Mandatory TMP Elements</h3>' +
    '<table class="dm-table"><tr><th>Element</th><th>Requirement</th><th>Standard</th></tr>' +
    '<tr><td>Traffic Signs</td><td>Warning + Guidance + Temporary Speed</td><td>MMUP Traffic Signs Manual</td></tr>' +
    '<tr><td>Lane Closure Plan</td><td>Details + timing of lane closures</td><td>Ashghal TMP</td></tr>' +
    '<tr><td>Detour Routes</td><td>Mapped alternative routes</td><td>Ashghal TMP</td></tr>' +
    '<tr><td>Work Zone Lighting</td><td>LED portable ≥ 50 lux at night</td><td>MMUP</td></tr>' +
    '<tr><td>Temporary Barriers</td><td>Water-filled or Jersey Concrete</td><td>BS EN 1317</td></tr>' +
    '<tr><td>Traffic Cones</td><td>Every 5m in transition zone</td><td>Ashghal</td></tr>' +
    '<tr><td>Arrow Boards</td><td>Solar-powered at each major diversion</td><td>Ashghal TMP</td></tr>' +
    '<tr><td>Traffic Controllers</td><td>At active intersections</td><td>Ashghal TMP</td></tr></table>' +
    '<h3>Qatar-Specific Requirements</h3>' +
    '<table class="dm-table"><tr><th>Condition</th><th>Requirements</th></tr>' +
    '<tr><td>Night Work</td><td>Special permit from Ashghal + Night TMP + Extra lighting</td></tr>' +
    '<tr><td>Highway Closure</td><td>Special TMP + MOI coordination in advance</td></tr>' +
    '<tr><td>Ramadan Period</td><td>Minimize closures + no works 2hr after Iftar</td></tr>' +
    '<tr><td>National Events</td><td>Stop road works + advance Ashghal notice required</td></tr>' +
    '<tr><td>School Zones</td><td>No works 7-9am & 2-4pm on school days</td></tr>' +
    '<tr><td>Utility Crossings</td><td>TMP includes all utilities with NGC/KAHRAMAA</td></tr></table>' +
    '<h3>TMP ITP — Inspection Points</h3>' +
    '<table class="dm-table"><tr><th>Activity</th><th>Criterion</th><th>Frequency</th><th>HP/W</th></tr>' +
    '<tr><td>TMP Submission</td><td>Submitted ≥14 days before start</td><td>Before each phase</td><td style="color:#e74c3c;font-weight:700;">HP</td></tr>' +
    '<tr><td>TMP Approval</td><td>Written approval from Ashghal</td><td>Per submission</td><td style="color:#e74c3c;font-weight:700;">HP</td></tr>' +
    '<tr><td>Signs Installation</td><td>Visual — correct and complete</td><td>Daily</td><td style="color:#f39c12;font-weight:700;">W</td></tr>' +
    '<tr><td>Barriers Check</td><td>Stable, not displaced</td><td>Daily</td><td style="color:#f39c12;font-weight:700;">W</td></tr>' +
    '<tr><td>Night Inspection</td><td>Lighting + visibility check</td><td>Every working night</td><td style="color:#f39c12;font-weight:700;">W</td></tr>' +
    '<tr><td>Incident Recording</td><td>Log + Ashghal report</td><td>Immediately</td><td style="color:#e74c3c;font-weight:700;">HP</td></tr></table>' +
    '</div>'
  };
})();

// ===== 8. FINAL INITIALIZATION =====

(function _patchInit() {
  // Run English content patch after page loads
  setTimeout(function() {
    _addFullEnglishITPs();
    // Apply current language
    var lang = localStorage.getItem('qsp_lang') || 'ar';
    if (typeof setLang === 'function') setLang(lang);
  }, 500);
})();

// Override language toggle buttons to also refresh video state
var _origSetLang = window.setLang;
if (typeof _origSetLang === 'function') {
  window.setLang = function(lang) {
    _origSetLang(lang);
    setTimeout(_restoreVideos, 50);
  };
}

console.log('✅ QatarSpec Pro PATCH loaded — Video fix + Dual Calculator + Full EN content');

// ===== 9. FIX switchMainCat if not defined =====
if (typeof window.switchMainCat !== 'function') {
  window.switchMainCat = function(cat, btn) {
    ['roads','utilities','structural','geotech_calc'].forEach(function(c) {
      var el = document.getElementById('cat-' + c);
      var tab = document.getElementById('main-tab-' + c);
      if (el) el.style.display = (c === cat) ? 'block' : 'none';
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
    setTimeout(_initCalcInModal, 100);
  };
}

// ===== 10. FIX handleDocUpload if needed =====
if (typeof window.handleDocUpload !== 'function') {
  window.handleDocUpload = function(input, type) {
    var files = Array.from(input.files);
    var listEl = document.getElementById('doc-files-list') || document.getElementById('doc-files-list-en');
    if (!listEl) return;
    var icons = { specs:'📋', drawings:'📐', boq:'📊', gi:'🔬' };
    files.forEach(function(f) {
      var div = document.createElement('div');
      div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(255,255,255,0.05);border-radius:6px;margin:4px 0;font-size:12px;';
      div.innerHTML = '<span>' + (icons[type]||'📄') + '</span><span style="flex:1;">' + f.name + '</span><span style="color:var(--text3);">' + (f.size/1024).toFixed(0) + ' KB</span>';
      listEl.appendChild(div);
    });
    var panel = document.getElementById('doc-analysis-panel');
    if (panel) panel.style.display = 'block';
  };
}
