import {css, html, LitElement} from 'lit';

export const xTypeaheadName = 'x-typeahead';

/**
 * @todo Rename this element to `XComboBox`/`XComboSelect`
 */
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

    :host::part(button) {
      --anchor-name: --button-anchor;
    }

    :host::part(popover) {
      margin: 0;
      padding: 0;
      border-radius: var(--x-border-radius);
      border: var(--x-border-width) solid;

      /* Required due to only "partial" support of New API */
      //top: 0;
      //left: 0;
      //inset: auto; /* Required for New API */
      /* New API - placed here for testing */
      position-anchor: --button-anchor;
      position-area: block-end;
      /* flip to bottom if goes off the top of the screen */
      position-try-fallbacks: flip-block;
      position-try-order: most-height;
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
    _datalist: {state: true}
  };

  #datalistSelector;
  get datalistSelector() {
    return this.#datalistSelector ?? null;
  }

  set datalistSelector(value) {
    const prev = this.#datalistSelector;
    this.#datalistSelector = value;
    this._datalist = null;
    this.requestUpdate('datalistSelector', prev);
  }

  /**
   * @type {HTMLElement | null}
   */
  #input;
  get input() {
    if (!this.#input) {
      this.#input = this.querySelector(this.inputSelector || 'input');
    }
    return this.#input;
  }

  /**
   * @type {HTMLElement}
   */
  get datalist() {
    this.#refetchDataList();
    return this._datalist;
  }

  /**
   * @type {HTMLDialogElement | null}
   */
  #popover;
  get popover() {
    if (!this.#popover) {
      this.#popover = this.shadowRoot.querySelector('[popover]');
    }
    return this.#popover;
  }

  #initialized = false;

  constructor() {
    super();

    this.template = (option, i, options, renderMenu) => {
      const isOptGroup = option.matches('optgroup');
      return html`
        <li part="${isOptGroup ? 'list-item-group' : 'list-item'}">
          <button
            type="button"
            part="list-item-button"
            ?disabled="${option.disabled}"
            class="${!isOptGroup && option.selected ? 'selected' : null}"
            tabindex="-1"
            ?inert="${isOptGroup}"
          >
            ${option.label ?? option.value}
          </button>
          ${renderMenu(option, i, options, renderMenu)}
        </li>
      `;
    };

    this.addEventListener('click', this.#onClick);
  }

  #refetchDataList() {
    if (!this._datalist) {
      this._datalist = this.datalistSelector ?
        this.ownerDocument.querySelector(this.datalistSelector) :
        this.querySelector('datalist');
    }
  }

  #onClick(e) {
    const { target } = e;

    // If is toggle button
    if (target.matches('input, [type]:not(#button)')) {
      this.popover.togglePopover();
    }
  }

  #onButtonClick() {
    this.input?.focus();
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.#initialized && this.isConnected) {
      this.#initialized = true;
      mutObserver.observe(this, {childList: true, subtree: true, attributes: true, attributeFilter: ['list', 'input']});
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.#initialized) {
      this.#initialized = false;
    }
  }

  willUpdate(_changedProperties) {
    // If `inputSelector` changed, for `#input` re-selection
    if (_changedProperties.has('inputSelector')) {
      this.#input = null;
    }

    // If `datalistSelector` changed, for `_datalist` re-selection
    if (_changedProperties.has('datalistSelector')) {
      this._datalist = null;
    }
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    return this.updateComplete.then(allUpdatesPerformed => () => {
      if (!allUpdatesPerformed) return;
    });
  }

  /**
   * @param {HTMLElement} options
   * @returns {null|TemplateResult}
   */
  renderMenu(options) {
    if (!options) return null;

    const _renderMenu = this.renderMenu.bind(this);

    return !(options.childElementCount ?? options.length) ? null : html`
      <menu part="list">
        ${Array.from(options.children, (option, i) =>
          this.template(option, i, options.children, _renderMenu)
        )}
      </menu>`;
  }

  render() {
    return html`
      <button id="button"
              type="button"
              popoverTarget="popover"
              @click="${this.#onButtonClick}"
      >
        <slot></slot>
      </button>
      <div id="popover" part="popover" popover tabindex="-1">
        <div part="popover-content" tabindex="-1">
          ${this.renderMenu(this.datalist)}
        </div>
      </div>
    `;
  }

  refreshOverlay() {
    this.requestUpdate();
  }
}

const mutObserver = new MutationObserver((mutations) => {
  const visited = new WeakSet();

  for (const mutation of mutations) {
    const {target} = mutation;
    const typeahead = target.closest(xTypeaheadName);
    if (!typeahead || visited.has(typeahead)) continue;
    typeahead.refreshOverlay();
  }
});
