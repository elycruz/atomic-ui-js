import {debounce} from "../utils/index.js";

export const xRippleName = 'x-ripple';

/**
 * @module ripple
 *
 * Adds/Removes 'Bounded' (enclosed) ripple effects from an element.
 */
const _mouseOverEventName = 'mouseenter',
  _mouseDownEventName = 'mousedown',
  _animationEndEventName = 'mousedown',

  _rippleDiameterCssPropName = `--${xRippleName}-diameter`,
  _rippleXCssPropName = `--${xRippleName}-x`,
  _rippleYCssPropName = `--${xRippleName}-y`,

  /**
   * @param {Event} e
   * @returns {XRippleElement}
   */
  _rippleCtxFromEvent = e =>
    e.currentTarget instanceof XRippleElement ? e.currentTarget : e.currentTarget.querySelector(`:scope > ${xRippleName}`),

  /**
   * @param {AnimationEvent} e
   */
  _onRippleAnimationEnd = function (e) {
    const ctx = _rippleCtxFromEvent(e);
    if (ctx.persistActive) ctx.persistActive = false;
  },

  /**
   * @param {MouseEvent} e
   */
  _onRippleElementMouseDown = function (e) {
    const rippleCtx = _rippleCtxFromEvent(e);

    if (e.type === _mouseOverEventName) {
      _updateCssProps(rippleCtx, e);
      return;
    }
    _rippleActive(rippleCtx, e);
  },

  /**
   * @param {XRippleElement} ctx
   * @param {MouseEvent} [e]
   */
  _updateCssProps = (ctx, e) => {
    let rippleRadius;
    if (ctx.childElementCount) rippleRadius = Math.max(ctx.offsetHeight, ctx.offsetWidth);
    else if (ctx.parentElement) rippleRadius = Math.max(ctx.parentElement.offsetHeight, ctx.parentElement.offsetWidth);
    else return;

    ctx.style.setProperty(
      _rippleDiameterCssPropName,
      `${rippleRadius * ctx.radiusMultiplier}px`
    );

    if (!e) return;

    const rippleX = `${e.offsetX - (rippleRadius + (ctx.offsetWidth / 2))}px`,
      rippleY = `${e.offsetY - (rippleRadius + (ctx.offsetHeight / 2))}px`;

    ctx.style.setProperty(_rippleXCssPropName, rippleX);
    ctx.style.setProperty(_rippleYCssPropName, rippleY);
  },

  _rippleActive = (ctx, e) => {
    ctx.persistActive = false;
    _updateCssProps(ctx, e);
    ctx.persistActive = true;
  },

  addRippleEffect = (ctx) => {
    const eventTarget = !ctx.childElementCount ? ctx.parentElement : ctx;

    removeRippleEffect(eventTarget);

    // Ensure any applied side effects are removed
    if (ctx.childElementCount) removeRippleEffect(ctx.parentElement);

    _updateCssProps(ctx);
    ctx.addEventListener(_animationEndEventName, _onRippleAnimationEnd);
    eventTarget.addEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    eventTarget.addEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    eventTarget.addEventListener('focusout', _onRippleAnimationEnd);

    return ctx;
  },

  removeRippleEffect = (ctx) => {
    ctx.removeEventListener(_animationEndEventName, _onRippleAnimationEnd);
    ctx.removeEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    ctx.removeEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    ctx.removeEventListener('focusout', _onRippleAnimationEnd);
    return ctx;
  },

  PERSIST_ACTIVE_NAME = 'persistactive',
  RADIUS_MULTIPLIER_NAME = 'radiusmultiplier',

  observedAttributes = [PERSIST_ACTIVE_NAME, RADIUS_MULTIPLIER_NAME],

  _resizeObserver = new ResizeObserver(debounce((records) => {
    if (!records?.length) return;

    records[0].target.update();
  }, 377)),

  _mutObserver = new MutationObserver((records) => {
    const recordsLen = records.length;

    let requiresUpdate = false,
      target;

    for (let i = 0; i < recordsLen; i += 1) {
      const r = records[i];

      if (r.addedNodes.length || r.removedNodes.length) {
        target = r.target;
        requiresUpdate = true;
        break;
      }
    }

    if (requiresUpdate && target) target.update();
  }),

  _mutObserverConfig = {childList: true};

export {addRippleEffect, removeRippleEffect}

export class XRippleElement extends HTMLElement {
  static localName = xRippleName;

  static get observedAttributes() {
    return observedAttributes;
  }

  #initialized = false;
  #radiusMultiplier = 2;
  #persistActive = false;
  #attrsChangedMap = {};

  get radiusMultiplier() {
    return this.#radiusMultiplier;
  }

  set radiusMultiplier(x) {
    this.#radiusMultiplier = Number(x) ?? 2;
    this.update();
  }

  get persistActive() {
    return this.#persistActive;
  }

  set persistActive(bln) {
    this.#persistActive = Boolean(bln);

    // if (!this.#attrsChangedMap[PERSIST_ACTIVE_NAME]) {
    //   this.#attrsChangedMap[PERSIST_ACTIVE_NAME] = true;
      if (this.#persistActive) this.setAttribute(PERSIST_ACTIVE_NAME, '');
      else this.removeAttribute(PERSIST_ACTIVE_NAME);
    // } else {
    //   this.#attrsChangedMap[PERSIST_ACTIVE_NAME] = false;
    // }
    this.update();
  }

  get localName() {
    return this.constructor.localName;
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
    console.log(attrName, prevValue, newValue);

    switch (attrName) {
      // Reflected attribute
      case PERSIST_ACTIVE_NAME:
        // if (!this.#attrsChangedMap[PERSIST_ACTIVE_NAME]) {
        //   this.persistActive = newValue !== null;
        // }/* else this.#attrsChangedMap[PERSIST_ACTIVE_NAME] = false;*/
        break;
      case RADIUS_MULTIPLIER_NAME:
        this.radiusMultiplier = newValue;
        break;
      default:
        break;
    }
  }

  update() {
    _updateCssProps(this);
  }
}
