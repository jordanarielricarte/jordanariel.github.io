var cacheName = "misperrisv2";
var filesToCache = [
    "/",
    "/index.html",
    "/registro.html",
    "/galeria.html",
    "/scripts/app.js",
    "/styles/main.css",
    "../jordanariel.github.io/styles/main.css/",
    "/images/perrologo.jpg",
    "/images/perrogaleria5.jpg",
    "/images/perrogaleria6.jpg",
    "/images/perrogaleria4.jpg",
    "/images/perrogaleria3.jpeg",
    "../jordanaguilera.github.io/javascript/app.js",
    "/images/bear9.jpg"
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );