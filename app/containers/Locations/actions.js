/*
 *
 * Locations actions
 *
 */

import {
  GET_FILTERED_LOCATIONS,
  GET_ACTIVE_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR, INITIALIZE_LOCATIONS,
} from './constants';


export function getFilteredLocations(currentPage, includeInactive, includeSuspended) {
  return {
    type: GET_FILTERED_LOCATIONS,
    currentPage,
    includeInactive,
    includeSuspended,
  };
}

export function getActiveLocations(organizationId, organizationName, currentPage) {
  return {
    type: GET_ACTIVE_LOCATIONS,
    organizationId,
    organizationName,
    currentPage,
  };
}

export function getLocationsSuccess(locations, organizationId, includeInactive, includeSuspended) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
    organizationId,
    includeInactive,
    includeSuspended,
  };
}

export function getLocationsError(error) {
  return {
    type: GET_LOCATIONS_ERROR,
    error,
  };
}

export function getInitializeLocations() {
  return {
    type: INITIALIZE_LOCATIONS,
  };
}
