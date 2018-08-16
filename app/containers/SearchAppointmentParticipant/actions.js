/*
 *
 * SearchAppointmentParticipant actions
 *
 */


import {
  ADD_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT,
  REMOVE_APPOINTMENT_PARTICIPANT,
  SEARCH_APPOINTMENT_PARTICIPANT,
  SEARCH_APPOINTMENT_PARTICIPANT_ERROR,
  SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS,
  GET_CARE_TEAM_REFERENCES,
  GET_CARE_TEAM_REFERENCES_SUCCESS,
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES,
} from './constants';

export function getAppointmentSearchParticipant(name, member) {
  return {
    type: SEARCH_APPOINTMENT_PARTICIPANT,
    name,
    member,
  };
}

export function addAppointmentParticipants(participants) {
  return {
    type: ADD_APPOINTMENT_PARTICIPANT,
    participants,
  };
}


export function getSearchAppointmentParticipantSuccess(searchParticipantResults) {
  return {
    type: SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS,
    searchParticipantResults,
  };
}

export function getSearchAppointmentParticipantError(error) {
  return {
    type: SEARCH_APPOINTMENT_PARTICIPANT_ERROR,
    error,
  };
}

export function initializeSearchAppointmentParticipant(initialSelectedParticipants) {
  return {
    type: INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT,
    initialSelectedParticipants,
  };
}

export function removeAppointmentParticipant(participant) {
  return {
    type: REMOVE_APPOINTMENT_PARTICIPANT,
    participant,
  };
}

export function initializeSearchAppointmentParticipantResult() {
  return {
    type: INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT,
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
