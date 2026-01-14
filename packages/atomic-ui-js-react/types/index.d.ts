/// <reference types="atomic-ui-js" />

import {EzTypeaheadElement} from "atomic-ui-js/ez-typeahead";
import {EzToggleOnScrollElement} from "atomic-ui-js/ez-toggleonscroll";
import {EzAppbarElement} from "atomic-ui-js/ez-appbar";
import {EzFieldElement} from "atomic-ui-js/ez-field";

declare namespace JSX {
  interface IntrinsicElements {
    'ez-appbar': EzAppbarElement;
    'ez-field': EzFieldElement;
    'ez-ripple': EzRippleElement;
    'ez-typeahead': EzTypeaheadElement;
    'ez-toggleonscroll': EzToggleOnScrollElement;
  }
}
