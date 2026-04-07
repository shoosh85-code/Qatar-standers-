// QatarSpec Pro — Service Worker v3.0
const CACHE_NAME = 'qatarspec-v3.0';
const DATA_CACHE = 'qatarspec-data-v3.0';

const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];
const DATA_FILES = [
  '/data/roads.json', '/data/utilities.json',
  '/data/structural.json', '/data/geotech.json', '/data/tools.json',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS).catch(() => {})),
      caches.open(DATA_CACHE).then(c => c.addAll(DATA_FILES).catch(() => {})),
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME && k !== DATA_CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // AI API — Network only, no cache
  if (url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'لا يوجد اتصال بالإنترنت' }),
          { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // Data JSON — Cache first, update background
  if (url.includes('/data/') && url.includes('.json')) {
    event.respondWith(
      caches.open(DATA_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          var networkFetch = fetch(event.request).then(res => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          });
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // HTML/Static — Network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (res.ok) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then(cached => cached ||
        new Response(
          '<html dir="rtl"><body style="font-family:Cairo,sans-serif;text-align:center;padding:40px;background:#0d0d0d;color:#fff;"><h1 style="color:#c9a84c;">📴 غير متصل</h1><p>QatarSpec Pro يعمل بالبيانات المحفوظة</p></body></html>',
          { headers: { 'Content-Type': 'text/html;charset=utf-8' } }
        )
      ))
  );
});
