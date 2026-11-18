# Configuración y límites

La configuración deniega lectura directa de archivos de entorno y llaves, modifica la carpeta `.claude`, restringe operaciones de red y comandos de efecto, e intenta exigir sandbox para lectura/escritura local. `AGENTS.md` orienta sobre estructura, calidad y manejo de instrucciones maliciosas.

**Límite importante:** reglas de permisos no son una frontera del sistema operativo y patrones de comandos no interceptan todos los ejecutables o scripts equivalentes. No se ha demostrado esta configuración en una sesión Claude/WSL; Windows nativo no ofrece el sandbox descrito por la guía. Activa y verifica sandbox en WSL2 antes de confiarle archivos locales. No guardes secretos reales en el equipo.
