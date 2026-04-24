// QatarSpec Pro — Service Worker v3.2.1
// Simple network-first, no aggressive caching
const CACHE = 'qatarspec-v3-2-1';

// On install: skip waiting immediately
self.addEventListener('install', e => {
  self.skipWaiting();
});

// On activate: delete ALL old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network first, cache only for offline fallback
self.addEventListener('fetch', e => {
  const url = e.request.url;
  
  // Never cache API calls
  if (url.includes('/api/') || url.includes('anthropic') || url.includes('googleapis') || url.includes('supabase')) {
    return; // Let browser handle normally
  }
  
  // For everything else: network first
  e.respondWith(
    fetch(e.request).then(response => {
      // Cache successful responses
      if (response.ok && e.request.method === 'GET') {
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
      }
      return response;
    }).catch(() => {
      // Offline fallback
      return caches.match(e.request).then(cached => {
        return cached || caches.match('/index.html');
      });
    })
  );
});
