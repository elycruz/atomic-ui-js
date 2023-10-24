export const { error, log, warn } = console,

  peek = (...args) => (log(...args), args.pop())

;
