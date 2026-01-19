/**
 * Object utilities module.
 */

// Primitive type names used in return cases.
// ----
const _Number = Number.name,
  _NaN = 'NaN',
  _Null = 'Null',
  _Undefined = 'Undefined';

/**
 * @deprecated - Use `isNullable`.
 */
export const isset = (x: any) => x !== null && x !== undefined;

export const isNullable = (x: any): boolean => x === null || x === undefined;

/**
 * Returns the constructor/class/type name of a value.
 * @note For `NaN`, `null`, and `undefined` we return their names classed case;
 * 'NaN' (for `NaN`), 'Undefined' for `undefined` and 'Null' for `null`.
 */
export function typeOf(value: any): string {
  let retVal: string;

  if (value === undefined) {
    retVal = _Undefined;
  } else if (value === null) {
    retVal = _Null;
  } else {
    const { name: constructorName } = (value as object).constructor;

    retVal =
      constructorName === _Number && isNaN(value as number)
        ? _NaN
        : constructorName;
  }
  return retVal;
}
