/* ═══════════════════════════════════════════════════════════════
   Kenzo Yamamoto — "Desde el país del sol naciente al paraíso del Caribe"

   ▼▼▼  LO ÚNICO QUE HAY QUE EDITAR ESTÁ AQUÍ ABAJO  ▼▼▼
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  // Número de WhatsApp que recibe los pedidos.
  // Formato internacional, solo dígitos: 1 (RD) + los 10 dígitos.
  whatsapp: '18092231687',

  // Precio por ejemplar. Pon '' (vacío) si algún día prefieres no publicarlo.
  precio: 1200,
  moneda: 'RD$',

  libro: 'Desde el país del sol naciente al paraíso del Caribe'
};
/* ▲▲▲  FIN DE LA CONFIGURACIÓN  ▲▲▲ */


(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Precio ---------- */
  const hayPrecio = CONFIG.precio !== '' && CONFIG.precio !== null && !isNaN(Number(CONFIG.precio));
  const fmt = (n) => CONFIG.moneda + ' ' + Number(n).toLocaleString('es-DO');
  const total = (cant) => (hayPrecio ? fmt(Number(CONFIG.precio) * cant) : 'A confirmar');

  // Todos los sitios donde aparece el precio unitario
  ['navPrecio', 'heroPrecio', 'fichaPrecio', 'faqPrecio', 'resUnitario', 'cierrePrecio'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = hayPrecio ? fmt(CONFIG.precio) : 'Consulta el precio';
  });
  if (!hayPrecio) {
    const meta = $('#heroPrecio');
    if (meta && meta.nextElementSibling) meta.nextElementSibling.textContent = 'por WhatsApp';
  }

  /* ---------- Año ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Nav: sombra, barra de lectura y botón flotante ---------- */
  const nav = $('#nav');
  const fab = $('#fabWa');
  const barra = $('#progress');

  const pedido = $('#pedido');

  // Cuando la papeleta ya está a la vista, el botón flotante sobra
  function papeletaVisible() {
    if (!pedido) return false;
    const r = pedido.getBoundingClientRect();
    return r.top < window.innerHeight * 0.85 && r.bottom > 0;
  }

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-stuck', y > 12);
    if (fab) fab.classList.toggle('is-visible', y > 520 && !papeletaVisible());
    if (barra) {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.width = (alto > 0 ? Math.min(100, (y / alto) * 100) : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Menú móvil ---------- */
  const burger = $('#burger');
  const mobile = $('#mobileMenu');

  function cerrarMenu() {
    if (!burger || !mobile) return;
    burger.setAttribute('aria-expanded', 'false');
    mobile.dataset.open = 'false';
    mobile.hidden = true;
  }

  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const abierto = burger.getAttribute('aria-expanded') === 'true';
      if (abierto) return cerrarMenu();
      burger.setAttribute('aria-expanded', 'true');
      mobile.hidden = false;
      mobile.dataset.open = 'true';
    });
    $$('a', mobile).forEach((a) => a.addEventListener('click', cerrarMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });
  }

  /* ---------- Pétalos de sakura ---------- */
  const petals = $('#petals');
  if (petals && !reduce) {
    const tonos = ['#E098B0', '#E8C8D0', '#F0D6DC'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      const tam = 7 + Math.random() * 9;
      p.style.left = (Math.random() * 100) + '%';
      p.style.width = tam + 'px';
      p.style.height = (tam * 0.8) + 'px';
      p.style.background = tonos[i % tonos.length];
      p.style.animationDuration = (11 + Math.random() * 12) + 's';
      p.style.animationDelay = (-Math.random() * 20) + 's';
      p.style.opacity = 0.35 + Math.random() * 0.4;
      petals.appendChild(p);
    }
  }

  /* ---------- Papeleta de pedido ---------- */
  const form      = $('#orderForm');
  const cantidad  = $('#cantidad');
  const entrega   = $('#entrega');
  const dedicChk  = $('#dedicatoria');
  const dedicWrap = $('#dedicWrap');
  const dedicText = $('#dedicText');

  const resCantidad = $('#resCantidad');
  const resEntrega  = $('#resEntrega');
  const resFirma    = $('#resFirma');
  const resPrecio   = $('#resPrecio');

  function leerCantidad() {
    let n = parseInt(cantidad ? cantidad.value : '1', 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 99) n = 99;
    return n;
  }

  function actualizarResumen() {
    const n = leerCantidad();
    if (cantidad && String(n) !== cantidad.value) cantidad.value = n;
    if (resCantidad) resCantidad.textContent = n;
    if (resEntrega)  resEntrega.textContent  = entrega ? entrega.value : '—';
    if (resFirma)    resFirma.textContent    = dedicChk && dedicChk.checked ? 'Sí' : 'No';
    if (resPrecio)   resPrecio.textContent   = total(n);
  }

  $$('.stepper__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!cantidad) return;
      cantidad.value = Math.min(99, Math.max(1, leerCantidad() + Number(btn.dataset.step)));
      actualizarResumen();
    });
  });

  if (cantidad) cantidad.addEventListener('input', actualizarResumen);
  if (entrega)  entrega.addEventListener('change', actualizarResumen);

  if (dedicChk && dedicWrap) {
    dedicChk.addEventListener('change', () => {
      dedicWrap.hidden = !dedicChk.checked;
      if (dedicChk.checked && dedicText) dedicText.focus();
      actualizarResumen();
    });
  }

  actualizarResumen();

  /* ---------- Validación ---------- */
  function mostrarError(campo, mensaje) {
    const input = $('#' + campo);
    const slot  = $('[data-err="' + campo + '"]');
    if (input) input.classList.toggle('is-error', Boolean(mensaje));
    if (slot)  slot.textContent = mensaje || '';
    return !mensaje;
  }

  ['nombre', 'telefono'].forEach((campo) => {
    const input = $('#' + campo);
    if (input) input.addEventListener('input', () => mostrarError(campo, ''));
  });

  /* ---------- Mensaje de WhatsApp ---------- */
  function construirMensaje(d) {
    const l = [];
    l.push('Hola, quiero pedir el libro *' + CONFIG.libro + '*, de Kenzo Yamamoto.');
    l.push('');
    l.push('*Nombre:* ' + d.nombre);
    l.push('*Teléfono:* ' + d.telefono);
    l.push('*Ejemplares:* ' + d.cantidad);
    l.push('*Entrega:* ' + d.entrega);
    if (d.ciudad)      l.push('*Ciudad / provincia:* ' + d.ciudad);
    if (d.dedicatoria) l.push('*Dedicatoria firmada:* sí' + (d.dedicText ? ' — "' + d.dedicText + '"' : ''));
    if (d.notas)       l.push('*Notas:* ' + d.notas);
    if (hayPrecio)     l.push('*Total del libro:* ' + total(d.cantidad) + ' (sin envío)');
    l.push('');
    l.push('Quedo atento(a) a la información sobre el pago y la entrega. ¡Gracias!');
    return l.join('\n');
  }

  const enlaceWa = (texto) =>
    'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);

  function abrirWhatsApp(texto) {
    const url = enlaceWa(texto);
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre   = $('#nombre').value.trim();
      const telefono = $('#telefono').value.trim();

      let ok = true;
      ok = mostrarError('nombre', nombre.length >= 3 ? '' : 'Escribe tu nombre para poder identificar el pedido.') && ok;

      const digitos = telefono.replace(/\D/g, '');
      ok = mostrarError('telefono', digitos.length >= 7 ? '' : 'Escribe un teléfono válido para contactarte.') && ok;

      if (!ok) {
        const primero = $('.is-error');
        if (primero) { primero.focus({ preventScroll: true }); primero.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
        return;
      }

      abrirWhatsApp(construirMensaje({
        nombre: nombre,
        telefono: telefono,
        cantidad: leerCantidad(),
        entrega: entrega ? entrega.value : 'Coordinar por WhatsApp',
        ciudad: $('#ciudad').value.trim(),
        dedicatoria: dedicChk ? dedicChk.checked : false,
        dedicText: dedicText ? dedicText.value.trim() : '',
        notas: $('#notas').value.trim()
      }));
    });
  }

  /* ---------- Enlaces directos a WhatsApp ---------- */
  const textoDirecto = 'Hola, me interesa el libro *' + CONFIG.libro +
    '*, de Kenzo Yamamoto. ¿Me das más información?';

  ['waDirecto', 'waFaq'].forEach((id) => {
    const a = document.getElementById(id);
    if (!a) return;
    a.href = enlaceWa(textoDirecto);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- El botón flotante lleva a la papeleta ---------- */
  if (fab) {
    fab.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = $('#pedido');
      if (destino) destino.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => { const n = $('#nombre'); if (n) n.focus({ preventScroll: true }); }, reduce ? 0 : 620);
    });
  }

  /* ---------- Aparición suave ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    const objetivos = $$('.cap, .libro__portada, .libro__texto, .autor__foto, .autor__bio, .razones article, .ruta li, .cruce__mapa, .carta, .papeleta, .recibo, .faq details, .faq__cta');
    objetivos.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .75s ease, transform .75s ease';
    });
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.style.opacity = '1';
        entrada.target.style.transform = 'none';
        io.unobserve(entrada.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    objetivos.forEach((el) => io.observe(el));
  }
})();
