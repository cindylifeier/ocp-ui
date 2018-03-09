/*
 *
 * UpcomingAppointments reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS_SUCCESS,
  GET_UPCOMING_APPOINTMENTS_ERROR,
  LOADING,
  DATA,
} from './constants';

const initialState = fromJS({
  loading: false,
  query: null,
});

function upcomingAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UPCOMING_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set(DATA, null);
    case GET_UPCOMING_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.upcomingAppointmentsPage || {}));
    case GET_UPCOMING_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    default:
      return state;
  }
}

export default upcomingAppointmentsReducer;
