import { Head } from '@inertiajs/react';

import Heading from '@/components/heading';
import {
    FormularioUsuario,
    type DatosUsuario,
    type Opcion,
} from '@/components/usuarios/formulario-usuario';
import UserController from '@/actions/App/Http/Controllers/Administracion/UserController';
import { index } from '@/routes/usuarios';

type Props = {
    usuario: DatosUsuario & { id: number };
    roles: { valor: string; nombre: string; descripcion: string }[];
    unidades: Opcion[];
    esSuPropioUsuario: boolean;
};

export default function EditarUsuario({
    usuario,
    roles,
    unidades,
    esSuPropioUsuario,
}: Props) {
    return (
        <>
            <Head title={`Editar ${usuario.name}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={usuario.name}
                    description={
                        esSuPropioUsuario
                            ? 'Este es su propio usuario: no puede desactivarlo ni quitarse el rol de Administrador'
                            : 'Actualice los datos, la unidad y los roles del usuario'
                    }
                />

                <FormularioUsuario
                    accion={UserController.update.form(usuario.id)}
                    usuario={usuario}
                    roles={roles}
                    unidades={unidades}
                    textoBoton="Guardar cambios"
                    bloquearEstado={esSuPropioUsuario}
                />
            </div>
        </>
    );
}

EditarUsuario.layout = {
    breadcrumbs: [{ title: 'Usuarios', href: index() }],
};
