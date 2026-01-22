import type {Preview} from "@storybook/web-components-vite";
import '../dist/packages/atomic-ui-js/css/index.min.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
