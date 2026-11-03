// Menú hamburguesa para celular
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Botón volver arriba
const btnArriba = document.getElementById('btnArriba');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnArriba.style.display = 'block';
  } else {
    btnArriba.style.display = 'none';
  }
});

btnArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cerrar menú al hacer click en link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
