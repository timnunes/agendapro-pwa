importScripts('./config.js');

const CACHE_NAME = CONFIG.appShortName + "-" + CONFIG.cacheVersion;

// Só cacheia assets estáticos — NUNCA o index.html
const urlsToCache = [
  './manifest.json',
  './config.js',
  './app.js',
  './style.css',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // index.html NUNCA serve do cache — sempre da rede
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Demais assets: cache first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
