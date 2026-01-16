import { buildCss } from './build-css.mjs';

export const build = async () =>
  Promise.all([buildCss()])
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('build completed successfully\n')
    )
    .catch(console.error);
