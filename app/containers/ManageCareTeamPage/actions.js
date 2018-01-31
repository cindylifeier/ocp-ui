/*
 *
 * ManageCareTeamPage actions
 *
 */

import { GET_PATIENT, GET_PATIENT_SUCCESS, INITIALIZE_MANAGE_CARE_TEAM } from './constants';

export function initializeManageCareTeam() {
  return {
    type: INITIALIZE_MANAGE_CARE_TEAM,
  };
}

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
