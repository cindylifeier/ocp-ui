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
