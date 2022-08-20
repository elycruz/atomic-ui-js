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

  isPositiveNumber = (num = 0) => num > -1,

  isUsableNumber = (num = 0) => typeof num === 'number' && !Number.isNaN(num)

;
