/*
 *
 * ManageActivityDefinitionPage reducer
 *
 */

import { fromJS } from 'immutable';
import { POST_ACTIVITY_DEFINITION_ERROR, POST_ACTIVITY_DEFINITION_SUCCESS } from '../ManageActivityDefinitionPage/constants';

const initialState = fromJS({});

function manageActivityDefinitionPageReducer(state = initialState, action) {
  switch (action.type) {
    case POST_ACTIVITY_DEFINITION_SUCCESS:
      return state.set('error', false);
    case POST_ACTIVITY_DEFINITION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageActivityDefinitionPageReducer;
