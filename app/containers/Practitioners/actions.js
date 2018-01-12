/*
 *
 * Practitioners actions
 *
 */

import { LOAD_PRACTITIONER_SEARCH_RESULT, SEARCH_PRACTITIONERS_ERROR, SEARCH_PRACTITIONERS_SUCCESS } from './constants';

export function loadPractitionerSearchResult(searchTerms, searchType, includeInactive) {
  return {
    type: LOAD_PRACTITIONER_SEARCH_RESULT,
    searchTerms,
    searchType,
    includeInactive,
  };
}

export function searchPractitionersSuccess(searchResult, searchTerms) {
  return {
    type: SEARCH_PRACTITIONERS_SUCCESS,
    searchResult,
    searchTerms,
  };
}

export function searchPractitionersError(error) {
  return {
    type: SEARCH_PRACTITIONERS_ERROR,
    error,
  };
}
