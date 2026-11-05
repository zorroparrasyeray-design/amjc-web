# Manual del panel de la web

Esta guía explica cómo actualizar la web de la Agrupación Musical Jesús Caído sin tocar código.

El panel se llama **Pages CMS** y funciona desde el navegador. Cada cambio que guardes se apunta en GitHub y la web se vuelve a publicar sola en uno o dos minutos.

---

## 1. Entrar

1. Abre **https://pagescms.org** en el navegador.
2. Pulsa **Sign in with GitHub** e inicia sesión con la cuenta de la asociación.
3. Autoriza el acceso si es la primera vez.
4. Elige el repositorio de la web (`amjc-web`).

Verás un menú con estas secciones:

- **Agenda**
- **Repertorio**
- **Noticias**
- **Galerías**
- **Ajustes**

---

## 2. Cómo funciona

- Cada sección muestra una lista de elementos.
- Pulsa un elemento para editarlo.
- Los cambios no se publican hasta que pulsas **Save** (Guardar).
- Al guardar, el panel hace un cambio en GitHub y la web se reconstruye.
- En uno o dos minutos, recarga la web con **Ctrl + F5** y verás el cambio.

Si algo no aparece, espera un minuto y vuelve a recargar. No pulses varias veces seguidas.

---

## 3. Agenda

Sirve para los actos de la portada y para el calendario.

Cada acto tiene:

- **Fecha**: el día del acto. El calendario se genera solo a partir de las fechas.
- **Tipo de acto**: por ejemplo, «Domingo de Ramos», «Martes Santo» o «Acompañamiento».
- **Título**: la hermandad o el acto.
- **Lugar**: el municipio.
- **Escudos**: una o varias imágenes.
- **Mostrar cuenta atrás**: actívalo solo en el acto más próximo.

### Añadir un acto

1. Entra en **Agenda**.
2. Pulsa **Add** o el botón **+**.
3. Rellena los campos.
4. Añade el escudo con **Choose image**.
5. Pulsa **Save**.

### Quitar un acto

1. Abre el acto.
2. Pulsa el botón de borrar (**Delete** o la papelera).
3. Confirma y guarda.

> El calendario de la portada se genera automáticamente con los actos que haya. Si añades un acto en un mes nuevo, ese mes aparecerá solo.

---

## 4. Repertorio

Cada fila es una marcha.

Campos:

- **Número**: el orden en la lista.
- **Título** y **Autor**.
- **ID del vídeo de YouTube**: solo el código, por ejemplo `5ZfN1Dry130`.
- **Enlace de YouTube**: si lo dejas vacío, se genera solo con el ID.
- **Estreno**, **Marcha propia** y **Recuperada**: activan las etiquetas y las secciones especiales.
- **Nota**: texto corto, por ejemplo el regalo de una cofradía.
- **Descripción**: se usa en las tarjetas de estrenos y recuperadas.

### Añadir una marcha

1. Pulsa **Add**.
2. Rellena número, título, autor y, si hay vídeo, el ID.
3. Marca las casillas que correspondan.
4. Guarda.

### Quitar una marcha

Abre la marcha, pulsa borrar y guarda.

> Si cambias el orden, revisa los números para que no queden saltos.

---

## 5. Noticias

Cada noticia tiene:

- **Etiqueta**: Uniformidad, Semana Santa, Web, Junta directiva…
- **Fecha (para el navegador)**: formato `2026-10`.
- **Fecha visible**: por ejemplo «Octubre 2026».
- **Titular**.
- **Entradilla**: el texto que se ve en la tarjeta.
- **Cuerpo de la noticia**: el texto completo, con negritas y enlaces.
- **Identificador**: un nombre corto sin espacios, por ejemplo `noticia-uniformidad`. No lo repitas.
- **Enlace (opcional)**: destino y texto del botón final.

### Añadir una noticia

1. Pulsa **Add**.
2. Rellena los campos.
3. Escribe la entradilla y el cuerpo con el editor.
4. Guarda.

### Quitar una noticia

Abre la noticia, pulsa borrar y guarda.

---

## 6. Galerías

Hay tres galerías:

- **Uniformidad**.
- **Historia (galería principal)**.
- **Historia (salida extraordinaria)**.

Cada foto tiene:

- **Imagen**: el archivo.
- **Texto alternativo**: descripción para personas que no ven la imagen. Importante para accesibilidad.
- **Pie de foto**: solo en las galerías de Historia.
- **Ancho** y **Alto**: las dimensiones reales de la imagen. Si no las sabes, déjalas como están o pon 0; la web se adapta.
- **Clase CSS**: déjalo como está salvo que se te indique lo contrario.

### Cambiar una foto

1. Abre la foto.
2. Pulsa **Choose image** y sube la nueva.
3. Actualiza el texto alternativo si hace falta.
4. Guarda.

### Añadir o quitar fotos

Usa **Add** para añadir y el botón de borrar para quitar. El orden de la lista es el orden en la web.

> Recomendación: sube fotos de al menos 1200 px de ancho, en JPG, y con un peso inferior a 500 KB.

---

## 7. Ajustes

- **Correo electrónico**: se usa en el pie y en el formulario de contacto.
- **Redes sociales**: los enlaces de Facebook, Instagram, TikTok y YouTube.

Cambia el valor y guarda.

---

## 8. Publicar y comprobar

1. Pulsa **Save**.
2. Espera uno o dos minutos.
3. Abre la web y recarga con **Ctrl + F5**.
4. Comprueba la página que has cambiado.

Si no ves el cambio:

- espera otro minuto;
- comprueba que pone «Guardado»;
- recarga sin caché.

---

## 9. Deshacer un cambio

Todo queda guardado en GitHub. Si algo sale mal:

1. Avisa al administrador.
2. Se puede volver a la versión anterior desde el historial del repositorio.

No borres archivos ni carpetas para «arreglarlo».

---

## 10. Qué no tocar

- **No cambies el código** ni los archivos que no aparecen en el panel.
- **No edites los textos legales** (Aviso legal, Privacidad, Cookies) sin revisión: son documentos jurídicos.
- Los textos fijos de Historia, Uniformidad, Conciertos y Semana Santa se cambian desde el código. Si necesitas modificar un párrafo de esas páginas, avisa al administrador.
- **No borres las imágenes antiguas** hasta confirmar que no se usan.
- **No cambies el identificador** de una noticia si ya está publicada.

---

## 11. Problemas frecuentes

**No me deja entrar.**
Comprueba que has iniciado sesión con la cuenta correcta y que tienes permiso en el repositorio.

**Guardo y no cambia la web.**
Espera dos minutos y recarga con Ctrl + F5. Si sigue igual, avisa al administrador.

**La imagen se ve borrosa.**
Sube una versión de más resolución.

**He borrado algo sin querer.**
No sigas tocando. Avisa al administrador para recuperarlo del historial.

---

## 12. Buenas prácticas

- Escribe los textos en un documento aparte antes de pegarlos.
- Revisa tildes y nombres propios.
- Usa fotos horizontales para las galerías.
- Rellena siempre el texto alternativo.
- Guarda cambios pequeños y compruébalos antes de seguir.

---

*Manual de uso del panel · Agrupación Musical Jesús Caído*
