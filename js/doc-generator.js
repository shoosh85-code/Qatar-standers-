/**
 * js/doc-generator.js — QatarSpec Pro v1.0
 * Wizard لتوليد المستندات الهندسية تلقائياً بالـ AI
 * Method Statement · ITP · NCR · DPR
 * المرجع: DDC_Skills + api/generate-document.js + QCS 2024
 * لا تحذف محتوى — فقط أضف أو عدّل
 */

(function (w) {
  'use strict';

  // ── تسجيل في namespace QS ────────────────────────────────────────────────
  w.QS = w.QS || {};

  // ── ثوابت ────────────────────────────────────────────────────────────────
  const DOC_TYPES = [
    {
      id: 'method_statement',
      icon: '📋',
      label_ar: 'طريقة التنفيذ',
      label_en: 'Method Statement',
      desc_ar: 'خطة تنفيذ تفصيلية مع مراجع QCS 2024',
      desc_en: 'Detailed execution plan with QCS 2024 references',
      tier: 'pro',
      color: '#8e44ad',
    },
    {
      id: 'itp',
      icon: '✅',
      label_ar: 'خطة الفحص والاختبار (ITP)',
      label_en: 'Inspection & Test Plan (ITP)',
      desc_ar: 'جداول H/W/R/I مع معايير QCS 2024',
      desc_en: 'H/W/R/I tables with QCS 2024 criteria',
      tier: 'pro',
      color: '#27ae60',
    },
    {
      id: 'ncr',
      icon: '⚠️',
      label_ar: 'تقرير عدم المطابقة (NCR)',
      label_en: 'Non-Conformance Report (NCR)',
      desc_ar: 'تحليل السبب الجذري + الإجراء التصحيحي',
      desc_en: 'Root cause analysis + corrective action',
      tier: 'free',
      color: '#e74c3c',
    },
    {
      id: 'dpr',
      icon: '📊',
      label_ar: 'التقرير اليومي (DPR)',
      label_en: 'Daily Progress Report (DPR)',
      desc_ar: 'تقرير التقدم اليومي بتنسيق Ashghal',
      desc_en: 'Daily progress report in Ashghal format',
      tier: 'free',
      color: '#3498db',
    },
  ];

  const WORK_TYPES = {
    method_statement: [
      { id: 'concrete_pour',   label_ar: 'صب الخرسانة',           label_en: 'Concrete Pour' },
      { id: 'asphalt_paving',  label_ar: 'رصف الأسفلت',           label_en: 'Asphalt Paving' },
      { id: 'pipe_laying',     label_ar: 'مد الأنابيب',            label_en: 'Pipe Laying' },
      { id: 'excavation',      label_ar: 'الحفر والردم',           label_en: 'Excavation & Backfill' },
      { id: 'piling',          label_ar: 'الخوازيق',               label_en: 'Bored Piling' },
      { id: 'waterproofing',   label_ar: 'العزل المائي',            label_en: 'Waterproofing' },
    ],
    itp: [
      { id: 'concrete',        label_ar: 'أعمال الخرسانة',         label_en: 'Concrete Works' },
      { id: 'earthworks',      label_ar: 'أعمال الحفر والردم',      label_en: 'Earthworks' },
      { id: 'asphalt',         label_ar: 'أعمال الأسفلت',          label_en: 'Asphalt Works' },
      { id: 'piling',          label_ar: 'الخوازيق',               label_en: 'Piling Works' },
      { id: 'drainage',        label_ar: 'أعمال الصرف الصحي',      label_en: 'Drainage Works' },
      { id: 'utilities',       label_ar: 'شبكات المرافق',           label_en: 'Utility Networks' },
    ],
    ncr: [
      { id: 'concrete_defect', label_ar: 'عيب في الخرسانة',        label_en: 'Concrete Defect' },
      { id: 'rebar_spacing',   label_ar: 'تسليح — مسافة خاطئة',    label_en: 'Rebar Spacing Error' },
      { id: 'compaction_fail', label_ar: 'فشل اختبار الكثافة',      label_en: 'Compaction Failure' },
      { id: 'pipe_joint',      label_ar: 'وصلة أنبوب سيئة',        label_en: 'Pipe Joint Defect' },
      { id: 'asphalt_quality', label_ar: 'جودة الأسفلت',           label_en: 'Asphalt Quality' },
      { id: 'custom',          label_ar: 'مخالفة أخرى (يُحدد يدوياً)', label_en: 'Other NCR (manual)' },
    ],
    dpr: [
      { id: 'general',         label_ar: 'تقرير عام يومي',         label_en: 'General Daily Report' },
    ],
  };

  // ── State ─────────────────────────────────────────────────────────────────
  let _step       = 1;
  let _docType    = null;
  let _workType   = null;
  let _projectData = {};
  let _result     = null;
  let _loading    = false;
  const TOTAL_STEPS = 5;

  // ── CSS (حقنة مرة واحدة) ─────────────────────────────────────────────────
  function _injectCSS() {
    if (document.getElementById('qs-docgen-css')) return;
    const style = document.createElement('style');
    style.id = 'qs-docgen-css';
    style.textContent = `
      /* ── Modal overlay ── */
      #qs-docgen-overlay {
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,.75); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        padding: 16px; animation: qs-fadeIn .2s ease;
      }
      @keyframes qs-fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes qs-slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }

      /* ── Modal panel ── */
      #qs-docgen-panel {
        background: var(--bg2, #1a1a1a);
        border: 1px solid rgba(201,168,76,.25);
        border-radius: 16px;
        width: 100%; max-width: 680px;
        max-height: 90vh;
        display: flex; flex-direction: column;
        animation: qs-slideUp .25s ease;
        font-family: inherit;
      }

      /* ── Header ── */
      #qs-docgen-header {
        display: flex; align-items: center; gap: 10px;
        padding: 16px 20px; border-bottom: 1px solid rgba(201,168,76,.15);
        flex-shrink: 0;
      }
      #qs-docgen-header .dg-title {
        color: var(--gold, #c9a84c); font-size: 15px; font-weight: 700; flex: 1;
      }
      #qs-docgen-close {
        background: none; border: none; color: var(--text3, #888);
        font-size: 20px; cursor: pointer; padding: 4px 8px; border-radius: 6px;
        transition: color .15s;
      }
      #qs-docgen-close:hover { color: var(--text1, #fff); }

      /* ── Progress bar ── */
      .dg-progress {
        padding: 12px 20px; flex-shrink: 0;
        display: flex; align-items: center; gap: 8px;
      }
      .dg-progress-track {
        flex: 1; height: 4px;
        background: rgba(201,168,76,.15); border-radius: 2px;
      }
      .dg-progress-fill {
        height: 100%; background: var(--gold, #c9a84c);
        border-radius: 2px; transition: width .3s ease;
      }
      .dg-progress-label {
        color: var(--text3, #888); font-size: 11px; white-space: nowrap;
      }

      /* ── Body (scrollable) ── */
      #qs-docgen-body {
        padding: 20px; overflow-y: auto; flex: 1;
      }

      /* ── Step heading ── */
      .dg-step-heading {
        color: var(--text1, #fff); font-size: 14px; font-weight: 700;
        margin-bottom: 14px;
      }
      .dg-step-sub {
        color: var(--text3, #888); font-size: 12px; margin-top: -10px;
        margin-bottom: 14px;
      }

      /* ── Doc type grid ── */
      .dg-type-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      }
      @media (max-width: 480px) { .dg-type-grid { grid-template-columns: 1fr; } }
      .dg-type-card {
        padding: 14px; border-radius: 10px; cursor: pointer;
        border: 2px solid rgba(255,255,255,.06);
        background: rgba(255,255,255,.02);
        transition: border-color .2s, background .2s;
        position: relative;
      }
      .dg-type-card:hover { border-color: rgba(201,168,76,.4); }
      .dg-type-card.selected { border-color: var(--gold, #c9a84c); background: rgba(201,168,76,.06); }
      .dg-type-card .dg-tc-icon { font-size: 22px; margin-bottom: 6px; }
      .dg-type-card .dg-tc-name { color: var(--text1, #fff); font-size: 13px; font-weight: 700; }
      .dg-type-card .dg-tc-desc { color: var(--text3, #888); font-size: 11px; margin-top: 4px; line-height: 1.4; }
      .dg-type-card .dg-tc-tier {
        position: absolute; top: 8px; left: 8px;
        font-size: 9px; padding: 2px 6px; border-radius: 4px;
        font-weight: 700;
      }
      .dg-tc-tier.pro { background: rgba(201,168,76,.2); color: var(--gold, #c9a84c); }
      .dg-tc-tier.free { background: rgba(39,174,96,.2); color: #27ae60; }

      /* ── Work type list ── */
      .dg-work-list {
        display: flex; flex-direction: column; gap: 8px;
      }
      .dg-work-item {
        padding: 12px 14px; border-radius: 8px; cursor: pointer;
        border: 1px solid rgba(255,255,255,.06);
        background: rgba(255,255,255,.02);
        color: var(--text2, #ccc); font-size: 13px;
        display: flex; align-items: center; gap: 10px;
        transition: border-color .15s, background .15s;
      }
      .dg-work-item:hover { border-color: rgba(201,168,76,.3); }
      .dg-work-item.selected { border-color: var(--gold, #c9a84c); color: var(--gold, #c9a84c); background: rgba(201,168,76,.04); }
      .dg-work-item .dg-wi-check { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.2); flex-shrink: 0; }
      .dg-work-item.selected .dg-wi-check { background: var(--gold, #c9a84c); border-color: var(--gold, #c9a84c); }

      /* ── Form fields ── */
      .dg-field { margin-bottom: 14px; }
      .dg-label { color: var(--text2, #ccc); font-size: 12px; margin-bottom: 6px; display: block; }
      .dg-input, .dg-textarea, .dg-select {
        width: 100%; padding: 10px 12px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 8px; color: var(--text1, #fff);
        font-size: 13px; font-family: inherit;
        box-sizing: border-box; direction: rtl;
        transition: border-color .15s;
      }
      .dg-input:focus, .dg-textarea:focus, .dg-select:focus {
        outline: none; border-color: var(--gold, #c9a84c);
      }
      .dg-textarea { resize: vertical; min-height: 80px; }
      .dg-select option { background: #1a1a1a; }

      /* ── Loading ── */
      .dg-loading {
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 16px; padding: 40px 20px; text-align: center;
      }
      .dg-spinner {
        width: 48px; height: 48px; border-radius: 50%;
        border: 4px solid rgba(201,168,76,.2);
        border-top-color: var(--gold, #c9a84c);
        animation: qs-spin .8s linear infinite;
      }
      @keyframes qs-spin { to { transform: rotate(360deg); } }
      .dg-loading-title { color: var(--gold, #c9a84c); font-size: 14px; font-weight: 700; }
      .dg-loading-sub   { color: var(--text3, #888); font-size: 12px; }

      /* ── Result content ── */
      .dg-result {
        display: flex; flex-direction: column; gap: 14px;
      }
      .dg-section-block {
        border: 1px solid rgba(201,168,76,.15);
        border-radius: 10px; overflow: hidden;
      }
      .dg-section-title {
        background: rgba(201,168,76,.08);
        padding: 8px 14px;
        color: var(--gold, #c9a84c); font-size: 12px; font-weight: 700;
        display: flex; align-items: center; gap: 8px;
      }
      .dg-section-content {
        padding: 12px 14px;
        color: var(--text2, #ccc); font-size: 12px;
        line-height: 1.7; white-space: pre-wrap;
        min-height: 60px;
      }
      .dg-section-content[contenteditable="true"] {
        outline: none; border: none;
        background: rgba(201,168,76,.02);
      }
      .dg-section-content[contenteditable="true"]:focus {
        background: rgba(201,168,76,.04);
      }

      /* ── Export buttons ── */
      .dg-export-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        margin-top: 16px;
      }
      .dg-export-btn {
        padding: 12px; border-radius: 8px; border: 1px solid;
        cursor: pointer; font-size: 13px; font-weight: 600;
        font-family: inherit; transition: opacity .2s;
        display: flex; align-items: center; justify-content: center; gap: 6px;
      }
      .dg-export-btn:hover { opacity: .8; }
      .dg-export-btn.word {
        background: rgba(52,152,219,.1); border-color: #3498db; color: #3498db;
      }
      .dg-export-btn.pdf {
        background: rgba(231,76,60,.1); border-color: #e74c3c; color: #e74c3c;
      }
      .dg-export-btn.print {
        background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.15); color: var(--text2, #ccc);
      }
      .dg-export-btn.copy {
        background: rgba(201,168,76,.08); border-color: rgba(201,168,76,.3); color: var(--gold, #c9a84c);
      }

      /* ── Footer nav ── */
      #qs-docgen-footer {
        padding: 14px 20px;
        border-top: 1px solid rgba(201,168,76,.1);
        display: flex; justify-content: space-between; align-items: center;
        flex-shrink: 0;
      }
      .dg-btn {
        padding: 9px 18px; border-radius: 8px; font-size: 13px;
        font-weight: 600; font-family: inherit; cursor: pointer;
        border: none; transition: opacity .15s;
      }
      .dg-btn:hover { opacity: .85; }
      .dg-btn-prev {
        background: rgba(255,255,255,.06); color: var(--text2, #ccc);
      }
      .dg-btn-next {
        background: var(--gold, #c9a84c); color: #1a1a1a;
      }
      .dg-btn-next:disabled {
        opacity: .35; cursor: not-allowed;
      }

      /* ── Disclaimer ── */
      .dg-disclaimer {
        background: rgba(231,76,60,.06); border: 1px solid rgba(231,76,60,.2);
        border-radius: 8px; padding: 10px 12px;
        color: #e74c3c; font-size: 11px; line-height: 1.5;
        margin-top: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  // ── Sanitize text (XSS protection) ──────────────────────────────────────
  function _s(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .trim();
  }

  // ── Render HTML بطريقة آمنة ──────────────────────────────────────────────
  function _render(el, html) {
    // المحتوى الذي نضعه هنا منشأ منا (لا من المستخدم) فهو آمن
    // المدخلات من المستخدم تمر عبر _s() قبل الإدراج
    el.innerHTML = html;
  }

  // ── أنشئ/احضر الـ modal ──────────────────────────────────────────────────
  function _getModal() {
    let overlay = document.getElementById('qs-docgen-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'qs-docgen-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div id="qs-docgen-panel">
          <div id="qs-docgen-header">
            <span style="font-size:18px">📄</span>
            <span class="dg-title" data-ar="مولّد المستندات الهندسية" data-en="Engineering Document Generator">
              مولّد المستندات الهندسية
            </span>
            <button id="qs-docgen-close" onclick="QS.closeDocGenerator()" aria-label="إغلاق">✕</button>
          </div>
          <div class="dg-progress">
            <div class="dg-progress-track">
              <div class="dg-progress-fill" id="qs-dg-progress-fill" style="width:20%"></div>
            </div>
            <span class="dg-progress-label" id="qs-dg-progress-label">1 / ${TOTAL_STEPS}</span>
          </div>
          <div id="qs-docgen-body"></div>
          <div id="qs-docgen-footer">
            <button class="dg-btn dg-btn-prev" id="qs-dg-prev" onclick="QS._dgPrev()">→ السابق</button>
            <button class="dg-btn dg-btn-next" id="qs-dg-next" onclick="QS._dgNext()">التالي ←</button>
          </div>
        </div>`;
      // إغلاق بالنقر خارج الـ panel
      overlay.addEventListener('click', e => {
        if (e.target === overlay) w.QS.closeDocGenerator();
      });
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  // ── تحديث progress bar ───────────────────────────────────────────────────
  function _updateProgress() {
    const fill  = document.getElementById('qs-dg-progress-fill');
    const label = document.getElementById('qs-dg-progress-label');
    if (fill)  fill.style.width  = `${(_step / TOTAL_STEPS) * 100}%`;
    if (label) label.textContent = `${_step} / ${TOTAL_STEPS}`;
  }

  // ── STEP 1: اختيار نوع المستند ──────────────────────────────────────────
  function _renderStep1() {
    const body    = document.getElementById('qs-docgen-body');
    const isPro   = w.isProUser ? w.isProUser() : false;

    const cards = DOC_TYPES.map(t => `
      <div class="dg-type-card${_docType === t.id ? ' selected' : ''}"
           onclick="QS._dgSelectType('${t.id}')"
           role="button" tabindex="0"
           style="border-color:${_docType === t.id ? t.color : ''};">
        <span class="dg-tc-tier ${t.tier}">${t.tier === 'pro' ? '⭐ PRO' : '✅ مجاني'}</span>
        <div class="dg-tc-icon">${t.icon}</div>
        <div class="dg-tc-name">${t.label_ar}</div>
        <div class="dg-tc-desc">${t.desc_ar}</div>
      </div>`).join('');

    _render(body, `
      <div class="dg-step-heading">الخطوة 1 — اختر نوع المستند</div>
      <div class="dg-step-sub">اختر المستند الذي تريد توليده تلقائياً بالـ AI</div>
      <div class="dg-type-grid">${cards}</div>
      <div class="dg-disclaimer">
        ⚠️ الإخراج من AI مساعد — تحقق دائماً من QCS 2024 الأصلي قبل الاستخدام الرسمي.
        AI output is advisory — always verify against QCS 2024 original before official use.
      </div>`);

    _updateNavBtns();
  }

  // ── STEP 2: اختيار نوع النشاط ───────────────────────────────────────────
  function _renderStep2() {
    const body  = document.getElementById('qs-docgen-body');
    const types = WORK_TYPES[_docType] || [];

    const items = types.map(wt => `
      <div class="dg-work-item${_workType === wt.id ? ' selected' : ''}"
           onclick="QS._dgSelectWork('${wt.id}')"
           role="button" tabindex="0">
        <div class="dg-wi-check"></div>
        <span>${wt.label_ar} — <span style="color:var(--text3,#888);font-size:11px;">${wt.label_en}</span></span>
      </div>`).join('');

    const docInfo = DOC_TYPES.find(d => d.id === _docType) || {};

    _render(body, `
      <div class="dg-step-heading">${docInfo.icon || '📄'} ${docInfo.label_ar}</div>
      <div class="dg-step-sub">الخطوة 2 — اختر نوع النشاط / العمل</div>
      <div class="dg-work-list">${items}</div>`);

    _updateNavBtns();
  }

  // ── STEP 3: بيانات المشروع ──────────────────────────────────────────────
  function _renderStep3() {
    const body    = document.getElementById('qs-docgen-body');
    const docInfo = DOC_TYPES.find(d => d.id === _docType) || {};
    const pd      = _projectData;

    let extraFields = '';
    if (_docType === 'ncr') {
      extraFields = `
        <div class="dg-field">
          <label class="dg-label">وصف المخالفة (NCR Description) *</label>
          <textarea class="dg-textarea" id="dg-ncr-desc" placeholder="صف المخالفة بوضوح...">${_s(pd.ncr_desc || '')}</textarea>
        </div>
        <div class="dg-field">
          <label class="dg-label">تصنيف المخالفة (NCR Class)</label>
          <select class="dg-select" id="dg-ncr-class">
            <option value="major" ${pd.ncr_class==='major'?'selected':''}>Major — رئيسية</option>
            <option value="minor" ${(pd.ncr_class||'minor')==='minor'?'selected':''}>Minor — ثانوية</option>
            <option value="observation" ${pd.ncr_class==='observation'?'selected':''}>Observation — ملاحظة</option>
          </select>
        </div>
        <div class="dg-field">
          <label class="dg-label">بند QCS 2024 المخالف (مثل: QCS S5 P3 §3.2)</label>
          <input class="dg-input" id="dg-ncr-clause" value="${_s(pd.ncr_clause || '')}" placeholder="مثال: QCS 2024 Part 5, Section 3">
        </div>`;
    } else if (_docType === 'dpr') {
      extraFields = `
        <div class="dg-field">
          <label class="dg-label">تاريخ التقرير</label>
          <input class="dg-input" type="date" id="dg-report-date" value="${pd.report_date || new Date().toISOString().slice(0,10)}">
        </div>
        <div class="dg-field">
          <label class="dg-label">ملخص الأعمال المنجزة اليوم *</label>
          <textarea class="dg-textarea" id="dg-activities" style="min-height:100px" placeholder="صف الأعمال المنجزة اليوم...">${_s(pd.activities_summary || '')}</textarea>
        </div>`;
    } else {
      extraFields = `
        <div class="dg-field">
          <label class="dg-label">معلومات إضافية (اختياري)</label>
          <textarea class="dg-textarea" id="dg-extra" placeholder="أي تفاصيل إضافية للمشروع...">${_s(pd.extra || '')}</textarea>
        </div>`;
    }

    _render(body, `
      <div class="dg-step-heading">${docInfo.icon || '📄'} بيانات المشروع</div>
      <div class="dg-step-sub">الخطوة 3 — أدخل معلومات المشروع</div>
      <div class="dg-field">
        <label class="dg-label">اسم المشروع (Project Name) *</label>
        <input class="dg-input" id="dg-proj-name" value="${_s(pd.project_name || '')}" placeholder="مثال: توسعة طريق سلوى — الطور الثاني">
      </div>
      <div class="dg-field">
        <label class="dg-label">اسم المهندس (Engineer Name) *</label>
        <input class="dg-input" id="dg-eng-name" value="${_s(pd.engineer_name || '')}" placeholder="مثال: م. محمد العمري">
      </div>
      ${extraFields}`);

    _updateNavBtns();
  }

  // ── STEP 4: توليد AI ─────────────────────────────────────────────────────
  async function _renderStep4() {
    const body = document.getElementById('qs-docgen-body');
    const next = document.getElementById('qs-dg-next');
    const prev = document.getElementById('qs-dg-prev');

    _loading = true;
    if (next) next.disabled = true;
    if (prev) prev.disabled = true;

    _render(body, `
      <div class="dg-loading">
        <div class="dg-spinner"></div>
        <div class="dg-loading-title">🤖 Gemini يولّد المستند...</div>
        <div class="dg-loading-sub" id="dg-loading-msg">جاري تحضير المحتوى من QCS 2024</div>
      </div>`);

    // تغيير رسالة التحميل كل ثانيتين
    const msgs = [
      'يقرأ QCS 2024 (18,000+ صفحة)...',
      'يُطبّق معايير Ashghal RDM 2023...',
      'يُضيف Hold Points و Witness Points...',
      'يراجع المراجع الدقيقة...',
      'يُصيّغ المستند النهائي...',
    ];
    let mi = 0;
    const msgEl = document.getElementById('dg-loading-msg');
    const interval = setInterval(() => {
      if (msgEl) msgEl.textContent = msgs[mi++ % msgs.length];
    }, 2000);

    try {
      // جمع المدخلات
      const inputs = { ..._projectData };
      if (_docType === 'ncr') {
        inputs.ncr_desc   = inputs.ncr_desc  || '';
        inputs.ncr_class  = inputs.ncr_class || 'minor';
        inputs.ncr_clause = inputs.ncr_clause || '';
      }
      if (_docType === 'dpr') {
        inputs.report_date       = inputs.report_date || new Date().toISOString().slice(0,10);
        inputs.activities_summary = inputs.activities_summary || '';
      }

      const res = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_type:  _docType,
          work_type:      _workType,
          project_name:   _projectData.project_name,
          engineer_name:  _projectData.engineer_name,
          inputs,
        }),
      });

      clearInterval(interval);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `خطأ ${res.status}`);
      }

      _result = await res.json();
      _loading = false;
      if (prev) prev.disabled = false;
      if (next) next.disabled = false;

      // الانتقال تلقائياً للخطوة 5
      _step = 5;
      _renderStep5();

    } catch (err) {
      clearInterval(interval);
      _loading = false;
      if (prev) prev.disabled = false;

      _render(body, `
        <div class="dg-loading">
          <div style="font-size:40px">❌</div>
          <div class="dg-loading-title" style="color:#e74c3c">فشل التوليد</div>
          <div class="dg-loading-sub">${_s(err.message)}</div>
          <button class="dg-btn dg-btn-next" onclick="QS._dgRetryGenerate()" style="margin-top:8px">🔄 أعد المحاولة</button>
        </div>`);
    }
  }

  // ── STEP 5: مراجعة + تصدير ──────────────────────────────────────────────
  function _renderStep5() {
    const body    = document.getElementById('qs-docgen-body');
    const docInfo = DOC_TYPES.find(d => d.id === _docType) || {};

    if (!_result) {
      _render(body, '<div style="color:var(--text3);text-align:center;padding:30px">لا توجد نتائج</div>');
      return;
    }

    // بناء أقسام المستند حسب نوعه
    let sections = [];

    if (_docType === 'method_statement' && _result.sections) {
      const sectionLabels = {
        scope:       { ar: '📌 نطاق العمل', en: 'Scope of Work' },
        references:  { ar: '📚 المراجع', en: 'References' },
        materials:   { ar: '🧱 المواد', en: 'Materials' },
        equipment:   { ar: '🚜 المعدات', en: 'Equipment' },
        procedure:   { ar: '🔧 إجراءات التنفيذ', en: 'Procedure' },
        safety:      { ar: '⛑️ السلامة', en: 'Safety' },
        quality:     { ar: '✅ ضبط الجودة', en: 'Quality Control' },
        testing:     { ar: '🧪 الاختبارات', en: 'Testing' },
        hold_points: { ar: '🚦 نقاط التوقف', en: 'Hold Points' },
        drawings:    { ar: '📐 الرسومات', en: 'Drawings' },
      };
      Object.entries(_result.sections).forEach(([k, v]) => {
        if (v) sections.push({ id: k, label: (sectionLabels[k]?.ar || k), content: v });
      });

    } else if (_docType === 'ncr' && _result.ai_sections) {
      const labels = {
        root_cause:  '🔍 السبب الجذري',
        corrective:  '🔧 الإجراء التصحيحي',
        preventive:  '🛡️ الإجراء الوقائي',
        qcs_ref:     '📚 بنود QCS 2024 ذات الصلة',
      };
      Object.entries(_result.ai_sections).forEach(([k, v]) => {
        if (v) sections.push({ id: k, label: labels[k] || k, content: v });
      });

    } else if (_docType === 'itp' && _result.itp_table) {
      sections.push({ id: 'itp_table', label: '📋 جدول ITP', content: _result.itp_table });

    } else if (_docType === 'dpr' && _result.dpr_sections) {
      const labels = {
        activities_narrative: '📊 الأعمال المنجزة',
        issues_analysis:      '⚠️ المشاكل والحلول',
        next_day_plan:        '📅 خطة الغد',
      };
      Object.entries(_result.dpr_sections).forEach(([k, v]) => {
        if (v) sections.push({ id: k, label: labels[k] || k, content: v });
      });
    }

    const sectionBlocks = sections.map(sec => `
      <div class="dg-section-block" id="dg-block-${_s(sec.id)}">
        <div class="dg-section-title">
          ${sec.label}
          <span style="margin-right:auto;font-size:10px;color:var(--text3);font-weight:400">✏️ قابل للتعديل</span>
        </div>
        <div class="dg-section-content" contenteditable="true"
             id="dg-content-${_s(sec.id)}"
             data-id="${_s(sec.id)}">${_s(sec.content)}</div>
      </div>`).join('');

    // معلومات الرأس
    const qcsRef = _result.qcs_reference || 'QCS 2024';
    const wLabel = _result.work_label_ar || _workType || '';
    const pName  = _s(_result.project_name || _projectData.project_name || '');
    const eName  = _s(_result.engineer_name || _projectData.engineer_name || '');

    _render(body, `
      <div class="dg-step-heading">${docInfo.icon} ${docInfo.label_ar} — مكتمل ✅</div>

      <!-- بطاقة الملخص -->
      <div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.2);border-radius:10px;padding:12px;margin-bottom:14px;font-size:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;color:var(--text2);">
          <div>📁 <strong>المشروع:</strong> ${pName}</div>
          <div>👷 <strong>المهندس:</strong> ${eName}</div>
          <div>📖 <strong>المرجع:</strong> ${_s(qcsRef)}</div>
          <div>📅 <strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar-QA')}</div>
        </div>
      </div>

      <div class="dg-result">${sectionBlocks}</div>

      <!-- أزرار التصدير -->
      <div class="dg-export-grid">
        <button class="dg-export-btn word" onclick="QS._dgExportWord()">📝 تصدير Word</button>
        <button class="dg-export-btn pdf"  onclick="QS._dgExportPDF()">📄 تصدير PDF</button>
        <button class="dg-export-btn print" onclick="window.print()">🖨️ طباعة</button>
        <button class="dg-export-btn copy" onclick="QS._dgCopyText()">📋 نسخ النص</button>
      </div>

      <div class="dg-disclaimer">
        ⚠️ هذا المستند مولّد بالـ AI — راجع QCS 2024 و Ashghal المعتمدين قبل الاستخدام الرسمي.
        This document is AI-generated — verify against approved QCS 2024 and Ashghal standards.
      </div>`);

    // تحديث زر التالي
    const next = document.getElementById('qs-dg-next');
    if (next) { next.textContent = '🔄 مستند جديد'; next.disabled = false; }
    const prev = document.getElementById('qs-dg-prev');
    if (prev) prev.disabled = false;

    _updateProgress();
  }

  // ── جمع بيانات الخطوة 3 وحفظها ─────────────────────────────────────────
  function _collectStep3() {
    const v = id => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    _projectData.project_name = v('dg-proj-name');
    _projectData.engineer_name = v('dg-eng-name');
    // NCR
    _projectData.ncr_desc   = v('dg-ncr-desc');
    _projectData.ncr_class  = v('dg-ncr-class') || 'minor';
    _projectData.ncr_clause = v('dg-ncr-clause');
    // DPR
    _projectData.report_date       = v('dg-report-date');
    _projectData.activities_summary = v('dg-activities');
    // Extra
    _projectData.extra = v('dg-extra');
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  function _updateNavBtns() {
    const prev = document.getElementById('qs-dg-prev');
    const next = document.getElementById('qs-dg-next');
    if (!prev || !next) return;

    prev.style.visibility = _step === 1 ? 'hidden' : 'visible';
    next.textContent = _step === TOTAL_STEPS ? '🔄 مستند جديد' : 'التالي ←';
    next.disabled = false;
  }

  // ── Public: السابق ────────────────────────────────────────────────────────
  w.QS._dgPrev = function () {
    if (_step === 1 || _loading) return;
    _step--;
    _renderCurrentStep();
  };

  // ── Public: التالي ────────────────────────────────────────────────────────
  w.QS._dgNext = async function () {
    if (_loading) return;

    // تحقق من صحة المدخلات
    if (_step === 1 && !_docType) {
      if (w.showToast) w.showToast('⚠️ اختر نوع المستند أولاً', 'warning');
      return;
    }
    if (_step === 2 && !_workType) {
      if (w.showToast) w.showToast('⚠️ اختر نوع النشاط أولاً', 'warning');
      return;
    }
    if (_step === 3) {
      _collectStep3();
      if (!_projectData.project_name) {
        if (w.showToast) w.showToast('⚠️ أدخل اسم المشروع', 'warning');
        document.getElementById('dg-proj-name')?.focus();
        return;
      }
      if (!_projectData.engineer_name) {
        if (w.showToast) w.showToast('⚠️ أدخل اسم المهندس', 'warning');
        document.getElementById('dg-eng-name')?.focus();
        return;
      }
      if (_docType === 'ncr' && !_projectData.ncr_desc) {
        if (w.showToast) w.showToast('⚠️ أدخل وصف المخالفة', 'warning');
        document.getElementById('dg-ncr-desc')?.focus();
        return;
      }
    }

    // في الخطوة الأخيرة → مستند جديد
    if (_step === TOTAL_STEPS) {
      _resetState();
      _step = 1;
      _renderStep1();
      return;
    }

    _step++;
    await _renderCurrentStep();
  };

  // ── Public: اختيار نوع المستند ──────────────────────────────────────────
  w.QS._dgSelectType = function (typeId) {
    // فحص Pro
    const t = DOC_TYPES.find(d => d.id === typeId);
    if (t?.tier === 'pro' && !(w.isProUser ? w.isProUser() : false)) {
      if (w.showUpgradePrompt) {
        w.showUpgradePrompt('doc_generator', t.icon, 'مستند PRO', `مولّد ${t.label_ar} متاح لمشتركي Pro فقط.`);
        return;
      }
    }
    _docType  = typeId;
    _workType = null; // إعادة تعيين
    _renderStep1();
  };

  // ── Public: اختيار نوع النشاط ───────────────────────────────────────────
  w.QS._dgSelectWork = function (workId) {
    _workType = workId;
    _renderStep2();
  };

  // ── Public: إعادة المحاولة ──────────────────────────────────────────────
  w.QS._dgRetryGenerate = async function () {
    _step = 4;
    await _renderStep4();
  };

  // ── Render الخطوة الحالية ────────────────────────────────────────────────
  async function _renderCurrentStep() {
    _updateProgress();
    switch (_step) {
      case 1: _renderStep1(); break;
      case 2: _renderStep2(); break;
      case 3: _renderStep3(); break;
      case 4: await _renderStep4(); break;
      case 5: _renderStep5(); break;
    }
  }

  // ── Reset State ──────────────────────────────────────────────────────────
  function _resetState() {
    _docType     = null;
    _workType    = null;
    _projectData = {};
    _result      = null;
    _loading     = false;
  }

  // ── Export: جمع المحتوى المحرر ──────────────────────────────────────────
  function _collectEditedContent() {
    const out = {};
    document.querySelectorAll('[id^="dg-content-"]').forEach(el => {
      const secId = el.getAttribute('data-id');
      if (secId) out[secId] = el.innerText || el.textContent || '';
    });
    return out;
  }

  // ── Export Word ───────────────────────────────────────────────────────────
  w.QS._dgExportWord = function () {
    const content = _collectEditedContent();
    const docInfo = DOC_TYPES.find(d => d.id === _docType) || {};
    const title   = `${docInfo.label_ar} — ${_projectData.project_name || ''}`;

    // استخدم QS.exportToWordPro إذا متاح، وإلا fallback HTML
    if (w.QS.exportToWordPro) {
      const sections = Object.entries(content).map(([k, v]) => ({ title: k, content: v }));
      w.QS.exportToWordPro({
        title,
        engineer: _projectData.engineer_name || '',
        project:  _projectData.project_name || '',
        date:     new Date().toLocaleDateString('ar-QA'),
        reference: _result?.qcs_reference || 'QCS 2024',
        sections,
      });
    } else {
      // Fallback: HTML Blob
      const html = `<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>${title}</title>
        <style>body{font-family:Arial;direction:rtl}h2{color:#7A1515}h3{color:#C9A84C}</style></head><body>
        <h1>${title}</h1>
        <p>المهندس: ${_projectData.engineer_name || ''} | التاريخ: ${new Date().toLocaleDateString('ar-QA')}</p>
        <p>المرجع: ${_result?.qcs_reference || 'QCS 2024'}</p>
        ${Object.entries(content).map(([k, v]) => `<h3>${k}</h3><pre>${v}</pre>`).join('')}
        </body></html>`;
      const blob = new Blob([html], { type: 'application/msword' });
      const a    = document.createElement('a');
      a.href     = URL.createObjectURL(blob);
      a.download = `${_docType}-${Date.now()}.doc`;
      a.click();
    }
    if (w.showToast) w.showToast('✅ جاري تصدير Word...', 'success');
  };

  // ── Export PDF ────────────────────────────────────────────────────────────
  w.QS._dgExportPDF = function () {
    const content = _collectEditedContent();
    const docInfo = DOC_TYPES.find(d => d.id === _docType) || {};

    if (w.QS.exportToServer) {
      // server-side PDF عبر /api/export-pdf
      w.QS.exportToServer({
        title:    `${docInfo.label_ar} — ${_projectData.project_name || ''}`,
        engineer: _projectData.engineer_name || '',
        project:  _projectData.project_name || '',
        date:     new Date().toLocaleDateString('ar-QA'),
        reference: _result?.qcs_reference || 'QCS 2024',
        content:  Object.entries(content).map(([k, v]) => `## ${k}\n${v}`).join('\n\n'),
        type:     _docType,
      });
    } else {
      window.print();
    }
    if (w.showToast) w.showToast('✅ جاري تصدير PDF...', 'success');
  };

  // ── Copy Text ─────────────────────────────────────────────────────────────
  w.QS._dgCopyText = function () {
    const content = _collectEditedContent();
    const text = Object.entries(content)
      .map(([k, v]) => `=== ${k} ===\n${v}`)
      .join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      if (w.showToast) w.showToast('✅ تم نسخ النص', 'success');
    });
  };

  // ── Public: فتح الـ Wizard ──────────────────────────────────────────────
  w.QS.openDocGenerator = function () {
    _injectCSS();
    _resetState();
    _step = 1;
    const overlay = _getModal();
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    _renderStep1();
    _updateProgress();
  };

  // ── Public: إغلاق الـ Wizard ────────────────────────────────────────────
  w.QS.closeDocGenerator = function () {
    const overlay = document.getElementById('qs-docgen-overlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  // ── Keyboard: ESC للإغلاق ──────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') w.QS.closeDocGenerator();
  });

})(window);
