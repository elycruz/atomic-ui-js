import {XRippleElement} from "../x-ripple";
import {XAppbarElement} from "../x-appbar";
import {XToggleOnScrollElement} from "../x-toggleonscroll";
import {XFieldElement} from "../x-field";
import {XTypeaheadElement, xTypeaheadName} from "../x-typeahead";

declare global {
  interface HTMLElementTagNameMap {
    'x-appbar': XAppbarElement;
    'x-field': XFieldElement;
    'x-ripple': XRippleElement;
    'x-typeahead': XTypeaheadElement;
    'x-toggleonscroll': XToggleOnScrollElement;
  }
}
