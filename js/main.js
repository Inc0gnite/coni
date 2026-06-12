/* ============================================================
   ConyBeautiful — Lógica de la landing
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
  whatsapp:  '569XXXXXXXX',   // REEMPLAZAR: número real, solo dígitos con código país
  instagram: 'conybeautiful'  // REEMPLAZAR: usuario real de Instagram
};

/* Tarifa de DECORACIÓN por uña según complejidad.
   Rango confirmado en el documento maestro: $500–$1.000 por uña.
   El valor BASE por técnica lo confirma Cony y NO se calcula aquí. */
const DECO = { baja: 500, media: 750, alta: 1000 };
/* ================================================================ */


/* ==================== 2. Pie y enlaces ==================== */
document.getElementById('year').textContent = new Date().getFullYear();

const igEl = document.getElementById('ig');
igEl.textContent = '@' + CONFIG.instagram;
igEl.href = 'https://instagram.com/' + CONFIG.instagram;


/* ==================== 3. Estimador de uñas ==================== */
let complejidad = 'media'; // estado interno: 'baja' | 'media' | 'alta'

const nails    = document.getElementById('nails');
const nailsOut = document.getElementById('nailsOut');
const estimate = document.getElementById('estimate');
const tecnica  = document.getElementById('tecnica');
const tecOut   = document.getElementById('tecOut');

/** Formatea un número como precio en pesos chilenos (ej: 1500 → "$1.500") */
const fmt = n => '$' + n.toLocaleString('es-CL');

/** Pinta el botón de complejidad activo con fondo dorado */
function paintComplex() {
  document.querySelectorAll('.cbtn').forEach(b => {
    const on = b.dataset.c === complejidad;
    b.style.background  = on ? '#C9A24B' : 'transparent';
    b.style.color       = on ? '#1B1917' : '#F4EFE7';
    b.style.borderColor = on ? '#C9A24B' : '#2A2724';
  });
}

/** Recalcula y muestra la estimación de decoración */
function calc() {
  const n = parseInt(nails.value, 10);
  nailsOut.textContent = n;
  tecOut.textContent   = tecnica.value;
  estimate.textContent = fmt(n * DECO[complejidad]);
}

/* Listeners del estimador */
document.querySelectorAll('.cbtn').forEach(b => {
  b.addEventListener('click', () => { complejidad = b.dataset.c; paintComplex(); calc(); });
});
nails.addEventListener('input', calc);
tecnica.addEventListener('change', calc);

/* Estado inicial */
paintComplex();
calc();


/* ==================== 4. Formulario → WhatsApp ==================== */
const msgEl = document.getElementById('formMsg');

document.getElementById('enviar').addEventListener('click', () => {
  const v = id => document.getElementById(id).value.trim();

  const nombre   = v('f_nombre');
  const tel      = v('f_tel');
  const servicio = document.getElementById('f_servicio').value;
  const fecha    = v('f_fecha');
  const horario  = v('f_horario');
  const pol      = document.getElementById('f_pol').checked;

  /* Validación: campos obligatorios */
  if (!nombre || !tel || !servicio || !fecha || !horario) {
    msgEl.style.color = '#E3C77A';
    msgEl.textContent = 'Completa los campos marcados con *.';
    return;
  }

  /* Validación: aceptar políticas */
  if (!pol) {
    msgEl.style.color = '#E3C77A';
    msgEl.textContent = 'Debes aceptar las políticas para reservar.';
    return;
  }

  const correo = v('f_correo') || '—';
  const obs    = v('f_obs')    || '—';

  /* Texto del mensaje estructurado (formato definido en el Documento Maestro) */
  const texto =
`📋 NUEVA SOLICITUD CONYBEAUTIFUL

Nombre: ${nombre}
Servicio: ${servicio}
Teléfono: ${tel}
Correo: ${correo}
Fecha Deseada: ${fecha}
Horario Preferido: ${horario}
Observaciones: ${obs}
Políticas Aceptadas: Sí

Estado: Pendiente de confirmación.`;

  const url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  msgEl.style.color = '#C9A24B';
  msgEl.textContent = 'Abriendo WhatsApp…';
  window.open(url, '_blank');
});


/* ==================== 5. Destellos flotantes ==================== */
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
