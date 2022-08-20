export const classNameFromProps = ({defaultClassName, defaultClassNamePrefix, className}: HasClassName) =>
  `${defaultClassName || defaultClassNamePrefix} ${className}`
;
