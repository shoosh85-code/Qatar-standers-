// QatarSpec Pro — Service Worker v1.7.7
const CACHE_VERSION = 'qsp-v1.7.7';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const CHUNK_CACHE   = `${CACHE_VERSION}-chunks`;
const API_CACHE     = `${CACHE_VERSION}-api`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/calc-worker.js',
  '/data_calcs.js',
  '/loader.js',
  '/manifest.json'
];
// Large files cached separately on first use
const LARGE_FILES = ['/data_content.js'];

const CHUNK_PATTERN = /\/data\/.+-data\.js(\?.*)?$/;
const LARGE_PATTERN = /\/(data_content|data_calcs)\.js(\?.*)?$/;
const API_PATTERN   = /api\.anthropic\.com|\/api\//;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(c => c.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k.startsWith('qsp-') && !k.startsWith(CACHE_VERSION))
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (e.request.method !== 'GET') return;
  if (API_PATTERN.test(url)) { e.respondWith(networkFirstWithTimeout(e.request, 8000, API_CACHE)); return; }
  if (CHUNK_PATTERN.test(url)) { e.respondWith(staleWhileRevalidate(e.request, CHUNK_CACHE)); return; }
  e.respondWith(cacheFirst(e.request, STATIC_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch { return new Response('Offline', { status: 503 }); }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || await fetchPromise || new Response('Not found', { status: 404 });
}

async function networkFirstWithTimeout(request, timeoutMs, cacheName) {
  const cache = await caches.open(cacheName);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    clearTimeout(timeout);
    const cached = await cache.match(request);
    return cached || new Response(
      JSON.stringify({ error: 'Offline — cached response not available' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Offline fallback
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() =>
        caches.match('/index.html')
      )
    );
  }
});
