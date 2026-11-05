# Web de la Agrupación Musical Jesús Caído (Astro + Pages CMS)

Versión con plantillas de la web, preparada para que la asociación edite el contenido desde un panel sin tocar código. El diseño, los textos, las fotos y el comportamiento son los mismos que la web publicada.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo
npm run build     # generar la web en dist/
npm run preview   # ver el resultado generado
```

## Estructura

- `src/layouts/BaseLayout.astro`: cabecera, metadatos, estilos y pie comunes.
- `src/components/Header.astro` y `Footer.astro`: menú y pie.
- `src/pages/`: una página por archivo (`index.astro`, `historia.astro`…).
- `src/content/`:
  - `agenda.json`: actos, fechas, lugares y escudos.
  - `repertorio.json`: las 55 marchas, autores, vídeos y etiquetas.
  - `noticias.json`: noticias de Actualidad (Markdown).
  - `galerias.json`: fotos de Uniformidad e Historia.
  - `ajustes.json`: correo y redes sociales.
- `public/`: imágenes, fuentes, `styles.css`, `script.js`, `robots.txt` y `sitemap.xml`.
- `.pages.yml`: configuración del panel Pages CMS.
- `MANUAL.md`: manual de uso para la asociación.
- `.github/workflows/deploy.yml`: publicación automática con GitHub Actions.

## Panel de edición

El panel es **Pages CMS** (https://pagescms.org). Trabaja sobre este repositorio:

- Agenda
- Repertorio
- Noticias
- Galerías
- Ajustes

Cada cambio se guarda como un commit y la web se reconstruye sola.

## Puesta en marcha

1. Crear la organización o cuenta de GitHub de la asociación.
2. Transferir el repositorio y añadir como miembros a las personas que editen.
3. Sustituir el contenido del repositorio por este proyecto (rama `main`).
4. En **Settings → Pages**, elegir **GitHub Actions** como origen.
5. Entrar en Pages CMS con la cuenta de la asociación y autorizar el repositorio.
6. Configurar el dominio personalizado cuando esté disponible.

## Dominio

Cuando se defina el dominio, actualizar:

- `site` y `base` en `astro.config.mjs`;
- canonical y Open Graph de las páginas;
- `public/sitemap.xml` y `public/robots.txt`;
- archivo `CNAME` en `public/`.

## Pendiente

- Textos narrativos y legales: se mantienen en las plantillas protegidos para evitar cambios accidentales. Se pueden convertir en campos editables en una segunda fase.
- Manual con capturas del panel una vez esté publicado.
