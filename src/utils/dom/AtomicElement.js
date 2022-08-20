export class AtomicElement extends HTMLElement {
  static styles = null;
  static properties = null;
  static localName = '';
  static shadowRootOptions = {mode: 'open'};

  #__initialized = false;

  get localName() {
    return this.constructor.localName;
  }

  constructor() {
    super();
    if (this.createRenderRoot) this.createRenderRoot();
  }

  createRenderRoot() {
    const {styles, shadowRootOptions} = this.constructor;
    this.attachShadow(shadowRootOptions);
    if (styles) this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    if (!this.#__initialized && this.isConnected) {
      this.render();
      this.#__initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#__initialized) {
      this.#__initialized = false;
    }
  }

  addEventListeners() {
  }

  removeEventListeners() {
  }

  requestUpdate() {
  }

  willUpdate() {
  }

  shouldUpdate() {
  }

  firstUpdated() {
  }

  update() {
  }

  updated() {
  }

  render() {
    return '';
  }
}

