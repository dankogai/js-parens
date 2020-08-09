//
// jot.js
//
import { S, K, I, U, B } from './combinators.js';
/**
 * compile jot `src` to JavaScript function
 * @param {*} src 
 */
export const compile = (src) => {
    return (function self(a, v) {
        return !a.length ? v : a.shift() === '0' ? self(a, U(v)) : self(a, B(v))
    })(src.replace(/[^01]/g, '').split(''), I);
};
