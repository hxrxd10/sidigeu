import {
    c as e,
    d as t,
    g as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as o } from './chevron-left-Df1ekNYv.js';
import { a as s, i as c, n as l, r as u, t as ee } from './select-hxeu1kQ_.js';
import { t as te } from './download-DSJLq0he.js';
import { n as ne, t as re } from './membrete-institucional-isNdCdn7.js';
import { t as ie } from './trending-up-Dl2ie7Oo.js';
import {
    ct as ae,
    jt as oe,
    lt as se,
    r as ce,
    rt as d,
    st as le,
} from './app-Bu9EFUG6.js';
import { a as ue, i as de, n as fe, t as pe } from './card-Bc3dRGP7.js';
import {
    a as me,
    i as f,
    n as he,
    o as p,
    r as m,
    t as ge,
} from './table-D3mJxxJl.js';
import { n as h } from './fecha-D8mdgCgw.js';
var _e = e(),
    g = r();
function _(e) {
    let t = (0, _e.c)(7),
        { etiqueta: n, valor: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, g.jsx)(de, {
              className: `pb-2`,
              children: (0, g.jsx)(ue, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: n,
              }),
          })),
          (t[0] = n),
          (t[1] = i));
    let a;
    t[2] === r
        ? (a = t[3])
        : ((a = (0, g.jsx)(fe, {
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
            ? ((o = (0, g.jsxs)(pe, { children: [i, a] })),
              (t[4] = i),
              (t[5] = a),
              (t[6] = o))
            : (o = t[6]),
        o
    );
}
function ve(e) {
    let t = (0, _e.c)(14),
        { titulo: n, filas: r, vacio: i } = e,
        a;
    t[0] === n
        ? (a = t[1])
        : ((a = (0, g.jsx)(de, { children: (0, g.jsx)(ue, { children: n }) })),
          (t[0] = n),
          (t[1] = a));
    let o;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((o = (0, g.jsx)(me, {
              children: (0, g.jsxs)(p, {
                  children: [
                      (0, g.jsx)(f, { children: `Fecha` }),
                      (0, g.jsx)(f, { children: `Actividad` }),
                      (0, g.jsx)(f, { children: `Unidad` }),
                      (0, g.jsx)(f, { children: `Lugar` }),
                      (0, g.jsx)(f, { children: `Beneficiarios` }),
                  ],
              }),
          })),
          (t[2] = o))
        : (o = t[2]);
    let s;
    t[3] === r ? (s = t[4]) : ((s = r.map(v)), (t[3] = r), (t[4] = s));
    let c;
    t[5] !== r.length || t[6] !== i
        ? ((c =
              r.length === 0 &&
              (0, g.jsx)(p, {
                  children: (0, g.jsx)(m, {
                      colSpan: 5,
                      className: `py-8 text-center text-muted-foreground`,
                      children: i,
                  }),
              })),
          (t[5] = r.length),
          (t[6] = i),
          (t[7] = c))
        : (c = t[7]);
    let l;
    t[8] !== s || t[9] !== c
        ? ((l = (0, g.jsx)(fe, {
              children: (0, g.jsxs)(ge, {
                  children: [o, (0, g.jsxs)(he, { children: [s, c] })],
              }),
          })),
          (t[8] = s),
          (t[9] = c),
          (t[10] = l))
        : (l = t[10]);
    let u;
    return (
        t[11] !== a || t[12] !== l
            ? ((u = (0, g.jsxs)(pe, { children: [a, l] })),
              (t[11] = a),
              (t[12] = l),
              (t[13] = u))
            : (u = t[13]),
        u
    );
}
function v(e) {
    return (0, g.jsxs)(
        p,
        {
            children: [
                (0, g.jsx)(m, { children: h(e.fecha) }),
                (0, g.jsxs)(m, {
                    className: `font-medium`,
                    children: [
                        e.nombre,
                        e.resultados &&
                            (0, g.jsx)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: e.resultados,
                            }),
                    ],
                }),
                (0, g.jsx)(m, { children: e.unidad }),
                (0, g.jsx)(m, { children: e.lugar }),
                (0, g.jsx)(m, {
                    className: `tabular-nums`,
                    children: e.beneficiarios,
                }),
            ],
        },
        e.id,
    );
}
function y(e) {
    let r = (0, _e.c)(89),
        {
            filtros: d,
            periodo: h,
            resumen: v,
            realizadas: y,
            logros: xe,
            indicadores: b,
            unidades: x,
        } = e,
        Se;
    r[0] !== d.unidad_id || r[1] !== x
        ? ((Se = d.unidad_id
              ? (x.find((e) => e.valor === d.unidad_id)?.nombre ?? null)
              : `Consolidado de todas las unidades`),
          (r[0] = d.unidad_id),
          (r[1] = x),
          (r[2] = Se))
        : (Se = r[2]);
    let Ce = Se,
        we;
    r[3] === d
        ? (we = r[4])
        : ((we = (e) => {
              n.get(
                  se().url,
                  { ...d, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (r[3] = d),
          (r[4] = we));
    let S = we,
        Te;
    r[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Te = (0, g.jsx)(i, { title: `Reporte mensual` })), (r[5] = Te))
        : (Te = r[5]);
    let C;
    r[6] !== Ce || r[7] !== h.etiqueta
        ? ((C = (0, g.jsx)(re, {
              titulo: `Reporte mensual de actividades`,
              periodo: h.etiqueta,
              alcance: Ce,
          })),
          (r[6] = Ce),
          (r[7] = h.etiqueta),
          (r[8] = C))
        : (C = r[8]);
    let Ee;
    r[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ee = (0, g.jsx)(ce, {
              title: `Reporte mensual`,
              description: `Actividades realizadas, logros del mes e indicadores alcanzados`,
          })),
          (r[9] = Ee))
        : (Ee = r[9]);
    let w;
    r[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((w = (0, g.jsx)(a, {
              variant: `outline`,
              asChild: !0,
              children: (0, g.jsxs)(t, {
                  href: le(),
                  children: [(0, g.jsx)(ie, {}), `Acumulados`],
              }),
          })),
          (r[10] = w))
        : (w = r[10]);
    let T;
    r[11] === d
        ? (T = r[12])
        : ((T = ae({ query: d })), (r[11] = d), (r[12] = T));
    let E;
    r[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, g.jsx)(te, {})), (r[13] = E))
        : (E = r[13]);
    let D;
    r[14] === T.url
        ? (D = r[15])
        : ((D = (0, g.jsx)(a, {
              variant: `outline`,
              asChild: !0,
              children: (0, g.jsxs)(`a`, {
                  href: T.url,
                  children: [E, `Exportar (CSV)`],
              }),
          })),
          (r[14] = T.url),
          (r[15] = D));
    let O;
    r[16] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (0, g.jsx)(ne, {})), (r[16] = O))
        : (O = r[16]);
    let k;
    r[17] === D
        ? (k = r[18])
        : ((k = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4 print:hidden`,
              children: [
                  Ee,
                  (0, g.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [w, D, O],
                  }),
              ],
          })),
          (r[17] = D),
          (r[18] = k));
    let A;
    r[19] !== S || r[20] !== h.anterior
        ? ((A = () => S({ mes: h.anterior })),
          (r[19] = S),
          (r[20] = h.anterior),
          (r[21] = A))
        : (A = r[21]);
    let j;
    r[22] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((j = (0, g.jsx)(o, {})), (r[22] = j))
        : (j = r[22]);
    let M;
    r[23] === A
        ? (M = r[24])
        : ((M = (0, g.jsx)(a, {
              variant: `outline`,
              size: `icon`,
              'aria-label': `Mes anterior`,
              onClick: A,
              children: j,
          })),
          (r[23] = A),
          (r[24] = M));
    let N;
    r[25] !== S || r[26] !== h.siguiente
        ? ((N = () => S({ mes: h.siguiente })),
          (r[25] = S),
          (r[26] = h.siguiente),
          (r[27] = N))
        : (N = r[27]);
    let De;
    r[28] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((De = (0, g.jsx)(oe, {})), (r[28] = De))
        : (De = r[28]);
    let P;
    r[29] === N
        ? (P = r[30])
        : ((P = (0, g.jsx)(a, {
              variant: `outline`,
              size: `icon`,
              'aria-label': `Mes siguiente`,
              onClick: N,
              children: De,
          })),
          (r[29] = N),
          (r[30] = P));
    let F;
    r[31] !== M || r[32] !== P
        ? ((F = (0, g.jsxs)(`div`, {
              className: `flex items-center gap-1`,
              children: [M, P],
          })),
          (r[31] = M),
          (r[32] = P),
          (r[33] = F))
        : (F = r[33]);
    let I;
    r[34] === h.etiqueta
        ? (I = r[35])
        : ((I = (0, g.jsx)(`p`, {
              className: `font-medium first-letter:uppercase`,
              children: h.etiqueta,
          })),
          (r[34] = h.etiqueta),
          (r[35] = I));
    let Oe = d.unidad_id ? String(d.unidad_id) : `consolidado`,
        L;
    r[36] === S
        ? (L = r[37])
        : ((L = (e) =>
              S({ unidad_id: e === `consolidado` ? null : Number(e) })),
          (r[36] = S),
          (r[37] = L));
    let ke;
    r[38] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ke = (0, g.jsx)(c, {
              className: `ml-auto w-60`,
              children: (0, g.jsx)(s, { placeholder: `Unidad` }),
          })),
          (r[38] = ke))
        : (ke = r[38]);
    let Ae;
    r[39] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ae = (0, g.jsx)(u, {
              value: `consolidado`,
              children: `Consolidado DIGEU`,
          })),
          (r[39] = Ae))
        : (Ae = r[39]);
    let R;
    r[40] === x ? (R = r[41]) : ((R = x.map(be)), (r[40] = x), (r[41] = R));
    let z;
    r[42] === R
        ? (z = r[43])
        : ((z = (0, g.jsxs)(l, { children: [Ae, R] })),
          (r[42] = R),
          (r[43] = z));
    let B;
    r[44] !== Oe || r[45] !== L || r[46] !== z
        ? ((B = (0, g.jsxs)(ee, {
              value: Oe,
              onValueChange: L,
              children: [ke, z],
          })),
          (r[44] = Oe),
          (r[45] = L),
          (r[46] = z),
          (r[47] = B))
        : (B = r[47]);
    let V;
    r[48] !== F || r[49] !== I || r[50] !== B
        ? ((V = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap items-center gap-3`,
              children: [F, I, B],
          })),
          (r[48] = F),
          (r[49] = I),
          (r[50] = B),
          (r[51] = V))
        : (V = r[51]);
    let H;
    r[52] === v.programadas
        ? (H = r[53])
        : ((H = (0, g.jsx)(_, {
              etiqueta: `Programadas`,
              valor: v.programadas,
          })),
          (r[52] = v.programadas),
          (r[53] = H));
    let U;
    r[54] === v.cerradas
        ? (U = r[55])
        : ((U = (0, g.jsx)(_, { etiqueta: `Cerradas`, valor: v.cerradas })),
          (r[54] = v.cerradas),
          (r[55] = U));
    let W;
    r[56] === v.canceladas
        ? (W = r[57])
        : ((W = (0, g.jsx)(_, { etiqueta: `Canceladas`, valor: v.canceladas })),
          (r[56] = v.canceladas),
          (r[57] = W));
    let G;
    r[58] === v.logros
        ? (G = r[59])
        : ((G = (0, g.jsx)(_, { etiqueta: `Logros`, valor: v.logros })),
          (r[58] = v.logros),
          (r[59] = G));
    let K;
    r[60] === v.beneficiarios
        ? (K = r[61])
        : ((K = (0, g.jsx)(_, {
              etiqueta: `Beneficiarios`,
              valor: v.beneficiarios,
          })),
          (r[60] = v.beneficiarios),
          (r[61] = K));
    let q;
    r[62] !== H || r[63] !== U || r[64] !== W || r[65] !== G || r[66] !== K
        ? ((q = (0, g.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-5`,
              children: [H, U, W, G, K],
          })),
          (r[62] = H),
          (r[63] = U),
          (r[64] = W),
          (r[65] = G),
          (r[66] = K),
          (r[67] = q))
        : (q = r[67]);
    let J;
    r[68] === y
        ? (J = r[69])
        : ((J = (0, g.jsx)(ve, {
              titulo: `Actividades realizadas`,
              filas: y,
              vacio: `No hay actividades cerradas en el mes.`,
          })),
          (r[68] = y),
          (r[69] = J));
    let Y;
    r[70] === xe
        ? (Y = r[71])
        : ((Y = (0, g.jsx)(ve, {
              titulo: `Logros del mes`,
              filas: xe,
              vacio: `No se registraron logros no programados.`,
          })),
          (r[70] = xe),
          (r[71] = Y));
    let X;
    r[72] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((X = (0, g.jsx)(de, {
              children: (0, g.jsx)(ue, { children: `Indicadores alcanzados` }),
          })),
          (r[72] = X))
        : (X = r[72]);
    let je;
    r[73] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((je = (0, g.jsx)(me, {
              children: (0, g.jsxs)(p, {
                  children: [
                      (0, g.jsx)(f, { children: `Indicador` }),
                      (0, g.jsx)(f, { children: `Unidad de medida` }),
                      (0, g.jsx)(f, { children: `Meta` }),
                      (0, g.jsx)(f, { children: `Alcanzado` }),
                  ],
              }),
          })),
          (r[73] = je))
        : (je = r[73]);
    let Z;
    r[74] === b ? (Z = r[75]) : ((Z = b.map(ye)), (r[74] = b), (r[75] = Z));
    let Q;
    r[76] === b.length
        ? (Q = r[77])
        : ((Q =
              b.length === 0 &&
              (0, g.jsx)(p, {
                  children: (0, g.jsx)(m, {
                      colSpan: 4,
                      className: `py-8 text-center text-muted-foreground`,
                      children: `Las actividades del mes no tienen indicadores asociados.`,
                  }),
              })),
          (r[76] = b.length),
          (r[77] = Q));
    let $;
    r[78] !== Z || r[79] !== Q
        ? (($ = (0, g.jsxs)(pe, {
              children: [
                  X,
                  (0, g.jsx)(fe, {
                      children: (0, g.jsxs)(ge, {
                          children: [je, (0, g.jsxs)(he, { children: [Z, Q] })],
                      }),
                  }),
              ],
          })),
          (r[78] = Z),
          (r[79] = Q),
          (r[80] = $))
        : ($ = r[80]);
    let Me;
    return (
        r[81] !== k ||
        r[82] !== V ||
        r[83] !== q ||
        r[84] !== J ||
        r[85] !== Y ||
        r[86] !== C ||
        r[87] !== $
            ? ((Me = (0, g.jsxs)(g.Fragment, {
                  children: [
                      Te,
                      (0, g.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [C, k, V, q, J, Y, $],
                      }),
                  ],
              })),
              (r[81] = k),
              (r[82] = V),
              (r[83] = q),
              (r[84] = J),
              (r[85] = Y),
              (r[86] = C),
              (r[87] = $),
              (r[88] = Me))
            : (Me = r[88]),
        Me
    );
}
function ye(e) {
    return (0, g.jsxs)(
        p,
        {
            children: [
                (0, g.jsx)(m, { className: `font-medium`, children: e.nombre }),
                (0, g.jsx)(m, { children: e.unidad_medida }),
                (0, g.jsx)(m, { className: `tabular-nums`, children: e.meta }),
                (0, g.jsx)(m, {
                    className: `tabular-nums`,
                    children: e.alcanzado,
                }),
            ],
        },
        e.nombre,
    );
}
function be(e) {
    return (0, g.jsx)(
        u,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
y.layout = {
    breadcrumbs: [
        { title: `Actividades`, href: d() },
        { title: `Reporte mensual`, href: se() },
    ],
};
export { y as default };
