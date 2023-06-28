import {
  addClass,
  hasClass,
  removeClass,
  debounce,
  CLASS_NAME_ON_INTERSECT_NAME,
  PARENT_SELECTOR_NAME, error, isUsableNumber,
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

const {Intersected, NotIntersected} = xAppbarEvents,
  styles = new CSSStyleSheet(),
  stylesText = '';

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
  #hiddenClassName = 'x--hidden';
  get hiddenClassName() {
    return this.#hiddenClassName ?? '';
  }

  set hiddenClassName(str) {
    const prevValue = this.#hiddenClassName,
      newValue = str ? str + '' : '';

    this.#hiddenClassName = newValue;

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

  #visibleClassName = 'x--visible';
  get visibleClassName() {
    return this.#visibleClassName ?? '';
  }

  set visibleClassName(str) {
    this.#visibleClassName = str ? str + '' : '';
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
      return;
    }

    const {selectedParent: prevParent} = this;

    this.#parentSelector = newValue;

    // Force selected parent to be re-selected (using new parent selector)
    this.#selectedParent = null;

    this.#initializeListeners(prevParent, this.selectedParent);
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

  get intersecting() {
    return this.#intersected ?? false;
  }

  /**
   * @type {number}
   */
  #marginTop;

  get marginTop() {
    return this.#marginTop ?? 0;
  }

  set marginTop(x) {
    let cast = Number(x);
    this.#marginTop = isUsableNumber(cast) ? cast : 0;
  }

  /**
   * @type {number}
   */
  #debounceDelay= 233;

  get debounceDelay() {
    return this.#debounceDelay ?? 233;
  }

  set debounceDelay(x) {
    this.#debounceDelay = x;
  }

  #initialized = false;
  #stylesInitialized = false;
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

  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.shadowRoot.innerHTML = `
    <slot></slot>
    `;
  }

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      if (!this.#stylesInitialized) {
        styles.replace(stylesText).catch(error);
        this.#stylesInitialized = true;
      }
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

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) return;

    switch (name) {
    case PARENT_SELECTOR_NAME:
    case CLASS_NAME_ON_INTERSECT_NAME:
    case 'debounceDelay':
    case 'hiddenClassName':
    case 'visibleClassName':
    case 'marginTop':
      this[name] = nextValue;
      return;
    default:
      return;
    }
  }

  #toggleIntersectState(isIntersecting) {
    if (this.intersecting === isIntersecting) return;

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

  #onParentScroll = debounce(() => {
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
  }, this.debounceDelay);
}
