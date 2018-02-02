/*
 *
 * Patients constants
 *
 */

/**
 * Patients action types
 * @type {string}
 */
export const INITIALIZE_PATIENTS = 'ocpui/Patients/INITIALIZE_PATIENTS';
export const SEARCH_PATIENTS_SUCCESS = 'ocpui/Patients/GET_PATIENTS_SUCCESS';
export const SEARCH_PATIENTS_ERROR = 'ocpui/Patients/SEARCH_PATIENTS_ERROR';
export const LOAD_PATIENT_SEARCH_RESULT = 'ocpui/Patients/LOAD_PATIENT_SEARCH_RESULT';

export const SEARCH_TERM_MIN_LENGTH = 3;
export const SEARCH_TYPE = {
  NAME: 'name',
  IDENTIFIER: 'identifier',
};
