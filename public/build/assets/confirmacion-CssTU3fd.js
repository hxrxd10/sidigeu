import { c as e, d as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { t as a } from './circle-check-CQR1GVzd.js';
import { N as o } from './app-Bu9EFUG6.js';
var s = e(),
    c = n();
function l(e) {
    let n = (0, s.c)(8),
        { numero: l } = e,
        u;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, c.jsx)(r, { title: `Solicitud enviada` })), (n[0] = u))
        : (u = n[0]);
    let d, f;
    n[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = (0, c.jsx)(a, {
              className: `mx-auto size-12 text-digeu-green`,
          })),
          (f = (0, c.jsx)(`h1`, {
              className: `text-2xl font-semibold`,
              children: `Solicitud enviada`,
          })),
          (n[1] = d),
          (n[2] = f))
        : ((d = n[1]), (f = n[2]));
    let p;
    n[3] === l
        ? (p = n[4])
        : ((p = (0, c.jsxs)(`p`, {
              className: `text-muted-foreground`,
              children: [
                  `Su solicitud quedó registrada con el número`,
                  ` `,
                  (0, c.jsxs)(`span`, {
                      className: `font-medium text-foreground`,
                      children: [`#`, l],
                  }),
                  ` `,
                  `y está pendiente de confirmación. La Dirección revisará la disponibilidad del espacio y le responderá al correo que indicó.`,
              ],
          })),
          (n[3] = l),
          (n[4] = p));
    let m;
    n[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((m = (0, c.jsx)(i, {
              asChild: !0,
              children: (0, c.jsx)(t, {
                  href: o(),
                  children: `Volver al catálogo`,
              }),
          })),
          (n[5] = m))
        : (m = n[5]);
    let h;
    return (
        n[6] === p
            ? (h = n[7])
            : ((h = (0, c.jsxs)(c.Fragment, {
                  children: [
                      u,
                      (0, c.jsxs)(`div`, {
                          className: `mx-auto max-w-xl space-y-4 py-12 text-center`,
                          children: [d, f, p, m],
                      }),
                  ],
              })),
              (n[6] = p),
              (n[7] = h)),
        h
    );
}
export { l as default };
