/*
 *
 * UserRegistration reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_RESOURCES, SEARCH_RESOURCES_ERROR,
  SEARCH_RESOURCES_SUCCESS, INITIALIZE_USER_REGISTRATION,
} from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
  error: false,
});

function userRegistrationReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_USER_REGISTRATION:
      return initialState;
    case SEARCH_RESOURCES:
      return state
        .set('loading', true);
    case SEARCH_RESOURCES_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.resources.elements))
        .set('totalElements', action.resources.totalElements)
        .set('currentPageSize', action.resources.currentPageSize)
        .set('totalNumberOfPages', action.resources.totalNumberOfPages)
        .set('currentPage', action.resources.currentPage);
    case SEARCH_RESOURCES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default userRegistrationReducer;
