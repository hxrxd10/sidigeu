import { c as e, d as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { O as i, jt as a, k as o, r as s } from './app-Bu9EFUG6.js';
import { a as c, i as l, r as u, t as d } from './card-Bc3dRGP7.js';
var f = e(),
    p = n();
function m(e) {
    let t = (0, f.c)(6),
        { catalogos: n } = e,
        i;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((i = (0, p.jsx)(r, { title: `Catálogos` })), (t[0] = i))
        : (i = t[0]);
    let a;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, p.jsx)(s, {
              title: `Catálogos`,
              description: `Valores que alimentan los formularios del sistema`,
          })),
          (t[1] = a))
        : (a = t[1]);
    let o;
    t[2] === n ? (o = t[3]) : ((o = n.map(h)), (t[2] = n), (t[3] = o));
    let c;
    return (
        t[4] === o
            ? (c = t[5])
            : ((c = (0, p.jsxs)(p.Fragment, {
                  children: [
                      i,
                      (0, p.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [
                              a,
                              (0, p.jsx)(`div`, {
                                  className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,
                                  children: o,
                              }),
                          ],
                      }),
                  ],
              })),
              (t[4] = o),
              (t[5] = c)),
        c
    );
}
function h(e) {
    return (0, p.jsx)(
        t,
        {
            href: o(e.clave),
            className: `rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`,
            children: (0, p.jsx)(d, {
                className: `h-full transition-colors hover:border-primary/50`,
                children: (0, p.jsxs)(l, {
                    children: [
                        (0, p.jsxs)(c, {
                            className: `flex items-center justify-between gap-2`,
                            children: [
                                e.etiqueta,
                                (0, p.jsx)(a, {
                                    className: `size-4 text-muted-foreground`,
                                }),
                            ],
                        }),
                        (0, p.jsx)(u, { children: e.descripcion }),
                        (0, p.jsxs)(`p`, {
                            className: `mt-2 text-sm text-muted-foreground`,
                            children: [
                                e.total,
                                ` `,
                                e.total === 1 ? `registro` : `registros`,
                            ],
                        }),
                    ],
                }),
            }),
        },
        e.clave,
    );
}
m.layout = { breadcrumbs: [{ title: `Catálogos`, href: i() }] };
export { m as default };
