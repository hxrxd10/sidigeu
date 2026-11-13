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
import { t as re } from './calendar-plus-CIcNb-DH.js';
import { t as ie } from './circle-check-CQR1GVzd.js';
import { i as ae, n as oe, r as se, t as ce } from './send-L2kvjkbS.js';
import { t as le } from './external-link-jeG1UvmS.js';
import { t as ue } from './pencil-Bbeg0ISb.js';
import {
    Tt as de,
    c as fe,
    f as pe,
    i as me,
    l as he,
    nt as ge,
    o as _e,
    ot as ve,
    rt as ye,
    s as be,
    u as xe,
} from './app-Bu9EFUG6.js';
import { t as Se } from './input-error-Bxj_sbd5.js';
import { a as Ce, i as we, n as Te, t as Ee } from './card-Bc3dRGP7.js';
import { t as De } from './label-D0AQUEbO.js';
import { t as Oe } from './spinner-DtbIIn34.js';
import {
    a as ke,
    i as Ae,
    n as je,
    o as Me,
    r as u,
    t as Ne,
} from './table-D3mJxxJl.js';
import { t as Pe } from './textarea-DtbS5QwL.js';
import { n as Fe, t as Ie } from './fecha-D8mdgCgw.js';
import { colorEstado as Le } from './actividades-D3_YFFSB.js';
import { t as Re } from './RevisionActividadController-C1egXfE7.js';
var ze = o(`CalendarClock`, [
        [
            `path`,
            {
                d: `M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5`,
                key: `1osxxc`,
            },
        ],
        [`path`, { d: `M16 2v4`, key: `4m81vk` }],
        [`path`, { d: `M8 2v4`, key: `1cmpym` }],
        [`path`, { d: `M3 10h5`, key: `r794hk` }],
        [`path`, { d: `M17.5 17.5 16 16.3V14`, key: `akvzfd` }],
        [`circle`, { cx: `16`, cy: `16`, r: `6`, key: `qoo3c4` }],
    ]),
    Be = o(`CalendarOff`, [
        [
            `path`,
            {
                d: `M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18`,
                key: `16swn3`,
            },
        ],
        [`path`, { d: `M21 15.5V6a2 2 0 0 0-2-2H9.5`, key: `yhw86o` }],
        [`path`, { d: `M16 2v4`, key: `4m81vk` }],
        [`path`, { d: `M3 10h7`, key: `1wap6i` }],
        [`path`, { d: `M21 10h-5.5`, key: `quycpq` }],
        [`path`, { d: `m2 2 20 20`, key: `1ooewy` }],
    ]),
    Ve = e(i(), 1),
    He = t(),
    d = (e, t) => ({ url: d.url(e, t), method: `patch` });
((d.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/iniciar`,
}),
    (d.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { actividad: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { actividad: e.id }),
            Array.isArray(e) && (e = { actividad: e[0] }),
            (e = c(e)));
        let n = {
            actividad:
                typeof e.actividad == `object` ? e.actividad.id : e.actividad,
        };
        return (
            d.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (d.patch = (e, t) => ({ url: d.url(e, t), method: `patch` })));
var f = (e, t) => ({
    action: d.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((f.patch = (e, t) => ({
    action: d.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (d.form = f));
var p = (e, t) => ({ url: p.url(e, t), method: `patch` });
((p.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/reprogramar`,
}),
    (p.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { actividad: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { actividad: e.id }),
            Array.isArray(e) && (e = { actividad: e[0] }),
            (e = c(e)));
        let n = {
            actividad:
                typeof e.actividad == `object` ? e.actividad.id : e.actividad,
        };
        return (
            p.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (p.patch = (e, t) => ({ url: p.url(e, t), method: `patch` })));
var m = (e, t) => ({
    action: p.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((m.patch = (e, t) => ({
    action: p.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (p.form = m));
var h = (e, t) => ({ url: h.url(e, t), method: `patch` });
((h.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/cancelar`,
}),
    (h.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { actividad: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { actividad: e.id }),
            Array.isArray(e) && (e = { actividad: e[0] }),
            (e = c(e)));
        let n = {
            actividad:
                typeof e.actividad == `object` ? e.actividad.id : e.actividad,
        };
        return (
            h.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (h.patch = (e, t) => ({ url: h.url(e, t), method: `patch` })));
var g = (e, t) => ({
    action: h.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((g.patch = (e, t) => ({
    action: h.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (h.form = g));
var Ue = { iniciar: d, reprogramar: p, cancelar: h },
    _ = s();
function v(e) {
    let t = (0, He.c)(7),
        { etiqueta: n, valor: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, _.jsx)(`dt`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: n,
          })),
          (t[0] = n),
          (t[1] = i));
    let ee = r ?? `—`,
        a;
    t[2] === ee
        ? (a = t[3])
        : ((a = (0, _.jsx)(`dd`, {
              className: `mt-0.5 text-sm`,
              children: ee,
          })),
          (t[2] = ee),
          (t[3] = a));
    let o;
    return (
        t[4] !== i || t[5] !== a
            ? ((o = (0, _.jsxs)(`div`, { children: [i, a] })),
              (t[4] = i),
              (t[5] = a),
              (t[6] = o))
            : (o = t[6]),
        o
    );
}
function y(e) {
    let t = (0, He.c)(142),
        { actividad: i, permisos: a } = e,
        [o, s] = (0, Ve.useState)(null),
        c;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((c = () => s(null)), (t[0] = c))
        : (c = t[0]);
    let le = c,
        u;
    t[1] === i.nombre
        ? (u = t[2])
        : ((u = (0, _.jsx)(te, { title: i.nombre })),
          (t[1] = i.nombre),
          (t[2] = u));
    let d;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = (0, _.jsx)(l, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, _.jsxs)(n, {
                  href: ye(),
                  children: [(0, _.jsx)(ne, {}), `Volver a la programación`],
              }),
          })),
          (t[3] = d))
        : (d = t[3]);
    let f;
    t[4] === i.nombre
        ? (f = t[5])
        : ((f = (0, _.jsx)(`h1`, {
              className: `text-2xl font-semibold`,
              children: i.nombre,
          })),
          (t[4] = i.nombre),
          (t[5] = f));
    let p;
    t[6] === i.estado
        ? (p = t[7])
        : ((p = Le(i.estado)), (t[6] = i.estado), (t[7] = p));
    let m;
    t[8] !== i.estado_nombre || t[9] !== p
        ? ((m = (0, _.jsx)(pe, { variant: p, children: i.estado_nombre })),
          (t[8] = i.estado_nombre),
          (t[9] = p),
          (t[10] = m))
        : (m = t[10]);
    let h;
    t[11] === i.tipo
        ? (h = t[12])
        : ((h = (0, _.jsx)(pe, { variant: `outline`, children: i.tipo })),
          (t[11] = i.tipo),
          (t[12] = h));
    let g;
    t[13] === i.unidad
        ? (g = t[14])
        : ((g = (0, _.jsx)(`span`, {
              className: `text-sm text-muted-foreground`,
              children: i.unidad,
          })),
          (t[13] = i.unidad),
          (t[14] = g));
    let y;
    t[15] !== m || t[16] !== h || t[17] !== g
        ? ((y = (0, _.jsxs)(`div`, {
              className: `mt-1 flex flex-wrap items-center gap-2`,
              children: [m, h, g],
          })),
          (t[15] = m),
          (t[16] = h),
          (t[17] = g),
          (t[18] = y))
        : (y = t[18]);
    let b;
    t[19] !== f || t[20] !== y
        ? ((b = (0, _.jsxs)(`div`, { children: [f, y] })),
          (t[19] = f),
          (t[20] = y),
          (t[21] = b))
        : (b = t[21]);
    let x;
    t[22] !== i.id || t[23] !== a.editar
        ? ((x =
              a.editar &&
              (0, _.jsx)(l, {
                  variant: `outline`,
                  asChild: !0,
                  children: (0, _.jsxs)(n, {
                      href: ge(i.id),
                      children: [(0, _.jsx)(ue, {}), `Editar`],
                  }),
              })),
          (t[22] = i.id),
          (t[23] = a.editar),
          (t[24] = x))
        : (x = t[24]);
    let S;
    t[25] !== i.id || t[26] !== a.enviar
        ? ((S =
              a.enviar &&
              (0, _.jsxs)(l, {
                  onClick: () =>
                      r.patch(Re.enviar.url(i.id), {}, { preserveScroll: !0 }),
                  children: [(0, _.jsx)(ce, {}), `Enviar a revisión`],
              })),
          (t[25] = i.id),
          (t[26] = a.enviar),
          (t[27] = S))
        : (S = t[27]);
    let C;
    t[28] !== i.id || t[29] !== a.validar
        ? ((C =
              a.validar &&
              (0, _.jsxs)(_.Fragment, {
                  children: [
                      (0, _.jsxs)(l, {
                          onClick: () =>
                              r.patch(
                                  Re.validar.url(i.id),
                                  {},
                                  { preserveScroll: !0 },
                              ),
                          children: [(0, _.jsx)(ie, {}), `Validar`],
                      }),
                      (0, _.jsxs)(l, {
                          variant: `outline`,
                          onClick: () => s(`observar`),
                          children: [(0, _.jsx)(se, {}), `Observar`],
                      }),
                      (0, _.jsxs)(l, {
                          variant: `outline`,
                          onClick: () => s(`rechazar`),
                          children: [(0, _.jsx)(ae, {}), `Rechazar`],
                      }),
                  ],
              })),
          (t[28] = i.id),
          (t[29] = a.validar),
          (t[30] = C))
        : (C = t[30]);
    let w;
    t[31] !== i.id || t[32] !== a.publicarAgenda
        ? ((w =
              a.publicarAgenda &&
              (0, _.jsxs)(l, {
                  variant: `outline`,
                  onClick: () =>
                      r.patch(
                          Re.publicarAgenda.url(i.id),
                          {},
                          { preserveScroll: !0 },
                      ),
                  children: [(0, _.jsx)(re, {}), `Publicar en la agenda`],
              })),
          (t[31] = i.id),
          (t[32] = a.publicarAgenda),
          (t[33] = w))
        : (w = t[33]);
    let T;
    t[34] !== i.id || t[35] !== a.quitarAgenda
        ? ((T =
              a.quitarAgenda &&
              (0, _.jsxs)(l, {
                  variant: `outline`,
                  onClick: () =>
                      r.patch(
                          Re.quitarAgenda.url(i.id),
                          {},
                          { preserveScroll: !0 },
                      ),
                  children: [(0, _.jsx)(Be, {}), `Quitar de la agenda`],
              })),
          (t[34] = i.id),
          (t[35] = a.quitarAgenda),
          (t[36] = T))
        : (T = t[36]);
    let E;
    t[37] !== i.estado || t[38] !== i.id || t[39] !== a.gestionar
        ? ((E =
              a.gestionar &&
              (0, _.jsxs)(_.Fragment, {
                  children: [
                      [`validada`, `publicada_agenda`, `reprogramada`].includes(
                          i.estado,
                      ) &&
                          (0, _.jsxs)(_.Fragment, {
                              children: [
                                  (0, _.jsxs)(l, {
                                      variant: `outline`,
                                      onClick: () =>
                                          r.patch(
                                              Ue.iniciar.url(i.id),
                                              {},
                                              { preserveScroll: !0 },
                                          ),
                                      children: [
                                          (0, _.jsx)(oe, {}),
                                          `Iniciar ejecución`,
                                      ],
                                  }),
                                  (0, _.jsxs)(l, {
                                      variant: `outline`,
                                      onClick: () => s(`reprogramar`),
                                      children: [
                                          (0, _.jsx)(ze, {}),
                                          `Reprogramar`,
                                      ],
                                  }),
                              ],
                          }),
                      i.estado === `en_ejecucion` &&
                          (0, _.jsx)(l, {
                              asChild: !0,
                              children: (0, _.jsxs)(n, {
                                  href: ve(i.id),
                                  children: [
                                      (0, _.jsx)(ie, {}),
                                      `Cerrar actividad`,
                                  ],
                              }),
                          }),
                      (0, _.jsxs)(l, {
                          variant: `outline`,
                          onClick: () => s(`cancelar`),
                          children: [(0, _.jsx)(ae, {}), `Cancelar`],
                      }),
                  ],
              })),
          (t[37] = i.estado),
          (t[38] = i.id),
          (t[39] = a.gestionar),
          (t[40] = E))
        : (E = t[40]);
    let D;
    t[41] !== x ||
    t[42] !== S ||
    t[43] !== C ||
    t[44] !== w ||
    t[45] !== T ||
    t[46] !== E
        ? ((D = (0, _.jsxs)(`div`, {
              className: `flex flex-wrap gap-2`,
              children: [x, S, C, w, T, E],
          })),
          (t[41] = x),
          (t[42] = S),
          (t[43] = C),
          (t[44] = w),
          (t[45] = T),
          (t[46] = E),
          (t[47] = D))
        : (D = t[47]);
    let O;
    t[48] !== b || t[49] !== D
        ? ((O = (0, _.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [b, D],
          })),
          (t[48] = b),
          (t[49] = D),
          (t[50] = O))
        : (O = t[50]);
    let Xe;
    t[51] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Xe = (0, _.jsx)(we, {
              children: (0, _.jsx)(Ce, { children: `Programación` }),
          })),
          (t[51] = Xe))
        : (Xe = t[51]);
    let k;
    t[52] === i.fecha
        ? (k = t[53])
        : ((k = Fe(i.fecha)), (t[52] = i.fecha), (t[53] = k));
    let A;
    t[54] === k
        ? (A = t[55])
        : ((A = (0, _.jsx)(v, { etiqueta: `Fecha`, valor: k })),
          (t[54] = k),
          (t[55] = A));
    let Ze = i.hora_inicio ? `${i.hora_inicio} – ${i.hora_fin ?? ``}` : null,
        j;
    t[56] === Ze
        ? (j = t[57])
        : ((j = (0, _.jsx)(v, { etiqueta: `Horario`, valor: Ze })),
          (t[56] = Ze),
          (t[57] = j));
    let M;
    t[58] === i.lugar
        ? (M = t[59])
        : ((M = (0, _.jsx)(v, { etiqueta: `Lugar`, valor: i.lugar })),
          (t[58] = i.lugar),
          (t[59] = M));
    let N;
    t[60] === i.responsable
        ? (N = t[61])
        : ((N = (0, _.jsx)(v, {
              etiqueta: `Responsable`,
              valor: i.responsable,
          })),
          (t[60] = i.responsable),
          (t[61] = N));
    let P;
    t[62] === i.linea_accion
        ? (P = t[63])
        : ((P = (0, _.jsx)(v, {
              etiqueta: `Línea de acción`,
              valor: i.linea_accion,
          })),
          (t[62] = i.linea_accion),
          (t[63] = P));
    let Qe = i.publicar_agenda ? `Publicada` : `No publicada`,
        F;
    t[64] === Qe
        ? (F = t[65])
        : ((F = (0, _.jsx)(v, { etiqueta: `Agenda Cultural`, valor: Qe })),
          (t[64] = Qe),
          (t[65] = F));
    let I;
    t[66] !== A ||
    t[67] !== j ||
    t[68] !== M ||
    t[69] !== N ||
    t[70] !== P ||
    t[71] !== F
        ? ((I = (0, _.jsxs)(`dl`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [A, j, M, N, P, F],
          })),
          (t[66] = A),
          (t[67] = j),
          (t[68] = M),
          (t[69] = N),
          (t[70] = P),
          (t[71] = F),
          (t[72] = I))
        : (I = t[72]);
    let L;
    t[73] === i.descripcion
        ? (L = t[74])
        : ((L =
              i.descripcion &&
              (0, _.jsx)(`p`, {
                  className: `text-sm whitespace-pre-line`,
                  children: i.descripcion,
              })),
          (t[73] = i.descripcion),
          (t[74] = L));
    let R;
    t[75] === i.publicos
        ? (R = t[76])
        : ((R =
              i.publicos.length > 0 &&
              (0, _.jsx)(`div`, {
                  className: `flex flex-wrap gap-1`,
                  children: i.publicos.map(Ye),
              })),
          (t[75] = i.publicos),
          (t[76] = R));
    let z;
    t[77] === i.motivo_cancelacion
        ? (z = t[78])
        : ((z =
              i.motivo_cancelacion &&
              (0, _.jsxs)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: [
                      `Motivo de cancelación:`,
                      ` `,
                      i.motivo_cancelacion,
                  ],
              })),
          (t[77] = i.motivo_cancelacion),
          (t[78] = z));
    let B;
    t[79] !== I || t[80] !== L || t[81] !== R || t[82] !== z
        ? ((B = (0, _.jsxs)(Ee, {
              className: `lg:col-span-2`,
              children: [
                  Xe,
                  (0, _.jsxs)(Te, {
                      className: `space-y-4`,
                      children: [I, L, R, z],
                  }),
              ],
          })),
          (t[79] = I),
          (t[80] = L),
          (t[81] = R),
          (t[82] = z),
          (t[83] = B))
        : (B = t[83]);
    let $e;
    t[84] === Symbol.for(`react.memo_cache_sentinel`)
        ? (($e = (0, _.jsx)(we, {
              children: (0, _.jsx)(Ce, { children: `Indicadores` }),
          })),
          (t[84] = $e))
        : ($e = t[84]);
    let V;
    t[85] === i.indicadores
        ? (V = t[86])
        : ((V = (0, _.jsxs)(Ee, {
              children: [
                  $e,
                  (0, _.jsx)(Te, {
                      children:
                          i.indicadores.length === 0
                              ? (0, _.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin indicadores asociados.`,
                                })
                              : (0, _.jsx)(`ul`, {
                                    className: `space-y-3 text-sm`,
                                    children: i.indicadores.map(Je),
                                }),
                  }),
              ],
          })),
          (t[85] = i.indicadores),
          (t[86] = V));
    let H;
    t[87] !== B || t[88] !== V
        ? ((H = (0, _.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [B, V],
          })),
          (t[87] = B),
          (t[88] = V),
          (t[89] = H))
        : (H = t[89]);
    let U;
    t[90] !== i.beneficiarios ||
    t[91] !== i.beneficiarios_total ||
    t[92] !== i.estado ||
    t[93] !== i.evidencias ||
    t[94] !== i.fecha_cierre ||
    t[95] !== i.participantes ||
    t[96] !== i.resultados
        ? ((U =
              i.estado === `cerrada` &&
              (0, _.jsxs)(Ee, {
                  children: [
                      (0, _.jsx)(we, {
                          children: (0, _.jsx)(Ce, { children: `Cierre` }),
                      }),
                      (0, _.jsxs)(Te, {
                          className: `space-y-4`,
                          children: [
                              (0, _.jsxs)(`div`, {
                                  children: [
                                      (0, _.jsx)(`h2`, {
                                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                                          children: `Resultados`,
                                      }),
                                      (0, _.jsx)(`p`, {
                                          className: `mt-1 text-sm whitespace-pre-line`,
                                          children: i.resultados,
                                      }),
                                  ],
                              }),
                              (0, _.jsxs)(`dl`, {
                                  className: `grid gap-4 sm:grid-cols-3`,
                                  children: [
                                      (0, _.jsx)(v, {
                                          etiqueta: `Beneficiarios`,
                                          valor: i.beneficiarios_total,
                                      }),
                                      (0, _.jsx)(v, {
                                          etiqueta: `Participantes`,
                                          valor: i.participantes.length,
                                      }),
                                      (0, _.jsx)(v, {
                                          etiqueta: `Cierre`,
                                          valor: Ie(i.fecha_cierre),
                                      }),
                                  ],
                              }),
                              i.beneficiarios.length > 0 &&
                                  (0, _.jsxs)(Ne, {
                                      children: [
                                          (0, _.jsx)(ke, {
                                              children: (0, _.jsxs)(Me, {
                                                  children: [
                                                      (0, _.jsx)(Ae, {
                                                          children: `Sexo`,
                                                      }),
                                                      (0, _.jsx)(Ae, {
                                                          children: `Rango de edad`,
                                                      }),
                                                      (0, _.jsx)(Ae, {
                                                          children: `Tipo de público`,
                                                      }),
                                                      (0, _.jsx)(Ae, {
                                                          children: `Cantidad`,
                                                      }),
                                                  ],
                                              }),
                                          }),
                                          (0, _.jsx)(je, {
                                              children: i.beneficiarios.map(qe),
                                          }),
                                      ],
                                  }),
                              i.evidencias.length > 0 &&
                                  (0, _.jsx)(`div`, {
                                      className: `flex flex-wrap gap-2`,
                                      children: i.evidencias.map(Ke),
                                  }),
                          ],
                      }),
                  ],
              })),
          (t[90] = i.beneficiarios),
          (t[91] = i.beneficiarios_total),
          (t[92] = i.estado),
          (t[93] = i.evidencias),
          (t[94] = i.fecha_cierre),
          (t[95] = i.participantes),
          (t[96] = i.resultados),
          (t[97] = U))
        : (U = t[97]);
    let et;
    t[98] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((et = (0, _.jsx)(we, {
              children: (0, _.jsx)(Ce, { children: `Historial de revisión` }),
          })),
          (t[98] = et))
        : (et = t[98]);
    let W;
    t[99] === i.revisiones
        ? (W = t[100])
        : ((W = (0, _.jsxs)(Ee, {
              children: [
                  et,
                  (0, _.jsx)(Te, {
                      children:
                          i.revisiones.length === 0
                              ? (0, _.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Todavía no hay movimientos.`,
                                })
                              : (0, _.jsx)(`ul`, {
                                    className: `space-y-3 text-sm`,
                                    children: i.revisiones.map(Ge),
                                }),
                  }),
              ],
          })),
          (t[99] = i.revisiones),
          (t[100] = W));
    let tt;
    t[101] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((tt = (0, _.jsx)(we, {
              children: (0, _.jsx)(Ce, { children: `Reprogramaciones` }),
          })),
          (t[101] = tt))
        : (tt = t[101]);
    let G;
    t[102] === i.reprogramaciones
        ? (G = t[103])
        : ((G = (0, _.jsxs)(Ee, {
              children: [
                  tt,
                  (0, _.jsx)(Te, {
                      children:
                          i.reprogramaciones.length === 0
                              ? (0, _.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `La actividad no se ha reprogramado.`,
                                })
                              : (0, _.jsx)(`ul`, {
                                    className: `space-y-3 text-sm`,
                                    children: i.reprogramaciones.map(We),
                                }),
                  }),
              ],
          })),
          (t[102] = i.reprogramaciones),
          (t[103] = G));
    let K;
    t[104] !== W || t[105] !== G
        ? ((K = (0, _.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2`,
              children: [W, G],
          })),
          (t[104] = W),
          (t[105] = G),
          (t[106] = K))
        : (K = t[106]);
    let q;
    t[107] !== O || t[108] !== H || t[109] !== U || t[110] !== K
        ? ((q = (0, _.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [d, O, H, U, K],
          })),
          (t[107] = O),
          (t[108] = H),
          (t[109] = U),
          (t[110] = K),
          (t[111] = q))
        : (q = t[111]);
    let nt = o !== null,
        rt;
    t[112] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((rt = (e) => !e && le()), (t[112] = rt))
        : (rt = t[112]);
    let it = o === `observar` && `Observar actividad`,
        at = o === `rechazar` && `Rechazar actividad`,
        ot = o === `reprogramar` && `Reprogramar actividad`,
        st = o === `cancelar` && `Cancelar actividad`,
        J;
    t[113] !== it || t[114] !== at || t[115] !== ot || t[116] !== st
        ? ((J = (0, _.jsxs)(xe, { children: [it, at, ot, st] })),
          (t[113] = it),
          (t[114] = at),
          (t[115] = ot),
          (t[116] = st),
          (t[117] = J))
        : (J = t[117]);
    let ct =
            o === `observar` &&
            `La actividad vuelve a la unidad para corregirse.`,
        lt =
            o === `rechazar` &&
            `El rechazo cierra el ciclo y libera el espacio reservado.`,
        ut =
            o === `reprogramar` &&
            `Se guarda la fecha anterior y se vuelve a validar el espacio.`,
        dt =
            o === `cancelar` &&
            `La cancelación libera el espacio y retira la actividad de la agenda.`,
        Y;
    t[118] !== ct || t[119] !== lt || t[120] !== ut || t[121] !== dt
        ? ((Y = (0, _.jsxs)(be, { children: [ct, lt, ut, dt] })),
          (t[118] = ct),
          (t[119] = lt),
          (t[120] = ut),
          (t[121] = dt),
          (t[122] = Y))
        : (Y = t[122]);
    let X;
    t[123] !== J || t[124] !== Y
        ? ((X = (0, _.jsxs)(he, { children: [J, Y] })),
          (t[123] = J),
          (t[124] = Y),
          (t[125] = X))
        : (X = t[125]);
    let Z;
    t[126] !== i.fecha ||
    t[127] !== i.hora_fin ||
    t[128] !== i.hora_inicio ||
    t[129] !== i.id ||
    t[130] !== o
        ? ((Z =
              o !== null &&
              (0, _.jsx)(ee, {
                  ...(o === `observar`
                      ? Re.observar.form(i.id)
                      : o === `rechazar`
                        ? Re.rechazar.form(i.id)
                        : o === `reprogramar`
                          ? Ue.reprogramar.form(i.id)
                          : Ue.cancelar.form(i.id)),
                  options: { preserveScroll: !0 },
                  onSuccess: le,
                  className: `space-y-4`,
                  children: (e) => {
                      let { processing: t, errors: n } = e;
                      return (0, _.jsxs)(_.Fragment, {
                          children: [
                              o === `reprogramar`
                                  ? (0, _.jsxs)(_.Fragment, {
                                        children: [
                                            (0, _.jsxs)(`div`, {
                                                className: `grid gap-2`,
                                                children: [
                                                    (0, _.jsx)(De, {
                                                        htmlFor: `fecha`,
                                                        children: `Nueva fecha`,
                                                    }),
                                                    (0, _.jsx)(de, {
                                                        id: `fecha`,
                                                        name: `fecha`,
                                                        type: `date`,
                                                        required: !0,
                                                        defaultValue: i.fecha,
                                                    }),
                                                    (0, _.jsx)(Se, {
                                                        message: n.fecha,
                                                    }),
                                                ],
                                            }),
                                            (0, _.jsxs)(`div`, {
                                                className: `grid gap-4 sm:grid-cols-2`,
                                                children: [
                                                    (0, _.jsxs)(`div`, {
                                                        className: `grid gap-2`,
                                                        children: [
                                                            (0, _.jsx)(De, {
                                                                htmlFor: `hora_inicio`,
                                                                children: `Hora de inicio`,
                                                            }),
                                                            (0, _.jsx)(de, {
                                                                id: `hora_inicio`,
                                                                name: `hora_inicio`,
                                                                type: `time`,
                                                                defaultValue:
                                                                    i.hora_inicio ??
                                                                    ``,
                                                            }),
                                                        ],
                                                    }),
                                                    (0, _.jsxs)(`div`, {
                                                        className: `grid gap-2`,
                                                        children: [
                                                            (0, _.jsx)(De, {
                                                                htmlFor: `hora_fin`,
                                                                children: `Hora de finalización`,
                                                            }),
                                                            (0, _.jsx)(de, {
                                                                id: `hora_fin`,
                                                                name: `hora_fin`,
                                                                type: `time`,
                                                                defaultValue:
                                                                    i.hora_fin ??
                                                                    ``,
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, _.jsxs)(`div`, {
                                                className: `grid gap-2`,
                                                children: [
                                                    (0, _.jsx)(De, {
                                                        htmlFor: `motivo`,
                                                        children: `Motivo`,
                                                    }),
                                                    (0, _.jsx)(de, {
                                                        id: `motivo`,
                                                        name: `motivo`,
                                                    }),
                                                    (0, _.jsx)(Se, {
                                                        message: n.motivo,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    })
                                  : (0, _.jsxs)(`div`, {
                                        className: `grid gap-2`,
                                        children: [
                                            (0, _.jsx)(De, {
                                                htmlFor:
                                                    o === `cancelar`
                                                        ? `motivo`
                                                        : `comentario`,
                                                children:
                                                    o === `cancelar`
                                                        ? `Motivo de la cancelación`
                                                        : `Comentario`,
                                            }),
                                            (0, _.jsx)(Pe, {
                                                id:
                                                    o === `cancelar`
                                                        ? `motivo`
                                                        : `comentario`,
                                                name:
                                                    o === `cancelar`
                                                        ? `motivo`
                                                        : `comentario`,
                                                rows: 3,
                                                required: !0,
                                            }),
                                            (0, _.jsx)(Se, {
                                                message:
                                                    o === `cancelar`
                                                        ? n.motivo
                                                        : n.comentario,
                                            }),
                                        ],
                                    }),
                              (0, _.jsxs)(fe, {
                                  children: [
                                      (0, _.jsx)(l, {
                                          type: `button`,
                                          variant: `outline`,
                                          onClick: le,
                                          children: `Cerrar`,
                                      }),
                                      (0, _.jsxs)(l, {
                                          type: `submit`,
                                          disabled: t,
                                          children: [
                                              t && (0, _.jsx)(Oe, {}),
                                              `Confirmar`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      });
                  },
              })),
          (t[126] = i.fecha),
          (t[127] = i.hora_fin),
          (t[128] = i.hora_inicio),
          (t[129] = i.id),
          (t[130] = o),
          (t[131] = Z))
        : (Z = t[131]);
    let Q;
    t[132] !== X || t[133] !== Z
        ? ((Q = (0, _.jsxs)(_e, { children: [X, Z] })),
          (t[132] = X),
          (t[133] = Z),
          (t[134] = Q))
        : (Q = t[134]);
    let $;
    t[135] !== nt || t[136] !== Q
        ? (($ = (0, _.jsx)(me, { open: nt, onOpenChange: rt, children: Q })),
          (t[135] = nt),
          (t[136] = Q),
          (t[137] = $))
        : ($ = t[137]);
    let ft;
    return (
        t[138] !== u || t[139] !== q || t[140] !== $
            ? ((ft = (0, _.jsxs)(_.Fragment, { children: [u, q, $] })),
              (t[138] = u),
              (t[139] = q),
              (t[140] = $),
              (t[141] = ft))
            : (ft = t[141]),
        ft
    );
}
function We(e) {
    return (0, _.jsxs)(
        `li`,
        {
            children: [
                Fe(e.fecha_anterior),
                ` `,
                `→`,
                ` `,
                Fe(e.fecha_nueva),
                (0, _.jsxs)(`span`, {
                    className: `block text-xs text-muted-foreground`,
                    children: [e.motivo ?? `Sin motivo`, ` `, `· `, e.usuario],
                }),
            ],
        },
        e.id,
    );
}
function Ge(e) {
    return (0, _.jsxs)(
        `li`,
        {
            children: [
                (0, _.jsx)(`span`, {
                    className: `font-medium`,
                    children: e.accion,
                }),
                (0, _.jsxs)(`span`, {
                    className: `block text-xs text-muted-foreground`,
                    children: [e.usuario, ` ·`, ` `, e.fecha],
                }),
                e.comentario &&
                    (0, _.jsx)(`p`, {
                        className: `mt-1 text-muted-foreground`,
                        children: e.comentario,
                    }),
            ],
        },
        e.id,
    );
}
function Ke(e) {
    return (0, _.jsx)(
        l,
        {
            variant: `outline`,
            size: `sm`,
            asChild: !0,
            children: (0, _.jsxs)(`a`, {
                href: e.enlace ?? `#`,
                target: `_blank`,
                rel: `noopener noreferrer`,
                children: [(0, _.jsx)(le, {}), e.nombre ?? e.tipo_nombre],
            }),
        },
        e.id,
    );
}
function qe(e, t) {
    return (0, _.jsxs)(
        Me,
        {
            children: [
                (0, _.jsx)(u, { children: e.sexo }),
                (0, _.jsx)(u, { children: e.rango_edad }),
                (0, _.jsx)(u, { children: e.tipo_publico ?? `—` }),
                (0, _.jsx)(u, { children: e.cantidad }),
            ],
        },
        t,
    );
}
function Je(e) {
    return (0, _.jsxs)(
        `li`,
        {
            children: [
                (0, _.jsx)(`span`, { className: `block`, children: e.nombre }),
                (0, _.jsxs)(`span`, {
                    className: `text-muted-foreground`,
                    children: [
                        `Meta:`,
                        ` `,
                        e.valor_meta ?? `—`,
                        ` · Alcanzado:`,
                        ` `,
                        e.valor_alcanzado ?? `—`,
                        ` `,
                        e.unidad_medida,
                    ],
                }),
            ],
        },
        e.id,
    );
}
function Ye(e) {
    return (0, _.jsx)(pe, { variant: `outline`, children: e }, e);
}
y.layout = { breadcrumbs: [{ title: `Actividades`, href: ye() }] };
export { y as default };
