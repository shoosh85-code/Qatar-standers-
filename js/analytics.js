/**
 * QatarSpec Pro — Monitoring & Analytics Module
 * المرحلة 11 | تتبع الأخطاء + Web Vitals + Business Metrics
 * No PII collection | QCS 2024
 */

/* global gtag */

const QatarSpecAnalytics = {

  // ═══════════════════════════════════════════════════
  // تهيئة النظام
  // ═══════════════════════════════════════════════════
  init() {
    this.queue    = [];
    this.flushTimer = null;
    this.session  = this._genSessionId();

    this.trackWebVitals();
    this.trackErrors();
    this.trackNavigation();

    // إرسال دوري كل 60 ثانية
    setInterval(() => this.flush(), 60000);

    // إرسال عند إغلاق الصفحة
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.flush();
    });
  },

  // ═══════════════════════════════════════════════════
  // Web Vitals — LCP / CLS / FCP / TTFB
  // ═══════════════════════════════════════════════════
  trackWebVitals() {
    // استخدام PerformanceObserver المدمج — لا يحتاج CDN
    try {
      // LCP — Largest Contentful Paint
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        this.send('web_vital', { name: 'LCP', value: Math.round(last.startTime), rating: last.startTime < 2500 ? 'good' : last.startTime < 4000 ? 'needs-improvement' : 'poor' });
      });
      lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (_) { /* غير مدعوم */ }

    try {
      // CLS — Cumulative Layout Shift
      let clsValue = 0;
      const clsObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((e) => { if (!e.hadRecentInput) clsValue += e.value; });
        this.send('web_vital', { name: 'CLS', value: +clsValue.toFixed(4), rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor' });
      });
      clsObs.observe({ type: 'layout-shift', buffered: true });
    } catch (_) { /* غير مدعوم */ }

    try {
      // FCP — First Contentful Paint
      const fcpObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((e) => {
          if (e.name === 'first-contentful-paint') {
            this.send('web_vital', { name: 'FCP', value: Math.round(e.startTime), rating: e.startTime < 1800 ? 'good' : e.startTime < 3000 ? 'needs-improvement' : 'poor' });
          }
        });
      });
      fcpObs.observe({ type: 'paint', buffered: true });
    } catch (_) { /* غير مدعوم */ }

    // TTFB من Navigation Timing
    window.addEventListener('load', () => {
      try {
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav) {
          const ttfb = Math.round(nav.responseStart - nav.requestStart);
          this.send('web_vital', { name: 'TTFB', value: ttfb, rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor' });
        }
      } catch (_) { /* غير مدعوم */ }
    });
  },

  // ═══════════════════════════════════════════════════
  // تتبع الأخطاء — JS errors + Unhandled rejections
  // ═══════════════════════════════════════════════════
  trackErrors() {
    window.addEventListener('error', (e) => {
      // تجاهل أخطاء CDN خارجية لا علاقة لنا بها
      if (e.filename && !e.filename.includes(location.hostname) && !e.filename.includes('localhost')) return;
      this.send('error', {
        message:  e.message,
        filename: e.filename ? e.filename.split('/').pop() : 'unknown', // لا نحفظ path كاملة
        lineno:   e.lineno,
        colno:    e.colno,
        stack:    e.error?.stack ? e.error.stack.split('\n').slice(0, 5).join(' | ') : null,
      });
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.send('unhandledrejection', {
        reason: e.reason?.message || String(e.reason).substring(0, 200),
      });
    });
  },

  // ═══════════════════════════════════════════════════
  // تتبع التنقل بين الأقسام
  // ═══════════════════════════════════════════════════
  trackNavigation() {
    // تتبع نقرات الكروت
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[onclick*="openDetail"]');
      if (card) {
        const id = (card.getAttribute('onclick') || '').match(/openDetail\(['"]([^'"]+)['"]\)/)?.[1];
        if (id) this.event('section_open', { section_id: id });
      }
    });
  },

  // ═══════════════════════════════════════════════════
  // Business Metrics — Pro conversion + feature usage
  // ═══════════════════════════════════════════════════
  trackProConversion(step) {
    // step: 'prompt_shown' | 'upgrade_clicked' | 'checkout_started' | 'subscribed'
    this.event('pro_conversion', { step });
    if (typeof gtag !== 'undefined') gtag('event', 'pro_conversion_' + step);
  },

  trackCalculatorUsage(calcId, result) {
    // لا نحفظ القيم الدقيقة — فقط pass/fail + اسم الحاسبة
    this.event('calculator_used', {
      calc_id: calcId,
      result:  result === 'pass' || result === 'fail' ? result : 'completed',
    });
  },

  trackSearchUsage(hasResults) {
    this.event('search_used', { has_results: hasResults });
  },

  trackExport(format) {
    // format: 'pdf' | 'word' | 'excel'
    this.event('export_used', { format });
  },

  trackAIUsage(tier, feature) {
    // tier: 'free' | 'pro' | feature: 'doc_analyzer' | 'photo_analyzer' etc.
    this.event('ai_used', { tier, feature });
  },

  // ═══════════════════════════════════════════════════
  // إرسال حدث عام
  // ═══════════════════════════════════════════════════
  event(name, params) {
    params = params || {};
    if (typeof gtag !== 'undefined') {
      gtag('event', name, params);
    }
    this.send('event', { name, params, ts: Date.now() });
  },

  // ═══════════════════════════════════════════════════
  // قائمة الانتظار — batching لتقليل الطلبات
  // ═══════════════════════════════════════════════════
  send(type, data) {
    if (!this.queue) this.queue = [];
    // لا PII — تأكد عدم وجود بيانات شخصية
    const safe = this._sanitize(data);
    this.queue.push({ type, data: safe, s: this.session });

    if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => this.flush(), 30000);
    }
  },

  async flush() {
    if (!this.queue || !this.queue.length) return;
    const batch = this.queue.splice(0, 20);
    this.flushTimer = null;

    try {
      await fetch('/api/analytics', {
        method:    'POST',
        headers:   { 'Content-Type': 'application/json' },
        body:      JSON.stringify({ batch }),
        keepalive: true,
      });
    } catch (_) {
      // أعد العناصر للقائمة عند فشل الإرسال (بحد أقصى 100)
      if (this.queue.length < 100) this.queue.unshift(...batch);
    }
  },

  // ═══════════════════════════════════════════════════
  // مساعدات داخلية
  // ═══════════════════════════════════════════════════
  _genSessionId() {
    // معرف جلسة عشوائي — لا يُخزّن في localStorage
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  },

  _sanitize(data) {
    if (!data || typeof data !== 'object') return data;
    const safe = {};
    const PII_PATTERNS = /email|phone|name|user|password|token|key|secret/i;
    Object.keys(data).forEach((k) => {
      if (PII_PATTERNS.test(k)) return; // تجاهل الحقول الحساسة
      const v = data[k];
      // اقتصار النصوص على 500 حرف
      safe[k] = typeof v === 'string' ? v.substring(0, 500) : v;
    });
    return safe;
  },
};

// تصدير للـ window
window.QatarSpecAnalytics = QatarSpecAnalytics;

// تهيئة تلقائية
QatarSpecAnalytics.init();
