/*
 *
 * UpcomingAppointments reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS_SUCCESS,
  GET_UPCOMING_APPOINTMENTS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  patientName: null,
  data: null,
  query: null,
});

function upcomingAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_UPCOMING_APPOINTMENTS:
      return initialState;
    case GET_UPCOMING_APPOINTMENTS:
      return state
        .set('loading', true)
        .set('data', null)
        .set('patientName', action.patientName)
        .set('query', fromJS(action.query));
    case GET_UPCOMING_APPOINTMENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.upcomingAppointmentsPage || {}));
    case GET_UPCOMING_APPOINTMENTS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default upcomingAppointmentsReducer;
