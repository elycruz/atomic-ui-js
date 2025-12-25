import {html} from 'lit';
import './index.js';

export default {
  title: 'Custom Elements/Ripple',
  component: 'x-ripple'
};

export const DefaultVariation = () => html`
  <button type="button" class="x-btn x-theme-primary">
    <x-ripple></x-ripple>
    Hello
  </button>
`;
