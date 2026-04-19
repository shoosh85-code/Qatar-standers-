// QatarSpec Pro — Calculation Web Worker
// Handles CPU-heavy Pass/Fail calculations off the main thread

self.onmessage = function(e) {
  const { id, fn, args } = e.data;
  let result;
  try {
    result = { id, ok: true, data: dispatch(fn, args) };
  } catch(err) {
    result = { id, ok: false, error: err.message };
  }
  self.postMessage(result);
};

function dispatch(fn, args) {
  switch(fn) {
    case 'calcESAL':        return calcESAL(args);
    case 'calcWCRatio':     return calcWCRatio(args);
    case 'calcMDD':         return calcMDD(args);
    case 'calcMarshall':    return calcMarshall(args);
    case 'calcCBR':         return calcCBR(args);
    case 'calcCover':       return calcCover(args);
    case 'calcLapLength':   return calcLapLength(args);
    case 'calcRebar':       return calcRebar(args);
    case 'calcConcrete':    return calcConcreteWorker(args);
    case 'calcSPT':         return calcSPT(args);
    case 'calcRoadLayers':  return calcRoadLayers(args);
    default: throw new Error('Unknown function: ' + fn);
  }
}

// ─── ESAL ───
function calcESAL({ aadt, truckPct, growth, life }) {
  aadt = parseFloat(aadt); truckPct = parseFloat(truckPct);
  growth = parseFloat(growth); life = parseFloat(life);
  if (isNaN(aadt)||isNaN(truckPct)||isNaN(growth)||isNaN(life))
    throw new Error('Invalid inputs');
  const trucks = aadt * (truckPct / 100);
  const growthFactor = growth > 0
    ? ((Math.pow(1 + growth/100, life) - 1) / (growth/100))
    : life;
  const annualESAL = trucks * 365 * 2.5; // avg truck EF = 2.5
  const totalESAL = annualESAL * growthFactor / 1e6;
  let designation;
  if (totalESAL < 0.3)       designation = 'T1';
  else if (totalESAL < 1.0)  designation = 'T2';
  else if (totalESAL < 3.0)  designation = 'T3';
  else if (totalESAL < 10.0) designation = 'T4';
  else if (totalESAL < 30.0) designation = 'T5';
  else                        designation = 'T6';
  return { totalESAL: totalESAL.toFixed(2), designation, growthFactor: growthFactor.toFixed(1) };
}

// ─── W/C Ratio ───
function calcWCRatio({ water, cement, env }) {
  water = parseFloat(water); cement = parseFloat(cement);
  const limits = { mild:0.65, moderate:0.55, severe:0.45, marine:0.40, submerged:0.38 };
  const req = limits[env] || 0.45;
  const wc = +(water / cement).toFixed(3);
  return { wc, req, pass: wc <= req };
}

// ─── MDD Compaction ───
function calcMDD({ actual, mdd, zone }) {
  actual = parseFloat(actual); mdd = parseFloat(mdd);
  const req = zone === 'final' ? 98 : (zone === 'road' ? 98 : 95);
  const pct = +((actual / mdd) * 100).toFixed(1);
  return { pct, req, pass: pct >= req };
}

// ─── Marshall ───
function calcMarshall({ stability, flow, voids, vma }) {
  stability = parseFloat(stability); flow = parseFloat(flow);
  voids = parseFloat(voids); vma = parseFloat(vma);
  const checks = [
    { name: 'Stability ≥ 8.0 kN', pass: stability >= 8.0, val: stability, req: '≥8.0 kN' },
    { name: 'Flow 2–4 mm',        pass: flow >= 2 && flow <= 4, val: flow, req: '2–4 mm' },
    { name: 'Air Voids 3–5%',     pass: voids >= 3 && voids <= 5, val: voids, req: '3–5%' },
    { name: 'VMA ≥ 14%',          pass: vma >= 14, val: vma, req: '≥14%' }
  ];
  const allPass = checks.every(c => c.pass);
  return { checks, allPass };
}

// ─── CBR ───
function calcCBR({ value, use }) {
  value = parseFloat(value);
  const reqs = { subgrade_natural:8, subgrade_fill:15, subbase:30, base:80 };
  const req = reqs[use] || 8;
  return { value, req, pass: value >= req };
}

// ─── Concrete Cover ───
function calcCover({ elem, actual }) {
  actual = parseFloat(actual);
  const reqs = { foundation:75, ext_col:40, int_col:25, ext_slab:40, int_slab:25, wall:40, pile:75, pile_cap:75 };
  const req = reqs[elem] || 25;
  return { actual, req, pass: actual >= req };
}

// ─── Lap Length ───
function calcLapLength({ dia, grade, condition }) {
  dia = parseFloat(dia);
  // QCS S5: lap = 40× dia standard, 50× dia in tension zones
  const factor = condition === 'tension' ? 50 : 40;
  const lap = dia * factor;
  return { lap, factor, dia };
}

// ─── Rebar ───
function calcRebar({ dia, spacing, width }) {
  dia = parseFloat(dia); spacing = parseFloat(spacing); width = parseFloat(width);
  const area_per_bar = Math.PI * (dia/2)**2;
  const bars = Math.floor(width / spacing) + 1;
  const total_area = bars * area_per_bar;
  return { bars, area_per_bar: area_per_bar.toFixed(1), total_area: total_area.toFixed(0) };
}

// ─── Concrete volume/cement ───
function calcConcreteWorker({ volume, grade }) {
  volume = parseFloat(volume);
  // Approximate cement content per grade
  const cement_kg_m3 = { C15:250, C20:280, C25:310, C30:340, C35:380, C40:420, C50:480 };
  const cem = cement_kg_m3[grade] || 350;
  return {
    cement_kg: +(volume * cem).toFixed(0),
    water_kg:  +(volume * cem * 0.45).toFixed(0),
    agg_kg:    +(volume * 1800).toFixed(0),
    sand_kg:   +(volume * 700).toFixed(0)
  };
}

// ─── SPT N-value ───
function calcSPT({ n_raw, rod_len, hammer }) {
  n_raw = parseFloat(n_raw); rod_len = parseFloat(rod_len);
  const Er = hammer === 'donut' ? 0.45 : 0.60; // energy ratio
  const Cr = rod_len < 3 ? 0.75 : rod_len < 4 ? 0.8 : rod_len < 6 ? 0.85 : rod_len < 10 ? 0.95 : 1.0;
  const n60 = +(n_raw * Er / 0.60 * Cr).toFixed(0);
  let soil_class;
  if (n60 < 2)       soil_class = 'Very Loose';
  else if (n60 < 4)  soil_class = 'Loose';
  else if (n60 < 10) soil_class = 'Medium Dense';
  else if (n60 < 30) soil_class = 'Dense';
  else               soil_class = 'Very Dense';
  return { n60, soil_class };
}

// ─── Road Layer Volumes ───
function calcRoadLayers({ length, width, layers }) {
  // layers: [{name, thickness_mm, density_t_m3}]
  length = parseFloat(length); width = parseFloat(width);
  return layers.map(l => {
    const t = parseFloat(l.thickness_mm) / 1000;
    const vol = +(length * width * t).toFixed(1);
    const tons = l.density_t_m3 ? +(vol * parseFloat(l.density_t_m3)).toFixed(0) : null;
    return { name: l.name, vol_m3: vol, tons };
  });
}
