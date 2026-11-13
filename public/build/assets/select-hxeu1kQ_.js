import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    h as n,
    i as r,
    m as i,
    r as a,
    s as o,
} from './wayfinder-C8dNLrFV.js';
import { a as s, i as c, n as l, r as u, t as d } from './dist-LZ2iyHZ8.js';
import { i as f, o as p } from './button-BzkMvCJO.js';
import { t as m } from './dist-DZ9NY9ia.js';
import {
    a as h,
    d as g,
    i as _,
    l as v,
    n as y,
    r as b,
    t as x,
} from './es2015-CoMxhRWl.js';
import { t as S } from './dist-CJ-cE2gk.js';
import { t as C } from './check-Ftr1fX33.js';
import { t as w } from './chevron-down-LuXafD-_.js';
import {
    Bt as T,
    Ct as E,
    It as D,
    Lt as O,
    Rt as ee,
    wt as k,
    zt as A,
} from './app-Bu9EFUG6.js';
var j = a(`ChevronUp`, [[`path`, { d: `m18 15-6-6-6 6`, key: `153udz` }]]),
    M = e(n(), 1),
    N = e(i(), 1),
    P = t(),
    F = Object.defineProperty,
    I = (e, t) => F(e, `name`, { value: t, configurable: !0 });
function L(e, [t, n]) {
    return Math.min(n, Math.max(t, e));
}
I(L, `clamp`);
var R = o(),
    z = Object.defineProperty,
    B = (e, t) => z(e, `name`, { value: t, configurable: !0 }),
    V = { ItemAligned: `item-aligned`, Popper: `popper` },
    H = { LTR: `ltr`, RTL: `rtl` },
    te = [` `, `Enter`, `ArrowUp`, `ArrowDown`],
    U = [` `, `Enter`],
    W = `Select`,
    [G, K, q] = k(W),
    [J, ne] = c(W, [q, T]),
    re = T(),
    [ie, Y] = J(W),
    [ae, oe] = J(W);
function se(e) {
    let {
            __scopeSelect: t,
            children: n,
            open: r,
            defaultOpen: i,
            onOpenChange: a,
            value: o,
            defaultValue: s,
            onValueChange: c,
            dir: l,
            name: u,
            autoComplete: f,
            disabled: p,
            required: m,
            form: h,
            internal_do_not_use_render: g,
        } = e,
        _ = re(t),
        [v, y] = M.useState(null),
        [b, x] = M.useState(null),
        [C, w] = M.useState(!1),
        T = E(l),
        [D, ee] = d({ prop: r, defaultProp: i ?? !1, onChange: a, caller: W }),
        [k, A] = d({ prop: o, defaultProp: s, onChange: c, caller: W }),
        j = M.useRef(null),
        N = M.useRef(!1),
        [P, F] = M.useState(null),
        I = B((e) => {
            (F({ value: e, hasConsumerStoppedPropagation: N.current }), A(e));
        }, `handleUserSelect`),
        L = M.useRef(k);
    M.useEffect(() => {
        let e = h ? v?.ownerDocument.getElementById(h) : v?.form;
        if (e instanceof HTMLFormElement) {
            let t = B(() => A(L.current), `reset`);
            return (
                e.addEventListener(`reset`, t),
                () => e.removeEventListener(`reset`, t)
            );
        }
    }, [h, v, A]);
    let z = !v || !!h || !!v.closest(`form`),
        [V, H] = M.useState(new Set()),
        te = S(),
        U = Array.from(V)
            .map((e) => e.props.value)
            .join(`;`),
        K = M.useCallback((e) => {
            H((t) => new Set(t).add(e));
        }, []),
        q = M.useCallback((e) => {
            H((t) => {
                let n = new Set(t);
                return (n.delete(e), n);
            });
        }, []),
        J = {
            required: m,
            trigger: v,
            onTriggerChange: y,
            valueNode: b,
            onValueNodeChange: x,
            valueNodeHasChildren: C,
            onValueNodeHasChildrenChange: w,
            contentId: te,
            value: k,
            onValueChange: A,
            hasConsumerStoppedPropagationRef: N,
            userSelection: P,
            onUserSelect: I,
            open: D,
            onOpenChange: ee,
            dir: T,
            triggerPointerDownPosRef: j,
            disabled: p,
            name: u,
            autoComplete: f,
            form: h,
            nativeOptions: V,
            nativeSelectKey: U,
            isFormControl: z,
        };
    return (0, R.jsx)(O, {
        ..._,
        children: (0, R.jsx)(ie, {
            scope: t,
            ...J,
            children: (0, R.jsx)(G.Provider, {
                scope: t,
                children: (0, R.jsx)(ae, {
                    scope: t,
                    onNativeOptionAdd: K,
                    onNativeOptionRemove: q,
                    children: Ge(g) ? g(J) : n,
                }),
            }),
        }),
    });
}
B(se, `SelectProvider`);
var ce = B((e) => {
        let { __scopeSelect: t, children: n, ...r } = e;
        return (0, R.jsx)(se, {
            __scopeSelect: t,
            ...r,
            internal_do_not_use_render: ({ isFormControl: e }) =>
                (0, R.jsxs)(R.Fragment, {
                    children: [
                        n,
                        e ? (0, R.jsx)(We, { __scopeSelect: t }) : null,
                    ],
                }),
        });
    }, `Select`),
    le = `SelectTrigger`,
    ue = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, disabled: r = !1, ...i } = e,
                a = re(n),
                o = Y(le, n),
                c = o.disabled || r,
                l = p(t, o.onTriggerChange),
                u = K(n),
                d = M.useRef(`touch`),
                [f, h, g] = Ke((e) => {
                    let t = u().filter((e) => !e.disabled),
                        n = qe(
                            t,
                            e,
                            t.find((e) => e.value === o.value),
                        );
                    n !== void 0 && o.onUserSelect(n.value);
                }),
                _ = B((e) => {
                    (c || (o.onOpenChange(!0), g()),
                        e &&
                            (o.triggerPointerDownPosRef.current = {
                                x: Math.round(e.pageX),
                                y: Math.round(e.pageY),
                            }));
                }, `handleOpen`);
            return (0, R.jsx)(ee, {
                asChild: !0,
                ...a,
                children: (0, R.jsx)(m.button, {
                    type: `button`,
                    role: `combobox`,
                    'aria-controls': o.open ? o.contentId : void 0,
                    'aria-expanded': o.open,
                    'aria-required': o.required,
                    'aria-autocomplete': `none`,
                    dir: o.dir,
                    'data-state': o.open ? `open` : `closed`,
                    disabled: c,
                    'data-disabled': c ? `` : void 0,
                    'data-placeholder': $(o.value) ? `` : void 0,
                    ...i,
                    ref: l,
                    onClick: s(i.onClick, (e) => {
                        (e.currentTarget.focus(),
                            d.current !== `mouse` && _(e));
                    }),
                    onPointerDown: s(i.onPointerDown, (e) => {
                        d.current = e.pointerType;
                        let t = e.target;
                        (t.hasPointerCapture(e.pointerId) &&
                            t.releasePointerCapture(e.pointerId),
                            e.button === 0 &&
                                e.ctrlKey === !1 &&
                                e.pointerType === `mouse` &&
                                (_(e), e.preventDefault()));
                    }),
                    onKeyDown: s(i.onKeyDown, (e) => {
                        let t = f.current !== ``;
                        (!(e.ctrlKey || e.altKey || e.metaKey) &&
                            e.key.length === 1 &&
                            ((o.hasConsumerStoppedPropagationRef.current =
                                e.isPropagationStopped()),
                            h(e.key)),
                            !(t && e.key === ` `) &&
                                te.includes(e.key) &&
                                (_(), e.preventDefault()));
                    }),
                }),
            });
        }, `SelectTrigger`),
    ),
    de = `SelectValue`,
    fe = M.forwardRef(
        B(function (e, t) {
            let {
                    __scopeSelect: n,
                    className: r,
                    style: i,
                    children: a,
                    placeholder: o = ``,
                    ...s
                } = e,
                c = Y(de, n),
                { onValueNodeHasChildrenChange: l } = c,
                d = a !== void 0,
                f = p(t, c.onValueNodeChange);
            u(() => {
                l(d);
            }, [l, d]);
            let h = $(c.value);
            return (0, R.jsx)(m.span, {
                ...s,
                asChild: !h && s.asChild,
                ref: f,
                style: { pointerEvents: `none` },
                children: (0, R.jsx)(
                    M.Fragment,
                    { children: h ? o : a },
                    h ? `placeholder` : `value`,
                ),
            });
        }, `SelectValue`),
    ),
    pe = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, children: r, ...i } = e;
            return (0, R.jsx)(m.span, {
                'aria-hidden': !0,
                ...i,
                ref: t,
                children: r || `▼`,
            });
        }, `SelectIcon`),
    ),
    [me, he] = J(`SelectPortal`, { forceMount: void 0 }),
    ge = B((e) => {
        let { __scopeSelect: t, forceMount: n, ...r } = e;
        return (0, R.jsx)(me, {
            scope: e.__scopeSelect,
            forceMount: n,
            children: (0, R.jsx)(_, { asChild: !0, ...r }),
        });
    }, `SelectPortal`),
    X = `SelectContent`,
    _e = M.forwardRef(
        B(function (e, t) {
            let n = he(X, e.__scopeSelect),
                { forceMount: r = n.forceMount, ...i } = e,
                a = Y(X, e.__scopeSelect),
                [o, s] = M.useState();
            return (
                u(() => {
                    s(new DocumentFragment());
                }, []),
                (0, R.jsx)(l, {
                    present: r || a.open,
                    children: ({ present: e }) =>
                        e
                            ? (0, R.jsx)(xe, { ...i, ref: t })
                            : (0, R.jsx)(ve, { ...i, fragment: o }),
                })
            );
        }, `SelectContent`),
    ),
    ve = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, children: r, fragment: i } = e;
            return i
                ? N.createPortal(
                      (0, R.jsx)(ye, {
                          scope: n,
                          children: (0, R.jsx)(G.Slot, {
                              scope: n,
                              children: (0, R.jsx)(`div`, {
                                  ref: t,
                                  children: r,
                              }),
                          }),
                      }),
                      i,
                  )
                : null;
        }, `SelectContentFragment`),
    ),
    Z = 10,
    [ye, Q] = J(X),
    be = f(`SelectContent.RemoveScroll`),
    xe = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n } = e,
                {
                    position: r = V.ItemAligned,
                    onCloseAutoFocus: i,
                    onEscapeKeyDown: a,
                    onPointerDownOutside: o,
                    side: c,
                    sideOffset: l,
                    align: u,
                    alignOffset: d,
                    arrowPadding: f,
                    collisionBoundary: m,
                    collisionPadding: g,
                    sticky: _,
                    hideWhenDetached: S,
                    avoidCollisions: C,
                    ...w
                } = e,
                T = Y(X, n),
                [E, D] = M.useState(null),
                [O, ee] = M.useState(null),
                k = p(t, D),
                [A, j] = M.useState(null),
                [N, P] = M.useState(null),
                F = K(n),
                [I, L] = M.useState(!1),
                z = M.useRef(!1),
                H = M.useRef(!1),
                te = M.useRef(!1);
            (M.useEffect(() => {
                if (E) return x(E);
            }, [E]),
                b());
            let U = M.useCallback(
                    (e) => {
                        let [t, ...n] = F().map((e) => e.ref.current),
                            [r] = n.slice(-1),
                            i = document.activeElement;
                        for (let n of e)
                            if (
                                n === i ||
                                (n?.scrollIntoView({ block: `nearest` }),
                                n === t && O && (O.scrollTop = 0),
                                n === r && O && (O.scrollTop = O.scrollHeight),
                                n?.focus(),
                                document.activeElement !== i)
                            )
                                return;
                    },
                    [F, O],
                ),
                W = M.useCallback(() => U([A, E]), [U, A, E]);
            M.useEffect(() => {
                I && W();
            }, [I, W]);
            let { onOpenChange: G, triggerPointerDownPosRef: q } = T;
            (M.useEffect(() => {
                if (E) {
                    let e = { x: 0, y: 0 },
                        t = B((t) => {
                            e = {
                                x: Math.abs(
                                    Math.round(t.pageX) - (q.current?.x ?? 0),
                                ),
                                y: Math.abs(
                                    Math.round(t.pageY) - (q.current?.y ?? 0),
                                ),
                            };
                        }, `handlePointerMove`),
                        n = B((n) => {
                            (e.x <= 10 && e.y <= 10
                                ? n.preventDefault()
                                : n.composedPath().includes(E) || G(!1),
                                document.removeEventListener(`pointermove`, t),
                                (q.current = null));
                        }, `handlePointerUp`);
                    return (
                        q.current !== null &&
                            (document.addEventListener(`pointermove`, t),
                            document.addEventListener(`pointerup`, n, {
                                capture: !0,
                                once: !0,
                            })),
                        () => {
                            (document.removeEventListener(`pointermove`, t),
                                document.removeEventListener(`pointerup`, n, {
                                    capture: !0,
                                }));
                        }
                    );
                }
            }, [E, G, q]),
                M.useEffect(() => {
                    let e = B(() => G(!1), `close`);
                    return (
                        window.addEventListener(`blur`, e),
                        window.addEventListener(`resize`, e),
                        () => {
                            (window.removeEventListener(`blur`, e),
                                window.removeEventListener(`resize`, e));
                        }
                    );
                }, [G]));
            let [J, ne] = Ke((e) => {
                    let t = F().filter((e) => !e.disabled),
                        n = qe(
                            t,
                            e,
                            t.find(
                                (e) => e.ref.current === document.activeElement,
                            ),
                        );
                    n && setTimeout(() => n.ref.current?.focus());
                }),
                re = M.useCallback(
                    (e, t, n) => {
                        let r = !H.current;
                        r && (H.current = !0);
                        let i = !z.current && !n;
                        (T.value !== void 0 && T.value === t) || i
                            ? (j(e), i && (z.current = !0))
                            : r && j(e);
                    },
                    [T.value],
                ),
                ie = M.useCallback(() => E?.focus(), [E]),
                ae = M.useCallback(
                    (e, t, n) => {
                        if (!e) return;
                        let r = !te.current;
                        r && (te.current = !0);
                        let i = !z.current && !n;
                        ((T.value !== void 0 && T.value === t) || i || r) &&
                            P(e);
                    },
                    [T.value],
                ),
                oe = r === V.Popper ? Ce : Se,
                se =
                    oe === Ce
                        ? {
                              side: c,
                              sideOffset: l,
                              align: u,
                              alignOffset: d,
                              arrowPadding: f,
                              collisionBoundary: m,
                              collisionPadding: g,
                              sticky: _,
                              hideWhenDetached: S,
                              avoidCollisions: C,
                          }
                        : {};
            return (0, R.jsx)(ye, {
                scope: n,
                content: E,
                viewport: O,
                onViewportChange: ee,
                itemRefCallback: re,
                selectedItem: A,
                onItemLeave: ie,
                itemTextRefCallback: ae,
                focusSelectedItem: W,
                selectedItemText: N,
                position: r,
                isPositioned: I,
                searchRef: J,
                children: (0, R.jsx)(y, {
                    as: be,
                    allowPinchZoom: !0,
                    children: (0, R.jsx)(h, {
                        asChild: !0,
                        trapped: T.open,
                        onMountAutoFocus: (e) => {
                            e.preventDefault();
                        },
                        onUnmountAutoFocus: s(i, (e) => {
                            (T.trigger?.focus({ preventScroll: !0 }),
                                e.preventDefault());
                        }),
                        children: (0, R.jsx)(v, {
                            asChild: !0,
                            disableOutsidePointerEvents: !0,
                            onEscapeKeyDown: a,
                            onPointerDownOutside: o,
                            onFocusOutside: (e) => e.preventDefault(),
                            onDismiss: () => T.onOpenChange(!1),
                            children: (0, R.jsx)(oe, {
                                role: `listbox`,
                                id: T.contentId,
                                'data-state': T.open ? `open` : `closed`,
                                dir: T.dir,
                                onContextMenu: (e) => e.preventDefault(),
                                ...w,
                                ...se,
                                onPlaced: () => L(!0),
                                ref: k,
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    outline: `none`,
                                    ...w.style,
                                },
                                onKeyDown: s(w.onKeyDown, (e) => {
                                    let t = e.ctrlKey || e.altKey || e.metaKey;
                                    if (
                                        (e.key === `Tab` && e.preventDefault(),
                                        !t && e.key.length === 1 && ne(e.key),
                                        [
                                            `ArrowUp`,
                                            `ArrowDown`,
                                            `Home`,
                                            `End`,
                                        ].includes(e.key))
                                    ) {
                                        let t = F()
                                            .filter((e) => !e.disabled)
                                            .map((e) => e.ref.current);
                                        if (
                                            ([`ArrowUp`, `End`].includes(
                                                e.key,
                                            ) && (t = t.slice().reverse()),
                                            [`ArrowUp`, `ArrowDown`].includes(
                                                e.key,
                                            ))
                                        ) {
                                            let n = e.target,
                                                r = t.indexOf(n);
                                            t = t.slice(r + 1);
                                        }
                                        (setTimeout(() => U(t)),
                                            e.preventDefault());
                                    }
                                }),
                            }),
                        }),
                    }),
                }),
            });
        }, `SelectContentImpl`),
    ),
    Se = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, onPlaced: r, ...i } = e,
                a = Y(X, n),
                o = Q(X, n),
                [s, c] = M.useState(null),
                [l, d] = M.useState(null),
                f = p(t, d),
                h = K(n),
                g = M.useRef(!1),
                _ = M.useRef(!0),
                {
                    viewport: v,
                    selectedItem: y,
                    selectedItemText: b,
                    focusSelectedItem: x,
                } = o,
                S = M.useCallback(() => {
                    if (a.trigger && a.valueNode && s && l && v && y && b) {
                        let e = a.trigger.getBoundingClientRect(),
                            t = l.getBoundingClientRect(),
                            n = a.valueNode.getBoundingClientRect(),
                            i = b.getBoundingClientRect();
                        if (a.dir !== H.RTL) {
                            let r = i.left - t.left,
                                a = n.left - r,
                                o = e.left - a,
                                c = e.width + o,
                                l = Math.max(c, t.width),
                                u = window.innerWidth - Z,
                                d = L(a, [Z, Math.max(Z, u - l)]);
                            ((s.style.minWidth = c + `px`),
                                (s.style.left = d + `px`));
                        } else {
                            let r = t.right - i.right,
                                a = window.innerWidth - n.right - r,
                                o = window.innerWidth - e.right - a,
                                c = e.width + o,
                                l = Math.max(c, t.width),
                                u = window.innerWidth - Z,
                                d = L(a, [Z, Math.max(Z, u - l)]);
                            ((s.style.minWidth = c + `px`),
                                (s.style.right = d + `px`));
                        }
                        let o = h(),
                            c = window.innerHeight - Z * 2,
                            u = v.scrollHeight,
                            d = window.getComputedStyle(l),
                            f = parseInt(d.borderTopWidth, 10),
                            p = parseInt(d.paddingTop, 10),
                            m = parseInt(d.borderBottomWidth, 10),
                            _ = parseInt(d.paddingBottom, 10),
                            x = f + p + u + _ + m,
                            S = Math.min(y.offsetHeight * 5, x),
                            C = window.getComputedStyle(v),
                            w = parseInt(C.paddingTop, 10),
                            T = parseInt(C.paddingBottom, 10),
                            E = e.top + e.height / 2 - Z,
                            D = c - E,
                            O = y.offsetHeight / 2,
                            ee = y.offsetTop + O,
                            k = f + p + ee,
                            A = x - k;
                        if (k <= E) {
                            let e =
                                o.length > 0 &&
                                y === o[o.length - 1].ref.current;
                            s.style.bottom = `0px`;
                            let t =
                                    l.clientHeight -
                                    v.offsetTop -
                                    v.offsetHeight,
                                n = k + Math.max(D, O + (e ? T : 0) + t + m);
                            s.style.height = n + `px`;
                        } else {
                            let e = o.length > 0 && y === o[0].ref.current;
                            s.style.top = `0px`;
                            let t =
                                Math.max(E, f + v.offsetTop + (e ? w : 0) + O) +
                                A;
                            ((s.style.height = t + `px`),
                                (v.scrollTop = k - E + v.offsetTop));
                        }
                        ((s.style.margin = `${Z}px 0`),
                            (s.style.minHeight = S + `px`),
                            (s.style.maxHeight = c + `px`),
                            r?.(),
                            requestAnimationFrame(() => (g.current = !0)));
                    }
                }, [h, a.trigger, a.valueNode, s, l, v, y, b, a.dir, r]);
            u(() => S(), [S]);
            let [C, w] = M.useState();
            u(() => {
                l && w(window.getComputedStyle(l).zIndex);
            }, [l]);
            let T = M.useCallback(
                (e) => {
                    e && _.current === !0 && (S(), x?.(), (_.current = !1));
                },
                [S, x],
            );
            return (0, R.jsx)(we, {
                scope: n,
                contentWrapper: s,
                shouldExpandOnScrollRef: g,
                onScrollButtonChange: T,
                children: (0, R.jsx)(`div`, {
                    ref: c,
                    style: {
                        display: `flex`,
                        flexDirection: `column`,
                        position: `fixed`,
                        zIndex: C,
                    },
                    children: (0, R.jsx)(m.div, {
                        ...i,
                        ref: f,
                        style: {
                            boxSizing: `border-box`,
                            maxHeight: `100%`,
                            ...i.style,
                        },
                    }),
                }),
            });
        }, `SelectItemAlignedPosition`),
    ),
    Ce = M.forwardRef(
        B(function (e, t) {
            let {
                    __scopeSelect: n,
                    align: r = `start`,
                    collisionPadding: i = Z,
                    ...a
                } = e,
                o = re(n);
            return (0, R.jsx)(A, {
                ...o,
                ...a,
                ref: t,
                align: r,
                collisionPadding: i,
                style: {
                    boxSizing: `border-box`,
                    ...a.style,
                    '--radix-select-content-transform-origin': `var(--radix-popper-transform-origin)`,
                    '--radix-select-content-available-width': `var(--radix-popper-available-width)`,
                    '--radix-select-content-available-height': `var(--radix-popper-available-height)`,
                    '--radix-select-trigger-width': `var(--radix-popper-anchor-width)`,
                    '--radix-select-trigger-height': `var(--radix-popper-anchor-height)`,
                },
            });
        }, `SelectPopperPosition`),
    ),
    [we, Te] = J(X, {}),
    Ee = `SelectViewport`,
    De = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, nonce: r, ...i } = e,
                a = Q(Ee, n),
                o = Te(Ee, n),
                c = p(t, a.onViewportChange),
                l = M.useRef(0);
            return (0, R.jsxs)(R.Fragment, {
                children: [
                    (0, R.jsx)(`style`, {
                        dangerouslySetInnerHTML: {
                            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`,
                        },
                        nonce: r,
                    }),
                    (0, R.jsx)(G.Slot, {
                        scope: n,
                        children: (0, R.jsx)(m.div, {
                            'data-radix-select-viewport': ``,
                            role: `presentation`,
                            ...i,
                            ref: c,
                            style: {
                                position: `relative`,
                                flex: 1,
                                overflow: `hidden auto`,
                                ...i.style,
                            },
                            onScroll: s(i.onScroll, (e) => {
                                let t = e.currentTarget,
                                    {
                                        contentWrapper: n,
                                        shouldExpandOnScrollRef: r,
                                    } = o;
                                if (r?.current && n) {
                                    let e = Math.abs(l.current - t.scrollTop);
                                    if (e > 0) {
                                        let r = window.innerHeight - Z * 2,
                                            i = parseFloat(n.style.minHeight),
                                            a = parseFloat(n.style.height),
                                            o = Math.max(i, a);
                                        if (o < r) {
                                            let i = o + e,
                                                a = Math.min(r, i),
                                                s = i - a;
                                            ((n.style.height = a + `px`),
                                                n.style.bottom === `0px` &&
                                                    ((t.scrollTop =
                                                        s > 0 ? s : 0),
                                                    (n.style.justifyContent = `flex-end`)));
                                        }
                                    }
                                }
                                l.current = t.scrollTop;
                            }),
                        }),
                    }),
                ],
            });
        }, `SelectViewport`),
    ),
    [Oe, ke] = J(`SelectGroup`),
    Ae = `SelectItem`,
    [je, Me] = J(Ae),
    Ne = M.forwardRef(
        B(function (e, t) {
            let {
                    __scopeSelect: n,
                    value: r,
                    disabled: i = !1,
                    textValue: a,
                    ...o
                } = e,
                c = Y(Ae, n),
                l = Q(Ae, n),
                u = c.value === r,
                [d, f] = M.useState(a ?? ``),
                [h, _] = M.useState(!1),
                v = g((e) => l.itemRefCallback?.(e, r, i)),
                y = p(t, v),
                b = S(),
                x = M.useRef(`touch`);
            function C(e) {
                ((c.hasConsumerStoppedPropagationRef.current =
                    e.isPropagationStopped()),
                    c.onUserSelect(r),
                    c.onOpenChange(!1));
            }
            return (
                B(C, `handleSelect`),
                (0, R.jsx)(je, {
                    scope: n,
                    value: r,
                    disabled: i,
                    textId: b,
                    isSelected: u,
                    onItemTextChange: M.useCallback((e) => {
                        f((t) => t || (e?.textContent ?? ``).trim());
                    }, []),
                    children: (0, R.jsx)(G.ItemSlot, {
                        scope: n,
                        value: r,
                        disabled: i,
                        textValue: d,
                        children: (0, R.jsx)(m.div, {
                            role: `option`,
                            'aria-labelledby': b,
                            'data-highlighted': h ? `` : void 0,
                            'aria-selected': u && h,
                            'data-state': u ? `checked` : `unchecked`,
                            'aria-disabled': i || void 0,
                            'data-disabled': i ? `` : void 0,
                            tabIndex: i ? void 0 : -1,
                            ...o,
                            ref: y,
                            onFocus: s(o.onFocus, () => _(!0)),
                            onBlur: s(o.onBlur, () => _(!1)),
                            onClick: s(o.onClick, (e) => {
                                i || (x.current !== `mouse` && C(e));
                            }),
                            onPointerUp: s(o.onPointerUp, (e) => {
                                i || (x.current === `mouse` && C(e));
                            }),
                            onPointerDown: s(o.onPointerDown, (e) => {
                                x.current = e.pointerType;
                            }),
                            onPointerMove: s(o.onPointerMove, (e) => {
                                ((x.current = e.pointerType),
                                    i
                                        ? l.onItemLeave?.()
                                        : x.current === `mouse` &&
                                          e.currentTarget.focus({
                                              preventScroll: !0,
                                          }));
                            }),
                            onPointerLeave: s(o.onPointerLeave, (e) => {
                                e.currentTarget === document.activeElement &&
                                    l.onItemLeave?.();
                            }),
                            onKeyDown: s(o.onKeyDown, (e) => {
                                i ||
                                    e.target !== e.currentTarget ||
                                    ((l.searchRef?.current === `` ||
                                        e.key !== ` `) &&
                                        (U.includes(e.key) && C(e),
                                        e.key === ` ` && e.preventDefault()));
                            }),
                        }),
                    }),
                })
            );
        }, `SelectItem`),
    ),
    Pe = `SelectItemText`,
    Fe = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, className: r, style: i, ...a } = e,
                o = Y(Pe, n),
                s = Q(Pe, n),
                c = Me(Pe, n),
                l = oe(Pe, n),
                [d, f] = M.useState(null),
                h = g((e) => s.itemTextRefCallback?.(e, c.value, c.disabled)),
                _ = p(t, f, c.onItemTextChange, h),
                v = d?.textContent,
                y = M.useMemo(
                    () =>
                        (0, R.jsx)(
                            `option`,
                            {
                                value: c.value,
                                disabled: c.disabled,
                                children: v,
                            },
                            c.value,
                        ),
                    [c.disabled, c.value, v],
                ),
                { onNativeOptionAdd: b, onNativeOptionRemove: x } = l;
            return (
                u(() => (b(y), () => x(y)), [b, x, y]),
                (0, R.jsxs)(R.Fragment, {
                    children: [
                        (0, R.jsx)(m.span, { id: c.textId, ...a, ref: _ }),
                        c.isSelected &&
                        o.valueNode &&
                        !o.valueNodeHasChildren &&
                        !$(o.value)
                            ? N.createPortal(a.children, o.valueNode)
                            : null,
                    ],
                })
            );
        }, `SelectItemText`),
    ),
    Ie = `SelectItemIndicator`,
    Le = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, ...r } = e;
            return Me(Ie, n).isSelected
                ? (0, R.jsx)(m.span, { 'aria-hidden': !0, ...r, ref: t })
                : null;
        }, `SelectItemIndicator`),
    ),
    Re = `SelectScrollUpButton`,
    ze = M.forwardRef(
        B(function (e, t) {
            let n = Q(Re, e.__scopeSelect),
                r = Te(Re, e.__scopeSelect),
                [i, a] = M.useState(!1),
                o = p(t, r.onScrollButtonChange);
            return (
                u(() => {
                    if (n.viewport && n.isPositioned) {
                        let e = function () {
                            let e = t.scrollTop > 0;
                            a(e);
                        };
                        B(e, `handleScroll`);
                        let t = n.viewport;
                        return (
                            e(),
                            t.addEventListener(`scroll`, e),
                            () => t.removeEventListener(`scroll`, e)
                        );
                    }
                }, [n.viewport, n.isPositioned]),
                i
                    ? (0, R.jsx)(He, {
                          ...e,
                          ref: o,
                          onAutoScroll: () => {
                              let { viewport: e, selectedItem: t } = n;
                              e && t && (e.scrollTop -= t.offsetHeight);
                          },
                      })
                    : null
            );
        }, `SelectScrollUpButton`),
    ),
    Be = `SelectScrollDownButton`,
    Ve = M.forwardRef(
        B(function (e, t) {
            let n = Q(Be, e.__scopeSelect),
                r = Te(Be, e.__scopeSelect),
                [i, a] = M.useState(!1),
                o = p(t, r.onScrollButtonChange);
            return (
                u(() => {
                    if (n.viewport && n.isPositioned) {
                        let e = function () {
                            let e = t.scrollHeight - t.clientHeight,
                                n = Math.ceil(t.scrollTop) < e;
                            a(n);
                        };
                        B(e, `handleScroll`);
                        let t = n.viewport;
                        return (
                            e(),
                            t.addEventListener(`scroll`, e),
                            () => t.removeEventListener(`scroll`, e)
                        );
                    }
                }, [n.viewport, n.isPositioned]),
                i
                    ? (0, R.jsx)(He, {
                          ...e,
                          ref: o,
                          onAutoScroll: () => {
                              let { viewport: e, selectedItem: t } = n;
                              e && t && (e.scrollTop += t.offsetHeight);
                          },
                      })
                    : null
            );
        }, `SelectScrollDownButton`),
    ),
    He = M.forwardRef(
        B(function (e, t) {
            let { __scopeSelect: n, onAutoScroll: r, ...i } = e,
                a = Q(`SelectScrollButton`, n),
                o = M.useRef(null),
                c = K(n),
                l = M.useCallback(() => {
                    o.current !== null &&
                        (window.clearInterval(o.current), (o.current = null));
                }, []);
            return (
                M.useEffect(() => () => l(), [l]),
                u(() => {
                    c()
                        .find((e) => e.ref.current === document.activeElement)
                        ?.ref.current?.scrollIntoView({ block: `nearest` });
                }, [c]),
                (0, R.jsx)(m.div, {
                    'aria-hidden': !0,
                    ...i,
                    ref: t,
                    style: { flexShrink: 0, ...i.style },
                    onPointerDown: s(i.onPointerDown, () => {
                        o.current === null &&
                            (o.current = window.setInterval(r, 50));
                    }),
                    onPointerMove: s(i.onPointerMove, () => {
                        (a.onItemLeave?.(),
                            o.current === null &&
                                (o.current = window.setInterval(r, 50)));
                    }),
                    onPointerLeave: s(i.onPointerLeave, () => {
                        l();
                    }),
                })
            );
        }, `SelectScrollButtonImpl`),
    ),
    Ue = `SelectBubbleInput`,
    We = M.forwardRef(
        B(function ({ __scopeSelect: e, ...t }, n) {
            let r = Y(Ue, e),
                {
                    value: i,
                    onValueChange: a,
                    required: o,
                    disabled: s,
                    name: c,
                    autoComplete: l,
                    form: u,
                    userSelection: d,
                } = r,
                { nativeOptions: f, nativeSelectKey: h } = r,
                g = M.useRef(null),
                _ = p(n, g),
                v = i ?? ``,
                y = M.useRef(v),
                b = M.useRef(d),
                x = M.useRef(!1),
                S = Array.from(f).some((e) => (e.props.value ?? ``) === ``);
            return (
                M.useEffect(() => {
                    let e = g.current;
                    if (!e) return;
                    let t = window.HTMLSelectElement.prototype,
                        n = Object.getOwnPropertyDescriptor(t, `value`).set,
                        r = d !== null && d !== b.current;
                    b.current = d;
                    let i = y.current !== v;
                    y.current = v;
                    let a = r && i;
                    if (
                        r &&
                        !i &&
                        d.value !== v &&
                        !d.hasConsumerStoppedPropagation &&
                        n
                    ) {
                        x.current = !0;
                        try {
                            (n.call(e, d.value),
                                e.dispatchEvent(
                                    new Event(`change`, { bubbles: !0 }),
                                ));
                        } finally {
                            ((x.current = !1), n.call(e, v));
                        }
                        return;
                    }
                    let o = a && !d.hasConsumerStoppedPropagation;
                    if (i && n) {
                        let t = new Event(`change`, { bubbles: o });
                        (n.call(e, v), e.dispatchEvent(t));
                    }
                }, [v, d]),
                (0, R.jsxs)(
                    m.select,
                    {
                        'aria-hidden': !0,
                        required: o,
                        tabIndex: -1,
                        name: c,
                        autoComplete: l,
                        disabled: s,
                        form: u,
                        onChange: (e) => {
                            x.current || a(e.target.value);
                        },
                        ...t,
                        style: { ...D, ...t.style },
                        ref: _,
                        defaultValue: v,
                        children: [
                            $(i) && !S
                                ? (0, R.jsx)(`option`, { value: `` })
                                : null,
                            Array.from(f),
                        ],
                    },
                    h,
                )
            );
        }, `SelectBubbleInput`),
    );
function Ge(e) {
    return typeof e == `function`;
}
B(Ge, `isFunction`);
function $(e) {
    return e === `` || e === void 0;
}
B($, `shouldShowPlaceholder`);
function Ke(e) {
    let t = g(e),
        n = M.useRef(``),
        r = M.useRef(0),
        i = M.useCallback(
            (e) => {
                let i = n.current + e;
                t(i);
                function a(e) {
                    ((n.current = e),
                        window.clearTimeout(r.current),
                        e !== `` &&
                            (r.current = window.setTimeout(() => a(``), 1e3)));
                }
                (B(a, `updateSearch`), a(i));
            },
            [t],
        ),
        a = M.useCallback(() => {
            ((n.current = ``), window.clearTimeout(r.current));
        }, []);
    return (
        M.useEffect(() => () => window.clearTimeout(r.current), []), [n, i, a]
    );
}
B(Ke, `useTypeaheadSearch`);
function qe(e, t, n) {
    let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
        i = n ? e.indexOf(n) : -1,
        a = Je(e, Math.max(i, 0));
    r.length === 1 && (a = a.filter((e) => e !== n));
    let o = a.find((e) =>
        e.textValue.toLowerCase().startsWith(r.toLowerCase()),
    );
    return o === n ? void 0 : o;
}
B(qe, `findNextItem`);
function Je(e, t) {
    return e.map((n, r) => e[(t + r) % e.length]);
}
B(Je, `wrapArray`);
function Ye(e) {
    let t = (0, P.c)(4),
        n;
    t[0] === e ? (n = t[1]) : (({ ...n } = e), (t[0] = e), (t[1] = n));
    let r;
    return (
        t[2] === n
            ? (r = t[3])
            : ((r = (0, R.jsx)(ce, { 'data-slot': `select`, ...n })),
              (t[2] = n),
              (t[3] = r)),
        r
    );
}
function Xe(e) {
    let t = (0, P.c)(4),
        n;
    t[0] === e ? (n = t[1]) : (({ ...n } = e), (t[0] = e), (t[1] = n));
    let r;
    return (
        t[2] === n
            ? (r = t[3])
            : ((r = (0, R.jsx)(fe, { 'data-slot': `select-value`, ...n })),
              (t[2] = n),
              (t[3] = r)),
        r
    );
}
function Ze({ className: e, size: t = `default`, children: n, ...i }) {
    return (0, R.jsxs)(ue, {
        'data-slot': `select-trigger`,
        'data-size': t,
        className: r(
            `border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
            e,
        ),
        ...i,
        children: [
            n,
            (0, R.jsx)(pe, {
                asChild: !0,
                children: (0, R.jsx)(w, { className: `size-4 opacity-50` }),
            }),
        ],
    });
}
function Qe({
    className: e,
    children: t,
    position: n = `popper`,
    side: i = `bottom`,
    sideOffset: a = 4,
    align: o = `center`,
    ...s
}) {
    return (0, R.jsx)(ge, {
        children: (0, R.jsxs)(_e, {
            'data-slot': `select-content`,
            className: r(
                `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md`,
                n === `popper` &&
                    `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
                e,
            ),
            position: n,
            side: i,
            sideOffset: a,
            avoidCollisions: !1,
            align: o,
            ...s,
            children: [
                (0, R.jsx)(et, {}),
                (0, R.jsx)(De, {
                    className: r(
                        `p-1`,
                        n === `popper` &&
                            `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1`,
                    ),
                    children: t,
                }),
                (0, R.jsx)(tt, {}),
            ],
        }),
    });
}
function $e(e) {
    let t = (0, P.c)(13),
        n,
        i,
        a;
    t[0] === e
        ? ((n = t[1]), (i = t[2]), (a = t[3]))
        : (({ className: i, children: n, ...a } = e),
          (t[0] = e),
          (t[1] = n),
          (t[2] = i),
          (t[3] = a));
    let o;
    t[4] === i
        ? (o = t[5])
        : ((o = r(
              `focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`,
              i,
          )),
          (t[4] = i),
          (t[5] = o));
    let s;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = (0, R.jsx)(`span`, {
              'data-slot': `select-item-indicator`,
              className: `absolute right-2 flex size-3.5 items-center justify-center`,
              children: (0, R.jsx)(Le, {
                  children: (0, R.jsx)(C, { className: `size-4` }),
              }),
          })),
          (t[6] = s))
        : (s = t[6]);
    let c;
    t[7] === n
        ? (c = t[8])
        : ((c = (0, R.jsx)(Fe, { children: n })), (t[7] = n), (t[8] = c));
    let l;
    return (
        t[9] !== a || t[10] !== o || t[11] !== c
            ? ((l = (0, R.jsxs)(Ne, {
                  'data-slot': `select-item`,
                  className: o,
                  ...a,
                  children: [s, c],
              })),
              (t[9] = a),
              (t[10] = o),
              (t[11] = c),
              (t[12] = l))
            : (l = t[12]),
        l
    );
}
function et(e) {
    let t = (0, P.c)(9),
        n,
        i;
    t[0] === e
        ? ((n = t[1]), (i = t[2]))
        : (({ className: n, ...i } = e), (t[0] = e), (t[1] = n), (t[2] = i));
    let a;
    t[3] === n
        ? (a = t[4])
        : ((a = r(`flex cursor-default items-center justify-center py-1`, n)),
          (t[3] = n),
          (t[4] = a));
    let o;
    t[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((o = (0, R.jsx)(j, { className: `size-4` })), (t[5] = o))
        : (o = t[5]);
    let s;
    return (
        t[6] !== i || t[7] !== a
            ? ((s = (0, R.jsx)(ze, {
                  'data-slot': `select-scroll-up-button`,
                  className: a,
                  ...i,
                  children: o,
              })),
              (t[6] = i),
              (t[7] = a),
              (t[8] = s))
            : (s = t[8]),
        s
    );
}
function tt(e) {
    let t = (0, P.c)(9),
        n,
        i;
    t[0] === e
        ? ((n = t[1]), (i = t[2]))
        : (({ className: n, ...i } = e), (t[0] = e), (t[1] = n), (t[2] = i));
    let a;
    t[3] === n
        ? (a = t[4])
        : ((a = r(`flex cursor-default items-center justify-center py-1`, n)),
          (t[3] = n),
          (t[4] = a));
    let o;
    t[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((o = (0, R.jsx)(w, { className: `size-4` })), (t[5] = o))
        : (o = t[5]);
    let s;
    return (
        t[6] !== i || t[7] !== a
            ? ((s = (0, R.jsx)(Ve, {
                  'data-slot': `select-scroll-down-button`,
                  className: a,
                  ...i,
                  children: o,
              })),
              (t[6] = i),
              (t[7] = a),
              (t[8] = s))
            : (s = t[8]),
        s
    );
}
export { Xe as a, Ze as i, Qe as n, $e as r, Ye as t };
