/*
 *
 * ManageAppointmentPage actions
 *
 */

import {
  GET_APPOINTMENT, GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
  SAVE_APPOINTMENT,
  GET_HEALTHCARE_SERVICE,
  GET_HEALTHCARE_SERVICE_SUCCESS,
  GET_HEALTHCARE_SERVICE_ERROR,
} from './constants';

export function initializeManageAppointment() {
  return {
    type: INITIALIZE_MANAGE_APPOINTMENT,
  };
}

export function getAppointment(appointmentId) {
  return {
    type: GET_APPOINTMENT,
    appointmentId,
  };
}

export function getHealthcareService(organizationId) {
  return {
    type: GET_HEALTHCARE_SERVICE,
    organizationId,
  };
}

export function getHealthcareServiceSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICE_SUCCESS,
    healthcareServices,
  };
}

export function getHealthcareServiceError(error) {
  return {
    type: GET_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}

export function getAppointmentSuccess(appointment) {
  return {
    type: GET_APPOINTMENT_SUCCESS,
    appointment,
  };
}

export function saveAppointment(appointment, handleSubmitting) {
  return {
    type: SAVE_APPOINTMENT,
    appointment,
    handleSubmitting,
  };
}
