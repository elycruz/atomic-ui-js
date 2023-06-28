import {CLASS_NAME_ON_INTERSECT_NAME, isset} from "../utils/index.js";
import {ReactiveElement} from 'lit';

export const xToggleOnScrollName = 'x-ToggleOnScroll';

const intersectionObserver = new IntersectionObserver(records => {
    records.forEach(r => r.update(r));
  }),

  CLASSNAME_TO_TOGGLE_NAME = 'classNameToToggle';

export class XToggleOnScrollElement extends ReactiveElement {
  static localName = xToggleOnScrollName;

  static properties = {
    [CLASSNAME_TO_TOGGLE_NAME]: {type: String}
  };

  #initialized = false;

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

  updated(_changed) {
    if (_changed.has(CLASSNAME_TO_TOGGLE_NAME)) {

    }
  }

  #initializeIntersectObserver() {

  }

  #addListeners() {
    return this;
  }

  #removeListeners() {
    return this;
  }
}
