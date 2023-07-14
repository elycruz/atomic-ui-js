import lazy from 'next/dynamic';

const XToggleClassOnScrollComponent = lazy(() => import('atomic-ui-js-react/x-toggleonscroll'), {
  ssr: false
});

export default XToggleClassOnScrollComponent;
