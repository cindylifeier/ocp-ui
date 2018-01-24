/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  GET_LOOKUPS,
  GET_LOOKUPS_SUCCESS,
  GET_LOOKUPS_ERROR, USPSSTATES, LOCATIONPHYSICALTYPE, LOCATIONSTATUS, ADDRESSTYPE, ADDRESSUSE, LOCATIONIDENTIFIERSYSTEM, TELECOMSYSTEM,
  TELECOMUSE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  USPSSTATES: [],
  LOCATIONPHYSICALTYPE: [],
  LOCATIONSTATUS: [],
  ADDRESSTYPE: [],
  ADDRESSUSE: [],
  LOCATIONIDENTIFIERSYSTEM: [],
  TELECOMSYSTEM: [],
  TELECOMUSE: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOOKUPS:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_LOOKUPS_SUCCESS:
      return state
        .set(USPSSTATES, fromJS((action.lookups && action.lookups.uspsStates) || state.get(USPSSTATES)))
        .set(ADDRESSTYPE, fromJS((action.lookups && action.lookups.addressTypes) || state.get(ADDRESSTYPE)))
        .set(ADDRESSUSE, fromJS((action.lookups && action.lookups.addressUses) || state.get(ADDRESSUSE)))
        .set(LOCATIONIDENTIFIERSYSTEM, fromJS((action.lookups && action.lookups.locationIdentifierSystems) || state.get(LOCATIONIDENTIFIERSYSTEM)))
        .set(TELECOMSYSTEM, fromJS((action.lookups && action.lookups.telecomSystems) || state.get(TELECOMSYSTEM)))
        .set(TELECOMUSE, fromJS((action.lookups && action.lookups.telecomUses) || state.get(TELECOMUSE)))
        .set(LOCATIONSTATUS, fromJS((action.lookups && action.lookups.locationStatuses) || state.get(LOCATIONSTATUS)))
        .set(LOCATIONPHYSICALTYPE, fromJS((action.lookups && action.lookups.locationPhysicalTypes) || state.get(LOCATIONPHYSICALTYPE)))
        .set('loading', false);
    case GET_LOOKUPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
