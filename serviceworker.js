const version = 'v0.04';
const staticCacheName = version + 'staticfiles';

addEventListener('install', installEvent => {
  console.log('The service worker is installing...');
  installEvent.waitUntil(
    caches.open(staticCacheName)
    .then ( staticCache => {
      return staticCache.addAll([
        '/css/styles.css'
      ]); // end retusn addAll
      // cache your files here
    }) // end open then
  ); // end waitUntil
}); // end addEventListener


addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    // Clean all the things!
    caches.keys()
    .then( cacheNames => {
      return Promise.all(
        cacheNames.map( cacheName => {
          if (cacheName != staticCacheName) {
            return caches.delete(cacheName);
          } // end if
        }) // end map
      ); // end return Promise.all
    }) // end keys then
    .then( () => {
      return clients.claim();
    }) // end then
  ); // end waitUntil
}); // end addEventListener


// When the browser requests a file...
addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  fetchEvent.respondWith(
    // First, look i the cache
    caches.match(request)
    .then( responseFromCache => {
      if (responseFromCache) {
        return responseFromCache;
      } // end if
      // Otherwise fetch from the network
      return fetch(request);
    }) // end match then
  ); // end responseWith
});  // end addEventListener


// addEventListener('fetch', fetchEvent => {
//   const request = fetchEvent.request;
//   console.log('The service worker is listening, yeah yeah yeah...')
//   fetchEvent.respondWith(
//     fetch(request)
//     .then( responseFromFetch => {
//       return responseFromFetch;
//     }) // end fetch then
//     .catch(error => {
//       return new Response('<h1>Oops!</h1> <p>Something went wrong, unfortunately</p>',
//       {
//         headers: {'Content-type': 'text/html; charset=utf-8'}
//       }
//     );
//     }) // end fetch catch
//   ); // end responseWith
// });  // end addEventListener
