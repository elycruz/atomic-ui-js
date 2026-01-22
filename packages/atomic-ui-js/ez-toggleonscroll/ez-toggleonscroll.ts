import { PropertyValues, ReactiveElement } from 'lit';

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
  replaceClass,
  toggleClass,
  typeOf,
  OBSERVER_CALLBACK,
  isNullable,
} from '../utils/index.js';

export const xToggleOnScrollName = 'ez-toggleonscroll',
  xToggleOnScrollIntersectionEvName = `${xToggleOnScrollName}-intersection`;

const // Flags
  INITIALIZED = 0x02,
  DISCONNECTED = 0x04,
  CLASSNAME_SHOWING = 0x08,
  { isArray } = Array;

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
   */
  static localName = xToggleOnScrollName;

  /**
   * Property instantiation options used by `ReactiveElement`.
   */
  static properties = {
    [CLASSNAME_TO_TOGGLE_NAME]: { type: String },
    [CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME]: {
      type: String,
      attribute: CLASSNAME_TO_TOGGLE_TARGET_NAME,
    },
    [INTERSECTING_TARGET_SELECTOR_NAME]: {
      type: String,
      attribute: INTERSECTING_TARGET_NAME,
    },
    [ROOT_MARGIN_NAME]: { type: String },
    [ROOT_SELECTOR_NAME]: { type: String, attribute: ROOT_NAME },
    [REVERSE_NAME]: { type: Boolean },
    [THRESHOLD_NAME]: {
      converter: {
        fromAttribute: (value: string): number | number[] => {
          if (value) return 1;

          let newValue = value.trim();

          try {
            newValue = JSON.parse(newValue);
          } catch {
            return 1;
          }

          return isUsableNumber(newValue) || isArray(newValue)
            ? (newValue as unknown as number[])
            : 1;
        },
      },

      hasChanged(newValue: number | number[], prevValue: number | number[]) {
        if (isNullable(newValue) || isNullable(prevValue)) {
          return newValue !== prevValue;
        }

        if (isArray(newValue) && isArray(prevValue)) {
          return JSON.stringify(newValue) !== JSON.stringify(prevValue);
        }

        return !Object.is(newValue, prevValue);
      },
    },
    [OBSERVER_CALLBACK]: { state: true },
  };

  reverse?: boolean;
  rootMargin?: string;

  /**
   * @property {boolean} reverse - Causes intersection action to be triggered on the lack of intersection.
   * @property {string} classNameToToggleTargetSelector - Element selector where `classNameToToggle` should be toggled on.
   */

  #rootSelector?: string;

  /**
   * Scrollable parent selector used by intersection observer.
   */
  get rootSelector(): string {
    return this.#rootSelector ?? '';
  }

  set rootSelector(str: string) {
    const prevValue = this.rootSelector;

    this.#rootSelector = str ?? '';

    // Force scrollable parent re-fetch
    this.#root = null;
    this.requestUpdate(ROOT_SELECTOR_NAME, prevValue);
  }

  #root?: Element | Document | null;

  /**
   * Root element used by the contained intersection observer;  (Internally) defaults to the top-level document's
   * viewport;  Default `null`.
   */
  get root(): Element | Document | null {
    if (!this.#root) {
      this.#root = this.rootSelector
        ? this.ownerDocument.querySelector(this.rootSelector)
        : null;
    }

    return this.#root;
  }

  #intersectingTargetSelector?: string;

  /**
   * Intersecting element selector used to fetch the intersecting element to observe.
   */
  get intersectingTargetSelector(): string {
    return this.#intersectingTargetSelector ?? '';
  }

  set intersectingTargetSelector(str: string) {
    const prevValue = this.intersectingTargetSelector;

    this.#intersectingTargetSelector = str ?? '';
    this.#intersectingTarget = null;
    this.requestUpdate(INTERSECTING_TARGET_SELECTOR_NAME, prevValue);
  }

  /**
   * @type {Element}
   */
  #intersectingTarget?: Element | Document | null;

  /**
   * Intersecting element to observe for intersections with `root` target.
   */
  get intersectingTarget(): Element | Document | null {
    if (!this.#intersectingTarget) {
      this.#intersectingTarget = this.#intersectingTargetSelector
        ? (this.root ?? this.ownerDocument).querySelector(
            this.#intersectingTargetSelector
          )
        : this;
    }

    return this.#intersectingTarget ?? null;
  }

  #classNameToToggle?: string;

  /**
   * Classname to toggle on the 'classname to toggle' target element.
   */
  get classNameToToggle(): string {
    return this.#classNameToToggle ?? '';
  }

  /**
   * @param {string} str
   */
  set classNameToToggle(str: string) {
    const prevValue = this.#classNameToToggle;

    this.#classNameToToggle = str ?? '';
    this.#classNameToToggleTarget = null;
    this.requestUpdate(INTERSECTING_TARGET_NAME, prevValue);
  }

  #classNameToToggleTarget?: Element | Document | null;

  /**
   * Target element to toggle `classNameToToggle` classname on.
   */
  get classNameToToggleTarget(): Element | Document | null {
    if (
      !this.#classNameToToggleTarget &&
      this.classNameToToggleTargetSelector
    ) {
      this.#classNameToToggleTarget = this.classNameToToggle
        ? this.ownerDocument.querySelector(this.classNameToToggleTargetSelector)
        : null;
    }

    return this.#classNameToToggleTarget ?? null;
  }

  #classNameToToggleTargetSelector?: string;

  /**
   * Gets the target selector used for fetching the element to toggle the
   *  `classNameToToggle` classname on.
   */
  get classNameToToggleTargetSelector(): string {
    return this.#classNameToToggleTargetSelector ?? '';
  }

  /**
   * Sets the target selector used for fetching the element to toggle the
   *  `classNameToToggle` classname on.
   *
   * @param {string} str
   */
  set classNameToToggleTargetSelector(str: string) {
    const prevValue = this.classNameToToggleTargetSelector;

    this.#classNameToToggleTargetSelector = str ?? '';
    this.requestUpdate(CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME, prevValue);
  }

  #threshold?: number | number[];

  /**
   * Threshold passed to intersection observer constructor.
   */
  get threshold(): number | number[] {
    return this.#threshold ?? 1;
  }

  set threshold(x: number | number[] | string) {
    const prevValue = this.threshold;

    let newValue = isNullable(x) ? 1 : x;

    switch (typeOf(newValue)) {
      case Number.name:
      case Array.name:
        break;
      case String.name:
      default:
        try {
          newValue = JSON.parse(newValue as string);
        } catch {
          newValue = 1;
        }
        break;
    }

    this.#threshold =
      isUsableNumber(newValue) || isArray(newValue)
        ? (newValue as number | number[])
        : 1;

    this.requestUpdate(THRESHOLD_NAME, prevValue);
  }

  #observerCallback?: IntersectionObserverCallback | null;

  /**
   * Gets called from internal intersection observer callback, when an intersection occurs.
   */
  get observerCallback(): IntersectionObserverCallback | null {
    return this.#observerCallback ?? null;
  }

  set observerCallback(fn: IntersectionObserverCallback | null) {
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
   */
  #flags = 0x00;

  #intersectionObserver?: IntersectionObserver;

  constructor() {
    super();

    this.reverse = false;
    this.rootMargin = '0px';
  }

  /**
   * Used by `lit` library to resolve whether to attach a shadowdom, or not, for the current element instance.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * @native-web-component-lifecycle-callback
   */
  connectedCallback() {
    super.connectedCallback();

    // Only (re-)initialize observers if element has recently undergone disconnection,
    // and is connected
    if (
      !(this.#flags & INITIALIZED) &&
      this.#flags & DISCONNECTED &&
      this.isConnected
    ) {
      this.#flags |= INITIALIZED;
      this.#flags &= ~DISCONNECTED;
      this.#refreshObservers();
    }
  }

  /**
   * @native-web-component-lifecycle-callback
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    // Mark as 'disconnected', if not already marked
    if (!(this.#flags & DISCONNECTED)) this.#flags |= DISCONNECTED;

    if (this.#flags & INITIALIZED) {
      this.#clearObservers();
      this.#flags &= ~INITIALIZED;
    }
  }

  /**
   * @native-web-component-lifecycle-callback
   */
  adoptedCallback() {
    // @ts-expect-error - Known type.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super.adoptedCallback();

    this.connectedCallback();
  }

  /**
   * Ensures classname toggling is in the expected state, after reactive prop. changes;  Triggered when
   *  reactive properties are changed.
   */
  update(_changedProps: PropertyValues) {
    super.update(_changedProps);

    const { classNameToToggle } = this,
      prevClassNameToToggle = _changedProps.get(
        CLASSNAME_TO_TOGGLE_NAME
      ) as string;

    if (
      this.#flags & CLASSNAME_SHOWING &&
      prevClassNameToToggle &&
      (this.intersectingTarget as Element)?.classList // If is `Element`
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      replaceClass(
        prevClassNameToToggle,
        classNameToToggle,
        this.intersectingTarget as Element
      ) ||
        toggleClass(
          classNameToToggle,
          this.intersectingTarget as Element,
          true
        );
    }
  }

  /**
   * Ensures we refresh our intersection observer after reactive properties have changed.
   */
  updated(_changedProps: PropertyValues) {
    this.updateComplete
      .then(() => {
        const intersectingTargetSelectorChanged = _changedProps.has(
            INTERSECTING_TARGET_NAME
          ),
          rootSelectorChanged = _changedProps.has(ROOT_SELECTOR_NAME),
          rootMarginChanged = _changedProps.has(ROOT_MARGIN_NAME),
          classNameToToggleChanged = _changedProps.has(
            CLASSNAME_TO_TOGGLE_NAME
          ),
          classNameToToggleTargetSelectorChanged = _changedProps.has(
            CLASSNAME_TO_TOGGLE_TARGET_SELECTOR_NAME
          ),
          thresholdChanged = _changedProps.has(THRESHOLD_NAME),
          observerCallbackChanged = _changedProps.has(OBSERVER_CALLBACK);

        // Refresh intersection observer if any of it's related properties changed.
        if (
          rootSelectorChanged ||
          intersectingTargetSelectorChanged ||
          rootMarginChanged ||
          thresholdChanged ||
          observerCallbackChanged ||
          classNameToToggleChanged ||
          classNameToToggleTargetSelectorChanged
        ) {
          this.#refreshObservers();
        }
      })
      .catch(console.error);
  }

  /**
   * Performs classname toggle.
   *
   * @param {boolean} shouldToggleOn - Whether to add, or remove, the toggle classname.
   * @return {boolean} - Whether classname was toggled on, or off.
   */
  performClassNameToggle = (shouldToggleOn: boolean): boolean => {
    const { classNameToToggle, classNameToToggleTarget } = this;

    if (shouldToggleOn && !(this.#flags & CLASSNAME_SHOWING))
      this.#flags |= CLASSNAME_SHOWING;
    else if (!shouldToggleOn) this.#flags &= ~CLASSNAME_SHOWING;

    return !classNameToToggle || !classNameToToggleTarget
      ? false
      : (classNameToToggleTarget as HTMLElement).classList.toggle(
          classNameToToggle,
          shouldToggleOn
        );
  };

  /**
   * @private
   */
  #clearObservers() {
    const intersectingTarget = this.intersectingTarget;

    if (this.#intersectionObserver) {
      if (intersectingTarget)
        this.#intersectionObserver.unobserve(intersectingTarget as Element);
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

    const observerOptions = {} as IntersectionObserverInit,
      { root, rootMargin, threshold, intersectingTarget } = this;

    if (!intersectingTarget) return;

    if (rootMargin) observerOptions.rootMargin = rootMargin;
    if (threshold) observerOptions.threshold = threshold;
    if (root) observerOptions.root = root;

    this.#intersectionObserver = new IntersectionObserver(
      (records, observer) => {
        // Loop through records, if required
        if (this.classNameToToggle && this.classNameToToggleTarget) {
          records.forEach(r => {
            const shouldTriggerAction = this.reverse
              ? !r.isIntersecting
              : r.isIntersecting;

            this.performClassNameToggle(shouldTriggerAction);
          });

          // Dispatch ez-toggleonscroll-intersection event
          this.dispatchEvent(
            new CustomEvent(xToggleOnScrollIntersectionEvName, {
              composed: true,
              bubbles: false,
            })
          );
        }

        (this.observerCallback?.bind(this) as IntersectionObserverCallback)(
          records,
          observer
        );
      },
      observerOptions
    );

    if (this.intersectingTarget)
      // @todo Ensure component can work with `Document` targets
      this.#intersectionObserver.observe(this.intersectingTarget as Element);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ez-toggleonscroll': EzToggleOnScrollElement;
  }
}
