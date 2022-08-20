export const

  log = console.log.bind(console),

  getLogger = ({verbose, debug}) => (...args) => {
    const last = args.length[args.length - 1];
    if (last && (
      (last === '--verbose' && verbose) ||
      (last === '--debug' && debug)
      (last === '--required')
    )) {
      log(...args);
    }
  },

  error = console.log.bind(console),

  peek = (...args) => {
    log(...args);
    return args.pop();
  }

;
