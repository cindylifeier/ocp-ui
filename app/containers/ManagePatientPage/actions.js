/*
 *
 * ManagePatientPage actions
 *
 */

import {
  SAVE_PATIENT, SAVE_PATIENT_ERROR,
} from './constants';

export function savePatient(patientFormData, handleSubmitting) {
  return {
    type: SAVE_PATIENT,
    patientFormData,
    handleSubmitting,
  };
}

export function savePatientError() {
  return {
    type: SAVE_PATIENT_ERROR,
  };
}
