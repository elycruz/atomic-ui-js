import { isNullable, typeOf } from '../object.js';

// isTouchCapable = window.ontouchend !== undefined,

export const isHTMLElement = (x: unknown): x is HTMLElement =>
  !isNullable(x) && x instanceof HTMLElement;

export const querySelector = (
  selector: string,
  element: ParentNode = document
): Element | null => element.querySelector(selector);

export const querySelectorAll = <E extends Element = Element>(
  selector: string,
  element: ParentNode = document
): E[] => Array.from(element.querySelectorAll<E>(selector));

export const qs = querySelector;

export const qsAll = querySelectorAll;

export const $ = qs;

export const $$ = qsAll;

export const addClass = (className: string, elm: Element): void => {
  elm.classList.add(className);
};

export const removeClass = (className: string, elm: Element): void => {
  elm.classList.remove(className);
};

export const toggleClass = (
  className: string,
  elm: Element,
  bln: boolean | null = null
): boolean => elm.classList.toggle(className, bln ?? undefined);

export const hasClass = (className: string, elm: Element): boolean =>
  elm.classList.contains(className);

export const replaceClass = (
  className1: string,
  className2: string,
  elm: Element
): boolean => elm.classList.replace(className1, className2);

export const addStyle = (
  keyName: string,
  keyValue: string,
  elm: HTMLElement
): HTMLElement => {
  elm.style[keyName] = keyValue;
  return elm;
};

export const whereMatchesSelector =
  (selector: string) =>
  (element: Element): boolean =>
    element.matches(selector);

/**
 * Finds an element that matches selector (from right to left (up dom tree)) or
 *  undefined if search reaches the top of the current document's tree without finding a match.
 * @param pred Predicate function that receives the element, index, and original element
 * @param element Starting element to search from
 * @param ind Index counter (used internally for recursion)
 * @returns The matching parent element or undefined
 */
export const findParentElmBy = (
  pred: (
    element: Element | null,
    ind: number,
    originalElement: Element
  ) => boolean,
  element: Element | null,
  ind = 0
): Element | null => {
  if (!element || element.parentElement === document.documentElement) {
    return null;
  }
  if (pred(element, ind, element)) {
    return element;
  }
  if (!pred(element.parentElement, ind, element)) {
    return findParentElmBy(pred, element.parentElement, ++ind);
  }
  return element.parentElement;
};

export const isTouchEvent = (e: Event): e is TouchEvent =>
  e.type.startsWith('touch');

export const eventFromPossibleTouchEvent = (
  e: MouseEvent | TouchEvent,
  initialTouch = true
): MouseEvent | Touch => {
  if (isTouchEvent(e)) {
    const { touches } = e;

    return initialTouch ? touches[0] : touches[touches.length - 1];
  }
  return e;
};

export const errorIfNotHtmlElement = (
  contextName: string,
  propName: string,
  element?: any
): void => {
  if (!isHTMLElement(element)) {
    throw new Error(
      '_' +
        contextName +
        '.' +
        propName +
        ' can only be set to type of "HTMLElement".  ' +
        'Type received: ' +
        typeOf(element)
    );
  }
};
