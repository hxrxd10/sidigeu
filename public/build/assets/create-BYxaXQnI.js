import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { B as r, R as i, r as a } from './app-Bu9EFUG6.js';
import { t as o } from './EspacioController-f5zlN1ju.js';
import { t as s } from './formulario-espacio-BeWj1QRy.js';
var c = e(),
    l = t();
function u(e) {
    let t = (0, c.c)(5),
        { opciones: r } = e,
        i;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((i = (0, l.jsx)(n, { title: `Nuevo espacio` })), (t[0] = i))
        : (i = t[0]);
    let u;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, l.jsx)(a, {
              title: `Nuevo espacio`,
              description: `Registre el espacio, su equipamiento y sus condiciones de uso`,
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
                      i,
                      (0, l.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [
                              u,
                              (0, l.jsx)(s, {
                                  accion: d,
                                  opciones: r,
                                  textoBoton: `Guardar espacio`,
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
        { title: `Espacios`, href: r() },
        { title: `Nuevo espacio`, href: i() },
    ],
};
export { u as default };
