export const

  toAssocStrAndCharCodeTotalsList = (xs) => {
    return xs.map(str => [
      str,
      str.split('')
        .reduce((agg, c) => agg + c.charCodeAt(0), 0)
    ]);
  },

  toSortMultiplier = x => x === -1 || x === 1 ? x : 0,

  sortStringsByCharCodeTotals = (strs, dirMultiplier = -1) => {
    const multiplier = toSortMultiplier(dirMultiplier);
    return toAssocStrAndCharCodeTotalsList(strs)
      .sort(([_, total1], [__, total2]) => {
        if (total1 > total2) {
          return 1 * multiplier;
        }
        return total1 < total2 ? -1 * multiplier : 0;
      })
      .map(([xs]) => xs)
  },

  ucaseFirst = s => !s ? s : s[0].toUpperCase() + s.substring(1),

  camelCase = s => !s ? s : s.split(/^[a-z]/i).map(ucaseFirst).join('')

  ;
