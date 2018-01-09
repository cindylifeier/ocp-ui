/*
 *
 * Organizations reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_ORGANIZATIONS_ERROR, LOAD_ORGANIZATIONS_SUCCESS } from './constants';

const initialState = fromJS({
  loading: true,
  data: [],
});

function organizationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORGANIZATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.organizations);
    case LOAD_ORGANIZATIONS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default organizationsReducer;
