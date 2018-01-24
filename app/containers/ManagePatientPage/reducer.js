/*
 *
 * ManagePatientPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_PATIENT, SAVE_PATIENT_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  patientFormData: {},
});

function managePatientPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PATIENT:
      return state
        .set('error', false)
        .set('patientFormData', action.patientFormData);
    case SAVE_PATIENT_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default managePatientPageReducer;
