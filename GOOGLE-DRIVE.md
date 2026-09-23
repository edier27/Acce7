# Fotos y documentos en Google Drive

Los **datos** del taller (reparaciones, clientes, inventario, ventas, caja...) siguen en Firebase como siempre.
Solo los **archivos** se guardan en el Google Drive de cada taller:

| Archivo | Carpeta en Drive | Quién lo ve |
|---|---|---|
| Fotos de reparaciones | `ACCE PRO / <taller> / Reparaciones / <cliente - equipo (#código)>` | Cualquiera con el enlace (para el link de seguimiento del cliente) |
| Fotos de celulares en venta | `ACCE PRO / <taller> / Celulares` | Cualquiera con el enlace |
| Facturas de compra y avisos a clientes | `ACCE PRO / <taller> / Documentos / ...` | Solo el dueño del Drive |

La app pide el permiso `drive.file`: **solo puede ver los archivos que ella misma crea**, nunca el resto del Drive.

---

## Configuración (una sola vez, la hace el administrador)

1. Entra a <https://console.cloud.google.com> y arriba selecciona el proyecto **globalacce-37997**.
2. **Activar la API:** menú → *APIs y servicios* → *Biblioteca* → busca **Google Drive API** → **Habilitar**.
3. **Pantalla de consentimiento:** menú → *Google Auth Platform* (o *Pantalla de consentimiento de OAuth*) → **Comenzar**:
   - Nombre de la app: `ACCE PRO`
   - Correo de asistencia: tu correo
   - Público: **Externo**
   - Correo de contacto: tu correo → **Crear**
4. **Permiso:** *Acceso a los datos* → **Agregar o quitar permisos** → marca `.../auth/drive.file` → **Actualizar** → **Guardar**.
5. **Publicar:** *Público* → **Publicar app** → Confirmar.
   (Si la dejas en "Prueba", solo los correos que agregues como usuarios de prueba podrán conectar su Drive.
   `drive.file` no es un permiso sensible, así que Google no pide verificación para publicarla.)
6. **Crear el ID de cliente:** *Clientes* → **Crear cliente**:
   - Tipo: **Aplicación web**
   - Nombre: `ACCE PRO Web`
   - Orígenes autorizados de JavaScript: `https://edier27.github.io`
     (opcional, para pruebas en el PC: `http://localhost:5177`)
   - **Crear** → copia el **ID de cliente** (termina en `.apps.googleusercontent.com`).
7. Pega ese ID en `index.html`, en la línea:
   ```js
   var GDRIVE_CLIENT_ID = ""; // ...
   ```
   Ese ID **no es secreto** (va visible en la página, como el projectId de Firebase).
8. Sube `index.html`, `sw.js` y `version.json` a GitHub.

## Uso en cada taller

*Configuración* → tarjeta **Google Drive — fotos y documentos** → **Conectar Google Drive**.
Las fotos que ya estaban guardadas dentro de la base de datos se pasan solas a Drive.

- Por seguridad Google da permisos de **1 hora**. Si vence y hay fotos por subir, aparece una barra arriba con el botón **Subir ahora** (un clic, sin volver a escribir contraseña).
- Sin conexión o sin Drive conectado, la foto se guarda como antes y se sube después.
- Al borrar una foto o documento en la app, en Drive se va a la **papelera** (se puede recuperar 30 días).
- Si no se conecta Drive, los documentos siguen usando Firebase Storage como antes.
