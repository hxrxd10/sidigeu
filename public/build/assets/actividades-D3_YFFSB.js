import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    g as ee,
    h as r,
    r as i,
    s as a,
    u as te,
} from './wayfinder-C8dNLrFV.js';
import { t as o } from './button-BzkMvCJO.js';
import { t as ne } from './chart-column-DYgco7gK.js';
import { a as s, i as re, n as ie, r as c, t as l } from './select-hxeu1kQ_.js';
import { t as ae } from './clipboard-check-BKWpjhiB.js';
import { t as oe } from './file-spreadsheet-gg-INAOi.js';
import { t as se } from './plus-B2NIGUck.js';
import {
    Tt as u,
    at as d,
    f,
    it as ce,
    lt as le,
    r as ue,
    rt as de,
    tt as fe,
    ut as pe,
} from './app-Bu9EFUG6.js';
import {
    a as me,
    i as p,
    n as he,
    o as m,
    r as h,
    t as ge,
} from './table-D3mJxxJl.js';
import { t as _e } from './paginacion-HQOmOGhf.js';
import { n as ve } from './fecha-D8mdgCgw.js';
var ye = i(`CalendarRange`, [
        [
            `rect`,
            {
                width: `18`,
                height: `18`,
                x: `3`,
                y: `4`,
                rx: `2`,
                key: `1hopcy`,
            },
        ],
        [`path`, { d: `M16 2v4`, key: `4m81vk` }],
        [`path`, { d: `M3 10h18`, key: `8toen8` }],
        [`path`, { d: `M8 2v4`, key: `1cmpym` }],
        [`path`, { d: `M17 14h-6`, key: `bkmgh3` }],
        [`path`, { d: `M13 18H7`, key: `bb0bb7` }],
        [`path`, { d: `M7 14h.01`, key: `1qa3f1` }],
        [`path`, { d: `M17 18h.01`, key: `1bdyru` }],
    ]),
    be = t(),
    xe = e(r(), 1),
    g = a(),
    _ = `todos`;
function v(e) {
    return e === `cerrada`
        ? `default`
        : [`cancelada`, `rechazada`].includes(e)
          ? `outline`
          : `secondary`;
}
function y(e) {
    let t = (0, be.c)(69),
        { actividades: r, filtros: i, opciones: a, puedeRegistrar: d } = e,
        [f, ve] = (0, xe.useState)(i.busqueda),
        v;
    t[0] === i
        ? (v = t[1])
        : ((v = (e) => {
              ee.get(
                  de().url,
                  { ...i, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = i),
          (t[1] = v));
    let y = v,
        b;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, g.jsx)(te, { title: `Actividades` })), (t[2] = b))
        : (b = t[2]);
    let x;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, g.jsx)(ue, {
              title: `Programación mensual`,
              description: `Actividades de la unidad: registro, validación, ejecución y cierre`,
          })),
          (t[3] = x))
        : (x = t[3]);
    let S;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = (0, g.jsx)(o, {
              variant: `outline`,
              asChild: !0,
              children: (0, g.jsxs)(n, {
                  href: ce(),
                  children: [(0, g.jsx)(ae, {}), `Revisión`],
              }),
          })),
          (t[4] = S))
        : (S = t[4]);
    let C;
    t[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = (0, g.jsx)(o, {
              variant: `outline`,
              asChild: !0,
              children: (0, g.jsxs)(n, {
                  href: le(),
                  children: [(0, g.jsx)(ne, {}), `Reporte mensual`],
              }),
          })),
          (t[5] = C))
        : (C = t[5]);
    let w;
    t[6] === d
        ? (w = t[7])
        : ((w =
              d &&
              (0, g.jsxs)(g.Fragment, {
                  children: [
                      (0, g.jsx)(o, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, g.jsxs)(n, {
                              href: pe(),
                              children: [(0, g.jsx)(oe, {}), `Carga masiva`],
                          }),
                      }),
                      (0, g.jsx)(o, {
                          asChild: !0,
                          children: (0, g.jsxs)(n, {
                              href: fe(),
                              children: [(0, g.jsx)(se, {}), `Nueva actividad`],
                          }),
                      }),
                  ],
              })),
          (t[6] = d),
          (t[7] = w));
    let T;
    t[8] === w
        ? (T = t[9])
        : ((T = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [
                  x,
                  (0, g.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [S, C, w],
                  }),
              ],
          })),
          (t[8] = w),
          (t[9] = T));
    let E;
    t[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, g.jsx)(ye, { className: `size-4 text-muted-foreground` })),
          (t[10] = E))
        : (E = t[10]);
    let D;
    t[11] === y
        ? (D = t[12])
        : ((D = (e) => y({ mes: e.target.value })), (t[11] = y), (t[12] = D));
    let O;
    t[13] !== i.mes || t[14] !== D
        ? ((O = (0, g.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [
                  E,
                  (0, g.jsx)(u, {
                      type: `month`,
                      className: `w-44`,
                      value: i.mes,
                      onChange: D,
                      'aria-label': `Mes de la programación`,
                  }),
              ],
          })),
          (t[13] = i.mes),
          (t[14] = D),
          (t[15] = O))
        : (O = t[15]);
    let k;
    t[16] !== f || t[17] !== y
        ? ((k = (e) => {
              (e.preventDefault(), y({ busqueda: f }));
          }),
          (t[16] = f),
          (t[17] = y),
          (t[18] = k))
        : (k = t[18]);
    let A;
    t[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (e) => ve(e.target.value)), (t[19] = A))
        : (A = t[19]);
    let j;
    t[20] === f
        ? (j = t[21])
        : ((j = (0, g.jsx)(u, {
              value: f,
              onChange: A,
              placeholder: `Buscar por nombre`,
              'aria-label': `Buscar actividades`,
          })),
          (t[20] = f),
          (t[21] = j));
    let M;
    t[22] !== k || t[23] !== j
        ? ((M = (0, g.jsx)(`form`, {
              className: `flex-1 sm:max-w-xs`,
              onSubmit: k,
              children: j,
          })),
          (t[22] = k),
          (t[23] = j),
          (t[24] = M))
        : (M = t[24]);
    let N = i.unidad_id ? String(i.unidad_id) : _,
        P;
    t[25] === y
        ? (P = t[26])
        : ((P = (e) => y({ unidad_id: e === _ ? null : Number(e) })),
          (t[25] = y),
          (t[26] = P));
    let F;
    t[27] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((F = (0, g.jsx)(re, {
              className: `w-56`,
              children: (0, g.jsx)(s, { placeholder: `Unidad` }),
          })),
          (t[27] = F))
        : (F = t[27]);
    let I;
    t[28] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((I = (0, g.jsx)(c, { value: _, children: `Todas las unidades` })),
          (t[28] = I))
        : (I = t[28]);
    let L;
    t[29] === a.unidades
        ? (L = t[30])
        : ((L = a.unidades.map(we)), (t[29] = a.unidades), (t[30] = L));
    let R;
    t[31] === L
        ? (R = t[32])
        : ((R = (0, g.jsxs)(ie, { children: [I, L] })),
          (t[31] = L),
          (t[32] = R));
    let z;
    t[33] !== N || t[34] !== P || t[35] !== R
        ? ((z = (0, g.jsxs)(l, {
              value: N,
              onValueChange: P,
              children: [F, R],
          })),
          (t[33] = N),
          (t[34] = P),
          (t[35] = R),
          (t[36] = z))
        : (z = t[36]);
    let B = i.estado || _,
        V;
    t[37] === y
        ? (V = t[38])
        : ((V = (e) => y({ estado: e === _ ? `` : e })),
          (t[37] = y),
          (t[38] = V));
    let H;
    t[39] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((H = (0, g.jsx)(re, {
              className: `w-52`,
              children: (0, g.jsx)(s, { placeholder: `Estado` }),
          })),
          (t[39] = H))
        : (H = t[39]);
    let U;
    t[40] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((U = (0, g.jsx)(c, { value: _, children: `Todos los estados` })),
          (t[40] = U))
        : (U = t[40]);
    let W;
    t[41] === a.estados
        ? (W = t[42])
        : ((W = a.estados.map(Ce)), (t[41] = a.estados), (t[42] = W));
    let G;
    t[43] === W
        ? (G = t[44])
        : ((G = (0, g.jsxs)(ie, { children: [U, W] })),
          (t[43] = W),
          (t[44] = G));
    let K;
    t[45] !== B || t[46] !== V || t[47] !== G
        ? ((K = (0, g.jsxs)(l, {
              value: B,
              onValueChange: V,
              children: [H, G],
          })),
          (t[45] = B),
          (t[46] = V),
          (t[47] = G),
          (t[48] = K))
        : (K = t[48]);
    let q;
    t[49] !== O || t[50] !== M || t[51] !== z || t[52] !== K
        ? ((q = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [O, M, z, K],
          })),
          (t[49] = O),
          (t[50] = M),
          (t[51] = z),
          (t[52] = K),
          (t[53] = q))
        : (q = t[53]);
    let J;
    t[54] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (0, g.jsx)(me, {
              children: (0, g.jsxs)(m, {
                  children: [
                      (0, g.jsx)(p, { children: `Fecha` }),
                      (0, g.jsx)(p, { children: `Actividad` }),
                      (0, g.jsx)(p, { children: `Unidad` }),
                      (0, g.jsx)(p, { children: `Tipo` }),
                      (0, g.jsx)(p, { children: `Lugar` }),
                      (0, g.jsx)(p, { children: `Estado` }),
                  ],
              }),
          })),
          (t[54] = J))
        : (J = t[54]);
    let Y;
    t[55] === r.data
        ? (Y = t[56])
        : ((Y = r.data.map(Se)), (t[55] = r.data), (t[56] = Y));
    let X;
    t[57] === r.data.length
        ? (X = t[58])
        : ((X =
              r.data.length === 0 &&
              (0, g.jsx)(m, {
                  children: (0, g.jsx)(h, {
                      colSpan: 6,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay actividades programadas en el mes seleccionado.`,
                  }),
              })),
          (t[57] = r.data.length),
          (t[58] = X));
    let Z;
    t[59] !== Y || t[60] !== X
        ? ((Z = (0, g.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, g.jsxs)(ge, {
                  children: [J, (0, g.jsxs)(he, { children: [Y, X] })],
              }),
          })),
          (t[59] = Y),
          (t[60] = X),
          (t[61] = Z))
        : (Z = t[61]);
    let Q;
    t[62] === r
        ? (Q = t[63])
        : ((Q = (0, g.jsx)(_e, { paginado: r, etiqueta: `actividades` })),
          (t[62] = r),
          (t[63] = Q));
    let $;
    return (
        t[64] !== q || t[65] !== Z || t[66] !== Q || t[67] !== T
            ? (($ = (0, g.jsxs)(g.Fragment, {
                  children: [
                      b,
                      (0, g.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [T, q, Z, Q],
                      }),
                  ],
              })),
              (t[64] = q),
              (t[65] = Z),
              (t[66] = Q),
              (t[67] = T),
              (t[68] = $))
            : ($ = t[68]),
        $
    );
}
function Se(e) {
    return (0, g.jsxs)(
        m,
        {
            children: [
                (0, g.jsxs)(h, {
                    className: `whitespace-nowrap`,
                    children: [
                        ve(e.fecha),
                        e.hora_inicio &&
                            (0, g.jsxs)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: [
                                    e.hora_inicio,
                                    e.hora_fin ? ` – ${e.hora_fin}` : ``,
                                ],
                            }),
                    ],
                }),
                (0, g.jsxs)(h, {
                    className: `font-medium`,
                    children: [
                        (0, g.jsx)(n, {
                            href: d(e.id),
                            className: `hover:underline`,
                            children: e.nombre,
                        }),
                        (0, g.jsxs)(`div`, {
                            className: `mt-1 flex gap-1`,
                            children: [
                                e.publicar_agenda &&
                                    (0, g.jsx)(f, {
                                        variant: `outline`,
                                        children: `Agenda`,
                                    }),
                                e.es_logro_no_programado &&
                                    (0, g.jsx)(f, {
                                        variant: `outline`,
                                        children: `Logro`,
                                    }),
                            ],
                        }),
                    ],
                }),
                (0, g.jsx)(h, { children: e.unidad }),
                (0, g.jsx)(h, { children: e.tipo }),
                (0, g.jsx)(h, { children: e.lugar }),
                (0, g.jsx)(h, {
                    children: (0, g.jsx)(f, {
                        variant: v(e.estado),
                        children: e.estado_nombre,
                    }),
                }),
            ],
        },
        e.id,
    );
}
function Ce(e) {
    return (0, g.jsx)(c, { value: e.valor, children: e.nombre }, e.valor);
}
function we(e) {
    return (0, g.jsx)(
        c,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
y.layout = { breadcrumbs: [{ title: `Actividades`, href: de() }] };
export { v as colorEstado, y as default };
