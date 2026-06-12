# ConyBeautiful — Landing

Landing tipo vitrina de catálogo con botón a WhatsApp. Una página, sin servidor
ni base de datos: rápida, barata de hospedar y fácil de mantener.

**Stack:** HTML + Tailwind (CDN) + JavaScript vanilla, organizado por responsabilidad.

---

## Árbol de archivos

```
conybeautiful/
├── index.html                      Estructura de la página (HTML puro)
├── css/
│   └── styles.css                  Estilos propios, animaciones y micro-interacciones
├── js/
│   ├── tailwind.config.js          Colores y tipografías de la marca (config Tailwind)
│   └── main.js                     Lógica: config, estimador de uñas, formulario, efectos
├── og-image.jpg                    Imagen para compartir en redes (ver sección 1)
├── .gitignore
├── ConyBeautyStudio_Documento_Maestro.md   Requerimientos originales del proyecto
└── README.md                       Esta guía
```

Cada archivo tiene **una sola responsabilidad**. Para tocar estilos: `css/styles.css`.
Para cambiar datos o lógica: `js/main.js`. Para cambiar el HTML: `index.html`.

---

## 1. Qué reemplazar antes de publicar

Todo lo pendiente está marcado con `REEMPLAZAR` en el código.

| Qué | Archivo | Cómo |
|-----|---------|------|
| Número de WhatsApp | `js/main.js` → `CONFIG.whatsapp` | Solo dígitos, con código país: `56912345678` |
| Usuario de Instagram | `js/main.js` → `CONFIG.instagram` | Sin `@`, ej: `conybeautiful` |
| Fotos de trabajos | `index.html` → bloques `[Foto de tu trabajo]` | Foto real comprimida con TinyPNG / Squoosh |
| Eslogan y descripciones | `index.html` → comentarios `REEMPLAZAR` | Texto real de Cony |
| Imagen para compartir | `og-image.jpg` en la raíz | Foto cuadrada ~1200×630 px |

> **Regla de oro:** nunca se publican fotos, precios ni textos inventados.
> Si falta material, se deja el placeholder y se pide antes de publicar.

---

## 2. Orden de carga (importante)

El `index.html` carga los scripts en este orden — no modificar:

1. `https://cdn.tailwindcss.com` → motor de Tailwind
2. `js/tailwind.config.js` → colores y tipografías de marca
3. `css/styles.css` → estilos propios (encima de Tailwind)
4. `js/main.js` → lógica (al final del `<body>`)

---

## 3. Cómo publicar (Vercel, hosting gratis)

1. Crea un repositorio en **GitHub** y sube toda la carpeta.
2. En **Vercel** → "Add New → Project" → importa el repo.  
   Es un sitio estático: no requiere configuración de build.
3. Deploy. Vercel entrega una URL `*.vercel.app` para revisar.

### Dominio .cl

- El **dominio se registra a nombre de la clienta** (Cony).
- **Modelo B (por defecto):** tú hospedas en tu Vercel; el dominio es de Cony.
- **Modelo A (premium):** repo, Vercel y dominio, todo a nombre de Cony.
- En Vercel → Project → Settings → Domains, conecta el dominio .cl.

---

## 4. Checklist QA antes de entregar

- [ ] Se ve bien en celular y en desktop (Chrome DevTools → responsive).
- [ ] El botón de WhatsApp abre el chat con el mensaje pre-armado.
- [ ] El estimador de uñas calcula y muestra el valor referencial.
- [ ] El formulario valida campos obligatorios y exige aceptar políticas.
- [ ] El link de Instagram en el footer apunta al perfil real.
- [ ] Sin textos `[entre corchetes]` ni `REEMPLAZAR` olvidados.
- [ ] Imágenes optimizadas; sin bloques de foto vacíos visibles.
- [ ] `og-image.jpg` presente (se ve al compartir el link en redes).

---

## 5. Nota técnica — Tailwind CDN vs compilado

Tailwind se carga por CDN y se configura en `js/tailwind.config.js`.
Para máxima velocidad en producción se puede compilar a un CSS estático
(`npx tailwindcss build`), pero no es necesario para publicar.

---

## Fuera de alcance (proyecto aparte)

Agente IA en WhatsApp, Google Calendar, agenda automática, base de datos de
clientas y recordatorios automáticos. No están en esta landing; se cotizan por
separado. Ver `ConyBeautyStudio_Documento_Maestro.md`.
