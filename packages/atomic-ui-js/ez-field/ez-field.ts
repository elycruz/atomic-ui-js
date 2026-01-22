import {
  LitElement,
  html,
  type PropertyValues,
  type CSSResultGroup,
} from 'lit';

import {
  addEventListener,
  addEventListeners,
  removeEventListener,
  removeEventListeners,
  type EventListenerTuple,
} from '../utils/dom/events.js';

import styles from './ez-field.css.js';

export const xFieldName = 'ez-field';

// const SELECTORS_NAME = 'selectors',
//   VALIDATION_MESSAGE_NAME = 'validationMessage';

export class EzFieldElement extends LitElement {
  static localName = xFieldName;

  static get styles(): CSSResultGroup {
    return styles;
  }

  static properties = {
    selectors: { type: String },
    validationMessage: { type: String },
    validateOnChange: { type: Boolean },
    validateOnInput: { type: Boolean },
  };

  selectors?: string;
  validationMessage?: string;
  validateOnChange?: boolean;
  validateOnInput?: boolean;

  get localName(): typeof xFieldName {
    return xFieldName;
  }

  #_initialized = false;
  #_evListenersTupleList: EventListenerTuple[];
  #_form?: HTMLFormElement;
  #_inputs?: NodeListOf<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;

  constructor() {
    super();
    this.#_evListenersTupleList = [
      [this.#_onInvalid, 'invalid'],
      [this.#_onInputOrChange, 'input'],
      [this.#_onInputOrChange, 'change'],
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.#_initialized && this.isConnected) {
      if (this.selectors && this.#_inputs) this.#_addEventListeners();

      this.#_initialized = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.#_initialized) {
      this.#_removeEventListeners();
      this.#_initialized = false;
    }
  }

  updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    if (_changedProperties.has('selectors')) {
      if (this.selectors) {
        this.#_inputs = this.querySelectorAll(this.selectors);
        this.#_addEventListeners();
      } else this.#_removeEventListeners();
    }
  }

  render() {
    return html`
      <div class="flex-container">
        <slot name="leading" part="leading"></slot>
        <div class="center-column">
          <slot></slot>
          <div class="error-message" part="error">
            ${this.validationMessage}
          </div>
          <slot name="help" part="help"></slot>
        </div>
        <slot name="trailing" part="trailing"></slot>
      </div>
    `;
  }

  #_onInvalid = (e: Event): void => {
    e.preventDefault();

    const { currentTarget } = e,
      target = currentTarget as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement,
      { selectors } = this;

    if (selectors && target?.matches(selectors)) {
      this.validationMessage = target.validationMessage;
    }
  };

  #_onInputOrChange = (e: Event): void => {
    const { target } = e;

    if (
      !(target instanceof HTMLElement) ||
      !target.matches(this.selectors ?? '')
    )
      return;

    const inputTarget = target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    if (!inputTarget.validationMessage) this.validationMessage = '';
    if (
      (this.validateOnChange && e.type === 'change') ||
      (this.validateOnInput && e.type === 'input')
    ) {
      this.#_inputs?.forEach(input => input.checkValidity());
    }
  };

  #_onFormReset = (): void => {
    this.validationMessage = '';
  };

  #_addEventListeners(): this {
    if (this.#_form)
      removeEventListener(this.#_onFormReset, 'reset', this.#_form);

    const form = this.closest('form');

    if (form) {
      removeEventListener(this.#_onFormReset, 'reset', form);
      addEventListener(this.#_onFormReset, 'reset', form);
      this.#_form = form;
    }

    if (this.#_inputs)
      this.#_inputs.forEach(x => {
        removeEventListener(this.#_onInvalid, 'invalid', x);
        addEventListener(this.#_onInvalid, 'invalid', x);
      });

    addEventListeners(this.#_evListenersTupleList, this);
    return this;
  }

  #_removeEventListeners(): this {
    if (this.#_form)
      removeEventListener(this.#_onFormReset, 'reset', this.#_form);
    if (this.#_inputs)
      this.#_inputs.forEach(x =>
        removeEventListener(this.#_onInvalid, 'invalid', x)
      );
    removeEventListeners(this.#_evListenersTupleList, this);
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-field': EzFieldElement;
  }
}
