import { Head } from '@inertiajs/react';

import EspacioController from '@/actions/App/Http/Controllers/Espacios/EspacioController';
import { FormularioEspacio } from '@/components/espacios/formulario-espacio';
import Heading from '@/components/heading';
import { create, index } from '@/routes/espacios';
import type { OpcionesEspacios } from './tipos';

export default function CrearEspacio({
    opciones,
}: {
    opciones: OpcionesEspacios;
}) {
    return (
        <>
            <Head title="Nuevo espacio" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Nuevo espacio"
                    description="Registre el espacio, su equipamiento y sus condiciones de uso"
                />

                <FormularioEspacio
                    accion={EspacioController.store.form()}
                    opciones={opciones}
                    textoBoton="Guardar espacio"
                />
            </div>
        </>
    );
}

CrearEspacio.layout = {
    breadcrumbs: [
        { title: 'Espacios', href: index() },
        { title: 'Nuevo espacio', href: create() },
    ],
};
