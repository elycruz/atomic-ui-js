import { debounce } from '../utils/index.js';

export const xRippleName = 'ez-ripple';

/**
 * @module ripple
 *
 * Defines, and exports, ez-ripple element.
 * ================================================= */

const _mouseOverEventName = 'mouseenter',
  _mouseDownEventName = 'pointerdown',
  _animationEndEventName = 'animationend',
  _rippleDiameterCssPropName = `--${xRippleName}-diameter`,
  _rippleXCssPropName = `--${xRippleName}-x`,
  _rippleYCssPropName = `--${xRippleName}-y`,
  /**
   * @param {Event} e
   * @returns {EzRippleElement}
   */
  _rippleCtxFromEvent = (e: Event): EzRippleElement | null =>
    e.currentTarget instanceof EzRippleElement
      ? e.currentTarget
      : (e.currentTarget as HTMLElement).querySelector(
          `:scope > ${xRippleName}`
        ),
  _onRippleAnimationEnd = function (e: AnimationEvent) {
    const ctx = _rippleCtxFromEvent(e);

    if (!ctx) return;

    ctx.pauseUpdates = true;
    if (ctx.rippleActive) ctx.rippleActive = false;
    ctx.pauseUpdates = false;
  },
  /**
   * @param {MouseEvent} e
   */
  _onRippleElementMouseDown = function (e: Event) {
    const rippleCtx = _rippleCtxFromEvent(e);

    if (!rippleCtx) return;

    if (e.type === _mouseOverEventName) {
      _updateCssProps(rippleCtx, e as MouseEvent);
      return;
    }

    _rippleActive(rippleCtx, e);
  },
  _calcRippleRadius = (containerW: number, containerH: number) => {
    return Math.sqrt(Math.pow(containerW, 2) + Math.pow(containerH, 2));
  },
  _updateCssProps = (ctx: EzRippleElement, e?: MouseEvent) => {
    let rippleRadius: number,
      rippleOffsetX = e?.offsetX,
      rippleOffsetY = e?.offsetY;

    if (ctx.childElementCount) {
      rippleRadius = _calcRippleRadius(ctx.offsetWidth, ctx.offsetHeight);
    } else if (ctx.parentElement) {
      rippleRadius = _calcRippleRadius(
        ctx.parentElement.offsetWidth,
        ctx.parentElement.offsetHeight
      );
    } else return;

    ctx.style.setProperty(_rippleDiameterCssPropName, `${rippleRadius * 2}px`);

    if (!e || ctx.childElementCount) {
      rippleOffsetX = ctx.offsetWidth / 2;
      rippleOffsetY = ctx.offsetHeight / 2;
    } else if (rippleOffsetX === undefined || rippleOffsetY === undefined)
      return;

    const rippleX = `${rippleOffsetX - rippleRadius}px`,
      rippleY = `${rippleOffsetY - rippleRadius}px`;

    ctx.style.setProperty(_rippleXCssPropName, rippleX);
    ctx.style.setProperty(_rippleYCssPropName, rippleY);
  },
  _rippleActive = (ctx: EzRippleElement, e: Event) => {
    ctx.pauseUpdates = true;
    _updateCssProps(ctx, e as MouseEvent);

    ctx.rippleActive = true;
    ctx.pauseUpdates = false;
  },
  addRippleEffect = (ctx: EzRippleElement) => {
    const eventTarget = (
      !ctx.childElementCount ? ctx.parentElement : ctx
    ) as EzRippleElement;

    removeRippleEffect(eventTarget);

    // Ensure any applied side effects are removed
    if (ctx.childElementCount)
      removeRippleEffect(ctx.parentElement as EzRippleElement);

    _updateCssProps(ctx);
    eventTarget.addEventListener(
      _mouseOverEventName,
      _onRippleElementMouseDown
    );
    eventTarget.addEventListener(
      _mouseDownEventName,
      _onRippleElementMouseDown
    );
    eventTarget.addEventListener(_animationEndEventName, _onRippleAnimationEnd);
    eventTarget.addEventListener('focusout', _onRippleAnimationEnd);

    return ctx;
  },
  removeRippleEffect = (ctx: EzRippleElement) => {
    ctx.removeEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    ctx.removeEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    ctx.removeEventListener(_animationEndEventName, _onRippleAnimationEnd);
    ctx.removeEventListener('focusout', _onRippleAnimationEnd);
    return ctx;
  },
  RIPPLE_ACTIVE_NAME = 'rippleactive',
  RADIUS_MULTIPLIER_NAME = 'radiusmultiplier',
  observedAttributes = [RIPPLE_ACTIVE_NAME],
  _resizeObserver = new ResizeObserver(
    debounce((records: ResizeObserverEntry[]) => {
      if (!records?.length) return;

      let lastTarget: EzRippleElement;

      records.forEach(record => {
        const { target } = record;

        // Only allow update if target hasn't already been updated in parent iteration
        if (!lastTarget?.isSameNode(target)) {
          lastTarget = target as EzRippleElement;
          lastTarget.update();
        } else {
          lastTarget = target as EzRippleElement;
        }
      });
    }, 377)
  ),
  _mutObserver = new MutationObserver(records => {
    const recordsLen = records.length;

    let target: EzRippleElement;

    for (let i = 0; i < recordsLen; i += 1) {
      const r = records[i];

      if (r.addedNodes.length || r.removedNodes.length) {
        target = r.target as EzRippleElement;
        if (!target?.isSameNode(r.target)) {
          target.update();
        }
      }
    }
  }),
  _mutObserverConfig = { childList: true, subtree: true };

export {
  addRippleEffect,
  removeRippleEffect,
  RIPPLE_ACTIVE_NAME,
  RADIUS_MULTIPLIER_NAME,
};

/**
 * Ripple effect element resembling the Material Design ripple effect - Use it
 * when you want a ripple effect within an element, or as ripple effect surrounding
 * an element.
 *
 * @element ez-ripple
 *
 * @example ```
 * <!-- Within element - Effect is constrained within
 *      wrapping element's boundaries
 * -->
 * <button type="button" class="ez-btn ez-theme-primary">
 *   <ez-ripple></ez-ripple>
 *   Hello
 * </button>
 *
 * <!-- Around element - Effect is unconstrained --
 *      uses `ez-ripple:empty` selector to know
 *      which mode the element is running in.
 * -->
 * <label for="checkbox" class="ez-theme-success">
 *   <ez-ripple>
 *     <input class="ez-checkbox" type="checkbox" id="checkbox" name="checkbox"/>
 *   </ez-ripple>
 *   <span>Checkbox</span>
 * </label>
 * ```
 */
export class EzRippleElement extends HTMLElement {
  static localName: string = xRippleName;

  static get observedAttributes() {
    return observedAttributes;
  }

  /**
   * @prop {boolean} pauseUpdates - When true, prevents updates to CSS properties.  Used internally.
   */
  pauseUpdates = false;

  #initialized = false;
  #rippleActive = false;
  #attrsChangedMap: Record<string, any> = {};

  /**
   * @prop {boolean} rippleActive - Ripple active state.
   * @attr
   */
  get rippleActive(): boolean {
    return this.#rippleActive;
  }

  set rippleActive(bln: any) {
    this.#rippleActive = Boolean(bln);

    if (!this.#attrsChangedMap[RIPPLE_ACTIVE_NAME]) {
      this.#attrsChangedMap[RIPPLE_ACTIVE_NAME] = true;
      if (this.#rippleActive) this.setAttribute(RIPPLE_ACTIVE_NAME, '');
      else this.removeAttribute(RIPPLE_ACTIVE_NAME);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.#attrsChangedMap[RIPPLE_ACTIVE_NAME];
    }
    if (!this.pauseUpdates) this.update();
  }

  get localName() {
    return (
      (this.constructor as unknown as EzRippleElement).localName ?? xRippleName
    );
  }

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      addRippleEffect(this);

      _mutObserver.observe(this, _mutObserverConfig);
      _resizeObserver.observe(this);
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      removeRippleEffect(this);
      _resizeObserver.unobserve(this);
      this.#initialized = false;
    }
  }

  attributeChangedCallback(attrName, prevValue, newValue) {
    switch (attrName) {
      // Reflected attribute
      case RIPPLE_ACTIVE_NAME:
        if (!this.#attrsChangedMap[RIPPLE_ACTIVE_NAME]) {
          this.rippleActive = newValue !== null;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete this.#attrsChangedMap[RIPPLE_ACTIVE_NAME];
        }
        break;
      default:
        break;
    }
  }

  /**
   * Updates ripple CSS properties (css vars on element).
   */
  update() {
    _updateCssProps(this);
  }
}
