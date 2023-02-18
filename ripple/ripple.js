import {debounce} from "../utils/index.js";

export const xRippleName = 'x-ripple',
  rippleClassName = xRippleName;

/**
 * @module ripple
 *
 * Adds/Removes 'Bounded' (enclosed) ripple effects from an element.
 */
const _mouseOverEventName = 'mouseenter',
  _mouseDownEventName = 'mousedown',
  _activeSuffix = '--actsive',

  _rippleDiameterCssPropName = `--${xRippleName}-diameter`,
  _rippleXCssPropName = `--${xRippleName}-x`,
  _rippleYCssPropName = `--${xRippleName}-y`,

  /**
   * @param {AnimationEvent} e
   */
  _onRippleAnimationEnd = function (e) {
    e.currentTarget
      .classList.remove(`${rippleClassName}${_activeSuffix}`);
  },

  /**
   * @param {MouseEvent} e
   */
  _onRippleElementMouseDown = function (e) {
    if (e.type === _mouseOverEventName) {
      _updateCssProps(e.currentTarget, e);
      return;
    }
    _rippleActive(e.currentTarget, e);
  },

  /**
   * @param {HTMLElement} ctx
   * @param {MouseEvent} [e]
   */
  _updateCssProps = (ctx, e) => {
    const rippleRadius = Math.max(ctx.offsetHeight, ctx.offsetWidth);

    ctx.style.setProperty(_rippleDiameterCssPropName, rippleRadius * 2 + 'px');

    if (!e) return;

    const rippleX = `${e.offsetX - (rippleRadius + (ctx.offsetWidth / 2))}px`,
      rippleY = `${e.offsetY - (rippleRadius + (ctx.offsetHeight / 2))}px`;

    ctx.style.setProperty(_rippleXCssPropName, rippleX);
    ctx.style.setProperty(_rippleYCssPropName, rippleY);
  },

  _rippleActive = (ctx, e) => {
    ctx.classList.remove(`${rippleClassName}${_activeSuffix}`);
    _updateCssProps(ctx, e);
    ctx.classList.add(`${rippleClassName}${_activeSuffix}`);
  },

  addRippleEffect = (ctx) => {
    removeRippleEffect(ctx);
    _updateCssProps(ctx);
    // ctx.addEventListener(_animationEndEventName, _onRippleAnimationEnd);
    ctx.addEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    ctx.addEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    ctx.addEventListener('focusout', _onRippleAnimationEnd);
    return ctx;
  },

  removeRippleEffect = (ctx) => {
    // ctx.removeEventListener(_animationEndEventName, _onRippleAnimationEnd);
    ctx.removeEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    ctx.removeEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    ctx.removeEventListener('focusout', _onRippleAnimationEnd);
    return ctx;
  },

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

export class XRipple extends HTMLElement {
  static localName = xRippleName;

  #initialized = false;

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

  update() {
    // _updateCssProps(this);
  }
}
