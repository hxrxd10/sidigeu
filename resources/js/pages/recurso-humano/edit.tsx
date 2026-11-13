import { Head } from '@inertiajs/react';

import PersonaRecursoHumanoController from '@/actions/App/Http/Controllers/RecursoHumano/PersonaRecursoHumanoController';
import Heading from '@/components/heading';
import { FormularioPersona } from '@/components/recurso-humano/formulario-persona';
import { index } from '@/routes/recurso-humano';
import type { OpcionesRecursoHumano, PersonaFormulario } from './tipos';

type Props = {
    persona: PersonaFormulario;
    opciones: OpcionesRecursoHumano;
};

export default function EditarPersona({ persona, opciones }: Props) {
    return (
        <>
            <Head title={`Editar ${persona.nombre_completo}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={persona.nombre_completo}
                    description="Actualice los datos del registro"
                />

                <FormularioPersona
                    accion={PersonaRecursoHumanoController.update.form(
                        persona.id,
                    )}
                    persona={persona}
                    opciones={opciones}
                    textoBoton="Guardar cambios"
                />
            </div>
        </>
    );
}

EditarPersona.layout = {
    breadcrumbs: [{ title: 'Recurso humano', href: index() }],
};
