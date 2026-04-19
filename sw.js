// QatarSpec Pro — Service Worker v1.7.6
// Cache Strategy: Cache-First HTML/CSS, Network-First API, SWR for JSON/JS chunks
const CACHE_VERSION = 'qsp-v1.7.6';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const CHUNK_CACHE   = `${CACHE_VERSION}-chunks`;
const API_CACHE     = `${CACHE_VERSION}-api`;

// Static assets: Cache-First (HTML, CSS, SW itself)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/calc-worker.js',
];

// Chunk files: Stale-While-Revalidate
const CHUNK_PATTERN = /\/data\/.+-data\.js$/;

// API calls: Network-First with 3s timeout fallback
const API_PATTERN = /api\.anthropic\.com|\/api\//;

// Install — precache static shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(c => c.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate — delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('qsp-') && !k.startsWith(CACHE_VERSION))
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — route by strategy
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Skip non-GET and cross-origin except API
  if (e.request.method !== 'GET') return;

  // API calls: Network-First with timeout
  if (API_PATTERN.test(url)) {
    e.respondWith(networkFirstWithTimeout(e.request, 8000, API_CACHE));
    return;
  }

  // Chunk JS files: Stale-While-Revalidate
  if (CHUNK_PATTERN.test(url)) {
    e.respondWith(staleWhileRevalidate(e.request, CHUNK_CACHE));
    return;
  }

  // HTML + static: Cache-First
  e.respondWith(cacheFirst(e.request, STATIC_CACHE));
});

// ─── Strategies ───

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  // Always fetch in background to update cache
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
