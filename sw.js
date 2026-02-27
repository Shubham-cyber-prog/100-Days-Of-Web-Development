importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox is loaded 🎉`);

  const { registerRoute } = workbox.routing;
  const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
  const { ExpirationPlugin } = workbox.expiration;
  const { backgroundSync } = workbox;

  // Cache core application assets (Styles, Scripts, Manifest)
  registerRoute(
    ({ request }) => request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image' ||
      request.url.includes('manifest.webmanifest'),
    new StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  // Cache HTML pages (Navigation) - Network First
  registerRoute(
    ({ request }) => request.mode === 'navigate' ||
      request.headers.get('accept').includes('text/html'),
    new NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // Cache project files from /public/ directory
  registerRoute(
    ({ url }) => url.pathname.startsWith('/public/'),
    new CacheFirst({
      cacheName: 'project-files',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 24 * 60 * 60, // 60 Days
        }),
      ],
    })
  );

  // Background Sync for progress updates
  const syncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('sync-progress', {
    maxRetentionTime: 24 * 60 // Retry for max 24 Hours
  });

  // Since we are using Firestore directly in the frontend, 
  // background sync here would typically intercept a POST request to a custom API.
  // However, for this project, we'll handle the actual DB sync via offlineService + indexedDB
  // which is triggered by the SW 'sync' event or when the app comes back online.

} else {
  console.log(`Workbox didn't load 😬`);
}

// Manual Background Sync Listener (if needed for custom logic)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgressData());
  }
});

async function syncProgressData() {
  console.log('Background Sync: Processing queued progress data...');
  // This logic is usually handled by the main thread when it comes back online,
  // but can be partially handled here if we had a dedicated API endpoint.
}

const OFFLINE_PAGE = '/offline.html';
const OFFLINE_IMAGE = '/website/assets/images/logo.png';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.addAll([
        OFFLINE_PAGE,
        '/website/style.css',
        '/website/script.js',
        '/index.html',
        '/manifest.webmanifest'
      ]);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !name.includes('workbox') && !name.includes('offline-cache') && !name.includes('static-resources') && !name.includes('pages-cache') && !name.includes('project-files'))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_PAGE))
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_PROJECT') {
    const projectUrls = event.data.urls || [];
    event.waitUntil(
      caches.open('project-files').then((cache) => cache.addAll(projectUrls))
    );
  }
});

