// QatarSpec Pro — Service Worker v3.3.0 (Phase 7)
// Network-first strategy, bumped version to invalidate Phase 6/7 caches
const CACHE = 'qatarspec-v3-3-0';

// On install: skip waiting immediately so new SW activates fast
self.addEventListener('install', e => {
  self.skipWaiting();
});

// On activate: delete ALL old caches and claim clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Message handler: allow pages to force skipWaiting
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Fetch: network first, cache fallback for offline
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Never intercept: API calls, auth, external APIs
  if (
    url.includes('/api/') ||
    url.includes('anthropic') ||
    url.includes('googleapis') ||
    url.includes('supabase') ||
    url.includes('vercel.app/api') ||
    e.request.method !== 'GET'
  ) {
    return;
  }

  // For all GET requests: network first, stale cache as offline fallback
  e.respondWith(
    fetch(e.request).then(response => {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
      }
      return response;
    }).catch(() => {
      return caches.match(e.request).then(cached => {
        return cached || caches.match('/index.html');
      });
    })
  );
});
