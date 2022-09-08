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
  closestPairFromFib = (num) => {
    if (num <= 0) {
      return [0, 1];
    }
    let a = 0,
      b = 1;
    const out = [a, b];
    while (a < num) {
      if (b >= num) {
        out[0] = a;
        out[1] = b;
        break;
      }
      a += b;
      b += a;
    }
    return out;
  },
  fib = (start, end) => {
    start = isPositiveNumber(start) ? start : 0;
    end = isPositiveNumber(end) ? end : 1000;
    const out = [],
      fibPair = closestPairFromFib(start);
    let [a, b] = fibPair;
    while (a <= end) {
      out.push(a);
      if (b <= end) {
        out.push(b);
      }
      a = a + b;
      b = a + b;
    }
    return out;
  };
