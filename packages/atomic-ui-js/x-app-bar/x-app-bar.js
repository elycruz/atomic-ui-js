import {debounce, log} from '../utils/index.js';

/**
 * @type {string}
 */
export const xAppBarName = 'x-app-bar';

/**
 * @note Component functions as a decorator.
 *
 * @todo Re-name component to x-appbar-decorator.
 */
export class XAppBarElement extends HTMLElement {
  static localName = xAppBarName;

  #parentSelector = '';
  get parentSelector() {
    return this.#parentSelector;
  }

  set parentSelector(str) {
    this.#parentSelector = str;
  }

  /**
   * @type {Element | Document}
   */
  #selectedParent = null;
  get selectedParent() {
    if (!this.#selectedParent) {
      this.#selectedParent = !this.parentSelector ?
        this.ownerDocument.scrollingElement :
        this.ownerDocument.querySelector(this.parentSelector);
    }

    return this.#selectedParent;
  }

  #auxAppBarMode = false;
  get auxAppBarMode() {
    return Boolean(this.#auxAppBarMode);
  }

  set auxAppBarMode(bln) {
    this.#auxAppBarMode = Boolean(bln);
  }

  #initialized = false;

  /**
   * @type {IntersectionObserver}
   */
  #intersectObserver;

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#intersectObserver = new IntersectionObserver((records) => {
        log('intersection observed;  Records:', records);

        records.forEach(() => {
          // @todo Call internal div manipulation method, as required, here
          // @note manipulation method needs to set property that would be inspected
          //   from `onParentScroll` method (something like 'intersected' to signal that the
          //   'onscroll' inspection should be suspended).
        });
      }, {root: this.selectedParent, rootMargin: '16px'});

      this.#intersectObserver.observe(this);
      this.selectedParent.addEventListener('scroll', this.onParentScroll);

      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#intersectObserver.unobserve(this);
      this.selectedParent.removeEventListener('scroll', this.onParentScroll);

      this.#initialized = false;
    }
  }

  onParentScroll = debounce(() => {
    // const p = e.currentTarget
    //
    // if (p.scrollTop > this.offsetHeight + this.offsetTop) {
    // }
    return null;
  }, 377);
}
