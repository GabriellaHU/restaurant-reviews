// SERVICE WORKER

// Code based on bitsofcode
// https://www.youtube.com/watch?v=BfL3pprhnms

let cacheName = 'v2';
const cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  'https://fonts.googleapis.com/css?family=Open+Sans:400,700',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  // '//normalize-css.googlecode.com/svn/trunk/normalize.css'
];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Installed');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(

    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {

        if (thisCacheName !== cacheName) {
          console.log('[ServiceWorker] Removing cachedFiles from ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetching', e.request.url);

  e.respondWith(
    caches.match(e.request).then(function(response) {

      if (response) {
        console.log('[ServiceWorker] Found in cache', e.request.url);
        return response;
      }

      let requestClone = e.request.clone();
      fetch(requestClone).then(function(response) {

        if (!response) {
          console.log('[ServiceWorker] No response from fetch');
          return response;
        }

        let responseClone = response.clone();
        caches.open(cacheName).then(function(cache) {

          cache.put(e.request, responseClone);
          return response;

        });

      }).catch(function(error) {

        console.log('[ServiceWorker] Error Fetching & Caching');

      });


    })

  );

});
