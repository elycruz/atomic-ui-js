import lazy from 'next/dynamic';

const XToggleonscrollComponent = lazy(() => import('atomic-ui-js-react/x-toggleonscroll'), {
  ssr: false
});

export default XToggleonscrollComponent;
