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

export function getHealthcareServicesByOrganization(organizationId, organizationName, currentPage, includeInactive = false) {
  return {
    type: GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
    organizationId,
    organizationName,
    currentPage,
    includeInactive,
  };
}

export function getHealthcareServicesByLocation(organizationId, organizationName, locationId, locationName, currentPage, includeInactive) {
  return {
    type: GET_HEALTHCARE_SERVICES_BY_LOCATION,
    organizationId,
    organizationName,
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

