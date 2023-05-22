const _map = new Map();

export const debounce = (fn, timeout, ...args) => {
  return () => {
    if (_map.has(fn)) {
      clearTimeout(_map.get(fn));
    }
    _map.set(
      fn,
      setTimeout(() => {
        fn(...args);
        _map.delete(fn);
      }, timeout),
    );
  };
};
