import {css, html, LitElement} from 'lit';

export const xTypeaheadName = 'x-typeahead';

const mutObserver = new MutationObserver((/*mutations*/) => {
  // for (const mutation of mutations) {
  //   // if (mutation.target.isConnected) {}
  //   // @todo if datalist, and/or templates have changed refresh the element
  // }
});

export class XTypeaheadElement extends LitElement {
  static localName = xTypeaheadName;

  static styles = css``;

  static properties = {
    inputSelector: {type: String, attribute: 'input'},
    datalistSelector: {type: String, attribute: 'list'},
    template: {type: Function},
    typeaheadDelay: {type: Number, attribute: 'delay'},
  };

  static shadowRootOptions = { mode: 'open' };

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
      this.#datalist = this.ownerDocument.querySelector(this.datalistSelector);
    }
    return this.#datalist;
  }

  #initialized = false;

  constructor() {
    super();
    this.template = (option, i, options, renderMenu) => html`
      <li part="list-item">
        <button
          type="button"
          part="${option.childElementCount ? 'list-item-group' : 'option'}"
          ?disabled="${option.disabled}"
          class="${!option.childElementCount && option.selected ? 'selected' : null}">
          ${option.label ?? option.value}
        </button>
        ${renderMenu(option, i, options, renderMenu)}
      </li>
    `;
  }

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

  firstUpdated() {
  }

  #addListeners() {
    return this;
  }

  #removeListeners() {
    return this;
  }

  renderMenu(options) {
    if (!options) return null;

    const _renderMenu = this.renderMenu.bind(this);

    return !options.childElementCount ? null : html`
      <menu part="list">
        ${Array.from(options.children, (option, i) => {
    return this.template(option, i, options.children, _renderMenu);
  })}
      </menu>`;
  }

  render() {
    return html`<div>
      <p>Hello</p>
      <slot></slot>
      <dialog part="menu" open>
        ${this.renderMenu(this.datalist)}
      </dialog>
    </div>`;
  }
}
