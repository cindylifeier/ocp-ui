/*
 *
 * ManageLocationPage actions
 *
 */

import {
  CREATE_LOCATION_ERROR,
  CREATE_LOCATION_SUCCESS, GET_LOCATION, GET_LOCATION_ERROR, GET_LOCATION_SUCCESS,
  POST_CREATE_LOCATION, POST_UPDATE_LOCATION,
} from './constants';


export function createLocation(location, organizationId) {
  return {
    type: POST_CREATE_LOCATION,
    location,
    organizationId,
  };
}

export function updateLocation(location, organizationId) {
  return {
    type: POST_UPDATE_LOCATION,
    location,
    organizationId,
  };
}

export function getLocation(locationId) {
  return {
    type: GET_LOCATION,
    locationId,
  };
}

export function createLocationSuccess(respone) {
  return {
    type: CREATE_LOCATION_SUCCESS,
    respone,
  };
}

export function createLocationError(error) {
  return {
    type: CREATE_LOCATION_ERROR,
    error,
  };
}

export function getLocationError(error) {
  return {
    type: GET_LOCATION_ERROR,
    error,
  };
}

export function getLocationSuccess(location) {
  return {
    type: GET_LOCATION_SUCCESS,
    location,
  };
}
