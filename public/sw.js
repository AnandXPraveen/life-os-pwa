/**
 * Service Worker for Life OS PWA
 * Offline-first strategy with cache-only approach
 * Caches static files and PDF assets on installation
 */

const CACHE_NAME = 'life-os-v1';
const ASSETS_TO_CACHE = [
  // HTML
  '/',
  '/index.html',
  
  // CSS
  '/styles.css',
  
  // JavaScript
  '/app.js',
  '/src/calendar.js',
  '/src/crypto.js',
  '/src/pillars.js',
  '/src/rules.js',
  '/src/storage.js',
  
  // Manifest and metadata
  '/manifest.json',
  
  // Static Assets
  '/assets/plan_v1.2.pdf'
];

/**
 * INSTALL EVENT
 * Precache all static files and assets
 * This ensures the app works offline immediately
 */
self.addEventListener('install', event => {
  console.log('Service Worker: Installing and caching static files...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`Service Worker: Caching ${ASSETS_TO_CACHE.length} files`);
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Cache installation failed', error);
      })
  );
});

/**
 * ACTIVATE EVENT
 * Clean up old caches and claim all clients
 */
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        // Delete old caches
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log(`Service Worker: Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Claim all clients immediately
        return self.clients.claim();
      })
  );
});

/**
 * FETCH EVENT
 * Cache-first strategy: serve from cache, never make network requests
 * This ensures 100% offline functionality
 */
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available
        if (response) {
          console.log(`Service Worker: Serving from cache: ${event.request.url}`);
          return response;
        }
        
        // If not in cache, return offline fallback
        console.warn(`Service Worker: File not in cache: ${event.request.url}`);
        
        // Return a generic offline response for HTML requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
        
        // Return a placeholder for other requests
        return new Response('Offline - Resource not available in cache', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
      .catch(() => {
        // Final fallback
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

/**
 * SERVICE WORKER LIFECYCLE
 * 
 * Install: Precaches all static files and assets
 * Activate: Cleans up old caches and claims all clients
 * Fetch: Serves from cache (offline-first, no network requests)
 * 
 * Result: Full offline functionality after first load
 */

console.log('Service Worker: Loaded and ready for registration');
