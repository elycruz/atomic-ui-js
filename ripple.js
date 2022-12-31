export const RippleEffect = {
    BOUNDED: 'bounded',
    UNBOUNDED: 'unbounded'
  },

  animationEndEventName = 'animationend',
  mouseOverEventName = 'mouseenter',
  mouseDownEventName = 'mousedown',
  activeSuffix = '--active',

  onRippleAnimationEnd = function (e) {
    e.currentTarget
      .classList.remove(`${rippleUpgradedClassName}${activeSuffix}`);
  },

  onRippleElementMouseDown = function (e) {
    if (e.type === mouseOverEventName) {
      updateCssProps(e.currentTarget, e);
      return;
    }
    rippleActive(e.currentTarget, e);
  },

  rippleDiameterCssPropName = '--x-ripple-diameter',
  rippleXCssPropName = '--x-ripple-x',
  rippleYCssPropName = '--x-ripple-y',
  rippleUpgradedClassName = 'x-ripple-upgraded',

  updateCssProps = (ctx, e) => {
    ctx.rippleDiameter = Math.max(ctx.offsetHeight, ctx.offsetWidth);
    if (ctx.rippleEffect === RippleEffect.BOUNDED) {
      ctx.rippleDiameter = ctx.rippleDiameter * 2;
    }
    ctx.style.setProperty(rippleDiameterCssPropName, ctx.rippleDiameter + 'px');
    if (!e) return;
    if (ctx.rippleEffect === RippleEffect.BOUNDED) {
      ctx.rippleX = `${(e.clientX - ctx.offsetLeft + window.scrollX) / ctx.offsetWidth * 100 - 100}%`;
      ctx.rippleY = `${(e.clientY - ctx.offsetTop + window.scrollY) / ctx.offsetHeight * 100 - 100}%`;
      ctx.style.setProperty(rippleXCssPropName, ctx.rippleX);
      ctx.style.setProperty(rippleYCssPropName, ctx.rippleY);
    }
  },

  rippleActive = (ctx, e) => {
    ctx.classList.remove(`${rippleUpgradedClassName}${activeSuffix}`);
    updateCssProps(ctx, e);
    ctx.classList.add(`${rippleUpgradedClassName}${activeSuffix}`);
  },

  addRippleEffect = (ctx) => {
    ctx.classList.add(
      rippleUpgradedClassName,
      `${rippleUpgradedClassName}--${ctx.rippleEffect}`
    );
    ctx.rippleDiameter = Math.max(ctx.offsetHeight, ctx.offsetWidth);
    if (!ctx.rippleEffect) {
      ctx.rippleEffect = RippleEffect.BOUNDED;
    }
    if (ctx.rippleEffect === RippleEffect.BOUNDED) {
      ctx.style.top = 0;
      ctx.style.left = 0;
    }
    updateCssProps(ctx);
    ctx.addEventListener(animationEndEventName, onRippleAnimationEnd);
    ctx.addEventListener(mouseOverEventName, onRippleElementMouseDown);
    ctx.addEventListener(mouseDownEventName, onRippleElementMouseDown);
    return ctx;
  },

  removeRippleEffect = (ctx) => {
    ctx.removeEventListener(animationEndEventName, onRippleAnimationEnd);
    ctx.removeEventListener(mouseOverEventName, onRippleElementMouseDown);
    ctx.removeEventListener(mouseDownEventName, onRippleElementMouseDown);
    const className = rippleUpgradedClassName;
    ctx.classList.remove(
      className,
      `${className}${activeSuffix}`,
      `${className}--${ctx.rippleEffect}`
    );
    return ctx;
  },

  rippleResizeObserver = new ResizeObserver((records) => {
    for (const r of records) {
      updateCssProps(r.target);
    }
  });
