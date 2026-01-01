import { beforeAll } from 'vitest';
// 👇 Import the exported annotations, if any, from the addons you're using; otherwise remove this
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { setProjectAnnotations } from '@storybook/web-components-vite';
import * as previewAnnotations from './preview';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([previewAnnotations, a11yAddonAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
