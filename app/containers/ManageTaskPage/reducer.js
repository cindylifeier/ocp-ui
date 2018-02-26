/*
 *
 * ManageTaskPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PATIENT_SUCCESS, GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_ERROR, GET_ACTIVITY_DEFINITIONS_SUCCESS,
  GET_ACTIVITY_DEFINITIONS_ERROR, GET_PRACTITIONERS_SUCCESS,
  GET_PRACTITIONERS_ERROR, CREATE_TASK_SUCCESS, CREATE_TASK_ERROR,
} from './constants';

const initialState = fromJS({});

function manageTaskPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_SUCCESS:
      return state
        .set('patient', action.patient);
    case GET_ORGANIZATION_SUCCESS:
      return state
        .set('organization', action.organization);
    case GET_ACTIVITY_DEFINITIONS_SUCCESS:
      return state
        .set('activityDefinitions', action.activityDefinitions);
    case GET_PRACTITIONERS_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case CREATE_TASK_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case GET_ORGANIZATION_ERROR:
    case GET_ACTIVITY_DEFINITIONS_ERROR:
    case GET_PRACTITIONERS_ERROR:
    case CREATE_TASK_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default manageTaskPageReducer;
