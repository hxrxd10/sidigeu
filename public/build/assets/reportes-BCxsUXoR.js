import {
    c as e,
    d as t,
    g as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as o } from './arrow-left-CWHaM1EE.js';
import { t as s } from './download-DSJLq0he.js';
import { n as c, t as ee } from './membrete-institucional-isNdCdn7.js';
import {
    B as te,
    Tt as ne,
    U as re,
    V as ie,
    r as ae,
} from './app-Bu9EFUG6.js';
import { a as l, i as u, n as d, t as f } from './card-Bc3dRGP7.js';
import { t as oe } from './label-D0AQUEbO.js';
import {
    a as se,
    i as p,
    n as ce,
    o as le,
    r as m,
    t as ue,
} from './table-D3mJxxJl.js';
import { n as de } from './fecha-D8mdgCgw.js';
var h = e(),
    g = r();
function _(e) {
    let t = (0, h.c)(7),
        { etiqueta: n, valor: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, g.jsx)(u, {
              className: `pb-2`,
              children: (0, g.jsx)(l, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: n,
              }),
          })),
          (t[0] = n),
          (t[1] = i));
    let a;
    t[2] === r
        ? (a = t[3])
        : ((a = (0, g.jsx)(d, {
              children: (0, g.jsx)(`p`, {
                  className: `text-3xl font-semibold`,
                  children: r,
              }),
          })),
          (t[2] = r),
          (t[3] = a));
    let o;
    return (
        t[4] !== i || t[5] !== a
            ? ((o = (0, g.jsxs)(f, { children: [i, a] })),
              (t[4] = i),
              (t[5] = a),
              (t[6] = o))
            : (o = t[6]),
        o
    );
}
function fe(e) {
    let t = (0, h.c)(12),
        { titulo: n, filas: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, g.jsx)(u, { children: (0, g.jsx)(l, { children: n }) })),
          (t[0] = n),
          (t[1] = i));
    let a;
    t[2] === r ? (a = t[3]) : ((a = r.map(v)), (t[2] = r), (t[3] = a));
    let o;
    t[4] === r.length
        ? (o = t[5])
        : ((o =
              r.length === 0 &&
              (0, g.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: `Sin reservas en el período.`,
              })),
          (t[4] = r.length),
          (t[5] = o));
    let s;
    t[6] !== a || t[7] !== o
        ? ((s = (0, g.jsxs)(d, { className: `space-y-2`, children: [a, o] })),
          (t[6] = a),
          (t[7] = o),
          (t[8] = s))
        : (s = t[8]);
    let c;
    return (
        t[9] !== i || t[10] !== s
            ? ((c = (0, g.jsxs)(f, { children: [i, s] })),
              (t[9] = i),
              (t[10] = s),
              (t[11] = c))
            : (c = t[11]),
        c
    );
}
function v(e) {
    return (0, g.jsxs)(
        `div`,
        {
            className: `flex items-center justify-between text-sm`,
            children: [
                (0, g.jsxs)(`span`, {
                    children: [
                        e.espacio,
                        (0, g.jsx)(`span`, {
                            className: `block text-xs text-muted-foreground`,
                            children: e.sede,
                        }),
                    ],
                }),
                (0, g.jsxs)(`span`, {
                    className: `text-muted-foreground tabular-nums`,
                    children: [e.horas, ` h`],
                }),
            ],
        },
        e.espacio_id,
    );
}
function y(e) {
    let r = (0, h.c)(64),
        {
            rango: l,
            resumen: u,
            utilizacion: d,
            masUsados: f,
            menosUsados: m,
        } = e,
        v;
    r[0] === l
        ? (v = r[1])
        : ((v = (e) => {
              n.get(
                  ie().url,
                  { ...l, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (r[0] = l),
          (r[1] = v));
    let y = v,
        b;
    r[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, g.jsx)(i, { title: `Utilización de espacios` })),
          (r[2] = b))
        : (b = r[2]);
    let x;
    r[3] === l.desde
        ? (x = r[4])
        : ((x = de(l.desde)), (r[3] = l.desde), (r[4] = x));
    let S;
    r[5] === l.hasta
        ? (S = r[6])
        : ((S = de(l.hasta)), (r[5] = l.hasta), (r[6] = S));
    let C = `Del ${x} al ${S}`,
        w;
    r[7] === C
        ? (w = r[8])
        : ((w = (0, g.jsx)(ee, {
              titulo: `Utilización de espacios`,
              periodo: C,
          })),
          (r[7] = C),
          (r[8] = w));
    let T;
    r[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = (0, g.jsx)(a, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2 print:hidden`,
              children: (0, g.jsxs)(t, {
                  href: te(),
                  children: [(0, g.jsx)(o, {}), `Volver a espacios`],
              }),
          })),
          (r[9] = T))
        : (T = r[9]);
    let E;
    r[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, g.jsx)(ae, {
              title: `Utilización de espacios`,
              description: `Horas reservadas y ocupación por espacio en el período`,
          })),
          (r[10] = E))
        : (E = r[10]);
    let D;
    r[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = (0, g.jsx)(oe, {
              htmlFor: `desde`,
              className: `text-xs`,
              children: `Desde`,
          })),
          (r[11] = D))
        : (D = r[11]);
    let O;
    r[12] === y
        ? (O = r[13])
        : ((O = (e) => y({ desde: e.target.value })), (r[12] = y), (r[13] = O));
    let k;
    r[14] !== l.desde || r[15] !== O
        ? ((k = (0, g.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  D,
                  (0, g.jsx)(ne, {
                      id: `desde`,
                      type: `date`,
                      className: `w-40`,
                      defaultValue: l.desde,
                      onChange: O,
                  }),
              ],
          })),
          (r[14] = l.desde),
          (r[15] = O),
          (r[16] = k))
        : (k = r[16]);
    let A;
    r[17] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, g.jsx)(oe, {
              htmlFor: `hasta`,
              className: `text-xs`,
              children: `Hasta`,
          })),
          (r[17] = A))
        : (A = r[17]);
    let j;
    r[18] === y
        ? (j = r[19])
        : ((j = (e) => y({ hasta: e.target.value })), (r[18] = y), (r[19] = j));
    let M;
    r[20] !== l.hasta || r[21] !== j
        ? ((M = (0, g.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  A,
                  (0, g.jsx)(ne, {
                      id: `hasta`,
                      type: `date`,
                      className: `w-40`,
                      defaultValue: l.hasta,
                      onChange: j,
                  }),
              ],
          })),
          (r[20] = l.hasta),
          (r[21] = j),
          (r[22] = M))
        : (M = r[22]);
    let N;
    r[23] === l
        ? (N = r[24])
        : ((N = re({ query: l })), (r[23] = l), (r[24] = N));
    let P;
    r[25] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((P = (0, g.jsx)(s, {})), (r[25] = P))
        : (P = r[25]);
    let F;
    r[26] === N.url
        ? (F = r[27])
        : ((F = (0, g.jsx)(a, {
              variant: `outline`,
              asChild: !0,
              children: (0, g.jsxs)(`a`, {
                  href: N.url,
                  children: [P, `Exportar (CSV)`],
              }),
          })),
          (r[26] = N.url),
          (r[27] = F));
    let I;
    r[28] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((I = (0, g.jsx)(c, {})), (r[28] = I))
        : (I = r[28]);
    let L;
    r[29] !== k || r[30] !== M || r[31] !== F
        ? ((L = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap items-end justify-between gap-4 print:hidden`,
              children: [
                  E,
                  (0, g.jsxs)(`div`, {
                      className: `flex flex-wrap items-end gap-3`,
                      children: [k, M, F, I],
                  }),
              ],
          })),
          (r[29] = k),
          (r[30] = M),
          (r[31] = F),
          (r[32] = L))
        : (L = r[32]);
    let R = String(u.reservas),
        z;
    r[33] === R
        ? (z = r[34])
        : ((z = (0, g.jsx)(_, { etiqueta: `Reservas aprobadas`, valor: R })),
          (r[33] = R),
          (r[34] = z));
    let B = `${u.horas} h`,
        V;
    r[35] === B
        ? (V = r[36])
        : ((V = (0, g.jsx)(_, { etiqueta: `Horas reservadas`, valor: B })),
          (r[35] = B),
          (r[36] = V));
    let H = String(u.espacios),
        U;
    r[37] === H
        ? (U = r[38])
        : ((U = (0, g.jsx)(_, { etiqueta: `Espacios`, valor: H })),
          (r[37] = H),
          (r[38] = U));
    let W = `${u.ocupacion_promedio}%`,
        G;
    r[39] === W
        ? (G = r[40])
        : ((G = (0, g.jsx)(_, { etiqueta: `Ocupación promedio`, valor: W })),
          (r[39] = W),
          (r[40] = G));
    let K;
    r[41] !== z || r[42] !== V || r[43] !== U || r[44] !== G
        ? ((K = (0, g.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,
              children: [z, V, U, G],
          })),
          (r[41] = z),
          (r[42] = V),
          (r[43] = U),
          (r[44] = G),
          (r[45] = K))
        : (K = r[45]);
    let q;
    r[46] === f
        ? (q = r[47])
        : ((q = (0, g.jsx)(fe, { titulo: `Más usados`, filas: f })),
          (r[46] = f),
          (r[47] = q));
    let J;
    r[48] === m
        ? (J = r[49])
        : ((J = (0, g.jsx)(fe, { titulo: `Menos usados`, filas: m })),
          (r[48] = m),
          (r[49] = J));
    let Y;
    r[50] !== q || r[51] !== J
        ? ((Y = (0, g.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2`,
              children: [q, J],
          })),
          (r[50] = q),
          (r[51] = J),
          (r[52] = Y))
        : (Y = r[52]);
    let X;
    r[53] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((X = (0, g.jsx)(se, {
              children: (0, g.jsxs)(le, {
                  children: [
                      (0, g.jsx)(p, { children: `Espacio` }),
                      (0, g.jsx)(p, { children: `Sede` }),
                      (0, g.jsx)(p, { children: `Reservas` }),
                      (0, g.jsx)(p, { children: `Horas` }),
                      (0, g.jsx)(p, { children: `Ocupación` }),
                  ],
              }),
          })),
          (r[53] = X))
        : (X = r[53]);
    let Z;
    r[54] === d ? (Z = r[55]) : ((Z = d.map(pe)), (r[54] = d), (r[55] = Z));
    let Q;
    r[56] === Z
        ? (Q = r[57])
        : ((Q = (0, g.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, g.jsxs)(ue, {
                  children: [X, (0, g.jsx)(ce, { children: Z })],
              }),
          })),
          (r[56] = Z),
          (r[57] = Q));
    let $;
    return (
        r[58] !== L || r[59] !== K || r[60] !== Y || r[61] !== Q || r[62] !== w
            ? (($ = (0, g.jsxs)(g.Fragment, {
                  children: [
                      b,
                      (0, g.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [w, T, L, K, Y, Q],
                      }),
                  ],
              })),
              (r[58] = L),
              (r[59] = K),
              (r[60] = Y),
              (r[61] = Q),
              (r[62] = w),
              (r[63] = $))
            : ($ = r[63]),
        $
    );
}
function pe(e) {
    return (0, g.jsxs)(
        le,
        {
            children: [
                (0, g.jsx)(m, {
                    className: `font-medium`,
                    children: e.espacio,
                }),
                (0, g.jsx)(m, { children: e.sede }),
                (0, g.jsx)(m, {
                    className: `tabular-nums`,
                    children: e.reservas,
                }),
                (0, g.jsx)(m, { className: `tabular-nums`, children: e.horas }),
                (0, g.jsx)(m, {
                    children: (0, g.jsxs)(`div`, {
                        className: `flex items-center gap-2`,
                        children: [
                            (0, g.jsxs)(`span`, {
                                className: `tabular-nums`,
                                children: [e.ocupacion, `%`],
                            }),
                            (0, g.jsx)(`span`, {
                                className: `h-2 w-24 overflow-hidden rounded-full bg-muted`,
                                children: (0, g.jsx)(`span`, {
                                    className: `block h-full rounded-full bg-primary`,
                                    style: {
                                        width: `${Math.min(100, e.ocupacion)}%`,
                                    },
                                }),
                            }),
                        ],
                    }),
                }),
            ],
        },
        e.espacio_id,
    );
}
y.layout = {
    breadcrumbs: [
        { title: `Espacios`, href: te() },
        { title: `Utilización`, href: ie() },
    ],
};
export { y as default };
