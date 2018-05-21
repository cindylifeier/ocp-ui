/*
 *
 * AppointmentsCalendar actions
 *
 */

import {
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_ERROR,
  GET_APPOINTMENTS_SUCCESS,
  GET_OUTLOOK_APPOINTMENTS,
  GET_OUTLOOK_APPOINTMENTS_ERROR,
  GET_OUTLOOK_APPOINTMENTS_SUCCESS,
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

export function getOutlookAppointments() {
  return {
    type: GET_OUTLOOK_APPOINTMENTS,
  };
}

export function getOutlookAppointmentsSuccess(outlookAppointments) {
  return {
    type: GET_OUTLOOK_APPOINTMENTS_SUCCESS,
    outlookAppointments,
  };
}

export function getOutlookAppointmentsError(error) {
  return {
    type: GET_OUTLOOK_APPOINTMENTS_ERROR,
    error,
  };
}
