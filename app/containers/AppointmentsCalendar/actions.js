/*
 *
 * AppointmentsCalendar actions
 *
 */

import {
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_ERROR,
} from './constants';

// Get
export function getAppointments(query) {
  return {
    type: GET_APPOINTMENTS,
    query,
  };
}

export function getAppointmentsSuccess(appointments) {
  return {
    type: GET_APPOINTMENTS_SUCCESS,
    appointments,
  };
}

export function getAppointmentsError(error) {
  return {
    type: GET_APPOINTMENTS_ERROR,
    error,
  };
}
