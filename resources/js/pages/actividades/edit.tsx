import { Head } from '@inertiajs/react';

import ActividadController from '@/actions/App/Http/Controllers/Actividades/ActividadController';
import { FormularioActividad } from '@/components/actividades/formulario-actividad';
import Heading from '@/components/heading';
import { index } from '@/routes/actividades';
import type { ActividadFormulario, OpcionesActividades } from './tipos';

type Props = {
    actividad: ActividadFormulario;
    opciones: OpcionesActividades;
};

export default function EditarActividad({ actividad, opciones }: Props) {
    return (
        <>
            <Head title={`Editar ${actividad.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={actividad.nombre}
                    description="Corrija los datos de programación y vuelva a enviarla a revisión"
                />

                <FormularioActividad
                    accion={ActividadController.update.form(actividad.id)}
                    actividad={actividad}
                    opciones={opciones}
                    textoBoton="Guardar cambios"
                />
            </div>
        </>
    );
}

EditarActividad.layout = {
    breadcrumbs: [{ title: 'Actividades', href: index() }],
};
