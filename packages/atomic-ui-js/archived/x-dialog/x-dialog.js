// Type assertions not yet supported by firefox - css now loaded in `connectedCallback()`.
// import xDialogStyleSheet from './ez-dialog.css' assert {type: "css"};
import { error } from "../js/utils/index.js";

export const xDialogLocalName = "ez-dialog",
  xDialogStyles = `
  :host dialog::backdrop {
    background: rgba(0,0,0,0) !important;
  }
  `,
  xDialogStyleSheet = new CSSStyleSheet();

export class EzDialog extends HTMLElement {
  _disabled_initialized = false;
  _disabled_styleSheetInitialized = false;

  isModal = false;
  opened = false;

  get _disabled_dialog() {
    return this.shadowRoot.firstElementChild;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.shadowRoot.innerHTML = "<dialog><slot></slot></dialog>";
    if (this.shadowRoot.adoptedStyleSheets) {
      this.shadowRoot.adoptedStyleSheets.push(xDialogStyleSheet);
    } else this.shadowRoot.adoptedStyleSheets = [xDialogStyleSheet];
    // Captures events from child elements outside of `shadowRoot`:
    this.addEventListener("reset", this._disabled_onCloseViaForm);
    this.addEventListener("submit", this._disabled_onCloseViaForm);
  }

  show() {
    this._disabled_dialog.show();
    this.opened = true;
  }

  showModal() {
    this.shadowRoot.firstElementChild?.showModal();
    this.opened = true;
  }

  close(retValue) {
    this._disabled_dialog.close(retValue);
    this.opened = false;
  }

  open() {
    const dialog = this._disabled_dialog;
    if (!dialog.open) {
      if (this.isModal) dialog.showModal();
      else dialog.show();
    }
    this.opened = true;
  }

  connectedCallback() {
    if (!this._disabled_initialized && this.isConnected) {
      if (!this._disabled_styleSheetInitialized) {
        xDialogStyleSheet.replace(xDialogStyles)
          .then(() => {
            this._disabled_styleSheetInitialized = true;
          }).catch(error);
      }
      this._disabled_dialog.removeEventListener(
        "cancel",
        this._disabled_onClose,
      );
      this._disabled_dialog.addEventListener("cancel", this._disabled_onClose);
      this._disabled_initialized = true;
    }
  }

  disconnectedCallback() {
    if (this._disabled_initialized) {
      this._disabled_dialog.removeEventListener("cancel", this.#_onClose);
      this.#_initialized = false;
    }
  }

  #_onCloseViaForm(e) {
    const { target } = e;
    if (target.localName === "form" && target.method === "dialog") {
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
  customElements.define(xDialogLocalName, EzDialog);
}
