import { buildCss, copyCssToDist } from './build-css.ts';

export const build = async () =>
  Promise.all([buildCss().then(copyCssToDist)])
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('build completed successfully\n');
    })
    .catch(console.error);
