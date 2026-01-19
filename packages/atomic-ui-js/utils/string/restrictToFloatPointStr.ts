interface RestrictToFloatCharsOptions {
  flags: number;
  out?: string;

  // Internal:
  lastIndex?: number;
  prevChar?: string;
}

const digitRegex = /\d/,
  minusSign = '-',
  plusSign = '+',
  decimalSign = '.',
  exponentChar = 'e',
  RestrictToFloatCharsEnums = {
    HasMinus: 0b000001,
    HasExponent: 0b000010,
    HasDecimal: 0b000100,
    FractionsAllowed: 0b001000,
    IsPrevCharADigit: 0b010000,
    HasExponentMinus: 0b100000,
  },
  {
    HasMinus,
    HasExponent,
    HasExponentMinus,
    HasDecimal,
    FractionsAllowed,
    IsPrevCharADigit,
  } = RestrictToFloatCharsEnums,
  /**
   * @param {string} inValue
   * @param [options={flags: number, lastIndex: number, prevChar: string, out: string}]
   * @returns {{flags: number, lastIndex: number, prevChar: string, out: string}} -
   *  `flags` is a `RestrictToFloatCharsEnum` sum.
   * @private
   */
  restrictToFloatPointStr = (
    inValue?: string | number,
    options: RestrictToFloatCharsOptions = {
      prevChar: '',
      flags: FractionsAllowed,
      lastIndex: 0,
      out: '',
    }
  ) => {
    let {
      flags,
      // eslint-disable-next-line prefer-const
      lastIndex,
      prevChar = '',
      out = '',
    } = options;

    if (!inValue) return { flags, lastIndex, prevChar, out };

    const _inValue = inValue.toString(),
      _inValueLen = _inValue.length;

    let i = 0;

    for (; i < _inValueLen; i += 1) {
      const char = _inValue[i],
        isDigit = digitRegex.test(char),
        fractionsAllowed = flags & FractionsAllowed,
        hasMinus = flags & HasMinus,
        hasExponent = flags & HasExponent,
        hasDecimalSign = flags & HasDecimal,
        prevCharIsDigit = flags & IsPrevCharADigit,
        hasExponentMinus = flags & HasExponentMinus;

      if (
        !hasMinus &&
        char === minusSign &&
        (prevChar === exponentChar || (!prevChar && !out.length))
      ) {
        flags = flags | HasMinus; // `SUM` op.
        out += char;
        prevChar = char;
      } else if (
        !hasExponent &&
        fractionsAllowed &&
        !hasDecimalSign &&
        char === decimalSign &&
        (!prevChar ||
          prevChar === minusSign ||
          prevChar === plusSign ||
          prevCharIsDigit)
      ) {
        flags = flags | HasDecimal;
        prevChar = char;

        const {
          out: _out,
          flags: _flags,
          lastIndex = 0,
          prevChar: _prevChar,
        } = restrictToFloatPointStr(_inValue.slice(i + 1), {
          flags,
          prevChar,
          lastIndex: i,
        });

        out += decimalSign + _out;
        i = i + lastIndex;
        prevChar = _prevChar;
        flags = flags | _flags;
      } else if (!hasExponent && char === exponentChar && prevCharIsDigit) {
        flags = flags | HasExponent;
        out += char;
        prevChar = char;
      } else if (
        !hasExponentMinus &&
        char === minusSign &&
        prevChar === exponentChar
      ) {
        flags = flags | HasExponentMinus;
        out += char;
        prevChar = char;
      } else if (isDigit) {
        out += char;
        prevChar = char;
      }
      flags = isDigit
        ? flags | IsPrevCharADigit // Add flag
        : flags & ~IsPrevCharADigit; // Remove flag
    }

    return {
      flags,
      lastIndex: i,
      prevChar,
      out,
    };
  };

export { restrictToFloatPointStr };
