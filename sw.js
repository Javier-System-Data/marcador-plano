/* Marcador de plano - service worker.
   Página principal: primero la red (con tiempo de espera) y, si no hay señal, la copia guardada.
   Al publicar una versión nueva, cambia VERSION aquí y APP_VERSION en index.html (mismo valor). */
const VERSION='1.7.0';
const CACHE='marcador-'+VERSION;
const ESPERA_RED=4000;
const ARCHIVOS=['./','manifest.json','icon-192.png','icon-512.png'];
const RAIZ=new URL('./',self.location).href;
const limpia=async r=>r.redirected?new Response(await r.blob(),{status:r.status,statusText:r.statusText,headers:r.headers}):r;

self.addEventListener('install',e=>e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  for(const u of ARCHIVOS){
    const r=await fetch(new Request(u,{cache:'reload'}));
    if(!r.ok)throw new Error('No se pudo guardar '+u);
    await c.put(new Request(u),await limpia(r));
  }
})()));

self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x))))));

async function redPrimero(rq){
  const c=await caches.open(CACHE);
  try{
    const r=await Promise.race([fetch(rq),new Promise((_,no)=>setTimeout(()=>no(new Error('espera')),ESPERA_RED))]);
    /* redirección (por ejemplo, Access pide iniciar sesión): el navegador debe seguirla */
    if(r.type==='opaqueredirect'||(r.status>=300&&r.status<400))return r;
    /* error del servidor: mejor la copia guardada */
    if(r.status>=500){const k=await c.match(RAIZ);return k||r}
    /* respuesta válida de la propia página: renovar la copia guardada */
    if(r.ok&&r.type==='basic'&&!r.redirected&&(r.headers.get('content-type')||'').includes('text/html')){
      c.put(RAIZ,r.clone()).catch(()=>{});
    }
    return r;
  }catch(err){
    return (await c.match(RAIZ))||Response.error();
  }
}

self.addEventListener('fetch',e=>{
  const rq=e.request;
  if(rq.method!=='GET')return;
  const u=new URL(rq.url);
  if(u.origin!==location.origin)return;
  if(u.pathname.endsWith('/estado.json')){e.respondWith(fetch(rq,{cache:'no-store'}));return}
  if(rq.mode==='navigate'){e.respondWith(redPrimero(rq));return}
  e.respondWith(caches.match(rq,{ignoreSearch:true}).then(r=>r||fetch(rq)));
});

self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
