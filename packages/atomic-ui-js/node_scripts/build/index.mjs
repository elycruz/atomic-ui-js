import {buildCss} from "./build-css.mjs";

(async () => Promise.all([
    buildCss()
  ])
    .then(() => console.log('build completed successfully\n'))
    .catch(console.error)
)();
