import './number-input-live-format.js';

const minusSign = '-',
  plusSign = '+',
  decimalSign = '.',
  exponentChar = 'e',
  emptyStr = '',


  decimalWithRHS = /\.\d/,
  digitRegex = /^\d$/,
  digitOrERegex = /\de/i,

  convert = inValue => {
    const out = Number(inValue);
    return isNaN(out) ? parseFloat(inValue) : out;
  },

  parseNumber = inValue => {
    if (!inValue) return NaN;

    let _inValue = inValue.toString(),
      _inValueLen = _inValue.length,
      i = 0,
      value = 1,
      divisor = 1,
      exponent = 1,
      out = '';

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i];
      if (char === minusSign) {
        value =
          divisor = -1;
        continue;
      }
      if (char === plusSign) continue;
      // If `char` is a decimal and next char is a digit parse 'fractional' part
      if (char === decimalSign || !digitRegex.test(char)) {
        return NaN;
      } else {
        out += char;
      }
    }

    return Number(out);
  },

  parseFloat1 = (inValue) => {
    if (!inValue) return NaN;

    let _inValue = inValue.toString().trim(),
      _inValueLen = _inValue.length,
      i = 0,
      value = 1,
      divisor = 1,
      exponent = 1,
      out = '';

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i];
      if (char === minusSign) {
        value =
          divisor = -1;
        continue;
      }
      if (char === plusSign) continue;
      if (!digitRegex.test(char)) {
        break;
      } else {
        out += char;
      }
    }

    return Number(out);
  },

  closestMultiple = (multiple, target) => {
    if (multiple > target) return multiple;
    let out = target + (multiple / 2);

    out = out - (out % multiple);
    return out;
  }/*,

  isCharAllowed = (chars, char) => {
    if (!chars && char === exponentChar) return false;
    if (!chars && (!char || char === minusSign || char === plusSign)) return true;


    let _inValue = char.toString(),
      _inValueLen = _inValue.length,
      i = 0,
      out = '';

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i];
      if (char === minusSign && ) {
      }
      if (char === plusSign) continue;
    }
  }*/
;

export {parseFloat1, parseNumber};
