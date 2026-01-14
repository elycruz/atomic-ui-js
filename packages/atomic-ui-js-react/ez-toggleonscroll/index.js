'use client';

import React from 'react';
import {createComponent} from '@lit/react';
import {EzToggleOnScrollElement} from 'atomic-ui-js/ez-toggleonscroll/index.js';

const EzToggleOnScrollComponent = createComponent({
  tagName: EzToggleOnScrollElement.localName,
  elementClass: EzToggleOnScrollElement,
  react: React
});

export default EzToggleOnScrollComponent;
