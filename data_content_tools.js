// QatarSpec Pro — Content: tools
(function(){
  var c=window.QS_CONTENT=window.QS_CONTENT||{};
  c["calculator"] = { title: '🧮 حاسبة المواصفات — Pass / Fail', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 QCS 2024 | حاسبة Pass/Fail — 51 اختبار + Batch Mode + NCR تلقائي
</div>

<!-- MAIN TABS -->
<div style="display:flex;gap:0;margin-bottom:16px;border-radius:10px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);">
<button onclick="switchCalcTab('passfail',this)" id="ctab-passfail" style="flex:1;padding:9px;border:none;background:rgba(201,168,76,0.25);color:var(--gold);font-weight:700;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">✅ Pass/Fail</button>
<button onclick="switchCalcTab('batch',this)" id="ctab-batch" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">📊 Batch</button>
<button onclick="switchCalcTab('history',this)" id="ctab-history" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">📋 History</button>
<button onclick="switchCalcTab('freq',this)" id="ctab-freq" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🗓️ Frequency</button>
<button onclick="switchCalcTab('materials',this)" id="ctab-materials" style="flex:1;padding:9px;border:none;background:var(--dark4);color:var(--text2);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🧮 كميات</button>
</div>

<!-- PASS/FAIL TAB -->
<div id="calc-tab-passfail">
<!-- Category Filter -->
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
<button onclick="filterCalcCat('all')" class="calc-cat-btn active" data-cat="all" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(201,168,76,0.3);background:rgba(201,168,76,0.2);color:var(--gold);font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">كل الاختبارات</button>
<button onclick="filterCalcCat('roads')" class="calc-cat-btn" data-cat="roads" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(122,21,21,0.4);background:rgba(122,21,21,0.1);color:#e74c3c;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🛣️ طرق</button>
<button onclick="filterCalcCat('utilities')" class="calc-cat-btn" data-cat="utilities" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(52,152,219,0.4);background:rgba(52,152,219,0.1);color:#3498db;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🔧 مرافق</button>
<button onclick="filterCalcCat('concrete')" class="calc-cat-btn" data-cat="concrete" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(46,204,113,0.4);background:rgba(46,204,113,0.1);color:#2ecc71;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🏗️ خرسانة</button>
<button onclick="filterCalcCat('geotech')" class="calc-cat-btn" data-cat="geotech" style="padding:6px 12px;border-radius:20px;border:1px solid rgba(155,89,182,0.4);background:rgba(155,89,182,0.1);color:#9b59b6;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🔬 تربة</button>
</div>

<!-- Tests Grid -->
<div id="calc-tests-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">

<!-- ROADS -->
<div class="calc-card" data-cat="roads" data-test="compaction">
  <div class="calc-card-title">🟠 نسبة الدمك (Compaction)</div>
  <div class="calc-card-inputs">
    <input type="number" id="comp-field" placeholder="كثافة الحقل (kg/m³)" class="calc-input">
    <input type="number" id="comp-mdd" placeholder="MDD (kg/m³)" class="calc-input">
    <select id="comp-layer" class="calc-input" style="font-size:11px;">
      <option value="100">Subgrade (≥95%)</option>
      <option value="100">Subbase/Base (≥100% BS Heavy)</option>
      <option value="97">Asphalt Core (≥97% TMD)</option>
      <option value="95">Trench Backfill (≥95%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('compaction')" class="calc-run-btn">احسب</button>
  <div id="res-compaction" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="cbr">
  <div class="calc-card-title">🟠 CBR (Soaked 4 days)</div>
  <div class="calc-card-inputs">
    <input type="number" id="cbr-val" placeholder="نتيجة CBR (%)" class="calc-input">
    <select id="cbr-type" class="calc-input" style="font-size:11px;">
      <option value="8">Subgrade (≥8%)</option>
      <option value="30">Subbase (≥30%)</option>
      <option value="80">Roadbase (≥80%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('cbr')" class="calc-run-btn">احسب</button>
  <div id="res-cbr" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="marshall">
  <div class="calc-card-title">🟠 Marshall Stability</div>
  <div class="calc-card-inputs">
    <input type="number" id="mar-stab" placeholder="Stability (kN)" class="calc-input">
    <input type="number" id="mar-flow" placeholder="Flow (mm)" class="calc-input">
    <input type="number" id="mar-va" placeholder="Air Voids (%)" class="calc-input">
  </div>
  <button onclick="runCalcTest('marshall')" class="calc-run-btn">احسب</button>
  <div id="res-marshall" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="core_density">
  <div class="calc-card-title">🟠 Core Density</div>
  <div class="calc-card-inputs">
    <input type="number" id="core-bulk" placeholder="Bulk Density (kg/m³)" class="calc-input">
    <input type="number" id="core-tmd" placeholder="TMD (kg/m³)" class="calc-input">
    <select id="core-layer" class="calc-input" style="font-size:11px;">
      <option value="97">Wearing/Binder (≥97%)</option>
      <option value="96">Base Course (≥96%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('core_density')" class="calc-run-btn">احسب</button>
  <div id="res-core_density" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="iri">
  <div class="calc-card-title">🟠 IRI Smoothness</div>
  <div class="calc-card-inputs">
    <input type="number" id="iri-val" placeholder="IRI (m/km)" step="0.1" class="calc-input">
    <select id="iri-type" class="calc-input" style="font-size:11px;">
      <option value="2.5">Conventional (≤2.5 m/km)</option>
      <option value="0.9">PMB (≤0.9 m/km)</option>
    </select>
  </div>
  <button onclick="runCalcTest('iri')" class="calc-run-btn">احسب</button>
  <div id="res-iri" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="asphalt_temp">
  <div class="calc-card-title">🟠 حرارة الإسفلت</div>
  <div class="calc-card-inputs">
    <input type="number" id="temp-val" placeholder="درجة الحرارة (°C)" class="calc-input">
    <select id="temp-type" class="calc-input" style="font-size:11px;">
      <option value="140">Binder Course (≥140°C)</option>
      <option value="145">Wearing Course (≥145°C)</option>
      <option value="155">PMB Wearing (≥155°C)</option>
      <option value="125">Min Lay Temp (≥125°C)</option>
    </select>
  </div>
  <button onclick="runCalcTest('asphalt_temp')" class="calc-run-btn">احسب</button>
  <div id="res-asphalt_temp" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="crossfall">
  <div class="calc-card-title">🟠 Crossfall</div>
  <div class="calc-card-inputs">
    <input type="number" id="cf-val" placeholder="نسبة الميل (%)" step="0.1" class="calc-input">
    <select id="cf-type" class="calc-input" style="font-size:11px;">
      <option value="2.5">Carriageway (2.5% ±0.5%)</option>
      <option value="3.0">Footpath (3.0% max)</option>
    </select>
  </div>
  <button onclick="runCalcTest('crossfall')" class="calc-run-btn">احسب</button>
  <div id="res-crossfall" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="roads" data-test="straightedge">
  <div class="calc-card-title">🟠 Straightedge (3m)</div>
  <div class="calc-card-inputs">
    <input type="number" id="str-val" placeholder="فجوة تحت المسطرة (mm)" class="calc-input">
    <select id="str-layer" class="calc-input" style="font-size:11px;">
      <option value="6">Wearing Course (≤6mm)</option>
      <option value="10">Binder/Base (≤10mm)</option>
      <option value="15">Subbase (≤15mm)</option>
    </select>
  </div>
  <button onclick="runCalcTest('straightedge')" class="calc-run-btn">احسب</button>
  <div id="res-straightedge" class="calc-result"></div>
</div>

<!-- UTILITIES -->
<div class="calc-card" data-cat="utilities" data-test="pressure_test">
  <div class="calc-card-title">🔵 اختبار الضغط</div>
  <div class="calc-card-inputs">
    <input type="number" id="pres-pn" placeholder="PN (bar)" class="calc-input">
    <input type="number" id="pres-test" placeholder="ضغط الاختبار (bar)" class="calc-input">
    <input type="number" id="pres-drop" placeholder="انخفاض الضغط (bar)" step="0.001" class="calc-input">
  </div>
  <button onclick="runCalcTest('pressure_test')" class="calc-run-btn">احسب</button>
  <div id="res-pressure_test" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="air_test">
  <div class="calc-card-title">🔵 Air Test (Foul Sewer)</div>
  <div class="calc-card-inputs">
    <input type="number" id="air-init" placeholder="ضغط ابتدائي (mm Hg)" class="calc-input">
    <input type="number" id="air-final" placeholder="ضغط نهائي (mm Hg)" class="calc-input">
    <input type="number" id="air-time" placeholder="مدة الاختبار (دقيقة)" class="calc-input">
  </div>
  <button onclick="runCalcTest('air_test')" class="calc-run-btn">احسب</button>
  <div id="res-air_test" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="chlorination">
  <div class="calc-card-title">🔵 تعقيم المياه</div>
  <div class="calc-card-inputs">
    <input type="number" id="chl-conc" placeholder="تركيز الكلور (ppm)" class="calc-input">
    <input type="number" id="chl-time" placeholder="مدة التعقيم (ساعة)" class="calc-input">
    <input type="number" id="chl-resid" placeholder="Residual Cl بعد 24h (ppm)" class="calc-input">
  </div>
  <button onclick="runCalcTest('chlorination')" class="calc-run-btn">احسب</button>
  <div id="res-chlorination" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="pipe_sep">
  <div class="calc-card-title">🔵 فصل الأنابيب</div>
  <div class="calc-card-inputs">
    <input type="number" id="sep-horiz" placeholder="فصل أفقي (m)" step="0.1" class="calc-input">
    <input type="number" id="sep-vert" placeholder="فصل رأسي (m)" step="0.1" class="calc-input">
    <div style="font-size:10px;color:var(--text3);padding:4px 0;">ماء فوق الصرف دائماً</div>
  </div>
  <button onclick="runCalcTest('pipe_sep')" class="calc-run-btn">احسب</button>
  <div id="res-pipe_sep" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="utilities" data-test="sewer_grad">
  <div class="calc-card-title">🔵 انحدار الصرف</div>
  <div class="calc-card-inputs">
    <input type="number" id="sg-dn" placeholder="قطر الأنبوب (mm)" class="calc-input">
    <input type="number" id="sg-grad" placeholder="الانحدار (1:X)" class="calc-input">
  </div>
  <button onclick="runCalcTest('sewer_grad')" class="calc-run-btn">احسب</button>
  <div id="res-sewer_grad" class="calc-result"></div>
</div>

<!-- CONCRETE -->
<div class="calc-card" data-cat="concrete" data-test="cube_strength">
  <div class="calc-card-title">🟢 مقاومة المكعب (28-day)</div>
  <div class="calc-card-inputs">
    <input type="number" id="cube-f" placeholder="مقاومة المكعب (MPa)" class="calc-input">
    <input type="number" id="cube-fcu" placeholder="fcu المطلوب (MPa)" class="calc-input">
    <input type="number" id="cube-7d" placeholder="نتيجة 7-day (MPa) — اختياري" class="calc-input">
  </div>
  <button onclick="runCalcTest('cube_strength')" class="calc-run-btn">احسب</button>
  <div id="res-cube_strength" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="slump">
  <div class="calc-card-title">🟢 Slump Test</div>
  <div class="calc-card-inputs">
    <input type="number" id="slump-val" placeholder="Slump المقاس (mm)" class="calc-input">
    <select id="slump-type" class="calc-input" style="font-size:11px;">
      <option value="25,75">RC Columns/Beams (25-75mm)</option>
      <option value="50,100">RC Slabs (50-100mm)</option>
      <option value="75,150">Pumped Concrete (75-150mm)</option>
      <option value="10,40">Foundations (10-40mm)</option>
      <option value="150,180">Special Elements (150-180mm)</option>
    </select>
  </div>
  <button onclick="runCalcTest('slump')" class="calc-run-btn">احسب</button>
  <div id="res-slump" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="cover_depth">
  <div class="calc-card-title">🟢 Cover Depth</div>
  <div class="calc-card-inputs">
    <input type="number" id="cov-measured" placeholder="Cover المقاس (mm)" class="calc-input">
    <select id="cov-element" class="calc-input" style="font-size:11px;">
      <option value="75">Foundations in soil (75mm)</option>
      <option value="50">Beams/Slabs exposed (50mm)</option>
      <option value="40">Internal elements (40mm)</option>
      <option value="60">Retaining walls (60mm)</option>
      <option value="75">Piles — top (75mm)</option>
    </select>
  </div>
  <button onclick="runCalcTest('cover_depth')" class="calc-run-btn">احسب</button>
  <div id="res-cover_depth" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="wc_ratio">
  <div class="calc-card-title">🟢 W/C Ratio</div>
  <div class="calc-card-inputs">
    <input type="number" id="wc-val" placeholder="W/C Ratio" step="0.01" class="calc-input">
    <select id="wc-expo" class="calc-input" style="font-size:11px;">
      <option value="0.45">Severe (≤0.45)</option>
      <option value="0.50">Moderate (≤0.50)</option>
      <option value="0.55">Mild (≤0.55)</option>
    </select>
  </div>
  <button onclick="runCalcTest('wc_ratio')" class="calc-run-btn">احسب</button>
  <div id="res-wc_ratio" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="concrete" data-test="rebar_cover">
  <div class="calc-card-title">🟢 Rebar Cover (QCS S5)</div>
  <div class="calc-card-inputs">
    <input type="number" id="rc-nom" placeholder="Nominal Cover (mm)" class="calc-input">
    <input type="number" id="rc-bar" placeholder="Bar Diameter (mm)" class="calc-input">
    <input type="number" id="rc-agg" placeholder="Max Agg Size (mm)" class="calc-input">
  </div>
  <button onclick="runCalcTest('rebar_cover')" class="calc-run-btn">احسب</button>
  <div id="res-rebar_cover" class="calc-result"></div>
</div>

<!-- GEOTECH -->
<div class="calc-card" data-cat="geotech" data-test="spt_bearing">
  <div class="calc-card-title">🟣 SPT + Bearing Capacity</div>
  <div class="calc-card-inputs">
    <input type="number" id="spt-n" placeholder="SPT N-value (blows/300mm)" class="calc-input">
    <input type="number" id="spt-b" placeholder="Foundation Width B (m)" class="calc-input">
  </div>
  <button onclick="runCalcTest('spt_bearing')" class="calc-run-btn">احسب</button>
  <div id="res-spt_bearing" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="geotech" data-test="atterberg">
  <div class="calc-card-title">🟣 Atterberg Limits</div>
  <div class="calc-card-inputs">
    <input type="number" id="att-ll" placeholder="Liquid Limit (%)" class="calc-input">
    <input type="number" id="att-pl" placeholder="Plastic Limit (%)" class="calc-input">
    <select id="att-use" class="calc-input" style="font-size:11px;">
      <option value="subgrade">Subgrade (PI≤12)</option>
      <option value="subbase">Subbase (PI≤6)</option>
      <option value="fill">Fill (PI≤20)</option>
    </select>
  </div>
  <button onclick="runCalcTest('atterberg')" class="calc-run-btn">احسب</button>
  <div id="res-atterberg" class="calc-result"></div>
</div>

<div class="calc-card" data-cat="geotech" data-test="sulphate">
  <div class="calc-card-title">🟣 Sulphate Content</div>
  <div class="calc-card-inputs">
    <input type="number" id="sul-so3" placeholder="SO3 content (%)" step="0.01" class="calc-input">
    <input type="number" id="sul-cl" placeholder="Cl content (%) — opt" step="0.01" class="calc-input">
    <select id="sul-use" class="calc-input" style="font-size:11px;">
      <option value="fill">Fill (SO3≤0.5%)</option>
      <option value="subgrade">Subgrade (SO3≤0.3%)</option>
      <option value="backfill">Backfill to structure (SO3≤0.3%)</option>
    </select>
  </div>
  <button onclick="runCalcTest('sulphate')" class="calc-run-btn">احسب</button>
  <div id="res-sulphate" class="calc-result"></div>
</div>

</div><!-- end grid -->
</div><!-- end passfail tab -->

<!-- BATCH TAB -->
<div id="calc-tab-batch" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.2);border-radius:10px;padding:14px;margin-bottom:14px;">
  <div style="font-weight:700;color:#3498db;margin-bottom:10px;">📊 Batch Compaction Testing</div>
  <div style="font-size:11px;color:var(--text3);margin-bottom:10px;">أدخل عدة قراءات — يحلل الكل دفعة واحدة</div>
  <textarea id="batch-input" placeholder="أدخل النتائج — كل سطر: كثافة الحقل,MDD,نوع الطبقة&#10;مثال:&#10;1850,1900,subgrade&#10;1920,1950,subbase&#10;2280,2350,asphalt" style="width:100%;height:120px;background:var(--dark4);border:1px solid var(--border2);color:var(--text);padding:10px;border-radius:8px;font-family:monospace;font-size:12px;resize:vertical;"></textarea>
  <div style="display:flex;gap:8px;margin-top:10px;">
    <button onclick="runBatchTest()" style="flex:1;background:rgba(52,152,219,0.2);border:1px solid rgba(52,152,219,0.4);border-radius:8px;padding:10px;color:#3498db;font-weight:700;cursor:pointer;font-family:Tajawal,sans-serif;">▶️ تحليل الكل</button>
    <button onclick="exportBatchNCR()" style="flex:1;background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;color:#e74c3c;font-weight:700;cursor:pointer;font-family:Tajawal,sans-serif;">📄 تصدير NCR</button>
  </div>
  <div id="batch-results" style="margin-top:12px;"></div>
</div>
</div>

<!-- HISTORY TAB -->
<div id="calc-tab-history" style="display:none;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
  <div style="font-weight:700;color:var(--gold);">📋 سجل الاختبارات</div>
  <button onclick="clearCalcHistory()" style="background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);border-radius:6px;padding:5px 12px;color:#e74c3c;font-size:11px;cursor:pointer;font-family:Tajawal,sans-serif;">🗑️ مسح الكل</button>
</div>
<div id="calc-history-list">
  <div style="text-align:center;color:var(--text3);padding:20px;font-size:13px;">لا يوجد سجل بعد<br><span style="font-size:11px;">النتائج تُحفظ تلقائياً عند كل اختبار</span></div>
</div>
</div>

<!-- FREQUENCY TAB -->
<div id="calc-tab-freq" style="display:none;">
<div id="cat-roads-calc" style="display:block;"></div>
<div id="cat-utilities" style="display:none;"></div>
<div id="cat-structural" style="display:none;"></div>
<div id="cat-geotech_calc" style="display:none;"></div>
</div>

<!-- MATERIALS/QUANTITIES TAB -->
<div id="calc-tab-materials" style="display:none;">
<div id="cat-materials_calc"></div>
</div>

<style>
.calc-card{background:var(--dark3);border:1px solid var(--border2);border-radius:10px;padding:12px;transition:.2s;}
.calc-card:hover{border-color:rgba(201,168,76,0.3);}
.calc-card-title{font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px;}
.calc-input{width:100%;padding:7px 10px;background:var(--dark4);border:1px solid var(--border2);border-radius:6px;color:var(--text);font-size:12px;margin-bottom:5px;outline:none;font-family:Tajawal,sans-serif;}
.calc-input:focus{border-color:rgba(201,168,76,0.5);}
.calc-run-btn{width:100%;padding:8px;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);border-radius:7px;color:var(--gold);font-weight:700;cursor:pointer;font-size:12px;margin-top:4px;font-family:Tajawal,sans-serif;transition:.2s;}
.calc-run-btn:hover{background:rgba(201,168,76,0.25);}
.calc-result{margin-top:8px;padding:8px;border-radius:6px;font-size:11px;min-height:32px;display:none;}
.calc-result.pass{background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.3);color:#2ecc71;display:block;}
.calc-result.fail{background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.3);color:#e74c3c;display:block;}
.calc-result.warning{background:rgba(243,156,18,0.15);border:1px solid rgba(243,156,18,0.3);color:#f39c12;display:block;}
.calc-cat-btn.active{opacity:1;font-weight:700;}
.calc-cat-btn:not(.active){opacity:0.6;}
</style>
` };
})();
