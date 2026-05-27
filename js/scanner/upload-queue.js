// js/scanner/upload-queue.js — QatarSpec Pro
// قائمة انتظار الرفع — IndexedDB للـ Offline + Background Sync

const QS = window.QS || {};

QS.UploadQueue = (() => {
  const DB_NAME = 'QatarSpecScans';
  const DB_VERSION = 1;
  const STORE_NAME = 'pendingScans';
  let db = null;

  // فتح قاعدة البيانات
  async function openDB() {
    if (db) return db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const database = e.target.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          store.createIndex('sessionId', 'sessionId', { unique: false });
          store.createIndex('status', 'status', { unique: false });
        }
      };
      req.onsuccess = (e) => { db = e.target.result; resolve(db); };
      req.onerror = () => reject(req.error);
    });
  }

  // حفظ صورة في الـ Queue
  async function save(imageData) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record = {
        sessionId: imageData.sessionId || QS.UploadQueue._currentSession,
        index: imageData.index,
        blob: imageData.blob,
        timestamp: imageData.timestamp,
        gps: imageData.gps,
        status: 'pending', // pending | uploading | done | failed
        retries: 0,
      };
      const req = store.add(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  // جلب كل الصور المعلقة لجلسة معينة
  async function getPending(sessionId) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const index = store.index('sessionId');
      const req = index.getAll(sessionId);
      req.onsuccess = () => resolve(req.result.filter(r => r.status !== 'done'));
      req.onerror = () => reject(req.error);
    });
  }

  // تحديث حالة سجل
  async function updateStatus(id, status) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const record = getReq.result;
        if (record) {
          record.status = status;
          store.put(record);
        }
        resolve();
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }

  // رفع كل الصور المعلقة
  async function flushPending(sessionId, scaleInfo = null) {
    const pending = await getPending(sessionId);
    if (pending.length === 0) return { uploaded: 0 };

    let uploaded = 0;
    const formData = new FormData();

    for (const record of pending) {
      formData.append('images', record.blob, `scan_${record.index}.jpg`);
      await updateStatus(record.id, 'uploading');
    }

    formData.append('sessionId', sessionId);

    // إرفاق معلومات معايرة المقياس إذا كانت متوفرة
    if (scaleInfo) {
      formData.append('scale_info', JSON.stringify(scaleInfo));
    }

    try {
      const res = await fetch('/api/scanner?action=upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        // إعادة الحالة لـ pending عند الفشل
        for (const record of pending) {
          await updateStatus(record.id, 'pending');
        }
        const err = await res.json();
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const result = await res.json();

      for (const record of pending) {
        await updateStatus(record.id, 'done');
        uploaded++;
      }

      return { uploaded, jobId: result.job_id };
    } catch (err) {
      for (const record of pending) {
        await updateStatus(record.id, 'failed');
      }
      throw err;
    }
  }

  // تنظيف الجلسات المنتهية
  async function clearSession(sessionId) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const index = store.index('sessionId');
      const req = index.openCursor(sessionId);
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  // تسجيل Background Sync إن كان مدعوماً
  async function registerSync(sessionId) {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        const reg = await navigator.serviceWorker.ready;
        await reg.sync.register(`scan-upload-${sessionId}`);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  // إنشاء session ID جديد
  function newSession() {
    const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    QS.UploadQueue._currentSession = id;
    return id;
  }

  return { save, getPending, flushPending, clearSession, registerSync, newSession };
})();

window.QS = QS;
