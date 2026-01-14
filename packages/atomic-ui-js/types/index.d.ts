import {EzRippleElement} from "../ez-ripple";
import {EzAppbarElement} from "../ez-appbar";
import {EzToggleOnScrollElement} from "../ez-toggleonscroll";
import {EzFieldElement} from "../ez-field";
import {EzTypeaheadElement} from "../ez-typeahead";

declare global {
  interface HTMLElementTagNameMap {
    'ez-appbar': EzAppbarElement;
    'ez-field': EzFieldElement;
    'ez-ripple': EzRippleElement;
    'ez-typeahead': EzTypeaheadElement;
    'ez-toggleonscroll': EzToggleOnScrollElement;
  }
}
