export const registerCustomElement = (elementName, elementConstructor) => {
    if (!customElements.get(elementName)) {
      customElements.define(elementName, elementConstructor);
    }
  },
  querySelector = (selector, root = document) =>
    root.querySelector(selector),

  querySelectorAll = (selector, root = document) =>
    root.querySelectorAll(selector);
