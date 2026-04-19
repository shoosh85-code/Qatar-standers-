// QatarSpec Pro — utilities data chunk
// Lazy-loaded on first section access
window.QSP = window.QSP || {};
window.QSP.chunks = window.QSP.chunks || {};
Object.assign(window.QSP.chunks, {
utilities: { title: '🔧 المرافق — شبكات المياه والصرف', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Utilities Networks
</div>
<h3>🔧 اختر الشبكة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('water_supply_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">💧</div><div style="color:var(--gold);font-weight:700;font-size:14px;">مياه الشرب</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Pressure 1.5x | Chlorination 50ppm</div></div>
<div onclick="QS.openDetail('sewer_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🚽</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Foul Sewer</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Air Test | CCTV 100%</div></div>
<div onclick="QS.openDetail('storm_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🌊</div><div style="color:var(--gold);font-weight:700;font-size:14px;">الصرف السطحي</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Gullies | Silt Trap</div></div>
<div onclick="QS.openDetail('treated_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">♻️</div><div style="color:var(--gold);font-weight:700;font-size:14px;">المياه المعالجة</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">بنفسجي | Cross Connection</div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px;">
<div onclick="QS.openDetail('utilities_materials')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">🧱</div><div style="color:var(--gold);font-weight:700;font-size:13px;">مواد المرافق</div></div>
<div onclick="QS.openDetail('utilities_qcp')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📊</div><div style="color:var(--gold);font-weight:700;font-size:13px;">خطة الجودة QCP</div></div>
<div onclick="QS.openDetail('pipe_bedding')" style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📐</div><div style="color:#2ecc71;font-weight:700;font-size:13px;">أنواع فرش المواسير</div><div style="color:var(--text3);font-size:11px;">Class S, A, B, D — Bedding Types</div></div>
<div onclick="QS.openDetail('ms_utilities')" style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:12px;padding:12px;cursor:pointer;text-align:center;">
<div style="font-size:20px">📝</div><div style="color:#3498db;font-weight:700;font-size:13px;">Method Statement</div><div style="color:var(--text3);font-size:11px;">Utilities Works</div></div>
</div>
<h3>⚠️ قواعد الفصل الإلزامية</h3>
<table class="dm-table">
<tr><th>الشبكتان</th><th>الفصل الأفقي</th><th>الوضع الرأسي</th></tr>
<tr><td>مياه الشرب / صرف صحي</td><td>≥ 1.0m</td><td>مياه الشرب فوق دائماً</td></tr>
<tr><td>Water Supply / Treated</td><td>≥ 1.0m</td><td>مياه الشرب فوق دائماً</td></tr>
<tr><td>صرف صحي / سطحي</td><td>≥ 0.5m</td><td>لا اتصال بينهما أبداً</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🔧 Utilities Networks — QCS 2024 Section 8</h3>
<table class="dm-table">
<tr><th>Network</th><th>Key Test</th><th>Standard</th></tr>
<tr><td>Water Supply</td><td>Pressure 1.5×PN / 2hr</td><td>KAHRAMAA</td></tr>
<tr><td>Foul Sewer</td><td>Air Test 100mm / 5min</td><td>Ashghal</td></tr>
<tr><td>Storm Water</td><td>Hydraulic / CCTV 100%</td><td>Ashghal</td></tr>
<tr><td>Treated Water</td><td>Pressure + Cross-connection check</td><td>MME</td></tr>
</table>
<p><strong>Mandatory Separation:</strong> Water supply ≥ 1.0m horizontal from foul sewer. Water always ABOVE sewer.</p>
<p><strong>Marker Tape Colours:</strong> Yellow = Water | Green = Sewer | Blue = Storm | Purple = Treated</p>
</div>
` },
water_supply_stages: { title: '💧 شبكة مياه الشرب', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 شبكة مياه الشرب — نظرة عامة</span>
<button onclick="document.getElementById('vid-water-supply-stages').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-water-supply-stages" accept="video/*" style="display:none" data-player="vid-player-water-supply-stages" data-ph="vid-ph-water-supply-stages" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-water-supply-stages" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-water-supply-stages" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | KAHRAMAA Standards | Water Supply Network
</div>
<h3>🗺️ مراحل تنفيذ شبكة مياه الشرب — الترتيب الإلزامي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ws_survey')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">الدراسة والمسح</div><div style="color:var(--text3);font-size:10px;">As-Built + GIS + Route Survey</div></div><div onclick="QS.openDetail('ws_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">المواد والمواسير</div><div style="color:var(--text3);font-size:10px;">HDPE PE100 / DI / GRP — KAHRAMAA</div></div><div onclick="QS.openDetail('ws_excavation')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">الحفر والبيدنج</div><div style="color:var(--text3);font-size:10px;">Trench + Bedding Class B</div></div><div onclick="QS.openDetail('ws_laying')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">وضع المواسير</div><div style="color:var(--text3);font-size:10px;">Pipe Laying + Jointing</div></div><div onclick="QS.openDetail('ws_testing')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">اختبار الضغط</div><div style="color:var(--text3);font-size:10px;">Hydrostatic 1.5×PN / 2hr</div></div><div onclick="QS.openDetail('ws_disinfection')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">التعقيم والتطهير</div><div style="color:var(--text3);font-size:10px;">Chlorination ≥50ppm / 24hr</div></div><div onclick="QS.openDetail('ws_backfill')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">الردم والدمك</div><div style="color:var(--text3);font-size:10px;">Backfill ≥95% MDD</div></div><div onclick="QS.openDetail('ws_handover')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">التسليم</div><div style="color:var(--text3);font-size:10px;">As-Built + Commissioning</div></div></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Water Supply Network — Overview</span>
<button onclick="document.getElementById('vid-water-supply-stages-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-water-supply-stages-en" accept="video/*" style="display:none" data-player="vid-player-water-supply-stages-en" data-ph="vid-ph-water-supply-stages-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-water-supply-stages-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-water-supply-stages-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | KAHRAMAA Standards | Water Supply Network
</div>
<h3>Water Supply Execution Phases — Mandatory Sequence</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ws_survey')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Survey & Design</div><div style="color:var(--text3);font-size:10px;">As-Built + GIS + Route Survey</div></div><div onclick="QS.openDetail('ws_materials')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Materials</div><div style="color:var(--text3);font-size:10px;">HDPE PE100 / DI / GRP — KAHRAMAA</div></div><div onclick="QS.openDetail('ws_excavation')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Excavation & Bedding</div><div style="color:var(--text3);font-size:10px;">Trench + Bedding Class B</div></div><div onclick="QS.openDetail('ws_laying')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Pipe Laying</div><div style="color:var(--text3);font-size:10px;">Pipe Laying + Jointing</div></div><div onclick="QS.openDetail('ws_testing')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Pressure Testing</div><div style="color:var(--text3);font-size:10px;">Hydrostatic 1.5×PN / 2hr</div></div><div onclick="QS.openDetail('ws_disinfection')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Chlorination</div><div style="color:var(--text3);font-size:10px;">≥50ppm / 24hr</div></div><div onclick="QS.openDetail('ws_backfill')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Backfill & Compaction</div><div style="color:var(--text3);font-size:10px;">≥95% MDD</div></div><div onclick="QS.openDetail('ws_handover')" style="background:rgba(52,152,219,0.06);border:1px solid rgba(52,152,219,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#3498db;font-weight:700;font-size:12px;">Handover</div><div style="color:var(--text3);font-size:10px;">As-Built + Commissioning</div></div></div>
</div>
` },
sewer_stages: { title: '🚽 شبكة Foul Sewer', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 شبكة Foul Sewer — نظرة عامة</span>
<button onclick="document.getElementById('vid-sewer-stages').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sewer-stages" accept="video/*" style="display:none" data-player="vid-player-sewer-stages" data-ph="vid-ph-sewer-stages" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sewer-stages" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-sewer-stages" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | Ashghal Standards | Foul Sewer Network
</div>
<h3>🗺️ مراحل تنفيذ شبكة الصرف الصحي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ss_survey')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الدراسة والمسح</div><div style="color:var(--text3);font-size:10px;">Survey + Route + Profile</div></div><div onclick="QS.openDetail('ss_materials')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">المواد والمواسير</div><div style="color:var(--text3);font-size:10px;">uPVC / GRP / Concrete</div></div><div onclick="QS.openDetail('ss_excavation')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الحفر والبيدنج</div><div style="color:var(--text3);font-size:10px;">Trench + Dewatering + Bedding</div></div><div onclick="QS.openDetail('ss_laying')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">وضع المواسير</div><div style="color:var(--text3);font-size:10px;">Pipe Laying + Gradient Control</div></div><div onclick="QS.openDetail('ss_manholes')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Manholes</div><div style="color:var(--text3);font-size:10px;">Manhole Construction + Benching</div></div><div onclick="QS.openDetail('ss_testing')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الاختبارات</div><div style="color:var(--text3);font-size:10px;">Air Test + CCTV Survey</div></div><div onclick="QS.openDetail('ss_backfill')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">الردم</div><div style="color:var(--text3);font-size:10px;">Backfill ≥95% MDD</div></div><div onclick="QS.openDetail('ss_handover')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">التسليم</div><div style="color:var(--text3);font-size:10px;">CCTV Final + As-Built</div></div></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Foul Sewer Network — Overview</span>
<button onclick="document.getElementById('vid-sewer-stages-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sewer-stages-en" accept="video/*" style="display:none" data-player="vid-player-sewer-stages-en" data-ph="vid-ph-sewer-stages-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sewer-stages-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-sewer-stages-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Foul Sewer Execution Phases</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('ss_survey')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Survey & Design</div><div style="color:var(--text3);font-size:10px;">Route + Profile + GIS</div></div><div onclick="QS.openDetail('ss_materials')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Materials</div><div style="color:var(--text3);font-size:10px;">uPVC / GRP / Concrete pipes</div></div><div onclick="QS.openDetail('ss_excavation')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Excavation & Bedding</div><div style="color:var(--text3);font-size:10px;">Trench + Dewatering + Bedding</div></div><div onclick="QS.openDetail('ss_laying')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Pipe Laying</div><div style="color:var(--text3);font-size:10px;">Pipe + Gradient + Joints</div></div><div onclick="QS.openDetail('ss_manholes')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Manholes</div><div style="color:var(--text3);font-size:10px;">Construction + Benching + Cover</div></div><div onclick="QS.openDetail('ss_testing')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Testing</div><div style="color:var(--text3);font-size:10px;">Air Test + CCTV</div></div><div onclick="QS.openDetail('ss_backfill')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Backfill</div><div style="color:var(--text3);font-size:10px;">≥95% MDD compaction</div></div><div onclick="QS.openDetail('ss_handover')" style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#e74c3c;font-weight:700;font-size:12px;">Handover</div><div style="color:var(--text3);font-size:10px;">CCTV + As-Built</div></div></div>
</div>
` },
storm_stages: { title: '🌧️ شبكة الصرف السطحي', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 شبكة الصرف السطحي — نظرة عامة</span>
<button onclick="document.getElementById('vid-storm-stages').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-storm-stages" accept="video/*" style="display:none" data-player="vid-player-storm-stages" data-ph="vid-ph-storm-stages" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-storm-stages" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-storm-stages" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | Ashghal | Storm Water Drainage Network
</div>
<h3>🗺️ مراحل تنفيذ شبكة الصرف السطحي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('sw_survey')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الدراسة والتصميم</div><div style="color:var(--text3);font-size:10px;">Catchment Area + IDF Curve</div></div><div onclick="QS.openDetail('sw_materials')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">المواد</div><div style="color:var(--text3);font-size:10px;">RC Pipes / Culverts / Channels</div></div><div onclick="QS.openDetail('sw_excavation')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الحفر والتحضير</div><div style="color:var(--text3);font-size:10px;">Trench + Grading</div></div><div onclick="QS.openDetail('sw_laying')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">وضع المواسير والكيوفيرتات</div><div style="color:var(--text3);font-size:10px;">Pipes + Box Culverts</div></div><div onclick="QS.openDetail('sw_gullies')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Gullies والمداخل</div><div style="color:var(--text3);font-size:10px;">Gully + Inlet Installation</div></div><div onclick="QS.openDetail('sw_testing')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الاختبارات</div><div style="color:var(--text3);font-size:10px;">CCTV + Hydraulic Test</div></div><div onclick="QS.openDetail('sw_backfill')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">الردم</div><div style="color:var(--text3);font-size:10px;">Backfill + Compaction</div></div><div onclick="QS.openDetail('sw_handover')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">التسليم</div><div style="color:var(--text3);font-size:10px;">Level Survey + As-Built</div></div></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Storm Water Drainage — Overview</span>
<button onclick="document.getElementById('vid-storm-stages-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-storm-stages-en" accept="video/*" style="display:none" data-player="vid-player-storm-stages-en" data-ph="vid-ph-storm-stages-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-storm-stages-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-storm-stages-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Storm Water Execution Phases</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;">
<div onclick="QS.openDetail('sw_survey')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">1️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Survey & Design</div><div style="color:var(--text3);font-size:10px;">Catchment + IDF Curve</div></div><div onclick="QS.openDetail('sw_materials')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">2️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Materials</div><div style="color:var(--text3);font-size:10px;">RC Pipes / Box Culverts</div></div><div onclick="QS.openDetail('sw_excavation')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">3️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Excavation</div><div style="color:var(--text3);font-size:10px;">Trench + Grading</div></div><div onclick="QS.openDetail('sw_laying')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">4️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Pipe & Culvert Laying</div><div style="color:var(--text3);font-size:10px;">Pipes + Box Culverts</div></div><div onclick="QS.openDetail('sw_gullies')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">5️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Gullies & Inlets</div><div style="color:var(--text3);font-size:10px;">Gully + Inlet Installation</div></div><div onclick="QS.openDetail('sw_testing')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">6️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Testing</div><div style="color:var(--text3);font-size:10px;">CCTV + Hydraulic Test</div></div><div onclick="QS.openDetail('sw_backfill')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">7️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Backfill</div><div style="color:var(--text3);font-size:10px;">Compaction ≥95% MDD</div></div><div onclick="QS.openDetail('sw_handover')" style="background:rgba(46,204,113,0.06);border:1px solid rgba(46,204,113,0.2);border-radius:8px;padding:10px;cursor:pointer;text-align:center;"><div style="font-size:16px;">8️⃣</div><div style="color:#2ecc71;font-weight:700;font-size:12px;">Handover</div><div style="color:var(--text3);font-size:10px;">Level Survey + As-Built</div></div></div>
</div>
` },
treated_stages: { title: '♻️ شبكة المياه المعالجة', content: `
<div class="lang-content-ar">
<div style="margin-top:16px;"><div onclick="QS.openDetail('itp_treated')" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">ITP المياه المعالجة الكامل</div></div></div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Treated / Reclaimed Water Network</div>
<h3>⛔ تحذير خطير — اقرأ أولاً</h3>
<p>المياه المعالجة <strong>غير صالحة للشرب</strong>. Cross Connection مع مياه الشرب = <strong>كارثة صحية</strong>. اللون البنفسجي إلزامي بدون استثناء على كل مواسير ومعدات الشبكة.</p>
<h3>📌 اختر المرحلة للتفاصيل الكاملة</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('tw_survey')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الدراسة والتصميم</div></div>
<div onclick="QS.openDetail('tw_materials')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">المواسير البنفسجية</div></div>
<div onclick="QS.openDetail('tw_excavation')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⛏️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">الحفر والفصل</div></div>
<div onclick="QS.openDetail('tw_laying')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">وضع المواسير</div></div>
<div onclick="QS.openDetail('tw_testing')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="الاختبارات" data-en="Testing">الاختبارات</div></div>
<div onclick="QS.openDetail('tw_handover')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">✅</div><div style="color:var(--gold);font-weight:700;font-size:13px;" data-ar="التسليم" data-en="Handover">التسليم</div></div>
</div>
<h3>📐 المواصفات العامة</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th><th>المرجع</th></tr><tr><td>نوع المواسير</td><td>HDPE بنفسجي / uPVC بنفسجي</td><td>ISO 4427</td></tr><tr><td>اللون</td><td>بنفسجي — RAL 4001 إلزامي</td><td>MME Std</td></tr><tr><td>الضغط التصميمي</td><td>6 – 10 bar</td><td>QCS S8</td></tr><tr><td>عمق الدفن</td><td>≥ 0.9m</td><td>QCS S8</td></tr><tr><td>الفصل عن مياه الشرب</td><td>≥ 1.0m أفقياً — إلزامي</td><td>QCS S8</td></tr><tr><td>Marker Tape</td><td>بنفسجي — RECLAIMED WATER</td><td>MME</td></tr><tr><td>Double Check Valve</td><td>عند كل نقطة اتصال</td><td>MME</td></tr><tr><td>Pressure Test</td><td>1.5x / ساعتان / صفر</td><td>QCS S8</td></tr><tr><td>Cross Connection Test</td><td>صفر تلوث في مياه الشرب</td><td>MME</td></tr></table>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ♻️ شبكة المياه المعالجة
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
ws_survey: { title: '📐 مياه الشرب — الدراسة والتصميم', content: `
<div class="lang-content-ar">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 1 | KAHRAMAA W.S.S. Standards | Pre-Construction</div>

<h3>📐 1. متطلبات ما قبل التنفيذ — Water Supply</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>الجهة المعتمِدة</th><th>التوقيت</th></tr>
<tr><td>مخططات التصميم</td><td>معتمدة من KAHRAMAA — Plan + Profile + Details</td><td>KAHRAMAA</td><td>قبل أي تنفيذ</td></tr>
<tr><td>Hydraulic Analysis</td><td>تحليل الضغط والتدفق — Epanet أو WaterGEMS<br>Min pressure ≥ 15m (1.5 bar) في أي نقطة</td><td>Consultant + KAHRAMAA</td><td>قبل التصميم النهائي</td></tr>
<tr><td>Material Submittal</td><td>اعتماد كل المواسير + Fittings + Valves<br>شهادات المصنع + KAHRAMAA Approved List</td><td>KAHRAMAA</td><td>قبل التوريد</td></tr>
<tr><td>Method Statement</td><td>يشمل: Fusion procedure + Disinfection plan<br>+ Traffic Management + Emergency Shutdown plan</td><td>Consultant + KAHRAMAA</td><td>قبل الحفر</td></tr>
<tr><td>Soil Investigation</td><td>Trial pits كل 100m — تحديد GWT + Sabkha zones</td><td>Consultant</td><td>قبل التصميم</td></tr>
<tr><td>Traffic Management Plan</td><td>معتمدة من MME + MOI + Ashghal</td><td>MME / MOI / Ashghal</td><td>قبل الحفر</td></tr>
<tr><td>Utility Detection (GPR)</td><td>Ground Penetrating Radar Scan — 100% قبل الحفر</td><td>Ashghal NOC</td><td>قبل الحفر</td></tr>
<tr><td>Emergency Isolation Plan</td><td>خطة قطع الطوارئ + مواضع الـ Isolation Valves</td><td>KAHRAMAA</td><td>قبل الحفر</td></tr>
</table></div>

<h3>📐 2. NOC إلزامي قبل الحفر — جدول كامل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الجهة</th><th>سبب NOC</th><th>مدة الحصول المتوقعة</th><th>ملاحظة</th></tr>
<tr><td>KAHRAMAA</td><td>شبكة مياه الشرب + الكهرباء الموجودة</td><td>5–10 أيام عمل</td><td>إلزامي — الأول</td></tr>
<tr><td>Ashghal</td><td>الطرق + الصرف الصحي + البنية التحتية</td><td>5–7 أيام عمل</td><td>إلزامي</td></tr>
<tr><td>Ooredoo / Vodafone</td><td>كابلات الاتصالات</td><td>3–5 أيام عمل</td><td>إلزامي</td></tr>
<tr><td>Qatar Rail (لو قرب مترو)</td><td>حماية الأنفاق والمسافات الآمنة</td><td>10–15 يوم عمل</td><td>شرط خاص إضافي</td></tr>
<tr><td>QP / Woqod (لو قرب غاز)</td><td>خطوط الغاز والنفط المدفونة</td><td>10–15 يوم عمل</td><td>شرط خاص إضافي</td></tr>
<tr><td>MME / MOI</td><td>المرور وإغلاق الطرق</td><td>3–5 أيام عمل</td><td>مع Traffic Plan</td></tr>
</table></div>

<h3>📐 3. متطلبات التصميم الهيدروليكي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المعيار</th><th>القيمة</th><th>المرجع</th></tr>
<tr><td>الضغط الأدنى في الشبكة</td><td>≥ 15m head (1.5 bar) — خلال ساعة الذروة</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>الضغط الأقصى</td><td>≤ 80m head (8.0 bar) — حماية المواسير</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>سرعة التدفق الدنيا</td><td>≥ 0.3 m/s — لمنع تراكم الترسبات</td><td>QCS S8 P1</td></tr>
<tr><td>سرعة التدفق القصوى</td><td>≤ 3.0 m/s — حماية من Water Hammer</td><td>QCS S8 P1</td></tr>
<tr><td>Water Hammer Analysis</td><td>إلزامي لخطوط > DN300 أو سرعة > 1.5 m/s</td><td>KAHRAMAA</td></tr>
<tr><td>Minimum Pipe Diameter</td><td>DN50 للتوصيلات المنزلية | DN100 للشوارع</td><td>KAHRAMAA Std.</td></tr>
<tr><td>عمق الدفن في الطرق</td><td>≥ 900mm من سطح الطريق</td><td>KAHRAMAA / Ashghal</td></tr>
<tr><td>عمق الدفن خارج الطرق</td><td>≥ 600mm (حدائق + مناطق رعي)</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>📐 4. مسافات الفصل الإلزامية — Water Supply</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الشبكة المجاورة</th><th>الفصل الأفقي الأدنى</th><th>الفصل الرأسي</th><th>المرجع</th></tr>
<tr><td>Foul Sewer</td><td>≥ 1000mm</td><td>Water Supply دائماً فوق</td><td>KAHRAMAA / QCS S8</td></tr>
<tr><td>Treated Water</td><td>≥ 1000mm</td><td>Water Supply دائماً فوق</td><td>KAHRAMAA / MME</td></tr>
<tr><td>Storm Water</td><td>≥ 500mm</td><td>Water Supply فوق مفضّل</td><td>QCS S8 P1</td></tr>
<tr><td>Gas (QP / Woqod)</td><td>≥ 1000mm</td><td>أي وضع — حسب تقييم QP</td><td>QP Standards</td></tr>
<tr><td>Electricity Cables</td><td>≥ 500mm</td><td>Water Supply فوق</td><td>KAHRAMAA Electrical</td></tr>
<tr><td>Telecom Cables</td><td>≥ 300mm</td><td>أي وضع</td><td>Ooredoo</td></tr>
</table></div>

<h3>🔴 5. Hold Points — ما قبل التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01A</td><td>كل NOCs مكتملة قبل الحفر</td><td>KAHRAMAA + Ashghal + MME</td><td>NOC Letters File</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01B</td><td>Material Approval من KAHRAMAA قبل التوريد</td><td>KAHRAMAA</td><td>Approved Submittal</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01C</td><td>Hydraulic Analysis معتمد + Method Statement</td><td>Consultant + KAHRAMAA</td><td>Approved MS + Hydraulic Report</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | KAHRAMAA Standards | Water Supply Pre-Construction</div>
<h3>Pre-Construction Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Authority</th></tr>
<tr><td>Design Drawings</td><td>KAHRAMAA approved — Plan + Profile + Details</td><td>KAHRAMAA</td></tr>
<tr><td>Hydraulic Analysis</td><td>Epanet/WaterGEMS — Min pressure ≥ 15m (1.5 bar)</td><td>KAHRAMAA</td></tr>
<tr><td>Material Submittal</td><td>All pipes + fittings + valves — KAHRAMAA Approved List</td><td>KAHRAMAA</td></tr>
<tr><td>Method Statement</td><td>Fusion procedure + disinfection plan + emergency shutdown</td><td>KAHRAMAA + Consultant</td></tr>
<tr><td>GPR Survey</td><td>100% before excavation</td><td>Ashghal NOC</td></tr>
</table></div>
<h3>Hydraulic Design Standards</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Value</th><th>Reference</th></tr>
<tr><td>Min pressure</td><td>≥ 15m head (1.5 bar) at peak demand</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>Max pressure</td><td>≤ 80m head (8.0 bar)</td><td>KAHRAMAA W.S.S.</td></tr>
<tr><td>Min velocity</td><td>≥ 0.3 m/s</td><td>QCS S8 P1</td></tr>
<tr><td>Max velocity</td><td>≤ 3.0 m/s</td><td>QCS S8 P1</td></tr>
<tr><td>Cover depth (roads)</td><td>≥ 900mm</td><td>KAHRAMAA / Ashghal</td></tr>
</table></div>
<h3>Mandatory Separation Distances</h3>
<p>• Foul Sewer: ≥1000mm horizontal — Water Supply always above<br>
• Treated Water: ≥1000mm horizontal — Water Supply always above<br>
• Gas: ≥1000mm horizontal — per QP assessment<br>
• Electricity: ≥500mm — Water Supply above</p>
<p><strong>HP-01A:</strong> All NOCs complete before excavation<br>
<strong>HP-01B:</strong> KAHRAMAA Material Approval before supply<br>
<strong>HP-01C:</strong> Hydraulic Analysis + Method Statement approved</p>
</div>
` },
ws_materials: { title: '🔩 مياه الشرب — المواد والمواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مواد شبكة مياه الشرب</span>
<button onclick="document.getElementById('vid-ws-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-materials" accept="video/*" style="display:none" data-player="vid-player-ws-materials" data-ph="vid-ph-ws-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-materials" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-materials" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 KAHRAMAA Standards | QCS 2024 Section 8 Part 1 | Material Specifications</div>

<h3>📐 1. أنواع المواسير المعتمدة — KAHRAMAA</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>المعيار</th><th>Pressure Class</th><th>القطر</th><th>الاستخدام</th><th>اختبار المصنع</th></tr>
<tr><td>HDPE PE100</td><td>ISO 4427 / KAHRAMAA</td><td>PN10 – PN16</td><td>DN50 – DN1200</td><td>التوزيع + الرئيسي</td><td>Hydrostatic 2×PN / 1hr</td></tr>
<tr><td>Ductile Iron K9</td><td>ISO 2531 / BS EN 545</td><td>K9</td><td>DN80 – DN1600</td><td>الخطوط الرئيسية + العبور</td><td>Hydrostatic + Hoop Stress</td></tr>
<tr><td>GRP / FRP</td><td>ISO 10467 / AWWA C950</td><td>PN6 – PN25</td><td>DN300 – DN3000</td><td>الخطوط الكبيرة</td><td>Hydrostatic + Stiffness</td></tr>
<tr><td>uPVC PN10/PN16</td><td>ISO 1452 / BS EN 1452</td><td>PN10 – PN16</td><td>DN50 – DN400</td><td>التوزيع الثانوي</td><td>Hydrostatic 2×PN</td></tr>
</table></div>

<h3>📐 2. مواصفات الجودة الإلزامية — جدول الاختبارات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>مواصفة القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Pressure Rating</td><td>≥ PN10 (PN16 للمناطق العالية)</td><td>Factory Hydrostatic Test</td><td>كل batch</td><td>ISO 4427 / KAHRAMAA</td></tr>
<tr><td>SDR HDPE</td><td>SDR 11 لـ PE100</td><td>Wall Thickness Measurement</td><td>كل delivery</td><td>ISO 4427</td></tr>
<tr><td>لون الماسورة</td><td>أزرق أو أصفر (داخلي) — KAHRAMAA</td><td>Visual + Color Chart</td><td>100% per delivery</td><td>KAHRAMAA Std.</td></tr>
<tr><td>Marking on Pipe</td><td>اسم المصنع + Material + PN + DN + Lot No</td><td>Visual Check</td><td>100%</td><td>ISO 4427</td></tr>
<tr><td>Conformity Certificate</td><td>QGOS أو معادل معتمد من KAHRAMAA</td><td>Document Check</td><td>كل Submittal</td><td>KAHRAMAA</td></tr>
<tr><td>Tensile Strength HDPE</td><td>≥ 25 N/mm²</td><td>ISO 527-2</td><td>كل batch</td><td>ISO 4427</td></tr>
<tr><td>Ring Stiffness uPVC</td><td>≥ SN4 (min)</td><td>ISO 9969</td><td>كل batch</td><td>ISO 1452</td></tr>
<tr><td>Impact Strength</td><td>لا كسور في 10 قطع</td><td>ISO 3127 Drop Test</td><td>كل batch</td><td>ISO 4427</td></tr>
</table></div>

<h3>📐 3. مواد Fittings والوصلات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المادة</th><th>النوع</th><th>المواصفة</th><th>الملاحظة</th></tr>
<tr><td>HDPE Fittings</td><td>Butt Fusion / Electrofusion</td><td>ISO 8085-3</td><td>SDR نفس الماسورة إلزامياً</td></tr>
<tr><td>Ductile Iron Fittings</td><td>Mechanical Joint / Push-on</td><td>ISO 2531</td><td>Epoxy lined داخلياً</td></tr>
<tr><td>Gaskets</td><td>EPDM Rubber</td><td>BS EN 681-1</td><td>Grade لمياه الشرب فقط</td></tr>
<tr><td>Bolts / Nuts</td><td>SS316 أو Hot-dipped Galv.</td><td>ASTM A307</td><td>لا Mild Steel بدون حماية</td></tr>
<tr><td>Thrust Blocks</td><td>Concrete in-situ</td><td>C20 minimum</td><td>عند كل تغيير اتجاه ≥ 11.25°</td></tr>
<tr><td>Air Valves</td><td>Double Air Release</td><td>BS EN 1074-4</td><td>عند كل نقطة عالية</td></tr>
<tr><td>Isolation Valves</td><td>Gate / Butterfly Valve</td><td>BS EN 1074-2</td><td>Epoxy lined / SS internals</td></tr>
</table></div>

<h3>⛔ 4. المواد المرفوضة فوراً في الموقع</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;">
<p>• مواسير بدون علامات المصنع (UN-MARKED PIPES) — رفض فوري<br>
• مواسير HDPE بدون شهادة PE100 — رفض<br>
• Gaskets بدون تصنيف مياه شرب — رفض<br>
• DI Pipes بدون Epoxy Lining — رفض<br>
• مواسير بها خدوش عميقة > 10% من سماكة الجدار — رفض<br>
• أي مواسير مخزنة في الشمس المباشرة > 3 أشهر بدون حماية — رفض HDPE<br>
• Fittings بدون SDR مطابق لماسورة الربط — رفض</p>
</div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>اعتماد Material Submittal قبل التوريد</td><td>Consultant + KAHRAMAA</td><td>Approved MAR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>استلام المواد + فحص التسليم</td><td>QC Engineer</td><td>Delivery Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 KAHRAMAA Standards | QCS 2024 Section 8 Part 1
</div>
<h3>Pipe Types — KAHRAMAA Approved</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Pipe Type</th><th>Standard</th><th>Pressure Class</th><th>Diameter</th><th>Use</th></tr>
<tr><td>HDPE PE100</td><td>ISO 4427</td><td>PN10 – PN16</td><td>DN50–DN1200</td><td>Distribution + Transmission</td></tr>
<tr><td>Ductile Iron K9</td><td>ISO 2531 / BS EN 545</td><td>K9</td><td>DN80–DN1600</td><td>Major mains + crossings</td></tr>
<tr><td>GRP / FRP</td><td>ISO 10467</td><td>PN6 – PN25</td><td>DN300–DN3000</td><td>Large diameter mains</td></tr>
<tr><td>uPVC</td><td>ISO 1452</td><td>PN10 – PN16</td><td>DN50–DN400</td><td>Secondary distribution</td></tr>
</table></div>
<h3>Quality Tests — Minimum Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Acceptance</th><th>Test Method</th><th>Min Frequency</th><th>Reference</th></tr>
<tr><td>Pressure Rating</td><td>≥ PN10 minimum</td><td>Factory Hydrostatic</td><td>Per batch</td><td>ISO 4427</td></tr>
<tr><td>SDR (HDPE PE100)</td><td>SDR 11</td><td>Wall thickness measurement</td><td>Per delivery</td><td>ISO 4427</td></tr>
<tr><td>Pipe colour</td><td>Blue or Yellow (internal) — KAHRAMAA</td><td>Visual + colour chart</td><td>100% per delivery</td><td>KAHRAMAA</td></tr>
<tr><td>Marking</td><td>Manufacturer + Material + PN + DN + Lot</td><td>Visual</td><td>100%</td><td>ISO 4427</td></tr>
<tr><td>Conformity Certificate</td><td>QGOS or KAHRAMAA-approved equivalent</td><td>Document check</td><td>Per submittal</td><td>KAHRAMAA</td></tr>
<tr><td>Tensile Strength</td><td>≥ 25 N/mm²</td><td>ISO 527-2</td><td>Per batch</td><td>ISO 4427</td></tr>
<tr><td>Impact Strength</td><td>No fracture in 10 specimens</td><td>ISO 3127 Drop Test</td><td>Per batch</td><td>ISO 4427</td></tr>
</table></div>
<h3>Rejected Materials — Immediate Site Rejection</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• Unmarked pipes (no manufacturer markings) — REJECT<br>
• HDPE without PE100 certificate — REJECT<br>
• Gaskets without potable water grade — REJECT<br>
• DI Pipes without epoxy lining — REJECT<br>
• Pipes with scratches > 10% wall thickness — REJECT<br>
• HDPE stored in direct sun > 3 months unprotected — REJECT
</div>
</div>
` },
ws_excavation: { title: '⛏️ مياه الشرب — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 حفر وتحضير الخندق — مياه الشرب</span>
<button onclick="document.getElementById('vid-ws-excavation').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-excavation" accept="video/*" style="display:none" data-player="vid-player-ws-excavation" data-ph="vid-ph-ws-excavation" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-excavation" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-excavation" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | KAHRAMAA | Trench Excavation & Bedding</div>

<h3>📐 1. مواصفات الخندق — Trench Geometry</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة القياس</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>عمق الدفن (cover)</td><td>≥ 1.0m من سطح الأرض لأعلى الماسورة</td><td>قياس مباشر</td><td>كل 50m</td><td>KAHRAMAA</td></tr>
<tr><td>عرض الخندق</td><td>OD + 600mm (300mm كل جانب)</td><td>شريط قياس</td><td>كل 50m</td><td>QCS S8</td></tr>
<tr><td>انحراف الخندق</td><td>± 25mm أفقياً، ± 10mm رأسياً</td><td>Total Station</td><td>كل 50m</td><td>KAHRAMAA</td></tr>
<tr><td>سماكة Bedding</td><td>150mm أسفل الماسورة — Class B</td><td>قياس مباشر</td><td>كل Pipe Length</td><td>KAHRAMAA</td></tr>
<tr><td>Haunch Bedding</td><td>رمل نظيف حتى المحور + 300mm</td><td>قياس مباشر</td><td>كل Pipe Length</td><td>QCS S8</td></tr>
<tr><td>Dewatering</td><td>مستوى الماء ≤ 300mm أسفل قاع الحفر</td><td>بصري + قياس</td><td>مستمر</td><td>QCS S8</td></tr>
<tr><td>Shoring</td><td>إلزامي لأعماق > 1.5m</td><td>Design Check</td><td>قبل الحفر</td><td>QCS S1</td></tr>
</table></div>

<h3>📐 2. مواصفات مواد الـ Bedding</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>المواصفة</th><th>اختبار</th><th>تكرار</th></tr>
<tr><td>Bedding (أسفل الماسورة)</td><td>Sand — clean, free draining</td><td>≤ 5mm max size، PI=0</td><td>Grading + PI</td><td>كل 500m³</td></tr>
<tr><td>Haunch (جانبي للمحور)</td><td>Sand — hand compacted</td><td>نفس Bedding</td><td>بصري</td><td>100%</td></tr>
<tr><td>Initial Backfill (فوق +300mm)</td><td>Selected Fill ≤ 75mm</td><td>CBR ≥ 5% | PI ≤ 10</td><td>CBR + Grading</td><td>كل 500m³</td></tr>
<tr><td>Marker Tape</td><td>أصفر WATER MAIN</td><td>300mm أعلى الماسورة</td><td>100% بصري</td><td>كل Pipe Run</td></tr>
</table></div>

<h3>⛔ 3. المواد المرفوضة للـ Bedding</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• رمل فيه طين أو Silt (PI > 6) — رفض<br>
• حجر > 5mm في منطقة الـ Bedding — رفض<br>
• تربة طبيعية من الحفر كـ Bedding — رفض<br>
• سبخة أو تربة منتفخة — رفض فوري + تقرير فوري للمهندس
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03</td><td>فحص الخندق: العمق + العرض + Bedding قبل وضع المواسير</td><td>QC + Consultant</td><td>Trench Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 1 | KAHRAMAA | Trench Excavation & Bedding
</div>
<h3>Trench Geometry Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Measurement</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Cover Depth</td><td>≥ 1.0m from surface to top of pipe</td><td>Direct measurement</td><td>Every 50m</td><td>KAHRAMAA</td></tr>
<tr><td>Trench Width</td><td>OD + 600mm (300mm each side)</td><td>Tape measure</td><td>Every 50m</td><td>QCS S8</td></tr>
<tr><td>Bedding Thickness</td><td>150mm below pipe — Class B</td><td>Direct measurement</td><td>Per pipe length</td><td>KAHRAMAA</td></tr>
<tr><td>Haunch Fill</td><td>Clean sand to centreline + 300mm</td><td>Direct measurement</td><td>Per pipe length</td><td>QCS S8</td></tr>
<tr><td>Dewatering</td><td>GWT ≤ 300mm below trench bottom</td><td>Visual + measurement</td><td>Continuous</td><td>QCS S8</td></tr>
<tr><td>Shoring</td><td>Mandatory for depths > 1.5m</td><td>Design check</td><td>Before excavation</td><td>QCS S1</td></tr>
</table></div>
<h3>Hold Point</h3>
<p><strong>HP-03:</strong> Trench inspection — depth + width + bedding BEFORE pipe laying | QC Engineer + Consultant</p>
</div>
` },
ws_laying: { title: '🔧 مياه الشرب — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مد مواسير مياه الشرب</span>
<button onclick="document.getElementById('vid-ws-laying').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-laying" accept="video/*" style="display:none" data-player="vid-player-ws-laying" data-ph="vid-ph-ws-laying" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-laying" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-laying" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 KAHRAMAA Standards | QCS 2024 Section 8 Part 1 | Pipe Laying</div>

<h3>📐 1. متطلبات وضع المواسير — Pipe Laying Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة التحقق</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>اتجاه وضع المواسير</td><td>من المصب للمنبع (downhill to uphill)</td><td>بصري</td><td>مستمر</td><td>KAHRAMAA</td></tr>
<tr><td>محاذاة الماسورة</td><td>± 25mm أفقياً من خط التصميم</td><td>Total Station</td><td>كل 50m</td><td>KAHRAMAA</td></tr>
<tr><td>فراغ الوصلة</td><td>حسب مواصفة المصنع (عادة 10-15mm)</td><td>قياس مباشر</td><td>كل وصلة</td><td>ISO 4427</td></tr>
<tr><td>فحص الوصلات HDPE</td><td>Butt Fusion: bead width + bead height = uniform</td><td>بصري + قياس Bead</td><td>كل وصلة</td><td>KAHRAMAA</td></tr>
<tr><td>Electrofusion Records</td><td>تسجيل Barcode + Time + Temp + Operator ID</td><td>Datalogger Print</td><td>كل وصلة</td><td>KAHRAMAA</td></tr>
<tr><td>حماية نهايات المواسير</td><td>End Caps عند نهاية العمل اليومي</td><td>بصري</td><td>يومياً</td><td>QCS S8</td></tr>
<tr><td>Thrust Blocks</td><td>C20 عند كل Bend + Tee + Reducer</td><td>بصري + أبعاد</td><td>كل موقع</td><td>KAHRAMAA</td></tr>
<tr><td>Air Valve تركيب</td><td>عند كل قمة في Profile</td><td>مقارنة بالمخططات</td><td>كل موقع</td><td>KAHRAMAA</td></tr>
<tr><td>Scour Valve تركيب</td><td>عند كل أخفض نقطة في Profile</td><td>مقارنة بالمخططات</td><td>كل موقع</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>📐 2. متطلبات الفصل الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الشبكتان</th><th>الفصل الأفقي</th><th>الوضع الرأسي</th><th>المرجع</th></tr>
<tr><td>مياه الشرب / Foul Sewer</td><td>≥ 1.0m أفقياً</td><td>مياه الشرب فوق دائماً</td><td>KAHRAMAA</td></tr>
<tr><td>مياه الشرب / Treated Water</td><td>≥ 1.0m أفقياً</td><td>مياه الشرب فوق دائماً</td><td>KAHRAMAA</td></tr>
<tr><td>مياه الشرب / Storm Water</td><td>≥ 0.5m أفقياً</td><td>مياه الشرب يُفضَّل فوق</td><td>QCS S8</td></tr>
<tr><td>مياه الشرب / كهرباء HV</td><td>≥ 0.5m أفقياً</td><td>حسب KAHRAMAA</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>⛔ 3. ممارسات محظورة</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• لا توصيل مباشر بين مياه الشرب والمياه المعالجة بأي شكل<br>
• لا Backfill قبل اعتماد فحص الوصلات (HP-04)<br>
• لا Butt Fusion بدون اعتماد Fusion Parameters من المصنع<br>
• لا إنزال مواسير بمعدات ثقيلة مباشرة — استخدام Slings فقط<br>
• لا تخزين مواسير HDPE في الشمس > أسبوع بدون تغطية
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04</td><td>فحص الوصلات والمواسير + مسافات الفصل قبل الردم</td><td>QC + Consultant</td><td>Joint Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 KAHRAMAA | QCS 2024 Section 8 Part 1 | Pipe Laying
</div>
<h3>Pipe Laying Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Verification</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Laying Direction</td><td>Downhill to uphill (downgrade to upgrade)</td><td>Visual</td><td>Continuous</td><td>KAHRAMAA</td></tr>
<tr><td>Horizontal Alignment</td><td>± 25mm from design centreline</td><td>Total Station</td><td>Every 50m</td><td>KAHRAMAA</td></tr>
<tr><td>HDPE Butt Fusion</td><td>Uniform bead width + height around full circumference</td><td>Visual + bead measurement</td><td>Every joint</td><td>KAHRAMAA</td></tr>
<tr><td>Electrofusion Records</td><td>Barcode + Time + Temperature + Operator ID</td><td>Datalogger printout</td><td>Every joint</td><td>KAHRAMAA</td></tr>
<tr><td>Thrust Blocks</td><td>C20 concrete at every bend, tee, reducer</td><td>Visual + dimensions</td><td>Every location</td><td>KAHRAMAA</td></tr>
<tr><td>Air Valves</td><td>At every high point in profile</td><td>Compare to drawings</td><td>Every location</td><td>KAHRAMAA</td></tr>
</table></div>
<h3>Mandatory Separation Distances</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Networks</th><th>Horizontal Separation</th><th>Vertical Position</th><th>Reference</th></tr>
<tr><td>Water Supply / Foul Sewer</td><td>≥ 1.0m</td><td>Water always ABOVE sewer</td><td>KAHRAMAA</td></tr>
<tr><td>Water Supply / Treated Water</td><td>≥ 1.0m</td><td>Water always ABOVE treated</td><td>KAHRAMAA</td></tr>
<tr><td>Water Supply / Storm Water</td><td>≥ 0.5m</td><td>Water preferred above storm</td><td>QCS S8</td></tr>
</table></div>
<p><strong>HP-04:</strong> Joint inspection + separation distances check BEFORE backfill</p>
</div>
` },
ws_testing: { title: '🧪 مياه الشرب — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبار الضغط — شبكة المياه</span>
<button onclick="document.getElementById('vid-ws-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-testing" accept="video/*" style="display:none" data-player="vid-player-ws-testing" data-ph="vid-ph-ws-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ws-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 KAHRAMAA Standards | QCS 2024 Section 8 — Hydrostatic Pressure Test
</div>
<h3>📐 Hydrostatic Pressure Test — KAHRAMAA / QCS S8</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th><th>Min Frequency</th></tr><tr><td>ضغط الاختبار</td><td>1.5 × PN (Nominal Pressure) — الضغط التصميمي</td><td>KAHRAMAA / BS EN 805</td><td>كل section ≤ 500m</td></tr><tr><td>مدة الاختبار</td><td>2 ساعة كاملة</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>المعيار</td><td>Zero pressure drop طوال 2 ساعة</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>طريقة الاختبار</td><td>Slow Fill + Bleeding Air + Pressurize + Monitor</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>أقصى طول Section</td><td>500m لكل test section</td><td>KAHRAMAA</td><td>—</td></tr><tr><td>وقت Stabilization</td><td>30 دقيقة قبل بدء القياس الرسمي</td><td>BS EN 805</td><td>Per section</td></tr><tr><td>تسجيل البيانات</td><td>ضغط البداية + الضغط كل 30 min + النهاية</td><td>KAHRAMAA</td><td>Per section</td></tr></table></div>
<h3>📐 اختبارات جودة المياه — KAHRAMAA</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>المعيار</th><th>المرجع</th><th>التكرار</th></tr><tr><td>Coliform Bacteria</td><td>0 / 100mL</td><td>WHO / KAHRAMAA</td><td>Per section after chlorination</td></tr><tr><td>Turbidity</td><td>≤ 1 NTU</td><td>WHO / KAHRAMAA</td><td>Per section</td></tr><tr><td>pH</td><td>6.5 – 8.5</td><td>WHO / KAHRAMAA</td><td>Per section</td></tr><tr><td>Residual Chlorine</td><td>0.2 – 0.5 mg/L</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Chlorination Dosage</td><td>≥ 50 mg/L (ppm)</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Contact Time</td><td>≥ 24 hours</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Flushing before sampling</td><td>Clear water — turbidity check</td><td>KAHRAMAA</td><td>Before each sample</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>التوثيق</th></tr><tr><td>HP-01</td><td>تحقق من Backfill ≥ 300mm فوق الماسورة قبل الضغط</td><td>Pre-test Inspection Record</td></tr><tr><td>HP-02</td><td>Hydrostatic Test = Zero drop / 2hr</td><td>Pressure Test Certificate</td></tr><tr><td>HP-03</td><td>Chlorination ≥ 50ppm / ≥ 24hr مكتمل</td><td>Chlorination Log</td></tr><tr><td>HP-04</td><td>Water Quality: Coliform=0 + Turbidity≤1NTU</td><td>Lab Water Quality Certificate</td></tr></table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Pressure Testing — Water Supply</span>
<button onclick="document.getElementById('vid-ws-testing-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-testing-en" accept="video/*" style="display:none" data-player="vid-player-ws-testing-en" data-ph="vid-ph-ws-testing-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-testing-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-ws-testing-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Hydrostatic Pressure Test — KAHRAMAA</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Specification</th><th>Reference</th><th>Frequency</th></tr><tr><td>Test Pressure</td><td>1.5 × PN (Nominal Pressure)</td><td>KAHRAMAA / BS EN 805</td><td>Per section ≤500m</td></tr><tr><td>Test Duration</td><td>2 hours minimum</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Pass Criterion</td><td>Zero pressure drop in 2 hours</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Max Section Length</td><td>500m per test section</td><td>KAHRAMAA</td><td>—</td></tr><tr><td>Stabilization Time</td><td>30 min before formal recording</td><td>BS EN 805</td><td>Per section</td></tr></table></div><h3>Water Quality Tests</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Standard</th><th>Reference</th><th>Frequency</th></tr><tr><td>Coliform Bacteria</td><td>0/100mL</td><td>WHO/KAHRAMAA</td><td>Per section</td></tr><tr><td>Turbidity</td><td>≤ 1 NTU</td><td>WHO/KAHRAMAA</td><td>Per section</td></tr><tr><td>pH</td><td>6.5–8.5</td><td>WHO/KAHRAMAA</td><td>Per section</td></tr><tr><td>Residual Chlorine</td><td>0.2–0.5 mg/L</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Chlorination Dose</td><td>≥ 50 mg/L</td><td>KAHRAMAA</td><td>Per section</td></tr><tr><td>Contact Time</td><td>≥ 24 hours</td><td>KAHRAMAA</td><td>Per section</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>Condition</th><th>Documentation</th></tr><tr><td>HP-01</td><td>Backfill ≥ 300mm above pipe confirmed</td><td>Pre-test Inspection Record</td></tr><tr><td>HP-02</td><td>Hydrostatic Test: Zero pressure drop / 2hr</td><td>Pressure Test Certificate</td></tr><tr><td>HP-03</td><td>Chlorination ≥ 50ppm / ≥ 24hr complete</td><td>Chlorination Log</td></tr><tr><td>HP-04</td><td>Water Quality: Coliform=0 + Turbidity≤1NTU</td><td>Lab Water Quality Certificate</td></tr></table></div>
</div>
` },
ws_disinfection: { title: '💊 مياه الشرب — التعقيم والتشغيل', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تعقيم وتطهير شبكة المياه</span></div>
<button onclick="document.getElementById('vid-ws-disinfection').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-disinfection" accept="video/*" style="display:none" data-player="vid-player-ws-disinfection" data-ph="vid-ph-ws-disinfection" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-disinfection" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Chlorination ≥50ppm / ≥24hr، جودة المياه</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ws-disinfection" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 1 | Disinfection</div>
<h3>📐 إجراءات التعقيم</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>مادة التعقيم</td><td>Sodium Hypochlorite أو Chlorine Gas</td></tr><tr><td>تركيز الكلور</td><td>50 mg/L (ppm) كحد أدنى</td></tr><tr><td>مدة التلامس</td><td>24 hour كحد أدنى</td></tr><tr><td>Flushing بعد التعقيم</td><td>حتى Residual Chlorine ≤ 0.5 ppm</td></tr></table>
<h3>🧪 اختبارات جودة المياه — KAHRAMAA</h3>
<table class="dm-table"><tr><th>الاختبار</th><th>المعيار</th><th>الجهة</th></tr><tr><td>Total Coliform</td><td>صفر / 100ml</td><td>KAHRAMAA Lab</td></tr><tr><td>E. Coli</td><td>صفر / 100ml</td><td>KAHRAMAA Lab</td></tr><tr><td>Residual Chlorine</td><td>0.2 – 0.5 ppm</td><td>موقعياً</td></tr><tr><td>Turbidity</td><td>≤ 1 NTU</td><td>KAHRAMAA Lab</td></tr><tr><td>pH</td><td>6.5 – 8.5</td><td>موقعياً</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-06:</strong> اعتماد نتائج Water Quality من KAHRAMAA قبل التشغيل</p>
<h3>⚠️ تنبيه مهم</h3>
<p>لا تشغيل الشبكة قبل الحصول على موافقة KAHRAMAA الخطية!</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Water Network Chlorination</span></div>
<button onclick="document.getElementById('vid-ws-disinfection-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-disinfection-en" accept="video/*" style="display:none" data-player="vid-player-ws-disinfection-en" data-ph="vid-ph-ws-disinfection-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-disinfection-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Chlorination ≥50ppm / ≥24hr, water quality</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ws-disinfection-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 💊 مياه الشرب — التعقيم والتشغيل
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
ws_backfill: { title: '🏗️ مياه الشرب — الردم والتشطيب', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">الردم والدمك — مياه الشرب</span></div>
<button onclick="document.getElementById('vid-ws-backfill').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-backfill" accept="video/*" style="display:none" data-player="vid-player-ws-backfill" data-ph="vid-ph-ws-backfill" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-backfill" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Compaction ≥95% MDD طبقة 300mm</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ws-backfill" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 1 | Ashghal Reinstatement | KAHRAMAA Backfill Specs</div>

<h3>📐 1. جدول طبقات الردم الكامل — Water Supply</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>السماكة القصوى/طبقة</th><th>درجة الدمك</th><th>طريقة الاختبار</th><th>تكرار الاختبار</th><th>المرجع</th></tr>
<tr><td>0–300mm فوق الماسورة</td><td>رمل نظيف — يدوي فقط — لا آلات</td><td>—</td><td>≥ 90% MDD</td><td>Sand Cone ASTM D1556</td><td>كل 50m</td><td>KAHRAMAA / QCS S8</td></tr>
<tr><td>300–600mm</td><td>Selected Fill (PI ≤ 10 | ≤ 75mm) لا Sabkha</td><td>300mm / طبقة</td><td>≥ 93% MDD</td><td>Sand Cone / DCP</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>600mm – 1.5m من السطح</td><td>Selected Fill أو QCS S6 Material</td><td>200mm / طبقة</td><td>≥ 95% MDD</td><td>Sand Cone</td><td>كل 500m²</td><td>Ashghal / QCS S6</td></tr>
<tr><td>آخر 1.5m (تحت الطريق)</td><td>Subbase Class A + Base Course حسب الطريق</td><td>150mm / طبقة</td><td>≥ 98% MDD</td><td>Sand Cone</td><td>كل 250m²</td><td>Ashghal Reinst.</td></tr>
<tr><td>Marker Tape</td><td>أصفر — "WATER" — Polythene 300mm فوق الماسورة</td><td>—</td><td>—</td><td>100% بصري</td><td>كل Pipe Run</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>📐 2. جدول اختبارات الدمك</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Proctor (MDD + OMC)</td><td>قاعدة مرجعية لكل مصدر مادة</td><td>BS 1377 Part 4 / ASTM D698</td><td>كل مصدر + كل تغيير مادة</td><td>QCS S6</td></tr>
<tr><td>In-situ Density (Sand Replacement)</td><td>≥ 90–98% MDD حسب طبقة الردم</td><td>ASTM D1556 / BS 1377 Part 9</td><td>كل 50m للخندق / كل 500m² للمساحات</td><td>Ashghal</td></tr>
<tr><td>DCP (Dynamic Cone)</td><td>CBR ≥ 30% لـ Subbase | CBR ≥ 80% لـ Base</td><td>ASTM D6951</td><td>عند الشك أو بالقرب من Structures</td><td>Ashghal</td></tr>
<tr><td>Settlement Monitoring</td><td>لا هبوط مرئي بعد 7 أيام من الرصف</td><td>Level Survey</td><td>100% — كل القطاعات</td><td>Ashghal</td></tr>
<tr><td>Plate Bearing Test (CBR in-situ)</td><td>≥ مواصفة الطريق الأصلي</td><td>BS 1377 Part 9</td><td>طرق رئيسية + Ashghal طلب</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 3. إعادة تأهيل الطريق — Road Reinstatement</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الطبقة</th><th>المادة</th><th>السماكة</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>Saw Cut</td><td>قطع Diamond Saw — خط مستقيم نظيف</td><td>—</td><td>300mm خارج حافة الخندق كل جانب</td><td>Ashghal Reinst.</td></tr>
<tr><td>Subgrade Preparation</td><td>تسوية + دمك ≥ 95% MDD</td><td>حتى عمق الـ Subbase</td><td>—</td><td>Ashghal</td></tr>
<tr><td>Subbase (GSB)</td><td>Granular Sub-Base Class A — QCS S6</td><td>بنفس الطريق الأصلي — min 150mm</td><td>CBR ≥ 30% | ≥ 98% MDD</td><td>Ashghal S6</td></tr>
<tr><td>Base Course (DBM)</td><td>Dense Bitumen Macadam — QCS S7</td><td>بنفس الطريق الأصلي — min 50mm</td><td>Marshall Stability ≥ 8 kN</td><td>QCS S7</td></tr>
<tr><td>Wearing Course</td><td>Asphaltic Concrete QCS S7</td><td>بنفس الطريق الأصلي — min 40mm</td><td>IRI ≤ 2.5 m/km</td><td>Ashghal S7</td></tr>
<tr><td>Tack Coat</td><td>Bitumen Emulsion بين الطبقات</td><td>0.3–0.5 L/m²</td><td>—</td><td>QCS S7</td></tr>
<tr><td>Joint Sealing</td><td>Bituminous Sealant عند الـ Saw Cut</td><td>بعرض ≥ 10mm</td><td>مانع للتسرب</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 4. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ ردم بتربة Sabkha (SO₃ > 0.5%) أو تربة عضوية<br>
• ❌ ردم بحجارة > 75mm في منطقة الماسورة<br>
• ❌ استخدام آلات ثقيلة مباشرة فوق الماسورة (< 1.0m تغطية)<br>
• ❌ Marker Tape غير أصفر أو بدون كتابة "WATER"<br>
• ❌ إعادة رصف بدون Saw Cut نظيف — يُسبب تشقق الحواف<br>
• ❌ طبقة Wearing Course بدون Tack Coat<br>
• ❌ Compaction Test ناقص — ردم بدون نتائج مختبر
</div>

<h3>🔴 5. Hold Points — الردم والتشطيب</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07A</td><td>Compaction Test Pass (≥93% MDD) للطبقات 300–600mm</td><td>QC + Lab</td><td>Compaction Test Report</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07B</td><td>Subbase + Base Course Compaction ≥ 98% MDD</td><td>QC + Ashghal</td><td>Lab Results + ITR-07B</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07C</td><td>Saw Cut نظيف + Asphalt مطابق مواصفة الطريق الأصلي</td><td>Ashghal Inspector</td><td>Reinstatement ITR</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Backfill & Compaction — Water</span></div>
<button onclick="document.getElementById('vid-ws-backfill-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-backfill-en" accept="video/*" style="display:none" data-player="vid-player-ws-backfill-en" data-ph="vid-ph-ws-backfill-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-backfill-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Compaction ≥95% MDD per 300mm layer</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ws-backfill-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | Ashghal Reinstatement | Water Supply Backfill</div>
<h3>Backfill Layers</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Zone</th><th>Material</th><th>Max Layer</th><th>Compaction</th><th>Test Frequency</th></tr>
<tr><td>0–300mm above pipe</td><td>Clean sand — manual only</td><td>—</td><td>≥ 90% MDD</td><td>Every 50m</td></tr>
<tr><td>300–600mm</td><td>Selected fill (PI ≤10 | ≤75mm) — no Sabkha</td><td>300mm</td><td>≥ 93% MDD</td><td>Every 50m</td></tr>
<tr><td>600mm to 1.5m depth</td><td>Selected fill / QCS S6 material</td><td>200mm</td><td>≥ 95% MDD</td><td>Every 500m²</td></tr>
<tr><td>Top 1.5m (below road)</td><td>Subbase Class A + Base Course</td><td>150mm</td><td>≥ 98% MDD</td><td>Every 250m²</td></tr>
<tr><td>Marker Tape</td><td>Yellow — "WATER" — 300mm above pipe</td><td>—</td><td>100% visual</td><td>Every pipe run</td></tr>
</table></div>
<h3>Road Reinstatement</h3>
<p>• Saw Cut: Diamond saw — straight line — 300mm outside trench edge each side<br>
• Subbase GSB Class A: same depth as original — min 150mm — CBR ≥ 30% — ≥98% MDD<br>
• Base DBM: same as original — min 50mm — Marshall Stability ≥ 8kN<br>
• Wearing Course AC: same as original — min 40mm<br>
• Tack Coat between layers: 0.3–0.5 L/m²<br>
• Joint Seal at saw cut: bituminous sealant ≥ 10mm</p>
<p><strong>HP-07A:</strong> Compaction ≥93% MDD — 300–600mm zone<br>
<strong>HP-07B:</strong> Subbase + base ≥98% MDD confirmed<br>
<strong>HP-07C:</strong> Saw cut clean + asphalt matching original road spec</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Sabkha soil (SO₃ >0.5%) | Rocks >75mm near pipe | Heavy machinery on <1.0m cover | Non-yellow marker tape | Asphalt without tack coat | Missing compaction test results
</div>
</div>
` },
ws_handover: { title: '✅ مياه الشرب — التسليم', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تسليم شبكة مياه الشرب</span></div>
<button onclick="document.getElementById('vid-ws-handover').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ws-handover" accept="video/*" style="display:none" data-player="vid-player-ws-handover" data-ph="vid-ph-ws-handover" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-handover" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-Built، اختبارات نهائية، تشغيل</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ws-handover" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 1 | KAHRAMAA W.S.S. | Water Supply Handover</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى المطلوب</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + Profile مع مناسيب فعلية<br>GPS Coordinates لكل Valve + Fitting + Chamber<br>نقاط التوصيل + مواضع Tie-ins</td><td>3 ورقي + 1 رقمي DWG/PDF</td><td>KAHRAMAA</td></tr>
<tr><td>Pressure Test Certificates</td><td>كل sections — 1.5×PN / 2hr / Zero drop<br>تاريخ + اسم القائم بالاختبار + توقيع KAHRAMAA</td><td>أصلي + نسختان</td><td>KAHRAMAA</td></tr>
<tr><td>Chlorination & Flushing Records</td><td>≥ 50ppm لمدة ≥ 24hr<br>نتائج Residual Chlorine + Flush Volume</td><td>أصلي + نسخة</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Bacteriological Water Quality</td><td>Coliform = 0 / 100mL<br>E. Coli = 0 / 100mL — KAHRAMAA Lab معتمد</td><td>أصلي</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Chemical Water Quality</td><td>pH: 6.5–8.5 | Turbidity ≤ 1 NTU<br>Chlorine Residual: 0.2–0.5 mg/L عند أبعد نقطة</td><td>أصلي</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Material Certificates</td><td>Mill Certs للمواسير + Fittings + Valves<br>KAHRAMAA Approved List Confirmation</td><td>أصلي</td><td>Manufacturer</td></tr>
<tr><td>Valve Schedule</td><td>كل Valves: Type / Size / Location / GPS<br>Operating Turn Direction + Key Type</td><td>ورقي + رقمي</td><td>KAHRAMAA</td></tr>
<tr><td>Fusion Welding Records</td><td>كل HDPE Butt Fusion + Electrofusion<br>Barcode / Temperature / Time لكل وصلة</td><td>رقمي + ورقي</td><td>QC</td></tr>
<tr><td>ITP Signed Register</td><td>كل ITPs مغلقة — صفر NCR مفتوح</td><td>أصلي موقّع</td><td>QC + Consultant</td></tr>
<tr><td>O&M Manual</td><td>Operating procedures + Valve Key Schedule<br>Emergency Isolation Plan + Contact Numbers</td><td>نسختان</td><td>KAHRAMAA</td></tr>
<tr><td>GIS Data File</td><td>Shapefile أو DWG مع Attributes لكل Asset</td><td>رقمي</td><td>KAHRAMAA GIS</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم النهائي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>Pressure Test</td><td>100% Pass — كل Sections</td><td>QC + KAHRAMAA</td></tr>
<tr><td>Chlorination</td><td>≥ 50ppm / ≥ 24hr — كل الشبكة</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Bacteriological Test</td><td>Coliform = 0 | E.Coli = 0 / 100mL</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Chemical Quality</td><td>pH + Turbidity + Residual Cl₂ ضمن الحدود</td><td>KAHRAMAA Lab</td></tr>
<tr><td>Valve Operation</td><td>كل الـ Valves تُفتح وتُغلق — تعمل بسلاسة</td><td>QC + KAHRAMAA</td></tr>
<tr><td>Air Valve Function</td><td>كل ARVs تعمل — تُخرج الهواء عند التشغيل</td><td>QC</td></tr>
<tr><td>Marker Tape</td><td>أصفر — "WATER" — موجود 100%</td><td>QC</td></tr>
<tr><td>No Leaks (Visual)</td><td>فحص بصري شامل لكل الشبكة أثناء التشغيل</td><td>KAHRAMAA Inspector</td></tr>
<tr><td>Compaction Pass</td><td>100% نتائج ≥ 95% MDD</td><td>Lab + QC</td></tr>
<tr><td>Road Reinstated</td><td>Asphalt مكتمل — مستوي — مطابق الطريق الأصلي</td><td>Ashghal</td></tr>
<tr><td>GIS Data Submitted</td><td>Shapefile مُسلَّم ومعتمد</td><td>KAHRAMAA GIS</td></tr>
<tr><td>Zero Open NCRs</td><td>كل NCRs مغلقة بإجراءات تصحيحية موثقة</td><td>QC</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP — Defects Liability Period</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>مدة DLP</td><td>12 شهر من تاريخ التسليم الرسمي (TOC)</td></tr>
<tr><td>Bacteriological Monitoring</td><td>كل 3 أشهر — نتائج لـ KAHRAMAA</td></tr>
<tr><td>Pressure Monitoring</td><td>شهري — لوغر ضغط على نقاط حرجة</td></tr>
<tr><td>Valve Exercise</td><td>تشغيل كل الـ Valves كل 6 أشهر + توثيق</td></tr>
<tr><td>Leak Response</td><td>خلال 24hr من الإبلاغ — إصلاح + إشعار KAHRAMAA</td></tr>
<tr><td>Marker Tape Check</td><td>عند أي حفر قريب — تأكيد وجود الـ Tape</td></tr>
<tr><td>Road Settlement Check</td><td>كل 3 أشهر — إبلاغ Ashghal عند أي هبوط</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08A</td><td>Bacteriological Water Quality = Zero Coliform — KAHRAMAA Lab</td><td>KAHRAMAA Lab</td><td>Water Quality Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08B</td><td>As-Built + GIS Data مُسلَّمة ومعتمدة</td><td>KAHRAMAA GIS</td><td>Approved As-Built Set</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08C</td><td>موافقة KAHRAMAA الرسمية — TOC Certificate</td><td>KAHRAMAA</td><td>Taking Over Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Water Network Handover</span></div>
<button onclick="document.getElementById('vid-ws-handover-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ws-handover-en" accept="video/*" style="display:none" data-player="vid-player-ws-handover-en" data-ph="vid-ph-ws-handover-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ws-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-built, final tests, commissioning</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ws-handover-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 1 | KAHRAMAA W.S.S. | Water Supply Handover</div>
<h3>Handover Documents Required</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Document</th><th>Content</th><th>Copies</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + profile — actual levels — GPS per valve/fitting</td><td>3 hard + 1 digital</td></tr>
<tr><td>Pressure Test Certs</td><td>All sections — 1.5×PN / 2hr / zero drop — KAHRAMAA signed</td><td>Original + 2</td></tr>
<tr><td>Chlorination Records</td><td>≥50ppm / ≥24hr + residual chlorine results</td><td>Original + 1</td></tr>
<tr><td>Bacteriological Quality</td><td>Coliform = 0 | E.Coli = 0 / 100mL — KAHRAMAA Lab</td><td>Original</td></tr>
<tr><td>Chemical Quality</td><td>pH 6.5–8.5 | Turbidity ≤1 NTU | Cl₂ 0.2–0.5 mg/L</td><td>Original</td></tr>
<tr><td>Material Certs</td><td>Mill certs — pipes + fittings + valves — KAHRAMAA list</td><td>Original</td></tr>
<tr><td>Valve Schedule</td><td>All valves: type/size/GPS/operating turns/key type</td><td>Hard + digital</td></tr>
<tr><td>Fusion Welding Records</td><td>All HDPE joints — barcode / temp / time</td><td>Digital + hard</td></tr>
<tr><td>GIS Data File</td><td>Shapefile/DWG with full asset attributes</td><td>Digital</td></tr>
<tr><td>O&M Manual</td><td>Operating procedures + emergency isolation plan</td><td>2 copies</td></tr>
</table></div>
<h3>DLP — 12 Months from TOC</h3>
<p>• Bacteriological test every 3 months → KAHRAMAA<br>
• Monthly pressure monitoring at critical points<br>
• Valve exercise every 6 months (all valves)<br>
• Leak repair within 24hr of report<br>
• Road settlement check every 3 months</p>
<p><strong>HP-08A:</strong> Bacteriological certificate (Zero Coliform) from KAHRAMAA Lab<br>
<strong>HP-08B:</strong> As-Built + GIS Data submitted and approved<br>
<strong>HP-08C:</strong> KAHRAMAA TOC Certificate — formal acceptance</p>
</div>
` },
ss_survey: { title: '📐 Foul Sewer — الدراسة والتصميم', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 2 | Pre-Construction</div>
<h3>📋 متطلبات ما قبل التنفيذ</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr><tr><td>مخططات التصميم</td><td>معتمدة من Ashghal / MME</td></tr><tr><td>Hydraulic Design</td><td>تحليل التدفق والانحدارات</td></tr><tr><td>Invert Levels</td><td>مناسيب قيعان الغرف محددة</td></tr><tr><td>Existing Services</td><td>As-Built + NOC من كل الجهات</td></tr><tr><td>Method Statement</td><td>معتمد قبل البدء</td></tr></table>
<h3>⚠️ قواعد الفصل الإلزامية</h3>
<p>• Foul Sewer دائماً <strong>أسفل</strong> مياه الشرب رأسياً<br>• فصل ≥ 1.0m أفقياً عن مياه الشرب<br>• NOC إلزامي قبل أي حفر</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد المخططات والمناسيب قبل الحفر</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📐 Foul Sewer — الدراسة والتصميم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>متطلبات التصميم — Foul Sewer</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>المعايير التصميمية</td><td>Self-cleansing velocity ≥0.6 m/s<br>Max velocity ≤3.0 m/s<br>Min gradient: DN150→1:100, DN200→1:150<br>Manhole spacing ≤120m</td><td>QCS 2024 S8 / Ashghal</td></tr>
<tr><td>الدراسة الطبوغرافية</td><td>Total Station survey — Grid 25m<br>Benchmarks كل 200m</td><td>Ashghal Survey Manual</td></tr>
<tr><td>Utility Detection</td><td>GPR scan قبل الحفر — كشف المرافق القائمة</td><td>Ashghal NOC</td></tr>
<tr><td>Soil Investigation</td><td>Trial pits كل 100m أو BH حسب الأهمية<br>GWT level confirmation</td><td>QCS P3</td></tr>
<tr><td>Drawings</td><td>Plan + Long Section + Cross Section + Details<br>1:500 plan, 1:100 H / 1:10 V for sections</td><td>Ashghal CAD Standards</td></tr>
</tbody></table>
` },
ss_materials: { title: '🔩 Foul Sewer — المواد والمواسير', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">مواد الصرف الصحي</span></div>
<button onclick="document.getElementById('vid-ss-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-materials" accept="video/*" style="display:none" data-player="vid-player-ss-materials" data-ph="vid-ph-ss-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-materials" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">uPVC، GRP، Manholes، مواصفات QCS</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ss-materials" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 2 | Materials</div>
<h3>📐 مواصفات المواسير</h3>
<table class="dm-table"><tr><th>النوع</th><th>المواصفة</th><th>الاستخدام</th></tr><tr><td>uPVC</td><td>ISO 4435 | SN8</td><td>DN150-DN600</td></tr><tr><td>GRP</td><td>ISO 10467 | SN5000</td><td>DN600+</td></tr><tr><td>HDPE</td><td>ISO 4427 | SN8</td><td>خطوط الضخ فقط</td></tr></table>
<h3>📐 مواصفات Manholes</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>Concrete الغرفة</td><td>≥ C35 — مقاومة للكيماويات</td></tr><tr><td>Precast Rings</td><td>BS 5911 Part 200</td></tr><tr><td>Benching</td><td>ملاط 1:2 — ميل 1:12 نحو القناة</td></tr><tr><td>Cover للطرق D400</td><td>400 kN — BS EN 124</td></tr><tr><td>Cover للمشاة B125</td><td>125 kN — BS EN 124</td></tr><tr><td>Step Irons</td><td>HDPE Coated — كل 300mm</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-02:</strong> اعتماد كل المواد قبل التوريد</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Sewer Materials</span></div>
<button onclick="document.getElementById('vid-ss-materials-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-materials-en" accept="video/*" style="display:none" data-player="vid-player-ss-materials-en" data-ph="vid-ph-ss-materials-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-materials-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">uPVC, GRP pipes, manholes, QCS specs</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ss-materials-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🔩 Foul Sewer — المواد والمواسير
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
ss_excavation: { title: '⛏️ Foul Sewer — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 حفر الصرف الصحي</span>
<button onclick="document.getElementById('vid-ss-excavation').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-excavation" accept="video/*" style="display:none" data-player="vid-player-ss-excavation" data-ph="vid-ph-ss-excavation" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-excavation" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-excavation" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Sewer Trench Excavation</div>

<h3>📐 1. مواصفات الخندق — Trench Geometry</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة القياس</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>عمق الدفن</td><td>≥ 1.2m من السطح لأعلى الماسورة</td><td>قياس مباشر</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>عرض الخندق</td><td>OD + 600mm (300mm كل جانب)</td><td>شريط قياس</td><td>كل 50m</td><td>QCS S8</td></tr>
<tr><td>الانحدار (Gradient)</td><td>DN150: 1:100 min | DN225: 1:150 min | DN300+: 1:200 min</td><td>Laser Level</td><td>كل 3 مواسير</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>إلزامي لأعماق > 1.5m</td><td>Design Check</td><td>قبل الحفر</td><td>QCS S1</td></tr>
<tr><td>Dewatering</td><td>GWT ≤ 300mm أسفل الحفر</td><td>بصري + قياس</td><td>مستمر</td><td>QCS S8</td></tr>
<tr><td>Formation Level</td><td>± 10mm من المنسوب التصميمي</td><td>Laser + Staff</td><td>كل 10m</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. مواصفات Bedding — Sewer Pipes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>Bedding Class</th><th>المادة</th><th>السماكة</th><th>المواصفة</th></tr>
<tr><td>uPVC DN150–DN600</td><td>Class B</td><td>رمل نظيف ≤ 5mm</td><td>150mm أسفل + Haunch</td><td>BS EN 1610 / Ashghal</td></tr>
<tr><td>GRP DN600+</td><td>Class B أو S</td><td>Single-size aggregate 6-20mm</td><td>150mm + Haunch حتى المحور</td><td>ISO 10467</td></tr>
<tr><td>Concrete Pipes RCP</td><td>Class B</td><td>حجر مكسر 10-20mm</td><td>150mm أسفل + Haunch</td><td>BS 5911</td></tr>
</table></div>

<h3>⛔ 3. المواد المرفوضة للـ Bedding</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• تربة طبيعية من الحفر كـ Bedding — رفض<br>
• سبخة أو تربة منتفخة (Expansive soil) — رفض + تقرير فوري<br>
• حجر > 20mm في منطقة الـ Bedding — رفض<br>
• رمل طيني (PI > 6) — رفض<br>
• ردم بالمعدات الثقيلة على مسافة < 1.5m من الماسورة — ممنوع
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03</td><td>فحص الخندق: العمق + الانحدار + Bedding قبل وضع المواسير</td><td>QC + Consultant</td><td>Trench Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 2 | Ashghal | Sewer Trench Excavation
</div>
<h3>Trench Geometry — Foul Sewer</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Measurement</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Cover Depth</td><td>≥ 1.2m to top of pipe</td><td>Direct measurement</td><td>Every 50m</td><td>Ashghal</td></tr>
<tr><td>Trench Width</td><td>OD + 600mm</td><td>Tape</td><td>Every 50m</td><td>QCS S8</td></tr>
<tr><td>Gradient</td><td>DN150: 1:100 | DN225: 1:150 | DN300+: 1:200</td><td>Laser Level</td><td>Every 3 pipes</td><td>Ashghal</td></tr>
<tr><td>Formation Level</td><td>± 10mm design level</td><td>Laser + staff</td><td>Every 10m</td><td>Ashghal</td></tr>
</table></div>
<p><strong>HP-03:</strong> Trench inspection — depth + gradient + bedding BEFORE pipe laying</p>
</div>
` },
ss_laying: { title: '🔧 Foul Sewer — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مد مواسير الصرف الصحي</span>
<button onclick="document.getElementById('vid-ss-laying').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-laying" accept="video/*" style="display:none" data-player="vid-player-ss-laying" data-ph="vid-ph-ss-laying" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-laying" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-laying" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Pipe Laying & Jointing</div>

<h3>📐 1. متطلبات وضع المواسير</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>طريقة التحقق</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>اتجاه الوضع</td><td>من المصب للمنبع — Spigot يواجه اتجاه التدفق</td><td>بصري</td><td>كل ماسورة</td><td>BS EN 1610</td></tr>
<tr><td>الانحدار أثناء الوضع</td><td>فحص كل 3 مواسير بـ Laser Level</td><td>Laser Level</td><td>كل 3 مواسير</td><td>Ashghal</td></tr>
<tr><td>Rubber Ring Lubricant</td><td>فقط المواد المعتمدة من المصنع — لا زيوت محلية</td><td>بصري</td><td>كل وصلة</td><td>ISO 4435</td></tr>
<tr><td>Gap عند الوصلة</td><td>10mm minimum — يسمح للـ Thermal Movement</td><td>قياس</td><td>عينة</td><td>Ashghal</td></tr>
<tr><td>فحص بصري للوصلة</td><td>Rubber Ring في مكانه + Gap صحيح + لا انقلاب</td><td>بصري</td><td>كل وصلة</td><td>BS EN 1610</td></tr>
<tr><td>Marker Tape أخضر</td><td>300mm فوق الماسورة — "FOUL SEWER"</td><td>بصري</td><td>كل Pipe Run</td><td>Ashghal</td></tr>
<tr><td>انحناء uPVC</td><td>لا deflection > 3° per joint (السماح بالانحناء الطولي)</td><td>Laser Level</td><td>عند الانحناءات</td><td>ISO 4435</td></tr>
</table></div>

<h3>📐 2. متطلبات توصيل الخدمات (Lateral Connections)</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>زاوية التوصيل</td><td>45° في اتجاه التدفق — لا توصيل ضد التيار</td><td>Ashghal</td></tr>
<tr><td>نوع التوصيل</td><td>Factory-made Y-Junction أو T-Junction</td><td>BS EN 476</td></tr>
<tr><td>القطر الأدنى للـ Lateral</td><td>DN100 للمباني السكنية</td><td>Ashghal</td></tr>
<tr><td>Inspection Chamber</td><td>عند كل تغيير اتجاه أو نقطة توصيل</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 3. ممارسات محظورة — Sewer Laying</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• لا توصيل Storm Water بشبكة Foul Sewer — مخالفة قانونية<br>
• لا Backfill قبل فحص الوصلات (HP-04)<br>
• لا ردم بمعدات ثقيلة على < 1.5m من الماسورة<br>
• لا استخدام زيت محرك أو شحم عادي كـ Lubricant للـ Rubber Ring<br>
• لا قطع Rubber Ring لتسهيل التركيب — الاستبدال إلزامي
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04</td><td>فحص المواسير والوصلات والانحدار قبل الردم الجانبي</td><td>QC + Consultant</td><td>Pipe Laying Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 2 | Ashghal | Pipe Laying
</div>
<h3>Pipe Laying Requirements — Foul Sewer</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Specification</th><th>Verification</th><th>Frequency</th><th>Reference</th></tr>
<tr><td>Laying Direction</td><td>Downstream to upstream — spigot faces flow direction</td><td>Visual</td><td>Each pipe</td><td>BS EN 1610</td></tr>
<tr><td>Gradient Check</td><td>Every 3 pipes with laser level</td><td>Laser Level</td><td>Every 3 pipes</td><td>Ashghal</td></tr>
<tr><td>Rubber Ring Lubricant</td><td>Manufacturer-approved only — no engine oil</td><td>Visual</td><td>Every joint</td><td>ISO 4435</td></tr>
<tr><td>Joint Gap</td><td>10mm minimum for thermal movement</td><td>Measurement</td><td>Sample</td><td>Ashghal</td></tr>
<tr><td>Joint Visual Check</td><td>Ring seated + gap correct + no rollback</td><td>Visual</td><td>Every joint</td><td>BS EN 1610</td></tr>
<tr><td>Marker Tape</td><td>Green, 300mm above pipe — "FOUL SEWER"</td><td>Visual</td><td>Per pipe run</td><td>Ashghal</td></tr>
</table></div>
<p><strong>PROHIBITED:</strong> Connection of storm water to foul sewer — ILLEGAL. No backfill before HP-04 joint inspection.</p>
<p><strong>HP-04:</strong> Pipe + joint + gradient inspection BEFORE lateral backfill</p>
</div>
` },
ss_manholes: { title: '🕳️ Foul Sewer — بناء Manholes', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">بناء Manholes</span></div>
<button onclick="document.getElementById('vid-ss-manholes').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-manholes" accept="video/*" style="display:none" data-player="vid-player-ss-manholes" data-ph="vid-ph-ss-manholes" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-manholes" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">بناء الـ MH، Benching، تغطية الغطاء</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ss-manholes" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 2 | BS EN 1917 | Ashghal Standard Manholes</div>

<h3>📐 1. أنواع وأحجام Manholes — QCS 2024</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>القطر الداخلي</th><th>الاستخدام</th><th>أقصى عمق</th><th>المرجع</th></tr>
<tr><td>Type 1 — Standard</td><td>900mm ID</td><td>خطوط ≤DN300 | عمق ≤3m</td><td>3.0m</td><td>BS EN 1917</td></tr>
<tr><td>Type 2 — Standard</td><td>1200mm ID</td><td>خطوط DN300–600 | عمق ≤5m</td><td>5.0m</td><td>BS EN 1917</td></tr>
<tr><td>Type 3 — Large</td><td>1500mm ID</td><td>خطوط >DN600 | تقاطعات</td><td>6.0m</td><td>BS EN 1917 / QCS</td></tr>
<tr><td>Type 4 — Drop MH</td><td>≥1200mm ID</td><td>فرق منسوب >0.6m</td><td>حسب التصميم</td><td>Ashghal</td></tr>
<tr><td>Inspection Chamber</td><td>600mm ID</td><td>تفتيش فقط — ≤DN150</td><td>1.0m</td><td>BS EN 1917</td></tr>
</table></div>

<h3>📐 2. جدول مواصفات المواد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المادة / المواصفة</th><th>المعيار</th><th>الاختبار</th></tr>
<tr><td>Base Slab</td><td>بيتون C35 — سماكة 200mm — T16@200 مزدوج</td><td>QCS S8 P2</td><td>Cube Test كل صبة</td></tr>
<tr><td>Precast Rings</td><td>Precast Concrete BS EN 1917 — Grade C35</td><td>BS EN 1917</td><td>شهادة المصنع + Visual</td></tr>
<tr><td>Mortar Joints بين Rings</td><td>ملاط 1:2 (Cement:Sand) — سماكة 12mm</td><td>QCS S8</td><td>بصري — لا فجوات</td></tr>
<tr><td>Benching</td><td>ملاط 1:2 — أملس Steel Float Finish</td><td>QCS S8 P2</td><td>بصري — لا تشقق</td></tr>
<tr><td>Channel (قاع MH)</td><td>نفس قطر الماسورة — ملاط أملس — ميل 1:12</td><td>BS EN 1917</td><td>بصري + Level</td></tr>
<tr><td>Adjustment Rings</td><td>Precast ≤ 3 Rings — إجمالي ≤ 300mm</td><td>Ashghal</td><td>بصري</td></tr>
<tr><td>Cover Slab</td><td>C35 — 150mm — أو Precast Cone</td><td>QCS S8</td><td>بصري</td></tr>
<tr><td>Step Irons</td><td>HDPE-coated steel BS EN 13101 — كل 300mm</td><td>BS EN 13101</td><td>Load Test + بصري</td></tr>
<tr><td>External Waterproofing</td><td>Bitumen Paint 2 طبقات + Visqueen Membrane</td><td>QCS S8</td><td>بصري + سماكة 3mm min</td></tr>
<tr><td>Haunching</td><td>C20 Concrete حول أساس الـ Manhole</td><td>QCS S8</td><td>بصري</td></tr>
</table></div>

<h3>📐 3. Cover & Frame — فئات الأحمال</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Class</th><th>الحمل الأقصى</th><th>الموقع</th><th>المرجع</th></tr>
<tr><td>B125</td><td>125 kN</td><td>أرصفة + مشاة فقط</td><td>BS EN 124</td></tr>
<tr><td>C250</td><td>250 kN</td><td>مواقف السيارات</td><td>BS EN 124</td></tr>
<tr><td>D400</td><td>400 kN</td><td>طرق المرور العام — الأكثر شيوعاً في قطر</td><td>BS EN 124 / Ashghal</td></tr>
<tr><td>E600</td><td>600 kN</td><td>مناطق صناعية — طرق ثقيلة</td><td>BS EN 124</td></tr>
<tr><td>F900</td><td>900 kN</td><td>مطارات + موانئ + مناطق استثنائية</td><td>BS EN 124</td></tr>
</table></div>
<p style="font-size:11px;color:var(--text2);margin-top:4px;">⚡ الافتراضي في طرق الدوحة = D400 ما لم يُحدد غيره في الرسومات.</p>

<h3>📐 4. جدول الاختبارات — Manhole Testing</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>الإجراء</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Water Tightness Test</td><td>ملء بالمياه حتى top of highest pipe — 24 hour انتظار</td><td>انخفاض ≤ 1/10 قطر الـ MH (بالمتر)</td><td>كل Manhole</td><td>BS EN 1917 / QCS S8</td></tr>
<tr><td>Benching Smoothness</td><td>فحص بصري + Steel Rule</td><td>لا نقرات — سطح أملس متصل</td><td>كل Manhole</td><td>QCS S8</td></tr>
<tr><td>Cover Level Survey</td><td>Total Station أو Digital Level</td><td>± 5mm من مستوى الطريق</td><td>كل Manhole</td><td>Ashghal</td></tr>
<tr><td>Verticality</td><td>Plumb Bob أو Spirit Level</td><td>± 10mm من الرأسي</td><td>كل Manhole</td><td>QCS S8</td></tr>
<tr><td>Step Iron Load Test</td><td>Apply 1.5 kN load على كل Step</td><td>لا انفصال — لا حركة</td><td>عينة 10% min</td><td>BS EN 13101</td></tr>
<tr><td>Channel Gradient</td><td>Level Check</td><td>Invert يطابق مناسيب المواسير ± 5mm</td><td>كل Manhole</td><td>QCS S8</td></tr>
<tr><td>Joint Integrity (Rings)</td><td>بصري + Feeler Gauge</td><td>لا فجوات — لا تشقق — ملاط متصل</td><td>كل Manhole</td><td>BS EN 1917</td></tr>
<tr><td>Concrete Cube Test</td><td>3 cubes لكل صبة Base Slab</td><td>≥ 35 N/mm² @ 28 days</td><td>كل صبة</td><td>BS EN 12390</td></tr>
</table></div>

<h3>🔴 5. Hold Points — Manholes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05A</td><td>اعتماد Base Slab (Concrete Cube + Level) قبل الرفع</td><td>QC + Consultant</td><td>ITR-05A + Cube Results</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05B</td><td>Water Tightness Test Pass قبل الردم الجانبي</td><td>QC + Consultant</td><td>Water Tightness Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05C</td><td>Cover Level ± 5mm + Class صح قبل الأسفلت</td><td>QC + Surveyor</td><td>Level Survey Certificate</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable — مرفوض فوراً في الموقع</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Precast Rings بدون شهادة مصنع BS EN 1917<br>
• ❌ Benching بدون ميل أو أسطح خشنة تسبب ركود الصرف<br>
• ❌ Adjustment Rings أكثر من 3 Rings أو إجمالي > 300mm<br>
• ❌ Cover Class أقل من D400 في طرق المرور العام<br>
• ❌ Step Irons بالحديد العادي بدون HDPE Coating<br>
• ❌ تغطية Manhole بدون Bitumen Waterproofing<br>
• ❌ Cover Level أعلى من مستوى الطريق — خطر الدهس<br>
• ❌ Channel مقطوع أو غير متصل بمجرى التدفق الطبيعي
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Manhole Construction</span></div>
<button onclick="document.getElementById('vid-ss-manholes-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-manholes-en" accept="video/*" style="display:none" data-player="vid-player-ss-manholes-en" data-ph="vid-ph-ss-manholes-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-manholes-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Manhole building, benching, cover installation</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ss-manholes-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | BS EN 1917 | Manhole Construction</div>
<h3>Manhole Sizes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Type</th><th>Internal Dia.</th><th>Application</th><th>Max Depth</th></tr>
<tr><td>Type 1</td><td>900mm</td><td>Pipes ≤DN300 | depth ≤3m</td><td>3.0m</td></tr>
<tr><td>Type 2</td><td>1200mm</td><td>Pipes DN300–600 | depth ≤5m</td><td>5.0m</td></tr>
<tr><td>Type 3</td><td>1500mm</td><td>Pipes >DN600 | junctions</td><td>6.0m</td></tr>
<tr><td>Drop MH</td><td>≥1200mm</td><td>Level difference >0.6m</td><td>Design</td></tr>
</table></div>
<h3>Cover Classes — BS EN 124</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Class</th><th>Load</th><th>Location</th></tr>
<tr><td>B125</td><td>125 kN</td><td>Footpaths only</td></tr>
<tr><td>D400</td><td>400 kN</td><td>Public roads — default Qatar</td></tr>
<tr><td>E600</td><td>600 kN</td><td>Industrial / heavy roads</td></tr>
<tr><td>F900</td><td>900 kN</td><td>Airport / port zones</td></tr>
</table></div>
<h3>Testing Schedule</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Method</th><th>Pass Criterion</th><th>Frequency</th></tr>
<tr><td>Water Tightness</td><td>Fill to top pipe + 24hr wait</td><td>Drop ≤ 1/10 MH diameter (m)</td><td>Every MH</td></tr>
<tr><td>Cover Level</td><td>Total Station survey</td><td>± 5mm of road level</td><td>Every MH</td></tr>
<tr><td>Verticality</td><td>Plumb bob</td><td>± 10mm from vertical</td><td>Every MH</td></tr>
<tr><td>Cube Test (base slab)</td><td>3 cubes per pour</td><td>≥35 N/mm² @ 28 days</td><td>Every pour</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>HP-05A:</strong> Base Slab approval before ring erection<br>
<strong>HP-05B:</strong> Water Tightness Test pass before backfilling<br>
<strong>HP-05C:</strong> Cover level ± 5mm before final surfacing<br><br>
<strong>REJECT on site:</strong> Rings without BS EN 1917 cert | Cover class below D400 in roads | Bare steel step irons | Adjustment rings >3 or >300mm total
</div>
</div>
` },
ss_testing: { title: '🧪 Foul Sewer — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبارات الصرف الصحي — Air Test + CCTV</span>
<button onclick="document.getElementById('vid-ss-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-testing" accept="video/*" style="display:none" data-player="vid-player-ss-testing" data-ph="vid-ph-ss-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | BS EN 1610 | Air Test + CCTV Survey
</div>
<h3>📐 Air Test — الاختبار الهوائي — BS EN 1610</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th><th>Min Frequency</th></tr><tr><td>ضغط الاختبار</td><td>100 mm WG (Water Gauge)</td><td>BS EN 1610</td><td>كل section ≤ 500m</td></tr><tr><td>مدة الاختبار</td><td>5 دقائق</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>معيار القبول</td><td>انخفاض ≤ 25 mm WG في 5 دقائق</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>الانخفاض المسموح</td><td>25 mm WG</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>طريقة الاختبار</td><td>Inflate + Stabilize 5min + Record for 5min</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>أقصى طول section</td><td>500m لكل اختبار</td><td>Ashghal</td><td>—</td></tr><tr><td>تطبيق على Manholes</td><td>يُضاف اختبار تسرب مائي مستقل (Flood Test)</td><td>QCS S8</td><td>Per manhole</td></tr></table></div>
<h3>📐 CCTV Survey — المسح التلفزيوني</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>المرجع</th><th>التكرار</th></tr><tr><td>نسبة التغطية</td><td>100% من إجمالي الشبكة</td><td>Ashghal</td><td>After backfill + before handover</td></tr><tr><td>Grade المقبول</td><td>Grade 1 أو Grade 2 فقط</td><td>WRc Sewer Defect Codes</td><td>Per pipe</td></tr><tr><td>Grade 3</td><td>ملاحظات — يُقرر المهندس</td><td>WRc</td><td>Per finding</td></tr><tr><td>Grade 4 أو 5</td><td>رفض + إعادة تنفيذ إلزامية</td><td>WRc</td><td>Per finding</td></tr><tr><td>تقرير CCTV</td><td>Video Recording + Written Report + Grade Per Defect</td><td>Ashghal</td><td>Per section</td></tr><tr><td>التوقيت</td><td>بعد Backfill وقبل التسليم</td><td>Ashghal</td><td>100%</td></tr><tr><td>وضع الكاميرا</td><td>Self-propelled CCTV Robot من Manhole لـ Manhole</td><td>Ashghal</td><td>Per pipe run</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>التوثيق</th></tr><tr><td>HP-01</td><td>Air Test Pass: ≤25mm WG drop / 5min</td><td>Air Test Certificate per section</td></tr><tr><td>HP-02</td><td>CCTV 100% Grade ≤ 2 مكتمل</td><td>CCTV Report + Video Evidence</td></tr><tr><td>HP-03</td><td>Manhole Levels ± 5mm من مستوى الطريق</td><td>Survey Certificate</td></tr><tr><td>HP-04</td><td>As-Built GIS معتمد</td><td>As-Built Drawings + GIS Data</td></tr></table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 Sewer Testing — Air Test + CCTV</span>
<button onclick="document.getElementById('vid-ss-testing-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-testing-en" accept="video/*" style="display:none" data-player="vid-player-ss-testing-en" data-ph="vid-ph-ss-testing-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-testing-en" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 Upload MP4/MOV — persists for entire session</div>
<div id="vid-player-ss-testing-en" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<h3>Air Test — BS EN 1610</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Specification</th><th>Reference</th><th>Frequency</th></tr><tr><td>Test Pressure</td><td>100 mm WG (Water Gauge)</td><td>BS EN 1610</td><td>Per section ≤500m</td></tr><tr><td>Test Duration</td><td>5 minutes</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>Pass Criterion</td><td>Pressure drop ≤ 25mm WG in 5 minutes</td><td>BS EN 1610</td><td>Per section</td></tr><tr><td>Max Section Length</td><td>500m per test</td><td>Ashghal</td><td>—</td></tr></table></div><h3>CCTV Survey</h3><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Specification</th><th>Reference</th><th>Frequency</th></tr><tr><td>Coverage</td><td>100% of all pipes</td><td>Ashghal</td><td>After backfill</td></tr><tr><td>Acceptable Grade</td><td>Grade 1 or Grade 2 only</td><td>WRc</td><td>Per pipe</td></tr><tr><td>Grade 4 or 5</td><td>Reject + mandatory redo</td><td>WRc</td><td>Per finding</td></tr><tr><td>Report</td><td>Video + Written Report + Defect Code</td><td>Ashghal</td><td>Per section</td></tr><tr><td>Timing</td><td>After backfill, before handover</td><td>Ashghal</td><td>100%</td></tr></table></div><div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;"><tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>Condition</th><th>Documentation</th></tr><tr><td>HP-01</td><td>Air Test: ≤25mm WG drop / 5min</td><td>Air Test Certificate</td></tr><tr><td>HP-02</td><td>CCTV 100% Grade ≤ 2 complete</td><td>CCTV Report + Video</td></tr><tr><td>HP-03</td><td>Manhole Levels ±5mm</td><td>Survey Certificate</td></tr></table></div>
</div>
` },
ss_backfill: { title: '🏗️ Foul Sewer — الردم', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 الردم — Foul Sewer</span>
<button onclick="document.getElementById('vid-ss-backfill').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-backfill" accept="video/*" style="display:none" data-player="vid-player-ss-backfill" data-ph="vid-ph-ss-backfill" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-backfill" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-ss-backfill" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Trench Backfill</div>

<h3>📐 1. مواصفات الردم — جدول الطبقات الكامل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>درجة الدمك</th><th>سماكة الطبقة</th><th>طريقة الاختبار</th><th>تكرار</th><th>المرجع</th></tr>
<tr><td>0–300mm فوق الماسورة</td><td>رمل نظيف — يدوي فقط</td><td>≥ 90% MDD</td><td>—</td><td>Sand Cone / DCP</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>300–600mm</td><td>Selected Fill ≤ 75mm | PI ≤ 10</td><td>≥ 93% MDD</td><td>300mm max/layer</td><td>Sand Cone / DCP</td><td>كل 50m</td><td>Ashghal</td></tr>
<tr><td>600mm للسطح (تحت رصيف/طريق)</td><td>Selected Fill + QCS S6 Subbase</td><td>≥ 95–98% MDD</td><td>200mm max/layer</td><td>Sand Cone</td><td>كل 500m²</td><td>QCS S6</td></tr>
<tr><td>Marker Tape (أخضر)</td><td>Polythene — "FOUL SEWER" — أخضر</td><td>—</td><td>300mm فوق الماسورة</td><td>100% بصري</td><td>كل Pipe Run</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. جدول الاختبارات — Compaction Testing</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Moisture Density Relation (Proctor)</td><td>MDD + OMC من المختبر</td><td>BS 1377 Part 4</td><td>كل مصدر مادة</td><td>QCS S6</td></tr>
<tr><td>In-situ Density (Sand Cone)</td><td>≥ 90-98% MDD حسب الطبقة</td><td>ASTM D1556 / BS 1377</td><td>كل 500m² / 50m للخندق</td><td>Ashghal</td></tr>
<tr><td>DCP (Dynamic Cone)</td><td>CBR ≥ 8% للطبقة الأخيرة</td><td>ASTM D6951</td><td>عند الشك / قرب Structures</td><td>Ashghal</td></tr>
<tr><td>Surface Settlement Check</td><td>لا هبوط مرئي بعد 48hr</td><td>بصري + مستوى</td><td>100%</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 3. ممارسات محظورة</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ردم بمعدات ثقيلة مباشرة على الماسورة (< 1.5m) — ممنوع<br>
• استخدام تربة الحفر المرفوضة كـ Selected Fill — ممنوع<br>
• ردم بدون Marker Tape أخضر — NCR فوري<br>
• تجاوز السماكة المحددة للطبقة دون اختبار — ممنوع<br>
• ردم قبل إتمام Air Test و CCTV — لا يسمح
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07</td><td>Air Test Pass + CCTV مكتمل قبل الردم النهائي</td><td>QC + Consultant + Ashghal</td><td>Test Certificates</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08</td><td>Compaction Test ≥ 95% MDD قبل إعادة الطريق</td><td>QC + Consultant</td><td>Compaction Test Report</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 2 | Ashghal | Trench Backfill
</div>
<h3>Backfill Layers — Foul Sewer</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Zone</th><th>Material</th><th>Compaction</th><th>Layer Thickness</th><th>Test</th><th>Frequency</th></tr>
<tr><td>0–300mm above pipe</td><td>Clean sand — manual compaction only</td><td>≥ 90% MDD</td><td>—</td><td>Sand Cone</td><td>Every 50m</td></tr>
<tr><td>300–600mm</td><td>Selected Fill ≤ 75mm | PI ≤ 10</td><td>≥ 93% MDD</td><td>300mm max/layer</td><td>Sand Cone</td><td>Every 50m</td></tr>
<tr><td>600mm to surface</td><td>Selected Fill + road subbase</td><td>≥ 95–98% MDD</td><td>200mm max/layer</td><td>Sand Cone</td><td>Every 500m²</td></tr>
<tr><td>Marker Tape</td><td>Green — "FOUL SEWER"</td><td>—</td><td>300mm above pipe</td><td>Visual 100%</td><td>Per pipe run</td></tr>
</table></div>
<p><strong>HP-07:</strong> Air test pass + CCTV complete BEFORE final backfill<br>
<strong>HP-08:</strong> Compaction ≥ 95% MDD BEFORE road reinstatement</p>
</div>
` },
ss_handover: { title: '✅ Foul Sewer — التسليم', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تسليم شبكة الصرف الصحي</span></div>
<button onclick="document.getElementById('vid-ss-handover').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-ss-handover" accept="video/*" style="display:none" data-player="vid-player-ss-handover" data-ph="vid-ph-ss-handover" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-handover" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">CCTV Final، As-Built، تشغيل</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-ss-handover" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 2 | Ashghal | Foul Sewer Handover Requirements</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى المطلوب</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + Long Section مع المناسيب الفعلية<br>GPS Coordinates لكل Manhole + Pipe<br>نقاط التوصيل مع الشبكة القائمة</td><td>3 ورقي + 1 رقمي DWG/PDF</td><td>Ashghal / MME</td></tr>
<tr><td>CCTV Final Report</td><td>100% تغطية — Video + Written Report<br>WRc Defect Codes + Grade per defect<br>Grade ≤ 2 لكل المواسير</td><td>Digital (USB) + Hard Copy</td><td>Ashghal</td></tr>
<tr><td>Air Test Certificates</td><td>كل sections — 100mm WG / 5min / ≤25mm drop<br>تاريخ + الرقم التسلسلي للـ Section</td><td>أصلي + نسختان</td><td>QC / Ashghal</td></tr>
<tr><td>Manhole Schedule</td><td>جدول كل Manholes: Ref / Invert Level / Cover Level<br>Type / Depth / Cover Class / GPS</td><td>ورقي + رقمي</td><td>Ashghal</td></tr>
<tr><td>Material Certificates</td><td>Mill Certs للمواسير + Rings + Covers<br>BS EN 1917 للـ Rings | BS EN 124 للـ Covers</td><td>أصلي</td><td>Manufacturer</td></tr>
<tr><td>ITP Signed Register</td><td>كل ITPs مغلقة — صفر NCR مفتوح</td><td>أصلي موقّع</td><td>QC + Consultant</td></tr>
<tr><td>Compaction Test Results</td><td>كل نتائج الردم — يُظهر ≥95% MDD</td><td>أصلي + نسخة</td><td>Lab + QC</td></tr>
<tr><td>NCR Log (Closed)</td><td>كل NCRs موثقة ومغلقة بالإجراء التصحيحي</td><td>أصلي</td><td>QC</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم النهائي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>Air Test</td><td>100% Pass — كل Sections</td><td>QC</td></tr>
<tr><td>CCTV Final</td><td>100% Grade ≤ 2 — بعد آخر ردم</td><td>Ashghal Inspector</td></tr>
<tr><td>Manhole Cover Levels</td><td>± 5mm من مستوى الطريق</td><td>QC + Surveyor</td></tr>
<tr><td>All Manholes Accessible</td><td>كل الغطاءات تُفتح — Locking OK</td><td>QC</td></tr>
<tr><td>Marker Tape</td><td>أخضر — "FOUL SEWER" — موجود في كل الخندق</td><td>QC</td></tr>
<tr><td>Compaction Test</td><td>100% Pass ≥ 95% MDD للطبقات النهائية</td><td>Lab + QC</td></tr>
<tr><td>No Cross Connection</td><td>تأكيد بصري وـ CCTV — لا اتصال بـ Storm Water</td><td>QC + Ashghal</td></tr>
<tr><td>Road Reinstatement</td><td>Subbase + Base + Asphalt — بنفس مواصفة الطريق الأصلي</td><td>QC</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP — Defects Liability Period</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>مدة DLP</td><td>12 شهر من تاريخ التسليم الرسمي (TOC)</td></tr>
<tr><td>CCTV Re-inspection</td><td>عند نهاية الـ DLP — 100% — قبل الإغلاق النهائي</td></tr>
<tr><td>Settlement Check</td><td>كل 3 أشهر — فحص ميداني لهبوط الطريق</td></tr>
<tr><td>Blockage Response</td><td>خلال 24hr من الإبلاغ — High-pressure Jetting</td></tr>
<tr><td>Leak Repair</td><td>خلال 48hr من الاكتشاف</td></tr>
<tr><td>Manhole Cover Check</td><td>كل 6 أشهر — يُبلَّغ عن الأغطية المكسورة فوراً</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09A</td><td>CCTV Final Report 100% Grade ≤ 2 معتمد</td><td>Ashghal Inspector</td><td>CCTV Report + Video Evidence</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09B</td><td>As-Built Drawings مُسلَّمة ومعتمدة</td><td>Consultant + Ashghal</td><td>Approved As-Built Set</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09C</td><td>موافقة Ashghal / MME الرسمية — TOC Certificate</td><td>Ashghal / MME</td><td>Taking Over Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Sewer Network Handover</span></div>
<button onclick="document.getElementById('vid-ss-handover-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-ss-handover-en" accept="video/*" style="display:none" data-player="vid-player-ss-handover-en" data-ph="vid-ph-ss-handover-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-ss-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Final CCTV, as-built, commissioning</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-ss-handover-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 2 | Ashghal | Foul Sewer Handover</div>
<h3>Handover Documents</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Document</th><th>Content</th><th>Copies</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + long section, actual levels, GPS per MH</td><td>3 hard + 1 digital</td></tr>
<tr><td>CCTV Final Report</td><td>100% coverage + WRc grades — Grade ≤ 2 all pipes</td><td>Digital + hard</td></tr>
<tr><td>Air Test Certs</td><td>All sections — 100mmWG / 5min / ≤25mm drop</td><td>Original + 2</td></tr>
<tr><td>Manhole Schedule</td><td>All MH: Ref / invert / cover / depth / class / GPS</td><td>Hard + digital</td></tr>
<tr><td>Material Certs</td><td>Pipes + rings (BS EN 1917) + covers (BS EN 124)</td><td>Original</td></tr>
<tr><td>Compaction Results</td><td>All backfill ≥ 95% MDD confirmed</td><td>Original</td></tr>
<tr><td>Closed NCR Log</td><td>Zero open NCRs with corrective actions</td><td>Original</td></tr>
</table></div>
<h3>DLP — 12 Months from TOC</h3>
<p>• CCTV re-inspection at DLP end (100%)<br>
• Settlement check every 3 months<br>
• Blockage response within 24hr<br>
• Leak repair within 48hr<br>
• Manhole cover check every 6 months</p>
<p><strong>HP-09A:</strong> CCTV Final 100% Grade ≤ 2 approved by Ashghal<br>
<strong>HP-09B:</strong> As-Built submitted and approved<br>
<strong>HP-09C:</strong> Formal Ashghal/MME TOC Certificate</p>
</div>
` },
sw_survey: { title: '📐 الصرف السطحي — الدراسة والتصميم', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Pre-Construction</div>
<h3>📋 متطلبات ما قبل التنفيذ</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr><tr><td>مخططات التصميم</td><td>معتمدة من Ashghal / MME</td></tr><tr><td>Catchment Analysis</td><td>تحليل مساحة التصريف والتدفق</td></tr><tr><td>Outfall Location</td><td>موقع مخرج الشبكة معتمد</td></tr><tr><td>Gully Spacing</td><td>كل 25-40m حسب الانحدار</td></tr><tr><td>Existing Services</td><td>NOC من كل الجهات</td></tr></table>
<h3>⚠️ قواعد أساسية</h3>
<p>• عدم توصيل Foul Sewer بشبكة السطحي — <strong>مخالفة قانونية</strong><br>• Silt Trap إلزامي قبل مخرج الشبكة<br>• Outfall Protection من التآكل</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> اعتماد المخططات والـ Outfall قبل الحفر</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 📐 الصرف السطحي — الدراسة والتصميم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>متطلبات التصميم — Storm Water</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>المعايير التصميمية</td><td>Design Return Period: 5-year for local, 25-year for trunk<br>Time of Concentration calculation<br>Rational Method: Q = CIA/360<br>Min pipe DN300</td><td>QCS 2024 S8 / Ashghal</td></tr>
<tr><td>الدراسة الطبوغرافية</td><td>Total Station survey — Grid 25m<br>Benchmarks كل 200m</td><td>Ashghal Survey Manual</td></tr>
<tr><td>Utility Detection</td><td>GPR scan قبل الحفر — كشف المرافق القائمة</td><td>Ashghal NOC</td></tr>
<tr><td>Soil Investigation</td><td>Trial pits كل 100m أو BH حسب الأهمية<br>GWT level confirmation</td><td>QCS P3</td></tr>
<tr><td>Drawings</td><td>Plan + Long Section + Cross Section + Details<br>1:500 plan, 1:100 H / 1:10 V for sections</td><td>Ashghal CAD Standards</td></tr>
</tbody></table>
` },
sw_materials: { title: '🔩 الصرف السطحي — المواد والمواسير', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مواد الصرف السطحي</span>
<button onclick="document.getElementById('vid-sw-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-materials" accept="video/*" style="display:none" data-player="vid-player-sw-materials" data-ph="vid-ph-sw-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-materials" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-sw-materials" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Materials</div>

<h3>📐 1. أنواع مواسير الصرف السطحي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>المعيار</th><th>Stiffness Class</th><th>القطر</th><th>الاستخدام</th><th>اختبار المصنع</th></tr>
<tr><td>RCP — Reinforced Concrete Pipe</td><td>BS 5911 Part 100</td><td>120D / 150D</td><td>DN300 – DN1800</td><td>الخطوط الرئيسية</td><td>Crushing Load Test</td></tr>
<tr><td>HDPE Corrugated (SN8)</td><td>EN 13476 / ISO 21138</td><td>SN8 minimum</td><td>DN200 – DN1200</td><td>التوزيع + Cross-roads</td><td>Ring Stiffness Test</td></tr>
<tr><td>uPVC SN8</td><td>EN 13476 / ISO 21138</td><td>SN8</td><td>DN150 – DN600</td><td>التوزيع الثانوي</td><td>Ring Stiffness + Impact</td></tr>
<tr><td>GRP (Glass Reinforced Plastic)</td><td>ISO 10467</td><td>SN5000 min</td><td>DN600+</td><td>الخطوط الكبيرة</td><td>Stiffness + Hydrostatic</td></tr>
<tr><td>Box Culvert RC</td><td>BS 5911 Part 200</td><td>حسب التحميل</td><td>Bespoke</td><td>عبور الطرق</td><td>Crushing + Permeability</td></tr>
</table></div>

<h3>📐 2. مواد Gullies والمداخل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المادة</th><th>المواصفة</th><th>Load Class</th><th>الاختبار</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Gully Grating — طرق</td><td>Cast Iron / Ductile Iron</td><td>D400 (400 kN)</td><td>Load Test</td><td>كل دفعة</td><td>BS EN 124</td></tr>
<tr><td>Gully Grating — مشاة / رصيف</td><td>Cast Iron</td><td>B125 (125 kN)</td><td>Load Test</td><td>كل دفعة</td><td>BS EN 124</td></tr>
<tr><td>Gully Frame</td><td>Ductile Iron</td><td>D400</td><td>Visual + Dimensions</td><td>كل دفعة</td><td>BS EN 124</td></tr>
<tr><td>Silt Bucket</td><td>HDPE — مقاوم للكيماويات</td><td>—</td><td>Visual + Dimensions</td><td>كل unit</td><td>Ashghal Std.</td></tr>
<tr><td>Gully Body</td><td>Precast Concrete C30 أو uPVC</td><td>—</td><td>Strength Test</td><td>كل batch</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 3. مواصفات Manholes — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المواصفة</th><th>الاختبار</th><th>المرجع</th></tr>
<tr><td>Manhole Rings</td><td>Precast RC — BS 5911 Part 200</td><td>Crushing Load</td><td>BS 5911</td></tr>
<tr><td>Concrete Grade</td><td>≥ C35 — Sulphate-resistant</td><td>Cube Test @ 28 days</td><td>QCS S12</td></tr>
<tr><td>Manhole Cover — طرق رئيسية</td><td>D400 (400 kN) — Ductile Iron</td><td>Load Test</td><td>BS EN 124</td></tr>
<tr><td>Manhole Cover — طرق فرعية</td><td>C250 (250 kN)</td><td>Load Test</td><td>BS EN 124</td></tr>
<tr><td>Step Irons</td><td>HDPE Coated Steel كل 300mm</td><td>Visual + Dimensions</td><td>Ashghal</td></tr>
<tr><td>Joint Sealant</td><td>Hydrophilic Rubber Strip أو Bituminous</td><td>Visual 100%</td><td>Ashghal</td></tr>
</table></div>

<h3>⛔ 4. المواد المرفوضة فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• RCP بدون شهادة Crushing Load Test — رفض<br>
• HDPE أو uPVC بـ Ring Stiffness < SN8 — رفض<br>
• Gully Grating بدون D400 في الطرق — رفض فوري + NCR<br>
• Manhole Cover بدون Load Class صحيح — رفض<br>
• Silt Bucket مكسور أو مشوه — رفض<br>
• مواسير بدون علامات المصنع أو Class — رفض
</div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>اعتماد Material Submittal — كل مواد الصرف السطحي</td><td>Consultant + Ashghal</td><td>Approved MAR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>استلام + فحص المواد في الموقع</td><td>QC Engineer</td><td>Delivery Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Materials
</div>
<h3>Pipe Types — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Pipe Type</th><th>Standard</th><th>Class</th><th>Diameter</th><th>Use</th></tr>
<tr><td>RCP — Reinforced Concrete</td><td>BS 5911 Part 100</td><td>120D / 150D</td><td>DN300–DN1800</td><td>Main lines</td></tr>
<tr><td>HDPE Corrugated</td><td>EN 13476</td><td>SN8 minimum</td><td>DN200–DN1200</td><td>Distribution + crossings</td></tr>
<tr><td>uPVC</td><td>EN 13476</td><td>SN8</td><td>DN150–DN600</td><td>Secondary distribution</td></tr>
<tr><td>GRP</td><td>ISO 10467</td><td>SN5000+</td><td>DN600+</td><td>Large diameter mains</td></tr>
</table></div>
<h3>Gully Gratings — Load Class</h3>
<p>• Roads (vehicles): <strong>D400 (400 kN)</strong> — BS EN 124<br>
• Footpaths/kerbs: <strong>B125 (125 kN)</strong> — BS EN 124<br>
• Silt Bucket: HDPE, corrosion-resistant — Ashghal standard</p>
<p><strong>HP-01:</strong> Material submittal approval BEFORE supply<br><strong>HP-02:</strong> Delivery inspection + material check</p>
</div>
` },
sw_excavation: { title: '⛏️ الصرف السطحي — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">حفر الصرف السطحي</span></div>
<button onclick="document.getElementById('vid-sw-excavation').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-excavation" accept="video/*" style="display:none" data-player="vid-player-sw-excavation" data-ph="vid-ph-sw-excavation" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-excavation" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">حفر الخنادق وتحضير السطح</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-excavation" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Excavation</div>
<h3>📐 مواصفات الحفر</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>عمق الحفر</td><td>≥ 0.9m من السطح لأعلى الماسورة</td></tr><tr><td>الانحدار الأدنى</td><td>≥ 1:200 حسب التصميم</td></tr><tr><td>Dewatering</td><td>إزالة المياه قبل الـ Bedding</td></tr></table>
<h3>📐 مواصفات الـ Bedding</h3>
<table class="dm-table"><tr><th>البند</th><th>المعيار</th></tr><tr><td>RCP Bedding</td><td>رمل أو حجر مكسر 150mm — Class B</td></tr><tr><td>HDPE Bedding</td><td>رمل نظيف 150mm مدكوك</td></tr><tr><td>الانحدار الدقيق</td><td>Laser Level ± 5mm</td></tr></table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-03:</strong> فحص Bedding والانحدار قبل وضع المواسير</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Storm Drain Excavation</span></div>
<button onclick="document.getElementById('vid-sw-excavation-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-excavation-en" accept="video/*" style="display:none" data-player="vid-player-sw-excavation-en" data-ph="vid-ph-sw-excavation-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-excavation-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Trench excavation and surface preparation</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-excavation-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ⛏️ الصرف السطحي — الحفر والبيدنج
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
sw_laying: { title: '🔧 الصرف السطحي — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تمديد مواسير الصرف السطحي</span></div>
<button onclick="document.getElementById('vid-sw-laying').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-laying" accept="video/*" style="display:none" data-player="vid-player-sw-laying" data-ph="vid-ph-sw-laying" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-laying" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Box Culverts، مواسير صرف، انحدار صحيح</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-laying" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 3 | BS EN 1610 | Ashghal Storm Water</div>

<h3>📐 1. جدول الانحدارات الدنيا — Storm Water Pipes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>قطر الماسورة DN</th><th>أدنى انحدار (Self-Cleansing)</th><th>سرعة التدفق Min</th><th>المرجع</th></tr>
<tr><td>DN300</td><td>1:200 (0.5%)</td><td>0.75 m/s</td><td>Ashghal / CIRIA</td></tr>
<tr><td>DN450</td><td>1:300 (0.33%)</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>DN600</td><td>1:400 (0.25%)</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>DN900</td><td>1:600 (0.17%)</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>DN1200+</td><td>1:1000 (0.1%) — hydraulic design</td><td>0.75 m/s</td><td>Ashghal</td></tr>
<tr><td>أقصى سرعة (تآكل)</td><td colspan="2">≤ 3.0 m/s لجميع الأقطار</td><td>QCS S8 P3</td></tr>
</table></div>

<h3>📐 2. مواصفات Bedding Classes — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Class</th><th>المادة</th><th>السماكة تحت الماسورة</th><th>الحماية الجانبية</th><th>الاستخدام</th></tr>
<tr><td>Class B</td><td>رمل نظيف ناعم + حصى 10mm</td><td>150mm</td><td>حتى نصف القطر</td><td>RCP في تربة عادية</td></tr>
<tr><td>Class A</td><td>Granular + Concrete Cradle C15</td><td>100mm granular + 100mm concrete</td><td>كامل حتى Crown</td><td>تربة ضعيفة أو RCP كبير</td></tr>
<tr><td>Special</td><td>All-round Granular</td><td>150mm</td><td>150mm فوق Crown</td><td>HDPE / GRP</td></tr>
</table></div>

<h3>📐 3. متطلبات وضع مواسير RCP</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>اتجاه التمديد</td><td>من المصب (Outfall) للمنبع — Socket يواجه المنبع</td><td>QCS S8 P3</td></tr>
<tr><td>Rubber Ring Joint</td><td>Lubricate بالمواد المعتمدة فقط — Flush Joint</td><td>BS 5911</td></tr>
<tr><td>Joint Gap</td><td>≤ 10mm بين المواسير</td><td>BS 5911</td></tr>
<tr><td>Spigot Insertion</td><td>Full insertion حتى الـ Marking Line</td><td>BS 5911</td></tr>
<tr><td>Gradient Check</td><td>Laser Level بعد كل 3 مواسير</td><td>Ashghal</td></tr>
<tr><td>Max Section بين MH</td><td>120m للمواسير المستقيمة</td><td>Ashghal</td></tr>
<tr><td>Alignment Tolerance</td><td>± 25mm أفقي | ± 10mm رأسي</td><td>QCS S8 P3</td></tr>
</table></div>

<h3>📐 4. Box Culverts — متطلبات خاصة</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>Concrete Grade</td><td>C40 Precast / C35 In-Situ</td><td>QCS S8 / BS 5328</td></tr>
<tr><td>Bedding</td><td>Compacted granular 150mm — Level ± 5mm</td><td>QCS S8 P3</td></tr>
<tr><td>Joint Type</td><td>Cast-in Rubber Water-stop + Sealant</td><td>Ashghal</td></tr>
<tr><td>Max Joint Gap</td><td>20mm — مملوء بـ Sealant</td><td>Ashghal</td></tr>
<tr><td>Haunching</td><td>C15 Concrete جانبي إلى نصف الارتفاع</td><td>QCS S8</td></tr>
<tr><td>Wing Walls</td><td>C25 Concrete — حسب الرسومات</td><td>Design Drawings</td></tr>
<tr><td>Headwall Apron</td><td>C25 Concrete + Rip-Rap 300mm</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 5. حماية Outfalls — Anti-Scour</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الحماية</th><th>المواصفة</th><th>الحالة</th></tr>
<tr><td>Rip-Rap</td><td>حجارة ≥ 300mm — طبقة 600mm</td><td>مصارف في تربة / رمال</td></tr>
<tr><td>Concrete Apron</td><td>C25 — سماكة 200mm — بعرض 1.5× قطر الخط</td><td>مصارف كبيرة</td></tr>
<tr><td>Silt Trap</td><td>إلزامي قبل كل Outfall — حجم 0.5m³ minimum</td><td>جميع الـ Outfalls</td></tr>
<tr><td>Marker Sign</td><td>لافتة خضراء "STORM WATER" عند كل فتحة خروج</td><td>إلزامي</td></tr>
</table></div>

<h3>🔴 6. Hold Points — Pipe Laying</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04A</td><td>Gradient Survey Pass بعد تمديد كل Section</td><td>QC + Surveyor</td><td>Level Survey Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04B</td><td>Rubber Ring Joints مكتملة — فحص بصري 100%</td><td>QC</td><td>Joint Inspection Sheet</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04C</td><td>Outfall Apron / Rip-Rap اكتمل قبل التسليم</td><td>QC + Consultant</td><td>ITR-04C</td></tr>
</table></div>

<h3>⛔ 7. مرفوض فوراً في الموقع</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ وضع المواسير من المنبع للمصب (الاتجاه الخاطئ)<br>
• ❌ Rubber Ring غائبة أو خارجة عن وضعها<br>
• ❌ Gradient أقل من الحد الأدنى بدون موافقة Ashghal<br>
• ❌ Box Culvert بدون Rubber Water-stop في الوصلات<br>
• ❌ Outfall بدون Silt Trap أو Rip-Rap / Apron<br>
• ❌ Cross Connection مع شبكة Foul Sewer — إيقاف فوري + NCR
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Storm Drain Pipe Laying</span></div>
<button onclick="document.getElementById('vid-sw-laying-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-laying-en" accept="video/*" style="display:none" data-player="vid-player-sw-laying-en" data-ph="vid-ph-sw-laying-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-laying-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Box culverts, storm pipes, correct gradient</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-laying-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | Ashghal Storm Water Pipe Laying</div>
<h3>Minimum Gradients</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Pipe Size</th><th>Min Gradient</th><th>Min Velocity</th></tr>
<tr><td>DN300</td><td>1:200 (0.5%)</td><td>0.75 m/s</td></tr>
<tr><td>DN450</td><td>1:300 (0.33%)</td><td>0.75 m/s</td></tr>
<tr><td>DN600</td><td>1:400 (0.25%)</td><td>0.75 m/s</td></tr>
<tr><td>DN900</td><td>1:600 (0.17%)</td><td>0.75 m/s</td></tr>
<tr><td>Max velocity</td><td colspan="2">≤ 3.0 m/s (all sizes)</td></tr>
</table></div>
<h3>RCP Installation Key Requirements</h3>
<p>• Lay upstream to downstream — Socket facing upstream<br>• Rubber Ring: lubricate with approved compound, full insertion to marking line<br>• Joint gap ≤ 10mm | Alignment: ±25mm H / ±10mm V<br>• Check gradient with laser level every 3 pipes<br>• Max section between manholes: 120m</p>
<h3>Outfall Protection</h3>
<p>• Rip-Rap: stones ≥300mm / 600mm thick layer for earthen channels<br>• Concrete Apron: C25 / 200mm thick / width = 1.5× pipe diameter<br>• Silt Trap: mandatory before every outfall (min 0.5m³ capacity)</p>
<p><strong>HP-04A:</strong> Gradient survey pass after each section<br>
<strong>HP-04B:</strong> 100% visual rubber ring inspection before side backfill<br>
<strong>HP-04C:</strong> Outfall protection complete before handover</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Pipe laid in wrong direction | Missing rubber ring | Gradient below minimum without Ashghal approval | Outfall without silt trap | Any cross-connection to foul sewer
</div>
</div>
` },
sw_gullies: { title: '🕳️ الصرف السطحي — Gullies & Manholes', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تركيب Gullies وInlets</span></div>
<button onclick="document.getElementById('vid-sw-gullies').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-gullies" accept="video/*" style="display:none" data-player="vid-player-sw-gullies" data-ph="vid-ph-sw-gullies" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-gullies" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">تركيب الـ Gully، المنسوب الصحيح</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-gullies" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 Part 3 | BS EN 124 | Ashghal Drainage Standards</div>

<h3>📐 1. أنواع Gullies — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>الوصف</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>Road Gully (Trapped)</td><td>مزود بـ Water Seal + Silt Bucket</td><td>طرق المرور — الأكثر شيوعاً</td><td>BS EN 124 / Ashghal</td></tr>
<tr><td>Road Gully (Untrapped)</td><td>بدون Water Seal</td><td>محظور في قطر للطرق العامة</td><td>Ashghal Policy</td></tr>
<tr><td>Kerb Inlet / Side Entry</td><td>مدخل جانبي في الرصيف</td><td>طرق سريعة + مناطق مرتفعة السرعة</td><td>Ashghal</td></tr>
<tr><td>Combined Gully</td><td>مدخل أمامي + جانبي</td><td>منخفضات التصريف</td><td>Ashghal</td></tr>
<tr><td>Sump (Low Point)</td><td>بئر جمع بدون تصريف ثقلي</td><td>نقاط منخفضة مع Pump</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. مواصفات Gully Pot — المواد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المادة</th><th>المعيار</th></tr>
<tr><td>Gully Body</td><td>Precast Concrete C35 أو HDPE Class SN8</td><td>BS 5834 / BS EN 124</td></tr>
<tr><td>Silt Bucket</td><td>Galvanized Steel أو HDPE — سعة ≥ 20 litre</td><td>Ashghal</td></tr>
<tr><td>Outlet Connection</td><td>DN150 أو DN225 — Flexible Joint</td><td>QCS S8 P3</td></tr>
<tr><td>Frame</td><td>Cast Iron BS EN 124 Grade EN-GJL-250</td><td>BS EN 124</td></tr>
<tr><td>Grating</td><td>Ductile Iron Class D400 (طرق) / C250 (أرصفة)</td><td>BS EN 124</td></tr>
<tr><td>Locking Bar</td><td>إلزامي لمنع السرقة — Stainless Steel</td><td>Ashghal Std.</td></tr>
<tr><td>Concrete Surround</td><td>C20 Haunching — 150mm كل جانب</td><td>QCS S8</td></tr>
</table></div>

<h3>📐 3. تباعد Gullies — Spacing Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الطريق / الموقع</th><th>الحد الأقصى للتباعد</th><th>ملاحظة</th></tr>
<tr><td>طريق عادي — نزول 0.5%</td><td>50m</td><td>قياسي Ashghal</td></tr>
<tr><td>طريق سريع — نزول >1%</td><td>70m</td><td>حسب التصريف المحسوب</td></tr>
<tr><td>نقطة منخفضة (Sag)</td><td>إلزامي Gully × 2 متقابلين</td><td>لمنع الفيضان</td></tr>
<tr><td>عند Kerb Return (منعطف)</td><td>Gully إلزامي عند كل منعطف</td><td>Ashghal</td></tr>
<tr><td>Crossfall < 2%</td><td>يُقلل المسافة بنسبة 20%</td><td>حسب Catchment Area</td></tr>
</table></div>

<h3>📐 4. جدول الاختبارات — Gullies & Manholes</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>الإجراء</th><th>معيار القبول</th><th>التكرار</th><th>المرجع</th></tr>
<tr><td>Gully Level</td><td>Level Staff من Grating لمستوى الطريق</td><td>5–15mm أسفل مستوى الرصف (لا طوفان)</td><td>كل Gully</td><td>Ashghal</td></tr>
<tr><td>Grating Seating</td><td>بصري — تحرك الـ Grating</td><td>بدون حركة — مستوي — محكم الإغلاق</td><td>كل Gully</td><td>BS EN 124</td></tr>
<tr><td>Outlet Connection</td><td>بصري + CCTV</td><td>اتصال كامل — لا انكسار في الوصلة</td><td>كل Gully</td><td>QCS S8</td></tr>
<tr><td>Silt Bucket</td><td>بصري</td><td>في مكانه — نظيف — قبل التسليم</td><td>كل Gully</td><td>Ashghal</td></tr>
<tr><td>Manhole Water Tightness</td><td>ملء بالمياه 24hr</td><td>انخفاض ≤ 1/10 قطر الـ MH (م)</td><td>كل Manhole</td><td>BS EN 1917</td></tr>
<tr><td>Manhole Cover Level</td><td>Total Station / Level</td><td>± 5mm من تصميم المنسوب</td><td>كل Manhole</td><td>Ashghal</td></tr>
<tr><td>Locking Bar Test</td><td>محاولة رفع الـ Grating بدون مفتاح</td><td>لا يُفتح بدون أداة خاصة</td><td>عينة 10%</td><td>Ashghal</td></tr>
</table></div>

<h3>🔴 5. Hold Points — Gullies</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05A</td><td>Gully Level (5–15mm أسفل الرصف) مُوثّق قبل الصب النهائي</td><td>QC + Surveyor</td><td>Level Survey Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05B</td><td>Outlet Connection CCTV Pass قبل الردم</td><td>QC</td><td>CCTV Record</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Gully Untrapped في الطرق العامة<br>
• ❌ Grating Class أقل من D400 في طرق المرور<br>
• ❌ Gully أعلى من مستوى الطريق — يسبب تمزق الإطارات<br>
• ❌ Gully بدون Silt Bucket<br>
• ❌ Outlet Connection مكسور أو غير متصل<br>
• ❌ بدون Locking Bar في الطرق العامة<br>
• ❌ Manhole بدون Water Tightness Test
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Gully & Inlet Installation</span></div>
<button onclick="document.getElementById('vid-sw-gullies-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-gullies-en" accept="video/*" style="display:none" data-player="vid-player-sw-gullies-en" data-ph="vid-ph-sw-gullies-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-gullies-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Gully installation, correct level setting</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-gullies-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | BS EN 124 | Gullies & Manholes</div>
<h3>Gully Types & Spacing</h3>
<p>• Trapped Road Gully (with water seal + silt bucket): standard Qatar roads<br>• Untrapped Gully: PROHIBITED on public roads in Qatar<br>• Kerb Inlet: used on high-speed roads<br>• Max spacing: 50m (standard), 70m (gradient >1%), mandatory at every sag point × 2</p>
<h3>Testing Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Method</th><th>Pass Criterion</th><th>Frequency</th></tr>
<tr><td>Gully Level</td><td>Level staff</td><td>5–15mm below road surface</td><td>Every gully</td></tr>
<tr><td>Grating Seating</td><td>Visual</td><td>No movement, flush, locked</td><td>Every gully</td></tr>
<tr><td>Outlet Connection</td><td>CCTV visual</td><td>Full connection, no fracture</td><td>Every gully</td></tr>
<tr><td>MH Water Tightness</td><td>Fill + 24hr</td><td>Drop ≤ 1/10 MH diameter (m)</td><td>Every MH</td></tr>
<tr><td>MH Cover Level</td><td>Total Station</td><td>± 5mm design level</td><td>Every MH</td></tr>
</table></div>
<p><strong>HP-05A:</strong> Gully level (5–15mm below surface) before final pour<br>
<strong>HP-05B:</strong> Outlet CCTV pass before backfill</p>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Untrapped gully on public roads | Grating below D400 | Gully above road level | No silt bucket | Broken outlet connection | No locking bar
</div>
</div>
` },
sw_testing: { title: '🧪 الصرف السطحي — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبارات الصرف السطحي</span>
<button onclick="document.getElementById('vid-sw-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-testing" accept="video/*" style="display:none" data-player="vid-player-sw-testing" data-ph="vid-ph-sw-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-sw-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Testing</div>

<h3>📐 1. جدول الاختبارات الكامل — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>CCTV Survey</td><td>100% Grade ≤ 2 | لا انهيارات</td><td>Self-propelled CCTV Robot</td><td>100% كل المواسير</td><td>BS EN 13508 / Ashghal</td></tr>
<tr><td>Hydraulic Test (Flooding)</td><td>تصريف كامل — لا مياه راكدة > 24hr</td><td>Flood Test + Visual Survey</td><td>عند كل Section</td><td>Ashghal</td></tr>
<tr><td>Manhole Level Survey</td><td>± 5mm من مستوى التصميم</td><td>Digital Level / Total Station</td><td>كل Manhole / Gully</td><td>Ashghal</td></tr>
<tr><td>Gully Level</td><td>5–15mm أسفل الرصيف (لا طوفان)</td><td>Level Staff</td><td>كل Gully</td><td>Ashghal</td></tr>
<tr><td>Gradient Check (final)</td><td>≥ 1:200 (لمواسير الصرف السطحي)</td><td>Laser Level / As-Built Survey</td><td>كل Section</td><td>Ashghal</td></tr>
<tr><td>Outfall Inspection</td><td>Rip-Rap أو Apron سليم | لا تآكل</td><td>بصري</td><td>كل Outfall</td><td>Ashghal</td></tr>
<tr><td>Silt Trap Check</td><td>نظيف + في مكانه</td><td>بصري</td><td>كل Silt Trap</td><td>Ashghal</td></tr>
<tr><td>RCP Joint Integrity</td><td>لا تسرب مرئي — فحص داخلي بـ CCTV</td><td>CCTV + Visual</td><td>100%</td><td>BS EN 13508</td></tr>
</table></div>

<h3>📐 2. CCTV Survey — Storm Water تفاصيل</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>التوقيت</td><td>بعد Backfill وقبل Handover — 100%</td><td>Ashghal</td></tr>
<tr><td>Grade المقبول</td><td>Grade 1 أو 2 فقط</td><td>WRc / BS EN 13508</td></tr>
<tr><td>Grade 4–5</td><td>رفض + إعادة تنفيذ + CCTV مجدداً</td><td>WRc</td></tr>
<tr><td>التقرير</td><td>Video + Written Report + Defect Code + Grade per defect</td><td>Ashghal</td></tr>
<tr><td>تنظيف قبل CCTV</td><td>High-pressure jetting إلزامي قبل CCTV</td><td>Ashghal</td></tr>
</table></div>

<h3>⚠️ 3. تحذير خطير</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
<strong style="color:#e74c3c;">لا يسمح بأي توصيل بين Foul Sewer وStorm Water تحت أي ظرف.</strong><br>
الفحص يشمل التحقق بصرياً من عدم وجود Cross Connections خلال CCTV Survey.<br>
أي Cross Connection = NCR فوري + إشعار Ashghal + إزالة إلزامية.
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-06</td><td>CCTV 100% Grade ≤ 2 قبل الردم النهائي</td><td>QC + Ashghal</td><td>CCTV Report + Video</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07</td><td>Manhole + Gully Levels ± 5mm مكتملة</td><td>QC + Surveyor</td><td>Level Survey Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 Part 3 | Ashghal | Storm Water Testing
</div>
<h3>Testing Schedule — Storm Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Acceptance Standard</th><th>Method</th><th>Min Frequency</th><th>Reference</th></tr>
<tr><td>CCTV Survey</td><td>100% Grade ≤ 2 | no collapses</td><td>Self-propelled CCTV Robot</td><td>100% all pipes</td><td>BS EN 13508</td></tr>
<tr><td>Hydraulic Test</td><td>Full drainage — no standing water > 24hr</td><td>Flood test + visual</td><td>Per section</td><td>Ashghal</td></tr>
<tr><td>Manhole Level Survey</td><td>± 5mm design level</td><td>Digital level</td><td>Every manhole/gully</td><td>Ashghal</td></tr>
<tr><td>Gully Level</td><td>5–15mm below kerb (no ponding)</td><td>Level staff</td><td>Every gully</td><td>Ashghal</td></tr>
<tr><td>Gradient (final)</td><td>≥ 1:200 confirmed</td><td>Laser / as-built survey</td><td>Per section</td><td>Ashghal</td></tr>
<tr><td>Silt Trap Check</td><td>Clean + in place</td><td>Visual</td><td>Every silt trap</td><td>Ashghal</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">CRITICAL:</strong> NO cross-connection between foul sewer and storm water under any circumstances. Any cross connection = immediate NCR + Ashghal notification.
</div>
<p style="margin-top:10px;"><strong>HP-06:</strong> CCTV 100% Grade ≤ 2 BEFORE final backfill<br>
<strong>HP-07:</strong> Manhole + gully levels ± 5mm confirmed</p>
</div>
` },
sw_backfill: { title: '🏗️ الصرف السطحي — الردم', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Backfill</div>
<h3>📐 مواصفات الردم</h3>
<table class="dm-table"><tr><th>المنطقة</th><th>المادة</th><th>الCompaction</th></tr><tr><td>0-300mm فوق الماسورة</td><td>رمل نظيف</td><td>يدوي ≥ 90% MDD</td></tr><tr><td>300mm للسطح</td><td>حسب نوع الطريق</td><td>≥ 95-98% MDD</td></tr></table>
<h3>⚠️ تنبيهات</h3>
<p>• Compaction Test قبل إعادة الطريق<br>• Gully Gratings بالLevel الصح مع الأسفلت<br>• Saw Cut نظيف عند حواف الحفر</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-08:</strong> اعتماد Compaction قبل إعادة الطريق</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | 🏗️ الصرف السطحي — الردم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>

<h3>مواصفات الردم — QCS 2024</h3>
<table class="dm-table"><thead><tr><th>المرحلة</th><th>المادة</th><th>السماكة</th><th>الدمك</th><th>HP/W</th></tr></thead><tbody>
<tr><td>Initial Backfill</td><td>Selected granular (no Sabkha)</td><td>150mm above pipe crown</td><td>≥85% MDD — حذر حول الماسورة</td><td style="color:#f39c12">W</td></tr>
<tr><td>Main Backfill</td><td>Selected or site material</td><td>طبقات ≤200mm</td><td>≥90% MDD</td><td style="color:#f39c12">W</td></tr>
<tr><td>Final Backfill</td><td>As main or road layers</td><td>آخر 300mm</td><td>≥95% MDD</td><td style="color:#e74c3c">HP</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;color:#e74c3c">
⚠️ <strong>ممنوعات الردم:</strong> مواد Sabkha (SO₃ >0.5%) | مواد عضوية | حجارة >75mm | تربة طينية رطبة | مخلفات بناء
</div>
` },
sw_handover: { title: '✅ الصرف السطحي — التسليم', content: `
<div class="lang-content-ar">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">تسليم الصرف السطحي</span></div>
<button onclick="document.getElementById('vid-sw-handover').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-sw-handover" accept="video/*" style="display:none" data-player="vid-player-sw-handover" data-ph="vid-ph-sw-handover" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-handover" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-Built، فحص مناهل، CCTV Final</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">اضغط "رفع فيديو" لتحميل MP4 / MOV</div></div>
<div id="vid-player-sw-handover" class="qs-vid-ph" data-maxh="260px"></div>
</div>


<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Handover</div>
<h3>📋 وثائق التسليم</h3>
<table class="dm-table"><tr><th>الوثيقة</th><th>المحتوى</th></tr><tr><td>As-Built Drawings</td><td>مخططات منفذة بالمناسيب الفعلية</td></tr><tr><td>Hydraulic Test Records</td><td>كل نتائج الاختبار</td></tr><tr><td>CCTV Report</td><td>Video + تقرير كامل</td></tr><tr><td>Gully Schedule</td><td>جدول كل Gullies بالمواضع والمناسيب</td></tr><tr><td>ITR Register</td><td>كل طلبات التفتيش</td></tr></table>
<h3>🛡️ فترة الضمان DLP</h3>
<p>• المدة: <strong>12 شهر</strong><br>• تنظيف Silt Buckets كل 3 أشهر<br>• CCTV Re-inspection عند نهاية DLP</p>
<h3>🔴 Hold Points النهائية</h3>
<p>• <strong>HP-09:</strong> موافقة Ashghal على التسليم النهائي</p>

</div>
<div class="lang-content-en" style="display:none;">
<div style="margin:14px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Storm Water Handover</span></div>
<button onclick="document.getElementById('vid-sw-handover-en').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<input type="file" id="vid-sw-handover-en" accept="video/*" style="display:none" data-player="vid-player-sw-handover-en" data-ph="vid-ph-sw-handover-en" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-sw-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-built, manhole check, final CCTV</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
<div id="vid-player-sw-handover-en" class="qs-vid-ph" data-maxh="260px"></div>
</div>

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 Reference | ✅ الصرف السطحي — التسليم
</div>
<p style="color:var(--text2);font-size:13px;">This section contains detailed Arabic specifications per QCS 2024. Key data points are summarized below — all tables and technical data apply equally in both languages.</p>
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:12px;margin:10px 0;">
<strong style="color:#3498db;">Switch to Arabic (عربي) for full detailed content, tables and ITP checklists.</strong><br>
All numerical values, specifications and test methods shown in Arabic are sourced directly from QCS 2024 and apply universally.
</div>
</div>
` },
tw_survey: { title: '📐 المياه المعالجة — الدراسة والتصميم', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | MME Standards | Treated Water Pre-Construction</div>

<h3>📐 1. متطلبات ما قبل التنفيذ — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>الجهة المعتمِدة</th><th>التوقيت</th></tr>
<tr><td>مخططات التصميم</td><td>معتمدة من Ashghal + MME</td><td>Ashghal / MME</td><td>قبل أي تنفيذ</td></tr>
<tr><td>Cross Connection Study</td><td>دراسة كاملة للفصل عن مياه الشرب — إلزامي</td><td>Consultant + MME</td><td>قبل التنفيذ</td></tr>
<tr><td>Hydraulic Analysis</td><td>تحليل الضغط والتدفق — الحد الأدنى PN10</td><td>Consultant</td><td>قبل التصميم النهائي</td></tr>
<tr><td>Separation Study</td><td>تحديد مسافات الفصل عن كل الشبكات</td><td>Consultant</td><td>قبل التنفيذ</td></tr>
<tr><td>Material Submittal</td><td>مواسير بنفسجية + Fittings — شهادات المصنع</td><td>KAHRAMAA / MME</td><td>قبل التوريد</td></tr>
<tr><td>Method Statement</td><td>يشمل إجراءات منع Cross Connection</td><td>Consultant</td><td>قبل الحفر</td></tr>
<tr><td>Identification Plan</td><td>خطة تمييز شبكة المياه المعالجة (اللون، اللافتات)</td><td>MME</td><td>قبل التنفيذ</td></tr>
</table></div>

<h3>📐 2. NOC إلزامي من الجهات</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الجهة</th><th>سبب NOC</th><th>التوقيت</th></tr>
<tr><td>KAHRAMAA</td><td>التحقق من عدم تأثير على شبكة مياه الشرب</td><td>قبل الحفر</td></tr>
<tr><td>MME (Ministry of Municipality)</td><td>اعتماد مصدر المياه المعالجة وجودتها</td><td>قبل التشغيل</td></tr>
<tr><td>Ashghal</td><td>الطرق والشبكات الموجودة</td><td>قبل الحفر</td></tr>
<tr><td>Ooredoo / Infrastructure جهات</td><td>الاتصالات والخدمات المدفونة</td><td>قبل الحفر</td></tr>
</table></div>

<h3>⛔ 3. تحذيرات خاصة — Treated Water</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
<strong style="color:#e74c3c;">⚠️ المياه المعالجة غير صالحة للشرب تحت أي ظرف</strong><br>
• Cross Connection مع مياه الشرب = كارثة صحية + إيقاف المشروع + تحقيق جنائي<br>
• اللون البنفسجي على كل المواسير والـ Fittings والـ Valves إلزامي بدون استثناء<br>
• لافتات "TREATED WATER — NOT FOR DRINKING" عند كل نقطة ري<br>
• فحص Cross Connection قبل التشغيل = Hold Point مطلق (MME Present)
</div>

<h3>📐 4. مسافات الفصل الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الشبكة المجاورة</th><th>الفصل الأفقي الأدنى</th><th>الفصل الرأسي</th><th>ملاحظة</th></tr>
<tr><td>مياه الشرب (Water Supply)</td><td>≥ 1000mm</td><td>مياه الشرب دائماً فوق</td><td>الأهم — مطلق</td></tr>
<tr><td>Foul Sewer</td><td>≥ 500mm</td><td>Treated Water فوق أو جانبي</td><td>QCS S8</td></tr>
<tr><td>Storm Water</td><td>≥ 300mm</td><td>أي وضع مقبول</td><td>QCS S8</td></tr>
<tr><td>كابلات الكهرباء</td><td>≥ 300mm</td><td>—</td><td>KAHRAMAA</td></tr>
</table></div>

<h3>🔴 5. Hold Points — ما قبل التنفيذ</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>Cross Connection Study معتمدة من MME قبل التنفيذ</td><td>MME + Consultant</td><td>Approved Cross Connection Study</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>Material Approval — مواسير بنفسجية 100% من MME</td><td>MME</td><td>Approved Material Submittal</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 | MME Standards | Treated Water Pre-Construction</div>
<h3>Pre-Construction Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Authority</th></tr>
<tr><td>Design Drawings</td><td>Approved by Ashghal + MME</td><td>MME</td></tr>
<tr><td>Cross Connection Study</td><td>Full separation study from potable water — MANDATORY</td><td>MME + Consultant</td></tr>
<tr><td>Material Submittal</td><td>Purple pipes + fittings — manufacturer certificates</td><td>MME</td></tr>
<tr><td>Method Statement</td><td>Must include cross-connection prevention procedures</td><td>Consultant</td></tr>
</table></div>
<h3>Mandatory Separation Distances</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Adjacent Service</th><th>Min Horizontal</th><th>Vertical Rule</th></tr>
<tr><td>Potable Water (KAHRAMAA)</td><td>≥ 1000mm — ABSOLUTE</td><td>Potable water always above</td></tr>
<tr><td>Foul Sewer</td><td>≥ 500mm</td><td>Treated above or lateral</td></tr>
<tr><td>Storm Water</td><td>≥ 300mm</td><td>Any</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">CRITICAL:</strong> Treated water is NOT for drinking. Cross-connection with potable water = public health disaster + project shutdown.<br>
<strong>HP-01:</strong> Cross Connection Study approved by MME before construction<br>
<strong>HP-02:</strong> Material Approval (100% purple pipes) from MME
</div>
</div>
` },
tw_materials: { title: '🔩 المياه المعالجة — المواسير البنفسجية', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 مواد المياه المعالجة</span>
<button onclick="document.getElementById('vid-tw-materials').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-tw-materials" accept="video/*" style="display:none" data-player="vid-player-tw-materials" data-ph="vid-ph-tw-materials" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-tw-materials" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-tw-materials" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | MME Standards | Treated/Reclaimed Water</div>

<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:10px;padding:12px;margin-bottom:16px;">
<strong style="color:#e74c3c;">⛔ تحذير إلزامي:</strong> اللون البنفسجي (RAL 4001) للمواسير والـ Fittings والـ Valves إلزامي بدون استثناء. أي ماسورة بلون مختلف تُرفض فوراً.
</div>

<h3>📐 1. أنواع المواسير المعتمدة — MME</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>نوع الماسورة</th><th>المعيار</th><th>Pressure Class</th><th>اللون</th><th>القطر</th><th>اختبار المصنع</th></tr>
<tr><td>HDPE PE100 — بنفسجي</td><td>ISO 4427</td><td>PN6 – PN10</td><td>RAL 4001 بنفسجي</td><td>DN50 – DN630</td><td>Hydrostatic 2×PN / 1hr</td></tr>
<tr><td>uPVC — بنفسجي</td><td>ISO 1452</td><td>PN6 – PN10</td><td>RAL 4001 بنفسجي</td><td>DN50 – DN315</td><td>Hydrostatic + Impact</td></tr>
<tr><td>GRP — بنفسجي stripe</td><td>ISO 10467</td><td>حسب التصميم</td><td>شريط بنفسجي</td><td>DN315+</td><td>Stiffness + Hydrostatic</td></tr>
</table></div>

<h3>📐 2. جدول اختبارات المواد — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>مواصفة القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>لون الماسورة</td><td>RAL 4001 بنفسجي — لا استثناء</td><td>Color Chart Check</td><td>100% per delivery</td><td>MME Standards</td></tr>
<tr><td>Pressure Rating</td><td>≥ PN6 (PN10 للخطوط الرئيسية)</td><td>Factory Hydrostatic</td><td>كل batch</td><td>ISO 4427</td></tr>
<tr><td>Wall Thickness</td><td>حسب SDR المصنع</td><td>Caliper Measurement</td><td>كل delivery</td><td>ISO 4427</td></tr>
<tr><td>Marking</td><td>"RECLAIMED WATER" + لون بنفسجي</td><td>Visual</td><td>100%</td><td>MME</td></tr>
<tr><td>Conformity Certificate</td><td>شهادة معتمدة من MME</td><td>Document Check</td><td>كل Submittal</td><td>MME</td></tr>
<tr><td>Impact Resistance</td><td>لا كسور في 10 قطع</td><td>ISO 3127</td><td>كل batch</td><td>ISO 4427</td></tr>
</table></div>

<h3>📐 3. مواد Fittings والـ Valves — بنفسجي إلزامي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المادة</th><th>المواصفة</th><th>اللون</th><th>الملاحظة</th></tr>
<tr><td>HDPE Fittings</td><td>ISO 8085-3 / Butt + Electrofusion</td><td>بنفسجي RAL 4001</td><td>SDR نفس الماسورة</td></tr>
<tr><td>Isolation Valves</td><td>BS EN 1074-2</td><td>هيكل بنفسجي أو Label بنفسجي</td><td>Epoxy Lined أو SS</td></tr>
<tr><td>Air Release Valves</td><td>BS EN 1074-4</td><td>Label بنفسجي</td><td>عند كل نقطة عالية</td></tr>
<tr><td>Double Check Valves</td><td>BS EN 1717</td><td>بنفسجي أو Label واضح</td><td>إلزامي عند كل نقطة توصيل</td></tr>
<tr><td>Marker Tape</td><td>Polythene — بنفسجي</td><td>RAL 4001 بنفسجي</td><td>"RECLAIMED WATER" على الشريط</td></tr>
</table></div>

<h3>⛔ 4. المواد المرفوضة فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• أي ماسورة بلون غير بنفسجي (RAL 4001) — رفض فوري<br>
• مواسير بدون نص "RECLAIMED WATER" — رفض<br>
• Fittings بلون مختلف عن الماسورة — رفض<br>
• Valves بدون تمييز بنفسجي واضح — رفض<br>
• أي مادة تشبه مواسير مياه الشرب — رفض + تقرير فوري<br>
• تخزين مياه الشرب والمياه المعالجة في نفس الموقع دون فصل واضح — خطر
</div>

<h3>🔴 5. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-01</td><td>اعتماد Material Submittal — التحقق من اللون البنفسجي</td><td>Consultant + MME</td><td>Approved MAR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-02</td><td>استلام + فحص اللون في الموقع</td><td>QC Engineer</td><td>Delivery Inspection Record</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | MME Standards | Treated Water
</div>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-bottom:12px;font-size:12px;">
<strong style="color:#e74c3c;">⛔ MANDATORY:</strong> Colour RAL 4001 purple for ALL pipes, fittings, and valves. No exceptions.
</div>
<h3>Approved Pipe Types — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Type</th><th>Standard</th><th>Class</th><th>Colour</th><th>Diameter</th></tr>
<tr><td>HDPE PE100 — Purple</td><td>ISO 4427</td><td>PN6–PN10</td><td>RAL 4001 Purple</td><td>DN50–DN630</td></tr>
<tr><td>uPVC — Purple</td><td>ISO 1452</td><td>PN6–PN10</td><td>RAL 4001 Purple</td><td>DN50–DN315</td></tr>
<tr><td>GRP — Purple stripe</td><td>ISO 10467</td><td>Design-based</td><td>Purple stripe</td><td>DN315+</td></tr>
</table></div>
<h3>Material Tests — Minimum Requirements</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Parameter</th><th>Acceptance</th><th>Test Method</th><th>Frequency</th></tr>
<tr><td>Pipe Colour</td><td>RAL 4001 Purple — no exceptions</td><td>Colour chart check</td><td>100% per delivery</td></tr>
<tr><td>Pressure Rating</td><td>≥ PN6 (PN10 for mains)</td><td>Factory hydrostatic</td><td>Per batch</td></tr>
<tr><td>Marking</td><td>"RECLAIMED WATER" + purple colour</td><td>Visual</td><td>100%</td></tr>
<tr><td>Certificate</td><td>MME-approved conformity certificate</td><td>Document check</td><td>Per submittal</td></tr>
</table></div>
<p><strong>REJECTED IMMEDIATELY:</strong> Any pipe not in RAL 4001 purple | Pipes without "RECLAIMED WATER" marking | Any material that resembles potable water pipes</p>
</div>
` },
tw_excavation: { title: '⛏️ المياه المعالجة — الحفر والبيدنج', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | Treated Water Excavation & Bedding</div>

<h3>📐 1. مواصفات الحفر</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr>
<tr><td>عرض الخندق</td><td>DN + 600mm (300mm كل جانب) — حد أدنى</td><td>QCS S8</td></tr>
<tr><td>عمق الغطاء — في الطرق</td><td>≥ 900mm من سطح الطريق</td><td>Ashghal Standard</td></tr>
<tr><td>عمق الغطاء — خارج الطرق</td><td>≥ 600mm (حدائق + مناطق رعي)</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>إلزامي في الحفر > 1.2m عمق</td><td>QCS P1 S8.4</td></tr>
<tr><td>Dewatering</td><td>GWT ≥ 0.5m تحت قاع الحفر — مستمر</td><td>QCS P3 S4</td></tr>
<tr><td>Marker Tape</td><td>بنفسجي (Purple) — 300mm فوق الماسورة</td><td>KAHRAMAA / MME</td></tr>
</table></div>

<h3>📐 2. مواصفات Bedding — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>المنطقة</th><th>المادة</th><th>السماكة</th><th>الدمك</th><th>المرجع</th></tr>
<tr><td>Bedding تحت الماسورة</td><td>رمل نظيف أو Type 1 Granular</td><td>150mm</td><td>≥ 90% MDD — Level ± 10mm</td><td>QCS S8</td></tr>
<tr><td>حماية جانبية</td><td>رمل نظيف — يدوي بحذر</td><td>حتى نصف القطر</td><td>يدوي — لا آلات ثقيلة</td><td>QCS S8</td></tr>
<tr><td>Initial Cover</td><td>رمل نظيف فوق الماسورة</td><td>300mm</td><td>≥ 90% MDD — بعد اعتماد الوصلات</td><td>QCS S8</td></tr>
</table></div>

<h3>📐 3. متطلبات الفصل عند التقاطع مع مياه الشرب</h3>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.4);border-radius:10px;padding:12px;font-size:12px;">
<strong>عند التقاطع مع خط مياه شرب — شروط خاصة:</strong><br>
• مياه الشرب يجب أن تكون <strong>فوق</strong> المياه المعالجة دائماً<br>
• Sleeve Concrete C20 حول الخط السفلي — طول 3.0m من نقطة التقاطع<br>
• Puddle Flange أو Mechanical Joint عند التقاطع<br>
• توثيق بالصور + الـ As-Built قبل الردم — Hold Point إلزامي
</div>

<h3>🔴 4. Hold Points — الحفر والبيدنج</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03A</td><td>فحص Bedding Level + Compaction قبل تمديد المواسير</td><td>QC + Consultant</td><td>Bedding ITR</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-03B</td><td>فحص الفصل عن مياه الشرب — MME Representative حاضر</td><td>QC + MME</td><td>Separation Check Record</td></tr>
</table></div>

<h3>⛔ 5. Unacceptable</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ Bedding من تربة الموقع (Sabkha أو طينية)<br>
• ❌ Dewatering غير كافي — ماء في الحفر أثناء تمديد المواسير<br>
• ❌ المياه المعالجة فوق مياه الشرب عند التقاطع<br>
• ❌ Marker Tape غير بنفسجي<br>
• ❌ ردم Initial Cover بالحجارة أو مواد خشنة
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | Treated Water Excavation & Bedding</div>
<h3>Excavation Specifications</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Item</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Trench Width</td><td>DN + 600mm min (300mm each side)</td><td>QCS S8</td></tr>
<tr><td>Cover Depth (roads)</td><td>≥ 900mm from road surface</td><td>Ashghal</td></tr>
<tr><td>Cover Depth (off road)</td><td>≥ 600mm</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>Mandatory for depth > 1.2m</td><td>QCS P1 S8.4</td></tr>
<tr><td>Dewatering</td><td>GWT ≥ 0.5m below excavation floor</td><td>QCS P3 S4</td></tr>
<tr><td>Marker Tape</td><td>PURPLE — 300mm above pipe</td><td>MME / KAHRAMAA</td></tr>
</table></div>
<div style="background:rgba(155,89,182,0.1);border:1px solid rgba(155,89,182,0.4);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>At crossings with potable water:</strong> Potable water MUST be above treated water. C20 Concrete sleeve 3.0m either side of crossing. Document with photos + As-Built before backfill.<br><br>
<strong>HP-03A:</strong> Bedding level + compaction before pipe laying<br>
<strong>HP-03B:</strong> Separation check from potable water — MME representative required
</div>
</div>
` },
tw_laying: { title: '🔧 المياه المعالجة — وضع المواسير', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | ISO 4427 | MME Standards | Treated Water Pipe Laying</div>

<h3>📐 1. جدول مواصفات المواسير البنفسجية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>النوع</th><th>المادة</th><th>اللون</th><th>Pressure Class</th><th>الاستخدام</th><th>المرجع</th></tr>
<tr><td>uPVC Purple</td><td>uPVC (Unplasticised PVC)</td><td>بنفسجي كامل</td><td>PN10 أو PN16</td><td>DN ≤ 300mm</td><td>ISO 4422 / BS EN 1452</td></tr>
<tr><td>HDPE PE100 Purple</td><td>PE100 — SDR17 أو SDR11</td><td>بنفسجي أو Strip بنفسجي</td><td>PN10 / PN16</td><td>جميع الأقطار</td><td>ISO 4427 / BS EN 12201</td></tr>
<tr><td>DI Purple</td><td>Ductile Iron K9</td><td>Purple Epoxy Lining</td><td>PN25</td><td>DN > 300mm ضغط عالي</td><td>ISO 2531 / BS EN 545</td></tr>
<tr><td>GRP Purple</td><td>Glass Reinforced Plastic</td><td>Purple Marking Strip</td><td>PN10–PN16</td><td>DN > 600mm</td><td>BS EN 1636</td></tr>
</table></div>
<p style="font-size:11px;color:#9b59b6;font-weight:700;margin-top:4px;">⚠️ أي ماسورة ليست بنفسجية اللون = رفض فوري في الموقع بدون استثناء.</p>

<h3>📐 2. جدول Fittings والـ Valves البنفسجية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>العنصر</th><th>المواصفة</th><th>اللون</th><th>المرجع</th></tr>
<tr><td>Gate Valve / Butterfly Valve</td><td>PN16 — مع مفتاح تشغيل</td><td>بنفسجي أو Purple Label إلزامي</td><td>BS EN 1074</td></tr>
<tr><td>Air Valve (ARV)</td><td>Double Air Valve — PN16</td><td>Purple Body أو Label</td><td>BS EN 1074</td></tr>
<tr><td>Wash-out Valve</td><td>DN80 minimum + NRV</td><td>Purple Label</td><td>Ashghal Standard</td></tr>
<tr><td>Double Check Valve</td><td>إلزامي عند كل نقطة توصيل محتملة</td><td>—</td><td>MME Requirement</td></tr>
<tr><td>Thrust Block</td><td>C20 Concrete — عند كل Bend >11.25°</td><td>—</td><td>QCS S8</td></tr>
<tr><td>Valve Box / Chamber</td><td>بنفسجي اللون أو Purple Lid</td><td>بنفسجي</td><td>MME</td></tr>
</table></div>

<h3>📐 3. متطلبات التوصيل والتمديد</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>اتجاه التمديد</td><td>من المصدر (Source) للنقاط البعيدة</td><td>QCS S8</td></tr>
<tr><td>أدنى انحدار</td><td>≥ 1:500 (0.2%) لتفادي ركود المياه</td><td>QCS S8</td></tr>
<tr><td>uPVC Joint</td><td>Solvent Cement Joint أو Rubber Ring (Push Fit)</td><td>ISO 4422</td></tr>
<tr><td>HDPE Joint</td><td>Butt Fusion أو Electrofusion فقط</td><td>ISO 4427</td></tr>
<tr><td>Butt Fusion — درجة الحرارة</td><td>220–230°C — بحسب سماكة الجدار</td><td>DVS 2207</td></tr>
<tr><td>Electrofusion — Traceability</td><td>كل وصلة تُسجل بـ Barcode Reader</td><td>Ashghal</td></tr>
<tr><td>Pressure Testing قبل الردم</td><td>فحص أولي بصري للوصلات قبل Initial Backfill</td><td>QCS S8</td></tr>
<tr><td>Identification Tags</td><td>Tag بنفسجي على كل Valve + Chamber كل 50m على الخط</td><td>MME</td></tr>
</table></div>

<h3>📐 4. متطلبات Thrust Blocks</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الموقع</th><th>حجم الـ Block</th><th>المادة</th></tr>
<tr><td>90° Bend</td><td>حسب Thrust Calculation — QCS Appendix</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>45° Bend</td><td>حسب Thrust Calculation</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>11.25° Bend</td><td>حسب Thrust Calculation</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>Tee Junction</td><td>حسب DN + Pressure Class</td><td>C20 Concrete In-Situ</td></tr>
<tr><td>Dead End</td><td>إلزامي — لا يُرد الخط بدون Block</td><td>C20 Concrete In-Situ</td></tr>
</table></div>

<h3>🔴 5. Hold Points — وضع المواسير</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04A</td><td>فحص 100% ألوان المواسير بنفسجي قبل الدفن</td><td>QC</td><td>Colour Inspection Sheet</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04B</td><td>Fusion Joints Records (Barcode/Photo) مكتملة</td><td>QC + Consultant</td><td>Welding/Fusion Log</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-04C</td><td>Thrust Blocks مكتملة — Concrete Cured قبل الاختبار</td><td>QC</td><td>Thrust Block ITR</td></tr>
</table></div>

<h3>⛔ 6. Unacceptable — مرفوض فوراً</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• ❌ ماسورة أو Fitting غير بنفسجية — رفض فوري بدون نقاش<br>
• ❌ HDPE بدون Fusion Welding (ممنوع استخدام Compression Fittings في الخطوط الرئيسية)<br>
• ❌ أي توصيل مباشر بشبكة مياه الشرب<br>
• ❌ Thrust Block غير محسوب أو غير مكتمل الصب<br>
• ❌ Valve بدون Purple Identification Label<br>
• ❌ تشغيل الشبكة قبل اعتماد Cross Connection Test من MME
</div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | ISO 4427 | MME Standards | Treated Water Laying</div>
<h3>Purple Pipe Types</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Type</th><th>Material</th><th>Pressure Class</th><th>Application</th><th>Standard</th></tr>
<tr><td>uPVC Purple</td><td>uPVC</td><td>PN10/PN16</td><td>DN ≤ 300mm</td><td>ISO 4422</td></tr>
<tr><td>HDPE PE100 Purple</td><td>PE100 SDR17/11</td><td>PN10/PN16</td><td>All sizes</td><td>ISO 4427</td></tr>
<tr><td>DI Purple Epoxy</td><td>Ductile Iron K9</td><td>PN25</td><td>DN > 300mm, high pressure</td><td>ISO 2531</td></tr>
</table></div>
<h3>Installation Key Requirements</h3>
<p>• HDPE joints: Butt Fusion (220–230°C) or Electrofusion ONLY — every joint logged with barcode reader<br>
• Thrust Blocks: C20 concrete at all bends >11.25°, tees, dead ends — MUST be cured before pressure test<br>
• Min gradient: ≥ 1:500 (0.2%) to prevent stagnation<br>
• Purple ID tags on every valve + chamber, every 50m along pipe route</p>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>REJECT:</strong> Non-purple pipe or fitting | Compression fittings on mains | Any connection to potable water | Unfinished thrust blocks | Valve without purple ID | Network operation before MME Cross Connection Test approval<br><br>
<strong>HP-04A:</strong> 100% colour check (purple) before burial<br>
<strong>HP-04B:</strong> Fusion joint records complete<br>
<strong>HP-04C:</strong> Thrust blocks cast and cured before pressure test
</div>
</div>
` },
tw_testing: { title: '🧪 المياه المعالجة — الاختبارات', content: `
<div class="lang-content-ar">
<div style="margin:12px 0;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);">
<div style="padding:10px 12px;background:rgba(201,168,76,0.1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
<span style="color:var(--gold);font-weight:700;font-size:13px;">🎥 اختبارات المياه المعالجة</span>
<button onclick="document.getElementById('vid-tw-testing').click()" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 رفع فيديو</button>
</div>
<input type="file" id="vid-tw-testing" accept="video/*" style="display:none" data-player="vid-player-tw-testing" data-ph="vid-ph-tw-testing" onchange="loadLocalVideo(this, this.getAttribute('data-player'), this.getAttribute('data-ph'))">
<div id="vid-ph-tw-testing" style="padding:14px;text-align:center;color:var(--text3);font-size:12px;">📹 ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة</div>
<div id="vid-player-tw-testing" class="qs-vid-ph" data-maxh="240px"></div>
</div>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | MME Standards | Treated Water Testing</div>

<h3>📐 1. جدول الاختبارات الكامل — المياه المعالجة</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الاختبار</th><th>معيار القبول</th><th>طريقة الاختبار</th><th>الحد الأدنى للتكرار</th><th>المرجع</th></tr>
<tr><td>Hydrostatic Pressure Test</td><td>1.5× الضغط التصميمي / ساعتان / صفر انخفاض</td><td>Pressure Gauge + Pump</td><td>كل Section ≤ 500m</td><td>QCS S8 / ISO 4427</td></tr>
<tr><td>Cross Connection Test — الأهم</td><td>صفر تلوث في شبكة مياه الشرب</td><td>Tracer Dye Test أو Pressure Differential</td><td>كل نقطة توصيل محتملة</td><td>MME Standards</td></tr>
<tr><td>BOD (Biochemical Oxygen Demand)</td><td>≤ 10 mg/L (للري)</td><td>Standard Methods 5210B</td><td>كل Section قبل التشغيل</td><td>MME</td></tr>
<tr><td>TSS (Total Suspended Solids)</td><td>≤ 10 mg/L</td><td>Standard Methods 2540D</td><td>كل Section قبل التشغيل</td><td>MME</td></tr>
<tr><td>E. Coli</td><td>≤ 1 CFU/100mL (للري غير المباشر)</td><td>Standard Methods 9221</td><td>كل Section</td><td>MME</td></tr>
<tr><td>pH</td><td>6.0 – 9.0</td><td>pH Meter</td><td>كل Section</td><td>MME</td></tr>
<tr><td>Turbidity</td><td>≤ 5 NTU</td><td>Nephelometer</td><td>كل Section</td><td>MME</td></tr>
<tr><td>Colour Visual Check</td><td>100% بنفسجي — لا مواسير مختلطة</td><td>بصري 100%</td><td>قبل الردم + عند التسليم</td><td>MME</td></tr>
</table></div>

<h3>📐 2. Cross Connection Test — الإجراء التفصيلي</h3>
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:10px;padding:12px;">
<p><strong>الخطوات:</strong><br>
1. فصل كامل بين شبكة المياه المعالجة وشبكة مياه الشرب<br>
2. حقن Tracer Dye بنفسجي في شبكة المياه المعالجة<br>
3. مراقبة نقاط مياه الشرب القريبة لمدة 24hr<br>
4. صفر ظهور للـ Dye في شبكة مياه الشرب = Pass<br>
5. أي ظهور للـ Dye = رفض فوري + إيقاف التشغيل + تحقيق</p>
<p><strong>بديل:</strong> Pressure Differential — الحفاظ على ضغط مياه الشرب > ضغط المعالجة في جميع الأوقات</p>
</div>

<h3>⛔ 3. حالات إيقاف التشغيل الفوري</h3>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:10px;padding:12px;font-size:12px;">
• أي Cross Connection مكتشف — إيقاف فوري + إشعار MME + Ashghal<br>
• E. Coli > 1 CFU/100mL — عدم تشغيل + إعادة معالجة<br>
• فشل Pressure Test — لا تشغيل قبل الإصلاح + إعادة الاختبار<br>
• اكتشاف ماسورة غير بنفسجية في الشبكة — إيقاف + استبدال + CCTV
</div>

<h3>🔴 4. Hold Points</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-05</td><td>Pressure Test Pass (1.5×PN / 2hr / Zero drop)</td><td>QC + Consultant</td><td>Pressure Test Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-06</td><td>Cross Connection Test = صفر تلوث — إلزامي قبل أي تشغيل</td><td>QC + MME Representative</td><td>Cross Connection Test Report</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-07</td><td>Water Quality Reports معتمدة من MME</td><td>MME Lab</td><td>Water Quality Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">
📌 QCS 2024 Section 8 | MME Standards | Treated Water Testing
</div>
<h3>Testing Schedule — Treated Water</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Test</th><th>Acceptance Standard</th><th>Method</th><th>Min Frequency</th><th>Reference</th></tr>
<tr><td>Hydrostatic Pressure Test</td><td>1.5× design pressure / 2hr / Zero drop</td><td>Pressure gauge + pump</td><td>Per section ≤ 500m</td><td>QCS S8</td></tr>
<tr><td>Cross Connection Test</td><td>Zero contamination in potable water</td><td>Tracer dye or pressure differential</td><td>Every potential connection point</td><td>MME</td></tr>
<tr><td>BOD</td><td>≤ 10 mg/L (for irrigation)</td><td>Standard Methods 5210B</td><td>Per section before commissioning</td><td>MME</td></tr>
<tr><td>TSS</td><td>≤ 10 mg/L</td><td>Standard Methods 2540D</td><td>Per section</td><td>MME</td></tr>
<tr><td>E. Coli</td><td>≤ 1 CFU/100mL</td><td>Standard Methods 9221</td><td>Per section</td><td>MME</td></tr>
<tr><td>pH</td><td>6.0–9.0</td><td>pH Meter</td><td>Per section</td><td>MME</td></tr>
<tr><td>Turbidity</td><td>≤ 5 NTU</td><td>Nephelometer</td><td>Per section</td><td>MME</td></tr>
<tr><td>Colour Check</td><td>100% purple — no mixed pipes</td><td>Visual 100%</td><td>Before backfill + at handover</td><td>MME</td></tr>
</table></div>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">IMMEDIATE SHUTDOWN:</strong> Any detected cross-connection → stop commissioning + notify MME + Ashghal immediately.
</div>
<p style="margin-top:10px;"><strong>HP-05:</strong> Pressure test pass BEFORE final backfill<br>
<strong>HP-06:</strong> Cross Connection Test = zero contamination MANDATORY before commissioning<br>
<strong>HP-07:</strong> MME water quality certificate</p>
</div>
` },
tw_handover: { title: '✅ المياه المعالجة — التسليم', content: `
<div class="lang-content-ar">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 — Section 8 | MME Standards | Treated Water Handover</div>

<h3>📐 1. وثائق التسليم الإلزامية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>الوثيقة</th><th>المحتوى المطلوب</th><th>النسخ</th><th>الجهة</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + Long Section + GPS Coordinates لكل Fitting + Valve<br>يُظهر اللون البنفسجي بوضوح</td><td>3 ورقي + 1 رقمي</td><td>Ashghal / MME</td></tr>
<tr><td>Pressure Test Certificates</td><td>كل نتائج Hydrostatic Test — 1.5×PN / 2hr / Zero drop</td><td>أصلي + نسختان</td><td>QC / MME</td></tr>
<tr><td>Cross Connection Test Report</td><td>Tracer Dye Test Report — صفر تلوث<br>MME Representative Signature إلزامي</td><td>أصلي</td><td>MME</td></tr>
<tr><td>Water Quality Certificate</td><td>BOD / TSS / E.Coli / pH / Turbidity<br>نتائج MME Lab المعتمدة</td><td>أصلي</td><td>MME Lab</td></tr>
<tr><td>Material Certificates</td><td>Mill Certs للمواسير + Fittings + Valves<br>تأكيد اللون البنفسجي</td><td>أصلي</td><td>Manufacturer</td></tr>
<tr><td>ITP Signed Register</td><td>كل ITPs مغلقة — صفر NCR مفتوح</td><td>أصلي موقّع</td><td>QC + Consultant</td></tr>
<tr><td>Valve Schedule</td><td>جدول كل الـ Valves: Location / Size / Type / Colour<br>GPS Coordinates لكل Valve</td><td>ورقي + رقمي</td><td>Ashghal / MME</td></tr>
<tr><td>Warning Signs Record</td><td>صور توثيقية لكل لافتات "NOT FOR DRINKING"<br>موثقة بالـ GPS</td><td>رقمي</td><td>MME</td></tr>
<tr><td>O&M Manual</td><td>دليل التشغيل والصيانة + Emergency Procedures<br>Contact Numbers للطوارئ</td><td>نسختان</td><td>للمشغّل</td></tr>
<tr><td>CCTV Report (إن وجد)</td><td>للخطوط الرئيسية — Grade ≤ 2 كامل</td><td>رقمي + تقرير</td><td>Ashghal</td></tr>
</table></div>

<h3>📐 2. قائمة التحقق قبل التسليم النهائي</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>الشرط</th><th>الجهة</th><th>الحالة</th></tr>
<tr><td>Pressure Test</td><td>100% Pass — كل Sections</td><td>QC</td><td>✅ قبل التسليم</td></tr>
<tr><td>Cross Connection Test</td><td>MME Certified — صفر تلوث</td><td>MME</td><td>✅ إلزامي</td></tr>
<tr><td>Water Quality</td><td>BOD ≤10 | TSS ≤10 | E.Coli ≤1 CFU</td><td>MME Lab</td><td>✅ إلزامي</td></tr>
<tr><td>Colour Audit</td><td>100% بنفسجي — فحص ميداني نهائي</td><td>MME Inspector</td><td>✅ إلزامي</td></tr>
<tr><td>Valve Operation</td><td>كل الـ Valves تُفتح وتُغلق بسلاسة</td><td>QC</td><td>✅ إلزامي</td></tr>
<tr><td>Warning Signs</td><td>موجودة عند كل نقطة ري ومخرج</td><td>MME Inspector</td><td>✅ إلزامي</td></tr>
<tr><td>NCR Log</td><td>صفر NCRs مفتوحة</td><td>QC</td><td>✅ إلزامي</td></tr>
<tr><td>As-Built Submitted</td><td>مُسلَّمة ومعتمدة</td><td>Consultant</td><td>✅ إلزامي</td></tr>
</table></div>

<h3>🛡️ 3. فترة الضمان DLP — Defects Liability Period</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>البند</th><th>المتطلب</th></tr>
<tr><td>مدة DLP</td><td>12 شهر من تاريخ التسليم الرسمي (TOC)</td></tr>
<tr><td>Water Quality Monitoring</td><td>كل 3 أشهر — نتائج لـ MME</td></tr>
<tr><td>Cross Connection Re-check</td><td>عند نهاية DLP — قبل الإغلاق النهائي</td></tr>
<tr><td>Irrigation Points Inspection</td><td>كل نقطة ري كل 6 أشهر</td></tr>
<tr><td>Valve Operation Test</td><td>كل 6 أشهر — توثيق</td></tr>
<tr><td>Leak Repair Response</td><td>خلال 24 hour من الإبلاغ</td></tr>
<tr><td>Warning Signs Check</td><td>كل 3 أشهر — استبدال المتلفة فوراً</td></tr>
</table></div>

<h3>🔴 4. Hold Points النهائية</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>HP</th><th>الشرط</th><th>الجهة</th><th>التوثيق</th></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-08</td><td>Cross Connection Certificate من MME — مطلق قبل التسليم</td><td>MME Representative</td><td>MME Signed Certificate</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-09</td><td>Water Quality Reports معتمدة + Colour Audit Pass</td><td>MME Lab + Inspector</td><td>Lab Reports + Inspection Record</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">HP-10</td><td>موافقة Ashghal + MME الرسمية على التسليم النهائي</td><td>Ashghal + MME</td><td>TAC Certificate</td></tr>
</table></div>
</div>

<div class="lang-content-en" style="display:none;">
<div style="background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.3);border-radius:8px;padding:8px;margin:10px 0;font-size:11px;">📌 QCS 2024 Section 8 | MME Standards | Treated Water Handover</div>
<h3>Handover Documents Required</h3>
<div style="overflow-x:auto;"><table class="dm-table" style="font-size:11px;">
<tr style="background:rgba(122,21,21,0.85);"><th>Document</th><th>Content</th><th>Copies</th></tr>
<tr><td>As-Built Drawings</td><td>Plan + sections + GPS per fitting — purple shown clearly</td><td>3 hard + 1 digital</td></tr>
<tr><td>Pressure Test Certs</td><td>All sections — 1.5×PN / 2hr / zero drop</td><td>Original + 2</td></tr>
<tr><td>Cross Connection Report</td><td>Tracer dye test — zero contamination — MME sig. mandatory</td><td>Original</td></tr>
<tr><td>Water Quality Cert</td><td>BOD / TSS / E.Coli / pH / Turbidity — MME Lab</td><td>Original</td></tr>
<tr><td>Material Certs</td><td>Mill certs — pipes + fittings + valves — purple confirmed</td><td>Original</td></tr>
<tr><td>ITP Register</td><td>All ITPs closed — zero open NCRs</td><td>Original signed</td></tr>
<tr><td>Valve Schedule</td><td>Location / size / type — GPS per valve</td><td>Hard + digital</td></tr>
<tr><td>O&M Manual</td><td>Operating guide + emergency procedures</td><td>2 copies</td></tr>
</table></div>
<h3>DLP — Defects Liability Period</h3>
<p>Duration: 12 months from TOC<br>
• Water quality test every 3 months → MME<br>
• Cross connection re-check at DLP end<br>
• Valve operation test every 6 months<br>
• Leak repair within 24hr of report<br>
• Warning sign inspection every 3 months</p>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.4);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
<strong>HP-08:</strong> MME Cross Connection Certificate — ABSOLUTE before handover<br>
<strong>HP-09:</strong> Water Quality Reports approved + Colour Audit pass<br>
<strong>HP-10:</strong> Formal Ashghal + MME acceptance (TAC Certificate)
</div>
</div>
` },
itp_storm: { title: '📋 ITP — شبكة الصرف السطحي | Storm Water', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 المرجع: QCS 2024 — Section 8 Part 3 | Ashghal Standards
</div>
<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Material Approval</td><td>QCS S8 P3</td><td>اعتماد قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Submittal</td></tr>
<tr><td>1.2</td><td>Method Statement</td><td>QCS S1 P7</td><td>معتمد قبل الحفر</td><td>مرة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved MS</td></tr>
<tr><td>1.3</td><td>Shop Drawings</td><td>QCS S1 P7</td><td>معتمدة من Ashghal</td><td>كل submittal</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Drawings</td></tr>
</table>
<h3>2.0 — الحفر والبيدنج</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Trench Depth</td><td>QCS S8 P3</td><td>≥ 0.9m من السطح</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Survey</td></tr>
<tr><td>2.2</td><td>Bedding Gradient</td><td>Design Drawing</td><td>≥ 1:200 ± 5mm</td><td>كل 25m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Laser Record</td></tr>
<tr><td>2.3</td><td>Bedding Compaction</td><td>ASTM D1556</td><td>≥ 90% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Density Report</td></tr>
</table>
<h3>3.0 — Gullies & Manholes</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Gully Level</td><td>Design Drawing</td><td>± 5mm من مستوى الطريق</td><td>كل Gully</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Survey</td></tr>
<tr><td>3.2</td><td>Gully Spacing</td><td>Design Drawing</td><td>حسب التصميم ± 500mm</td><td>كل Section</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Survey Record</td></tr>
<tr><td>3.3</td><td>Manhole Water Tightness</td><td>QCS S8 P3</td><td>صفر تسريب / 24hr</td><td>كل Manhole</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Record</td></tr>
<tr><td>3.4</td><td>Silt Trap Installation</td><td>QCS S8 P3</td><td>موجود قبل كل Outfall</td><td>كل Outfall</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>3.5</td><td>Silt Bucket in Gullies</td><td>QCS S8 P3</td><td>موجود في كل Gully</td><td>100%</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>Inspection Record</td></tr>
</table>
<h3>4.0 — الاختبارات</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>Hydraulic Test</td><td>QCS S8 P3</td><td>صفر تسريب / 30 دقيقة</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Test Record</td></tr>
<tr><td>4.2</td><td>CCTV Inspection</td><td>QCS S8 P3</td><td>100% — Grade ≤ 2</td><td>قبل التسليم</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + CCTV Report</td></tr>
<tr><td>4.3</td><td>Pipe Gradient Check</td><td>Design Drawing</td><td>≥ 1:200 ± 5mm</td><td>كل Section</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Survey Record</td></tr>
</table>
<h3>5.0 — الردم</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>5.1</td><td>Backfill Compaction</td><td>QCS S6 P2</td><td>≥ 95% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr>
<tr><td>5.2</td><td>Road Reinstatement</td><td>QCS S6 P5</td><td>بنفس مواصفة الطريق الأصلي</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Record</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">H</strong> = Hold Point &nbsp;|&nbsp; <strong style="color:#f1c40f;">W</strong> = Witness Point &nbsp;|&nbsp; <strong style="color:#2ecc71;">R</strong> = Review
</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Storm Water Network</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Pipe Material</td><td>Material Approval</td><td>Each delivery</td><td>BS EN 295</td><td>HP</td></tr>
<tr><td>Bedding Compaction</td><td>≥ 90% MDD (Sand Cone)</td><td>Per 50m</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>Pipe Gradient</td><td>Laser level vs IFC</td><td>Every joint</td><td>IFC</td><td>W</td></tr>
<tr><td>Hydraulic Test / CCTV</td><td>Grade ≤ 2</td><td>100%</td><td>WRc</td><td>HP</td></tr>
<tr><td>Backfill Compaction</td><td>≥ 95% MDD</td><td>Per 500m²</td><td>ASTM D698</td><td>W</td></tr>
<tr><td>Level Survey</td><td>Gully/Manhole ±5mm</td><td>100%</td><td>Survey</td><td>W</td></tr></table>
</div>
` },
itp_treated: { title: '📋 ITP — شبكة المياه المعالجة | Treated Water', content: `<div class="lang-content-ar">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">
📌 المرجع: QCS 2024 — Section 8 | MME & Ashghal Standards
</div>
<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>1.1</td><td>Material Approval — Purple Pipes</td><td>QCS S8</td><td>بنفسجي — ISO Certificate</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Submittal</td></tr>
<tr><td>1.2</td><td>Cross Connection Study</td><td>MME Std</td><td>معتمد قبل أي تنفيذ</td><td>مرة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Study</td></tr>
<tr><td>1.3</td><td>Method Statement</td><td>QCS S1 P7</td><td>معتمد قبل الحفر</td><td>مرة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved MS</td></tr>
<tr><td>1.4</td><td>Shop Drawings</td><td>QCS S1 P7</td><td>معتمدة من MME / Ashghal</td><td>كل submittal</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Approved Drawings</td></tr>
</table>
<h3>2.0 — اختبارات المواد</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>2.1</td><td>Pipe Color Verification</td><td>MME Std</td><td>بنفسجي RAL 4001 — 100%</td><td>100% كل ماسورة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Inspection Record</td></tr>
<tr><td>2.2</td><td>Pipe Wall Thickness</td><td>ISO 4427</td><td>حسب المواصفة ± 5%</td><td>عينة عشوائية</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#2ecc71;font-weight:700;">R</td><td>MRR + Certificate</td></tr>
<tr><td>2.3</td><td>Valve Color — Purple</td><td>MME Std</td><td>بنفسجي إلزامي</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
</table>
<h3>3.0 — الحفر والفصل</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>3.1</td><td>Separation from Potable Water</td><td>QCS S8</td><td>≥ 1.0m أفقياً — مياه الشرب فوق</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Survey</td></tr>
<tr><td>3.2</td><td>Trench Depth</td><td>QCS S8</td><td>≥ 0.9m من السطح</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Survey</td></tr>
<tr><td>3.3</td><td>Bedding Compaction</td><td>ASTM D1556</td><td>≥ 90% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#f1c40f;font-weight:700;">W</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Density Report</td></tr>
</table>
<h3>4.0 — وضع المواسير</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>4.1</td><td>Pipe Color — Field Check</td><td>MME Std</td><td>بنفسجي 100% — لا استثناء</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>Inspection Record</td></tr>
<tr><td>4.2</td><td>Double Check Valve</td><td>MME Std</td><td>موجود عند كل نقطة اتصال</td><td>كل نقطة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Record</td></tr>
<tr><td>4.3</td><td>Warning Signs</td><td>MME Std</td><td>لافتة عند كل نقطة استخدام</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>4.4</td><td>Marker Tape Purple</td><td>MME Std</td><td>بنفسجي — RECLAIMED WATER — 300mm</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
</table>
<h3>5.0 — الاختبارات</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>5.1</td><td>Pressure Test</td><td>QCS S8</td><td>1.5x التصميمي / ساعتان / صفر انخفاض</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Pressure Chart</td></tr>
<tr><td>5.2</td><td>Cross Connection Test</td><td>MME Std</td><td>صفر تلوث في مياه الشرب</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>IR + Certificate</td></tr>
<tr><td>5.3</td><td>Water Quality — BOD/TSS</td><td>MME Std</td><td>حسب MME Standard</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td>MME Lab Report</td></tr>
<tr><td>5.4</td><td>Leakage Test</td><td>QCS S8</td><td>صفر تسريب مرئي</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Test Record</td></tr>
</table>
<h3>6.0 — الردم والتشطيب</h3>
<table class="dm-table">
<tr><th>SN</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th><th>السجل</th></tr>
<tr><td>6.1</td><td>Backfill Compaction</td><td>QCS S6 P2</td><td>≥ 95% MDD</td><td>كل 500m²</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Density Report</td></tr>
<tr><td>6.2</td><td>Purple Marker Tape Verification</td><td>MME Std</td><td>بنفسجي — عمق 300mm صح</td><td>100%</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>Inspection Record</td></tr>
<tr><td>6.3</td><td>Road Reinstatement</td><td>QCS S6 P5</td><td>بنفس مواصفة الطريق الأصلي</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td><td>IR + Record</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
<strong style="color:#e74c3c;">H</strong> = Hold Point &nbsp;|&nbsp; <strong style="color:#f1c40f;">W</strong> = Witness Point &nbsp;|&nbsp; <strong style="color:#2ecc71;">R</strong> = Review
</div>
</div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Treated Water Network</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Pipe Material (Purple)</td><td>MAR HDPE/GRP</td><td>Each delivery</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Marker Tape</td><td>Purple tape 300mm above pipe</td><td>100%</td><td>KAHRAMAA</td><td>W</td></tr>
<tr><td>Pipe Separation</td><td>≥ 1.0m from drinking water</td><td>100%</td><td>KAHRAMAA</td><td>W</td></tr>
<tr><td>Hydrostatic Test</td><td>1.5 × PN / 2hr / zero drop</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Chlorination</td><td>≥ 50ppm / ≥ 24hr</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Water Quality</td><td>Coliform=0 | Turbidity ≤ 1 NTU</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr></table>
</div>
` },
utilities_materials: { title: '🧱 مواد المرافق — المواصفات والاختبارات', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Utilities Materials</div>

<h3>1️⃣ مواسير مياه الشرب</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>HDPE PE100</td><td>ISO 4427 | PN10-16</td><td>Wall Thickness + OD</td><td>كل دفعة</td></tr>
<tr><td>Ductile Iron Class K9</td><td>ISO 2531</td><td>Hydraulic Test</td><td>كل دفعة</td></tr>
<tr><td>uPVC PN10-16</td><td>ISO 1452</td><td>Flattening Test</td><td>كل دفعة</td></tr>
<tr><td>Gate Valve PN16</td><td>BS 5163</td><td>Pressure Test</td><td>كل دفعة</td></tr>
<tr><td>Rubber Ring</td><td>BS EN 681</td><td>Hardness + Compression</td><td>كل دفعة</td></tr>
<tr><td>Thrust Block Concrete</td><td>C25</td><td>Cube Test</td><td>كل صبة</td></tr>
<tr><td>Marker Tape — أصفر</td><td>KAHRAMAA Std</td><td>بصري 100%</td><td>100%</td></tr>
</table>

<h3>2️⃣ مواسير Foul Sewer</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>uPVC SN8</td><td>ISO 4435</td><td>Ring Stiffness + Impact</td><td>كل دفعة</td></tr>
<tr><td>GRP SN5000</td><td>ISO 10467</td><td>Stiffness + Bending</td><td>كل دفعة</td></tr>
<tr><td>Precast Manhole Rings</td><td>BS 5911</td><td>Crushing Load</td><td>كل دفعة</td></tr>
<tr><td>Manhole Cover D400</td><td>BS EN 124</td><td>Load Test 400kN</td><td>كل دفعة</td></tr>
<tr><td>Benching Mortar 1:2</td><td>QCS S8 P2</td><td>Compressive Strength</td><td>كل دفعة</td></tr>
<tr><td>Marker Tape — أخضر</td><td>QCS S8</td><td>بصري 100%</td><td>100%</td></tr>
</table>

<h3>3️⃣ مواسير الصرف السطحي</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>RCP Reinforced Concrete</td><td>BS 5911 Part 100</td><td>Crushing Load Test</td><td>كل دفعة</td></tr>
<tr><td>HDPE Corrugated SN8</td><td>EN 13476</td><td>Ring Stiffness</td><td>كل دفعة</td></tr>
<tr><td>Gully Grating D400</td><td>BS EN 124</td><td>Load Test</td><td>كل دفعة</td></tr>
<tr><td>Silt Bucket</td><td>HDPE مقاوم</td><td>بصري</td><td>100%</td></tr>
</table>

<h3>4️⃣ مواسير المياه المعالجة</h3>
<table class="dm-table">
<tr><th>النوع</th><th>المواصفة</th><th>اللون</th><th>الاختبار</th></tr>
<tr><td>HDPE PE100 — بنفسجي</td><td>ISO 4427 | PN10</td><td>RAL 4001 بنفسجي</td><td>Color + Wall Thickness</td></tr>
<tr><td>uPVC — بنفسجي</td><td>ISO 1452 | PN10</td><td>RAL 4001 بنفسجي</td><td>Color + Pressure</td></tr>
<tr><td>Marker Tape — بنفسجي</td><td>MME Std</td><td>بنفسجي</td><td>100% بصري</td></tr>
</table>

<h3>5️⃣ مواد البيدنج والردم</h3>
<table class="dm-table">
<tr><th>المادة</th><th>المواصفة</th><th>الاختبار</th><th>التكرار</th></tr>
<tr><td>Sand Bedding</td><td>نظيف ≤ 20mm</td><td>Grading</td><td>كل 500m³</td></tr>
<tr><td>Selected Fill</td><td>≤ 75mm | CBR≥8%</td><td>CBR + Grading</td><td>كل 500m³</td></tr>
<tr><td>Backfill Compaction</td><td>≥ 90-98% MDD</td><td>Sand Cone</td><td>كل 500m²</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>🧱 Utilities Materials — QCS 2024 Section 8</h3>
<table class="dm-table">
<tr><th>Pipe Type</th><th>Network</th><th>Standard</th></tr>
<tr><td>HDPE PE100 PN10-16</td><td>Water Supply</td><td>ISO 4427</td></tr>
<tr><td>Ductile Iron K9</td><td>Water Supply</td><td>ISO 2531</td></tr>
<tr><td>uPVC SN8</td><td>Foul Sewer</td><td>ISO 4435</td></tr>
<tr><td>GRP SN5000</td><td>Foul Sewer</td><td>ISO 10467</td></tr>
<tr><td>RCP Class 2</td><td>Storm Water</td><td>BS 5911</td></tr>
<tr><td>HDPE Purple</td><td>Treated Water</td><td>ISO 4427</td></tr>
<tr><td>Manhole Cover D400</td><td>All</td><td>BS EN 124</td></tr>
</table>
<p><strong>Backfill:</strong> Sand bedding 150mm | Selected Fill compacted ≥90-95% MDD | Document every layer</p>
</div>
` },
utilities_qcp: { title: '📊 خطة ضبط الجودة — المرافق (QCP)', content: `
<div class="lang-content-ar">

<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Quality Control Plan — Utilities</div>

<h3>1.0 — وثائق ما قبل التنفيذ</h3>
<table class="dm-table">
<tr><th>الوثيقة</th><th>المحتوى</th><th>الجهة</th></tr>
<tr><td>Material Submittal</td><td>شهادات المواسير + Fittings + Valves</td><td>Consultant + KAHRAMAA/Ashghal</td></tr>
<tr><td>Method Statement</td><td>طريقة الحفر + وضع المواسير + الاختبار</td><td>Consultant</td></tr>
<tr><td>Shop Drawings</td><td>مخططات تفصيلية معتمدة</td><td>Consultant + Authority</td></tr>
<tr><td>NOC Documents</td><td>KAHRAMAA + Ashghal + Ooredoo + QP</td><td>كل الجهات</td></tr>
<tr><td>Trench Shoring Design</td><td>للأعماق &gt; 1.5m</td><td>Consultant</td></tr>
</table>

<h3>2.0 — Hold Points مياه الشرب</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>HP-01</td><td>Material Approval قبل التوريد</td><td>Consultant</td></tr>
<tr><td>HP-02</td><td>Bedding + Depth قبل وضع المواسير</td><td>Consultant</td></tr>
<tr><td>HP-03</td><td>Joints + Thrust Blocks قبل الردم</td><td>Consultant</td></tr>
<tr><td>HP-04</td><td>Pressure Test (1.5x / 2hr / صفر)</td><td>Consultant + KAHRAMAA</td></tr>
<tr><td>HP-05</td><td>Chlorination (50ppm / 24hr)</td><td>KAHRAMAA Lab</td></tr>
<tr><td>HP-06</td><td>Water Quality (Coliform=0 / Turbidity≤1)</td><td>KAHRAMAA</td></tr>
</table>

<h3>3.0 — Hold Points Foul Sewer</h3>
<table class="dm-table">
<tr><th>HP</th><th>الشرط</th><th>الجهة</th></tr>
<tr><td>HP-01</td><td>Material Approval</td><td>Consultant</td></tr>
<tr><td>HP-02</td><td>Gradient بـ Laser Level (± 3mm)</td><td>Consultant</td></tr>
<tr><td>HP-03</td><td>Manhole Construction + Benching</td><td>Consultant</td></tr>
<tr><td>HP-04</td><td>Air Test (100mm WG / ≤25mm / 5min)</td><td>Consultant</td></tr>
<tr><td>HP-05</td><td>CCTV Inspection (100% / Grade≤2)</td><td>Consultant + Authority</td></tr>
<tr><td>HP-06</td><td>Backfill Compaction ≥95%</td><td>Consultant</td></tr>
</table>

<h3>4.0 — الاختبارات الإلزامية الموحدة</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>الشبكة</th><th>المعيار</th><th>التكرار</th></tr>
<tr><td>Pressure Test</td><td>مياه الشرب + معالجة</td><td>1.5x / 2hr / صفر</td><td>كل Section</td></tr>
<tr><td>Air Test</td><td>صرف صحي</td><td>100mm WG / ≤25mm / 5min</td><td>كل Section</td></tr>
<tr><td>Hydraulic Test</td><td>صرف سطحي</td><td>لا تسريب / 30min</td><td>كل Section</td></tr>
<tr><td>CCTV Inspection</td><td>صرف صحي + سطحي</td><td>100% / Grade≤2</td><td>قبل التسليم</td></tr>
<tr><td>Water Quality</td><td>مياه الشرب</td><td>Coliform=0 / Turbidity≤1</td><td>كل Section</td></tr>
<tr><td>Cross Connection</td><td>مياه معالجة</td><td>صفر تلوث</td><td>كل Section</td></tr>
<tr><td>Backfill Compaction</td><td>كل الشبكات</td><td>≥90-95% MDD</td><td>كل 500m²</td></tr>
<tr><td>Gully Level</td><td>صرف سطحي</td><td>± 5mm من الطريق</td><td>كل Gully</td></tr>
</table>

</div>
<div class="lang-content-en" style="display:none;">
<h3>📊 Utilities Quality Control Plan (QCP)</h3>
<table class="dm-table">
<tr><th>HP</th><th>Network</th><th>Stage</th><th>Condition</th></tr>
<tr><td>HP-01</td><td>All</td><td>Material Approval</td><td>Before supply</td></tr>
<tr><td>HP-02</td><td>All</td><td>Bedding + Depth</td><td>Before pipe laying</td></tr>
<tr><td>HP-03</td><td>Water</td><td>Pressure Test</td><td>1.5×PN / 2hr / zero drop</td></tr>
<tr><td>HP-04</td><td>Water</td><td>Chlorination</td><td>≥50ppm / ≥24hr</td></tr>
<tr><td>HP-05</td><td>Water</td><td>Water Quality</td><td>Coliform=0 / Turbidity≤1</td></tr>
<tr><td>HP-06</td><td>Sewer</td><td>Gradient</td><td>Laser Level ±3mm</td></tr>
<tr><td>HP-07</td><td>Sewer</td><td>Air Test</td><td>100mm WG / 5min / ≤25mm drop</td></tr>
<tr><td>HP-08</td><td>Sewer</td><td>CCTV</td><td>100% / Grade ≤ 2</td></tr>
</table>
</div>
` },
ms_utilities: { title: '📋 Method Statement — Utilities Works', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 KAHRAMAA / Ashghal Requirements | QCS 2024 Section 8
</div>
<div class="lang-content-ar">
<h3>📋 نطاق العمل</h3>
<p>يغطي هذا الـ Method Statement أعمال تمديد وتركيب شبكات المرافق (مياه الشرب، Foul Sewer، الصرف السطحي، المياه المعالجة) وفق متطلبات KAHRAMAA و Ashghal و QCS 2024.</p>
<h3>1.0 المعدات</h3>
<table class="dm-table"><tr><th>المعدة</th><th>الاستخدام</th></tr>
<tr><td>Backhoe / Excavator</td><td>الحفر</td></tr>
<tr><td>Trench Box / Shoring</td><td>للأعماق > 1.5m إلزامي</td></tr>
<tr><td>Dewatering Pump</td><td>لتخفيض المياه الجوفية</td></tr>
<tr><td>Laser Level</td><td>ضبط انحدار المواسير</td></tr>
<tr><td>Pipe Fusion Machine</td><td>HDPE Butt Fusion</td></tr>
<tr><td>Pressure Test Equipment</td><td>Hydrostatic Testing</td></tr>
<tr><td>CCTV Camera</td><td>فحص الصرف</td></tr>
</table>
<h3>2.0 التسلسل التنفيذي</h3>
<p><strong>المرحلة 1 — التحضير:</strong><br>
• NOC من جميع الجهات (KAHRAMAA، Ashghal، Ooredoo، QP)<br>
• تحديد المرافق المدفونة قبل الحفر<br>
• اعتماد Method Statement + ITP + Shop Drawings</p>
<p><strong>المرحلة 2 — الحفر:</strong><br>
• بدء الحفر بعد NOC كامل<br>
• Trench Box للأعماق > 1.5m<br>
• Dewatering مستمر عند مستوى المياه الجوفية<br>
• تفريغ مواسير قائمة قبل القطع</p>
<p><strong>المرحلة 3 — وضع المواسير:</strong><br>
• Sand Bedding 150mm قبل الوضع<br>
• ضبط الانحدار بـ Laser Level<br>
• فحص كل وصلة قبل الردم<br>
• Marker Tape بالارتفاع الصحيح</p>
<p><strong>المرحلة 4 — الاختبارات:</strong><br>
• Pressure Test: 1.5x × PN / 2 hour / صفر تسرب (مياه الشرب)<br>
• Air Test: 100mm WG / 5 دقائق / ≤ 25mm (صرف صحي)<br>
• CCTV 100% (صرف صحي + سطحي)<br>
• Water Quality (مياه الشرب)</p>
<p><strong>المرحلة 5 — الردم:</strong><br>
• Selected Fill بعد اعتماد الاختبارات فقط<br>
• Compaction ≥ 90-95% MDD كل 300mm<br>
• الطبقة العلوية (300-600mm) ≥ 93% MDD<br>
• توثيق كل طبقة بـ Sand Cone Test</p>
<h3>3.0 اشتراطات KAHRAMAA</h3>
<table class="dm-table"><tr><th>البند</th><th>المتطلب</th></tr>
<tr><td>الفصل الأفقي (مياه / صرف)</td><td>≥ 1.0m</td></tr>
<tr><td>مياه الشرب دائماً</td><td>فوق Foul Sewer</td></tr>
<tr><td>Marker Tape لون مياه الشرب</td><td>أصفر</td></tr>
<tr><td>Marker Tape لون صرف صحي</td><td>أخضر</td></tr>
<tr><td>Marker Tape لون معالجة</td><td>بنفسجي</td></tr>
<tr><td>Chlorination قبل التشغيل</td><td>≥ 50ppm / ≥ 24 hour</td></tr>
<tr><td>Water Quality</td><td>Coliform = 0 / Turbidity ≤ 1 NTU</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Scope</h3>
<p>This Method Statement covers installation of utility networks (Water Supply, Foul Sewer, Storm Water, Treated Water) in accordance with KAHRAMAA, Ashghal and QCS 2024 requirements.</p>
<h3>Execution Sequence</h3>
<p><strong>Phase 1 — Preparation:</strong> NOC from all authorities → Material Approval → ITP Hold Points → Trench design approval</p>
<p><strong>Phase 2 — Excavation:</strong> Trench box for depths > 1.5m → Continuous dewatering → Protect existing utilities</p>
<p><strong>Phase 3 — Pipe Laying:</strong> 150mm sand bedding → Laser level for gradient → Joint inspection before backfill → Marker tape at correct elevation</p>
<p><strong>Phase 4 — Testing:</strong> Pressure Test 1.5x × PN / 2hr / zero drop (water) → Air Test 100mm WG / 5min / ≤25mm drop (sewer) → 100% CCTV (sewer+storm) → Water quality (drinking water)</p>
<p><strong>Phase 5 — Backfill:</strong> Selected fill only after test approval → Compaction ≥ 90-95% MDD per 300mm lift → Document with Sand Cone</p>
<h3>KAHRAMAA Requirements</h3>
<table class="dm-table"><tr><th>Item</th><th>Requirement</th></tr>
<tr><td>Horizontal separation (water/sewer)</td><td>≥ 1.0m</td></tr>
<tr><td>Water supply always</td><td>Above foul sewer</td></tr>
<tr><td>Water supply marker tape</td><td>Yellow</td></tr>
<tr><td>Foul sewer marker tape</td><td>Green</td></tr>
<tr><td>Treated water marker tape</td><td>Purple</td></tr>
<tr><td>Chlorination before commissioning</td><td>≥ 50ppm / ≥ 24 hours</td></tr>
<tr><td>Water quality acceptance</td><td>Coliform = 0 / Turbidity ≤ 1 NTU</td></tr>
</table>
<h3>2.0 تسلسل العمل — Work Sequence</h3>
<div style="margin-bottom:16px">
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">1</div><div><strong style="color:var(--gold2)">Survey & Setting Out</strong><br>تحديد مسار الأنابيب بالـ Total Station — مناسيب الـ Invert Level كل 25m — علامات CH على الأرض<br><small style="color:var(--text3)">Hold Point: SC يعتمد المناسيب قبل الحفر</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">2</div><div><strong style="color:var(--gold2)">Utilities Detection (GPR)</strong><br>كشف المرافق الموجودة بـ Ground Penetrating Radar قبل الحفر — تحديد الكابلات والمواسير القائمة<br><small style="color:var(--text3)">Ashghal NOC مطلوب قبل الحفر</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">3</div><div><strong style="color:var(--gold2)">Excavation + Shoring</strong><br>حفر الخنادق بعرض DN + 600mm حد أدنى — Shoring إلزامي >1.2m — Dewatering إذا وُجدت مياه جوفية<br><small style="color:var(--text3)">Hold Point: عمق >1.2m يوقف العمل بدون Shoring Design</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">4</div><div><strong style="color:var(--gold2)">Bedding Preparation</strong><br>فرش Bedding Material (Type 1 أو رمل نظيف) بسماكة 150mm — دمك ≥90% MDD — Level ±10mm<br><small style="color:var(--text3)">Witness Point: تحقق من المادة والسماكة</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">5</div><div><strong style="color:var(--gold2)">Pipe Laying & Jointing</strong><br>وضع المواسير وفق Invert Levels المعتمدة — فحص الوصلات واحدة واحدة — Deflection Test للأنابيب المرنة<br><small style="color:var(--text3)">Hold Point: Sewer gradient ≥ minimum (DN150→1:100, DN200→1:150)</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">6</div><div><strong style="color:var(--gold2)">Testing</strong><br>Water Supply: Pressure Test 1.5×PN لمدة 2 ساعة — Foul Sewer: Air Test 100mm WG → drop ≤25mm/5min — CCTV Survey 100%<br><small style="color:var(--text3)">Hold Point: لا backfill قبل اعتماد الاختبارات</small></div></div>
<div style="display:flex;gap:10px;margin-bottom:8px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:28px;height:28px;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gold)">7</div><div><strong style="color:var(--gold2)">Backfill & Compaction</strong><br>ردم بطبقات ≤200mm — دمك ≥95% MDD — لا مواد Sabkha أو عضوية<br><small style="color:var(--text3)">Witness Point: Field Density Test كل 50m طولي</small></div></div>
</div>
<h3>3.0 السلامة — Safety Requirements</h3>
<table class="dm-table"><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr>
<tr><td>PPE</td><td>خوذة + سترة عاكسة + حذاء أمان + قفازات — إلزامي 100%</td><td>Ashghal QHSE</td></tr>
<tr><td>Shoring</td><td>إلزامي لأي حفرية >1.2m — Timber أو Sheet Pile</td><td>QCS 2024 P1 S8.4</td></tr>
<tr><td>Barricading</td><td>سياج ≥1.5m من حافة الحفرية + إضاءة ليلية</td><td>Ashghal TMP</td></tr>
<tr><td>Confined Space</td><td>Manhole entry = Permit to Work + Gas Test + Standby Man</td><td>QCS P1 S8</td></tr>
<tr><td>Hot Work</td><td>Welding permit + Fire extinguisher within 5m</td><td>QCDD</td></tr>
</table>
<h3>4.0 QA Checkpoints</h3>
<table class="dm-table"><tr><th>المرحلة</th><th>النقطة</th><th>القبول</th></tr>
<tr><td>قبل الحفر</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Survey approved + NOC + Shoring design</td></tr>
<tr><td>بعد Bedding</td><td style="color:#f39c12">Witness</td><td>Level ±10mm + Material approved</td></tr>
<tr><td>بعد Laying</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Invert levels + Joint check</td></tr>
<tr><td>اختبار الضغط/الهواء</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Pass criteria met + Lab report</td></tr>
<tr><td>CCTV (Sewer فقط)</td><td style="color:#e74c3c;font-weight:700">Hold Point</td><td>Grade ≤2 + Full video + Report</td></tr>
<tr><td>بعد Backfill</td><td style="color:#f39c12">Witness</td><td>≥95% MDD + لا مواد ملوثة</td></tr>
</table>

</div>
` },
itp_water_supply: { title: '📋 ITP — شبكة مياه الشرب', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 8 Part 1 | KAHRAMAA Standards</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th></tr><tr><td>1.1</td><td>Material Approval</td><td>ISO Certificate قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>3.1</td><td>Trench Depth & Width</td><td>≥ 1.0m | OD + 600mm</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td></tr><tr><td>5.1</td><td>Hydrostatic Pressure Test</td><td>1.5x / ساعتان / صفر انخفاض</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>6.2</td><td>Bacteriological Test</td><td>Total Coliform = 0 / 100ml</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Water Supply Network</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Pipe Material</td><td>MAR HDPE PE100/DI/GRP</td><td>Each delivery</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Yellow Marker Tape</td><td>300mm above pipe crown</td><td>100%</td><td>KAHRAMAA</td><td>W</td></tr>
<tr><td>Pipe Separation</td><td>≥ 1.0m from sewer</td><td>100%</td><td>KAHRAMAA</td><td>W</td></tr>
<tr><td>Bedding Compaction</td><td>≥ 90% MDD</td><td>Per 50m</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>Hydrostatic Test</td><td>1.5 × PN / 2hr / zero drop</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Chlorination</td><td>≥ 50ppm / ≥ 24hr</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr>
<tr><td>Water Quality</td><td>Coliform=0 | Turbidity ≤ 1 NTU</td><td>Per section</td><td>KAHRAMAA</td><td>HP</td></tr></table>
</div>
` },
itp_sewer: { title: '📋 ITP — شبكة Foul Sewer', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS 2024 — Part 8, Section 2 | Ashghal Standards</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th></tr><tr><td>1.1</td><td>Material Approval</td><td>ISO Certificate قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>2.2</td><td>Bedding Gradient</td><td>حسب التصميم ± 3mm</td><td>كل 25m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>5.1</td><td>Air Test</td><td>100mm WG — انخفاض ≤ 25mm / 5 دقائق</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>5.2</td><td>CCTV Inspection</td><td>100% — Grade ≤ 2</td><td>100% قبل التسليم</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>ITP — Foul Sewer Network</h3>
<table class="dm-table"><tr><th>Activity</th><th>Test</th><th>Frequency</th><th>Standard</th><th>HP/W</th></tr>
<tr><td>Pipe Material</td><td>MAR uPVC/GRP/Concrete</td><td>Each delivery</td><td>BS EN 295</td><td>HP</td></tr>
<tr><td>Green Marker Tape</td><td>300mm above pipe</td><td>100%</td><td>Ashghal</td><td>W</td></tr>
<tr><td>Pipe Gradient</td><td>Laser level vs IFC drawing</td><td>Every joint</td><td>IFC</td><td>W</td></tr>
<tr><td>Bedding Compaction</td><td>≥ 90% MDD</td><td>Per 50m</td><td>ASTM D1556</td><td>W</td></tr>
<tr><td>Air Test</td><td>100mm WG / 5min / drop ≤ 25mm</td><td>Per section</td><td>BS EN 1610</td><td>HP</td></tr>
<tr><td>CCTV Survey</td><td>100% — Grade ≤ 2</td><td>100%</td><td>WRc</td><td>HP</td></tr>
<tr><td>Manhole Level</td><td>Cover ± 5mm from road</td><td>100%</td><td>Survey</td><td>W</td></tr></table>
</div>
` },
shoring_itp: {
title: '⛏️ ITP — التدعيم والحفريات | QCS 2024 P1 S8 + QHSE',
content: `
<div class="qcs-ref-badge">QCS 2024 — Part 1, Section 8 + Ashghal QHSE</div>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;color:#e74c3c;line-height:1.7;">⛔ <strong>إلزامي:</strong> أي حفرية عمقها >1.2m بدون Shoring Design مُعتمد يُوقف العمل فوراً — QCS P1 S8.4</div>
<table class="dm-table"><thead><tr><th>م</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>QC</th><th>SC</th><th>HP</th></tr></thead><tbody>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">التصميم والموافقة</td></tr>
<tr><td>01</td><td><strong>Shoring Design Submission</strong><br><small>مخططات Geotech مُعتمدة</small></td><td>QCS P1 S8.4.1</td><td>Stamped Design<br>Timber/Sheet Pile/Soldier Pile<br>Method approved before excavation</td><td>Per excavation >1.2m</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>02</td><td><strong>Soil Investigation Check</strong></td><td>QCS P3 S3</td><td>Borehole <50m spacing<br>SPT reviewed<br>GWT confirmed</td><td>Pre-design</td><td>W</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">أثناء التنفيذ</td></tr>
<tr><td>03</td><td><strong>Slope Stability</strong></td><td>OSHA 1926.652 / QCS P1 S8.4</td><td>رمل: 1.5H:1V (34°)<br>طين صلب: 1H:1V (45°)<br>طين رخو: 1.5H:1V</td><td>يومياً + بعد المطر</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>04</td><td><strong>Shoring Installation</strong></td><td>QCS P1 S8.4.3</td><td>Waling/Struts at design levels<br>Penetration ≥ Design<br>لا فراغات خلف Sheet Pile</td><td>كل 2m عمق</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>05</td><td><strong>Excavation Monitoring</strong></td><td>QCS P1 S8.5 / CIRIA C580</td><td>Settlement <25mm<br>Deflection <H/500<br>تقرير Inclinometer يومي</td><td>يومياً</td><td>W</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>06</td><td><strong>Safety & Exclusion Zone</strong></td><td>Ashghal QHSE</td><td>Barricade ≥1.5m<br>PPE: Helmet+Harness<br>إضاءة ≥50 Lux<br>Ladder per 15m</td><td>كل وردية</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">Dewatering — نزح المياه</td></tr>
<tr><td>07</td><td><strong>Dewatering System Design</strong></td><td>QCS P3 S4.2 / BS 8004</td><td>GWT lowered ≥0.5m below excavation<br>Standby pump 100%<br>Pump tested</td><td>قبل الحفر</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>08</td><td><strong>GWT Monitoring</strong></td><td>QCS P3 S4.3</td><td>GWT ≥0.5m below formation<br>تقرير Piezometers يومي</td><td>يومياً</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>09</td><td><strong>Discharge Water Quality</strong></td><td>QCS P24 / Ashghal Env.</td><td>Turbidity ≤50 NTU<br>Silt Trap إلزامي</td><td>يومياً</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>10</td><td><strong>Formation Level Inspection</strong></td><td>QCS P1 S8 / P14 S4.1</td><td>جاف + ≥95% MDD<br>Levels ±20mm<br>Geotech approval</td><td>قبل الإنشاء</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
</tbody></table>
<h3>📐 تصنيف الحفريات</h3>
<table class="dm-table"><thead><tr><th>العمق</th><th>الاشتراط</th><th>نوع الدعم</th><th>المرجع</th></tr></thead><tbody>
<tr><td>< 1.2m</td><td>فحص بصري</td><td>قد لا يلزم</td><td>QCS P1 S8.4</td></tr>
<tr><td>1.2–3.0m</td><td>Shoring Design + MS</td><td>Timber / Trench Box</td><td>QCS P1 S8.4.2</td></tr>
<tr><td>3.0–6.0m</td><td>Licensed Eng. Design</td><td>Sheet Pile / Soldier</td><td>QCS P1 S8.4.3</td></tr>
<tr><td>> 6.0m</td><td>Specialist Contractor</td><td>Secant / Diaphragm Wall</td><td>BS 8004</td></tr>
<tr><td>أي Sabkha</td><td>Dewatering إلزامي</td><td>Wellpoints + Sheet</td><td>IAN-006</td></tr>
</tbody></table>
`},
cctv_itp: {
title: '📹 ITP — CCTV Survey | BS EN 13508 / WRc',
content: `
<div class="qcs-ref-badge">BS EN 13508-2 / WRc Sewer Rehabilitation Manual</div>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;color:#e74c3c;line-height:1.7;">⛔ 100% من خطوط الصرف تحتاج CCTV Survey قبل Handover — بدونها يُرفض Taking-Over Certificate</div>
<table class="dm-table"><thead><tr><th>م</th><th>النشاط</th><th>المرجع</th><th>معيار القبول</th><th>التكرار</th><th>QC</th><th>SC</th><th>HP</th></tr></thead><tbody>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">قبل الفحص</td></tr>
<tr><td>01</td><td><strong>Cleaning & Flushing</strong></td><td>WRc Sec.3.1</td><td>High-pressure jet<br>لا رواسب >10% قطر<br>Water <1/5 diameter</td><td>قبل كل CCTV</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>02</td><td><strong>Camera Calibration</strong></td><td>BS EN 13508-1</td><td>Color HD ≥720p<br>Distance ±0.1m/100m<br>360° lighting</td><td>بداية كل يوم</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">أثناء الفحص</td></tr>
<tr><td>03</td><td><strong>CCTV Survey — Main Lines</strong></td><td>BS EN 13508-2 / WRc</td><td>Speed ≤0.1 m/s<br>كل عيب يُشفَّر EN 13508-2<br>Grade ≤2 = مقبول</td><td>100% خطوط</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>04</td><td><strong>Lateral Connections</strong></td><td>WRc Sec.5.2</td><td>كل فرع مُصوَّر<br>لا infiltration</td><td>100%</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr><td>05</td><td><strong>Manhole Inspection</strong></td><td>WRc Sec.6 / QCS P22 S5</td><td>لا تشققات >3mm<br>Cover ±5mm</td><td>100%</td><td>W</td><td>W</td><td style="color:#f39c12">W</td></tr>
<tr style="background:rgba(122,21,21,.08);color:var(--gold);font-weight:700"><td colspan="8">التقارير</td></tr>
<tr><td>06</td><td><strong>CCTV Report</strong></td><td>BS EN 13508-2</td><td>pipe ID + length + codes<br>Video + photos<br>Defect Map + Grade</td><td>Per session</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>07</td><td><strong>Grade Assessment</strong></td><td>WRc Table 2</td><td>Grade 1: ✅ بلا عيوب<br>Grade 2: ✅ بسيطة<br>Grade 3: ⚠️ متوسط — يُعالَج خلال DLP<br>Grade 4: ❌ شديد<br>Grade 5: ❌ انهيار</td><td>Per pipe</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
<tr><td>08</td><td><strong>Repair Verification</strong></td><td>WRc Sec.7 / BS EN 1610</td><td>Re-run CCTV بعد إصلاح<br>Grade ≤2<br>Air Test يُعاد لـ Grade 3+</td><td>كل إصلاح</td><td>H</td><td>H</td><td style="color:#e74c3c;font-weight:700">H</td></tr>
</tbody></table>
<h3>📊 رموز العيوب — WRc / BS EN 13508-2</h3>
<table class="dm-table"><thead><tr><th>الرمز</th><th>العيب</th><th>Grade</th><th>السبب</th><th>الإجراء</th></tr></thead><tbody>
<tr><td><strong>ABB</strong></td><td>Blockage — انسداد</td><td style="color:#e74c3c">3-5</td><td>رواسب / جذور</td><td>Jetting + Re-CCTV</td></tr>
<tr><td><strong>BAB</strong></td><td>Brick Projection</td><td style="color:#f39c12">2-3</td><td>تشطيب رديء</td><td>Point Repair</td></tr>
<tr><td><strong>DAF</strong></td><td>Deformation</td><td style="color:#e74c3c">3-4</td><td>ردم غير صحيح</td><td>استبدال</td></tr>
<tr><td><strong>FAA</strong></td><td>Fracture — تشقق</td><td style="color:#e74c3c">3-5</td><td>Bedding رديء</td><td>استبدال</td></tr>
<tr><td><strong>IAA</strong></td><td>Infiltration — تسرب</td><td style="color:#f39c12">2-4</td><td>وصلة مكسورة</td><td>Joint Seal</td></tr>
<tr><td><strong>JAA</strong></td><td>Joint Displaced</td><td style="color:#f39c12">2-3</td><td>حركة تربة</td><td>Point Repair</td></tr>
<tr><td><strong>RBB</strong></td><td>Root Intrusion</td><td style="color:#f39c12">2-4</td><td>قرب أشجار</td><td>Cutting + CIPP</td></tr>
</tbody></table>
`},
marker_tape_colors: {
title: '🎨 ألوان شريط التحذير — KAHRAMAA Official Colors',
content: `
<div class="qcs-ref-badge">QCS 2024 — Section 8 + KAHRAMAA Standards</div>
<table class="dm-table"><thead><tr><th>الشبكة</th><th>اللون</th><th>Color</th><th>عمق الشريط</th></tr></thead><tbody>
<tr><td>💧 مياه الشرب — Potable Water</td><td style="background:#FFD700;color:#000;font-weight:700;text-align:center">أصفر</td><td>Yellow</td><td rowspan="7" style="text-align:center;font-weight:700">300mm<br>فوق قمة الماسورة</td></tr>
<tr><td>🚽 صرف صحي — Foul Sewer</td><td style="background:#2ecc71;color:#fff;font-weight:700;text-align:center">أخضر</td><td>Green</td></tr>
<tr><td>🌧️ صرف سطحي — Storm Water</td><td style="background:#95a5a6;color:#fff;font-weight:700;text-align:center">رمادي</td><td>Grey</td></tr>
<tr><td>♻️ مياه معالجة — Treated Water</td><td style="background:#8e44ad;color:#fff;font-weight:700;text-align:center">بنفسجي</td><td>Purple</td></tr>
<tr><td>⚡ كهرباء — Electricity</td><td style="background:#e74c3c;color:#fff;font-weight:700;text-align:center">أحمر</td><td>Red</td></tr>
<tr><td>🔥 غاز — Gas</td><td style="background:#e67e22;color:#fff;font-weight:700;text-align:center">أصفر غامق</td><td>Amber</td></tr>
<tr><td>📡 اتصالات — Telecom</td><td style="background:#3498db;color:#fff;font-weight:700;text-align:center">أزرق</td><td>Blue</td></tr>
</tbody></table>
<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;color:#e74c3c">
⚠️ <strong>تحذير ميداني:</strong> استخدام لون خاطئ = حفر خاطئ في المستقبل = إصابات محتملة + NCR. تأكد من اللون الصحيح قبل الردم.
</div>
`},
pipe_sizing_calc: {
title: '🔧 حاسبة أقطار المواسير — Pipe Sizing',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA + Ashghal Drainage Design Manual</div>
<h3>حاسبة القطر المثالي</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
<div><label style="font-size:11px;color:var(--text3)">نوع الشبكة</label><select class="calc-select" id="pipe-type"><option value="water">💧 مياه شرب</option><option value="sewer">🚽 صرف صحي (gravity)</option><option value="storm">🌧️ صرف سطحي</option></select></div>
<div><label style="font-size:11px;color:var(--text3)">تدفق التصميم Q (L/s)</label><input class="calc-input" id="pipe-q" type="number" step="0.1" style="width:100%" placeholder="15"></div>
<div><label style="font-size:11px;color:var(--text3)">الانحدار % (gravity فقط)</label><input class="calc-input" id="pipe-slope" type="number" step="0.01" style="width:100%" placeholder="0.5"></div>
<div><label style="font-size:11px;color:var(--text3)">ضغط التشغيل PN (bar) — مياه فقط</label><input class="calc-input" id="pipe-pn" type="number" style="width:100%" placeholder="10"></div>
</div>
<button class="calc-btn" onclick="calcPipeSize()">🔧 احسب القطر</button>
<div class="calc-result" id="pipe-result"></div>
<h3>جدول السرعات المسموحة</h3>
<table class="dm-table"><thead><tr><th>الشبكة</th><th>Min Velocity</th><th>Max Velocity</th><th>ملاحظة</th></tr></thead><tbody>
<tr><td>مياه شرب</td><td>0.3 m/s</td><td>3.0 m/s</td><td>KAHRAMAA</td></tr>
<tr><td>Foul Sewer</td><td>0.6 m/s (self-cleansing)</td><td>3.0 m/s</td><td>BS EN 752</td></tr>
<tr><td>Storm Water</td><td>0.6 m/s</td><td>4.5 m/s</td><td>Ashghal Drainage Manual</td></tr>
</tbody></table>
`},
pipe_quick_ref: {
title: '🔧 مرجع سريع — اختيار المواسير',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA + Ashghal Standards</div>
<table class="dm-table"><thead><tr><th>الشبكة</th><th>المادة</th><th>القطر</th><th>Class/PN</th><th>Velocity</th><th>KAHRAMAA</th></tr></thead><tbody>
<tr style="background:rgba(241,196,15,.06)"><td colspan="6" style="color:var(--gold);font-weight:700">💧 مياه الشرب — Potable Water</td></tr>
<tr><td>توزيع</td><td>HDPE PE100</td><td>63-315mm</td><td>PN16 SDR11</td><td>0.3-3.0 m/s</td><td>✅ معتمد</td></tr>
<tr><td>نقل رئيسي</td><td>DI (Ductile Iron)</td><td>300-2000mm</td><td>K9/K12</td><td>0.5-2.5 m/s</td><td>✅ معتمد</td></tr>
<tr><td>توصيلات</td><td>HDPE PE100</td><td>25-63mm</td><td>PN16 SDR11</td><td>0.3-2.0 m/s</td><td>✅ معتمد</td></tr>
<tr style="background:rgba(46,204,113,.06)"><td colspan="6" style="color:#2ecc71;font-weight:700">🚽 صرف صحي — Foul Sewer</td></tr>
<tr><td>فروع</td><td>uPVC SN8</td><td>160-315mm</td><td>SN8</td><td>0.6-3.0 m/s</td><td>—</td></tr>
<tr><td>رئيسي</td><td>GRP</td><td>300-2400mm</td><td>SN5000+</td><td>0.6-3.0 m/s</td><td>—</td></tr>
<tr><td>عمق كبير</td><td>RC Pipe</td><td>300-3000mm</td><td>Class 120+</td><td>0.6-3.0 m/s</td><td>—</td></tr>
<tr style="background:rgba(149,165,166,.06)"><td colspan="6" style="color:#95a5a6;font-weight:700">🌧️ صرف سطحي — Storm Water</td></tr>
<tr><td>فروع</td><td>uPVC SN8</td><td>200-630mm</td><td>SN8</td><td>0.6-4.5 m/s</td><td>—</td></tr>
<tr><td>رئيسي</td><td>GRP/RC</td><td>600-3000mm</td><td>SN10000/Class 180</td><td>0.6-4.5 m/s</td><td>—</td></tr>
<tr style="background:rgba(142,68,173,.06)"><td colspan="6" style="color:#8e44ad;font-weight:700">♻️ مياه معالجة — TSE/Treated</td></tr>
<tr><td>الكل</td><td>uPVC/HDPE بنفسجي</td><td>63-630mm</td><td>PN10/16</td><td>0.3-3.0 m/s</td><td>—</td></tr>
</tbody></table>
`},
kahramaa_standards: {
title: '⚡ KAHRAMAA Technical Standards — المعايير الفنية',
content: `
<div class="qcs-ref-badge">KAHRAMAA — Qatar General Electricity & Water Corporation</div>
<h3>المواد المعتمدة — Approved Materials Categories</h3>
<table class="dm-table"><thead><tr><th>الفئة</th><th>المواد</th><th>المعيار</th><th>الاعتماد</th></tr></thead><tbody>
<tr><td>Pipes — Distribution</td><td>HDPE PE100 Blue</td><td>ISO 4427 / BS EN 12201</td><td>KAHRAMAA Approved List</td></tr>
<tr><td>Pipes — Transmission</td><td>DI (Ductile Iron)</td><td>BS EN 545</td><td>KAHRAMAA Approved List</td></tr>
<tr><td>Fittings</td><td>DI / PE Electrofusion</td><td>ISO 8085 / BS EN 12201</td><td>Factory tested + cert</td></tr>
<tr><td>Valves — Gate</td><td>DI Resilient Seated</td><td>BS EN 1074 / BS 5163</td><td>Type Tested</td></tr>
<tr><td>Valves — Butterfly</td><td>DI Body + Disc</td><td>BS EN 593</td><td>Type Tested</td></tr>
<tr><td>Fire Hydrant</td><td>DI BS Pattern</td><td>BS 750</td><td>KAHRAMAA spec</td></tr>
<tr><td>Meters</td><td>Multi-jet / Ultrasonic</td><td>ISO 4064</td><td>KAHRAMAA approved</td></tr>
</tbody></table>
<h3>Connection Standards — معايير التوصيل</h3>
<table class="dm-table"><thead><tr><th>النوع</th><th>القطر</th><th>Meter Size</th><th>Chamber</th></tr></thead><tbody>
<tr><td>Villa — فيلا</td><td>25-32mm PE</td><td>25mm</td><td>Ground level box</td></tr>
<tr><td>Building — مبنى</td><td>50-100mm PE/DI</td><td>50-100mm</td><td>Concrete chamber</td></tr>
<tr><td>Commercial — تجاري</td><td>100-200mm DI</td><td>100-150mm</td><td>Concrete chamber + BFV</td></tr>
<tr><td>Industrial — صناعي</td><td>Per design</td><td>Per design</td><td>Per KAHRAMAA approval</td></tr>
</tbody></table>
<h3>Pressure Zones — مفهوم مناطق الضغط</h3>
<table class="dm-table"><thead><tr><th>Zone</th><th>Ground Level</th><th>Static Pressure</th><th>Min Residual</th></tr></thead><tbody>
<tr><td>Low Zone</td><td>0-15m ASL</td><td>3-6 bar</td><td>1.5 bar</td></tr>
<tr><td>Medium Zone</td><td>15-40m ASL</td><td>4-7 bar</td><td>2.0 bar</td></tr>
<tr><td>High Zone</td><td>>40m ASL</td><td>Boosted 5-8 bar</td><td>2.0 bar</td></tr>
</tbody></table>
`},
exec_water_pipe: {
title: '💧 آلية تنفيذ — مد مواسير المياه | Water Pipe Laying',
content: `
<div class="qcs-ref-badge">QCS 2024 S8 + KAHRAMAA Standards + BS EN 805</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
<button onclick="showExecStep('wp',1)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">① التحضير</button>
<button onclick="showExecStep('wp',2)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">② التنفيذ</button>
<button onclick="showExecStep('wp',3)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">③ مراقبة الجودة</button>
<button onclick="showExecStep('wp',4)" style="background:var(--dark4);border:1px solid var(--gold);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--gold);cursor:pointer;font-family:Tajawal;font-weight:700">④ الأخطاء الشائعة</button>
</div>

<div id="wp-step-1">
<h3 style="color:var(--gold2)">① التحضير</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th><th>المرجع</th></tr></thead><tbody>
<tr><td>NOC</td><td>Ashghal حفر permit + KAHRAMAA connection approval</td><td>Ashghal ROW</td></tr>
<tr><td>GPR Scan</td><td>كشف المرافق القائمة — تقرير مُعتمد</td><td>Ashghal Safety</td></tr>
<tr><td>المواسير</td><td>HDPE PE100 Blue SDR11 PN16 — KAHRAMAA approved</td><td>ISO 4427</td></tr>
<tr><td>Fittings</td><td>Electrofusion — certified + calibrated machine</td><td>BS EN 12201</td></tr>
<tr><td>Shoring</td><td>Design مُعتمد إذا عمق >1.2m</td><td>QCS P1 S8.4</td></tr>
<tr><td>PPE</td><td>خوذة + سترة + حذاء + قفازات — 100%</td><td>QHSE</td></tr>
</tbody></table>
</div>

<div id="wp-step-2" style="display:none">
<h3 style="color:var(--gold2)">② تسلسل التنفيذ</h3>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">1</div><div style="font-size:12px"><strong>Survey + Setting Out</strong> — Total Station | Invert levels كل 25m | CH markers<br><span style="color:#e74c3c">HP: SC يعتمد المناسيب</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">2</div><div style="font-size:12px"><strong>الحفر</strong> — عرض DN+600mm | عمق ≥900mm تحت الطريق | Shoring >1.2m<br>Dewatering إذا GWT < 0.5m تحت القاع — <span style="color:var(--gold)">QCS S8</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">3</div><div style="font-size:12px"><strong>Bedding</strong> — 150mm clean sand/Type 1 | دمك ≥90% | Level ±10mm<br><span style="color:#f39c12">WP: تحقق من المادة والسماكة</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">4</div><div style="font-size:12px"><strong>Pipe Laying + Jointing</strong> — Electrofusion per ISO 12176 | Cool time per table<br>Thrust blocks C20 عند تغيير الاتجاه >11.25° — <span style="color:#e74c3c">HP: كل وصلة</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">5</div><div style="font-size:12px"><strong>Pressure Test</strong> — 1.5 × PN لمدة 2 ساعة | Drop ≤ 0.1 bar<br><span style="color:#e74c3c">HP: لا ردم بدون اعتماد — QCS S8 + KAHRAMAA</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">6</div><div style="font-size:12px"><strong>Chlorination + Flushing</strong> — 50 ppm لمدة 24 ساعة → Flushing → Bacteriological test<br><span style="color:#e74c3c">HP: لا تشغيل بدون نتيجة سلبية — KAHRAMAA</span></div></div>
<div style="display:flex;gap:10px;margin-bottom:6px;padding:10px;background:var(--dark4);border:1px solid var(--border);border-radius:8px"><div style="min-width:24px;height:24px;background:rgba(201,168,76,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold)">7</div><div style="font-size:12px"><strong>Backfill</strong> — Initial: 200mm above crown حذر | Main: layers ≤200mm ≥95% MDD<br>Marker Tape أصفر 300mm فوق الماسورة — <span style="color:var(--gold)">QCS S8</span></div></div>
</div>
</div>

<div id="wp-step-3" style="display:none">
<h3 style="color:var(--gold2)">③ مراقبة الجودة</h3>
<table class="dm-table"><thead><tr><th>الاختبار</th><th>المعيار</th><th>القبول</th><th>التكرار</th><th>HP</th></tr></thead><tbody>
<tr><td>Pressure Test</td><td>BS EN 805</td><td>1.5×PN | 2hr | drop ≤0.1bar</td><td>Per section ≤500m</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Chlorination</td><td>KAHRAMAA</td><td>≥50 ppm / 24hr</td><td>Per section</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Bacteriological</td><td>WHO</td><td>0 Coliform/100ml</td><td>Per section</td><td style="color:#e74c3c">HP</td></tr>
<tr><td>Backfill Density</td><td>ASTM D1556</td><td>≥95% MDD</td><td>1/50m</td><td style="color:#f39c12">W</td></tr>
<tr><td>Joint Inspection</td><td>ISO 12176</td><td>Visual + bead check</td><td>100%</td><td style="color:#e74c3c">HP</td></tr>
</tbody></table>
</div>

<div id="wp-step-4" style="display:none">
<h3 style="color:var(--gold2)">④ أخطاء شائعة</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>التجنب</th><th>التصحيح</th></tr></thead><tbody>
<tr><td style="color:#e74c3c">Pipe exposed to sun >24hr</td><td>تغطية فورية بعد التوريد</td><td>فحص UV damage + اختبار</td></tr>
<tr><td style="color:#e74c3c">Contaminated interior</td><td>أغطية نهايات إلزامية</td><td>Flushing مكثف + re-chlorination</td></tr>
<tr><td style="color:#e74c3c">Wrong marker tape color</td><td>أصفر فقط لمياه الشرب</td><td>إعادة ردم + اللون الصحيح</td></tr>
<tr><td style="color:#f39c12">Fusion in rain/wind</td><td>Shelter إلزامي أثناء اللحام</td><td>قطع الوصلة + إعادة</td></tr>
<tr><td style="color:#f39c12">No Thrust Block</td><td>كل bend >11.25° يحتاج</td><td>حفر + صب C20 + انتظار 7 أيام</td></tr>
</tbody></table>
</div>
`},
exec_pressure_test: {
title: '💪 آلية تنفيذ — اختبار الضغط | Pressure Testing',
content: `
<div class="qcs-ref-badge">KAHRAMAA + BS EN 805 + QCS 2024 S8</div>
<h3>① التحضير</h3>
<table class="dm-table"><thead><tr><th>البند</th><th>الاشتراط</th></tr></thead><tbody>
<tr><td>Section Length</td><td>≤500m per test — all joints exposed</td></tr>
<tr><td>End Caps</td><td>Welded/flanged — rated for test pressure</td></tr>
<tr><td>Thrust Blocks</td><td>Cured ≥7 أيام قبل الاختبار</td></tr>
<tr><td>Equipment</td><td>Calibrated gauge ±0.1 bar + pump + recorder</td></tr>
<tr><td>Fill + Bleed</td><td>Fill slowly from low point — bleed air from high point</td></tr>
<tr><td>Stabilization</td><td>24hr pre-pressurization soak — let pipe absorb</td></tr>
</tbody></table>
<h3>② إجراء الاختبار</h3>
<table class="dm-table"><thead><tr><th>الخطوة</th><th>الإجراء</th><th>المرجع</th></tr></thead><tbody>
<tr><td>1. Pressurize</td><td>رفع الضغط تدريجياً إلى <strong>1.5 × PN</strong></td><td>BS EN 805 Cl.11</td></tr>
<tr><td>2. Hold</td><td>الحفاظ على الضغط <strong>2 ساعات</strong></td><td>KAHRAMAA Spec</td></tr>
<tr><td>3. Monitor</td><td>تسجيل الضغط كل 15 دقيقة</td><td>QCS S8</td></tr>
<tr><td style="color:#2ecc71;font-weight:700">4. Pass Criteria</td><td>Drop ≤ <strong>0.1 bar</strong> في 2 ساعات</td><td>KAHRAMAA</td></tr>
<tr><td style="color:#e74c3c;font-weight:700">5. Fail</td><td>Drop > 0.1 bar → find leak → repair → re-test</td><td>—</td></tr>
</tbody></table>
<h3>③ أخطاء شائعة</h3>
<table class="dm-table"><thead><tr><th>الخطأ</th><th>النتيجة</th><th>التصحيح</th></tr></thead><tbody>
<tr><td>Trapped air</td><td>False fail — pressure drops</td><td>Re-bleed from high points</td></tr>
<tr><td>Thrust block not cured</td><td>Movement → joint leak</td><td>Wait 7 days + re-test</td></tr>
<tr><td>Gauge not calibrated</td><td>Invalid test</td><td>Calibrated gauge + re-test</td></tr>
<tr><td>Test in hot sun</td><td>Thermal expansion = false readings</td><td>Test early morning or shade pipe</td></tr>
</tbody></table>
`},
utilities_equipment: { title: '🔧 معدات أعمال المرافق — Utilities Equipment', content: `
<div style="background:rgba(52,152,219,0.08);border:1px solid rgba(52,152,219,0.2);border-radius:10px;padding:10px;margin-bottom:14px;font-size:12px;color:#3498db;">
📌 QCS 2024 Sections 7 & 8 — Pipe Laying, Pressure Testing, CCTV
</div>
<div style="display:flex;flex-direction:column;gap:10px;">

${[
{emoji:'⛏️',name:'Excavator / Backhoe',ar:'الحفارة / الباكهو',ref:'QCS S7 P3 + OSHA',desc:'حفر الخنادق والحفريات للشبكات',cap:'0.3-1.0m³ bucket',sets:{Bucket:'0.3-0.5m³ للخنادق الضيقة','Track Width':'Min 500mm للخنادق','Working Radius':'Max 6m reach','Trench Width':'OD + 2×300mm min haunch'},qc:['GPR Scan قبل الحفر — كشف المرافق القائمة','NOC من Ashghal + permit','قياس عمق الخندق كل 20m','شورينج للعمق >1.2m'],acc:'Trench width: OD+600mm min | Bed Level: ±20mm | Slope as design',safe:'Exclusion Zone 2m من حافة الحفر | Spotter إلزامي'},
{emoji:'🏗️',name:'Pipe Layer Crane',ar:'رافعة مد الأنابيب',ref:'QCS S7 P4.2',desc:'رفع ومد الأنابيب الثقيلة وتحديد الموضع',cap:'3-10 tonnes SWL',sets:{Slings:'Nylon slings — no metal on pipes','Lift Angle':'Max 60° from horizontal','Speed':'Slow controlled lowering','Bedding':'Check Grade before lowering'},qc:['شهادة صلاحية الرافعة (3rd party tested)','Rigging Plan معتمد','فحص Grade (Laser Level) قبل الإنزال','Pipe joints aligned before lowering'],acc:'Grade: Design ±5mm | Alignment: ±10mm | Joint gap: per pipe spec',safe:'لا أحد تحت الحمولة المرفوعة — Zone Clear'},
{emoji:'🔥',name:'HDPE Butt Fusion Machine',ar:'ماكينة لحام HDPE (Butt Fusion)',ref:'QCS S8 P2.4 + ISO 21307',desc:'لحام أنابيب HDPE بالحرارة والضغط',cap:'DN63-1200mm (حسب الموديل)',sets:{'Heater Plate Temp':'200-220°C','Heating Pressure':'≤0.15 bar (min)','Fusion Pressure':'per pipe SDR','Cooling Time':'Min 30 min (ambient)'},qc:['Bead Width: 2×3mm (مزدوج)','Bead Shape: Symmetric + Rolled back','التحقق من درجة حرارة الـ Heater كل 30min','Log sheet لكل وصلة (رقم، وقت، ضغط)'],acc:'Bead Width ±20% من القياسي | No cracks | No cold fusion',safe:'قفازات حرارية + درع وجه عند استخدام Heater'},
{emoji:'💧',name:'Hydrostatic Test Pump',ar:'مضخة اختبار الضغط',ref:'QCS S8 P5.2',desc:'اختبار محكمية خطوط المياه',cap:'Up to 25 bar test pressure',sets:{'Pressure Source':'Manual or electric pump','Gauge Accuracy':'±0.1 bar (calibrated)','Fill Speed':'Slow — purge air first','Stabilize':'30 min before test clock'},qc:['معايرة المانومتر (6 أشهر)','تصريف الهواء الكامل قبل الاختبار','تسجيل القراءة كل 30min خلال 2hr','Leakage check بالعين + Soap solution'],acc:'Test Pressure = 1.5×PN | Drop ≤0.2 bar / 2hr | Zero visible leaks',safe:'فصل قطاعات ≤1000m | خوذة + بُعد عند الضغط العالي'},
{emoji:'📹',name:'CCTV Camera (Sewer)',ar:'كاميرا CCTV للصرف الصحي',ref:'QCS S7 P7 + BS EN 13508',desc:'فحص الأنابيب المدفونة من الداخل وتصنيف العيوب',cap:'DN100-2000mm coverage',sets:{Crawlers:'Self-propelled — min 4 wheels','Camera':'360° rotating HD','Lighting':'LED Kaleidoscope','Software':'WinCan / Granite XP'},qc:['تنظيف الماسورة قبل CCTV (Jetting)','Speed ≤ 0.3 m/s خلال التصوير','تصنيف العيوب وفق WRc Grade System','PDF Report + Video file'],acc:'All defects Grade ≥3 → Remediation | Report within 5 days',safe:'Confined Space Entry Permit إذا دخل شخص | مراقبة الغازات'},
{emoji:'🔨',name:'Trench Compaction Rammer',ar:'دكاكة الخنادق (Rammer)',ref:'QCS S7 P5 + S8 P5',desc:'دمك التعبئة الرملية حول وفوق الأنابيب في الخنادق الضيقة',cap:'60-100kg rammer | 25-75mm lifts',sets:{Lift:'Max 200mm loose per lift','Compaction':'Min 3 passes / lift','Haunch':'Hand compact only — no heavy equipment'},qc:['لا دمك مباشر فوق الأنبوب','Sand Cone كل 100m خندق','الارتفاع من Haunch: يدوي → رامر → حتى Finished Level'],acc:'≥95% MDD (Haunching & Initial) | ≥98% MDD (Final Backfill)',safe:'لا تدخل الخندق أثناء التشغيل | حافة +300mm clearance'},
{emoji:'🧪',name:'Chlorination Equipment',ar:'معدات التعقيم بالكلور (Chlorination)',ref:'QCS S8 P6 + KAHRAMAA + WHO',desc:'تعقيم خطوط مياه الشرب بعد الاختبار',cap:'Dosing: 20-50 mg/L Cl₂',sets:{'Chlorine Source':'Sodium Hypochlorite 10% | Chlorine Gas','Contact Time':'Min 24 hours','Residual Target':'≥0.2 mg/L after flushing','Flush Volume':'3× pipe volume'},qc:['قياس Residual Chlorine بعد 24hr','Bacteriological Sample من 3 نقاط','تقرير معتمد من مختبر KAHRAMAA مُعتمد','Flush حتى Residual ≤0.5 mg/L'],acc:'Residual ≥0.2 mg/L | E.coli = 0 | Coliform = 0 | pH 6.5-8.5',safe:'Handling Hypochlorite: قفازات + نظارات + تهوية | No Mixing مع المواد الحمضية'},
].map(function(e){return `
<div style="background:var(--dark3);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
  <div style="background:rgba(52,152,219,0.08);padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)">
    <span style="font-size:24px">${e.emoji}</span>
    <div><div style="font-size:14px;font-weight:700;color:var(--text)">${e.ar}</div><div style="font-size:10px;color:#3498db">${e.ref}</div></div>
  </div>
  <div style="padding:12px 14px">
    <p style="font-size:12px;color:var(--text2);margin-bottom:10px">${e.desc} — <strong style="color:var(--text3)">الطاقة: ${e.cap}</strong></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#3498db;font-weight:700;margin-bottom:6px">⚙️ الإعدادات</div>
        ${Object.entries(e.sets).map(([k,v])=>`<div style="font-size:11px;color:var(--text2);display:flex;justify-content:space-between;gap:4px"><span>${k}:</span><span style="color:var(--text);font-weight:600">${v}</span></div>`).join('')}
      </div>
      <div style="background:var(--dark4);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#3498db;font-weight:700;margin-bottom:6px">✅ فحوصات QC</div>
        ${e.qc.map(c=>`<div style="font-size:11px;color:var(--text2);margin-bottom:3px">• ${c}</div>`).join('')}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <div style="background:rgba(76,175,80,0.08);border:1px solid rgba(76,175,80,0.2);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#4CAF50;font-weight:700;margin-bottom:4px">📐 معيار القبول</div>
        <div style="font-size:11px;color:var(--text2)">${e.acc}</div>
      </div>
      <div style="background:rgba(231,76,60,0.06);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:8px">
        <div style="font-size:10px;color:#e74c3c;font-weight:700;margin-bottom:4px">⚠️ السلامة</div>
        <div style="font-size:11px;color:var(--text2)">${e.safe}</div>
      </div>
    </div>
  </div>
</div>`}).join('')}
</div>
`},
});