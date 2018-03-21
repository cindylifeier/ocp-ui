/*
 *
 * Practitioners reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRACTITIONERS,
  GET_PRACTITIONERS_SUCCESS,
  INITIALIZE_PRACTITIONERS,
  SEARCH_PRACTITIONERS,
  SEARCH_PRACTITIONERS_ERROR,
  SEARCH_PRACTITIONERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  listPractitioners: {
    loading: false,
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
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
    case GET_PRACTITIONERS:
      return state
        .setIn(['listPractitioners', 'loading'], true);
    case GET_PRACTITIONERS_SUCCESS:
      return state
        .setIn(['listPractitioners', 'loading'], false)
        .setIn(['listPractitioners', 'data'], fromJS(action.practitioners.elements))
        .setIn(['listPractitioners', 'totalNumberOfPages'], action.practitioners.totalNumberOfPages)
        .setIn(['listPractitioners', 'currentPage'], action.practitioners.currentPage);
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
