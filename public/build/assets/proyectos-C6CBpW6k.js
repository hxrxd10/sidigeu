import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as ee,
    g as te,
    h as n,
    s as r,
    u as ne,
} from './wayfinder-C8dNLrFV.js';
import { t as re } from './button-BzkMvCJO.js';
import { a as i, i as ie, n as a, r as o, t as s } from './select-hxeu1kQ_.js';
import { t as ae } from './clipboard-check-BKWpjhiB.js';
import { t as oe } from './plus-B2NIGUck.js';
import {
    G as se,
    Tt as ce,
    W as le,
    Y as c,
    f as l,
    q as ue,
    r as de,
} from './app-Bu9EFUG6.js';
import {
    a as fe,
    i as u,
    n as pe,
    o as me,
    r as d,
    t as he,
} from './table-D3mJxxJl.js';
import { t as ge } from './paginacion-HQOmOGhf.js';
import { n as f } from './fecha-D8mdgCgw.js';
var _e = t(),
    ve = e(n(), 1),
    p = r(),
    m = `todos`;
function ye(e) {
    return [`cerrado`, `aprobado`, `en_ejecucion`].includes(e)
        ? `default`
        : [`rechazado`, `cancelado`, `suspendido`].includes(e)
          ? `outline`
          : `secondary`;
}
function h(e) {
    let t = (0, _e.c)(80),
        { proyectos: n, filtros: r, opciones: c, puedeRegistrar: l } = e,
        [f, ye] = (0, ve.useState)(r.busqueda),
        h;
    t[0] === r
        ? (h = t[1])
        : ((h = (e) => {
              te.get(
                  ue().url,
                  { ...r, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = r),
          (t[1] = h));
    let g = h,
        _;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((_ = (0, p.jsx)(ne, { title: `Proyectos` })), (t[2] = _))
        : (_ = t[2]);
    let v;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, p.jsx)(de, {
              title: `Proyectos`,
              description: `Cartera de proyectos: formulación, aprobación, ejecución y cierre`,
          })),
          (t[3] = v))
        : (v = t[3]);
    let y;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((y = (0, p.jsx)(re, {
              variant: `outline`,
              asChild: !0,
              children: (0, p.jsxs)(ee, {
                  href: le(),
                  children: [(0, p.jsx)(ae, {}), `Aprobación`],
              }),
          })),
          (t[4] = y))
        : (y = t[4]);
    let b;
    t[5] === l
        ? (b = t[6])
        : ((b =
              l &&
              (0, p.jsx)(re, {
                  asChild: !0,
                  children: (0, p.jsxs)(ee, {
                      href: se(),
                      children: [(0, p.jsx)(oe, {}), `Nuevo proyecto`],
                  }),
              })),
          (t[5] = l),
          (t[6] = b));
    let x;
    t[7] === b
        ? (x = t[8])
        : ((x = (0, p.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [
                  v,
                  (0, p.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [y, b],
                  }),
              ],
          })),
          (t[7] = b),
          (t[8] = x));
    let S;
    t[9] !== f || t[10] !== g
        ? ((S = (e) => {
              (e.preventDefault(), g({ busqueda: f }));
          }),
          (t[9] = f),
          (t[10] = g),
          (t[11] = S))
        : (S = t[11]);
    let C;
    t[12] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = (e) => ye(e.target.value)), (t[12] = C))
        : (C = t[12]);
    let w;
    t[13] === f
        ? (w = t[14])
        : ((w = (0, p.jsx)(ce, {
              value: f,
              onChange: C,
              placeholder: `Buscar por nombre`,
              'aria-label': `Buscar proyectos`,
          })),
          (t[13] = f),
          (t[14] = w));
    let T;
    t[15] !== S || t[16] !== w
        ? ((T = (0, p.jsx)(`form`, {
              className: `flex-1 sm:max-w-xs`,
              onSubmit: S,
              children: w,
          })),
          (t[15] = S),
          (t[16] = w),
          (t[17] = T))
        : (T = t[17]);
    let we = r.estado || m,
        E;
    t[18] === g
        ? (E = t[19])
        : ((E = (e) => g({ estado: e === m ? `` : e })),
          (t[18] = g),
          (t[19] = E));
    let D;
    t[20] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = (0, p.jsx)(ie, {
              className: `w-52`,
              children: (0, p.jsx)(i, { placeholder: `Estado` }),
          })),
          (t[20] = D))
        : (D = t[20]);
    let O;
    t[21] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (0, p.jsx)(o, { value: m, children: `Todos los estados` })),
          (t[21] = O))
        : (O = t[21]);
    let k;
    t[22] === c.estados
        ? (k = t[23])
        : ((k = c.estados.map(Ce)), (t[22] = c.estados), (t[23] = k));
    let A;
    t[24] === k
        ? (A = t[25])
        : ((A = (0, p.jsxs)(a, { children: [O, k] })),
          (t[24] = k),
          (t[25] = A));
    let j;
    t[26] !== we || t[27] !== E || t[28] !== A
        ? ((j = (0, p.jsxs)(s, {
              value: we,
              onValueChange: E,
              children: [D, A],
          })),
          (t[26] = we),
          (t[27] = E),
          (t[28] = A),
          (t[29] = j))
        : (j = t[29]);
    let M = r.unidad_id ? String(r.unidad_id) : m,
        N;
    t[30] === g
        ? (N = t[31])
        : ((N = (e) => g({ unidad_id: e === m ? null : Number(e) })),
          (t[30] = g),
          (t[31] = N));
    let P;
    t[32] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((P = (0, p.jsx)(ie, {
              className: `w-56`,
              children: (0, p.jsx)(i, { placeholder: `Unidad` }),
          })),
          (t[32] = P))
        : (P = t[32]);
    let F;
    t[33] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((F = (0, p.jsx)(o, { value: m, children: `Todas las unidades` })),
          (t[33] = F))
        : (F = t[33]);
    let I;
    t[34] === c.unidades
        ? (I = t[35])
        : ((I = c.unidades.map(Se)), (t[34] = c.unidades), (t[35] = I));
    let L;
    t[36] === I
        ? (L = t[37])
        : ((L = (0, p.jsxs)(a, { children: [F, I] })),
          (t[36] = I),
          (t[37] = L));
    let R;
    t[38] !== M || t[39] !== N || t[40] !== L
        ? ((R = (0, p.jsxs)(s, {
              value: M,
              onValueChange: N,
              children: [P, L],
          })),
          (t[38] = M),
          (t[39] = N),
          (t[40] = L),
          (t[41] = R))
        : (R = t[41]);
    let Te = r.programa_id ? String(r.programa_id) : m,
        z;
    t[42] === g
        ? (z = t[43])
        : ((z = (e) => g({ programa_id: e === m ? null : Number(e) })),
          (t[42] = g),
          (t[43] = z));
    let B;
    t[44] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((B = (0, p.jsx)(ie, {
              className: `w-52`,
              children: (0, p.jsx)(i, { placeholder: `Programa` }),
          })),
          (t[44] = B))
        : (B = t[44]);
    let V;
    t[45] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = (0, p.jsx)(o, { value: m, children: `Todos los programas` })),
          (t[45] = V))
        : (V = t[45]);
    let H;
    t[46] === c.programas
        ? (H = t[47])
        : ((H = c.programas.map(xe)), (t[46] = c.programas), (t[47] = H));
    let U;
    t[48] === H
        ? (U = t[49])
        : ((U = (0, p.jsxs)(a, { children: [V, H] })),
          (t[48] = H),
          (t[49] = U));
    let W;
    t[50] !== Te || t[51] !== z || t[52] !== U
        ? ((W = (0, p.jsxs)(s, {
              value: Te,
              onValueChange: z,
              children: [B, U],
          })),
          (t[50] = Te),
          (t[51] = z),
          (t[52] = U),
          (t[53] = W))
        : (W = t[53]);
    let Ee = r.anio ?? ``,
        G;
    t[54] === g
        ? (G = t[55])
        : ((G = (e) =>
              g({ anio: e.target.value ? Number(e.target.value) : null })),
          (t[54] = g),
          (t[55] = G));
    let K;
    t[56] !== Ee || t[57] !== G
        ? ((K = (0, p.jsx)(ce, {
              type: `number`,
              className: `w-28`,
              placeholder: `Año`,
              defaultValue: Ee,
              'aria-label': `Año de inicio`,
              onBlur: G,
          })),
          (t[56] = Ee),
          (t[57] = G),
          (t[58] = K))
        : (K = t[58]);
    let q;
    t[59] !== T || t[60] !== j || t[61] !== R || t[62] !== W || t[63] !== K
        ? ((q = (0, p.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [T, j, R, W, K],
          })),
          (t[59] = T),
          (t[60] = j),
          (t[61] = R),
          (t[62] = W),
          (t[63] = K),
          (t[64] = q))
        : (q = t[64]);
    let J;
    t[65] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (0, p.jsx)(fe, {
              children: (0, p.jsxs)(me, {
                  children: [
                      (0, p.jsx)(u, { children: `Proyecto` }),
                      (0, p.jsx)(u, { children: `Unidad` }),
                      (0, p.jsx)(u, { children: `Responsable` }),
                      (0, p.jsx)(u, { children: `Período` }),
                      (0, p.jsx)(u, { children: `Actividades` }),
                      (0, p.jsx)(u, { children: `Estado` }),
                  ],
              }),
          })),
          (t[65] = J))
        : (J = t[65]);
    let Y;
    t[66] === n.data
        ? (Y = t[67])
        : ((Y = n.data.map(be)), (t[66] = n.data), (t[67] = Y));
    let X;
    t[68] === n.data.length
        ? (X = t[69])
        : ((X =
              n.data.length === 0 &&
              (0, p.jsx)(me, {
                  children: (0, p.jsx)(d, {
                      colSpan: 6,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay proyectos con esos filtros.`,
                  }),
              })),
          (t[68] = n.data.length),
          (t[69] = X));
    let Z;
    t[70] !== Y || t[71] !== X
        ? ((Z = (0, p.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, p.jsxs)(he, {
                  children: [J, (0, p.jsxs)(pe, { children: [Y, X] })],
              }),
          })),
          (t[70] = Y),
          (t[71] = X),
          (t[72] = Z))
        : (Z = t[72]);
    let Q;
    t[73] === n
        ? (Q = t[74])
        : ((Q = (0, p.jsx)(ge, { paginado: n, etiqueta: `proyectos` })),
          (t[73] = n),
          (t[74] = Q));
    let $;
    return (
        t[75] !== q || t[76] !== Z || t[77] !== Q || t[78] !== x
            ? (($ = (0, p.jsxs)(p.Fragment, {
                  children: [
                      _,
                      (0, p.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [x, q, Z, Q],
                      }),
                  ],
              })),
              (t[75] = q),
              (t[76] = Z),
              (t[77] = Q),
              (t[78] = x),
              (t[79] = $))
            : ($ = t[79]),
        $
    );
}
function be(e) {
    return (0, p.jsxs)(
        me,
        {
            children: [
                (0, p.jsxs)(d, {
                    className: `font-medium`,
                    children: [
                        (0, p.jsx)(ee, {
                            href: c(e.id),
                            className: `hover:underline`,
                            children: e.nombre,
                        }),
                        e.tipo &&
                            (0, p.jsx)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: e.tipo,
                            }),
                    ],
                }),
                (0, p.jsx)(d, { children: e.unidad }),
                (0, p.jsx)(d, { children: e.responsable ?? `—` }),
                (0, p.jsxs)(d, {
                    className: `whitespace-nowrap`,
                    children: [
                        f(e.fecha_inicio) || `—`,
                        e.fecha_fin &&
                            (0, p.jsxs)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: [`hasta`, ` `, f(e.fecha_fin)],
                            }),
                    ],
                }),
                (0, p.jsx)(d, {
                    className: `tabular-nums`,
                    children: e.actividades_count,
                }),
                (0, p.jsx)(d, {
                    children: (0, p.jsx)(l, {
                        variant: ye(e.estado),
                        children: e.estado_nombre,
                    }),
                }),
            ],
        },
        e.id,
    );
}
function xe(e) {
    return (0, p.jsx)(
        o,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function Se(e) {
    return (0, p.jsx)(
        o,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function Ce(e) {
    return (0, p.jsx)(o, { value: e.valor, children: e.nombre }, e.valor);
}
h.layout = { breadcrumbs: [{ title: `Proyectos`, href: ue() }] };
export { ye as colorEstadoProyecto, h as default };
