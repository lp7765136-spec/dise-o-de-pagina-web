/* Activa las animaciones de entrada solo cuando hay JavaScript */
document.documentElement.classList.add('js');

/* Fotos reales de Unsplash (licencia gratuita, uso comercial permitido).
   u('ID') arma el enlace a la foto; para usar una foto propia, escribe la ruta: 'img/archivo.jpg' */
const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`; // fotos de Pexels (gratis)
const u = (id) => `https://unsplash.com/photos/${id}/download?force=true&w=800`;

/* MENÚ: edita aquí nombres, descripciones, precios y fotos.
   Cada producto: [nombre, descripción, ruta de la foto, precio]
   Las fotos van en la carpeta "img" junto a index.html (formato .jpg, 800x600 px recomendado). */
const MENU = [
  { id: 'pizzas', titulo: '🍕 Pizzas', color: '#d63a2f', items: [
    ['Margherita', 'Salsa de tomate San Marzano, mozzarella fior di latte y albahaca fresca.', u('iKm08jvdtxY'), '32.000'],
    ['Diavola', 'Salami picante, mozzarella, ají calabrés y un toque de miel.', u('dlctifSsn_8'), '38.000'],
    ['Quattro Formaggi', 'Mozzarella, gorgonzola, parmesano y provolone ahumado.', u('KBpYJqaVgxc'), '42.000'],
    ['Prosciutto e Funghi', 'Jamón de Parma, champiñones salteados y rúcula.', u('Y4U1icCQuFc'), '44.000'],
    ['Bella Napoli', 'Nuestra especial: albóndigas caseras, pimentón asado y ricotta.', u('Si3KnC_ILaw'), '46.000']
  ]},
  { id: 'entradas', titulo: '🥖 Entradas', color: '#e0a21c', items: [
    ['Bruschetta', 'Pan rústico tostado con tomate, ajo, albahaca y aceite de oliva.', u('nAFtLPRRsIo'), '18.000'],
    ['Caprese', 'Tomate, mozzarella de búfala y pesto de albahaca.', u('ts2cEYJbVjA'), '24.000']
  ]},
  { id: 'bebidas', titulo: '🍷 Bebidas', color: '#b3262a', items: [
    ['Vino de la casa', 'Copa de tinto o blanco seleccionado por la casa.', u('bCsr013WCnQ'), '18.000'],
    ['Espresso', 'Café de tueste medio, intenso y cremoso.', u('wYX4811J9WI'), '7.000'],
    ['Aperol Spritz', 'Aperol, prosecco, soda y una rodaja de naranja.', u('ymNAJ0ryag4'), '26.000']
  ]},
  { id: 'postres', titulo: '🍰 Postres', color: '#8c5a3c', items: [
    ['Tiramisú', 'Bizcochos al café, mascarpone y cacao amargo.', u('mxJ3IkWNyks'), '20.000'],
    ['Panna cotta', 'Crema de vainilla con coulis de frutos rojos.', px('11910555'), '18.000'],
    ['Cannoli sicilianos', 'Cañones crujientes rellenos de ricotta y chips de chocolate.', u('X0DC3E-jrn0'), '19.000'],
    ['Gelato artesanal', 'Tres bolas a elección: pistacho, avellana o fior di latte.', u('dcd4jdc8IYA'), '16.000']
  ]}
];

/* Generar las tarjetas del menú */
document.getElementById('menu-contenido').innerHTML = MENU.map(c => `
  <section class="categoria" id="${c.id}" aria-labelledby="t-${c.id}">
    <h3 id="t-${c.id}" class="reveal">${c.titulo}</h3>
    <div class="rejilla">
      ${c.items.map(([nombre, desc, foto, precio]) => `
        <article class="tarjeta reveal">
          <div class="marco">
            <img src="${foto}" data-fallback="${c.color}" alt="${nombre}" width="400" height="300" loading="lazy">
            <span class="precio">$${precio}</span>
          </div>
          <div class="cuerpo">
            <h4>${nombre}</h4>
            <p>${desc}</p>
          </div>
        </article>`).join('')}
    </div>
  </section>`).join('');

/* Si una foto todavía no existe en la carpeta img, se muestra un recuadro de color con el nombre
   (así la página no se ve rota mientras se suben las fotos) */
const sinFoto = (img) => {
  if (img.dataset.listo) return;
  img.dataset.listo = '1';
  const texto = (img.alt || '').replace(/[<>&"']/g, '');
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${img.dataset.fallback}"/><text x="200" y="158" font-family="Georgia,serif" font-size="26" fill="#fbf3e0" text-anchor="middle">${texto}</text></svg>`);
};
document.querySelectorAll('img[data-fallback]').forEach(img => {
  img.addEventListener('error', () => sinFoto(img));
  if (img.complete && img.naturalWidth === 0) sinFoto(img);
});

/* Menú hamburguesa */
const btnMenu = document.getElementById('btn-menu');
const lista = document.getElementById('nav-lista');
const cerrarMenu = () => {
  lista.classList.remove('abierto');
  btnMenu.setAttribute('aria-expanded', 'false');
};
btnMenu.addEventListener('click', () => {
  const abierto = lista.classList.toggle('abierto');
  btnMenu.setAttribute('aria-expanded', abierto);
});
lista.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrarMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarMenu(); });

/* Botón "volver arriba" */
const btnArriba = document.getElementById('btn-arriba');
window.addEventListener('scroll', () => {
  btnArriba.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
btnArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Animación de entrada al hacer scroll */
const elementos = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  elementos.forEach(el => obs.observe(el));
} else {
  elementos.forEach(el => el.classList.add('visible'));
}

/* Año del pie de página */
document.getElementById('anio').textContent = new Date().getFullYear();
