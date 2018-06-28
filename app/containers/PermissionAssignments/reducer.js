/*
 *
 * PermissionAssignments reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR, INITIALIZE_PERMISSION_ASSIGNMENT } from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  users: [],
});

function permissionAssignmentsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PERMISSION_ASSIGNMENT:
      return state
        .set('loading', true);
    case GET_USERS:
      return state
        .set('loading', true);
    case GET_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('users', action.users);
    case GET_USERS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default permissionAssignmentsReducer;
