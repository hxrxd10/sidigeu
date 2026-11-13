import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    g as r,
    h as i,
    s as a,
    u as o,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { a as c, i as l, n as u, r as d, t as f } from './select-hxeu1kQ_.js';
import { t as p } from './pencil-Bbeg0ISb.js';
import { t as ee } from './plus-B2NIGUck.js';
import { t as m } from './power-BA0PQTGX.js';
import {
    Tt as h,
    f as g,
    g as _,
    h as v,
    m as y,
    p as te,
    r as ne,
} from './app-Bu9EFUG6.js';
import {
    a as re,
    i as b,
    n as ie,
    o as x,
    r as S,
    t as C,
} from './table-D3mJxxJl.js';
import { t as ae } from './paginacion-HQOmOGhf.js';
var oe = t(),
    se = e(i(), 1),
    w = a(),
    T = `todos`;
function E(e) {
    let t = (0, oe.c)(51),
        { usuarios: i, filtros: a, roles: p } = e,
        [m, g] = (0, se.useState)(a.busqueda),
        v;
    t[0] === a
        ? (v = t[1])
        : ((v = (e) => {
              r.get(
                  _().url,
                  { ...a, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = a),
          (t[1] = v));
    let y = v,
        E;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, w.jsx)(o, { title: `Usuarios` })), (t[2] = E))
        : (E = t[2]);
    let O;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (0, w.jsx)(ne, {
              title: `Usuarios`,
              description: `Cuentas del personal de la DIGEU, su unidad y sus roles`,
          })),
          (t[3] = O))
        : (O = t[3]);
    let A;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, w.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [
                  O,
                  (0, w.jsx)(s, {
                      asChild: !0,
                      children: (0, w.jsxs)(n, {
                          href: te(),
                          children: [(0, w.jsx)(ee, {}), `Nuevo usuario`],
                      }),
                  }),
              ],
          })),
          (t[4] = A))
        : (A = t[4]);
    let j;
    t[5] !== m || t[6] !== y
        ? ((j = (e) => {
              (e.preventDefault(), y({ busqueda: m }));
          }),
          (t[5] = m),
          (t[6] = y),
          (t[7] = j))
        : (j = t[7]);
    let M;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((M = (e) => g(e.target.value)), (t[8] = M))
        : (M = t[8]);
    let N;
    t[9] === m
        ? (N = t[10])
        : ((N = (0, w.jsx)(h, {
              value: m,
              onChange: M,
              placeholder: `Buscar por nombre o correo`,
              'aria-label': `Buscar usuarios`,
          })),
          (t[9] = m),
          (t[10] = N));
    let P;
    t[11] !== j || t[12] !== N
        ? ((P = (0, w.jsx)(`form`, {
              className: `flex-1 sm:max-w-xs`,
              onSubmit: j,
              children: N,
          })),
          (t[11] = j),
          (t[12] = N),
          (t[13] = P))
        : (P = t[13]);
    let F = a.rol || T,
        I;
    t[14] === y
        ? (I = t[15])
        : ((I = (e) => y({ rol: e === T ? `` : e })), (t[14] = y), (t[15] = I));
    let L;
    t[16] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((L = (0, w.jsx)(l, {
              className: `w-56`,
              children: (0, w.jsx)(c, { placeholder: `Rol` }),
          })),
          (t[16] = L))
        : (L = t[16]);
    let R;
    t[17] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((R = (0, w.jsx)(d, { value: T, children: `Todos los roles` })),
          (t[17] = R))
        : (R = t[17]);
    let z;
    t[18] === p ? (z = t[19]) : ((z = p.map(k)), (t[18] = p), (t[19] = z));
    let B;
    t[20] === z
        ? (B = t[21])
        : ((B = (0, w.jsxs)(u, { children: [R, z] })),
          (t[20] = z),
          (t[21] = B));
    let V;
    t[22] !== I || t[23] !== B || t[24] !== F
        ? ((V = (0, w.jsxs)(f, {
              value: F,
              onValueChange: I,
              children: [L, B],
          })),
          (t[22] = I),
          (t[23] = B),
          (t[24] = F),
          (t[25] = V))
        : (V = t[25]);
    let H = a.estado || T,
        U;
    t[26] === y
        ? (U = t[27])
        : ((U = (e) => y({ estado: e === T ? `` : e })),
          (t[26] = y),
          (t[27] = U));
    let W;
    t[28] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = (0, w.jsx)(l, {
              className: `w-44`,
              children: (0, w.jsx)(c, { placeholder: `Estado` }),
          })),
          (t[28] = W))
        : (W = t[28]);
    let G;
    t[29] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((G = (0, w.jsxs)(u, {
              children: [
                  (0, w.jsx)(d, { value: T, children: `Todos` }),
                  (0, w.jsx)(d, { value: `activos`, children: `Activos` }),
                  (0, w.jsx)(d, { value: `inactivos`, children: `Inactivos` }),
              ],
          })),
          (t[29] = G))
        : (G = t[29]);
    let K;
    t[30] !== H || t[31] !== U
        ? ((K = (0, w.jsxs)(f, {
              value: H,
              onValueChange: U,
              children: [W, G],
          })),
          (t[30] = H),
          (t[31] = U),
          (t[32] = K))
        : (K = t[32]);
    let q;
    t[33] !== V || t[34] !== K || t[35] !== P
        ? ((q = (0, w.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [P, V, K],
          })),
          (t[33] = V),
          (t[34] = K),
          (t[35] = P),
          (t[36] = q))
        : (q = t[36]);
    let J;
    t[37] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (0, w.jsx)(re, {
              children: (0, w.jsxs)(x, {
                  children: [
                      (0, w.jsx)(b, { children: `Nombre` }),
                      (0, w.jsx)(b, { children: `Correo` }),
                      (0, w.jsx)(b, { children: `Unidad` }),
                      (0, w.jsx)(b, { children: `Roles` }),
                      (0, w.jsx)(b, { children: `Estado` }),
                      (0, w.jsx)(b, {
                          className: `text-right`,
                          children: `Acciones`,
                      }),
                  ],
              }),
          })),
          (t[37] = J))
        : (J = t[37]);
    let Y;
    t[38] === i.data
        ? (Y = t[39])
        : ((Y = i.data.map(D)), (t[38] = i.data), (t[39] = Y));
    let X;
    t[40] === i.data.length
        ? (X = t[41])
        : ((X =
              i.data.length === 0 &&
              (0, w.jsx)(x, {
                  children: (0, w.jsx)(S, {
                      colSpan: 6,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay usuarios que coincidan con la búsqueda.`,
                  }),
              })),
          (t[40] = i.data.length),
          (t[41] = X));
    let Z;
    t[42] !== Y || t[43] !== X
        ? ((Z = (0, w.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, w.jsxs)(C, {
                  children: [J, (0, w.jsxs)(ie, { children: [Y, X] })],
              }),
          })),
          (t[42] = Y),
          (t[43] = X),
          (t[44] = Z))
        : (Z = t[44]);
    let Q;
    t[45] === i
        ? (Q = t[46])
        : ((Q = (0, w.jsx)(ae, { paginado: i, etiqueta: `usuarios` })),
          (t[45] = i),
          (t[46] = Q));
    let $;
    return (
        t[47] !== q || t[48] !== Z || t[49] !== Q
            ? (($ = (0, w.jsxs)(w.Fragment, {
                  children: [
                      E,
                      (0, w.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [A, q, Z, Q],
                      }),
                  ],
              })),
              (t[47] = q),
              (t[48] = Z),
              (t[49] = Q),
              (t[50] = $))
            : ($ = t[50]),
        $
    );
}
function D(e) {
    return (0, w.jsxs)(
        x,
        {
            children: [
                (0, w.jsx)(S, { className: `font-medium`, children: e.name }),
                (0, w.jsx)(S, {
                    className: `text-muted-foreground`,
                    children: e.email,
                }),
                (0, w.jsx)(S, { children: e.unidad?.nombre ?? `—` }),
                (0, w.jsx)(S, {
                    children: (0, w.jsxs)(`div`, {
                        className: `flex flex-wrap gap-1`,
                        children: [e.roles.length === 0 && `—`, e.roles.map(O)],
                    }),
                }),
                (0, w.jsx)(S, {
                    children: (0, w.jsx)(g, {
                        variant: e.activo ? `default` : `outline`,
                        children: e.activo ? `Activo` : `Inactivo`,
                    }),
                }),
                (0, w.jsxs)(S, {
                    className: `text-right whitespace-nowrap`,
                    children: [
                        (0, w.jsx)(s, {
                            variant: `ghost`,
                            size: `sm`,
                            asChild: !0,
                            children: (0, w.jsxs)(n, {
                                href: y(e.id),
                                children: [(0, w.jsx)(p, {}), `Editar`],
                            }),
                        }),
                        (0, w.jsxs)(s, {
                            variant: `ghost`,
                            size: `sm`,
                            onClick: () =>
                                r.patch(
                                    v(e.id).url,
                                    {},
                                    { preserveScroll: !0 },
                                ),
                            children: [
                                (0, w.jsx)(m, {}),
                                e.activo ? `Desactivar` : `Activar`,
                            ],
                        }),
                    ],
                }),
            ],
        },
        e.id,
    );
}
function O(e) {
    return (0, w.jsx)(g, { variant: `secondary`, children: e.nombre }, e.slug);
}
function k(e) {
    return (0, w.jsx)(d, { value: e.valor, children: e.nombre }, e.valor);
}
E.layout = { breadcrumbs: [{ title: `Usuarios`, href: _() }] };
export { E as default };
