'use client';

import lazy from 'next/dynamic';

const EzRippleComponent = lazy(() => import('atomic-ui-js-react/ez-ripple'), {
  ssr: false
});

export default EzRippleComponent;
