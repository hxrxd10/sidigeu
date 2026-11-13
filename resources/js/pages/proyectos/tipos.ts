export type Opcion = { valor: number; nombre: string };

export type OpcionesProyectos = {
    unidades: Opcion[];
    areas: Opcion[];
    programas: Opcion[];
    lineas: Opcion[];
    tipos: Opcion[];
    responsables: Opcion[];
    estados: { valor: string; nombre: string }[];
};

export type ProyectoFila = {
    id: number;
    nombre: string;
    unidad: string;
    unidad_id: number;
    responsable: string | null;
    tipo: string | null;
    programa_nombre: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    estado: string;
    estado_nombre: string;
    actividades_count: number;
};

export type ProyectoFicha = ProyectoFila & {
    justificacion: string | null;
    objetivo_general: string | null;
    area: string | null;
    programa: string | null;
    linea_accion: string | null;
    motivo_estado: string | null;
    resultados: string | null;
    productos: string | null;
    lecciones_aprendidas: string | null;
    fecha_cierre: string | null;
    objetivos: string[];
    beneficiarios: {
        tipo: string;
        cantidad: number;
        descripcion: string | null;
    }[];
    cronograma: {
        id: number;
        tarea: string;
        fecha_inicio: string | null;
        fecha_fin: string | null;
        responsable: string | null;
        avance: number;
    }[];
    presupuesto: {
        id: number;
        descripcion: string;
        cantidad: number;
        costo_unitario: number;
        subtotal: number;
        ejecutado: number;
        fuente: string | null;
    }[];
    indicadores: {
        id: number;
        nombre: string;
        unidad_medida: string;
        linea_base: number | null;
        meta: number | null;
        valor_final: number | null;
        aporte_actividades: number;
    }[];
    avances: {
        id: number;
        fecha: string;
        porcentaje: number;
        descripcion: string;
        usuario: string | null;
        evidencias: {
            id: number;
            nombre: string | null;
            enlace: string | null;
        }[];
    }[];
    recursos: {
        id: number;
        tipo: string;
        descripcion: string | null;
        cantidad: number;
        costo: number;
    }[];
    actividades: {
        id: number;
        nombre: string;
        fecha: string;
        estado: string;
        estado_nombre: string;
    }[];
    evidencias: { id: number; nombre: string | null; enlace: string | null }[];
    revisiones: {
        id: number;
        accion: string;
        comentario: string | null;
        usuario: string | null;
        fecha: string | null;
    }[];
    seguimiento: {
        avance_fisico: number;
        presupuesto_total: number;
        presupuesto_ejecutado: number;
        avance_financiero: number;
        actividades_cerradas: number;
        beneficiarios_actividades: number;
    };
};

export type ProyectoFormulario = {
    id: number;
    nombre: string;
    responsable_id: number | null;
    area_id: number | null;
    programa_id: number | null;
    linea_accion_id: number | null;
    tipo_proyecto_id: number | null;
    justificacion: string | null;
    objetivo_general: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
};

export type PermisosProyecto = {
    editar: boolean;
    enviar: boolean;
    aprobar: boolean;
    gestionar: boolean;
};
