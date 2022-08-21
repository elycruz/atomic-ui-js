import {isset} from '../utils/object.js';
import {AtomicElement} from "./x-atomic-element.js";
import {throwNoOverrideError} from "../utils/events.js";
import {
  DISABLED_NAME,
  VALUE_NAME,
  NAME_NAME,
  READONLY_NAME,
  REQUIRED_NAME
} from "../utils/shared-constants.js";

let styleSheetInitialized = false;

const xFormControlLocalName = 'x-form-control',

  xVisibleFormControlStyles = `
:host {
}
`,

  styleSheet = new CSSStyleSheet(),

  observedAttributes = [
    VALUE_NAME,
    REQUIRED_NAME, READONLY_NAME.toLowerCase(), NAME_NAME,
    DISABLED_NAME
  ];

if (!styleSheetInitialized) {
  styleSheet.replace(xVisibleFormControlStyles)
    .catch(console.error);
  styleSheetInitialized = true;
}

export class XFormControl extends AtomicElement {
  static formAssociated = true;
  static localName = xFormControlLocalName;
  static observedAttributes = observedAttributes;
  static styles = styleSheet;
  static shadowRootOptions = {mode: 'open', delegatesFocus: true};

  /**
   * @type {ElementInternals}
   */
  _internals;

  _disabled;
  get disabled() {
    return !isset(this._disabled) ? false : this._disabled;
  }

  set disabled(x) {
    const {_disabled: prevDisabled} = this,
      disabled = Boolean(x);
    this._disabled = disabled;
    if (this._internals) {
      this._internals.ariaDisabled = disabled + '';
    }
    this.ariaDisabled = disabled + '';
    this.requestUpdate(DISABLED_NAME, prevDisabled);
  }

  _required;
  get required() {
    return !isset(this._required) ? false : this._required;
  }

  set required(x) {
    const {required: prevRequired} = this,
      required = Boolean(x);
    this._required = required;
    if (this._internals) {
      this._internals.ariaRequired = required + '';
    }
    this.ariaRequired = required + '';
    this.requestUpdate(REQUIRED_NAME, prevRequired);
  }

  _readOnly;
  get readOnly() {
    return !isset(this._readOnly) ? false : this._readOnly;
  }

  set readOnly(x) {
    const readOnly = Boolean(x);
    this._readOnly = readOnly;
    if (this._internals) {
      this._internals.ariaReadOnly = readOnly + '';
    }
    this.ariaReadOnly = readOnly + '';
    this.requestUpdate()
  }

  _defaultValue;
  get defaultValue() {
    return !isset(this._defaultValue) ? '' : this._defaultValue;
  }

  set defaultValue(xs) {
    this._defaultValue = xs;
    if (xs) this.setAttribute(VALUE_NAME, this._defaultValue);
    else this.removeAttribute(VALUE_NAME);
    this.value = xs;
  }

  _value;
  get value() {
    return !isset(this._value) ? '' : this._value;
  }

  set value(xs) {
    this._value = isset(xs) ? String(xs) : '';
  }

  _name = '';
  get name() {
    return !isset(this._name) ? '' : this._name;
  }

  set name(xs) {
    this._name = isset(xs) ? String(xs) : '';
    if (this._name) this.setAttribute(NAME_NAME, this._name);
    else this.removeAttribute(NAME_NAME);
  }

  _tabIndex = 0;
  get tabIndex() {
    return !isset(this._tabIndex) ? 0 : this._tabIndex;
  }

  set tabIndex(x) {
    this._tabIndex = Number(x || 0);
    this.setAttribute('tabindex', this._tabIndex + '');
  }

  get type() {
    return this.localName;
  }

  get localName() {
    return this.constructor.localName;
  }

  get willValidate() {
    return this._internals ? this._internals.willValidate : false;
  }

  get validity() {
    return this._internals ? this._internals.validity : undefined;
  }

  get validationMessage() {
    return this._internals ? this._internals.validationMessage : '';
  }

  get form() {
    return this._internals ? this._internals.form : null;
  }

  get labels() {
    return this._internals ? this._internals.labels : undefined;
  }

  #_xFormControlInitialized = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  setValidity(validityState, validationMessage = null) {
    this._internals?.setValidity(validityState, validationMessage);
  }

  updateValidity() {
    throwNoOverrideError();
  }

  checkValidity() {
    return this._internals ? this._internals.checkValidity() : false;
  }

  reportValidity() {
    return this._internals ? this._internals.reportValidity() : false;
  }

  setCustomValidity(message = '') {
    this._internals?.setValidity(message ? {customError: true} : {}, message || '');
  }

  attributeChangedCallback(name, prevValue, newValue) {
    if (prevValue === newValue) return;
    switch (name) {
      case VALUE_NAME:
        this.defaultValue = newValue;
        break;
      case 'readonly':
        this.readOnly = newValue;
        break;
      case 'tabindex':
        this.tabIndex = newValue;
        break;
      default:
        this[name] = newValue;
        break;
    }
  }

  connectedCallback() {
    if (!this.#_xFormControlInitialized && this.isConnected) {
      // this.tabIndex = this.tabIndex;
      // this.constructor.observedAttributes.forEach()
      // this.attributeChangedCallback()
      this.#_xFormControlInitialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#_xFormControlInitialized) {
      this.#_xFormControlInitialized = false;
    }
  }

  _onFormData() {
    throwNoOverrideError();
  }

  formAssociatedCallback(form) {
    if (this.name && form.elements[this.name]) {
      form.addEventListener('formdata', this._onFormData);
      this.updateValidity();
    } else {
      form.removeEventListener('formdata', this._onFormData);
    }
  }

  formDisabledCallback(state) {
    if (state) this._internals.setFormValue(this.value);
    else this._internals.setFormValue(null);
  }

  formResetCallback() {
    this.value = this.defaultValue;
  }
}

/*
interface FormControl extends HTMLElement {
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  readOnly?: boolean;
  value?: string;

  readonly form: HTMLFormElement;
  readonly validationMessage: string;
  readonly validity: ValidityState;
  readonly willValidate: boolean;
  readonly labels: NodeList;

  checkValidity(): boolean;

  reportValidity(): boolean;

  setCustomValidity(msg: string): void;
}
*/
