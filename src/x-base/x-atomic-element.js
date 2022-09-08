import {LitElement} from "lit";

export class XAtomicElement extends LitElement {
  static localName = "";

  get localName() {
    return this.constructor.localName;
  }
}
