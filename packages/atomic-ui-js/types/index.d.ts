import {XRippleElement} from "../x-ripple";

declare global {
  interface HTMLElementTagNameMap {
    [XRippleElement.localName]: XRippleElement;
  }
}
