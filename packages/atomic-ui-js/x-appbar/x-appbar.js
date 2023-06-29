import {
  addClass,
  hasClass,
  removeClass,
  debounce,
  CLASS_NAME_ON_INTERSECT_NAME,
  error, isUsableNumber, toNumberOr,
} from '../utils/index.js';

import {ReactiveElement} from "lit";

/**
 * @type {string}
 */
export const xAppbarName = 'x-appbar';

export const xAppbarEvents = {
  Intersected: `${xAppbarName}-intersected`,
  NotIntersected: `${xAppbarName}-not-intersected`
};

const {Intersected, NotIntersected} = xAppbarEvents,
  HIDDEN_CLASSNAME_NAME = 'hiddenClassName',
  VISIBLE_CLASSNAME_NAME = 'visibleClassName',
  PARENT_SELECTOR_NAME = 'parentSelector',
  DEBOUNCE_DELAY_NAME = 'debounceDelay',
  MARGIN_TOP_NAME = 'marginTop'
;

/**
 * @note Component functions as a decorator.
 *
 * @todo Re-name component to x-appbar-decorator.
 */
export class XAppbarElement extends ReactiveElement {
  static localName = xAppbarName;

  static properties = {
    [HIDDEN_CLASSNAME_NAME]: {type: String, attribute: true},
    [VISIBLE_CLASSNAME_NAME]: {type: String, attribute: true},
    [PARENT_SELECTOR_NAME]: {type: String, attribute: true},
    [DEBOUNCE_DELAY_NAME]: {type: Number, attribute: true},
    [MARGIN_TOP_NAME]: {type: Number, attribute: true},
  };

  /**
   * @type {string}
   */
  #hiddenClassName = 'x--hidden';
  get hiddenClassName() {
    return this.#hiddenClassName ?? '';
  }

  set hiddenClassName(str) {
    const prevValue = this.#hiddenClassName,
      newValue = str ? str + '' : '';

    this.#hiddenClassName = newValue;

    // If no toggle classname, to new value, is required, return
    if (prevValue === newValue) {
      return;
    }

    // Toggle classname to new value if required
    if (prevValue && hasClass(prevValue, this)) {
      removeClass(prevValue, this);
      addClass(newValue, this);
    }

    this.requestUpdate(HIDDEN_CLASSNAME_NAME, prevValue);
  }

  #visibleClassName = 'x--visible';
  get visibleClassName() {
    return this.#visibleClassName ?? '';
  }

  set visibleClassName(str) {
    const prevValue = this.#visibleClassName,
      newValue = str ? str + '' : '';

    this.#visibleClassName = newValue;

    // If no toggle classname, to new value, is required, return
    if (prevValue === newValue) {
      return;
    }

    // Toggle classname to new value if required
    if (prevValue && hasClass(prevValue, this)) {
      removeClass(prevValue, this);
      addClass(newValue, this);
    }

    this.requestUpdate(VISIBLE_CLASSNAME_NAME, prevValue);
  }

  /**
   * @type {string}
   */
  #parentSelector;
  get parentSelector() {
    return this.#parentSelector ?? '';
  }

  set parentSelector(str) {
    const {parentSelector: prevValue, hiddenClassName} = this,
      newValue = str ? str + '' : '';

    if (prevValue === newValue || !hiddenClassName) {
      this.#parentSelector = newValue;
      this.requestUpdate(PARENT_SELECTOR_NAME, prevValue);
      return;
    }

    const {selectedParent: prevParent} = this;

    this.#parentSelector = newValue;

    // Force selected parent to be re-selected (using new parent selector)
    this.#selectedParent = null;

    this.#initializeListeners(prevParent, this.selectedParent);
    this.requestUpdate(PARENT_SELECTOR_NAME, prevValue);
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

  /**
   * @type {boolean}
   */
  #intersected = false;
  get intersected() {
    return this.#intersected ?? false;
  }

  /**
   * @type {number}
   */
  #marginTop = 0;
  get marginTop() {
    return this.#marginTop ?? 0;
  }

  set marginTop(n) {
    const prevValue = this.debounceDelay;
    this.#marginTop = toNumberOr(n, 0);
    this.requestUpdate(MARGIN_TOP_NAME, prevValue);
  }

  /**
   * @type {number}
   */
  #debounceDelay = 233;
  get debounceDelay() {
    return this.#debounceDelay ?? 233;
  }

  set debounceDelay(x) {
    const prevValue = this.debounceDelay;
    this.#debounceDelay = toNumberOr(x, 233);
    this.requestUpdate(DEBOUNCE_DELAY_NAME, prevValue);
  }

  #initialized = false;
  #appbarContentHeight;

  /**
   * Allows to capture dimension changes on appbar content element.
   *
   * @type {ResizeObserver}
   */
  #resizeObserver;

  /**
   * Tracks the last scrollbar 'top' position, for the selected parent.
   *
   * @type {number}
   */
  #lastScrollTop = 0;

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#initializeListeners(null, this.selectedParent);
      this.#onParentScroll();
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.selectedParent?.removeEventListener('scroll', this.#onParentScroll);

      this.#initialized = false;
    }
  }

  willUpdate(_changed) {
    if (_changed.has(DEBOUNCE_DELAY_NAME)) {
      this.#onParentScroll = debounce(
        this.#onParentScrollUnDebounced,
        this.#debounceDelay
      );
    }

    if (_changed.has(VISIBLE_CLASSNAME_NAME) ||
      _changed.has(HIDDEN_CLASSNAME_NAME) ||
      _changed.has(PARENT_SELECTOR_NAME)) {
      this.#onParentScroll();
    }
  }

  #toggleIntersectState(isIntersecting) {
    if (this.intersected === isIntersecting) return;

    const _isIntersecting =
      this.#intersected = Boolean(isIntersecting);

    this.classList.toggle(this.hiddenClassName, !_isIntersecting);

    this.dispatchEvent(new CustomEvent(
      _isIntersecting ? Intersected : NotIntersected, {
        bubbles: true,
        composed: true
      }));
  }

  #initializeListeners(oldParent, newParent) {
    if (oldParent) oldParent.removeEventListener('scroll', this.#onParentScroll);

    if (this.#resizeObserver) this.#resizeObserver.unobserve(this);

    this.#resizeObserver = new ResizeObserver(records => {
      records.forEach(r => {
        const bbox = r.target.getBoundingClientRect();
        this.#appbarContentHeight = bbox.height;
      });
    });

    this.#resizeObserver.observe(this);

    newParent.removeEventListener('scroll', this.#onParentScroll);
    newParent.addEventListener('scroll', this.#onParentScroll);

    return this;
  }

  #onParentScrollUnDebounced = () => {
    const {selectedParent: p, visibleClassName} = this,
      intersectionPoint = this.marginTop + this.#appbarContentHeight,
      hasFocusWithin = this.matches(':focus-within');

    this.#toggleIntersectState(p.scrollTop <= intersectionPoint);

    if (p.scrollTop > intersectionPoint && p.scrollTop < this.#lastScrollTop) {
      this.classList.toggle(visibleClassName, true);
    } else if (hasClass(visibleClassName, this) && !hasFocusWithin) {
      removeClass(visibleClassName, this);
    }

    this.#lastScrollTop = p.scrollTop;
  };

  #onParentScroll = debounce(
    this.#onParentScrollUnDebounced,
    this.debounceDelay
  );
}
