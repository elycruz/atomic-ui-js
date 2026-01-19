/**
 * Sets a namespace on an object with optional value at the end of the namespace.
 * @param nsString {string} - Namespace or namespace-string to set on `obj`.
 * @param obj {object} - Object to add namespace(s) on.
 * @param [valueToSet=undefined] {*} - Value to set.  Optional.  Default `undefined`.
 * @returns {*} - Object that was passed in.
 */
export const namespacer = (
  nsString?: string,
  obj?: object,
  valueToSet?: any
): object | undefined => {
  if (!nsString || !obj) {
    return obj;
  }

  const shouldSetValue = valueToSet !== undefined,
    nss = nsString.startsWith('.') ? nsString.slice(1) : nsString;

  // Reduce original object to itself with requested modifications
  return nss.split('.').reduce((agg, key, ind, parts) => {
    if (ind === parts.length - 1 && shouldSetValue) {
      agg[key] = valueToSet;
    } else if (agg[key] === undefined) {
      agg[key] = {};
    }
    return agg[key];
  }, obj);
};
