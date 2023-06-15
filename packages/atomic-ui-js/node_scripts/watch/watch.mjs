import chokidar from 'chokidar';
import path from 'node:path';
import url from "node:url";
import {buildCss} from "../build/build-css.mjs";

const {log, error} = console;

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const watch = async () => {
  return chokidar.watch(
    path.join(__dirname, '../../**/*.css'), {
      ignored: '**/(node_modules|dist)',
      usePolling: true,
      interval: 610,
      binaryInterval: 610
    })
    .on('all', async (event, path) => {
      log(event, path);

      switch (event) {
        case 'ready':
          log('Awaiting changes ...');
          break;
        case 'change':
          log(`[watch:change] - ${path} changed.`);
          await buildCss();
          log('Awaiting changes ...');
          break;
        case 'error':
          error(event);
          return;
        // case 'add':
        // case 'addDir':
        // case 'unlink':
        // case 'unlinkDir':
        default:
          break;
      }
    });
};
