// QatarSpec Pro — Content: utilities
(function(){
  var c=window.QS_CONTENT=window.QS_CONTENT||{};
  c["utilities"] = { title: '🔧 المرافق — شبكات المياه والصرف', content: `
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

<h3 style="margin-top:16px">📊 ملخص متطلبات QCS 2024 — المرافق</h3>
<table class="dm-table">
<tr><th>الخدمة</th><th>Cover min</th><th>Bedding</th><th>Test</th><th>QCS</th></tr>
<tr><td><strong>مياه الشرب</strong></td><td>750mm (طريق رئيسي)</td><td>150mm Clean Sand</td><td>1.5×PN / 2h</td><td>S8 P12</td></tr>
<tr><td><strong>Foul Sewer</strong></td><td>600mm min</td><td>Granular 150mm</td><td>Air/Water Test</td><td>S8 P14</td></tr>
<tr><td><strong>Storm Drain</strong></td><td>600mm min</td><td>حسب القطر</td><td>Water Test</td><td>S8 P15</td></tr>
<tr><td><strong>مياه معالجة</strong></td><td>750mm (طريق)</td><td>150mm Sand</td><td>1.5×PN / 2h</td><td>S8 P13</td></tr>
<tr><td><strong>كهرباء KAHRAMAA</strong></td><td>600mm (رصيف) / 750mm (طريق)</td><td>100mm Sand</td><td>Insulation Test</td><td>ER-001</td></tr>
</table>
<table class="dm-table">
<tr><th>المتطلب</th><th>القيمة</th><th>QCS/KAHRAMAA</th></tr>
<tr><td>Backfill Compaction</td><td>≥ 95% MDD (حول ماسورة) / 98% (Trench)</td><td>QCS S8 P12</td></tr>
<tr><td>Pipe Bedding (Haunching)</td><td>حتى 0.3D فوق قمة الماسورة</td><td>QCS S8 P12</td></tr>
<tr><td>Marker Tape Depth</td><td>150-200mm فوق الخدمة</td><td>KAHRAMAA</td></tr>
<tr><td>Separation بين الخدمات</td><td>300mm أفقي / 150mm رأسي</td><td>KAHRAMAA</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Utilities Networks
</div>
<h3>🔧 Select Network</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div onclick="QS.openDetail('water_supply_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">💧</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Water Supply</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Pressure 1.5× | Chlorination 50ppm</div></div>
<div onclick="QS.openDetail('sewer_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Foul Sewer</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Air Test 100mm | CCTV 100%</div></div>
<div onclick="QS.openDetail('storm_drainage_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">🌧️</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Storm Drainage</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Hydraulic Test | CCTV Survey</div></div>
<div onclick="QS.openDetail('treated_water_stages')" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:14px;cursor:pointer;text-align:center;">
<div style="font-size:28px">♻️</div><div style="color:var(--gold);font-weight:700;font-size:14px;">Treated Water</div>
<div style="color:var(--text3);font-size:11px;margin-top:4px;">Pressure + Cross-connection</div></div>
</div>
<table class="dm-table" style="margin-top:16px;">
<tr><th>Network</th><th>Key Test</th><th>Standard</th><th>Acceptance</th></tr>
<tr><td>💧 Water Supply</td><td>Pressure 1.5×PN / 2hr</td><td>KAHRAMAA</td><td>Zero drop</td></tr>
<tr><td>🔩 Foul Sewer</td><td>Air Test 100mm Hg / 5min</td><td>Ashghal</td><td>Drop ≤ 25mm</td></tr>
<tr><td>🌧️ Storm Water</td><td>Hydraulic / CCTV 100%</td><td>Ashghal</td><td>Grade ≤ B2</td></tr>
<tr><td>♻️ Treated Water</td><td>Pressure + Cross-connection</td><td>MME</td><td>Zero leakage</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;">
⚠️ <strong>Mandatory Separation:</strong> Water ≥ 1.0m horizontal from foul sewer. Water ALWAYS above sewer (min 300mm vertical).
</div>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
🎨 <strong>Marker Tape Colours:</strong> 🟡 Yellow = Water | 🟢 Green = Foul Sewer | 🔵 Blue = Storm | 🟣 Purple = Treated
</div>
</div>
` };
  c["ms_utilities"] = { title: '📋 Method Statement — Utilities Works', content: `
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
` };
  c["ws_laying"] = { title: '🔧 مياه الشرب — وضع المواسير', content: `
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
<h3>💧 Water Supply — Pipe Laying</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Cover (Min)</td><td>900mm to top of pipe (carriageway)</td><td>KAHRAMAA</td></tr>
<tr><td>Level Tolerance</td><td>±10mm invert level</td><td>KAHRAMAA</td></tr>
<tr><td>Gradient</td><td>Continuous fall towards washouts (min 1:500)</td><td>KAHRAMAA</td></tr>
<tr><td>Joint Deflection</td><td>Max 3° per joint (push-fit DI)</td><td>BS EN 545</td></tr>
<tr><td>Anchor Blocks</td><td>Concrete thrust blocks at all bends + tees</td><td>KAHRAMAA</td></tr>
<tr><td>Separation from Sewer</td><td>Min 1.0m horizontal / water ABOVE sewer</td><td>QCS 2024</td></tr>
<tr><td>Pipe Bedding</td><td>Granular Type B / 100mm under / 300mm above</td><td>KAHRAMAA</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: KAHRAMAA inspector must witness pipe jointing and approve invert levels before backfilling.
</div>
</div>
</div>
` };
  c["ws_excavation"] = { title: '⛏️ مياه الشرب — الحفر والبيدنج', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Water Supply — Excavation Phase
</div>
<h3>💧 Water Main Excavation — Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Trench Width</td><td>Pipe OD + 300mm each side</td><td>KAHRAMAA</td></tr>
<tr><td>Depth (Cover)</td><td>Min 900mm to top of pipe</td><td>KAHRAMAA</td></tr>
<tr><td>Formation Level</td><td>±10mm of design invert</td><td>KAHRAMAA</td></tr>
<tr><td>Dewatering</td><td>Trench dry before laying — continuous pump</td><td>KAHRAMAA</td></tr>
<tr><td>Separation from Sewer</td><td>Min 1.0m horizontal / water always above sewer</td><td>QCS 2024</td></tr>
<tr><td>Rock Excavation</td><td>100mm cushion below pipe (sand)</td><td>KAHRAMAA</td></tr>
</table>
<div style="background:rgba(52,152,219,0.1);border:1px solid rgba(52,152,219,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
ℹ️ KAHRAMAA permit and approved drawings required before any excavation on water mains.
</div>
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
` };
  c["ws_backfill"] = { title: '🏗️ مياه الشرب — الردم والتشطيب', content: `
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
` };
  c["ws_survey"] = { title: '📐 مياه الشرب — الدراسة والتصميم', content: `
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
<h3>💧 Water Supply — Pre-Construction Survey</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Existing Utilities Survey</td><td>Red line survey before any work</td><td>KAHRAMAA</td></tr>
<tr><td>Ground Level Survey</td><td>±10mm accuracy / every 20m</td><td>KAHRAMAA</td></tr>
<tr><td>Pipe Route Survey</td><td>Confirmed against approved drawings</td><td>KAHRAMAA</td></tr>
<tr><td>Soil Investigation</td><td>SO3 + Cl content verified</td><td>BS 1377</td></tr>
<tr><td>Permit Approval</td><td>KAHRAMAA + Ashghal + MME</td><td>Qatar Law</td></tr>
<tr><td>Traffic Management Plan</td><td>Submitted + approved before work</td><td>Ashghal</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ No excavation before all permits received and existing utilities located + marked on site.
</div>
</div>
</div>
` };
  c["ws_disinfection"] = { title: '💊 مياه الشرب — التعقيم والتشغيل', content: `
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
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Water Network Disinfection &amp; Flushing</span></div>
<button data-action="uploadFile" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<div id="vid-ph-ws-disinfection-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">Chlorination ≥50 ppm / ≥24 hr, water quality testing</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 1 | Disinfection &amp; Commissioning</div>
<h3>📐 Disinfection Procedure</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th></tr></thead>
<tbody>
<tr><td>Disinfectant</td><td>Sodium Hypochlorite or Chlorine Gas</td></tr>
<tr><td>Chlorine Concentration</td><td>Minimum 50 mg/L (ppm)</td></tr>
<tr><td>Contact Period</td><td>Minimum 24 hours</td></tr>
<tr><td>Post-Disinfection Flushing</td><td>Until Residual Chlorine ≤ 0.5 ppm</td></tr>
</tbody>
</table>
<h3>🧪 Water Quality Tests — KAHRAMAA Requirements</h3>
<table class="dm-table">
<thead><tr><th>Test</th><th>Standard</th><th>Authority</th></tr></thead>
<tbody>
<tr><td>Total Coliform</td><td>Zero / 100 ml</td><td>KAHRAMAA Laboratory</td></tr>
<tr><td>E. Coli</td><td>Zero / 100 ml</td><td>KAHRAMAA Laboratory</td></tr>
<tr><td>Residual Chlorine</td><td>0.2 – 0.5 ppm</td><td>On-site measurement</td></tr>
<tr><td>Turbidity</td><td>≤ 1 NTU</td><td>KAHRAMAA Laboratory</td></tr>
<tr><td>pH</td><td>6.5 – 8.5</td><td>On-site measurement</td></tr>
</tbody>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-06:</strong> Written KAHRAMAA approval of water quality results required before commissioning</p>
<h3>⚠️ Critical Warning</h3>
<p>Network must NOT be commissioned without written KAHRAMAA approval!</p>
</div>
` };
  c["ws_handover"] = { title: '✅ مياه الشرب — التسليم', content: `
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
` };
  c["water_supply_stages"] = { title: '💧 شبكة مياه الشرب', content: `
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
` };
  c["itp_water_supply"] = { title: '📋 ITP — شبكة مياه الشرب', content: `<div class="lang-content-ar"><div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;">📌 المرجع: QCS S8 P12 | S8 P13 | KAHRAMAA WR-001 | BS EN 805 | AWWA C600</div><table class="dm-table"><tr><th>SN</th><th>النشاط</th><th>معيار القبول</th><th>التكرار</th><th>LAB</th><th>QC</th><th>SC</th></tr><tr><td>1.1</td><td>Material Approval</td><td>ISO Certificate قبل التوريد</td><td>كل دفعة</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>3.1</td><td>Trench Depth & Width</td><td>≥ 1.0m | OD + 600mm</td><td>كل 50m</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#f1c40f;font-weight:700;">W</td></tr><tr><td>5.1</td><td>Hydrostatic Pressure Test</td><td>1.5x / ساعتان / صفر انخفاض</td><td>كل Section</td><td>—</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr><tr><td>6.2</td><td>Bacteriological Test</td><td>Total Coliform = 0 / 100ml</td><td>كل Section</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td><td style="color:#e74c3c;font-weight:700;">H</td></tr></table><div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:12px;font-size:12px;"><strong style="color:#e74c3c;">H</strong> = Hold Point | <strong style="color:#f1c40f;">W</strong> = Witness | <strong style="color:#2ecc71;">R</strong> = Review</div></div>
<div class="lang-content-en" style="display:none;">
<h3>💧 Water Supply — Full ITP</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Material Approval</td><td>Mill cert + DI test</td><td>KAHRAMAA approved</td><td>W</td></tr>
<tr><td>Excavation</td><td>Level + separation</td><td>1.0m from sewer</td><td>W</td></tr>
<tr><td>Bedding</td><td>Granular + compaction</td><td>95% MDD</td><td>H</td></tr>
<tr><td>Pipe Laying</td><td>Level + joint quality</td><td>±10mm / joint pass</td><td>H</td></tr>
<tr><td>Yellow Tape</td><td>Position check</td><td>300mm above crown</td><td>W</td></tr>
<tr><td>Thrust Blocks</td><td>Concrete at bends/tees</td><td>Per design</td><td>W</td></tr>
<tr><td>Pressure Test</td><td>1.5×PN / 2hr</td><td>Zero drop</td><td>H</td></tr>
<tr><td>Chlorination</td><td>≥50ppm / 24hr</td><td>Residual ≥0.2ppm</td><td>H</td></tr>
<tr><td>Bacteriological</td><td>E.coli + Total Coliform</td><td>Zero coliforms</td><td>H</td></tr>
<tr><td>Backfill Density</td><td>1/50m trench</td><td>≥95% MDD</td><td>W</td></tr>
</table>
</div></div>
` };
  c["itp_treated"] = { title: '📋 ITP — شبكة المياه المعالجة | Treated Water', content: `<div class="lang-content-ar">
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
<h3>♻️ Treated Water — Full ITP</h3>
<table class="dm-table">
<tr><th>Activity</th><th>Test</th><th>Acceptance</th><th>Type</th></tr>
<tr><td>Material (Pipe)</td><td>Certificate + wall thickness</td><td>MME approved purple</td><td>W</td></tr>
<tr><td>Excavation</td><td>Level + separation check</td><td>≥1.5m from potable</td><td>H</td></tr>
<tr><td>Bedding</td><td>Granular + compaction</td><td>95% MDD</td><td>H</td></tr>
<tr><td>Pipe Laying</td><td>Level + joint quality</td><td>±10mm / joint pass</td><td>H</td></tr>
<tr><td>Purple Tape</td><td>Position check</td><td>300mm above crown</td><td>W</td></tr>
<tr><td>Pressure Test</td><td>1.5×PN / 2hr</td><td>Zero leakage + zero drop</td><td>H</td></tr>
<tr><td>Flushing</td><td>≥1.5 m/s velocity</td><td>Clear discharge</td><td>W</td></tr>
<tr><td>Bacteriological</td><td>E.coli + Coliform</td><td>Zero coliforms</td><td>H</td></tr>
<tr><td>Cross-connection Test</td><td>Isolation + pressure</td><td>Zero cross-connection</td><td>H</td></tr>
<tr><td>MME Approval</td><td>Documentation review</td><td>Written approval</td><td>H</td></tr>
</table>
</div></div>
</div>

</div>
` };
  c["ss_laying"] = { title: '🔧 Foul Sewer — وضع المواسير', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Foul Sewer — Pipe Laying Phase
</div>
<h3>🔩 Sewer Pipe Laying — QCS 2024</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Bedding (Zone 1)</td><td>Granular Type S, 100mm under pipe</td><td>Ashghal</td></tr>
<tr><td>Gradient (DN150)</td><td>Min 1:150 (self-cleansing 0.75 m/s)</td><td>Ashghal</td></tr>
<tr><td>Gradient (DN225)</td><td>Min 1:225</td><td>Ashghal</td></tr>
<tr><td>Level Tolerance</td><td>±10mm invert level</td><td>Ashghal</td></tr>
<tr><td>Joint Gap</td><td>≤5mm for UPVC push-fit</td><td>BS EN 1401</td></tr>
<tr><td>Max Unsupported Length</td><td>3×pipe length before backfill</td><td>Ashghal</td></tr>
<tr><td>Marker Tape</td><td>Green — "FOUL SEWER" / 300mm above crown</td><td>Ashghal</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: Engineer must approve invert levels and gradient before backfilling.
</div>
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
` };
  c["ss_excavation"] = { title: '⛏️ Foul Sewer — الحفر والبيدنج', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Foul Sewer — Excavation Phase
</div>
<h3>🔩 Sewer Trench Excavation — Requirements</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Trench Width</td><td>Pipe OD + 300mm each side (min)</td><td>Ashghal Spec</td></tr>
<tr><td>Side Slopes</td><td>1:1 (unsupported) or shored</td><td>Ashghal</td></tr>
<tr><td>Excavation Level</td><td>Formation to ±10mm of design</td><td>Ashghal</td></tr>
<tr><td>Over-excavation</td><td>Fill with C10 lean concrete / approved granular</td><td>Ashghal</td></tr>
<tr><td>Dewatering</td><td>Keep trench dry during laying</td><td>Ashghal</td></tr>
<tr><td>Shoring</td><td>Required >1.2m depth in granular soil</td><td>Health & Safety</td></tr>
<tr><td>Separation from Water</td><td>Min 1.0m horizontal / Water always above sewer</td><td>QCS 2024</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ All excavations in Qatar road network require valid Kahramaa/Ashghal permit. No excavation before utility mark-out (Red Line Survey).
</div>
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
` };
  c["ss_backfill"] = { title: '🏗️ Foul Sewer — الردم', content: `
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
<h3>🔩 Foul Sewer — Trench Backfill</h3>
<table class="dm-table">
<tr><th>Zone</th><th>Material</th><th>Compaction</th></tr>
<tr><td>Zone 1 — Pipe surround</td><td>Granular Type S — hand compact only</td><td>No mechanical compaction near pipe</td></tr>
<tr><td>Zone 2 — 300mm above pipe</td><td>Selected fill SO3≤0.5%</td><td>Light plate compactor only</td></tr>
<tr><td>Zone 3 — Upper fill</td><td>Approved excavated material</td><td>≥95% MDD / 300mm layers</td></tr>
<tr><td>Under carriageway</td><td>Granular Type B</td><td>≥100% BS Heavy</td></tr>
</table>
<div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
⚠️ Density test: 1 per 50m trench per layer. CCTV survey after backfill to confirm no pipe damage.
</div>
</div>
</div>
` };
  c["ss_survey"] = { title: '📐 Foul Sewer — الدراسة والتصميم', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 2 | Pre-Construction Survey &amp; Design</div>
<h3>📋 Pre-Construction Requirements</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th></tr></thead>
<tbody>
<tr><td>Design Drawings</td><td>Approved by Ashghal / MME</td></tr>
<tr><td>Hydraulic Design</td><td>Flow analysis and gradient verification</td></tr>
<tr><td>Invert Levels</td><td>Manhole invert levels confirmed on drawings</td></tr>
<tr><td>Existing Services</td><td>As-Built records + NOC from all authorities</td></tr>
<tr><td>Method Statement</td><td>Approved before commencement</td></tr>
</tbody>
</table>
<h3>⚠️ Mandatory Separation Rules</h3>
<p>• Foul sewer must always be <strong>below</strong> water supply pipes vertically<br>
• Minimum <strong>1.0 m</strong> horizontal separation from water supply<br>
• NOC mandatory before any excavation</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Design drawings and invert levels must be approved before excavation commences</p>
</div>
` };
  c["ss_materials"] = { title: '🔩 Foul Sewer — المواد والمواسير', content: `
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
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Foul Sewer Materials</span></div>
<button data-action="uploadFile" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<div id="vid-ph-ss-materials-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">uPVC, GRP, Manholes, QCS specifications</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 2 | Materials Specifications</div>
<h3>📐 Pipe Specifications</h3>
<table class="dm-table">
<thead><tr><th>Type</th><th>Standard</th><th>Application</th></tr></thead>
<tbody>
<tr><td>uPVC</td><td>ISO 4435 | Stiffness Class SN8</td><td>DN150–DN600</td></tr>
<tr><td>GRP (Glass Reinforced Plastic)</td><td>ISO 10467 | SN5000</td><td>DN600 and above</td></tr>
<tr><td>HDPE</td><td>ISO 4427 | SN8</td><td>Pumping mains only</td></tr>
</tbody>
</table>
<h3>📐 Manhole Specifications</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th></tr></thead>
<tbody>
<tr><td>Manhole Concrete</td><td>≥ C35 — chemical-resistant mix</td></tr>
<tr><td>Precast Rings</td><td>BS 5911 Part 200</td></tr>
<tr><td>Benching (Channelling)</td><td>1:2 mortar — slope 1:12 towards channel</td></tr>
<tr><td>Cover — Road (D400)</td><td>400 kN load rating — BS EN 124</td></tr>
<tr><td>Cover — Footway (B125)</td><td>125 kN load rating — BS EN 124</td></tr>
<tr><td>Step Irons</td><td>HDPE-coated — at every 300 mm</td></tr>
</tbody>
</table>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-02:</strong> All materials must be approved and certified before delivery to site</p>
</div>
` };
  c["ss_testing"] = { title: '🧪 Foul Sewer — الاختبارات', content: `
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

<h3 style="color:var(--gold);margin:16px 0 8px;">📷 جدول درجات العيوب — CCTV Survey (WRc Manual / QCS 2024)</h3>
<div style="overflow-x:auto;">
<table>
<tr><th>Grade</th><th>وصف العيب</th><th>كود WRc</th><th>الإجراء المطلوب</th><th>الأولوية</th></tr>
<tr><td style="color:#2ecc71;font-weight:700;">0</td><td>لا يوجد عيب — ممتاز</td><td>—</td><td>لا شيء</td><td>—</td></tr>
<tr><td style="color:#3498db;font-weight:700;">1</td><td>عيوب طفيفة — خدوش سطحية</td><td>BAC / BCC</td><td>مراقبة فقط</td><td>منخفضة</td></tr>
<tr><td style="color:#f39c12;font-weight:700;">2</td><td>عيوب متوسطة — شقوق بدون تشوه</td><td>BAD / BCE</td><td>إدراج في قائمة الصيانة</td><td>متوسطة</td></tr>
<tr><td style="color:#e67e22;font-weight:700;">3</td><td>عيوب خطيرة — تشوه أو تسرب</td><td>BAE / BCS</td><td>إصلاح خلال 6 أشهر</td><td>عالية</td></tr>
<tr><td style="color:#e74c3c;font-weight:700;">4</td><td>فشل هيكلي — انهيار جزئي</td><td>BAF / BCX</td><td>إصلاح فوري</td><td>عاجل</td></tr>
<tr><td style="color:#8e44ad;font-weight:700;">5</td><td>انهيار كامل</td><td>BAX</td><td>استبدال فوري</td><td>طارئ</td></tr>
</table>
</div>
<div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin:8px 0;">
<strong style="color:#e74c3c;">⚠️ شرط القبول (QCS 2024 + Ashghal):</strong><br>
• Grade ≤ 2 للقبول النهائي — أي Grade 3+ يستلزم إعادة العمل<br>
• يجب تصوير <strong>100%</strong> من طول الشبكة بعد الإنشاء<br>
• تسليم تقرير CCTV + DVD/USB مع الطرود النهائية للمشروع
</div>

<h3 style="color:var(--gold);margin:16px 0 8px;">💨 متطلبات اختبار الهواء — Air Test (QCS 2024 Sec 9.4.3)</h3>
<div style="overflow-x:auto;">
<table>
<tr><th>قطر الأنبوب (mm)</th><th>ضغط البداية (mbar)</th><th>ضغط الاختبار (mbar)</th><th>الحد المسموح بالسقوط</th><th>مدة الاختبار (دقيقة)</th></tr>
<tr><td>100 – 150</td><td>100</td><td>75</td><td>≤ 25 mbar</td><td>5</td></tr>
<tr><td>200 – 250</td><td>100</td><td>75</td><td>≤ 25 mbar</td><td>5</td></tr>
<tr><td>300 – 375</td><td>100</td><td>75</td><td>≤ 25 mbar</td><td>7.5</td></tr>
<tr><td>400 – 450</td><td>100</td><td>75</td><td>≤ 25 mbar</td><td>10</td></tr>
<tr><td>500 – 600</td><td>100</td><td>75</td><td>≤ 25 mbar</td><td>12.5</td></tr>
<tr><td>&gt; 600 (Water Test)</td><td>—</td><td>1.0 bar ماء</td><td>≤ 0.1 bar / 30 min</td><td>30</td></tr>
</table>
</div>
<div style="background:rgba(201,168,76,0.08);border-radius:8px;padding:10px;margin:8px 0;">
<strong style="color:var(--gold);">📋 خطوات اختبار الهواء:</strong><br>
1. تسكير فتحتي الأنبوب بالبالون أو الكمبشة<br>
2. ضخ هواء حتى 100 mbar والانتظار دقيقتين للاستقرار<br>
3. خفض الضغط إلى 75 mbar وبدء توقيت الاختبار<br>
4. قراءة الضغط بعد المدة المحددة — القبول: ≥ 50 mbar (أي لم يسقط أكثر من 25 mbar)<br>
5. إذا فشل: فحص الوصلات بالرغوة + CCTV لتحديد موقع التسرب
</div>
</div>
</div>
` };
  c["sewer_stages"] = { title: '🚽 شبكة Foul Sewer', content: `
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
` };
  c["sw_laying"] = { title: '🔧 الصرف السطحي — وضع المواسير', content: `
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
` };
  c["sw_gullies"] = { title: '🕳️ الصرف السطحي — Gullies & Manholes', content: `
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
` };
  c["sw_materials"] = { title: '🔩 الصرف السطحي — المواد والمواسير', content: `
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
<h3>🌧️ Storm Drainage — Materials</h3>
<table class="dm-table">
<tr><th>Material</th><th>Specification</th><th>Standard</th></tr>
<tr><td>Main Pipe</td><td>RC Class 120 / HDPE SDR17</td><td>BS 5911 / EN 13476</td></tr>
<tr><td>Catchment Pipe</td><td>UPVC SN8 Class 400</td><td>BS EN 1401</td></tr>
<tr><td>Manholes</td><td>RC Grade C40 / Precast</td><td>BS 5911-3</td></tr>
<tr><td>Gully Covers</td><td>Ductile iron D400 (carriageway)</td><td>BS EN 124</td></tr>
<tr><td>Bedding (Zone 1)</td><td>Granular Type B</td><td>Ashghal</td></tr>
<tr><td>Marker Tape</td><td>Blue — "STORM WATER"</td><td>Ashghal</td></tr>
</table>
</div>
` };
  c["sw_survey"] = { title: '📐 الصرف السطحي — الدراسة والتصميم', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Pre-Construction Survey &amp; Design</div>
<h3>📋 Pre-Construction Requirements</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th></tr></thead>
<tbody>
<tr><td>Design Drawings</td><td>Approved by Ashghal / MME</td></tr>
<tr><td>Catchment Analysis</td><td>Runoff area and peak flow analysis</td></tr>
<tr><td>Outfall Location</td><td>Approved discharge point confirmed</td></tr>
<tr><td>Gully Spacing</td><td>Every 25–40 m depending on gradient</td></tr>
<tr><td>Existing Services</td><td>NOC from all relevant authorities</td></tr>
</tbody>
</table>
<h3>⚠️ Critical Rules</h3>
<p>• <strong>Never</strong> connect foul sewer to stormwater network — <strong>legal violation</strong><br>
• Silt Trap mandatory before network outfall<br>
• Outfall protection against erosion required</p>
<h3>🔴 Hold Points</h3>
<p>• <strong>HP-01:</strong> Design drawings and outfall location must be approved before excavation commences</p>
</div>
` };
  c["sw_handover"] = { title: '✅ الصرف السطحي — التسليم', content: `
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
<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">🎥</span><span style="color:var(--gold);font-weight:700;font-size:13px;">Stormwater Network Handover</span></div>
<button data-action="uploadFile" style="background:rgba(201,168,76,0.2);border:1px solid rgba(201,168,76,0.4);color:var(--gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;">📤 Upload Video</button>
</div>
<div id="vid-ph-sw-handover-en" style="padding:20px;text-align:center;color:var(--text3);"><div style="font-size:28px;margin-bottom:6px;">📹</div><div style="font-size:12px;">As-Built, manhole inspection, CCTV Final survey</div><div style="font-size:11px;margin-top:4px;opacity:0.6;">Click "Upload Video" to load MP4 / MOV</div></div>
</div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 Part 3 | Handover &amp; Completion</div>
<h3>📋 Handover Documentation</h3>
<table class="dm-table">
<thead><tr><th>Document</th><th>Contents</th></tr></thead>
<tbody>
<tr><td>As-Built Drawings</td><td>Executed drawings with actual survey levels</td></tr>
<tr><td>Hydraulic Test Records</td><td>All test results and certificates</td></tr>
<tr><td>CCTV Survey Report</td><td>Video recording + full condition report</td></tr>
<tr><td>Gully Schedule</td><td>Register of all gullies — locations and invert levels</td></tr>
<tr><td>ITR Register</td><td>All inspection and test requests</td></tr>
</tbody>
</table>
<h3>🛡️ Defects Liability Period (DLP)</h3>
<p>• Duration: <strong>12 months</strong><br>
• Silt bucket cleaning every 3 months during DLP<br>
• CCTV re-inspection required at end of DLP</p>
<h3>🔴 Final Hold Points</h3>
<p>• <strong>HP-09:</strong> Ashghal written approval required for final handover acceptance</p>
</div>
` };
  c["storm_stages"] = { title: '🌧️ شبكة الصرف السطحي', content: `
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
` };
  c["tw_laying"] = { title: '🔧 المياه المعالجة — وضع المواسير', content: `
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
<h3>♻️ Treated Water — Pipe Laying</h3>
<table class="dm-table">
<tr><th>Parameter</th><th>Requirement</th><th>Reference</th></tr>
<tr><td>Level Tolerance</td><td>±10mm invert level</td><td>MME Spec</td></tr>
<tr><td>Gradient</td><td>Continuous fall to washouts (1:500 min)</td><td>MME Spec</td></tr>
<tr><td>Joint (Electrofusion)</td><td>Clean, dry, deoxidized before fusion</td><td>BS EN 12201</td></tr>
<tr><td>Anchor Blocks</td><td>Concrete at bends, tees, ends</td><td>MME Spec</td></tr>
<tr><td>Marker Tape</td><td>Purple / 300mm above crown / every 10m stake</td><td>MME Spec</td></tr>
<tr><td>Air Release Valves</td><td>At high points — per design</td><td>MME Spec</td></tr>
</table>
<div style="background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
🔴 HP: MME inspector witness required for jointing and pressure testing. No backfilling before approval.
</div>
</div>
</div>
` };
  c["tw_materials"] = { title: '🔩 المياه المعالجة — المواسير البنفسجية', content: `
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
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 | Treated/Recycled Water — Materials Specification
</div>
<h3>♻️ Treated Water Network — Materials QCS 2024</h3>
<p style="font-size:12px;color:var(--text2);margin-bottom:12px;">Treated water (recycled/reclaimed water) networks must be constructed with purple-coloured materials to prevent cross-connection with potable water. All materials require MME prior approval.</p>
<table class="dm-table">
<tr><th>Material</th><th>Specification</th><th>Standard</th><th>Authority</th></tr>
<tr><td>Main Pipe</td><td>GRP (Glass Reinforced Plastic) — Purple<br>or HDPE PE100 — Purple colour</td><td>BS EN 14364 / BS EN 12201</td><td>MME Approved</td></tr>
<tr><td>Service Connections</td><td>MDPE Purple SDR11 PE100</td><td>BS EN 12201</td><td>MME Approved</td></tr>
<tr><td>Fittings</td><td>Same material as pipe — Purple only</td><td>Matching pipe standard</td><td>MME Approved</td></tr>
<tr><td>Valves</td><td>Gate/Butterfly — PN16 — Purple painted</td><td>BS EN 1074</td><td>MME Approved</td></tr>
<tr><td>Gaskets / Joints</td><td>EPDM rubber ring or electrofusion (HDPE)</td><td>BS EN 681</td><td>—</td></tr>
<tr><td>Marker Tape</td><td>PURPLE — "TREATED WATER" / 300mm above crown</td><td>MME Specification</td><td>MME Mandatory</td></tr>
<tr><td>Identification Stakes</td><td>Purple GRP posts at every 10m (road)</td><td>MME Specification</td><td>MME Mandatory</td></tr>
<tr><td>Bedding</td><td>Granular Type B — 100mm under pipe</td><td>MME Spec</td><td>—</td></tr>
</table>
<div style="background:rgba(155,89,182,0.15);border:1px solid rgba(155,89,182,0.5);border-radius:8px;padding:12px;margin-top:12px;font-size:12px;">
🟣 <strong>CRITICAL:</strong> Purple colour is mandatory for ALL treated water pipes, fittings, valves, and tapes. Cross-connection with potable water is a criminal offence under Qatar Environmental Law. All MAR (Material Approval Requests) must be submitted to MME before delivery.
</div>
</div>
` };
  c["tw_survey"] = { title: '📐 المياه المعالجة — الدراسة والتصميم', content: `
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
` };
  c["tw_handover"] = { title: '✅ المياه المعالجة — التسليم', content: `
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
<h3>♻️ Treated Water — Handover Checklist</h3>
<table class="dm-table">
<tr><th>Document</th><th>Required</th></tr>
<tr><td>As-Built Drawings</td><td>✅ All pipe routes + levels</td></tr>
<tr><td>Pressure Test Reports</td><td>✅ All sections tested</td></tr>
<tr><td>Bacteriological Results</td><td>✅ Passing results</td></tr>
<tr><td>Cross-connection Certificate</td><td>✅ MME signed</td></tr>
<tr><td>Material Certificates</td><td>✅ All pipes + fittings</td></tr>
<tr><td>CCTV (if applicable)</td><td>✅ Gravity sections</td></tr>
<tr><td>Valve Schedule</td><td>✅ All valves numbered + recorded</td></tr>
<tr><td>MME Completion Certificate</td><td>✅ Required for connection</td></tr>
</table>
<div style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;">
✅ No treated water network can be commissioned without MME written approval. All documentation submitted and approved.
</div>
</div>
</div>
` };
  c["treated_stages"] = { title: '♻️ شبكة المياه المعالجة', content: `
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
<div style="margin-top:16px;"><div data-action="openDetail" data-param="itp_treated" style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.4);border-radius:12px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:24px">📋</div><div style="color:var(--gold);font-weight:700;font-size:15px;">Treated Water Network — Full ITP</div></div></div>
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">📌 QCS 2024 — Section 8 | Treated / Reclaimed Water Network</div>
<h3>⛔ Critical Warning — Read First</h3>
<p>Treated water is <strong>NOT potable</strong>. Cross-connection with drinking water supply = <strong>public health catastrophe</strong>. Purple colour is mandatory — no exceptions — on all pipes, fittings and equipment throughout the network.</p>
<h3>📌 Select Phase for Full Details</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;">
<div data-action="openDetail" data-param="tw_survey" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">📐</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Survey &amp; Design</div></div>
<div data-action="openDetail" data-param="tw_materials" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔩</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Purple Pipes</div></div>
<div data-action="openDetail" data-param="tw_excavation" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">⛏️</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Excavation &amp; Separation</div></div>
<div data-action="openDetail" data-param="tw_laying" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🔧</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Pipe Laying</div></div>
<div data-action="openDetail" data-param="tw_testing" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">🧪</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Testing</div></div>
<div data-action="openDetail" data-param="tw_handover" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:12px;cursor:pointer;text-align:center;"><div style="font-size:20px">✅</div><div style="color:var(--gold);font-weight:700;font-size:13px;">Handover</div></div>
</div>
<h3>📐 General Specifications</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr></thead>
<tbody>
<tr><td>Pipe Type</td><td>Purple HDPE / Purple uPVC</td><td>ISO 4427</td></tr>
<tr><td>Colour</td><td>Purple — RAL 4001 — mandatory throughout</td><td>MME Standard</td></tr>
<tr><td>Design Pressure</td><td>6 – 10 bar</td><td>QCS S8</td></tr>
<tr><td>Minimum Cover</td><td>≥ 0.9 m</td><td>QCS S8</td></tr>
<tr><td>Separation from Potable Water</td><td>≥ 1.0 m horizontal — mandatory</td><td>QCS S8</td></tr>
<tr><td>Marker Tape</td><td>Purple — "RECLAIMED WATER"</td><td>MME</td></tr>
<tr><td>Double Check Valve</td><td>At every connection point</td><td>MME</td></tr>
<tr><td>Pressure Test</td><td>1.5× design pressure / 2 hours / zero leakage</td><td>QCS S8</td></tr>
<tr><td>Cross Connection Test</td><td>Zero contamination of potable supply confirmed</td><td>MME</td></tr>
</tbody>
</table>
</div>
` };
  c["pipe_bedding"] = { title: '📐 Pipe Bedding Types — أنواع فرش المواسير', content: `
<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;">
📌 QCS 2024 — Section 8 | Pipe Bedding — فرش المواسير وأنواعها
</div>
<div class="lang-content-ar">
<h3>📐 ما هو فرش المواسير؟</h3>
<p>طبقة المادة الموضوعة تحت وحول الماسورة داخل الخندق. وظيفتها توزيع الأحمال بشكل منتظم، منع نقاط الضغط الموضعية، وحماية الماسورة من الاهتزازات والحركة.</p>

<h3>📐 الفئات الأساسية — Bedding Classes</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>الفئة</th><th>المادة</th><th>الوصف</th><th>معامل الدعم (Bf)</th><th>الاستخدام</th></tr>
<tr><td><strong>Class S (Special)</strong></td><td>Concrete Cradle/Surround</td><td>خرسانة تحيط الماسورة بالكامل</td><td>3.4</td><td>أحمال جداً عالية + عبور طرق</td></tr>
<tr><td><strong>Class A</strong></td><td>Concrete Bed 100mm + Granular Surround</td><td>سرير خرساني + محيط حبيبي</td><td>2.6</td><td>طرق رئيسية + ESAL عالي</td></tr>
<tr><td><strong>Class B</strong></td><td>Granular Bed 150mm + Granular Surround</td><td>رمل أو حجر مكسر ناعم</td><td>1.9</td><td>الاستخدام الأكثر شيوعاً في قطر</td></tr>
<tr><td><strong>Class D</strong></td><td>Flat Bottom + Granular Surround</td><td>قاع الخندق مع معالجة</td><td>1.1</td><td>تربة صلبة جيدة</td></tr>
</table>

<h3>📐 تفاصيل Class B — الأكثر استخداماً</h3>
<table class="dm-table">
<tr><th>البند</th><th>المواصفة</th><th>المرجع</th></tr>
<tr><td>مادة الفرش</td><td>Single-size Crushed Gabbro 5-20mm أو رمل نظيف</td><td>QCS S8</td></tr>
<tr><td>سماكة الفرش تحت الماسورة</td><td>150mm (أو OD/4 الأكبر)</td><td>BS EN 1610</td></tr>
<tr><td>ارتفاع الغطاء فوق قمة الماسورة</td><td>300mm (Pipe Zone)</td><td>QCS S8</td></tr>
<tr><td>دمك Pipe Zone</td><td>يدوي — لا dمك آلي أثناء Pipe Zone</td><td>QCS S8</td></tr>
<tr><td>الدمك بعد 300mm فوق الماسورة</td><td>≥ 90% MDD بمعدات مناسبة</td><td>ASTM D698</td></tr>
<tr><td>Marker Tape</td><td>300mm فوق قمة الماسورة بلون محدد</td><td>KAHRAMAA</td></tr>
</table>

<h3>📐 Concrete Encasement (Class S) — عبور الطرق</h3>
<table class="dm-table">
<tr><th>البند</th><th>المواصفة</th></tr>
<tr><td>درجة الخرسانة</td><td>C20 minimum</td></tr>
<tr><td>الغطاء الجانبي (Cover)</td><td>≥ 150mm على جانبي الماسورة</td></tr>
<tr><td>الغطاء فوق الماسورة</td><td>≥ 150mm</td></tr>
<tr><td>الغطاء تحت الماسورة</td><td>≥ 100mm Concrete Bed</td></tr>
<tr><td>حماية من الانكماش</td><td>Joints كل 5m في الـ Encasement</td></tr>
<tr><td>المعالجة</td><td>≥ 3 أيام قبل الردم</td></tr>
</table>

<h3>📐 أنواع المواد المستخدمة في الفرش</h3>
<table class="dm-table">
<tr style="background:rgba(122,21,21,0.7);"><th>المادة</th><th>المواصفة</th><th>الاستخدام</th></tr>
<tr><td>Single-Size Gabbro 5-10mm</td><td>سرير مواسير مرنة (HDPE)</td><td>Class B مياه وصرف</td></tr>
<tr><td>Single-Size Gabbro 5-20mm</td><td>سرير ومحيط مواسير كبيرة</td><td>Class B مواسير ≥ DN400</td></tr>
<tr><td>Washed Sand</td><td>لا SO3 + لا Cl زائد</td><td>Class B مواسير صغيرة ≤ DN200</td></tr>
<tr><td>CLSM (Controlled Low Strength Material)</td><td>0.3-2.5 N/mm² @ 28 day</td><td>خنادق ضيقة / تحت طرق رئيسية</td></tr>
<tr><td>Concrete C15</td><td>Granular Haunch بديل</td><td>Class A + عبور طرق</td></tr>
</table>

<h3>🔧 اختبارات القبول</h3>
<table class="dm-table">
<tr><th>الاختبار</th><th>التكرار</th><th>المعيار</th><th>HP/W</th></tr>
<tr><td>Visual Inspection (بصري)</td><td>كل 50m</td><td>سماكة صحيحة + مادة نظيفة</td><td>W</td></tr>
<tr><td>Bedding Compaction (Sand Cone)</td><td>كل 50m</td><td>≥ 90% MDD</td><td>W</td></tr>
<tr><td>Grading of Bedding Material</td><td>Per source</td><td>ASTM C136</td><td>W</td></tr>
<tr><td>Pipe Zone Inspection</td><td>قبل الردم</td><td>Visual — No voids, correct height</td><td>HP</td></tr>
<tr><td>Marker Tape Inspection</td><td>100%</td><td>300mm above pipe, correct color</td><td>W</td></tr>
</table>
</div>
<div class="lang-content-en" style="display:none;">
<h3>What is Pipe Bedding?</h3>
<p>The material layer placed under and around pipes in the trench. Functions: distribute loads uniformly, prevent stress concentrations, protect pipes from vibration and movement.</p>
<h3>Bedding Classes</h3>
<table class="dm-table">
<tr><th>Class</th><th>Material</th><th>Support Factor (Bf)</th><th>Use</th></tr>
<tr><td>Class S (Special)</td><td>Concrete Cradle/Surround</td><td>3.4</td><td>Very high loads + road crossings</td></tr>
<tr><td>Class A</td><td>Concrete Bed + Granular Surround</td><td>2.6</td><td>Major roads + high ESAL</td></tr>
<tr><td>Class B</td><td>Granular Bed 150mm + Granular Surround</td><td>1.9</td><td>Most common in Qatar</td></tr>
<tr><td>Class D</td><td>Flat Bottom + Granular Surround</td><td>1.1</td><td>Good firm soil only</td></tr>
</table>
<h3>Class B Details — Most Common</h3>
<table class="dm-table">
<tr><th>Item</th><th>Specification</th><th>Reference</th></tr>
<tr><td>Bedding Material</td><td>5-20mm Single-size Crushed Gabbro or Clean Sand</td><td>QCS S8</td></tr>
<tr><td>Bedding Thickness</td><td>150mm (or OD/4 whichever greater)</td><td>BS EN 1610</td></tr>
<tr><td>Pipe Zone Cover</td><td>300mm above pipe crown</td><td>QCS S8</td></tr>
<tr><td>Pipe Zone Compaction</td><td>Hand tamping only — no mechanical compaction in pipe zone</td><td>QCS S8</td></tr>
<tr><td>Above Pipe Zone</td><td>≥ 90% MDD after 300mm cover</td><td>ASTM D698</td></tr>
<tr><td>Marker Tape</td><td>300mm above pipe crown — correct color</td><td>KAHRAMAA</td></tr>
</table>
<h3>Concrete Encasement (Class S) — Road Crossings</h3>
<table class="dm-table">
<tr><th>Item</th><th>Specification</th></tr>
<tr><td>Concrete Grade</td><td>C20 minimum</td></tr>
<tr><td>Side Cover</td><td>≥ 150mm each side</td></tr>
<tr><td>Top Cover</td><td>≥ 150mm above pipe</td></tr>
<tr><td>Bottom Bed</td><td>≥ 100mm concrete bed</td></tr>
<tr><td>Curing before backfill</td><td>≥ 3 days</td></tr>
</table>
</div>
` };

// ── Missing ITP stubs ──
c["itp_sewer"] = { title: '📋 ITP — شبكة الصرف الصحي', content: c["ss_testing"] ? c["ss_testing"].content : c["itp_water_supply"].content };
c["itp_storm"] = { title: '📋 ITP — الصرف السطحي', content: c["sw_testing"] ? c["sw_testing"].content : c["itp_water_supply"].content };
c["itp_subbase"] = c["itp_subgrade"] || { title: 'ITP Subbase', content: '<p>مرجع: QCS 2024 S6 P4</p>' };

// ── Missing water supply sub-section stubs ──
c["ws_materials"] = {
  title: '💧 مواد مياه الشرب — HDPE + DI + GRP',
  content: `<div class="lang-content-ar">
<h3>مواد مواسير مياه الشرب — QCS 2024 S8 + KAHRAMAA</h3>
<table class="dm-table">
<tr><th>المادة</th><th>الاستخدام</th><th>المعيار</th><th>ملاحظات</th></tr>
<tr><td><strong>HDPE PE100</strong></td><td>التوزيع DN25–DN630</td><td>ISO 4427</td><td>SDR11 (PN16) أو SDR17 (PN10)</td></tr>
<tr><td><strong>Ductile Iron (DI)</strong></td><td>الخطوط الرئيسية ≥DN300</td><td>ISO 2531</td><td>Class K9 / K7 — بطانة سمنتية</td></tr>
<tr><td><strong>GRP</strong></td><td>الخطوط الكبيرة ≥DN600</td><td>AWWA C950</td><td>SN5000 — للضغط العالي</td></tr>
<tr><td><strong>PVC-U</strong></td><td>التوزيع الداخلي ≤DN160</td><td>ISO 1452</td><td>Class C (PN12.5) للشرب فقط</td></tr>
</table>
<h3>متطلبات KAHRAMAA للمواد</h3>
<table class="dm-table">
<tr><th>البند</th><th>المتطلب</th></tr>
<tr><td>شهادة المختبر</td><td>KAHRAMAA Approved Lab — فحص كل دفعة</td></tr>
<tr><td>شهادة NSF/WRAS</td><td>إلزامي لكل مواد التلامس مع الشرب</td></tr>
<tr><td>لون HDPE</td><td>أزرق أو أسود بخط أزرق — يميز شبكة المياه</td></tr>
<tr><td>Marking</td><td>اسم الشركة + DN + PN + المعيار + تاريخ الإنتاج</td></tr>
<tr><td>Material Approval</td><td>MAR مطلوب قبل التوريد</td></tr>
</table>
<p><strong>📌 المراجع:</strong> QCS 2024 S8 P3 + KAHRAMAA WR-001 + ISO 4427</p>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Water Supply Pipe Materials — QCS 2024 S8 + KAHRAMAA</h3>
<table class="dm-table">
<thead><tr><th>Material</th><th>Application</th><th>Standard</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>HDPE PE100</strong></td><td>Distribution mains DN25–DN630</td><td>ISO 4427</td><td>SDR11 (PN16) or SDR17 (PN10)</td></tr>
<tr><td><strong>Ductile Iron (DI)</strong></td><td>Transmission mains ≥ DN300</td><td>ISO 2531</td><td>Class K9 / K7 — cement mortar lining</td></tr>
<tr><td><strong>GRP</strong></td><td>Large diameter mains ≥ DN600</td><td>AWWA C950</td><td>SN5000 — high pressure applications</td></tr>
<tr><td><strong>PVC-U</strong></td><td>Internal distribution ≤ DN160</td><td>ISO 1452</td><td>Class C (PN12.5) — potable water only</td></tr>
</tbody>
</table>
<h3>KAHRAMAA Material Requirements</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th></tr></thead>
<tbody>
<tr><td>Laboratory Certificate</td><td>KAHRAMAA Approved Lab — test every batch</td></tr>
<tr><td>NSF/WRAS Certification</td><td>Mandatory for all materials in contact with potable water</td></tr>
<tr><td>HDPE Colour</td><td>Blue or black with blue stripe — identifies water supply network</td></tr>
<tr><td>Pipe Marking</td><td>Manufacturer + DN + PN + Standard + Production date</td></tr>
<tr><td>Material Approval</td><td>MAR required before delivery to site</td></tr>
</tbody>
</table>
<p><strong>📌 References:</strong> QCS 2024 S8 P3 + KAHRAMAA WR-001 + ISO 4427</p>
</div>
`
};

c["ws_testing"] = {
  title: '💧 اختبار الضغط — Hydrostatic Pressure Test',
  content: `<div class="lang-content-ar">
<h3>اختبار الضغط الهيدروستاتيكي — QCS 2024 S8</h3>
<table class="dm-table">
<tr><th>البند</th><th>المتطلب</th><th>المرجع</th></tr>
<tr><td>ضغط الاختبار</td><td><strong>1.5 × PN</strong> (بار)</td><td>QCS S8 P5</td></tr>
<tr><td>مدة الاختبار</td><td>2 ساعة كحد أدنى</td><td>QCS S8 P5 Cl.5.3</td></tr>
<tr><td>معيار القبول</td><td>هبوط ضغط ≤ 0.1 بار / ساعة</td><td>KAHRAMAA Specs</td></tr>
<tr><td>الحجم المختبَر</td><td>≤ 1 km كل اختبار (عند DN ≤ 400)</td><td>KAHRAMAA</td></tr>
<tr><td>Pre-test Soak</td><td>24h مملوء قبل رفع الضغط</td><td>BS 8010</td></tr>
<tr><td>الوثائق</td><td>Pressure Chart + Gauge Calibration Certificate</td><td>Ashghal ITP</td></tr>
</table>
<h3>خطوات الاختبار</h3>
<ol style="color:var(--text2);line-height:2;font-size:13px;">
<li>ملء الخط بالماء وتهوية الهواء (Air Bleed Valves)</li>
<li>نقع 24 ساعة (Pre-soak) للتشبع</li>
<li>رفع الضغط تدريجياً حتى 1.5×PN</li>
<li>مراقبة 2 ساعة — تسجيل الضغط كل 15 دقيقة</li>
<li>Pass: هبوط ≤ 0.1 بار | Fail: فحص التسريبات</li>
</ol>
<p><strong>📌 المراجع:</strong> QCS 2024 S8 P5 Cl.5.3 + KAHRAMAA Standards + BS 8010</p>
</div>
<div class="lang-content-en" style="display:none;">
<h3>Hydrostatic Pressure Testing — QCS 2024 S8</h3>
<table class="dm-table">
<thead><tr><th>Item</th><th>Requirement</th><th>Reference</th></tr></thead>
<tbody>
<tr><td>Test Pressure</td><td><strong>1.5 × PN</strong> (bar)</td><td>QCS S8 P5</td></tr>
<tr><td>Test Duration</td><td>Minimum 2 hours</td><td>QCS S8 P5 Cl.5.3</td></tr>
<tr><td>Acceptance Criterion</td><td>Pressure drop ≤ 0.1 bar / hour</td><td>KAHRAMAA Specs</td></tr>
<tr><td>Test Section Length</td><td>≤ 1 km per test (DN ≤ 400)</td><td>KAHRAMAA</td></tr>
<tr><td>Pre-Test Soak</td><td>24 hours filled before pressurising</td><td>BS 8010</td></tr>
<tr><td>Documentation</td><td>Pressure chart + calibrated gauge certificate</td><td>Ashghal ITP</td></tr>
</tbody>
</table>
<h3>Test Procedure</h3>
<ol style="color:var(--text2);line-height:2;font-size:13px;">
<li>Fill pipeline and vent all air via Air Bleed Valves</li>
<li>Pre-soak 24 hours for pipe wall absorption</li>
<li>Raise pressure gradually to 1.5 × PN</li>
<li>Monitor 2 hours — record pressure every 15 minutes</li>
<li>Pass: drop ≤ 0.1 bar | Fail: locate leaks, repair, retest</li>
</ol>
<p><strong>📌 References:</strong> QCS 2024 S8 P5 Cl.5.3 + KAHRAMAA Standards + BS 8010</p>
</div>
`
};


// ============================================================
// DETAILED EXECUTION STAGES — QCS 2024 Field Engineer Guide
// Added: water_supply_stages_detail, sewer_stages_detail,
//        storm_stages_detail, treated_stages_detail
// ============================================================

c['water_supply_stages_detail'] = {
  title: '💧 مراحل تنفيذ شبكة مياه الشرب — QCS S8 P12 (دليل ميداني)',
  content: `
<div style="font-family:var(--font-main);color:var(--text1);max-width:900px;margin:0 auto;">

<div style="background:rgba(33,150,243,0.1);border-right:4px solid #2196f3;padding:12px 16px;border-radius:8px;margin-bottom:20px;">
  <strong>⚠️ تنبيه:</strong> هذا الدليل مرجعي فقط — تحقق دائماً من المخططات الرسمية ووثائق العقد.
  المرجع الأساسي: QCS 2024 Section 8 Part 12 + KAHRAMAA W-001 Specifications
</div>

<h3 style="color:#2196f3;border-bottom:2px solid rgba(33,150,243,0.3);padding-bottom:8px;">🔵 المرحلة 1: التحضير والحفر (Excavation & Preparation)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(33,150,243,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(33,150,243,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover — طريق رئيسي (Arterial)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 1000mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.4.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover — طريق محلي / رصيف</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 750mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001 §3.4</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover — مناطق زراعية / خضراء</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 600mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.4.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Trench Width (DN ≤ 200)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">OD + 400mm</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.3.1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Trench Width (DN > 200)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">OD + 600mm</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.3.1</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Separation أفقية عن Sewer</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>≥ 1000mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.3.3</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Water above Sewer (تقاطع)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>≥ 500mm عمودياً</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.3.3</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Bedding — أسفل الأنبوب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">150mm رمل نظيف (Clean Sand)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.5.1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Backfill — فوق الأنبوب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">300mm رمل نظيف (Granular)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.5.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Warning Tape</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">أزرق — 300mm فوق الأنبوب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001</td></tr>
</table>

<div style="background:rgba(244,67,54,0.08);border:1px solid rgba(244,67,54,0.3);border-radius:8px;padding:12px;margin-bottom:20px;">
  <strong>🔴 نقاط Fail فورية — المرحلة 1:</strong><br>
  • Cover أقل من الحد الأدنى بأي قدر<br>
  • مياه الشرب تحت خط Sewer عند التقاطع<br>
  • غياب Warning Tape<br>
  • Bedding بمواد غير معتمدة (حجارة / ردم خلط)
</div>

<h3 style="color:#2196f3;border-bottom:2px solid rgba(33,150,243,0.3);padding-bottom:8px;">🔵 المرحلة 2: التركيب (Pipe Installation)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(33,150,243,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(33,150,243,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">القيمة / الإجراء</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Material (DN ≤ 300)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">HDPE PE100 PN16 / UPVC PN16</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA Approved List</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Material (DN 300-1200)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">DI (Ductile Iron) Class K9</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.2.1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Joint — HDPE</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Butt Fusion / Electrofusion (IIW certified welder)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">ISO 21307</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Joint — DI</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Push-fit Restrained (Tyton/Viking)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">ISO 2531</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Thrust Blocks (bends ≥ 22.5°)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">C20 Concrete — حجم محسوب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.6</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Gate Valves (spacing)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 400m على الخطوط الرئيسية</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001 §5</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Air Release Valves</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">كل نقطة عالية + نهاية الخطوط</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001 §6</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Marker Posts</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">كل Valve + كل تقاطع + كل 100m</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA</td></tr>
</table>

<h3 style="color:#2196f3;border-bottom:2px solid rgba(33,150,243,0.3);padding-bottom:8px;">🔵 المرحلة 3: اختبار الضغط الهيدروستاتيكي (Hydrostatic Pressure Test)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:12px;">
  <tr style="background:rgba(33,150,243,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(33,150,243,0.3);">البند</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">ضغط الاختبار</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>1.5 × MWP (بار)</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.7.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مدة الاختبار</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);"><strong>2 ساعة كحد أدنى</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P12 Cl.7.3</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">معيار القبول (هبوط الضغط)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≤ 0.1 بار / ساعة</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Pre-soak قبل الاختبار</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">24 ساعة مملوء (لتشبع المفاصل)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS 8010-1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">طول القسم المختبَر</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 1000m (DN ≤ 400)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Gauge Calibration Certificate</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">مطلوب — صالح ≤ 12 شهر</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal ITP</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">تقارير القراءة</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">كل 30 دقيقة (Pressure Chart)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal ITP</td></tr>
</table>
<ol style="color:var(--text2);line-height:2;font-size:13px;margin-bottom:16px;">
  <li>ملء الخط ببطء من أدنى نقطة + تهوية الهواء من كل ARV</li>
  <li>نقع 24 ساعة (Pre-soak) — الضغط الجوي فقط</li>
  <li>رفع الضغط تدريجياً (≤ 0.5 بار/دقيقة) حتى ضغط الاختبار</li>
  <li>تثبيت الضغط — تسجيل كل 30 دقيقة لمدة ساعتين</li>
  <li>Pass: هبوط ≤ 0.1 بار | Fail: إيقاف فوري + تحديد التسرب</li>
</ol>

<h3 style="color:#2196f3;border-bottom:2px solid rgba(33,150,243,0.3);padding-bottom:8px;">🔵 المرحلة 4: التعقيم والتشغيل (Disinfection & Commissioning)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:12px;">
  <tr style="background:rgba(33,150,243,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(33,150,243,0.3);">المرحلة</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">تركيز Chlorine (Pre-flush)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>50 ppm لمدة 24 ساعة</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001 §8</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Residual Chlorine (بعد Flush)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>0.2 – 0.5 mg/L</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA W-001</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Turbidity (عكارة)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 1 NTU</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">WHO / KAHRAMAA</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Bacteriological Sample</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">E.coli = 0 / Total Coliforms = 0</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">WHO 2017</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">عدد نقاط الأخذ</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">نقطة كل 200m + كل نهاية</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مختبر معتمد</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA Approved Lab فقط</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">KAHRAMAA §8.3</td></tr>
</table>

<h3 style="color:#2196f3;border-bottom:2px solid rgba(33,150,243,0.3);padding-bottom:8px;">📋 نموذج ITP مختصر — مياه الشرب</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(33,150,243,0.15);"><th style="padding:8px;border:1px solid rgba(33,150,243,0.3);">رقم</th><th style="padding:8px;border:1px solid rgba(33,150,243,0.3);">نشاط التفتيش</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">H/W/R</th><th style="padding:8px;text-align:center;border:1px solid rgba(33,150,243,0.3);">الوثيقة</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">1</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">فحص Cover Depth قبل الردم</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Cover Survey Sheet</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">2</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">اعتماد Material Certificates</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;">W</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Mill Certificate + KAHRAMAA Approval</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">3</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مشاهدة اختبار الضغط</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Pressure Test Report + Chart</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">4</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مراجعة نتائج التعقيم</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;">W</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Lab Report (KAHRAMAA Approved)</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">5</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">As-Built Survey</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;">R</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">GIS / As-Built Drawing</td></tr>
</table>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px;">
  <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#4caf50;">✅ Pass — كل الشروط التالية:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>Cover ≥ الحد الأدنى في كل النقاط</li>
      <li>Pressure test: هبوط ≤ 0.1 بار / ساعة</li>
      <li>Residual Cl: 0.2-0.5 mg/L</li>
      <li>E.coli = 0 / Coliforms = 0</li>
      <li>جميع وثائق ITP موقّعة</li>
    </ul>
  </div>
  <div style="background:rgba(244,67,54,0.1);border:1px solid rgba(244,67,54,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#f44336;">❌ Fail — أي من التالي:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>Cover أقل من الحد بأي مقدار</li>
      <li>هبوط ضغط > 0.1 بار / ساعة</li>
      <li>Cl خارج النطاق المقبول</li>
      <li>أي نتيجة بكتيرية موجبة</li>
      <li>غياب أي وثيقة ITP</li>
    </ul>
  </div>
</div>

<p style="color:var(--text3);font-size:11px;margin-top:16px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);">
  📌 المراجع: QCS 2024 Section 8 Part 12 | KAHRAMAA W-001 Specifications | BS 8010 Part 1 | WHO Guidelines for Drinking-water Quality 2017 | Ashghal ITP Template
</p>
</div>`
};

// ============================================================

c['sewer_stages_detail'] = {
  title: '🚽 مراحل تنفيذ شبكة Foul Sewer — QCS S8 P6 (دليل ميداني)',
  content: `
<div style="font-family:var(--font-main);color:var(--text1);max-width:900px;margin:0 auto;">

<div style="background:rgba(121,85,72,0.1);border-right:4px solid #795548;padding:12px 16px;border-radius:8px;margin-bottom:20px;">
  <strong>⚠️ تنبيه:</strong> هذا الدليل مرجعي فقط — تحقق دائماً من المخططات الرسمية ووثائق العقد.
  المرجع الأساسي: QCS 2024 Section 8 Part 6 + Ashghal Sewer Design Manual
</div>

<h3 style="color:#795548;border-bottom:2px solid rgba(121,85,72,0.3);padding-bottom:8px;">🟤 المرحلة 1: التحضير والحفر (Excavation)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(121,85,72,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(121,85,72,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover minimum (طريق)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 1000mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.4.1</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover minimum (رصيف / خضراء)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 600mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.4.1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Gradient minimum (DN 225)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>1:150 (0.67%)</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.3.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Gradient minimum (DN 300)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>1:300 (0.33%)</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.3.2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Self-cleaning Velocity</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≥ 0.75 m/s (at 0.5D flow)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal SDM 2023</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Max Velocity</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 3.0 m/s</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.3.3</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Bedding — أسفل</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">150mm granular (10mm max)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.5.1</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Haunching</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">حتى مركز الأنبوب (0.5 D)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.5.2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Warning Tape</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">بني / أصفر — 300mm فوق</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal Standard</td></tr>
</table>

<h3 style="color:#795548;border-bottom:2px solid rgba(121,85,72,0.3);padding-bottom:8px;">🟤 المرحلة 2: التركيب والمحاور (Installation & Alignment)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(121,85,72,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(121,85,72,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Material (DN 225-600)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">UPVC SN8 / GRP SN10000</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal Approved List</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Material (DN > 600)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">GRP SN10000 / Concrete Class 120D</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Manhole Spacing (max)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">100m (خطوط رئيسية) / 50m (فرعية)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal SDM 2023</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Manhole — Invert Drop (عند تغيير الاتجاه)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≥ 25mm (إذا زاوية > 45°)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.6</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Pipe Deflection (joints)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 1.5° per joint</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P6 Cl.5.4</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Laser Grade Control</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">إلزامي — انحراف ≤ ±5mm</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal ITP</td></tr>
</table>

<h3 style="color:#795548;border-bottom:2px solid rgba(121,85,72,0.3);padding-bottom:8px;">🟤 المرحلة 3: اختبار الضغط / التسرب (Leakage Test)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(121,85,72,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(121,85,72,0.3);">البند</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">نوع الاختبار (Gravity Pipes)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Low Pressure Air Test أو Water Test</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS EN 1610</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Air Test — ضغط البدء</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">110 mbar</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS EN 1610 §13.5</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Air Test — معيار القبول</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>هبوط ≤ 5 mbar في 5 دقائق</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS EN 1610</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Water Test — water level</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≥ 1.2m فوق Invert أعلى نقطة</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS EN 1610 §13.4</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Water Test — معيار القبول</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;">هبوط منسوب ≤ 1:2000 من القطر/ساعة</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS EN 1610</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">CCTV Inspection</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">إلزامي بعد الردم الكامل</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal ITP §S-7</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Manhole Test</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Vacuum Test أو Water Test (24h)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BS EN 13508</td></tr>
</table>

<h3 style="color:#795548;border-bottom:2px solid rgba(121,85,72,0.3);padding-bottom:8px;">📋 نموذج ITP مختصر — Foul Sewer</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(121,85,72,0.15);"><th style="padding:8px;border:1px solid rgba(121,85,72,0.3);">#</th><th style="padding:8px;border:1px solid rgba(121,85,72,0.3);">نشاط التفتيش</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">H/W/R</th><th style="padding:8px;text-align:center;border:1px solid rgba(121,85,72,0.3);">الوثيقة</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">1</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">قياس Gradient (Laser Survey)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Level Survey Sheet</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">2</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Bedding Material Approval</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;">W</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Material Certificate</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">3</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مشاهدة Leakage Test</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Air/Water Test Report</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">4</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مراجعة CCTV Report</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;">W</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">CCTV Survey Report (EN 13508)</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">5</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Compaction Test (Trench)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;">R</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Proctor / CBR Report</td></tr>
</table>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
  <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#4caf50;">✅ Pass:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>Gradient ≥ الحد الأدنى محسوباً</li>
      <li>Air Test: هبوط ≤ 5 mbar / 5 دقائق</li>
      <li>CCTV: لا كسور أو تشوهات</li>
      <li>Compaction ≥ 95% (طريق)</li>
    </ul>
  </div>
  <div style="background:rgba(244,67,54,0.1);border:1px solid rgba(244,67,54,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#f44336;">❌ Fail:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>Gradient أقل من الحد (ترسبات)</li>
      <li>هبوط ضغط > 5 mbar</li>
      <li>كسر أو تشوه في CCTV</li>
      <li>Counter-gradient (عكس الانحدار)</li>
    </ul>
  </div>
</div>

<p style="color:var(--text3);font-size:11px;margin-top:16px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);">
  📌 المراجع: QCS 2024 Section 8 Part 6 | Ashghal Sewer Design Manual 2023 | BS EN 1610 | BS EN 13508 | Ashghal ITP Template
</p>
</div>`
};

// ============================================================

c['storm_stages_detail'] = {
  title: '🌧️ مراحل تنفيذ شبكة الصرف السطحي — QCS S8 P7 (دليل ميداني)',
  content: `
<div style="font-family:var(--font-main);color:var(--text1);max-width:900px;margin:0 auto;">

<div style="background:rgba(33,150,243,0.08);border-right:4px solid #1565c0;padding:12px 16px;border-radius:8px;margin-bottom:20px;">
  <strong>⚠️ تنبيه:</strong> هذا الدليل مرجعي فقط — تحقق دائماً من المخططات الرسمية ووثائق العقد.
  المرجع الأساسي: QCS 2024 Section 8 Part 7 + Ashghal Road Design Manual 2023
</div>

<h3 style="color:#1565c0;border-bottom:2px solid rgba(21,101,192,0.3);padding-bottom:8px;">🔵 المرحلة 1: التصميم الهيدرولوجي (Hydrological Design)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(21,101,192,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(21,101,192,0.3);">المعامل</th><th style="padding:8px;text-align:center;border:1px solid rgba(21,101,192,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(21,101,192,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Return Period — طريق رئيسي</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>10 سنوات</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM 2023</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Return Period — مناطق حرجة</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;"><strong>25-100 سنة</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM 2023</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Rainfall Intensity (قطر)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">IDF Curves — Ashghal Approved</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM App. C</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Runoff Coefficient (طرق مبلطة)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">C = 0.90</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM §3.2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Runoff Coefficient (مناطق مفتوحة)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">C = 0.35 – 0.55</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM §3.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Manning's n (Concrete Pipe)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">0.013</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Manning's n (GRP / HDPE)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">0.010 – 0.011</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Design Capacity</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Pipe ≤ 0.75 Full Flow</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7 Cl.3.4</td></tr>
</table>

<h3 style="color:#1565c0;border-bottom:2px solid rgba(21,101,192,0.3);padding-bottom:8px;">🔵 المرحلة 2: التركيب (Installation)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(21,101,192,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(21,101,192,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(21,101,192,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(21,101,192,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover (طريق رئيسي)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 1000mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7 Cl.4</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Material (DN 300-1500)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Reinforced Concrete Pipe Class 120D</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7 Cl.2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Material (DN > 1500 / Box Culvert)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Cast in-situ Concrete C30</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7 Cl.2.3</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Gully Spacing (سرعة تصميمية ≤ 50kph)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 50m</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM §4.5</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Manhole Spacing</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 120m (خطوط رئيسية)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Bedding</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Granular 150mm + Concrete Cradle (Class B)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7 Cl.5</td></tr>
</table>

<h3 style="color:#1565c0;border-bottom:2px solid rgba(21,101,192,0.3);padding-bottom:8px;">🔵 المرحلة 3: الاختبار والتفتيش (Testing)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(21,101,192,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(21,101,192,0.3);">البند</th><th style="padding:8px;text-align:center;border:1px solid rgba(21,101,192,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(21,101,192,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">نوع الاختبار</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Visual Inspection + CCTV</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal ITP</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Hydraulic Testing (large culverts)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Water Fill Test 24h — هبوط ≤ 50mm</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P7</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Outfall Protection</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Rip-Rap أو Concrete Apron</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM §6</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Surface Gradient (طريق)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≥ 1% نحو Gully</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal RDM §4.2</td></tr>
</table>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px;">
  <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#4caf50;">✅ Pass:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>تصميم يطابق Return Period المطلوب</li>
      <li>Pipe capacity ≤ 75% Full Flow</li>
      <li>CCTV: لا كسور أو انسداد</li>
      <li>Gully Spacing موافق للتصميم</li>
    </ul>
  </div>
  <div style="background:rgba(244,67,54,0.1);border:1px solid rgba(244,67,54,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#f44336;">❌ Fail:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>تصميم بـ Return Period أقل</li>
      <li>Pipe > 75% Full (فيضان)</li>
      <li>Counter-gradient (تجمع مياه)</li>
      <li>غياب Outfall Protection</li>
    </ul>
  </div>
</div>

<p style="color:var(--text3);font-size:11px;margin-top:16px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);">
  📌 المراجع: QCS 2024 Section 8 Part 7 | Ashghal Road Design Manual 2023 | Ashghal ITP Template | BS EN 752
</p>
</div>`
};

// ============================================================

c['treated_stages_detail'] = {
  title: '♻️ مراحل تنفيذ شبكة المياه المعالجة (TSE) — QCS S8 P5 (دليل ميداني)',
  content: `
<div style="font-family:var(--font-main);color:var(--text1);max-width:900px;margin:0 auto;">

<div style="background:rgba(76,175,80,0.08);border-right:4px solid #2e7d32;padding:12px 16px;border-radius:8px;margin-bottom:20px;">
  <strong>⚠️ تنبيه:</strong> شبكة TSE منفصلة تماماً عن مياه الشرب — أي تقاطع أو قرب = مخالفة فورية.
  المرجع الأساسي: QCS 2024 Section 8 Part 5 + Ashghal TSE Design Guidelines
</div>

<h3 style="color:#2e7d32;border-bottom:2px solid rgba(46,125,50,0.3);padding-bottom:8px;">🟢 المرحلة 1: المتطلبات الأساسية للفصل (Separation Requirements)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(46,125,50,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(46,125,50,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">فصل أفقي عن مياه الشرب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;"><strong>≥ 1500mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.3.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">TSE دائماً أسفل مياه الشرب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;"><strong>إلزامي — بلا استثناء</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.3.3</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">فصل عمودي عند التقاطع</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;"><strong>≥ 500mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.3.3</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cover (طريق)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>≥ 750mm</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.4</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Warning Tape</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">أرجواني / بنفسجي — "TREATED WATER"</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal Standard</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">لون الأنابيب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">أرجواني (Purple) — HDPE أو UPVC</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE Guidelines</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Pressure Rating</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">PN10 minimum</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.2</td></tr>
</table>

<h3 style="color:#2e7d32;border-bottom:2px solid rgba(46,125,50,0.3);padding-bottom:8px;">🟢 المرحلة 2: التركيب والمعدات (Installation & Fittings)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(46,125,50,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(46,125,50,0.3);">المتطلب</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Cross-connection Protection</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">Air Gap / Backflow Preventer إلزامي</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.7</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Valves — لون المقابض</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">أرجواني — للتمييز عن مياه الشرب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE Guidelines</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Irrigation Connection Points</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Quick-Coupling بلون بنفسجي فقط</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Signage</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">"ليست مياه شرب / NOT POTABLE" كل 10m</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.8</td></tr>
</table>

<h3 style="color:#2e7d32;border-bottom:2px solid rgba(46,125,50,0.3);padding-bottom:8px;">🟢 المرحلة 3: الاختبارات والجودة (Testing & Quality)</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(46,125,50,0.15);"><th style="padding:8px;text-align:right;border:1px solid rgba(46,125,50,0.3);">البند</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">القيمة</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">المرجع</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">ضغط الاختبار (Hydrostatic)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#4caf50;"><strong>1.5 × PN لمدة ساعتين</strong></td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">QCS S8 P5 Cl.7.2</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">جودة مياه TSE عند التشغيل</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">BOD ≤ 10 mg/L | TSS ≤ 10 mg/L</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE Standard</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">E.coli في TSE (ري)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">≤ 200 CFU/100mL (Class A)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE / WHO</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">Residual Chlorine في TSE</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">0.5 – 1.0 mg/L</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">نقاط الأخذ (Sampling)</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">نقطة كل 300m + نهايات الشبكة</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Ashghal TSE</td></tr>
</table>

<h3 style="color:#2e7d32;border-bottom:2px solid rgba(46,125,50,0.3);padding-bottom:8px;">📋 نموذج ITP مختصر — TSE Network</h3>
<table class="dm-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
  <tr style="background:rgba(46,125,50,0.15);"><th style="padding:8px;border:1px solid rgba(46,125,50,0.3);">#</th><th style="padding:8px;border:1px solid rgba(46,125,50,0.3);">نشاط التفتيش</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">H/W/R</th><th style="padding:8px;text-align:center;border:1px solid rgba(46,125,50,0.3);">الوثيقة</th></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">1</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">قياس Separation من مياه الشرب</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Separation Survey Sheet</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">2</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">التحقق من لون الأنابيب والتسميات</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Visual Inspection Record</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">3</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مشاهدة اختبار الضغط</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Pressure Test Report</td></tr>
  <tr style="background:rgba(255,255,255,0.03);"><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">4</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">مراجعة نتائج جودة TSE</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#ff9800;">W</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Lab Report — Ashghal Approved</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">5</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.1);">فحص Cross-Connection Protection</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);color:#f44336;">H</td><td style="padding:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">Backflow Prevention Certificate</td></tr>
</table>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
  <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#4caf50;">✅ Pass:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>Separation ≥ 1500mm من مياه الشرب</li>
      <li>TSE دائماً أسفل Water Main</li>
      <li>Pressure Test: هبوط ≤ 0.1 بار</li>
      <li>جودة TSE ضمن المعايير</li>
      <li>جميع النقاط مؤشَّرة بالبنفسجي</li>
    </ul>
  </div>
  <div style="background:rgba(244,67,54,0.1);border:1px solid rgba(244,67,54,0.4);border-radius:8px;padding:12px;">
    <strong style="color:#f44336;">❌ Fail — IMMEDIATE STOP:</strong>
    <ul style="margin:8px 0 0 0;padding-right:16px;color:var(--text2);font-size:13px;line-height:1.8;">
      <li>أي Cross-connection مع مياه الشرب</li>
      <li>TSE فوق Water Main</li>
      <li>غياب Backflow Prevention</li>
      <li>غياب اللون البنفسجي أو التسميات</li>
      <li>E.coli > 200 CFU/100mL</li>
    </ul>
  </div>
</div>

<p style="color:var(--text3);font-size:11px;margin-top:16px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);">
  📌 المراجع: QCS 2024 Section 8 Part 5 | Ashghal TSE Design Guidelines | WHO Wastewater Reuse Guidelines 2006 | Ashghal ITP Template
</p>
</div>`
};

})();

