/*
 *
 * AssignHealthCareServiceToLocationPage actions
 *
 */


import {
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
} from './constants';

export function initializeAssignHealthCareServiceToLocationPage() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  };
}

export function getHealthcareServicesLocationAssignment(organizationId, organizationName, locationId, currentPage = 1) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    organizationId,
    locationId,
    organizationName,
    currentPage,
  };
}

export function getHealthcareServicesLocationAssignmentSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
    healthcareServices,
  };
}

export function getHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}

export function updateHealthcareServicesLocationAssignment(organizationId, locationId, healthcareServiceId) {
  return {
    type: UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    organizationId,
    locationId,
    healthcareServiceId,
  };
}

export function updateHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}

export function unassignHealthcareServicesLocationAssignment(organizationId, locationId, healthcareServiceId) {
  return {
    type: UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    organizationId,
    locationId,
    healthcareServiceId,
  };
}

export function unassignHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}
