# Página de calificaciones — ACCE PRO

Página independiente y liviana (un solo archivo `index.html`, sin build) para que
tus clientes califiquen el servicio con un enlace directo por WhatsApp.

No necesita servidor propio: lee y escribe directamente en el mismo Firestore
que ya usa la app principal (`globalacce-37997`), en la colección
`calificaciones`, respetando las mismas reglas de seguridad ya desplegadas
(`firestore.rules`) — no hay que tocar nada del backend.

## Cómo se ve

- Fondo degradado animado, tarjeta con logo/nombre del taller.
- 5 estrellas grandes interactivas con reacción por emoji según el puntaje.
- Comentario opcional.
- Pantalla de agradecimiento con confeti si la calificación es de 4-5 estrellas.
- Si el cliente ya calificó esa reparación, muestra su calificación anterior
  en vez de dejarlo calificar dos veces.
- Maneja enlaces inválidos o sin conexión con mensajes claros.

## Publicar en GitHub Pages

Va DENTRO del mismo repositorio `Acce7` que ya tienes en GitHub (el que sirve
`https://edier27.github.io/Acce7/`) — como una subcarpeta `calificar/`. No hay
que crear repositorio nuevo ni activar Pages de nuevo, ya está activo.

1. Entra a tu repositorio `Acce7` en GitHub (github.com/edier27/Acce7).
2. Botón **"Add file" → "Upload files"**.
3. Arrastra la carpeta completa `calificar` (la que contiene este `README.md`
   y `index.html`) desde tu computador hacia esa página. GitHub conserva la
   carpeta tal cual.
4. Baja y haz clic en **"Commit changes"**.
5. Espera 1-2 minutos y ya queda publicada en:

   `https://edier27.github.io/Acce7/calificar/`

## Cómo se genera el enlace por reparación

El formato es:

```
https://edier27.github.io/Acce7/calificar/?client=ID_DEL_TALLER&r=CODIGO
```

- `client` es el `clientId` del taller (mismo que usa `catalogos_publicos/{clientId}`).
- `r` es el código corto de la reparación (los últimos 6 caracteres del ID, como
  ya se genera en la app principal).

En `index.html` (la app grande), la función `_buildRatingUrl` (~línea 6080,
junto a `_buildTrackUrl`) arma este enlace automáticamente cada vez que se
comparte el mensaje de WhatsApp al entregar un equipo.

## Notas

- Usa el mismo `firebaseConfig` público que la app principal (la clave de API
  de Firebase no es secreta; la seguridad la dan las reglas de Firestore).
- No requiere login del cliente ni del taller.
- Las calificaciones enviadas aquí aparecen automáticamente en el dashboard de
  la app principal (usa la misma colección `calificaciones`).
