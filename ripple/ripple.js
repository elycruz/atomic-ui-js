import {XAtomic} from "../archived/x-base/index.js";
import {addRippleEffect, removeRippleEffect} from "../ripple.js";

export const xRippleName = 'x-ripple';

export class XRipple extends XAtomic {
  static localName = xRippleName;

  #initialized = false;

  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      addRippleEffect(this);
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#initialized = false;
      removeRippleEffect(this);
    }
  }

  render() {
    return html`
      <slot></slot>`;
  }
}
