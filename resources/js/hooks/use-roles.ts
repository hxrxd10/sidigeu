import { usePage } from '@inertiajs/react';

import type { Rol } from '@/types';

/**
 * Roles del usuario autenticado, para mostrar u ocultar opciones de la interfaz.
 * La autorización real siempre se resuelve en el servidor con Gates y Policies.
 */
export function useRoles() {
    const { auth } = usePage().props;

    const roles = auth?.roles ?? [];
    const esAdministrador = auth?.esAdministrador ?? false;

    return {
        roles,
        esAdministrador,
        unidad: auth?.unidad ?? null,
        tieneRol: (...buscados: Rol[]) =>
            esAdministrador || buscados.some((rol) => roles.includes(rol)),
    };
}
