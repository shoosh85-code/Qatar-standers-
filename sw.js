// QatarSpec Pro — Service Worker v1.2
// Offline-first caching for Qatar Engineering Standards app

const CACHE_NAME = 'qatarspec-v1.2';
const FONT_CACHE = 'qatarspec-fonts-v1';

// Core assets to cache on install (app shell)
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Google Fonts to pre-cache for offline use
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;900&display=swap'
];

// ===== INSTALL — cache app shell =====
self.addEventListener('install', event => {
  console.log('[QatarSpec SW] Installing v1.2...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[QatarSpec SW] Caching app shell');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.log('[QatarSpec SW] Cache install error:', err))
  );
});

// ===== ACTIVATE — clean old caches =====
self.addEventListener('activate', event => {
  console.log('[QatarSpec SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== FONT_CACHE)
          .map(key => {
            console.log('[QatarSpec SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH — serve from cache, fallback to network =====
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and API calls (always go to network for Anthropic API)
  if (event.request.method !== 'GET') return;
  if (url.hostname === 'api.anthropic.com') return;
  if (url.hostname === 'generativelanguage.googleapis.com') return;

  // Fonts: cache-first strategy
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached || new Response('/* Font unavailable offline */', {
            headers: { 'Content-Type': 'text/css' }
          }));
        })
      )
    );
    return;
  }

  // App shell: cache-first, fallback to network then offline page
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Cache successful responses for the app
        if (response.ok && url.origin === self.location.origin) {
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, response.clone())
          );
        }
        return response;
      }).catch(() => {
        // Offline fallback: return cached index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline — QatarSpec Pro', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});

// ===== MESSAGE — handle cache refresh from app =====
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CACHE_REFRESH') {
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS));
  }
});
