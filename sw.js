// QatarSpec Pro — Service Worker v2.0
// Cache First للمحتوى الثابت | Network First للـ AI Search
const CACHE_NAME = 'qatarspec-v2.0';
const DATA_CACHE = 'qatarspec-data-v2.0';

// Static assets — Cache First
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Data files — Cache First (long-lived)
const DATA_FILES = [
  '/data/roads.json',
  '/data/utilities.json',
  '/data/structural.json',
  '/data/geotech.json',
  '/data/tools.json',
];

// Install — cache static + data files
self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(STATIC_ASSETS).catch(function(e) {
          console.log('Static cache partial:', e);
        });
      }),
      caches.open(DATA_CACHE).then(function(cache) {
        return cache.addAll(DATA_FILES).catch(function(e) {
          console.log('Data cache partial:', e);
        });
      }),
    ])
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) {
          return k !== CACHE_NAME && k !== DATA_CACHE;
        }).map(function(k) {
          return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // AI Search — Network First (never cache)
  if (url.includes('/api/search') || url.includes('/api/health')) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return new Response(
          JSON.stringify({ error: 'لا يوجد اتصال — خدمة البحث غير متاحة بدون إنترنت' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Data JSON files — Cache First, update in background
  if (url.includes('/data/') && url.endsWith('.json')) {
    event.respondWith(
      caches.open(DATA_CACHE).then(function(cache) {
        return cache.match(event.request).then(function(cached) {
          var fetchPromise = fetch(event.request).then(function(response) {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          });
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // Static assets — Cache First
  if (url.includes('/index.html') || url.endsWith('/') || url.includes('/manifest.json')) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        var fetchPromise = fetch(event.request).then(function(response) {
          if (response.ok) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        }).catch(function() {
          // Offline fallback
          return cached || new Response(
            '<html dir="rtl"><body style="font-family:Cairo,sans-serif;text-align:center;padding:40px;background:#0d0d0d;color:#fff;"><h1 style="color:#c9a84c;">📴 أنت غير متصل</h1><p>QatarSpec Pro يعمل بالبيانات المحفوظة.<br>للبحث الذكي تحتاج اتصالاً بالإنترنت.</p></body></html>',
            { headers: { 'Content-Type': 'text/html;charset=utf-8' } }
          );
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Default — network with cache fallback
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
