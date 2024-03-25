'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {XFieldElement} from 'atomic-ui-js/x-field/index.js';

const XFieldComponent = createComponent({
  tagName: XFieldElement.localName,
  elementClass: XFieldElement,
  react: React
});

export default XFieldComponent;
