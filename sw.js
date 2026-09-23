// ACCE PRO — Service Worker v1.0
const CACHE_NAME = 'accepro-v3';
// Rutas relativas al sitio (sirve en GitHub Pages /Acce7/ y en pruebas locales)
const ASSETS = [
  './',
  './index.html'
];

// Instalar y cachear recursos
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS).catch(function() {});
    })
  );
  self.skipWaiting();
});

// Activar y limpiar caché viejo
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requests — Network first, cache fallback
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  // Solo archivos propios del sitio: las fotos/documentos de Google Drive y las
  // llamadas a Google/Firebase van directo a la red (no se guardan en caché)
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(function() {
        return caches.match(e.request);
      })
  );
});

// Al tocar un aviso (calificación nueva, pendientes del día): abrir o enfocar la app
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
      return self.clients.openWindow('./');
    })
  );
});
