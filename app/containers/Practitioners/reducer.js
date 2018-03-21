/*
 *
 * Practitioners reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_PRACTITIONERS,
  SEARCH_PRACTITIONERS,
  SEARCH_PRACTITIONERS_ERROR,
  SEARCH_PRACTITIONERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  searchPractitioners: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
    error: false,
  },
});

function practitionersReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PRACTITIONERS:
      return initialState;
    case SEARCH_PRACTITIONERS:
      return state
        .setIn(['searchPractitioners', 'loading'], true);
    case SEARCH_PRACTITIONERS_SUCCESS:
      return state
        .setIn(['searchPractitioners', 'loading'], false)
        .setIn(['searchPractitioners', 'result'], fromJS(action.practitioners.elements))
        .setIn(['searchPractitioners', 'totalNumberOfPages'], action.practitioners.totalNumberOfPages)
        .setIn(['searchPractitioners', 'currentPage'], action.practitioners.currentPage);
    case SEARCH_PRACTITIONERS_ERROR:
      return state
        .setIn(['searchPractitioners', 'loading'], false)
        .setIn(['searchPractitioners', 'error'], action.error);
    default: {
      return state;
    }
  }
}

export default practitionersReducer;
