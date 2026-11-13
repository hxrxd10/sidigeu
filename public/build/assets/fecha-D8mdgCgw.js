var e = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/;
function t(t) {
    if (!t) return ``;
    let n = e.exec(t);
    return n ? `${n[3]}-${n[2]}-${n[1]}` : t;
}
function n(t) {
    if (!t) return ``;
    let n = e.exec(t);
    if (!n) return t;
    let r = `${n[3]}-${n[2]}-${n[1]}`;
    return n[4] ? `${r} ${n[4]}:${n[5]}` : r;
}
export { t as n, n as t };
