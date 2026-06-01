/**
 * QatarSpec Pro — Subtle Gold Wave Lines v2
 * خفيفة جداً — لا تشوش المحتوى
 */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const cvs = document.createElement('canvas');
  cvs.id = '_lxWaves';
  cvs.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.insertBefore(cvs, document.body.firstChild);

  const ctx = cvs.getContext('2d');
  let W, H, t = 0;

  function resize() { W = cvs.width = window.innerWidth; H = cvs.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  // 4 خطوط فقط — خفيفة جداً — موزعة على أطراف الشاشة بعيداً عن المحتوى
  const WAVES = [
    { yBase: .08, amp: 22, freq: .005,  speed: .18, alpha: .10, width: .9, phase: 0   },
    { yBase: .28, amp: 30, freq: .0042, speed: .14, alpha: .07, width: .7, phase: 2.1 },
    { yBase: .72, amp: 28, freq: .0048, speed: .16, alpha: .07, width: .7, phase: 1.3 },
    { yBase: .92, amp: 20, freq: .0055, speed: .20, alpha: .10, width: .9, phase: 3.7 },
  ];

  function drawWave(w) {
    const yCenter = H * w.yBase;
    ctx.beginPath();

    const steps = Math.ceil(W / 8);
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * (W + 20) - 10;
      const y = yCenter
        + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
        + Math.sin(x * w.freq * 1.6 + t * w.speed * .5 + w.phase + 1) * (w.amp * .25);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,    'rgba(201,169,110,0)');
    grad.addColorStop(0.15, `rgba(201,169,110,${w.alpha})`);
    grad.addColorStop(0.5,  `rgba(232,201,144,${w.alpha * 1.2})`);
    grad.addColorStop(0.85, `rgba(201,169,110,${w.alpha})`);
    grad.addColorStop(1,    'rgba(201,169,110,0)');

    ctx.strokeStyle = grad;
    ctx.lineWidth = w.width;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    WAVES.forEach(w => drawWave(w));
    t += .01;
    requestAnimationFrame(loop);
  }
  loop();
})();
