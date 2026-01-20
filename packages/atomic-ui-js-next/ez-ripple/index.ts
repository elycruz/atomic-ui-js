'use client';

import lazy from 'next/dynamic';

// @ts-expect-error - Temporarily disabled.
const EzRippleComponent = lazy(() => import('atomic-ui-js-react/ez-ripple'), {
  ssr: false,
});

export default EzRippleComponent;
