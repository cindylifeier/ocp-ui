/*
 *
 * AddAppointmentParticipant actions
 *
 */

import {
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
} from './constants';

export function getHealthcareServiceReferences(resourceType, resourceValue) {
  return {
    type: GET_HEALTHCARE_SERVICE_REFERENCES,
    resourceType,
    resourceValue,
  };
}

export function getHealthcareServiceReferencesSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
    healthcareServices,
  };
}

export function getLocationReferences(resourceType, resourceValue) {
  return {
    type: GET_LOCATION_REFERENCES,
    resourceType,
    resourceValue,
  };
}

export function getLocationReferencesSuccess(locations) {
  return {
    type: GET_LOCATION_REFERENCES_SUCCESS,
    locations,
  };
}

export function getPractitionerReferences(resourceType, resourceValue) {
  return {
    type: GET_PRACTITIONER_REFERENCES,
    resourceType,
    resourceValue,
  };
}

export function getPractitionerReferencesSuccess(practitioners) {
  return {
    type: GET_PRACTITIONER_REFERENCES_SUCCESS,
    practitioners,
  };
}
