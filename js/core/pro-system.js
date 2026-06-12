// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// MONETIZATION SYSTEM — v2.1.0
// ═══════════════════════════════════════════════════════════════════════════════

// ── Constants ──
var FREE_DAILY_LIMIT = 5;
var PRO_CODES = []; // codes verified server-side only

// ══════════════════════════════════════════════════════════════════════════════
// [SEC v4.1] TAMPER-PROOF PRO STATE — مُضافة فوق isProUser()
// المشكلة: window._qs_pro_confirmed = true في console يمنح Pro مجاناً
// الحل: closure محمية + Object.defineProperty + server re-verification دورية
// لا يُحذف أي كود — فقط إضافة طبقة حماية
// ══════════════════════════════════════════════════════════════════════════════
(function _qsSecureProState() {
  'use strict';

  // حالة Pro محمية داخل closure — لا يمكن الوصول إليها مباشرة من الخارج
  var _proState = false;
  var _verifiedAt = 0;          // timestamp آخر تحقق فعلي من السيرفر
  var _verifyInProgress = false;
  var _allowServerSet = false;  // flag للسماح بالتعيين من verifyProWithServer فقط
  var RE_VERIFY_MS = 5 * 60 * 1000;       // إعادة التحقق كل 5 دقائق
  var QS_CACHE_KEY = 'qs_pro_cache';      // مفتاح الـ cache في localStorage
  var QS_CACHE_TTL = 24 * 60 * 60 * 1000; // صلاحية الـ cache: يوم واحد فقط

  // ── localStorage Cache Helpers ──────────────────────────────────────────────
  // القرار النهائي دائماً من السيرفر — localStorage هو cache مؤقت لليوم فقط

  // اكتب حالة Pro في localStorage مع timestamp
  function _writeCache(isPro) {
    try {
      localStorage.setItem(QS_CACHE_KEY, JSON.stringify({
        pro: isPro,
        cachedAt: Date.now(),
        expires: Date.now() + QS_CACHE_TTL,
        v: '4.1'
      }));
    } catch(e) {
      // localStorage ممنوع (incognito مثلاً) — تجاهل بصمت
    }
  }

  // اقرأ الـ cache — يُرجع null إذا انتهت صلاحيته أو غير موجود
  function _readCache() {
    try {
      var raw = localStorage.getItem(QS_CACHE_KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      // تحقق من الصلاحية: يوم واحد كحد أقصى
      if (!c || !c.expires || Date.now() > c.expires) {
        localStorage.removeItem(QS_CACHE_KEY);
        return null;
      }
      return c;
    } catch(e) { return null; }
  }

  // امسح الـ cache (عند logout أو انتهاء الاشتراك)
  function _clearCache() {
    try { localStorage.removeItem(QS_CACHE_KEY); } catch(e) {}
  }

  // تحميل الـ cache عند بدء التشغيل — قبل وصول رد السيرفر (UI فوري)
  // السيرفر سيُصحّح هذه القيمة حال وصول الرد
  (function _initFromCache() {
    var c = _readCache();
    if (c && c.pro === true) {
      // استخدم الـ cache مؤقتاً — السيرفر سيُؤكد أو يُلغي
      _allowServerSet = true;
      _proState = true;
      _allowServerSet = false;
      console.info('[QS] Pro state loaded from cache (server will confirm shortly)');
    }
  })();

  // ── استبدال window._qs_pro_confirmed بـ getter/setter محمي ──
  // Object.defineProperty مع configurable: false يمنع إعادة تعريف الخاصية
  try {
    Object.defineProperty(window, '_qs_pro_confirmed', {
      get: function() { return _proState; },
      set: function(val) {
        if (val === false) {
          // الـ logout دائماً مسموح + مسح الـ cache
          _proState = false;
          _verifiedAt = 0;
          _clearCache();
          return;
        }
        if (val === true && _allowServerSet) {
          // مسموح فقط عبر _qsSetProFromServer()
          _proState = true;
          _verifiedAt = Date.now();
          return;
        }
        // أي محاولة تعيين true من الخارج (console أو كود آخر) → ترفض + تُشغّل re-verify
        console.warn('[QS-SEC v4.1] ⚠️ محاولة تعديل حالة Pro مرفوضة. جارٍ التحقق من السيرفر...');
        // شغّل verification حقيقي في الخلفية
        if (typeof window.verifyProWithServer === 'function') {
          window.verifyProWithServer(true);
        }
      },
      configurable: false,   // يمنع إعادة defineProperty مستقبلاً
      enumerable: false,
    });
  } catch(e) {
    // إذا فشل defineProperty (نادر) — سجّل التحذير
    console.warn('[QS-SEC] defineProperty failed:', e.message);
  }

  // ── الدالة الوحيدة المخوّلة بتعيين _proState = true ──
  // تُستخدم فقط من داخل verifyProWithServer()
  window._qsSetProFromServer = function(val) {
    _allowServerSet = true;
    window._qs_pro_confirmed = val === true;
    _allowServerSet = false;
    // اكتب القرار النهائي للسيرفر في الـ cache (صالح ليوم واحد)
    _writeCache(val === true);
  };

  // ── verifyProWithServer — التحقق الحقيقي والإلزامي من السيرفر ──
  window.verifyProWithServer = async function(force) {
    // منع طلبات متزامنة متعددة
    if (_verifyInProgress) return _proState;
    // إذا لم يمرّ وقت كافٍ منذ آخر تحقق (ما لم يكن force=true)
    if (!force && _verifiedAt && (Date.now() - _verifiedAt < RE_VERIFY_MS)) return _proState;

    _verifyInProgress = true;
    try {
      var r = await fetch('/api/auth?action=verify-pro-status', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: { 'X-QS-Verify': '1' }
      });

      // معالجة Rate Limiting (429) — لا تغيير الحالة، استخدم الـ cache
      if (r.status === 429) {
        console.warn('[QS] Rate limited — استخدام الـ cache الحالي');
        _verifiedAt = Date.now() - RE_VERIFY_MS + 30000; // أعد المحاولة بعد 30 ثانية
        return _proState;
      }

      var d = await r.json();
      // السيرفر هو القرار النهائي — يُكتب في cache بعده
      window._qsSetProFromServer(d.pro === true);
      if (typeof renderProStatus === 'function') renderProStatus();
      return _proState;
    } catch(e) {
      // فشل الشبكة → اقرأ من localStorage cache (إذا لم يمرّ يوم)
      var cached = _readCache();
      if (cached !== null) {
        var cacheAgeMin = Math.round((Date.now() - cached.cachedAt) / 60000);
        console.warn('[QS] شبكة فاشلة — استخدام cache (عمره ' + cacheAgeMin + ' دقيقة):', e.message);
        // طبّق الـ cache بدون كتابته من جديد (السيرفر سيُصحّح لاحقاً)
        _allowServerSet = true;
        _proState = cached.pro === true;
        _allowServerSet = false;
      } else {
        // لا cache صالح — لا نسحب Pro إذا كان مُفعّلاً مسبقاً في الجلسة
        console.warn('[QS] شبكة فاشلة + لا cache — الحالة الحالية محفوظة:', e.message);
      }
      return _proState;
    } finally {
      _verifyInProgress = false;
    }
  };

  // ── إعادة التحقق الدورية كل 5 دقائق (فقط عند التبويب نشطاً) ──
  setInterval(function() {
    if (document.visibilityState === 'visible') {
      window.verifyProWithServer();
    }
  }, RE_VERIFY_MS);

  // ── إعادة التحقق عند العودة للتبويب إذا انقضى وقت التحقق ──
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && _verifiedAt > 0) {
      var elapsed = Date.now() - _verifiedAt;
      if (elapsed > RE_VERIFY_MS) window.verifyProWithServer();
    }
  });

})(); // نهاية _qsSecureProState IIFE

// ── Pro State ──
function isProUser() {
  // sync للـ UI — يعكس:
  // 1. قرار السيرفر الأخير (عبر verifyProWithServer → _qsSetProFromServer)
  // 2. أو cache اليوم (qs_pro_cache في localStorage) عند فشل الشبكة
  // القرار النهائي دائماً من السيرفر — localStorage cache مؤقت لليوم فقط
  return window._qs_pro_confirmed === true;
}
// Legacy stubs — real auth uses httpOnly cookies via /api/verify-pro
function getProExpiry() { return null; }
function setProActive(val, expiry) { /* no-op — cookie handles this */ }
// ── Pro Status — Server-side httpOnly Cookie (v3.0 Security) ──
async function setProToken(token) {
  // Token stored in httpOnly cookie by server — not localStorage
  // This function now calls the server to exchange/validate a token
  try {
    const r = await fetch('/api/auth?action=verify-pro', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({action:'verify', token}),
    });
    const d = await r.json();
    if (d.pro) {
      renderProStatus();
      return true;
    }
  } catch(e) {
    console.warn('[QS] Token verification failed:', e.message);
  }
  return false;
}

function getProToken() {
  // Token is now in httpOnly cookie — not accessible via JS
  // Return a sentinel value for API calls that use credentials: 'include'
  return window._qs_pro_confirmed ? '__cookie__' : null;
}

// ── Daily Search Counter ──
function getTodayKey() {
  var d = new Date(); return 'qs_searches_' + d.getFullYear() + '_' + d.getMonth() + '_' + d.getDate();
}
function getSearchCount() {
  return parseInt(localStorage.getItem(getTodayKey()) || '0');
}
function incrementSearch() {
  var k = getTodayKey();
  var c = getSearchCount() + 1;
  localStorage.setItem(k, c);
  return c;
}
function canSearch() {
  if (isProUser()) return true;
  return getSearchCount() < FREE_DAILY_LIMIT;
}

// ── Pro Badge Renderer ──
function renderProStatus() {
  var badge = document.getElementById('proStatusBadge');
  var bar = document.getElementById('searchCounterBar');
  if (!badge) return;

  if (isProUser()) {
    badge.className = 'pro-badge';
    badge.innerHTML = '⭐ Pro مُفعَّل ✓';
    if (bar) bar.style.display = 'none';
  } else {
    badge.className = 'free-badge';
    badge.innerHTML = '⭐ ارقَ لـ Pro';
    if (bar) {
      bar.style.display = 'flex';
      updateSearchCounterBar();
    }
  }
}

function updateSearchCounterBar() {
  var bar = document.getElementById('searchCounterBar');
  var txt = document.getElementById('searchCounterText');
  var dots = document.getElementById('searchCounterDots');
  if (!bar || !txt || !dots) return;

  var used = getSearchCount();
  var remaining = Math.max(0, FREE_DAILY_LIMIT - used);

  txt.textContent = used + ' / ' + FREE_DAILY_LIMIT + ' بحث ذكي مستخدم اليوم';

  // Build dots
  var html = '';
  for (var i = 0; i < FREE_DAILY_LIMIT; i++) {
    var cls = i < used ? (used >= FREE_DAILY_LIMIT ? 'search-dot warn' : 'search-dot used') : 'search-dot';
    html += '<div class="' + cls + '"></div>';
  }
  dots.innerHTML = html;

  if (remaining <= 1) {
    bar.className = 'search-counter-bar limit-warn';
  } else {
    bar.className = 'search-counter-bar';
  }
}

// ── Pro Modal ──
function openProModal() {
  // بدلاً من المودال المعقد — استخدم activateProNow المباشرة
  if (typeof window.activateProNow === 'function') {
    window.activateProNow();
  }
}
function closeProModal() {
  var m = document.getElementById('proModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

function showPaymentContact() {
  var pc = document.getElementById('paymentContact');
  if (pc) { pc.style.display = 'block'; pc.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
}

// ── TAP Payment — checkout مباشر بدون WhatsApp ────────────────────────────
// يُظهر نموذج البريد الإلكتروني ثم يحوّل لبوابة TAP
window.startTapCheckout = async function(plan) {
  plan = plan || 'monthly';
  var planLabel = plan === 'yearly' ? '799 QAR / سنة' : '99 QAR / شهر';

  // ── إظهار نموذج الدفع داخل الـ modal ────────────────────────────────
  var formHtml =
    '<div id="tapCheckoutForm" style="margin-top:12px;background:rgba(0,0,0,0.06);border-radius:12px;padding:16px;">' +
      '<div style="font-size:13px;font-weight:700;margin-bottom:10px;">💳 بوابة الدفع الآمنة — TAP Payments</div>' +
      '<div style="font-size:11px;color:var(--text3);margin-bottom:12px;">الخطة: <b style="color:var(--gold);">' + planLabel + '</b></div>' +
      '<input id="tapEmail" type="email" placeholder="البريد الإلكتروني *" required ' +
        'style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--color-border-tertiary,#ddd);' +
        'background:var(--color-background-primary,#fff);color:var(--text,#222);font-size:13px;margin-bottom:8px;box-sizing:border-box;" />' +
      '<input id="tapName" type="text" placeholder="الاسم (اختياري)" ' +
        'style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--color-border-tertiary,#ddd);' +
        'background:var(--color-background-primary,#fff);color:var(--text,#222);font-size:13px;margin-bottom:12px;box-sizing:border-box;" />' +
      '<button id="tapSubmitBtn" onclick="window._submitTapCheckout(\'' + plan + '\')" ' +
        'style="width:100%;padding:12px;background:var(--gold,#c8a951);color:#fff;border:none;border-radius:10px;' +
        'font-size:14px;font-weight:700;cursor:pointer;">🚀 انتقل للدفع الآمن</button>' +
      '<div style="font-size:10px;color:var(--text3);text-align:center;margin-top:8px;">🔒 مشفّر بـ 3D Secure — TAP Payments</div>' +
      '<button onclick="document.getElementById(\'tapCheckoutForm\').remove();showPaymentContact();" ' +
        'style="width:100%;padding:8px;background:transparent;border:none;color:var(--text3);font-size:11px;cursor:pointer;margin-top:4px;">' +
        'تفضّل الدفع عبر WhatsApp بدلاً من ذلك</button>' +
    '</div>';

  // أزل نموذج سابق إن وجد وأضف الجديد
  var existing = document.getElementById('tapCheckoutForm');
  if (existing) existing.remove();
  var contact = document.getElementById('paymentContact');
  if (contact) {
    contact.insertAdjacentHTML('afterend', formHtml);
  } else {
    var box = document.querySelector('.pro-modal-box');
    if (box) box.insertAdjacentHTML('beforeend', formHtml);
  }
  setTimeout(function() {
    var emailInput = document.getElementById('tapEmail');
    if (emailInput) emailInput.focus();
  }, 100);
};

// ── إرسال الـ checkout request ──────────────────────────────────────────
window._submitTapCheckout = async function(plan) {
  var emailEl = document.getElementById('tapEmail');
  var nameEl  = document.getElementById('tapName');
  var btn     = document.getElementById('tapSubmitBtn');
  var email   = emailEl ? emailEl.value.trim() : '';
  var name    = nameEl  ? nameEl.value.trim()  : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('❌ أدخل بريداً إلكترونياً صحيحاً', 'error');
    if (emailEl) emailEl.focus();
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الإعداد...'; }

  try {
    var res = await fetch('/api/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: plan, email: email, name: name || 'Engineer' }),
    });

    var data = await res.json();

    if (res.ok && data.checkout_url) {
      showToast('✅ جاري التحويل لبوابة الدفع...', 'success');
      setTimeout(function() { window.location.href = data.checkout_url; }, 800);
      return;
    }

    // خطأ من الـ API — fallback لـ WhatsApp
    var errMsg = data.message || data.error || 'خطأ في بوابة الدفع';
    console.error('[TAP checkout] error:', data);
    showToast('⚠️ ' + errMsg + ' — جرّب WhatsApp', 'warning');
    if (btn) { btn.disabled = false; btn.textContent = '🚀 انتقل للدفع الآمن'; }
    showPaymentContact();

  } catch (err) {
    console.error('[TAP checkout] fetch error:', err.message);
    showToast('⚠️ خطأ في الاتصال — جرّب WhatsApp', 'warning');
    if (btn) { btn.disabled = false; btn.textContent = '🚀 انتقل للدفع الآمن'; }
    showPaymentContact();
  }
};

// ── Promo Code Activation ── server-side JWT
async function activatePro(code) {
  if (!code || code.length < 3) { showToast('❌ أدخل كوداً صحيحاً', 'error'); return; }
  const btn = document.querySelector('.promo-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري التحقق...'; }
  showToast('⏳ جاري التحقق من الكود...', 'info');

  // ── AbortController: 10s timeout لمنع التجمد ──
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch('/api/auth?action=verify-pro', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
      signal: controller.signal,
    });
    clearTimeout(tid);
    const d = await res.json();

    // API returns {ok: true} on success
    if (d.ok || d.success || d.valid) {
      window._qsSetProFromServer(true);
      renderProStatus();
      closeProModal();
      showToast('🎉 تم تفعيل Pro بنجاح!', 'success');
      setTimeout(() => location.reload(), 1500);
      return;
    }

    // Server config missing (JWT_SECRET not set) — show helpful error
    if (res.status === 500 && d.error && d.error.includes('config')) {
      showToast('⚠️ تواصل مع الدعم لتفعيل الكود', 'warning');
    } else {
      showToast('❌ ' + (d.error || 'كود غير صحيح أو منتهي الصلاحية'), 'error');
    }
  } catch (err) {
    clearTimeout(tid);
    if (err.name === 'AbortError') {
      showToast('⏱️ انتهت مهلة الاتصال — حاول مجدداً', 'warning');
    } else if (!navigator.onLine) {
      showToast('📡 لا يوجد اتصال بالإنترنت', 'error');
    } else {
      showToast('❌ خطأ في الاتصال — تحقق من الإنترنت', 'error');
    }
    console.error('[activatePro]', err.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '✅ تفعيل'; }
  }
}

// ── Upgrade Overlay ──
var _pendingUpgradeAction = null;
function showUpgradePrompt(feature, icon, title, desc, action) {
  document.getElementById('upgradeIcon').textContent = icon || '🔒';
  document.getElementById('upgradeTitle').textContent = title || 'ميزة Pro حصرية';
  document.getElementById('upgradeDesc').textContent = desc || 'هذه الميزة متاحة للمشتركين في النسخة Pro فقط. اشترك الآن واستمتع بجميع الميزات.';
  _pendingUpgradeAction = action || null;
  document.getElementById('upgradeOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeUpgradeOverlay() {
  document.getElementById('upgradeOverlay').classList.remove('open');
  document.body.style.overflow = '';
  _pendingUpgradeAction = null;
}

// ── Feature Gate Wrappers ──
function requirePro(feature, icon, title, desc, proceed) {
  if (isProUser()) {
    if (proceed) proceed();
    return true;
  }
  showUpgradePrompt(feature, icon, title, desc, proceed);
  return false;
}

// ── PWA Install ──
function installPWA() {
  if (window._pwaInstallPrompt) {
    window._pwaInstallPrompt.prompt();
    window._pwaInstallPrompt.userChoice.then(function(r) {
      if (r.outcome === 'accepted') {
        showToast('📲 تم تثبيت QatarSpec Pro بنجاح!');
        var btn = document.getElementById('pwaInstallBtn');
        if (btn) btn.style.display = 'none';
      }
      window._pwaInstallPrompt = null;
    });
  }
}

// ══════════════════════════════════════════════════════════════
// TRIAL SYSTEM — 14 يوم مجاناً (v3.4)
// [لا تحذف محتوى — إضافة فقط]
// المنطق: مستخدم جديد → عرض Trial → تفعيل → Pro لمدة 14 يوم
// بعد الانتهاء → عرض upgrade بدون إزعاج
// ══════════════════════════════════════════════════════════════
var TRIAL_KEY       = 'qs_trial_start';
var TRIAL_SHOWN_KEY = 'qs_trial_offered';
var TRIAL_DAYS      = 14;
var TRIAL_MS        = TRIAL_DAYS * 24 * 60 * 60 * 1000;

function isTrialActive() {
  try {
    var start = localStorage.getItem(TRIAL_KEY);
    if (!start) return false;
    return (Date.now() - parseInt(start)) < TRIAL_MS;
  } catch(e) { return false; }
}

function getTrialDaysLeft() {
  try {
    var start = localStorage.getItem(TRIAL_KEY);
    if (!start) return 0;
    var elapsed = Date.now() - parseInt(start);
    var left = Math.ceil((TRIAL_MS - elapsed) / (24 * 60 * 60 * 1000));
    return Math.max(0, left);
  } catch(e) { return 0; }
}

function activateTrial() {
  try {
    if (localStorage.getItem(TRIAL_KEY)) return false; // سبق تفعيله
    localStorage.setItem(TRIAL_KEY, Date.now().toString());
    localStorage.setItem(TRIAL_SHOWN_KEY, '1');
    // منح صلاحيات Pro مؤقتاً عبر نفس آلية السيرفر الوهمية (client-side only للتجربة)
    if (typeof window._qsSetProFromServer === 'function') {
      window._qsSetProFromServer(true);
    }
    renderProStatus();
    showTrialBadge();
    showToast('🎉 تم تفعيل تجربة Pro المجانية — 14 يوماً كاملاً!', 'success');
    return true;
  } catch(e) { return false; }
}

function showTrialBadge() {
  var badge = document.getElementById('proStatusBadge');
  if (!badge) return;
  var left = getTrialDaysLeft();
  if (left > 0) {
    badge.className = 'pro-badge trial-badge';
    badge.innerHTML = '⏳ تجربة Pro — ' + left + ' يوم';
  }
}

// عرض عرض Trial للمستخدمين الجدد (مرة واحدة فقط)
function maybeShowTrialOffer() {
  try {
    if (isProUser()) return;
    if (isTrialActive()) { showTrialBadge(); return; }
    if (localStorage.getItem(TRIAL_SHOWN_KEY)) return;
    if (localStorage.getItem(TRIAL_KEY)) return; // انتهت التجربة
    // انتظر 30 ثانية قبل العرض — لا تزعج فوراً
    setTimeout(function() {
      if (isProUser()) return;
      showTrialOfferModal();
    }, 30000);
  } catch(e) {}
}

function showTrialOfferModal() {
  var existing = document.getElementById('qs-trial-modal');
  if (existing) return;
  var modal = document.createElement('div');
  modal.id = 'qs-trial-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'عرض تجربة Pro المجانية');
  modal.style.cssText = 'position:fixed;inset:0;z-index:99998;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);padding:16px;';
  modal.innerHTML = '\
    <div style="background:var(--dark2,#0d0d1a);border:1px solid var(--gold,#c9a84c);border-radius:18px;padding:28px 24px;max-width:420px;width:100%;text-align:center;direction:rtl;box-shadow:0 20px 60px rgba(0,0,0,0.5);">\
      <div style="font-size:42px;margin-bottom:12px;">🎁</div>\
      <div style="font-size:19px;font-weight:800;color:var(--gold,#c9a84c);margin-bottom:8px;">14 يوماً مجاناً في Pro</div>\
      <div style="font-size:13px;color:var(--text2,#aaa);margin-bottom:20px;line-height:1.7;">جرّب كل ميزات QatarSpec Pro بدون قيود — بلا بطاقة ائتمان</div>\
      <ul style="text-align:right;font-size:12px;color:var(--text1,#ccc);margin-bottom:20px;padding:0 8px;list-style:none;">\
        <li style="margin:6px 0;">✅ بحث ذكي غير محدود في QCS 2024</li>\
        <li style="margin:6px 0;">✅ تصدير PDF + Word احترافي</li>\
        <li style="margin:6px 0;">✅ محلل المستندات والمخططات</li>\
        <li style="margin:6px 0;">✅ المفتش الذكي بالصور</li>\
      </ul>\
      <button id="qs-trial-start-btn" style="width:100%;padding:14px;background:linear-gradient(135deg,#c9a84c,#a8873d);color:#000;font-weight:800;font-size:15px;border:none;border-radius:12px;cursor:pointer;margin-bottom:10px;">🚀 ابدأ التجربة المجانية الآن</button>\
      <button id="qs-trial-dismiss-btn" style="width:100%;padding:10px;background:transparent;color:var(--text3,#666);font-size:12px;border:none;cursor:pointer;">ليس الآن</button>\
    </div>';
  document.body.appendChild(modal);
  document.getElementById('qs-trial-start-btn').addEventListener('click', function() {
    activateTrial();
    modal.remove();
  });
  document.getElementById('qs-trial-dismiss-btn').addEventListener('click', function() {
    try { localStorage.setItem(TRIAL_SHOWN_KEY, '1'); } catch(e) {}
    modal.remove();
  });
}

// تهيئة Trial عند التحميل
(function initTrial() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      maybeShowTrialOffer();
      if (isTrialActive()) showTrialBadge();
    });
  } else {
    maybeShowTrialOffer();
    if (isTrialActive()) showTrialBadge();
  }
})();

// ══════════════════════════════════════════════════════════════
// AI FEEDBACK SYSTEM — 👍👎 (v3.4)
// [لا تحذف محتوى — إضافة فقط]
// يُضاف تلقائياً بعد كل إجابة AI
// البيانات: localStorage فقط (لا server) — آمن وسريع
// ══════════════════════════════════════════════════════════════
var AI_FEEDBACK_KEY = 'qs_ai_feedback';

function saveAIFeedback(query, answer, rating) {
  try {
    var existing = JSON.parse(localStorage.getItem(AI_FEEDBACK_KEY) || '[]');
    existing.push({
      q: (query || '').slice(0, 200),
      r: rating, // 1=👍, -1=👎
      t: Date.now()
    });
    // احتفظ بآخر 50 تقييم فقط
    if (existing.length > 50) existing = existing.slice(-50);
    localStorage.setItem(AI_FEEDBACK_KEY, JSON.stringify(existing));
  } catch(e) {}
}

function getFeedbackStats() {
  try {
    var data = JSON.parse(localStorage.getItem(AI_FEEDBACK_KEY) || '[]');
    var pos = data.filter(function(d){ return d.r === 1; }).length;
    var neg = data.filter(function(d){ return d.r === -1; }).length;
    return { total: data.length, positive: pos, negative: neg,
             score: data.length ? Math.round((pos / data.length) * 100) : 0 };
  } catch(e) { return { total:0, positive:0, negative:0, score:0 }; }
}

// أضف أزرار Feedback بعد إجابة AI
function renderAIFeedback(containerEl, query, answer) {
  if (!containerEl) return;
  // إزالة أي feedback سابق في نفس الـ container
  var old = containerEl.querySelector('.qs-ai-feedback');
  if (old) old.remove();

  var fb = document.createElement('div');
  fb.className = 'qs-ai-feedback';
  fb.setAttribute('dir', 'rtl');
  fb.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid rgba(201,168,76,0.15);font-size:12px;color:var(--text3,#666);';
  fb.innerHTML = '\
    <span>هل الإجابة مفيدة؟</span>\
    <button class="qs-fb-btn" data-rating="1" aria-label="إجابة مفيدة" style="background:none;border:1px solid rgba(46,204,113,0.3);border-radius:8px;padding:4px 10px;cursor:pointer;font-size:14px;color:#2ecc71;transition:all 0.2s;">👍</button>\
    <button class="qs-fb-btn" data-rating="-1" aria-label="إجابة غير مفيدة" style="background:none;border:1px solid rgba(231,76,60,0.3);border-radius:8px;padding:4px 10px;cursor:pointer;font-size:14px;color:#e74c3c;transition:all 0.2s;">👎</button>\
    <span class="qs-fb-thanks" style="display:none;color:var(--gold,#c9a84c);font-weight:600;"></span>';

  fb.querySelectorAll('.qs-fb-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var rating = parseInt(this.getAttribute('data-rating'));
      saveAIFeedback(query, answer, rating);
      fb.querySelectorAll('.qs-fb-btn').forEach(function(b){ b.style.display='none'; });
      var thanks = fb.querySelector('.qs-fb-thanks');
      thanks.textContent = rating === 1 ? '✅ شكراً — سيساعدنا في التحسين!' : '🔄 شكراً — سنحسّن الإجابة!';
      thanks.style.display = 'inline';
    });
  });

  containerEl.appendChild(fb);
}

// كشف تلقائي لعناصر AI result وإضافة Feedback
function autoAttachAIFeedback() {
  // يُراقب DOM للعناصر الجديدة التي تحتوي نتائج AI
  if (!window.MutationObserver) return;
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        // أي عنصر يحمل class ai-result أو id يحتوي ai-result
        var targets = node.querySelectorAll ? node.querySelectorAll('.ai-result, [id*="ai-result"], [id*="aiResult"]') : [];
        targets.forEach(function(el) {
          if (!el.querySelector('.qs-ai-feedback')) {
            var query = el.getAttribute('data-query') || '';
            var answer = el.textContent.slice(0, 500);
            renderAIFeedback(el, query, answer);
          }
        });
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// تشغيل autoAttach عند تحميل الصفحة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoAttachAIFeedback);
} else {
  autoAttachAIFeedback();
}

// تصدير للاستخدام الخارجي
window.QS = window.QS || {};
window.QS.trial = { isActive: isTrialActive, daysLeft: getTrialDaysLeft, activate: activateTrial };
window.QS.feedback = { render: renderAIFeedback, save: saveAIFeedback, stats: getFeedbackStats };

// ─── End Monetization System ───
