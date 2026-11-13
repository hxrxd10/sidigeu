import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    h as r,
    i,
    l as a,
    r as o,
    s,
} from './wayfinder-C8dNLrFV.js';
import { a as c, i as l, n as u, r as d, t as f } from './dist-LZ2iyHZ8.js';
import { o as p, t as m } from './button-BzkMvCJO.js';
import { t as h } from './dist-DZ9NY9ia.js';
import { t as g } from './dist-CJ-cE2gk.js';
import { t as _ } from './arrow-left-CWHaM1EE.js';
import { t as v } from './chevron-down-LuXafD-_.js';
import { t as y } from './circle-check-CQR1GVzd.js';
import { t as b } from './download-DSJLq0he.js';
import { t as ee } from './file-spreadsheet-gg-INAOi.js';
import { Tt as x, f as S } from './app-Bu9EFUG6.js';
import { t as te } from './input-error-Bxj_sbd5.js';
import { a as C, i as w, n as T, r as E, t as D } from './card-Bc3dRGP7.js';
import { t as ne } from './label-D0AQUEbO.js';
import { t as re } from './spinner-DtbIIn34.js';
import {
    a as ie,
    i as O,
    n as ae,
    o as k,
    r as A,
    t as oe,
} from './table-D3mJxxJl.js';
var j = o(`TriangleAlert`, [
        [
            `path`,
            {
                d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
                key: `wmoenq`,
            },
        ],
        [`path`, { d: `M12 9v4`, key: `juzpu7` }],
        [`path`, { d: `M12 17h.01`, key: `p32p05` }],
    ]),
    se = o(`Upload`, [
        [
            `path`,
            { d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`, key: `ih7n3h` },
        ],
        [`polyline`, { points: `17 8 12 3 7 8`, key: `t8dd8p` }],
        [`line`, { x1: `12`, x2: `12`, y1: `3`, y2: `15`, key: `widbto` }],
    ]),
    M = t(),
    N = e(r(), 1),
    P = s(),
    F = Object.defineProperty,
    I = (e, t) => F(e, `name`, { value: t, configurable: !0 }),
    L = `Collapsible`,
    [R, z] = l(L),
    [B, V] = R(L),
    H = N.forwardRef(
        I(function (e, t) {
            let {
                    __scopeCollapsible: n,
                    open: r,
                    defaultOpen: i,
                    disabled: a,
                    onOpenChange: o,
                    ...s
                } = e,
                [c, l] = f({
                    prop: r,
                    defaultProp: i ?? !1,
                    onChange: o,
                    caller: L,
                });
            return (0, P.jsx)(B, {
                scope: n,
                disabled: a,
                contentId: g(),
                open: c,
                onOpenToggle: N.useCallback(() => l((e) => !e), [l]),
                children: (0, P.jsx)(h.div, {
                    'data-state': J(c),
                    'data-disabled': a ? `` : void 0,
                    ...s,
                    ref: t,
                }),
            });
        }, `Collapsible`),
    ),
    U = `CollapsibleTrigger`,
    W = N.forwardRef(
        I(function (e, t) {
            let { __scopeCollapsible: n, ...r } = e,
                i = V(U, n);
            return (0, P.jsx)(h.button, {
                type: `button`,
                'aria-controls': i.open ? i.contentId : void 0,
                'aria-expanded': i.open || !1,
                'data-state': J(i.open),
                'data-disabled': i.disabled ? `` : void 0,
                disabled: i.disabled,
                ...r,
                ref: t,
                onClick: c(e.onClick, i.onOpenToggle),
            });
        }, `CollapsibleTrigger`),
    ),
    G = `CollapsibleContent`,
    K = N.forwardRef(
        I(function (e, t) {
            let { forceMount: n, ...r } = e,
                i = V(G, e.__scopeCollapsible);
            return (0, P.jsx)(u, {
                present: n || i.open,
                children: ({ present: e }) =>
                    (0, P.jsx)(q, { ...r, ref: t, present: e }),
            });
        }, `CollapsibleContent`),
    ),
    q = N.forwardRef(
        I(function (e, t) {
            let { __scopeCollapsible: n, present: r, children: i, ...a } = e,
                o = V(G, n),
                [s, c] = N.useState(r),
                l = N.useRef(null),
                u = p(t, l),
                f = N.useRef(0),
                m = f.current,
                g = N.useRef(0),
                _ = g.current,
                v = o.open || s,
                y = N.useRef(v),
                b = N.useRef(void 0);
            return (
                N.useEffect(() => {
                    let e = requestAnimationFrame(() => (y.current = !1));
                    return () => cancelAnimationFrame(e);
                }, []),
                d(() => {
                    let e = l.current;
                    if (e) {
                        ((b.current = b.current || {
                            transitionDuration: e.style.transitionDuration,
                            animationName: e.style.animationName,
                        }),
                            (e.style.transitionDuration = `0s`),
                            (e.style.animationName = `none`));
                        let t = e.getBoundingClientRect();
                        ((f.current = t.height),
                            (g.current = t.width),
                            y.current ||
                                ((e.style.transitionDuration =
                                    b.current.transitionDuration),
                                (e.style.animationName =
                                    b.current.animationName)),
                            c(r));
                    }
                }, [o.open, r]),
                (0, P.jsx)(h.div, {
                    'data-state': J(o.open),
                    'data-disabled': o.disabled ? `` : void 0,
                    id: o.contentId,
                    hidden: !v,
                    ...a,
                    ref: u,
                    style: {
                        '--radix-collapsible-content-height': m
                            ? `${m}px`
                            : void 0,
                        '--radix-collapsible-content-width': _
                            ? `${_}px`
                            : void 0,
                        ...e.style,
                    },
                    children: v && i,
                })
            );
        }, `CollapsibleContentImpl`),
    );
function J(e) {
    return e ? `open` : `closed`;
}
I(J, `getState`);
function Y(e) {
    let t = (0, M.c)(4),
        n;
    t[0] === e ? (n = t[1]) : (({ ...n } = e), (t[0] = e), (t[1] = n));
    let r;
    return (
        t[2] === n
            ? (r = t[3])
            : ((r = (0, P.jsx)(H, { 'data-slot': `collapsible`, ...n })),
              (t[2] = n),
              (t[3] = r)),
        r
    );
}
function X(e) {
    let t = (0, M.c)(4),
        n;
    t[0] === e ? (n = t[1]) : (({ ...n } = e), (t[0] = e), (t[1] = n));
    let r;
    return (
        t[2] === n
            ? (r = t[3])
            : ((r = (0, P.jsx)(W, {
                  'data-slot': `collapsible-trigger`,
                  ...n,
              })),
              (t[2] = n),
              (t[3] = r)),
        r
    );
}
function Z(e) {
    let t = (0, M.c)(4),
        n;
    t[0] === e ? (n = t[1]) : (({ ...n } = e), (t[0] = e), (t[1] = n));
    let r;
    return (
        t[2] === n
            ? (r = t[3])
            : ((r = (0, P.jsx)(K, {
                  'data-slot': `collapsible-content`,
                  ...n,
              })),
              (t[2] = n),
              (t[3] = r)),
        r
    );
}
function Q(e) {
    let t = (0, M.c)(11),
        { etiqueta: n, valor: r, tono: a } = e,
        o;
    t[0] === n
        ? (o = t[1])
        : ((o = (0, P.jsx)(`p`, {
              className: `text-xs tracking-wide text-muted-foreground uppercase`,
              children: n,
          })),
          (t[0] = n),
          (t[1] = o));
    let s = a === `bien` && r > 0 && `text-digeu-green`,
        c = a === `mal` && r > 0 && `text-destructive`,
        l;
    t[2] !== s || t[3] !== c
        ? ((l = i(`text-2xl font-semibold tabular-nums`, s, c)),
          (t[2] = s),
          (t[3] = c),
          (t[4] = l))
        : (l = t[4]);
    let u;
    t[5] !== l || t[6] !== r
        ? ((u = (0, P.jsx)(`p`, { className: l, children: r })),
          (t[5] = l),
          (t[6] = r),
          (t[7] = u))
        : (u = t[7]);
    let d;
    return (
        t[8] !== o || t[9] !== u
            ? ((d = (0, P.jsxs)(`div`, { children: [o, u] })),
              (t[8] = o),
              (t[9] = u),
              (t[10] = d))
            : (d = t[10]),
        d
    );
}
function $(e) {
    let t = (0, M.c)(74),
        {
            titulo: r,
            descripcion: o,
            columnas: s,
            instrucciones: c,
            listas: l,
            plantilla: u,
            plantillaCsv: d,
            revision: f,
            accionRevision: p,
            accionConfirmar: h,
            volver: g,
        } = e,
        v,
        j,
        F,
        I,
        L,
        R,
        z,
        B,
        V,
        H,
        U;
    if (
        t[0] !== o ||
        t[1] !== c ||
        t[2] !== l ||
        t[3] !== u ||
        t[4] !== d ||
        t[5] !== r ||
        t[6] !== g.etiqueta ||
        t[7] !== g.href
    ) {
        let e = Object.entries(l).filter(he);
        V = `space-y-6`;
        let i;
        (t[19] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((i = (0, P.jsx)(_, {})), (t[19] = i))
            : (i = t[19]),
            t[20] !== g.etiqueta || t[21] !== g.href
                ? ((H = (0, P.jsx)(m, {
                      variant: `ghost`,
                      size: `sm`,
                      asChild: !0,
                      className: `-ml-2`,
                      children: (0, P.jsxs)(n, {
                          href: g.href,
                          children: [i, g.etiqueta],
                      }),
                  })),
                  (t[20] = g.etiqueta),
                  (t[21] = g.href),
                  (t[22] = H))
                : (H = t[22]));
        let a;
        t[23] === r
            ? (a = t[24])
            : ((a = (0, P.jsx)(`h1`, {
                  className: `text-2xl font-semibold`,
                  children: r,
              })),
              (t[23] = r),
              (t[24] = a));
        let s;
        (t[25] === o
            ? (s = t[26])
            : ((s = (0, P.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: o,
              })),
              (t[25] = o),
              (t[26] = s)),
            t[27] !== a || t[28] !== s
                ? ((U = (0, P.jsxs)(`header`, { children: [a, s] })),
                  (t[27] = a),
                  (t[28] = s),
                  (t[29] = U))
                : (U = t[29]),
            (B = `grid gap-4 lg:grid-cols-2`),
            (j = D),
            t[30] === Symbol.for(`react.memo_cache_sentinel`)
                ? ((z = (0, P.jsxs)(w, {
                      children: [
                          (0, P.jsxs)(C, {
                              className: `flex items-center gap-2`,
                              children: [
                                  (0, P.jsx)(`span`, {
                                      className: `flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground`,
                                      children: `1`,
                                  }),
                                  `Descargue la plantilla`,
                              ],
                          }),
                          (0, P.jsx)(E, {
                              children: `El archivo de Excel trae los encabezados y listas desplegables con los valores permitidos.`,
                          }),
                      ],
                  })),
                  (t[30] = z))
                : (z = t[30]),
            (v = T),
            (F = `space-y-4`));
        let f;
        t[31] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((f = (0, P.jsx)(ee, {})), (t[31] = f))
            : (f = t[31]);
        let p;
        t[32] === u
            ? (p = t[33])
            : ((p = (0, P.jsx)(m, {
                  asChild: !0,
                  children: (0, P.jsxs)(`a`, {
                      href: u,
                      children: [f, `Plantilla (Excel)`],
                  }),
              })),
              (t[32] = u),
              (t[33] = p));
        let h;
        t[34] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((h = (0, P.jsx)(b, {})), (t[34] = h))
            : (h = t[34]);
        let y;
        (t[35] === d
            ? (y = t[36])
            : ((y = (0, P.jsx)(m, {
                  variant: `outline`,
                  asChild: !0,
                  children: (0, P.jsxs)(`a`, {
                      href: d,
                      children: [h, `Plantilla (CSV)`],
                  }),
              })),
              (t[35] = d),
              (t[36] = y)),
            t[37] !== p || t[38] !== y
                ? ((I = (0, P.jsxs)(`div`, {
                      className: `flex flex-wrap gap-2`,
                      children: [p, y],
                  })),
                  (t[37] = p),
                  (t[38] = y),
                  (t[39] = I))
                : (I = t[39]));
        let x;
        (t[40] === c
            ? (x = t[41])
            : ((x = c.filter(me).slice(1).map(pe)), (t[40] = c), (t[41] = x)),
            t[42] === x
                ? (L = t[43])
                : ((L = (0, P.jsx)(`ul`, {
                      className: `space-y-1.5 text-sm text-muted-foreground`,
                      children: x,
                  })),
                  (t[42] = x),
                  (t[43] = L)),
            (R =
                e.length > 0 &&
                (0, P.jsx)(`div`, {
                    className: `space-y-2`,
                    children: e.map(de),
                })),
            (t[0] = o),
            (t[1] = c),
            (t[2] = l),
            (t[3] = u),
            (t[4] = d),
            (t[5] = r),
            (t[6] = g.etiqueta),
            (t[7] = g.href),
            (t[8] = v),
            (t[9] = j),
            (t[10] = F),
            (t[11] = I),
            (t[12] = L),
            (t[13] = R),
            (t[14] = z),
            (t[15] = B),
            (t[16] = V),
            (t[17] = H),
            (t[18] = U));
    } else
        ((v = t[8]),
            (j = t[9]),
            (F = t[10]),
            (I = t[11]),
            (L = t[12]),
            (R = t[13]),
            (z = t[14]),
            (B = t[15]),
            (V = t[16]),
            (H = t[17]),
            (U = t[18]));
    let W;
    t[44] !== v || t[45] !== F || t[46] !== I || t[47] !== L || t[48] !== R
        ? ((W = (0, P.jsxs)(v, { className: F, children: [I, L, R] })),
          (t[44] = v),
          (t[45] = F),
          (t[46] = I),
          (t[47] = L),
          (t[48] = R),
          (t[49] = W))
        : (W = t[49]);
    let G;
    t[50] !== j || t[51] !== W || t[52] !== z
        ? ((G = (0, P.jsxs)(j, { children: [z, W] })),
          (t[50] = j),
          (t[51] = W),
          (t[52] = z),
          (t[53] = G))
        : (G = t[53]);
    let K;
    t[54] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((K = (0, P.jsxs)(w, {
              children: [
                  (0, P.jsxs)(C, {
                      className: `flex items-center gap-2`,
                      children: [
                          (0, P.jsx)(`span`, {
                              className: `flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground`,
                              children: `2`,
                          }),
                          `Suba el archivo lleno`,
                      ],
                  }),
                  (0, P.jsx)(E, {
                      children: `Se revisa y se le muestra el resultado antes de guardar. Acepta .xlsx y .csv, hasta 5 MB.`,
                  }),
              ],
          })),
          (t[54] = K))
        : (K = t[54]);
    let q;
    t[55] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((q = { preserveScroll: !0 }), (t[55] = q))
        : (q = t[55]);
    let J;
    t[56] === s
        ? (J = t[57])
        : ((J = (e) => {
              let { processing: t, errors: n } = e;
              return (0, P.jsxs)(P.Fragment, {
                  children: [
                      (0, P.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, P.jsx)(ne, {
                                  htmlFor: `archivo`,
                                  children: `Archivo`,
                              }),
                              (0, P.jsx)(x, {
                                  id: `archivo`,
                                  name: `archivo`,
                                  type: `file`,
                                  accept: `.xlsx,.csv,text/csv`,
                                  required: !0,
                              }),
                              (0, P.jsx)(te, { message: n.archivo }),
                          ],
                      }),
                      (0, P.jsxs)(m, {
                          type: `submit`,
                          disabled: t,
                          children: [
                              t ? (0, P.jsx)(re, {}) : (0, P.jsx)(se, {}),
                              `Revisar archivo`,
                          ],
                      }),
                      (0, P.jsxs)(`p`, {
                          className: `text-xs text-muted-foreground`,
                          children: [
                              `Columnas esperadas, en este orden:`,
                              ` `,
                              s.map(ue).join(` · `),
                          ],
                      }),
                  ],
              });
          }),
          (t[56] = s),
          (t[57] = J));
    let Y;
    t[58] !== p || t[59] !== J
        ? ((Y = (0, P.jsxs)(D, {
              children: [
                  K,
                  (0, P.jsx)(T, {
                      children: (0, P.jsx)(a, {
                          ...p,
                          options: q,
                          className: `space-y-4`,
                          children: J,
                      }),
                  }),
              ],
          })),
          (t[58] = p),
          (t[59] = J),
          (t[60] = Y))
        : (Y = t[60]);
    let X;
    t[61] !== G || t[62] !== Y || t[63] !== B
        ? ((X = (0, P.jsxs)(`div`, { className: B, children: [G, Y] })),
          (t[61] = G),
          (t[62] = Y),
          (t[63] = B),
          (t[64] = X))
        : (X = t[64]);
    let Z;
    t[65] !== h || t[66] !== f
        ? ((Z =
              f &&
              (0, P.jsxs)(D, {
                  children: [
                      (0, P.jsxs)(w, {
                          children: [
                              (0, P.jsxs)(C, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                      (0, P.jsx)(`span`, {
                                          className: `flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground`,
                                          children: `3`,
                                      }),
                                      `Revise y confirme`,
                                  ],
                              }),
                              (0, P.jsx)(E, {
                                  children: `Las filas con error se omiten; el resto se guarda al confirmar.`,
                              }),
                          ],
                      }),
                      (0, P.jsxs)(T, {
                          className: `space-y-4`,
                          children: [
                              (0, P.jsxs)(`div`, {
                                  className: `flex flex-wrap items-end justify-between gap-6`,
                                  children: [
                                      (0, P.jsxs)(`div`, {
                                          className: `flex gap-8`,
                                          children: [
                                              (0, P.jsx)(Q, {
                                                  etiqueta: `Filas leídas`,
                                                  valor: f.resumen.total,
                                              }),
                                              (0, P.jsx)(Q, {
                                                  etiqueta: `Listas para cargar`,
                                                  valor: f.resumen.validas,
                                                  tono: `bien`,
                                              }),
                                              (0, P.jsx)(Q, {
                                                  etiqueta: `Con error`,
                                                  valor: f.resumen.conError,
                                                  tono: `mal`,
                                              }),
                                          ],
                                      }),
                                      f.token
                                          ? (0, P.jsx)(a, {
                                                ...h,
                                                options: { preserveScroll: !0 },
                                                children: (e) => {
                                                    let { processing: t } = e;
                                                    return (0, P.jsxs)(
                                                        P.Fragment,
                                                        {
                                                            children: [
                                                                (0, P.jsx)(
                                                                    `input`,
                                                                    {
                                                                        type: `hidden`,
                                                                        name: `token`,
                                                                        value:
                                                                            f.token ??
                                                                            ``,
                                                                    },
                                                                ),
                                                                (0, P.jsxs)(m, {
                                                                    type: `submit`,
                                                                    disabled: t,
                                                                    children: [
                                                                        t
                                                                            ? (0,
                                                                              P.jsx)(
                                                                                  re,
                                                                                  {},
                                                                              )
                                                                            : (0,
                                                                              P.jsx)(
                                                                                  y,
                                                                                  {},
                                                                              ),
                                                                        `Cargar`,
                                                                        ` `,
                                                                        f
                                                                            .resumen
                                                                            .validas,
                                                                        ` `,
                                                                        f
                                                                            .resumen
                                                                            .validas ===
                                                                        1
                                                                            ? `registro`
                                                                            : `registros`,
                                                                    ],
                                                                }),
                                                            ],
                                                        },
                                                    );
                                                },
                                            })
                                          : (0, P.jsx)(`p`, {
                                                className: `text-sm text-destructive`,
                                                children: `Ninguna fila está lista para cargarse. Corrija el archivo y vuelva a subirlo.`,
                                            }),
                                  ],
                              }),
                              (0, P.jsx)(`div`, {
                                  className: `overflow-x-auto`,
                                  children: (0, P.jsxs)(oe, {
                                      children: [
                                          (0, P.jsx)(ie, {
                                              children: (0, P.jsxs)(k, {
                                                  children: [
                                                      (0, P.jsx)(O, {
                                                          className: `w-16`,
                                                          children: `Fila`,
                                                      }),
                                                      (0, P.jsx)(O, {
                                                          className: `w-28`,
                                                          children: `Estado`,
                                                      }),
                                                      f.columnas.map(le),
                                                  ],
                                              }),
                                          }),
                                          (0, P.jsx)(ae, {
                                              children: f.filas.map((e) =>
                                                  (0, P.jsxs)(
                                                      N.Fragment,
                                                      {
                                                          children: [
                                                              (0, P.jsxs)(k, {
                                                                  className: i(
                                                                      e.errores
                                                                          .length >
                                                                          0 &&
                                                                          `bg-destructive/5`,
                                                                  ),
                                                                  children: [
                                                                      (0,
                                                                      P.jsx)(
                                                                          A,
                                                                          {
                                                                              className: `tabular-nums`,
                                                                              children:
                                                                                  e.numero,
                                                                          },
                                                                      ),
                                                                      (0,
                                                                      P.jsx)(
                                                                          A,
                                                                          {
                                                                              children:
                                                                                  e
                                                                                      .errores
                                                                                      .length ===
                                                                                  0
                                                                                      ? (0,
                                                                                        P.jsx)(
                                                                                            S,
                                                                                            {
                                                                                                variant: `secondary`,
                                                                                                children: `Lista`,
                                                                                            },
                                                                                        )
                                                                                      : (0,
                                                                                        P.jsx)(
                                                                                            S,
                                                                                            {
                                                                                                variant: `destructive`,
                                                                                                children: `Con error`,
                                                                                            },
                                                                                        ),
                                                                          },
                                                                      ),
                                                                      e.valores.map(
                                                                          (
                                                                              t,
                                                                              n,
                                                                          ) =>
                                                                              (0,
                                                                              P.jsx)(
                                                                                  A,
                                                                                  {
                                                                                      className: `max-w-48 truncate`,
                                                                                      children:
                                                                                          t,
                                                                                  },
                                                                                  `${e.numero}-${n}`,
                                                                              ),
                                                                      ),
                                                                  ],
                                                              }),
                                                              e.errores.length >
                                                                  0 &&
                                                                  (0, P.jsxs)(
                                                                      k,
                                                                      {
                                                                          className: `bg-destructive/5`,
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  P.jsx)(
                                                                                      A,
                                                                                      {},
                                                                                  ),
                                                                                  (0,
                                                                                  P.jsx)(
                                                                                      A,
                                                                                      {
                                                                                          colSpan:
                                                                                              f
                                                                                                  .columnas
                                                                                                  .length +
                                                                                              1,
                                                                                          children:
                                                                                              (0,
                                                                                              P.jsx)(
                                                                                                  `ul`,
                                                                                                  {
                                                                                                      className: `space-y-1 text-xs text-destructive`,
                                                                                                      children:
                                                                                                          e.errores.map(
                                                                                                              ce,
                                                                                                          ),
                                                                                                  },
                                                                                              ),
                                                                                      },
                                                                                  ),
                                                                              ],
                                                                      },
                                                                  ),
                                                          ],
                                                      },
                                                      e.numero,
                                                  ),
                                              ),
                                          }),
                                      ],
                                  }),
                              }),
                          ],
                      }),
                  ],
              })),
          (t[65] = h),
          (t[66] = f),
          (t[67] = Z))
        : (Z = t[67]);
    let $;
    return (
        t[68] !== X || t[69] !== Z || t[70] !== V || t[71] !== H || t[72] !== U
            ? (($ = (0, P.jsxs)(`div`, {
                  className: V,
                  children: [H, U, X, Z],
              })),
              (t[68] = X),
              (t[69] = Z),
              (t[70] = V),
              (t[71] = H),
              (t[72] = U),
              (t[73] = $))
            : ($ = t[73]),
        $
    );
}
function ce(e) {
    return (0, P.jsxs)(
        `li`,
        {
            className: `flex items-center gap-1.5`,
            children: [(0, P.jsx)(j, { className: `size-3.5 shrink-0` }), e],
        },
        e,
    );
}
function le(e) {
    return (0, P.jsx)(O, { children: e }, e);
}
function ue(e) {
    return e.titulo + (e.requerida ? ` *` : ``);
}
function de(e) {
    let [t, n] = e;
    return (0, P.jsxs)(
        Y,
        {
            children: [
                (0, P.jsxs)(X, {
                    className: `group flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm`,
                    children: [
                        (0, P.jsx)(`span`, {
                            className: `font-medium`,
                            children: t,
                        }),
                        (0, P.jsx)(S, {
                            variant: `secondary`,
                            children: n.length,
                        }),
                        (0, P.jsx)(v, {
                            className: `ml-auto size-4 transition-transform group-data-[state=open]:rotate-180`,
                        }),
                    ],
                }),
                (0, P.jsx)(Z, {
                    className: `px-3 py-2`,
                    children: (0, P.jsx)(`ul`, {
                        className: `flex flex-wrap gap-1.5`,
                        children: n.map(fe),
                    }),
                }),
            ],
        },
        t,
    );
}
function fe(e) {
    return (0, P.jsx)(
        `li`,
        { children: (0, P.jsx)(S, { variant: `outline`, children: e }) },
        e,
    );
}
function pe(e) {
    return (0, P.jsxs)(
        `li`,
        {
            className: `flex gap-2`,
            children: [
                (0, P.jsx)(`span`, { 'aria-hidden': `true`, children: `·` }),
                (0, P.jsx)(`span`, { children: e }),
            ],
        },
        e,
    );
}
function me(e) {
    return e !== ``;
}
function he(e) {
    let [, t] = e;
    return t.length > 0;
}
export { $ as t };
