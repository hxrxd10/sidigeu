# Sistema Interno de Gestión de la Extensión Universitaria (SIGEU)

**Institución:** Universidad de San Carlos de Guatemala (USAC)
**Unidad:** Dirección General de Extensión Universitaria (DIGEU)
**Tipo de sistema:** Aplicación web interna, con un catálogo público de espacios
**Stack de implementación:** Laravel 13 + Inertia v3 + React 19 (ver sección 12)
**Versión del documento:** 1.1 — se sustituye el stack propuesto en NestJS por el proyecto base real en Laravel

---

## 1. Contexto y justificación

La DIGEU coordina, planifica, da seguimiento y evalúa las acciones de extensión universitaria que realizan sus unidades administrativas. Por la diversidad y cantidad de programas, proyectos y actividades, se requiere una herramienta institucional que organice y gestione la información generada internamente.

El sistema será de uso exclusivo de la DIGEU y servirá para:

- Reducir la dispersión de la información.
- Facilitar el seguimiento de las acciones institucionales.
- Generar información consolidada para informes, estadísticas y análisis que apoyen la toma de decisiones.

## 2. Objetivos

### 2.1 Objetivo general

Implementar un sistema integral de gestión interna para la DIGEU que centralice, organice, administre y dé seguimiento a la información, procesos, actividades y proyectos bajo su ámbito, fortaleciendo la coordinación, planificación, evaluación y toma de decisiones.

### 2.2 Objetivos específicos

1. Centralizar la información de proyectos y actividades de extensión de las diferentes unidades administrativas.
2. Estandarizar los procesos y criterios internos de registro y seguimiento de proyectos.
3. Facilitar el seguimiento de proyectos mediante el registro de responsables, objetivos, cronogramas, avances, resultados e indicadores.
4. Generar estadísticas e indicadores institucionales sobre el desarrollo y alcance de la función de extensión.
5. Automatizar la generación de informes y reportes para el seguimiento y evaluación.

## 3. Alcance: módulos del sistema

| #   | Módulo                                  | Descripción breve                                                                            |
| --- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | Actividades, Resultados e Informes      | Programación mensual, validación, agenda cultural, ejecución, cierre, indicadores y reportes |
| 2   | Gestión de Proyectos                    | Registro, formulación, aprobación, ejecución, cierre e informe de proyectos                  |
| 3   | Gestión de Espacios                     | Catálogo de espacios, calendario de ocupación, solicitudes/reservas e historial de uso       |
| 4   | Recurso Humano (Artistas y Deportistas) | Registro de artistas y deportistas, estado activo/baja y cálculo de tiempo de permanencia    |
| T   | Transversal                             | Usuarios, roles, catálogos, auditoría, archivos y dashboard                                  |

### 3.1 Integraciones entre módulos

- Una **actividad** (Módulo 1) puede asociarse a un **proyecto** (Módulo 2); sus resultados e indicadores alimentan automáticamente al proyecto.
- Al registrar una **actividad**, se selecciona el **espacio** (Módulo 3) donde se realizará y se refleja en el calendario de ocupación.
- Una **actividad** o **proyecto** puede vincular **artistas/deportistas** (Módulo 4) como participantes.

---

## 4. Módulo 1 — Actividades, Resultados e Informes

Gestiona de manera integral la planificación, seguimiento y reporte de las acciones de las unidades de la DIGEU. A partir del registro mensual de actividades, la información alimenta la **Agenda Cultural** y otros mecanismos de programación institucional, y después permite documentar ejecución, resultados, indicadores y evidencias.

También permite registrar **logros no programados** (no incluidos en la programación mensual) para que formen parte del registro institucional.

### 4.1 Flujo

```
1. Registro de actividad
   ├─ Datos de programación
   └─ Clasificación
2. Revisión / Validación
3. Agenda Cultural
4. Ejecución de actividad
5. Cierre de actividad
   ├─ Participantes
   ├─ Beneficiarios
   ├─ Resultados
   └─ Evidencias (fotografías, documentos, enlaces)
6. Indicadores
7. Reporte mensual
   ├─ Actividades realizadas
   ├─ Logros del mes
   └─ Indicadores alcanzados
8. Reportes acumulados (trimestral, semestral, anual)
```

### 4.2 Estados de una actividad

`BORRADOR → ENVIADA → (OBSERVADA ↔ ENVIADA) → VALIDADA ↔ PUBLICADA_AGENDA → EN_EJECUCION → CERRADA`
Estados alternos: `RECHAZADA`, `CANCELADA`, `REPROGRAMADA`.

`VALIDADA` y `PUBLICADA_AGENDA` son la misma etapa vista desde la Agenda Cultural: se pasa de una a otra al publicar la actividad o al quitarla de la agenda, sin cancelarla ni devolverla a revisión.

### 4.3 Datos de la actividad

**Datos de programación**

- Nombre (requerido)
- Unidad responsable (catálogo, requerido)
- Fecha (requerido)
- Hora inicio / hora fin
- Lugar: espacio del catálogo (Módulo 3) o lugar externo en texto libre
- Responsable (usuario/persona)

**Clasificación**

- Tipo de actividad (catálogo)
- Línea de acción (catálogo)
- Programa / proyecto (opcional; vínculo con Módulo 2)
- Indicadores asociados (multiselección de catálogo)
- Público objetivo (catálogo, multiselección)
- Bandera: ¿Publicar en Agenda Cultural? (sí/no)
- Bandera: ¿Es logro no programado? (sí/no)

**Datos de cierre**

- Participantes: cantidad y/o lista (incluye artistas/deportistas del Módulo 4)
- Beneficiarios: cantidad desagregada (por sexo, rango de edad, tipo de público; configurable)
- Resultados: descripción
- Valores alcanzados por indicador
- Evidencias: fotografías, documentos y enlaces (múltiples)
- Observaciones

### 4.4 Requerimientos funcionales

| ID      | Requerimiento                                                                                                                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF-1.01 | Registrar actividades en una programación mensual por unidad.                                                                                                                                              |
| RF-1.02 | Enviar actividades a revisión; el validador puede aprobar, observar (con comentario) o rechazar.                                                                                                           |
| RF-1.03 | Las actividades validadas con bandera de agenda se publican en la Agenda Cultural; después de validadas se pueden publicar o retirar de la agenda.                                                         |
| RF-1.04 | Vista de Agenda Cultural en calendario y lista, filtrable por fecha, unidad, tipo y espacio; cada actividad se descarga en formato iCalendar.                                                              |
| RF-1.05 | Marcar actividad en ejecución, reprogramar (con historial de fechas) o cancelar (con motivo).                                                                                                              |
| RF-1.06 | Cerrar la actividad registrando participantes, beneficiarios, resultados, indicadores y evidencias. No se permite cerrar sin al menos un resultado.                                                        |
| RF-1.07 | Registrar logros no programados directamente (sin pasar por programación), con resultados y evidencias.                                                                                                    |
| RF-1.08 | Al seleccionar un espacio, validar choque de horario contra el calendario de ocupación.                                                                                                                    |
| RF-1.09 | Generar automáticamente el reporte mensual por unidad y consolidado: actividades realizadas, logros del mes e indicadores alcanzados.                                                                      |
| RF-1.10 | Generar reportes acumulados trimestrales, semestrales y anuales.                                                                                                                                           |
| RF-1.11 | Exportar reportes a PDF y Excel.                                                                                                                                                                           |
| RF-1.12 | Si la actividad está vinculada a un proyecto, sus resultados e indicadores se suman al proyecto.                                                                                                           |
| RF-1.13 | Carga masiva de la programación desde una hoja de cálculo: plantilla de Excel con listas desplegables de los catálogos, revisión fila por fila antes de guardar y creación de las actividades en borrador. |
| RF-1.14 | Cada actividad publicada en la Agenda Cultural tiene su propia dirección pública, con metadatos para compartirla en redes y datos estructurados `schema.org/Event` para los buscadores.                    |

---

## 5. Módulo 2 — Gestión de Proyectos

Permite registrar, formular, planificar, ejecutar y cerrar los proyectos de las unidades de la DIGEU, centralizando la información y manteniendo un histórico consultable de proyectos en ejecución y finalizados.

### 5.1 Flujo

```
1. Registro del proyecto
   ├─ Datos generales
   └─ Clasificación
2. Formulación
   ├─ Objetivos
   ├─ Beneficiarios
   ├─ Actividades
   ├─ Cronograma
   ├─ Presupuesto
   └─ Indicadores / Metas
3. Aprobación
4. Ejecución del proyecto
   ├─ Actividades
   ├─ Avances
   ├─ Recursos
   └─ Evidencias / Productos
5. Cierre
   ├─ Resultados
   ├─ Productos
   └─ Evidencias
6. Informe
```

### 5.2 Estados

`REGISTRADO → EN_FORMULACION → EN_REVISION → (OBSERVADO ↔ EN_REVISION) → APROBADO → EN_EJECUCION → CERRADO`
Estados alternos: `RECHAZADO`, `SUSPENDIDO`, `CANCELADO`.

### 5.3 Datos

**Datos generales:** nombre, responsable, unidad, justificación, objetivo general.
**Clasificación:** área de DIGEU, programa, línea de acción, tipo de proyecto (catálogos).

**Formulación**

- Objetivos específicos (lista)
- Beneficiarios: tipo, cantidad estimada, descripción
- Actividades planificadas (pueden convertirse en actividades del Módulo 1)
- Cronograma: tareas/hitos con fecha inicio, fecha fin, responsable
- Presupuesto: renglones con descripción, cantidad, costo unitario, subtotal y fuente de financiamiento; total calculado
- Indicadores y metas: indicador, línea base, meta, unidad de medida

**Ejecución**

- Avances: fecha, porcentaje de avance, descripción, evidencias
- Recursos: humanos (incluye artistas/deportistas del Módulo 4), materiales y financieros ejecutados
- Evidencias y productos

**Cierre:** resultados finales, productos entregados, evidencias, valores finales de indicadores vs. meta, lecciones aprendidas.

### 5.4 Requerimientos funcionales

| ID      | Requerimiento                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| RF-2.01 | Registrar proyectos con datos generales y clasificación.                                                     |
| RF-2.02 | Formular el proyecto con objetivos, beneficiarios, actividades, cronograma, presupuesto e indicadores/metas. |
| RF-2.03 | Enviar a aprobación; el aprobador puede aprobar, observar o rechazar con comentarios.                        |
| RF-2.04 | Solo los proyectos aprobados pasan a ejecución.                                                              |
| RF-2.05 | Registrar avances periódicos con porcentaje y evidencias.                                                    |
| RF-2.06 | Vincular actividades del Módulo 1 al proyecto; sus resultados e indicadores se agregan automáticamente.      |
| RF-2.07 | Mostrar el avance físico (cronograma) y financiero (presupuesto ejecutado vs. planificado).                  |
| RF-2.08 | Cerrar el proyecto registrando resultados, productos y evidencias.                                           |
| RF-2.09 | Generar el informe del proyecto (PDF/Word) con toda la información consolidada.                              |
| RF-2.10 | Consultar el histórico de proyectos con filtros por estado, unidad, área, programa, año y responsable.       |

---

## 6. Módulo 3 — Gestión de Espacios

Administra los espacios físicos bajo gestión de la DIGEU: catálogo, calendario de ocupación, solicitudes/reservas e historial de uso.

### 6.1 Sedes y espacios iniciales (datos semilla de referencia)

| Sede                  | Espacios                                                            |
| --------------------- | ------------------------------------------------------------------- |
| Paraninfo             | Salón Mayor, Cátedra I, Cátedra II, Salón de Ensayos, Sala TAU      |
| MUSAC                 | Salón Mayor, Patio Central                                          |
| Casa Flavio Herrera   | Auditorio                                                           |
| Colegio Santo Tomás   | Salón Mayor, Sala de Música, Patio Central                          |
| Instalaciones Zona 14 | Fútbol 11, Fútbol 5 – Cancha 1, Fútbol 5 – Cancha 2, Basket techado |

### 6.2 Datos del espacio

- Sede (catálogo)
- Nombre
- Tipo de espacio (salón, auditorio, patio, cancha, sala, etc.)
- Ubicación / dirección
- Capacidad (personas)
- Características (texto)
- Equipamiento (lista: sonido, proyector, iluminación, sillas, etc.)
- Condiciones de uso / reglamento (texto o archivo)
- Fotografías
- Estado: activo / inactivo / en mantenimiento
- Visible en catálogo público (sí/no)

### 6.3 Solicitudes y reservas

**Datos de la solicitud:** espacio, fecha, hora inicio, hora fin, solicitante (nombre, institución, correo, teléfono), propósito, asistentes estimados, requerimientos de equipo, actividad vinculada (opcional).

**Estados de ocupación** (leyenda del calendario):

- 🔴 **Ocupado** (reserva confirmada)
- 🟢 **Disponible**
- 🟡 **Pendiente de confirmación** (solicitud recibida)

Estados de la solicitud: `PENDIENTE → APROBADA | RECHAZADA | CANCELADA`.

### 6.4 Requerimientos funcionales

| ID      | Requerimiento                                                                                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF-3.01 | CRUD de sedes y espacios con sus características, equipamiento, condiciones de uso y fotografías.                                                                                             |
| RF-3.02 | **Catálogo público** (sin autenticación) de espacios con ubicación, capacidad, características, equipamiento, condiciones de uso y fotos.                                                     |
| RF-3.03 | El catálogo público **NO muestra disponibilidad**; para conocerla se debe enviar una solicitud.                                                                                               |
| RF-3.04 | Formulario de solicitud de espacio (público o interno); genera la solicitud en estado PENDIENTE y notifica al administrador.                                                                  |
| RF-3.05 | Aprobar o rechazar solicitudes; al aprobar, se bloquea el horario en el calendario.                                                                                                           |
| RF-3.06 | Impedir reservas que se traslapen en el mismo espacio y horario.                                                                                                                              |
| RF-3.07 | Calendario general de ocupación (interno): filas por sede/espacio, columnas por día; vistas día, semana y mes; navegación anterior/siguiente/hoy; filtros por sede, tipo de espacio y estado. |
| RF-3.08 | Al registrar una actividad (Módulo 1) se puede seleccionar el espacio y la reserva queda vinculada.                                                                                           |
| RF-3.09 | Historial de uso por espacio (fechas, actividades, solicitantes, asistentes).                                                                                                                 |
| RF-3.10 | Reportes de utilización: tasa de ocupación por espacio/sede/período, espacios más y menos usados.                                                                                             |
| RF-3.11 | Notificar por correo al solicitante el resultado de la solicitud.                                                                                                                             |

---

## 7. Módulo 4 — Recurso Humano (Artistas y Deportistas)

Registro de los artistas y deportistas vinculados a la DIGEU, con control de su estado y del tiempo de permanencia.

### 7.1 Datos

| Campo                        | Tipo                        | Requerido   | Notas                                                     |
| ---------------------------- | --------------------------- | ----------- | --------------------------------------------------------- |
| Tipo                         | Enum: ARTISTA / DEPORTISTA  | Sí          |                                                           |
| Disciplina                   | Catálogo                    | Sí          | Ej.: música, danza, teatro / fútbol, atletismo, etc.      |
| Unidad / agrupación          | Catálogo                    | No          | Ej.: coro, orquesta, selección                            |
| Nombres                      | Texto                       | Sí          |                                                           |
| Apellidos                    | Texto                       | Sí          |                                                           |
| Nacionalidad                 | Catálogo de países          | Sí          |                                                           |
| Fecha de nacimiento          | Fecha                       | Sí          | La edad se calcula automáticamente                        |
| DPI                          | Texto (13 dígitos)          | Condicional | Requerido si es guatemalteco; único                       |
| Pasaporte                    | Texto                       | Condicional | Requerido si es extranjero y no tiene DPI; único por país |
| Fotografía                   | Imagen (JPG/PNG, máx. 2 MB) | No          |                                                           |
| Fecha de alta (activo desde) | Fecha                       | Sí          |                                                           |
| Activo                       | Booleano                    | Sí          | Por defecto: sí                                           |
| Fecha de baja                | Fecha                       | Condicional | Requerida cuando Activo = no; debe ser ≥ fecha de alta    |
| Motivo de baja               | Texto                       | No          |                                                           |
| Tiempo de duración           | Calculado                   | —           | Ver regla RN-4.03                                         |
| Biografía                    | Texto largo                 | No          | Opcional                                                  |

> Nota: "DPO" del requerimiento original se interpreta como **DPI** (Documento Personal de Identificación). Confirmar con el usuario.

### 7.2 Reglas de negocio

| ID      | Regla                                                                                                                                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-4.01 | Debe registrarse al menos un documento de identificación: DPI o pasaporte.                                                                                                                                                      |
| RN-4.02 | DPI: exactamente 13 dígitos numéricos, único en el sistema (opcionalmente validar dígito verificador).                                                                                                                          |
| RN-4.03 | **Tiempo de duración** = de la fecha de alta a la fecha de baja si está inactivo, o a la fecha actual si está activo. Mostrar en años, meses y días (ej.: "3 años, 2 meses, 10 días"). Se calcula al consultar, no se almacena. |
| RN-4.04 | Al marcar como inactivo, se exige la fecha de baja. Al reactivar, se limpia la fecha de baja y se guarda el período anterior en el historial.                                                                                   |
| RN-4.05 | Mantener historial de períodos (alta/baja) para personas que se reincorporan; el tiempo total puede sumar todos los períodos.                                                                                                   |
| RN-4.06 | La fecha de nacimiento no puede ser futura; la fecha de alta no puede ser anterior a la fecha de nacimiento.                                                                                                                    |

### 7.3 Requerimientos funcionales

| ID      | Requerimiento                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| RF-4.01 | CRUD de artistas y deportistas con los campos descritos.                                                                              |
| RF-4.02 | Carga, previsualización y reemplazo de fotografía.                                                                                    |
| RF-4.03 | Dar de baja y reactivar con registro de fecha y motivo.                                                                               |
| RF-4.04 | Listado con búsqueda por nombre, DPI o pasaporte y filtros por tipo, disciplina, nacionalidad y estado.                               |
| RF-4.05 | Ficha individual con foto, datos, biografía, tiempo de duración y actividades/proyectos en que ha participado.                        |
| RF-4.06 | Vincular personas como participantes en actividades (Módulo 1) y como recursos en proyectos (Módulo 2).                               |
| RF-4.07 | Reportes: activos vs. inactivos, por tipo, disciplina, nacionalidad, rango de edad; promedio de permanencia. Exportables a PDF/Excel. |
| RF-4.08 | DPI y pasaporte solo visibles para roles autorizados (datos sensibles).                                                               |
| RF-4.09 | Carga masiva del padrón desde una hoja de cálculo, con plantilla, revisión fila por fila y las mismas reglas del alta individual.     |

---

## 8. Módulo transversal

### 8.1 Roles y permisos

| Rol                       | Permisos principales                                                      |
| ------------------------- | ------------------------------------------------------------------------- |
| Administrador             | Todo: usuarios, roles, catálogos, configuración                           |
| Dirección                 | Consulta global, aprobación de proyectos, todos los reportes              |
| Validador / Planificación | Revisa y valida actividades; revisa proyectos                             |
| Coordinador de unidad     | Registra y gestiona actividades y proyectos de su unidad                  |
| Administrador de espacios | Gestiona espacios, solicitudes y calendario                               |
| Gestor de recurso humano  | Gestiona artistas y deportistas                                           |
| Consulta                  | Solo lectura                                                              |
| Público (sin sesión)      | Catálogo de espacios, formulario de solicitud y Agenda Cultural publicada |

Los usuarios de unidad solo ven y editan la información de su propia unidad, salvo que tengan un rol global.

### 8.2 Catálogos administrables

Unidades administrativas, áreas de DIGEU, programas, líneas de acción, tipos de actividad, tipos de proyecto, indicadores (con unidad de medida), públicos objetivo, sedes, tipos de espacio, equipamiento, disciplinas, agrupaciones, países, fuentes de financiamiento.

### 8.3 Otros requerimientos transversales

| ID      | Requerimiento                                                                                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RF-T.01 | Autenticación con usuario y contraseña (preparado para integración futura con SSO institucional).                                                                                                                              |
| RF-T.02 | Bitácora de auditoría: quién, qué, cuándo y valores anteriores/nuevos para cada cambio.                                                                                                                                        |
| RF-T.03 | Gestión de archivos adjuntos (imágenes, PDF, documentos) con límite de tamaño configurable.                                                                                                                                    |
| RF-T.04 | Notificaciones internas y por correo (validaciones, observaciones, aprobaciones, solicitudes).                                                                                                                                 |
| RF-T.05 | Dashboard de inicio con indicadores clave y gráficas: actividades del mes por estado y por tipo, actividades y beneficiarios de los últimos seis meses, proyectos en ejecución, ocupación de espacios y recurso humano activo. |
| RF-T.06 | Borrado lógico (soft delete) en todas las entidades principales.                                                                                                                                                               |
| RF-T.10 | Búsqueda global desde cualquier pantalla (⌘K / Ctrl+K) sobre actividades, proyectos, padrón, espacios y usuarios, respetando permisos y alcance por unidad.                                                                    |
| RF-T.11 | Impresión de reportes con membrete institucional, que es también la forma de guardarlos en PDF desde el navegador mientras no se aprueben las dependencias de §12.3.                                                           |

---

## 9. Modelo de datos (propuesta, convenciones de Laravel)

### 9.1 Convenciones

- **Tablas:** plural en `snake_case` y en español (`actividades`, `proyectos`, `espacios`). Las tablas pivote usan el orden alfabético de los modelos en singular (`actividad_indicador`).
- **Modelos Eloquent:** singular en `StudlyCase` (`Actividad`, `Proyecto`, `PersonaRecursoHumano`) en `app/Models`. Cuando el pluralizador en inglés de Laravel no coincide con el nombre en español, el modelo declara `protected $table`.
- **Claves:** `$table->id()` como PK y `foreignId('unidad_id')->constrained()` para las FK; los nombres de columna conservan el sufijo `_id`.
- **Fechas y borrado:** `$table->timestamps()` en todas las tablas y `$table->softDeletes()` (trait `SoftDeletes`) en las entidades principales, según RF-T.06.
- **Estados:** enums de PHP respaldados por `string` en `app/Enums` (`EstadoActividad`, `EstadoProyecto`, `EstadoSolicitud`, `TipoPersona`) y declarados en el método `casts()` del modelo.
- **Migraciones, factories y seeders:** se generan con `php artisan make:model Actividad -mfs`; los catálogos iniciales (sedes, espacios de la sección 6.1, roles, disciplinas, países) se cargan desde seeders.
- **Datos de demostración:** `DemoSeeder` crea unidades, un usuario por rol (contraseña `password`), actividades en todos sus estados, un proyecto en ejecución, padrón y una solicitud de espacio. No forma parte de `db:seed`: se ejecuta a propósito con `php artisan db:seed --class=DemoSeeder`, se puede repetir sin duplicar nada y nunca debe correrse en el servidor.
- **Tablas ya existentes en la base:** `users`, `password_reset_tokens`, `sessions`, `cache`, `jobs` (migraciones del starter kit) y las columnas `two_factor_*` que aporta Fortify. `users` se amplía con `unidad_id` y `activo` mediante una migración nueva; las notificaciones en base de datos requieren `php artisan make:notifications-table`.

### 9.2 Tablas

```
users(id, name, email, email_verified_at, password, unidad_id NULL, activo,
      two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at,
      remember_token, timestamps)                      # modelo App\Models\User (ya existe)
roles(id, nombre, slug, descripcion) / role_user(role_id, user_id)
areas(id, nombre, activo, timestamps)
unidades(id, nombre, area_id, activo, timestamps)

# Catálogos administrables (RF-T.04), todos con (id, nombre, activo, timestamps):
# programas, lineas_accion, tipos_actividad, tipos_proyecto, indicadores(+unidad_medida),
# publicos_objetivo, tipos_espacio, equipamientos, disciplinas, agrupaciones,
# paises, fuentes_financiamiento

actividades(id, nombre, unidad_id, responsable_id, fecha, hora_inicio, hora_fin,
            espacio_id NULL, lugar_externo NULL, tipo_actividad_id, linea_accion_id,
            proyecto_id NULL, publicar_agenda, es_logro_no_programado, estado,
            resultados, observaciones, timestamps, deleted_at)
actividad_indicador(actividad_id, indicador_id, valor_meta, valor_alcanzado)   # pivote
actividad_publico_objetivo(actividad_id, publico_objetivo_id)                  # pivote
actividad_beneficiarios(id, actividad_id, sexo, rango_edad, tipo_publico, cantidad)
actividad_participantes(id, actividad_id, persona_recurso_humano_id NULL,
            nombre_externo NULL, rol)
actividad_revisiones(id, actividad_id, user_id, accion, comentario, timestamps)
actividad_reprogramaciones(id, actividad_id, fecha_anterior, fecha_nueva, motivo, user_id)
evidencias(id, evidenciable_type, evidenciable_id, tipo[FOTO|DOCUMENTO|ENLACE],
            disco, ruta NULL, url NULL, descripcion, user_id, timestamps)      # morphTo

proyectos(id, nombre, responsable_id, unidad_id, area_id, programa_id, linea_accion_id,
          tipo_proyecto_id, justificacion, objetivo_general, estado,
          fecha_inicio, fecha_fin, timestamps, deleted_at)
proyecto_objetivos(id, proyecto_id, descripcion, orden)
proyecto_beneficiarios(id, proyecto_id, tipo, cantidad, descripcion)
proyecto_cronogramas(id, proyecto_id, tarea, fecha_inicio, fecha_fin, responsable_id, avance)
proyecto_presupuestos(id, proyecto_id, descripcion, cantidad, costo_unitario,
          fuente_financiamiento_id, ejecutado)
proyecto_indicadores(id, proyecto_id, indicador_id, linea_base, meta, valor_final)
proyecto_avances(id, proyecto_id, fecha, porcentaje, descripcion, timestamps)
proyecto_recursos(id, proyecto_id, tipo, persona_recurso_humano_id NULL,
          descripcion, cantidad, costo)
proyecto_revisiones(id, proyecto_id, user_id, accion, comentario, timestamps)
proyecto_cierres(id, proyecto_id, resultados, productos, lecciones_aprendidas, fecha_cierre)

sedes(id, nombre, direccion, activo, timestamps)
espacios(id, sede_id, nombre, tipo_espacio_id, ubicacion, capacidad, caracteristicas,
         condiciones_uso, estado, visible_publico, timestamps, deleted_at)
espacio_equipamiento(espacio_id, equipamiento_id, cantidad)                    # pivote
solicitudes_espacio(id, espacio_id, fecha, hora_inicio, hora_fin, solicitante_nombre,
         institucion, correo, telefono, proposito, asistentes, requerimientos,
         actividad_id NULL, estado, resuelto_por NULL, fecha_resolucion NULL,
         motivo_rechazo NULL, timestamps)

personas_recurso_humano(id, tipo[ARTISTA|DEPORTISTA], disciplina_id, agrupacion_id NULL,
         nombres, apellidos, pais_id, fecha_nacimiento, dpi UNIQUE NULL,
         pasaporte NULL, foto_ruta NULL, fecha_alta, activo, fecha_baja NULL,
         motivo_baja NULL, biografia NULL, timestamps, deleted_at)
persona_recurso_humano_periodos(id, persona_recurso_humano_id, fecha_alta,
         fecha_baja NULL, motivo_baja NULL)

auditorias(id, user_id NULL, auditable_type, auditable_id, accion,
         valores_antes JSON, valores_despues JSON, ip, user_agent, created_at)
notifications(id, type, notifiable_type, notifiable_id, data, read_at, timestamps)
```

### 9.3 Relaciones y reglas en el modelo

- `Actividad` → `belongsTo` Unidad, Espacio, Proyecto, TipoActividad, LineaAccion; `belongsToMany` Indicador y PublicoObjetivo; `hasMany` beneficiarios, participantes, revisiones; `morphMany` Evidencia.
- `Proyecto` → `hasMany` objetivos, cronograma, presupuesto, indicadores, avances, recursos, revisiones; `hasMany` Actividad (RF-2.06).
- `Espacio` → `belongsTo` Sede; `belongsToMany` Equipamiento; `hasMany` SolicitudEspacio y Actividad (calendario de ocupación).
- `PersonaRecursoHumano` → `hasMany` periodos; `belongsToMany` Actividad (participaciones) y Proyecto (recursos). El tiempo de permanencia (RN-4.03) es un accessor calculado, no una columna.
- La validación de traslapes (RF-1.08, RF-3.06) vive en una regla de validación o acción dedicada que consulta `actividades` y `solicitudes_espacio` del mismo espacio y rango horario, dentro de una transacción con `lockForUpdate()`.

## 10. Reportes

| Reporte                                                            | Módulo | Periodicidad                 | Formato     |
| ------------------------------------------------------------------ | ------ | ---------------------------- | ----------- |
| Reporte mensual de actividades y logros (por unidad y consolidado) | 1      | Mensual                      | PDF / Excel |
| Indicadores alcanzados                                             | 1      | Mensual / acumulado          | PDF / Excel |
| Reportes acumulados                                                | 1      | Trimestral, semestral, anual | PDF / Excel |
| Agenda Cultural                                                    | 1      | Semanal / mensual            | Web / PDF   |
| Informe de proyecto                                                | 2      | Al cierre / bajo demanda     | PDF / Word  |
| Cartera de proyectos (estado, avance físico y financiero)          | 2      | Bajo demanda                 | PDF / Excel |
| Ocupación y uso de espacios                                        | 3      | Mensual / anual              | PDF / Excel |
| Historial de uso por espacio                                       | 3      | Bajo demanda                 | PDF / Excel |
| Padrón de artistas y deportistas                                   | 4      | Bajo demanda                 | PDF / Excel |
| Estadísticas de recurso humano                                     | 4      | Bajo demanda                 | PDF / Excel |

## 11. Requerimientos no funcionales

| ID     | Requerimiento                                                                                                                                                                                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RNF-01 | Aplicación web responsiva (escritorio, tableta y móvil).                                                                                                                                                                                                                                                                 |
| RNF-02 | Interfaz en español; fechas en formato dd/mm/aaaa; zona horaria America/Guatemala.                                                                                                                                                                                                                                       |
| RNF-03 | Autenticación por sesión de Laravel (cookie firmada y cifrada) gestionada por Fortify; contraseñas con hash bcrypt (`BCRYPT_ROUNDS=12`) y expiración por `SESSION_LIFETIME`. No se usan JWT: la aplicación es un monolito Inertia, no una API separada.                                                                  |
| RNF-04 | Control de acceso en el servidor con Policies y Gates (`authorize()` en controladores y Form Requests) y en la interfaz con los permisos que `HandleInertiaRequests` comparte como props. La UI nunca es la única barrera.                                                                                               |
| RNF-05 | Protección de datos personales: DPI y pasaporte restringidos por rol y registrados en auditoría al consultarse.                                                                                                                                                                                                          |
| RNF-06 | Respaldo diario de la base de datos y del disco de archivos (`storage/app`), programado con el scheduler de Laravel (`routes/console.php`) o por la plataforma de despliegue.                                                                                                                                            |
| RNF-07 | Tiempo de respuesta < 3 s en consultas habituales.                                                                                                                                                                                                                                                                       |
| RNF-08 | No se expone una API pública en la primera versión: el frontend React consume los endpoints de Inertia mediante las rutas tipadas que genera Wayfinder (`@/actions`, `@/routes`). Si más adelante se necesita una API para terceros, se publica en `routes/api.php` con Eloquent API Resources y versionado (`/api/v1`). |
| RNF-09 | Pruebas con Pest: _feature tests_ por caso de uso (ruta, validación, autorización y efectos en base de datos) y _unit tests_ de la lógica de negocio (transiciones de estado, cálculo de permanencia, traslapes de horario).                                                                                             |
| RNF-10 | Toda la configuración por variables de entorno (`.env`); nada de credenciales en el código. Desarrollo local con `composer run dev`; despliegue en Laravel Cloud o en un servidor con PHP 8.3+ ejecutando `php artisan optimize` y `npm run build`. Laravel Sail está disponible si se requiere Docker.                  |
| RNF-11 | Calidad de código verificada en cada cambio: `vendor/bin/pint` (estilo PHP), `phpstan` vía Larastan (tipos), `npm run check` y `npm run types:check` (frontend), `php artisan test` (Pest). `composer ci:check` ejecuta todo.                                                                                            |
| RNF-12 | Localización inicial del proyecto base: `APP_LOCALE=es`, `APP_FAKER_LOCALE=es_GT` y zona horaria `America/Guatemala` en `config/app.php`; el formato dd/mm/aaaa se aplica en la capa de presentación.                                                                                                                    |

## 12. Stack tecnológico

El sistema se implementa sobre el proyecto base ya instalado en este repositorio (Laravel React Starter Kit). Las versiones son las declaradas en `composer.json` y `package.json`.

| Capa                   | Tecnología                                                                              | Notas                                                                                                                                                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lenguaje y framework   | PHP 8.5 (requisito `^8.3`), Laravel 13                                                  | Monolito con renderizado desde el servidor                                                                                                                                                                                                         |
| Capa de vista          | Inertia v3 (`inertiajs/inertia-laravel`, `@inertiajs/react`)                            | Sin API REST intermedia; los controladores devuelven `Inertia::render()`                                                                                                                                                                           |
| Frontend               | React 19 + TypeScript, Vite (vite-plus)                                                 | Páginas en `resources/js/pages`                                                                                                                                                                                                                    |
| Estilos y componentes  | Tailwind CSS v4, shadcn/ui sobre Radix UI, iconos Lucide, avisos con `sonner`           | `components.json` ya configurado                                                                                                                                                                                                                   |
| Rutas tipadas          | Laravel Wayfinder                                                                       | Importar desde `@/actions` y `@/routes`; no escribir URLs a mano                                                                                                                                                                                   |
| Autenticación          | Laravel Fortify                                                                         | Ya habilitado: inicio de sesión, recuperación de contraseña y verificación de correo. El registro público queda deshabilitado (los usuarios los crea el Administrador, RF-T.03). 2FA disponible al habilitar `Features::twoFactorAuthentication()` |
| Autorización           | Gates y Policies de Laravel + tabla propia `roles`                                      | Un paquete de permisos requiere aprobación previa (ver 12.3)                                                                                                                                                                                       |
| Base de datos          | MySQL en desarrollo; SQLite en memoria para las pruebas; PostgreSQL o MySQL en servidor | Acceso con Eloquent y migraciones; el motor de producción se confirma al definir el despliegue                                                                                                                                                     |
| Archivos               | `Storage` de Laravel (discos `local` y `public`); S3 opcional                           | Fotografías con el manejo de imágenes de Laravel 13 (`$request->image(...)->cover(...)->store(...)`)                                                                                                                                               |
| Colas y notificaciones | Notifications de Laravel (canales `mail` y `database`), `QUEUE_CONNECTION=database`     | Correos de validaciones, aprobaciones y solicitudes (RF-T.07)                                                                                                                                                                                      |
| Tareas programadas     | Scheduler en `routes/console.php`                                                       | Recordatorios y cierres de período                                                                                                                                                                                                                 |
| Pruebas y calidad      | Pest 5, Pint, Larastan, Laravel Pail, Laravel Boost                                     | `composer ci:check`                                                                                                                                                                                                                                |

### 12.1 Identidad visual

La paleta institucional se tomó del material oficial de la DIGEU y vive como tokens de Tailwind v4 en `resources/css/app.css` (directiva `@theme`); ningún componente debe escribir colores a mano.

| Token         | Color     | Uso                                                    |
| ------------- | --------- | ------------------------------------------------------ |
| `digeu-navy`  | `#0A3667` | Barra lateral, encabezados y fondo oscuro              |
| `digeu-blue`  | `#024285` | Azul institucional de apoyo                            |
| `digeu-azure` | `#025F89` | Color primario de la interfaz (botones, enlaces, foco) |
| `digeu-cyan`  | `#018AB0` | Acentos, barra de progreso, marca en la barra lateral  |
| `digeu-teal`  | `#23A1B8` | Detalles y anillos de foco                             |
| `digeu-green` | `#63B334` | Área de Deporte                                        |
| `digeu-amber` | `#FDB311` | Área de Vinculación con la sociedad                    |
| `digeu-plum`  | `#6F1E5E` | Área de Formación y actualización                      |

El logotipo oficial USAC · DIGEU está en `public/images/logo.png`, en blanco sobre fondo transparente. Los componentes `MarcaInstitucional` y `SelloUsac` (`resources/js/components/marca-institucional.tsx`) lo aplican como máscara CSS, de modo que la marca toma el color del texto que hereda: blanca sobre el azul institucional y azul sobre fondos claros, con un solo archivo para ambos temas. `SelloUsac` recorta el sello circular de la USAC para los lugares donde solo cabe una marca cuadrada, como la barra lateral plegada. El ícono de pestaña (`favicon.ico`, `favicon.png` y `apple-touch-icon.png`) se generó de ese mismo sello.

Las cinco áreas que impulsa la DIGEU tienen alias propios (`area-formacion`, `area-cultura`, `area-deporte`, `area-vinculacion`, `area-interdisciplinariedad`) y son también la serie de colores de las gráficas (`chart-1` … `chart-5`), de modo que un mismo área se ve igual en menús, etiquetas y reportes. El tema claro y el oscuro están definidos con los mismos tokens semánticos de shadcn/ui.

### 12.2 Cómo se traduce cada requerimiento transversal al framework

| Requerimiento                                                      | Implementación                                                                                                                                                                                           |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF-T.01 Iniciar sesión, bloqueo tras intentos fallidos, expiración | Fortify + `throttle` en las rutas de autenticación + `SESSION_LIFETIME`                                                                                                                                  |
| RF-T.02 Recuperar contraseña con enlace de un solo uso             | `Features::resetPasswords()` de Fortify (tabla `password_reset_tokens`)                                                                                                                                  |
| RF-T.03 Usuarios, roles y unidad                                   | CRUD propio sobre `users`, `roles` y `role_user`; un usuario inactivo se bloquea en el login                                                                                                             |
| RF-T.04 Catálogos                                                  | Un controlador de recurso por catálogo; los valores en uso se desactivan, no se eliminan                                                                                                                 |
| RF-T.05 Bitácora de auditoría                                      | Observers o eventos de modelo que escriben en `auditorias` (`getChanges()` / `getOriginal()`), más registro explícito al consultar DPI o pasaporte (RNF-05)                                              |
| RF-T.06 Archivos adjuntos                                          | Validación en Form Requests (`file`, `mimes`, `max`) y `Storage`; límite configurable en `config/`                                                                                                       |
| RF-T.07 Notificaciones                                             | Clases en `app/Notifications` con canales `mail` y `database`; bandeja leída desde la relación `notifications`                                                                                           |
| RF-T.08 Dashboard                                                  | Controlador que entrega los indicadores por rol a la página `dashboard`; los bloques pesados se cargan con props diferidas de Inertia v3                                                                 |
| RF-T.10 Búsqueda global                                            | `BuscadorController` devuelve JSON por grupo, consultando cada uno solo si la policy lo permite; el diálogo del encabezado lo consume sin recargar la página                                             |
| RF-T.11 Impresión con membrete                                     | Bloque `@media print` en `app.css` y el componente `MembreteInstitucional`, que solo aparece al imprimir; el logotipo usa una versión azul porque el papel es blanco                                     |
| RF-1.13 y RF-4.09 Carga masiva                                     | `app/Actions/HojasDeCalculo`: lectura y escritura de `.xlsx` con `ZipArchive` (sin dependencias nuevas) y la clase base `CargaMasiva`, que arma la plantilla, revisa fila por fila y guarda al confirmar |
| RF-1.14 Compartir actividades                                      | Los metadatos Open Graph y el bloque `schema.org/Event` se escriben en `app.blade.php` desde el servidor, porque WhatsApp, Facebook y los buscadores no ejecutan JavaScript                              |
| RF-T.09 Exportar a PDF y Excel                                     | Acciones de exportación por reporte (ver dependencias por aprobar)                                                                                                                                       |
| Catálogo público y Agenda Cultural                                 | Rutas sin middleware `auth` en `routes/publico.php` (cargado desde `web.php`), con controladores en `App\Http\Controllers\Publico`                                                                       |

### 12.3 Dependencias por aprobar

El proyecto base no incluye estas piezas y no se instalan sin autorización:

- **PDF:** `spatie/laravel-pdf` o `barryvdh/laravel-dompdf` (RF-1.11, RF-2.09, RF-T.09).
- **Excel:** `maatwebsite/excel`, o exportación a CSV con las herramientas nativas si se prefiere no añadir dependencias.
- **Calendario en la interfaz:** FullCalendar para React u otra librería equivalente (RF-1.04, RF-3.07); alternativa: una vista propia con Tailwind.
- **Roles y permisos:** `spatie/laravel-permission` si se quiere evitar la tabla `roles` propia.

## 13. Estructura del proyecto

Se respeta la estructura del proyecto Laravel existente; los módulos se organizan en subcarpetas dentro de las carpetas que ya existen.

```
sidigeu/
├── app/
│   ├── Actions/                    # operaciones de negocio reutilizables
│   │   ├── Fortify/                # ya existe
│   │   ├── Actividades/            # ValidarActividad, CerrarActividad, Reprogramar...
│   │   ├── Proyectos/              # AprobarProyecto, CerrarProyecto...
│   │   ├── Espacios/               # ResolverSolicitud, VerificarTraslape...
│   │   ├── RecursoHumano/          # RegistrarPersona, CargaMasivaDelPadron...
│   │   └── HojasDeCalculo/         # lectura y escritura de .xlsx y base de la carga masiva
│   ├── Enums/                      # EstadoActividad, EstadoProyecto, EstadoSolicitud, TipoPersona
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Actividades/        # Módulo 1
│   │   │   ├── Proyectos/          # Módulo 2
│   │   │   ├── Espacios/           # Módulo 3
│   │   │   ├── RecursoHumano/      # Módulo 4
│   │   │   ├── Catalogos/
│   │   │   ├── Reportes/
│   │   │   ├── Publico/            # catálogo de espacios, solicitud, Agenda Cultural
│   │   │   ├── Administracion/     # usuarios, roles, auditoría
│   │   │   └── Settings/           # ya existe
│   │   ├── Middleware/             # HandleInertiaRequests, HandleAppearance (ya existen)
│   │   └── Requests/               # un Form Request por acción
│   ├── Models/                     # Actividad, Proyecto, Espacio, PersonaRecursoHumano...
│   ├── Notifications/
│   ├── Observers/                  # auditoría
│   ├── Policies/                   # una policy por entidad principal
│   └── Providers/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/                    # catálogos, sedes y espacios iniciales, roles, datos de demostración
├── resources/js/
│   ├── actions/ · routes/          # generado por Wayfinder (no se edita a mano)
│   ├── components/ui/              # shadcn/ui
│   ├── layouts/
│   └── pages/
│       ├── dashboard.tsx
│       ├── actividades/            # Módulo 1 + Agenda Cultural
│       ├── proyectos/              # Módulo 2
│       ├── espacios/               # Módulo 3 + calendario de ocupación
│       ├── recurso-humano/         # Módulo 4
│       ├── catalogos/
│       ├── reportes/
│       ├── administracion/
│       └── publico/                # vistas sin autenticación
├── routes/
│   ├── web.php                     # raíz, dashboard y carga de los demás archivos
│   ├── settings.php                # ya existe
│   ├── publico.php                 # sin middleware auth
│   ├── actividades.php · proyectos.php · espacios.php · recurso-humano.php
│   └── console.php                 # tareas programadas
├── storage/app/                    # evidencias, fotografías y adjuntos
└── tests/
    ├── Feature/                    # un archivo por caso de uso (CU-01 … CU-31)
    └── Unit/                       # reglas de negocio
```

## 14. Plan de entrega

**Punto de partida (ya disponible en el repositorio):** Laravel 13 con Inertia + React, autenticación de Fortify con sus pantallas, pantallas de perfil y seguridad, layout con barra lateral, componentes shadcn/ui, base SQLite migrada y suite de Pest configurada.

1. **Fase 0 — Ajustes de la base. _(implementada)_** Localización a español (`lang/es`, zona horaria `America/Guatemala`) e identidad institucional; `users.unidad_id` y `users.activo` con bloqueo de usuarios desactivados en el inicio de sesión; tablas `areas`, `unidades`, `roles`, `role_user`, `auditorias` y `notifications`; enum `Rol` con los siete roles y `Gate::before` para el Administrador; trait `Auditable` con su observer; seeders de roles y áreas. Pendiente de la fase: las Policies de cada entidad, que se escriben junto con su módulo.
2. **Fase 1 — Transversal y Módulo 4. _(implementada)_** Administración de usuarios y roles con envío del enlace para definir contraseña; catálogos administrables (áreas, unidades, disciplinas, agrupaciones y países) desde una sola pantalla; padrón de artistas y deportistas con fotografía, documentos validados (RN-4.01 y RN-4.02), baja y reactivación con historial de períodos, cálculo de permanencia, restricción de DPI y pasaporte por rol con registro en la bitácora, y reportes con exportación a CSV. Pendiente de la fase: exportación a PDF y Excel con formato institucional, que requiere aprobar las dependencias de la sección 12.3.
3. **Fase 2 — Módulo 3 (Espacios). _(implementada)_** Sedes, tipos de espacio y equipamiento como catálogos; gestión de espacios con fotografías, equipamiento, condiciones de uso y estado operativo; catálogo público sin autenticación que no muestra disponibilidad; formulario de solicitud abierto con control de traslapes y aviso al administrador de espacios; aprobación y rechazo con notificación por correo al solicitante; calendario de ocupación con vistas de día, semana y mes; historial de uso por espacio y reportes de utilización con exportación a CSV.
4. **Fase 3 — Módulo 1 (Actividades). _(implementada)_** Programación mensual por unidad con su clasificación e indicadores; envío a revisión y validación con observaciones o rechazo; reserva del espacio vinculada a la actividad, que se confirma al validarla y se libera al cancelarla o rechazarla; ejecución, reprogramación con historial de fechas y cancelación con motivo; cierre con resultados, beneficiarios desagregados, participantes del padrón o externos, valores alcanzados por indicador y evidencias (archivos y enlaces); Agenda Cultural pública, con acciones para publicar una actividad ya validada o retirarla de la agenda sin cancelarla, que quedan en el historial de revisión, y descarga de cada actividad en formato iCalendar (.ics) para agregarla al calendario propio; reportes mensuales por unidad y consolidados, y acumulados trimestrales, semestrales y anuales con exportación a CSV. Pendiente de la fase: el vínculo actividad ↔ proyecto (RF-1.12), que llega con el Módulo 2, y la exportación a PDF y Excel de la sección 12.3.
5. **Fase 4 — Módulo 2 (Proyectos). _(implementada)_** Registro con clasificación (área, programa, línea de acción y tipo); formulación con objetivos, beneficiarios, cronograma, presupuesto por fuente de financiamiento e indicadores con línea base y meta; envío a aprobación con aprobación, observación o rechazo; ejecución con avances periódicos, evidencias, recursos humanos, materiales y financieros, y tablero de avance físico y financiero; vinculación de actividades del Módulo 1, cuyos indicadores y beneficiarios se consolidan en el proyecto; cierre con resultados, productos, lecciones aprendidas y valores finales; histórico con filtros e informe del proyecto en CSV. Pendiente de la fase: el informe en PDF o Word, que requiere las dependencias de la sección 12.3.
6. **Fase 5 — Reportes y dashboard. _(implementada)_** Dashboard de inicio por rol con actividades del mes y su estado, proyectos en ejecución y su avance, ocupación de espacios de la semana, recurso humano activo y las acciones pendientes de cada rol; bandeja de notificaciones con avisos de envío a revisión, validación, observación, rechazo y aprobación de proyectos, por correo y en el sistema; bitácora de auditoría consultable con filtros por usuario, entidad, acción y fechas, con el detalle de valores anteriores y nuevos; portada pública institucional que enlaza la Agenda Cultural y el catálogo de espacios. Pendiente: la exportación a PDF y Excel, que requiere las dependencias de la sección 12.3.

Cada fase entrega sus pruebas de Pest y pasa `composer ci:check` antes de darse por terminada.

## 15. Puntos por confirmar

- Confirmar que "DPO" corresponde a **DPI**.
- ¿El formulario de solicitud de espacios lo llena el público externo directamente o solo personal interno?
- ¿La Agenda Cultural se publica en un portal público o es solo interna? _(implementada como pública en `/agenda`; cambiarla a interna es mover la ruta dentro del grupo autenticado)_.
- Lista oficial de unidades, programas, líneas de acción e indicadores.
- ¿Se requiere integración con algún sistema existente de la USAC (autenticación, presupuesto)?
- Motor de base de datos para el servidor: PostgreSQL o MySQL (en desarrollo se trabaja con MySQL y las pruebas corren sobre SQLite en memoria).
- Aprobación de las dependencias de la sección 12.3 (PDF, Excel, calendario, roles) antes de instalarlas.
- Desagregación exacta de beneficiarios requerida para los informes.
