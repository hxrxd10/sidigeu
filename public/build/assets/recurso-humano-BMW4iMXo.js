import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    g as ee,
    h as r,
    s as i,
    u as te,
} from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as ne } from './chart-column-DYgco7gK.js';
import {
    a as re,
    i as ie,
    n as ae,
    r as o,
    t as s,
} from './select-hxeu1kQ_.js';
import { t as oe } from './download-DSJLq0he.js';
import { t as se } from './file-spreadsheet-gg-INAOi.js';
import { t as ce } from './plus-B2NIGUck.js';
import {
    D as le,
    S as ue,
    St as de,
    Tt as fe,
    _ as pe,
    b as me,
    bt as he,
    f as ge,
    r as _e,
    x as ve,
    xt as ye,
    y as be,
    yt as xe,
} from './app-Bu9EFUG6.js';
import {
    a as Se,
    i as c,
    n as Ce,
    o as l,
    r as u,
    t as we,
} from './table-D3mJxxJl.js';
import { t as Te } from './paginacion-HQOmOGhf.js';
var Ee = t(),
    De = e(r(), 1),
    d = i(),
    f = `todos`;
function p(e) {
    let t = (0, Ee.c)(78),
        { personas: r, filtros: i, opciones: p, puedeGestionar: m } = e,
        [h, Ae] = (0, De.useState)(i.busqueda),
        g = xe(),
        _;
    t[0] === i
        ? (_ = t[1])
        : ((_ = (e) => {
              ee.get(
                  be().url,
                  { ...i, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = i),
          (t[1] = _));
    let v = _,
        y;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((y = (0, d.jsx)(te, { title: `Recurso humano` })), (t[2] = y))
        : (y = t[2]);
    let b;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, d.jsx)(_e, {
              title: `Artistas y deportistas`,
              description: `Padrón del recurso humano vinculado a la DIGEU`,
          })),
          (t[3] = b))
        : (b = t[3]);
    let x;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, d.jsx)(a, {
              variant: `outline`,
              asChild: !0,
              children: (0, d.jsxs)(n, {
                  href: me(),
                  children: [(0, d.jsx)(ne, {}), `Reportes`],
              }),
          })),
          (t[4] = x))
        : (x = t[4]);
    let S;
    t[5] === i.busqueda
        ? (S = t[6])
        : ((S = le({ query: { busqueda: i.busqueda } })),
          (t[5] = i.busqueda),
          (t[6] = S));
    let C;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = (0, d.jsx)(oe, {})), (t[7] = C))
        : (C = t[7]);
    let w;
    t[8] === S.url
        ? (w = t[9])
        : ((w = (0, d.jsx)(a, {
              variant: `outline`,
              asChild: !0,
              children: (0, d.jsxs)(`a`, {
                  href: S.url,
                  children: [C, `Exportar`],
              }),
          })),
          (t[8] = S.url),
          (t[9] = w));
    let T;
    t[10] === m
        ? (T = t[11])
        : ((T =
              m &&
              (0, d.jsxs)(d.Fragment, {
                  children: [
                      (0, d.jsx)(a, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, d.jsxs)(n, {
                              href: ue(),
                              children: [(0, d.jsx)(se, {}), `Carga masiva`],
                          }),
                      }),
                      (0, d.jsx)(a, {
                          asChild: !0,
                          children: (0, d.jsxs)(n, {
                              href: pe(),
                              children: [(0, d.jsx)(ce, {}), `Nuevo registro`],
                          }),
                      }),
                  ],
              })),
          (t[10] = m),
          (t[11] = T));
    let E;
    t[12] !== w || t[13] !== T
        ? ((E = (0, d.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [
                  b,
                  (0, d.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [x, w, T],
                  }),
              ],
          })),
          (t[12] = w),
          (t[13] = T),
          (t[14] = E))
        : (E = t[14]);
    let D;
    t[15] !== h || t[16] !== v
        ? ((D = (e) => {
              (e.preventDefault(), v({ busqueda: h }));
          }),
          (t[15] = h),
          (t[16] = v),
          (t[17] = D))
        : (D = t[17]);
    let O;
    t[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (e) => Ae(e.target.value)), (t[18] = O))
        : (O = t[18]);
    let k;
    t[19] === h
        ? (k = t[20])
        : ((k = (0, d.jsx)(fe, {
              value: h,
              onChange: O,
              placeholder: `Buscar por nombre, DPI o pasaporte`,
              'aria-label': `Buscar personas`,
          })),
          (t[19] = h),
          (t[20] = k));
    let A;
    t[21] !== D || t[22] !== k
        ? ((A = (0, d.jsx)(`form`, {
              className: `flex-1 sm:max-w-xs`,
              onSubmit: D,
              children: k,
          })),
          (t[21] = D),
          (t[22] = k),
          (t[23] = A))
        : (A = t[23]);
    let je = i.tipo || f,
        j;
    t[24] === v
        ? (j = t[25])
        : ((j = (e) => v({ tipo: e === f ? `` : e })),
          (t[24] = v),
          (t[25] = j));
    let M;
    t[26] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((M = (0, d.jsx)(ie, {
              className: `w-44`,
              children: (0, d.jsx)(re, { placeholder: `Tipo` }),
          })),
          (t[26] = M))
        : (M = t[26]);
    let N;
    t[27] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((N = (0, d.jsx)(o, { value: f, children: `Todos` })), (t[27] = N))
        : (N = t[27]);
    let P;
    t[28] === p.tipos
        ? (P = t[29])
        : ((P = p.tipos.map(ke)), (t[28] = p.tipos), (t[29] = P));
    let F;
    t[30] === P
        ? (F = t[31])
        : ((F = (0, d.jsxs)(ae, { children: [N, P] })),
          (t[30] = P),
          (t[31] = F));
    let I;
    t[32] !== je || t[33] !== j || t[34] !== F
        ? ((I = (0, d.jsxs)(s, {
              value: je,
              onValueChange: j,
              children: [M, F],
          })),
          (t[32] = je),
          (t[33] = j),
          (t[34] = F),
          (t[35] = I))
        : (I = t[35]);
    let Me = i.disciplina_id ? String(i.disciplina_id) : f,
        L;
    t[36] === v
        ? (L = t[37])
        : ((L = (e) => v({ disciplina_id: e === f ? null : Number(e) })),
          (t[36] = v),
          (t[37] = L));
    let R;
    t[38] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((R = (0, d.jsx)(ie, {
              className: `w-56`,
              children: (0, d.jsx)(re, { placeholder: `Disciplina` }),
          })),
          (t[38] = R))
        : (R = t[38]);
    let z;
    t[39] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((z = (0, d.jsx)(o, { value: f, children: `Todas las disciplinas` })),
          (t[39] = z))
        : (z = t[39]);
    let B;
    t[40] === p.disciplinas
        ? (B = t[41])
        : ((B = p.disciplinas.map(Oe)), (t[40] = p.disciplinas), (t[41] = B));
    let V;
    t[42] === B
        ? (V = t[43])
        : ((V = (0, d.jsxs)(ae, { children: [z, B] })),
          (t[42] = B),
          (t[43] = V));
    let H;
    t[44] !== Me || t[45] !== L || t[46] !== V
        ? ((H = (0, d.jsxs)(s, {
              value: Me,
              onValueChange: L,
              children: [R, V],
          })),
          (t[44] = Me),
          (t[45] = L),
          (t[46] = V),
          (t[47] = H))
        : (H = t[47]);
    let Ne = i.estado || f,
        U;
    t[48] === v
        ? (U = t[49])
        : ((U = (e) => v({ estado: e === f ? `` : e })),
          (t[48] = v),
          (t[49] = U));
    let W;
    t[50] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = (0, d.jsx)(ie, {
              className: `w-40`,
              children: (0, d.jsx)(re, { placeholder: `Estado` }),
          })),
          (t[50] = W))
        : (W = t[50]);
    let G;
    t[51] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((G = (0, d.jsxs)(ae, {
              children: [
                  (0, d.jsx)(o, { value: f, children: `Todos` }),
                  (0, d.jsx)(o, { value: `activos`, children: `Activos` }),
                  (0, d.jsx)(o, { value: `inactivos`, children: `Inactivos` }),
              ],
          })),
          (t[51] = G))
        : (G = t[51]);
    let K;
    t[52] !== Ne || t[53] !== U
        ? ((K = (0, d.jsxs)(s, {
              value: Ne,
              onValueChange: U,
              children: [W, G],
          })),
          (t[52] = Ne),
          (t[53] = U),
          (t[54] = K))
        : (K = t[54]);
    let q;
    t[55] !== A || t[56] !== I || t[57] !== H || t[58] !== K
        ? ((q = (0, d.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [A, I, H, K],
          })),
          (t[55] = A),
          (t[56] = I),
          (t[57] = H),
          (t[58] = K),
          (t[59] = q))
        : (q = t[59]);
    let J;
    t[60] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (0, d.jsx)(Se, {
              children: (0, d.jsxs)(l, {
                  children: [
                      (0, d.jsx)(c, { children: `Persona` }),
                      (0, d.jsx)(c, { children: `Tipo` }),
                      (0, d.jsx)(c, { children: `Disciplina` }),
                      (0, d.jsx)(c, { children: `Nacionalidad` }),
                      (0, d.jsx)(c, { children: `Edad` }),
                      (0, d.jsx)(c, { children: `Permanencia` }),
                      (0, d.jsx)(c, { children: `Estado` }),
                  ],
              }),
          })),
          (t[60] = J))
        : (J = t[60]);
    let Y;
    if (t[61] !== g || t[62] !== r.data) {
        let e;
        (t[64] === g
            ? (e = t[65])
            : ((e = (e) =>
                  (0, d.jsxs)(
                      l,
                      {
                          children: [
                              (0, d.jsx)(u, {
                                  children: (0, d.jsxs)(n, {
                                      href: ve(e.id),
                                      className: `flex items-center gap-3 hover:underline`,
                                      children: [
                                          (0, d.jsxs)(he, {
                                              className: `size-9`,
                                              children: [
                                                  e.foto_url &&
                                                      (0, d.jsx)(de, {
                                                          src: e.foto_url,
                                                          alt: e.nombre_completo,
                                                      }),
                                                  (0, d.jsx)(ye, {
                                                      children: g(
                                                          e.nombre_completo,
                                                      ),
                                                  }),
                                              ],
                                          }),
                                          (0, d.jsx)(`span`, {
                                              className: `font-medium`,
                                              children: e.nombre_completo,
                                          }),
                                      ],
                                  }),
                              }),
                              (0, d.jsx)(u, { children: e.tipo_nombre }),
                              (0, d.jsx)(u, { children: e.disciplina ?? `—` }),
                              (0, d.jsx)(u, { children: e.pais ?? `—` }),
                              (0, d.jsx)(u, { children: e.edad }),
                              (0, d.jsx)(u, {
                                  className: `text-muted-foreground`,
                                  children: e.permanencia.texto,
                              }),
                              (0, d.jsx)(u, {
                                  children: (0, d.jsx)(ge, {
                                      variant: e.activo ? `default` : `outline`,
                                      children: e.activo
                                          ? `Activo`
                                          : `Inactivo`,
                                  }),
                              }),
                          ],
                      },
                      e.id,
                  )),
              (t[64] = g),
              (t[65] = e)),
            (Y = r.data.map(e)),
            (t[61] = g),
            (t[62] = r.data),
            (t[63] = Y));
    } else Y = t[63];
    let X;
    t[66] === r.data.length
        ? (X = t[67])
        : ((X =
              r.data.length === 0 &&
              (0, d.jsx)(l, {
                  children: (0, d.jsx)(u, {
                      colSpan: 7,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay registros que coincidan con los filtros.`,
                  }),
              })),
          (t[66] = r.data.length),
          (t[67] = X));
    let Z;
    t[68] !== Y || t[69] !== X
        ? ((Z = (0, d.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, d.jsxs)(we, {
                  children: [J, (0, d.jsxs)(Ce, { children: [Y, X] })],
              }),
          })),
          (t[68] = Y),
          (t[69] = X),
          (t[70] = Z))
        : (Z = t[70]);
    let Q;
    t[71] === r
        ? (Q = t[72])
        : ((Q = (0, d.jsx)(Te, { paginado: r, etiqueta: `personas` })),
          (t[71] = r),
          (t[72] = Q));
    let $;
    return (
        t[73] !== q || t[74] !== Z || t[75] !== Q || t[76] !== E
            ? (($ = (0, d.jsxs)(d.Fragment, {
                  children: [
                      y,
                      (0, d.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [E, q, Z, Q],
                      }),
                  ],
              })),
              (t[73] = q),
              (t[74] = Z),
              (t[75] = Q),
              (t[76] = E),
              (t[77] = $))
            : ($ = t[77]),
        $
    );
}
function Oe(e) {
    return (0, d.jsx)(
        o,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function ke(e) {
    return (0, d.jsx)(o, { value: e.valor, children: e.nombre }, e.valor);
}
p.layout = { breadcrumbs: [{ title: `Recurso humano`, href: be() }] };
export { p as default };
