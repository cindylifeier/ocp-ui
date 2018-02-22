/*
 *
 * Organizations reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_ORGANIZATIONS,
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_ERROR,
  GET_ORGANIZATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
});

function organizationsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_ORGANIZATIONS:
      return initialState;
    case GET_ORGANIZATIONS:
      return state
        .set('loading', true);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.organizations.elements))
        .setIn(['totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['currentPage'], action.organizations.currentPage);
    case GET_ORGANIZATIONS_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default organizationsReducer;
