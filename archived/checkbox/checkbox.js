import {unsafeCSS, html} from 'lit';

import {XFormControl} from "../x-base/index.js";
import {CHECKED_NAME, DEFAULT_CHECKED_NAME} from "../../constants.js";
import styles from './checkbox.css' assert {type: 'css'};

export const xCheckboxName = 'x-checkbox',
  xCheckboxType = 'checkbox'
;

export class XCheckbox extends XFormControl {
  static localName = xCheckboxName;

  static properties = {
    ...XFormControl.properties,
    defaultChecked: {type: Boolean, reflect: true, attribute: CHECKED_NAME},
    checked: {type: Boolean, attribute: false},
  }

  static styles = unsafeCSS(styles);

  #checked = false;
  #internals = null;
  #defaultChecked = false;

  get defaultChecked() {
    return this.#defaultChecked;
  }

  set defaultChecked(bln) {
    const oldValue = this.#defaultChecked;
    const oldChecked = this.#checked;

    this.checked =
      this.#defaultChecked = bln;

    this.requestUpdate(CHECKED_NAME, oldChecked);
    this.requestUpdate(DEFAULT_CHECKED_NAME, oldValue);
  }

  get checked() {
    return this.#checked;
  }

  set checked(bln) {
    const oldBln = this.#checked,
      newBln = Boolean(bln);

    this.#checked = newBln;

    if (this.#internals) {
      this.#internals.ariaChecked = newBln + '';
      this.setFormValue(newBln ? this.value : null);
    } else {
      this.updateComplete.then(() => {
        this.ariaChecked = newBln + '';
      });
    }

    this.requestUpdate(CHECKED_NAME, oldBln);
  }

  get type() {
    return xCheckboxType;
  }

  get input() {
    return this.assignedNodes({flatten: true});
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  render() {
    return html`<slot><input type="checkbox" /></slot>`
  }
}
