import lazy from 'next/dynamic';

const XBackToTopBtnComponent = lazy(() => import('atomic-ui-js-react/x-back-to-top-btn'), {
  ssr: false
});

export default XBackToTopBtnComponent;
