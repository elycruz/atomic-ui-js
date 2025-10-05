'use client';

import lazy from 'next/dynamic';

const XRippleComponent = lazy(() => import('atomic-ui-js-react/x-ripple'), {
  ssr: false
});

export default XRippleComponent;
