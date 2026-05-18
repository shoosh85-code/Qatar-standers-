// QatarSpec Pro — Export PDF/Word Module
// Extracted from inline-scripts.js (Phase 5 Refactoring)
(function() {
  'use strict';


function printCurrentDetail() {
  let title = document.getElementById('dmTitle').textContent;
  const printArea = document.getElementById('print-area');
  const originalContent = printArea.innerHTML;
  let today = new Date().toLocaleDateString('ar-QA');
  
  const header = '<div class="print-header"><div style="display:flex;justify-content:space-between;">' +
    '<div><div style="font-size:20px;font-weight:700;color:#7a1515;">QatarSpec Pro</div>' +
    '<div style="font-size:12px;color:#666;">المرجع: QCS 2024</div></div>' +
    '<div style="text-align:left;"><div style="font-size:12px;color:#666;">' + today + '</div>' +
    '<div style="font-size:10px;color:#999;">qatar-standers.vercel.app</div></div></div>' +
    '<div style="font-size:16px;font-weight:700;margin-top:8px;">' + title + '</div></div>';
  
  const footer = '<div class="print-footer"><div style="display:flex;justify-content:space-between;">' +
    '<span>QatarSpec Pro</span><span>QCS 2024 | qatar-standers.vercel.app</span></div></div>';
  
  printArea.innerHTML = header + originalContent + footer;
  window.print();
  setTimeout(function() { printArea.innerHTML = originalContent; }, 1000);
}


function loadJsPDF() {
  if (window.jspdf) return Promise.resolve(window.jspdf);
  return new Promise(function(res, rej) {
    let s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = function() { res(window.jspdf); };
    s.onerror = function() { rej(new Error('jsPDF load failed')); };
    document.head.appendChild(s);
  });
}
function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise(function(res, rej) {
    let s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = function() { res(window.html2canvas); };
    s.onerror = function() { rej(new Error('html2canvas load failed')); };
    document.head.appendChild(s);
  });
}


async function exportToPDF() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('pdf','📄','تصدير PDF — ميزة Pro','تصدير التقارير والـ ITP إلى PDF احترافي متاح للمشتركين في Pro فقط.');
    return;
  }
  let title = document.getElementById('dmTitle').textContent.trim();
  let today = new Date().toLocaleDateString('ar-QA');
  let projEl = document.getElementById('itp-project-name');
  let proj = projEl ? (projEl.value || '') : '';

  showToast('⏳ جاري إعداد PDF...');
  try {
    const jsPDFLib = await loadJsPDF();
    const h2c = await loadHtml2Canvas();
  } catch(e) {
    // Fallback to print window if CDN unreachable
    return _printFallback(title, proj, today);
  }

  let contentEl = document.getElementById('dmContent');
  if (!contentEl) return;

  // Render the content area to canvas
  const canvas = await h2c(contentEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#181818',
    logging: false,
    removeContainer: true
  });

  const { jsPDF } = jsPDFLib;;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 12;

  // ── Header band ──
  pdf.setFillColor(122, 21, 21);
  pdf.rect(0, 0, pageW, 18, 'F');
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(201, 168, 76);
  pdf.text('QatarSpec Pro', margin, 11);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(255, 255, 255);
  pdf.text('QCS 2024 Reference', margin, 16);
  pdf.text(today, pageW - margin, 11, { align: 'right' });
  if (proj) pdf.text(proj, pageW - margin, 16, { align: 'right' });

  // ── Title bar ──
  pdf.setFillColor(42, 42, 42);
  pdf.rect(0, 18, pageW, 10, 'F');
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(201, 168, 76);
  const safeTitle = title.replace(/[^\x00-\x7F]/g, ' ').substring(0, 80);
  pdf.text(safeTitle, margin, 25);

  // ── Watermark ──
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.setGState(new pdf.GState({ opacity: 0.04 }));
  pdf.text('QatarSpec Pro — QCS 2024', pageW / 2, pageH / 2, { align: 'center', angle: 45 });
  pdf.setGState(new pdf.GState({ opacity: 1 }));

  // ── Content image ──
  const imgData = canvas.toDataURL('image/jpeg', 0.85);
  const imgW = pageW - margin * 2;
  const imgH = (canvas.height * imgW) / canvas.width;
  let contentY = 32;
  const available = pageH - contentY - 16; // leave footer room

  if (imgH <= available) {
    pdf.addImage(imgData, 'JPEG', margin, contentY, imgW, imgH);
  } else {
    // Multi-page split
    const ratio = canvas.width / imgW;
    const sliceH_px = Math.floor(available * ratio);
    let offsetY = 0;
    let page = 0;
    while (offsetY < canvas.height) {
      if (page > 0) {
        pdf.addPage();
        _pdfPageHeader(pdf, pageW, today);
        contentY = 14;
      }
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width  = canvas.width;
      sliceCanvas.height = Math.min(sliceH_px, canvas.height - offsetY);
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, offsetY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
      const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.85);
      const sliceImgH = (sliceCanvas.height / ratio);
      pdf.addImage(sliceData, 'JPEG', margin, contentY, imgW, sliceImgH);
      offsetY += sliceH_px;
      page++;
    }
  }

  // ── Footer ──
  const totalPages = pdf.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFillColor(42, 42, 42);
    pdf.rect(0, pageH - 10, pageW, 10, 'F');
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(150, 150, 150);
    pdf.text('QatarSpec Pro — للاستخدام المهني | QCS 2024', margin, pageH - 4);
    pdf.text(p + ' / ' + totalPages, pageW - margin, pageH - 4, { align: 'right' });
  }

  let fileName = 'QatarSpec-' + safeTitle.trim().replace(/\s+/g, '-').substring(0, 30) + '.pdf';
  pdf.save(fileName);
  showToast('✅ تم تصدير PDF — ' + fileName);
}


function _pdfPageHeader(pdf, pageW, today) {
  pdf.setFillColor(42, 42, 42);
  pdf.rect(0, 0, pageW, 12, 'F');
  pdf.setFontSize(7); pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(150, 150, 150);
  pdf.text('QatarSpec Pro — QCS 2024', 12, 8);
  pdf.text(today, pageW - 12, 8, { align: 'right' });
}

function _printFallback(title, proj, today) {
  let contentEl = document.getElementById('dmContent');
  const contentHTML = contentEl ? contentEl.innerHTML : '';
  let w = window.open('', '_blank', 'width=900,height=700');
  if (!w) { showToast('❌ فعّل النوافذ المنبثقة في المتصفح'); return; }
  w.document.write('<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Tajawal:wght@400;700&display=swap" rel="stylesheet">' +
    '<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Cairo,Tajawal,Arial,sans-serif;direction:rtl;background:#fff;color:#1a1a1a;font-size:13px;line-height:1.6}.hdr{background:#7a1515;color:#c9a84c;padding:14px 20px;display:flex;justify-content:space-between}.wrap{padding:16px 20px}table{width:100%;border-collapse:collapse;font-size:11px}th{background:#7a1515;color:#fff;padding:7px 8px;border:1px solid #6a1010}td{padding:6px 8px;border:1px solid #ddd}tr:nth-child(even)td{background:#fafafa}.ftr{padding:10px 20px;border-top:1px solid #ddd;display:flex;justify-content:space-between;font-size:10px;color:#888}@media print{body{-webkit-print-color-adjust:exact}}</style>' +
    '</head><body><div class="hdr"><div style="font-size:18px;font-weight:700">QatarSpec Pro</div><div style="font-size:10px;color:#fff;text-align:left">' + today + (proj ? '<br>' + proj : '') + '</div></div>' +
    '<div class="wrap"><h2 style="color:#7a1515;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #c9a84c;font-size:16px">' + title + '</h2>' + contentHTML + '</div>' +
    '<div class="ftr"><span>QatarSpec Pro — QCS 2024</span><span>qatar-standers.vercel.app</span></div><script src="supabase-search.js"><\/script>\n</body></html>');
  w.document.close(); w.focus();
  safeTimeout('printDialog', function() { w.print(); }, 1800);
  showToast('✅ جاري الطباعة');
}


async function exportToWord() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('word','📝','تصدير Word — ميزة Pro','تصدير المواصفات والنماذج إلى ملف Word متاح للمشتركين في Pro فقط.');
    return;
  }
  let title = document.getElementById('dmTitle').textContent.trim();
  let today = new Date().toLocaleDateString('ar-QA');
  const projEl = document.getElementById('itp-project-name');
  const proj = projEl ? (projEl.value || '') : '';
  const contentEl = document.getElementById('dmContent');
  if (!contentEl) return;

  showToast('⏳ جاري إعداد Word...');

  // Extract tables and text cleanly
  const clone = contentEl.cloneNode(true);
  // Remove buttons and interactive elements
  clone.querySelectorAll('button, input, select, textarea, .calc-result').forEach(function(el) { el.remove(); });

  const bodyHTML = clone.innerHTML
    .replace(/style="[^"]*color:\s*var\([^)]+\)[^"]*"/g, '')
    .replace(/background:[^;";]+;?/g, '')
    .replace(/rgba\([^)]+\)/g, '#333');

  const wordHTML = '<!DOCTYPE html>' +
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="UTF-8">' +
    '<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom>' +
    '<w:DoNotOptimizeForBrowser/></w:WordDocument></xml>' +
    '<style>' +
    '@page Section1 { size: 21cm 29.7cm; margin: 2cm 2.5cm 2cm 2.5cm; mso-header-margin: 1cm; mso-footer-margin: 1cm; }' +
    'div.Section1 { page: Section1; }' +
    'body { font-family: "Times New Roman", Arial, sans-serif; direction: rtl; color: #1a1a1a; font-size: 12pt; line-height: 1.6; }' +
    'h1 { font-size: 16pt; font-weight: bold; color: #7a1515; border-bottom: 2pt solid #c9a84c; padding-bottom: 6pt; margin-bottom: 12pt; }' +
    'h2, h3 { font-size: 13pt; font-weight: bold; color: #7a1515; margin: 12pt 0 6pt; }' +
    'p { margin: 6pt 0; font-size: 11pt; }' +
    'table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 10pt; }' +
    'th { background: #7a1515; color: white; padding: 6pt 8pt; text-align: center; border: 1pt solid #6a1010; font-weight: bold; }' +
    'td { padding: 5pt 8pt; border: 1pt solid #cccccc; vertical-align: top; }' +
    'tr:nth-child(even) td { background: #f9f5ee; }' +
    '.header-band { background: #7a1515; color: #c9a84c; padding: 12pt 16pt; margin-bottom: 12pt; display: block; }' +
    '.footer-band { border-top: 1pt solid #cccccc; margin-top: 16pt; padding-top: 6pt; font-size: 9pt; color: #888; }' +
    'strong { color: #7a1515; }';

  const blob   = new Blob(['\ufeff', wordHTML], { type: 'application/msword' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  const safeName = title.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-').substring(0, 40);
  a.href       = url;
  a.download   = 'QatarSpec-' + safeName + '.doc';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
  showToast('✅ تم تصدير Word — ' + a.download);
}


  // Expose to window
  window.printCurrentDetail = printCurrentDetail;
  window.loadJsPDF = loadJsPDF;
  window.loadHtml2Canvas = loadHtml2Canvas;
  window.exportToPDF = exportToPDF;
  window.exportToWord = exportToWord;
})();
