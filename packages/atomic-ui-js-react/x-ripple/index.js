'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {XRippleElement} from 'atomic-ui-js/x-ripple/index.js';

const XRippleComponent = createComponent({
  tagName: XRippleElement.localName,
  elementClass: XRippleElement,
  react: React
});

export default XRippleComponent;
