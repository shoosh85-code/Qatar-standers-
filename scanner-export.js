window.ScannerExport = (function() {
  'use strict';

  // ── PDF ───────────────────────────────────────────────────
  async function pdf() {
    const rooms = window.QS3D.rooms;
    if (!rooms.length) { log('⚠️ لا توجد بيانات — قم بالمسح أولاً'); return; }
    log('⏳ جاري توليد تقرير PDF...');

    const res = await fetch('/api/scan-export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rooms, format: 'pdf', project: getProjectMeta() })
    });

    if (!res.ok) { log('❌ خطأ في التصدير: ' + res.status); return; }
    const blob = await res.blob();
    download(blob, 'qatarspec-3d-scan.pdf', 'application/pdf');
    log('✅ تم تحميل التقرير PDF');
  }

  // ── Excel (Ashghal Format) ─────────────────────────────────
  function excel() {
    const rooms = window.QS3D.rooms;
    if (!rooms.length) { log('⚠️ لا توجد بيانات'); return; }
    if (typeof XLSX === 'undefined') { log('❌ مكتبة Excel لم تتحمل'); return; }

    const wb = XLSX.utils.book_new();

    // Sheet 1: ملخص
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

    // Sheet 2: التفاصيل
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
