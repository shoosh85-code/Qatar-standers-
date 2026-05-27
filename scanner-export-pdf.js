// ═══════════════════════════════════════════════════════════════
// الفجوة 7: دالة pdf() المحدّثة — scanner-export.js
// استبدل دالة pdf() الموجودة بهذا الكود كاملاً
// المرجع: QCS 2024 | Ashghal RDM 2023 | QatarSpec Pro v3.0
// ═══════════════════════════════════════════════════════════════

function pdf() {
  const rooms = window.QS3D.rooms;
  if (!rooms.length) { log('⚠️ لا توجد بيانات — قم بالمسح أولاً'); return; }
  log('⏳ جاري توليد التقرير الرسمي...');

  const total   = rooms.reduce((s, r) => s + r.length * r.width, 0).toFixed(1);
  const date    = new Date().toLocaleDateString('ar-QA', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const refNo   = 'QS-3D-' + Date.now().toString(36).toUpperCase().slice(-6);
  const passRooms = rooms.filter(r =>
    (r.length * r.width) >= (r.qcs_min_area || 0)
  ).length;

  // جدول الغرف — تعقيم الإدخال
  const rowsHTML = rooms.map((r, i) => {
    const area   = (r.length * r.width).toFixed(1);
    const ok     = parseFloat(area) >= (r.qcs_min_area || 0);
    const safeN  = (r.name          || '').replace(/</g, '&lt;');
    const safeMat = (r.floor_material || 'غير محدد').replace(/</g, '&lt;');
    return `
    <tr style="${i % 2 === 0 ? 'background:#f9fafb' : 'background:#fff'}">
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-weight:600">${i + 1}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb">${safeN}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">${r.length}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">${r.width}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">${r.height || 2.8}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:700">${area}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">${r.doors?.length || 0}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">${r.windows?.length || 0}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb">${safeMat}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center">
        <span style="
          background:${ok ? '#dcfce7' : '#fee2e2'};
          color:${ok ? '#15803d' : '#991b1b'};
          padding:3px 8px; border-radius:12px; font-size:11px; font-weight:700;
        ">${ok ? '✓ محقق' : '✗ دون الحد'}</span>
      </td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<title>تقرير المسح الثلاثي الأبعاد — QatarSpec Pro</title>
<style>
  @page {
    size: A4; margin: 15mm 12mm;
    @top-center { content: "QatarSpec Pro | تقرير مسح ثلاثي الأبعاد"; }
    @bottom-right { content: "صفحة " counter(page) " من " counter(pages); }
    @bottom-left { content: "${date}"; }
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    direction: rtl; font-size: 12px; color: #1f2937; margin: 0; padding: 0;
  }

  /* ── Header الرسمي ── */
  .page-header {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%);
    color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 20px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .header-logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
  .header-logo span { color: #fbbf24; }
  .header-subtitle { font-size: 11px; opacity: 0.8; margin-top: 4px; }
  .header-ref { text-align: left; font-size: 11px; opacity: 0.85; }
  .header-ref b { font-size: 14px; color: #fbbf24; }

  /* ── ملخص أرقام ── */
  .summary-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 10px; margin-bottom: 20px;
  }
  .summary-card {
    background: #f8fafc; border: 1px solid #e2e8f0;
    border-radius: 8px; padding: 12px; text-align: center;
  }
  .summary-card .val { font-size: 22px; font-weight: 900; color: #1e1b4b; }
  .summary-card .lbl { font-size: 10px; color: #64748b; margin-top: 3px; }

  /* ── الجدول ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  th {
    background: #1e1b4b; color: white; padding: 10px 8px;
    text-align: center; font-size: 11px; font-weight: 700;
  }
  th:first-child { border-radius: 0 6px 0 0; }
  th:last-child  { border-radius: 6px 0 0 0; }

  /* ── Watermark ── */
  .watermark {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 72px; font-weight: 900; color: rgba(30,27,75,0.06);
    pointer-events: none; z-index: 0; white-space: nowrap;
  }

  /* ── Footer ── */
  .disclaimer {
    background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px;
    padding: 12px 16px; font-size: 10px; color: #78350f; line-height: 1.7;
  }
  .footer-bar {
    margin-top: 14px; padding-top: 10px; border-top: 2px solid #e2e8f0;
    display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8;
  }

  @media print {
    .watermark { display: block !important; }
    .page-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .summary-card .val { color: #1e1b4b !important; }
  }
</style>
</head>
<body>

<div class="watermark">QatarSpec Pro</div>

<!-- Header الرسمي -->
<div class="page-header">
  <div>
    <div class="header-logo">Qatar<span>Spec</span> Pro</div>
    <div class="header-subtitle">
      تقرير المسح الثلاثي الأبعاد | 3D Site Scan Report<br>
      qatar-standers.vercel.app
    </div>
  </div>
  <div class="header-ref">
    رقم التقرير: <b>${refNo}</b><br>
    التاريخ: ${date}<br>
    المرجع: QCS 2024 | Ashghal RDM 2023<br>
    الإصدار: v3.0
  </div>
</div>

<!-- ملخص الأرقام -->
<div class="summary-grid">
  <div class="summary-card">
    <div class="val">${rooms.length}</div>
    <div class="lbl">إجمالي الغرف</div>
  </div>
  <div class="summary-card">
    <div class="val">${total}</div>
    <div class="lbl">إجمالي المساحة (م²)</div>
  </div>
  <div class="summary-card">
    <div class="val" style="color:#15803d">${passRooms}</div>
    <div class="lbl">محققة لـ QCS 2024</div>
  </div>
  <div class="summary-card">
    <div class="val" style="color:#991b1b">${rooms.length - passRooms}</div>
    <div class="lbl">تحتاج مراجعة</div>
  </div>
</div>

<!-- جدول التفاصيل -->
<table>
  <thead>
    <tr>
      <th>#</th><th>الغرفة</th><th>الطول م</th><th>العرض م</th>
      <th>الارتفاع م</th><th>المساحة م²</th><th>أبواب</th>
      <th>شبابيك</th><th>الأرضية</th><th>توافق QCS</th>
    </tr>
  </thead>
  <tbody>${rowsHTML}</tbody>
</table>

<!-- المرجع الهندسي -->
<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px;margin-bottom:16px;font-size:11px;">
  <b style="color:#1e40af">📋 المراجع الهندسية المعتمدة:</b><br>
  • QCS 2024 — Part 3, Section 3.3.1: الحد الأدنى لارتفاع السقف ≥ 2600mm<br>
  • QCS 2024 — Part 3, Section 3.4.2: الحد الأدنى لعرض الباب ≥ 900mm (صافٍ)<br>
  • QCS 2024 — Part 3, Section 3.5.1: الحد الأدنى لعرض الممر ≥ 1200mm<br>
  • QCS 2024 — Part 8, Section 8.2.4: الغطاء الخرساني ≥ 50mm للعناصر الخارجية<br>
  • Ashghal RDM 2023 — Chapter 5: متطلبات التصميم المعماري
</div>

<!-- Disclaimer -->
<div class="disclaimer">
  ⚠️ <b>تنبيه هندسي هام:</b> الأبعاد المستخرجة بتحليل الصور والذكاء الاصطناعي تقريبية بدقة (±5-15 سم).
  يجب التحقق اليدوي من جميع القياسات الحرجة بأجهزة قياس معتمدة قبل التسليم الرسمي لأي جهة حكومية
  (أشغال، بلدية، كهرماء) أو إدراجها في عقود أو مخططات هندسية نهائية.
  هذا التقرير للاستخدام الاسترشادي والتخطيط الأولي فقط.
  يتحمل المهندس المسؤول كامل مسؤولية التحقق قبل الاستخدام الرسمي.
</div>

<div class="footer-bar">
  <span>QatarSpec Pro | qatar-standers.vercel.app</span>
  <span>QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024</span>
  <span>© ${new Date().getFullYear()} QatarSpec — للاستخدام الهندسي</span>
</div>

<script>window.print();<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
  download(blob, `QatarSpec-3D-Report-${refNo}.html`, 'text/html');
  log('✅ تم توليد التقرير الرسمي — افتح الملف واطبعه كـ PDF (Ctrl+P → PDF)');
}
