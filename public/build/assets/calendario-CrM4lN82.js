import {
    c as e,
    g as t,
    i as n,
    s as r,
    u as ee,
} from './wayfinder-C8dNLrFV.js';
import { t as te } from './button-BzkMvCJO.js';
import { t as ne } from './chevron-left-Df1ekNYv.js';
import {
    a as re,
    i as ie,
    n as ae,
    r as i,
    t as oe,
} from './select-hxeu1kQ_.js';
import { $ as se, jt as ce, r as le } from './app-Bu9EFUG6.js';
var ue = e(),
    a = r(),
    o = `todos`;
function s(e) {
    let n = (0, ue.c)(93),
        {
            filtros: r,
            rango: s,
            navegacion: c,
            espacios: l,
            reservas: he,
            opciones: u,
        } = e,
        d;
    n[0] === r
        ? (d = n[1])
        : ((d = (e) => {
              t.get(
                  se().url,
                  { ...r, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (n[0] = r),
          (n[1] = d));
    let f = d,
        p;
    n[2] === he
        ? (p = n[3])
        : ((p = (e, t) =>
              he.filter((n) => n.espacio_id === e && n.fecha === t)),
          (n[2] = he),
          (n[3] = p));
    let m = p,
        h;
    n[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, a.jsx)(ee, { title: `Calendario de ocupación` })),
          (n[4] = h))
        : (h = n[4]);
    let g;
    n[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, a.jsx)(le, {
              title: `Calendario de ocupación`,
              description: `Filas por espacio y columnas por día. Las reservas aprobadas bloquean el horario.`,
          })),
          (n[5] = g))
        : (g = n[5]);
    let _;
    n[6] !== c.anterior || n[7] !== f
        ? ((_ = () => f({ fecha: c.anterior })),
          (n[6] = c.anterior),
          (n[7] = f),
          (n[8] = _))
        : (_ = n[8]);
    let v;
    n[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, a.jsx)(ne, {})), (n[9] = v))
        : (v = n[9]);
    let y;
    n[10] === _
        ? (y = n[11])
        : ((y = (0, a.jsx)(te, {
              variant: `outline`,
              size: `icon`,
              'aria-label': `Período anterior`,
              onClick: _,
              children: v,
          })),
          (n[10] = _),
          (n[11] = y));
    let b;
    n[12] !== c.hoy || n[13] !== f
        ? ((b = (0, a.jsx)(te, {
              variant: `outline`,
              onClick: () => f({ fecha: c.hoy }),
              children: `Hoy`,
          })),
          (n[12] = c.hoy),
          (n[13] = f),
          (n[14] = b))
        : (b = n[14]);
    let x;
    n[15] !== c.siguiente || n[16] !== f
        ? ((x = () => f({ fecha: c.siguiente })),
          (n[15] = c.siguiente),
          (n[16] = f),
          (n[17] = x))
        : (x = n[17]);
    let ge;
    n[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ge = (0, a.jsx)(ce, {})), (n[18] = ge))
        : (ge = n[18]);
    let S;
    n[19] === x
        ? (S = n[20])
        : ((S = (0, a.jsx)(te, {
              variant: `outline`,
              size: `icon`,
              'aria-label': `Período siguiente`,
              onClick: x,
              children: ge,
          })),
          (n[19] = x),
          (n[20] = S));
    let C;
    n[21] !== S || n[22] !== y || n[23] !== b
        ? ((C = (0, a.jsxs)(`div`, {
              className: `flex items-center gap-1`,
              children: [y, b, S],
          })),
          (n[21] = S),
          (n[22] = y),
          (n[23] = b),
          (n[24] = C))
        : (C = n[24]);
    let w;
    n[25] === s.etiqueta
        ? (w = n[26])
        : ((w = (0, a.jsx)(`p`, {
              className: `font-medium first-letter:uppercase`,
              children: s.etiqueta,
          })),
          (n[25] = s.etiqueta),
          (n[26] = w));
    let T;
    n[27] === f
        ? (T = n[28])
        : ((T = (e) => f({ vista: e })), (n[27] = f), (n[28] = T));
    let E;
    n[29] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, a.jsx)(ie, {
              className: `w-36`,
              children: (0, a.jsx)(re, {}),
          })),
          (n[29] = E))
        : (E = n[29]);
    let D;
    n[30] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = (0, a.jsxs)(ae, {
              children: [
                  (0, a.jsx)(i, { value: `dia`, children: `Día` }),
                  (0, a.jsx)(i, { value: `semana`, children: `Semana` }),
                  (0, a.jsx)(i, { value: `mes`, children: `Mes` }),
              ],
          })),
          (n[30] = D))
        : (D = n[30]);
    let O;
    n[31] !== r.vista || n[32] !== T
        ? ((O = (0, a.jsxs)(oe, {
              value: r.vista,
              onValueChange: T,
              children: [E, D],
          })),
          (n[31] = r.vista),
          (n[32] = T),
          (n[33] = O))
        : (O = n[33]);
    let _e = r.sede_id ? String(r.sede_id) : o,
        k;
    n[34] === f
        ? (k = n[35])
        : ((k = (e) => f({ sede_id: e === o ? null : Number(e) })),
          (n[34] = f),
          (n[35] = k));
    let A;
    n[36] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, a.jsx)(ie, {
              className: `w-48`,
              children: (0, a.jsx)(re, { placeholder: `Sede` }),
          })),
          (n[36] = A))
        : (A = n[36]);
    let j;
    n[37] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((j = (0, a.jsx)(i, { value: o, children: `Todas las sedes` })),
          (n[37] = j))
        : (j = n[37]);
    let M;
    n[38] === u.sedes
        ? (M = n[39])
        : ((M = u.sedes.map(me)), (n[38] = u.sedes), (n[39] = M));
    let N;
    n[40] === M
        ? (N = n[41])
        : ((N = (0, a.jsxs)(ae, { children: [j, M] })),
          (n[40] = M),
          (n[41] = N));
    let P;
    n[42] !== _e || n[43] !== k || n[44] !== N
        ? ((P = (0, a.jsxs)(oe, {
              value: _e,
              onValueChange: k,
              children: [A, N],
          })),
          (n[42] = _e),
          (n[43] = k),
          (n[44] = N),
          (n[45] = P))
        : (P = n[45]);
    let ve = r.estado || o,
        F;
    n[46] === f
        ? (F = n[47])
        : ((F = (e) => f({ estado: e === o ? `` : e })),
          (n[46] = f),
          (n[47] = F));
    let I;
    n[48] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((I = (0, a.jsx)(ie, {
              className: `w-44`,
              children: (0, a.jsx)(re, { placeholder: `Estado` }),
          })),
          (n[48] = I))
        : (I = n[48]);
    let L;
    n[49] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((L = (0, a.jsx)(i, { value: o, children: `Todos` })), (n[49] = L))
        : (L = n[49]);
    let R;
    n[50] === u.estados
        ? (R = n[51])
        : ((R = u.estados.map(pe)), (n[50] = u.estados), (n[51] = R));
    let z;
    n[52] === R
        ? (z = n[53])
        : ((z = (0, a.jsxs)(ae, { children: [L, R] })),
          (n[52] = R),
          (n[53] = z));
    let B;
    n[54] !== ve || n[55] !== F || n[56] !== z
        ? ((B = (0, a.jsxs)(oe, {
              value: ve,
              onValueChange: F,
              children: [I, z],
          })),
          (n[54] = ve),
          (n[55] = F),
          (n[56] = z),
          (n[57] = B))
        : (B = n[57]);
    let V;
    n[58] !== O || n[59] !== P || n[60] !== B
        ? ((V = (0, a.jsxs)(`div`, {
              className: `ml-auto flex flex-wrap gap-3`,
              children: [O, P, B],
          })),
          (n[58] = O),
          (n[59] = P),
          (n[60] = B),
          (n[61] = V))
        : (V = n[61]);
    let H;
    n[62] !== C || n[63] !== w || n[64] !== V
        ? ((H = (0, a.jsxs)(`div`, {
              className: `flex flex-wrap items-center gap-3`,
              children: [C, w, V],
          })),
          (n[62] = C),
          (n[63] = w),
          (n[64] = V),
          (n[65] = H))
        : (H = n[65]);
    let U;
    n[66] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((U = (0, a.jsxs)(`span`, {
              className: `flex items-center gap-2`,
              children: [
                  (0, a.jsx)(`span`, {
                      className: `size-3 rounded-full bg-destructive`,
                  }),
                  `Ocupado`,
              ],
          })),
          (n[66] = U))
        : (U = n[66]);
    let W;
    n[67] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = (0, a.jsxs)(`span`, {
              className: `flex items-center gap-2`,
              children: [
                  (0, a.jsx)(`span`, {
                      className: `size-3 rounded-full bg-digeu-amber`,
                  }),
                  `Pendiente de confirmación`,
              ],
          })),
          (n[67] = W))
        : (W = n[67]);
    let G;
    n[68] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((G = (0, a.jsxs)(`div`, {
              className: `flex flex-wrap gap-4 text-sm`,
              children: [
                  U,
                  W,
                  (0, a.jsxs)(`span`, {
                      className: `flex items-center gap-2`,
                      children: [
                          (0, a.jsx)(`span`, {
                              className: `size-3 rounded-full bg-digeu-green`,
                          }),
                          `Disponible`,
                      ],
                  }),
              ],
          })),
          (n[68] = G))
        : (G = n[68]);
    let K;
    n[69] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((K = (0, a.jsx)(`th`, {
              className: `sticky left-0 w-56 bg-muted/50 px-3 py-2 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase`,
              children: `Espacio`,
          })),
          (n[69] = K))
        : (K = n[69]);
    let q;
    n[70] === s.dias
        ? (q = n[71])
        : ((q = s.dias.map(fe)), (n[70] = s.dias), (n[71] = q));
    let J;
    n[72] === q
        ? (J = n[73])
        : ((J = (0, a.jsx)(`thead`, {
              children: (0, a.jsxs)(`tr`, {
                  className: `border-b`,
                  children: [K, q],
              }),
          })),
          (n[72] = q),
          (n[73] = J));
    let Y;
    if (n[74] !== l || n[75] !== s.dias || n[76] !== m) {
        let e;
        (n[78] !== s.dias || n[79] !== m
            ? ((e = (e) =>
                  (0, a.jsxs)(
                      `tr`,
                      {
                          className: `border-b`,
                          children: [
                              (0, a.jsxs)(`th`, {
                                  className: `sticky left-0 bg-background px-3 py-2 text-left font-medium`,
                                  children: [
                                      e.nombre,
                                      (0, a.jsxs)(`span`, {
                                          className: `block text-xs font-normal text-muted-foreground`,
                                          children: [
                                              e.sede,
                                              !e.admite_reservas &&
                                                  ` · ${e.estado_nombre}`,
                                          ],
                                      }),
                                  ],
                              }),
                              s.dias.map((t) => {
                                  let n = m(e.id, t.fecha);
                                  return (0, a.jsx)(
                                      `td`,
                                      {
                                          className: `align-top`,
                                          children: (0, a.jsxs)(`div`, {
                                              className: `space-y-1 p-1`,
                                              children: [
                                                  n.length === 0 &&
                                                      (0, a.jsx)(`span`, {
                                                          className: `block h-6 rounded bg-digeu-green/10`,
                                                      }),
                                                  n.map(de),
                                              ],
                                          }),
                                      },
                                      t.fecha,
                                  );
                              }),
                          ],
                      },
                      e.id,
                  )),
              (n[78] = s.dias),
              (n[79] = m),
              (n[80] = e))
            : (e = n[80]),
            (Y = l.map(e)),
            (n[74] = l),
            (n[75] = s.dias),
            (n[76] = m),
            (n[77] = Y));
    } else Y = n[77];
    let X;
    n[81] !== l.length || n[82] !== s.dias.length
        ? ((X =
              l.length === 0 &&
              (0, a.jsx)(`tr`, {
                  children: (0, a.jsx)(`td`, {
                      colSpan: s.dias.length + 1,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay espacios con esos filtros.`,
                  }),
              })),
          (n[81] = l.length),
          (n[82] = s.dias.length),
          (n[83] = X))
        : (X = n[83]);
    let Z;
    n[84] !== Y || n[85] !== X
        ? ((Z = (0, a.jsxs)(`tbody`, { children: [Y, X] })),
          (n[84] = Y),
          (n[85] = X),
          (n[86] = Z))
        : (Z = n[86]);
    let Q;
    n[87] !== J || n[88] !== Z
        ? ((Q = (0, a.jsx)(`div`, {
              className: `overflow-x-auto rounded-xl border`,
              children: (0, a.jsxs)(`table`, {
                  className: `w-full border-collapse text-sm`,
                  children: [J, Z],
              }),
          })),
          (n[87] = J),
          (n[88] = Z),
          (n[89] = Q))
        : (Q = n[89]);
    let $;
    return (
        n[90] !== H || n[91] !== Q
            ? (($ = (0, a.jsxs)(a.Fragment, {
                  children: [
                      h,
                      (0, a.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [g, H, G, Q],
                      }),
                  ],
              })),
              (n[90] = H),
              (n[91] = Q),
              (n[92] = $))
            : ($ = n[92]),
        $
    );
}
function de(e) {
    return (0, a.jsxs)(
        `span`,
        {
            title: `${e.solicitante}: ${e.proposito}`,
            className: n(
                `block truncate rounded px-1.5 py-1 text-xs`,
                e.estado === `aprobada`
                    ? `bg-destructive/15 text-destructive`
                    : `bg-digeu-amber/20 text-digeu-navy dark:text-digeu-amber`,
            ),
            children: [e.hora_inicio, `–`, e.hora_fin],
        },
        e.id,
    );
}
function fe(e) {
    return (0, a.jsx)(
        `th`,
        {
            className: n(
                `min-w-32 px-2 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase`,
                e.es_hoy && `text-primary`,
            ),
            children: e.etiqueta,
        },
        e.fecha,
    );
}
function pe(e) {
    return (0, a.jsx)(i, { value: e.valor, children: e.nombre }, e.valor);
}
function me(e) {
    return (0, a.jsx)(
        i,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
s.layout = { breadcrumbs: [{ title: `Calendario`, href: se() }] };
export { s as default };
