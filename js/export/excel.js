/**
 * QatarSpec Pro — Excel Export Module
 * المرحلة 7 | تصدير Excel بمعايير Ashghal الرسمية
 * QCS 2024 | Ashghal RDM 2023 | ISO 9001
 */

(function(w) {
  'use strict';

  // ═══════════════════════════════════════════════════
  // تحميل SheetJS ديناميكياً
  // ═══════════════════════════════════════════════════
  function _loadXLSX() {
    if (w.XLSX) return Promise.resolve(w.XLSX);
    return new Promise(function(res, rej) {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      s.onload  = function() { res(w.XLSX); };
      s.onerror = function() { rej(new Error('SheetJS CDN غير متاح')); };
      document.head.appendChild(s);
    });
  }

  // ═══════════════════════════════════════════════════
  // دالة مساعدة: قراءة قيمة من input/select
  // ═══════════════════════════════════════════════════
  function _gv(id, def) {
    const el = document.getElementById(id);
    return el ? (el.value || def || '') : (def || '');
  }

  // ═══════════════════════════════════════════════════
  // بناء ورقة Excel مع ترويسة QatarSpec Pro موحدة
  // ═══════════════════════════════════════════════════
  function _buildSheet(X, headerRows, dataRows, colWidths) {
    const allRows = headerRows.concat(dataRows);
    const ws = X.utils.aoa_to_sheet(allRows);
    if (colWidths) ws['!cols'] = colWidths;
    return ws;
  }

  // ═══════════════════════════════════════════════════
  // تصدير NCR متقدم (Ashghal Format)
  // ═══════════════════════════════════════════════════
  async function exportNCRFull() {
    let X;
    try { X = await _loadXLSX(); }
    catch(e) { if (w.showToast) w.showToast('❌ ' + e.message); return; }

    const today    = new Date().toLocaleDateString('ar-QA');
    const classMap = { major: 'Major 🔴', minor: 'Minor 🟡', obs: 'Observation 🔵' };
    const statusMap = { open: 'Open', inprog: 'In Progress', accepted: 'Closed — Accepted', rejected: 'Closed — Rejected', pending: 'Pending' };
    const ncrClass  = classMap[_gv('ncr-class')]  || _gv('ncr-class')  || '—';
    const ncrStatus = statusMap[_gv('ncr-status')] || _gv('ncr-status') || '—';

    // ── Sheet 1: NCR Form ──
    const ncrRows = [
      ['\uFEFFQatarSpec Pro — Non-Conformance Report (NCR)', '', '', '', ''],
      ['ISO 9001 Cl.10.2 + Ashghal QA/QC | QCS 2024 | ' + today, '', '', '', ''],
      ['', '', '', '', ''],
      ['رقم NCR:',         _gv('ncr-num'),        'المشروع:',      _gv('ncr-proj'),    ''],
      ['رقم العقد:',       _gv('ncr-contract'),   'المقاول:',      _gv('ncr-contractor'), ''],
      ['تصنيف NCR:',       ncrClass,              'مصدر الاكتشاف:', _gv('ncr-source'),  ''],
      ['تاريخ الاكتشاف:',  _gv('ncr-date'),       'تاريخ الإغلاق المطلوب:', _gv('ncr-target'), ''],
      ['تاريخ الإغلاق الفعلي:', _gv('ncr-closed-date'), 'الحالة:',    ncrStatus,         ''],
      ['', '', '', '', ''],
      ['الموقع + Chainage:', _gv('ncr-loc'),       'Drawing No.:',  _gv('ncr-dwg'),     ''],
      ['QCS Clause المُنتهك:', _gv('ncr-clause'),  '', '', ''],
      ['', '', '', '', ''],
      ['وصف عدم المطابقة:', '', '', '', ''],
      [_gv('ncr-desc'),    '', '', '', ''],
      ['', '', '', '', ''],
      ['Root Cause Analysis:', '', '', '', ''],
      [_gv('ncr-root'),    '', '', '', ''],
      ['', '', '', '', ''],
      ['الإجراء التصحيحي (Corrective Action):', '', '', '', ''],
      [_gv('ncr-corrective'), '', '', '', ''],
      ['الإجراء الوقائي (Preventive Action):', '', '', '', ''],
      [_gv('ncr-preventive'), '', '', '', ''],
      ['', '', '', '', ''],
      ['نتيجة إعادة الاختبار:', _gv('ncr-retest'), '', '', ''],
      ['', '', '', '', ''],
      ['QC Engineer:',     _gv('ncr-qc-eng'),     'SC / Consultant:', _gv('ncr-sc'),    'Client:'],
      [_gv('ncr-client'),  '', '', '', ''],
      ['', '', '', '', ''],
      ['التوقيع:',         '___________________', '___________________', '___________________', '']
    ];

    const ws1 = X.utils.aoa_to_sheet(ncrRows);
    ws1['!cols'] = [{ wch: 28 }, { wch: 38 }, { wch: 24 }, { wch: 30 }, { wch: 18 }];
    ws1['!merges'] = [
      { s: { r: 0,  c: 0 }, e: { r: 0,  c: 4 } },
      { s: { r: 1,  c: 0 }, e: { r: 1,  c: 4 } },
      { s: { r: 10, c: 1 }, e: { r: 10, c: 4 } },
      { s: { r: 12, c: 0 }, e: { r: 12, c: 4 } },
      { s: { r: 13, c: 0 }, e: { r: 13, c: 4 } },
      { s: { r: 15, c: 0 }, e: { r: 15, c: 4 } },
      { s: { r: 16, c: 0 }, e: { r: 16, c: 4 } },
      { s: { r: 18, c: 0 }, e: { r: 18, c: 4 } },
      { s: { r: 19, c: 0 }, e: { r: 19, c: 4 } },
      { s: { r: 20, c: 0 }, e: { r: 20, c: 4 } },
      { s: { r: 21, c: 0 }, e: { r: 21, c: 4 } }
    ];

    // ── Sheet 2: NCR Register ──
    const ws2 = X.utils.aoa_to_sheet([
      ['\uFEFFNCR Register — سجل عدم المطابقة', '', '', '', '', ''],
      ['QatarSpec Pro | QCS 2024 | ' + today, '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['NCR No.', 'التصنيف', 'الموقع', 'QCS Clause', 'الحالة', 'Target Close'],
      [_gv('ncr-num'), ncrClass, _gv('ncr-loc'), _gv('ncr-clause'), ncrStatus, _gv('ncr-target')]
    ]);
    ws2['!cols'] = [{ wch: 14 }, { wch: 18 }, { wch: 36 }, { wch: 22 }, { wch: 22 }, { wch: 16 }];
    ws2['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }
    ];

    // ── Sheet 3: Action Tracker ──
    const ws3 = X.utils.aoa_to_sheet([
      ['\uFEFFCorrectiveAction Tracker — متابعة الإجراءات', '', '', '', ''],
      ['NCR No.', 'Corrective Action', 'Responsible', 'Due Date', 'Status'],
      [_gv('ncr-num'), _gv('ncr-corrective'), _gv('ncr-qc-eng'), _gv('ncr-target'), ncrStatus],
      ['', '', '', '', ''],
      ['NCR No.', 'Preventive Action', 'Responsible', 'Due Date', 'Status'],
      [_gv('ncr-num'), _gv('ncr-preventive'), _gv('ncr-qc-eng'), _gv('ncr-target'), ncrStatus]
    ]);
    ws3['!cols'] = [{ wch: 14 }, { wch: 50 }, { wch: 22 }, { wch: 16 }, { wch: 18 }];
    ws3['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

    const wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, ws1, 'NCR Form');
    X.utils.book_append_sheet(wb, ws2, 'NCR Register');
    X.utils.book_append_sheet(wb, ws3, 'Action Tracker');
    X.writeFile(wb, 'NCR-' + (_gv('ncr-num') || '001') + '-' + Date.now() + '.xlsx');
    if (w.showToast) w.showToast('✅ تم تصدير NCR Excel — 3 أوراق');
  }

  // ═══════════════════════════════════════════════════
  // تصدير RFI متقدم
  // ═══════════════════════════════════════════════════
  async function exportRFIFull() {
    let X;
    try { X = await _loadXLSX(); }
    catch(e) { if (w.showToast) w.showToast('❌ ' + e.message); return; }

    const today = new Date().toLocaleDateString('ar-QA');
    const ws = X.utils.aoa_to_sheet([
      ['\uFEFFQatarSpec Pro — Request for Inspection (RFI)', '', '', ''],
      ['المرجع: QCS 2024 | Ashghal QA/QC | ' + today, '', '', ''],
      ['', '', '', ''],
      ['رقم RFI:',         _gv('rfi-num'),        'رقم المشروع:',  _gv('rfi-proj')],
      ['رقم العقد:',       _gv('rfi-contract'),   'المقاول:',      _gv('rfi-contractor')],
      ['Submitted By:',    _gv('rfi-from'),        'Directed To:',  _gv('rfi-to')],
      ['تاريخ الإرسال:',   _gv('rfi-date'),        'Required By:',  _gv('rfi-reqby')],
      ['', '', '', ''],
      ['★ بيانات الموقع', '', '', ''],
      ['الموقع:',          _gv('rfi-loc'),         'Grid QNG:',     _gv('rfi-grid')],
      ['Chainage:',        _gv('rfi-ch'),           'Layer No.:',    _gv('rfi-layer')],
      ['QCS Clause:',      _gv('rfi-clause'),       'Drawing No.:',  _gv('rfi-dwg')],
      ['', '', '', ''],
      ['النشاط:',          _gv('rfi-activity'),     'نوع النقطة:',   _gv('rfi-point')],
      ['', '', '', ''],
      ['موضوع RFI:',       _gv('rfi-subject'),      '', ''],
      ['', '', '', ''],
      ['نتائج الاختبارات:', _gv('rfi-results'),     '', ''],
      ['', '', '', ''],
      ['المرفقات:',        _gv('rfi-attach'),       '', ''],
      ['', '', '', ''],
      ['رد SC / Response:', _gv('rfi-response'),    'Status:',       _gv('rfi-status')],
      ['', '', '', ''],
      ['توقيع مقدّم الطلب:', '___________________', 'التاريخ:',     '___________'],
      ['توقيع SC / Consultant:', '___________________', 'التاريخ:', '___________'],
      ['قرار SC:', 'مقبول ☐    مرفوض ☐    Hold ☐', '', '']
    ]);
    ws['!cols'] = [{ wch: 24 }, { wch: 44 }, { wch: 22 }, { wch: 34 }];
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
      { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
      { s: { r: 15, c: 1 }, e: { r: 15, c: 3 } },
      { s: { r: 17, c: 1 }, e: { r: 17, c: 3 } },
      { s: { r: 19, c: 1 }, e: { r: 19, c: 3 } }
    ];

    const wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, ws, 'RFI');
    X.writeFile(wb, 'RFI-' + (_gv('rfi-num') || '001') + '-' + Date.now() + '.xlsx');
    if (w.showToast) w.showToast('✅ تم تصدير RFI Excel');
  }

  // ═══════════════════════════════════════════════════
  // تصدير Test Results (نتائج الحاسبة)
  // ═══════════════════════════════════════════════════
  async function exportTestResultsExcel(opts) {
    opts = opts || {};
    let X;
    try { X = await _loadXLSX(); }
    catch(e) { if (w.showToast) w.showToast('❌ ' + e.message); return; }

    const today    = new Date().toLocaleDateString('ar-QA');
    const results  = opts.results || [];
    const project  = opts.project  || _gv('itp-project-name') || '';
    const engineer = opts.engineer || _gv('itp-engineer')      || '';

    // حساب إجمالي Pass/Fail
    const passCount = results.filter(function(r) { return r.pass; }).length;
    const failCount = results.length - passCount;

    // ── Sheet 1: نتائج التفصيلية ──
    const headerRows = [
      ['\uFEFFQatarSpec Pro — Test Results Summary', '', '', '', '', ''],
      ['المشروع: ' + project, '', '', 'المهندس: ' + engineer, '', ''],
      ['التاريخ: ' + today, '', '', 'المرجع: QCS 2024', '', ''],
      ['', '', '', '', '', ''],
      ['م', 'الاختبار / Test Name', 'القيمة', 'الوحدة', 'المرجع QCS', 'النتيجة']
    ];

    const dataRows = results.map(function(r, i) {
      return [
        i + 1,
        r.name  || '',
        r.value !== undefined ? r.value : '',
        r.unit  || '',
        r.ref   || '',
        r.pass  ? 'PASS ✅' : 'FAIL ❌'
      ];
    });

    const ws1 = X.utils.aoa_to_sheet(headerRows.concat(dataRows));
    ws1['!cols'] = [
      { wch: 5 }, { wch: 40 }, { wch: 16 }, { wch: 12 }, { wch: 24 }, { wch: 14 }
    ];
    ws1['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
      { s: { r: 1, c: 3 }, e: { r: 1, c: 5 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } },
      { s: { r: 2, c: 3 }, e: { r: 2, c: 5 } }
    ];

    // ── Sheet 2: ملخص إحصائي ──
    const ws2 = X.utils.aoa_to_sheet([
      ['\uFEFFTest Summary — ملخص النتائج', ''],
      ['', ''],
      ['البيان', 'القيمة'],
      ['إجمالي الاختبارات', results.length],
      ['اجتاز PASS ✅',     passCount],
      ['رسب FAIL ❌',        failCount],
      ['نسبة الاجتياز %',   results.length ? Math.round(passCount / results.length * 100) + '%' : '—'],
      ['', ''],
      ['المشروع',   project],
      ['المهندس',   engineer],
      ['التاريخ',   today],
      ['المرجع',    'QCS 2024 — QatarSpec Pro'],
      ['', ''],
      ['تنبيه:', 'النتائج للاستخدام المهني. يُرجى التحقق من المختبر المعتمد']
    ]);
    ws2['!cols'] = [{ wch: 28 }, { wch: 36 }];
    ws2['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

    const wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, ws1, 'Test Results');
    X.utils.book_append_sheet(wb, ws2, 'Summary');
    const fname = 'TestResults-' + (opts.title || 'QatarSpec').replace(/\s+/g, '-').substring(0, 20);
    X.writeFile(wb, fname + '-' + Date.now() + '.xlsx');
    if (w.showToast) w.showToast('✅ تم تصدير نتائج الاختبارات — 2 أوراق');
  }

  // ═══════════════════════════════════════════════════
  // تصدير ITP متقدم — 4 أوراق (Main, Hold, Witness, Summary)
  // ═══════════════════════════════════════════════════
  async function exportITPFull() {
    let X;
    try { X = await _loadXLSX(); }
    catch(e) { if (w.showToast) w.showToast('❌ ' + e.message); return; }

    const today      = new Date().toLocaleDateString('ar-QA');
    const projectName = _gv('itp-project-name') || '';
    const itpNum      = _gv('itp-number')        || '';
    const engineer    = _gv('itp-engineer')       || '';
    const itpDate     = _gv('itp-date')           || today;
    const title       = (document.getElementById('dmTitle') || {}).textContent || 'ITP';

    // تجميع صفوف ITP من الجدول الظاهر في الصفحة
    const rows     = [];
    const hp_rows  = [];
    const wp_rows  = [];

    document.querySelectorAll('#print-area .dm-table tbody tr').forEach(function(tr) {
      const cells = tr.querySelectorAll('td');
      if (cells.length >= 4) {
        const row       = Array.from(cells).map(function(c) { return c.textContent.trim(); });
        const pointType = (row[9] || row[7] || row[5] || '').toUpperCase();
        rows.push(row);
        if (pointType.includes('H'))      hp_rows.push(row);
        else if (pointType.includes('W')) wp_rows.push(row);
      }
    });

    if (!rows.length) {
      if (w.showToast) w.showToast('⚠️ لا توجد بيانات ITP في الصفحة الحالية');
      return;
    }

    // ── Sheet 1: ITP Main ──
    const ws1 = X.utils.aoa_to_sheet([
      ['\uFEFFQatarSpec Pro — Inspection & Test Plan (ITP)', '', '', '', '', '', '', '', '', ''],
      ['المشروع:', projectName, '', '', 'رقم ITP:', itpNum, '', '', '', ''],
      ['التاريخ:', itpDate,     '', '', 'المهندس:', engineer, '', '', '', ''],
      ['المرجع:', 'QCS 2024',  '', '', 'تاريخ الطباعة:', today, '', '', '', ''],
      [],
      ['م', 'النشاط / Activity', 'مرجع QCS', 'معيار القبول', 'التكرار', 'طريقة الاختبار', 'Lab', 'QC', 'SC', 'النقطة']
    ].concat(rows));

    ws1['!cols'] = [
      { wch: 5 }, { wch: 44 }, { wch: 20 }, { wch: 40 },
      { wch: 20 }, { wch: 20 }, { wch: 6 }, { wch: 6 }, { wch: 6 }, { wch: 14 }
    ];
    ws1['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }, { s: { r: 1, c: 4 }, e: { r: 1, c: 9 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 3 } }, { s: { r: 2, c: 4 }, e: { r: 2, c: 9 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } }, { s: { r: 3, c: 4 }, e: { r: 3, c: 9 } }
    ];

    // ── Sheet 2: Hold Points ──
    const ws2 = X.utils.aoa_to_sheet([
      ['\uFEFFHold Points — نقاط الإيقاف الإلزامية', '', '', ''],
      ['المشروع:', projectName, 'ITP No:', itpNum],
      [],
      ['م', 'النشاط / Activity', 'معيار القبول', 'النوع']
    ].concat(hp_rows.map(function(r) {
      return [r[0] || '', r[1] || '', r[3] || '', 'H — Hold'];
    })));
    ws2['!cols'] = [{ wch: 6 }, { wch: 48 }, { wch: 42 }, { wch: 12 }];
    ws2['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

    // ── Sheet 3: Witness Points ──
    const ws3 = X.utils.aoa_to_sheet([
      ['\uFEFFWitness Points — نقاط الشهود', '', '', ''],
      ['المشروع:', projectName, 'ITP No:', itpNum],
      [],
      ['م', 'النشاط / Activity', 'معيار القبول', 'النوع']
    ].concat(wp_rows.map(function(r) {
      return [r[0] || '', r[1] || '', r[3] || '', 'W — Witness'];
    })));
    ws3['!cols'] = [{ wch: 6 }, { wch: 48 }, { wch: 42 }, { wch: 14 }];
    ws3['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

    // ── Sheet 4: Summary ──
    const reviewCount = rows.length - hp_rows.length - wp_rows.length;
    const ws4 = X.utils.aoa_to_sheet([
      ['\uFEFFITP Statistics — إحصائيات خطة الفحص', ''],
      [],
      ['البيان', 'القيمة'],
      ['إجمالي بنود ITP',     rows.length],
      ['Hold Points (H)',     hp_rows.length],
      ['Witness Points (W)',  wp_rows.length],
      ['Review Points (R)',   reviewCount],
      ['نسبة Hold %',         rows.length ? Math.round(hp_rows.length / rows.length * 100) + '%' : '—'],
      [],
      ['المشروع',   projectName],
      ['رقم ITP',   itpNum],
      ['المهندس',   engineer],
      ['تاريخ ITP', itpDate],
      ['تاريخ التصدير', today],
      ['المرجع',    'QCS 2024 — QatarSpec Pro']
    ]);
    ws4['!cols'] = [{ wch: 30 }, { wch: 38 }];
    ws4['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

    const wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, ws1, 'ITP Main');
    X.utils.book_append_sheet(wb, ws2, 'Hold Points');
    X.utils.book_append_sheet(wb, ws3, 'Witness Points');
    X.utils.book_append_sheet(wb, ws4, 'Summary');
    X.writeFile(wb, 'ITP-' + (itpNum || 'Export') + '-' + Date.now() + '.xlsx');
    if (w.showToast) w.showToast('✅ تم تصدير ITP Excel — 4 أوراق');
  }

  // ═══════════════════════════════════════════════════
  // تصدير التقرير اليومي DPR
  // ═══════════════════════════════════════════════════
  async function exportDPRFull() {
    let X;
    try { X = await _loadXLSX(); }
    catch(e) { if (w.showToast) w.showToast('❌ ' + e.message); return; }

    const parseRows = function(id) {
      const el = document.getElementById(id);
      if (!el || !el.value) return [];
      return el.value.split('\n')
        .filter(function(l) { return l.trim(); })
        .map(function(l) { return l.split('|').map(function(c) { return c.trim(); }); });
    };

    const today = new Date().toLocaleDateString('ar-QA');
    const manpowerRows  = parseRows('dpr-manpower');
    const equipmentRows = parseRows('dpr-equipment');
    const progressRows  = parseRows('dpr-progress');

    // حساب إجمالي العمالة
    const totalManpower = manpowerRows.reduce(function(sum, r) {
      return sum + ((parseInt(r[1]) || 0) * (parseInt(r[2]) || 8));
    }, 0);

    // ── Sheet 1: Daily Report ──
    let allRows = [
      ['\uFEFFQatarSpec Pro — Daily Progress Report (DPR)', '', '', '', ''],
      ['المشروع:', _gv('dpr-proj'), 'التاريخ:', _gv('dpr-date'), 'الطقس: ' + _gv('dpr-weather')],
      ['المقاول:', _gv('dpr-contractor', '—'), 'الموقع:', _gv('dpr-loc', '—'), 'مراقب: ' + _gv('dpr-sc')],
      [],
      ['══ العمالة ══', '', '', '', ''],
      ['الوصف', 'العدد', 'ساعات العمل', 'إجمالي الساعات', '']
    ];
    manpowerRows.forEach(function(r) {
      allRows.push([r[0] || '', r[1] || '', r[2] || '', (parseInt(r[1]) || 0) * (parseInt(r[2]) || 8), '']);
    });
    allRows.push(['', '', 'إجمالي الساعات:', totalManpower, '']);
    allRows.push([]);
    allRows.push(['══ المعدات ══', '', '', '', '']);
    allRows.push(['المعدة', 'العدد', 'ساعات التشغيل', 'الحالة', '']);
    equipmentRows.forEach(function(r) {
      allRows.push([r[0] || '', r[1] || '', r[2] || '', r[3] || '', '']);
    });
    allRows.push([]);
    allRows.push(['══ تقدم الإنجاز ══', '', '', '', '']);
    allRows.push(['النشاط', 'الكمية', 'الوحدة', 'النسبة %', '']);
    progressRows.forEach(function(r) {
      allRows.push([r[0] || '', r[1] || '', r[2] || '', r[3] || '', '']);
    });
    allRows.push([]);
    allRows.push(['ملاحظات / Issues:', _gv('dpr-issues'), '', '', '']);
    allRows.push([]);
    allRows.push(['المرجع:', 'QCS 2024 | QatarSpec Pro | ' + today, '', '', '']);

    const ws1 = X.utils.aoa_to_sheet(allRows);
    ws1['!cols'] = [{ wch: 32 }, { wch: 16 }, { wch: 18 }, { wch: 18 }, { wch: 24 }];
    ws1['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

    const wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, ws1, 'Daily Report');
    X.writeFile(wb, 'DPR-' + (_gv('dpr-date') || Date.now()) + '.xlsx');
    if (w.showToast) w.showToast('✅ تم تصدير التقرير اليومي DPR');
  }

  // ═══════════════════════════════════════════════════
  // تسجيل في namespace
  // ═══════════════════════════════════════════════════
  if (!w.QS) w.QS = {};
  w.QS.exportNCRFull          = exportNCRFull;
  w.QS.exportRFIFull          = exportRFIFull;
  w.QS.exportITPFull          = exportITPFull;
  w.QS.exportDPRFull          = exportDPRFull;
  w.QS.exportTestResultsExcel = exportTestResultsExcel;

  w.exportNCRFull          = exportNCRFull;
  w.exportRFIFull          = exportRFIFull;
  w.exportITPFull          = exportITPFull;
  w.exportDPRFull          = exportDPRFull;
  w.exportTestResultsExcel = exportTestResultsExcel;

})(window);
