/*
 *
 * HealthcareServices actions
 *
 */

import {
  GET_HEALTHCARE_SERVICES_BY_LOCATION,
  GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

export function initializeHealthcareServices() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES,
  };
}

export function getHealthcareServicesByOrganization(currentPage = 1, includeInactive = false) {
  return {
    type: GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
    currentPage,
    includeInactive,
  };
}

export function getHealthcareServicesByLocation(locationId, locationName, currentPage = 1, includeInactive = false) {
  return {
    type: GET_HEALTHCARE_SERVICES_BY_LOCATION,
    locationId,
    locationName,
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

