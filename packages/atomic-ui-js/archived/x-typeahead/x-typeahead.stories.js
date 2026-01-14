import {html} from 'lit';
import './index.js';
import {EzTypeaheadElement} from './ez-typeahead.js';

export default {
  title: 'Typeahead',
  component: EzTypeaheadElement.localName,
};

export const DefaultVariation = () => html`
  <ez-typeahead list="datalist">
    <input/>
    <datalist id="datalist">
      ${Array.from({length: 100}, (_, i) => html`
        <option value="${i}">Option ${i}</option>
      `)}
    </datalist>
  </ez-typeahead>
`;
