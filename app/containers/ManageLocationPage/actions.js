/*
 *
 * ManageLocationPage actions
 *
 */

import {
  CREATE_LOCATION_ERROR,
  CREATE_LOCATION_SUCCESS,
  POST_CREATE_LOCATION,
} from './constants';


export function createLocation(location, organizationId) {
  return {
    type: POST_CREATE_LOCATION,
    location,
    organizationId,
  };
}

export function createLocationSuccess(location) {
  return {
    type: CREATE_LOCATION_SUCCESS,
    location,
  };
}

export function createLocationError(error) {
  return {
    type: CREATE_LOCATION_ERROR,
    error,
  };
}
