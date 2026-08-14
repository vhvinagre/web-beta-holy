# PRD — hōly® (sitio one-page + vistas de producto)

## Problem statement original
Sitio de una página con rutas de producto para hōly®, marca chilena de snacks naturales a base de dátil, sin azúcar añadida. Landing con hero-carrusel coverflow (fondo cambia de color por producto, 650ms), secciones editorial (sobre nosotros, por qué dátil, productos, situaciones de consumo, categorías, FAQ, footer), rutas `/producto/:slug` con selector de sabores, y carrito drawer que termina en "coordinar pedido" (WhatsApp + formulario). Paleta y tipografías exactas entregadas por el usuario (Anton + Inter, crema #F6F1E7 / café #2b2620 / terracota #B5652E). Nivel de craft aspiracional: Awwwards (masked reveals, marquee editorial, parallax, lenis, framer-motion).

## Arquitectura
- Frontend-only: React 19 + CRA/craco + Tailwind + framer-motion + lenis + react-router-dom v7. Backend FastAPI intacto (no se usa; el carrito vive en memoria via React Context).
- Datos de producto centralizados en `src/data/products.js` (slugs, colores, precios CLP, sabores, ingredientes, nutrición placeholder).
- Slots de imagen/video en `public/img/` y `public/media/` con nombres exactos del brief; componente `SlotImage` muestra placeholder gráfico (silueta + nombre de archivo) mientras el archivo no exista, y pasa a la imagen real automáticamente al subirla.
- Estado del carrito: `src/context/CartContext.jsx` (items por producto+sabor, qty, total CLP `toLocaleString('es-CL')`).

## Personas
- Visitante/consumidor: descubre la marca, explora productos y sabores, arma pedido y lo coordina por WhatsApp o correo.
- Dueña de marca (usuaria): reemplaza slots de imagen/video, edita copy y placeholders de contacto.

## Requisitos core (estáticos)
1. Hero 100vh con coverflow de 4 productos, color de fondo dinámico, grano SVG, logo ghost, auto-avance 5s (pausa en hover, respeta reduced-motion).
2. Rutas `/producto/:slug` que muestran SOLO ese producto, con selector de variedades que cambia imagen y acentos.
3. Carrito drawer #1b1b1b con −/+, total CLP, "Coordinar pedido" → WhatsApp pre-armado + formulario (mailto).
4. Secciones en orden: hero, sobre nosotros, por qué dátil, productos, momentos, categorías, FAQ, footer.
5. Responsive mobile-first, accesible (foco visible, aria, reduced-motion).

## Implementado (2026-08-14)
- Hero coverflow completo: posiciones animadas (left/scale/blur/opacity, 650ms cubic-bezier), título con reveal enmascarado por línea, CTA gigante "VER VARIEDADES" con scroll suave (lenis), parallax de scroll + tilt 3D con mouse, spotlight radial.
- Marquee editorial lento entre hero y sobre nosotros.
- Todas las secciones de la landing con reveals escalonados; capítulos numerados 01–04 en "¿Por qué dátil?".
- 4 páginas de producto con sabores (galletas: arándano/cacao/zanahoria; barritas: berries/avellana/semillas), chips de calidad, ingredientes y nutrición placeholder.
- Galería masonry con 10 slots (7 fotos + 3 videos), etiquetas en hover y lightbox.
- Carrito drawer con qty controls, total, WhatsApp (wa.me con detalle pre-armado) y formulario de contacto (mailto) + toasts.
- Footer completo con ghost logo gigante, redes, navegación y línea legal © 2026.
- Verificado e2e: carrusel, scroll CTA, cambio de sabor, agregar ×2 (+$13.980), inc a $20.970, drawer, formulario, FAQ, mobile 390px.

## Placeholders pendientes del usuario
- Imágenes reales: `public/img/*.png|jpg` y videos `public/media/*.mp4` (nombres listados en README.txt de cada carpeta).
- Número WhatsApp real: constante `WHATSAPP_NUMBER` en `src/components/CartDrawer.jsx` y link en `Footer.jsx` (hoy +56 9 1234 5678 ficticio).
- Email real: `CONTACT_EMAIL` en `CartDrawer.jsx` y footer (hoy hola@holy.cl placeholder).
- Redes: instagram.com/holy, facebook.com/holy, tiktok.com/@holy (placeholders).
- Términos y Política de privacidad: enlaces "#".

## Backlog priorizado
- P0: Subir renders PNG reales de envases (con eso el sitio pasa de placeholder a producción visual).
- P1: Número de WhatsApp y email reales; URLs reales de redes.
- P1: Contenido final de ingredientes/nutrición por producto.
- P2: Persistir carrito en localStorage.
- P2: OG/meta tags por producto para compartir.
- P2: Páginas legales (términos/privacidad).

## Próximas tareas sugeridas
1. Recibir imágenes del usuario y validar encaje en hero/cover/producto.
2. Conectar número real de WhatsApp.
3. Ajustes de copy finales.
