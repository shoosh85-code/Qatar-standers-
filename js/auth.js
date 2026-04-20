// js/auth.js — QatarSpec Pro
// Authentication module — reads ONLY from Supabase
// No hardcoded tokens or emails — uses NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY

(function () {
  'use strict';

  // ── Config from meta tags injected by Vercel (set in index.html head) ────
  // Falls back to window globals for legacy support
  const SUPABASE_URL =
    document.querySelector('meta[name="supabase-url"]')?.content ||
    window.SUPABASE_URL ||
    '';

  const SUPABASE_ANON_KEY =
    document.querySelector('meta[name="supabase-anon-key"]')?.content ||
    window.SUPABASE_ANON_KEY ||
    '';

  // ── Local storage keys ───────────────────────────────────────────────────
  const STORAGE_KEY_TOKEN = 'qsp_user_token';
  const STORAGE_KEY_USER  = 'qsp_user_data';

  // ── State ────────────────────────────────────────────────────────────────
  let currentUser = null;

  // ── Supabase REST helper (no SDK needed in browser) ──────────────────────
  async function supabaseFetch(path, options = {}) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase not configured');
    }

    const url = `${SUPABASE_URL}/rest/v1/${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    return res.json();
  }

  // ── Validate token against Supabase ─────────────────────────────────────
  async function validateToken(token) {
    if (!token || typeof token !== 'string' || token.length < 8) return null;

    try {
      const rows = await supabaseFetch(
        `users?token=eq.${encodeURIComponent(token)}&select=id,email,is_pro,is_active,plan,expires_at`,
        { method: 'GET' }
      );

      const user = rows?.[0];
      if (!user) return null;
      if (!user.is_active) return null;

      // Check expiry
      if (user.expires_at && new Date(user.expires_at) < new Date()) {
        return null;
      }

      return user;
    } catch (err) {
      console.warn('[Auth] Token validation failed:', err.message);
      return null;
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Initialize auth on page load.
   * Reads saved token → validates → updates UI
   */
  async function init() {
    const savedToken = localStorage.getItem(STORAGE_KEY_TOKEN);

    if (savedToken) {
      // Try cached user data first (fast path)
      const cached = localStorage.getItem(STORAGE_KEY_USER);
      if (cached) {
        try {
          currentUser = JSON.parse(cached);
          updateUI(currentUser);
        } catch {
          // ignore corrupt cache
        }
      }

      // Re-validate in background
      validateToken(savedToken).then((user) => {
        if (user) {
          currentUser = { ...user, token: savedToken };
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
          updateUI(currentUser);
        } else {
          logout(true); // silent logout — token expired/invalid
        }
      });
    } else {
      updateUI(null);
    }

    return currentUser;
  }

  /**
   * Activate with token (user enters token manually or via URL param)
   */
  async function activateWithToken(token) {
    showLoadingState(true);

    try {
      const user = await validateToken(token.trim());

      if (!user) {
        showError('رمز التفعيل غير صحيح أو منتهي الصلاحية');
        return false;
      }

      currentUser = { ...user, token: token.trim() };
      localStorage.setItem(STORAGE_KEY_TOKEN, token.trim());
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      updateUI(currentUser);
      closeAuthModal();
      showSuccess(user.is_pro ? '✅ تم تفعيل الاشتراك المميز!' : '✅ تم تسجيل الدخول');
      return true;
    } catch (err) {
      showError('حدث خطأ أثناء التحقق. يرجى المحاولة مجدداً.');
      return false;
    } finally {
      showLoadingState(false);
    }
  }

  /**
   * Logout
   */
  function logout(silent = false) {
    currentUser = null;
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    updateUI(null);
    if (!silent) showSuccess('تم تسجيل الخروج');
  }

  /**
   * Returns true if user is logged in (any tier)
   */
  function isLoggedIn() {
    return currentUser !== null;
  }

  /**
   * Returns true only for Pro/Enterprise users
   */
  function isPro() {
    return currentUser?.is_pro === true;
  }

  /**
   * Returns the stored token for API calls
   */
  function getToken() {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || null;
  }

  /**
   * Returns full user object or null
   */
  function getUser() {
    return currentUser;
  }

  // ── URL token auto-activation ────────────────────────────────────────────
  function checkURLToken() {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token') || params.get('activate');
    if (urlToken) {
      activateWithToken(urlToken).then((ok) => {
        if (ok) {
          // Clean token from URL
          const url = new URL(window.location.href);
          url.searchParams.delete('token');
          url.searchParams.delete('activate');
          window.history.replaceState({}, '', url.toString());
        }
      });
    }
  }

  // ── UI helpers ────────────────────────────────────────────────────────────
  function updateUI(user) {
    const isPremium = user?.is_pro === true;
    const isAuth    = user !== null;

    // Auth buttons
    document.querySelectorAll('[data-auth-show="logged-in"]').forEach((el) => {
      el.style.display = isAuth ? '' : 'none';
    });
    document.querySelectorAll('[data-auth-show="logged-out"]').forEach((el) => {
      el.style.display = isAuth ? 'none' : '';
    });
    document.querySelectorAll('[data-auth-show="pro"]').forEach((el) => {
      el.style.display = isPremium ? '' : 'none';
    });

    // User badge
    const badge = document.getElementById('user-badge');
    if (badge) {
      badge.textContent = isPremium
        ? `👑 ${user.email || 'Pro'}`
        : isAuth
        ? `👤 ${user.email || 'Free'}`
        : '';
      badge.style.display = isAuth ? '' : 'none';
    }

    // Plan label
    const planLabel = document.getElementById('plan-label');
    if (planLabel) {
      planLabel.textContent = isPremium ? '✨ مميز' : 'مجاني';
      planLabel.className = isPremium ? 'plan-badge pro' : 'plan-badge free';
    }

    // AI search gate
    document.querySelectorAll('[data-require-auth]').forEach((el) => {
      el.disabled = !isAuth;
      el.title = isAuth ? '' : 'يرجى تسجيل الدخول أولاً';
    });

    // Pro gate
    document.querySelectorAll('[data-require-pro]').forEach((el) => {
      el.disabled = !isPremium;
      el.title = isPremium ? '' : 'هذه الميزة للمشتركين المميزين فقط';
    });

    // Dispatch event for other modules to listen
    window.dispatchEvent(
      new CustomEvent('auth:changed', { detail: { user, isPremium, isAuth } })
    );
  }

  function showError(msg) {
    const el = document.getElementById('auth-error');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => (el.style.display = 'none'), 5000);
    } else {
      console.warn('[Auth]', msg);
    }
  }

  function showSuccess(msg) {
    const el = document.getElementById('auth-success') || document.getElementById('toast');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => (el.style.display = 'none'), 3000);
    } else {
      console.info('[Auth]', msg);
    }
  }

  function showLoadingState(loading) {
    const btn = document.getElementById('activate-btn');
    if (btn) {
      btn.disabled = loading;
      btn.textContent = loading ? 'جاري التحقق...' : 'تفعيل';
    }
  }

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal') || document.getElementById('login-modal');
    if (modal) modal.style.display = 'none';
  }

  // ── WhatsApp upgrade flow ─────────────────────────────────────────────────
  function openWhatsAppUpgrade() {
    const WHATSAPP_NUMBER = window.WHATSAPP_NUMBER || '97430000000'; // set in HTML
    const msg = encodeURIComponent(
      'مرحباً، أرغب في الاشتراك في QatarSpec Pro 🇶🇦\nالرجاء إرسال تفاصيل الاشتراك.'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  // ── DOM ready setup ────────────────────────────────────────────────────────
  function setupEventListeners() {
    // Activate button
    const activateBtn = document.getElementById('activate-btn');
    if (activateBtn) {
      activateBtn.addEventListener('click', () => {
        const input = document.getElementById('token-input');
        if (input?.value?.trim()) {
          activateWithToken(input.value.trim());
        } else {
          showError('يرجى إدخال رمز التفعيل');
        }
      });
    }

    // Token input: activate on Enter
    const tokenInput = document.getElementById('token-input');
    if (tokenInput) {
      tokenInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') activateBtn?.click();
      });
    }

    // Logout button
    document.getElementById('logout-btn')?.addEventListener('click', () => logout());

    // Upgrade button (WhatsApp)
    document.getElementById('upgrade-btn')?.addEventListener('click', openWhatsAppUpgrade);
    document.getElementById('whatsapp-upgrade')?.addEventListener('click', openWhatsAppUpgrade);
  }

  // ── Entry point ────────────────────────────────────────────────────────────
  function main() {
    checkURLToken();
    setupEventListeners();
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }

  // ── Expose public API ─────────────────────────────────────────────────────
  window.QSPAuth = {
    init,
    activateWithToken,
    logout,
    isLoggedIn,
    isPro,
    getToken,
    getUser,
    openWhatsAppUpgrade,
  };
})();
