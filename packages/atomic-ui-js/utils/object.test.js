import { isNullable } from './object';
import { expect, describe, it } from 'vitest';

describe('#isNullable', () => {
  [
    [null, true],
    [undefined, true],
    [0, false],
    ['', false],
    [false, false],
    [NaN, false],
    [{}, false],
    [{ a: 1 }, false],
  ].forEach(([control, expected]) => {
    it(`isNullable(${control}) === ${expected}`, () => {
      expect(isNullable(control)).toEqual(expected);
    });
  });
});
