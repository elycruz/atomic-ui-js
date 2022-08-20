import {curry, isset, typeOf} from 'fjl';

export const isTouchCapable = window.ontouchend !== undefined,

  isHTMLElement = (x: any): boolean => isset(x) && x instanceof HTMLElement,

  cleanSelector = (selector: string): string => {
    const s = (!isset(selector) ? '' : selector.toString()).trim();
    return s.indexOf('>') === 0 ? s.substring(1) : s;
  },

  querySelector = (selector: string, element: Element | Document = document) =>
    element.querySelector(cleanSelector(selector)),

  querySelectorAll = (selector, element = document) =>
    Array.from(element.querySelectorAll(cleanSelector(selector))),

  addClass = (className, elm) => elm.classList.add(className),

  removeClass = (className, elm) => elm.classList.remove(className),

  toggleClass = (className, elm) => elm.classList.toggle(className),

  hasClass = (className, elm) => elm.classList.contains(className),

  addStyle = (keyName, keyValue, elm) => {
    elm.style[keyName] = keyValue;
    return elm;
  },

  whereMatchesSelector = selector => {
    const s = cleanSelector(selector);
    return (element => element.matches(s));
  },

  /**
   * Finds an element that matches selector (from right to left (up dom tree)) or
   *  undefined if search reaches the top of the current document's tree without finding a match.
   * @param pred {Function.<Element.parentElement, Number, Element>}
   * @param element {Element}
   * @param [ind = 0]{Number} - Not required, used internally to pass the index to the predicate function.
   * @returns {*}
   */
  findParentElmBy = (pred, element, ind = 0) => {
    if (!element || element.parentElement === document.documentElement) {
      return;
    }
    if (pred(element, ind, element)) {
      return element;
    }
    if (!pred(element.parentElement, ind, element)) {
      return findParentElmBy(pred, element.parentElement, ++ind);
    }
    return element.parentElement;
  },

  isTouchEvent = (e: MouseEvent | TouchEvent): boolean => e.type.indexOf('touch') === 0,

  eventFromPossibleTouchEvent = (e: TouchEvent | MouseEvent, initialTouch = true): MouseEvent | Touch => {
    if (isTouchEvent(e)) {
      const {touches} = (e as TouchEvent);
      return initialTouch ? touches[0] : touches[touches.length - 1];
    }
    return e as MouseEvent;
  },

  errorIfNotHtmlElement = curry((contextName, propName, element) => {
    if (!isHTMLElement(element)) {
      throw new Error(
        '#' + contextName + '.' + propName + ' can only be set to type of "HTMLElement".  ' +
        'Type received: ' + typeOf(element));
    }
  }) as (c: string, p: string, e: any) => void,

  getReverseTabKeyHandler = (ctx: HTMLElement) => (e: UIEvent): void => {
    e.preventDefault();
    if (!ctx.matches(':focus-within')) {
      return;
    }
    ctx.dispatchEvent(e);
  }

;
