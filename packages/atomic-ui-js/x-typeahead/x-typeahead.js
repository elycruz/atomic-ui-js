import {css, html, LitElement} from 'lit';

export const xTypeaheadName = 'x-typeahead';

const mutObserver = new MutationObserver((mutations) => {
  let target;
  for (const mutation of mutations) {
    ({target} = mutation);
    break;
  }
  // @todo if datalist, and/or templates have changed refresh the element
  target.ownerDocument.querySelector(`${xTypeaheadName}[list="${target.id}"]`)?.refreshOverlay();
});

export class XTypeaheadElement extends LitElement {
  static localName = xTypeaheadName;

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      width: fit-content;
    }

    :host,
    :host * {
      box-sizing: border-box;
    }

    :host::part(popover) {
      left: 0;
      margin: 0;
      padding: 0;
      border-radius: var(--x-border-radius);
      border: var(--x-border-width) solid;
    }

    :host::part(popover-content) {
      max-height: 66vh;
      overflow-y: auto;
    }

    :host::part(list) {
      list-style: none;
    }

    :host::part(list),
    :host::part(list-item) {
      display: block;
      padding: 0;
      margin: 0;
    }

    :host::part(list-item) {
      padding: var(--x-border-width) calc(2 * var(--x-border-width));
    }

    :host::part(list-item-button) {
      width: 100%;
      padding: 0.25rem 1rem;
      border: none;
      border-radius: var(--x-border-radius);
    }
  `;

  static properties = {
    inputSelector: {type: String, attribute: 'input'},
    datalistSelector: {type: String, attribute: 'list'},
    // template: {type: Function, attribute: false},
    typeaheadDelay: {type: Number, attribute: 'delay'},
    _datalist: {state: true}
  };

  _datalistSelector;

  get datalistSelector() {
    return this._datalistSelector ?? null;
  }

  set datalistSelector(value) {
    const prev = this._datalistSelector;
    this._datalistSelector = value;
    this._datalist = null;
    this.dataList;
    this.requestUpdate('datalistSelector', prev);
  }

  /**
   * @type {HTMLElement}
   */
  _input;

  get input() {
    if (!this._input && this.inputSelector) {
      this._input = this.querySelector(this.inputSelector);
    }
    return this._input;
  }

  /**
   * @type {HTMLElement}
   */
  get datalist() {
    if (!this._datalist && this.datalistSelector) {
      this._datalist = this.ownerDocument.querySelector(this.datalistSelector);
      mutObserver.observe(this._datalist, {childList: true, subtree: true});
    }
    return this._datalist;
  }

  /**
   * @type {HTMLDialogElement}
   */
  _dialog;

  get dialog() {
    if (!this._dialog) {
      this._dialog = this.shadowRoot.querySelector('dialog');
    }
    return this._dialog;
  }

  _initialized = false;

  constructor() {
    super();

    this.template = (option, i, options, renderMenu) => html`
      <li part="${option.childElementCount ? 'list-item-group' : 'list-item'}">
        <button
          type="button"
          part="list-item-button"
          ?disabled="${option.disabled}"
          class="${!option.childElementCount && option.selected ? 'selected' : null}"
          tabindex="-1"
        >
          ${option.label ?? option.value}
        </button>
        ${renderMenu(option, i, options, renderMenu)}
      </li>
    `;

    this.addEventListener('click', this._onClick);
  }

  _onClick() {
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this._initialized && this.isConnected) {

      this._initialized = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._initialized) {
      this._initialized = false;
    }
  }

  willUpdate(_changedProperties) {
    // If `inputSelector` changed, for `_input` re-selection
    if (_changedProperties.has('inputSelector')) {
      this._input = null;
    }

    // If `datalistSelector` changed, for `_datalist` re-selection
    if (_changedProperties.has('datalistSelector')) {
      this._datalist = null;
    }
  }

  /**
   * @param {HTMLElement} options
   * @returns {null|TemplateResult}
   */
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

  refreshOverlay() {
    this.requestUpdate();
  }

  render() {
    return html`
      <slot></slot>
      <dialog part="popover" open tabindex="-1">
        <div part="popover-content" tabindex="-1">
          ${this.renderMenu(this.datalist)}
        </div>
      </dialog>
    `;
  }
}
