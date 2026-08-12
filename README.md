# Desde el país del sol naciente al paraíso del Caribe

Sitio web de una sola página para dar a conocer y vender el libro de **Kenzo
Yamamoto** (207 páginas, ISBN 978-9945-30-628-6), unas memorias sobre la
inmigración japonesa en la República Dominicana.

- **Dominio de producción:** https://kenzoyamamoto.com
- **Estado:** listo para publicar. Se prueba primero en GitHub Pages.
- **Tecnología:** HTML, CSS y JavaScript escritos a mano. Sin frameworks, sin
  dependencias, sin proceso de compilación. Se publica copiando la carpeta.
- **Peso total:** ~720 KB, ocho imágenes.

---

## 1. Cómo está organizado

```
KenzoWeb/
├── index.html        La página completa: contenido y datos estructurados
├── 404.html          Página de error, con el mismo diseño
├── css/styles.css    Todo el diseño: colores, tipografía, responsive, impresión
├── js/main.js        Configuración, pedido por WhatsApp e interacciones
├── assets/           Ocho imágenes (WebP)
├── robots.txt        Permisos para los buscadores
├── sitemap.xml       Mapa del sitio para Google
├── _headers          Caché y seguridad (lo lee Netlify y Cloudflare Pages)
└── .gitignore
```

No hay carpeta `dist/` ni `build/`: lo que está en el repositorio es exactamente
lo que se sube al servidor.

### Por qué sin framework

El sitio es una página estática con un formulario que abre WhatsApp. No hay
sesiones, ni base de datos, ni contenido que cambie solo. Un framework habría
añadido dependencias que caducan, un paso de compilación y varios megas de
JavaScript para resolver algo que el navegador ya hace. Escrito a mano, el
proyecto se puede abrir dentro de cinco años y seguirá funcionando igual.

---

## 2. El único punto de configuración

Todo lo que cambia con el tiempo está reunido al principio de `js/main.js`:

```js
const CONFIG = {
  whatsapp: '18092231687',   // número que recibe los pedidos
  precio: 1200,              // precio por ejemplar
  moneda: 'RD$',
  libro: 'Desde el país del sol naciente al paraíso del Caribe'
};
```

**El precio se escribe una sola vez.** Al cargar la página, el guion lo copia en
los cinco lugares donde aparece (menú, cabecera, ficha del libro, preguntas
frecuentes y resumen del pedido) y calcula el total según la cantidad. Si se
deja vacío (`''`), la página pasa a decir «Consulta el precio» y el total, «A
confirmar»; no hace falta tocar nada más.

**El número de WhatsApp** va en formato internacional, solo dígitos: para la
República Dominicana es `1` más los diez dígitos.

> ⚠️ **Al cambiar el número hay que tocarlo en dos sitios.** En `CONFIG`, que es
> el que usa la página normalmente, y en los tres enlaces de respaldo del HTML
> que funcionan si el JavaScript no carga. Se encuentran buscando el número
> actual en `index.html`; hay un comentario que lo explica junto al primero.

**Si se cambia el precio**, hay que actualizarlo también en los datos
estructurados del `<head>` de `index.html` (la clave `"price"`), que es lo que
lee Google. Está señalado con un comentario.

---

## 3. Cómo funciona el pedido

No hay pasarela de pago ni servidor: el formulario redacta un mensaje y abre
WhatsApp con él ya escrito. La persona solo pulsa enviar.

1. Rellena la papeleta: nombre, teléfono, cantidad, forma de entrega, ciudad,
   dedicatoria y notas.
2. `construirMensaje()` arma el texto y `abrirWhatsApp()` lo pasa por
   `encodeURIComponent` a un enlace `https://wa.me/<número>?text=<mensaje>`.
3. Llega al teléfono del vendedor así:

```
Hola, quiero pedir el libro *Desde el país del sol naciente al paraíso del Caribe*,
de Kenzo Yamamoto.

*Nombre:* María Peña
*Teléfono:* 809 555 1234
*Ejemplares:* 3
*Entrega:* Envío a domicilio
*Ciudad / provincia:* Santiago
*Dedicatoria firmada:* sí — "Para Ana"
*Total del libro:* RD$ 3,600 (sin envío)

Quedo atento(a) a la información sobre el pago y la entrega. ¡Gracias!
```

Solo el nombre y el teléfono son obligatorios; se validan antes de abrir
WhatsApp y el error se anuncia también a los lectores de pantalla.

**Toda la página está construida para terminar en esa conversación**: el precio
del envío, las formas de pago y el punto de recogida se acuerdan por ahí. Por
eso las preguntas frecuentes remiten al chat en vez de dar respuestas cerradas
que después habría que mantener.

---

## 4. El diseño

La regla que ordena todo: **no entra ningún color, ninguna forma ni ninguna
tipografía que no venga del libro.**

### Colores

Están muestreados directamente de las ilustraciones de la portada, y llevan el
nombre japonés del elemento del que salen:

| Variable | Valores | De dónde sale |
|---|---|---|
| `--washi` | `#FBF4E7` `#F6EADA` `#FCE3D0` | el papel y el resplandor del amanecer |
| `--shu` | `#EE3230` `#D05145` `#B92B22` | el rojo del título, el sol naciente y el torii |
| `--ai` | `#1D4662` `#295B80` `#12354B` | el añil del monte Fuji y del lomo |
| `--mizu` | `#6DADDF` `#8BC3EB` `#B2D9F5` | el agua y la nieve de la cumbre |
| `--midori` | `#06595C` | el verde del subtítulo de la portada |
| `--sakura` | `#E098B0` `#E8C8D0` | las flores de cerezo |
| `--sumi` | `#1D1D1B` `#4A423C` | la tinta del texto |

Una decisión deliberada: **los botones de WhatsApp no son verdes.** El verde de
la marca era el único color ajeno al libro y rompía la unidad visual, así que
las llamadas a la acción van en el rojo del título. El icono se mantiene, que es
lo que la gente reconoce.

### La página como un libro

El sitio no se lee como una landing sino como un volumen impreso:

- **印章 el sello (hanko).** El cuadro rojo con 山本 hace de logotipo: aparece en
  el menú, junto a la foto del autor, bajo su firma y en el pie.
- **Capítulos en kanji.** 一 二 三 四 五 六 encabezan cada sección, con su
  etiqueta japonesa (本, 著者, 二つの文化, 読む理由, 作者の言葉, ご注文).
- **Texto vertical (縦書き).** 日出づる国からカリブの楽園へ en la cabecera; 物語 junto
  a la cita.
- **Patrones tradicionales.** 青海波 *seigaiha* (olas) de fondo en la cabecera, la
  cita y el pie; 七宝 *shippō* detrás del formulario.
- **Crestas de olas.** Las mismas medias lunas del seigaiha, ampliadas, cosen el
  papel con el añil: la cabecera entra en el mar y el añil sale a la playa. Son
  fondos CSS con SVG incrustado, no imágenes.
- **Recursos de editorial.** Capitulares rojas, colofón con la ficha, cinta
  marcapáginas sobre la portada y el formulario presentado como una papeleta de
  pedido (注文票) con folio «No. 27», por la Colonia Japonesa donde se estableció
  la familia.
- **Las cuatro razones para leerlo son kanji**, no iconos: 記憶, 融合, 言葉, 家族,
  con su lectura y su significado debajo.

### Tipografías

*Shippori Mincho* para los títulos —un mincho japonés que también dibuja bien el
alfabeto latino— y *EB Garamond* para el texto, que es la que más se acerca al
interior del libro. Se cargan desde Google Fonts con `display=swap`, así que el
texto se lee desde el primer momento aunque la tipografía llegue después.

> **El sello dice 山本**, la grafía del apellido confirmada por el autor.
> Aparece cinco veces en `index.html`, siempre dentro del sello y siempre
> con `aria-hidden`, para que un lector de pantalla no lo lea entre frases.

---

## 5. SEO

### Lo que ya está montado

- **Etiqueta canónica** apuntando a `https://kenzoyamamoto.com/`. Está puesta a
  propósito también en la copia de pruebas de GitHub Pages: así Google entiende
  que esa copia no es una página distinta y no la indexa como duplicada.
- **Open Graph y Twitter Card** con imagen, medidas y texto alternativo, para
  que el enlace se vea bien al compartirlo por WhatsApp, que es por donde más va
  a circular.
- **Datos estructurados** (schema.org) en un solo bloque `@graph` con cuatro
  entidades: `WebSite`, `Person` (el autor, con fecha y lugar de nacimiento),
  `Book` (con ISBN, edición y la oferta a RD$ 1,200 en pesos dominicanos) y
  `FAQPage` con las ocho preguntas. Gracias al `FAQPage`, Google puede mostrar
  las preguntas desplegables debajo del resultado.
- **`robots.txt` y `sitemap.xml`**, con las imágenes principales declaradas.
- **Un solo `<h1>`** y jerarquía de encabezados sin saltos.
- **Todas las imágenes** con `alt` descriptivo y con `width`/`height`, para que
  la página no dé saltos mientras carga.
- **Rendimiento:** la portada del libro se precarga con `fetchpriority="high"`
  porque es la imagen grande de la cabecera; el resto va con `loading="lazy"`.

### Qué se buscó posicionar

El objetivo no es competir por «libros japoneses» a secas —esa búsqueda la
ocupan las grandes librerías y no es lo que este libro es—, sino ganar las
búsquedas donde este libro es la mejor respuesta que existe:

- inmigración japonesa en la República Dominicana
- cultura dominico-japonesa
- Colonia Japonesa No. 27, La Vigía, Dajabón
- colonias japonesas en República Dominicana
- Kenzo Yamamoto

Esos términos se colocaron **dentro del contenido real**, no en etiquetas
ocultas: en la entrada de «Dos culturas», en el título de una de las razones para
leerlo, en los textos alternativos de las imágenes y en dos preguntas frecuentes
nuevas («¿De qué trata el libro?» y «¿Es una historia real?») que responden a
quien llega buscando el tema y no el título.

### Qué falta hacer, y no se puede hacer desde el código

El posicionamiento de una página nueva depende sobre todo de cosas externas:

1. **Dar de alta el sitio en [Google Search Console](https://search.google.com/search-console)**
   y enviar `sitemap.xml`. Sin esto, Google tarda semanas en encontrarlo.
2. **Conseguir enlaces desde sitios dominicanos**: la embajada de Japón en la
   República Dominicana, asociaciones dominico-japonesas, prensa cultural,
   librerías. Un solo enlace desde un medio serio vale más que cualquier ajuste
   de código.
3. **Ficha de Google Business** si hay un punto de venta físico.
4. **Vigilar los resultados** en Search Console durante los primeros meses:
   si las preguntas frecuentes aparecen desplegadas bajo el resultado, la marca
   `FAQPage` está haciendo su trabajo.

---

## 6. Probar el sitio

Basta abrir `index.html` con doble clic para ver el diseño, pero conviene
servirlo por HTTP para que se comporte igual que en producción:

```bash
python3 -m http.server 4400
```

Y entrar a `http://localhost:4400`.

### Lista de comprobación antes de publicar

- [ ] El formulario abre WhatsApp con el mensaje completo y los acentos correctos
- [ ] El botón «Prefiero escribir directo» abre el chat
- [ ] El precio coincide en el menú, la cabecera, la ficha, las preguntas y el resumen
- [ ] En móvil no aparece barra de desplazamiento horizontal
- [ ] El menú hamburguesa abre, cierra y navega
- [ ] Las preguntas frecuentes se despliegan
- [ ] Ninguna imagen se queda rota
- [ ] Con el JavaScript desactivado, los enlaces de WhatsApp siguen funcionando

---

## 7. Publicar

### Primero: pruebas en GitHub Pages

```bash
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

En el repositorio, **Settings → Pages → Source: Deploy from a branch → `main` /
(root)**. En un par de minutos queda en
`https://USUARIO.github.io/REPOSITORIO/`.

Funciona en un subdirectorio porque **todas las rutas del sitio son relativas**
(`assets/…`, `css/…`). No hay que cambiar nada para probar.

### Después: el dominio

Cuando las pruebas estén conformes, hay dos caminos:

**Seguir en GitHub Pages.** Crear un archivo `CNAME` en la raíz con el contenido
`kenzoyamamoto.com`, apuntar los DNS del dominio a GitHub y activar *Enforce
HTTPS* en Settings → Pages.

**Pasar a Netlify o Cloudflare Pages** (recomendado). Conectar el repositorio, y
el archivo `_headers` empieza a aplicarse solo: añade caché de un año a
imágenes, estilos y guion, y cabeceras de seguridad. El HTML se revalida siempre,
así que los cambios se ven al momento.

En cualquiera de los dos casos conviene decidir si el dominio oficial es
`kenzoyamamoto.com` o `www.kenzoyamamoto.com` y **redirigir uno al otro**. La
etiqueta canónica del sitio usa la versión sin `www`.

### Al cambiar estilos o guion

`index.html` los carga como `css/styles.css?v=6` y `js/main.js?v=6`. Si se
editan esos archivos, hay que **subir ese número** (`?v=7`, `?v=8`…): así los
navegadores que ya visitaron el sitio reciben la versión nueva en vez de la
guardada. Es el motivo por el que `_headers` puede permitirse un año de caché.

---

## 8. Las imágenes

| Archivo | Dónde aparece | Origen |
|---|---|---|
| `book-cover.webp` | portada 3D de la cabecera y del resumen | fotografía entregada |
| `author-photo.webp` | fotografía del autor | fotografía entregada |
| `mapas.webp` | mapas de Japón y la República Dominicana | imagen entregada |
| `sakura-rama.webp` | rama de cerezo de la cabecera | del `sakura.svg` original |
| `torii.webp` | torii de la sección de pedidos, y el favicon | del `tori.svg` original |
| `paisaje.webp` | franja de palmeras, montañas y torii | recorte de la contraportada |
| `portada.webp` | portada plana en «El libro» | recorte de la portada |

### Decisiones sobre el material original

**Los SVG entregados no se podían usar tal cual.** Los cuatro (`sakura`, `tori`,
`monte-fuji`, `montana`) traían incrustada una textura de grano que Chrome dibuja
como una rejilla de líneas visible; se comprobó que ocurre igual con los archivos
originales sin tocar. Además pesaban entre 600 KB y 2,4 MB cada uno.

De ellos se conservan dos, convertidos a WebP con transparencia:
`sakura.svg` (1 MB → 88 KB) y `tori.svg` (2,4 MB → 13 KB). `monte-fuji.svg` y
`montana.svg` quedaron fuera del diseño final por una razón editorial, no
técnica: repetían montañas y paisajes que ya estaban en la portada del libro.

**Parte de las ilustraciones se recortaron del PDF de la portada** en alta
resolución. Da mejor resultado que los SVG y permite usar el dibujo original del
libro, que es el que da unidad a todo el sitio.

**Las etiquetas del mapa se rehicieron.** «JAPÓN» y «REPÚBLICA DOMINICANA»
venían quemadas en la imagen en gris oscuro, ilegibles sobre el fondo añil. Se
borraron del archivo y se pusieron como texto HTML en color claro, con el nombre
japonés encima (日本 / ドミニカ共和国). Están posicionadas en porcentajes, así
que acompañan a la imagen al cambiar de tamaño.

**Regla de composición:** cada paisaje aparece una sola vez. La única montaña de
la página es la de la portada del libro.

---

## 9. Accesibilidad

- Enlace de salto al formulario para quien navega con teclado.
- Contraste comprobado en el texto pequeño (las etiquetas japonesas y los romaji
  se oscurecieron a propósito para llegar al mínimo legible).
- Los errores del formulario se anuncian con `role="alert"` y `aria-live`.
- Todo el adorno —pétalos, patrones, sellos, kanji decorativos— lleva
  `aria-hidden`, para que un lector de pantalla no lea «山本» entre frases.
- El japonés visible que sí se lee lleva `lang="ja"`.
- Con `prefers-reduced-motion` se apagan los pétalos, el flotar de la portada y
  el desplazamiento suave.
- Foco visible en rojo sobre todos los elementos interactivos.

---

## 10. Si hay que ampliarlo

**Añadir una sección** significa copiar el bloque de otra: `<section class="section">`
con su cabecera `<header class="cap">` (numeral kanji, etiqueta japonesa, antetítulo
y `<h2>`), y añadir el enlace en los dos menús, el de escritorio y el móvil.
Los numerales van en orden: la siguiente sería 七.

**Al cambiar el precio o el número de páginas** hay que tocarlos también en los
datos estructurados del `<head>` (`"price"` y `"numberOfPages"`), que es lo que
lee Google. El precio, además, se escribe una sola vez en `CONFIG`.

**Añadir un campo al pedido** son tres pasos: el `<div class="field">` en el
formulario, leerlo en el `submit` de `js/main.js` y añadir su línea a
`construirMensaje()`.

**Si en el futuro hace falta cobrar en línea**, ese es el punto donde el
proyecto dejaría de ser estático y habría que pasar a una plataforma con
carrito. Mientras el volumen de pedidos se atienda por WhatsApp, no compensa.
