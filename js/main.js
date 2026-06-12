/* ============================================================
   ConiBeautyStudio — Lógica de la landing
   Archivo: js/main.js

   Secciones:
     1. CONFIG        Datos a reemplazar antes de publicar
     2. Pie y enlaces Año dinámico y link de Instagram
     3. Estimador     Cálculo referencial de decoración de uñas
     4. Formulario    Valida campos y abre WhatsApp con el mensaje armado
     5. Destellos     Partículas doradas flotantes del fondo
     6. Reveal        Aparición de elementos al hacer scroll

   Dependencias: no usa librerías externas. Solo DOM nativo.
   ============================================================ */


/* ==================== 1. CONFIG (REEMPLAZAR) ==================== */
const CONFIG = {
  whatsapp:  '56950306560',
  instagram: 'coni_beautystudio'
};

/* ================================================================ */


/* ==================== 2. Pie y enlaces ==================== */
document.getElementById('year').textContent = new Date().getFullYear();

const igEl = document.getElementById('ig');
igEl.textContent = '@' + CONFIG.instagram;
igEl.href = 'https://www.instagram.com/coni_beautystudio/' + CONFIG.instagram;




/* ==================== 4. Formulario → WhatsApp ==================== */
const msgEl = document.getElementById('formMsg');

/* Fecha: mínimo hoy, máximo 2 meses desde hoy */
(function () {
  const hoy = new Date();
  const max = new Date(hoy);
  max.setMonth(max.getMonth() + 2);
  const f = document.getElementById('f_fecha');
  f.min = hoy.toISOString().split('T')[0];
  f.max = max.toISOString().split('T')[0];
})();


/* Permite desmarcar un radio al hacer clic sobre él si ya estaba seleccionado */
document.querySelectorAll('.f_svc').forEach(radio => {
  radio.addEventListener('mousedown', function () {
    this._wasChecked = this.checked;
  });
  radio.addEventListener('click', function () {
    if (this._wasChecked) {
      this.checked = false;
      this._wasChecked = false;
    }
  });
});


/* Bloquea letras en el campo teléfono, permite solo dígitos, +, espacios y guiones */
document.getElementById('f_tel').addEventListener('input', function () {
  this.value = this.value.replace(/[^\d+\s\-]/g, '');
});

document.getElementById('enviar').addEventListener('click', () => {
  const v = id => document.getElementById(id).value.trim();

  const nombre  = v('f_nombre');
  const tel     = v('f_tel');
  const fecha   = v('f_fecha');
  const horario = v('f_horario');
  const pol     = document.getElementById('f_pol').checked;

  /* Recoger todos los servicios marcados */
  const checkedSvcs = [...document.querySelectorAll('.f_svc:checked')].map(cb => cb.value);

  /* Validación: campos obligatorios */
  if (!nombre || !tel || checkedSvcs.length === 0 || !fecha || !horario) {
    msgEl.style.color = '#E3C77A';
    msgEl.textContent = 'Completa los campos marcados con * y elige al menos un servicio.';
    return;
  }

  /* Validación: teléfono solo dígitos (con opcional + y espacios/guiones) */
  if (!/^\+?[\d\s\-]{7,15}$/.test(tel)) {
    msgEl.style.color = '#E3C77A';
    msgEl.textContent = 'El teléfono debe contener solo números (ej: +56 9 1234 5678).';
    return;
  }

  /* Validación: aceptar políticas */
  if (!pol) {
    msgEl.style.color = '#E3C77A';
    msgEl.textContent = 'Debes aceptar las políticas para reservar.';
    return;
  }

  const correo   = v('f_correo') || '—';
  const obs      = v('f_obs')    || '—';
  const servicios = checkedSvcs.join('\n          · ');

  /* Texto del mensaje estructurado */
  const lineas = [
    '*ConiBeautyStudio — Nueva reserva*',
    '',
    `*Nombre:* ${nombre}`,
    `*Telefono:* ${tel}`,
  ];
  if (correo !== '—') lineas.push(`*Correo:* ${correo}`);
  lineas.push('', `*Servicio(s):*\n   · ${servicios}`);
  lineas.push('', `*Fecha deseada:* ${fecha}`, `*Horario preferido:* ${horario}`);
  if (obs !== '—') lineas.push('', `*Observaciones:* ${obs}`);

  const texto = lineas.join('\n');

  const url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  msgEl.style.color = '#C9A24B';
  msgEl.textContent = 'Abriendo WhatsApp…';
  window.open(url, '_blank');
});


/* ==================== 5. Lightbox ==================== */
(function () {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev  = document.getElementById('lb-prev');
  const lbNext  = document.getElementById('lb-next');

  let group   = [];  // fuentes del grupo activo
  let current = 0;

  function open(sources, idx) {
    group   = sources;
    current = ((idx % group.length) + group.length) % group.length;
    lbImg.classList.remove('fade');
    lbImg.src = group[current];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    const solo = group.length === 1;
    lbPrev.style.display = solo ? 'none' : '';
    lbNext.style.display = solo ? 'none' : '';
  }

  function navigate(dir) {
    lbImg.classList.add('fade');
    setTimeout(() => {
      current = ((current + dir + group.length) % group.length);
      lbImg.src = group[current];
      lbImg.classList.remove('fade');
    }, 220);
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* --- Tira de uñas (solo el set original, sin duplicados) --- */
  const unaSources = [
    'Images/Unas_1.jpg', 'Images/Unas_2.jpg', 'Images/Unas3.jpg',
    'Images/Unas_4.jpg', 'Images/Unas_5.jpg', 'Images/Unas_6.jpg',
    'Images/Unas_7.jpg',
  ];
  document.querySelectorAll('.strip-img').forEach(img => {
    img.addEventListener('click', () => {
      const idx = unaSources.findIndex(s => img.src.includes(s.replace('Images/', '')));
      open(unaSources, idx >= 0 ? idx : 0);
    });
  });

  /* --- Cards de pestañas (data-zoom, cada una abre solo su foto) --- */
  document.querySelectorAll('[data-zoom]').forEach(img => {
    img.addEventListener('click', () => open([img.src], 0));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* Swipe táctil en el lightbox */
  let touchStartX = 0;
  let touchStartY = 0;
  lb.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      navigate(dx > 0 ? 1 : -1);
    }
  }, { passive: true });
})();


/* ==================== 5b. Swipe táctil en la tira de uñas ==================== */
(function () {
  const track = document.getElementById('carousel-track') || document.querySelector('.strip-track');
  if (!track) return;

  let startX = 0;
  let isDragging = false;
  let pausedByTouch = false;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.animationPlayState = 'paused';
    pausedByTouch = true;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    /* Reanudar la animación tras un breve instante */
    setTimeout(() => {
      if (pausedByTouch) {
        track.style.animationPlayState = '';
        pausedByTouch = false;
      }
    }, 800);
  }, { passive: true });
})();


/* ==================== 6. Destellos flotantes ==================== */
/* Genera 22 partículas doradas que flotan en el fondo.
   Se omite si el usuario prefiere menos movimiento (accesibilidad). */
const fx = document.querySelector('.bg-fx');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fx && !reduceMotion) {
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    const size = (2 + Math.random() * 3).toFixed(1);
    s.style.width             = s.style.height = size + 'px';
    s.style.left              = (Math.random() * 100).toFixed(2) + 'vw';
    s.style.top               = (8 + Math.random() * 86).toFixed(2) + 'vh';
    const dur                 = 6 + Math.random() * 8;
    s.style.animationDuration = dur.toFixed(2) + 's';
    s.style.animationDelay    = (-Math.random() * dur).toFixed(2) + 's';
    fx.appendChild(s);
  }
}


/* ==================== 6. Reveal: aparición al hacer scroll ==================== */
/* Observa todos los elementos .reveal y añade la clase .in cuando entran
   al viewport, disparando la transición definida en css/styles.css. */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
