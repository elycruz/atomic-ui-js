export const registerCustomElement = (elementName, elementConstructor) => {
  if (!customElements.get(elementName)) {
    customElements.define(elementName, elementConstructor);
  }
};
