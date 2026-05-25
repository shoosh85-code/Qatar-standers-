window.ScannerCamera = (function() {
  'use strict';

  let stream = null;
  let scanning = false;
  let frameCount = 0;
  let animId = null;
  const OVERLAY_COLORS = ['#00ff88', '#00ccff', '#ffaa00', '#ff6688'];

  // ── بدء الكاميرا ──────────────────────────────────────────
  async function start() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      const vid = document.getElementById('video');
      vid.srcObject = stream;
      vid.style.display = 'block';
      document.getElementById('camPlaceholder').style.display = 'none';
      document.getElementById('refBar').style.display = 'flex';
      document.getElementById('btnScan').disabled = false;
      document.getElementById('btnCapture').disabled = false;
      document.getElementById('btnCamera').textContent = '⏹ إيقاف الكاميرا';
      document.getElementById('btnCamera').onclick = stop;
      setBadge('كاميرا نشطة', 'active');
      window.QS3D.log('✅ الكاميرا تعمل — اضغط "بدء المسح" أو "تصوير" لتحليل غرفة');
    } catch (err) {
      window.QS3D.log('❌ خطأ في الكاميرا: ' + err.message + ' — جرب "بيانات تجريبية"');
    }
  }

  function stop() {
    if (stream) stream.getTracks().forEach(t => t.stop());
    scanning = false;
    if (animId) cancelAnimationFrame(animId);
    document.getElementById('video').style.display = 'none';
    document.getElementById('camPlaceholder').style.display = 'flex';
    document.getElementById('btnCamera').textContent = '▶ تشغيل الكاميرا';
    document.getElementById('btnCamera').onclick = start;
    setBadge('جاهز', 'idle');
  }

  // ── المسح المستمر ──────────────────────────────────────────
  function toggleScan() {
    scanning = !scanning;
    const btn = document.getElementById('btnScan');
    if (scanning) {
      btn.textContent = '⏸ إيقاف المسح';
      btn.classList.add('btn-scanning');
      runScanLoop();
      window.QS3D.log('🔍 المسح يعمل — يلتقط إطاراً كل 5 ثوان للتحليل');
    } else {
      btn.textContent = '⬛ بدء المسح';
      btn.classList.remove('btn-scanning');
      if (animId) cancelAnimationFrame(animId);
      clearOverlay();
      window.QS3D.log('⏸ المسح موقف — ' + window.QS3D.rooms.length + ' غرفة محللة');
    }
  }

  function runScanLoop() {
    if (!scanning) return;
    frameCount++;
    drawOverlay(frameCount);
    // كل 150 إطار (~5 ثواني عند 30fps) → إرسال للتحليل
    if (frameCount % 150 === 0) captureFrame(true);
    animId = requestAnimationFrame(runScanLoop);
  }

  // ── التقاط إطار وإرساله ───────────────────────────────────
  async function captureFrame(auto = false) {
    const video = document.getElementById('video');
    if (!video.srcObject) return;
    const canvas = document.createElement('canvas');
    canvas.width = 640; canvas.height = 360;
    canvas.getContext('2d').drawImage(video, 0, 0, 640, 360);
    const base64 = canvas.toDataURL('image/jpeg', 0.82).split(',')[1];
    window.QS3D.log(auto ? '🔍 تحليل تلقائي للإطار...' : '📸 جاري تحليل الصورة...');
    const result = await window.ScannerGemini.analyze(base64);
    if (result) {
      window.QS3D.rooms.push(result);
      window.QS3D.updateRoomsCounter();
      window.QS3D.log('✅ تم تحليل: ' + result.name + ' (' + result.length + '×' + result.width + 'م)');
      addToAnalysisList(result);
    }
  }

  // ── رسم الـ Overlay ───────────────────────────────────────
  function drawOverlay(frame) {
    const oc = document.getElementById('overlayCanvas');
    const vid = document.getElementById('video');
    oc.width  = vid.clientWidth;
    oc.height = vid.clientHeight;
    const ctx = oc.getContext('2d');
    ctx.clearRect(0, 0, oc.width, oc.height);
    const W = oc.width, H = oc.height;
    const color = OVERLAY_COLORS[Math.floor(frame / 60) % 4];

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.strokeRect(W * 0.08, H * 0.08, W * 0.84, H * 0.84);
    ctx.setLineDash([]);

    [[0.08,0.08],[0.92,0.08],[0.92,0.92],[0.08,0.92]].forEach(([x,y]) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(W*x, H*y, 6, 0, Math.PI*2);
      ctx.fill();
    });

    const walls = ['جدار شمالي','جدار جنوبي','جدار شرقي','جدار غربي'];
    const wi = Math.floor(frame / 75) % 4;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W*0.25, H*0.86, W*0.5, 22);
    ctx.fillStyle = color;
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔍 ' + walls[wi], W/2, H*0.88 + 14);

    const pct = (frame % 150) / 150;
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(W*0.08, H*0.93, W*0.84, 6);
    ctx.fillStyle = color;
    ctx.fillRect(W*0.08, H*0.93, W*0.84*pct, 6);
  }

  function clearOverlay() {
    const oc = document.getElementById('overlayCanvas');
    oc.getContext('2d').clearRect(0, 0, oc.width, oc.height);
  }

  function addToAnalysisList(room) {
    const list = document.getElementById('analysisList');
    const area = (room.length * room.width).toFixed(1);
    const qcsOk = area >= (room.qcs_min_area || 0);
    list.innerHTML += `
      <div class="analysis-item">
        <div class="room-name">${room.name}</div>
        <div class="room-dims">${room.length}م × ${room.width}م × ارتفاع ${room.height}م</div>
        <div class="room-area">المساحة: ${area} م²
          <span class="badge ${qcsOk ? 'badge-pass' : 'badge-fail'}">
            ${qcsOk ? 'يوافق QCS' : 'أقل من الحد'}
          </span>
        </div>
        <div class="room-conf">دقة التحليل: ${Math.round(room.confidence * 100)}%</div>
      </div>`;
  }

  function setBadge(text, type) {
    const b = document.getElementById('scanBadge');
    b.textContent = text;
    b.className = 'badge badge-' + type;
  }

  return { start, stop, toggleScan, captureFrame };
})();
