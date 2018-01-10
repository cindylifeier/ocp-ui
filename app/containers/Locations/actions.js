/*
 *
 * Locations actions
 *
 */

import {
  GET_FILTERED_LOCATIONS,
  DEFAULT_ACTION,
  GET_ACTIVE_LOCATIONS, GET_LOCATIONS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getFilteredLocations(status) {
  return {
    type: GET_FILTERED_LOCATIONS,
    status,
  };
}

export function getActiveLocations(organizationId) {
  return {
    type: GET_ACTIVE_LOCATIONS,
    organizationId,
  };
}

export function getLocationsSuccess(locations, headers) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
    headers,
  };
}

export function getLocationError(error) {
  return {
    type: GET_ACTIVE_LOCATIONS,
    error,
  };
}
