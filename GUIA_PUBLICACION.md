# Marcador de plano — guía de publicación (GitHub Pages)

## Archivos que se suben (todos en la raíz del repositorio)
`index.html` · `sw.js` · `manifest.json` · `icon-192.png` · `icon-512.png`

## Publicar por primera vez
1. Crear cuenta en github.com (si no tienes) y confirmar el correo.
2. **+ → New repository**. Nombre neutro (ej. `marcador-plano`, sin el nombre de la empresa). Visibilidad **Public**. Marcar *Add a README file*. **Create repository**.
3. **Add file → Upload files**. Arrastrar los 5 archivos. **Commit changes**.
4. **Settings → Pages**. En *Build and deployment*: Source = *Deploy from a branch*, Branch = `main`, carpeta `/ (root)`. **Save**.
5. Esperar 1–3 minutos y refrescar. Aparece: *Your site is live at* `https://USUARIO.github.io/marcador-plano/`.
6. Abrir ese enlace en Chrome (PC): debe verse el marcador y, arriba, la versión (`v1.2.0`).

## Instalar en celular o tablet (Android)
1. Abrir el enlace en **Chrome**, con internet.
2. Menú ⋮ → **Instalar aplicación** (o *Agregar a la pantalla principal*).
3. Abrir la aplicación una vez con internet. Desde la segunda apertura funciona también sin conexión.

## Publicar una versión nueva
1. Cambiar el número de versión en **dos** lugares con el mismo valor: `APP_VERSION` en `index.html` y `VERSION` en `sw.js`.
2. En el repositorio: **Add file → Upload files**, subir `index.html` y `sw.js` con el mismo nombre (reemplazan a los anteriores). **Commit changes**.
3. Esperar de 2 a 10 minutos.
4. Al abrir la aplicación con internet aparece un aviso azul: **Actualizar**. Antes de tocarlo, guardar el avance (*Guardar avance*), porque la página se recarga.

## Si algo falla
- *No aparece el enlace:* revisar Settings → Pages y esperar unos minutos.
- *No ofrece instalar:* abrir con Chrome y por el enlace `https://`, no desde un archivo.
- *No aparece el aviso de versión nueva:* confirmar que cambiaron los dos números y esperar unos minutos más.
- *El micrófono no funciona:* permitir el micrófono para el sitio (ícono de candado junto a la dirección) y tener internet.

## Importante
- El repositorio es **público**: cualquiera con el enlace ve la página y la lista de códigos. Los planos, marcas y comentarios se quedan en cada dispositivo.
- Al cambiar de dirección (otra cuenta o alojamiento), las marcas guardadas automáticamente no se transfieren: terminar o usar *Guardar avance* antes.
