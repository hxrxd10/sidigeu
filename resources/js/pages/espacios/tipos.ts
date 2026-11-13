export type OpcionNumerica = { valor: number; nombre: string };

export type OpcionesEspacios = {
    sedes: OpcionNumerica[];
    tipos: OpcionNumerica[];
    equipamientos: OpcionNumerica[];
    estados: { valor: string; nombre: string }[];
};

export type EspacioFila = {
    id: number;
    nombre: string;
    sede: string;
    tipo: string;
    capacidad: number | null;
    estado: string;
    estado_nombre: string;
    visible_publico: boolean;
    reservas_aprobadas: number;
};

export type EspacioFicha = {
    id: number;
    nombre: string;
    sede_id: number;
    sede: string;
    direccion_sede: string | null;
    tipo_espacio_id: number;
    tipo: string;
    ubicacion: string | null;
    capacidad: number | null;
    caracteristicas: string | null;
    condiciones_uso: string | null;
    estado: string;
    estado_nombre: string;
    visible_publico: boolean;
    equipamientos: { id: number; nombre: string; cantidad: number }[];
    fotografias: { id: number; url: string }[];
};

export type UsoEspacio = {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    solicitante: string;
    institucion: string | null;
    asistentes: number | null;
    proposito: string;
    estado: string;
    estado_nombre: string;
};

export type SolicitudFila = {
    id: number;
    espacio: string;
    sede: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    solicitante_nombre: string;
    institucion: string | null;
    correo: string;
    telefono: string | null;
    proposito: string;
    asistentes: number | null;
    requerimientos: string | null;
    estado: string;
    estado_nombre: string;
    motivo_rechazo: string | null;
    resuelto_por: string | null;
};

export type ReservaCalendario = {
    id: number;
    espacio_id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    solicitante: string;
    proposito: string;
    estado: string;
    estado_nombre: string;
};
