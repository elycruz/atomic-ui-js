import lazy from 'next/dynamic';

const XAppBarComponent = lazy(() => import('atomic-ui-js-react/x-app-bar'), {
  ssr: false
});

export default XAppBarComponent;
