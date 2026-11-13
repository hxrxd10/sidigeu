import { c as e, d as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { t as a } from './arrow-left-CWHaM1EE.js';
import { t as o } from './download-DSJLq0he.js';
import { n as s, t as c } from './membrete-institucional-isNdCdn7.js';
import { D as l, b as u, r as d, y as f } from './app-Bu9EFUG6.js';
import { a as p, i as m, n as h, t as g } from './card-Bc3dRGP7.js';
var _ = e(),
    v = n();
function y(e) {
    let t = (0, _.c)(7),
        { etiqueta: n, valor: r } = e,
        i;
    t[0] === n
        ? (i = t[1])
        : ((i = (0, v.jsx)(m, {
              className: `pb-2`,
              children: (0, v.jsx)(p, {
                  className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                  children: n,
              }),
          })),
          (t[0] = n),
          (t[1] = i));
    let a;
    t[2] === r
        ? (a = t[3])
        : ((a = (0, v.jsx)(h, {
              children: (0, v.jsx)(`p`, {
                  className: `text-3xl font-semibold`,
                  children: r,
              }),
          })),
          (t[2] = r),
          (t[3] = a));
    let o;
    return (
        t[4] !== i || t[5] !== a
            ? ((o = (0, v.jsxs)(g, { children: [i, a] })),
              (t[4] = i),
              (t[5] = a),
              (t[6] = o))
            : (o = t[6]),
        o
    );
}
function b(e) {
    let t = (0, _.c)(17),
        { titulo: n, grupos: r } = e,
        i;
    t[0] === r
        ? (i = t[1])
        : ((i = Math.max(1, ...r.map(x))), (t[0] = r), (t[1] = i));
    let a = i,
        o;
    t[2] === n
        ? (o = t[3])
        : ((o = (0, v.jsx)(m, { children: (0, v.jsx)(p, { children: n }) })),
          (t[2] = n),
          (t[3] = o));
    let s;
    t[4] === r.length
        ? (s = t[5])
        : ((s =
              r.length === 0 &&
              (0, v.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: `Sin registros.`,
              })),
          (t[4] = r.length),
          (t[5] = s));
    let c;
    if (t[6] !== r || t[7] !== a) {
        let e;
        (t[9] === a
            ? (e = t[10])
            : ((e = (e) =>
                  (0, v.jsxs)(
                      `div`,
                      {
                          className: `space-y-1`,
                          children: [
                              (0, v.jsxs)(`div`, {
                                  className: `flex items-center justify-between text-sm`,
                                  children: [
                                      (0, v.jsx)(`span`, {
                                          children: e.etiqueta,
                                      }),
                                      (0, v.jsx)(`span`, {
                                          className: `text-muted-foreground tabular-nums`,
                                          children: e.total,
                                      }),
                                  ],
                              }),
                              (0, v.jsx)(`div`, {
                                  className: `h-2 overflow-hidden rounded-full bg-muted`,
                                  role: `presentation`,
                                  children: (0, v.jsx)(`div`, {
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
              (t[9] = a),
              (t[10] = e)),
            (c = r.map(e)),
            (t[6] = r),
            (t[7] = a),
            (t[8] = c));
    } else c = t[8];
    let l;
    t[11] !== s || t[12] !== c
        ? ((l = (0, v.jsxs)(h, { className: `space-y-3`, children: [s, c] })),
          (t[11] = s),
          (t[12] = c),
          (t[13] = l))
        : (l = t[13]);
    let u;
    return (
        t[14] !== o || t[15] !== l
            ? ((u = (0, v.jsxs)(g, { children: [o, l] })),
              (t[14] = o),
              (t[15] = l),
              (t[16] = u))
            : (u = t[16]),
        u
    );
}
function x(e) {
    return e.total;
}
function S(e) {
    let n = (0, _.c)(35),
        {
            resumen: u,
            porTipo: p,
            porDisciplina: m,
            porNacionalidad: h,
            porRangoEdad: g,
        } = e,
        x;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, v.jsx)(r, { title: `Reportes de recurso humano` })),
          (n[0] = x))
        : (x = n[0]);
    let S;
    n[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = (0, v.jsx)(c, { titulo: `Padrón de artistas y deportistas` })),
          (n[1] = S))
        : (S = n[1]);
    let C;
    n[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = (0, v.jsx)(i, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2 print:hidden`,
              children: (0, v.jsxs)(t, {
                  href: f(),
                  children: [(0, v.jsx)(a, {}), `Volver al padrón`],
              }),
          })),
          (n[2] = C))
        : (C = n[2]);
    let w;
    n[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((w = (0, v.jsx)(d, {
              title: `Reportes de recurso humano`,
              description: `Estadísticas del padrón de artistas y deportistas`,
          })),
          (n[3] = w))
        : (w = n[3]);
    let T;
    n[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = l()), (n[4] = T))
        : (T = n[4]);
    let E;
    n[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, v.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4 print:hidden`,
              children: [
                  w,
                  (0, v.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [
                          (0, v.jsx)(i, {
                              variant: `outline`,
                              asChild: !0,
                              children: (0, v.jsxs)(`a`, {
                                  href: T.url,
                                  children: [
                                      (0, v.jsx)(o, {}),
                                      `Exportar padrón (CSV)`,
                                  ],
                              }),
                          }),
                          (0, v.jsx)(s, {}),
                      ],
                  }),
              ],
          })),
          (n[5] = E))
        : (E = n[5]);
    let D = String(u.total),
        O;
    n[6] === D
        ? (O = n[7])
        : ((O = (0, v.jsx)(y, { etiqueta: `Total registrado`, valor: D })),
          (n[6] = D),
          (n[7] = O));
    let k = String(u.activos),
        A;
    n[8] === k
        ? (A = n[9])
        : ((A = (0, v.jsx)(y, { etiqueta: `Activos`, valor: k })),
          (n[8] = k),
          (n[9] = A));
    let j = String(u.inactivos),
        M;
    n[10] === j
        ? (M = n[11])
        : ((M = (0, v.jsx)(y, { etiqueta: `Inactivos`, valor: j })),
          (n[10] = j),
          (n[11] = M));
    let N;
    n[12] === u.promedio_permanencia.texto
        ? (N = n[13])
        : ((N = (0, v.jsx)(y, {
              etiqueta: `Permanencia promedio`,
              valor: u.promedio_permanencia.texto,
          })),
          (n[12] = u.promedio_permanencia.texto),
          (n[13] = N));
    let P;
    n[14] !== A || n[15] !== M || n[16] !== N || n[17] !== O
        ? ((P = (0, v.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,
              children: [O, A, M, N],
          })),
          (n[14] = A),
          (n[15] = M),
          (n[16] = N),
          (n[17] = O),
          (n[18] = P))
        : (P = n[18]);
    let F;
    n[19] === p
        ? (F = n[20])
        : ((F = (0, v.jsx)(b, { titulo: `Por tipo`, grupos: p })),
          (n[19] = p),
          (n[20] = F));
    let I;
    n[21] === g
        ? (I = n[22])
        : ((I = (0, v.jsx)(b, { titulo: `Por rango de edad`, grupos: g })),
          (n[21] = g),
          (n[22] = I));
    let L;
    n[23] === m
        ? (L = n[24])
        : ((L = (0, v.jsx)(b, { titulo: `Por disciplina`, grupos: m })),
          (n[23] = m),
          (n[24] = L));
    let R;
    n[25] === h
        ? (R = n[26])
        : ((R = (0, v.jsx)(b, { titulo: `Por nacionalidad`, grupos: h })),
          (n[25] = h),
          (n[26] = R));
    let z;
    n[27] !== F || n[28] !== I || n[29] !== L || n[30] !== R
        ? ((z = (0, v.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2`,
              children: [F, I, L, R],
          })),
          (n[27] = F),
          (n[28] = I),
          (n[29] = L),
          (n[30] = R),
          (n[31] = z))
        : (z = n[31]);
    let B;
    return (
        n[32] !== P || n[33] !== z
            ? ((B = (0, v.jsxs)(v.Fragment, {
                  children: [
                      x,
                      (0, v.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [S, C, E, P, z],
                      }),
                  ],
              })),
              (n[32] = P),
              (n[33] = z),
              (n[34] = B))
            : (B = n[34]),
        B
    );
}
S.layout = {
    breadcrumbs: [
        { title: `Recurso humano`, href: f() },
        { title: `Reportes`, href: u() },
    ],
};
export { S as default };
