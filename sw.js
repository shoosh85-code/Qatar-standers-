/**
 * QatarSpec Pro — Service Worker v1.6
 * ────────────────────────────────────
 * Strategy:
 *   • Cache-First  → Google Fonts, cdnjs, static HTML/CSS/JS/images
 *   • Network-First → Anthropic API, Google AI API (never cache)
 *   • StaleWhileRevalidate → همع شبكة + تحديث خلفي للكروت الثابتة
 *
 * Cache Names:
 *   qs-static-v1   : الملفات الثابتة (HTML, fonts, lib)
 *   qs-runtime-v1  : طلبات runtime قابلة للتخزين
 */

const CACHE_STATIC   = 'qs-static-v1';
const CACHE_RUNTIME  = 'qs-runtime-v1';
const CACHE_VERSION  = '1.6.0';

/** الملفات المُخزَّنة مسبقاً عند التثبيت */
const PRECACHE_URLS = [
  './index_v7.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;900&display=swap',
  'https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1l_6gLrZjiLlJ-G0.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

/** نطاقات API — لا تُخزَّن أبداً (Network-First فقط) */
const API_ORIGINS = [
  'https://api.anthropic.com',
  'https://generativelanguage.googleapis.com',
];

/** نطاقات الـ fonts والمكتبات الثابتة — Cache-First */
const CACHEABLE_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com',
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing QatarSpec SW', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        // لا نوقف التثبيت إذا فشل تخزين بعض الملفات (مثلاً offline)
        console.warn('[SW] Precache partial failure (expected offline):', err.message);
      });
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating QatarSpec SW', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const validCaches = [CACHE_STATIC, CACHE_RUNTIME];
      return Promise.all(
        cacheNames
          .filter((name) => !validCaches.includes(name))
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ─── FETCH ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ① API calls — Network-First, no cache, no fallback (يجب اتصال حي)
  if (API_ORIGINS.some((origin) => request.url.startsWith(origin))) {
    event.respondWith(networkOnly(request));
    return;
  }

  // ② Fonts & static CDN libs — Cache-First
  if (CACHEABLE_ORIGINS.some((origin) => request.url.startsWith(origin))) {
    event.respondWith(cacheFirst(request, CACHE_STATIC));
    return;
  }

  // ③ Same-origin navigation (HTML pages) — Network-First مع fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // ④ Same-origin static assets (JS, CSS, images داخل الملف الواحد) — Cache-First
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, CACHE_RUNTIME));
    return;
  }

  // ⑤ غير ذلك — Network مباشر
  // (لا نتدخل)
});

// ─── STRATEGIES ───────────────────────────────────────────────────────────────

/**
 * Cache-First:
 * يبحث في الـ cache أولاً، وإذا لم يجد يجلب من الشبكة ويخزّن.
 */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone()); // لا نوقف الرد
    }
    return response;
  } catch (err) {
    console.warn('[SW] Cache-First network failure:', request.url, err.message);
    return offlineFallback();
  }
}

/**
 * Network-First مع fallback على الـ cache:
 * يحاول الشبكة أولاً، وعند الفشل يرجع للـ cache، وعند عدم وجوده يُعيد صفحة offline.
 */
async function networkFirstWithFallback(request) {
  const cache = await caches.open(CACHE_STATIC);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) {
      console.log('[SW] Serving from cache (offline):', request.url);
      return cached;
    }
    return offlineFallback();
  }
}

/**
 * Network-Only:
 * للـ API calls — لا نخزّن أبداً.
 */
async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (err) {
    // أعد خطأ 503 بدلاً من إسقاط الطلب
    return new Response(
      JSON.stringify({ error: 'offline', message: 'لا يوجد اتصال بالإنترنت — API غير متاح' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Offline Fallback HTML بسيط
 */
function offlineFallback() {
  return new Response(
    `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>غير متصل — QatarSpec Pro</title>
  <style>
    body{font-family:'Tajawal',sans-serif;background:#0A0A0A;color:#EDE8DC;
         display:flex;align-items:center;justify-content:center;min-height:100vh;
         flex-direction:column;gap:16px;text-align:center;padding:24px}
    h1{color:#C9A84C;font-size:28px}
    p{color:#B0A898;font-size:15px;line-height:1.7}
    button{background:#7A1515;color:#E8C97A;border:1px solid rgba(201,168,76,.3);
           padding:12px 28px;border-radius:10px;font-size:15px;cursor:pointer;margin-top:8px}
  </style>
</head>
<body>
  <div style="font-size:56px">📡</div>
  <h1>لا يوجد اتصال بالإنترنت</h1>
  <p>QatarSpec Pro يعمل offline للمحتوى المحفوظ مسبقاً.<br>
     تأكد من اتصالك بالإنترنت لتحميل الصفحة الكاملة.</p>
  <button onclick="location.reload()">🔄 إعادة المحاولة</button>
</body>
</html>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }
  );
}

// ─── BACKGROUND SYNC (اختياري للمستقبل) ──────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});
