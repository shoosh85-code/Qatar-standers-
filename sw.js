// sw.js — QatarSpec Pro v3.5.0
// هدف: مسح كل الكاش القديم وتحميل النسخة الجديدة فوراً
// [S4] توحيد SW registration — security-cleanup.js فقط

const CACHE_NAME = 'qatarspec-v3-5-0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/loader.js',
  '/data_calcs.js',
  '/js/xss-utils.js',
  '/stepper.js',
  '/inline-scripts.js',
  '/js/stepper-init.js',
  '/js/content-aliases.js',
  '/js/calc-lazy-loader.js',
  '/js/analytics.js',
  '/js/export/pdf.js',
  '/js/export/word.js',
  '/js/export/excel.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-512x512-maskable.png',
  '/offline.html',
  '/api/health',
  '/404.html',
  '/500.html'
];

// INSTALL: مسح كل الكاش القديم فوراً
self.addEventListener('install', (event) => {
  console.log('[SW] v3.5.0 installing...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        // addAll بدون أخطاء — نتجاهل الملفات غير الموجودة
        return Promise.allSettled(
          STATIC_ASSETS.map(url => cache.add(url).catch(() => {
            console.warn('[SW] Could not cache:', url);
          }))
        );
      });
    }).then(() => self.skipWaiting())
  );
});

// ACTIVATE: تفعيل فوري بدون انتظار
self.addEventListener('activate', (event) => {
  console.log('[SW] v3.5.0 activated');
  event.waitUntil(
    // مسح أي كاش متبقٍّ لا يطابق الإصدار الحالي
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Removing stale cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH: network-first دائماً (لا cache-first)
self.addEventListener('fetch', (event) => {
  // تجاهل طلبات غير GET
  if (event.request.method !== 'GET') return;

  // تجاهل طلبات API — لا تُكاش أبداً
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // تحديث الكاش بالنسخة الجديدة فقط إذا كان الرد صحيحاً
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // fallback للكاش فقط إذا فشل النت
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // إذا لم يوجد في الكاش — أرجع صفحة رئيسية
          return caches.match('/');
        });
      })
  );
});
