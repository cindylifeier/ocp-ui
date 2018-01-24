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
  ADDRESSTYPE,
  ADDRESSUSE,
  GET_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_SUCCESS,
  IDENTIFIERSYSTEM,
  LOCATIONSTATUS,
  LOCATIONTYPE,
  PRACTITIONERROLES,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  USPSSTATES: [],
  LOCATIONTYPE: [],
  LOCATIONSTATUS: [],
  ADDRESSTYPE: [],
  ADDRESSUSE: [],
  IDENTIFIERSYSTEM: [],
  TELECOMSYSTEM: [],
  TELECOMUSE: [],
  PRACTITIONERROLES: [],
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
        .set(IDENTIFIERSYSTEM, fromJS((action.lookups && action.lookups.identifierSystems) || state.get(IDENTIFIERSYSTEM)))
        .set(TELECOMSYSTEM, fromJS((action.lookups && action.lookups.telecomSystems) || state.get(TELECOMSYSTEM)))
        .set(TELECOMUSE, fromJS((action.lookups && action.lookups.telecomUses) || state.get(TELECOMUSE)))
        .set(LOCATIONSTATUS, fromJS((action.lookups && action.lookups.locationStatuses) || state.get(LOCATIONSTATUS)))
        .set(LOCATIONTYPE, fromJS((action.lookups && action.lookups.locationTypes) || state.get(LOCATIONTYPE)))
        .set(PRACTITIONERROLES, fromJS((action.lookups && action.lookups.practitionerRoles) || state.get(PRACTITIONERROLES)))
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
