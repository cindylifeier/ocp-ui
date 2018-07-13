/*
 *
 * ManageRelatedPersonModal actions
 *
 */

import { SEARCH_RELATED_PERSONS, SEARCH_RELATED_PERSONS_ERROR, SEARCH_RELATED_PERSONS_SUCCESS } from './constants';

export function searchRelatedPersons(currentPage, searchValue, showInActive, searchType) {
  return {
    type: SEARCH_RELATED_PERSONS,
    currentPage,
    searchValue,
    showInActive,
    searchType,
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
