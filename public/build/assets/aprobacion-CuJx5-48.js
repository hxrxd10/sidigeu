import {
    c as e,
    d as t,
    g as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { a as o, i as s, n as c, r as l, t as u } from './select-hxeu1kQ_.js';
import { t as d } from './circle-check-CQR1GVzd.js';
import { t as f } from './eye-C_qBLWaa.js';
import { W as p, Y as m, f as h, q as g, r as _ } from './app-Bu9EFUG6.js';
import {
    a as v,
    i as y,
    n as b,
    o as x,
    r as S,
    t as C,
} from './table-D3mJxxJl.js';
import { t as w } from './paginacion-HQOmOGhf.js';
import { n as T } from './fecha-D8mdgCgw.js';
import { t as E } from './AprobacionProyectoController-C0mZj3ob.js';
import { colorEstadoProyecto as D } from './proyectos-C6CBpW6k.js';
var O = e(),
    k = r();
function A(e) {
    let t = (0, O.c)(45),
        { proyectos: r, filtros: a, estados: d, unidades: f } = e,
        m;
    t[0] === a
        ? (m = t[1])
        : ((m = (e) => {
              n.get(
                  p().url,
                  { ...a, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = a),
          (t[1] = m));
    let h = m,
        g;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, k.jsx)(i, { title: `Aprobación de proyectos` })),
          (t[2] = g))
        : (g = t[2]);
    let T;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = (0, k.jsx)(_, {
              title: `Aprobación de proyectos`,
              description: `Apruebe, observe o rechace la formulación que envían las unidades`,
          })),
          (t[3] = T))
        : (T = t[3]);
    let E = a.estado,
        D;
    t[4] === h
        ? (D = t[5])
        : ((D = (e) => h({ estado: e })), (t[4] = h), (t[5] = D));
    let A;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, k.jsx)(s, {
              className: `w-56`,
              children: (0, k.jsx)(o, { placeholder: `Estado` }),
          })),
          (t[6] = A))
        : (A = t[6]);
    let P;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((P = (0, k.jsx)(l, { value: `todos`, children: `Todos` })),
          (t[7] = P))
        : (P = t[7]);
    let F;
    t[8] === d ? (F = t[9]) : ((F = d.map(N)), (t[8] = d), (t[9] = F));
    let I;
    t[10] === F
        ? (I = t[11])
        : ((I = (0, k.jsxs)(c, { children: [P, F] })),
          (t[10] = F),
          (t[11] = I));
    let L;
    t[12] !== a.estado || t[13] !== D || t[14] !== I
        ? ((L = (0, k.jsxs)(u, {
              value: E,
              onValueChange: D,
              children: [A, I],
          })),
          (t[12] = a.estado),
          (t[13] = D),
          (t[14] = I),
          (t[15] = L))
        : (L = t[15]);
    let R = a.unidad_id ? String(a.unidad_id) : `todas`,
        z;
    t[16] === h
        ? (z = t[17])
        : ((z = (e) => h({ unidad_id: e === `todas` ? null : Number(e) })),
          (t[16] = h),
          (t[17] = z));
    let B;
    t[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((B = (0, k.jsx)(s, {
              className: `w-56`,
              children: (0, k.jsx)(o, { placeholder: `Unidad` }),
          })),
          (t[18] = B))
        : (B = t[18]);
    let V;
    t[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = (0, k.jsx)(l, {
              value: `todas`,
              children: `Todas las unidades`,
          })),
          (t[19] = V))
        : (V = t[19]);
    let H;
    t[20] === f ? (H = t[21]) : ((H = f.map(M)), (t[20] = f), (t[21] = H));
    let U;
    t[22] === H
        ? (U = t[23])
        : ((U = (0, k.jsxs)(c, { children: [V, H] })),
          (t[22] = H),
          (t[23] = U));
    let W;
    t[24] !== R || t[25] !== z || t[26] !== U
        ? ((W = (0, k.jsxs)(u, {
              value: R,
              onValueChange: z,
              children: [B, U],
          })),
          (t[24] = R),
          (t[25] = z),
          (t[26] = U),
          (t[27] = W))
        : (W = t[27]);
    let G;
    t[28] !== L || t[29] !== W
        ? ((G = (0, k.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [L, W],
          })),
          (t[28] = L),
          (t[29] = W),
          (t[30] = G))
        : (G = t[30]);
    let K;
    t[31] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((K = (0, k.jsx)(v, {
              children: (0, k.jsxs)(x, {
                  children: [
                      (0, k.jsx)(y, { children: `Proyecto` }),
                      (0, k.jsx)(y, { children: `Unidad` }),
                      (0, k.jsx)(y, { children: `Responsable` }),
                      (0, k.jsx)(y, { children: `Inicio` }),
                      (0, k.jsx)(y, { children: `Estado` }),
                      (0, k.jsx)(y, {
                          className: `text-right`,
                          children: `Acciones`,
                      }),
                  ],
              }),
          })),
          (t[31] = K))
        : (K = t[31]);
    let q;
    t[32] === r.data
        ? (q = t[33])
        : ((q = r.data.map(j)), (t[32] = r.data), (t[33] = q));
    let J;
    t[34] === r.data.length
        ? (J = t[35])
        : ((J =
              r.data.length === 0 &&
              (0, k.jsx)(x, {
                  children: (0, k.jsx)(S, {
                      colSpan: 6,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay proyectos en ese estado.`,
                  }),
              })),
          (t[34] = r.data.length),
          (t[35] = J));
    let Y;
    t[36] !== q || t[37] !== J
        ? ((Y = (0, k.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, k.jsxs)(C, {
                  children: [K, (0, k.jsxs)(b, { children: [q, J] })],
              }),
          })),
          (t[36] = q),
          (t[37] = J),
          (t[38] = Y))
        : (Y = t[38]);
    let X;
    t[39] === r
        ? (X = t[40])
        : ((X = (0, k.jsx)(w, { paginado: r, etiqueta: `proyectos` })),
          (t[39] = r),
          (t[40] = X));
    let Z;
    return (
        t[41] !== G || t[42] !== Y || t[43] !== X
            ? ((Z = (0, k.jsxs)(k.Fragment, {
                  children: [
                      g,
                      (0, k.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [T, G, Y, X],
                      }),
                  ],
              })),
              (t[41] = G),
              (t[42] = Y),
              (t[43] = X),
              (t[44] = Z))
            : (Z = t[44]),
        Z
    );
}
function j(e) {
    return (0, k.jsxs)(
        x,
        {
            children: [
                (0, k.jsxs)(S, {
                    className: `font-medium`,
                    children: [
                        e.nombre,
                        e.tipo &&
                            (0, k.jsx)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: e.tipo,
                            }),
                    ],
                }),
                (0, k.jsx)(S, { children: e.unidad }),
                (0, k.jsx)(S, { children: e.responsable ?? `—` }),
                (0, k.jsx)(S, { children: T(e.fecha_inicio) || `—` }),
                (0, k.jsx)(S, {
                    children: (0, k.jsx)(h, {
                        variant: D(e.estado),
                        children: e.estado_nombre,
                    }),
                }),
                (0, k.jsxs)(S, {
                    className: `text-right whitespace-nowrap`,
                    children: [
                        (0, k.jsx)(a, {
                            variant: `ghost`,
                            size: `sm`,
                            asChild: !0,
                            children: (0, k.jsxs)(t, {
                                href: m(e.id),
                                children: [(0, k.jsx)(f, {}), `Revisar`],
                            }),
                        }),
                        e.puede_aprobar &&
                            (0, k.jsxs)(a, {
                                variant: `ghost`,
                                size: `sm`,
                                onClick: () =>
                                    n.patch(
                                        E.aprobar.url(e.id),
                                        {},
                                        { preserveScroll: !0 },
                                    ),
                                children: [(0, k.jsx)(d, {}), `Aprobar`],
                            }),
                    ],
                }),
            ],
        },
        e.id,
    );
}
function M(e) {
    return (0, k.jsx)(
        l,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function N(e) {
    return (0, k.jsx)(l, { value: e.valor, children: e.nombre }, e.valor);
}
A.layout = {
    breadcrumbs: [
        { title: `Proyectos`, href: g() },
        { title: `Aprobación`, href: p() },
    ],
};
export { A as default };
