/*
 *
 * AssignHealthCareServiceToLocationPage actions
 *
 */


import {
  GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
  GET_PAGED_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  GET_ACTIVE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
} from './constants';

export function initializeAssignHealthCareServiceToLocationPage() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  };
}

export function getHealthcareServicesByOrganization(organizationId, organizationName, currentPage = 1, includeInactive = false) {
  return {
    type: GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
    organizationId,
    organizationName,
    currentPage,
    includeInactive,
  };
}

export function getActiveHealthcareServicesLocationAssignment(organizationId, locationId, organizationName, currentPage) {
  return {
    type: GET_ACTIVE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    organizationId,
    locationId,
    organizationName,
    currentPage,
  };
}

export function getHealthcareServicesSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICES_SUCCESS,
    healthcareServices,
  };
}

export function getHealthcareServicesError(error) {
  return {
    type: GET_HEALTHCARE_SERVICES_ERROR,
    error,
  };
}

export function getPagedHealthcareServicesLocationAssignment(currentPage) {
  return {
    type: GET_PAGED_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    currentPage,
  };
}

export function getHealthcareServicesLocationAssignmentSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
    healthcareServices,
  };
}

export function getHealthcareLocationAssignmentServicesError(error) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}
