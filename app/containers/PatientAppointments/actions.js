/*
 *
 * PatientAppointments actions
 *
 */


import {
  CANCEL_PATIENT_APPOINTMENT,
  CANCEL_PATIENT_APPOINTMENT_ERROR,
  CANCEL_PATIENT_APPOINTMENT_SUCCESS,
  GET_PATIENT_APPOINTMENTS,
  GET_PATIENT_APPOINTMENTS_ERROR,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
  INITIALIZE_PATIENT_APPOINTMENTS,
} from './constants';

export function initializePatientAppointments() {
  return {
    type: INITIALIZE_PATIENT_APPOINTMENTS,
  };
}

export function getPatientAppointments(query) {
  return {
    type: GET_PATIENT_APPOINTMENTS,
    query,
  };
}

export function getPatientAppointmentsSuccess(patientAppointmentsPage) {
  return {
    type: GET_PATIENT_APPOINTMENTS_SUCCESS,
    patientAppointmentsPage,
  };
}

export function getPatientAppointmentsError(error) {
  return {
    type: GET_PATIENT_APPOINTMENTS_ERROR,
    error,
  };
}


export function cancelPatientAppointment(id) {
  return {
    type: CANCEL_PATIENT_APPOINTMENT,
    id,
  };
}

export function cancelPatientAppointmentSuccess(id) {
  return {
    type: CANCEL_PATIENT_APPOINTMENT_SUCCESS,
    id,
  };
}

export function cancelPatientAppointmentError(error) {
  return {
    type: CANCEL_PATIENT_APPOINTMENT_ERROR,
    error,
  };
}
