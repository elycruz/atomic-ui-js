'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XToggleonscrollElement} from 'atomic-ui-js/x-toggleonscroll/index.js';

const XToggleonscrollComponent = createComponent({
  tagName: XToggleonscrollElement.localName,
  elementClass: XToggleonscrollElement,
  react: React
});

export default XToggleonscrollComponent;
