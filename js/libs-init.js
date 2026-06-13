/**
 * js/libs-init.js — QatarSpec Pro
 * تهيئة المكتبات الجديدة وربطها بـ window.QS
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  // ── Day.js — تنسيق التواريخ بالعربية ──────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof dayjs !== 'undefined') {
      dayjs.locale('ar');
      window.QS.formatDate = function(date, format) {
        return dayjs(date).format(format || 'DD/MM/YYYY');
      };
      window.QS.formatDateAr = function(date) {
        return dayjs(date).locale('ar').format('D MMMM YYYY');
      };
    }

    // ── Numeral.js — تنسيق الأرقام الهندسية ──────────────────────────
    if (typeof numeral !== 'undefined') {
      numeral.register('locale', 'ar-qa', {
        delimiters: { thousands: ',', decimal: '.' },
        abbreviations: { thousand: 'ألف', million: 'مليون', billion: 'مليار', trillion: 'تريليون' },
        ordinal: function(number) { return number + '.'; },
        currency: { symbol: 'ر.ق' }
      });
      numeral.locale('ar-qa');
      window.QS.formatNum = function(n, decimals) {
        return numeral(n).format('0,0.' + '0'.repeat(decimals || 2));
      };
      window.QS.formatArea = function(n) { return window.QS.formatNum(n, 2) + ' م²'; };
      window.QS.formatVol = function(n) { return window.QS.formatNum(n, 2) + ' م³'; };
      window.QS.formatLen = function(n) { return window.QS.formatNum(n, 2) + ' م'; };
    }

    // ── Showdown — Markdown → HTML للتقارير AI ────────────────────────
    if (typeof showdown !== 'undefined') {
      const converter = new showdown.Converter({
        tables: true, strikethrough: true, ghCodeBlocks: true,
        tasklists: true, simpleLineBreaks: true
      });
      window.QS.mdToHtml = function(md) {
        return converter.makeHtml(md || '');
      };
    }

    // ── Papa Parse — استيراد CSV ──────────────────────────────────────
    if (typeof Papa !== 'undefined') {
      window.QS.parseCSV = function(file, onComplete) {
        Papa.parse(file, {
          header: true, skipEmptyLines: true, dynamicTyping: true,
          complete: function(results) { onComplete(results.data, results.errors); },
          error: function(err) { console.error('[QS-CSV]', err); }
        });
      };
      window.QS.parseCSVText = function(text, onComplete) {
        Papa.parse(text, {
          header: true, skipEmptyLines: true, dynamicTyping: true,
          complete: function(results) { onComplete(results.data); }
        });
      };
    }

    // ── html2canvas — تصوير أقسام الصفحة ─────────────────────────────
    if (typeof html2canvas !== 'undefined') {
      window.QS.captureElement = async function(selector, filename) {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!el) return;
        const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#0d0d0d' });
        const link = document.createElement('a');
        link.download = (filename || 'qatarspec-export') + '.png';
        link.href = canvas.toDataURL();
        link.click();
      };
    }

    // ── Signature Pad — توقيع رقمي ───────────────────────────────────
    if (typeof SignaturePad !== 'undefined') {
      window.QS.initSignaturePad = function(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        const pad = new SignaturePad(canvas, {
          backgroundColor: 'rgba(255,255,255,0)',
          penColor: '#C9A84C'
        });
        // resize
        function resize() {
          const ratio = Math.max(window.devicePixelRatio || 1, 1);
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext('2d').scale(ratio, ratio);
          pad.clear();
        }
        window.addEventListener('resize', resize);
        resize();
        return pad;
      };
    }

    // ── math.js — حسابات هندسية متقدمة ───────────────────────────────
    if (typeof math !== 'undefined') {
      window.QS.math = math;
      // مثال: حساب eigenvalues لمصفوفات الإجهاد
      window.QS.calcStressMatrix = function(sx, sy, txy) {
        const avg = (sx + sy) / 2;
        const R = Math.sqrt(Math.pow((sx - sy) / 2, 2) + Math.pow(txy, 2));
        return {
          sigma1: avg + R,  // الإجهاد الرئيسي الأكبر
          sigma2: avg - R,  // الإجهاد الرئيسي الأصغر
          tauMax: R,        // أقصى إجهاد قص
          theta: Math.atan2(2 * txy, sx - sy) / 2 * (180 / Math.PI)
        };
      };
    }

    // ── Hammer.js — إيماءات اللمس ────────────────────────────────────
    if (typeof Hammer !== 'undefined') {
      window.QS.initSwipe = function(el, onLeft, onRight) {
        const hammer = new Hammer(el);
        hammer.on('swipeleft', onLeft || function(){});
        hammer.on('swiperight', onRight || function(){});
        return hammer;
      };
    }

    // ── D3.js — رسوم بيانية متقدمة ───────────────────────────────────
    if (typeof d3 !== 'undefined') {
      window.QS.D3 = d3;

      // رسم Grading Curve للتربة/الركام
      window.QS.drawGradingCurve = function(containerId, data, options) {
        const opts = options || {};
        const margin = { top: 20, right: 30, bottom: 50, left: 60 };
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        const width = (container.offsetWidth || 400) - margin.left - margin.right;
        const height = (opts.height || 300) - margin.top - margin.bottom;

        const svg = d3.select('#' + containerId)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLog().domain([0.01, 100]).range([0, width]);
        const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

        // Grid
        svg.append('g').attr('class', 'grid')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(''))
          .selectAll('line').style('stroke', 'rgba(255,255,255,0.1)');

        // Axes
        svg.append('g').attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + ' mm'))
          .selectAll('text').style('fill', '#B0A898').style('font-size', '10px');

        svg.append('g')
          .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%'))
          .selectAll('text').style('fill', '#B0A898').style('font-size', '10px');

        // Labels
        svg.append('text').attr('x', width / 2).attr('y', height + 40)
          .attr('text-anchor', 'middle').style('fill', '#C9A84C').style('font-size', '11px')
          .text('حجم الفتحة (مم)');
        svg.append('text').attr('transform', 'rotate(-90)')
          .attr('x', -height / 2).attr('y', -45)
          .attr('text-anchor', 'middle').style('fill', '#C9A84C').style('font-size', '11px')
          .text('نسبة المار (%)');

        // Line
        const line = d3.line().x(d => x(d.size)).y(d => y(d.passing)).curve(d3.curveMonotoneX);
        svg.append('path').datum(data)
          .attr('fill', 'none').attr('stroke', '#C9A84C').attr('stroke-width', 2.5)
          .attr('d', line);

        // Points
        svg.selectAll('.dot').data(data).enter().append('circle')
          .attr('cx', d => x(d.size)).attr('cy', d => y(d.passing))
          .attr('r', 4).attr('fill', '#E8C97A').attr('stroke', '#7a1515').attr('stroke-width', 1.5);
      };

      // رسم مخطط Mohr Circle
      window.QS.drawMohrCircle = function(containerId, sigma1, sigma2) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        const size = Math.min(container.offsetWidth || 300, 300);
        const svg = d3.select('#' + containerId).append('svg')
          .attr('width', size).attr('height', size);
        const cx = size / 2, cy = size / 2;
        const center = (sigma1 + sigma2) / 2;
        const R = Math.abs(sigma1 - sigma2) / 2;
        const scale = (size * 0.4) / (R || 1);

        // Circle
        svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', R * scale)
          .attr('fill', 'rgba(201,168,76,0.1)').attr('stroke', '#C9A84C').attr('stroke-width', 2);

        // Center point
        svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 3).attr('fill', '#E8C97A');

        // Labels
        svg.append('text').attr('x', cx).attr('y', 20).attr('text-anchor', 'middle')
          .style('fill', '#C9A84C').style('font-size', '12px')
          .text(`σ₁=${sigma1.toFixed(1)} | σ₂=${sigma2.toFixed(1)} | τmax=${R.toFixed(1)} MPa`);
      };
    }

    // ── Plotly.js — رسوم 3D وتفاعلية متقدمة ──────────────────────────
    if (typeof Plotly !== 'undefined') {
      window.QS.Plotly = Plotly;

      // رسم Soil Profile
      window.QS.drawSoilProfile = function(containerId, layers) {
        const container = document.getElementById(containerId);
        if (!container || !layers || !layers.length) return;

        const colors = ['#8B6914', '#A0522D', '#6B4423', '#C9A84C', '#D2B48C'];
        const y = layers.map((l, i) => -layers.slice(0, i).reduce((s, ll) => s + ll.thickness, 0) - l.thickness / 2);
        const text = layers.map(l => `${l.name}<br>${l.description || ''}`);

        Plotly.newPlot(containerId, [{
          x: layers.map((_, i) => colors.length),
          y: y,
          type: 'bar', orientation: 'h',
          marker: { color: layers.map((_, i) => colors[i % colors.length]) },
          text: text, textposition: 'inside',
          hoverinfo: 'text'
        }], {
          paper_bgcolor: '#141414', plot_bgcolor: '#141414',
          font: { color: '#e8e0d0', family: 'Cairo' },
          xaxis: { visible: false },
          yaxis: { title: 'العمق (م)', tickfont: { color: '#B0A898' } },
          margin: { l: 60, r: 20, t: 20, b: 20 },
          showlegend: false
        }, { responsive: true, displayModeBar: false });
      };
    }

    // ── Intro.js — جولة تعليمية ───────────────────────────────────────
    if (typeof introJs !== 'undefined') {
      window.QS.startTour = function(steps) {
        introJs().setOptions({
          steps: steps || [],
          nextLabel: 'التالي ←',
          prevLabel: '→ السابق',
          doneLabel: 'إنهاء',
          skipLabel: 'تخطي',
          showProgress: true,
          showBullets: false,
          exitOnOverlayClick: true,
          disableInteraction: false,
          overlayOpacity: 0.6,
          tooltipClass: 'qs-intro-tooltip',
          highlightClass: 'qs-intro-highlight'
        }).start();
      };

      // جولة الصفحة الرئيسية
      window.QS.startMainTour = function() {
        window.QS.startTour([
          { element: '#search-input', intro: '🔍 ابحث عن أي مواصفة أو حاسبة في QCS 2024', position: 'bottom' },
          { element: '.section-group', intro: '📚 الأقسام مرتبة حسب التخصص — اضغط على أي كارت', position: 'right' },
          { element: '.analyze-btn, .calc-btn', intro: '🧮 اضغط للحساب الفوري مع مرجع QCS 2024', position: 'top' },
        ]);
      };
    }

    // ── Fabric.js — رسم على المخططات ─────────────────────────────────
    if (typeof fabric !== 'undefined') {
      window.QS.Fabric = fabric;
      window.QS.initDrawingCanvas = function(canvasId, options) {
        const canvas = new fabric.Canvas(canvasId, {
          isDrawingMode: false,
          backgroundColor: 'transparent',
          ...options
        });
        canvas.freeDrawingBrush.color = '#C9A84C';
        canvas.freeDrawingBrush.width = 2;
        return canvas;
      };
    }


    // ── جولة تعليمية تلقائية للمستخدم الجديد ────────────────────────
    if (typeof introJs !== 'undefined' && (window.location.pathname === '/' || window.location.pathname.includes('index'))) {
      const tourShown = localStorage.getItem('qs_tour_shown');
      if (!tourShown) {
        setTimeout(function() {
          window.QS.startMainTour && window.QS.startMainTour();
          localStorage.setItem('qs_tour_shown', '1');
        }, 2000);
      }
    }

    // ── CSV Import Button — أضف لكل حاسبة ───────────────────────────
    window.QS.showCSVImporter = function(onData) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv,.txt';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (typeof Papa !== 'undefined') {
          window.QS.parseCSV(file, function(data, errors) {
            if (errors && errors.length) console.warn('[QS-CSV] errors:', errors);
            onData(data);
          });
        } else {
          const reader = new FileReader();
          reader.onload = function(e) {
            const lines = e.target.result.split('\n').filter(Boolean);
            const headers = lines[0].split(',');
            const rows = lines.slice(1).map(line => {
              const vals = line.split(',');
              return headers.reduce((obj, h, i) => { obj[h.trim()] = vals[i]?.trim(); return obj; }, {});
            });
            onData(rows);
          };
          reader.readAsText(file);
        }
      };
      input.click();
    };

    // ── html2canvas — زر تصوير النتائج ───────────────────────────────
    window.QS.addCaptureBtn = function(targetSelector, label) {
      const target = document.querySelector(targetSelector);
      if (!target || typeof html2canvas === 'undefined') return;
      const btn = document.createElement('button');
      btn.textContent = '📸 ' + (label || 'حفظ كصورة');
      btn.style.cssText = 'background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);color:#C9A84C;border-radius:8px;padding:6px 14px;font-family:Cairo,sans-serif;font-size:12px;cursor:pointer;margin:4px;';
      btn.onclick = function() { window.QS.captureElement(target, 'qatarspec-result'); };
      target.insertAdjacentElement('afterend', btn);
    };


    // ── Hammer.js — Swipe للموبايل ────────────────────────────────────
    if (typeof Hammer !== 'undefined') {
      const mainContent = document.querySelector('.content-wrap, main, #main-content, body');
      if (mainContent) {
        const hammer = new Hammer(mainContent);
        hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        hammer.on('swipeleft', function() {
          // فتح القائمة الجانبية أو التنقل للأمام
          const nextSection = document.querySelector('.section-group.active ~ .section-group');
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
        });
        hammer.on('swiperight', function() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }



    // ── WhatsApp Export ───────────────────────────────────────────────────────
    window.QS.shareWhatsApp = function(text, title) {
      const msg = (title ? '*' + title + '*\n\n' : '') + 
                  (text || '') + 
                  '\n\n_QatarSpec Pro — qatar-standers.vercel.app_';
      const url = 'https://wa.me/?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
    };

    window.QS.addWhatsAppBtn = function(targetSelector, getTextFn) {
      const target = document.querySelector(targetSelector);
      if (!target) return;
      const btn = document.createElement('button');
      btn.innerHTML = '📱 واتساب';
      btn.style.cssText = 'background:rgba(37,211,102,0.15);border:1px solid rgba(37,211,102,0.4);color:#25d366;border-radius:8px;padding:5px 12px;font-family:Cairo,sans-serif;font-size:12px;cursor:pointer;margin:4px;';
      btn.onclick = function() {
        const text = getTextFn ? getTextFn() : target.innerText;
        window.QS.shareWhatsApp(text, 'نتيجة QatarSpec Pro');
      };
      target.insertAdjacentElement('afterend', btn);
    };

    // ── QCS Clause Linker ─────────────────────────────────────────────────────
    // Clicking on any QCS reference (e.g. "QCS 2024 Part 8 §8.4") opens the section
    window.QS.initClauseLinker = function(container) {
      const el = container || document;
      el.querySelectorAll('[data-qcs-clause], .qcs-ref, .qcs-reference').forEach(function(ref) {
        if (ref.dataset.clauseLinked) return;
        ref.dataset.clauseLinked = '1';
        ref.style.cursor = 'pointer';
        ref.style.textDecoration = 'underline dotted';
        ref.title = 'اضغط لفتح النص الأصلي في QCS 2024';
        ref.addEventListener('click', function(e) {
          e.stopPropagation();
          const clause = ref.dataset.qcsClause || ref.textContent;
          if (window.QS && window.QS.doSearch) {
            const inp = document.getElementById('searchInput');
            if (inp) { inp.value = clause; window.QS.doSearch(); }
          }
        });
      });
    };

    // Auto-init on page load
    document.addEventListener('DOMContentLoaded', function() {
      window.QS.initClauseLinker && window.QS.initClauseLinker();
    });


    // ── Auto WhatsApp buttons on calc results ─────────────────────────────
    document.addEventListener('DOMContentLoaded', function() {
      // Watch for calc results appearing
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          m.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              var results = node.querySelectorAll ? node.querySelectorAll('.calc-result, [id*="result"]:not(:empty)') : [];
              results.forEach(function(el) {
                if (!el.querySelector('.qs-wa-btn') && el.textContent.trim().length > 20) {
                  var btn = document.createElement('button');
                  btn.className = 'qs-wa-btn';
                  btn.innerHTML = '📱';
                  btn.title = 'مشاركة عبر واتساب';
                  btn.style.cssText = 'background:rgba(37,211,102,0.15);border:1px solid rgba(37,211,102,0.3);color:#25d366;border-radius:6px;padding:3px 8px;font-size:12px;cursor:pointer;margin:4px;float:left;';
                  btn.onclick = function() {
                    window.QS.shareWhatsApp && window.QS.shareWhatsApp(el.innerText.slice(0,500), 'نتيجة QatarSpec Pro');
                  };
                  el.insertAdjacentElement('afterbegin', btn);
                }
              });
            }
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });

    console.log('[QS-Libs] ✅ جميع المكتبات جاهزة:', {
      d3: typeof d3 !== 'undefined',
      plotly: typeof Plotly !== 'undefined',
      math: typeof math !== 'undefined',
      papaparse: typeof Papa !== 'undefined',
      html2canvas: typeof html2canvas !== 'undefined',
      signaturePad: typeof SignaturePad !== 'undefined',
      hammer: typeof Hammer !== 'undefined',
      numeral: typeof numeral !== 'undefined',
      dayjs: typeof dayjs !== 'undefined',
      showdown: typeof showdown !== 'undefined',
      introJs: typeof introJs !== 'undefined',
      fabric: typeof fabric !== 'undefined',
    });
  });
})();
