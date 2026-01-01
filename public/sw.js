/**
 * Service Worker for Life OS PWA
 * Offline-first strategy with cache-only approach
 * Caches static files and PDF assets on installation
 */

const CACHE_NAME = 'life-os-v3v4'
const ASSETS_TO_CACHE = [
  // HTML
  '/',
  '/index.html',

  // CSS
  '/styles.css',

  // JavaScript
  '/app.js',

  // Manifest and metadata
  '/manifest.json'
];

/**
 * INSTALL EVENT
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

/**
 * ACTIVATE EVENT
 * Clean up old cache versions
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * FETCH EVENT
 * Cache-first strategy for GET requests
 */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }

        return fetch(event.request)
          .then(response => {
            // Only cache successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return cached response if available, otherwise show offline message
            console.log('Service Worker: Fetch failed for:', event.request.url);
            return caches.match(event.request)
              .then(response => response || new Response('Offline - resource not available', { status: 503 }));
          });
      })
  );
});

console.log('Service Worker: Loaded');
