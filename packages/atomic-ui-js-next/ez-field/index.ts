'use client';

import lazy from 'next/dynamic';

const EzFieldComponent = lazy(
  () => import('atomic-ui-js-react/ez-field').then(mod => mod.default),
  {
    ssr: false,
  }
);

export default EzFieldComponent;
