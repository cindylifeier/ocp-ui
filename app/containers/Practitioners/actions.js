/*
 *
 * Practitioners actions
 *
 */

import { LOAD_PRACTITIONER_SEARCH_RESULT, SEARCH_PRACTITIONERS_ERROR, SEARCH_PRACTITIONERS_SUCCESS } from './constants';

export function loadPractitionerSearchResult(searchTerms, searchType, includeInactive, currentPage) {
  return {
    type: LOAD_PRACTITIONER_SEARCH_RESULT,
    searchTerms,
    searchType,
    includeInactive,
    currentPage,
  };
}

export function searchPractitionersSuccess(searchResult, searchTerms, searchType, includeInactive) {
  return {
    type: SEARCH_PRACTITIONERS_SUCCESS,
    searchResult,
    queryParameters: {
      searchTerms, searchType, includeInactive,
    },
  };
}

export function searchPractitionersError(error) {
  return {
    type: SEARCH_PRACTITIONERS_ERROR,
    error,
  };
}
