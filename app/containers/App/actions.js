/*
 *
 * LocationCreateEdit actions
 *
 */

import {
  GET_US_STATES, GET_US_STATES_ERROR, GET_US_STATES_FROM_STORE, GET_US_STATES_SUCCESS,
} from './constants';

export function getUsStateAction(lookupTypes) {
  return {
    type: GET_US_STATES,
    lookupTypes,
  };
}

export function getUsStateSuccess(usState) {
  return {
    type: GET_US_STATES_SUCCESS,
    usState,
  };
}
export function getUsStateFromStore() {
  return {
    type: GET_US_STATES_FROM_STORE,
  };
}

export function getUsStateError(error) {
  return {
    type: GET_US_STATES_ERROR,
    error,
  };
}

