/*
 *
 * ManageAppointmentPage actions
 *
 */

import {
  GET_APPOINTMENT, GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
  SAVE_APPOINTMENT,
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  GET_CARE_TEAM_REFERENCES,
  GET_CARE_TEAM_REFERENCES_SUCCESS,
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

export function getHealthcareServiceReferences(organizationId) {
  return {
    type: GET_HEALTHCARE_SERVICE_REFERENCES,
    organizationId,
  };
}

export function getHealthcareServiceReferencesSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
    healthcareServices,
  };
}

export function getLocationReferences(healthcareServiceId) {
  return {
    type: GET_LOCATION_REFERENCES,
    healthcareServiceId,
  };
}

export function getLocationReferencesSuccess(locations) {
  return {
    type: GET_LOCATION_REFERENCES_SUCCESS,
    locations,
  };
}

export function getPractitionerReferences(organizationId, locationId) {
  return {
    type: GET_PRACTITIONER_REFERENCES,
    organizationId,
    locationId,
  };
}

export function getPractitionerReferencesSuccess(practitioners) {
  return {
    type: GET_PRACTITIONER_REFERENCES_SUCCESS,
    practitioners,
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

export function getCareTeamReferences(patientId) {
  return {
    type: GET_CARE_TEAM_REFERENCES,
    patientId,
  };
}

export function getCareTeamReferencesSuccess(careTeams) {
  return {
    type: GET_CARE_TEAM_REFERENCES_SUCCESS,
    careTeams,
  };
}
