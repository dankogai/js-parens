//
// ski.js
//
export const S = x => y => z => x(z)(y(z));
export const K = x => y => x;
export const I = x => x;
export const U = x => x(S)(K);