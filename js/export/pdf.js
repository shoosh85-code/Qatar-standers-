/**
 * QatarSpec Pro — PDF Export Module
 * المرحلة 7 | تصدير PDF احترافي بمعايير Ashghal
 * QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024
 */

(function(w) {
  'use strict';

  // ═══════════════════════════════════════════════════
  // ثوابت التصميم — Brand Colors QatarSpec Pro
  // ═══════════════════════════════════════════════════
  const BRAND = {
    maroon:  [122, 21, 21],
    maroon2: [160, 40, 40],
    gold:    [201, 168, 76],
    dark:    [24, 24, 24],
    dark2:   [42, 42, 42],
    grey:    [90, 90, 90],
    light:   [245, 242, 235],
    white:   [255, 255, 255],
    green:   [39, 174, 96],
    red:     [231, 76, 60]
  };

  const PAGE = { w: 210, h: 297, margin: 14 };

  // ═══════════════════════════════════════════════════
  // المرحلة 10: Server-Side PDF via /api/export-pdf
  // الأولوية: server-side → fallback: jsPDF client
  // ═══════════════════════════════════════════════════
  async function _exportServerSide(payload) {
    const res = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Server PDF error: ' + res.status);
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = (payload.title || 'QatarSpec').replace(/[^\w\u0600-\u06FF\s-]/g, '').replace(/\s+/g, '-') + '.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() { URL.revokeObjectURL(url); a.remove(); }, 2000);
  }

  // ═══════════════════════════════════════════════════
  // تحميل مكتبة jsPDF ديناميكياً (fallback فقط)
  // ═══════════════════════════════════════════════════
  function _loadJsPDF() {
    if (w.jspdf) return Promise.resolve(w.jspdf);
    return new Promise(function(res, rej) {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload  = function() { res(w.jspdf); };
      s.onerror = function() { rej(new Error('jsPDF CDN غير متاح — تحقق من الاتصال')); };
      document.head.appendChild(s);
    });
  }

  // ═══════════════════════════════════════════════════
  // ترويسة الصفحة المعيارية
  // ═══════════════════════════════════════════════════
  function _drawHeader(doc, opts) {
    const pw = PAGE.w;
    const today = opts.today || new Date().toLocaleDateString('ar-QA');

    // شريط الترويسة الرئيسي
    doc.setFillColor(...BRAND.maroon);
    doc.rect(0, 0, pw, 20, 'F');

    // عنوان QatarSpec Pro
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BRAND.gold);
    doc.text('QatarSpec Pro', PAGE.margin, 12);

    // نص المرجع
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...BRAND.white);
    doc.text('QCS 2024 | Ashghal QA/QC', PAGE.margin, 17);

    // التاريخ (يمين)
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.gold);
    doc.text(today, pw - PAGE.margin, 12, { align: 'right' });

    // اسم المشروع (يمين)
    if (opts.project) {
      doc.setFontSize(7);
      doc.setTextColor(...BRAND.white);
      const safeProj = String(opts.project).substring(0, 50);
      doc.text(safeProj, pw - PAGE.margin, 17, { align: 'right' });
    }

    // شريط العنوان الثانوي
    doc.setFillColor(...BRAND.dark2);
    doc.rect(0, 20, pw, 10, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BRAND.gold);
    const safeTitle = String(opts.title || '').replace(/[^\x00-\x7F]/g, ' ').substring(0, 80);
    doc.text(safeTitle, PAGE.margin, 27);

    // اسم المهندس (يمين)
    if (opts.engineer) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 180);
      doc.text(String(opts.engineer).substring(0, 40), pw - PAGE.margin, 27, { align: 'right' });
    }
  }

  // ═══════════════════════════════════════════════════
  // تذييل الصفحة المعيارية
  // ═══════════════════════════════════════════════════
  function _drawFooter(doc, pageNum, totalPages) {
    const pw = PAGE.w;
    const ph = PAGE.h;
    doc.setFillColor(...BRAND.dark2);
    doc.rect(0, ph - 10, pw, 10, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('QCS 2024 | للاستخدام المهني فقط | QatarSpec Pro', PAGE.margin, ph - 4);
    doc.text(pageNum + ' / ' + totalPages, pw - PAGE.margin, ph - 4, { align: 'right' });
  }

  // ═══════════════════════════════════════════════════
  // علامة مائية خفيفة
  // ═══════════════════════════════════════════════════
  function _drawWatermark(doc) {
    const pw = PAGE.w; const ph = PAGE.h;
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 180, 180);
    // GState للشفافية
    try {
      doc.setGState(new doc.GState({ opacity: 0.04 }));
      doc.text('QatarSpec Pro — QCS 2024', pw / 2, ph / 2, { align: 'center', angle: 45 });
      doc.setGState(new doc.GState({ opacity: 1 }));
    } catch(e) {
      // fallback if GState not supported
    }
  }

  // ═══════════════════════════════════════════════════
  // رسم جدول بيانات داخل PDF
  // cols: [{label, key, w}], rows: [{key: val}]
  // ═══════════════════════════════════════════════════
  function _drawTable(doc, startY, cols, rows, opts) {
    opts = opts || {};
    const margin = PAGE.margin;
    const usableW = PAGE.w - margin * 2;
    const rowH = 8;
    const headerH = 8;
    let y = startY;

    // حساب عروض الأعمدة
    const totalW = cols.reduce(function(sum, c) { return sum + (c.w || 1); }, 0);
    let colWidths = cols.map(function(c) { return ((c.w || 1) / totalW) * usableW; });
    let colX = [margin];
    for (let i = 1; i < cols.length; i++) {
      colX.push(colX[i - 1] + colWidths[i - 1]);
    }

    // رأس الجدول
    doc.setFillColor(...BRAND.maroon);
    doc.rect(margin, y, usableW, headerH, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BRAND.white);
    cols.forEach(function(col, i) {
      const cx = colX[i] + colWidths[i] / 2;
      doc.text(col.label, cx, y + 5.5, { align: 'center' });
    });
    y += headerH;

    // صفوف البيانات
    rows.forEach(function(row, ri) {
      // التحقق من الصفحة
      if (y + rowH > PAGE.h - 14) {
        doc.addPage();
        _drawHeader(doc, opts.headerOpts || {});
        _drawWatermark(doc);
        y = 35;
      }

      // خلفية متبادلة
      if (ri % 2 === 1) {
        doc.setFillColor(...BRAND.light);
        doc.rect(margin, y, usableW, rowH, 'F');
      }

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      cols.forEach(function(col, i) {
        const val = String(row[col.key] || '').substring(0, 45);
        const cx = colX[i] + 2;
        doc.text(val, cx, y + 5.5);
      });

      // خط أسفل الصف
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y + rowH, margin + usableW, y + rowH);
      y += rowH;
    });

    return y; // إرجاع موقع Y النهائي
  }

  // ═══════════════════════════════════════════════════
  // دالة تصدير عامة — تصدير HTML عبر server-side API
  // (server-side فقط per PROTOCOL — لا client-side rendering)
  // ═══════════════════════════════════════════════════
  async function exportToServer(format) {
    format = format || 'pdf';

    // Pro Gate
    if (w.isProUser && !w.isProUser()) {
      if (w.showUpgradePrompt) {
        w.showUpgradePrompt('pdf', '📄', 'تصدير PDF — ميزة Pro', 'تصدير التقارير إلى PDF احترافي متاح للمشتركين في Pro فقط.');
      }
      return;
    }

    const contentEl = document.getElementById('dmContent');
    const titleEl   = document.getElementById('dmTitle');

    const content = contentEl ? contentEl.innerHTML : '';
    const title   = titleEl   ? titleEl.innerText   : 'QatarSpec Report';

    if (!content || content.trim() === '<div id="print-area"></div>') {
      if (w.showToast) w.showToast('⚠️ لا يوجد محتوى للتصدير — افتح قسماً أولاً');
      return;
    }

    if (w.showToast) w.showToast('⏳ جاري إعداد ' + format.toUpperCase() + '...');

    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:   title,
          content: content,
          format:  format,
          date:    new Date().toLocaleDateString('en-GB'),
        }),
      });

      if (!res.ok) throw new Error('Server error: ' + res.status);

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'QatarSpec-' + title.replace(/[^\w\u0600-\u06FF\s-]/g, '').replace(/\s+/g, '-').substring(0, 40) + '.' + format;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() { URL.revokeObjectURL(url); a.remove(); }, 2000);

      if (w.showToast) w.showToast('✅ تم تصدير ' + format.toUpperCase() + ' بنجاح');
    } catch (err) {
      console.error('[exportToServer]', err);
      if (w.showToast) w.showToast('❌ فشل التصدير: ' + err.message + ' — جرب مرة أخرى');
    }
  }
  async function exportSectionPDF(opts) {
    opts = opts || {};

    // Pro Gate
    if (w.isProUser && !w.isProUser()) {
      if (w.showUpgradePrompt) {
        w.showUpgradePrompt('pdf', '📄', 'تصدير PDF — ميزة Pro', 'تصدير التقارير إلى PDF احترافي متاح للمشتركين في Pro فقط.');
      }
      return;
    }

    if (w.showToast) w.showToast('⏳ جاري إعداد PDF...');

    // ─── محاولة server-side أولاً ───
    try {
      const payload = {
        title:    opts.title    || 'QatarSpec Pro Report',
        content:  opts.content  || (opts.lines ? opts.lines.join('\n') : ''),
        project:  opts.project  || '',
        engineer: opts.engineer || '',
        date:     new Date().toLocaleDateString('en-GB'),
        section:  opts.section  || '',
        qcsRef:   opts.qcsRef   || '',
      };
      await _exportServerSide(payload);
      if (w.showToast) w.showToast('✅ تم تصدير PDF — ' + payload.title + '.pdf');
      return;
    } catch(serverErr) {
      console.warn('Server-side PDF failed, falling back to jsPDF:', serverErr.message);
    }

    // ─── Fallback: jsPDF client-side ───
    let jsPDFLib;
    try { jsPDFLib = await _loadJsPDF(); }
    catch(e) { if (w.showToast) w.showToast('❌ ' + e.message); return; }

    const { jsPDF } = jsPDFLib;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const today = new Date().toLocaleDateString('ar-QA');
    const headerOpts = {
      title:    opts.title    || 'QatarSpec Pro Report',
      project:  opts.project  || '',
      engineer: opts.engineer || '',
      today:    today
    };

    _drawHeader(doc, headerOpts);
    _drawWatermark(doc);

    // محتوى الجداول إن وُجدت
    if (opts.tableData && opts.tableData.cols && opts.tableData.rows) {
      _drawTable(doc, 35, opts.tableData.cols, opts.tableData.rows, { headerOpts });
    }

    // نص حر
    if (opts.lines && opts.lines.length) {
      let y = 36;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      opts.lines.forEach(function(line) {
        if (y > PAGE.h - 16) {
          doc.addPage();
          _drawHeader(doc, headerOpts);
          _drawWatermark(doc);
          y = 36;
        }
        doc.text(String(line).substring(0, 120), PAGE.margin, y);
        y += 6;
      });
    }

    // تذييل كل الصفحات
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      _drawFooter(doc, p, totalPages);
    }

    const safeName = (opts.filename || 'QatarSpec-Export')
      .replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, '-').substring(0, 40) || 'export';
    doc.save(safeName + '.pdf');
    if (w.showToast) w.showToast('✅ تم تصدير PDF — ' + safeName + '.pdf');
  }

  // ═══════════════════════════════════════════════════
  // تصدير NCR كـ PDF منسق
  // ═══════════════════════════════════════════════════
  async function exportNCRPDF() {
    const gv = function(id) {
      const el = document.getElementById(id);
      return el ? (el.value || '—') : '—';
    };

    const classMap = { major: 'Major 🔴', minor: 'Minor 🟡', obs: 'Observation 🔵' };
    const statusMap = { open: 'Open 🔴', inprog: 'In Progress 🟡', accepted: 'Closed — Accepted ✅', rejected: 'Closed — Rejected ❌', pending: 'Pending ⏳' };

    await exportSectionPDF({
      title:    'Non-Conformance Report (NCR) — ' + gv('ncr-num'),
      project:  gv('ncr-proj'),
      engineer: gv('ncr-qc-eng'),
      filename: 'NCR-' + gv('ncr-num'),
      lines: [
        'رقم NCR: ' + gv('ncr-num') + '    المشروع: ' + gv('ncr-proj'),
        'رقم العقد: ' + gv('ncr-contract') + '    المقاول: ' + gv('ncr-contractor'),
        'التصنيف: ' + (classMap[gv('ncr-class')] || gv('ncr-class')),
        'الحالة: ' + (statusMap[gv('ncr-status')] || gv('ncr-status')),
        'تاريخ الاكتشاف: ' + gv('ncr-date') + '    تاريخ الإغلاق: ' + gv('ncr-target'),
        'الموقع: ' + gv('ncr-loc') + '    QCS Clause: ' + gv('ncr-clause'),
        '',
        'وصف عدم المطابقة:',
        gv('ncr-desc'),
        '',
        'Root Cause:',
        gv('ncr-root'),
        '',
        'الإجراء التصحيحي:',
        gv('ncr-corrective'),
        '',
        'الإجراء الوقائي:',
        gv('ncr-preventive'),
        '',
        'نتيجة الإعادة: ' + gv('ncr-retest'),
        '',
        'QC Engineer: ' + gv('ncr-qc-eng') + '    SC: ' + gv('ncr-sc'),
        'المرجع: QCS 2024 | ISO 9001 Cl.10.2 | Ashghal QA/QC'
      ]
    });
  }

  // ═══════════════════════════════════════════════════
  // تصدير RFI كـ PDF منسق
  // ═══════════════════════════════════════════════════
  async function exportRFIPDF() {
    const gv = function(id) {
      const el = document.getElementById(id);
      return el ? (el.value || '—') : '—';
    };

    await exportSectionPDF({
      title:    'Request for Inspection (RFI) — ' + gv('rfi-num'),
      project:  gv('rfi-proj'),
      engineer: gv('rfi-from'),
      filename: 'RFI-' + gv('rfi-num'),
      lines: [
        'رقم RFI: ' + gv('rfi-num') + '    المشروع: ' + gv('rfi-proj'),
        'رقم العقد: ' + gv('rfi-contract') + '    المقاول: ' + gv('rfi-contractor'),
        'Submitted By: ' + gv('rfi-from') + '    To: ' + gv('rfi-to'),
        'تاريخ الإرسال: ' + gv('rfi-date') + '    Required By: ' + gv('rfi-reqby'),
        '',
        'الموقع: ' + gv('rfi-loc') + '    Grid: ' + gv('rfi-grid'),
        'Chainage: ' + gv('rfi-ch') + '    Layer: ' + gv('rfi-layer'),
        'QCS Clause: ' + gv('rfi-clause') + '    Drawing: ' + gv('rfi-dwg'),
        '',
        'النشاط: ' + gv('rfi-activity') + '    نوع النقطة: ' + gv('rfi-point'),
        'الموضوع: ' + gv('rfi-subject'),
        '',
        'نتائج الاختبارات:',
        gv('rfi-results'),
        '',
        'المرفقات: ' + gv('rfi-attach'),
        '',
        'رد SC: ' + gv('rfi-response') + '    Status: ' + gv('rfi-status'),
        '',
        'توقيع مقدّم الطلب: ________________    التاريخ: ___________',
        'توقيع SC / Consultant: ________________    التاريخ: ___________',
        '',
        'المرجع: QCS 2024 | Ashghal QA/QC Standard'
      ]
    });
  }

  // ═══════════════════════════════════════════════════
  // تصدير نتائج الحاسبة كـ PDF
  // ═══════════════════════════════════════════════════
  async function exportCalcResultPDF(opts) {
    opts = opts || {};
    const results = opts.results || [];
    const lines = ['نتائج الفحص:', ''];
    results.forEach(function(r) {
      lines.push(r.name + ': ' + r.value + ' ' + (r.unit || '') + ' → ' + (r.pass ? '✅ PASS' : '❌ FAIL'));
      if (r.ref) lines.push('المرجع: ' + r.ref);
      lines.push('');
    });
    lines.push('تنبيه: هذه النتائج للاستخدام المهني فقط. المرجع: QCS 2024');

    await exportSectionPDF({
      title:    opts.title || 'نتائج حاسبة المواصفات',
      project:  opts.project || '',
      engineer: opts.engineer || '',
      filename: 'Calc-' + (opts.title || 'Results').replace(/\s+/g, '-').substring(0, 20),
      lines:    lines
    });
  }

  // ═══════════════════════════════════════════════════
  // تسجيل في window.QS namespace
  // ═══════════════════════════════════════════════════
  if (!w.QS) w.QS = {};
  w.QS.exportSectionPDF    = exportSectionPDF;
  w.QS.exportNCRPDF        = exportNCRPDF;
  w.QS.exportRFIPDF        = exportRFIPDF;
  w.QS.exportCalcResultPDF = exportCalcResultPDF;
  w.QS.exportToServer      = exportToServer;   // ← المرحلة 10: server-side

  // كذلك نصدّر كـ window functions مباشرة (توافق مع الكود الموجود)
  w.exportSectionPDF    = exportSectionPDF;
  w.exportNCRPDF        = exportNCRPDF;
  w.exportRFIPDF        = exportRFIPDF;
  w.exportCalcResultPDF = exportCalcResultPDF;
  w.exportToServer      = exportToServer;

})(window);
