import {html} from 'lit';
import './register.js';

export default {
  title: 'Typeahead',
  component: 'x-typeahead',
};

export const DefaultVariation = () => html`<x-typeahead>
    <input />
    <datalist></datalist>
  </x-typeahead>`;
