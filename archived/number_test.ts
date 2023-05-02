import {constrainNumber, resolvePointer, wrapPointer} from "../src/utils/number";

describe("#constrainNumber", () => {
  type Args = [number, number, number];
  const min = -5,
    max = 5;
  (<[Args, number][]>range(min + min, max + max)
    .map((x) => {
      let expected = x;
      if (x >= max) {
        expected = max;
      } else if (x <= min) {
        expected = min;
      }
      return [[min, max, x], expected];
    }))
    .forEach(([args, expected]) => {
      it(`constrainNumber(${args.join(", ")}) === ${expected}`, () => {
        const result = constrainNumber.apply(null, args);
        expect(result).toEqual(expected);
      });
    });
});

describe("#wrapPointer", () => {
  type Args = [number, number, number];
  const min = -5,
    max = 5;
  (<[Args, number][]>range(min + min, max + max)
    .map((x) => {
      let expected = x;
      if (x < min) {
        expected = max;
      } else if (x > max) {
        expected = min;
      }
      return [[min, max, x], expected];
    }))
    .forEach(([args, expected]) => {
      it(`wrapPointer(${args.join(", ")}) === ${expected}`, () => {
        const result = wrapPointer.apply(null, args);
        expect(result).toEqual(expected);
      });
    });
});

describe("#resolvePointer", () => {
  type Wraps = boolean;
  type Args = [Wraps, number, number, number];
  const min = -5,
    max = 5;
  (<[Args, number][]>[
    [[true, 0, 0, 0], 0],
    [[false, 0, 0, 0], 0],
  ].concat(
    range(min + min, max + max)
      .map((x, i) => {
        const wraps = i % 2 === 0;
        let expected = x;
        if (x < min && wraps) {
          expected = max;
        } else if (x > max && wraps) {
          expected = min;
        } else if (x < min) {
          expected = min;
        } else if (x > max) {
          expected = max;
        }
        return [[wraps, min, max, x], expected];
      }),
  ))
    .forEach(([args, expected]) => {
      it(`resolvePointer(${args.join(", ")}) === ${expected}`, () => {
        const result = resolvePointer.apply(null, args);
        expect(result).toEqual(expected);
      });
    });
});
