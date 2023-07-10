import {
  CLASSNAME_TO_TOGGLE_NAME,
  CONTAINER_NAME,
  CONTAINER_SELECTOR_NAME,
  replaceClass, ROOT_MARGIN_NAME, ROOT_NAME,
  SCROLLABLE_PARENT_NAME,
  SCROLLABLE_PARENT_SELECTOR_NAME, THRESHHOLD_NAME,

  toggleClass
} from '../utils/index.js';
import {ReactiveElement} from 'lit';

export const xToggleClassOnScrollName = 'x-toggleclassonscroll';

const

  // Flags
  INITIALIZED = 0x02,
  CLASSNAME_SHOWING = 0X04;

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
    [THRESHHOLD_NAME]: {type: String}, // @todo Update this to allow either an array or an number.
  };

  #flags = 0x00;

  /**
   * @type {IntersectionObserver}
   */
  #intersectionObserver;

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
   * Container to observe/toggle class on.
   *
   * @type {Element | Document}
   */
  #container;

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

  constructor() {
    super();

    this.classNameToToggle = '';
    this.rootMargin = '0px';
    this.threshold = 1; //Array(100).fill(null, 0, 100).map((_, i) => i * .01);
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!(this.#flags & INITIALIZED) && this.isConnected) {
      this.#addListeners();
      this.#flags |= INITIALIZED;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.#flags & INITIALIZED) {
      this.#removeListeners();
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
      prevClassNameToToggle = _changedProps.get(CLASSNAME_TO_TOGGLE_NAME),
      containerSelectorChanged = _changedProps.has(CONTAINER_SELECTOR_NAME),
      scrollableParentSelectorChanged = _changedProps.has(SCROLLABLE_PARENT_SELECTOR_NAME),
      rootMarginChanged = _changedProps.has(ROOT_MARGIN_NAME),
      thresholdChanged = _changedProps.has(THRESHHOLD_NAME);

    if ((this.#flags & CLASSNAME_SHOWING) && _changedProps.has(CLASSNAME_TO_TOGGLE_NAME)) {
      replaceClass(prevClassNameToToggle, classNameToToggle, this) ||
      toggleClass(classNameToToggle, this, true);
    }

    if (scrollableParentSelectorChanged || containerSelectorChanged ||
      rootMarginChanged || thresholdChanged) {
      this.#clearParentListeners()
        .#addParentListeners(this.scrollableParent);
    }
  }

  #toggleClassToToggle = (isIntersecting) => {
    const classToToggle = this.classNameToToggle;

    if (isIntersecting && !(this.#flags & CLASSNAME_SHOWING)) this.#flags |= CLASSNAME_SHOWING;
    else if (!isIntersecting) this.#flags &= (~CLASSNAME_SHOWING);

    return Boolean(classToToggle) &&
      this.classList.toggle(classToToggle, isIntersecting);
  }

  #clearParentListeners() {
    this.#intersectionObserver.unobserve(this.container);
    this.#intersectionObserver.disconnect();
    return this;
  }

  #addParentListeners(scrollableParent) {
    if (this.#intersectionObserver) this.#clearParentListeners();

    const obsrvrOptions = {
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    if (scrollableParent) obsrvrOptions.root = scrollableParent;

    this.#intersectionObserver = new IntersectionObserver(records => {
      records.forEach(r => {
        console.log('Intersection observed.', r);

        this.#toggleClassToToggle(r.isIntersecting);
      });
    }, obsrvrOptions);

    this.#intersectionObserver.observe(this.container);
    return this;
  }

  #addListeners() {
    this.#addParentListeners(this.scrollableParent);
    return this;
  }

  #removeListeners() {
    this.#clearParentListeners();
    return this;
  }
}
