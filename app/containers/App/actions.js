/*
 *
 * LocationCreateEdit actions
 *
 */

import {
  GET_LOCATION_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_FROM_STORE,
  GET_LOOKUPS_SUCCESS, GET_PATIENT_LOOKUPS,
} from './constants';

export function getLookationLookupsAction(lookupTypes) {
  return {
    type: GET_LOCATION_LOOKUPS,
    lookupTypes,
  };
}

export function getPatientLookupsAction(lookupTypes) {
  return {
    type: GET_PATIENT_LOOKUPS,
    lookupTypes,
  };
}


export function getLookupsSuccess(lookups) {
  return {
    type: GET_LOOKUPS_SUCCESS,
    lookups,
  };
}
export function getLookupsFromStore() {
  return {
    type: GET_LOOKUPS_FROM_STORE,
  };
}

export function getLookupsError(error) {
  return {
    type: GET_LOOKUPS_ERROR,
    error,
  };
}

