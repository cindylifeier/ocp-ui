/*
 *
 * AppointmentsCalendar reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DATA,
  LOADING,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_ERROR,
} from './constants';

const initialState = fromJS({});

function appointmentsCalendarReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set(DATA, null);
    case GET_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.appointments || {}));
    case GET_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    default:
      return state;
  }
}

export default appointmentsCalendarReducer;
