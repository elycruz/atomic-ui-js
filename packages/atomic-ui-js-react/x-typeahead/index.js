'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {XTypeaheadElement} from 'atomic-ui-js/x-typeahead/index.js';

const XTypeaheadComponent = createComponent({
  tagName: XTypeaheadElement.localName,
  elementClass: XTypeaheadElement,
  react: React
});

export default XTypeaheadComponent;
