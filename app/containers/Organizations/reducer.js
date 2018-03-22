/*
 *
 * Organizations reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_SUCCESS,
  INITIALIZE_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  listOrganizations: {
    loading: false,
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
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
    case GET_ORGANIZATIONS:
      return state
        .setIn(['listOrganizations', 'loading'], true);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['listOrganizations', 'loading'], false)
        .setIn(['listOrganizations', 'data'], fromJS(action.organizations.elements))
        .setIn(['listOrganizations', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['listOrganizations', 'totalElements'], action.organizations.totalElements)
        .setIn(['listOrganizations', 'currentPageSize'], action.organizations.currentPageSize)
        .setIn(['listOrganizations', 'currentPage'], action.organizations.currentPage);
    case SEARCH_ORGANIZATIONS:
      return state
        .setIn(['searchOrganizations', 'loading'], true);
    case SEARCH_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'result'], fromJS(action.organizations.elements))
        .setIn(['searchOrganizations', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['searchOrganizations', 'totalElements'], action.organizations.totalElements)
        .setIn(['searchOrganizations', 'currentPageSize'], action.organizations.currentPageSize)
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
