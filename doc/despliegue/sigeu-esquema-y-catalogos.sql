-- Esquema y catálogos oficiales del SIGEU (DIGEU - USAC)
-- Generado el 13-11-2026 desde la base de desarrollo.
--
-- Cómo usarlo en Hostinger:
--   1. Cree la base de datos y el usuario desde el panel de Hostinger.
--   2. Entre a phpMyAdmin, elija esa base y use la pestaña «Importar».
--   3. Suba este archivo. No incluye CREATE DATABASE: importa sobre la
--      base que usted haya elegido.
--   4. Después importe «sigeu-administrador.sql» para crear la cuenta
--      con la que entrará la primera vez.
--
-- Trae: el esquema completo (51 tablas), los catálogos
-- oficiales (países, disciplinas, sedes, espacios, tipos de actividad,
-- líneas de acción, indicadores y demás) y la tabla de migraciones ya
-- marcada, para que Laravel no intente volver a correrlas.
--
-- No trae: usuarios, unidades, actividades, proyectos, el padrón, las
-- solicitudes ni la bitácora. Todo eso se carga desde el sistema.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

-- --------------------------------------------------------------------
-- Tabla: actividad_beneficiarios
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividad_beneficiarios`;
CREATE TABLE `actividad_beneficiarios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `actividad_id` bigint unsigned NOT NULL,
  `sexo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rango_edad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_publico` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `actividad_beneficiarios_actividad_id_index` (`actividad_id`),
  CONSTRAINT `actividad_beneficiarios_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: actividad_indicador
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividad_indicador`;
CREATE TABLE `actividad_indicador` (
  `actividad_id` bigint unsigned NOT NULL,
  `indicador_id` bigint unsigned NOT NULL,
  `valor_meta` decimal(12,2) DEFAULT NULL,
  `valor_alcanzado` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`actividad_id`,`indicador_id`),
  KEY `actividad_indicador_indicador_id_foreign` (`indicador_id`),
  CONSTRAINT `actividad_indicador_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `actividad_indicador_indicador_id_foreign` FOREIGN KEY (`indicador_id`) REFERENCES `indicadores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: actividad_participantes
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividad_participantes`;
CREATE TABLE `actividad_participantes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `actividad_id` bigint unsigned NOT NULL,
  `persona_recurso_humano_id` bigint unsigned DEFAULT NULL,
  `nombre_externo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rol` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `participantes_persona_foreign` (`persona_recurso_humano_id`),
  KEY `actividad_participantes_actividad_id_index` (`actividad_id`),
  CONSTRAINT `actividad_participantes_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participantes_persona_foreign` FOREIGN KEY (`persona_recurso_humano_id`) REFERENCES `personas_recurso_humano` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: actividad_publico_objetivo
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividad_publico_objetivo`;
CREATE TABLE `actividad_publico_objetivo` (
  `actividad_id` bigint unsigned NOT NULL,
  `publico_objetivo_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`actividad_id`,`publico_objetivo_id`),
  KEY `actividad_publico_objetivo_publico_objetivo_id_foreign` (`publico_objetivo_id`),
  CONSTRAINT `actividad_publico_objetivo_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `actividad_publico_objetivo_publico_objetivo_id_foreign` FOREIGN KEY (`publico_objetivo_id`) REFERENCES `publicos_objetivo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: actividad_reprogramaciones
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividad_reprogramaciones`;
CREATE TABLE `actividad_reprogramaciones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `actividad_id` bigint unsigned NOT NULL,
  `fecha_anterior` date NOT NULL,
  `fecha_nueva` date NOT NULL,
  `motivo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actividad_reprogramaciones_actividad_id_foreign` (`actividad_id`),
  KEY `actividad_reprogramaciones_user_id_foreign` (`user_id`),
  CONSTRAINT `actividad_reprogramaciones_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `actividad_reprogramaciones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: actividad_revisiones
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividad_revisiones`;
CREATE TABLE `actividad_revisiones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `actividad_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `accion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comentario` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actividad_revisiones_user_id_foreign` (`user_id`),
  KEY `actividad_revisiones_actividad_id_created_at_index` (`actividad_id`,`created_at`),
  CONSTRAINT `actividad_revisiones_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `actividad_revisiones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: actividades
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `actividades`;
CREATE TABLE `actividades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidad_id` bigint unsigned NOT NULL,
  `responsable_id` bigint unsigned DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `espacio_id` bigint unsigned DEFAULT NULL,
  `lugar_externo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_actividad_id` bigint unsigned NOT NULL,
  `linea_accion_id` bigint unsigned NOT NULL,
  `proyecto_id` bigint unsigned DEFAULT NULL,
  `publicar_agenda` tinyint(1) NOT NULL DEFAULT '0',
  `es_logro_no_programado` tinyint(1) NOT NULL DEFAULT '0',
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'borrador',
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `resultados` text COLLATE utf8mb4_unicode_ci,
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  `motivo_cancelacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_cierre` timestamp NULL DEFAULT NULL,
  `creado_por` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actividades_responsable_id_foreign` (`responsable_id`),
  KEY `actividades_espacio_id_foreign` (`espacio_id`),
  KEY `actividades_tipo_actividad_id_foreign` (`tipo_actividad_id`),
  KEY `actividades_linea_accion_id_foreign` (`linea_accion_id`),
  KEY `actividades_creado_por_foreign` (`creado_por`),
  KEY `actividades_unidad_id_fecha_index` (`unidad_id`,`fecha`),
  KEY `actividades_estado_fecha_index` (`estado`,`fecha`),
  KEY `actividades_publicar_agenda_fecha_index` (`publicar_agenda`,`fecha`),
  KEY `actividades_proyecto_id_foreign` (`proyecto_id`),
  CONSTRAINT `actividades_creado_por_foreign` FOREIGN KEY (`creado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `actividades_espacio_id_foreign` FOREIGN KEY (`espacio_id`) REFERENCES `espacios` (`id`) ON DELETE SET NULL,
  CONSTRAINT `actividades_linea_accion_id_foreign` FOREIGN KEY (`linea_accion_id`) REFERENCES `lineas_accion` (`id`),
  CONSTRAINT `actividades_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE SET NULL,
  CONSTRAINT `actividades_responsable_id_foreign` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `actividades_tipo_actividad_id_foreign` FOREIGN KEY (`tipo_actividad_id`) REFERENCES `tipos_actividad` (`id`),
  CONSTRAINT `actividades_unidad_id_foreign` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: agrupaciones
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `agrupaciones`;
CREATE TABLE `agrupaciones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `agrupaciones_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: areas
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `areas`;
CREATE TABLE `areas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `areas_nombre_unique` (`nombre`),
  UNIQUE KEY `areas_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `areas` (`id`, `nombre`, `slug`, `descripcion`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Formación y actualización', 'formacion', 'Formación y actualización de estudiantes, docentes y personal administrativo.', '1', '2026-11-11 20:05:18', '2026-11-11 20:05:18', NULL),
('2', 'Cultura', 'cultura', 'Manifestaciones artísticas y culturales de la Universidad.', '1', '2026-11-11 20:05:18', '2026-11-11 20:05:18', NULL),
('3', 'Deporte', 'deporte', 'Actividades y selecciones deportivas universitarias.', '1', '2026-11-11 20:05:18', '2026-11-11 20:05:18', NULL),
('4', 'Vinculación con la sociedad', 'vinculacion', 'Proyección popular y vínculo de la Universidad con la sociedad.', '1', '2026-11-11 20:05:18', '2026-11-11 20:05:18', NULL),
('5', 'Interdisciplinariedad', 'interdisciplinariedad', 'Actividades interdisciplinarias entre unidades académicas y administrativas.', '1', '2026-11-11 20:05:18', '2026-11-11 20:05:18', NULL);

-- --------------------------------------------------------------------
-- Tabla: auditorias
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `auditorias`;
CREATE TABLE `auditorias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `auditable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_id` bigint unsigned NOT NULL,
  `accion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valores_antes` json DEFAULT NULL,
  `valores_despues` json DEFAULT NULL,
  `ip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `auditorias_user_id_foreign` (`user_id`),
  KEY `auditorias_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`),
  KEY `auditorias_accion_created_at_index` (`accion`,`created_at`),
  CONSTRAINT `auditorias_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: cache
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: cache_locks
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: disciplinas
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `disciplinas`;
CREATE TABLE `disciplinas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `disciplinas_nombre_tipo_unique` (`nombre`,`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `disciplinas` (`id`, `nombre`, `tipo`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Música', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('2', 'Canto', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('3', 'Marimba', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('4', 'Danza', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('5', 'Danza folklórica', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('6', 'Teatro', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('7', 'Artes plásticas', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('8', 'Literatura', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('9', 'Fotografía', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('10', 'Cine y audiovisuales', 'artista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('11', 'Fútbol', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('12', 'Baloncesto', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('13', 'Voleibol', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('14', 'Atletismo', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('15', 'Natación', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('16', 'Ajedrez', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('17', 'Tae Kwon Do', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('18', 'Tenis de mesa', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('19', 'Levantamiento de pesas', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('20', 'Ciclismo', 'deportista', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('21', 'Tempore', 'artista', '1', '2026-11-12 06:47:51', '2026-11-12 06:47:51', NULL),
('22', 'Rerum', 'artista', '1', '2026-11-12 06:47:51', '2026-11-12 06:47:51', NULL),
('23', 'Repellendus', 'deportista', '1', '2026-11-12 06:47:51', '2026-11-12 06:47:51', NULL);

-- --------------------------------------------------------------------
-- Tabla: equipamientos
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `equipamientos`;
CREATE TABLE `equipamientos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `equipamientos_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `equipamientos` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Sonido', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('2', 'Proyector', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('3', 'Pantalla', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('4', 'Iluminación', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('5', 'Micrófonos', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('6', 'Sillas', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('7', 'Mesas', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('8', 'Aire acondicionado', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('9', 'Graderío', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('10', 'Vestidores', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL);

-- --------------------------------------------------------------------
-- Tabla: espacio_equipamiento
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `espacio_equipamiento`;
CREATE TABLE `espacio_equipamiento` (
  `espacio_id` bigint unsigned NOT NULL,
  `equipamiento_id` bigint unsigned NOT NULL,
  `cantidad` int unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`espacio_id`,`equipamiento_id`),
  KEY `espacio_equipamiento_equipamiento_id_foreign` (`equipamiento_id`),
  CONSTRAINT `espacio_equipamiento_equipamiento_id_foreign` FOREIGN KEY (`equipamiento_id`) REFERENCES `equipamientos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `espacio_equipamiento_espacio_id_foreign` FOREIGN KEY (`espacio_id`) REFERENCES `espacios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: espacio_fotografias
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `espacio_fotografias`;
CREATE TABLE `espacio_fotografias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `espacio_id` bigint unsigned NOT NULL,
  `ruta` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orden` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `espacio_fotografias_espacio_id_foreign` (`espacio_id`),
  CONSTRAINT `espacio_fotografias_espacio_id_foreign` FOREIGN KEY (`espacio_id`) REFERENCES `espacios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: espacios
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `espacios`;
CREATE TABLE `espacios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sede_id` bigint unsigned NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_espacio_id` bigint unsigned NOT NULL,
  `ubicacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacidad` int unsigned DEFAULT NULL,
  `caracteristicas` text COLLATE utf8mb4_unicode_ci,
  `condiciones_uso` text COLLATE utf8mb4_unicode_ci,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activo',
  `visible_publico` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `espacios_sede_id_nombre_unique` (`sede_id`,`nombre`),
  KEY `espacios_tipo_espacio_id_foreign` (`tipo_espacio_id`),
  KEY `espacios_estado_visible_publico_index` (`estado`,`visible_publico`),
  CONSTRAINT `espacios_sede_id_foreign` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`),
  CONSTRAINT `espacios_tipo_espacio_id_foreign` FOREIGN KEY (`tipo_espacio_id`) REFERENCES `tipos_espacio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `espacios` (`id`, `sede_id`, `nombre`, `tipo_espacio_id`, `ubicacion`, `capacidad`, `caracteristicas`, `condiciones_uso`, `estado`, `visible_publico`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', '1', 'Salón Mayor', '1', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('2', '1', 'Cátedra I', '1', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('3', '1', 'Cátedra II', '1', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('4', '1', 'Salón de Ensayos', '5', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('5', '1', 'Sala TAU', '5', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('6', '2', 'Salón Mayor', '1', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('7', '2', 'Patio Central', '3', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('8', '3', 'Auditorio', '2', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('9', '4', 'Salón Mayor', '1', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('10', '4', 'Sala de Música', '5', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('11', '4', 'Patio Central', '3', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('12', '5', 'Fútbol 11', '4', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('13', '5', 'Fútbol 5 – Cancha 1', '4', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('14', '5', 'Fútbol 5 – Cancha 2', '4', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('15', '5', 'Basket techado', '4', NULL, NULL, NULL, NULL, 'activo', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL);

-- --------------------------------------------------------------------
-- Tabla: evidencias
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `evidencias`;
CREATE TABLE `evidencias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `evidenciable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `evidenciable_id` bigint unsigned NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre_original` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evidencias_evidenciable_type_evidenciable_id_index` (`evidenciable_type`,`evidenciable_id`),
  KEY `evidencias_user_id_foreign` (`user_id`),
  CONSTRAINT `evidencias_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: failed_jobs
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: fuentes_financiamiento
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `fuentes_financiamiento`;
CREATE TABLE `fuentes_financiamiento` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fuentes_financiamiento_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `fuentes_financiamiento` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Presupuesto ordinario USAC', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('2', 'Fondos propios de la unidad', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('3', 'Cooperación externa', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('4', 'Donación', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('5', 'Autofinanciable', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL);

-- --------------------------------------------------------------------
-- Tabla: indicadores
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `indicadores`;
CREATE TABLE `indicadores` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidad_medida` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `indicadores_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `indicadores` (`id`, `nombre`, `unidad_medida`, `descripcion`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Actividades realizadas', 'Actividades', NULL, '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('2', 'Personas beneficiadas', 'Personas', NULL, '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('3', 'Participantes en actividades artísticas', 'Personas', NULL, '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('4', 'Participantes en actividades deportivas', 'Personas', NULL, '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('5', 'Horas de formación impartidas', 'Horas', NULL, '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('6', 'Comunidades atendidas', 'Comunidades', NULL, '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL);

-- --------------------------------------------------------------------
-- Tabla: job_batches
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: jobs
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: lineas_accion
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `lineas_accion`;
CREATE TABLE `lineas_accion` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lineas_accion_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `lineas_accion` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Formación y actualización', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('2', 'Difusión cultural', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('3', 'Promoción del deporte', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('4', 'Vinculación con la sociedad', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('5', 'Interdisciplinariedad', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL);

-- --------------------------------------------------------------------
-- Tabla: migrations
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
('1', '0001_01_01_000000_create_users_table', '1'),
('2', '0001_01_01_000001_create_cache_table', '1'),
('3', '0001_01_01_000002_create_jobs_table', '1'),
('4', '2026_11_11_192638_create_areas_table', '1'),
('5', '2026_11_11_192639_create_unidades_table', '1'),
('6', '2026_11_11_192640_create_roles_table', '1'),
('7', '2026_11_11_192641_add_unidad_and_activo_to_users_table', '1'),
('8', '2026_11_11_192642_create_auditorias_table', '1'),
('9', '2026_11_11_192643_create_notifications_table', '1'),
('10', '2026_11_11_200039_create_paises_table', '1'),
('11', '2026_11_11_200040_create_disciplinas_table', '1'),
('12', '2026_11_11_200041_create_agrupaciones_table', '1'),
('13', '2026_11_11_200042_create_personas_recurso_humano_table', '1'),
('14', '2026_11_11_200043_create_persona_recurso_humano_periodos_table', '1'),
('15', '2026_11_11_202836_create_sedes_table', '2'),
('16', '2026_11_11_202837_create_tipos_espacio_table', '2'),
('17', '2026_11_11_202838_create_equipamientos_table', '2'),
('18', '2026_11_11_202839_create_espacios_table', '2'),
('19', '2026_11_11_202840_create_solicitudes_espacio_table', '2'),
('20', '2026_11_12_053324_create_catalogos_actividad_tables', '3'),
('21', '2026_11_12_053325_create_actividades_table', '3'),
('22', '2026_11_12_053326_create_evidencias_table', '3'),
('23', '2026_11_12_053327_add_actividad_id_to_solicitudes_espacio_table', '3'),
('24', '2026_11_12_060953_create_catalogos_proyecto_tables', '4'),
('25', '2026_11_12_060954_create_proyectos_table', '4'),
('26', '2026_11_12_060955_add_proyecto_id_to_actividades_table', '4');

-- --------------------------------------------------------------------
-- Tabla: notifications
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint unsigned NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: paises
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `paises_nombre_unique` (`nombre`),
  UNIQUE KEY `paises_codigo_unique` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `paises` (`id`, `nombre`, `codigo`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Guatemala', 'GT', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('2', 'Argentina', 'AR', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('3', 'Belice', 'BZ', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('4', 'Bolivia', 'BO', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('5', 'Brasil', 'BR', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('6', 'Canadá', 'CA', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('7', 'Chile', 'CL', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('8', 'Colombia', 'CO', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('9', 'Costa Rica', 'CR', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('10', 'Cuba', 'CU', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('11', 'Ecuador', 'EC', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('12', 'El Salvador', 'SV', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('13', 'Estados Unidos', 'US', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('14', 'Haití', 'HT', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('15', 'Honduras', 'HN', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('16', 'Jamaica', 'JM', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('17', 'México', 'MX', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('18', 'Nicaragua', 'NI', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('19', 'Panamá', 'PA', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('20', 'Paraguay', 'PY', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('21', 'Perú', 'PE', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('22', 'Puerto Rico', 'PR', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('23', 'República Dominicana', 'DO', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('24', 'Uruguay', 'UY', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('25', 'Venezuela', 'VE', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('26', 'Alemania', 'DE', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('27', 'Austria', 'AT', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('28', 'Bélgica', 'BE', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('29', 'España', 'ES', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('30', 'Francia', 'FR', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('31', 'Italia', 'IT', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('32', 'Países Bajos', 'NL', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('33', 'Portugal', 'PT', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('34', 'Reino Unido', 'GB', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('35', 'Rusia', 'RU', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('36', 'Suiza', 'CH', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('37', 'China', 'CN', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('38', 'Corea del Sur', 'KR', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('39', 'India', 'IN', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('40', 'Israel', 'IL', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('41', 'Japón', 'JP', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('42', 'Egipto', 'EG', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('43', 'Marruecos', 'MA', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('44', 'Nigeria', 'NG', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('45', 'Sudáfrica', 'ZA', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL),
('46', 'Australia', 'AU', '1', '2026-11-11 20:22:20', '2026-11-11 20:22:20', NULL);

-- --------------------------------------------------------------------
-- Tabla: password_reset_tokens
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: periodos_recurso_humano
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `periodos_recurso_humano`;
CREATE TABLE `periodos_recurso_humano` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `persona_id` bigint unsigned NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `motivo_baja` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `periodos_rh_persona_fecha_index` (`persona_id`,`fecha_alta`),
  CONSTRAINT `periodos_rh_persona_id_foreign` FOREIGN KEY (`persona_id`) REFERENCES `personas_recurso_humano` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: personas_recurso_humano
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `personas_recurso_humano`;
CREATE TABLE `personas_recurso_humano` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disciplina_id` bigint unsigned NOT NULL,
  `agrupacion_id` bigint unsigned DEFAULT NULL,
  `nombres` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pais_id` bigint unsigned NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `dpi` varchar(13) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pasaporte` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_ruta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_alta` date NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_baja` date DEFAULT NULL,
  `motivo_baja` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biografia` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personas_recurso_humano_pais_id_pasaporte_unique` (`pais_id`,`pasaporte`),
  UNIQUE KEY `personas_recurso_humano_dpi_unique` (`dpi`),
  KEY `personas_recurso_humano_disciplina_id_foreign` (`disciplina_id`),
  KEY `personas_recurso_humano_agrupacion_id_foreign` (`agrupacion_id`),
  KEY `personas_recurso_humano_tipo_activo_index` (`tipo`,`activo`),
  KEY `personas_recurso_humano_apellidos_nombres_index` (`apellidos`,`nombres`),
  CONSTRAINT `personas_recurso_humano_agrupacion_id_foreign` FOREIGN KEY (`agrupacion_id`) REFERENCES `agrupaciones` (`id`) ON DELETE SET NULL,
  CONSTRAINT `personas_recurso_humano_disciplina_id_foreign` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`),
  CONSTRAINT `personas_recurso_humano_pais_id_foreign` FOREIGN KEY (`pais_id`) REFERENCES `paises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: programas
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `programas`;
CREATE TABLE `programas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area_id` bigint unsigned DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `programas_nombre_unique` (`nombre`),
  KEY `programas_area_id_foreign` (`area_id`),
  CONSTRAINT `programas_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_avances
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_avances`;
CREATE TABLE `proyecto_avances` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `fecha` date NOT NULL,
  `porcentaje` tinyint unsigned NOT NULL DEFAULT '0',
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_avances_proyecto_id_foreign` (`proyecto_id`),
  KEY `proyecto_avances_user_id_foreign` (`user_id`),
  CONSTRAINT `proyecto_avances_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proyecto_avances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_beneficiarios
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_beneficiarios`;
CREATE TABLE `proyecto_beneficiarios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int unsigned NOT NULL DEFAULT '0',
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_beneficiarios_proyecto_id_foreign` (`proyecto_id`),
  CONSTRAINT `proyecto_beneficiarios_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_indicador
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_indicador`;
CREATE TABLE `proyecto_indicador` (
  `proyecto_id` bigint unsigned NOT NULL,
  `indicador_id` bigint unsigned NOT NULL,
  `linea_base` decimal(12,2) DEFAULT NULL,
  `meta` decimal(12,2) DEFAULT NULL,
  `valor_final` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`proyecto_id`,`indicador_id`),
  KEY `proyecto_indicador_indicador_id_foreign` (`indicador_id`),
  CONSTRAINT `proyecto_indicador_indicador_id_foreign` FOREIGN KEY (`indicador_id`) REFERENCES `indicadores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proyecto_indicador_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_objetivos
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_objetivos`;
CREATE TABLE `proyecto_objetivos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `orden` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `proyecto_objetivos_proyecto_id_foreign` (`proyecto_id`),
  CONSTRAINT `proyecto_objetivos_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_presupuestos
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_presupuestos`;
CREATE TABLE `proyecto_presupuestos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` decimal(12,2) NOT NULL DEFAULT '1.00',
  `costo_unitario` decimal(12,2) NOT NULL DEFAULT '0.00',
  `ejecutado` decimal(12,2) NOT NULL DEFAULT '0.00',
  `fuente_financiamiento_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_presupuestos_proyecto_id_foreign` (`proyecto_id`),
  KEY `presupuestos_fuente_foreign` (`fuente_financiamiento_id`),
  CONSTRAINT `presupuestos_fuente_foreign` FOREIGN KEY (`fuente_financiamiento_id`) REFERENCES `fuentes_financiamiento` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyecto_presupuestos_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_recursos
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_recursos`;
CREATE TABLE `proyecto_recursos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `persona_recurso_humano_id` bigint unsigned DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` decimal(12,2) NOT NULL DEFAULT '1.00',
  `costo` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `proyecto_recursos_proyecto_id_foreign` (`proyecto_id`),
  KEY `recursos_persona_foreign` (`persona_recurso_humano_id`),
  CONSTRAINT `proyecto_recursos_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recursos_persona_foreign` FOREIGN KEY (`persona_recurso_humano_id`) REFERENCES `personas_recurso_humano` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_revisiones
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_revisiones`;
CREATE TABLE `proyecto_revisiones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `accion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comentario` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_revisiones_user_id_foreign` (`user_id`),
  KEY `proyecto_revisiones_proyecto_id_created_at_index` (`proyecto_id`,`created_at`),
  CONSTRAINT `proyecto_revisiones_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proyecto_revisiones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyecto_tareas
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyecto_tareas`;
CREATE TABLE `proyecto_tareas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint unsigned NOT NULL,
  `tarea` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `responsable_id` bigint unsigned DEFAULT NULL,
  `avance` tinyint unsigned NOT NULL DEFAULT '0',
  `orden` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `proyecto_tareas_proyecto_id_foreign` (`proyecto_id`),
  KEY `proyecto_tareas_responsable_id_foreign` (`responsable_id`),
  CONSTRAINT `proyecto_tareas_proyecto_id_foreign` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proyecto_tareas_responsable_id_foreign` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: proyectos
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `proyectos`;
CREATE TABLE `proyectos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidad_id` bigint unsigned NOT NULL,
  `responsable_id` bigint unsigned DEFAULT NULL,
  `area_id` bigint unsigned DEFAULT NULL,
  `programa_id` bigint unsigned DEFAULT NULL,
  `linea_accion_id` bigint unsigned DEFAULT NULL,
  `tipo_proyecto_id` bigint unsigned DEFAULT NULL,
  `justificacion` text COLLATE utf8mb4_unicode_ci,
  `objetivo_general` text COLLATE utf8mb4_unicode_ci,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'registrado',
  `resultados` text COLLATE utf8mb4_unicode_ci,
  `productos` text COLLATE utf8mb4_unicode_ci,
  `lecciones_aprendidas` text COLLATE utf8mb4_unicode_ci,
  `fecha_cierre` timestamp NULL DEFAULT NULL,
  `motivo_estado` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creado_por` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyectos_responsable_id_foreign` (`responsable_id`),
  KEY `proyectos_area_id_foreign` (`area_id`),
  KEY `proyectos_programa_id_foreign` (`programa_id`),
  KEY `proyectos_linea_accion_id_foreign` (`linea_accion_id`),
  KEY `proyectos_tipo_proyecto_id_foreign` (`tipo_proyecto_id`),
  KEY `proyectos_creado_por_foreign` (`creado_por`),
  KEY `proyectos_unidad_id_estado_index` (`unidad_id`,`estado`),
  KEY `proyectos_estado_fecha_inicio_index` (`estado`,`fecha_inicio`),
  CONSTRAINT `proyectos_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyectos_creado_por_foreign` FOREIGN KEY (`creado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyectos_linea_accion_id_foreign` FOREIGN KEY (`linea_accion_id`) REFERENCES `lineas_accion` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyectos_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyectos_responsable_id_foreign` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyectos_tipo_proyecto_id_foreign` FOREIGN KEY (`tipo_proyecto_id`) REFERENCES `tipos_proyecto` (`id`) ON DELETE SET NULL,
  CONSTRAINT `proyectos_unidad_id_foreign` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: publicos_objetivo
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `publicos_objetivo`;
CREATE TABLE `publicos_objetivo` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `publicos_objetivo_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `publicos_objetivo` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Estudiantes universitarios', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('2', 'Docentes', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('3', 'Personal administrativo', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('4', 'Comunidad en general', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('5', 'Niñez y adolescencia', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('6', 'Organizaciones comunitarias', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL);

-- --------------------------------------------------------------------
-- Tabla: role_user
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user` (
  `role_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `role_user_user_id_foreign` (`user_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: roles
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`id`, `slug`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
('1', 'administrador', 'Administrador', 'Gestiona usuarios, roles, catálogos y configuración general.', '2026-11-11 20:05:18', '2026-11-11 20:05:18'),
('2', 'direccion', 'Dirección', 'Consulta global, aprueba proyectos y consulta todos los reportes.', '2026-11-11 20:05:18', '2026-11-11 20:05:18'),
('3', 'validador', 'Validador', 'Revisa y valida actividades y revisa proyectos.', '2026-11-11 20:05:18', '2026-11-11 20:05:18'),
('4', 'coordinador-unidad', 'Coordinador de unidad', 'Registra y gestiona las actividades y proyectos de su unidad.', '2026-11-11 20:05:18', '2026-11-11 20:05:18'),
('5', 'administrador-espacios', 'Administrador de espacios', 'Gestiona sedes, espacios, solicitudes y el calendario de ocupación.', '2026-11-11 20:05:18', '2026-11-11 20:05:18'),
('6', 'gestor-recurso-humano', 'Gestor de recurso humano', 'Gestiona el registro de artistas y deportistas.', '2026-11-11 20:05:18', '2026-11-11 20:05:18'),
('7', 'consulta', 'Consulta', 'Acceso de solo lectura a la información institucional.', '2026-11-11 20:05:18', '2026-11-11 20:05:18');

-- --------------------------------------------------------------------
-- Tabla: sedes
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `sedes`;
CREATE TABLE `sedes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sedes_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sedes` (`id`, `nombre`, `direccion`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Paraninfo', NULL, '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('2', 'MUSAC', NULL, '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('3', 'Casa Flavio Herrera', NULL, '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('4', 'Colegio Santo Tomás', NULL, '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('5', 'Instalaciones Zona 14', NULL, '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL);

-- --------------------------------------------------------------------
-- Tabla: sessions
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: solicitudes_espacio
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `solicitudes_espacio`;
CREATE TABLE `solicitudes_espacio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `espacio_id` bigint unsigned NOT NULL,
  `actividad_id` bigint unsigned DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `solicitante_nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institucion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proposito` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `asistentes` int unsigned DEFAULT NULL,
  `requerimientos` text COLLATE utf8mb4_unicode_ci,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendiente',
  `solicitado_por` bigint unsigned DEFAULT NULL,
  `resuelto_por` bigint unsigned DEFAULT NULL,
  `fecha_resolucion` timestamp NULL DEFAULT NULL,
  `motivo_rechazo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitudes_espacio_solicitado_por_foreign` (`solicitado_por`),
  KEY `solicitudes_espacio_resuelto_por_foreign` (`resuelto_por`),
  KEY `solicitudes_espacio_espacio_id_fecha_estado_index` (`espacio_id`,`fecha`,`estado`),
  KEY `solicitudes_espacio_estado_fecha_index` (`estado`,`fecha`),
  KEY `solicitudes_espacio_actividad_id_foreign` (`actividad_id`),
  CONSTRAINT `solicitudes_espacio_actividad_id_foreign` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE SET NULL,
  CONSTRAINT `solicitudes_espacio_espacio_id_foreign` FOREIGN KEY (`espacio_id`) REFERENCES `espacios` (`id`),
  CONSTRAINT `solicitudes_espacio_resuelto_por_foreign` FOREIGN KEY (`resuelto_por`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `solicitudes_espacio_solicitado_por_foreign` FOREIGN KEY (`solicitado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: tipos_actividad
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `tipos_actividad`;
CREATE TABLE `tipos_actividad` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipos_actividad_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tipos_actividad` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Taller', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('2', 'Conferencia', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('3', 'Conversatorio', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('4', 'Curso', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('5', 'Exposición', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('6', 'Concierto', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('7', 'Presentación artística', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('8', 'Competencia deportiva', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('9', 'Festival', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL),
('10', 'Jornada comunitaria', '1', '2026-11-12 05:36:58', '2026-11-12 05:36:58', NULL);

-- --------------------------------------------------------------------
-- Tabla: tipos_espacio
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `tipos_espacio`;
CREATE TABLE `tipos_espacio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipos_espacio_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tipos_espacio` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Salón', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('2', 'Auditorio', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('3', 'Patio', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('4', 'Cancha', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL),
('5', 'Sala', '1', '2026-11-11 20:31:15', '2026-11-11 20:31:15', NULL);

-- --------------------------------------------------------------------
-- Tabla: tipos_proyecto
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `tipos_proyecto`;
CREATE TABLE `tipos_proyecto` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipos_proyecto_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tipos_proyecto` (`id`, `nombre`, `activo`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1', 'Proyecto cultural', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('2', 'Proyecto deportivo', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('3', 'Proyecto de formación', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('4', 'Proyecto de vinculación comunitaria', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL),
('5', 'Proyecto interdisciplinario', '1', '2026-11-12 06:12:57', '2026-11-12 06:12:57', NULL);

-- --------------------------------------------------------------------
-- Tabla: unidades
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `unidades`;
CREATE TABLE `unidades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area_id` bigint unsigned DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unidades_nombre_unique` (`nombre`),
  KEY `unidades_area_id_foreign` (`area_id`),
  CONSTRAINT `unidades_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Tabla: users
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidad_id` bigint unsigned DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_unidad_id_foreign` (`unidad_id`),
  CONSTRAINT `users_unidad_id_foreign` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
