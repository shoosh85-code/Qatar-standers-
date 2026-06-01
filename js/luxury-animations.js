/**
 * QatarSpec Pro — Luxury Interactive Animations v1.0
 * تفاعل كامل: cursor · magnetic · ripple · particles · cards · scroll
 */
(function () {
  'use strict';

  const GOLD = 'rgba(201,169,110,';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════
     1. CUSTOM MAGNETIC CURSOR
  ═══════════════════════════════════════════ */
  function initCursor() {
    if (reduced || window.innerWidth < 768) return;

    const style = document.createElement('style');
    style.textContent = `
      *{cursor:none!important}
      #lx-cur{position:fixed;z-index:999999;pointer-events:none;mix-blend-mode:difference}
      #lx-dot{width:5px;height:5px;background:#C9A96E;border-radius:50%;position:fixed;transform:translate(-50%,-50%);pointer-events:none;z-index:999999;transition:transform .1s,width .3s,height .3s;box-shadow:0 0 10px rgba(201,169,110,.8)}
      #lx-ring{width:32px;height:32px;border:1px solid rgba(201,169,110,.45);border-radius:50%;position:fixed;transform:translate(-50%,-50%);pointer-events:none;z-index:999998;transition:width .35s,height .35s,border-color .3s,opacity .3s}
      #lx-ring.hover{width:52px;height:52px;border-color:rgba(201,169,110,.8)}
      #lx-ring.click{width:20px;height:20px;border-color:rgba(201,169,110,1)}
    `;
    document.head.appendChild(style);

    const dot = document.createElement('div'); dot.id = 'lx-dot';
    const ring = document.createElement('div'); ring.id = 'lx-ring';
    document.body.appendChild(dot); document.body.appendChild(ring);

    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    document.addEventListener('mousedown', () => ring.classList.add('click'));
    document.addEventListener('mouseup', () => ring.classList.remove('click'));

    document.querySelectorAll('button,a,.cat-card,.spec-row,.quick-tag,.plan-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    (function raf() {
      rx += (mx - rx) * .1; ry += (my - ry) * .1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(raf);
    })();
  }

  /* ═══════════════════════════════════════════
     2. GOLD RIPPLE ON CLICK
  ═══════════════════════════════════════════ */
  function initRipple() {
    const s = document.createElement('style');
    s.textContent = `
      .lx-ripple-host{position:relative;overflow:hidden}
      @keyframes lxRipple{0%{transform:scale(0);opacity:.5}100%{transform:scale(4);opacity:0}}
      .lx-ripple-el{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(201,169,110,.35),transparent);pointer-events:none;animation:lxRipple .7s cubic-bezier(.4,0,.2,1) forwards}
    `;
    document.head.appendChild(s);

    function addRipple(el) {
      el.classList.add('lx-ripple-host');
      el.addEventListener('click', function(e) {
        const r = el.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 1.5;
        const x = e.clientX - r.left - size/2;
        const y = e.clientY - r.top - size/2;
        const rip = document.createElement('span');
        rip.className = 'lx-ripple-el';
        rip.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
        el.appendChild(rip);
        setTimeout(() => rip.remove(), 750);
      });
    }

    document.querySelectorAll('button,.plan-btn,.upload-btn-main,.calc-btn,.search-icon-btn,.modal-save,.upgrade-cta,.promo-btn,.quick-tag').forEach(addRipple);
  }

  /* ═══════════════════════════════════════════
     3. MAGNETIC CARDS — follow cursor
  ═══════════════════════════════════════════ */
  function initMagneticCards() {
    if (reduced || window.innerWidth < 768) return;

    document.querySelectorAll('.cat-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / (r.width / 2);
        const dy = (e.clientY - cy) / (r.height / 2);
        card.style.transform = `translateY(-4px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
        card.style.boxShadow = `${-dx*12}px ${-dy*12}px 40px rgba(201,169,110,.12), 0 20px 50px rgba(0,0,0,.5)`;
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  /* ═══════════════════════════════════════════
     4. SCROLL-TRIGGERED ENTRANCE ANIMATIONS
  ═══════════════════════════════════════════ */
  function initScrollAnimations() {
    if (reduced) return;

    const s = document.createElement('style');
    s.textContent = `
      .lx-hidden{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1)}
      .lx-hidden.lx-visible{opacity:1;transform:translateY(0)}
      .lx-hidden-left{opacity:0;transform:translateX(-28px);transition:opacity .6s,transform .6s cubic-bezier(.4,0,.2,1)}
      .lx-hidden-left.lx-visible{opacity:1;transform:translateX(0)}
      .lx-hidden-scale{opacity:0;transform:scale(.92);transition:opacity .55s,transform .55s cubic-bezier(.4,0,.2,1)}
      .lx-hidden-scale.lx-visible{opacity:1;transform:scale(1)}
    `;
    document.head.appendChild(s);

    // Apply classes with staggered delays
    document.querySelectorAll('.cat-card').forEach((el, i) => {
      el.classList.add('lx-hidden');
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
    });
    document.querySelectorAll('.section-head,.hero-eyebrow').forEach(el => el.classList.add('lx-hidden-left'));
    document.querySelectorAll('.hero-stat,.spec-row').forEach((el,i) => {
      el.classList.add('lx-hidden-scale');
      el.style.transitionDelay = i * 40 + 'ms';
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('lx-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });

    document.querySelectorAll('.lx-hidden,.lx-hidden-left,.lx-hidden-scale').forEach(el => io.observe(el));
  }

  /* ═══════════════════════════════════════════
     5. FLOATING GOLD PARTICLES BACKGROUND
  ═══════════════════════════════════════════ */
  function initParticles() {
    if (reduced) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'lx-particles';
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.55';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, pts = [], frame = 0;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', () => { resize(); spawn(); });

    class P {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = init ? Math.random() * W : Math.random() < .5 ? -2 : W + 2;
        this.y = init ? Math.random() * H : Math.random() * H;
        this.vx = (Math.random() - .5) * .18;
        this.vy = (Math.random() - .5) * .12;
        this.r = Math.random() * .7 + .2;
        this.life = Math.random() * 500 + 200;
        this.age = init ? Math.random() * this.life : 0;
        this.gold = Math.random() > .45;
      }
      get a() { return Math.sin(this.age / this.life * Math.PI) * (this.gold ? .45 : .2); }
      step() {
        this.x += this.vx; this.y += this.vy; this.age++;
        if (this.age > this.life || this.x < -5 || this.x > W + 5) this.reset(false);
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, 6.28);
        ctx.fillStyle = this.gold ? `rgba(201,169,110,${this.a})` : `rgba(255,255,255,${this.a * .5})`;
        ctx.fill();
      }
    }

    function spawn() { pts = []; for (let i = 0; i < 80; i++) pts.push(new P()); }
    spawn();

    // Draw connections
    function conns() {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.lineWidth = .35;
            ctx.strokeStyle = `rgba(201,169,110,${(1 - d / 100) * .04})`;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
    }

    // Subtle radial glow
    function glow() {
      const g = ctx.createRadialGradient(W/2, H*.35, 0, W/2, H*.35, W*.5);
      g.addColorStop(0, `rgba(201,169,110,${.028 + Math.sin(frame*.008)*.012})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    (function loop() {
      ctx.clearRect(0, 0, W, H);
      glow(); conns();
      pts.forEach(p => { p.step(); p.draw(); });
      frame++;
      requestAnimationFrame(loop);
    })();
  }

  /* ═══════════════════════════════════════════
     6. SEARCH INPUT — gold glow typing effect
  ═══════════════════════════════════════════ */
  function initSearchGlow() {
    const inp = document.querySelector('.search-input');
    if (!inp) return;
    inp.addEventListener('focus', () => {
      inp.style.boxShadow = '0 0 0 1px rgba(201,169,110,.4), 0 0 30px rgba(201,169,110,.08)';
    });
    inp.addEventListener('blur', () => { inp.style.boxShadow = ''; });
    inp.addEventListener('input', () => {
      const v = inp.value.length;
      const intensity = Math.min(v / 20, 1);
      inp.style.boxShadow = `0 0 0 1px rgba(201,169,110,${.2 + intensity * .3}), 0 0 ${20 + intensity * 20}px rgba(201,169,110,${.04 + intensity * .08})`;
    });
  }

  /* ═══════════════════════════════════════════
     7. CARD HOVER — gold shimmer sweep
  ═══════════════════════════════════════════ */
  function initCardShimmer() {
    const s = document.createElement('style');
    s.textContent = `
      .cat-card{perspective:1000px;transform-style:preserve-3d}
      .cat-card::before{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(201,169,110,.06) 50%,transparent 65%);transform:translateX(-100%);transition:transform 0s}
      .cat-card:hover::before{transform:translateX(100%);transition:transform .6s ease}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     8. HERO STATS — live counting up on load
  ═══════════════════════════════════════════ */
  function initHeroCounters() {
    document.querySelectorAll('.hero-stat-num').forEach(el => {
      const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
      const suffix = el.textContent.replace(/[0-9]/g, '').trim();
      if (!target || isNaN(target)) return;
      el.textContent = '0' + suffix;
      const dur = 1600;
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString() + (suffix || '');
        if (p < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 600);
    });
  }

  /* ═══════════════════════════════════════════
     9. SCROLL PROGRESS BAR
  ═══════════════════════════════════════════ */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(to right,#C9A96E,#E8C990);z-index:99998;width:0;transition:width .1s;pointer-events:none';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      bar.style.width = (p * 100) + '%';
    });
  }

  /* ═══════════════════════════════════════════
     10. BUTTON PRESS SCALE
  ═══════════════════════════════════════════ */
  function initButtonPress() {
    const s = document.createElement('style');
    s.textContent = `
      button:active{transform:scale(.96)!important;transition:transform .08s!important}
      .cat-card:active{transform:scale(.98) translateY(-1px)!important;transition:transform .1s!important}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     11. SECTION TITLE — gold underline draw
  ═══════════════════════════════════════════ */
  function initTitleUnderline() {
    const s = document.createElement('style');
    s.textContent = `
      .section-title{position:relative;display:inline-block}
      .section-title::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:linear-gradient(to right,#C9A96E,transparent);transition:width .6s cubic-bezier(.4,0,.2,1)}
      .section-title.lx-visible::after{width:100%}
    `;
    document.head.appendChild(s);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('lx-visible'); io.unobserve(e.target); } });
    }, {threshold:.5});
    document.querySelectorAll('.section-title').forEach(el => io.observe(el));
  }

  /* ═══════════════════════════════════════════
     12. MODAL ENTRANCE — dramatic scale-in
  ═══════════════════════════════════════════ */
  function initModalAnimations() {
    const s = document.createElement('style');
    s.textContent = `
      .modal-bg.open .modal-box,
      .detail-modal-bg.open .detail-modal,
      .pro-modal-bg.open .pro-modal-box,
      .upgrade-overlay.open .upgrade-box{
        animation:lxModalIn .4s cubic-bezier(.34,1.56,.64,1) forwards
      }
      @keyframes lxModalIn{
        from{opacity:0;transform:scale(.88) translateY(20px)}
        to{opacity:1;transform:scale(1) translateY(0)}
      }
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     13. GOLD CORNER BRACKETS on section-head
  ═══════════════════════════════════════════ */
  function initCornerBrackets() {
    const s = document.createElement('style');
    s.textContent = `
      .content-section{position:relative}
      .section-head{position:relative;padding:8px 12px}
      .section-head::before,.section-head::after{
        content:'';position:absolute;width:10px;height:10px;
        border-color:rgba(201,169,110,.35);border-style:solid;
        opacity:0;transition:opacity .4s
      }
      .section-head::before{top:0;right:0;border-width:1px 1px 0 0}
      .section-head::after{bottom:0;left:0;border-width:0 0 1px 1px}
      .section-head.lx-visible::before,.section-head.lx-visible::after{opacity:1}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     14. SPEC ROW — slide-in from right
  ═══════════════════════════════════════════ */
  function initSpecRowAnimations() {
    const s = document.createElement('style');
    s.textContent = `
      .spec-row{
        opacity:0;transform:translateX(20px);
        transition:opacity .4s,transform .4s cubic-bezier(.4,0,.2,1),border-color .2s,background .2s
      }
      .spec-row.lx-show{opacity:1;transform:translateX(0)}
    `;
    document.head.appendChild(s);

    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('lx-show'), i * 35);
          io.unobserve(e.target);
        }
      });
    }, {threshold:.05});
    document.querySelectorAll('.spec-row').forEach(el => io.observe(el));
  }

  /* ═══════════════════════════════════════════
     INIT ALL
  ═══════════════════════════════════════════ */
  function init() {
    initParticles();
    initCursor();
    initRipple();
    initCardShimmer();
    initMagneticCards();
    initScrollAnimations();
    initScrollProgress();
    initSearchGlow();
    initHeroCounters();
    initButtonPress();
    initTitleUnderline();
    initModalAnimations();
    initCornerBrackets();
    initSpecRowAnimations();
    console.log('[QS] Luxury animations loaded ✦');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
