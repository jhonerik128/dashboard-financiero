# Calidad del proyecto

Panel financiero demostrativo para Jhon Rivera. Comprobaciones locales: 2026-11-16.

## Comprobaciones disponibles

| Comprobacion             | Resultado                                              | Reproduccion           |
| ------------------------ | ------------------------------------------------------ | ---------------------- |
| TypeScript estricto      | Pasa                                                   | `npm run typecheck`    |
| ESLint, sin advertencias | Pasa                                                   | `npm run lint`         |
| Formato Prettier         | Pasa                                                   | `npm run format:check` |
| Pruebas automatizadas    | 8 pasan                                                | `npm run test`         |
| Cobertura de `lib/`      | 100% sentencias, 95.83% ramas, 100% funciones y lineas | Informe Vitest         |
| Build de produccion      | Pasa con Next.js 16.4.6                                | `npm run build`        |
| Axe en componentes       | Sin violaciones detectadas en filtros y tabla          | `npm run test`         |

Axe en jsdom no verifica contraste; esa revision y la pasada manual quedan pendientes.

## Lista manual pendiente

- [ ] Recorrido completo con teclado, orden logico, foco visible y enlace para saltar al contenido.
- [ ] Zoom al 200% y reflow a 320 px, vertical y horizontal.
- [ ] Lector de pantalla NVDA o VoiceOver.
- [ ] Contraste de texto, controles y graficos en tema claro y oscuro.
- [ ] Prefers-reduced-motion y prefers-color-scheme.
- [ ] Validacion HTML W3C y consola limpia en produccion.
- [ ] Capturas a 360, 768 y 1024 px.

## Mediciones de produccion pendientes

No existe URL de produccion para este prototipo. No se inventaron mediciones Lighthouse ni Core Web Vitals. Al publicarlo, guarda aqui informes Lighthouse movil/escritorio y p75 reales de LCP, INP y CLS, junto con las capturas. Esta demo tiene datos estaticos y no tiene formulario ni sesion iniciada; si la rubrica exige tres paginas, agrega esos flujos antes de medirlos.

| Metrica |     Antes |   Despues | Evidencia / fecha           |
| ------- | --------: | --------: | --------------------------- |
| LCP p75 | Pendiente | Pendiente | URL de produccion requerida |
| INP p75 | Pendiente | Pendiente | URL de produccion requerida |
| CLS p75 | Pendiente | Pendiente | URL de produccion requerida |

## Retos elegidos

- Presupuesto moderado: UI sin librerias de graficos, filtros locales y CSV generado en el navegador. Evidencia: `package.json` y `lib/`. El peso real debe medirse al publicar.
- Accesibilidad automatizada: prueba axe con Testing Library. Evidencia: `tests/dashboard-accessibility.test.tsx`.
- Este demo requiere JavaScript para combinar filtros y descargar CSV.

Los resultados locales no sustituyen la medicion en produccion ni la sustentacion en vivo.
