'use client';

import lazy from 'next/dynamic';

// @ts-expect-error - Temporarily disabled.
const EzFieldComponent = lazy(() => import('atomic-ui-js-react/ez-field'), {
  ssr: false,
});

export default EzFieldComponent;
