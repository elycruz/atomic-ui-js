import {ReactiveElement} from 'lit';

import {
  CLASSNAME_TO_TOGGLE_NAME,
  CLASSNAME_TO_TOGGLE_TARGET_NAME,
  CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME,
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
  typeOf, OBSERVER_CALLBACK,
} from '../utils/index.js';

export const xToggleOnScrollName = 'ez-toggleonscroll',

  xToggleOnScrollIntersectionEvName = `${xToggleOnScrollName}-intersection`;

const

  // Flags
  INITIALIZED = 0x02,
  DISCONNECTED = 0X04,
  CLASSNAME_SHOWING = 0X08,

  {isArray} = Array;

/**
 * @class EzToggleOnScrollElement
 * @element ez-toggleonscroll
 *
 * An element for quickly setting up a classname toggle when an intersecting target element scrolls in/out from view.
 *
 * @extends {ReactiveElement & HTMLElement}
 *
 * @shadowdom - None.
 *
 * @event 'ez-toggleonscroll-intersection' {CustomEvent<{records: IntersectionObserverEntry}>} - Custom intersection event.
 *
 * @attr {string} classNameToToggle
 * @attr {string} classNameToToggleTarget
 * @attr {string} intersectingTarget
 * @attr {string} root
 * @attr {string} rootMargin
 * @attr {boolean} reverse
 * @attr {number|number[]} threshold
 *
 * @fires 'ez-toggleonscroll-intersection' - Triggered on intersection.
 */
export class EzToggleOnScrollElement extends ReactiveElement {
  /**
   * Element name.
   *
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
    [OBSERVER_CALLBACK]: {state: true},
  };

  /**
   * @property {boolean} reverse - Causes intersection action to be triggered on the lack of intersection.
   * @property {string} classNameToToggleTargetSelector - Element selector where `classNameToToggle` should be toggled on.
   */

  /**
   * @type {string}
   */
  #rootSelector;

  /**
   * Scrollable parent selector used by intersection observer.
   *
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
   * Root element used by the contained intersection observer;  (Internally) defaults to the top-level document's
   * viewport;  Default `null`.
   *
   * @type {Element | Document | null}
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
   * Intersecting element selector used to fetch the intersecting element to observe.
   *
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
   * @type {Element | Document}
   */
  #intersectingTarget;

  /**
   * Intersecting element to observe for intersections with `root` target.
   *
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
   * Classname to toggle on the 'classname to toggle' target element.
   *
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

  /**
   * Target element to toggle `classNameToToggle` classname on.
   *
   * @return {Element|Document}
   */
  get classNameToToggleTarget() {
    if (!this.#classNameToToggleTarget && this.classNameToToggleTargetSelector) {
      this.#classNameToToggleTarget = this.classNameToToggle ?
        this.ownerDocument?.querySelector(this.classNameToToggleTargetSelector) :
        null;
    }

    return this.#classNameToToggleTarget;
  }

  /**
   * @type {string}
   */
  #classNameToToggleTargetSelector;

  /**
   * Gets the target selector used for fetching the element to toggle the
   *  `classNameToToggle` classname on.
   *
   * @returns {string}
   */
  get classNameToToggleTargetSelector() {
    return this.#classNameToToggleTargetSelector ?? '';
  }

  /**
   * Sets the target selector used for fetching the element to toggle the
   *  `classNameToToggle` classname on.
   *
   * @param {string} str
   */
  set classNameToToggleTargetSelector(str) {
    const prevValue = this.classNameToToggleTargetSelector;
    this.#classNameToToggleTargetSelector = (str ?? '') + '';
    this.requestUpdate(CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME, prevValue);
  }


  /**
   * @type {number | Array<number>}
   */
  #threshold;

  /**
   * Threshold passed to intersection observer constructor.
   *
   * @type {number|Array<number>}
   */
  get threshold() {
    return this.#threshold ?? 1;
  }

  /**
   * @param {string|number|number[]} x
   */
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

  /**
   * @type {IntersectionObserverCallback}
   */
  #observerCallback;

  /**
   * Gets called from internal intersection observer callback, when an intersection occurs.
   *
   * @return {IntersectionObserverCallback}
   */
  get observerCallback() {
    return this.#observerCallback ? this.#observerCallback : null;
  }

  /**
   * @param {IntersectionObserverCallback} fn
   */
  set observerCallback(fn) {
    const prevValue = this.#observerCallback;

    if (fn && fn instanceof Function) {
      this.#observerCallback = fn;
    } else {
      this.#observerCallback = null;
    }

    this.requestUpdate(OBSERVER_CALLBACK, prevValue);
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
  }

  /**
   * Used by `lit` library to resolve whether to attach a shadowdom, or not, for the current element instance.
   * @return {EzToggleOnScrollElement}
   */
  createRenderRoot() {
    return this;
  }

  /**
   * @native-web-component-lifecycle-callback
   * @return {void}
   */
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

  /**
   * @native-web-component-lifecycle-callback
   * @return {void}
   */
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

  /**
   * @native-web-component-lifecycle-callback
   * @return {void}
   */
  adoptedCallback() {
    super.adoptedCallback();

    this.connectedCallback();
  }

  /**
   * Ensures classname toggling is in the expected state, after reactive prop. changes;  Triggered when
   *  reactive properties are changed.
   *
   * @param {Map<string | number | symbol, any>} _changedProps
   */
  update(_changedProps) {
    super.update(_changedProps);

    const {classNameToToggle} = this,
      prevClassNameToToggle = _changedProps.get(CLASSNAME_TO_TOGGLE_NAME);

    if ((this.#flags & CLASSNAME_SHOWING) && prevClassNameToToggle) {
      replaceClass(prevClassNameToToggle, classNameToToggle, this.intersectingTarget) ||
      toggleClass(classNameToToggle, this.intersectingTarget, true);
    }
  }

  /**
   * Ensures we refresh our intersection observer after reactive properties have changed.
   *
   * @param {Map<string | number | symbol, any>} _changedProps
   */
  updated(_changedProps) {
    this.updateComplete.then(() => {
      const intersectingTargetSelectorChanged = _changedProps.has(INTERSECTING_TARGET_NAME),
        rootSelectorChanged = _changedProps.has(ROOT_SELECTOR_NAME),
        rootMarginChanged = _changedProps.has(ROOT_MARGIN_NAME),
        classNameToToggleChanged = _changedProps.has(CLASSNAME_TO_TOGGLE_NAME),
        classNameToToggleTargetSelectorChanged = _changedProps.has(CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME),
        thresholdChanged = _changedProps.has(THRESHOLD_NAME),
        observerCallbackChanged = _changedProps.has(OBSERVER_CALLBACK);

      // Refresh intersection observer if any of it's related properties changed.
      if (rootSelectorChanged || intersectingTargetSelectorChanged ||
        rootMarginChanged || thresholdChanged || observerCallbackChanged ||
        classNameToToggleChanged || classNameToToggleTargetSelectorChanged) {
        this.#refreshObservers();
      }
    });
  }

  /**
   * Performs classname toggle.
   *
   * @param {boolean} shouldToggleOn - Whether to add, or remove, the toggle classname.
   * @return {boolean} - Whether classname was toggled on, or off.
   */
  performClassNameToggle = (shouldToggleOn) => {
    const {classNameToToggle, classNameToToggleTarget} = this;

    if (shouldToggleOn && !(this.#flags & CLASSNAME_SHOWING)) this.#flags |= CLASSNAME_SHOWING;
    else if (!shouldToggleOn) this.#flags &= (~CLASSNAME_SHOWING);

    return !classNameToToggle || !classNameToToggleTarget ? false :
      classNameToToggleTarget.classList.toggle(classNameToToggle, shouldToggleOn);
  };

  /**
   * @private
   */
  #clearObservers() {
    if (this.#intersectionObserver) {
      this.#intersectionObserver.unobserve(this.intersectingTarget);
      this.#intersectionObserver.disconnect();
    }
  }

  /**
   * Clears, and re-instantiates, own intersection observer.
   *
   * @private
   */
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

    this.#intersectionObserver = new IntersectionObserver((records, observer) => {
      // Loop through records, if required
      if (this.classNameToToggle && this.classNameToToggleTarget) {
        records.forEach(r => {
          const shouldTriggerAction = this.reverse ?
            !r.isIntersecting : r.isIntersecting;

          this.performClassNameToggle(shouldTriggerAction);
        });

        // Dispatch ez-toggleonscroll-intersection event
        this.dispatchEvent(new CustomEvent(xToggleOnScrollIntersectionEvName, {
          composed: true,
          bubbles: false
        }));
      }

      this.observerCallback?.bind(this)(records, observer);
    }, observerOptions);

    this.#intersectionObserver.observe(this.intersectingTarget);
  }
}
