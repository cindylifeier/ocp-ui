/*
 *
 * Organizations reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_ORGANIZATIONS, LOAD_ORGANIZATIONS_ERROR, LOAD_ORGANIZATIONS_SUCCESS } from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
});

function organizationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORGANIZATIONS:
      return state
        .set('loading', true);
    case LOAD_ORGANIZATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.organizations.elements)
        .setIn(['totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['currentPage'], action.organizations.currentPage);
    case LOAD_ORGANIZATIONS_ERROR:
      return state
        .set('loading', false)
        .set('data', []);
    default:
      return state;
  }
}

export default organizationsReducer;
