// 'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XBackToTopBtnElement} from 'atomic-ui-js/x-back-to-top-btn/index.js';

const XBackToTopBtnComponent = createComponent({
  tagName: XBackToTopBtnElement.localName,
  elementClass: XBackToTopBtnElement,
  react: React
});

export default XBackToTopBtnComponent;
