/* Marcador de plano - service worker. Al publicar una versión nueva, cambia VERSION aquí y en index.html */
const VERSION='1.5.0';
const CACHE='marcador-'+VERSION;
const ARCHIVOS=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS.map(u=>new Request(u,{cache:'reload'}))))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>caches.match('index.html'))));
});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
