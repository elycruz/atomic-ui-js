'use client';

import lazy from 'next/dynamic';

const EzToggleOnScrollComponent = lazy(
  () => import('atomic-ui-js-react/ez-toggleonscroll').then(mod => mod.default),
  {
    ssr: false,
  }
);

export default EzToggleOnScrollComponent;
