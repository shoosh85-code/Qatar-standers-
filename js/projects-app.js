// js/projects-app.js — QatarSpec Pro
// Dashboard المشاريع — كل الـ logic
// SECURITY: token في memory فقط (لا localStorage)
// المرحلة 2 من خطة Project Hub

(function() {
  'use strict';

  // ── حالة التطبيق (في الذاكرة فقط) ───────────────────────────────────────
  const STATE = {
    token: null,       // JWT token في memory فقط
    user: null,        // بيانات المستخدم
    projects: [],      // قائمة المشاريع
    loading: false,
    editingId: null,   // ID المشروع قيد التعديل
  };

  // ── إعداد Supabase — يُجلب من /api/auth-config ────────────────────────────
  let SUPABASE_URL = window.__SUPABASE_URL__ ||
    document.querySelector('meta[name="supabase-url"]')?.content || '';
  let SUPABASE_ANON = window.__SUPABASE_ANON__ ||
    document.querySelector('meta[name="supabase-anon"]')?.content || '';

  async function loadSupabaseConfig() {
    if (SUPABASE_URL && SUPABASE_ANON) return; // مكتفٍ
    try {
      const r = await fetch('/api/auth?action=config');
      if (!r.ok) return;
      const c = await r.json();
      if (c.url) SUPABASE_URL = c.url;
      if (c.key) SUPABASE_ANON = c.key;
    } catch (e) { console.warn('auth-config fetch failed:', e); }
  }

  // ── تهيئة التطبيق ─────────────────────────────────────────────────────────
  async function init() {
    // إخفاء login أثناء التحقق
    const loginEl = document.getElementById('loginRequired');

    // أولاً: جلب إعدادات Supabase
    await loadSupabaseConfig();

    // ثانياً: التحقق من الجلسة
    await checkSession();

    if (STATE.token && STATE.user) {
      showDashboard();
      await loadProjects();
    } else {
      showLoginPrompt(); // يُظهر login form
    }

    bindEvents();
  }

  // ── التحقق من الجلسة ──────────────────────────────────────────────────────
  async function checkSession() {
    if (!SUPABASE_URL || !SUPABASE_ANON) return;

    // اقرأ الـ token من sessionStorage فقط (يُمسح عند إغلاق المتصفح)
    const savedToken = sessionStorage.getItem('qs_session_token');
    if (!savedToken) return;

    try {
      // تحقق من صلاحية الـ token مع Supabase
      const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${savedToken}`
        }
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData?.id) {
          STATE.token = savedToken;
          STATE.user = userData;
          return;
        }
      }
      // Token منتهي الصلاحية — امسحه
      sessionStorage.removeItem('qs_session_token');
    } catch (e) {
      console.warn('checkSession error:', e);
      sessionStorage.removeItem('qs_session_token');
    }
  }

  // ── تسجيل الدخول (من نموذج login.html) ──────────────────────────────────
  window.QS_Projects = {
    setSession(token, user) {
      STATE.token = token;
      STATE.user = user;
      // حفظ مؤقت في sessionStorage (يُمسح عند إغلاق المتصفح)
      sessionStorage.setItem('qs_session_token', token);
      sessionStorage.setItem('qs_session_user', JSON.stringify(user || {}));
      showDashboard();
      loadProjects();
    },
    logout() {
      STATE.token = null;
      STATE.user = null;
      sessionStorage.removeItem('qs_session_token');
      sessionStorage.removeItem('qs_session_user');
    }
  };

  // ── جلب المشاريع من API ───────────────────────────────────────────────────
  async function loadProjects() {
    if (!STATE.token) return;

    setState({ loading: true });
    renderLoadingSkeletons();

    try {
      const res = await fetch('/api/project-hub?resource=projects', {
        headers: { 'Authorization': `Bearer ${STATE.token}` }
      });

      if (res.status === 401) {
        window.QS_Projects.logout();
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (errData.code === 'TABLE_MISSING') {
          showError('قاعدة البيانات غير مُهيأة. يرجى فتح <a href="/admin-project-hub-setup.html" style="color:var(--gold)">صفحة الإعداد</a> وتشغيل السكريبت.');
          return;
        }
        throw new Error(`HTTP ${res.status}: ${errData.error || ''}`);
      }

      const json = await res.json();
      // تصفية المشاريع المحذوفة (cancelled)
      STATE.projects = (json.data || []).filter(p => p.status !== 'cancelled');
      renderProjects();
      renderStats();
    } catch (err) {
      console.error('loadProjects error:', err);
      showError(`فشل تحميل المشاريع: ${err.message || 'خطأ غير معروف'}`);
    } finally {
      setState({ loading: false });
    }
  }

  // ── إنشاء مشروع جديد ─────────────────────────────────────────────────────
  async function createProject(data) {
    const res = await fetch('/api/project-hub?resource=projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATE.token}`
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    // ── PRO GATE ─────────────────────────────────────────────────────────
    if (res.status === 403 && json.error === 'PRO_GATE') {
      const msg = `
        <div style="text-align:center;padding:10px">
          <div style="font-size:48px;margin-bottom:10px">🔒</div>
          <h3 style="color:#C8922A;margin-bottom:8px">ميزة Pro</h3>
          <p style="color:#aaa;margin-bottom:16px;font-size:14px">${json.message}</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <a href="${json.upgrade_url}" target="_blank"
               style="background:#C8922A;color:#000;padding:10px 20px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px">
               ⭐ رقّي لـ Pro — 99 QAR/شهر
            </a>
            <button onclick="this.closest('.modal-overlay').style.display='none'"
               style="background:#333;color:#fff;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;font-size:14px">
               إغلاق
            </button>
          </div>
          <p style="color:#666;font-size:11px;margin-top:12px">
            الحساب المجاني: ${json.current_count}/${json.free_limit} مشاريع
          </p>
        </div>`;
      // عرض في modal الموجود
      const modalBody = document.querySelector('#projectModal .modal-body') ||
                        document.querySelector('.modal-body');
      if (modalBody) { modalBody.innerHTML = msg; return null; }
      throw new Error(json.message);
    }
    // ─────────────────────────────────────────────────────────────────────

    if (!res.ok) {
      if (json.code === 'TABLE_MISSING') {
        throw new Error('قاعدة البيانات غير مُهيأة — افتح /admin-project-hub-setup.html وشغّل الإعداد أولاً');
      }
      throw new Error(json.error || json.message || 'فشل إنشاء المشروع');
    }
    return json.data;
  }

  // ── تعديل مشروع ──────────────────────────────────────────────────────────
  async function updateProject(id, data) {
    const res = await fetch(`/api/project-hub?resource=projects&id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATE.token}`
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'فشل تعديل المشروع');
    return json.data;
  }

  // ── حذف مشروع (soft delete) ───────────────────────────────────────────────
  async function deleteProject(id) {
    const res = await fetch(`/api/project-hub?resource=projects&id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${STATE.token}` }
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'فشل حذف المشروع');
    return true;
  }

  // ── عرض المشاريع ─────────────────────────────────────────────────────────
  function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    let projects = STATE.projects;

    // تصفية حسب النوع
    if (filter !== 'all') {
      projects = projects.filter(p => p.status === filter || p.type === filter);
    }

    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text3)">
          <div style="font-size:48px;margin-bottom:16px">📂</div>
          <div style="font-size:18px;font-weight:600;color:var(--text2);margin-bottom:8px">لا توجد مشاريع بعد</div>
          <div style="font-size:14px">ابدأ بإنشاء مشروعك الأول</div>
          <button onclick="QS_Projects_UI.openModal()" style="margin-top:24px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:12px 28px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:14px;font-weight:600;cursor:pointer">
            + مشروع جديد
          </button>
        </div>`;
      return;
    }

    grid.innerHTML = projects.map(p => renderProjectCard(p)).join('');
  }

  function renderProjectCard(p) {
    const statusConfig = {
      active:    { label: 'نشط',    color: '#4CAF50', bg: 'rgba(76,175,80,0.12)' },
      on_hold:   { label: 'موقوف',  color: '#FF9800', bg: 'rgba(255,152,0,0.12)' },
      completed: { label: 'مكتمل',  color: '#9E9E9E', bg: 'rgba(158,158,158,0.12)' },
      cancelled: { label: 'ملغي',   color: '#F44336', bg: 'rgba(244,67,54,0.12)' },
    };

    const typeEmoji = {
      villa: '🏠', building: '🏢', road: '🛣️',
      maintenance: '🔧', infrastructure: '⚡', other: '📋'
    };

    const typeLabel = {
      villa: 'فيلا', building: 'مبنى', road: 'طريق',
      maintenance: 'صيانة', infrastructure: 'بنية تحتية', other: 'أخرى'
    };

    const sc = statusConfig[p.status] || statusConfig.active;
    const emoji = typeEmoji[p.type] || '📋';
    const tLabel = typeLabel[p.type] || 'أخرى';

    const startDate = p.start_date ? new Date(p.start_date).toLocaleDateString('ar-QA', { year:'numeric', month:'short' }) : '—';
    const value = p.contract_value
      ? new Intl.NumberFormat('ar-QA', { style:'currency', currency:'QAR', maximumFractionDigits:0 }).format(p.contract_value)
      : null;

    // حساب نسبة الوقت المنقضي
    let progressBar = '';
    if (p.start_date && p.end_date) {
      const start = new Date(p.start_date).getTime();
      const end   = new Date(p.end_date).getTime();
      const now   = Date.now();
      const pct   = Math.min(100, Math.max(0, Math.round((now - start) / (end - start) * 100)));
      const pctColor = pct < 50 ? '#4CAF50' : pct < 80 ? '#FF9800' : '#F44336';
      progressBar = `
        <div style="margin-top:14px">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text3);margin-bottom:5px">
            <span>التقدم الزمني</span><span style="color:${pctColor};font-weight:600">${pct}%</span>
          </div>
          <div style="background:var(--dark5);border-radius:99px;height:4px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:${pctColor};border-radius:99px;transition:width .6s ease"></div>
          </div>
        </div>`;
    }

    return `
      <div class="project-card" data-id="${p.id}" onclick="QS_Projects_UI.openProject('${p.id}')"
           style="background:var(--dark3);border:1px solid var(--border);border-radius:16px;padding:20px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden">
        <!-- نقطة الحالة -->
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${sc.color};opacity:.7;border-radius:16px 16px 0 0"></div>

        <!-- الرأس -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
            <div style="width:40px;height:40px;background:var(--dark5);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${emoji}</div>
            <div style="min-width:0">
              <div style="font-family:Cairo,sans-serif;font-size:15px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(p.name)}</div>
              <div style="font-size:11px;color:var(--text3);margin-top:2px">${escapeHtml(p.client || '—')}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-right:8px">
            <span style="background:${sc.bg};color:${sc.color};border-radius:20px;padding:3px 10px;font-size:11px;font-weight:600">${sc.label}</span>
          </div>
        </div>

        <!-- التفاصيل -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px">
          <div style="color:var(--text3)">
            <span style="color:var(--text3)">📍 </span>
            <span style="color:var(--text2)">${escapeHtml(p.location || '—')}</span>
          </div>
          <div style="color:var(--text3)">
            <span style="color:var(--text3)">🏷️ </span>
            <span style="color:var(--text2)">${tLabel}</span>
          </div>
          <div style="color:var(--text3)">
            <span style="color:var(--text3)">📅 </span>
            <span style="color:var(--text2)">${startDate}</span>
          </div>
          ${value ? `<div style="color:var(--text3)"><span>💰 </span><span style="color:var(--gold2);font-size:11px">${value}</span></div>` : '<div></div>'}
        </div>

        ${progressBar}

        <!-- أزرار الإجراءات -->
        <div class="card-actions" style="display:flex;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
          <button onclick="event.stopPropagation();QS_Projects_UI.openProject('${p.id}')"
                  style="flex:1;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:8px;color:var(--gold2);font-family:Tajawal,sans-serif;font-size:12px;font-weight:600;cursor:pointer">
            📊 فتح المشروع
          </button>
          <button onclick="event.stopPropagation();QS_Projects_UI.editProject('${p.id}')"
                  style="background:var(--dark5);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text2);font-size:14px;cursor:pointer;transition:.2s"
                  title="تعديل">✏️</button>
          <button onclick="event.stopPropagation();QS_Projects_UI.confirmDelete('${p.id}','${escapeHtml(p.name)}')"
                  style="background:rgba(244,67,54,0.08);border:1px solid rgba(244,67,54,0.2);border-radius:8px;padding:8px 12px;color:#F44336;font-size:14px;cursor:pointer;transition:.2s"
                  title="أرشفة">🗑️</button>
        </div>
      </div>`;
  }

  // ── عرض الإحصائيات ───────────────────────────────────────────────────────
  function renderStats() {
    const counts = {
      total: STATE.projects.length,
      active: STATE.projects.filter(p => p.status === 'active').length,
      on_hold: STATE.projects.filter(p => p.status === 'on_hold').length,
      completed: STATE.projects.filter(p => p.status === 'completed').length,
    };

    const typeCount = {};
    STATE.projects.forEach(p => {
      typeCount[p.type] = (typeCount[p.type] || 0) + 1;
    });

    const totalValue = STATE.projects.reduce((s, p) => s + (p.contract_value || 0), 0);

    const el = document.getElementById('projectStats');
    if (!el) return;

    el.innerHTML = `
      <div class="stat-card" style="background:var(--dark3);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center">
        <div style="font-family:Cairo,sans-serif;font-size:32px;font-weight:900;color:var(--gold)">${counts.total}</div>
        <div style="font-size:12px;color:var(--text3)">إجمالي المشاريع</div>
      </div>
      <div class="stat-card" style="background:var(--dark3);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center">
        <div style="font-family:Cairo,sans-serif;font-size:32px;font-weight:900;color:#4CAF50">${counts.active}</div>
        <div style="font-size:12px;color:var(--text3)">نشطة</div>
      </div>
      <div class="stat-card" style="background:var(--dark3);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center">
        <div style="font-family:Cairo,sans-serif;font-size:32px;font-weight:900;color:#FF9800">${counts.on_hold}</div>
        <div style="font-size:12px;color:var(--text3)">موقوفة</div>
      </div>
      <div class="stat-card" style="background:var(--dark3);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center">
        <div style="font-family:Cairo,sans-serif;font-size:32px;font-weight:900;color:var(--text2)">${counts.completed}</div>
        <div style="font-size:12px;color:var(--text3)">مكتملة</div>
      </div>
      ${totalValue > 0 ? `
      <div class="stat-card" style="background:var(--dark3);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center;grid-column:1/-1">
        <div style="font-family:Cairo,sans-serif;font-size:24px;font-weight:900;color:var(--gold2)">
          ${new Intl.NumberFormat('ar-QA', { style:'currency', currency:'QAR', maximumFractionDigits:0 }).format(totalValue)}
        </div>
        <div style="font-size:12px;color:var(--text3)">إجمالي قيمة العقود</div>
      </div>` : ''}`;
  }

  // ── عرض Skeletons أثناء التحميل ──────────────────────────────────────────
  function renderLoadingSkeletons() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = Array(4).fill(0).map(() => `
      <div style="background:var(--dark3);border:1px solid var(--border);border-radius:16px;padding:20px;animation:pulse 1.5s infinite">
        <div style="display:flex;gap:10px;margin-bottom:14px">
          <div style="width:40px;height:40px;background:var(--dark5);border-radius:10px"></div>
          <div style="flex:1">
            <div style="height:14px;background:var(--dark5);border-radius:4px;width:70%;margin-bottom:8px"></div>
            <div style="height:11px;background:var(--dark5);border-radius:4px;width:45%"></div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${Array(4).fill('<div style="height:11px;background:var(--dark5);border-radius:4px"></div>').join('')}
        </div>
      </div>`).join('');
  }

  // ── إظهار/إخفاء واجهات ───────────────────────────────────────────────────
  function showDashboard() {
    const el = document.getElementById('dashboardContent');
    const loginEl = document.getElementById('loginRequired');
    if (el) el.style.display = 'block';
    if (loginEl) loginEl.style.display = 'none';

    // تحديث اسم المستخدم
    const nameEl = document.getElementById('userDisplayName');
    if (nameEl && STATE.user) {
      nameEl.textContent = STATE.user.email?.split('@')[0] || 'مهندس';
    }
  }

  function showLoginPrompt() {
    const el = document.getElementById('dashboardContent');
    const loginEl = document.getElementById('loginRequired');
    if (el) el.style.display = 'none';
    if (loginEl) loginEl.style.display = 'flex';
  }

  // ── UI العام (Modal) ──────────────────────────────────────────────────────
  window.QS_Projects_UI = {
    // فتح صفحة تفاصيل المشروع
    openProject(id) {
      window.location.href = `project-detail.html?id=${id}`;
    },

    // فتح modal لإنشاء مشروع جديد
    openModal() {
      STATE.editingId = null;
      document.getElementById('modalTitle').textContent = 'مشروع جديد';
      // مسح الحقول يدوياً (modal-grid هو div وليس form)
      const ids = ['f_name','f_client','f_location','f_contract_value','f_start_date','f_end_date','f_notes'];
      ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      const typeEl = document.getElementById('f_type'); if (typeEl) typeEl.value = 'villa';
      const statusEl = document.getElementById('f_status'); if (statusEl) statusEl.value = 'active';
      document.getElementById('projectModal').style.display = 'flex';
      setTimeout(() => document.getElementById('projectModal').classList.add('open'), 10);
    },

    // فتح modal للتعديل
    editProject(id) {
      const p = STATE.projects.find(x => x.id === id);
      if (!p) return;
      STATE.editingId = id;
      document.getElementById('modalTitle').textContent = 'تعديل المشروع';

      // ملء الحقول
      document.getElementById('f_name').value = p.name || '';
      document.getElementById('f_client').value = p.client || '';
      document.getElementById('f_location').value = p.location || '';
      document.getElementById('f_type').value = p.type || 'other';
      document.getElementById('f_contract_value').value = p.contract_value || '';
      document.getElementById('f_start_date').value = p.start_date || '';
      document.getElementById('f_end_date').value = p.end_date || '';
      document.getElementById('f_status').value = p.status || 'active';
      document.getElementById('f_notes').value = p.notes || '';

      document.getElementById('projectModal').style.display = 'flex';
      setTimeout(() => document.getElementById('projectModal').classList.add('open'), 10);
    },

    // إغلاق الـ modal
    closeModal() {
      const modal = document.getElementById('projectModal');
      modal.classList.remove('open');
      setTimeout(() => { modal.style.display = 'none'; }, 300);
    },

    // تأكيد الحذف
    confirmDelete(id, name) {
      if (!confirm(`هل تريد أرشفة المشروع "${name}"؟\nسيتم نقله للمشاريع المؤرشفة.`)) return;
      this.doDelete(id);
    },

    async doDelete(id) {
      try {
        await deleteProject(id);
        STATE.projects = STATE.projects.filter(p => p.id !== id);
        renderProjects();
        renderStats();
        showToast('تم أرشفة المشروع', 'success');
      } catch (err) {
        showToast(err.message || 'فشل الأرشفة', 'error');
      }
    },

    // تغيير الفلتر
    setFilter(filter) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');
      renderProjects(filter);
    },

    // تسجيل الخروج
    logout() {
      if (!confirm('هل تريد تسجيل الخروج؟')) return;
      window.QS_Projects.logout();
    }
  };

  // ── معالجة إرسال الفورم ───────────────────────────────────────────────────
  async function handleFormSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const originalText = btn.textContent;
    btn.textContent = 'جارٍ الحفظ...';
    btn.disabled = true;

    const data = {
      name: document.getElementById('f_name').value.trim(),
      client: document.getElementById('f_client').value.trim(),
      location: document.getElementById('f_location').value.trim(),
      type: document.getElementById('f_type').value,
      contract_value: document.getElementById('f_contract_value').value || null,
      start_date: document.getElementById('f_start_date').value || null,
      end_date: document.getElementById('f_end_date').value || null,
      status: document.getElementById('f_status').value,
      notes: document.getElementById('f_notes').value.trim(),
    };

    try {
      if (STATE.editingId) {
        // تعديل
        const updated = await updateProject(STATE.editingId, data);
        const idx = STATE.projects.findIndex(p => p.id === STATE.editingId);
        if (idx >= 0) STATE.projects[idx] = { ...STATE.projects[idx], ...updated };
        showToast('تم تحديث المشروع', 'success');
      } else {
        // إنشاء جديد
        const newP = await createProject(data);
        if (newP) STATE.projects.unshift(newP);
        showToast('تم إنشاء المشروع', 'success');
      }

      renderProjects();
      renderStats();
      QS_Projects_UI.closeModal();
    } catch (err) {
      showToast(err.message || 'حدث خطأ', 'error');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  // ── ربط الأحداث ───────────────────────────────────────────────────────────
  function bindEvents() {
    // فورم الإنشاء/التعديل
    document.getElementById('projectForm')?.addEventListener('submit', handleFormSubmit);

    // إغلاق الـ modal عند الضغط على الخلفية
    document.getElementById('projectModal')?.addEventListener('click', function(e) {
      if (e.target === this) QS_Projects_UI.closeModal();
    });

    // إضافة hover effect للكروت
    document.getElementById('projectsGrid')?.addEventListener('mouseover', function(e) {
      const card = e.target.closest('.project-card');
      if (card) card.style.cssText += ';border-color:var(--border2);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.4)';
    });
    document.getElementById('projectsGrid')?.addEventListener('mouseout', function(e) {
      const card = e.target.closest('.project-card');
      if (card) card.style.cssText = card.style.cssText
        .replace('border-color:var(--border2);', '')
        .replace('transform:translateY(-3px);', '')
        .replace('box-shadow:0 12px 32px rgba(0,0,0,0.4)', '');
    });
  }

  // ── أدوات مساعدة ─────────────────────────────────────────────────────────
  function setState(partial) {
    Object.assign(STATE, partial);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
              .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function showError(msg) {
    const grid = document.getElementById('projectsGrid');
    if (grid) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#F44336">${msg}</div>`;
    }
  }

  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    const colors = { success: '#4CAF50', error: '#F44336', info: '#2196F3' };
    toast.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:var(--dark3);border:1px solid ${colors[type] || colors.info};
      border-radius:10px;padding:12px 24px;color:var(--text);font-family:Tajawal,sans-serif;
      font-size:14px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.4);
      animation:slideUp .3s ease`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; }, 2700);
    setTimeout(() => toast.remove(), 3000);
  }

  // ── تشغيل التطبيق ─────────────────────────────────────────────────────────
  async function safeInit() {
    try {
      await init();
    } catch (e) {
      console.error('init failed:', e);
      // Fallback: show login form
      const loginEl = document.getElementById('loginRequired');
      if (loginEl) loginEl.style.display = 'flex';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
  } else {
    safeInit();
  }

})();
