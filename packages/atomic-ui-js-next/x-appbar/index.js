import lazy from 'next/dynamic';

const XAppBarComponent = lazy(() => import('atomic-ui-js-react/x-appbar'), {
  ssr: false
});

export default XAppBarComponent;
