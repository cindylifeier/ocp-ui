/*
 *
 * UpcomingAppointments actions
 *
 */

import {
  INITIALIZE_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS_SUCCESS,
  GET_UPCOMING_APPOINTMENTS_ERROR,
} from './constants';

export function initializeUpcomingAppointments() {
  return {
    type: INITIALIZE_UPCOMING_APPOINTMENTS,
  };
}

export function getUpcomingAppointments() {
  return {
    type: GET_UPCOMING_APPOINTMENTS,
  };
}

export function getUpcomingAppointmentsSuccess(upcomingAppointmentsPage) {
  return {
    type: GET_UPCOMING_APPOINTMENTS_SUCCESS,
    upcomingAppointmentsPage,
  };
}

export function getUpcomingAppointmentsError(error) {
  return {
    type: GET_UPCOMING_APPOINTMENTS_ERROR,
    error,
  };
}
