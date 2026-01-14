import { registerCustomElement } from '../js/utils';

export const xMenuItemName = 'ez-menu-item';

export class EzMenuItem extends HTMLElement {
  get localName() {
    return xMenuItemName;
  }
}

registerCustomElement(xMenuItemName, EzMenuItem);
