/*
 *
 * AssignHealthCareServiceToLocationPage actions
 *
 */


import {
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS, GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
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

export function updateHealthcareServicesLocationAssignment(organizationId, locationId, heathcareServiceId) {
  return {
    type: UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    organizationId,
    locationId,
    heathcareServiceId,
  };
}

export function updateHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}
