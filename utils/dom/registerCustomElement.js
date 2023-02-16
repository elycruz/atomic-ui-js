export const registerCustomElement = (elementName, elementConstructor) => {
  if (typeof customElements !== 'undefined' && !customElements?.get(elementName)) {
    customElements.define(elementName, elementConstructor);
  }
};
