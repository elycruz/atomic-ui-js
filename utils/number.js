export const constrainNumber = (min = 0, max = 0, num = 0) => {
    if (num < min) return min;
    else if (num > max) return max;
    else return num;
  },

  autoWrapNumber = (min = 0, max = 0, num = 0) => {
    if (num < min) return max;
    else if (num > max) return min;
    else return num;
  },

  isUsableNumber = (num = 0) => typeof num === "number" && !Number.isNaN(num),

  isPositiveNumber = (num = 0) => isUsableNumber(num) && num > -1,

  constrainPointer = constrainNumber,

  wrapPointer = autoWrapNumber,

  resolvePointer = (autoWrap, min, max, pointer) =>
    (autoWrap ? wrapPointer : constrainPointer)(min, max, pointer),

  multiplesOf = (numMultiples, multiplicand, ) => {
    const out = [];
    for (let i = 1; i < numMultiples; i += 1) {
      out.push(i * multiplicand);
    }
    return out;
  },

  factorsOf = x => {
    if (!x) throw new Error('`x` must not be equal to `0`');
    const out = [];
    for (let i = 1; i <= x; i += 1) {
      const rslt = x % i;
      if (rslt === 0) out.push(i);
    }
    return out;
  },

  fib = end => {
    const out = [];
    let a = 0, b = 1;
    while (a <= end) {
      a = a + b;
      b = a + b;
      if (a <= end) out.push(a);
      if (b <= end) out.push(b);
    }
    return out;
  };
