import {EzRippleElement} from "../ez-ripple";
import {EzAppbarElement} from "../ez-appbar";
import {EzToggleOnScrollElement} from "../ez-toggleonscroll";
import {EzFieldElement} from "../ez-field";

declare global {
  interface HTMLElementTagNameMap {
    'ez-appbar': EzAppbarElement;
    'ez-field': EzFieldElement;
    'ez-ripple': EzRippleElement;
    'ez-toggleonscroll': EzToggleOnScrollElement;
  }
}
