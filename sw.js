let cacheName = 'static-v4';

self.addEventListener('install', function(event){
	// open a cache and save all files
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll([
					'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
					'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
					'/',
					'/restaurant.html',
					'css/styles.css',
					'js/dbhelper.js',
					'js/main.js',
					'js/restaurant_info.js',
					'data/restaurants.json',
				]
			);
		})
	);
});


self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(keys){
			Promise.all(
				keys.map(function(key){
					if (key != cacheName){
						return caches.delete(key);
					}	
				})
			);
		})
	);
});



self.addEventListener('fetch', function(event){
	event.respondWith(
			caches.match(event.request).then(function(response){
				return response || fetch(event.request);
			})
		);
});



