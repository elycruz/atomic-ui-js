/// <reference types="atomic-ui-js" />

import {XTypeaheadElement} from "atomic-ui-js/x-typeahead";
import {XToggleOnScrollElement} from "atomic-ui-js/x-toggleonscroll";
import {XAppbarElement} from "atomic-ui-js/x-appbar";
import {XFieldElement} from "atomic-ui-js/x-field";

declare namespace JSX {
  interface IntrinsicElements {
    'x-appbar': XAppbarElement;
    'x-field': XFieldElement;
    'x-ripple': XRippleElement;
    'x-typeahead': XTypeaheadElement;
    'x-toggleonscroll': XToggleOnScrollElement;
  }
}
