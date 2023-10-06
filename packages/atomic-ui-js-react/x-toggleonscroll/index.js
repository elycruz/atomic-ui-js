'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XToggleOnScrollElement} from 'atomic-ui-js/x-toggleonscroll/index.js';

const XToggleClassOnScrollComponent = createComponent({
  tagName: XToggleOnScrollElement.localName,
  elementClass: XToggleOnScrollElement,
  react: React
});

export default XToggleClassOnScrollComponent;
