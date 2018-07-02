/*
 *
 * PermissionAssignments reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';

import {
  ASSIGN_USER_ROLE_ERROR,
  ASSIGN_USER_ROLE_SUCCESS,
  GET_GROUPS,
  GET_GROUPS_ERROR,
  GET_GROUPS_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  INITIALIZE_PERMISSION_ASSIGNMENT,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
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
    case GET_GROUPS:
      return state
        .set('loading', true);
    case GET_GROUPS_SUCCESS:
      return state
        .set('loading', false)
        .set('groups', action.groups);
    case GET_GROUPS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case ASSIGN_USER_ROLE_SUCCESS: {
      const users = state.get('users').toJS();
      const groups = state.get('groups').toJS();
      users.map((user) => {
        if (user.id === action.userId) {
          const updatedUser = user;
          updatedUser.role = find(groups, { id: action.groupId }).displayName;
          const i = users.indexOf(user);
          users[i] = updatedUser;
          return updatedUser;
        }
        return user;
      });
      return state.set('users', fromJS(users));
    }
    case ASSIGN_USER_ROLE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default permissionAssignmentsReducer;
