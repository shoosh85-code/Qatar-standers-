// QatarSpec Pro — Service Worker v2.5.0 (Phase 9 — PWA Complete Offline Support)
// Strategy: Cache-first for assets, Network-first for content, Offline fallback

const CACHE_STATIC = 'qatarspec-static-v2.5.0';
const CACHE_CONTENT = 'qatarspec-content-v2.5.0';
const CACHE_API = 'qatarspec-api-v2.5.0';

// Static assets to precache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/loader.js',
  '/data_calcs.js',
  '/data_content_manifest.js',
  '/data_content_phase4.js',
];

// Content chunks — cache on first access
const CONTENT_PATTERN = /\/data_content.*\.js(\?.*)?$/;
const STATIC_PATTERN = /\.(css|woff2?|png|ico|svg)(\?.*)?$/;
const API_PATTERN = /\/api\//;

// ── Install: precache static shell ────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(PRECACHE_URLS.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()) // Don't block if some fail
  );
});

// ── Activate: clean old caches ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      const valid = [CACHE_STATIC, CACHE_CONTENT, CACHE_API];
      return Promise.all(
        keys.filter(k => !valid.includes(k)).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// ── Message: force update ─────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CACHE_STATUS') {
    caches.keys().then(keys => {
      event.ports[0]?.postMessage({ caches: keys });
    });
  }
});

// ── Fetch: smart routing ──────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = request.url;

  // Skip non-GET and external auth/payment
  if (request.method !== 'GET') return;
  if (url.includes('googleapis.com') && !url.includes('fonts')) return;
  if (url.includes('supabase.co')) return;

  // API calls: network only (never cache API responses containing auth)
  if (API_PATTERN.test(url)) {
    event.respondWith(
      fetch(request).catch(() => new Response(
        JSON.stringify({ error: 'Offline — API not available', offline: true }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      ))
    );
    return;
  }

  // Content chunks: cache-first (immutable, long-lived)
  if (CONTENT_PATTERN.test(url)) {
    event.respondWith(
      caches.open(CACHE_CONTENT).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Static assets: cache-first
  if (STATIC_PATTERN.test(url)) {
    event.respondWith(
      caches.open(CACHE_STATIC).then(cache =>
        cache.match(request).then(cached => cached || fetch(request))
      )
    );
    return;
  }

  // HTML + JS: network-first, stale fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          caches.open(CACHE_STATIC).then(cache => cache.put(request, response.clone()));
        }
        return response;
      })
      .catch(() =>
        caches.match(request)
          .then(cached => cached || caches.match('/index.html'))
      )
  );
});

// ── Background Sync: NCR/RFI pending submissions ──────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-ncr') {
    event.waitUntil(syncPendingNCRs());
  }
  if (event.tag === 'sync-rfi') {
    event.waitUntil(syncPendingRFIs());
  }
});

async function syncPendingNCRs() {
  // Opens IndexedDB and sends any pending NCRs
  // Implementation: posts to /api/ncr-submit when online
  const db = await openDB();
  const pending = await db.getAll('pending_ncrs');
  for (const ncr of pending) {
    try {
      const r = await fetch('/api/forms', {
        method: 'POST',
        body: JSON.stringify({ type: 'NCR', data: ncr }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (r.ok) await db.delete('pending_ncrs', ncr.id);
    } catch { /* will retry next sync */ }
  }
}

async function syncPendingRFIs() {
  const db = await openDB();
  const pending = await db.getAll('pending_rfis');
  for (const rfi of pending) {
    try {
      const r = await fetch('/api/forms', {
        method: 'POST',
        body: JSON.stringify({ type: 'RFI', data: rfi }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (r.ok) await db.delete('pending_rfis', rfi.id);
    } catch { /* will retry */ }
  }
}

// Simple IndexedDB wrapper
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('QatarSpecDB', 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('pending_ncrs'))
        db.createObjectStore('pending_ncrs', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('pending_rfis'))
        db.createObjectStore('pending_rfis', { keyPath: 'id' });
    };
    req.onsuccess = e => {
      const db = e.target.result;
      resolve({
        getAll: store => new Promise((res, rej) => {
          const tx = db.transaction(store, 'readonly');
          const req2 = tx.objectStore(store).getAll();
          req2.onsuccess = () => res(req2.result);
          req2.onerror = rej;
        }),
        delete: (store, id) => new Promise((res, rej) => {
          const tx = db.transaction(store, 'readwrite');
          const req2 = tx.objectStore(store).delete(id);
          req2.onsuccess = res;
          req2.onerror = rej;
        }),
      });
    };
    req.onerror = reject;
  });
}
