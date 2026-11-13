import {
    c as e,
    d as t,
    g as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as o } from './arrow-left-CWHaM1EE.js';
import { a as s, i as c, n as l, r as u, t as ee } from './select-hxeu1kQ_.js';
import { n as te, t as ne } from './membrete-institucional-isNdCdn7.js';
import {
    Tt as re,
    lt as ie,
    r as ae,
    rt as d,
    st as oe,
} from './app-Bu9EFUG6.js';
import { a as se, i as ce, n as le, t as ue } from './card-Bc3dRGP7.js';
import { t as f } from './label-D0AQUEbO.js';
import {
    a as de,
    i as p,
    n as fe,
    o as pe,
    r as m,
    t as me,
} from './table-D3mJxxJl.js';
var he = e(),
    h = r();
function ge(e) {
    let t = (0, he.c)(17),
        { titulo: n, grupos: r } = e,
        i;
    t[0] === r
        ? (i = t[1])
        : ((i = Math.max(1, ...r.map(g))), (t[0] = r), (t[1] = i));
    let a = i,
        o;
    t[2] === n
        ? (o = t[3])
        : ((o = (0, h.jsx)(ce, { children: (0, h.jsx)(se, { children: n }) })),
          (t[2] = n),
          (t[3] = o));
    let s;
    if (t[4] !== r || t[5] !== a) {
        let e;
        (t[7] === a
            ? (e = t[8])
            : ((e = (e) =>
                  (0, h.jsxs)(
                      `div`,
                      {
                          className: `space-y-1`,
                          children: [
                              (0, h.jsxs)(`div`, {
                                  className: `flex items-center justify-between text-sm`,
                                  children: [
                                      (0, h.jsx)(`span`, {
                                          className: `capitalize`,
                                          children: e.etiqueta,
                                      }),
                                      (0, h.jsx)(`span`, {
                                          className: `text-muted-foreground tabular-nums`,
                                          children: e.total,
                                      }),
                                  ],
                              }),
                              (0, h.jsx)(`div`, {
                                  className: `h-2 overflow-hidden rounded-full bg-muted`,
                                  children: (0, h.jsx)(`div`, {
                                      className: `h-full rounded-full bg-primary`,
                                      style: {
                                          width: `${(e.total / a) * 100}%`,
                                      },
                                  }),
                              }),
                          ],
                      },
                      e.etiqueta,
                  )),
              (t[7] = a),
              (t[8] = e)),
            (s = r.map(e)),
            (t[4] = r),
            (t[5] = a),
            (t[6] = s));
    } else s = t[6];
    let c;
    t[9] === r.length
        ? (c = t[10])
        : ((c =
              r.length === 0 &&
              (0, h.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: `Sin actividades en el período.`,
              })),
          (t[9] = r.length),
          (t[10] = c));
    let l;
    t[11] !== s || t[12] !== c
        ? ((l = (0, h.jsxs)(le, { className: `space-y-3`, children: [s, c] })),
          (t[11] = s),
          (t[12] = c),
          (t[13] = l))
        : (l = t[13]);
    let u;
    return (
        t[14] !== o || t[15] !== l
            ? ((u = (0, h.jsxs)(ue, { children: [o, l] })),
              (t[14] = o),
              (t[15] = l),
              (t[16] = u))
            : (u = t[16]),
        u
    );
}
function g(e) {
    return e.total;
}
function _(e) {
    let r = (0, he.c)(94),
        {
            filtros: d,
            rango: g,
            resumen: _,
            porMes: xe,
            porUnidad: Se,
            porTipo: Ce,
            indicadores: v,
            unidades: y,
        } = e,
        we;
    r[0] === d
        ? (we = r[1])
        : ((we = (e) => {
              n.get(
                  oe().url,
                  { ...d, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (r[0] = d),
          (r[1] = we));
    let b = we,
        x;
    r[2] !== d.unidad_id || r[3] !== y
        ? ((x = d.unidad_id
              ? (y.find((e) => e.valor === d.unidad_id)?.nombre ?? null)
              : `Consolidado de todas las unidades`),
          (r[2] = d.unidad_id),
          (r[3] = y),
          (r[4] = x))
        : (x = r[4]);
    let Te = x,
        S;
    r[5] === d.periodo
        ? (S = r[6])
        : ((S =
              d.periodo === `trimestral`
                  ? [1, 2, 3, 4]
                  : d.periodo === `semestral`
                    ? [1, 2]
                    : []),
          (r[5] = d.periodo),
          (r[6] = S));
    let C = S,
        w;
    r[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((w = (0, h.jsx)(i, { title: `Reporte acumulado` })), (r[7] = w))
        : (w = r[7]);
    let T;
    r[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = (0, h.jsx)(a, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2 print:hidden`,
              children: (0, h.jsxs)(t, {
                  href: ie(),
                  children: [(0, h.jsx)(o, {}), `Volver al reporte mensual`],
              }),
          })),
          (r[8] = T))
        : (T = r[8]);
    let E;
    r[9] !== Te || r[10] !== g.etiqueta
        ? ((E = (0, h.jsx)(ne, {
              titulo: `Reporte acumulado de actividades`,
              periodo: g.etiqueta,
              alcance: Te,
          })),
          (r[9] = Te),
          (r[10] = g.etiqueta),
          (r[11] = E))
        : (E = r[11]);
    let D;
    r[12] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = (0, h.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4 print:hidden`,
              children: [
                  (0, h.jsx)(ae, {
                      title: `Reportes acumulados`,
                      description: `Trimestral, semestral y anual, con el detalle por mes, unidad y tipo`,
                  }),
                  (0, h.jsx)(te, {}),
              ],
          })),
          (r[12] = D))
        : (D = r[12]);
    let O;
    r[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (0, h.jsx)(f, {
              htmlFor: `anio`,
              className: `text-xs`,
              children: `Año`,
          })),
          (r[13] = O))
        : (O = r[13]);
    let k;
    r[14] === b
        ? (k = r[15])
        : ((k = (e) => b({ anio: Number(e.target.value) })),
          (r[14] = b),
          (r[15] = k));
    let A;
    r[16] !== d.anio || r[17] !== k
        ? ((A = (0, h.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  O,
                  (0, h.jsx)(re, {
                      id: `anio`,
                      type: `number`,
                      className: `w-28`,
                      defaultValue: d.anio,
                      onBlur: k,
                  }),
              ],
          })),
          (r[16] = d.anio),
          (r[17] = k),
          (r[18] = A))
        : (A = r[18]);
    let j;
    r[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((j = (0, h.jsx)(f, { className: `text-xs`, children: `Período` })),
          (r[19] = j))
        : (j = r[19]);
    let M;
    r[20] === b
        ? (M = r[21])
        : ((M = (e) => b({ periodo: e, bloque: 1 })), (r[20] = b), (r[21] = M));
    let Ee;
    r[22] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ee = (0, h.jsx)(c, {
              className: `w-40`,
              children: (0, h.jsx)(s, {}),
          })),
          (r[22] = Ee))
        : (Ee = r[22]);
    let De;
    r[23] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((De = (0, h.jsxs)(l, {
              children: [
                  (0, h.jsx)(u, {
                      value: `trimestral`,
                      children: `Trimestral`,
                  }),
                  (0, h.jsx)(u, { value: `semestral`, children: `Semestral` }),
                  (0, h.jsx)(u, { value: `anual`, children: `Anual` }),
              ],
          })),
          (r[23] = De))
        : (De = r[23]);
    let N;
    r[24] !== d.periodo || r[25] !== M
        ? ((N = (0, h.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  j,
                  (0, h.jsxs)(ee, {
                      value: d.periodo,
                      onValueChange: M,
                      children: [Ee, De],
                  }),
              ],
          })),
          (r[24] = d.periodo),
          (r[25] = M),
          (r[26] = N))
        : (N = r[26]);
    let P;
    r[27] !== C || r[28] !== d.bloque || r[29] !== d.periodo || r[30] !== b
        ? ((P =
              C.length > 0 &&
              (0, h.jsxs)(`div`, {
                  className: `grid gap-1`,
                  children: [
                      (0, h.jsx)(f, {
                          className: `text-xs`,
                          children:
                              d.periodo === `trimestral`
                                  ? `Trimestre`
                                  : `Semestre`,
                      }),
                      (0, h.jsxs)(ee, {
                          value: String(d.bloque),
                          onValueChange: (e) => b({ bloque: Number(e) }),
                          children: [
                              (0, h.jsx)(c, {
                                  className: `w-32`,
                                  children: (0, h.jsx)(s, {}),
                              }),
                              (0, h.jsx)(l, { children: C.map(be) }),
                          ],
                      }),
                  ],
              })),
          (r[27] = C),
          (r[28] = d.bloque),
          (r[29] = d.periodo),
          (r[30] = b),
          (r[31] = P))
        : (P = r[31]);
    let Oe;
    r[32] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Oe = (0, h.jsx)(f, { className: `text-xs`, children: `Unidad` })),
          (r[32] = Oe))
        : (Oe = r[32]);
    let ke = d.unidad_id ? String(d.unidad_id) : `consolidado`,
        F;
    r[33] === b
        ? (F = r[34])
        : ((F = (e) =>
              b({ unidad_id: e === `consolidado` ? null : Number(e) })),
          (r[33] = b),
          (r[34] = F));
    let Ae;
    r[35] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ae = (0, h.jsx)(c, {
              className: `w-56`,
              children: (0, h.jsx)(s, {}),
          })),
          (r[35] = Ae))
        : (Ae = r[35]);
    let je;
    r[36] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((je = (0, h.jsx)(u, {
              value: `consolidado`,
              children: `Consolidado DIGEU`,
          })),
          (r[36] = je))
        : (je = r[36]);
    let I;
    r[37] === y ? (I = r[38]) : ((I = y.map(ye)), (r[37] = y), (r[38] = I));
    let L;
    r[39] === I
        ? (L = r[40])
        : ((L = (0, h.jsxs)(l, { children: [je, I] })),
          (r[39] = I),
          (r[40] = L));
    let R;
    r[41] !== ke || r[42] !== F || r[43] !== L
        ? ((R = (0, h.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  Oe,
                  (0, h.jsxs)(ee, {
                      value: ke,
                      onValueChange: F,
                      children: [Ae, L],
                  }),
              ],
          })),
          (r[41] = ke),
          (r[42] = F),
          (r[43] = L),
          (r[44] = R))
        : (R = r[44]);
    let z;
    r[45] === g.etiqueta
        ? (z = r[46])
        : ((z = (0, h.jsx)(`p`, {
              className: `text-sm text-muted-foreground`,
              children: g.etiqueta,
          })),
          (r[45] = g.etiqueta),
          (r[46] = z));
    let B;
    r[47] !== A || r[48] !== N || r[49] !== P || r[50] !== R || r[51] !== z
        ? ((B = (0, h.jsxs)(`div`, {
              className: `flex flex-wrap items-end gap-3`,
              children: [A, N, P, R, z],
          })),
          (r[47] = A),
          (r[48] = N),
          (r[49] = P),
          (r[50] = R),
          (r[51] = z),
          (r[52] = B))
        : (B = r[52]);
    let V;
    r[53] === _.programadas
        ? (V = r[54])
        : ((V = [`Programadas`, _.programadas]),
          (r[53] = _.programadas),
          (r[54] = V));
    let H;
    r[55] === _.cerradas
        ? (H = r[56])
        : ((H = [`Cerradas`, _.cerradas]), (r[55] = _.cerradas), (r[56] = H));
    let U;
    r[57] === _.canceladas
        ? (U = r[58])
        : ((U = [`Canceladas`, _.canceladas]),
          (r[57] = _.canceladas),
          (r[58] = U));
    let W;
    r[59] === _.logros
        ? (W = r[60])
        : ((W = [`Logros`, _.logros]), (r[59] = _.logros), (r[60] = W));
    let G;
    r[61] === _.beneficiarios
        ? (G = r[62])
        : ((G = [`Beneficiarios`, _.beneficiarios]),
          (r[61] = _.beneficiarios),
          (r[62] = G));
    let K;
    r[63] !== V || r[64] !== H || r[65] !== U || r[66] !== W || r[67] !== G
        ? ((K = (0, h.jsx)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-5`,
              children: [V, H, U, W, G].map(ve),
          })),
          (r[63] = V),
          (r[64] = H),
          (r[65] = U),
          (r[66] = W),
          (r[67] = G),
          (r[68] = K))
        : (K = r[68]);
    let q;
    r[69] === xe
        ? (q = r[70])
        : ((q = (0, h.jsx)(ge, { titulo: `Por mes`, grupos: xe })),
          (r[69] = xe),
          (r[70] = q));
    let J;
    r[71] === Se
        ? (J = r[72])
        : ((J = (0, h.jsx)(ge, { titulo: `Por unidad`, grupos: Se })),
          (r[71] = Se),
          (r[72] = J));
    let Y;
    r[73] === Ce
        ? (Y = r[74])
        : ((Y = (0, h.jsx)(ge, { titulo: `Por tipo`, grupos: Ce })),
          (r[73] = Ce),
          (r[74] = Y));
    let X;
    r[75] !== q || r[76] !== J || r[77] !== Y
        ? ((X = (0, h.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [q, J, Y],
          })),
          (r[75] = q),
          (r[76] = J),
          (r[77] = Y),
          (r[78] = X))
        : (X = r[78]);
    let Me;
    r[79] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Me = (0, h.jsx)(ce, {
              children: (0, h.jsx)(se, { children: `Indicadores del período` }),
          })),
          (r[79] = Me))
        : (Me = r[79]);
    let Ne;
    r[80] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ne = (0, h.jsx)(de, {
              children: (0, h.jsxs)(pe, {
                  children: [
                      (0, h.jsx)(p, { children: `Indicador` }),
                      (0, h.jsx)(p, { children: `Unidad de medida` }),
                      (0, h.jsx)(p, { children: `Meta` }),
                      (0, h.jsx)(p, { children: `Alcanzado` }),
                  ],
              }),
          })),
          (r[80] = Ne))
        : (Ne = r[80]);
    let Z;
    r[81] === v ? (Z = r[82]) : ((Z = v.map(_e)), (r[81] = v), (r[82] = Z));
    let Q;
    r[83] === v.length
        ? (Q = r[84])
        : ((Q =
              v.length === 0 &&
              (0, h.jsx)(pe, {
                  children: (0, h.jsx)(m, {
                      colSpan: 4,
                      className: `py-8 text-center text-muted-foreground`,
                      children: `Sin indicadores registrados en el período.`,
                  }),
              })),
          (r[83] = v.length),
          (r[84] = Q));
    let $;
    r[85] !== Z || r[86] !== Q
        ? (($ = (0, h.jsxs)(ue, {
              children: [
                  Me,
                  (0, h.jsx)(le, {
                      children: (0, h.jsxs)(me, {
                          children: [Ne, (0, h.jsxs)(fe, { children: [Z, Q] })],
                      }),
                  }),
              ],
          })),
          (r[85] = Z),
          (r[86] = Q),
          (r[87] = $))
        : ($ = r[87]);
    let Pe;
    return (
        r[88] !== B || r[89] !== K || r[90] !== X || r[91] !== $ || r[92] !== E
            ? ((Pe = (0, h.jsxs)(h.Fragment, {
                  children: [
                      w,
                      (0, h.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [T, E, D, B, K, X, $],
                      }),
                  ],
              })),
              (r[88] = B),
              (r[89] = K),
              (r[90] = X),
              (r[91] = $),
              (r[92] = E),
              (r[93] = Pe))
            : (Pe = r[93]),
        Pe
    );
}
function _e(e) {
    return (0, h.jsxs)(
        pe,
        {
            children: [
                (0, h.jsx)(m, { className: `font-medium`, children: e.nombre }),
                (0, h.jsx)(m, { children: e.unidad_medida }),
                (0, h.jsx)(m, { className: `tabular-nums`, children: e.meta }),
                (0, h.jsx)(m, {
                    className: `tabular-nums`,
                    children: e.alcanzado,
                }),
            ],
        },
        e.nombre,
    );
}
function ve(e) {
    let [t, n] = e;
    return (0, h.jsxs)(
        ue,
        {
            children: [
                (0, h.jsx)(ce, {
                    className: `pb-2`,
                    children: (0, h.jsx)(se, {
                        className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                        children: t,
                    }),
                }),
                (0, h.jsx)(le, {
                    children: (0, h.jsx)(`p`, {
                        className: `text-3xl font-semibold`,
                        children: n,
                    }),
                }),
            ],
        },
        String(t),
    );
}
function ye(e) {
    return (0, h.jsx)(
        u,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function be(e) {
    return (0, h.jsx)(u, { value: String(e), children: e }, e);
}
_.layout = {
    breadcrumbs: [
        { title: `Actividades`, href: d() },
        { title: `Acumulados`, href: oe() },
    ],
};
export { _ as default };
