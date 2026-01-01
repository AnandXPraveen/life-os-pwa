// Service Worker for Life OS PWA

self.addEventListener('install', event => {
  console.log('SW installing...');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('SW activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('Offline'))
  );
});
