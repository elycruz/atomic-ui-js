'use client';

import lazy from 'next/dynamic';

const EzTypeaheadComponent = lazy(() => import('atomic-ui-js-react/ez-typeahead'), {
  ssr: false
});

export default EzTypeaheadComponent;
