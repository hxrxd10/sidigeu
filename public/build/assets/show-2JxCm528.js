import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    g as n,
    h as r,
    l as i,
    n as a,
    s as o,
    t as s,
    u as ee,
} from './wayfinder-C8dNLrFV.js';
import { t as c } from './button-BzkMvCJO.js';
import { a as l, i as u, n as d, r as f, t as p } from './select-hxeu1kQ_.js';
import { t as te } from './pencil-Bbeg0ISb.js';
import { t as ne } from './plus-B2NIGUck.js';
import { t as re } from './trash-2-_Kz5vj-S.js';
import {
    O as m,
    Tt as ie,
    c as h,
    f as ae,
    i as oe,
    l as se,
    o as ce,
    r as le,
    s as ue,
    u as de,
} from './app-Bu9EFUG6.js';
import { t as fe } from './input-error-Bxj_sbd5.js';
import { t as g } from './label-D0AQUEbO.js';
import { t as pe } from './spinner-DtbIIn34.js';
import {
    a as me,
    i as _,
    n as he,
    o as v,
    r as y,
    t as ge,
} from './table-D3mJxxJl.js';
import { t as _e } from './textarea-DtbS5QwL.js';
import { t as ve } from './checkbox-Dz5nVKQg.js';
var b = e(r(), 1),
    x = t(),
    S = (e) => ({ url: S.url(e), method: `get` });
((S.definition = { methods: [`get`, `head`], url: `/catalogos` }),
    (S.url = (e) => S.definition.url + a(e)),
    (S.get = (e) => ({ url: S.url(e), method: `get` })),
    (S.head = (e) => ({ url: S.url(e), method: `head` })));
var C = (e) => ({ action: S.url(e), method: `get` });
((C.get = (e) => ({ action: S.url(e), method: `get` })),
    (C.head = (e) => ({
        action: S.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (S.form = C));
var w = (e, t) => ({ url: w.url(e, t), method: `get` });
((w.definition = { methods: [`get`, `head`], url: `/catalogos/{catalogo}` }),
    (w.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { catalogo: e }),
            Array.isArray(e) && (e = { catalogo: e[0] }),
            (e = s(e)));
        let n = { catalogo: e.catalogo };
        return (
            w.definition.url
                .replace(`{catalogo}`, n.catalogo.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (w.get = (e, t) => ({ url: w.url(e, t), method: `get` })),
    (w.head = (e, t) => ({ url: w.url(e, t), method: `head` })));
var T = (e, t) => ({ action: w.url(e, t), method: `get` });
((T.get = (e, t) => ({ action: w.url(e, t), method: `get` })),
    (T.head = (e, t) => ({
        action: w.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (w.form = T));
var E = (e, t) => ({ url: E.url(e, t), method: `post` });
((E.definition = { methods: [`post`], url: `/catalogos/{catalogo}` }),
    (E.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { catalogo: e }),
            Array.isArray(e) && (e = { catalogo: e[0] }),
            (e = s(e)));
        let n = { catalogo: e.catalogo };
        return (
            E.definition.url
                .replace(`{catalogo}`, n.catalogo.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (E.post = (e, t) => ({ url: E.url(e, t), method: `post` })));
var D = (e, t) => ({ action: E.url(e, t), method: `post` });
((D.post = (e, t) => ({ action: E.url(e, t), method: `post` })), (E.form = D));
var O = (e, t) => ({ url: O.url(e, t), method: `put` });
((O.definition = { methods: [`put`], url: `/catalogos/{catalogo}/{registro}` }),
    (O.url = (e, t) => {
        (Array.isArray(e) && (e = { catalogo: e[0], registro: e[1] }),
            (e = s(e)));
        let n = { catalogo: e.catalogo, registro: e.registro };
        return (
            O.definition.url
                .replace(`{catalogo}`, n.catalogo.toString())
                .replace(`{registro}`, n.registro.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (O.put = (e, t) => ({ url: O.url(e, t), method: `put` })));
var k = (e, t) => ({
    action: O.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((k.put = (e, t) => ({
    action: O.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (O.form = k));
var A = (e, t) => ({ url: A.url(e, t), method: `delete` });
((A.definition = {
    methods: [`delete`],
    url: `/catalogos/{catalogo}/{registro}`,
}),
    (A.url = (e, t) => {
        (Array.isArray(e) && (e = { catalogo: e[0], registro: e[1] }),
            (e = s(e)));
        let n = { catalogo: e.catalogo, registro: e.registro };
        return (
            A.definition.url
                .replace(`{catalogo}`, n.catalogo.toString())
                .replace(`{registro}`, n.registro.toString())
                .replace(/\/+$/, ``) + a(t)
        );
    }),
    (A.delete = (e, t) => ({ url: A.url(e, t), method: `delete` })));
var j = (e, t) => ({
    action: A.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((j.delete = (e, t) => ({
    action: A.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (A.form = j));
var M = { index: S, show: w, store: E, update: O, destroy: A },
    N = o(),
    P = `sin-valor`;
function F(e) {
    let t = (0, x.c)(83),
        { catalogo: r, registros: a, puedeAdministrar: o } = e,
        [s, m] = (0, b.useState)(null),
        [S, C] = (0, b.useState)(!1),
        w,
        T,
        E,
        D,
        O,
        k,
        A,
        j,
        F;
    if (
        t[0] !== r.campos ||
        t[1] !== r.clave ||
        t[2] !== r.descripcion ||
        t[3] !== r.etiqueta ||
        t[4] !== r.opciones ||
        t[5] !== o ||
        t[6] !== a
    ) {
        E = r.campos.filter(xe);
        let e;
        t[16] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((e = (e) => {
                  (m(e), C(!0));
              }),
              (t[16] = e))
            : (e = t[16]);
        let i = e,
            s;
        t[17] === r.opciones
            ? (s = t[18])
            : ((s = (e, t) => {
                  let n = e[t.nombre];
                  return t.tipo === `seleccion`
                      ? (r.opciones[t.nombre]?.find(
                            (e) => String(e.valor) === String(n),
                        )?.nombre ?? `—`)
                      : n === null || n === ``
                        ? `—`
                        : String(n);
              }),
              (t[17] = r.opciones),
              (t[18] = s));
        let l = s;
        (t[19] === r.etiqueta
            ? (F = t[20])
            : ((F = (0, N.jsx)(ee, { title: r.etiqueta })),
              (t[19] = r.etiqueta),
              (t[20] = F)),
            (A = `space-y-6 px-4 py-6`));
        let u;
        t[21] !== r.descripcion || t[22] !== r.etiqueta
            ? ((u = (0, N.jsx)(le, {
                  title: r.etiqueta,
                  description: r.descripcion,
              })),
              (t[21] = r.descripcion),
              (t[22] = r.etiqueta),
              (t[23] = u))
            : (u = t[23]);
        let d;
        (t[24] === o
            ? (d = t[25])
            : ((d =
                  o &&
                  (0, N.jsxs)(c, {
                      onClick: () => i(null),
                      children: [(0, N.jsx)(ne, {}), `Agregar`],
                  })),
              (t[24] = o),
              (t[25] = d)),
            t[26] !== d || t[27] !== u
                ? ((j = (0, N.jsxs)(`div`, {
                      className: `flex flex-wrap items-start justify-between gap-4`,
                      children: [u, d],
                  })),
                  (t[26] = d),
                  (t[27] = u),
                  (t[28] = j))
                : (j = t[28]),
            (k = `rounded-xl border`),
            (T = ge));
        let f;
        t[29] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((f = (0, N.jsx)(_, { children: `Estado` })), (t[29] = f))
            : (f = t[29]);
        let p;
        (t[30] === o
            ? (p = t[31])
            : ((p =
                  o &&
                  (0, N.jsx)(_, {
                      className: `text-right`,
                      children: `Acciones`,
                  })),
              (t[30] = o),
              (t[31] = p)),
            (O = (0, N.jsx)(me, {
                children: (0, N.jsxs)(v, { children: [E.map(be), f, p] }),
            })),
            (w = he),
            (D = a.map((e) =>
                (0, N.jsxs)(
                    v,
                    {
                        children: [
                            E.map((t) =>
                                (0, N.jsx)(y, { children: l(e, t) }, t.nombre),
                            ),
                            (0, N.jsx)(y, {
                                children: (0, N.jsx)(ae, {
                                    variant: e.activo ? `default` : `outline`,
                                    children: e.activo ? `Activo` : `Inactivo`,
                                }),
                            }),
                            o &&
                                (0, N.jsxs)(y, {
                                    className: `text-right whitespace-nowrap`,
                                    children: [
                                        (0, N.jsxs)(c, {
                                            variant: `ghost`,
                                            size: `sm`,
                                            onClick: () => i(e),
                                            children: [
                                                (0, N.jsx)(te, {}),
                                                `Editar`,
                                            ],
                                        }),
                                        (0, N.jsxs)(c, {
                                            variant: `ghost`,
                                            size: `sm`,
                                            onClick: () =>
                                                n.delete(
                                                    M.destroy.url({
                                                        catalogo: r.clave,
                                                        registro: e.id,
                                                    }),
                                                    { preserveScroll: !0 },
                                                ),
                                            children: [
                                                (0, N.jsx)(re, {}),
                                                `Eliminar`,
                                            ],
                                        }),
                                    ],
                                }),
                        ],
                    },
                    e.id,
                ),
            )),
            (t[0] = r.campos),
            (t[1] = r.clave),
            (t[2] = r.descripcion),
            (t[3] = r.etiqueta),
            (t[4] = r.opciones),
            (t[5] = o),
            (t[6] = a),
            (t[7] = w),
            (t[8] = T),
            (t[9] = E),
            (t[10] = D),
            (t[11] = O),
            (t[12] = k),
            (t[13] = A),
            (t[14] = j),
            (t[15] = F));
    } else
        ((w = t[7]),
            (T = t[8]),
            (E = t[9]),
            (D = t[10]),
            (O = t[11]),
            (k = t[12]),
            (A = t[13]),
            (j = t[14]),
            (F = t[15]));
    let I;
    t[32] !== E || t[33] !== a.length
        ? ((I =
              a.length === 0 &&
              (0, N.jsx)(v, {
                  children: (0, N.jsx)(y, {
                      colSpan: E.length + 2,
                      className: `py-10 text-center text-muted-foreground`,
                      children: `Este catálogo todavía no tiene valores.`,
                  }),
              })),
          (t[32] = E),
          (t[33] = a.length),
          (t[34] = I))
        : (I = t[34]);
    let L;
    t[35] !== w || t[36] !== D || t[37] !== I
        ? ((L = (0, N.jsxs)(w, { children: [D, I] })),
          (t[35] = w),
          (t[36] = D),
          (t[37] = I),
          (t[38] = L))
        : (L = t[38]);
    let R;
    t[39] !== T || t[40] !== O || t[41] !== L
        ? ((R = (0, N.jsxs)(T, { children: [O, L] })),
          (t[39] = T),
          (t[40] = O),
          (t[41] = L),
          (t[42] = R))
        : (R = t[42]);
    let z;
    t[43] !== k || t[44] !== R
        ? ((z = (0, N.jsx)(`div`, { className: k, children: R })),
          (t[43] = k),
          (t[44] = R),
          (t[45] = z))
        : (z = t[45]);
    let B;
    t[46] !== z || t[47] !== A || t[48] !== j
        ? ((B = (0, N.jsxs)(`div`, { className: A, children: [j, z] })),
          (t[46] = z),
          (t[47] = A),
          (t[48] = j),
          (t[49] = B))
        : (B = t[49]);
    let V;
    t[50] !== r.etiquetaSingular || t[51] !== s
        ? ((V = s
              ? `Editar ${r.etiquetaSingular.toLowerCase()}`
              : `Agregar ${r.etiquetaSingular.toLowerCase()}`),
          (t[50] = r.etiquetaSingular),
          (t[51] = s),
          (t[52] = V))
        : (V = t[52]);
    let H;
    t[53] === V
        ? (H = t[54])
        : ((H = (0, N.jsx)(de, { children: V })), (t[53] = V), (t[54] = H));
    let U;
    t[55] === r.descripcion
        ? (U = t[56])
        : ((U = (0, N.jsx)(ue, { children: r.descripcion })),
          (t[55] = r.descripcion),
          (t[56] = U));
    let W;
    t[57] !== H || t[58] !== U
        ? ((W = (0, N.jsxs)(se, { children: [H, U] })),
          (t[57] = H),
          (t[58] = U),
          (t[59] = W))
        : (W = t[59]);
    let G = s?.id ?? `nuevo`,
        K;
    t[60] !== r.clave || t[61] !== s
        ? ((K = s
              ? M.update.form({ catalogo: r.clave, registro: s.id })
              : M.store.form(r.clave)),
          (t[60] = r.clave),
          (t[61] = s),
          (t[62] = K))
        : (K = t[62]);
    let q, J;
    t[63] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((q = { preserveScroll: !0 }),
          (J = () => C(!1)),
          (t[63] = q),
          (t[64] = J))
        : ((q = t[63]), (J = t[64]));
    let Y;
    t[65] !== r.campos || t[66] !== r.opciones || t[67] !== s
        ? ((Y = (e) => {
              let { processing: t, errors: n } = e;
              return (0, N.jsxs)(N.Fragment, {
                  children: [
                      r.campos.map((e) =>
                          (0, N.jsxs)(
                              `div`,
                              {
                                  className: `grid gap-2`,
                                  children: [
                                      e.tipo === `booleano`
                                          ? (0, N.jsxs)(`div`, {
                                                className: `flex items-center gap-3`,
                                                children: [
                                                    (0, N.jsx)(ve, {
                                                        id: e.nombre,
                                                        name: e.nombre,
                                                        defaultChecked:
                                                            !s || !!s[e.nombre],
                                                    }),
                                                    (0, N.jsx)(g, {
                                                        htmlFor: e.nombre,
                                                        children: e.etiqueta,
                                                    }),
                                                ],
                                            })
                                          : (0, N.jsxs)(N.Fragment, {
                                                children: [
                                                    (0, N.jsx)(g, {
                                                        htmlFor: e.nombre,
                                                        children: e.etiqueta,
                                                    }),
                                                    e.tipo === `texto` &&
                                                        (0, N.jsx)(ie, {
                                                            id: e.nombre,
                                                            name: e.nombre,
                                                            required:
                                                                e.requerido,
                                                            defaultValue:
                                                                s?.[e.nombre] ??
                                                                ``,
                                                        }),
                                                    e.tipo === `texto_largo` &&
                                                        (0, N.jsx)(_e, {
                                                            id: e.nombre,
                                                            name: e.nombre,
                                                            required:
                                                                e.requerido,
                                                            defaultValue:
                                                                s?.[e.nombre] ??
                                                                ``,
                                                        }),
                                                    e.tipo === `seleccion` &&
                                                        (0, N.jsxs)(p, {
                                                            name: e.nombre,
                                                            defaultValue: s?.[
                                                                e.nombre
                                                            ]
                                                                ? String(
                                                                      s[
                                                                          e
                                                                              .nombre
                                                                      ],
                                                                  )
                                                                : e.requerido
                                                                  ? void 0
                                                                  : P,
                                                            children: [
                                                                (0, N.jsx)(u, {
                                                                    id: e.nombre,
                                                                    children:
                                                                        (0,
                                                                        N.jsx)(
                                                                            l,
                                                                            {
                                                                                placeholder: `Seleccione una opción`,
                                                                            },
                                                                        ),
                                                                }),
                                                                (0, N.jsxs)(d, {
                                                                    children: [
                                                                        !e.requerido &&
                                                                            (0,
                                                                            N.jsx)(
                                                                                f,
                                                                                {
                                                                                    value: P,
                                                                                    children: `Sin asignar`,
                                                                                },
                                                                            ),
                                                                        (
                                                                            r
                                                                                .opciones[
                                                                                e
                                                                                    .nombre
                                                                            ] ??
                                                                            []
                                                                        ).map(
                                                                            ye,
                                                                        ),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                ],
                                            }),
                                      (0, N.jsx)(fe, { message: n[e.nombre] }),
                                  ],
                              },
                              e.nombre,
                          ),
                      ),
                      (0, N.jsxs)(h, {
                          children: [
                              (0, N.jsx)(c, {
                                  type: `button`,
                                  variant: `outline`,
                                  onClick: () => C(!1),
                                  children: `Cancelar`,
                              }),
                              (0, N.jsxs)(c, {
                                  type: `submit`,
                                  disabled: t,
                                  children: [
                                      t && (0, N.jsx)(pe, {}),
                                      `Guardar`,
                                  ],
                              }),
                          ],
                      }),
                  ],
              });
          }),
          (t[65] = r.campos),
          (t[66] = r.opciones),
          (t[67] = s),
          (t[68] = Y))
        : (Y = t[68]);
    let X;
    t[69] !== G || t[70] !== K || t[71] !== Y
        ? ((X = (0, N.jsx)(
              i,
              {
                  ...K,
                  options: q,
                  onSuccess: J,
                  className: `space-y-4`,
                  children: Y,
              },
              G,
          )),
          (t[69] = G),
          (t[70] = K),
          (t[71] = Y),
          (t[72] = X))
        : (X = t[72]);
    let Z;
    t[73] !== W || t[74] !== X
        ? ((Z = (0, N.jsxs)(ce, { children: [W, X] })),
          (t[73] = W),
          (t[74] = X),
          (t[75] = Z))
        : (Z = t[75]);
    let Q;
    t[76] !== S || t[77] !== Z
        ? ((Q = (0, N.jsx)(oe, { open: S, onOpenChange: C, children: Z })),
          (t[76] = S),
          (t[77] = Z),
          (t[78] = Q))
        : (Q = t[78]);
    let $;
    return (
        t[79] !== B || t[80] !== Q || t[81] !== F
            ? (($ = (0, N.jsxs)(N.Fragment, { children: [F, B, Q] })),
              (t[79] = B),
              (t[80] = Q),
              (t[81] = F),
              (t[82] = $))
            : ($ = t[82]),
        $
    );
}
function ye(e) {
    return (0, N.jsx)(
        f,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function be(e) {
    return (0, N.jsx)(_, { children: e.etiqueta }, e.nombre);
}
function xe(e) {
    return e.tipo !== `booleano`;
}
F.layout = { breadcrumbs: [{ title: `Catálogos`, href: m() }] };
export { F as default };
