const _map = new Map();

export const debounce = (fn, timeout, ...args) => {
  return (...args2) => {
    if (_map.has(fn)) {
      clearTimeout(_map.get(fn));
    }
    _map.set(
      fn,
      setTimeout(() => {
        fn(...args.concat(args2));
        _map.delete(fn);
      }, timeout)
    );
  };
};
