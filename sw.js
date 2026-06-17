// QatarSpec Pro Service Worker v2
const CACHE_NAME = 'qatarspec-v2';
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

// Activate — delete ALL old caches regardless of name
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)))
  );
  self.clients.claim();
});

// Fetch — Network First for CSS/JS (always get latest), Cache First for images/fonts only
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Skip API calls entirely
  if (url.pathname.startsWith('/api/')) return;

  // Network first for HTML documents
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match(e.request) || caches.match('/index.html'))
    );
    return;
  }

  // Network first for CSS and JS — always fetch fresh, fall back to cache only if offline
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    e.respondWith(
      fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache first for everything else (images, fonts)
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
