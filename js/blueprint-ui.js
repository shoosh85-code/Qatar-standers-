window.QS = window.QS || {};

window.QS.blueprintUI = {
  currentBlueprint: null,

  init() {
    const uploadZone = document.getElementById('blueprint-upload-zone');
    const fileInput = document.getElementById('blueprint-file-input');
    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', e => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
    uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) this.processFile(file);
    });
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) this.processFile(file);
    });
  },

  async processFile(file) {
    const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED.includes(file.type)) {
      window.QS.showToast('الصيغ المدعومة: PDF، JPG، PNG، WebP', 'error');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      window.QS.showToast('الحد الأقصى للملف 4MB', 'error');
      return;
    }

    this.showLoading(file.name);

    const base64 = await this.fileToBase64(file);
    const projectType = document.getElementById('project-type-select')?.value || '';

    const session = await window.QS.getSession?.();

    try {
      const res = await fetch('/api/blueprint-parser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` })
        },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType: file.type,
          projectType
        })
      });

      const data = await res.json();

      if (res.status === 429) {
        if (data.upgrade) window.QS.showProPrompt?.('تحليل المخططات', 'Blueprint Analysis');
        else window.QS.showToast(data.message_ar, 'warning');
        this.hideLoading();
        return;
      }

      if (!res.ok) {
        window.QS.showToast(data.message_ar || 'فشل التحليل', 'error');
        this.hideLoading();
        return;
      }

      this.currentBlueprint = data.blueprint;
      this.renderResults(data);
      this.triggerCalculators(data.blueprint);

    } catch {
      window.QS.showToast('تعذر الاتصال بالخادم', 'error');
      this.hideLoading();
    }
  },

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = () => reject(new Error('فشل قراءة الملف'));
      reader.readAsDataURL(file);
    });
  },

  showLoading(fileName) {
    const zone = document.getElementById('blueprint-upload-zone');
    const results = document.getElementById('blueprint-results');
    if (zone) zone.innerHTML = `
      <div class="bp-loading">
        <div class="bp-spinner"></div>
        <p>جاري تحليل المخطط...</p>
        <small>${fileName}</small>
      </div>`;
    if (results) results.hidden = true;
  },

  hideLoading() {
    const zone = document.getElementById('blueprint-upload-zone');
    if (zone) zone.innerHTML = `
      <i class="ti ti-file-upload"></i>
      <p>اسحب المخطط هنا أو اضغط للرفع</p>
      <small>PDF · JPG · PNG · WebP — حد 4MB</small>`;
  },

  renderResults(data) {
    const bp = data.blueprint;
    const container = document.getElementById('blueprint-results');
    if (!container) return;

    const confidenceColor = bp.confidence === 'high' ? '#1a7a4a' : bp.confidence === 'medium' ? '#b7640a' : '#c0392b';
    const confidenceLabel = bp.confidence === 'high' ? 'عالية ✓' : bp.confidence === 'medium' ? 'متوسطة' : 'منخفضة ⚠️';

    let areasHTML = '';
    if (bp.areas?.length) {
      areasHTML = `<div class="bp-section">
        <h4>المساحات والأحجام</h4>
        <table class="bp-table">
          <thead><tr><th>العنصر</th><th>الطول (م)</th><th>العرض (م)</th><th>الارتفاع (م)</th><th>المساحة (م²)</th><th>الحجم (م³)</th></tr></thead>
          <tbody>${bp.areas.map(a => `
            <tr>
              <td>${a.label || '-'}</td>
              <td>${a.length ?? '-'}</td>
              <td>${a.width ?? '-'}</td>
              <td>${a.height ?? '-'}</td>
              <td>${a.area ?? '-'}</td>
              <td>${a.volume ?? '-'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
    }

    let elementsHTML = '';
    if (bp.structural_elements?.length) {
      elementsHTML = `<div class="bp-section">
        <h4>العناصر الإنشائية</h4>
        <table class="bp-table">
          <thead><tr><th>النوع</th><th>الرمز</th><th>العدد</th><th>الأبعاد</th></tr></thead>
          <tbody>${bp.structural_elements.map(el => `
            <tr>
              <td>${el.type || '-'}</td>
              <td>${el.id || '-'}</td>
              <td>${el.count ?? '-'}</td>
              <td>${[el.width, el.depth, el.length].filter(Boolean).join(' × ') || '-'} م</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
    }

    let materialsHTML = '';
    if (bp.materials?.length) {
      materialsHTML = `<div class="bp-section">
        <h4>المواد</h4>
        <ul class="bp-materials-list">${bp.materials.map(m =>
          `<li><strong>${m.type}</strong> ${m.grade ? `— ${m.grade}` : ''} <span>${m.location || ''}</span></li>`
        ).join('')}</ul>
      </div>`;
    }

    container.innerHTML = `
      <div class="bp-results-header">
        <div>
          <h3>${bp.project?.name || 'مشروع غير مسمى'}</h3>
          <small>مقياس: ${bp.project?.scale || 'غير محدد'} | رقم: ${bp.project?.drawing_number || '-'}</small>
        </div>
        <span class="bp-confidence" style="color:${confidenceColor}">دقة التحليل: ${confidenceLabel}</span>
      </div>
      ${bp.confidence === 'low' ? `<div class="bp-warning">⚠️ ${bp.confidence_reason || 'المخطط غير واضح — ارفع نسخة أعلى جودة للحصول على نتائج أدق'}</div>` : ''}
      ${areasHTML}
      ${elementsHTML}
      ${materialsHTML}
      <div class="bp-disclaimer">${data.disclaimer_ar}</div>
      <button class="bp-export-btn" onclick="window.QS.blueprintUI.exportBOQ()">
        <i class="ti ti-download"></i> تصدير BOQ كامل
      </button>`;

    container.hidden = false;
    this.hideLoading();
  },

  triggerCalculators(bp) {
    if (!bp.areas?.length && !bp.structural_elements?.length) return;
    const event = new CustomEvent('blueprint-analyzed', { detail: bp });
    document.dispatchEvent(event);
    window.QS.showToast('تم تحليل المخطط — الحاسبات جاهزة', 'success');
  },

  exportBOQ() {
    if (!this.currentBlueprint) return;
    if (!window.QS.requirePro?.('تصدير BOQ', 'BOQ Export')) return;
    window.QS.boqGenerator?.generate(this.currentBlueprint);
  }
};

document.addEventListener('DOMContentLoaded', () => window.QS.blueprintUI.init());
