import { Head } from '@inertiajs/react';

import ActividadController from '@/actions/App/Http/Controllers/Actividades/ActividadController';
import { FormularioActividad } from '@/components/actividades/formulario-actividad';
import Heading from '@/components/heading';
import { create, index } from '@/routes/actividades';
import type { OpcionesActividades } from './tipos';

export default function CrearActividad({
    opciones,
}: {
    opciones: OpcionesActividades;
}) {
    return (
        <>
            <Head title="Nueva actividad" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Nueva actividad"
                    description="Queda en borrador hasta que la envíe a revisión"
                />

                <FormularioActividad
                    accion={ActividadController.store.form()}
                    opciones={opciones}
                    textoBoton="Guardar borrador"
                />
            </div>
        </>
    );
}

CrearActividad.layout = {
    breadcrumbs: [
        { title: 'Actividades', href: index() },
        { title: 'Nueva actividad', href: create() },
    ],
};
