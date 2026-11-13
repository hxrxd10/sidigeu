import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    g as ee,
    h as n,
    s as r,
    u as te,
} from './wayfinder-C8dNLrFV.js';
import { t as ne } from './button-BzkMvCJO.js';
import {
    a as re,
    i as ie,
    n as ae,
    r as i,
    t as oe,
} from './select-hxeu1kQ_.js';
import {
    Tt as se,
    et as ce,
    f as le,
    i as ue,
    l as de,
    o as fe,
    r as pe,
    s as me,
    u as he,
} from './app-Bu9EFUG6.js';
import { t as ge } from './label-D0AQUEbO.js';
import {
    a as _e,
    i as a,
    n as ve,
    o as ye,
    r as o,
    t as be,
} from './table-D3mJxxJl.js';
import { t as xe } from './paginacion-HQOmOGhf.js';
var Se = t(),
    Ce = e(n(), 1),
    s = r(),
    c = `todos`;
function l(e) {
    let t = (0, Se.c)(106),
        { registros: n, filtros: r, opciones: l } = e,
        [u, De] = (0, Ce.useState)(null),
        Oe;
    t[0] === r
        ? (Oe = t[1])
        : ((Oe = (e) => {
              ee.get(
                  ce().url,
                  { ...r, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = r),
          (t[1] = Oe));
    let d = Oe,
        ke;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ke = (0, s.jsx)(te, { title: `Bitácora de auditoría` })),
          (t[2] = ke))
        : (ke = t[2]);
    let Ae;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ae = (0, s.jsx)(pe, {
              title: `Bitácora de auditoría`,
              description: `Quién cambió qué, cuándo y con qué valores`,
          })),
          (t[3] = Ae))
        : (Ae = t[3]);
    let je = r.user_id ? String(r.user_id) : c,
        f;
    t[4] === d
        ? (f = t[5])
        : ((f = (e) => d({ user_id: e === c ? null : Number(e) })),
          (t[4] = d),
          (t[5] = f));
    let p;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((p = (0, s.jsx)(ie, {
              className: `w-56`,
              children: (0, s.jsx)(re, { placeholder: `Usuario` }),
          })),
          (t[6] = p))
        : (p = t[6]);
    let m;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((m = (0, s.jsx)(i, { value: c, children: `Todos los usuarios` })),
          (t[7] = m))
        : (m = t[7]);
    let h;
    t[8] === l.usuarios
        ? (h = t[9])
        : ((h = l.usuarios.map(Ee)), (t[8] = l.usuarios), (t[9] = h));
    let g;
    t[10] === h
        ? (g = t[11])
        : ((g = (0, s.jsxs)(ae, { children: [m, h] })),
          (t[10] = h),
          (t[11] = g));
    let _;
    t[12] !== je || t[13] !== f || t[14] !== g
        ? ((_ = (0, s.jsxs)(oe, {
              value: je,
              onValueChange: f,
              children: [p, g],
          })),
          (t[12] = je),
          (t[13] = f),
          (t[14] = g),
          (t[15] = _))
        : (_ = t[15]);
    let Me = r.entidad || c,
        v;
    t[16] === d
        ? (v = t[17])
        : ((v = (e) => d({ entidad: e === c ? `` : e })),
          (t[16] = d),
          (t[17] = v));
    let y;
    t[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((y = (0, s.jsx)(ie, {
              className: `w-56`,
              children: (0, s.jsx)(re, { placeholder: `Entidad` }),
          })),
          (t[18] = y))
        : (y = t[18]);
    let b;
    t[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, s.jsx)(i, { value: c, children: `Todas las entidades` })),
          (t[19] = b))
        : (b = t[19]);
    let x;
    t[20] === l.entidades
        ? (x = t[21])
        : ((x = l.entidades.map(Te)), (t[20] = l.entidades), (t[21] = x));
    let S;
    t[22] === x
        ? (S = t[23])
        : ((S = (0, s.jsxs)(ae, { children: [b, x] })),
          (t[22] = x),
          (t[23] = S));
    let C;
    t[24] !== Me || t[25] !== v || t[26] !== S
        ? ((C = (0, s.jsxs)(oe, {
              value: Me,
              onValueChange: v,
              children: [y, S],
          })),
          (t[24] = Me),
          (t[25] = v),
          (t[26] = S),
          (t[27] = C))
        : (C = t[27]);
    let Ne = r.accion || c,
        w;
    t[28] === d
        ? (w = t[29])
        : ((w = (e) => d({ accion: e === c ? `` : e })),
          (t[28] = d),
          (t[29] = w));
    let T;
    t[30] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = (0, s.jsx)(ie, {
              className: `w-44`,
              children: (0, s.jsx)(re, { placeholder: `Acción` }),
          })),
          (t[30] = T))
        : (T = t[30]);
    let E;
    t[31] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, s.jsx)(i, { value: c, children: `Todas las acciones` })),
          (t[31] = E))
        : (E = t[31]);
    let D;
    t[32] === l.acciones
        ? (D = t[33])
        : ((D = l.acciones.map(we)), (t[32] = l.acciones), (t[33] = D));
    let O;
    t[34] === D
        ? (O = t[35])
        : ((O = (0, s.jsxs)(ae, { children: [E, D] })),
          (t[34] = D),
          (t[35] = O));
    let k;
    t[36] !== Ne || t[37] !== w || t[38] !== O
        ? ((k = (0, s.jsxs)(oe, {
              value: Ne,
              onValueChange: w,
              children: [T, O],
          })),
          (t[36] = Ne),
          (t[37] = w),
          (t[38] = O),
          (t[39] = k))
        : (k = t[39]);
    let A;
    t[40] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, s.jsx)(ge, {
              htmlFor: `desde`,
              className: `text-xs`,
              children: `Desde`,
          })),
          (t[40] = A))
        : (A = t[40]);
    let j;
    t[41] === d
        ? (j = t[42])
        : ((j = (e) => d({ desde: e.target.value })), (t[41] = d), (t[42] = j));
    let M;
    t[43] !== r.desde || t[44] !== j
        ? ((M = (0, s.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  A,
                  (0, s.jsx)(se, {
                      id: `desde`,
                      type: `date`,
                      className: `w-40`,
                      defaultValue: r.desde,
                      onChange: j,
                  }),
              ],
          })),
          (t[43] = r.desde),
          (t[44] = j),
          (t[45] = M))
        : (M = t[45]);
    let N;
    t[46] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((N = (0, s.jsx)(ge, {
              htmlFor: `hasta`,
              className: `text-xs`,
              children: `Hasta`,
          })),
          (t[46] = N))
        : (N = t[46]);
    let P;
    t[47] === d
        ? (P = t[48])
        : ((P = (e) => d({ hasta: e.target.value })), (t[47] = d), (t[48] = P));
    let F;
    t[49] !== r.hasta || t[50] !== P
        ? ((F = (0, s.jsxs)(`div`, {
              className: `grid gap-1`,
              children: [
                  N,
                  (0, s.jsx)(se, {
                      id: `hasta`,
                      type: `date`,
                      className: `w-40`,
                      defaultValue: r.hasta,
                      onChange: P,
                  }),
              ],
          })),
          (t[49] = r.hasta),
          (t[50] = P),
          (t[51] = F))
        : (F = t[51]);
    let I;
    t[52] !== _ || t[53] !== C || t[54] !== k || t[55] !== M || t[56] !== F
        ? ((I = (0, s.jsxs)(`div`, {
              className: `flex flex-wrap items-end gap-3`,
              children: [_, C, k, M, F],
          })),
          (t[52] = _),
          (t[53] = C),
          (t[54] = k),
          (t[55] = M),
          (t[56] = F),
          (t[57] = I))
        : (I = t[57]);
    let L;
    t[58] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((L = (0, s.jsx)(_e, {
              children: (0, s.jsxs)(ye, {
                  children: [
                      (0, s.jsx)(a, { children: `Fecha` }),
                      (0, s.jsx)(a, { children: `Usuario` }),
                      (0, s.jsx)(a, { children: `Entidad` }),
                      (0, s.jsx)(a, { children: `Acción` }),
                      (0, s.jsx)(a, { children: `IP` }),
                      (0, s.jsx)(a, {
                          className: `text-right`,
                          children: `Detalle`,
                      }),
                  ],
              }),
          })),
          (t[58] = L))
        : (L = t[58]);
    let R;
    if (t[59] !== n.data) {
        let e;
        (t[61] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((e = (e) =>
                  (0, s.jsxs)(
                      ye,
                      {
                          children: [
                              (0, s.jsx)(o, {
                                  className: `whitespace-nowrap`,
                                  children: e.fecha,
                              }),
                              (0, s.jsx)(o, { children: e.usuario }),
                              (0, s.jsxs)(o, {
                                  children: [
                                      e.entidad,
                                      (0, s.jsxs)(`span`, {
                                          className: `block text-xs text-muted-foreground`,
                                          children: [`#`, e.entidad_id],
                                      }),
                                  ],
                              }),
                              (0, s.jsx)(o, {
                                  children: (0, s.jsx)(le, {
                                      variant: `secondary`,
                                      children: e.accion_nombre,
                                  }),
                              }),
                              (0, s.jsx)(o, {
                                  className: `text-xs text-muted-foreground`,
                                  children: e.ip ?? `—`,
                              }),
                              (0, s.jsx)(o, {
                                  className: `text-right`,
                                  children: (0, s.jsx)(ne, {
                                      variant: `ghost`,
                                      size: `sm`,
                                      onClick: () => De(e),
                                      children: `Ver valores`,
                                  }),
                              }),
                          ],
                      },
                      e.id,
                  )),
              (t[61] = e))
            : (e = t[61]),
            (R = n.data.map(e)),
            (t[59] = n.data),
            (t[60] = R));
    } else R = t[60];
    let z;
    t[62] === n.data.length
        ? (z = t[63])
        : ((z =
              n.data.length === 0 &&
              (0, s.jsx)(ye, {
                  children: (0, s.jsx)(o, {
                      colSpan: 6,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay registros con esos filtros.`,
                  }),
              })),
          (t[62] = n.data.length),
          (t[63] = z));
    let B;
    t[64] !== R || t[65] !== z
        ? ((B = (0, s.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, s.jsxs)(be, {
                  children: [L, (0, s.jsxs)(ve, { children: [R, z] })],
              }),
          })),
          (t[64] = R),
          (t[65] = z),
          (t[66] = B))
        : (B = t[66]);
    let V;
    t[67] === n
        ? (V = t[68])
        : ((V = (0, s.jsx)(xe, { paginado: n, etiqueta: `registros` })),
          (t[67] = n),
          (t[68] = V));
    let H;
    t[69] !== I || t[70] !== B || t[71] !== V
        ? ((H = (0, s.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [Ae, I, B, V],
          })),
          (t[69] = I),
          (t[70] = B),
          (t[71] = V),
          (t[72] = H))
        : (H = t[72]);
    let Pe = u !== null,
        U;
    t[73] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((U = (e) => !e && De(null)), (t[73] = U))
        : (U = t[73]);
    let Fe = u?.entidad,
        Ie = u?.entidad_id,
        W;
    t[74] !== Fe || t[75] !== Ie
        ? ((W = (0, s.jsxs)(he, { children: [Fe, ` #`, Ie] })),
          (t[74] = Fe),
          (t[75] = Ie),
          (t[76] = W))
        : (W = t[76]);
    let Le = u?.accion_nombre,
        Re = u?.usuario,
        ze = u?.fecha,
        G;
    t[77] !== Le || t[78] !== Re || t[79] !== ze
        ? ((G = (0, s.jsxs)(me, {
              children: [Le, ` por `, Re, ` ·`, ` `, ze],
          })),
          (t[77] = Le),
          (t[78] = Re),
          (t[79] = ze),
          (t[80] = G))
        : (G = t[80]);
    let K;
    t[81] !== W || t[82] !== G
        ? ((K = (0, s.jsxs)(de, { children: [W, G] })),
          (t[81] = W),
          (t[82] = G),
          (t[83] = K))
        : (K = t[83]);
    let Be;
    t[84] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Be = (0, s.jsx)(`h3`, {
              className: `mb-1 text-xs tracking-wide text-muted-foreground uppercase`,
              children: `Antes`,
          })),
          (t[84] = Be))
        : (Be = t[84]);
    let q;
    t[85] === u?.valores_antes
        ? (q = t[86])
        : ((q = JSON.stringify(u?.valores_antes ?? {}, null, 2)),
          (t[85] = u?.valores_antes),
          (t[86] = q));
    let J;
    t[87] === q
        ? (J = t[88])
        : ((J = (0, s.jsxs)(`div`, {
              children: [
                  Be,
                  (0, s.jsx)(`pre`, {
                      className: `max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs`,
                      children: q,
                  }),
              ],
          })),
          (t[87] = q),
          (t[88] = J));
    let Ve;
    t[89] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ve = (0, s.jsx)(`h3`, {
              className: `mb-1 text-xs tracking-wide text-muted-foreground uppercase`,
              children: `Después`,
          })),
          (t[89] = Ve))
        : (Ve = t[89]);
    let Y;
    t[90] === u?.valores_despues
        ? (Y = t[91])
        : ((Y = JSON.stringify(u?.valores_despues ?? {}, null, 2)),
          (t[90] = u?.valores_despues),
          (t[91] = Y));
    let X;
    t[92] === Y
        ? (X = t[93])
        : ((X = (0, s.jsxs)(`div`, {
              children: [
                  Ve,
                  (0, s.jsx)(`pre`, {
                      className: `max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs`,
                      children: Y,
                  }),
              ],
          })),
          (t[92] = Y),
          (t[93] = X));
    let Z;
    t[94] !== J || t[95] !== X
        ? ((Z = (0, s.jsxs)(`div`, {
              className: `grid gap-4 text-sm sm:grid-cols-2`,
              children: [J, X],
          })),
          (t[94] = J),
          (t[95] = X),
          (t[96] = Z))
        : (Z = t[96]);
    let Q;
    t[97] !== K || t[98] !== Z
        ? ((Q = (0, s.jsxs)(fe, { children: [K, Z] })),
          (t[97] = K),
          (t[98] = Z),
          (t[99] = Q))
        : (Q = t[99]);
    let $;
    t[100] !== Pe || t[101] !== Q
        ? (($ = (0, s.jsx)(ue, { open: Pe, onOpenChange: U, children: Q })),
          (t[100] = Pe),
          (t[101] = Q),
          (t[102] = $))
        : ($ = t[102]);
    let He;
    return (
        t[103] !== H || t[104] !== $
            ? ((He = (0, s.jsxs)(s.Fragment, { children: [ke, H, $] })),
              (t[103] = H),
              (t[104] = $),
              (t[105] = He))
            : (He = t[105]),
        He
    );
}
function we(e) {
    return (0, s.jsx)(i, { value: e.valor, children: e.nombre }, e.valor);
}
function Te(e) {
    return (0, s.jsx)(i, { value: e.valor, children: e.nombre }, e.valor);
}
function Ee(e) {
    return (0, s.jsx)(
        i,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
l.layout = { breadcrumbs: [{ title: `Bitácora`, href: ce() }] };
export { l as default };
