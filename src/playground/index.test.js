// url_test.ts
import {assertEquals} from "https://deno.land/std@0.155.0/testing/asserts.ts";
import {parseFloat1, parseNumber, restrictToFloatChars} from './index.js';

Deno.test("#parseNumber", async (t) => {
  const {isNaN} = Number;

  [
    [null, NaN],
    [undefined, NaN],
    ['', NaN],
    ['-', NaN],
    ['-1', -1],
    ['0', 0],
    ['-0', -0],
  ]
    .forEach(([arg, expected]) => {
      const rslt = parseNumber(arg);
      console.log(`parseNumber(${JSON.stringify(arg)}) === ${isNaN(expected) ? 'NaN' : JSON.stringify(expected)}`);
      console.log(rslt);
      if (isNaN(expected)) {
        assertEquals(isNaN(rslt), true);
      } else {
        assertEquals(rslt, expected);
      }
    });
});

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
    ['-1', '-1'],
    ['0', '0'],
    ['0.', '0.'],
    ['0.1', '0.1'],
    ['1', '1'],
    ['1e.2', '1e2'],
    ['1e2.2', '1e2.2'],
    ['1e', '1e'],
    ['1e2', '1e2'],
    ['1eee2', '1e2'],
    ['1ee2e2', '1e22'],
  ]
    .forEach(([arg, expected]) => {
      const rslt = restrictToFloatChars(arg);
      console.log(`restrictToFloatChars(${JSON.stringify(arg)}) === ${JSON.stringify(expected)}`);
      console.log(rslt);
      assertEquals(rslt, expected);
    });
});

// Deno.test("parseFloat1", () => {
//   const {isNaN} = Number;
//
//   [
//     [null, NaN],
//     [undefined, NaN],
//     ['', NaN],
//     ['-', NaN]
//   ]
//     .forEach(([arg, expected]) => {
//       const rslt = parseFloat1(arg);
//
//       if (isNaN(expected)) {
//         assertEquals(isNaN(rslt), true);
//       }
//     });
// });
