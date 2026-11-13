import { s as e, u as t } from './wayfinder-C8dNLrFV.js';
import { t as n } from './carga-masiva-DoBPWo-v.js';
import {
    dt as r,
    ft as i,
    mt as a,
    pt as o,
    rt as s,
    ut as c,
} from './app-Bu9EFUG6.js';
var l = e();
function u({ columnas: e, instrucciones: c, listas: u, revision: d = null }) {
    return (0, l.jsxs)(l.Fragment, {
        children: [
            (0, l.jsx)(t, { title: `Carga masiva de actividades` }),
            (0, l.jsx)(`div`, {
                className: `px-4 py-6`,
                children: (0, l.jsx)(n, {
                    titulo: `Carga masiva de actividades`,
                    descripcion: `Suba la programación de todo un período de una sola vez. Las actividades entran en borrador.`,
                    columnas: e,
                    instrucciones: c,
                    listas: u,
                    plantilla: r().url,
                    plantillaCsv: i().url,
                    revision: d,
                    accionRevision: o.form(),
                    accionConfirmar: a.form(),
                    volver: { href: s().url, etiqueta: `Volver a actividades` },
                }),
            }),
        ],
    });
}
u.layout = {
    breadcrumbs: [
        { title: `Actividades`, href: s() },
        { title: `Carga masiva`, href: c() },
    ],
};
export { u as default };
