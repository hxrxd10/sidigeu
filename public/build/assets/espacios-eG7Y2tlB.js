import {
    c as e,
    d as t,
    g as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as o } from './arrow-right-BItnT0Ub.js';
import { a as s, i as c, n as l, r as u, t as d } from './select-hxeu1kQ_.js';
import { t as f } from './map-pin-CJV5dcon.js';
import {
    Dt as p,
    M as m,
    N as h,
    P as g,
    Tt as _,
    f as v,
} from './app-Bu9EFUG6.js';
import { n as y, t as b } from './card-Bc3dRGP7.js';
import { t as x } from './label-D0AQUEbO.js';
var S = e(),
    C = r(),
    w = `todos`;
function T(e) {
    let t = (0, S.c)(50),
        { espacios: r, filtros: a, opciones: o } = e,
        f;
    t[0] === a
        ? (f = t[1])
        : ((f = (e) => {
              n.get(
                  h().url,
                  { ...a, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = a),
          (t[1] = f));
    let p = f,
        m;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((m = (0, C.jsx)(i, { title: `Catálogo de espacios` })), (t[2] = m))
        : (m = t[2]);
    let g;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, C.jsxs)(`header`, {
              className: `space-y-2`,
              children: [
                  (0, C.jsx)(`h1`, {
                      className: `text-3xl font-semibold`,
                      children: `Espacios de la DIGEU`,
                  }),
                  (0, C.jsx)(`p`, {
                      className: `max-w-2xl text-muted-foreground`,
                      children: `Consulte las características de cada espacio. Para conocer la disponibilidad y reservarlo, envíe una solicitud: la Dirección le responderá por correo.`,
                  }),
              ],
          })),
          (t[3] = g))
        : (g = t[3]);
    let v;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, C.jsx)(x, { htmlFor: `sede`, children: `Sede` })),
          (t[4] = v))
        : (v = t[4]);
    let y = a.sede_id ? String(a.sede_id) : w,
        b;
    t[5] === p
        ? (b = t[6])
        : ((b = (e) => p({ sede_id: e === w ? null : Number(e) })),
          (t[5] = p),
          (t[6] = b));
    let T;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = (0, C.jsx)(c, {
              id: `sede`,
              children: (0, C.jsx)(s, { placeholder: `Todas las sedes` }),
          })),
          (t[7] = T))
        : (T = t[7]);
    let A;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, C.jsx)(u, { value: w, children: `Todas las sedes` })),
          (t[8] = A))
        : (A = t[8]);
    let j;
    t[9] === o.sedes
        ? (j = t[10])
        : ((j = o.sedes.map(k)), (t[9] = o.sedes), (t[10] = j));
    let M;
    t[11] === j
        ? (M = t[12])
        : ((M = (0, C.jsxs)(l, { children: [A, j] })),
          (t[11] = j),
          (t[12] = M));
    let N;
    t[13] !== M || t[14] !== y || t[15] !== b
        ? ((N = (0, C.jsxs)(`div`, {
              className: `grid gap-2`,
              children: [
                  v,
                  (0, C.jsxs)(d, {
                      value: y,
                      onValueChange: b,
                      children: [T, M],
                  }),
              ],
          })),
          (t[13] = M),
          (t[14] = y),
          (t[15] = b),
          (t[16] = N))
        : (N = t[16]);
    let P;
    t[17] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((P = (0, C.jsx)(x, {
              htmlFor: `tipo`,
              children: `Tipo de espacio`,
          })),
          (t[17] = P))
        : (P = t[17]);
    let F = a.tipo_espacio_id ? String(a.tipo_espacio_id) : w,
        I;
    t[18] === p
        ? (I = t[19])
        : ((I = (e) => p({ tipo_espacio_id: e === w ? null : Number(e) })),
          (t[18] = p),
          (t[19] = I));
    let L;
    t[20] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((L = (0, C.jsx)(c, {
              id: `tipo`,
              children: (0, C.jsx)(s, { placeholder: `Todos los tipos` }),
          })),
          (t[20] = L))
        : (L = t[20]);
    let R;
    t[21] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((R = (0, C.jsx)(u, { value: w, children: `Todos los tipos` })),
          (t[21] = R))
        : (R = t[21]);
    let z;
    t[22] === o.tipos
        ? (z = t[23])
        : ((z = o.tipos.map(O)), (t[22] = o.tipos), (t[23] = z));
    let B;
    t[24] === z
        ? (B = t[25])
        : ((B = (0, C.jsxs)(l, { children: [R, z] })),
          (t[24] = z),
          (t[25] = B));
    let V;
    t[26] !== F || t[27] !== I || t[28] !== B
        ? ((V = (0, C.jsxs)(`div`, {
              className: `grid gap-2`,
              children: [
                  P,
                  (0, C.jsxs)(d, {
                      value: F,
                      onValueChange: I,
                      children: [L, B],
                  }),
              ],
          })),
          (t[26] = F),
          (t[27] = I),
          (t[28] = B),
          (t[29] = V))
        : (V = t[29]);
    let H;
    t[30] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((H = (0, C.jsx)(x, {
              htmlFor: `capacidad`,
              children: `Capacidad mínima`,
          })),
          (t[30] = H))
        : (H = t[30]);
    let U = a.capacidad ?? ``,
        W;
    t[31] === p
        ? (W = t[32])
        : ((W = (e) =>
              p({ capacidad: e.target.value ? Number(e.target.value) : null })),
          (t[31] = p),
          (t[32] = W));
    let G;
    t[33] !== U || t[34] !== W
        ? ((G = (0, C.jsxs)(`form`, {
              className: `grid gap-2`,
              onSubmit: D,
              children: [
                  H,
                  (0, C.jsx)(_, {
                      id: `capacidad`,
                      type: `number`,
                      min: 1,
                      defaultValue: U,
                      placeholder: `Personas`,
                      onBlur: W,
                  }),
              ],
          })),
          (t[33] = U),
          (t[34] = W),
          (t[35] = G))
        : (G = t[35]);
    let K;
    t[36] !== N || t[37] !== V || t[38] !== G
        ? ((K = (0, C.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-3`,
              children: [N, V, G],
          })),
          (t[36] = N),
          (t[37] = V),
          (t[38] = G),
          (t[39] = K))
        : (K = t[39]);
    let q;
    t[40] === r ? (q = t[41]) : ((q = r.map(E)), (t[40] = r), (t[41] = q));
    let J;
    t[42] === q
        ? (J = t[43])
        : ((J = (0, C.jsx)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,
              children: q,
          })),
          (t[42] = q),
          (t[43] = J));
    let Y;
    t[44] === r.length
        ? (Y = t[45])
        : ((Y =
              r.length === 0 &&
              (0, C.jsx)(`p`, {
                  className: `rounded-xl border py-12 text-center text-muted-foreground`,
                  children: `No hay espacios que coincidan con los filtros.`,
              })),
          (t[44] = r.length),
          (t[45] = Y));
    let X;
    return (
        t[46] !== K || t[47] !== J || t[48] !== Y
            ? ((X = (0, C.jsxs)(C.Fragment, {
                  children: [
                      m,
                      (0, C.jsxs)(`div`, {
                          className: `space-y-8`,
                          children: [g, K, J, Y],
                      }),
                  ],
              })),
              (t[46] = K),
              (t[47] = J),
              (t[48] = Y),
              (t[49] = X))
            : (X = t[49]),
        X
    );
}
function E(e) {
    return (0, C.jsxs)(
        b,
        {
            className: `overflow-hidden py-0`,
            children: [
                e.fotografias[0]
                    ? (0, C.jsx)(`img`, {
                          src: e.fotografias[0],
                          alt: e.nombre,
                          className: `h-40 w-full object-cover`,
                      })
                    : (0, C.jsx)(`div`, {
                          className: `flex h-40 w-full items-center justify-center bg-secondary text-secondary-foreground`,
                          children: (0, C.jsx)(f, {
                              className: `size-8 opacity-40`,
                          }),
                      }),
                (0, C.jsxs)(y, {
                    className: `space-y-3 py-5`,
                    children: [
                        (0, C.jsxs)(`div`, {
                            className: `flex items-start justify-between gap-2`,
                            children: [
                                (0, C.jsxs)(`div`, {
                                    children: [
                                        (0, C.jsx)(`h2`, {
                                            className: `font-semibold`,
                                            children: e.nombre,
                                        }),
                                        (0, C.jsx)(`p`, {
                                            className: `text-sm text-muted-foreground`,
                                            children: e.sede,
                                        }),
                                    ],
                                }),
                                (0, C.jsx)(v, {
                                    variant: `outline`,
                                    children: e.tipo,
                                }),
                            ],
                        }),
                        e.capacidad &&
                            (0, C.jsxs)(`p`, {
                                className: `flex items-center gap-2 text-sm text-muted-foreground`,
                                children: [
                                    (0, C.jsx)(p, { className: `size-4` }),
                                    `Hasta `,
                                    e.capacidad,
                                    ` personas`,
                                ],
                            }),
                        e.en_mantenimiento &&
                            (0, C.jsx)(v, {
                                variant: `secondary`,
                                children: `En mantenimiento`,
                            }),
                        (0, C.jsxs)(`div`, {
                            className: `flex gap-2 pt-1`,
                            children: [
                                (0, C.jsx)(a, {
                                    variant: `outline`,
                                    size: `sm`,
                                    asChild: !0,
                                    children: (0, C.jsxs)(t, {
                                        href: g(e.id),
                                        children: [
                                            `Ver detalle`,
                                            (0, C.jsx)(o, {}),
                                        ],
                                    }),
                                }),
                                !e.en_mantenimiento &&
                                    (0, C.jsx)(a, {
                                        size: `sm`,
                                        asChild: !0,
                                        children: (0, C.jsx)(t, {
                                            href: m({
                                                query: { espacio_id: e.id },
                                            }),
                                            children: `Solicitar`,
                                        }),
                                    }),
                            ],
                        }),
                    ],
                }),
            ],
        },
        e.id,
    );
}
function D(e) {
    return e.preventDefault();
}
function O(e) {
    return (0, C.jsx)(
        u,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function k(e) {
    return (0, C.jsx)(
        u,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
export { T as default };
