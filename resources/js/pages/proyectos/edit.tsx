import { Head } from '@inertiajs/react';

import ProyectoController from '@/actions/App/Http/Controllers/Proyectos/ProyectoController';
import Heading from '@/components/heading';
import { FormularioProyecto } from '@/components/proyectos/formulario-proyecto';
import { index } from '@/routes/proyectos';
import type { OpcionesProyectos, ProyectoFormulario } from './tipos';

type Props = {
    proyecto: ProyectoFormulario;
    opciones: OpcionesProyectos;
};

export default function EditarProyecto({ proyecto, opciones }: Props) {
    return (
        <>
            <Head title={`Editar ${proyecto.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={proyecto.nombre}
                    description="Datos generales y clasificación del proyecto"
                />

                <FormularioProyecto
                    accion={ProyectoController.update.form(proyecto.id)}
                    proyecto={proyecto}
                    opciones={opciones}
                    textoBoton="Guardar cambios"
                />
            </div>
        </>
    );
}

EditarProyecto.layout = {
    breadcrumbs: [{ title: 'Proyectos', href: index() }],
};
