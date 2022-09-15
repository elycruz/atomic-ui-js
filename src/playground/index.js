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
  restrictToFloatChars = (inValue, fractionsAllowed = true, prevChar) => {
    if (!inValue) return '';

    const _inValue = inValue.toString(),
      _inValueLen = _inValue.length;

    let i = 0,
      hasMinus = false,
      hasDecimalSign = false,
      hasExponent = false,
      hasExponentMinus = false,
      prevCharIsDigit = false,
      _prevChar = prevChar ?? '',
      out = '';

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i],
        isDigit = digitRegex.test(char);
      if (!hasMinus && char === minusSign && (_prevChar === exponentChar || (!_prevChar && !out.length))) {
        hasMinus = true;
        out += char;
        _prevChar = char;
      } else if (fractionsAllowed && !hasDecimalSign && char === decimalSign && (
        !_prevChar || _prevChar === minusSign ||
        _prevChar === plusSign || prevCharIsDigit
      )) {
        hasDecimalSign = true;
        out += decimalSign + restrictToFloatChars(_inValue.slice(i + 1), false, decimalSign);
        i = out.length - 1;
        _prevChar = char;
      } else if (!hasExponent && char === exponentChar && prevCharIsDigit) {
        hasExponent = true;
        out += char;
        _prevChar = char;
      } else if (!hasExponentMinus && char === minusSign && _prevChar === exponentChar) {
        hasExponentMinus = true;
        out += char;
        _prevChar = char;
      } else if (isDigit) {
        out += char;
        prevCharIsDigit = isDigit;
        _prevChar = char;
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
