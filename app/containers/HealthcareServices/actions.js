/*
 *
 * HealthcareServices actions
 *
 */

import {
  GET_HEALTHCARE_SERVICES,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

export function initializeHealthcareServices() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES,
  };
}

export function getHealthcareServices(currentPage = 1, includeInactive = false) {
  return {
    type: GET_HEALTHCARE_SERVICES,
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

