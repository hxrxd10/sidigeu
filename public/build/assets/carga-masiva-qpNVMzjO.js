import { s as e, u as t } from './wayfinder-C8dNLrFV.js';
import { t as n } from './carga-masiva-DoBPWo-v.js';
import {
    C as r,
    E as i,
    S as a,
    T as o,
    w as s,
    y as c,
} from './app-Bu9EFUG6.js';
var l = e();
function u({ columnas: e, instrucciones: a, listas: u, revision: d = null }) {
    return (0, l.jsxs)(l.Fragment, {
        children: [
            (0, l.jsx)(t, { title: `Carga masiva del padrón` }),
            (0, l.jsx)(`div`, {
                className: `px-4 py-6`,
                children: (0, l.jsx)(n, {
                    titulo: `Carga masiva del padrón`,
                    descripcion: `Agregue muchos artistas y deportistas de una sola vez desde una hoja de cálculo.`,
                    columnas: e,
                    instrucciones: a,
                    listas: u,
                    plantilla: r().url,
                    plantillaCsv: s().url,
                    revision: d,
                    accionRevision: o.form(),
                    accionConfirmar: i.form(),
                    volver: { href: c().url, etiqueta: `Volver al padrón` },
                }),
            }),
        ],
    });
}
u.layout = {
    breadcrumbs: [
        { title: `Recurso humano`, href: c() },
        { title: `Carga masiva`, href: a() },
    ],
};
export { u as default };
