import { c as e, d as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { t as a } from './arrow-left-CWHaM1EE.js';
import { t as o } from './map-pin-CJV5dcon.js';
import { Dt as s, M as c, N as l, f as u } from './app-Bu9EFUG6.js';
import { a as d, i as f, n as p, t as m } from './card-Bc3dRGP7.js';
var h = e(),
    g = n();
function _(e) {
    let n = (0, h.c)(57),
        { espacio: _ } = e,
        y;
    n[0] === _.nombre
        ? (y = n[1])
        : ((y = (0, g.jsx)(r, { title: _.nombre })),
          (n[0] = _.nombre),
          (n[1] = y));
    let b;
    n[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, g.jsx)(i, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, g.jsxs)(t, {
                  href: l(),
                  children: [(0, g.jsx)(a, {}), `Volver al catálogo`],
              }),
          })),
          (n[2] = b))
        : (b = n[2]);
    let x;
    n[3] === _.nombre
        ? (x = n[4])
        : ((x = (0, g.jsx)(`h1`, {
              className: `text-3xl font-semibold`,
              children: _.nombre,
          })),
          (n[3] = _.nombre),
          (n[4] = x));
    let S;
    n[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = (0, g.jsx)(o, { className: `size-4` })), (n[5] = S))
        : (S = n[5]);
    let C = _.direccion ? ` · ${_.direccion}` : ``,
        w;
    n[6] !== _.sede || n[7] !== C
        ? ((w = (0, g.jsxs)(`p`, {
              className: `mt-1 flex items-center gap-2 text-muted-foreground`,
              children: [S, _.sede, C],
          })),
          (n[6] = _.sede),
          (n[7] = C),
          (n[8] = w))
        : (w = n[8]);
    let T;
    n[9] !== x || n[10] !== w
        ? ((T = (0, g.jsxs)(`div`, { children: [x, w] })),
          (n[9] = x),
          (n[10] = w),
          (n[11] = T))
        : (T = n[11]);
    let E;
    n[12] !== _.en_mantenimiento || n[13] !== _.id
        ? ((E = _.en_mantenimiento
              ? (0, g.jsx)(u, {
                    variant: `secondary`,
                    children: `En mantenimiento`,
                })
              : (0, g.jsx)(i, {
                    asChild: !0,
                    children: (0, g.jsx)(t, {
                        href: c({ query: { espacio_id: _.id } }),
                        children: `Solicitar este espacio`,
                    }),
                })),
          (n[12] = _.en_mantenimiento),
          (n[13] = _.id),
          (n[14] = E))
        : (E = n[14]);
    let D;
    n[15] !== T || n[16] !== E
        ? ((D = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [T, E],
          })),
          (n[15] = T),
          (n[16] = E),
          (n[17] = D))
        : (D = n[17]);
    let O;
    n[18] !== _.fotografias || n[19] !== _.nombre
        ? ((O =
              _.fotografias.length > 0 &&
              (0, g.jsx)(`div`, {
                  className: `grid gap-3 sm:grid-cols-3`,
                  children: _.fotografias.map((e) =>
                      (0, g.jsx)(
                          `img`,
                          {
                              src: e,
                              alt: _.nombre,
                              className: `h-48 w-full rounded-lg object-cover`,
                          },
                          e,
                      ),
                  ),
              })),
          (n[18] = _.fotografias),
          (n[19] = _.nombre),
          (n[20] = O))
        : (O = n[20]);
    let k;
    n[21] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((k = (0, g.jsx)(f, {
              children: (0, g.jsx)(d, { children: `Características` }),
          })),
          (n[21] = k))
        : (k = n[21]);
    let A;
    n[22] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, g.jsx)(`dt`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: `Tipo de espacio`,
          })),
          (n[22] = A))
        : (A = n[22]);
    let j;
    n[23] === _.tipo
        ? (j = n[24])
        : ((j = (0, g.jsxs)(`div`, {
              children: [
                  A,
                  (0, g.jsx)(`dd`, { className: `mt-0.5`, children: _.tipo }),
              ],
          })),
          (n[23] = _.tipo),
          (n[24] = j));
    let M;
    n[25] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((M = (0, g.jsx)(`dt`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: `Capacidad`,
          })),
          (n[25] = M))
        : (M = n[25]);
    let N;
    n[26] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((N = (0, g.jsx)(s, { className: `size-4` })), (n[26] = N))
        : (N = n[26]);
    let P = _.capacidad ? `${_.capacidad} personas` : `No indicada`,
        F;
    n[27] === P
        ? (F = n[28])
        : ((F = (0, g.jsxs)(`div`, {
              children: [
                  M,
                  (0, g.jsxs)(`dd`, {
                      className: `mt-0.5 flex items-center gap-2`,
                      children: [N, P],
                  }),
              ],
          })),
          (n[27] = P),
          (n[28] = F));
    let I;
    n[29] === _.ubicacion
        ? (I = n[30])
        : ((I =
              _.ubicacion &&
              (0, g.jsxs)(`div`, {
                  children: [
                      (0, g.jsx)(`dt`, {
                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                          children: `Ubicación`,
                      }),
                      (0, g.jsx)(`dd`, {
                          className: `mt-0.5`,
                          children: _.ubicacion,
                      }),
                  ],
              })),
          (n[29] = _.ubicacion),
          (n[30] = I));
    let L;
    n[31] !== j || n[32] !== F || n[33] !== I
        ? ((L = (0, g.jsxs)(`dl`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [j, F, I],
          })),
          (n[31] = j),
          (n[32] = F),
          (n[33] = I),
          (n[34] = L))
        : (L = n[34]);
    let R;
    n[35] === _.caracteristicas
        ? (R = n[36])
        : ((R =
              _.caracteristicas &&
              (0, g.jsx)(`p`, {
                  className: `whitespace-pre-line`,
                  children: _.caracteristicas,
              })),
          (n[35] = _.caracteristicas),
          (n[36] = R));
    let z;
    n[37] === _.condiciones_uso
        ? (z = n[38])
        : ((z =
              _.condiciones_uso &&
              (0, g.jsxs)(`div`, {
                  children: [
                      (0, g.jsx)(`h2`, {
                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                          children: `Condiciones de uso`,
                      }),
                      (0, g.jsx)(`p`, {
                          className: `mt-1 whitespace-pre-line`,
                          children: _.condiciones_uso,
                      }),
                  ],
              })),
          (n[37] = _.condiciones_uso),
          (n[38] = z));
    let B;
    n[39] !== L || n[40] !== R || n[41] !== z
        ? ((B = (0, g.jsxs)(m, {
              className: `lg:col-span-2`,
              children: [
                  k,
                  (0, g.jsxs)(p, {
                      className: `space-y-4 text-sm`,
                      children: [L, R, z],
                  }),
              ],
          })),
          (n[39] = L),
          (n[40] = R),
          (n[41] = z),
          (n[42] = B))
        : (B = n[42]);
    let V;
    n[43] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = (0, g.jsx)(f, {
              children: (0, g.jsx)(d, { children: `Equipamiento` }),
          })),
          (n[43] = V))
        : (V = n[43]);
    let H;
    n[44] === _.equipamientos
        ? (H = n[45])
        : ((H = (0, g.jsxs)(m, {
              children: [
                  V,
                  (0, g.jsx)(p, {
                      children:
                          _.equipamientos.length === 0
                              ? (0, g.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin equipamiento registrado.`,
                                })
                              : (0, g.jsx)(`ul`, {
                                    className: `space-y-2 text-sm`,
                                    children: _.equipamientos.map(v),
                                }),
                  }),
              ],
          })),
          (n[44] = _.equipamientos),
          (n[45] = H));
    let U;
    n[46] !== B || n[47] !== H
        ? ((U = (0, g.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [B, H],
          })),
          (n[46] = B),
          (n[47] = H),
          (n[48] = U))
        : (U = n[48]);
    let W;
    n[49] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = (0, g.jsx)(`p`, {
              className: `rounded-lg border bg-secondary/40 p-4 text-sm text-muted-foreground`,
              children: `El catálogo no muestra la disponibilidad del espacio. Envíe una solicitud indicando fecha y horario; recibirá la respuesta en su correo.`,
          })),
          (n[49] = W))
        : (W = n[49]);
    let G;
    n[50] !== O || n[51] !== U || n[52] !== D
        ? ((G = (0, g.jsxs)(`div`, {
              className: `space-y-6`,
              children: [b, D, O, U, W],
          })),
          (n[50] = O),
          (n[51] = U),
          (n[52] = D),
          (n[53] = G))
        : (G = n[53]);
    let K;
    return (
        n[54] !== y || n[55] !== G
            ? ((K = (0, g.jsxs)(g.Fragment, { children: [y, G] })),
              (n[54] = y),
              (n[55] = G),
              (n[56] = K))
            : (K = n[56]),
        K
    );
}
function v(e) {
    return (0, g.jsxs)(
        `li`,
        {
            className: `flex items-center justify-between`,
            children: [
                (0, g.jsx)(`span`, { children: e.nombre }),
                (0, g.jsx)(`span`, {
                    className: `text-muted-foreground tabular-nums`,
                    children: e.cantidad,
                }),
            ],
        },
        e.nombre,
    );
}
export { _ as default };
