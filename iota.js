//
// iota.js
//
import { U } from './combinators.js';
/**
 * translates iota `src` to JavaScript source code
 * @param {*} src iota source
 */
export const translate = (str) => (function self(a) {
    if (!a.length) throw 'syntax error';
    return a.shift() === 'i'
        ? 'U'
        : `${self(a)}(${self(a)})`;
})(str.replace(/[^\*i]/g, '').split(''));
/**
 * translates iota `src` to JavaScript function
 * @param {*} src iota source
 */
export const compile = (str) => eval(translate(str));
/**
 * translates iota `src` to parens
 * @param {*} src iota source
 */
export const iota2parens = function (str) {
    return translate(str).replace(/[^\(\)]/g, '');
};
