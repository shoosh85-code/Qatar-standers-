// ═══════════════════════════════════════════════════════════════
// الفجوة 2: Offline Queue + Background Upload — QatarSpec Pro
// الملف: js/offline-queue.js
// IndexedDB queue + رفع تلقائي عند عودة الشبكة
// المرجع: QCS 2024 | QatarSpec Pro v3.0
// ═══════════════════════════════════════════════════════════════

window.OfflineQueue = (function() {
  'use strict';

  const DB_NAME    = 'QSOfflineQueue';
  const DB_VERSION = 1;
  const STORE_NAME = 'uploads';
  let db = null;

  // ── فتح قاعدة البيانات ───────────────────────────────────
  async function openDB() {
    if (db) return db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = e => {
        const store = e.target.result.createObjectStore(STORE_NAME, {
          keyPath: 'id', autoIncrement: true
        });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      };
      req.onsuccess = e => { db = e.target.result; resolve(db); };
      req.onerror   = () => reject(req.error);
    });
  }

  // ── إضافة عملية رفع إلى الـ queue ──────────────────────
  async function enqueue(sessionId, imageFiles, metadata = {}) {
    const database = await openDB();
    // تحويل الصور إلى ArrayBuffer للتخزين
    const buffers = await Promise.all(
      imageFiles.map(f => f.arrayBuffer().then(buf => ({
        name: f.name, type: f.type, buffer: buf
      })))
    );
    return new Promise((resolve, reject) => {
      const tx    = database.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const item  = {
        sessionId,
        images:    buffers,
        metadata:  { ...metadata, qcs: 'QCS 2024' },
        status:    'pending',    // pending | uploading | done | failed
        retries:   0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const req = store.add(item);
      req.onsuccess = () => {
        resolve(req.result); // الـ id
        updateQueueBadge();
      };
      req.onerror = () => reject(req.error);
    });
  }

  // ── محاولة رفع كل العمليات المعلقة ──────────────────────
  async function processQueue() {
    if (!navigator.onLine) return;
    const database = await openDB();
    const pending  = await getAllByStatus('pending');

    for (const item of pending) {
      await updateStatus(item.id, 'uploading');
      try {
        // إعادة بناء FormData من الـ ArrayBuffers المخزنة
        const formData = new FormData();
        formData.append('session_id', item.sessionId);
        item.images.forEach((img, i) => {
          const blob = new Blob([img.buffer], { type: img.type });
          formData.append('images', blob, img.name || `img_${i}.jpg`);
        });

        const res = await fetch('/api/scan-upload', {
          method: 'POST',
          body:   formData,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        await updateStatus(item.id, 'done', { jobId: data.job_id });
        window.QS3D?.log?.(`✅ رُفع من الـ Queue — Job: ${data.job_id}`);

      } catch (err) {
        const retries = (item.retries || 0) + 1;
        const newStatus = retries >= 3 ? 'failed' : 'pending';
        await updateStatus(item.id, newStatus, { retries, error: err.message });
        window.QS3D?.log?.(`⚠️ فشل الرفع (محاولة ${retries}/3): ${err.message}`);
      }
    }
    updateQueueBadge();
  }

  // ── مساعدات داخلية ───────────────────────────────────────
  async function getAllByStatus(status) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx    = database.transaction(STORE_NAME, 'readonly');
      const index = tx.objectStore(STORE_NAME).index('status');
      const req   = index.getAll(status);
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }

  async function updateStatus(id, status, extra = {}) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx    = database.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req   = store.get(id);
      req.onsuccess = () => {
        const item = req.result;
        if (!item) return resolve();
        Object.assign(item, { status, updatedAt: Date.now(), ...extra });
        store.put(item).onsuccess = resolve;
      };
      req.onerror = () => reject(req.error);
    });
  }

  function updateQueueBadge() {
    getAllByStatus('pending').then(items => {
      const badge = document.getElementById('offlineQueueBadge');
      if (badge) {
        badge.textContent = items.length > 0
          ? `📤 ${items.length} في الانتظار`
          : '✅ Queue فارغ';
        badge.style.color = items.length > 0 ? '#f59e0b' : '#10b981';
        badge.style.display = 'block';
      }
    }).catch(() => {});
  }

  // ── مراقبة الشبكة ────────────────────────────────────────
  window.addEventListener('online',  () => {
    window.QS3D?.log?.('🌐 عادت الشبكة — جاري رفع الملفات المعلقة...');
    processQueue();
  });
  window.addEventListener('offline', () => {
    window.QS3D?.log?.('📴 لا يوجد اتصال — سيتم الرفع عند عودة الشبكة');
  });

  // ── تشغيل أولي ───────────────────────────────────────────
  openDB().then(() => {
    if (navigator.onLine) processQueue();
  }).catch(err => console.error('[OfflineQueue] init error:', err));

  return { enqueue, processQueue, getAllByStatus, updateQueueBadge };
})();

// ═══════════════════════════════════════════════════════════════
// إضافات scanner.html — أضف قبل إغلاق </body>
// ═══════════════════════════════════════════════════════════════
/*
<script src="js/offline-queue.js"></script>
<div id="offlineQueueBadge" style="
  position:fixed; bottom:16px; left:16px;
  background:rgba(0,0,0,0.8); padding:6px 12px;
  border-radius:20px; font-size:0.78rem; color:#10b981;
  display:none; z-index:1000;
"></div>
*/
