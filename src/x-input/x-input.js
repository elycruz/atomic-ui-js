import {XFormControl} from "../x-base/x-form-control";

const isset = x => x !== null && x !== undefined,

  {log, error} = console,

  xInputName = 'x-input',

  xInputStyles = `
:host {
    background-color: green;
}

:host {
    display: inline-block;
}

:host(:invalid) input {
  border: 1px solid red;
}
`,
  xInputStyleSheet = new CSSStyleSheet();

class XInput extends XFormControl {
  _disabled_value = '';
  _disabled_defaultValue = '';
  _disabled_disabled = false;
  _disabled_required = false;
  _disabled_name = '';
  _disabled_internals = null;
  _disabled_initialized = false;
  _disabled_tabIndex = 0;

  static _disabled_styleSheetAdopted = false;

  get defaultValue() {
    return this._disabled_defaultValue;
  }

  set defaultValue(xs) {
    this._disabled_defaultValue =
      this.value = isset(xs) ? xs + '' : '';
    this.setAttribute('value', this._disabled_value);
  }

  get value() {
    return this._disabled_value;
  }

  set value(x) {
    this._disabled_value = isset(x) ? x + '' : '';
    this.onUpdateValue();
    this._disabled_internals.setFormValue(this._disabled_value);
  }

  get labels() {
    return this._disabled_internals.labels;
  }

  get form() {
    return this._disabled_internals.form;
  }

  get localName() {
    return xInputName;
  }

  get name() {
    return this._disabled_name;
  }

  set name(x) {
    this._disabled_name = isset(x) ? x + '' : '';
  }

  get required() {
    return this._disabled_required;
  }

  set required(x) {
    this.#_required = Boolean(x);
  }

  get disabled() {
    return this.#_disabled;
  }

  set disabled(x) {
    this.#_disabled = Boolean(x);
  }

  get tabIndex() {
    return isset(this.#_tabIndex) ? this.#_tabIndex : 0;
  }

  set tabIndex(x) {
    this.#_tabIndex = isset(x) ? parseInt(x, 10) : 0;
    this.setAttribute('tabindex', this.#_tabIndex);
  }

  get willValidate() {
    return this.#_internals?.willValidate;
  }

  get validity() {
    return this.#_internals?.validity;
  }

  get validationMessage() {
    return this.#_internals?.validationMessage;
  }

  #_setValidity(validityState, validationMessage, anchor) {
    if (validityState?.valid || !isset(validationMessage)) {
      this.#_internals.setValidity({});
    } else {
      this.#_internals.setValidity(validityState, validationMessage, anchor);
    }
  }

  #_onChange = e => {
    this.value = e.target.value;
  };

  #_onFormData = e => {
    const {name, value} = this;
    if (!name) return;
    e.formData.set(name, value);
  };

  constructor() {
    super();
    this.#_internals = this.attachInternals();
    this.attachShadow({mode: 'open', delegatesFocus: true});
    this.shadowRoot.adoptedStyleSheets.push(xInputStyleSheet);
    this.shadowRoot.innerHTML = '<input>';
    this.shadowRoot.addEventListener('input', this.#_onChange);
    this.shadowRoot.addEventListener('change', this.#_onChange);
    this.addEventListener('formdata', this.#_onFormData);
  }

  connectedCallback() {
    if (!this.#_initialized && this.isConnected) {
      if (!this.constructor.#_styleSheetAdopted) {
        xInputStyleSheet.replace(xInputStyles)
          .then(() => {
            this.constructor.#_styleSheetAdopted = true;
          })
          .catch(error);
        this.#_initialized = true;
      }

      if (!this.hasAttribute('tabindex')) {
        this.tabIndex = 0;
      }
    }
  }

  onUpdateValue() {
    if (!this.matches(':disabled') && !this.value && this.hasAttribute('required')) {
      this.#_setValidity({valueMissing: true}, 'Custom "Required" Message: Please fill out this field.', this.shadowRoot.firstElementChild);
    } else {
      this.#_setValidity({});
    }
  }

  formResetCallback() {
    this.value = this.defaultValue;
    this.shadowRoot.firstElementChild.value = this.value;
  }
}


if (!window.customElements.get(xInputName)) customElements.define(xInputName, XInput);


document.body.innerHTML = `
<style>
html, body {
  font-family: Arial, Helvetica, Verdana, Sans-Serif;
}

fieldset {
  border-radius: 5px;
  border: 2px solid _CCC;
  padding: 13px;
}

fieldset + fieldset {
    margin-top: 13px;
}

x-input:invalid {
  border: 1px solid red;
}
</style>

<form action="_">
<fieldset>
  <legend>XInput Test</legend>
  <x-input name="${xInputName}" id="${xInputName}" required></x-input>
</fieldset>
<fieldset>
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</fieldset>
</form>
`;

const {forms: [form]} = document;

form.addEventListener('input', log);
form.addEventListener('change', e => log(e.currentTarget));
form.addEventListener('submit', e => {
  e.preventDefault();
  log(JSON.stringify(
      Array.from(new FormData(e.currentTarget).entries())
    )
  );
});

form.elements[xInputName].addEventListener('invalid', e => {
  const {target} = e;
  log(e, target, target.validity);
})
