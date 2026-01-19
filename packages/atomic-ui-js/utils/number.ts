/**
 * Constrains a number to be within a specified range.
 *
 * @param {number} [min=0] - The minimum value of the range.
 * @param {number} [max=0] - The maximum value of the range.
 * @param {number} [num=0] - The number to constrain.
 *
 * @returns {number} The constrained number within the min-max range.
 *
 * @example
 * constrainNumber(0, 10, 15); // returns 10
 * constrainNumber(0, 10, -5); // returns 0
 * constrainNumber(0, 10, 5);  // returns 5
 */
export const constrainNumber = (min = 0, max = 0, num = 0) => {
    if (num < min) return min;
    else if (num > max) return max;
    else return num;
  },
  /**
   * Wraps a number around the specified range boundaries.
   * If the number exceeds max, it wraps to min. If it's below min, it wraps to max.
   *
   * @param {number} [min=0] - The minimum value of the range.
   * @param {number} [max=0] - The maximum value of the range.
   * @param {number} [num=0] - The number to wrap.
   *
   * @returns {number} The wrapped number, or the original if within range.
   *
   * @example
   * autoWrapNumber(0, 10, 15); // returns 0
   * autoWrapNumber(0, 10, -5); // returns 10
   * autoWrapNumber(0, 10, 5);  // returns 5
   */
  autoWrapNumber = (min = 0, max = 0, num = 0) => {
    if (num < min) return max;
    else if (num > max) return min;
    else return num;
  },
  /**
   * Checks if a value is a usable number (is a number type and not NaN).
   * @param {*} [num=0] - The value to check.
   * @returns {boolean} True if the value is a valid number, false otherwise.
   * @example
   * isUsableNumber(5);      // returns true
   * isUsableNumber(NaN);    // returns false
   * isUsableNumber('5');    // returns false
   */
  isUsableNumber = (num = 0) => typeof num === 'number' && !Number.isNaN(num),
  /**
   * Checks if a value is a positive number (including zero).
   * @param {*} [num=0] - The value to check.
   * @returns {boolean} True if the value is a usable number and greater than or equal to 0.
   * @example
   * isPositiveNumber(5);    // returns true
   * isPositiveNumber(0);    // returns true
   * isPositiveNumber(-5);   // returns false
   */
  isPositiveNumber = (num = 0) => isUsableNumber(num) && num > -1,
  /**
   * Alias for constrainNumber. Constrains a pointer/index to be within a specified range.
   * @type {typeof constrainNumber}
   */
  constrainPointer = constrainNumber,
  /**
   * Alias for autoWrapNumber. Wraps a pointer/index around the specified range boundaries.
   * @type {typeof autoWrapNumber}
   */
  wrapPointer = autoWrapNumber,
  /**
   * Resolves a pointer/index using either wrap or constrain behavior based on the autoWrap flag.
   * @param {boolean} autoWrap - If true, uses wrapPointer; otherwise uses constrainPointer.
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @param {number} pointer - The pointer/index value to resolve.
   * @returns {number} The resolved pointer value.
   * @example
   * resolvePointer(true, 0, 10, 15);  // returns 0 (wraps)
   * resolvePointer(false, 0, 10, 15); // returns 10 (constrains)
   */
  resolvePointer = (autoWrap, min, max, pointer) =>
    (autoWrap ? wrapPointer : constrainPointer)(min, max, pointer),
  /**
   * Generates an array of multiples of a given number.
   * @param {number} multiplicand - The base number to multiply.
   * @param {number} numMultiples - The count of multiples to generate.
   * @returns {number[]} An array containing the first n multiples of the multiplicand.
   * @example
   * multiplesOf(3, 5); // returns [3, 6, 9, 12, 15]
   * multiplesOf(7, 3); // returns [7, 14, 21]
   */
  multiplesOf = (multiplicand, numMultiples) => {
    const out = [];

    for (let i = 1; i <= numMultiples; i += 1) {
      out.push(i * multiplicand);
    }
    return out;
  },
  /**
   * Calculates all factors of a given number.
   *
   * @param {number} x - The number to find factors of. Must not be 0 or falsy.
   * @returns {number[]} - An array of all factors of x.
   *
   * @throws {Error} - If x is 0 or falsy.
   * @example
   * factorsOf(12); // returns [1, 2, 3, 4, 6, 12]
   * factorsOf(7);  // returns [1, 7]
   */
  factorsOf = x => {
    if (!x) throw new Error('`x` must not be equal to `0` or be falsy');

    const out = [];

    for (let i = 1; i <= x; i += 1) {
      const rslt = x % i;

      if (rslt === 0) out.push(i);
    }
    return out;
  },
  /**
   * Finds common factors shared by all provided numbers.
   * @param {...number} args - Two or more numbers to find common factors of.
   * @returns {number[]} An array of common factors. Returns the first argument if less than 2 numbers provided.
   * @example
   * commonFactorsOf(12, 18);     // returns [1, 2, 3, 6]
   * commonFactorsOf(12, 18, 24); // returns [1, 2, 3, 6]
   * commonFactorsOf(7, 13);      // returns [1]
   */
  commonFactorsOf = (...args) => {
    if (args.length < 2) return args[0];

    const out = [1],
      factorSets = args.map(factorsOf),
      len = factorSets.length;

    for (let i = 0; i < len; i += 1) {
      const fs = factorSets[i];

      for (const f of fs) {
        if (f === 1) continue;

        const isCommonFactor = factorSets.every((set, j) =>
          i === j ? true : set.includes(f)
        );

        if (!out.includes(f) && isCommonFactor) out.push(f);
      }
    }

    return out;
  },
  /**
   * Generates Fibonacci numbers up to a specified maximum value.
   * @param {number} end - The maximum value (inclusive) for Fibonacci numbers to generate.
   * @returns {number[]} An array of Fibonacci numbers not exceeding the end value.
   * @example
   * fib(10);  // returns [1, 2, 3, 5, 8]
   * fib(50);  // returns [1, 2, 3, 5, 8, 13, 21, 34]
   */
  fib = end => {
    const out = [];

    let a = 0,
      b = 1;

    while (a <= end) {
      a = a + b;
      b = a + b;
      if (a <= end) out.push(a);
      if (b <= end) out.push(b);
    }
    return out;
  },
  /**
   * Attempts to convert a value to a number, returning a fallback value if conversion fails.
   * @param {*} n - The value to convert to a number.
   * @param {number} [orValue=0] - The fallback value to return if conversion fails.
   * @returns {number} The converted number or the fallback value.
   * @example
   * toNumberOr('42');        // returns 42
   * toNumberOr('abc', 10);   // returns 10
   * toNumberOr(null, -1);    // returns -1
   */
  toNumberOr = (n, orValue = 0) => {
    const cast = Number(n);

    return isUsableNumber(cast) ? cast : orValue;
  };
