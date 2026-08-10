# Desde el país del sol naciente al paraíso del Caribe — sitio web

Página web para promover y recibir pedidos del libro de **Kenzo Yamamoto**
(ISBN 978-9945-30-628-6). Sitio estático: HTML, CSS y JavaScript, sin servidor
ni base de datos. Los pedidos llegan por WhatsApp.

```
KenzoWeb/
├── index.html          ← todo el contenido de la página
├── css/styles.css      ← diseño, colores y responsive
├── js/main.js          ← configuración, resumen del pedido y WhatsApp
└── assets/             ← imágenes e ilustraciones
```

---

## 1. Lo único que necesitas editar

Abre `js/main.js`. Arriba de todo está el bloque `CONFIG`:

```js
const CONFIG = {
  whatsapp: '18092231687',   // número que recibe los pedidos
  precio: 1200,              // precio por ejemplar
  moneda: 'RD$',
  libro: 'Desde el país del sol naciente al paraíso del Caribe'
};
```

**Número de WhatsApp** — formato internacional, solo dígitos, sin `+` ni espacios.
Para República Dominicana es `1` + los 10 dígitos: `809 223 1687` → `'18092231687'`.

**Precio** — cambiar el número actualiza automáticamente los seis lugares donde
aparece (menú, portada, ficha del libro, preguntas frecuentes, resumen y cierre)
y el total del pedido. Si algún día prefieres no publicarlo, ponlo vacío (`''`)
y la página dirá «Consulta el precio».

---

## 2. Cómo funciona el pedido

1. La persona llena la **papeleta de pedido**.
2. Al presionar *Enviar pedido por WhatsApp* se abre WhatsApp con el mensaje ya escrito.
3. Solo tiene que presionar enviar. Llega así:

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

Toda la página está orientada a que la conversación termine en WhatsApp: no se
cobra ni se pide nada en línea. Las preguntas frecuentes y el bloque final
(«¿Te quedó alguna duda?») llevan al mismo chat.

---

## 3. El diseño

Un solo sistema visual, sacado por completo del libro.

**Colores** (todos muestreados de las ilustraciones originales de la portada):

| Nombre | Color | De dónde sale |
|---|---|---|
| 和紙 washi | `#FBF4E7` `#F6EADA` `#FCE3D0` | el papel y el resplandor del amanecer |
| 朱 shu | `#EE3230` `#D05145` `#B92B22` | el rojo del título, el sol naciente y el torii |
| 藍 ai | `#1D4662` `#295B80` `#12354B` | el añil del monte Fuji y del lomo |
| 水 mizu | `#6DADDF` `#8BC3EB` `#B2D9F5` | el agua y la nieve de la cumbre |
| 緑 midori | `#06595C` | el verde del subtítulo de la portada |
| 桜 sakura | `#E098B0` `#E8C8D0` | las flores de cerezo |
| 墨 sumi | `#1D1D1B` `#4A423C` | la tinta del texto |

No se usa ningún color ajeno al libro; los botones de WhatsApp van en el rojo
del título, no en verde.

**Elementos de identidad**

- **印章 el sello (hanko)** — el cuadro rojo con 山本 que aparece en el menú, junto
  a la foto del autor, bajo su firma y en el pie. Funciona como logo.
- **Capítulos en kanji** — 一 二 三 四 五 六 encabezan cada sección, como en un libro.
- **Etiquetas japonesas** — 本, 著者, 二つの文化, 作者の言葉, ご注文, 奥付 acompañan
  cada título en español.
- **Texto vertical (縦書き)** — 日出づる国からカリブの楽園へ en la portada y 物語 en la cita.
- **Patrones tradicionales** — 青海波 *seigaiha* (olas) en la portada, la cita y el pie;
  七宝 *shippō* (círculos entrelazados) detrás del formulario.
- **Detalles editoriales** — capitulares rojas, colofón, cinta marcapáginas, papeleta
  de pedido con folio «No. 27» (por la Colonia Japonesa No. 27 donde se estableció
  la familia) y pétalos de cerezo cayendo en la portada.
- **Crestas de olas** — las mismas medias lunas del seigaiha, ampliadas, sirven de
  costura entre el papel y el añil: la portada entra en el mar y el añil sale a la playa.

**Tipografías:** *Shippori Mincho* (un mincho japonés) para títulos y *EB Garamond*
para el texto, que es la que más se acerca al interior del libro.

> **Nota:** el sello dice 山本 (Yamamoto), la forma habitual del apellido en kanji.
> Si el autor lo escribe de otra manera, se cambia buscando `山本` en `index.html`.

---

## 3 bis. Al actualizar el sitio

`index.html` carga los estilos y el guion como `css/styles.css?v=3` y `js/main.js?v=3`.
Si algún día editas esos archivos y el navegador sigue mostrando la versión vieja,
sube el número (`?v=4`, `?v=5`…) y todos los visitantes reciben la versión nueva.

---

## 4. Ver la página en tu computadora

Doble clic en `index.html`, o para verla igual que en un servidor:

```bash
python3 -m http.server 4400 --directory /Users/alejandrocardenas/KenzoWeb
```

Luego entra a `http://localhost:4400`.

---

## 5. Publicarla en internet

Al ser un sitio estático sirve cualquier hosting. Lo más rápido es arrastrar la
carpeta completa a [app.netlify.com/drop](https://app.netlify.com/drop): queda
publicada en segundos y después se le puede conectar un dominio propio.
Alternativas equivalentes: Vercel, Cloudflare Pages o GitHub Pages.

Sube **la carpeta completa**: `index.html`, `css/`, `js/` y `assets/`.

---

## 6. Las imágenes

| Archivo | Dónde aparece | Origen |
|---|---|---|
| `book-cover.webp` | portada 3D de la cabecera y del resumen | foto entregada |
| `author-photo.webp` | foto del autor | foto entregada |
| `mapas.webp` | mapas de Japón y República Dominicana | imagen entregada |
| `fuji-ilustracion.svg` | el Fuji del cierre, apoyado en el pie | tu `monte-fuji.svg` |
| `sakura-rama.webp` | rama de cerezo de la cabecera | tu `sakura.svg` |
| `torii.webp` | torii de la sección de pedidos y el ícono | tu `tori.svg` |
| `paisaje.webp` | franja de palmeras, montañas y torii | recorte de la contraportada |
| `portada.webp` | portada plana en «El libro» | recorte de la portada |

Cada paisaje aparece **una sola vez**: el Fuji cierra la página apoyado sobre el
añil del pie, y la franja del Caribe cierra «Dos culturas». La montaña de la
portada del libro es la única que se repite, y es la del propio libro.

Los cuatro SVG que enviaste llevaban una textura de grano incrustada que Chrome
dibuja como una rejilla de líneas visible (se comprobó también con los archivos
originales sin modificar). Se les quitó esa textura: `monte-fuji.svg` y
`montana.svg` quedaron como vectores limpios de 42 KB y 72 KB —antes pesaban
609 KB y 640 KB—, y `sakura.svg` y `tori.svg` se convirtieron a WebP con
transparencia (88 KB y 13 KB, contra 1 MB y 2,4 MB). El dibujo es el mismo.
