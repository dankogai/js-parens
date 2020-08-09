//
// combinators.js
//
export const S = x => y => z => x(z)(y(z));
export const K = x => y => x;
export const I = x => x;
// universal iota combinator ι
export const U = x => x(S)(K);
export const B = x => y => z => x(y(z));
export const C = x => y => z => x(z(y));
export const W = x => y => x(y(y));
// Y for eager evaluation
export const Z = f => (x => x(x))(y => f(x => y(y)(x)));
// cf.
//  https://en.wikipedia.org/wiki/SKI_combinator_calculus
//  https://en.wikipedia.org/wiki/B,_C,_K,_W_system
//  https://en.wikipedia.org/wiki/Iota_and_Jot
//  https://en.wikipedia.org/wiki/Fixed-point_combinator
