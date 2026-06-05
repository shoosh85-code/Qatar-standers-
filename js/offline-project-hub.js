/**
 * QatarSpec Pro — Offline Project Hub
 * IndexedDB-backed queue للـ DWR/IR/NCR عند انقطاع النت
 * يُزامن تلقائياً عند العودة للإنترنت
 */

window.OfflineHub = (function() {
'use strict';

const DB_NAME    = 'qatarspec_offline';
const DB_VERSION = 1;
const STORES     = ['pending_actions', 'cached_projects', 'cached_documents'];

let db = null;
let syncInProgress = false;

// ══════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════
async function init() {
  try {
    db = await openDB();
    console.log('[OfflineHub] IndexedDB ready');

    // مراقبة حالة الشبكة
    window.addEventListener('online',  () => onOnline());
    window.addEventListener('offline', () => onOffline());

    // إذا كانت الشبكة متاحة عند البدء — تزامن
    if (navigator.onLine) await syncPendingActions();

    updateConnectionStatus(navigator.onLine);
    return true;
  } catch(err) {
    console.warn('[OfflineHub] IndexedDB not available:', err.message);
    return false;
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      // قائمة العمليات المعلقة
      if (!db.objectStoreNames.contains('pending_actions')) {
        const store = db.createObjectStore('pending_actions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }

      // cache المشاريع
      if (!db.objectStoreNames.contains('cached_projects')) {
        const pStore = db.createObjectStore('cached_projects', { keyPath: 'id' });
        pStore.createIndex('updated_at', 'updated_at', { unique: false });
      }

      // cache الوثائق (DWR/NCR/IR)
      if (!db.objectStoreNames.contains('cached_documents')) {
        const dStore = db.createObjectStore('cached_documents', { keyPath: 'local_id' });
        dStore.createIndex('type', 'type', { unique: false });
        dStore.createIndex('project_id', 'project_id', { unique: false });
        dStore.createIndex('synced', 'synced', { unique: false });
      }
    };

    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror  = (e) => reject(new Error('IndexedDB open failed: ' + e.target.error));
  });
}

// ══════════════════════════════════════════════════════════════
// QUEUE — إضافة عملية للـ pending queue
// ══════════════════════════════════════════════════════════════
async function queueAction(type, endpoint, payload) {
  if (!db) return null;

  const action = {
    type,                           // 'create_dwr' | 'create_ncr' | 'create_ir' | 'update_project'
    endpoint,                       // '/api/project-hub?resource=...'
    payload: JSON.stringify(payload),
    timestamp: Date.now(),
    status: 'pending',              // 'pending' | 'syncing' | 'synced' | 'failed'
    retries: 0,
    local_id: 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending_actions', 'readwrite');
    const req = tx.objectStore('pending_actions').add(action);
    req.onsuccess = () => {
      console.log('[OfflineHub] Queued:', type, action.local_id);
      showOfflineToast('💾 تم الحفظ محلياً — سيُزامَن عند الاتصال');
      resolve({ ...action, id: req.result });
    };
    req.onerror = () => reject(req.error);
  });
}

// ══════════════════════════════════════════════════════════════
// CACHE — حفظ المشاريع والوثائق محلياً للقراءة Offline
// ══════════════════════════════════════════════════════════════
async function cacheProjects(projects) {
  if (!db || !projects?.length) return;
  const tx = db.transaction('cached_projects', 'readwrite');
  const store = tx.objectStore('cached_projects');
  projects.forEach(p => store.put({ ...p, cached_at: Date.now() }));
}

async function getCachedProjects() {
  if (!db) return [];
  return new Promise((resolve) => {
    const tx = db.transaction('cached_projects', 'readonly');
    const req = tx.objectStore('cached_projects').getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror   = () => resolve([]);
  });
}

async function cacheDocument(type, projectId, data) {
  if (!db) return;
  const doc = {
    local_id: 'doc_' + Date.now() + '_' + Math.random().toString(36).slice(2),
    type,                           // 'dwr' | 'ncr' | 'ir'
    project_id: projectId,
    data: JSON.stringify(data),
    created_at: Date.now(),
    synced: false,
  };
  return new Promise((resolve) => {
    const tx = db.transaction('cached_documents', 'readwrite');
    const req = tx.objectStore('cached_documents').add(doc);
    req.onsuccess = () => resolve({ ...doc, id: req.result });
    req.onerror   = () => resolve(null);
  });
}

async function getUnsyncedDocuments() {
  if (!db) return [];
  return new Promise((resolve) => {
    const tx = db.transaction('cached_documents', 'readonly');
    const index = tx.objectStore('cached_documents').index('synced');
    const req = index.getAll(IDBKeyRange.only(false));
    req.onsuccess = () => resolve(req.result || []);
    req.onerror   = () => resolve([]);
  });
}

// ══════════════════════════════════════════════════════════════
// SYNC — تزامن عند عودة الاتصال
// ══════════════════════════════════════════════════════════════
async function syncPendingActions() {
  if (syncInProgress || !db || !navigator.onLine) return;
  syncInProgress = true;

  try {
    const pending = await getPendingActions();
    if (pending.length === 0) { syncInProgress = false; return; }

    console.log('[OfflineHub] Syncing', pending.length, 'pending actions...');
    showOfflineToast(`🔄 جارٍ تزامن ${pending.length} عملية معلقة...`);

    let synced = 0;
    let failed = 0;

    for (const action of pending) {
      try {
        await updateActionStatus(action.id, 'syncing');

        const res = await fetch(action.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: action.payload,
          signal: AbortSignal.timeout(15000),
        });

        if (res.ok) {
          await updateActionStatus(action.id, 'synced');
          synced++;
        } else {
          const err = await res.json().catch(() => ({}));
          console.warn('[OfflineHub] Sync failed:', action.type, err);
          if (action.retries >= 3) {
            await updateActionStatus(action.id, 'failed');
            failed++;
          } else {
            await updateActionRetries(action.id, action.retries + 1);
          }
        }
      } catch(err) {
        console.warn('[OfflineHub] Network error:', err.message);
        await updateActionRetries(action.id, (action.retries || 0) + 1);
      }
    }

    if (synced > 0) showOfflineToast(`✅ تمّ تزامن ${synced} عملية بنجاح`);
    if (failed > 0) showOfflineToast(`⚠️ فشل تزامن ${failed} عملية — تحقق من الاتصال`, 'error');

    // إشعار الـ Project Hub بالتحديث
    if (synced > 0 && typeof window.QS?.refreshProjects === 'function') {
      window.QS.refreshProjects();
    }

  } finally {
    syncInProgress = false;
  }
}

async function getPendingActions() {
  if (!db) return [];
  return new Promise((resolve) => {
    const tx = db.transaction('pending_actions', 'readonly');
    const index = tx.objectStore('pending_actions').index('status');
    const req = index.getAll(IDBKeyRange.only('pending'));
    req.onsuccess = () => resolve(req.result || []);
    req.onerror   = () => resolve([]);
  });
}

function updateActionStatus(id, status) {
  if (!db) return Promise.resolve();
  return new Promise((resolve) => {
    const tx = db.transaction('pending_actions', 'readwrite');
    const store = tx.objectStore('pending_actions');
    const req = store.get(id);
    req.onsuccess = () => {
      const record = req.result;
      if (record) { record.status = status; store.put(record); }
      resolve();
    };
    req.onerror = () => resolve();
  });
}

function updateActionRetries(id, retries) {
  if (!db) return Promise.resolve();
  return new Promise((resolve) => {
    const tx = db.transaction('pending_actions', 'readwrite');
    const store = tx.objectStore('pending_actions');
    const req = store.get(id);
    req.onsuccess = () => {
      const record = req.result;
      if (record) { record.retries = retries; store.put(record); }
      resolve();
    };
    req.onerror = () => resolve();
  });
}

// ══════════════════════════════════════════════════════════════
// STATS — إحصائيات الـ queue
// ══════════════════════════════════════════════════════════════
async function getStats() {
  if (!db) return { pending: 0, synced: 0, failed: 0, cached_projects: 0 };
  const pending = await getPendingActions();
  const cachedProjects = await getCachedProjects();
  return {
    pending: pending.length,
    cached_projects: cachedProjects.length,
    is_online: navigator.onLine,
  };
}

// ══════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════
function onOnline() {
  console.log('[OfflineHub] Back online');
  updateConnectionStatus(true);
  showOfflineToast('🌐 عاد الاتصال — جارٍ التزامن...');
  setTimeout(() => syncPendingActions(), 1000);
}

function onOffline() {
  console.log('[OfflineHub] Offline mode');
  updateConnectionStatus(false);
  showOfflineToast('📴 لا يوجد اتصال — سيُحفظ محلياً', 'warning');
}

function updateConnectionStatus(isOnline) {
  // تحديث مؤشر الاتصال في الـ header إذا وُجد
  const statusDot = document.querySelector('.ai-dot, #connection-dot');
  if (statusDot) {
    statusDot.style.background = isOnline ? '#27ae60' : '#e74c3c';
    statusDot.title = isOnline ? 'متصل' : 'غير متصل';
  }

  // أضف شريط تنبيه إذا كان offline
  let bar = document.getElementById('offline-bar');
  if (!isOnline) {
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'offline-bar';
      bar.style.cssText = [
        'position:fixed;top:0;left:0;right:0;z-index:9999',
        'background:#e74c3c;color:#fff;text-align:center',
        'padding:6px;font-size:12px;font-family:Tajawal,Cairo,sans-serif'
      ].join(';');
      bar.textContent = '📴 وضع عدم الاتصال — التغييرات ستُحفظ محلياً وتُزامَن عند الاتصال';
      document.body.prepend(bar);
    }
  } else if (bar) {
    bar.remove();
  }
}

let toastTimer;
function showOfflineToast(msg, type = 'info') {
  let toast = document.getElementById('offline-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'offline-toast';
    toast.style.cssText = [
      'position:fixed;bottom:20px;right:20px;z-index:9998',
      'background:rgba(3,3,10,0.9);backdrop-filter:blur(8px)',
      'border:1px solid rgba(201,168,76,0.3);border-radius:10px',
      'padding:10px 16px;font-size:12px;font-family:Tajawal,Cairo,sans-serif',
      'color:#eaeaea;max-width:300px;transition:opacity .3s',
      'direction:rtl;text-align:right'
    ].join(';');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.borderColor = type === 'error' ? 'rgba(231,76,60,0.5)'
    : type === 'warning' ? 'rgba(243,156,18,0.5)'
    : 'rgba(201,168,76,0.3)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 4000);
}

// ══════════════════════════════════════════════════════════════
// SMART SAVE — يحفظ محلياً إذا Offline وإلا يُرسل للـ API
// ══════════════════════════════════════════════════════════════
async function smartSave(type, endpoint, payload, projectId) {
  if (navigator.onLine) {
    // الشبكة متاحة — أرسل مباشرة
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      if (res.ok) return { success: true, source: 'server', data: await res.json() };
      throw new Error('Server error: ' + res.status);
    } catch(err) {
      console.warn('[OfflineHub] Server save failed, falling back to local:', err.message);
    }
  }

  // Offline أو فشل الشبكة — احفظ محلياً
  const queued = await queueAction(type, endpoint, payload);
  if (projectId) await cacheDocument(type, projectId, payload);
  return { success: true, source: 'local', queued };
}

// ══════════════════════════════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════════════════════════════
return {
  init,
  smartSave,
  queueAction,
  cacheProjects,
  getCachedProjects,
  cacheDocument,
  getUnsyncedDocuments,
  syncPendingActions,
  getStats,
  showOfflineToast,
  isOnline: () => navigator.onLine,
};

})();

// Auto-init عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  OfflineHub.init().then(ready => {
    if (ready) console.log('[OfflineHub] Ready — Offline mode supported');
  });
});
