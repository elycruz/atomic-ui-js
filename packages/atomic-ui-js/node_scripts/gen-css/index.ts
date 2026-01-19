// inherit
// initial
// revert
// revert-layer
// unset

import { genColorsCss } from './colors.ts';
import { genDisplayCss } from './display.ts';
import { genJustifyContentCss } from './justify-content.ts';
import { genAlignItemsCss } from './align-items.ts';
import { genGridCss } from './grid.ts';
import { genPositionCss } from './position.ts';
import { genSpacingCss } from './spacing.ts';
import { genMarginAndPaddingClasses } from './margin-and-padding.ts';
import { genGapCss } from './gap.ts';

await (async () =>
  Promise.all([
    genAlignItemsCss(),
    genColorsCss(),
    genDisplayCss(),
    genGridCss(),
    genJustifyContentCss(),
    genPositionCss(),
    genSpacingCss(),
    genGapCss(),
    genMarginAndPaddingClasses(),
  ])
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('\ngen-css completed successfully\n');
    })
    .catch(console.error))();
