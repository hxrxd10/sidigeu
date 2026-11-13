import {
    c as e,
    d as t,
    g as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as o } from './arrow-left-CWHaM1EE.js';
import { t as ee } from './external-link-jeG1UvmS.js';
import { t as te } from './pencil-Bbeg0ISb.js';
import { t as ne } from './trash-2-_Kz5vj-S.js';
import { B as re, P as ie, f as s, z as ae } from './app-Bu9EFUG6.js';
import { a as c, i as l, n as u, t as d } from './card-Bc3dRGP7.js';
import {
    a as oe,
    i as f,
    n as se,
    o as p,
    r as m,
    t as ce,
} from './table-D3mJxxJl.js';
import { n as h } from './fecha-D8mdgCgw.js';
import { t as le } from './EspacioController-f5zlN1ju.js';
var ue = e(),
    g = r();
function _(e) {
    let t = (0, ue.c)(7),
        { etiqueta: n, valor: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, g.jsx)(`dt`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: n,
          })),
          (t[0] = n),
          (t[1] = i));
    let a;
    t[2] === r
        ? (a = t[3])
        : ((a = (0, g.jsx)(`dd`, { className: `mt-0.5 text-sm`, children: r })),
          (t[2] = r),
          (t[3] = a));
    let o;
    return (
        t[4] !== i || t[5] !== a
            ? ((o = (0, g.jsxs)(`div`, { children: [i, a] })),
              (t[4] = i),
              (t[5] = a),
              (t[6] = o))
            : (o = t[6]),
        o
    );
}
function v(e) {
    let r = (0, ue.c)(79),
        { espacio: h, historial: v, puedeGestionar: pe } = e,
        y;
    r[0] === h.nombre
        ? (y = r[1])
        : ((y = (0, g.jsx)(i, { title: h.nombre })),
          (r[0] = h.nombre),
          (r[1] = y));
    let b;
    r[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, g.jsx)(a, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, g.jsxs)(t, {
                  href: re(),
                  children: [(0, g.jsx)(o, {}), `Volver a espacios`],
              }),
          })),
          (r[2] = b))
        : (b = r[2]);
    let x;
    r[3] === h.nombre
        ? (x = r[4])
        : ((x = (0, g.jsx)(`h1`, {
              className: `text-2xl font-semibold`,
              children: h.nombre,
          })),
          (r[3] = h.nombre),
          (r[4] = x));
    let S;
    r[5] === h.sede
        ? (S = r[6])
        : ((S = (0, g.jsx)(s, { variant: `secondary`, children: h.sede })),
          (r[5] = h.sede),
          (r[6] = S));
    let C;
    r[7] === h.tipo
        ? (C = r[8])
        : ((C = (0, g.jsx)(s, { variant: `outline`, children: h.tipo })),
          (r[7] = h.tipo),
          (r[8] = C));
    let w = h.estado === `activo` ? `default` : `outline`,
        T;
    r[9] !== h.estado_nombre || r[10] !== w
        ? ((T = (0, g.jsx)(s, { variant: w, children: h.estado_nombre })),
          (r[9] = h.estado_nombre),
          (r[10] = w),
          (r[11] = T))
        : (T = r[11]);
    let E;
    r[12] !== S || r[13] !== C || r[14] !== T
        ? ((E = (0, g.jsxs)(`div`, {
              className: `mt-1 flex flex-wrap items-center gap-2`,
              children: [S, C, T],
          })),
          (r[12] = S),
          (r[13] = C),
          (r[14] = T),
          (r[15] = E))
        : (E = r[15]);
    let D;
    r[16] !== x || r[17] !== E
        ? ((D = (0, g.jsxs)(`div`, { children: [x, E] })),
          (r[16] = x),
          (r[17] = E),
          (r[18] = D))
        : (D = r[18]);
    let O;
    r[19] !== h.id || r[20] !== h.visible_publico
        ? ((O =
              h.visible_publico &&
              (0, g.jsx)(a, {
                  variant: `outline`,
                  asChild: !0,
                  children: (0, g.jsxs)(`a`, {
                      href: ie(h.id).url,
                      target: `_blank`,
                      rel: `noopener noreferrer`,
                      children: [
                          (0, g.jsx)(ee, {}),
                          `Ver en el catálogo público`,
                      ],
                  }),
              })),
          (r[19] = h.id),
          (r[20] = h.visible_publico),
          (r[21] = O))
        : (O = r[21]);
    let k;
    r[22] !== h.id || r[23] !== pe
        ? ((k =
              pe &&
              (0, g.jsxs)(g.Fragment, {
                  children: [
                      (0, g.jsx)(a, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, g.jsxs)(t, {
                              href: ae(h.id),
                              children: [(0, g.jsx)(te, {}), `Editar`],
                          }),
                      }),
                      (0, g.jsxs)(a, {
                          variant: `outline`,
                          onClick: () => n.delete(le.destroy.url(h.id)),
                          children: [(0, g.jsx)(ne, {}), `Eliminar`],
                      }),
                  ],
              })),
          (r[22] = h.id),
          (r[23] = pe),
          (r[24] = k))
        : (k = r[24]);
    let A;
    r[25] !== O || r[26] !== k
        ? ((A = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap gap-2`,
              children: [O, k],
          })),
          (r[25] = O),
          (r[26] = k),
          (r[27] = A))
        : (A = r[27]);
    let j;
    r[28] !== A || r[29] !== D
        ? ((j = (0, g.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [D, A],
          })),
          (r[28] = A),
          (r[29] = D),
          (r[30] = j))
        : (j = r[30]);
    let M;
    r[31] !== h.fotografias || r[32] !== h.nombre
        ? ((M =
              h.fotografias.length > 0 &&
              (0, g.jsx)(`div`, {
                  className: `grid gap-3 sm:grid-cols-4`,
                  children: h.fotografias.map((e) =>
                      (0, g.jsx)(
                          `img`,
                          {
                              src: e.url,
                              alt: h.nombre,
                              className: `h-36 w-full rounded-lg object-cover`,
                          },
                          e.id,
                      ),
                  ),
              })),
          (r[31] = h.fotografias),
          (r[32] = h.nombre),
          (r[33] = M))
        : (M = r[33]);
    let N;
    r[34] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((N = (0, g.jsx)(l, {
              children: (0, g.jsx)(c, { children: `Datos del espacio` }),
          })),
          (r[34] = N))
        : (N = r[34]);
    let P = h.capacidad ? `${h.capacidad} personas` : `No indicada`,
        F;
    r[35] === P
        ? (F = r[36])
        : ((F = (0, g.jsx)(_, { etiqueta: `Capacidad`, valor: P })),
          (r[35] = P),
          (r[36] = F));
    let I = h.ubicacion ?? `—`,
        L;
    r[37] === I
        ? (L = r[38])
        : ((L = (0, g.jsx)(_, { etiqueta: `Ubicación`, valor: I })),
          (r[37] = I),
          (r[38] = L));
    let me = h.direccion_sede ?? `—`,
        R;
    r[39] === me
        ? (R = r[40])
        : ((R = (0, g.jsx)(_, { etiqueta: `Dirección de la sede`, valor: me })),
          (r[39] = me),
          (r[40] = R));
    let he = h.visible_publico ? `Visible` : `Oculto`,
        z;
    r[41] === he
        ? (z = r[42])
        : ((z = (0, g.jsx)(_, { etiqueta: `Catálogo público`, valor: he })),
          (r[41] = he),
          (r[42] = z));
    let B;
    r[43] !== F || r[44] !== L || r[45] !== R || r[46] !== z
        ? ((B = (0, g.jsxs)(`dl`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [F, L, R, z],
          })),
          (r[43] = F),
          (r[44] = L),
          (r[45] = R),
          (r[46] = z),
          (r[47] = B))
        : (B = r[47]);
    let V;
    r[48] === h.caracteristicas
        ? (V = r[49])
        : ((V =
              h.caracteristicas &&
              (0, g.jsx)(`p`, {
                  className: `text-sm whitespace-pre-line`,
                  children: h.caracteristicas,
              })),
          (r[48] = h.caracteristicas),
          (r[49] = V));
    let H;
    r[50] === h.condiciones_uso
        ? (H = r[51])
        : ((H =
              h.condiciones_uso &&
              (0, g.jsxs)(`div`, {
                  children: [
                      (0, g.jsx)(`h2`, {
                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                          children: `Condiciones de uso`,
                      }),
                      (0, g.jsx)(`p`, {
                          className: `mt-1 text-sm whitespace-pre-line`,
                          children: h.condiciones_uso,
                      }),
                  ],
              })),
          (r[50] = h.condiciones_uso),
          (r[51] = H));
    let U;
    r[52] !== B || r[53] !== V || r[54] !== H
        ? ((U = (0, g.jsxs)(d, {
              className: `lg:col-span-2`,
              children: [
                  N,
                  (0, g.jsxs)(u, {
                      className: `space-y-4`,
                      children: [B, V, H],
                  }),
              ],
          })),
          (r[52] = B),
          (r[53] = V),
          (r[54] = H),
          (r[55] = U))
        : (U = r[55]);
    let W;
    r[56] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = (0, g.jsx)(l, {
              children: (0, g.jsx)(c, { children: `Equipamiento` }),
          })),
          (r[56] = W))
        : (W = r[56]);
    let G;
    r[57] === h.equipamientos
        ? (G = r[58])
        : ((G = (0, g.jsxs)(d, {
              children: [
                  W,
                  (0, g.jsx)(u, {
                      children:
                          h.equipamientos.length === 0
                              ? (0, g.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin equipamiento registrado.`,
                                })
                              : (0, g.jsx)(`ul`, {
                                    className: `space-y-2 text-sm`,
                                    children: h.equipamientos.map(fe),
                                }),
                  }),
              ],
          })),
          (r[57] = h.equipamientos),
          (r[58] = G));
    let K;
    r[59] !== U || r[60] !== G
        ? ((K = (0, g.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [U, G],
          })),
          (r[59] = U),
          (r[60] = G),
          (r[61] = K))
        : (K = r[61]);
    let q;
    r[62] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((q = (0, g.jsx)(l, {
              children: (0, g.jsx)(c, { children: `Historial de uso` }),
          })),
          (r[62] = q))
        : (q = r[62]);
    let J;
    r[63] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (0, g.jsx)(oe, {
              children: (0, g.jsxs)(p, {
                  children: [
                      (0, g.jsx)(f, { children: `Fecha` }),
                      (0, g.jsx)(f, { children: `Horario` }),
                      (0, g.jsx)(f, { children: `Solicitante` }),
                      (0, g.jsx)(f, { children: `Asistentes` }),
                      (0, g.jsx)(f, { children: `Estado` }),
                  ],
              }),
          })),
          (r[63] = J))
        : (J = r[63]);
    let Y;
    r[64] === v ? (Y = r[65]) : ((Y = v.map(de)), (r[64] = v), (r[65] = Y));
    let X;
    r[66] === v.length
        ? (X = r[67])
        : ((X =
              v.length === 0 &&
              (0, g.jsx)(p, {
                  children: (0, g.jsx)(m, {
                      colSpan: 5,
                      className: `py-8 text-center text-muted-foreground`,
                      children: `Este espacio todavía no registra uso.`,
                  }),
              })),
          (r[66] = v.length),
          (r[67] = X));
    let Z;
    r[68] !== Y || r[69] !== X
        ? ((Z = (0, g.jsxs)(d, {
              children: [
                  q,
                  (0, g.jsx)(u, {
                      children: (0, g.jsxs)(ce, {
                          children: [J, (0, g.jsxs)(se, { children: [Y, X] })],
                      }),
                  }),
              ],
          })),
          (r[68] = Y),
          (r[69] = X),
          (r[70] = Z))
        : (Z = r[70]);
    let Q;
    r[71] !== j || r[72] !== M || r[73] !== K || r[74] !== Z
        ? ((Q = (0, g.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [b, j, M, K, Z],
          })),
          (r[71] = j),
          (r[72] = M),
          (r[73] = K),
          (r[74] = Z),
          (r[75] = Q))
        : (Q = r[75]);
    let $;
    return (
        r[76] !== y || r[77] !== Q
            ? (($ = (0, g.jsxs)(g.Fragment, { children: [y, Q] })),
              (r[76] = y),
              (r[77] = Q),
              (r[78] = $))
            : ($ = r[78]),
        $
    );
}
function de(e) {
    return (0, g.jsxs)(
        p,
        {
            children: [
                (0, g.jsx)(m, { children: h(e.fecha) }),
                (0, g.jsxs)(m, {
                    children: [e.hora_inicio, ` – `, e.hora_fin],
                }),
                (0, g.jsxs)(m, {
                    children: [
                        e.solicitante,
                        e.institucion &&
                            (0, g.jsx)(`span`, {
                                className: `block text-xs text-muted-foreground`,
                                children: e.institucion,
                            }),
                    ],
                }),
                (0, g.jsx)(m, { children: e.asistentes ?? `—` }),
                (0, g.jsx)(m, {
                    children: (0, g.jsx)(s, {
                        variant:
                            e.estado === `aprobada` ? `default` : `outline`,
                        children: e.estado_nombre,
                    }),
                }),
            ],
        },
        e.id,
    );
}
function fe(e) {
    return (0, g.jsxs)(
        `li`,
        {
            className: `flex items-center justify-between`,
            children: [
                (0, g.jsx)(`span`, { children: e.nombre }),
                (0, g.jsx)(`span`, {
                    className: `text-muted-foreground tabular-nums`,
                    children: e.cantidad,
                }),
            ],
        },
        e.id,
    );
}
v.layout = { breadcrumbs: [{ title: `Espacios`, href: re() }] };
export { v as default };
