'use client';

import React from 'react';
import { createComponent } from '@lit/react';
import { EzAppbarElement, xAppbarEvents } from 'atomic-ui-js/ez-appbar';

const EzAppbarComponent = createComponent({
  tagName: EzAppbarElement.localName,
  elementClass: EzAppbarElement,
  react: React,
  events: {
    onXAppbarIntersected: xAppbarEvents.Intersected,
    onXAppbarNotIntersected: xAppbarEvents.NotIntersected,
  },
});

export default EzAppbarComponent;
