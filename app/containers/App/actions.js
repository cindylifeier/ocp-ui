/*
 *
 * LocationCreateEdit actions
 *
 */

import {
  GET_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_FROM_STORE,
  GET_LOOKUPS_SUCCESS, GET_PATIENT, GET_PATIENT_SUCCESS,
} from './constants';

export function getLookupsAction(lookupTypes) {
  return {
    type: GET_LOOKUPS,
    lookupTypes,
  };
}

export function getLookupsSuccess(lookups) {
  return {
    type: GET_LOOKUPS_SUCCESS,
    lookups,
  };
}
export function getLookupsFromStore() {
  return {
    type: GET_LOOKUPS_FROM_STORE,
  };
}

export function getLookupsError(error) {
  return {
    type: GET_LOOKUPS_ERROR,
    error,
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
