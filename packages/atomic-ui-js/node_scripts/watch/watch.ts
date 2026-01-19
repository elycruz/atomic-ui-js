import chokidar from 'chokidar';
import path from 'node:path';
import url from 'node:url';
import { buildCss } from '../build/build-css.ts';

const { log, error } = console,
  __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const watch = async (): Promise<any> => {
  return chokidar
    .watch(path.join(__dirname, '../../**/*.css'), {
      ignored: '**/(node_modules|dist)',
      usePolling: true,
      interval: 610,
      binaryInterval: 610,
    })
    .on('ready', () => {
      buildCss().catch(error);
      log('Awaiting changes ...');
    })
    .on('all', (event, path) => {
      switch (event) {
        case 'change':
          log(`[watch:change] - ${path} changed.`);
          buildCss().catch(error);
          log('Awaiting changes ...');
          break;
        // case 'add':
        // case 'addDir':
        // case 'unlink':
        // case 'unlinkDir':
        default:
          break;
      }
    })
    .on('error', err => {
      error(`[watch:error] - ${err}`);
    });
};
