# Dashboard financiero

Dashboard de ejemplo con filtros combinables, metricas y descarga CSV. Los movimientos son ficticios y estan expresados en COP.

## Requisitos

Node.js 20.9 o posterior y npm. El App Router de Next.js 16 usa React 19.2.

## Uso

1. Ejecuta `npm ci` en WSL2 o en tu entorno de desarrollo.
2. Ejecuta `npm run dev` y abre la URL local que muestra Next.
3. Ejecuta `npm run check` y `npm run build` antes de integrar cambios.

## Dependencias y red

Next.js y React ejecutan la app; TypeScript, ESLint y Prettier cubren tipos y estilo; Vitest, Testing Library y axe-core cubren logica y accesibilidad; Husky y lint-staged ejecutan controles locales. La lista de red para sandbox permite el registro npm al instalar y Google Fonts durante build; `next/font` incorpora las fuentes al sitio y evita solicitudes de fuentes del navegador.

## Seguridad

No hay secretos ni conexion a cuentas bancarias. `env.example` contiene valores ficticios. No descargues variables de produccion al equipo local. La politica `.claude/settings.json` no sustituye un sandbox del sistema operativo: para aislamiento real en Windows, ejecuta Claude Code dentro de WSL2 y completa las pruebas de contencion.
