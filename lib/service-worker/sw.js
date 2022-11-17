const sw = this;


sw.addEventListener('install', (worker) => {
  worker.waitUntil(
    caches.open('app-v1').then((cache) => {
      console.log('Service Worker: Cache opened.')
      return cache.addAll([
        './main.js',
        './main.css',
        './serviceWorker.html'
      ])
    })
  )
})

sw.addEventListener('fetch', (worker) => {
  worker.respondWith(
    caches.match(worker.request).then((res) => {
      if (res) return res;
      // Send XHR request
      // fetch(url).then(res => {
      //   if (res) {
      //     caches.addAll(...[res])
      //   } else {
      //     // Error handling
      //   }
      // })
    })
  )
})