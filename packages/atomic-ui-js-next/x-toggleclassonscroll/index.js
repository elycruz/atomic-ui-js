import lazy from 'next/dynamic';

const XToggleClassOnScrollComponent = lazy(() => import('atomic-ui-js-react/x-toggleclassonscroll'), {
  ssr: false
});

export default XToggleClassOnScrollComponent;
