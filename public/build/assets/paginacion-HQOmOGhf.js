import { c as e, d as t, i as n, s as r } from './wayfinder-C8dNLrFV.js';
var i = e(),
    a = r();
function o(e) {
    let t = (0, i.c)(11),
        { paginado: n, etiqueta: r } = e;
    if (n.total === 0) return null;
    let o = n.from ?? 0,
        c = n.to ?? 0,
        l;
    t[0] !== r || t[1] !== n.total || t[2] !== o || t[3] !== c
        ? ((l = (0, a.jsxs)(`p`, {
              className: `text-sm text-muted-foreground`,
              children: [`Mostrando `, o, `–`, c, ` de`, ` `, n.total, ` `, r],
          })),
          (t[0] = r),
          (t[1] = n.total),
          (t[2] = o),
          (t[3] = c),
          (t[4] = l))
        : (l = t[4]);
    let u;
    t[5] !== n.last_page || t[6] !== n.links
        ? ((u =
              n.last_page > 1 &&
              (0, a.jsx)(`nav`, {
                  className: `flex flex-wrap gap-1`,
                  'aria-label': `Paginación`,
                  children: n.links.map(s),
              })),
          (t[5] = n.last_page),
          (t[6] = n.links),
          (t[7] = u))
        : (u = t[7]);
    let d;
    return (
        t[8] !== l || t[9] !== u
            ? ((d = (0, a.jsxs)(`div`, {
                  className: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`,
                  children: [l, u],
              })),
              (t[8] = l),
              (t[9] = u),
              (t[10] = d))
            : (d = t[10]),
        d
    );
}
function s(e, r) {
    return e.url === null
        ? (0, a.jsx)(
              `span`,
              {
                  className: `rounded-md px-3 py-1.5 text-sm text-muted-foreground`,
                  dangerouslySetInnerHTML: { __html: e.label },
              },
              `${e.label}-${r}`,
          )
        : (0, a.jsx)(
              t,
              {
                  href: e.url,
                  preserveScroll: !0,
                  preserveState: !0,
                  className: n(
                      `rounded-md px-3 py-1.5 text-sm transition-colors`,
                      e.active
                          ? `bg-primary text-primary-foreground`
                          : `hover:bg-accent hover:text-accent-foreground`,
                  ),
                  dangerouslySetInnerHTML: { __html: e.label },
              },
              `${e.label}-${r}`,
          );
}
export { o as t };
