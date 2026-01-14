'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {EzTypeaheadElement} from 'atomic-ui-js/ez-typeahead/index.js';

const EzTypeaheadComponent = createComponent({
  tagName: EzTypeaheadElement.localName,
  elementClass: EzTypeaheadElement,
  react: React
});

export default EzTypeaheadComponent;
