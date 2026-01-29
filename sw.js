self.addEventListener("install",e=>{
 self.skipWaiting();
});

self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.open("altay-cache").then(cache=>{
   return cache.match(e.request).then(resp=>{
    return resp||fetch(e.request).then(net=>{
     cache.put(e.request,net.clone());
     return net;
    });
   });
  })
 );
});
