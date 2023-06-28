import lazy from 'next/dynamic';

const XToggleOnScrollComponent = lazy(() => import('atomic-ui-js-react/x-ToggleOnScroll'), {
  ssr: false
});

export default XToggleOnScrollComponent;
