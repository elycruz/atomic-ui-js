import {debounce} from '../utils/index.js';

export const xRippleName = 'x-ripple';

/**
 * @module ripple
 *
 * Adds/Removes 'Bounded' (enclosed) ripple effects from an element.
 */
const _mouseOverEventName = 'mouseenter',
  _mouseDownEventName = 'mousedown',
  _animationEndEventName = 'animationend',

  _rippleDiameterCssPropName = `--${xRippleName}-diameter`,
  _rippleXCssPropName = `--${xRippleName}-x`,
  _rippleYCssPropName = `--${xRippleName}-y`,
  _rippleInAniName = 'ripple-behavior-in',

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
    ctx.pauseUpdates = true;
    if (ctx.rippleActive) ctx.rippleActive = false;
    ctx.pauseUpdates = false;
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
    let rippleRadius,
      rippleOffsetX = e?.offsetX,
      rippleOffsetY = e?.offsetY;

    if (ctx.childElementCount) rippleRadius = Math.max(ctx.offsetHeight, ctx.offsetWidth);
    else if (ctx.parentElement) rippleRadius = Math.max(ctx.parentElement.offsetHeight, ctx.parentElement.offsetWidth);
    else return;

    ctx.style.setProperty(
      _rippleDiameterCssPropName,
      `${rippleRadius * ctx.radiusMultiplier}px`
    );

    if (!e || ctx.childElementCount) {
      rippleOffsetX = ctx.offsetHeight / 2;
      rippleOffsetY = ctx.offsetWidth / 2;
    } else if (rippleOffsetX === undefined) return;

    const rippleX = `${rippleOffsetX - (rippleRadius + (ctx.offsetWidth / 2))}px`,
      rippleY = `${rippleOffsetY - (rippleRadius + (ctx.offsetHeight / 2))}px`;

    ctx.style.setProperty(_rippleXCssPropName, rippleX);
    ctx.style.setProperty(_rippleYCssPropName, rippleY);
  },

  _rippleActive = (ctx, e) => {
    ctx.pauseUpdates = true;
    _updateCssProps(ctx, e);

    if (ctx.rippleActive) {
      ctx.getAnimations({subtree: true})
        .reverse()
        .find(ani => ani.animationName === _rippleInAniName)?.play();
    }

    ctx.rippleActive = true;
    ctx.pauseUpdates = false;
  },

  addRippleEffect = (ctx) => {
    const eventTarget = !ctx.childElementCount ? ctx.parentElement : ctx;

    removeRippleEffect(eventTarget);

    // Ensure any applied side effects are removed
    if (ctx.childElementCount) removeRippleEffect(ctx.parentElement);

    _updateCssProps(ctx);
    eventTarget.addEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    eventTarget.addEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    // eventTarget.addEventListener(_animationEndEventName, _onRippleAnimationEnd);
    eventTarget.addEventListener('focusout', _onRippleAnimationEnd);

    return ctx;
  },

  removeRippleEffect = (ctx) => {
    ctx.removeEventListener(_mouseOverEventName, _onRippleElementMouseDown);
    ctx.removeEventListener(_mouseDownEventName, _onRippleElementMouseDown);
    // ctx.removeEventListener(_animationEndEventName, _onRippleAnimationEnd);
    ctx.removeEventListener('focusout', _onRippleAnimationEnd);
    return ctx;
  },

  RIPPLE_ACTIVE_NAME = 'rippleactive',
  RADIUS_MULTIPLIER_NAME = 'radiusmultiplier',

  observedAttributes = [RIPPLE_ACTIVE_NAME, RADIUS_MULTIPLIER_NAME],

  _resizeObserver = new ResizeObserver(debounce((records) => {
    if (!records?.length) return;

    let lastTarget;

    records.forEach(record => {
      const {target} = record;

      // Only allow update if target hasn't already been updated in parent iteration
      if (!lastTarget || !lastTarget.isSameNode(target)) {
        lastTarget = target;
        target.update();
      } else {
        lastTarget = target;
      }
    });
  }, 377)),

  _mutObserver = new MutationObserver((records) => {
    const recordsLen = records.length;

    let target;

    for (let i = 0; i < recordsLen; i += 1) {
      const r = records[i];

      if (r.addedNodes.length || r.removedNodes.length) {
        if (!target || !target.isSameNode(r.target)) {
          r.target.update();
        }
        target = r.target;
      }
    }
  }),

  _mutObserverConfig = {childList: true, subtree: true};

export {addRippleEffect, removeRippleEffect, RIPPLE_ACTIVE_NAME, RADIUS_MULTIPLIER_NAME};

export class XRippleElement extends HTMLElement {
  static localName = xRippleName;

  static get observedAttributes() {
    return observedAttributes;
  }

  pauseUpdates = false;

  #initialized = false;
  #radiusMultiplier = 2;
  #rippleActive = false;
  #attrsChangedMap = {};

  get radiusMultiplier() {
    return this.#radiusMultiplier;
  }

  set radiusMultiplier(x) {
    this.#radiusMultiplier = Number(x) ?? 2;
    this.update();
  }

  get rippleActive() {
    return this.#rippleActive;
  }

  set rippleActive(bln) {
    this.#rippleActive = Boolean(bln);

    if (!this.#attrsChangedMap[RIPPLE_ACTIVE_NAME]) {
      this.#attrsChangedMap[RIPPLE_ACTIVE_NAME] = true;
      if (this.#rippleActive) this.setAttribute(RIPPLE_ACTIVE_NAME, '');
      else this.removeAttribute(RIPPLE_ACTIVE_NAME);
    } else {
      delete this.#attrsChangedMap[RIPPLE_ACTIVE_NAME];
    }
    if (!this.pauseUpdates) this.update();
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
    switch (attrName) {
    // Reflected attribute
    case RIPPLE_ACTIVE_NAME:
      if (!this.#attrsChangedMap[RIPPLE_ACTIVE_NAME]) {
        this.rippleActive = newValue !== null;
      } else delete this.#attrsChangedMap[RIPPLE_ACTIVE_NAME];
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
