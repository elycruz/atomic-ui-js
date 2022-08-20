import {registerCustomElement} from "../js/utils";

export const xMenuItemName = 'x-menu-item';

export class XMenuItem extends HTMLElement {
  get localName() {
    return xMenuItemName;
  }
}

registerCustomElement(xMenuItemName, XMenuItem);
