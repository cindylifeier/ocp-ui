/*
 *
 * ManagePractitionerPage actions
 *
 */

import { SAVE_PRACTITIONER, SAVE_PRACTITIONER_ERROR } from './constants';

export function savePractitioner(practitionerFormData, handleSubmitting) {
  return {
    type: SAVE_PRACTITIONER,
    practitionerFormData,
    handleSubmitting,
  };
}

export function savePractitionerError(error) {
  return {
    type: SAVE_PRACTITIONER_ERROR,
    error,
  };
}
