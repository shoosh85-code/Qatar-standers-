// ═══ QatarSpec Pro — PDF Viewer (pdf.js) ═══
// المرحلة 5: عارض PDF مدمج للمستندات الهندسية
// Fallback: toast إذا pdf.js غير متاح — التطبيق يعمل عادي

window.QS = window.QS || {};

// فتح عارض PDF مع ملف
QS.openPDFViewer = async function(file) {
  if (typeof pdfjsLib === 'undefined') {
    if (typeof showToast === 'function') {
      showToast('⚠️ عارض PDF غير متاح — حاول لاحقاً');
    }
    return;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    // إنشاء modal أو إعادة استخدامه
    let modal = document.getElementById('pdf-viewer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pdf-viewer-modal';
      modal.className = 'detail-modal-bg';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'عارض PDF');
      modal.style.cssText = 'display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;';
      modal.innerHTML = `
        <div style="width:95%;max-width:900px;height:90vh;background:var(--dark2,#1a1a2e);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border,#333);">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border,#333);flex-shrink:0;">
            <span id="pdf-title" style="color:var(--gold,#c9a84c);font-weight:700;font-size:14px;max-width:70%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></span>
            <div style="display:flex;gap:12px;align-items:center;">
              <span id="pdf-page-info" style="color:var(--text3,#888);font-size:12px;white-space:nowrap;"></span>
              <button onclick="QS.closePDFViewer()" style="background:none;border:none;color:var(--text,#fff);font-size:20px;cursor:pointer;line-height:1;padding:2px 6px;" aria-label="إغلاق">✕</button>
            </div>
          </div>
          <div id="pdf-canvas-container" style="flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;align-items:center;gap:8px;"></div>
          <div style="display:flex;justify-content:center;align-items:center;gap:12px;padding:10px;border-top:1px solid var(--border,#333);flex-shrink:0;">
            <button onclick="QS.pdfPrevPage()" aria-label="الصفحة السابقة"
              style="background:var(--dark4,#2a2a3e);border:1px solid var(--border,#333);border-radius:8px;padding:6px 16px;color:var(--text,#fff);cursor:pointer;font-size:13px;">◀ السابقة</button>
            <span id="pdf-zoom-info" style="color:var(--text3,#888);font-size:12px;">100%</span>
            <button onclick="QS.pdfNextPage()" aria-label="الصفحة التالية"
              style="background:var(--dark4,#2a2a3e);border:1px solid var(--border,#333);border-radius:8px;padding:6px 16px;color:var(--text,#fff);cursor:pointer;font-size:13px;">التالية ▶</button>
          </div>
        </div>`;
      document.body.appendChild(modal);

      // إغلاق عند الضغط على الخلفية
      modal.addEventListener('click', function(e) {
        if (e.target === modal) QS.closePDFViewer();
      });

      // إغلاق بـ Escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') QS.closePDFViewer();
      });
    }

    modal.style.display = 'flex';

    // حفظ بيانات الـ PDF
    QS._pdfDoc = pdf;
    QS._pdfPage = 1;
    QS._pdfScale = 1.5;

    document.getElementById('pdf-title').textContent = file.name;
    await QS.renderPDFPage(1);

  } catch (err) {
    console.error('PDF Viewer Error:', err);
    if (typeof showToast === 'function') {
      showToast('❌ خطأ في فتح الملف: ' + file.name);
    }
  }
};

// عرض صفحة محددة
QS.renderPDFPage = async function(num) {
  if (!QS._pdfDoc) return;

  try {
    const page = await QS._pdfDoc.getPage(num);
    const scale = QS._pdfScale || 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.cssText = 'max-width:100%;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.4);';

    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    const container = document.getElementById('pdf-canvas-container');
    container.innerHTML = '';
    container.appendChild(canvas);

    // تحديث معلومات الصفحة
    const pageInfo = document.getElementById('pdf-page-info');
    const zoomInfo = document.getElementById('pdf-zoom-info');
    if (pageInfo) pageInfo.textContent = 'صفحة ' + num + ' من ' + QS._pdfDoc.numPages;
    if (zoomInfo) zoomInfo.textContent = Math.round(scale * 100) + '%';

  } catch (err) {
    console.error('PDF Render Error:', err);
  }
};

// التنقل بين الصفحات
QS.pdfNextPage = function() {
  if (QS._pdfDoc && QS._pdfPage < QS._pdfDoc.numPages) {
    QS.renderPDFPage(++QS._pdfPage);
  }
};

QS.pdfPrevPage = function() {
  if (QS._pdfDoc && QS._pdfPage > 1) {
    QS.renderPDFPage(--QS._pdfPage);
  }
};

// إغلاق العارض
QS.closePDFViewer = function() {
  const modal = document.getElementById('pdf-viewer-modal');
  if (modal) modal.style.display = 'none';
};
