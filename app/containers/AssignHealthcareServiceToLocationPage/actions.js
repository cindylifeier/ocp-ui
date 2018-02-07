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
