import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    g as n,
    h as r,
    l as ee,
    n as i,
    s as a,
    t as o,
    u as te,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { t as ne } from './check-Ftr1fX33.js';
import {
    a as re,
    i as ie,
    n as ae,
    r as c,
    t as oe,
} from './select-hxeu1kQ_.js';
import {
    A as se,
    Et as ce,
    Tt as le,
    c as ue,
    f as de,
    i as fe,
    l as pe,
    o as me,
    r as he,
    s as ge,
    u as _e,
} from './app-Bu9EFUG6.js';
import { t as ve } from './input-error-Bxj_sbd5.js';
import { t as ye } from './label-D0AQUEbO.js';
import { t as be } from './spinner-DtbIIn34.js';
import {
    a as xe,
    i as l,
    n as Se,
    o as Ce,
    r as u,
    t as we,
} from './table-D3mJxxJl.js';
import { t as Te } from './paginacion-HQOmOGhf.js';
import { n as Ee } from './fecha-D8mdgCgw.js';
var De = e(r(), 1),
    Oe = t(),
    d = (e) => ({ url: d.url(e), method: `get` });
((d.definition = { methods: [`get`, `head`], url: `/solicitudes` }),
    (d.url = (e) => d.definition.url + i(e)),
    (d.get = (e) => ({ url: d.url(e), method: `get` })),
    (d.head = (e) => ({ url: d.url(e), method: `head` })));
var f = (e) => ({ action: d.url(e), method: `get` });
((f.get = (e) => ({ action: d.url(e), method: `get` })),
    (f.head = (e) => ({
        action: d.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (d.form = f));
var p = (e, t) => ({ url: p.url(e, t), method: `patch` });
((p.definition = {
    methods: [`patch`],
    url: `/solicitudes/{solicitud}/aprobar`,
}),
    (p.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { solicitud: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { solicitud: e.id }),
            Array.isArray(e) && (e = { solicitud: e[0] }),
            (e = o(e)));
        let n = {
            solicitud:
                typeof e.solicitud == `object` ? e.solicitud.id : e.solicitud,
        };
        return (
            p.definition.url
                .replace(`{solicitud}`, n.solicitud.toString())
                .replace(/\/+$/, ``) + i(t)
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
    url: `/solicitudes/{solicitud}/rechazar`,
}),
    (h.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { solicitud: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { solicitud: e.id }),
            Array.isArray(e) && (e = { solicitud: e[0] }),
            (e = o(e)));
        let n = {
            solicitud:
                typeof e.solicitud == `object` ? e.solicitud.id : e.solicitud,
        };
        return (
            h.definition.url
                .replace(`{solicitud}`, n.solicitud.toString())
                .replace(/\/+$/, ``) + i(t)
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
var _ = (e, t) => ({ url: _.url(e, t), method: `patch` });
((_.definition = {
    methods: [`patch`],
    url: `/solicitudes/{solicitud}/cancelar`,
}),
    (_.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { solicitud: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { solicitud: e.id }),
            Array.isArray(e) && (e = { solicitud: e[0] }),
            (e = o(e)));
        let n = {
            solicitud:
                typeof e.solicitud == `object` ? e.solicitud.id : e.solicitud,
        };
        return (
            _.definition.url
                .replace(`{solicitud}`, n.solicitud.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (_.patch = (e, t) => ({ url: _.url(e, t), method: `patch` })));
var ke = (e, t) => ({
    action: _.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((ke.patch = (e, t) => ({
    action: _.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (_.form = ke));
var Ae = { index: d, aprobar: p, rechazar: h, cancelar: _ },
    v = a();
function y(e) {
    let t = (0, Oe.c)(79),
        {
            solicitudes: r,
            filtros: i,
            estados: a,
            espacios: o,
            puedeResolver: d,
        } = e,
        [f, p] = (0, De.useState)(null),
        m;
    t[0] === i
        ? (m = t[1])
        : ((m = (e) => {
              n.get(
                  se().url,
                  { ...i, ...e },
                  { preserveState: !0, preserveScroll: !0, replace: !0 },
              );
          }),
          (t[0] = i),
          (t[1] = m));
    let h = m,
        g;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, v.jsx)(te, { title: `Solicitudes de espacio` })),
          (t[2] = g))
        : (g = t[2]);
    let _;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((_ = (0, v.jsx)(he, {
              title: `Solicitudes de espacio`,
              description: `Al aprobar una solicitud se bloquea el horario y se notifica al solicitante`,
          })),
          (t[3] = _))
        : (_ = t[3]);
    let ke = i.estado,
        y;
    t[4] === h
        ? (y = t[5])
        : ((y = (e) => h({ estado: e })), (t[4] = h), (t[5] = y));
    let b;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, v.jsx)(ie, {
              className: `w-60`,
              children: (0, v.jsx)(re, { placeholder: `Estado` }),
          })),
          (t[6] = b))
        : (b = t[6]);
    let x;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, v.jsx)(c, { value: `todas`, children: `Todas` })),
          (t[7] = x))
        : (x = t[7]);
    let S;
    t[8] === a ? (S = t[9]) : ((S = a.map(Me)), (t[8] = a), (t[9] = S));
    let C;
    t[10] === S
        ? (C = t[11])
        : ((C = (0, v.jsxs)(ae, { children: [x, S] })),
          (t[10] = S),
          (t[11] = C));
    let w;
    t[12] !== i.estado || t[13] !== y || t[14] !== C
        ? ((w = (0, v.jsxs)(oe, {
              value: ke,
              onValueChange: y,
              children: [b, C],
          })),
          (t[12] = i.estado),
          (t[13] = y),
          (t[14] = C),
          (t[15] = w))
        : (w = t[15]);
    let Ne = i.espacio_id ? String(i.espacio_id) : `todos`,
        T;
    t[16] === h
        ? (T = t[17])
        : ((T = (e) => h({ espacio_id: e === `todos` ? null : Number(e) })),
          (t[16] = h),
          (t[17] = T));
    let E;
    t[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, v.jsx)(ie, {
              className: `w-60`,
              children: (0, v.jsx)(re, { placeholder: `Espacio` }),
          })),
          (t[18] = E))
        : (E = t[18]);
    let D;
    t[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = (0, v.jsx)(c, {
              value: `todos`,
              children: `Todos los espacios`,
          })),
          (t[19] = D))
        : (D = t[19]);
    let O;
    t[20] === o ? (O = t[21]) : ((O = o.map(je)), (t[20] = o), (t[21] = O));
    let k;
    t[22] === O
        ? (k = t[23])
        : ((k = (0, v.jsxs)(ae, { children: [D, O] })),
          (t[22] = O),
          (t[23] = k));
    let A;
    t[24] !== Ne || t[25] !== T || t[26] !== k
        ? ((A = (0, v.jsxs)(oe, {
              value: Ne,
              onValueChange: T,
              children: [E, k],
          })),
          (t[24] = Ne),
          (t[25] = T),
          (t[26] = k),
          (t[27] = A))
        : (A = t[27]);
    let j;
    t[28] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((j = (0, v.jsx)(ye, {
              htmlFor: `desde`,
              className: `text-sm`,
              children: `Desde`,
          })),
          (t[28] = j))
        : (j = t[28]);
    let M;
    t[29] === h
        ? (M = t[30])
        : ((M = (e) => h({ desde: e.target.value })), (t[29] = h), (t[30] = M));
    let N;
    t[31] !== i.desde || t[32] !== M
        ? ((N = (0, v.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [
                  j,
                  (0, v.jsx)(le, {
                      id: `desde`,
                      type: `date`,
                      className: `w-44`,
                      defaultValue: i.desde,
                      onChange: M,
                  }),
              ],
          })),
          (t[31] = i.desde),
          (t[32] = M),
          (t[33] = N))
        : (N = t[33]);
    let P;
    t[34] !== w || t[35] !== A || t[36] !== N
        ? ((P = (0, v.jsxs)(`div`, {
              className: `flex flex-wrap gap-3`,
              children: [w, A, N],
          })),
          (t[34] = w),
          (t[35] = A),
          (t[36] = N),
          (t[37] = P))
        : (P = t[37]);
    let F, I, L, R, z;
    t[38] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((F = (0, v.jsx)(l, { children: `Espacio` })),
          (I = (0, v.jsx)(l, { children: `Fecha y horario` })),
          (L = (0, v.jsx)(l, { children: `Solicitante` })),
          (R = (0, v.jsx)(l, { children: `Propósito` })),
          (z = (0, v.jsx)(l, { children: `Estado` })),
          (t[38] = F),
          (t[39] = I),
          (t[40] = L),
          (t[41] = R),
          (t[42] = z))
        : ((F = t[38]), (I = t[39]), (L = t[40]), (R = t[41]), (z = t[42]));
    let B;
    t[43] === d
        ? (B = t[44])
        : ((B =
              d &&
              (0, v.jsx)(l, { className: `text-right`, children: `Acciones` })),
          (t[43] = d),
          (t[44] = B));
    let V;
    t[45] === B
        ? (V = t[46])
        : ((V = (0, v.jsx)(xe, {
              children: (0, v.jsxs)(Ce, { children: [F, I, L, R, z, B] }),
          })),
          (t[45] = B),
          (t[46] = V));
    let H;
    if (t[47] !== d || t[48] !== r.data) {
        let e;
        (t[50] === d
            ? (e = t[51])
            : ((e = (e) =>
                  (0, v.jsxs)(
                      Ce,
                      {
                          children: [
                              (0, v.jsxs)(u, {
                                  className: `font-medium`,
                                  children: [
                                      e.espacio,
                                      (0, v.jsx)(`span`, {
                                          className: `block text-xs text-muted-foreground`,
                                          children: e.sede,
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(u, {
                                  children: [
                                      Ee(e.fecha),
                                      (0, v.jsxs)(`span`, {
                                          className: `block text-xs text-muted-foreground`,
                                          children: [
                                              e.hora_inicio,
                                              ` –`,
                                              ` `,
                                              e.hora_fin,
                                          ],
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(u, {
                                  children: [
                                      e.solicitante_nombre,
                                      (0, v.jsx)(`span`, {
                                          className: `block text-xs text-muted-foreground`,
                                          children: e.institucion ?? e.correo,
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(u, {
                                  className: `max-w-xs`,
                                  children: [
                                      (0, v.jsx)(`span`, {
                                          className: `line-clamp-2 text-sm`,
                                          children: e.proposito,
                                      }),
                                      e.motivo_rechazo &&
                                          (0, v.jsxs)(`span`, {
                                              className: `block text-xs text-muted-foreground`,
                                              children: [
                                                  `Motivo:`,
                                                  ` `,
                                                  e.motivo_rechazo,
                                              ],
                                          }),
                                  ],
                              }),
                              (0, v.jsx)(u, {
                                  children: (0, v.jsx)(de, {
                                      variant:
                                          e.estado === `aprobada`
                                              ? `default`
                                              : e.estado === `pendiente`
                                                ? `secondary`
                                                : `outline`,
                                      children: e.estado_nombre,
                                  }),
                              }),
                              d &&
                                  (0, v.jsx)(u, {
                                      className: `text-right whitespace-nowrap`,
                                      children:
                                          e.estado === `pendiente` &&
                                          (0, v.jsxs)(v.Fragment, {
                                              children: [
                                                  (0, v.jsxs)(s, {
                                                      variant: `ghost`,
                                                      size: `sm`,
                                                      onClick: () =>
                                                          n.patch(
                                                              Ae.aprobar.url(
                                                                  e.id,
                                                              ),
                                                              {},
                                                              {
                                                                  preserveScroll:
                                                                      !0,
                                                              },
                                                          ),
                                                      children: [
                                                          (0, v.jsx)(ne, {}),
                                                          `Aprobar`,
                                                      ],
                                                  }),
                                                  (0, v.jsxs)(s, {
                                                      variant: `ghost`,
                                                      size: `sm`,
                                                      onClick: () => p(e),
                                                      children: [
                                                          (0, v.jsx)(ce, {}),
                                                          `Rechazar`,
                                                      ],
                                                  }),
                                              ],
                                          }),
                                  }),
                          ],
                      },
                      e.id,
                  )),
              (t[50] = d),
              (t[51] = e)),
            (H = r.data.map(e)),
            (t[47] = d),
            (t[48] = r.data),
            (t[49] = H));
    } else H = t[49];
    let U;
    t[52] !== d || t[53] !== r.data.length
        ? ((U =
              r.data.length === 0 &&
              (0, v.jsx)(Ce, {
                  children: (0, v.jsx)(u, {
                      colSpan: d ? 6 : 5,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `No hay solicitudes con esos filtros.`,
                  }),
              })),
          (t[52] = d),
          (t[53] = r.data.length),
          (t[54] = U))
        : (U = t[54]);
    let W;
    t[55] !== H || t[56] !== U
        ? ((W = (0, v.jsxs)(Se, { children: [H, U] })),
          (t[55] = H),
          (t[56] = U),
          (t[57] = W))
        : (W = t[57]);
    let G;
    t[58] !== V || t[59] !== W
        ? ((G = (0, v.jsx)(`div`, {
              className: `rounded-xl border`,
              children: (0, v.jsxs)(we, { children: [V, W] }),
          })),
          (t[58] = V),
          (t[59] = W),
          (t[60] = G))
        : (G = t[60]);
    let K;
    t[61] === r
        ? (K = t[62])
        : ((K = (0, v.jsx)(Te, { paginado: r, etiqueta: `solicitudes` })),
          (t[61] = r),
          (t[62] = K));
    let q;
    t[63] !== P || t[64] !== G || t[65] !== K
        ? ((q = (0, v.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [_, P, G, K],
          })),
          (t[63] = P),
          (t[64] = G),
          (t[65] = K),
          (t[66] = q))
        : (q = t[66]);
    let Pe = f !== null,
        J;
    t[67] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((J = (e) => !e && p(null)), (t[67] = J))
        : (J = t[67]);
    let Y;
    t[68] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Y = (0, v.jsxs)(pe, {
              children: [
                  (0, v.jsx)(_e, { children: `Rechazar solicitud` }),
                  (0, v.jsx)(ge, {
                      children: `El motivo se incluye en el correo que recibe el solicitante.`,
                  }),
              ],
          })),
          (t[68] = Y))
        : (Y = t[68]);
    let X;
    t[69] === f
        ? (X = t[70])
        : ((X =
              f &&
              (0, v.jsx)(ee, {
                  ...Ae.rechazar.form(f.id),
                  options: { preserveScroll: !0 },
                  onSuccess: () => p(null),
                  className: `space-y-4`,
                  children: (e) => {
                      let { processing: t, errors: n } = e;
                      return (0, v.jsxs)(v.Fragment, {
                          children: [
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(ye, {
                                          htmlFor: `motivo_rechazo`,
                                          children: `Motivo del rechazo`,
                                      }),
                                      (0, v.jsx)(le, {
                                          id: `motivo_rechazo`,
                                          name: `motivo_rechazo`,
                                          required: !0,
                                      }),
                                      (0, v.jsx)(ve, {
                                          message: n.motivo_rechazo,
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(ue, {
                                  children: [
                                      (0, v.jsx)(s, {
                                          type: `button`,
                                          variant: `outline`,
                                          onClick: () => p(null),
                                          children: `Cancelar`,
                                      }),
                                      (0, v.jsxs)(s, {
                                          type: `submit`,
                                          disabled: t,
                                          children: [
                                              t && (0, v.jsx)(be, {}),
                                              `Rechazar`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      });
                  },
              })),
          (t[69] = f),
          (t[70] = X));
    let Z;
    t[71] === X
        ? (Z = t[72])
        : ((Z = (0, v.jsxs)(me, { children: [Y, X] })),
          (t[71] = X),
          (t[72] = Z));
    let Q;
    t[73] !== Pe || t[74] !== Z
        ? ((Q = (0, v.jsx)(fe, { open: Pe, onOpenChange: J, children: Z })),
          (t[73] = Pe),
          (t[74] = Z),
          (t[75] = Q))
        : (Q = t[75]);
    let $;
    return (
        t[76] !== q || t[77] !== Q
            ? (($ = (0, v.jsxs)(v.Fragment, { children: [g, q, Q] })),
              (t[76] = q),
              (t[77] = Q),
              (t[78] = $))
            : ($ = t[78]),
        $
    );
}
function je(e) {
    return (0, v.jsx)(
        c,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function Me(e) {
    return (0, v.jsx)(c, { value: e.valor, children: e.nombre }, e.valor);
}
y.layout = { breadcrumbs: [{ title: `Solicitudes`, href: se() }] };
export { y as default };
