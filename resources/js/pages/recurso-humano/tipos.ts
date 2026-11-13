export type Permanencia = {
    anios: number;
    meses: number;
    dias: number;
    dias_totales: number;
    texto: string;
};

export type PersonaFila = {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_completo: string;
    tipo: string;
    tipo_nombre: string;
    disciplina: string | null;
    agrupacion: string | null;
    pais: string | null;
    edad: number;
    activo: boolean;
    permanencia: Permanencia;
    foto_url: string | null;
    dpi: string | null;
    pasaporte: string | null;
    documento_oculto: boolean;
};

export type PeriodoPermanencia = {
    id: number;
    fecha_alta: string;
    fecha_baja: string | null;
    motivo_baja: string | null;
    dias: number;
};

export type PersonaFicha = PersonaFila & {
    biografia: string | null;
    fecha_nacimiento: string;
    fecha_alta: string;
    fecha_baja: string | null;
    motivo_baja: string | null;
    permanencia_total: Permanencia;
    periodos: PeriodoPermanencia[];
};

export type PersonaFormulario = {
    id: number;
    tipo: string;
    disciplina_id: number;
    agrupacion_id: number | null;
    nombres: string;
    apellidos: string;
    pais_id: number;
    fecha_nacimiento: string;
    dpi: string | null;
    pasaporte: string | null;
    fecha_alta: string;
    biografia: string | null;
    foto_url: string | null;
    nombre_completo: string;
};

export type OpcionesRecursoHumano = {
    tipos: { valor: string; nombre: string }[];
    disciplinas: { valor: number; nombre: string; tipo: string }[];
    agrupaciones: { valor: number; nombre: string }[];
    paises: { valor: number; nombre: string; codigo: string }[];
};
