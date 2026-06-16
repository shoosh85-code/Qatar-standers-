// QatarSpec Pro Service Worker v1
const CACHE_NAME = 'qatarspec-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/core/search-system.min.js',
  '/js/core/calculators-ui.min.js',
  '/js/core/detail-modal.min.js',
  '/inline-scripts.min.js',
  '/loader.min.js',
];

// Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — Cache First for static, Network First for API
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  
  // Skip API calls
  if (url.pathname.startsWith('/api/')) return;
  
  // Network first for HTML
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match(e.request) || caches.match('/index.html'))
    );
    return;
  }
  
  // Cache first for static assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      });
    })
  );
});
