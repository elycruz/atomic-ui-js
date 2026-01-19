import { isNullable } from './object.js';
import { expect, describe, it } from 'vitest';

describe('#isNullable', () => {
  (
    [
      [null, true],
      [undefined, true],
      [0, false],
      ['', false],
      [false, false],
      [NaN, false],
      [{}, false],
      [{ a: 1 }, false],
    ] as [any, boolean][]
  ).forEach(([control, expected]) => {
    it(`isNullable(${control}) === ${expected}`, () => {
      expect(isNullable(control)).toEqual(expected);
    });
  });
});
