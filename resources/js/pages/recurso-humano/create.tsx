import { Head } from '@inertiajs/react';

import PersonaRecursoHumanoController from '@/actions/App/Http/Controllers/RecursoHumano/PersonaRecursoHumanoController';
import Heading from '@/components/heading';
import { FormularioPersona } from '@/components/recurso-humano/formulario-persona';
import { create, index } from '@/routes/recurso-humano';
import type { OpcionesRecursoHumano } from './tipos';

export default function CrearPersona({
    opciones,
}: {
    opciones: OpcionesRecursoHumano;
}) {
    return (
        <>
            <Head title="Nuevo registro" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Nuevo artista o deportista"
                    description="El registro queda activo desde la fecha de alta que indique"
                />

                <FormularioPersona
                    accion={PersonaRecursoHumanoController.store.form()}
                    opciones={opciones}
                    textoBoton="Guardar registro"
                />
            </div>
        </>
    );
}

CrearPersona.layout = {
    breadcrumbs: [
        { title: 'Recurso humano', href: index() },
        { title: 'Nuevo registro', href: create() },
    ],
};
