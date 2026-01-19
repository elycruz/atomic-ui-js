export const { error, log, warn } = console,
  peek = (...args: any[]) => {
    log.apply(args);
    return args.pop();
  };
