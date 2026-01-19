/**
 * Request animation frame (limiter).
 * Uses return value of `fn` to decide whether to stop animation
 * or not.
 *
 * Note:  Return a falsy value from `fn` (callback) to signal exiting the animation.
 */
export function rafLimiter(fn: (delta?: number) => boolean, fps = 60) {
  const interval = 1000 / fps,
    _then = Date.now();

  return (function loop(then: number): number | undefined {
    const now = Date.now(),
      delta = now - then;

    let stopAnimation = false;

    if (delta > interval) {
      // Update time
      // now - (delta % interval) is an improvement over just
      // using then = now, which can end up lowering overall fps
      const newThen = now - (delta % interval);

      // call the fn
      stopAnimation = fn(newThen);
    }

    return stopAnimation ? undefined : requestAnimationFrame(loop);
  })(_then);
}
