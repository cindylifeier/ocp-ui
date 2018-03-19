/*
 *
 * Organizations reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  data: [],
  searchOrganizations: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
});

function organizationsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_ORGANIZATIONS:
      return initialState;
    case SEARCH_ORGANIZATIONS:
      return state
        .setIn(['searchOrganizations', 'loading'], true);
    case SEARCH_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'result'], fromJS(action.organizations.elements))
        .setIn(['searchOrganizations', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['searchOrganizations', 'currentPage'], action.organizations.currentPage);
    case SEARCH_ORGANIZATIONS_ERROR:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'result'], fromJS([]));
    default:
      return state;
  }
}

export default organizationsReducer;
