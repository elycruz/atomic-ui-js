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
  isUsableNumber = (num = 0) => typeof num === 'number' && !Number.isNaN(num),
  isPositiveNumber = (num = 0) => isUsableNumber(num) && num > -1,
  constrainPointer = constrainNumber,
  wrapPointer = autoWrapNumber,
  resolvePointer = (autoWrap, min, max, pointer) =>
    (autoWrap ? wrapPointer : constrainPointer)(min, max, pointer),
  multiplesOf = (multiplicand, numMultiples) => {
    const out = [];

    for (let i = 1; i <= numMultiples; i += 1) {
      out.push(i * multiplicand);
    }
    return out;
  },
  factorsOf = x => {
    if (!x) throw new Error('`x` must not be equal to `0` or be falsy');

    const out = [];

    for (let i = 1; i <= x; i += 1) {
      const rslt = x % i;

      if (rslt === 0) out.push(i);
    }
    return out;
  },
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
  toNumberOr = (n, orValue = 0) => {
    const cast = Number(n);

    return isUsableNumber(cast) ? cast : orValue;
  };
