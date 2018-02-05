/*
 *
 * HealthcareServices actions
 *
 */

import {
  GET_ACTIVE_HEALTHCARE_SERVICES, GET_FILTERED_HEALTHCARE_SERVICES, GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

export function initializeHealthcareServices() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES,
  };
}

export function getActiveHealthcareServices(organizationId, organizationName, currentPage) {
  return {
    type: GET_ACTIVE_HEALTHCARE_SERVICES,
    organizationId,
    organizationName,
    currentPage,
  };
}

export function getFilteredHealthcareServices(currentPage, includeInactive) {
  return {
    type: GET_FILTERED_HEALTHCARE_SERVICES,
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

