export const registerCustomElement = (
  elementName: string,
  elementConstructor: CustomElementConstructor,
  registry = customElements
) => {
  if (typeof registry !== 'undefined' && !registry.get?.(elementName)) {
    registry.define(elementName, elementConstructor);
  }
};
