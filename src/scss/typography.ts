import {stylesAsString} from "../utils/storybook/stylesheet";
// @ts-ignore
import typographyStyles from './base/_typography.scss';

export const typography = () => `
  <style>
    ${stylesAsString}
    ${typographyStyles}
    .ecms-typography > * {
        margin-bottom: 1.44rem;
        display: block;
    }
  </style>
  <div class="ecms-typography">
    <h1 class="ecms-text-h1">Headline 1</h1>
    <h2 class="ecms-text-h2">Headline 2</h2>
    <h3 class="ecms-text-h3">Headline 3</h3>
    <h4 class="ecms-text-h4">Headline 4</h4>
    <h5 class="ecms-text-h5">Headline 5</h5>
    <h6 class="ecms-text-h6">Headline 6</h6>
    <div class="ecms-text-subtitle">Subtitle 1</div>
    <div class="ecms-text-subtitle2">Subtitle 2</div>
    <div class="ecms-text">Body 1</div>
    <div class="ecms-text2">Body 2</div>
    <div class="ecms-text-button">BUTTON</div>
    <div class="ecms-text-caption">Caption</div>
    <div class="ecms-text-overline">OVERLINE</div>
  </div>
  `
;
