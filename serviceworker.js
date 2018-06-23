addEventListener('install', function (event) {
  console.log('The service worker is installing...');
});

addEventListener('activate', function (event) {
  console.log('The service worker is activated.');
});

addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  console.log('The service worker is listening.')
  fetchEvent.respondWith(
    fetch(request)
    .then( responseFromFetch => {
      return responseFromFetch;
    }) // end fetch then
    .catch(error => {
      return new Response('Oops! Something went wrong.');
    }) // end fetch catch
  ); // end responseWith
});  // end addEventListener
