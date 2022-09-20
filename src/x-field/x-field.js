import {XAtomic} from "../x-base";
import {css, html, unsafeCSS} from "lit";
import {addEventListener, addEventListeners, removeEventListener, removeEventListeners} from "../utils/dom/events.js";
import styles from './x-field.css' assert {type: 'css'};

export const xFieldName = 'x-field';

export class XField extends XAtomic {
  static get localName() {
    return xFieldName;
  }

  static styles = styles;

  static properties = {
    selectors: {type: String},
    validationMessage: {type: String},
  };

  get localName() {
    return xFieldName;
  }

  #_initialized;

  #_evListenersTupleList;

  #_form;

  #_inputs;

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

  updated(_changedProperties) {
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
          <div class="error-message">${this.validationMessage}</div>
          <slot name="help" part="help"></slot>
        </div>
        <slot name="trailing" part="trailing"></slot>
      </div>
    `;
  }

  #_onInvalid = e => {
    e.preventDefault();
    const {currentTarget: target} = e,
      {selectors} = this;

    if (selectors && target.matches(selectors)) {
      this.validationMessage = target.validationMessage;
    }
  };

  #_onInputOrChange = e => {
    const {target} = e;
    if (!target.matches(this.selectors)) return;
    if (!target.validationMessage) this.validationMessage = '';
  };

  #_onFormReset = () => {
    this.validationMessage = '';
  };

  #_addEventListeners() {
    if (this.#_form) removeEventListener(this.#_onFormReset, 'reset', this.#_form);

    const form = this.closest('form');

    if (form) {
      removeEventListener(this.#_onFormReset, 'reset', form);
      addEventListener(this.#_onFormReset, 'reset', form);
      this.#_form = form;
    }

    if (this.#_inputs) this.#_inputs.forEach(x => {
      removeEventListener(this.#_onInvalid, 'invalid', x);
      addEventListener(this.#_onInvalid, 'invalid', x);
    });

    addEventListeners(this.#_evListenersTupleList, this);
    return this;
  }

  #_removeEventListeners() {
    if (this.#_form) removeEventListener(this.#_onFormReset, 'reset', this.#_form);
    if (this.#_inputs) this.#_inputs.forEach(x => removeEventListener(this.#_onInvalid, 'invalid', x));
    return removeEventListeners(this.#_evListenersTupleList, this);
  }
}
