import { Head } from '@inertiajs/react';

import ProyectoController from '@/actions/App/Http/Controllers/Proyectos/ProyectoController';
import Heading from '@/components/heading';
import { FormularioProyecto } from '@/components/proyectos/formulario-proyecto';
import { create, index } from '@/routes/proyectos';
import type { OpcionesProyectos } from './tipos';

export default function CrearProyecto({
    opciones,
}: {
    opciones: OpcionesProyectos;
}) {
    return (
        <>
            <Head title="Nuevo proyecto" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Nuevo proyecto"
                    description="Registre los datos generales; después continúa la formulación"
                />

                <FormularioProyecto
                    accion={ProyectoController.store.form()}
                    opciones={opciones}
                    textoBoton="Registrar proyecto"
                />
            </div>
        </>
    );
}

CrearProyecto.layout = {
    breadcrumbs: [
        { title: 'Proyectos', href: index() },
        { title: 'Nuevo proyecto', href: create() },
    ],
};
