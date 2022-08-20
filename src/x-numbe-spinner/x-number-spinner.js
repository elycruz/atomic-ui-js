import {DEFAULT_VALUE_NAME, MAX_NAME, MIN_NAME, STEP_NAME, VALUE_NAME} from "../utils";

import {autoWrapNumber, isset} from "../utils";
import {AtomicElement} from "../utils";

let styleSheetInitialized = false;

const {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, isNaN} = Number,

  xNumberSpinnerLocalName = 'x-number-spinner',
  charLengthCssProp = '--x-number-spinner-size',

  xNumberSpinnerStyles = `
:host > :first-child {
  width: var(${charLengthCssProp}, 18ch);
  border: 1px solid gray;
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: -internal-light-dark(black, white);
  cursor: text;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
}

:host(:focus) > :first-child,
:host(:focus-within) > :first-child {
    outline: #000 solid 2px;
}

:host,
:host > :first-child {
  display: inline-block;
  box-sizing: border-box;
}

:host > :first-child {
  overflow: hidden;
}

:host(:focus) {
    outline: none;
}

:host > :first-child {
    white-space: nowrap;
    vertical-align: middle;
    font-family: monospaced;
}

:host > .help {
  font-size: small;
}
`,

  numberRegex = /^([-+]?e?\d+?)?((?<=\1)\.(e?\d+)?)?$/i,
  newLinesRegex = /[\n\r\t\f]/g,

  hasTrailingDot = xs => {
    const incoming = xs + '';
    return incoming.lastIndexOf('.') === incoming.length - 1;
  },

  styleSheet = new CSSStyleSheet(),

  observedAttributes = [MIN_NAME, MAX_NAME, STEP_NAME, VALUE_NAME, DEFAULT_VALUE_NAME];

if (!styleSheetInitialized) {
  styleSheet.replace(xNumberSpinnerStyles)
    .catch(console.error);
}

export class XNumberSpinner extends AtomicElement {
  static formAssociated = true;
  static localName = xNumberSpinnerLocalName;
  static observedAttributes = observedAttributes;
  static styles = styleSheet;

  #defaultValue = '';
  #disabled = false;
  #name = '';
  #readOnly = false;
  #value = '';

  #tabIndex = 0;
  #valueAsNumber = 0;

  /**
   * @type {ElementInternals}
   */
  #internals;

  get #input() {
    return this.shadowRoot.firstElementChild;
  }

  get disabled() {
    return !isset(this.#disabled) ? false : this.#disabled;
  }

  set disabled(x) {
    const disabled = Boolean(x);
    this.#disabled = disabled;
    if (this.#internals) {
      this.#internals.ariaDisabled = disabled + '';
    }
    this.ariaDisabled = disabled + '';
    if (disabled) this.setAttribute('disabled', ''); else this.removeAttribute('disabled');
  }

  get readOnly() {
    return !isset(this.#readOnly) ? false : this.#readOnly;
  }

  set readOnly(x) {
    const readOnly = Boolean(x);
    this.#readOnly = readOnly;
    if (this.#internals) {
      this.#internals.ariaReadOnly = readOnly + '';
    }
    this.ariaReadOnly = readOnly + '';
    if (readOnly) this.setAttribute('readonly', ''); else this.removeAttribute('readonly');
  }

  #min;
  get min() {
    return isset(this.#min) ? this.#min : MIN_SAFE_INTEGER;
  }

  set min(x) {
    let newValue = Number(x);
    if (isNaN(newValue)) {
      this.#min = MIN_SAFE_INTEGER;
      this.removeAttribute(MIN_NAME);
      return;
    } else this.setAttribute(MIN_NAME, newValue);
    this.#min = newValue;
  }

  #max;
  get max() {
    return isset(this.#max) ? this.#max : MAX_SAFE_INTEGER;
  }

  set max(x) {
    const newValue = Number(x);
    if (isNaN(newValue)) this.#max = MAX_SAFE_INTEGER;
    this.#max = newValue;
  }

  #step;
  get step() {
    return isset(this.#step) ? this.#step : 1;
  }

  set step(x) {
    const newValue = Number(x);
    this.#step = isNaN(newValue) ? 1 : newValue;
  }

  get valueAsNumber() {
    return isset(this.#valueAsNumber) ? this.#valueAsNumber : NaN;
  }

  set valueAsNumber(x) {
    let newValueAsNumber = Number(x);
    this.#valueAsNumber = isNaN(newValueAsNumber) ? NaN :
      autoWrapNumber(this.min, this.max, newValueAsNumber);
  }

  get defaultValue() {
    return !isset(this.#defaultValue) ? '' : this.#defaultValue;
  }

  set defaultValue(xs) {
    this.#defaultValue = xs;
    if (xs) this.setAttribute(VALUE_NAME, this.#defaultValue);
    else this.removeAttribute(VALUE_NAME);
    this.value = xs;
  }

  get value() {
    return !isset(this.#value) ? '' : this.#value;
  }

  set value(xs) {
    let newValue;
    if (xs && (isNaN(xs) || !numberRegex.test(xs))) {
      this.shadowRoot.getSelection().collapseToEnd();
      newValue = this.value;
    } else if (!isset(xs) || xs === '') {
      this.#valueAsNumber = NaN;
      newValue = null;
    } else {
      this.valueAsNumber = xs;
      const {valueAsNumber} = this;
      if (isNaN(valueAsNumber)) newValue = null;
      else newValue = (xs[0] === '.' ? '.' + valueAsNumber.slice(1) : valueAsNumber) + (hasTrailingDot(xs) ? '.' : '');
    }
    this.#value = newValue;
    this.#internals?.setFormValue(newValue);
    this.#input.textContent = isset(newValue) ? newValue : '';
  }

  get name() {
    return !isset(this.#name) ? '' : this.#name;
  }

  set name(xs) {
    this.#name = isset(xs) ? String(xs) : '';
  }

  get tabIndex() {
    return !isset(this.#tabIndex) ? 0 : this.#tabIndex;
  }

  set tabIndex(x) {
    this.#tabIndex = Number(x || 0);
    this.setAttribute('tabindex', this.#tabIndex + '');
  }

  get localName() {
    return xNumberSpinnerLocalName;
  }

  get willValidate() {
    return this.#internals ? this.#internals.willValidate : false;
  }

  get validity() {
    return this.#internals ? this.#internals.validity : undefined;
  }

  get validationMessage() {
    return this.#internals ? this.#internals.validationMessage : '';
  }

  get form() {
    this.#internals ? this.#internals.form : null;
  }

  get labels() {
    return this.#internals ? this.#internals.labels : undefined;
  }

  #_xNumberSpinnerInitialized = false;

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
<div></div>
<slot name="help"></slot>
`;
    this.#internals = this.attachInternals();
    this.#input.addEventListener('input', this.#onInput);
  }

  checkValidity() {
    return this.#internals ? this.#internals.checkValidity() : false;
  }

  reportValidity() {
    return this.#internals ? this.#internals.reportValidity() : false;
  }

  setCustomValidity(message = '') {
    if (this.#internals) {
      this.#internals.setValidity(message ? {customError: true} : {}, message || '');
    }
  }

  /**
   * Steps control `valueAsNumber`, and `value`, values upward
   *  by given amount (Default `1`).
   * @param [amount=1] - Amount to step control's value upward by;
   * @returns {void}
   */
  stepUp(amount = 1) {
    if (amount < 0) amount = amount * -1;
    this.#offsetValue(amount)
  }

  /**
   * Steps control `valueAsNumber`, and `value`, property values downward
   *  by given amount (Default `1`).
   * @param [amount=1] - Amount to step control's value downward by.
   * @returns {void}
   */
  stepDown(amount = 1) {
    if (amount > -1) amount = amount * -1;
    this.#offsetValue(amount)
  }

  #offsetValue(amount = 1) {
    const valueAsNumber = this.#valueAsNumber;
    let newValueAsNumber;
    if (!isset(valueAsNumber) || isNaN(valueAsNumber)) newValueAsNumber = amount;
    else newValueAsNumber = valueAsNumber + amount;
    this.value = newValueAsNumber + ''; // `value`'s setter sets `valueAsNumber` for us
  }

  #onInput = e => {
    if (e.currentTarget.isSameNode(this)) return;
    e.preventDefault();
    e.stopPropagation();
    this.value = this.#input.textContent.trim().replace(newLinesRegex, '');
    this.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      composed: true,
      data: e.data,
      inputType: e.inputType,
      isComposing: e.isComposing
    }));
  };

  #onKeyDown = e => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.stepUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.stepDown();
        break;
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        break;
      default:
        break;
    }
  };

  attributeChangedCallback(name, prevValue, newValue) {
    if (prevValue === newValue) return;
    switch (name) {
      case VALUE_NAME: this.defaultValue = newValue; break;
      case 'readonly': this.readOnly = newValue; break;
      default:
        this[name] = newValue;
        break;
    }
  }

  connectedCallback() {
    if (!this.#_xNumberSpinnerInitialized && this.isConnected) {
      this.#input.contentEditable = 'true';
      this.addEventListener('keydown', this.#onKeyDown);
      this.tabIndex = this.tabIndex;
      this.#_xNumberSpinnerInitialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#_xNumberSpinnerInitialized) {
      this.removeEventListener('keydown', this.#onKeyDown);
      this.#_xNumberSpinnerInitialized = false;
    }
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
