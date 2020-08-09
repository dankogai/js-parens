//
// unlambda.js
//
import { S, K, I } from './combinators.js';
/**
 * compiles unlambda `src` to JavaScript function
 * @param {*} src unlambda source
 */
export const compile = (src) => (function self(a) {
    if (!a.length) throw 'syntax error';
    return { s: S, k: K, i: I }[a.shift()]
        || self(a)(self(a))
})(src.replace(/[^`ski]/g, '').split(''));
/**
 * translates unlambda `src` to JavaScript source code
 * @param {*} src unlambda source
 */
export const translate = (src) => (function self(a) {
    if (!a.length) return '';
    return { s: 'S', k: 'K', i: 'I' }[a.shift()]
        || `${self(a)}(${self(a)})`
})(src.replace(/[^`ski]/g, '').split(''));
