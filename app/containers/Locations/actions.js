/*
 *
 * Locations actions
 *
 */

import {
  SHOW_INACTIVE_LOCATIONS,
  SHOW_SUSPENDED_LOCATIONS,
  GET_LOCATIONS,
  DEFAULT_ACTION, GET_LOCATIONS_SUCCESS,
  HIDE_SUSPENDED_LOCATIONS,
  HIDE_INACTIVE_LOCATIONS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showInActiveLocations(checked) {
  return {
    type: SHOW_INACTIVE_LOCATIONS,
    checked,
  };
}

export function hideInActiveLocations(checked) {
  return {
    type: HIDE_INACTIVE_LOCATIONS,
    checked,
  };
}


export function showSuspendedLocations(checked) {
  return {
    type: SHOW_SUSPENDED_LOCATIONS,
    checked,
  };
}

export function hideSuspendedLocations(checked) {
  return {
    type: HIDE_SUSPENDED_LOCATIONS,
    checked,
  };
}

export function getLocations(organizationId) {
  return {
    type: GET_LOCATIONS,
    organizationId,
  };
}

export function getLocationSuccess(locations, headers) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
    headers,
  };
}

export function getLocationError(error) {
  return {
    type: GET_LOCATIONS,
    error,
  };
}
