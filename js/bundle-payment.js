/* === js/payment.js === */
// js/payment.js — QatarSpec Pro Payment Integration
// يربط أزرار الاشتراك بـ /api/tap endpoint
// يجمع البريد الإلكتروني ← يرسل لـ TAP ← يفتح صفحة الدفع
// [SEC] لا يخزن أي بيانات حساسة في client-side

(function() {
  'use strict';

  /**
   * بدء عملية الدفع عبر TAP
   * @param {'monthly'|'yearly'} plan — نوع الخطة
   */
  window.startTapCheckout = async function startTapCheckout(plan) {
    if (plan !== 'monthly' && plan !== 'yearly') {
      console.error('[payment] خطة غير صالحة:', plan);
      return;
    }

    // جمع البريد الإلكتروني من المستخدم
    const email = prompt(
      plan === 'monthly'
        ? '📧 أدخل بريدك الإلكتروني للاشتراك الشهري (99 QAR/شهر):'
        : '📧 أدخل بريدك الإلكتروني للاشتراك السنوي (799 QAR/سنة — وفر 33%):',
      ''
    );

    if (!email || !email.trim()) return; // المستخدم ألغى

    // تحقق أولي من البريد
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('❌ البريد الإلكتروني غير صالح. حاول مرة أخرى.');
      return;
    }

    // عرض حالة التحميل
    const btn = event && event.target;
    const originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ جاري التحويل لبوابة الدفع...';
    }

    try {
      const res = await fetch('/api/tap?action=checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: plan,
          email: email.trim(),
          name: 'Engineer'
        })
      });

      const data = await res.json();

      if (!res.ok || !data.checkout_url) {
        // خدمة الدفع غير مهيأة — fallback لـ WhatsApp
        if (res.status === 503 || data.code === 'PAYMENT_NOT_CONFIGURED') {
          const msg = encodeURIComponent(
            'مرحباً، أريد الاشتراك في QatarSpec Pro — ' +
            (plan === 'monthly' ? 'شهري 99 QAR' : 'سنوي 799 QAR') +
            '\nالبريد: ' + email.trim()
          );
          window.open('https://wa.me/97450000000?text=' + msg, '_blank');
          alert('⚠️ بوابة الدفع غير جاهزة حالياً. تم فتح WhatsApp للتواصل المباشر.');
          return;
        }

        throw new Error(data.error || data.message || 'خطأ في إنشاء جلسة الدفع');
      }

      // التوجيه لصفحة الدفع
      window.location.href = data.checkout_url;

    } catch (err) {
      console.error('[payment] Error:', err.message);
      alert('❌ خطأ: ' + err.message + '\n\nحاول مرة أخرى أو تواصل عبر WhatsApp.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  };

  // ── معالجة callback بعد الدفع ────────────────────────────────────────────
  // عند العودة من TAP: /?payment=success#pro_token=...
  (function handlePaymentCallback() {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');

    if (payment === 'success') {
      // استخراج التوكن من hash
      const hash = window.location.hash;
      const tokenMatch = hash.match(/pro_token=([^&]+)/);
      if (tokenMatch) {
        const token = tokenMatch[1];
        // إرسال التوكن لـ verify-pro لإصدار httpOnly cookie
        fetch('/api/auth?action=verify-pro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: token })
        }).then(r => r.json()).then(data => {
          if (data.pro) {
            // تنظيف URL
            history.replaceState(null, '', '/');
            alert('🎉 مبروك! تم تفعيل اشتراكك في QatarSpec Pro بنجاح.');
            location.reload();
          }
        }).catch(() => {
          alert('✅ تم الدفع بنجاح! قد يستغرق التفعيل بضع دقائق.');
        });
      }
    } else if (payment === 'failed') {
      alert('❌ فشل الدفع. لم يتم خصم أي مبلغ. حاول مرة أخرى.');
      history.replaceState(null, '', '/');
    } else if (payment === 'error') {
      const reason = params.get('reason') || '';
      alert('⚠️ حدث خطأ في معالجة الدفع' + (reason ? ': ' + reason : '') + '. تواصل مع الدعم.');
      history.replaceState(null, '', '/');
    }
  })();

})();

/* === js/payment-certificates.js === */
/**
 * QatarSpec Pro — Payment Certificates & Cash Flow v1.0
 * حاسبة شهادات الدفع المؤقتة (IPC) والتدفق النقدي
 * FIDIC 2017 Clause 14.3, 14.6, 14.7
 * لا يحذف شيء — فقط يضيف
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  window.QS.paymentCert = {

    /**
     * حساب شهادة الدفع المؤقتة
     * @param {number} contractValue — قيمة العقد الإجمالية (QAR)
     * @param {number} durationMonths — مدة المشروع بالأشهر
     * @param {number[]} monthlyProgress — نسب الإنجاز الشهرية (مصفوفة)
     * @param {number} retentionRate — نسبة الاحتجاز (افتراضي 10%)
     * @param {number} advancePayment — دفعة مقدمة (افتراضي 0)
     * @param {number} advanceRecoveryRate — نسبة استرداد المقدمة شهرياً (افتراضي 0)
     * @returns {object} جدول شهري + ملخص
     */
    calculate: function(contractValue, durationMonths, monthlyProgress, retentionRate, advancePayment, advanceRecoveryRate) {
      retentionRate = retentionRate || 10;
      advancePayment = advancePayment || 0;
      advanceRecoveryRate = advanceRecoveryRate || 0;

      var rows = [];
      var cumProgress = 0;
      var cumGross = 0;
      var cumRetention = 0;
      var cumAdvRecovery = 0;
      var cumNetPaid = 0;

      for (var i = 0; i < durationMonths; i++) {
        var progress = (monthlyProgress && monthlyProgress[i]) ? monthlyProgress[i] : 0;
        cumProgress += progress;

        var grossThisMonth = contractValue * (progress / 100);
        cumGross += grossThisMonth;

        var retentionThisMonth = grossThisMonth * (retentionRate / 100);
        cumRetention += retentionThisMonth;

        var advRecovery = 0;
        if (advancePayment > 0 && advanceRecoveryRate > 0) {
          advRecovery = grossThisMonth * (advanceRecoveryRate / 100);
          if (cumAdvRecovery + advRecovery > advancePayment) {
            advRecovery = advancePayment - cumAdvRecovery;
          }
          cumAdvRecovery += advRecovery;
        }

        var netDue = grossThisMonth - retentionThisMonth - advRecovery;
        cumNetPaid += netDue;

        rows.push({
          month: i + 1,
          plannedProgress: progress,
          cumProgress: Math.round(cumProgress * 100) / 100,
          grossAmount: Math.round(grossThisMonth * 100) / 100,
          cumGross: Math.round(cumGross * 100) / 100,
          retention: Math.round(retentionThisMonth * 100) / 100,
          cumRetention: Math.round(cumRetention * 100) / 100,
          advanceRecovery: Math.round(advRecovery * 100) / 100,
          netDue: Math.round(netDue * 100) / 100,
          cumNetPaid: Math.round(cumNetPaid * 100) / 100
        });
      }

      return {
        contractValue: contractValue,
        duration: durationMonths,
        retentionRate: retentionRate,
        rows: rows,
        summary: {
          totalGross: Math.round(cumGross * 100) / 100,
          totalRetention: Math.round(cumRetention * 100) / 100,
          totalAdvRecovery: Math.round(cumAdvRecovery * 100) / 100,
          totalNetPaid: Math.round(cumNetPaid * 100) / 100,
          finalProgress: Math.round(cumProgress * 100) / 100
        }
      };
    },

    /**
     * توليد HTML للجدول
     */
    renderTable: function(result, lang) {
      lang = lang || 'ar';
      var isAr = lang === 'ar';
      var html = '<div style="overflow-x:auto;"><table class="dm-table" style="font-size:12px;min-width:700px;">';

      // رأس الجدول
      html += '<tr>';
      html += '<th>' + (isAr ? 'الشهر' : 'Month') + '</th>';
      html += '<th>' + (isAr ? 'الإنجاز %' : 'Progress %') + '</th>';
      html += '<th>' + (isAr ? 'إنجاز تراكمي %' : 'Cum. %') + '</th>';
      html += '<th>' + (isAr ? 'المبلغ الإجمالي' : 'Gross (QAR)') + '</th>';
      html += '<th>' + (isAr ? 'احتجاز ' + result.retentionRate + '%' : 'Retention ' + result.retentionRate + '%') + '</th>';
      html += '<th>' + (isAr ? 'صافي المستحق' : 'Net Due (QAR)') + '</th>';
      html += '<th>' + (isAr ? 'صافي تراكمي' : 'Cum. Net (QAR)') + '</th>';
      html += '</tr>';

      // صفوف البيانات
      result.rows.forEach(function(r) {
        html += '<tr>';
        html += '<td>' + r.month + '</td>';
        html += '<td>' + r.plannedProgress.toFixed(1) + '%</td>';
        html += '<td>' + r.cumProgress.toFixed(1) + '%</td>';
        html += '<td>' + r.grossAmount.toLocaleString() + '</td>';
        html += '<td style="color:#dc3545;">-' + r.retention.toLocaleString() + '</td>';
        html += '<td style="color:#28a745;font-weight:700;">' + r.netDue.toLocaleString() + '</td>';
        html += '<td>' + r.cumNetPaid.toLocaleString() + '</td>';
        html += '</tr>';
      });

      // صف الملخص
      var s = result.summary;
      html += '<tr style="background:rgba(201,168,76,0.1);font-weight:700;">';
      html += '<td>' + (isAr ? 'الإجمالي' : 'Total') + '</td>';
      html += '<td></td>';
      html += '<td>' + s.finalProgress.toFixed(1) + '%</td>';
      html += '<td>' + s.totalGross.toLocaleString() + '</td>';
      html += '<td style="color:#dc3545;">-' + s.totalRetention.toLocaleString() + '</td>';
      html += '<td style="color:#28a745;">' + s.totalNetPaid.toLocaleString() + '</td>';
      html += '<td>' + s.totalNetPaid.toLocaleString() + '</td>';
      html += '</tr>';

      html += '</table></div>';

      // ملخص FIDIC
      html += '<div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:12px;margin-top:12px;font-size:12px;">';
      html += '<strong>FIDIC Clause 14 Summary:</strong><br>';
      html += (isAr ? 'قيمة العقد: ' : 'Contract Value: ') + result.contractValue.toLocaleString() + ' QAR<br>';
      html += (isAr ? 'إجمالي المدفوعات: ' : 'Total Paid: ') + s.totalNetPaid.toLocaleString() + ' QAR<br>';
      html += (isAr ? 'إجمالي الاحتجاز: ' : 'Total Retention: ') + s.totalRetention.toLocaleString() + ' QAR<br>';
      html += (isAr ? 'المتبقي: ' : 'Remaining: ') + (result.contractValue - s.totalGross).toLocaleString() + ' QAR';
      html += '</div>';

      return html;
    },

    /**
     * رسم S-Curve باستخدام Chart.js (إذا كان محملاً)
     */
    renderSCurve: function(result, canvasId) {
      if (typeof Chart === 'undefined') {
        console.warn('[QS-Payment] Chart.js not loaded — S-Curve skipped');
        return;
      }
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;

      var labels = result.rows.map(function(r) { return 'M' + r.month; });
      var cumProgressData = result.rows.map(function(r) { return r.cumProgress; });
      var cumNetData = result.rows.map(function(r) { return r.cumNetPaid; });

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cumulative Progress %',
              data: cumProgressData,
              borderColor: '#c9a84c',
              backgroundColor: 'rgba(201,168,76,0.1)',
              fill: true,
              tension: 0.3,
              yAxisID: 'y'
            },
            {
              label: 'Cumulative Net Paid (QAR)',
              data: cumNetData,
              borderColor: '#28a745',
              backgroundColor: 'rgba(40,167,69,0.1)',
              fill: true,
              tension: 0.3,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'S-Curve — Progress vs Cash Flow',
              color: '#c9a84c'
            }
          },
          scales: {
            y: {
              type: 'linear',
              position: 'left',
              title: { display: true, text: 'Progress %', color: '#c9a84c' },
              max: 100
            },
            y1: {
              type: 'linear',
              position: 'right',
              title: { display: true, text: 'Net Paid (QAR)', color: '#28a745' },
              grid: { drawOnChartArea: false }
            }
          }
        }
      });
    }
  };

  console.log('[QS-PaymentCert] System initialized');
})();
