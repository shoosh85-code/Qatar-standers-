window.ScannerCamera = (function() {
  'use strict';

  let stream = null;
  let scanning = false;
  let frameCount = 0;
  let animId = null;
  const OVERLAY_COLORS = ['#00ff88', '#00ccff', '#ffaa00', '#ff6688'];

  // ═══ رفع فيديو — استخراج frames تلقائي ═══════════════════
  async function handleVideoUpload(files) {
    if (!files || !files.length) return;
    var file = files[0];
    if (!file.type.startsWith('video/')) {
      window.QS3D.log('❌ الملف يجب أن يكون فيديو (MP4, MOV, WebM)');
      return;
    }
    if (file.size > 500 * 1024 * 1024) {
      window.QS3D.log('❌ الفيديو أكبر من 500MB');
      return;
    }

    var sizeMB = (file.size / 1024 / 1024).toFixed(1);
    window.QS3D.log('⏳ جاري معالجة الفيديو: ' + file.name + ' (' + sizeMB + 'MB)');
    showProgress(0, 'استخراج الإطارات...');

    try {
      // استخراج frames
      var maxFrames = 8;
      var frames = await window.ScannerGemini.extractVideoFrames(file, maxFrames);
      window.QS3D.log('✅ تم استخراج ' + frames.length + ' إطار — بدء التحليل...');
      showProgress(20, 'تحليل الإطارات بالذكاء الاصطناعي...');

      // تحليل كل frame
      var results = await window.ScannerGemini.analyzeBatch(frames, function(current, total) {
        var pct = 20 + Math.round((current / total) * 70);
        showProgress(pct, 'تحليل إطار ' + current + '/' + total);
      });

      // إضافة النتائج
      results.forEach(function(r) {
        window.QS3D.rooms.push(r);
        addToAnalysisList(r);
      });

      showProgress(100, 'اكتمل!');
      window.QS3D.updateRoomsCounter();
      window.QS3D.log('✅ اكتمل تحليل الفيديو — ' + results.length + ' غرفة من ' + frames.length + ' إطار');

      // الانتقال للمجسم تلقائياً إذا وُجدت غرف
      if (results.length > 0) {
        setTimeout(function() {
          window.QS3D.goStep(3);
          window.Scanner3D.build(window.QS3D.rooms);
        }, 800);
      }
    } catch (err) {
      window.QS3D.log('❌ خطأ في معالجة الفيديو: ' + err.message);
      showProgress(0, '');
    }
  }

  // ═══ رفع صور متعددة (batch) ═══════════════════════════════
  async function handlePhotoUpload(files) {
    if (!files || !files.length) return;

    // فلترة الصور فقط
    var images = [];
    for (var i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) images.push(files[i]);
    }

    if (!images.length) {
      window.QS3D.log('❌ لا توجد صور صالحة');
      return;
    }

    window.QS3D.log('⏳ تحليل ' + images.length + ' صورة...');
    showProgress(10, 'بدء التحليل...');

    var results = await window.ScannerGemini.analyzeBatch(images, function(current, total) {
      var pct = 10 + Math.round((current / total) * 80);
      showProgress(pct, 'تحليل صورة ' + current + '/' + total);
    });

    results.forEach(function(r) {
      window.QS3D.rooms.push(r);
      addToAnalysisList(r);
    });

    showProgress(100, 'اكتمل!');
    window.QS3D.updateRoomsCounter();
    window.QS3D.log('✅ تم تحليل ' + results.length + ' غرفة من ' + images.length + ' صورة');

    if (results.length > 0) {
      setTimeout(function() {
        window.QS3D.goStep(3);
        window.Scanner3D.build(window.QS3D.rooms);
      }, 800);
    }
  }

  // ═══ Drag & Drop handler ═══════════════════════════════════
  function initDragDrop() {
    var zone = document.getElementById('uploadZone');
    if (!zone) return;

    zone.addEventListener('dragover', function(e) {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', function() {
      zone.classList.remove('dragover');
    });
    zone.addEventListener('drop', function(e) {
      e.preventDefault();
      zone.classList.remove('dragover');
      var files = e.dataTransfer.files;
      if (!files.length) return;
      // تحديد نوع الملف
      if (files[0].type.startsWith('video/')) {
        handleVideoUpload(files);
      } else {
        handlePhotoUpload(files);
      }
    });
  }

  // ═══ Progress bar ═══════════════════════════════════════════
  function showProgress(pct, text) {
    var bar = document.getElementById('progressBar');
    var label = document.getElementById('progressLabel');
    var container = document.getElementById('progressContainer');
    if (!bar || !container) return;

    if (pct <= 0) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';
    bar.style.width = pct + '%';
    if (label) label.textContent = text || '';

    if (pct >= 100) {
      setTimeout(function() { container.style.display = 'none'; }, 2000);
    }
  }

  // ═══ الكاميرا الحية (محفوظة) ══════════════════════════════
  async function start() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      var vid = document.getElementById('video');
      vid.srcObject = stream;
      vid.style.display = 'block';
      document.getElementById('camPlaceholder').style.display = 'none';
      document.getElementById('refBar').style.display = 'flex';
      document.getElementById('btnScan').disabled = false;
      document.getElementById('btnCapture').disabled = false;
      document.getElementById('btnCamera').textContent = '⏹ إيقاف الكاميرا';
      document.getElementById('btnCamera').onclick = stop;
      setBadge('كاميرا نشطة', 'active');
      window.QS3D.log('✅ الكاميرا تعمل — اضغط "تصوير" لتحليل غرفة');
    } catch (err) {
      window.QS3D.log('❌ خطأ في الكاميرا: ' + err.message);
    }
  }

  function stop() {
    if (stream) stream.getTracks().forEach(function(t) { t.stop(); });
    scanning = false;
    if (animId) cancelAnimationFrame(animId);
    var vid = document.getElementById('video');
    if (vid) vid.style.display = 'none';
    var ph = document.getElementById('camPlaceholder');
    if (ph) ph.style.display = 'flex';
    var btn = document.getElementById('btnCamera');
    if (btn) { btn.textContent = '▶ تشغيل الكاميرا'; btn.onclick = start; }
    setBadge('جاهز', 'idle');
  }

  function toggleScan() {
    scanning = !scanning;
    var btn = document.getElementById('btnScan');
    if (scanning) {
      btn.textContent = '⏸ إيقاف المسح';
      btn.classList.add('btn-scanning');
      runScanLoop();
      window.QS3D.log('🔍 المسح يعمل — يلتقط إطاراً كل 5 ثوان');
    } else {
      btn.textContent = '⬛ بدء المسح';
      btn.classList.remove('btn-scanning');
      if (animId) cancelAnimationFrame(animId);
      clearOverlay();
    }
  }

  function runScanLoop() {
    if (!scanning) return;
    frameCount++;
    drawOverlay(frameCount);
    if (frameCount % 150 === 0) captureFrame(true);
    animId = requestAnimationFrame(runScanLoop);
  }

  async function captureFrame(auto) {
    var video = document.getElementById('video');
    if (!video || !video.srcObject) return;
    var canvas = document.createElement('canvas');
    canvas.width = 640; canvas.height = 360;
    canvas.getContext('2d').drawImage(video, 0, 0, 640, 360);
    var base64 = canvas.toDataURL('image/jpeg', 0.82).split(',')[1];
    window.QS3D.log(auto ? '🔍 تحليل تلقائي...' : '📸 جاري التحليل...');
    var result = await window.ScannerGemini.analyze(base64);
    if (result) {
      window.QS3D.rooms.push(result);
      window.QS3D.updateRoomsCounter();
      window.QS3D.log('✅ ' + result.name + ': ' + result.length + '×' + result.width + 'م');
      addToAnalysisList(result);
    }
  }

  // ═══ Overlay (محفوظ) ═══════════════════════════════════════
  function drawOverlay(frame) {
    var oc = document.getElementById('overlayCanvas');
    var vid = document.getElementById('video');
    if (!oc || !vid) return;
    oc.width = vid.clientWidth; oc.height = vid.clientHeight;
    var ctx = oc.getContext('2d');
    ctx.clearRect(0, 0, oc.width, oc.height);
    var W = oc.width, H = oc.height;
    var color = OVERLAY_COLORS[Math.floor(frame / 60) % 4];
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([8, 4]);
    ctx.strokeRect(W * 0.08, H * 0.08, W * 0.84, H * 0.84);
    ctx.setLineDash([]);
    [[0.08,0.08],[0.92,0.08],[0.92,0.92],[0.08,0.92]].forEach(function(p) {
      ctx.fillStyle = color; ctx.beginPath();
      ctx.arc(W*p[0], H*p[1], 6, 0, Math.PI*2); ctx.fill();
    });
    var pct = (frame % 150) / 150;
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(W*0.08, H*0.93, W*0.84, 6);
    ctx.fillStyle = color; ctx.fillRect(W*0.08, H*0.93, W*0.84*pct, 6);
  }

  function clearOverlay() {
    var oc = document.getElementById('overlayCanvas');
    if (oc) oc.getContext('2d').clearRect(0, 0, oc.width, oc.height);
  }

  function addToAnalysisList(room) {
    var list = document.getElementById('analysisList');
    if (!list) return;
    var area = (room.length * room.width).toFixed(1);
    var qcsOk = parseFloat(area) >= (room.qcs_min_area || 0);
    var safeN = (room.name || '').replace(/</g, '&lt;');
    var safeM = (room.floor_material || '').replace(/</g, '&lt;');
    var safeR = (room.measurement_refs || '').replace(/</g, '&lt;');
    list.innerHTML += '<div class="analysis-item">' +
      '<div class="room-name">' + safeN + '</div>' +
      '<div class="room-dims">' + room.length + 'م × ' + room.width + 'م × ' + room.height + 'م ارتفاع</div>' +
      '<div class="room-area">المساحة: ' + area + ' م² ' +
        '<span class="badge ' + (qcsOk ? 'badge-pass' : 'badge-fail') + '">' +
          (qcsOk ? '✓ QCS' : '✗ دون الحد') + '</span></div>' +
      (safeM ? '<div class="room-mat">الأرضية: ' + safeM + '</div>' : '') +
      '<div class="room-conf">دقة: ' + Math.round((room.confidence || 0) * 100) + '%' +
        (safeR ? ' — مرجع: ' + safeR : '') + '</div>' +
    '</div>';
  }

  function setBadge(text, type) {
    var b = document.getElementById('scanBadge');
    if (b) { b.textContent = text; b.className = 'badge badge-' + type; }
  }

  return {
    start: start, stop: stop, toggleScan: toggleScan,
    captureFrame: captureFrame, handleVideoUpload: handleVideoUpload,
    handlePhotoUpload: handlePhotoUpload, initDragDrop: initDragDrop
  };
})();
