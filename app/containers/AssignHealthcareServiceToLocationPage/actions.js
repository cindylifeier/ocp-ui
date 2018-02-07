/*
 *
 * AssignHealthCareServiceToLocationPage actions
 *
 */

import {
  DEFAULT_ACTION, GET_ACTIVE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS, GET_PAGED_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function initializeHealthcareServicesLocationAssignment() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
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
