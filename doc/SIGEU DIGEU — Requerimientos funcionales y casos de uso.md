# SIGEU DIGEU — Requerimientos funcionales y casos de uso

Nov 11, 2026 · @Hared

## 1. Introducción

Este documento detalla 59 requerimientos funcionales y 31 casos de uso del Sistema Interno de Gestión de la Extensión Universitaria (SIGEU) de la DIGEU, USAC. Cubre los módulos de Actividades, Proyectos, Espacios, Recurso Humano y el bloque transversal.

### 1.1 Convenciones

- **RF-M.NN**: requerimiento funcional; M = módulo (1–4, T = transversal), NN = número.
- **RN-M.NN**: regla de negocio.
- **CU-NN**: caso de uso.
- **Prioridad**: Alta (indispensable para la primera versión), Media (necesaria, puede entrar en una fase posterior), Baja (deseable).

### 1.2 Actores

| Actor                     | Descripción                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Administrador             | Gestiona usuarios, roles, catálogos y configuración general.                                                       |
| Dirección                 | Consulta global, aprueba proyectos y consulta todos los reportes.                                                  |
| Validador                 | Personal de planificación que revisa y valida actividades y revisa proyectos.                                      |
| Coordinador de unidad     | Registra y gestiona las actividades y proyectos de su unidad.                                                      |
| Administrador de espacios | Gestiona sedes, espacios, solicitudes y el calendario de ocupación.                                                |
| Gestor de recurso humano  | Gestiona el registro de artistas y deportistas.                                                                    |
| Consulta                  | Usuario interno con acceso de solo lectura.                                                                        |
| Público                   | Persona sin sesión: consulta el catálogo de espacios, la Agenda Cultural publicada y envía solicitudes de espacio. |
| Sistema                   | Procesos automáticos: notificaciones, cálculos y generación de reportes.                                           |

## 2. Módulo 1 — Actividades, Resultados e Informes

El módulo cubre el ciclo completo de una actividad: programación mensual, validación, Agenda Cultural, ejecución, cierre con resultados y evidencias, e informes mensuales y acumulados.

**Ciclo de estados:** Borrador → Enviada → Validada → Publicada en agenda → En ejecución → Cerrada. Desde Enviada puede pasar a Observada (vuelve a Enviada al corregirse) o Rechazada; desde Validada o Publicada puede pasar a Reprogramada o Cancelada.

| ID      | Requerimiento                           | Actor                             | Descripción y validaciones                                                                                                                                                                                                                                                                                                                                                     | Prioridad |
| ------- | --------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| RF-1.01 | Registrar actividad                     | Coordinador de unidad             | Captura nombre, unidad responsable, fecha, hora inicio y fin, lugar (espacio del catálogo o lugar externo), responsable, tipo de actividad, línea de acción, programa o proyecto, indicadores asociados, público objetivo y bandera de Agenda Cultural. Obligatorios: nombre, unidad, fecha, tipo y línea de acción. Hora fin mayor que hora inicio. Queda en estado Borrador. | Alta      |
| RF-1.02 | Editar y eliminar actividad en borrador | Coordinador de unidad             | Solo se editan actividades en Borrador u Observada. La eliminación es lógica y solo en Borrador.                                                                                                                                                                                                                                                                               | Alta      |
| RF-1.03 | Enviar actividad a revisión             | Coordinador de unidad             | Cambia el estado a Enviada y notifica a los validadores. Se puede enviar una por una o toda la programación mensual de la unidad.                                                                                                                                                                                                                                              | Alta      |
| RF-1.04 | Validar, observar o rechazar actividad  | Validador                         | Aprobar pasa a Validada; observar exige comentario y regresa al coordinador; rechazar exige motivo. Cada acción queda en el historial de revisiones con usuario y fecha.                                                                                                                                                                                                       | Alta      |
| RF-1.05 | Publicar en Agenda Cultural             | Sistema                           | Las actividades validadas con bandera de agenda pasan a Publicada en agenda y se muestran en la Agenda Cultural.                                                                                                                                                                                                                                                               | Alta      |
| RF-1.06 | Consultar Agenda Cultural               | Público, usuarios internos        | Vista de calendario (mes, semana, día) y lista. Filtros por fecha, unidad, tipo de actividad y espacio. El público solo ve nombre, fecha, hora, lugar y descripción.                                                                                                                                                                                                           | Media     |
| RF-1.07 | Reprogramar o cancelar actividad        | Coordinador de unidad             | Reprogramar guarda la fecha anterior en el historial y vuelve a validar el espacio. Cancelar exige motivo. Ambos notifican al validador y retiran o actualizan la agenda.                                                                                                                                                                                                      | Alta      |
| RF-1.08 | Iniciar ejecución                       | Coordinador de unidad, Sistema    | Pasa a En ejecución manualmente o de forma automática al llegar la fecha y hora de inicio.                                                                                                                                                                                                                                                                                     | Media     |
| RF-1.09 | Cerrar actividad                        | Coordinador de unidad             | Registra participantes, beneficiarios desagregados (sexo, rango de edad, tipo de público), resultados, valor alcanzado por indicador y evidencias (fotos, documentos, enlaces). Exige al menos un resultado y el valor de cada indicador asociado.                                                                                                                             | Alta      |
| RF-1.10 | Registrar logro no programado           | Coordinador de unidad             | Registra un logro sin programación previa, con los datos de la actividad, resultados, indicadores y evidencias. Queda marcado como no programado y entra en el reporte del mes.                                                                                                                                                                                                | Alta      |
| RF-1.11 | Validar disponibilidad del espacio      | Sistema                           | Al elegir un espacio del catálogo, verifica que no haya otra reserva en el mismo horario. Si hay choque, impide guardar y muestra la actividad o reserva en conflicto.                                                                                                                                                                                                         | Alta      |
| RF-1.12 | Generar reporte mensual                 | Coordinador, Validador, Dirección | Por unidad y consolidado: actividades realizadas, logros del mes (programados y no programados) e indicadores alcanzados. Solo incluye actividades cerradas.                                                                                                                                                                                                                   | Alta      |
| RF-1.13 | Generar reportes acumulados             | Validador, Dirección              | Trimestral, semestral y anual, con totales por unidad, tipo de actividad, línea de acción, beneficiarios e indicadores.                                                                                                                                                                                                                                                        | Media     |
| RF-1.14 | Vincular actividad con proyecto         | Coordinador de unidad             | Al asociar un proyecto aprobado o en ejecución, los resultados e indicadores de la actividad cerrada se suman al proyecto.                                                                                                                                                                                                                                                     | Media     |

**Reglas de negocio**

- **RN-1.01** Un coordinador solo registra y ve actividades de su unidad.
- **RN-1.02** Una actividad cerrada no se edita; solo el Administrador puede reabrirla, con motivo registrado en la bitácora.
- **RN-1.03** El reporte mensual toma la fecha de ejecución de la actividad, no la fecha de registro.

## 3. Módulo 2 — Gestión de Proyectos

El módulo lleva cada proyecto desde su registro hasta el informe final y conserva el histórico de proyectos en ejecución y finalizados.

**Ciclo de estados:** Registrado → En formulación → En revisión → Aprobado → En ejecución → Cerrado. Desde En revisión puede pasar a Observado (vuelve a En revisión) o Rechazado; desde Aprobado o En ejecución puede pasar a Suspendido o Cancelado.

| ID      | Requerimiento                      | Actor                             | Descripción y validaciones                                                                                                                                                                     | Prioridad |
| ------- | ---------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| RF-2.01 | Registrar proyecto                 | Coordinador de unidad             | Captura nombre, responsable, unidad, justificación, objetivo general, área de DIGEU, programa, línea de acción y tipo de proyecto. Todos obligatorios. Queda en estado Registrado.             | Alta      |
| RF-2.02 | Formular objetivos y beneficiarios | Coordinador de unidad             | Registra objetivos específicos (mínimo uno) y beneficiarios por tipo, cantidad estimada y descripción. El estado pasa a En formulación.                                                        | Alta      |
| RF-2.03 | Definir cronograma                 | Coordinador de unidad             | Tareas o hitos con fecha inicio, fecha fin y responsable. Las fechas deben quedar dentro del período del proyecto. Permite marcar actividades planificadas para crearlas luego en el Módulo 1. | Alta      |
| RF-2.04 | Definir presupuesto                | Coordinador de unidad             | Renglones con descripción, cantidad, costo unitario y fuente de financiamiento. El sistema calcula subtotales y total. Montos en quetzales (Q), mayores que cero.                              | Alta      |
| RF-2.05 | Definir indicadores y metas        | Coordinador de unidad             | Indicador del catálogo, línea base, meta y unidad de medida. Exige al menos un indicador para enviar a revisión.                                                                               | Alta      |
| RF-2.06 | Enviar a revisión y aprobar        | Coordinador, Validador, Dirección | El coordinador envía; el validador revisa y la Dirección aprueba, observa (con comentario) o rechaza (con motivo). Solo proyectos con formulación completa pueden enviarse.                    | Alta      |
| RF-2.07 | Registrar avances                  | Coordinador de unidad             | Fecha, porcentaje de avance (0–100, no menor que el anterior), descripción y evidencias. Solo en proyectos En ejecución.                                                                       | Alta      |
| RF-2.08 | Registrar recursos ejecutados      | Coordinador de unidad             | Recursos humanos (incluye artistas y deportistas del Módulo 4), materiales y financieros, con cantidad y costo. El gasto se compara contra el presupuesto.                                     | Media     |
| RF-2.09 | Vincular actividades               | Coordinador de unidad             | Asocia actividades del Módulo 1; sus participantes, beneficiarios, resultados e indicadores se suman automáticamente al proyecto.                                                              | Media     |
| RF-2.10 | Tablero de seguimiento             | Coordinador, Dirección            | Muestra avance físico (cronograma), avance financiero (ejecutado contra planificado) e indicadores (alcanzado contra meta).                                                                    | Media     |
| RF-2.11 | Cerrar proyecto                    | Coordinador de unidad             | Registra resultados finales, productos, evidencias, valor final por indicador y lecciones aprendidas. Exige avance de 100 % o justificación del cierre anticipado.                             | Alta      |
| RF-2.12 | Generar informe de proyecto        | Coordinador, Dirección            | Informe consolidado en PDF y Word con datos generales, formulación, ejecución, indicadores y cierre.                                                                                           | Alta      |
| RF-2.13 | Consultar histórico                | Usuarios internos                 | Lista de proyectos con filtros por estado, unidad, área, programa, año y responsable, y acceso a la ficha completa.                                                                            | Media     |

**Reglas de negocio**

- **RN-2.01** Un proyecto aprobado no cambia su formulación; los cambios requieren una nueva revisión.
- **RN-2.02** Solo se ejecutan proyectos aprobados.
- **RN-2.03** Un proyecto cerrado es de solo lectura.

## 4. Módulo 3 — Gestión de Espacios

El módulo administra las sedes y espacios de la DIGEU, el catálogo público, las solicitudes de uso y el calendario de ocupación. Sedes iniciales: Paraninfo, MUSAC, Casa Flavio Herrera, Colegio Santo Tomás e Instalaciones Zona 14.

**Estados de la solicitud:** Pendiente → Aprobada o Rechazada; Pendiente o Aprobada → Cancelada. En el calendario: Ocupado (aprobada), Pendiente de confirmación y Disponible.

| ID      | Requerimiento                | Actor                                | Descripción y validaciones                                                                                                                                                                                                                                                                    | Prioridad |
| ------- | ---------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| RF-3.01 | Gestionar sedes              | Administrador de espacios            | Crear, editar y desactivar sedes con nombre y dirección. No se desactiva una sede con reservas futuras aprobadas.                                                                                                                                                                             | Alta      |
| RF-3.02 | Gestionar espacios           | Administrador de espacios            | Crear, editar y desactivar espacios con sede, nombre, tipo, ubicación, capacidad (entero mayor que cero), características, equipamiento, condiciones de uso, fotografías, estado y visibilidad pública.                                                                                       | Alta      |
| RF-3.03 | Catálogo público de espacios | Público                              | Muestra, sin iniciar sesión, los espacios activos y visibles con ubicación, capacidad, características, equipamiento, condiciones de uso y fotos. Filtros por sede, tipo y capacidad. No muestra disponibilidad.                                                                              | Alta      |
| RF-3.04 | Solicitar espacio            | Público, Coordinador de unidad       | Formulario con espacio, fecha, hora inicio y fin, solicitante (nombre, institución, correo, teléfono), propósito, asistentes estimados y requerimientos de equipo. Valida correo, fecha futura y que los asistentes no superen la capacidad. Genera un número de solicitud y queda Pendiente. | Alta      |
| RF-3.05 | Resolver solicitud           | Administrador de espacios            | Aprobar bloquea el horario; rechazar exige motivo. Antes de aprobar, el sistema vuelve a verificar traslapes.                                                                                                                                                                                 | Alta      |
| RF-3.06 | Control de traslapes         | Sistema                              | Impide dos reservas aprobadas del mismo espacio con horarios que se crucen. Las solicitudes pendientes en el mismo horario se marcan como en conflicto.                                                                                                                                       | Alta      |
| RF-3.07 | Calendario de ocupación      | Usuarios internos                    | Filas por sede y espacio, columnas por día. Vistas día, semana y mes; botones anterior, siguiente y hoy; filtros por sede, tipo de espacio y estado. Al pulsar una celda muestra el detalle de la reserva.                                                                                    | Alta      |
| RF-3.08 | Reserva desde actividad      | Sistema                              | Al validar una actividad con espacio del catálogo se crea su reserva aprobada vinculada; al reprogramarla o cancelarla, la reserva se actualiza o libera.                                                                                                                                     | Alta      |
| RF-3.09 | Historial de uso             | Administrador de espacios            | Por espacio: fechas, actividades o solicitantes, asistentes y observaciones, con filtro por período.                                                                                                                                                                                          | Media     |
| RF-3.10 | Reportes de utilización      | Administrador de espacios, Dirección | Tasa de ocupación por espacio, sede y período; espacios más y menos usados; solicitudes por estado.                                                                                                                                                                                           | Media     |
| RF-3.11 | Notificar al solicitante     | Sistema                              | Envía correo al recibir la solicitud y al aprobarla o rechazarla, con el número de solicitud.                                                                                                                                                                                                 | Media     |
| RF-3.12 | Bloquear por mantenimiento   | Administrador de espacios            | Marca un espacio en mantenimiento para un rango de fechas; en ese rango no se aceptan solicitudes ni reservas.                                                                                                                                                                                | Baja      |

**Reglas de negocio**

- **RN-3.01** La disponibilidad solo es visible para usuarios internos.
- **RN-3.02** Tasa de ocupación = horas reservadas ÷ horas hábiles del espacio en el período.
- **RN-3.03** Pendiente por confirmar: si el formulario público es abierto a cualquier persona o solo a personal de la USAC.

## 5. Módulo 4 — Recurso Humano (Artistas y Deportistas)

El módulo registra a los artistas y deportistas de la DIGEU, controla su estado activo o de baja y calcula su tiempo de permanencia.

| ID      | Requerimiento                      | Actor                    | Descripción y validaciones                                                                                                                                                                                    | Prioridad |
| ------- | ---------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| RF-4.01 | Registrar artista o deportista     | Gestor de recurso humano | Captura tipo (artista o deportista), disciplina, agrupación, nombres, apellidos, nacionalidad, fecha de nacimiento, DPI, pasaporte, fotografía, fecha de alta y biografía opcional. Queda activo por defecto. | Alta      |
| RF-4.02 | Editar registro                    | Gestor de recurso humano | Modifica cualquier dato excepto el historial de períodos. Cada cambio queda en la bitácora.                                                                                                                   | Alta      |
| RF-4.03 | Gestionar fotografía               | Gestor de recurso humano | Carga, previsualiza, reemplaza y elimina la foto. JPG o PNG, máximo 2 MB; se genera una miniatura.                                                                                                            | Media     |
| RF-4.04 | Dar de baja                        | Gestor de recurso humano | Marca como inactivo con fecha de baja obligatoria y motivo opcional. La fecha de baja no puede ser anterior a la de alta ni futura.                                                                           | Alta      |
| RF-4.05 | Reactivar                          | Gestor de recurso humano | Cierra el período anterior en el historial, registra nueva fecha de alta y limpia la fecha de baja.                                                                                                           | Media     |
| RF-4.06 | Calcular tiempo de duración        | Sistema                  | Del alta a la baja si está inactivo, o del alta a hoy si está activo. Se muestra en años, meses y días; también el tiempo total acumulado de todos los períodos.                                              | Alta      |
| RF-4.07 | Listar y buscar                    | Usuarios internos        | Búsqueda por nombre, DPI o pasaporte; filtros por tipo, disciplina, agrupación, nacionalidad y estado. Paginado y ordenable.                                                                                  | Alta      |
| RF-4.08 | Consultar ficha individual         | Usuarios internos        | Foto, datos generales, edad, biografía, estado, tiempo de duración, historial de períodos y actividades y proyectos en que participó.                                                                         | Media     |
| RF-4.09 | Vincular a actividades y proyectos | Coordinador de unidad    | Selecciona personas como participantes de actividades (Módulo 1) o recursos de proyectos (Módulo 2). Solo se vinculan personas activas en la fecha de la actividad.                                           | Media     |
| RF-4.10 | Reportes de recurso humano         | Gestor, Dirección        | Activos e inactivos, por tipo, disciplina, nacionalidad y rango de edad; permanencia promedio; altas y bajas por período.                                                                                     | Media     |
| RF-4.11 | Proteger datos sensibles           | Sistema                  | DPI y pasaporte solo visibles para Administrador y Gestor de recurso humano; para los demás se muestran enmascarados. Cada consulta completa queda en la bitácora.                                            | Alta      |

**Reglas de negocio**

- **RN-4.01** Debe registrarse al menos un documento: DPI o pasaporte.
- **RN-4.02** DPI de 13 dígitos numéricos, único en el sistema; obligatorio para guatemaltecos.
- **RN-4.03** Pasaporte obligatorio para extranjeros sin DPI; único por país emisor.
- **RN-4.04** La fecha de nacimiento no puede ser futura y la fecha de alta no puede ser anterior a ella.
- **RN-4.05** El tiempo de duración se calcula al consultar; no se almacena.
- **RN-4.06** Pendiente por confirmar que "DPO" del requerimiento original corresponde a DPI.

## 6. Requerimientos transversales

Estos requerimientos dan soporte a los cuatro módulos: acceso, seguridad, catálogos, archivos, notificaciones y exportación.

| ID      | Requerimiento               | Actor                  | Descripción y validaciones                                                                                                                                                                                                                                    | Prioridad |
| ------- | --------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| RF-T.01 | Iniciar y cerrar sesión     | Usuarios internos      | Acceso con correo y contraseña. Bloqueo temporal tras 5 intentos fallidos. La sesión expira tras 30 minutos de inactividad.                                                                                                                                   | Alta      |
| RF-T.02 | Recuperar contraseña        | Usuarios internos      | Envío de enlace de un solo uso al correo registrado, válido por 60 minutos. Contraseña mínima de 8 caracteres con letras y números.                                                                                                                           | Alta      |
| RF-T.03 | Gestionar usuarios y roles  | Administrador          | Crear, editar y desactivar usuarios; asignar unidad y uno o varios roles. Un usuario desactivado no puede iniciar sesión.                                                                                                                                     | Alta      |
| RF-T.04 | Gestionar catálogos         | Administrador          | Unidades, áreas, programas, líneas de acción, tipos de actividad y proyecto, indicadores, públicos objetivo, tipos de espacio, equipamiento, disciplinas, agrupaciones, países y fuentes de financiamiento. Los valores en uso se desactivan, no se eliminan. | Alta      |
| RF-T.05 | Bitácora de auditoría       | Sistema, Administrador | Registra usuario, fecha, IP, entidad, acción y valores anteriores y nuevos. Consulta con filtros por usuario, entidad y fecha.                                                                                                                                | Alta      |
| RF-T.06 | Gestionar archivos adjuntos | Usuarios internos      | Imágenes, PDF y documentos de oficina; tamaño máximo configurable (por defecto 10 MB). Previsualización de imágenes y PDF.                                                                                                                                    | Alta      |
| RF-T.07 | Notificaciones              | Sistema                | Internas y por correo para envíos a revisión, observaciones, aprobaciones, rechazos y solicitudes de espacio. Cada usuario ve su bandeja de notificaciones.                                                                                                   | Media     |
| RF-T.08 | Dashboard de inicio         | Usuarios internos      | Actividades del mes por estado, proyectos en ejecución, ocupación de espacios de la semana y recurso humano activo, según el rol.                                                                                                                             | Media     |
| RF-T.09 | Exportar reportes           | Usuarios internos      | Todo listado y reporte se exporta a PDF y Excel con encabezado institucional, filtros aplicados y fecha de generación.                                                                                                                                        | Alta      |

## 7. Casos de uso

El sistema tiene 31 casos de uso agrupados por módulo. Cada uno indica actor, requerimientos que cubre, precondiciones, flujo principal, flujos alternos y postcondición.

### 7.1 Catálogo de casos de uso

| ID    | Caso de uso                        | Actor principal                      | Módulo      |
| ----- | ---------------------------------- | ------------------------------------ | ----------- |
| CU-01 | Iniciar sesión                     | Usuario interno                      | Transversal |
| CU-02 | Recuperar contraseña               | Usuario interno                      | Transversal |
| CU-03 | Gestionar usuarios y roles         | Administrador                        | Transversal |
| CU-04 | Gestionar catálogos                | Administrador                        | Transversal |
| CU-05 | Registrar actividad                | Coordinador de unidad                | 1           |
| CU-06 | Enviar programación a revisión     | Coordinador de unidad                | 1           |
| CU-07 | Validar actividad                  | Validador                            | 1           |
| CU-08 | Consultar Agenda Cultural          | Público, usuario interno             | 1           |
| CU-09 | Reprogramar o cancelar actividad   | Coordinador de unidad                | 1           |
| CU-10 | Cerrar actividad                   | Coordinador de unidad                | 1           |
| CU-11 | Registrar logro no programado      | Coordinador de unidad                | 1           |
| CU-12 | Generar reporte mensual            | Coordinador, Validador, Dirección    | 1           |
| CU-13 | Generar reporte acumulado          | Validador, Dirección                 | 1           |
| CU-14 | Registrar proyecto                 | Coordinador de unidad                | 2           |
| CU-15 | Formular proyecto                  | Coordinador de unidad                | 2           |
| CU-16 | Revisar y aprobar proyecto         | Validador, Dirección                 | 2           |
| CU-17 | Registrar avance y recursos        | Coordinador de unidad                | 2           |
| CU-18 | Vincular actividad a proyecto      | Coordinador de unidad                | 2           |
| CU-19 | Cerrar proyecto                    | Coordinador de unidad                | 2           |
| CU-20 | Generar informe de proyecto        | Coordinador, Dirección               | 2           |
| CU-21 | Consultar histórico de proyectos   | Usuario interno                      | 2           |
| CU-22 | Gestionar sedes y espacios         | Administrador de espacios            | 3           |
| CU-23 | Consultar catálogo público         | Público                              | 3           |
| CU-24 | Solicitar espacio                  | Público, Coordinador                 | 3           |
| CU-25 | Resolver solicitud de espacio      | Administrador de espacios            | 3           |
| CU-26 | Consultar calendario de ocupación  | Usuario interno                      | 3           |
| CU-27 | Generar reporte de utilización     | Administrador de espacios, Dirección | 3           |
| CU-28 | Registrar artista o deportista     | Gestor de recurso humano             | 4           |
| CU-29 | Dar de baja o reactivar            | Gestor de recurso humano             | 4           |
| CU-30 | Consultar y buscar recurso humano  | Usuario interno                      | 4           |
| CU-31 | Generar reportes de recurso humano | Gestor, Dirección                    | 4           |

### 7.2 Transversales

#### CU-01 Iniciar sesión

**Actor:** Usuario interno. **RF:** RF-T.01.

**Precondición:** el usuario existe y está activo.

**Flujo principal**

1. El usuario abre la pantalla de inicio de sesión.
2. Ingresa correo y contraseña.
3. El sistema valida las credenciales y el estado del usuario.
4. El sistema carga los roles y la unidad del usuario y muestra el dashboard.

**Flujos alternos**

- **A1 Credenciales incorrectas:** el sistema muestra un mensaje genérico y suma un intento fallido.
- **A2 Quinto intento fallido:** el sistema bloquea la cuenta 15 minutos y lo notifica por correo.
- **A3 Usuario inactivo:** el sistema niega el acceso.

**Postcondición:** sesión iniciada y registrada en la bitácora.

#### CU-02 Recuperar contraseña

**Actor:** Usuario interno. **RF:** RF-T.02.

**Flujo principal**

1. El usuario elige "Olvidé mi contraseña" e ingresa su correo.
2. El sistema envía un enlace de un solo uso válido por 60 minutos.
3. El usuario abre el enlace y define una nueva contraseña.
4. El sistema valida la política de contraseña, la guarda e invalida el enlace.

**Flujos alternos**

- **A1 Correo no registrado:** el sistema muestra el mismo mensaje de confirmación, sin revelar si el correo existe.
- **A2 Enlace vencido o usado:** el sistema pide iniciar el proceso de nuevo.

**Postcondición:** contraseña actualizada.

#### CU-03 Gestionar usuarios y roles

**Actor:** Administrador. **RF:** RF-T.03, RF-T.05.

**Flujo principal**

1. El administrador abre la lista de usuarios.
2. Crea un usuario con nombre, correo, unidad y roles.
3. El sistema valida que el correo sea único y envía al usuario un enlace para definir su contraseña.
4. El administrador puede editar datos, cambiar roles o desactivar al usuario.

**Flujo alterno**

- **A1 Correo duplicado:** el sistema impide guardar.

**Postcondición:** usuario creado o actualizado y registrado en la bitácora.

#### CU-04 Gestionar catálogos

**Actor:** Administrador. **RF:** RF-T.04.

**Flujo principal**

1. El administrador elige un catálogo.
2. Agrega, edita o desactiva valores.
3. El sistema guarda y deja los valores disponibles en los formularios.

**Flujo alterno**

- **A1 Valor en uso:** el sistema no permite eliminarlo, solo desactivarlo.

**Postcondición:** catálogo actualizado.

### 7.3 Módulo 1 — Actividades, Resultados e Informes

#### CU-05 Registrar actividad

**Actor:** Coordinador de unidad. **RF:** RF-1.01, RF-1.02, RF-1.11, RF-1.14.

**Precondición:** el coordinador inició sesión y tiene unidad asignada.

**Flujo principal**

1. El coordinador abre la programación mensual de su unidad y elige "Nueva actividad".
2. Ingresa los datos de programación: nombre, fecha, hora, lugar y responsable.
3. Ingresa la clasificación: tipo, línea de acción, programa o proyecto, indicadores, público objetivo y bandera de agenda.
4. Si elige un espacio del catálogo, el sistema verifica la disponibilidad.
5. El sistema valida los campos obligatorios y guarda la actividad en Borrador.

**Flujos alternos**

- **A1 Espacio ocupado:** el sistema muestra la reserva en conflicto y pide otro horario o espacio.
- **A2 Lugar externo:** el coordinador escribe el lugar en texto libre y no se valida disponibilidad.
- **A3 Datos incompletos:** el sistema marca los campos faltantes.

**Postcondición:** actividad en Borrador en la programación del mes.

#### CU-06 Enviar programación a revisión

**Actor:** Coordinador de unidad. **RF:** RF-1.03.

**Precondición:** existen actividades en Borrador u Observada.

**Flujo principal**

1. El coordinador selecciona una o varias actividades, o toda la programación del mes.
2. Elige "Enviar a revisión".
3. El sistema valida que cada actividad esté completa, cambia su estado a Enviada y notifica a los validadores.

**Flujo alterno**

- **A1 Actividad incompleta:** el sistema la excluye del envío e indica qué falta.

**Postcondición:** actividades en Enviada.

#### CU-07 Validar actividad

**Actor:** Validador. **RF:** RF-1.04, RF-1.05, RF-3.08.

**Precondición:** hay actividades en Enviada.

**Flujo principal**

1. El validador abre la bandeja de actividades por revisar, filtrada por unidad y mes.
2. Revisa el detalle de la actividad.
3. Elige "Aprobar".
4. El sistema cambia el estado a Validada, crea la reserva del espacio si aplica y notifica al coordinador.
5. Si la actividad tiene bandera de agenda, el sistema la publica en la Agenda Cultural.

**Flujos alternos**

- **A1 Observar:** el validador escribe un comentario; la actividad pasa a Observada y vuelve al coordinador.
- **A2 Rechazar:** el validador escribe el motivo; la actividad pasa a Rechazada.

**Postcondición:** actividad validada, observada o rechazada, con registro en el historial de revisiones.

#### CU-08 Consultar Agenda Cultural

**Actor:** Público, usuario interno. **RF:** RF-1.06.

**Flujo principal**

1. El actor abre la Agenda Cultural.
2. El sistema muestra las actividades publicadas del mes en calendario.
3. El actor cambia de vista (mes, semana, día o lista) y aplica filtros.
4. El actor abre una actividad para ver su detalle.

**Flujo alterno**

- **A1 Sin actividades:** el sistema indica que no hay actividades para el período o filtro.

**Postcondición:** ninguna; consulta de solo lectura.

#### CU-09 Reprogramar o cancelar actividad

**Actor:** Coordinador de unidad. **RF:** RF-1.07, RF-1.11, RF-3.08.

**Precondición:** la actividad está Validada o Publicada en agenda.

**Flujo principal (reprogramar)**

1. El coordinador abre la actividad y elige "Reprogramar".
2. Ingresa la nueva fecha, hora y, si aplica, nuevo espacio, con el motivo.
3. El sistema verifica la disponibilidad, guarda la fecha anterior en el historial y actualiza la reserva y la agenda.
4. El sistema notifica al validador.

**Flujos alternos**

- **A1 Cancelar:** el coordinador elige "Cancelar" e ingresa el motivo; el sistema libera la reserva, retira la actividad de la agenda y notifica.
- **A2 Espacio ocupado en la nueva fecha:** el sistema muestra el conflicto y no guarda.

**Postcondición:** actividad reprogramada o cancelada.

#### CU-10 Cerrar actividad

**Actor:** Coordinador de unidad. **RF:** RF-1.08, RF-1.09, RF-1.14, RF-T.06.

**Precondición:** la actividad está En ejecución o su fecha ya pasó.

**Flujo principal**

1. El coordinador abre la actividad y elige "Cerrar".
2. Registra participantes, incluidos artistas o deportistas del registro de recurso humano.
3. Registra beneficiarios desagregados por sexo, rango de edad y tipo de público.
4. Escribe los resultados y el valor alcanzado de cada indicador.
5. Adjunta evidencias: fotografías, documentos o enlaces.
6. El sistema valida que haya al menos un resultado y el valor de cada indicador, y cambia el estado a Cerrada.
7. Si la actividad está vinculada a un proyecto, el sistema suma sus resultados e indicadores al proyecto.

**Flujos alternos**

- **A1 Faltan datos:** el sistema indica qué falta y no cierra.
- **A2 Guardar avance:** el coordinador guarda lo capturado sin cerrar para completarlo después.

**Postcondición:** actividad cerrada y disponible para los reportes.

#### CU-11 Registrar logro no programado

**Actor:** Coordinador de unidad. **RF:** RF-1.10.

**Flujo principal**

1. El coordinador elige "Registrar logro no programado".
2. Ingresa nombre, fecha, clasificación, resultados, beneficiarios, indicadores y evidencias.
3. El sistema guarda el registro como Cerrado y marcado como no programado.

**Flujo alterno**

- **A1 Datos incompletos:** el sistema marca los campos faltantes.

**Postcondición:** logro incluido en el reporte mensual del mes de su fecha.

#### CU-12 Generar reporte mensual

**Actor:** Coordinador, Validador, Dirección. **RF:** RF-1.12, RF-T.09.

**Flujo principal**

1. El actor elige mes, año y unidad (o consolidado).
2. El sistema reúne las actividades cerradas y los logros no programados del período.
3. El sistema muestra actividades realizadas, logros del mes e indicadores alcanzados.
4. El actor exporta a PDF o Excel.

**Flujos alternos**

- **A1 Coordinador:** solo puede elegir su propia unidad.
- **A2 Sin datos:** el sistema genera el reporte con la indicación de que no hay actividades cerradas.

**Postcondición:** reporte generado.

#### CU-13 Generar reporte acumulado

**Actor:** Validador, Dirección. **RF:** RF-1.13, RF-T.09.

**Flujo principal**

1. El actor elige el tipo de período (trimestral, semestral o anual) y el año.
2. El sistema suma los datos mensuales del período por unidad, tipo de actividad, línea de acción, beneficiarios e indicadores.
3. El actor revisa y exporta a PDF o Excel.

**Postcondición:** reporte acumulado generado.

### 7.4 Módulo 2 — Gestión de Proyectos

#### CU-14 Registrar proyecto

**Actor:** Coordinador de unidad. **RF:** RF-2.01.

**Precondición:** el coordinador inició sesión y tiene unidad asignada.

**Flujo principal**

1. El coordinador elige "Nuevo proyecto".
2. Ingresa datos generales: nombre, responsable, unidad, justificación y objetivo general.
3. Ingresa la clasificación: área de DIGEU, programa, línea de acción y tipo de proyecto.
4. El sistema valida los campos obligatorios y guarda el proyecto como Registrado.

**Flujo alterno**

- **A1 Datos incompletos:** el sistema marca los campos faltantes.

**Postcondición:** proyecto registrado.

#### CU-15 Formular proyecto

**Actor:** Coordinador de unidad. **RF:** RF-2.02, RF-2.03, RF-2.04, RF-2.05.

**Precondición:** el proyecto está Registrado, En formulación u Observado.

**Flujo principal**

1. El coordinador abre la pestaña de formulación.
2. Registra objetivos específicos y beneficiarios.
3. Registra actividades planificadas y el cronograma de tareas con fechas y responsables.
4. Registra los renglones del presupuesto; el sistema calcula subtotales y total.
5. Registra indicadores con línea base, meta y unidad de medida.
6. El sistema guarda y deja el proyecto En formulación.

**Flujos alternos**

- **A1 Fechas fuera del período:** el sistema rechaza la tarea del cronograma.
- **A2 Monto inválido:** el sistema no acepta montos en cero o negativos.

**Postcondición:** formulación guardada.

#### CU-16 Revisar y aprobar proyecto

**Actor:** Coordinador, Validador, Dirección. **RF:** RF-2.06.

**Precondición:** la formulación tiene al menos un objetivo, un indicador y el presupuesto.

**Flujo principal**

1. El coordinador elige "Enviar a revisión"; el sistema valida que la formulación esté completa y pasa el proyecto a En revisión.
2. El validador revisa y lo traslada a Dirección.
3. Dirección aprueba el proyecto.
4. El sistema cambia el estado a Aprobado y notifica al coordinador.

**Flujos alternos**

- **A1 Formulación incompleta:** el sistema impide el envío e indica qué falta.
- **A2 Observar:** el validador o Dirección escribe comentarios; el proyecto pasa a Observado.
- **A3 Rechazar:** Dirección escribe el motivo; el proyecto pasa a Rechazado.

**Postcondición:** proyecto aprobado, observado o rechazado, con historial de revisiones.

#### CU-17 Registrar avance y recursos

**Actor:** Coordinador de unidad. **RF:** RF-2.07, RF-2.08, RF-2.10.

**Precondición:** el proyecto está Aprobado o En ejecución.

**Flujo principal**

1. El coordinador abre la pestaña de ejecución y elige "Registrar avance".
2. Ingresa fecha, porcentaje, descripción y evidencias.
3. Registra los recursos ejecutados: humanos, materiales y financieros.
4. El sistema pasa el proyecto a En ejecución si estaba Aprobado y actualiza el tablero de seguimiento.

**Flujos alternos**

- **A1 Porcentaje menor al anterior:** el sistema no lo acepta.
- **A2 Gasto mayor al presupuesto:** el sistema muestra una alerta y permite guardar con justificación.

**Postcondición:** avance y recursos registrados.

#### CU-18 Vincular actividad a proyecto

**Actor:** Coordinador de unidad. **RF:** RF-1.14, RF-2.09.

**Precondición:** el proyecto está Aprobado o En ejecución y pertenece a la unidad del coordinador.

**Flujo principal**

1. El coordinador abre el proyecto y elige "Vincular actividad", o elige el proyecto al registrar la actividad.
2. El sistema lista las actividades de la unidad sin proyecto.
3. El coordinador selecciona una o varias.
4. El sistema guarda el vínculo; al cerrarse cada actividad, sus resultados e indicadores se suman al proyecto.

**Postcondición:** actividades vinculadas.

#### CU-19 Cerrar proyecto

**Actor:** Coordinador de unidad. **RF:** RF-2.11.

**Precondición:** el proyecto está En ejecución.

**Flujo principal**

1. El coordinador elige "Cerrar proyecto".
2. Registra resultados finales, productos, evidencias, valor final por indicador y lecciones aprendidas.
3. El sistema valida que el avance sea 100 % y cambia el estado a Cerrado.

**Flujo alterno**

- **A1 Avance menor a 100 %:** el sistema exige una justificación de cierre anticipado.

**Postcondición:** proyecto cerrado y de solo lectura.

#### CU-20 Generar informe de proyecto

**Actor:** Coordinador, Dirección. **RF:** RF-2.12, RF-T.09.

**Flujo principal**

1. El actor abre el proyecto y elige "Generar informe".
2. El sistema arma el informe con datos generales, formulación, ejecución, indicadores contra metas y cierre.
3. El actor descarga el informe en PDF o Word.

**Postcondición:** informe generado.

#### CU-21 Consultar histórico de proyectos

**Actor:** Usuario interno. **RF:** RF-2.13.

**Flujo principal**

1. El actor abre la lista de proyectos.
2. Aplica filtros por estado, unidad, área, programa, año o responsable.
3. Abre la ficha completa de un proyecto.

**Postcondición:** ninguna; consulta de solo lectura.

### 7.5 Módulo 3 — Gestión de Espacios

#### CU-22 Gestionar sedes y espacios

**Actor:** Administrador de espacios. **RF:** RF-3.01, RF-3.02, RF-3.12.

**Flujo principal**

1. El administrador abre la lista de sedes y elige una o crea una nueva.
2. Crea o edita un espacio con tipo, ubicación, capacidad, características, equipamiento, condiciones de uso, fotos, estado y visibilidad pública.
3. El sistema valida los datos y guarda.

**Flujos alternos**

- **A1 Desactivar con reservas futuras:** el sistema impide desactivar y lista las reservas afectadas.
- **A2 Mantenimiento:** el administrador define un rango de fechas; el sistema bloquea solicitudes y reservas en ese rango.

**Postcondición:** sede o espacio actualizado.

#### CU-23 Consultar catálogo público

**Actor:** Público. **RF:** RF-3.03.

**Flujo principal**

1. La persona abre el catálogo sin iniciar sesión.
2. Filtra por sede, tipo de espacio o capacidad.
3. Abre la ficha del espacio con fotos, ubicación, capacidad, equipamiento y condiciones de uso.
4. Desde la ficha puede elegir "Solicitar este espacio" (CU-24).

**Postcondición:** ninguna. La ficha no muestra disponibilidad.

#### CU-24 Solicitar espacio

**Actor:** Público, Coordinador de unidad. **RF:** RF-3.04, RF-3.11.

**Flujo principal**

1. El solicitante abre el formulario desde el catálogo.
2. Ingresa fecha, horario, datos de contacto, propósito, asistentes y requerimientos de equipo.
3. El sistema valida los datos, registra la solicitud como Pendiente y genera un número de solicitud.
4. El sistema envía al solicitante un correo de confirmación y notifica al administrador de espacios.

**Flujos alternos**

- **A1 Asistentes mayores que la capacidad:** el sistema no permite enviar.
- **A2 Espacio en mantenimiento:** el sistema indica que el espacio no recibe solicitudes en esas fechas.

**Postcondición:** solicitud Pendiente, visible en el calendario como pendiente de confirmación.

#### CU-25 Resolver solicitud de espacio

**Actor:** Administrador de espacios. **RF:** RF-3.05, RF-3.06, RF-3.11.

**Precondición:** hay solicitudes Pendientes.

**Flujo principal**

1. El administrador abre la bandeja de solicitudes.
2. Revisa el detalle; el sistema marca las solicitudes en conflicto con otras.
3. Elige "Aprobar".
4. El sistema verifica de nuevo que no haya traslape, cambia la solicitud a Aprobada, bloquea el horario y envía correo al solicitante.

**Flujos alternos**

- **A1 Rechazar:** el administrador escribe el motivo; el sistema envía correo al solicitante.
- **A2 Traslape:** el sistema impide aprobar y muestra la reserva existente.

**Postcondición:** solicitud resuelta y calendario actualizado.

#### CU-26 Consultar calendario de ocupación

**Actor:** Usuario interno. **RF:** RF-3.07, RF-3.09.

**Flujo principal**

1. El actor abre el calendario general de ocupación.
2. El sistema muestra filas por sede y espacio y columnas por día del mes actual, con estado Ocupado, Pendiente o Disponible.
3. El actor cambia de vista, navega entre períodos y filtra por sede, tipo o estado.
4. El actor abre una celda para ver la reserva o el historial de uso del espacio.

**Postcondición:** ninguna; consulta de solo lectura.

#### CU-27 Generar reporte de utilización

**Actor:** Administrador de espacios, Dirección. **RF:** RF-3.10, RF-T.09.

**Flujo principal**

1. El actor elige período, sede y espacio.
2. El sistema calcula la tasa de ocupación, los espacios más y menos usados y las solicitudes por estado.
3. El actor exporta a PDF o Excel.

**Postcondición:** reporte generado.

### 7.6 Módulo 4 — Recurso Humano

#### CU-28 Registrar artista o deportista

**Actor:** Gestor de recurso humano. **RF:** RF-4.01, RF-4.02, RF-4.03.

**Flujo principal**

1. El gestor elige "Nuevo registro".
2. Selecciona tipo (artista o deportista), disciplina y agrupación.
3. Ingresa nombres, apellidos, nacionalidad, fecha de nacimiento, DPI o pasaporte, fecha de alta y biografía opcional.
4. Carga la fotografía.
5. El sistema valida documento, fechas y unicidad, y guarda el registro como activo.

**Flujos alternos**

- **A1 Sin documento:** el sistema exige DPI o pasaporte.
- **A2 DPI inválido o duplicado:** el sistema rechaza el dato e indica el registro existente si está duplicado.
- **A3 Foto no válida:** formato distinto de JPG o PNG, o mayor a 2 MB; el sistema la rechaza.

**Postcondición:** persona registrada y activa.

#### CU-29 Dar de baja o reactivar

**Actor:** Gestor de recurso humano. **RF:** RF-4.04, RF-4.05, RF-4.06.

**Flujo principal (baja)**

1. El gestor abre la ficha de una persona activa y elige "Dar de baja".
2. Ingresa la fecha de baja y el motivo opcional.
3. El sistema valida la fecha, marca a la persona como inactiva y calcula el tiempo de duración del período.

**Flujos alternos**

- **A1 Reactivar:** en una persona inactiva, el gestor elige "Reactivar" e ingresa nueva fecha de alta; el sistema guarda el período anterior en el historial y la marca activa.
- **A2 Fecha inválida:** fecha de baja anterior al alta o futura; el sistema la rechaza.

**Postcondición:** estado actualizado e historial de períodos al día.

#### CU-30 Consultar y buscar recurso humano

**Actor:** Usuario interno. **RF:** RF-4.06, RF-4.07, RF-4.08, RF-4.11.

**Flujo principal**

1. El actor abre la lista de artistas y deportistas.
2. Busca por nombre, DPI o pasaporte y aplica filtros.
3. Abre una ficha: foto, datos, edad, biografía, estado, tiempo de duración, historial y participaciones.

**Flujo alterno**

- **A1 Sin permiso de datos sensibles:** el sistema muestra DPI y pasaporte enmascarados.

**Postcondición:** consulta registrada en la bitácora cuando se muestran documentos completos.

#### CU-31 Generar reportes de recurso humano

**Actor:** Gestor de recurso humano, Dirección. **RF:** RF-4.10, RF-T.09.

**Flujo principal**

1. El actor elige el tipo de reporte y los filtros.
2. El sistema calcula activos e inactivos, distribución por tipo, disciplina, nacionalidad y rango de edad, permanencia promedio y altas y bajas del período.
3. El actor exporta a PDF o Excel.

**Postcondición:** reporte generado.

## 8. Matriz de trazabilidad

Los 59 requerimientos funcionales quedan cubiertos por al menos un caso de uso.

| Requerimiento                              | Casos de uso                                   |
| ------------------------------------------ | ---------------------------------------------- |
| RF-1.01 Registrar actividad                | CU-05                                          |
| RF-1.02 Editar y eliminar borrador         | CU-05                                          |
| RF-1.03 Enviar a revisión                  | CU-06                                          |
| RF-1.04 Validar, observar o rechazar       | CU-07                                          |
| RF-1.05 Publicar en Agenda Cultural        | CU-07                                          |
| RF-1.06 Consultar Agenda Cultural          | CU-08                                          |
| RF-1.07 Reprogramar o cancelar             | CU-09                                          |
| RF-1.08 Iniciar ejecución                  | CU-10                                          |
| RF-1.09 Cerrar actividad                   | CU-10                                          |
| RF-1.10 Logro no programado                | CU-11                                          |
| RF-1.11 Validar disponibilidad del espacio | CU-05, CU-09                                   |
| RF-1.12 Reporte mensual                    | CU-12                                          |
| RF-1.13 Reportes acumulados                | CU-13                                          |
| RF-1.14 Vincular actividad con proyecto    | CU-05, CU-10, CU-18                            |
| RF-2.01 Registrar proyecto                 | CU-14                                          |
| RF-2.02 Objetivos y beneficiarios          | CU-15                                          |
| RF-2.03 Cronograma                         | CU-15                                          |
| RF-2.04 Presupuesto                        | CU-15                                          |
| RF-2.05 Indicadores y metas                | CU-15                                          |
| RF-2.06 Revisión y aprobación              | CU-16                                          |
| RF-2.07 Avances                            | CU-17                                          |
| RF-2.08 Recursos ejecutados                | CU-17                                          |
| RF-2.09 Vincular actividades               | CU-18                                          |
| RF-2.10 Tablero de seguimiento             | CU-17                                          |
| RF-2.11 Cerrar proyecto                    | CU-19                                          |
| RF-2.12 Informe de proyecto                | CU-20                                          |
| RF-2.13 Histórico                          | CU-21                                          |
| RF-3.01 Gestionar sedes                    | CU-22                                          |
| RF-3.02 Gestionar espacios                 | CU-22                                          |
| RF-3.03 Catálogo público                   | CU-23                                          |
| RF-3.04 Solicitar espacio                  | CU-24                                          |
| RF-3.05 Resolver solicitud                 | CU-25                                          |
| RF-3.06 Control de traslapes               | CU-25                                          |
| RF-3.07 Calendario de ocupación            | CU-26                                          |
| RF-3.08 Reserva desde actividad            | CU-07, CU-09                                   |
| RF-3.09 Historial de uso                   | CU-26                                          |
| RF-3.10 Reportes de utilización            | CU-27                                          |
| RF-3.11 Notificar al solicitante           | CU-24, CU-25                                   |
| RF-3.12 Bloqueo por mantenimiento          | CU-22                                          |
| RF-4.01 Registrar persona                  | CU-28                                          |
| RF-4.02 Editar registro                    | CU-28                                          |
| RF-4.03 Fotografía                         | CU-28                                          |
| RF-4.04 Dar de baja                        | CU-29                                          |
| RF-4.05 Reactivar                          | CU-29                                          |
| RF-4.06 Tiempo de duración                 | CU-29, CU-30                                   |
| RF-4.07 Listar y buscar                    | CU-30                                          |
| RF-4.08 Ficha individual                   | CU-30                                          |
| RF-4.09 Vincular a actividades y proyectos | CU-10, CU-17                                   |
| RF-4.10 Reportes de recurso humano         | CU-31                                          |
| RF-4.11 Datos sensibles                    | CU-30                                          |
| RF-T.01 Iniciar sesión                     | CU-01                                          |
| RF-T.02 Recuperar contraseña               | CU-02                                          |
| RF-T.03 Usuarios y roles                   | CU-03                                          |
| RF-T.04 Catálogos                          | CU-04                                          |
| RF-T.05 Bitácora de auditoría              | CU-03, CU-30 (y todos los que modifican datos) |
| RF-T.06 Archivos adjuntos                  | CU-10, CU-17, CU-22, CU-28                     |
| RF-T.07 Notificaciones                     | CU-06, CU-07, CU-16, CU-24, CU-25              |
| RF-T.08 Dashboard                          | CU-01                                          |
| RF-T.09 Exportar reportes                  | CU-12, CU-13, CU-20, CU-27, CU-31              |
