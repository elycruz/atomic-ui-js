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
import {buildCss} from "../build/build-css.mjs";

(async () => Promise.all([
    genAlignItemsCss(),
    genColorsCss(),
    genDisplayCss(),
    genGridCss(),
    genJustifyContentCss(),
    genPositionCss(),
    genSpacingCss(),
  ])
    .then(() => console.log('\ngen-css completed successfully\n'))
    .catch(console.error)
)();
