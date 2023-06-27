import {
  addClass,
  hasClass,
  removeClass,
  debounce,
  log,
  CLASS_NAME_ON_INTERSECT_NAME,
  PARENT_SELECTOR_NAME, error,
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
  stylesText = `
:host {
  display: block;
}
:host > :first-child {
  width: var(--placeholder-width);
  height: var(--placeholder-height);
  x-index: -1;
}
:host(:not(.x-appbar--auxillary-mode)) > :first-child {
  position: fixed;
}
:host(.x-appbar--auxillary-mode.x-appbar--auxillary-show) > :first-child {
  position: relative;
}
`;

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
  #auxillaryModeClassName = `${xAppbarName}--auxillary-mode`;
  get auxillaryModeClassName() {
    return this.#auxillaryModeClassName ?? '';
  }

  set auxillaryModeClassName(str) {
    const prevValue = this.#auxillaryModeClassName,
      newValue = str ? str + '' : '';

    this.#auxillaryModeClassName = newValue;

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

  #auxillaryShowClassName = `${xAppbarName}--auxillary-show`;
  get auxillaryShowClassName() {
    return this.#auxillaryShowClassName ?? '';
  }

  set auxillaryShowClassName(str) {
    this.#auxillaryShowClassName = str ? str + '' : '';
  }

  /**
   * @type {string}
   */
  #parentSelector;
  get parentSelector() {
    return this.#parentSelector ?? '';
  }

  set parentSelector(str) {
    const {parentSelector: prevValue, auxillaryModeClassName} = this,
      newValue = str ? str + '' : '';

    if (prevValue === newValue || !auxillaryModeClassName) {
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
  #stylesInitialized = false;
  #appbarContentWidth;
  #appbarContentHeight;

  /**
   * @type {ResizeObserver}
   */
  #resizeObserver;

  #lastScrollTop = 0;

  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.shadowRoot.innerHTML = `
    <div class="spacing-placeholder"></div>
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

      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#resizeObserver.unobserve(this);
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

  #toggleIntersectState(isIntersecting) {
    if (this.intersecting === isIntersecting) return;

    const _isIntersecting =
      this.#intersected = Boolean(isIntersecting);

    this.classList.toggle(this.auxillaryModeClassName, !_isIntersecting);

    this.dispatchEvent(new CustomEvent(
      _isIntersecting ? Intersected : NotIntersected, {
        bubbles: true,
        composed: true
      }));
  }

  #initializeListeners(oldParent, newParent) {
    if (oldParent) oldParent.removeEventListener('scroll', this.#onParentScroll);
    const {shadowRoot: {firstElementChild: placeholder}, firstElementChild} = this;

    if (this.#resizeObserver) this.#resizeObserver.unobserve(firstElementChild);

    this.#resizeObserver = new ResizeObserver(records => {
      records.forEach(r => {
        const bbox = r.target.getBoundingClientRect();
        placeholder.style.setProperty('--placeholder-width', `${bbox.width}px`);
        placeholder.style.setProperty('--placeholder-height', `${bbox.height}px`);
        this.#appbarContentWidth = bbox.width;
        this.#appbarContentHeight = bbox.height;
      });
    });

    this.#resizeObserver.observe(firstElementChild);

    newParent.removeEventListener('scroll', this.#onParentScroll);
    newParent.addEventListener('scroll', this.#onParentScroll);
  }

  #onParentScroll = e => {
    const {selectedParent: p, auxillaryShowClassName} = this,
      intersectionPoint = this.#appbarContentHeight;

    this.#toggleIntersectState(p.scrollTop <= intersectionPoint);

    if (p.scrollTop > intersectionPoint && p.scrollTop < this.#lastScrollTop) {
      this.classList.toggle(auxillaryShowClassName, true);
    } else if (hasClass(auxillaryShowClassName, this)) {
      removeClass(auxillaryShowClassName, this);
    }

    this.#lastScrollTop = p.scrollTop;
  };
}
