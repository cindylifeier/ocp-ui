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

export function getActiveLocations(organizationId, status) {
  return {
    type: GET_ACTIVE_LOCATIONS,
    organizationId,
    status,
  };
}

export function getLocationsSuccess(locations, organizationId) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
    organizationId,
  };
}

export function getLocationError(error) {
  return {
    type: GET_ACTIVE_LOCATIONS,
    error,
  };
}
