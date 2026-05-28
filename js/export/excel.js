/**
 * QatarSpec Pro — Excel Export Module
 * المرحلة 7 | تصدير Excel بمعايير Ashghal الرسمية
 * QCS 2024 | Ashghal RDM 2023 | ISO 9001
 */

(function(w) {
  'use strict';

  // ═══════════════════════════════════════════════════
  // CSV Export — يعمل offline بدون مكتبات خارجية
  // امتداد .csv — يفتح مباشرة في Excel بدون أخطاء
  // ═══════════════════════════════════════════════════

  // تحويل مصفوفة صفوف إلى نص CSV
  function _toCSV(rows) {
    return rows.map(function(row) {
      if (!row || !row.length) return '';
      return row.map(function(cell) {
        const val = (cell === undefined || cell === null) ? '' : String(cell);
        if (val.indexOf(',') !== -1 || val.indexOf('"') !== -1 || val.indexOf('\n') !== -1) {
          return '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      }).join(',');
    }).join('\r\n');
  }

  // تحميل ملف .csv مع BOM للعربية في Excel
  function _downloadCSV(rows, filename) {
    const csv  = _toCSV(rows);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename.replace(/\.xlsx?$/, '.csv');
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      URL.revokeObjectURL(url);
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 1500);
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
    const trAllRows = allRows;
    if (colWidths) ws['!cols'] = colWidths;
    return ws;
  }

  // ═══════════════════════════════════════════════════
  // تصدير NCR متقدم (Ashghal Format)
  // ═══════════════════════════════════════════════════
  function exportNCRFull() {

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

    // ورقة NCR Form

    // ── Sheet 2: NCR Register ──
    const ws2Rows = [
      ['\uFEFFNCR Register — سجل عدم المطابقة', '', '', '', '', ''],
      ['QatarSpec Pro | QCS 2024 | ' + today, '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['NCR No.', 'التصنيف', 'الموقع', 'QCS Clause', 'الحالة', 'Target Close'],
      [_gv('ncr-num'), ncrClass, _gv('ncr-loc'), _gv('ncr-clause'), ncrStatus, _gv('ncr-target')]
    ];


    // ── Sheet 3: Action Tracker ──
    const ws3Rows = [
      ['\uFEFFCorrectiveAction Tracker — متابعة الإجراءات', '', '', '', ''],
      ['NCR No.', 'Corrective Action', 'Responsible', 'Due Date', 'Status'],
      [_gv('ncr-num'), _gv('ncr-corrective'), _gv('ncr-qc-eng'), _gv('ncr-target'), ncrStatus],
      ['', '', '', '', ''],
      ['NCR No.', 'Preventive Action', 'Responsible', 'Due Date', 'Status'],
      [_gv('ncr-num'), _gv('ncr-preventive'), _gv('ncr-qc-eng'), _gv('ncr-target'), ncrStatus]
    ];


    // دمج الأوراق الثلاث في .csv واحد
    const allNCR = ncrRows
      .concat([[],[' NCR Register ===','']])
      .concat(ws2Rows)
      .concat([[],[' Action Tracker ===','']])
      .concat(ws3Rows);
    _downloadCSV(allNCR, 'NCR-' + (_gv('ncr-num') || '001') + '-' + Date.now() + '.csv');
    if (w.showToast) w.showToast('✅ تم تصدير NCR — CSV يفتح في Excel');
  }

  // ═══════════════════════════════════════════════════
  // تصدير RFI متقدم
  // ═══════════════════════════════════════════════════
  function exportRFIFull() {

    const today = new Date().toLocaleDateString('ar-QA');
    const wsRFIRows = [
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
    ];


    _downloadCSV(wsRFIRows, 'RFI-' + (_gv('rfi-num') || '001') + '-' + Date.now() + '.csv');
    if (w.showToast) w.showToast('✅ تم تصدير RFI — CSV يفتح في Excel');
  }

  // ═══════════════════════════════════════════════════
  // تصدير Test Results (نتائج الحاسبة)
  // ═══════════════════════════════════════════════════
  function exportTestResultsExcel(opts) {
    opts = opts || {};

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

    const tr1Rows = headerRows.concat(dataRows);

    // ── Sheet 2: ملخص إحصائي ──
    const tr2Rows = [
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
    ];


    const fname = 'TestResults-' + (opts.title || 'QatarSpec').replace(/\s+/g, '-').substring(0, 20);
    const allTR = tr1Rows.concat([[], ['=== Summary ===']]).concat(tr2Rows);
    _downloadCSV(allTR, fname + '-' + Date.now() + '.csv');
    if (w.showToast) w.showToast('✅ تم تصدير نتائج الاختبارات — CSV يفتح في Excel');
  }

  // ═══════════════════════════════════════════════════
  // تصدير ITP متقدم — 4 أوراق (Main, Hold, Witness, Summary)
  // ═══════════════════════════════════════════════════
  function exportITPFull() {

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
    const itp1Rows = [
      ['QatarSpec Pro — Inspection & Test Plan (ITP)', '', '', '', '', '', '', '', '', ''],
      ['المشروع:', projectName, '', '', 'رقم ITP:', itpNum, '', '', '', ''],
      ['التاريخ:', itpDate,     '', '', 'المهندس:', engineer, '', '', '', ''],
      ['المرجع:', 'QCS 2024',  '', '', 'تاريخ الطباعة:', today, '', '', '', ''],
      [],
      ['م', 'النشاط / Activity', 'مرجع QCS', 'معيار القبول', 'التكرار', 'طريقة الاختبار', 'Lab', 'QC', 'SC', 'النقطة']
    ].concat(rows);



    // ── Sheet 2: Hold Points ──
    const itp2Rows = [
      ['Hold Points — نقاط الإيقاف الإلزامية', '', '', ''],
      ['المشروع:', projectName, 'ITP No:', itpNum],
      [],
      ['م', 'النشاط / Activity', 'معيار القبول', 'النوع']
    ].concat(hp_rows.map(function(r) {
      return [r[0] || '', r[1] || '', r[3] || '', 'H — Hold'];
    }));


    // ── Sheet 3: Witness Points ──
    const itp3Rows = [
      ['Witness Points — نقاط الشهود', '', '', ''],
      ['المشروع:', projectName, 'ITP No:', itpNum],
      [],
      ['م', 'النشاط / Activity', 'معيار القبول', 'النوع']
    ].concat(wp_rows.map(function(r) {
      return [r[0] || '', r[1] || '', r[3] || '', 'W — Witness'];
    }));


    // ── Sheet 4: Summary ──
    const reviewCount = rows.length - hp_rows.length - wp_rows.length;
    const itp4Rows = [
      ['ITP Statistics — إحصائيات خطة الفحص', ''],
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
    ];


    const allITP = itp1Rows
      .concat([[], ['=== Hold Points ===']])
      .concat(itp2Rows)
      .concat([[], ['=== Witness Points ===']])
      .concat(itp3Rows)
      .concat([[], ['=== Summary ===']])
      .concat(itp4Rows);
    _downloadCSV(allITP, 'ITP-' + (itpNum || 'Export') + '-' + Date.now() + '.csv');
    if (w.showToast) w.showToast('✅ تم تصدير ITP — CSV يفتح في Excel');
  }

  // ═══════════════════════════════════════════════════
  // تصدير التقرير اليومي DPR
  // ═══════════════════════════════════════════════════
  function exportDPRFull() {

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

    const dpr1Rows = allRows;


    _downloadCSV(dpr1Rows, 'DPR-' + (_gv('dpr-date') || Date.now()) + '.csv');
    if (w.showToast) w.showToast('✅ تم تصدير DPR — CSV يفتح في Excel');
  }

  // ═══════════════════════════════════════════════════
  // QCS Compliance Export — من محلل المخططات
  // يستقبل نتائج QCSCompliance.checkAll() ويصدّرها
  // ═══════════════════════════════════════════════════
  function exportQCSCompliance(complianceResults, projectInfo) {
    if (!complianceResults || !complianceResults.length) {
      if (w.showToast) w.showToast('⚠️ لا توجد نتائج للتصدير');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const proj  = projectInfo || {};
    const projName = proj.name || 'مشروع QatarSpec';
    const engineer = proj.engineer || '';

    const rows = [];

    // ── رأس التقرير ──────────────────────────────────
    rows.push(['تقرير فحص مطابقة QCS 2024', '', '', '', '', '', '']);
    rows.push(['المشروع:', projName, '', 'المهندس:', engineer, '', '']);
    rows.push(['التاريخ:', today, '', 'المرجع:', 'QCS 2024 | QatarSpec Pro', '', '']);
    rows.push([]);

    // ── إحصاء النتائج ────────────────────────────────
    const pass    = complianceResults.filter(function(r) { return r.status === 'pass'; }).length;
    const fail    = complianceResults.filter(function(r) { return r.status === 'fail'; }).length;
    const warning = complianceResults.filter(function(r) { return r.status === 'warning'; }).length;
    const na      = complianceResults.filter(function(r) { return r.status === 'not_applicable'; }).length;
    const total   = complianceResults.length;
    const score   = total > 0 ? Math.round((pass / (total - na)) * 100) : 0;

    rows.push(['ملخص النتائج', '', '', '', '', '', '']);
    rows.push(['إجمالي البنود', 'ناجح ✅', 'فاشل ❌', 'تحذير ⚠️', 'لا ينطبق', 'نسبة المطابقة', '']);
    rows.push([total, pass, fail, warning, na, score + '%', '']);
    rows.push([]);

    // ── رأس الجدول ───────────────────────────────────
    rows.push([
      'رقم',
      'البند',
      'الفئة',
      'مرجع QCS',
      'القيمة المقاسة',
      'الحد المطلوب',
      'الوحدة',
      'الأهمية',
      'النتيجة'
    ]);

    // ── الفئات مرتبة ─────────────────────────────────
    const categories = ['structural', 'architectural', 'mep', 'infrastructure', ''];
    const catLabels  = {
      structural:     'إنشائي',
      architectural:  'معماري',
      mep:            'MEP',
      infrastructure: 'طرق ومرافق',
      '':             'عام'
    };

    let rowNum = 1;
    categories.forEach(function(cat) {
      const catResults = complianceResults.filter(function(r) {
        return (r.category || '') === cat;
      });
      if (!catResults.length) return;

      rows.push([]);
      rows.push(['══ ' + catLabels[cat] + ' ══', '', '', '', '', '', '', '', '']);

      catResults.forEach(function(r) {
        const statusLabel = {
          pass:           'ناجح ✅',
          fail:           'فاشل ❌',
          warning:        'تحذير ⚠️',
          not_applicable: 'لا ينطبق —'
        }[r.status] || r.status;

        const sevLabel = {
          major:  'رئيسي',
          minor:  'ثانوي',
          info:   'معلومة'
        }[r.severity] || (r.severity || '');

        const measured = (r.measured !== undefined && r.measured !== null)
          ? String(r.measured) : '—';
        const required = r.required_min !== undefined
          ? ('≥ ' + r.required_min)
          : (r.required_max !== undefined ? ('≤ ' + r.required_max) : '—');

        rows.push([
          rowNum++,
          r.name_ar || r.name || r.item || '',
          catLabels[cat],
          r.clause || '',
          measured,
          required,
          r.unit || '',
          sevLabel,
          statusLabel
        ]);
      });
    });

    rows.push([]);

    // ── البنود الفاشلة فقط (ورقة ثانية مدمجة) ───────
    const failedItems = complianceResults.filter(function(r) { return r.status === 'fail'; });
    if (failedItems.length) {
      rows.push(['══ البنود الفاشلة — تحتاج معالجة فورية ══', '', '', '', '', '', '', '', '']);
      rows.push(['البند', 'مرجع QCS', 'القيمة المقاسة', 'الحد المطلوب', 'الوحدة', 'التوصية', '', '', '']);
      failedItems.forEach(function(r) {
        rows.push([
          r.name_ar || r.name || r.item || '',
          r.clause || '',
          (r.measured !== undefined ? r.measured : '—'),
          (r.required_min !== undefined ? '≥ ' + r.required_min : (r.required_max !== undefined ? '≤ ' + r.required_max : '—')),
          r.unit || '',
          r.recommendation || 'راجع ' + (r.clause || 'QCS 2024'),
          '', '', ''
        ]);
      });
      rows.push([]);
    }

    rows.push(['المرجع:', 'QCS 2024 | QatarSpec Pro | qatar-standers.vercel.app', '', '', '', '', '', '', '']);

    _downloadCSV(rows, 'QCS-Compliance-' + projName.replace(/\s+/g, '-') + '-' + today + '.csv');
    if (w.showToast) w.showToast('✅ تم تصدير نتائج QCS — CSV يفتح في Excel');
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
  w.QS.exportQCSCompliance    = exportQCSCompliance;

  w.exportNCRFull          = exportNCRFull;
  w.exportRFIFull          = exportRFIFull;
  w.exportITPFull          = exportITPFull;
  w.exportDPRFull          = exportDPRFull;
  w.exportTestResultsExcel = exportTestResultsExcel;
  w.exportQCSCompliance    = exportQCSCompliance;

})(window);
