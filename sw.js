// sw.js — QatarSpec Pro v3.7.1
// هدف: استراتيجيات كاش متعددة حسب نوع الملف
// [PERF] Cache-First لـ data/ | Network-First لـ api/ | Stale-While-Revalidate لـ js/

const CACHE_NAME = 'qatarspec-v3-7-1';
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
  '/js/calcs/materials.js',
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
  '/500.html',
  '/projects.html',
  '/project-detail.html',
  '/login.html',
  '/js/projects-app.js',
  '/js/project-phase9.js',
  '/js/payment-certificates.js',
  // Scanner 3D — PWA offline support
  '/scanner.html',
  '/js/viewer/scene.js',
  '/js/scanner/capture.js',
  '/js/scanner/upload-queue.js',
  '/js/scanner/qcs-hotspots.js',
  '/css/scanner.css'
];

// INSTALL: مسح كل الكاش القديم فوراً
self.addEventListener('install', (event) => {
  console.log('[SW] v3.7.0 installing...');

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
  console.log('[SW] v3.7.0 activated — force cache refresh');
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

// ── استراتيجيات الكاش ──────────────────────────────────────────────

/**
 * Cache-First: يرجع من الكاش فوراً — يحدّث في الخلفية فقط إذا وُجد
 * مناسب لـ: data/*.js (تتغير نادراً، حجمها كبير)
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  // إذا لم يكن في الكاش — اجلبه من النت واحفظه
  const response = await fetch(request);
  if (response && response.status === 200) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

/**
 * Network-First: يجلب من النت دائماً — يرجع للكاش فقط عند فشل النت
 * مناسب لـ: /api/* (دائماً fresh)
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match('/');
  }
}

/**
 * Stale-While-Revalidate: يرجع من الكاش فوراً ويحدّث في الخلفية
 * مناسب لـ: /js/*.js (سرعة + تحديث تدريجي)
 */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  // ابدأ تحديث الكاش في الخلفية
  const fetchPromise = fetch(request).then(async (response) => {
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  // إذا وُجد في الكاش — ارجعه فوراً (بدون انتظار التحديث)
  return cached || fetchPromise;
}

// FETCH: توجيه حسب نوع الطلب
self.addEventListener('fetch', (event) => {
  // تجاهل طلبات غير GET
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // ── تجاهل الطلبات الخارجية (CDN) — لا تُعالج بالـ SW ──
  if (!url.startsWith(self.location.origin)) {
    return; // let browser handle external requests directly
  }

  // ── Network-First: API — لا تُكاش أبداً ──
  if (url.includes('/api/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ── Cache-First: Data files — تتغير نادراً ──
  if (url.includes('/data/') || url.match(/data_\w+\.js/)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // ── Stale-While-Revalidate: JS files — سرعة + تحديث تدريجي ──
  if (url.includes('/js/') || url.match(/\.js(\?|$)/)) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // ── Default: Network-First مع fallback للكاش ──
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          return caches.match('/');
        });
      })
  );
});
