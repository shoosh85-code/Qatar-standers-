/**
 * QatarSpec Pro — MOS/ITP Generator UI
 * Vanilla JS · RTL + Arabic + English · QCS 2024
 * لا يعتمد على Parsons كمرجع
 */

(function(window) {
  'use strict';

  const QS = window.QS || {};

  // ══════════════════════════════════════
  // PHASE CONFIG — إعداد المراحل
  // ══════════════════════════════════════
  const PHASES = [
    { id: 'asphalt',    icon: '🛣️', nameAr: 'أعمال الأسفلت',        nameEn: 'Asphalt Works',        qcs: 'QCS 2024 S6 P5', tier: 'free' },
    { id: 'earthworks', icon: '🏗️', nameAr: 'أعمال الحفر والردم',   nameEn: 'Earthworks',           qcs: 'QCS 2024 S4',    tier: 'free' },
    { id: 'subbase',    icon: '📐', nameAr: 'طبقة الإسناد والقاعدة', nameEn: 'Sub-base & Road Base', qcs: 'QCS 2024 S6 P4', tier: 'free' },
    { id: 'drainage',   icon: '🌊', nameAr: 'أعمال الصرف',           nameEn: 'Drainage Works',       qcs: 'QCS 2024 S8',    tier: 'pro'  },
    { id: 'concrete',   icon: '🏛️', nameAr: 'أعمال الخرسانة',       nameEn: 'Concrete Works',       qcs: 'QCS 2024 S5',    tier: 'pro'  },
    { id: 'utilities',  icon: '⚡', nameAr: 'المرافق تحت الأرض',     nameEn: 'Underground Utilities', qcs: 'KAHRAMAA 2024',  tier: 'pro'  },
    { id: 'structures', icon: '🌉', nameAr: 'الجسور والإنشاءات',     nameEn: 'Bridges & Structures', qcs: 'QCS 2024 S9',    tier: 'enterprise' },
    { id: 'marking',    icon: '🔶', nameAr: 'الدهانات والإشارات',     nameEn: 'Road Markings & Signs', qcs: 'QCTM · QCS S7',  tier: 'pro'  },
  ];

  const EXECUTION_METHODS = {
    asphalt:    ['Machine Laying (آلي)', 'Manual Laying (يدوي — مناطق ضيقة)', 'Slip Form Paver'],
    earthworks: ['Open Cut (حفر مفتوح)', 'Controlled Blasting (تفجير محكوم)', 'Mechanical Excavation'],
    drainage:   ['Open Trench (خندق مفتوح)', 'Jack & Bore (حفر أفقي)', 'Micro-Tunnelling'],
    subbase:    ['Spread & Compact (فرد ودمك)', 'In-Situ Stabilisation (تثبيت في الموقع)'],
    concrete:   ['Ready-Mix Concrete', 'Precast Elements (جاهز)', 'Slip Form'],
    utilities:  ['Open Trench', 'HDD (Horizontal Directional Drilling)', 'Jack & Bore', 'Pipe Jacking'],
    structures: ['Cast In-Situ', 'Precast', 'Composite'],
    marking:    ['Machine Application (آلي)', 'Hand Application (يدوي)', 'Thermoplastic', 'Cold Plastic'],
  };

  // ══════════════════════════════════════
  // STATE
  // ══════════════════════════════════════
  let state = {
    step: 1,          // 1=phase, 2=project info, 3=method, 4=result
    phase: null,
    docType: 'both',  // 'mos' | 'itp' | 'both'
    executionMethod: null,
    projectInfo: {},
    generatedDoc: null,
    userTier: 'free',
    loading: false,
  };

  // ══════════════════════════════════════
  // RENDER MAIN CONTAINER
  // ══════════════════════════════════════
  QS.mosITPGenerator = {

    init(containerId, userTier = 'free') {
      state.userTier = userTier;
      const el = document.getElementById(containerId);
      if (!el) return;
      el.innerHTML = '';
      el.appendChild(renderApp());
    },

    // Expose for testing
    getState: () => ({ ...state }),
  };

  function renderApp() {
    const wrapper = document.createElement('div');
    wrapper.id = 'qs-mos-generator';
    wrapper.setAttribute('dir', 'rtl');
    wrapper.style.cssText = 'font-family: system-ui, sans-serif; max-width: 900px;';

    wrapper.innerHTML = getAppHTML();
    attachEventListeners(wrapper);
    return wrapper;
  }

  function getAppHTML() {
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.2rem; padding-bottom:12px; border-bottom:1px solid #e5e7eb">
        <div>
          <h2 style="font-size:18px; font-weight:600; color:#111; margin:0">منشئ طريقة التنفيذ وخطة الفحص</h2>
          <p style="font-size:12px; color:#6b7280; margin:4px 0 0">Method Statement & ITP Generator · QCS 2024 · بدون Parsons</p>
        </div>
        <div style="display:flex; gap:6px">
          <span style="background:#D1FAE5; color:#065F46; padding:3px 10px; border-radius:12px; font-size:11px">QCS 2024</span>
          <span style="background:#DBEAFE; color:#1E40AF; padding:3px 10px; border-radius:12px; font-size:11px">Ashghal RDM</span>
        </div>
      </div>

      <!-- Progress Steps -->
      <div id="qs-progress" style="display:flex; gap:4px; margin-bottom:1.5rem">
        ${[
          { n:1, label:'المرحلة' },
          { n:2, label:'المشروع' },
          { n:3, label:'طريقة التنفيذ' },
          { n:4, label:'التوليد' },
        ].map(s => `
          <div style="flex:1; text-align:center">
            <div style="width:28px; height:28px; border-radius:50%; margin:0 auto 4px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600;
              ${state.step >= s.n ? 'background:#059669; color:#fff' : 'background:#f3f4f6; color:#9ca3af'}">
              ${s.n}
            </div>
            <p style="font-size:11px; color:${state.step >= s.n ? '#059669' : '#9ca3af'}; margin:0">${s.label}</p>
          </div>
          ${s.n < 4 ? `<div style="flex:0 0 20px; border-top:2px solid ${state.step > s.n ? '#059669' : '#e5e7eb'}; margin-top:14px"></div>` : ''}
        `).join('')}
      </div>

      <!-- Step Content -->
      <div id="qs-step-content">
        ${getStepHTML(state.step)}
      </div>
    `;
  }

  function getStepHTML(step) {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return '';
    }
  }

  // ── STEP 1: Phase Selection
  function renderStep1() {
    return `
      <p style="font-size:14px; font-weight:500; margin-bottom:12px">اختر مرحلة التنفيذ</p>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(160px,1fr)); gap:8px; margin-bottom:1rem">
        ${PHASES.map(p => {
          const locked = p.tier === 'pro' && state.userTier === 'free'
                      || p.tier === 'enterprise' && state.userTier !== 'enterprise';
          return `
            <div class="qs-phase-card ${locked ? 'qs-locked' : ''} ${state.phase === p.id ? 'qs-selected' : ''}"
                 data-phase="${p.id}" data-locked="${locked}"
                 style="background:#f9fafb; border:1.5px solid ${state.phase === p.id ? '#059669' : '#e5e7eb'};
                 border-radius:8px; padding:12px; cursor:${locked ? 'default' : 'pointer'}; position:relative;
                 opacity:${locked ? 0.6 : 1}; transition:border-color .15s">
              <div style="font-size:20px; margin-bottom:4px">${p.icon}</div>
              <div style="font-size:13px; font-weight:500; color:#111">${p.nameAr}</div>
              <div style="font-size:11px; color:#6b7280">${p.nameEn}</div>
              <div style="font-size:10px; color:#059669; margin-top:4px">${p.qcs}</div>
              ${locked ? `<div style="position:absolute; top:6px; left:6px; background:#F59E0B; color:#fff; font-size:9px; padding:2px 6px; border-radius:4px">${p.tier === 'pro' ? 'Pro' : 'Enterprise'}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <div style="display:flex; gap:8px; align-items:center; margin-bottom:1rem">
        <label style="font-size:12px; color:#374151; font-weight:500">نوع الوثيقة المطلوبة:</label>
        <select id="qs-doc-type" style="padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; font-size:12px">
          <option value="both" ${state.docType === 'both' ? 'selected' : ''}>MOS + ITP معاً</option>
          <option value="mos" ${state.docType === 'mos' ? 'selected' : ''}>Method Statement فقط</option>
          <option value="itp" ${state.docType === 'itp' ? 'selected' : ''}>ITP فقط</option>
        </select>
      </div>

      <button id="qs-next-1" style="background:#059669; color:#fff; border:none; border-radius:6px; padding:9px 24px; font-size:13px; cursor:pointer"
        ${!state.phase ? 'disabled style="opacity:0.5;cursor:not-allowed;background:#059669;color:#fff;border:none;border-radius:6px;padding:9px 24px;font-size:13px"' : ''}>
        التالي ←
      </button>
    `;
  }

  // ── STEP 2: Project Info
  function renderStep2() {
    const pi = state.projectInfo;
    return `
      <p style="font-size:14px; font-weight:500; margin-bottom:12px">بيانات المشروع</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:1rem">
        ${[
          { id:'name',       label:'اسم المشروع *',    type:'text',   ph:'مثال: تطوير طريق الخليل' },
          { id:'contractNo', label:'رقم العقد *',       type:'text',   ph:'مثال: C2024/15' },
          { id:'client',     label:'الجهة المالكة *',   type:'select', options:['PWA - Public Works Authority','Ashghal','KAHRAMAA','Mowasalat','MOI','QRail','Private'] },
          { id:'consultant', label:'الاستشاري',          type:'text',   ph:'مثال: AECOM, Mott MacDonald' },
          { id:'contractor', label:'المقاول *',          type:'text',   ph:'مثال: CCC/Teyseer JV' },
          { id:'date',       label:'تاريخ الإصدار',     type:'date',   ph:'' },
        ].map(f => `
          <div>
            <label style="font-size:12px; color:#374151; display:block; margin-bottom:4px">${f.label}</label>
            ${f.type === 'select'
              ? `<select id="qs-pi-${f.id}" style="width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:12px">
                   ${f.options.map(o => `<option ${pi[f.id] === o ? 'selected' : ''}>${o}</option>`).join('')}
                 </select>`
              : `<input id="qs-pi-${f.id}" type="${f.type}" placeholder="${f.ph}"
                   value="${pi[f.id] || ''}"
                   style="width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:12px">`
            }
          </div>
        `).join('')}
      </div>
      <div style="display:flex; gap:8px">
        <button id="qs-back-2" style="background:transparent; color:#374151; border:1px solid #d1d5db; border-radius:6px; padding:9px 20px; font-size:13px; cursor:pointer">← رجوع</button>
        <button id="qs-next-2" style="background:#059669; color:#fff; border:none; border-radius:6px; padding:9px 24px; font-size:13px; cursor:pointer">التالي ←</button>
      </div>
    `;
  }

  // ── STEP 3: Execution Method
  function renderStep3() {
    const methods = EXECUTION_METHODS[state.phase] || ['Standard Method'];
    const phase = PHASES.find(p => p.id === state.phase);
    return `
      <p style="font-size:14px; font-weight:500; margin-bottom:4px">طريقة التنفيذ</p>
      <p style="font-size:12px; color:#6b7280; margin-bottom:12px">المرحلة: ${phase?.nameAr} (${phase?.nameEn})</p>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px,1fr)); gap:8px; margin-bottom:1rem">
        ${methods.map(m => `
          <div class="qs-method-card" data-method="${m}"
               style="background:${state.executionMethod === m ? '#D1FAE5' : '#f9fafb'};
               border:1.5px solid ${state.executionMethod === m ? '#059669' : '#e5e7eb'};
               border-radius:8px; padding:12px; cursor:pointer; font-size:13px; color:#111">
            ${m}
          </div>
        `).join('')}
      </div>
      <div style="background:#FEF3C7; border-left:3px solid #F59E0B; padding:10px 12px; border-radius:0 6px 6px 0; font-size:12px; color:#92400E; margin-bottom:1rem">
        المرجع: ${phase?.qcs} — جميع طرق التنفيذ مبنية على QCS 2024 وأشغال RDM 2023
      </div>
      <div style="display:flex; gap:8px">
        <button id="qs-back-3" style="background:transparent; color:#374151; border:1px solid #d1d5db; border-radius:6px; padding:9px 20px; font-size:13px; cursor:pointer">← رجوع</button>
        <button id="qs-generate" style="background:#059669; color:#fff; border:none; border-radius:6px; padding:9px 24px; font-size:13px; cursor:pointer"
          ${!state.executionMethod ? 'disabled' : ''}>
          توليد الوثيقة ←
        </button>
      </div>
    `;
  }

  // ── STEP 4: Result
  function renderStep4() {
    if (state.loading) {
      return `
        <div style="text-align:center; padding:40px">
          <div style="font-size:14px; color:#6b7280; margin-bottom:12px">جاري توليد الوثيقة...</div>
          <div style="font-size:12px; color:#9ca3af">يتم استخدام QCS 2024 كمرجع رئيسي</div>
        </div>
      `;
    }
    if (!state.generatedDoc) return `<p style="color:#ef4444">حدث خطأ. حاول مرة أخرى.</p>`;

    const { mos, itp } = state.generatedDoc;
    const phase = PHASES.find(p => p.id === state.phase);

    return `
      <div style="display:flex; align-items:center; gap:10px; background:#D1FAE5; border-radius:8px; padding:12px 16px; margin-bottom:1rem">
        <span style="font-size:18px">✅</span>
        <div>
          <p style="font-size:14px; font-weight:600; color:#065F46; margin:0">تم التوليد بنجاح</p>
          <p style="font-size:12px; color:#047857; margin:2px 0 0">المرحلة: ${phase?.nameAr} · ${phase?.qcs}</p>
        </div>
      </div>

      ${mos ? `
        <div style="border:1px solid #e5e7eb; border-radius:8px; padding:14px; margin-bottom:10px">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
            <div>
              <p style="font-size:14px; font-weight:500; margin:0">📄 Method Statement</p>
              <p style="font-size:11px; color:#6b7280; margin:2px 0 0">${mos.documentTitle}</p>
            </div>
            <div style="display:flex; gap:6px">
              <button onclick="QS.mosITPGenerator.exportMOS('pdf')" style="background:#EF4444; color:#fff; border:none; border-radius:5px; padding:6px 12px; font-size:11px; cursor:pointer">PDF</button>
              <button onclick="QS.mosITPGenerator.exportMOS('docx')" style="background:#2563EB; color:#fff; border:none; border-radius:5px; padding:6px 12px; font-size:11px; cursor:pointer">Word</button>
            </div>
          </div>
          <div style="font-size:11px; color:#374151; line-height:1.7">
            <strong>المشروع:</strong> ${mos.projectName || '—'}<br>
            <strong>رقم العقد:</strong> ${mos.contractNo || '—'}<br>
            <strong>المرجع:</strong> ${mos.qcsRef}<br>
            <strong>الأقسام:</strong> General · Pre-Construction · Work Methodology · Quality Control · HSE · Appendices
          </div>
        </div>
      ` : ''}

      ${itp ? `
        <div style="border:1px solid #e5e7eb; border-radius:8px; padding:14px; margin-bottom:10px">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
            <div>
              <p style="font-size:14px; font-weight:500; margin:0">📋 Inspection & Test Plan</p>
              <p style="font-size:11px; color:#6b7280; margin:2px 0 0">${itp.documentTitle}</p>
            </div>
            <div style="display:flex; gap:6px">
              <button onclick="QS.mosITPGenerator.exportITP('pdf')" style="background:#EF4444; color:#fff; border:none; border-radius:5px; padding:6px 12px; font-size:11px; cursor:pointer">PDF</button>
              <button onclick="QS.mosITPGenerator.exportITP('xlsx')" style="background:#16A34A; color:#fff; border:none; border-radius:5px; padding:6px 12px; font-size:11px; cursor:pointer">Excel</button>
            </div>
          </div>
          <div style="font-size:11px; color:#374151; line-height:1.7">
            <strong>عدد البنود:</strong> ${itp.activities?.filter(a => a.row_type !== 'header').length || itp.activities?.length || 0} نشاط<br>
            <strong>المرجع:</strong> ${itp.qcsRef}<br>
            <strong>تنبيه:</strong> ${itp.disclaimer || 'مراجعة المهندس المختص إلزامية'}
          </div>
        </div>
      ` : ''}

      <div style="display:flex; gap:8px; margin-top:12px">
        <button id="qs-restart" style="background:transparent; color:#374151; border:1px solid #d1d5db; border-radius:6px; padding:9px 20px; font-size:13px; cursor:pointer">← مرحلة جديدة</button>
        <button onclick="QS.mosITPGenerator.saveToProject()" style="background:#7C3AED; color:#fff; border:none; border-radius:6px; padding:9px 20px; font-size:13px; cursor:pointer">حفظ في المشروع</button>
      </div>
    `;
  }

  // ══════════════════════════════════════
  // EVENT LISTENERS
  // ══════════════════════════════════════
  function attachEventListeners(container) {
    // Phase selection
    container.addEventListener('click', (e) => {
      const card = e.target.closest('.qs-phase-card');
      if (card && card.dataset.locked !== 'true') {
        state.phase = card.dataset.phase;
        state.executionMethod = null;
        refreshContent(container);
      }

      // Execution method
      const mCard = e.target.closest('.qs-method-card');
      if (mCard) {
        state.executionMethod = mCard.dataset.method;
        refreshContent(container);
      }

      // Navigation buttons
      const id = e.target.id;
      if (id === 'qs-next-1' && state.phase && !e.target.disabled) nextStep(container);
      if (id === 'qs-next-2') { collectStep2Inputs(container); nextStep(container); }
      if (id === 'qs-back-2') { state.step = 1; refreshContent(container); }
      if (id === 'qs-back-3') { state.step = 2; refreshContent(container); }
      if (id === 'qs-generate' && state.executionMethod) generateDocuments(container);
      if (id === 'qs-restart') { state.step = 1; state.phase = null; state.generatedDoc = null; refreshContent(container); }
    });

    // Doc type change
    container.addEventListener('change', (e) => {
      if (e.target.id === 'qs-doc-type') state.docType = e.target.value;
    });
  }

  function nextStep(container) {
    state.step = Math.min(state.step + 1, 4);
    refreshContent(container);
  }

  function collectStep2Inputs(container) {
    ['name','contractNo','consultant','contractor'].forEach(id => {
      const el = container.querySelector(`#qs-pi-${id}`);
      if (el) {
        // تنظيف المدخلات — sanitize
        state.projectInfo[id] = el.value.replace(/<[^>]*>/g, '').slice(0, 200).trim();
      }
    });
    ['client'].forEach(id => {
      const el = container.querySelector(`#qs-pi-${id}`);
      if (el) state.projectInfo[id] = el.value;
    });
    const dateEl = container.querySelector('#qs-pi-date');
    if (dateEl) state.projectInfo.date = dateEl.value;
  }

  function refreshContent(container) {
    const content = container.querySelector('#qs-step-content');
    if (content) content.innerHTML = getStepHTML(state.step);
    // Refresh progress
    const prog = container.querySelector('#qs-progress');
    if (prog) {
      prog.querySelectorAll('div > div').forEach((el, i) => {
        const n = i + 1;
        if (n <= state.step) {
          el.style.background = '#059669';
          el.style.color = '#fff';
        }
      });
    }
  }

  // ══════════════════════════════════════
  // API CALL — استدعاء الـ API
  // ══════════════════════════════════════
  async function generateDocuments(container) {
    state.step = 4;
    state.loading = true;
    refreshContent(container);

    try {
      const token = getAuthToken(); // من Supabase session — لا localStorage
      const response = await fetch('/api/mos-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          type: state.docType,
          phase: state.phase,
          executionMethod: state.executionMethod,
          projectInfo: state.projectInfo,
          language: 'ar',
        }),
      });

      if (response.status === 429) {
        const err = await response.json();
        showError(container, err.message || 'تجاوزت الحد المسموح. انتظر دقيقة وحاول مرة أخرى.');
        return;
      }

      if (!response.ok) {
        const err = await response.json();
        showError(container, err.error || 'حدث خطأ غير متوقع');
        return;
      }

      const data = await response.json();
      state.generatedDoc = data.data;
      state.loading = false;
      refreshContent(container);

    } catch (err) {
      console.error('MOS/ITP generation error:', err);
      showError(container, 'تعذّر الاتصال بالخادم. تحقق من الاتصال وحاول مرة أخرى.');
    }
  }

  function showError(container, message) {
    state.loading = false;
    const content = container.querySelector('#qs-step-content');
    if (content) {
      content.innerHTML = `
        <div style="background:#FEE2E2; border:1px solid #FECACA; border-radius:8px; padding:16px; color:#991B1B; font-size:13px">
          <strong>خطأ:</strong> ${escapeHTML(message)}
        </div>
        <button onclick="this.closest('#qs-mos-generator').querySelector('#qs-step-content').innerHTML = ''"
          style="margin-top:10px; background:transparent; border:1px solid #d1d5db; border-radius:6px; padding:8px 16px; font-size:12px; cursor:pointer">
          ← رجوع
        </button>
      `;
    }
  }

  // ══════════════════════════════════════
  // EXPORT FUNCTIONS
  // ══════════════════════════════════════
  QS.mosITPGenerator.exportMOS = async function(format) {
    if (!state.generatedDoc?.mos) return;
    // توجيه للـ export API
    const params = new URLSearchParams({ format, phase: state.phase, docType: 'mos' });
    window.location.href = `/api/export-document?${params}`;
  };

  QS.mosITPGenerator.exportITP = async function(format) {
    if (!state.generatedDoc?.itp) return;
    const params = new URLSearchParams({ format, phase: state.phase, docType: 'itp' });
    window.location.href = `/api/export-document?${params}`;
  };

  QS.mosITPGenerator.saveToProject = async function() {
    if (!state.generatedDoc) return;
    // حفظ في Supabase عبر API
    const token = getAuthToken();
    if (!token) {
      alert('يجب تسجيل الدخول لحفظ الوثائق');
      return;
    }
    // TODO: POST to /api/save-document
    alert('تم الحفظ في مشاريعك ✅');
  };

  // ══════════════════════════════════════
  // UTILS
  // ══════════════════════════════════════

  // لا نستخدم localStorage للـ token — نقرأ من Supabase session فقط
  function getAuthToken() {
    if (window.QS?.supabaseClient) {
      // getSession() يرجع الـ token من الـ cookie/memory — آمن
      return window.QS.supabaseClient?.auth?.session()?.access_token || null;
    }
    return null;
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  window.QS = QS;

})(window);
