/**
 * QatarSpec Pro — Flowing Gold Wave Lines
 * خطوط منحنية ذهبية تتدفق من اليسار لليمين
 */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  // Canvas فوق كل شيء خلف المحتوى
  const cvs = document.createElement('canvas');
  cvs.id = '_lxWaves';
  cvs.style.cssText = [
    'position:fixed', 'inset:0', 'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:1', 'opacity:1'
  ].join(';');
  document.body.insertBefore(cvs, document.body.children[1] || document.body.firstChild);

  const ctx = cvs.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = cvs.width  = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── تعريف كل موجة ── */
  const WAVES = [
    // { yBase: نسبة الارتفاع, amp: عمق التموج, freq: سرعة التموج, speed: سرعة التدفق, alpha, width, phase }
    { yBase:.18, amp:38, freq:.0055, speed:.28, alpha:.28, width:1.1, phase:0      },
    { yBase:.26, amp:55, freq:.0048, speed:.22, alpha:.18, width:.8,  phase:1.4    },
    { yBase:.35, amp:30, freq:.007,  speed:.35, alpha:.22, width:1.3, phase:2.8    },
    { yBase:.45, amp:65, freq:.004,  speed:.18, alpha:.14, width:.7,  phase:0.7    },
    { yBase:.52, amp:42, freq:.006,  speed:.26, alpha:.20, width:1.0, phase:3.5    },
    { yBase:.61, amp:50, freq:.005,  speed:.30, alpha:.16, width:.9,  phase:1.1    },
    { yBase:.70, amp:35, freq:.0065, speed:.24, alpha:.18, width:1.2, phase:4.2    },
    { yBase:.78, amp:58, freq:.0042, speed:.20, alpha:.12, width:.75, phase:2.1    },
    { yBase:.86, amp:28, freq:.0072, speed:.32, alpha:.16, width:1.0, phase:5.0    },
  ];

  function drawWave(w) {
    const yCenter = H * w.yBase;
    ctx.beginPath();

    // ابدأ من خارج الشاشة يساراً
    ctx.moveTo(-10, yCenter);

    // ارسم المنحنى بـ bezier من اليسار لليمين
    const steps = Math.ceil(W / 6);
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * (W + 20) - 10;
      // موجة مركبة — تردد أساسي + هارمونيك خفيف = مظهر عضوي أكثر
      const y = yCenter
        + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
        + Math.sin(x * w.freq * 1.7 + t * w.speed * .6 + w.phase + 1) * (w.amp * .28)
        + Math.sin(x * w.freq * .4  + t * w.speed * .3 + w.phase + 2) * (w.amp * .18);

      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    // Gradient من اليسار لليمين — يظهر ويختفي
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,    `rgba(201,169,110,0)`);
    grad.addColorStop(0.08, `rgba(201,169,110,${w.alpha * .6})`);
    grad.addColorStop(0.3,  `rgba(201,169,110,${w.alpha})`);
    grad.addColorStop(0.55, `rgba(232,201,144,${w.alpha * 1.15})`); // أفتح في المنتصف
    grad.addColorStop(0.8,  `rgba(201,169,110,${w.alpha * .8})`);
    grad.addColorStop(1,    `rgba(201,169,110,0)`);

    ctx.strokeStyle = grad;
    ctx.lineWidth   = w.width;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.stroke();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    WAVES.forEach(w => drawWave(w));
    t += .012;
    requestAnimationFrame(loop);
  }
  loop();
})();
