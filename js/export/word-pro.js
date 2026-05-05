/**
 * QatarSpec Pro — Word Export Pro Module (docx.js)
 * المرحلة 3 | تصدير Word احترافي بتنسيق Ashghal
 * QCS 2024 | Ashghal RDM 2023
 * Fallback: js/export/word.js (HTML blob)
 */

(function (w) {
  'use strict';

  // ═══════════════════════════════════════════════════
  // ألوان QatarSpec الرسمية
  // ═══════════════════════════════════════════════════
  const COLOR = {
    maroon:     '7A1515',
    gold:       'C9A84C',
    white:      'FFFFFF',
    lightGold:  'F9F5EE',
    border:     'CCCCCC',
    text:       '1A1A1A',
    passGreen:  '27AE60',
    failRed:    'E74C3C',
    textGray:   '888888'
  };

  // ═══════════════════════════════════════════════════
  // تنظيف النص
  // ═══════════════════════════════════════════════════
  function _s(str) {
    return String(str || '').trim();
  }

  // ═══════════════════════════════════════════════════
  // تحقق من توفر docx.js
  // ═══════════════════════════════════════════════════
  function _isDocxAvailable() {
    return typeof w.docx !== 'undefined' &&
           typeof w.docx.Document !== 'undefined';
  }

  // ═══════════════════════════════════════════════════
  // بناء paragraph بالعربية (RTL)
  // ═══════════════════════════════════════════════════
  function _para(text, opts) {
    opts = opts || {};
    const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel } = w.docx;
    return new Paragraph({
      bidirectional: true,
      alignment: opts.align || AlignmentType.RIGHT,
      heading: opts.heading || undefined,
      spacing: { after: opts.spacingAfter || 100, before: opts.spacingBefore || 0 },
      children: [
        new TextRun({
          text: _s(text),
          font: opts.font || 'Arial',
          size: opts.size || 22,
          bold: opts.bold || false,
          color: opts.color || COLOR.text,
          rtl: true
        })
      ]
    });
  }

  // ═══════════════════════════════════════════════════
  // بناء صف جدول
  // ═══════════════════════════════════════════════════
  function _tableRow(cells, isHeader) {
    const { TableRow, TableCell, Paragraph, TextRun, AlignmentType,
            ShadingType, WidthType, VerticalAlign } = w.docx;

    return new TableRow({
      tableHeader: isHeader || false,
      children: cells.map(function (cell) {
        const text   = _s(cell.text || cell);
        const bg     = isHeader ? COLOR.maroon : (cell.bg || null);
        const fgCol  = isHeader ? COLOR.white : (cell.color || COLOR.text);
        const isBold = isHeader ? true : (cell.bold || false);

        return new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          width: cell.width ? { size: cell.width, type: WidthType.PERCENTAGE } : undefined,
          shading: bg ? { type: ShadingType.SOLID, color: bg } : undefined,
          children: [
            new Paragraph({
              bidirectional: true,
              alignment: AlignmentType.CENTER,
              spacing: { after: 60, before: 60 },
              children: [
                new TextRun({
                  text: text,
                  font: 'Arial',
                  size: isHeader ? 20 : 18,
                  bold: isBold,
                  color: fgCol,
                  rtl: true
                })
              ]
            })
          ]
        });
      })
    });
  }

  // ═══════════════════════════════════════════════════
  // بناء جدول بيانات الوصفية (مشروع / مهندس / تاريخ)
  // ═══════════════════════════════════════════════════
  function _buildMetaTable(opts) {
    const { Table, WidthType, BorderStyle } = w.docx;

    const rows = [
      ['المشروع', _s(opts.project)   , 'المهندس',   _s(opts.engineer)],
      ['التاريخ',  _s(opts.today)     , 'المرجع',    'QCS 2024 | Ashghal QA/QC'],
    ];
    if (opts.contract || opts.contractor) {
      rows.push(['رقم العقد', _s(opts.contract), 'المقاول', _s(opts.contractor)]);
    }

    const noBorder = { style: BorderStyle.NONE, size: 0, color: 'auto' };

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: noBorder, bottom: noBorder, left: noBorder,
        right: noBorder, insideH: noBorder, insideV: noBorder
      },
      rows: rows.map(function (r) {
        return _tableRow([
          { text: r[0], bold: true, color: COLOR.maroon, bg: COLOR.lightGold, width: 20 },
          { text: r[1], color: COLOR.text,               bg: COLOR.lightGold, width: 30 },
          { text: r[2], bold: true, color: COLOR.maroon, bg: COLOR.lightGold, width: 20 },
          { text: r[3], color: COLOR.text,               bg: COLOR.lightGold, width: 30 }
        ], false);
      })
    });
  }

  // ═══════════════════════════════════════════════════
  // بناء جدول بيانات عام من مصفوفة headers + rows
  // ═══════════════════════════════════════════════════
  function _buildDataTable(headers, dataRows) {
    const { Table, WidthType } = w.docx;

    const tableRows = [_tableRow(headers, true)];
    dataRows.forEach(function (row, idx) {
      const bg = idx % 2 === 1 ? COLOR.lightGold : null;
      tableRows.push(_tableRow(row.map(function (cell) {
        if (typeof cell === 'object') return Object.assign({ bg: bg }, cell);
        return { text: cell, bg: bg };
      }), false));
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows
    });
  }

  // ═══════════════════════════════════════════════════
  // بناء جدول التوقيعات
  // ═══════════════════════════════════════════════════
  function _buildSignaturesTable(labels) {
    labels = labels || ['مقدّم الطلب', 'SC / Consultant', 'Client Representative'];
    const { Table, TableRow, TableCell, Paragraph, TextRun,
            AlignmentType, WidthType, BorderStyle } = w.docx;

    const cells = labels.map(function (lbl) {
      return new TableCell({
        width: { size: Math.floor(100 / labels.length), type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 6, color: COLOR.text },
          bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
          left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
          right: { style: BorderStyle.NONE, size: 0, color: 'auto' }
        },
        children: [
          new Paragraph({
            bidirectional: true,
            alignment: AlignmentType.CENTER,
            spacing: { before: 120 },
            children: [new TextRun({ text: _s(lbl), font: 'Arial', size: 18, color: COLOR.textGray, rtl: true })]
          })
        ]
      });
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({ children: cells })]
    });
  }

  // ═══════════════════════════════════════════════════
  // الدالة الرئيسية: تصدير Word Pro
  // ═══════════════════════════════════════════════════
  async function exportToWordPro(opts) {
    // Fallback للطريقة القديمة إذا docx.js غير متاح
    if (!_isDocxAvailable()) {
      if (typeof w.QS !== 'undefined' && typeof w.QS.exportWord === 'function') {
        return w.QS.exportWord(opts);
      }
      if (typeof w.exportWordDoc === 'function') {
        return w.exportWordDoc(opts);
      }
      if (w.showToast) w.showToast('⚠️ مكتبة Word غير متاحة — حاول لاحقاً');
      return;
    }

    // Pro Gate
    if (w.isProUser && !w.isProUser()) {
      if (w.showUpgradePrompt) {
        w.showUpgradePrompt('word', '📝', 'تصدير Word Pro', 'تصدير احترافي بتنسيق Ashghal متاح للمشتركين في Pro فقط.');
      }
      return;
    }

    if (w.showToast) w.showToast('⏳ جاري إعداد ملف Word Pro...');

    try {
      const {
        Document, Packer, Paragraph, TextRun, Header, Footer,
        AlignmentType, HeadingLevel, SectionType,
        PageSize, PageOrientation, WidthType,
        BorderStyle, ShadingType, Table, TableRow, TableCell,
        Tab, PageNumber, NumberFormat
      } = w.docx;

      const today = opts.today || new Date().toLocaleDateString('ar-QA');
      const title  = _s(opts.title || 'QatarSpec Pro Report');

      // ─── Header ──────────────────────────────────
      const header = new Header({
        children: [
          new Paragraph({
            bidirectional: true,
            alignment: AlignmentType.RIGHT,
            shading: { type: ShadingType.SOLID, color: COLOR.maroon },
            spacing: { after: 0 },
            children: [
              new TextRun({ text: 'QatarSpec Pro', font: 'Arial', size: 28, bold: true, color: COLOR.gold, rtl: true }),
              new TextRun({ text: '  |  QCS 2024 | Ashghal QA/QC | ' + today, font: 'Arial', size: 18, color: COLOR.white, rtl: true })
            ]
          })
        ]
      });

      // ─── Footer ──────────────────────────────────
      const footer = new Footer({
        children: [
          new Paragraph({
            bidirectional: true,
            alignment: AlignmentType.RIGHT,
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR.border } },
            spacing: { before: 60 },
            children: [
              new TextRun({ text: 'QCS 2024 | للاستخدام المهني فقط  |  qatar-standers.vercel.app', font: 'Arial', size: 16, color: COLOR.textGray, rtl: true }),
              new TextRun({ text: '    صفحة ', font: 'Arial', size: 16, color: COLOR.textGray }),
              new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: COLOR.textGray }),
              new TextRun({ text: ' من ', font: 'Arial', size: 16, color: COLOR.textGray }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: 16, color: COLOR.textGray })
            ]
          })
        ]
      });

      // ─── Body content ────────────────────────────
      const bodyChildren = [];

      // عنوان التقرير
      bodyChildren.push(
        new Paragraph({
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          spacing: { after: 200, before: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR.gold } },
          children: [
            new TextRun({ text: title, font: 'Arial', size: 32, bold: true, color: COLOR.maroon, rtl: true })
          ]
        })
      );

      // جدول البيانات الوصفية
      bodyChildren.push(_buildMetaTable({ today, ...opts }));
      bodyChildren.push(_para('', { spacingAfter: 200 }));

      // المحتوى الرئيسي
      if (opts.sections && opts.sections.length) {
        // محتوى منظم: مصفوفة sections
        opts.sections.forEach(function (sec) {
          if (sec.heading) {
            bodyChildren.push(new Paragraph({
              bidirectional: true,
              alignment: AlignmentType.RIGHT,
              spacing: { after: 100, before: 200 },
              children: [
                new TextRun({ text: _s(sec.heading), font: 'Arial', size: 26, bold: true, color: COLOR.maroon, rtl: true })
              ]
            }));
          }
          if (sec.text) {
            bodyChildren.push(_para(sec.text, { size: 20 }));
          }
          if (sec.table && sec.table.headers && sec.table.rows) {
            bodyChildren.push(_buildDataTable(sec.table.headers, sec.table.rows));
            bodyChildren.push(_para('', { spacingAfter: 100 }));
          }
          if (sec.qcsRef) {
            bodyChildren.push(_para('📌 المرجع: ' + _s(sec.qcsRef), { size: 18, color: COLOR.gold }));
          }
        });
      } else if (opts.lines && opts.lines.length) {
        // محتوى بسيط: مصفوفة نصوص
        opts.lines.forEach(function (line) {
          bodyChildren.push(_para(line, { size: 20 }));
        });
      } else {
        // محتوى نصي عام
        bodyChildren.push(_para(
          opts.body || 'لا يوجد محتوى',
          { size: 20 }
        ));
      }

      // جدول القسم (اختياري)
      if (opts.tableHeaders && opts.tableRows) {
        bodyChildren.push(_para('', { spacingAfter: 100 }));
        bodyChildren.push(_buildDataTable(opts.tableHeaders, opts.tableRows));
        bodyChildren.push(_para('', { spacingAfter: 200 }));
      }

      // إخلاء مسؤولية QCS
      bodyChildren.push(new Paragraph({
        bidirectional: true,
        alignment: AlignmentType.RIGHT,
        spacing: { before: 200 },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR.border } },
        children: [
          new TextRun({
            text: '⚠️ تنبيه: هذا التقرير مرجع مساعد — يجب التحقق من المواصفات الرسمية QCS 2024 قبل اتخاذ أي قرار هندسي.',
            font: 'Arial', size: 16, color: COLOR.textGray, italics: true, rtl: true
          })
        ]
      }));

      // جدول التوقيعات
      if (opts.signatures !== false) {
        bodyChildren.push(_para('', { spacingAfter: 200 }));
        bodyChildren.push(_buildSignaturesTable(opts.sigLabels));
      }

      // ─── بناء Document ───────────────────────────
      const doc = new Document({
        creator: 'QatarSpec Pro',
        title: title,
        description: 'QCS 2024 | Ashghal QA/QC Standard',
        styles: {
          default: {
            document: {
              run: { font: 'Arial', size: 22, color: COLOR.text }
            }
          }
        },
        sections: [{
          properties: {
            page: {
              size: { width: 11906, height: 16838 }, // A4 in twentieths-of-a-point
              margin: { top: 1134, right: 907, bottom: 907, left: 1134 }
            }
          },
          headers: { default: header },
          footers: { default: footer },
          children: bodyChildren
        }]
      });

      // ─── تحميل الملف ─────────────────────────────
      const blob = await Packer.toBlob(doc);
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      const safeName = (_s(opts.title) || 'QatarSpec-Report')
        .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
        .trim().replace(/\s+/g, '-').substring(0, 40);

      a.href     = url;
      a.download = 'QatarSpec-Pro-' + safeName + '.docx';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(url);
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1500);

      if (w.showToast) w.showToast('✅ تم تصدير Word Pro — ' + a.download);

    } catch (err) {
      // في حالة خطأ → fallback للطريقة القديمة
      console.error('[QS word-pro] Error:', err);
      if (w.showToast) w.showToast('⚠️ خطأ في Word Pro — استخدام الطريقة الاحتياطية...');
      if (typeof w.QS !== 'undefined' && typeof w.QS.exportWord === 'function') {
        w.QS.exportWord(opts);
      }
    }
  }

  // ═══════════════════════════════════════════════════
  // تصدير NCR Pro
  // ═══════════════════════════════════════════════════
  async function exportNCRWordPro() {
    const gv = function (id) {
      const el = document.getElementById(id);
      return el ? (_s(el.value) || '—') : '—';
    };

    const classLabels = { major: 'Major 🔴', minor: 'Minor 🟡', obs: 'Observation 🔵' };
    const statusLabels = { open: 'Open 🔴', inprog: 'In Progress 🟡', accepted: 'Closed ✅', rejected: 'Closed Rejected ❌', pending: 'Pending ⏳' };

    await exportToWordPro({
      title:      'NCR — ' + gv('ncr-num'),
      project:    gv('ncr-proj'),
      engineer:   gv('ncr-qc-eng'),
      contract:   gv('ncr-contract'),
      contractor: gv('ncr-contractor'),
      sections: [
        {
          heading: 'Non-Conformance Report — NCR',
          table: {
            headers: ['البند', 'القيمة', 'البند', 'القيمة'],
            rows: [
              ['رقم NCR', gv('ncr-num'),        'المشروع',       gv('ncr-proj')],
              ['رقم العقد', gv('ncr-contract'), 'المقاول',       gv('ncr-contractor')],
              ['التصنيف',  classLabels[gv('ncr-class')] || gv('ncr-class'),
               'الحالة',   statusLabels[gv('ncr-status')] || gv('ncr-status')],
              ['تاريخ الاكتشاف', gv('ncr-date'), 'تاريخ الإغلاق', gv('ncr-target')],
              ['الموقع',   gv('ncr-loc'),        'QCS Clause',    gv('ncr-clause')]
            ]
          }
        },
        { heading: 'وصف عدم المطابقة',    text: gv('ncr-desc') },
        { heading: 'Root Cause Analysis',  text: gv('ncr-root') },
        { heading: 'الإجراء التصحيحي',     text: gv('ncr-corrective') },
        { heading: 'الإجراء الوقائي',      text: gv('ncr-preventive') },
        { heading: 'نتيجة إعادة الاختبار', text: gv('ncr-retest'),
          qcsRef: 'QCS 2024 | ISO 9001 Cl.10.2 | Ashghal QA/QC Standard' }
      ],
      sigLabels: ['QC Engineer', 'SC / Consultant', 'Client Representative']
    });
  }

  // ═══════════════════════════════════════════════════
  // تصدير RFI Pro
  // ═══════════════════════════════════════════════════
  async function exportRFIWordPro() {
    const gv = function (id) {
      const el = document.getElementById(id);
      return el ? (_s(el.value) || '—') : '—';
    };

    await exportToWordPro({
      title:      'RFI — ' + gv('rfi-num'),
      project:    gv('rfi-proj'),
      engineer:   gv('rfi-from'),
      contract:   gv('rfi-contract'),
      contractor: gv('rfi-contractor'),
      sections: [
        {
          heading: 'Request for Inspection — RFI',
          table: {
            headers: ['البند', 'القيمة', 'البند', 'القيمة'],
            rows: [
              ['رقم RFI',      gv('rfi-num'),      'المشروع',      gv('rfi-proj')],
              ['رقم العقد',    gv('rfi-contract'), 'المقاول',      gv('rfi-contractor')],
              ['Submitted By', gv('rfi-from'),     'Directed To',  gv('rfi-to')],
              ['تاريخ الإرسال', gv('rfi-date'),   'Required By',  gv('rfi-reqby')]
            ]
          }
        },
        {
          heading: 'بيانات الموقع',
          table: {
            headers: ['البند', 'القيمة', 'البند', 'القيمة'],
            rows: [
              ['الموقع',    gv('rfi-loc'),    'Grid QNG',     gv('rfi-grid')],
              ['Chainage',  gv('rfi-ch'),     'Layer No.',    gv('rfi-layer')],
              ['QCS Clause', gv('rfi-clause'), 'Drawing No.', gv('rfi-dwg')]
            ]
          }
        },
        { heading: 'النشاط والموضوع',  text: 'النشاط: ' + gv('rfi-activity') + ' | نوع النقطة: ' + gv('rfi-point') + '\nالموضوع: ' + gv('rfi-subject') },
        { heading: 'نتائج الاختبارات', text: gv('rfi-results') },
        { heading: 'المرفقات',          text: gv('rfi-attach') },
        { heading: 'رد SC',
          table: {
            headers: ['الرد', 'Status'],
            rows: [[gv('rfi-response'), gv('rfi-status')]]
          },
          qcsRef: 'QCS 2024 | Ashghal QA/QC Standard'
        }
      ],
      sigLabels: ['مقدّم الطلب', 'SC / Consultant', 'قرار SC']
    });
  }

  // ═══════════════════════════════════════════════════
  // تسجيل في namespace — override إذا docx متاح
  // ═══════════════════════════════════════════════════
  if (!w.QS) w.QS = {};

  w.QS.exportToWordPro  = exportToWordPro;
  w.QS.exportNCRWordPro = exportNCRWordPro;
  w.QS.exportRFIWordPro = exportRFIWordPro;

  // ─── تجاوز الدوال القديمة إذا docx متاح (بعد load) ───
  w.addEventListener('load', function () {
    if (_isDocxAvailable()) {
      // تجاوز NCR / RFI بالنسخة Pro
      w.exportNCRWord  = exportNCRWordPro;
      w.exportRFIWord  = exportRFIWordPro;
      w.QS.exportNCRWord = exportNCRWordPro;
      w.QS.exportRFIWord = exportRFIWordPro;
    }
    // إذا docx غير متاح → الدوال القديمة تبقى تعمل (fallback محمي)
  });

})(window);
