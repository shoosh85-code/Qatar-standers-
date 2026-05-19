/**
 * QatarSpec Pro — Toast System v2.0 (NO NOTYF)
 * ═══════════════════════════════════════════════
 * [FIX v2.0] Notyf أُزيل بالكامل — كان يسبب مستطيلات حمراء عالقة على اليمين في RTL
 * البديل: toast بسيط بـ CSS مخصص — يعمل مع RTL بدون أي مشاكل
 */
(function() {
  'use strict';

  // ═══ 1. إنشاء عنصر Toast واحد ═══
  function createToastEl() {
    var el = document.getElementById('qs-toast-v2');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'qs-toast-v2';
    el.style.cssText = 'position:fixed;bottom:24px;left:24px;right:auto;z-index:99999;' +
      'padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;' +
      'font-family:Tajawal,Cairo,sans-serif;direction:rtl;color:#fff;' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.4);max-width:340px;min-width:200px;' +
      'transform:translateY(80px);opacity:0;transition:all .3s cubic-bezier(0.34,1.56,0.64,1);' +
      'pointer-events:auto;cursor:pointer;line-height:1.5;';
    el.onclick = function() { hideToast(el); };
    document.body.appendChild(el);
    return el;
  }

  function hideToast(el) {
    el.style.transform = 'translateY(80px)';
    el.style.opacity = '0';
  }

  var _colors = {
    success: '#0F6E56',
    error:   '#A32D2D',
    warning: '#854F0B',
    info:    '#185FA5',
    pro:     '#7A1515'
  };

  var _timer = null;

  function showToastV2(msg, type, duration) {
    if (!msg) return;
    var el = createToastEl();
    // تحديد النوع من البادئة
    if (!type) {
      if (msg.startsWith('✅') || msg.startsWith('🎉')) type = 'success';
      else if (msg.startsWith('❌')) type = 'error';
      else if (msg.startsWith('⚠️') || msg.startsWith('📡') || msg.startsWith('⏳')) type = 'warning';
      else type = 'info';
    }
    el.textContent = msg;
    el.style.background = _colors[type] || _colors.info;
    // أظهر
    clearTimeout(_timer);
    requestAnimationFrame(function() {
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    });
    // أخفِ بعد المدة
    _timer = setTimeout(function() { hideToast(el); }, duration || (type === 'error' ? 5000 : 3500));
  }

  // ═══ 2. استبدال showToast العالمية ═══
  window.showToast = showToastV2;

  // ═══ 3. QS.notify API (متوافق مع الكود الموجود) ═══
  window.QS = window.QS || {};
  window.QS.notify = {
    success: function(m) { showToastV2(m, 'success'); },
    error:   function(m) { showToastV2(m, 'error'); },
    warning: function(m) { showToastV2(m, 'warning'); },
    info:    function(m) { showToastV2(m, 'info'); },
    pro:     function(m) { showToastV2(m, 'pro'); }
  };
  // Fake toast object للتوافق مع الكود اللي يستدعي QS.toast.success() مباشرة
  window.QS.toast = {
    success: function(m) { showToastV2(m, 'success'); },
    error:   function(m) { showToastV2(m, 'error'); },
    open:    function(o) { showToastV2(o && o.message, o && o.type); },
    dismiss: function() {},
    _initialized: true,
    _activeErrorToast: null
  };

  // ═══ 4. استبدال window.alert ═══
  var _alertCount = 0;
  var _alertResetTimer = null;
  (function() {
    var _native = window.alert;
    window.alert = function(msg) {
      if (!msg) return;
      // Rate limit: max 3 per 5 seconds
      _alertCount++;
      if (_alertCount > 3) { console.warn('[QS-toast] alert suppressed:', String(msg).substring(0,50)); return; }
      clearTimeout(_alertResetTimer);
      _alertResetTimer = setTimeout(function() { _alertCount = 0; }, 5000);

      var m = String(msg);
      if (m.startsWith('✅') || m.startsWith('🎉') || m.includes('بنجاح') || m.includes('تم'))
        showToastV2(m, 'success');
      else if (m.startsWith('❌') || m.includes('خطأ') || m.includes('خطاء') || m.includes('فشل'))
        showToastV2(m, 'error');
      else if (m.startsWith('⚠️') || m.startsWith('📡') || m.includes('تجاوزت'))
        showToastV2(m, 'warning');
      else if (m.includes('Pro') || m.includes('اشترك'))
        showToastV2(m, 'pro');
      else
        showToastV2(m, 'info');
      console.log('[QS-alert→toast]', m);
    };
  })();

  // ═══ 5. 429 Rate Limit Interceptor ═══
  (function() {
    var _origFetch = window.fetch;
    window.fetch = function() {
      return _origFetch.apply(this, arguments).then(function(response) {
        if (response.status === 429) {
          var retryAfter = response.headers.get('Retry-After');
          showToastV2('⏳ تجاوزت حد الطلبات — انتظر ' + (retryAfter || '60') + ' ثانية', 'warning');
        }
        return response;
      });
    };
  })();

  // ═══ 6. Offline/Online ═══
  window.addEventListener('offline', function() { showToastV2('📡 انقطع الاتصال', 'warning'); });
  window.addEventListener('online', function() { showToastV2('✅ عاد الاتصال', 'success'); });

  // ═══ 7. إخفاء #toast القديم ═══
  var oldToast = document.getElementById('toast');
  if (oldToast) oldToast.style.display = 'none';

  // ═══ 8. قتل كل عناصر Notyf المتبقية ═══
  function killNotyf() {
    document.querySelectorAll('.notyf, .notyf__toast, .notyf-announcer, [class*="notyf"]').forEach(function(el) {
      el.remove();
    });
  }
  killNotyf();
  setTimeout(killNotyf, 1000);
  setTimeout(killNotyf, 3000);
  setInterval(killNotyf, 5000);

  // ═══ 9. Pro events ═══
  document.addEventListener('qs:pro-activated', function() { showToastV2('🎉 مرحباً في QatarSpec Pro!', 'pro'); });
  document.addEventListener('qs:export-success', function(e) { showToastV2('✅ تم تصدير ' + ((e.detail||{}).format||'') + ' بنجاح', 'success'); });
  document.addEventListener('qs:api-error', function(e) { showToastV2('❌ ' + ((e.detail||{}).message||'خطأ'), 'error'); });

  console.log('[QS-Toast v2.0] ✅ Toast بسيط بدون Notyf — لا مستطيلات حمراء');
})();
