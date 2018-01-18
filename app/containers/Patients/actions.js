/*
 *
 * Patients actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PATIENT_SEARCH_RESULT,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage) {
  return {
    type: LOAD_PATIENT_SEARCH_RESULT,
    searchTerms,
    searchType,
    includeInactive,
    currentPage,
  };
}

export function searchPatientsSuccess(searchResult, searchTerms, searchType, includeInactive) {
  return {
    type: SEARCH_PATIENTS_SUCCESS,
    searchResult,
    queryParameters: {
      searchTerms, searchType, includeInactive,
    },
  };
}

export function searchPatientsError(error) {
  return {
    type: SEARCH_PATIENTS_ERROR,
    error,
  };
}

