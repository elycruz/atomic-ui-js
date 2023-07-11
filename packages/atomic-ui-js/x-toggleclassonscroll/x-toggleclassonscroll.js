import {ReactiveElement} from 'lit';

import {
  CLASSNAME_TO_TOGGLE_NAME,
  CONTAINER_NAME,
  CONTAINER_SELECTOR_NAME,
  isset,
  isUsableNumber,
  replaceClass,
  ROOT_MARGIN_NAME,
  SCROLLABLE_PARENT_NAME,
  SCROLLABLE_PARENT_SELECTOR_NAME,
  THRESHHOLD_NAME,
  toggleClass,
  typeOf
} from '../utils/index.js';

export const xToggleClassOnScrollName = 'x-toggleclassonscroll';

const

  // Flags
  INITIALIZED = 0x02,
  DISCONNECTED = 0X04,
  CLASSNAME_SHOWING = 0X08,

  {isArray} = Array;

/**
 * @class XToggleClassOnScrollElement
 * @element x-toggleclassonscroll
 *
 * An element for quickly setting up a classname toggle when a container element scrolls in/out from view.
 *
 * @extends {ReactiveElement & HTMLElement}
 */
export class XToggleClassOnScrollElement extends ReactiveElement {
  static localName = xToggleClassOnScrollName;

  static properties = {
    [CLASSNAME_TO_TOGGLE_NAME]: {type: String},
    [CONTAINER_SELECTOR_NAME]: {type: String, attribute: CONTAINER_NAME},
    [ROOT_MARGIN_NAME]: {type: String},
    [SCROLLABLE_PARENT_SELECTOR_NAME]: {type: String, attribute: SCROLLABLE_PARENT_NAME},
    [THRESHHOLD_NAME]: {
      converter: {
        fromAttribute: (value) => {
          if (!isset(value)) return 1;

          let newValue = value.trim();

          try {
            newValue = JSON.parse(newValue);
          } catch {
            return 1;
          }

          return isUsableNumber(newValue) || isArray(newValue) ? newValue : 1;
        }
      },
      hasChanged(newValue, prevValue) {
        if (!isset(newValue) || !isset(prevValue)) {
          return newValue !== prevValue;
        }

        if (isArray(newValue) && isArray(prevValue)) {
          return JSON.stringify(newValue) !== JSON.stringify(prevValue);
        }

        return !Object.is(newValue, prevValue);
      }
    },
  };

  /**
   * @type {string}
   */
  #scrollableParentSelector;

  get scrollableParentSelector() {
    return this.#scrollableParentSelector ?? '';
  }

  set scrollableParentSelector(str) {
    const prevValue = this.scrollableParentSelector;

    this.#scrollableParentSelector = (str ?? '') + '';

    // Force scrollable parent re-fetch
    this.#scrollableParent = null;
    this.requestUpdate(SCROLLABLE_PARENT_SELECTOR_NAME, prevValue);
  }

  /**
   * @type {Element | Document}
   */
  #scrollableParent;

  /**
   * @type {Element | Document}
   */
  get scrollableParent() {
    if (!this.#scrollableParent && this.scrollableParentSelector) {
      this.#scrollableParent = this.ownerDocument?.querySelector(this.scrollableParentSelector);
    }

    return this.#scrollableParent;
  }

  /**
   * @type {string}
   */
  #containerSelector;

  get containerSelector() {
    return this.#containerSelector ?? '';
  }

  set containerSelector(str) {
    const prevValue = this.containerSelector;
    this.#containerSelector = (str ?? '') + '';
    this.#container = null;
    this.requestUpdate(CONTAINER_SELECTOR_NAME, prevValue);
  }

  /**
   * Container to observe/toggle class on.
   *
   * @type {Element | Document}
   */
  #container;

  /**
   * @type {Element | Document}
   */
  get container() {
    if (!this.#container) {
      this.#container = this.#containerSelector ?
        this.ownerDocument?.querySelector(this.#containerSelector) :
        this;
    }

    return this.#container;
  }

  set container(str) {
    this.containerSelector = str;
  }

  /**
   * @type {number | Array<number>}
   */
  #threshold;

  /**
   * @type {number|Array<number>}
   */
  get threshold() {
    return this.#threshold ?? 1;
  }

  set threshold(x) {
    const prevValue = this.threshold;

    let newValue = !isset(x) ? 1 : x;

    switch (typeOf(newValue)) {
    case Number.name:
    case Array.name:
      break;
    case String.name:
    default:
      try {
        newValue = JSON.parse(newValue + '');
      } catch {
        newValue = 1;
      }
      break;
    }

    this.#threshold = isUsableNumber(newValue) || isArray(newValue) ?
      newValue :
      1;

    this.requestUpdate(THRESHHOLD_NAME, prevValue);
  }

  #flags = 0x00;

  /**
   * @type {IntersectionObserver}
   */
  #intersectionObserver;

  constructor() {
    super();

    this.classNameToToggle = '';
    this.rootMargin = '0px';
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    // Only (re-)initialize observers if element has recently undergone disconnection,
    // and is connected
    if (!(this.#flags & INITIALIZED) && (this.#flags & DISCONNECTED) && this.isConnected) {
      this.#flags |= INITIALIZED;
      this.#flags &= ~DISCONNECTED;
      this.#refreshObservers();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Mark as 'disconnected', if not already marked
    if (!(this.#flags & DISCONNECTED))
      this.#flags |= DISCONNECTED;

    if (this.#flags & INITIALIZED) {
      this.#clearObservers();
      this.#flags &= ~INITIALIZED;
    }
  }

  adoptedCallback() {
    super.adoptedCallback();

    this.connectedCallback();
  }

  update(_changedProps) {
    super.update(_changedProps);

    const classNameToToggle = this[CLASSNAME_TO_TOGGLE_NAME],
      prevClassNameToToggle = _changedProps.get(CLASSNAME_TO_TOGGLE_NAME);

    if ((this.#flags & CLASSNAME_SHOWING) && _changedProps.has(CLASSNAME_TO_TOGGLE_NAME)) {
      replaceClass(prevClassNameToToggle, classNameToToggle, this.container) ||
      toggleClass(classNameToToggle, this.container, true);
    }
  }

  updated(_changedProps) {
    this.updateComplete.then(() => {
      const containerSelectorChanged = _changedProps.has(CONTAINER_SELECTOR_NAME),
        scrollableParentSelectorChanged = _changedProps.has(SCROLLABLE_PARENT_SELECTOR_NAME),
        rootMarginChanged = _changedProps.has(ROOT_MARGIN_NAME),
        thresholdChanged = _changedProps.has(THRESHHOLD_NAME);

      if (scrollableParentSelectorChanged || containerSelectorChanged ||
        rootMarginChanged || thresholdChanged) {
        this.#refreshObservers();
      }
    });
  }

  #toggleClassToToggle = (isIntersecting) => {
    const classToToggle = this.classNameToToggle;

    if (isIntersecting && !(this.#flags & CLASSNAME_SHOWING)) this.#flags |= CLASSNAME_SHOWING;
    else if (!isIntersecting) this.#flags &= (~CLASSNAME_SHOWING);

    return Boolean(classToToggle) &&
      this.container.classList.toggle(classToToggle, isIntersecting);
  };

  #clearObservers() {
    if (this.#intersectionObserver) {
      this.#intersectionObserver.unobserve(this.container);
      this.#intersectionObserver.disconnect();
    }
  }

  #refreshObservers() {
    this.#clearObservers();

    const obsrvrOptions = {
        rootMargin: this.rootMargin,
        threshold: this.threshold
      },
      {scrollableParent} = this;

    if (scrollableParent) obsrvrOptions.root = scrollableParent;

    this.#intersectionObserver = new IntersectionObserver(records => {
      records.forEach(r => {
        this.#toggleClassToToggle(r.isIntersecting);
      });
    }, obsrvrOptions);

    this.#intersectionObserver.observe(this.container);
  }
}
