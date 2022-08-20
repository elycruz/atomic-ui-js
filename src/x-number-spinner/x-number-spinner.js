import {DEFAULT_VALUE_NAME, focusedSelector, log, MAX_NAME, MIN_NAME, STEP_NAME, typeOf, VALUE_NAME} from "../utils";

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
  border-radius: 2px;
  padding: 1px 2px;
  color: -internal-light-dark(black, white);
  cursor: text;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
}

:host(:focus) > :first-child,
:host(:focus-within) > :first-child {
    outline: #000 solid 1px;
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

  numberRegex = /^([-+]|\d|[-+]?e?\d+?)((?<=\1)\.(e?\d+)?)?$/i,
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

// @todo Add property to enable handling of `BigInt` values.

export class XNumberSpinner extends AtomicElement {
  static formAssociated = true;
  static localName = xNumberSpinnerLocalName;
  static observedAttributes = observedAttributes;
  static styles = styleSheet;
  static shadowRootOptions = {mode: 'open', delegatesFocus: true};

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

  get #errors() {
    return this.shadowRoot.lastElementChild;
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
    this.updateValidity();
  }

  #max;
  get max() {
    return isset(this.#max) ? this.#max : MAX_SAFE_INTEGER;
  }

  set max(x) {
    const newValue = Number(x);
    if (isNaN(newValue)) this.#max = MAX_SAFE_INTEGER;
    this.#max = newValue;
    this.updateValidity();
  }

  #step;
  get step() {
    return isset(this.#step) ? this.#step : 1;
  }

  set step(x) {
    const newValue = Number(x);
    this.#step = isNaN(newValue) ? 1 : newValue;
    this.updateValidity();
  }

  get valueAsNumber() {
    return isset(this.#valueAsNumber) ? this.#valueAsNumber : NaN;
  }

  set valueAsNumber(x) {
    this.#setValue(x);
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
    this.#setValue(xs);
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
<ul class="errors"></ul>
`;
    this.#internals = this.attachInternals();
    this.#input.addEventListener('input', this.#onInput);
    this.#input.addEventListener('focusin', this.#onFocus);
    this.#input.addEventListener('focusout', this.#onFocusOut);
  }

  setValidity(validityState, validationMessage = null) {
    this.#internals?.setValidity(validityState, validationMessage);
  }

  updateValidity() {
    const {value, valueAsNumber, min, max, step, required} = this,
      issetValue = isset(value),
      newValidityState = {};
    let validationMessage = null;
    if (step < 1) {
      newValidityState.typeMismatch = true;
      validationMessage = `The control's \`step\` property only accepts positive numbers.`;
    }
    if (min >= max) {
      newValidityState.typeMismatch = true;
      validationMessage = `The control's \`min\` property must be less than the \`max\` property.`;
    }
    if (required && !issetValue) {
      newValidityState.valueMissing = true;
      validationMessage = 'Please fill out this field.';
    }
    if (issetValue) {
      if (valueAsNumber < min) {
        newValidityState.rangeUnderflow = true;
        validationMessage = `The entered value must be greater than or equal to ${min}.`;
      }
      if (valueAsNumber > max) {
        newValidityState.rangeOverflow = true;
        validationMessage = `The entered value must be less than or equal to ${max}.`;
      }
    }
    this.setValidity(newValidityState, validationMessage);
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
    this.#offsetValue(amount);
  }

  /**
   * Steps control `valueAsNumber`, and `value`, property values downward
   *  by given amount (Default `1`).
   * @param [amount=1] - Amount to step control's value downward by.
   * @returns {void}
   */
  stepDown(amount = 1) {
    if (amount > -1) amount = amount * -1;
    this.#offsetValue(amount);
  }

  #setValue(xsOrX) {
    let newNumber = NaN,
      newValue = null;

    const {min, max} = this,
      issetX = isset(xsOrX);

    if (issetX && !isNaN(xsOrX) && numberRegex.test(xsOrX)) {
      const _newNumber = Number(xsOrX);
      if (isNaN(_newNumber)) {
        newValue = null;
        newNumber = _newNumber;
      } else {
        const xs = xsOrX + '';
        newNumber = autoWrapNumber(min, max, _newNumber);
        newValue = (xs[0] === '.' ? '.' + (newNumber + '').slice(1) : newNumber) + (hasTrailingDot(xs) ? '.' : '')
      }
    }

    this.#value = newValue;
    this.#valueAsNumber = newNumber;
    this.#internals?.setFormValue(newValue);
    this.#input.textContent = isset(newValue) ? newValue : '';
    this.updateValidity();
  }

  #offsetValue(amount = 1) {
    const valueAsNumber = this.#valueAsNumber;
    let newValueAsNumber;
    if (!isset(valueAsNumber) || isNaN(valueAsNumber)) newValueAsNumber = amount;
    else newValueAsNumber = valueAsNumber + amount;
    this.value = newValueAsNumber + ''; // `value`'s setter sets `valueAsNumber` for us
  }

  #positionCursor(collapseSelection = true) {
    const range = new Range(),
      {value} = this;
    if (!value) return;
    range.setStart(this.#input.firstChild, 0);
    range.setEnd(this.#input.firstChild, value.length);
    // range.collapse();
    // log(range + '');
    const selection = this.ownerDocument.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    if (collapseSelection) selection.collapseToEnd();
  }

  #onInput = e => {
    e.preventDefault();
    e.stopPropagation();
    const currValue = this.value;
    const newValue = this.#input.textContent.trim().replace(newLinesRegex, '');
    if (currValue === newValue) return;
    this._changeDispatchPending = true;
    this.value = newValue;
    this.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      composed: true,
      cancelable: false,
      data: e.data,
      inputType: e.inputType,
      isComposing: e.isComposing
    }));
  };

  #onFocus = e => {
    this.#positionCursor(false);
  };

  #onFocusOut = e => {
    if (!this._changeDispatchPending) {
      return;
    }
    this._changeDispatchPending = false;
    this.reportValidity();
    const evOptions = {
      bubbles: true,
      composed: true,
      cancelable: false
    };
    this.dispatchEvent(new Event('change', evOptions));
    this.dispatchEvent(new Event('input', evOptions));
  };

  #onKeyDown = e => {
    if (this.disabled || this.readOnly || !this.matches(focusedSelector)) {
      return;
    }
    let triggerChange = false;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.stepUp();
        triggerChange = true;
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.stepDown();
        triggerChange = true;
        break;
      case 'PageUp':
        e.preventDefault();
        this.stepUp(10);
        triggerChange = true;
        break;
      case 'PageDown':
        e.preventDefault();
        this.stepDown(10);
        triggerChange = true;
        break;
      default:
        break;
    }

    if (triggerChange) {
      this.#positionCursor();
      this._changeDispatchPending = true;
      this.#onFocusOut(e);
    }
  };

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
