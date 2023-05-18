'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XRippleElement} from 'atomic-ui-js/x-ripple/index.js';

export const XRippleComponent = createComponent({
  tagName: XRippleElement.localName,
  elementClass: XRippleElement,
  react: React
});
