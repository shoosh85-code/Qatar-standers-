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
