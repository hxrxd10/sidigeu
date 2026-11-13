import { Head } from '@inertiajs/react';

import {
    CargaMasiva,
    type ColumnaCarga,
    type RevisionCarga,
} from '@/components/carga-masiva';
import * as cargaMasiva from '@/routes/recurso-humano/carga-masiva';
import { index } from '@/routes/recurso-humano';

type Props = {
    columnas: ColumnaCarga[];
    instrucciones: string[];
    listas: Record<string, string[]>;
    revision?: RevisionCarga | null;
};

export default function CargaMasivaDelPadron({
    columnas,
    instrucciones,
    listas,
    revision = null,
}: Props) {
    return (
        <>
            <Head title="Carga masiva del padrón" />

            <div className="px-4 py-6">
                <CargaMasiva
                    titulo="Carga masiva del padrón"
                    descripcion="Agregue muchos artistas y deportistas de una sola vez desde una hoja de cálculo."
                    columnas={columnas}
                    instrucciones={instrucciones}
                    listas={listas}
                    plantilla={cargaMasiva.plantilla().url}
                    plantillaCsv={cargaMasiva.plantillaCsv().url}
                    revision={revision}
                    accionRevision={cargaMasiva.revision.form()}
                    accionConfirmar={cargaMasiva.store.form()}
                    volver={{ href: index().url, etiqueta: 'Volver al padrón' }}
                />
            </div>
        </>
    );
}

CargaMasivaDelPadron.layout = {
    breadcrumbs: [
        { title: 'Recurso humano', href: index() },
        { title: 'Carga masiva', href: cargaMasiva.create() },
    ],
};
