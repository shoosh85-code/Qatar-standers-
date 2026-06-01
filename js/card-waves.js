/**
 * QatarSpec Pro — Card Wave System v1.0
 * موجات ذهبية حية داخل كل كارت
 * خفيفة في الحالة العادية — تتوهج عند hover
 */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const SELECTORS = [
    '.cat-card', '.plan-card', '.ai-card',
    '.feature-card', '.metric-card', '.upload-zone'
  ];

  /* ── إعدادات لكل نوع كارت ── */
  const CONFIGS = {
    'cat-card':     { lines:3, baseAlpha:.07, hoverAlpha:.22, speed:.014, amp:18, color:'201,169,110' },
    'plan-card':    { lines:4, baseAlpha:.08, hoverAlpha:.26, speed:.012, amp:22, color:'201,169,110' },
    'ai-card':      { lines:3, baseAlpha:.06, hoverAlpha:.20, speed:.010, amp:16, color:'201,169,110' },
    'feature-card': { lines:3, baseAlpha:.06, hoverAlpha:.18, speed:.013, amp:14, color:'201,169,110' },
    'metric-card':  { lines:2, baseAlpha:.07, hoverAlpha:.20, speed:.015, amp:12, color:'201,169,110' },
    'upload-zone':  { lines:4, baseAlpha:.05, hoverAlpha:.18, speed:.009, amp:20, color:'201,169,110' },
  };

  function getConfig(el) {
    for (const [cls, cfg] of Object.entries(CONFIGS)) {
      if (el.classList.contains(cls)) return cfg;
    }
    return CONFIGS['cat-card'];
  }

  /* ── بناء الموجات لكل كارت ── */
  function buildWaves(cfg, count) {
    return Array.from({ length: count }, (_, i) => ({
      yRatio: (i + 1) / (count + 1),          // توزيع عمودي متساوي
      amp:    cfg.amp * (.7 + Math.random() * .6),
      freq:   .012 + Math.random() * .008,
      speed:  cfg.speed * (.8 + Math.random() * .4),
      phase:  Math.random() * Math.PI * 2,
      width:  .6 + Math.random() * .7,
    }));
  }

  /* ── إنشاء canvas داخل كارت ── */
  function initCard(el) {
    // لا تكرر
    if (el.querySelector('._cw')) return;

    const cfg = getConfig(el);

    // ضع canvas كأول ابن
    const cvs = document.createElement('canvas');
    cvs.className = '_cw';
    cvs.style.cssText = [
      'position:absolute', 'inset:0', 'width:100%', 'height:100%',
      'pointer-events:none', 'z-index:0', 'border-radius:inherit',
      'opacity:1', 'transition:opacity .4s'
    ].join(';');

    // تأكد الكارت له position
    const pos = getComputedStyle(el).position;
    if (pos === 'static') el.style.position = 'relative';

    el.insertBefore(cvs, el.firstChild);

    const ctx = cvs.getContext('2d');
    const waves = buildWaves(cfg, cfg.lines);
    let W = 0, H = 0, t = Math.random() * 100, hovering = false, alphaT = 0, raf;

    function resize() {
      const r = el.getBoundingClientRect();
      W = cvs.width  = r.width  || el.offsetWidth  || 200;
      H = cvs.height = r.height || el.offsetHeight || 120;
    }

    function drawFrame() {
      if (!W || !H) { resize(); }
      ctx.clearRect(0, 0, W, H);

      // Alpha interpolation — smooth hover transition
      const targetAlpha = hovering ? cfg.hoverAlpha : cfg.baseAlpha;
      alphaT += (targetAlpha - alphaT) * .06;

      waves.forEach((w, i) => {
        const yCenter = H * w.yRatio;
        ctx.beginPath();

        const steps = Math.max(Math.ceil(W / 4), 40);
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * W;
          const y = yCenter
            + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
            + Math.sin(x * w.freq * 1.8 + t * w.speed * .6 + w.phase + 1.2) * (w.amp * .3)
            + Math.sin(x * w.freq * .35 + t * w.speed * .25) * (w.amp * .15);
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        // Gradient اليسار لليمين داخل الكارت
        const gr = ctx.createLinearGradient(0, 0, W, 0);
        const a = alphaT * (1 - i * .15); // الخطوط السفلية أخف قليلاً
        gr.addColorStop(0,   `rgba(${cfg.color},0)`);
        gr.addColorStop(.12, `rgba(${cfg.color},${a * .7})`);
        gr.addColorStop(.45, `rgba(232,201,144,${a * 1.1})`);
        gr.addColorStop(.8,  `rgba(${cfg.color},${a * .7})`);
        gr.addColorStop(1,   `rgba(${cfg.color},0)`);

        ctx.strokeStyle = gr;
        ctx.lineWidth   = w.width + (hovering ? .4 : 0);
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.stroke();
      });

      // Hover — إضافة توهج خفيف في المركز
      if (alphaT > cfg.baseAlpha + .02) {
        const glow = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*.55);
        glow.addColorStop(0, `rgba(201,169,110,${(alphaT - cfg.baseAlpha) * .18})`);
        glow.addColorStop(1, 'rgba(201,169,110,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      }

      t += .008;
      raf = requestAnimationFrame(drawFrame);
    }

    // Hover events
    el.addEventListener('mouseenter', () => { hovering = true; });
    el.addEventListener('mouseleave', () => { hovering = false; });

    // Resize observer
    if (window.ResizeObserver) {
      new ResizeObserver(() => resize()).observe(el);
    }

    // Start after first paint
    setTimeout(() => { resize(); drawFrame(); }, 100 + Math.random() * 300);

    // Pause when off-screen للأداء
    if (window.IntersectionObserver) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { if (!raf) drawFrame(); }
        else { cancelAnimationFrame(raf); raf = null; }
      }, { threshold: 0 }).observe(el);
    }
  }

  /* ── تطبيق على كل الكروت الموجودة ── */
  function applyAll() {
    document.querySelectorAll(SELECTORS.join(',')).forEach(initCard);
  }

  /* ── مراقبة الكروت الجديدة (lazy loaded) ── */
  function watchDOM() {
    new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (SELECTORS.some(s => node.matches && node.matches(s))) initCard(node);
          node.querySelectorAll && node.querySelectorAll(SELECTORS.join(',')).forEach(initCard);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ── Boot ── */
  function boot() {
    applyAll();
    watchDOM();
    console.log('%c✦ Card Waves active', 'color:#C9A96E;font-family:serif');
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();

})();
