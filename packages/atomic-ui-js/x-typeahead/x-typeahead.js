import {XAtomic} from '../archived/x-base/index.js';
import {html} from 'lit';

export const xTypeaheadName = 'x-typeahead';

const mutObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.target.isConnected;
  }
});

export class XTypeaheadElement extends XAtomic {
  static localName = xTypeaheadName;

  static properties = {
    ...XAtomic.properties,
    inputSelector: {type: String, attribute: 'input'},
    datalistSelector: {type: String, attribute: 'list'},
    typeaheadDelay: {type: Number, attribute: 'delay'},
  };

  /**
   * @type {HTMLElement}
   */
  #input;

  get input() {
    if (!this.#input && this.inputSelector) {
      this.#input = this.querySelector(this.inputSelector);
    }
    return this.#input;
  }

  /**
   * @type {HTMLElement}
   */
  #datalist;

  get datalist() {
    if (!this.#datalist && this.datalistSelector) {
      this.#datalist = this.querySelector(this.datalistSelector);
    }
    return this.#datalist;
  }

  #initialized = false;

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#removeListeners()
        .#addListeners();

      mutObserver.observe(this, {childList: true, subtree: true});

      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#removeListeners();
      this.#initialized = false;
    }
  }

  #addListeners() {
    return this;
  }

  #removeListeners() {
    return this;
  }

  renderOptions() {
    return null;
  }

  render() {
    return html`
      <slot></slot>
      <dialog part="menu">
        ${this.renderOptions()}
      </dialog>
    `;
  }
}
