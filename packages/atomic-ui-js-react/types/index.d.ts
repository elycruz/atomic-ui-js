/// <reference types="atomic-ui-js" />

import {EzToggleOnScrollElement} from "atomic-ui-js/ez-toggleonscroll";
import {EzAppbarElement} from "atomic-ui-js/ez-appbar";
import {EzFieldElement} from "atomic-ui-js/ez-field";
import {EzRippleElement} from "atomic-ui-js/ez-ripple";

declare namespace JSX {
  interface IntrinsicElements {
    'ez-appbar': EzAppbarElement;
    'ez-field': EzFieldElement;
    'ez-ripple': EzRippleElement;
    'ez-toggleonscroll': EzToggleOnScrollElement;
  }
}
