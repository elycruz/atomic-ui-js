import {html} from 'lit';
import { expect } from 'storybook/test';
import type { StoryObj } from '@storybook/web-components-vite';

import './register.js';
import {xRippleName} from "./x-ripple.js";

export default {
  title: 'Custom Elements/Ripple',
  component: 'x-ripple'
};

export const DefaultVariation: StoryObj = {
  render: () => html`
    <button type="button" class="x-btn x-theme-primary">
      <x-ripple data-testid="ripple-1"></x-ripple>
      Within a Button
    </button>

    <div>
      <label for="checkbox">
        <x-ripple class="x-theme-danger">
          <input type="checkbox" class="x-checkbox" id="checkbox"/>
        </x-ripple>
        <span>Around a Checkbox</span>
      </label>
    </div>
  `,
  play: async ({ canvas }) => {
    // Assert structure
    // ----
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();

    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeInTheDocument();

    const ripple = button.firstElementChild;
    await expect(ripple).toBeInTheDocument();
    await expect(ripple).toHaveProperty('nodeName', xRippleName.toUpperCase());
    // Ensure no additional DOM is generated
    await expect(ripple).toBeEmptyDOMElement();
    // Ensure no `shadowRoot` is created
    await expect(ripple).toHaveProperty('shadowRoot', null);

    const ripple2 = checkbox.parentElement;
    await expect(ripple2).toBeInTheDocument();
    await expect(ripple2).toHaveProperty('nodeName', xRippleName.toUpperCase());
    await expect(ripple2.children).toHaveProperty('length', 1);
    // Ensure no additional DOM is generated
    await expect(ripple2).toHaveProperty('childElementCount', 1);
    // Ensure no `shadowRoot` is created
    await expect(ripple2).toHaveProperty('shadowRoot', null);
  }
};
