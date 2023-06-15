export const classNames = (...args) => {
  if (!args.length) {
    return '';
  }
  return args.reduce((agg, x) => {
    if (!x) {
      return agg;
    }
    switch (typeof x) {
    case 'number':
      if (isNaN(x)) {
        return agg;
      }
      return `${agg} ${x}`;
    case 'string':
      return `${agg} ${x}`;
    case 'object':
    default:
      return `${agg} ${
        Object.keys(x)
          .filter((x1) => Boolean(x[x1]))
          .join(' ')
      }`;
    }
  }, '').trim();
};
