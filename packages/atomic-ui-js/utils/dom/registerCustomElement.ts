export const registerCustomElement = (
  elementName,
  elementConstructor,
  registry = customElements
) => {
  if (typeof registry !== 'undefined' && !registry?.get(elementName)) {
    registry.define(elementName, elementConstructor);
  }
};
