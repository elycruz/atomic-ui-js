export const constrainNum = (min: number, max: number, x: number): number => {
    if (x < min) {
      return min;
    }
    return x > max ? max : x;
  },

  constrainPointer = constrainNum,

  wrapPointer = (min: number, max: number, x: number): number => {
    if (x < min) {
      return max;
    }
    if (x > max) {
      return min;
    }
    return x;
  },

  resolvePointer = (autoWrap: boolean, min: number, max: number, pointer: number): number => {
    return (autoWrap ? wrapPointer : constrainPointer)(min, max, pointer);
  },

  isPositiveNumber = (n: number): boolean =>
    typeof n === 'number' &&
    !isNaN(n) && n > -0,

  closestPairFromFib = (num: number): [number, number] => {
    if (num <= 0) {
      return [0, 1]
    }
    let a = 0,
      b = 1;
    const out: [number, number] = [a, b];
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

  fib = (start: number, end: number): number[] => {
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
  }

;
