/*
 *
 * PractitionerAppointments actions
 *
 */


import {
  CANCEL_PRACTITIONER_APPOINTMENT,
  CANCEL_PRACTITIONER_APPOINTMENT_ERROR,
  CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS,
  GET_PRACTITIONER_APPOINTMENTS,
  GET_PRACTITIONER_APPOINTMENTS_ERROR,
  GET_PRACTITIONER_APPOINTMENTS_SUCCESS,
  INITIALIZE_PRACTITIONER_APPOINTMENTS,
} from './constants';

export function initializePractitionerAppointments() {
  return {
    type: INITIALIZE_PRACTITIONER_APPOINTMENTS,
  };
}

export function getPractitionerAppointments(query) {
  return {
    type: GET_PRACTITIONER_APPOINTMENTS,
    query,
  };
}

export function getPractitionerAppointmentsSuccess(practitionerAppointmentsPage) {
  return {
    type: GET_PRACTITIONER_APPOINTMENTS_SUCCESS,
    practitionerAppointmentsPage,
  };
}

export function getPractitionerAppointmentsError(error) {
  return {
    type: GET_PRACTITIONER_APPOINTMENTS_ERROR,
    error,
  };
}


export function cancelPractitionerAppointment(id) {
  return {
    type: CANCEL_PRACTITIONER_APPOINTMENT,
    id,
  };
}

export function cancelPractitionerAppointmentSuccess(id) {
  return {
    type: CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS,
    id,
  };
}

export function cancelPractitionerAppointmentError(error) {
  return {
    type: CANCEL_PRACTITIONER_APPOINTMENT_ERROR,
    error,
  };
}
