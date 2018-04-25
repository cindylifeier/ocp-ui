/*
 *
 * ManageActivityDefinitionPage reducer
 *
 */

import { fromJS } from 'immutable';
import { SAVE_ACTIVITY_DEFINITION_ERROR, SAVE_ACTIVITY_DEFINITION_SUCCESS } from './constants';

const initialState = fromJS({});

function manageActivityDefinitionPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_ACTIVITY_DEFINITION_SUCCESS:
      return state.set('error', false);
    case SAVE_ACTIVITY_DEFINITION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageActivityDefinitionPageReducer;
