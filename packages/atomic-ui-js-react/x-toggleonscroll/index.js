'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XToggleClassOnScrollElement} from 'atomic-ui-js/x-toggleonscroll/index.js';

const XToggleClassOnScrollComponent = createComponent({
  tagName: XToggleClassOnScrollElement.localName,
  elementClass: XToggleClassOnScrollElement,
  react: React
});

export default XToggleClassOnScrollComponent;
