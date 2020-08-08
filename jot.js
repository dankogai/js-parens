//
// jot.js
//

import { I, U } from './ski.js';

const B = x => y => z => x(y(z));

/**
 * translates jot `src` to JavaScript source code
 * @param {*} src 
 */
export const compile = (src) => {
    return (function self(a, v) {
        return !a.length ? v : a.shift() === '0' ? self(a, U(v)) : self(a, B(v))
    })(src.replace(/[^01]/g, '').split(''), I);
};
