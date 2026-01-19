'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {EzFieldElement} from 'atomic-ui-js/ez-field/index.js';

const EzFieldComponent = createComponent({
  tagName: EzFieldElement.localName,
  elementClass: EzFieldElement,
  react: React
});

export default EzFieldComponent;
