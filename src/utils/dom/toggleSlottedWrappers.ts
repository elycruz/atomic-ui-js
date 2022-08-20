export const toggleSlottedWrappers = (ctx: HTMLElement, slotNames: string[]): void => {
  const sr = ctx.shadowRoot;
  slotNames.forEach(nameSuffix => {
    const elm = sr.querySelector(`.${nameSuffix}`),
      slot: HTMLSlotElement = !elm ? undefined : elm.querySelector(`[name=${nameSuffix}]`);
    if (!slot) {
      return;
    }
    const className = `has-${nameSuffix}`;
    if (!slot.assignedNodes().length) {
      ctx.classList.remove(className);
    } else {
      ctx.classList.add(className);
    }
  });
}
