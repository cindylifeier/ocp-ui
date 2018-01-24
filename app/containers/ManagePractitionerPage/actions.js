/*
 *
 * ManagePractitionerPage actions
 *
 */

import { SAVE_PRACTITIONER, SAVE_PRACTITIONER_ERROR } from './constants';

export function savePractitioner(practitionerFormData) {
  return {
    type: SAVE_PRACTITIONER,
    practitionerFormData,
  };
}

export function savePractitionerError(error) {
  return {
    type: SAVE_PRACTITIONER_ERROR,
    error,
  };
}
