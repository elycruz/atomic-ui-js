import {isset, typeOf} from '../object.js';

export const // isTouchCapable = window.ontouchend !== undefined,

  isHTMLElement = (x) => isset(x) && x instanceof HTMLElement,

  querySelector = (selector, element = document) =>
    element.querySelector(selector),

  querySelectorAll = (selector, element = document) =>
    Array.from(element.querySelectorAll(selector)),

  qs = querySelector,

  qsAll = querySelectorAll,

  $ = qs,

  $$ = qsAll,

  addClass = (className, elm) => elm.classList.add(className),

  removeClass = (className, elm) => elm.classList.remove(className),

  toggleClass = (className, elm, bln = null) => elm.classList.toggle(className, bln),

  hasClass = (className, elm) => elm.classList.contains(className),

  replaceClass = (className1, className2, elm) => elm.classList.replace(className1, className2),

  addStyle = (keyName, keyValue, elm) => {
    elm.style[keyName] = keyValue;
    return elm;
  },

  whereMatchesSelector = (selector) => (element) => element.matches(selector),

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

  isTouchEvent = (e) => e.type.indexOf('touch') === 0,

  eventFromPossibleTouchEvent = (e, initialTouch = true) => {
    if (isTouchEvent(e)) {
      const {touches} = e;
      return initialTouch ? touches[0] : touches[touches.length - 1];
    }
    return e;
  },

  errorIfNotHtmlElement = (contextName, propName, element) => {
    if (!isHTMLElement(element)) {
      throw new Error(
        '_' + contextName + '.' + propName +
        ' can only be set to type of "HTMLElement".  ' +
        'Type received: ' + typeOf(element),
      );
    }
  };
