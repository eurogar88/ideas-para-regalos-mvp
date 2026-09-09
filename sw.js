const CACHE_NAME = 'regalazo-shell-growth-v13';
const SHELL = [
  '/',
  '/styles.css?v=growth-ui-18',
  '/app.js?v=growth-engine-21',
  '/theme.js?v=theme-1',
  '/analytics.js?v=analytics-6',
  '/manifest.webmanifest',
  '/icon.svg',
  '/og-image.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const requestUrl = new URL(event.request.url);
  const isDocument = event.request.mode === 'navigate' || requestUrl.pathname === '/' || requestUrl.pathname.endsWith('.html');
  if (isDocument) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/')))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok) {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }
      return response;
    }))
  );
});
