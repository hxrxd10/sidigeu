import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { _ as r, r as i, y as a } from './app-Bu9EFUG6.js';
import { t as o } from './PersonaRecursoHumanoController-Bzb79B_s.js';
import { t as s } from './formulario-persona-DLUb85He.js';
var c = e(),
    l = t();
function u(e) {
    let t = (0, c.c)(5),
        { opciones: r } = e,
        a;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, l.jsx)(n, { title: `Nuevo registro` })), (t[0] = a))
        : (a = t[0]);
    let u;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, l.jsx)(i, {
              title: `Nuevo artista o deportista`,
              description: `El registro queda activo desde la fecha de alta que indique`,
          })),
          (t[1] = u))
        : (u = t[1]);
    let d;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = o.store.form()), (t[2] = d))
        : (d = t[2]);
    let f;
    return (
        t[3] === r
            ? (f = t[4])
            : ((f = (0, l.jsxs)(l.Fragment, {
                  children: [
                      a,
                      (0, l.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [
                              u,
                              (0, l.jsx)(s, {
                                  accion: d,
                                  opciones: r,
                                  textoBoton: `Guardar registro`,
                              }),
                          ],
                      }),
                  ],
              })),
              (t[3] = r),
              (t[4] = f)),
        f
    );
}
u.layout = {
    breadcrumbs: [
        { title: `Recurso humano`, href: a() },
        { title: `Nuevo registro`, href: r() },
    ],
};
export { u as default };
