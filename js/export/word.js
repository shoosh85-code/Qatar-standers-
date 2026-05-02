/**
 * QatarSpec Pro — Word Export Module
 * المرحلة 7 | تصدير Word بمعايير Ashghal الرسمية
 * QCS 2024 | Ashghal RDM 2023
 */

(function(w) {
  'use strict';

  // ═══════════════════════════════════════════════════
  // قوالب CSS للـ Word (HTML-in-MHTML)
  // ═══════════════════════════════════════════════════
  const WORD_CSS = [
    '@page Section1 {',
    '  size: 21cm 29.7cm;',
    '  margin: 2.5cm 2cm 2cm 2.5cm;',
    '  mso-header-margin: 1.5cm;',
    '  mso-footer-margin: 1cm;',
    '}',
    'div.Section1 { page: Section1; }',
    'body {',
    '  font-family: "Times New Roman", "Calibri", Arial, sans-serif;',
    '  direction: rtl;',
    '  color: #1a1a1a;',
    '  font-size: 12pt;',
    '  line-height: 1.7;',
    '}',
    '.qs-header {',
    '  background: #7a1515;',
    '  color: #c9a84c;',
    '  padding: 14pt 18pt;',
    '  margin-bottom: 14pt;',
    '  display: block;',
    '  mso-element: header;',
    '}',
    '.qs-header-title { font-size: 16pt; font-weight: bold; }',
    '.qs-header-sub { font-size: 9pt; color: #fff; margin-top: 3pt; }',
    '.qs-meta-table {',
    '  width: 100%;',
    '  border-collapse: collapse;',
    '  background: #f9f5ee;',
    '  margin-bottom: 12pt;',
    '}',
    '.qs-meta-table td { padding: 5pt 10pt; border: 1pt solid #ddd; font-size: 10pt; }',
    '.qs-meta-table .lbl { font-weight: bold; color: #7a1515; width: 25%; }',
    'h1 {',
    '  font-size: 16pt; font-weight: bold; color: #7a1515;',
    '  border-bottom: 2pt solid #c9a84c;',
    '  padding-bottom: 6pt; margin: 14pt 0 10pt;',
    '}',
    'h2 { font-size: 13pt; font-weight: bold; color: #7a1515; margin: 12pt 0 6pt; }',
    'h3 { font-size: 11pt; font-weight: bold; color: #555; margin: 10pt 0 5pt; }',
    'p { margin: 5pt 0; font-size: 11pt; }',
    'table {',
    '  width: 100%; border-collapse: collapse;',
    '  margin: 10pt 0; font-size: 10pt;',
    '}',
    'th {',
    '  background: #7a1515; color: #fff;',
    '  padding: 6pt 8pt; text-align: center;',
    '  border: 1pt solid #6a1010; font-weight: bold;',
    '}',
    'td {',
    '  padding: 5pt 8pt;',
    '  border: 1pt solid #cccccc;',
    '  vertical-align: top;',
    '}',
    'tr:nth-child(even) td { background: #f9f5ee; }',
    '.pass-cell { color: #27ae60; font-weight: bold; }',
    '.fail-cell { color: #e74c3c; font-weight: bold; }',
    '.gold-label { color: #c9a84c; font-weight: bold; }',
    '.qs-footer {',
    '  border-top: 1pt solid #cccccc;',
    '  margin-top: 18pt; padding-top: 6pt;',
    '  font-size: 9pt; color: #888;',
    '  display: flex; justify-content: space-between;',
    '  mso-element: footer;',
    '}',
    '.sig-table { width: 100%; margin-top: 20pt; }',
    '.sig-table td { border: none; padding: 4pt 8pt; width: 33%; }',
    '.sig-line { border-top: 1pt solid #333; padding-top: 4pt; text-align: center; font-size: 9pt; }'
  ].join('\n');

  // ═══════════════════════════════════════════════════
  // بناء ترويسة Word الرسمية
  // ═══════════════════════════════════════════════════
  function _buildHeader(opts) {
    const today = opts.today || new Date().toLocaleDateString('ar-QA');
    return [
      '<div class="qs-header">',
      '  <div class="qs-header-title">QatarSpec Pro</div>',
      '  <div class="qs-header-sub">QCS 2024 | Ashghal QA/QC | ' + today + '</div>',
      '</div>'
    ].join('\n');
  }

  // ═══════════════════════════════════════════════════
  // جدول البيانات الوصفية (مشروع، مهندس، تاريخ)
  // ═══════════════════════════════════════════════════
  function _buildMeta(opts) {
    const rows = [
      ['المشروع', opts.project  || ''],
      ['المهندس', opts.engineer || ''],
      ['التاريخ',  opts.today   || new Date().toLocaleDateString('ar-QA')],
      ['المرجع',  'QCS 2024 | Ashghal QA/QC Standard']
    ];
    if (opts.contract)   rows.push(['رقم العقد', opts.contract]);
    if (opts.contractor) rows.push(['المقاول',   opts.contractor]);

    let html = '<table class="qs-meta-table">';
    // صفوف زوجية: اثنان في كل صف
    for (let i = 0; i < rows.length; i += 2) {
      html += '<tr>';
      html += '<td class="lbl">' + _s(rows[i][0]) + '</td>';
      html += '<td>' + _s(rows[i][1]) + '</td>';
      if (rows[i + 1]) {
        html += '<td class="lbl">' + _s(rows[i + 1][0]) + '</td>';
        html += '<td>' + _s(rows[i + 1][1]) + '</td>';
      } else {
        html += '<td colspan="2"></td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  // ═══════════════════════════════════════════════════
  // تذييل Word الرسمي
  // ═══════════════════════════════════════════════════
  function _buildFooter(opts) {
    return [
      '<div class="qs-footer">',
      '  <span>QCS 2024 | للاستخدام المهني فقط</span>',
      '  <span>QatarSpec Pro — qatar-standers.vercel.app</span>',
      '</div>'
    ].join('\n');
  }

  // ═══════════════════════════════════════════════════
  // توليد حقل التوقيعات
  // ═══════════════════════════════════════════════════
  function _buildSignatures(labels) {
    labels = labels || ['مقدّم الطلب', 'SC / Consultant', 'Client'];
    let html = '<table class="sig-table"><tr>';
    labels.forEach(function(lbl) {
      html += '<td><div class="sig-line">' + _s(lbl) + '</div></td>';
    });
    html += '</tr></table>';
    return html;
  }

  // ═══════════════════════════════════════════════════
  // تنظيف النص (XSS safe)
  // ═══════════════════════════════════════════════════
  function _s(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ═══════════════════════════════════════════════════
  // دالة التصدير العامة
  // ═══════════════════════════════════════════════════
  function exportWord(opts) {
    opts = opts || {};

    // Pro Gate
    if (w.isProUser && !w.isProUser()) {
      if (w.showUpgradePrompt) {
        w.showUpgradePrompt('word', '📝', 'تصدير Word — ميزة Pro', 'تصدير المواصفات والنماذج إلى ملف Word متاح للمشتركين في Pro فقط.');
      }
      return;
    }

    if (w.showToast) w.showToast('⏳ جاري إعداد ملف Word...');

    const today = new Date().toLocaleDateString('ar-QA');
    const safeTitle = _s(opts.title || 'QatarSpec Pro Report');

    // بناء محتوى النص
    let bodyContent = '';
    if (opts.bodyHTML) {
      // تنظيف HTML المُمرّر
      bodyContent = opts.bodyHTML
        .replace(/style="[^"]*color:\s*var\([^)]+\)[^"]*"/g, '')
        .replace(/background:[^;"]+;?/g, '')
        .replace(/rgba\([^)]+\)/g, '#333')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<input[^>]*>/gi, '')
        .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '');
    } else if (opts.lines && opts.lines.length) {
      bodyContent = opts.lines.map(function(l) {
        return '<p>' + _s(l) + '</p>';
      }).join('\n');
    }

    // الطوارئ — content من صفحة التفاصيل الحالية
    if (!bodyContent) {
      const contentEl = document.getElementById('dmContent');
      if (contentEl) {
        const clone = contentEl.cloneNode(true);
        clone.querySelectorAll('button, input, select, textarea').forEach(function(el) { el.remove(); });
        bodyContent = clone.innerHTML
          .replace(/style="[^"]*color:\s*var\([^)]+\)[^"]*"/g, '')
          .replace(/background:[^;"]+;?/g, '');
      }
    }

    const wordHTML = '<!DOCTYPE html>\n' +
      '<html xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
      '      xmlns:w="urn:schemas-microsoft-com:office:word"\n' +
      '      xmlns="http://www.w3.org/TR/REC-html40">\n' +
      '<head>\n' +
      '<meta charset="UTF-8">\n' +
      '<meta name="ProgId" content="Word.Document">\n' +
      '<meta name="Generator" content="QatarSpec Pro">\n' +
      '<xml>\n' +
      '  <w:WordDocument>\n' +
      '    <w:View>Print</w:View>\n' +
      '    <w:Zoom>90</w:Zoom>\n' +
      '    <w:DoNotOptimizeForBrowser/>\n' +
      '  </w:WordDocument>\n' +
      '</xml>\n' +
      '<style>\n' + WORD_CSS + '\n</style>\n' +
      '</head>\n' +
      '<body>\n' +
      '<div class="Section1">\n' +
      _buildHeader({ today }) + '\n' +
      '<h1>' + safeTitle + '</h1>\n' +
      _buildMeta({
        project:    opts.project    || '',
        engineer:   opts.engineer   || '',
        today:      today,
        contract:   opts.contract   || '',
        contractor: opts.contractor || ''
      }) + '\n' +
      bodyContent + '\n' +
      (opts.signatures !== false ? _buildSignatures(opts.sigLabels) + '\n' : '') +
      _buildFooter() + '\n' +
      '</div>\n' +
      '</body>\n</html>';

    // إنشاء الـ Blob وتحميله
    const blob = new Blob(['\ufeff', wordHTML], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const safeName = (opts.title || 'QatarSpec-Report')
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-').substring(0, 40);

    a.href     = url;
    // امتداد .docx فقط — OOXML format صحيح
    a.download = 'QatarSpec-' + safeName + '.docx';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      URL.revokeObjectURL(url);
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 1500);
    if (w.showToast) w.showToast('✅ تم تصدير Word — ' + a.download);
  }

  // ═══════════════════════════════════════════════════
  // تصدير NCR كـ Word
  // ═══════════════════════════════════════════════════
  function exportNCRWord() {
    const gv = function(id) {
      const el = document.getElementById(id);
      return el ? (el.value || '—') : '—';
    };
    const classMap = { major: '<span style="color:#e74c3c;font-weight:bold">Major 🔴</span>', minor: '<span style="color:#f39c12;font-weight:bold">Minor 🟡</span>', obs: '<span style="color:#3498db;font-weight:bold">Observation 🔵</span>' };
    const statusMap = { open: '<span style="color:#e74c3c">Open 🔴</span>', inprog: '<span style="color:#f39c12">In Progress 🟡</span>', accepted: '<span style="color:#27ae60">Closed ✅</span>', rejected: '<span style="color:#e74c3c">Closed Rejected ❌</span>', pending: '<span style="color:#888">Pending ⏳</span>' };

    const ncrClass  = classMap[gv('ncr-class')]  || _s(gv('ncr-class'));
    const ncrStatus = statusMap[gv('ncr-status')] || _s(gv('ncr-status'));

    const bodyHTML = '<table><tr>' +
      '<th colspan="4">Non-Conformance Report — NCR</th></tr>' +
      '<tr><td class="lbl">رقم NCR</td><td>' + _s(gv('ncr-num')) + '</td><td class="lbl">المشروع</td><td>' + _s(gv('ncr-proj')) + '</td></tr>' +
      '<tr><td class="lbl">رقم العقد</td><td>' + _s(gv('ncr-contract')) + '</td><td class="lbl">المقاول</td><td>' + _s(gv('ncr-contractor')) + '</td></tr>' +
      '<tr><td class="lbl">التصنيف</td><td>' + ncrClass + '</td><td class="lbl">الحالة</td><td>' + ncrStatus + '</td></tr>' +
      '<tr><td class="lbl">تاريخ الاكتشاف</td><td>' + _s(gv('ncr-date')) + '</td><td class="lbl">تاريخ الإغلاق</td><td>' + _s(gv('ncr-target')) + '</td></tr>' +
      '<tr><td class="lbl">الموقع</td><td>' + _s(gv('ncr-loc')) + '</td><td class="lbl">QCS Clause</td><td>' + _s(gv('ncr-clause')) + '</td></tr>' +
      '</table>' +
      '<h2>وصف عدم المطابقة</h2><p>' + _s(gv('ncr-desc')) + '</p>' +
      '<h2>Root Cause Analysis</h2><p>' + _s(gv('ncr-root')) + '</p>' +
      '<h2>الإجراء التصحيحي (Corrective Action)</h2><p>' + _s(gv('ncr-corrective')) + '</p>' +
      '<h2>الإجراء الوقائي (Preventive Action)</h2><p>' + _s(gv('ncr-preventive')) + '</p>' +
      '<h2>نتيجة إعادة الاختبار</h2><p>' + _s(gv('ncr-retest')) + '</p>' +
      '<p style="font-size:9pt;color:#888;margin-top:10pt">المرجع: QCS 2024 | ISO 9001 Cl.10.2 | Ashghal QA/QC Standard</p>';

    exportWord({
      title:      'NCR — ' + gv('ncr-num'),
      project:    gv('ncr-proj'),
      engineer:   gv('ncr-qc-eng'),
      contract:   gv('ncr-contract'),
      contractor: gv('ncr-contractor'),
      bodyHTML:   bodyHTML,
      sigLabels:  ['QC Engineer', 'SC / Consultant', 'Client Representative']
    });
  }

  // ═══════════════════════════════════════════════════
  // تصدير RFI كـ Word
  // ═══════════════════════════════════════════════════
  function exportRFIWord() {
    const gv = function(id) {
      const el = document.getElementById(id);
      return el ? (el.value || '—') : '—';
    };

    const bodyHTML = '<table><tr><th colspan="4">Request for Inspection — RFI</th></tr>' +
      '<tr><td class="lbl">رقم RFI</td><td>' + _s(gv('rfi-num')) + '</td><td class="lbl">المشروع</td><td>' + _s(gv('rfi-proj')) + '</td></tr>' +
      '<tr><td class="lbl">رقم العقد</td><td>' + _s(gv('rfi-contract')) + '</td><td class="lbl">المقاول</td><td>' + _s(gv('rfi-contractor')) + '</td></tr>' +
      '<tr><td class="lbl">Submitted By</td><td>' + _s(gv('rfi-from')) + '</td><td class="lbl">Directed To</td><td>' + _s(gv('rfi-to')) + '</td></tr>' +
      '<tr><td class="lbl">تاريخ الإرسال</td><td>' + _s(gv('rfi-date')) + '</td><td class="lbl">Required By</td><td>' + _s(gv('rfi-reqby')) + '</td></tr>' +
      '</table>' +
      '<h2>بيانات الموقع</h2>' +
      '<table><tr><td class="lbl">الموقع</td><td>' + _s(gv('rfi-loc')) + '</td><td class="lbl">Grid QNG</td><td>' + _s(gv('rfi-grid')) + '</td></tr>' +
      '<tr><td class="lbl">Chainage</td><td>' + _s(gv('rfi-ch')) + '</td><td class="lbl">Layer No.</td><td>' + _s(gv('rfi-layer')) + '</td></tr>' +
      '<tr><td class="lbl">QCS Clause</td><td>' + _s(gv('rfi-clause')) + '</td><td class="lbl">Drawing No.</td><td>' + _s(gv('rfi-dwg')) + '</td></tr>' +
      '</table>' +
      '<h2>النشاط والموضوع</h2>' +
      '<p>النشاط: ' + _s(gv('rfi-activity')) + ' &nbsp;|&nbsp; نوع النقطة: ' + _s(gv('rfi-point')) + '</p>' +
      '<p><strong>الموضوع:</strong> ' + _s(gv('rfi-subject')) + '</p>' +
      '<h2>نتائج الاختبارات</h2><p>' + _s(gv('rfi-results')) + '</p>' +
      '<h2>المرفقات</h2><p>' + _s(gv('rfi-attach')) + '</p>' +
      '<h2>رد SC</h2>' +
      '<table><tr><td class="lbl">الرد</td><td>' + _s(gv('rfi-response')) + '</td><td class="lbl">Status</td><td>' + _s(gv('rfi-status')) + '</td></tr></table>' +
      '<p style="font-size:9pt;color:#888;margin-top:10pt">المرجع: QCS 2024 | Ashghal QA/QC Standard</p>';

    exportWord({
      title:      'RFI — ' + gv('rfi-num'),
      project:    gv('rfi-proj'),
      engineer:   gv('rfi-from'),
      contract:   gv('rfi-contract'),
      contractor: gv('rfi-contractor'),
      bodyHTML:   bodyHTML,
      sigLabels:  ['مقدّم الطلب', 'SC / Consultant', 'قرار SC']
    });
  }

  // ═══════════════════════════════════════════════════
  // تسجيل في namespace
  // ═══════════════════════════════════════════════════
  if (!w.QS) w.QS = {};
  w.QS.exportWord     = exportWord;
  w.QS.exportNCRWord  = exportNCRWord;
  w.QS.exportRFIWord  = exportRFIWord;

  w.exportWordDoc     = exportWord;
  w.exportNCRWord     = exportNCRWord;
  w.exportRFIWord     = exportRFIWord;

})(window);
