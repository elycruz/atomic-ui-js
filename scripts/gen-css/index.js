// inherit
// initial
// revert
// revert-layer
// unset

const
  {genColorsCss} = require('./colors'),
  {genDisplayCss} = require('./display'),
  {genJustifyContentCss} = require('./justify-content'),
  {genAlignItemsCss} = require('./align-items'),
  {genGridCss} = require('./grid'),
  {genPositionCss} = require('./position'),
  {genSpacingCss} = require('./spacing');

(async () => Promise.all([
    genAlignItemsCss(),
    genColorsCss(),
    genDisplayCss(),
    genGridCss(),
    genJustifyContentCss(),
    genPositionCss(),
    genSpacingCss(),
  ]).catch(console.error)
)();
