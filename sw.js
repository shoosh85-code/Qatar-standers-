const CACHE_NAME = 'qatarspec-v1.7.3';
const STATIC_CACHE = 'qatarspec-static-v1';

// الأصول التي تُخزَّن فوراً عند التثبيت
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;900&display=swap'
];

// install — precache الأصول الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// activate — حذف الـ caches القديمة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== STATIC_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// fetch strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // لا تتدخل في طلبات الـ API
  if (url.pathname.startsWith('/api/')) return;

  // لا تتدخل في WebSocket أو non-GET
  if (request.method !== 'GET') return;

  // Chrome extension requests
  if (!url.protocol.startsWith('http')) return;

  // HTML pages — Network-First (للحصول على آخر تحديث)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then(cached =>
          cached || caches.match('/index.html')
        ))
    );
    return;
  }

  // Google Fonts — Cache-First
  if (url.hostname.includes('fonts.g')) {
    event.respondWith(
      caches.match(request).then(cached =>
        cached || fetch(request).then(res => {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(request, clone));
          return res;
        })
      )
    );
    return;
  }

  // أصول ثابتة — Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(request).then(cached => {
        const fetchPromise = fetch(request).then(res => {
          if (res && res.status === 200) cache.put(request, res.clone());
          return res;
        }).catch(() => null);
        return cached || fetchPromise;
      })
    )
  );
});

// رسالة من الصفحة لتحديث الـ cache
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
