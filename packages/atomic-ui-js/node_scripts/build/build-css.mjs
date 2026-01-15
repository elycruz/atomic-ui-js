import { promises as fs } from 'node:fs';
import url from 'node:url';
import path from 'node:path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  distPath = path.join(__dirname, '../../dist'),
  inFilePath = path.join(__dirname, '../../css/index.css'),
  outFilePath = path.join(distPath, 'index.min.css'),
  compileCss = async () =>
    fs
      .readFile(inFilePath)
      .then(css =>
        postcss([postcssImport, cssnano])
          .process(css, { from: inFilePath, to: outFilePath })
          .then(result =>
            fs.writeFile(outFilePath, result.css).then(() => result.map)
          )
          .then(map => {
            if (map) {
              return fs.writeFile(outFilePath + '.map', map.toString());
            }
          })
      )
      .then(() => console.log("'build-css' finished successfully.")),
  buildCss = async () => fs.mkdir(distPath).then(compileCss, compileCss);

export { buildCss };
