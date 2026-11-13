import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    h as r,
    r as i,
    s as a,
    u as o,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { t as c } from './arrow-left-CWHaM1EE.js';
import { t as l } from './calendar-plus-CIcNb-DH.js';
import { t as u } from './check-Ftr1fX33.js';
import { t as d } from './link-2-weYKolBY.js';
import { t as f } from './map-pin-CJV5dcon.js';
import { Mt as p, Pt as m, f as h, j as g } from './app-Bu9EFUG6.js';
import { n as _, t as v } from './card-Bc3dRGP7.js';
var y = i(`Clock`, [
        [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
        [`polyline`, { points: `12 6 12 12 16 14`, key: `68esgv` }],
    ]),
    b = i(`Facebook`, [
        [
            `path`,
            {
                d: `M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z`,
                key: `1jg4f8`,
            },
        ],
    ]),
    x = i(`MessageCircle`, [
        [`path`, { d: `M7.9 20A9 9 0 1 0 4 16.1L2 22Z`, key: `vv11sd` }],
    ]),
    S = t(),
    C = e(r(), 1);
function w() {
    let e = (0, S.c)(3),
        [t, n] = (0, C.useState)(null),
        r;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((r = async (e) => {
              if (!navigator?.clipboard)
                  return (console.warn(`Clipboard not supported`), !1);
              try {
                  return (await navigator.clipboard.writeText(e), n(e), !0);
              } catch (e) {
                  return (console.warn(`Copy failed`, e), n(null), !1);
              }
          }),
          (e[0] = r))
        : (r = e[0]);
    let i = r,
        a;
    return (
        e[1] === t ? (a = e[2]) : ((a = [t, i]), (e[1] = t), (e[2] = a)), a
    );
}
var T = a();
function E(e) {
    let t = (0, S.c)(20),
        { enlace: n, titulo: r } = e,
        [i, a] = w(),
        o = encodeURIComponent(`${r} — ${n}`),
        c = encodeURIComponent(n),
        l = `https://wa.me/?text=${o}`,
        f;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((f = (0, T.jsx)(x, {})), (t[0] = f))
        : (f = t[0]);
    let p;
    t[1] === l
        ? (p = t[2])
        : ((p = (0, T.jsx)(s, {
              variant: `outline`,
              size: `sm`,
              asChild: !0,
              children: (0, T.jsxs)(`a`, {
                  href: l,
                  target: `_blank`,
                  rel: `noopener noreferrer`,
                  children: [f, `WhatsApp`],
              }),
          })),
          (t[1] = l),
          (t[2] = p));
    let m = `https://www.facebook.com/sharer/sharer.php?u=${c}`,
        h;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, T.jsx)(b, {})), (t[3] = h))
        : (h = t[3]);
    let g;
    t[4] === m
        ? (g = t[5])
        : ((g = (0, T.jsx)(s, {
              variant: `outline`,
              size: `sm`,
              asChild: !0,
              children: (0, T.jsxs)(`a`, {
                  href: m,
                  target: `_blank`,
                  rel: `noopener noreferrer`,
                  children: [h, `Facebook`],
              }),
          })),
          (t[4] = m),
          (t[5] = g));
    let _;
    t[6] !== a || t[7] !== n
        ? ((_ = () => void a(n)), (t[6] = a), (t[7] = n), (t[8] = _))
        : (_ = t[8]);
    let v;
    t[9] !== i || t[10] !== n
        ? ((v = i === n ? (0, T.jsx)(u, {}) : (0, T.jsx)(d, {})),
          (t[9] = i),
          (t[10] = n),
          (t[11] = v))
        : (v = t[11]);
    let y = i === n ? `Enlace copiado` : `Copiar enlace`,
        C;
    t[12] !== _ || t[13] !== v || t[14] !== y
        ? ((C = (0, T.jsxs)(s, {
              variant: `outline`,
              size: `sm`,
              onClick: _,
              children: [v, y],
          })),
          (t[12] = _),
          (t[13] = v),
          (t[14] = y),
          (t[15] = C))
        : (C = t[15]);
    let E;
    return (
        t[16] !== C || t[17] !== p || t[18] !== g
            ? ((E = (0, T.jsxs)(`div`, {
                  className: `flex flex-wrap items-center gap-2`,
                  children: [p, g, C],
              })),
              (t[16] = C),
              (t[17] = p),
              (t[18] = g),
              (t[19] = E))
            : (E = t[19]),
        E
    );
}
function D(e) {
    let t = (0, S.c)(12),
        { icono: n, etiqueta: r, children: i } = e,
        a;
    t[0] === n
        ? (a = t[1])
        : ((a = (0, T.jsx)(n, {
              className: `mt-0.5 size-5 shrink-0 text-digeu-azure dark:text-digeu-teal`,
          })),
          (t[0] = n),
          (t[1] = a));
    let o;
    t[2] === r
        ? (o = t[3])
        : ((o = (0, T.jsx)(`p`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: r,
          })),
          (t[2] = r),
          (t[3] = o));
    let s;
    t[4] === i
        ? (s = t[5])
        : ((s = (0, T.jsx)(`p`, { className: `font-medium`, children: i })),
          (t[4] = i),
          (t[5] = s));
    let c;
    t[6] !== o || t[7] !== s
        ? ((c = (0, T.jsxs)(`div`, { children: [o, s] })),
          (t[6] = o),
          (t[7] = s),
          (t[8] = c))
        : (c = t[8]);
    let l;
    return (
        t[9] !== a || t[10] !== c
            ? ((l = (0, T.jsxs)(`div`, {
                  className: `flex gap-3`,
                  children: [a, c],
              })),
              (t[9] = a),
              (t[10] = c),
              (t[11] = l))
            : (l = t[11]),
        l
    );
}
function O(e) {
    let t = (0, S.c)(61),
        { actividad: r } = e,
        i = r.hora_inicio
            ? r.hora_fin
                ? `${r.hora_inicio} – ${r.hora_fin}`
                : `Desde las ${r.hora_inicio}`
            : `Todo el día`,
        a;
    t[0] === r.nombre
        ? (a = t[1])
        : ((a = (0, T.jsx)(o, { title: r.nombre })),
          (t[0] = r.nombre),
          (t[1] = a));
    let u;
    t[2] === r.mes
        ? (u = t[3])
        : ((u = g({ query: { mes: r.mes } })), (t[2] = r.mes), (t[3] = u));
    let d;
    t[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = (0, T.jsx)(c, {})), (t[4] = d))
        : (d = t[4]);
    let b;
    t[5] === u
        ? (b = t[6])
        : ((b = (0, T.jsx)(s, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, T.jsxs)(n, {
                  href: u,
                  children: [d, `Volver a la Agenda Cultural`],
              }),
          })),
          (t[5] = u),
          (t[6] = b));
    let x;
    t[7] === r.tipo
        ? (x = t[8])
        : ((x = (0, T.jsx)(h, { variant: `outline`, children: r.tipo })),
          (t[7] = r.tipo),
          (t[8] = x));
    let C;
    t[9] === r.estado_nombre
        ? (C = t[10])
        : ((C = (0, T.jsx)(h, {
              variant: `secondary`,
              children: r.estado_nombre,
          })),
          (t[9] = r.estado_nombre),
          (t[10] = C));
    let w;
    t[11] !== x || t[12] !== C
        ? ((w = (0, T.jsxs)(`div`, {
              className: `flex flex-wrap items-center gap-2`,
              children: [x, C],
          })),
          (t[11] = x),
          (t[12] = C),
          (t[13] = w))
        : (w = t[13]);
    let O;
    t[14] === r.nombre
        ? (O = t[15])
        : ((O = (0, T.jsx)(`h1`, {
              className: `text-3xl font-semibold text-balance`,
              children: r.nombre,
          })),
          (t[14] = r.nombre),
          (t[15] = O));
    let k;
    t[16] === r.fecha_larga
        ? (k = t[17])
        : ((k = (0, T.jsx)(`p`, {
              className: `text-muted-foreground`,
              children: r.fecha_larga,
          })),
          (t[16] = r.fecha_larga),
          (t[17] = k));
    let A;
    t[18] !== w || t[19] !== O || t[20] !== k
        ? ((A = (0, T.jsxs)(`header`, {
              className: `space-y-3`,
              children: [w, O, k],
          })),
          (t[18] = w),
          (t[19] = O),
          (t[20] = k),
          (t[21] = A))
        : (A = t[21]);
    let j;
    t[22] === r.fecha_larga
        ? (j = t[23])
        : ((j = (0, T.jsx)(D, {
              icono: p,
              etiqueta: `Fecha`,
              children: r.fecha_larga,
          })),
          (t[22] = r.fecha_larga),
          (t[23] = j));
    let M;
    t[24] === i
        ? (M = t[25])
        : ((M = (0, T.jsx)(D, { icono: y, etiqueta: `Horario`, children: i })),
          (t[24] = i),
          (t[25] = M));
    let N;
    t[26] === r.ubicacion
        ? (N = t[27])
        : ((N =
              r.ubicacion &&
              (0, T.jsx)(`span`, {
                  className: `block text-sm font-normal text-muted-foreground`,
                  children: r.ubicacion,
              })),
          (t[26] = r.ubicacion),
          (t[27] = N));
    let P;
    t[28] === r.sede
        ? (P = t[29])
        : ((P =
              r.sede &&
              (0, T.jsx)(`span`, {
                  className: `block text-sm font-normal text-muted-foreground`,
                  children: r.sede,
              })),
          (t[28] = r.sede),
          (t[29] = P));
    let F;
    t[30] !== r.lugar || t[31] !== N || t[32] !== P
        ? ((F = (0, T.jsxs)(D, {
              icono: f,
              etiqueta: `Lugar`,
              children: [r.lugar, N, P],
          })),
          (t[30] = r.lugar),
          (t[31] = N),
          (t[32] = P),
          (t[33] = F))
        : (F = t[33]);
    let I;
    t[34] === r.unidad
        ? (I = t[35])
        : ((I = (0, T.jsx)(D, {
              icono: m,
              etiqueta: `Organiza`,
              children: r.unidad,
          })),
          (t[34] = r.unidad),
          (t[35] = I));
    let L;
    t[36] !== j || t[37] !== M || t[38] !== F || t[39] !== I
        ? ((L = (0, T.jsx)(v, {
              children: (0, T.jsxs)(_, {
                  className: `grid gap-5 sm:grid-cols-2`,
                  children: [j, M, F, I],
              }),
          })),
          (t[36] = j),
          (t[37] = M),
          (t[38] = F),
          (t[39] = I),
          (t[40] = L))
        : (L = t[40]);
    let R;
    t[41] === r.descripcion
        ? (R = t[42])
        : ((R =
              r.descripcion &&
              (0, T.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                      (0, T.jsx)(`h2`, {
                          className: `text-lg font-semibold`,
                          children: `Sobre la actividad`,
                      }),
                      (0, T.jsx)(`p`, {
                          className: `leading-relaxed text-pretty whitespace-pre-line`,
                          children: r.descripcion,
                      }),
                  ],
              })),
          (t[41] = r.descripcion),
          (t[42] = R));
    let z;
    t[43] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((z = (0, T.jsx)(l, {})), (t[43] = z))
        : (z = t[43]);
    let B;
    t[44] === r.calendario
        ? (B = t[45])
        : ((B = (0, T.jsx)(s, {
              asChild: !0,
              children: (0, T.jsxs)(`a`, {
                  href: r.calendario,
                  children: [z, `Agregar a mi calendario`],
              }),
          })),
          (t[44] = r.calendario),
          (t[45] = B));
    let V;
    t[46] !== r.enlace || t[47] !== r.nombre
        ? ((V = (0, T.jsx)(E, { enlace: r.enlace, titulo: r.nombre })),
          (t[46] = r.enlace),
          (t[47] = r.nombre),
          (t[48] = V))
        : (V = t[48]);
    let H;
    t[49] !== B || t[50] !== V
        ? ((H = (0, T.jsxs)(`div`, {
              className: `flex flex-wrap items-center gap-3 border-t pt-6`,
              children: [B, V],
          })),
          (t[49] = B),
          (t[50] = V),
          (t[51] = H))
        : (H = t[51]);
    let U;
    t[52] !== A || t[53] !== L || t[54] !== R || t[55] !== H || t[56] !== b
        ? ((U = (0, T.jsxs)(`article`, {
              className: `mx-auto max-w-3xl space-y-8`,
              children: [b, A, L, R, H],
          })),
          (t[52] = A),
          (t[53] = L),
          (t[54] = R),
          (t[55] = H),
          (t[56] = b),
          (t[57] = U))
        : (U = t[57]);
    let W;
    return (
        t[58] !== a || t[59] !== U
            ? ((W = (0, T.jsxs)(T.Fragment, { children: [a, U] })),
              (t[58] = a),
              (t[59] = U),
              (t[60] = W))
            : (W = t[60]),
        W
    );
}
export { O as default };
