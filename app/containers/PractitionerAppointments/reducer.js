/*
 *
 * PractitionerAppointments reducer
 *
 */

import {
  CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS,
  DATA,
  GET_PRACTITIONER_APPOINTMENTS,
  GET_PRACTITIONER_APPOINTMENTS_ERROR,
  GET_PRACTITIONER_APPOINTMENTS_SUCCESS,
  LOADING,
  STATUS_CODE_CANCELLED,
} from 'containers/PractitionerAppointments/constants';
import { fromJS } from 'immutable';
import find from 'lodash/find';

const initialState = fromJS({
  loading: false,
  query: null,
  showPastAppointments: false,
});

function practitionerAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRACTITIONER_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set('showPastAppointments', action.query.showPastAppointments)
        .set(DATA, null);
    case GET_PRACTITIONER_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.practitionerAppointmentsPage || {}));
    case GET_PRACTITIONER_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      find(data.elements, { logicalId: action.id }).statusCode = STATUS_CODE_CANCELLED;
      return state.set(DATA, fromJS(data));
    }
    default:
      return state;
  }
}

export default practitionerAppointmentsReducer;
