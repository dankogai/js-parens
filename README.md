# js-parens

the [()] language in JavaScript. Plus {[unlambda],[iota],[jot]} implementations, [combinator logics] and [lambda calculi].

[()]: https://esolangs.org/wiki/()
[unlambda]: https://esolangs.org/wiki/Unlambda
[iota]: https://esolangs.org/wiki/Iota
[jot]: https://esolangs.org/wiki/Jot
[combinator logics]: https://en.wikipedia.org/wiki/Combinatory_logic
[lambda calculi]: https://en.wikipedia.org/wiki/Lambda_calculus

## Synopsis

```javascript
import {
  combinators, church, iota, jot, parens, unlambda 
} from './index.js';
// They all compile to the identity function,
// or the I combinator,
// or 1 in church numeral
   parens.compile('()'                  )(n => n+1)(0); // 1
     iota.compile('*ii'                 )(n => n+1)(0); // 1
      jot.compile('11111110001110011100')(n => n+1)(0); // 1
unlambda.compile('``skk'                )(n => n+1)(0); // 1
                            combinators.I(n => n+1)(0); // 1
```
