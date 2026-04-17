/**
 * QatarSpec Pro — Service Worker v1.7
 * ════════════════════════════════════
 * Strategy:
 *   • Cache-First  → Google Fonts, CDN assets (Tailwind, libraries), images
 *   • Network-First → Anthropic API, Gemini API (never cache AI responses)
 *   • Stale-While-Revalidate → HTML page itself
 */

const CACHE_NAME    = 'qatarspec-v1.7';
const STATIC_CACHE  = 'qatarspec-static-v1.7';
const DYNAMIC_CACHE = 'qatarspec-dynamic-v1.7';

// ── Assets to pre-cache on install ──────────────────────────────────────────
const PRECACHE_ASSETS = [
  './',
  './index_v7.html',
  // Google Fonts (will be fetched on first load, then cached)
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;900&display=swap'
];

// ── Domains that should NEVER be cached (API endpoints) ─────────────────────
const NEVER_CACHE_HOSTS = [
  'api.anthropic.com',
  'generativelanguage.googleapis.com'
];

// ── Hosts that use Cache-First (static CDN assets) ──────────────────────────
const CACHE_FIRST_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'cdn.jsdelivr.net'
];

// ────────────────────────────────────────────────────────────────────────────
// INSTALL — pre-cache critical assets
// ────────────────────────────────────────────────────────────────────────────
self.addEventListener('install', function(event) {
  console.log('[QatarSpec SW] Installing v1.7...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache) {
      return cache.addAll(PRECACHE_ASSETS).catch(function(err) {
        // Don't fail install if some assets are unavailable offline
        console.warn('[QatarSpec SW] Pre-cache partial failure (expected offline):', err.message);
      });
    }).then(function() {
      console.log('[QatarSpec SW] Install complete. Skipping waiting.');
      return self.skipWaiting();
    })
  );
});

// ────────────────────────────────────────────────────────────────────────────
// ACTIVATE — clean up old caches
// ────────────────────────────────────────────────────────────────────────────
self.addEventListener('activate', function(event) {
  console.log('[QatarSpec SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME && key !== STATIC_CACHE && key !== DYNAMIC_CACHE;
        }).map(function(key) {
          console.log('[QatarSpec SW] Removing old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(function() {
      console.log('[QatarSpec SW] Activated. Claiming clients.');
      return self.clients.claim();
    })
  );
});

// ────────────────────────────────────────────────────────────────────────────
// FETCH — Route requests by strategy
// ────────────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  var url;
  try { url = new URL(event.request.url); } catch(e) { return; }

  // 1. Network-Only: Anthropic API / Gemini API — never intercept AI calls
  if (NEVER_CACHE_HOSTS.some(function(h) { return url.hostname === h; })) {
    // Let pass through — do not call event.respondWith()
    return;
  }

  // 2. Cache-First: Fonts & CDN static assets
  if (CACHE_FIRST_HOSTS.some(function(h) { return url.hostname === h; })) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // 3. Cache-First for same-origin static assets (images, CSS, JS files)
  if (url.origin === self.location.origin &&
      (event.request.destination === 'image' ||
       event.request.destination === 'style'  ||
       event.request.destination === 'script' ||
       event.request.destination === 'font')) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // 4. Stale-While-Revalidate for HTML pages (same origin)
  if (url.origin === self.location.origin &&
      (event.request.mode === 'navigate' ||
       event.request.destination === 'document')) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // 5. Default: Network with dynamic cache fallback
  event.respondWith(networkWithDynamicCache(event.request));
});

// ────────────────────────────────────────────────────────────────────────────
// STRATEGY HELPERS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Cache-First: Return cached version if available, else fetch and cache.
 * Ideal for fonts and CDN assets that rarely change.
 */
function cacheFirst(request) {
  return caches.match(request).then(function(cached) {
    if (cached) return cached;
    return fetch(request).then(function(response) {
      if (!response || response.status !== 200 || response.type === 'opaque') {
        return response;
      }
      var clone = response.clone();
      caches.open(STATIC_CACHE).then(function(cache) {
        cache.put(request, clone);
      });
      return response;
    }).catch(function() {
      // Offline and not cached — return nothing (browser handles error)
      return new Response('', { status: 503, statusText: 'Offline' });
    });
  });
}

/**
 * Stale-While-Revalidate: Return cached version immediately,
 * then update cache in background.
 * Ideal for HTML pages — fast load + fresh content.
 */
function staleWhileRevalidate(request) {
  var fetchPromise = fetch(request).then(function(response) {
    if (response && response.status === 200) {
      var clone = response.clone();
      caches.open(DYNAMIC_CACHE).then(function(cache) {
        cache.put(request, clone);
      });
    }
    return response;
  });
  return caches.match(request).then(function(cached) {
    return cached || fetchPromise;
  });
}

/**
 * Network-First with dynamic cache fallback.
 * Ideal for data that changes but should be available offline.
 */
function networkWithDynamicCache(request) {
  return fetch(request).then(function(response) {
    if (response && response.status === 200) {
      var clone = response.clone();
      caches.open(DYNAMIC_CACHE).then(function(cache) {
        cache.put(request, clone);
      });
    }
    return response;
  }).catch(function() {
    return caches.match(request).then(function(cached) {
      if (cached) return cached;
      return new Response(
        JSON.stringify({ error: 'offline', message: 'لا يوجد اتصال بالإنترنت' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    });
  });
}

// ────────────────────────────────────────────────────────────────────────────
// MESSAGE — allow pages to control SW (e.g. force update)
// ────────────────────────────────────────────────────────────────────────────
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) { return caches.delete(key); }));
    }).then(function() {
      event.ports[0].postMessage({ status: 'cache_cleared' });
    });
  }
});
