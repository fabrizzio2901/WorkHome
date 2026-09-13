# WorkHome — prototipo de servicios para el hogar

[English](README.en.md) · [Demostración](https://work-home-xi.vercel.app)

Prototipo frontend para explorar cómo un cliente solicita ayuda para el hogar y cómo un profesional consulta servicios y presupuestos. Permite recorrer las pantallas y probar interacciones con datos de demostración.

## Qué está implementado

- Selección de vista de cliente o profesional.
- Catálogo de oficios y navegación entre pantallas.
- Formulario de solicitud con descripción, fecha y horario; guarda la solicitud en memoria.
- Chat local con una respuesta automática simulada.
- Vistas de seguimiento, presupuestos, comprobantes y reseñas.
- Interfaz adaptable construida con componentes React.

La selección de rol funciona como navegación. No hay autenticación, backend ni base de datos. Las solicitudes y mensajes se pierden al recargar. Las pantallas de pagos, verificación de identidad, carga de fotos y emisión de comprobantes representan un flujo visual; no realizan esos servicios.

## Tecnologías

React 19, JavaScript, Vite 8, Tailwind CSS 4 y Lucide React. ESLint está configurado para revisar el código.

## Ejecutar localmente

Requisitos: Git, npm y Node.js 22.13 o posterior dentro de la rama 22, compatible con las versiones de Vite y ESLint declaradas.

```bash
git clone https://github.com/fabrizzio2901/WorkHome.git
cd WorkHome
npm install --package-lock=false
npm run dev
```

Abre la dirección que muestre Vite, normalmente `http://localhost:5173`. No requiere un archivo `.env`.

**Estado de instalación:** en la revisión del 11 de septiembre de 2026, `npm ci` falló porque el lockfile no coincide con las dependencias resueltas. La instalación anterior evita modificarlo, pero no garantiza reproducir exactamente las mismas versiones. La corrección del lockfile queda pendiente.

Comandos disponibles:

```bash
npm run build
npm run preview
npm run lint
```

`build` genera `dist/`; `preview` sirve esa compilación localmente.

## Recorrido de ejemplo

1. Selecciona **Propietario / Cliente** y pulsa **Continuar**.
2. Explora el catálogo o abre una solicitud desde un profesional.
3. Escribe un problema ficticio y selecciona fecha y horario.
4. Abre **Mensajes**, escribe un mensaje de prueba y observa la respuesta simulada.
5. Recarga la página para comprobar que el estado es temporal.

No introduzcas documentos de identidad ni información personal en esta demostración.

## Organización y estado

`src/App.jsx` concentra los componentes, las pantallas, el contexto de React y el cambio de vistas. `src/main.jsx` monta la aplicación; `src/index.css` y `vite.config.js` configuran el estilo y la herramienta de desarrollo.

La demo enlazada respondió y permitió entrar al catálogo durante la revisión. No representa un servicio de contratación operativo. Entre las mejoras pendientes están corregir la instalación reproducible, separar responsabilidades de `App.jsx`, completar los controles visuales y definir persistencia, autenticación y pruebas antes de implementar un servicio real.

## Comprobación técnica

La instalación alternativa y `npm run build` terminaron correctamente. `npm run lint` falló con tres errores `no-unused-vars` en `src/App.jsx`. La compilación utilizó dependencias resueltas sin modificar el lockfile; no demuestra que `npm ci` funcione.

## Mi participación

Participé en el desarrollo de la interfaz y la lógica de interacción de este prototipo, como parte de mi enfoque full stack. El alcance publicado de WorkHome es frontend; sus servicios de backend siguen pendientes.
