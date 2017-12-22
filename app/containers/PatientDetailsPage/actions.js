/*
 *
 * PatientDetailsPage actions
 *
 */

import { LOAD_PATIENT, LOAD_PATIENT_ERROR, LOAD_PATIENT_SUCCESS } from './constants';

export function loadPatient(patientId) {
  return {
    type: LOAD_PATIENT,
    patientId,
  };
}

export function loadPatientSuccess(patient) {
  return {
    type: LOAD_PATIENT_SUCCESS,
    patient,
  };
}

export function loadPatientError(err) {
  return {
    type: LOAD_PATIENT_ERROR,
    err,
  };
}
