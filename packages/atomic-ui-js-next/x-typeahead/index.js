import lazy from 'next/dynamic';

const XTypeaheadComponent = lazy(() => import('atomic-ui-js-react/x-typeahead'), {
  ssr: false
});

export default XTypeaheadComponent;
