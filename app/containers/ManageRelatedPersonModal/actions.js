/*
 *
 * ManageRelatedPersonModal actions
 *
 */

import { SEARCH_RELATED_PERSONS, SEARCH_RELATED_PERSONS_ERROR, SEARCH_RELATED_PERSONS_SUCCESS } from './constants';

export function searchRelatedPersons(patientId, searchValue, currentPage) {
  return {
    type: SEARCH_RELATED_PERSONS,
    patientId,
    searchValue,
    currentPage,
  };
}

export function searchRelatedPersonsSuccess(relatedPersons) {
  return {
    type: SEARCH_RELATED_PERSONS_SUCCESS,
    relatedPersons,
  };
}

export function searchRelatedPersonsError(error) {
  return {
    type: SEARCH_RELATED_PERSONS_ERROR,
    error,
  };
}
