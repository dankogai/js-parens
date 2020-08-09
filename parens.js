//
// parens.js
//
import { S, K, I, U } from './combinators.js';
/**
 * translates parens `src` to JavaScript source code
 * @param {*} src parens source
 */
export const translate = (src) =>
    src.replace(/\(/g, 'U(')
        .replace(/U\(\)/g, 'U(U)')
        .replace(/\)U\(/g, ')(');
/**
* compiles parens `src` to JavaScript function
* @param {*} src parens source
*/
export const compile = (src) => eval(translate(src));
