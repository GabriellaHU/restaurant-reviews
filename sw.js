// (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 'use strict';
//
// let staticCacheName = 'restaurant-app';
// // nwe comment
// self.addEventListener('install', function (event) {
//   event.waitUntil(caches.open(staticCacheName).then(function (cache) {
//     return cache.addAll(['/', 'js/main.js', 'css/main.css', 'imgs/', 'https://fonts.googleapis.com/css?family=Open+Sans:400,700', 'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff']);
//   }));
// });
//
// self.addEventListener('activate', function (event) {
//   event.waitUntil(caches.keys().then(function (cacheNames) {
//     return Promise.all(cacheNames.filter(function (cacheName) {
//       return cacheName.startsWith('wittr-') && cacheName != staticCacheName;
//     }).map(function (cacheName) {
//       return caches['delete'](cacheName);
//     }));
//   }));
// });
//
// self.addEventListener('fetch', function (event) {
//   event.respondWith(caches.match(event.request).then(function (response) {
//     return response || fetch(event.request);
//   }));
// });
//
// },{}],2:[function(require,module,exports){
// "use strict";
//
// var r = FetchEvent.prototype.respondWith;
// FetchEvent.prototype.respondWith = function () {
//   return new URL(this.request.url).search.endsWith("bypass-sw") ? void 0 : r.apply(this, arguments);
// };
//
// },{}]},{},[1,2])

//# sourceMappingURL=sw.js.map




// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------

// 
// // Set a name for the current cache
// var cacheName = 'restaurant-app';
//
// // Default files to always cache
// var cacheFiles = [
// 	'./',
// 	'./index.html',
//   './restaurant.html',
// 	'./js/main.js',
//   './js/dbhelper.js',
//   './js/restaurant_info.js',
// 	'./css/style.css',
//   'img/1.jpg',
//   'img/2.jpg',
//   'img/3.jpg',
//   'img/4.jpg',
//   'img/5.jpg',
//   'img/6.jpg',
//   'img/7.jpg',
//   'img/8.jpg',
//   'img/9.jpg',
//   'img/10.jpg',
// 	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic'
// ]
//
//
// self.addEventListener('install', function(e) {
//     console.log('[ServiceWorker] Installed');
//
//     // e.waitUntil Delays the event until the Promise is resolved
//     e.waitUntil(
//
//     	// Open the cache
// 	    caches.open(cacheName).then(function(cache) {
//
// 	    	// Add all the default files to the cache
// 			console.log('[ServiceWorker] Caching cacheFiles');
// 			return cache.addAll(cacheFiles);
// 	    })
// 	); // end e.waitUntil
// });
//
//
// self.addEventListener('activate', function(e) {
//     console.log('[ServiceWorker] Activated');
//
//     e.waitUntil(
//
//     	// Get all the cache keys (cacheName)
// 		caches.keys().then(function(cacheNames) {
// 			return Promise.all(cacheNames.map(function(thisCacheName) {
//
// 				// If a cached item is saved under a previous cacheName
// 				if (thisCacheName !== cacheName) {
//
// 					// Delete that cached file
// 					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
// 					return caches.delete(thisCacheName);
// 				}
// 			}));
// 		})
// 	); // end e.waitUntil
//
// });
//
//
// self.addEventListener('fetch', function(e) {
// 	console.log('[ServiceWorker] Fetch', e.request.url);
//
// 	// e.respondWidth Responds to the fetch event
// 	e.respondWith(
//
// 		// Check in cache for the request being made
// 		caches.match(e.request)
//
//
// 			.then(function(response) {
//
// 				// If the request is in the cache
// 				if ( response ) {
// 					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
// 					// Return the cached version
// 					return response;
// 				}
//
// 				// If the request is NOT in the cache, fetch and cache
//
// 				var requestClone = e.request.clone();
// 				return fetch(requestClone)
// 					.then(function(response) {
//
// 						if ( !response ) {
// 							console.log("[ServiceWorker] No response from fetch ")
// 							return response;
// 						}
//
// 						var responseClone = response.clone();
//
// 						//  Open the cache
// 						caches.open(cacheName).then(function(cache) {
//
// 							// Put the fetched response in the cache
// 							cache.put(e.request, responseClone);
// 							console.log('[ServiceWorker] New Data Cached', e.request.url);
//
// 							// Return the response
// 							return response;
//
// 				        }); // end caches.open
//
// 					})
// 					.catch(function(err) {
// 						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
// 					});
//
//
// 			}) // end caches.match(e.request)
// 	); // end e.respondWith
// });
