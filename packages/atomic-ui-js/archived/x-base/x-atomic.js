import {LitElement} from 'lit';

export class EzAtomic extends LitElement {
  static localName = '';

  get localName() {
    return this.constructor.localName;
  }
}
