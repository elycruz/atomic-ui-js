import {XRippleElement} from "../x-ripple";
import {XAppbarElement} from "../x-appbar";
import {XToggleOnScrollElement} from "../x-toggleonscroll";
import {XFieldElement} from "../x-field";

declare global {
  interface HTMLElementTagNameMap {
    [XAppbarElement.localName]: XAppbarElement;
    [XFieldElement.localName]: XFieldElement;
    [XRippleElement.localName]: XRippleElement;
    [XToggleOnScrollElement.localName]: XToggleOnScrollElement;
  }
}
