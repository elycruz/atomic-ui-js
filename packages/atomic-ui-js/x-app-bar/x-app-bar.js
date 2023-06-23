import {log} from '../utils/index.js';

export const xAppBarName = 'x-app-bar';

export class XAppBarElement extends HTMLElement {
  static localName = xAppBarName;

  #initialized = false;

  /**
   * @type {IntersectionObserver}
   */
  #intersectObserver;

  /**
   * @type {Element | Document}
   */
  #selectedParent = null;

  #parentSelector = '';
  get parentSelector() {
    return this.#parentSelector;
  }

  set parentSelector(str) {
    this.#parentSelector = str + '';
  }

  get selectedParent() {
    if (!this.#selectedParent) {
      this.#selectedParent = !this.parentSelector ?
        this.ownerDocument.scrollingElement :
        this.ownerDocument.querySelector(this.parentSelector);
    }

    return this.#selectedParent;
  }

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#intersectObserver = new IntersectionObserver((records) => {
        log('intersection observed;  Records:', records);
      }, {root: this.selectedParent});
      this.#intersectObserver.observe(this);
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#intersectObserver.unobserve(this);
      this.#intersectObserver = null;
      this.#initialized = false;
    }
  }
}
