-- Alta de la primera cuenta de Administrador del SIGEU (DIGEU - USAC)
--
-- Impórtelo DESPUÉS de «sigeu-esquema-y-catalogos.sql», sobre la misma base.
--
-- Antes de importarlo hay que hacer dos cambios en este archivo:
--
--   1. La contraseña. En su equipo, dentro del proyecto, genere el hash de la
--      contraseña que vaya a usar:
--
--          php artisan tinker --execute 'echo Hash::make("la-que-usted-elija");'
--
--      Copie el resultado completo (empieza por $2y$) y reemplace
--      PEGUE_AQUI_EL_HASH, dejando las comillas.
--
--      Si ya corrió «composer install --no-dev», primero ejecute
--      «composer install» para recuperar las herramientas.
--
--   2. El nombre y el correo. Cambie los de abajo por los reales: ese correo
--      es con el que se entra al sistema.
--
-- Si importa el archivo sin reemplazar el hash, la cuenta se crea pero nadie
-- puede entrar con ella, porque la contraseña no coincidirá con nada.
--
-- «email_verified_at» va con la fecha actual a propósito: el sistema exige
-- correo verificado para entrar al panel, y en el primer arranque todavía no
-- hay servidor de correo configurado.

SET NAMES utf8mb4;

INSERT INTO `users`
    (`name`, `email`, `unidad_id`, `activo`, `email_verified_at`, `password`, `created_at`, `updated_at`)
VALUES
    ('Administrador DIGEU', 'admin@digeu.usac.edu.gt', NULL, 1, NOW(), 'PEGUE_AQUI_EL_HASH', NOW(), NOW());

-- El rol 1 es Administrador (vea la tabla «roles» del otro archivo).
INSERT INTO `role_user` (`role_id`, `user_id`)
VALUES (1, LAST_INSERT_ID());
