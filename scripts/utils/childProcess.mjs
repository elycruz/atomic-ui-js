import {log} from './console';
import chalk from 'chalk';
import {exec} from 'child_process';

export const

  execAsIo = (command, options) => new Promise((resolve, reject) => {
    exec(command, options, (msg, stdout, stderr) => {
      if (msg) {
        reject(`exec-error: ${chalk.red(msg)}`);
      }
      if (stderr) {
        log(chalk.yellow(`${stderr}`));
      }
      resolve(stdout);
    });
  })

;
