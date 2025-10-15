'use client';

import {css, html, LitElement} from 'lit';

export const xTypeaheadName = 'x-typeahead';

/**
 * @todo Rename this element to `XComboBox`/`XComboSelect`
 */
export class XTypeaheadElement extends LitElement {
  static localName = xTypeaheadName;

  static styles = css`
    :host,
    :host * {
      box-sizing: border-box;
    }

    :host {
      position: relative;
      display: inline-block;
      width: fit-content;
      min-width: 1rem;
      min-height: 1rem;
    }

    ::slotted(input, [type]) {
      --anchor-name: --input;
    }

    :host::part(popover) {
      position: absolute;
      margin: 0;
      padding: 0;
      border-radius: var(--x-border-radius);
      border: var(--x-border-width) solid;

      /* Required due to only "partial" support of popover API */
      inset: auto; /* Required for New API */
      /* Popover API specific - placed here for testing */
      position-anchor: --input;
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

    :host::part(list-item)[hidden],
    :host::part(list-item-group)[hidden] {
      display: none;
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
      if (!this.#input) throw new Error(`input element missing in ${xTypeaheadName} component`);
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
      this.#popover = this.shadowRoot.querySelector('[part=popover]');
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
            class="${!isOptGroup && option.selected ? 'selected' : null}"
            ?disabled="${option.disabled}"
            ?inert="${isOptGroup}"
            tabindex="-1"
          >
            ${option.label ?? option.value}
          </button>
          ${renderMenu(option, i, options, renderMenu)}
        </li>
      `;
    };
    this.addEventListener('click', this.#onClick);
    this.addEventListener('input', this.#onInput);
    this.addEventListener('keyup', this.#onEnterKeyUp);
  }

  #refetchDataList() {
    if (!this._datalist) {
      this._datalist = this.datalistSelector ?
        this.ownerDocument.querySelector(this.datalistSelector) :
        this.querySelector('datalist');
    }
  }

  #popoverOpened = false;
  /**
   * @param {Event} e
   * @todo How do we resolve the difference between 'Enter' key action on the "input" control, and
   *   the fact that we need to toggle the popover? // 'Enter' key on "input" control performs form
   *   submit.
   */
  #onClick(e) {
    const { target } = e;

    // If "input" control has been clicked
    if (target.matches(`${this.inputSelector || 'input, [type]'}`)) {
      this.popover.togglePopover?.(!this.#popoverOpened);
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  #onEnterKeyUp(e) {
    if (e.key === 'Enter' && this.matches(':focus, :focus-within')) {
      e.preventDefault();
    }
  }

  /**
   * Ensures we capture popover "opened" state, on light dismiss (
   *  e.g, on outside click, and/or "Escape" key press, etc.).
   *
   *  @param {ToggleEvent} e
   */
  #onPopoverToggle(e) {
    this.#popoverOpened = e.oldState === 'closed';
  }

  #onInput(e) {
    console.log(e);
    const {value} = e.target;
    this.shadowRoot.querySelectorAll('[part^="list"]').forEach(li => {
      li.hidden = !li.textContent.includes(value);
    });
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
      <slot></slot>
      <div part="popover" popover tabindex="-1" @toggle="${this.#onPopoverToggle}">
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
