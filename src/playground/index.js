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
      out = '';

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i];
      if ((char === minusSign || char === plusSign) && !i) out += char;
      else if (digitRegex.test(char)) out += char;
      else break;
    }

    return Number(out);
  },

  /**
   * @todo Optimize with bitwise ops (store flags).
   * @param {string} inValue
   * @param [fractionsAllowed=true]
   * @returns {string}
   */
  restrictToFloatChars = (inValue, fractionsAllowed = true) => {
    if (!inValue) return '';

    const _inValue = inValue.toString(),
      _inValueLen = _inValue.length;

    let i = 0,
      hasMinus = false,
      hasDecimalSign = false,
      hasExponent = false,
      hasExponentMinus = false,
      prevCharIsDigit = false,
      prevChar = '',
      out = '';

    if (_inValue[0] === minusSign) {
      prevChar =
        out = minusSign;
      i += 1;
    }

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i],
        isDigit = digitRegex.test(char);
      if (isDigit) {
        out += char;
        prevCharIsDigit = isDigit;
        prevChar = char;
      } else if (!hasMinus && (!i || prevChar === exponentChar)) {
        hasMinus = true;
        out += char;
        prevChar = char;
      } else if (fractionsAllowed && !hasDecimalSign && char === decimalSign && (
        !prevChar || prevChar === minusSign ||
        prevChar === plusSign || prevCharIsDigit
      )) {
        hasDecimalSign = true;
        out += decimalSign + restrictToFloatChars(_inValue.slice(i + 1), false);
        i = out.length - 1;
        prevChar = char;
      } else if (!hasExponent && char === exponentChar && prevCharIsDigit) {
        hasExponent = true;
        out += char;
        prevChar = char;
      } else if (!hasExponentMinus && char === minusSign && prevChar === exponentChar) {
        hasExponentMinus = true;
        out += char;
        prevChar = char;
      }
      prevCharIsDigit = isDigit;
    }

    return out;
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

export {parseFloat1, parseNumber, restrictToFloatChars};
