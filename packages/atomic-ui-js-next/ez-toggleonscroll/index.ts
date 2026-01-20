'use client';

import lazy from 'next/dynamic';

const EzToggleOnScrollComponent = lazy(
  // @ts-expect-error - Temporarily disabled.
  () => import('atomic-ui-js-react/ez-toggleonscroll'),
  {
    ssr: false,
  }
);

export default EzToggleOnScrollComponent;
