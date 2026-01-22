'use client';

import lazy from 'next/dynamic';

const EzAppBarComponent = lazy(
  () => import('atomic-ui-js-react/ez-appbar').then(mod => mod.default),
  {
    ssr: false,
  }
);

export default EzAppBarComponent;
