import fs from 'fs';
import * as path from 'path';
import url from 'url';
import {spacingNums} from './spacing.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),

  {log, error} = console,

  directions = ['', 'top', 'right', 'bottom', 'left'],
  fileName = 'margin-and-padding.css',

  genMarginAndPaddingClasses = () => {
    const outputFilePath = path.join(__dirname, `../../css/modules/${fileName}`),

      seeds = spacingNums,

      indexOf144 = seeds.indexOf(144),

      seedsUpto144 = seeds.slice(0, indexOf144 + 1),

      [marginContent, paddingContent] = directions.reduce((agg, key) => {
        const dir = key ? `-${key}` : '';
        const abbrev = key ? key[0] : '';
        const [inMarginContent, inPaddingContent] = agg;
        const [marginContent, paddingContent] = seedsUpto144.reduce((agg2, seed) => {
          const margin = `.x-m${abbrev}${seed}px {
  margin${dir}: var(--x-${seed}px, ${seed}px);
}`,
            padding = `.x-p${abbrev}${seed}px {
  padding${dir}: var(--x-${seed}px, ${seed}px);
}`,
            [val0, val1] = agg2;

          return [
            val0 + margin + '\n\n',
            val1 + padding + '\n\n'
          ];
        }, ['', '']);

        return [
          inMarginContent + marginContent,
          inPaddingContent + paddingContent
        ];
      }, ['', '']),

      content =
        `/**
 * Margin and Padding shorthand classes.
 */
${marginContent}${paddingContent}
`;

    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  }

;

export {genMarginAndPaddingClasses};
