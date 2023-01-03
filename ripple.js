/**
 * @module ripple
 *
 * Adds/Removes 'Bounded' (enclosed) ripple effects from an element.
 */
const _mouseOverEventName = 'mouseenter',
  _mouseDownEventName = 'mousedown',
  _activeSuffix = '--active',

  _rippleDiameterCssPropName = '--x-ripple-diameter',
  _rippleXCssPropName = '--x-ripple-x',
  _rippleYCssPropName = '--x-ripple-y',
  _rippleClassName = 'x-ripple',

  /**
   * @param {AnimationEvent} e
   */
  _onRippleAnimationEnd = function (e) {
    e.currentTarget
      .classList.remove(`${_rippleClassName}${_activeSuffix}`);
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
    ctx.classList.remove(`${_rippleClassName}${_activeSuffix}`);
    _updateCssProps(ctx, e);
    ctx.classList.add(`${_rippleClassName}${_activeSuffix}`);
  },

  addRippleEffect = (ctx) => {
    removeRippleEffect(ctx);
    ctx.classList.add(
      _rippleClassName,
      `${_rippleClassName}-upgraded`,
      `${_rippleClassName}--${ctx.rippleEffect}`
    );
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
    ctx.classList.remove(
      _rippleClassName,
      `${_rippleClassName}${_activeSuffix}`,
      `${_rippleClassName}-upgraded`,
      `${_rippleClassName}--${ctx.rippleEffect}`
    );
    return ctx;
  };

export {addRippleEffect, removeRippleEffect}
