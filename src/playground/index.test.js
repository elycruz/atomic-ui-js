// url_test.ts
import {assertEquals} from "https://deno.land/std@0.155.0/testing/asserts.ts";
import {parseFloat1, parseNumber} from './index.js';

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
