/**
 * QatarSpec Pro — كاميرا ذكية + مرشد التقاط
 * يرشد المهندس الميداني لالتقاط صور كاملة للمبنى
 * @version 3.0
 */

'use strict';

window.QS = window.QS || {};

window.QS.SmartCapture = class SmartCapture {
  constructor(options = {}) {
    this.options = {
      maxSizeMB: 5,
      jpegQuality: 0.85,
      minOverlap: 0.6,
      ...options
    };

    this.photos = [];
    this.stream = null;
    this.videoEl = null;
    this.canvasEl = null;
    this.currentStep = 0;
    this.db = null;

    // callbacks
    this._onCapture = null;
    this._onQualityWarning = null;
    this._onComplete = null;
    this._onHeatWarning = null;

    // خطوات الإرشاد
    this.steps = [
      { id: 'front',       label_ar: 'الواجهة الأمامية',        label_en: 'Front Facade',        direction: 'north', hint: 'ابتعد 5-10 متر، صوّر كامل الواجهة' },
      { id: 'right',       label_ar: 'الواجهة اليمنى',          label_en: 'Right Side',           direction: 'east',  hint: 'صوّر كامل الجانب الأيمن' },
      { id: 'back',        label_ar: 'الواجهة الخلفية',         label_en: 'Back Facade',          direction: 'south', hint: 'صوّر الواجهة الخلفية كاملة' },
      { id: 'left',        label_ar: 'الواجهة اليسرى',          label_en: 'Left Side',            direction: 'west',  hint: 'صوّر كامل الجانب الأيسر' },
      { id: 'floorplan',   label_ar: 'مخطط الطابق الأرضي',      label_en: 'Ground Floor Plan',    direction: null,    hint: 'صوّر المخطط المطبوع إن وُجد' },
      { id: 'room1',       label_ar: 'الغرفة الأولى - جدار 1',  label_en: 'Room 1 - Wall 1',      direction: null,    hint: 'قف في الزاوية وصوّر الجدار كاملاً' },
      { id: 'room1b',      label_ar: 'الغرفة الأولى - جدار 2',  label_en: 'Room 1 - Wall 2',      direction: null,    hint: 'انتقل لجدار مجاور مع تداخل 60%+' },
      { id: 'room2',       label_ar: 'الغرفة الثانية',          label_en: 'Room 2',               direction: null,    hint: 'صوّر من مدخل الغرفة' },
      { id: 'ceiling',     label_ar: 'السقف من الداخل',         label_en: 'Interior Ceiling',     direction: 'up',    hint: 'وجّه الكاميرا للسقف' },
      { id: 'floor',       label_ar: 'الأرضية',                 label_en: 'Floor Finish',         direction: 'down',  hint: 'صوّر الأرضية من الأعلى' }
    ];

    this._heatCheckInterval = null;
    this._captureCount = 0;
  }

  // ══════════════════════════════════════════
  // التشغيل
  // ══════════════════════════════════════════

  async start(containerId) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`العنصر #${containerId} غير موجود`);

    await this._initIndexedDB();
    this._buildUI(container);
    await this._startCamera();
    this._startHeatMonitor();
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    if (this._heatCheckInterval) {
      clearInterval(this._heatCheckInterval);
    }
  }

  // ══════════════════════════════════════════
  // بناء واجهة المستخدم
  // ══════════════════════════════════════════

  _buildUI(container) {
    container.innerHTML = `
      <div id="qsc-wrapper" style="
        position:relative; width:100%; height:100%; background:#000;
        display:flex; flex-direction:column; font-family:'Tajawal',Arial,sans-serif; direction:rtl;
      ">
        <!-- شريط التقدم العلوي -->
        <div id="qsc-topbar" style="
          position:absolute; top:0; left:0; right:0; z-index:10;
          background:rgba(0,0,0,0.7); padding:10px 16px; color:#fff;
        ">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span id="qsc-step-label" style="font-size:16px; font-weight:bold; color:#c8961a;">الواجهة الأمامية</span>
            <span id="qsc-counter" style="font-size:13px; color:#aaa;">صورة 0/${this.steps.length}</span>
          </div>
          <div style="background:#333; border-radius:4px; height:6px; overflow:hidden;">
            <div id="qsc-progress-bar" style="height:100%; width:0%; background:#c8961a; transition:width 0.3s;"></div>
          </div>
          <div id="qsc-hint" style="font-size:13px; color:#ddd; margin-top:6px;">ابتعد 5-10 متر، صوّر كامل الواجهة</div>
        </div>

        <!-- الكاميرا -->
        <video id="qsc-video" autoplay playsinline muted style="width:100%; height:100%; object-fit:cover;"></video>
        <canvas id="qsc-canvas" style="display:none;"></canvas>

        <!-- Overlay توجيهي -->
        <div id="qsc-overlay" style="
          position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none;
        ">
          <!-- إطار تأطير -->
          <svg width="100%" height="100%" style="position:absolute;">
            <rect id="qsc-frame" x="5%" y="20%" width="90%" height="60%"
              fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="20,10" rx="8"/>
          </svg>
          <!-- رسالة الجودة -->
          <div id="qsc-quality-msg" style="
            position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
            background:rgba(239,68,68,0.9); color:#fff; padding:12px 24px;
            border-radius:8px; font-size:16px; font-weight:bold;
            display:none; text-align:center;
          "></div>
        </div>

        <!-- شريط الأدوات السفلي -->
        <div id="qsc-bottombar" style="
          position:absolute; bottom:0; left:0; right:0; z-index:10;
          background:rgba(0,0,0,0.8); padding:16px; display:flex;
          align-items:center; justify-content:space-between; gap:12px;
        ">
          <!-- زر المعاينة -->
          <button id="qsc-gallery-btn" onclick="window.QS._captureInstance&&window.QS._captureInstance._showGallery()" style="
            background:#333; color:#fff; border:none; border-radius:8px;
            padding:10px 16px; cursor:pointer; font-family:inherit; font-size:13px;
          ">
            🖼 معاينة (<span id="qsc-gallery-count">0</span>)
          </button>

          <!-- زر التقاط كبير -->
          <button id="qsc-capture-btn" onclick="window.QS._captureInstance&&window.QS._captureInstance.capture()" style="
            background:#c8961a; color:#fff; border:none; border-radius:50%;
            width:70px; height:70px; font-size:28px; cursor:pointer;
            box-shadow:0 4px 20px rgba(200,150,26,0.5); flex-shrink:0;
          ">📷</button>

          <!-- زر التالي / إنهاء -->
          <button id="qsc-next-btn" onclick="window.QS._captureInstance&&window.QS._captureInstance._nextStep()" style="
            background:#1a1a2e; color:#c8961a; border:1px solid #c8961a;
            border-radius:8px; padding:10px 16px; cursor:pointer;
            font-family:inherit; font-size:13px;
          ">التالي ›</button>
        </div>

        <!-- تحذير الحرارة -->
        <div id="qsc-heat-warning" style="
          display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          background:rgba(239,68,68,0.95); color:#fff; padding:16px 24px;
          border-radius:12px; text-align:center; font-size:16px; font-weight:bold; z-index:20;
        ">📱 الهاتف ساخن — خذ استراحة 30 ثانية</div>
      </div>
    `;

    // تخزين مرجع للـ instance
    window.QS._captureInstance = this;
    this.videoEl = document.getElementById('qsc-video');
    this.canvasEl = document.getElementById('qsc-canvas');

    this._updateStepUI();
  }

  // ══════════════════════════════════════════
  // الكاميرا
  // ══════════════════════════════════════════

  async _startCamera() {
    const constraints = {
      video: {
        facingMode: 'environment',
        width: { ideal: 4096 },
        height: { ideal: 3072 }
      },
      audio: false
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoEl.srcObject = this.stream;
    } catch {
      // fallback أبعاد أصغر
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.videoEl.srcObject = this.stream;
    }
  }

  // ══════════════════════════════════════════
  // التقاط
  // ══════════════════════════════════════════

  async capture() {
    if (!this.stream) return;

    const video = this.videoEl;
    const canvas = this.canvasEl;

    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // فحص الجودة
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const blurScore = this.checkBlur(imageData);
    const exposureOk = this.checkExposure(imageData);

    if (blurScore < 0.3) {
      this._showQualityWarning('⚠️ الصورة مهزوزة — حاول مرة أخرى');
      if (this._onQualityWarning) this._onQualityWarning('blur', blurScore);
      return;
    }

    if (!exposureOk) {
      this._showQualityWarning('⚠️ إضاءة زائدة — تحرّك أو غيّر الزاوية');
      if (this._onQualityWarning) this._onQualityWarning('exposure', 0);
      return;
    }

    // ضغط الصورة
    const blob = await this._canvasToBlob(canvas, this.options.jpegQuality);
    const sizeMB = blob.size / 1024 / 1024;

    let finalBlob = blob;
    if (sizeMB > this.options.maxSizeMB) {
      // ضغط أكثر
      finalBlob = await this._canvasToBlob(canvas, 0.7);
    }

    const photo = {
      id: `photo_${Date.now()}`,
      step: this.steps[this.currentStep]?.id || 'extra',
      step_label: this.steps[this.currentStep]?.label_ar || '',
      blob: finalBlob,
      dataURL: canvas.toDataURL('image/jpeg', 0.5), // نسخة صغيرة للمعاينة
      timestamp: new Date().toISOString(),
      width: canvas.width,
      height: canvas.height
    };

    this.photos.push(photo);
    this._captureCount++;

    this._updateCounter();
    this._flashCapture();

    await this._savePhotoToDB(photo);

    if (this._onCapture) this._onCapture(photo, this.photos.length);

    // انتقال تلقائي للخطوة التالية
    if (this.currentStep < this.steps.length - 1) {
      setTimeout(() => this._nextStep(), 800);
    } else {
      this._onAllCaptured();
    }
  }

  getPhotos() { return this.photos; }

  removePhoto(index) {
    this.photos.splice(index, 1);
    this._updateCounter();
  }

  // ══════════════════════════════════════════
  // فحص الجودة
  // ══════════════════════════════════════════

  checkBlur(imageData) {
    // Laplacian variance — كلما كانت القيمة أعلى كلما كانت الصورة أوضح
    const data = imageData.data;
    const w = imageData.width;
    let variance = 0;
    let count = 0;
    const step = Math.max(1, Math.floor(w / 100)); // عيّنة

    for (let y = 1; y < imageData.height - 1; y += step) {
      for (let x = 1; x < w - 1; x += step) {
        const i = (y * w + x) * 4;
        const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
        const top  = 0.299 * data[i - w*4] + 0.587 * data[i - w*4 + 1] + 0.114 * data[i - w*4 + 2];
        const bot  = 0.299 * data[i + w*4] + 0.587 * data[i + w*4 + 1] + 0.114 * data[i + w*4 + 2];
        const lap  = 2 * gray - top - bot;
        variance  += lap * lap;
        count++;
      }
    }

    const score = count > 0 ? Math.min(1, variance / count / 1000) : 0;
    return score;
  }

  checkExposure(imageData) {
    const data = imageData.data;
    let overExposed = 0;
    const total = data.length / 4;
    const sampleStep = 4;

    for (let i = 0; i < data.length; i += 4 * sampleStep) {
      const brightness = (data[i] + data[i+1] + data[i+2]) / 3;
      if (brightness > 240) overExposed++;
    }

    // إذا أكثر من 40% من البكسلات مشبعة → إضاءة زائدة
    return (overExposed / (total / sampleStep)) < 0.4;
  }

  checkOverlap(img1DataURL, img2DataURL) {
    // تقدير بسيط بالحجم — في التطبيق الحقيقي يُستخدم ORB/SIFT
    // هنا نُرجع قيمة ثابتة 0.65 كـ placeholder
    return Promise.resolve(0.65);
  }

  // ══════════════════════════════════════════
  // الإرشاد
  // ══════════════════════════════════════════

  getCurrentStep() { return this.currentStep; }
  getTotalSteps() { return this.steps.length; }

  getGuidanceText() {
    const step = this.steps[this.currentStep];
    return step ? step.hint : 'اكتمل التقاط الصور';
  }

  _nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this._updateStepUI();
    }
  }

  _updateStepUI() {
    const step = this.steps[this.currentStep];
    if (!step) return;

    const label = document.getElementById('qsc-step-label');
    const hint = document.getElementById('qsc-hint');
    const bar = document.getElementById('qsc-progress-bar');
    const nextBtn = document.getElementById('qsc-next-btn');

    if (label) label.textContent = step.label_ar;
    if (hint) hint.textContent = step.hint;
    if (bar) bar.style.width = `${(this.currentStep / this.steps.length) * 100}%`;
    if (nextBtn) nextBtn.textContent = this.currentStep >= this.steps.length - 1 ? 'إنهاء ✓' : 'التالي ›';
  }

  _updateCounter() {
    const counter = document.getElementById('qsc-counter');
    const galCount = document.getElementById('qsc-gallery-count');
    if (counter) counter.textContent = `صورة ${this.photos.length}/${this.steps.length}`;
    if (galCount) galCount.textContent = this.photos.length;
  }

  _onAllCaptured() {
    const bar = document.getElementById('qsc-progress-bar');
    if (bar) bar.style.width = '100%';
    if (this._onComplete) this._onComplete(this.photos);
  }

  _showQualityWarning(msg) {
    const el = document.getElementById('qsc-quality-msg');
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 2500);
  }

  _flashCapture() {
    const overlay = document.getElementById('qsc-overlay');
    if (!overlay) return;
    overlay.style.background = 'rgba(255,255,255,0.3)';
    setTimeout(() => { overlay.style.background = ''; }, 150);
  }

  _showGallery() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:9999;overflow-y:auto;padding:20px;';
    modal.innerHTML = `
      <button onclick="this.parentElement.remove()" style="
        position:fixed;top:16px;left:16px;background:#ef4444;color:#fff;
        border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:16px;z-index:99999;
      ">✕ إغلاق</button>
      <h3 style="color:#c8961a;text-align:center;margin-bottom:16px;">الصور الملتقطة (${this.photos.length})</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
        ${this.photos.map((p, i) => `
          <div style="position:relative;">
            <img src="${p.dataURL}" style="width:100%;border-radius:6px;">
            <div style="color:#aaa;font-size:11px;text-align:center;padding:4px;">${p.step_label}</div>
            <button onclick="window.QS._captureInstance.removePhoto(${i});this.closest('div').remove()" style="
              position:absolute;top:4px;right:4px;background:#ef4444;color:#fff;
              border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px;
            ">×</button>
          </div>
        `).join('')}
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ══════════════════════════════════════════
  // مراقبة الحرارة
  // ══════════════════════════════════════════

  _startHeatMonitor() {
    // محاكاة — المتصفح لا يوفر درجة الحرارة مباشرة
    // نستخدم عدد الصور الملتقطة كمعيار بديل
    this._heatCheckInterval = setInterval(() => {
      if (this._captureCount > 0 && this._captureCount % 8 === 0) {
        this._showHeatWarning();
        if (this._onHeatWarning) this._onHeatWarning();
      }
    }, 30000);
  }

  _showHeatWarning() {
    const el = document.getElementById('qsc-heat-warning');
    if (!el) return;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
  }

  // ══════════════════════════════════════════
  // IndexedDB
  // ══════════════════════════════════════════

  async _initIndexedDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('QatarSpecCapture', 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
      };
      req.onsuccess = e => { this.db = e.target.result; resolve(); };
      req.onerror = () => { console.warn('IndexedDB غير متاح'); resolve(); };
    });
  }

  async _savePhotoToDB(photo) {
    if (!this.db) return;
    const tx = this.db.transaction('photos', 'readwrite');
    const store = tx.objectStore('photos');
    // لا نخزّن blob كاملاً — فقط dataURL والبيانات الوصفية
    store.put({ id: photo.id, step: photo.step, label: photo.step_label, dataURL: photo.dataURL, timestamp: photo.timestamp });
  }

  async saveToIndexedDB() {
    for (const photo of this.photos) {
      await this._savePhotoToDB(photo);
    }
  }

  async loadFromIndexedDB() {
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('photos', 'readonly');
      const store = tx.objectStore('photos');
      const req = store.getAll();
      req.onsuccess = e => resolve(e.target.result);
      req.onerror = () => resolve([]);
    });
  }

  async clearIndexedDB() {
    if (!this.db) return;
    const tx = this.db.transaction('photos', 'readwrite');
    tx.objectStore('photos').clear();
  }

  // ══════════════════════════════════════════
  // الأحداث (callbacks)
  // ══════════════════════════════════════════

  onCapture(cb) { this._onCapture = cb; }
  onQualityWarning(cb) { this._onQualityWarning = cb; }
  onComplete(cb) { this._onComplete = cb; }
  onHeatWarning(cb) { this._onHeatWarning = cb; }

  // ══════════════════════════════════════════
  // مساعدات
  // ══════════════════════════════════════════

  _canvasToBlob(canvas, quality) {
    return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
  }
};
