import {isset} from "../../utils/object.js";
import {XAtomic} from "./x-atomic.js";
import {throwNoOverrideError} from "../../utils/dom/events.js";
import {
  DEFAULT_VALUE_NAME,
  DISABLED_NAME,
  NAME_NAME,
  READONLY_NAME,
  REQUIRED_NAME, TABINDEX_NAME,
  VALUE_NAME,
} from "../../utils/shared-constants.js";

export class XFormControl extends XAtomic {
  static formAssociated = true;
  static shadowRootOptions = {mode: "open", delegatesFocus: true};

  // static shadowRootOptions = {mode: "open", delegatesFocus: true};
  static  properties = {
    defaultValue: {type: String, attribute: VALUE_NAME, reflect: true},
    disabled: {type: Boolean, reflect: true, attribute: VALUE_NAME},
    name: {type: Boolean, reflect: true},
    readOnly: {type: Boolean, reflect: true},
    required: {type: Boolean, reflect: true},
    tabIndex: {type: Boolean, reflect: true},
    type: {type: String, reflect: true},
    value: {type: String, attribute: false},
  };

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
      this._internals.ariaDisabled = disabled + "";
    }
    this.ariaDisabled = disabled + "";
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
      this._internals.ariaRequired = required + "";
    }
    this.ariaRequired = required + "";
    this.requestUpdate(REQUIRED_NAME, prevRequired);
  }

  _readOnly;
  get readOnly() {
    return !isset(this._readOnly) ? false : this._readOnly;
  }

  set readOnly(x) {
    const {readOnly: prevReadOnly} = this,
      readOnly = Boolean(x);
    this._readOnly = readOnly;
    if (this._internals) {
      this._internals.ariaReadOnly = readOnly + "";
    }
    this.ariaReadOnly = readOnly + "";
    this.requestUpdate(READONLY_NAME, prevReadOnly);
  }

  _defaultValue;
  get defaultValue() {
    return !isset(this._defaultValue) ? "" : this._defaultValue;
  }

  set defaultValue(xs) {
    const {_defaultValue: prevDefaultValue} = this;
    this._defaultValue = xs;
    this.value = xs;
    this.requestUpdate(DEFAULT_VALUE_NAME, prevDefaultValue);
  }

  _value;
  get value() {
    return !isset(this._value) ? "" : this._value;
  }

  set value(xs) {
    const {value: prevValue} = this;
    this._value = isset(xs) ? xs : "";
    this.requestUpdate(VALUE_NAME, prevValue);
  }

  _name;
  get name() {
    return !isset(this._name) ? "" : this._name;
  }

  set name(xs) {
    const {name: prevName} = this;
    this._name = isset(xs) ? xs : "";
    this.requestUpdate(NAME_NAME, prevName);
  }

  _tabIndex;
  get tabIndex() {
    return !isset(this._tabIndex) ? 0 : this._tabIndex;
  }

  set tabIndex(x) {
    const {_tabIndex: prevTabIndex} = this;
    this._tabIndex = !isset(x) ? 0 : Number(x);
    this.requestUpdate(TABINDEX_NAME, prevTabIndex);
  }

  get type() {
    return this.localName;
  }

  get willValidate() {
    return this._internals ? this._internals.willValidate : false;
  }

  get validity() {
    return this._internals ? this._internals.validity : undefined;
  }

  get validationMessage() {
    return this._internals ? this._internals.validationMessage : "";
  }

  get form() {
    return this._internals ? this._internals.form : null;
  }

  get labels() {
    return this._internals ? this._internals.labels : undefined;
  }

  _xFormControlInitialized = false;
  //
  // constructor() {
  //   super();
  //   this._internals = this.attachInternals();
  //   Object.assign(this, {
  //     defaultValue: '',
  //     tabIndex: 0,
  //     required: false,
  //     disabled: false,
  //     readOnly: false,
  //   });
  // }

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

  setCustomValidity(message = "") {
    if (!this._internals) return;
    this._internals.setValidity(
      message ? {customError: true} : {},
      message || "",
    );
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._xFormControlInitialized && this.isConnected) {
      this._xFormControlInitialized = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._xFormControlInitialized) {
      this._xFormControlInitialized = false;
    }
  }

  _onFormData() {
    throwNoOverrideError();
  }

  formAssociatedCallback(form) {
    if (this.name && form.elements[this.name]) {
      form.addEventListener("formdata", this._onFormData);
      this.updateValidity();
    } else {
      form.removeEventListener("formdata", this._onFormData);
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
