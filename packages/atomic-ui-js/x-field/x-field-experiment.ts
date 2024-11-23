'use client';

import { LitElement, html, PropertyValues } from 'lit';
import styles from './field.element.css';

export const DasFieldName = 'das-field';

export type ValidationMessageGetter = (i: HTMLInputElement) => string;
export type ValidationMessage = string;

export type ValidityMessaging = {
  [key in keyof ValidityState]?: ValidationMessageGetter | ValidationMessage;
};

export class DasFieldElement extends LitElement {
  static localName = DasFieldName;
  static styles = styles;

  static properties = {
    selectors: { type: String },
    validationMessage: { type: String },
    validateOnChange: { type: Boolean },
    validateOnInput: { type: Boolean },
    validityMessaging: { type: Object, state: true },
    validate: { type: Function, state: true }
  };

  get localName() {
    return DasFieldName;
  }

  #_inputs: NodeList | null;
  get inputs(): NodeList | null {
    if (!this.#_inputs && this.selectors) {
      this.#_inputs = this.querySelectorAll(this.selectors);
    }
    return this.#_inputs;
  }

  #_initialized: boolean;
  #_form: HTMLFormElement | null;

  declare selectors?: string;
  declare validationMessage?: string | null | undefined;
  declare validateOnInput?: boolean;
  declare validateOnChange?: boolean;
  declare validityMessaging?: ValidityMessaging;
  // @todo Use `Proxy` object here instead of actual input control, additionally
  //    pass in `value` as first arg.
  declare validate?: (input: HTMLInputElement) => void | ValidationMessage;

  constructor() {
    super();
    this.#_initialized = false;
    this.#_form = null;
    this.#_inputs = null;
    this.validateOnChange = true;
    this.selectors = 'input, select, textarea';
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.#_initialized && this.isConnected) {
      if (this.#_inputs) this.#_removeEventListeners().#_addEventListeners();

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

  updated(_changedProperties: PropertyValues) {
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
      <div part="start"><slot></slot></div>
      <slot name="help" part="help"></slot>
      <div part="error">${this.validationMessage}</div>
    `;
  }

  #_onInvalid = (e: Event) => {
    e.preventDefault();
    const input = e.currentTarget as HTMLInputElement,
      { selectors } = this;

    if (!selectors || !input.matches(selectors)) {
      return;
    }

    // Handle validity custom messaging.
    const { validity } = input;
    // If no custom messaging or custom message is already set
    if (!this.validityMessaging || validity.customError) {
      this.validationMessage = input.validationMessage;
    }
    // Else get custom method and re-trigger 'invalid' call
    else
      (
        Object.entries(this.validityMessaging) as [
          keyof ValidityMessaging,
            ValidationMessageGetter | ValidationMessage,
        ][]
      ).forEach(([key, messageOrGetter]) => {
        if (key === 'valid' || !validity[key] || !messageOrGetter) return;
        const message = typeof messageOrGetter === 'function' ? messageOrGetter(input) : (messageOrGetter as string);
        input.setCustomValidity(message);
        input.reportValidity();
      });
  };

  #_propagateErrorMessages() {
    (this.inputs as NodeListOf<HTMLInputElement>).forEach((input) => {
      input.setCustomValidity('');
      input.reportValidity();

      const message: string | void = this.validate?.(input);
      const validity = (input as HTMLInputElement).validity;

      // If is valid, or no custom error messaging return
      if (message) {
        input.setCustomValidity(message);
        input.reportValidity();
        this.validationMessage = message;
        return;
      } else if (validity.valid) {
        this.validationMessage = '';
        return;
      }

      // Handle validity custom messaging.
      // If we have non "validate" custom messaging, propagate it
      if (this.validityMessaging && !validity.customError)
        (
          Object.entries(this.validityMessaging) as [
            keyof ValidityMessaging,
              ValidationMessageGetter | ValidationMessage,
          ][]
        ).forEach(([key, messageOrGetter]) => {
          // Skip all keys except matching one
          if (key === 'valid' || !validity[key] || !messageOrGetter) return;
          const message = typeof messageOrGetter === 'function' ? messageOrGetter(input) : (messageOrGetter as string);
          input.setCustomValidity(message);
          input.reportValidity();
        });
    });
  }

  #_onInputOrChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.matches(this.selectors as string)) return;

    // Clear validation message if none
    if (!target.validationMessage) this.validationMessage = '';

    const inputs = this.inputs as NodeListOf<HTMLInputElement>;
    if (
      !inputs?.length ||
      !((this.validateOnChange && e.type === 'change') || (this.validateOnInput && e.type === 'input'))
    ) {
      return;
    }

    this.#_propagateErrorMessages();
  };

  #_onFormReset = () => {
    // Clear 'custom' error messages
    (this.inputs as NodeListOf<HTMLInputElement>)?.forEach((input) => input.setCustomValidity(''));
    this.validationMessage = '';
  };

  #_addEventListeners() {
    this.#_form?.removeEventListener('reset', this.#_onFormReset);

    const form = (this.#_form = this.closest('form'));
    if (form) {
      form.removeEventListener('reset', this.#_onFormReset);
      form.addEventListener('reset', this.#_onFormReset);
    }

    const { inputs } = this;
    if (inputs)
      inputs.forEach((x) => {
        x.removeEventListener('invalid', this.#_onInvalid);
        x.addEventListener('invalid', this.#_onInvalid);
      });

    this.addEventListener('invalid', this.#_onInvalid);
    this.addEventListener('input', this.#_onInputOrChange);
    this.addEventListener('change', this.#_onInputOrChange);

    return this;
  }

  #_removeEventListeners() {
    const { inputs } = this;
    if (this.#_form) this.#_form.removeEventListener('reset', this.#_onFormReset);
    if (inputs) inputs.forEach((x) => x.removeEventListener('invalid', this.#_onInvalid));

    this.removeEventListener('invalid', this.#_onInvalid);
    this.removeEventListener('input', this.#_onInputOrChange);
    this.removeEventListener('change', this.#_onInputOrChange);

    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'das-field': DasFieldElement;
  }
}
