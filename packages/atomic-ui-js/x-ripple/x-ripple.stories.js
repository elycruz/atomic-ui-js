import {html} from 'lit';

export default {
  title: 'Ripple',
  component: 'x-ripple'
};

export const DefaultVariation = () => html`
    <button type="button" class="x-btn x-theme-primary">
        <x-ripple></x-ripple>
        Hello
    </button>
`;
