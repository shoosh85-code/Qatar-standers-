// js/scanner/capture.js — QatarSpec Pro
// مرشد التقاط الصور — دعم iOS LiDAR + Android Photogrammetry

const QS = window.QS || {};

QS.Scanner = (() => {
  let stream = null;
  let capturedCount = 0;
  let sessionId = null;
  const REQUIRED_MIN = 30;
  const REQUIRED_IDEAL = 45;

  // ===== تهيئة الكاميرا =====
  async function initCamera(videoEl) {
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' },
        width:  { ideal: 3840, min: 1280 },
        height: { ideal: 2160, min: 720 },
      },
      audio: false,
    };

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoEl.srcObject = stream;
      await videoEl.play();

      // عرض معلومات الكاميرا
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      const caps = track.getCapabilities?.() || {};

      return {
        ok: true,
        resolution: `${settings.width}×${settings.height}`,
        hasDepth: !!(caps.depthSensing),
        facingMode: settings.facingMode,
      };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  // ===== التقاط صورة واحدة =====
  async function captureFrame(videoEl) {
    if (!stream) return null;

    const canvas = document.createElement('canvas');
    canvas.width  = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    canvas.getContext('2d').drawImage(videoEl, 0, 0);

    // جمع بيانات GPS
    let gps = null;
    if ('geolocation' in navigator) {
      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, {
            timeout: 1500,
            maximumAge: 5000,
            enableHighAccuracy: false,
          })
        );
        gps = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch { /* GPS اختياري */ }
    }

    const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.92));

    capturedCount++;

    const frame = {
      index: capturedCount,
      sessionId,
      blob,
      timestamp: Date.now(),
      gps,
      motion: QS.Scanner._lastMotion || null,
    };

    // حفظ في IndexedDB
    if (QS.UploadQueue) {
      await QS.UploadQueue.save(frame);
    }

    return {
      frame,
      count: capturedCount,
      remaining: Math.max(0, REQUIRED_MIN - capturedCount),
      isMin: capturedCount >= REQUIRED_MIN,
      isIdeal: capturedCount >= REQUIRED_IDEAL,
      progress: Math.min(100, Math.round((capturedCount / REQUIRED_IDEAL) * 100)),
    };
  }

  // ===== مرشد التداخل =====
  function getOverlapGuide() {
    const motion = QS.Scanner._lastMotion;
    if (!motion?.rotationRate) {
      return { status: 'ok', ar: 'تحرك ببطء حول الهدف', en: 'Move slowly around target' };
    }

    const speed = Math.abs(motion.rotationRate.gamma || 0) +
                  Math.abs(motion.rotationRate.beta  || 0);

    if (speed > 20) {
      return { status: 'fast', ar: '⚠️ بطيء أكثر — التداخل ضعيف', en: 'Too fast — reduce overlap loss' };
    }
    if (speed < 0.5 && capturedCount > 0) {
      return { status: 'still', ar: '↔️ تحرك قليلاً للصورة التالية', en: 'Move slightly for next shot' };
    }
    return { status: 'ok', ar: '✅ ممتاز — استمر', en: 'Perfect — keep going' };
  }

  // ===== بدء جلسة مسح جديدة =====
  function startSession() {
    capturedCount = 0;
    sessionId = QS.UploadQueue?.newSession() || `sess_${Date.now()}`;
    return sessionId;
  }

  // ===== رفع الصور وبدء المعالجة =====
  async function submitScan(onProgress) {
    if (capturedCount < REQUIRED_MIN) {
      throw new Error(`يجب التقاط ${REQUIRED_MIN} صورة على الأقل — لديك ${capturedCount}`);
    }

    onProgress?.({ stage: 'uploading', pct: 0 });

    const result = await QS.UploadQueue.flushPending(sessionId);

    onProgress?.({ stage: 'processing', pct: 10, jobId: result.jobId });

    // Polling حالة المعالجة
    return await pollJobStatus(result.jobId, onProgress);
  }

  // ===== Polling =====
  async function pollJobStatus(jobId, onProgress) {
    const MAX_WAIT = 5 * 60 * 1000; // 5 دقائق
    const POLL_INTERVAL = 5000;
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_WAIT) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL));

      const res = await fetch(`/api/scan-status?jobId=${encodeURIComponent(jobId)}`);
      if (!res.ok) continue;

      const data = await res.json();

      onProgress?.({
        stage: data.status,
        pct: data.progress || 0,
        jobId,
      });

      if (data.status === 'completed') {
        return { ok: true, glbUrl: data.glb_url, fileSizeMb: data.file_size_mb };
      }
      if (data.status === 'failed') {
        throw new Error(data.error || 'فشلت المعالجة');
      }
    }

    throw new Error('انتهت مهلة الانتظار — حاول مرة أخرى');
  }

  // ===== إيقاف الكاميرا =====
  function stop() {
    stream?.getTracks().forEach(t => t.stop());
    stream = null;
  }

  // ===== الاستماع لحركة الجهاز =====
  window.addEventListener('devicemotion', (e) => {
    QS.Scanner._lastMotion = {
      acceleration: {
        x: e.acceleration?.x,
        y: e.acceleration?.y,
        z: e.acceleration?.z,
      },
      rotationRate: {
        alpha: e.rotationRate?.alpha,
        beta:  e.rotationRate?.beta,
        gamma: e.rotationRate?.gamma,
      },
    };
  }, { passive: true });

  return {
    initCamera,
    captureFrame,
    getOverlapGuide,
    startSession,
    submitScan,
    stop,
    getCount: () => capturedCount,
    REQUIRED_MIN,
    REQUIRED_IDEAL,
  };
})();

window.QS = QS;
