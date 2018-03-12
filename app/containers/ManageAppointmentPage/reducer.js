/*
 *
 * ManageAppointmentPage reducer
 *
 */


import { INITIALIZE_MANAGE_APPOINTMENT } from 'containers/ManageAppointmentPage/constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  patient: null,
  appointment: null,
});

function manageAppointmentPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_APPOINTMENT:
      return initialState;
    default:
      return state;
  }
}

export default manageAppointmentPageReducer;
