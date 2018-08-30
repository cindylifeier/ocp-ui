import has from 'lodash/has';

export function checkFieldSelected(formValues, fieldName) {
  return !has(formValues, fieldName);
}
