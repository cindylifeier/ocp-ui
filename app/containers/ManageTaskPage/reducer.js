/*
 *
 * ManageTaskPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  GET_ACTIVITY_DEFINITIONS_ERROR,
  GET_ACTIVITY_DEFINITIONS_SUCCESS,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_SUCCESS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
  GET_EVENT_TYPES_SUCCESS,
  GET_EVENT_TYPES_ERROR,
  GET_TASK_SUCCESS,
  GET_TASK_ERROR,
} from './constants';

const initialState = fromJS({});

function manageTaskPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATION_SUCCESS:
      return state
        .set('organization', action.organization);
    case GET_ACTIVITY_DEFINITIONS_SUCCESS:
      return state
        .set('activityDefinitions', action.activityDefinitions);
    case GET_PRACTITIONERS_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case GET_EVENT_TYPES_SUCCESS:
      return state
        .set('eventTypes', action.eventTypes);
    case CREATE_TASK_SUCCESS:
      return state.set('error', false);
    case GET_TASK_SUCCESS:
      return state
        .set('task', action.task);
    case GET_ORGANIZATION_ERROR:
    case GET_ACTIVITY_DEFINITIONS_ERROR:
    case GET_EVENT_TYPES_ERROR:
    case GET_PRACTITIONERS_ERROR:
    case CREATE_TASK_ERROR:
    case GET_TASK_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default manageTaskPageReducer;
