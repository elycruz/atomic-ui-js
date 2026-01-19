const _map = new Map<CallableFunction, number>();

export const debounce = <Fn extends (...args: any) => unknown>(
  fn: Fn,
  timeout: number,
  ...args: Parameters<Fn>
) => {
  return (...args2: Parameters<Fn>) => {
    if (_map.has(fn)) {
      clearTimeout(_map.get(fn));
    }
    _map.set(
      fn,
      setTimeout(() => {
        fn(...(args.concat(args2) as Parameters<Fn>));
        _map.delete(fn);
      }, timeout) as unknown as number
    );
  };
};
