/**
 * QatarSpec Pro — PDF Export for AI Results
 * تصدير نتائج الذكاء الاصطناعي كـ PDF احترافي
 * يستخدم html2canvas لالتقاط العرض البصري + jsPDF للتوليد
 */

(function(w) {
  'use strict';

  // ═══════════════════════════════════════════════
  // تحميل المكتبات ديناميكياً
  // ═══════════════════════════════════════════════

  function loadScript(src, checkFn) {
    if (checkFn()) return Promise.resolve();
    return new Promise(function(resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function() { reject(new Error('فشل تحميل: ' + src)); };
      document.head.appendChild(s);
    });
  }

  function loadJsPDF() {
    return loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      function() { return !!(w.jspdf && w.jspdf.jsPDF); }
    );
  }

  function loadHtml2Canvas() {
    return loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      function() { return typeof w.html2canvas === 'function'; }
    );
  }

  // ═══════════════════════════════════════════════
  // ثوابت التصميم — Brand QatarSpec Pro
  // ═══════════════════════════════════════════════

  var BRAND = {
    maroon:  [122, 21, 21],
    gold:    [201, 168, 76],
    dark:    [24, 24, 24],
    dark2:   [42, 42, 42],
    white:   [255, 255, 255],
    grey:    [150, 150, 150],
    light:   [245, 242, 235]
  };

  var PAGE = { w: 210, h: 297, margin: 14 };

  // ═══════════════════════════════════════════════
  // رسم الترويسة
  // ═══════════════════════════════════════════════

  function drawHeader(doc, opts) {
    var pw = PAGE.w;
    var today = opts.today || new Date().toLocaleDateString('ar-QA');

    // الشريط الرئيسي
    doc.setFillColor.apply(doc, BRAND.maroon);
    doc.rect(0, 0, pw, 20, 'F');

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor.apply(doc, BRAND.gold);
    doc.text('QatarSpec Pro', PAGE.margin, 12);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor.apply(doc, BRAND.white);
    doc.text('QCS 2024 | Ashghal QA/QC', PAGE.margin, 17);

    // التاريخ يمين
    doc.setFontSize(8);
    doc.setTextColor.apply(doc, BRAND.gold);
    doc.text(today, pw - PAGE.margin, 12, { align: 'right' });

    // اسم المشروع يمين
    if (opts.project) {
      doc.setFontSize(7);
      doc.setTextColor.apply(doc, BRAND.white);
      doc.text(String(opts.project).substring(0, 50), pw - PAGE.margin, 17, { align: 'right' });
    }

    // شريط العنوان
    doc.setFillColor.apply(doc, BRAND.dark2);
    doc.rect(0, 20, pw, 10, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor.apply(doc, BRAND.gold);
    var safeTitle = String(opts.title || '').replace(/[^\x00-\x7F]/g, ' ').substring(0, 80);
    doc.text(safeTitle, PAGE.margin, 27);

    // نوع التقرير يمين
    if (opts.reportType) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 180);
      doc.text(opts.reportType, pw - PAGE.margin, 27, { align: 'right' });
    }
  }

  // ═══════════════════════════════════════════════
  // رسم التذييل
  // ═══════════════════════════════════════════════

  function drawFooter(doc, pageNum, totalPages) {
    var pw = PAGE.w;
    var ph = PAGE.h;
    doc.setFillColor.apply(doc, BRAND.dark2);
    doc.rect(0, ph - 10, pw, 10, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor.apply(doc, BRAND.grey);
    doc.text(
      '\u26A0\uFE0F \u0647\u0630\u0647 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0633\u062A\u0631\u0634\u0627\u062F\u064A\u0629. \u064A\u062C\u0628 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 QCS 2024 \u0627\u0644\u0623\u0635\u0644\u064A.',
      PAGE.margin, ph - 4
    );
    doc.text(pageNum + ' / ' + totalPages, pw - PAGE.margin, ph - 4, { align: 'right' });
  }

  // ═══════════════════════════════════════════════
  // علامة مائية
  // ═══════════════════════════════════════════════

  function drawWatermark(doc) {
    var pw = PAGE.w; var ph = PAGE.h;
    try {
      doc.setGState(new doc.GState({ opacity: 0.04 }));
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor.apply(doc, BRAND.grey);
      doc.text('QatarSpec Pro — QCS 2024', pw / 2, ph / 2, { align: 'center', angle: 45 });
      doc.setGState(new doc.GState({ opacity: 1 }));
    } catch(e) { /* fallback إذا GState غير مدعوم */ }
  }

  // ═══════════════════════════════════════════════
  // التصدير الرئيسي — html2canvas → jsPDF
  // ═══════════════════════════════════════════════

  /**
   * تصدير عنصر HTML كـ PDF احترافي
   * @param {Object} opts
   * @param {string}      opts.elementId   - ID العنصر المراد تصديره
   * @param {string}      opts.title       - عنوان التقرير
   * @param {string}      opts.reportType  - نوع التقرير (AR/EN)
   * @param {string}      opts.project     - اسم المشروع
   * @param {string}      opts.filename    - اسم الملف
   * @param {string}      opts.disclaimer  - تنبيه أسفل التقرير
   */
  async function exportElementAsPDF(opts) {
    opts = opts || {};

    var el = document.getElementById(opts.elementId);
    if (!el) {
      if (w.showToast) w.showToast('\u274C \u0644\u0645 \u064A\u062A\u0645 \u0625\u064A\u062C\u0627\u062F \u0627\u0644\u0645\u062D\u062A\u0648\u0649');
      return;
    }

    if (w.showToast) w.showToast('\u23F3 \u062C\u0627\u0631\u064D \u0625\u0639\u062F\u0627\u062F PDF...');

    try {
      // تحميل المكتبات
      await Promise.all([loadJsPDF(), loadHtml2Canvas()]);
    } catch(e) {
      if (w.showToast) w.showToast('\u274C \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ' + e.message);
      return;
    }

    try {
      // التقاط العنصر بصرياً
      var canvas = await w.html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#181818',
        logging: false,
        removeContainer: true,
        allowTaint: false
      });

      var { jsPDF } = w.jspdf;
      var doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      var today = new Date().toLocaleDateString('ar-QA');
      var headerOpts = {
        title:      opts.title      || 'QatarSpec Pro — AI Report',
        project:    opts.project    || '',
        reportType: opts.reportType || 'AI Analysis | QCS 2024',
        today:      today
      };

      // الصفحة الأولى
      drawHeader(doc, headerOpts);
      drawWatermark(doc);

      // حساب أبعاد الصورة
      var usableW  = PAGE.w - PAGE.margin * 2;
      var usableH  = PAGE.h - 35 - 14; // 35 header + 14 footer
      var imgRatio = canvas.height / canvas.width;
      var imgH     = usableW * imgRatio;
      var startY   = 33;

      if (imgH <= usableH) {
        // الصورة تتسع في صفحة واحدة
        var imgData = canvas.toDataURL('image/jpeg', 0.88);
        doc.addImage(imgData, 'JPEG', PAGE.margin, startY, usableW, imgH);
      } else {
        // تقسيم الصورة على صفحات متعددة
        var scale    = canvas.width / usableW;
        var sliceH   = Math.floor(usableH * scale);
        var offsetY  = 0;
        var pageNum  = 0;

        while (offsetY < canvas.height) {
          if (pageNum > 0) {
            doc.addPage();
            drawHeader(doc, headerOpts);
            drawWatermark(doc);
            startY = 33;
          }

          var sliceCanvas  = document.createElement('canvas');
          sliceCanvas.width  = canvas.width;
          sliceCanvas.height = Math.min(sliceH, canvas.height - offsetY);
          sliceCanvas.getContext('2d').drawImage(
            canvas,
            0, offsetY,
            canvas.width, sliceCanvas.height,
            0, 0,
            canvas.width, sliceCanvas.height
          );

          var sliceData = sliceCanvas.toDataURL('image/jpeg', 0.88);
          var sliceImgH = sliceCanvas.height / scale;
          doc.addImage(sliceData, 'JPEG', PAGE.margin, startY, usableW, sliceImgH);

          offsetY += sliceH;
          pageNum++;
        }
      }

      // إضافة disclaimer نصي في آخر صفحة
      var disclaimer = opts.disclaimer ||
        '\u26A0\uFE0F \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0633\u062A\u0631\u0634\u0627\u062F\u064A \u0641\u0642\u0637. \u064A\u062C\u0628 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 QCS 2024 \u0627\u0644\u0623\u0635\u0644\u064A \u0642\u0628\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639.';

      // تذييل كل الصفحات
      var totalPages = doc.internal.getNumberOfPages();
      for (var p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        drawFooter(doc, p, totalPages);
      }

      // اسم الملف آمن
      var safeName = (opts.filename || 'QatarSpec-AI-Report')
        .replace(/[^\x00-\x7F]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 40) || 'QatarSpec-Report';

      doc.save(safeName + '.pdf');

      if (w.showToast) w.showToast('\u2705 \u062A\u0645 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 ' + safeName + '.pdf');

    } catch(err) {
      console.error('[QS PDF Export]', err);
      if (w.showToast) w.showToast('\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ' + err.message);
    }
  }

  // ═══════════════════════════════════════════════
  // دوال مخصصة للوحات AI
  // ═══════════════════════════════════════════════

  // تصدير تحليل الوثيقة
  w.daExportPDF = function() {
    exportElementAsPDF({
      elementId:  'da-result',
      title:      'Document Analysis Report',
      reportType: 'AI Document Analysis | QCS 2024',
      filename:   'QatarSpec-DA-' + new Date().toISOString().slice(0,10),
      disclaimer: '\u26A0\uFE0F \u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0633\u062A\u0631\u0634\u0627\u062F\u064A. \u064A\u062C\u0628 \u0645\u0631\u0627\u062C\u0639\u0629 QCS 2024 \u0627\u0644\u0623\u0635\u0644\u064A \u0648\u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0645\u062E\u062A\u0635.'
    });
  };

  // تصدير تقرير فحص الصور
  w.piExportPDF = function() {
    exportElementAsPDF({
      elementId:  'pi-result',
      title:      'Photo Inspection Report',
      reportType: 'AI Vision Inspection | QCS 2024',
      filename:   'QatarSpec-PI-' + new Date().toISOString().slice(0,10),
      disclaimer: '\u26A0\uFE0F \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0633\u062A\u0631\u0634\u0627\u062F\u064A. \u064A\u062C\u0628 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0645\u062E\u062A\u0635 \u0642\u0628\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639.'
    });
  };

  // ═══════════════════════════════════════════════
  // تصدير نتيجة حاسبة كـ PDF بصري
  // ═══════════════════════════════════════════════

  w.QS = w.QS || {};

  /**
   * تصدير نتيجة حاسبة بصرياً
   * @param {string} resultElementId - ID عنصر النتيجة
   * @param {string} calcName        - اسم الحاسبة
   * @param {string} qcsRef          - مرجع QCS
   */
  w.QS.exportCalcVisualPDF = function(resultElementId, calcName, qcsRef) {
    exportElementAsPDF({
      elementId:  resultElementId,
      title:      calcName || 'Calculator Results',
      reportType: qcsRef   || 'QCS 2024',
      filename:   'QatarSpec-Calc-' + (calcName || 'Result').replace(/\s+/g, '-').substring(0, 20)
                  + '-' + new Date().toISOString().slice(0,10)
    });
  };

  // تصدير عام لأي عنصر
  w.QS.exportElementPDF = exportElementAsPDF;

  console.log('%c[QS PDF] \u2705 AI PDF Export module loaded', 'color:#1a7a4a;font-weight:bold;');

})(window);
