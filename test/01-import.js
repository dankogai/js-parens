import * as _Module from '../index.js';

describe('import', () => {
    for (const k in _Module) {
      const tn = k === 'version' ? 'string' : 'object';
      it(`${k} is a ${tn}`, () => chai.expect(typeof _Module[k]).to.equal(tn));
    }
  });