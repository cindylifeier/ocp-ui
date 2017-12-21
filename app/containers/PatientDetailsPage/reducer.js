/*
 *
 * PatientDetailsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_PATIENT, LOAD_PATIENT_SUCCESS } from './constants';

const initialState = fromJS({
  patientId: '',
  patient: {},
});

function patientDetailsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PATIENT:
      return state
        .setIn(['patientId'], action.patientId);
    case LOAD_PATIENT_SUCCESS:
      return state
        .setIn(['patient'], action.patient);
    default:
      return state;
  }
}

export default patientDetailsPageReducer;
