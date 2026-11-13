import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    g as r,
    h as i,
    l as ee,
    n as a,
    r as o,
    s,
    t as c,
    u as te,
} from './wayfinder-C8dNLrFV.js';
import { t as l } from './button-BzkMvCJO.js';
import { t as ne } from './arrow-left-CWHaM1EE.js';
import { t as re } from './circle-check-CQR1GVzd.js';
import { i as ie, n as ae, r as oe, t as se } from './send-L2kvjkbS.js';
import { t as ce } from './download-DSJLq0he.js';
import { t as le } from './external-link-jeG1UvmS.js';
import { t as ue } from './link-2-weYKolBY.js';
import { t as de } from './pencil-Bbeg0ISb.js';
import { t as fe } from './trending-up-Dl2ie7Oo.js';
import {
    J as pe,
    K as me,
    Q as he,
    X as ge,
    Z as _e,
    c as ve,
    f as ye,
    i as be,
    l as xe,
    o as Se,
    q as Ce,
    s as we,
    u as Te,
} from './app-Bu9EFUG6.js';
import { t as Ee } from './input-error-Bxj_sbd5.js';
import { a as u, i as d, n as f, t as p } from './card-Bc3dRGP7.js';
import { t as De } from './label-D0AQUEbO.js';
import { t as Oe } from './spinner-DtbIIn34.js';
import {
    a as ke,
    i as m,
    n as Ae,
    o as h,
    r as g,
    t as je,
} from './table-D3mJxxJl.js';
import { t as Me } from './textarea-DtbS5QwL.js';
import { n as _ } from './fecha-D8mdgCgw.js';
import { t as Ne } from './AprobacionProyectoController-C0mZj3ob.js';
import { colorEstadoProyecto as Pe } from './proyectos-C6CBpW6k.js';
import { t as Fe } from './EjecucionProyectoController-Bh4OfGml.js';
var Ie = o(`FilePen`, [
        [
            `path`,
            {
                d: `M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5`,
                key: `1couwa`,
            },
        ],
        [`path`, { d: `M14 2v4a2 2 0 0 0 2 2h4`, key: `tnqrlb` }],
        [
            `path`,
            {
                d: `M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z`,
                key: `1y4qbx`,
            },
        ],
    ]),
    Le = o(`Unlink`, [
        [
            `path`,
            {
                d: `m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71`,
                key: `yqzxt4`,
            },
        ],
        [
            `path`,
            {
                d: `m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71`,
                key: `4qinb0`,
            },
        ],
        [`line`, { x1: `8`, x2: `8`, y1: `2`, y2: `5`, key: `1041cp` }],
        [`line`, { x1: `2`, x2: `5`, y1: `8`, y2: `8`, key: `14m1p5` }],
        [`line`, { x1: `16`, x2: `16`, y1: `19`, y2: `22`, key: `rzdirn` }],
        [`line`, { x1: `19`, x2: `22`, y1: `16`, y2: `16`, key: `ox905f` }],
    ]),
    Re = e(i(), 1),
    ze = t(),
    v = (e, t) => ({ url: v.url(e, t), method: `post` });
((v.definition = {
    methods: [`post`],
    url: `/proyectos/{proyecto}/actividades`,
}),
    (v.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = c(e)));
        let n = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            v.definition.url
                .replace(`{proyecto}`, n.proyecto.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (v.post = (e, t) => ({ url: v.url(e, t), method: `post` })));
var y = (e, t) => ({ action: v.url(e, t), method: `post` });
((y.post = (e, t) => ({ action: v.url(e, t), method: `post` })), (v.form = y));
var b = (e, t) => ({ url: b.url(e, t), method: `delete` });
((b.definition = {
    methods: [`delete`],
    url: `/proyectos/{proyecto}/actividades/{actividad}`,
}),
    (b.url = (e, t) => {
        (Array.isArray(e) && (e = { proyecto: e[0], actividad: e[1] }),
            (e = c(e)));
        let n = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
            actividad:
                typeof e.actividad == `object` ? e.actividad.id : e.actividad,
        };
        return (
            b.definition.url
                .replace(`{proyecto}`, n.proyecto.toString())
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (b.delete = (e, t) => ({ url: b.url(e, t), method: `delete` })));
var x = (e, t) => ({
    action: b.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((x.delete = (e, t) => ({
    action: b.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (b.form = x));
var Be = { store: v, destroy: b },
    S = s();
function C(e) {
    let t = (0, ze.c)(7),
        { etiqueta: n, valor: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, S.jsx)(`dt`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: n,
          })),
          (t[0] = n),
          (t[1] = i));
    let ee = r ?? `—`,
        a;
    t[2] === ee
        ? (a = t[3])
        : ((a = (0, S.jsx)(`dd`, {
              className: `mt-0.5 text-sm`,
              children: ee,
          })),
          (t[2] = ee),
          (t[3] = a));
    let o;
    return (
        t[4] !== i || t[5] !== a
            ? ((o = (0, S.jsxs)(`div`, { children: [i, a] })),
              (t[4] = i),
              (t[5] = a),
              (t[6] = o))
            : (o = t[6]),
        o
    );
}
function Ve(e) {
    let t = (0, ze.c)(2),
        { valor: n } = e,
        r = `${Math.min(100, Math.max(0, n))}%`,
        i;
    return (
        t[0] === r
            ? (i = t[1])
            : ((i = (0, S.jsx)(`div`, {
                  className: `h-2 overflow-hidden rounded-full bg-muted`,
                  children: (0, S.jsx)(`div`, {
                      className: `h-full rounded-full bg-primary`,
                      style: { width: r },
                  }),
              })),
              (t[0] = r),
              (t[1] = i)),
        i
    );
}
function w(e) {
    let t = (0, ze.c)(215),
        { proyecto: i, permisos: a, actividadesDisponibles: o } = e,
        [s, c] = (0, Re.useState)(null),
        [le, v] = (0, Re.useState)(``),
        y = s === `observar` || s === `rechazar`,
        b;
    t[0] === i.nombre
        ? (b = t[1])
        : ((b = (0, S.jsx)(te, { title: i.nombre })),
          (t[0] = i.nombre),
          (t[1] = b));
    let x;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, S.jsx)(l, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, S.jsxs)(n, {
                  href: Ce(),
                  children: [(0, S.jsx)(ne, {}), `Volver a proyectos`],
              }),
          })),
          (t[2] = x))
        : (x = t[2]);
    let w;
    t[3] === i.nombre
        ? (w = t[4])
        : ((w = (0, S.jsx)(`h1`, {
              className: `text-2xl font-semibold`,
              children: i.nombre,
          })),
          (t[3] = i.nombre),
          (t[4] = w));
    let T;
    t[5] === i.estado
        ? (T = t[6])
        : ((T = Pe(i.estado)), (t[5] = i.estado), (t[6] = T));
    let E;
    t[7] !== i.estado_nombre || t[8] !== T
        ? ((E = (0, S.jsx)(ye, { variant: T, children: i.estado_nombre })),
          (t[7] = i.estado_nombre),
          (t[8] = T),
          (t[9] = E))
        : (E = t[9]);
    let D;
    t[10] === i.tipo
        ? (D = t[11])
        : ((D =
              i.tipo &&
              (0, S.jsx)(ye, { variant: `outline`, children: i.tipo })),
          (t[10] = i.tipo),
          (t[11] = D));
    let O;
    t[12] === i.unidad
        ? (O = t[13])
        : ((O = (0, S.jsx)(`span`, {
              className: `text-sm text-muted-foreground`,
              children: i.unidad,
          })),
          (t[12] = i.unidad),
          (t[13] = O));
    let k;
    t[14] !== E || t[15] !== D || t[16] !== O
        ? ((k = (0, S.jsxs)(`div`, {
              className: `mt-1 flex flex-wrap items-center gap-2`,
              children: [E, D, O],
          })),
          (t[14] = E),
          (t[15] = D),
          (t[16] = O),
          (t[17] = k))
        : (k = t[17]);
    let A;
    t[18] !== w || t[19] !== k
        ? ((A = (0, S.jsxs)(`div`, { children: [w, k] })),
          (t[18] = w),
          (t[19] = k),
          (t[20] = A))
        : (A = t[20]);
    let j;
    t[21] === i.id
        ? (j = t[22])
        : ((j = pe(i.id)), (t[21] = i.id), (t[22] = j));
    let Xe;
    t[23] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Xe = (0, S.jsx)(ce, {})), (t[23] = Xe))
        : (Xe = t[23]);
    let M;
    t[24] === j.url
        ? (M = t[25])
        : ((M = (0, S.jsx)(l, {
              variant: `outline`,
              asChild: !0,
              children: (0, S.jsxs)(`a`, {
                  href: j.url,
                  children: [Xe, `Informe (CSV)`],
              }),
          })),
          (t[24] = j.url),
          (t[25] = M));
    let N;
    t[26] !== a.editar || t[27] !== i.id
        ? ((N =
              a.editar &&
              (0, S.jsxs)(S.Fragment, {
                  children: [
                      (0, S.jsx)(l, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, S.jsxs)(n, {
                              href: me(i.id),
                              children: [(0, S.jsx)(de, {}), `Editar`],
                          }),
                      }),
                      (0, S.jsx)(l, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, S.jsxs)(n, {
                              href: he(i.id),
                              children: [(0, S.jsx)(Ie, {}), `Formulación`],
                          }),
                      }),
                  ],
              })),
          (t[26] = a.editar),
          (t[27] = i.id),
          (t[28] = N))
        : (N = t[28]);
    let P;
    t[29] !== a.enviar || t[30] !== i.id
        ? ((P =
              a.enviar &&
              (0, S.jsxs)(l, {
                  onClick: () =>
                      r.patch(Ne.enviar.url(i.id), {}, { preserveScroll: !0 }),
                  children: [(0, S.jsx)(se, {}), `Enviar a aprobación`],
              })),
          (t[29] = a.enviar),
          (t[30] = i.id),
          (t[31] = P))
        : (P = t[31]);
    let F;
    t[32] !== a.aprobar || t[33] !== i.id
        ? ((F =
              a.aprobar &&
              (0, S.jsxs)(S.Fragment, {
                  children: [
                      (0, S.jsxs)(l, {
                          onClick: () =>
                              r.patch(
                                  Ne.aprobar.url(i.id),
                                  {},
                                  { preserveScroll: !0 },
                              ),
                          children: [(0, S.jsx)(re, {}), `Aprobar`],
                      }),
                      (0, S.jsxs)(l, {
                          variant: `outline`,
                          onClick: () => c(`observar`),
                          children: [(0, S.jsx)(oe, {}), `Observar`],
                      }),
                      (0, S.jsxs)(l, {
                          variant: `outline`,
                          onClick: () => c(`rechazar`),
                          children: [(0, S.jsx)(ie, {}), `Rechazar`],
                      }),
                  ],
              })),
          (t[32] = a.aprobar),
          (t[33] = i.id),
          (t[34] = F))
        : (F = t[34]);
    let I;
    t[35] !== a.gestionar || t[36] !== i.estado || t[37] !== i.id
        ? ((I =
              a.gestionar &&
              (0, S.jsxs)(S.Fragment, {
                  children: [
                      i.estado === `aprobado` &&
                          (0, S.jsxs)(l, {
                              variant: `outline`,
                              onClick: () =>
                                  r.patch(
                                      Fe.iniciar.url(i.id),
                                      {},
                                      { preserveScroll: !0 },
                                  ),
                              children: [
                                  (0, S.jsx)(ae, {}),
                                  `Iniciar ejecución`,
                              ],
                          }),
                      (0, S.jsx)(l, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, S.jsxs)(n, {
                              href: _e(i.id),
                              children: [
                                  (0, S.jsx)(fe, {}),
                                  `Registrar avance`,
                              ],
                          }),
                      }),
                      i.estado === `en_ejecucion` &&
                          (0, S.jsx)(l, {
                              asChild: !0,
                              children: (0, S.jsxs)(n, {
                                  href: ge(i.id),
                                  children: [
                                      (0, S.jsx)(re, {}),
                                      `Cerrar proyecto`,
                                  ],
                              }),
                          }),
                      (0, S.jsx)(l, {
                          variant: `outline`,
                          onClick: () => c(`suspender`),
                          children: `Suspender`,
                      }),
                      (0, S.jsxs)(l, {
                          variant: `outline`,
                          onClick: () => c(`cancelar`),
                          children: [(0, S.jsx)(ie, {}), `Cancelar`],
                      }),
                  ],
              })),
          (t[35] = a.gestionar),
          (t[36] = i.estado),
          (t[37] = i.id),
          (t[38] = I))
        : (I = t[38]);
    let L;
    t[39] !== M || t[40] !== N || t[41] !== P || t[42] !== F || t[43] !== I
        ? ((L = (0, S.jsxs)(`div`, {
              className: `flex flex-wrap gap-2`,
              children: [M, N, P, F, I],
          })),
          (t[39] = M),
          (t[40] = N),
          (t[41] = P),
          (t[42] = F),
          (t[43] = I),
          (t[44] = L))
        : (L = t[44]);
    let R;
    t[45] !== L || t[46] !== A
        ? ((R = (0, S.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [A, L],
          })),
          (t[45] = L),
          (t[46] = A),
          (t[47] = R))
        : (R = t[47]);
    let Ze;
    t[48] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ze = (0, S.jsx)(d, {
              className: `pb-2`,
              children: (0, S.jsx)(u, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: `Avance físico`,
              }),
          })),
          (t[48] = Ze))
        : (Ze = t[48]);
    let z;
    t[49] === i.seguimiento.avance_fisico
        ? (z = t[50])
        : ((z = (0, S.jsxs)(p, {
              children: [
                  Ze,
                  (0, S.jsxs)(f, {
                      className: `space-y-2`,
                      children: [
                          (0, S.jsxs)(`p`, {
                              className: `text-3xl font-semibold`,
                              children: [i.seguimiento.avance_fisico, `%`],
                          }),
                          (0, S.jsx)(Ve, {
                              valor: i.seguimiento.avance_fisico,
                          }),
                      ],
                  }),
              ],
          })),
          (t[49] = i.seguimiento.avance_fisico),
          (t[50] = z));
    let Qe;
    t[51] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Qe = (0, S.jsx)(d, {
              className: `pb-2`,
              children: (0, S.jsx)(u, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: `Avance financiero`,
              }),
          })),
          (t[51] = Qe))
        : (Qe = t[51]);
    let B, V;
    t[52] === i.seguimiento.avance_financiero
        ? ((B = t[53]), (V = t[54]))
        : ((B = (0, S.jsxs)(`p`, {
              className: `text-3xl font-semibold`,
              children: [i.seguimiento.avance_financiero, `%`],
          })),
          (V = (0, S.jsx)(Ve, { valor: i.seguimiento.avance_financiero })),
          (t[52] = i.seguimiento.avance_financiero),
          (t[53] = B),
          (t[54] = V));
    let H;
    t[55] !== i.seguimiento.presupuesto_ejecutado ||
    t[56] !== i.seguimiento.presupuesto_total
        ? ((H = (0, S.jsxs)(`p`, {
              className: `text-xs text-muted-foreground`,
              children: [
                  `Q`,
                  i.seguimiento.presupuesto_ejecutado,
                  ` de Q`,
                  i.seguimiento.presupuesto_total,
              ],
          })),
          (t[55] = i.seguimiento.presupuesto_ejecutado),
          (t[56] = i.seguimiento.presupuesto_total),
          (t[57] = H))
        : (H = t[57]);
    let U;
    t[58] !== B || t[59] !== V || t[60] !== H
        ? ((U = (0, S.jsxs)(p, {
              children: [
                  Qe,
                  (0, S.jsxs)(f, {
                      className: `space-y-2`,
                      children: [B, V, H],
                  }),
              ],
          })),
          (t[58] = B),
          (t[59] = V),
          (t[60] = H),
          (t[61] = U))
        : (U = t[61]);
    let $e;
    t[62] === Symbol.for(`react.memo_cache_sentinel`)
        ? (($e = (0, S.jsx)(d, {
              className: `pb-2`,
              children: (0, S.jsx)(u, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: `Actividades cerradas`,
              }),
          })),
          (t[62] = $e))
        : ($e = t[62]);
    let W;
    t[63] === i.seguimiento.actividades_cerradas
        ? (W = t[64])
        : ((W = (0, S.jsxs)(p, {
              children: [
                  $e,
                  (0, S.jsx)(f, {
                      children: (0, S.jsx)(`p`, {
                          className: `text-3xl font-semibold`,
                          children: i.seguimiento.actividades_cerradas,
                      }),
                  }),
              ],
          })),
          (t[63] = i.seguimiento.actividades_cerradas),
          (t[64] = W));
    let et;
    t[65] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((et = (0, S.jsx)(d, {
              className: `pb-2`,
              children: (0, S.jsx)(u, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: `Beneficiarios atendidos`,
              }),
          })),
          (t[65] = et))
        : (et = t[65]);
    let G;
    t[66] === i.seguimiento.beneficiarios_actividades
        ? (G = t[67])
        : ((G = (0, S.jsxs)(p, {
              children: [
                  et,
                  (0, S.jsx)(f, {
                      children: (0, S.jsx)(`p`, {
                          className: `text-3xl font-semibold`,
                          children: i.seguimiento.beneficiarios_actividades,
                      }),
                  }),
              ],
          })),
          (t[66] = i.seguimiento.beneficiarios_actividades),
          (t[67] = G));
    let K;
    t[68] !== z || t[69] !== U || t[70] !== W || t[71] !== G
        ? ((K = (0, S.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,
              children: [z, U, W, G],
          })),
          (t[68] = z),
          (t[69] = U),
          (t[70] = W),
          (t[71] = G),
          (t[72] = K))
        : (K = t[72]);
    let tt;
    t[73] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((tt = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Datos generales` }),
          })),
          (t[73] = tt))
        : (tt = t[73]);
    let q;
    t[74] === i.responsable
        ? (q = t[75])
        : ((q = (0, S.jsx)(C, {
              etiqueta: `Responsable`,
              valor: i.responsable,
          })),
          (t[74] = i.responsable),
          (t[75] = q));
    let J;
    t[76] === i.area
        ? (J = t[77])
        : ((J = (0, S.jsx)(C, { etiqueta: `Área`, valor: i.area })),
          (t[76] = i.area),
          (t[77] = J));
    let Y;
    t[78] === i.programa
        ? (Y = t[79])
        : ((Y = (0, S.jsx)(C, { etiqueta: `Programa`, valor: i.programa })),
          (t[78] = i.programa),
          (t[79] = Y));
    let X;
    t[80] === i.linea_accion
        ? (X = t[81])
        : ((X = (0, S.jsx)(C, {
              etiqueta: `Línea de acción`,
              valor: i.linea_accion,
          })),
          (t[80] = i.linea_accion),
          (t[81] = X));
    let Z;
    t[82] === i.fecha_inicio
        ? (Z = t[83])
        : ((Z = _(i.fecha_inicio)), (t[82] = i.fecha_inicio), (t[83] = Z));
    let nt;
    t[84] === Z
        ? (nt = t[85])
        : ((nt = (0, S.jsx)(C, { etiqueta: `Inicio`, valor: Z })),
          (t[84] = Z),
          (t[85] = nt));
    let rt;
    t[86] === i.fecha_fin
        ? (rt = t[87])
        : ((rt = _(i.fecha_fin)), (t[86] = i.fecha_fin), (t[87] = rt));
    let it;
    t[88] === rt
        ? (it = t[89])
        : ((it = (0, S.jsx)(C, { etiqueta: `Finalización`, valor: rt })),
          (t[88] = rt),
          (t[89] = it));
    let at;
    t[90] !== q ||
    t[91] !== J ||
    t[92] !== Y ||
    t[93] !== X ||
    t[94] !== nt ||
    t[95] !== it
        ? ((at = (0, S.jsxs)(`dl`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [q, J, Y, X, nt, it],
          })),
          (t[90] = q),
          (t[91] = J),
          (t[92] = Y),
          (t[93] = X),
          (t[94] = nt),
          (t[95] = it),
          (t[96] = at))
        : (at = t[96]);
    let ot;
    t[97] === i.objetivo_general
        ? (ot = t[98])
        : ((ot =
              i.objetivo_general &&
              (0, S.jsxs)(`div`, {
                  children: [
                      (0, S.jsx)(`h2`, {
                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                          children: `Objetivo general`,
                      }),
                      (0, S.jsx)(`p`, {
                          className: `mt-1 text-sm`,
                          children: i.objetivo_general,
                      }),
                  ],
              })),
          (t[97] = i.objetivo_general),
          (t[98] = ot));
    let st;
    t[99] === i.objetivos
        ? (st = t[100])
        : ((st =
              i.objetivos.length > 0 &&
              (0, S.jsxs)(`div`, {
                  children: [
                      (0, S.jsx)(`h2`, {
                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                          children: `Objetivos específicos`,
                      }),
                      (0, S.jsx)(`ul`, {
                          className: `mt-1 list-disc space-y-1 pl-5 text-sm`,
                          children: i.objetivos.map(Ye),
                      }),
                  ],
              })),
          (t[99] = i.objetivos),
          (t[100] = st));
    let ct;
    t[101] === i.motivo_estado
        ? (ct = t[102])
        : ((ct =
              i.motivo_estado &&
              (0, S.jsxs)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: [`Observación: `, i.motivo_estado],
              })),
          (t[101] = i.motivo_estado),
          (t[102] = ct));
    let lt;
    t[103] !== at || t[104] !== ot || t[105] !== st || t[106] !== ct
        ? ((lt = (0, S.jsxs)(p, {
              className: `lg:col-span-2`,
              children: [
                  tt,
                  (0, S.jsxs)(f, {
                      className: `space-y-4`,
                      children: [at, ot, st, ct],
                  }),
              ],
          })),
          (t[103] = at),
          (t[104] = ot),
          (t[105] = st),
          (t[106] = ct),
          (t[107] = lt))
        : (lt = t[107]);
    let ut;
    t[108] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ut = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Indicadores` }),
          })),
          (t[108] = ut))
        : (ut = t[108]);
    let dt;
    t[109] === i.indicadores
        ? (dt = t[110])
        : ((dt = (0, S.jsxs)(p, {
              children: [
                  ut,
                  (0, S.jsx)(f, {
                      children:
                          i.indicadores.length === 0
                              ? (0, S.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin indicadores formulados.`,
                                })
                              : (0, S.jsx)(`ul`, {
                                    className: `space-y-3 text-sm`,
                                    children: i.indicadores.map(Je),
                                }),
                  }),
              ],
          })),
          (t[109] = i.indicadores),
          (t[110] = dt));
    let ft;
    t[111] !== lt || t[112] !== dt
        ? ((ft = (0, S.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [lt, dt],
          })),
          (t[111] = lt),
          (t[112] = dt),
          (t[113] = ft))
        : (ft = t[113]);
    let pt;
    t[114] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((pt = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Cronograma` }),
          })),
          (t[114] = pt))
        : (pt = t[114]);
    let mt;
    t[115] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((mt = (0, S.jsx)(ke, {
              children: (0, S.jsxs)(h, {
                  children: [
                      (0, S.jsx)(m, { children: `Tarea` }),
                      (0, S.jsx)(m, { children: `Período` }),
                      (0, S.jsx)(m, { children: `Avance` }),
                  ],
              }),
          })),
          (t[115] = mt))
        : (mt = t[115]);
    let ht;
    t[116] === i.cronograma
        ? (ht = t[117])
        : ((ht = i.cronograma.map(qe)), (t[116] = i.cronograma), (t[117] = ht));
    let gt;
    t[118] === i.cronograma.length
        ? (gt = t[119])
        : ((gt =
              i.cronograma.length === 0 &&
              (0, S.jsx)(h, {
                  children: (0, S.jsx)(g, {
                      colSpan: 3,
                      className: `py-6 text-center text-muted-foreground`,
                      children: `Sin cronograma formulado.`,
                  }),
              })),
          (t[118] = i.cronograma.length),
          (t[119] = gt));
    let _t;
    t[120] !== ht || t[121] !== gt
        ? ((_t = (0, S.jsxs)(p, {
              children: [
                  pt,
                  (0, S.jsx)(f, {
                      children: (0, S.jsxs)(je, {
                          children: [
                              mt,
                              (0, S.jsxs)(Ae, { children: [ht, gt] }),
                          ],
                      }),
                  }),
              ],
          })),
          (t[120] = ht),
          (t[121] = gt),
          (t[122] = _t))
        : (_t = t[122]);
    let vt;
    t[123] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((vt = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Presupuesto` }),
          })),
          (t[123] = vt))
        : (vt = t[123]);
    let yt;
    t[124] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((yt = (0, S.jsx)(ke, {
              children: (0, S.jsxs)(h, {
                  children: [
                      (0, S.jsx)(m, { children: `Renglón` }),
                      (0, S.jsx)(m, { children: `Subtotal` }),
                      (0, S.jsx)(m, { children: `Ejecutado` }),
                  ],
              }),
          })),
          (t[124] = yt))
        : (yt = t[124]);
    let bt;
    t[125] === i.presupuesto
        ? (bt = t[126])
        : ((bt = i.presupuesto.map(Ke)),
          (t[125] = i.presupuesto),
          (t[126] = bt));
    let xt;
    t[127] === i.presupuesto.length
        ? (xt = t[128])
        : ((xt =
              i.presupuesto.length === 0 &&
              (0, S.jsx)(h, {
                  children: (0, S.jsx)(g, {
                      colSpan: 3,
                      className: `py-6 text-center text-muted-foreground`,
                      children: `Sin presupuesto formulado.`,
                  }),
              })),
          (t[127] = i.presupuesto.length),
          (t[128] = xt));
    let St;
    t[129] !== bt || t[130] !== xt
        ? ((St = (0, S.jsxs)(p, {
              children: [
                  vt,
                  (0, S.jsx)(f, {
                      children: (0, S.jsxs)(je, {
                          children: [
                              yt,
                              (0, S.jsxs)(Ae, { children: [bt, xt] }),
                          ],
                      }),
                  }),
              ],
          })),
          (t[129] = bt),
          (t[130] = xt),
          (t[131] = St))
        : (St = t[131]);
    let Ct;
    t[132] !== _t || t[133] !== St
        ? ((Ct = (0, S.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2`,
              children: [_t, St],
          })),
          (t[132] = _t),
          (t[133] = St),
          (t[134] = Ct))
        : (Ct = t[134]);
    let wt;
    t[135] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((wt = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Actividades vinculadas` }),
          })),
          (t[135] = wt))
        : (wt = t[135]);
    let Tt;
    t[136] !== le || t[137] !== o || t[138] !== a.gestionar || t[139] !== i.id
        ? ((Tt =
              a.gestionar &&
              o.length > 0 &&
              (0, S.jsx)(ee, {
                  ...Be.store.form(i.id),
                  options: { preserveScroll: !0 },
                  onSuccess: () => v(``),
                  className: `flex flex-wrap items-end gap-2`,
                  children: (e) => {
                      let { processing: t, errors: n } = e;
                      return (0, S.jsxs)(S.Fragment, {
                          children: [
                              (0, S.jsxs)(`div`, {
                                  className: `grid gap-1`,
                                  children: [
                                      (0, S.jsx)(De, {
                                          htmlFor: `actividad_id`,
                                          className: `text-xs`,
                                          children: `Actividad de la unidad`,
                                      }),
                                      (0, S.jsxs)(`select`, {
                                          id: `actividad_id`,
                                          name: `actividad_id`,
                                          value: le,
                                          onChange: (e) => v(e.target.value),
                                          className: `h-9 w-80 rounded-md border border-input bg-transparent px-3 text-sm`,
                                          children: [
                                              (0, S.jsx)(`option`, {
                                                  value: ``,
                                                  children: `Seleccione una actividad`,
                                              }),
                                              o.map(Ge),
                                          ],
                                      }),
                                      (0, S.jsx)(Ee, {
                                          message: n.actividad_id,
                                      }),
                                  ],
                              }),
                              (0, S.jsxs)(l, {
                                  type: `submit`,
                                  variant: `outline`,
                                  disabled: t || !le,
                                  children: [
                                      t && (0, S.jsx)(Oe, {}),
                                      (0, S.jsx)(ue, {}),
                                      `Vincular`,
                                  ],
                              }),
                          ],
                      });
                  },
              })),
          (t[136] = le),
          (t[137] = o),
          (t[138] = a.gestionar),
          (t[139] = i.id),
          (t[140] = Tt))
        : (Tt = t[140]);
    let Et, Dt, Ot;
    t[141] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Et = (0, S.jsx)(m, { children: `Fecha` })),
          (Dt = (0, S.jsx)(m, { children: `Actividad` })),
          (Ot = (0, S.jsx)(m, { children: `Estado` })),
          (t[141] = Et),
          (t[142] = Dt),
          (t[143] = Ot))
        : ((Et = t[141]), (Dt = t[142]), (Ot = t[143]));
    let kt;
    t[144] === a.gestionar
        ? (kt = t[145])
        : ((kt =
              a.gestionar &&
              (0, S.jsx)(m, { className: `text-right`, children: `Acciones` })),
          (t[144] = a.gestionar),
          (t[145] = kt));
    let At;
    t[146] === kt
        ? (At = t[147])
        : ((At = (0, S.jsx)(ke, {
              children: (0, S.jsxs)(h, { children: [Et, Dt, Ot, kt] }),
          })),
          (t[146] = kt),
          (t[147] = At));
    let jt;
    if (t[148] !== a.gestionar || t[149] !== i.actividades || t[150] !== i.id) {
        let e;
        (t[152] !== a.gestionar || t[153] !== i.id
            ? ((e = (e) =>
                  (0, S.jsxs)(
                      h,
                      {
                          children: [
                              (0, S.jsx)(g, { children: _(e.fecha) }),
                              (0, S.jsx)(g, {
                                  className: `font-medium`,
                                  children: e.nombre,
                              }),
                              (0, S.jsx)(g, {
                                  children: (0, S.jsx)(ye, {
                                      variant: `secondary`,
                                      children: e.estado_nombre,
                                  }),
                              }),
                              a.gestionar &&
                                  (0, S.jsx)(g, {
                                      className: `text-right`,
                                      children: (0, S.jsxs)(l, {
                                          variant: `ghost`,
                                          size: `sm`,
                                          onClick: () =>
                                              r.delete(
                                                  Be.destroy.url({
                                                      proyecto: i.id,
                                                      actividad: e.id,
                                                  }),
                                                  { preserveScroll: !0 },
                                              ),
                                          children: [
                                              (0, S.jsx)(Le, {}),
                                              `Desvincular`,
                                          ],
                                      }),
                                  }),
                          ],
                      },
                      e.id,
                  )),
              (t[152] = a.gestionar),
              (t[153] = i.id),
              (t[154] = e))
            : (e = t[154]),
            (jt = i.actividades.map(e)),
            (t[148] = a.gestionar),
            (t[149] = i.actividades),
            (t[150] = i.id),
            (t[151] = jt));
    } else jt = t[151];
    let Mt;
    t[155] !== a.gestionar || t[156] !== i.actividades.length
        ? ((Mt =
              i.actividades.length === 0 &&
              (0, S.jsx)(h, {
                  children: (0, S.jsx)(g, {
                      colSpan: a.gestionar ? 4 : 3,
                      className: `py-6 text-center text-muted-foreground`,
                      children: `El proyecto todavía no tiene actividades vinculadas.`,
                  }),
              })),
          (t[155] = a.gestionar),
          (t[156] = i.actividades.length),
          (t[157] = Mt))
        : (Mt = t[157]);
    let Nt;
    t[158] !== jt || t[159] !== Mt
        ? ((Nt = (0, S.jsxs)(Ae, { children: [jt, Mt] })),
          (t[158] = jt),
          (t[159] = Mt),
          (t[160] = Nt))
        : (Nt = t[160]);
    let Q;
    t[161] !== At || t[162] !== Nt
        ? ((Q = (0, S.jsxs)(je, { children: [At, Nt] })),
          (t[161] = At),
          (t[162] = Nt),
          (t[163] = Q))
        : (Q = t[163]);
    let Pt;
    t[164] !== Tt || t[165] !== Q
        ? ((Pt = (0, S.jsxs)(p, {
              children: [
                  wt,
                  (0, S.jsxs)(f, { className: `space-y-4`, children: [Tt, Q] }),
              ],
          })),
          (t[164] = Tt),
          (t[165] = Q),
          (t[166] = Pt))
        : (Pt = t[166]);
    let Ft;
    t[167] !== i.estado ||
    t[168] !== i.evidencias ||
    t[169] !== i.lecciones_aprendidas ||
    t[170] !== i.productos ||
    t[171] !== i.resultados
        ? ((Ft =
              i.estado === `cerrado` &&
              (0, S.jsxs)(p, {
                  children: [
                      (0, S.jsx)(d, {
                          children: (0, S.jsx)(u, { children: `Cierre` }),
                      }),
                      (0, S.jsxs)(f, {
                          className: `space-y-4 text-sm`,
                          children: [
                              (0, S.jsxs)(`div`, {
                                  children: [
                                      (0, S.jsx)(`h2`, {
                                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                                          children: `Resultados`,
                                      }),
                                      (0, S.jsx)(`p`, {
                                          className: `mt-1 whitespace-pre-line`,
                                          children: i.resultados,
                                      }),
                                  ],
                              }),
                              i.productos &&
                                  (0, S.jsxs)(`div`, {
                                      children: [
                                          (0, S.jsx)(`h2`, {
                                              className: `text-xs tracking-wide text-muted-foreground uppercase`,
                                              children: `Productos`,
                                          }),
                                          (0, S.jsx)(`p`, {
                                              className: `mt-1 whitespace-pre-line`,
                                              children: i.productos,
                                          }),
                                      ],
                                  }),
                              i.lecciones_aprendidas &&
                                  (0, S.jsxs)(`div`, {
                                      children: [
                                          (0, S.jsx)(`h2`, {
                                              className: `text-xs tracking-wide text-muted-foreground uppercase`,
                                              children: `Lecciones aprendidas`,
                                          }),
                                          (0, S.jsx)(`p`, {
                                              className: `mt-1 whitespace-pre-line`,
                                              children: i.lecciones_aprendidas,
                                          }),
                                      ],
                                  }),
                              i.evidencias.length > 0 &&
                                  (0, S.jsx)(`div`, {
                                      className: `flex flex-wrap gap-2`,
                                      children: i.evidencias.map(We),
                                  }),
                          ],
                      }),
                  ],
              })),
          (t[167] = i.estado),
          (t[168] = i.evidencias),
          (t[169] = i.lecciones_aprendidas),
          (t[170] = i.productos),
          (t[171] = i.resultados),
          (t[172] = Ft))
        : (Ft = t[172]);
    let It;
    t[173] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((It = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Avances registrados` }),
          })),
          (t[173] = It))
        : (It = t[173]);
    let Lt;
    t[174] === i.avances
        ? (Lt = t[175])
        : ((Lt = (0, S.jsxs)(p, {
              children: [
                  It,
                  (0, S.jsx)(f, {
                      children:
                          i.avances.length === 0
                              ? (0, S.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Todavía no se registran avances.`,
                                })
                              : (0, S.jsx)(`ul`, {
                                    className: `space-y-4 text-sm`,
                                    children: i.avances.map(Ue),
                                }),
                  }),
              ],
          })),
          (t[174] = i.avances),
          (t[175] = Lt));
    let Rt;
    t[176] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Rt = (0, S.jsx)(d, {
              children: (0, S.jsx)(u, { children: `Historial` }),
          })),
          (t[176] = Rt))
        : (Rt = t[176]);
    let zt;
    t[177] === i.revisiones
        ? (zt = t[178])
        : ((zt = (0, S.jsxs)(p, {
              children: [
                  Rt,
                  (0, S.jsx)(f, {
                      children:
                          i.revisiones.length === 0
                              ? (0, S.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin movimientos registrados.`,
                                })
                              : (0, S.jsx)(`ul`, {
                                    className: `space-y-3 text-sm`,
                                    children: i.revisiones.map(He),
                                }),
                  }),
              ],
          })),
          (t[177] = i.revisiones),
          (t[178] = zt));
    let Bt;
    t[179] !== Lt || t[180] !== zt
        ? ((Bt = (0, S.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2`,
              children: [Lt, zt],
          })),
          (t[179] = Lt),
          (t[180] = zt),
          (t[181] = Bt))
        : (Bt = t[181]);
    let Vt;
    t[182] !== R ||
    t[183] !== K ||
    t[184] !== ft ||
    t[185] !== Ct ||
    t[186] !== Pt ||
    t[187] !== Ft ||
    t[188] !== Bt
        ? ((Vt = (0, S.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [x, R, K, ft, Ct, Pt, Ft, Bt],
          })),
          (t[182] = R),
          (t[183] = K),
          (t[184] = ft),
          (t[185] = Ct),
          (t[186] = Pt),
          (t[187] = Ft),
          (t[188] = Bt),
          (t[189] = Vt))
        : (Vt = t[189]);
    let Ht = s !== null,
        Ut;
    t[190] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ut = (e) => !e && c(null)), (t[190] = Ut))
        : (Ut = t[190]);
    let Wt = s === `observar` && `Observar proyecto`,
        Gt = s === `rechazar` && `Rechazar proyecto`,
        Kt = s === `suspender` && `Suspender proyecto`,
        qt = s === `cancelar` && `Cancelar proyecto`,
        Jt;
    t[191] !== Wt || t[192] !== Gt || t[193] !== Kt || t[194] !== qt
        ? ((Jt = (0, S.jsxs)(Te, { children: [Wt, Gt, Kt, qt] })),
          (t[191] = Wt),
          (t[192] = Gt),
          (t[193] = Kt),
          (t[194] = qt),
          (t[195] = Jt))
        : (Jt = t[195]);
    let Yt = y
            ? `El comentario queda en el historial y vuelve a la unidad.`
            : `Indique el motivo; queda registrado en el historial.`,
        Xt;
    t[196] === Yt
        ? (Xt = t[197])
        : ((Xt = (0, S.jsx)(we, { children: Yt })),
          (t[196] = Yt),
          (t[197] = Xt));
    let Zt;
    t[198] !== Jt || t[199] !== Xt
        ? ((Zt = (0, S.jsxs)(xe, { children: [Jt, Xt] })),
          (t[198] = Jt),
          (t[199] = Xt),
          (t[200] = Zt))
        : (Zt = t[200]);
    let Qt;
    t[201] !== s || t[202] !== y || t[203] !== i.id
        ? ((Qt =
              s !== null &&
              (0, S.jsx)(ee, {
                  ...(s === `observar`
                      ? Ne.observar.form(i.id)
                      : s === `rechazar`
                        ? Ne.rechazar.form(i.id)
                        : s === `suspender`
                          ? Fe.suspender.form(i.id)
                          : Fe.cancelar.form(i.id)),
                  options: { preserveScroll: !0 },
                  onSuccess: () => c(null),
                  className: `space-y-4`,
                  children: (e) => {
                      let { processing: t, errors: n } = e;
                      return (0, S.jsxs)(S.Fragment, {
                          children: [
                              (0, S.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, S.jsx)(De, {
                                          htmlFor: y ? `comentario` : `motivo`,
                                          children: y ? `Comentario` : `Motivo`,
                                      }),
                                      (0, S.jsx)(Me, {
                                          id: y ? `comentario` : `motivo`,
                                          name: y ? `comentario` : `motivo`,
                                          rows: 3,
                                          required: !0,
                                      }),
                                      (0, S.jsx)(Ee, {
                                          message: y ? n.comentario : n.motivo,
                                      }),
                                  ],
                              }),
                              (0, S.jsxs)(ve, {
                                  children: [
                                      (0, S.jsx)(l, {
                                          type: `button`,
                                          variant: `outline`,
                                          onClick: () => c(null),
                                          children: `Cerrar`,
                                      }),
                                      (0, S.jsxs)(l, {
                                          type: `submit`,
                                          disabled: t,
                                          children: [
                                              t && (0, S.jsx)(Oe, {}),
                                              `Confirmar`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      });
                  },
              })),
          (t[201] = s),
          (t[202] = y),
          (t[203] = i.id),
          (t[204] = Qt))
        : (Qt = t[204]);
    let $;
    t[205] !== Zt || t[206] !== Qt
        ? (($ = (0, S.jsxs)(Se, { children: [Zt, Qt] })),
          (t[205] = Zt),
          (t[206] = Qt),
          (t[207] = $))
        : ($ = t[207]);
    let $t;
    t[208] !== Ht || t[209] !== $
        ? (($t = (0, S.jsx)(be, { open: Ht, onOpenChange: Ut, children: $ })),
          (t[208] = Ht),
          (t[209] = $),
          (t[210] = $t))
        : ($t = t[210]);
    let en;
    return (
        t[211] !== b || t[212] !== Vt || t[213] !== $t
            ? ((en = (0, S.jsxs)(S.Fragment, { children: [b, Vt, $t] })),
              (t[211] = b),
              (t[212] = Vt),
              (t[213] = $t),
              (t[214] = en))
            : (en = t[214]),
        en
    );
}
function He(e) {
    return (0, S.jsxs)(
        `li`,
        {
            children: [
                (0, S.jsx)(`span`, {
                    className: `font-medium`,
                    children: e.accion,
                }),
                (0, S.jsxs)(`span`, {
                    className: `block text-xs text-muted-foreground`,
                    children: [e.usuario, ` ·`, ` `, e.fecha],
                }),
                e.comentario &&
                    (0, S.jsx)(`p`, {
                        className: `mt-1 text-muted-foreground`,
                        children: e.comentario,
                    }),
            ],
        },
        e.id,
    );
}
function Ue(e) {
    return (0, S.jsxs)(
        `li`,
        {
            children: [
                (0, S.jsxs)(`div`, {
                    className: `flex items-center justify-between`,
                    children: [
                        (0, S.jsx)(`span`, {
                            className: `font-medium`,
                            children: _(e.fecha),
                        }),
                        (0, S.jsxs)(`span`, {
                            className: `tabular-nums`,
                            children: [e.porcentaje, `%`],
                        }),
                    ],
                }),
                (0, S.jsx)(`p`, {
                    className: `text-muted-foreground`,
                    children: e.descripcion,
                }),
                e.evidencias.length > 0 &&
                    (0, S.jsx)(`div`, {
                        className: `mt-1 flex flex-wrap gap-2`,
                        children: e.evidencias.map(T),
                    }),
            ],
        },
        e.id,
    );
}
function T(e) {
    return (0, S.jsx)(
        `a`,
        {
            href: e.enlace ?? `#`,
            target: `_blank`,
            rel: `noopener noreferrer`,
            className: `text-xs underline`,
            children: e.nombre ?? `Evidencia`,
        },
        e.id,
    );
}
function We(e) {
    return (0, S.jsx)(
        l,
        {
            variant: `outline`,
            size: `sm`,
            asChild: !0,
            children: (0, S.jsxs)(`a`, {
                href: e.enlace ?? `#`,
                target: `_blank`,
                rel: `noopener noreferrer`,
                children: [(0, S.jsx)(le, {}), e.nombre ?? `Evidencia`],
            }),
        },
        e.id,
    );
}
function Ge(e) {
    return (0, S.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
function Ke(e) {
    return (0, S.jsxs)(
        h,
        {
            children: [
                (0, S.jsxs)(g, {
                    children: [
                        e.descripcion,
                        e.fuente &&
                            (0, S.jsx)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: e.fuente,
                            }),
                    ],
                }),
                (0, S.jsxs)(g, {
                    className: `tabular-nums`,
                    children: [`Q`, e.subtotal],
                }),
                (0, S.jsxs)(g, {
                    className: `tabular-nums`,
                    children: [`Q`, e.ejecutado],
                }),
            ],
        },
        e.id,
    );
}
function qe(e) {
    return (0, S.jsxs)(
        h,
        {
            children: [
                (0, S.jsxs)(g, {
                    children: [
                        e.tarea,
                        e.responsable &&
                            (0, S.jsx)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: e.responsable,
                            }),
                    ],
                }),
                (0, S.jsxs)(g, {
                    className: `text-xs whitespace-nowrap`,
                    children: [
                        _(e.fecha_inicio) || `—`,
                        e.fecha_fin ? ` – ${_(e.fecha_fin)}` : ``,
                    ],
                }),
                (0, S.jsxs)(g, {
                    className: `w-28`,
                    children: [
                        (0, S.jsxs)(`span`, {
                            className: `mb-1 block text-xs tabular-nums`,
                            children: [e.avance, `%`],
                        }),
                        (0, S.jsx)(Ve, { valor: e.avance }),
                    ],
                }),
            ],
        },
        e.id,
    );
}
function Je(e) {
    return (0, S.jsxs)(
        `li`,
        {
            children: [
                (0, S.jsx)(`span`, { className: `block`, children: e.nombre }),
                (0, S.jsxs)(`span`, {
                    className: `text-muted-foreground`,
                    children: [
                        `Meta: `,
                        e.meta ?? `—`,
                        ` · Final:`,
                        ` `,
                        e.valor_final ?? `—`,
                        ` · Actividades:`,
                        ` `,
                        e.aporte_actividades,
                    ],
                }),
            ],
        },
        e.id,
    );
}
function Ye(e) {
    return (0, S.jsx)(`li`, { children: e }, e);
}
w.layout = { breadcrumbs: [{ title: `Proyectos`, href: Ce() }] };
export { w as default };
