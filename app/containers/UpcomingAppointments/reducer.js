/*
 *
 * UpcomingAppointments reducer
 *
 */

import {
  CANCEL_APPOINTMENT_SUCCESS,
  DATA,
  GET_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS_ERROR,
  GET_UPCOMING_APPOINTMENTS_SUCCESS,
  LOADING,
  STATUS_CODE_CANCELLED,
} from 'containers/UpcomingAppointments/constants';
import { fromJS } from 'immutable';
import find from 'lodash/find';

const initialState = fromJS({
  loading: false,
  query: null,
  showPastAppointments: false,
});

function upcomingAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UPCOMING_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set('showPastAppointments', action.query.showPastAppointments)
        .set(DATA, null);
    case GET_UPCOMING_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.upcomingAppointmentsPage || {}));
    case GET_UPCOMING_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case CANCEL_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      find(data.elements, { logicalId: action.id }).statusCode = STATUS_CODE_CANCELLED;
      return state.set(DATA, fromJS(data));
    }
    default:
      return state;
  }
}

export default upcomingAppointmentsReducer;
