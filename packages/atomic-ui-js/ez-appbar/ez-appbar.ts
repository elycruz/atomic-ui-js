import {
  addClass,
  hasClass,
  removeClass,
  debounce,
  toNumberOr,
} from '../utils/index.js';

import { PropertyValues, ReactiveElement } from 'lit';

export const xAppbarName = 'ez-appbar';

export const xAppbarEvents: Record<string, string> = {
  Intersected: `${xAppbarName}-intersected`,
  NotIntersected: `${xAppbarName}-not-intersected`,
};

const { Intersected, NotIntersected } = xAppbarEvents,
  HIDDEN_CLASSNAME_NAME = 'hiddenClassName',
  VISIBLE_CLASSNAME_NAME = 'visibleClassName',
  PARENT_SELECTOR_NAME = 'parentSelector',
  DEBOUNCE_DELAY_NAME = 'debounceDelay',
  MARGIN_TOP_NAME = 'marginTop';

/**
 * @note Component functions as a decorator.
 *
 * @todo Re-name component to ez-appbar-decorator.
 */
export class EzAppbarElement extends ReactiveElement {
  static localName = xAppbarName;

  static properties = {
    [HIDDEN_CLASSNAME_NAME]: { type: String, attribute: true },
    [VISIBLE_CLASSNAME_NAME]: { type: String, attribute: true },
    [PARENT_SELECTOR_NAME]: { type: String, attribute: true },
    [DEBOUNCE_DELAY_NAME]: { type: Number, attribute: true },
    [MARGIN_TOP_NAME]: { type: Number, attribute: true },
  };

  #hiddenClassName = 'ez--hidden';
  get hiddenClassName() {
    return this.#hiddenClassName ?? '';
  }

  set hiddenClassName(str) {
    const prevValue = this.#hiddenClassName,
      newValue = str ?? '';

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

  #visibleClassName = 'ez--visible';
  get visibleClassName() {
    return this.#visibleClassName ?? '';
  }

  set visibleClassName(str) {
    const prevValue = this.#visibleClassName,
      newValue = str ?? '';

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

  #parentSelector?: string;
  get parentSelector(): string {
    return this.#parentSelector ?? '';
  }

  set parentSelector(str: string) {
    const { parentSelector: prevValue, hiddenClassName } = this,
      newValue = str ?? '';

    if (prevValue === newValue || !hiddenClassName) {
      this.#parentSelector = newValue;
      this.requestUpdate(PARENT_SELECTOR_NAME, prevValue);
      return;
    }

    const { selectedParent: prevParent } = this;

    this.#parentSelector = newValue;

    // Force selected parent to be re-selected (using new parent selector)
    this.#selectedParent = null;

    this.#initializeListeners(prevParent, this.selectedParent);
    this.requestUpdate(PARENT_SELECTOR_NAME, prevValue);
  }

  #selectedParent: HTMLElement | null = null;
  get selectedParent(): HTMLElement | null {
    if (!this.#selectedParent) {
      this.#selectedParent = !this.parentSelector
        ? (this.ownerDocument.scrollingElement as HTMLElement | null)
        : this.ownerDocument.querySelector(this.parentSelector);
    }

    return this.#selectedParent;
  }

  #intersected = false;
  get intersected() {
    return this.#intersected ?? false;
  }

  #marginTop = 0;
  get marginTop() {
    return this.#marginTop ?? 0;
  }

  set marginTop(n) {
    const prevValue = this.debounceDelay;

    this.#marginTop = toNumberOr(n, 0);
    this.requestUpdate(MARGIN_TOP_NAME, prevValue);
  }

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
  #appbarContentHeight?: number;

  /**
   * Allows to capture dimension changes on appbar content element.
   */
  #resizeObserver?: ResizeObserver;

  /**
   * Tracks the last scrollbar 'top' position, for the selected parent.
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

  willUpdate(_changed: PropertyValues) {
    if (_changed.has(DEBOUNCE_DELAY_NAME)) {
      this.#onParentScroll = debounce(
        this.#onParentScrollUnDebounced,
        this.#debounceDelay
      );
    }

    if (
      _changed.has(VISIBLE_CLASSNAME_NAME) ||
      _changed.has(HIDDEN_CLASSNAME_NAME) ||
      _changed.has(PARENT_SELECTOR_NAME)
    ) {
      this.#onParentScroll();
    }
  }

  #toggleIntersectState(isIntersecting) {
    if (this.intersected === isIntersecting) return;

    const _isIntersecting = (this.#intersected = Boolean(isIntersecting));

    this.classList.toggle(this.hiddenClassName, !_isIntersecting);

    this.dispatchEvent(
      new CustomEvent(_isIntersecting ? Intersected : NotIntersected, {
        bubbles: true,
        composed: true,
      })
    );
  }

  #initializeListeners(
    oldParent?: HTMLElement | null,
    newParent?: HTMLElement | null
  ) {
    if (oldParent)
      oldParent.removeEventListener('scroll', this.#onParentScroll);

    if (this.#resizeObserver) this.#resizeObserver.unobserve(this);

    this.#resizeObserver = new ResizeObserver(records => {
      records.forEach(r => {
        const bbox = r.target.getBoundingClientRect();

        this.#appbarContentHeight = bbox.height;
      });
    });

    this.#resizeObserver.observe(this);

    newParent?.removeEventListener('scroll', this.#onParentScroll);
    newParent?.addEventListener('scroll', this.#onParentScroll);

    return this;
  }

  #onParentScrollUnDebounced = () => {
    const { selectedParent: p, visibleClassName } = this,
      intersectionPoint = this.marginTop + (this.#appbarContentHeight ?? 0),
      hasFocusWithin = this.matches(':focus-within');

    if (!p) return;

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
