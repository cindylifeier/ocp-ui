/*
 *
 * PatientToDos reducer
 *
 */

import { fromJS } from 'immutable';
import {
 GET_PATIENT_TO_DO_MAIN_TASK_ERROR,
  GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS,
  GET_PATIENT_TO_DOS,
  GET_PATIENT_TO_DOS_ERROR,
 GET_PATIENT_TO_DOS_SUCCESS,
} from 'containers/PatientToDos/constants';

const initialState = fromJS({
  data: [],
  toDoMainTask: [],
  loading: false,
});

function patientToDosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_TO_DOS:
      return state.set('loading', true);
    case GET_PATIENT_TO_DOS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.toDos) || []));
    case GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('toDoMainTask', fromJS((action.toDoMainTask) || []));
    case GET_PATIENT_TO_DO_MAIN_TASK_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    case GET_PATIENT_TO_DOS_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    default:
      return state;
  }
}

export default patientToDosReducer;
