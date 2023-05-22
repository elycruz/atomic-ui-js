import lazy from "next/dynamic";

const XFieldComponent = lazy(() => import("atomic-ui-js-react/x-field"), {
  ssr: false
});

export default XFieldComponent;
