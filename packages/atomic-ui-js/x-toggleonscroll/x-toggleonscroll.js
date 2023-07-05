import {
  CLASSNAME_TO_TOGGLE_NAME,
  CONTAINER_NAME,
  CONTAINER_SELECTOR_NAME,
  replaceClass,
  SCROLLABLE_PARENT_NAME,
  SCROLLABLE_PARENT_SELECTOR_NAME,

  toggleClass
} from '../utils/index.js';
import {ReactiveElement} from 'lit';

export const xToggleOnScrollName = 'x-toggleonscroll';

const

  // Flags
  INITIALIZED = 0x02,
  CLASSNAME_SHOWING = 0X04;

/**
 * @class XToggleOnScrollElement
 * @element x-toggleonscroll
 * @extends {ReactiveElement}
 */
export class XToggleOnScrollElement extends ReactiveElement {
  static localName = xToggleOnScrollName;

  static properties = {
    [CLASSNAME_TO_TOGGLE_NAME]: {type: String, attribute: true},
    [SCROLLABLE_PARENT_SELECTOR_NAME]: {type: String, attribute: SCROLLABLE_PARENT_NAME},
    [CONTAINER_SELECTOR_NAME]: {type: String, attribute: CONTAINER_NAME}
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

    if (prevValue !== this.#scrollableParentSelector) {
      this.#clearParentListeners();
      this.#addParentListeners(this.scrollableParent);
    }

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
      this.#scrollableParent = this.ownerDocument.querySelector(this.scrollableParentSelector);
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

  set containerSelector(x) {
    const prevValue = this.containerSelector;
    this.#containerSelector = (x ?? '') + '';
    this.#container = null;
    if (prevValue !== this.#containerSelector) {
      this.#clearParentListeners()
        .#addParentListeners(this.scrollableParent);
    }
    this.requestUpdate(CONTAINER_SELECTOR_NAME, prevValue);
  }

  /**
   * @type {Element | Document}
   */
  get container() {
    if (!this.#container) {
      this.#container = this.#containerSelector ?
        this.ownerDocument.querySelector(this.#containerSelector) :
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
  }

  connectedCallback() {
    if (!(this.#flags & INITIALIZED) && this.isConnected) {
      this.#addListeners();
      this.#flags |= INITIALIZED;
    }
  }

  disconnectedCallback() {
    if (this.#flags & INITIALIZED) {
      this.#removeListeners();
      this.#flags &= ~INITIALIZED;
    }
  }

  adoptedCallback() {
    this.connectedCallback();
  }

  willUpdate(_changedProps) {
    const classNameToToggle = this[CLASSNAME_TO_TOGGLE_NAME],
      prevClassNameToToggle = _changedProps.get(CLASSNAME_TO_TOGGLE_NAME),
      containerSelectorChanged = _changedProps.has(CONTAINER_SELECTOR_NAME),
      scrollableParentSelectorChanged = _changedProps.has(SCROLLABLE_PARENT_SELECTOR_NAME);

    if ((this.#flags & CLASSNAME_SHOWING) && _changedProps.has(CLASSNAME_TO_TOGGLE_NAME)) {
      replaceClass(prevClassNameToToggle, classNameToToggle, this) ||
      toggleClass(classNameToToggle, this, true);
    }

    if (scrollableParentSelectorChanged || containerSelectorChanged) {
      this.#clearParentListeners()
        .#addParentListeners(this.scrollableParent);
    }
  }

  #toggleClassToToggle(isIntersecting) {
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
    const callback = this.#toggleClassToToggle.bind(this);

    if (this.#intersectionObserver) this.#clearParentListeners();

    const obsrvrOptions = {
      rootMargin: '0px',
      threshold: 1
    };

    if (scrollableParent) obsrvrOptions.root = scrollableParent;

    this.#intersectionObserver = new IntersectionObserver(records => {
      records.forEach(r => {
        callback(r.isIntersecting);
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
