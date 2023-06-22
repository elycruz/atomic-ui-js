// 'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XAppBarElement} from 'atomic-ui-js/x-app-bar/index.js';

const XAppBarComponent = createComponent({
  tagName: XAppBarElement.localName,
  elementClass: XAppBarElement,
  react: React
});

export default XAppBarComponent;
