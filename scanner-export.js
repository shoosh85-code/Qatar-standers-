window.ScannerExport = (function() {
  'use strict';

  // ── PDF (HTML report — client-side, no API needed) ────────
  function pdf() {
    const rooms = window.QS3D.rooms;
    if (!rooms.length) { log('⚠️ لا توجد بيانات — قم بالمسح أولاً'); return; }
    log('⏳ جاري توليد تقرير...');

    const total = rooms.reduce((s,r) => s + r.length * r.width, 0).toFixed(1);
    const date  = new Date().toLocaleDateString('ar-QA');

    const html = `<!DOCTYPE html><html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><title>QatarSpec 3D Report</title>
<style>
  body { font-family: Arial; padding: 40px; direction: rtl; }
  .header { background: #534ab7; color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
  .header h1 { margin: 0; font-size: 22px; }
  .header p  { margin: 5px 0 0; opacity: 0.85; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th { background: #534ab7; color: white; padding: 10px; text-align: right; font-size: 13px; }
  td { padding: 9px 10px; border-bottom: 1px solid #eee; font-size: 13px; }
  tr:nth-child(even) td { background: #f8f8f8; }
  .pass { color: #27500a; font-weight: bold; }
  .fail { color: #791f1f; font-weight: bold; }
  .footer { margin-top: 30px; padding: 14px; background: #faeeda; border-radius: 8px; font-size: 11px; color: #633806; line-height: 1.6; }
  .total { background: #eeedfe; font-weight: bold; }
  @media print { .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style></head><body>
<div class="header">
  <h1>QatarSpec Pro — تقرير المسح الثلاثي الأبعاد</h1>
  <p>التاريخ: ${date} | المرجع: QCS 2024 — Part 3, Section 4.2 | الموقع: qatar-standers.vercel.app</p>
</div>
<table>
  <tr>
    <th>الغرفة</th><th>الطول م</th><th>العرض م</th><th>الارتفاع م</th>
    <th>المساحة م²</th><th>أبواب</th><th>شبابيك</th><th>توافق QCS</th>
  </tr>
  ${rooms.map(r => {
    const area = (r.length * r.width).toFixed(1);
    const ok   = parseFloat(area) >= (r.qcs_min_area || 0);
    return `<tr>
      <td>${r.name}</td><td>${r.length}</td><td>${r.width}</td><td>${r.height}</td>
      <td><b>${area}</b></td><td>${r.doors.length}</td><td>${r.windows.length}</td>
      <td class="${ok ? 'pass' : 'fail'}">${ok ? '✓ محقق' : '✗ دون الحد'}</td>
    </tr>`;
  }).join('')}
  <tr class="total">
    <td colspan="4"><b>الإجمالي</b></td>
    <td><b>${total} م²</b></td>
    <td colspan="3">${rooms.length} غرفة</td>
  </tr>
</table>
<div class="footer">
  ⚠️ تنبيه: الأبعاد المستخرجة بتحليل الصور تقريبية (±10-15سم). يجب التحقق اليدوي من جميع القياسات قبل التسليم الرسمي لأي جهة حكومية أو مقاول. هذا التقرير للاستخدام الاسترشادي فقط.
  <br>QatarSpec Pro | QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024
</div>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
    download(blob, 'qatarspec-3d-scan.html', 'text/html');
    log('✅ تم تحميل التقرير — افتح الملف واطبعه كـ PDF');
  }

  // ── Excel (Ashghal Format) ─────────────────────────────────
  function excel() {
    const rooms = window.QS3D.rooms;
    if (!rooms.length) { log('⚠️ لا توجد بيانات'); return; }
    if (typeof XLSX === 'undefined') { log('❌ مكتبة Excel لم تتحمل'); return; }

    const wb = XLSX.utils.book_new();

    const summary = [
      ['QatarSpec Pro — تقرير المسح الثلاثي الأبعاد'],
      ['المشروع:', 'فيلا سكنية', 'التاريخ:', new Date().toLocaleDateString('ar-QA')],
      ['المرجع:', 'QCS 2024 — Part 3', 'عدد الغرف:', rooms.length],
      ['المساحة الإجمالية:', rooms.reduce((s,r)=>s+r.length*r.width,0).toFixed(1) + ' م²'],
      [],
      ['الغرفة', 'الطول (م)', 'العرض (م)', 'الارتفاع (م)', 'المساحة (م²)', 'أبواب', 'شبابيك', 'دقة التحليل', 'توافق QCS']
    ];
    rooms.forEach(r => {
      const area = (r.length * r.width).toFixed(1);
      summary.push([
        r.name, r.length, r.width, r.height, area,
        r.doors.length, r.windows.length,
        Math.round(r.confidence * 100) + '%',
        parseFloat(area) >= (r.qcs_min_area || 0) ? 'محقق' : 'دون الحد'
      ]);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summary), 'الملخص');

    const details = [['الغرفة', 'النوع', 'القياس', 'القيمة (م)', 'المرجع QCS']];
    rooms.forEach(r => {
      details.push([r.name, 'طول', 'length', r.length, r.qcs_ref || 'QCS 2024']);
      details.push([r.name, 'عرض', 'width', r.width, r.qcs_ref || 'QCS 2024']);
      details.push([r.name, 'ارتفاع', 'height', r.height, r.qcs_ref || 'QCS 2024']);
      r.doors.forEach((d,i) => details.push([r.name, 'باب '+(i+1), 'w×h', d.w+'×'+d.h, 'QCS 2024']));
      r.windows.forEach((w,i) => details.push([r.name, 'شباك '+(i+1), 'w×h', w.w+'×'+w.h, 'QCS 2024']));
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(details), 'التفاصيل');

    XLSX.writeFile(wb, 'qatarspec-3d-scan.xlsx');
    log('✅ تم تحميل ملف Excel بتنسيق Ashghal');
  }

  // ── JSON ──────────────────────────────────────────────────
  function json() {
    const data = {
      meta: { ...getProjectMeta(), schema: 'QatarSpec3D_v1', qcs: 'QCS 2024' },
      rooms: window.QS3D.rooms,
      summary: {
        total_area: window.QS3D.rooms.reduce((s,r)=>s+r.length*r.width,0).toFixed(1),
        room_count: window.QS3D.rooms.length
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    download(blob, 'qatarspec-3d-scan.json', 'application/json');
    log('✅ تم تحميل ملف JSON');
  }

  function getProjectMeta() {
    return {
      date: new Date().toISOString(),
      app: 'QatarSpec Pro',
      site: 'qatar-standers.vercel.app',
      disclaimer: 'الأبعاد تقريبية ±15سم — يجب التحقق اليدوي قبل التسليم الرسمي'
    };
  }

  function download(blob, name, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  function log(msg) {
    const el = document.getElementById('exportLog');
    if (el) el.textContent = msg;
  }

  return { pdf, excel, json };
})();
