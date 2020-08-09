//
// church.js
//
// cf. http://blog.livedoor.jp/dankogai/archives/51524324.html
//
import { S, K, I, Z } from './combinators.js';
import { compile as ul } from './unlambda.js';
/* boolean */
export const T = ul('k');
export const F = ul('`ki');
export const IF = ul('i');
export const NOT = ul('``s``si`k`ki`kk');
export const AND = ul('``ss`k`k`ki');
export const OR = ul('``si`kk');
/* list */
export const CONS = ul('``s``s`ks``s`kk``s`ks``s`k`sik`kk');
export const CAR = ul('``si`kk')
export const CDR = ul('``si`k`ki');
export const NIL = ul('`kk');
export const NILP = ul('``si`k`k`k`ki');
export const NTH = ul('``s`k`s`k``si`kk``si`k``si`k`ki')
/* num */
export const ZERO = ul('`ki');
export const SUCC = ul('`s``s`ksk')
export const ADD = ul('``si`k`s``s`ksk');
export const MUL = ul('``s`ksk');
export const POW = ul('``s`k`sik');
export const PRED = ul(
    '``s``s`ks``s`k`s`ks``s``s`ks``s`k`s`ks``s`k`s`kk``s``s`ksk`k'
    + '``s`k`s`k`si``s`k`s`kk``s`k`sik`k`kk`k`k`ki');
export const SUB = ul(
    '``s`k`s``si`k``s``s`ks``s`k`s`ks``s``s`ks``s`k`s`ks``s`k`s'
    + '`kk``s``s`ksk`k``s`k`s`k`si``s`k`s`kk``s`k`sik`k`kk`k`k`kik');
// to save call stack, Z (Y for eager evaluation) and others are hand-crafted
// export const Z = f => (x => x(x))(y => f(x => y(y)(x)));
// wrap x and y with function(){} -- see cnfact
export const IFR = p => x => y => IF(p)(x)(y)(I);
export const LSOF = a => Z(CONS(a));   /* (infinite) list with elem. a */
/* n == m for church num. */
export const CNEQ = m => n => NTH(n)(m(CONS(F))(CONS(T)(LSOF(F))));
/* n != m for church num. */
export const CNNE = m => n => NTH(n)(m(CONS(T))(CONS(F)(LSOF(T))));
//
// utilities
//
export const cb2bool = p => p(true)(false);
export const cn2num = n => n(i => i + 1)(0);
export const ary2cl = function self (a) {
    return a.length === 0 ? NIL : CONS(a[0])(self(a.slice(1)));
};
export const cl2ary = (l) => {
    let a = [];
    for (; !cb2bool(NILP(l)); l = CDR(l)) a.push(CAR(l));
    return a;
};
/* special numbers */
export const cn1 = SUCC(ZERO);
export const cn2 = ADD(cn1)(cn1);
export const cn4 = MUL(cn2)(cn2);
export const cn16 = POW(cn2)(cn4);
export const cn256 = POW(cn4)(cn4);
/* numerals up to 255 */
export const cn = (function (a) {
    let i, j, n, m;
    for (j = 0, n = ZERO; j < 16; j++, n = SUCC(n)) {
        for (i = 0, m = ZERO; i < 16; i++, m = SUCC(m)) {
            a[j * 16 + i] = ADD(MUL(cn16)(n))(m);
        }
    };
    return a;
})([]);
/* for lazy-k evaluator */
export const str2cl = function (s) {
    let a = [], i, l;
    for (i = 0, l = s.length; i < l; i++) a.push(cn[s.charCodeAt(i)]);
    return ary2cl(a);
};
export const cl2str = function (l) {
    let a = cl2ary(l), cs = [];
    for (let i = 0, l = a.length; i < l; i++) {
        cs.push(String.fromCharCode(cn2num(a[i])));
    };
    return cs.join('');
};
export const cnfact = Z(
    f => n => IFR(CNEQ(cn1)(n))(i => cn1)(i => MUL(n)(f(PRED(n))))
);
export const clmap = Z(
    F => f => l => IFR(NILP(l))(i => NIL)(i => CONS(f(CAR(l)))(F(f)(CDR(l))))
);
