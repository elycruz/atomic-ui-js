'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {XAppbarElement, xAppbarEvents} from 'atomic-ui-js/x-appbar/index.js';

const XAppbarComponent = createComponent({
  tagName: XAppbarElement.localName,
  elementClass: XAppbarElement,
  react: React,
  events: {
    onXAppbarIntersected: xAppbarEvents.onXAppbarIntersected,
    onXAppbarNotIntersected: xAppbarEvents.onXAppbarNotIntersected,
  }
});

export default XAppbarComponent;
