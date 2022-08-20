// @todo Update 'release' and gitUtils implementations to take 'repoRootDir' as a param (
//    this way we don't make an io call for each git command just to get repo's root dir).

import chalk from 'chalk';
import {execAsIo} from "./childProcess";

export const

  git = (...args) =>
    execAsIo('git rev-parse --show-toplevel') // get repo's root dir
      .then(repoRootDir => {
        const command = `git ${args.join(' ')}`;
        console.log(chalk.dim('Running: ', command));
        return execAsIo(command, {cwd: repoRootDir.trim()});
      }),

  gitCheckout = (...args) => git('checkout', ...args),

  gitStatus = (...args) => git('status', ...args),

  gitTag = (...args) => git('tag', ...args),

  gitTagAsList = (...args) => gitTag(...args)
    .then(xs => xs.split('\n').map(x => x.trim())),

  gitCommit = (...args) => git('commit', ...args),

  gitPush = (...args) => git('push', ...args),

  gitPull = (...args) => git('pull', ...args),

  gitAdd = (...args) => git('add', ...args)

;
