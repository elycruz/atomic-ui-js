import {LitElement} from 'lit';

export class XAtomic extends LitElement {
  static localName = '';

  get localName() {
    return this.constructor.localName;
  }
}
