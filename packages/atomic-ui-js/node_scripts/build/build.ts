import fs from 'node:fs/promises';
import path from 'node:path';
import { buildCss, copyCssToDist } from './build-css.ts';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const build = async () =>
  new Promise<void>(resolve => {
    fs.rm(path.join(__dirname, '../../dist'), { recursive: true }).then(
      resolve,
      resolve
    );
  })
    .then(buildCss)
    .then(copyCssToDist)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('build completed successfully\n');
    })
    .catch(console.error);
