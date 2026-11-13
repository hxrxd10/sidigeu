import { Head } from '@inertiajs/react';

import {
    CargaMasiva,
    type ColumnaCarga,
    type RevisionCarga,
} from '@/components/carga-masiva';
import { index } from '@/routes/actividades';
import * as cargaMasiva from '@/routes/actividades/carga-masiva';

type Props = {
    columnas: ColumnaCarga[];
    instrucciones: string[];
    listas: Record<string, string[]>;
    revision?: RevisionCarga | null;
};

export default function CargaMasivaDeActividades({
    columnas,
    instrucciones,
    listas,
    revision = null,
}: Props) {
    return (
        <>
            <Head title="Carga masiva de actividades" />

            <div className="px-4 py-6">
                <CargaMasiva
                    titulo="Carga masiva de actividades"
                    descripcion="Suba la programación de todo un período de una sola vez. Las actividades entran en borrador."
                    columnas={columnas}
                    instrucciones={instrucciones}
                    listas={listas}
                    plantilla={cargaMasiva.plantilla().url}
                    plantillaCsv={cargaMasiva.plantillaCsv().url}
                    revision={revision}
                    accionRevision={cargaMasiva.revision.form()}
                    accionConfirmar={cargaMasiva.store.form()}
                    volver={{
                        href: index().url,
                        etiqueta: 'Volver a actividades',
                    }}
                />
            </div>
        </>
    );
}

CargaMasivaDeActividades.layout = {
    breadcrumbs: [
        { title: 'Actividades', href: index() },
        { title: 'Carga masiva', href: cargaMasiva.create() },
    ],
};
