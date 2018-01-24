/*
 *
 * ManagePatientPage actions
 *
 */

import {
  SAVE_PATIENT, SAVE_PATIENT_ERROR,
} from './constants';

export function savePatient(patientFormData) {
  return {
    type: SAVE_PATIENT,
    patientFormData,
  };
}

export function savePatientError() {
  return {
    type: SAVE_PATIENT_ERROR,
  };
}
