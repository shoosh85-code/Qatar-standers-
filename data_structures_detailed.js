// ═══════════════════════════════════════════════════════════════════════════════
// QatarSpec Pro — data_structures_detailed.js
// المرحلة 1: الحفر والردم + الخوازيق + القواعد (3 مراحل أولى)
// QCS 2024 S5 + S3 | BS EN 1536 | ACI 318
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';
  
  window.QS_CONTENT = window.QS_CONTENT || {};

  // ═════════════════════════════════════════════════════════════════════════════
  // المرحلة 1: الحفر والردم (Excavation & Earthworks)
  // ═════════════════════════════════════════════════════════════════════════════
  QS_CONTENT.structures_buildings = {
    title: "الأبراج والمباني — Buildings & Towers | QCS 2024 S5",
    content: `
<div class="lang-content-ar" style="display:block">
  
  <!-- ========== المرحلة 1: الحفر والردم ========== -->
  <div style="background:linear-gradient(135deg,rgba(122,21,21,0.15),rgba(90,15,15,0.05));border:1px solid rgba(122,21,21,0.3);border-radius:16px;padding:20px;margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
      <span style="font-size:28px;">⛏️</span>
      <div>
        <div style="font-family:'Cairo',sans-serif;font-size:18px;font-weight:800;color:var(--gold);">المرحلة 1: الحفر والردم</div>
        <div style="font-size:11px;color:var(--text3);">Excavation & Earthworks | QCS 2024 S3 P2 + S5 P2</div>
      </div>
    </div>
    
    <div style="font-size:13px;line-height:1.8;color:var(--text2);margin-bottom:16px;">
      <strong style="color:var(--gold2);">الغرض:</strong> إعداد الموقع للأساسات بإزالة التربة غير الملائمة وردم الطبقات المطلوبة.<br>
      <strong style="color:var(--gold2);">النطاق:</strong> حفر حتى منسوب التأسيس المعتمد (Founding Level)، ردم بمواد معتمدة، دك بدرجات محددة.<br>
      <strong style="color:var(--gold2);">الأخطاء الشائعة:</strong> الحفر الزائد (Over-excavation) بدون موافقة الجيوتقني، ردم بمواد غير معتمدة، دك غير كافٍ يؤدي إلى هبوط تفاضلي.
    </div>

    <!-- ITP Table -->
    <div style="margin-bottom:16px;">
      <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:var(--gold);margin-bottom:8px;">📋 ITP — خطة الفحص والاختبار</div>
      <div style="overflow-x:auto;">
        <table class="dm-table" style="min-width:600px;">
          <thead>
            <tr>
              <th>م</th>
              <th>النشاط</th>
              <th>معيار القبول</th>
              <th>التكرار</th>
              <th>الطريقة</th>
              <th>النقطة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>تحديد منسوب التأسيس</td>
              <td>حسب تقرير الجيوتقني المعتمد</td>
              <td>كل نقطة</td>
              <td>Level Survey</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>فحص نوعية التربة</td>
              <td>مطابقة للتقرير الجيوتقني</td>
              <td>كل 50m²</td>
              <td>Visual + SPT</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>سلامة الحفريات</td>
              <td>Shoring + Dewatering حسب QCS S1</td>
              <td>يومي</td>
              <td>Visual Inspection</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>اختبار CBR للتربة الطبيعية</td>
              <td>≥ 8% للأساسات المباشرة</td>
              <td>كل 500m²</td>
              <td>ASTM D1883</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>فحص عمق الحفر</td>
              <td>± 50mm من المنسوب المعتمد</td>
              <td>كل 10m</td>
              <td>Level + Tape</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>ردم Subgrade</td>
              <td>مواد حبيبية نظيفة، لا طين</td>
              <td>كل طبقة 150mm</td>
              <td>Visual + Sieve</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>7</td>
              <td>دمك الردم</td>
              <td>≥ 95% MDD (Standard Proctor)</td>
              <td>كل طبقة 500m²</td>
              <td>NDG + Sand Cone</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>محتوى الرطوبة</td>
              <td>OMC ± 2%</td>
              <td>مع كل اختبار دمك</td>
              <td>Oven Dry / Speedy</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>9</td>
              <td>مستوى النظافة</td>
              <td>خالي من مواد عضوية، ماء، زيوت</td>
              <td>قبل كل طبقة خرسانة</td>
              <td>Visual</td>
              <td><span style="background:rgba(52,152,219,0.2);color:#3498db;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">R</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>موافقة الجيوتقني</td>
              <td>توقيع مهندس التربة المعتمد</td>
              <td>مرة واحدة</td>
              <td>Document Review</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="font-size:10px;color:var(--text3);margin-top:6px;">
        <span style="background:rgba(231,76,60,0.15);color:#e74c3c;padding:1px 6px;border-radius:3px;">H</span> = Hold Point (إيقاف إلزامي) | 
        <span style="background:rgba(243,156,18,0.15);color:#f39c12;padding:1px 6px;border-radius:3px;">W</span> = Witness Point (شاهد) | 
        <span style="background:rgba(52,152,219,0.15);color:#3498db;padding:1px 6px;border-radius:3px;">R</span> = Review (مراجعة)
      </div>
    </div>

    <!-- Calculator: Compaction -->
    <div style="background:var(--dark4);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:var(--gold);margin-bottom:12px;">🧮 حاسبة الدمك — Compaction Check</div>
      
      <div class="calc-row">
        <span class="calc-label">الكثافة الجافة المقاسة (γd):</span>
        <input type="number" class="calc-input" id="comp-gamma-d" placeholder="1.85" step="0.01">
        <span class="calc-unit">t/m³</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">الكثافة الجافة القصوى (MDD):</span>
        <input type="number" class="calc-input" id="comp-mdd" placeholder="1.95" step="0.01">
        <span class="calc-unit">t/m³</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">نسبة الرطوبة المقاسة:</span>
        <input type="number" class="calc-input" id="comp-mc" placeholder="12" step="0.1">
        <span class="calc-unit">%</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">نسبة الرطوبة المثلى (OMC):</span>
        <input type="number" class="calc-input" id="comp-omc" placeholder="10" step="0.1">
        <span class="calc-unit">%</span>
      </div>
      
      <button class="calc-btn" onclick="calcCompaction()">📊 احسب الدمك</button>
      
      <div class="calc-result" id="comp-result">
        <div class="calc-result-header">
          <span class="calc-result-icon" id="comp-icon">⏳</span>
          <span class="calc-result-text" id="comp-text">في انتظار البيانات...</span>
        </div>
        <div id="comp-details"></div>
      </div>
    </div>

    <!-- Checklist -->
    <div style="background:var(--dark4);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:var(--gold);">✅ Checklist — فحص ميداني</div>
        <div style="font-size:12px;color:var(--text3);" id="exc-check-progress">0 / 10</div>
      </div>
      <div style="height:4px;background:var(--dark5);border-radius:2px;margin-bottom:12px;overflow:hidden;">
        <div id="exc-progress-bar" style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width 0.3s;border-radius:2px;"></div>
      </div>
      
      <div id="exc-checklist-items">
        ${generateChecklistItems([
          'تقرير الجيوتقني معتمد ومحدث',
          'منسوب التأسيس محدد وموقع',
          'Shoring مُنفذ حسب المخططات المعتمدة',
          'Dewatering يعمل بكفاءة (إن وجد)',
          'CBR ≥ 8% للتربة الطبيعية',
          'لا Over-excavation بدون موافقة',
          'مواد الردم نظيفة (حبيبية، لا طين)',
          'دمك ≥ 95% MDD لكل طبقة',
          'MC = OMC ± 2%',
          'موافقة الجيوتقني على النهائي'
        ], 'exc')}
      </div>
      
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button onclick="exportChecklistExcel('exc', 'الحفر والردم')" style="flex:1;background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;color:#2ecc71;font-size:12px;cursor:pointer;">📊 Excel</button>
        <button onclick="resetChecklist('exc')" style="background:var(--dark5);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text3);font-size:12px;cursor:pointer;">🔄 إعادة</button>
      </div>
    </div>

  </div>

  <!-- ========== المرحلة 2: الخوازيق ========== -->
  <div style="background:linear-gradient(135deg,rgba(52,152,219,0.15),rgba(52,152,219,0.05));border:1px solid rgba(52,152,219,0.3);border-radius:16px;padding:20px;margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
      <span style="font-size:28px;">🏗️</span>
      <div>
        <div style="font-family:'Cairo',sans-serif;font-size:18px;font-weight:800;color:#3498db;">المرحلة 2: الخوازيق</div>
        <div style="font-size:11px;color:var(--text3);">Piling Works | QCS 2024 S5 P6 | BS EN 1536</div>
      </div>
    </div>
    
    <div style="font-size:13px;line-height:1.8;color:var(--text2);margin-bottom:16px;">
      <strong style="color:#3498db;">الغرض:</strong> نقل الأحمال الإنشائية إلى طبقات التربة العميقة ذات القدرة التحمل العالية.<br>
      <strong style="color:#3498db;">الأنواع:</strong> Bored Piles (الأكثر شيوعاً في قطر) · Driven Piles · CFA Piles.<br>
      <strong style="color:#3498db;">الأخطاء الشائعة:</strong> انحراف المحور > 1:75، انهيار جدار الحفر، خرسانة غير مطابقة، فشل اختبار التحميل.
    </div>

    <!-- ITP Table -->
    <div style="margin-bottom:16px;">
      <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:#3498db;margin-bottom:8px;">📋 ITP — خطة الفحص والاختبار</div>
      <div style="overflow-x:auto;">
        <table class="dm-table" style="min-width:600px;">
          <thead>
            <tr>
              <th>م</th>
              <th>النشاط</th>
              <th>معيار القبول</th>
              <th>التكرار</th>
              <th>الطريقة</th>
              <th>النقطة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>مراجعة مخططات الخوازيق</td>
              <td>معتمدة من الاستشاري + الحسابات</td>
              <td>مرة واحدة</td>
              <td>Document Review</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>مواد الخرسانة</td>
              <td>C35/45 min, Sulfate Resistant إن لزم</td>
              <td>كل صبة</td>
              <td>Mill Cert + Cube Test</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>حفر الخوازيق</td>
              <td>القطر ± 50mm, العمق +300mm/-0mm</td>
              <td>كل خازوق</td>
              <td>Tape + Caliper</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>انحراف المحور</td>
              <td>≤ 1:75 (≤ 75mm per 5.6m)</td>
              <td>كل خازوق</td>
              <td>Theodolite / Plumb</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>تسليح الخوازيق</td>
              <td>حسب المخططات + Cover 75mm min</td>
              <td>كل خازوق</td>
              <td>Visual + Tape</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>صب الخرسانة</td>
              <td>Slump 100-150mm, Temp ≤ 32°C</td>
              <td>كل صبة</td>
              <td>Slump + Thermometer</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>7</td>
              <td>اختبار المكعبات</td>
              <td>28-day ≥ fcu (C35 = 35 MPa)</td>
              <td>6 مكعبات / 50m³</td>
              <td>BS EN 12390</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>اختبار التحميل الساكن</td>
              <td>1.5 × Working Load, Settlement ≤ 25mm</td>
              <td>1% min (3 خوازيق)</td>
              <td>BS EN 1536 / ASTM D1143</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>9</td>
              <td>اختبار PIT</td>
              <td>لا عيوب هيكلية > 10% القطر</td>
              <td>20% من الخوازيق</td>
              <td>Low Strain Dynamic</td>
              <td><span style="background:rgba(52,152,219,0.2);color:#3498db;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">R</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>تقرير اختبار التحميل</td>
              <td>معتمد من مختبر معتمد + الاستشاري</td>
              <td>لكل اختبار</td>
              <td>Document Review</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>11</td>
              <td>قطع الرأس (Pile Cropping)</td>
              <td>إلى منسوب التسليح + 50mm</td>
              <td>كل خازوق</td>
              <td>Visual + Level</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>12</td>
              <td>تسليم الخوازيق</td>
              <td>RFI موقعة + تقارير اختبارات كاملة</td>
              <td>مرة واحدة</td>
              <td>Document Review</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Calculator: Pile Concrete Volume -->
    <div style="background:var(--dark4);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:#3498db;margin-bottom:12px;">🧮 حاسبة خرسانة الخوازيق</div>
      
      <div class="calc-row">
        <span class="calc-label">قطر الخازوق (D):</span>
        <input type="number" class="calc-input" id="pile-dia" placeholder="600" step="50">
        <span class="calc-unit">mm</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">عمق الخازوق (L):</span>
        <input type="number" class="calc-input" id="pile-depth" placeholder="15" step="0.5">
        <span class="calc-unit">m</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">عدد الخوازيق:</span>
        <input type="number" class="calc-input" id="pile-count" placeholder="20" step="1">
        <span class="calc-unit">عدد</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">نسبة الهدر:</span>
        <input type="number" class="calc-input" id="pile-waste" placeholder="10" step="5">
        <span class="calc-unit">%</span>
      </div>
      
      <button class="calc-btn" onclick="calcPileConcrete()" style="background:linear-gradient(135deg,#2980b9,#1a5276);">📊 احسب الكمية</button>
      
      <div class="calc-result" id="pile-result">
        <div class="calc-result-header">
          <span class="calc-result-icon" id="pile-icon">⏳</span>
          <span class="calc-result-text" id="pile-text">في انتظار البيانات...</span>
        </div>
        <div id="pile-details"></div>
      </div>
    </div>

    <!-- Checklist -->
    <div style="background:var(--dark4);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:#3498db;">✅ Checklist — خوازيق</div>
        <div style="font-size:12px;color:var(--text3);" id="pile-check-progress">0 / 12</div>
      </div>
      <div style="height:4px;background:var(--dark5);border-radius:2px;margin-bottom:12px;overflow:hidden;">
        <div id="pile-progress-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#3498db,#5dade2);transition:width 0.3s;border-radius:2px;"></div>
      </div>
      
      <div id="pile-checklist-items">
        ${generateChecklistItems([
          'مخططات الخوازيق معتمدة من الاستشاري',
          'تقرير الجيوتقني يغطي عمق الخوازيق',
          'Mill Certificate للخرسانة C35/45',
          'حديد التسليح معتمد (BS 4449 / ASTM A615)',
          'حفر الخوازيق: القطر والعمق مطابقان',
          'انحراف المحور ≤ 1:75',
          'تسليح الخوازيق: Cover 75mm min',
          'Slump 100-150mm عند الصب',
          '6 مكعبات / 50m³ صب',
          'اختبار التحميل الساكن 1.5×WL',
          'PIT Test 20% من الخوازيق',
          'تقرير اختبارات معتمد ومُسلّم'
        ], 'pile')}
      </div>
      
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button onclick="exportChecklistExcel('pile', 'الخوازيق')" style="flex:1;background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;color:#2ecc71;font-size:12px;cursor:pointer;">📊 Excel</button>
        <button onclick="resetChecklist('pile')" style="background:var(--dark5);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text3);font-size:12px;cursor:pointer;">🔄 إعادة</button>
      </div>
    </div>

  </div>

  <!-- ========== المرحلة 3: القواعد والأساسات ========== -->
  <div style="background:linear-gradient(135deg,rgba(46,204,113,0.15),rgba(46,204,113,0.05));border:1px solid rgba(46,204,113,0.3);border-radius:16px;padding:20px;margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
      <span style="font-size:28px;">🏛️</span>
      <div>
        <div style="font-family:'Cairo',sans-serif;font-size:18px;font-weight:800;color:#2ecc71;">المرحلة 3: القواعد والأساسات</div>
        <div style="font-size:11px;color:var(--text3);">Foundations | QCS 2024 S5 P3 | ACI 318</div>
      </div>
    </div>
    
    <div style="font-size:13px;line-height:1.8;color:var(--text2);margin-bottom:16px;">
      <strong style="color:#2ecc71;">الغرض:</strong> توزيع أحمال المبنى إلى التربة بطريقة آمنة ومستدامة.<br>
      <strong style="color:#2ecc71;">الأنواع:</strong> Isolated Footings · Combined Footings · Raft Foundations · Pile Caps.<br>
      <strong style="color:#2ecc71;">الأخطاء الشائعة:</strong> Cover غير كافٍ، حديد رئيسي مقلوب، فصل بين الخرسانة القديمة والجديدة، عدم تنظيف القالب.
    </div>

    <!-- ITP Table -->
    <div style="margin-bottom:16px;">
      <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:#2ecc71;margin-bottom:8px;">📋 ITP — خطة الفحص والاختبار</div>
      <div style="overflow-x:auto;">
        <table class="dm-table" style="min-width:600px;">
          <thead>
            <tr>
              <th>م</th>
              <th>النشاط</th>
              <th>معيار القبول</th>
              <th>التكرار</th>
              <th>الطريقة</th>
              <th>النقطة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>مراجعة مخططات القواعد</td>
              <td>معتمدة + حسابات التسليح واضحة</td>
              <td>مرة واحدة</td>
              <td>Document Review</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>تسليح القواعد</td>
              <td>حسب المخطط + Cover 75mm (أساسات)</td>
              <td>كل قاعدة</td>
              <td>Visual + Tape + Cover Meter</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>فحص القوالب</td>
              <td>مستوية، نظيفة، مُشحمة، Dimension ± 10mm</td>
              <td>كل قاعدة</td>
              <td>Visual + Tape + Level</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>صب الخرسانة</td>
              <td>Slump ± 25mm من التصميم، Temp ≤ 32°C</td>
              <td>كل صبة</td>
              <td>Slump + Thermometer</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>مكعبات الخرسانة</td>
              <td>28-day ≥ fcu</td>
              <td>6 / 50m³</td>
              <td>BS EN 12390</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>معالجة الخرسانة</td>
              <td>رش ماء 7 أيام min أو مركب معالجة</td>
              <td>يومي × 7</td>
              <td>Visual</td>
              <td><span style="background:rgba(243,156,18,0.2);color:#f39c12;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">W</span></td>
            </tr>
            <tr>
              <td>7</td>
              <td>فك القوالب</td>
              <td>بعد 28-day cube ≥ fcu (عادة 3-7 أيام)</td>
              <td>كل قاعدة</td>
              <td>Visual + Cube Results</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>فحص Cover بعد الفك</td>
              <td>≥ 75mm (أساسات) — لا تسامح</td>
              <td>10% من القواعد</td>
              <td>Cover Meter</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
            <tr>
              <td>9</td>
              <td>تسوية السطح</td>
              <td>± 10mm من المنسوب</td>
              <td>كل قاعدة</td>
              <td>Level + Straightedge</td>
              <td><span style="background:rgba(52,152,219,0.2);color:#3498db;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">R</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>تسليم القواعد</td>
              <td>RFI + Cube Results + Cover Test</td>
              <td>مرة واحدة</td>
              <td>Document Review</td>
              <td><span style="background:rgba(231,76,60,0.2);color:#e74c3c;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">H</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Calculator: Foundation Concrete -->
    <div style="background:var(--dark4);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:#2ecc71;margin-bottom:12px;">🧮 حاسبة خرسانة القواعد</div>
      
      <div class="calc-row">
        <span class="calc-label">نوع القاعدة:</span>
        <select class="calc-select" id="found-type" style="width:180px;">
          <option value="isolated">Isolated (منفردة)</option>
          <option value="combined">Combined (مشتركة)</option>
          <option value="raft">Raft (لبشة)</option>
          <option value="strap">Strap (رباط)</option>
        </select>
      </div>
      <div class="calc-row">
        <span class="calc-label">الطول (L):</span>
        <input type="number" class="calc-input" id="found-l" placeholder="2.5" step="0.1">
        <span class="calc-unit">m</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">العرض (B):</span>
        <input type="number" class="calc-input" id="found-b" placeholder="2.5" step="0.1">
        <span class="calc-unit">m</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">السمك (D):</span>
        <input type="number" class="calc-input" id="found-d" placeholder="0.6" step="0.05">
        <span class="calc-unit">m</span>
      </div>
      <div class="calc-row">
        <span class="calc-label">عدد القواعد:</span>
        <input type="number" class="calc-input" id="found-count" placeholder="12" step="1">
        <span class="calc-unit">عدد</span>
      </div>
      
      <button class="calc-btn" onclick="calcFoundationConcrete()" style="background:linear-gradient(135deg,#27ae60,#1e8449);">📊 احسب الكمية</button>
      
      <div class="calc-result" id="found-result">
        <div class="calc-result-header">
          <span class="calc-result-icon" id="found-icon">⏳</span>
          <span class="calc-result-text" id="found-text">في انتظار البيانات...</span>
        </div>
        <div id="found-details"></div>
      </div>
    </div>

    <!-- Checklist -->
    <div style="background:var(--dark4);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div style="font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;color:#2ecc71;">✅ Checklist — قواعد وأساسات</div>
        <div style="font-size:12px;color:var(--text3);" id="found-check-progress">0 / 10</div>
      </div>
      <div style="height:4px;background:var(--dark5);border-radius:2px;margin-bottom:12px;overflow:hidden;">
        <div id="found-progress-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#2ecc71,#58d68d);transition:width 0.3s;border-radius:2px;"></div>
      </div>
      
      <div id="found-checklist-items">
        ${generateChecklistItems([
          'مخططات القواعد معتمدة وحسابات التسليح واضحة',
          'منسوب التأسيس مطابق للتقرير الجيوتقني',
          'تسليح القواعد: أقطار + تباعد + Lap حسب المخطط',
          'Cover 75mm للأساسات (يُقاس بالـ Cover Meter)',
          'القوالب نظيفة ومُشحمة ومستوية',
          'لا تراكم ماء في القواعد قبل الصب',
          'Slump ± 25mm من التصميم',
          '6 مكعبات / 50m³ صب',
          'معالجة 7 أيام min (رش ماء أو مركب)',
          'Cover Test بعد الفك: ≥ 75mm'
        ], 'found')}
      </div>
      
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button onclick="exportChecklistExcel('found', 'القواعد والأساسات')" style="flex:1;background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:8px;color:#2ecc71;font-size:12px;cursor:pointer;">📊 Excel</button>
        <button onclick="resetChecklist('found')" style="background:var(--dark5);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text3);font-size:12px;cursor:pointer;">🔄 إعادة</button>
      </div>
    </div>

  </div>

  <!-- ========== المرحلة 4: الخرسانة المسلحة ========== -->
  <div style="background:var(--dark2);border:1px solid var(--border);border-radius:14px;padding:18px;margin-bottom:16px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
      <span style="font-size:26px;">🏗️</span>
      <div>
        <div style="font-family:'Cairo',sans-serif;font-size:18px;font-weight:800;color:#e67e22;">المرحلة 4: الخرسانة المسلحة</div>
        <div style="font-size:11px;color:var(--text3);">QCS 2024 S5 P3 | BS EN 206 | ACI 318</div>
      </div>
    </div>

    <!-- متطلبات التصميم -->
    <div style="background:rgba(230,126,34,0.07);border:1px solid rgba(230,126,34,0.2);border-radius:10px;padding:14px;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:#e67e22;margin-bottom:10px;">📋 متطلبات الخرسانة — QCS S5/P3/C2</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">
        <div style="background:var(--dark3);border-radius:6px;padding:8px;">
          <div style="color:var(--text3);font-size:10px;">الدرجة الدنيا للأساسات</div>
          <div style="color:#e67e22;font-weight:700;">C30 — (fck = 30 MPa)</div>
        </div>
        <div style="background:var(--dark3);border-radius:6px;padding:8px;">
          <div style="color:var(--text3);font-size:10px;">الدرجة الدنيا للأعمدة/الجسور</div>
          <div style="color:#e67e22;font-weight:700;">C35 — (fck = 35 MPa)</div>
        </div>
        <div style="background:var(--dark3);border-radius:6px;padding:8px;">
          <div style="color:var(--text3);font-size:10px;">نسبة الماء/الاسمنت (W/C) — QCS</div>
          <div style="color:#e67e22;font-weight:700;">≤ 0.45 (بيئة قطر)</div>
        </div>
        <div style="background:var(--dark3);border-radius:6px;padding:8px;">
          <div style="color:var(--text3);font-size:10px;">الحد الأدنى للاسمنت</div>
          <div style="color:#e67e22;font-weight:700;">350 kg/m³</div>
        </div>
        <div style="background:var(--dark3);border-radius:6px;padding:8px;">
          <div style="color:var(--text3);font-size:10px;">الهبوط (Slump) — QCS S5/P3/C4</div>
          <div style="color:#e67e22;font-weight:700;">75–125 mm (مضخة: ≤ 150)</div>
        </div>
        <div style="background:var(--dark3);border-radius:6px;padding:8px;">
          <div style="color:var(--text3);font-size:10px;">مقاومة الكلوريد — XS / XD</div>
          <div style="color:#e67e22;font-weight:700;">≤ 0.2% Cl⁻ by cement wt</div>
        </div>
      </div>
    </div>

    <!-- Cube Test Requirements -->
    <div style="background:rgba(230,126,34,0.07);border:1px solid rgba(230,126,34,0.2);border-radius:10px;padding:14px;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:#e67e22;margin-bottom:10px;">🧊 اختبار المكعبات — QCS S5/P3/C7</div>
      <table style="width:100%;border-collapse:collapse;font-size:11px;">
        <tr style="background:rgba(230,126,34,0.15);">
          <th style="padding:6px 8px;text-align:right;color:var(--text2);border-bottom:1px solid var(--border);">الدرجة</th>
          <th style="padding:6px 8px;text-align:center;color:var(--text2);border-bottom:1px solid var(--border);">7 أيام (MPa)</th>
          <th style="padding:6px 8px;text-align:center;color:var(--text2);border-bottom:1px solid var(--border);">28 يوم (MPa)</th>
          <th style="padding:6px 8px;text-align:center;color:var(--text2);border-bottom:1px solid var(--border);">العينات لكل 50m³</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border2);">
          <td style="padding:5px 8px;color:#e67e22;font-weight:700;">C25</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 16</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 25</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">3 مكعبات</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border2);">
          <td style="padding:5px 8px;color:#e67e22;font-weight:700;">C30</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 20</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 30</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">3 مكعبات</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border2);">
          <td style="padding:5px 8px;color:#e67e22;font-weight:700;">C35</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 23</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 35</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">3 مكعبات</td>
        </tr>
        <tr>
          <td style="padding:5px 8px;color:#e67e22;font-weight:700;">C40</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 27</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">≥ 40</td>
          <td style="padding:5px 8px;text-align:center;color:var(--text2);">3 مكعبات</td>
        </tr>
      </table>
      <div style="font-size:10px;color:var(--text3);margin-top:6px;">⚠️ فشل أي مكعب بأقل من 85% → STOP + إخطار المهندس فوراً — QCS S5/P3/C7.4</div>
    </div>

    <!-- Curing Requirements -->
    <div style="background:rgba(230,126,34,0.07);border:1px solid rgba(230,126,34,0.2);border-radius:10px;padding:14px;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:#e67e22;margin-bottom:10px;">💧 المعالجة (Curing) — QCS S5/P3/C9</div>
      <div style="font-size:12px;color:var(--text2);line-height:1.8;">
        • <strong style="color:#e67e22;">مدة المعالجة:</strong> ≥ 7 أيام بعد الصب (بيئة قطر الحارة)<br>
        • <strong style="color:#e67e22;">درجة الحرارة أثناء الصب:</strong> ≤ 32°C (خرسانة جاهزة) / ≤ 35°C (في القالب)<br>
        • <strong style="color:#e67e22;">الصب الليلي:</strong> مُفضَّل في الصيف (يونيو–سبتمبر)<br>
        • <strong style="color:#e67e22;">طرق المعالجة:</strong> رش الماء + أغطية رطبة + مركبات Curing Compound<br>
        • <strong style="color:#e67e22;">ممنوع:</strong> الصب عند درجة حرارة > 38°C دون موافقة المهندس<br>
        • <strong style="color:#e67e22;">حماية من الشمس:</strong> إلزامية لجميع الأسطح الأفقية
      </div>
    </div>

    <!-- حاسبة الخرسانة -->
    <div style="background:rgba(230,126,34,0.1);border:2px solid rgba(230,126,34,0.3);border-radius:10px;padding:14px;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:#e67e22;margin-bottom:12px;">🧮 حاسبة المزيج — Concrete Mix Calculator</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <div>
          <label style="font-size:11px;color:var(--text3);display:block;margin-bottom:4px;">الحجم الكلي (m³)</label>
          <input type="number" id="conc_vol" value="10" min="0.1" step="0.1"
            style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:6px;padding:8px;color:var(--text1);font-size:13px;box-sizing:border-box;"
            oninput="calcConcreteMix()">
        </div>
        <div>
          <label style="font-size:11px;color:var(--text3);display:block;margin-bottom:4px;">درجة الخرسانة</label>
          <select id="conc_grade"
            style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:6px;padding:8px;color:var(--text1);font-size:13px;box-sizing:border-box;"
            onchange="calcConcreteMix()">
            <option value="25">C25</option>
            <option value="30" selected>C30</option>
            <option value="35">C35</option>
            <option value="40">C40</option>
          </select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--text3);display:block;margin-bottom:4px;">نسبة الهدر (waste %)</label>
          <input type="number" id="conc_waste" value="5" min="0" max="20" step="1"
            style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:6px;padding:8px;color:var(--text1);font-size:13px;box-sizing:border-box;"
            oninput="calcConcreteMix()">
        </div>
        <div>
          <label style="font-size:11px;color:var(--text3);display:block;margin-bottom:4px;">عدد الطوابق</label>
          <input type="number" id="conc_floors" value="1" min="1" max="100" step="1"
            style="width:100%;background:var(--dark3);border:1px solid var(--border);border-radius:6px;padding:8px;color:var(--text1);font-size:13px;box-sizing:border-box;"
            oninput="calcConcreteMix()">
        </div>
      </div>
      <div id="concResult" style="background:var(--dark3);border-radius:8px;padding:12px;font-size:12px;line-height:2;"></div>
    </div>

    <!-- Checklist -->
    <div style="background:rgba(230,126,34,0.05);border:1px solid rgba(230,126,34,0.15);border-radius:10px;padding:14px;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:#e67e22;margin-bottom:10px;">✅ Checklist الخرسانة — QCS S5/P3</div>
      <div id="conc_checklist"></div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button onclick="exportChecklistExcel('conc','الخرسانة المسلحة')" style="flex:1;background:rgba(230,126,34,0.1);border:1px solid rgba(230,126,34,0.3);border-radius:8px;padding:8px;color:#e67e22;font-size:12px;cursor:pointer;">📊 Excel</button>
        <button onclick="resetChecklist('conc')" style="background:var(--dark5);border:1px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text3);font-size:12px;cursor:pointer;">🔄 إعادة</button>
      </div>
    </div>
  </div>

  <!-- Navigation: phases 5-8 still pending -->
  <div style="background:linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.02));border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:16px;text-align:center;">
    <div style="font-size:13px;color:var(--text2);margin-bottom:8px;">
      📌 <strong style="color:var(--gold);">المراحل 5–8 قيد الإضافة:</strong> حديد التسليح · البناء والطابوق · العزل المائي · التشطيبات والتسليم
    </div>
    <div style="font-size:11px;color:var(--text3);">يتم تحديث الموقع تدريجياً وفق بروتوكول QatarSpec Pro</div>
  </div>

</div>

<!-- English Version -->
<div class="lang-content-en" style="display:none">
  <div style="padding:20px;text-align:center;color:var(--text3);">
    <div style="font-size:18px;margin-bottom:8px;">🏗️</div>
    <div style="font-family:'Cairo',sans-serif;font-size:16px;font-weight:700;color:var(--gold);">Buildings & Towers</div>
    <div style="font-size:13px;margin-top:8px;">Full bilingual content coming in Phase 1B.<br>النسخة العربية الكاملة متاحة أعلاه.</div>
  </div>
</div>
`
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // Helper Functions (injected into page scope)
  // ═════════════════════════════════════════════════════════════════════════════

  // ─── حاسبة مزيج الخرسانة ───
  window.calcConcreteMix = function() {
    const vol   = parseFloat(document.getElementById('conc_vol')?.value) || 0;
    const grade = parseInt(document.getElementById('conc_grade')?.value)  || 30;
    const waste = parseFloat(document.getElementById('conc_waste')?.value) || 5;
    const floors = parseInt(document.getElementById('conc_floors')?.value) || 1;
    const res   = document.getElementById('concResult');
    if (!res) return;

    if (vol <= 0) { res.innerHTML = '<span style="color:#e74c3c;">⚠️ أدخل حجماً صحيحاً</span>'; return; }

    // نسب المزيج لكل درجة (kg/m³) — QCS S5/P3 + BS EN 206
    const mixes = {
      25: { cement:320, water:144, sand:780, aggregate:1080, wc:0.45 },
      30: { cement:360, water:158, sand:740, aggregate:1060, wc:0.44 },
      35: { cement:390, water:164, sand:710, aggregate:1040, wc:0.42 },
      40: { cement:420, water:168, sand:680, aggregate:1020, wc:0.40 }
    };
    const m = mixes[grade];
    const totalVol = vol * floors * (1 + waste/100);

    const cement = (m.cement * totalVol / 1000).toFixed(2);  // طن
    const water  = (m.water  * totalVol).toFixed(0);          // لتر
    const sand   = (m.sand   * totalVol / 1000).toFixed(2);   // طن
    const agg    = (m.aggregate * totalVol / 1000).toFixed(2);// طن
    const trucks = Math.ceil(totalVol / 6);                   // شاحنة 6m³

    const wcOk   = m.wc <= 0.45;
    const status = wcOk ? '✅ PASS' : '❌ FAIL';
    const statusColor = wcOk ? '#2ecc71' : '#e74c3c';

    res.innerHTML =
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">' +
        '<div style="background:var(--dark2);border-radius:6px;padding:8px;"><div style="font-size:10px;color:var(--text3);">الحجم الكلي (مع الهدر)</div><div style="color:#e67e22;font-weight:700;">' + totalVol.toFixed(2) + ' m³</div></div>' +
        '<div style="background:var(--dark2);border-radius:6px;padding:8px;"><div style="font-size:10px;color:var(--text3);">عدد الشاحنات (6m³)</div><div style="color:#e67e22;font-weight:700;">' + trucks + ' شاحنة</div></div>' +
        '<div style="background:var(--dark2);border-radius:6px;padding:8px;"><div style="font-size:10px;color:var(--text3);">اسمنت</div><div style="color:#f1c40f;font-weight:700;">' + cement + ' طن</div></div>' +
        '<div style="background:var(--dark2);border-radius:6px;padding:8px;"><div style="font-size:10px;color:var(--text3);">ماء</div><div style="color:#3498db;font-weight:700;">' + water + ' لتر</div></div>' +
        '<div style="background:var(--dark2);border-radius:6px;padding:8px;"><div style="font-size:10px;color:var(--text3);">رمل</div><div style="color:var(--text2);font-weight:700;">' + sand + ' طن</div></div>' +
        '<div style="background:var(--dark2);border-radius:6px;padding:8px;"><div style="font-size:10px;color:var(--text3);">ركام خشن</div><div style="color:var(--text2);font-weight:700;">' + agg + ' طن</div></div>' +
      '</div>' +
      '<div style="margin-top:8px;background:var(--dark2);border-radius:6px;padding:8px;display:flex;justify-content:space-between;align-items:center;">' +
        '<span style="font-size:11px;color:var(--text3);">نسبة W/C: ' + m.wc + ' | QCS ≤ 0.45</span>' +
        '<span style="font-size:13px;font-weight:800;color:' + statusColor + ';">' + status + '</span>' +
      '</div>' +
      '<div style="font-size:10px;color:var(--text3);margin-top:6px;">📌 QCS 2024 S5/P3/C2 | درجة C' + grade + ' | بيئة قطر الخليجية</div>';
  };

  // تهيئة الحاسبة عند التحميل
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('concResult')) window.calcConcreteMix();
    // تهيئة checklist المرحلة 4
    const concItems = [
      'تم الحصول على Mix Design معتمد من مختبر معتمد — QCS S5/P3/C2',
      'تم إجراء Trial Mix وموافقة المهندس الاستشاري',
      'مصنع الخرسانة الجاهزة معتمد لدى Ashghal/Client',
      'تم فحص الهبوط (Slump Test) قبل الصب — QCS S5/P3/C4',
      'درجة الحرارة وقت الصب ≤ 32°C (جسم الخرسانة)',
      'تم أخذ عينات المكعبات (3 مكعبات/50m³) — QCS S5/P3/C7',
      'تم ختم/تأريخ/ترقيم عينات المكعبات بشكل صحيح',
      'فترة الاهتزاز بالمدمكة لا تزيد عن 30 ثانية لكل موقع',
      'لا فراغ مرئي تحت القالب قبل إغلاقه',
      'تمت المعالجة الرطبة (Curing) لمدة ≥ 7 أيام — QCS S5/P3/C9',
      'نتائج مكعبات 28 يوم ≥ fck المحدد',
      'تم توثيق Delivery Notes جميع شاحنات الخرسانة',
      'لا توجد فواصل بارد (Cold Joints) غير مخططة'
    ];
    const concEl = document.getElementById('conc_checklist');
    if (concEl && window.generateChecklistItems) {
      concEl.innerHTML = window.generateChecklistItems(concItems, 'conc');
    }
  });

  // Checklist generator
  window.generateChecklistItems = function(items, prefix) {
    return items.map(function(item, i) {
      return '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:var(--dark3);border:1px solid var(--border);border-radius:8px;margin:4px 0;cursor:pointer;transition:all 0.2s;" ' +
        'onclick="toggleCheckItem(this, \'' + prefix + '\')" ' +
        'onmouseover="this.style.borderColor=\'var(--border2)\'" ' +
        'onmouseout="this.style.borderColor=\'var(--border)\'">' +
        '<span style="font-size:16px;flex-shrink:0;" class="check-box">☐</span>' +
        '<span style="font-size:12px;color:var(--text2);line-height:1.5;">' + item + '</span>' +
        '</div>';
    }).join('');
  };

  window.toggleCheckItem = function(el, prefix) {
    var box = el.querySelector('.check-box');
    var isChecked = box.textContent === '☑';
    box.textContent = isChecked ? '☐' : '☑';
    el.style.background = isChecked ? 'var(--dark3)' : 'rgba(46,204,113,0.08)';
    el.style.borderColor = isChecked ? 'var(--border)' : 'rgba(46,204,113,0.3)';
    updateCheckProgress(prefix);
  };

  window.updateCheckProgress = function(prefix) {
    var items = document.querySelectorAll('#' + prefix + '-checklist-items > div');
    var checked = document.querySelectorAll('#' + prefix + '-checklist-items .check-box');
    var count = 0;
    checked.forEach(function(c) { if (c.textContent === '☑') count++; });
    var total = items.length;
    var pct = total > 0 ? (count / total * 100) : 0;
    
    var progressText = document.getElementById(prefix + '-check-progress');
    var progressBar = document.getElementById(prefix + '-progress-bar');
    if (progressText) progressText.textContent = count + ' / ' + total;
    if (progressBar) progressBar.style.width = pct + '%';
    
    if (count === total && total > 0) {
      showToast('✅ Checklist كاملة — ' + total + ' / ' + total);
    }
  };

  window.resetChecklist = function(prefix) {
    var items = document.querySelectorAll('#' + prefix + '-checklist-items > div');
    items.forEach(function(el) {
      var box = el.querySelector('.check-box');
      if (box) box.textContent = '☐';
      el.style.background = 'var(--dark3)';
      el.style.borderColor = 'var(--border)';
    });
    updateCheckProgress(prefix);
  };

  window.exportChecklistExcel = function(prefix, title) {
    var items = [];
    document.querySelectorAll('#' + prefix + '-checklist-items > div').forEach(function(el) {
      var box = el.querySelector('.check-box');
      var text = el.querySelector('span:last-child');
      items.push({
        checked: box && box.textContent === '☑' ? '✓' : '✗',
        text: text ? text.textContent : ''
      });
    });
    
    var csv = '\uFEFFQatarSpec Pro — Checklist: ' + title + '\n';
    csv += 'الحالة,البند\n';
    items.forEach(function(item) {
      csv += item.checked + ',' + item.text + '\n';
    });
    
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Checklist-' + prefix + '-' + Date.now() + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ تم تصدير Checklist CSV');
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // Calculators
  // ═════════════════════════════════════════════════════════════════════════════

  window.calcCompaction = function() {
    var gammaD = parseFloat(document.getElementById('comp-gamma-d').value);
    var mdd = parseFloat(document.getElementById('comp-mdd').value);
    var mc = parseFloat(document.getElementById('comp-mc').value);
    var omc = parseFloat(document.getElementById('comp-omc').value);

    if (isNaN(gammaD) || isNaN(mdd)) {
      showToast('❌ أدخل الكثافة الجافة وMDD');
      return;
    }

    var compaction = (gammaD / mdd) * 100;
    var mcDiff = !isNaN(mc) && !isNaN(omc) ? Math.abs(mc - omc) : null;
    
    var pass = compaction >= 95;
    var mcPass = mcDiff === null || mcDiff <= 2;
    var overallPass = pass && mcPass;

    var resultEl = document.getElementById('comp-result');
    var iconEl = document.getElementById('comp-icon');
    var textEl = document.getElementById('comp-text');
    var detailsEl = document.getElementById('comp-details');

    resultEl.style.display = 'block';
    resultEl.className = 'calc-result ' + (overallPass ? 'pass' : 'fail');
    iconEl.textContent = overallPass ? '✅' : '❌';
    textEl.textContent = overallPass ? 'PASS — الدمك مقبول' : 'FAIL — الدمك غير مقبول';

    var details = '<div class="calc-result-row"><span class="calc-result-label">نسبة الدمك:</span><span class="calc-result-val">' + compaction.toFixed(1) + '%</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">الحد الأدنى:</span><span class="calc-result-val">95%</span></div>';
    
    if (mcDiff !== null) {
      details += '<div class="calc-result-row"><span class="calc-result-label">فرق الرطوبة:</span><span class="calc-result-val">' + mcDiff.toFixed(1) + '% (OMC ±2%)</span></div>';
    }
    
    details += '<div class="calc-result-action">' + (overallPass ? 
      '✅ يمكن المتابعة للطبقة التالية | QCS 2024 S3 P2' : 
      '❌ ' + (!pass ? 'الدمك < 95% — أعد الدك' : 'الرطوبة خارج النطاق — اضبط MC') + '</div>';
    
    detailsEl.innerHTML = details;
  };

  window.calcPileConcrete = function() {
    var dia = parseFloat(document.getElementById('pile-dia').value);
    var depth = parseFloat(document.getElementById('pile-depth').value);
    var count = parseInt(document.getElementById('pile-count').value) || 1;
    var waste = parseFloat(document.getElementById('pile-waste').value) || 10;

    if (!dia || !depth) {
      showToast('❌ أدخل القطر والعمق');
      return;
    }

    var r = dia / 2000; // m
    var volPerPile = Math.PI * r * r * depth;
    var totalVol = volPerPile * count * (1 + waste / 100);

    var resultEl = document.getElementById('pile-result');
    var iconEl = document.getElementById('pile-icon');
    var textEl = document.getElementById('pile-text');
    var detailsEl = document.getElementById('pile-details');

    resultEl.style.display = 'block';
    resultEl.className = 'calc-result pass';
    iconEl.textContent = '📊';
    textEl.textContent = 'حساب الكميات';

    var details = '<div class="calc-result-row"><span class="calc-result-label">الكمية لكل خازوق:</span><span class="calc-result-val">' + volPerPile.toFixed(2) + ' m³</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">عدد الخوازيق:</span><span class="calc-result-val">' + count + '</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">نسبة الهدر:</span><span class="calc-result-val">' + waste + '%</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">الإجمالي:</span><span class="calc-result-val" style="color:var(--gold);font-size:16px;">' + totalVol.toFixed(2) + ' m³</span></div>';
    details += '<div class="calc-result-action">📋 اطلب C35/45 Sulfate Resistant إن لزم | QCS 2024 S5 P6</div>';

    detailsEl.innerHTML = details;
  };

  window.calcFoundationConcrete = function() {
    var type = document.getElementById('found-type').value;
    var l = parseFloat(document.getElementById('found-l').value);
    var b = parseFloat(document.getElementById('found-b').value);
    var d = parseFloat(document.getElementById('found-d').value);
    var count = parseInt(document.getElementById('found-count').value) || 1;

    if (!l || !b || !d) {
      showToast('❌ أدخل الأبعاد كاملة');
      return;
    }

    var volPerFound = l * b * d;
    var totalVol = volPerFound * count;

    var typeNames = {
      isolated: 'Isolated (منفردة)',
      combined: 'Combined (مشتركة)',
      raft: 'Raft (لبشة)',
      strap: 'Strap (رباط)'
    };

    var resultEl = document.getElementById('found-result');
    var iconEl = document.getElementById('found-icon');
    var textEl = document.getElementById('found-text');
    var detailsEl = document.getElementById('found-details');

    resultEl.style.display = 'block';
    resultEl.className = 'calc-result pass';
    iconEl.textContent = '📊';
    textEl.textContent = 'حساب الكميات';

    var details = '<div class="calc-result-row"><span class="calc-result-label">نوع القاعدة:</span><span class="calc-result-val">' + typeNames[type] + '</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">الأبعاد:</span><span class="calc-result-val">' + l + ' × ' + b + ' × ' + d + ' m</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">الكمية لكل قاعدة:</span><span class="calc-result-val">' + volPerFound.toFixed(2) + ' m³</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">العدد:</span><span class="calc-result-val">' + count + '</span></div>';
    details += '<div class="calc-result-row"><span class="calc-result-label">الإجمالي:</span><span class="calc-result-val" style="color:var(--gold);font-size:16px;">' + totalVol.toFixed(2) + ' m³</span></div>';
    details += '<div class="calc-result-action">📋 Cover 75mm min | Grade C35/45 | QCS 2024 S5 P3</div>';

    detailsEl.innerHTML = details;
  };

  console.log('[QatarSpec] data_structures_detailed.js loaded — 4 phases ready (Excavation, Piling, Foundations, Concrete)');
})();
