export class AtomicElement extends HTMLElement {
  static styles = null;
  static properties = null;
  static localName = '';
  static shadowRootOptions = {mode: 'open'};

  #initialized = false;
  _updateComplete;
  #_updates;

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
    if (!this.#initialized && this.isConnected) {
      this.render();
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#initialized = false;
    }
  }

  requestUpdate(propName, prevValue) {
    const updates = this.#_updates || {},
      {observedAttributes, properties} = this.constructor
      ;
    for (const [k, v] of Object.entries(properties)) {
      console.log(k, v);
    }
    this.#_updates = updates;
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
