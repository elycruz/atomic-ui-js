export type EventListenerTuple<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap,
> = [
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  eventName: K,
  options?: boolean | AddEventListenerOptions,
];

export const preventDefault = (e: Event): void => {
  e.preventDefault();
};

export const stopPropagation = (e: Event): void => {
  e.stopPropagation();
};

export const addEventListener = <K extends keyof HTMLElementEventMap>(
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  eventName: K,
  element: HTMLElement,
  options?: boolean | AddEventListenerOptions
): HTMLElement => {
  element.addEventListener(eventName, listener, options);
  return element;
};

export const removeEventListener = <K extends keyof HTMLElementEventMap>(
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  eventName: K,
  element: HTMLElement,
  options?: boolean | EventListenerOptions
): HTMLElement => {
  element.removeEventListener(eventName, listener, options);
  return element;
};

export const addEventListeners = <K extends keyof HTMLElementEventMap>(
  listenerEvNameOpsTuple: EventListenerTuple<K>[],
  element: HTMLElement
): typeof element =>
  listenerEvNameOpsTuple.reduce(
    (elm, [listener, evName, options]) =>
      addEventListener(listener, evName, elm, options),
    element
  );

export const removeEventListeners = <K extends keyof HTMLElementEventMap>(
  listenerEvNameOpsTuple: EventListenerTuple<K>[],
  element: HTMLElement
): typeof element =>
  listenerEvNameOpsTuple.reduce(
    (elm, [listener, evName, options]) =>
      removeEventListener(listener, evName, elm, options),
    element
  );

export const throwNoOverrideError = (): never => {
  throw new Error('Should override method from extending class.');
};

export const waitFor = async (timeout?: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout ?? 0);
  });
};
