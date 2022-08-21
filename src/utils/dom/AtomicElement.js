export class AtomicElement extends HTMLElement {
  static styles = null;
  static properties = null;
  static localName = '';
  static shadowRootOptions = {mode: 'open'};

  ___initialized = false;
  ___updateComplete;

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
    if (!this.___initialized && this.isConnected) {
      this.render();
      this.___initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.___initialized) {
      this.___initialized = false;
    }
  }

  addEventListeners() {
  }

  removeEventListeners() {
  }

  requestUpdate(propName, prevValue) {

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

