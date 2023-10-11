import {ReactiveElement} from 'lit';

import {
  CLASSNAME_TO_TOGGLE_NAME,
  CLASSNAME_TO_TOGGLE_TARGET_NAME,
  INTERSECTING_TARGET_NAME,
  INTERSECTING_TARGET_SELECTOR_NAME,
  REVERSE_NAME,
  ROOT_MARGIN_NAME,
  ROOT_NAME,
  ROOT_SELECTOR_NAME,
  THRESHOLD_NAME,
  isUsableNumber,
  isset,
  replaceClass,
  toggleClass,
  typeOf, CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME,
} from '../utils/index.js';

export const xToggleOnScrollName = 'x-toggleonscroll',

  xToggleOnScrollIntersectionEvName = `${xToggleOnScrollName}-intersection`;

const

  // Flags
  INITIALIZED = 0x02,
  DISCONNECTED = 0X04,
  CLASSNAME_SHOWING = 0X08,

  {isArray} = Array;

/**
 * @class XToggleOnScrollElement
 * @element x-toggleonscroll
 *
 * An element for quickly setting up a classname toggle when an intersecting target element scrolls in/out from view.
 *
 * @extends {ReactiveElement & HTMLElement}
 *
 * @todo Change component name to 'x-toggleonintersect' - Better description of what the component does.
 * @todo Should throw an error when `intersectingTarget` is not a descendant of `root`.
 *
 * @shadowdom - None.
 *
 * @event 'x-toggleonscroll-intersection' {CustomEvent<{records: IntersectionObserverEntry}>} - Custom intersection event.
 */
export class XToggleOnScrollElement extends ReactiveElement {
  /**
   * @type {string}
   */
  static localName = xToggleOnScrollName;

  /**
   * Property instantiation options used by `ReactiveElement`.
   */
  static properties = {
    [CLASSNAME_TO_TOGGLE_NAME]: {type: String},
    [CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME]: {type: String, attribute: CLASSNAME_TO_TOGGLE_TARGET_NAME},
    [INTERSECTING_TARGET_SELECTOR_NAME]: {type: String, attribute: INTERSECTING_TARGET_NAME},
    [ROOT_MARGIN_NAME]: {type: String},
    [ROOT_SELECTOR_NAME]: {type: String, attribute: ROOT_NAME},
    [REVERSE_NAME]: {type: Boolean},
    [THRESHOLD_NAME]: {
      converter: {
        /**
         * @param {string} value
         * @return {number|number[]}
         */
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

      /**
       * @param {*} newValue
       * @param {*} prevValue
       * @return {boolean}
       */
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
   * @property {boolean} reverse
   * @property {string} classNameToToggleTargetSelector
   */

  /**
   * @type {string}
   */
  #rootSelector;

  /**
   * @return {string}
   */
  get rootSelector() {
    return this.#rootSelector ?? '';
  }

  /**
   * @param {string} str
   */
  set rootSelector(str) {
    const prevValue = this.rootSelector;

    this.#rootSelector = (str ?? '') + '';

    // Force scrollable parent re-fetch
    this.#root = null;
    this.requestUpdate(ROOT_SELECTOR_NAME, prevValue);
  }

  /**
   * @type {Element | Document}
   */
  #root;

  /**
   * @type {Element | Document}
   */
  get root() {
    if (!this.#root) {
      this.#root = this.rootSelector ?
        this.ownerDocument?.querySelector(this.rootSelector) :
        null;
    }

    return this.#root;
  }

  /**
   * @type {string}
   */
  #intersectingTargetSelector;

  /**
   * @return {string}
   */
  get intersectingTargetSelector() {
    return this.#intersectingTargetSelector ?? '';
  }

  /**
   * @param {string} str
   */
  set intersectingTargetSelector(str) {
    const prevValue = this.intersectingTargetSelector;
    this.#intersectingTargetSelector = (str ?? '') + '';
    this.#intersectingTarget = null;
    this.requestUpdate(INTERSECTING_TARGET_SELECTOR_NAME, prevValue);
  }

  /**
   * Container to observe for intersection with scrollable parent.
   *
   * @type {Element | Document}
   */
  #intersectingTarget;

  /**
   * @type {Element | Document}
   */
  get intersectingTarget() {
    if (!this.#intersectingTarget) {
      this.#intersectingTarget = this.#intersectingTargetSelector  ?
        (this.root ?? this.ownerDocument).querySelector(this.#intersectingTargetSelector) :
        this;
    }

    return this.#intersectingTarget;
  }

  /**
   * @type {string}
   */
  #classNameToToggle;

  /**
   * @return {string}
   */
  get classNameToToggle() {
    return this.#classNameToToggle ?? '';
  }

  /**
   * @param {string} str
   */
  set classNameToToggle(str) {
    const prevValue = this.#classNameToToggle;
    this.#classNameToToggle = (str ?? '') + '';
    this.#classNameToToggleTarget = null;
    this.requestUpdate(INTERSECTING_TARGET_NAME, prevValue);
  }

  /**
   * @type {Element | Document}
   */
  #classNameToToggleTarget;

  get classNameToToggleTarget() {
    if (!this.#classNameToToggleTarget && this.classNameToToggleTargetSelector) {
      this.#classNameToToggleTarget = this.classNameToToggle ?
        this.ownerDocument?.querySelector(this.classNameToToggleTargetSelector) :
        null;
    }

    return this.#classNameToToggleTarget;
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

    this.requestUpdate(THRESHOLD_NAME, prevValue);
  }

  #defaultObserverCallback(records) {
    // Loop through records, if required
    if (this.classNameToToggle && this.classNameToToggleTarget) {
      records.forEach(r => {
        console.log(r, this.threshold);
        const shouldTriggerAction = this.reverse ?
          !r.isIntersecting : r.isIntersecting;

        this.performClassNameToggle(shouldTriggerAction);
      });

      // Dispatch x-toggleonscroll-intersection event
      this.dispatchEvent(new CustomEvent(xToggleOnScrollIntersectionEvName, {
        composed: true,
        bubbles: false
      }));
    }
  }

  #observerCallback;

  get observerCallback() {
    return this.#observerCallback ?? this.#defaultObserverCallback;
  }

  set observerCallback(fn) {
    const prevValue = this.#observerCallback;

    if (fn && fn instanceof Function) {
      this.#observerCallback = fn;
    } else if (fn === null) {
      this.#observerCallback = this.#defaultObserverCallback;
    } else {
      return;
    }

    this.requestUpdate('observerCallback', prevValue);
  }

  /**
   * Holds internal boolean flags.
   *
   * @type {number}
   */
  #flags = 0x00;

  /**
   * @type {IntersectionObserver}
   */
  #intersectionObserver;

  constructor() {
    super();

    this.reverse = false;
    this.rootMargin = '0px';
    this.#observerCallback = this.#defaultObserverCallback;
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

    const {classNameToToggle} = this,
      prevClassNameToToggle = _changedProps.get(CLASSNAME_TO_TOGGLE_NAME);

    if ((this.#flags & CLASSNAME_SHOWING) && prevClassNameToToggle) {
      replaceClass(prevClassNameToToggle, classNameToToggle, this.intersectingTarget) ||
      toggleClass(classNameToToggle, this.intersectingTarget, true);
    }
  }

  updated(_changedProps) {
    this.updateComplete.then(() => {
      const intersectingTargetSelectorChanged = _changedProps.has(INTERSECTING_TARGET_NAME),
        rootSelectorChanged = _changedProps.has(ROOT_SELECTOR_NAME),
        rootMarginChanged = _changedProps.has(ROOT_MARGIN_NAME),
        classNameToToggleChanged = _changedProps.has(CLASSNAME_TO_TOGGLE_NAME),
        classNameToToggleTargetSelectorChanged = _changedProps.has(CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME),
        thresholdChanged = _changedProps.has(THRESHOLD_NAME),
        observerCallbackChanged = _changedProps.has('observerCallback');

      // Refresh intersection observer if any of it's related properties changed.
      if (rootSelectorChanged || intersectingTargetSelectorChanged ||
        rootMarginChanged || thresholdChanged || observerCallbackChanged ||
        classNameToToggleChanged || classNameToToggleTargetSelectorChanged) {
        this.#refreshObservers();
      }
    });
  }

  performClassNameToggle = (shouldToggleOn) => {
    const {classNameToToggle, classNameToToggleTarget} = this;

    if (shouldToggleOn && !(this.#flags & CLASSNAME_SHOWING)) this.#flags |= CLASSNAME_SHOWING;
    else if (!shouldToggleOn) this.#flags &= (~CLASSNAME_SHOWING);

    return !classNameToToggle || !classNameToToggleTarget ? false :
      classNameToToggleTarget.classList.toggle(classNameToToggle, shouldToggleOn);
  };

  #clearObservers() {
    if (this.#intersectionObserver) {
      this.#intersectionObserver.unobserve(this.intersectingTarget);
      this.#intersectionObserver.disconnect();
    }
  }

  #refreshObservers() {
    this.#clearObservers();

    const observerOptions = {},

      { root,
        rootMargin,
        threshold,
        intersectingTarget
      } = this;

    if (!intersectingTarget) return;

    if (rootMargin) observerOptions.rootMargin = rootMargin;
    if (threshold) observerOptions.threshold = threshold;
    if (root) observerOptions.root = root;

    this.#intersectionObserver = new IntersectionObserver(this.observerCallback.bind(this), observerOptions);

    this.#intersectionObserver.observe(this.intersectingTarget);
  }
}
