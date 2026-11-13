import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    g as ee,
    h as r,
    s as i,
    u as te,
} from './wayfinder-C8dNLrFV.js';
import { t as ne } from './button-BzkMvCJO.js';
import { t as re } from './chart-column-DYgco7gK.js';
import { a, i as ie, n as ae, r as o, t as s } from './select-hxeu1kQ_.js';
import { t as oe } from './plus-B2NIGUck.js';
import {
    $ as se,
    B as ce,
    H as c,
    Mt as le,
    R as ue,
    Tt as de,
    V as fe,
    f as l,
    r as pe,
} from './app-Bu9EFUG6.js';
import {
    a as me,
    i as u,
    n as he,
    o as ge,
    r as d,
    t as _e,
} from './table-D3mJxxJl.js';
import { t as ve } from './paginacion-HQOmOGhf.js';
var ye = t(),
    be = e(r(), 1),
    f = i(),
    p = `todos`;
function m(e) {
    let t = (0, ye.c)(75),
        { espacios: r, filtros: i, opciones: c, puedeGestionar: l } = e,
        [m, Te] = (0, be.useState)(i.busqueda),
        h;
    t[0] === i
        ? (h = t[1])
        : ((h = (e) => {
              ee.get(
                  ce().url,
                  { ...i, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = i),
          (t[1] = h));
    let g = h,
        _;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((_ = (0, f.jsx)(te, { title: `Espacios` })), (t[2] = _))
        : (_ = t[2]);
    let v;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, f.jsx)(pe, {
              title: `Espacios`,
              description: `Sedes, espacios y su estado operativo`,
          })),
          (t[3] = v))
        : (v = t[3]);
    let y;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((y = (0, f.jsx)(ne, {
              variant: `outline`,
              asChild: !0,
              children: (0, f.jsxs)(n, {
                  href: se(),
                  children: [(0, f.jsx)(le, {}), `Calendario`],
              }),
          })),
          (t[4] = y))
        : (y = t[4]);
    let b;
    t[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, f.jsx)(ne, {
              variant: `outline`,
              asChild: !0,
              children: (0, f.jsxs)(n, {
                  href: fe(),
                  children: [(0, f.jsx)(re, {}), `Utilización`],
              }),
          })),
          (t[5] = b))
        : (b = t[5]);
    let x;
    t[6] === l
        ? (x = t[7])
        : ((x =
              l &&
              (0, f.jsx)(ne, {
                  asChild: !0,
                  children: (0, f.jsxs)(n, {
                      href: ue(),
                      children: [(0, f.jsx)(oe, {}), `Nuevo espacio`],
                  }),
              })),
          (t[6] = l),
          (t[7] = x));
    let S;
    t[8] === x
        ? (S = t[9])
        : ((S = (0, f.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [
                  v,
                  (0, f.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [y, b, x],
                  }),
              ],
          })),
          (t[8] = x),
          (t[9] = S));
    let C;
    t[10] !== m || t[11] !== g
        ? ((C = (e) => {
              (e.preventDefault(), g({ busqueda: m }));
          }),
          (t[10] = m),
          (t[11] = g),
          (t[12] = C))
        : (C = t[12]);
    let w;
    t[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((w = (e) => Te(e.target.value)), (t[13] = w))
        : (w = t[13]);
    let T;
    t[14] === m
        ? (T = t[15])
        : ((T = (0, f.jsx)(de, {
              value: m,
              onChange: w,
              placeholder: `Buscar por nombre`,
              'aria-label': `Buscar espacios`,
          })),
          (t[14] = m),
          (t[15] = T));
    let E;
    t[16] !== T || t[17] !== C
        ? ((E = (0, f.jsx)(`form`, {
              className: `flex-1 sm:max-w-xs`,
              onSubmit: C,
              children: T,
          })),
          (t[16] = T),
          (t[17] = C),
          (t[18] = E))
        : (E = t[18]);
    let D = i.sede_id ? String(i.sede_id) : p,
        O;
    t[19] === g
        ? (O = t[20])
        : ((O = (e) => g({ sede_id: e === p ? null : Number(e) })),
          (t[19] = g),
          (t[20] = O));
    let k;
    t[21] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((k = (0, f.jsx)(ie, {
              className: `w-52`,
              children: (0, f.jsx)(a, { placeholder: `Sede` }),
          })),
          (t[21] = k))
        : (k = t[21]);
    let A;
    t[22] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, f.jsx)(o, { value: p, children: `Todas las sedes` })),
          (t[22] = A))
        : (A = t[22]);
    let j;
    t[23] === c.sedes
        ? (j = t[24])
        : ((j = c.sedes.map(we)), (t[23] = c.sedes), (t[24] = j));
    let M;
    t[25] === j
        ? (M = t[26])
        : ((M = (0, f.jsxs)(ae, { children: [A, j] })),
          (t[25] = j),
          (t[26] = M));
    let N;
    t[27] !== D || t[28] !== O || t[29] !== M
        ? ((N = (0, f.jsxs)(s, {
              value: D,
              onValueChange: O,
              children: [k, M],
          })),
          (t[27] = D),
          (t[28] = O),
          (t[29] = M),
          (t[30] = N))
        : (N = t[30]);
    let P = i.tipo_espacio_id ? String(i.tipo_espacio_id) : p,
        F;
    t[31] === g
        ? (F = t[32])
        : ((F = (e) => g({ tipo_espacio_id: e === p ? null : Number(e) })),
          (t[31] = g),
          (t[32] = F));
    let I;
    t[33] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((I = (0, f.jsx)(ie, {
              className: `w-48`,
              children: (0, f.jsx)(a, { placeholder: `Tipo` }),
          })),
          (t[33] = I))
        : (I = t[33]);
    let L;
    t[34] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((L = (0, f.jsx)(o, { value: p, children: `Todos los tipos` })),
          (t[34] = L))
        : (L = t[34]);
    let R;
    t[35] === c.tipos
        ? (R = t[36])
        : ((R = c.tipos.map(Ce)), (t[35] = c.tipos), (t[36] = R));
    let z;
    t[37] === R
        ? (z = t[38])
        : ((z = (0, f.jsxs)(ae, { children: [L, R] })),
          (t[37] = R),
          (t[38] = z));
    let B;
    t[39] !== P || t[40] !== F || t[41] !== z
        ? ((B = (0, f.jsxs)(s, {
              value: P,
              onValueChange: F,
              children: [I, z],
          })),
          (t[39] = P),
          (t[40] = F),
          (t[41] = z),
          (t[42] = B))
        : (B = t[42]);
    let Ee = i.estado || p,
        V;
    t[43] === g
        ? (V = t[44])
        : ((V = (e) => g({ estado: e === p ? `` : e })),
          (t[43] = g),
          (t[44] = V));
    let H;
    t[45] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((H = (0, f.jsx)(ie, {
              className: `w-44`,
              children: (0, f.jsx)(a, { placeholder: `Estado` }),
          })),
          (t[45] = H))
        : (H = t[45]);
    let U;
    t[46] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((U = (0, f.jsx)(o, { value: p, children: `Todos` })), (t[46] = U))
        : (U = t[46]);
    let W;
    t[47] === c.estados
        ? (W = t[48])
        : ((W = c.estados.map(Se)), (t[47] = c.estados), (t[48] = W));
    let G;
    t[49] === W
        ? (G = t[50])
        : ((G = (0, f.jsxs)(ae, { children: [U, W] })),
          (t[49] = W),
          (t[50] = G));
    let K;
    t[51] !== Ee || t[52] !== V || t[53] !== G
        ? ((K = (0, f.jsxs)(s, {
              value: Ee,
              onValueChange: V,
              children: [H, G],
          })),
          (t[51] = Ee),
          (t[52] = V),
          (t[53] = G),
          (t[54] = K))
        : (K = t[54]);
    let q;
    t[55] !== E || t[56] !== N || t[57] !== B || t[58] !== K
        ? ((q = (0, f.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [E, N, B, K],
          })),
          (t[55] = E),
          (t[56] = N),
          (t[57] = B),
          (t[58] = K),
          (t[59] = q))
        : (q = t[59]);
    let J;
    t[60] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (0, f.jsx)(me, {
              children: (0, f.jsxs)(ge, {
                  children: [
                      (0, f.jsx)(u, { children: `Espacio` }),
                      (0, f.jsx)(u, { children: `Sede` }),
                      (0, f.jsx)(u, { children: `Tipo` }),
                      (0, f.jsx)(u, { children: `Capacidad` }),
                      (0, f.jsx)(u, { children: `Reservas` }),
                      (0, f.jsx)(u, { children: `Catálogo público` }),
                      (0, f.jsx)(u, { children: `Estado` }),
                  ],
              }),
          })),
          (t[60] = J))
        : (J = t[60]);
    let Y;
    t[61] === r.data
        ? (Y = t[62])
        : ((Y = r.data.map(xe)), (t[61] = r.data), (t[62] = Y));
    let X;
    t[63] === r.data.length
        ? (X = t[64])
        : ((X =
              r.data.length === 0 &&
              (0, f.jsx)(ge, {
                  children: (0, f.jsx)(d, {
                      colSpan: 7,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay espacios que coincidan con los filtros.`,
                  }),
              })),
          (t[63] = r.data.length),
          (t[64] = X));
    let Z;
    t[65] !== Y || t[66] !== X
        ? ((Z = (0, f.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, f.jsxs)(_e, {
                  children: [J, (0, f.jsxs)(he, { children: [Y, X] })],
              }),
          })),
          (t[65] = Y),
          (t[66] = X),
          (t[67] = Z))
        : (Z = t[67]);
    let Q;
    t[68] === r
        ? (Q = t[69])
        : ((Q = (0, f.jsx)(ve, { paginado: r, etiqueta: `espacios` })),
          (t[68] = r),
          (t[69] = Q));
    let $;
    return (
        t[70] !== q || t[71] !== Z || t[72] !== Q || t[73] !== S
            ? (($ = (0, f.jsxs)(f.Fragment, {
                  children: [
                      _,
                      (0, f.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [S, q, Z, Q],
                      }),
                  ],
              })),
              (t[70] = q),
              (t[71] = Z),
              (t[72] = Q),
              (t[73] = S),
              (t[74] = $))
            : ($ = t[74]),
        $
    );
}
function xe(e) {
    return (0, f.jsxs)(
        ge,
        {
            children: [
                (0, f.jsx)(d, {
                    className: `font-medium`,
                    children: (0, f.jsx)(n, {
                        href: c(e.id),
                        className: `hover:underline`,
                        children: e.nombre,
                    }),
                }),
                (0, f.jsx)(d, { children: e.sede }),
                (0, f.jsx)(d, { children: e.tipo }),
                (0, f.jsx)(d, { children: e.capacidad ?? `—` }),
                (0, f.jsx)(d, {
                    className: `tabular-nums`,
                    children: e.reservas_aprobadas,
                }),
                (0, f.jsx)(d, { children: e.visible_publico ? `Sí` : `No` }),
                (0, f.jsx)(d, {
                    children: (0, f.jsx)(l, {
                        variant: e.estado === `activo` ? `default` : `outline`,
                        children: e.estado_nombre,
                    }),
                }),
            ],
        },
        e.id,
    );
}
function Se(e) {
    return (0, f.jsx)(o, { value: e.valor, children: e.nombre }, e.valor);
}
function Ce(e) {
    return (0, f.jsx)(
        o,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function we(e) {
    return (0, f.jsx)(
        o,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
m.layout = { breadcrumbs: [{ title: `Espacios`, href: ce() }] };
export { m as default };
