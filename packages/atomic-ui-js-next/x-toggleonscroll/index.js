'use client';

import lazy from 'next/dynamic';

const XToggleOnScrollComponent = lazy(() => import('atomic-ui-js-react/x-toggleonscroll'), {
  ssr: false
});

export default XToggleOnScrollComponent;
