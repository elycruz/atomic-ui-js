import {html} from 'lit';
import './index.js';
import {XTypeaheadElement} from './x-typeahead.js';

export default {
  title: 'Typeahead',
  component: XTypeaheadElement.localName,
};

export const DefaultVariation = () => html`
    <x-typeahead list="datalist">
      <input/>
    </x-typeahead>
      <datalist id="datalist">
        ${Array.from({length: 100}, (_, i) => html`
          <option value="${i}">Option ${i}</option>
        `)}
      </datalist>
`;
