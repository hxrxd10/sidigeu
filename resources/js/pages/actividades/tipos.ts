export type OpcionNumerica = { valor: number; nombre: string };

export type OpcionesActividades = {
    unidades: OpcionNumerica[];
    tipos: OpcionNumerica[];
    lineas: OpcionNumerica[];
    publicos: OpcionNumerica[];
    indicadores: (OpcionNumerica & { unidad_medida: string })[];
    espacios: OpcionNumerica[];
    responsables: OpcionNumerica[];
    estados: { valor: string; nombre: string }[];
};

export type ActividadFila = {
    id: number;
    nombre: string;
    unidad: string;
    unidad_id: number;
    fecha: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    lugar: string;
    tipo: string;
    responsable: string | null;
    estado: string;
    estado_nombre: string;
    publicar_agenda: boolean;
    es_logro_no_programado: boolean;
};

export type ActividadFicha = ActividadFila & {
    descripcion: string | null;
    linea_accion: string;
    resultados: string | null;
    observaciones: string | null;
    motivo_cancelacion: string | null;
    fecha_cierre: string | null;
    publicos: string[];
    indicadores: {
        id: number;
        nombre: string;
        unidad_medida: string;
        valor_meta: number | null;
        valor_alcanzado: number | null;
    }[];
    beneficiarios: {
        sexo: string;
        rango_edad: string;
        tipo_publico: string | null;
        cantidad: number;
    }[];
    beneficiarios_total: number;
    participantes: {
        nombre: string;
        rol: string | null;
        del_padron: boolean;
    }[];
    evidencias: {
        id: number;
        tipo: string;
        tipo_nombre: string;
        nombre: string | null;
        enlace: string | null;
    }[];
    revisiones: {
        id: number;
        accion: string;
        comentario: string | null;
        usuario: string | null;
        fecha: string | null;
    }[];
    reprogramaciones: {
        id: number;
        fecha_anterior: string;
        fecha_nueva: string;
        motivo: string | null;
        usuario: string | null;
    }[];
};

export type ActividadFormulario = {
    id: number;
    nombre: string;
    fecha: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    espacio_id: number | null;
    lugar_externo: string | null;
    tipo_actividad_id: number;
    linea_accion_id: number;
    responsable_id: number | null;
    publicar_agenda: boolean;
    descripcion: string | null;
    publicos: number[];
    indicadores: { indicador_id: number; valor_meta: number | null }[];
};

export type PermisosActividad = {
    editar: boolean;
    enviar: boolean;
    validar: boolean;
    gestionar: boolean;
    publicarAgenda: boolean;
    quitarAgenda: boolean;
};
