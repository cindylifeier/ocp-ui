/*
 *
 * PermissionsGroups reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_GROUPS,
  GET_GROUPS_ERROR,
  GET_GROUPS_SUCCESS,
  GET_SCOPES_ERROR,
  GET_SCOPES_SUCCESS,
  SAVE_GROUP_ERROR,
  SAVE_GROUP_SUCCESS,
  SAVE_GROUP,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
});
function permissionsGroupsReducer(state = initialState, action) {
  switch (action.type) {
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
    case GET_SCOPES_SUCCESS:
      return state
        .set('loading', false)
        .set('scopes', action.scopes);
    case GET_SCOPES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SAVE_GROUP:
      return state
        .set('loading', true);
    case SAVE_GROUP_SUCCESS: {
      const groups = state.get('groups').toJS();
      return state
        .set('loading', false)
        .set('groups', fromJS(groups.concat(action.group)));
    }
    case SAVE_GROUP_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default permissionsGroupsReducer;
