/*
 *
 * Practitioners reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PRACTITIONER_SEARCH_RESULT, SEARCH_PRACTITIONERS_ERROR,
  SEARCH_PRACTITIONERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  searchPractitioners: {
    result: false,
  },
});

function practitionersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRACTITIONER_SEARCH_RESULT:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['searchPractitioners', 'result'], false);
    case SEARCH_PRACTITIONERS_SUCCESS:
      return state
        .setIn(['searchPractitioners', 'result'], action.searchResult)
        .set('loading', false);
    case SEARCH_PRACTITIONERS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default: {
      return state;
    }
  }
}

export default practitionersReducer;
