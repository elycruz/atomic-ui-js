import styles from './index.css' assert { type: 'css' };

export const xToggleonscrollName = 'x-toggleonscroll',

  XToggleonscrollObservedAttribs = Object.freeze([]);

export class XToggleonscrollElement extends HTMLElement {
  static localName = xToggleonscrollName;
  static observedAttributes = XToggleonscrollObservedAttribs;

  #initialized = false;

  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#removeListeners()
        .#addListeners();
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#removeListeners();
      this.#initialized = false;
    }
  }

  #addListeners() {
    return this;
  }

  #removeListeners() {
    return this;
  }

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) return;

    switch (name) {
    default:
      this[name] = nextValue;
      return;
    }
  }
}
