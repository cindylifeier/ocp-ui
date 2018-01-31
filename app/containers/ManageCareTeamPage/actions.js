/*
 *
 * ManageCareTeamPage actions
 *
 */

import { GET_PATIENT, GET_PATIENT_SUCCESS } from './constants';

export function getPatient(patientId) {
  return {
    type: GET_PATIENT,
    patientId,
  };
}

export function getPatientSuccess(patient) {
  return {
    type: GET_PATIENT_SUCCESS,
    patient,
  };
}
