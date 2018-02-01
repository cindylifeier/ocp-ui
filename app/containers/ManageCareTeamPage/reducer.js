/*
 *
 * ManageCareTeamPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_PATIENT_SUCCESS, INITIALIZE_MANAGE_CARE_TEAM } from './constants';

const initialState = fromJS({
  patient: null,
});

function manageCareTeamPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_CARE_TEAM:
      return initialState;
    case GET_PATIENT_SUCCESS:
      return state
        .set('patient', action.patient);
    default:
      return state;
  }
}

export default manageCareTeamPageReducer;
