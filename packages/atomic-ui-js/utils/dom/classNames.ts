export const classNames = (...args: any[]): string => {
  if (!args.length) {
    return '';
  }
  return (
    args.reduce((agg, x) => {
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
          return `${agg} ${Object.keys(x as object)
            .filter(x1 => Boolean((x as object)[x1]))
            .join(' ')}`;
      }
    }, '') as string
  ).trim();
};
