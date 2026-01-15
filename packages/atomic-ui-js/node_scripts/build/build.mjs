import { buildCss } from './build-css.mjs';

export const build = async () =>
  Promise.all([buildCss()])
    .then(() => console.log('build completed successfully\n'))
    .catch(console.error);
