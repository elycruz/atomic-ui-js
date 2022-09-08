export class AtomicElement extends HTMLElement {
  static styles = null;
  static properties = null;
  static localName = '';
  static shadowRootOptions = {mode: 'open'};

  #initialized = false;

  #_updates;

  _updateComplete;

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

  #updateReactiveProperty(propName, prevValue) {
  }

  requestUpdate(propName, prevValue) {
    const updates = this.#_updates || {},
      {observedAttributes, properties} = this.constructor
      ;
    if (!properties || !observedAttributes || !observedAttributes.length) return;
    const cfg = properties[propName];
    if (!cfg) return;
    if (!this.shouldUpdate(propName, prevValue)) return;
    this.#updateReactiveProperty(propName, prevValue, cfg);
    this.#_updates = updates;
  }

  willUpdate() {
  }

  shouldUpdate(propName, propValue) {
    return true;
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
