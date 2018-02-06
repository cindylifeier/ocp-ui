/*
 *
 * AssignHealthCareServiceToLocationPage actions
 *
 */

import {
  DEFAULT_ACTION, GET_FILTERED_HEALTHCARE_SERVICES, INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function initializeHealthcareServices() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  };
}

export function getFilteredHealthcareServices(currentPage) {
  return {
    type: GET_FILTERED_HEALTHCARE_SERVICES,
    currentPage,
  };
}
