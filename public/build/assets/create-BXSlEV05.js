import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { r, rt as i, tt as a } from './app-Bu9EFUG6.js';
import { n as o, t as s } from './formulario-actividad-CgSNZeUs.js';
var c = e(),
    l = t();
function u(e) {
    let t = (0, c.c)(5),
        { opciones: i } = e,
        a;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, l.jsx)(n, { title: `Nueva actividad` })), (t[0] = a))
        : (a = t[0]);
    let u;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, l.jsx)(r, {
              title: `Nueva actividad`,
              description: `Queda en borrador hasta que la envíe a revisión`,
          })),
          (t[1] = u))
        : (u = t[1]);
    let d;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = o.store.form()), (t[2] = d))
        : (d = t[2]);
    let f;
    return (
        t[3] === i
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
                                  opciones: i,
                                  textoBoton: `Guardar borrador`,
                              }),
                          ],
                      }),
                  ],
              })),
              (t[3] = i),
              (t[4] = f)),
        f
    );
}
u.layout = {
    breadcrumbs: [
        { title: `Actividades`, href: i() },
        { title: `Nueva actividad`, href: a() },
    ],
};
export { u as default };
