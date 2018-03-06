/*
 *
 * CareCoordinatorUpcomingAppointment actions
 *
 */

import {
  INITIALIZE_CARE_COORDINATOR_UPCOMING_APPOINTMENTS,
  GET_CARE_COORDINATOR_UPCOMING_APPOINTMENTS,
  GET_CARE_COORDINATOR_UPCOMING_APPOINTMENTS_SUCCESS,
  GET_CARE_COORDINATOR_UPCOMING_APPOINTMENTS_ERROR,
} from './constants';

export function initializeCareCoordinatorUpcomingAppointments() {
  return {
    type: INITIALIZE_CARE_COORDINATOR_UPCOMING_APPOINTMENTS,
  };
}

export function getCareCoordinatorUpcomingAppointsment() {
  return {
    type: GET_CARE_COORDINATOR_UPCOMING_APPOINTMENTS,
  };
}

export function getCareCoordinatorUpcomingAppointmentSuccess() {
  return {
    type: GET_CARE_COORDINATOR_UPCOMING_APPOINTMENTS_SUCCESS,
  };
}

export function getCareCoordinatorUpcomingAppointmentError(error) {
  return {
    type: GET_CARE_COORDINATOR_UPCOMING_APPOINTMENTS_ERROR,
    error,
  };
}
