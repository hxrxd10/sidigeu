import { Head } from '@inertiajs/react';

import EspacioController from '@/actions/App/Http/Controllers/Espacios/EspacioController';
import { FormularioEspacio } from '@/components/espacios/formulario-espacio';
import Heading from '@/components/heading';
import { index } from '@/routes/espacios';
import type { EspacioFicha, OpcionesEspacios } from './tipos';

type Props = {
    espacio: EspacioFicha;
    opciones: OpcionesEspacios;
};

export default function EditarEspacio({ espacio, opciones }: Props) {
    return (
        <>
            <Head title={`Editar ${espacio.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={espacio.nombre}
                    description={`${espacio.sede} · ${espacio.tipo}`}
                />

                <FormularioEspacio
                    accion={EspacioController.update.form(espacio.id)}
                    espacio={espacio}
                    opciones={opciones}
                    textoBoton="Guardar cambios"
                />
            </div>
        </>
    );
}

EditarEspacio.layout = {
    breadcrumbs: [{ title: 'Espacios', href: index() }],
};
