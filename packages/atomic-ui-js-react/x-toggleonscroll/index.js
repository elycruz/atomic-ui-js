'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XToggleOnScrollElement} from 'atomic-ui-js/x-toggleonscroll/index.js';

const XToggleOnScrollComponent = createComponent({
  tagName: XToggleOnScrollElement.localName,
  elementClass: XToggleOnScrollElement,
  react: React
});

export default XToggleOnScrollComponent;
