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
