import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    g as ee,
    h as r,
    l as i,
    n as a,
    s as te,
    t as o,
    u as ne,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { t as re } from './arrow-left-CWHaM1EE.js';
import { t as ie } from './pencil-Bbeg0ISb.js';
import { t as ae } from './power-BA0PQTGX.js';
import { t as oe } from './trash-2-_Kz5vj-S.js';
import {
    St as se,
    Tt as ce,
    bt as le,
    c as ue,
    f as de,
    i as fe,
    l as pe,
    o as me,
    s as he,
    u as ge,
    v as _e,
    xt as ve,
    y as ye,
    yt as be,
} from './app-Bu9EFUG6.js';
import { t as xe } from './input-error-Bxj_sbd5.js';
import { a as Se, i as Ce, n as we, t as Te } from './card-Bc3dRGP7.js';
import { t as Ee } from './label-D0AQUEbO.js';
import { t as De } from './spinner-DtbIIn34.js';
import {
    a as Oe,
    i as ke,
    n as Ae,
    o as je,
    r as c,
    t as Me,
} from './table-D3mJxxJl.js';
import { n as Ne } from './fecha-D8mdgCgw.js';
import { t as Pe } from './PersonaRecursoHumanoController-Bzb79B_s.js';
var Fe = e(r(), 1),
    Ie = t(),
    l = (e, t) => ({ url: l.url(e, t), method: `post` });
((l.definition = { methods: [`post`], url: `/recurso-humano/{persona}/baja` }),
    (l.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) && (e = { persona: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { persona: e.id }),
            Array.isArray(e) && (e = { persona: e[0] }),
            (e = o(e)));
        let n = {
            persona: typeof e.persona == `object` ? e.persona.id : e.persona,
        };
        return (
            l.definition.url
                .replace(`{persona}`, n.persona.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (l.post = (e, t) => ({ url: l.url(e, t), method: `post` })));
var u = (e, t) => ({ action: l.url(e, t), method: `post` });
((u.post = (e, t) => ({ action: l.url(e, t), method: `post` })), (l.form = u));
var d = (e, t) => ({ url: d.url(e, t), method: `put` });
((d.definition = {
    methods: [`put`],
    url: `/recurso-humano/{persona}/reactivar`,
}),
    (d.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) && (e = { persona: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { persona: e.id }),
            Array.isArray(e) && (e = { persona: e[0] }),
            (e = o(e)));
        let n = {
            persona: typeof e.persona == `object` ? e.persona.id : e.persona,
        };
        return (
            d.definition.url
                .replace(`{persona}`, n.persona.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (d.put = (e, t) => ({ url: d.url(e, t), method: `put` })));
var f = (e, t) => ({
    action: d.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((f.put = (e, t) => ({
    action: d.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (d.form = f));
var Le = { store: l, update: d },
    p = te();
function m(e) {
    let t = (0, Ie.c)(7),
        { etiqueta: n, valor: ee } = e,
        r;
    t[0] === n
        ? (r = t[1])
        : ((r = (0, p.jsx)(`dt`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: n,
          })),
          (t[0] = n),
          (t[1] = r));
    let i;
    t[2] === ee
        ? (i = t[3])
        : ((i = (0, p.jsx)(`dd`, {
              className: `mt-0.5 text-sm`,
              children: ee,
          })),
          (t[2] = ee),
          (t[3] = i));
    let a;
    return (
        t[4] !== r || t[5] !== i
            ? ((a = (0, p.jsxs)(`div`, { children: [r, i] })),
              (t[4] = r),
              (t[5] = i),
              (t[6] = a))
            : (a = t[6]),
        a
    );
}
function h(e) {
    let t = (0, Ie.c)(125),
        { persona: r, puedeGestionar: a } = e,
        te = be(),
        [o, c] = (0, Fe.useState)(null),
        l = r.documento_oculto ? `Restringido` : (r.dpi ?? r.pasaporte ?? `—`),
        u;
    t[0] === r.nombre_completo
        ? (u = t[1])
        : ((u = (0, p.jsx)(ne, { title: r.nombre_completo })),
          (t[0] = r.nombre_completo),
          (t[1] = u));
    let d;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = (0, p.jsx)(s, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, p.jsxs)(n, {
                  href: ye(),
                  children: [(0, p.jsx)(re, {}), `Volver al padrón`],
              }),
          })),
          (t[2] = d))
        : (d = t[2]);
    let f;
    t[3] !== r.foto_url || t[4] !== r.nombre_completo
        ? ((f =
              r.foto_url &&
              (0, p.jsx)(se, { src: r.foto_url, alt: r.nombre_completo })),
          (t[3] = r.foto_url),
          (t[4] = r.nombre_completo),
          (t[5] = f))
        : (f = t[5]);
    let h;
    t[6] !== te || t[7] !== r.nombre_completo
        ? ((h = te(r.nombre_completo)),
          (t[6] = te),
          (t[7] = r.nombre_completo),
          (t[8] = h))
        : (h = t[8]);
    let g;
    t[9] === h
        ? (g = t[10])
        : ((g = (0, p.jsx)(ve, { className: `text-lg`, children: h })),
          (t[9] = h),
          (t[10] = g));
    let _;
    t[11] !== f || t[12] !== g
        ? ((_ = (0, p.jsxs)(le, { className: `size-16`, children: [f, g] })),
          (t[11] = f),
          (t[12] = g),
          (t[13] = _))
        : (_ = t[13]);
    let v;
    t[14] === r.nombre_completo
        ? (v = t[15])
        : ((v = (0, p.jsx)(`h1`, {
              className: `text-2xl font-semibold`,
              children: r.nombre_completo,
          })),
          (t[14] = r.nombre_completo),
          (t[15] = v));
    let y;
    t[16] === r.tipo_nombre
        ? (y = t[17])
        : ((y = (0, p.jsx)(de, {
              variant: `secondary`,
              children: r.tipo_nombre,
          })),
          (t[16] = r.tipo_nombre),
          (t[17] = y));
    let b;
    t[18] === r.disciplina
        ? (b = t[19])
        : ((b =
              r.disciplina &&
              (0, p.jsx)(de, { variant: `outline`, children: r.disciplina })),
          (t[18] = r.disciplina),
          (t[19] = b));
    let ze = r.activo ? `default` : `outline`,
        Be = r.activo ? `Activo` : `Inactivo`,
        x;
    t[20] !== ze || t[21] !== Be
        ? ((x = (0, p.jsx)(de, { variant: ze, children: Be })),
          (t[20] = ze),
          (t[21] = Be),
          (t[22] = x))
        : (x = t[22]);
    let S;
    t[23] !== x || t[24] !== y || t[25] !== b
        ? ((S = (0, p.jsxs)(`div`, {
              className: `mt-1 flex flex-wrap items-center gap-2`,
              children: [y, b, x],
          })),
          (t[23] = x),
          (t[24] = y),
          (t[25] = b),
          (t[26] = S))
        : (S = t[26]);
    let C;
    t[27] !== S || t[28] !== v
        ? ((C = (0, p.jsxs)(`div`, { children: [v, S] })),
          (t[27] = S),
          (t[28] = v),
          (t[29] = C))
        : (C = t[29]);
    let w;
    t[30] !== C || t[31] !== _
        ? ((w = (0, p.jsxs)(`div`, {
              className: `flex items-center gap-4`,
              children: [_, C],
          })),
          (t[30] = C),
          (t[31] = _),
          (t[32] = w))
        : (w = t[32]);
    let T;
    t[33] !== r.activo || t[34] !== r.id || t[35] !== a
        ? ((T =
              a &&
              (0, p.jsxs)(`div`, {
                  className: `flex flex-wrap gap-2`,
                  children: [
                      (0, p.jsx)(s, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, p.jsxs)(n, {
                              href: _e(r.id),
                              children: [(0, p.jsx)(ie, {}), `Editar`],
                          }),
                      }),
                      (0, p.jsxs)(s, {
                          variant: `outline`,
                          onClick: () => c(r.activo ? `baja` : `reactivar`),
                          children: [
                              (0, p.jsx)(ae, {}),
                              r.activo ? `Dar de baja` : `Reactivar`,
                          ],
                      }),
                      (0, p.jsxs)(s, {
                          variant: `outline`,
                          onClick: () => ee.delete(Pe.destroy.url(r.id)),
                          children: [(0, p.jsx)(oe, {}), `Eliminar`],
                      }),
                  ],
              })),
          (t[33] = r.activo),
          (t[34] = r.id),
          (t[35] = a),
          (t[36] = T))
        : (T = t[36]);
    let E;
    t[37] !== w || t[38] !== T
        ? ((E = (0, p.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [w, T],
          })),
          (t[37] = w),
          (t[38] = T),
          (t[39] = E))
        : (E = t[39]);
    let Ve;
    t[40] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ve = (0, p.jsx)(Ce, {
              children: (0, p.jsx)(Se, { children: `Datos generales` }),
          })),
          (t[40] = Ve))
        : (Ve = t[40]);
    let He = r.pais ?? `—`,
        D;
    t[41] === He
        ? (D = t[42])
        : ((D = (0, p.jsx)(m, { etiqueta: `Nacionalidad`, valor: He })),
          (t[41] = He),
          (t[42] = D));
    let O;
    t[43] === l
        ? (O = t[44])
        : ((O = (0, p.jsx)(m, { etiqueta: `Documento`, valor: l })),
          (t[43] = l),
          (t[44] = O));
    let k;
    t[45] === r.fecha_nacimiento
        ? (k = t[46])
        : ((k = Ne(r.fecha_nacimiento)),
          (t[45] = r.fecha_nacimiento),
          (t[46] = k));
    let A;
    t[47] === k
        ? (A = t[48])
        : ((A = (0, p.jsx)(m, { etiqueta: `Fecha de nacimiento`, valor: k })),
          (t[47] = k),
          (t[48] = A));
    let Ue = `${r.edad} años`,
        j;
    t[49] === Ue
        ? (j = t[50])
        : ((j = (0, p.jsx)(m, { etiqueta: `Edad`, valor: Ue })),
          (t[49] = Ue),
          (t[50] = j));
    let We = r.agrupacion ?? `—`,
        M;
    t[51] === We
        ? (M = t[52])
        : ((M = (0, p.jsx)(m, { etiqueta: `Agrupación`, valor: We })),
          (t[51] = We),
          (t[52] = M));
    let Ge;
    t[53] === r.fecha_alta
        ? (Ge = t[54])
        : ((Ge = Ne(r.fecha_alta)), (t[53] = r.fecha_alta), (t[54] = Ge));
    let N;
    t[55] === Ge
        ? (N = t[56])
        : ((N = (0, p.jsx)(m, { etiqueta: `Fecha de alta`, valor: Ge })),
          (t[55] = Ge),
          (t[56] = N));
    let P;
    t[57] === r.fecha_baja
        ? (P = t[58])
        : ((P =
              r.fecha_baja &&
              (0, p.jsx)(m, {
                  etiqueta: `Fecha de baja`,
                  valor: Ne(r.fecha_baja),
              })),
          (t[57] = r.fecha_baja),
          (t[58] = P));
    let F;
    t[59] === r.motivo_baja
        ? (F = t[60])
        : ((F =
              r.motivo_baja &&
              (0, p.jsx)(m, {
                  etiqueta: `Motivo de baja`,
                  valor: r.motivo_baja,
              })),
          (t[59] = r.motivo_baja),
          (t[60] = F));
    let I;
    t[61] !== D ||
    t[62] !== O ||
    t[63] !== A ||
    t[64] !== j ||
    t[65] !== M ||
    t[66] !== N ||
    t[67] !== P ||
    t[68] !== F
        ? ((I = (0, p.jsxs)(`dl`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [D, O, A, j, M, N, P, F],
          })),
          (t[61] = D),
          (t[62] = O),
          (t[63] = A),
          (t[64] = j),
          (t[65] = M),
          (t[66] = N),
          (t[67] = P),
          (t[68] = F),
          (t[69] = I))
        : (I = t[69]);
    let L;
    t[70] === r.biografia
        ? (L = t[71])
        : ((L =
              r.biografia &&
              (0, p.jsxs)(`div`, {
                  className: `mt-6`,
                  children: [
                      (0, p.jsx)(`h2`, {
                          className: `text-xs tracking-wide text-muted-foreground uppercase`,
                          children: `Biografía`,
                      }),
                      (0, p.jsx)(`p`, {
                          className: `mt-1 text-sm whitespace-pre-line`,
                          children: r.biografia,
                      }),
                  ],
              })),
          (t[70] = r.biografia),
          (t[71] = L));
    let R;
    t[72] !== I || t[73] !== L
        ? ((R = (0, p.jsxs)(Te, {
              className: `lg:col-span-2`,
              children: [Ve, (0, p.jsxs)(we, { children: [I, L] })],
          })),
          (t[72] = I),
          (t[73] = L),
          (t[74] = R))
        : (R = t[74]);
    let Ke;
    t[75] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ke = (0, p.jsx)(Ce, {
              children: (0, p.jsx)(Se, { children: `Permanencia` }),
          })),
          (t[75] = Ke))
        : (Ke = t[75]);
    let qe;
    t[76] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((qe = (0, p.jsx)(`p`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: `Período vigente`,
          })),
          (t[76] = qe))
        : (qe = t[76]);
    let z;
    t[77] === r.permanencia.texto
        ? (z = t[78])
        : ((z = (0, p.jsxs)(`div`, {
              children: [
                  qe,
                  (0, p.jsx)(`p`, {
                      className: `text-2xl font-semibold`,
                      children: r.permanencia.texto,
                  }),
              ],
          })),
          (t[77] = r.permanencia.texto),
          (t[78] = z));
    let Je;
    t[79] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Je = (0, p.jsx)(`p`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: `Acumulada`,
          })),
          (t[79] = Je))
        : (Je = t[79]);
    let B;
    t[80] === r.permanencia_total.texto
        ? (B = t[81])
        : ((B = (0, p.jsxs)(`div`, {
              children: [
                  Je,
                  (0, p.jsx)(`p`, {
                      className: `text-lg`,
                      children: r.permanencia_total.texto,
                  }),
              ],
          })),
          (t[80] = r.permanencia_total.texto),
          (t[81] = B));
    let V;
    t[82] !== z || t[83] !== B
        ? ((V = (0, p.jsxs)(Te, {
              children: [
                  Ke,
                  (0, p.jsxs)(we, { className: `space-y-4`, children: [z, B] }),
              ],
          })),
          (t[82] = z),
          (t[83] = B),
          (t[84] = V))
        : (V = t[84]);
    let H;
    t[85] !== R || t[86] !== V
        ? ((H = (0, p.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [R, V],
          })),
          (t[85] = R),
          (t[86] = V),
          (t[87] = H))
        : (H = t[87]);
    let Ye;
    t[88] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Ye = (0, p.jsx)(Ce, {
              children: (0, p.jsx)(Se, { children: `Historial de períodos` }),
          })),
          (t[88] = Ye))
        : (Ye = t[88]);
    let Xe;
    t[89] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Xe = (0, p.jsx)(Oe, {
              children: (0, p.jsxs)(je, {
                  children: [
                      (0, p.jsx)(ke, { children: `Alta` }),
                      (0, p.jsx)(ke, { children: `Baja` }),
                      (0, p.jsx)(ke, { children: `Motivo` }),
                      (0, p.jsx)(ke, { children: `Días` }),
                  ],
              }),
          })),
          (t[89] = Xe))
        : (Xe = t[89]);
    let U;
    t[90] === r.periodos
        ? (U = t[91])
        : ((U = r.periodos.map(Re)), (t[90] = r.periodos), (t[91] = U));
    let W;
    t[92] === U
        ? (W = t[93])
        : ((W = (0, p.jsxs)(Te, {
              children: [
                  Ye,
                  (0, p.jsx)(we, {
                      children: (0, p.jsxs)(Me, {
                          children: [Xe, (0, p.jsx)(Ae, { children: U })],
                      }),
                  }),
              ],
          })),
          (t[92] = U),
          (t[93] = W));
    let G;
    t[94] !== E || t[95] !== H || t[96] !== W
        ? ((G = (0, p.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [d, E, H, W],
          })),
          (t[94] = E),
          (t[95] = H),
          (t[96] = W),
          (t[97] = G))
        : (G = t[97]);
    let Ze = o !== null,
        Qe;
    t[98] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Qe = (e) => !e && c(null)), (t[98] = Qe))
        : (Qe = t[98]);
    let $e = o === `baja` ? `Dar de baja` : `Reactivar persona`,
        K;
    t[99] === $e
        ? (K = t[100])
        : ((K = (0, p.jsx)(ge, { children: $e })), (t[99] = $e), (t[100] = K));
    let et =
            o === `baja`
                ? `El período vigente se cierra con la fecha que indique.`
                : `Se abre un período nuevo a partir de la fecha de alta.`,
        q;
    t[101] === et
        ? (q = t[102])
        : ((q = (0, p.jsx)(he, { children: et })), (t[101] = et), (t[102] = q));
    let J;
    t[103] !== K || t[104] !== q
        ? ((J = (0, p.jsxs)(pe, { children: [K, q] })),
          (t[103] = K),
          (t[104] = q),
          (t[105] = J))
        : (J = t[105]);
    let Y;
    t[106] !== o || t[107] !== r.id
        ? ((Y = o === `baja` ? Le.store.form(r.id) : Le.update.form(r.id)),
          (t[106] = o),
          (t[107] = r.id),
          (t[108] = Y))
        : (Y = t[108]);
    let tt;
    t[109] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((tt = () => c(null)), (t[109] = tt))
        : (tt = t[109]);
    let X;
    t[110] === o
        ? (X = t[111])
        : ((X = (e) => {
              let { processing: t, errors: n } = e;
              return (0, p.jsxs)(p.Fragment, {
                  children: [
                      o === `baja`
                          ? (0, p.jsxs)(p.Fragment, {
                                children: [
                                    (0, p.jsxs)(`div`, {
                                        className: `grid gap-2`,
                                        children: [
                                            (0, p.jsx)(Ee, {
                                                htmlFor: `fecha_baja`,
                                                children: `Fecha de baja`,
                                            }),
                                            (0, p.jsx)(ce, {
                                                id: `fecha_baja`,
                                                name: `fecha_baja`,
                                                type: `date`,
                                                required: !0,
                                            }),
                                            (0, p.jsx)(xe, {
                                                message: n.fecha_baja,
                                            }),
                                        ],
                                    }),
                                    (0, p.jsxs)(`div`, {
                                        className: `grid gap-2`,
                                        children: [
                                            (0, p.jsx)(Ee, {
                                                htmlFor: `motivo_baja`,
                                                children: `Motivo (opcional)`,
                                            }),
                                            (0, p.jsx)(ce, {
                                                id: `motivo_baja`,
                                                name: `motivo_baja`,
                                            }),
                                            (0, p.jsx)(xe, {
                                                message: n.motivo_baja,
                                            }),
                                        ],
                                    }),
                                ],
                            })
                          : (0, p.jsxs)(`div`, {
                                className: `grid gap-2`,
                                children: [
                                    (0, p.jsx)(Ee, {
                                        htmlFor: `fecha_alta`,
                                        children: `Nueva fecha de alta`,
                                    }),
                                    (0, p.jsx)(ce, {
                                        id: `fecha_alta`,
                                        name: `fecha_alta`,
                                        type: `date`,
                                        required: !0,
                                    }),
                                    (0, p.jsx)(xe, { message: n.fecha_alta }),
                                ],
                            }),
                      (0, p.jsxs)(ue, {
                          children: [
                              (0, p.jsx)(s, {
                                  type: `button`,
                                  variant: `outline`,
                                  onClick: () => c(null),
                                  children: `Cancelar`,
                              }),
                              (0, p.jsxs)(s, {
                                  type: `submit`,
                                  disabled: t,
                                  children: [
                                      t && (0, p.jsx)(De, {}),
                                      `Confirmar`,
                                  ],
                              }),
                          ],
                      }),
                  ],
              });
          }),
          (t[110] = o),
          (t[111] = X));
    let Z;
    t[112] !== Y || t[113] !== X
        ? ((Z = (0, p.jsx)(i, {
              ...Y,
              onSuccess: tt,
              className: `space-y-4`,
              children: X,
          })),
          (t[112] = Y),
          (t[113] = X),
          (t[114] = Z))
        : (Z = t[114]);
    let Q;
    t[115] !== J || t[116] !== Z
        ? ((Q = (0, p.jsxs)(me, { children: [J, Z] })),
          (t[115] = J),
          (t[116] = Z),
          (t[117] = Q))
        : (Q = t[117]);
    let $;
    t[118] !== Ze || t[119] !== Q
        ? (($ = (0, p.jsx)(fe, { open: Ze, onOpenChange: Qe, children: Q })),
          (t[118] = Ze),
          (t[119] = Q),
          (t[120] = $))
        : ($ = t[120]);
    let nt;
    return (
        t[121] !== u || t[122] !== G || t[123] !== $
            ? ((nt = (0, p.jsxs)(p.Fragment, { children: [u, G, $] })),
              (t[121] = u),
              (t[122] = G),
              (t[123] = $),
              (t[124] = nt))
            : (nt = t[124]),
        nt
    );
}
function Re(e) {
    return (0, p.jsxs)(
        je,
        {
            children: [
                (0, p.jsx)(c, { children: Ne(e.fecha_alta) }),
                (0, p.jsx)(c, { children: Ne(e.fecha_baja) || `En curso` }),
                (0, p.jsx)(c, { children: e.motivo_baja ?? `—` }),
                (0, p.jsx)(c, { children: e.dias }),
            ],
        },
        e.id,
    );
}
h.layout = { breadcrumbs: [{ title: `Recurso humano`, href: ye() }] };
export { h as default };
