// QatarSpec Pro — Service Worker v4.0.0
// Smart caching: CacheFirst for immutable assets, NetworkFirst for HTML, StaleWhileRevalidate for JS chunks
const STATIC_CACHE  = 'qs-static-v4';   // immutable: assets, fonts
const CHUNK_CACHE   = 'qs-chunks-v4';   // data_*.js with long TTL
const PAGES_CACHE   = 'qs-pages-v4';    // HTML — network first
const ALL_CACHES    = [STATIC_CACHE, CHUNK_CACHE, PAGES_CACHE];

// Critical files to precache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/data_calcs.js',
  '/data_content_manifest.js',
  '/manifest.json',
  '/assets/icon-192.png',
];

// ── INSTALL: precache critical shell ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(PAGES_CACHE).then(cache =>
      cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'no-cache' })))
        .catch(() => {}) // don't block install on network failure
    ).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: delete old caches ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => !ALL_CACHES.includes(k)).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── MESSAGES ──
self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    e.ports?.[0]?.postMessage({ ok: true });
  }
});

// ── FETCH ──
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // Skip: non-GET, cross-origin API, Supabase, Gemini, Vercel functions
  if (req.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.hostname.includes('supabase')) return;
  if (url.hostname.includes('googleapis')) return;
  if (url.hostname.includes('anthropic')) return;

  // ── Strategy 1: CacheFirst — immutable versioned data chunks ──
  if (url.pathname.match(/^\/data_.*\.js$/) && url.search.includes('v=')) {
    e.respondWith(cacheFirst(req, CHUNK_CACHE));
    return;
  }

  // ── Strategy 2: CacheFirst — static assets (fonts, icons, images) ──
  if (
    url.pathname.startsWith('/assets/') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com')
  ) {
    e.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  // ── Strategy 3: StaleWhileRevalidate — unversioned JS (sw.js, loader.js) ──
  if (url.pathname.endsWith('.js') && !url.search.includes('v=')) {
    e.respondWith(staleWhileRevalidate(req, CHUNK_CACHE));
    return;
  }

  // ── Strategy 4: NetworkFirst — HTML pages (always fresh) ──
  if (
    req.destination === 'document' ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html')
  ) {
    e.respondWith(networkFirst(req, PAGES_CACHE));
    return;
  }

  // ── Default: StaleWhileRevalidate for everything else ──
  e.respondWith(staleWhileRevalidate(req, PAGES_CACHE));
});

// ═══════════════════════════════
// Caching Strategy Helpers
// ═══════════════════════════════

// CacheFirst: serve from cache, fallback network, update cache
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// NetworkFirst: try network, fallback to cache, update cache on success
async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req, { signal: AbortSignal.timeout(6000) });
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(req) || await cache.match('/index.html');
    return cached || new Response('Offline', { status: 503 });
  }
}

// StaleWhileRevalidate: serve cached immediately, update in background
async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req).then(fresh => {
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  }).catch(() => null);
  return cached || await fetchPromise || new Response('Offline', { status: 503 });
}
