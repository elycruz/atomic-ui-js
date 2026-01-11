// inherit
// initial
// revert
// revert-layer
// unset

import {genColorsCss} from './colors.mjs';
import {genDisplayCss} from './display.mjs';
import {genJustifyContentCss} from './justify-content.mjs';
import {genAlignItemsCss} from './align-items.mjs';
import {genGridCss} from './grid.mjs';
import {genPositionCss} from './position.mjs';
import {genSpacingCss} from './spacing.mjs';
import {genMarginAndPaddingClasses} from './margin-and-padding.mjs';
import {genGapCss} from './gap.js';

(async () => Promise.all([
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
  .then(() => console.log('\ngen-css completed successfully\n'))
  .catch(console.error)
)();
