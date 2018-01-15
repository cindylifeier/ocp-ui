/*
 *
 * Locations actions
 *
 */

import {
  GET_FILTERED_LOCATIONS,
  GET_ACTIVE_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
} from './constants';


export function getFilteredLocations(status, currentPage) {
  return {
    type: GET_FILTERED_LOCATIONS,
    status,
    currentPage,
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

export function getLocationsSuccess(locations, organizationId) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
    organizationId,
  };
}

export function getLocationsError(error) {
  return {
    type: GET_LOCATIONS_ERROR,
    error,
  };
}
