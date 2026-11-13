export type Rol =
    | 'administrador'
    | 'direccion'
    | 'validador'
    | 'coordinador-unidad'
    | 'administrador-espacios'
    | 'gestor-recurso-humano'
    | 'consulta';

export type Unidad = {
    id: number;
    nombre: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    unidad_id: number | null;
    activo: boolean;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
    roles: Rol[];
    esAdministrador: boolean;
    unidad: Unidad | null;
    notificaciones: number;
};
