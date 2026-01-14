'use client';

import lazy from 'next/dynamic';

const EzAppBarComponent = lazy(() => import('atomic-ui-js-react/ez-appbar'), {
  ssr: false
});

export default EzAppBarComponent;
