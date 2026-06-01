/**
 * QatarSpec Pro — Card Wave System v3.0
 * موجات ذهبية حية داخل كل كارت — مضمونة التشغيل
 */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const SELECTORS = '.cat-card,.plan-card,.ai-card,.feature-card,.metric-card,.upload-zone,.spec-row,.modal-box,.detail-modal,.upgrade-box';

  const CFGS = {
    'cat-card':     { n:3, base:.09, hover:.28, spd:.016, amp:16, col:'201,169,110' },
    'plan-card':    { n:4, base:.10, hover:.30, spd:.013, amp:20, col:'201,169,110' },
    'ai-card':      { n:3, base:.08, hover:.24, spd:.011, amp:15, col:'201,169,110' },
    'feature-card': { n:3, base:.08, hover:.22, spd:.014, amp:13, col:'201,169,110' },
    'metric-card':  { n:2, base:.09, hover:.24, spd:.016, amp:11, col:'201,169,110' },
    'upload-zone':  { n:4, base:.07, hover:.22, spd:.010, amp:18, col:'201,169,110' },
    'spec-row':     { n:2, base:.06, hover:.18, spd:.012, amp:8,  col:'201,169,110' },
    'modal-box':    { n:4, base:.06, hover:.18, spd:.009, amp:22, col:'201,169,110' },
    'detail-modal': { n:4, base:.06, hover:.18, spd:.009, amp:22, col:'201,169,110' },
    'upgrade-box':  { n:3, base:.07, hover:.20, spd:.011, amp:16, col:'201,169,110' },
  };

  function getCfg(el) {
    for (const [k, v] of Object.entries(CFGS))
      if (el.classList.contains(k)) return v;
    return CFGS['cat-card'];
  }

  function makeWaves(cfg) {
    return Array.from({ length: cfg.n }, (_, i) => ({
      yr:    (i + 1) / (cfg.n + 1),
      amp:   cfg.amp * (.75 + Math.random() * .5),
      f1:    .010 + Math.random() * .008,
      f2:    .018 + Math.random() * .006,
      f3:    .004 + Math.random() * .003,
      spd:   cfg.spd * (.8 + Math.random() * .4),
      ph:    Math.random() * Math.PI * 2,
      lw:    .55 + Math.random() * .7,
    }));
  }

  function attachCard(el) {
    if (el.dataset.cwInit) return;
    el.dataset.cwInit = '1';

    const cfg   = getCfg(el);
    const waves = makeWaves(cfg);

    /* ── canvas ── */
    const cvs = document.createElement('canvas');
    cvs.style.cssText = [
      'position:absolute','inset:0','width:100%','height:100%',
      'pointer-events:none','z-index:0','border-radius:inherit',
    ].join(';');
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.insertBefore(cvs, el.firstChild);

    const ctx = cvs.getContext('2d');
    let W = 0, H = 0, t = Math.random() * 60;
    let hovering = false, alpha = cfg.base, running = true;

    /* ── resize — force pixel dimensions ── */
    function resize() {
      W = el.offsetWidth;
      H = el.offsetHeight;
      if (!W || !H) {
        const r = el.getBoundingClientRect();
        W = r.width; H = r.height;
      }
      cvs.width  = W;
      cvs.height = H;
    }

    /* ── draw one frame ── */
    function draw() {
      if (!running) return;
      if (!W || !H) resize();
      if (!W || !H) { requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      /* smooth alpha */
      const target = hovering ? cfg.hover : cfg.base;
      alpha += (target - alpha) * .055;

      waves.forEach((w, i) => {
        const yc = H * w.yr;
        ctx.beginPath();

        for (let s = 0; s <= 120; s++) {
          const x = (s / 120) * W;
          const y = yc
            + Math.sin(x * w.f1 + t * w.spd + w.ph)          * w.amp
            + Math.sin(x * w.f2 + t * w.spd * .6 + w.ph + 1) * w.amp * .28
            + Math.sin(x * w.f3 + t * w.spd * .25)            * w.amp * .14;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const a  = alpha * (1 - i * .12);
        const gr = ctx.createLinearGradient(0, 0, W, 0);
        gr.addColorStop(0,   `rgba(${w.col||cfg.col},0)`);
        gr.addColorStop(.1,  `rgba(${cfg.col},${a * .65})`);
        gr.addColorStop(.42, `rgba(232,201,144,${a * 1.15})`);
        gr.addColorStop(.78, `rgba(${cfg.col},${a * .65})`);
        gr.addColorStop(1,   `rgba(${cfg.col},0)`);

        ctx.strokeStyle = gr;
        ctx.lineWidth   = w.lw + (hovering ? .35 : 0);
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.stroke();
      });

      /* center glow on hover */
      if (alpha > cfg.base + .015) {
        const gl = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*.6);
        gl.addColorStop(0, `rgba(201,169,110,${(alpha-cfg.base)*.15})`);
        gl.addColorStop(1, 'rgba(201,169,110,0)');
        ctx.fillStyle = gl;
        ctx.fillRect(0, 0, W, H);
      }

      t += .009;
      requestAnimationFrame(draw);
    }

    /* ── hover ── */
    el.addEventListener('mouseenter', () => hovering = true);
    el.addEventListener('mouseleave', () => hovering = false);

    /* ── start: try immediately, retry until dimensions ready ── */
    function tryStart(attempts) {
      resize();
      if (W && H) { draw(); return; }
      if (attempts > 0) setTimeout(() => tryStart(attempts - 1), 80);
    }
    tryStart(15);

    /* ── ResizeObserver ── */
    if (window.ResizeObserver) {
      new ResizeObserver(() => resize()).observe(el);
    }
  }

  /* ── apply to all existing + watch new ── */
  function applyAll() {
    document.querySelectorAll(SELECTORS).forEach(attachCard);
  }

  function watch() {
    new MutationObserver(ms => {
      ms.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.matches?.(SELECTORS)) attachCard(n);
        n.querySelectorAll?.(SELECTORS).forEach(attachCard);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }

  function boot() {
    applyAll();
    watch();
    /* re-run after 1s for lazy-rendered cards */
    setTimeout(applyAll, 1000);
    setTimeout(applyAll, 2500);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
