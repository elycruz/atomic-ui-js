// url_test.ts
import {assertEquals} from "https://deno.land/std@0.155.0/testing/asserts.ts";
import {restrictToFloatChars} from './index.js';

Deno.test("#restrictToFloatChars", () => {
  // Rules to test for:
  // - Exponent char is only allowed after digits.
  // - Minus signs are only allowed at index zero or after an exponent character.
  // - Invalidly position 'floating-point' characters are ignored/stripped out (duplicate 'e' chars should be dropped off, etc.).
  // - Extra decimal points should get dropped off.
  [
    [null, ''],
    [undefined, ''],
    ['', ''],
    ['-', '-'],
    ['-.', '-.'],
    ['.-', '.'],
    ['-.e', '-.'],
    ['e-.', '-.'],
    ['.-e', '.'],
    ['-.1e', '-.1e'],
    ['-.1e2', '-.1e2'],
    ['-0.1', '-0.1'],
    ['-0.1e', '-0.1e'],
    ['-0.1e2', '-0.1e2'],
    ['-0.1e2.2', '-0.1e22'],
    ['-0.1e-2.2', '-0.1e-22'],
    ['+0.1e+2.2', '0.1e22'],
    ['-1', '-1'],
    ['0', '0'],
    ['0.', '0.'],
    ['0.1', '0.1'],
    ['1', '1'],
    ['1e.2', '1e2'],
    ['1e2.2', '1e22'],
    ['1e', '1e'],
    ['1e2', '1e2'],
    ['1eee2', '1e2'],
    ['1ee2e2', '1e22'],
    [{toString() { return '99.00'}}, '99.00']
  ]
    .forEach(([arg, expected]) => {
      const rslt = restrictToFloatChars(arg);
      console.log(`restrictToFloatChars(${JSON.stringify(arg)}) === ${JSON.stringify(expected)}`);
      // console.log(rslt);
      assertEquals(rslt, expected);
    });
});
