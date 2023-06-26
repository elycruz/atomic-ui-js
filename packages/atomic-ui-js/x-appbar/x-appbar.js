import {
  addClass,
  CLASS_NAME_ON_INTERSECT_NAME,
  hasClass,
  log,
  PARENT_SELECTOR_NAME,
  removeClass
} from '../utils/index.js';

/**
 * @type {string}
 */
export const xAppbarName = 'x-appbar';

export const xAppbarEvents = {
    Intersected: `${xAppbarName}-intersected`,
    NotIntersected: `${xAppbarName}-not-intersected`
  },
  xAppbarObservedAttribs = [CLASS_NAME_ON_INTERSECT_NAME, PARENT_SELECTOR_NAME];

const {Intersected, NotIntersected} = xAppbarEvents;

/**
 * @note Component functions as a decorator.
 *
 * @todo Re-name component to x-appbar-decorator.
 */
export class XAppbarElement extends HTMLElement {
  static localName = xAppbarName;
  static observedAttributes = Object.freeze(xAppbarObservedAttribs);

  /**
   * @type {string}
   */
  #classNameOnIntersect;
  get classNameOnIntersect() {
    return this.#classNameOnIntersect ?? '';
  }

  set classNameOnIntersect(str) {
    const prevValue = this.#classNameOnIntersect,
      newValue = str ? str + '' : '';

    this.#classNameOnIntersect = newValue;

    // If no toggle classname, to new value, is required, return
    if (prevValue === newValue || !prevValue) {
      return;
    }

    // Toggle classname to new value if required
    if (hasClass(prevValue, this)) {
      removeClass(prevValue, this);
      addClass(newValue, this);
    }
  }

  /**
   * @type {string}
   */
  #parentSelector;
  get parentSelector() {
    return this.#parentSelector ?? '';
  }

  set parentSelector(str) {
    const {parentSelector: prevValue, classNameOnIntersect} = this,
      newValue = str ? str + '' : '';

    if (prevValue === newValue || !classNameOnIntersect) {
      this.#parentSelector = newValue;
      return;
    }

    const {selectedParent: prevParent} = this;

    this.#parentSelector = newValue;

    // Force selected parent to be re-selected (using new parent selector)
    this.#selectedParent = null;

    this.#processParentChange(prevParent, this.selectedParent);
  }

  /**
   * @type {Element | Document}
   */
  #selectedParent;
  get selectedParent() {
    if (!this.#selectedParent) {
      this.#selectedParent = !this.parentSelector ?
        this.ownerDocument.scrollingElement :
        this.ownerDocument.querySelector(this.parentSelector);
    }

    return this.#selectedParent;
  }

  #auxAppbarMode = false;
  get auxAppbarMode() {
    return Boolean(this.#auxAppbarMode);
  }

  set auxAppbarMode(bln) {
    this.#auxAppbarMode = Boolean(bln);
  }

  /**
   * @type {boolean}
   */
  #intersected = false;

  get intersecting() {
    return this.#intersected ?? false;
  }

  #initialized = false;

  /**
   * @type {IntersectionObserver}
   */
  #intersectObserver;

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#processParentChange(null, this.selectedParent);

      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#intersectObserver.unobserve(this);
      this.selectedParent.removeEventListener('scroll', this.#onParentScroll);

      this.#initialized = false;
    }
  }

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) return;

    log('attrib changed', ...arguments);
    switch (name) {
    case PARENT_SELECTOR_NAME:
    case CLASS_NAME_ON_INTERSECT_NAME:
      this[name] = nextValue;
      return;
    default:
      return;
    }
  }

  update(isIntersecting) {
    const _isIntersecting =
      this.#intersected = Boolean(isIntersecting);

    if (this.classNameOnIntersect)
      this.classList.toggle(this.classNameOnIntersect, !_isIntersecting);

    this.dispatchEvent(new CustomEvent(
      _isIntersecting ? Intersected : NotIntersected, {
        bubbles: true,
        composed: true
      }));
  }

  #processParentChange(oldParent, newParent) {
    if (oldParent) oldParent.removeEventListener('scroll', this.#onParentScroll);
    if (this.#intersectObserver) this.#intersectObserver.unobserve(this);

    this.#intersectObserver = new IntersectionObserver((records) => {
      records.forEach(r => {
        // @todo Call internal div manipulation method, as required, here
        // @note manipulation method needs to set property that would be inspected
        //   from `onParentScroll` method (something like 'intersected' to signal that the
        //   'onscroll' inspection should be suspended).

        r.target.update(r.isIntersecting);
      });
    }, {root: newParent, rootMargin: '16px'});

    this.#intersectObserver.observe(this);

    newParent.removeEventListener('scroll', this.#onParentScroll);
    newParent.addEventListener('scroll', this.#onParentScroll);
  }

  #onParentScroll = () => {
    if (this.#intersected) return;
    // const p = e.currentTarget;
    //
    // if (p.scrollTop > this.offsetHeight + this.offsetTop) {
    // }

    log('scrolling');
    return null;
  };
}
