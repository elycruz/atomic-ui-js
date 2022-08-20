// Type assertions not yet supported by firefox - css now loaded in `connectedCallback()`.
// import xDialogStyleSheet from './x-dialog.css' assert {type: "css"};
import {error} from "../js/utils/index.js";

export const xDialogLocalName = 'x-dialog',

  xDialogStyles = `
  :host dialog::backdrop {
    background: rgba(0,0,0,0) !important;
  }
  `,

  xDialogStyleSheet = new CSSStyleSheet();

export class XDialog extends HTMLElement {
  #_initialized = false;
  #_styleSheetInitialized = false;

  isModal = false;
  opened = false;

  get #_dialog() {
    return this.shadowRoot.firstElementChild;
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open', delegatesFocus: true});
    this.shadowRoot.innerHTML = '<dialog><slot></slot></dialog>';
    if (this.shadowRoot.adoptedStyleSheets) this.shadowRoot.adoptedStyleSheets.push(xDialogStyleSheet);
    else this.shadowRoot.adoptedStyleSheets = [xDialogStyleSheet];
    // Captures events from child elements outside of `shadowRoot`:
    this.addEventListener('reset', this.#_onCloseViaForm);
    this.addEventListener('submit', this.#_onCloseViaForm);
  }

  show() {
    this.#_dialog.show();
    this.opened = true;
  }

  showModal() {
    this.shadowRoot.firstElementChild?.showModal();
    this.opened = true;
  }

  close(retValue) {
    this.#_dialog.close(retValue);
    this.opened = false;
  }

  open() {
    const dialog = this.#_dialog;
    if (!dialog.open) {
      if (this.isModal) dialog.showModal();
      else dialog.show();
    }
    this.opened = true;
  }

  connectedCallback() {
    if (!this.#_initialized && this.isConnected) {
      if (!this.#_styleSheetInitialized) {
        xDialogStyleSheet.replace(xDialogStyles)
          .then(() => {
            this.#_styleSheetInitialized = true;
          }).catch(error);
      }
      this.#_dialog.removeEventListener('cancel', this.#_onClose);
      this.#_dialog.addEventListener('cancel', this.#_onClose);
      this.#_initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#_initialized) {
      this.#_dialog.removeEventListener('cancel', this.#_onClose);
      this.#_initialized = false;
    }
  }

  #_onCloseViaForm(e) {
    const {target} = e;
    if (target.localName === 'form' && target.method === 'dialog') {
      e.preventDefault();
      this.close();
    }
  }

  #_onClose(e) {
    console.log(e);
    this.opened = false;
  }
}

if (!customElements.get(xDialogLocalName)) {
  customElements.define(xDialogLocalName, XDialog);
}
