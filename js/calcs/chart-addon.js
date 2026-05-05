// QatarSpec Pro — Chart.js Addon للحاسبات
// المرحلة 4: رسوم بيانية تفاعلية (Pro only)
// @see QCS 2024 — عرض مرئي للنتائج مقابل المواصفة
// لا تعدل الحاسبات مباشرة — هذا addon يعمل فوقها

'use strict';

window.QS = window.QS || {};

// ── QS.addCalcChart ──
// يضيف رسم بياني بعد نتيجة الحاسبة (Pro فقط)
// @param containerId - ID لعنصر نتيجة الحاسبة (e.g. 'comp-result')
// @param type        - نوع الرسم: 'bar' | 'line' | 'doughnut'
// @param data        - Chart.js data object
// @param options     - Chart.js options (اختياري)
QS.addCalcChart = function(containerId, type, data, options) {
  // تحقق: Pro فقط
  if (typeof isProUser === 'function' && !isProUser()) {
    // أضف رسالة ترقية خفيفة
    const container = document.getElementById(containerId);
    if (container && !container.querySelector('.qs-chart-promo')) {
      const promo = document.createElement('div');
      promo.className = 'qs-chart-promo';
      promo.style.cssText = 'margin-top:8px;padding:6px 10px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;font-size:11px;color:var(--gold,#c9a84c);text-align:center;cursor:pointer;';
      promo.innerHTML = '📊 رسوم بيانية متاحة لـ <strong>Pro</strong> — <span style="text-decoration:underline">ارقَ الآن</span>';
      promo.onclick = function() {
        if (typeof openProModal === 'function') openProModal();
        else if (typeof openKeyModal === 'function') openKeyModal();
      };
      container.appendChild(promo);
    }
    return;
  }

  // تحقق: Chart.js متاح
  if (typeof Chart === 'undefined') return;

  const container = document.getElementById(containerId);
  if (!container) return;

  // أزل promo إذا موجود (المستخدم أصبح Pro)
  const promo = container.querySelector('.qs-chart-promo');
  if (promo) promo.remove();

  // أنشئ canvas wrapper إذا غير موجود
  let wrapper = container.querySelector('.qs-chart-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'qs-chart-wrapper';
    wrapper.style.cssText = 'margin-top:12px;padding:10px;background:rgba(0,0,0,0.15);border-radius:8px;border:1px solid var(--border,rgba(255,255,255,0.06));';
    container.appendChild(wrapper);
  }

  // أنشئ canvas أو استخدم الموجود
  let canvas = wrapper.querySelector('canvas.qs-chart');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'qs-chart';
    canvas.style.cssText = 'max-height:200px;width:100%;';
    wrapper.appendChild(canvas);
  }

  // دمّر chart قديم قبل إنشاء جديد
  if (canvas._chartInstance) {
    canvas._chartInstance.destroy();
    canvas._chartInstance = null;
  }

  // الألوان القياسية QatarSpec
  const QS_COLORS = {
    gold: '#c9a84c',
    maroon: '#7A1515',
    green: '#27ae60',
    red: '#e74c3c',
    blue: '#3498db',
    gridLine: 'rgba(255,255,255,0.05)',
    tickColor: 'rgba(255,255,255,0.4)',
  };

  // الإعدادات الافتراضية
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 400 },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: QS_COLORS.gold,
          font: { family: 'Tajawal, Arial, sans-serif', size: 11 },
          padding: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(20,20,30,0.9)',
        titleColor: QS_COLORS.gold,
        bodyColor: '#ccc',
        borderColor: QS_COLORS.gold,
        borderWidth: 1,
      },
    },
  };

  // أضف scale options للرسوم غير الـ doughnut
  if (type !== 'doughnut' && type !== 'pie' && type !== 'polarArea') {
    defaultOptions.scales = {
      x: {
        ticks: { color: QS_COLORS.tickColor, font: { family: 'Tajawal, Arial' } },
        grid: { color: QS_COLORS.gridLine },
      },
      y: {
        ticks: { color: QS_COLORS.tickColor, font: { family: 'Tajawal, Arial' } },
        grid: { color: QS_COLORS.gridLine },
        beginAtZero: true,
      },
    };
  }

  // دمج الخيارات
  const mergedOptions = Object.assign({}, defaultOptions, options || {});

  try {
    canvas._chartInstance = new Chart(canvas, {
      type: type,
      data: data,
      options: mergedOptions,
    });
  } catch (e) {
    // Chart.js فشل — لا يؤثر على الحاسبة
    console.warn('[QatarSpec] Chart.js error:', e);
  }
};

// ── QS.showCalcChart ──
// دالة مختصرة: تعرض مقارنة Actual vs Required بعد نتيجة الحاسبة
// @param elId    - نفس ID الـ calc-result
// @param actual  - القيمة الفعلية
// @param required - الحد المطلوب
// @param label   - اسم القياس (e.g. 'الكثافة')
// @param unit    - الوحدة (e.g. 'g/cm³')
// @param pass    - true/false
QS.showCalcChart = function(elId, actual, required, label, unit, pass) {
  if (actual === null || actual === undefined) return;
  if (required === null || required === undefined) return;

  const unitStr = unit ? ' (' + unit + ')' : '';
  const data = {
    labels: ['الفعلي' + unitStr, 'المطلوب' + unitStr],
    datasets: [{
      label: label || 'المقارنة',
      data: [parseFloat(actual), parseFloat(required)],
      backgroundColor: [
        pass ? 'rgba(39,174,96,0.7)' : 'rgba(231,76,60,0.7)',
        'rgba(201,168,76,0.5)',
      ],
      borderColor: [
        pass ? '#27ae60' : '#e74c3c',
        '#c9a84c',
      ],
      borderWidth: 2,
      borderRadius: 4,
    }],
  };

  QS.addCalcChart(elId, 'bar', data);
};

// ── QS.destroyChart ──
// تنظيف chart عند إغلاق panel
QS.destroyChart = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const canvas = container.querySelector('canvas.qs-chart');
  if (canvas && canvas._chartInstance) {
    canvas._chartInstance.destroy();
    canvas._chartInstance = null;
  }
};
