import {restrictToFloatPointStr} from "../../src/utils/string/restrictToFloatPointStr.js";

import './number-input-live-format.js';

const restrictToFloatChars = (inValue) => {
    if (!inValue) return '';
    return restrictToFloatPointStr(inValue.toString()).out;
  },

  closestMultiple = (multiple, target) => {
    if (multiple > target) return multiple;
    let out = target + (multiple / 2);

    out = out - (out % multiple);
    return out;
  }
;

export {restrictToFloatChars};
