import { Head } from '@inertiajs/react';

import Heading from '@/components/heading';
import {
    FormularioUsuario,
    type Opcion,
} from '@/components/usuarios/formulario-usuario';
import UserController from '@/actions/App/Http/Controllers/Administracion/UserController';
import { create, index } from '@/routes/usuarios';

type Props = {
    roles: { valor: string; nombre: string; descripcion: string }[];
    unidades: Opcion[];
};

export default function CrearUsuario({ roles, unidades }: Props) {
    return (
        <>
            <Head title="Nuevo usuario" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Nuevo usuario"
                    description="Al guardar, la persona recibe por correo un enlace para definir su contraseña"
                />

                <FormularioUsuario
                    accion={UserController.store.form()}
                    roles={roles}
                    unidades={unidades}
                    textoBoton="Crear usuario"
                />
            </div>
        </>
    );
}

CrearUsuario.layout = {
    breadcrumbs: [
        { title: 'Usuarios', href: index() },
        { title: 'Nuevo usuario', href: create() },
    ],
};
