'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {EzRippleElement} from 'atomic-ui-js/ez-ripple/index.js';

const EzRippleComponent = createComponent({
  tagName: EzRippleElement.localName,
  elementClass: EzRippleElement,
  react: React
});

export default EzRippleComponent;
