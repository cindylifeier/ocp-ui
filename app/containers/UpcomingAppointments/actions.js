/*
 *
 * UpcomingAppointments actions
 *
 */

import {
  CANCEL_APPOINTMENT,
  CANCEL_APPOINTMENT_ERROR,
  CANCEL_APPOINTMENT_SUCCESS,
  GET_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS_ERROR,
  GET_UPCOMING_APPOINTMENTS_SUCCESS,
  INITIALIZE_UPCOMING_APPOINTMENTS,
} from 'containers/UpcomingAppointments/constants';

export function initializeUpcomingAppointments() {
  return {
    type: INITIALIZE_UPCOMING_APPOINTMENTS,
  };
}

export function getUpcomingAppointments(query) {
  return {
    type: GET_UPCOMING_APPOINTMENTS,
    query,
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


export function cancelAppointment(id) {
  return {
    type: CANCEL_APPOINTMENT,
    id,
  };
}

export function cancelAppointmentSuccess(id) {
  return {
    type: CANCEL_APPOINTMENT_SUCCESS,
    id,
  };
}

export function cancelAppointmentError(error) {
  return {
    type: CANCEL_APPOINTMENT_ERROR,
    error,
  };
}
