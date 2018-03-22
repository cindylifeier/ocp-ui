/*
 *
 * Practitioners reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_PRACTITIONERS,
  LOAD_PRACTITIONER_SEARCH_RESULT,
  SEARCH_PRACTITIONERS_ERROR,
  SEARCH_PRACTITIONERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  searchPractitioners: {
    result: false,
    totalPages: 0,
    currentPageSize: 0,
    currentPage: 0,
  },
});

function practitionersReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PRACTITIONERS:
      return initialState;
    case LOAD_PRACTITIONER_SEARCH_RESULT:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['searchPractitioners', 'result'], false);
    case SEARCH_PRACTITIONERS_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['searchPractitioners', 'result'], action.searchResult.elements)
        .setIn(['searchPractitioners', 'queryParameters', 'searchTerms'], action.queryParameters.searchTerms)
        .setIn(['searchPractitioners', 'queryParameters', 'searchType'], action.queryParameters.searchType)
        .setIn(['searchPractitioners', 'queryParameters', 'includeInactive'], action.queryParameters.includeInactive)
        .setIn(['searchPractitioners', 'currentPage'], action.searchResult.currentPage)
        .setIn(['searchPractitioners', 'currentPageSize'], action.searchResult.currentPageSize)
        .setIn(['searchPractitioners', 'totalElements'], action.searchResult.totalElements)
        .setIn(['searchPractitioners', 'totalPages'], action.searchResult.totalNumberOfPages);
    case SEARCH_PRACTITIONERS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default: {
      return state;
    }
  }
}

export default practitionersReducer;
